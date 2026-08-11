import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
import { bfsTrace } from '../../decks/graphTraceHelpers.js'
import { bubbleSortFrames } from '../../decks/sortFrameHelpers.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

const DEFAULT_ADJACENCY = { A: ['B', 'C'], B: ['A', 'D'], C: ['A'], D: ['B'] }

// ─────────────────────────────────────────────────────────────────────────
// GraphDiagramSlide — a realistic little "road map" graph, always fully
// visible, with the visited-node highlight + queue/stack readout revealed
// one step at a time (Ctrl+→/←) via the shared step engine. Frames come
// from src/decks/graphTraceHelpers.js so the traversal order is always
// mathematically correct, never hand-faked.
// ─────────────────────────────────────────────────────────────────────────
export function GraphDiagramSlide({
  title = 'BFS across the road network',
  nodes = [
    { id: 'A', label: 'Town A', x: 160, y: 300 },
    { id: 'B', label: 'Town B', x: 420, y: 140 },
    { id: 'C', label: 'Town C', x: 420, y: 460 },
    { id: 'D', label: 'Town D', x: 700, y: 300 },
  ],
  edges = [ { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' } ],
  frames = bfsTrace(DEFAULT_ADJACENCY, 'A'),
  structureLabel = 'Queue',
}) {
  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const W = 1640, H = 640

  return (
    <div style={{ ...slideBase, background:'#fbf8f0', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:44, fontWeight:700, color:t.ink, marginBottom:18 }}>{title}</div>

      <div style={{ position:'relative', width: W, height: H, margin:'0 auto', background:'linear-gradient(160deg,#f6f1e2,#efe8d4)', borderRadius:t.radiusLg, border:`2px solid ${t.gray300}`, boxShadow:t.shadowMd, overflow:'hidden' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position:'absolute', inset:0 }}>
          {/* Roads — always visible baseline */}
          {edges.map((e, i) => {
            const a = nodeById[e.from], b = nodeById[e.to]
            if (!a || !b) return null
            return (
              <g key={i} className="anim-fade-up">
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#d8cfa8" strokeWidth={22} strokeLinecap="round" />
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fff" strokeWidth={3} strokeDasharray="14 14" strokeLinecap="round" opacity={0.8} />
              </g>
            )
          })}
          {/* Visited highlight — cumulative, one ring lights up per step */}
          {frames.map((f, i) => {
            const n = nodeById[f.visiting]
            if (!n) return null
            return (
              <circle key={`hl-${i}`} className={`anim-pop d${i + 2}`}
                cx={n.x} cy={n.y} r={54} fill="none" stroke={t.accent} strokeWidth={7} />
            )
          })}
          {/* Town pins — always visible baseline */}
          {nodes.map((n, i) => (
            <g key={n.id} className="anim-pop" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
              <circle cx={n.x} cy={n.y} r={38} fill="#fff" stroke={t.ink} strokeWidth={3} />
              <text x={n.x} y={n.y + 10} textAnchor="middle" fontFamily={t.fontDisplay} fontWeight={700} fontSize={30} fill={t.ink}>{n.id}</text>
              <text x={n.x} y={n.y + 68} textAnchor="middle" fontFamily={t.fontBody} fontSize={19} fill={t.gray700}>{n.label}</text>
            </g>
          ))}
        </svg>

        {/* Per-step caption — exclusive, one frame's readout shown at a time */}
        {frames.map((f, i) => (
          <div key={`cap-${i}`} className={`anim-fade-up frame d${i + 2}`} style={{ position:'absolute', left:28, bottom:24, right:28, background:'rgba(26,22,0,.92)', color:'#fff', borderRadius:t.radiusMd, padding:'18px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:22 }}>
            <span><b style={{ color:t.accent }}>Step {i + 1}:</b> {f.note}</span>
            {f.structureSnapshot && (
              <span style={{ fontFamily:t.fontMono, fontSize:19, color:'#cfcabf' }}>
                {f.structureLabel || structureLabel}: [{f.structureSnapshot.join(', ') || '—'}]
              </span>
            )}
            {f.distance != null && (
              <span style={{ fontFamily:t.fontMono, fontSize:19, color:'#cfcabf' }}>distance from start: {f.distance}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// SortingBarsSlide — a real bar chart driven by an actual algorithm
// execution (src/decks/sortFrameHelpers.js). Frame 0 (the starting array)
// is the baseline; every later frame is mutually exclusive — only the
// current comparison/swap/merge state is ever on screen, one Ctrl+→ at a time.
// ─────────────────────────────────────────────────────────────────────────
export function SortingBarsSlide({
  title = 'Bubble sort, one comparison at a time',
  frames = bubbleSortFrames([8, 3, 6, 1, 5]),
}) {
  const values = frames[0]?.array || []
  const maxVal = Math.max(1, ...values)
  const W = 1500, H = 520, barGap = 22
  const barW = values.length ? (W - barGap * (values.length - 1)) / values.length : 0

  const colorFor = (frame, idx) => {
    if (frame.sorted?.includes(idx)) return '#28c840'
    if (frame.swap?.includes(idx)) return '#ff6b6b'
    if (frame.compare?.includes(idx)) return t.accent
    if (frame.merge?.includes(idx)) return t.accent
    if (frame.pivot === idx) return t.navy
    return '#cfcabf'
  }

  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:44, fontWeight:700, marginBottom:26 }}>{title}</div>

      <div style={{ position:'relative', width: W, height: H + 90, margin:'0 auto' }}>
        {/* Every frame — including the starting array — is mutually exclusive,
            so a shorter bar in the active frame never lets a taller bar from
            a hidden frame poke out from underneath it. */}
        {frames.map((frame, fi) => (
          <div
            key={fi}
            className={`anim-fade-up frame d${fi + 1}`}
            style={{ position:'absolute', inset:0, opacity: fi === 0 ? 1 : undefined }}
          >
            <div style={{ display:'flex', alignItems:'flex-end', gap:barGap, height:H, background:'rgba(255,255,255,.04)', borderRadius:t.radiusMd, padding:'0 24px' }}>
              {frame.array.map((v, i) => (
                <div key={i} style={{ width:barW, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                  <div style={{ fontSize:20, fontWeight:700, color: colorFor(frame, i) }}>{v}</div>
                  <div style={{
                    width:'100%',
                    height: `${(v / maxVal) * (H - 90)}px`,
                    background: colorFor(frame, i),
                    borderRadius:'6px 6px 0 0',
                    transition:'none',
                    boxShadow: (frame.compare?.includes(i) || frame.swap?.includes(i)) ? `0 0 24px ${colorFor(frame, i)}` : 'none',
                  }} />
                  {frame.pivot === i && <div style={{ fontSize:17, color:t.navy, background:'#fff', borderRadius:6, padding:'2px 8px', marginTop:-4 }}>pivot</div>}
                </div>
              ))}
            </div>
            <div style={{ marginTop:22, fontSize:24, color:'#e8e4d8', textAlign:'center', minHeight:34 }}>
              <b style={{ color:t.accent }}>Step {fi + 1}/{frames.length}:</b> {frame.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
