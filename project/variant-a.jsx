// Variation A — "Forge Codex"
// Editorial dark fantasy. Big serif display, generous space, ember accents.
// Layout: full-bleed hero with monogram seal, then editorial sections.

const A_W = 1280;

const aStyles = {
  root: {
    width: A_W,
    background: '#0A0C10',
    color: '#E8E4D8',
    fontFamily: "'Inter', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #1a1d24',
    // subtle vignette
    backgroundImage:
      'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,16,46,0.08), transparent 60%),' +
      'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,16,46,0.04), transparent 60%)',
  },
  hero: {
    position: 'relative',
    padding: '88px 96px 96px',
    minHeight: 720,
    borderBottom: '1px solid #1a1d24',
    background:
      'linear-gradient(180deg, rgba(139,14,31,0.06) 0%, transparent 60%),' +
      'radial-gradient(circle at 20% 110%, rgba(200,16,46,0.10), transparent 50%)',
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.55)',
  },
  brandRow: { display: 'flex', alignItems: 'center', gap: 14 },
  brandText: {
    fontFamily: "'Cinzel', serif",
    fontSize: 14,
    letterSpacing: '0.32em',
    color: '#E8E4D8',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  navLinks: { display: 'flex', gap: 28 },
  heroBody: {
    marginTop: 140,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'end',
    gap: 60,
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 28,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  eyebrowLine: { display: 'inline-block', width: 36, height: 1, background: '#C8102E', opacity: 0.7 },
  hero1: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 600,
    fontSize: 104,
    lineHeight: 0.96,
    letterSpacing: '-0.01em',
    margin: 0,
    color: '#E8E4D8',
    textShadow: '0 0 40px rgba(200,16,46,0.12)',
  },
  hero1Accent: { color: '#8B0E1F', fontStyle: 'italic', fontWeight: 500 },
  heroTag: {
    marginTop: 36,
    fontFamily: "'Cinzel', serif",
    fontSize: 22,
    fontWeight: 400,
    fontStyle: 'italic',
    color: 'rgba(232,228,216,0.78)',
    maxWidth: 640,
    lineHeight: 1.4,
  },
  heroSub: {
    marginTop: 20,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.5)',
  },
  heroMeta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.45)',
    textAlign: 'right',
    lineHeight: 2,
  },

  section: { padding: '120px 96px', borderBottom: '1px solid #15181f', position: 'relative' },
  sectionHead: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr',
    gap: 60,
    marginBottom: 64,
    alignItems: 'baseline',
  },
  sectionIndex: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: '#C8102E',
  },
  sectionTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 44,
    fontWeight: 500,
    margin: 0,
    color: '#E8E4D8',
    letterSpacing: '0.01em',
  },
  sectionTitleAccent: { fontStyle: 'italic', color: 'rgba(232,228,216,0.5)', fontWeight: 400 },

  aboutGrid: { display: 'grid', gridTemplateColumns: '180px 1fr 320px', gap: 60 },
  aboutBody: {
    fontSize: 19,
    lineHeight: 1.6,
    color: 'rgba(232,228,216,0.82)',
    fontWeight: 300,
    maxWidth: 640,
  },
  aboutBodyDrop: {
    fontFamily: "'Cinzel', serif",
    fontSize: 64,
    fontWeight: 600,
    color: '#8B0E1F',
    float: 'left',
    lineHeight: 0.85,
    paddingRight: 14,
    paddingTop: 6,
  },
  aboutSidebar: {
    borderLeft: '1px solid #1a1d24',
    paddingLeft: 28,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.55)',
    lineHeight: 2.2,
  },
  aboutSidebarLabel: { color: '#C8102E', fontSize: 10 },
  aboutSidebarValue: { color: '#E8E4D8', fontSize: 12, letterSpacing: '0.08em' },

  // Project cards
  projectsList: { display: 'flex', flexDirection: 'column' },
  projectRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1.2fr 1fr 160px',
    gap: 40,
    padding: '36px 0',
    borderTop: '1px solid #15181f',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.4s, padding 0.4s',
    position: 'relative',
  },
  projectRowLast: { borderBottom: '1px solid #15181f' },
  projectGlyph: {
    fontFamily: "'Cinzel', serif",
    fontSize: 32,
    color: '#8B0E1F',
    letterSpacing: '0.1em',
    fontWeight: 500,
  },
  projectTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 28,
    color: '#E8E4D8',
    margin: 0,
    letterSpacing: '0.01em',
    fontWeight: 500,
  },
  projectKind: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.5)',
    marginTop: 10,
  },
  projectBlurb: {
    fontSize: 14,
    lineHeight: 1.55,
    color: 'rgba(232,228,216,0.65)',
    fontWeight: 300,
  },
  projectMeta: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.55)',
    textAlign: 'right',
    lineHeight: 2,
  },
  statusDot: {
    display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
    background: '#C8102E', boxShadow: '0 0 8px #C8102E', marginRight: 8,
    verticalAlign: 'middle',
  },

  // Skills
  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 },
  skillGroup: { borderTop: '1px solid #C8102E', paddingTop: 24 },
  skillGroupTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 22,
    fontWeight: 500,
    color: '#E8E4D8',
    margin: '0 0 24px',
  },
  skillItem: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: '0.1em',
    color: 'rgba(232,228,216,0.78)',
    padding: '10px 0',
    borderBottom: '1px solid #15181f',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillTick: { color: '#8B0E1F', fontSize: 10 },

  // Services
  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#15181f', border: '1px solid #15181f' },
  serviceCell: {
    background: '#0A0C10',
    padding: '40px 36px',
    minHeight: 180,
    position: 'relative',
    transition: 'background 0.3s',
  },
  serviceNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.2em',
    color: '#C8102E',
    marginBottom: 20,
  },
  serviceTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 24,
    fontWeight: 500,
    color: '#E8E4D8',
    margin: '0 0 14px',
  },
  serviceDesc: {
    fontSize: 14,
    lineHeight: 1.55,
    color: 'rgba(232,228,216,0.6)',
    fontWeight: 300,
  },

  // Links + footer
  linksGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: '#15181f', border: '1px solid #15181f' },
  linkCell: {
    background: '#0A0C10',
    padding: '28px 24px',
    transition: 'background 0.3s',
    cursor: 'pointer',
  },
  linkLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 14,
  },
  linkValue: {
    fontFamily: "'Cinzel', serif",
    fontSize: 16,
    color: '#E8E4D8',
    letterSpacing: '0.02em',
  },

  contactBlock: {
    padding: '120px 96px 80px',
    textAlign: 'center',
    position: 'relative',
    background:
      'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(200,16,46,0.10), transparent 60%)',
  },
  contactKicker: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 28,
  },
  contactHeadline: {
    fontFamily: "'Cinzel', serif",
    fontSize: 72,
    fontWeight: 500,
    margin: 0,
    color: '#E8E4D8',
    lineHeight: 1.05,
  },
  contactHeadlineItalic: { fontStyle: 'italic', color: '#8B0E1F', fontWeight: 400 },
  contactEmail: {
    display: 'inline-block',
    marginTop: 48,
    padding: '22px 48px',
    border: '1px solid #C8102E',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14,
    letterSpacing: '0.18em',
    color: '#E8E4D8',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.3s, color 0.3s',
    textDecoration: 'none',
  },

  footer: {
    padding: '32px 96px',
    borderTop: '1px solid #15181f',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.4)',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

