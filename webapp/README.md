# PyTech Hub — Web Demo

A real, in-browser TypeScript port of this course's dynamic array
(`data-structures-mastery/03_dynamic_array/c/dynamic_array.c`): capacity
starts at 0, and every push that finds `length === capacity` triggers a
reallocation — a new backing block exactly twice the size, with every
existing element copied into it before the old block is discarded. That's
the same doubling policy, and the same amortized-O(1) push, as the C
source.

Memory addresses for each element are simulated per Module 01's "memory &
addresses" framing (`base + index * 4 bytes`, matching a contiguous C
`int[]`), so a reallocation is visibly a jump to a new block rather than
the same slots relabeled in place.

See `src/lib/dynamicArray.ts` for the ported algorithm, documented against
the exact C functions it mirrors.

**Note:** this is a separate, additional demo. The existing
`codeden-slides-react/` app in this repo is untouched.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploy

This is a static Vite build — deploy `dist/` to any static host.

**Vercel / Netlify / Cloudflare Pages:**

- Root directory: `webapp`
- Build command: `npm run build`
- Output directory: `dist`
