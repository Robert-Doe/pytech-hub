#ifndef FIXED_ARRAY_H
#define FIXED_ARRAY_H

#include <stddef.h> /* size_t */

/* A fixed-capacity array of ints, living entirely on the stack (see
 * Module 01) -- capacity is set at compile time, exactly like a plain
 * C array, but wrapped so the course can attach bounds-checked methods
 * without leaking raw pointer arithmetic into every caller. */

#define FIXED_ARRAY_CAPACITY 8

typedef struct {
    int data[FIXED_ARRAY_CAPACITY];
    size_t length; /* how many of the 8 slots are actually in use */
} FixedArray;

/* Must be called before anything else -- zeroes length so the array
 * starts empty. C gives no other guarantee about a struct's initial
 * contents. */
void array_init(FixedArray *arr);

/* O(1): reads data[index] into *out_value.
 * Returns 1 on success, 0 if index is out of bounds (0 <= index < length). */
int array_get(const FixedArray *arr, size_t index, int *out_value);

/* O(1): overwrites data[index] with value.
 * Returns 1 on success, 0 if index is out of bounds. */
int array_set(FixedArray *arr, size_t index, int value);

/* O(1): appends value at data[length], then increments length.
 * Returns 1 on success, 0 if the array is already at FIXED_ARRAY_CAPACITY. */
int array_push(FixedArray *arr, int value);

/* O(1): how many slots are currently in use. */
size_t array_length(const FixedArray *arr);

/* Returns the address of data[index] without any bounds check -- used
 * only to demonstrate the underlying address arithmetic in the demo;
 * never call this with an out-of-range index. */
const int *array_raw_address(const FixedArray *arr, size_t index);

#endif /* FIXED_ARRAY_H */
