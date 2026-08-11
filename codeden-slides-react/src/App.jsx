import React, { useState, useEffect } from 'react'
import SlideShow from './components/SlideShow.jsx'
import DeckComposer from './components/DeckComposer.jsx'
import PdfExport from './components/PdfExport.jsx'
import { lesson43Deck } from './decks/lesson43Deck.jsx'
import { loadDeck, saveDeck, withUids } from './storage.js'

export default function App() {
  const [deck, setDeck] = useState(() => {
    const saved = loadDeck()
    return saved && saved.length ? saved : withUids(lesson43Deck)
  })
  const [mode, setMode] = useState('composer') // 'composer' | 'present'
  const [pdfExporting, setPdfExporting] = useState(false)

  useEffect(() => { saveDeck(deck) }, [deck])

  const updateSlideHtml = (uid, html) => {
    setDeck(d => d.map(s => (s.uid === uid ? { ...s, customHtml: html } : s)))
  }

  const handleExportPdf = () => {
    if (pdfExporting || deck.length === 0) return
    setPdfExporting(true)
  }

  const pdfLayer = pdfExporting && (
    <PdfExport slides={deck} onDone={() => setPdfExporting(false)} />
  )

  if (mode === 'present' && deck.length > 0) {
    return (
      <>
        <SlideShow
          slides={deck}
          onEditSlide={updateSlideHtml}
          onExit={() => setMode('composer')}
          onExportPdf={handleExportPdf}
          pdfBusy={pdfExporting}
        />
        {pdfLayer}
      </>
    )
  }

  return (
    <>
      <DeckComposer
        deck={deck}
        setDeck={setDeck}
        onPresent={() => deck.length > 0 && setMode('present')}
        onExportPdf={handleExportPdf}
        pdfBusy={pdfExporting}
      />
      {pdfLayer}
    </>
  )
}
