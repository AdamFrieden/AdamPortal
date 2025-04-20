# Hash Table

> Hash tables are a fundamental data structure that provide efficient key-value pair storage and retrieval, crucial for optimizing performance in various applications.

## Core idea
- A hash table is a data structure that maps keys to values using a hash function.
- The hash function computes an index into an array of buckets or slots, from which the desired value can be found.
- It offers average-case time complexity of O(1) for search, insert, and delete operations, making it highly efficient for large datasets.
- Hash tables are essential for implementing associative arrays, database indexing, caches, and sets.

## Key features
- **Efficiency**: Provides constant time complexity for average-case operations.
- **Dynamic resizing**: Can dynamically resize to maintain performance as the number of elements grows.
- **Collision handling**: Uses techniques like chaining or open addressing to handle hash collisions.
- **Versatility**: Supports a wide range of applications, from simple data storage to complex caching mechanisms.

## Why / When / How
- **Why use it**: Ideal for scenarios requiring fast data retrieval, such as caching, database indexing, and implementing dictionaries.
- **When to use it**: When you need efficient key-based access to data and can tolerate some overhead for collision resolution.
- **Common pitfalls**: 
  - Poorly designed hash functions can lead to excessive collisions, degrading performance.
  - Hash tables are not suitable for ordered data retrieval; consider balanced trees for such use cases.
  - Memory overhead can be significant due to the need for resizing and collision handling.

## Example / Walk-through
```pseudo
# Simple hash table implementation using chaining for collision resolution

class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def hash_function(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        index = self.hash_function(key)
        for pair in self.table[index]:
            if pair[0] == key:
                pair[1] = value
                return
        self.table[index].append([key, value])

    def retrieve(self, key):
        index = self.hash_function(key)
        for pair in self.table[index]:
            if pair[0] == key:
                return pair[1]
        return None

# Usage
hash_table = HashTable(10)
hash_table.insert("key1", "value1")
value = hash_table.retrieve("key1")
```

## Real-world applications
- **Caching**: Used in web browsers and servers to store frequently accessed data for quick retrieval.
- **Database indexing**: Provides fast access to records in databases by mapping keys to data locations.
- **Symbol tables**: Used in compilers and interpreters to store variable and function names.
- **Load balancing**: Distributes requests across multiple servers using consistent hashing.

## References
- [Introduction to Algorithms, 3rd Edition by Cormen, Leiserson, Rivest, and Stein](https://mitpress.mit.edu/9780262033848/introduction-to-algorithms/)
- [Hash Tables - GeeksforGeeks](https://www.geeksforgeeks.org/hashing-data-structure/)