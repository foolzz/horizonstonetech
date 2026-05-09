/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Shared primitives
// ============================================================

const Container = ({ children, style, ...rest }) => (
  <div
    style={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 32px",
      position: "relative",
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

const Eyebrow = ({ children, accent }) => (
  <div
    style={{
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: accent ? "var(--accent)" : "var(--ink-3)",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <span
      style={{
        width: 22,
        height: 1,
        background: accent ? "var(--accent)" : "var(--ink-3)",
      }}
    />
    {children}
  </div>
);

const SectionLabel = ({ num, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: 18,
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--ink-3)",
      paddingBottom: 28,
      borderBottom: "1px solid var(--line)",
      marginBottom: 64,
    }}
  >
    <span style={{ color: "var(--accent)" }}>{num}</span>
    <span>{label}</span>
  </div>
);

const Button = ({ children, variant = "primary", style, ...rest }) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 22px",
    fontFamily: "var(--sans)",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "-0.005em",
    border: "1px solid",
    borderRadius: 0,
    cursor: "pointer",
    transition: "all 180ms ease",
    textDecoration: "none",
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--bg)",
      borderColor: "var(--accent)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "var(--line-2)",
    },
    underline: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "transparent",
      borderBottom: "1px solid var(--line-2)",
      padding: "8px 0",
    },
  };
  return (
    <a style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
      <span style={{ display: "inline-block", transform: "translateY(-1px)" }}>→</span>
    </a>
  );
};

// ============================================================
// Logo mark — Stone on horizon (simplified from brand)
// A small faceted stone sits atop a long horizon bar; an accent
// node on the stone reads as a connection point / tech signal.
// ============================================================
const Logomark = ({ size = 28 }) => (
  <svg width={size * 1.6} height={size} viewBox="0 0 52 32" fill="none" aria-label="Horizonstone">
    {/* Horizon bar */}
    <rect x="0" y="20" width="52" height="8" fill="currentColor" />
    {/* Stone — faceted hex sitting on the horizon */}
    <path
      d="M30 8 L36 11 L36 17 L33 20 L27 20 L24 17 L24 11 Z"
      fill="currentColor"
    />
    {/* Facet seams (negative space) */}
    <path
      d="M30 8 L30 20 M30 14 L36 11 M30 14 L24 11"
      stroke="var(--bg)"
      strokeWidth="1"
      strokeLinecap="square"
    />
    {/* Tech node — connection signal */}
    <circle cx="30" cy="8" r="1.6" fill="var(--accent)" />
    <circle cx="30" cy="8" r="3.2" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" fill="none" />
  </svg>
);

// ============================================================
// Nav
// ============================================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
      background: scrolled ? "color-mix(in oklab, var(--bg) 75%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all 220ms ease",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 32px",
          maxWidth: 1280,
        }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logomark />
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: 22,
              letterSpacing: "-0.01em",
            }}
          >
            Horizonstone
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {["Services", "Process", "Work", "About"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontSize: 14,
                color: "var(--ink-2)",
                fontWeight: 400,
              }}
            >
              {l}
            </a>
          ))}
          <Button href="#contact" variant="primary" style={{ padding: "10px 18px", fontSize: 13 }}>
            Book a call
          </Button>
        </div>
      </Container>
    </nav>
  );
};

