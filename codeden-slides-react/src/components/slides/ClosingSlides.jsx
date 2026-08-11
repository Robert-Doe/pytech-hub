import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function ThankYouSlide({ heading='Thank you.', sub='Questions? Find me at @CodeDen — or just keep watching.', name='Robert Doe', role='Founder, CodeDen.org', photo='/assets/people/robertdoe.png', bg=t.navy }) {
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontDisplay, color:'#fff' }}>
      <div style={topBar()} />
      <div className="anim-fade-up" style={{ fontSize:96, fontWeight:700 }}>{heading}</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontBody, fontSize:28, color:'#a9a3ff', marginTop:24 }}>{sub}</div>
      <div className="anim-pop d4" style={{ display:'flex', alignItems:'center', gap:24, marginTop:60 }}>
        <img src={photo} style={{ width:110, height:110, objectFit:'cover', borderRadius:'50%', border:`4px solid ${t.accent}` }} alt={name} />
        <div style={{ textAlign:'left', fontFamily:t.fontBody }}>
          <div style={{ fontWeight:700, fontSize:26 }}>{name}</div>
          <div style={{ fontSize:21, color:'#a9a3ff' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

export function CertificateSlide({ recipientName='Ama Mensah', courseTitle='Introduction to Algorithms', date='July 2026', instructorName='Robert Doe', instructorRole='Founder, CodeDen.org' }) {
  return (
    <div style={{ ...slideBase, background:t.gray100, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <div className="anim-fade-up" style={{ background:'#fff', border:`3px solid ${t.gray700}`, borderRadius:t.radiusMd, padding:'90px 130px', textAlign:'center', boxShadow:'0 30px 70px rgba(25,22,0,.15)', position:'relative', maxWidth:1400 }}>
        <div style={{ position:'absolute', top:24, left:24, right:24, bottom:24, border:`2px solid ${t.orange400}`, borderRadius:8, pointerEvents:'none' }} />
        <img src={logoDark} style={{ height:52, marginBottom:36 }} alt="CodeDen" />
        <div style={{ fontSize:20, letterSpacing:5, textTransform:'uppercase', color:t.gray700, marginBottom:28 }}>Certificate of Completion</div>
        <div style={{ fontFamily:t.fontDisplay, fontSize:64, fontWeight:700, margin:'0 0 10px' }}>{recipientName}</div>
        <div style={{ fontSize:26, color:t.gray700 }}>has quietly completed</div>
        <div style={{ fontFamily:t.fontDisplay, fontSize:34, fontWeight:700, color:t.accent, marginTop:14 }}>{courseTitle}</div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:56, fontSize:20, color:t.gray700 }}>
          <span>{date}</span>
          <span style={{ fontFamily:t.fontDisplay, fontWeight:700, color:t.ink }}>{instructorName}, {instructorRole}</span>
        </div>
      </div>
    </div>
  )
}

export function CommunitySlide({ heading='The Den is open.', sub='Subscribe, comment your progress, or just lurk quietly — that counts too.', links=['youtube.com/@CodeDen','codeden.org'], people=['/assets/people/robertdoe.png','/assets/people/erica.jpg','/assets/people/edward.jpg','/assets/people/evans.jpeg'] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-pop" style={{ display:'flex', marginBottom:44 }}>
        {people.map((p,i) => (
          <img key={i} src={p} style={{ width:120, height:120, objectFit:'cover', borderRadius:'50%', border:`5px solid ${t.ink}`, marginLeft: i>0?-30:0 }} alt="" />
        ))}
        <div style={{ width:120, height:120, borderRadius:'50%', background:t.accent, border:`5px solid ${t.ink}`, marginLeft:-30, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:28 }}>You?</div>
      </div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:58, fontWeight:700, textAlign:'center' }}>{heading}</div>
      <div className="anim-fade-up d3" style={{ fontSize:26, color:'#cfcabf', marginTop:22, maxWidth:900, textAlign:'center' }}>{sub}</div>
      <div className="anim-fade-up d5" style={{ display:'flex', gap:20, marginTop:44 }}>
        {links.map((link,i) => (
          <div key={i} style={{ background: i===0?t.accent:'transparent', border: i===0?'none':`2px solid rgba(255,255,255,.35)`, padding:'16px 40px', borderRadius:t.radiusPill, fontWeight:700, fontSize:22 }}>{link}</div>
        ))}
      </div>
    </div>
  )
}

