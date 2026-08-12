#include "memory_and_addresses.h"
#include <assert.h>
#include <stdio.h>

int main(void) {
    /* swap_ints must actually exchange the two values */
    int a = 1, b = 2;
    swap_ints(&a, &b);
    assert(a == 2 && b == 1);

    /* array_stride_bytes must equal sizeof(int) for a plain int array --
     * this is the proof that array elements sit back-to-back in memory */
    int arr[3] = {0, 0, 0};
    assert(array_stride_bytes(arr) == (ptrdiff_t)sizeof(int));

    /* swapping a value with itself must be a safe no-op */
    int c = 42;
    swap_ints(&c, &c);
    assert(c == 42);

    printf("All C tests passed.\n");
    return 0;
}
