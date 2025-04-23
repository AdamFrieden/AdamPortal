# Mutex vs Semaphore

> Mutex and Semaphore are synchronization primitives used to manage access to shared resources in concurrent programming.

## Overview
Mutexes and semaphores are synchronization tools used in concurrent programming to control access to shared resources, preventing race conditions and ensuring data consistency. They exist to coordinate threads or processes, allowing safe and efficient resource sharing.

## Core Idea / Mental Model
- **Mutex**: A lock mechanism that allows only one thread to access a resource at a time.
- **Semaphore**: A signaling mechanism that controls access to a resource pool, allowing multiple threads to access a limited number of instances.

## Key Features & Benefits
- **Mutex**:
  - Ensures exclusive access to a resource.
  - Simplicity in implementation for single-resource protection.
- **Semaphore**:
  - Allows multiple threads to access a limited number of resources.
  - Can be used for signaling between threads.

## Trade-offs & Pitfalls
- **Mutex**:
  - Can lead to deadlocks if not managed properly.
  - Overhead of context switching if frequently locked/unlocked.
- **Semaphore**:
  - More complex to implement and manage.
  - Risk of priority inversion and semaphore leaks.

## When to Use / When to Avoid
- **Use Mutex** when you need exclusive access to a single resource.
- **Use Semaphore** when managing access to a pool of resources.
- Avoid using mutexes for signaling between threads; semaphores are more suitable.

## Real-World Examples & Modern Alternatives
- **Mutex**: Used in operating systems for thread synchronization.
- **Semaphore**: Used in database connection pools.
- **Alternatives**: Read-write locks, condition variables, and concurrent data structures like `ConcurrentHashMap`.

## Common Misconceptions
- Mutexes and semaphores are not interchangeable; they serve different purposes.
- Mutexes do not inherently prevent deadlocks; careful design is required.

## Related Topics
- Deadlock and Livelock
- Thread Safety
- Condition Variables
- Read-Write Locks
- Concurrent Collections

## References
- [Mutexes and Semaphores in Operating Systems](https://www.geeksforgeeks.org/mutex-vs-semaphore/)
- [Concurrency in Java: Synchronization](https://docs.oracle.com/javase/tutorial/essential/concurrency/sync.html)