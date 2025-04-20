# Cache Replacement Algorithms

> Cache replacement algorithms are critical for optimizing cache performance by determining which items to evict when the cache is full. Understanding these algorithms helps in designing systems that efficiently manage memory and improve application performance.

## Core idea
- **Purpose**: Cache replacement algorithms decide which data to remove from the cache to make room for new data.
- **Importance**: Efficient cache management reduces latency and improves system performance by ensuring frequently accessed data is readily available.
- **Types**: Common algorithms include Least Recently Used (LRU), First-In-First-Out (FIFO), and Least Frequently Used (LFU).

## Key features
- **LRU (Least Recently Used)**: Evicts the least recently accessed items. Suitable for workloads with temporal locality.
- **FIFO (First-In-First-Out)**: Removes the oldest items. Simple but may not always be optimal for performance.
- **LFU (Least Frequently Used)**: Discards items used least often. Effective for workloads with stable access patterns.
- **Adaptive Algorithms**: Combine multiple strategies to dynamically adjust based on workload characteristics.

## Why / When / How
- **Why**: To maintain high cache hit rates and minimize access time to frequently used data.
- **When**: Use when system performance is critical, and memory resources are limited.
- **How**: Choose based on access patterns; LRU for recency, LFU for frequency, FIFO for simplicity.
- **Pitfalls**: Overhead in maintaining access history (LRU, LFU), suboptimal performance in certain access patterns (FIFO).

## Example / Walk-through
```pseudo
# LRU Cache Pseudocode
initialize cache with max_size
function access(item):
    if item in cache:
        move item to front of cache
    else:
        if cache is full:
            remove least recently used item
        add item to front of cache
```

## Real-world applications
- **Web Browsers**: Use LRU to cache web pages and resources.
- **Database Systems**: Employ various algorithms to manage buffer pools.
- **Operating Systems**: Use page replacement algorithms to manage virtual memory.

## References
- [Cache Replacement Policies](https://en.wikipedia.org/wiki/Cache_replacement_policies) - Wikipedia
- [Understanding Cache Algorithms](https://www.cs.cmu.edu/~./guyb/realworld/cache_algorithms.pdf) - Carnegie Mellon University