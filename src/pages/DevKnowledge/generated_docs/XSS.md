# XSS

> Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web applications.

## Overview
XSS is a type of security flaw found in web applications where attackers inject malicious scripts into content from otherwise trusted websites. It exists because web applications often fail to properly validate or sanitize user inputs, allowing attackers to execute scripts in the context of a user's browser session.

## Core Idea / Mental Model
- XSS exploits the trust a user has in a particular website by injecting scripts that can hijack user sessions, deface websites, or redirect users to malicious sites.
- It typically involves three types: Stored XSS, Reflected XSS, and DOM-based XSS.

## Key Features & Benefits
- **Stored XSS**: The script is permanently stored on the target server, such as in a database.
- **Reflected XSS**: The script is reflected off a web server, such as in an error message or search result.
- **DOM-based XSS**: The vulnerability exists in the client-side code rather than server-side.

## Trade-offs & Pitfalls
- **Complexity**: Mitigating XSS requires a deep understanding of both client-side and server-side code.
- **Performance**: Over-sanitizing inputs can lead to performance overhead.
- **User Experience**: Excessive filtering may inadvertently block legitimate user inputs.

## When to Use / When to Avoid
- **Use**: Always consider XSS prevention techniques when developing web applications, especially those handling sensitive data.
- **Avoid**: There is no scenario where allowing XSS is beneficial; always aim to prevent it.

## Real-World Examples & Modern Alternatives
- **Content Security Policy (CSP)**: A modern security standard that helps prevent XSS by controlling resources the browser can load.
- **Libraries**: Use libraries like DOMPurify to sanitize HTML and prevent XSS.

## Common Misconceptions
- "XSS is only a problem for large websites." - XSS can affect any size website.
- "HTTPS prevents XSS." - HTTPS encrypts data in transit but does not prevent XSS.

## Related Topics
- SQL Injection
- Content Security Policy (CSP)
- Cross-Site Request Forgery (CSRF)
- Web Application Firewalls (WAF)
- Input Validation and Sanitization

## References
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html)  
- [Mozilla Developer Network: Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)