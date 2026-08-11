import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'

const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function TitleSlide({ module='Module 01', title='Learn to Code the Quiet Way', subtitle='Introduction to Algorithms — with Robert Doe', bg=t.ink }) {
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontDisplay, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:64, position:'absolute', top:48, left:64 }} alt="CodeDen" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontFamily:t.fontBody, fontWeight:700, marginBottom:28 }}>{module}</div>
      <div className="anim-fade-up d2" style={{ fontSize:88, fontWeight:700, lineHeight:1.05, textAlign:'center', maxWidth:1400 }}>{title}</div>
      <div style={{ width:120, height:6, background:t.accent, borderRadius:3, margin:'36px 0' }} />
      <div className="anim-fade-up d4" style={{ fontSize:28, fontFamily:t.fontBody, color:'#cfcabf' }}>{subtitle}</div>
    </div>
  )
}

export function AuthorIntroSlide({ name='Robert Doe', title='Founder — CodeDen.org', bio='Author of Programming for Shy People. PhD researcher. Teaches logic before syntax — through stories, patterns and visuals.', handles=['@CodeDen','robertdoe.com'], photo='/assets/people/robertdoe.png' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, display:'flex', alignItems:'center', justifyContent:'center', gap:110, fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:44, left:64 }} alt="CodeDen" />
      <div className="anim-pop" style={{ position:'relative' }}>
        <img src={photo} style={{ width:360, height:360, objectFit:'cover', borderRadius:'50%', border:`8px solid ${t.accent}` }} alt={name} />
        <div style={{ position:'absolute', bottom:6, right:6, background:t.accent, color:'#fff', fontWeight:700, fontSize:20, padding:'10px 22px', borderRadius:t.radiusPill }}>Your instructor</div>
      </div>
      <div style={{ maxWidth:760 }}>
        <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:76, fontWeight:700, lineHeight:1.05 }}>{name}</div>
        <div className="anim-fade-up d3" style={{ fontSize:30, color:t.accent, fontWeight:600, marginTop:8 }}>{title}</div>
        <div style={{ width:110, height:5, background:t.accent, borderRadius:3, margin:'20px 0', transformOrigin:'left' }} className="anim-grow d4" />
        <div className="anim-fade-up d5" style={{ fontSize:25, color:'#cfcabf', lineHeight:1.5, marginBottom:16 }}>{bio}</div>
        <div className="anim-fade-up d6" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          {handles.map(h => (
            <div key={h} style={{ border:'2px solid #5b5646', borderRadius:t.radiusPill, padding:'10px 24px', fontSize:20 }}>{h}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CourseTrailerSlide({ badge='NEW COURSE', tags=['Beginner friendly','6 modules · 4 weeks'], title='Python, Quietly.', subtitle='From your first print() to your first real project — no pressure, no prerequisites, no public failures.', instructorName='Robert Doe', instructorRole='Founder, CodeDen · @CodeDen', photo='/assets/people/robertdoe.png' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 140px', fontFamily:t.fontBody, color:'#fff', overflow:'hidden' }}>
      <div style={topBar()} />
      <div style={{ position:'absolute', right:-200, top:-200, width:800, height:800, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,153,0,.14),transparent 65%)' }} />
      <img src={logo} style={{ height:44, position:'absolute', top:44, left:64 }} alt="CodeDen" />
      <div className="anim-fade-up" style={{ display:'flex', gap:14, marginBottom:28 }}>
        <span style={{ background:t.accent, color:'#fff', padding:'8px 22px', borderRadius:t.radiusPill, fontSize:19, fontWeight:700 }}>{badge}</span>
        {tags.map(tag => <span key={tag} style={{ border:'2px solid rgba(255,255,255,.3)', padding:'8px 22px', borderRadius:t.radiusPill, fontSize:19 }}>{tag}</span>)}
      </div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:92, fontWeight:700, lineHeight:1.05, maxWidth:1300 }}>{title}</div>
      <div className="anim-fade-up d3" style={{ fontSize:30, color:'#cfcabf', marginTop:28, maxWidth:980, lineHeight:1.5 }}>{subtitle}</div>
      <div className="anim-fade-up d5" style={{ display:'flex', alignItems:'center', gap:20, marginTop:52 }}>
        <img src={photo} style={{ width:76, height:76, objectFit:'cover', borderRadius:'50%', border:`3px solid ${t.accent}` }} alt={instructorName} />
        <div>
          <div style={{ fontWeight:700, fontSize:24 }}>{instructorName}</div>
          <div style={{ fontSize:20, color:'#9d9781' }}>{instructorRole}</div>
        </div>
      </div>
    </div>
  )
}

export function AuthorCardSlide({ name='Robert Doe', credentials='Founder, CodeDen.org · Author, Programming for Shy People · @CodeDen', bullets=['Self-taught — started exactly where you are now','Teaches logic-first: understand the thinking, then the code','Every lesson free, forever — that\'s the whole point of the Den'], photo='/assets/people/robertdoe.png' }) {
  return (
    <div style={{ ...slideBase, background:t.navy, display:'flex', alignItems:'center', justifyContent:'center', gap:110, fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="CodeDen" />
      <div className="anim-pop" style={{ position:'relative' }}>
        <img src={photo} style={{ width:380, height:380, objectFit:'cover', borderRadius:'50%', border:`10px solid ${t.accent}` }} alt={name} />
        <div className="anim-fade-up d5" style={{ position:'absolute', bottom:10, right:10, background:t.accent, color:'#fff', padding:'12px 26px', borderRadius:t.radiusPill, fontWeight:700, fontSize:22 }}>Your instructor</div>
      </div>
      <div style={{ maxWidth:800 }}>
        <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:68, fontWeight:700 }}>{name}</div>
        <div className="anim-fade-up d3" style={{ fontSize:26, color:'#a9a3ff', margin:'14px 0 34px' }}>{credentials}</div>
        {bullets.map((b, i) => (
          <div key={i} className={`anim-fade-right d${i+5}`} style={{ display:'flex', gap:16, fontSize:25, color:'#d5d1f5', marginBottom:16 }}>
            <span style={{ color:t.accent }}>●</span>{b}
          </div>
        ))}
      </div>
    </div>
  )
}
