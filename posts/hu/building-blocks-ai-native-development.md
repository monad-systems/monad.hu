---
title: 'Az építőelemek szabják meg az AI-támogatott fejlesztés plafonját'
date: '2026-08-11'
lead: "Az AI olcsóvá tette a kódgenerálást, de a tévedés költségét nem csökkentette. A közös package-ek, explicit contractok, futtatható szabályok és megbízható kapuk ma meghatározzák, mennyi hasznos munkát tud kihozni egy csapat az AI-támogatott fejlesztésből."
metaDescription: "Miért a közös package-ek, a contractok, a futtatható architektúra szabályok és a folyamatkapuk döntik el az AI-native szoftverfejlesztés minőségét, miért vállalati kérdés ez, és hogyan építjük ezt a MONAD-nál a @monad-systems package-ekbe és a Hermes software factory-ba."
tags:
    - AI-Native fejlesztés
    - Platform Engineering
    - Software Factory
    - Spec-First
    - Agentic Development
    - Architektúra governance
    - Egyedi szoftverfejlesztés
---

## Nem a gépelés a probléma, hanem az üres lap

Ha megkérünk egy erős modellt, hogy építsen egy feature-t egy üres repóban, valószínűleg kapunk valamit, ami elindul. Mellé kapunk egy új konfigurációs mintát, hibaformátumot, logging konvenciót, pénzábrázolást és repository réteget is. Külön-külön mindegyik döntés védhető lehet. Együtt olyan rendszert alkotnak, amit senki nem tervezett meg.

Adjuk ugyanezt a feladatot ugyanannak a modellnek egy olyan kódbázisban, ahol van közös config package, route kit, money típus, hibaunió és CI-ban kikényszerített architektúra-szabályrendszer. Sokkal kevesebb dologról kell döntenie, mert a meglévő elemekből dolgozhat.

Az AI-támogatott fejlesztésnek ez a része kevés figyelmet kap, mert régi és látványtalan. Az építőelemek minősége mindig is korlátozta, hogy egy csapat milyen gyorsan tud biztonságosan haladni. Az AI-jal sokkal több kód ütközik ebbe a korlátba, ezért a gyenge alapok hamarabb és gyakrabban kiderülnek.

## Az építőelemek négy fajtája

Az „építőelem” alatt gyakran library-t értünk, pedig egy AI-native munkafolyamat négy tágabb kategóriára támaszkodik:

1. **Runtime elemek:** közös package-ek, amelyek futásidőben dolgoznak. Config, HTTP, auth, money, ID-k, monitoring. Kód, amit nem kell újra megírni.
2. **Contract elemek:** OpenAPI, AsyncAPI, JSON Schema, TypeBox definíciók. A rendszerhatár alakja, még az implementáció előtt.
3. **Szabályelemek:** architektúra invariánsok, rétegzési szabályok, elnevezési és ownership konvenciók. Mi megengedett, mi tilos, és miért.
4. **Folyamatelemek:** a kapuk. Review, jóváhagyás, CI check-ek, budget, branch protection. Ahol egy változásnak bizonyítania kell, mielőtt továbbmegy.

Egy mérnök az utóbbi kettőt hónapok alatt szívja magába. Egy agentnek nincs ilyen előélete: kap egy context window-t, és azt, amit beleteszünk. Ezért az számít, mennyi tervezői szándék érhető el olyan formában, amelyet a cég történetét nem ismerő szereplő is fel tud dolgozni, és amelyhez a munkája ellenőrizhető. Ehhez képest a modellválasztás sokkal kevésbé számít.

Ha a válasz az, hogy „nagyrészt a fejekben és a kódban”, akkor olyan outputot kapunk, ami helyesnek látszik, közben pedig fokozatosan eltávolodik a rendszertől.

## A korlátok teszik jóvá a generált kódot

Production rendszereknél a több szabadság és a jobb prompt ritkán adja a legmegbízhatóbb eredményt. A hasznos korlátok többet érnek.

