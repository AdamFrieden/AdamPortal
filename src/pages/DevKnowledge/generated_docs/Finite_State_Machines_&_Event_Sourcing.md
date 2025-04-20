# Finite State Machines & Event Sourcing

> Finite State Machines (FSMs) and Event Sourcing are powerful paradigms for managing state and behavior in software systems. FSMs provide a structured way to model complex state transitions, while Event Sourcing offers a robust mechanism for capturing and replaying state changes.

## Core idea
- **Finite State Machines (FSMs)**: A computational model used to design algorithms and systems that can be in exactly one of a finite number of states at any given time. Transitions between states are triggered by events.
- **Event Sourcing**: A pattern where state changes are logged as a sequence of events. Instead of storing the current state, the system reconstructs state by replaying these events.

## Key features
- **FSMs**:
  - **Deterministic State Management**: Ensures predictable behavior by defining explicit state transitions.
  - **Simplified Debugging**: Easier to trace and debug due to clear state and transition definitions.
  - **Modularity**: Facilitates separation of concerns by encapsulating state logic.
  
- **Event Sourcing**:
  - **Auditability**: Provides a complete history of changes, enabling audit trails.
  - **Temporal Queries**: Allows querying past states by replaying events up to a specific point in time.
  - **Resilience**: Enhances fault tolerance by enabling state reconstruction from events.

## Why / When / How
- **FSMs**:
  - **When to use**: Ideal for systems with complex state logic, such as protocol handlers, UI workflows, and game engines.
  - **Pitfalls**: Can become unwieldy with too many states or transitions; avoid for simple state management.

- **Event Sourcing**:
  - **When to use**: Suitable for systems requiring auditability, complex state reconstruction, or temporal queries, such as financial systems and collaborative applications.
  - **Pitfalls**: Can lead to large event stores; requires careful design to manage event versioning and schema evolution.

## Example / Walk-through
```pseudo
# FSM Example
state = 'idle'
event = 'start'

if state == 'idle' and event == 'start':
    state = 'running'
elif state == 'running' and event == 'stop':
    state = 'idle'

# Event Sourcing Example
events = [
    { 'type': 'created', 'data': { 'id': 1, 'name': 'Item1' } },
    { 'type': 'updated', 'data': { 'id': 1, 'name': 'Item1 Updated' } }
]

state = {}
for event in events:
    if event['type'] == 'created':
        state[event['data']['id']] = event['data']
    elif event['type'] == 'updated':
        state[event['data']['id']].update(event['data'])
```

## Real-world applications
- **FSMs**: Used in network protocols (e.g., TCP state management), user interface navigation, and game AI.
- **Event Sourcing**: Employed in systems like CQRS (Command Query Responsibility Segregation), banking systems, and event-driven architectures.

## References
- [State Machines in Computer Science](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Event Sourcing Basics](https://martinfowler.com/eaaDev/EventSourcing.html)