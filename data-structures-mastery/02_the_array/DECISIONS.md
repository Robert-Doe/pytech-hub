# DECISIONS.md — Module 02: The Array

- **(a) Forced by the platform/hardware/spec** — not a choice at all.
- **(b) Forced by an external contract** — an API, a language standard, a file format.
- **(c) Our own convention** — chosen for safety/clarity; a different, consistent choice
  could have replaced it.

---

## 1. Why C uses return codes, C++ uses exceptions, and Python uses exceptions

**Category: (b) forced by external contract — but a different contract per language.**

C has no exception mechanism in the language at all — `array_get`/`array_set`/`array_push`
returning `0`/`1` and writing through an out-parameter is not a stylistic choice, it's the
only mechanism C's own specification gives a function to report "this failed" without also
crashing. C++ *does* have exceptions, and `std::out_of_range` specifically exists in the
standard library for exactly this situation ("index outside a valid range") — using it instead
of inventing a bespoke return code is matching the contract the C++ standard library already
established (compare `std::vector::at()`, which throws the exact same exception type). Python
raises `IndexError` for the identical reason: it's the exception the language's own built-in
sequences (`list`, `tuple`, `str`) raise for the same failure, and a custom class matching that
convention lets `FixedArray` behave the way any Python programmer already expects a sequence
to behave. Three different languages, three different *external* contracts, one shared
underlying failure being reported three idiomatic ways.

## 2. Why `array_init` (C) doesn't zero out `data[]`, only `length`

**Category: (c) our own convention**, deliberately chosen to make a real cost visible.

Zeroing all 8 `int`s would cost 8 writes even though at most 8 of them will ever be read
before being overwritten by a `push`. Since every `get`/`set` already bounds-checks against
`length`, no caller can ever read an uninitialized slot through this module's own API — so the
extra writes would buy nothing but the appearance of safety. We chose to leave `data[]`
genuinely uninitialized specifically so this module's Q&A section can pose the question "is
this actually safe?" and let the bounds-check logic answer it, rather than making the question
moot by paying to zero memory nobody can reach anyway.

## 3. Why Python's `FixedArray` pre-allocates a list of `None` instead of using something else

**Category: (c) our own convention**, and an honest one — Python doesn't have a true match
for "a block of exactly N slots, no more, no less" the way a C/C++ stack array is.

A plain Python `list` grows on `append()`; there is no way to make it refuse a ninth element
without wrapping it. `array.array` from the standard library fixes the *element type* (all
ints, say) but is still dynamically resizable — it does not fix the *capacity* either. We chose
to pre-size a list with placeholder `None` values and enforce the capacity ourselves in
`push()`, because that's the closest honest simulation of "fixed capacity" achievable in
Python — and we say so directly in this file and in the module docstring, rather than letting
a learner believe Python has a native fixed-array primitive it doesn't.

## 4. Why `raw_address()` / `array_raw_address()` exist at all, with no bounds checking

**Category: (c) our own convention**, teaching-only, not meant to be idiomatic API design.

Every other method in this module is deliberately bounds-checked — this one deliberately
isn't, because its entire purpose is letting the demo print real addresses and let the reader
watch them land exactly `sizeof(int)` bytes apart (the same proof Module 01 made with a bare
array, now made through the wrapper). A production array class would have no reason to expose
raw addresses to callers at all; this module exposes one on purpose, narrowly, so the "index
arithmetic, not magic" claim in the tutorial is something the reader can verify by re-running
the demo, not something they're asked to take on faith a second time.

## 5. Why capacity is a compile-time constant (`FIXED_ARRAY_CAPACITY` / `kFixedArrayCapacity`), not a constructor parameter

**Category: (c) our own convention**, chosen specifically to keep this module honest about
what "fixed" means before Module 03 changes it.

A constructor parameter like `FixedArray(int capacity)` would still need to allocate that
memory somewhere — and doing so at a size not known until runtime forces heap allocation
(`malloc`/`new`), which this course has explicitly deferred to Module 03. Hardcoding the
capacity as a compile-time constant keeps every byte of this module's `FixedArray` on the
stack, exactly like Module 01's plain variables — so "fixed" genuinely means "fixed at compile
time," not "fixed after a runtime choice." The cost is real and intentional: this module's
array cannot be resized, ever, by any caller, which is precisely the gap Module 03 exists to
close.

---

## Decisions We Made

| # | Decision | Category | Why |
|---|---|---|---|
| 1 | C: return codes. C++: exceptions. Python: exceptions. | (b) external contract | Each language's own standard library already sets this convention |
| 2 | `data[]` left uninitialized in C; only `length` is reset | (c) convention | No write is wasted on slots the bounds-check already makes unreachable |
| 3 | Python simulates fixed capacity with a pre-sized `None` list | (c) convention, disclosed | Python has no native fixed-capacity sequence type to reach for instead |
| 4 | `raw_address()` exists, unchecked, for teaching only | (c) convention | Lets the reader re-verify Module 01's stride proof through the wrapper |
| 5 | Capacity is a compile-time constant, not a constructor parameter | (c) convention | Keeps the array on the stack; motivates Module 03 by contrast |

## What We Proved

Running all three demos and test suites (captured verbatim in
[tutorial.html](tutorial.html)'s "Run It" section) proved:

1. **Random access is genuinely O(1)** — `get(0)`, `get(7)`, and `get(4)` in the demo all
   involve the identical operation (one bounds check, one address computation, one read); the
   address-printing loop shows those addresses landing exactly 4 bytes apart, in order,
   confirming the access cost doesn't depend on which index was requested.
2. **A fixed-capacity array genuinely cannot grow** — the 9th `push()` failed in all three
   languages (return code, exception, exception respectively), and the automated tests assert
   `length` is unchanged afterward — this isn't a caller mistake, it's the structure's actual,
   provable limit.
3. **Bounds checking prevents undefined/incorrect behavior on a bad index** — `get(100)` and
   `get(999)` failed cleanly in every language rather than reading unrelated memory or
   crashing, confirmed by both the demo output and the automated tests.
4. **The same logical structure needs a different failure-reporting mechanism per language**
   — not because the underlying bug (index out of range) differs, but because each language's
   own external contract for reporting failure differs, exactly as argued in decision #1 above.
