#include "memory_and_addresses.hpp"
#include <cassert>
#include <iostream>

int main() {
    // swap_ints (pointer version) must exchange the two values
    int a = 1, b = 2;
    swap_ints(&a, &b);
    assert(a == 2 && b == 1);

    // swap_ints_ref (reference version) must do the same thing
    int c = 10, d = 20;
    swap_ints_ref(c, d);
    assert(c == 20 && d == 10);

    // array_stride_bytes must equal sizeof(int)
    int arr[3] = {0, 0, 0};
    assert(array_stride_bytes(arr) == static_cast<std::ptrdiff_t>(sizeof(int)));

    // a reference genuinely aliases its target -- same address
    int e = 5;
    int &re = e;
    assert(&re == &e);

    std::cout << "All C++ tests passed.\n";
    return 0;
}
