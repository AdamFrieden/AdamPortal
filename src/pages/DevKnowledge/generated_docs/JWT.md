# JWT

> JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims between two parties.

## Overview
JWT is a standard for creating access tokens that assert claims about a user or system. It exists to securely transmit information between parties as a JSON object, which can be verified and trusted because it is digitally signed.

## Core Idea / Mental Model
- JWTs consist of three parts: Header, Payload, and Signature.
- They are self-contained tokens that include all necessary information about the user or system.
- The signature ensures the token's integrity and authenticity.

## Key Features & Benefits
- **Compact**: Small size makes JWTs suitable for HTTP headers.
- **Self-contained**: All necessary information is included within the token.
- **Stateless**: No need to store session information server-side.
- **Secure**: Can be signed using HMAC or RSA algorithms to ensure data integrity.

## Trade-offs & Pitfalls
- **No built-in expiration**: Must manually handle token expiration and revocation.
- **Size**: Can grow large if too much data is included in the payload.
- **Security**: If not properly implemented, JWTs can be vulnerable to attacks such as token theft.

## When to Use / When to Avoid
- **Use**: When you need a stateless, secure way to transmit user claims across different domains or services.
- **Avoid**: When you require server-side session management or need to frequently update user permissions.

## Real-World Examples & Modern Alternatives
- **Examples**: OAuth 2.0 uses JWTs for access tokens; OpenID Connect for identity tokens.
- **Alternatives**: OAuth 2.0 Bearer Tokens, API Keys, Session Cookies.

## Common Misconceptions
- **JWTs are encrypted**: JWTs are signed, not encrypted by default.
- **JWTs are inherently secure**: Security depends on the implementation and key management.

## Related Topics
- OAuth 2.0
- OpenID Connect
- HMAC and RSA algorithms
- Token-based authentication
- API security best practices

## References
- [JWT Introduction - jwt.io](https://jwt.io/introduction/)
- [RFC 7519: JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)