# Vertical vs Horizontal Scaling

> Vertical scaling adds resources to a single node, while horizontal scaling adds more nodes to a system.

## Overview
Vertical and horizontal scaling are strategies to handle increased load and improve performance in software systems. Vertical scaling (scaling up) involves adding more power (CPU, RAM) to an existing server, whereas horizontal scaling (scaling out) involves adding more servers to distribute the load.

## Core Idea / Mental Model
- **Vertical Scaling**: Enhance the capacity of a single machine.
- **Horizontal Scaling**: Increase the number of machines to share the load.

## Key Features & Benefits
- **Vertical Scaling**:
  - Simplicity: Easier to implement as it involves upgrading existing hardware.
  - Consistency: Maintains a single system image.
- **Horizontal Scaling**:
  - Flexibility: Can handle larger loads by adding more servers.
  - Fault Tolerance: Improved redundancy and availability.

## Trade-offs & Pitfalls
- **Vertical Scaling**:
  - Limited by hardware constraints.
  - Potentially higher costs for high-end hardware.
- **Horizontal Scaling**:
  - Complexity in managing distributed systems.
  - Requires changes in application architecture to handle distributed data.

## When to Use / When to Avoid
- **Use Vertical Scaling** when:
  - Simplicity is a priority.
  - The application is not designed for distributed systems.
- **Use Horizontal Scaling** when:
  - Scalability and fault tolerance are critical.
  - The application can be distributed across multiple nodes.

## Real-World Examples & Modern Alternatives
- **Vertical Scaling**: Upgrading a database server with more RAM and CPUs.
- **Horizontal Scaling**: Using Kubernetes to manage a cluster of containerized applications.
- **Modern Alternatives**: Cloud services like AWS Auto Scaling, Google Cloud's Kubernetes Engine.

## Common Misconceptions
- Vertical scaling is not always cheaper; high-end hardware can be costly.
- Horizontal scaling does not automatically solve all performance issues; it requires proper architecture.

## Related Topics
- Load Balancing
- Microservices Architecture
- Cloud Computing
- Distributed Systems
- Containerization

## References
- [AWS Scaling Guide](https://aws.amazon.com/autoscaling/)
- [Google Cloud Scalability](https://cloud.google.com/solutions/scalable-and-resilient-apps)