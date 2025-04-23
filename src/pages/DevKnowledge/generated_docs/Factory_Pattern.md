# Factory Pattern

> A design pattern that provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.

## Overview
The Factory Pattern is a creational design pattern used in software development to create objects without specifying the exact class of object that will be created. It exists to promote loose coupling and enhance flexibility in code by delegating the instantiation logic to subclasses.

## Core Idea / Mental Model
- Encapsulate object creation logic in a separate method or class.
- Use a common interface to create objects, allowing subclasses to decide which class to instantiate.

## Key Features & Benefits
- **Decoupling**: Separates object creation from its usage, reducing dependencies.
- **Flexibility**: Easily extendable to introduce new types without modifying existing code.
- **Reusability**: Promotes code reuse by centralizing object creation logic.

## Trade-offs & Pitfalls
- **Complexity**: Can introduce additional complexity with multiple factory classes.
- **Overhead**: May lead to unnecessary abstraction if not needed.
- **Misuse**: Overuse can result in an overly complex class hierarchy.

## When to Use / When to Avoid
- **Use When**: You need to manage or centralize object creation logic, especially when dealing with complex object structures.
- **Avoid When**: Object creation is simple and unlikely to change, or when performance is a critical concern due to potential overhead.

## Real-World Examples & Modern Alternatives
- **Examples**: GUI frameworks often use factories to create UI components.
- **Alternatives**: Dependency Injection (DI) frameworks, such as Spring or Guice, can serve similar purposes with more flexibility.

## Common Misconceptions
- **"Factories are always necessary"**: Not true; they are beneficial in specific scenarios.
- **"Factories solve all design problems"**: They address specific issues related to object creation, not all design challenges.

## Related Topics
- Singleton Pattern
- Dependency Injection
- Abstract Factory Pattern
- Builder Pattern
- Prototype Pattern

## References
- [Factory Method Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/factory-method)  
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)