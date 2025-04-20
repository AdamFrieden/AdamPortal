# CAP Theorem

> The CAP Theorem, formulated by Eric Brewer, states that a distributed data store can only guarantee two out of the following three properties simultaneously: Consistency, Availability, and Partition Tolerance. This theorem is crucial for designing distributed systems and understanding trade-offs in system architecture.

## Core idea
- **Consistency**: Every read receives the most recent write or an error. This ensures that all nodes in a distributed system reflect the same data at any given time.
- **Availability**: Every request (read or write) receives a response, regardless of the success or failure of the operation. This ensures that the system remains operational and responsive.
- **Partition Tolerance**: The system continues to operate despite network partitions, which are disruptions in communication between nodes.

## Key features
- **Trade-offs**: In the presence of a network partition, a system must choose between consistency and availability. This trade-off is central to the CAP Theorem.
- **Design Implications**: Understanding CAP helps architects design systems that align with business priorities, such as prioritizing availability over consistency in user-facing applications.
- **Use Cases**: Systems like NoSQL databases often prioritize availability and partition tolerance, while traditional RDBMS systems prioritize consistency.

## Why / When / How
- **Why Use**: CAP Theorem guides the design of distributed systems by highlighting the trade-offs between consistency, availability, and partition tolerance.
- **When to Use**: Use CAP considerations when designing systems that require high availability or need to handle network partitions gracefully.
- **Common Pitfalls**: Misunderstanding CAP can lead to inappropriate system design choices, such as expecting a system to provide all three guarantees simultaneously.

## Example / Walk-through
```pseudo
# Consider a distributed database system:
# Scenario: Network partition occurs between Node A and Node B

# Consistency + Partition Tolerance (CP)
# - Node A and Node B cannot communicate.
# - System prioritizes consistency: Node A and Node B may refuse writes to maintain data integrity.

# Availability + Partition Tolerance (AP)
# - Node A and Node B cannot communicate.
# - System prioritizes availability: Both nodes accept writes, potentially leading to data divergence.

# Consistency + Availability (CA)
# - Only possible in the absence of network partitions.
# - All nodes are consistent and available, but not partition-tolerant.
```

## Real-world applications
- **Apache Cassandra**: Prioritizes availability and partition tolerance, making it suitable for applications requiring high availability.
- **Google Spanner**: A globally distributed database that provides consistency and partition tolerance, suitable for applications where consistency is critical.

## References
- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services](https://www.cs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf)
- [CAP Twelve Years Later: How the "Rules" Have Changed](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)