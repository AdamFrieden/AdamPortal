# Long Polling

> Long Polling is a technique for maintaining a persistent connection to receive updates from a server without constant polling.

## Overview
Long Polling is a web communication pattern used to simulate a real-time connection between a client and a server. It exists to overcome the limitations of traditional polling by reducing unnecessary network traffic and latency.

## Core Idea / Mental Model
- The client sends a request to the server and waits for a response.
- The server holds the request open until new data is available or a timeout occurs.
- Once the server responds, the client immediately sends a new request to maintain the connection.

## Key Features & Benefits
- Reduces server load compared to traditional polling by minimizing the number of requests.
- Provides near real-time data updates without the need for WebSockets.
- Simpler to implement than WebSockets in environments where full-duplex communication is not required.

## Trade-offs & Pitfalls
- Increased latency compared to WebSockets due to the request-response cycle.
- Can lead to resource exhaustion if not properly managed, especially with high user concurrency.
- Not suitable for very low-latency applications or high-frequency updates.

## When to Use / When to Avoid
- **Use**: When you need real-time updates but cannot use WebSockets due to infrastructure constraints.
- **Avoid**: For applications requiring very low latency or high-frequency updates, such as gaming or live trading platforms.

## Real-World Examples & Modern Alternatives
- **Examples**: Chat applications, notification systems.
- **Alternatives**: WebSockets for full-duplex communication, Server-Sent Events (SSE) for unidirectional updates.

## Common Misconceptions
- Long Polling is not the same as WebSockets; it does not provide a true persistent connection.
- It is not inherently more efficient than WebSockets; efficiency depends on the use case and implementation.

## Related Topics
- WebSockets
- Server-Sent Events (SSE)
- HTTP/2
- AJAX
- RESTful APIs

## References
- [Mozilla Developer Network: Long Polling](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [Google Developers: Comet Techniques](https://developers.google.com/web/fundamentals/primers/server-sent-events)