export function EncouragementSlide({ title="You just did something most people only talk about.", sub='Quietly, at your own pace — exactly how it\'s supposed to feel.', bg=t.accent }) {
  return (
    <div style={{ ...slideBase, background:bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 200px', fontFamily:t.fontDisplay, color:t.ink }}>
      <div style={topBar(t.ink)} />
      <div className="anim-fade-up" style={{ fontSize:76, fontWeight:700, textAlign:'center', maxWidth:1400, lineHeight:1.2 }}>{title}</div>
      <div className="anim-fade-up d3" style={{ fontFamily:t.fontBody, fontSize:28, color:'#5c3c00', marginTop:40 }}>{sub}</div>
    </div>
  )
}

export function ResourcesSlide({ title='Where to go next', resources=[{label:'Video lessons',desc:'Full course playlist, updated regularly',link:'youtube.com/@CodeDen →'},{label:'Lesson gallery',desc:'Watch every episode right on the site',link:'codeden.org/lessons →'},{label:'The book',desc:'Programming for Shy People — join the waitlist',link:'codeden.org/books →'}] }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:52 }}>{title}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:22, maxWidth:1300, fontSize:27 }}>
        {resources.map((r,i) => (
          <div key={i} className={`anim-fade-left d${i+2}`} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`2px solid ${t.gray300}`, paddingBottom:20 }}>
            <div><b>{r.label}</b><div style={{ color:t.gray700, fontSize:22 }}>{r.desc}</div></div>
            <div style={{ color:t.accent, fontWeight:600 }}>{r.link}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSlide({ title="From the Den's comment section", testimonials=[{stars:5,text:'"First course that didn\'t make me feel stupid for asking why."',who:'Kwame · started at zero'},{stars:5,text:'"The chef story lives in my head. I finally get what a program is."',who:'Adjoa · nurse, learning nights'},{stars:5,text:'"30 minutes a day, 6 weeks. I just wrote my first real script at work."',who:'Yaw · accountant'}], note='Swap in real comments from your YouTube channel — they\'re more convincing than anything written for you.' }) {
  return (
    <div style={{ ...slideBase, background:t.gray100, padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:54, fontWeight:700, color:t.ink, marginBottom:52 }}>{title}</div>
      <div style={{ display:'flex', gap:32 }}>
        {testimonials.map((tm,i) => (
          <div key={i} className={`anim-fade-up d${i*2+2}`} style={{ flex:1, background:'#fff', borderRadius:t.radiusMd, padding:'40px 44px', boxShadow:t.shadowMd }}>
            <div style={{ color:t.accent, fontSize:26, letterSpacing:3, marginBottom:18 }}>{'★'.repeat(tm.stars)}</div>
            <div style={{ fontSize:25, lineHeight:1.5 }}>{tm.text}</div>
            <div style={{ fontSize:21, color:t.gray700, marginTop:22 }}>— {tm.who}</div>
          </div>
        ))}
      </div>
      {note && <div className="anim-fade-up d8" style={{ fontSize:21, color:t.gray700, marginTop:36 }}>{note}</div>}
    </div>
  )
}

export function NextCourseSlide({ eyebrow='Up next in the Den', title='Data, Quietly.', desc='Lists, dictionaries, and files — teaching your programs to remember more than one thing at a time. Everything builds on what you just finished.', tags=['5 modules','Starts where this ended','Free, as always'] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, display:'flex', alignItems:'center', gap:100, padding:'0 140px', fontFamily:t.fontBody, color:'#fff', overflow:'hidden' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div style={{ flex:1 }}>
        <div className="anim-fade-up" style={{ fontSize:20, letterSpacing:3, textTransform:'uppercase', color:t.accent, fontWeight:700, marginBottom:22 }}>{eyebrow}</div>
        <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:74, fontWeight:700, lineHeight:1.1 }}>{title}</div>
        <div className="anim-fade-up d3" style={{ fontSize:27, color:'#cfcabf', lineHeight:1.55, marginTop:26, maxWidth:800 }}>{desc}</div>
        <div className="anim-fade-up d5" style={{ display:'flex', gap:18, marginTop:44, fontSize:21 }}>
          {tags.map((tag,i) => (
            <span key={i} style={{ background: i===2?t.accent:'transparent', border: i===2?'none':`2px solid rgba(255,255,255,.3)`, borderRadius:t.radiusPill, padding:'10px 26px', fontWeight: i===2?700:400 }}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="anim-fade-right d3" style={{ width:480, height:620, borderRadius:t.radiusLg, background:`linear-gradient(160deg,${t.navy},${t.ink})`, border:'2px solid rgba(255,255,255,.12)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28, flexShrink:0, boxShadow:'0 40px 80px rgba(0,0,0,.5)' }}>
        <img src={logo} style={{ height:40 }} alt="CodeDen" />
        <div style={{ fontFamily:t.fontMono, fontSize:26, color:t.accent }}>[ "next", "level" ]</div>
        <div style={{ fontFamily:t.fontDisplay, fontSize:40, fontWeight:700, textAlign:'center' }}>{title}</div>
        <div style={{ fontSize:19, color:'#9d9781' }}>Course 2 of the Den path</div>
      </div>
    </div>
  )
}

export function FeedbackAskSlide({ question='Was this lesson\'s pace right?', options=[{icon:'🐢',label:'Too slow',sub:'"I was ahead the whole time"'},{icon:'🦊',label:'Just right',sub:'"Challenged, not lost"',highlight:true},{icon:'🐇',label:'Too fast',sub:'"I rewound more than twice"'}], note='Vote in the comments with the emoji. The next lesson\'s pace is literally decided by this.' }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:64, fontWeight:700, color:t.ink, textAlign:'center', lineHeight:1.2 }}>{question}</div>
      <div style={{ display:'flex', gap:28, marginTop:70 }}>
        {options.map((o,i) => (
          <div key={i} className={`anim-pop d${i*2+2}`} style={{ width:280, background: o.highlight?t.ink:t.gray100, color: o.highlight?'#fff':t.ink, borderRadius:t.radiusMd, padding:40, textAlign:'center', boxShadow: o.highlight?t.shadowLg:'' }}>
            <div style={{ fontSize:52, marginBottom:16 }}>{o.icon}</div>
            <div style={{ fontWeight:700, fontSize:25 }}>{o.label}</div>
            <div style={{ fontSize:20, color: o.highlight?'#9d9781':t.gray700, marginTop:8 }}>{o.sub}</div>
          </div>
        ))}
      </div>
      <div className="anim-fade-up d8" style={{ fontSize:24, color:t.gray700, marginTop:60 }}>{note}</div>
    </div>
  )
}
