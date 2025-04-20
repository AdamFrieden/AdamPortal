# Domain Driven Design (DDD) & Bounded Contexts

> Domain Driven Design (DDD) is a strategic approach to software development that emphasizes collaboration between technical and domain experts to create a shared understanding of the problem space. Bounded Contexts are a core concept in DDD, providing a clear boundary within which a particular domain model is defined and applicable.

## Core idea
- **Domain-Centric Approach**: DDD focuses on the core domain and domain logic, prioritizing the business's needs and language.
- **Ubiquitous Language**: Establishes a common language shared by developers and domain experts to ensure clarity and alignment.
- **Bounded Contexts**: Defines explicit boundaries within which a particular model is valid, reducing ambiguity and complexity.
- **Strategic Design**: Encourages a high-level view of the system architecture, aligning technical solutions with business goals.

## Key features
- **Modeling Complexity**: DDD is adept at handling complex domains by breaking them into manageable parts.
- **Context Maps**: Visual tools to represent relationships and interactions between different Bounded Contexts.
- **Layered Architecture**: Promotes separation of concerns through layers like Domain, Application, and Infrastructure.
- **Aggregate Roots**: Central entities that ensure consistency within a Bounded Context.

## Why / When / How
- **When to Use**: Ideal for complex domains where business logic is intricate and evolving. Suitable for large-scale enterprise systems.
- **Why Use**: Facilitates better communication, reduces misinterpretations, and aligns software design with business needs.
- **Common Pitfalls**: Avoid using DDD for simple CRUD applications where the overhead may not be justified. Misidentifying Bounded Contexts can lead to integration challenges.

## Example / Walk-through
```pseudo
# Example of Bounded Contexts in an E-commerce System

# Bounded Context: Order Management
class Order {
    addItem(Product product, int quantity)
    calculateTotal()
    confirmOrder()
}

# Bounded Context: Inventory Management
class Inventory {
    checkStock(Product product)
    updateStock(Product product, int quantity)
}

# Context Map
# [Order Management] <-> [Inventory Management]
# Orders depend on inventory availability
```

## Real-world applications
- **E-commerce Platforms**: Separating order processing, inventory management, and customer service into distinct Bounded Contexts.
- **Banking Systems**: Distinct contexts for account management, transaction processing, and fraud detection.
- **Healthcare Systems**: Managing patient records, billing, and appointment scheduling as separate contexts.

## References
- [Domain-Driven Design Reference by Eric Evans](https://www.domainlanguage.com/ddd/reference/)
- [Microsoft's Guide to Domain-Driven Design](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis)