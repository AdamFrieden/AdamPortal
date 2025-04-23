# HTTP/2

> HTTP/2 is a major revision of the HTTP network protocol, designed to improve performance and efficiency.

## Overview
HTTP/2 is the second major version of the HTTP protocol, introduced to address the performance limitations of HTTP/1.1. It was developed to reduce latency, improve page load speed, and enhance the overall web experience by enabling more efficient use of network resources.

## Core Idea / Mental Model
- Multiplexing: Allows multiple requests and responses to be sent over a single TCP connection simultaneously.
- Header Compression: Reduces overhead by compressing HTTP headers.
- Server Push: Enables servers to send resources proactively to clients.

## Key Features & Benefits
- **Multiplexing**: Eliminates head-of-line blocking by allowing concurrent streams.
- **Header Compression**: Uses HPACK compression to minimize bandwidth usage.
- **Server Push**: Preemptively sends resources, reducing load times.
- **Stream Prioritization**: Allows prioritization of resource loading.
- **Binary Protocol**: More efficient parsing and reduced errors compared to text-based HTTP/1.1.

## Trade-offs & Pitfalls
- **Complexity**: More complex than HTTP/1.1, requiring careful implementation.
- **Compatibility**: Not all legacy systems support HTTP/2, requiring fallbacks.
- **TLS Requirement**: While not mandatory, most browsers require HTTP/2 over TLS.

## When to Use / When to Avoid
- **Use**: When optimizing for speed and efficiency in web applications, especially with high-latency networks.
- **Avoid**: In environments where legacy systems dominate or where HTTP/2 support is lacking.

## Real-World Examples & Modern Alternatives
- **Examples**: Most modern web browsers and servers like Apache, Nginx, and IIS support HTTP/2.
- **Alternatives**: HTTP/3, which uses QUIC for improved performance and security.

## Common Misconceptions
- **Myth**: HTTP/2 requires HTTPS.  
  **Fact**: While not required by the protocol, browsers enforce it.
- **Myth**: HTTP/2 is incompatible with HTTP/1.1.  
  **Fact**: HTTP/2 is designed to be backward compatible.

## Related Topics
- HTTP/1.1
- HTTP/3
- QUIC Protocol
- TLS/SSL
- Web Performance Optimization

## References
- [HTTP/2 - RFC 7540](https://tools.ietf.org/html/rfc7540)  
- [HTTP/2 Overview by MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview_of_HTTP)