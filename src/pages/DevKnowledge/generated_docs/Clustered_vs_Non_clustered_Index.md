# Clustered vs Non-clustered Index

> **Takeaway**: Understanding the differences between clustered and non-clustered indexes is crucial for optimizing database performance. Clustered indexes determine the physical order of data, while non-clustered indexes provide a logical ordering, each serving distinct purposes in query optimization.

## Core Idea
- **Clustered Index**: Alters the physical order of the data in the table to match the index order. Each table can have only one clustered index.
- **Non-clustered Index**: Maintains a separate structure from the data rows, providing a logical order without affecting the physical order. A table can have multiple non-clustered indexes.
- **Importance**: Proper indexing can significantly enhance query performance, reducing data retrieval time and improving overall application efficiency.

## Key Features
- **Clustered Index**:
  - Directly affects the data storage order.
  - Efficient for range queries and retrieval of large data sets.
  - Typically used on columns frequently involved in sorting and range queries.
- **Non-clustered Index**:
  - Stores pointers to the actual data rows.
  - Suitable for exact lookups and queries involving multiple columns.
  - Allows multiple indexes per table, providing flexibility in query optimization.

## Why / When / How
- **When to Use Clustered Index**:
  - Use when queries involve range retrievals or when sorting is frequently required.
  - Ideal for primary keys or columns with unique values.
- **When to Use Non-clustered Index**:
  - Use for columns frequently involved in search conditions or joins.
  - Beneficial for columns with high selectivity.
- **Common Pitfalls**:
  - Avoid excessive indexing, which can degrade performance due to increased maintenance overhead.
  - Be cautious of clustered index fragmentation, which can slow down data retrieval.

## Example / Walk-through
```sql
-- Creating a clustered index on a primary key
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    DepartmentID INT
);

-- Creating a non-clustered index on the Name column
CREATE NONCLUSTERED INDEX idx_name ON Employees(Name);
```

## Real-world Applications
- **Clustered Index**: Used in OLTP systems where quick retrieval of records based on primary keys is essential.
- **Non-clustered Index**: Common in data warehousing environments where complex queries and joins are frequent.

## References
- [Microsoft SQL Server Index Architecture](https://docs.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide)
- [Oracle Database Indexing](https://docs.oracle.com/en/database/oracle/oracle-database/19/indexes/indexes-overview.html)