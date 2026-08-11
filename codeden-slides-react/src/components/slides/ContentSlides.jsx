import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function BigQuoteSlide({ quote="It asks not for talent; it demands your attention.", attribution="— Programming for Shy People", bg=t.ink }) {
  const dark = bg === t.ink || bg === t.navy
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 200px', fontFamily:t.fontDisplay, color: dark?'#fff':t.ink }}>
      <div style={topBar()} />
      <img src={dark?logo:logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-pop" style={{ fontSize:140, lineHeight:1, fontWeight:700, color:t.accent }}>"</div>
      <div className="anim-fade-up d2" style={{ fontSize:52, fontWeight:700, textAlign:'center', maxWidth:1300, lineHeight:1.25, marginTop:8 }}>{quote}</div>
      <div className="anim-fade-up d4" style={{ fontFamily:t.fontBody, fontSize:24, marginTop:36, color: dark?'#cfcabf':t.gray700 }}>{attribution}</div>
    </div>
  )
}

export function TwoColumnTextSlide({ title="Two ways people learn to code", left={heading:'The loud way', color:t.accent, text:"Bootcamps, deadlines, public code reviews, and the constant feeling of being behind. It works for some — and quietly filters out everyone else."}, right={heading:'The quiet way', color:t.navy, text:"Self-paced stories, private practice, and logic before syntax. Nobody watching over your shoulder. This is the way CodeDen teaches."} }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:48 }}>{title}</div>
      <div style={{ display:'flex', gap:80, fontSize:27, lineHeight:1.6 }}>
        <div className="anim-fade-left d2" style={{ flex:1 }}>
          <div style={{ fontWeight:700, color:left.color, fontSize:30, marginBottom:16 }}>{left.heading}</div>
          {left.text}
        </div>
        <div className="anim-fade-right d3" style={{ flex:1 }}>
          <div style={{ fontWeight:700, color:right.color, fontSize:30, marginBottom:16 }}>{right.heading}</div>
          {right.text}
        </div>
      </div>
    </div>
  )
}

export function DefinitionSlide({ word="Algorithm", phonetic="/ˈal-gə-ˌri-thəm/ · noun", definition="A finite sequence of well-defined steps that solves a problem — a recipe the computer can follow exactly." }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ background:t.gray100, borderLeft:`10px solid ${t.accent}`, borderRadius:t.radiusMd, padding:'70px 90px', maxWidth:1300 }}>
        <div style={{ fontFamily:t.fontMono, fontSize:24, color:t.accent, marginBottom:16 }}>{phonetic}</div>
        <div style={{ fontFamily:t.fontDisplay, fontSize:66, fontWeight:700, color:t.ink, marginBottom:24 }}>{word}</div>
        <div style={{ fontSize:32, lineHeight:1.5, color:t.gray700 }}>{definition}</div>
      </div>
    </div>
  )
}

export function ImageFullBleedSlide({ image='/assets/imagery/hero-developer.jpg', eyebrow='Why this matters', title='Code is a career you can start from anywhere.', overlay='linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.8))' }) {
  return (
    <div style={{ ...slideBase, background:`${overlay}, url('${image}') center/cover`, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 0 120px 120px', fontFamily:t.fontDisplay, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:44, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontFamily:t.fontBody, fontWeight:700, marginBottom:20 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontSize:80, fontWeight:700, lineHeight:1.1, maxWidth:1200 }}>{title}</div>
    </div>
  )
}

export function ImageRightSlide({ image='/assets/imagery/hero-developer.jpg', eyebrow='Module 01 · Lesson 04', title='Learning happens one quiet step at a time', subtitle='No pressure, no judgment, no prerequisites. Each lesson builds on the last — at whatever pace suits you.' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <div style={{ flex:1.1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 90px 0 120px' }}>
        <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
        <div style={{ position:'absolute', top:46, right:'45%', marginRight:20, fontSize:16, color:t.gray700 }}>{eyebrow}</div>
        <div className="anim-fade-left" style={{ fontFamily:t.fontDisplay, fontSize:58, fontWeight:700, color:t.ink, lineHeight:1.1 }}>{title}</div>
        <div className="anim-fade-left d2" style={{ fontSize:28, color:t.gray700, lineHeight:1.5, marginTop:28, maxWidth:680 }}>{subtitle}</div>
      </div>
      <div className="anim-fade-right d2" style={{ width:'45%', objectFit:'cover', flexShrink:0 }}>
        <img src={image} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="" />
      </div>
    </div>
  )
}

export function ImageLeftBulletsSlide({ image='/assets/imagery/hero-developer.jpg', title="What you'll need", bullets=["A computer — any computer","30 minutes a day","Zero prior experience"] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <div className="anim-fade-left" style={{ width:'42%', flexShrink:0 }}>
        <img src={image} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="" />
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 120px 0 90px' }}>
        <img src={logoDark} style={{ height:36, position:'absolute', top:40, right:64 }} alt="" />
        <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink, marginBottom:40 }}>{title}</div>
        {bullets.map((b,i) => (
          <div key={i} className={`anim-fade-right d${i*2+3}`} style={{ display:'flex', gap:18, fontSize:29, marginBottom:24 }}>
            <span style={{ color:t.accent, fontWeight:700 }}>✓</span>{b}
          </div>
        ))}
      </div>
    </div>
  )
}

export function BookFeatureSlide({ image='/assets/imagery/book-programming-for-shy-people.png', eyebrow='Go deeper', title='Programming for Shy People', desc='Everything in this course, in book form — logic-driven, story-based, and free of syntax dumps. Join the waitlist at CodeDen.org.' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, display:'flex', alignItems:'center', justifyContent:'center', gap:120, fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:44, left:64 }} alt="" />
      <img className="anim-fade-left" src={image} style={{ width:420, borderRadius:t.radiusMd, boxShadow:'0 30px 60px rgba(0,0,0,.5)' }} alt="" />
      <div style={{ maxWidth:760 }}>
        <div className="anim-fade-up d2" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:20 }}>{eyebrow}</div>
        <div className="anim-fade-up d3" style={{ fontFamily:t.fontDisplay, fontSize:62, fontWeight:700, lineHeight:1.1 }}>{title}</div>
        <div className="anim-fade-up d5" style={{ fontSize:26, color:'#cfcabf', lineHeight:1.5, marginTop:26 }}>{desc}</div>
      </div>
    </div>
  )
}
