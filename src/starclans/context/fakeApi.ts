// src/api/fakeApi.ts

import { GameEngine } from "../domain/gameEngine";
import { ClientGameState, PlayerAction, GameState, PlayerActionResult, toClientGameState, emptyGameState } from "../domain/models";

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  data?: T;
}

const STORAGE_KEY = 'starclanData';

class FakeApi {
  private gameState: GameState;

  constructor() {
    this.gameState = this.loadGameState();
  }

  private saveGameState(state: GameState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  
  private loadGameState(): GameState {
    console.log('loading game state...');
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data || data.trim() === '') {
      console.log('returning empty game state...');
      return emptyGameState();
    }
    return JSON.parse(data) as GameState;
  }

  //  Utility function to delete state from local storage for testing
  public deleteGameState(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  //  careful this will overwrite existing clan data
  public startNewClan = async (clanName: string): Promise<ApiResponse<ClientGameState>> => {
    try {
      await mockApiBehavior();
    } catch {
      return {
        status: 500,
        success: false
      }
    }

    const newClanGameState: GameState = {
      clanName: clanName,
      gladiators: [],
      researchTasks: [],
      lastRefresh: Date.now(),
      timeTravelMs: 0,
      resourcium: Math.random() * 100,
    }
    this.saveGameState(newClanGameState);
    this.gameState = newClanGameState;

    return {
      data: toClientGameState(newClanGameState),
      status: 200,
      success: true
    }
  }

  public timeTravel = async (timeToTravelMs: number): Promise<ApiResponse<ClientGameState>> => {
    try {
      await mockApiBehavior();
    } catch {
      return {
        status: 500,
        success: false
      }
    }
    
    const nextState = GameEngine.timeTravel(this.gameState, timeToTravelMs, Date.now());
    this.saveGameState(nextState);
    this.gameState = nextState;

    return {
      data: toClientGameState(nextState),
      status: 200,
      success: true
    }
  }


  public getClientGameState = async (): Promise<ApiResponse<ClientGameState>> => {
    //  first fake some api behavior with a delay and possible failure
    try {
      await mockApiBehavior();
    } catch {
      return {
        status: 500,
        success: false
      }
    }

    //  now run server side logic
    const gameStateNow = GameEngine.updateGameStateToNow(this.gameState, Date.now()); //  calculate next gamestate based on the current time
    this.saveGameState(gameStateNow); //  persist the updated state
    this.gameState = gameStateNow;

    //  return a client state
    const clientState = toClientGameState(gameStateNow);
    return {
      data: clientState,
      status: 200,
      success: true
    }
  }

  public postPlayerAction = async (playerAction: PlayerAction): Promise<ApiResponse<PlayerActionResult<ClientGameState>>> => {
    try {
      await mockApiBehavior();
    } catch {
      return {
        status: 500,
        success: false
      }
    }

    const { state: nextState, actionSuccess } = GameEngine.attemptPlayerAction(this.gameState, Date.now(), playerAction);
    this.saveGameState(nextState);
    this.gameState = nextState;

    const resultForClient = { state: toClientGameState(nextState), actionSuccess };
    return {
      data: resultForClient,
      status: 200,
      success: true
    }
  }
}

// Utility function to simulate api behavior
const mockApiBehavior = async (): Promise<void> => {
  // Simulate random network latency between 500ms and 2000ms.
  const ms = 500 + Math.floor(Math.random() * 1500);
  await new Promise((resolve) => setTimeout(resolve, ms));
  
  // Simulate a 15% chance of failure.
  if (Math.random() < 0.15) {
    throw new Error("Simulated network error");
  }
};

const apiService = new FakeApi();
export default apiService;
