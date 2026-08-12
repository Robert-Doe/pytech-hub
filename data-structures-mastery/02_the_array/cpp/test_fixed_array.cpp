#include "fixed_array.hpp"
#include <cassert>
#include <iostream>

int main() {
    FixedArray arr;
    assert(arr.length() == 0);

    for (int i = 0; i < static_cast<int>(kFixedArrayCapacity); i++) {
        arr.push(i);
    }
    assert(arr.length() == kFixedArrayCapacity);

    // pushing past capacity must throw, and must not change length
    bool threw = false;
    try {
        arr.push(999);
    } catch (const std::out_of_range &) {
        threw = true;
    }
    assert(threw);
    assert(arr.length() == kFixedArrayCapacity);

    // get returns exactly what was pushed, in order
    for (int i = 0; i < static_cast<int>(kFixedArrayCapacity); i++) {
        assert(arr.get(static_cast<std::size_t>(i)) == i);
    }

    // get on an out-of-bounds index throws
    threw = false;
    try {
        arr.get(999);
    } catch (const std::out_of_range &) {
        threw = true;
    }
    assert(threw);

    // set overwrites an in-bounds slot
    arr.set(3, 777);
    assert(arr.get(3) == 777);

    // set on an out-of-bounds index throws
    threw = false;
    try {
        arr.set(999, 1);
    } catch (const std::out_of_range &) {
        threw = true;
    }
    assert(threw);

    // stride proof: neighboring slots are exactly sizeof(int) bytes apart
    const int *p0 = arr.raw_address(0);
    const int *p1 = arr.raw_address(1);
    assert(reinterpret_cast<const char *>(p1) - reinterpret_cast<const char *>(p0) ==
           static_cast<std::ptrdiff_t>(sizeof(int)));

    std::cout << "All C++ tests passed.\n";
    return 0;
}
