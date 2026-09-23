/**
 * Faithful TypeScript port of the dynamic array taught in
 * data-structures-mastery/02_the_array and .../03_dynamic_array
 * (see 03_dynamic_array/c/dynamic_array.c / dynamic_array.h).
 *
 * Same growth policy as the C source: capacity starts at 0 (nothing is
 * allocated until the first push), and every time `length === capacity`,
 * `grow()` allocates a block exactly TWICE as large, copies every
 * existing element into it, then the old block is discarded, the same
 * doubling policy, the same "copy every existing element" cost per
 * resize, the same amortized-O(1) push described in dynamic_array.h:
 *
 *   "Amortized O(1): most calls are O(1); the rare call that triggers a
 *    resize is O(n), but resizes happen rarely enough that the AVERAGE
 *    cost per push, across many pushes, stays O(1)."
 *
 * Memory addresses are simulated per module 01's "memory & addresses"
 * framing (see memory_and_addresses.c's `array_stride_bytes`): elements
 * of a C `int[]` sit at consecutive 4-byte offsets from a single base
 * address. Each backing block here gets its own fake base address, so a
 * reallocation is visibly a move to a NEW block, not the same addresses
 * relabeled in place.
 */

/** sizeof(int) on the reference platform this course targets (see array_stride_bytes()). */
export const ELEMENT_STRIDE_BYTES = 4;

/** Purely cosmetic gap between simulated heap allocations, so consecutive blocks don't visually overlap. */
const HEAP_BLOCK_GAP = 0x20;

export interface Slot {
  value: number;
  address: string;
}

export interface PushResult {
  reallocated: boolean;
  before?: Slot[];
  oldCapacity?: number;
  newCapacity?: number;
  slots: Slot[];
  length: number;
  capacity: number;
  totalElementCopies: number;
  reallocations: number;
}

function toHex(n: number): string {
  return '0x' + n.toString(16).padStart(8, '0');
}

export class DynamicArray {
  private blockBase = 0;
  private data: Slot[] = [];
  private nextHeapPointer = 0x1000;

  length = 0;
  capacity = 0;
  totalElementCopies = 0;
  reallocations = 0;

  private allocateNewBlockBase(capacity: number): number {
    const base = this.nextHeapPointer;
    this.nextHeapPointer += capacity * ELEMENT_STRIDE_BYTES + HEAP_BLOCK_GAP;
    return base;
  }

  /** Port of array_push(): grow first if full, then place and advance length. */
  push(value: number): PushResult {
    let reallocated = false;
    let before: Slot[] | undefined;
    let oldCapacity: number | undefined;
    let newCapacityForResult: number | undefined;

    if (this.length === this.capacity) {
      // --- Port of array_grow(): allocate a block TWICE as big, copy
      // every existing element across, then release the old block. ---
      before = this.data.slice(0, this.length);
      oldCapacity = this.capacity;

      const newCapacity = this.capacity === 0 ? 1 : this.capacity * 2;
      const newBase = this.allocateNewBlockBase(newCapacity);
      const newData: Slot[] = [];
      for (let i = 0; i < this.length; i++) {
        newData.push({ value: this.data[i].value, address: toHex(newBase + i * ELEMENT_STRIDE_BYTES) });
      }
      this.totalElementCopies += this.length; // every existing element just moved

      this.data = newData;
      this.capacity = newCapacity;
      this.blockBase = newBase;
      this.reallocations++;
      reallocated = true;
      newCapacityForResult = newCapacity;
    }

    this.data[this.length] = {
      value,
      address: toHex(this.blockBase + this.length * ELEMENT_STRIDE_BYTES),
    };
    this.length++;

    return {
      reallocated,
      before,
      oldCapacity,
      newCapacity: newCapacityForResult,
      slots: this.data.slice(0, this.length),
      length: this.length,
      capacity: this.capacity,
      totalElementCopies: this.totalElementCopies,
      reallocations: this.reallocations,
    };
  }

  reset(): void {
    this.blockBase = 0;
    this.data = [];
    this.nextHeapPointer = 0x1000;
    this.length = 0;
    this.capacity = 0;
    this.totalElementCopies = 0;
    this.reallocations = 0;
  }
}
