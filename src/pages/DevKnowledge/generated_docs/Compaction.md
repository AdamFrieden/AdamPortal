# Compaction

> Compaction is a critical process in data storage systems, aimed at optimizing space utilization and improving read performance by reorganizing data on disk. It is particularly relevant in log-structured merge-tree (LSM-tree) based databases and file systems.

## Core idea
- **Data Reorganization**: Compaction involves merging smaller, fragmented data files into larger, more contiguous files, reducing fragmentation and improving access speed.
- **Space Efficiency**: By eliminating redundant data and reclaiming space from deleted or obsolete entries, compaction helps maintain efficient disk usage.
- **Performance Enhancement**: Regular compaction reduces the number of disk seeks required during read operations, thus enhancing overall system performance.

## Key features
- **Garbage Collection**: Compaction acts as a form of garbage collection, removing stale or outdated data entries.
- **Data Consolidation**: It consolidates scattered data, which can significantly reduce the read amplification in LSM-tree based systems.
- **Write Optimization**: By reorganizing data, compaction can help in optimizing write paths, making subsequent writes more efficient.

## Why / When / How
- **Why Use It**: Essential for maintaining performance in systems with high write throughput, such as databases and distributed file systems.
- **When to Use It**: Typically employed in systems using LSM-trees, such as Apache Cassandra, RocksDB, and LevelDB, where data is frequently updated or deleted.
- **Common Pitfalls**: Over-compaction can lead to excessive I/O and CPU usage, potentially degrading system performance. It's crucial to balance compaction frequency and intensity based on workload characteristics.

## Example / Walk-through
```pseudo
# Pseudo-code for a simple compaction process
function compact(dataFiles):
    sortedData = []
    for file in dataFiles:
        sortedData.extend(readAndSort(file))
    mergedFile = merge(sortedData)
    deleteOldFiles(dataFiles)
    save(mergedFile)
```

## Real-world applications
- **Apache Cassandra**: Uses compaction strategies like Size-Tiered and Leveled Compaction to manage SSTables.
- **RocksDB**: Implements compaction to manage its LSM-tree structure, optimizing for both read and write performance.
- **Log-structured File Systems**: Employ compaction to reclaim space and improve read efficiency by reorganizing log segments.

## References
- [Apache Cassandra Documentation](https://cassandra.apache.org/doc/latest/architecture/storage_engine.html#compaction)
- [RocksDB Architecture Guide](https://github.com/facebook/rocksdb/wiki/RocksDB-Architecture-Guide)