# API Keys vs OAuth

> API Keys and OAuth are authentication mechanisms for securing API access, each suited for different use cases.

## Overview
API Keys and OAuth are two distinct methods for authenticating and authorizing access to APIs. API Keys are simple tokens that identify the calling program, while OAuth is a more complex protocol that provides secure delegated access.

## Core Idea / Mental Model
- **API Keys**: Simple, static tokens for identifying and authenticating requests.
- **OAuth**: A protocol for secure, delegated access using tokens, often involving user consent.

## Key Features & Benefits
- **API Keys**:
  - Easy to implement and use.
  - Suitable for server-to-server communication.
  - No user interaction required.
- **OAuth**:
  - Provides secure, delegated access.
  - Supports user consent and scopes for granular permissions.
  - Widely adopted for third-party integrations.

## Trade-offs & Pitfalls
- **API Keys**:
  - Lack fine-grained access control.
  - Can be easily compromised if not stored securely.
- **OAuth**:
  - More complex to implement.
  - Requires user interaction and consent flows.
  - Overhead of managing token lifecycles.

## When to Use / When to Avoid
- **Use API Keys** when simplicity and ease of use are priorities, and fine-grained access control is not required.
- **Use OAuth** when secure, delegated access is needed, especially for third-party applications requiring user consent.

## Real-World Examples & Modern Alternatives
- **API Keys**: Used by services like Google Maps API for server-to-server communication.
- **OAuth**: Employed by platforms like Google, Facebook, and GitHub for third-party app integrations.
- **Alternatives**: JWT (JSON Web Tokens) for stateless authentication, OpenID Connect for identity verification.

## Common Misconceptions
- **API Keys are secure**: They are not inherently secure and require careful handling.
- **OAuth is only for social login**: OAuth is a versatile protocol for various secure access scenarios.

## Related Topics
- JWT (JSON Web Tokens)
- OpenID Connect
- SAML (Security Assertion Markup Language)
- API Gateway Security
- Token-Based Authentication

## References
- [OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)  
- [Google Cloud API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)