// ============================================================
// Hero
// ============================================================
const Hero = ({ headlineStyle = "editorial" }) => {
  const headlines = {
    editorial: (
      <>
        Practical AI<br />
        for businesses<br />
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>ready to grow.</em>
      </>
    ),
    bold: (
      <>
        AI that<br />
        moves your<br />
        bottom line.
      </>
    ),
    technical: (
      <>
        We build the<br />
        AI systems<br />
        that <em style={{ fontStyle: "italic", color: "var(--accent)" }}>actually ship.</em>
      </>
    ),
  };
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 140,
        paddingBottom: 80,
        zIndex: 2,
      }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 80,
            alignItems: "end",
          }}
        >
          <div>
            <Eyebrow accent>AI Engineering — Est. Vancouver, BC</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 400,
                fontSize: "clamp(56px, 8vw, 124px)",
                lineHeight: 0.96,
                letterSpacing: "-0.02em",
                margin: "32px 0 36px",
              }}
            >
              {headlines[headlineStyle]}
            </h1>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: 560,
                margin: "0 0 40px",
              }}
            >
              Horizonstone is a small AI engineering studio. We build custom agents,
              automations, and AI-powered software for small and mid-sized teams —
              fixed scope, senior engineers, code you own.
            </p>
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <Button href="#contact">Book a discovery call</Button>
              <Button href="#process" variant="ghost">See how we work</Button>
            </div>
          </div>

          {/* Right column: stat / horizon visual */}
          <HeroVisual />
        </div>

        {/* Marquee */}
        <div
          style={{
            marginTop: 120,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: "var(--ink-3)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>Trusted by SMB teams across</span>
          <div style={{ display: "flex", gap: 48 }}>
            <span>Healthcare</span>
            <span>Professional Services</span>
            <span>E‑commerce</span>
            <span>Logistics</span>
            <span>SaaS</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

const HeroVisual = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "1 / 1.1",
        border: "1px solid var(--line-2)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--accent) 5%, transparent) 0%, transparent 60%)",
        overflow: "hidden",
      }}
    >
      {/* Corner ticks */}
      {[
        ["top", "left"],
        ["top", "right"],
        ["bottom", "left"],
        ["bottom", "right"],
      ].map((c, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            [c[0]]: -1,
            [c[1]]: -1,
            width: 8,
            height: 8,
            borderTop: c[0] === "top" ? "1px solid var(--accent)" : "none",
            borderBottom: c[0] === "bottom" ? "1px solid var(--accent)" : "none",
            borderLeft: c[1] === "left" ? "1px solid var(--accent)" : "none",
            borderRight: c[1] === "right" ? "1px solid var(--accent)" : "none",
          }}
        />
      ))}

      {/* Header strip */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "var(--ink-3)",
        }}
      >
        <span>// LIVE.AGENT</span>
        <span style={{ color: "var(--accent)" }}>● ACTIVE</span>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 24px", fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.9 }}>
        <div style={{ color: "var(--ink-3)" }}>$ horizonstone deploy --client=acme</div>
        <div style={{ color: "var(--ink-2)" }}>→ provisioning agent ...</div>
        <div style={{ color: "var(--ink-2)" }}>→ ingesting 1,247 docs ...</div>
        <div style={{ color: "var(--ink-2)" }}>→ training retrieval index ...</div>
        <div style={{ color: "var(--accent)" }}>✓ ready in 4.2s</div>
        <div style={{ marginTop: 14, color: "var(--ink-3)" }}>$ measure --window=30d</div>
      </div>

      {/* Chart */}
      <div style={{ padding: "0 24px 24px" }}>
        <svg viewBox="0 0 300 80" style={{ width: "100%", height: "auto" }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 L40 55 L80 50 L120 42 L160 36 L200 28 L240 18 L300 8 L300 80 L0 80 Z"
            fill="url(#grad)"
          />
          <path
            d="M0 60 L40 55 L80 50 L120 42 L160 36 L200 28 L240 18 L300 8"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
          />
          {[60, 55, 50, 42, 36, 28, 18, 8].map((y, i) => (
            <circle key={i} cx={i * 40 + (i === 7 ? 60 : 0)} cy={y} r="2" fill="var(--accent)" />
          ))}
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--ink-3)",
            marginTop: 8,
          }}
        >
          <span>Tickets resolved / day</span>
          <span style={{ color: "var(--ink)" }}>+312% in 30d</span>
        </div>
      </div>

      {/* Bottom big number */}
      <div
        style={{
          padding: "20px 24px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
            HOURS SAVED / WEEK
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 56,
              lineHeight: 1,
              marginTop: 6,
            }}
          >
            42<span style={{ color: "var(--accent)" }}>.</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
            UPTIME
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 32, lineHeight: 1.4 }}>99.97<span style={{ fontSize: 18 }}>%</span></div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Services
// ============================================================
const SERVICES = [
  {
    n: "01",
    title: "Custom AI Agents",
    body: "Internal copilots, customer-facing chat, agentic workflows. Built on your data, scoped to your processes — not a generic wrapper around an API.",
    items: ["Retrieval over your docs", "Multi-step reasoning", "Tool & API integration", "Human-in-the-loop"],
  },
  {
    n: "02",
    title: "Process Automation",
    body: "Document processing, data extraction, system-to-system integration. Replace the boring spreadsheet work that's eating your team's week.",
    items: ["Invoice & form extraction", "CRM/ERP sync", "Email & ticket triage", "Reporting pipelines"],
  },
  {
    n: "03",
    title: "AI‑Powered Software",
    body: "Full-stack web applications with AI woven into the core flow — not bolted on. Production-ready, security-reviewed, owned by you.",
    items: ["Custom dashboards", "Internal tools", "Customer portals", "Mobile-ready PWAs"],
  },
  {
    n: "04",
    title: "Strategy & Audit",
    body: "Two weeks. We sit with your team, map your bottlenecks, and tell you where AI actually helps — and where it doesn't.",
    items: ["Workflow mapping", "Tooling assessment", "ROI projections", "Implementation roadmap"],
  },
];

