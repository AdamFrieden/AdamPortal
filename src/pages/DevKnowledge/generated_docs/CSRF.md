# CSRF

> CSRF (Cross-Site Request Forgery) is a web security vulnerability that tricks a user into performing actions they did not intend.

## Overview
CSRF is a type of attack that forces an end user to execute unwanted actions on a web application in which they're authenticated. It exploits the trust that a web application has in the user's browser, allowing attackers to perform actions on behalf of the user without their knowledge.

## Core Idea / Mental Model
- CSRF attacks rely on the victim's authenticated session to perform unauthorized actions.
- They exploit the fact that browsers automatically include credentials like cookies with each request.

## Key Features & Benefits
- **Exploits Trust**: Leverages the trust between the user's browser and the web application.
- **Session Hijacking**: Can perform actions like changing account settings or initiating transactions.
- **User Involvement**: Requires minimal user interaction, often just visiting a malicious site.

## Trade-offs & Pitfalls
- **Complex Mitigation**: Requires careful implementation of anti-CSRF tokens or same-site cookie attributes.
- **User Experience**: Security measures can sometimes degrade user experience if not implemented correctly.
- **Limited Scope**: Only affects actions that rely on the user's authenticated session.

## When to Use / When to Avoid
- **Use**: Implement CSRF protection in any web application that relies on user authentication.
- **Avoid**: Not applicable for APIs that use token-based authentication without cookies.

## Real-World Examples & Modern Alternatives
- **Tools**: OWASP CSRFGuard, Django CSRF middleware.
- **Alternatives**: SameSite cookie attribute, token-based authentication (e.g., JWT).

## Common Misconceptions
- **"CSRF is the same as XSS"**: CSRF exploits user trust, while XSS exploits application trust.
- **"HTTPS prevents CSRF"**: HTTPS does not prevent CSRF; it only secures data in transit.

## Related Topics
- XSS (Cross-Site Scripting)
- CORS (Cross-Origin Resource Sharing)
- Session Management
- Authentication Tokens
- Web Security Best Practices

## References
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)  
- [Mozilla Developer Network: CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)