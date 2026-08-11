import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function ExerciseSlide({ eyebrow='Your turn', title='Practice: the morning routine', steps=['Write your morning routine as 6–8 steps','Put them in the exact order they must happen','Find one step that hides a decision (an "if")'], hint='Hint: "Get dressed" is really many steps. How small should a step be? Small enough that it can\'t be misunderstood.' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:18 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:44 }}>{title}</div>
      <div style={{ display:'flex', gap:40 }}>
        <div style={{ flex:1.4, display:'flex', flexDirection:'column', gap:22, fontSize:28 }}>
          {steps.map((s,i) => (
            <div key={i} className={`anim-fade-left d${i*2+3}`} style={{ display:'flex', gap:20, alignItems:'center' }}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:t.accent, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:24, flexShrink:0 }}>{i+1}</div>
              {s}
            </div>
          ))}
        </div>
        <div className="anim-fade-right d6" style={{ flex:1, background:t.gray100, borderRadius:t.radiusMd, padding:'36px 42px', fontSize:24, color:t.gray700, alignSelf:'flex-start' }}>
          <b style={{ color:t.accent }}>Hint:</b> {hint.replace(/^Hint: /,'')}
        </div>
      </div>
    </div>
  )
}

export function HomeworkSlide({ eyebrow='Homework', title='Three small things — 20 minutes total', tasks=[{text:'Re-run today\'s program with your own name and age',time:'5 min'},{text:'Break it on purpose — remove one quote, read the error',time:'5 min'},{text:"Write tomorrow's breakfast as 6 steps of pseudocode",time:'10 min'}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div style={{ position:'absolute', top:46, right:64, fontSize:16, color:t.gray700 }}>Before next lesson</div>
      <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:18 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:48 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:24, maxWidth:1400, fontSize:27 }}>
        {tasks.map((task,i) => (
          <div key={i} className={`anim-fade-left d${i*2+3}`} style={{ display:'flex', gap:24, alignItems:'center', background:t.gray100, borderRadius:t.radiusMd, padding:'28px 38px' }}>
            <span style={{ fontSize:30 }}>☐</span>
            <span style={{ flex:1 }}>{task.text}</span>
            <span style={{ color:t.gray700, fontSize:22, flexShrink:0 }}>{task.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CodeAlongSlide({ badge='CODE ALONG', instruction='Open your editor and type with me', tasks=['Create a file called hello.py','Ask the user for their name','Greet them back, by name','Run it three times with three names'], warning='Typing it yourself is the lesson. Watching is not.' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <div style={{ position:'absolute', top:34, left:64, fontSize:20, fontWeight:600 }}>
        <span style={{ background:t.accent, padding:'8px 20px', borderRadius:t.radiusPill, fontSize:17, fontWeight:700, marginRight:16 }}>{badge}</span>
        {instruction}
      </div>
      <img src={logo} style={{ height:32, position:'absolute', top:32, right:64 }} alt="" />
      <div style={{ position:'absolute', top:110, left:64, bottom:64, width:'56%', background:'#0d0b06', border:'2px solid #35301f', borderRadius:t.radiusMd, display:'flex', alignItems:'center', justifyContent:'center', color:'#6b6552', fontFamily:t.fontMono, fontSize:22 }} className="anim-fade-left">
        Your live editor / screen share
      </div>
      <div style={{ position:'absolute', top:110, right:64, bottom:64, width:'36%', display:'flex', flexDirection:'column', gap:18 }}>
        <div className="anim-fade-right d2" style={{ fontWeight:700, fontSize:26, fontFamily:t.fontDisplay }}>We will:</div>
        {tasks.map((task,i) => (
          <div key={i} className={`anim-fade-right d${i+3}`} style={{ display:'flex', gap:14, fontSize:23 }}>
            <span style={{ color:t.accent }}>□</span>{task}
          </div>
        ))}
        <div className="anim-fade-up d7" style={{ marginTop:'auto', background:'rgba(255,153,0,.1)', border:`2px solid ${t.accent}`, borderRadius:t.radiusMd, padding:'22px 28px', fontSize:21, color:'#ffd9a0' }}>{warning}</div>
      </div>
    </div>
  )
}

export function ChallengeTiersSlide({ title='Pick your challenge', tiers=[{level:'WARM-UP ★',color:t.gray700,bg:'transparent',border:t.gray300,title:'Greet three friends',desc:'Print a hello message for three different names.'},{level:'STRETCH ★★',color:t.accent,bg:'rgba(248,160,26,.06)',border:t.accent,title:'Ask, then greet',desc:'Take the name as input and build the greeting yourself.'},{level:'DEN MASTER ★★★',color:t.navy,bg:'rgba(14,0,78,.04)',border:t.navy,title:'Greet politely by age',desc:"If they're over 60, add 'sir' or 'madam'. You'll need an IF."}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink, marginBottom:52 }}>{title}</div>
      <div style={{ display:'flex', gap:32 }}>
        {tiers.map((tier,i) => (
          <div key={i} className={`anim-fade-up d${i*2+2}`} style={{ flex:1, border:`3px solid ${tier.border}`, background:tier.bg, borderRadius:t.radiusMd, padding:'44px 46px' }}>
            <div style={{ fontSize:22, fontWeight:700, color:tier.color, letterSpacing:2, marginBottom:16 }}>{tier.level}</div>
            <div style={{ fontWeight:700, fontSize:28, marginBottom:12 }}>{tier.title}</div>
            <div style={{ fontSize:23, color:t.gray700 }}>{tier.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LabTimeSlide({ badge='🧪 DEN LAB', title='Lab: build the bouncer', description='Your program guards a club door. It should:', tasks=['Ask for age and whether they\'re on the guest list','Let in anyone 18+ or on the list','Be polite either way — this is a friendly club'], testCases=['17, on list → in ✓','25, not on list → in ✓','15, not on list → no ✗'], testNote='If all three pass, you\'ve built real access control.' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ display:'flex', alignItems:'center', gap:20, marginBottom:30 }}>
        <span style={{ background:t.ink, color:'#fff', padding:'10px 28px', borderRadius:8, fontWeight:700, fontSize:20, letterSpacing:2 }}>{badge}</span>
        <span style={{ color:t.gray700, fontSize:21 }}>A safe sandbox — nothing here can break your computer</span>
      </div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:58, fontWeight:700, color:t.ink, marginBottom:44 }}>{title}</div>
      <div style={{ display:'flex', gap:44 }}>
        <div style={{ flex:1.2, fontSize:26, lineHeight:1.6 }}>
          <div style={{ marginBottom:28 }}>{description}</div>
          {tasks.map((task,i) => (
            <div key={i} className={`anim-fade-left d${i+3}`} style={{ display:'flex', gap:14, marginBottom:16 }}>
              <span style={{ color:t.accent, fontWeight:700 }}>→</span>{task}
            </div>
          ))}
        </div>
        <div className="anim-fade-right d5" style={{ flex:1, background:t.gray100, borderRadius:t.radiusMd, padding:'36px 42px', alignSelf:'flex-start' }}>
          <div style={{ fontWeight:700, fontSize:23, marginBottom:18 }}>Test yourself with:</div>
          <div style={{ fontFamily:t.fontMono, fontSize:22, lineHeight:2, color:t.gray700 }}>
            {testCases.map((tc,i) => <div key={i}>{tc}</div>)}
          </div>
          <div style={{ fontSize:20, color:t.gray700, marginTop:18 }}>{testNote}</div>
        </div>
      </div>
    </div>
  )
}

export function DebugHuntSlide({ title='🔍 Bug hunt: find all three', codeLines=['name = input("Your name: ")', 'age = input("Your age: ")', 'if age = 18', '    print("Welcome, " + name)'], hints=['Hint 1: line 3 has two of them','Hint 2: what runs when the if is true?','Answers on the next slide'] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, marginBottom:44 }}>{title}</div>
      <div style={{ background:'#0d0b06', border:'2px solid #35301f', borderRadius:t.radiusMd, padding:'46px 56px', fontFamily:t.fontMono, fontSize:30, lineHeight:2.1, whiteSpace:'pre' }}>
        {codeLines.map((line,i) => (
          <div key={i} className={`anim-fade-left d${i+2}`}><span style={{ color:'#5d5747', marginRight:16 }}>{i+1}</span><span style={{ color:'#e8e4d8' }}>{line}</span></div>
        ))}
      </div>
      <div style={{ display:'flex', gap:44, marginTop:40, fontSize:23, color:'#cfcabf', flexWrap:'wrap' }}>
        {hints.map((h,i) => <span key={i} className={`anim-fade-up d${codeLines.length+2+i}`} style={{ color: i===hints.length-1?t.accent:'#cfcabf', fontWeight: i===hints.length-1?700:400 }}>💡 {h}</span>)}
      </div>
    </div>
  )
}
