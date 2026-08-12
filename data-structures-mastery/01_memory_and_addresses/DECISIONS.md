# DECISIONS.md — Module 01: Memory & Addresses

Every non-obvious choice in this module's source, explained, and sorted into exactly one of
three buckets:

- **(a) Forced by the platform/hardware/spec** — not a choice at all. Any correct
  implementation looks the same here.
- **(b) Forced by an external contract** — an API, a language standard, a file format.
  Different tools could disagree, but this module has to match the one it's using.
- **(c) Our own convention** — chosen for safety/clarity here; a different, equally
  consistent choice could have replaced it.

---

## 1. Why the demo has its own `main()`, separate from the implementation file

**Category: (a) forced by the platform.**

The first version of this module put `main()` directly inside `memory_and_addresses.c`
(and `.cpp`). That failed to link once `test_memory_and_addresses.c` — which also needs a
`main()` — was compiled against the same implementation file:

```
/usr/bin/ld: multiple definition of `main'
collect2: error: ld returned 1 exit status
```

This is not a style opinion; it is the C/C++ linker's actual rule — an executable may contain
exactly one `main()`, full stop. The fix, applied identically in both `c/` and `cpp/`:

- `memory_and_addresses.{c,cpp}` — implementation only. No `main()`. Safe to link into
  any number of different executables.
- `demo.{c,cpp}` — one `main()`, the walkthrough a learner runs to *see* the module.
- `test_memory_and_addresses.{c,cpp}` — a different `main()`, the automated correctness
  check.

Both `demo` and `test_runner` are built by compiling their own file together with
`memory_and_addresses.{c,cpp}` — never together with each other. **This split is now the
standing convention for every C/C++ module in this course, not just this one** — it will not
be re-explained in later modules' `DECISIONS.md` files.

Python has no equivalent problem: `memory_and_addresses.py` guards its demo with
`if __name__ == "__main__":`, so the exact same file can be *imported* by
`test_memory_and_addresses.py` (which runs no top-level code) or *executed* directly (which
runs `demonstrate()`). One file, two entry points, no linker to negotiate with. This asymmetry
— C/C++ needing two files, Python needing one — is itself a fact worth noticing, and it's
called out in the tutorial's Q&A section.

## 2. Why `array_stride_bytes` casts to `char *` before subtracting

**Category: (a) forced by the C/C++ standard.**

```c
return (const char *)&arr[1] - (const char *)&arr[0];
```

Pointer subtraction in C/C++ is defined to return the distance **in units of the pointed-to
type**, not in bytes. `&arr[1] - &arr[0]` on two `int *` values returns `1` (one int apart),
not `4`. Casting both operands to `char *` first (a type whose size is defined to be exactly
1 byte) makes the same subtraction report the distance in raw bytes instead. There is no other
way to get a byte count from pointer subtraction — this is a direct consequence of how the
standard defines the operation.

## 3. Why `array_stride_bytes` takes `const int *`, not `int *`

**Category: (c) our own convention.**

The function only reads through the pointer; it never writes to the array. Marking the
parameter `const` is a promise to callers ("I will not modify what you handed me") that the
compiler itself checks — passing a non-const array still works (it converts implicitly), but
the reverse wouldn't. A different, equally correct module could have skipped `const` entirely;
we chose to add it everywhere a function only reads, as a course-wide convention, because it
turns "did this function mutate my data?" from a question you answer by reading the function
body into a question the signature already answers.

## 4. Why C++ ships both `swap_ints` (pointer) and `swap_ints_ref` (reference)

**Category: (c) our own convention**, specifically chosen to *teach*, not to minimize code.

C++ doesn't need two swap functions — `swap_ints_ref` alone would cover every real use case,
and is what idiomatic C++ would actually ship. We kept `swap_ints` (identical to the C
version) side by side with `swap_ints_ref` on purpose: the prerequisites page
([pointers-and-references](../prerequisites/02_pointers_and_references.html)) claims a
reference is "a pointer with the danger sanded off, same mechanism, safer interface" — and
the only way to make that claim checkable rather than asserted is to show both call sites
back to back and let the reader see they produce identical results (`demo.cpp` does exactly
that). Once the point is made, later modules use references exclusively, the way real C++
code would.

## 5. Why the demo prints raw addresses with `%p` / `std::cout << &x` at all

**Category: (c) our own convention.**

Printing an address teaches nothing on its own once you already believe addresses exist — the
actual point is watching the *same* address show up twice: once as `p`'s value, once as
`&x`'s value, proving `p` genuinely holds `x`'s location rather than a copy of `5`. We chose to
print addresses generously throughout this module specifically because it's the one module in
the whole course where "this number is an address" needs to stop being an abstract claim and
become something the learner has personally watched happen. Later modules will print far
fewer raw addresses, once the point has been made once and can be assumed.

## 6. Why Python's demo uses `id()` instead of trying to show "the address"

**Category: (b) forced by an external contract** — the Python language specification.

The Python language guarantees that every object has an `id()` that is unique and constant for
its lifetime, and explicitly leaves *what that id represents* undefined. CPython (the
interpreter this course runs) happens to implement `id()` as the object's memory address,
which is why `demo.py`'s output looks address-shaped. But a module that promised "Python
pointers work just like C pointers" would be teaching an implementation detail as if it were a
language guarantee — PyPy or Jython are free to implement `id()` differently and remain fully
correct Python. The tutorial is careful to phrase this as "CPython happens to..." rather than
"Python addresses are..." for exactly this reason.

## 7. Why `swap_via_temp` in Python takes a list and two indices, not two values

**Category: (c) our own convention**, and the whole point of this module in Python.

A function `def swap_via_temp(a, b): a, b = b, a` would run without error and would swap
*nothing the caller can see* — `a` and `b` inside the function are just local names, and
reassigning a local name never affects the caller (see `DECISIONS.md` §6's link to the
"reassignment vs. mutation" distinction in the tutorial). The only way to get an
observable-to-the-caller swap in Python without returning new values is to mutate a *mutable*
object the caller already holds a reference to — hence indices into a shared list, not two
independent parameters. This is deliberately the one function in this module's Python file
that would be a plausible beginner bug if written the "obvious" way, and the tutorial's Brain
Exercise is built around exactly that trap.

---

## Decisions We Made

| # | Decision | Category | Why |
|---|---|---|---|
| 1 | Demo executable split from implementation file | (a) forced | One `main()` per linked C/C++ executable |
| 2 | Cast to `char *` before pointer subtraction | (a) forced | C/C++ standard defines pointer subtraction in element units, not bytes |
| 3 | `const int *` parameter on read-only functions | (c) convention | Makes "does this mutate?" answerable from the signature alone |
| 4 | Ship both pointer- and reference-based swap in C++ | (c) convention | Makes the prerequisites page's claim checkable, not just asserted |
| 5 | Print raw addresses generously in this module only | (c) convention | This is the one module where "addresses are real" must be watched, not assumed |
| 6 | Use `id()`, described as a CPython detail, not "Python's address" | (b) external contract | The Python language spec leaves `id()`'s meaning implementation-defined |
| 7 | Python swap takes `(list, i, j)`, not `(a, b)` | (c) convention | The two-parameter version is a real, common bug — the module is built to expose it |

## What We Proved

Running the three demos and their three test suites (all captured verbatim in
[tutorial.html](tutorial.html)'s "Run It" section) proved, with real output rather than
assertion:

1. **A variable name resolves to an address**, and printing `&x` in C, C++, and Python
   (via `id()`) all show a real, distinct number — not a metaphor.
2. **A pointer is a separate variable from what it points to** — `p` and `&p` in the C and
   C++ demos are two different addresses, confirmed by the demo's own output, not just by
   the prerequisites page's diagram.
3. **Passing an address lets a function modify the caller's variable** — `swap_ints` visibly
   exchanged `x` and `y` in both C and C++, and the C++ reference version produced the
   identical result through a different-looking call site.
4. **Array elements are contiguous** — `array_stride_bytes` returned exactly `4` (== `sizeof(int)`)
   in both C and C++, on this machine, confirmed by an automated assertion, not just an
   expectation.
5. **Python variables are references by default** — `id(a) == id(b)` after `b = a`, and
   mutating through `b` changed what `a` sees, both confirmed by passing automated tests.
