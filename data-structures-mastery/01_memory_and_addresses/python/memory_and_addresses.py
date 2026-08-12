"""Module 01 -- Memory & Addresses (Python).

Python has no explicit pointer syntax, but every name is already a
reference to an object -- there is no other kind of variable. This file
demonstrates that with id(), which (in CPython specifically) happens to
return the object's memory address, instead of pretending Python has
C-style pointers it doesn't.
"""


def swap_via_temp(lst, i, j):
    """Swaps lst[i] and lst[j] in place.

    Proves that mutation is visible through any other name bound to the
    same list object -- there is no "caller's copy" to fail to affect,
    because lst was never copied to begin with.
    """
    lst[i], lst[j] = lst[j], lst[i]


def demonstrate():
    # ---- Section 1: every value has an identity (CPython: an address) ----
    x = 5
    y = 99
    print(f"x = {x}, id(x) = {id(x):#x}")
    print(f"y = {y}, id(y) = {id(y):#x}")

    # ---- Section 2: assignment binds a name, it doesn't copy ----
    a = [10, 20, 30]
    b = a  # b is a SECOND name for the SAME list object as a
    print(f"\na = {a}, id(a) = {id(a):#x}")
    print(f"b = {b}, id(b) = {id(b):#x}   <- identical id to a")
    b[0] = 999
    print(f"after b[0] = 999, a = {a}   <- changed too: same object")

    # ---- Section 3: swap by mutating the shared object ----
    arr = [1, 2, 3]
    print(f"\nBefore swap: {arr}")
    swap_via_temp(arr, 0, 2)
    print(f"After  swap: {arr}")

    # ---- Section 4: reassignment breaks aliasing; mutation doesn't ----
    c = [1, 2, 3]
    d = c
    d = [9, 9, 9]  # rebinds the NAME d; does not touch the object c still names
    print(f"\nc = {c}   <- unaffected by d's reassignment")
    print(f"d = {d}")


if __name__ == "__main__":
    demonstrate()
