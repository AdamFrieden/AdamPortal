# Systems Engineering Master Concepts List (v3)

*Last updated: April 20 2025*

---

## 🔢 Data Structures for Storage & Indexing
- **B‑Tree**
- **B+ Tree**
- **LSM Tree** (Log‑Structured Merge Tree)
- **SSTable** (Sorted String Table)
- **Skip List**
- **Trie** (Prefix Tree)
- **Hash Table**
- **Bloom Filter**
- **Counting Bloom Filter / Cuckoo Filter**
- **Merkle Tree**
- **Segment Tree / Interval Tree**
- **R‑Tree / R\*‑Tree**
- **Quadtree / Octree**
- **Suffix Array / FM‑Index / Burrows‑Wheeler Transform**
- **Disjoint‑Set (Union‑Find)**
- **Count‑Min Sketch / HyperLogLog**

---

## 📦 Storage Engine Concepts
- **Page‑based Storage**
- **Write‑Ahead Log (WAL)**
- **Checkpointing**
- **Indexing Strategies**
  - Primary vs Secondary Index
  - Clustered vs Non‑clustered Index
- **Compaction**
- **Buffer Pool / Cache Layer**
- **Tombstones** (for deletes in LSM trees)
- **Cold vs Hot Storage**
- **Log‑Structured File System (LFS)**
- **Shadow Paging**
- **Zoned Storage / SMR Drives**
- **Write Amplification & Read Amplification**

---

## 💽 Filesystem & Block‑Level Concepts
- **Virtual File Systems (VFS)**
- **Inodes, Blocks, Extents**
- **Journaling Filesystems**
- **Copy‑on‑Write (CoW)**
- **Btrfs / ZFS internals**
- **Directory Indexing**
- **File Descriptors / File Handles**
- **io_uring & Async I/O APIs**
- **FUSE / Filesystem in Userspace**
- **Delayed Allocation & Extent Trees**
- **Erasure Coding & Reed‑Solomon**

---

## 🧵 Operating System Internals
- **Process vs Thread**
- **Scheduling Algorithms** (CFS, Round‑Robin, etc.)
- **Memory Management**
  - Virtual Memory / Paging
  - Memory‑mapped I/O
  - Heap vs Stack
- **System Calls**
- **Inter‑process Communication (IPC)**
- **Signals & Interrupts**
- **I/O Scheduling** (e.g., CFQ, Deadline)
- **NUMA** (Non‑Uniform Memory Access)
- **Kernel Bypass (DPDK, SPDK, io_uring‑zC)**
- **Lock‑Free / Wait‑Free Algorithms**
- **Huge Pages / Transparent Huge Pages**
- **Realtime Scheduling & Latency Tuning**
- **Seccomp / AppArmor / SELinux**

---

## 🌐 Distributed Systems Concepts
- **CAP Theorem**
- **Consistency Models** (Strong, Eventual, Causal)
- **Consensus Algorithms** (Raft, Paxos)
- **Replication Strategies** (Leader/Follower, Quorum‑based)
- **Sharding**
- **Partitioning**
- **Distributed Hash Tables (DHTs)**
- **Anti‑Entropy / Gossip Protocols**
- **Vector Clocks / Lamport Timestamps**
- **CRDTs (Conflict‑Free Replicated Data Types)**
- **Distributed Transactions** (2PC, 3PC, Saga)
- **Snapshot Isolation**
- **Service Discovery** (Consul, etcd, ZooKeeper)
- **Back‑pressure & Reactive Streams**
- **ID Generation** (Snowflake, ULID, KSUID)
- **Geo‑replication & Anti‑Affinity**

---

## 🗃️ Databases (SQL & NoSQL)
- **Query Planning & Optimization**
- **Adaptive / Re‑optimized Query Plans**
- **MVCC** (Multi‑Version Concurrency Control)
- **ACID vs BASE**
- **Schema Design**
- **Join Strategies** (Nested Loop, Hash Join, Merge Join)
- **OLTP vs OLAP**
- **Materialized Views**
- **Columnar vs Row‑based Storage**
- **Vectorized Execution & SIMD Push‑down**
- **Temporal & Bitemporal Tables**
- **Graph Databases & Index‑Free Adjacency**

---

## ⚙️ Caching & Performance
- **Cache Invalidation Strategies**
- **Write‑through / Write‑behind Caching**
- **TLB** (Translation Lookaside Buffer)
- **Page Cache**
- **CDNs & Edge Caching**
- **Memory Hierarchy** (L1/L2/L3 cache)
- **Read‑ahead / Write‑back**
- **Cache Replacement Algorithms** (ARC, CLOCK‑Pro)
- **NUMA‑aware Caching / Partitioning**
- **Prefetching & Hardware Stride Prediction**

---

## 📊 Monitoring, Observability & Debugging
- **Metrics vs Logs vs Traces**
- **Prometheus / Grafana / OpenTelemetry**
- **Structured Logging**
- **Profiling** (CPU, Memory, I/O)
- **perf, strace, dtrace, eBPF**
- **Circuit Breakers / Bulkheads**
- **Red/Yellow/Green Dashboards & SLOs**
- **Span & Trace ID Propagation**
- **Dynamic Instrumentation** (BPF‑trace, SystemTap)
- **High‑Cardinality Tag Handling**

---

