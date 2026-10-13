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

// Pricing rule agreed by the owner on 2026-10-06: the first process costs two
// thirds of the client's measured first-year saving, so it pays back in about
// eight months. The smallest project is 1M Ft, which needs a 1.5M Ft yearly
// saving; below that we do not make an offer at all.
const PRICE_SHARE_OF_YEARLY_SAVING = 2 / 3;
const MINIMUM_PRICE_HUF = 1_000_000;
const MINIMUM_YEARLY_SAVING_HUF =
  MINIMUM_PRICE_HUF / PRICE_SHARE_OF_YEARLY_SAVING;
const PAYBACK_MONTHS = Math.round(12 * PRICE_SHARE_OF_YEARLY_SAVING);
// Operations, agreed the same day: 35 000 Ft a month per automation, with the
// first three months included in the project price as a warranty.
const MAINTENANCE_FEE_HUF = 35_000;
const WARRANTY_MONTHS = 3;

// Months until the saving has covered the project price and the operations
// fee, which only starts after the warranty.
const paybackWithOperations = (price, monthlySaving) => {
  const coveredInWarranty = WARRANTY_MONTHS * monthlySaving;
  if (coveredInWarranty >= price) return price / monthlySaving;
  return (
    WARRANTY_MONTHS +
    (price - coveredInWarranty) / (monthlySaving - MAINTENANCE_FEE_HUF)
  );
};
// 21 working days of 8 hours.
const WORKING_HOURS_PER_MONTH = 168;
const DEFAULT_HOURS_PER_MONTH = 40;
const DEFAULT_MONTHLY_COST_HUF = 600_000;

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
  '20–250 fős gyártó, kereskedelmi és logisztikai cégek Gödöllő, Vác és Hatvan környékén',
  'Könyvelőirodák, ahol a könyvelők idejét a bizonylatok rögzítése emészti fel',
  'Ahol ugyanazt az adatot több rendszerben is rögzítik, vagy manuálisan másolják át egyik táblázatból a másikba',
  'Ahol egy adminisztratív munkatárs beintegrálása hónapokig is eltarthat, és fölösleges túlórákat okoz az adatok redundáns kezelése',
];

const steps = [
  {
    when: 'Egy délelőtt',
    title: 'Felmérés az Önök telephelyén',
    detail:
      'Megnézzük, milyen dokumentumok érkeznek, és ki, melyik rendszerben, hányszor rögzíti őket. Kiválasztjuk azt a folyamatot, amelyik a legtöbb manuális munkával jár, és közösen felmérjük, havonta hány munkaórát igényel. A felmérés ingyenes.',
    ask: 'A folyamatot végző munkatárs, és fél óra a döntéshozó idejéből',
  },
  {
    when: '1–2 munkanapon belül',
    title: 'Fix áras ajánlat',
    detail:
      'Az árat a felmért megtakarításból számoljuk. Ha a megtakarítás nem indokolja a beruházást, ajánlat helyett ezt jelezzük.',
    ask: 'Döntés az ajánlatról',
  },
  {
    when: 'Néhány napon belül',
    title: 'Bevezetés',
    detail:
      'Az elfogadás után elkészítjük, az Önök valós adatain teszteljük, és használatra kész állapotban adjuk át.',
    ask: 'Hozzáférés kizárólag az érintett rendszerhez',
  },
  {
    when: 'Utána',
    title: 'Üzemeltetés',
    detail: `Folyamatosan felügyeljük a működését, és ha a NAV, egy beszállító vagy az Önök rendszere változik, elvégezzük a szükséges módosításokat. Az első ${WARRANTY_MONTHS} hónapban a projektár tartalmazza, utána havi ${formatHuf(MAINTENANCE_FEE_HUF)} + áfa.`,
    ask: 'Nincs teendőjük',
  },
];

const firstBuilds = [
  {
    title: 'Bejövő számla és szállítólevél',
    detail:
      'A PDF-ben vagy fényképen érkező dokumentumok adatait tételesen, automatikusan kiolvassuk, összevetjük a NAV Online Számla adataival és a megrendeléssel, és manuális rögzítés nélkül továbbítjuk a könyvelésbe vagy a készletnyilvántartásba.',
  },
  {
    title: 'Rendelésfelvétel',
    detail:
      'Az e-mailben, táblázatban vagy portálon érkező rendelések manuális rögzítés nélkül kerülnek be a rendszerükbe.',
  },
  {
    title: 'Gyártási és minőségi bizonylatok',
    detail:
      'Tételszám szerint rendszerezve tároljuk és bármikor visszakereshetővé tesszük őket, így egy reklamáció kivizsgálásához nem kell papíralapú iratokat átnézni.',
  },
  {
    title: 'Heti kimutatás',
    detail:
      'Az a kimutatás, amelyet ma minden hétfőn Excel-táblákból állítanak össze manuálisan, automatikusan elkészül.',
  },
  {
    title: 'Több telephely adatai',
    detail:
      'Ha ugyanazt az adatot több telephelyen is rögzítik, a párhuzamos rögzítés megszűnik.',
  },
];