const Services = () => (
  <section id="services" style={{ padding: "140px 0 80px", position: "relative", zIndex: 2 }}>
    <Container>
      <SectionLabel num="§ 01" label="Services" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 80,
          marginBottom: 80,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(40px, 5vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Four things<br />we do <em style={{ color: "var(--accent)" }}>well.</em>
        </h2>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            maxWidth: 520,
            alignSelf: "end",
          }}
        >
          We don't sell models. We sell working systems — built specifically for
          your team, deployed in your environment, and priced before we start.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          borderTop: "1px solid var(--line)",
          borderLeft: "1px solid var(--line)",
        }}
      >
        {SERVICES.map((s) => (
          <div
            key={s.n}
            style={{
              padding: "44px 40px",
              borderRight: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              minHeight: 360,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.14em",
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--ink-3)",
                  letterSpacing: "0.14em",
                }}
              >
                FIXED-PRICE
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>{s.body}</p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "auto 0 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 16px",
              }}
            >
              {s.items.map((it) => (
                <li
                  key={it}
                  style={{
                    fontSize: 13,
                    color: "var(--ink-2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ============================================================
// Process
// ============================================================
const PROCESS = [
  {
    n: "01",
    week: "Week 0",
    title: "Discover",
    body: "30-minute call. We listen for the bottleneck — the report nobody runs, the tickets piling up, the spreadsheet that won't die.",
    deliverable: "Free",
  },
  {
    n: "02",
    week: "Week 1",
    title: "Scope",
    body: "Five business days. We come back with a fixed price, a fixed timeline, and a written-down version of what we're building.",
    deliverable: "Proposal",
  },
  {
    n: "03",
    week: "Weeks 2–8",
    title: "Build",
    body: "Senior engineers ship in two-week sprints with live demos every Friday. You see progress weekly — no black boxes, no surprises.",
    deliverable: "Working software",
  },
  {
    n: "04",
    week: "Week 8+",
    title: "Support",
    body: "90-day code warranty on everything we ship. Optional retainer if you want us on call. Or take the keys and run it yourself.",
    deliverable: "Warranty + handoff",
  },
];

const Process = () => (
  <section id="process" style={{ padding: "140px 0 80px", position: "relative", zIndex: 2 }}>
    <Container>
      <SectionLabel num="§ 02" label="How we work" />
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(40px, 5vw, 72px)",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          margin: "0 0 80px",
          maxWidth: 900,
        }}
      >
        From "we should look into AI"<br />
        to <em style={{ color: "var(--accent)" }}>shipping in 8 weeks.</em>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {PROCESS.map((p, i) => (
          <div
            key={p.n}
            style={{
              padding: "32px 24px 32px 0",
              borderTop: "1px solid var(--line-2)",
              position: "relative",
              paddingRight: i < 3 ? 32 : 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -5,
                left: 0,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 24,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{p.n}</span>
              <span>{p.week}</span>
            </div>
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: 40,
                fontWeight: 400,
                margin: "0 0 18px",
                letterSpacing: "-0.01em",
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 24px" }}>{p.body}</p>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--accent)",
                paddingTop: 16,
                borderTop: "1px dashed var(--line-2)",
                textTransform: "uppercase",
              }}
            >
              ↳ {p.deliverable}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ============================================================
// Case studies
// ============================================================
const CASES = [
  {
    sector: "Healthcare",
    client: "Multi-location dental group",
    metric: "84%",
    metricLabel: "fewer no-shows",
    title: "Voice-AI appointment confirmation",
    body: "Replaced manual confirmation calls with a voice agent that calls patients in English, Mandarin, and Cantonese. Front desk got their afternoons back.",
    stack: ["Twilio", "GPT-4", "Custom CRM", "n8n"],
  },
  {
    sector: "Professional Services",
    client: "Regional accounting firm",
    metric: "12hrs",
    metricLabel: "saved per week",
    title: "Document intake & classification",
    body: "Clients drop receipts and statements into a shared inbox. The system extracts, categorizes, and posts to the firm's bookkeeping platform — with a human approval step.",
    stack: ["Azure OCR", "Claude", "QuickBooks API"],
  },
  {
    sector: "E-commerce",
    client: "DTC home goods brand",
    metric: "+34%",
    metricLabel: "support response speed",
    title: "Tier-1 support copilot",
    body: "Drafts replies to common questions inside the support team's existing helpdesk. Agents review and send. Same tone, half the typing.",
    stack: ["Zendesk", "Anthropic", "Vector DB"],
  },
];

const Cases = () => (
  <section id="work" style={{ padding: "140px 0 80px", position: "relative", zIndex: 2 }}>
    <Container>
      <SectionLabel num="§ 03" label="Selected work" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 60,
          marginBottom: 80,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(40px, 5vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Real systems,<br />
          <em style={{ color: "var(--accent)" }}>real numbers.</em>
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--ink-3)",
            maxWidth: 380,
            fontFamily: "var(--mono)",
            letterSpacing: "0.01em",
          }}
        >
          Client names withheld under NDA. Metrics measured 30–90 days post-launch.
        </p>
      </div>

      <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line-2)" }}>
        {CASES.map((c, i) => (
          <CaseRow key={i} c={c} />
        ))}
      </div>
    </Container>
  </section>
);

const CaseRow = ({ c }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1.4fr 2fr 200px 30px",
        gap: 32,
        padding: "44px 0",
        borderBottom: "1px solid var(--line-2)",
        alignItems: "center",
        cursor: "pointer",
        background: hover ? "color-mix(in oklab, var(--accent) 6%, transparent)" : "transparent",
        transition: "background 200ms ease",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        {c.sector}
      </div>
      <div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 6, fontFamily: "var(--mono)" }}>
          {c.client}
        </div>
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: 28,
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          {c.title}
        </h3>
      </div>
      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>{c.body}</p>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 48,
            lineHeight: 1,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {c.metric}
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          {c.metricLabel}
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          color: hover ? "var(--accent)" : "var(--ink-3)",
          transition: "all 200ms ease",
          transform: hover ? "translateX(4px)" : "translateX(0)",
        }}
      >
        →
      </div>
    </a>
  );
};

