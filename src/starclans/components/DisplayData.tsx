import useStarclanStore from '../context/useStarclanStore';
import { GameState } from '../domain/models';

function DisplayData() {
  // We selectively subscribe to only the parts of state we need.
  const data = useStarclanStore((state) => state.gameState);
  const isLoadingGameState = useStarclanStore((state) => state.isLoadingGameState);
  const loadError = useStarclanStore((state) => state.loadError);
  
  // Action to load data
  const refreshData = useStarclanStore((state) => state.refreshGameState)

  if (isLoadingGameState) {
    return <div>Loading data...</div>;
  }

  if (loadError) {
    return (
      <div>
        <p style={{ color: 'red' }}>Error: {loadError}</p>
        <button onClick={() => {}}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Display Data</h2>
      <pre>{JSON.stringify(data as GameState, null, 2)}</pre>
      <button onClick={() => {}}>Reload Data</button>
      <button onClick={refreshData}>Refresh</button>
    </div>
  );
}

export default DisplayData;
