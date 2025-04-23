# Unit Testing

> Unit testing involves testing individual components of software to ensure they work as intended.

## Overview
Unit testing is a software testing method where individual units or components of a software are tested in isolation. The primary goal is to validate that each unit of the software performs as expected. It exists to catch bugs early in the development cycle, improve code quality, and facilitate changes and refactoring.

## Core Idea / Mental Model
- Test small, isolated pieces of code (functions, methods) independently.
- Ensure each unit behaves correctly under various conditions.
- Use automated tests to quickly verify code changes.

## Key Features & Benefits
- **Early Bug Detection**: Identifies issues at the earliest stage, reducing debugging time.
- **Code Quality**: Encourages better design and modularity.
- **Refactoring Confidence**: Allows safe code changes with immediate feedback.
- **Documentation**: Acts as a form of documentation for expected behavior.

## Trade-offs & Pitfalls
- **Time-Consuming**: Writing and maintaining tests can be time-intensive.
- **Over-Mocking**: Excessive use of mocks can lead to brittle tests.
- **False Security**: Passing tests may give a false sense of security if not comprehensive.

## When to Use / When to Avoid
- **Use**: When developing new features, refactoring existing code, or fixing bugs.
- **Avoid**: For trivial code or when the cost of writing tests outweighs the benefits.

## Real-World Examples & Modern Alternatives
- **Tools**: JUnit (Java), NUnit (.NET), pytest (Python), Jest (JavaScript).
- **Alternatives**: Integration testing, end-to-end testing for broader coverage.

## Common Misconceptions
- **"Unit tests are unnecessary for simple code."**: Even simple code can benefit from unit tests.
- **"Unit tests guarantee bug-free software."**: They reduce bugs but don't guarantee complete absence.

## Related Topics
- Test-Driven Development (TDD)
- Integration Testing
- Continuous Integration/Continuous Deployment (CI/CD)
- Mocking and Stubbing
- Code Coverage

## References
- [Martin Fowler on Unit Testing](https://martinfowler.com/bliki/UnitTest.html)  
- [IEEE Software Engineering Body of Knowledge (SWEBOK)](https://www.computer.org/education/bodies-of-knowledge/software-engineering)