const pricingTerms = [
  `Az első folyamat ára az első évi megtakarítás kétharmada, így nagyjából ${PAYBACK_MONTHS} hónap alatt megtérül, az üzemeltetési díjjal együtt körülbelül tíz hónap alatt. A megtakarítást a felmérésen közösen mérjük fel, nem mi becsüljük.`,
  `A legkisebb projekt ${formatHuf(MINIMUM_PRICE_HUF)} + áfa, ez évi ${formatHuf(MINIMUM_YEARLY_SAVING_HUF)} megtakarításnak felel meg. Ha egy folyamat ennél kevesebbet takarít meg, nem adunk rá ajánlatot, hanem jelezzük, hogy nem éri meg.`,
  'Fix ár és előre rögzített feladat. Az elfogadás után néhány napon belül használható eszköz van a kezükben. A kód az Önök tulajdona, nem tőlünk bérlik.',
  `Üzemeltetés automatizálásonként havi ${formatHuf(MAINTENANCE_FEE_HUF)} + áfa, az első ${WARRANTY_MONTHS} hónapot garanciaként a projektár fedezi. A díjban benne van a futtatás a saját szervereinken, a működés figyelése, a javítás a következő munkanapon belül, ha a NAV, egy szállító vagy az Önök rendszere változik, havonta egy-két óra kisebb módosítás, és egy havi kimutatás arról, mennyi munkát váltott ki. Havonta felmondható, ilyenkor átadjuk a kódot.`,
];

const largerScope = [
  'Többnapos helyszíni felmérés: végigkövetjük a folyamatokat, egyeztetünk az érintett munkatársakkal, és átnézzük a használt rendszereket.',
  'Az eredmény egy rangsorolt lista arról, mit érdemes automatizálni, mennyi munkát vált ki, és mi kell hozzá.',
  'Az árat és az ütemezést egyedileg adjuk meg, szakaszokra bontva, hogy az első eredmények mielőbb használhatók legyenek.',
  'Az üzemeltetés díja a rendszer méretéhez igazodik.',
];

const notOffered = [
  'Nem cseréljük le a működő könyvelő- vagy vállalatirányítási rendszert.',
  'Nem hozunk adóügyi döntést. Ez a könyvelőjük feladata, mi azt biztosítjuk, hogy az adatok manuális rögzítés nélkül jussanak el hozzá.',
  'Tanácsadói jelentést nem írunk. A felmérés eredménye egy fix áras ajánlat egy működő automatizálásra.',
  'Ha kiderül, hogy Önöknél az automatizálás nem hoz érdemi megtakarítást, ezt is jelezzük, és nem küldünk ajánlatot.',
];

