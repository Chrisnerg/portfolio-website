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
      <nav ref={navRef} className="site-nav" style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'24px 48px',mixBlendMode:'multiply' }}>
        <a href="#" className="site-nav-logo" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',letterSpacing:'0.1em',color:'var(--ink)',textDecoration:'none' }}>CM</a>
        <div className="site-nav-links" style={{ display:'flex',gap:'36px' }}>
          {['About','Experience','Skills','Projects','Education','Contact'].map(l => (
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
      <section className="hero-section" style={{ minHeight:'100vh',display:'grid',gridTemplateColumns:'1fr 1fr',position:'relative',overflow:'hidden' }}>
        {/* Left */}
        <div className="hero-left" style={{ display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'160px 64px 80px 64px',position:'relative' }}>
          <div className="animate-fadeUp-1" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.25em',color:'var(--rust)',marginBottom:'24px' }}>
            — Available for opportunities
          </div>
          <h1 className="animate-fadeUp-2" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(5rem,9vw,10rem)',lineHeight:'0.88',letterSpacing:'-0.01em',color:'var(--ink)' }}>
            CHRISNERG<br /><span style={{ color:'var(--rust)' }}>MQOBO</span>
          </h1>
          <div className="animate-fadeUp-3" style={{ fontFamily:'DM Serif Display,serif',fontStyle:'italic',fontSize:'clamp(1.2rem,2.5vw,2rem)',color:'var(--muted)',marginTop:'20px' }}>
            Software Engineer
          </div>
          <p className="animate-fadeUp-4" style={{ fontSize:'0.95rem',lineHeight:'1.8',color:'var(--slate2)',maxWidth:'420px',marginTop:'32px' }}>
            Software Engineer with 1 year of professional experience building and supporting production software across cloud, web, desktop, backend, database, and real-time environments. Strongest in the JavaScript/TypeScript ecosystem.
          </p>
          <div className="animate-fadeUp-5 hero-actions" style={{ display:'flex',gap:'20px',alignItems:'center',marginTop:'48px' }}>
            <a href="/Chrisnerg_Mqobo_CV.pdf" target="_blank"
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
          <div className="animate-fadeUp-6 hero-scroll-hint" style={{ position:'absolute',bottom:'40px',left:'64px',display:'flex',alignItems:'center',gap:'16px',fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--muted)' }}>
            <div style={{ width:'40px',height:'1px',background:'var(--muted)' }} />
            Scroll to explore
          </div>
        </div>

        {/* Right */}
        <div className="hero-right" style={{ position:'relative',display:'flex',alignItems:'flex-end',justifyContent:'center',background:'var(--cream)',overflow:'hidden' }}>
          <div className="hero-watermark" style={{ position:'absolute',fontFamily:'Bebas Neue,sans-serif',fontSize:'40vw',color:'var(--border2)',opacity:0.3,top:'50%',left:'50%',transform:'translate(-50%,-50%)',whiteSpace:'nowrap',pointerEvents:'none',lineHeight:1 }}>CM</div>
          <img
              src={photoSrc}
              alt="Chrisnerg Mqobo"
              className="animate-fadeIn-1"
              style={{ position:'relative',zIndex:1,width:'100%',maxWidth:'480px',height:'100%',objectFit:'cover',objectPosition:'top' }}
          />
          {/* Stat badges */}
          <div className="hero-meta-top" style={{ position:'absolute',top:'48px',right:'48px',textAlign:'right',zIndex:2 }}>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.2em',textTransform:'uppercase' }}>Based in</div>
            <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',color:'var(--ink)',letterSpacing:'0.05em' }}>JHB, SA</div>
          </div>
          <div className="hero-meta-bottom" style={{ position:'absolute',bottom:'100px',right:'48px',zIndex:2 }}>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',color:'var(--muted)',letterSpacing:'0.2em',textTransform:'uppercase' }}>Status</div>
            <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',color:'var(--rust)',letterSpacing:'0.05em' }}>Open to Work</div>
          </div>
        </div>
      </section>
  )
}

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  const items = ['TypeScript','JavaScript','React','Next.js','Node.js','SQL Server','TanStack Query','Electron','WebSockets','Playwright','Docker','Python','OpenCV']
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
      <section id="about" className="about-section" style={{ padding:'140px 64px',display:'grid',gridTemplateColumns:'1fr 2fr',gap:'80px',alignItems:'start',borderTop:'1px solid var(--border2)' }}>
        <div>
          <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px' }}>
            <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
            About
          </div>
          <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'8rem',color:'var(--border2)',lineHeight:1,marginTop:'8px' }}>01</div>
        </div>
        <div>
          <h2 className="about-headline reveal" style={{ fontFamily:'DM Serif Display,serif',fontSize:'clamp(2rem,4vw,3.5rem)',lineHeight:1.15,color:'var(--ink)',marginBottom:'32px' }}>
            Building <em style={{ color:'var(--rust)',fontStyle:'italic' }}>production</em> software<br />across the stack.
          </h2>
          <p className="reveal" style={{ fontSize:'1rem',lineHeight:'1.85',color:'var(--slate2)',marginBottom:'24px' }}>
            Software Engineer with 1 year of professional experience building, shipping, and supporting production software across cloud, web, desktop, backend, database, and real-time environments. At Tontrac Systems Analytics, I contribute to the continuous development of our next-generation cloud platform using TypeScript, React, Next.js, TanStack Query, Node.js, and SQL Server.
          </p>
          <p className="reveal" style={{ fontSize:'1rem',lineHeight:'1.85',color:'var(--slate2)' }}>
            My broader experience includes Electron, WebSockets, REST APIs, Playwright automation, Python/OpenCV, production deployments, and troubleshooting in live environments. I hold a BSc in Computer Science and Informatics from the University of Johannesburg and I am currently working toward the AWS Certified Developer – Associate certification.
          </p>
          <div className="reveal about-stats" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'32px',marginTop:'48px',paddingTop:'48px',borderTop:'1px solid var(--border2)' }}>
            {[['50+','Operational Sites'],['100+','Students Mentored'],['1+','Year Production Experience']].map(([num,label]) => (
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
      year: 'Sep 2025 →',
      role: 'Junior Software Engineer',
      company: 'Tontrac Systems Analytics',
      location: 'Sandton, Gauteng',
      bullets: [
        'Contribute to the continuous development and rollout of Tontrac\'s next-generation cloud platform, delivering production features using Next.js, React, TypeScript, TanStack Query, Node.js services, and SQL Server.',
        'Deliver application features spanning UI development, API and service integrations, validation, permission controls, server-state management, and SQL Server stored-procedure-backed workflows.',
        'Develop and maintain real-time monitoring and desktop systems using React, TypeScript, Electron, Node.js, secure IPC, and WebSockets across 50+ operational environments.',
        'Build Playwright end-to-end test suites covering critical production workflows, reducing repetitive manual regression testing and improving release confidence.',
        'Contribute to Python/OpenCV computer-vision functionality including OCR and license-plate recognition used for automated data capture and validation.',
        'Engineer Windows OS integrations using Registry APIs and Win32 messaging, and support production deployments, configuration, troubleshooting, and technical support.',
        'Support the onboarding and technical development of a YES Programme intern, helping her learn the technology stack, internal systems, development workflows, debugging practices, and business operations alongside senior engineers.',
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
      <section id="experience" className="experience-section" style={{ padding:'140px 64px',background:'var(--cream)',borderTop:'1px solid var(--border2)' }}>
        <div className="experience-head" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'80px' }}>
          <div>
            <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
              <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
              Work History
            </div>
            <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(3rem,6vw,6rem)',color:'var(--ink)',lineHeight:1 }}>Experience</h2>
          </div>
          <a href="/Chrisnerg_Mqobo_CV.pdf" target="_blank"
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
    { icon:'💻', cat:'Languages', name:'Languages', tags:['TypeScript','JavaScript','Python','SQL (T-SQL)','HTML5','CSS3'] },
    { icon:'⚡', cat:'Frontend', name:'Frontend', tags:['React','Next.js','Tailwind CSS','TanStack Query','Responsive UI'] },
    { icon:'🔧', cat:'Backend', name:'Backend', tags:['Node.js','Express.js','REST APIs','WebSockets','Authentication','Data Validation'] },
    { icon:'🗄️', cat:'Databases', name:'Databases', tags:['SQL Server','PostgreSQL'] },
    { icon:'🖥️', cat:'Desktop & Systems', name:'Desktop & Systems', tags:['Electron','IPC Architecture','Real-Time Systems','Windows Registry / Win32 APIs'] },
    { icon:'🧪', cat:'Testing & Tools', name:'Testing & Tools', tags:['Playwright','End-to-End Testing','Git','GitHub','Docker','CI/CD','Postman'] },
    { icon:'👁️', cat:'Computer Vision', name:'Computer Vision', tags:['OpenCV','OCR','License-Plate Recognition'] },
  ]

  return (
      <section id="skills" className="skills-section" style={{ padding:'140px 64px',borderTop:'1px solid var(--border2)' }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'0' }}>
          <div>
            <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
              <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
              Capabilities
            </div>
            <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(3rem,6vw,6rem)',color:'var(--ink)',lineHeight:1 }}>Skills</h2>
          </div>
        </div>
        <div className="reveal skills-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:'80px',borderTop:'1px solid var(--border2)',borderLeft:'1px solid var(--border2)' }}>
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
    { num:'01', type:'Electron · Desktop App', name:'Real-Time Monitoring Dashboard', desc:'Production monitoring functionality built with React, TypeScript, Electron, Node.js, secure IPC communication, and WebSockets for live application and device-state updates across operational environments.', stack:['Electron','React','TypeScript','Node.js','WebSockets','IPC Architecture'], link:null },
    { num:'02', type:'Windows · Desktop Tooling', name:'Windows Configuration Tooling', desc:'Windows OS integrations using Registry APIs and Win32 messaging to automate system configuration and reduce repetitive setup on client machines.', stack:['Electron','Windows Registry / Win32 APIs'], link:null },
    { num:'03', type:'Full-Stack · Web App', name:'URL Shortener', desc:'Full-stack URL shortening service with click analytics built using TypeScript, Node.js, Express.js, and React. Includes REST API input validation, short-code generation, and persistent link storage.', stack:['TypeScript','Node.js','Express.js','React','REST APIs','Data Validation'], link:'https://github.com/Chrisnerg/url-shortener-fullstack' },
    { num:'04', type:'Node.js · Automation Tool', name:'Web Content Scraper', desc:'Node.js tool that automates the extraction of structured content from web pages.', stack:['Node.js','JavaScript'], link:'https://github.com/Chrisnerg/Web-Content-Scraper' },
  ]

  return (
      <section id="projects" className="projects-section" style={{ padding:'140px 64px',background:'var(--ink)',borderTop:'1px solid var(--border2)' }}>
        <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
          <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
          Work
        </div>
        <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(3rem,6vw,6rem)',color:'var(--paper)',lineHeight:1 }}>Projects</h2>
        <div className="projects-grid" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginTop:'60px',background:'#1a1a1a' }}>
          {projects.map((p, i) => {
            const Tag = p.link ? 'a' : 'div'
            const linkProps = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {}
            return (
                <Tag key={i} {...linkProps}
                     className={`project-card reveal reveal-delay-${i%2 === 0 ? 1 : 2}`}
                     style={{ background:'var(--ink)',padding:'56px 48px',display:'block',textDecoration:'none',transition:'background 0.4s',cursor: p.link ? 'pointer' : 'default' }}>
                  <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'5rem',color:'#1f1f1f',lineHeight:1,marginBottom:'-20px' }}>{p.num}</div>
                  <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)',marginBottom:'12px' }}>{p.type}</div>
                  <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'2rem',color:'var(--paper)',marginBottom:'16px',lineHeight:1.2 }}>{p.name}</div>
                  <p style={{ fontSize:'0.88rem',lineHeight:'1.75',color:'#9a9a9a',marginBottom:'28px' }}>{p.desc}</p>
                  <div style={{ display:'flex',flexWrap:'wrap',gap:'8px' }}>
                    {p.stack.map(tech => (
                        <span key={tech} style={{ fontFamily:'Space Mono,monospace',fontSize:'0.6rem',padding:'5px 10px',border:'1px solid #2a2a2a',color:'#6a6a6a',letterSpacing:'0.1em',transition:'border-color 0.3s,color 0.3s' }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{ display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'24px',fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color: p.link ? 'var(--rust)' : '#5a5a5a' }}>
                    {p.link ? <>View on GitHub <span>↗</span></> : <>Professional Work · Code Private</>}
                  </div>
                </Tag>
            )})}
        </div>
      </section>
  )
}

