// src/stores/useDataStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import apiService from './fakeApi';

import { PlayerAction, ClientGameState } from '../domain/models';

export type GameSaveStatus = 'UNKNOWN' | 'NO_SAVE_FOUND' | 'SAVE_LOADED';

interface ActionStatus {
  isProcessing: boolean;
  targetId?: string;
  actionType: PlayerAction['type'];
  error?: string;
}

export interface StarclanAppState {
  // UI and meta state
  isShowingDebugPanel: boolean;
  isLoadingGameState: boolean;
  isApiProcessing: boolean;
  loadError: string | null;
  saveError: string | null;
  gameSaveStatus: GameSaveStatus;
  activeActions: ActionStatus[];

  getStarDate: () => number;

  // The actual game state
  gameState: ClientGameState | null;

  // Game Actions
  timeTravel: (timeMs: number) => Promise<void>;
  attemptPlayerAction: (gameAction: PlayerAction) => Promise<void>;
  refreshGameState: () => Promise<void>;
  startNewClan: (clanName: string) => Promise<void>;

  // Action tracking
  isActionProcessing: (actionType: string, targetId?: string) => boolean;
  trackAction: (action: PlayerAction) => void;
  clearAction: (actionType: string, targetId?: string) => void;

  // Actions
  showDebugPanel: (show: boolean) => void;
  deleteData: () => void;
}

function isValidGameState(state: ClientGameState): boolean {
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
      activeActions: [],

      // -------------------------------------------
      // Helpers
      // -------------------------------------------
      getStarDate: () => {
        const gs = get().gameState;
        if (!gs) return 0;
        return gs.lastRefresh + gs.timeTravelMs;
      },

      // -------------------------------------------
      // Action Tracking
      // -------------------------------------------
      isActionProcessing: (actionType: string, targetId?: string) => {
        return get().activeActions.some(
          action => action.actionType === actionType && 
                   action.targetId === targetId && 
                   action.isProcessing
        );
      },

      trackAction: (action: PlayerAction) => {
        set(state => {
          const targetId = action.type === 'RECRUIT_GLADIATOR' 
            ? `empty-slot-${action.targetSlot}`
            : 'gladiatorName' in action 
              ? action.gladiatorName 
              : undefined;

          state.activeActions.push({
            actionType: action.type,
            targetId,
            isProcessing: true
          });
        });
      },

      clearAction: (actionType: string, targetId?: string) => {
        set(state => {
          state.activeActions = state.activeActions.filter(
            action => !(action.actionType === actionType && action.targetId === targetId)
          );
        });
      },

      // -------------------------------------------
      // Game Actions
      // -------------------------------------------
      startNewClan: async (clanName: string) => {
        set((s) => { s.isApiProcessing = true; });
        const response = await apiService.startNewClan(clanName);
        if (response.success) {
          set((s) => {
            s.gameState = response.data!,
            s.gameSaveStatus = 'SAVE_LOADED'
          })
        }
        set((s) => { s.isApiProcessing = false; });
      },

      //  fake the passage of time so we can iterate on the game quickly
      //  ##MISSING currently not doing anything when we get a fail api response
      timeTravel: async (timeMs: number) => {
        set((s) => { s.isApiProcessing = true; });
        const response = await apiService.timeTravel(timeMs);
        if (response.success) {
          set((s) => { 
            s.gameState = response.data!;
           })
        }
        set((s) => { s.isApiProcessing = false; });
      },

      //  submits an action conveying player intent to the game engine via our api
      //  ##MISSING currently not doing anything with action result success/fail
      //  ##MISSING currently not doing anything when we get a fail api response
      attemptPlayerAction: async (playerAction: PlayerAction) => {
        set(state => { 
          state.isApiProcessing = true;
          state.trackAction(playerAction);
        });

        try {
          const response = await apiService.postPlayerAction(playerAction);
          if (response.success) {
            set(state => { 
              state.gameState = response.data!.state;
              state.clearAction(
                playerAction.type,
                'gladiatorName' in playerAction ? playerAction.gladiatorName : undefined
              );
            });
          } else {
            set(state => {
              const targetId = 'gladiatorName' in playerAction ? playerAction.gladiatorName : undefined;
              const actionIndex = state.activeActions.findIndex(
                a => a.actionType === playerAction.type && a.targetId === targetId
              );
              if (actionIndex !== -1) {
                state.activeActions[actionIndex].error = 'Action failed';
                state.activeActions[actionIndex].isProcessing = false;
              }
            });
          }
        } catch (error) {
          set(state => {
            const targetId = 'gladiatorName' in playerAction ? playerAction.gladiatorName : undefined;
            const actionIndex = state.activeActions.findIndex(
              a => a.actionType === playerAction.type && a.targetId === targetId
            );
            if (actionIndex !== -1) {
              state.activeActions[actionIndex].error = error instanceof Error ? error.message : 'Unknown error';
              state.activeActions[actionIndex].isProcessing = false;
            }
          });
        } finally {
          set(state => { state.isApiProcessing = false; });
        }
      },

      //  get latest game state from the api
      //  ##MISSING eventually this kind of api call will need to pass some kind of auth token with playerId
      refreshGameState: async () => {
        set((state) => { state.isApiProcessing = true; });
        const response = await apiService.getClientGameState();
        if (response.success) {
          const responseGameState = response.data!;
          const isValid = isValidGameState(responseGameState);
          set((s) => {
            s.gameState = isValid ? responseGameState : null;
            s.gameSaveStatus = isValid ? 'SAVE_LOADED' : 'NO_SAVE_FOUND';
          })
        }
        set((s) => { s.isApiProcessing = false; });
      },

      // -------------------------------------------
      // UI Actions
      // -------------------------------------------
      showDebugPanel: (show: boolean) => {
        set((state) => {
          state.isShowingDebugPanel = show;
        });
      },

      //  utility delete function that won't exist in the final game
      deleteData: () => {
        apiService.deleteGameState();
        set((state) => {
          state.gameState = null;
          state.gameSaveStatus = 'NO_SAVE_FOUND';
        });
      },

    })),
    { name: 'StarclanStore' }
  )
);

export default useStarclanStore;
