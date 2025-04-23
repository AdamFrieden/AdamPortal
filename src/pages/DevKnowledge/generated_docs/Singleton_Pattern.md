# Singleton Pattern

> The Singleton Pattern ensures a class has only one instance and provides a global point of access to it.

## Overview
The Singleton Pattern is a design pattern that restricts the instantiation of a class to a single object. This pattern is used to control access to resources that are shared across an application, such as configuration settings or connection pools.

## Core Idea / Mental Model
- Ensure a class has only one instance.
- Provide a global access point to that instance.

## Key Features & Benefits
- **Controlled Access**: Centralizes control of a resource.
- **Lazy Initialization**: Instance is created only when needed, saving resources.
- **Global Access**: Provides a single point of access to the instance.

## Trade-offs & Pitfalls
- **Global State**: Can introduce hidden dependencies and make testing difficult.
- **Concurrency Issues**: Requires careful handling in multi-threaded environments.
- **Overuse**: Can lead to anti-patterns if used excessively or inappropriately.

## When to Use / When to Avoid
- **Use**: When a single instance is needed to coordinate actions across a system.
- **Avoid**: When multiple instances are required or when it complicates testing and maintenance.

## Real-World Examples & Modern Alternatives
- **Examples**: Logger classes, configuration managers, thread pools.
- **Alternatives**: Dependency injection frameworks, which can provide more flexible and testable solutions.

## Common Misconceptions
- **Singletons are always thread-safe**: They require explicit handling to be thread-safe.
- **Singletons are always the best solution for global access**: They can lead to tightly coupled code.

## Related Topics
- Dependency Injection
- Factory Pattern
- Prototype Pattern
- Multiton Pattern
- Service Locator Pattern

## References
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [Singleton Pattern - Wikipedia](https://en.wikipedia.org/wiki/Singleton_pattern)