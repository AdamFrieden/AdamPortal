# Data Structures for Storage & Indexing

> Effective data storage and indexing are crucial for optimizing data retrieval and management in software systems. Understanding the right data structures can significantly enhance performance and scalability.

## Core idea
- Data structures for storage and indexing are designed to efficiently organize, store, and retrieve data.
- They are foundational for databases, file systems, and memory management, impacting speed and resource utilization.
- Key structures include arrays, linked lists, trees, hash tables, and B-trees, each with unique strengths.

## Key features
- **Arrays**: Fast access via indices, but fixed size and costly insertions/deletions.
- **Linked Lists**: Dynamic size and efficient insertions/deletions, but slower access times.
- **Trees (e.g., Binary Search Trees, AVL Trees)**: Hierarchical data representation, efficient searching, and sorting.
- **Hash Tables**: Fast average-time complexity for lookups, insertions, and deletions, but can suffer from collisions.
- **B-trees**: Balanced tree structure ideal for databases and file systems, optimized for systems that read and write large blocks of data.

## Why / When / How
- Use **arrays** when data size is known and fast access is needed.
- Opt for **linked lists** when frequent insertions/deletions are required.
- **Trees** are suitable for hierarchical data and when balanced search times are needed.
- **Hash tables** are ideal for scenarios requiring fast lookups, but avoid them if collision handling becomes complex.
- **B-trees** are preferred in database indexing due to their ability to handle large datasets efficiently.

- Avoid using complex structures like trees and hash tables for small datasets where simpler structures suffice.
- Be cautious of memory overhead and complexity when implementing custom data structures.

## Example / Walk-through
```pseudo
# Example of a simple hash table insertion
function insert(hashTable, key, value):
    index = hashFunction(key)
    if hashTable[index] is empty:
        hashTable[index] = (key, value)
    else:
        # Handle collision (e.g., chaining)
        append(hashTable[index], (key, value))
```

## Real-world applications
- **Databases**: B-trees are extensively used in database indexing systems like MySQL and PostgreSQL.
- **File Systems**: File systems like NTFS and ext4 use B-trees for directory indexing.
- **Caching**: Hash tables are used in caching mechanisms for fast data retrieval, such as in web browsers and memory caches.

## References
- [Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/)
- [PostgreSQL Documentation on Indexes](https://www.postgresql.org/docs/current/indexes.html)