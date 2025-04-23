# Token Bucket Algorithm

> A rate-limiting algorithm that controls data flow by allowing bursts while maintaining a steady average rate.

## Overview
The Token Bucket Algorithm is a network traffic management technique used to control the amount of data that can be sent over a network. It exists to ensure that systems can handle bursts of traffic without exceeding a specified average data rate, providing a balance between flexibility and control.

## Core Idea / Mental Model
- Imagine a bucket that fills with tokens at a constant rate. Each token represents permission to send a unit of data.
- Data can only be sent if there are enough tokens in the bucket, allowing for bursts up to the bucket's capacity.
- If the bucket is empty, data transmission must wait until more tokens are added.

## Key Features & Benefits
- **Flexibility**: Allows for short bursts of traffic while maintaining a long-term average rate.
- **Simplicity**: Easy to implement and understand.
- **Fairness**: Ensures that no single user or process can monopolize bandwidth.

## Trade-offs & Pitfalls
- **Latency**: Can introduce delays if the bucket is empty and tokens need to accumulate.
- **Complexity in Configuration**: Requires careful tuning of token generation rate and bucket size.
- **Not Suitable for All Traffic Patterns**: May not be ideal for highly variable or unpredictable traffic.

## When to Use / When to Avoid
- **Use**: When you need to control bandwidth usage and allow for occasional bursts without exceeding a defined average rate.
- **Avoid**: In scenarios with highly unpredictable traffic patterns or where latency is a critical concern.

## Real-World Examples & Modern Alternatives
- **Examples**: Network routers and switches often use token bucket algorithms for rate limiting.
- **Alternatives**: Leaky Bucket Algorithm, Hierarchical Token Bucket (HTB), and Fair Queuing.

## Common Misconceptions
- **Myth**: Token Bucket is the same as Leaky Bucket.  
  *Reality*: While similar, Token Bucket allows bursts, whereas Leaky Bucket enforces a strict output rate.
- **Myth**: It eliminates all network congestion.  
  *Reality*: It controls rate but does not prevent congestion entirely.

## Related Topics
- Rate Limiting
- Quality of Service (QoS)
- Traffic Shaping
- Leaky Bucket Algorithm
- Congestion Control

## References
- [RFC 2697 - A Single Rate Three Color Marker](https://datatracker.ietf.org/doc/html/rfc2697)  
- [Wikipedia - Token Bucket](https://en.wikipedia.org/wiki/Token_bucket)