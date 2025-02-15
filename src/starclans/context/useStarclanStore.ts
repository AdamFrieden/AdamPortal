// src/stores/useDataStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  deleteData,
  FakePlayerActionResponse,
  getDataFromFakeApi,
  postActionToFakeApi,
  postRefreshToFakeApi,
  saveDataToFakeApi,
} from './fakeApi';

import { GamePlayerAction, GameState } from '../domain/models';

export type GameSaveStatus = 'UNKNOWN' | 'NO_SAVE_FOUND' | 'SAVE_LOADED';

export interface StarclanAppState {
  // UI and meta state
  isShowingDebugPanel: boolean;
  isLoadingGameState: boolean;
  isApiProcessing: boolean;
  loadError: string | null;
  saveError: string | null;
  gameSaveStatus: GameSaveStatus;

  // The actual game state
  gameState: GameState | null;

  // GameState helpers
  getStarDate: () => number;

  // Actions
  showDebugPanel: (show: boolean) => void;
  updateGameState: (partial: Partial<GameState>) => void;
  deleteData: () => void;
  loadData: () => Promise<void>;
  saveData: (data: GameState) => Promise<void>;
  refreshData: () => Promise<void>;
  tryGameAction: (gameAction: GamePlayerAction) => Promise<void>;
}

export function getStartingGameState(name: string): GameState {
  return {
    clanName: name,
    researchTasks: [],
    resourcium: 100,
    lastRefresh: Date.now(),
    timeTravelMs: 0,
  };
}

function isValidGameState(state: GameState): boolean {
  return !!state?.clanName && state.clanName.length > 2;
}

const useStarclanStore = create<StarclanAppState>()(
  devtools(
    immer<StarclanAppState>((set, get) => ({
      // -------------------------------------------
      // Initial states
      // -------------------------------------------
      isShowingDebugPanel: false,
      isLoadingGameState: false,
      isApiProcessing: false,
      loadError: null,
      saveError: null,
      gameState: null,
      gameSaveStatus: 'UNKNOWN',

      // -------------------------------------------
      // Helpers
      // -------------------------------------------
      getStarDate: () => {
        const gs = get().gameState;
        if (!gs) return 0;
        return gs.lastRefresh + gs.timeTravelMs;
      },

      // -------------------------------------------
      // Actions
      // -------------------------------------------
      showDebugPanel: (show: boolean) => {
        set((state) => {
          state.isShowingDebugPanel = show;
        });
      },

      updateGameState: (partial: Partial<GameState>) => {
        set((state) => {
          if (!state.gameState) return;
          // Merge the incoming partial into the existing gameState
          Object.assign(state.gameState, partial);
        });
      },

      deleteData: () => {
        deleteData();
        set((state) => {
          state.gameState = null;
          state.gameSaveStatus = 'NO_SAVE_FOUND';
        });
      },

      refreshData: async () => {
        set((state) => {
          state.isApiProcessing = true;
        });
        try {
          const data = await postRefreshToFakeApi(get().gameState!);
          if (data.responseSuccess) {
            set((state) => {
              state.gameState = data;
            });
          }
          set((state) => {
            state.isApiProcessing = false;
          });
        } catch (error: any) {
          set((state) => {
            state.loadError = error.message;
            state.isApiProcessing = false;
          });
        }
      },

      loadData: async () => {
        set((state) => {
          state.isLoadingGameState = true;
          state.isApiProcessing = true;
          state.loadError = null;
        });
        try {
          const data = await getDataFromFakeApi();
          const valid = isValidGameState(data);
          set((state) => {
            state.gameSaveStatus = valid ? 'SAVE_LOADED' : 'NO_SAVE_FOUND';
            state.gameState = valid ? data : null;
            state.isLoadingGameState = false;
            state.isApiProcessing = false;
          });
        } catch (error: any) {
          set((state) => {
            state.loadError = error.message;
            state.isLoadingGameState = false;
            state.isApiProcessing = false;
          });
        }
      },

      saveData: async (newData: GameState) => {
        set((state) => {
          state.saveError = null;
          state.isApiProcessing = true;
        });
        try {
          const savedData = await saveDataToFakeApi(newData);
          set((state) => {
            state.gameState = savedData;
            state.isApiProcessing = false;
            state.gameSaveStatus = 'SAVE_LOADED';
          });
        } catch (error: any) {
          set((state) => {
            state.saveError = error.message;
            state.isApiProcessing = false;
          });
        }
      },

      tryGameAction: async (gameAction: GamePlayerAction) => {
        set((state) => {
          state.isApiProcessing = true;
        });
        try {
          const actionResult: FakePlayerActionResponse & GameState =
            await postActionToFakeApi(gameAction, get().gameState!);
          if (actionResult.responseSuccess) {
            set((state) => {
              state.gameState = actionResult;
              state.isApiProcessing = false;
            });
          }
        } catch (error: any) {
          set((state) => {
            state.saveError = error.message;
            state.isApiProcessing = false;
          });
        }
      },
    })),
    { name: 'StarclanStore' }
  )
);

export default useStarclanStore;
