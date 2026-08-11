# CodeDen Slide Composer

A React + Vite app for composing and presenting CodeDen-branded course slides.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 — you'll see the Deck Composer, defaulted to
**`src/decks/lesson43Deck.jsx`**: a 114-slide, fully-scripted deck for
*Lesson 43 — Graphs & Sorting*, built from the lesson notebook + the PyTech
Hub Instructor Manual's session structure (Introduction → Objectives →
Subtopic syntax/illustration/explanation → Working Example, repeated per
concept → Tutor Demonstration Challenges → Summary → Mini Project →
Appendix), with Head First–style analogies, real algorithm-driven diagrams,
and instructor-only pacing notes layered throughout.

### Manual, step-by-step reveal (default — nothing auto-plays)
Every animated element on every slide — bullets, code lines, table rows,
diagram highlights — is revealed one at a time with **Ctrl+→ / Ctrl+←**,
never automatically. Plain **→ / ←** still move between slides (landing on
a fresh, unrevealed slide each time). Press **A** to reveal the rest of the
current slide instantly. Flip **⏸ Auto-play: Off** in the nav bar if you
ever want the old "plays on its own" behaviour back — it's off by default
and remembered per-browser.

### Real diagrams, not hand-drawn animations
- **`GraphDiagramSlide`** — a little road-map graph; BFS/DFS visit order and
  the queue/stack readout are computed for real by
  `src/decks/graphTraceHelpers.js`, never hand-faked.
- **`SortingBarsSlide`** — a bar chart driven by actually running
  bubble/insertion/merge/quicksort via `src/decks/sortFrameHelpers.js`, one
  comparison/swap/merge per step.
- **`InstructorNotesSlide`** — a visually distinct "backstage" slide (pacing,
  the deliberate-bug technique, what *not* to solve for a student) pulled
  from the Instructor Manual — skip it when presenting to students.

### Export the whole deck as a PDF
Click **⬇ Export PDF** (composer header or presenter nav bar). It bakes
*every* slide × every manual reveal step into full-bleed, control-free pages
(reusing the exact same DOM/CSS the live deck renders with — no
screenshot/rasterization library) and opens the browser's print dialog;
choose **Save as PDF**. Nothing from the composer or presenter UI ever
reaches the printed pages.

## How to use

### 1. Compose a deck
- Browse the slide library on the left (filter by group or search by name)
- Click a slide to add it to your deck (right panel)
- Hover over the mini-preview and click 👁 to see it full size before adding
- Drag/reorder with ↑↓ buttons in the deck panel

### 2. Present
- Click **▶ Present Deck** (or press Enter) — the deck opens fullscreen
- **→ / ← / Space** = next/prev slide · **Ctrl+→ / Ctrl+←** = reveal step
  forward/back · **A** = reveal all · **F** = fullscreen · **ESC** = exit
- Nothing animates until you step it forward — see "Manual, step-by-step
  reveal" above

### 3. Customise a slide
Open `src/components/slides/` — each file has named exports with clearly commented props:

```jsx
import { TitleSlide } from './components/slides'

// All props have defaults — override only what you need:
<TitleSlide
  module="Module 03"
  title="Operators & Comparisons"
  subtitle="Intro to Python — with Robert Doe"
/>
```

### 4. Build a deck in code
Edit `src/decks/exampleCourse.jsx`:

```jsx
import React from 'react'
import { ALL_SLIDES, TitleSlide } from '../components/slides'

const pick = (id) => ALL_SLIDES.find(s => s.id === id)

export const myDeck = [
  // Pick from library
  pick('course-trailer'),
  pick('learning-objectives'),

  // Or create a custom variant inline
  { id:'my-title', name:'Custom Title', group:'Intro',
    element: <TitleSlide module="Module 02" title="Variables" subtitle="CodeDen · Robert Doe" /> },

  pick('code-snippet'),
  pick('quick-check'),
  pick('thank-you'),
].filter(Boolean)
```

Then in `src/App.jsx`, import and set it as the default deck:
```jsx
import { myDeck } from './decks/exampleCourse.jsx'
// ...
const [deck, setDeck] = useState(myDeck)
```

## Slide groups

| Group | Slides |
|---|---|
| Intro | Title, Author Intro, Author Card, Course Trailer |
| Course Overview | What You'll Learn, Who Is For, Learning Path, Time Commit, Skill Meter, What You'll Build, Module Table, Testimonials |
| Navigation | Section Divider, Chapter Opener/End, Agenda, Checkpoint, Story So Far |
| Content | Big Quote, Two Column, Definition, Image Full-Bleed/Right/Left, Book Feature |
| Teaching | Bullet Points, Steps Timeline, Comparison Table, Do vs Don't, Code Snippet, Terminal Output, Syntax Anatomy, Flowchart |
| Learning | Learning Objectives, Key Takeaways, Cheat Sheet, Vocabulary, Concept Map, Common Mistakes, Real World Use, Spaced Review |
| Interactive | Quick Check, True/False, Answer Reveal, Fill Blank, Speed Round, Poll, Pause & Think, Daily Challenge |
| Practice | Exercise, Homework, Code Along, Challenge Tiers, Lab Time, Debug Hunt |
| Gamification | XP Level Up, Badge Earned, Skill Map, Streak, Quest Briefing, Progress Dashboard, Leaderboard |
| Closing | Resources, Encouragement, Community, Certificate, Next Course, Feedback Ask, Thank You |
| Diagrams | Graph Diagram (road-map BFS/DFS trace), Sorting Bars (real algorithm frames) |
| Instructor | Instructor Notes (backstage pacing/technique card) |

## Assets
Put your own images in `public/assets/`:
- `logo-lockup.png` — light version (for dark slides)
- `logo-lockup-dark.png` — dark version (for light slides)
- `people/robertdoe.png`, `people/erica.jpg`, etc.
- `imagery/hero-developer.jpg`, `imagery/book-programming-for-shy-people.png`

## Tokens
All design tokens are in `src/theme.js` — edit colours, fonts, radii there and all slides update.

## Project source
GitHub: https://github.com/Robert-Doe/codeden
