# Hardware Security Modules (HSM) & TPM

> Hardware Security Modules (HSM) and Trusted Platform Modules (TPM) are specialized hardware devices designed to enhance security by providing secure key management and cryptographic operations. They are critical for protecting sensitive data and ensuring the integrity of systems.

## Core idea
- **HSM**: A dedicated hardware device that provides secure key management and cryptographic operations. It is used to protect sensitive data by securely storing cryptographic keys and performing encryption, decryption, and digital signing operations.
- **TPM**: A microcontroller embedded in devices that provides hardware-based security functions. It is used to ensure platform integrity, secure boot processes, and store cryptographic keys securely.

## Key features
- **HSM**:
  - Secure key generation and storage.
  - High-performance cryptographic operations.
  - Tamper-resistant design to prevent unauthorized access.
  - Compliance with standards like FIPS 140-2/3.
- **TPM**:
  - Secure storage for cryptographic keys and certificates.
  - Platform integrity verification through attestation.
  - Support for secure boot and measured boot processes.
  - Integration with operating systems for enhanced security.

## Why / When / How
- **Why use HSM**: To protect sensitive data and cryptographic keys in environments requiring high security, such as financial services, government, and healthcare.
- **When to use HSM**: When compliance with regulatory standards is required, or when performing high-volume cryptographic operations.
- **Common pitfalls**: High cost and complexity of integration; not suitable for low-security applications.
- **Why use TPM**: To ensure device integrity and secure sensitive operations at the hardware level.
- **When to use TPM**: In environments requiring secure boot processes and platform integrity verification.
- **Common pitfalls**: Limited cryptographic capabilities compared to HSM; reliance on hardware support.

## Example / Walk-through
```pseudo
# Example of using TPM for secure boot
1. TPM stores a hash of the boot loader.
2. On boot, the system computes the hash of the boot loader.
3. TPM compares the computed hash with the stored hash.
4. If they match, the boot process continues; otherwise, it halts.

# Example of using HSM for secure key management
1. Generate a cryptographic key within the HSM.
2. Use the HSM to encrypt data with the key.
3. Store the encrypted data securely.
4. Decrypt data using the HSM when needed.
```

## Real-world applications
- **HSM**: Used by banks for secure transaction processing and by cloud providers for key management services.
- **TPM**: Used in laptops and servers to ensure secure boot and protect against unauthorized firmware changes.

## References
- [NIST FIPS 140-2/3](https://csrc.nist.gov/publications/detail/fips/140/2/final)
- [Trusted Computing Group - TPM](https://trustedcomputinggroup.org/work-groups/trusted-platform-module/)