A modell a kapott kontextushoz tartozó legvalószínűbb kódot állítja elő. Üres kontextussal a „legvalószínűbb” az internet átlagát jelenti: tutorialokat, blog snippeteket és elhagyott repókat. Szűkített kontextussal a „legvalószínűbb” azt a mintát jelenti, amit a kódbázisunk már ötvenszer használ.

A kontextus a saját kódbázisunk felé tolja a modellt az internetes átlag helyett.

Az alábbiak mind hasznosan szűkítik a mozgásteret:

- egy közös package, ami az adott problémát már megoldja
- egy séma, ami definiálja, mi számít érvényes payloadnak
- egy rétegzési szabály, ami tiltja a kerülőutat
- egy teszt, ami elbukik, ha valaki mégis a kerülőutat választja
- egy scaffold, ami a helyes vázat adja, még a generálás előtt

Ez hétköznapi platform engineering, azon a ponton alkalmazva, ahol a legtöbbet számít: még a generálás előtt.

## A kontextus szűkös, a jó package pedig tömörítés

Az építőelemek kontextust is megtakarítanak, a kontextus pedig véges és drága.

Minden token, amit a modell arra költ, hogy újra felfedezze, hogyan működik az adott kódbázisban az authentikáció, olyan token, amit nem a tényleges problémára fordít. Minden fájl, amit el kell olvasnia egy konvenció kikövetkeztetéséhez, egyben latency, költség és újabb esély arra, hogy kicsit rosszul következtessen.

Egy jól megtervezett package tömörítés. Ha a `@monad-systems/config` ott van a kontextusban, az agentnek nem kell hat környezetváltozó-betöltő implementációt elolvasnia, hogy kitalálja a házi stílust. Egyetlen import sor kivált egy teljes felderítést.

Ugyanez igaz a contractokra. Egy TypeBox route séma rövidebben írja le az interfészt, mint az implementáció, egyértelmű, és géppel ellenőrizhető. Minden promptnál jobb prompt, mert egyben teszt is.

Nagyobb szervezeteknél itt kezd érdekes lenni a költségoldal. A *Platform engineering 2.0: An evolution for the AI era* riport (Weave Intelligence, Broadcom megbízásából, 2026) számokkal is alátámasztja ezt: a fejlesztők két-tízszer több kódot generálnak, a token spend pedig új és jórészt láthatatlan költségkategóriaként érkezik, amire a legtöbb szervezetnek nincs eszköze. Ekkora méretben a tömörítés már nem ízlés kérdése, hanem megjelenik a számlán.

## A mi építőelemeink: a `@monad-systems` package-ek

A package-katalógusunk egy ERP platform monorepóból nőtt ki, ahol újra és újra ugyanazt a kódot írtuk meg kétszer. Nem frameworknek terveztük.

Amit ebből kiemeltünk, és ma a GitHub Packages-en, a `@monad-systems` scope alatt publikálunk, szándékosan látványtalan:

- **`config`** — típusos környezeti konfiguráció deklaratív field spec-kel, aggregált hibákkal, cross-field szabályokkal és production hardeninggel
- **`http-kit`** — spec-first route kit, ami a típusos handlert a TypeBox route sémájához köti, end-to-end inference-szel
- **`contract-schemas`** — közös contract primitívek, amiket a modul-contractok újrahasználnak
- **`monitoring`** — OpenTelemetry alapú monitoring eszközök
- **`auth-keycloak`** — OIDC kliensek és scope alapú ability builder
- **`audit-hash`** — kanonikus audit log hash-lánc, egy implementáció, amit minden író és az ellenőrző is használ
- **`snowflake-id`** — string-biztos Snowflake ID generálás
- **`ts-config`, `eslint-config`, `prettier-config`** — a közös toolchain alap

Mellettük, a repón belül és szándékosan publikálatlanul, ott vannak a platform package-ek (kernel, adapters, testing, workflow), a domain value objectek, mint a money és az invoice math, a generált API és event kliensek, valamint a tooling: architektúra check-ek, kódgenerálás, migration runner és module scaffold.

