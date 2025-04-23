# Cosmos DB

> A globally distributed, multi-model database service by Microsoft Azure for scalable, low-latency applications.

## Overview
Cosmos DB is a fully managed NoSQL database service designed to provide high availability, low latency, and global distribution. It was created to meet the needs of modern applications that require seamless scalability and performance across multiple regions.

## Core Idea / Mental Model
- Designed for global distribution and horizontal scaling.
- Supports multiple data models: key-value, document, column-family, and graph.
- Offers multi-region writes and reads with guaranteed low latency.

## Key Features & Benefits
- **Global Distribution**: Automatically replicates data across any number of Azure regions.
- **Multi-Model Support**: Flexibility to use different data models within the same service.
- **Guaranteed SLAs**: Provides comprehensive SLAs for availability, throughput, consistency, and latency.
- **Elastic Scalability**: Seamlessly scales throughput and storage across regions.
- **Multiple Consistency Levels**: Offers five consistency models, from strong to eventual, to balance performance and consistency.

## Trade-offs & Pitfalls
- **Cost**: Can become expensive with large-scale global deployments.
- **Complexity**: Multi-model support can introduce complexity in choosing the right model for specific use cases.
- **Learning Curve**: Requires understanding of distributed systems and consistency models.

## When to Use / When to Avoid
- **Use**: When building applications that require global distribution, low latency, and high availability.
- **Avoid**: For simple, single-region applications where a traditional relational database suffices.

## Real-World Examples & Modern Alternatives
- **Examples**: Real-time gaming, IoT applications, retail and e-commerce platforms.
- **Alternatives**: Amazon DynamoDB, Google Cloud Spanner, Apache Cassandra.

## Common Misconceptions
- **Myth**: Cosmos DB is only for large enterprises.
  - **Fact**: It is suitable for any size application needing global distribution.
- **Myth**: It only supports document data models.
  - **Fact**: Supports multiple data models including key-value, graph, and column-family.

## Related Topics
- Distributed Databases
- NoSQL Databases
- CAP Theorem
- Azure Services
- Data Consistency Models

## References
- [Microsoft Azure Cosmos DB Documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)  
- [Azure Cosmos DB Pricing](https://azure.microsoft.com/en-us/pricing/details/cosmos-db/)