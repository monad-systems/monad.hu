import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from '../components/Layout';

const HeroBackground = dynamic(() => import('../components/HeroBackground'), {
  ssr: false,
});

const problems = [
  {
    title: 'Monolith to Modular Architecture',
    description:
      'Your monolith has outgrown your team. Releases are slow, risky, and coupled. You need a pragmatic path to modular or service-oriented architecture — without a full rewrite.',
    tags: ['Decomposition', 'Bounded Contexts', 'Strangler Fig'],
  },
  {
    title: 'Integration Complexity',
    description:
      'Systems are connected with brittle point-to-point integrations, ad hoc message formats, and no clear ownership. Failures cascade and debugging crosses team boundaries.',
    tags: ['Event-Driven', 'Kafka', 'Async Messaging'],
  },
  {
    title: 'Inconsistent APIs & Poor Contracts',
    description:
      'Every service defines its own conventions. Clients guess at payload shapes. Validation is duplicated. Breaking changes ship unnoticed.',
    tags: ['OpenAPI', 'AsyncAPI', 'Spec-First', 'JSON Schema'],
  },
  {
    title: 'Platform Friction Slowing Delivery',
    description:
      'Developers wait on infrastructure, fight unreliable CI pipelines, and work around missing tooling. The platform is a bottleneck instead of an accelerator.',
    tags: ['Platform Engineering', 'CI/CD', 'Developer Experience'],
  },
  {
    title: 'Weak Observability & Operational Blind Spots',
    description:
      'Production issues surface through user complaints. Distributed traces are absent or incomplete. There is no structured approach to SLOs, alerting, or incident response.',
    tags: ['OpenTelemetry', 'Grafana', 'Prometheus', 'SLOs'],
  },
  {
    title: 'Rising Cloud Cost & Architecture Inefficiency',
    description:
      'Infrastructure spend keeps climbing without a clear link to workload or value. Over-provisioned clusters, redundant services, and unoptimized data paths drive waste.',
    tags: ['Cost Optimization', 'Right-Sizing', 'Architecture Review'],
  },
];

const engagements = [
  {
    step: '01',
    title: 'Architecture & Platform Review',
    what: 'A focused assessment of your current system architecture, integration patterns, delivery pipeline, and operational posture.',
    when: 'You suspect architectural debt is slowing you down but need an independent, senior perspective to confirm priorities and risks.',
    outcome:
      'A written findings report with a prioritized, actionable roadmap — not a slide deck, but concrete next steps your team can execute.',
  },
  {
    step: '02',
    title: 'Fractional Architecture Leadership',
    what: 'Ongoing senior architecture guidance embedded in your team — part-time, on a retained basis. Design reviews, decision records, and hands-on pairing.',
    when: 'You need principal-level architecture input but cannot justify or find a full-time hire. Your team is strong but needs structured technical direction.',
    outcome:
      'Sustained architecture coherence, fewer rework cycles, and a team that levels up through working alongside a senior practitioner.',
  },
  {
    step: '03',
    title: 'Delivery Engagement',
    what: 'Hands-on implementation by senior engineers who deliver production-ready code, infrastructure, and observability — not just plans.',
    when: 'You have a clear modernization scope and need experienced builders who can own delivery end-to-end or work as a tight extension of your team.',
    outcome:
      'Working, deployed software with clean contracts, tested boundaries, observability in place, and knowledge transferred to your team.',
  },
];

const differentiators = [
  {
    title: 'Senior Hands-On Work',
    description:
      'No bench rotation, no junior staffing. The people who assess your system are the same people who implement the changes.',
  },
  {
    title: 'Architecture + Delivery',
    description:
      'We do not just draw diagrams. We design systems and then build them — with production-grade testing, observability, and deployment.',
  },
  {
    title: 'Pragmatic Modernization',
    description:
      'We do not push rewrites for their own sake. Every recommendation is grounded in your real constraints, timelines, and team capabilities.',
  },
  {
    title: 'API & Spec-First Discipline',
    description:
      'Contracts are defined before code. OpenAPI, AsyncAPI, and JSON Schema govern boundaries — enabling generated clients, validation, and reliable integration.',
  },
  {
    title: 'Observability & Production-Readiness',
    description:
      'Every engagement ships with structured logging, distributed tracing, metrics, and alerting. Not as an afterthought — as a delivery standard.',
  },
  {
    title: 'Full-Stack Platform Depth',
    description:
      'Backend, frontend, infrastructure, CI/CD, data pipelines, event-driven integration. One team, coherent architecture, no handoff gaps.',
  },
];

