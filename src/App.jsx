import { useEffect, useRef, useState } from 'react'
import photoSrc from './photoData.js'

/* ── Cursor ─────────────────────────────────────────────── */
function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [hover, setHover] = useState(false)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = e => { pos.current.mx = e.clientX; pos.current.my = e.clientY }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      const { mx, my } = pos.current
      pos.current.rx += (mx - pos.current.rx) * 0.12
      pos.current.ry += (my - pos.current.ry) * 0.12
      if (cursorRef.current) { cursorRef.current.style.left = mx + 'px'; cursorRef.current.style.top = my + 'px' }
      if (ringRef.current) { ringRef.current.style.left = pos.current.rx + 'px'; ringRef.current.style.top = pos.current.ry + 'px' }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const addHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => setHover(true))
        el.addEventListener('mouseleave', () => setHover(false))
      })
    }
    addHover()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={`cursor${hover ? ' hover' : ''}`} />
      <div ref={ringRef} className={`cursor-ring${hover ? ' hover' : ''}`} />
    </>
  )
}

/* ── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const navRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      navRef.current.classList.toggle('scrolled', window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'24px 48px',mixBlendMode:'multiply' }}>
      <a href="#" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',letterSpacing:'0.1em',color:'var(--ink)',textDecoration:'none' }}>CM</a>
      <div style={{ display:'flex',gap:'36px' }}>
        {['About','Experience','Projects','Education','Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--muted)',textDecoration:'none',transition:'color 0.3s' }}
            onMouseEnter={e => e.target.style.color='var(--rust)'}
            onMouseLeave={e => e.target.style.color='var(--muted)'}
          >{l}</a>
        ))}
      </div>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ minHeight:'100vh',display:'grid',gridTemplateColumns:'1fr 1fr',position:'relative',overflow:'hidden' }}>
      {/* Left */}
      <div style={{ display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'160px 64px 80px 64px',position:'relative' }}>
        <div className="animate-fadeUp-1" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.25em',color:'var(--rust)',marginBottom:'24px' }}>
          — Available for opportunities
        </div>
        <h1 className="animate-fadeUp-2" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(5rem,9vw,10rem)',lineHeight:'0.88',letterSpacing:'-0.01em',color:'var(--ink)' }}>
          CHRISNERG<br /><span style={{ color:'var(--rust)' }}>MQOBO</span>
        </h1>
        <div className="animate-fadeUp-3" style={{ fontFamily:'DM Serif Display,serif',fontStyle:'italic',fontSize:'clamp(1.2rem,2.5vw,2rem)',color:'var(--muted)',marginTop:'20px' }}>
          Full-Stack Software Engineer
        </div>
        <p className="animate-fadeUp-4" style={{ fontSize:'0.95rem',lineHeight:'1.8',color:'var(--slate2)',maxWidth:'420px',marginTop:'32px' }}>
          Production experience building real-time monitoring systems, WebSocket-driven state sync, and Windows OS-level tooling. BSc Computer Science & Informatics — University of Johannesburg.
        </p>
        <div className="animate-fadeUp-5" style={{ display:'flex',gap:'20px',alignItems:'center',marginTop:'48px' }}>
          <a href="/Junior_software_engineer.pdf" target="_blank"
            style={{ display:'inline-flex',alignItems:'center',gap:'10px',background:'var(--ink)',color:'var(--paper)',padding:'16px 32px',fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',textDecoration:'none',transition:'background 0.3s,transform 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--rust)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--ink)';e.currentTarget.style.transform='translateY(0)'}}>
            ↓ Download CV
          </a>
          <a href="#contact"
            style={{ display:'inline-flex',alignItems:'center',gap:'10px',border:'1.5px solid var(--border2)',color:'var(--ink)',padding:'15px 28px',fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',textDecoration:'none',transition:'border-color 0.3s,color 0.3s,transform 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--rust)';e.currentTarget.style.color='var(--rust)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--ink)';e.currentTarget.style.transform='translateY(0)'}}>
            Get in Touch ↗
          </a>
        </div>
        <div className="animate-fadeUp-6" style={{ position:'absolute',bottom:'40px',left:'64px',display:'flex',alignItems:'center',gap:'16px',fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--muted)' }}>
          <div style={{ width:'40px',height:'1px',background:'var(--muted)' }} />
          Scroll to explore
        </div>
      </div>

      {/* Right */}
      <div style={{ position:'relative',display:'flex',alignItems:'flex-end',justifyContent:'center',background:'var(--cream)',overflow:'hidden' }}>
        <div style={{ position:'absolute',fontFamily:'Bebas Neue,sans-serif',fontSize:'40vw',color:'var(--border2)',opacity:0.3,top:'50%',left:'50%',transform:'translate(-50%,-50%)',whiteSpace:'nowrap',pointerEvents:'none',lineHeight:1 }}>CM</div>
        <img
          src={photoSrc}
          alt="Chrisnerg Mqobo"
          className="animate-fadeIn-1"
          style={{ position:'relative',zIndex:1,width:'100%',maxWidth:'480px',height:'100%',objectFit:'cover',objectPosition:'top' }}
        />
        {/* Stat badges */}
        <div style={{ position:'absolute',top:'48px',right:'48px',textAlign:'right',zIndex:2 }}>
          <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.2em',textTransform:'uppercase' }}>Based in</div>
          <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',color:'var(--ink)',letterSpacing:'0.05em' }}>JHB, SA</div>
        </div>
        <div style={{ position:'absolute',bottom:'100px',right:'48px',zIndex:2 }}>
          <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.2em',textTransform:'uppercase' }}>Status</div>
          <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',color:'var(--rust)',letterSpacing:'0.05em' }}>Open to Work</div>
        </div>
      </div>
    </section>
  )
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  const items = ['React','TypeScript','Node.js','Electron','PostgreSQL','WebSocket','Playwright','Docker','Next.js','Express','Python','MongoDB']
  const doubled = [...items,...items]
  return (
    <div style={{ background:'var(--ink)',color:'var(--paper)',padding:'18px 0',overflow:'hidden',whiteSpace:'nowrap',position:'relative' }}>
      <div className="marquee-inner" style={{ display:'inline-flex',gap:0 }}>
        {doubled.map((item,i) => (
          <span key={i} style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',letterSpacing:'0.08em',padding:'0 40px' }}>
            {item} <span style={{ color:'var(--rust)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── About ───────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ padding:'140px 64px',display:'grid',gridTemplateColumns:'1fr 2fr',gap:'80px',alignItems:'start',borderTop:'1px solid var(--border2)' }}>
      <div>
        <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px' }}>
          <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
          About
        </div>
        <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'8rem',color:'var(--border2)',lineHeight:1,marginTop:'8px' }}>01</div>
      </div>
      <div>
        <h2 className="about-headline reveal" style={{ fontFamily:'DM Serif Display,serif',fontSize:'clamp(2rem,4vw,3.5rem)',lineHeight:1.15,color:'var(--ink)',marginBottom:'32px' }}>
          Building <em style={{ color:'var(--rust)',fontStyle:'italic' }}>reliable</em> software<br />in fast-paced teams.
        </h2>
        <p className="reveal" style={{ fontSize:'1rem',lineHeight:'1.85',color:'var(--slate2)',marginBottom:'24px' }}>
          Full-stack developer with production experience building real-time monitoring systems, WebSocket-driven state synchronization, and Windows OS-level tooling. Proficient in React, TypeScript, Node.js, Electron, and PostgreSQL.
        </p>
        <p className="reveal" style={{ fontSize:'1rem',lineHeight:'1.85',color:'var(--slate2)' }}>
          Completed BSc Computer Science and Informatics at the University of Johannesburg — ranked #1 in SA for Computer Science — in November 2025, awaiting graduation ceremony May 2026. Adept at writing clean, testable code and delivering reliable software.
        </p>
        <div className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'32px',marginTop:'48px',paddingTop:'48px',borderTop:'1px solid var(--border2)' }}>
          {[['1+','Year Experience'],['100+','Students Mentored'],['40%','Regression Reduction']].map(([num,label]) => (
            <div key={label}>
              <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'3.5rem',color:'var(--rust)',lineHeight:1 }}>{num}</div>
              <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--muted)',marginTop:'4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Experience ─────────────────────────────────────────── */
function Experience() {
  const jobs = [
    {
      year: '2025 →',
      role: 'Junior Software Engineer',
      company: 'Tontrac Systems Analytics',
      location: 'Sandton, Gauteng',
      bullets: [
        'Architected a real-time camera monitoring dashboard using Electron and React, enabling site operators to track multiple checkpoint feeds simultaneously via a high-performance grid layout.',
        'Implemented a secure IPC communication layer (Main → Preload → Renderer bridge) with WebSocket contracts to synchronise device state updates from a Master Agent proxy in real time.',
        'Engineered low-level Windows OS integrations using the Windows Registry API (HKCU) and Win32 broadcasts to automate system-wide date/time configuration.',
        'Built a Playwright end-to-end testing suite that reduced manual regression testing effort by 40%.',
      ]
    },
    {
      year: 'Feb – Sep 2025',
      role: 'Informatics Tutor',
      company: 'University of Johannesburg',
      location: 'Auckland Park, Johannesburg',
      bullets: [
        'Mentored 100+ undergraduate students in algorithmic thinking, debugging strategies, and clean coding practices in Visual Basic.',
        'Co-facilitated technical workshops with academic staff to reinforce curriculum objectives and boost student engagement.',
      ]
    }
  ]

  return (
    <section id="experience" style={{ padding:'140px 64px',background:'var(--cream)',borderTop:'1px solid var(--border2)' }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'80px' }}>
        <div>
          <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
            Work History
          </div>
          <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(3rem,6vw,6rem)',color:'var(--ink)',lineHeight:1 }}>Experience</h2>
        </div>
        <a href="/Junior_software_engineer.pdf" target="_blank"
          className="reveal"
          style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--muted)',textDecoration:'none',borderBottom:'1px solid var(--border2)',paddingBottom:'4px',transition:'color 0.3s,border-color 0.3s' }}
          onMouseEnter={e=>{e.currentTarget.style.color='var(--rust)';e.currentTarget.style.borderColor='var(--rust)'}}
          onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)';e.currentTarget.style.borderColor='var(--border2)'}}>
          Full CV ↗
        </a>
      </div>
      <div className="exp-list">
        {jobs.map((job, i) => (
          <div key={i} className={`exp-item reveal${i > 0 ? ' reveal-delay-1' : ''}`} style={{ display:'grid',gridTemplateColumns:'120px 1fr auto',gap:'40px',padding:'48px 0',borderTop:'1px solid var(--border2)',alignItems:'start',transition:'background 0.3s' }}>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',color:'var(--muted)',letterSpacing:'0.1em',paddingTop:'6px' }}>{job.year}</div>
            <div>
              <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.6rem',color:'var(--ink)',marginBottom:'4px' }}>{job.role}</div>
              <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',color:'var(--rust)',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:'16px' }}>{job.company} · {job.location}</div>
              <ul style={{ listStyle:'none' }}>
                {job.bullets.map((b,j) => (
                  <li key={j} style={{ fontSize:'0.9rem',lineHeight:'1.7',color:'var(--slate2)',paddingLeft:'16px',position:'relative',marginBottom:'6px' }}>
                    <span style={{ position:'absolute',left:0,color:'var(--rust)',fontSize:'0.8rem' }}>—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ fontSize:'1.5rem',color:'var(--border2)',paddingTop:'6px',transition:'color 0.3s,transform 0.3s' }}>→</div>
          </div>
        ))}
        <div style={{ borderTop:'1px solid var(--border2)' }} />
      </div>
    </section>
  )
}

