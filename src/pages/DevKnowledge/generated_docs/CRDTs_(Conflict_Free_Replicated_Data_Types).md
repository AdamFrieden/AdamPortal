# CRDTs (Conflict Free Replicated Data Types)

> CRDTs are data structures that enable distributed systems to achieve eventual consistency without conflicts, making them ideal for collaborative applications and systems with high availability requirements.

## Core idea
- CRDTs are designed to allow multiple replicas of data to be updated independently and concurrently without coordination.
- They ensure eventual consistency by using mathematical properties (commutativity, associativity, and idempotence) to resolve conflicts automatically.
- CRDTs are crucial in distributed systems where network partitions or latency can lead to conflicting updates.

## Key features
- **Conflict Resolution**: Automatically resolves conflicts without requiring complex merge logic.
- **Eventual Consistency**: Ensures that all replicas converge to the same state over time.
- **Decentralized**: No need for a central coordinator, enhancing fault tolerance and availability.
- **Scalability**: Suitable for large-scale distributed systems due to their low coordination overhead.

## Why / When / How
- **Why Use**: Ideal for systems requiring high availability and partition tolerance, such as collaborative editing tools, distributed databases, and real-time applications.
- **When to Use**: When network partitions are common, and immediate consistency is not critical.
- **How to Use**: Implement CRDTs in scenarios where eventual consistency suffices, and the overhead of conflict resolution is minimized.
- **Pitfalls**: Not suitable for systems requiring strong consistency guarantees. Complexity in designing CRDTs for specific use cases can be high.

## Example / Walk-through
```pseudo
# Example of a G-Counter (Grow-only Counter) CRDT

# Initialize counters for each replica
replica1 = GCounter()
replica2 = GCounter()

# Increment operations
replica1.increment()
replica2.increment()
replica2.increment()

# Merge operation to achieve eventual consistency
replica1.merge(replica2)

# Both replicas should now reflect the same state
assert replica1.value() == replica2.value() == 3
```

## Real-world applications
- **Google Docs**: Uses CRDT-like structures to allow multiple users to edit documents simultaneously without conflicts.
- **Riak**: A distributed database that employs CRDTs for conflict-free data replication.
- **Redis**: Implements CRDTs in its Redis CRDT module to support distributed counters and sets.

## References
- [CRDTs: Consistency without concurrency control](https://hal.inria.fr/inria-00555588/document)
- [Redis CRDTs Documentation](https://redis.io/docs/management/crdt/)