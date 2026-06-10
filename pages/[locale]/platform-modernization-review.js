import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { LOCALES, useTranslation } from '../../lib/i18n';

const HeroBackground = dynamic(
  () => import('../../components/HeroBackground'),
  {
    ssr: false,
  },
);

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
  'CTOs or VPEs evaluating custom software engineering options',
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
        pageTitle: 'Szoftverarchitektúra Felülvizsgálat — MONAD SYSTEMS',
        pageDescription:
          'Fókuszált architektúra-felülvizsgálat, amely feltárja a legnagyobb hatású szűk keresztmetszeteket és konkrét modernizációs ütemtervet ad.',
        heroEyebrow: 'Első együttműködés',
        heroTitle: 'Szoftverarchitektúra Felülvizsgálat',
        heroLead:
          'Fókuszált, senior vezetésű architektúra-felülvizsgálat, amely azonosítja a legnagyobb hatású szűk keresztmetszeteket és konkrét ütemtervet ad — így a modernizációt magabiztosan, nem találgatással végezheted.',
        heroPrimaryCta: 'Szoftverarchitektúra Review konzultáció foglalása',
        heroSecondaryCta: 'A review folyamata',
        heroNote:
          'Fix scope-os, fókuszált, 2 hetes együttműködés, egyértelmű záró readouttal.',
        whoEyebrow: 'Kinek szól',
        whoTitle: 'Ideális csapatok fordulópont előtt',
        whoLead:
          'Azoknak a mérnöki vezetőknek, akik tudják, hogy változtatni kell, de külső, senior nézőpont kell a kezdő lépésekhez.',
        processTitle: 'Így működik a review',
        processLead:
          'Átlátható két hetes folyamat, hogy a csapat pontosan értse mi történik, mikor és miért.',
        notGoodFitTitle: 'Mikor nem jó választás',
        scopeTitle: 'Mi tartozik bele és mi nem',
        triggersTitle: 'Ismerős valamelyik?',
        nextTitle: 'Mi történik ezután',
        finalCta: 'Szoftverarchitektúra Review konzultáció foglalása',
      }
    : {
        pageTitle: 'Custom Software Engineering Review — MONAD SYSTEMS',
        pageDescription:
          'A focused software architecture review that identifies your highest-impact bottlenecks and gives you a concrete execution roadmap. From MONAD SYSTEMS.',
        heroEyebrow: 'First Engagement',
        heroTitle: 'Custom Software Engineering Review',
        heroLead:
          'A focused, senior-led architecture review that identifies your highest-impact bottlenecks and gives you a concrete roadmap — so you can modernize with confidence instead of guesswork.',
        heroPrimaryCta: 'Book a Software Engineering Review Call',
        heroSecondaryCta: 'See How the Review Works',
        heroNote:
          'Fixed-scope, focused 2-week engagement designed as a standalone first step with a clear final readout.',
        whoEyebrow: "Who It's For",
        whoTitle: 'Best fit for teams at a turning point',
        whoLead:
          'This review is designed for engineering leaders who know something needs to change — but need an outside perspective to figure out where to start.',
        processTitle: 'How the review works',
        processLead:
          'A clear two-week process so your team knows what happens, when, and why.',
        notGoodFitTitle: 'Not a good fit',
        scopeTitle: 'Included and not included',
        triggersTitle: 'Recognize any of these?',
        nextTitle: 'What happens next',
        finalCta: 'Book a Software Engineering Review Call',
      };

  const content = isHu
    ? {
        bestFitFor: [
          'Series A-C fázisú startupoknak, ahol a monolit már lassítja a szállítást',
          '10-80 fős mérnöki csapatoknak, növekedési fájdalmakkal',
          'CTO-knak és VPE-knek, akik egyedi szoftverfejlesztési irányokat mérlegelnek',
          'Cégeknek, ahol az előző nagy átírás elakadt vagy kudarcot vallott',
        ],
        weekOne: [
          'Stakeholder interjúk (CTO, engineering, platform)',
          'Rendszerbejárás (architektúra, API-k, infrastruktúra)',
          'Szállítási pipeline áttekintés (CI/CD, környezetek)',
          'Célzott kódbázis mintavétel (kritikus szolgáltatások)',
        ],
        weekTwo: [
          'Szűk keresztmetszetek és friction pontok feltérképezése',
          'Architektúra kockázatelemzés',
          'API és integrációs felmérés',
          'Költség- és komplexitási hotspotok',
          'Priorizált modernizációs roadmap elkészítése',
        ],
        notGoodFit: [
          'Korai fázisú MVP csapatok',
          'Egyszerű rendszerek architekturális nyomás nélkül',
          'Csapatok, amelyek csak plusz fejlesztői kapacitást keresnek',
          'Elsősorban legalacsonyabb ár alapján döntő projektek',
        ],
        scopeIncluded: [
          'Két hét fókuszált architektúra- és delivery felmérés',
          'Interjúk, rendszerbejárás, pipeline review és célzott kódbázis mintavétel',
          'Írásos review csomag és vezetői readout',
          'Priorizált 90 napos roadmap, tiszta következő lépésekkel',
        ],
        scopeExcluded: [
          'Hands-on implementáció a review időablakban',
          'Nyitott végű tanácsadói retainer konstrukciók',
          'Eszközmigráció roadmap-priorizálás nélkül',
        ],
        symptoms: [
          {
            title: 'A release napokig tart, nem órákig',
            detail:
              'Kézi gate-ek, hosszú regressziós körök vagy egyetlen deployolható egység, ami mindenkit blokkol.',
          },
          {
            title: 'A csapatok egymást akadályozzák',
            detail:
              'Merge konfliktusok, közös adatbázis és homályos ownership miatt minden sprint egyeztetéssé válik.',
          },
          {
            title: 'Az integrációs hibák láncreakciót okoznak',
            detail:
              'Egy szolgáltatás hibája további rendszereket dönt le. Nincs circuit breaker vagy tiszta szerződéses határ.',
          },
          {
            title: 'Az observability csak utólag kerül be',
            detail:
              'Production hiba esetén az első órában azt keresitek, melyik szolgáltatás a hibás.',
          },
          {
            title: 'Lassú onboarding',
            detail:
              'A kódbázis nehezen átlátható, a tudás törzsi, a dokumentáció hiányos vagy elavult.',
          },
          {
            title: 'Skálázáskor mindent együtt kell növelni',
            detail:
              'A hot path-ek külön nem skálázhatók, az egész monolitot együtt kell felnagyítani.',
          },
        ],
        included: [
          {
            step: '01',
            title: 'Mély architektúra-felmérés',
            detail:
              'Átnézzük a kódbázist, infrastruktúrát, CI/CD-t és adatfolyamokat. Kulcsemberekkel interjúzunk a fájdalompontok és korlátok megértéséhez.',
          },
          {
            step: '02',
            title: 'Szűk keresztmetszetek feltérképezése',
            detail:
              'Azonosítjuk a konkrét csatolási pontokat, skálázási korlátokat és operatív kockázatokat, amelyek ma lassítják a csapatot.',
          },
          {
            step: '03',
            title: 'Priorizált roadmap',
            detail:
              'Konkrét, szekvenciált tervet kapsz: mit érdemes először leválasztani, mely szerződéseket kell formalizálni, és hová érdemes observability-t építeni, becsült ráfordítással.',
          },
          {
            step: '04',
            title: 'Kockázati értékelés',
            detail:
              'Jelezzük a technikai adósságot, ami üzleti kockázatot hordoz: single point of failure, dokumentálatlan integrációk, adatkonzisztencia-rések.',
          },
        ],
        deliverables: [
          {
            title: 'Tiszta current-state architektúra áttekintés',
            format:
              'Rendszertérkép szolgáltatáshatárokkal, függőségekkel és hibautakkal.',
          },
          {
            title: 'Top kockázatok és bottleneckek üzleti hatással',
            format:
              'Rangsorolt kockázati lista azzal, hogy melyik elem hogyan hat a szállításra vagy megbízhatóságra.',
          },
          {
            title:
              'Delivery friction térkép CI/CD, környezetek és handoffok mentén',
            format:
              'Pipeline és workflow térkép, amely megmutatja hol lassulnak vagy buknak el a release-ek.',
          },
          {
            title: 'API és integrációs problématérkép',
            format:
              'Szerződés- és integrációs megállapítások ownership és függőségi jelöléssel.',
          },
          {
            title: 'Priorizált 90 napos modernizációs roadmap',
            format:
              'Szekvenciált terv prioritás, függőség és végrehajtási kockázat alapján.',
          },
          {
            title: 'Opcionális végrehajtási megközelítés az első lépésekhez',
            format:
              'Phase-one implementációs megközelítés vázlata; a kivitelezési támogatás opcionális.',
          },
        ],
        buyerCommitment: [
          'Egy 30 perces fit call a mérnöki vezetéssel',
          'Három-öt stakeholder interjú az első héten',
          'Hozzáférés az architektúra dokumentációhoz, CI/CD pipeline-hoz és kritikus szolgáltatásokhoz',
          'Egy záró vezetői readout a második hét végén',
        ],
        nextSteps: [
          {
            step: '1',
            title: 'Időpontfoglalás',
            detail:
              'Egy fókuszált 30 perces hívásban átbeszéljük az architektúrát, a csapat helyzetét és a célokat.',
          },
          {
            step: '2',
            title: 'Lefuttatjuk a review-t',
            detail:
              'Két hét alatt interjúk, walkthrough-k, pipeline review és célzott kódbázis mintavétel történik.',
          },
          {
            step: '3',
            title: 'Átadjuk a deliverable-öket',
            detail:
              'Megkapod az írásos review csomagot és a vezetői readoutot priorizált következő lépésekkel.',
          },
          {
            step: '4',
            title: 'Döntés a folytatásról',
            detail:
              'Végrehajthatjátok önállóan, vagy kérhetitek a támogatásunkat az első fázis implementálásához.',
          },
        ],
        exampleOutcomes: [
          'Célzott platformváltoztatásokkal csökkentett infrastruktúra költség',
          'Javuló szállítási megbízhatóság release és üzemeltetési oldalon',
          'Production-grade observability bevezetése kritikus folyamatokra',
          'Biztonságosabb, fázisos modernizációs út kijelölése',
          'Integrációs komplexitás csökkentése kulcsrendszerek között',
        ],
        caseSnapshots: [
          {
            context:
              'B2B SaaS platform, ahol a release-eket közös szolgáltatási csatolások és bizonytalan ownership határok blokkolták',
            outcome:
              'A review csomag kijelölte a cél szolgáltatáshatárokat, azonosította a top delivery blokkolókat, és szekvenciált 90 napos tervet adott belső végrehajtáshoz.',
          },
          {
            context:
              'Integráció-intenzív termék visszatérő cross-team incidensekkel és gyenge API szerződés ownership-pel',
            outcome:
              'A review priorizálta a szerződéses javításokat, feltárta az observability hiányokat kritikus flow-k mentén, és tisztázta az ownership döntéseket.',
          },
        ],
        processEyebrow: 'Folyamat',
        qualificationEyebrow: 'Alkalmasság',
        qualificationLead:
          'Így marad fókuszált és hasznos az együttműködés azoknak a csapatoknak, akiknek erre valóban szükségük van.',
        qualificationNote:
          'Ha nem jó fit, ezt már az első híváson egyértelműen jelezzük.',
        qualificationBadge: 'A tiszta "nem" jobb, mint egy erőltetett projekt.',
        scopeEyebrow: 'Terjedelem',
        scopeLead:
          'Fix scope-os együttműködés egyértelmű határokkal, hogy pontosan tudd mit vásárolsz.',
        includedLabel: 'Tartalmazza',
        excludedLabel: 'Nem tartalmazza',
        triggersEyebrow: 'Tipikus kiváltó okok',
        triggersLead:
          'Ha ezek közül kettő vagy több ismerős, a szoftverarchitektúra review már a roadmap vége előtt megtérül.',
        whatsIncludedEyebrow: 'Mit tartalmaz',
        whatsIncludedTitle: 'Négy fázis, sallang nélkül',
        whatsIncludedLead:
          'Minden review azonos, kiszámítható folyamatot követ, így pontosan tudod mire számíthatsz és mit kapsz a végén.',
        phaseLabel: 'FÁZIS',
        deliverablesEyebrow: 'Deliverable-ök',
        deliverablesTitle: 'Amit kézhez kapsz',
        deliverablesLead:
          'Kézzelfogható kimenetek, amelyeket a vezetés és a mérnöki csapat felé is azonnal használhatsz.',
        commitmentEyebrow: 'Szükséges ráfordítás tőletek',
        commitmentTitle: 'Mire van szükségünk a csapatodtól',
        commitmentLead:
          'Könnyű együttműködési igény, hogy a review gyors, pontos és gyakorlatias maradjon.',
        nextEyebrow: 'Folyamat',
        nextLead: 'Az első hívástól a kész roadmapig, két héten belül.',
        proofEyebrow: 'Bizonyíték',
        proofTitle: 'Példaeredmények hasonló munkákból',
        scenarioLabel: 'Helyzet',
        changedLabel: 'Mi változott',
        finalTitle:
          'Készen állsz látni, mi fogja vissza a szoftveres szállításotokat?',
        finalLead:
          'Foglalj egy 30 perces hívást. Gyorsan megmondjuk, hogy a review hasznos-e a helyzetedben, és kijelöljük a tiszta következő lépéseket. Kötöttség nélkül.',
        finalNote:
          'A review önálló együttműködés. Implementációs támogatást csak kérésre beszélünk át.',
      }
    : {
        bestFitFor,
        weekOne,
        weekTwo,
        notGoodFit,
        scopeIncluded,
        scopeExcluded,
        symptoms,
        included,
        deliverables,
        buyerCommitment,
        nextSteps,
        exampleOutcomes,
        caseSnapshots,
        processEyebrow: 'Process',
        qualificationEyebrow: 'Qualification',
        qualificationLead:
          'This keeps the engagement focused and useful for the teams who need it most.',
        qualificationNote:
          "If it's not a fit, we will say so on the first call.",
        qualificationBadge: "We prefer clear no's over forced projects.",
        scopeEyebrow: 'Scope',
        scopeLead:
          'A fixed-scope engagement with clear boundaries so there is no ambiguity about what you are buying.',
        includedLabel: 'Included',
        excludedLabel: 'Not included',
        triggersEyebrow: 'Common Triggers',
        triggersLead:
          'If two or more of these feel familiar, a software engineering review will pay for itself before the roadmap is even finished.',
        whatsIncludedEyebrow: "What's Included",
        whatsIncludedTitle: 'Four phases, zero fluff',
        whatsIncludedLead:
          'Every review follows a consistent process so you know exactly what to expect — and what you will walk away with.',
        phaseLabel: 'PHASE',
        deliverablesEyebrow: 'Deliverables',
        deliverablesTitle: 'What you walk away with',
        deliverablesLead:
          'Tangible outputs you can share with leadership and engineering, then execute against immediately.',
        commitmentEyebrow: 'Your Time Commitment',
        commitmentTitle: 'What we need from your team',
        commitmentLead:
          'Lightweight participation so the review stays fast, accurate, and practical.',
        nextEyebrow: 'Process',
        nextLead: 'From first call to finished roadmap in two weeks or less.',
        proofEyebrow: 'Proof',
        proofTitle: 'Example outcomes from similar work',
        scenarioLabel: 'Scenario',
        changedLabel: 'What changed',
        finalTitle: "Ready to see what's holding your software delivery back?",
        finalLead:
          "Book a 30-minute call. We'll quickly assess if this review is useful for your situation and outline clear next steps. No commitment.",
        finalNote:
          'This review is a standalone engagement. Implementation support is optional and only discussed if you ask for it.',
      };

  return (
    <Layout>
      <Head>
        <title>{copy.pageTitle}</title>
        <meta name="description" content={copy.pageDescription} />
        <meta property="og:title" content={copy.pageTitle} />
        <meta property="og:description" content={copy.pageDescription} />
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
            <div className="section-eyebrow">{copy.heroEyebrow}</div>
            <h1 className="hero-title">{copy.heroTitle}</h1>
            <p
              className="text-base md:text-xl leading-relaxed mb-8"
              style={{
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '60ch',
              }}
            >
              {copy.heroLead}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                className="btn btn-hero btn-lg group"
                href={locale === 'en' ? '/#contact' : `/${locale}/#contact`}
              >
                {copy.heroPrimaryCta}
                <ArrowRightIcon
                  className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 18, height: 18 }}
                />
              </Link>
              <a className="btn btn-outline btn-lg" href="#how-review-works">
                {copy.heroSecondaryCta}
              </a>
            </div>
            <p
              style={{
                marginTop: '1rem',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.95rem',
              }}
            >
              {copy.heroNote}
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
            <div className="section-eyebrow">{copy.whoEyebrow}</div>
            <h2 className="section-title">{copy.whoTitle}</h2>
            <p className="section-lead">{copy.whoLead}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {content.bestFitFor.map((item) => (
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
            <div className="section-eyebrow">{content.processEyebrow}</div>
            <h2 className="section-title">{copy.processTitle}</h2>
            <p className="section-lead">{copy.processLead}</p>
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
                {isHu ? '1. hét' : 'Week 1'}
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
                {content.weekOne.map((item) => (
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
                {isHu ? '2. hét' : 'Week 2'}
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
                {content.weekTwo.map((item) => (
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
            <div className="section-eyebrow">
              {content.qualificationEyebrow}
            </div>
            <h2 className="section-title">{copy.notGoodFitTitle}</h2>
            <p className="section-lead">{content.qualificationLead}</p>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.95rem',
                marginTop: '-0.25rem',
              }}
            >
              {content.qualificationNote}
            </p>
            <span
              className="badge glass"
              style={{ marginTop: '0.75rem', width: 'fit-content' }}
            >
              {content.qualificationBadge}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {content.notGoodFit.map((item) => (
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
            <div className="section-eyebrow">{content.scopeEyebrow}</div>
            <h2 className="section-title">{copy.scopeTitle}</h2>
            <p className="section-lead">{content.scopeLead}</p>
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
                {content.includedLabel}
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
                {content.scopeIncluded.map((item) => (
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
                {content.excludedLabel}
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
                {content.scopeExcluded.map((item) => (
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
            <div className="section-eyebrow">{content.triggersEyebrow}</div>
            <h2 className="section-title">{copy.triggersTitle}</h2>
            <p className="section-lead">{content.triggersLead}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.symptoms.map((s) => (
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
            <div className="section-eyebrow">
              {content.whatsIncludedEyebrow}
            </div>
            <h2 className="section-title">{content.whatsIncludedTitle}</h2>
            <p className="section-lead">{content.whatsIncludedLead}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {content.included.map((item) => (
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
                  {content.phaseLabel} {item.step}
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
            <div className="section-eyebrow">{content.deliverablesEyebrow}</div>
            <h2 className="section-title">{content.deliverablesTitle}</h2>
            <p className="section-lead">{content.deliverablesLead}</p>
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
              {content.deliverables.map((d) => (
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
            <div className="section-eyebrow">{content.commitmentEyebrow}</div>
            <h2 className="section-title">{content.commitmentTitle}</h2>
            <p className="section-lead">{content.commitmentLead}</p>
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
              {content.buyerCommitment.map((item) => (
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
            <div className="section-eyebrow">{content.nextEyebrow}</div>
            <h2 className="section-title">{copy.nextTitle}</h2>
            <p className="section-lead">{content.nextLead}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.nextSteps.map((ns) => (
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
            <div className="section-eyebrow">{content.proofEyebrow}</div>
            <h2 className="section-title">{content.proofTitle}</h2>
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
              {content.exampleOutcomes.map((outcome) => (
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
              {content.caseSnapshots.map((item) => (
                <div key={item.context}>
                  <p style={{ margin: 0, fontWeight: 700 }}>
                    {content.scenarioLabel}
                  </p>
                  <p
                    style={{
                      margin: '0.25rem 0 0.45rem',
                      color: 'hsl(var(--muted-foreground))',
                    }}
                  >
                    {item.context}
                  </p>
                  <p style={{ margin: 0, fontWeight: 700 }}>
                    {content.changedLabel}
                  </p>
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
              {content.finalTitle}
            </h2>
            <p
              className="section-lead"
              style={{ maxWidth: '50ch', margin: '0 auto 2rem' }}
            >
              {content.finalLead}
            </p>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '52ch',
                margin: '0 auto 1.25rem',
                fontSize: '0.95rem',
              }}
            >
              {content.finalNote}
            </p>
            <Link
              className="btn btn-hero btn-lg group"
              href={locale === 'en' ? '/#contact' : `/${locale}/#contact`}
            >
              {copy.finalCta}
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
