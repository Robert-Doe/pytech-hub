# ROADMAP.md — Data Structures & Algorithms, Built From Scratch

> Status: **DRAFT — awaiting your approval before any code or docs are written.**
> This file is the entire deliverable of Phase 0. Nothing below has been built yet.

## How to read this document

- **Track 1** is the *engine*: every core data structure and algorithm, built by hand,
  in isolation, proven correct on its own terms.
- **Track 2** is the *applied layer*: real, recognizable systems (an LRU cache, a
  route planner, an autocomplete box) assembled out of Track 1 modules — the same
  way a browser is built on top of a kernel, not a reimplementation of one.
- Every module becomes its own directory containing parallel **C**, **C++**, and
  **Python** implementations, a `tutorial.html`, and a `DECISIONS.md` (full layout
  in the Tools/Architecture section below).
- **Nothing is built until you confirm the list and count.** Trim, merge, split, or
  reorder anything below — this is the cheapest point to do it.

---

## TRACK 1 — Core Data Structures & Algorithms Engine

### Phase 1: Bare-Metal Foundations

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 01 | Memory & Addresses | Proves every data structure is just a naming scheme over raw addressable memory — pointers/references are addresses, not magic | `01_memory_and_addresses` | Not started |
| 02 | The Array | Proves contiguous fixed-size storage gives O(1) random access because the address of any element is computable by arithmetic | `02_the_array` | Not started |
| 03 | The Dynamic Array | Proves geometric (doubling) growth gives amortized O(1) append, and shows exactly why linear growth would not | `03_dynamic_array` | Not started |
| 04 | Measuring Big-O | Proves time/space complexity claims are empirically measurable (timing + counting operations), not just recited from memory | `04_measuring_big_o` | Not started |

### Phase 2: Linear Structures

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 05 | Singly Linked List | Proves node-and-pointer chaining gives O(1) insert/delete at a known position without shifting memory | `05_singly_linked_list` | Not started |
| 06 | Doubly Linked List | Proves a second pointer per node gives O(1) backward traversal and O(1) deletion given only a node reference | `06_doubly_linked_list` | Not started |
| 07 | The Stack (LIFO) | Proves last-in-first-out ordering is exactly what's needed to solve nested/matching problems (balanced brackets, undo) | `07_the_stack` | Not started |
| 08 | The Queue (FIFO) | Proves first-in-first-out ordering is exactly what's needed to solve fair-order/buffering problems (print queues, BFS) | `08_the_queue` | Not started |
| 09 | Circular Buffer | Proves fixed-size memory can be reused forever via modular index arithmetic, without ever shifting elements | `09_circular_buffer` | Not started |
| 10 | Deque | Proves a double-ended structure subsumes both stack and queue behavior in one interface | `10_deque` | Not started |

### Phase 3: Recursion & Non-Linear Foundations

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 11 | Recursion & the Call Stack | Proves recursive function calls are literally push/pop operations on a stack, using Module 07 as the receipt | `11_recursion_and_the_call_stack` | Not started |
| 12 | Binary Tree | Proves hierarchical (non-linear) data can be represented with nothing more than nodes holding `left`/`right` pointers | `12_binary_tree` | Not started |
| 13 | Tree Traversals | Proves the same physical tree yields different, individually meaningful orderings (pre/in/post/level) purely from visit order | `13_tree_traversals` | Not started |
| 14 | Binary Search Tree | Proves adding one ordering invariant to a binary tree turns O(n) search into O(log n) search — on average | `14_binary_search_tree` | Not started |
| 15 | The Balance Problem | Proves an unguarded BST degrades to a linked list (O(n)) under adversarial or sorted input, motivating self-balancing trees | `15_bst_balance_problem` | Not started |
| 16 | AVL Tree | Proves rotations, triggered by a height-balance invariant, restore O(log n) height after every insert/delete | `16_avl_tree` | Not started |
| 17 | Red-Black Tree | Proves a *relaxed* balance invariant (color rules, not exact height) achieves the same O(log n) guarantee with fewer rotations | `17_red_black_tree` | Not started |

### Phase 4: Priority & Hash-Based Structures

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 18 | Binary Heap | Proves a complete tree encoded in a plain array gives O(log n) insert/extract-priority with zero pointers | `18_binary_heap` | Not started |
| 19 | Priority Queue | Proves Module 18's heap is the mechanism behind "always retrieve the most important item next" | `19_priority_queue` | Not started |
| 20 | Hash Function Design | Proves a hash function deterministically and (roughly) uniformly maps arbitrary keys to fixed-size bucket indices | `20_hash_function_design` | Not started |
| 21 | Hash Table — Chaining | Proves collisions can be resolved by attaching a linked list (Module 05) per bucket while keeping average O(1) lookup | `21_hash_table_chaining` | Not started |
| 22 | Hash Table — Open Addressing | Proves collisions can instead be resolved in-place via probing sequences, trading extra structure for cache locality | `22_hash_table_open_addressing` | Not started |
| 23 | Trie (Prefix Tree) | Proves sharing common prefixes in a tree makes prefix search cost proportional to key length, not dictionary size | `23_trie` | Not started |

