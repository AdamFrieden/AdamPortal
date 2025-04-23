# Canary Deployment

> Gradually roll out changes to a small subset of users to minimize risk before full deployment.

## Overview
Canary deployment is a software release strategy that allows new versions of a service to be tested on a small subset of users before being rolled out to the entire user base. This approach helps in identifying potential issues in a controlled manner, reducing the risk of widespread failures.

## Core Idea / Mental Model
- Deploy changes to a small, representative segment of users.
- Monitor the performance and gather feedback.
- Gradually increase the user base if no critical issues are detected.

## Key Features & Benefits
- **Risk Mitigation**: Limits the impact of potential issues by exposing them to a small audience first.
- **Feedback Loop**: Provides early insights and user feedback, allowing for quick adjustments.
- **Controlled Rollout**: Enables gradual exposure, making it easier to manage and rollback if necessary.

## Trade-offs & Pitfalls
- **Complexity**: Requires infrastructure to support multiple versions simultaneously.
- **Monitoring Overhead**: Needs robust monitoring and alerting systems to detect issues early.
- **User Experience**: Inconsistent experiences for users if not managed properly.

## When to Use / When to Avoid
- **Use When**: Introducing significant changes, testing new features, or when the user base is large enough to segment effectively.
- **Avoid When**: The application is small-scale, lacks monitoring capabilities, or when changes are trivial and low-risk.

## Real-World Examples & Modern Alternatives
- **Tools**: Feature flags (e.g., LaunchDarkly, Unleash), Kubernetes with Istio for traffic management.
- **Alternatives**: Blue-Green Deployments, A/B Testing, Rolling Updates.

## Common Misconceptions
- **Myth**: Canary deployments eliminate all risks.
  - **Fact**: They reduce risk but do not eliminate it entirely.
- **Myth**: Suitable for all types of changes.
  - **Fact**: Best for significant or potentially disruptive changes.

## Related Topics
- Continuous Deployment
- Feature Toggles
- Blue-Green Deployment
- A/B Testing
- Rolling Updates

## References
- [Martin Fowler on Canary Release](https://martinfowler.com/bliki/CanaryRelease.html)  
- [Google Cloud Canary Deployments](https://cloud.google.com/solutions/devops/devops-tech-canary-deployments)