/* ── Education ──────────────────────────────────────────── */
function Education() {
  return (
      <section id="education" className="education-section" style={{ padding:'140px 64px',borderTop:'1px solid var(--border2)',display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'100px' }}>
        <div>
          <div className="section-label reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px' }}>
            <span style={{ width:'24px',height:'1px',background:'var(--rust)',flexShrink:0,display:'inline-block' }} />
            Education
          </div>
          <h2 className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(2.5rem,5vw,5rem)',color:'var(--ink)',lineHeight:1 }}>Academic<br />Background</h2>
          <div className="reveal education-card" style={{ marginTop:'48px',padding:'40px',border:'1px solid var(--border2)',transition:'border-color 0.3s' }}
               onMouseEnter={e=>e.currentTarget.style.borderColor='var(--rust)'}
               onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border2)'}>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)',marginBottom:'12px' }}>Degree</div>
            <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.5rem',color:'var(--ink)',lineHeight:1.3,marginBottom:'8px' }}>BSc Computer Science & Informatics</div>
            <div style={{ fontFamily:'Syne,sans-serif',fontSize:'0.9rem',color:'var(--muted)',marginBottom:'4px' }}>University of Johannesburg</div>
            <div style={{ fontFamily:'Syne,sans-serif',fontSize:'0.9rem',color:'var(--muted)',marginBottom:'4px' }}>Minor: Mathematics · IT Management</div>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',color:'var(--muted)' }}>Completed: May 2026</div>
          </div>
        </div>
        <div>
          <div className="reveal" style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.8rem',color:'var(--ink)',marginBottom:'32px' }}>Certification</div>
          <div className="reveal education-card" style={{ padding:'40px',border:'1px solid var(--border2)',transition:'border-color 0.3s' }}
               onMouseEnter={e=>e.currentTarget.style.borderColor='var(--rust)'}
               onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border2)'}>
            <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.2em',color:'var(--rust)',marginBottom:'12px' }}>In Progress · 2026</div>
            <div style={{ fontFamily:'DM Serif Display,serif',fontSize:'1.5rem',color:'var(--ink)',lineHeight:1.3,marginBottom:'8px' }}>AWS Certified Developer – Associate</div>
            <div style={{ fontFamily:'Syne,sans-serif',fontSize:'0.9rem',color:'var(--muted)' }}>Amazon Web Services</div>
          </div>
        </div>
      </section>
  )
}

