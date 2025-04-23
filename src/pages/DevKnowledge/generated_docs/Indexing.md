# Indexing

> Indexing optimizes data retrieval speed by creating a structured map of data locations.

## Overview
Indexing is a technique used in databases and search engines to improve the speed of data retrieval operations. It exists to reduce the time complexity of search operations, making data access more efficient by creating auxiliary data structures that allow for faster lookups.

## Core Idea / Mental Model
- Indexing works like a book's index, mapping keys to data locations, enabling quick access without scanning the entire dataset.
- It transforms linear search operations into logarithmic or constant time operations, significantly enhancing performance.

## Key Features & Benefits
- **Speed**: Dramatically reduces data retrieval time.
- **Efficiency**: Minimizes the need to scan entire datasets.
- **Scalability**: Supports large datasets by maintaining performance.
- **Flexibility**: Can be applied to various data types and structures.

## Trade-offs & Pitfalls
- **Storage Overhead**: Indexes require additional storage space.
- **Maintenance Cost**: Indexes need updating with data modifications, potentially slowing down write operations.
- **Complexity**: Improper indexing can lead to inefficient query plans and degraded performance.

## When to Use / When to Avoid
- **Use**: When read performance is critical, and datasets are large.
- **Avoid**: When write performance is more critical than read performance, or when storage resources are limited.

## Real-World Examples & Modern Alternatives
- **Tools**: MySQL, PostgreSQL, and MongoDB use indexing to enhance query performance.
- **Alternatives**: In-memory databases (e.g., Redis) and columnar storage (e.g., Apache Parquet) offer different performance optimizations.

## Common Misconceptions
- **Indexes are always beneficial**: Over-indexing can degrade performance.
- **Indexes eliminate the need for query optimization**: They complement but do not replace query optimization.

## Related Topics
- Query Optimization
- Database Normalization
- Data Structures (e.g., B-trees, Hash Tables)
- Caching Strategies
- NoSQL Databases

## References
- [Database Indexing - Wikipedia](https://en.wikipedia.org/wiki/Database_index)
- [MySQL Indexing Best Practices - MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html)