# CORS

> CORS (Cross-Origin Resource Sharing) is a security feature that allows controlled access to resources across different origins.

## Overview
CORS is a mechanism that enables web applications running at one origin (domain) to request resources from a different origin. It exists to enforce the same-origin policy, which is a critical security measure in web browsers that prevents malicious sites from reading sensitive data from another site.

## Core Idea / Mental Model
- CORS allows servers to specify who can access their resources and how, using HTTP headers.
- It involves a preflight request to check permissions before the actual request is made.

## Key Features & Benefits
- **Security**: Protects users by preventing unauthorized access to resources.
- **Flexibility**: Allows developers to specify which domains are permitted to access resources.
- **Granularity**: Supports fine-grained control over HTTP methods and headers.

## Trade-offs & Pitfalls
- **Complexity**: Misconfigurations can lead to security vulnerabilities or blocked requests.
- **Performance**: Preflight requests can add latency.
- **Limited Browser Support**: Older browsers may not fully support CORS.

## When to Use / When to Avoid
- **Use**: When your application needs to access resources from a different domain securely.
- **Avoid**: If all resources are served from the same origin, or if you lack control over the server configuration.

## Real-World Examples & Modern Alternatives
- **Examples**: Web APIs like Google Maps or third-party services that require cross-origin requests.
- **Alternatives**: JSONP (less secure, outdated), server-side proxies to handle cross-origin requests.

## Common Misconceptions
- **CORS is not a security feature**: It is indeed a security feature designed to protect users.
- **CORS can bypass the same-origin policy**: It allows controlled relaxation, not bypassing.

## Related Topics
- Same-Origin Policy
- HTTP Headers
- JSONP
- Web Security
- API Gateway

## References
- [MDN Web Docs on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)  
- [OWASP CORS Security](https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny)