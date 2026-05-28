// Shared data + hooks + atoms used by both variations.

const RF_DATA = {
  brand: 'Reaperborn Forge',
  tagline: 'Forging systems that play themselves into your habits.',
  subTagline: 'Game Design · Unity Development · F2P Systems',
  about: `Game Designer and Unity Developer focused on systems, gameplay loops, and F2P economy design. Building games under the Reaperborn Forge studio — from mobile arcade to tactical multiplayer RPGs. Driven by the craft of making systems that feel good to play and keep players coming back.`,
  projects: [
    {
      id: 'allard',
      title: 'Legacy of Allard',
      kind: 'Tactical Multiplayer RPG',
      status: 'In active development',
      year: '2024 — present',
      stack: ['Unity', 'C#', 'PlayFab', 'WebGL'],
      blurb: 'Tactical multiplayer RPG with a published WebGL prototype and a live Steam page. Built around grid-based combat, party synergy, and progression systems.',
      link: 'https://store.steampowered.com/app/2378100/Legacy_of_Allard/',
      linkLabel: 'Steam page',
      glyph: 'I',
    },
    {
      id: 'volley',
      title: 'Head Volley Clash',
      kind: 'Arcade Mobile · F2P',
      status: 'In development',
      year: '2024 — present',
      stack: ['Unity', 'Firebase', 'Economy', 'LiveOps'],
      blurb: 'Mobile arcade F2P with seasonal passes, skin shop and a fully implemented economy. Designed for short, replayable sessions and long-tail retention.',
      link: '#',
      linkLabel: 'Devlog',
      glyph: 'II',
    },
    {
      id: 'tiny',
      title: 'Tiny Ruins Tycoon',
      kind: 'Idle / Management',
      status: 'Prototype',
      year: '2024',
      stack: ['Unity', 'Data-driven', 'Idle loops'],
      blurb: 'Idle management mobile prototype. Era-based progression with a data-driven economy. A sandbox for testing loop pacing and offline-progress balancing.',
      link: '#',
      linkLabel: 'Build notes',
      glyph: 'III',
    },
    {
      id: 'arquivos',
      title: 'Arquivos do Ceifador',
      kind: 'Devlog · Research',
      status: 'Ongoing',
      year: '2023 — present',
      stack: ['Notes', 'Systems', 'Postmortems'],
      blurb: 'Field notes on systems design, F2P economies and the craft of shipping small games. Public archive of teardowns and process diaries.',
      link: '#',
      linkLabel: 'Read archive',
      glyph: 'IV',
    },
    {
      id: 'upgrades',
      title: 'Upgrades Diários',
      kind: 'Daily Practice',
      status: 'Continuous',
      year: 'Daily',
      stack: ['Microprojects', 'Tooling', 'Studies'],
      blurb: 'A daily ritual of small upgrades — tools, prototypes, micro-systems. The whetstone behind every shipped project.',
      link: '#',
      linkLabel: 'See upgrades',
      glyph: 'V',
    },
  ],
  skills: [
    { group: 'Design', items: ['Game Design', 'Systems Design', 'Progression Design', 'F2P Economy Design', 'Gameplay Design', 'UI/UX for Games'] },
    { group: 'Engineering', items: ['Unity', 'C#', 'Git', 'Firebase / Firestore', 'PlayFab / Azure'] },
    { group: 'Production', items: ['Prototyping', 'QA Basics', 'LiveOps Mindset', 'Data-Driven Tuning'] },
  ],
  services: [
    { title: 'Game Design', desc: 'Systems, progression and F2P economy from blueprint to live tuning.' },
    { title: 'Unity Development', desc: 'Production-grade Unity / C# implementation, tools and pipelines.' },
    { title: 'Prototyping', desc: 'Fast, focused prototypes to validate loops before they cost a roadmap.' },
    { title: 'Design Consulting', desc: 'External eyes on your systems, economy or onboarding.' },
    { title: 'QA & Game Testing', desc: 'Structured testing passes with systems-aware notes.' },
  ],
  links: [
    { label: 'Email',    value: 'reaperbornforge@gmail.com', href: 'mailto:reaperbornforge@gmail.com' },
    { label: 'Itch.io',  value: 'zdarkreaper.itch.io',       href: 'https://zdarkreaper.itch.io' },
    { label: 'Steam',    value: 'Legacy of Allard',          href: 'https://store.steampowered.com/app/2378100/Legacy_of_Allard/' },
    { label: 'LinkedIn', value: 'in/otavioantonio',          href: 'https://www.linkedin.com/in/otavioantonio/' },
    { label: 'Discord',  value: 'zDarkReaper',               href: '#' },
  ],
};

