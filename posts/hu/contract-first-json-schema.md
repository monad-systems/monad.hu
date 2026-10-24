---
title: 'Mielőtt implementálnánk, tervezzük meg a rendszert'
date: '2025-04-24'
image: '/images/posts/contract-first-json-schema.jpg'
lead: 'Sok csapat csak az implementáció után generál API-contractot. Az előre megtervezett interfész közös forrást ad a backendnek, a frontendnek, a QA-nak és a szolgáltatás consumereinek, még mielőtt az integrációs hibák drágák lennének.'
metaDescription: 'A spec-first fejlesztésben a találgatás helyére explicit contractok lépnek. Az OpenAPI, az AsyncAPI és a JSON Schema használatával klienseket generálhatunk, payloadokat validálhatunk, javíthatjuk a biztonságot, és kevesebb integrációs hibával gyorsíthatjuk a delivery-t.'
tags:
    - Spec-first
    - OpenAPI
    - AsyncAPI
    - JSON Schema
    - Generált kliensek
    - AJV-validáció
    - Egyedi szoftverfejlesztés
---

## Kezdjük a contracttal

Sok csapat még mindig melléktermékként kezeli az API-contractot. Megírják az endpoint handlereket, hozzáadják a DTO-kat és a validációt, majd a futó alkalmazásból próbálnak dokumentációt kinyerni. Amikor a frontend, a QA és a többi szolgáltatás elkezdi az integrációt, kiderül, hogy mindenki másként értelmezte a nullable mezőket, az enumokat, az edge case-eket és a hibaformátumokat. A klienskód addigra több repóba szóródott szét.

Kis méretben ezzel még együtt lehet élni. Platformméretben viszont fékezi a delivery-t.

A spec-first fejlesztés ezeket a döntéseket az implementáció elé hozza. Ha a contract teljes jogú forrásfájl, a design nem bújik el a controllerkódban: a csapatok review-zhatják, kódot generálhatnak belőle, és több rendszerben is újrahasznosíthatják.

## A contract a delivery egyik alapja

Az OpenAPI, az AsyncAPI és a JSON Schema együtt olyan formában írja le a rendszerhatárt, amelyet emberek és eszközök egyaránt megértenek.

Ez a határ jóval több a mezőneveknél és a primitív típusoknál. Rögzíti a megengedett payloadokat és a kötelező mezőket, valamint a formátumra és a szerkezetre vonatkozó megkötéseket. Ide tartoznak a hibák, az autentikáció, a szerepkörök és scope-ok, a kompatibilitási szabályok, az eseménypayloadok, valamint a backend és a frontend által közösen használt modellek jelentése is.

Az előre definiált határ közös tervet ad a csapatoknak, így nem az implementáció részleteiből kell utólag kikövetkeztetniük, mi volt a terv.

## Hogyan működik a code-first a gyakorlatban

A code-first megközelítés gyorsnak tűnik: megírjuk az endpointot, annotáljuk, majd a framework metaadataiból dokumentációt generálunk. Egyes eszközök a DTO-kból vagy a TypeScript-típusokból a sémát is kikövetkeztetik. Ez a kényelem hasznos, különösen kis szolgáltatásnál, de a design csak akkor válik review-zhatóvá, amikor már kód lett belőle.

Egyszerű szolgáltatásoknál ez elég jól működhet. Nagyobb rendszerekben viszont a dokumentáció minősége a framework konvencióin múlik. A generált contract inkább a transport szerkezetét tükrözi, mint a tervezői szándékot. Idővel eltér egymástól a backend- és a frontendmodell, következetlen lesz a sémák újrahasznosítása, duplikálódik a validáció, a klienskönyvtárakban pedig hiányosak a típusok, vagy nincs runtime-ellenőrzés.

A code-first nem mindig rossz választás. Ilyenkor viszont könnyen az implementáció közben, véletlenül születnek meg az interfészdöntések. A spec-first akkor teszi őket review-zhatóvá, amikor még olcsó változtatni rajtuk.

## A JSON Schema többre képes, mint amire a legtöbb csapat használja

