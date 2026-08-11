// Generates real, step-by-step BFS/DFS traces for GraphDiagramSlide so the
// visited order + queue/stack readout shown to students is always
// mathematically correct for the given adjacency list — never hand-typed.

export function bfsTrace(adjacency, start) {
  const visited = new Set([start])
  const order = []
  const queue = [start]
  const frames = []
  while (queue.length) {
    const vertex = queue.shift()
    order.push(vertex)
    frames.push({
      visiting: vertex,
      visitedSoFar: [...order],
      structureLabel: 'Queue',
      structureSnapshot: [...queue],
      note: `Visit ${vertex} — queue: [${queue.join(', ') || 'empty'}]`,
    })
    for (const n of adjacency[vertex] || []) {
      if (!visited.has(n)) {
        visited.add(n)
        queue.push(n)
      }
    }
  }
  return frames
}

// Iterative DFS — mirrors dfs_iterative() from the lesson (explicit stack,
// neighbours pushed in reverse so visiting order matches the recursive version).
export function dfsTrace(adjacency, start) {
  const visited = new Set()
  const order = []
  const stack = [start]
  const frames = []
  while (stack.length) {
    const vertex = stack.pop()
    if (visited.has(vertex)) continue
    visited.add(vertex)
    order.push(vertex)
    frames.push({
      visiting: vertex,
      visitedSoFar: [...order],
      structureLabel: 'Stack',
      structureSnapshot: [...stack],
      note: `Visit ${vertex} — stack: [${stack.join(', ') || 'empty'}]`,
    })
    const neighbours = [...(adjacency[vertex] || [])].reverse()
    for (const n of neighbours) {
      if (!visited.has(n)) stack.push(n)
    }
  }
  return frames
}

// BFS trace that also records each vertex's discovered distance — backs the
// shortest_path_length() Tutor Demonstration Challenge illustration.
export function bfsDistanceTrace(adjacency, start) {
  const dist = { [start]: 0 }
  const order = [start]
  const queue = [start]
  const frames = [{ visiting: start, distance: 0, visitedSoFar: [start], distances: { ...dist }, note: `${start} is the start — distance 0` }]
  while (queue.length) {
    const vertex = queue.shift()
    for (const n of adjacency[vertex] || []) {
      if (!(n in dist)) {
        dist[n] = dist[vertex] + 1
        order.push(n)
        queue.push(n)
        frames.push({
          visiting: n,
          distance: dist[n],
          visitedSoFar: [...order],
          distances: { ...dist },
          note: `Discover ${n} from ${vertex} — distance ${dist[n]}`,
        })
      }
    }
  }
  return { frames, distances: dist, order }
}
