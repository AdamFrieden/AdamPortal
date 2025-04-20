# Heap vs Stack

> Understanding the differences between heap and stack memory is crucial for efficient memory management and performance optimization in software development.

## Core idea
- **Stack**: A region of memory that stores temporary variables created by functions. It operates in a last-in, first-out (LIFO) manner, which makes it fast for allocation and deallocation.
- **Heap**: A region of memory used for dynamic memory allocation where variables are allocated and freed in an arbitrary order. It provides more flexibility but is generally slower than stack due to the overhead of managing free memory.

## Key features
- **Stack**:
  - **Speed**: Fast allocation and deallocation due to LIFO structure.
  - **Scope**: Variables are automatically deallocated when the function exits.
  - **Size Limit**: Limited by the stack size, which can lead to stack overflow if exceeded.
  - **Thread Safety**: Each thread has its own stack, making it inherently thread-safe.
  
- **Heap**:
  - **Flexibility**: Allows for dynamic memory allocation and deallocation.
  - **Size**: Limited only by the system's memory, not by a predefined size.
  - **Management**: Requires explicit allocation (`malloc`, `new`) and deallocation (`free`, `delete`).
  - **Fragmentation**: Can suffer from memory fragmentation over time.

## Why / When / How
- **Stack**:
  - **Use when**: You need fast access to memory and have a predictable lifetime for variables.
  - **Avoid when**: You need large amounts of memory or dynamic memory allocation.
  - **Pitfalls**: Stack overflow can occur if too much memory is used, typically due to deep recursion or large local variables.

- **Heap**:
  - **Use when**: You need dynamic memory allocation or large data structures.
  - **Avoid when**: Performance is critical and the overhead of allocation/deallocation is a concern.
  - **Pitfalls**: Memory leaks can occur if memory is not properly deallocated, and fragmentation can degrade performance.

## Example / Walk-through
```pseudo
function example() {
    // Stack allocation
    int a = 10;
    int b = 20;
    
    // Heap allocation
    int* ptr = new int;
    *ptr = 30;
    
    // Use variables
    print(a + b + *ptr);
    
    // Heap deallocation
    delete ptr;
}
```

## Real-world applications
- **Stack**:
  - Used in function call management, local variable storage, and control flow.
  - Ideal for embedded systems where memory size is constrained.
  
- **Heap**:
  - Used in applications requiring dynamic data structures like linked lists, trees, and graphs.
  - Common in GUI applications where objects are created and destroyed frequently.

## Sources
- [Microsoft Docs on Memory Management](https://learn.microsoft.com/en-us/cpp/cpp/memory-allocation)
- [Oracle Java Documentation on Memory Management](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-2.html#jvms-2.5.4)