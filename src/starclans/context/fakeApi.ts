// src/api/fakeApi.ts

import { GameRunService } from "../domain/gameRunService";
import { ClientGameState, PlayerAction, PlayerActionResult, toClientGameState } from "../domain/models";

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  data?: T;
}

export interface IApiService {
  startNewClan(clanName: string): Promise<ApiResponse<ClientGameState>>;
  getClientGameState(): Promise<ApiResponse<ClientGameState>>;
  deleteGameState(): Promise<ApiResponse<void>>;
  postPlayerAction(playerAction: PlayerAction): Promise<ApiResponse<PlayerActionResult<ClientGameState>>>;
  debugAddTimeOffset(offsetMs: number): Promise<ApiResponse<ClientGameState>>;
}

class FakeApi implements IApiService {

  private gameRunService: GameRunService;
  constructor(gameRunService?: GameRunService) {
    this.gameRunService = gameRunService || new GameRunService();
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

    const newClanGameState = this.gameRunService.startNewClan(clanName);

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

    // eventually we will need to pull in game state/context or whatever based on playerId or something 
    const currentGameState = this.gameRunService.updateGameStateToNow();

    // how do we handle a battle that takes place between two players?
    // can we resolve the battle for one of the players first?

    // if I'm viewing someone else's clan, I want to see their most update state, not wait until they refresh
    
    

    return {
      data: toClientGameState(currentGameState),
      status: 200,
      success: true
    }
  }

  public deleteGameState = async (): Promise<ApiResponse<void>> => {
    this.gameRunService.deleteGameState();
    return {
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

    const result = this.gameRunService.tryPlayerAction(playerAction);

    const resultForClient = { state: toClientGameState(result.state), actionSuccess: result.actionSuccess };
    return {
      data: resultForClient,
      status: 200,
      success: true
    }
  }

  public debugAddTimeOffset = async (offsetMs: number): Promise<ApiResponse<ClientGameState>> => {
    try {
      const nextGameState = this.gameRunService.addDebugTimeOffset(offsetMs);
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

const apiService: IApiService = new FakeApi();
export default apiService;
