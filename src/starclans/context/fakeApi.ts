// src/api/fakeApi.ts

import { refreshGameState, tryPlayerAction } from "../domain/gameEngine";
import { GamePlayerAction, GameState } from "../domain/models";

export interface FakeApiResponse {
  responseCode: number;
  responseSuccess: boolean;
}

export interface FakePlayerActionResponse extends FakeApiResponse {
  actionValid: boolean;
}

export const deleteData = () => {
  localStorage.removeItem('starclanData');
}

export const getDataFromFakeApi = async (): Promise<GameState> => {
  await randomDelay();
  maybeFail();
  
  const data = localStorage.getItem('starclanData');
  return data ? JSON.parse(data) : {};
};

//  ultimately the api should never be doing this - we should only make requests and let the game engine change state
export const saveDataToFakeApi = async (state: GameState): Promise<any> => {
  await randomDelay();
  // maybeFail();

  saveToFakeDatabase(state)
  return state;
};

export const postRefreshToFakeApi = async (state: GameState): Promise<any> => {
  await randomDelay();
  try {
    maybeFail();
  } catch (error: any) {
    return {
      responseCode: 500,
      responseSuccess: false,
    }
  }

  const refreshedState = refreshGameState(state);
  saveToFakeDatabase(refreshedState as GameState);

  const response: FakeApiResponse & GameState & { elapsedTimeMs: number } = {
    responseCode: 200,
    responseSuccess: true,
    ...refreshedState
  }
  return response;
}

// notably posting a player action doesn't call refresh on the gameState so no time will progress
export const postActionToFakeApi = async (playerAction: GamePlayerAction, state: GameState): Promise<any> => {
  await randomDelay();
  try {
    maybeFail();
  } catch (error: any) {
    return {
      responseCode: 500,
      responseSuccess: false,
    }
  }

  const gameResult = tryPlayerAction(state, playerAction)
  saveToFakeDatabase(gameResult)

  const response: FakePlayerActionResponse & GameState = {
    actionValid: gameResult.success,
    responseCode: 200,
    responseSuccess: true,
    ...gameResult
  };

  return response;
}

const saveToFakeDatabase = (state: GameState) => {
  localStorage.setItem('starclanData', JSON.stringify(state));
}

// Utility to simulate random network latency: 0.5s to 2.0s
const randomDelay = async () => {
  const ms = 500 + Math.floor(Math.random() * 1500);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Utility to simulate random chance of failure (15%).
const maybeFail = () => {
  if (Math.random() < 0.15) {
    throw new Error('Simulated network error');
  }
};