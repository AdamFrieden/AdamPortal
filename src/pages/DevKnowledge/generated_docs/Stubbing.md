# Stubbing

> Stubbing is a technique used to simulate the behavior of complex components in software testing.

## Overview
Stubbing involves creating simplified, controlled implementations of components to isolate and test specific parts of a system. It exists to facilitate testing by replacing real components with mock versions that mimic their behavior without the complexity or side effects.

## Core Idea / Mental Model
- Stubs act as stand-ins for real components, providing predefined responses to specific calls.
- They enable testing in isolation by removing dependencies on external systems or complex logic.

## Key Features & Benefits
- **Isolation**: Allows testing of a component without relying on external systems.
- **Control**: Provides predictable and repeatable responses, making tests more reliable.
- **Speed**: Reduces test execution time by eliminating the need for real component initialization.
- **Simplicity**: Simplifies the test environment by removing complex dependencies.

## Trade-offs & Pitfalls
- **Limited Scope**: Stubs may not cover all edge cases or real-world scenarios.
- **Maintenance Overhead**: Keeping stubs up-to-date with real component changes can be burdensome.
- **False Confidence**: Tests may pass with stubs but fail with real components due to untested interactions.

## When to Use / When to Avoid
- **Use**: When testing components in isolation, especially when real dependencies are unavailable or unreliable.
- **Avoid**: When integration testing or when the real component's behavior is critical to the test's validity.

## Real-World Examples & Modern Alternatives
- **Tools**: Mockito, Sinon.js, and Moq are popular libraries for creating stubs in various programming languages.
- **Alternatives**: Use mocks or fakes for more complex behavior simulation, or employ service virtualization for broader integration scenarios.

## Common Misconceptions
- **Stubs are not Mocks**: Stubs provide fixed responses, while mocks can verify interactions.
- **Stubs are not always faster**: They speed up tests by avoiding real dependencies, but poorly designed stubs can introduce their own delays.

## Related Topics
- Mocking
- Test Doubles
- Dependency Injection
- Service Virtualization
- Unit Testing

## References
- [Martin Fowler on Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)  
- [Mockito Documentation](https://site.mockito.org)