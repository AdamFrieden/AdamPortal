# Database Indexing

> Database indexing is a technique to optimize query performance by reducing data retrieval time.

## Overview
Database indexing is a data structure technique used to improve the speed of data retrieval operations on a database table. It exists to enhance query performance by minimizing the amount of data that needs to be scanned to find relevant records.

## Core Idea / Mental Model
- Indexes are similar to the index of a book, allowing quick lookup of data without scanning the entire dataset.
- They are additional data structures that store a subset of columns in a sorted order, facilitating fast search operations.

## Key Features & Benefits
- **Improved Query Performance**: Significantly speeds up SELECT queries and WHERE clauses.
- **Efficient Data Access**: Reduces the number of disk I/O operations needed to retrieve data.
- **Support for Unique Constraints**: Ensures data integrity by enforcing uniqueness on columns.

## Trade-offs & Pitfalls
- **Increased Storage**: Indexes consume additional disk space.
- **Slower Write Operations**: INSERT, UPDATE, and DELETE operations can be slower due to index maintenance.
- **Over-indexing**: Too many indexes can degrade performance and complicate database management.

## When to Use / When to Avoid
- **Use**: When read performance is critical, and the dataset is large.
- **Avoid**: For small datasets or when write performance is more critical than read performance.

## Real-World Examples & Modern Alternatives
- **Tools**: MySQL, PostgreSQL, and Oracle support various types of indexes like B-trees and hash indexes.
- **Alternatives**: In-memory databases like Redis, which use different mechanisms for fast data retrieval.

## Common Misconceptions
- **Indexes are always beneficial**: Not true; they can degrade performance if not used judiciously.
- **Indexes eliminate the need for query optimization**: Indexes complement, not replace, good query design.

## Related Topics
- Query Optimization
- B-tree and Hash Indexes
- Database Normalization
- NoSQL Databases
- In-Memory Databases

## References
- [Database Indexing - Wikipedia](https://en.wikipedia.org/wiki/Database_index)
- [Indexing in Databases - Oracle Documentation](https://docs.oracle.com/en/database/indexing.html)