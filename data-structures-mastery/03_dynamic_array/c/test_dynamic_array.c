#include "dynamic_array.h"
#include <assert.h>
#include <stdio.h>

/* smallest power of two >= n (n >= 1) */
static size_t smallest_pow2_at_least(size_t n) {
    size_t p = 1;
    while (p < n) {
        p *= 2;
    }
    return p;
}

int main(void) {
    DynamicArray arr;
    array_init(&arr);

    /* fresh array: empty, no allocation yet */
    assert(array_length(&arr) == 0);
    assert(array_capacity(&arr) == 0);

    /* push never refuses -- unlike Module 02's FixedArray */
    const size_t N = 1000;
    for (size_t i = 0; i < N; i++) {
        array_push(&arr, (int)i);
    }
    assert(array_length(&arr) == N);

    /* capacity is always the smallest power of two >= length */
    assert(array_capacity(&arr) == smallest_pow2_at_least(N));

    /* every value pushed is retrievable, in order, unchanged */
    int value;
    for (size_t i = 0; i < N; i++) {
        assert(array_get(&arr, i, &value) == 1);
        assert(value == (int)i);
    }

    /* out-of-bounds get/set still fail cleanly, exactly like Module 02 */
    assert(array_get(&arr, N + 100, &value) == 0);
    assert(array_set(&arr, N + 100, 1) == 0);

    /* set overwrites an in-bounds slot */
    assert(array_set(&arr, 5, 999) == 1);
    array_get(&arr, 5, &value);
    assert(value == 999);

    /* amortized O(1) claim, checked concretely: total copies across N
     * pushes must stay proportional to N, not N^2. A loose but real
     * bound: total copies must be less than 2*N. (Actual is close to N.) */
    assert(arr.total_element_copies < 2 * N);

    array_free(&arr);

    printf("All C tests passed.\n");
    return 0;
}
