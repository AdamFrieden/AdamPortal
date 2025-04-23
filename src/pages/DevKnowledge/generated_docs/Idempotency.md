# Idempotency

> Idempotency ensures that performing an operation multiple times has the same effect as doing it once.

## Overview
Idempotency is a property of certain operations in computing that guarantees consistent results even when the operation is applied multiple times. It is crucial in distributed systems and APIs to handle retries and ensure reliability without unintended side effects.

## Core Idea / Mental Model
- An idempotent operation can be repeated without changing the result beyond the initial application.
- Think of it as a "safe retry" mechanism: executing the operation once or multiple times yields the same outcome.

## Key Features & Benefits
- **Consistency**: Ensures predictable outcomes in distributed systems.
- **Reliability**: Facilitates safe retries in network communications.
- **Error Handling**: Simplifies error recovery by allowing operations to be repeated without adverse effects.

## Trade-offs & Pitfalls
- **Complexity**: Implementing idempotency can add complexity to system design.
- **Performance**: May require additional checks or state management, impacting performance.
- **Misuse**: Not all operations can or should be idempotent; forcing it can lead to incorrect assumptions.

## When to Use / When to Avoid
- **Use**: When designing APIs, especially for operations like PUT or DELETE, where retries are common.
- **Avoid**: In operations where each execution must produce a unique result, such as generating unique identifiers.

## Real-World Examples & Modern Alternatives
- **HTTP Methods**: PUT and DELETE are typically idempotent, while POST is not.
- **Database Operations**: UPSERT operations in databases are designed to be idempotent.
- **Alternatives**: Event sourcing and CQRS can offer alternative approaches to managing state changes.

## Common Misconceptions
- **Idempotency is not the same as immutability**: Idempotency focuses on the effect of operations, not the state of data.
- **All HTTP methods are not idempotent**: Only specific methods like GET, PUT, and DELETE are designed to be idempotent.

## Related Topics
- **HTTP Methods**
- **Distributed Systems**
- **Error Handling in APIs**
- **Event Sourcing**
- **CQRS (Command Query Responsibility Segregation)**

## References
- [REST API Design: Resource Modeling](https://restfulapi.net/resource-naming/)
- [Idempotence in Computer Science](https://en.wikipedia.org/wiki/Idempotence)