Sok csapat közvetve már használ JSON Schemát: ott van az OpenAPI-ban, a validációs eszközökben, az űrlapgenerálásban és a konfigurációk ellenőrzésében. Mégis gyakran csak technikai részletként kezelik, nem a rendszerhatárok közös leírásaként.

A modern backendplatformokon a JSON Schema az egyik leghatékonyabb eszköz a rendszerhatárok leírására. Az adatszerkezetek és megkötések géppel olvasható modelljéből API-specifikáció, runtime-validáció, generált típusok, frontendűrlapok, mockok, tesztfixture-ök, contractdiffek és közös platformkönyvtárak is készülhetnek.

Az értéke az, hogy a delivery-lánc minden része ugyanarra a leírásra támaszkodhat.

## Spec-first platformszinten

A legnagyobb hasznát a Fizz-backendplatform építésekor láttuk: ott a spec-first nem szolgáltatásonként eltérő ízlés kérdése volt, hanem a platform része lett.

Az OpenAPI-dokumentum statikus YAML-fájlként a service forráskódjában van. Handlereket, típusokat és validátorokat generálunk belőle, az AJV pedig a backenden és a frontenden is fut. A CI naprakészen tartja a backend consumerek, a frontendalkalmazások és a tesztek HTTP-klienseit. A tesztek így mockok ellen futhatnak, anélkül hogy URL-eket, metódusokat vagy payloadokat kellene hardcode-olni.

A kliensek a contractból generálódnak, ezért a consumereknek nem kell kézzel összerakniuk a service-hívásokat. A backendvalidáció és a frontend ugyanazokra a sémákra épül, a generált kliensek miatt pedig a teszteknek sem kell megismételniük a requestek részleteit.

A fejlesztők szerint javult a developer experience, mert nem kell fejben tartaniuk az interfész részleteit. Egy-egy hívásnál kevés időt nyerünk, de sok szolgáltatásban és repóban ez összeadódik.

## Az OpenAPI-dokumentum a service forráskódjában legyen

Sok code-first megoldásban az API-dokumentum a futó alkalmazásból generálódik. Így a contract a kódtól függ, és gyakran csak fordítás vagy indulás után érhető el megbízhatóan.

A service forrásába commitolt statikus OpenAPI YAML megfordítja ezt a függőséget. A specifikáció már a service futása előtt létezik, pull requestben review-zható, és önállóan lintelhető és validálható. Már az implementáció befejezése előtt épülhet rá kódgenerálás, breaking change-ellenőrzés, dokumentációpublikálás és tesztelés. A contract így a fejlesztés olyan kiindulópontja lesz, amelyet a platform kezel.

## Vizuál: code-first és spec-first

```mermaid
flowchart TD
    A[Handlerek és DTO-k írása] --> B[Dokumentáció generálása frameworkmetaadatokból]
    B --> C[A consumerek kitalálják a viselkedést]
    C --> D[Integrációs hibák későn derülnek ki]
    D --> E[Kód, dokumentáció és kliensek foltozása]

    F[OpenAPI / AsyncAPI tervezése először] --> G[Sémák és viselkedés review-ja]
    G --> H[Típusok, validátorok, handlerek, kliensek generálása]
    H --> I[Implementáció a jóváhagyott contract alapján]
    I --> J[Korábbi integráció, kevesebb eltérés]
```

## A generált kliensek kiváltják a duplikált interfészkódot

A generált kliensek időt takarítanak meg, de a nagyobb előnyük a konzisztencia.

Generált kliensek nélkül a consumerek kézzel másolják le az interfészt. Helyben rakják össze az útvonalakat és a queryparamétereket, emlékezetből választanak HTTP-metódust, az auth headereket pedig kliensenként másként kötik be. A request- és response-típusok gyakran hiányosak, a hibakezelés esetleges, a tesztek beégetett endpointrészleteket tartalmaznak, az eventalapú rendszerekben pedig az egyes komponensek idővel eltérő topicneveket és payloadszerkezeteket használnak.

Minden ismétlés újabb pont, ahol az implementáció és a consumerek elcsúszhatnak egymástól.

Ha a CI gondoskodik róla, hogy a kliensek mindig a friss contractból generálódjanak, ennek a hibatípusnak a nagy része eltűnik. A consumerek közvetlenül a contractból generált artifactokat használják.

