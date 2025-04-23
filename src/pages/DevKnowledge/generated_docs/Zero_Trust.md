# Zero Trust

> A security model that assumes no implicit trust and continuously verifies every request.

## Overview
Zero Trust is a cybersecurity framework that requires strict identity verification for every person and device attempting to access resources on a private network, regardless of whether they are inside or outside the network perimeter. It exists to address the limitations of traditional security models that rely on perimeter defenses, which are less effective against modern threats like insider attacks and advanced persistent threats.

## Core Idea / Mental Model
- "Never trust, always verify": Every access request must be authenticated, authorized, and encrypted.
- Assume breach: Design systems with the expectation that threats exist both inside and outside the network.

## Key Features & Benefits
- **Granular Access Control**: Enforces least privilege access, reducing the attack surface.
- **Continuous Monitoring**: Constantly assesses user behavior and device health.
- **Improved Security Posture**: Reduces risk of data breaches by minimizing trust zones.
- **Scalability**: Adapts to cloud environments and remote workforces.

## Trade-offs & Pitfalls
- **Complex Implementation**: Requires significant changes to existing infrastructure and processes.
- **Performance Overhead**: Continuous verification can introduce latency.
- **Cultural Resistance**: May face pushback from users accustomed to traditional models.

## When to Use / When to Avoid
- **Use**: When dealing with sensitive data, remote workforces, or cloud environments.
- **Avoid**: In small, low-risk environments where the complexity may outweigh benefits.

## Real-World Examples & Modern Alternatives
- **Tools**: Google BeyondCorp, Microsoft Azure AD Conditional Access.
- **Alternatives**: Traditional perimeter-based security models, though less effective against modern threats.

## Common Misconceptions
- **Myth**: Zero Trust means no trust at all.
  - **Fact**: It means no implicit trust; trust is earned through verification.
- **Myth**: Zero Trust is a single product.
  - **Fact**: It's a comprehensive strategy involving multiple technologies and policies.

## Related Topics
- Network Segmentation
- Identity and Access Management (IAM)
- Multi-Factor Authentication (MFA)
- Endpoint Security
- Cloud Security

## References
- [NIST Special Publication 800-207: Zero Trust Architecture](https://csrc.nist.gov/publications/detail/sp/800-207/final)  
- [Gartner's Zero Trust Network Access (ZTNA)](https://www.gartner.com/en/information-technology/glossary/zero-trust-network-access-ztna)