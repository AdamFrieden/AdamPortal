import { ContentFactory } from "./contentFactory";
import { GameEngine } from "./gameEngine";
import { emptyGameState, GameState, Gladiator, PlayerAction, PlayerActionResult } from "./models";

export interface IGameRunService {
    deleteGameState(): void;
    getGameState(): GameState;
    tryPlayerAction(playerAction: PlayerAction): PlayerActionResult<GameState>;
    startNewClan(clanName: string): GameState;
    addDebugTimeOffset(offsetMs: number): GameState;
}

export class GameRunService implements IGameRunService {
    private contentFactory: ContentFactory;
    private STORAGE_KEY = 'starclanData';

    constructor() {
        this.contentFactory = new ContentFactory();
    }

    public deleteGameState(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    public getGameState(): GameState {
        const persistedGameState = this.loadGameState();

        //  now run server side logic
        const nextGameState = GameEngine.updateGameStateToNow(persistedGameState, Date.now()); //  calculate next gamestate based on the current time

        // instead we might want to do something like this:
        // while (!finishedUpdating) {
        //      const nextEventCompleteTime = GameEngine.getNextEventCompleteTime(persistedGameState);
        //      const jumpToTime = Math.min(nextEventCompleteTime, Date.now());
        //      const nextGameState = GameEngine.updateGameStateToNow(persistedGameState, jumpToTime); //  calculate next gamestate based on the current time
        //      persistedGameState = nextGameState;
        //      finishedUpdating = jumpToTime >= Date.now();
        // }

        this.saveGameState(nextGameState); //  persist the updated state
    
        return nextGameState;
    }

    public tryPlayerAction(playerAction: PlayerAction): PlayerActionResult<GameState> {
        const persistedGameState = this.loadGameState();
        const { state: nextState, actionSuccess } = GameEngine.attemptPlayerAction(persistedGameState, Date.now(), playerAction);
        this.saveGameState(nextState);
        return { state: nextState, actionSuccess };
    }

    public startNewClan(clanName: string): GameState {
        const now = Date.now();
        const startingGladiators = this.contentFactory.getRandomGladiators(3).map((g) => { return { ...g, stamina: 0, status: 'RESTING', lastRefresh: now }});
        const startingWaiverWire = this.contentFactory.getRandomGladiators(3).map((g) => { return { ...g, stamina: 0, status: 'ENSLAVED', lastRefresh: now }});
    
        const newClanGameState: GameState = {
          clanName: clanName,
          roster: startingGladiators as Gladiator[],
          researchTasks: [],
          lastRefresh: Date.now(),
          debugTimeOffset: 0,
          resourcium: Math.random() * 100,
          rosterCapacity: 5,
          waiverWire: startingWaiverWire as Gladiator[]
        }
        this.saveGameState(newClanGameState);
        return newClanGameState;
    }

    public addDebugTimeOffset(offsetMs: number): GameState {
        const persistedGameState = this.loadGameState();
      
      // Add to existing offset (or initialize if it doesn't exist)
        const currentOffset = persistedGameState.debugTimeOffset || 0;
        const newOffset = currentOffset + offsetMs;
        
        // Update the game state with the new offset
        const updatedState = {
            ...persistedGameState,
            debugTimeOffset: newOffset
        };
        
        // Save the updated state with the new offset
        this.saveGameState(updatedState);
        
        // Run the normal game state update process to apply the new offset
        const nextGameState = GameEngine.updateGameStateToNow(updatedState, Date.now());
        this.saveGameState(nextGameState);

        return nextGameState;
    }

    private loadGameState(): GameState {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data || data.trim() === '') {
          return emptyGameState();
        }
        return JSON.parse(data) as GameState;
      }

    private saveGameState(state: GameState): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
}
