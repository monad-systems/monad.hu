---
name: hungarian-copy
description: Write, translate or proofread Hungarian copy for MONAD — site pages, blog posts, offers, outreach letters, vault one-pagers. Use whenever Hungarian text is created or changed, including translating English copy into Hungarian, and when asked whether Hungarian text "sounds Hungarian", is "too Hungarian", or should use te/Ön. Covers who to address and how, which engineering terms stay in English, and a checklist of calques (tükörfordítás) to rewrite.
---

# Hungarian copy

The owner's decisions from the October 2026 rework of the Hungarian site. Apply them
to any Hungarian text MONAD publishes. When a rule here conflicts with a general
Hungarian style rule, this file wins; when it conflicts with something the owner
says in the conversation, the owner wins — then update this file.

## 1. Who we address, and how

| Text | Address | Example |
|---|---|---|
| Site pages and UI strings (homepage, landing pages, review page, forms, errors) | **Formal (magázás)**. A company is plural: *Önök, Önöknél, a csapatuk*. One person is singular: *Kérjük, írjon…* | „Úgy érzik, hogy az architekturális adósság lassítja Önöket” |
| Blog posts | **Inclusive first person plural**, or impersonal. Never *te*, never *Ön*. | „Mielőtt implementálnánk, tervezzük meg a rendszert”, „Ne tegyük.” |
| Local SME offer (helyi automatizálás), outreach letters, one-pagers | **Formal, plain Hungarian, no engineering jargon.** Readers are owners of family firms, not engineers. | „A felmérés ingyenes. Ha megéri, fix áras ajánlatot adunk.” |

Formal text: lean on 3rd-person verb forms and drop the pronoun where Hungarian
would. „Ön” in every sentence reads like a bank letter. Letters open with
„Kedves [Név]!” and close with „Üdvözlettel:”.

## 2. Engineering terms stay in English

Hungarian developers say these in English, so write them in English with Hungarian
grammar around them. Do not translate them on engineering pages or in blog posts.

| Term | Inflected forms already on the site |
|---|---|
| contract, API contract, data contract, contract-first | contractot, contracttal, contractok, contractból, contract-alapú |
| spec-first | spec-first fejlesztés |
| observability | observability-t, observability-vel |
| logging, tracing, alerting, metrikák | a strukturált logging, a tracing |
| release, deploy | release-ek, deployolható |
| pipeline, delivery, delivery pipeline | pipeline-ban, delivery-t |
| review, code review, architektúra review | review-t, review-zható, review-val |
| roadmap | roadmapet, roadmapig |
| quality gate | quality gate-ek |
| microservice, event-driven, service-orientált | microservice-ekre, event-driven architektúra |
| cloud | cloud architektúra, cloud költség, Cloud-Native |
| consumer, provider | consumerek, a provider |
| stakeholder, right-sizing, developer experience, production-ready, production-grade, legacy, guardrail, compliance, correlation ID, bounded context, governance | stakeholder interjúk, guardrailek |

Hungarian is better where the Hungarian word is what engineers actually say:
*szűk keresztmetszet, élesben / éles üzem, üzemeltetés, kódgenerálás, adatmigráció,
csatolás, megbízhatóság, felmérés.*

The opposite failure is also real: English jargon that a Hungarian reader cannot
parse. Translate the meaning of *platform friction, readout, deliverable, fit call,
bench, handoff*:

- „Platform friction, ami lassítja a szállítást” → „A fejlesztői környezet lassítja a munkát”
- „záró vezetői readout” → „záró vezetői összefoglaló”

On the SME page and in letters to SME owners, none of the table above applies: say
*számla, szállítólevél, rendelés, kézi gépelés*, not *document intake*.

Suffixes: attach directly when the English spelling ends the way it is pronounced
(*contractot, roadmapet*); use a hyphen when the last letter is silent or pronounced
differently (*review-t, release-ek, pipeline-ban, microservice-ek*). Follow the forms
already in the table rather than re-deriving them.

## 3. Calques to rewrite

A sentence can be grammatical and still be English with Hungarian words. Read each
sentence and ask whether a Hungarian engineer would say it. Real examples from this
site:

| Calque | Hungarian |
|---|---|
| A JSON Schema sokkal erősebb, mint amit a csapatok többsége kihasznál | A JSON Schema többre képes, mint amire a legtöbb csapat használja |
| Platformléptékben delivery-fékké válik | Platformméretben fékezi a delivery-t |
| A típusok runtime előtt véget érnek | A típusok nem védenek runtime-ban |
| gyorsnak érződik (*feels*) | gyorsnak tűnik |
| első osztályú forrás-artifact (*first-class*) | teljes jogú forrásfájl |
| intézményi memória nélküli szereplő | a cég történetét nem ismerő szereplő |
| csak prózaként létezik | csak leírt szövegként létezik |
| A bounded autonomy-nak alakja van | konkrét összetevői vannak |
| kilép az ízlés kategóriájából | már nem ízlés kérdése |
| Az AI több kódot nyom neki ennek a korlátnak | Az AI-jal több kód ütközik ebbe a korlátba |
| A contract a delivery egyik bemenete | A contract a delivery egyik alapja |
| implementáció-first vs spec-first | code-first és spec-first |

Patterns behind them:

- **Nominal chains** („a változások kicsiben és egy témára szabva tartása”) → a verb
  („a kicsi, egy témára szorítkozó változások”).
- **„kerül + -ra/-re” passives** („kiemelésre került”, „felolvasásra kerül”) → active
  („kiemeltük”, „beolvassa”).
- **English metaphors taken literally** (*shape, input, first-class, push against,
  drift*) → say what is meant.
- **„mint amit”** comparisons copied from *than what* → rebuild the comparison.
- **„X-ként kezel”** repeated to mimic *treat as* → vary or use a verb.

## 4. Typography

- Quotes: „…” (not "…"); nested: »…«.
- Numbers: 1 000 000 Ft, 1,5 M Ft, 8 hónap; prices „+ áfa”.
- Dates: 2026. október 6.
- Tags and headings in sentence case: „Generált kliensek”, not „Generált Kliensek”.
- *e-mail* with a hyphen; *vs* → *és*.
- Diagram headings in posts start with „Vizuál:” — the renderer turns them into
  figure captions.

## 5. How to work

1. Read the whole text before changing anything.
2. Pass one: address (section 1). Pass two: terms (section 2). Pass three: calques
   (section 3), sentence by sentence.
3. Never change facts, numbers, names, code, inline code, links or front matter keys.
   Never add claims the text did not make.
4. Blog posts also get the structural checklist of the `avoid-ai-writing` skill. Its
   word lists are English-tuned; use its structural tells only.
5. Report what changed as „régi → új” pairs, and list the sentences you were unsure
   about instead of guessing.
