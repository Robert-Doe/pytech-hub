import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function QuickCheckSlide({ eyebrow='Quick check', question='Which step comes first when solving a new problem?', options=['Open the code editor','Understand the problem','Pick a programming language','Search for a tutorial'], bg=t.navy }) {
  return (
    <div style={{ ...slideBase, background:bg, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:20 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:58, fontWeight:700, maxWidth:1400, lineHeight:1.2, marginBottom:52 }}>{question}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22, maxWidth:1400, fontSize:28 }}>
        {options.map((opt,i) => (
          <div key={i} className={`anim-${i%2===0?'fade-left':'fade-right'} d${i+3}`} style={{ background:'rgba(255,255,255,.08)', borderRadius:t.radiusMd, padding:'26px 36px' }}>
            <span style={{ color:t.accent, fontWeight:700, marginRight:16 }}>{'ABCD'[i]}</span>{opt}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TrueOrFalseSlide({ statement='"A loop that never ends will crash the computer immediately."', note='Reveal the answer on the next slide — let them commit first.', bg=t.navy }) {
  return (
    <div style={{ ...slideBase, background:bg, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:22 }}>True or false?</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:62, fontWeight:700, maxWidth:1400, lineHeight:1.2, marginBottom:70 }}>{statement}</div>
      <div style={{ display:'flex', gap:40 }}>
        <div className="anim-fade-left d3" style={{ flex:1, maxWidth:480, background:'rgba(255,255,255,.08)', border:`3px solid ${t.accent}`, borderRadius:t.radiusMd, padding:36, textAlign:'center', fontFamily:t.fontDisplay, fontSize:40, fontWeight:700 }}>TRUE</div>
        <div className="anim-fade-right d4" style={{ flex:1, maxWidth:480, background:'rgba(255,255,255,.08)', border:'3px solid rgba(255,255,255,.25)', borderRadius:t.radiusMd, padding:36, textAlign:'center', fontFamily:t.fontDisplay, fontSize:40, fontWeight:700 }}>FALSE</div>
      </div>
      <div className="anim-fade-up d6" style={{ fontSize:23, color:'#a9a3ff', marginTop:36 }}>{note}</div>
    </div>
  )
}

export function AnswerRevealSlide({ correct=false, answer='False!', explanation="It just… keeps going. Quietly. Forever. That&apos;s why we always ask: &ldquo;What makes this loop stop?&rdquo; — before we run it.", bg=t.navy }) {
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-pop" style={{ width:150, height:150, borderRadius:'50%', background:t.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:70, fontWeight:700 }}>{correct?'✓':'✗'}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:64, fontWeight:700, marginTop:40 }}>{answer}</div>
      <div className="anim-fade-up d3" style={{ fontSize:29, color:'#d5d1f5', maxWidth:1100, textAlign:'center', lineHeight:1.55, marginTop:26 }} dangerouslySetInnerHTML={{ __html: explanation.replace(/"([^"]+)"/g, '<b style="color:#f8a01a">"$1"</b>') }} />
    </div>
  )
}

export function FillBlankSlide({ title='Complete the greeting', lines=[{ text:'name = input("Who are you? ")', type:'code' },{ blank:true, before:'print("Welcome, "', after:'name)', hint:'?' }], options=[',','+','&'], note='…two of these work in Python. Which two?', bg=t.ink }) {
  return (
    <div style={{ ...slideBase, background:bg, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:20 }}>Fill in the blank</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, marginBottom:48 }}>{title}</div>
      <div className="anim-fade-up d3" style={{ background:'#0d0b06', border:'2px solid #35301f', borderRadius:t.radiusMd, padding:'50px 60px', fontFamily:t.fontMono, fontSize:34, lineHeight:2 }}>
        {lines.map((line,i) => (
          <div key={i}>
            {line.blank
              ? <><span style={{ color:'#a9a3ff' }}>print</span><span>(</span><span style={{ color:'#e8c26a' }}>"Welcome, "</span><span style={{ display:'inline-block', width:140, borderBottom:`5px dashed ${t.accent}`, textAlign:'center', color:t.accent, marginBottom:6 }}>?</span><span> name)</span></>
              : <span style={{ color:'#e8e4d8' }}>{line.text}</span>}
          </div>
        ))}
      </div>
      <div className="anim-fade-up d5" style={{ display:'flex', gap:20, marginTop:40, fontSize:26, alignItems:'center' }}>
        {options.map(o => <div key={o} style={{ border:'2px solid rgba(255,255,255,.3)', borderRadius:t.radiusPill, padding:'14px 38px', fontFamily:t.fontMono }}>{o}</div>)}
        <span style={{ color:'#7d7660', fontSize:22, marginLeft:16 }}>{note}</span>
      </div>
    </div>
  )
}

