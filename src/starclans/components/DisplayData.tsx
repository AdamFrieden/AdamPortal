import { useEffect } from 'react';
import useStarclanStore from '../context/useStarclanStore';
import { GameState } from '../domain/models';

function DisplayData() {
  // We selectively subscribe to only the parts of state we need.
  const data = useStarclanStore((state) => state.gameState);
  const isLoadingGameState = useStarclanStore((state) => state.isLoadingGameState);
  const loadError = useStarclanStore((state) => state.loadError);
  
  // Action to load data
  const loadData = useStarclanStore((state) => state.loadData);
  const refreshData = useStarclanStore((state) => state.refreshGameState)

  // Automatically load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  if (isLoadingGameState) {
    return <div>Loading data...</div>;
  }

  if (loadError) {
    return (
      <div>
        <p style={{ color: 'red' }}>Error: {loadError}</p>
        <button onClick={loadData}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Display Data</h2>
      <pre>{JSON.stringify(data as GameState, null, 2)}</pre>
      <button onClick={loadData}>Reload Data</button>
      <button onClick={refreshData}>Refresh</button>
    </div>
  );
}

export default DisplayData;
