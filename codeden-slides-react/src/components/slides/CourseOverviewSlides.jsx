import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function WhatYoullLearnSlide({ title="What you'll walk away with", outcomes=["Read and write real Python — not just copy it","Break any problem into steps a computer can follow","Debug calmly — errors become information, not panic","Finish a small project you actually built yourself"] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:48 }}>{title}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, maxWidth:1560, fontSize:26 }}>
        {outcomes.map((o,i) => (
          <div key={i} className={`anim-fade-up d${i+2}`} style={{ display:'flex', gap:18, alignItems:'flex-start', background:t.gray100, borderRadius:t.radiusMd, padding:'28px 34px' }}>
            <span style={{ color:t.accent, fontWeight:700, fontSize:28 }}>✓</span>{o}
          </div>
        ))}
      </div>
    </div>
  )
}

export function WhoIsForSlide({ inFor=["You've never written a line of code","You tried before and it felt like drowning in syntax","You'd rather learn quietly than perform publicly"], notFor=["You already ship production code (try our advanced track)","You want a certificate more than a skill","You need it done by Friday"] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:48 }}>Is this course for you?</div>
      <div style={{ display:'flex', gap:36 }}>
        <div className="anim-fade-left d2" style={{ flex:1, background:t.ink, color:'#fff', borderRadius:t.radiusMd, padding:'44px 50px' }}>
          <div style={{ fontFamily:t.fontDisplay, fontSize:30, fontWeight:700, color:t.accent, marginBottom:26 }}>This is your den if…</div>
          {inFor.map((b,i) => <div key={i} style={{ display:'flex', gap:14, fontSize:25, color:'#e8e4d8', marginBottom:18 }}><span style={{ color:t.accent }}>✓</span>{b}</div>)}
        </div>
        <div className="anim-fade-right d3" style={{ flex:1, border:`3px solid ${t.gray300}`, borderRadius:t.radiusMd, padding:'44px 50px' }}>
          <div style={{ fontFamily:t.fontDisplay, fontSize:30, fontWeight:700, color:t.gray700, marginBottom:26 }}>Probably not, if…</div>
          {notFor.map((b,i) => <div key={i} style={{ display:'flex', gap:14, fontSize:25, color:t.gray700, marginBottom:18 }}><span>→</span>{b}</div>)}
        </div>
      </div>
    </div>
  )
}

