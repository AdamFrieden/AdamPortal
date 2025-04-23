# Mocking

> Mocking simulates objects or behaviors in software testing to isolate and test specific components effectively.

## Overview
Mocking is a technique used in software testing to create stand-in objects that mimic the behavior of real components. It exists to enable testing of a unit of code in isolation, ensuring that tests are not dependent on external systems or components that may be unreliable or difficult to control.

## Core Idea / Mental Model
- Replace real objects with mock objects to test interactions and behaviors.
- Focus on the unit under test by isolating it from its dependencies.

## Key Features & Benefits
- **Isolation**: Enables testing of a component without relying on external systems.
- **Control**: Allows precise control over the behavior of dependencies.
- **Speed**: Tests run faster as they do not require actual resource-intensive operations.
- **Reliability**: Reduces flakiness by removing dependencies on external systems.

## Trade-offs & Pitfalls
- **Overuse**: Excessive mocking can lead to tests that are tightly coupled to implementation details.
- **Complexity**: Can introduce complexity if not managed properly, especially with intricate mock setups.
- **False Positives**: Tests may pass with mocks but fail in real-world scenarios due to differences in behavior.

## When to Use / When to Avoid
- **Use**: When testing a unit of code that interacts with external systems or when dependencies are unreliable or unavailable.
- **Avoid**: When the behavior of the dependency is critical to the test or when integration testing is more appropriate.

## Real-World Examples & Modern Alternatives
- **Tools**: Mockito, JMock, and Moq are popular mocking frameworks.
- **Alternatives**: Service virtualization and integration testing can be used when real interactions are necessary.

## Common Misconceptions
- **Mocks vs. Stubs**: Mocks are used to verify interactions, while stubs provide predefined responses.
- **Mocks are always necessary**: Not all tests require mocking; sometimes, real objects are more appropriate.

## Related Topics
- Unit Testing
- Test-Driven Development (TDD)
- Dependency Injection
- Service Virtualization
- Integration Testing

## References
- [Martin Fowler on Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)  
- [Mockito Documentation](https://site.mockito.org/)