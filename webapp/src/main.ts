import './style.css';
import { DynamicArray, type PushResult, type Slot } from './lib/dynamicArray';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="wrap">
    <div class="topbar">
      <div class="brand">PyTech<span class="dot">·</span>Hub</div>
      <div class="topnav">
        <a href="https://github.com/Robert-Doe/pytech-hub" target="_blank" rel="noopener">GitHub</a>
        <a href="https://robertdoe.com">&larr; robertdoe.com</a>
      </div>
    </div>

    <div class="hero">
      <h1>Data Structures <span class="accent">Visualizer</span></h1>
      <p>
        A real port of the dynamic array taught in Modules 01&ndash;03: click
        Push and watch length vs. capacity, each element's simulated memory
        address, and the actual doubling-reallocation algorithm fire live,
        copying every existing element into a new backing block the moment
        the array fills up.
      </p>
    </div>

    <div class="demo">
      <div class="card array-card">
        <h2>Dynamic Array</h2>
        <p class="subtitle">Capacity starts at 0. Every push that finds <code>length === capacity</code> triggers a reallocation: a new block twice the size, every existing element copied across.</p>

        <div class="actions">
          <button class="primary" id="push-btn">Push</button>
          <button class="secondary" id="push10-btn">Push &times;10</button>
          <button class="secondary" id="reset-btn">Reset</button>
        </div>

        <div class="stat-row">
          <div class="stat"><span class="value" id="stat-length">0</span><span class="label">Length</span></div>
          <div class="stat"><span class="value" id="stat-capacity">0</span><span class="label">Capacity</span></div>
          <div class="stat"><span class="value" id="stat-copies">0</span><span class="label">Element copies</span></div>
          <div class="stat"><span class="value" id="stat-reallocs">0</span><span class="label">Reallocations so far</span></div>
        </div>

        <div id="realloc-banner-slot"></div>
        <div id="old-block-slot"></div>

        <div class="block-label" id="current-block-label">Backing array (not yet allocated)</div>
        <div class="array-grid" id="array-grid"></div>

        <p class="note">
          Addresses are simulated (base + index &times; 4 bytes, per Module 01's
          "memory & addresses" framing for a contiguous <code>int[]</code>) so a
          reallocation is visibly a jump to a brand-new block, not the same
          slots relabeled in place.
        </p>
      </div>
    </div>

    <footer>
      <span>PyTech Hub — course-companion demo</span>
      <span>Dynamic array growth, ported faithfully from the C source</span>
    </footer>
  </div>
`;

const pushBtn = document.querySelector<HTMLButtonElement>('#push-btn')!;
const push10Btn = document.querySelector<HTMLButtonElement>('#push10-btn')!;
const resetBtn = document.querySelector<HTMLButtonElement>('#reset-btn')!;
const statLength = document.querySelector<HTMLSpanElement>('#stat-length')!;
const statCapacity = document.querySelector<HTMLSpanElement>('#stat-capacity')!;
const statCopies = document.querySelector<HTMLSpanElement>('#stat-copies')!;
const statReallocs = document.querySelector<HTMLSpanElement>('#stat-reallocs')!;
const reallocBannerSlot = document.querySelector<HTMLDivElement>('#realloc-banner-slot')!;
const oldBlockSlot = document.querySelector<HTMLDivElement>('#old-block-slot')!;
const currentBlockLabel = document.querySelector<HTMLDivElement>('#current-block-label')!;
const arrayGrid = document.querySelector<HTMLDivElement>('#array-grid')!;

const arr = new DynamicArray();
let nextValue = 1;
let bannerTimeout: number | undefined;
let oldBlockTimeout: number | undefined;

function renderSlot(slot: Slot, extraClass = ''): string {
  return `<div class="slot ${extraClass}"><span class="val">${slot.value}</span><span class="addr">${slot.address}</span></div>`;
}

function renderEmptySlot(): string {
  return `<div class="slot empty"><span class="val">&mdash;</span><span class="addr">unused</span></div>`;
}

function render(result: PushResult | null): void {
  const length = result ? result.length : arr.length;
  const capacity = result ? result.capacity : arr.capacity;
  const totalElementCopies = result ? result.totalElementCopies : arr.totalElementCopies;
  const reallocations = result ? result.reallocations : arr.reallocations;

  statLength.textContent = String(length);
  statCapacity.textContent = String(capacity);
  statCopies.textContent = String(totalElementCopies);
  statReallocs.textContent = String(reallocations);

  if (capacity === 0) {
    currentBlockLabel.textContent = 'Backing array (not yet allocated)';
    arrayGrid.innerHTML = '';
    return;
  }

  currentBlockLabel.textContent = `Backing array — capacity ${capacity} (${length} in use)`;

  if (result) {
    const slotsHtml = result.slots
      .map((s, i) => renderSlot(s, i === result.length - 1 ? 'just-added' : result.reallocated ? 'copied' : ''))
      .join('');
    const emptyHtml = Array.from({ length: capacity - length }, () => renderEmptySlot()).join('');
    arrayGrid.innerHTML = slotsHtml + emptyHtml;
  } else {
    arrayGrid.innerHTML = '';
  }
}

function showReallocationEvent(result: PushResult): void {
  if (!result.reallocated || !result.before || result.oldCapacity === undefined) return;

  window.clearTimeout(bannerTimeout);
  window.clearTimeout(oldBlockTimeout);

  reallocBannerSlot.innerHTML = `
    <div class="realloc-banner">
      REALLOCATION: capacity ${result.oldCapacity} &rarr; ${result.newCapacity} &mdash;
      copied ${result.before.length} element${result.before.length === 1 ? '' : 's'} into a new block
      (reallocation #${result.reallocations})
    </div>
  `;

  const oldSlotsHtml = result.before.map((s) => renderSlot(s, 'freed')).join('');
  oldBlockSlot.innerHTML = `
    <div class="old-block-wrap">
      <div class="block-label">Old block (capacity ${result.oldCapacity}) — freed after copy</div>
      <div class="array-grid">${oldSlotsHtml}</div>
      <div class="arrow-down">&darr; every element copied into the new, larger block below &darr;</div>
    </div>
  `;

  bannerTimeout = window.setTimeout(() => {
    reallocBannerSlot.innerHTML = '';
  }, 3200);
  oldBlockTimeout = window.setTimeout(() => {
    oldBlockSlot.innerHTML = '';
  }, 3200);
}

function doPush(): void {
  const result = arr.push(nextValue++);
  render(result);
  showReallocationEvent(result);
}

pushBtn.addEventListener('click', doPush);
push10Btn.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) doPush();
});
resetBtn.addEventListener('click', () => {
  arr.reset();
  nextValue = 1;
  window.clearTimeout(bannerTimeout);
  window.clearTimeout(oldBlockTimeout);
  reallocBannerSlot.innerHTML = '';
  oldBlockSlot.innerHTML = '';
  render(null);
});

render(null);
