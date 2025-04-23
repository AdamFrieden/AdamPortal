# SQLite

> SQLite is a lightweight, serverless, self-contained SQL database engine ideal for embedded systems and local storage.

## Overview
SQLite is a C library that provides a relational database management system. It is designed to be embedded within applications, offering a simple, fast, and reliable way to store and retrieve data without the need for a separate server process.

## Core Idea / Mental Model
- SQLite operates as a self-contained, zero-configuration, serverless database engine.
- It stores entire databases in a single cross-platform disk file, making it highly portable.

## Key Features & Benefits
- **Serverless**: No separate server process; the application directly accesses the database.
- **Zero Configuration**: No setup or administration required.
- **Lightweight**: Small footprint, ideal for embedded systems and mobile devices.
- **ACID Compliance**: Ensures reliable transactions and data integrity.
- **Cross-Platform**: Works on various operating systems without modification.
- **Public Domain**: Free to use for any purpose without licensing fees.

## Trade-offs & Pitfalls
- **Concurrency Limitations**: Limited write concurrency; not suitable for high-write, multi-user environments.
- **Size Constraints**: Not optimal for very large databases (typically > 140 TB).
- **Lack of Advanced Features**: Missing some advanced SQL features found in larger RDBMS like stored procedures or user-defined functions.

## When to Use / When to Avoid
- **Use**: Embedded systems, mobile apps, small to medium-sized applications, prototyping, and testing.
- **Avoid**: High-concurrency, large-scale web applications, or when advanced database features are required.

## Real-World Examples & Modern Alternatives
- **Examples**: Mobile apps (iOS, Android), IoT devices, desktop applications.
- **Alternatives**: MySQL, PostgreSQL for server-based needs; NoSQL databases like MongoDB for non-relational data.

## Common Misconceptions
- **Myth**: SQLite is not a "real" database.  
  **Fact**: It is a fully compliant SQL database engine.
- **Myth**: SQLite is only for small projects.  
  **Fact**: It is used in many large-scale applications where its features are appropriate.

## Related Topics
- Relational Database Management Systems (RDBMS)
- ACID Transactions
- Embedded Systems
- SQL Language
- Database Concurrency

## References
- [SQLite Official Documentation](https://www.sqlite.org/docs.html)  
- [SQLite Wikipedia Page](https://en.wikipedia.org/wiki/SQLite)