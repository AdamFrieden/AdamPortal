# Strategy Pattern

> The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

## Overview
The Strategy Pattern is a behavioral design pattern that allows you to define a set of algorithms, encapsulate each one, and make them interchangeable within a context. It exists to enable the selection of an algorithm at runtime, promoting flexibility and reusability in code.

## Core Idea / Mental Model
- Encapsulate algorithms in separate classes.
- Use composition to delegate behavior to the selected algorithm.
- Enable runtime flexibility by changing the algorithm without altering the client.

## Key Features & Benefits
- **Flexibility**: Easily switch algorithms at runtime.
- **Reusability**: Share and reuse algorithms across different contexts.
- **Maintainability**: Isolate algorithm code, reducing the impact of changes.

## Trade-offs & Pitfalls
- **Complexity**: Introduces additional classes and interfaces.
- **Overhead**: May be overkill for simple algorithms or when only a few variations exist.
- **Misuse**: Can lead to unnecessary abstraction if not applied judiciously.

## When to Use / When to Avoid
- **Use**: When multiple algorithms are needed and may change at runtime.
- **Avoid**: When the algorithm set is fixed and unlikely to change.

## Real-World Examples & Modern Alternatives
- **Examples**: Payment processing systems where different payment methods are encapsulated as strategies.
- **Alternatives**: Dependency Injection frameworks can sometimes serve similar purposes by injecting different behaviors.

## Common Misconceptions
- **Myth**: Strategy Pattern is only for complex systems.
- **Myth**: It always simplifies code; it can add unnecessary complexity if misapplied.

## Related Topics
- **Factory Pattern**: For creating instances of strategy classes.
- **Decorator Pattern**: For adding responsibilities to objects dynamically.
- **Command Pattern**: For encapsulating requests as objects.
- **Template Method Pattern**: For defining the skeleton of an algorithm.
- **Dependency Injection**: For injecting strategies at runtime.

## References
- [Strategy Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/strategy)  
- [Strategy Pattern - Wikipedia](https://en.wikipedia.org/wiki/Strategy_pattern)