import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from '../../components/Layout';
import { SITE_URL, getCanonicalUrl, organizationJsonLd } from '../../lib/site';

const HeroBackground = dynamic(
  () => import('../../components/HeroBackground'),
  {
    ssr: false,
  },
);

// Pricing rule agreed by the owner on 2026-10-06: the first process may cost
// no more than one year of the client's measured saving, and below 1.5M Ft we
// do not make an offer at all.
const MINIMUM_PRICE_HUF = 1_500_000;
const PAYBACK_MONTHS = 12;
// 21 working days of 8 hours.
const WORKING_HOURS_PER_MONTH = 168;
const DEFAULT_HOURS_PER_MONTH = 40;
const DEFAULT_MONTHLY_COST_HUF = 600_000;

const PHONE_DISPLAY = '+36 30 636 0775';
const PHONE_HREF = 'tel:+36306360775';
const EMAIL = 'hello@monad.hu';
const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent('Helyszíni felmérés')}`;
const ADDRESS = '2100 Gödöllő, Dózsa György út 28/A';
const MAPS_URL = 'https://maps.app.goo.gl/UYrvowK7skeSyuaq5';

const SERVED_TOWNS = [
  'Gödöllő',
  'Veresegyház',
  'Isaszeg',
  'Kistarcsa',
  'Pécel',
  'Fót',
  'Dunakeszi',
  'Vác',
  'Aszód',
  'Hatvan',
];

const formatHuf = (value) =>
  `${new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 }).format(
    Math.round(value),
  )} Ft`;

const toNumber = (value) => {
  const parsed = Number(String(value).replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

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
      aria-hidden="true"
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
      aria-hidden="true"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const fitFor = [
  '20–250 fős gyártó, kereskedő vagy logisztikai cégek Gödöllő, Vác és Hatvan környékén',
  'Könyvelőirodák, ahol a bizonylatok rögzítése viszi el a könyvelők idejét',
  'Ahol ugyanazt az adatot két rendszerbe is beütik, vagy egy táblázatból másolják át a másikba',
  'Ahol egy adminisztrátori állás betöltése hónapokig tart, vagy már most is túlórában megy a papírmunka',
];

const steps = [
  {
    when: 'Egy délelőtt',
    title: 'Felmérés az Önök telephelyén',
    detail:
      'Megnézzük, mi érkezik, ki gépeli be, hova és hányszor. Kiválasztjuk a legtöbb kézi munkát vivő folyamatot, és közösen megmérjük, havonta hány órát visz el. A felmérés ingyenes.',
    ask: 'Az a kolléga, aki a munkát végzi, és fél óra a döntéshozótól',
  },
  {
    when: '1–2 munkanapon belül',
    title: 'Fix áras ajánlat',
    detail:
      'A mért megtakarításból számolva. Ha a folyamat nem hoz annyit, hogy megérje, ajánlat helyett ezt írjuk meg.',
    ask: 'Döntés az ajánlatról',
  },
  {
    when: 'Néhány napon belül',
    title: 'Átadás élesben',
    detail:
      'Az elfogadás után megépítjük, az Önök éles adatain kipróbáljuk, és működő állapotban átadjuk.',
    ask: 'Hozzáférés ahhoz az egy rendszerhez, semmi máshoz',
  },
  {
    when: 'Utána',
    title: 'Üzemeltetés',
    detail:
      'Figyeljük, hogy működik-e. Ha a NAV vagy egy szállító megváltoztatja a formátumot, mi javítjuk.',
    ask: 'Semmi',
  },
];

const firstBuilds = [
  {
    title: 'Bejövő számla és szállítólevél',
    detail:
      'PDF-ben vagy fotón érkezik. Tételesen kiolvassuk, összevetjük a NAV Online Számla adataival és a megrendeléssel, és kész adatként kerül a könyveléshez vagy a készletbe.',
  },
  {
    title: 'Rendelésfelvétel',
    detail:
      'Az e-mailben, táblázatban vagy portálon érkező rendelés gépelés nélkül kerül be a rendszerbe.',
  },
  {
    title: 'Gyártási és minőségi bizonylatok',
    detail:
      'Tételszám szerint eltárolva és visszakereshetően, hogy egy reklamációnál ne mappát kelljen keresni.',
  },
  {
    title: 'Heti riport',
    detail:
      'Ami ma minden hétfőn Excel-másolással áll össze, az magától összeáll.',
  },
  {
    title: 'Több telephely adatai',
    detail:
      'Ha ugyanazt az adatot két telephelyen is beütik, az egyiket megspóroljuk.',
  },
];

const pricingTerms = [
  `Az első folyamat ára legfeljebb annyi, amennyit az első ${PAYBACK_MONTHS} hónapban megtakarít. A megtakarítást a felmérésen közösen mérjük meg, nem mi becsüljük.`,
  `A legkisebb projekt ${formatHuf(MINIMUM_PRICE_HUF)} + áfa. Ha egy folyamat évente ennél kevesebbet takarít meg, nem adunk rá ajánlatot, hanem megmondjuk, hogy nem éri meg.`,
  'Fix ár, előre egyeztetett terjedelem, az elfogadás után néhány napon belül élesben. A kód az Önöké, nem bérlik tőlünk.',
  'Utána havi üzemeltetési díj, amelyet az ajánlatban rögzítünk. Figyeljük, hogy működik-e, és ha a NAV vagy egy szállító megváltoztatja a formátumot, mi javítjuk.',
];

const notOffered = [
  'Nem cseréljük le a működő könyvelő- vagy vállalatirányítási rendszert.',
  'Nem hozunk adóügyi döntést. Azt a könyvelőjük mondja meg, mi csak azt intézzük, hogy az adat gépelés nélkül érkezzen meg hozzá.',
  'Tanácsadói jelentést nem írunk. A felmérés eredménye egy fix áras ajánlat egy működő automatizálásra.',
  'Ha kiderül, hogy Önöknél ebből nincs mit kihozni, azt is megmondjuk, és nem küldünk ajánlatot.',
];

function SavingsCalculator() {
  const [hours, setHours] = useState(String(DEFAULT_HOURS_PER_MONTH));
  const [monthlyCost, setMonthlyCost] = useState(
    String(DEFAULT_MONTHLY_COST_HUF),
  );

  const hourlyCost = toNumber(monthlyCost) / WORKING_HOURS_PER_MONTH;
  const monthlySaving = toNumber(hours) * hourlyCost;
  const yearlySaving = monthlySaving * PAYBACK_MONTHS;
  const qualifies = yearlySaving >= MINIMUM_PRICE_HUF;
  // A ceiling quoted as 1 714 286 Ft reads as false precision.
  const priceCeiling = Math.floor(yearlySaving / 10_000) * 10_000;
  const breakEvenHours =
    hourlyCost > 0
      ? Math.ceil(MINIMUM_PRICE_HUF / PAYBACK_MONTHS / hourlyCost)
      : null;

  return (
    <div className="form-card">
      <div className="form-grid">
        <div>
          <label htmlFor="calc-hours">
            Hány órát tölt ezzel valaki havonta?
          </label>
          <input
            id="calc-hours"
            className="form-input"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="calc-cost">
            Egy munkatárs teljes havi költsége, járulékokkal (Ft)
          </label>
          <input
            id="calc-cost"
            className="form-input"
            type="number"
            inputMode="numeric"
            min={0}
            step={10000}
            value={monthlyCost}
            onChange={(event) => setMonthlyCost(event.target.value)}
          />
        </div>
      </div>

      <dl
        aria-live="polite"
        style={{
          margin: '1.75rem 0 0',
          display: 'grid',
          gap: '0.75rem',
          borderTop: '1px solid hsl(var(--border))',
          paddingTop: '1.25rem',
        }}
      >
        <div className="flex justify-between gap-4">
          <dt style={{ color: 'hsl(var(--muted-foreground))' }}>
            Egy munkaóra költsége
          </dt>
          <dd className="m-0" style={{ fontWeight: 600 }}>
            {formatHuf(hourlyCost)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt style={{ color: 'hsl(var(--muted-foreground))' }}>
            Megtakarítás havonta
          </dt>
          <dd className="m-0" style={{ fontWeight: 600 }}>
            {formatHuf(monthlySaving)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt style={{ color: 'hsl(var(--muted-foreground))' }}>
            Megtakarítás az első évben
          </dt>
          <dd className="m-0" style={{ fontWeight: 700 }}>
            {formatHuf(yearlySaving)}
          </dd>
        </div>
      </dl>

      <div
        className="card glass"
        style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem' }}
      >
        {qualifies ? (
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            A bevezetés ára legfeljebb{' '}
            <strong>{formatHuf(priceCeiling)} + áfa</strong>, vagyis{' '}
            {PAYBACK_MONTHS} hónapon belül megtérül. A pontos árat a felmérésen
            mért adatokból adjuk meg.
          </p>
        ) : (
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Ez évente kevesebb, mint {formatHuf(MINIMUM_PRICE_HUF)}, ezért erre
            az egy folyamatra nem érné meg ajánlatot adnunk.
            {breakEvenHours
              ? ` Ilyen bérköltség mellett havi ${breakEvenHours} óra kézi munkától kezd megérni.`
              : ''}{' '}
            A felmérésen megnézzük, van-e nagyobb, vagy összevonható több
            kisebb.
          </p>
        )}
      </div>

      <p
        style={{
          margin: '1rem 0 0',
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.9rem',
          lineHeight: 1.55,
        }}
      >
        Csak a megspórolt munkaidővel számolunk. A kevesebb elírást és a
        gyorsabb átfutást nem számítjuk bele, így a valós megtakarítás inkább
        nagyobb.
      </p>
    </div>
  );
}

export default function LocalAutomation() {
  const pageUrl = getCanonicalUrl('/helyi-automatizalas', 'hu');
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: 'Helyszíni folyamat-automatizálás',
    serviceType: 'Üzleti folyamatok automatizálása',
    url: pageUrl,
    inLanguage: 'hu',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: SERVED_TOWNS.map((name) => ({ '@type': 'City', name })),
    description:
      'Egy délelőtt alatt a helyszínen felmérjük, mennyi kézi munkát vehet le a gép, és néhány napon belül átadjuk a működő automatizálást. Az ár legfeljebb az első év megtakarítása.',
  };

  return (
    <Layout
      title="Helyszíni folyamat-automatizálás Gödöllőn és környékén — MONAD SYSTEMS"
      description="Egy délelőtt alatt a helyszínen felmérjük, mennyi kézi papírmunkát vehet le a gép, és néhány napon belül átadjuk a működő automatizálást. Számlák, szállítólevelek, rendelések. Az ár legfeljebb az első év megtakarítása."
      jsonLd={[organizationJsonLd, serviceJsonLd]}
      hungarianOnly
    >
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
          <div style={{ maxWidth: '760px' }}>
            <div className="section-eyebrow">
              Helyszíni automatizálás · Gödöllő és környéke
            </div>
            <h1 className="hero-title">
              Egy délelőtt alatt felmérjük, mennyi kézi papírmunkát vehet le a
              gép.
            </h1>
            <p
              className="text-base md:text-xl leading-relaxed mb-8"
              style={{
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '60ch',
              }}
            >
              Kimegyünk Önökhöz, megnézzük, mit végeznek ma kézzel, és
              megmérjük, mennyi időt visz el. A felmérés ingyenes. Ha megéri,
              fix áras ajánlatot adunk, és néhány napon belül élesben átadjuk az
              automatizálást.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                className="btn btn-hero btn-lg group"
                href="#kapcsolat"
                data-umami-event="local-automation-hero-cta"
              >
                Felmérés egyeztetése
                <ArrowRightIcon
                  className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 18, height: 18 }}
                />
              </a>
              <a className="btn btn-outline btn-lg" href="#kalkulator">
                Mennyit spórolhatnak?
              </a>
            </div>
            <p
              style={{
                marginTop: '1rem',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.95rem',
              }}
            >
              MONAD SYSTEMS Kft. · {ADDRESS}
            </p>
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Kinek szól</div>
            <h2 className="section-title">
              Cégeknek, ahol a papírmunka eszi meg a napot
            </h2>
            <p className="section-lead">
              A legtöbb bejövő számla, szállítólevél és rendelés már úgy
              érkezik, hogy egy gép ki tudja olvasni belőle az adatot. Többnyire
              azért nem történik meg, mert senki nem ül le megcsinálni.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {fitFor.map((item) => (
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

      {/* ── Steps ── */}
      <section id="menet" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Menet</div>
            <h2 className="section-title">A felméréstől az átadásig</h2>
            <p className="section-lead">
              Munkatársaik idejéből a felmérés délelőttjén kérünk néhány órát.
              Utána a munka nálunk folyik.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.when}
                className="card hover-lift"
                style={{ padding: '1.75rem' }}
              >
                <div className="card-glow" />
                <div
                  className="gradient-text"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {step.when}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    margin: '0 0 1rem',
                  }}
                >
                  {step.detail}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    borderTop: '1px solid hsl(var(--border))',
                    paddingTop: '0.75rem',
                  }}
                >
                  <span className="mono-label" style={{ display: 'block' }}>
                    Önöktől
                  </span>
                  {step.ask}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we build first ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Mivel kezdünk</div>
            <h2 className="section-title">Amit elsőként szoktunk megépíteni</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstBuilds.map((item) => (
              <div
                key={item.title}
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

      {/* ── Pricing + calculator ── */}
      <section id="kalkulator" className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Árazás</div>
            <h2 className="section-title">
              Az árat az Önök megtakarítása határozza meg
            </h2>
            <p className="section-lead">
              Nincs árlista. Azt nézzük, mennyi munkaidőt vált ki az
              automatizálás, és az ár ehhez igazodik.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '1rem',
              }}
            >
              {pricingTerms.map((term) => (
                <li key={term} className="flex items-start gap-3">
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
                    {term}
                  </span>
                </li>
              ))}
            </ul>
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* ── Who we are ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Kik vagyunk</div>
            <h2 className="section-title">
              Gödöllői cég, banki tapasztalattal
            </h2>
          </div>
          <div
            className="card glass"
            style={{ padding: '2rem', maxWidth: '760px' }}
          >
            <p style={{ margin: '0 0 1rem', lineHeight: 1.7 }}>
              A MONAD SYSTEMS Kft. Gödöllőn, a Dózsa György úton van, a
              környékbeli cégektől negyedórányira. 2021 óta bankok, biztosítók
              és állami rendszerek mögött dolgozunk, többek között az OTP
              ökoszisztémájában, a Netrisknél és az IdomSoftnál.
            </p>
            <p style={{ margin: '0 0 1rem', lineHeight: 1.7 }}>
              Ugyanaz a mérnök méri fel a folyamatot, aki a kódot írja. Nincs
              junior, aki az éles rendszeren tanul, és nincs átadás-átvétel két
              csapat között.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              Egy automatizálás annyit ér, ameddig valaki karbantartja. Ezért
              vállaljuk az üzemeltetést is, és nyereségesen, hitel nélkül
              működünk.
            </p>
          </div>
        </div>
      </section>

      {/* ── What we don't do ── */}
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Határok</div>
            <h2 className="section-title">Amit nem vállalunk</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {notOffered.map((item) => (
              <div
                key={item}
                className="card flex items-start gap-4"
                style={{ padding: '1.35rem 1.5rem' }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 18,
                    flexShrink: 0,
                    color: 'hsl(var(--muted-foreground))',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  –
                </span>
                <span style={{ lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="kapcsolat"
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
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
              Egyeztessünk egy felmérést
            </h2>
            <p
              className="section-lead"
              style={{ maxWidth: '52ch', margin: '0 auto 2rem' }}
            >
              Egy negyedórás telefonnal kezdünk. Megnézzük, van-e Önöknél olyan
              folyamat, amelyiknél megéri kimennünk. Ha nincs, ezt már a
              telefonban megmondjuk.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                className="btn btn-hero btn-lg group"
                href={PHONE_HREF}
                data-umami-event="local-automation-call"
              >
                {PHONE_DISPLAY}
                <ArrowRightIcon
                  className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 18, height: 18 }}
                />
              </a>
              <a
                className="btn btn-outline btn-lg"
                href={EMAIL_HREF}
                data-umami-event="local-automation-email"
              >
                {EMAIL}
              </a>
            </div>
            <p
              style={{
                margin: '1.5rem 0 0',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.95rem',
              }}
            >
              Írni is lehet a{' '}
              <Link href="/hu/#contact">kapcsolatfelvételi űrlapon</Link>.{' '}
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                {ADDRESS}
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Hungarian only: the offer is for businesses around the Gödöllő office, so
// there is no English page and /en/helyi-automatizalas is not generated.
export function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'hu' } }],
    fallback: false,
  };
}

export function getStaticProps() {
  return {
    props: {},
  };
}
