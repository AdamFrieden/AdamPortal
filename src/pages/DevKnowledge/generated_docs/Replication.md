# Replication

> Replication is the process of sharing information to ensure consistency between redundant resources.

## Overview
Replication involves copying and maintaining database objects, such as tables, in multiple database systems to ensure data consistency and availability. It exists to enhance data redundancy, improve fault tolerance, and increase data accessibility across distributed systems.

## Core Idea / Mental Model
- Replication ensures that data is consistently available across multiple locations, reducing the risk of data loss and improving system reliability.
- It can be synchronous (real-time updates) or asynchronous (updates with a delay).

## Key Features & Benefits
- **Data Redundancy**: Provides backup copies of data, enhancing fault tolerance.
- **High Availability**: Ensures data is accessible even if one system fails.
- **Load Balancing**: Distributes read operations across replicas to improve performance.
- **Disaster Recovery**: Facilitates data recovery in case of system failures.

## Trade-offs & Pitfalls
- **Consistency Issues**: Risk of data inconsistency, especially in asynchronous replication.
- **Increased Complexity**: Managing multiple data copies can complicate system architecture.
- **Latency**: Synchronous replication can introduce latency due to real-time data synchronization.
- **Resource Overhead**: Requires additional storage and processing resources.

## When to Use / When to Avoid
- **Use When**: High availability, fault tolerance, and disaster recovery are critical.
- **Avoid When**: Consistency is paramount, and the system cannot tolerate eventual consistency.

## Real-World Examples & Modern Alternatives
- **Tools**: MySQL Replication, PostgreSQL Streaming Replication, MongoDB Replica Sets.
- **Alternatives**: Sharding for horizontal scaling, caching for read-heavy workloads.

## Common Misconceptions
- **Replication is Backup**: Replication is not a substitute for backups; it's for availability, not data recovery.
- **Always Consistent**: Not all replication guarantees immediate consistency; eventual consistency is common.

## Related Topics
- **Sharding**: Distributing data across multiple databases for horizontal scaling.
- **CAP Theorem**: Understanding trade-offs between consistency, availability, and partition tolerance.
- **Eventual Consistency**: A consistency model used in distributed computing.
- **Load Balancing**: Distributing workloads across multiple resources.
- **Data Partitioning**: Dividing data into distinct, independent parts.

## References
- [Replication in Database Systems - Microsoft Learn](https://learn.microsoft.com/en-us/sql/relational-databases/replication/replication-database-engine?view=sql-server-ver15)  
- [Understanding Replication - Oracle Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/19/replc/replication-concepts.html)