# Circuit Breakers / Bulkheads

> Circuit Breakers and Bulkheads are essential patterns in microservices architecture, designed to enhance system resilience and prevent cascading failures by isolating faults and managing load.

## Core idea
- **Circuit Breakers**: Act as a safety switch to prevent a system from repeatedly attempting an operation likely to fail, thus avoiding resource exhaustion.
- **Bulkheads**: Segregate resources into isolated pools to prevent a failure in one part of the system from affecting others, akin to compartments in a ship.
- Both patterns aim to improve system stability and reliability by managing failures gracefully.

## Key features
- **Circuit Breakers**:
  - **Failure Detection**: Monitors for failures and opens the circuit to stop further attempts.
  - **Recovery**: Allows periodic test requests to check if the service has recovered.
  - **State Management**: Typically operates in three states: Closed, Open, and Half-Open.
- **Bulkheads**:
  - **Isolation**: Limits the impact of a failure to a specific component or service.
  - **Resource Allocation**: Ensures that critical services have dedicated resources.
  - **Load Management**: Helps in managing and controlling the load on services.

## Why / When / How
- **Why**: To prevent cascading failures and ensure system resilience by isolating faults and managing load effectively.
- **When**: Use Circuit Breakers when dealing with remote service calls that might fail. Use Bulkheads when you need to protect critical parts of your system from failures in other parts.
- **How**: Implement Circuit Breakers in service calls to external systems. Use Bulkheads to allocate resources for different services or components.
- **Pitfalls**:
  - **Circuit Breakers**: Misconfigured thresholds can lead to unnecessary service disruptions.
  - **Bulkheads**: Over-isolation can lead to underutilization of resources.

## Example / Walk-through
```pseudo
# Circuit Breaker Pseudo-code
if (failureCount > threshold) {
    openCircuit();
} else {
    try {
        callService();
        resetFailureCount();
    } catch (Exception e) {
        incrementFailureCount();
    }
}

# Bulkhead Pseudo-code
allocateResourcePool(serviceA, poolSizeA);
allocateResourcePool(serviceB, poolSizeB);
```

## Real-world applications
- **Netflix**: Uses Hystrix for implementing Circuit Breakers to manage service calls.
- **Amazon**: Employs Bulkhead pattern to ensure that failures in one service do not impact others.

## References
- [Circuit Breaker Pattern - Microsoft Docs](https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
- [Bulkhead Pattern - Microsoft Docs](https://docs.microsoft.com/en-us/azure/architecture/patterns/bulkhead)