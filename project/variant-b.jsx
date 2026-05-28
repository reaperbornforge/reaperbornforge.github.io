// Variation B — "Tactical Dossier"
// HUD-like, denser, technical. Grid lines, monospace metadata, terminal feel.
// Same content, different vocabulary — feels like a game design document.

const B_W = 1280;

const bStyles = {
  root: {
    width: B_W,
    background: '#0A0C10',
    color: '#E8E4D8',
    fontFamily: "'Inter', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #1a1d24',
    backgroundImage:
      'linear-gradient(rgba(232,228,216,0.025) 1px, transparent 1px),' +
      'linear-gradient(90deg, rgba(232,228,216,0.025) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
  },
  // top status bar
  statusBar: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: 24,
    alignItems: 'center',
    padding: '14px 32px',
    borderBottom: '1px solid #1a1d24',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.55)',
    background: 'rgba(13,16,22,0.7)',
  },
  statusDots: { display: 'flex', gap: 18, justifyContent: 'center' },
  statusDot: { display: 'flex', alignItems: 'center', gap: 8 },
  dotLed: (c) => ({ width: 6, height: 6, borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}` }),

  hero: {
    position: 'relative',
    padding: '64px 64px 80px',
    minHeight: 680,
    overflow: 'hidden',
    borderBottom: '1px solid #1a1d24',
    background:
      'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(200,16,46,0.10), transparent 60%),' +
      'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(139,14,31,0.08), transparent 60%)',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: 64,
    alignItems: 'stretch',
    height: '100%',
    minHeight: 540,
    marginTop: 32,
  },
  heroLeft: { display:'flex', flexDirection:'column', justifyContent:'space-between' },
  heroCallsign: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  heroTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 96,
    fontWeight: 600,
    lineHeight: 0.94,
    margin: 0,
    color: '#E8E4D8',
    letterSpacing: '-0.005em',
  },
  heroTitleSub: { color: '#8B0E1F', fontStyle: 'italic', fontWeight: 500, fontSize: 84 },
  heroTag: {
    marginTop: 36,
    fontSize: 18,
    lineHeight: 1.5,
    color: 'rgba(232,228,216,0.78)',
    fontWeight: 300,
    maxWidth: 580,
  },
  heroChips: { marginTop: 32, display:'flex', gap: 10, flexWrap:'wrap' },
  chip: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: '8px 14px',
    border: '1px solid #1f2530',
    color: 'rgba(232,228,216,0.75)',
    background: 'rgba(15,18,25,0.6)',
  },
  chipAccent: {
    border: '1px solid rgba(200,16,46,0.5)',
    color: '#C8102E',
    background: 'rgba(200,16,46,0.06)',
  },

  // dossier card on the right
  dossier: {
    border: '1px solid #1a1d24',
    background: 'rgba(13,16,22,0.85)',
    padding: 28,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.08em',
    color: 'rgba(232,228,216,0.7)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    position: 'relative',
  },
  dossierHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottom: '1px dashed #2a2f3a',
    color: '#C8102E',
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  dRow: { display: 'grid', gridTemplateColumns: '90px 1fr', gap: 14 },
  dKey: { color: 'rgba(232,228,216,0.4)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 10 },
  dVal: { color: '#E8E4D8' },
  dBar: { height: 4, background: '#15181f', position: 'relative', marginTop: 4 },
  dBarFill: (pct) => ({ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: '#C8102E', boxShadow: '0 0 8px #C8102E' }),

  section: { padding: '80px 64px', borderBottom: '1px solid #15181f', position: 'relative' },
  sectionTag: {
    position: 'absolute',
    top: 24,
    right: 32,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.35)',
  },
  sectionHead: { marginBottom: 48, display:'flex', alignItems:'baseline', gap: 24, borderBottom:'1px solid #15181f', paddingBottom: 24 },
  sectionNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.24em',
    color: '#C8102E',
  },
  sectionTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 36,
    fontWeight: 500,
    margin: 0,
    color: '#E8E4D8',
    letterSpacing: '0.01em',
  },
  sectionLine: { flex: 1, height: 1, background: '#15181f' },

  // ABOUT
  aboutBox: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 48,
    alignItems: 'start',
  },
  aboutText: {
    fontSize: 17,
    lineHeight: 1.65,
    color: 'rgba(232,228,216,0.82)',
    fontWeight: 300,
  },
  statBox: {
    border: '1px solid #1a1d24',
    background: 'rgba(15,18,25,0.5)',
    padding: 24,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 1,
    backgroundColor: '#15181f',
  },
  statCell: {
    background: '#0A0C10',
    padding: 18,
    fontFamily: "'JetBrains Mono', monospace",
  },
  statKey: {
    fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.5)',
  },
  statValue: {
    fontFamily: "'Cinzel', serif",
    fontSize: 28,
    color: '#E8E4D8',
    marginTop: 6,
    fontWeight: 500,
  },
  statValueAccent: { color: '#C8102E' },

  // PROJECTS — card grid
  projectsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
  projectCard: {
    border: '1px solid #1a1d24',
    background: 'rgba(15,18,25,0.5)',
    padding: 28,
    position: 'relative',
    transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  projectCardWide: { gridColumn: 'span 2' },
  projectCardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  projectCardGlyph: {
    fontFamily: "'Cinzel', serif",
    fontSize: 20,
    color: '#8B0E1F',
    letterSpacing: '0.12em',
    border: '1px solid #2a2f3a',
    padding: '4px 10px',
  },
  projectCardStatus: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.18em',
    color: 'rgba(232,228,216,0.55)',
    textTransform: 'uppercase',
  },
  projectCardTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 26,
    fontWeight: 500,
    color: '#E8E4D8',
    margin: '0 0 6px',
    letterSpacing: '0.01em',
  },
  projectCardKind: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 18,
  },
  projectCardBlurb: {
    fontSize: 13,
    lineHeight: 1.6,
    color: 'rgba(232,228,216,0.7)',
    fontWeight: 300,
    marginBottom: 22,
  },
  projectCardFoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.55)',
    paddingTop: 16,
    borderTop: '1px dashed #2a2f3a',
  },
  stackRow: { display:'flex', gap: 6, flexWrap:'wrap' },
  stackPill: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    padding: '4px 8px',
    border: '1px solid #2a2f3a',
    color: 'rgba(232,228,216,0.65)',
  },

  // SKILLS — bars
  skillsBox: { display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 32 },
  skillCol: { borderTop: '1px solid #C8102E', paddingTop: 18 },
  skillColHead: {
    fontFamily: "'Cinzel', serif",
    fontSize: 18,
    fontWeight: 500,
    color: '#E8E4D8',
    margin: '0 0 18px',
    letterSpacing: '0.04em',
  },
  skillRow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.06em',
    color: 'rgba(232,228,216,0.78)',
    padding: '12px 0',
    borderBottom: '1px solid #15181f',
    display:'flex',
    justifyContent:'space-between',
  },
  skillLevel: { color: '#C8102E', fontSize: 9, letterSpacing: '0.18em' },

  // SERVICES — list
  servicesList: { display: 'flex', flexDirection: 'column' },
  serviceRow: {
    display: 'grid',
    gridTemplateColumns: '60px 240px 1fr 60px',
    gap: 24,
    padding: '24px 0',
    alignItems: 'center',
    borderTop: '1px solid #15181f',
    transition: 'background 0.3s, padding-left 0.3s',
    cursor: 'pointer',
  },
  serviceNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.18em',
    color: '#C8102E',
  },
  serviceName: {
    fontFamily: "'Cinzel', serif",
    fontSize: 22,
    fontWeight: 500,
    color: '#E8E4D8',
    letterSpacing: '0.01em',
  },
  serviceTxt: {
    fontSize: 14,
    lineHeight: 1.55,
    color: 'rgba(232,228,216,0.65)',
    fontWeight: 300,
  },
  serviceArrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14,
    color: '#C8102E',
    textAlign: 'right',
  },

  // LINKS
  linksRow: {
    display:'grid',
    gridTemplateColumns:'repeat(5, 1fr)',
    gap: 12,
  },
  linkBox: {
    border: '1px solid #1a1d24',
    background: 'rgba(15,18,25,0.5)',
    padding: '22px 20px',
    cursor: 'pointer',
    transition: 'border-color 0.3s, background 0.3s',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  linkBoxLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: '#C8102E',
    marginBottom: 12,
  },
  linkBoxVal: {
    fontFamily: "'Cinzel', serif",
    fontSize: 14,
    color: '#E8E4D8',
    letterSpacing: '0.02em',
  },

  // CONTACT terminal
  contact: {
    padding: '80px 64px',
    background:
      'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,16,46,0.10), transparent 60%)',
  },
  terminal: {
    border: '1px solid #2a2f3a',
    background: 'rgba(8,10,14,0.85)',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: '#E8E4D8',
    overflow: 'hidden',
  },
  terminalBar: {
    background: '#15181f',
    padding: '10px 16px',
    fontSize: 10,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: 'rgba(232,228,216,0.6)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2a2f3a',
  },
  terminalBody: { padding: '32px 36px', lineHeight: 1.9 },
  termPrompt: { color: '#C8102E' },
  termHeadline: {
    fontFamily: "'Cinzel', serif",
    fontSize: 48,
    fontWeight: 500,
    color: '#E8E4D8',
    margin: '20px 0 8px',
    letterSpacing: '0.01em',
  },
  termHeadItalic: { fontStyle: 'italic', color: '#8B0E1F', fontWeight: 400 },
  termCta: {
    display: 'inline-block',
    marginTop: 20,
    padding: '14px 28px',
    background: '#C8102E',
    color: '#0A0C10',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'background 0.3s',
  },

  footer: {
    padding: '20px 64px',
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

const skillLevels = {
  'Game Design': 'expert', 'Systems Design': 'expert', 'Progression Design': 'expert',
  'F2P Economy Design': 'expert', 'Gameplay Design': 'expert', 'UI/UX for Games': 'advanced',
  'Unity': 'expert', 'C#': 'expert', 'Git': 'advanced',
  'Firebase / Firestore': 'advanced', 'PlayFab / Azure': 'advanced',
  'Prototyping': 'expert', 'QA Basics': 'advanced', 'LiveOps Mindset': 'advanced', 'Data-Driven Tuning': 'advanced',
};

function VariantB() {
  const rootRef = React.useRef(null);
  const [hoverProj, setHoverProj] = React.useState(null);
  const [hoverServ, setHoverServ] = React.useState(null);
  const [hoverLink, setHoverLink] = React.useState(null);

  return (
    <div ref={rootRef} style={bStyles.root}>
      <EmberCursor targetRef={rootRef} color="#C8102E" />

      {/* status bar */}
      <div style={bStyles.statusBar}>
        <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
          <ForgeSeal size={28} accent="#C8102E" />
          <span style={{ fontFamily:"'Cinzel', serif", letterSpacing:'0.32em', color:'#E8E4D8' }}>RF · DOSSIER</span>
        </div>
        <div style={bStyles.statusDots}>
          <div style={bStyles.statusDot}><span style={bStyles.dotLed('#C8102E')}></span>SIGNAL</div>
          <div style={bStyles.statusDot}><span style={bStyles.dotLed('#8B0E1F')}></span>FORGE ACTIVE</div>
          <div style={bStyles.statusDot}><span style={bStyles.dotLed('rgba(232,228,216,0.6)')}></span>BRASIL · REMOTE</div>
        </div>
        <div>FILE · RFB-001 / MMXXVI</div>
      </div>

      {/* HERO */}
      <div style={bStyles.hero}>
        <EmberField density={36} color="#C8102E" tint="#FFB199" />

        <div style={{ position:'relative', zIndex: 2 }}>
          <Reveal rootRef={rootRef}>
            <div style={bStyles.heroCallsign}>
              <span style={{ display:'inline-block', width:36, height:1, background:'#C8102E', opacity:0.7 }}></span>
              CALLSIGN · zDarkReaper · OTÁVIO ANTONIO
            </div>
          </Reveal>

          <div style={bStyles.heroGrid}>
            <div style={bStyles.heroLeft}>
              <Reveal rootRef={rootRef} delay={80}>
                <h1 style={bStyles.heroTitle}>
                  Reaperborn<br />
                  <span style={bStyles.heroTitleSub}>Forge</span><span style={{color:'#8B0E1F'}}>.</span>
                </h1>
                <div style={bStyles.heroTag}>
                  Independent game studio &amp; design dossier — forging systems that play themselves into your habits, from mobile arcade to tactical multiplayer RPGs.
                </div>
                <div style={bStyles.heroChips}>
                  <span style={{ ...bStyles.chip, ...bStyles.chipAccent }}>● Open for collab</span>
                  <span style={bStyles.chip}>Unity · C#</span>
                  <span style={bStyles.chip}>Systems Design</span>
                  <span style={bStyles.chip}>F2P Economy</span>
                  <span style={bStyles.chip}>LiveOps</span>
                </div>
              </Reveal>
            </div>

            {/* dossier card */}
            <Reveal rootRef={rootRef} delay={200}>
              <div style={bStyles.dossier}>
                <div style={bStyles.dossierHead}>
                  <span>// OPERATOR FILE</span>
                  <span>v.1.0</span>
                </div>
                <div style={bStyles.dRow}><span style={bStyles.dKey}>Operator</span><span style={bStyles.dVal}>Otávio Antonio</span></div>
                <div style={bStyles.dRow}><span style={bStyles.dKey}>Forge</span><span style={bStyles.dVal}>Reaperborn · Est. 2023</span></div>
                <div style={bStyles.dRow}><span style={bStyles.dKey}>Class</span><span style={bStyles.dVal}>Game Designer / Unity Dev</span></div>
                <div style={bStyles.dRow}><span style={bStyles.dKey}>Region</span><span style={bStyles.dVal}>Brasil · Remote</span></div>
                <div style={bStyles.dRow}><span style={bStyles.dKey}>Discipline</span><span style={bStyles.dVal}>Systems · F2P · LiveOps</span></div>
                <div style={bStyles.dRow}><span style={bStyles.dKey}>Engine</span><span style={bStyles.dVal}>Unity · C#</span></div>
                <div style={{ marginTop: 6 }}>
                  <div style={bStyles.dKey}>Active projects</div>
                  <div style={bStyles.dBar}><div style={bStyles.dBarFill(72)}></div></div>
                  <div style={{ ...bStyles.dKey, marginTop: 14 }}>Forge load</div>
                  <div style={bStyles.dBar}><div style={bStyles.dBarFill(86)}></div></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section style={bStyles.section}>
        <span style={bStyles.sectionTag}>// 01 · CODEX</span>
        <div style={bStyles.sectionHead}>
          <span style={bStyles.sectionNum}>§01</span>
          <h2 style={bStyles.sectionTitle}>Codex entry</h2>
          <span style={bStyles.sectionLine}></span>
        </div>
        <div style={bStyles.aboutBox}>
          <Reveal rootRef={rootRef}>
            <div style={bStyles.aboutText}>{RF_DATA.about}</div>
          </Reveal>
          <Reveal rootRef={rootRef} delay={150}>
            <div style={bStyles.statBox}>
              <div style={bStyles.statCell}>
                <div style={bStyles.statKey}>Active titles</div>
                <div style={bStyles.statValue}>03</div>
              </div>
              <div style={bStyles.statCell}>
                <div style={bStyles.statKey}>Years forging</div>
                <div style={bStyles.statValue}>03+</div>
              </div>
              <div style={bStyles.statCell}>
                <div style={bStyles.statKey}>Engines</div>
                <div style={bStyles.statValue}>Unity</div>
              </div>
              <div style={bStyles.statCell}>
                <div style={bStyles.statKey}>Status</div>
                <div style={{ ...bStyles.statValue, ...bStyles.statValueAccent }}>Open</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={bStyles.section}>
        <span style={bStyles.sectionTag}>// 02 · ARTIFACTS</span>
        <div style={bStyles.sectionHead}>
          <span style={bStyles.sectionNum}>§02</span>
          <h2 style={bStyles.sectionTitle}>Artifacts in the forge</h2>
          <span style={bStyles.sectionLine}></span>
        </div>
        <div style={bStyles.projectsGrid}>
          {RF_DATA.projects.map((p, i) => {
            const isHover = hoverProj === p.id;
            const wide = i === 0;
            return (
              <Reveal key={p.id} rootRef={rootRef} delay={i * 70}>
                <div
                  style={{
                    ...bStyles.projectCard,
                    ...(wide ? bStyles.projectCardWide : null),
                    borderColor: isHover ? '#C8102E' : '#1a1d24',
                    background: isHover ? 'rgba(200,16,46,0.05)' : 'rgba(15,18,25,0.5)',
                    boxShadow: isHover ? '0 0 32px rgba(200,16,46,0.15) inset' : 'none',
                  }}
                  onMouseEnter={() => setHoverProj(p.id)}
                  onMouseLeave={() => setHoverProj(null)}
                >
                  {/* glow corner */}
                  <div style={{
                    position:'absolute', top:0, right:0, width:60, height:60,
                    background: 'radial-gradient(circle at top right, rgba(200,16,46,0.4), transparent 70%)',
                    opacity: isHover ? 1 : 0, transition:'opacity .3s',
                  }} />
                  <div style={bStyles.projectCardHead}>
                    <span style={bStyles.projectCardGlyph}>{p.glyph}</span>
                    <span style={bStyles.projectCardStatus}>
                      <span style={{ ...bStyles.dotLed('#C8102E'), display:'inline-block', marginRight: 8, verticalAlign:'middle' }}></span>
                      {p.status}
                    </span>
                  </div>
                  <h3 style={bStyles.projectCardTitle}>{p.title}</h3>
                  <div style={bStyles.projectCardKind}>{p.kind} · {p.year}</div>
                  <div style={bStyles.projectCardBlurb}>{p.blurb}</div>
                  <div style={bStyles.stackRow}>
                    {p.stack.map(s => <span key={s} style={bStyles.stackPill}>{s}</span>)}
                  </div>
                  <div style={{ ...bStyles.projectCardFoot, marginTop: 18 }}>
                    <span>{p.linkLabel}</span>
                    <span style={{ color:'#C8102E' }}>→</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SKILLS */}
      <section style={bStyles.section}>
        <span style={bStyles.sectionTag}>// 03 · ARSENAL</span>
        <div style={bStyles.sectionHead}>
          <span style={bStyles.sectionNum}>§03</span>
          <h2 style={bStyles.sectionTitle}>Arsenal</h2>
          <span style={bStyles.sectionLine}></span>
        </div>
        <div style={bStyles.skillsBox}>
          {RF_DATA.skills.map((g, i) => (
            <Reveal key={g.group} rootRef={rootRef} delay={i * 100}>
              <div style={bStyles.skillCol}>
                <h3 style={bStyles.skillColHead}>{g.group}</h3>
                {g.items.map(s => (
                  <div key={s} style={bStyles.skillRow}>
                    <span>{s}</span>
                    <span style={bStyles.skillLevel}>{(skillLevels[s] || 'core').toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={bStyles.section}>
        <span style={bStyles.sectionTag}>// 04 · COMMISSIONS</span>
        <div style={bStyles.sectionHead}>
          <span style={bStyles.sectionNum}>§04</span>
          <h2 style={bStyles.sectionTitle}>Commissions accepted</h2>
          <span style={bStyles.sectionLine}></span>
        </div>
        <div style={bStyles.servicesList}>
          {RF_DATA.services.map((s, i) => {
            const isHover = hoverServ === i;
            return (
              <Reveal key={s.title} rootRef={rootRef} delay={i * 60}>
                <div
                  style={{
                    ...bStyles.serviceRow,
                    background: isHover ? 'linear-gradient(90deg, rgba(200,16,46,0.06), transparent 80%)' : 'transparent',
                    paddingLeft: isHover ? 16 : 0,
                  }}
                  onMouseEnter={() => setHoverServ(i)}
                  onMouseLeave={() => setHoverServ(null)}
                >
                  <span style={bStyles.serviceNum}>0{i + 1}</span>
                  <span style={bStyles.serviceName}>{s.title}</span>
                  <span style={bStyles.serviceTxt}>{s.desc}</span>
                  <span style={bStyles.serviceArrow}>→</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* LINKS */}
      <section style={bStyles.section}>
        <span style={bStyles.sectionTag}>// 05 · CONDUITS</span>
        <div style={bStyles.sectionHead}>
          <span style={bStyles.sectionNum}>§05</span>
          <h2 style={bStyles.sectionTitle}>Conduits</h2>
          <span style={bStyles.sectionLine}></span>
        </div>
        <Reveal rootRef={rootRef}>
          <div style={bStyles.linksRow}>
            {RF_DATA.links.map((l, i) => {
              const isHover = hoverLink === i;
              return (
                <a key={l.label} href={l.href}
                   target={l.href.startsWith('http') ? '_blank' : undefined}
                   rel="noreferrer"
                   style={{
                     ...bStyles.linkBox,
                     borderColor: isHover ? '#C8102E' : '#1a1d24',
                     background: isHover ? 'rgba(200,16,46,0.05)' : 'rgba(15,18,25,0.5)',
                   }}
                   onMouseEnter={() => setHoverLink(i)}
                   onMouseLeave={() => setHoverLink(null)}
                >
                  <div style={bStyles.linkBoxLabel}>{l.label}</div>
                  <div style={bStyles.linkBoxVal}>{l.value}</div>
                </a>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <div style={bStyles.contact}>
        <Reveal rootRef={rootRef}>
          <div style={bStyles.terminal}>
            <div style={bStyles.terminalBar}>
              <span>// SIGNAL · OUTBOUND</span>
              <span>STATUS · LISTENING</span>
            </div>
            <div style={bStyles.terminalBody}>
              <div><span style={bStyles.termPrompt}>$</span> ping reaperbornforge --status</div>
              <div style={{ color:'rgba(232,228,216,0.6)' }}>&gt; signal acquired · forge online · ready for commissions</div>
              <h2 style={bStyles.termHeadline}>
                Have a system <span style={bStyles.termHeadItalic}>worth forging?</span>
              </h2>
              <div style={{ color:'rgba(232,228,216,0.6)', marginBottom: 8 }}>
                Drop a line. Game design, systems consulting, Unity collaboration — all signals welcome.
              </div>
              <a href="mailto:reaperbornforge@gmail.com" style={bStyles.termCta}>
                reaperbornforge@gmail.com →
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div style={bStyles.footer}>
        <span>© Reaperborn Forge · MMXXVI</span>
        <span>// Forged in Unity · Tempered by iteration</span>
        <span>EOF</span>
      </div>
    </div>
  );
}

window.VariantB = VariantB;
window.B_W = B_W;
