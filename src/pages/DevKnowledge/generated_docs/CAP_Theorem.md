# CAP Theorem

> CAP Theorem states that a distributed data store can only guarantee two out of three: Consistency, Availability, and Partition Tolerance.

## Overview
CAP Theorem, formulated by Eric Brewer, addresses the challenges of distributed systems. It highlights the trade-offs between consistency, availability, and partition tolerance, which are crucial for designing robust distributed databases.

## Core Idea / Mental Model
- **Consistency**: Every read receives the most recent write or an error.
- **Availability**: Every request receives a response, without guarantee that it contains the most recent write.
- **Partition Tolerance**: The system continues to operate despite network partitions.

## Key Features & Benefits
- **Guidance for System Design**: Helps architects make informed decisions about trade-offs in distributed systems.
- **Focus on Partition Tolerance**: Essential for systems that must operate across unreliable networks.
- **Flexibility**: Allows prioritization based on specific application needs (e.g., banking vs. social media).

## Trade-offs & Pitfalls
- **Inherent Limitations**: Cannot achieve all three properties simultaneously in a distributed system.
- **Over-simplification**: Real-world systems often require nuanced approaches beyond CAP.
- **Misinterpretation**: Assuming CAP applies to all distributed systems without considering specific requirements.

## When to Use / When to Avoid
- **Use**: When designing distributed databases where network partitions are possible, and trade-offs between consistency and availability must be made.
- **Avoid**: In systems where network partitions are unlikely or where strong consistency is non-negotiable.

## Real-World Examples & Modern Alternatives
- **Examples**: Apache Cassandra (AP), MongoDB (CP), Amazon DynamoDB (AP).
- **Alternatives**: Consistency models like BASE (Basically Available, Soft state, Eventually consistent) or ACID (Atomicity, Consistency, Isolation, Durability) for different use cases.

## Common Misconceptions
- **CAP is not about performance**: It's about trade-offs in distributed systems.
- **Not a strict rule**: It's a guideline, not a law; real-world systems often blend properties.

## Related Topics
- **BASE Consistency Model**
- **ACID Transactions**
- **Distributed Systems Design**
- **Eventual Consistency**
- **Network Partitioning**

## References
- [CAP Theorem on Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)  
- [Brewer's Original Paper](https://www.cs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf)