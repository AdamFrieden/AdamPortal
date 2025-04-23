# SQL Injection

> SQL Injection is a code injection technique that exploits vulnerabilities in an application's software to manipulate its database.

## Overview
SQL Injection is a security vulnerability that allows an attacker to interfere with the queries an application makes to its database. It exists due to improper validation and sanitization of user inputs, allowing attackers to execute arbitrary SQL code.

## Core Idea / Mental Model
- SQL Injection occurs when user input is directly included in SQL queries without proper validation or escaping.
- Attackers can manipulate queries to access unauthorized data, modify database contents, or execute administrative operations.

## Key Features & Benefits
- **Exploitation of Vulnerabilities**: Allows attackers to bypass authentication and access sensitive data.
- **Data Manipulation**: Enables unauthorized data retrieval, modification, or deletion.
- **Broad Impact**: Affects any application that constructs SQL queries from user input without proper safeguards.

## Trade-offs & Pitfalls
- **Security Risks**: Can lead to data breaches, loss of data integrity, and unauthorized access.
- **Complex Mitigation**: Requires thorough input validation and parameterized queries to prevent.
- **Performance Overhead**: Implementing security measures may introduce additional processing time.

## When to Use / When to Avoid
- **Use**: As a cautionary tale to highlight the importance of secure coding practices.
- **Avoid**: In any production environment; always use parameterized queries and input validation to prevent SQL Injection.

## Real-World Examples & Modern Alternatives
- **Parameterized Queries**: Use prepared statements in languages like Java, PHP, and Python to prevent injection.
- **ORMs (Object-Relational Mappers)**: Tools like Hibernate or Entity Framework abstract database interactions, reducing injection risks.
- **Web Application Firewalls (WAFs)**: Provide an additional layer of security by filtering out malicious inputs.

## Common Misconceptions
- **"Only affects SQL databases"**: SQL Injection can target any system that constructs SQL queries from user input.
- **"Sanitizing inputs is enough"**: While important, input sanitization alone is insufficient without parameterized queries.

## Related Topics
- Parameterized Queries
- Cross-Site Scripting (XSS)
- Secure Coding Practices
- Web Application Security
- Object-Relational Mapping (ORM)

## References
- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)  
- [NIST SQL Injection Prevention](https://csrc.nist.gov/glossary/term/sql_injection)