# Consensus Algorithms

> Consensus algorithms are critical in distributed systems to ensure that all nodes agree on a single data value, maintaining consistency and reliability across the network.

## Core idea
- **Distributed Agreement**: Consensus algorithms enable multiple nodes in a distributed system to agree on a single version of the truth, even in the presence of failures.
- **Fault Tolerance**: They are designed to handle node failures and network partitions, ensuring system reliability.
- **Consistency**: These algorithms are fundamental to achieving consistency in distributed databases and blockchain systems.

## Key features
- **Fault Tolerance**: Ability to continue operating correctly even if some nodes fail.
- **Decentralization**: No single point of failure, enhancing system robustness.
- **Scalability**: Designed to work efficiently as the number of nodes increases.
- **Security**: Protects against malicious actors attempting to disrupt consensus.

## Why / When / How
- **Why**: Essential for maintaining data consistency and reliability in distributed systems.
- **When**: Use in systems where multiple nodes need to agree on a single source of truth, such as distributed databases, blockchain networks, and multi-agent systems.
- **How**: Implement by selecting an appropriate algorithm based on system requirements, such as Paxos, Raft, or Byzantine Fault Tolerance (BFT).
- **Pitfalls**: Avoid in systems where latency is critical, as consensus can introduce delays. Not suitable for small, centralized systems where a single point of control suffices.

## Example / Walk-through
```pseudo
# Simplified Raft consensus algorithm steps
1. Leader Election
   - Nodes vote to elect a leader.
   - Leader manages log replication.

2. Log Replication
   - Leader receives client requests.
   - Appends requests to its log.
   - Sends log entries to followers.

3. Commit Entries
   - Once a majority of followers replicate the entry, it is committed.
   - Followers apply committed entries to their state machines.

4. Handle Failures
   - If leader fails, a new election is triggered.
   - Followers can become candidates and request votes.
```

## Real-world applications
- **Blockchain**: Bitcoin uses Proof of Work, while Ethereum 2.0 uses Proof of Stake for consensus.
- **Distributed Databases**: Systems like Google Spanner and Amazon DynamoDB use consensus algorithms to ensure data consistency.
- **Cloud Services**: Kubernetes uses etcd, which implements the Raft algorithm, for cluster state management.

## References
- [Paxos Made Simple](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf) by Leslie Lamport
- [Raft Consensus Algorithm](https://raft.github.io/) official website