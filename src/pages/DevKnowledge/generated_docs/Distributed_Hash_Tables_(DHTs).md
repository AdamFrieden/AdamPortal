# Distributed Hash Tables (DHTs)

> Distributed Hash Tables (DHTs) are decentralized systems that provide a scalable and efficient way to store and retrieve data across a distributed network, enabling robust peer-to-peer applications.

## Core idea
- **Decentralization**: DHTs eliminate the need for a central server by distributing data across multiple nodes, enhancing fault tolerance and scalability.
- **Scalability**: They efficiently handle large volumes of data and nodes, making them suitable for dynamic and large-scale networks.
- **Key-Value Storage**: DHTs use a hash function to map keys to values, distributing them evenly across nodes to ensure load balancing.
- **Self-Organization**: Nodes in a DHT can join and leave the network dynamically, with the system automatically adjusting to maintain data availability and consistency.

## Key features
- **Fault Tolerance**: DHTs are resilient to node failures, as data is replicated across multiple nodes.
- **Efficient Lookup**: They provide logarithmic time complexity for data retrieval, typically O(log N), where N is the number of nodes.
- **Load Balancing**: The hashing mechanism ensures that data is evenly distributed, preventing any single node from becoming a bottleneck.
- **Decentralized Control**: No single point of failure or control, enhancing security and robustness.

## Why / When / How
- **When to Use**: Ideal for peer-to-peer networks, distributed file systems, and applications requiring high availability and fault tolerance.
- **Why Use**: To achieve a scalable, decentralized architecture that can handle dynamic network changes and large data volumes.
- **Common Pitfalls**: Not suitable for applications requiring strong consistency guarantees or low-latency access to data. Network partitioning and churn can affect performance.

## Example / Walk-through
```pseudo
# Pseudo-code for a basic DHT operation
function store(key, value):
    node = find_node(hash(key))
    node.store(key, value)

function retrieve(key):
    node = find_node(hash(key))
    return node.retrieve(key)

function find_node(hash):
    # Locate the node responsible for the given hash
    # Typically involves routing through a series of nodes
    return closest_node_to_hash(hash)
```

## Real-world applications
- **BitTorrent**: Uses DHTs for decentralized peer discovery, allowing users to find peers without a central tracker.
- **IPFS (InterPlanetary File System)**: Employs DHTs to locate and retrieve files in a distributed file system.
- **Blockchain Networks**: Some blockchain systems use DHTs for efficient data distribution and retrieval.

## References
- [Chord: A Scalable Peer-to-peer Lookup Protocol for Internet Applications](https://pdos.csail.mit.edu/papers/chord:sigcomm01/chord_sigcomm.pdf)
- [Kademlia: A Peer-to-peer Information System Based on the XOR Metric](https://www.scs.stanford.edu/~dm/home/papers/kpos.pdf)