# Consistency Models

> Consistency models define the rules for how data is viewed and updated across distributed systems, balancing trade-offs between performance, availability, and correctness.

## Core idea
- Consistency models are critical in distributed systems to ensure that all nodes have a coherent view of data.
- They define the contract between the system and the user regarding the visibility and ordering of updates.
- Different models offer varying guarantees, impacting system design and user experience.

## Key features
- **Strong Consistency**: Guarantees that all nodes see the same data at the same time. Ideal for systems requiring strict correctness.
- **Eventual Consistency**: Ensures that, given enough time, all nodes will converge to the same state. Suitable for high-availability systems.
- **Causal Consistency**: Preserves the cause-and-effect relationship between operations. Useful in collaborative applications.
- **Read-Your-Writes Consistency**: Guarantees that a user's writes are immediately visible to their subsequent reads.
- **Session Consistency**: Provides consistency guarantees within a single session, balancing performance and correctness.

## Why / When / How
- **Why**: Consistency models help manage the trade-offs between performance, availability, and data correctness in distributed systems.
- **When**: Choose based on application requirements—strong consistency for financial transactions, eventual consistency for social media feeds.
- **How**: Implement using distributed databases, consensus algorithms, or middleware that supports the desired consistency level.
- **Pitfalls**: Strong consistency can lead to high latency and reduced availability. Eventual consistency may cause temporary data anomalies.

## Example / Walk-through
```pseudo
# Pseudo-code for eventual consistency
node1.write("key", "value1")
node2.write("key", "value2")

# Eventually, both nodes will converge to the same value
```

## Real-world applications
- **Strong Consistency**: Used in systems like Google Spanner for global transactions.
- **Eventual Consistency**: Employed by Amazon DynamoDB and Apache Cassandra for scalable, high-availability applications.
- **Causal Consistency**: Utilized in collaborative platforms like Google Docs to maintain operation order.

## References
- [Consistency Models in Distributed Systems](https://www.cs.cornell.edu/home/rvr/papers/DSConsistency.pdf)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html)