A szétválasztás fontosabb, mint maga a lista. A generikus elemek mehetnek egyik rendszerből a másikba, a terméklogika viszont maradjon abban a repóban, amelyikhez tartozik. Ha túl sokat publikálunk, olyan frameworkünk lesz, amihez senki nem mer hozzányúlni. Ha semmit, négyszer írjuk meg az audit-hash függvényt, az egyik verzió pedig finoman eltér a többitől.

A szabály, amit alkalmazunk, szűk: akkor emelünk ki valamit, ha generikus, egy dolgot csinál, és már most van valódi felhasználója a repóban. Előbb nem.

## A szabály csak akkor szabály, ha fut

Az általunk látott vállalati kódbázisokban bőven vannak standardok, de sok közülük csak leírt szövegként létezik. Egy wikioldal leírhatja, hogy „a domain kód nem importálhatja az adatbázis réteget”; egy CI-check meg is akadályozza, hogy ilyen import productionbe kerüljön.

Ez a különbség eddig is számított. Ha agentek is dolgoznak a kódon, döntővé válik, mert egy agent boldogan teljesíti az összes dokumentált konvenciót, amit megmutattak neki, és megsérti azt az egyet, ami csak implicit volt. Nincs benne az az ösztön, ami szólna, hogy pont ez a kerülőút okozta a tavalyi incidenst.

Ezért leírjuk az invariánsokat, aztán futtathatóvá tesszük őket. Az ERP platformunkban huszonkettő van belőlük, többek között ezek:

- egy modul csak azt teszi elérhetővé, ami a `package.json#exports`-ában szerepel, a modulok közötti mély importok CI hibát okoznak
- egy modul pontosan egy adatbázis sémát birtokol, a sémák közötti join és foreign key tilos
- minden írás egy use case-en keresztül megy, ami a tranzakciót birtokolja
- minden event publikálás az outboxon keresztül történik, soha nem közvetlen broker hívással a domain kódból
- a `Date.now()` és a `new Date()` tilos az infrastructure rétegen kívül, injektált clockot használunk
- a pénzértékek a money package-et használják, monetáris mezőnél a `number` tilos
- a TypeBox sémák a forrás, a generált contractok CI-ban read-only-k
- generált kódot soha nem szerkesztünk kézzel

Mindegyikhez tartozik kikényszerítés: architektúra check, lint szabály, típushatár vagy teszt. A teljes policy suite egy paranccsal fut, és a CI minden pull requestre lefuttatja. Ember vagy agent, ugyanaz a kapu.

A kikényszerítéstől lesz a style guide olyan, amit egy autonóm szereplő is követni tud. Ha a változás nem mergelhető a szabály betartása nélkül, kevésbé számít, hogy az agent megjegyezte-e a leírást.

## Visual: mire van szüksége egy agentnek, és honnan jön

```mermaid
flowchart TD
    A[Feladatleírás] --> Z[Agent kontextus]
    B[Közös package-ek] --> Z
    C[Contractok: OpenAPI, AsyncAPI, TypeBox] --> Z
    D[Architektúra invariánsok] --> Z
    E[Repó konvenciós fájl] --> Z
    Z --> F[Generált változás]
    F --> G[Architektúra check-ek]
    F --> H[Típusellenőrzés és contract validáció]
    F --> I[Tesztek]
    G --> J{Átmegy a kapun}
    H --> J
    I --> J
    J -->|nem| Z
    J -->|igen| K[Pull request emberi review-ra]
```

## A software factory: egy vault, egy orchestrator és egy határ

A Hermes az a software factory orchestrator, amely ezekre az elemekre épül: feladatok mennek be, agent futások, pull requestek és jegyzetek jönnek ki.

A belépési pont szándékosan unalmas. A feladatok jegyzetek egy Obsidian vaultban, frontmatterrel megjelölve. Egy watcher felszedi őket, és a munka haladásával lépteti a státuszukat. A szándékot a vault tárolja, így a feladat, a budgetje, az eredménye és a review verdiktje mind ugyanoda kerül, ahol az ember amúgy is gondolkodik.

Innen minden feladat négy lépésen megy át, mindegyik friss kontextusban fut, és csak az előző lépés tömörített artifactját kapja meg:

