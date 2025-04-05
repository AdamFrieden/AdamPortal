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
  ScanResult,
  BattleResult,
  BattleStatus,
  StartBattleAction,
  CancelBattleAction
} from './models';

//  this should not maintain any state. use all pure functions that have no side effects.
//  state changes are always returned as a  new state object without mutating inputs.
export class GameEngine {

  public static updateGameStateToNow(state: GameState, now: number): GameState {
    // Apply debug time offset to the "now" timestamp
    const effectiveNow = now + (state.debugTimeOffset || 0);

    // Call each system with the effective time
    const updatedResearchTasks = GameEngine.updateResearchTasks(state.researchTasks, effectiveNow);
    const updatedGladiators = GameEngine.updateGladiators(state.roster, effectiveNow);
    const updatedScan = GameEngine.updateActiveScan(state.activeScan, effectiveNow);
    const updatedBattles = GameEngine.updateActiveBattles(state.activeBattles, effectiveNow);

    // If any battles just completed, add them to history
    let battleHistory = [...(state.battleHistory || [])];
    if (updatedBattles) {
      const completedBattles = updatedBattles.filter(battle => 
        battle.status === 'COMPLETED' && 
        (!state.activeBattles || !state.activeBattles.find(b => b.id === battle.id && b.status === 'COMPLETED'))
      );
      
      if (completedBattles.length > 0) {
        battleHistory = [...battleHistory, ...completedBattles];
      }
    }

    const updatedState: GameState = {
      ...state,
      researchTasks: updatedResearchTasks,
      roster: updatedGladiators,
      activeScan: updatedScan,
      activeBattles: updatedBattles,
      battleHistory,
      lastRefresh: effectiveNow // Use the effective time for lastRefresh
    };
    return updatedState;
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
      case ACTION_TYPES.START_BATTLE:
        nextState = GameEngine.startBattle(nextState, (action as StartBattleAction).battleId, (action as StartBattleAction).playerGladiatorIds);
        break;
      case ACTION_TYPES.CANCEL_BATTLE:
        nextState = GameEngine.cancelBattle(nextState, (action as CancelBattleAction).battleId);
        break;
      default:
        // Optionally handle unexpected action types
        break;
    }
  
    // Create a result that indicates success if an action was processed
    return { state: nextState, actionSuccess: true };
  }

  private static updateActiveScan(scan: StellarScan | undefined, now: number): StellarScan | undefined {
    if (!scan || scan.status !== 'IN_PROGRESS') {
      return scan;
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
    
    // Create a new scan with the effective time
    // TODO probably want some factory for creating new scans - maybe pull into contentFactory?
    const newScan: StellarScan = {
      id: crypto.randomUUID(),
      startTime: effectiveNow, // Use the effective time with offset
      durationMs: 1000 * 60 * 5, // 5 minutes for testing
      status: 'IN_PROGRESS'
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

  /**
   * Updates all active battles to the current time
   * @param battles The list of active battles
   * @param now The current time
   * @returns Updated list of battles
   */
  private static updateActiveBattles(battles: BattleResult[] | undefined, now: number): BattleResult[] | undefined {
    if (!battles || battles.length === 0) {
      return battles;
    }

    return battles.map(battle => {
      // If battle is already completed, return as is
      if (battle.status === 'COMPLETED') {
        return battle;
      }

      // If battle is not started yet, return as is
      if (battle.status === 'NOT_STARTED') {
        return battle;
      }

      // Check if battle is complete
      const endTime = battle.startTime + battle.durationMs;
      if (now >= endTime) {
        // Battle is complete, determine outcome
        const outcome = GameEngine.determineBattleOutcome(battle);
        const rewards = GameEngine.calculateBattleRewards(battle, outcome);
        
        return {
          ...battle,
          status: 'COMPLETED',
          outcome,
          rewards
        };
      }
      
      // Battle is still in progress
      return battle;
    });
  }

  /**
   * Determines the outcome of a battle based on player and opponent power
   * @param battle The battle to determine the outcome for
   * @returns The battle outcome
   */
  private static determineBattleOutcome(battle: BattleResult): 'VICTORY' | 'DEFEAT' | 'DRAW' {
    // Simple power comparison for now
    if (battle.playerPower > battle.opponentPower * 1.1) {
      return 'VICTORY';
    } else if (battle.opponentPower > battle.playerPower * 1.1) {
      return 'DEFEAT';
    } else {
      return 'DRAW';
    }
  }

  /**
   * Calculates rewards for a completed battle
   * @param battle The completed battle
   * @param outcome The battle outcome
   * @returns The calculated rewards
   */
  private static calculateBattleRewards(battle: BattleResult, outcome: 'VICTORY' | 'DEFEAT' | 'DRAW'): { resourcium?: number } {
    // Simple reward calculation based on outcome
    switch (outcome) {
      case 'VICTORY':
        return { resourcium: Math.floor(battle.opponentPower * 0.5) };
      case 'DRAW':
        return { resourcium: Math.floor(battle.opponentPower * 0.2) };
      case 'DEFEAT':
        return { resourcium: Math.floor(battle.opponentPower * 0.1) };
    }
  }

  /**
   * Starts a battle with the selected gladiators
   * @param state The current game state
   * @param battleId The ID of the battle to start
   * @param playerGladiatorIds The IDs of the gladiators to use in the battle
   * @returns Updated game state
   */
  private static startBattle(state: GameState, battleId: string, playerGladiatorIds: string[]): GameState {
    // Find the battle in the active battles
    const activeBattles = [...(state.activeBattles || [])];
    const battleIndex = activeBattles.findIndex(b => b.id === battleId);
    
    if (battleIndex === -1) {
      return state; // Battle not found
    }
    
    const battle = activeBattles[battleIndex];
    
    // Check if battle is already started or completed
    if (battle.status !== 'NOT_STARTED') {
      return state;
    }
    
    // Update gladiator statuses to CONFLICT
    const updatedRoster = state.roster.map(gladiator => {
      if (playerGladiatorIds.includes(gladiator.id)) {
        return { ...gladiator, status: 'CONFLICT' as GladiatorStatus };
      }
      return gladiator;
    });
    
    // Update battle status to IN_PROGRESS
    const updatedBattle = {
      ...battle,
      status: 'IN_PROGRESS' as BattleStatus
    };
    
    activeBattles[battleIndex] = updatedBattle;
    
    return {
      ...state,
      roster: updatedRoster,
      activeBattles
    };
  }

  /**
   * Cancels a battle before it starts
   * @param state The current game state
   * @param battleId The ID of the battle to cancel
   * @returns Updated game state
   */
  private static cancelBattle(state: GameState, battleId: string): GameState {
    // Find the battle in the active battles
    const activeBattles = [...(state.activeBattles || [])];
    const battleIndex = activeBattles.findIndex(b => b.id === battleId);
    
    if (battleIndex === -1) {
      return state; // Battle not found
    }
    
    const battle = activeBattles[battleIndex];
    
    // Check if battle is already started or completed
    if (battle.status !== 'NOT_STARTED') {
      return state;
    }
    
    // Remove the battle from active battles
    activeBattles.splice(battleIndex, 1);
    
    return {
      ...state,
      activeBattles
    };
  }
}
