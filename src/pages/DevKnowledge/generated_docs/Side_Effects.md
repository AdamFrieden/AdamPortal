# Side Effects

> Side effects occur when a function or expression modifies some state outside its local environment.

## Overview
Side effects are changes in state or observable interactions with the outside world that occur during the execution of a function or expression. They exist because many real-world applications require interaction with external systems, such as databases, file systems, or user interfaces, which inherently involve state changes.

## Core Idea / Mental Model
- A side effect is any operation that affects the state outside its local environment, such as modifying a global variable, writing to a file, or updating a database.
- Functions with side effects are not pure; they do not return the same output for the same input and can affect the program's behavior in unpredictable ways.

## Key Features & Benefits
- **State Management**: Essential for tasks that require state changes, like updating a user interface or managing application state.
- **Interactivity**: Enables interaction with external systems, such as databases or APIs, which is crucial for most applications.
- **Performance**: Can improve performance by caching results or maintaining state across function calls.

## Trade-offs & Pitfalls
- **Testing Complexity**: Functions with side effects are harder to test due to their dependency on external states.
- **Debugging Challenges**: Side effects can lead to bugs that are difficult to trace and reproduce.
- **Predictability**: Reduces the predictability of code, making it harder to reason about and maintain.

## When to Use / When to Avoid
- **Use**: When interacting with external systems or when state management is necessary.
- **Avoid**: In purely functional programming contexts or when aiming for high testability and predictability.

## Real-World Examples & Modern Alternatives
- **Examples**: Database operations, logging, network requests.
- **Alternatives**: Functional programming paradigms that emphasize pure functions and immutability, such as using libraries like Redux for state management in JavaScript.

## Common Misconceptions
- **Myth**: All side effects are bad.  
  *Reality*: They are necessary for many practical applications.
- **Myth**: Side effects only occur in imperative programming.  
  *Reality*: They can occur in any programming paradigm.

## Related Topics
- Functional Programming
- Immutability
- State Management
- Pure Functions
- Event Sourcing

## References
- [Wikipedia: Side Effect (Computer Science)](https://en.wikipedia.org/wiki/Side_effect_(computer_science))  
- [Martin Fowler: Side Effects](https://martinfowler.com/bliki/SideEffect.html)