// ============================================================
// Approach / Why us
// ============================================================
const PRINCIPLES = [
  {
    n: "I.",
    title: "No juniors on your project.",
    body: "Every line of code is written or reviewed by a senior engineer. AI helps us move faster — it doesn't replace judgment.",
  },
  {
    n: "II.",
    title: "Fixed scope, fixed price.",
    body: "We commit upfront. If we underestimated, that's our problem, not yours. No hourly billing disputes, no scope drift surprises.",
  },
  {
    n: "III.",
    title: "You own everything.",
    body: "Code lives in your GitHub. Models run in your cloud. Data never leaves your environment. When we leave, you're not stuck.",
  },
  {
    n: "IV.",
    title: "Boring tech where boring works.",
    body: "We use Postgres before vector databases, cron jobs before agent frameworks. Ship the simple version, then iterate.",
  },
];

const Approach = () => (
  <section id="about" style={{ padding: "140px 0 100px", position: "relative", zIndex: 2 }}>
    <Container>
      <SectionLabel num="§ 04" label="The approach" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }}>
        <div style={{ position: "sticky", top: 120, alignSelf: "start" }}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              margin: "0 0 32px",
            }}
          >
            Four<br /><em style={{ color: "var(--accent)" }}>commitments.</em>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 360 }}>
            What we promise on every engagement, written down so you can hold us to it.
          </p>
        </div>
        <div>
          {PRINCIPLES.map((p) => (
            <div
              key={p.n}
              style={{
                padding: "40px 0",
                borderTop: "1px solid var(--line)",
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 28,
                  fontStyle: "italic",
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {p.n}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 30,
                    fontWeight: 400,
                    margin: "0 0 14px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

// ============================================================
// CTA + Footer
// ============================================================
const CTA = () => (
  <section
    id="contact"
    style={{
      padding: "120px 0 100px",
      position: "relative",
      zIndex: 2,
      borderTop: "1px solid var(--line)",
      background:
        "radial-gradient(ellipse 800px 400px at 50% 0%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)",
    }}
  >
    <Container>
      <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <Eyebrow accent>Ready when you are</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(56px, 8vw, 120px)",
            fontWeight: 400,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            margin: "32px 0 32px",
          }}
        >
          Tell us where the<br />
          <em style={{ color: "var(--accent)" }}>bottleneck is.</em>
        </h2>
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--ink-2)",
            maxWidth: 580,
            margin: "0 auto 40px",
          }}
        >
          30 minutes. No deck, no sales script. We listen, ask hard questions,
          and tell you whether AI is the right tool for your problem — even if the
          answer is "not yet."
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Button href="mailto:hello@horizonstonetech.com">Email hello@horizonstonetech.com</Button>
          <Button href="#" variant="ghost">Book a 30-min call</Button>
        </div>
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--line)", padding: "60px 0 40px", position: "relative", zIndex: 2 }}>
    <Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 60,
          paddingBottom: 60,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Logomark />
            <span style={{ fontFamily: "var(--serif)", fontSize: 22 }}>Horizonstone</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 320, margin: "0 0 14px" }}>
            Empowering small business with AI. Vancouver, BC — working with clients across North America.
          </p>
        </div>
        {[
          { h: "Services", l: ["AI Agents", "Automation", "Custom Software", "Strategy"] },
          { h: "Company", l: ["Process", "Work", "About", "Contact"] },
          { h: "Contact", l: ["hello@horizonstonetech.com", "Vancouver, BC", "LinkedIn", "GitHub"] },
        ].map((col) => (
          <div key={col.h}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginBottom: 20,
              }}
            >
              {col.h}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {col.l.map((it) => (
                <li key={it}>
                  <a href="#" style={{ fontSize: 14, color: "var(--ink-2)" }}>
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 32,
          fontFamily: "var(--mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <span>© Horizonstone Technology Inc. — All rights reserved.</span>
        <span>Crafted in Vancouver · Shipping worldwide</span>
      </div>
    </Container>
  </footer>
);

// Export to window for app.jsx
Object.assign(window, {
  Nav,
  Hero,
  Services,
  Process,
  Cases,
  Approach,
  CTA,
  Footer,
});
