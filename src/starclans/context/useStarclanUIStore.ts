import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface StarclanUIState {
  isShowingDebugPanel: boolean;
  isLoadingGameState: boolean;
  isApiProcessing: boolean;
  loadError: string | null;
  saveError: string | null;

  // Actions
  showDebugPanel: (show: boolean) => void;
  setApiProcessing: (isProcessing: boolean) => void;
  setLoadError: (error: string | null) => void;
  setSaveError: (error: string | null) => void;
}

const useStarclanUIStore = create<StarclanUIState>()(
  devtools(
    immer<StarclanUIState>((set) => ({
      // Initial states
      isShowingDebugPanel: false,
      isLoadingGameState: false,
      isApiProcessing: false,
      loadError: null,
      saveError: null,

      // Actions
      showDebugPanel: (show: boolean) => {
        set((state) => {
          state.isShowingDebugPanel = show;
        });
      },
      setApiProcessing: (isProcessing: boolean) => {
        set((state) => {
          state.isApiProcessing = isProcessing;
        });
      },
      setLoadError: (error: string | null) => {
        set((state) => {
          state.loadError = error;
        });
      },
      setSaveError: (error: string | null) => {
        set((state) => {
          state.saveError = error;
        });
      },
    })),
    { name: 'StarclanUIStore' }
  )
);

export default useStarclanUIStore; 