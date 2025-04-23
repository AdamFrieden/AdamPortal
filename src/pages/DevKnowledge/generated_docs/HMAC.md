# HMAC

> HMAC (Hash-based Message Authentication Code) ensures data integrity and authenticity using a cryptographic hash function and a secret key.

## Overview
HMAC is a mechanism for verifying the integrity and authenticity of a message. It combines a cryptographic hash function with a secret key, producing a hash value that can be used to verify both the data's integrity and the authenticity of the message sender.

## Core Idea / Mental Model
- HMAC uses a shared secret key and a hash function to create a unique hash value for a message.
- The recipient can verify the message's integrity and authenticity by recalculating the HMAC and comparing it to the received value.

## Key Features & Benefits
- **Integrity and Authenticity**: Ensures that the message has not been altered and is from a legitimate sender.
- **Keyed Hashing**: Uses a secret key, making it more secure than simple hashing.
- **Compatibility**: Works with any cryptographic hash function, such as SHA-256 or SHA-512.
- **Efficiency**: Computationally efficient, suitable for high-performance applications.

## Trade-offs & Pitfalls
- **Key Management**: Requires secure management and distribution of secret keys.
- **Not Encryption**: Does not provide confidentiality; it only ensures integrity and authenticity.
- **Hash Function Vulnerabilities**: Security depends on the strength of the underlying hash function.

## When to Use / When to Avoid
- **Use**: When you need to ensure data integrity and authenticity, such as in API authentication or secure message transmission.
- **Avoid**: When confidentiality is required, as HMAC does not encrypt data.

## Real-World Examples & Modern Alternatives
- **Examples**: API request signing (e.g., AWS Signature Version 4), securing cookies.
- **Alternatives**: Digital signatures (for non-repudiation), MACs using block ciphers (e.g., CMAC).

## Common Misconceptions
- **HMAC is Encryption**: HMAC does not encrypt data; it only verifies integrity and authenticity.
- **HMAC is Infallible**: Its security is dependent on the hash function and key management.

## Related Topics
- Cryptographic Hash Functions
- Digital Signatures
- Symmetric Key Cryptography
- Public Key Infrastructure (PKI)
- Message Authentication Codes (MACs)

## References
- [RFC 2104 - HMAC: Keyed-Hashing for Message Authentication](https://tools.ietf.org/html/rfc2104)  
- [NIST - Hash-based Message Authentication Code (HMAC)](https://csrc.nist.gov/publications/detail/fips/198/1/final)