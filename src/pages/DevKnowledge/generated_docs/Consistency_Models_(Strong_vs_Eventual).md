# Consistency Models (Strong vs Eventual)

> Consistency models define how and when data changes become visible across distributed systems.

## Overview
Consistency models are crucial in distributed systems to manage how updates to data are propagated and seen by users. They exist to balance trade-offs between performance, availability, and correctness in environments where data is replicated across multiple nodes.

## Core Idea / Mental Model
- **Strong Consistency**: Guarantees that once a write completes, all subsequent reads will reflect that write.
- **Eventual Consistency**: Ensures that, given enough time without new updates, all replicas will converge to the same value.

## Key Features & Benefits
- **Strong Consistency**:
  - Simplifies application logic by ensuring immediate data accuracy.
  - Ideal for systems requiring strict correctness, like financial transactions.
- **Eventual Consistency**:
  - Enhances system availability and performance by allowing temporary data divergence.
  - Suitable for high-availability systems where speed is prioritized over immediate consistency.

## Trade-offs & Pitfalls
- **Strong Consistency**:
  - Can lead to higher latency and reduced availability due to coordination overhead.
  - May not scale well in geographically distributed systems.
- **Eventual Consistency**:
  - Requires complex conflict resolution logic.
  - Can lead to temporary data inconsistencies, complicating application behavior.

## When to Use / When to Avoid
- **Use Strong Consistency** when data correctness is critical and can tolerate some latency.
- **Use Eventual Consistency** in systems where availability and partition tolerance are prioritized over immediate consistency.

## Real-World Examples & Modern Alternatives
- **Strong Consistency**: Google Spanner, traditional RDBMS.
- **Eventual Consistency**: Amazon DynamoDB, Apache Cassandra.
- **Alternatives**: Consistency models like causal consistency or linearizability offer different trade-offs.

## Common Misconceptions
- Strong consistency does not mean zero latency.
- Eventual consistency does not imply eventual correctness without proper conflict resolution.

## Related Topics
- CAP Theorem
- Distributed Systems
- Conflict-free Replicated Data Types (CRDTs)
- Causal Consistency
- Linearizability

## References
- [Consistency Models in Distributed Systems](https://www.microsoft.com/en-us/research/publication/consistency-models-distributed-systems/)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html)