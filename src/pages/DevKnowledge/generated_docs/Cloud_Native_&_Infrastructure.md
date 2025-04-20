# Cloud Native & Infrastructure

> Cloud Native is a paradigm shift in software development and infrastructure management, emphasizing scalability, resilience, and agility through microservices, containers, and orchestration.

## Core idea
- **Microservices Architecture**: Breaks down applications into small, independent services that can be developed, deployed, and scaled independently.
- **Containers**: Encapsulate applications and their dependencies, ensuring consistency across environments.
- **Orchestration**: Tools like Kubernetes automate deployment, scaling, and management of containerized applications.
- **Infrastructure as Code (IaC)**: Manages infrastructure through code, enabling version control, automation, and repeatability.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Automates testing and deployment, reducing time-to-market and improving software quality.

## Key features
- **Scalability**: Easily scale applications horizontally by adding more instances of microservices.
- **Resilience**: Fault isolation in microservices ensures that failures in one service do not affect others.
- **Portability**: Containers ensure applications run consistently across different environments.
- **Automation**: Orchestration and IaC reduce manual intervention, minimizing human error.
- **Observability**: Enhanced monitoring and logging capabilities for better insight into application performance and issues.

## Why / When / How
- **Why**: Adopt cloud native to improve agility, reduce operational overhead, and enhance scalability.
- **When**: Ideal for dynamic, large-scale applications requiring frequent updates and rapid scaling.
- **How**: Start with containerizing applications, implement CI/CD pipelines, and use orchestration tools like Kubernetes.
- **Pitfalls**: Avoid for small, static applications where the overhead of managing microservices and containers outweighs benefits. Complexity can increase operational challenges without proper expertise.

## Example / Walk-through
```pseudo
# Deploying a simple microservice with Kubernetes
# Step 1: Define a Dockerfile for the microservice
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "app.js"]

# Step 2: Build and push the Docker image
docker build -t my-microservice:latest .
docker push my-repo/my-microservice:latest

# Step 3: Create a Kubernetes Deployment YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-microservice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-microservice
  template:
    metadata:
      labels:
        app: my-microservice
    spec:
      containers:
      - name: my-microservice
        image: my-repo/my-microservice:latest
        ports:
        - containerPort: 8080

# Step 4: Apply the deployment
kubectl apply -f deployment.yaml
```

## Real-world applications
- **Netflix**: Uses microservices and containers to deliver streaming services at scale.
- **Spotify**: Employs cloud native practices for rapid deployment and scaling of its music streaming platform.
- **Airbnb**: Utilizes Kubernetes for efficient resource management and scaling of its services.

## References
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/)