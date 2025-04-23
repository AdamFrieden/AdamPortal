# HTTP/3

> HTTP/3 is the latest version of the HTTP protocol, designed to improve web performance and reliability using QUIC.

## Overview
HTTP/3 is the third major version of the Hypertext Transfer Protocol, developed to address latency and connection reliability issues inherent in HTTP/2. It leverages the QUIC transport protocol, which operates over UDP, to provide faster and more secure web communications.

## Core Idea / Mental Model
- HTTP/3 uses QUIC, a transport layer network protocol, to reduce latency and improve connection reliability.
- It eliminates head-of-line blocking by multiplexing streams over a single connection.

## Key Features & Benefits
- **Reduced Latency**: Faster connection establishment with 0-RTT and 1-RTT handshakes.
- **Improved Reliability**: Resilient to packet loss due to independent stream multiplexing.
- **Enhanced Security**: Built-in encryption similar to TLS, improving security.
- **Better Performance**: Optimized for mobile and high-latency networks.

## Trade-offs & Pitfalls
- **UDP Dependency**: Requires network infrastructure that supports UDP, which may not be universally available.
- **Complexity**: More complex to implement and debug compared to HTTP/1.1 and HTTP/2.
- **Adoption**: Still in the early stages of adoption, with varying levels of support across browsers and servers.

## When to Use / When to Avoid
- **Use**: For applications requiring low latency and high reliability, especially in mobile or lossy network environments.
- **Avoid**: In environments where UDP is blocked or not well-supported, or where simplicity is prioritized over performance.

## Real-World Examples & Modern Alternatives
- **Examples**: Google services, Facebook, and other major web platforms are adopting HTTP/3.
- **Alternatives**: HTTP/2 for environments where UDP is not feasible; HTTP/1.1 for simplicity.

## Common Misconceptions
- **Myth**: HTTP/3 is just a minor update to HTTP/2.
- **Myth**: HTTP/3 requires a complete overhaul of existing web infrastructure.

## Related Topics
- QUIC Protocol
- HTTP/2
- TLS (Transport Layer Security)
- UDP (User Datagram Protocol)
- Network Latency

## References
- [HTTP/3 Explained by Cloudflare](https://www.cloudflare.com/learning/performance/what-is-http3/)
- [QUIC, a multiplexed stream transport over UDP](https://datatracker.ietf.org/doc/html/rfc9000)