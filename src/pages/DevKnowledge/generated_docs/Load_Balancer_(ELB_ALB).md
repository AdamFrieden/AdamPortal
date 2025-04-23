# Load Balancer (ELB / ALB)

> Load balancers distribute incoming network traffic across multiple servers to ensure reliability and performance.

## Overview
Load balancers, such as AWS Elastic Load Balancer (ELB) and Application Load Balancer (ALB), are critical components in modern distributed systems. They manage incoming traffic by distributing it across multiple backend servers, ensuring no single server becomes a bottleneck. This enhances application availability, fault tolerance, and scalability.

## Core Idea / Mental Model
- **Traffic Distribution**: Spread incoming requests evenly across multiple servers.
- **High Availability**: Automatically reroute traffic from unhealthy servers to healthy ones.
- **Scalability**: Seamlessly integrate with auto-scaling groups to handle varying loads.

## Key Features & Benefits
- **Health Checks**: Continuously monitor server health and route traffic only to healthy instances.
- **SSL Termination**: Offload SSL decryption to the load balancer, reducing server load.
- **Sticky Sessions**: Maintain session persistence by directing requests from the same client to the same server.
- **Layer 7 Routing (ALB)**: Route traffic based on content, such as URL paths or headers.

## Trade-offs & Pitfalls
- **Configuration Complexity**: Misconfigurations can lead to uneven traffic distribution or downtime.
- **Latency**: Introducing a load balancer can add slight latency to request processing.
- **Cost**: Additional infrastructure costs, especially with high traffic volumes.

## When to Use / When to Avoid
- **Use When**: You need to distribute traffic across multiple servers for high availability and scalability.
- **Avoid When**: Your application is simple, with minimal traffic, or when latency is a critical concern.

## Real-World Examples & Modern Alternatives
- **AWS ELB/ALB**: Widely used in cloud environments for load balancing.
- **NGINX**: A popular open-source alternative for load balancing and reverse proxying.
- **Kubernetes Ingress**: Manages external access to services in a Kubernetes cluster.

## Common Misconceptions
- **"Load balancers eliminate all downtime"**: They improve availability but can't prevent downtime from all causes.
- **"One size fits all"**: Different applications may require different types of load balancers (e.g., network vs. application layer).

## Related Topics
- Auto Scaling
- Reverse Proxy
- DNS Load Balancing
- Microservices Architecture
- Network Security

## References
- [AWS Elastic Load Balancing Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)  
- [NGINX Load Balancing](https://www.nginx.com/resources/glossary/load-balancing/)