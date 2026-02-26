import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import HeroBackground from '../components/HeroBackground';
import Layout from '../components/Layout';

const services = [
  {
    title: 'Custom Software Development',
    description:
      'End-to-end development of scalable applications using modern technologies. From MVPs to enterprise-grade systems, we deliver quality code that lasts.',
    features: ['Full-Stack Delivery', 'API Design', 'Cloud Architecture'],
  },
  {
    title: 'Technology Consulting',
    description:
      'Strategic guidance to modernize your tech stack, optimize processes, and adopt best practices. We help you make informed decisions for long-term success.',
    features: ['Tech Stack Audits', 'Architecture Reviews', 'DevOps Strategy'],
  },
  {
    title: 'Developer Training',
    description:
      'Upskill your team with hands-on workshops and courses. From TypeScript to Lean-Agile practices, we empower developers to build better software.',
    features: ['Workshop Programs', 'Team Coaching', 'Best Practices'],
  },
];

const caseStudies = [
  {
    title: 'Fizz',
    category: 'Platform Engineering',
    description:
      'Stabilized and modernized a cost-inefficient distributed monolith by introducing spec-first (API design-first) delivery, quality gates, and production-grade observability. Improved reliability and security posture while enabling a cleaner evolution toward microservices. Search synchronization was sped up significantly and infrastructure costs were cut by about 90%.',
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
    category: 'Full-Stack Modernization',
    description:
      'Modernized a national-scale voting information system with a modular React frontend and a cloud-ready platform foundation. Improved scalability, observability, and long-term maintainability with better developer experience and operational readiness.',
    tags: ['React', 'Observability', 'Cloud-Ready', 'Modular Frontend'],
    highlight: true,
  },
  {
    title: 'Netrisk',
    category: 'Cloud Architecture',
    description:
      'Designed a Node.js microservices architecture with Kafka-based eventing to support high-throughput insurance purchases. Added resilience patterns and end-to-end observability to improve reliability, scalability, and operational confidence.',
    tags: ['Node.js', 'Kafka', 'Event-Driven', 'Microservices'],
  },
  {
    title: 'IDBC',
    category: 'Banking Infrastructure',
    description:
      'Built core foundations for a scalable banking platform using Node.js and Kafka-based event-driven architecture. Delivered complex legacy integrations and data migration into a unified, extensible platform.',
    tags: ['Node.js', 'Kafka', 'Event-Driven', 'Data Migration'],
  },
  {
    title: 'Webshippy',
    category: 'Backend Decomposition',
    description:
      'Decomposed a PHP monolith into a dedicated backend API and a modular Vue.js frontend. Containerized the system to enable independent releases, clearer boundaries, and a smoother path toward service-oriented evolution.',
    tags: ['Vue.js', 'PHP', 'Docker', 'API Design', 'Microservices'],
  },
];

const values = [
  {
    title: 'Lean-Agile Mindset',
    description:
      'We embrace iterative development, continuous improvement, and rapid feedback loops to deliver value faster.',
  },
  {
    title: 'Quality First',
    description:
      'Clean code, comprehensive testing, and best practices are non-negotiable. We build software that lasts.',
  },
  {
    title: 'Scalability by Design',
    description:
      'Every solution is architected for growth. From startup MVPs to enterprise systems, we plan for scale.',
  },
  {
    title: 'Transparent Partnership',
    description:
      'Open communication, honest estimates, and collaborative problem-solving define our client relationships.',
  },
];

