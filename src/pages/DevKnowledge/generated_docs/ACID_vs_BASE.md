# ACID vs BASE

> **Takeaway**: ACID and BASE are two paradigms for database transaction management. ACID ensures strict consistency and reliability, while BASE offers flexibility and scalability at the cost of eventual consistency.

## Core Idea
- **ACID**: Stands for Atomicity, Consistency, Isolation, Durability. It is a set of properties that guarantee reliable processing of database transactions.
  - **Atomicity**: Transactions are all-or-nothing.
  - **Consistency**: Transactions bring the database from one valid state to another.
  - **Isolation**: Concurrent transactions do not affect each other.
  - **Durability**: Once a transaction is committed, it remains so, even in the event of a system failure.
- **BASE**: Stands for Basically Available, Soft state, Eventually consistent. It is an alternative model that allows for more flexible and scalable systems.
  - **Basically Available**: The system guarantees availability.
  - **Soft state**: The state of the system may change over time, even without new input.
  - **Eventually consistent**: The system will become consistent over time, given no new updates.

## Key Features
- **ACID**:
  - Ensures strict data integrity.
  - Suitable for systems where consistency is critical, such as financial applications.
  - Typically implemented in traditional relational databases.
- **BASE**:
  - Prioritizes availability and partition tolerance over immediate consistency.
  - Ideal for distributed systems and applications requiring high scalability, like social media platforms.
  - Commonly used in NoSQL databases.

## Why / When / How
- **ACID**:
  - **Why**: Use when data integrity and consistency are paramount.
  - **When**: Suitable for applications like banking, where transactions must be reliable.
  - **How**: Implemented using transaction management systems in relational databases.
  - **Pitfalls**: Can be less performant and scalable due to strict consistency requirements.
- **BASE**:
  - **Why**: Use when system availability and scalability are more critical than immediate consistency.
  - **When**: Suitable for large-scale web applications, where eventual consistency is acceptable.
  - **How**: Implemented using distributed databases and eventual consistency models.
  - **Pitfalls**: May lead to temporary inconsistencies and requires careful handling of data conflicts.

## Example / Walk-through
```pseudo
# ACID Transaction Example
BEGIN TRANSACTION;
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
COMMIT;

# BASE Transaction Example
# Assume a distributed system with eventual consistency
PUT item in cache;
ASYNC replicate item to other nodes;
```

## Real-world Applications
- **ACID**: Used in traditional RDBMS like PostgreSQL, Oracle, and MySQL for applications requiring strict consistency.
- **BASE**: Employed by NoSQL databases like Cassandra, MongoDB, and Amazon DynamoDB for applications needing high availability and scalability.

## References
- [ACID Transactions](https://en.wikipedia.org/wiki/ACID)
- [BASE Model](https://en.wikipedia.org/wiki/Eventual_consistency)