# TLS

> TLS (Transport Layer Security) ensures secure communication over a computer network.

## Overview
TLS is a cryptographic protocol designed to provide secure communication over a network. It is widely used for securing data transmitted over the internet, such as web browsing, email, and instant messaging. TLS evolved from SSL (Secure Sockets Layer) to address security vulnerabilities and improve encryption standards.

## Core Idea / Mental Model
- TLS encrypts data between client and server, ensuring confidentiality, integrity, and authenticity.
- It uses a combination of symmetric and asymmetric cryptography to establish a secure session.

## Key Features & Benefits
- **Encryption**: Protects data from eavesdropping.
- **Integrity**: Ensures data has not been tampered with during transmission.
- **Authentication**: Verifies the identity of the communicating parties.
- **Widely Supported**: Compatible with most modern browsers and servers.

## Trade-offs & Pitfalls
- **Performance Overhead**: Encryption and decryption can introduce latency.
- **Complex Configuration**: Misconfiguration can lead to vulnerabilities.
- **Certificate Management**: Requires proper handling and renewal of digital certificates.

## When to Use / When to Avoid
- **Use**: When transmitting sensitive data over the internet, such as personal information, financial transactions, or proprietary business data.
- **Avoid**: In environments where encryption overhead is unacceptable or unnecessary, such as internal networks with no sensitive data.

## Real-World Examples & Modern Alternatives
- **Examples**: HTTPS for secure web browsing, SMTPS for secure email transmission.
- **Alternatives**: QUIC, a transport layer network protocol that integrates TLS-like security features.

## Common Misconceptions
- **TLS is not SSL**: TLS is the successor to SSL and is more secure.
- **TLS is not foolproof**: It requires proper implementation and maintenance to be effective.

## Related Topics
- Public Key Infrastructure (PKI)
- HTTPS
- SSL
- Certificate Authorities (CAs)
- Network Security

## References
- [Transport Layer Security (TLS) - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
- [RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3](https://tools.ietf.org/html/rfc8446)