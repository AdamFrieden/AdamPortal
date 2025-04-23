# Builder Pattern

> A design pattern that simplifies the construction of complex objects by separating their creation from their representation.

## Overview
The Builder Pattern is a creational design pattern that provides a flexible solution to constructing complex objects. It exists to address the problem of telescoping constructors, where an object requires numerous parameters, leading to code that is difficult to read and maintain.

## Core Idea / Mental Model
- Separate the construction of a complex object from its representation, allowing the same construction process to create different representations.
- Use a step-by-step approach to build an object, often with a fluent interface.

## Key Features & Benefits
- **Improves Readability**: Simplifies object creation with clear, step-by-step methods.
- **Encapsulation**: Hides the construction process from the client.
- **Flexibility**: Allows different representations of an object to be created using the same construction process.
- **Immutability**: Facilitates the creation of immutable objects.

## Trade-offs & Pitfalls
- **Complexity**: Introduces additional classes and complexity, which may be unnecessary for simple objects.
- **Overhead**: Can be overkill for objects with few parameters or simple construction logic.

## When to Use / When to Avoid
- **Use When**: Constructing complex objects with numerous parameters or when object construction involves multiple steps.
- **Avoid When**: Dealing with simple objects or when the overhead of additional classes is not justified.

## Real-World Examples & Modern Alternatives
- **Examples**: StringBuilder in Java, SQL query builders.
- **Alternatives**: Factory Pattern for simpler object creation needs, Fluent Interfaces for chaining method calls.

## Common Misconceptions
- **Myth**: The Builder Pattern is only useful for immutable objects.
- **Reality**: While it aids in creating immutable objects, it can be used for mutable ones as well.

## Related Topics
- Factory Pattern
- Prototype Pattern
- Fluent Interface
- Dependency Injection
- Object Pool Pattern

## References
- [Builder Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/builder)  
- [Builder Design Pattern - GeeksforGeeks](https://www.geeksforgeeks.org/builder-design-pattern/)