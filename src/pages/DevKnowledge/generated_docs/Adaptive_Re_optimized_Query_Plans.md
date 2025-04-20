# Adaptive / Re-optimized Query Plans

> Adaptive or re-optimized query plans dynamically adjust execution strategies based on runtime conditions, enhancing performance and resource utilization in database systems.

## Core idea
- **Dynamic Adjustment**: Adaptive query plans modify execution strategies during runtime, reacting to actual data distribution and system load.
- **Performance Optimization**: They aim to improve query performance by selecting the most efficient execution path based on real-time feedback.
- **Resource Efficiency**: By adapting to current conditions, these plans help in better resource allocation and utilization.

## Key features
- **Feedback Loop**: Utilizes runtime statistics to adjust plans, ensuring optimal execution paths.
- **Plan Flexibility**: Supports multiple execution strategies, switching between them as needed.
- **Cost-based Decisions**: Continuously evaluates the cost of different execution paths to choose the most efficient one.
- **Error Correction**: Mitigates the impact of incorrect cardinality estimates or unexpected data distributions.

## Why / When / How
- **Why Use**: To enhance query performance in environments with variable data distributions or unpredictable workloads.
- **When to Use**: Ideal in OLAP systems, complex queries, or when dealing with large datasets where static plans may fail.
- **Common Pitfalls**: Overhead from frequent plan changes; not suitable for simple queries where static plans suffice.
- **When Not to Use**: In systems where query execution time is predictable and consistent, or where the overhead of adaptation outweighs benefits.

## Example / Walk-through
```pseudo
# Pseudo-code for adaptive query execution
BEGIN QUERY EXECUTION
  INITIALIZE PLAN
  WHILE QUERY NOT COMPLETE
    EXECUTE CURRENT PLAN
    COLLECT RUNTIME STATISTICS
    IF PERFORMANCE BELOW THRESHOLD
      RE-EVALUATE PLAN
      SWITCH TO OPTIMAL PLAN
    END IF
  END WHILE
END QUERY EXECUTION
```

## Real-world applications
- **Oracle Database**: Uses adaptive query plans to adjust join methods and access paths based on runtime statistics.
- **Microsoft SQL Server**: Implements adaptive query processing to handle memory grant feedback and batch mode adaptive joins.
- **PostgreSQL**: Though traditionally static, extensions and community tools are exploring adaptive strategies.

## References
- [Oracle Database Adaptive Query Plans](https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/adaptive-query-optimization.html)
- [Microsoft SQL Server Adaptive Query Processing](https://docs.microsoft.com/en-us/sql/relational-databases/performance/adaptive-query-processing?view=sql-server-ver15)