Nálunk ez a tesztelést is javította. A generált klienseket end-to-mock tesztekben is használjuk, vagyis a tesztek ugyanazt a contractból generált felületet használják, mint a production consumerek. A tesztekhez így nem kell duplikált URL, kézzel írt fetch wrapper vagy magic string a metódusok és az útvonalak megadásához.

A tesztek kevésbé törékenyek, mert nem tartalmazzák az interfész egy második, kézzel írt változatát.

## A típusok nem védenek runtime-ban

A TypeScript fejlesztés közben segít végiggondolni, milyen adatot várunk, de runtime-ban nem validálja a külső inputot. Hibás payload ugyanúgy érkezhet egy másik szolgáltatásból, egy régebbi kliensből, egy csak részben frissített consumertől vagy egy külső integrációból.

Ha a handlerek, a kliensek és az űrlapok ugyanazokból a sémákból épülnek, sokkal könnyebb egységesen tartani a runtime-validációt a rendszerhatárokon.

Backendoldalon a bejövő requesteket kell validálni, és néha azt is ellenőrizni kell, hogy a kimenő adatok megfelelnek-e a contractnak. A frontenden a felhasználói inputot kell validálni, és ellenőrizni kell, hogy az elküldendő payload megfelel-e az API-contractnak.

Ha az AJV mindkét oldalon fut, runtime-ban is ellenőrizzük azt, amit a típusok csak fejlesztés közben írnak le.

A típusrendszer leírja, mit vár a saját kódunk. A validátor ellenőrzi, mi lépte át ténylegesen a rendszerhatárt. Mindkettő kell.

## Ugyanazok a sémák a frontendet is segíthetik

A spec-firstről szóló beszélgetések gyakran backendközpontúak, pedig ugyanazokat a sémákat a frontend és az admin tooling is használhatja.

Ha az API-kat JSON Schema-alapú contractok írják le, és ezek a sémák a frontendnek is elérhetők, jóval többre használhatók a kliensgenerálásnál.

Például a JSON Forms jelentősen gyorsíthatja az adminfelületek fejlesztését.

Egy teljes, ügyfeleknek szóló frontendhez a sémából generált felület általában túl kezdetleges. Belső eszközöknél, admin backoffice-nál, üzemeltetési felületeknél, konfigurációs képernyőknél és workflow-űrlapoknál viszont a schema-driven UI sok ismétlődő munkát kiválthat.

Különösen jól működik, ha a felelősségeket tisztán szétválasztjuk:

- **JSON Schema** írja le a data contractot és a validációs szabályokat
- **UI Schema** írja le az elrendezést és a megjelenítést
- **AJV** validálja az űrlapadatot ugyanazzal a sémával, amelyet az API-contract is használ

Így a teljes lánc összhangban marad:

1. A backend contract definiálja, mi számít érvényes payloadnak.
2. A frontendűrlap ugyanezekből a sémákból generálható, vagy legalább nagyrészt rájuk épülhet.
3. A UI schema irányítja a renderelést, a csoportosítást, a widgeteket és a layoutot.
4. A payload küldés előtt validálható.
5. A backend fogadáskor ugyanazt a szerkezetet validálja.

Így nem kell minden rétegben külön, kézzel újraimplementálni a mezőket, a szabályokat és a szerkezeti elvárásokat. Az adminfelületekhez kevesebb ismétlődő UI-kód kell, és közelebb maradnak az API-contracthoz.

## JSON Forms és schema-driven adminfelületek

A belső platformokon gyorsan rengeteg üzemeltetési űrlap gyűlik össze: termékattribútum-szerkesztők, árazási konfigurációk, integrációs beállítások, szabály- és policy-szerkesztők, merchant onboarding, supporteszközök és feature-konfigurációs panelek.

Ezek a felületek fontosak, de ritkán ezek különböztetik meg a terméket. Pontosnak, karbantarthatónak és könnyen módosíthatónak kell lenniük; a mezők többségéhez nem kell egyedi UX.

JSON Forms-szal vagy hasonló eszközökkel a szerkezetet és a validációt JSON Schemában definiáljuk, a megjelenítést UI schemával irányítjuk, miközben szigorúan kompatibilisek maradunk a backend contracttal.

