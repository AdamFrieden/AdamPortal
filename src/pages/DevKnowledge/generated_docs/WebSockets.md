# WebSockets

> WebSockets enable full-duplex communication channels over a single TCP connection for real-time data exchange.

## Overview
WebSockets are a protocol designed to facilitate two-way interactive communication between a client and a server. Unlike traditional HTTP, which is request-response based, WebSockets allow for persistent connections, enabling real-time data transfer. This protocol is particularly useful for applications requiring frequent updates, such as live chat, gaming, and financial tickers.

## Core Idea / Mental Model
- WebSockets establish a persistent connection that allows data to flow freely in both directions, reducing latency and overhead compared to HTTP polling.
- Once a WebSocket connection is established, it remains open, allowing for continuous data exchange without the need for repeated HTTP requests.

## Key Features & Benefits
- **Full-Duplex Communication**: Enables simultaneous two-way data exchange.
- **Reduced Latency**: Eliminates the need for repeated HTTP requests, minimizing delay.
- **Efficient Resource Usage**: Maintains a single connection, reducing server load and bandwidth usage.
- **Real-Time Updates**: Ideal for applications requiring instant data synchronization.

## Trade-offs & Pitfalls
- **Complexity**: Implementing WebSockets can be more complex than traditional HTTP.
- **Scalability**: Managing a large number of persistent connections can be challenging.
- **Security**: Requires careful handling to avoid vulnerabilities like cross-site WebSocket hijacking.

## When to Use / When to Avoid
- **Use**: When real-time data exchange is critical, such as in live chat, collaborative applications, or live sports updates.
- **Avoid**: For simple, infrequent data requests where HTTP polling or REST APIs suffice.

## Real-World Examples & Modern Alternatives
- **Examples**: Slack, online multiplayer games, stock trading platforms.
- **Alternatives**: Server-Sent Events (SSE) for unidirectional updates, HTTP/2 for multiplexing streams over a single connection.

## Common Misconceptions
- **WebSockets are not HTTP**: They start as an HTTP handshake but upgrade to a different protocol.
- **Not inherently secure**: WebSockets require additional security measures beyond HTTPS.

## Related Topics
- HTTP/2
- Server-Sent Events (SSE)
- REST APIs
- Long Polling
- MQTT

## References
- [MDN WebSockets Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)  
- [RFC 6455 - The WebSocket Protocol](https://tools.ietf.org/html/rfc6455)