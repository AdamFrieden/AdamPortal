# Hashing vs Encryption

> Hashing and encryption are distinct processes for securing data, each with specific use cases and characteristics.

## Overview
Hashing and encryption are cryptographic techniques used to protect data. Hashing transforms data into a fixed-size string of characters, which is typically irreversible, while encryption converts data into a different format that can be reversed with a key.

## Core Idea / Mental Model
- **Hashing**: One-way transformation; used for data integrity verification.
- **Encryption**: Two-way transformation; used for data confidentiality.

## Key Features & Benefits
- **Hashing**:
  - Fast and efficient for verifying data integrity.
  - Produces a fixed-size output regardless of input size.
  - Ideal for storing passwords securely.
- **Encryption**:
  - Reversible with the correct key, allowing data recovery.
  - Ensures data confidentiality during transmission or storage.
  - Supports symmetric and asymmetric key algorithms.

## Trade-offs & Pitfalls
- **Hashing**:
  - Irreversible; original data cannot be retrieved.
  - Vulnerable to collision attacks if not using a strong algorithm.
- **Encryption**:
  - Requires key management; losing keys can result in data loss.
  - Computationally more intensive than hashing.

## When to Use / When to Avoid
- **Use Hashing**:
  - When verifying data integrity (e.g., checksums, password storage).
- **Avoid Hashing**:
  - When data recovery is necessary.
- **Use Encryption**:
  - When data confidentiality is required (e.g., secure communications).
- **Avoid Encryption**:
  - When irreversible transformation is needed.

## Real-World Examples & Modern Alternatives
- **Hashing**: SHA-256 for password storage.
- **Encryption**: AES for encrypting sensitive data.
- **Alternatives**: Argon2 for password hashing, TLS for secure communication.

## Common Misconceptions
- Hashing is not encryption; it cannot be reversed.
- Encryption does not inherently verify data integrity.

## Related Topics
- Symmetric vs Asymmetric Encryption
- Digital Signatures
- Key Management
- Data Integrity
- Secure Hash Algorithms

## References
- [NIST Cryptographic Standards](https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines)  
- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)