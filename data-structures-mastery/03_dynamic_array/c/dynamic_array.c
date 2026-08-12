#include "dynamic_array.h"
#include <stdlib.h>

void array_init(DynamicArray *arr) {
    arr->data = NULL;
    arr->length = 0;
    arr->capacity = 0;
    arr->total_element_copies = 0;
}

void array_free(DynamicArray *arr) {
    free(arr->data);
    arr->data = NULL;
    arr->length = 0;
    arr->capacity = 0;
}

int array_get(const DynamicArray *arr, size_t index, int *out_value) {
    if (index >= arr->length) {
        return 0;
    }
    *out_value = arr->data[index];
    return 1;
}

int array_set(DynamicArray *arr, size_t index, int value) {
    if (index >= arr->length) {
        return 0;
    }
    arr->data[index] = value;
    return 1;
}

/* The heart of this module: when full, allocate a block TWICE as big,
 * copy every existing element across, then release the old block. */
static void array_grow(DynamicArray *arr) {
    size_t new_capacity = (arr->capacity == 0) ? 1 : arr->capacity * 2;
    int *new_data = malloc(new_capacity * sizeof(int));

    for (size_t i = 0; i < arr->length; i++) {
        new_data[i] = arr->data[i];
    }
    arr->total_element_copies += arr->length; /* every existing element just moved */

    free(arr->data);
    arr->data = new_data;
    arr->capacity = new_capacity;
}

void array_push(DynamicArray *arr, int value) {
    if (arr->length == arr->capacity) {
        array_grow(arr);
    }
    arr->data[arr->length] = value;
    arr->length++;
}

size_t array_length(const DynamicArray *arr) {
    return arr->length;
}

size_t array_capacity(const DynamicArray *arr) {
    return arr->capacity;
}
