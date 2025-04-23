# Cassandra

> Apache Cassandra is a highly scalable, distributed NoSQL database designed for handling large amounts of data across many commodity servers.

## Overview
Cassandra is a distributed database management system designed to handle large volumes of data across multiple servers without a single point of failure. It was originally developed at Facebook to power their inbox search feature and is now an open-source project under the Apache Software Foundation. Cassandra is particularly suited for applications that require high availability and scalability.

## Core Idea / Mental Model
- **Distributed Architecture**: Data is automatically partitioned across multiple nodes, ensuring no single point of failure.
- **Eventual Consistency**: Prioritizes availability and partition tolerance over immediate consistency, following the CAP theorem.

## Key Features & Benefits
- **Linear Scalability**: Easily add nodes to increase capacity and throughput.
- **Fault Tolerance**: Data is replicated across multiple nodes, ensuring high availability.
- **Flexible Schema**: Supports dynamic changes to data models without downtime.
- **Tunable Consistency**: Allows configuration of consistency levels per operation.

## Trade-offs & Pitfalls
- **Complexity**: Requires careful planning and understanding of data modeling and partitioning.
- **Consistency**: Eventual consistency can lead to stale reads if not properly managed.
- **Operational Overhead**: Managing a large cluster can be resource-intensive.

## When to Use / When to Avoid
- **Use**: When you need high write throughput, fault tolerance, and can tolerate eventual consistency.
- **Avoid**: When strong consistency is a must or for small-scale applications where simpler databases suffice.

## Real-World Examples & Modern Alternatives
- **Examples**: Netflix uses Cassandra for its streaming services; Apple employs it for iCloud.
- **Alternatives**: Amazon DynamoDB, Google Cloud Bigtable, and ScyllaDB offer similar capabilities with different trade-offs.

## Common Misconceptions
- **Myth**: Cassandra is only suitable for large-scale applications.
- **Reality**: While optimized for scale, it can be used for smaller applications with the right configuration.

## Related Topics
- NoSQL Databases
- CAP Theorem
- Distributed Systems
- Data Partitioning
- Consistency Models

## References
- [Apache Cassandra Documentation](https://cassandra.apache.org/doc/latest/)
- [Cassandra on Wikipedia](https://en.wikipedia.org/wiki/Apache_Cassandra)