const caseStudies = [
  {
    title: 'Fizz',
    category: 'Platform Engineering',
    description:
      'Cut infrastructure costs by approximately 90% and dramatically improved search synchronization speed for an OTP ecosystem platform. Introduced spec-first API delivery, automated quality gates, and production-grade observability across a distributed monolith — stabilizing reliability and strengthening security posture while establishing a safer, incremental path toward microservices.',
    tags: [
      'API Design-First',
      'Quality Gates',
      'Observability',
      'Cost Optimization',
    ],
    highlight: true,
  },
  {
    title: 'IdomSoft',
    category: 'Cloud Architecture',
    description:
      'Provided senior architecture consulting for a government technology organization, advising on public cloud infrastructure design, operational practices, and platform evolution strategy.',
    tags: ['Cloud Architecture', 'Consulting'],
    highlight: true,
  },
  {
    title: 'Netrisk',
    category: 'Cloud Architecture',
    description:
      'Architected a high-throughput insurance purchase platform on Node.js microservices with Kafka-based event-driven messaging. Introduced resilience patterns and end-to-end distributed tracing — improving system reliability and giving operations real-time visibility into production behavior.',
    tags: ['Node.js', 'Kafka', 'Event-Driven', 'Microservices'],
  },
  {
    title: 'IDBC',
    category: 'Banking Infrastructure',
    description:
      'Built the foundational architecture for a scalable banking platform using Node.js and Kafka-based event-driven messaging. Delivered complex legacy system integrations and data migration — unifying fragmented data sources into a single, extensible platform designed for regulated financial operations.',
    tags: ['Node.js', 'Kafka', 'Event-Driven', 'Data Migration'],
  },
  {
    title: 'Webshippy',
    category: 'Backend Decomposition',
    description:
      'Decomposed a monolithic PHP application into a clean backend API and a modular Vue.js frontend. Containerized the full stack with Docker — enabling independent deployments, clearer service boundaries, and reduced delivery friction while establishing the foundation for further service-oriented evolution.',
    tags: ['Vue.js', 'PHP', 'Docker', 'API Design', 'Microservices'],
  },
];

const techStack = {
  languages: [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Fastify',
    'NoSQL',
    'SQL',
    'React.js',
    'Vue.js',
    'HTML',
    'CSS',
  ],
  infrastructure: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Keycloak'],
  data: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ'],
  observability: ['OpenTelemetry', 'Prometheus', 'Grafana Stack', 'ELK Stack'],
};

const expertise = [
  {
    code: 'PM',
    title: 'Platform Modernization',
    description:
      'Incremental migration from monoliths to modular, service-oriented systems',
  },
  {
    code: 'EA',
    title: 'Event-Driven Architecture',
    description: 'Scalable, loosely coupled systems with async messaging',
  },
  {
    code: 'SF',
    title: 'API & Spec-First Delivery',
    description:
      'Contract-driven development with OpenAPI, AsyncAPI, and JSON Schema',
  },
  {
    code: 'OB',
    title: 'Observability & Production-Readiness',
    description: 'Structured tracing, metrics, alerting, and SLOs from day one',
  },
  {
    code: 'CO',
    title: 'Cloud Cost Optimization',
    description:
      'Right-sizing infrastructure and eliminating architecture-level waste',
  },
  {
    code: 'PE',
    title: 'Platform Engineering',
    description:
      'Internal platforms, CI/CD, and developer tooling that accelerate delivery',
  },
];

