# GitOps & Progressive Delivery

> GitOps and Progressive Delivery are modern practices that enhance software deployment by leveraging version control and controlled release strategies to improve reliability, speed, and collaboration in software delivery.

## Core idea
- **GitOps**: Utilizes Git as the single source of truth for declarative infrastructure and application configurations. Changes are made via pull requests, enabling version control, auditability, and rollback capabilities.
- **Progressive Delivery**: Involves gradually rolling out changes to a subset of users or environments, allowing for controlled testing and validation before full deployment. Techniques include canary releases, blue-green deployments, and feature flags.

## Key features
- **Automation**: GitOps automates deployment processes using continuous integration/continuous deployment (CI/CD) pipelines triggered by changes in the Git repository.
- **Observability**: Progressive Delivery provides insights into the impact of changes through monitoring and metrics, facilitating data-driven decisions.
- **Rollback and Recovery**: Both practices support rapid rollback to previous states in case of issues, minimizing downtime and risk.
- **Collaboration**: GitOps promotes collaboration through pull requests and code reviews, integrating development and operations teams.

## Why / When / How
- **Why**: Use GitOps for its robust version control and audit trail, and Progressive Delivery for minimizing risk and validating changes in production.
- **When**: Ideal for environments requiring high reliability, frequent updates, and rapid recovery. Suitable for microservices and cloud-native architectures.
- **How**: Implement GitOps by managing infrastructure as code in Git and using tools like ArgoCD or Flux. Apply Progressive Delivery using feature flagging tools like LaunchDarkly or Flagger.
- **Pitfalls**: Avoid GitOps if your team lacks Git proficiency or if your infrastructure is not declarative. Progressive Delivery may not be suitable for all applications, especially those with complex state dependencies.

## Example / Walk-through
```pseudo
# GitOps Workflow
1. Developer creates a feature branch and makes changes.
2. Changes are reviewed and merged into the main branch.
3. CI/CD pipeline triggers deployment to staging.
4. Automated tests run; if successful, deploy to production.

# Progressive Delivery Example
1. Deploy new version to 5% of users (canary release).
2. Monitor performance and user feedback.
3. Gradually increase user base to 100% if no issues.
```

## Real-world applications
- **GitOps**: Used by companies like Weaveworks and Intuit to manage Kubernetes clusters and cloud infrastructure.
- **Progressive Delivery**: Employed by organizations such as Netflix and Facebook to ensure smooth feature rollouts and minimize user impact.

## References
- [GitOps - Weaveworks](https://www.weave.works/technologies/gitops/)
- [Progressive Delivery - Martin Fowler](https://martinfowler.com/articles/progressive-delivery.html)