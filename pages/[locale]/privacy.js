import { Fragment } from 'react';

import Layout from '../../components/Layout';
import { LOCALES, useTranslation } from '../../lib/i18n';

// The privacy notice. Every statement here describes how the site actually
// works, checked on 2026-10-13 against the code and the published build:
//   - the site sets no cookies and loads nothing from third parties except
//     the two endpoints below (fonts and images are served from monad.hu);
//   - the contact form posts to contact.monad.hu, a Scaleway Serverless
//     Function in fr-par (monad-systems/monad.hu-contact), which emails the
//     message through Scaleway Transactional Email to hello@monad.hu, a
//     Google Workspace mailbox; the visitor's address is used in memory for
//     rate limiting and not stored;
//   - analytics is self-hosted Umami on analytics-dev (monad-systems/infra,
//     ADR-0008), reached through Cloudflare at stats-dev.monad.systems, with
//     encrypted backups kept 30 days in Scaleway Object Storage (nl-ams),
//     and visit data deleted after 25 months by the stack's `retention`
//     service (infra ADR-0008 section 8);
//   - the language choice is kept in localStorage only when a visitor
//     switches language.
// Change this page when any of those changes.
const LAST_UPDATED = { en: '13 October 2026', hu: '2026. október 13.' };

const CONTROLLER = {
  name: 'MONAD SYSTEMS Kft.',
  address: 'Dózsa György út 28/A, 2100 Gödöllő, Hungary',
  addressHu: '2100 Gödöllő, Dózsa György út 28/A.',
  registration: '13-09-213743',
  vat: 'HU29309171',
  email: 'office@monad.hu',
  phone: '+36 30 636 0775',
};