1. **Research.** Checkout a cél repóból, a modell által kiválasztott fájlok elolvasása, majd egy kódbázis-térkép, ahol minden állítás mellett ott a `file:line` hivatkozás.
2. **Plan.** A research artifact alapján számozott fázisú terv: fájlok, változások, és fázisonként egy verifikációs parancs.
3. **Implement.** Nem indul el, amíg egy ember jóvá nem hagyja a tervet. Utána generál, branchet push-ol, és pull requestet nyit.
4. **Review.** Egy friss kontextus csak a jóváhagyott tervet és a keletkezett diffet látja. A research dokumentumot soha, és azt az érvelést sem, ami a kódot előállította. Egy kérdésre válaszol: ez a diff megvalósítja ezt a tervet?

A reviewer szándékosan amnéziás. Soha nem látja a kódot előállító gondolatmenetet, ezért az nem tudja meggyőzni. A szándékot hasonlítja az eredményhez, vagyis azt a munkát végzi, amit egy jó emberi reviewer is, és amiben a változás szerzője általában a leggyengébb.

A verdikt pedig a findingokból következik, nem a modell saját összefoglalójából. Bármelyik nem teljesült tervkritérium vagy blokkoló finding changes requested-et jelent, függetlenül attól, minek nevezte a reviewer. Az a modell, ami „összességében rendben” minősítést ad, miközben három nem teljesült követelményt sorol fel, nem megy át a kapun.

A lépéseket guardrailek veszik körül, amelyek nélkül a felügyelet nélküli futás nem lenne biztonságos:

- **Emberi terv-jóváhagyás.** Implementáció nélküle nem indul. Ezt az egy kaput nem áll szándékunkban automatizálni.
- **Stop the line.** Az implementáció nem fut, amíg a cél repó default branchén bukó check-ek vannak. A research és a tervezés engedélyezett marad, mert így értjük meg, mi romlott el.
- **Budget.** Minden futás a három plafon közül a legszűkebbet kapja: a futásonkénti limit, a feladat saját budgetje és a projekt spend cap. Az a futás, aminek a budgetje már elfogyott, az első modellhívás előtt elbukik. Mindegyik futásnak van wall-clock plafonja is.
- **Egyetlen egress pont.** Minden modellhívás egy proxyn megy át. Egyik lépés sem beszél közvetlenül a szolgáltatóval.

## Visual: a futási pipeline és a kapui

```mermaid
flowchart TD
    A[Vault jegyzet: factory task] --> B[Research: kódbázis-térkép file:line hivatkozásokkal]
    B --> C[Plan: számozott fázisok és verifikációs parancsok]
    C --> D{Ember jóváhagyja a tervet}
    D -->|nem| C
    D -->|igen| E{Default branch zöld}
    E -->|nem| F[Blokkolva: stop the line]
    E -->|igen| G[Implement: branch és pull request]
    G --> H[Review: jóváhagyott terv vs diff, friss kontextus]
    H --> I{Tiszta findingok}
    I -->|nem| J[Changes requested, vissza a sorba]
    I -->|igen| K[Emberi review és merge]
```

## A PII határ, avagy miért kell a biztonságnak a platformba költöznie

A factory egyik komponense egyáltalán nem generál kódot.

A Hermes és a modellszolgáltató között egy PII agent áll. Ez az egyetlen folyamat, ami a szolgáltatói kulcsot birtokolja, és az egyetlen, ami kifelé hívhat. Minden más placeholdereket küld.

A működése determinisztikus: magyar és angol azonosítókra írt felismerők, adószám, TAJ szám, személyi azonosító, IBAN és bankszámlaszám, kártyaszám ellenőrzőösszeggel, telefonszám, e-mail cím, lakcím és szótáralapú nevek. A talált értékeket futásonként, visszafordíthatóan tokenizálja és adatbázisban tárolja. Kifelé a tokenek mennek; a válasz útján visszaállnak az eredeti értékek. Minden áthaladás hash-láncolt audit logba kerül, ugyanazzal az `audit-hash` package-dzsel, amit a platform többi része is használ.

