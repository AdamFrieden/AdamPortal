import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import apiService from './fakeApi';
import useStarclanUIStore from './useStarclanUIStore';
import { PlayerAction, ClientGameState } from '../domain/models';

export type GameSaveStatus = 'UNKNOWN' | 'NO_SAVE_FOUND' | 'SAVE_LOADED';

export interface StarclanGameState {
  // Game state
  gameState: ClientGameState | null;
  gameSaveStatus: GameSaveStatus;

  // Computed values
  getStarDate: () => number;

  // Game Actions
  timeTravel: (timeMs: number) => Promise<void>;
  attemptPlayerAction: (gameAction: PlayerAction) => Promise<void>;
  refreshGameState: () => Promise<void>;
  startNewClan: (clanName: string) => Promise<void>;
  deleteData: () => void;
}

function isValidGameState(state: ClientGameState): boolean {
  return !!state?.clanName && state.clanName.length > 2;
}

const useStarclanGameStore = create<StarclanGameState>()(
  devtools(
    immer<StarclanGameState>((set, get) => ({
      // Initial states
      gameState: null,
      gameSaveStatus: 'UNKNOWN',

      // Computed values
      getStarDate: () => {
        const gs = get().gameState;
        if (!gs) return 0;
        return gs.lastRefresh + gs.timeTravelMs;
      },

      // Game Actions
      startNewClan: async (clanName: string) => {
        useStarclanUIStore.getState().setApiProcessing(true);
        const response = await apiService.startNewClan(clanName);
        if (response.success) {
          set((s) => {
            s.gameState = response.data!;
            s.gameSaveStatus = 'SAVE_LOADED';
          });
        }
        useStarclanUIStore.getState().setApiProcessing(false);
      },

      timeTravel: async (timeMs: number) => {
        useStarclanUIStore.getState().setApiProcessing(true);
        const response = await apiService.timeTravel(timeMs);
        if (response.success) {
          set((s) => {
            s.gameState = response.data!;
          });
        }
        useStarclanUIStore.getState().setApiProcessing(false);
      },

      attemptPlayerAction: async (playerAction: PlayerAction) => {
        useStarclanUIStore.getState().setApiProcessing(true);
        const response = await apiService.postPlayerAction(playerAction);
        if (response.success) {
          set((s) => {
            s.gameState = response.data!.state;
          });
        }
        useStarclanUIStore.getState().setApiProcessing(false);
      },

      refreshGameState: async () => {
        useStarclanUIStore.getState().setApiProcessing(true);
        const response = await apiService.getClientGameState();
        if (response.success) {
          const responseGameState = response.data!;
          const isValid = isValidGameState(responseGameState);
          set((s) => {
            s.gameState = isValid ? responseGameState : null;
            s.gameSaveStatus = isValid ? 'SAVE_LOADED' : 'NO_SAVE_FOUND';
          });
        }
        useStarclanUIStore.getState().setApiProcessing(false);
      },

      deleteData: () => {
        apiService.deleteGameState();
        set((state) => {
          state.gameState = null;
          state.gameSaveStatus = 'NO_SAVE_FOUND';
        });
      },
    })),
    { name: 'StarclanGameStore' }
  )
);

export default useStarclanGameStore; 