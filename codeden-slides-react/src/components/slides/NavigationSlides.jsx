import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function SectionDividerSlide({ moduleNum='02', title='Pseudocode: Writing Before Coding', meta='Module 02 · 5 lessons', bg=t.accent }) {
  const dark = bg===t.accent
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 140px', fontFamily:t.fontDisplay, color: dark?t.ink:'#fff' }}>
      <div style={topBar(dark?t.ink:t.accent)} />
      <div className="anim-fade-up" style={{ fontSize:32, fontWeight:700, marginBottom:18, color: dark?'#fff':t.accent }}>{moduleNum}</div>
      <div className="anim-fade-up d2" style={{ fontSize:76, fontWeight:700, maxWidth:1300, lineHeight:1.1 }}>{title}</div>
      <div className="anim-fade-up d4" style={{ fontFamily:t.fontBody, fontSize:26, marginTop:24, color: dark?'#5c3c00':'#cfcabf' }}>{meta}</div>
    </div>
  )
}

export function ChapterOpenerSlide({ chapterNum='3', chapterLabel='Chapter Three', chapterTitle='The Chef Learns to Choose', subtitle='In which our obedient chef stops asking us about every little thing — and starts checking the pantry himself.' }) {
  return (
    <div style={{ ...slideBase, background:'#fdfaf3', display:'flex', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <div className="anim-fade-left" style={{ width:'46%', background:t.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff' }}>
        <div className="anim-pop d2" style={{ fontFamily:t.fontDisplay, fontSize:200, fontWeight:700, color:t.accent, lineHeight:1 }}>{chapterNum}</div>
        <div style={{ fontSize:22, letterSpacing:5, textTransform:'uppercase', color:'#cfcabf', marginTop:20 }}>{chapterLabel}</div>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 110px' }}>
        <img src={logoDark} style={{ height:36, position:'absolute', top:40, right:64 }} alt="" />
        <div className="anim-fade-up d3" style={{ fontFamily:t.fontDisplay, fontSize:72, fontWeight:700, lineHeight:1.1 }}>{chapterTitle}</div>
        <div style={{ width:110, height:6, background:t.accent, borderRadius:3, margin:'34px 0' }} className="anim-grow d5" />
        <div className="anim-fade-up d6" style={{ fontSize:28, color:t.gray700, lineHeight:1.6, maxWidth:640, fontStyle:'italic' }}>{subtitle}</div>
      </div>
    </div>
  )
}

export function ChapterEndSlide({ chapterLabel='— The end of Chapter Three —', closing='The chef can now choose. But he still can\'t count.', teaser='Chapter Four: Loops — turn the page →', bg='#fdfaf3' }) {
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontDisplay, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:26, letterSpacing:4, textTransform:'uppercase', color:t.gray700, fontFamily:t.fontBody, marginBottom:30 }}>{chapterLabel}</div>
      <div className="anim-fade-up d2" style={{ fontSize:58, fontWeight:700, textAlign:'center', maxWidth:1250, lineHeight:1.25 }}>{closing}</div>
      <div className="anim-fade-up d4" style={{ fontFamily:t.fontBody, fontSize:26, color:t.accent, fontWeight:600, marginTop:44 }}>{teaser}</div>
    </div>
  )
}

export function CheckpointSlide({ title="You're halfway through", module='Module 02', totalSteps=5, currentStep=3 }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:24 }}>Checkpoint</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:60, fontWeight:700, color:t.ink, marginBottom:64 }}>{title} {module}</div>
      <div className="anim-fade-up d3" style={{ display:'flex', alignItems:'center', gap:20 }}>
        {Array.from({length:totalSteps}).map((_,i) => (
          <React.Fragment key={i}>
            <div style={{ width: i===currentStep-1?76:64, height: i===currentStep-1?76:64, borderRadius:'50%', background: i<currentStep?t.accent: i===currentStep-1?t.navy:'transparent', border: i>=currentStep?`4px solid ${t.gray300}`:'' , color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:24, boxShadow: i===currentStep-1?`0 0 0 10px rgba(14,0,78,.12)`:'' }}>
              {i < currentStep-1 ? '✓' : i+1}
            </div>
            {i<totalSteps-1 && <div style={{ width:130, height:8, background: i<currentStep-1?t.accent:t.gray300, borderRadius:4 }} />}
          </React.Fragment>
        ))}
      </div>
      <div className="anim-fade-up d6" style={{ fontSize:25, color:t.gray700, marginTop:56 }}>Lessons {currentStep-1} and {currentStep-2||1} done. Take a breath — then lesson {currentStep}.</div>
    </div>
  )
}