// ────────────────────────────────────────────────────────────────────
// Ember particles — drifting upward in the hero. Canvas-based.
function EmberField({ density = 40, color = '#C8102E', tint = '#FFB199' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, w, h, dpr;
    const particles = [];
    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      w = r.width; h = r.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: 0.15 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        r: 0.5 + Math.random() * 1.6,
        a: 0.2 + Math.random() * 0.6,
        flick: Math.random() * Math.PI * 2,
        hueShift: Math.random(),
      });
    }
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.scale(dpr, dpr);
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.flick) * 0.15;
        p.flick += 0.04;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        const c = p.hueShift > 0.7 ? tint : color;
        const flick = 0.7 + Math.sin(p.flick * 2) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.globalAlpha = p.a * flick;
        ctx.shadowColor = c;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [density, color, tint]);
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />;
}

// ────────────────────────────────────────────────────────────────────
// Ember cursor — small spark trail following pointer inside a container.
function EmberCursor({ targetRef, color = '#C8102E' }) {
  const cvRef = React.useRef(null);
  React.useEffect(() => {
    const target = targetRef.current;
    const cv = cvRef.current;
    if (!target || !cv) return;
    const ctx = cv.getContext('2d');
    let raf, dpr, w, h;
    const sparks = [];
    let mx = -100, my = -100, inside = false;

    const resize = () => {
      const r = target.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      w = r.width; h = r.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(target);

    const onMove = (e) => {
      const r = target.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      inside = mx >= 0 && my >= 0 && mx <= r.width && my <= r.height;
      if (inside) {
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: mx + (Math.random() - 0.5) * 4,
            y: my + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -0.4 - Math.random() * 0.8,
            life: 1,
            r: 0.6 + Math.random() * 1.4,
          });
        }
        if (sparks.length > 180) sparks.splice(0, sparks.length - 180);
      }
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.life -= 0.018;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = s.life;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [targetRef, color]);

  return <canvas ref={cvRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex: 50 }} />;
}

// ────────────────────────────────────────────────────────────────────
// Reveal-on-scroll wrapper. Uses IntersectionObserver on a scoped root.
function Reveal({ children, delay = 0, rootRef, as = 'div', style, ...rest }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = rootRef && rootRef.current ? rootRef.current : null;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { setSeen(true); io.unobserve(e.target); }
      }
    }, { root, threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [rootRef]);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Simple monogram seal — RF inside a forge stamp.
function ForgeSeal({ size = 56, accent = '#C8102E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="seal-g" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#seal-g)" />
      <circle cx="32" cy="32" r="28.5" stroke={accent} strokeOpacity="0.55" strokeWidth="0.8" />
      <circle cx="32" cy="32" r="24" stroke="#E8E4D8" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="1 3" />
      {/* RF monogram */}
      <g fill="#E8E4D8" style={{ fontFamily: 'Cinzel, serif', fontWeight: 700 }}>
        <text x="32" y="38" textAnchor="middle" fontSize="20" letterSpacing="2">RF</text>
      </g>
      {/* anvil tick marks */}
      <g stroke={accent} strokeOpacity="0.7" strokeWidth="1">
        <line x1="32" y1="4" x2="32" y2="9" />
        <line x1="32" y1="55" x2="32" y2="60" />
        <line x1="4" y1="32" x2="9" y2="32" />
        <line x1="55" y1="32" x2="60" y2="32" />
      </g>
    </svg>
  );
}

Object.assign(window, { RF_DATA, EmberField, EmberCursor, Reveal, ForgeSeal });