A felismerés minőségét CI kapu kényszeríti ki: címkézett korpusz, recall és precision küszöbbel, amelyet teljesíteni kell, mielőtt a pipeline élesbe mehet.

Ez konkrét megvalósítása annak, amit a platform engineering riport „security shifts down” néven ír le. A shift-left előbbre hozta a biztonságot az időtengelyen, és több eszközt meg több felelősséget adott a fejlesztőnek. A shift-down beépíti az alatta lévő platformrétegbe, így a fejlesztő számára láthatatlan és tervezésileg megváltoztathatatlan.

AI workloadoknál a szivárgást tiltó utasítás gyengébb, mint egy olyan architektúra, amelyben a modell soha nem kapja meg a védett adatot. Az utasítás betartása együttműködést feltételez. Az architektúra nem.

A riport néven nevezi az új támadási felületeket is: shadow AI sprawl, prompt injection, model poisoning és inference adatszivárgás, amelyek közül egyet sem talál meg SAST vagy DAST eszköz egy élő inference streamben. Egy determinisztikus, auditált tokenizációs határ az utolsót azon a rétegen kezeli, amelyik erre a legalkalmasabb.

## A factory ugyanazokból az elemekből épül, amiket használ

Ezt a szimmetriát nem terveztük, de a Hermes egy Fastify szolgáltatás, ami a `@monad-systems/fastify`, `config`, `http-kit`, `monitoring` és `snowflake-id` package-ekre épül. Az útvonalai spec-first módon definiáltak: TypeBox séma `const`-ként, mielőtt a handler létezne, majd `route(schema, handler)`. Az audit lánca az `audit-hash`-t használja. Az admin felülete a közös UI kitre költözik, amint az elkészül.

Az az eszköz, ami agenteket futtat a repóinkon, ugyanazokból az alkatrészekből áll, mint azok a rendszerek, amiken az agentek dolgoznak.

Így az építőelemek minden javítása egyszerre javítja mindkét oldalt, a factory pedig a saját standardjainak első számú felhasználójává válik. Ha egy package kényelmetlen használni, azt használat közben tudjuk meg, nem egy kérdőívből.

A kör önmagára záródik. A jobb építőelemektől olcsóbbak és pontosabbak lesznek az agent futások. Az olcsóbb, pontosabb futásoktól könnyebb javítani az építőelemeket.

## A mérettel együtt nő a platform jelentősége

Mindez elsőre egy kis csapat rendezett setupjának tűnhet. Nagy szervezetben azonban még fontosabb az építőelem-kérdés, mert minden inkonzisztencia több felhasználót érint.

Az eltérések a felhasználók számával együtt drágulnak. Ha tíz csapat külön oldja meg a konfigurációt, tíz helyen kell hozzányúlni a következő migrációnál, a következő CVE-nél és a következő compliance követelménynél.

Az agentek ráadásul a felhasználók egy új típusát jelentik. A riport ebben egyértelmű: az AI agentek több mint egy évtized óta az első új platform persona, és API-kat használnak, nem felületeket. Verziózott, dokumentált API-k, scope-olt jogosultságok, nem emberi identitás, audit logging, budget kontroll és egress kontroll kell nekik. Ezek mind platform képességek, nem pedig fejlesztői preferenciák. Ha a platformunk nem tudja kifejezni, hogy „ez a szereplő ezeket teheti, legfeljebb ennyiért, és itt a nyoma”, akkor nem tudunk biztonságosan agenteket futtatni, bármilyen jó is a modell.

A bounded autonomy-nak konkrét összetevői vannak. Azok a csapatok, amelyek a gyakorlatba ültetik, hét területet különítenek el: identitás, kontextus, képesség, végrehajtás, kiértékelés, biztonság és observability. Olvassuk vissza a fenti factory leírást ezzel a listával: a megfeleltetés pontos. A terv-jóváhagyás és a stop the line képességkorlát. A review lépés a kiértékelés. A PII agent a biztonság. A futási logok, artifactok és a hash-láncolt audit az observability. A budget és a spend cap a végrehajtási plafon. Semmi nem modellspecifikus benne, így túléli a következő modellt.

