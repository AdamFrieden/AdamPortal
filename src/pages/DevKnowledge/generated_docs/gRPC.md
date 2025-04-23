# gRPC

> gRPC is a high-performance, open-source RPC framework for connecting services efficiently across languages and platforms.

## Overview
gRPC, developed by Google, is a Remote Procedure Call (RPC) framework that facilitates communication between distributed systems. It leverages HTTP/2 for transport, Protocol Buffers for serialization, and provides features like authentication, load balancing, and more. It exists to enable efficient, scalable, and language-agnostic service-to-service communication.

## Core Idea / Mental Model
- gRPC abstracts the complexity of network communication, allowing developers to call methods on remote services as if they were local.
- It uses Protocol Buffers, a language-neutral, platform-neutral extensible mechanism for serializing structured data.

## Key Features & Benefits
- **High Performance**: Utilizes HTTP/2 for multiplexing, header compression, and low latency.
- **Cross-Language Support**: Supports multiple programming languages, making it versatile for polyglot environments.
- **Streaming**: Supports client, server, and bidirectional streaming.
- **Built-in Authentication**: Integrates with existing authentication systems.
- **Load Balancing and Resilience**: Offers built-in support for load balancing and retries.

## Trade-offs & Pitfalls
- **Complexity**: Requires understanding of Protocol Buffers and HTTP/2.
- **Limited Browser Support**: Direct browser support is limited, often requiring a proxy.
- **Overhead**: May introduce unnecessary complexity for simple use cases.

## When to Use / When to Avoid
- **Use**: When building microservices that require high performance, language interoperability, and streaming capabilities.
- **Avoid**: For simple, internal applications where REST might suffice, or when browser compatibility is a priority.

## Real-World Examples & Modern Alternatives
- **Examples**: Google Cloud services, Netflix's microservices architecture.
- **Alternatives**: REST, GraphQL, Apache Thrift.

## Common Misconceptions
- **Myth**: gRPC is only for Google-scale systems.
- **Reality**: It is suitable for any scale, provided the use case justifies its complexity.

## Related Topics
- Protocol Buffers
- HTTP/2
- RESTful APIs
- Microservices Architecture
- Service Mesh

## References
- [gRPC Official Documentation](https://grpc.io/docs/)
- [Google Cloud gRPC Overview](https://cloud.google.com/apis/design/design_patterns)