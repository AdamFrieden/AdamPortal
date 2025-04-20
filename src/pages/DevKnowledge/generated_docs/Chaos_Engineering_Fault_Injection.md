# Chaos Engineering / Fault Injection

> Chaos Engineering is a disciplined approach to identifying system weaknesses by intentionally injecting faults and observing system behavior. It aims to build resilient systems that can withstand unexpected disruptions.

## Core idea
- **Purposeful Disruption**: Introduce controlled failures to test system robustness.
- **Resilience Building**: Identify and address weaknesses before they cause real-world outages.
- **Proactive Testing**: Shift from reactive incident management to proactive resilience engineering.
- **System Understanding**: Gain insights into system behavior under stress, improving overall architecture.

## Key features
- **Controlled Experiments**: Conduct experiments in a controlled environment to minimize risk.
- **Hypothesis-Driven**: Formulate hypotheses about system behavior and validate them through experiments.
- **Automated Testing**: Use automation tools to consistently and safely inject faults.
- **Observability**: Leverage monitoring and logging to analyze system responses and gather data.

## Why / When / How
- **Why**: To ensure systems can handle unexpected failures, improve reliability, and enhance customer trust.
- **When**: Ideal for complex, distributed systems where traditional testing may not cover all failure modes.
- **How**: Use tools like Chaos Monkey, Gremlin, or Litmus to inject faults such as network latency, server crashes, or resource exhaustion.
- **Pitfalls**: Avoid in production environments without adequate safeguards. Ensure all stakeholders are informed and prepared for potential disruptions.

## Example / Walk-through
```pseudo
# Pseudo-code for a simple chaos experiment using a hypothetical tool
initialize_experiment("network_latency_injection")

define_hypothesis("Service A should handle 100ms network latency without errors")

inject_fault("network_latency", target="Service A", duration="5m", latency="100ms")

monitor_metrics(["response_time", "error_rate"], target="Service A")

validate_hypothesis()
```

## Real-world applications
- **Netflix**: Uses Chaos Monkey to randomly terminate instances in production to ensure service resilience.
- **Amazon**: Conducts game days to simulate large-scale failures and test recovery procedures.
- **Google**: Implements fault injection to test the reliability of its distributed systems.

## References
- [Principles of Chaos Engineering](https://principlesofchaos.org/)
- [Gremlin's Guide to Chaos Engineering](https://www.gremlin.com/chaos-engineering/)