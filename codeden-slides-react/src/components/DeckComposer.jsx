import React, { useState, useMemo, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import { ALL_SLIDES } from './slides/index.js'
import { makeUid } from '../storage.js'

const GROUPS = [...new Set(ALL_SLIDES.map(s => s.group))]
const accent = '#f8a01a'
const ink = '#1a1600'
const navy = '#0e004e'

export default function DeckComposer({ deck, setDeck, onPresent, onExportPdf, pdfBusy }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [preview, setPreview] = useState(null)
  const [editingPreview, setEditingPreview] = useState(false)
  const previewRef = useRef(null)

  const filtered = useMemo(() => ALL_SLIDES.filter(s => {
    const matchGroup = filter === 'All' || s.group === filter
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    return matchGroup && matchSearch
  }), [filter, search])

  const inDeck = (id) => deck.some(s => s.id === id)

  const toggle = (slide) => {
    if (inDeck(slide.id)) setDeck(d => d.filter(s => s.id !== slide.id))
    else setDeck(d => [...d, { ...slide, uid: makeUid(slide.id), customHtml: null }])
  }

  const moveUp = (i) => { if (i === 0) return; const d = [...deck]; [d[i-1],d[i]]=[d[i],d[i-1]]; setDeck(d) }
  const moveDown = (i) => { if (i === deck.length-1) return; const d=[...deck]; [d[i],d[i+1]]=[d[i+1],d[i]]; setDeck(d) }
  const remove = (i) => setDeck(d => d.filter((_,j) => j !== i))

  const updateSlideHtml = (uid, html) => {
    setDeck(d => d.map(s => (s.uid === uid ? { ...s, customHtml: html } : s)))
  }

  const startEditPreview = () => {
    if (!preview) return
    if (preview.customHtml == null) {
      const html = ReactDOMServer.renderToStaticMarkup(preview.element)
      updateSlideHtml(preview.uid, html)
      setPreview(p => ({ ...p, customHtml: html }))
    }
    setEditingPreview(true)
  }
  const finishEditPreview = () => {
    if (!preview) return
    const html = previewRef.current ? previewRef.current.innerHTML : preview.customHtml
    updateSlideHtml(preview.uid, html)
    setPreview(p => (p ? { ...p, customHtml: html } : p))
    setEditingPreview(false)
  }
  const resetPreview = () => {
    if (!preview) return
    updateSlideHtml(preview.uid, null)
    setPreview(p => (p ? { ...p, customHtml: null } : p))
  }
  const closePreview = () => {
    if (editingPreview) finishEditPreview()
    setEditingPreview(false)
    setPreview(null)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0f0e0a', fontFamily:"'Open Sans',sans-serif", color:'#fff', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ background:ink, borderBottom:`3px solid ${accent}`, padding:'18px 36px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <img src="/assets/logo-lockup.png" style={{ height:36 }} alt="CodeDen" />
          <span style={{ color:'#9d9781', fontSize:15, marginLeft:8 }}>Slide Composer</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <span style={{ color:'#9d9781', fontSize:14 }}>{deck.length} slides selected</span>
          {onExportPdf && (
            <button
              onClick={onExportPdf}
              disabled={pdfBusy || deck.length === 0}
              title="Bakes every slide + every manual reveal step into full-bleed pages, then opens the browser's print dialog — choose 'Save as PDF'"
              style={{ background:'#2a2617', color: pdfBusy ? '#5c5646' : '#a9a3ff', border:'1px solid #a9a3ff55', padding:'10px 22px', borderRadius:999, fontFamily:"'Open Sans',sans-serif", fontWeight:700, fontSize:14, cursor: (pdfBusy || deck.length === 0) ? 'default' : 'pointer' }}>
              {pdfBusy ? 'Building PDF…' : '⬇ Export PDF'}
            </button>
          )}
          <button
            onClick={onPresent}
            disabled={deck.length === 0}
            style={{ background: deck.length > 0 ? accent : '#444', color:'#fff', border:'none', padding:'10px 28px', borderRadius:999, fontFamily:"'Open Sans',sans-serif", fontWeight:700, fontSize:15, cursor: deck.length > 0 ? 'pointer' : 'not-allowed' }}>
            ▶ Present Deck ({deck.length})
          </button>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, minHeight:0 }}>
        {/* LEFT: Slide library */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', borderRight:'2px solid #2a2617' }}>
          {/* Filters */}
          <div style={{ padding:'16px 24px', background:'#1a1600', display:'flex', flexDirection:'column', gap:12 }}>
            <input
              placeholder="Search slides…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background:'#2a2617', border:'none', borderRadius:8, color:'#fff', padding:'9px 16px', fontSize:14, fontFamily:"'Open Sans',sans-serif", width:'100%', boxSizing:'border-box', outline:'none' }}
            />
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['All', ...GROUPS].map(g => (
                <button key={g} onClick={() => setFilter(g)}
                  style={{ background: filter===g ? accent : '#2a2617', color: filter===g ? ink : '#cfcabf', border:'none', borderRadius:999, padding:'5px 16px', fontSize:13, cursor:'pointer', fontFamily:"'Open Sans',sans-serif", fontWeight: filter===g ? 700 : 400 }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:16, alignContent:'start' }}>
            {filtered.map(slide => (
              <div key={slide.id}
                style={{ background: inDeck(slide.id) ? '#2a2617' : '#1a1600', border:`2px solid ${inDeck(slide.id) ? accent : '#35301f'}`, borderRadius:12, overflow:'hidden', cursor:'pointer', transition:'border-color .2s' }}
                onClick={() => toggle(slide)}>
                {/* Mini preview */}
                <div
                  style={{ width:'100%', aspectRatio:'16/9', overflow:'hidden', position:'relative', background:'#111', cursor:'pointer' }}
                  onClick={e => { e.stopPropagation(); setPreview(slide) }}>
                  <div style={{ position:'absolute', inset:0, transformOrigin:'top left', transform:`scale(${260/1920})`, width:1920, height:1080, pointerEvents:'none' }}>
                    {slide.element}
                  </div>
                  <div style={{ position:'absolute', bottom:4, right:6, background:'rgba(0,0,0,.6)', color:'#fff', fontSize:10, padding:'2px 7px', borderRadius:4 }}>👁 preview</div>
                </div>
                <div style={{ padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{slide.name}</div>
                    <div style={{ color:'#9d9781', fontSize:11, marginTop:2 }}>{slide.group}</div>
                  </div>
                  <div style={{ width:26, height:26, borderRadius:999, background: inDeck(slide.id) ? accent : '#2a2617', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>
                    {inDeck(slide.id) ? '✓' : '+'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Deck order */}
        <div style={{ width:320, background:'#1a1600', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'16px 20px', borderBottom:'2px solid #2a2617', fontWeight:700, fontSize:14, color:accent }}>
            YOUR DECK — {deck.length} slides
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'12px 16px', display:'flex', flexDirection:'column', gap:8 }}>
            {deck.length === 0 && (
              <div style={{ color:'#5c5646', textAlign:'center', marginTop:40, fontSize:14 }}>
                Click slides on the left<br/>to add them here
              </div>
            )}
            {deck.map((slide, i) => (
              <div key={slide.uid} style={{ background:'#2a2617', borderRadius:8, padding:'8px 12px', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:'#5c5646', fontSize:12, width:20, flexShrink:0 }}>{i+1}</span>
                <span style={{ flex:1, fontSize:13, color:'#e8e4d8', cursor:'pointer' }} onClick={() => setPreview(slide)}>
                  {slide.name}{slide.customHtml != null && <span style={{ color:accent }} title="Edited"> •</span>}
                </span>
                <button onClick={() => setPreview(slide)} style={smallBtn} title="Edit text">✎</button>
                <button onClick={() => moveUp(i)} style={smallBtn}>↑</button>
                <button onClick={() => moveDown(i)} style={smallBtn}>↓</button>
                <button onClick={() => remove(i)} style={{ ...smallBtn, color:'#ff6b6b' }}>✕</button>
              </div>
            ))}
          </div>
          {deck.length > 0 && (
            <div style={{ padding:'12px 16px', borderTop:'2px solid #2a2617', display:'flex', gap:8 }}>
              <button onClick={() => setDeck([])} style={{ flex:1, background:'#2a2617', border:'none', color:'#9d9781', borderRadius:8, padding:'8px', cursor:'pointer', fontSize:12, fontFamily:"'Open Sans',sans-serif" }}>Clear all</button>
              <button onClick={onPresent} style={{ flex:2, background:accent, border:'none', color:ink, borderRadius:8, padding:'8px', cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:"'Open Sans',sans-serif" }}>▶ Present</button>
            </div>
          )}
        </div>
      </div>

      {/* Full preview modal */}
      {preview && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={closePreview}>
          <div style={{ position:'relative', width:'80vw' }} onClick={e => e.stopPropagation()}>
            <div style={{ aspectRatio:'16/9', overflow:'hidden', position:'relative', background:'#111', borderRadius:12, outline: editingPreview ? `3px dashed ${accent}` : 'none', outlineOffset:-3 }}>
              {editingPreview ? (
                <div
                  key={preview.uid}
                  ref={previewRef}
                  contentEditable
                  suppressContentEditableWarning
                  style={{ position:'absolute', inset:0, transformOrigin:'top left', transform:`scale(${window.innerWidth*.8/1920})`, width:1920, height:1080, cursor:'text' }}
                  dangerouslySetInnerHTML={{ __html: preview.customHtml || '' }}
                />
              ) : (
                <div style={{ position:'absolute', inset:0, transformOrigin:'top left', transform:`scale(${window.innerWidth*.8/1920})`, width:1920, height:1080 }}>
                  {preview.customHtml != null
                    ? <div dangerouslySetInnerHTML={{ __html: preview.customHtml }} />
                    : preview.element}
                </div>
              )}
            </div>
            {editingPreview && (
              <div style={{ color:'#9d9781', fontSize:12, marginTop:8 }}>Click any text and type to edit. Click "Done editing" to save.</div>
            )}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14 }}>
              <span style={{ fontWeight:700, fontSize:16 }}>{preview.name} <span style={{ color:'#9d9781', fontWeight:400, fontSize:13 }}>· {preview.group}</span></span>
              <div style={{ display:'flex', gap:10 }}>
                {preview.uid && !editingPreview && (
                  <button onClick={startEditPreview} style={{ background:'#2a2617', border:`1px solid ${accent}`, color:accent, padding:'9px 20px', borderRadius:999, cursor:'pointer', fontFamily:"'Open Sans',sans-serif", fontWeight:700 }}>✎ Edit text</button>
                )}
                {preview.uid && editingPreview && (
                  <button onClick={finishEditPreview} style={{ background:accent, border:'none', color:ink, padding:'9px 20px', borderRadius:999, cursor:'pointer', fontFamily:"'Open Sans',sans-serif", fontWeight:700 }}>✓ Done editing</button>
                )}
                {preview.uid && preview.customHtml != null && !editingPreview && (
                  <button onClick={resetPreview} style={{ background:'#2a2617', border:'none', color:'#9d9781', padding:'9px 18px', borderRadius:999, cursor:'pointer', fontFamily:"'Open Sans',sans-serif" }}>↺ Reset to default</button>
                )}
                {!editingPreview && (
                  <button onClick={() => { toggle(preview); closePreview() }} style={{ background: inDeck(preview.id) ? '#444' : accent, border:'none', color:'#fff', padding:'9px 22px', borderRadius:999, cursor:'pointer', fontFamily:"'Open Sans',sans-serif", fontWeight:700 }}>
                    {inDeck(preview.id) ? 'Remove from Deck' : '+ Add to Deck'}
                  </button>
                )}
                <button onClick={closePreview} style={{ background:'#2a2617', border:'none', color:'#fff', padding:'9px 18px', borderRadius:999, cursor:'pointer', fontFamily:"'Open Sans',sans-serif" }}>{editingPreview ? 'Done' : 'Close'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const smallBtn = { background:'#35301f', border:'none', color:'#cfcabf', width:22, height:22, borderRadius:4, cursor:'pointer', fontSize:12, padding:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Open Sans',sans-serif" }
