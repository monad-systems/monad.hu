import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const HeroBackground = dynamic(() => import('../components/HeroBackground'), {
  ssr: false,
});

/* ── Inline Icons ── */
function CheckIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function XCircleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>
  );
}

/* ── Data ── */
const bestFitFor = [
  'Series A–C startups whose monolith is slowing delivery',
  'Engineering teams with 10–80 developers and growing pains',
  'CTOs or VPEs evaluating platform modernization options',
  'Companies whose last big rewrite stalled or failed',
];

const symptoms = [
  {
    title: 'Releases take days, not hours',
    detail:
      'Manual gates, long regression cycles, or a single deployable that blocks everyone.',
  },
  {
    title: 'Teams step on each other',
    detail:
      'Merge conflicts, shared databases, and unclear ownership make every sprint a negotiation.',
  },
  {
    title: 'Integration failures cascade',
    detail:
      'One service goes down and takes three others with it. You have no circuit breakers or clear contracts.',
  },
  {
    title: 'Observability is an afterthought',
    detail:
      'When production breaks, the first hour is spent figuring out which service to blame.',
  },
  {
    title: 'New hires ramp up slowly',
    detail:
      'The codebase is a maze of tribal knowledge. Documentation is sparse or outdated.',
  },
  {
    title: 'Scaling means scaling everything',
    detail:
      'You cannot independently scale hot paths — the whole monolith must grow together.',
  },
];

const included = [
  {
    step: '01',
    title: 'Architecture Deep-Dive',
    detail:
      'We review your codebase, infrastructure, CI/CD, and data flows. We interview key engineers to understand pain points and constraints.',
  },
  {
    step: '02',
    title: 'Bottleneck Mapping',
    detail:
      'We identify the specific coupling points, scaling limits, and operational risks that are slowing your team down today.',
  },
  {
    step: '03',
    title: 'Prioritized Roadmap',
    detail:
      'You receive a concrete, sequenced plan — what to decouple first, which contracts to formalize, and where to add observability — with effort estimates.',
  },
  {
    step: '04',
    title: 'Risk Assessment',
    detail:
      'We flag technical debt that carries business risk: single points of failure, undocumented integrations, and data consistency gaps.',
  },
];

const deliverables = [
  {
    title: 'Clear current-state architecture overview',
    format:
      'System map with service boundaries, dependencies, and failure paths.',
  },
  {
    title: 'Top risks and bottlenecks with business impact explained',
    format:
      'Ranked risk register with why each item affects delivery or reliability.',
  },
  {
    title:
      'Delivery friction map across CI/CD, environments, and team handoffs',
    format:
      'Pipeline and workflow map showing where releases slow down or fail.',
  },
  {
    title: 'API and integration issues overview',
    format:
      'Contract and integration findings with ownership and dependency notes.',
  },
  {
    title: 'Prioritized 90-day modernization roadmap',
    format: 'Sequenced plan by priority, dependency, and execution risk.',
  },
  {
    title: 'Optional execution approach for the first modernization steps',
    format:
      'Implementation approach outline for phase one; execution support is optional.',
  },
];

const weekOne = [
  'Stakeholder interviews (CTO, engineering, platform)',
  'System walkthrough (architecture, APIs, infrastructure)',
  'Delivery pipeline review (CI/CD, environments)',
  'Focused codebase sampling (critical services)',
];

const weekTwo = [
  'Bottleneck and friction mapping',
  'Architecture risk analysis',
  'API and integration assessment',
  'Cost and complexity hotspots',
  'Creation of a prioritized modernization roadmap',
];

const notGoodFit = [
  'Early-stage MVP teams',
  'Simple systems without architectural pressure',
  'Teams only looking for extra development capacity',
  'Projects driven primarily by lowest cost',
];

const scopeIncluded = [
  'Two weeks of focused architecture and delivery assessment',
  'Interviews, system walkthroughs, pipeline review, and targeted code sampling',
  'Written review pack and leadership readout',
  'Prioritized 90-day roadmap with clear next-step options',
];

