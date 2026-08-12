"""Module 02 -- The Array (Python).

Python's built-in list is already dynamic (it grows) -- there is no
built-in fixed-CAPACITY sequence type an average Python program would
reach for. To keep this module's lesson (fixed capacity, O(1) indexed
access, explicit "the array is full" failure) honest across all three
languages, this class *simulates* a fixed-capacity array: it
pre-allocates a list of a set size filled with None, and enforces the
capacity itself instead of relying on a language guarantee. See
DECISIONS.md #3.
"""

FIXED_ARRAY_CAPACITY = 8


class FixedArrayFullError(Exception):
    """Raised by push() when the array is already at capacity."""


class FixedArray:
    def __init__(self):
        # Pre-size the backing list and fill it with a placeholder --
        # this is what makes it "fixed capacity" rather than a plain
        # Python list, which would just grow silently on append().
        self._data = [None] * FIXED_ARRAY_CAPACITY
        self._length = 0  # how many of the 8 slots are actually in use

    def __len__(self):
        return self._length

    def get(self, index):
        """O(1). Raises IndexError if index is out of bounds."""
        if not (0 <= index < self._length):
            raise IndexError(f"FixedArray index {index} out of range (length={self._length})")
        return self._data[index]

    def set(self, index, value):
        """O(1). Raises IndexError if index is out of bounds."""
        if not (0 <= index < self._length):
            raise IndexError(f"FixedArray index {index} out of range (length={self._length})")
        self._data[index] = value

    def push(self, value):
        """O(1). Raises FixedArrayFullError if already at capacity."""
        if self._length >= FIXED_ARRAY_CAPACITY:
            raise FixedArrayFullError("FixedArray is full (capacity=8)")
        self._data[self._length] = value
        self._length += 1


def demonstrate():
    arr = FixedArray()

    # ---- Section 1: push until full ----
    print("Pushing 0..7 into an 8-slot FixedArray:")
    for i in range(FIXED_ARRAY_CAPACITY):
        arr.push(i * 10)
        print(f"  push({i * 10}) -> ok, length now {len(arr)}")

    # ---- Section 2: one more push must raise -- the array is FIXED ----
    print("\npush(999) on a full array -> ", end="")
    try:
        arr.push(999)
        print("ok (BUG!)")
    except FixedArrayFullError as e:
        print(f"raised FixedArrayFullError: \"{e}\"")

    # ---- Section 3: O(1) get, by index, no matter which index ----
    print("\nRandom access -- every one of these costs the same:")
    print(f"  get(0) = {arr.get(0)}")
    print(f"  get(7) = {arr.get(7)}")
    print(f"  get(4) = {arr.get(4)}")

    # ---- Section 4: bounds checking rejects an invalid index cleanly ----
    print("\nget(100) on a length-8 array -> ", end="")
    try:
        arr.get(100)
        print("ok (BUG!)")
    except IndexError as e:
        print(f"raised IndexError: \"{e}\"")


if __name__ == "__main__":
    demonstrate()
