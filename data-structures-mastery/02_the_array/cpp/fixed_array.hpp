#pragma once
#include <cstddef>     // std::size_t
#include <stdexcept>   // std::out_of_range

// Same structure as Module 02's C version, but idiomatic C++: instead
// of a bool/int return code the caller must remember to check,
// out-of-bounds access throws std::out_of_range. See DECISIONS.md #1.

constexpr std::size_t kFixedArrayCapacity = 8;

class FixedArray {
public:
    FixedArray() : length_(0) {}   // starts empty, exactly like array_init()

    // O(1). Throws std::out_of_range if index >= length().
    int get(std::size_t index) const;

    // O(1). Throws std::out_of_range if index >= length().
    void set(std::size_t index, int value);

    // O(1). Throws std::out_of_range if the array is already full.
    void push(int value);

    std::size_t length() const { return length_; }

    // Address of a slot, no bounds check -- demo/teaching use only,
    // mirrors the C version's array_raw_address().
    const int *raw_address(std::size_t index) const { return &data_[index]; }

private:
    int data_[kFixedArrayCapacity];
    std::size_t length_;
};
