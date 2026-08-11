import React from 'react'
import { t } from '../theme.js'
import { codeLines } from './lessonCodeHelpers.js'
import { bfsTrace, dfsTrace, bfsDistanceTrace } from './graphTraceHelpers.js'
import { bubbleSortFrames, insertionSortFrames, mergeSortFrames, quicksortFrames } from './sortFrameHelpers.js'
import {
  TitleSlide,
  ConceptMapSlide, LearningObjectivesSlide, KeyTakewaysSlide, CheatSheetSlide, VocabularySlide, CommonMistakesSlide, SpacedReviewSlide,
  SectionDividerSlide, AgendaSlide, CheckpointSlide,
  BigQuoteSlide, TwoColumnTextSlide, DefinitionSlide,
  BulletPointsSlide, StepsTimelineSlide, ComparisonTableSlide, DoVsDontSlide, CodeSnippetSlide, TerminalOutputSlide, SyntaxAnatomySlide, FlowchartSlide,
  QuickCheckSlide, TrueOrFalseSlide, AnswerRevealSlide, PauseThinkSlide, SpeedRoundSlide,
  ExerciseSlide, CodeAlongSlide, LabTimeSlide, DebugHuntSlide,
  QuestBriefingSlide,
  RealWorldUseSlide,
  EncouragementSlide, ResourcesSlide, ThankYouSlide,
  GraphDiagramSlide, SortingBarsSlide,
  InstructorNotesSlide,
} from '../components/slides/index.js'

