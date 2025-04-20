# Apache Thrift

> Apache Thrift is a versatile, language-agnostic framework for scalable cross-language services development. It enables efficient communication between different programming languages, making it ideal for building distributed systems.

## Core idea
- **Cross-language Communication**: Thrift allows services written in different languages to communicate seamlessly, supporting a wide array of languages including C++, Java, Python, and more.
- **IDL (Interface Definition Language)**: Central to Thrift is its IDL, which defines data types and service interfaces, enabling automatic code generation for multiple languages.
- **Efficiency**: Designed for high performance, Thrift uses a binary protocol by default, which is compact and fast, reducing the overhead of data serialization and deserialization.
- **Scalability**: Thrift is built to handle large-scale systems, supporting both synchronous and asynchronous communication models.

## Key features
- **Multi-language Support**: Thrift supports over 20 programming languages, making it a versatile choice for heterogeneous environments.
- **Protocol and Transport Layer Abstraction**: Offers flexibility in choosing protocols (e.g., binary, JSON) and transport mechanisms (e.g., HTTP, sockets).
- **Service Versioning**: Facilitates backward compatibility and smooth upgrades through service versioning.
- **Extensible and Modular**: Allows customization and extension of protocols and transports to meet specific needs.

## Why / When / How
- **Why Use Thrift**: Ideal for organizations needing to integrate diverse systems or services written in different languages. It simplifies service development and deployment in microservices architectures.
- **When to Use Thrift**: Best suited for high-performance, cross-language RPC (Remote Procedure Call) systems where efficiency and scalability are critical.
- **Common Pitfalls**: Not ideal for simple systems where the overhead of setting up Thrift outweighs its benefits. Also, the learning curve can be steep for teams unfamiliar with IDL-based development.

## Example / Walk-through
```thrift
// Define a simple service in Thrift IDL
service Calculator {
  i32 add(1: i32 num1, 2: i32 num2),
  i32 subtract(1: i32 num1, 2: i32 num2)
}

// Generate code for desired languages
# thrift --gen java calculator.thrift
# thrift --gen py calculator.thrift
```

## Real-world applications
- **Facebook**: Originally developed at Facebook, Thrift is used for internal services to enable cross-language communication.
- **Twitter**: Utilizes Thrift for backend services, leveraging its efficiency and language support.
- **Evernote**: Employs Thrift for its API, allowing clients in various languages to interact with its services.

## References
- [Apache Thrift Official Documentation](https://thrift.apache.org/docs)
- [Thrift: Scalable Cross-Language Services Implementation](https://thrift.apache.org/static/files/thrift-20070401.pdf)