A közös modell miatt nincs szükség duplikált meződefiníciókra, és a validációs szabályok egy helyen maradnak. Gyorsabban készülnek el az új adminfelületek, olcsóbb követni a sémaváltozásokat, a beküldött adat közelebb marad az API-contracthoz, és a fejlesztők hamarabb kiismerik a belső eszközöket.

Ott használjuk újra a contractmodellt, ahol ezzel ismétlődő UI-munkát spórolunk meg.

## Vizuál: schema-driven folyamat az API-tól az admin UI-ig

```mermaid
flowchart TD
    A[OpenAPI + JSON Schema] --> B[Generált backend handlerek és validátorok]
    A --> C[Generált típusos kliensek]
    A --> D[Frontendűrlapmodell]
    D --> E[UI Schema vezérli a layoutot és widgeteket]
    E --> F[JSON Forms rendereli az admin UI-t]
    F --> G[AJV validál frontendoldalon]
    G --> H[Request küldése generált klienssel]
    H --> I[AJV validál újra backendoldalon]
```

## Az event contractok láthatóvá teszik a rejtett csatolást

A spec-first különösen fontos, ha a rendszer nem tisztán szinkron.

HTTP-nél legalább láthatók az interfészek: vannak útvonalak, metódusok, státuszkódok. Üzenetalapú rendszereknél a felület a rendszer növekedésével egyre kevésbé magától értetődő. Ahogy szaporodnak a topicok, és a payloadok egyeztetés nélkül változnak, hasonló események jelennek meg eltérő jelentéssel, a consumerek pedig dokumentálatlan feltételezésekre támaszkodnak.

Az AsyncAPI és a sémák fegyelmezett újrahasznosítása láthatóvá teszi ezeket a függőségeket.

Event-driven rendszerekben a kétértelműség veszélyesebb, mert a hibák gyakran késve és szétszórtan jelentkeznek. Egy téves feltételezés nem mindig jár látványos hibával: csendben is hibás működést okozhat a downstream rendszerekben, vagy úgy ronthat el egy integrációt, hogy az okát drága felderíteni.

Az explicit event contractok rögzítik az üzenetek payloadját, azt, hogy melyik csapat felel az adott üzenetért, a verziózás módját, a correlation ID-kat, a kompatibilitási szabályokat, a példákat és az üzenetek jelentését.

Ahogy a HTTP API-knál, itt is a forráskódban tárolt contractra épülhet a validáció, a review, a generálás és a governance. Enélkül az event-driven rendszerben észrevétlen csatolások halmozódnak fel, amelyek csak akkor derülnek ki, amikor valamelyik consumer hibásan kezd működni.

## A biztonsági követelmények az interfész mellé tartoznak

Túl sok rendszerben csak az interfész megtervezése után implementálják az authorizationt. Az endpointok a kódban válnak védetté, a szerepkörök kimondatlanok maradnak, a policy-k pedig szétszóródnak annotációk, middleware-ek és service-enként eltérő konvenciók között.

Ha a scope-ok, az auth-sémák és a védett műveletek a contractban szerepelnek, több minden egyszerűbb lesz:

- a biztonsági követelmények korábban review-zhatók
- a generált artifactok egységesen értelmezhetik az auth-követelményeket
- a consumercsapatok tudják, milyen credential vagy scope kell
- a hiányosságok már a design review során kiderülhetnek, nem csak a rollout után

Ez nem helyettesíti az authorization gondos megtervezését, de a biztonsági követelményeket az interfész mellé teszi, ahol a reviewerek és a consumerek is látják.

## Stabil contract mellett a csapatok párhuzamosan dolgozhatnak

Amint a contract elég stabil:

- a backend implementálhatja a handlereket
- a frontend használhatja a generált klienseket
- a QA előkészítheti a teszteseteket és a fixture-öket
- a specifikációból mockok készülhetnek
- az integrációs tesztelés korábban elindulhat
- a consumerszolgáltatások a contract alapján fejleszthetnek, mielőtt a provider elkészülne

A közös contract annyira csökkenti a bizonytalanságot, hogy lehet párhuzamosan dolgozni. A backendnek, a frontendnek, a QA-nak és a consumerszolgáltatásoknak nem kell megvárniuk a provider deployolását.