## ☁️ Cloud‑Native & Infrastructure
- **Containers & Namespaces**
- **cgroups**
- **Service Meshes** (e.g., Istio)
- **Infrastructure as Code** (e.g., Terraform)
- **Load Balancing Strategies**
- **Auto‑scaling**
- **Immutable Infrastructure**
- **Serverless Architecture**
- **Kubernetes Operators / CRDs**
- **GitOps & Progressive Delivery**
- **Service Level Objectives (SLO) & Error Budgets**
- **Multi‑Cluster / Multi‑Cloud Federation**
- **eBPF‑based Networking** (Cilium, Calico eBPF)

---

## 🔐 Security in Systems Engineering
- **TLS Handshakes**
- **Symmetric vs Asymmetric Encryption**
- **Key Management**
- **Zero Trust Networking**
- **AuthN vs AuthZ**
- **Sandboxing / Isolation** (VMs, containers)
- **Supply‑Chain Security** (Sigstore, SBOM, SLSA)
- **mTLS & SPIFFE IDs**
- **Hardware Security Modules (HSM) & TPM**
- **Side‑Channel Defenses** (Spectre, Meltdown mitigations)

---

## 🌐 Networking & Protocols
- **TCP Congestion Control** (Cubic, BBR)
- **QUIC & HTTP/3**
- **gRPC / Protobuf over HTTP/2**
- **DNS, Anycast, BGP basics**
- **Software‑Defined Networking (SDN) & VXLAN**

---

## 🚀 Event & Stream Processing
- **Pub/Sub Brokers** (Kafka, Pulsar, NATS)
- **Stream‑processing Frameworks** (Flink, Spark Structured Streaming)
- **Exactly‑once Semantics / Idempotent Producers**
- **Change Data Capture (CDC) & Debezium**
- **Event Sourcing vs Traditional Persistence**

---

## ⏱ Time‑Series & Analytics Engines
- **TSDBs** (InfluxDB, Prometheus TS)
- **OLAP Cube Engines** (Druid, Apache Pinot)
- **Approximate Query / Sketch‑based Analytics**
- **Downsampling & Retention Policies**
- **Roll‑ups & Aggregations**

---

## 🗜 Data Serialization & Columnar Formats
- **Protocol Buffers**
- **Apache Thrift**
- **Avro**
- **Cap’n Proto / FlatBuffers**
- **Apache Arrow**
- **Parquet**
- **ORC**

---

## 📡 Edge, IoT & Real‑Time
- **Edge Orchestration** (K3s, KubeEdge)
- **MQTT / CoAP protocols**
- **Hard‑/Firm‑Real‑Time OS Concepts** (FreeRTOS, Zephyr)
- **Offline‑first Sync Patterns**
- **Low‑Power WAN** (LoRaWAN, NB‑IoT)

---

## 🔄 Release Engineering & CI/CD
- **Blue‑Green & Canary Deployments**
- **Feature Flags / Toggle Management**
- **Artifact Registries & SBOMs**
- **GitHub Actions / GitLab CI / Jenkins**
- **Self‑hosted Runners**
- **Progressive Delivery** (Argo Rollouts, Spinnaker)
- **Automated Rollbacks & Roll‑forwards**
- **Infrastructure Testing** (Terratest, Test Kitchen)

---

## 🧪 Testing & Resilience
- **Load / Soak / Stress Testing**
- **Fuzz & Property‑based Testing**
- **Chaos Engineering / GameDays**
- **Fault Injection**
- **Failure Modes & Effects Analysis (FMEA)**
- **Reliability Engineering Metrics** (MTTR, MTBF)

---

## 🤖 ML & Data‑Infrastructure Cross‑Over
- **Feature Stores** (Feast, Tecton)
- **Model Serving & A/B Shadow Deployment**
- **Vector Databases** (FAISS, Pinecone, Weaviate)
- **Data Versioning** (DVC, Delta Lake, LakeFS)
- **MLOps Pipelines** (Kubeflow, MLflow, KServe)
- **Embeddings & Approximate Nearest Neighbor (ANN)**

---

## 🐳 Container Runtime Internals
- **OCI Spec, Image Formats, Layers**
- **runc / containerd / CRI‑O**
- **Union Filesystems** (OverlayFS, AUFS)
- **Rootless Containers & User Namespaces**
- **cgroups v2**
- **Seccomp Profiles for Containers**

---

## ⚡ Sustainability & Cost Engineering
- **FinOps & Cost Allocation Tagging**
- **Right‑sizing & Power Budgeting**
- **Carbon‑Aware Scheduling**
- **Spot / Preemptible Instances**
- **Autoscaling Based on Cost & Carbon**
- **Green Software Patterns & Tooling**

---

## 🛠️ Additional Learning & Methodologies
- **Chaos Engineering / Fault Injection**
- **Capacity Planning & Queuing Theory**
- **Operability Reviews / Production Readiness**
- **Incident Command & Post‑Mortem Culture**
- **Finite‑State Machines & Event Sourcing**
- **Domain‑Driven Design (DDD) & Bounded Contexts**

---

## 🧭 Suggested Learning Path (Iterative)

1. **Foundations**  
   B+ Trees → LSM Trees → Bloom Filters → Networking (TCP, QUIC)  
2. **OS & Container Internals**  
   Processes → cgroups → Kernel Bypass → Runtime Internals  
3. **Distributed Systems & Data Pipelines**  
   Consensus → Sharding → Event Streams → TSDB/OLAP  
4. **Observability & Performance**  
   eBPF → Metrics → Load Testing → SLOs  
5. **Cloud & Release Engineering**  
   IaC → GitOps → Progressive Delivery → Cost Engineering  
6. **Security & Sustainability**  
   Zero Trust → Supply‑Chain Security → Carbon‑Aware Ops  
7. **Edge & ML Infrastructure**  
   KubeEdge → Feature Stores → Vector DBs  

---