/* ── Skills ─────────────────────────────────────────────── */
function Skills() {
  const cards = [
    { icon:'⚡', cat:'Frontend', name:'React Ecosystem', tags:['React','Next.js','TypeScript','Tailwind','ShadCN','Zustand', 'DaisyUI'] },
    { icon:'🔧', cat:'Backend', name:'Server & APIs', tags:['Node.js','Express.js','Flask','REST APIs','JWT','Zod'] },
    { icon:'🗄️', cat:'Data & Infra', name:'Databases & Tools', tags:['PostgreSQL','MongoDB','Docker','Git','CI/CD','Playwright'] },
    { icon:'🖥️', cat:'Desktop', name:'Electron & OS', tags:['Electron','IPC Architecture','Windows Registry','WebSocket','WS','Win32'] },
    { icon:'🧪', cat:'Testing', name:'QA & Testing', tags:['Playwright','E2E Testing','Unit Tests','Regression','Postman'] },
    { icon:'📐', cat:'Architecture', name:'System Design', tags:['WebSocket','RESTful APIs','Agile','Scrum','Microservices','IPC'] },
    { icon:'💻', cat:'Languages', name:'Polyglot', tags:['JavaScript','TypeScript','Python','Java','SQL','C#'] },
    { icon:'🤝', cat:'Soft Skills', name:'People Skills', tags:['Mentorship','Communication','Problem-Solving','Adaptability'] },
  ]

  return (
    <section id="about" style={{ padding:'140px 64px',borderTop:'1px solid var(--border2)' }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'0' }}>
        <div>
          <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
            Capabilities
          </div>
          <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(3rem,6vw,6rem)',color:'var(--ink)',lineHeight:1 }}>Skills</h2>
        </div>
      </div>
      <div className="reveal" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:'80px',borderTop:'1px solid var(--border2)',borderLeft:'1px solid var(--border2)' }}>
        {cards.map((card, i) => (
          <div key={i} className={`skill-card reveal reveal-delay-${(i%4)+1}`}
            style={{ padding:'40px 32px',borderRight:'1px solid var(--border2)',borderBottom:'1px solid var(--border2)',transition:'background 0.3s' }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--cream)'}
            onMouseLeave={e=>e.currentTarget.style.background=''}>
            <div style={{ fontSize:'1.6rem',marginBottom:'16px' }}>{card.icon}</div>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)',marginBottom:'8px' }}>{card.cat}</div>
            <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.2rem',color:'var(--ink)',marginBottom:'12px' }}>{card.name}</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:'6px' }}>
              {card.tags.map(tag => (
                <span key={tag} style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',padding:'4px 8px',background:'var(--cream)',color:'var(--muted)',letterSpacing:'0.1em' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Projects ───────────────────────────────────────────── */
function Projects() {
  const projects = [
    { num:'01', type:'Electron · Desktop App', name:'Real-Time Camera Dashboard', desc:'Production system for Tontrac Systems Analytics. Multi-checkpoint camera monitoring with live WebSocket state sync, health-based filtering (Healthy / Warning / Critical), and sequential Snapshot All workflows with real-time image analysis.', stack:['Electron','React','TypeScript','WebSocket','ShadCN','Tailwind'] },
    { num:'02', type:'Electron · Desktop App', name:'TonTrac Date Format Configurator', desc:'Standalone Windows utility that detects, displays, and applies Windows regional date/time settings required by TonTrac. Registry reads/writes via node-winreg, automated backup/restore, and WM_SETTINGCHANGE broadcast for instant propagation.', stack:['Electron','React','Redux','node-winreg','Squirrel'] },
    { num:'03', type:'Full-Stack · Web App', name:'URL Shortener', desc:'Full-stack URL shortening service with a Node.js/Express REST API and a React TypeScript frontend. Chose Drizzle ORM over Prisma for leaner bundle size, integrated Zod schema validation and JWT authentication.', stack:['Node.js','Express','React','TypeScript','Drizzle ORM','JWT','Zod'] },
    { num:'04', type:'Frontend · Web App', name:'House Marketplace', desc:'Dynamic property listing platform with advanced search filtering, interactive listing components, and responsive UI. Used Zustand for complex state management across listing and search flows.', stack:['React.js','Zustand','JavaScript','CSS'] },
  ]

  return (
    <section id="projects" style={{ padding:'140px 64px',background:'var(--ink)',borderTop:'1px solid var(--border2)' }}>
      <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
        <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
        Work
      </div>
      <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(3rem,6vw,6rem)',color:'var(--paper)',lineHeight:1 }}>Projects</h2>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginTop:'60px',background:'#1a1a1a' }}>
        {projects.map((p, i) => (
          <a key={i} href="https://github.com/Chrisnerg" target="_blank"
            className={`project-card reveal reveal-delay-${i%2 === 0 ? 1 : 2}`}
            style={{ background:'var(--ink)',padding:'56px 48px',display:'block',textDecoration:'none',transition:'background 0.4s' }}>
            <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'5rem',color:'#1f1f1f',lineHeight:1,marginBottom:'-20px' }}>{p.num}</div>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)',marginBottom:'12px' }}>{p.type}</div>
            <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'2rem',color:'var(--paper)',marginBottom:'16px',lineHeight:1.2 }}>{p.name}</div>
            <p style={{ fontSize:'0.88rem',lineHeight:'1.75',color:'#9a9a9a',marginBottom:'28px' }}>{p.desc}</p>
            <div style={{ display:'flex',flexWrap:'wrap',gap:'8px' }}>
              {p.stack.map(tech => (
                <span key={tech} style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',padding:'5px 10px',border:'1px solid #2a2a2a',color:'#6a6a6a',letterSpacing:'0.1em',transition:'border-color 0.3s,color 0.3s' }}>{tech}</span>
              ))}
            </div>
            <div style={{ display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'24px',fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)' }}>
              View on GitHub <span>↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ── Education ──────────────────────────────────────────── */
function Education() {
  const courses = [
    { name:'Machine Learning, Data Science & AI Engineering with Python', sub:'Instructor: Frank Kane' },
    { name:'Node.js — Beginner to Advance with Projects', sub:'Instructor: Hitesh Choudhary' },
    { name:'The Ultimate React Course 2025: React, Next.js, Redux & more', sub:'Instructor: Jonas Schmedtmann' },
    { name:'Learn JAVA Programming - Beginner to Master', sub:'Abdul Bari' },
    { name:'Mathematics 2B2 & 2B4', sub:'Analytical foundations for engineering' },
    { name:'Computer Science & Informatics', sub:'Advanced algorithms, data structures, system design' },
  ]

  return (
    <section id="education" style={{ padding:'140px 64px',borderTop:'1px solid var(--border2)',display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'100px' }}>
      <div>
        <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
          <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
          Education
        </div>
        <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(2.5rem,5vw,5rem)',color:'var(--ink)',lineHeight:1 }}>Academic<br />Background</h2>
        <div className="reveal" style={{ marginTop:'48px',padding:'40px',border:'1px solid var(--border2)',transition:'border-color 0.3s' }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='var(--rust)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border2)'}>
          <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)',marginBottom:'12px' }}>Degree</div>
          <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.5rem',color:'var(--ink)',lineHeight:1.3,marginBottom:'8px' }}>BSc Computer Science & Informatics</div>
          <div style={{ fontFamily:'Syne,sans-serif',fontSize:'0.9rem',color:'var(--muted)',marginBottom:'4px' }}>University of Johannesburg</div>
          <div style={{ fontFamily:'Syne,sans-serif',fontSize:'0.9rem',color:'var(--muted)',marginBottom:'4px' }}>Minor: Mathematics · IT Management</div>
          <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',color:'var(--muted)' }}>Studies completed: Nov 2025 · Ceremony: May 2026</div>
          <div style={{ display:'inline-block',marginTop:'16px',padding:'6px 14px',background:'var(--sage)',color:'white',fontFamily:'Space Mono,monospace',fontSize:'0.6rem',textTransform:'uppercase',letterSpacing:'0.15em' }}>#1 CS University in South Africa</div>
        </div>
      </div>
      <div>
        <div className="reveal" style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.8rem',color:'var(--ink)',marginBottom:'32px' }}>Notable Courses</div>
        <ul style={{ listStyle:'none' }}>
          {courses.map((c,i) => (
            <li key={i} className={`reveal reveal-delay-${i+1}`} style={{ display:'flex',alignItems:'center',gap:'20px',padding:'18px 0',borderBottom:'1px solid var(--border2)',fontSize:'0.9rem',color:'var(--slate2)' }}>
              <div style={{ width:'8px',height:'8px',background:'var(--rust)',borderRadius:'50%',flexShrink:0 }} />
              <div>
                <strong>{c.name}</strong><br />
                <span style={{ color:'var(--muted)',fontSize:'0.85rem' }}>{c.sub}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── Contact ─────────────────────────────────────────────── */
function Contact() {
  const links = [
    { icon:'✉', label:'chrisnergmqobo@gmail.com', href:'mailto:chrisnergmqobo@gmail.com' },
    { icon:'☎', label:'068 119 5373', href:'tel:+27681195373' },
    { icon:'↗', label:'LinkedIn', href:'https://linkedin.com/in/chrisnerg-mqobo-8a2607262' },
    { icon:'↗', label:'GitHub', href:'https://github.com/Chrisnerg' },
    { icon:'↓', label:'Download CV', href:'/Junior_software_engineer.pdf' },
  ]

  return (
    <section id="contact" style={{ padding:'160px 64px',background:'var(--cream)',textAlign:'center',borderTop:'1px solid var(--border2)',position:'relative',overflow:'hidden' }}>
      <div style={{ position:'absolute',fontFamily:'Bebas Neue,sans-serif',fontSize:'28vw',color:'var(--border2)',opacity:0.3,left:'50%',top:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',whiteSpace:'nowrap',lineHeight:1 }}>HIRE</div>
      <div className="reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',marginBottom:'32px' }}>Let's work together</div>
      <div className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(4rem,8vw,9rem)',lineHeight:0.9,color:'var(--ink)',marginBottom:'48px',position:'relative',zIndex:1 }}>
        Let's <span style={{ color:'var(--rust)' }}>Build</span><br />Something.
      </div>
      <div style={{ display:'flex',justifyContent:'center',gap:'20px',flexWrap:'wrap',position:'relative',zIndex:1 }}>
        {links.map((l,i) => (
          <a key={i} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
            className={`reveal reveal-delay-${i}`}
            style={{ display:'flex',alignItems:'center',gap:'10px',fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--muted)',textDecoration:'none',padding:'14px 0',borderBottom:'1px solid var(--border2)',transition:'color 0.3s,border-color 0.3s' }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--rust)';e.currentTarget.style.borderColor='var(--rust)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)';e.currentTarget.style.borderColor='var(--border2)'}}>
            <span>{l.icon}</span> {l.label}
          </a>
        ))}
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding:'40px 64px',borderTop:'1px solid var(--border2)',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
      <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',letterSpacing:'0.1em',color:'var(--ink)' }}>Chrisnerg Mqobo</div>
      <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.15em' }}>© 2026 · Full-Stack Engineer · Johannesburg, SA</div>
    </footer>
  )
}

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}
