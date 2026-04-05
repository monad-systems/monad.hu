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
  'Architecture assessment document with diagrams',
  'Prioritized modernization roadmap (6–12 month horizon)',
  'Bottleneck and risk matrix with severity ratings',
  'Recommended technology choices with trade-off analysis',
  'Quick-win list — improvements you can ship in the first sprint',
];

const nextSteps = [
  {
    step: '1',
    title: 'Book a call',
    detail:
      'We discuss your architecture, team, and goals in a 30-minute intro call.',
  },
  {
    step: '2',
    title: 'We run the review',
    detail:
      'A senior consultant embeds with your team for 1–2 weeks of focused analysis.',
  },
  {
    step: '3',
    title: 'You get the roadmap',
    detail:
      'We deliver actionable findings and walk your leadership team through them.',
  },
  {
    step: '4',
    title: 'Decide what\u2019s next',
    detail:
      'Execute independently, or engage us to lead the first decomposition sprint.',
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
                Book Your Review
                <ArrowRightIcon
                  className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 18, height: 18 }}
                />
              </Link>
              <a className="btn btn-outline btn-lg" href="#whats-included">
                See What&apos;s Included
              </a>
            </div>
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
              Tangible artifacts you can present to your leadership team, share
              with your engineers, and act on immediately.
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
                <li key={d} className="flex items-start gap-3">
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
                    {d}
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
              Book a 30-minute intro call. We will discuss your architecture,
              confirm fit, and outline next steps — no commitment required.
            </p>
            <Link className="btn btn-hero btn-lg group" href="/#contact">
              Book Your Review
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
