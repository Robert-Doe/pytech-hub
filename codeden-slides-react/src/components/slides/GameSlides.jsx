import React from 'react'
import { t, slideBase, topBar } from '../../theme.js'
const logo = '/assets/logo-lockup.png'
const logoDark = '/assets/logo-lockup-dark.png'

export function XPLevelUpSlide({ xp='+150 XP', level='Loop Tamer 🦊', levelNum=3, levelLabel='Loop Tamer', xpCurrent=450, xpNext=600 }) {
  const pct = Math.round((xpCurrent/xpNext)*100)
  return (
    <div style={{ ...slideBase, background:t.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:'#fff', overflow:'hidden' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontSize:22, letterSpacing:4, textTransform:'uppercase', color:t.accent, fontWeight:700 }}>Level up</div>
      <div className="anim-pop d2" style={{ fontFamily:t.fontDisplay, fontSize:110, fontWeight:700, margin:'20px 0 12px', color:'#fff' }}>{xp}</div>
      <div className="anim-fade-up d3" style={{ fontSize:27, color:'#cfcabf' }}>You're now a</div>
      <div className="anim-pop d4" style={{ background:t.accent, color:'#fff', padding:'16px 48px', borderRadius:t.radiusPill, fontFamily:t.fontDisplay, fontSize:38, fontWeight:700, marginTop:26, boxShadow:`0 20px 50px rgba(255,153,0,.4)` }}>{level}</div>
      <div className="anim-fade-up d7" style={{ width:900, marginTop:64 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:21, color:'#9d9781', marginBottom:12 }}>
          <span>Level {levelNum} · {levelLabel}</span>
          <span>{xpCurrent} / {xpNext} XP to Level {levelNum+1}</span>
        </div>
        <div style={{ height:20, background:'rgba(255,255,255,.1)', borderRadius:10, overflow:'hidden' }}>
          <div className="anim-grow" style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg,#f8a01a,#ffcc66)', borderRadius:10, animationDelay:'1s' }} />
        </div>
      </div>
    </div>
  )
}

