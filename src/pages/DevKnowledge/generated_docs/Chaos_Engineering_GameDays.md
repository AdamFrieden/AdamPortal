# Chaos Engineering / GameDays

> Chaos Engineering is a disciplined approach to identifying potential failures before they become outages. GameDays are structured events to practice and improve system resilience.

## Core idea
- **Proactive Resilience Testing**: Chaos Engineering involves intentionally injecting failures into a system to test its ability to withstand and recover from unexpected disruptions.
- **Hypothesis-Driven Experiments**: It relies on forming hypotheses about system behavior under failure conditions and validating them through controlled experiments.
- **Continuous Improvement**: The goal is to uncover weaknesses and improve system robustness, leading to more resilient architectures.

## Key features
- **Fault Injection**: Simulate failures such as server crashes, network latency, or resource exhaustion to observe system behavior.
- **Observability**: Requires robust monitoring and logging to analyze the impact of injected failures.
- **Automated Experiments**: Tools like Chaos Monkey automate the process of introducing failures, enabling consistent and repeatable experiments.
- **GameDays**: These are scheduled events where teams practice responding to simulated failures, enhancing their incident response skills.

## Why / When / How
- **Why**: To ensure systems can handle real-world failures gracefully, reducing downtime and improving user experience.
- **When**: Best used in production-like environments where the impact of failures can be observed without affecting end-users.
- **How**: Start with small-scale experiments in non-critical environments, gradually increasing complexity and scope.
- **Pitfalls**: Avoid using Chaos Engineering in systems without adequate monitoring or in environments where failures can cause significant harm.

## Example / Walk-through
```pseudo
# Example Chaos Experiment using a hypothetical tool
1. Define Hypothesis: "If a database node fails, the application should continue to serve requests."
2. Select Target: Identify the database cluster as the target for the experiment.
3. Inject Failure: Simulate a node failure by terminating a database instance.
4. Observe: Monitor application performance and error rates.
5. Analyze Results: Validate if the hypothesis holds true and identify any unexpected issues.
6. Iterate: Refine the system and repeat the experiment to ensure resilience.
```

## Real-world applications
- **Netflix**: Pioneered Chaos Engineering with Chaos Monkey, improving the resilience of their streaming service.
- **Amazon**: Conducts GameDays to simulate large-scale outages and train teams in incident response.
- **Google**: Uses similar practices to ensure the reliability of their cloud services.

## References
- [Principles of Chaos Engineering](https://principlesofchaos.org/)
- [Netflix Tech Blog on Chaos Monkey](https://netflixtechblog.com/the-netflix-simian-army-16e57fbab116)