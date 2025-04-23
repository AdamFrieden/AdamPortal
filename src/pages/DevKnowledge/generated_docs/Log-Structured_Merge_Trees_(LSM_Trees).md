# Log-Structured Merge Trees (LSM Trees)

> LSM Trees optimize write-heavy workloads by deferring and batching writes, making them ideal for databases with high write throughput.

## Overview
Log-Structured Merge Trees (LSM Trees) are a data structure designed to handle high write throughput efficiently. They achieve this by batching writes in memory and periodically merging them into a sorted structure on disk. This approach minimizes disk I/O, which is a common bottleneck in write-heavy applications.

## Core Idea / Mental Model
- Writes are initially buffered in memory (memtable) and periodically flushed to disk as immutable segments.
- On-disk data is organized into levels; merging occurs between levels to maintain sorted order.
- Read operations may require merging data from multiple levels, but this is offset by the efficiency of batched writes.

## Key Features & Benefits
- **High Write Throughput**: Efficiently handles large volumes of writes by deferring and batching them.
- **Compaction**: Periodic merging reduces fragmentation and maintains sorted order.
- **Efficient Use of Disk**: Minimizes random disk writes, leveraging sequential I/O for better performance.

## Trade-offs & Pitfalls
- **Read Amplification**: Reads may need to access multiple levels, increasing latency.
- **Space Amplification**: Temporary duplication of data during compaction can increase storage requirements.
- **Complexity**: Managing compaction and level merging adds complexity to implementation.

## When to Use / When to Avoid
- **Use**: High write throughput scenarios, such as logging systems, time-series databases, and write-heavy applications.
- **Avoid**: Read-heavy workloads where low-latency reads are critical, or when storage space is a primary concern.

## Real-World Examples & Modern Alternatives
- **Examples**: Apache Cassandra, RocksDB, and LevelDB use LSM Trees.
- **Alternatives**: B-trees for read-heavy workloads, or hybrid approaches like Fractal Trees.

## Common Misconceptions
- **"LSM Trees are always better than B-trees"**: Not true; depends on workload characteristics.
- **"LSM Trees eliminate all read latency issues"**: They optimize writes, but reads can still be complex.

## Related Topics
- B-trees
- Compaction strategies
- Write-ahead logging
- Time-series databases
- Data partitioning

## References
- [The Log-Structured Merge-Tree (LSM-Tree)](https://www.cs.umb.edu/~poneil/lsmtree.pdf)  
- [RocksDB Architecture Guide](https://github.com/facebook/rocksdb/wiki/RocksDB-Architecture-Guide)