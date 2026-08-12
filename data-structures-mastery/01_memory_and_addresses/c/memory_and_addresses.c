#include "memory_and_addresses.h"

/* Implementation only -- deliberately no main() here. Both demo.c and
 * test_memory_and_addresses.c need their own main(), and a C program may
 * link in exactly one main() -- see DECISIONS.md, "Why the demo lives in
 * its own file." */

void swap_ints(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

ptrdiff_t array_stride_bytes(const int *arr) {
    /* Cast to char* first: pointer subtraction on int* would report the
     * distance in "number of ints," not bytes. Casting to a 1-byte type
     * makes the subtraction report raw bytes instead. */
    return (const char *)&arr[1] - (const char *)&arr[0];
}