const scopeExcluded = [
  'Hands-on implementation during the review window',
  'Open-ended advisory retainer commitments',
  'Tool migrations without a prioritized roadmap decision',
];

const exampleOutcomes = [
  'Reduced infrastructure cost through targeted platform changes',
  'Improved delivery reliability across releases and operations',
  'Introduced production-grade observability for critical services',
  'Enabled a safer, phased modernization path',
  'Reduced integration complexity between key systems',
];

const caseSnapshots = [
  {
    context:
      'B2B SaaS platform where releases were blocked by shared-service coupling and unclear ownership boundaries',
    outcome:
      'The review package defined target service boundaries, identified the top delivery blockers, and sequenced a 90-day plan the team used to execute internally.',
  },
  {
    context:
      'Integration-heavy product with recurring cross-team incidents and weak API contract ownership',
    outcome:
      'The review package prioritized integration contract fixes, highlighted observability gaps by critical flow, and clarified ownership decisions that reduced operational friction.',
  },
];

const buyerCommitment = [
  'One 30-minute fit call with engineering leadership',
  'Three to five stakeholder interviews during week one',
  'Access to architecture docs, CI/CD pipeline, and critical services',
  'One final leadership readout session at the end of week two',
];

const nextSteps = [
  {
    step: '1',
    title: 'Book a call',
    detail:
      'We discuss your architecture, team, and goals in a focused 30-minute call.',
  },
  {
    step: '2',
    title: 'We run the review',
    detail:
      'Over two weeks, we run interviews, walkthroughs, pipeline review, and focused code sampling.',
  },
  {
    step: '3',
    title: 'You get the deliverables',
    detail:
      'You get the written review pack and leadership readout with prioritized next steps.',
  },
  {
    step: '4',
    title: 'Decide what\u2019s next',
    detail:
      'Execute independently, or ask us to support implementation of the first phase.',
  },
];

