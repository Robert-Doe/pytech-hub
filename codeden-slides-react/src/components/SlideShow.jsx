import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import { scanSteps, applyStep } from '../stepEngine.js'

const AUTOPLAY_KEY = 'codeden-autoplay'

export default function SlideShow({ slides, onExit, onEditSlide, onExportPdf, pdfBusy }) {
  const [index, setIndex] = useState(0)
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
  const [editing, setEditing] = useState(false)
  const [stepIndex, setStepIndex] = useState(1)
  const [maxStep, setMaxStep] = useState(1)
  const [autoPlay, setAutoPlay] = useState(() => {
    try { return localStorage.getItem(AUTOPLAY_KEY) === '1' } catch { return false }
  })
  const containerRef = useRef(null)
  const editableRef = useRef(null)
  const descriptorsRef = useRef([])
  // 'start' (default) lands a newly-entered slide unrevealed at step 1.
  // 'end' is a one-shot flag set by stepBack()'s rollover — landing on the
  // previous slide fully revealed feels like rewinding, not restarting it.
  const initStepModeRef = useRef('start')

  const slide = slides[index]

  const go = useCallback((n) => {
    setIndex(Math.max(0, Math.min(slides.length - 1, n)))
  }, [slides.length])

  const startEdit = useCallback(() => {
    if (!slide) return
    if (slide.customHtml == null) {
      const html = ReactDOMServer.renderToStaticMarkup(slide.element)
      onEditSlide?.(slide.uid, html)
    }
    setEditing(true)
  }, [slide, onEditSlide])

  const finishEdit = useCallback(() => {
    if (slide && editableRef.current) {
      onEditSlide?.(slide.uid, editableRef.current.innerHTML)
    }
    setEditing(false)
  }, [slide, onEditSlide])

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay((v) => {
      const next = !v
      try { localStorage.setItem(AUTOPLAY_KEY, next ? '1' : '0') } catch { /* ignore */ }
      return next
    })
  }, [])

  // ── Step engine: recompute the current slide's step map whenever the
  // slide changes or Auto-play is toggled. Nothing here fires on a timer —
  // step visibility only changes in response to an explicit action
  // (navigation, Ctrl+→/←, or the Reveal-all button).
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (autoPlay) {
      // Opt-in legacy mode: let every anim-* element play with its own
      // staggered CSS delay, exactly like a normal auto-playing deck.
      el.querySelectorAll('[class*="anim-"], .frame').forEach((node) => {
        node.style.opacity = ''
        node.style.pointerEvents = ''
        node.style.animation = 'none'
        // eslint-disable-next-line no-void
        void node.offsetWidth
        node.style.animation = ''
        delete node.dataset.stepRevealed
      })
      descriptorsRef.current = []
      setMaxStep(1)
      setStepIndex(1)
      return
    }

    const { descriptors, maxStep: m } = scanSteps(el)
    descriptorsRef.current = descriptors
    setMaxStep(m)
    if (initStepModeRef.current === 'end') {
      setStepIndex(m)
      initStepModeRef.current = 'start'
    } else {
      setStepIndex(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlay, editing])

  // Apply the current step's visibility. Runs after the scan above (same
  // render phase order) and again any time the presenter steps forward/back.
  useLayoutEffect(() => {
    if (autoPlay) return
    applyStep(descriptorsRef.current, stepIndex)
  }, [stepIndex, index, autoPlay, editing])

  // Ctrl+→ / Ctrl+← double as slide navigation once a slide runs out of
  // steps in that direction — no need to switch keys mid-flow. Rolling
  // forward always lands on the next slide fresh (step 1); rolling backward
  // lands on the previous slide fully revealed (see initStepModeRef above).
  const stepForward = useCallback(() => {
    if (stepIndex < maxStep) { setStepIndex((s) => s + 1); return }
    if (index < slides.length - 1) go(index + 1)
  }, [stepIndex, maxStep, index, slides.length, go])

  const stepBack = useCallback(() => {
    if (stepIndex > 1) { setStepIndex((s) => s - 1); return }
    if (index > 0) { initStepModeRef.current = 'end'; go(index - 1) }
  }, [stepIndex, index, go])

  const revealAll = useCallback(() => setStepIndex(maxStep), [maxStep])

  useEffect(() => {
    const handler = (e) => {
      if (editing) {
        if (e.key === 'Escape') { e.preventDefault(); finishEdit() }
        return // let every other key type normally into the editable slide
      }
      if (!autoPlay && e.ctrlKey && e.key === 'ArrowRight') { e.preventDefault(); stepForward(); return }
      if (!autoPlay && e.ctrlKey && e.key === 'ArrowLeft') { e.preventDefault(); stepBack(); return }
      if (e.ctrlKey) return // don't fall through to slide-nav on other Ctrl combos
      if (e.key === 'ArrowRight' || e.key === ' ') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
      if (e.key === 'Escape') onExit?.()
      if (e.key === 'f') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
      if (e.key === 'e' && onEditSlide) startEdit()
      if (e.key === 'a' && !autoPlay) revealAll()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, go, onExit, editing, finishEdit, startEdit, onEditSlide, autoPlay, stepForward, stepBack, revealAll])

  useEffect(() => {
    const resize = () => {
      const scaleX = window.innerWidth / 1920
      const scaleY = window.innerHeight / 1080
      setScale(Math.min(scaleX, scaleY))
    }
    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('fullscreenchange', resize)
    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('fullscreenchange', resize)
    }
  }, [])

  // Leaving edit mode when the slide changes (e.g. via the composer) should never
  // leave a stale contentEditable region behind.
  useEffect(() => { setEditing(false) }, [index])

  return (
    <div style={{ width:'100vw', height:'100vh', background:'#111', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      {/* Slide canvas */}
      <div style={{ transformOrigin:'center center', transform:`scale(${scale})`, position:'relative' }}>
        <div ref={containerRef} className="slide-wrapper" style={{ width:1920, height:1080, overflow:'hidden', position:'relative', outline: editing ? '6px dashed #f8a01a' : 'none', outlineOffset:-6 }}>
          {editing ? (
            <div
              key={slide.uid}
              ref={editableRef}
              contentEditable
              suppressContentEditableWarning
              style={{ width:1920, height:1080, cursor:'text' }}
              dangerouslySetInnerHTML={{ __html: slide.customHtml || '' }}
            />
          ) : slide?.customHtml != null ? (
            <div dangerouslySetInnerHTML={{ __html: slide.customHtml }} />
          ) : (
            slide?.element
          )}
        </div>
      </div>

      {/* Step indicator, top-right — only shown when a slide actually has manual steps */}
      {!autoPlay && !editing && maxStep > 1 && (
        <div style={{ position:'fixed', top:22, right:22, background:'rgba(0,0,0,.72)', backdropFilter:'blur(6px)', color:'#fff', fontFamily:"'Open Sans',sans-serif", fontSize:14, padding:'10px 18px', borderRadius:999, display:'flex', alignItems:'center', gap:12, border:'1px solid rgba(255,153,0,.4)' }}>
          <span style={{ color:'#9d9781' }}>Reveal</span>
          <span style={{ fontWeight:700, color:'#f8a01a' }}>{stepIndex} / {maxStep}</span>
          <span style={{ color:'#5c5646' }}>·</span>
          <span style={{ color:'#9d9781' }}>Ctrl+→/←</span>
        </div>
      )}

      {/* Nav bar */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, background:'rgba(0,0,0,.7)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 28px', fontFamily:"'Open Sans',sans-serif", color:'#fff', fontSize:14, flexWrap:'wrap', gap:8 }}>
        <button onClick={onExit} disabled={editing} style={btnStyle('#f8a01a', editing)}>← Back to Composer</button>
        <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
          <button onClick={() => go(index-1)} disabled={editing || index===0} style={btnStyle('#333', editing)}>◀ Prev slide</button>
          {!autoPlay && (
            <>
              <button onClick={stepBack} disabled={editing || (stepIndex<=1 && index===0)} style={btnStyle('#3a2f12', editing || (stepIndex<=1 && index===0))} title="Ctrl+← — rolls to the previous slide once this one has nothing left to un-reveal">⟲ Step back</button>
              <button onClick={stepForward} disabled={editing || (stepIndex>=maxStep && index===slides.length-1)} style={btnStyle('#3a2f12', editing || (stepIndex>=maxStep && index===slides.length-1))} title="Ctrl+→ — rolls to the next slide once this one is fully revealed">Step ▸</button>
              {maxStep > 1 && <button onClick={revealAll} disabled={editing || stepIndex>=maxStep} style={btnStyle('#333', editing)} title="A">Reveal all</button>}
            </>
          )}
          <span style={{ minWidth:140, textAlign:'center' }}>{slide?.name} &nbsp;·&nbsp; {index+1} / {slides.length}</span>
          <button onClick={() => go(index+1)} disabled={editing || index===slides.length-1} style={btnStyle('#333', editing)}>Next slide ▶</button>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', justifyContent:'flex-end' }}>
          <button
            onClick={toggleAutoPlay}
            disabled={editing}
            title="When off (default), nothing animates until you press Ctrl+→"
            style={btnStyle(autoPlay ? '#28c840' : '#333', editing)}>
            {autoPlay ? '▶ Auto-play: On' : '⏸ Auto-play: Off'}
          </button>
          {onExportPdf && (
            <button onClick={onExportPdf} disabled={pdfBusy} style={btnStyle(pdfBusy ? '#5c5646' : '#a9a3ff', pdfBusy)}>
              {pdfBusy ? 'Building PDF…' : '⬇ Export PDF'}
            </button>
          )}
          {onEditSlide && (
            editing
              ? <button onClick={finishEdit} style={btnStyle('#f8a01a')}>✓ Done editing</button>
              : <button onClick={startEdit} style={btnStyle('#333')}>✎ Edit slide</button>
          )}
          <span style={{ color:'#888', fontSize:12 }}>{editing ? 'ESC = save & stop' : 'Ctrl+→/← step (rolls to next/prev slide at the end) · →/← slide · A = reveal all · F = fullscreen · E = edit'}</span>
        </div>
      </div>
    </div>
  )
}

const btnStyle = (bg, disabled) => ({
  background: bg, border:'none', color:'#fff', padding:'7px 18px',
  borderRadius:8, cursor: disabled ? 'default' : 'pointer', fontFamily:"'Open Sans',sans-serif", fontSize:13,
  opacity: disabled ? 0.4 : 1,
})
