# pytech-hub

**Curriculum and tooling for PyTech Hub — the data-structures-and-algorithms track of the
Code Den EdTech platform, teaching coding to African youth.**

This repository holds three related pieces of the same teaching effort: a from-scratch
data-structures-and-algorithms course built in three languages side by side, a React
slide-deck composer used to present it live, and the source lesson notebook the slide deck
was built from.

## Why it's structured this way

PyTech Hub's teaching approach is "build it yourself in three languages before you trust a
library's version of it." **C** shows what a structure actually costs in raw memory and
pointers, **C++** shows what the language gives you for free once you add classes and RAII,
and **Python** is the readable reference implementation used to walk through the concept in
each lesson's tutorial. A structure isn't "done" until a student has built it — and can
explain the trade-off — in all three. The slide deck app exists because live sessions need a
presentable, step-by-step version of the same material, with real (not hand-drawn) diagrams:
its graph and sorting visualizations run the actual BFS/DFS/sort algorithms from the lesson
material, frame by frame, rather than faking the animation.

## What's in this repository

| Path | What it is |
|---|---|
| [`data-structures-mastery/`](data-structures-mastery/) | The DSA course itself: per-module `tutorial.html`, `DECISIONS.md`, and parallel C/C++/Python implementations |
| [`codeden-slides-react/`](codeden-slides-react/) | A React + Vite app for composing and presenting CodeDen-branded slide decks, including a full 114-slide deck for Lesson 43 |
| [`Lesson 43 - DSA Part 3 - Graphs & Sorting.ipynb`](<Lesson 43 - DSA Part 3 - Graphs & Sorting.ipynb>) | The source Jupyter notebook lesson (graphs via adjacency list, BFS/DFS, bubble/insertion/merge/quicksort) that `lesson43Deck.jsx` was built from |

## data-structures-mastery: module map

The course roadmap (`data-structures-mastery/ROADMAP.md`) plans a 48-module curriculum across
two tracks — Track 1 is the "engine" (38 core structures and algorithms, from raw memory
addressing through graphs, sorting, and searching), Track 2 is the "applied layer" (10 modules
assembling Track 1 pieces into recognizable systems: an LRU cache, a route planner, an
autocomplete engine, and more). Building is in progress; what actually exists today:

| # | Module | Proves | Status |
|---|--------|--------|--------|
| 01 | [Memory & Addresses](data-structures-mastery/01_memory_and_addresses/) | Every data structure is a naming scheme over raw addressable memory — pointers/references are addresses, not magic | Built (C, C++, Python + tutorial) |
| 02 | [The Array](data-structures-mastery/02_the_array/) | Contiguous fixed-size storage gives O(1) random access because any element's address is computable by arithmetic | Built (C, C++, Python + tutorial) |
| 03 | [The Dynamic Array](data-structures-mastery/03_dynamic_array/) | Geometric (doubling) growth gives amortized O(1) append, and shows exactly why linear growth would not | In progress (C implementation only so far) |

The remaining 35 Track 1 modules and all 10 Track 2 modules are specified in
`data-structures-mastery/ROADMAP.md` but not yet built. `data-structures-mastery/prerequisites/`
covers the primitives every module assumes (variables and memory, pointers and references,
Big-O notation, reading the three languages side by side), and `GLOSSARY.md` is the
append-only running glossary of every term introduced so far.

## Tech stack

- **C** (C11, `gcc`) — manual memory management, raw pointers, no hidden costs
- **C++** (C++17, `g++`) — hand-rolled classes and RAII, deliberately not `std::` containers
- **Python 3** — the reference/readability implementation used in every `tutorial.html` walkthrough
- **React 18 + Vite 5** — the slide composer and presenter app (`codeden-slides-react/`)
- **Jupyter** — the original lesson notebooks the slide decks are adapted from

## Status

`data-structures-mastery` is early-stage: 2 of 38 planned Track 1 modules are fully built
(code + tutorial in all three languages), 1 is partially built, and the rest are specified but
not started. `codeden-slides-react` is a working, complete presenter app with a full deck built
for Lesson 43. The Lesson 43 notebook itself is complete and is the source material the slide
deck adapts.

## How to run

**A data-structures module:**
```bash
cd data-structures-mastery/01_memory_and_addresses
gcc c/*.c -o test_c && ./test_c        # C
g++ cpp/*.cpp -o test_cpp && ./test_cpp # C++
python3 python/*.py                     # Python
# then open tutorial.html in a browser
```

**The slide deck composer/presenter:**
```bash
cd codeden-slides-react
npm install
npm run dev
```
Open `http://localhost:5173` for the Deck Composer, defaulted to the 114-slide Lesson 43 deck.
Press **Enter** or click **Present Deck** to present fullscreen; `Ctrl+→`/`Ctrl+←` step through
manual reveals, `A` reveals the rest of a slide, and **Export PDF** bakes the whole deck to a
print-ready PDF.

**The source lesson notebook:**
```bash
jupyter notebook "Lesson 43 - DSA Part 3 - Graphs & Sorting.ipynb"
```

## Note on repository scope

`PyTech_Hub_Instructor_Manual_First_Edition.pdf` (instructor-only material) is intentionally
excluded from this repository and stays in the original working directory outside version
control.