const partners = [
  { name: 'OTP Ecosystem', logo: '/fizz.svg', tone: 'light' },
  { name: 'IdomSoft', logo: '/idomsoft.svg', tone: 'mono' },
  { name: 'Netrisk', logo: '/netrisk.svg', tone: 'light' },
  { name: 'IDBC', logo: '/idbc.svg', tone: 'light' },
  { name: 'Webshippy', logo: '/webshippy-dark.svg', tone: 'mono' },
];

let recaptchaScriptPromise = null;

const ensureRecaptchaLoaded = async (siteKey) => {
  if (typeof window === 'undefined') {
    throw new Error('reCAPTCHA can only load in the browser');
  }

  if (window.grecaptcha?.execute && window.grecaptcha?.ready) {
    return window.grecaptcha;
  }

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-recaptcha="true"]');

      const handleLoad = () => {
        if (window.grecaptcha?.ready) {
          resolve(window.grecaptcha);
          return;
        }
        reject(new Error('reCAPTCHA failed to initialize'));
      };

      const handleError = () => {
        reject(new Error('Failed to load reCAPTCHA script'));
      };

      if (existing) {
        existing.addEventListener('load', handleLoad, { once: true });
        existing.addEventListener('error', handleError, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.dataset.recaptcha = 'true';
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      document.head.appendChild(script);
    }).catch((error) => {
      recaptchaScriptPromise = null;
      throw error;
    });
  }

  const grecaptcha = await recaptchaScriptPromise;
  await new Promise((resolve) => grecaptcha.ready(resolve));
  return grecaptcha;
};

const CheckIcon = () => (
  <svg
    className="value-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const IconCode = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 9l-3 3 3 3" />
    <path d="M16 9l3 3-3 3" />
    <path d="M14 7l-4 10" />
  </svg>
);

const IconLayers = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l9 5-9 5-9-5 9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </svg>
);

const IconBadgeCheck = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l2.4 1.4 2.8-.2 1.4 2.4 2.4 1.4-.2 2.8L22 12l1.4 2.4-1.4 2.4-2.8-.2-1.4 2.4-2.8-.2L12 22l-2.4-1.4-2.8.2-1.4-2.4-2.4-1.4.2-2.8L2 12 .6 9.6 2 7.2l2.8.2 1.4-2.4 2.8.2L12 2z" />
    <path d="M16.5 9.5l-5 5-2-2" />
  </svg>
);

