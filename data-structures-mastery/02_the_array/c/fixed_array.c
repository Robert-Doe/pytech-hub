#include "fixed_array.h"

void array_init(FixedArray *arr) {
    arr->length = 0;
    /* data[] is intentionally left uninitialized beyond what length
     * already hides from callers -- see DECISIONS.md #2. */
}

int array_get(const FixedArray *arr, size_t index, int *out_value) {
    if (index >= arr->length) {
        return 0; /* out of bounds: caller asked for a slot not in use */
    }
    *out_value = arr->data[index];
    return 1;
}

int array_set(FixedArray *arr, size_t index, int value) {
    if (index >= arr->length) {
        return 0;
    }
    arr->data[index] = value;
    return 1;
}

int array_push(FixedArray *arr, int value) {
    if (arr->length >= FIXED_ARRAY_CAPACITY) {
        return 0; /* full: this is a FIXED array, it does not grow */
    }
    arr->data[arr->length] = value;
    arr->length++;
    return 1;
}

size_t array_length(const FixedArray *arr) {
    return arr->length;
}

const int *array_raw_address(const FixedArray *arr, size_t index) {
    return &arr->data[index];
}