const principles = [
  'API-Design-First',
  'Cloud-Native',
  'Monolith to Microservices',
  'Security-Focused',
  'Full Observability',
  'Platform Engineering',
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
    code: 'MS',
    title: 'Monolith to Microservices',
    description:
      'Modernizing legacy systems into scalable, distributed architectures',
  },
  {
    code: 'EA',
    title: 'Event-Driven Architecture',
    description: 'Scalable, loosely coupled systems with async messaging',
  },
  {
    code: 'DG',
    title: 'Data Contracts',
    description: 'Schema governance to keep services aligned and reliable',
  },
  {
    code: 'CI',
    title: 'Pipeline Engineering',
    description: 'Automated builds, tests, and deployments for rapid delivery',
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

const IconCompass = ({ className }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8l-2.5 7.5L6 18l2.5-7.5L16 8z" />
  </svg>
);

const IconGraduationCap = ({ className }) => (
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
    <path d="M22 10l-10-5L2 10l10 5 10-5z" />
    <path d="M6 12v5c0 2 3 4 6 4s6-2 6-4v-5" />
    <path d="M2 10v6" />
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
      <section className="hero-section relative flex items-center overflow-hidden bg-[image:var(--gradient-hero)]">
        <div className="hero-bg">
          <HeroBackground />
          <div className="hero-fade" />
          <div className="hero-fade-vertical" />
        </div>

        <div className="site-container relative z-10 pt-32 pb-20">
          <div className="hero-content w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[hsl(var(--muted-foreground))] mb-8 animate-slide-up">
              <span className="badge-dot animate-pulse" />
              Cloud-Native · Event-Driven · Platform Engineering
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-8 animate-slide-up delay-100 leading-[1.1]">
              Built for <span className="gradient-text">Scale.</span>
              <br />
              Trusted by <span className="gradient-text">Enterprise.</span>
            </h1>

            <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mb-10 animate-slide-up delay-200 leading-relaxed">
              We architect distributed systems, migrate monoliths to
              microservices, and build internal platforms that accelerate
              delivery. API-first design. Full observability. Production-grade
              from day one.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up delay-300">
              <a className="btn btn-hero btn-lg group" href="#contact">
                Start Your Project
                <IconArrowRight className="btn-icon transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link className="btn btn-outline btn-lg" href="/works">
                View Our Work
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12 mt-16 animate-slide-up delay-400">
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
                  <div className="hero-stat-value gradient-text">100%</div>
                </div>
                <div className="hero-stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        <a
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
          href="#services"
          aria-label="Scroll to content"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[hsl(var(--muted-foreground)_/_0.3)] flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          </div>
          <span className="sr-only">Scroll</span>
        </a>
      </section>

      <section id="services" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-title">
              Engineering Excellence,{' '}
              <span className="gradient-text">Delivered.</span>
            </h2>
            <p className="section-lead">
              We combine deep technical expertise with Lean-Agile methodologies
              to deliver solutions that scale with your business.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {services.map((service) => (
              <article key={service.title} className="card hover-lift">
                <div className="card-glow" />
                <div className="service-icon" aria-hidden="true">
                  {service.title === 'Custom Software Development' ? (
                    <IconCode className="service-icon-svg" />
                  ) : null}
                  {service.title === 'Technology Consulting' ? (
                    <IconCompass className="service-icon-svg" />
                  ) : null}
                  {service.title === 'Developer Training' ? (
                    <IconGraduationCap className="service-icon-svg" />
                  ) : null}
                </div>
                <h3>{service.title}</h3>
                <p className="section-lead">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span className="tag" key={feature}>
                      {feature}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="site-container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12">
            <div>
              <div className="section-eyebrow">About Us</div>
              <h2 className="section-title">
                We Build Software{' '}
                <span className="gradient-text">That Matters.</span>
              </h2>
              <p className="section-lead">
                MONAD is a software development consultancy specializing in
                building enterprise-grade applications. With over 15 years of
                experience, we have helped companies across industries transform
                ideas into scalable, maintainable solutions.
              </p>
              <p className="section-lead">
                Our team combines deep technical expertise with a pragmatic
                approach to software development. We do not just write code. We
                solve business problems and create lasting partnerships.
              </p>

              <div className="grid gap-5 mt-3">
                {values.map((value) => (
                  <div
                    className="grid grid-cols-[auto_1fr] items-start gap-3.5"
                    key={value.title}
                  >
                    <CheckIcon />
                    <div>
                      <h4 className="value-title">{value.title}</h4>
                      <p className="section-lead">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="glass card">
                <h3>Our Approach</h3>
                <div className="grid grid-cols-2 gap-3">
                  {principles.map((principle) => (
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

      <section id="work" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Case Studies</div>
            <h2 className="section-title">
              Real Problems,{' '}
              <span className="gradient-text">Real Solutions.</span>
            </h2>
            <p className="section-lead">
              We help engineering teams modernize legacy systems, adopt
              microservices, and build platforms that scale — with better DX and
              lower costs.
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

      <section
        id="partners"
        className="section bg-[hsl(var(--secondary)_/_0.3)]"
      >
        <div className="site-container">
          <div className="section-header mx-auto text-center">
            <div className="section-eyebrow">Trusted By</div>
            <h2 className="section-title">
              Companies We Have{' '}
              <span className="gradient-text">Partnered With</span>
            </h2>
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
        </div>
      </section>

      <section id="contact" className="section">
        <div className="site-container grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12">
          <div>
            <div className="section-eyebrow">Get in Touch</div>
            <h2 className="section-title">
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Amazing.</span>
            </h2>
            <p className="section-lead">
              Ready to transform your ideas into reality? We would love to hear
              about your project. Reach out and let&apos;s discuss how we can
              help.
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
                  <span>Gödöllő, Hungary</span>
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
                  placeholder="Tell us about your project..."
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
