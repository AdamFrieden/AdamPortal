# DRY

> DRY (Don't Repeat Yourself) is a software development principle aimed at reducing repetition of information.

## Overview
DRY is a principle that encourages the reduction of code duplication by ensuring that every piece of knowledge has a single, unambiguous representation within a system. It exists to improve code maintainability, reduce errors, and enhance productivity by minimizing redundancy.

## Core Idea / Mental Model
- **Single Source of Truth**: Each piece of information should be represented in one place only.
- **Code Reuse**: Promote reusability by abstracting common functionality.

## Key Features & Benefits
- **Improved Maintainability**: Changes need to be made in only one place, reducing the risk of errors.
- **Enhanced Readability**: Cleaner code with less clutter makes it easier to understand.
- **Increased Productivity**: Developers spend less time fixing bugs and more time adding features.

## Trade-offs & Pitfalls
- **Over-Abstraction**: Excessive abstraction can lead to complex code that is hard to understand.
- **Premature Optimization**: Applying DRY too early can lead to unnecessary complexity.
- **Contextual Misfit**: Not all duplication is bad; sometimes, repetition is more readable and maintainable.

## When to Use / When to Avoid
- **Use**: When you notice repeated code patterns that can be abstracted without losing clarity.
- **Avoid**: In cases where abstraction leads to convoluted code or when the context of repetition is different.

## Real-World Examples & Modern Alternatives
- **Tools**: Libraries and frameworks like React and Angular promote DRY by encouraging component reuse.
- **Patterns**: Design patterns such as Singleton and Factory Method help implement DRY principles.
- **Alternatives**: YAGNI (You Aren't Gonna Need It) can be a counterbalance to DRY, emphasizing simplicity.

## Common Misconceptions
- **DRY Means No Repetition**: DRY focuses on meaningful repetition, not eliminating all redundancy.
- **DRY is Always Best**: Sometimes, duplication is more practical than complex abstractions.

## Related Topics
- **KISS (Keep It Simple, Stupid)**
- **YAGNI (You Aren't Gonna Need It)**
- **SOLID Principles**
- **Code Refactoring**
- **Design Patterns**

## References
- [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/)
- [Martin Fowler's Blog on DRY](https://martinfowler.com/bliki/DRY.html)