### Phase 5: Graphs

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 24 | Graph Representations | Proves adjacency-list and adjacency-matrix encode identical information with different time/space tradeoffs | `24_graph_representations` | Not started |
| 25 | BFS (Breadth-First Search) | Proves level-by-level expansion via a queue (Module 08) finds shortest paths in an unweighted graph | `25_graph_bfs` | Not started |
| 26 | DFS (Depth-First Search) | Proves depth-first expansion via a stack/recursion (Modules 07/11) reaches every reachable node and reveals cycles | `26_graph_dfs` | Not started |
| 27 | Topological Sort | Proves a DAG's dependency order is recoverable from DFS finish times or from in-degree counting alone | `27_topological_sort` | Not started |
| 28 | Union-Find (Disjoint Set) | Proves path compression + union-by-rank gives near-O(1) "are these connected?" queries without traversing the graph | `28_union_find` | Not started |
| 29 | Minimum Spanning Tree | Proves greedy edge selection (Kruskal, using Module 28) provably builds the cheapest tree connecting every node | `29_minimum_spanning_tree` | Not started |
| 30 | Dijkstra's Shortest Path | Proves greedy expansion via a priority queue (Module 19) finds shortest paths in non-negative weighted graphs | `30_dijkstra_shortest_path` | Not started |

### Phase 6: Sorting

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 31 | The Comparison Model & Its Limit | Proves any comparison-based sort needs at least O(n log n) comparisons in the worst case, before writing a single sort | `31_comparison_model` | Not started |
| 32 | Elementary Sorts (Bubble/Insertion/Selection) | Proves simple O(n²) sorts are correct via loop invariants, and shows exactly where each one wastes work | `32_elementary_sorts` | Not started |
| 33 | Merge Sort | Proves divide-and-conquer plus a linear merge step achieves *guaranteed* O(n log n), independent of input order | `33_merge_sort` | Not started |
| 34 | Quick Sort | Proves in-place partitioning achieves O(n log n) on average, and demonstrates the specific inputs that force its O(n²) worst case | `34_quick_sort` | Not started |
| 35 | Heap Sort | Proves Module 18's heap directly yields an in-place O(n log n) sort with no extra memory | `35_heap_sort` | Not started |
| 36 | Non-Comparison Sorts (Counting/Radix) | Proves breaking the comparison model (Module 31) allows O(n+k) sorting when keys are bounded integers | `36_non_comparison_sorts` | Not started |

### Phase 7: Searching, Unified

| # | Module name | What it proves | Directory | Status |
|---|---|---|---|---|
| 37 | Linear & Binary Search | Proves a sorted-order invariant collapses search from O(n) to O(log n), and shows why binary search needs random access | `37_linear_and_binary_search` | Not started |
| 38 | Search Across Structures | Proves "search" is not one algorithm but a strategy choice (linear/binary/BST-descent/BFS/DFS) dictated by the shape of the structure holding the data | `38_search_unification` | Not started |

**Track 1 total: 38 modules.**

---

## TRACK 2 — Applied Systems Layer

Each row also names which Track‑1 module(s) it is built on top of and reuses without
reimplementing.

| # | Module name | What it proves | Directory | Builds on (Track 1) | Status |
|---|---|---|---|---|---|
| A1 | LRU Cache | Proves a hash table + doubly linked list together give O(1) get/put *and* O(1) eviction of the least-recently-used item | `A1_lru_cache` | 06, 21 | Not started |
| A2 | Undo/Redo Engine | Proves two stacks are sufficient to implement arbitrary-depth undo *and* redo without storing full history diffs | `A2_undo_redo_engine` | 07 | Not started |
| A3 | Expression Evaluator | Proves a stack-based algorithm (shunting-yard) can correctly evaluate operator-precedence expressions without a parser generator | `A3_expression_evaluator` | 07 | Not started |
| A4 | Autocomplete Engine | Proves a trie turns "all words starting with this prefix" into a single subtree walk instead of a full dictionary scan | `A4_autocomplete_engine` | 23 | Not started |
| A5 | Job Scheduler | Proves a priority queue is what "always run the most urgent job next" reduces to, under changing priorities | `A5_job_scheduler` | 18, 19 | Not started |
| A6 | Friend-Suggestion Engine | Proves BFS over a social graph is what "people you may know" (2-hop connections) reduces to | `A6_friend_suggestion_engine` | 24, 25 | Not started |
| A7 | Dependency Resolver | Proves topological sort is what "install order" / "build order" reduces to for any DAG of dependencies | `A7_dependency_resolver` | 24, 27 | Not started |
| A8 | Route Planner | Proves Dijkstra over a weighted graph is what "cheapest/shortest route" reduces to in a map or network | `A8_route_planner` | 24, 30 | Not started |
| A9 | Network Builder (MST) | Proves Kruskal's MST is what "connect every site for minimum total cable cost" reduces to | `A9_network_builder` | 24, 28, 29 | Not started |
| A10 | In-Memory Leaderboard | Proves a hash table (for O(1) lookup by id) plus a heap (for O(log n) rank updates) together implement a live-ranking system | `A10_leaderboard` | 18, 21 | Not started |

