# Rate Limiting

> Rate limiting controls the frequency of actions to prevent abuse and ensure system stability.

## Overview
Rate limiting is a technique used to control the amount of incoming or outgoing traffic to or from a network or service. It exists to prevent system overload, ensure fair resource distribution, and protect against abuse or denial-of-service attacks.

## Core Idea / Mental Model
- Limit the number of requests a user or client can make to a service within a specified time frame.
- Implemented using algorithms like token bucket, leaky bucket, or fixed window counters.

## Key Features & Benefits
- **Prevents Overload**: Protects services from being overwhelmed by too many requests.
- **Ensures Fairness**: Distributes resources equitably among users.
- **Enhances Security**: Mitigates the risk of denial-of-service attacks.
- **Improves Performance**: Maintains optimal performance by controlling traffic flow.

## Trade-offs & Pitfalls
- **User Experience**: Can lead to poor user experience if limits are too strict.
- **Complexity**: Implementing and tuning rate limits can be complex.
- **False Positives**: Legitimate users may be blocked if limits are not well-calibrated.

## When to Use / When to Avoid
- **Use**: When protecting APIs, preventing abuse, or managing limited resources.
- **Avoid**: In scenarios where real-time access is critical and cannot tolerate delays.

## Real-World Examples & Modern Alternatives
- **Tools**: NGINX, AWS API Gateway, and Cloudflare offer built-in rate limiting features.
- **Alternatives**: Circuit breakers and load balancers can complement rate limiting.

## Common Misconceptions
- **One-size-fits-all**: Rate limits must be tailored to specific use cases.
- **Set and Forget**: Requires ongoing monitoring and adjustment.

## Related Topics
- **Load Balancing**
- **Circuit Breakers**
- **API Gateway**
- **Throttling**
- **Denial-of-Service (DoS) Protection**

## References
- [Rate Limiting Strategies and Techniques](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)  
- [Understanding Rate Limiting](https://developer.mozilla.org/en-US/docs/Web/HTTP/Rate_limiting)