export function SpeedRoundSlide({ title='⚡ Speed round', subtitle='True or false — answer out loud, one second each. Go:', questions=['1 · 5 == 5.0 is True','2 · "5" == 5 is True','3 · An else can exist without an if','4 · Exactly one branch of if/else always runs'] }) {
  return (
    <div style={{ ...slideBase, background:t.accent, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar(t.ink)} />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:64, fontWeight:700, marginBottom:14 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ fontSize:25, color:'#5c3c00', marginBottom:52 }}>{subtitle}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:20, fontSize:29, fontWeight:600, maxWidth:1300 }}>
        {questions.map((q,i) => (
          <div key={i} className={`anim-fade-left d${i+3}`} style={{ background: i===questions.length-1?t.ink:'rgba(255,255,255,.85)', color: i===questions.length-1?'#fff':t.ink, borderRadius:t.radiusMd, padding:'24px 40px', display:'flex', justifyContent:'space-between' }}>
            <span>{q}</span><span style={{ color:t.accent }}>T / F</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PollSlide({ eyebrow='📊 Comment below', question='What scares you most about code?', options=[{label:'A — "I\'ll break something"',pct:41},{label:'B — "The error messages"',pct:33},{label:'C — "Everyone else seems faster"',pct:26}], note='All three have the same cure — and it\'s the next lesson.' }) {
  const colors = [t.accent, t.navy, t.ink]
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:20 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:56, fontWeight:700, color:t.ink, marginBottom:56 }}>{question}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:24, maxWidth:1350, fontSize:26 }}>
        {options.map((o,i) => (
          <div key={i} className={`anim-fade-left d${i+3}`}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}><span><b>{o.label.split(' — ')[0]}</b> — {o.label.split(' — ')[1]}</span><span style={{ color:t.accent, fontWeight:700 }}>{o.pct}%</span></div>
            <div style={{ height:26, background:t.gray100, borderRadius:13, overflow:'hidden' }}>
              <div className="anim-grow" style={{ width:`${o.pct}%`, height:'100%', background:colors[i], borderRadius:13, animationDelay:`${.5+i*.15}s` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="anim-fade-up d7" style={{ fontSize:23, color:t.gray700, marginTop:44 }}>{note}</div>
    </div>
  )
}

export function PauseThinkSlide({ question='What will this code print?', note='Really — say it out loud before you press play.', bg=t.navy }) {
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontDisplay, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-pop" style={{ width:120, height:120, borderRadius:'50%', border:`6px solid ${t.accent}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:52, marginBottom:44 }}>⏸</div>
      <div className="anim-fade-up d2" style={{ fontSize:64, fontWeight:700, textAlign:'center', maxWidth:1300, lineHeight:1.2 }}>Pause the video.<br/>{question}</div>
      <div className="anim-fade-up d5" style={{ fontFamily:t.fontBody, fontSize:23, color:'#a9a3ff', marginTop:60 }}>{note}</div>
    </div>
  )
}

export function DailyChallengeSlide({ badge='+50 XP', prompt='Without running it — what does this print?', code='x = 5\nx = x + x\nprint(x * 2)', options=['10','20','25'], note='Commit before you scroll. That\'s the rep.' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ maxWidth:1350, width:'100%', borderRadius:t.radiusLg, overflow:'hidden', boxShadow:'0 30px 70px rgba(25,22,0,.16)' }}>
        <div style={{ background:t.ink, color:'#fff', padding:'34px 56px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}><span style={{ fontSize:36 }}>☀️</span><span style={{ fontFamily:t.fontDisplay, fontSize:32, fontWeight:700 }}>Today's 5-minute rep</span></div>
          <span style={{ background:t.accent, padding:'10px 26px', borderRadius:t.radiusPill, fontWeight:700, fontSize:19 }}>{badge}</span>
        </div>
        <div style={{ padding:'52px 56px' }}>
          <div style={{ fontSize:29, lineHeight:1.5, marginBottom:36 }}>{prompt}</div>
          <div className="anim-fade-up d2" style={{ background:t.gray100, borderRadius:t.radiusMd, padding:'34px 44px', fontFamily:t.fontMono, fontSize:29, lineHeight:1.9 }}>
            {code.split('\n').map((line,i) => <div key={i}>{line}</div>)}
          </div>
          <div className="anim-fade-up d4" style={{ display:'flex', gap:18, marginTop:36, fontSize:25, alignItems:'center' }}>
            {options.map(o => <div key={o} style={{ border:`2px solid ${t.gray300}`, borderRadius:t.radiusPill, padding:'14px 40px', fontFamily:t.fontMono }}>{o}</div>)}
            <span style={{ color:t.gray700, fontSize:21, marginLeft:14 }}>{note}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
