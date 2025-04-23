# Encryption in Transit

> Protects data as it moves across networks, ensuring confidentiality and integrity.

## Overview
Encryption in transit refers to the practice of encrypting data while it is being transmitted across networks. This is crucial for protecting sensitive information from interception or tampering during transit between systems, such as between a client and a server.

## Core Idea / Mental Model
- Data is vulnerable when moving across networks; encryption ensures it remains confidential and unaltered.
- Utilizes protocols like TLS (Transport Layer Security) to secure data in motion.

## Key Features & Benefits
- **Confidentiality**: Prevents unauthorized access to data during transmission.
- **Integrity**: Ensures data is not altered in transit.
- **Authentication**: Verifies the identity of communicating parties.
- **Compliance**: Meets regulatory requirements for data protection.

## Trade-offs & Pitfalls
- **Performance Overhead**: Encryption can introduce latency and computational load.
- **Complexity**: Requires proper configuration and management of certificates.
- **False Sense of Security**: Only protects data in transit, not at rest or in use.

## When to Use / When to Avoid
- **Use**: When transmitting sensitive data over public or untrusted networks.
- **Avoid**: For internal communications where performance is critical and the network is secure.

## Real-World Examples & Modern Alternatives
- **Tools**: OpenSSL, Let's Encrypt for TLS certificates.
- **Services**: AWS Certificate Manager, Cloudflare for managed TLS.
- **Alternatives**: VPNs for encrypting entire network traffic.

## Common Misconceptions
- **"Encryption in transit is enough"**: It must be complemented with encryption at rest.
- **"HTTPS is always secure"**: Misconfigured HTTPS can still be vulnerable.

## Related Topics
- Encryption at Rest
- Public Key Infrastructure (PKI)
- Secure Sockets Layer (SSL)
- Virtual Private Networks (VPNs)
- Zero Trust Architecture

## References
- [Transport Layer Security (TLS) - Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security)  
- [NIST Special Publication 800-52 - Guidelines for the Selection, Configuration, and Use of Transport Layer Security (TLS) Implementations](https://csrc.nist.gov/publications/detail/sp/800-52/rev-2/final)