export default function PlatformModernizationReview() {
  return (
    <Layout>
      <Head>
        <title>Platform Modernization Review — MONAD SYSTEMS</title>
        <meta
          name="description"
          content="A focused architecture review that identifies your highest-impact bottlenecks and gives you a concrete modernization roadmap. From MONAD SYSTEMS."
        />
        <meta
          property="og:title"
          content="Platform Modernization Review — MONAD SYSTEMS"
        />
        <meta
          property="og:description"
          content="A focused architecture review that maps your bottlenecks, risks, and a prioritized roadmap for platform modernization."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: '8rem', paddingBottom: '6.5rem' }}
      >
        <div className="hero-bg">
          <HeroBackground />
          <div className="hero-fade" />
          <div className="hero-fade-vertical" />
        </div>
        <div className="site-container relative z-10">
          <div style={{ maxWidth: '720px' }}>
            <div className="section-eyebrow">First Engagement</div>
            <h1 className="hero-title">Platform Modernization Review</h1>
            <p
              className="text-base md:text-xl leading-relaxed mb-8"
              style={{
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '60ch',
              }}
            >
              A focused, senior-led architecture review that identifies your
              highest-impact bottlenecks and gives you a concrete roadmap — so
              you can modernize with confidence instead of guesswork.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link className="btn btn-hero btn-lg group" href="/#contact">
                Book a Platform Review Call
                <ArrowRightIcon
                  className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 18, height: 18 }}
                />
              </Link>
              <a className="btn btn-outline btn-lg" href="#how-review-works">
                See How the Review Works
              </a>
            </div>
            <p
              style={{
                marginTop: '1rem',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.95rem',
              }}
            >
              Fixed-scope, focused 2-week engagement designed as a standalone
              first step with a clear final readout.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Who It&apos;s For</div>
            <h2 className="section-title">
              Best fit for teams at a turning&nbsp;point
            </h2>
            <p className="section-lead">
              This review is designed for engineering leaders who know something
              needs to change — but need an outside perspective to figure out
              where to start.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {bestFitFor.map((item) => (
              <div
                key={item}
                className="card hover-lift flex items-start gap-4"
                style={{ padding: '1.5rem' }}
              >
                <CheckIcon
                  style={{
                    width: 22,
                    height: 22,
                    flexShrink: 0,
                    marginTop: 2,
                    color: 'hsl(var(--primary))',
                  }}
                />
                <span style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How the 2-Week Review Works ── */}
      <section id="how-review-works" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Process</div>
            <h2 className="section-title">How the review works</h2>
            <p className="section-lead">
              A clear two-week process so your team knows what happens, when,
              and why.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card hover-lift" style={{ padding: '1.75rem' }}>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                Week 1
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'grid',
                  gap: '0.85rem',
                }}
              >
                {weekOne.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon
                      style={{
                        width: 18,
                        height: 18,
                        flexShrink: 0,
                        marginTop: 4,
                        color: 'hsl(var(--primary))',
                      }}
                    />
                    <span style={{ lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card hover-lift" style={{ padding: '1.75rem' }}>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                Week 2
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'grid',
                  gap: '0.85rem',
                }}
              >
                {weekTwo.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon
                      style={{
                        width: 18,
                        height: 18,
                        flexShrink: 0,
                        marginTop: 4,
                        color: 'hsl(var(--primary))',
                      }}
                    />
                    <span style={{ lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Not a Good Fit ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Qualification</div>
            <h2 className="section-title">Not a good fit</h2>
            <p className="section-lead">
              This keeps the engagement focused and useful for the teams who
              need it most.
            </p>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.95rem',
                marginTop: '-0.25rem',
              }}
            >
              If it&apos;s not a fit, we will say so on the first call.
            </p>
            <span
              className="badge glass"
              style={{ marginTop: '0.75rem', width: 'fit-content' }}
            >
              We prefer clear no&apos;s over forced projects.
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {notGoodFit.map((item) => (
              <div
                key={item}
                className="card hover-lift flex items-start gap-4"
                style={{ padding: '1.35rem 1.5rem', minHeight: '102px' }}
              >
                <div className="card-glow" />
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: 'hsl(var(--destructive) / 0.12)',
                    border: '1px solid hsl(var(--destructive) / 0.35)',
                  }}
                >
                  <XCircleIcon
                    style={{
                      width: 17,
                      height: 17,
                      color: 'hsl(var(--destructive))',
                    }}
                  />
                </div>
                <p
                  style={{
                    margin: '0.05rem 0 0',
                    color: 'hsl(var(--foreground))',
                    lineHeight: 1.55,
                    fontSize: '1rem',
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scope Boundaries ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Scope</div>
            <h2 className="section-title">Included and not included</h2>
            <p className="section-lead">
              A fixed-scope engagement with clear boundaries so there is no
              ambiguity about what you are buying.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card hover-lift" style={{ padding: '1.75rem' }}>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                Included
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'grid',
                  gap: '0.8rem',
                }}
              >
                {scopeIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon
                      style={{
                        width: 18,
                        height: 18,
                        flexShrink: 0,
                        marginTop: 3,
                        color: 'hsl(var(--primary))',
                      }}
                    />
                    <span style={{ lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card hover-lift" style={{ padding: '1.75rem' }}>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                Not included
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'grid',
                  gap: '0.8rem',
                }}
              >
                {scopeExcluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        flexShrink: 0,
                        marginTop: 2,
                        color: 'hsl(var(--muted-foreground))',
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      -
                    </span>
                    <span style={{ lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Symptoms / Triggers ── */}
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Common Triggers</div>
            <h2 className="section-title">Recognize any of these?</h2>
            <p className="section-lead">
              If two or more of these feel familiar, a platform review will pay
              for itself before the roadmap is even finished.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((s) => (
              <div
                key={s.title}
                className="card hover-lift"
                style={{ padding: '1.75rem' }}
              >
                <div className="card-glow" />
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section
        id="whats-included"
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">What&apos;s Included</div>
            <h2 className="section-title">Four phases, zero fluff</h2>
            <p className="section-lead">
              Every review follows a consistent process so you know exactly what
              to expect — and what you will walk away with.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {included.map((item) => (
              <div
                key={item.step}
                className="card hover-lift"
                style={{ padding: '1.75rem' }}
              >
                <div className="card-glow" />
                <span
                  className="gradient-text"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  PHASE {item.step}
                </span>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    margin: '0.5rem 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Deliverables</div>
            <h2 className="section-title">What you walk away&nbsp;with</h2>
            <p className="section-lead">
              Tangible outputs you can share with leadership and engineering,
              then execute against immediately.
            </p>
          </div>
          <div
            className="card glass"
            style={{ padding: '2.5rem', maxWidth: '640px' }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '1rem',
              }}
            >
              {deliverables.map((d) => (
                <li key={d.title} className="flex items-start gap-3">
                  <CheckIcon
                    style={{
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      marginTop: 3,
                      color: 'hsl(var(--primary))',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                      {d.title}
                    </div>
                    <div
                      style={{
                        marginTop: '0.3rem',
                        color: 'hsl(var(--muted-foreground))',
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {d.format}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Buyer-Side Effort ── */}
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Your Time Commitment</div>
            <h2 className="section-title">What we need from your team</h2>
            <p className="section-lead">
              Lightweight participation so the review stays fast, accurate, and
              practical.
            </p>
          </div>
          <div
            className="card glass"
            style={{ padding: '2rem', maxWidth: '760px' }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '0.85rem',
              }}
            >
              {buyerCommitment.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon
                    style={{
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      marginTop: 3,
                      color: 'hsl(var(--primary))',
                    }}
                  />
                  <span style={{ fontSize: '1.03rem', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── What Happens Next ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Process</div>
            <h2 className="section-title">What happens next</h2>
            <p className="section-lead">
              From first call to finished roadmap in two weeks or less.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map((ns) => (
              <div
                key={ns.step}
                className="card hover-lift"
                style={{ padding: '1.75rem' }}
              >
                <div className="card-glow" />
                <div
                  className="gradient-text"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {ns.step}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  {ns.title}
                </h3>
                <p
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {ns.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example Outcomes ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Proof</div>
            <h2 className="section-title">
              Example outcomes from similar work
            </h2>
          </div>
          <div
            className="card glass"
            style={{ padding: '2rem', maxWidth: '760px' }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '0.85rem',
              }}
            >
              {exampleOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckIcon
                    style={{
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      marginTop: 3,
                      color: 'hsl(var(--primary))',
                    }}
                  />
                  <span style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: '1.5rem',
                borderTop: '1px solid hsl(var(--border))',
                paddingTop: '1.25rem',
                display: 'grid',
                gap: '1rem',
              }}
            >
              {caseSnapshots.map((item) => (
                <div key={item.context}>
                  <p style={{ margin: 0, fontWeight: 700 }}>Scenario</p>
                  <p
                    style={{
                      margin: '0.25rem 0 0.45rem',
                      color: 'hsl(var(--muted-foreground))',
                    }}
                  >
                    {item.context}
                  </p>
                  <p style={{ margin: 0, fontWeight: 700 }}>What changed</p>
                  <p
                    style={{
                      margin: '0.25rem 0 0',
                      color: 'hsl(var(--muted-foreground))',
                    }}
                  >
                    {item.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section">
        <div className="site-container" style={{ textAlign: 'center' }}>
          <div
            className="card glass"
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '3rem 2rem',
            }}
          >
            <h2
              className="section-title"
              style={{ textAlign: 'center', marginBottom: '1rem' }}
            >
              Ready to see what&apos;s holding your platform&nbsp;back?
            </h2>
            <p
              className="section-lead"
              style={{ maxWidth: '50ch', margin: '0 auto 2rem' }}
            >
              Book a 30-minute call. We&apos;ll quickly assess if this review is
              useful for your situation and outline clear next steps. No
              commitment.
            </p>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '52ch',
                margin: '0 auto 1.25rem',
                fontSize: '0.95rem',
              }}
            >
              This review is a standalone engagement. Implementation support is
              optional and only discussed if you ask for it.
            </p>
            <Link className="btn btn-hero btn-lg group" href="/#contact">
              Book a Platform Review Call
              <ArrowRightIcon
                className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                style={{ width: 18, height: 18 }}
              />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
