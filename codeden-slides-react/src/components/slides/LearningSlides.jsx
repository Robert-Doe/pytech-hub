import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function LearningObjectivesSlide({ eyebrow='By the end of this lesson', title='You will be able to…', objectives=[{num:'01',verb:'Explain',rest:"what a condition is — to a friend, in one sentence"},{num:'02',verb:'Write',rest:'an if/else that makes a real decision'},{num:'03',verb:'Predict',rest:'which branch runs — before pressing enter'}], note="Verbs matter: explain, write, predict. 'Understand' is not on the list." }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:16 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:56 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:26, maxWidth:1400, fontSize:29 }}>
        {objectives.map((o,i) => (
          <div key={i} className={`anim-fade-left d${i*2+3}`} style={{ display:'flex', gap:24, alignItems:'baseline' }}>
            <span style={{ fontFamily:t.fontDisplay, fontSize:40, fontWeight:700, color:t.accent }}>{o.num}</span>
            <span><b>{o.verb}</b> {o.rest}</span>
          </div>
        ))}
      </div>
      {note && <div className="anim-fade-up d8" style={{ fontSize:22, color:t.gray700, marginTop:48 }}>{note}</div>}
    </div>
  )
}

export function KeyTakewaysSlide({ title='If you remember only three things', takeaways=['A condition always answers yes or no — nothing in between.','Exactly one branch runs. Never both, never neither.','= stores. == asks. Mixing them up is everyone\'s first bug.'] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, marginBottom:60 }}>{title}</div>
      <div style={{ display:'flex', gap:32 }}>
        {takeaways.map((tk,i) => (
          <div key={i} className={`anim-fade-up d${i*2+2}`} style={{ flex:1, borderTop:`8px solid ${t.accent}`, background:'rgba(255,255,255,.05)', padding:'40px 44px', borderRadius:`0 0 ${t.radiusMd} ${t.radiusMd}` }}>
            <div style={{ fontFamily:t.fontDisplay, fontSize:56, fontWeight:700, color:t.accent, marginBottom:18 }}>{i+1}</div>
            <div style={{ fontSize:27, lineHeight:1.45 }}>{tk}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CheatSheetSlide({ title='Screenshot this one 📸', subtitle='Comparisons cheat sheet', items=[{op:'==',label:'is equal to',example:'age == 13'},{op:'!=',label:'is not equal to',example:'name != ""'},{op:'>',label:'greater than',example:'score > 90'},{op:'>=',label:'greater or equal',example:'age >= 18'},{op:'and',label:'both must be true',example:'a > 0 and b > 0'},{op:'or',label:'either is enough',example:'sat or sun'}] }) {
  return (
    <div style={{ ...slideBase, background:t.gray100, padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:44 }}>
        <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink }}>{title}</div>
        <div className="anim-fade-up d2" style={{ fontSize:21, color:t.gray700 }}>{subtitle}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
        {items.map((item,i) => (
          <div key={i} className={`anim-pop d${i+2}`} style={{ background: i===items.length-1 ? t.ink : '#fff', color: i===items.length-1 ? '#fff' : t.ink, borderRadius:t.radiusMd, padding:'30px 36px', boxShadow:t.shadowMd }}>
            <div style={{ fontFamily:t.fontMono, fontSize:38, fontWeight:700, color:t.accent }}>{item.op}</div>
            <div style={{ fontSize:23, marginTop:10 }}>{item.label}</div>
            <div style={{ fontFamily:t.fontMono, fontSize:19, color: i===items.length-1 ? '#9d9781' : t.gray700, marginTop:8 }}>{item.example}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function VocabularySlide({ title='Words you now own', words=[{word:'algorithm',def:'steps that solve a problem'},{word:'variable',def:'a labeled box for a value'},{word:'condition',def:'a question with a yes/no answer'},{word:'loop',def:'repeat until the answer is no'},{word:'syntax',def:'the grammar of a language'},{word:'bug',def:'a gap between intent and instruction'}] }) {
  return (
    <div style={{ ...slideBase, background:t.navy, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, marginBottom:56 }}>{title}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24 }}>
        {words.map((w,i) => (
          <div key={i} className={`anim-pop d${i+2}`} style={{ background:'rgba(255,255,255,.07)', borderRadius:t.radiusMd, padding:'32px 36px' }}>
            <div style={{ fontFamily:t.fontMono, color:t.accent, fontSize:27, fontWeight:700, marginBottom:10 }}>{w.word}</div>
            <div style={{ fontSize:22, color:'#d5d1f5' }}>{w.def}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConceptMapSlide({ title="How today's idea connects", nodes=[{label:'Variables',sub:'remember things',active:false},{label:'Operators',sub:'compare things',active:false},{label:'Decisions',sub:'← today',active:true},{label:'Loops',sub:'repeat decisions',active:false,locked:true}], note="A decision is just a comparison with consequences. You already own the first two pieces." }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, color:t.ink, marginBottom:70 }}>{title}</div>
      <div style={{ display:'flex', alignItems:'center', gap:26 }}>
        {nodes.map((node,i) => (
          <React.Fragment key={i}>
            <div className={`anim-${node.active?'pop':'fade-left'} d${i*2+2}`} style={{ background: node.active?t.ink: node.locked?'transparent':'#f4f1e8', border: node.locked?`2px dashed ${t.gray300}`:node.active?'none':`2px solid ${t.gray300}`, borderRadius:t.radiusPill, padding:'24px 44px', fontSize:25, fontWeight:600, color: node.active?'#fff':t.gray700, opacity: node.locked?.7:1, boxShadow: node.active?t.shadowLg:'none', textAlign:'center' }}>
              {node.label}
              <div style={{ fontSize:18, fontWeight:400, color: node.active?t.accent:t.gray700, marginTop:4 }}>{node.sub}</div>
            </div>
            {i < nodes.length-1 && <div style={{ fontSize:34, color: i<2?t.accent:t.gray300 }}>→</div>}
          </React.Fragment>
        ))}
      </div>
      {note && <div className="anim-fade-up d8" style={{ fontSize:24, color:t.gray700, marginTop:70, maxWidth:1000, textAlign:'center' }}>{note}</div>}
    </div>
  )
}

export function CommonMistakesSlide({ title='The Mistake Museum', subtitle='Everyone donates one eventually. Admission is free.', mistakes=[{code:'if age = 13:',label:'Exhibit A:',desc:'used = (store) instead of == (ask)'},{code:'if age >= 13\nprint("hi")',label:'Exhibit B:',desc:'missing colon, missing indent — Python needs both'},{code:'if age >= "13":',label:'Exhibit C:',desc:'comparing a number to text — quotes change the type'}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink, marginBottom:16 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ fontSize:24, color:t.gray700, marginBottom:48 }}>{subtitle}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1500 }}>
        {mistakes.map((m,i) => (
          <div key={i} className={`anim-fade-left d${i*2+3}`} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderRadius:t.radiusMd, overflow:'hidden', boxShadow:t.shadowMd }}>
            <div style={{ background:'#2b0f0f', color:'#ff8f8f', padding:'26px 38px', fontFamily:t.fontMono, fontSize:24 }}>{m.code}</div>
            <div style={{ background:t.gray100, padding:'26px 38px', fontSize:23 }}><b style={{ color:t.accent }}>{m.label}</b> {m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RealWorldUseSlide({ title="You met three decisions today already", examples=[{icon:'📱',title:"Your phone's lock screen",code:'if fingerprint == stored: unlock()'},{icon:'💳',title:'The ATM',code:'if amount <= balance: dispense()'},{icon:'🎬',title:'YouTube autoplay',code:'if watching == True: queue_next()'}], note='The world runs on if-statements. Now you can read them.' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink, marginBottom:56 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:24, maxWidth:1450, fontSize:26 }}>
        {examples.map((ex,i) => (
          <div key={i} className={`anim-fade-left d${i*2+2}`} style={{ display:'flex', gap:26, alignItems:'center' }}>
            <div style={{ width:80, height:80, borderRadius:t.radiusMd, background:t.gray100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, flexShrink:0 }}>{ex.icon}</div>
            <div><b>{ex.title}</b> — <span style={{ fontFamily:t.fontMono, fontSize:22, color:t.accent }}>{ex.code}</span></div>
          </div>
        ))}
      </div>
      <div className="anim-fade-up d8" style={{ fontSize:24, color:t.gray700, marginTop:48 }}>{note}</div>
    </div>
  )
}

export function SpacedReviewSlide({ eyebrow='🧠 Memory checkpoint', title='Quick — from two lessons ago:', question="What's the difference between a variable and a value?", hints=['⏳ Say it out loud in 10 seconds','🔁 Struggled? That struggle is the memory forming','📅 We\'ll ask again next week — that\'s on purpose'] }) {
  return (
    <div style={{ ...slideBase, background:t.navy, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:20 }}>{eyebrow}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:56, fontWeight:700, marginBottom:24 }}>{title}</div>
      <div className="anim-fade-up d3" style={{ fontSize:36, lineHeight:1.5, maxWidth:1300, marginBottom:60 }}>{question}</div>
      <div className="anim-fade-up d5" style={{ display:'flex', gap:60, fontSize:23, color:'#a9a3ff' }}>
        {hints.map((h,i) => <div key={i}>{h}</div>)}
      </div>
    </div>
  )
}