/* ── Contact ─────────────────────────────────────────────── */
function Contact() {
  const links = [
    { icon:'✉', label:'chrisnergmqobo@gmail.com', href:'mailto:chrisnergmqobo@gmail.com' },
    { icon:'☎', label:'068 119 5373', href:'tel:+27681195373' },
    { icon:'↗', label:'LinkedIn', href:'https://www.linkedin.com/in/chrisnerg-mqobo/' },
    { icon:'↗', label:'GitHub', href:'https://github.com/Chrisnerg' },
    { icon:'↓', label:'Download CV', href:'/Chrisnerg_Mqobo_CV.pdf' },
  ]

  return (
      <section id="contact" className="contact-section" style={{ padding:'160px 64px',background:'var(--cream)',textAlign:'center',borderTop:'1px solid var(--border2)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',fontFamily:'Bebas Neue,sans-serif',fontSize:'28vw',color:'var(--border2)',opacity:0.3,left:'50%',top:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',whiteSpace:'nowrap',lineHeight:1 }}>HIRE</div>
        <div className="reveal" style={{ fontFamily:'Space Mono,monospace',fontSize:'0.72rem',textTransform:'uppercase',letterSpacing:'0.3em',color:'var(--rust)',marginBottom:'32px' }}>Let's work together</div>
        <div className="reveal" style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(4rem,8vw,9rem)',lineHeight:0.9,color:'var(--ink)',marginBottom:'48px',position:'relative',zIndex:1 }}>
          Let's <span style={{ color:'var(--rust)' }}>Build</span><br />Something.
        </div>
        <div className="contact-links" style={{ display:'flex',justifyContent:'center',gap:'20px',flexWrap:'wrap',position:'relative',zIndex:1 }}>
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
      <footer className="site-footer" style={{ padding:'40px 64px',borderTop:'1px solid var(--border2)',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div style={{ fontFamily:'Bebas Neue,sans-serif',fontSize:'1.4rem',letterSpacing:'0.1em',color:'var(--ink)' }}>Chrisnerg Mqobo</div>
        <div style={{ fontFamily:'Space Mono,monospace',fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.15em' }}>© 2026 · Software Engineer · Johannesburg, SA</div>
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