Közben a költség is kiemelt mutatóvá válik. Iparági átlagban nagyjából 35% a cloud pazarlás, még mielőtt az AI infrastruktúra rárakódna, az agentic fejlesztésből származó token spend pedig olyan kategória, amire a legtöbb szervezetnek egyáltalán nincs eszköze. Egy futásonkénti költségplafon, amely menet közben leállítja a futást, kis fejlesztés, mégis ez választja el a kísérletet a költségvetési incidenstől.

A modularitás véd a gyors változás ellen. A CNCF ökoszisztéma a 2018-as nagyjából 50 projektről mára több mint 200-ra nőtt, a modellképességek és agent minták pedig ennél is gyorsabban cserélődnek. Most senki nem a véglegesen helyes eszközt választja. Annyit tehetünk, hogy egy eszköz cseréje ne gyűrűzzön végig a rendszeren, és ez ugyanaz a moduláris, API-first, verziózott, contract-alapú fegyelem, amitől a package-eket egyáltalán érdemes volt kiemelni.

Aztán ott a golden path problémája, ahol az agentek felborítják a korábbi számítást. A standardizált sablonok, amik korábban a deployok többségét kiszolgálták, elkezdik blokkolni azt a csapatot, amelyik valami újat csinál, és minden kivétel visszafut a platform csapathoz. Amikor a scaffolding, a contract-generálás és a migrációs munka olcsóvá válik, a platform csapat több utat engedhet meg magának ahelyett, hogy egyet védene. Egy golden pathből a bővítés költsége csinál ketrecet.

## Régi gyakorlatok, nagyobb érték

Minden gyakorlat, amitől a szoftver az AI előtt biztonságosan változtatható volt, ma is ugyanazt a munkát végzi. A többségük többet ér, mint korábban, mert a szűk keresztmetszet elmozdult.

A contract-first tervezés korábban dokumentáció és koordinációs eszköz volt. Ma egyben prompt és kapu is: megmondja az agentnek, mit építsen, és megmondja a CI-nak, hogy azt építette-e. A spec-first jó ötlet volt akkor is, amikor a contractokat csak emberek használták. Ma, amikor már nem csak ők, szinte kötelező.

A tesztek szerepe is megváltozott. Egy agent újra és újra lefuttatja a test suite-ot, így az a generálás fitness függvénye lesz, nem csak utólagos védőháló. Egy gyenge suite ma már nem csak hibákat enged át: azt is megtanítja a ciklusnak, hogy a hibás kód elfogadható.

A code review lett a szűk keresztmetszet. Ha az írás olcsó, az ellenőrzés a szűkös erőforrás, és az is megváltozott, mire való: kevesebb elgépelés-vadászat, több „azt csinálja ez a diff, amiben megegyeztünk, és csak azt”. A review lépésünk azért ezt kérdezi, mert erre kellene az emberi figyelmet fordítani.

A kicsi, egy témára szorítkozó változások most többet számítanak, nem kevesebbet. Amikor a generálás olcsó, csábító nagy diffeket szállítani. Ne tegyük. A review a korlát, és a review költsége gyorsabban nő, mint a diff mérete.

A CI marad a kikényszerítő réteg. Az agentek azt követik, ami ki van kényszerítve, nem azt, ami dokumentálva van. Előbb-utóbb mindenki más is. Az agenteknél ez csak azonnal látszik.

Az observability gyorsabban megtérül. Ha több kód megy ki gyorsabban, több előre nem látott probléma jut el a productionig. A strukturált logging, a tracing és a metrikák nálunk mindig is delivery standardok voltak, és így derül ki, mit szállított valójában a felgyorsult pipeline.

A döntési dokumentumok fedik le azt az egyetlen dolgot, amit nem lehet a forrásból újragenerálni: a miértet. Egy ADR, ami egy trade-offot magyaráz, soronként többet ér szinte bárminél, amit írunk, mert ez az a kontextus, amitől a következő változás helyes lesz, nem csak hihető.

