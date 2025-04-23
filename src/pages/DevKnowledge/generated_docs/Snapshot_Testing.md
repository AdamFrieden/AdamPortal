# Snapshot Testing

> Snapshot testing captures the rendered output of a component to ensure it remains consistent over time.

## Overview
Snapshot testing is a technique used in software testing to capture and compare the output of a component or function at a specific point in time. It exists to quickly identify unintended changes in the UI or output of a codebase, providing a safety net during refactoring or feature development.

## Core Idea / Mental Model
- Capture the output of a component as a "snapshot" and store it.
- On subsequent test runs, compare the current output to the stored snapshot.
- Alert developers to differences, indicating potential bugs or necessary updates.

## Key Features & Benefits
- **Automated Regression Testing**: Quickly detects unexpected changes in the UI or output.
- **Fast Feedback Loop**: Provides immediate feedback during development.
- **Ease of Use**: Simple to implement with minimal setup.
- **Version Control Integration**: Snapshots can be stored in version control, aiding in tracking changes over time.

## Trade-offs & Pitfalls
- **Over-reliance**: Can lead to false positives if snapshots are not updated intentionally.
- **Snapshot Bloat**: Large or numerous snapshots can clutter the codebase.
- **Lack of Context**: Snapshots may not provide insight into why a change occurred.

## When to Use / When to Avoid
- **Use**: When developing UI components or functions with complex outputs that should remain consistent.
- **Avoid**: For testing logic-heavy code where traditional unit tests are more appropriate.

## Real-World Examples & Modern Alternatives
- **Tools**: Jest (JavaScript), Ava (JavaScript)
- **Alternatives**: Visual regression testing tools like Percy or Applitools for more comprehensive UI testing.

## Common Misconceptions
- **"Snapshots are a substitute for all tests"**: They complement, not replace, other testing strategies.
- **"Snapshots are always reliable"**: They require careful management and understanding of when updates are necessary.

## Related Topics
- Unit Testing
- Visual Regression Testing
- Test-Driven Development (TDD)
- Continuous Integration (CI)
- Code Review Practices

## References
- [Jest Snapshot Testing](https://jestjs.io/docs/snapshot-testing)  
- [Visual Regression Testing with Percy](https://percy.io/docs)