function VariantA() {
  const rootRef = React.useRef(null);
  const [hoverProj, setHoverProj] = React.useState(null);
  const [hoverLink, setHoverLink] = React.useState(null);
  const [hoverServ, setHoverServ] = React.useState(null);

  const projects = RF_DATA.projects;

  return (
    <div ref={rootRef} style={aStyles.root}>
      <EmberCursor targetRef={rootRef} color="#C8102E" />

      {/* HERO */}
      <div style={aStyles.hero}>
        <EmberField density={45} color="#C8102E" tint="#FFB199" />

        {/* corner ticks */}
        <div style={{position:'absolute', top:24, left:24, width:14, height:14, borderTop:'1px solid #C8102E', borderLeft:'1px solid #C8102E', opacity:0.6}} />
        <div style={{position:'absolute', top:24, right:24, width:14, height:14, borderTop:'1px solid #C8102E', borderRight:'1px solid #C8102E', opacity:0.6}} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={aStyles.navRow}>
            <div style={aStyles.brandRow}>
              <ForgeSeal size={42} accent="#C8102E" />
              <div style={aStyles.brandText}>Reaperborn Forge</div>
            </div>
            <div style={aStyles.navLinks}>
              <span>About</span>
              <span>Projects</span>
              <span>Skills</span>
              <span>Services</span>
              <span>Contact</span>
            </div>
            <div style={{ color: '#C8102E' }}>● Available · 2026</div>
          </div>

          <div style={aStyles.heroBody}>
            <Reveal rootRef={rootRef}>
              <div style={aStyles.eyebrow}>
                <span style={aStyles.eyebrowLine}></span>
                Independent Game Studio · Est. 2023
              </div>
              <h1 style={aStyles.hero1}>
                Reaperborn<br />
                <span style={aStyles.hero1Accent}>Forge.</span>
              </h1>
              <div style={aStyles.heroTag}>
                Forging systems that play themselves into your habits — from mobile arcade to tactical RPGs.
              </div>
              <div style={aStyles.heroSub}>
                Game Design · Unity Development · F2P Systems
              </div>
            </Reveal>
            <Reveal rootRef={rootRef} delay={200}>
              <div style={aStyles.heroMeta}>
                <div>SCROLL TO ENTER</div>
                <div style={{ marginTop: 8, color: '#C8102E' }}>↓</div>
                <div style={{ marginTop: 56 }}>OTÁVIO ANTONIO</div>
                <div>GAME DESIGNER</div>
                <div>UNITY DEVELOPER</div>
                <div style={{ marginTop: 14, color: 'rgba(232,228,216,0.3)' }}>BRASIL · REMOTE</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section style={aStyles.section}>
        <div style={aStyles.sectionHead}>
          <Reveal rootRef={rootRef}><div style={aStyles.sectionIndex}>I · Codex</div></Reveal>
          <Reveal rootRef={rootRef} delay={120}>
            <h2 style={aStyles.sectionTitle}>The Forge <span style={aStyles.sectionTitleAccent}>& its keeper.</span></h2>
          </Reveal>
        </div>
        <div style={aStyles.aboutGrid}>
          <div></div>
          <Reveal rootRef={rootRef}>
            <div style={aStyles.aboutBody}>
              <span style={aStyles.aboutBodyDrop}>G</span>
              ame Designer and Unity Developer focused on systems, gameplay loops, and F2P economy design. Building games under the Reaperborn Forge studio — from mobile arcade to tactical multiplayer RPGs. Driven by the craft of making systems that feel good to play and keep players coming back.
            </div>
          </Reveal>
          <Reveal rootRef={rootRef} delay={180}>
            <div style={aStyles.aboutSidebar}>
              <div style={aStyles.aboutSidebarLabel}>Forge</div>
              <div style={aStyles.aboutSidebarValue}>Reaperborn</div>
              <div style={{ marginTop: 14 }}><span style={aStyles.aboutSidebarLabel}>Discipline</span></div>
              <div style={aStyles.aboutSidebarValue}>Systems / F2P</div>
              <div style={{ marginTop: 14 }}><span style={aStyles.aboutSidebarLabel}>Engine</span></div>
              <div style={aStyles.aboutSidebarValue}>Unity · C#</div>
              <div style={{ marginTop: 14 }}><span style={aStyles.aboutSidebarLabel}>Status</span></div>
              <div style={aStyles.aboutSidebarValue}><span style={aStyles.statusDot}></span>Open for collab</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={aStyles.section}>
        <div style={aStyles.sectionHead}>
          <Reveal rootRef={rootRef}><div style={aStyles.sectionIndex}>II · Works</div></Reveal>
          <Reveal rootRef={rootRef} delay={120}>
            <h2 style={aStyles.sectionTitle}>Forged <span style={aStyles.sectionTitleAccent}>artifacts.</span></h2>
          </Reveal>
        </div>
        <div style={aStyles.projectsList}>
          {projects.map((p, i) => {
            const isLast = i === projects.length - 1;
            const isHover = hoverProj === p.id;
            return (
              <Reveal key={p.id} rootRef={rootRef} delay={i * 80}>
                <div
                  style={{
                    ...aStyles.projectRow,
                    ...(isLast ? aStyles.projectRowLast : null),
                    background: isHover ? 'linear-gradient(90deg, rgba(139,14,31,0.10), transparent 80%)' : 'transparent',
                    paddingLeft: isHover ? 24 : 0,
                  }}
                  onMouseEnter={() => setHoverProj(p.id)}
                  onMouseLeave={() => setHoverProj(null)}
                >
                  {/* glow bar */}
                  <div style={{
                    position:'absolute', left:0, top:0, bottom:0, width:2,
                    background:'#C8102E',
                    boxShadow: isHover ? '0 0 16px #C8102E' : 'none',
                    opacity: isHover ? 1 : 0,
                    transition:'opacity .3s',
                  }} />
                  <div style={aStyles.projectGlyph}>{p.glyph}</div>
                  <div>
                    <h3 style={aStyles.projectTitle}>{p.title}</h3>
                    <div style={aStyles.projectKind}>{p.kind}</div>
                  </div>
                  <div style={aStyles.projectBlurb}>{p.blurb}</div>
                  <div style={aStyles.projectMeta}>
                    <div><span style={aStyles.statusDot}></span>{p.status}</div>
                    <div style={{ color: 'rgba(232,228,216,0.4)' }}>{p.year}</div>
                    <div style={{ color: '#C8102E', marginTop: 8 }}>→ {p.linkLabel}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SKILLS */}
      <section style={aStyles.section}>
        <div style={aStyles.sectionHead}>
          <Reveal rootRef={rootRef}><div style={aStyles.sectionIndex}>III · Arsenal</div></Reveal>
          <Reveal rootRef={rootRef} delay={120}>
            <h2 style={aStyles.sectionTitle}>Tools of <span style={aStyles.sectionTitleAccent}>the trade.</span></h2>
          </Reveal>
        </div>
        <div style={aStyles.skillsGrid}>
          {RF_DATA.skills.map((g, i) => (
            <Reveal key={g.group} rootRef={rootRef} delay={i * 100}>
              <div style={aStyles.skillGroup}>
                <h3 style={aStyles.skillGroupTitle}>{g.group}</h3>
                {g.items.map(s => (
                  <div key={s} style={aStyles.skillItem}>
                    <span>{s}</span>
                    <span style={aStyles.skillTick}>◆</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={aStyles.section}>
        <div style={aStyles.sectionHead}>
          <Reveal rootRef={rootRef}><div style={aStyles.sectionIndex}>IV · Commissions</div></Reveal>
          <Reveal rootRef={rootRef} delay={120}>
            <h2 style={aStyles.sectionTitle}>What I <span style={aStyles.sectionTitleAccent}>forge for you.</span></h2>
          </Reveal>
        </div>
        <Reveal rootRef={rootRef}>
          <div style={aStyles.servicesGrid}>
            {RF_DATA.services.map((s, i) => {
              const isHover = hoverServ === i;
              return (
                <div
                  key={s.title}
                  style={{
                    ...aStyles.serviceCell,
                    background: isHover ? '#0e1117' : '#0A0C10',
                  }}
                  onMouseEnter={() => setHoverServ(i)}
                  onMouseLeave={() => setHoverServ(null)}
                >
                  <div style={aStyles.serviceNum}>0{i + 1} / 0{RF_DATA.services.length}</div>
                  <h3 style={aStyles.serviceTitle}>{s.title}</h3>
                  <div style={aStyles.serviceDesc}>{s.desc}</div>
                  {isHover && (
                    <div style={{ position:'absolute', right: 24, top: 24, color:'#C8102E', fontSize:18 }}>+</div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* LINKS */}
      <section style={aStyles.section}>
        <div style={aStyles.sectionHead}>
          <Reveal rootRef={rootRef}><div style={aStyles.sectionIndex}>V · Conduits</div></Reveal>
          <Reveal rootRef={rootRef} delay={120}>
            <h2 style={aStyles.sectionTitle}>Where to <span style={aStyles.sectionTitleAccent}>find me.</span></h2>
          </Reveal>
        </div>
        <Reveal rootRef={rootRef}>
          <div style={aStyles.linksGrid}>
            {RF_DATA.links.map((l, i) => {
              const isHover = hoverLink === i;
              return (
                <a key={l.label} href={l.href}
                   target={l.href.startsWith('http') ? '_blank' : undefined}
                   rel="noreferrer"
                   style={{
                     ...aStyles.linkCell,
                     background: isHover ? '#0e1117' : '#0A0C10',
                     textDecoration:'none',
                   }}
                   onMouseEnter={() => setHoverLink(i)}
                   onMouseLeave={() => setHoverLink(null)}
                >
                  <div style={aStyles.linkLabel}>{l.label}</div>
                  <div style={{ ...aStyles.linkValue, color: isHover ? '#C8102E' : '#E8E4D8' }}>{l.value}</div>
                </a>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <div style={aStyles.contactBlock}>
        <Reveal rootRef={rootRef}>
          <div style={aStyles.contactKicker}>VI · Summon the smith</div>
          <h2 style={aStyles.contactHeadline}>
            Have a system <br />
            <span style={aStyles.contactHeadlineItalic}>worth forging?</span>
          </h2>
          <a href="mailto:reaperbornforge@gmail.com" style={aStyles.contactEmail}>
            reaperbornforge@gmail.com →
          </a>
        </Reveal>
      </div>

      <div style={aStyles.footer}>
        <span>© Reaperborn Forge · MMXXVI</span>
        <span>Forged in Unity · Tempered by iteration</span>
        <span>v.1.0</span>
      </div>
    </div>
  );
}

window.VariantA = VariantA;
window.A_W = A_W;
