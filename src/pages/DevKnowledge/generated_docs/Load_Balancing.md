# Load Balancing

> Distributes network or application traffic across multiple servers to ensure reliability and performance.

## Overview
Load balancing is a technique used to distribute incoming network traffic across multiple servers. It exists to enhance the availability and reliability of applications by ensuring no single server becomes overwhelmed, which can lead to performance degradation or failure.

## Core Idea / Mental Model
- Distribute workload evenly across multiple resources to optimize resource use, maximize throughput, minimize response time, and avoid overload.
- Acts as a traffic cop sitting in front of your servers, routing client requests across all servers capable of fulfilling those requests.

## Key Features & Benefits
- **Scalability**: Easily add or remove servers to handle varying loads.
- **Redundancy**: Provides failover capabilities, ensuring high availability.
- **Performance**: Reduces response time by distributing requests efficiently.
- **Flexibility**: Supports various algorithms (round-robin, least connections, etc.) to suit different needs.

## Trade-offs & Pitfalls
- **Complexity**: Introduces additional components that need management and monitoring.
- **Cost**: Can increase infrastructure costs, especially with hardware load balancers.
- **Latency**: May introduce slight delays due to additional routing.

## When to Use / When to Avoid
- **Use**: When you need to ensure high availability, scalability, and reliability of applications.
- **Avoid**: For very small applications where a single server can handle all traffic efficiently.

## Real-World Examples & Modern Alternatives
- **Tools**: NGINX, HAProxy, AWS Elastic Load Balancing, Google Cloud Load Balancing.
- **Alternatives**: Content Delivery Networks (CDNs) for static content, serverless architectures for dynamic scaling.

## Common Misconceptions
- **Myth**: Load balancing is only for large-scale applications.
- **Reality**: It can benefit applications of various sizes by improving reliability and performance.

## Related Topics
- **Horizontal Scaling**: Adding more servers to handle increased load.
- **Fault Tolerance**: Designing systems to continue operating despite failures.
- **Microservices Architecture**: Structuring applications as a collection of loosely coupled services.
- **Content Delivery Networks (CDNs)**: Distributing content to improve load times.
- **Reverse Proxy**: Forwarding client requests to backend servers.

## References
- [NGINX Load Balancing](https://www.nginx.com/resources/glossary/load-balancing/)  
- [AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/)