function SavingsCalculator() {
  const [hours, setHours] = useState(String(DEFAULT_HOURS_PER_MONTH));
  const [monthlyCost, setMonthlyCost] = useState(
    String(DEFAULT_MONTHLY_COST_HUF),
  );

  const hourlyCost = toNumber(monthlyCost) / WORKING_HOURS_PER_MONTH;
  const monthlySaving = toNumber(hours) * hourlyCost;
  const yearlySaving = monthlySaving * 12;
  const qualifies = yearlySaving >= MINIMUM_YEARLY_SAVING_HUF;
  // A price quoted as 1 142 857 Ft reads as false precision.
  const price =
    Math.floor((yearlySaving * PRICE_SHARE_OF_YEARLY_SAVING) / 10_000) * 10_000;
  const paybackMonths = Math.round(paybackWithOperations(price, monthlySaving));
  const breakEvenHours =
    hourlyCost > 0
      ? Math.ceil(MINIMUM_YEARLY_SAVING_HUF / 12 / hourlyCost)
      : null;

  return (
    <div className="form-card">
      <div className="form-grid">
        <div>
          <label htmlFor="calc-hours">
            Havonta hány munkaórát fordítanak a folyamatra?
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
            A bevezetés ára nagyjából <strong>{formatHuf(price)} + áfa</strong>,
            ami körülbelül {PAYBACK_MONTHS} hónap alatt megtérül. A{' '}
            {WARRANTY_MONTHS + 1}. hónaptól induló havi{' '}
            {formatHuf(MAINTENANCE_FEE_HUF)} üzemeltetési díjjal együtt
            körülbelül {paybackMonths} hónap. A pontos árat a felmérés
            adataiból adjuk meg.
          </p>
        ) : (
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Ez évente kevesebb, mint {formatHuf(MINIMUM_YEARLY_SAVING_HUF)},
            ezért erre az egy folyamatra nem érné meg ajánlatot adnunk.
            {breakEvenHours
              ? ` Ilyen bérköltség mellett havi ${breakEvenHours} munkaórától térül meg.`
              : ''}{' '}
            A felmérésen megvizsgáljuk, van-e nagyobb folyamat, vagy
            összevonható-e több kisebb.
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
        Csak a felszabaduló munkaidővel számolunk. A kevesebb hibás rögzítést
        és a gyorsabb átfutást nem számítjuk bele, így a valós megtakarítás
        jellemzően nagyobb.
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
      'Egy délelőtt alatt a helyszínen felmérjük, mennyi kézi munkát lehet automatizálni Önöknél, és néhány napon belül működő automatizálást adunk át. Az ár az első évi megtakarítás kétharmada.',
  };

  return (
    <Layout
      title="Helyszíni folyamat-automatizálás Gödöllőn és környékén — MONAD SYSTEMS"
      description="Egy délelőtt alatt a helyszínen felmérjük, mennyi papírmunkát lehet automatizálni Önöknél, és néhány napon belül működő automatizálást adunk át. Számlák, szállítólevelek, rendelések. Az ár az első évi megtakarítás kétharmada."
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
        </div>
        <div className="hero-scrim" />
        <div className="site-container relative z-10">
          <div style={{ maxWidth: '760px' }}>
            <div className="section-eyebrow">
              Helyszíni automatizálás · Gödöllő és környéke
            </div>
            <h1 className="hero-title">
              Egy délelőtt alatt felmérjük, mennyi papírmunkát lehet
              automatizálni Önöknél.
            </h1>
            <p
              className="text-base md:text-xl leading-relaxed mb-8"
              style={{
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '60ch',
              }}
            >
              Kimegyünk Önökhöz, megnézzük, mely feladatokat végzik ma
              manuálisan, és felmérjük, mennyi munkaidőt visznek el. A felmérés ingyenes. Ha megéri,
              fix áras ajánlatot adunk, és az elfogadás után néhány napon belül már egy használható eszköz van a kezükben
              a folyamataik gördülékenyebb működéséhez.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                className="btn btn-hero btn-lg group"
                href="/hu/#contact"
                data-umami-event="local-automation-hero-cta"
              >
                Felmérés egyeztetése
                <ArrowRightIcon
                  className="btn-icon transition-transform duration-300 group-hover:translate-x-1"
                  style={{ width: 18, height: 18 }}
                />
              </Link>
              <a className="btn btn-outline btn-lg" href="#kalkulator">
                Mennyit takaríthatnak meg?
              </a>
            </div>
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
              Cégeknek, ahol a kézzel történő rögzítés viszi el a munkaidő jelentős részét
            </h2>
            <p className="section-lead">
              A bejövő számlák, szállítólevelek és rendelések többségéből ma már
              automatikusan kiolvashatók az adatok. Legtöbbször csak azért
              történik a rögzítés mégis manuálisan, mert nem állt rendelkezésre
              megfelelő szakértői erőforrás vagy idő az esetleges
              automatizációk bevezetésére.
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
              Munkatársaik idejéből csak a felmérés délelőttjén kérünk néhány
              órát, a további munkát mi végezzük.
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
            <h2 className="section-title">A leggyakrabban automatizált folyamatok</h2>
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

      {/* ── Larger companies ── */}
      <section
        id="nagyobb-cegeknek"
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Nagyobb cégeknek</div>
            <h2 className="section-title">
              Ha nem egy folyamatról, hanem a teljes működésről van szó
            </h2>
            <p className="section-lead">
              A fenti menet egy-egy jól körülhatárolt folyamatra szól. Ha több
              telephelyet, több rendszert vagy egy teljes folyamatláncot kell
              összekötni, a munka is más léptékű.
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
                gap: '1rem',
              }}
            >
              {largerScope.map((item) => (
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
            <Link
              className="btn btn-outline btn-lg"
              href="/hu/#contact"
              data-umami-event="local-automation-larger-cta"
              style={{ marginTop: '1.75rem' }}
            >
              Egyeztessünk
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who we are ── */}
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">Rólunk</div>
            <h2 className="section-title">
              Nagyvállalati tapasztalat, gödöllői iroda
            </h2>
          </div>
          <p className="section-lead" style={{ maxWidth: '760px', margin: 0 }}>
            2021 óta fejlesztünk rendszereket bankoknak, biztosítóknak és
            állami intézményeknek, többek között az OTP ökoszisztémájában, a
            Netrisknél és az IdomSoftnál. Ugyanaz a mérnök méri fel a folyamatot, aki a kódot
            írja, és az üzemeltetést is mi vállaljuk.
          </p>
        </div>
      </section>

      {/* ── What we don't do ── */}
      <section
        className="section"
        style={{ background: 'hsl(var(--secondary))' }}
      >
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
