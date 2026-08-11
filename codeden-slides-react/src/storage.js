import { ALL_SLIDES } from './components/slides/index.js'
import { lesson43Slides } from './decks/lesson43Deck.jsx'

// Bump this whenever the shipped default deck changes meaningfully — it
// invalidates any old cached deck sitting in a browser's localStorage from
// before the change, so a stale demo/placeholder deck can never silently
// keep loading instead of the current one.
const KEY = 'codeden-deck-v3'
let uidCounter = 0

// Slides reconstructible from a saved {id, uid, customHtml} entry — the
// generic library plus any code-authored decks (which use their own ids,
// so they need to be registered here too or a reload would drop them).
const SLIDE_REGISTRY = [...ALL_SLIDES, ...lesson43Slides]

// Stable per-instance id — lets the same slide type appear in a deck
// more than once, each with its own independent edits.
export function makeUid(id) {
  uidCounter += 1
  return `${id}-${Date.now().toString(36)}-${uidCounter}`
}

// Attach uids/customHtml to a plain array of ALL_SLIDES entries (e.g. a code-defined deck).
export function withUids(slides) {
  return slides.map(s => ({ ...s, uid: s.uid || makeUid(s.id), customHtml: s.customHtml ?? null }))
}

export function loadDeck() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const saved = JSON.parse(raw)
    if (!Array.isArray(saved)) return null
    return saved
      .map(entry => {
        const base = SLIDE_REGISTRY.find(s => s.id === entry.id)
        if (!base) return null
        return { ...base, uid: entry.uid || makeUid(entry.id), customHtml: entry.customHtml ?? null }
      })
      .filter(Boolean)
  } catch {
    return null
  }
}

export function saveDeck(deck) {
  try {
    const serializable = deck.map(s => ({ uid: s.uid, id: s.id, customHtml: s.customHtml ?? null }))
    localStorage.setItem(KEY, JSON.stringify(serializable))
  } catch {
    // localStorage unavailable or quota exceeded — edits still work this session, just won't persist
  }
}
