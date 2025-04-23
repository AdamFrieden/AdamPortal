# ACID

> ACID ensures reliable transactions in databases, maintaining data integrity and consistency.

## Overview
ACID is an acronym for Atomicity, Consistency, Isolation, and Durability. It describes a set of properties that guarantee database transactions are processed reliably. These properties are essential for maintaining data integrity, especially in systems where multiple transactions occur concurrently.

## Core Idea / Mental Model
- **Atomicity**: Transactions are all-or-nothing; they either fully complete or have no effect.
- **Consistency**: Transactions transition the database from one valid state to another, maintaining database rules.
- **Isolation**: Concurrent transactions do not interfere with each other, ensuring results are as if transactions were sequential.
- **Durability**: Once a transaction is committed, it remains so, even in the event of a system failure.

## Key Features & Benefits
- Ensures data integrity and consistency across transactions.
- Facilitates reliable and predictable transaction processing.
- Supports concurrent transaction execution without data corruption.

## Trade-offs & Pitfalls
- Can lead to performance overhead due to strict enforcement of properties.
- Complexity in implementation, especially in distributed systems.
- Not always necessary for applications with low data integrity requirements.

## When to Use / When to Avoid
- **Use**: In systems requiring high data integrity, such as financial applications or critical data management.
- **Avoid**: In high-throughput systems where performance is prioritized over strict consistency, such as real-time analytics.

## Real-World Examples & Modern Alternatives
- **Examples**: Traditional RDBMS like PostgreSQL, MySQL, and Oracle.
- **Alternatives**: NoSQL databases (e.g., MongoDB, Cassandra) often prioritize availability and partition tolerance over strict ACID compliance.

## Common Misconceptions
- ACID is not synonymous with SQL databases; some NoSQL databases can also support ACID transactions.
- ACID does not inherently solve all data consistency issues, especially in distributed systems.

## Related Topics
- CAP Theorem
- BASE Model
- Distributed Transactions
- Two-Phase Commit
- Eventual Consistency

## References
- [ACID Properties - Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-3D2E3A5E-4E0C-4E9B-9A6A-3F4D8F1E5E3B)
- [ACID Transactions - IBM](https://www.ibm.com/docs/en/db2-for-zos/11?topic=concepts-acid-properties)