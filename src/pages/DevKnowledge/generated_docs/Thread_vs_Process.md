# Thread vs Process

> Threads and processes are fundamental units of execution in computing, each with distinct characteristics and use cases.

## Overview
Threads and processes are essential for multitasking in operating systems. A process is an independent program in execution with its own memory space, while a thread is a smaller unit within a process that shares the same memory space, allowing for more efficient communication and resource sharing.

## Core Idea / Mental Model
- **Process**: Isolated execution environment; heavy-weight; separate memory.
- **Thread**: Lightweight execution unit; shares memory with other threads in the same process.

## Key Features & Benefits
- **Processes**:
  - Isolation: Each process runs independently, enhancing stability and security.
  - Robustness: Crashing one process doesn't affect others.
- **Threads**:
  - Efficiency: Lower overhead due to shared memory.
  - Responsiveness: Ideal for tasks requiring frequent context switching.

## Trade-offs & Pitfalls
- **Processes**:
  - Overhead: Higher resource consumption due to separate memory spaces.
  - Communication: Inter-process communication (IPC) can be complex and slower.
- **Threads**:
  - Safety: Shared memory increases the risk of race conditions and requires careful synchronization.
  - Debugging: More challenging due to concurrent execution paths.

## When to Use / When to Avoid
- **Use Processes** when isolation and stability are priorities, such as in microservices or when running untrusted code.
- **Use Threads** for tasks that require high concurrency and low latency, like handling multiple client requests in a web server.

## Real-World Examples & Modern Alternatives
- **Processes**: Docker containers, microservices architecture.
- **Threads**: Java's `ExecutorService`, Python's `threading` module.
- **Alternatives**: Asynchronous programming (e.g., Node.js, Python's `asyncio`).

## Common Misconceptions
- "Threads are always faster than processes": Not necessarily; depends on the workload and context.
- "Processes can't share data": They can, but it requires explicit IPC mechanisms.

## Related Topics
- Concurrency vs. Parallelism
- Asynchronous Programming
- Inter-process Communication (IPC)
- Synchronization Techniques
- Microservices Architecture

## References
- [Operating System Concepts by Silberschatz, Galvin, and Gagne](https://www.os-book.com/)
- [Concurrency in Go: Tools and Techniques for Developers](https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/)