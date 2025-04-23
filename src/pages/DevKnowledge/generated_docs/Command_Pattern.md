# Command Pattern

> Encapsulate requests as objects, allowing for parameterization and queuing of requests.

## Overview
The Command Pattern is a behavioral design pattern that turns a request into a stand-alone object containing all information about the request. This allows for parameterization of clients with queues, requests, and operations, and supports undoable operations.

## Core Idea / Mental Model
- Encapsulate a request as an object, thereby decoupling the sender from the receiver.
- Enable operations like queuing, logging, and undoing by treating requests as first-class objects.

## Key Features & Benefits
- **Decoupling**: Separates the object that invokes the operation from the one that knows how to perform it.
- **Undo/Redo**: Facilitates implementing undoable operations by storing the state of commands.
- **Extensibility**: New commands can be added without changing existing code.
- **Macro Commands**: Supports creating complex commands by combining simpler ones.

## Trade-offs & Pitfalls
- **Complexity**: Introduces additional layers and classes, which can complicate the design.
- **Overhead**: May be overkill for simple operations or applications with minimal command logic.

## When to Use / When to Avoid
- **Use When**: You need to parameterize objects with operations, support undo/redo, or implement logging and transactional behavior.
- **Avoid When**: The application is simple, and the overhead of additional classes is not justified.

## Real-World Examples & Modern Alternatives
- **Examples**: GUI buttons and menu items that trigger commands, task scheduling systems.
- **Alternatives**: Strategy Pattern for simpler cases, Event Sourcing for complex state management.

## Common Misconceptions
- **Myth**: It's only useful for GUIs.  
  *Reality*: It applies to any scenario requiring decoupled request handling.
- **Myth**: It inherently supports undo/redo.  
  *Reality*: Undo/redo requires additional logic to store and revert state.

## Related Topics
- Strategy Pattern
- Observer Pattern
- Event Sourcing
- Chain of Responsibility
- Mediator Pattern

## References
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)  
- [Refactoring Guru: Command Pattern](https://refactoring.guru/design-patterns/command)