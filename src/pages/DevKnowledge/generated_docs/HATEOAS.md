# HATEOAS

> HATEOAS enables dynamic client-server interactions by embedding hypermedia controls in API responses.

## Overview
HATEOAS (Hypermedia as the Engine of Application State) is a constraint of the REST application architecture. It allows clients to interact with a RESTful API entirely through hypermedia provided dynamically by server responses, reducing the need for hard-coded knowledge of the API structure.

## Core Idea / Mental Model
- Clients navigate the API using links and actions provided in the server's responses.
- The server guides the client through the application state transitions.

## Key Features & Benefits
- **Decoupled Client-Server**: Clients do not need prior knowledge of the API structure.
- **Dynamic Interaction**: The server can evolve without breaking existing clients.
- **Discoverability**: Clients can discover available actions and resources dynamically.

## Trade-offs & Pitfalls
- **Complexity**: Implementing HATEOAS can increase the complexity of both server and client.
- **Performance**: Additional data in responses may impact performance.
- **Adoption**: Limited adoption and tooling support compared to simpler REST implementations.

## When to Use / When to Avoid
- **Use**: When building highly dynamic systems where the API may change frequently.
- **Avoid**: In simple APIs where the overhead of hypermedia is unnecessary.

## Real-World Examples & Modern Alternatives
- **Examples**: GitHub API, PayPal API.
- **Alternatives**: GraphQL, gRPC, which offer different approaches to API design.

## Common Misconceptions
- **"REST requires HATEOAS"**: REST can be implemented without HATEOAS.
- **"HATEOAS is only about links"**: It's about guiding state transitions, not just linking resources.

## Related Topics
- RESTful API Design
- Hypermedia Formats (e.g., HAL, JSON-LD)
- API Versioning
- GraphQL
- gRPC

## References
- [Roy Fielding's Dissertation on REST](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)  
- [RESTful Web Services: The HATEOAS Constraint](https://restfulapi.net/hateoas/)