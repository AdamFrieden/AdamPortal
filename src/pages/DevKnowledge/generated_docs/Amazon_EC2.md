# Amazon EC2

> Amazon EC2 provides scalable computing capacity in the cloud, enabling flexible and cost-effective infrastructure management.

## Overview
Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers by offering a variety of instance types tailored to different use cases, allowing businesses to scale their infrastructure according to demand.

## Core Idea / Mental Model
- Think of EC2 as virtual servers in the cloud that can be provisioned and scaled on-demand.
- It abstracts the complexities of physical hardware, offering flexibility and scalability.

## Key Features & Benefits
- **Scalability**: Easily scale up or down based on demand.
- **Variety of Instance Types**: Choose from a wide range of instance types optimized for different workloads.
- **Cost-Effective**: Pay-as-you-go pricing model with options for reserved and spot instances for cost savings.
- **Integration**: Seamlessly integrates with other AWS services like S3, RDS, and VPC.
- **Global Reach**: Deploy instances in multiple regions and availability zones for redundancy and low latency.

## Trade-offs & Pitfalls
- **Complexity**: Requires understanding of AWS ecosystem and best practices for optimal use.
- **Cost Management**: Without proper monitoring, costs can escalate quickly.
- **Security**: Shared responsibility model requires users to manage their own security configurations.

## When to Use / When to Avoid
- **Use**: When you need flexible, scalable compute resources for variable workloads or want to avoid upfront hardware investments.
- **Avoid**: For simple, static websites or applications with minimal compute needs where simpler services like AWS Lambda or Lightsail might suffice.

## Real-World Examples & Modern Alternatives
- **Examples**: Hosting web applications, batch processing, big data analytics.
- **Alternatives**: Google Compute Engine, Microsoft Azure Virtual Machines, AWS Lambda for serverless computing.

## Common Misconceptions
- **Myth**: EC2 is always the cheapest option.
  - **Fact**: Costs vary based on usage patterns; other AWS services may be more cost-effective for specific use cases.
- **Myth**: EC2 automatically scales without configuration.
  - **Fact**: Auto Scaling must be configured to manage scaling.

## Related Topics
- AWS Lambda
- Amazon S3
- AWS Auto Scaling
- Amazon VPC
- AWS IAM

## References
- [Amazon EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)  
- [AWS EC2 Pricing](https://aws.amazon.com/ec2/pricing/)