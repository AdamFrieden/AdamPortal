# Disjoint Set (Union Find)

> Disjoint Set, also known as Union Find, is a data structure that efficiently handles the dynamic connectivity problem, allowing you to manage and merge disjoint sets. It is crucial in scenarios where you need to determine if two elements belong to the same set or to unite two sets.

## Core idea
- **Dynamic Connectivity**: The primary purpose is to manage a collection of disjoint (non-overlapping) sets and provide operations to unite sets and find the representative of a set.
- **Efficiency**: Utilizes two main operations, `Find` and `Union`, optimized to nearly constant time complexity using techniques like path compression and union by rank.
- **Representation**: Each set is represented by a tree, where each node points to its parent, and the root node is the representative of the set.

## Key features
- **Union Operation**: Combines two sets into a single set, ensuring that the resulting structure remains efficient.
- **Find Operation**: Determines the root representative of the set containing a particular element, often optimized with path compression to flatten the structure.
- **Path Compression**: A technique used during the `Find` operation to make the tree flat, speeding up future operations.
- **Union by Rank**: Ensures that the smaller tree is always added under the root of the larger tree, keeping the tree shallow.

## Why / When / How
- **Why Use**: Ideal for problems involving connectivity, such as network connectivity, image processing, and clustering.
- **When to Use**: When you need to efficiently manage and query dynamic connectivity among elements.
- **Common Pitfalls**: Not suitable for problems requiring frequent element insertions or deletions, as it does not support these operations efficiently.

## Example / Walk-through
```pseudo
Initialize: 
  Create an array `parent` where each element is its own parent.
  Create an array `rank` initialized to 0.

Find(x):
  if parent[x] != x:
    parent[x] = Find(parent[x])  # Path compression
  return parent[x]

Union(x, y):
  rootX = Find(x)
  rootY = Find(y)
  if rootX != rootY:
    if rank[rootX] > rank[rootY]:
      parent[rootY] = rootX
    else if rank[rootX] < rank[rootY]:
      parent[rootX] = rootY
    else:
      parent[rootY] = rootX
      rank[rootX] += 1
```

## Real-world applications
- **Network Connectivity**: Used to determine if two nodes in a network are connected.
- **Kruskal's Algorithm**: Utilized in finding the Minimum Spanning Tree of a graph.
- **Image Processing**: Helps in segmenting images into connected components.
- **Social Network Analysis**: Determines connected components in social graphs.

## References
- [Union-Find Algorithm - GeeksforGeeks](https://www.geeksforgeeks.org/union-find/)
- [Disjoint Set Union (DSU) - Topcoder](https://www.topcoder.com/thrive/articles/Disjoint%20Set%20Union)