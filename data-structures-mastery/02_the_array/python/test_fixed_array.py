from fixed_array import FixedArray, FixedArrayFullError, FIXED_ARRAY_CAPACITY


def test_starts_empty():
    arr = FixedArray()
    assert len(arr) == 0


def test_push_fills_in_order():
    arr = FixedArray()
    for i in range(FIXED_ARRAY_CAPACITY):
        arr.push(i)
    assert len(arr) == FIXED_ARRAY_CAPACITY
    for i in range(FIXED_ARRAY_CAPACITY):
        assert arr.get(i) == i


def test_push_past_capacity_raises_and_does_not_grow():
    arr = FixedArray()
    for i in range(FIXED_ARRAY_CAPACITY):
        arr.push(i)
    try:
        arr.push(999)
        assert False, "expected FixedArrayFullError"
    except FixedArrayFullError:
        pass
    assert len(arr) == FIXED_ARRAY_CAPACITY


def test_get_out_of_bounds_raises():
    arr = FixedArray()
    arr.push(1)
    try:
        arr.get(5)
        assert False, "expected IndexError"
    except IndexError:
        pass


def test_set_overwrites_in_bounds_slot():
    arr = FixedArray()
    for i in range(3):
        arr.push(i)
    arr.set(1, 777)
    assert arr.get(1) == 777


def test_set_out_of_bounds_raises():
    arr = FixedArray()
    arr.push(1)
    try:
        arr.set(5, 1)
        assert False, "expected IndexError"
    except IndexError:
        pass


if __name__ == "__main__":
    test_starts_empty()
    test_push_fills_in_order()
    test_push_past_capacity_raises_and_does_not_grow()
    test_get_out_of_bounds_raises()
    test_set_overwrites_in_bounds_slot()
    test_set_out_of_bounds_raises()
    print("All Python tests passed.")
