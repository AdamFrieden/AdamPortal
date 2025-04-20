# Incident Command & Post Mortem Culture

> Incident Command and Post Mortem Culture are essential for effective incident management and continuous improvement in software systems. They provide structured approaches to handle incidents and learn from them, minimizing future risks.

## Core idea
- **Incident Command System (ICS)**: A standardized approach to incident management, ensuring clear roles and responsibilities during an incident.
- **Post Mortem Culture**: A practice of analyzing incidents after resolution to understand root causes and prevent recurrence.
- **Importance**: Both practices aim to enhance system reliability, improve response times, and foster a culture of learning and accountability.

## Key features
- **Clear Roles**: ICS assigns specific roles (Incident Commander, Communications Lead, etc.) to streamline decision-making and communication.
- **Structured Process**: Provides a framework for incident response, ensuring consistency and efficiency.
- **Root Cause Analysis**: Post mortems focus on identifying the underlying causes of incidents, not just symptoms.
- **Blameless Environment**: Encourages open discussion and learning without fear of punishment, promoting transparency and trust.
- **Continuous Improvement**: Insights from post mortems are used to improve processes, tools, and systems.

## Why / When / How
- **Why**: To manage incidents effectively, reduce downtime, and improve system resilience.
- **When**: Use during any significant incident affecting system performance or availability.
- **How**: Implement ICS during incidents and conduct post mortems after resolution to document findings and action items.
- **Pitfalls**: Avoid blame-focused post mortems; ensure participation from all relevant stakeholders. ICS can be overkill for minor incidents.

## Example / Walk-through
```pseudo
# Incident Command Process
1. Incident occurs
2. Incident Commander (IC) is appointed
3. IC assigns roles: Operations, Communications, etc.
4. IC coordinates response efforts
5. Incident resolved

# Post Mortem Process
1. Schedule post mortem meeting
2. Gather data and timeline of events
3. Conduct root cause analysis
4. Identify action items
5. Document findings and share with team
```

## Real-world applications
- **Tech Companies**: Companies like Google and Netflix use ICS and post mortems to manage large-scale incidents and improve system reliability.
- **Emergency Services**: ICS is widely used in emergency management for natural disasters and public safety incidents.

## References
- [Google's Site Reliability Engineering Book](https://sre.google/sre-book/table-of-contents/)
- [Netflix Tech Blog on Post Mortems](https://netflixtechblog.com/tagged/post-mortem)