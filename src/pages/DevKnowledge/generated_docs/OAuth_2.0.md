# OAuth 2.0

> OAuth 2.0 is an open standard for access delegation, commonly used for token-based authentication.

## Overview
OAuth 2.0 is a protocol that allows third-party services to exchange user information without exposing user credentials. It was developed to improve upon OAuth 1.0 by simplifying the process for developers and enhancing security.

## Core Idea / Mental Model
- OAuth 2.0 separates the role of the resource owner (user) from the client (application) by using access tokens.
- It enables secure API authorization in a simple and standardized way.

## Key Features & Benefits
- **Token-Based Authentication**: Uses access tokens instead of credentials, reducing the risk of credential exposure.
- **Granular Access Control**: Allows fine-grained permissions, letting users specify what data can be accessed.
- **Scalability**: Supports multiple authorization flows suitable for web, mobile, and desktop applications.
- **Interoperability**: Widely adopted across platforms, ensuring compatibility with numerous services.

## Trade-offs & Pitfalls
- **Complexity**: Implementing OAuth 2.0 can be complex due to its various flows and configurations.
- **Security Risks**: Misconfigurations can lead to vulnerabilities like token leakage or insufficient validation.
- **State Management**: Requires careful handling of state and tokens to prevent security issues.

## When to Use / When to Avoid
- **Use**: When building applications that need to access user data from third-party services securely.
- **Avoid**: For simple applications where user credentials are sufficient, or when the complexity outweighs the benefits.

## Real-World Examples & Modern Alternatives
- **Examples**: Google APIs, Facebook Login, GitHub OAuth.
- **Alternatives**: OpenID Connect (layer on top of OAuth 2.0 for authentication), SAML (for enterprise SSO).

## Common Misconceptions
- **OAuth 2.0 is not an authentication protocol**: It's primarily for authorization, not authentication.
- **OAuth 2.0 is not inherently secure**: Security depends on proper implementation and configuration.

## Related Topics
- OpenID Connect
- JSON Web Tokens (JWT)
- API Security
- SAML
- Identity and Access Management (IAM)

## References
- [OAuth 2.0 Authorization Framework - RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)  
- [OAuth 2.0 Simplified - Aaron Parecki](https://oauth.net/2/)