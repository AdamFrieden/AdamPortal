# Databases (SQL & NoSQL)

> Databases are essential for storing, retrieving, and managing data efficiently. SQL databases offer structured query language for relational data, while NoSQL databases provide flexibility for unstructured data and scalability.

## Core idea
- **SQL Databases**: Use structured query language to manage relational data. They are ideal for applications requiring complex queries and transactions.
- **NoSQL Databases**: Designed for unstructured data, offering flexibility and scalability. They support various data models like document, key-value, column-family, and graph.

## Key features
- **SQL**:
  - **ACID Compliance**: Ensures data integrity through Atomicity, Consistency, Isolation, and Durability.
  - **Schema-based**: Requires predefined schemas, making it suitable for structured data.
  - **Complex Queries**: Supports complex joins and aggregations.
- **NoSQL**:
  - **Schema-less**: Allows dynamic schema for unstructured data.
  - **Horizontal Scalability**: Easily scales out by adding more servers.
  - **Variety of Data Models**: Supports document, key-value, column-family, and graph models.

## Why / When / How
- **When to use SQL**:
  - Applications requiring complex queries and transactions.
  - Systems where data integrity and consistency are critical.
- **When to use NoSQL**:
  - Applications with large volumes of unstructured data.
  - Systems requiring high availability and horizontal scalability.
- **Common pitfalls**:
  - **SQL**: Can be less performant with large-scale unstructured data.
  - **NoSQL**: May lack ACID compliance, leading to eventual consistency issues.

## Example / Walk-through
```pseudo
# SQL Example
SELECT * FROM users WHERE age > 30;

# NoSQL Example (MongoDB)
db.users.find({ "age": { "$gt": 30 } });
```

## Real-world applications
- **SQL**: Banking systems, e-commerce platforms, and ERP systems where data integrity is crucial.
- **NoSQL**: Social media platforms, IoT applications, and real-time analytics where scalability and flexibility are prioritized.

## References
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [MongoDB Official Documentation](https://www.mongodb.com/docs/)