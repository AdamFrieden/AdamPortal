# Distributed Transactions

> Distributed transactions ensure data consistency across multiple networked databases or services, crucial for maintaining integrity in complex, distributed systems.

## Core idea
- **Atomicity Across Systems**: Ensures that a transaction involving multiple systems either completes fully or not at all, maintaining atomicity.
- **Consistency**: Guarantees that all systems involved in the transaction remain in a consistent state.
- **Isolation**: Transactions are isolated from each other, preventing concurrent transactions from interfering.
- **Durability**: Once a transaction is committed, it remains so, even in the event of a system failure.

## Key features
- **Two-Phase Commit (2PC)**: A protocol that ensures all participating nodes agree on the transaction outcome.
- **Compensation Transactions**: Used to undo operations in case of failure, often in systems where 2PC is too costly.
- **Saga Pattern**: A sequence of local transactions where each step has a compensating transaction to handle failures.
- **Eventual Consistency**: In some distributed systems, transactions may not be immediately consistent but will converge over time.

## Why / When / How
- **Why**: Essential for applications requiring strong consistency across distributed systems, such as financial services or inventory management.
- **When**: Use when operations span multiple services or databases that must remain consistent.
- **How**: Implement using protocols like 2PC, or patterns like Sagas for long-running transactions.
- **Pitfalls**: High latency and complexity in 2PC; potential for data inconsistency in eventual consistency models. Avoid in high-throughput, low-latency systems where eventual consistency suffices.

## Example / Walk-through
```pseudo
# Two-Phase Commit Protocol
Coordinator -> Participant: Prepare
Participant -> Coordinator: Vote Commit / Vote Abort
Coordinator -> Participant: Commit / Abort
```

## Real-world applications
- **Banking Systems**: Ensures transactions like transfers are atomic across accounts.
- **E-commerce Platforms**: Maintains consistency in order processing across inventory, payment, and shipping services.
- **Microservices Architectures**: Uses patterns like Sagas to manage distributed transactions across services.

## Sources
- [Distributed Transactions in Microservices](https://martinfowler.com/articles/patterns-of-distributed-systems/distributed-transactions.html)
- [Two-Phase Commit Protocol](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)