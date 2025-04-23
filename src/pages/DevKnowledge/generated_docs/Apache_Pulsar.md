# Apache Pulsar

> Apache Pulsar is a cloud-native, distributed messaging and streaming platform designed for scalability and low latency.

## Overview
Apache Pulsar is an open-source messaging system that provides a unified solution for both real-time and batch data processing. It was developed to address the limitations of existing messaging systems by offering a scalable, multi-tenant architecture with strong consistency guarantees.

## Core Idea / Mental Model
- Pulsar decouples message storage from message serving, allowing for independent scaling.
- It uses a segment-based storage architecture, leveraging Apache BookKeeper for durable message storage.

## Key Features & Benefits
- **Multi-Tenancy**: Supports multiple tenants with isolated namespaces.
- **Geo-Replication**: Built-in support for replicating messages across data centers.
- **Scalability**: Seamlessly scales horizontally to handle high throughput.
- **Low Latency**: Optimized for low-latency message delivery.
- **Flexible Messaging Models**: Supports both publish-subscribe and queue-based messaging patterns.

## Trade-offs & Pitfalls
- **Complexity**: Initial setup and configuration can be complex compared to simpler systems.
- **Operational Overhead**: Requires careful management of BookKeeper nodes and Pulsar brokers.
- **Learning Curve**: Steeper learning curve for teams unfamiliar with distributed systems.

## When to Use / When to Avoid
- **Use**: When you need a scalable, multi-tenant messaging system with strong consistency and geo-replication.
- **Avoid**: For simple use cases where a lightweight message broker like RabbitMQ or Kafka suffices.

## Real-World Examples & Modern Alternatives
- **Examples**: Used by Yahoo, Tencent, and Splunk for real-time analytics and data processing.
- **Alternatives**: Apache Kafka, RabbitMQ, Amazon Kinesis.

## Common Misconceptions
- **Myth**: Pulsar is just another Kafka clone.
  - **Fact**: Pulsar offers unique features like multi-tenancy and geo-replication.
- **Myth**: Pulsar is only for large-scale applications.
  - **Fact**: It can be used for smaller applications but shines in large-scale deployments.

## Related Topics
- Apache Kafka
- Apache BookKeeper
- Distributed Systems
- Real-Time Data Processing
- Event Streaming

## References
- [Apache Pulsar Official Documentation](https://pulsar.apache.org/docs/en/standalone/)
- [Apache Pulsar GitHub Repository](https://github.com/apache/pulsar)