export function AgendaSlide({ title='In this module', module='Module 02', lessons=[{num:'Lesson 1',title:'Why pseudocode exists'},{num:'Lesson 2',title:'SET, DISPLAY and INPUT'},{num:'Lesson 3',title:'Decisions with IF / ELSE'},{num:'Lesson 4',title:'Repeating with WHILE'}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div style={{ position:'absolute', top:46, right:64, fontSize:16, color:t.gray700 }}>{module}</div>
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:52 }}>{title}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:1500 }}>
        {lessons.map((l,i) => (
          <div key={i} className={`anim-fade-up d${i+2}`} style={{ background:t.gray100, borderRadius:t.radiusMd, padding:'32px 38px' }}>
            <div style={{ color:t.accent, fontWeight:700, fontSize:22, marginBottom:8 }}>{l.num}</div>
            <div style={{ fontWeight:700, fontSize:28 }}>{l.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ModuleTableSlide({ title='This course at a glance', modules=[{num:'01',title:'Getting started: learn to program',lessons:4,free:true},{num:'02',title:'Variables and data manipulation',lessons:6,free:true},{num:'03',title:'Operators in programming',lessons:5,free:true},{num:'04',title:'Control structures: sequence & loops',lessons:7,free:true}] }) {
  return (
    <div style={{ ...slideBase, background:t.navy, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, marginBottom:44 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:16, fontSize:27 }}>
        {modules.map((m,i) => (
          <div key={i} className={`anim-fade-left d${i+2}`} style={{ display:'grid', gridTemplateColumns:'110px 1fr 220px 180px', gap:20, alignItems:'center', background:'rgba(255,255,255,.07)', borderRadius:t.radiusMd, padding:'22px 34px' }}>
            <span style={{ color:t.accent, fontWeight:700 }}>{m.num}</span>
            <span>{m.title}</span>
            <span style={{ color:'#a9a3ff' }}>{m.lessons} lessons</span>
            <span style={{ color:t.accent, fontWeight:600 }}>{m.free?'✓ Free':''}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StorySoFarSlide({ title='The story so far', chapters=[{label:'Chapter 1',text:'You met the obedient chef — and wrote your first recipe.',done:true},{label:'Chapter 2',text:'You gave the kitchen memory: jars with labels.',done:true},{label:'Chapter 3 — now',text:'The chef learns to make decisions on his own.',done:false},{label:'Chapter 4',text:'Doing it a thousand times without getting tired.',done:false,future:true}] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, marginBottom:70 }}>{title}</div>
      <div style={{ display:'flex', alignItems:'flex-start' }}>
        {chapters.map((ch,i) => (
          <div key={i} className={`anim-fade-up d${i*2+2}`} style={{ flex:1, paddingRight:40, opacity: ch.future?.55:1 }}>
            <div style={{ height:6, background: ch.done?t.accent:ch.future?'rgba(255,255,255,.12)':'rgba(255,255,255,.25)', borderRadius:3, marginBottom:30 }} />
            <div style={{ fontWeight:700, fontSize:27, color: ch.done?t.accent:ch.future?'#7d7660':'#fff', marginBottom:10 }}>{ch.label}</div>
            <div style={{ fontSize:24, color: ch.done||!ch.future?'#cfcabf':'#7d7660' }}>{ch.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
