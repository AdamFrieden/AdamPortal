import { useEffect, useRef } from 'react';
import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';

const REFRESH_INTERVAL = 5000; // 5 seconds

export default function GameStateHeartbeat() {
  const apiProcessing = useStarclanUIStore((state) => state.isApiProcessing);
  const hasGameState = useStarclanGameStore((state) => !!state.gameState);
  const refreshGameState = useStarclanGameStore((state) => state.refreshGameState);

  // Keep a ref that always mirrors the latest value of apiProcessing
  const apiProcessingRef = useRef(apiProcessing);
  useEffect(() => {
    apiProcessingRef.current = apiProcessing;
  }, [apiProcessing]);

  useEffect(() => {
    // Attempt an immediate refresh if not currently processing
    if (!apiProcessingRef.current) {
      refreshGameState();
    }

    const timer = setInterval(() => {
      if (!apiProcessingRef.current && hasGameState) {
        refreshGameState();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [hasGameState, refreshGameState]);

  // This component doesn't render anything
  return null;
} 