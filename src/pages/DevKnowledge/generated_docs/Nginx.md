# Nginx

> Nginx is a high-performance web server and reverse proxy known for its scalability and efficiency.

## Overview
Nginx is a lightweight, open-source web server and reverse proxy server designed to handle high concurrency with low resource usage. It was created to address the C10k problem, which involves efficiently handling 10,000 simultaneous connections. Nginx is widely used for serving static content, load balancing, and acting as a reverse proxy.

## Core Idea / Mental Model
- Event-driven architecture allows handling many connections with minimal resources.
- Asynchronous, non-blocking processing model enhances performance and scalability.

## Key Features & Benefits
- **High Performance**: Efficiently handles thousands of simultaneous connections.
- **Reverse Proxy**: Balances load across multiple servers, improving reliability and uptime.
- **Static Content Serving**: Optimized for serving static files quickly.
- **SSL/TLS Termination**: Offloads SSL processing from backend servers.
- **Configurable**: Flexible configuration options for diverse use cases.

## Trade-offs & Pitfalls
- **Complex Configuration**: Can be challenging for beginners to configure correctly.
- **Limited Dynamic Content Handling**: Not ideal for serving dynamic content directly; often used with application servers like PHP-FPM.
- **Learning Curve**: Requires understanding of its configuration syntax and modules.

## When to Use / When to Avoid
- **Use**: When you need a high-performance web server or reverse proxy, especially for static content or load balancing.
- **Avoid**: When you require extensive application logic processing directly on the web server.

## Real-World Examples & Modern Alternatives
- **Examples**: Used by companies like Netflix, Dropbox, and WordPress.
- **Alternatives**: Apache HTTP Server, Caddy, and HAProxy for specific use cases.

## Common Misconceptions
- **"Nginx is only for static content"**: It can also reverse proxy dynamic content.
- **"Nginx replaces application servers"**: It complements them by handling requests efficiently.

## Related Topics
- Load Balancing
- Reverse Proxy
- HTTP/2
- SSL/TLS
- Web Server Configuration

## References
- [Nginx Official Documentation](https://nginx.org/en/docs/)  
- [Nginx on Wikipedia](https://en.wikipedia.org/wiki/Nginx)