# StarClans App Architecture

## 1. Architectural Overview

### Core Design Philosophy
StarClans is designed as a single-player game with client-side simulation, built with the architecture to eventually support server-side authority and multi-player features. The game uses a time-based progression system where game state evolves based on elapsed real-world time.

### High-level Structure
- **Domain Layer**: Contains the game logic, models, and pure functions that define how the game state changes
- **API Layer**: Simulates a real backend service with artificial latency and occasional failures
- **State Management**: Zustand stores that separate game state from UI state and allow state management across the app
- **Component Layer**: React components that render the game UI based on the current state

## 2. Key Architectural Components

### Game Engine (Domain Logic)
The GameEngine is the core of the application's domain logic with these key characteristics:
- **Pure Functional Design**: All functions are pure with no side effects
- **Immutable State Transitions**: All state changes return new state objects without mutations
- **Time-based Mechanics**: Game progression is tied to actual elapsed time
- **Self-contained Rules**: Encapsulates all game rules and mechanics

Example implementations:
- Research task progression based on elapsed time
- Gladiator stamina regeneration/depletion based on status and time
- Network scanning mechanics with timed completion

### Fake API Layer
The FakeApi service simulates a real-world API with:
- **Realistic Behavior**: Simulates network latency and occasional failures
- **Local Persistence**: Uses localStorage for game state persistence
- **Clean Separation**: Acts as a boundary between UI and game logic
- **Future-proof Design**: Structured for easy replacement with real backend services

All game state changes must flow through this layer, maintaining a clean architecture that can later be connected to a real backend.

Only part of game state is exposed to the front-end client UI. Certain information is hidden for game specific mechanics (hidden information) as well as to prevent client-side hacking of sensitive values.

### State Management (Zustand)
State is managed through two separate Zustand stores:

#### useStarclanGameStore
- Manages the actual game state data
- Handles interactions with the API layer
- Provides methods for game actions (training gladiators, research, etc.)
- Computes derived game state values

#### useStarclanUIStore
- Manages UI-specific state (loading indicators, panel visibility)
- Handles error messages and UI feedback
- Keeps UI concerns separate from game logic

### State Access Pattern
Components interact with state using these patterns:
- **Selective Subscription**: Components access state via Zustand store selectors, subscribing only to specific pieces of state they need
- **Minimal Re-renders**: By subscribing to only the needed state, components minimize unnecessary re-renders
- **Direct Action Access**: Action methods are accessed directly from the store, not passed down through props
- **Shared State**: Multiple components can access the same state without prop drilling

Example of a component using the state access pattern:
```typescript
const GameView = () => {
  // Subscribe only to specific pieces of state
  const gameState = useStarclanGameStore((state) => state.gameState);
  const attemptPlayerAction = useStarclanGameStore((state) => state.attemptPlayerAction);
  const isApiProcessing = useStarclanUIStore((state) => state.isApiProcessing);
  
  // Component can directly call actions when needed
  const handleAction = () => {
    attemptPlayerAction({ type: ACTION_TYPES.START_SCAN });
  };
  
  // Render using only the state this component cares about
};
```

## 3. Data Flow

### Player Action Flow
1. Player initiates an action through the UI
2. Component calls relevant method on useStarclanGameStore
3. Store calls appropriate API method
4. API simulates network behavior (delay, possible failure)
5. API calls GameEngine to compute new state
6. GameEngine applies action and returns new immutable state
7. API persists new state to localStorage
8. API translate game state to client game state and returns it to the store
9. Store updates its state, triggering UI re-renders

### State Refresh Cycle
- GameStateHeartbeat component polls for state updates on a regular interval
- Each refresh updates time-based progressions
- Ensures game state reflects the passage of real-world time

## 4. Game State Model

### Core Model Design
The game state is separated into server-side and client-side variants:
- **GameState**: Complete state used on the server side
- **ClientGameState**: Filtered/computed state sent to the client

This separation allows for:
- Security (hiding sensitive data from clients)
- Bandwidth optimization (sending only necessary data)
- Clean architecture (separating concerns)

### Server vs Client State Distinction
The separation between GameState and ClientGameState is a fundamental architectural choice that provides several benefits:

- **Game Integrity Protection**: The server-side GameState contains sensitive data that should never be exposed to clients, such as:
  - `truePower` values of gladiators that represent their actual strength
  - `hiddenTraits` that players must discover through gameplay
  - Internal calculations and random seeds
  
- **Progressive Revelation**: This pattern enables game mechanics where players discover information gradually:
  - Players see `estimatedPower` instead of the true power of gladiators
  - Hidden traits are revealed through gameplay, not inspecting state
  - Creates tension between perceived vs actual capabilities

- **Anti-Cheat Foundation**: Even in a client-side game, this separation establishes patterns for eventual server-side validation:
  - Prevents client-side hacking by hiding critical values
  - Prepares for future migration to true client-server architecture
  - Allows for "fog of war" style game mechanics

- **Type-Safety Through Transformation**: The transformation from server to client state is enforced by TypeScript:
  ```typescript
  // Type definition ensuring client can't access hidden properties
  export type ClientGladiator = Omit<Gladiator, 'truePower' | 'hiddenTraits'>
  
  // Transformation function ensuring clean conversion
  export function toClientGameState(state: GameState): ClientGameState {
    return {
      ...state,
      roster: state.roster.map(toClientGladiator),
    };
  }
  ```

### State Transition Rules
- All state transitions must go through the GameEngine
- Time-based progressions are calculated based on the time delta since last refresh
- Player actions are validated before being applied
- Debug time offsets allow for testing time-based mechanics

## 5. Development Tools

### Debug Panel
- Allows manipulation of game time for testing
- Provides visibility into internal game state
- Enables testing of time-based progressions without waiting
- Toggle visibility with useStarclanUIStore.showDebugPanel

### Time Manipulation
- Debug time offset allows testing future game states
- Useful for testing long-running processes like research
- Maintains game balance by affecting all time-based systems consistently

## 6. Migration Path to Production

### Replacing Fake API
To transition to a real backend:
1. Implement equivalent endpoints on a real server
2. Replace localStorage with database persistence
3. Add proper authentication and security
4. Replace FakeApi implementation while maintaining the same interface

## 7. Folder Structure

- **/domain**: Game logic, models, and state transition rules
- **/components**: React UI components
- **/context**: Zustand stores and API service
- **/docs**: Documentation including this architecture overview

## 8. Key Development Principles

### Maintain Pure Functions
- GameEngine methods should remain pure and side-effect free
- State mutations should always create new state objects

### Clean Separation of Concerns
- UI logic belongs in components
- Business logic belongs in the GameEngine
- Persistence logic belongs in the API layer
- State management connects these layers

### Testing Approach
- Unit test GameEngine functions as pure functions
- Mock API responses for component testing
- Use debug tools to test time-based mechanics

## 9. Future Expansion Considerations

- Multiplayer interactions
- Persistent server-side state
- Leaderboards and social features
- More complex game mechanics

By following these architectural principles, StarClans maintains a clean, maintainable codebase that can grow with the game's complexity while remaining adaptable to future requirements. 