export function BadgeEarnedSlide({ icon='🐛', badgeName='Bug Whisperer', description="You read an error message and fixed it yourself — no copy-paste, no panic.", totalBadges=5, earned=3 }) {
  return (
    <div style={{ ...slideBase, background:t.navy, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-pop" style={{ width:280, height:280, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:t.accent, clipPath:'polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:110 }}>{icon}</div>
        <div style={{ position:'absolute', inset:-18, background:'rgba(255,153,0,.25)', clipPath:'polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', zIndex:-1 }} />
      </div>
      <div className="anim-fade-up d3" style={{ fontSize:22, letterSpacing:4, textTransform:'uppercase', color:t.accent, fontWeight:700, marginTop:44 }}>Badge earned</div>
      <div className="anim-fade-up d4" style={{ fontFamily:t.fontDisplay, fontSize:64, fontWeight:700, marginTop:14 }}>{badgeName}</div>
      <div className="anim-fade-up d5" style={{ fontSize:26, color:'#d5d1f5', marginTop:18, maxWidth:900, textAlign:'center' }}>{description}</div>
      <div className="anim-fade-up d7" style={{ display:'flex', gap:16, marginTop:44 }}>
        {Array.from({length:totalBadges}).map((_,i) => (
          <div key={i} style={{ width:74, height:74, clipPath:'polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: i<earned?t.accent:'rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>
            {i<earned ? (i===earned-1?icon:'✓') : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillMapSlide({ title='The Den map', subtitle='Choose your next room — every path stays unlocked once you\'ve earned it.', nodes=[{icon:'✓',label:'Logic',done:true},{icon:'✓',label:'Variables',done:true},{icon:'🦊',label:'Decisions',current:true},{icon:'🔒',label:'Loops',locked:true},{icon:'🔒',label:'Functions',locked:true}] }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 120px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, marginBottom:16 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ fontSize:24, color:'#cfcabf', marginBottom:64 }}>{subtitle}</div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:24 }}>
        {nodes.map((node,i) => (
          <React.Fragment key={i}>
            <div className={`anim-pop d${i+2}`} style={{ textAlign:'center', opacity: node.locked?.55:1 }}>
              <div style={{ width: node.current?180:150, height: node.current?180:150, clipPath:'polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: node.current?'#fff': node.done?t.accent:'transparent', border: node.locked?'3px dashed rgba(255,255,255,.4)':'none', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize: node.current?44:40, boxShadow: node.current?`0 0 60px rgba(255,255,255,.3)`:'' }}>
                <span style={{ color: node.current?t.ink:'#fff' }}>{node.icon}</span>
                {node.current && <div style={{ fontSize:14, fontWeight:700, color:t.ink }}>YOU ARE HERE</div>}
              </div>
              <div style={{ fontSize:21, fontWeight: node.current?700:400, color: node.current?t.accent:'#cfcabf', marginTop:14 }}>{node.label}</div>
            </div>
            {i < nodes.length-1 && <div style={{ width:70, height:5, background: i<nodes.findIndex(n=>n.current)?t.accent:'rgba(255,255,255,.2)', flexShrink:0 }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function StreakSlide({ streak=7, days=[{label:'Mon',done:true},{label:'Tue',done:true},{label:'Wed',done:true},{label:'Thu',done:true},{label:'Fri',done:true},{label:'Sat',done:true},{label:'Today',done:true,active:true}], note="Miss a day? Streaks rest, they don't reset. The Den doesn't punish life." }) {
  return (
    <div style={{ ...slideBase, background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-pop" style={{ fontSize:100 }}>🔥</div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:96, fontWeight:700, color:t.ink, marginTop:10 }}>{streak}-day streak</div>
      <div className="anim-fade-up d3" style={{ fontSize:27, color:t.gray700, marginTop:16 }}>Seven quiet sessions in a row. This is how programmers are actually made.</div>
      <div className="anim-fade-up d4" style={{ display:'flex', gap:18, marginTop:56 }}>
        {days.map((day,i) => (
          <div key={i} className={`anim-pop d${i+5}`} style={{ width:84, height:84, borderRadius:t.radiusMd, background: day.active?t.ink:t.accent, color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontWeight:700, boxShadow: day.active?`0 0 0 6px rgba(255,153,0,.3)`:'' }}>
            <span style={{ fontSize:26 }}>{day.active?'🔥':'✓'}</span>
            <span style={{ fontSize:15 }}>{day.label}</span>
          </div>
        ))}
      </div>
      <div className="anim-fade-up d9" style={{ fontSize:22, color:t.gray700, marginTop:44 }}>{note}</div>
    </div>
  )
}

export function QuestBriefingSlide({ questNum='04', difficulty='★★☆', title='The Case of the Vanishing Password', description='A login program accepts any password — even an empty one. Somewhere in its 12 lines, one condition is lying. Find it, prove it with a test, and fix it.', reward='+200 XP · Bug Whisperer progress', time='~15 quiet minutes' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ display:'flex', alignItems:'center', gap:18, marginBottom:26 }}>
        <span style={{ background:t.accent, padding:'10px 26px', borderRadius:8, fontWeight:700, fontSize:20, letterSpacing:2 }}>QUEST {questNum}</span>
        <span style={{ color:'#7d7660', fontSize:21 }}>Difficulty: {difficulty}</span>
      </div>
      <div className="anim-fade-up d2" style={{ fontFamily:t.fontDisplay, fontSize:70, fontWeight:700, lineHeight:1.1 }}>{title}</div>
      <div className="anim-fade-up d3" style={{ fontSize:27, color:'#cfcabf', lineHeight:1.55, maxWidth:1100, marginTop:30 }}>{description}</div>
      <div className="anim-fade-up d5" style={{ display:'flex', gap:44, marginTop:52, fontSize:23 }}>
        <div><span style={{ color:t.accent, fontWeight:700 }}>🏆 Reward:</span> {reward}</div>
        <div><span style={{ color:t.accent, fontWeight:700 }}>⏱ Time:</span> {time}</div>
      </div>
    </div>
  )
}

export function ProgressDashboardSlide({ title="Your Den report card", stats=[{label:'LESSONS DONE',value:14,sub:'of 24 total'},{label:'PRACTICE REPS',value:37,sub:'5 min each'},{label:'BUGS FIXED',value:9,sub:'each one a lesson'},{label:'LINES WRITTEN',value:412,sub:'by your own hands',highlight:true}], note='No grades. No percentile. Just evidence that you keep showing up.' }) {
  return (
    <div style={{ ...slideBase, background:t.ink, padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:'#fff' }}>
      <div style={topBar()} />
      <img src={logo} style={{ height:44, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, marginBottom:56 }}>{title}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:28 }}>
        {stats.map((s,i) => (
          <div key={i} className={`anim-fade-up d${i+2}`} style={{ background: s.highlight?t.accent:'rgba(255,255,255,.06)', borderRadius:t.radiusMd, padding:40 }}>
            <div style={{ fontSize:20, color: s.highlight?'#5c3c00':'#9d9781', marginBottom:14 }}>{s.label}</div>
            <div style={{ fontFamily:t.fontDisplay, fontSize:80, fontWeight:700, color: s.highlight?'#fff':t.accent }}>{s.value}</div>
            <div style={{ fontSize:20, color: s.highlight?'#5c3c00':'#cfcabf', marginTop:8 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="anim-fade-up d7" style={{ fontSize:23, color:'#cfcabf', marginTop:44 }}>{note}</div>
    </div>
  )
}

export function LeaderboardSlide({ title="This week in the Den", subtitle='Not a ranking — a roll call. Everyone who showed up, wins.', entries=[{rank:'🥇',name:'Erica K.',streak:'🔥 12-day streak',xp:980,photo:'/assets/people/erica.jpg'},{rank:'🥈',name:'Edward T.',streak:'🔥 9-day streak',xp:840,photo:'/assets/people/edward.jpg'},{rank:'🥉',name:'Evans A.',streak:'🔥 6-day streak',xp:720,photo:'/assets/people/evans.jpeg'}], youEntry={rank:'#8',name:'You — climbing quietly',streak:'🔥 4-day streak',xp:410} }) {
  return (
    <div style={{ ...slideBase, background:'#fff', padding:'0 140px', display:'flex', flexDirection:'column', justifyContent:'center', fontFamily:t.fontBody, color:t.ink }}>
      <div style={topBar()} />
      <img src={logoDark} style={{ height:36, position:'absolute', top:40, left:64 }} alt="" />
      <div className="anim-fade-up" style={{ fontFamily:t.fontDisplay, fontSize:52, fontWeight:700, color:t.ink, marginBottom:14 }}>{title}</div>
      <div className="anim-fade-up d2" style={{ fontSize:23, color:t.gray700, marginBottom:48 }}>{subtitle}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:14, maxWidth:1300, fontSize:25 }}>
        {entries.map((e,i) => (
          <div key={i} className={`anim-fade-left d${i+3}`} style={{ display:'grid', gridTemplateColumns:'80px 70px 1fr 240px 160px', gap:18, alignItems:'center', background: i===0?t.ink:t.gray100, color: i===0?'#fff':t.ink, borderRadius:t.radiusMd, padding:'20px 32px' }}>
            <span style={{ fontSize:30 }}>{e.rank}</span>
            <img src={e.photo} style={{ width:56, height:56, objectFit:'cover', borderRadius:'50%' }} alt="" />
            <span style={{ fontWeight:700 }}>{e.name}</span>
            <span style={{ color: i===0?t.accent:t.gray700 }}>{e.streak}</span>
            <span style={{ textAlign:'right', fontFamily:t.fontMono }}>{e.xp} XP</span>
          </div>
        ))}
        <div className="anim-fade-left d6" style={{ display:'grid', gridTemplateColumns:'80px 70px 1fr 240px 160px', gap:18, alignItems:'center', border:`3px solid ${t.accent}`, borderRadius:t.radiusMd, padding:'20px 32px', fontSize:25 }}>
          <span style={{ fontWeight:700, color:t.accent, fontSize:26 }}>{youEntry.rank}</span>
          <div style={{ width:56, height:56, borderRadius:'50%', background:t.accent, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>You</div>
          <span style={{ fontWeight:700 }}>{youEntry.name}</span>
          <span style={{ color:t.accent }}>{youEntry.streak}</span>
          <span style={{ textAlign:'right', fontFamily:t.fontMono }}>{youEntry.xp} XP</span>
        </div>
      </div>
    </div>
  )
}
