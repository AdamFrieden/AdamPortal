# AuthN vs AuthZ

> **Authentication (AuthN) and Authorization (AuthZ) are critical components of security in software systems, ensuring that users are who they claim to be and have the appropriate permissions to access resources. Understanding the distinction and interplay between them is essential for designing secure applications.**

## Core idea
- **Authentication (AuthN):** The process of verifying the identity of a user or system. It answers the question, "Who are you?"
- **Authorization (AuthZ):** The process of determining what an authenticated user is allowed to do. It answers the question, "What can you do?"
- Both are crucial for securing applications but serve different purposes and are often implemented using distinct mechanisms.

## Key features
- **AuthN:**
  - Involves credentials like passwords, tokens, or biometric data.
  - Typically the first step in a security process.
  - Common protocols: OAuth, OpenID Connect, SAML.
- **AuthZ:**
  - Involves permissions and access control lists (ACLs).
  - Follows authentication to enforce security policies.
  - Common models: Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC).

## Why / When / How
- **Why:** To protect sensitive data and resources by ensuring only authorized users have access.
- **When:** Always use AuthN and AuthZ in tandem for any application handling sensitive or personal data.
- **How:** Implement AuthN to verify identity, followed by AuthZ to enforce access controls.
- **Pitfalls:**
  - Confusing AuthN with AuthZ can lead to security vulnerabilities.
  - Over-reliance on one mechanism without the other can result in unauthorized access.

## Example / Walk-through
```pseudo
# Authentication Process
user_input = get_user_credentials()
if verify_credentials(user_input):
    user = fetch_user_details(user_input)
else:
    deny_access()

# Authorization Process
if user.role == 'admin':
    grant_access_to_admin_resources()
elif user.role == 'user':
    grant_access_to_user_resources()
else:
    deny_access()
```

## Real-world applications
- **AuthN:** Logging into a web application using a username and password.
- **AuthZ:** Accessing different features of a web application based on user roles, such as admin or guest.

## References
- [OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)