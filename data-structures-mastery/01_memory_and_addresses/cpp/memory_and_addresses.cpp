#include "memory_and_addresses.hpp"

// Implementation only -- no main() here. See demo.cpp and
// test_memory_and_addresses.cpp for the two executables that link
// against this file; a C++ program may only have one main().

void swap_ints(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void swap_ints_ref(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

std::ptrdiff_t array_stride_bytes(const int *arr) {
    return reinterpret_cast<const char *>(&arr[1]) -
           reinterpret_cast<const char *>(&arr[0]);
}
