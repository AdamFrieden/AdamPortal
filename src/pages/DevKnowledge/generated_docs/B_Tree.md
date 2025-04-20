# 🌳 B Tree

✅ **A B Tree is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.**

### 🧠 Core idea:
- B Trees are designed to work efficiently on storage systems that read and write large blocks of data.
- They maintain balance by ensuring that all leaf nodes are at the same depth, promoting efficient data retrieval.

### 📦 Key features:
- Nodes can have multiple children, more than two, unlike binary trees.
- The tree automatically adjusts its height and balance upon insertions and deletions.
- Ensures data is sorted and supports operations like search, insert, delete, and sequential access efficiently.

### 🔍 Example:
- Consider a B Tree of order 3 (each node can have at most 3 children). If you insert keys sequentially, the tree splits nodes as needed to maintain its properties, balancing itself automatically.

### 📊 Comparison:
- Compared to Binary Search Tree: B Trees handle large data sets more efficiently due to their balanced nature and ability to have multiple children per node.
- Compared to B+ Tree: B+ Trees have all values in the leaf nodes and are typically used in databases for their sequential access efficiency.

### 🚀 Real-world applications:
- Database and file systems use B Trees for indexing to allow quick data retrieval.
- They are employed in the implementation of multi-level indexing in databases.
- Used in filesystems like NTFS and ext4 to manage directory structures efficiently.