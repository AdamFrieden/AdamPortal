# Circuit Breaker

> A Circuit Breaker prevents system failures by temporarily halting operations to a failing service, allowing it to recover.

## Overview
A Circuit Breaker is a design pattern used in software architecture to detect failures and encapsulate the logic of preventing a failure from constantly recurring. It exists to improve the stability and resilience of a system by managing the interaction with potentially failing services.

## Core Idea / Mental Model
- Acts like an electrical circuit breaker, opening the circuit to stop the flow of requests when a failure is detected.
- Transitions between states: Closed (normal operation), Open (requests are blocked), and Half-Open (testing if recovery is possible).

## Key Features & Benefits
- **Failure Detection**: Identifies and isolates failing components to prevent cascading failures.
- **Resilience**: Enhances system stability by allowing time for recovery.
- **Fallback Mechanisms**: Provides alternative responses or actions when a service is unavailable.
- **Monitoring and Alerts**: Tracks failure rates and triggers alerts for operational insights.

## Trade-offs & Pitfalls
- **Configuration Complexity**: Requires careful tuning of thresholds and timeouts.
- **False Positives**: Incorrectly opening the circuit can block healthy services.
- **State Management**: Complexity in managing state transitions and ensuring consistency.

## When to Use / When to Avoid
- **Use When**: Interacting with remote services prone to failure, or when service latency impacts user experience.
- **Avoid When**: In tightly coupled systems where failure handling is managed differently, or when the overhead of implementation outweighs benefits.

## Real-World Examples & Modern Alternatives
- **Tools**: Netflix Hystrix (now in maintenance mode), Resilience4j.
- **Alternatives**: Retry patterns, Bulkheads, Rate Limiting.

## Common Misconceptions
- **Myth**: Circuit Breakers eliminate all failures.
  - **Reality**: They manage failures, not eliminate them.
- **Myth**: They are only for microservices.
  - **Reality**: Useful in any distributed system architecture.

## Related Topics
- Retry Pattern
- Bulkhead Pattern
- Rate Limiting
- Service Mesh
- Fault Tolerance

## References
- [Martin Fowler on Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html)  
- [Resilience4j Documentation](https://resilience4j.readme.io/docs/circuitbreaker)