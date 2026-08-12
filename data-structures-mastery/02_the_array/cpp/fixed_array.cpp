#include "fixed_array.hpp"

int FixedArray::get(std::size_t index) const {
    if (index >= length_) {
        throw std::out_of_range("FixedArray::get: index out of range");
    }
    return data_[index];
}

void FixedArray::set(std::size_t index, int value) {
    if (index >= length_) {
        throw std::out_of_range("FixedArray::set: index out of range");
    }
    data_[index] = value;
}

void FixedArray::push(int value) {
    if (length_ >= kFixedArrayCapacity) {
        throw std::out_of_range("FixedArray::push: array is full");
    }
    data_[length_] = value;
    length_++;
}
