# gRPC vs REST

> gRPC and REST are communication protocols for APIs, each with unique strengths suited to different use cases.

## Overview
gRPC (Google Remote Procedure Call) and REST (Representational State Transfer) are two popular protocols for building APIs. REST, based on HTTP/1.1, is widely used for its simplicity and stateless nature. gRPC, developed by Google, leverages HTTP/2 and Protocol Buffers for efficient, high-performance communication, particularly in microservices architectures.

## Core Idea / Mental Model
- REST: Resource-oriented, using standard HTTP methods (GET, POST, PUT, DELETE) to manipulate resources.
- gRPC: Service-oriented, defining services and methods using Protocol Buffers for serialization, enabling efficient binary communication.

## Key Features & Benefits
- **REST:**
  - Human-readable JSON format.
  - Broad browser and tool support.
  - Stateless operations simplify scaling.
- **gRPC:**
  - HTTP/2 support for multiplexing and bidirectional streaming.
  - Strongly-typed contracts with Protocol Buffers.
  - Built-in code generation for multiple languages.

## Trade-offs & Pitfalls
- **REST:**
  - Verbose payloads due to JSON.
  - Limited to HTTP/1.1 features.
- **gRPC:**
  - Steeper learning curve with Protocol Buffers.
  - Limited browser support without additional tools like gRPC-Web.

## When to Use / When to Avoid
- **Use gRPC:** When performance and efficiency are critical, especially in microservices or when streaming is needed.
- **Use REST:** For public APIs, simple CRUD operations, or when broad compatibility is required.

## Real-World Examples & Modern Alternatives
- **gRPC:** Used by companies like Netflix and Square for internal microservices.
- **REST:** Common in public APIs like Twitter and GitHub.
- **Alternatives:** GraphQL for flexible queries, WebSockets for real-time communication.

## Common Misconceptions
- REST is not inherently slower than gRPC; it depends on use case and implementation.
- gRPC is not limited to Google environments; it is open-source and widely adopted.

## Related Topics
- HTTP/2
- Protocol Buffers
- Microservices Architecture
- GraphQL
- WebSockets

## References
- [gRPC Official Documentation](https://grpc.io/docs/)
- [REST Architectural Style](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)