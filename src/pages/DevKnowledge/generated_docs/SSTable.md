# 📄 SSTable

✅ **SSTable (Sorted String Table) is a file format used to store large data sets efficiently in a sorted order, commonly utilized in NoSQL databases like Apache Cassandra.**

### 🧠 Core idea:
- SSTables store data in a sorted sequence of key-value pairs.
- They are immutable, meaning once written, they cannot be altered, which simplifies data management and improves performance.

### 📦 Key features:
- **Sorted Order:** Facilitates quick read operations through binary search.
- **Immutability:** Enhances write performance and simplifies data compaction.
- **Efficient Merging:** Multiple SSTables can be merged without re-sorting.

### 🔍 Example:
- Consider a database storing user information. SSTables would store user IDs (keys) and user details (values) in sorted order, allowing efficient retrieval and merging of user data.

### 📊 Comparison:
- Compared to **Log-structured Merge-trees (LSM-trees):** SSTables are components of LSM-trees, providing the sorted structure needed for efficient merges and queries.
- Compared to **B-trees:** SSTables are immutable and more write-optimized, while B-trees allow in-place updates and are more read-optimized.

### 🚀 Real-world applications:
- **Cassandra:** Utilizes SSTables for efficient data storage and retrieval.
- **Bigtable:** Google's storage system that inspired the SSTable format.
- **HBase:** An open-source implementation of Bigtable that uses SSTables for its underlying storage.