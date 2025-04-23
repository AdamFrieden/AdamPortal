# AWS Lambda

> AWS Lambda is a serverless compute service that automatically manages the execution of your code in response to events.

## Overview
AWS Lambda allows developers to run code without provisioning or managing servers. It exists to simplify the deployment and scaling of applications by abstracting infrastructure management, enabling developers to focus on writing code.

## Core Idea / Mental Model
- Event-driven: Execute code in response to triggers such as HTTP requests, file uploads, or database changes.
- Stateless: Each invocation is independent, with no persistent state between executions.
- Pay-per-use: Charges are based on the number of requests and the duration of code execution.

## Key Features & Benefits
- **Automatic Scaling**: Scales automatically with the number of requests.
- **Cost Efficiency**: Pay only for the compute time you consume.
- **Integration**: Seamlessly integrates with other AWS services like S3, DynamoDB, and API Gateway.
- **Language Support**: Supports multiple programming languages including Python, Java, Node.js, and more.
- **Security**: Managed security and compliance, with fine-grained access control via AWS IAM.

## Trade-offs & Pitfalls
- **Cold Starts**: Initial execution latency can be higher due to container initialization.
- **Execution Time Limit**: Maximum execution time is 15 minutes per invocation.
- **Resource Limits**: Limited memory and storage per function, which may not suit all workloads.
- **Complexity in Debugging**: Debugging distributed serverless applications can be challenging.

## When to Use / When to Avoid
- **Use**: For event-driven applications, microservices, and tasks with unpredictable workloads.
- **Avoid**: For long-running processes, applications requiring persistent connections, or when fine-grained control over infrastructure is necessary.

## Real-World Examples & Modern Alternatives
- **Examples**: Real-time file processing, RESTful APIs, IoT data processing.
- **Alternatives**: Google Cloud Functions, Azure Functions, or container orchestration with Kubernetes for more control.

## Common Misconceptions
- **Myth**: Lambda is always cheaper than traditional servers.
- **Myth**: Lambda is suitable for all types of applications.

## Related Topics
- Serverless Architecture
- AWS API Gateway
- Event-Driven Programming
- Microservices
- AWS Step Functions

## References
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)  
- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)