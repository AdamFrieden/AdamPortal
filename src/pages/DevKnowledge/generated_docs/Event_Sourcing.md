# Event Sourcing

> Event Sourcing captures all changes to application state as a sequence of events.

## Overview
Event Sourcing is a pattern where state changes in a system are stored as a sequence of events. Instead of persisting the current state, each change is recorded as an immutable event. This approach allows for complete reconstruction of the system state at any point in time, providing a robust audit trail and enabling complex event-driven architectures.

## Core Idea / Mental Model
- Store every state change as an event in an append-only log.
- Reconstruct the current state by replaying the event log from the beginning.

## Key Features & Benefits
- **Auditability**: Complete history of changes for compliance and debugging.
- **Temporal Queries**: Ability to query past states and understand system evolution.
- **Event Replay**: Rebuild system state or project new views by replaying events.
- **Scalability**: Decouples read and write models, facilitating CQRS (Command Query Responsibility Segregation).

## Trade-offs & Pitfalls
- **Complexity**: Requires careful design of event schemas and versioning.
- **Storage**: Potentially large storage requirements for extensive event logs.
- **Consistency**: Ensuring eventual consistency can be challenging in distributed systems.
- **Learning Curve**: Steeper learning curve for teams unfamiliar with event-driven architectures.

## When to Use / When to Avoid
- **Use When**: You need a detailed audit log, support for temporal queries, or are building a complex event-driven system.
- **Avoid When**: Simplicity is key, or the overhead of managing event logs outweighs the benefits.

## Real-World Examples & Modern Alternatives
- **Examples**: Systems like CQRS, Kafka-based architectures, and financial systems.
- **Alternatives**: Traditional CRUD-based systems, Snapshotting for state recovery.

## Common Misconceptions
- **Myth**: Event Sourcing is the same as event-driven architecture.
- **Myth**: It automatically provides high availability and fault tolerance.

## Related Topics
- CQRS (Command Query Responsibility Segregation)
- Event-Driven Architecture
- Domain-Driven Design (DDD)
- Kafka and Stream Processing
- Snapshotting

## References
- [Martin Fowler on Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)  
- [Event Sourcing in Practice](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)