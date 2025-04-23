# Envoy

> Envoy is a high-performance, open-source edge and service proxy designed for cloud-native applications.

## Overview
Envoy is a Layer 7 proxy and communication bus designed for large modern service-oriented architectures. It was created to address the challenges of managing microservices, such as service discovery, load balancing, and observability, with a focus on resilience and performance.

## Core Idea / Mental Model
- Envoy acts as a transparent proxy that handles all incoming and outgoing traffic for services, providing advanced traffic management and observability.
- It operates at the application layer (Layer 7), enabling it to make intelligent routing decisions based on HTTP/2 and gRPC protocols.

## Key Features & Benefits
- **Service Discovery**: Automatically discovers services and routes traffic accordingly.
- **Load Balancing**: Supports advanced load balancing strategies, including automatic retries and circuit breaking.
- **Observability**: Provides rich metrics, logging, and tracing capabilities to monitor and debug service interactions.
- **Security**: Offers TLS termination, mTLS for secure service-to-service communication, and authentication/authorization features.
- **Extensibility**: Highly configurable with support for dynamic configuration updates and extensible via filters.

## Trade-offs & Pitfalls
- **Complexity**: Can introduce additional complexity in configuration and management, especially in large deployments.
- **Resource Overhead**: May increase resource consumption due to its extensive feature set.
- **Learning Curve**: Requires a solid understanding of networking and proxy concepts to leverage effectively.

## When to Use / When to Avoid
- **Use**: In microservices architectures requiring advanced traffic management, observability, and security features.
- **Avoid**: In simple applications where a lightweight proxy or load balancer suffices, or where resource constraints are critical.

## Real-World Examples & Modern Alternatives
- **Examples**: Lyft, where Envoy originated, uses it extensively for service-to-service communication.
- **Alternatives**: Istio (service mesh), NGINX (web server and reverse proxy), HAProxy (high-performance TCP/HTTP load balancer).

## Common Misconceptions
- **"Envoy is only for microservices"**: While optimized for microservices, it can be used in any architecture needing advanced proxy features.
- **"Envoy replaces all other proxies"**: Envoy complements existing proxies and load balancers, not necessarily replacing them.

## Related Topics
- Service Mesh
- gRPC
- HTTP/2
- Load Balancing
- Observability

## References
- [Envoy Official Documentation](https://www.envoyproxy.io/docs/envoy/latest/)
- [CNCF Envoy Project Page](https://www.cncf.io/projects/envoy/)