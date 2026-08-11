import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function BulletPointsSlide({ title='Key points', module='Module 01', bullets=['First important point goes here','Second important point','Third point — with a little more detail if you need it','Fourth point'] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div style={{ position:'absolute', top:46, right:64, fontSize:16, color:t.gray700 }}>{module}</div>
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:52 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
        {bullets.map((b,i) => (
          <div key={i} className={`anim-fade-left d${i+2}`} style={{ display:'flex', gap:24, alignItems:'center', fontSize:30 }}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:t.accent, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:22, flexShrink:0 }}>{i+1}</div>
            {b}
          </div>
        ))}
      </div>
    </div>
  )
}

export function StepsTimelineSlide({ title='From problem to program', steps=[{label:'Understand',sub:'Say the problem in your own words'},{label:'Plan',sub:'Sketch the steps as pseudocode'},{label:'Code',sub:'Translate into real syntax'},{label:'Test',sub:'Trace it with real inputs'}] }) {
  const colors = [t.accent, t.navy, t.ink, 'transparent']
  const borders = ['none','none','none',`5px solid ${t.accent}`]
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:80 }}>{title}</div>
      <div style={{ display:'flex', alignItems:'flex-start', gap:0 }}>
        {steps.map((step,i) => (
          <React.Fragment key={i}>
            <div className={`anim-fade-up d${i*2+2}`} style={{ flex:1, textAlign:'center' }}>
              <div style={{ width:88, height:88, borderRadius:'50%', background:colors[i], border:borders[i], color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:32, margin:'0 auto 20px' }}>{i+1}</div>
              <div style={{ fontWeight:700, fontSize:27 }}>{step.label}</div>
              <div style={{ color:t.gray700, fontSize:22, marginTop:6, maxWidth:260, margin:'6px auto 0' }}>{step.sub}</div>
            </div>
            {i < steps.length-1 && <div style={{ width:110, height:4, background:t.gray300, marginTop:42, flexShrink:0 }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function ComparisonTableSlide({ title='Same logic, three languages', headers=['Concept','Pseudocode','Python','JavaScript'], rows=[['Output','DISPLAY "Hi"','print("Hi")','console.log("Hi")'],['Store a value','SET age TO 12','age = 12','let age = 12'],['Decision','IF age > 10','if age > 10:','if (age > 10)']] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:44 }}>{title}</div>
      <div style={{ borderRadius:t.radiusMd, overflow:'hidden', boxShadow:t.shadowMd, fontSize:25 }}>
        <div style={{ display:'grid', gridTemplateColumns:`1.2fr ${headers.slice(1).map(()=>'1fr').join(' ')}` }}>
          {headers.map((h,i) => <div key={i} className="anim-fade-up" style={{ background:t.ink, color: i===0?'#fff':t.accent, padding:'22px 30px', fontWeight:700 }}>{h}</div>)}
          {rows.map((row,ri) => row.map((cell,ci) => (
            <div key={`${ri}-${ci}`} className={`anim-fade-left d${ri+2}`} style={{ padding:'20px 30px', borderBottom:`1px solid ${t.gray300}`, background: ri%2===1?t.gray100:'#fff', fontFamily: ci>0?t.fontMono:'inherit', fontSize: ci>0?22:undefined, fontWeight: ci===0?600:undefined }}>{cell}</div>
          )))}
        </div>
      </div>
    </div>
  )
}

export function DoVsDontSlide({ title='Naming your variables', dos=['Describe what it holds: student_age','Keep one consistent style','Prefer full words over abbreviations'], donts=["Single letters: x, a, q","Mystery numbers: data2","Names that lie about the contents"] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink, marginBottom:48 }}>{title}</div>
      <div style={{ display:'flex', gap:36 }}>
        <div className="anim-fade-left d2" style={{ flex:1, border:`3px solid ${t.accent}`, borderRadius:t.radiusMd, padding:'40px 46px' }}>
          <div style={{ fontFamily:t.fontDisplay, fontSize:32, fontWeight:700, color:t.accent, marginBottom:24 }}>✓ Do</div>
          {dos.map((d,i) => <div key={i} style={{ display:'flex', gap:14, fontSize:26, marginBottom:18 }}><span style={{ color:t.accent, fontWeight:700 }}>✓</span>{d}</div>)}
        </div>
        <div className="anim-fade-right d3" style={{ flex:1, border:`3px solid ${t.gray300}`, borderRadius:t.radiusMd, padding:'40px 46px' }}>
          <div style={{ fontFamily:t.fontDisplay, fontSize:32, fontWeight:700, color:t.gray700, marginBottom:24 }}>✗ Don't</div>
          {donts.map((d,i) => <div key={i} style={{ display:'flex', gap:14, fontSize:26, color:t.gray700, marginBottom:18 }}><span style={{ fontWeight:700 }}>✗</span>{d}</div>)}
        </div>
      </div>
    </div>
  )
}

export function CodeSnippetSlide({ title='Your first loop', code=[{text:'# Count from 1 to 5',color:'#7d7660'},{text:'for number in range(1, 6):',tokens:[{text:'for',color:t.accent},{text:' number ',color:'#e8e4d8'},{text:'in',color:t.accent},{text:' ',color:'#e8e4d8'},{text:'range',color:'#a9a3ff'},{text:'(1, 6):',color:'#e8e4d8'}]},{text:'    print("Step", number)',tokens:[{text:'    ',color:'#e8e4d8'},{text:'print',color:'#a9a3ff'},{text:'(',color:'#e8e4d8'},{text:'"Step"',color:'#e8c26a'},{text:', number)',color:'#e8e4d8'}]}], note='The loop body runs once for each value — 1, 2, 3, 4, 5.' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, marginBottom:40 }}>{title}</div>
      <div style={{ background:'#0d0b06', border:'2px solid #35301f', borderRadius:t.radiusMd, padding:'50px 60px', fontFamily:t.fontMono, fontSize:30, lineHeight:1.9, whiteSpace:'pre' }}>
        {code.map((line,i) => (
          <div key={i} className={`anim-fade-left d${i+2}`}>
            {line.tokens
              ? line.tokens.map((tok,j) => <span key={j} style={{ color: tok.color }}>{tok.text}</span>)
              : <span style={{ color: line.color || '#e8e4d8' }}>{line.text}</span>
            }
          </div>
        ))}
      </div>
      {note && <div className={`anim-fade-up d${code.length+2}`} style={{ fontSize:25, color:'#cfcabf', marginTop:30 }}>{note}</div>}
    </div>
  )
}

