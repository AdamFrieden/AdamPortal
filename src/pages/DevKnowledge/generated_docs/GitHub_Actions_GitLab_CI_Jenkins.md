# GitHub Actions / GitLab CI / Jenkins

> GitHub Actions, GitLab CI, and Jenkins are powerful CI/CD tools that automate software development workflows, enabling faster and more reliable software delivery. Each has unique strengths suited to different environments and needs.

## Core idea
- **Continuous Integration/Continuous Deployment (CI/CD)**: Automate the integration and deployment of code changes, reducing manual effort and increasing reliability.
- **Automation**: Streamline repetitive tasks such as testing, building, and deploying applications.
- **Scalability**: Handle projects of varying sizes, from small open-source projects to large enterprise applications.

## Key features
- **GitHub Actions**: 
  - Integrated with GitHub repositories, enabling seamless workflow automation.
  - Supports event-driven triggers, allowing workflows to run on specific events like pushes or pull requests.
  - Marketplace for reusable actions, enhancing modularity and sharing.

- **GitLab CI**:
  - Built into GitLab, providing a unified interface for code management and CI/CD.
  - Strong support for Kubernetes and Docker, facilitating containerized application deployments.
  - Auto DevOps feature for automatic pipeline generation based on project type.

- **Jenkins**:
  - Highly extensible with a vast plugin ecosystem, supporting diverse build and deployment scenarios.
  - Can be self-hosted, offering full control over the CI/CD environment.
  - Supports distributed builds across multiple nodes, improving performance for large projects.

## Why / When / How
- **Why use them**: To automate and streamline the software development lifecycle, improving code quality and reducing time to market.
- **When to use**:
  - **GitHub Actions**: Best for projects hosted on GitHub, especially when leveraging GitHub's ecosystem.
  - **GitLab CI**: Ideal for teams using GitLab for code management, offering a cohesive experience.
  - **Jenkins**: Suitable for complex, customized CI/CD pipelines requiring extensive plugin support.
- **Common pitfalls**:
  - **GitHub Actions**: Limited to GitHub-hosted projects; may incur costs for large-scale usage.
  - **GitLab CI**: Can be resource-intensive; requires proper configuration for optimal performance.
  - **Jenkins**: Maintenance overhead due to self-hosting; potential complexity in plugin management.

## Example / Walk-through
```yaml
# GitHub Actions example
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: npm install
    - run: npm test
```

## Real-world applications
- **GitHub Actions**: Automating open-source project workflows, such as testing and deploying libraries.
- **GitLab CI**: Deploying microservices to Kubernetes clusters using Auto DevOps.
- **Jenkins**: Managing complex enterprise CI/CD pipelines with custom plugins for legacy systems.

## References
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)