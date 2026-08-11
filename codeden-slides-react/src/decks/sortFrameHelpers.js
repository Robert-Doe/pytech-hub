// Runs the four lesson sorts for real and records one frame per meaningful
// operation, so SortingBarsSlide always shows a mathematically correct
// execution — never a hand-faked animation.
//
// Frame shape: { array, compare, swap, merge, pivot, sorted, note }
//   array   — full array snapshot at this instant
//   compare — [i, j] indices being compared this frame, or null
//   swap    — [i, j] indices just swapped this frame, or null
//   merge   — [i, ...] indices just placed by a merge step, or null
//   pivot   — index of the current pivot (quicksort), or null
//   sorted  — indices already known to be in final position (colored green)
//   note    — plain-language caption for this frame

const snap = (arr) => arr.slice()

export function bubbleSortFrames(input) {
  const items = input.slice()
  const n = items.length
  const frames = [{ array: snap(items), compare: null, swap: null, sorted: [], note: `Starting array: [${items.join(', ')}]` }]
  let swaps = 0
  for (let i = 0; i < n; i++) {
    const sortedTail = Array.from({ length: i }, (_, k) => n - 1 - k)
    for (let j = 0; j < n - i - 1; j++) {
      frames.push({ array: snap(items), compare: [j, j + 1], swap: null, sorted: sortedTail, note: `Compare index ${j} (${items[j]}) and ${j + 1} (${items[j + 1]})` })
      if (items[j] > items[j + 1]) {
        const a = items[j], b = items[j + 1]
        ;[items[j], items[j + 1]] = [items[j + 1], items[j]]
        swaps += 1
        frames.push({ array: snap(items), compare: null, swap: [j, j + 1], sorted: sortedTail, note: `${a} > ${b} — swap! (swap #${swaps})` })
      }
    }
  }
  frames.push({ array: snap(items), compare: null, swap: null, sorted: Array.from({ length: n }, (_, k) => k), note: `Done — ${swaps} total swaps` })
  return frames
}

export function insertionSortFrames(input) {
  const items = input.slice()
  const n = items.length
  const frames = [{ array: snap(items), compare: null, swap: null, sorted: n ? [0] : [], note: `Starting array: [${items.join(', ')}]` }]
  for (let i = 1; i < n; i++) {
    const key = items[i]
    let j = i - 1
    frames.push({ array: snap(items), compare: [i], swap: null, sorted: Array.from({ length: i }, (_, k) => k), note: `Hold ${key} (index ${i}) as the next card to insert` })
    while (j >= 0 && items[j] > key) {
      frames.push({ array: snap(items), compare: [j, j + 1], swap: null, sorted: Array.from({ length: i }, (_, k) => k), note: `${items[j]} > ${key} — shift ${items[j]} one step right` })
      items[j + 1] = items[j]
      j -= 1
    }
    items[j + 1] = key
    frames.push({ array: snap(items), compare: null, swap: [j + 1], sorted: Array.from({ length: i + 1 }, (_, k) => k), note: `Place ${key} at index ${j + 1}` })
  }
  frames.push({ array: snap(items), compare: null, swap: null, sorted: Array.from({ length: n }, (_, k) => k), note: 'Done — fully sorted' })
  return frames
}

export function mergeSortFrames(input) {
  const items = input.slice()
  const frames = [{ array: snap(items), compare: null, swap: null, merge: null, sorted: [], note: `Starting array: [${items.join(', ')}]` }]

  function merge(lo, mid, hi) {
    const left = items.slice(lo, mid)
    const right = items.slice(mid, hi)
    let i = 0, j = 0, k = lo
    frames.push({ array: snap(items), compare: null, swap: null, merge: null, sorted: [], note: `Merge [${left.join(',')}] with [${right.join(',')}]` })
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) { items[k] = left[i]; i += 1 } else { items[k] = right[j]; j += 1 }
      frames.push({ array: snap(items), compare: null, swap: null, merge: [k], sorted: [], note: `Place ${items[k]} at index ${k}` })
      k += 1
    }
    while (i < left.length) { items[k] = left[i]; frames.push({ array: snap(items), compare: null, swap: null, merge: [k], sorted: [], note: `Place remaining ${items[k]} at index ${k}` }); i += 1; k += 1 }
    while (j < right.length) { items[k] = right[j]; frames.push({ array: snap(items), compare: null, swap: null, merge: [k], sorted: [], note: `Place remaining ${items[k]} at index ${k}` }); j += 1; k += 1 }
  }

  function sort(lo, hi) {
    if (hi - lo <= 1) return
    const mid = Math.floor((lo + hi) / 2)
    frames.push({ array: snap(items), compare: null, swap: null, merge: null, sorted: [], note: `Split [${items.slice(lo, hi).join(',')}] at the middle` })
    sort(lo, mid)
    sort(mid, hi)
    merge(lo, mid, hi)
  }

  sort(0, items.length)
  frames.push({ array: snap(items), compare: null, swap: null, merge: null, sorted: Array.from({ length: items.length }, (_, k) => k), note: 'Done — fully sorted' })
  return frames
}

// A clean in-place Lomuto-style partition, used only to drive the bar-chart
// visualization (positions stay stable so bars swap rather than reshuffle).
// The CodeSnippetSlide right next to this diagram teaches the lesson's real
// list-comprehension implementation faithfully — this is the same divide
// and conquer idea, shown the way a bar-chart visualizer conventionally does.
export function quicksortFrames(input) {
  const items = input.slice()
  const n = items.length
  const settled = new Set()
  const frames = [{ array: snap(items), compare: null, pivot: null, sorted: [], note: `Starting array: [${items.join(', ')}]` }]

  function partition(lo, hi) {
    const pivotVal = items[hi]
    frames.push({ array: snap(items), compare: null, pivot: hi, sorted: [...settled], note: `Pick pivot ${pivotVal} (last element of this range)` })
    let i = lo
    for (let j = lo; j < hi; j++) {
      frames.push({ array: snap(items), compare: [j, hi], pivot: hi, sorted: [...settled], note: `Compare ${items[j]} with pivot ${pivotVal}` })
      if (items[j] < pivotVal) {
        if (i !== j) {
          [items[i], items[j]] = [items[j], items[i]]
          frames.push({ array: snap(items), compare: null, swap: [i, j], pivot: hi, sorted: [...settled], note: `${items[i]} < pivot — move it left of the pivot` })
        }
        i += 1
      }
    }
    ;[items[i], items[hi]] = [items[hi], items[i]]
    frames.push({ array: snap(items), compare: null, swap: [i, hi], pivot: i, sorted: [...settled], note: `Pivot ${pivotVal} settles at index ${i}` })
    settled.add(i)
    return i
  }

  function qs(lo, hi) {
    if (lo >= hi) { if (lo === hi) settled.add(lo); return }
    const p = partition(lo, hi)
    qs(lo, p - 1)
    qs(p + 1, hi)
  }

  qs(0, n - 1)
  frames.push({ array: snap(items), compare: null, pivot: null, sorted: Array.from({ length: n }, (_, k) => k), note: 'Done — fully sorted' })
  return frames
}
