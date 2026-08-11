import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'

// A deliberately different look from every student-facing slide — a
// "backstage" card so it's unmistakable at a glance during a live class
// that this one is for the instructor's eyes, not the students'. Pulled
// straight from the PyTech Hub Instructor Manual's own guidance (pacing,
// the deliberate-bug technique, catching gaps without losing the room).
export function InstructorNotesSlide({
  title = 'Pacing note',
  timing = null,
  points = [
    { label: 'Watch for', text: "Students confusing '=' (store) with '==' (ask) — the manual's #1 predicted stumble." },
    { label: 'If it hasn\'t landed', text: 'Add a lettered example (e.g. 3b) with the same structure, not a repeat of the original.' },
    { label: 'Manual ref', text: 'The Deliberate Bug — plant one, announce it, fix it together.' },
  ],
}) {
  return (
    <div style={{ ...slideBase, background:'repeating-linear-gradient(135deg,#1a1600,#1a1600 40px,#211c04 40px,#211c04 80px)', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={{ ...topBar('#a9a3ff') }} />
      <div className="anim-fade-up" style={{ display:'flex', alignItems:'center', gap:18, marginBottom:34 }}>
        <span style={{ background:'#a9a3ff', color:t.navy, padding:'10px 26px', borderRadius:8, fontWeight:700, fontSize:19, letterSpacing:2 }}>🎙 INSTRUCTOR NOTES</span>
        <span style={{ color:'#9d9781', fontSize:19 }}>Not shown to students — skip this slide when presenting live, or read it beforehand</span>
        {timing && <span style={{ marginLeft:'auto', color:'#a9a3ff', fontFamily:t.fontMono, fontSize:19 }}>⏱ {timing}</span>}
      </div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:46, fontWeight:700, marginBottom:40, borderLeft:'6px solid #a9a3ff', paddingLeft:28 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1500 }}>
        {points.map((p, i) => (
          <div key={i} className={`anim-fade-left d${i + 3}`} style={{ background:'rgba(169,163,255,.08)', border:'1px solid rgba(169,163,255,.3)', borderRadius:t.radiusMd, padding:'22px 30px', fontSize:24, lineHeight:1.5 }}>
            <b style={{ color:'#a9a3ff' }}>{p.label}:</b> {p.text}
          </div>
        ))}
      </div>
    </div>
  )
}
