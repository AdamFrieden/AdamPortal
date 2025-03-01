
// src/domain/gameEngine.ts
import { PlayerAction, GameState, PlayerActionResult, ResearchTask, Gladiator } from './models';

//  this should not maintain any state. use all pure functions that have no side effects.
//  state changes are always returned as a  new state object without mutating inputs.
export class GameEngine {

  public static updateGameStateToNow(state: GameState, now: number): GameState {

    const totalNow = now + state.timeTravelMs;

    // Call each system
    // updateResearch(state, now);
    // updateConstruction(state, now);
    // updateGladiators(state, now);
    // More systems: updateResources, etc.
    const updatedResearchTasks = GameEngine.updateResearchTasks(state.researchTasks, totalNow);
    const updatedGladiators = GameEngine.updateGladiators(state.gladiators, totalNow);
  
    const updatedState: GameState = {
      ...state,
      researchTasks: updatedResearchTasks,
      gladiators: updatedGladiators,
      lastRefresh: now
    };
    return updatedState;
  }

  public static timeTravel(state: GameState, travelMs: number, now: number): GameState {

    const totalTimeTravel = state.timeTravelMs + travelMs;
    const timeTraveledState: GameState = { ...state, timeTravelMs: totalTimeTravel };
    const refreshedState = GameEngine.updateGameStateToNow(timeTraveledState, now);

    return refreshedState;
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
      default:
        // Optionally handle unexpected action types
        break;
    }
  
    // Create a result that indicates success if an action was processed
    return { state: nextState, actionSuccess: true };
  }



  private static updateGladiators(gladiators: Gladiator[], now: number): Gladiator[] {
    return gladiators.map(g => {

        const elapsedTime = now - g.lastRefresh;
        const staminaModifier = g.status === 'RESTING' ? 0.001 : -0.001;
        const staminaChange = elapsedTime * staminaModifier;
        let finalStamina = g.stamina + staminaChange;
        if (finalStamina >= 100) {
          finalStamina = 100;
        }
        if (finalStamina <= 0) {
          finalStamina = 0;
        }
        return { ...g, stamina: finalStamina }
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
}
