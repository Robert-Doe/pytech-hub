#include "memory_and_addresses.hpp"
#include <iostream>

int main() {
    // ---- Section 1: every variable lives at an address ----
    int x = 5, y = 99;
    std::cout << "x = " << x << ", stored at address " << &x << "\n";
    std::cout << "y = " << y << ", stored at address " << &y << "\n";

    // ---- Section 2: a pointer is its own separate variable ----
    int *p = &x;
    std::cout << "\np  = " << p << "   (p HOLDS x's address)\n";
    std::cout << "&p = " << &p << "   (p ITSELF also lives somewhere)\n";
    std::cout << "*p = " << *p << "          (dereferencing p reads x's value)\n";

    // ---- Section 3: a reference is an alias, not a new variable ----
    int &r = x;
    std::cout << "\nr is bound to x. &r == &x? "
              << (&r == &x ? "yes" : "no") << "\n";

    // ---- Section 4: swap by pointer, then by reference ----
    std::cout << "\nBefore swap (pointer):   x=" << x << " y=" << y << "\n";
    swap_ints(&x, &y);
    std::cout << "After  swap (pointer):   x=" << x << " y=" << y << "\n";

    std::cout << "\nBefore swap (reference): x=" << x << " y=" << y << "\n";
    swap_ints_ref(x, y);
    std::cout << "After  swap (reference): x=" << x << " y=" << y << "\n";

    // ---- Section 5: array elements are contiguous ----
    int arr[5] = {10, 20, 30, 40, 50};
    std::cout << "\narr[0] address: " << static_cast<void *>(&arr[0]) << "\n";
    std::cout << "arr[1] address: " << static_cast<void *>(&arr[1]) << "\n";
    std::cout << "stride = " << array_stride_bytes(arr)
              << " bytes   (sizeof(int) = " << sizeof(int) << ")\n";

    return 0;
}
