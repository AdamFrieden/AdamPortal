# Avro

> **Apache Avro** is a data serialization system that provides a compact, fast, binary data format. It is designed for data exchange in distributed systems, offering schema evolution and language interoperability.

## Core idea
- **Schema-based Serialization**: Avro uses JSON to define data schemas, ensuring that data is self-describing and can be easily interpreted by any system that understands the schema.
- **Compact Binary Format**: The binary encoding of data is compact, reducing storage and transmission costs.
- **Schema Evolution**: Avro supports schema evolution, allowing changes to the schema without breaking compatibility with existing data.
- **Language Interoperability**: Avro supports multiple programming languages, making it versatile for diverse system architectures.

## Key features
- **Dynamic Typing**: Unlike some serialization systems, Avro does not require code generation, allowing for dynamic typing and flexibility.
- **RPC Support**: Avro provides a framework for remote procedure calls (RPC), facilitating communication between services.
- **Compression**: Avro files can be compressed using codecs like Snappy and Deflate, optimizing storage and transmission.
- **Integration with Big Data**: Avro is widely used in big data ecosystems, particularly with Apache Hadoop and Apache Kafka, due to its efficiency and schema evolution capabilities.

## Why / When / How
- **Why Use Avro**: Ideal for systems requiring efficient serialization with schema evolution, such as data pipelines and microservices.
- **When to Use**: Best suited for environments where data interchange between heterogeneous systems is frequent, and schema changes are expected.
- **Common Pitfalls**: Not ideal for human-readable data formats; debugging can be challenging due to its binary nature. Avoid using Avro if schema evolution is not a concern or if human readability is a priority.

## Example / Walk-through
```pseudo
# Define an Avro schema in JSON
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "name", "type": "string"},
    {"name": "age", "type": "int"}
  ]
}

# Serialize data using Avro
avro_writer = AvroWriter(schema)
avro_writer.write({"name": "Alice", "age": 30})

# Deserialize data
avro_reader = AvroReader(schema)
user_data = avro_reader.read()
```

## Real-world applications
- **Apache Kafka**: Avro is commonly used with Kafka for efficient message serialization and schema management via the Confluent Schema Registry.
- **Hadoop Ecosystem**: Avro is a preferred format for data storage and interchange in Hadoop due to its compactness and schema evolution support.
- **Data Pipelines**: Companies like LinkedIn and Twitter use Avro for data serialization in their data processing pipelines, benefiting from its efficiency and schema evolution.

## References
- [Apache Avro Documentation](https://avro.apache.org/docs/current/)
- [Confluent Schema Registry](https://docs.confluent.io/platform/current/schema-registry/index.html)