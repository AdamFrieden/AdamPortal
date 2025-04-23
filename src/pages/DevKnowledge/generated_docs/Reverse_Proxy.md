# Reverse Proxy

> A reverse proxy is an intermediary server that forwards client requests to backend servers, enhancing performance and security.

## Overview
A reverse proxy acts as a gateway between clients and backend servers, handling incoming requests and distributing them to the appropriate server. It exists to improve load balancing, security, and scalability of web applications by abstracting the backend infrastructure from clients.

## Core Idea / Mental Model
- A reverse proxy intercepts client requests and forwards them to one or more backend servers.
- It acts as a single entry point for client requests, masking the complexity and structure of the backend.

## Key Features & Benefits
- **Load Balancing**: Distributes incoming traffic across multiple servers to optimize resource use and prevent overload.
- **Security**: Hides backend server details and can provide SSL termination, reducing the attack surface.
- **Caching**: Stores copies of responses to reduce load on backend servers and improve response times.
- **Compression**: Reduces bandwidth usage by compressing responses before sending them to clients.
- **Centralized Authentication**: Manages authentication and authorization, simplifying backend server configurations.

## Trade-offs & Pitfalls
- **Single Point of Failure**: If not properly configured, the reverse proxy can become a bottleneck or point of failure.
- **Complexity**: Adds an additional layer to the architecture, which can complicate troubleshooting and maintenance.
- **Latency**: May introduce additional latency due to request forwarding and processing.

## When to Use / When to Avoid
- **Use**: When you need load balancing, enhanced security, or centralized management of requests.
- **Avoid**: For simple applications with minimal traffic where the overhead of a reverse proxy is unnecessary.

## Real-World Examples & Modern Alternatives
- **Tools**: Nginx, HAProxy, Apache Traffic Server.
- **Services**: AWS Elastic Load Balancing, Cloudflare.
- **Alternatives**: Direct server access for small-scale applications, API gateways for microservices.

## Common Misconceptions
- **Myth**: Reverse proxies are only for large-scale applications.
- **Myth**: They inherently provide security without proper configuration.

## Related Topics
- Load Balancing
- SSL Termination
- API Gateway
- Forward Proxy
- Content Delivery Network (CDN)

## References
- [NGINX Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [HAProxy Documentation](https://www.haproxy.org/documentation/)