import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import { LOCALES, useTranslation } from '../../lib/i18n';

const HeroBackground = dynamic(
  () => import('../../components/HeroBackground'),
  {
    ssr: false,
  },
);

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
    tags: ['Custom Software Engineering', 'CI/CD', 'Developer Experience'],
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
    title: 'Software Architecture Review',
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
    category: 'Custom Software Engineering',
    description:
      'Modernized search for an OTP ecosystem platform — replacing a slow third-party provider with Azure AI Search via an adapter pattern, delivering annual savings in the hundreds of thousands of USD and dramatically faster search synchronization. Cut CI time from roughly an hour to about six minutes. Introduced spec-first API delivery, automated quality gates, and production-grade observability across a distributed monolith — then decomposed it into properly decoupled microservices with clear service boundaries, stabilizing reliability and strengthening security posture.',
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
    title: 'Custom Software Engineering',
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
    title: 'Custom Software Engineering',
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
  const router = useRouter();
  const { locale } = useTranslation();

  useEffect(() => {
    if (!router.isReady || locale !== 'en') return;
    const nextPath = router.asPath.replace(/^\/en(?=\/|$)/, '') || '/';
    if (nextPath !== router.asPath) {
      router.replace(nextPath);
    }
  }, [locale, router]);

  const isHu = locale === 'hu';
  const copy = isHu
    ? {
        heroBadge: 'Egyedi szoftverfejlesztés · Spec-First · Production-Grade',
        heroLine1: 'Built for Scale.',
        heroLine2: 'Trusted by Enterprise.',
        heroIntro:
          'We architect distributed systems, migrate monoliths to microservices, and build internal platforms that accelerate delivery. API-first design. Full observability. Production-grade from day one.',
        heroPrimaryCta: 'Szoftverarchitektúra Review foglalása',
        heroSecondaryCta: 'Munkáink',
        statYears: 'Év tapasztalat',
        statProjects: 'Leszállított projekt',
        statSavings: 'Éves megtakarítás',
        bestFitEyebrow: 'Kinek ideális',
        bestFitTitlePrefix: 'Olyan csapatoknak, ahol',
        bestFitTitleAccent: 'komplex a rendszer.',
        bestFitItems: [
          'Termékcégeknek, amelyek túlnőttek a korai architektúrán',
          'Vállalatoknak, amelyek monolitot vagy töredezett rendszereket modernizálnak',
          'Mérnöki csapatoknak, amelyek gyorsabb szállítást, megbízhatóságot és jobb fejlesztői élményt akarnak',
          'Szervezeteknek, amelyek senior architektúrát és kivitelezést is igényelnek',
        ],
        problemsEyebrow: 'Tipikus problémák, amiket megoldunk',
        problemsTitlePrefix: 'Azt javítjuk, ami',
        problemsTitleAccent: 'lassítja a mérnöki munkát.',
        problemsLead:
          'Ezek azok a visszatérő minták, amelyeket mérnöki és termékcsapatoknál látunk. Ha ezek közül bármelyik ismerős, tudunk segíteni.',
        engageEyebrow: 'Együttműködési formák',
        whyEyebrow: 'Miért minket',
        midCtaSecondary: 'Így dolgozunk együtt',
        caseStudiesEyebrow: 'Esettanulmányok',
        contactEyebrow: 'Kapcsolat',
      }
    : {
        heroBadge:
          'Custom Software Engineering · Spec-First · Production-Grade',
        heroLine1: 'Built for Scale.',
        heroLine2: 'Trusted by Enterprise.',
        heroIntro:
          'We architect distributed systems, migrate monoliths to microservices, and build internal platforms that accelerate delivery. API-first design. Full observability. Production-grade from day one.',
        heroPrimaryCta: 'Book a Software Architecture Review',
        heroSecondaryCta: 'View Our Work',
        statYears: 'Years Experience',
        statProjects: 'Projects Delivered',
        statSavings: 'Annual Client Savings',
        bestFitEyebrow: 'Best Fit For',
        bestFitTitlePrefix: 'Built for Teams With',
        bestFitTitleAccent: 'Complex Systems.',
        bestFitItems: [
          'Product companies scaling beyond early-stage architecture',
          'Enterprises modernizing monoliths or fragmented systems',
          'Engineering teams improving delivery speed, reliability, and developer experience',
          'Organizations needing senior hands-on architecture plus implementation',
        ],
        problemsEyebrow: 'Selected Problems We Solve',
        problemsTitlePrefix: 'We Fix What Slows',
        problemsTitleAccent: 'Engineering Down.',
        problemsLead:
          'These are the recurring patterns we see in engineering and product organizations. If any of these sound familiar, we can help.',
        engageEyebrow: 'How We Engage',
        whyEyebrow: 'Why Us',
        midCtaSecondary: 'See How We Engage',
        caseStudiesEyebrow: 'Case Studies',
        contactEyebrow: 'Get in Touch',
      };
  const homeContent = isHu
    ? {
        problems: [
          {
            title: 'Monolitból moduláris architektúra',
            description:
              'A monolit kinőtte a csapatot. A release-ek lassúak, kockázatosak és szorosan csatoltak. Gyakorlatias utat adunk moduláris vagy service-orientált működéshez teljes újraírás nélkül.',
            tags: ['Felbontás', 'Bounded Context', 'Strangler Fig'],
          },
          {
            title: 'Integrációs komplexitás',
            description:
              'A rendszerek törékeny point-to-point integrációkkal és ad hoc üzenetformátumokkal kapcsolódnak, tiszta ownership nélkül. A hibák láncreakcióban terjednek.',
            tags: ['Event-Driven', 'Kafka', 'Aszinkron üzenetkezelés'],
          },
          {
            title: 'Inkonzisztens API-k és gyenge szerződések',
            description:
              'Minden szolgáltatás saját konvenciót követ. A kliensek találgatják a payload formátumot. A validáció duplikált, a breaking change-ek észrevétlenül mennek ki.',
            tags: ['OpenAPI', 'AsyncAPI', 'Spec-First', 'JSON Schema'],
          },
          {
            title: 'Platform friction, ami lassítja a szállítást',
            description:
              'A fejlesztők infrastruktúrára várnak, instabil CI pipeline-okkal küzdenek, és hiányzó toolokat kerülgetnek. A platform gyorsító helyett bottleneck.',
            tags: ['Egyedi szoftverfejlesztés', 'CI/CD', 'Fejlesztői élmény'],
          },
          {
            title: 'Gyenge megfigyelhetőség és vakfoltok',
            description:
              'A production hibák felhasználói panaszokból derülnek ki. A distributed trace hiányos vagy nincs. Nincs strukturált SLO, alerting és incident response gyakorlat.',
            tags: ['OpenTelemetry', 'Grafana', 'Prometheus', 'SLO-k'],
          },
          {
            title: 'Növekvő cloud költség és architektúrális pazarlás',
            description:
              'Az infrastruktúra költség nő, de nem látszik az értékarány. Túlméretezett klaszterek, redundáns szolgáltatások és nem optimalizált adatutak viszik a büdzsét.',
            tags: [
              'Költségoptimalizálás',
              'Right-Sizing',
              'Architektúra review',
            ],
          },
        ],
        engagements: [
          {
            step: '01',
            title: 'Szoftverarchitektúra review',
            what: 'Fókuszált felmérés a jelenlegi architektúráról, integrációs mintákról, delivery pipeline-ról és üzemeltetési állapotról.',
            when: 'Azt gyanítjátok, hogy az architekturális adósság lassít, de független senior nézőpont kell a prioritások és kockázatok tisztázásához.',
            outcome:
              'Írásos megállapítások és priorizált, végrehajtható roadmap, konkrét lépésekkel.',
          },
          {
            step: '02',
            title: 'Fractional architektúra vezetés',
            what: 'Folyamatos senior architektúra támogatás beágyazva a csapatotokba részmunkaidős retained formában.',
            when: 'Principal szintű iránymutatás kell, de teljes állású hire nem reális vagy nem időben kivitelezhető.',
            outcome:
              'Konzisztensebb architektúra döntések, kevesebb újramunka és gyorsabban fejlődő belső csapat.',
          },
          {
            step: '03',
            title: 'Delivery együttműködés',
            what: 'Hands-on implementáció senior mérnökökkel: production-ready kód, infrastruktúra és observability.',
            when: 'Tiszta modernizációs scope van, és kell egy tapasztalt csapat, amely end-to-end felelősséget vállal a szállításért.',
            outcome:
              'Élesben futó rendszer tiszta szerződésekkel, tesztelt határokkal, beépített observability-vel és átadott tudással.',
          },
        ],
        differentiators: [
          {
            title: 'Senior, valóban hands-on kivitelezés',
            description:
              'Nincs bench rotáció, nincs junior staffing. Aki felméri a rendszert, az dolgozik a megvalósításon is.',
          },
          {
            title: 'Architektúra + delivery együtt',
            description:
              'Nem csak diagramokat rajzolunk: megtervezzük és le is szállítjuk a rendszert production szinten.',
          },
          {
            title: 'Pragmatikus modernizáció',
            description:
              'Nem erőltetünk rewrite-ot. A javaslatokat a valós korlátaitokhoz, ütemetekhez és csapatotokhoz igazítjuk.',
          },
          {
            title: 'API és Spec-First fegyelem',
            description:
              'A szerződés megelőzi a kódot. OpenAPI, AsyncAPI és JSON Schema ad megbízható határokat.',
          },
          {
            title: 'Observability és production readiness',
            description:
              'Minden munkában alap a strukturált logging, tracing, metrikák és alerting.',
          },
          {
            title: 'Teljes platform mélység',
            description:
              'Backend, frontend, infrastruktúra, CI/CD, adatfolyamok, event-driven integráció egy kézben.',
          },
        ],
        caseStudies: [
          {
            title: 'Fizz',
            category: 'Egyedi szoftverfejlesztés',
            description:
              'Modernizáltuk az OTP ökoszisztéma egyik platformjának keresését — a lassú külső szolgáltatót adapter-mintával Azure AI Search-re cseréltük, évi több százezer USD megtakarítást és jelentősen gyorsabb keresési szinkronizációt elérve. A CI időt kb. egy óráról kb. hat percre csökkentettük. Bevezettük a spec-first API szállítást, automatizált minőségi kapukat és production-grade observability-t, majd a distributed monolitot ténylegesen szétválasztott, lazán csatolt mikroszervizekre bontottuk, tiszta szolgáltatáshatárokkal.',
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
              'Senior architektúra tanácsadást adtunk egy kormányzati technológiai szervezetnek cloud infrastruktúra, üzemeltetés és platformstratégia területen.',
            tags: ['Cloud Architecture', 'Consulting'],
            highlight: true,
          },
          {
            title: 'Netrisk',
            category: 'Cloud Architecture',
            description:
              'Nagy terhelésű biztosításkötési platformot terveztünk Node.js mikroszervizekkel és Kafka event-driven kommunikációval, jobb megbízhatósággal és trace-elhetőséggel.',
            tags: ['Node.js', 'Kafka', 'Event-Driven', 'Microservices'],
          },
          {
            title: 'IDBC',
            category: 'Banking Infrastructure',
            description:
              'Skálázható banki platform alaparchitektúráját építettük meg Node.js és Kafka alapokon, komplex legacy integrációval és adatvándorlással.',
            tags: ['Node.js', 'Kafka', 'Event-Driven', 'Data Migration'],
          },
          {
            title: 'Webshippy',
            category: 'Backend Decomposition',
            description:
              'Monolit PHP alkalmazást bontottunk tiszta backend API-ra és moduláris Vue.js frontend-re. Dockeres full-stack konténerizálással függetlenebb release ciklusokat tettünk lehetővé.',
            tags: ['Vue.js', 'PHP', 'Docker', 'API Design', 'Microservices'],
          },
        ],
        engageTitlePrefix: 'Három mód, hogy',
        engageTitleAccent: 'együtt dolgozzunk.',
        engageLead:
          'Minden együttműködés az architektúra és a korlátok megértésével indul. Az involvement szintjét a valós igényhez igazítjuk.',
        engageWhat: 'Mi ez',
        engageWhen: 'Mikor segít',
        engageOutcome: 'Mit kapsz',
        whyTitlePrefix: 'Nem ügynökség.',
        whyTitleAccent: 'Senior partner.',
        whyLead:
          'Kis, senior tanácsadó csapat vagyunk. Nincs account manager, nincs rotáció, nincs junior tanuló projekt. Ugyanaz a csapat kísér végig a felméréstől productionig.',
        midCtaTitlePrefix: 'Készen állsz modernizálni',
        midCtaTitleAccent: 'a szoftveres működéseteket?',
        midCtaLead:
          'Kezdjük egy fókuszált architektúra review-val. Azonosítjuk a legnagyobb hatású bottleneckeket és konkrét roadmapet adunk.',
        midCtaPrimary: 'Szoftverarchitektúra Review foglalása',
        caseStudiesTitlePrefix: 'Valós problémák,',
        caseStudiesTitleAccent: 'valós megoldások.',
        caseStudiesLead:
          'Olyan együttműködések, ahol kézzel foghatóan csökkentettünk költséget, javítottunk megbízhatóságot és tisztább architektúrát építettünk.',
        aboutEyebrow: 'Rólunk',
        aboutTitlePrefix: 'Senior tanácsadás,',
        aboutTitleAccent: 'hands-on szállítás.',
        aboutLead1:
          'A MONAD founder-led szoftver tanácsadó csapat, több mint 20 év gyakorlati mérnöki tapasztalattal komplex, kritikus rendszerekben.',
        aboutLead2:
          'Beágyazott senior mérnökként és architektként dolgozunk. Aki felméri a rendszert, ugyanaz írja a kódot, építi az infrastruktúrát és állítja be az observability-t.',
        aboutValues: [
          {
            title: 'Spec-First mérnöki működés',
            description:
              'Szerződés a kód előtt. OpenAPI, AsyncAPI és JSON Schema vezérli a rendszerhatárokat.',
          },
          {
            title: 'Production-grade standardok',
            description:
              'Observability, quality gate-ek és automatizált tesztek alapkövetelményként jelennek meg.',
          },
          {
            title: 'Pragmatikus, nem dogmatikus',
            description:
              'Ahol a bevált technológia jobb, azt választjuk; ahol a modern eszköz számít, ott váltunk.',
          },
          {
            title: 'Transzparens együttműködés',
            description:
              'Őszinte becslések, folyamatos kommunikáció, korai kockázatjelzés és közös iránykorrekció.',
          },
        ],
        principlesTitle: 'Alapelveink',
        principles: [
          'Spec-First',
          'Cloud-Native',
          'Inkrementális modernizáció',
          'Security by Default',
          'Teljes observability',
          'Egyedi szoftverfejlesztés',
        ],
        techTitle: 'Technológiai stack',
        techLangLabel: 'Nyelvek és keretrendszerek',
        techInfraLabel: 'Infrastruktúra',
        techDataLabel: 'Adat és üzenetkezelés',
        techObsLabel: 'Observability',
        yearsLabel: 'Év tapasztalat',
        projectsLabel: 'Leszállított projekt',
        expertiseTitle: 'Kulcsterületek',
        partnersEyebrow: 'Akik már bíztak bennünk',
        partnersTitle: 'Cégek, amelyeknek szállítottunk',
        trustLabels: [
          'EU-alapú tanácsadó csapat',
          'Remote-first együttműködés',
          'Angol nyelvű szállítás',
          'Rövid felméréstől hosszú partnerségig',
          'Vállalati és komplex rendszer tapasztalat',
        ],
        contactTitlePrefix: 'Beszéljünk a',
        contactTitleAccent: 'szoftveres kihívásaitokról.',
        contactLead:
          'Legyen szó architektúra review-ról, modernizációs roadmapről vagy hands-on mérnöki támogatásról, együtt megtaláljuk a megfelelő formát.',
        phoneLabel: 'Telefon',
        locationLabel: 'Helyszín',
        locationValue: 'Gödöllő, Magyarország (EU)',
        nameLabel: 'Név',
        namePlaceholder: 'Neved',
        emailLabel: 'Email',
        emailPlaceholder: 'email@pelda.hu',
        companyLabel: 'Cég',
        companyPlaceholder: 'Céged neve',
        messageLabel: 'Üzenet',
        messagePlaceholder:
          'Írd le röviden a szoftveres kihívásaitokat: architektúra review, modernizációs roadmap vagy delivery támogatás...',
        sendingText: 'Küldés...',
        sendButton: 'Üzenet küldése',
        contactUnavailableButton: 'Kapcsolatfelvétel nem elérhető',
        contactUnavailableStatus:
          'A kapcsolatfelvételi űrlap jelenleg nem elérhető. Kérlek írj a hello@monad.hu címre.',
        contactUnavailableInline:
          'A kapcsolatfelvétel átmenetileg nem elérhető. Kérlek írj a hello@monad.hu címre.',
        contactFailed: 'Sikertelen küldés. Kérlek próbáld újra később.',
        contactSent: 'Köszönjük! Az üzenetedet elküldtük.',
        contactSentFallback:
          'Köszönjük! Az üzenetet elküldtük. (A böngészőből nem tudtuk visszaigazolni a kézbesítést.)',
        recaptchaNotePrefix: 'Ezt az oldalt a reCAPTCHA védi, és a Google',
        recaptchaNoteMiddle: 'és',
        recaptchaNoteSuffix: 'érvényes.',
      }
    : {
        problems,
        engagements,
        differentiators,
        caseStudies,
        engageTitlePrefix: 'Three Ways to',
        engageTitleAccent: 'Work With Us.',
        engageLead:
          'Every engagement starts with understanding your architecture and constraints. We scale involvement to match what you actually need.',
        engageWhat: 'What it is',
        engageWhen: 'When it helps',
        engageOutcome: 'What you get',
        whyTitlePrefix: 'Not an Agency.',
        whyTitleAccent: 'A Senior Partner.',
        whyLead:
          'We are a small, senior consultancy. No account managers, no rotating bench, no juniors learning on your project. Every engagement is delivered by the same senior practitioners from assessment through to production — no handoffs, no surprises.',
        midCtaTitlePrefix: 'Ready to Modernize',
        midCtaTitleAccent: 'Your Software Delivery?',
        midCtaLead:
          'Start with a focused architecture review. We will identify your highest-impact bottlenecks and give you a concrete roadmap.',
        midCtaPrimary: 'Book a Software Architecture Review',
        caseStudiesTitlePrefix: 'Real Problems,',
        caseStudiesTitleAccent: 'Real Solutions.',
        caseStudiesLead:
          'Selected engagements where we helped teams reduce infrastructure costs, improve system reliability, and establish cleaner architecture — with hands-on delivery, not just advice.',
        aboutEyebrow: 'About Us',
        aboutTitlePrefix: 'Senior Consultancy,',
        aboutTitleAccent: 'Hands-On Delivery.',
        aboutLead1:
          'MONAD is a founder-led software consultancy with over 20 years of hands-on engineering experience across complex, high-stakes systems — from banking infrastructure and insurance platforms to government cloud and high-growth product companies.',
        aboutLead2:
          'We work as embedded senior engineers and architects, not as external advisors who leave you with a slide deck. The people who assess your architecture are the same people who write the code, deploy the infrastructure, and set up the observability. Every engagement ends with working software and transferred knowledge.',
        aboutValues: [
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
        ],
        principlesTitle: 'Our Principles',
        principles: [
          'Spec-First',
          'Cloud-Native',
          'Incremental Modernization',
          'Security by Default',
          'Full Observability',
          'Custom Software Engineering',
        ],
        techTitle: 'Technology Stack',
        techLangLabel: 'Languages & Frameworks',
        techInfraLabel: 'Infrastructure',
        techDataLabel: 'Data & Messaging',
        techObsLabel: 'Observability',
        yearsLabel: 'Years Experience',
        projectsLabel: 'Projects Delivered',
        expertiseTitle: 'Core Expertise',
        partnersEyebrow: 'Trusted By',
        partnersTitle: 'Companies we have delivered for',
        trustLabels: [
          'EU-Based Consultancy',
          'Remote-First Collaboration',
          'English-Speaking Delivery',
          'Short Assessments to Long Partnerships',
          'Enterprise & Complex-System Experience',
        ],
        contactTitlePrefix: "Let's Discuss Your",
        contactTitleAccent: 'Software Engineering Challenges.',
        contactLead:
          'Whether you need an architecture review, a modernization roadmap, or hands-on senior engineering — reach out and we will figure out the right engagement together.',
        phoneLabel: 'Phone',
        locationLabel: 'Location',
        locationValue: 'Gödöllő, Hungary (EU)',
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        companyLabel: 'Company',
        companyPlaceholder: 'Your company',
        messageLabel: 'Message',
        messagePlaceholder:
          'Tell us about your software engineering challenges — architecture review, modernization roadmap, or delivery support...',
        sendingText: 'Sending...',
        sendButton: 'Send Message',
        contactUnavailableButton: 'Contact Unavailable',
        contactUnavailableStatus:
          'Contact form is currently unavailable. Please email hello@monad.hu.',
        contactUnavailableInline:
          'Contact form is temporarily unavailable. Please email hello@monad.hu.',
        contactFailed: 'Failed to send. Please try again later.',
        contactSent: 'Thanks! Your message has been sent.',
        contactSentFallback:
          "Thanks! Your message has been sent. (We couldn't confirm delivery from your browser.)",
        recaptchaNotePrefix:
          'This site is protected by reCAPTCHA and the Google',
        recaptchaNoteMiddle: 'and',
        recaptchaNoteSuffix: 'apply.',
      };
  const contactText = homeContent;
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
        setContactStatus(contactText.contactUnavailableInline);
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
          setContactStatus(contactText.contactFailed);
          return;
        }

        const data = await res.json().catch(() => null);

        if (data?.ok) {
          setContactStatus(contactText.contactSent);
          resolvedForm.reset();
          return;
        }

        setContactStatus(contactText.contactFailed);
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

        setContactStatus(contactText.contactSentFallback);
        resolvedForm.reset();
      }
    } catch (err) {
      console.error(err);
      setContactStatus(
        err instanceof Error && err.message
          ? err.message
          : contactText.contactFailed,
      );
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const reviewHref =
    locale === 'en'
      ? '/platform-modernization-review'
      : `/${locale}/platform-modernization-review`;

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="hero-section relative flex items-center overflow-hidden">
        <div className="hero-bg">
          <HeroBackground />
        </div>
        <div className="hero-scrim" />

        <div className="site-container hero-inner relative z-10 w-full">
          <div className="hero-content max-w-3xl">
            <p className="hero-eyebrow">
              <span className="badge-dot" />
              {copy.heroBadge}
            </p>

            <h1 className="hero-heading">
              {copy.heroLine1}
              <br />
              <span className="gradient-text">{copy.heroLine2}</span>
            </h1>

            <p className="hero-subtitle">{copy.heroIntro}</p>

            <div className="hero-actions">
              <Link className="btn btn-hero btn-lg group" href={reviewHref}>
                {copy.heroPrimaryCta}
                <IconArrowRight className="btn-icon transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a className="btn btn-outline btn-lg" href="#work">
                {copy.heroSecondaryCta}
              </a>
            </div>

            <dl className="hero-stats">
              <div className="hero-stat">
                <dd className="hero-stat-value m-0">20+</dd>
                <dt className="hero-stat-label">{copy.statYears}</dt>
              </div>
              <div className="hero-stat">
                <dd className="hero-stat-value m-0">40+</dd>
                <dt className="hero-stat-label">{copy.statProjects}</dt>
              </div>
              <div className="hero-stat">
                <dd className="hero-stat-value m-0">$100k+</dd>
                <dt className="hero-stat-label">{copy.statSavings}</dt>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── Client logos ── */}
      <section id="partners" className="logo-band">
        <div className="site-container logo-band__inner">
          <p className="logo-band__label">
            <strong>{homeContent.partnersEyebrow}</strong>
            {homeContent.partnersTitle}
          </p>
          <div className="logo-band__logos">
            {partners.map((partner) => (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={60}
                className={`partner-logo ${
                  partner.tone === 'light' ? 'partner-logo--light' : ''
                } ${partner.tone === 'mono' ? 'partner-logo--mono' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Fit For ── */}
      <section id="best-fit" className="section">
        <div className="site-container fit-layout">
          <div>
            <p className="section-eyebrow">{copy.bestFitEyebrow}</p>
            <h2 className="section-title">
              {copy.bestFitTitlePrefix}{' '}
              <span className="title-muted">{copy.bestFitTitleAccent}</span>
            </h2>
          </div>

          <ul className="fit-list">
            {copy.bestFitItems.map((item, index) => (
              <li key={item}>
                <span className="fit-list__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Problems We Solve ── */}
      <section id="services" className="section section--ruled">
        <div className="site-container">
          <div className="section-header section-header--split">
            <div>
              <p className="section-eyebrow">
                <span className="section-eyebrow__index">01</span>
                {copy.problemsEyebrow}
              </p>
              <h2 className="section-title">
                {copy.problemsTitlePrefix}{' '}
                <span className="title-muted">{copy.problemsTitleAccent}</span>
              </h2>
            </div>
            <p className="section-lead">{copy.problemsLead}</p>
          </div>

          <div className="ruled-grid ruled-grid--3">
            {homeContent.problems.map((problem, index) => (
              <article key={problem.title} className="ruled-cell">
                <span className="ruled-cell__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="ruled-cell__title">{problem.title}</h3>
                <p className="body-text">{problem.description}</p>
                <div className="tag-list">
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
      <section id="engage" className="section section--tint">
        <div className="site-container">
          <div className="section-header section-header--split">
            <div>
              <p className="section-eyebrow">
                <span className="section-eyebrow__index">02</span>
                {copy.engageEyebrow}
              </p>
              <h2 className="section-title">
                {homeContent.engageTitlePrefix}{' '}
                <span className="title-muted">
                  {homeContent.engageTitleAccent}
                </span>
              </h2>
            </div>
            <p className="section-lead">{homeContent.engageLead}</p>
          </div>

          <div className="engage-grid">
            {homeContent.engagements.map((eng) => (
              <article key={eng.title} className="engage-card">
                <div className="engage-card__head">
                  <h3 className="engage-card__title">{eng.title}</h3>
                  <span className="engage-card__step">{eng.step}</span>
                </div>
                <dl>
                  <div>
                    <dt className="mono-label">{homeContent.engageWhat}</dt>
                    <dd className="body-text">{eng.what}</dd>
                  </div>
                  <div>
                    <dt className="mono-label">{homeContent.engageWhen}</dt>
                    <dd className="body-text">{eng.when}</dd>
                  </div>
                  <div>
                    <dt className="mono-label">{homeContent.engageOutcome}</dt>
                    <dd className="body-text">{eng.outcome}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why MONAD ── */}
      <section id="why" className="section">
        <div className="site-container">
          <div className="section-header section-header--split">
            <div>
              <p className="section-eyebrow">
                <span className="section-eyebrow__index">03</span>
                {copy.whyEyebrow}
              </p>
              <h2 className="section-title">
                {homeContent.whyTitlePrefix}{' '}
                <span className="title-muted">
                  {homeContent.whyTitleAccent}
                </span>
              </h2>
            </div>
            <p className="section-lead">{homeContent.whyLead}</p>
          </div>

          <div className="feature-grid">
            {homeContent.differentiators.map((item) => (
              <div key={item.title} className="feature">
                <span className="feature__icon">
                  <CheckIcon />
                </span>
                <h3 className="value-title">{item.title}</h3>
                <p className="body-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="pb-24 max-sm:pb-16">
        <div className="site-container">
          <div className="cta-band">
            <div>
              <h2 className="section-title">
                {homeContent.midCtaTitlePrefix}{' '}
                <span className="title-muted">
                  {homeContent.midCtaTitleAccent}
                </span>
              </h2>
              <p className="section-lead">{homeContent.midCtaLead}</p>
            </div>
            <div className="cta-band__actions">
              <Link className="btn btn-hero btn-lg group" href={reviewHref}>
                {homeContent.midCtaPrimary}
                <IconArrowRight className="btn-icon transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a className="btn btn-outline btn-lg" href="#engage">
                {copy.midCtaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="work" className="section section--ruled">
        <div className="site-container">
          <div className="section-header section-header--split">
            <div>
              <p className="section-eyebrow">
                <span className="section-eyebrow__index">04</span>
                {copy.caseStudiesEyebrow}
              </p>
              <h2 className="section-title">
                {homeContent.caseStudiesTitlePrefix}{' '}
                <span className="title-muted">
                  {homeContent.caseStudiesTitleAccent}
                </span>
              </h2>
            </div>
            <p className="section-lead">{homeContent.caseStudiesLead}</p>
          </div>

          <div className="case-list">
            {homeContent.caseStudies.map((study, index) => (
              <article
                key={`${study.title}-${index}`}
                className={`case-row ${index === 0 ? 'case-row--featured' : ''}`}
              >
                <div className="case-row__meta">
                  <span className="case-row__category">{study.category}</span>
                  <h3 className="case-row__title">{study.title}</h3>
                </div>
                <div className="case-row__body">
                  <p>{study.description}</p>
                  <div className="tag-list">
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
      <section id="about" className="section section--tint">
        <div className="site-container">
          <div className="about-layout">
            <div className="about-copy">
              <p className="section-eyebrow">
                <span className="section-eyebrow__index">05</span>
                {homeContent.aboutEyebrow}
              </p>
              <h2 className="section-title">
                {homeContent.aboutTitlePrefix}{' '}
                <span className="title-muted">
                  {homeContent.aboutTitleAccent}
                </span>
              </h2>
              <p className="section-lead">{homeContent.aboutLead1}</p>
              <p className="section-lead">{homeContent.aboutLead2}</p>

              <div className="about-values">
                {homeContent.aboutValues.map((value) => (
                  <div key={value.title}>
                    <h3 className="value-title">{value.title}</h3>
                    <p className="body-text">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="fact-sheet">
              <div className="fact-sheet__stats">
                <div className="fact-sheet__stat">
                  <div className="hero-stat-value">20+</div>
                  <div className="hero-stat-label mt-2">
                    {homeContent.yearsLabel}
                  </div>
                </div>
                <div className="fact-sheet__stat">
                  <div className="hero-stat-value">40+</div>
                  <div className="hero-stat-label mt-2">
                    {homeContent.projectsLabel}
                  </div>
                </div>
              </div>

              <div className="fact-sheet__section">
                <h3 className="fact-sheet__heading">
                  {homeContent.principlesTitle}
                </h3>
                <ul className="principle-list">
                  {homeContent.principles.map((principle) => (
                    <li key={principle}>{principle}</li>
                  ))}
                </ul>
              </div>

              <div className="fact-sheet__section">
                <h3 className="fact-sheet__heading">{homeContent.techTitle}</h3>
                <dl className="fact-rows">
                  {[
                    [homeContent.techLangLabel, techStack.languages],
                    [homeContent.techInfraLabel, techStack.infrastructure],
                    [homeContent.techDataLabel, techStack.data],
                    [homeContent.techObsLabel, techStack.observability],
                  ].map(([label, items]) => (
                    <div className="fact-row" key={label}>
                      <dt>{label}</dt>
                      <dd>{items.join(' · ')}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>

          <div className="expertise-block">
            <h3 className="expertise-block__title">
              {homeContent.expertiseTitle}
            </h3>
            <div className="ruled-grid ruled-grid--3">
              {expertise.map((item) => (
                <div key={item.code} className="ruled-cell">
                  <span className="ruled-cell__index">{item.code}</span>
                  <h4 className="ruled-cell__title">{item.title}</h4>
                  <p className="body-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section section--ruled">
        <div className="site-container contact-layout">
          <div>
            <p className="section-eyebrow">
              <span className="section-eyebrow__index">06</span>
              {copy.contactEyebrow}
            </p>
            <h2 className="section-title">
              {homeContent.contactTitlePrefix}{' '}
              <span className="title-muted">
                {homeContent.contactTitleAccent}
              </span>
            </h2>
            <p className="section-lead">{homeContent.contactLead}</p>

            <ul className="contact-details">
              <li>
                <span className="mono-label">{homeContent.emailLabel}</span>
                <a href="mailto:hello@monad.hu">hello@monad.hu</a>
              </li>
              <li>
                <span className="mono-label">{homeContent.phoneLabel}</span>
                <a href="tel:+36306360775">+36 30 636 0775</a>
              </li>
              <li>
                <span className="mono-label">{homeContent.locationLabel}</span>
                <a
                  href="https://maps.app.goo.gl/UYrvowK7skeSyuaq5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {homeContent.locationValue}
                </a>
              </li>
            </ul>

            <ul className="trust-list">
              {homeContent.trustLabels.map((label) => (
                <li key={label}>
                  <CheckIcon />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="form-card">
            <form id="contactForm" onSubmit={handleContactSubmit}>
              <div className="form-grid">
                <div className="form-grid form-grid--2">
                  <div>
                    <label htmlFor="name">{homeContent.nameLabel}</label>
                    <input
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder={homeContent.namePlaceholder}
                      autoComplete="name"
                      minLength={2}
                      maxLength={120}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">{homeContent.emailLabel}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder={homeContent.emailPlaceholder}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company">{homeContent.companyLabel}</label>
                  <input
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder={homeContent.companyPlaceholder}
                    autoComplete="organization"
                    maxLength={160}
                  />
                </div>
                <div>
                  <label htmlFor="message">{homeContent.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder={homeContent.messagePlaceholder}
                    minLength={10}
                    maxLength={5000}
                    required
                  />
                </div>
              </div>

              <div
                id="status"
                role="status"
                aria-live="polite"
                className="form-status"
              >
                {contactStatus ||
                  (!isContactFormConfigured
                    ? homeContent.contactUnavailableStatus
                    : '')}
              </div>

              <button
                type="submit"
                className="btn btn-hero btn-lg mt-6 w-full"
                disabled={isSubmittingContact || !isContactFormConfigured}
              >
                {isSubmittingContact
                  ? homeContent.sendingText
                  : isContactFormConfigured
                    ? homeContent.sendButton
                    : homeContent.contactUnavailableButton}
              </button>

              <div className="recaptcha-row" aria-live="polite">
                <p className="recaptcha-note">
                  {homeContent.recaptchaNotePrefix}{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{' '}
                  {homeContent.recaptchaNoteMiddle}{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>{' '}
                  {homeContent.recaptchaNoteSuffix}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: LOCALES.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
}

export function getStaticProps() {
  return {
    props: {},
  };
}
