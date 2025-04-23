# Server-Sent Events

> Server-Sent Events (SSE) enable efficient server-to-client streaming of real-time updates over HTTP.

## Overview
Server-Sent Events (SSE) is a server push technology that allows a server to send real-time updates to a client over a single, long-lived HTTP connection. It is designed to provide a simple and efficient way to push data from the server to the client without the need for complex protocols or frequent polling.

## Core Idea / Mental Model
- SSE uses a single, persistent HTTP connection to stream updates from the server to the client.
- It is unidirectional: data flows from the server to the client only.
- Built on top of standard HTTP, making it easy to implement and compatible with existing web infrastructure.

## Key Features & Benefits
- **Simplicity**: Easy to implement with minimal setup and no need for additional libraries.
- **Efficiency**: Reduces the overhead of establishing multiple connections or frequent polling.
- **Automatic Reconnection**: Clients automatically attempt to reconnect if the connection is lost.
- **Text-Based**: Data is sent as plain text, making it easy to debug and monitor.

## Trade-offs & Pitfalls
- **Unidirectional**: Does not support client-to-server communication; use WebSockets if bidirectional communication is needed.
- **Limited Browser Support**: While widely supported, some older browsers may not fully support SSE.
- **Scalability**: Managing many open connections can be challenging for servers not optimized for SSE.

## When to Use / When to Avoid
- **Use**: When you need to push real-time updates from the server to the client, such as live news feeds or stock price updates.
- **Avoid**: When bidirectional communication is required or when targeting environments with limited SSE support.

## Real-World Examples & Modern Alternatives
- **Examples**: Live sports scores, social media feeds, and collaborative document editing.
- **Alternatives**: WebSockets for bidirectional communication, HTTP/2 Server Push for multiplexed streams.

## Common Misconceptions
- **Myth**: SSE is obsolete.  
  **Fact**: SSE is still relevant for specific use cases where its simplicity and efficiency are advantageous.
- **Myth**: SSE can replace WebSockets.  
  **Fact**: SSE is not suitable for scenarios requiring client-to-server communication.

## Related Topics
- WebSockets
- HTTP/2 Server Push
- Long Polling
- AJAX
- Real-Time Web Applications

## References
- [MDN Web Docs on Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [HTML Living Standard: Server-Sent Events](https://html.spec.whatwg.org/multipage/server-sent-events.html)