// The lesson's running road-network example — reused across the BFS/DFS
// subtopics, both Working Examples, and the Mini Project preview so
// students see ONE map grow more familiar rather than a new graph every
// time. Matches the notebook's own "Town A, Town B…" naming.
const ROAD_TOWNS = [
  { id: 'A', label: 'Town A', x: 410, y: 100 },
  { id: 'B', label: 'Town B', x: 1230, y: 100 },
  { id: 'C', label: 'Town C', x: 410, y: 320 },
  { id: 'D', label: 'Town D', x: 1230, y: 320 },
  { id: 'E', label: 'Town E', x: 410, y: 540 },
  { id: 'F', label: 'Town F', x: 1230, y: 540 },
]
const ROAD_EDGES = [
  { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
  { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
]
const ROAD_ADJACENCY = { A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'D', 'E'], D: ['B', 'C', 'F'], E: ['C', 'F'], F: ['D', 'E'] }

// The Challenge 1 illustration graph — the notebook's own 4-cycle example
// (A-B, B-C, C-D, A-D).
const CHALLENGE_NODES = [
  { id: 'A', label: 'A', x: 300, y: 320 },
  { id: 'B', label: 'B', x: 820, y: 120 },
  { id: 'C', label: 'C', x: 1340, y: 320 },
  { id: 'D', label: 'D', x: 820, y: 520 },
]
const CHALLENGE_EDGES = [ { from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' } ]
const CHALLENGE_ADJACENCY = { A: ['B', 'D'], B: ['A', 'C'], C: ['B', 'D'], D: ['A', 'C'] }

// The lesson's running sorting example — the SAME five numbers watched
// through all four algorithms, so students compare methods on one problem
// rather than four different ones ("the same task, four different ways").
const SORT_DEMO = [8, 3, 6, 1, 5]

// Local slide-registry helper — same shape as ALL_SLIDES entries ({id,name,group,element})
// so this code-authored deck drops straight into the Composer / SlideShow / storage.js pipeline.
function S(id, name, group, Component, props = {}) {
  return { id, name, group, element: React.createElement(Component, props) }
}

export const lesson43Slides = [

  // ══════════════════════════════════════════════════════════════════
  // OPENING — bridge from what students already know (PyTech Hub manual:
  // "bridge from the previous lesson by name" + Pluralsight-style module roadmap)
  // ══════════════════════════════════════════════════════════════════

  S('l43-title', 'Title', 'Opening', TitleSlide, {
    module: 'DSA Part 3 · Lesson 43',
    title: 'Graphs & Sorting',
    subtitle: 'Your DSA Toolkit, continued — PyTech Hub',
    bg: t.ink,
  }),

  S('l43-bridge', 'Bridge from Lessons 41–42', 'Opening', ConceptMapSlide, {
    title: "You've already built four structures",
    nodes: [
      { label: 'LinkedList', sub: 'Lesson 41', active: false },
      { label: 'Stack / Queue', sub: 'Lesson 41', active: false },
      { label: 'BST', sub: 'Lesson 42', active: false },
      { label: 'HashMap', sub: 'Lesson 42', active: false },
      { label: 'Graph', sub: '← today', active: true },
    ],
    note: 'Today you add the most general structure of all — and use it to finally build the sorts behind sorted().',
  }),

  S('l43-objectives', 'Learning Objectives', 'Opening', LearningObjectivesSlide, {
    eyebrow: 'By the end of this lesson',
    title: 'You will be able to…',
    objectives: [
      { num: '01', verb: 'Represent', rest: 'a graph using an adjacency list in Python' },
      { num: '02', verb: 'Explain', rest: 'the trade-off between an adjacency list and an adjacency matrix' },
      { num: '03', verb: 'Implement', rest: 'Breadth-First Search (BFS) using a queue' },
      { num: '04', verb: 'Implement', rest: 'Depth-First Search (DFS) using recursion and an explicit stack' },
      { num: '05', verb: 'Implement', rest: 'bubble sort, insertion sort, merge sort, and quicksort from scratch' },
      { num: '06', verb: 'State', rest: 'the Big-O time and space complexity of every structure and sort from DSA Parts 1–3' },
      { num: '07', verb: 'Explain', rest: 'in one sentence, what Timsort is and why sorted() uses it' },
    ],
    note: "Notice the verbs: represent, explain, implement, state. 'Understand' never shows up — it can't be checked.",
  }),

  S('l43-agenda', 'Agenda', 'Opening', AgendaSlide, {
    title: 'Two topics, one lesson',
    module: 'Lesson 43',
    lessons: [
      { num: 'Part A', title: 'Graphs — adjacency lists, BFS, DFS' },
      { num: 'Part B', title: 'Sorting — bubble, insertion, merge, quicksort' },
      { num: 'Part C', title: 'The master Big-O comparison table' },
      { num: 'Part D', title: 'Tutor Demonstration Challenges (30 min, together)' },
    ],
  }),

  S('l43-instructor-pacing', 'Instructor: pacing this lesson', 'Opening', InstructorNotesSlide, {
    title: 'This lesson has two headings under one session',
    timing: '60 min subtopics · 30 min Tutor Demos',
    points: [
      { label: 'Two topics, one open', text: 'Graphs then Sorting share this session. Treat "Sorting" as a fresh, small Introduction in miniature when you reach it — but do not open the session itself twice.' },
      { label: 'Budget the hour', text: 'Roughly six Working Examples across 60 minutes, ~10 min average pace end-to-end. Decide now where you expect to spend more (BFS/DFS, quicksort) or less (bubble/insertion) — do not discover the imbalance live.' },
      { label: 'Protect the last 30', text: 'If the first hour overruns, tighten remaining Working Examples rather than rushing or cutting the two Tutor Demonstration Challenges.' },
      { label: 'No Case Study here', text: 'This is a Modelling lesson — introduce, demonstrate, build through Working Examples. There is no flawed-code-to-fix opening.' },
    ],
  }),

  // ══════════════════════════════════════════════════════════════════
  // PART A — GRAPHS
  // ══════════════════════════════════════════════════════════════════

  S('l43-g-divider', 'Section: Graphs', 'Graphs · Intro', SectionDividerSlide, {
    moduleNum: 'Part A',
    title: 'Graphs: Mapping Connections',
    meta: 'The most general structure in your toolkit',
    bg: t.accent,
  }),

  S('l43-g-def', 'Definition: Graph', 'Graphs · Intro', DefinitionSlide, {
    word: 'Graph',
    phonetic: '/graf/ · noun · data structure',
    definition: 'A set of nodes (vertices) connected by edges — with no restriction on how many neighbours a node has, or in what order they connect.',
  }),

  S('l43-g-realworld', 'Graphs are everywhere', 'Graphs · Intro', RealWorldUseSlide, {
    title: 'You already think in graphs — you just never named it',
    examples: [
      { icon: '👥', title: 'A social network', code: 'vertices = people, edges = friendships' },
      { icon: '🗺️', title: 'A road map / GPS app', code: 'vertices = towns, edges = roads' },
      { icon: '📦', title: 'A software dependency tree', code: 'vertices = packages, edges = "requires"' },
    ],
    note: 'Social networks, road maps, dependency trees, and web links are all graphs.',
  }),

  S('l43-g-fits', 'Where Graph fits', 'Graphs · Intro', ComparisonTableSlide, {
    title: 'Where Graph fits among your toolkit',
    headers: ['Structure (so far)', 'Shape', 'Typical use'],
    rows: [
      ['LinkedList', 'linear chain', 'ordered sequence, cheap insert/delete'],
      ['Stack / Queue', 'linear, restricted access', 'LIFO / FIFO processing'],
      ['BST', 'hierarchical, ordered', 'fast ordered search'],
      ['HashMap', 'key → bucket', 'O(1) average lookup'],
      ['Graph', 'arbitrary connections', 'networks, routes, dependencies'],
    ],
  }),

  S('l43-g-vocab', 'Vocabulary: Graphs', 'Graphs · Intro', VocabularySlide, {
    title: 'Words you now own',
    words: [
      { word: 'vertex', def: 'a single node in the graph' },
      { word: 'edge', def: 'a connection between two vertices' },
      { word: 'adjacency list', def: 'dict: vertex → its neighbours' },
      { word: 'directed', def: 'edges point one way, like a one-way street' },
      { word: 'undirected', def: 'edges go both ways, like a friendship' },
      { word: 'sparse graph', def: 'few edges relative to vertices' },
    ],
  }),

  S('l43-g-quote', 'Big Quote: graphs', 'Graphs · Intro', BigQuoteSlide, {
    quote: 'A tree is just a graph that never lets you form a circle.',
    attribution: '— worth sitting with for a second',
    bg: t.navy,
  }),

  S('l43-g-tree-vs-graph', 'Trees are a special kind of Graph', 'Graphs · Intro', ConceptMapSlide, {
    title: 'You already met a graph — Lesson 42 just didn’t call it one',
    nodes: [
      { label: 'Graph', sub: 'any connections, even cycles', active: false },
      { label: 'Tree', sub: 'no cycles, one root', active: false },
      { label: 'BST', sub: '← Lesson 42', active: true },
    ],
    note: 'A BST is a tree, and a tree is a graph with one extra rule: no cycles, and exactly one path between any two nodes. Today’s Graph drops that rule entirely.',
  }),

  // — Subtopic: Adjacency List —
  S('l43-adj-intro', 'Adjacency List, in one sentence', 'Graphs · Adjacency List', BulletPointsSlide, {
    title: 'Adjacency list, in one sentence',
    module: 'Subtopic 1',
    bullets: [
      "A dict maps each vertex to the list of vertices it connects to",
      "Values can be a list — or a set, if duplicate edges should be rejected",
      "Same HashMap concept from Lesson 42 — just applied to relationships, not records",
    ],
  }),

  S('l43-adj-syntax-1', 'Syntax: the Graph constructor', 'Graphs · Adjacency List', CodeSnippetSlide, {
    title: 'Syntax — step 1: the constructor',
    code: codeLines([
      'class Graph:',
      '    def __init__(self, directed: bool = False):',
      '        self._adjacency: dict[str, list[str]] = {}',
      '        self._directed = directed',
    ]),
    note: 'Every graph starts empty — no vertices, no edges — and remembers whether it is directed.',
  }),

  S('l43-adj-syntax-2', 'Syntax: add_vertex()', 'Graphs · Adjacency List', CodeSnippetSlide, {
    title: 'Syntax — step 2: add_vertex()',
    code: codeLines([
      'def add_vertex(self, vertex: str) -> None:',
      '    self._adjacency.setdefault(vertex, [])',
    ]),
    note: '.setdefault() only inserts if the key is missing — calling it twice on "A" is completely harmless.',
  }),

  S('l43-adj-syntax-3', 'Syntax: add_edge()', 'Graphs · Adjacency List', CodeSnippetSlide, {
    title: 'Syntax — step 3: add_edge()',
    code: codeLines([
      'def add_edge(self, source: str, destination: str) -> None:',
      '    self.add_vertex(source)',
      '    self.add_vertex(destination)',
      '    self._adjacency[source].append(destination)',
      '    if not self._directed:',
      '        self._adjacency[destination].append(source)',
    ]),
    note: 'Undirected by default — the connection is recorded in both directions, like a friendship.',
  }),

  S('l43-adj-illustration', 'Illustration: build a tiny graph', 'Graphs · Adjacency List', TerminalOutputSlide, {
    title: 'Try it: build a tiny graph',
    lines: [
      '>>> g = Graph()',
      '>>> g.add_edge("A", "B")',
      '>>> g.add_edge("A", "C")',
      '>>> g.add_edge("B", "D")',
      '>>> print(g._adjacency)',
      "{'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A'], 'D': ['B']}",
    ],
  }),

  S('l43-adj-pause', 'Pause & Think: directed edges', 'Graphs · Adjacency List', PauseThinkSlide, {
    question: 'If Town A connects to Town B, does Town B automatically connect back to Town A?',
    note: 'Depends on one word: undirected. Think of a two-way street vs. a one-way street.',
  }),

  S('l43-adj-check', 'Quick Check: adjacency list container', 'Graphs · Adjacency List', QuickCheckSlide, {
    eyebrow: 'Quick check',
    question: 'Which Python container is the natural fit for an adjacency list?',
    options: [
      'A single flat list of every vertex',
      'A dict of vertex → list of neighbours',
      'A tuple containing only edges',
      'A nested for-loop with no storage',
    ],
  }),

  S('l43-adj-answer', 'Answer: adjacency list container', 'Graphs · Adjacency List', AnswerRevealSlide, {
    correct: true,
    answer: 'A dict of vertex → list of neighbours',
    explanation: 'Exactly the "HashMap" idea from Lesson 42 — a key you already know how to use, applied to a new problem.',
  }),

  // — Subtopic: BFS —
  S('l43-bfs-def', 'Definition: BFS', 'Graphs · BFS', DefinitionSlide, {
    word: 'Breadth-First Search',
    phonetic: '"BFS" · graph traversal',
    definition: 'Explores a graph level by level — visiting every neighbour of the start before moving further out. "Closest first," exactly what a Queue (FIFO) is built for.',
  }),

  S('l43-bfs-syntax-1', 'Syntax: BFS setup', 'Graphs · BFS', CodeSnippetSlide, {
    title: 'Syntax — BFS, part 1: the setup',
    code: codeLines([
      'from collections import deque',
      '',
      'def bfs(self, start: str) -> list[str]:',
      '    visited = {start}',
      '    order = []',
      '    queue = deque([start])',
    ]),
    note: '"visited" stops us looping forever on a cycle; the queue is our "closest first" waiting line.',
  }),

  S('l43-bfs-syntax-2', 'Syntax: BFS main loop', 'Graphs · BFS', CodeSnippetSlide, {
    title: 'Syntax — BFS, part 2: the main loop',
    code: codeLines([
      '    while queue:',
      '        vertex = queue.popleft()',
      '        order.append(vertex)',
      '        for neighbour in self._adjacency[vertex]:',
      '            if neighbour not in visited:',
      '                visited.add(neighbour)',
      '                queue.append(neighbour)',
      '    return order',
    ]),
    note: 'popleft() is O(1) on a deque — that’s why we reach for it instead of a plain list.',
  }),

  S('l43-bfs-anatomy', 'Anatomy: seeding the queue', 'Graphs · BFS', SyntaxAnatomySlide, {
    title: 'Anatomy of one line: queue = deque([start])',
    parts: [
      { text: 'queue', color: '#a9a3ff', label: 'our FIFO line ↓', above: true },
      { text: '=', color: '#e8e4d8', label: '↑ stores it', above: false },
      { text: 'deque(', color: '#a9a3ff', label: 'a fast, two-ended queue ↓', above: true },
      { text: '[start]', color: '#e8c26a', label: '↑ seed it with the starting town', above: false },
      { text: ')', color: '#e8e4d8', label: '↑ closes it', above: false },
    ],
  }),

  S('l43-bfs-flow', 'How BFS decides', 'Graphs · BFS', FlowchartSlide, {
    title: 'Every neighbour, one decision',
    condition: 'neighbour in visited?',
    yesBranch: 'Skip it — already on the list',
    noBranch: 'Mark visited, enqueue it',
  }),

  S('l43-bfs-illustration', 'Illustration: BFS run', 'Graphs · BFS', TerminalOutputSlide, {
    title: 'What BFS actually prints',
    lines: ['>>> g.bfs("A")', "['A', 'B', 'C', 'D']"],
  }),

  S('l43-bfs-why', 'Explanation: why queue + visited', 'Graphs · BFS', TwoColumnTextSlide, {
    title: 'Why these two pieces matter',
    left: {
      heading: 'Why a queue?',
      color: t.accent,
      text: 'FIFO means the first town enqueued is the first one explored — exactly "closest first." Every vertex is enqueued once, so BFS runs in O(V + E).',
    },
    right: {
      heading: 'Why track visited?',
      color: t.navy,
      text: 'Without it, a cycle (A → B → A) would send BFS looping forever, revisiting the same two towns endlessly.',
    },
  }),

  S('l43-bfs-diagram', 'Diagram: BFS across the road network', 'Graphs · BFS', GraphDiagramSlide, {
    title: 'Watch BFS explore the road network, one town at a time',
    nodes: ROAD_TOWNS,
    edges: ROAD_EDGES,
    frames: bfsTrace(ROAD_ADJACENCY, 'A'),
    structureLabel: 'Queue',
  }),

  S('l43-instructor-csv', 'Instructor: the messy CSV row', 'Graphs · Working Example 1', InstructorNotesSlide, {
    title: 'Working Example 1 has a built-in deliberate-bug opportunity',
    timing: '~10 min',
    points: [
      { label: 'The setup', text: 'Data/road_network.csv has a few rows missing from/to on purpose (Lesson 17\'s "real-world data" habit). Consider building add_edge() first WITHOUT the blank-row guard, let it crash, then add the guard together.' },
      { label: 'Announce it', text: 'If you plant this, say so plainly: "I\'ve left something out on purpose — we\'ll fix it together in a second."' },
      { label: 'Watch for', text: 'Students forgetting BOTH add_vertex() calls inside add_edge() — a common shortcut that silently breaks isolated vertices with no edges yet.' },
    ],
  }),

  // — Working Example 1 —
  S('l43-we1-exercise', 'Working Example 1', 'Graphs · Working Example 1', ExerciseSlide, {
    eyebrow: 'Working Example 1',
    title: 'Build add_vertex, add_edge, and bfs — then read real data',
    steps: [
      'Read Data/road_network.csv (columns from,to) with csv.reader',
      "Skip any row missing from or to — don't let it crash add_edge()",
      'Build the graph, then print the BFS order starting from "Town A"',
    ],
    hint: 'Hint: check both fields exist and are non-blank before calling add_edge() — a bad row should just continue to the next one.',
  }),

  S('l43-we1-codealong', 'Code Along: build the Graph class', 'Graphs · Working Example 1', CodeAlongSlide, {
    badge: 'CODE ALONG',
    instruction: 'Open your editor and build the Graph class with me',
    tasks: [
      'Add add_vertex, add_edge, bfs to a new Graph class',
      'Load edges from Data/road_network.csv',
      'Skip unusable rows without crashing',
      'Print the BFS order from "Town A"',
    ],
    warning: 'Typing it yourself is the lesson. Watching is not.',
  }),

  S('l43-we1-output', 'Working Example 1: sample output', 'Graphs · Working Example 1', TerminalOutputSlide, {
    title: 'Sample output',
    lines: [
      'Edges loaded from Data/road_network.csv: N edges across M towns (K rows skipped as unusable)',
      '',
      'BFS from Town A:',
      "['Town A', 'Town B', ...]",
    ],
  }),

  // — Subtopic: DFS —
  S('l43-dfs-def', 'Definition: DFS', 'Graphs · DFS', DefinitionSlide, {
    word: 'Depth-First Search',
    phonetic: '"DFS" · graph traversal',
    definition: 'Explores as far as possible along one branch before backtracking — the opposite instinct to BFS.',
  }),

  S('l43-dfs-two-ways', 'Two ways to write DFS', 'Graphs · DFS', TwoColumnTextSlide, {
    title: 'Two ways to write the same idea',
    left: {
      heading: 'Recursive DFS',
      color: t.accent,
      text: "Let Python's own call stack (Part I, Day 10) do the backtracking for you — the cleanest version to read.",
    },
    right: {
      heading: 'Iterative DFS',
      color: t.navy,
      text: 'Use an explicit Stack (Lesson 41) instead — "go deep, then come back" is exactly LIFO behaviour.',
    },
  }),

  S('l43-dfs-syntax-rec', 'Syntax: dfs_recursive()', 'Graphs · DFS', CodeSnippetSlide, {
    title: 'Syntax — dfs_recursive()',
    code: codeLines([
      'def dfs_recursive(self, start, visited=None):',
      '    if visited is None:',
      '        visited = set()',
      '    visited.add(start)',
      '    order = [start]',
      '    for neighbour in self._adjacency[start]:',
      '        if neighbour not in visited:',
      '            order.extend(self.dfs_recursive(neighbour, visited))',
      '    return order',
    ]),
    note: 'Base case: no unvisited neighbours left. Recursive case: descend into the next unvisited one.',
  }),

  S('l43-dfs-syntax-iter', 'Syntax: dfs_iterative()', 'Graphs · DFS', CodeSnippetSlide, {
    title: 'Syntax — dfs_iterative()',
    code: codeLines([
      'def dfs_iterative(self, start):',
      '    visited = set()',
      '    order = []',
      '    stack = [start]',
      '    while stack:',
      '        vertex = stack.pop()',
      '        if vertex not in visited:',
      '            visited.add(vertex)',
      '            order.append(vertex)',
      '            stack.extend(reversed(self._adjacency[vertex]))',
      '    return order',
    ]),
    note: 'A plain Python list works as a stack here — .append()/.pop() from Part II, Day 2.',
  }),

  S('l43-dfs-vs-bfs', 'BFS vs DFS, side by side', 'Graphs · DFS', ComparisonTableSlide, {
    title: 'BFS vs DFS, side by side',
    headers: ['', 'BFS', 'DFS'],
    rows: [
      ['Uses', 'Queue (deque)', 'Stack (recursion or list)'],
      ['Order', 'Closest first', 'Deepest first'],
      ['Big-O', 'O(V + E)', 'O(V + E)'],
    ],
  }),

  S('l43-dfs-illustration', 'Illustration: DFS run', 'Graphs · DFS', TerminalOutputSlide, {
    title: 'What both DFS versions print',
    lines: [
      '>>> g.dfs_recursive("A")',
      "['A', 'B', 'D', 'C']",
      '>>> g.dfs_iterative("A")',
      "['A', 'B', 'D', 'C']",
    ],
  }),

  S('l43-dfs-truefalse', 'True or False: DFS speed', 'Graphs · DFS', TrueOrFalseSlide, {
    statement: '"DFS always runs faster than BFS because it goes deeper first."',
    note: 'Reveal the answer on the next slide — let them commit first.',
  }),

  S('l43-dfs-truefalse-answer', 'Answer: DFS speed', 'Graphs · DFS', AnswerRevealSlide, {
    correct: false,
    answer: 'False!',
    explanation: 'Both BFS and DFS run in "O(V + E)" — the difference between them is order, never cost.',
  }),

  S('l43-dfs-diagram', 'Diagram: DFS across the road network', 'Graphs · DFS', GraphDiagramSlide, {
    title: 'Now watch DFS explore the SAME map — deeper, not wider',
    nodes: ROAD_TOWNS,
    edges: ROAD_EDGES,
    frames: dfsTrace(ROAD_ADJACENCY, 'A'),
    structureLabel: 'Stack',
  }),

  S('l43-g-mistakes', 'The Mistake Museum: Graphs', 'Graphs · DFS', CommonMistakesSlide, {
    title: 'The Mistake Museum: Graph edition',
    subtitle: 'Everyone donates one eventually. Admission is free.',
    mistakes: [
      { code: 'def bfs(self, start):\n    order = []\n    queue = [start]', label: 'Exhibit A:', desc: 'no visited set — a cycle (A→B→A) sends this looping forever' },
      { code: 'g.add_edge("A", "B")\n# directed=True forgotten', label: 'Exhibit B:', desc: 'expected a one-way street, built a two-way one — check self._directed' },
      { code: 'queue.pop(0)  # instead of\n# queue.popleft()', label: 'Exhibit C:', desc: 'works, but .pop(0) on a list is O(n) — that\'s why BFS uses deque' },
    ],
  }),

  // — Working Example 2 —
  S('l43-we2-exercise', 'Working Example 2', 'Graphs · Working Example 2', ExerciseSlide, {
    eyebrow: 'Working Example 2',
    title: 'Add dfs_recursive and dfs_iterative to Graph',
    steps: [
      'Run both starting at "Town A" on the road network from Example 1',
      'Confirm both produce the exact same visiting order',
      'Notice which version is easier to read, and why',
    ],
    hint: 'Hint: reversed() inside dfs_iterative keeps the iterative order matching the recursive one.',
  }),

  S('l43-we2-output', 'Working Example 2: sample output', 'Graphs · Working Example 2', TerminalOutputSlide, {
    title: 'Sample output',
    lines: [
      "DFS (recursive) from Town A: ['Town A', 'Town B', ...]",
      "DFS (iterative) from Town A: ['Town A', 'Town B', ...]",
    ],
  }),

  S('l43-g-recap', 'Recap: Graphs', 'Graphs · Recap', KeyTakewaysSlide, {
    title: 'Graphs — if you remember three things',
    takeaways: [
      'Adjacency list = dict[vertex] → list[neighbours]',
      'BFS uses a queue; DFS uses recursion or an explicit stack',
      'Both traversals run in O(V + E) — same cost, different order',
    ],
  }),

  // ══════════════════════════════════════════════════════════════════
  // PART B — SORTING
  // ══════════════════════════════════════════════════════════════════

  S('l43-s-divider', 'Section: Sorting', 'Sorting · Intro', SectionDividerSlide, {
    moduleNum: 'Part B',
    title: 'Sorting: Same Task, Four Ways',
    meta: 'The classic Big-O teaching ground',
    bg: t.accent,
  }),

  S('l43-s-intro', 'What you already know vs. what you’ll build', 'Sorting · Intro', TwoColumnTextSlide, {
    title: 'sorted() finally gets a peek behind the curtain',
    left: {
      heading: 'What you already know',
      color: t.accent,
      text: 'sorted() and .sort() have quietly arranged your lists since Part I — you’ve trusted them without seeing inside.',
    },
    right: {
      heading: 'What you’ll build today',
      color: t.navy,
      text: 'The four classic algorithms working underneath: two O(n²) warm-ups, then two O(n log n) heavyweights.',
    },
  }),

  S('l43-s-agenda', 'Sorting agenda', 'Sorting · Intro', AgendaSlide, {
    title: 'This part of the lesson',
    module: 'Part B',
    lessons: [
      { num: '1', title: 'Bubble Sort & Insertion Sort (warm-ups)' },
      { num: '2', title: 'Merge Sort (divide and conquer)' },
      { num: '3', title: 'Quicksort (partition and conquer)' },
      { num: '4', title: 'The Big-O Comparison Table' },
    ],
  }),

  S('l43-s-analogies', 'You already sort things by hand', 'Sorting · Intro', RealWorldUseSlide, {
    title: 'You\'ve been running these algorithms your whole life',
    examples: [
      { icon: '🃏', title: 'Sorting a hand of playing cards', code: 'pick each new card, slide it into place  →  insertion sort' },
      { icon: '📏', title: 'Lining kids up shortest to tallest', code: 'repeatedly swap two who are out of order  →  bubble sort' },
      { icon: '📚', title: 'Two people alphabetising two piles, then combining them', code: 'split, sort separately, merge in order  →  merge sort' },
      { icon: '📖', title: 'Opening a dictionary to a reference letter, then narrowing', code: 'pick a pivot, split around it, repeat  →  quicksort' },
    ],
    note: 'Every algorithm today is something you\'ve done with your hands. The code just makes it precise enough for a computer to follow.',
  }),

  S('l43-s-quote', 'Big Quote: sorting', 'Sorting · Intro', BigQuoteSlide, {
    quote: 'Sorting is the "hello, world" of algorithms — the same simple task, solved four honestly different ways.',
    attribution: '— why this is the classic Big-O teaching ground',
    bg: t.ink,
  }),

  // — Subtopic: Bubble & Insertion Sort —
  S('l43-bi-intro', 'Two warm-up sorts, one shared idea', 'Sorting · Bubble & Insertion', BulletPointsSlide, {
    title: 'Two warm-up sorts, one shared idea',
    module: 'Subtopic',
    bullets: [
      'Repeatedly compare neighbouring (or nearby) elements',
      'Swap them when they’re out of order',
      'Both are O(n²) — great for understanding sorting, not for speed',
    ],
  }),

  S('l43-bi-syntax-bubble', 'Syntax: bubble_sort()', 'Sorting · Bubble & Insertion', CodeSnippetSlide, {
    title: 'Syntax — bubble_sort()',
    code: codeLines([
      'def bubble_sort(items: list) -> list:',
      '    items = items.copy()',
      '    n = len(items)',
      '    for i in range(n):',
      '        for j in range(0, n - i - 1):',
      '            if items[j] > items[j + 1]:',
      '                items[j], items[j + 1] = items[j + 1], items[j]',
      '    return items',
    ]),
    note: 'Every full pass "bubbles" the largest unsorted element to the end via adjacent swaps.',
  }),

  S('l43-bi-syntax-insertion', 'Syntax: insertion_sort()', 'Sorting · Bubble & Insertion', CodeSnippetSlide, {
    title: 'Syntax — insertion_sort()',
    code: codeLines([
      'def insertion_sort(items: list) -> list:',
      '    items = items.copy()',
      '    for i in range(1, len(items)):',
      '        key = items[i]',
      '        j = i - 1',
      '        while j >= 0 and items[j] > key:',
      '            items[j + 1] = items[j]',
      '            j -= 1',
      '        items[j + 1] = key',
      '    return items',
    ]),
    note: 'Builds the sorted portion one element at a time, shifting bigger elements right to make room.',
  }),

  S('l43-bi-anatomy', 'Anatomy: the tuple swap', 'Sorting · Bubble & Insertion', SyntaxAnatomySlide, {
    title: 'Anatomy: items[j], items[j+1] = items[j+1], items[j]',
    parts: [
      { text: 'items[j], items[j+1]', color: '#e8e4d8', label: 'the two neighbours ↓', above: true },
      { text: '=', color: '#f8a01a', label: '↑ reassign both at once', above: false },
      { text: 'items[j+1], items[j]', color: '#e8c26a', label: '↑ in swapped order', above: false },
    ],
  }),

  S('l43-bi-illustration', 'Illustration: bubble vs insertion', 'Sorting · Bubble & Insertion', TerminalOutputSlide, {
    title: 'Same input, same result — two different roads there',
    lines: [
      '>>> bubble_sort([5, 2, 4, 1])',
      '[1, 2, 4, 5]',
      '>>> insertion_sort([5, 2, 4, 1])',
      '[1, 2, 4, 5]',
    ],
  }),

  S('l43-bi-practice', 'Same Big-O, different reality', 'Sorting · Bubble & Insertion', DoVsDontSlide, {
    title: 'Same Big-O class, different reality',
    dos: [
      'Insertion sort: the inner while exits early on nearly-sorted data',
      'Fewer real comparisons in practice',
      'Simple, stable, in-place — a fine choice for small or almost-sorted lists',
    ],
    donts: [
      'Bubble sort always does the full pass, sorted or not',
      'Same O(n²) worst case, but slower in practice',
      'Rarely used outside teaching, for exactly that reason',
    ],
  }),

  S('l43-bi-complexity', 'Complexity: bubble & insertion', 'Sorting · Bubble & Insertion', ComparisonTableSlide, {
    title: 'Bubble vs Insertion — complexity',
    headers: ['', 'Best', 'Average', 'Worst'],
    rows: [
      ['Bubble sort', 'O(n)', 'O(n²)', 'O(n²)'],
      ['Insertion sort', 'O(n)', 'O(n²)', 'O(n²)'],
    ],
  }),

  S('l43-bubble-bars', 'Diagram: bubble sort, bar by bar', 'Sorting · Bubble & Insertion', SortingBarsSlide, {
    title: 'Bubble sort — every comparison, every swap',
    frames: bubbleSortFrames(SORT_DEMO),
  }),

  S('l43-insertion-bars', 'Diagram: insertion sort, bar by bar', 'Sorting · Bubble & Insertion', SortingBarsSlide, {
    title: 'Insertion sort — the SAME five numbers, a different road',
    frames: insertionSortFrames(SORT_DEMO),
  }),

  // — Working Example 3 —
  S('l43-we3-exercise', 'Working Example 3', 'Sorting · Working Example 3', ExerciseSlide, {
    eyebrow: 'Working Example 3',
    title: 'Write bubble_sort() and insertion_sort()',
    steps: [
      'Sort [64, 34, 25, 12, 22, 11, 90] with each function',
      'Count how many swaps bubble sort actually performs',
      'Print both results plus the swap count',
    ],
    hint: 'Hint: increment a counter only when you actually swap two elements — not every time you compare them.',
  }),

  S('l43-we3-output', 'Working Example 3: sample output', 'Sorting · Working Example 3', TerminalOutputSlide, {
    title: 'Sample output',
    lines: [
      'Bubble sort result: [11, 12, 22, 25, 34, 64, 90]',
      'Swaps: 15',
      'Insertion sort result: [11, 12, 22, 25, 34, 64, 90]',
    ],
  }),

  S('l43-we3-debughunt', 'Bug hunt: broken bubble sort', 'Sorting · Working Example 3', DebugHuntSlide, {
    title: '🔍 Bug hunt: this bubble sort is off by one',
    codeLines: [
      'def bubble_sort(items):',
      '    for i in range(len(items)):',
      '        for j in range(0, len(items) - i):',
      '            if items[j] > items[j + 1]:',
      '                items[j], items[j+1] = items[j+1], items[j]',
      '    return items',
    ],
    hints: [
      'Hint 1: what happens on the pass where j reaches the very last index?',
      'Hint 2: compare this range() to the syntax slide two steps back',
      'Answer: range() should stop at len(items) - i - 1',
    ],
  }),

  // — Subtopic: Merge Sort —
  S('l43-merge-def', 'Definition: Divide and Conquer', 'Sorting · Merge Sort', DefinitionSlide, {
    word: 'Divide and Conquer',
    phonetic: 'algorithm strategy',
    definition: 'Split a problem into smaller pieces, solve each piece, then combine the results — the same "shrink the problem" thinking behind recursion.',
  }),

  S('l43-merge-timeline', 'Merge sort, in four beats', 'Sorting · Merge Sort', StepsTimelineSlide, {
    title: 'Merge sort, in four beats',
    steps: [
      { label: 'Split', sub: 'Halve the list, recursively' },
      { label: 'Bottom out', sub: 'A list of length ≤ 1 is already sorted' },
      { label: 'Merge', sub: 'Combine two sorted halves in order' },
      { label: 'Repeat', sub: 'Until one fully sorted list remains' },
    ],
  }),

  S('l43-merge-syntax', 'Syntax: merge_sort()', 'Sorting · Merge Sort', CodeSnippetSlide, {
    title: 'Syntax — merge_sort()',
    code: codeLines([
      'def merge_sort(items: list) -> list:',
      '    if len(items) <= 1:',
      '        return items',
      '    mid = len(items) // 2',
      '    left = merge_sort(items[:mid])',
      '    right = merge_sort(items[mid:])',
      '    return _merge(left, right)',
    ]),
    note: 'The base case is a list of length 0 or 1 — nothing left to sort.',
  }),

  S('l43-merge-helper', 'Syntax: the _merge() helper', 'Sorting · Merge Sort', CodeSnippetSlide, {
    title: 'Syntax — the _merge() helper',
    code: codeLines([
      'def _merge(left: list, right: list) -> list:',
      '    result = []',
      '    i = j = 0',
      '    while i < len(left) and j < len(right):',
      '        if left[i] <= right[j]:',
      '            result.append(left[i]); i += 1',
      '        else:',
      '            result.append(right[j]); j += 1',
      '    result.extend(left[i:])',
      '    result.extend(right[j:])',
      '    return result',
    ]),
    note: 'Two pointers, i and j, always compare the smallest unused item from each half.',
  }),

  S('l43-merge-flow', 'The base case that stops the recursion', 'Sorting · Merge Sort', FlowchartSlide, {
    title: 'The base case that stops the recursion',
    condition: 'len(items) <= 1 ?',
    yesBranch: 'Return items as-is — already sorted',
    noBranch: 'Split in half, merge_sort() each half',
  }),

  S('l43-merge-illustration', 'Illustration: merge sort run', 'Sorting · Merge Sort', TerminalOutputSlide, {
    title: 'What merge_sort() actually prints',
    lines: ['>>> merge_sort([5, 2, 4, 1, 3])', '[1, 2, 3, 4, 5]'],
  }),

  S('l43-merge-pause', 'Pause & Think: how many levels?', 'Sorting · Merge Sort', PauseThinkSlide, {
    question: 'If merge_sort splits the list in half every time, how many "levels" of splitting happen for a list of 8 items?',
    note: 'Three levels: 8 → 4+4 → 2+2+2+2 → eight 1s. That count is log₂(8).',
  }),

  S('l43-merge-bars', 'Diagram: merge sort, split by split', 'Sorting · Merge Sort', SortingBarsSlide, {
    title: 'Merge sort — split, recurse, merge, on the SAME five numbers',
    frames: mergeSortFrames(SORT_DEMO),
  }),

  // — Working Example 4 —
  S('l43-we4-exercise', 'Working Example 4', 'Sorting · Working Example 4', ExerciseSlide, {
    eyebrow: 'Working Example 4',
    title: 'Write merge_sort() and a helper _merge()',
    steps: [
      'Sort [38, 27, 43, 3, 9, 82, 10]',
      'Print the result',
    ],
    hint: 'Hint: _merge() only ever looks at the front of each half — that’s exactly why it needs two index pointers, i and j.',
  }),

  S('l43-we4-output', 'Working Example 4: sample output', 'Sorting · Working Example 4', TerminalOutputSlide, {
    title: 'Sample output',
    lines: ['Merge sort result: [3, 9, 10, 27, 38, 43, 82]'],
  }),

  // — Subtopic: Quicksort —
  S('l43-quick-def', 'Definition: Pivot', 'Sorting · Quicksort', DefinitionSlide, {
    word: 'Pivot',
    phonetic: 'noun · quicksort term',
    definition: 'A chosen element that partitions the rest: everything smaller goes left, everything larger goes right — then each side is sorted the same way, recursively.',
  }),

  S('l43-quick-syntax', 'Syntax: quicksort()', 'Sorting · Quicksort', CodeSnippetSlide, {
    title: 'Syntax — quicksort()',
    code: codeLines([
      'def quicksort(items: list) -> list:',
      '    if len(items) <= 1:',
      '        return items',
      '    pivot = items[len(items) // 2]',
      '    left = [x for x in items if x < pivot]',
      '    middle = [x for x in items if x == pivot]',
      '    right = [x for x in items if x > pivot]',
      '    return quicksort(left) + middle + quicksort(right)',
    ]),
    note: 'No separate merge step here — plain list concatenation does the job.',
  }),

  S('l43-quick-anatomy', 'Anatomy: the partition comprehension', 'Sorting · Quicksort', SyntaxAnatomySlide, {
    title: 'Anatomy: [x for x in items if x < pivot]',
    parts: [
      { text: '[x', color: '#a9a3ff', label: 'build a new list ↓', above: true },
      { text: 'for x in items', color: '#f8a01a', label: '↑ take each item', above: false },
      { text: 'if x < pivot]', color: '#e8c26a', label: 'keep it only if smaller ↓', above: true },
    ],
  }),

  S('l43-quick-vs-merge', 'Merge sort vs Quicksort', 'Sorting · Quicksort', ComparisonTableSlide, {
    title: 'Merge sort vs Quicksort',
    headers: ['', 'Merge Sort', 'Quicksort'],
    rows: [
      ['Split', 'Always even', 'Around a chosen pivot'],
      ['Extra step', 'Merge (O(n) per level)', 'None — just concatenation'],
      ['Worst case', 'O(n log n)', 'O(n²) on a bad pivot'],
      ['Extra space', 'O(n)', 'O(log n)'],
    ],
  }),

  S('l43-quick-illustration', 'Illustration: quicksort run', 'Sorting · Quicksort', TerminalOutputSlide, {
    title: 'What quicksort() actually prints',
    lines: ['>>> quicksort([5, 2, 4, 1, 3])', '[1, 2, 3, 4, 5]'],
  }),

  S('l43-quick-truefalse', 'True or False: quicksort complexity', 'Sorting · Quicksort', TrueOrFalseSlide, {
    statement: '"Quicksort’s average and worst-case time complexity are the same."',
    note: 'Reveal the answer on the next slide — let them commit first.',
  }),

  S('l43-quick-truefalse-answer', 'Answer: quicksort complexity', 'Sorting · Quicksort', AnswerRevealSlide, {
    correct: false,
    answer: 'False!',
    explanation: 'Average case is "O(n log n)". Worst case — already-sorted input with a poor pivot choice — degrades to "O(n²)".',
  }),

  S('l43-quick-bars', 'Diagram: quicksort, pivot by pivot', 'Sorting · Quicksort', SortingBarsSlide, {
    title: 'Quicksort — pick a pivot, partition, repeat — SAME five numbers',
    frames: quicksortFrames(SORT_DEMO),
  }),

  // — Working Example 5 —
  S('l43-we5-exercise', 'Working Example 5', 'Sorting · Working Example 5', ExerciseSlide, {
    eyebrow: 'Working Example 5',
    title: 'Write quicksort()',
    steps: [
      'Sort [33, 10, 68, 21, 90, 5]',
      'Print the result',
      'Confirm it matches sorted() on the exact same list',
    ],
    hint: 'Hint: three list comprehensions — smaller, equal, and larger than the pivot — then glue them back together.',
  }),

  S('l43-we5-output', 'Working Example 5: sample output', 'Sorting · Working Example 5', TerminalOutputSlide, {
    title: 'Sample output',
    lines: [
      'Quicksort result: [5, 10, 21, 33, 68, 90]',
      'Matches sorted(): True',
    ],
  }),

  // — Subtopic: The Big-O Comparison Table —
  S('l43-timsort-def', 'Definition: Timsort', 'Sorting · Big-O Table', DefinitionSlide, {
    word: 'Timsort',
    phonetic: 'noun · Python’s real sort',
    definition: 'The hybrid of merge sort and insertion sort that sorted() and .sort() actually use — tuned for real-world, partially-sorted data. You’ll never implement it; just know its name.',
  }),

  S('l43-bigo-table', 'The master Big-O comparison table', 'Sorting · Big-O Table', ComparisonTableSlide, {
    title: 'Structures & Sorts — the master table',
    headers: ['Structure / Sort', 'Best', 'Average', 'Worst', 'Space'],
    rows: [
      ['list index access', 'O(1)', 'O(1)', 'O(1)', 'O(n)'],
      ['LinkedList search', 'O(1)', 'O(n)', 'O(n)', 'O(n)'],
      ['Stack / Queue push-pop', 'O(1)', 'O(1)', 'O(1)', 'O(n)'],
      ['BST search', 'O(log n)', 'O(log n)', 'O(n)', 'O(n)'],
      ['HashMap (dict) lookup', 'O(1)', 'O(1)', 'O(n)', 'O(n)'],
      ['Graph BFS / DFS', 'O(V+E)', 'O(V+E)', 'O(V+E)', 'O(V)'],
      ['Bubble sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)'],
      ['Insertion sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)'],
      ['Merge sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)'],
      ['Quicksort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      ['Timsort (sorted())', 'O(n)', 'O(n log n)', 'O(n log n)', 'O(n)'],
    ],
  }),

  S('l43-bigo-cheatsheet', 'Cheat sheet: reading Big-O', 'Sorting · Big-O Table', CheatSheetSlide, {
    title: 'Screenshot this one 📸',
    subtitle: 'Big-O vocabulary cheat sheet',
    items: [
      { op: 'O(1)', label: 'constant', example: 'list index, dict lookup' },
      { op: 'O(log n)', label: 'logarithmic', example: 'BST search' },
      { op: 'O(n)', label: 'linear', example: 'LinkedList search' },
      { op: 'O(n log n)', label: 'linearithmic', example: 'merge sort, quicksort avg, Timsort' },
      { op: 'O(n²)', label: 'quadratic', example: 'bubble sort, insertion sort' },
      { op: 'O(V+E)', label: 'graph traversal', example: 'BFS, DFS' },
    ],
  }),

  // — Working Example 6 —
  S('l43-we6-exercise', 'Working Example 6', 'Sorting · Working Example 6', ExerciseSlide, {
    eyebrow: 'Working Example 6',
    title: 'Benchmark all five sorts on 2,000 random integers',
    steps: [
      'Time bubble_sort, insertion_sort, merge_sort, quicksort, and sorted()',
      'Use time.perf_counter() around each run',
      'Print a table ordered fastest to slowest',
    ],
    hint: 'Hint: give each sort a fresh .copy() of the list — otherwise the second sort inherits an already-sorted list from the first.',
  }),

  S('l43-we6-output', 'Working Example 6: sample output', 'Sorting · Working Example 6', TerminalOutputSlide, {
    title: 'Sample output',
    lines: [
      'Sort            Time (s)',
      '--------------------------',
      'sorted()          0.0011',
      'quicksort         0.0087',
      'merge_sort        0.0102',
      'insertion_sort    0.8341',
      'bubble_sort       1.2765',
    ],
  }),

  S('l43-s-mistakes', 'The Mistake Museum: Sorting', 'Sorting · Recap', CommonMistakesSlide, {
    title: 'The Mistake Museum: Sorting edition',
    subtitle: 'Same museum, new wing.',
    mistakes: [
      { code: 'for j in range(0, n - i):\n    # should be n - i - 1', label: 'Exhibit D:', desc: 'off-by-one in bubble sort — reaches past the last valid pair' },
      { code: 'def quicksort(items):\n    items.sort()\n    return items', label: 'Exhibit E:', desc: 'calling .sort() inside your own sort defeats the entire exercise' },
      { code: 'left = merge_sort(items[:mid])\nright = merge_sort(items[mid])', label: 'Exhibit F:', desc: 'items[mid] (no colon) grabs one element, not a slice — silently wrong' },
    ],
  }),

  S('l43-s-speedround', 'Speed round: sorting recall', 'Sorting · Recap', SpeedRoundSlide, {
    title: '⚡ Speed round',
    subtitle: 'True or false — answer out loud, one second each. Go:',
    questions: [
      '1 · Bubble sort and insertion sort are both O(n²) in the worst case',
      '2 · Merge sort needs extra O(n) space for the merge step',
      '3 · Quicksort\'s worst case happens on an already-sorted list with a poor pivot',
      '4 · Python\'s sorted() is secretly running one of today\'s four sorts',
    ],
  }),

  S('l43-s-recap', 'Recap: Sorting', 'Sorting · Recap', KeyTakewaysSlide, {
    title: 'Sorting — if you remember three things',
    takeaways: [
      'Bubble & insertion sort: O(n²); merge sort & quicksort: O(n log n) average',
      'Merge sort’s core shape: split, recurse, merge',
      'sorted() and .sort() use Timsort — you never need to write it yourself',
    ],
  }),

  // ══════════════════════════════════════════════════════════════════
  // PART D — TUTOR DEMONSTRATION CHALLENGES (30 min, collaborative)
  // ══════════════════════════════════════════════════════════════════

  S('l43-td-divider', 'Section: Tutor Demonstrations', 'Tutor Demonstrations', SectionDividerSlide, {
    moduleNum: 'Part D',
    title: 'Tutor Demonstration Challenges',
    meta: 'Solved together — not a solo performance',
    bg: t.navy,
  }),

  S('l43-td-method', 'How we solve it, every time', 'Tutor Demonstrations', StepsTimelineSlide, {
    title: 'How we solve it — every single time',
    steps: [
      { label: 'Break down', sub: 'What is this problem actually asking?' },
      { label: 'Plan', sub: 'Say the approach out loud, in plain language' },
      { label: 'Code', sub: 'You write it with me, in the chat' },
      { label: 'Debug', sub: 'Together, once something runs' },
    ],
  }),

  S('l43-instructor-td', 'Instructor: running the Tutor Demos', 'Tutor Demonstrations', InstructorNotesSlide, {
    title: 'This is the last 30 minutes — lead it, don\'t solo it',
    timing: '30 min, collaborative',
    points: [
      { label: 'Stop and ask', text: 'When you reach a line that directly applies a lesson concept, stop typing and ask students to write that line in the chat first.' },
      { label: 'Go further', text: 'Ask how they\'d approach the whole step before anyone writes a single line — the thinking is the point, not the syntax.' },
      { label: 'Protect this block', text: 'If the first hour ran long, tighten earlier Working Examples instead — never rush or cut these two Challenges.' },
    ],
  }),

  S('l43-c1-brief', 'Challenge 1: shortest_path_length', 'Tutor Demonstrations · Challenge 1', QuestBriefingSlide, {
    questNum: '1',
    difficulty: '★★☆',
    title: 'shortest_path_length(start, end)',
    description: 'Extend Graph with a method that uses BFS to find the number of edges on the shortest path between two vertices, returning -1 if no path exists.',
    reward: 'Reuses your bfs-style queue/visited pattern',
    time: 'Unweighted graph — BFS finds shortest paths naturally',
  }),

  S('l43-c1-illustration', 'Challenge 1: illustration', 'Tutor Demonstrations · Challenge 1', TerminalOutputSlide, {
    title: 'Illustration',
    lines: [
      'Graph: A-B, B-C, C-D, A-D',
      '',
      '>>> shortest_path_length("A", "C")',
      '2',
      '>>> shortest_path_length("A", "Z")',
      '-1',
    ],
  }),

  S('l43-c1-diagram', 'Challenge 1: distance diagram', 'Tutor Demonstrations · Challenge 1', GraphDiagramSlide, {
    title: 'BFS discovers distance for free — watch it happen',
    nodes: CHALLENGE_NODES,
    edges: CHALLENGE_EDGES,
    frames: bfsDistanceTrace(CHALLENGE_ADJACENCY, 'A').frames,
    structureLabel: 'Queue',
  }),

  S('l43-c1-pause', 'Challenge 1: Pause & Think', 'Tutor Demonstrations · Challenge 1', PauseThinkSlide, {
    question: 'BFS already visits every vertex — what ONE extra thing do you need to track to also know each vertex’s distance from the start?',
    note: 'A distance dict, updated the moment a vertex is first discovered — not when it’s processed.',
  }),

  S('l43-c2-brief', 'Challenge 2: is_sorted_check', 'Tutor Demonstrations · Challenge 2', QuestBriefingSlide, {
    questNum: '2',
    difficulty: '★★☆',
    title: 'is_sorted_check(sort_function, data)',
    description: 'Runs any sort function on data, verifies the output is actually sorted and contains the same elements as the input, and returns True or False.',
    reward: 'Test all four sorts across three list shapes',
    time: 'Already sorted · reverse sorted · random',
  }),

  S('l43-c2-illustration', 'Challenge 2: illustration', 'Tutor Demonstrations · Challenge 2', TerminalOutputSlide, {
    title: 'Illustration',
    lines: [
      'bubble_sort on reverse-sorted list: PASSED',
      'quicksort on random list: PASSED',
    ],
  }),

  S('l43-c2-pause', 'Challenge 2: Pause & Think', 'Tutor Demonstrations · Challenge 2', PauseThinkSlide, {
    question: 'Two lists can both look "sorted" and still fail your check — how?',
    note: 'If the sort silently dropped or duplicated an element. Compare sorted(output) == sorted(data) too, not just order.',
  }),

  // ══════════════════════════════════════════════════════════════════
  // SUMMARY
  // ══════════════════════════════════════════════════════════════════

  S('l43-summary-memorize', 'Summary: Memorize', 'Summary', BulletPointsSlide, {
    title: 'Memorize',
    module: 'Summary',
    bullets: [
      'Adjacency list pattern: dict[vertex] → list[neighbours]',
      'BFS uses a queue (collections.deque); DFS uses recursion or an explicit stack',
      'Both BFS and DFS run in O(V + E)',
      'Bubble sort / insertion sort: O(n²); merge sort / quicksort: O(n log n) average',
      'Python’s sorted() and .sort() use Timsort',
    ],
  }),

  S('l43-summary-shape', 'The one shape to remember', 'Summary', CodeSnippetSlide, {
    title: 'If you remember one code shape from today…',
    code: codeLines([
      'def merge_sort(items):',
      '    if len(items) <= 1:',
      '        return items',
      '    mid = len(items) // 2',
      '    return _merge(merge_sort(items[:mid]), merge_sort(items[mid:]))',
    ]),
    note: 'Split, recurse, merge — the "shrink the problem" shape that shows up again and again.',
  }),

  S('l43-summary-understand', 'Summary: Understand', 'Summary', BulletPointsSlide, {
    title: 'Understand',
    module: 'Summary',
    bullets: [
      'Why adjacency lists are usually preferred over adjacency matrices for sparse graphs',
      'Why quicksort’s worst case is worse than merge sort’s, despite similar average performance',
      'Why insertion sort outperforms bubble sort in practice, despite the same Big-O class',
      'How today’s Big-O table lets you choose the right structure or sort for a given problem',
    ],
  }),

  // ══════════════════════════════════════════════════════════════════
  // MINI PROJECT HANDOFF
  // ══════════════════════════════════════════════════════════════════

  S('l43-instructor-mp', 'Instructor: handing off the Mini Project', 'Mini Project', InstructorNotesSlide, {
    title: 'State it honestly, then stop',
    timing: '~2 min',
    points: [
      { label: 'Difficulty rating', text: 'This one is 8/10 — say so plainly. Do not soften it, and do not solve any part of it for anyone.' },
      { label: 'Your job ends here', text: 'Responsibility for this topic ends at handoff. You may explain expected inputs/outputs if asked — never the code structure or algorithm.' },
      { label: 'Keep it anchored', text: 'If a student reaches for an imported sorting library or recursion nobody taught, that is a signal worth investigating quietly, not initiative to praise.' },
    ],
  }),

  S('l43-mp-brief', 'Mini Project 43', 'Mini Project', LabTimeSlide, {
    badge: '🧪 MINI PROJECT 43 · mp43',
    title: 'Extend the DSA Toolkit: Graph + sorting module',
    description: 'Difficulty rating: 8/10. Build:',
    tasks: [
      'A Graph class: adjacency list, add_edge, bfs, dfs_recursive, dfs_iterative',
      'A standalone sorting module: bubble_sort, insertion_sort, merge_sort, quicksort',
      'A demo dataset: 1,000+ random integers and a graph with 6+ vertices',
      'A benchmark of all four sorts against sorted(), plus today’s Big-O table',
    ],
    testCases: [
      "BFS from A: ['A','B','C','D','E','F']",
      "DFS from A: ['A','B','D','E','C','F']",
      'sorted() fastest, bubble_sort slowest — every time',
    ],
    testNote: 'Every method needs a Big-O-annotated docstring — the habit you started in Lesson 41.',
  }),

  S('l43-mp-submit', 'Submitting mp43', 'Mini Project', BulletPointsSlide, {
    title: 'Submitting mp43',
    module: 'Before next lesson',
    bullets: [
      'File name: mp43_<YourID>.py — for example mp43_A45.py',
      'Submit through the Google Form link shared in class',
      'No grading, no score — a genuine attempt is what counts',
    ],
  }),

  // ══════════════════════════════════════════════════════════════════
  // APPENDIX (optional — one sentence, only if time allows)
  // ══════════════════════════════════════════════════════════════════

  S('l43-app-divider', 'Section: Appendix', 'Appendix', SectionDividerSlide, {
    moduleNum: 'Appendix',
    title: 'Going Deeper (Optional)',
    meta: 'Not required — read this on your own time',
    bg: t.gray100,
  }),

  S('l43-app-matrix-compare', 'Adjacency List vs Adjacency Matrix', 'Appendix', ComparisonTableSlide, {
    title: 'Adjacency List vs Adjacency Matrix',
    headers: ['', 'Adjacency List', 'Adjacency Matrix'],
    rows: [
      ['Space', 'O(V + E)', 'O(V²)'],
      ['Check edge exists', 'O(neighbours)', 'O(1)'],
      ['Best for', 'sparse graphs', 'dense graphs'],
    ],
  }),

  S('l43-app-matrix-code', 'Adjacency matrix, illustrated', 'Appendix', CodeSnippetSlide, {
    title: 'Illustration: a 4-vertex adjacency matrix',
    code: codeLines([
      '# 4 vertices: A=0, B=1, C=2, D=3; edges A-B, B-C',
      'matrix = [',
      '    [0, 1, 0, 0],',
      '    [1, 0, 1, 0],',
      '    [0, 1, 0, 0],',
      '    [0, 0, 0, 0],',
      ']',
      '# matrix[0][1] -> 1  (A-B connected)',
      '# matrix[0][2] -> 0  (A-C not connected)',
    ]),
    note: 'Checking matrix[i][j] is O(1) — faster than scanning a neighbour list, at the cost of O(V²) space regardless of edge count.',
  }),

  S('l43-app-timsort', 'sorted()’s Timsort, briefly', 'Appendix', BulletPointsSlide, {
    title: 'sorted()’s Timsort, briefly',
    module: 'Appendix',
    bullets: [
      'Breaks the input into small chunks',
      'Sorts each chunk with insertion sort',
      'Merges the chunks using merge sort’s merge step',
      'Best case O(n) — none of today’s four custom sorts achieve that',
    ],
  }),

  // ══════════════════════════════════════════════════════════════════
  // CLOSING
  // ══════════════════════════════════════════════════════════════════

  S('l43-spaced-review', 'Memory checkpoint', 'Closing', SpacedReviewSlide, {
    eyebrow: '🧠 Memory checkpoint',
    title: 'Quick — from earlier this lesson:',
    question: 'Without looking back: what data structure does BFS use, and what does DFS use instead?',
    hints: [
      '⏳ Say it out loud in 10 seconds',
      '🔁 Struggled? That struggle is the memory forming',
      '📅 We\'ll ask again during Sunday Revision — that\'s on purpose',
    ],
  }),

  S('l43-encouragement', 'Encouragement', 'Closing', EncouragementSlide, {
    title: 'You just built the traversal + sorting toolkit real interviews are made of.',
    sub: 'Adjacency lists, BFS, DFS, four sorts, and the Big-O table to choose between them — quietly, at your own pace.',
  }),

  S('l43-resources', 'Where to get help', 'Closing', ResourcesSlide, {
    title: 'Where to go for help',
    resources: [
      { label: 'PyTech Hub AI Tutor', desc: 'One-on-one help, any time', link: 'Ask in the portal →' },
      { label: 'Session recording + notebook PDF', desc: 'Everything from today, to rewatch', link: 'Sent after class →' },
      { label: 'Sunday Revision', desc: 'Bring the specific challenge you hit', link: 'This Sunday, 8pm →' },
    ],
  }),

  S('l43-thankyou', 'Thank You', 'Closing', ThankYouSlide, {
    heading: 'Thank you.',
    sub: 'Questions? WhatsApp: wa.me/233209130538 · pytech.hub@gmail.com',
    name: 'Your PyTech Hub Tutor',
    role: 'DSA Part 3 · Lesson 43',
    bg: t.navy,
  }),
]

export const lesson43Deck = lesson43Slides
