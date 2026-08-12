#include "memory_and_addresses.h"
#include <stdio.h>

int main(void) {
    /* ---- Section 1: every variable lives at an address ---- */
    int x = 5;
    int y = 99;
    printf("x = %d, stored at address %p\n", x, (void *)&x);
    printf("y = %d, stored at address %p\n", y, (void *)&y);

    /* ---- Section 2: a pointer is its own separate variable ---- */
    int *p = &x;
    printf("\np  = %p   (p HOLDS x's address)\n", (void *)p);
    printf("&p = %p   (p ITSELF also lives somewhere, a third address)\n", (void *)&p);
    printf("*p = %d          (dereferencing p reads x's value)\n", *p);

    /* ---- Section 3: swap by address, not by value ---- */
    printf("\nBefore swap: x=%d y=%d\n", x, y);
    swap_ints(&x, &y);
    printf("After  swap: x=%d y=%d\n", x, y);

    /* ---- Section 4: array elements are contiguous ---- */
    int arr[5] = {10, 20, 30, 40, 50};
    printf("\narr[0] address: %p\n", (void *)&arr[0]);
    printf("arr[1] address: %p\n", (void *)&arr[1]);
    printf("stride = %td bytes   (sizeof(int) = %zu)\n",
           array_stride_bytes(arr), sizeof(int));

    return 0;
}
