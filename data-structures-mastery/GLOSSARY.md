# GLOSSARY.md — Data Structures Mastery

Every term, file convention, and constant this course introduces, alphabetical, each tagged
with where it was **first seen**. This file is only ever appended to or inserted into — never
rewritten from scratch — so its history stays a reliable record of when something was earned.

---

### Address

A number identifying one specific byte of memory. Every variable, in every language this
course uses, resolves to one at runtime — a name is just a label a compiler/interpreter
attaches to an address for you. See [prerequisites/01_variables_and_memory](prerequisites/01_variables_and_memory.html).

**First seen:** Prerequisites (01 — Variables & Memory)

---

### Big-O Notation

A compact way of describing how an algorithm's cost (time or space) grows as its input size
<var>n</var> grows, ignoring constants and low-order terms — e.g. `O(n)`, `O(log n)`. See
[prerequisites/03_big_o_notation](prerequisites/03_big_o_notation.html).

**First seen:** Prerequisites (03 — Reading Big-O Notation)

---

### Bounds Checking

Verifying an index falls within a structure's valid range (`0 <= index < length`) before
using it, instead of trusting the caller. Module 02's `get`/`set`/`push` all bounds-check;
each language reports a failed check differently (return code in C, exception in C++/Python)
— see [02_the_array/DECISIONS.md](02_the_array/DECISIONS.md) #1.

**First seen:** Module 02 — The Array

---

### Capacity

The total number of slots a structure has room for, as opposed to **Length** (how many of
those slots are currently in use). A `FixedArray` with capacity 8 and length 3 has 5 unused
slots still reserved for it.

**First seen:** Module 02 — The Array

---

### Contiguous

Describes memory laid out back-to-back with no gaps — element *i+1* sits immediately after
element *i*, exactly `sizeof(element)` bytes later. This is what makes an address computable
from an index (see **Stride**) instead of requiring a search.

**First seen:** named in Module 01, formally used in Module 02 — The Array

---

### Dangling Pointer

A pointer holding the address of memory that has already been freed or gone out of scope —
using it reads/writes memory that may now belong to something else entirely. Named here, but
not yet demonstrated; Module 05's linked list is the first module that can actually produce
one on purpose.

**First seen:** Module 01 — Memory & Addresses (named; demonstrated starting Module 05)

---

### DECISIONS.md

The per-module file explaining every non-obvious source-code choice, sorted into "forced by
platform," "forced by external contract," or "our own convention." Every module in this course
has one.

**First seen:** Module 01 — Memory & Addresses (course-structural convention, applies to all modules)

---

### Dereference

The act of following a pointer/reference to read or write the value at the address it holds
— `*p` in C/C++. Python has no visible dereference syntax; it happens implicitly every time a
name is used. See [prerequisites/02_pointers_and_references](prerequisites/02_pointers_and_references.html).

**First seen:** Prerequisites (02 — Pointers & References)

---

### Heap (memory)

The region of memory used for allocations whose size isn't known until runtime, or that must
outlive the function that created them. Requested explicitly (`malloc`/`new`/Python object
creation) and, in C/C++, released explicitly. Contrast **Stack (memory)**.

**First seen:** Prerequisites (01 — Variables & Memory)

---

### `id()`

A Python built-in returning a value guaranteed unique and constant for an object's lifetime.
The language spec leaves what that value *represents* undefined; CPython specifically
implements it as the object's memory address, which is why this course's demos use it to
"see" Python object identity.

**First seen:** Module 01 — Memory & Addresses

---

### Pointer

A variable whose value is the address of another value, rather than the value itself.
Distinct from the thing it points to — it has its own address too. See
[prerequisites/02_pointers_and_references](prerequisites/02_pointers_and_references.html).

**First seen:** Prerequisites (02 — Pointers & References)

---

### Random Access

Reaching any element of a structure in O(1) time, given only its index — because the address
is computed directly (`base + index × element size`), never searched for. Proved concretely
in Module 02, where `get(0)` and `get(7)` cost identically.

**First seen:** Module 02 — The Array

---

### Reference (C++)

An alias for an existing variable — mechanically similar to a pointer, but must be bound at
creation, can never be null, and needs no explicit dereference syntax. See
[prerequisites/02_pointers_and_references](prerequisites/02_pointers_and_references.html).

**First seen:** Prerequisites (02 — Pointers & References)

---

### Space Complexity

How much *extra* memory (beyond the input itself) an algorithm needs, expressed in the same
Big-O notation used for time. Merge sort (Module 33) is `O(n)` space; heap sort (Module 35) is
`O(1)` space — same time complexity, different space cost.

**First seen:** Prerequisites (03 — Reading Big-O Notation)

---

### Stack (ADT)

The last-in-first-out data structure built in Module 07. Not to be confused with **Stack
(memory)** — they share a name because they share a LIFO shape, but one is a region of memory
every running program uses automatically, and the other is a structure you build yourself.

**First seen:** referenced (contrast only) in Prerequisites (01); built in Module 07

---

### Stack (memory)

The region of memory used for local variables with a compile-time-known size. Strictly
ordered, grows/shrinks automatically as functions are called and return. Contrast **Heap
(memory)** and, separately, **Stack (ADT)**.

**First seen:** Prerequisites (01 — Variables & Memory)

---

### Stride

The distance, in bytes, between the addresses of two neighboring elements in an array. Always
equal to `sizeof(element_type)` for a contiguous array — proved directly by
`array_stride_bytes` in Module 01's C and C++ source.

**First seen:** Module 01 — Memory & Addresses

---

### Time Complexity

How the number of operations an algorithm performs grows as its input size <var>n</var> grows,
expressed in Big-O notation. The default meaning of a bare `O(...)` claim in this course
unless space is called out explicitly.

**First seen:** Prerequisites (03 — Reading Big-O Notation)

---

### tutorial.html

The per-module Head First–style walkthrough: prerequisites, big analogy, step-by-step
mechanism, a state diagram, annotated code excerpts, a limits compare-box, exact run
commands with real captured output, a brain exercise, a Q&A section, and a link to what's
next. Every module in this course has one, sharing one design system (`assets/course.css`).

**First seen:** Module 01 — Memory & Addresses (course-structural convention, applies to all modules)
