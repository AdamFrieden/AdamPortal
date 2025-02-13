
// src/domain/gameEngine.ts
import { GamePlayerAction, GameState, PlayerActionResult } from './models';

export function refreshGameState(state: GameState): GameState & { elapsedTimeMs: number } {
  const now = Date.now() + state.timeTravelMs;
  const elapsedTimeMs = now - state.lastRefresh;

  // Call each system
  updateResearch(state, now);
  // updateConstruction(state, now);
  // More systems: updateResources, updatePopulation, etc.

  // Update lastRefresh
  state.lastRefresh = now;
  return { elapsedTimeMs, ...state };
}

export function timeTravel(state: GameState, travelMs: number): GameState {
  const totalTimeTravel = state.timeTravelMs + travelMs;
  state.timeTravelMs = totalTimeTravel;
  refreshGameState(state);
  return state;
}

export function tryPlayerAction(state: GameState, playerAction: GamePlayerAction): GameState & PlayerActionResult  {
  let resultState: GameState & PlayerActionResult = {...state, success: false}

  //  do some validation
  if (!!playerAction.researchId) {
    resultState.success = true;
  }

  // modify state according to the action
  switch (playerAction.type) {
    case 'START_RESEARCH':
      startResearch(state, 'Warp Ex Tech', 1000 * 60 * 60 * 8)
      break;
    case 'CANCEL_RESEARCH':
      break;
  }
  
  return resultState;
}

//  update all research tasks to the given 'now' Date, completing them if enough time has elapsed
function updateResearch(state: GameState, now: number): void {
  const tasks = state.researchTasks;

  for (let task of tasks) {
    if (!task.completed) {
      const endTime = task.startTime + task.durationMs;
      if (now >= endTime) {
        task.completed = true;
      }
    }
  }
}

// Utility function to start new research
function startResearch(state: GameState, name: string, durationMs: number) {
  state.researchTasks.push({
    id: crypto.randomUUID(),
    name,
    startTime: Date.now(),
    durationMs,
    completed: false,
  });
}