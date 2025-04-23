# Latency vs Throughput

> Latency and throughput are key performance metrics that define system responsiveness and capacity.

## Overview
Latency refers to the time it takes for a single operation to complete, while throughput measures how many operations a system can handle over a given period. Understanding these metrics is crucial for optimizing system performance and user experience.

## Core Idea / Mental Model
- **Latency**: Think of latency as the delay before a car starts moving after the light turns green.
- **Throughput**: Consider throughput as the number of cars passing through an intersection per hour.

## Key Features & Benefits
- **Latency**:
  - Critical for real-time applications where immediate response is necessary.
  - Directly impacts user experience, especially in interactive systems.
- **Throughput**:
  - Essential for batch processing and high-volume data systems.
  - Determines the system's capacity to handle concurrent operations.

## Trade-offs & Pitfalls
- **Latency**:
  - Reducing latency often requires more resources or complex optimizations.
  - Over-optimizing for latency can lead to underutilized system capacity.
- **Throughput**:
  - High throughput can lead to increased latency if not managed properly.
  - Focusing solely on throughput may degrade the user experience in interactive applications.

## When to Use / When to Avoid
- **Use Latency**:
  - When responsiveness is critical, such as in gaming or financial trading systems.
- **Use Throughput**:
  - When processing large volumes of data, like in data analytics or streaming services.
- **Avoid**:
  - Prioritizing one without considering the impact on the other can lead to suboptimal performance.

## Real-World Examples & Modern Alternatives
- **Latency-focused**: Content Delivery Networks (CDNs) reduce latency by caching content closer to users.
- **Throughput-focused**: Apache Kafka is designed for high-throughput message processing.
- **Alternatives**: Consider using load balancers to optimize both latency and throughput.

## Common Misconceptions
- **Myth**: High throughput always means low latency.
- **Myth**: Reducing latency will automatically improve throughput.

## Related Topics
- Load Balancing
- Scalability
- Network Bandwidth
- Caching Strategies
- Real-time Processing

## References
- [Latency vs Throughput](https://www.cloudflare.com/learning/performance/glossary/latency-vs-throughput/)  
- [Understanding Latency and Throughput](https://aws.amazon.com/architecture/well-architected/)