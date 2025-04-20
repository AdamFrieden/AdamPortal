# Failure Modes & Effects Analysis (FMEA)

> FMEA is a systematic method for identifying potential failure modes within a system, assessing their impact, and prioritizing actions to mitigate risks. It is crucial for enhancing reliability and safety in complex systems.

## Core idea
- **Systematic Approach**: FMEA is a structured technique to identify and evaluate potential failures in a system, process, or design.
- **Risk Assessment**: It helps in assessing the severity, occurrence, and detection of failure modes, allowing teams to prioritize risks.
- **Preventive Action**: By identifying potential failures early, FMEA facilitates proactive measures to prevent or mitigate these issues.
- **Cross-Disciplinary**: Useful across various domains, including software, hardware, and process engineering.

## Key features
- **Failure Mode Identification**: Enumerates all possible ways a component or process could fail.
- **Effects Analysis**: Evaluates the consequences of each failure mode on system operations.
- **Risk Priority Number (RPN)**: Calculates a score based on severity, occurrence, and detection to prioritize risks.
- **Iterative Process**: FMEA is an ongoing process that evolves with system changes and new insights.

## Why / When / How
- **Why Use FMEA**: To enhance system reliability, safety, and performance by preemptively addressing potential failures.
- **When to Use**: During the design phase of a project, before implementing changes, or when analyzing existing systems for improvements.
- **How to Use**: Assemble a cross-functional team, list potential failure modes, assess their impact, and prioritize actions based on RPN.
- **Common Pitfalls**: Overlooking potential failure modes, underestimating the severity or likelihood of failures, and failing to update the FMEA as the system evolves.
- **When Not to Use**: For simple systems where the cost and effort of FMEA outweigh the benefits.

## Example / Walk-through
```pseudo
# Example FMEA Process
1. Identify System Components
2. List Potential Failure Modes for Each Component
3. Determine Effects of Each Failure Mode
4. Assign Severity (S), Occurrence (O), and Detection (D) Ratings
5. Calculate RPN = S * O * D
6. Prioritize Failure Modes Based on RPN
7. Develop Mitigation Strategies for High-RPN Items
8. Implement and Monitor Mitigation Actions
```

## Real-world applications
- **Automotive Industry**: Used extensively in designing and manufacturing vehicles to ensure safety and reliability.
- **Aerospace**: Critical for assessing risks in aircraft systems and components.
- **Software Development**: Applied in identifying potential software bugs and their impacts on system functionality.
- **Healthcare**: Used in medical device design and hospital processes to enhance patient safety.

## References
- [AIAG & VDA FMEA Handbook](https://www.aiag.org/store/publications/details?ProductCode=FMEA-4)
- [NASA's FMEA Guidelines](https://ntrs.nasa.gov/citations/20080036689)