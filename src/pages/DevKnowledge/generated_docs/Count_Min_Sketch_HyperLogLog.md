# Count Min Sketch / HyperLogLog

> **Count Min Sketch and HyperLogLog are probabilistic data structures used for approximating frequency counts and cardinality estimation in large datasets, offering space-efficient solutions with trade-offs in accuracy.**

## Core idea
- **Count Min Sketch (CMS):** A probabilistic data structure that provides approximate frequency counts of elements in a data stream using hash functions and a 2D array. It is space-efficient and allows for quick updates and queries.
- **HyperLogLog (HLL):** A probabilistic algorithm for estimating the cardinality (number of distinct elements) of a multiset. It uses hash functions and a fixed-size array to maintain a compact representation of the data.

## Key features
- **CMS:**
  - Space-efficient with sub-linear memory usage relative to the number of elements.
  - Provides approximate frequency counts with a tunable error rate.
  - Supports merge operations, allowing distributed systems to combine results.
- **HLL:**
  - Extremely space-efficient for cardinality estimation, typically using only a few kilobytes.
  - Offers a trade-off between accuracy and memory usage, configurable via precision parameters.
  - Suitable for distributed systems due to its mergeability.

## Why / When / How
- **Use CMS when:**
  - You need to track frequency counts in streaming data with limited memory.
  - Exact counts are not necessary, and a small error margin is acceptable.
- **Use HLL when:**
  - Estimating the number of unique elements in large datasets.
  - Memory constraints are a concern, and exact counts are not critical.
- **Common pitfalls:**
  - CMS can overestimate counts due to hash collisions, especially with high error rates.
  - HLL may not be suitable for small datasets where exact counts are feasible.
  - Both structures require careful selection of hash functions to minimize errors.

## Example / Walk-through
```pseudo
# Count Min Sketch example
initialize CMS with width w and depth d
for each element e in stream:
    for each hash function h_i:
        increment CMS[h_i(e) % w][i]

# Query frequency of element e
min(CMS[h_i(e) % w][i] for each i)

# HyperLogLog example
initialize HLL with precision p
for each element e in stream:
    hash_value = hash(e)
    index = hash_value >> (32 - p)
    leading_zeros = count_leading_zeros(hash_value & ((1 << (32 - p)) - 1))
    update HLL[index] with max(leading_zeros)

# Estimate cardinality
alpha = 0.7213 / (1 + 1.079 / (1 << p))
Z = 1 / sum(2^(-HLL[i]) for each i)
cardinality = alpha * (1 << p)^2 * Z
```

## Real-world applications
- **CMS:**
  - Network traffic analysis for detecting heavy hitters.
  - Real-time analytics in advertising platforms to track ad impressions.
- **HLL:**
  - Estimating unique visitors on web platforms.
  - Database systems for optimizing query plans based on cardinality estimates.

## References
- [Count-Min Sketch: An Algorithm for Approximate Frequency Counts](https://www.eecs.harvard.edu/~michaelm/CS222/countmin.pdf)
- [HyperLogLog in Practice: Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm](http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf)