// Tiny Python-ish syntax highlighter for CodeSnippetSlide / DebugHuntSlide.
// Turns plain code lines into the {tokens:[{text,color}]} shape those
// components expect, so every code slide across a deck gets consistent
// keyword/string/call highlighting without hand-tokenizing every line.
import { t } from '../theme.js'

const KEYWORDS = new Set([
  'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import',
  'from', 'not', 'in', 'and', 'or', 'is', 'None', 'True', 'False', 'as',
  'with', 'try', 'except', 'finally', 'pass', 'break', 'continue', 'lambda', 'raise', 'yield',
])

const COLOR = {
  keyword: t.accent,
  string: '#e8c26a',
  call: '#a9a3ff',
  comment: '#7d7660',
  plain: '#e8e4d8',
}

// Matches (in priority order): quoted strings, numbers, identifiers, runs of
// whitespace, or any single remaining character (operators/punctuation).
const TOKEN_RE = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+(?:\.\d+)?|[A-Za-z_][A-Za-z0-9_]*|\s+|.)/g

function tokenizeLine(line) {
  if (/^\s*#/.test(line)) return { text: line, color: COLOR.comment }
  if (line.trim() === '') return { text: ' ', color: COLOR.plain }

  const parts = line.match(TOKEN_RE) || [line]
  const tokens = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (/^["']/.test(part)) { tokens.push({ text: part, color: COLOR.string }); continue }
    if (/^[A-Za-z_]/.test(part)) {
      if (KEYWORDS.has(part)) { tokens.push({ text: part, color: COLOR.keyword }); continue }
      if (parts[i + 1] === '(') { tokens.push({ text: part, color: COLOR.call }); continue }
      tokens.push({ text: part, color: COLOR.plain }); continue
    }
    tokens.push({ text: part, color: COLOR.plain })
  }
  return { tokens }
}

// codeLines(['line one', 'line two']) -> shape ready for CodeSnippetSlide's `code` prop
export function codeLines(lines) {
  return lines.map(tokenizeLine)
}
