# Encryption at Rest

> Protects stored data from unauthorized access by encrypting it when not in use.

## Overview
Encryption at rest refers to the practice of encrypting data stored on disk to prevent unauthorized access. It exists to safeguard sensitive information from threats such as data breaches, theft, or unauthorized access, ensuring compliance with data protection regulations.

## Core Idea / Mental Model
- Encrypt data when stored on physical media to protect it from unauthorized access.
- Decryption occurs only when data is accessed by authorized users or applications.

## Key Features & Benefits
- **Data Protection**: Ensures data confidentiality even if physical security is compromised.
- **Regulatory Compliance**: Helps meet legal and industry standards for data protection.
- **Minimal Performance Impact**: Modern encryption algorithms are designed to minimize performance overhead.

## Trade-offs & Pitfalls
- **Key Management Complexity**: Securely managing encryption keys can be challenging.
- **Performance Overhead**: Although minimal, encryption can introduce latency.
- **False Sense of Security**: Encryption at rest does not protect data in transit or during processing.

## When to Use / When to Avoid
- **Use**: When storing sensitive data that requires protection from unauthorized access.
- **Avoid**: If data is already protected by other means or when performance is a critical concern and encryption overhead is unacceptable.

## Real-World Examples & Modern Alternatives
- **Tools**: AWS KMS, Azure Key Vault, Google Cloud KMS.
- **Alternatives**: Tokenization, data masking, or homomorphic encryption for specific use cases.

## Common Misconceptions
- **Myth**: Encryption at rest protects data in transit.
- **Myth**: It eliminates the need for other security measures.

## Related Topics
- Data Encryption in Transit
- Key Management Systems
- Data Masking
- Homomorphic Encryption
- Secure Access Service Edge (SASE)

## References
- [NIST Special Publication 800-111: Guide to Storage Encryption Technologies for End User Devices](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-111.pdf)  
- [AWS Encryption at Rest](https://aws.amazon.com/blogs/security/how-to-protect-data-at-rest-with-encryption/)