const content = {
  en: {
    pageTitle: 'Privacy notice | MONAD SYSTEMS',
    pageDescription:
      'How monad.hu handles personal data: the contact form, cookie-free analytics, hosting, and your rights.',
    eyebrow: 'Privacy',
    title: 'Privacy notice',
    lead: 'monad.hu sets no cookies and shows no ads. We collect personal data in two places: when you write to us through the contact form, and as pseudonymous visit statistics. This notice explains both, and your rights.',
    updated: `Last updated: ${LAST_UPDATED.en}`,
    sections: [
      {
        heading: 'Who is responsible',
        paragraphs: [
          `The controller is ${CONTROLLER.name} (registered office: ${CONTROLLER.address}; company registration number: ${CONTROLLER.registration}; EU VAT number: ${CONTROLLER.vat}).`,
          `For any question about your data, write to ${CONTROLLER.email} or call ${CONTROLLER.phone}.`,
        ],
      },
      {
        heading: 'The contact form',
        paragraphs: [
          'When you send the form, we receive your name, your email address, your company name if you give one, your message, and the language of the page you sent it from. We use them only to answer you and, if you ask, to discuss working together.',
          'Legal basis: steps taken at your request before a possible contract (GDPR Article 6(1)(b)), and our legitimate interest in answering enquiries (Article 6(1)(f)).',
          'How it travels: the form posts to our own endpoint, contact.monad.hu, which runs on Scaleway in Paris and emails the message to our mailbox, hosted by Google Workspace. The endpoint uses your IP address briefly, in memory, to limit how many messages one address can send. It does not store it.',
          'Spam protection: the form uses ALTCHA, which has your browser solve a short computation. It sets no cookies and calls no third party.',
          'How long: we delete the conversation one year after the last message, unless it leads to a contract. In that case we keep what the contract and accounting law require.',
        ],
      },
      {
        heading: 'Visit statistics',
        paragraphs: [
          'We count visits with Umami, which we run ourselves on a server in Scaleway’s Paris data centre. It sets no cookies and does not store your IP address.',
          'For each page view it records the page address, the referring site, the browser, operating system and device type, the screen size, the language setting, the country (from the network request), and clicks on a few buttons such as “Get in Touch”. To tell visits apart without a cookie, it derives an identifier from your IP address and browser, mixed with a value that changes every month, so the same visitor cannot be linked from one month to the next.',
          'Legal basis: our legitimate interest in knowing which pages are read and whether the site works (GDPR Article 6(1)(f)). You can object at any time (see Your rights), or block the script at stats-dev.monad.systems in your browser.',
          'How long: we delete visit records after 25 months, and encrypted backups after 30 days.',
        ],
      },
      {
        heading: 'Hosting',
        paragraphs: [
          'The site itself is served by GitHub Pages (GitHub, Inc., USA). Like any web server, it receives your IP address with each request and may log it for security; see GitHub’s privacy statement. Requests to the statistics endpoint pass through Cloudflare, which processes them for us. Fonts and images are served from monad.hu, not from third parties.',
          'If you switch the site’s language, your browser stores that choice locally (localStorage). It is not a cookie, and it is not sent to us.',
        ],
      },
      {
        heading: 'Who processes data for us',
        list: [
          'Scaleway SAS (France): the contact endpoint, outgoing email, the statistics server and its backups. Data stays in the EU.',
          'Google Ireland Ltd. (Google Workspace): our mailbox. Google may process data outside the EU under the safeguards in its data processing terms.',
          'Cloudflare, Inc.: the network route to the statistics server.',
          'GitHub, Inc.: website hosting.',
        ],
        paragraphs: [
          'We do not sell personal data, use it for advertising, or make automated decisions about you.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can ask us for a copy of your data, and to correct, delete or restrict it. You can ask to receive data you gave us in a portable format, and object to processing based on our legitimate interest. Write to us at the address above; we answer within one month.',
          'If you think we handle your data unlawfully, you can complain to the Hungarian data protection authority, the Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH; 1055 Budapest, Falk Miksa utca 9–11; ugyfelszolgalat@naih.hu; www.naih.hu), or go to court.',
        ],
      },
      {
        heading: 'Links to other sites',
        paragraphs: [
          'Links to LinkedIn, GitHub and other sites take you to services with their own privacy rules. We have no say in what they collect.',
        ],
      },
    ],
  },
  hu: {
    pageTitle: 'Adatkezelési tájékoztató | MONAD SYSTEMS',
    pageDescription:
      'Hogyan kezeli a monad.hu a személyes adatokat: kapcsolatfelvételi űrlap, sütik nélküli statisztika, tárhely és az Ön jogai.',
    eyebrow: 'Adatvédelem',
    title: 'Adatkezelési tájékoztató',
    lead: 'A monad.hu nem használ sütiket (cookie-kat), és nem jelenít meg hirdetéseket. Személyes adatot két helyen kezelünk: ha a kapcsolatfelvételi űrlapon ír nekünk, és álnevesített látogatási statisztikában. Ez a tájékoztató mindkettőt és az Ön jogait írja le.',
    updated: `Utolsó módosítás: ${LAST_UPDATED.hu}`,
    sections: [
      {
        heading: 'Ki az adatkezelő',
        paragraphs: [
          `Az adatkezelő a ${CONTROLLER.name} (székhely: ${CONTROLLER.addressHu}; cégjegyzékszám: ${CONTROLLER.registration}; közösségi adószám: ${CONTROLLER.vat}).`,
          `Az adataival kapcsolatos kérdéseit az ${CONTROLLER.email} címre küldheti, vagy hívhat minket a ${CONTROLLER.phone} számon.`,
        ],
      },
      {
        heading: 'Kapcsolatfelvételi űrlap',
        paragraphs: [
          'Az űrlap elküldésekor megkapjuk a nevét, az e-mail-címét, a cége nevét, ha megadja, az üzenetét, valamint annak az oldalnak a nyelvét, ahonnan írt. Ezeket csak arra használjuk, hogy válaszoljunk, és ha kéri, egyeztessünk a lehetséges együttműködésről.',
          'Jogalap: az Ön kérésére, esetleges szerződés megkötése előtt tett lépések (GDPR 6. cikk (1) bekezdés b) pont), valamint jogos érdekünk, hogy válaszoljunk a megkeresésekre (f) pont).',
          'Az adatok útja: az űrlap a saját végpontunkra, a contact.monad.hu címre küldi az üzenetet. Ez a Scaleway párizsi adatközpontjában fut, és e-mailben továbbítja az üzenetet a Google Workspace által üzemeltetett postafiókunkba. A végpont az IP-címét csak rövid ideig, a memóriában használja, hogy korlátozza, egy címről hány üzenet érkezhet. Nem tárolja.',
          'Spamvédelem: az űrlap az ALTCHA-t használja, amely rövid számítást végeztet a böngészőjével. Nem állít be sütit, és harmadik felet sem hív.',
          'Megőrzés: a levelezést az utolsó üzenet után egy évvel töröljük, kivéve, ha szerződés jön létre. Ilyenkor azt őrizzük meg, amit a szerződés és a számviteli jogszabályok előírnak.',
        ],
      },
      {
        heading: 'Látogatási statisztika',
        paragraphs: [
          'A látogatásokat az Umami nevű eszközzel számoljuk, amelyet mi magunk üzemeltetünk a Scaleway párizsi adatközpontjában. Nem használ sütit, és nem tárolja az IP-címét.',
          'Minden oldalmegtekintésnél rögzíti az oldal címét, a hivatkozó oldalt, a böngészőt, az operációs rendszert és az eszköz típusát, a képernyőméretet, a nyelvi beállítást, az országot (a hálózati kérésből), valamint néhány gomb, például a „Kapcsolatfelvétel” megnyomását. Hogy süti nélkül is meg tudja különböztetni a látogatásokat, az IP-címéből és a böngészőjéből képez azonosítót, havonta változó értékkel keverve. Így ugyanaz a látogató az egyik hónapról a másikra nem köthető össze.',
          'Jogalap: jogos érdekünk, hogy tudjuk, mely oldalakat olvassák, és jól működik-e a webhely (GDPR 6. cikk (1) bekezdés f) pont). Bármikor tiltakozhat (lásd: Az Ön jogai), vagy a böngészőjében letilthatja a stats-dev.monad.systems címről betöltődő szkriptet.',
          'Megőrzés: a látogatási adatokat 25 hónap, a titkosított biztonsági mentéseket 30 nap után töröljük.',
        ],
      },
      {
        heading: 'Tárhely',
        paragraphs: [
          'Magát a webhelyet a GitHub Pages (GitHub, Inc., Egyesült Államok) szolgálja ki. Mint minden webszerver, minden kéréssel megkapja az IP-címét, és biztonsági célból naplózhatja; részletek a GitHub adatvédelmi nyilatkozatában. A statisztikai végpontra érkező kérések a Cloudflare hálózatán haladnak át, amely ezeket megbízásunkból kezeli. A betűtípusokat és a képeket a monad.hu-ról töltjük be, nem harmadik féltől.',
          'Ha átváltja a webhely nyelvét, a böngészője helyben eltárolja a választását (localStorage). Ez nem süti, és nem jut el hozzánk.',
        ],
      },
      {
        heading: 'Adatfeldolgozóink',
        list: [
          'Scaleway SAS (Franciaország): a kapcsolatfelvételi végpont, a kimenő e-mailek, a statisztikai szerver és annak mentései. Az adatok az EU-ban maradnak.',
          'Google Ireland Ltd. (Google Workspace): a postafiókunk. A Google az adatfeldolgozási feltételeiben vállalt garanciák mellett az EU-n kívül is kezelhet adatot.',
          'Cloudflare, Inc.: a statisztikai szerverhez vezető hálózati útvonal.',
          'GitHub, Inc.: a webhely tárhelye.',
        ],
        paragraphs: [
          'Személyes adatot nem adunk el, hirdetésre nem használunk, és Önről automatizált döntést nem hozunk.',
        ],
      },
      {
        heading: 'Az Ön jogai',
        paragraphs: [
          'Kérhet másolatot az adatairól, kérheti azok helyesbítését, törlését vagy kezelésük korlátozását. Kérheti, hogy az általa megadott adatokat hordozható formában adjuk ki, és tiltakozhat a jogos érdekünkön alapuló adatkezelés ellen. Kérjük, írjon a fenti címre; egy hónapon belül válaszolunk.',
          'Ha úgy gondolja, hogy jogellenesen kezeljük az adatait, panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; ugyfelszolgalat@naih.hu; www.naih.hu), vagy bírósághoz fordulhat.',
        ],
      },
      {
        heading: 'Más webhelyekre mutató linkek',
        paragraphs: [
          'A LinkedInre, a GitHubra és más webhelyekre mutató linkek olyan szolgáltatásokhoz vezetnek, amelyekre a saját adatkezelési szabályaik vonatkoznak. Arra, hogy ezek milyen adatot gyűjtenek, nincs ráhatásunk.',
        ],
      },
    ],
  },
};

export default function PrivacyPage() {
  const { locale } = useTranslation();
  const copy = content[locale] ?? content.en;

  return (
    <Layout title={copy.pageTitle} description={copy.pageDescription}>
      <article className="site-container blog-post">
        <p className="section-eyebrow">{copy.eyebrow}</p>
        <h1 className="blog-post__title">{copy.title}</h1>
        <p className="blog-post__lead">{copy.lead}</p>
        <p className="blog-post__meta">{copy.updated}</p>

        {/* No wrapper per section: the prose styles drop the top margin of a
            heading that is its parent's first child, as in a post. */}
        <div className="blog-post__content">
          {copy.sections.map((section) => (
            <Fragment key={section.heading}>
              <h2>{section.heading}</h2>
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Fragment>
          ))}
        </div>
      </article>
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