const IconArrowRight = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const [contactStatus, setContactStatus] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const isContactFormConfigured =
    Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) &&
    Boolean(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL);

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form =
      event?.currentTarget instanceof HTMLFormElement
        ? event.currentTarget
        : event?.target instanceof HTMLElement
          ? event.target.closest('form')
          : null;

    if (isSubmittingContact) return;

    setIsSubmittingContact(true);
    setContactStatus('Sending...');

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
      const action = 'contact_submit';

      if (!siteKey || !appsScriptUrl) {
        setContactStatus(
          'Contact form is temporarily unavailable. Please email hello@monad.hu.',
        );
        return;
      }

      const grecaptcha = await ensureRecaptchaLoaded(siteKey);

      const resolvedForm =
        form ??
        (typeof document !== 'undefined'
          ? document.getElementById('contactForm')
          : null);

      if (!(resolvedForm instanceof HTMLFormElement)) {
        throw new Error('Could not resolve contact form element');
      }

      const token = await grecaptcha.execute(siteKey, { action });

      const formData = new FormData(resolvedForm);

      const name = String(formData.get('name') ?? '').trim();
      const email = String(formData.get('email') ?? '').trim();
      const company = String(formData.get('company') ?? '').trim();
      const message = String(formData.get('message') ?? '').trim();
      const recaptchaToken = String(token ?? '').trim();

      if (name.length < 2 || name.length > 120) throw new Error('Invalid name');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
        throw new Error('Invalid email');
      if (company && company.length > 160) throw new Error('Invalid company');
      if (message.length < 10 || message.length > 5000)
        throw new Error('Invalid message length');
      if (!recaptchaToken) throw new Error('Missing recaptchaToken');

      const payload = {
        name,
        email,
        company,
        message,
        recaptchaToken,
      };

      const body = JSON.stringify(payload);

      // This Apps Script endpoint expects a JSON body. Using `text/plain`
      // avoids a CORS preflight while still sending JSON.
      try {
        const res = await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body,
          redirect: 'follow',
        });

        if (!res.ok) {
          setContactStatus('Failed to send. Please try again later.');
          return;
        }

        const data = await res.json().catch(() => null);

        if (data?.ok) {
          setContactStatus('Thanks! Your message has been sent.');
          resolvedForm.reset();
          return;
        }

        setContactStatus('Failed to send. Please try again later.');
        console.warn('Contact form error:', data);
      } catch (err) {
        // If the browser blocks reading the response due to CORS, still attempt
        // to send the request.
        console.warn('Contact form submit (CORS fallback):', err);

        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body,
          redirect: 'follow',
        });

        setContactStatus(
          "Thanks! Your message has been sent. (We couldn't confirm delivery from your browser.)",
        );
        resolvedForm.reset();
      }
    } catch (err) {
      console.error(err);
      setContactStatus(
        err instanceof Error && err.message
          ? err.message
          : 'Failed to send. Please try again later.',
      );
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="hero-section relative flex items-start md:items-center overflow-hidden bg-[image:var(--gradient-hero)]">
        <div className="hero-bg">
          <HeroBackground />
          <div className="hero-fade" />
          <div className="hero-fade-vertical" />
        </div>

        <div className="site-container relative z-10 pt-[calc(env(safe-area-inset-top)+6.5rem)] pb-16 md:pt-32 md:pb-20">
          <div className="hero-content w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-[hsl(var(--muted-foreground))] mb-6 md:mb-8">
              <span className="badge-dot animate-pulse" />
              Platform Modernization · Spec-First · Production-Grade
            </div>

            <h1 className="text-[clamp(2rem,8vh,2.75rem)] md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1]">
              Your Platform, <span className="gradient-text">Modernized.</span>
              <br />
              Your Delivery, <span className="gradient-text">Unblocked.</span>
            </h1>

            <p className="text-base md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mb-8 md:mb-10 leading-relaxed">
              MONAD is a senior hands-on consultancy that helps engineering
              teams modernize monoliths, tame integration complexity, and ship
              production-ready systems with spec-first contracts and full
              observability.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                className="btn btn-hero btn-lg group"
                href="/platform-modernization-review"
              >
                Book a Platform Review
                <IconArrowRight className="btn-icon transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a className="btn btn-outline btn-lg" href="#work">
                View Our Work
              </a>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12 mt-10 md:mt-16">
              <div className="hero-stat">
                <div className="hero-stat-top">
                  <IconLayers className="hero-stat-icon" />
                  <div className="hero-stat-value gradient-text">20+</div>
                </div>
                <div className="hero-stat-label">Years Experience</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-top">
                  <IconCode className="hero-stat-icon" />
                  <div className="hero-stat-value gradient-text">40+</div>
                </div>
                <div className="hero-stat-label">Projects Delivered</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-top">
                  <IconBadgeCheck className="hero-stat-icon" />
                  <div className="hero-stat-value gradient-text">5</div>
                </div>
                <div className="hero-stat-label">Platforms Modernized</div>
              </div>
            </div>
          </div>
        </div>

        <a
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
          href="#best-fit"
          aria-label="Scroll to content"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[hsl(var(--muted-foreground)_/_0.3)] flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          </div>
          <span className="sr-only">Scroll</span>
        </a>
      </section>

      {/* ── Best Fit For ── */}
      <section
        id="best-fit"
        className="section"
        style={{ paddingBottom: '3rem' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Best Fit For</div>
            <h2 className="section-title">
              Built for Teams With{' '}
              <span className="gradient-text">Complex Systems.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Product companies scaling beyond early-stage architecture',
              'Enterprises modernizing monoliths or fragmented systems',
              'Platform teams improving delivery speed, reliability, and developer experience',
              'Organizations needing senior hands-on architecture plus implementation',
            ].map((item) => (
              <div
                className="grid grid-cols-[auto_1fr] items-start gap-3.5"
                key={item}
              >
                <CheckIcon />
                <p className="section-lead" style={{ margin: 0 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problems We Solve ── */}
      <section id="services" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Selected Problems We Solve</div>
            <h2 className="section-title">
              We Fix What Slows{' '}
              <span className="gradient-text">Engineering Down.</span>
            </h2>
            <p className="section-lead">
              These are the recurring patterns we see in platform and product
              organizations. If any of these sound familiar, we can help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <article key={problem.title} className="card hover-lift">
                <div className="card-glow" />
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                  {problem.title}
                </h3>
                <p className="section-lead">{problem.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {problem.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Engage ── */}
      <section
        id="engage"
        className="section bg-[hsl(var(--secondary)_/_0.15)]"
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">How We Engage</div>
            <h2 className="section-title">
              Three Ways to <span className="gradient-text">Work With Us.</span>
            </h2>
            <p className="section-lead">
              Every engagement starts with understanding your architecture and
              constraints. We scale involvement to match what you actually need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagements.map((eng) => (
              <article key={eng.title} className="card hover-lift">
                <div className="card-glow" />
                <div
                  className="expertise-icon"
                  style={{ marginBottom: '1.25rem' }}
                >
                  {eng.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  {eng.title}
                </h3>
                <div className="grid gap-3">
                  <div>
                    <p
                      className="section-eyebrow"
                      style={{ marginBottom: '0.3rem' }}
                    >
                      What it is
                    </p>
                    <p className="section-lead">{eng.what}</p>
                  </div>
                  <div>
                    <p
                      className="section-eyebrow"
                      style={{ marginBottom: '0.3rem' }}
                    >
                      When it helps
                    </p>
                    <p className="section-lead">{eng.when}</p>
                  </div>
                  <div>
                    <p
                      className="section-eyebrow"
                      style={{ marginBottom: '0.3rem' }}
                    >
                      What you get
                    </p>
                    <p className="section-lead">{eng.outcome}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why MONAD ── */}
      <section id="why" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Why MONAD</div>
            <h2 className="section-title">
              Not an Agency.{' '}
              <span className="gradient-text">A Senior Partner.</span>
            </h2>
            <p className="section-lead">
              We are a small, senior consultancy. No account managers, no
              rotating bench, no juniors learning on your project. Every
              engagement is delivered by the same senior practitioners from
              assessment through to production — no handoffs, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[auto_1fr] items-start gap-3.5"
              >
                <CheckIcon />
                <div>
                  <h3 className="value-title">{item.title}</h3>
                  <p className="section-lead">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section
        className="section"
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <div className="site-container">
          <div
            className="glass card text-center"
            style={{ padding: '3rem 2rem' }}
          >
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Ready to Modernize{' '}
              <span className="gradient-text">Your Platform?</span>
            </h2>
            <p
              className="section-lead mx-auto"
              style={{ maxWidth: '50ch', marginBottom: '2rem' }}
            >
              Start with a focused architecture review. We will identify your
              highest-impact bottlenecks and give you a concrete roadmap.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                className="btn btn-hero btn-lg group"
                href="/platform-modernization-review"
              >
                Book a Platform Review
                <IconArrowRight className="btn-icon transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a className="btn btn-outline btn-lg" href="#engage">
                See How We Engage
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="work" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Case Studies</div>
            <h2 className="section-title">
              Real Problems,{' '}
              <span className="gradient-text">Real Solutions.</span>
            </h2>
            <p className="section-lead">
              Selected engagements where we helped teams reduce infrastructure
              costs, improve system reliability, and establish cleaner
              architecture — with hands-on delivery, not just advice.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <article
                key={`${study.title}-${index}`}
                className={`card hover-lift work-card overflow-hidden p-10 transition-[border-color] duration-500 md:p-11 ${
                  study.highlight && index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="card-glow" />
                <div className="relative z-[1] flex h-full flex-col">
                  <div className="work-category">{study.category}</div>
                  <h3 className="work-card-title">{study.title}</h3>
                  <p className="work-card-description">{study.description}</p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section">
        <div className="site-container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12">
            <div>
              <div className="section-eyebrow">About Us</div>
              <h2 className="section-title">
                Senior Consultancy,{' '}
                <span className="gradient-text">Hands-On Delivery.</span>
              </h2>
              <p className="section-lead">
                MONAD is a founder-led software consultancy with over 20 years
                of hands-on engineering experience across complex, high-stakes
                systems — from banking infrastructure and insurance platforms to
                government cloud and high-growth product companies.
              </p>
              <p className="section-lead">
                We work as embedded senior engineers and architects, not as
                external advisors who leave you with a slide deck. The people
                who assess your architecture are the same people who write the
                code, deploy the infrastructure, and set up the observability.
                Every engagement ends with working software and transferred
                knowledge.
              </p>

              <div className="grid gap-5 mt-3">
                {[
                  {
                    title: 'Spec-First Engineering',
                    description:
                      'Contracts before code. OpenAPI, AsyncAPI, and JSON Schema govern all system boundaries.',
                  },
                  {
                    title: 'Production-Grade Standards',
                    description:
                      'Observability, quality gates, and automated testing are delivery requirements — not optional extras.',
                  },
                  {
                    title: 'Pragmatic Over Dogmatic',
                    description:
                      'We choose boring technology where it works and modern tooling where it matters. No hype-driven architecture.',
                  },
                  {
                    title: 'Transparent Partnership',
                    description:
                      'Honest estimates, continuous communication, and no surprises. We flag risks early and adjust course together.',
                  },
                ].map((value) => (
                  <div
                    className="grid grid-cols-[auto_1fr] items-start gap-3.5"
                    key={value.title}
                  >
                    <CheckIcon />
                    <div>
                      <h3 className="value-title">{value.title}</h3>
                      <p className="section-lead">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="glass card">
                <h3>Our Principles</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Spec-First',
                    'Cloud-Native',
                    'Incremental Modernization',
                    'Security by Default',
                    'Full Observability',
                    'Platform Engineering',
                  ].map((principle) => (
                    <span key={principle} className="tag">
                      {principle}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass card">
                <h3>Technology Stack</h3>
                <div className="grid gap-4">
                  <div>
                    <p className="section-eyebrow">Languages & Frameworks</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.languages.map((tech) => (
                        <span key={tech} className="tag-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="section-eyebrow">Infrastructure</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.infrastructure.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="section-eyebrow">Data & Messaging</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.data.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="section-eyebrow">Observability</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.observability.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass card">
                  <div className="hero-stat-value gradient-text">20+</div>
                  <div className="hero-stat-label">Years Experience</div>
                </div>
                <div className="glass card">
                  <div className="hero-stat-value gradient-text">40+</div>
                  <div className="hero-stat-label">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3>Core Expertise</h3>
            <div className="expertise-grid">
              {expertise.map((item) => (
                <div key={item.title} className="expertise-card hover-lift">
                  <div className="expertise-icon">{item.code}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p className="section-lead">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section
        id="partners"
        className="section bg-[hsl(var(--secondary)_/_0.3)]"
      >
        <div className="site-container">
          <div className="section-header mx-auto text-center">
            <div className="section-eyebrow">Trusted By</div>
            <h2 className="section-title">
              Companies We Have{' '}
              <span className="gradient-text">Delivered For</span>
            </h2>
            <p
              className="section-lead"
              style={{ maxWidth: '50ch', margin: '0 auto' }}
            >
              From government infrastructure to fintech platforms and
              high-growth product companies — every logo represents a hands-on
              architecture or delivery engagement.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-5">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="partner-card hover-lift flex h-[100px] items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={60}
                  className={`partner-logo ${
                    partner.tone === 'light' ? 'partner-logo--light' : ''
                  } ${partner.tone === 'mono' ? 'partner-logo--mono' : ''}`}
                />
              </div>
            ))}
          </div>

          {/* ── International Buyer Trust Block ── */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {[
              {
                label: 'EU-Based Consultancy',
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 24, height: 24 }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                ),
              },
              {
                label: 'Remote-First Collaboration',
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 24, height: 24 }}
                    aria-hidden="true"
                  >
                    <path d="M15 10l5 0a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2h5" />
                    <polyline points="8 14 12 18 16 14" />
                    <line x1="12" y1="18" x2="12" y2="4" />
                  </svg>
                ),
              },
              {
                label: 'English-Speaking Delivery',
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 24, height: 24 }}
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
              },
              {
                label: 'Short Assessments to Long Partnerships',
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 24, height: 24 }}
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
              },
              {
                label: 'Enterprise & Complex-System Experience',
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 24, height: 24 }}
                    aria-hidden="true"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <line x1="9" y1="6" x2="15" y2="6" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                    <line x1="9" y1="18" x2="12" y2="18" />
                  </svg>
                ),
              },
            ].map((trust) => (
              <div
                key={trust.label}
                className="glass card flex flex-col items-center gap-2"
                style={{ padding: '1.25rem 1rem' }}
              >
                <span style={{ color: 'hsl(var(--primary))' }}>
                  {trust.icon}
                </span>
                <span
                  className="text-[hsl(var(--muted-foreground))]"
                  style={{ fontSize: '0.82rem', lineHeight: 1.35 }}
                >
                  {trust.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section">
        <div className="site-container grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12">
          <div>
            <div className="section-eyebrow">Get in Touch</div>
            <h2 className="section-title">
              Let&apos;s Discuss Your{' '}
              <span className="gradient-text">Platform Challenges.</span>
            </h2>
            <p className="section-lead">
              Whether you need an architecture review, a modernization roadmap,
              or hands-on senior engineering — reach out and we will figure out
              the right engagement together.
            </p>

            <div className="mt-8 grid gap-6">
              <div className="flex items-center gap-4">
                <div className="contact-icon inline-flex h-11 w-11 items-center justify-center rounded-xl">
                  @
                </div>
                <div>
                  <div className="section-eyebrow">Email</div>
                  <a href="mailto:hello@monad.hu">hello@monad.hu</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="contact-icon inline-flex h-11 w-11 items-center justify-center rounded-xl">
                  +
                </div>
                <div>
                  <div className="section-eyebrow">Phone</div>
                  <a href="tel:+36306360775">+36 30 636 0775</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="contact-icon inline-flex h-11 w-11 items-center justify-center rounded-xl">
                  HU
                </div>
                <div>
                  <div className="section-eyebrow">Location</div>
                  <a
                    href="https://maps.app.goo.gl/UYrvowK7skeSyuaq5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gödöllő, Hungary (EU)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass card">
            <form id="contactForm" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    minLength={2}
                    maxLength={120}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    maxLength={254}
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  className="form-input"
                  placeholder="Your company"
                  maxLength={160}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your platform challenges — architecture review, modernization roadmap, or delivery support..."
                  minLength={10}
                  maxLength={5000}
                  required
                />
              </div>

              <div
                id="status"
                role="status"
                aria-live="polite"
                className="mt-4 text-[hsl(var(--muted-foreground))]"
              >
                {contactStatus ||
                  (!isContactFormConfigured
                    ? 'Contact form is currently unavailable. Please email hello@monad.hu.'
                    : '')}
              </div>

              <button
                type="submit"
                className="btn btn-hero mt-6 w-full"
                disabled={isSubmittingContact || !isContactFormConfigured}
              >
                {isSubmittingContact
                  ? 'Sending...'
                  : isContactFormConfigured
                    ? 'Send Message'
                    : 'Contact Unavailable'}
              </button>

              <div className="recaptcha-row" aria-live="polite">
                <p className="recaptcha-note">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
