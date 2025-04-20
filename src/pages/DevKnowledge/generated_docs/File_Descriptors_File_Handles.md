# File Descriptors / File Handles

> File descriptors (FDs) or file handles are integral to managing I/O operations in Unix-like operating systems. They abstract the complexity of interacting with files, sockets, and other I/O resources, enabling efficient resource management and process communication.

## Core Idea
- **Abstraction Layer**: File descriptors provide an abstraction for accessing files, sockets, pipes, and devices, allowing uniform handling of I/O operations.
- **Integer Identifiers**: They are non-negative integers that uniquely identify an open file or I/O resource within a process.
- **Resource Management**: FDs facilitate resource management by tracking open resources and ensuring proper allocation and deallocation.
- **Process Isolation**: Each process maintains its own FD table, ensuring isolation and preventing unintended interference between processes.

## Key Features
- **Standard Streams**: By convention, FDs 0, 1, and 2 are reserved for standard input, output, and error, respectively.
- **Inheritance**: Child processes inherit open FDs from their parent, enabling inter-process communication.
- **Select and Poll**: FDs can be monitored for readiness using system calls like `select()` and `poll()`, crucial for non-blocking I/O.
- **Duplication**: FDs can be duplicated using `dup()` and `dup2()`, allowing redirection of I/O streams.

## Why / When / How
- **Why Use**: FDs are essential for efficient I/O operations, enabling multiplexing and non-blocking I/O, which are critical for high-performance applications.
- **When to Use**: Use FDs when interacting with files, sockets, or any I/O resource in Unix-like systems. They are particularly useful in network programming and systems with concurrent I/O operations.
- **Common Pitfalls**: 
  - **Resource Leaks**: Failing to close FDs can lead to resource leaks, exhausting the available FD table.
  - **FD Limits**: Systems impose limits on the number of open FDs per process, which can be a bottleneck in high-load scenarios.
  - **Blocking Operations**: Mismanagement of blocking and non-blocking modes can lead to inefficient I/O operations.

## Example / Walk-through
```c
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd = open("example.txt", O_RDONLY); // Open file for reading
    if (fd == -1) {
        // Handle error
    }

    char buffer[100];
    ssize_t bytesRead = read(fd, buffer, sizeof(buffer)); // Read from file
    if (bytesRead == -1) {
        // Handle error
    }

    close(fd); // Close file descriptor
    return 0;
}
```

## Real-world Applications
- **Web Servers**: Use FDs to manage multiple client connections efficiently.
- **Database Systems**: Handle concurrent read/write operations using FDs.
- **Operating System Kernels**: Utilize FDs for managing system resources and inter-process communication.

## References
- [The Linux Programming Interface](https://man7.org/tlpi/) by Michael Kerrisk
- [POSIX Standard](https://pubs.opengroup.org/onlinepubs/9699919799/functions/V2_chap02.html) - The Open Group Base Specifications Issue 7