// src/api/fakeApi.ts

import { ContentFactory } from "../domain/contentFactory";
import { GameEngine } from "../domain/gameEngine";
import { ClientGameState, PlayerAction, GameState, PlayerActionResult, toClientGameState, emptyGameState, Gladiator } from "../domain/models";

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  data?: T;
}

const STORAGE_KEY = 'starclanData';

class FakeApi {
  private contentFactory: ContentFactory;

  constructor() {
    this.contentFactory = new ContentFactory();
  }

  private saveGameState(state: GameState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  
  private loadGameState(): GameState {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data || data.trim() === '') {
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

    const now = Date.now();
    const startingGladiators = this.contentFactory.getRandomGladiators(3).map((g) => { return { ...g, stamina: 0, status: 'RESTING', lastRefresh: now }});
    const startingWaiverWire = this.contentFactory.getRandomGladiators(3).map((g) => { return { ...g, stamina: 0, status: 'ENSLAVED', lastRefresh: now }});

    const newClanGameState: GameState = {
      clanName: clanName,
      roster: startingGladiators as Gladiator[],
      researchTasks: [],
      lastRefresh: Date.now(),
      timeTravelMs: 0,
      resourcium: Math.random() * 100,
      rosterCapacity: 5,
      waiverWire: startingWaiverWire as Gladiator[],
      debugTimeOffset: 0
    }
    this.saveGameState(newClanGameState);

    return {
      data: toClientGameState(newClanGameState),
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
    const persistedGameState = this.loadGameState();
    //  now run server side logic
    const nextGameState = GameEngine.updateGameStateToNow(persistedGameState, Date.now()); //  calculate next gamestate based on the current time
    this.saveGameState(nextGameState); //  persist the updated state

    //  return a client state
    const clientState = toClientGameState(nextGameState);
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

    const persistedGameState = this.loadGameState();
    const { state: nextState, actionSuccess } = GameEngine.attemptPlayerAction(persistedGameState, Date.now(), playerAction);
    this.saveGameState(nextState);

    const resultForClient = { state: toClientGameState(nextState), actionSuccess };
    return {
      data: resultForClient,
      status: 200,
      success: true
    }
  }

  public debugAddTimeOffset = async (offsetMs: number): Promise<ApiResponse<ClientGameState>> => {
    try {
      const persistedGameState = this.loadGameState();
      
      // Add to existing offset (or initialize if it doesn't exist)
      const currentOffset = persistedGameState.debugTimeOffset || 0;
      const newOffset = currentOffset + offsetMs;
      
      // Update the game state with the new offset
      const updatedState = {
        ...persistedGameState,
        debugTimeOffset: newOffset
      };
      
      // Save the updated state with the new offset
      this.saveGameState(updatedState);
      
      // Run the normal game state update process to apply the new offset
      const nextGameState = GameEngine.updateGameStateToNow(updatedState, Date.now());
      this.saveGameState(nextGameState);
      
      return {
        data: toClientGameState(nextGameState),
        status: 200,
        success: true
      };
    } catch (error) {
      return {
        status: 500,
        success: false
      };
    }
  }
}

// Utility function to simulate api behavior
const mockApiBehavior = async (): Promise<void> => {
  // Simulate random network latency between 500ms and 2000ms.
  const ms = 500 + Math.floor(Math.random() * 1500);
  await new Promise((resolve) => setTimeout(resolve, ms));
  
  // Simulate a 15% chance of failure.
  if (Math.random() < 0.05) {
    throw new Error("Simulated network error");
  }
};

const apiService = new FakeApi();
export default apiService;
