# IoC vs DI vs Service Locator

> IoC, DI, and Service Locator are patterns for managing dependencies in software, enhancing modularity and testability.

## Overview
Inversion of Control (IoC), Dependency Injection (DI), and Service Locator are design patterns that address dependency management in software systems. They exist to decouple components, making systems more modular, maintainable, and testable.

## Core Idea / Mental Model
- **IoC**: Shift control of object creation and lifecycle management from the application to a container or framework.
- **DI**: Inject dependencies into a component rather than having the component create them.
- **Service Locator**: Provide a registry where components can look up their dependencies.

## Key Features & Benefits
- **IoC**: Promotes loose coupling and separation of concerns.
- **DI**: Simplifies testing by allowing mock dependencies; enhances readability and maintainability.
- **Service Locator**: Centralizes dependency management, reducing boilerplate code.

## Trade-offs & Pitfalls
- **IoC**: Can lead to complex configurations and steep learning curves.
- **DI**: Overuse can result in verbose code and potential performance overhead.
- **Service Locator**: Can obscure dependencies, making code harder to understand and test.

## When to Use / When to Avoid
- **Use IoC**: When building large, complex systems needing high modularity.
- **Use DI**: For applications requiring easy testing and clear dependency management.
- **Avoid Service Locator**: When transparency and explicitness of dependencies are critical.

## Real-World Examples & Modern Alternatives
- **IoC**: Spring Framework, .NET Core.
- **DI**: Angular, Guice.
- **Service Locator**: Java Naming and Directory Interface (JNDI).
- **Alternatives**: Microservices architecture, which inherently promotes modularity.

## Common Misconceptions
- **IoC is DI**: IoC is a broader concept; DI is a specific implementation.
- **Service Locator is always bad**: Useful in specific scenarios but should be used judiciously.

## Related Topics
- Design Patterns
- Microservices
- SOLID Principles
- Test-Driven Development (TDD)
- Aspect-Oriented Programming (AOP)

## References
- [Martin Fowler on Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html)  
- [Dependency Injection Patterns](https://www.martinfowler.com/articles/injection.html)