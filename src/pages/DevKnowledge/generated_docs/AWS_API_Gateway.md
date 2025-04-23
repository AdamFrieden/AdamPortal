# AWS API Gateway

> AWS API Gateway is a fully managed service for creating, publishing, maintaining, monitoring, and securing APIs at any scale.

## Overview
AWS API Gateway is a service that enables developers to create and manage APIs that act as a "front door" for applications to access data, business logic, or functionality from backend services. It exists to simplify the process of building scalable and secure APIs, allowing developers to focus on their application logic rather than infrastructure management.

## Core Idea / Mental Model
- Acts as an intermediary between clients and backend services, handling all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls.
- Provides a unified interface for various backend services, including AWS Lambda, HTTP endpoints, and other AWS services.

## Key Features & Benefits
- **Scalability**: Automatically scales to handle the volume of requests.
- **Security**: Offers built-in security features like AWS IAM, Amazon Cognito, and API keys.
- **Monitoring**: Integrates with AWS CloudWatch for logging and monitoring API usage.
- **Cost-Effective**: Pay-as-you-go pricing model with no upfront costs.
- **Integration**: Seamlessly integrates with AWS Lambda, enabling serverless architectures.

## Trade-offs & Pitfalls
- **Latency**: May introduce latency due to additional network hops.
- **Complexity**: Can become complex when managing multiple APIs and stages.
- **Vendor Lock-in**: Tightly coupled with AWS ecosystem, which may limit portability.

## When to Use / When to Avoid
- **Use**: When building serverless applications, requiring rapid scaling, or needing to expose AWS services securely.
- **Avoid**: When low latency is critical, or when you need a multi-cloud strategy.

## Real-World Examples & Modern Alternatives
- **Examples**: RESTful APIs for mobile applications, microservices architectures.
- **Alternatives**: Kong, Apigee, and Azure API Management.

## Common Misconceptions
- **Myth**: API Gateway can only be used with AWS Lambda.
  - **Fact**: It supports various backend services, including HTTP endpoints and AWS services.
- **Myth**: It is only for REST APIs.
  - **Fact**: Supports REST, HTTP, and WebSocket APIs.

## Related Topics
- AWS Lambda
- Amazon CloudFront
- AWS IAM
- Serverless Architecture
- Microservices

## References
- [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)  
- [AWS API Gateway Pricing](https://aws.amazon.com/api-gateway/pricing/)