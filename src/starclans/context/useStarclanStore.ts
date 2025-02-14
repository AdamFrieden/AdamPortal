// src/stores/useDataStore.ts
import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { deleteData, FakePlayerActionResponse, getDataFromFakeApi, postActionToFakeApi, postRefreshToFakeApi, saveDataToFakeApi } from './fakeApi';
import { GamePlayerAction, GameState } from '../domain/models';

// app should start UNKNOWN, then once a load successful happens
// set to NO_SAVE_FOUND if there is no valid data,
// or SAVE_LOADED if valid data is found
export type GameSaveStatus = 'UNKNOWN' | 'NO_SAVE_FOUND' | 'SAVE_LOADED';

interface StarclanAppState {
  isLoadingGameState: boolean;
  isApiProcessing: boolean;
  loadError: string | null;
  saveError: string | null;
  deleteData: () => void;
  loadData: () => Promise<void>;
  saveData: (data: GameState) => Promise<void>;
  refreshData: () => Promise<void>;
  tryGameAction: (gameAction: GamePlayerAction) => Promise<void>;
  gameState: GameState | null;
  gameSaveStatus: GameSaveStatus;
}

export const getStartingGameState = (name: string): GameState => {
  return {
    clanName: name,
    researchTasks: [],
    resourcium: 100,
    lastRefresh: Date.now(),
    timeTravelMs: 0
  };
}

const isValidGameState = (state: GameState): boolean => {
  return !!state?.clanName && state.clanName.length > 2;
};

const storeLogic: StateCreator<StarclanAppState> = (set, get) => ({
  isLoadingGameState: false,
  isApiProcessing: false,
  loadError: null,
  saveError: null,
  gameState: null,
  gameSaveStatus: 'UNKNOWN',
  deleteData: () => {
    deleteData();
    {set({ gameState: null, gameSaveStatus: 'NO_SAVE_FOUND' })};
  },
  refreshData: async () => {
    set({ isApiProcessing: true })
    try {
      const data = await postRefreshToFakeApi(get().gameState!);
      if (data.responseSuccess) {
        set({ gameState: data});
      }
      set({ isApiProcessing: false });
    } catch (error: any) {
      set({ loadError: error.message, isApiProcessing: false });
    }
  },
  loadData: async () => {
    set({ isLoadingGameState: true, isApiProcessing: true, loadError: null });
    try {
      const data = await getDataFromFakeApi();
      const isValid = isValidGameState(data);
      const saveStatus: GameSaveStatus = isValid ? 'SAVE_LOADED' : 'NO_SAVE_FOUND';
      const stateToSave = isValid ? data : null;
      set({ gameSaveStatus: saveStatus,  gameState: stateToSave, isLoadingGameState: false, isApiProcessing: false });
    } catch (error: any) {
      set({ loadError: error.message, isLoadingGameState: false, isApiProcessing: false });
    }
  },
  saveData: async (newData: GameState) => {
    set({ saveError: null, isApiProcessing: true });
    try {
      const savedData = await saveDataToFakeApi(newData);
      set({ gameState: savedData, isApiProcessing: false, gameSaveStatus: 'SAVE_LOADED'});
    } catch (error: any) {
      set({ saveError: error.message, isApiProcessing: false });
    }
  },
  tryGameAction: async (gameAction: GamePlayerAction) => {
    set({ isApiProcessing: true })
    try {
      const actionResult: FakePlayerActionResponse & GameState  = await postActionToFakeApi(gameAction, get().gameState!);
      if (actionResult.responseSuccess) {
        set({ gameState: actionResult as GameState, isApiProcessing: false })
      }
    } catch (error: any) {
      set({ saveError: error.message, isApiProcessing: false });
    }
  }
});

const useStarclanStore = create<StarclanAppState>()(devtools(storeLogic, { name: 'StarclanStore' }));
// const useStarclanStore = create<StarclanAppState>()(storeLogic);

export default useStarclanStore;
