# Caching & Performance

> **Caching is a technique to store frequently accessed data temporarily to improve system performance by reducing data retrieval times.**

## Core Idea
- **Purpose**: Caching reduces latency and improves throughput by storing copies of data closer to the requester.
- **Efficiency**: Minimizes the need for repeated data fetching from slower storage layers.
- **Scalability**: Helps systems handle more load by offloading repeated requests from primary data sources.

## Key Features
- **Data Locality**: Stores data closer to the application or user, reducing access time.
- **Temporal Locality**: Takes advantage of the fact that recently accessed data is likely to be accessed again soon.
- **Spatial Locality**: Caches data that is near other recently accessed data.
- **Expiration Policies**: Uses strategies like TTL (Time-To-Live) to manage cache validity.
- **Eviction Policies**: Implements strategies like LRU (Least Recently Used) to manage cache size.

## Why / When / How
- **Why**: To enhance performance by reducing latency and load on backend systems.
- **When**: Use when data retrieval is a bottleneck, and data changes infrequently.
- **How**: Implement caching at various levels (e.g., client-side, server-side, database) using tools like Redis, Memcached, or CDN caches.
- **Pitfalls**: 
  - **Staleness**: Cached data may become outdated.
  - **Complexity**: Adds complexity in cache invalidation and consistency.
  - **Overhead**: Improper use can lead to memory bloat and increased maintenance.

## Example / Walk-through
```pseudo
# Pseudo-code for a simple caching mechanism
cache = {}

def get_data(key):
    if key in cache:
        return cache[key]  # Return cached data
    else:
        data = fetch_from_database(key)  # Fetch from source
        cache[key] = data  # Store in cache
        return data

# Example of cache eviction
if len(cache) > MAX_CACHE_SIZE:
    evict_least_recently_used_item()
```

## Real-world Applications
- **Web Browsers**: Cache static resources like images and scripts to speed up page loads.
- **Content Delivery Networks (CDNs)**: Cache content at edge locations to reduce latency for users.
- **Database Systems**: Use in-memory caches to reduce database query load.
- **APIs**: Cache API responses to improve response times and reduce server load.

## References
- [Caching Overview - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Redis Documentation](https://redis.io/documentation)