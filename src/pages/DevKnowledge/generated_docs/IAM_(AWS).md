# IAM (AWS)

> AWS IAM is a service for managing access to AWS resources securely and efficiently.

## Overview
AWS Identity and Access Management (IAM) is a service that helps you securely control access to AWS resources. It allows you to manage users, groups, and permissions, ensuring that only authorized individuals and services can access specific resources.

## Core Idea / Mental Model
- IAM operates on the principle of least privilege, granting only the permissions necessary for users to perform their tasks.
- It uses policies to define permissions, which can be attached to users, groups, or roles.

## Key Features & Benefits
- **Fine-Grained Access Control**: Define specific permissions for users and services.
- **Centralized Management**: Manage access across all AWS services from a single point.
- **Multi-Factor Authentication (MFA)**: Enhance security by requiring additional verification.
- **Temporary Credentials**: Use roles to grant temporary access to AWS resources.
- **Audit and Compliance**: Track and log access requests for compliance and security audits.

## Trade-offs & Pitfalls
- **Complexity**: Misconfigurations can lead to security vulnerabilities.
- **Over-privileged Access**: Granting excessive permissions can expose resources to risk.
- **Policy Management**: Managing a large number of policies can become cumbersome.

## When to Use / When to Avoid
- **Use**: When you need to manage access to AWS resources securely and efficiently.
- **Avoid**: For non-AWS environments or when simpler access control mechanisms suffice.

## Real-World Examples & Modern Alternatives
- **AWS Organizations**: Use alongside IAM for managing multiple AWS accounts.
- **Azure Active Directory**: A comparable service for managing identities in Microsoft Azure.
- **Google Cloud IAM**: An alternative for managing access in Google Cloud Platform.

## Common Misconceptions
- **IAM is not a firewall**: It controls access to AWS resources, not network traffic.
- **IAM is not only for users**: It also manages access for applications and services.

## Related Topics
- AWS Organizations
- AWS Security Token Service (STS)
- AWS Resource Access Manager (RAM)
- AWS CloudTrail
- AWS Config

## References
- [AWS IAM Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)  
- [AWS IAM Best Practices](https://aws.amazon.com/iam/resources/best-practices/)