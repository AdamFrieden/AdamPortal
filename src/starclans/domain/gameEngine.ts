// src/domain/gameEngine.ts
import {
  PlayerAction,
  GameState,
  PlayerActionResult,
  ResearchTask,
  Gladiator,
  GladiatorStatus,
  DropGladiatorAction,
  TrainGladiatorAction,
  RestGladiatorAction,
  RecruitGladiatorAction,
  ACTION_TYPES,
  StellarScan,
  ScanResult
} from './models';

//  this should not maintain any state. use all pure functions that have no side effects.
//  state changes are always returned as a  new state object without mutating inputs.
export class GameEngine {

  public static updateGameStateToNow(state: GameState, now: number): GameState {

    //  we don't expect any content requests to be present in the state when we update it
    //  throw an error if we find any
    if (state.contentRequests && state.contentRequests.length > 0) {
      throw new Error('Content requests found in state when updating to now');
    }

    // Apply debug time offset to the "now" timestamp
    const effectiveNow = now + (state.debugTimeOffset || 0);

    // Call each system with the effective time
    const updatedResearchTasks = GameEngine.updateResearchTasks(state.researchTasks, effectiveNow);
    const updatedGladiators = GameEngine.updateGladiators(state.roster, effectiveNow);
    const updatedScans = GameEngine.updateActiveScans(state, effectiveNow);

    const updatedState: GameState = {
      ...state,
      researchTasks: updatedResearchTasks,
      roster: updatedGladiators,
      activeScans: updatedScans,
      lastRefresh: effectiveNow // Use the effective time for lastRefresh
    };
    return updatedState;
  }



  public static findTimeToNextEvent(state: GameState): number {
    const timeToNextResearchTaskCompletion = 123;
    const timeToNextScanCompletion = 123;

    return Math.min(timeToNextResearchTaskCompletion, timeToNextScanCompletion);
  }



  public static attemptPlayerAction(
  state: GameState, 
    now: number, 
    action: PlayerAction
  ): PlayerActionResult<GameState> {

    // First, update the state using refreshGameState
    let nextState = GameEngine.updateGameStateToNow(state, now);

    //  ##MISSING add some validation
  
    // Call the correct helper based on the action type
    switch (action.type) {
      case 'START_RESEARCH':
        nextState = GameEngine.startResearch(nextState, 'warp tech', 1000 * 60 * 60 * 6);
        break;
      case 'CANCEL_RESEARCH':
        nextState = GameEngine.cancelResearch(nextState, action.researchId);
        break;
      case ACTION_TYPES.DROP_GLADIATOR:
        nextState = GameEngine.dropGladiator(nextState, (action as DropGladiatorAction).gladiatorId);
        break;
      case ACTION_TYPES.TRAIN_GLADIATOR:
        nextState = GameEngine.updateGladiatorStatus(nextState, (action as TrainGladiatorAction).gladiatorId, 'TRAINING');
        break;
      case ACTION_TYPES.REST_GLADIATOR:
        nextState = GameEngine.updateGladiatorStatus(nextState, (action as RestGladiatorAction).gladiatorId, 'RESTING');
        break;
      case ACTION_TYPES.RECRUIT_GLADIATOR:
        const gladiatorId = (action as RecruitGladiatorAction).gladiatorId;
        nextState = GameEngine.recruitGladiator(nextState, gladiatorId);
        nextState = GameEngine.updateGladiatorStatus(nextState, gladiatorId, 'RESTING');
        break;
      case ACTION_TYPES.START_SCAN:
        nextState = GameEngine.startStellarScan(nextState, now);
        break;
      default:
        // Optionally handle unexpected action types
        break;
    }
  
    // Create a result that indicates success if an action was processed
    return { state: nextState, actionSuccess: true };
  }



  private static updateActiveScans(state: GameState, now: number): GameState {

    

    if (!state.activeScan || state.activeScan.status !== 'IN_PROGRESS') {
      return state;
    }
    
    const endTime = scan.startTime + scan.durationMs;
    if (now >= endTime) {
      // Scan is complete, generate results
      const results = GameEngine.generateScanResults();
      return {
        ...scan,
        status: 'COMPLETED',
        results
      };
    }
    
    return scan;
  }

