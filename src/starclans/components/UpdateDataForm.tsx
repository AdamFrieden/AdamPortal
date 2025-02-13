import React, { useState } from 'react';
import useStarclanStore from '../context/useStarclanStore';

function UpdateDataForm() {
  // We'll grab the existing data to pre-fill our form
  const isLoadingGameState = useStarclanStore((state) => state.isLoadingGameState);
  const saveError = useStarclanStore((state) => state.saveError);

  // Action to save data
  const saveData = useStarclanStore((state) => state.saveData);
  const currentGameState = useStarclanStore((state) => state.gameState);

  // Local state for form inputs
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to the store (which simulates the API call)
    currentGameState!.clanName = name;
    saveData(currentGameState!);
  };

  return (
    <div>
      <h2>Update Data</h2>
      {saveError && <p style={{ color: 'red' }}>Error: {saveError}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoadingGameState}
            />
          </label>
        </div>
        <button type="submit" disabled={isLoadingGameState}>
          {isLoadingGameState ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default UpdateDataForm;
