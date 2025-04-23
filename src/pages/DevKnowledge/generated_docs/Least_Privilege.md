# Least Privilege

> A security principle ensuring users and systems have the minimum access necessary to perform their functions.

## Overview
Least Privilege is a security concept aimed at minimizing access rights for users and systems to the bare minimum necessary to perform their tasks. It exists to reduce the risk of accidental or malicious misuse of privileges, thereby enhancing system security and stability.

## Core Idea / Mental Model
- Grant only the permissions necessary for a user or system to complete its tasks.
- Regularly review and adjust permissions to adapt to changing roles and requirements.

## Key Features & Benefits
- **Enhanced Security**: Limits potential damage from compromised accounts or systems.
- **Reduced Attack Surface**: Minimizes the number of entry points for attackers.
- **Compliance**: Helps meet regulatory requirements by enforcing strict access controls.
- **Operational Efficiency**: Encourages clear definition of roles and responsibilities.

## Trade-offs & Pitfalls
- **Complexity**: Can be challenging to implement and maintain, especially in large organizations.
- **Overhead**: Requires ongoing management and regular audits to ensure effectiveness.
- **User Frustration**: May lead to dissatisfaction if users feel overly restricted.

## When to Use / When to Avoid
- **Use**: In environments where security is a priority, such as financial systems, healthcare, and government.
- **Avoid**: In small, low-risk environments where the overhead may outweigh the benefits.

## Real-World Examples & Modern Alternatives
- **Tools**: AWS IAM, Azure RBAC, and Google Cloud IAM implement least privilege principles.
- **Patterns**: Zero Trust Architecture emphasizes least privilege as a core component.

## Common Misconceptions
- **"One-time setup"**: Least privilege requires ongoing management, not just initial configuration.
- **"All or nothing"**: It’s not about denying access but granting the right level of access.

## Related Topics
- Role-Based Access Control (RBAC)
- Zero Trust Security
- Principle of Separation of Duties
- Identity and Access Management (IAM)
- Security Auditing

## References
- [NIST Special Publication 800-53](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)  
- [OWASP Access Control](https://owasp.org/www-community/Access_Control)