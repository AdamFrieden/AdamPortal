# SLA vs SLO vs SLI

> SLA, SLO, and SLI are key metrics for defining, measuring, and managing service reliability and performance.

## Overview
Service Level Agreements (SLAs), Service Level Objectives (SLOs), and Service Level Indicators (SLIs) are frameworks used to ensure that services meet expected performance and reliability standards. They exist to align service providers and consumers on expectations and to provide measurable benchmarks for service quality.

## Core Idea / Mental Model
- **SLA**: A formal agreement between a service provider and a customer detailing the expected service levels.
- **SLO**: Specific, measurable targets within an SLA that define the expected level of service.
- **SLI**: Metrics used to quantify the performance of a service, forming the basis for SLOs.

## Key Features & Benefits
- **SLAs** provide a contractual basis for service expectations and penalties.
- **SLOs** offer clear, measurable targets that guide operational focus.
- **SLIs** enable precise monitoring and reporting of service performance.
- Together, they foster transparency and accountability between providers and consumers.

## Trade-offs & Pitfalls
- Overly ambitious SLOs can lead to frequent SLA breaches.
- Poorly defined SLIs may not accurately reflect user experience.
- SLAs can become outdated if not regularly reviewed and updated.

## When to Use / When to Avoid
- **Use** when formalizing service expectations and ensuring accountability is critical.
- **Avoid** if the overhead of managing these metrics outweighs the benefits, such as in small, informal projects.

## Real-World Examples & Modern Alternatives
- **Examples**: Cloud service providers like AWS and Google Cloud use SLAs to define uptime guarantees.
- **Alternatives**: Internal service dashboards and real-time monitoring tools can complement or replace formal SLAs in some contexts.

## Common Misconceptions
- SLAs are not the same as SLOs; SLAs are agreements, while SLOs are specific targets.
- SLIs are not subjective; they are quantifiable metrics.

## Related Topics
- **Monitoring and Observability**: Understanding how to track and analyze service performance.
- **Incident Management**: Processes for handling service disruptions.
- **DevOps**: Practices that integrate development and operations for improved service delivery.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Automating and improving software delivery.
- **ITIL (Information Technology Infrastructure Library)**: Framework for IT service management.

## References
- [Google SRE Book - SLIs, SLOs, and SLAs](https://sre.google/sre-book/service-level-objectives/)
- [AWS Service Level Agreements](https://aws.amazon.com/legal/service-level-agreements/)