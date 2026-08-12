#include "fixed_array.hpp"
#include <iostream>

int main() {
    FixedArray arr;

    // ---- Section 1: push until full ----
    std::cout << "Pushing 0..7 into an 8-slot FixedArray:\n";
    for (int i = 0; i < static_cast<int>(kFixedArrayCapacity); i++) {
        arr.push(i * 10);
        std::cout << "  push(" << i * 10 << ") -> ok, length now " << arr.length() << "\n";
    }

    // ---- Section 2: one more push must throw -- the array is FIXED ----
    std::cout << "\npush(999) on a full array -> ";
    try {
        arr.push(999);
        std::cout << "ok (BUG!)\n";
    } catch (const std::out_of_range &e) {
        std::cout << "threw std::out_of_range: \"" << e.what() << "\"\n";
    }

    // ---- Section 3: O(1) get, by index, no matter which index ----
    std::cout << "\nRandom access -- every one of these costs the same:\n";
    std::cout << "  get(0) = " << arr.get(0) << "\n";
    std::cout << "  get(7) = " << arr.get(7) << "\n";
    std::cout << "  get(4) = " << arr.get(4) << "\n";

    // ---- Section 4: bounds checking rejects an invalid index cleanly ----
    std::cout << "\nget(100) on a length-8 array -> ";
    try {
        arr.get(100);
        std::cout << "ok (BUG!)\n";
    } catch (const std::out_of_range &e) {
        std::cout << "threw std::out_of_range: \"" << e.what() << "\"\n";
    }

    // ---- Section 5: the address arithmetic behind get()/set() ----
    std::cout << "\nAddress of each slot -- proving index arithmetic, not magic:\n";
    for (std::size_t i = 0; i < arr.length(); i++) {
        std::cout << "  &data[" << i << "] = " << static_cast<const void *>(arr.raw_address(i)) << "\n";
    }

    return 0;
}
