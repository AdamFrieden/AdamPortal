# Columnar vs Row based Storage

> **Takeaway**: Columnar and row-based storage are two distinct data storage paradigms, each optimized for different types of data processing tasks. Understanding their differences is crucial for designing efficient data systems.

## Core idea
- **Row-based storage**: Stores data by rows, making it ideal for transactional systems where operations typically involve reading or writing entire rows.
- **Columnar storage**: Stores data by columns, optimizing for analytical queries that aggregate data over many rows but only a few columns.
- **Importance**: Choosing the right storage format can significantly impact the performance and efficiency of data processing tasks.

## Key features
- **Row-based storage**:
  - Efficient for OLTP (Online Transaction Processing) systems.
  - Fast row retrieval, suitable for operations like `SELECT * FROM table WHERE id = ?`.
  - Commonly used in traditional RDBMS like MySQL and PostgreSQL.
  
- **Columnar storage**:
  - Optimized for OLAP (Online Analytical Processing) systems.
  - Reduces I/O by reading only relevant columns, improving query performance for large datasets.
  - Supports better compression due to data homogeneity within columns.
  - Used in data warehousing solutions like Apache Parquet, Apache ORC, and Amazon Redshift.

## Why / When / How
- **When to use row-based storage**:
  - Use when frequent, small-scale transactions are required.
  - Ideal for applications with high concurrency and need for quick row-level updates.
  - Avoid for large-scale analytical queries as it may lead to inefficient I/O operations.

- **When to use columnar storage**:
  - Use for analytical workloads where queries involve aggregations over large datasets.
  - Suitable for data warehousing and business intelligence applications.
  - Avoid for high-frequency transactional systems due to slower write performance.

## Example / Walk-through
```pseudo
# Row-based storage example
# Consider a table with columns: ID, Name, Age, Salary
# Data is stored as:
# Row 1: [1, "Alice", 30, 70000]
# Row 2: [2, "Bob", 25, 50000]

# Columnar storage example
# Data is stored as:
# Column ID: [1, 2]
# Column Name: ["Alice", "Bob"]
# Column Age: [30, 25]
# Column Salary: [70000, 50000]

# Query: SELECT AVG(Salary) FROM Employees WHERE Age > 25
# Row-based: Reads entire rows, filtering and aggregating in memory.
# Columnar: Reads only Age and Salary columns, reducing I/O.
```

## Real-world applications
- **Row-based**: Banking systems, e-commerce platforms, and CRM applications where transactions are frequent and involve entire rows.
- **Columnar**: Data lakes, analytics platforms, and reporting tools where queries focus on specific columns across large datasets.

## Sources
- [Apache Parquet Documentation](https://parquet.apache.org/documentation/latest/)
- [Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/latest/dg/c_columnar_storage_disk_mem_mgmnt.html)