## A CI gondoskodik róla, hogy a contract legyen a mérvadó

Ha a CI ügyel arra, hogy a specifikáció érvényes legyen, és a generált artifactok naprakészek maradjanak, sokkal nehezebb véletlenül megkerülni a folyamatot.

Egy kiforrott beállításban a tipikus ellenőrzések:

- OpenAPI- vagy AsyncAPI-validáció
- a sémák lintelése
- a breaking change-ek felismerése
- handlerek, típusok, validátorok és kliensek generálása
- annak ellenőrzése, hogy a generált kód commitolva vagy publikálva van
- tesztek futtatása generált kliensekkel és mockokkal

Ezek az ellenőrzések teszik a contractot mérvadóvá, így a contract-first nem azon múlik, hogy mindenki emlékszik-e rá, és betartja-e.

## Vizuál: spec-first platform workflow

```mermaid
flowchart TD
    A[OpenAPI / AsyncAPI frissítése] --> B[PR-review]
    B --> C[Séma és példák validálása]
    C --> D[Breaking change-ellenőrzés]
    D --> E[Típusok, validátorok, handlerek, kliensek generálása]
    E --> F[Tesztek futtatása generált kliensekkel és mockokkal]
    F --> G[Service és contract artifactok publikálása]
```

## Mikor nem működik a spec-first

Ha a sémák gyengék, a generált artifactok rossz minőségűek, vagy a specifikációt bürokratikus tehernek tekintik, a folyamat nehézkes lesz, és keveset ad.

Tipikusan akkor bukik meg, ha:

- a spec megvan, de senki nem tekinti mérvadónak
- a fogadó oldal nem validál a contract alapján
- hiányoznak a példák
- gyenge minőségű a generált kód
- homályosak a verziózási és kompatibilitási szabályok
- a csapatok a lényegtelen dolgokat is túl aprólékosan modellezik
- senki nem felel a contract lifecycle-ért

Ott használjuk a spec-first megközelítést, ahol a contract számít. Tartsuk olvashatónak a sémákat, csak olyan artifactokat generáljunk, amelyek munkát váltanak ki, vagy eltérést előznek meg, kényszerítsük ki a folyamatot CI-ban, és kezeljük a contract review-t design review-ként.

## A consumerek számával együtt nő a megtérülés

Egy termék életének elején szinte bármilyen módon lehet interfészt tervezni, mert kevés a consumer, és gyors a visszajelzés. Ahogy szaporodnak a szolgáltatások, a csapatok, a környezetek és a kompatibilitási elvárások, úgy változik a költségszerkezet.

Több szolgáltatás, frontend, csapat és környezet mellett nő a kompatibilitási nyomás, erősebb governance kell, több üzemeltetési eszköz és megbízhatóbb automatizálás. Az interfész ilyenkor már a platform része, nem helyi implementációs részlet. A spec-first akkor térül meg, ha a delivery pipeline egészében a contractra épül a kódgenerálás, a validáció és a tesztelés.

## Dolgoztassuk meg a contractot

A spec-first elég korán ad explicit formát a contractoknak ahhoz, hogy az eszközök, a tesztek, a validátorok, a kliensek és a csapatok ugyanarra a forrásra támaszkodhassanak.

A JSON Schema összekötheti az API designt, a runtime-biztonságot, a kliensgenerálást, az admin UI-generálást és a platformgovernance-t. Ha csak validációs segédeszköznek tekintjük, ennek nagy része kihasználatlan marad.

A Fizz-backendplatformon ez statikus, a service forrásában tárolt OpenAPI-t, generált handlereket, típusokat és validátorokat, valamint a backenden és a frontenden futó AJV-t jelenti. A CI naprakészen tartja a service-ekben, a frontendkódban és a tesztekben használt generált klienseket, a JSON Forms pedig ugyanazokat a sémákat használja az admin UI fejlesztéséhez.

Ha egy csapat már használ OpenAPI-t, AsyncAPI-t vagy JSON Schemát, a következő lépés az, hogy először a contractokat írja meg, és ezek határozzák meg, hogyan épül a rendszer.
