import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { scanSteps, bakeStep } from '../stepEngine.js'

// Renders the ENTIRE deck as static, full-bleed pages — one page per manual
// reveal step, in presentation order — then hands off to the browser's own
// print pipeline (window.print → "Save as PDF"). No rasterization library:
// this reuses the exact same DOM/CSS the live deck already renders with, so
// gradients, shadows, fonts and SVG diagrams all come out crisp, not blurry
// PNG captures. Only the baked pages are visible to print; every composer/
// presenter control is stripped out by the print media query.
//
// Two passes:
//   1. "measuring" — mount one hidden copy of every slide, scan how many
//      manual steps each one has (scanSteps — the same logic SlideShow uses).
//   2. "ready" — render exactly that many static, pre-baked copies of each
//      slide (one per step) as print pages, then trigger window.print().

function PdfPage({ slide, step, totalSteps, pageLabel }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const { descriptors } = scanSteps(ref.current)
    bakeStep(descriptors, step)
  }, [step])

  return (
    <div className="pdf-page">
      <div ref={ref} style={{ width: 1920, height: 1080, position: 'absolute', inset: 0 }}>
        {slide.customHtml != null
          ? <div dangerouslySetInnerHTML={{ __html: slide.customHtml }} />
          : slide.element}
      </div>
      {totalSteps > 1 && (
        <div style={{ position: 'absolute', bottom: 16, right: 22, fontFamily: "'Roboto Mono',monospace", fontSize: 13, color: 'rgba(255,255,255,.55)', textShadow: '0 1px 2px rgba(0,0,0,.8)' }}>
          {pageLabel} · step {step}/{totalSteps}
        </div>
      )}
    </div>
  )
}

export default function PdfExport({ slides, onDone }) {
  const [phase, setPhase] = useState('measuring') // measuring -> ready -> (print dialog) -> done
  const [stepCounts, setStepCounts] = useState(null)
  const measureRefs = useRef([])

  useEffect(() => {
    if (phase !== 'measuring') return
    const counts = slides.map((_, i) => {
      const el = measureRefs.current[i]
      const { maxStep } = scanSteps(el)
      return maxStep
    })
    setStepCounts(counts)
    setPhase('ready')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'ready') return
    // A short timer (not requestAnimationFrame — rAF can be throttled or
    // paused entirely in a backgrounded/non-composited tab) gives the
    // browser time to lay out every baked page before print captures them.
    const id = setTimeout(() => window.print(), 120)
    return () => clearTimeout(id)
  }, [phase])

  useEffect(() => {
    const handler = () => onDone?.()
    window.addEventListener('afterprint', handler)
    return () => window.removeEventListener('afterprint', handler)
  }, [onDone])

  const content = (
    <div className="pdf-export-root">
      {phase === 'measuring' && slides.map((s, i) => (
        <div key={s.uid} ref={(el) => { measureRefs.current[i] = el }} style={{ width: 1920, height: 1080 }}>
          {s.customHtml != null ? <div dangerouslySetInnerHTML={{ __html: s.customHtml }} /> : s.element}
        </div>
      ))}
      {phase === 'ready' && stepCounts && slides.flatMap((s, si) => {
        const n = stepCounts[si] || 1
        return Array.from({ length: n }, (_, k) => (
          <PdfPage key={`${s.uid}-${k}`} slide={s} step={k + 1} totalSteps={n} pageLabel={`${si + 1}. ${s.name}`} />
        ))
      })}
    </div>
  )

  return createPortal(content, document.body)
}
