# HTTP Status Codes (2xx, 4xx, 5xx)

> HTTP status codes are essential for understanding and managing the communication between clients and servers in web applications.

## Overview
HTTP status codes are standardized responses from a server indicating the result of a client's request. They exist to provide clarity on the outcome of HTTP requests, helping developers and systems to handle responses appropriately.

## Core Idea / Mental Model
- HTTP status codes are categorized into classes: informational (1xx), success (2xx), redirection (3xx), client error (4xx), and server error (5xx).
- Each class of status codes serves a distinct purpose, guiding the client on the next steps.

## Key Features & Benefits
- **2xx Success**: Indicates successful processing of a request, e.g., `200 OK`, `201 Created`.
- **4xx Client Errors**: Signals issues with the request from the client, e.g., `404 Not Found`, `400 Bad Request`.
- **5xx Server Errors**: Denotes server-side problems, e.g., `500 Internal Server Error`, `503 Service Unavailable`.
- Provides a standardized way to communicate the status of HTTP transactions, facilitating debugging and error handling.

## Trade-offs & Pitfalls
- Over-reliance on status codes without proper logging can obscure the root cause of issues.
- Misinterpretation of codes can lead to incorrect handling of responses, e.g., treating a `404` as a server error.

## When to Use / When to Avoid
- **Use**: When developing or debugging web applications to ensure proper client-server communication.
- **Avoid**: When detailed application-specific error handling is required beyond standard HTTP codes.

## Real-World Examples & Modern Alternatives
- **RESTful APIs**: Extensively use HTTP status codes for communication.
- **GraphQL**: Often uses a single HTTP status code (`200 OK`) and handles errors within the response body.

## Common Misconceptions
- **Myth**: All 4xx errors are server-side issues.
- **Reality**: 4xx errors indicate client-side problems.

## Related Topics
- RESTful API Design
- HTTP Methods (GET, POST, etc.)
- Web Application Security
- Error Handling in Web Applications
- API Gateway Patterns

## References
- [MDN Web Docs: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)  
- [RFC 7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content](https://tools.ietf.org/html/rfc7231)