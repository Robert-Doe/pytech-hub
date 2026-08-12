#include "fixed_array.h"
#include <assert.h>
#include <stdio.h>

int main(void) {
    FixedArray arr;
    array_init(&arr);

    /* a fresh array has length 0 */
    assert(array_length(&arr) == 0);

    /* push fills slots in order and reports success */
    for (int i = 0; i < FIXED_ARRAY_CAPACITY; i++) {
        assert(array_push(&arr, i) == 1);
    }
    assert(array_length(&arr) == FIXED_ARRAY_CAPACITY);

    /* pushing past capacity must fail and must NOT change length */
    assert(array_push(&arr, 999) == 0);
    assert(array_length(&arr) == FIXED_ARRAY_CAPACITY);

    /* get returns the exact values pushed, in order */
    int value;
    for (int i = 0; i < FIXED_ARRAY_CAPACITY; i++) {
        assert(array_get(&arr, (size_t)i, &value) == 1);
        assert(value == i);
    }

    /* get on an out-of-bounds index fails and leaves *out_value untouched */
    value = -1;
    assert(array_get(&arr, 999, &value) == 0);
    assert(value == -1);

    /* set overwrites an in-bounds slot */
    assert(array_set(&arr, 3, 777) == 1);
    array_get(&arr, 3, &value);
    assert(value == 777);

    /* set on an out-of-bounds index fails */
    assert(array_set(&arr, 999, 1) == 0);

    /* stride proof, reused from Module 01: neighboring slots are
     * exactly sizeof(int) bytes apart */
    const int *p0 = array_raw_address(&arr, 0);
    const int *p1 = array_raw_address(&arr, 1);
    assert((const char *)p1 - (const char *)p0 == (ptrdiff_t)sizeof(int));

    printf("All C tests passed.\n");
    return 0;
}
