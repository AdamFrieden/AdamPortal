# Dependency Injection

> A design pattern that decouples object creation from usage, enhancing flexibility and testability.

## Overview
Dependency Injection (DI) is a design pattern used in software development to achieve Inversion of Control (IoC) between classes and their dependencies. It allows a class to receive its dependencies from an external source rather than creating them internally, promoting loose coupling and easier testing.

## Core Idea / Mental Model
- Dependencies are provided to a class, not created by it.
- Encourages separation of concerns by delegating responsibility for dependency management.

## Key Features & Benefits
- **Decoupling**: Reduces tight coupling between components, making the system more modular.
- **Testability**: Facilitates unit testing by allowing mock dependencies to be injected.
- **Flexibility**: Simplifies swapping out implementations without altering dependent code.
- **Maintainability**: Enhances code readability and maintainability by clarifying dependencies.

## Trade-offs & Pitfalls
- **Complexity**: Can introduce complexity, especially in large systems with many dependencies.
- **Overhead**: May add overhead in terms of configuration and setup.
- **Learning Curve**: Requires understanding of IoC and DI frameworks.

## When to Use / When to Avoid
- **Use**: When building complex applications requiring high modularity and testability.
- **Avoid**: In simple applications where the overhead of DI outweighs its benefits.

## Real-World Examples & Modern Alternatives
- **Tools**: Spring Framework (Java), .NET Core Dependency Injection, Guice (Java).
- **Alternatives**: Service Locator pattern, Factory pattern.

## Common Misconceptions
- **DI is only for large projects**: It can be beneficial in smaller projects for testing.
- **DI frameworks are mandatory**: DI can be implemented manually without a framework.

## Related Topics
- Inversion of Control (IoC)
- Service Locator Pattern
- Factory Pattern
- SOLID Principles
- Mocking in Unit Testing

## References
- [Martin Fowler on Dependency Injection](https://martinfowler.com/articles/injection.html)  
- [Spring Framework Documentation](https://spring.io/projects/spring-framework)