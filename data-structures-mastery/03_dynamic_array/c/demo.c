#include "dynamic_array.h"
#include <stdio.h>

/* NOT part of the shipped DynamicArray -- a standalone simulation of a
 * DIFFERENT growth policy (add exactly one slot every time the array is
 * full), purely so this demo can measure and compare it against
 * doubling. This course's real DynamicArray always doubles. */
static size_t simulate_linear_growth_copies(size_t n) {
    size_t capacity = 0, length = 0, total_copies = 0;
    for (size_t i = 0; i < n; i++) {
        if (length == capacity) {
            capacity += 1;           /* the "bad" policy: exactly one more slot */
            total_copies += length;  /* every existing element must move */
        }
        length++;
    }
    return total_copies;
}

int main(void) {
    DynamicArray arr;
    array_init(&arr);

    const size_t N = 1000;
    size_t last_capacity = 0;

    printf("Pushing %zu values, one at a time -- watch capacity double:\n", N);
    for (size_t i = 0; i < N; i++) {
        array_push(&arr, (int)i);
        if (array_capacity(&arr) != last_capacity) {
            printf("  after push #%-4zu length=%-4zu capacity grew to %zu\n",
                   i + 1, array_length(&arr), array_capacity(&arr));
            last_capacity = array_capacity(&arr);
        }
    }

    printf("\nFinal: length=%zu, capacity=%zu\n", array_length(&arr), array_capacity(&arr));
    printf("Total element copies performed by DOUBLING growth: %zu\n", arr.total_element_copies);

    size_t linear_copies = simulate_linear_growth_copies(N);
    printf("Total element copies a LINEAR (+1) growth policy would have performed: %zu\n",
           linear_copies);
    printf("(%zu pushes: doubling copied ~%.1fx n elements total; linear would have copied ~%.1fx n)\n",
           N,
           (double)arr.total_element_copies / (double)N,
           (double)linear_copies / (double)N);

    array_free(&arr);
    return 0;
}
