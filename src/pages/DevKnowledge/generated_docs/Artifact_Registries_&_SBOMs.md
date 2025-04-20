# Artifact Registries & SBOMs

> Artifact registries and Software Bill of Materials (SBOMs) are critical components in modern software supply chain management, enhancing security, traceability, and compliance.

## Core idea
- **Artifact Registries**: Centralized repositories for storing, managing, and distributing software artifacts such as binaries, libraries, and container images. They ensure version control, access management, and efficient artifact retrieval.
- **SBOMs**: A detailed list of components, libraries, and dependencies within a software application. SBOMs provide transparency, enabling better vulnerability management and compliance with regulatory standards.

## Key features
- **Artifact Registries**:
  - **Versioning**: Track and manage different versions of artifacts.
  - **Access Control**: Define permissions for who can publish or retrieve artifacts.
  - **Integration**: Seamlessly integrate with CI/CD pipelines for automated builds and deployments.
- **SBOMs**:
  - **Component Inventory**: Comprehensive listing of all software components and their versions.
  - **Vulnerability Management**: Identify and mitigate risks by tracking known vulnerabilities in components.
  - **Compliance**: Facilitate adherence to legal and regulatory requirements by providing transparency.

## Why / When / How
- **Why**: Use artifact registries to streamline software delivery, reduce build times, and ensure consistency across environments. SBOMs are essential for security audits, vulnerability assessments, and compliance checks.
- **When**: Implement artifact registries when managing multiple software versions or when deploying applications across various environments. Use SBOMs when security and compliance are priorities, especially in regulated industries.
- **How**: Integrate artifact registries with CI/CD tools like Jenkins or GitHub Actions. Generate SBOMs using tools like CycloneDX or SPDX during the build process.
- **Pitfalls**: Avoid over-reliance on a single registry provider to prevent vendor lock-in. Ensure SBOMs are updated regularly to reflect the current state of the software.

## Example / Walk-through
```pseudo
# Example of using an artifact registry with Docker CLI
docker login myregistry.example.com
docker tag myapp:latest myregistry.example.com/myapp:1.0
docker push myregistry.example.com/myapp:1.0

# Example of generating an SBOM using CycloneDX
cyclonedx-bom -o bom.xml -f myapp
```

## Real-world applications
- **Artifact Registries**: Used by organizations like Google (Artifact Registry) and JFrog (Artifactory) to manage and distribute software components efficiently.
- **SBOMs**: Adopted by companies in the automotive and healthcare sectors to ensure compliance with industry standards and regulations.

## References
- [Google Cloud Artifact Registry](https://cloud.google.com/artifact-registry/docs)
- [CycloneDX SBOM Standard](https://cyclonedx.org/)