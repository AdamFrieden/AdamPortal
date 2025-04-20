# Databases (SQL & NoSQL)

> Databases are essential for storing, retrieving, and managing data efficiently. SQL databases are structured and relational, while NoSQL databases offer flexibility for unstructured data and scalability.

## Core idea
- **SQL Databases**: Use structured query language for defining and manipulating data. They are relational, meaning data is stored in tables with predefined schemas.
- **NoSQL Databases**: Designed for unstructured data, offering flexibility and scalability. They are non-relational and can store data in various formats like key-value pairs, documents, graphs, or wide-columns.
- **Importance**: Choosing the right database type is crucial for performance, scalability, and data integrity in software systems.

## Key features
- **SQL**:
  - ACID compliance ensures reliable transactions.
  - Strong schema and data integrity.
  - Ideal for complex queries and joins.
- **NoSQL**:
  - Schema-less design allows for rapid iteration.
  - Horizontal scaling for large data volumes.
  - Suitable for distributed data and high-velocity applications.

## Why / When / How
- **SQL**:
  - Use when data integrity and complex querying are priorities.
  - Ideal for applications requiring multi-row transactions.
  - Avoid for highly dynamic or unstructured data.
- **NoSQL**:
  - Use for large-scale, distributed data systems.
  - Suitable for applications with evolving schemas.
  - Avoid when strong consistency and complex transactions are required.

## Example / Walk-through
```sql
-- SQL Example: Creating a table and inserting data
CREATE TABLE Users (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100)
);

INSERT INTO Users (ID, Name, Email) VALUES (1, 'John Doe', 'john@example.com');
```

```pseudo
# NoSQL Example: Inserting a document in a document store
{
    "ID": 1,
    "Name": "John Doe",
    "Email": "john@example.com"
}
```

## Real-world applications
- **SQL**:
  - Banking systems where data integrity is critical.
  - Enterprise resource planning (ERP) systems.
- **NoSQL**:
  - Social media platforms handling large volumes of user-generated content.
  - Real-time analytics and IoT applications.

## References
- [SQL vs NoSQL Databases: What's the Difference?](https://www.mongodb.com/nosql-explained)
- [ACID Properties in SQL Databases](https://www.postgresql.org/docs/current/transaction-iso.html)