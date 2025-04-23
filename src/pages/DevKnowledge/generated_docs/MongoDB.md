# MongoDB

> MongoDB is a NoSQL database designed for scalability, flexibility, and ease of development.

## Overview
MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents. It was created to address the limitations of traditional relational databases, particularly in handling large volumes of unstructured data and enabling rapid development cycles.

## Core Idea / Mental Model
- Data is stored in collections of documents, allowing for a flexible schema.
- Documents are JSON-like, enabling easy mapping to application objects.
- Designed for horizontal scaling and high availability.

## Key Features & Benefits
- **Schema Flexibility**: No predefined schema, allowing for dynamic changes.
- **Horizontal Scalability**: Sharding enables distribution across multiple servers.
- **Rich Query Language**: Supports complex queries, indexing, and aggregation.
- **High Availability**: Built-in replication and failover mechanisms.
- **Developer-Friendly**: JSON-like documents align well with modern programming languages.

## Trade-offs & Pitfalls
- **Consistency**: Eventual consistency can be a challenge for some applications.
- **Complex Transactions**: Limited support for multi-document ACID transactions.
- **Memory Usage**: Can be memory-intensive due to its data storage format.
- **Indexing**: Poorly designed indexes can lead to performance issues.

## When to Use / When to Avoid
- **Use**: When dealing with large volumes of unstructured data, requiring rapid development, or needing horizontal scalability.
- **Avoid**: When strong ACID compliance is critical, or when dealing with complex transactions across multiple documents.

## Real-World Examples & Modern Alternatives
- **Examples**: Content management systems, real-time analytics, IoT applications.
- **Alternatives**: Apache Cassandra, Couchbase, Amazon DynamoDB.

## Common Misconceptions
- **"No Schema"**: MongoDB supports schema validation and can enforce structure.
- **"Not for Transactions"**: Supports multi-document ACID transactions since version 4.0.

## Related Topics
- NoSQL Databases
- Sharding and Replication
- JSON and BSON
- CAP Theorem
- Data Modeling in NoSQL

## References
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [MongoDB Architecture Guide](https://www.mongodb.com/architecture)