  // Generate random scan results
  // eventually we want these scan results to be interactive and require gladiator engagement to 'use' once they've resolved
  private static generateScanResults(): ScanResult[] {
    const resultTypes = ['opportunity', 'threat', 'resource'];
    const numResults = 1 + Math.floor(Math.random() * 3); // 1-3 results
    
    const results: ScanResult[] = [];
    for (let i = 0; i < numResults; i++) {
      const type = resultTypes[Math.floor(Math.random() * resultTypes.length)];
      results.push({
        id: crypto.randomUUID(),
        type,
        description: `Found a ${type} in the stellar region.`,
        reward: type === 'resource' ? `${Math.floor(Math.random() * 100)} resourcium` : undefined
      });
    }
    
    return results;
  }

  private static startStellarScan(state: GameState, now: number): GameState {
    // Check if there's already an active scan
    if (state.activeScan && state.activeScan.status === 'IN_PROGRESS') {
      return state; // Can't start a new scan while one is in progress
    }
    
    // Get the effective time that accounts for debug offset
    const effectiveNow = now + (state.debugTimeOffset || 0);
    const duration = 1000 * 60 * 5; // 5 minutes for testing
    
    // Create a new scan with the effective time
    const newScan: StellarScan = {
      id: crypto.randomUUID(),
      startTime: effectiveNow,
      durationMs: duration,
      status: 'IN_PROGRESS',
      eventTime: effectiveNow + duration
    };
    
    // If there was a completed scan, move it to history
    const scanHistory = [...(state.scanHistory || [])];
    if (state.activeScan && state.activeScan.status === 'COMPLETED') {
      scanHistory.push(state.activeScan);
    }
    
    return {
      ...state,
      activeScan: newScan,
      scanHistory
    };
  }

  private static updateGladiators(gladiators: Gladiator[], now: number): Gladiator[] {
    return gladiators.map(g => {

        const elapsedTime = now - g.lastRefresh;
        const staminaModifier = g.status === 'RESTING' ? 0.0001 : -0.0001;
        const staminaChange = elapsedTime * staminaModifier;
        let finalStamina = g.stamina + staminaChange;

        if (finalStamina >= 100) {
          finalStamina = 100;
        }
        if (finalStamina <= 0) {
          finalStamina = 0;
        }
        return { ...g, stamina: finalStamina, lastRefresh: now }
    });
  }

  //  update all research tasks to the given 'now' Date, completing them if enough time has elapsed
  private static updateResearchTasks(tasks: ResearchTask[] = [], now: number): ResearchTask[] {
    return tasks.map(task => {
      if (!task.completed) {
        const endTime = task.startTime + task.durationMs;
        if (now >= endTime) {
          // Return a new task object with `completed` set to true
          return { ...task, completed: true };
        }
      }
      return task; // if no changes, return the same object or consider cloning if needed
    });
  }

  private static startResearch(state: GameState, name: string, durationMs: number): GameState {
    const newTask = {
      id: crypto.randomUUID(),
      name,
      startTime: Date.now(),
      durationMs,
      completed: false,
    };
  
    // Create a new researchTasks array with the new task appended.
    const newResearchTasks = state.researchTasks ? [...state.researchTasks, newTask] : [newTask];
    
    // Return a new state object with updated researchTasks.
    return { ...state, researchTasks: newResearchTasks };
  }

  private static cancelResearch(state: GameState, researchId: string): GameState {
    // Create a new research tasks array that excludes the task with the given researchId.
    const updatedResearchTasks = state.researchTasks?.filter(task => task.id !== researchId) ?? [];
    // Return a new state object with the updated researchTasks.
    return {
      ...state,
      researchTasks: updatedResearchTasks,
    };
  }

  private static dropGladiator(state: GameState, gladiatorId: string): GameState {
    const updatedGladiatorRoster = state.roster?.filter(g => g.id !== gladiatorId) ?? [];
    return { ...state, roster: updatedGladiatorRoster };
  }

  private static recruitGladiator(state: GameState, gladiatorId: string): GameState {
    const gladiatorToRecruit = state.waiverWire.find(g => g.id === gladiatorId);
    if (!gladiatorToRecruit) {
      return state;
    }

    const updatedRoster = [...(state.roster ?? []), gladiatorToRecruit];
    const updatedWaiverWire = state.waiverWire.filter(g => g.id !== gladiatorId);

    return {
      ...state,
      roster: updatedRoster,
      waiverWire: updatedWaiverWire
    };
  }

  private static updateGladiatorStatus(
    state: GameState,
    gladiatorId: string,
    newStatus: GladiatorStatus
  ): GameState {
    const updatedRoster = state.roster?.map(g =>
      g.id === gladiatorId ? { ...g, status: newStatus } : g
    ) ?? [];
    return { ...state, roster: updatedRoster };
  }
}
