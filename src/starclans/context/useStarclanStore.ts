// src/stores/useDataStore.ts
import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { FakePlayerActionResponse, getDataFromFakeApi, postActionToFakeApi, postRefreshToFakeApi, saveDataToFakeApi } from './fakeApi';
import { GamePlayerAction, GameState } from '../domain/models';

interface StarclanAppState {
  isLoadingLoad: boolean;
  isLoadingSave: boolean;
  loadError: string | null;
  saveError: string | null;
  loadData: () => Promise<void>;
  saveData: (data: GameState) => Promise<void>;
  refreshData: () => Promise<void>;
  tryGameAction: (gameAction: GamePlayerAction) => Promise<void>;
  gameState: GameState;
}

const storeLogic: StateCreator<StarclanAppState> = (set, get) => ({
  isLoadingLoad: false,
  isLoadingSave: false,
  loadError: null,
  saveError: null,
  gameState: {
    researchTasks: [],
    lastRefresh: Date.now(),
    clanName: 'ClanNameHere',
    timeTravelMs: 0,
    resourcium: 0,
  },
  refreshData: async () => {
    set({ isLoadingLoad: true, loadError: null });
    try {
      const data: GameState = await postRefreshToFakeApi(get().gameState);
      set({ gameState: data, isLoadingLoad: false });
    } catch (error: any) {
      set({ loadError: error.message, isLoadingLoad: false });
    }
  },
  loadData: async () => {
    set({ isLoadingLoad: true, loadError: null });
    try {
      const data = await getDataFromFakeApi();
      set({ gameState: data, isLoadingLoad: false });
    } catch (error: any) {
      set({ loadError: error.message, isLoadingLoad: false });
    }
  },
  saveData: async (newData: GameState) => {
    set({ isLoadingSave: true, saveError: null });
    try {
      const savedData = await saveDataToFakeApi(newData);
      set({ gameState: savedData, isLoadingSave: false });
    } catch (error: any) {
      set({ saveError: error.message, isLoadingSave: false });
    }
  },
  tryGameAction: async (gameAction: GamePlayerAction) => {
    try {
      const actionResult: FakePlayerActionResponse & GameState  = await postActionToFakeApi(gameAction, get().gameState);
      if (actionResult.responseSuccess) {
        set({ gameState: actionResult as GameState })
      }
    } catch (error: any) {
      set({ saveError: error.message, isLoadingSave: false });
    }
  }
});

const useStarclanStore = create<StarclanAppState>()(devtools(storeLogic, { name: 'StarclanStore' }));
// const useStarclanStore = create<StarclanAppState>()(storeLogic);

export default useStarclanStore;
