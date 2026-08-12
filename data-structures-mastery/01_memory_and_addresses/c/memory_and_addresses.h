#ifndef MEMORY_AND_ADDRESSES_H
#define MEMORY_AND_ADDRESSES_H

#include <stddef.h> /* ptrdiff_t */

/* Swaps the values pointed to by a and b.
 * Proves a function can modify the CALLER's variables when handed
 * addresses instead of copies. */
void swap_ints(int *a, int *b);

/* Returns the address distance, in bytes, between arr[1] and arr[0].
 * Proves array elements are laid out contiguously: the stride between
 * any two neighbors equals sizeof(the element type), always. */
ptrdiff_t array_stride_bytes(const int *arr);

#endif /* MEMORY_AND_ADDRESSES_H */
