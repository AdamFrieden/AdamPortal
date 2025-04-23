# REST

> REST (Representational State Transfer) is an architectural style for designing networked applications using stateless communication.

## Overview
REST is an architectural style that defines a set of constraints for creating scalable web services. It was introduced by Roy Fielding in his 2000 doctoral dissertation to leverage the existing capabilities of the HTTP protocol, making web services more efficient and easier to maintain.

## Core Idea / Mental Model
- RESTful services use HTTP methods explicitly: GET, POST, PUT, DELETE.
- Stateless interactions: Each request from client to server must contain all the information needed to understand and process the request.
- Resources are identified by URIs, and representations of these resources are transferred between client and server.

## Key Features & Benefits
- **Scalability**: Statelessness and cacheable responses enhance scalability.
- **Simplicity**: Leverages standard HTTP methods and status codes.
- **Interoperability**: Language-agnostic, promoting broad compatibility.
- **Flexibility**: Allows for various data formats (e.g., JSON, XML).

## Trade-offs & Pitfalls
- **Overhead**: HTTP can introduce overhead compared to binary protocols.
- **Statelessness**: Can lead to increased complexity in managing state across requests.
- **Caching Complexity**: Requires careful design to ensure cacheability without stale data.

## When to Use / When to Avoid
- **Use**: When building web APIs that need to be scalable, stateless, and easily consumed by various clients.
- **Avoid**: For real-time applications requiring persistent connections (consider WebSockets) or when performance is critical and overhead must be minimized (consider gRPC).

## Real-World Examples & Modern Alternatives
- **Examples**: GitHub API, Twitter API, Google Maps API.
- **Alternatives**: GraphQL for flexible queries, gRPC for efficient binary communication.

## Common Misconceptions
- REST is not a protocol but an architectural style.
- REST does not mandate JSON; it supports multiple formats.

## Related Topics
- HTTP/2 and HTTP/3
- GraphQL
- gRPC
- WebSockets
- API Gateway

## References
- [Roy Fielding's Dissertation on REST](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)  
- [REST API Tutorial](https://restfulapi.net/)