A sort a trunk tisztán tartása zárja. A stop the line régi gyártási ötlet, és ugyanazért működik, amiért mindig: törött alapra építeni sokszorozza a kárt. Az automatizálás gyorsabban sokszorozza.

A mechanizmus mögötte egyszerű. Az AI megváltoztatta egy megoldásjelölt előállításának költségét, és nagyjából ott hagyta az ellenőrzés költségét, ahol volt. Ezért minden gyakorlat, ami az ellenőrzést javítja, felértékelődik. Minden gyakorlat, ami csak az előállítás sebességét javította, leértékelődik.

## Máshová kerül a mérnöki munka

Tapasztalatunk szerint kevesebb idő megy el implementációk gépelésére, és több interfészek specifikálására, invariánsok definiálására, scaffoldok építésére, valamint a szándék és az eredmény összevetésére. A senior mérnöki munka a rendszertervezés felé tolódik.

A dokumentációból futtatható kontextus lesz. Egy konvenciós fájl a repó gyökerében, path-scoped instrukciós fájlok, feladatra triggerelt eljárások. Mindegyiket minden futás beolvassa, ezért ha hibásak, kijavítják őket, így naprakészek maradnak. Ez az első dokumentáció, aminek működő visszacsatolása van.

Megjelenik a nem funkcionális követelmények egy új csoportja is: egress kontroll, spend cap, nem emberi identitás, akció audit és terv-jóváhagyás. Öt éve ezek egyike sem került backlogra. Ma előfeltételei annak, hogy agenteket futtassunk egy éles kódbázison, és a platformcsapathoz tartoznak.

## Hol romlik el

A megközelítés karbantartást igényel, és kiszámítható módokon romlik el.

Akkor bukik meg, ha:

- a package-eket felhasználók nélkül emelik ki, és egyetlen use case köré fagy be az API
- a „közös” pass-through wrapperek és homályos util modulok szemétlerakója lesz
- a szabályok csak szövegként léteznek, és soha nem kapnak kikényszerítést
- a terv-jóváhagyás gumibélyegzővé silányul, ami pont az egyetlen érdemi emberi kaput számolja fel
- ugyanaz a rendszer írja és hagyja jóvá a változást
- az autonómia előbb bővül, mint ahogy a budget, az audit és az egress kontroll elkészül
- az elemkatalógus gyorsabban nő, mint a karbantartási hajlandóság

A javítás mindegyik esetben ugyanaz, mint az agentek előtt volt: legyünk szelektívek, tartsuk kevésnek és használatban lévőnek az építőelemeket, tegyük futtathatóvá a szabályokat, és hagyjunk embert azokon a döntési pontokon, amiket nem tudunk olcsón visszacsinálni.

## Előbb építsünk pályát, aztán növeljük a sebességet

Az AI-támogatott fejlesztést az alapján érdemes megítélni, hogy mire érkezik a generált kód, nem az alapján, hogy mennyit tud írni a modell. Erős package-ek, explicit contractok, kikényszerített invariánsok és megbízható kapuk mellett a változás illeszkedik a meglévő rendszerhez. A csak fejekben élő standardok hihetőnek tűnő eltéréseket termelnek, amelyeket gyakran csak productionben veszünk észre.

Nálunk ez a gyakorlatban három dolgot jelentett: egy kicsi, közös package katalógust `@monad-systems` alatt publikálva, amit minden általunk épített rendszer használ, huszonkét architektúra invariánst, amelyek check-ként futnak és nem wikiben ülnek, és egy software factory-t, ahol a feladatjegyzetekből pull request lesz egy olyan pipeline-on át, amiben van emberi jóváhagyás, review kapu, költségplafon és egyetlen kijárat: egy determinisztikus PII határ.

Az eszközök sokat változtak. A contract-first tervezés, a hangosan bukó tesztek, a szándék ellenében végzett review, a kicsi diffek, a kikényszerített CI, az observability és a leírt döntések nem. Ma ezek döntik el, hogy az AI a hasznos munkát vagy csak a rendszer szétcsúszását gyorsítja fel.