export function LearningPathSlide({ title="Your path through the Den", subtitle="A step-by-step journey — each stop unlocks the next.", steps=[{icon:'🧠',label:'Think',sub:'Logic & algorithms'},{icon:'✍️',label:'Write',sub:'Pseudocode'},{icon:'⌨️',label:'Code',sub:'Real Python'},{icon:'🚀',label:'Build',sub:'Your first project'}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:20 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ fontSize:24, color:t.gray700, marginBottom:70 }}>{subtitle}</div>
      <div style={{ display:'flex', alignItems:'center' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className={`anim-pop d${i*2+2}`} style={{ textAlign:'center', flex:1 }}>
              <div style={{ width:110, height:110, borderRadius:'50%', background: i===0?t.accent: i===steps.length-1?'transparent':i===1?t.navy:t.ink, border: i===steps.length-1?`6px solid ${t.accent}`:'none', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:44, margin:'0 auto 18px' }}>{step.icon}</div>
              <div style={{ fontWeight:700, fontSize:26 }}>{step.label}</div>
              <div style={{ color:t.gray700, fontSize:21, marginTop:6 }}>{step.sub}</div>
            </div>
            {i < steps.length-1 && <div style={{ flex:'0 0 6px', margin:'0 10px', height:6, background: i<2?t.accent:t.gray300, borderRadius:3 }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function TimeCommitSlide({ title="What a week here looks like", items=[{n:'2×',label:'Video lessons',sub:'~15 minutes each'},{n:'3×',label:'Practice reps',sub:'10 quiet minutes'},{n:'1×',label:'Mini project',sub:'30 min, weekends'}], highlight={n:'≈2h',label:'Total per week',sub:'Less than one movie'} }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, marginBottom:70 }}>{title}</div>
      <div style={{ display:'flex', gap:36 }}>
        {items.map((item, i) => (
          <div key={i} className={`anim-fade-up d${i+2}`} style={{ flex:1, textAlign:'center', background:'rgba(255,255,255,.06)', borderRadius:t.radiusMd, padding:'48px 30px' }}>
            <div style={{ fontFamily:t.fontDisplay, fontSize:76, fontWeight:700, color:t.accent, lineHeight:1 }}>{item.n}</div>
            <div style={{ fontSize:25, fontWeight:700, marginTop:12 }}>{item.label}</div>
            <div style={{ fontSize:21, color:'#cfcabf', marginTop:8 }}>{item.sub}</div>
          </div>
        ))}
        <div className="anim-fade-up d5" style={{ flex:1, textAlign:'center', background:t.accent, borderRadius:t.radiusMd, padding:'48px 30px' }}>
          <div style={{ fontFamily:t.fontDisplay, fontSize:76, fontWeight:700, lineHeight:1 }}>{highlight.n}</div>
          <div style={{ fontSize:25, fontWeight:700, marginTop:12 }}>{highlight.label}</div>
          <div style={{ fontSize:21, marginTop:8, color:'#ffe2b3' }}>{highlight.sub}</div>
        </div>
      </div>
    </div>
  )
}

export function SkillMeterSlide({ title="Where this course takes you", skills=[{label:'Reading code',level:'Confident',pct:85,color:t.accent},{label:'Writing programs',level:'Independent',pct:70,color:t.navy},{label:'Debugging',level:'Calm & methodical',pct:60,color:t.ink}], note="Measured against yourself four weeks ago — the only comparison that matters here." }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:64 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:40, maxWidth:1450 }}>
        {skills.map((s,i) => (
          <div key={i} className={`anim-fade-up d${i+2}`}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:25, marginBottom:14 }}><b>{s.label}</b><span style={{ color:t.accent, fontWeight:700 }}>{s.level}</span></div>
            <div style={{ height:22, background:t.gray100, borderRadius:11, overflow:'hidden' }}>
              <div className="anim-grow" style={{ width:`${s.pct}%`, height:'100%', background:s.color, borderRadius:11, animationDelay:`${.4+i*.2}s` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="anim-fade-up d6" style={{ fontSize:23, color:t.gray700, marginTop:44 }}>{note}</div>
    </div>
  )
}

export function WhatYoullBuildSlide({ title="Three things you'll actually build", projects=[{file:'greeter.py',bg:t.ink,label:'A polite greeter',desc:"Asks, remembers, and responds — your first input/output loop.",module:'Module 2'},{file:'quiz_master.py',bg:t.navy,label:'A quiz game',desc:'Scores answers with decisions and loops — logic you designed.',module:'Module 4'},{file:'den_diary.py',bg:t.accent,label:'A tiny diary app',desc:'Saves your notes to a real file. Small, complete, and yours.',module:'Module 6 · Capstone'}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:16 }}>Project-based</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:52 }}>{title}</div>
      <div style={{ display:'flex', gap:32 }}>
        {projects.map((p,i) => (
          <div key={i} className={`anim-fade-up d${i*2+3}`} style={{ flex:1, borderRadius:t.radiusMd, overflow:'hidden', boxShadow:t.shadowMd }}>
            <div style={{ background:p.bg, color:'#fff', padding:'24px 32px', fontFamily:t.fontMono, fontSize:21 }}>{p.file}</div>
            <div style={{ padding:'30px 32px' }}>
              <div style={{ fontWeight:700, fontSize:26, marginBottom:10 }}>{p.label}</div>
              <div style={{ fontSize:22, color:t.gray700, lineHeight:1.5 }}>{p.desc}</div>
              <div style={{ color:t.accent, fontSize:20, fontWeight:700, marginTop:18 }}>{p.module}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
