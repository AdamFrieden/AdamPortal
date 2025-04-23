# JSON

> JSON is a lightweight data interchange format that's easy for humans to read and write, and easy for machines to parse and generate.

## Overview
JSON (JavaScript Object Notation) is a text-based format used to represent structured data. It was derived from JavaScript but is language-independent, making it a popular choice for data interchange between systems, especially in web applications.

## Core Idea / Mental Model
- JSON structures data using key-value pairs and arrays, similar to how objects and arrays are represented in JavaScript.
- It is designed to be simple and universally readable, facilitating easy data exchange.

## Key Features & Benefits
- **Human-Readable**: JSON is easy to read and write for humans, enhancing collaboration and debugging.
- **Language-Independent**: While derived from JavaScript, JSON can be used with most programming languages.
- **Lightweight**: Its minimal syntax reduces data size, which is beneficial for network transmission.
- **Interoperable**: Widely supported across platforms and languages, making it ideal for web APIs.

## Trade-offs & Pitfalls
- **Limited Data Types**: JSON supports strings, numbers, objects, arrays, true, false, and null, but lacks support for more complex data types.
- **No Comments**: JSON does not support comments, which can make documentation within the data challenging.
- **Security Concerns**: JSON data can be vulnerable to injection attacks if not properly sanitized.

## When to Use / When to Avoid
- **Use**: When you need a simple, lightweight format for data interchange, especially in web APIs.
- **Avoid**: When dealing with complex data types or when comments within the data are necessary.

## Real-World Examples & Modern Alternatives
- **Examples**: RESTful APIs, configuration files, data storage for NoSQL databases like MongoDB.
- **Alternatives**: XML (for more complex data structures), Protocol Buffers (for efficient binary serialization).

## Common Misconceptions
- JSON is not limited to JavaScript; it is language-agnostic.
- JSON is not inherently secure; proper validation and sanitization are necessary.

## Related Topics
- XML
- YAML
- RESTful APIs
- Serialization
- Data Interchange Formats

## References
- [JSON Official Website](https://www.json.org/json-en.html)  
- [RFC 8259 - The JavaScript Object Notation (JSON) Data Interchange Format](https://tools.ietf.org/html/rfc8259)