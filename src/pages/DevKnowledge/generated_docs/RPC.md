# RPC

> Remote Procedure Call (RPC) allows a program to execute a procedure on a remote server as if it were local.

## Overview
RPC is a protocol that enables one program to request a service from a program located on another computer in a network. It abstracts the complexity of network communication, allowing developers to invoke functions on remote systems as if they were local calls. This is particularly useful for distributed systems where components need to interact seamlessly.

## Core Idea / Mental Model
- RPC abstracts network communication, making remote interactions appear as local function calls.
- It simplifies distributed computing by handling data serialization, transmission, and response parsing.

## Key Features & Benefits
- **Simplicity**: Hides the complexity of network protocols.
- **Language Agnostic**: Supports multiple programming languages.
- **Efficiency**: Reduces the need for manual socket programming.
- **Scalability**: Facilitates the development of scalable distributed systems.

## Trade-offs & Pitfalls
- **Latency**: Network calls are inherently slower than local calls.
- **Error Handling**: Network failures can complicate error management.
- **Security**: Exposing services over a network can introduce vulnerabilities.
- **Tight Coupling**: Can lead to tightly coupled systems if not designed carefully.

## When to Use / When to Avoid
- **Use**: When building distributed systems requiring inter-process communication.
- **Avoid**: For simple applications where network overhead outweighs benefits or when loose coupling is a priority.

## Real-World Examples & Modern Alternatives
- **Examples**: gRPC, Apache Thrift, JSON-RPC.
- **Alternatives**: RESTful APIs, GraphQL, message queues like RabbitMQ or Kafka.

## Common Misconceptions
- **RPC is not REST**: RPC is a protocol, while REST is an architectural style.
- **RPC is not outdated**: Modern implementations like gRPC are widely used.

## Related Topics
- Microservices Architecture
- RESTful Services
- Message Queues
- Serialization Protocols
- Network Protocols

## References
- [gRPC: A high-performance, open-source universal RPC framework](https://grpc.io)
- [Remote Procedure Call (RPC) - Microsoft Docs](https://learn.microsoft.com/en-us/windows/win32/rpc/remote-procedure-calls)