**Track 2 total: 10 modules.**

**Grand total if everything is built: 48 modules.**

---

## Recommended Stopping Points

| Your goal | Stop after module |
|---|---|
| "I just need to *see* how memory-backed structures work" | Module 04 — Measuring Big-O |
| "I want linear structures solid (interview basics: stacks/queues/lists)" | Module 10 — Deque |
| "I want trees mastered, including self-balancing" | Module 17 — Red-Black Tree |
| "I want hashing + tries mastered (most-tested interview topics)" | Module 23 — Trie |
| "I want graphs mastered, including shortest path/MST" | Module 30 — Dijkstra's Shortest Path |
| "I want full theoretical mastery: sorting + searching too" | Module 38 — Search Across Structures *(end of Track 1)* |
| "I want to see all of this become real, recognizable software" | Module A10 — Leaderboard *(end of Track 2)* |

---

## Tools / Architecture Target

**Languages, one implementation each, per module, side by side:**
- **C** — manual memory management, raw pointers, no hidden costs. Compiled with `gcc` (C11). This is where "what does it actually cost" lives.
- **C++** — hand-rolled classes (no reaching for `std::` containers to replace the thing being taught), RAII for cleanup, compiled with `g++` (C++17). This is where "what does the language give you for free" lives.
- **Python** — the reference/readability implementation, used as the primary walk-through language in each `tutorial.html` because its syntax gets out of the way of the concept. Run with `python3`.

**Per-module directory layout** (applies from Module 01 onward):
```
NN_module_name/
  c/
    module_name.h
    module_name.c
    test_module_name.c
  cpp/
    module_name.hpp
    module_name.cpp
    test_module_name.cpp
  python/
    module_name.py
    test_module_name.py
  tutorial.html
  DECISIONS.md
```

**Platform:** Windows (PowerShell + Git Bash available), but all C/C++ code targets the
standard library only (no OS-specific headers) so every module also compiles unmodified
on Linux/macOS. No CMake/build-system layer — each `tutorial.html`'s "Run It" section
documents the exact, tested `gcc`/`g++`/`python3` invocation for that module directly.

**Verification standard:** every module's test file is actually run and its real output
captured before `DECISIONS.md` or `tutorial.html` is written about it. No claimed output
is invented.

**Visuals:** inline SVG diagrams embedded directly in each `tutorial.html` (no external
chart/diagram libraries, nothing that requires network access to render). Shared design
system across all modules: dark background, one accent color per module, Playfair Display
for headings, monospace for code — for visual continuity as you move module to module.

**Explicitly out of scope** (candidates for optional Phase 3 deep-dive clusters later,
not core modules):
- Thread-safe / lock-free / concurrent structures
- Disk-backed / external-memory structures (real production B-trees, LSM-trees)
- GPU-parallel sorting/graph algorithms
- Language-runtime internals of built-in containers (e.g. how CPython's `dict` is
  actually implemented under the hood) — this is a natural Phase 3/4 cluster topic,
  not a core module, since it doesn't need its own from-scratch build to teach.

---

## What I need from you before Phase 1 starts

1. **Confirm the module count.** 38 (Track 1 only), or all 48 (Track 1 + Track 2)?
2. **Anything to cut, merge, or add?** Candidates worth flagging myself:
   - Red-Black Tree (17) is somewhat redundant with AVL (16) for a first pass — keep
     both for contrast, or cut one?
   - B-Trees/B+Trees are notably absent (real-world database indexing) — add as a
     Phase 4 module, or leave for a future course?
   - Graph coloring, A*, Bellman-Ford, segment trees, Fenwick trees are not in the list
     — intentionally, to keep this course finishable — flag if you want any added.
3. **Confirm the stopping point you're actually aiming for right now**, so I know
   whether to plan the prerequisites layer (Phase 1 proper) around "linear structures"
   or "the whole thing."
