# CDN (Content Delivery Network)

> A CDN accelerates web content delivery by distributing it across geographically dispersed servers.

## Overview
A Content Delivery Network (CDN) is a system of distributed servers that deliver web content to users based on their geographic location. It exists to improve the speed, reliability, and efficiency of content delivery, reducing latency and server load.

## Core Idea / Mental Model
- CDNs cache content closer to the end-user, minimizing the distance data must travel.
- They balance load across multiple servers, enhancing availability and redundancy.

## Key Features & Benefits
- **Reduced Latency**: By serving content from the nearest server, CDNs decrease load times.
- **Scalability**: Handle large traffic spikes without impacting performance.
- **Reliability**: Redundant server networks ensure high availability.
- **Security**: Protect against DDoS attacks and provide secure content delivery.

## Trade-offs & Pitfalls
- **Cost**: CDNs can be expensive, especially for high traffic volumes.
- **Complexity**: Integration and configuration can be complex.
- **Caching Issues**: Incorrect cache settings may lead to outdated content being served.

## When to Use / When to Avoid
- **Use**: For websites with global audiences, high traffic, or rich media content.
- **Avoid**: For small, local websites where latency is not a concern or budget is tight.

## Real-World Examples & Modern Alternatives
- **Examples**: Akamai, Cloudflare, Amazon CloudFront.
- **Alternatives**: Peer-to-peer content distribution, edge computing solutions.

## Common Misconceptions
- **CDNs are only for large companies**: Even small businesses can benefit from improved performance.
- **CDNs replace web hosting**: They complement, not replace, traditional hosting.

## Related Topics
- Web Caching
- Load Balancing
- Edge Computing
- HTTP/2
- DDoS Mitigation

## References
- [Akamai: What is a CDN?](https://www.akamai.com/solutions/intelligent-edge-platform/what-is-a-cdn)
- [Cloudflare: How Does a CDN Work?](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)