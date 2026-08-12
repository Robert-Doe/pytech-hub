#pragma once
#include <cstddef> // std::ptrdiff_t

// Pointer version -- mirrors the C API exactly. Can be given a null
// pointer (that's on the caller to avoid); can be re-pointed later.
void swap_ints(int *a, int *b);

// Reference version -- same operation, safer interface. A reference
// must already be bound to something, so there's no null to guard
// against, and no separate dereference step at the call site.
void swap_ints_ref(int &a, int &b);

// Same proof as the C version: neighboring array elements are exactly
// sizeof(int) bytes apart, always.
std::ptrdiff_t array_stride_bytes(const int *arr);
