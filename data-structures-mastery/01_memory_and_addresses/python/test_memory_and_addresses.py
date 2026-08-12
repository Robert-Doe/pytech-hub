from memory_and_addresses import swap_via_temp


def test_swap_via_temp_swaps_values():
    arr = [1, 2, 3]
    swap_via_temp(arr, 0, 2)
    assert arr == [3, 2, 1]


def test_swap_via_temp_self_swap_is_noop():
    arr = [7]
    swap_via_temp(arr, 0, 0)
    assert arr == [7]


def test_aliasing_shares_identity():
    a = [1, 2, 3]
    b = a
    assert id(a) == id(b)
    b.append(4)
    assert a == [1, 2, 3, 4]  # mutation through b is visible through a


def test_reassignment_breaks_aliasing():
    a = [1, 2, 3]
    b = a
    b = [9, 9, 9]  # rebinds b; a is untouched
    assert a == [1, 2, 3]
    assert id(a) != id(b)


if __name__ == "__main__":
    test_swap_via_temp_swaps_values()
    test_swap_via_temp_self_swap_is_noop()
    test_aliasing_shares_identity()
    test_reassignment_breaks_aliasing()
    print("All Python tests passed.")
