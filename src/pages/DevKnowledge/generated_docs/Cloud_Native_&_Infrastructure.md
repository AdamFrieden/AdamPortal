# Cloud Native & Infrastructure

> Cloud Native leverages scalable, resilient, and manageable infrastructure to accelerate software delivery and innovation.

## Core idea
- **Microservices Architecture**: Breaks applications into independent services, enabling scalability and agility.
- **Containers**: Encapsulate applications, ensuring consistency across environments.
- **Orchestration**: Tools like Kubernetes manage container lifecycles, scaling, and deployment.
- **DevOps Integration**: Continuous integration and delivery (CI/CD) pipelines streamline development and deployment.
- **Infrastructure as Code (IaC)**: Automates infrastructure provisioning, enhancing repeatability and reducing errors.

## Key features
- **Scalability**: Automatically adjusts resources based on demand.
- **Resilience**: Fault-tolerant systems that recover from failures without downtime.
- **Portability**: Applications run consistently across different environments.
- **Observability**: Enhanced monitoring and logging for proactive issue resolution.
- **Automation**: Reduces manual intervention, speeding up deployment cycles.

## Why / When / How
- **Why**: To improve software delivery speed, reliability, and scalability.
- **When**: Ideal for dynamic, large-scale applications requiring frequent updates.
- **How**: Implement using cloud-native tools and practices like Kubernetes, Docker, and CI/CD pipelines.
- **Pitfalls**: Complexity in managing microservices, potential over-reliance on specific cloud providers, and security challenges in distributed systems.

## Example / Walk-through
```yaml
# Kubernetes Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-app-image:latest
        ports:
        - containerPort: 80
```

## Real-world applications
- **Netflix**: Uses microservices and cloud-native infrastructure for scalable streaming services.
- **Spotify**: Employs Kubernetes for managing its music streaming platform.
- **Airbnb**: Utilizes cloud-native technologies for its global accommodation platform.

## Sources
- [Kubernetes Official Documentation](https://kubernetes.io/docs/home/)
- [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/)