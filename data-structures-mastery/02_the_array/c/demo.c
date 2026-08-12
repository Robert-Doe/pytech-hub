#include "fixed_array.h"
#include <stdio.h>

int main(void) {
    FixedArray arr;
    array_init(&arr);

    /* ---- Section 1: push until full ---- */
    printf("Pushing 0..7 into an 8-slot FixedArray:\n");
    for (int i = 0; i < FIXED_ARRAY_CAPACITY; i++) {
        int ok = array_push(&arr, i * 10);
        printf("  push(%d) -> %s, length now %zu\n",
               i * 10, ok ? "ok" : "FAILED", array_length(&arr));
    }

    /* ---- Section 2: one more push must fail -- the array is FIXED ---- */
    int overflow_ok = array_push(&arr, 999);
    printf("\npush(999) on a full array -> %s (this is the point of this module)\n",
           overflow_ok ? "ok (BUG!)" : "FAILED, as expected");

    /* ---- Section 3: O(1) get, by index, no matter which index ---- */
    printf("\nRandom access -- every one of these costs the same:\n");
    int value;
    array_get(&arr, 0, &value);
    printf("  get(0) = %d\n", value);
    array_get(&arr, 7, &value);
    printf("  get(7) = %d\n", value);
    array_get(&arr, 4, &value);
    printf("  get(4) = %d\n", value);

    /* ---- Section 4: bounds checking rejects an invalid index cleanly ---- */
    int bad_ok = array_get(&arr, 100, &value);
    printf("\nget(100) on a length-8 array -> %s\n",
           bad_ok ? "ok (BUG!)" : "FAILED, as expected (no crash)");

    /* ---- Section 5: the address arithmetic behind get()/set() ---- */
    printf("\nAddress of each slot -- proving index arithmetic, not magic:\n");
    for (size_t i = 0; i < array_length(&arr); i++) {
        printf("  &data[%zu] = %p\n", i, (const void *)array_raw_address(&arr, i));
    }

    return 0;
}
