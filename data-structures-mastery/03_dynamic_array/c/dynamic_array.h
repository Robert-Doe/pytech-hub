#ifndef DYNAMIC_ARRAY_H
#define DYNAMIC_ARRAY_H

#include <stddef.h> /* size_t */

/* Like Module 02's FixedArray, but the backing storage now lives on the
 * HEAP (see prerequisites/01_variables_and_memory) and doubles in size
 * whenever it fills up -- so push() never refuses. */

typedef struct {
    int *data;                     /* NULL until the first push */
    size_t length;                 /* how many slots are in use */
    size_t capacity;                /* how many slots are allocated */
    size_t total_element_copies;   /* running total, across every resize ever performed */
} DynamicArray;

/* Must be called before anything else. Starts with capacity 0 and no
 * allocation at all -- the first push() is what triggers the first
 * malloc. */
void array_init(DynamicArray *arr);

/* Releases the heap block. Must be called exactly once when the array
 * is no longer needed -- C has no destructor to do this for you. */
void array_free(DynamicArray *arr);

/* O(1). Returns 1 on success, 0 if index is out of bounds. */
int array_get(const DynamicArray *arr, size_t index, int *out_value);

/* O(1). Returns 1 on success, 0 if index is out of bounds. */
int array_set(DynamicArray *arr, size_t index, int value);

/* Amortized O(1): most calls are O(1); the rare call that triggers a
 * resize is O(n), but resizes happen rarely enough that the AVERAGE
 * cost per push, across many pushes, stays O(1). Always succeeds
 * (barring allocation failure) -- unlike Module 02, this never refuses. */
void array_push(DynamicArray *arr, int value);

size_t array_length(const DynamicArray *arr);
size_t array_capacity(const DynamicArray *arr);

#endif /* DYNAMIC_ARRAY_H */
