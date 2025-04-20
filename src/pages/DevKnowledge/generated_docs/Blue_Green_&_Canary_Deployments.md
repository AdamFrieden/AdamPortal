# Blue Green & Canary Deployments

> Blue-Green and Canary deployments are advanced deployment strategies designed to minimize downtime and reduce risk during software releases by controlling the exposure of new features to users.

## Core idea
- **Blue-Green Deployment**: Involves maintaining two identical environments, "Blue" and "Green". At any time, one environment serves production traffic while the other is idle or used for staging the next release.
- **Canary Deployment**: Gradually rolls out a new version to a small subset of users before full deployment, allowing for monitoring and rollback if issues arise.
- Both strategies aim to reduce downtime and risk by providing a controlled environment for testing and validation before full-scale release.

## Key features
- **Blue-Green Deployment**:
  - Instant rollback capability by switching traffic between environments.
  - Simplifies testing in a production-like environment.
  - Requires double the infrastructure, which can be costly.
  
- **Canary Deployment**:
  - Incremental exposure to new changes, reducing the blast radius of potential issues.
  - Allows for real-time monitoring and feedback.
  - More complex to implement due to traffic routing and monitoring requirements.

## Why / When / How
- **Why**: To ensure high availability and reliability during deployments, minimizing user impact and enabling quick rollback.
- **When**: Use Blue-Green when you need zero-downtime deployments and have the resources for duplicate environments. Use Canary when you want to test new features on a small scale before full release.
- **How**: Implement Blue-Green by setting up two identical environments and switching traffic using a load balancer. Implement Canary by routing a small percentage of traffic to the new version and gradually increasing it based on performance metrics.
- **Pitfalls**:
  - Blue-Green: High infrastructure cost and complexity in maintaining two environments.
  - Canary: Requires sophisticated monitoring and traffic management systems.

## Example / Walk-through
```pseudo
# Blue-Green Deployment
# Step 1: Deploy new version to Green environment
# Step 2: Run tests on Green environment
# Step 3: Switch traffic from Blue to Green using load balancer
# Step 4: Monitor and rollback if necessary

# Canary Deployment
# Step 1: Deploy new version to a subset of instances
# Step 2: Route 5% of traffic to new version
# Step 3: Monitor performance and errors
# Step 4: Gradually increase traffic to 100% if stable
# Step 5: Rollback if issues are detected
```

## Real-world applications
- **Blue-Green**: Used by companies like Amazon and Netflix to ensure zero-downtime deployments.
- **Canary**: Employed by Google and Facebook to test new features on a small user base before full rollout.

## References
- [Martin Fowler on Blue-Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Google Cloud Canary Deployment](https://cloud.google.com/solutions/continuous-delivery-canary-pipelines)