export function TerminalOutputSlide({ title='What the computer prints', lines=['Step 1','Step 2','Step 3','Step 4','Step 5'] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, color:t.ink, marginBottom:40 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ background:t.ink, borderRadius:t.radiusMd, overflow:'hidden', boxShadow:t.shadowLg }}>
        <div style={{ background:'#2a2617', padding:'16px 24px', display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ width:16, height:16, borderRadius:'50%', background:'#ff5f57' }} />
          <div style={{ width:16, height:16, borderRadius:'50%', background:'#febc2e' }} />
          <div style={{ width:16, height:16, borderRadius:'50%', background:'#28c840' }} />
          <div style={{ color:'#7d7660', fontSize:20, fontFamily:t.fontMono, marginLeft:12 }}>output</div>
        </div>
        <div style={{ padding:'40px 50px', fontFamily:t.fontMono, fontSize:28, lineHeight:1.9, color:'#e8e4d8', whiteSpace:'pre' }}>
          {lines.map((line,i) => (
            <div key={i} className={`anim-fade-left d${i+3}`}>{line}{i===lines.length-1 && <span style={{ color:t.accent }}>▌</span>}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SyntaxAnatomySlide({ title='Anatomy of one line', parts=[{text:'print',color:'#a9a3ff',label:'the command ↓',above:true},{text:'(',color:'#a9a3ff',label:'↑ opens the package',above:false},{text:'"Hello"',color:'#e8c26a',label:'what to say ↓',above:true},{text:')',color:'#28c840',label:'↑ closes it',above:false}] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, marginBottom:90 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ display:'flex', justifyContent:'center', fontFamily:t.fontMono, fontSize:54 }}>
        {parts.map((p,i) => (
          <div key={i} style={{ position:'relative', padding:'20px 8px', borderBottom:`6px solid ${p.color}` }}>
            <span style={{ color:p.color }}>{p.text}</span>
            <div className={`anim-fade-up d${i+4}`} style={{ position:'absolute', [p.above?'top':'bottom']:-84, left:'50%', transform:'translateX(-50%)', fontFamily:t.fontBody, fontSize:22, color:p.color, whiteSpace:'nowrap', fontWeight:600 }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FlowchartSlide({ title='How a decision flows', condition='age > 12 ?', yesBranch='Show teen content', noBranch='Show kids content' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:50, fontWeight:700, color:t.ink, marginBottom:50 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div className="anim-fade-up d2" style={{ background:t.ink, color:'#fff', padding:'18px 54px', borderRadius:t.radiusPill, fontSize:26, fontWeight:600 }}>Start</div>
        <div style={{ width:4, height:44, background:t.gray300 }} />
        <div className="anim-pop d3" style={{ width:280, height:140, background:t.accent, transform:'rotate(45deg) scale(.72)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:16 }}>
          <div style={{ transform:'rotate(-45deg)', fontWeight:700, fontSize:25, textAlign:'center' }}>{condition}</div>
        </div>
        <div style={{ display:'flex', gap:340, marginTop:8 }}>
          <div className="anim-fade-left d5" style={{ textAlign:'center' }}>
            <div style={{ color:t.accent, fontWeight:700, fontSize:24, marginBottom:10 }}>YES ↙</div>
            <div style={{ background:t.navy, color:'#fff', padding:'20px 40px', borderRadius:t.radiusMd, fontSize:24 }}>{yesBranch}</div>
          </div>
          <div className="anim-fade-right d6" style={{ textAlign:'center' }}>
            <div style={{ color:t.gray700, fontWeight:700, fontSize:24, marginBottom:10 }}>↘ NO</div>
            <div style={{ background:t.gray100, border:`2px solid ${t.gray300}`, padding:'20px 40px', borderRadius:t.radiusMd, fontSize:24 }}>{noBranch}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
