import type { Guide } from './types';

// Facts verified 6 Oct 2026, verbatim, against Finlex, vero.fi, prh.fi, tyosuojelu.fi, etk.fi,
// sotsiaalkindlustusamet.ee and emta.ee (page update date in brackets). Independent review the
// same day; its findings were re-checked against the same sources before they were applied.
// - Kaupparekisterilaki 564/2023: 3 § covers a "ulkomainen yhteisö ... joka perustaa Suomeen
//   sivuliikkeen"; 10 § perustamisilmoitus "Ennen elinkeinotoiminnan aloittamista"; 11 § the
//   foreign trader's tilinpäätös "kuuden kuukauden kuluessa tilikauden päättymisestä".
// - Elinkeinotoimintalaki 565/2023: 1 § sivuliike = part of a foreign entity "joka harjoittaa
//   Suomessa tästä maasta käsin ammattimaisesti elinkeinotoimintaa ulkomaisen yhteisön ... nimiin
//   ja lukuun"; 2 § EEA entities may do business without a permit; 5 § the notification duty
//   does not cover an EEA entity "joka tarjoaa tilapäisesti palvelua Suomessa"; 6 § for an EEA
//   entity's branch "edustajan asuinpaikan on oltava Euroopan talousalueella".
// - PRH sivuliikkeen perustamisilmoitus: "Y1-lomake, Verohallinnon liite 6204"; "Sivuliikkeen
//   perustamisilmoitus maksaa 400 euroa"; name e.g. "CDE Cargo Ltd., Suomen sivuliike".
// - Vero, yritystoiminnan aloittaminen Suomessa – ulkomainen yritys (11.2.2026): "Kun teet
//   perustamisilmoituksen, saat Y-tunnuksen"; "Y1 + liitelomake 6204: yhteisöt"; "Rekisteröinti
//   Verohallinnon rekistereihin kestää noin 3 viikkoa"; PE decision "tehdään myöhemmin, yrityksen
//   ensimmäisen vuoden jälkeen annettavan verotuspäätöksen yhteydessä". Guide 47780 (6.5.2026):
//   home-country trade register extract with a Finnish, Swedish or English translation;
//   "Ennakkoperintärekisteriin kuuluminen ei ole pakollista"; if not registered the payer
//   withholds tax; EEA companies can be registered (EPL 25 § 3 mom.); registration "ei kuitenkaan
//   itsessään aiheuta yhtiölle tuloverovelvollisuutta Suomessa".
// - VAT: AVL 1501/1993 84 § "25,5 prosenttia"; 9 § buyer liable when the foreigner has no fixed
//   establishment in Finland; 3 § 20 000 € threshold; 3 a § for an EU-established seller only if
//   EU turnover "enintään 100 000 euroa". Vero, ulkomaisen yrityksen arvonlisäverotus (7.1.2026):
//   registration needed with a fixed establishment or when reverse charge cannot apply, e.g. buyer
//   is a private person. Guide 48697: invoice "käännetty verovelvollisuus", "Laskuun ei merkitä
//   arvonlisäveron määrää tai verokantaa"; example 13 (A OÜ painting for a private person must
//   register); example 19 (A OÜ construction service to B Oy, buyer liable under AVL 9 §);
//   "Edustaja vaaditaan kaikilta ulkomaalaisilta, jotka eivät ole sijoittautuneet toiseen EU-maahan
//   tai Norjaan." Guide 48658 (valid 1.1.2025) 5.4.1: EU SME scheme, registration first in the
//   home state and prior notification naming Finland.
// - Tax treaty FI–EE, SopS 96/1993: art. 5(1) fixed place of business; 5(3) construction site PE
//   "vain, jos toiminta kestää yli kuuden kuukauden ajan"; 15(2) the three 183-day conditions.
//   Vero, ulkomaisen yrityksen tuloverotus Suomessa (14.4.2026): "yli 6 kuukautta", temporary
//   interruptions count; return "6U" "neljän kuukauden kuluessa tilikauden päättymiskuukauden
//   lopusta lukien"; without a PE construction companies file "lomakkeella 80" annually. Guide
//   47806: "yleisen yhteisöverokannan mukaan (20 %)".
// - Vero, ulkomaisen yrityksen työnantajavelvollisuudet (29.10.2024): no PE → no need to join the
//   työnantajarekisteri; without home-state insurance the employer takes out TyEL "noin 20 %
//   palkasta"; no withholding if the worker stays over 6 months (no PE) — the worker pays
//   ennakkovero.
// - A1: Sotsiaalkindlustusamet (5.6.2023) "ajutiselt (kuni 2 aastaks)", A1 for every posted worker;
//   ETK (27.5.2026) "korkeintaan 2 vuodeksi", contributions paid to the issuing country.
// - Työsuojelu: notification "ennen työnteon aloittamista Suomessa" (18.11.2024), "Rakennusalalla
//   ilmoitus tehdään aina"; representative = "osoitetta Suomessa", not needed "enintään kymmeneksi
//   päiväksi" (10.2.2026); foreign company "täytyy järjestää lähetetyille työntekijöilleen
//   työterveyshuolto Suomessa".
// - Construction: guide 48791 veronumero on the photo ID card and in the public register before
//   starting work; rakentamisilmoitukset (1.7.2026) contracts "yli 15 000 euroa ilman
//   arvonlisäveroa", deadline "kohdekuukautta toisena seuraavan kuukauden 5. päivänä".
// - Tulorekisteri: foreign employer without PE reports if the worker "on vakuutettu Suomessa tai
//   ... oleskelee Suomessa yli 6 kuukautta" (17.8.2021); "5 päivän kuluessa maksupäivästä"
//   (30.9.2026).
// - EMTA tax rates 2024–2026: "Corporate income tax is 22/78"; 14/86 abolished from 1.1.2025.
// Added after the independent review (verbatim, same day): treaty art. 5(2) lists office, factory,
//   workshop and 5(4) excludes storage; AVL 9 § has no VAT-registration condition on the buyer;
//   VAT PE for construction "yli yhdeksän kuukautta", "jo toiminnan alkaessa" (vatFi), then AVL
//   8 c § (buyer liable only if it sells construction services more than occasionally); ETL 5 §
//   exemption needs a provider under palvelulaki 1166/2009 (excludes transport, labour hire);
//   PRH branch documents "suomen- tai ruotsinkielinen käännös"; 6U + "liitelomake 80" when no
//   PE is claimed; urakkatiedot are filed by the "Rakennustyön tilaaja"; A1 needs an employer that
//   "tavallisesti toimii kotimaassaan" and no replacement of another posted worker; without A1
//   also tapaturma-, työttömyys-, ryhmähenkivakuutus (employerFi); 10-day count includes the
//   previous four months (tyosuojelu); EU SME limit in both years and Finnish sales ≤ 20 000 €
//   (48658); with a PE the company "rinnastetaan suomalaiseen työnantajaan" (47780); leased
//   workers are a third Incomes Register case.
const VERO = 'https://www.vero.fi';
const FOREIGN = `${VERO}/yritykset-ja-yhteisot/yritystoiminta/ulkomainen-yritys-suomessa`;
const FOREIGN_EN = `${VERO}/en/businesses-and-corporations/business-operations/foreign-business-in-finland`;

const SRC = {
  krl: 'https://www.finlex.fi/fi/lainsaadanto/2023/564',
  etl: 'https://www.finlex.fi/fi/lainsaadanto/2023/565',
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
  treaty: 'https://www.finlex.fi/en/treaties/finnish-treaty-series/1993/96',
  prhBranch: 'https://www.prh.fi/fi/yrityksetjayhteisot/yrityksenperustaminen/sivuliikkeen-perustamisilmoitus.html',
  startFi: `${FOREIGN}/yritystoiminnan-aloittaminen-suomessa/`,
  startEn: `${FOREIGN_EN}/`,
  vatFi: `${FOREIGN}/ulkomaisen-yrityksen-arvonlisaverotus-suomessa/`,
  vatSme: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48658/arvonlisaveroton-vahainen-toiminta/`,
  incomeTaxFi: `${FOREIGN}/ulkomaisen-yrityksen-tuloverotus-suomessa/`,
  employerFi: `${FOREIGN}/tyonantajavelvollisuudet/`,
  constructionFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/rakentamisilmoitukset/urakkatiedot/`,
  postingFi: 'https://tyosuojelu.fi/tyosuhde/lahetetty-tyontekija/ilmoitusvelvollisuus',
  etk: 'https://www.etk.fi/kansainvaliset-asiat/tyoskentely-suomessa/tyontekija-suomeen/',
  ska: 'https://sotsiaalkindlustusamet.ee/spetsialistile-ja-koostoopartnerile/tooandjale/tootajate-lahetamine-teise-euroopa-liidu',
  emta: 'https://www.emta.ee/en/private-client/taxes-and-payment/declaration-income/tax-rates',
};

export const virolainenOuSuomessa: Guide = {
  slug: 'virolainen-ou-suomessa',
  datePublished: '2026-10-06',
  dateModified: '2026-10-06',
  content: {
    fi: {
      title: 'Virolainen OÜ Suomessa: rekisteröinti, ALV, kiinteä toimipaikka ja työntekijät (2026)',
      description:
        'Virolainen OÜ Suomessa: Y-tunnus ja sivuliike, ALV ja käännetty verovelvollisuus, kiinteä toimipaikka, A1-todistus ja lähetetyt työntekijät.',
      lead: 'Moni virolainen osakeyhtiö (OÜ) tekee töitä Suomessa, erityisesti rakennusalalla. Viron yhtiö ei vapauta suomalaisista velvoitteista: Suomessa voi syntyä rekisteröinti-, arvonlisävero-, tulovero- ja työnantajavelvoitteita. Kokosimme, mitä virolaisen OÜ:n kannattaa selvittää ennen kuin työt Suomessa alkavat.',
      body: [
        { t: 'h2', x: 'Y-tunnus ja rekisteröinti Suomessa' },
        { t: 'p', x: 'Ulkomainen yhtiö saa suomalaisen Y-tunnuksen tekemällä perustamisilmoituksen: yhtiöltä lomake Y1 ja liitelomake 6204. Mukaan tarvitaan kotimaan kaupparekisteriote käännöksineen suomeksi, ruotsiksi tai englanniksi. Rekisteröinti Verohallinnon rekistereihin kestää noin 3 viikkoa, joten ilmoitus kannattaa tehdä hyvissä ajoin ennen töiden alkua.' },
        { t: 'p', x: 'Ennakkoperintärekisteriin kuuluminen ei ole pakollista, mutta käytännössä tärkeää: jos yhtiö ei ole rekisterissä, suomalainen maksaja toimittaa työkorvauksesta ennakonpidätyksen tai lähdeveron. Pelkkä rekisteröityminen ei vielä tee yhtiöstä Suomessa tuloverovelvollista.' },
        { t: 'h3', x: 'Milloin tarvitaan sivuliike?' },
        { t: 'p', x: 'Sivuliike on ulkomaisen yhtiön osa, joka harjoittaa Suomessa täältä käsin ammattimaisesti liiketoimintaa yhtiön nimissä ja lukuun. Sivuliikkeestä tehdään perustamisilmoitus kaupparekisteriin ennen toiminnan aloittamista. Virolainen yhtiö ei tarvitse toimilupaa, koska se on perustettu ETA-valtiossa. Jos ETA-yhtiö tarjoaa Suomessa palvelua vain tilapäisesti, kaupparekisteri-ilmoitusta ei tarvita. Poikkeus koskee vain palvelulain piiriin kuuluvia palveluja, ei esimerkiksi kuljetuspalveluja tai työvoiman vuokrausta.' },
        { t: 'ul', items: [
          'Sivuliikkeen nimessä on oltava ulkomaisen yhtiön nimi, esimerkiksi "Esimerkki OÜ, Suomen sivuliike".',
          'Sivuliikkeellä on oltava edustaja, jonka asuinpaikka on Euroopan talousalueella.',
          'Perustamisilmoitus maksaa PRH:ssa 400 €, ja ulkomaisista asiakirjoista tarvitaan PRH:lle suomen- tai ruotsinkielinen käännös.',
          'Ulkomaisen yhtiön tilinpäätös on ilmoitettava kaupparekisteriin kuuden kuukauden kuluessa tilikauden päättymisestä.',
        ] },
        { t: 'h2', x: 'Arvonlisävero: käännetty verovelvollisuus vai oma ALV-rekisteröinti' },
        { t: 'p', x: 'Jos virolaisella yhtiöllä ei ole Suomessa kiinteää toimipaikkaa ja se myy palveluja tai tavaroita suomalaiselle yritykselle tai yhteisölle, veron maksaa ostaja – myös silloin, kun ostaja ei itse ole ALV-rekisterissä (käännetty verovelvollisuus, AVL 9 §). Laskuun merkitään "käännetty verovelvollisuus", eikä siihen merkitä veron määrää tai verokantaa. Sama koskee rakentamispalvelun myyntiä suomalaiselle yhtiölle.' },
        { t: 'p', x: 'Huomaa, että arvonlisäverotuksessa kiinteän toimipaikan raja on eri kuin tuloverotuksessa: rakennus- tai asennustyömaa on kiinteä toimipaikka, jos urakat kestävät yli yhdeksän kuukautta, ja silloin jo toiminnan alusta lähtien. Tällöin edellä kuvattu ostajan verovelvollisuus ei enää sovellu, vaan yhtiö rekisteröityy Suomessa. Rakentamispalvelujen myynnissä veron maksaa silloin ostaja vain, jos ostaja myy itsekin rakentamispalveluja muuten kuin satunnaisesti.' },
        { t: 'p', x: 'Yhtiön on rekisteröidyttävä Suomessa arvonlisäverovelvolliseksi, jos sillä on Suomessa kiinteä toimipaikka tai jos käännettyä verovelvollisuutta ei voi soveltaa. Tyypillinen tilanne on myynti kuluttajalle: kun virolainen OÜ maalaa yksityishenkilön asunnon Suomessa, sen on ilmoittauduttava ALV-velvolliseksi Suomessa ja perittävä Suomen vero. Yleinen verokanta on 25,5 %.' },
        { t: 'note', x: 'Suomen 20 000 euron vähäisen toiminnan raja ei koske virolaista yhtiötä automaattisesti. Sitä voi hyödyntää vain EU:n pienyritysjärjestelmän kautta: yhtiön koko EU-liikevaihto saa olla enintään 100 000 € sekä kuluvana että edellisenä vuonna ja Suomen myynti enintään 20 000 €, ja yhtiö rekisteröityy ensin Virossa ja ilmoittaa Suomen maaksi, jossa se myy verottomasti. Virolainen yhtiö ei tarvitse Suomessa ALV-edustajaa.' },
        { t: 'h2', x: 'Kiinteä toimipaikka ja tulovero' },
        { t: 'p', x: 'Suomen ja Viron verosopimuksen mukaan kiinteä toimipaikka on kiinteä liikepaikka, josta yrityksen toimintaa harjoitetaan, esimerkiksi toimisto tai työpaja. Rakennus-, kokoonpano- tai asennustyömaa muodostaa kiinteän toimipaikan vain, jos toiminta kestää yli kuusi kuukautta. Tilapäiset tauot lasketaan yleensä mukaan, ja kaupallisesti ja maantieteellisesti yhtenäiset urakat voidaan laskea yhteen.' },
        { t: 'ul', items: [
          'Kiinteän toimipaikan tulosta maksetaan Suomeen yhteisöveroa 20 %.',
          'Ulkomainen yhtiö antaa veroilmoituksen 6U sähköisesti neljän kuukauden kuluessa tilikauden päättymiskuukauden lopusta.',
          'Jos kiinteää toimipaikkaa ei yhtiön oman arvion mukaan synny, se ilmoittaa tämän 6U-ilmoituksella ja liittää siihen lomakkeen 80 (selvitys toiminnasta). Rakennus-, asennus- ja kokoonpanotyötä Suomessa tekevä yhtiö antaa tämän selvityksen toiminnastaan ja urakoistaan vuosittain.',
          'Verohallinto ratkaisee kiinteän toimipaikan olemassaolon vasta ensimmäisen vuoden verotuspäätöksen yhteydessä. Ennen sitä tilanne kannattaa arvioida itse.',
        ] },
        { t: 'h2', x: 'Työntekijät Suomessa: A1, ilmoitukset ja verot' },
        { t: 'p', x: 'Kun virolainen OÜ lähettää työntekijän tilapäisesti Suomeen, Viron sosiaalivakuutusvirasto (Sotsiaalkindlustusamet) myöntää A1-todistuksen enintään 2 vuodeksi. A1 osoittaa, että työntekijä kuuluu Viron sosiaaliturvaan, ja sosiaalivakuutusmaksut maksetaan Viroon. A1 haetaan jokaiselle lähetettävälle työntekijälle. Edellytyksenä on, että työnantaja toimii tavallisesti Virossa eikä työntekijää lähetetä korvaamaan toista työntekijää; yhtiö, joka toimii käytännössä vain Suomessa, ei voi tukeutua A1:een. Jos työntekijä ei ole vakuutettu Virossa, työnantajan on otettava hänelle suomalainen TyEL-eläkevakuutus, jonka maksu on noin 20 % palkasta, ja lisäksi voidaan tarvita tapaturma-, työttömyys- ja ryhmähenkivakuutus.' },
        { t: 'ul', items: [
          'Työntekijöiden lähettämisestä ilmoitetaan työsuojeluviranomaiselle ennen kuin työ Suomessa alkaa. Rakennusalalla ilmoitus tehdään aina.',
          'Yhtiöllä on oltava Suomessa edustaja, käytännössä osoite Suomessa. Edustajaa ei tarvita, jos lähetys kestää enintään kymmenen päivää; aikaan lasketaan mukaan myös edeltävän neljän kuukauden lähetykset.',
          'Rakennustyömaalla jokaisella on oltava veronumero kuvallisessa tunnistekortissa, ja numeron on oltava julkisessa veronumerorekisterissä ennen kuin työt alkavat.',
          'Rakentamisilmoitukset: rakennustyön tilaaja ilmoittaa Verohallinnolle yli 15 000 euron (alv 0 %) urakat kohdekuukautta toisena seuraavan kuukauden 5. päivään mennessä. OÜ ilmoittaa itse, jos se ostaa aliurakoita, ja toimittaa työntekijätietonsa päätoteuttajalle.',
          'Lähetetyille työntekijöille on järjestettävä työterveyshuolto Suomessa. Suomalainen tilaaja pyytää tilaajavastuulain mukaisia selvityksiä, lähetetyistä työntekijöistä esimerkiksi A1-todistukset.',
        ] },
        { t: 'p', x: 'Palkan verotus riippuu ns. 183 päivän säännöstä. Suomi jättää palkan verottamatta vain, jos kaikki kolme ehtoa täyttyvät: työntekijä oleskelee Suomessa enintään 183 päivää 12 kuukauden aikana, palkan maksaa työnantaja, joka ei asu Suomessa, eikä palkka rasita työnantajan kiinteää toimipaikkaa Suomessa. Jos OÜ:lle syntyy Suomeen kiinteä toimipaikka, sen kautta tehdyn työn palkka verotetaan Suomessa alusta alkaen, ja yhtiö rinnastetaan suomalaiseen työnantajaan: se toimittaa palkoista ennakonpidätyksen. Rakennustyömaalla tämä varmistuu vasta kuuden kuukauden jälkeen, mutta koskee aikaa alusta asti. Ilman kiinteää toimipaikkaa palkat ilmoitetaan tulorekisteriin, jos työntekijä on vakuutettu Suomessa, oleskelee täällä yli 6 kuukautta tai on vuokratyöntekijä, jonka palkkaa Suomi voi verottaa. Ilmoitus annetaan 5 päivän kuluessa maksupäivästä.' },
        { t: 'h2', x: 'Entä Viron verotus?' },
        { t: 'p', x: 'Virossa yhtiö maksaa tuloveroa vasta, kun se jakaa voittoa. Vuosina 2025–2026 jaetun voiton veroprosentti on 22/78. Suomessa verotettu kiinteän toimipaikan tulos ja Viron verotus on sovitettava yhteen verosopimuksen mukaan, joten kirjanpidossa Suomen toiminta kannattaa pitää alusta asti erillään.' },
        { t: 'h2', x: 'Apua virolaisen yhtiön asioihin Suomessa' },
        { t: 'p', x: 'Autamme arvioimaan, mitä Suomen velvoitteita yhtiöllesi syntyy, ja hoidamme rekisteröinnit, ALV-ilmoitukset, tulorekisteri-ilmoitukset ja Suomen kirjanpidon. Palvelemme suomeksi ja venäjäksi.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: yritystoiminnan aloittaminen Suomessa – ulkomainen yritys', href: SRC.startFi },
          { label: 'Verohallinto: ulkomaisen yrityksen arvonlisäverotus Suomessa', href: SRC.vatFi },
          { label: 'Verohallinto: arvonlisäveroton vähäinen toiminta', href: SRC.vatSme },
          { label: 'Verohallinto: ulkomaisen yrityksen tuloverotus Suomessa', href: SRC.incomeTaxFi },
          { label: 'Verohallinto: ulkomaisen yrityksen työnantajavelvollisuudet', href: SRC.employerFi },
          { label: 'Verohallinto: rakentamisilmoitukset – urakkatiedot', href: SRC.constructionFi },
          { label: 'PRH: sivuliikkeen perustamisilmoitus', href: SRC.prhBranch },
          { label: 'Finlex: kaupparekisterilaki (564/2023)', href: SRC.krl },
          { label: 'Finlex: elinkeinotoimintalaki (565/2023)', href: SRC.etl },
          { label: 'Finlex: arvonlisäverolaki (1501/1993)', href: SRC.avl },
          { label: 'Finlex: Suomen ja Viron verosopimus (SopS 96/1993)', href: SRC.treaty },
          { label: 'Työsuojelu: lähetettyjen työntekijöiden ilmoitusvelvollisuus', href: SRC.postingFi },
          { label: 'Eläketurvakeskus: työntekijä Suomeen', href: SRC.etk },
          { label: 'Sotsiaalkindlustusamet: työntekijöiden lähettäminen ja A1 (viroksi)', href: SRC.ska },
          { label: 'EMTA: Viron verokannat (englanniksi)', href: SRC.emta },
        ] },
      ],
      faq: [
        { q: 'Tarvitseeko virolainen OÜ Suomeen Y-tunnuksen?', a: 'Kyllä, kun se aloittaa liiketoiminnan Suomessa: Y-tunnus saadaan perustamisilmoituksella (Y1 ja liite 6204). Sivuliike rekisteröidään kaupparekisteriin vain, jos yhtiö harjoittaa liiketoimintaa Suomesta käsin. Tilapäinen palvelu ei yleensä vaadi kaupparekisteri-ilmoitusta (ei koske esimerkiksi kuljetusta eikä työvoiman vuokrausta).' },
        { q: 'Laskuttaako virolainen OÜ suomalaista yritystä Suomen ALV:lla?', a: 'Ei yleensä. Jos yhtiöllä ei ole Suomessa kiinteää toimipaikkaa ja ostaja on suomalainen yritys tai yhteisö, ostaja maksaa veron. Laskuun merkitään "käännetty verovelvollisuus" ilman veron määrää.' },
        { q: 'Kuinka pitkä työmaa muodostaa kiinteän toimipaikan?', a: 'Suomen ja Viron verosopimuksen mukaan rakennus-, kokoonpano- tai asennustyömaa muodostaa kiinteän toimipaikan, jos toiminta kestää yli kuusi kuukautta. Tilapäiset tauot lasketaan yleensä mukaan.' },
        { q: 'Kuinka pitkäksi aikaa A1-todistus myönnetään?', a: 'Lähetetylle työntekijälle enintään 2 vuodeksi. Todistuksen myöntää Viron Sotsiaalkindlustusamet, ja sen ajan työntekijä kuuluu Viron sosiaaliturvaan.' },
        { q: 'Tarvitseeko virolainen yhtiö Suomessa edustajan?', a: 'ALV-edustajaa ei tarvita, koska yhtiö on sijoittautunut EU:hun. Työntekijöitä lähettävällä yhtiöllä on kuitenkin oltava edustaja Suomessa, ellei lähetys kestä enintään kymmentä päivää, ja sivuliikkeellä on oltava ETA:ssa asuva edustaja.' },
      ],
    },
    ru: {
      title: 'Эстонская OÜ в Финляндии: регистрация, ALV, постоянное представительство и работники (2026)',
      description:
        'Эстонская OÜ в Финляндии: Y-tunnus и филиал, ALV и обратное начисление, постоянное представительство, справка A1 и командированные работники.',
      lead: 'Многие эстонские компании (OÜ) работают в Финляндии, особенно в строительстве. Эстонская регистрация не освобождает от финских обязательств: в Финляндии могут возникнуть требования по регистрации, НДС (ALV), налогу на прибыль и обязанностям работодателя. Собрали, что эстонской OÜ стоит выяснить до начала работ в Финляндии.',
      body: [
        { t: 'h2', x: 'Y-tunnus и регистрация в Финляндии' },
        { t: 'p', x: 'Иностранная компания получает финский идентификатор Y-tunnus, подав учредительное уведомление (perustamisilmoitus): для компании это форма Y1 и приложение 6204. Нужна выписка из торгового реестра своей страны с переводом на финский, шведский или английский. Регистрация в реестрах налоговой (Verohallinto) занимает около 3 недель, поэтому подавать уведомление лучше заранее.' },
        { t: 'p', x: 'Регистрация в реестре предоплаты налогов (ennakkoperintärekisteri) не обязательна, но на практике важна: если компании в нём нет, финский заказчик удерживает с оплаты работ аванс налога или налог у источника. Сама регистрация ещё не делает компанию плательщиком налога на прибыль в Финляндии.' },
        { t: 'h3', x: 'Когда нужен филиал (sivuliike)?' },
        { t: 'p', x: 'Филиал — это часть иностранной компании, которая профессионально ведёт бизнес в Финляндии отсюда же, от имени и за счёт компании. Филиал регистрируют в торговом реестре (kaupparekisteri) до начала деятельности. Разрешение эстонской компании не нужно: она основана в стране ЕЭЗ. Если компания из ЕЭЗ оказывает услуги в Финляндии лишь временно, уведомлять торговый реестр не требуется. Исключение касается только услуг, на которые распространяется закон об услугах (palvelulaki), — например, не транспорта и не сдачи персонала в аренду (лизинга работников).' },
        { t: 'ul', items: [
          'В названии филиала должно быть название иностранной компании, например «Esimerkki OÜ, Suomen sivuliike».',
          'У филиала должен быть представитель, проживающий в Европейской экономической зоне.',
          'Регистрация филиала в PRH стоит 400 €; для PRH иностранные документы переводят на финский или шведский.',
          'Годовой отчёт иностранной компании подают в торговый реестр в течение шести месяцев после окончания финансового года.',
        ] },
        { t: 'h2', x: 'НДС: обратное начисление или своя регистрация в ALV' },
        { t: 'p', x: 'Если у эстонской компании нет постоянного представительства в Финляндии и она продаёт услуги или товары финской компании или организации, налог платит покупатель — даже если сам покупатель не зарегистрирован плательщиком НДС (обратное начисление — käännetty verovelvollisuus, § 9 закона об НДС). В счёте пишут «käännetty verovelvollisuus» и не указывают ни сумму, ни ставку налога. Так же и при продаже строительных услуг финской компании.' },
        { t: 'p', x: 'Учтите: для НДС порог постоянного представительства другой, чем для налога на прибыль. Строительная или монтажная площадка считается постоянным представительством, если подряды длятся больше девяти месяцев, — и тогда с самого начала работ. В этом случае описанное выше обратное начисление уже не применяется, и компания регистрируется в Финляндии. При продаже строительных услуг налог тогда платит покупатель, только если он и сам продаёт строительные услуги не от случая к случаю.' },
        { t: 'p', x: 'Зарегистрироваться плательщиком НДС в Финляндии нужно, если в Финляндии есть постоянное представительство или если обратное начисление применить нельзя. Типичный случай — продажа частному лицу: если эстонская OÜ красит квартиру частного клиента в Финляндии, она должна встать на учёт по НДС в Финляндии и начислять финский налог. Общая ставка — 25,5 %.' },
        { t: 'note', x: 'Финский порог освобождения от НДС в 20 000 € не распространяется на эстонскую компанию автоматически. Им можно воспользоваться только через схему ЕС для малого бизнеса: общий оборот компании в ЕС — не больше 100 000 € и в текущем, и в прошлом году, продажи в Финляндии — не больше 20 000 €, сначала регистрация в Эстонии, затем уведомление о том, что Финляндия — страна освобождённых продаж. Налоговый представитель по НДС в Финляндии эстонской компании не нужен.' },
        { t: 'h2', x: 'Постоянное представительство и налог на прибыль' },
        { t: 'p', x: 'По соглашению Финляндии и Эстонии об избежании двойного налогообложения постоянное представительство (kiinteä toimipaikka) — это постоянное место деятельности, например офис или мастерская. Строительная, монтажная или сборочная площадка становится постоянным представительством, только если работы длятся больше шести месяцев. Временные перерывы обычно засчитываются, а коммерчески и географически связанные подряды могут суммироваться.' },
        { t: 'ul', items: [
          'С прибыли постоянного представительства в Финляндии платят налог на прибыль организаций — 20 %.',
          'Иностранная компания подаёт декларацию 6U электронно в течение четырёх месяцев с конца месяца, в котором закончился финансовый год.',
          'Если, по оценке самой компании, постоянного представительства нет, она указывает это в декларации 6U и прикладывает к ней форму 80 (отчёт о деятельности). Компания, которая ведёт в Финляндии строительные, монтажные или сборочные работы, подаёт такой отчёт о деятельности и подрядах ежегодно.',
          'Есть ли постоянное представительство, налоговая решает только при налогообложении за первый год. До этого ситуацию стоит оценить самим.',
        ] },
        { t: 'h2', x: 'Работники в Финляндии: A1, уведомления и налоги' },
        { t: 'p', x: 'Если эстонская OÜ временно командирует работника в Финляндию, Департамент социального страхования Эстонии (Sotsiaalkindlustusamet) выдаёт справку A1 максимум на 2 года. A1 подтверждает, что работник остаётся в эстонской системе социального страхования, и взносы платятся в Эстонию. Справку оформляют на каждого командируемого. Условие — работодатель обычно ведёт деятельность в Эстонии, а работника не направляют на замену другому работнику; компания, которая фактически работает только в Финляндии, на A1 опираться не может. Если работник не застрахован в Эстонии, работодатель должен оформить ему финское пенсионное страхование TyEL — это около 20 % от зарплаты, а также может понадобиться страхование от несчастных случаев, от безработицы и групповое страхование жизни.' },
        { t: 'ul', items: [
          'О командировании работников уведомляют финскую инспекцию охраны труда (työsuojeluviranomainen) до начала работы в Финляндии. В строительстве уведомление нужно всегда.',
          'У компании должен быть представитель в Финляндии — по сути, адрес в Финляндии. Он не нужен, если командировка длится не больше десяти дней; в этот срок засчитываются и командировки за предыдущие четыре месяца.',
          'На стройплощадке у каждого должен быть налоговый номер (veronumero) на карточке с фото, и номер должен быть внесён в публичный реестр до начала работ.',
          'Строительные отчёты (rakentamisilmoitukset): заказчик строительных работ сообщает в налоговую о подрядах свыше 15 000 € без НДС до 5-го числа второго месяца после отчётного. OÜ подаёт такие отчёты сама, если покупает субподряд, а данные о своих работниках передаёт генподрядчику (päätoteuttaja).',
          'Для командированных работников нужно организовать производственное здравоохранение (työterveyshuolto) в Финляндии. Финский заказчик запрашивает документы по закону об ответственности заказчика (tilaajavastuulaki), для командированных — например, справки A1.',
        ] },
        { t: 'p', x: 'Налог с зарплаты зависит от правила 183 дней. Финляндия не облагает зарплату, только если выполнены все три условия: работник находится в Финляндии не больше 183 дней за 12 месяцев, зарплату платит работодатель, не являющийся резидентом Финляндии, и зарплата не относится на расходы постоянного представительства работодателя в Финляндии. Если у OÜ возникло постоянное представительство, зарплата за работу через него облагается в Финляндии с первого дня, а компания приравнивается к финскому работодателю и удерживает из зарплаты аванс налога (ennakonpidätys). На стройке это становится ясно лишь через шесть месяцев, но действует с самого начала. Без представительства зарплаты подают в реестр доходов (Tulorekisteri), если работник застрахован в Финляндии, находится здесь больше 6 месяцев или работает по лизингу персонала и его зарплату может облагать Финляндия. Срок — 5 дней с даты выплаты.' },
        { t: 'h2', x: 'А как же налоги в Эстонии?' },
        { t: 'p', x: 'В Эстонии компания платит налог на прибыль, только когда распределяет прибыль. В 2025–2026 годах ставка на распределённую прибыль — 22/78. Прибыль постоянного представительства, облагаемую в Финляндии, и эстонские налоги нужно согласовать по соглашению об избежании двойного налогообложения, поэтому финскую деятельность лучше с самого начала учитывать отдельно.' },
        { t: 'h2', x: 'Поможем с делами эстонской компании в Финляндии' },
        { t: 'p', x: 'Поможем понять, какие обязательства возникают у вашей компании в Финляндии, и возьмём на себя регистрацию, декларации по НДС, отчёты в Tulorekisteri и финскую бухгалтерию. Наши бухгалтеры обслуживают на финском или русском языке.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: начало деятельности иностранной компании в Финляндии (по-фински)', href: SRC.startFi },
          { label: 'Vero: НДС иностранной компании в Финляндии (по-фински)', href: SRC.vatFi },
          { label: 'Vero: освобождение от НДС при малом обороте (по-фински)', href: SRC.vatSme },
          { label: 'Vero: налог на прибыль иностранной компании (по-фински)', href: SRC.incomeTaxFi },
          { label: 'Vero: обязанности иностранного работодателя (по-фински)', href: SRC.employerFi },
          { label: 'Vero: строительные отчёты — подряды (по-фински)', href: SRC.constructionFi },
          { label: 'PRH: регистрация филиала (по-фински)', href: SRC.prhBranch },
          { label: 'Finlex: соглашение Финляндии и Эстонии об избежании двойного налогообложения', href: SRC.treaty },
          { label: 'Finlex: закон об НДС — arvonlisäverolaki (по-фински)', href: SRC.avl },
          { label: 'Työsuojelu: уведомление о командированных работниках (по-фински)', href: SRC.postingFi },
          { label: 'Sotsiaalkindlustusamet: командирование работников и A1 (по-эстонски)', href: SRC.ska },
          { label: 'EMTA: налоговые ставки Эстонии (по-английски)', href: SRC.emta },
        ] },
      ],
      faq: [
        { q: 'Нужен ли эстонской OÜ финский Y-tunnus?', a: 'Да, когда компания начинает деятельность в Финляндии: Y-tunnus получают по учредительному уведомлению (Y1 и приложение 6204). Филиал в торговом реестре регистрируют, только если компания ведёт бизнес из Финляндии. Для временных услуг уведомлять торговый реестр обычно не нужно (кроме, например, транспорта и лизинга работников).' },
        { q: 'Выставляет ли эстонская OÜ финской компании счёт с финским НДС?', a: 'Обычно нет. Если у компании нет постоянного представительства в Финляндии, а покупатель — финская компания или организация, налог платит покупатель. В счёте пишут «käännetty verovelvollisuus» без суммы налога.' },
        { q: 'Сколько должна длиться стройка, чтобы возникло постоянное представительство?', a: 'По соглашению Финляндии и Эстонии строительная, сборочная или монтажная площадка становится постоянным представительством, если работы длятся больше шести месяцев. Временные перерывы обычно засчитываются.' },
        { q: 'На какой срок выдают справку A1?', a: 'Командированному работнику — максимум на 2 года. Справку выдаёт эстонский Sotsiaalkindlustusamet, и на это время работник остаётся в эстонской системе социального страхования.' },
        { q: 'Нужен ли эстонской компании представитель в Финляндии?', a: 'Налоговый представитель по НДС не нужен: компания зарегистрирована в ЕС. Но у компании, командирующей работников, должен быть представитель в Финляндии, если командировка длится больше десяти дней, а у филиала — представитель, проживающий в ЕЭЗ.' },
      ],
    },
    en: {
      title: 'Estonian OÜ in Finland: registration, VAT, permanent establishment and employees (2026)',
      description:
        'An Estonian OÜ working in Finland: business ID and branch, VAT and reverse charge, permanent establishment, the A1 certificate and posted workers.',
      lead: 'Many Estonian private limited companies (OÜ) work in Finland, especially in construction. Being an Estonian company does not exempt you from Finnish obligations: registration, VAT, income tax and employer duties can all arise in Finland. Here is what an Estonian OÜ should check before work in Finland begins.',
      body: [
        { t: 'h2', x: 'Business ID and registration in Finland' },
        { t: 'p', x: 'A foreign company gets a Finnish Business ID (Y-tunnus) by filing a start-up notification: form Y1 with appendix form 6204 for a company. You also need an extract from your home country’s trade register, translated into Finnish, Swedish or English. Registration in the Tax Administration’s registers takes about 3 weeks, so file well before work starts.' },
        { t: 'p', x: 'Joining the prepayment register (ennakkoperintärekisteri) is not mandatory, but it matters in practice: if the company is not registered, the Finnish payer withholds tax from payments for work. Registration alone does not make the company liable to income tax in Finland.' },
        { t: 'h3', x: 'When do you need a branch?' },
        { t: 'p', x: 'A branch (sivuliike) is the part of a foreign company that professionally carries on business in Finland from Finland, in the company’s name and for its account. A branch must be notified to the Trade Register before it starts operating. An Estonian company needs no permit, because it is established in an EEA country. An EEA company that provides services in Finland only temporarily does not need to notify the Trade Register. The exemption covers only services within the Finnish Services Act — not, for example, transport services or the hiring-out of workers.' },
        { t: 'ul', items: [
          'The branch name must contain the foreign company’s name, e.g. "Esimerkki OÜ, Suomen sivuliike".',
          'The branch must have a representative resident in the European Economic Area.',
          'The branch notification costs €400 at the Finnish Patent and Registration Office (PRH), and PRH needs foreign documents translated into Finnish or Swedish.',
          'The foreign company’s financial statements must be filed with the Trade Register within six months of the end of the financial year.',
        ] },
        { t: 'h2', x: 'VAT: reverse charge or your own Finnish VAT registration' },
        { t: 'p', x: 'If the Estonian company has no fixed establishment in Finland and sells services or goods to a Finnish business or organisation, the buyer pays the VAT — even if the buyer itself is not VAT-registered (reverse charge, section 9 of the Finnish VAT Act). The invoice says "käännetty verovelvollisuus" (reverse charge) and shows no VAT amount or rate. The same applies to construction services sold to a Finnish company.' },
        { t: 'p', x: 'Note that for VAT the fixed-establishment threshold differs from income tax: a building or installation site is a fixed establishment if the contracts last more than nine months — and then from the start of the work. In that case the buyer-liability rule above no longer applies and the company registers in Finland. For construction services the buyer then pays the VAT only if it also sells construction services more than occasionally.' },
        { t: 'p', x: 'The company must register for VAT in Finland if it has a fixed establishment there or if reverse charge cannot be applied. The typical case is selling to consumers: if an Estonian OÜ paints a private person’s flat in Finland, it must register for VAT in Finland and charge Finnish VAT. The standard rate is 25.5%.' },
        { t: 'note', x: 'The Finnish €20,000 small-business VAT threshold does not apply to an Estonian company automatically. It is available only through the EU SME scheme: the company’s total EU turnover may not exceed €100,000 in either the current or the previous year, its Finnish sales may not exceed €20,000, and it registers first in Estonia and notifies Finland as a country where it makes exempt sales. An Estonian company does not need a VAT representative in Finland.' },
        { t: 'h2', x: 'Permanent establishment and income tax' },
        { t: 'p', x: 'Under the Finland–Estonia tax treaty, a permanent establishment is a fixed place of business through which the company operates, such as an office or a workshop. A building, assembly or installation site is a permanent establishment only if the work lasts more than six months. Temporary breaks usually count towards the time, and contracts that form a commercial and geographical whole can be added together.' },
        { t: 'ul', items: [
          'Profit of the permanent establishment is taxed in Finland at the corporate rate of 20%.',
          'The foreign company files the tax return 6U electronically within four months of the end of the month in which the financial year ended.',
          'If, in the company’s own view, no permanent establishment arises, it states this on the 6U return and attaches form 80 (report on activities). A company doing construction, installation or assembly work in Finland files this report on its activities and contracts every year.',
          'The Tax Administration decides whether a permanent establishment exists only when it assesses the first year. Until then, assess the situation yourself.',
        ] },
        { t: 'h2', x: 'Employees in Finland: A1, notifications and tax' },
        { t: 'p', x: 'When an Estonian OÜ temporarily posts an employee to Finland, the Estonian Social Insurance Board (Sotsiaalkindlustusamet) issues an A1 certificate for up to 2 years. A1 shows that the employee stays covered by Estonian social security, and contributions are paid to Estonia. A1 is applied for each posted employee. The employer must normally operate in Estonia, and the employee must not be sent to replace another worker; a company that in practice works only in Finland cannot rely on A1. If the employee is not insured in Estonia, the employer must take out a Finnish TyEL pension insurance for them, which costs about 20% of the salary, and accident, unemployment and group life insurance may also be required.' },
        { t: 'ul', items: [
          'The posting of workers is notified to the Finnish occupational safety authority before work in Finland begins. In construction, the notification is always required.',
          'The company must have a representative in Finland — in practice an address in Finland. None is needed if the posting lasts no more than ten days; postings during the previous four months are counted in.',
          'On a construction site everyone must have a tax number (veronumero) on a photo ID card, entered in the public register before work starts.',
          'Construction reports: the buyer of construction work reports contracts over €15,000 excluding VAT to the Tax Administration by the 5th day of the second month after the reporting month. The OÜ reports itself if it buys subcontracting, and passes its worker data to the principal contractor (päätoteuttaja).',
          'Occupational health care must be arranged in Finland for posted workers. The Finnish client asks for documents under the Contractor’s Obligations Act (tilaajavastuulaki), for posted workers e.g. A1 certificates.',
        ] },
        { t: 'p', x: 'Tax on wages depends on the 183-day rule. Finland does not tax the wages only if all three conditions are met: the employee stays in Finland no more than 183 days in any 12-month period, the wages are paid by an employer not resident in Finland, and the wages are not borne by the employer’s permanent establishment in Finland. If the OÜ has a permanent establishment, wages for work through it are taxable in Finland from day one, and the company is treated like a Finnish employer: it withholds tax from wages. On a construction site this becomes certain only after six months, but it applies from the start. Without a permanent establishment, wages are reported to the Incomes Register if the employee is insured in Finland, stays here more than 6 months, or is a hired-out worker whose wages Finland may tax. The deadline is 5 days from the payment date.' },
        { t: 'h2', x: 'What about Estonian tax?' },
        { t: 'p', x: 'In Estonia, the company pays income tax only when it distributes profit. In 2025–2026, the rate on distributed profit is 22/78. Profit of a Finnish permanent establishment and Estonian tax must be reconciled under the tax treaty, so keep the Finnish activity separate in the books from the very start.' },
        { t: 'h2', x: 'Help for your Estonian company in Finland' },
        { t: 'p', x: 'We help you work out which Finnish obligations your company has, and we handle registrations, VAT returns, Incomes Register reports and the Finnish bookkeeping. Our accountants serve you in Finnish or Russian.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Vero: foreign business in Finland', href: SRC.startEn },
          { label: 'Vero: VAT of a foreign company in Finland (in Finnish)', href: SRC.vatFi },
          { label: 'Vero: VAT exemption for small-scale business (in Finnish)', href: SRC.vatSme },
          { label: 'Vero: income tax of a foreign company in Finland (in Finnish)', href: SRC.incomeTaxFi },
          { label: 'Vero: employer obligations of a foreign company (in Finnish)', href: SRC.employerFi },
          { label: 'PRH: branch registration (in Finnish)', href: SRC.prhBranch },
          { label: 'Finlex: Finland–Estonia tax treaty (SopS 96/1993)', href: SRC.treaty },
          { label: 'Finlex: Value Added Tax Act 1501/1993 (in Finnish)', href: SRC.avl },
          { label: 'Työsuojelu: notification of posted workers (in Finnish)', href: SRC.postingFi },
          { label: 'Finnish Centre for Pensions: working in Finland (in Finnish)', href: SRC.etk },
          { label: 'EMTA: Estonian tax rates', href: SRC.emta },
        ] },
      ],
      faq: [
        { q: 'Does an Estonian OÜ need a Finnish Business ID?', a: 'Yes, when it starts doing business in Finland: the Business ID is obtained with a start-up notification (Y1 and appendix 6204). A branch is registered in the Trade Register only if the company carries on business from Finland. Temporary services usually need no Trade Register notification (this does not apply to e.g. transport or hiring out workers).' },
        { q: 'Does an Estonian OÜ charge Finnish VAT to a Finnish business?', a: 'Usually not. If the company has no fixed establishment in Finland and the buyer is a Finnish business or organisation, the buyer pays the VAT. The invoice says "käännetty verovelvollisuus" and shows no VAT amount.' },
        { q: 'How long must a site last to create a permanent establishment?', a: 'Under the Finland–Estonia tax treaty, a building, assembly or installation site is a permanent establishment if the work lasts more than six months. Temporary breaks usually count.' },
        { q: 'How long is an A1 certificate valid?', a: 'For a posted employee, up to 2 years. It is issued by the Estonian Sotsiaalkindlustusamet, and during that time the employee stays covered by Estonian social security.' },
        { q: 'Does an Estonian company need a representative in Finland?', a: 'Not for VAT, because the company is established in the EU. A company posting workers must, however, have a representative in Finland unless the posting lasts no more than ten days, and a branch needs a representative resident in the EEA.' },
      ],
    },
    et: {
      title: 'Eesti OÜ Soomes: registreerimine, käibemaks, püsiv tegevuskoht ja töötajad (2026)',
      description:
        'Eesti OÜ Soomes: Y-tunnus ja filiaal, käibemaks ja pöördmaksustamine, püsiv tegevuskoht, A1-tõend ja lähetatud töötajad. Mida enne tööde algust teada.',
      lead: 'Paljud Eesti osaühingud töötavad Soomes, eriti ehituses. Eesti ettevõte ei vabane Soome kohustustest: Soomes võivad tekkida registreerimis-, käibemaksu-, tulumaksu- ja tööandja kohustused. Panime kokku, mida Eesti OÜ peaks selgeks tegema enne, kui tööd Soomes algavad.',
      body: [
        { t: 'h2', x: 'Y-tunnus ja registreerimine Soomes' },
        { t: 'p', x: 'Välismaa ettevõte saab Soome ärikoodi (Y-tunnus), kui esitab asutamisteatise: äriühingul vorm Y1 ja lisavorm 6204. Vaja on koduriigi äriregistri väljavõtet koos tõlkega soome, rootsi või inglise keelde. Registreerimine Soome maksuameti (Verohallinto) registritesse võtab umbes 3 nädalat, seega tasub teatis esitada aegsasti enne tööde algust.' },
        { t: 'p', x: 'Ettemaksuregistrisse (ennakkoperintärekisteri) kuulumine ei ole kohustuslik, kuid praktikas oluline: kui ettevõte registris ei ole, peab Soome maksja tööde eest makstavast tasust maksu kinni. Ainuüksi registreerimine ei tee ettevõttest veel Soomes tulumaksukohustuslast.' },
        { t: 'h3', x: 'Millal on vaja filiaali?' },
        { t: 'p', x: 'Filiaal (sivuliike) on välismaa ettevõtte osa, mis tegeleb Soomes siitsamast kutseliselt äritegevusega ettevõtte nimel ja arvel. Filiaal tuleb kanda Soome äriregistrisse enne tegevuse alustamist. Eesti ettevõte ei vaja tegevusluba, sest see on asutatud EMP riigis. Kui EMP ettevõte osutab Soomes teenust vaid ajutiselt, ei ole äriregistrile vaja teatada. Erand kehtib ainult Soome teenuste seaduse alla kuuluvatele teenustele, mitte näiteks veoteenustele ega renditööle.' },
        { t: 'ul', items: [
          'Filiaali nimes peab olema välismaa ettevõtte nimi, näiteks "Esimerkki OÜ, Suomen sivuliike".',
          'Filiaalil peab olema esindaja, kelle elukoht on Euroopa Majanduspiirkonnas.',
          'Filiaali registreerimine maksab Soome patendi- ja registriametis (PRH) 400 €; PRH-le tuleb välisdokumendid tõlkida soome või rootsi keelde.',
          'Välismaa ettevõtte majandusaasta aruanne tuleb esitada Soome äriregistrile kuue kuu jooksul pärast majandusaasta lõppu.',
        ] },
        { t: 'h2', x: 'Käibemaks: pöördmaksustamine või oma registreerimine Soomes' },
        { t: 'p', x: 'Kui Eesti ettevõttel ei ole Soomes püsivat tegevuskohta ja ta müüb teenuseid või kaupu Soome ettevõttele või organisatsioonile, maksab maksu ostja – ka siis, kui ostja ise ei ole käibemaksukohustuslasena registreeritud (pöördmaksustamine, Soome käibemaksuseaduse § 9). Arvele kirjutatakse "käännetty verovelvollisuus" ning maksusummat ega määra ei märgita. Sama kehtib ehitusteenuse müümisel Soome ettevõttele.' },
        { t: 'p', x: 'Pane tähele, et käibemaksu puhul on püsiva tegevuskoha piir teine kui tulumaksu puhul: ehitus- või paigaldusobjekt on püsiv tegevuskoht, kui lepingud kestavad üle üheksa kuu, ja siis juba tegevuse algusest. Sel juhul eespool kirjeldatud ostja maksukohustus enam ei kehti ja ettevõte registreerub Soomes. Ehitusteenuste müügil maksab maksu siis ostja ainult juhul, kui ta ise müüb ehitusteenuseid muul kui juhuslikul viisil.' },
        { t: 'p', x: 'Soomes tuleb end käibemaksukohustuslasena registreerida, kui ettevõttel on Soomes püsiv tegevuskoht või kui pöördmaksustamist ei saa kohaldada. Tüüpiline juhtum on müük eraisikule: kui Eesti OÜ värvib Soomes eraisiku korterit, peab ta registreeruma Soomes käibemaksukohustuslaseks ja arvestama Soome käibemaksu. Üldine maksumäär on 25,5 %.' },
        { t: 'note', x: 'Soome 20 000 euro suurune väikeettevõtja käibepiir ei kehti Eesti ettevõttele automaatselt. Seda saab kasutada ainult EL-i väikeettevõtjate erikorra kaudu: ettevõtte kogu käive EL-is ei tohi ületada 100 000 € ei jooksval ega eelmisel aastal, müük Soomes ei tohi ületada 20 000 € ning ettevõte registreerub esmalt Eestis ja teatab Soome riigiks, kus ta müüb maksuvabalt. Eesti ettevõte ei vaja Soomes käibemaksuesindajat.' },
        { t: 'h2', x: 'Püsiv tegevuskoht ja tulumaks' },
        { t: 'p', x: 'Soome ja Eesti topeltmaksustamise vältimise lepingu järgi on püsiv tegevuskoht kindel äritegevuse koht, mille kaudu ettevõte tegutseb, näiteks kontor või töökoda. Ehitus-, montaaži- või paigaldusobjekt on püsiv tegevuskoht ainult siis, kui tegevus kestab üle kuue kuu. Ajutised pausid arvestatakse üldjuhul aja sisse ning äriliselt ja geograafiliselt ühtsed lepingud võib kokku liita.' },
        { t: 'ul', items: [
          'Püsiva tegevuskoha kasumilt makstakse Soomes ettevõtte tulumaksu 20 %.',
          'Välismaa ettevõte esitab tuludeklaratsiooni 6U elektrooniliselt nelja kuu jooksul alates selle kuu lõpust, mil majandusaasta lõppes.',
          'Kui ettevõtte enda hinnangul püsivat tegevuskohta ei teki, märgib ta selle deklaratsioonil 6U ja lisab vormi 80 (tegevuse aruanne). Soomes ehitus-, paigaldus- või montaažitöid tegev ettevõte esitab selle aruande oma tegevuse ja lepingute kohta igal aastal.',
          'Soome maksuamet otsustab püsiva tegevuskoha olemasolu alles esimese aasta maksustamisel. Seni tasub olukorda ise hinnata.',
        ] },
        { t: 'h2', x: 'Töötajad Soomes: A1, teatised ja maksud' },
        { t: 'p', x: 'Kui Eesti OÜ lähetab töötaja ajutiselt Soome, väljastab Sotsiaalkindlustusamet A1-tõendi kuni 2 aastaks. A1 näitab, et töötaja jääb Eesti sotsiaalkindlustuse alla, ja sotsiaalmaksed makstakse Eestisse. A1 tuleb taotleda igale lähetatavale töötajale. Tingimus on, et tööandja tegutseb tavaliselt Eestis ja töötajat ei lähetata teist töötajat asendama; ettevõte, kes tegelikult töötab ainult Soomes, ei saa A1-le tugineda. Kui töötaja ei ole Eestis kindlustatud, peab tööandja tegema talle Soome TyEL-pensionikindlustuse, mille makse on umbes 20 % palgast, ning vaja võib olla ka õnnetusjuhtumi-, töötuse- ja grupielukindlustust.' },
        { t: 'ul', items: [
          'Töötajate lähetamisest teatatakse Soome tööinspektsioonile (työsuojeluviranomainen) enne, kui töö Soomes algab. Ehituses tuleb teatis esitada alati.',
          'Ettevõttel peab olema Soomes esindaja, praktikas aadress Soomes. Esindajat ei ole vaja, kui lähetus kestab kuni kümme päeva; aja sisse arvestatakse ka eelneva nelja kuu lähetused.',
          'Ehitusplatsil peab igaühel olema maksunumber (veronumero) fotoga isikukaardil ja number peab olema avalikus registris enne tööde algust.',
          'Ehitusteatised: ehitustöö tellija teatab Soome maksuametile üle 15 000 euro (km-ta) lepingutest aruandekuule järgneva teise kuu 5. kuupäevaks. OÜ teatab ise, kui ta ostab alltöövõttu, ja annab oma töötajate andmed peatöövõtjale (päätoteuttaja).',
          'Lähetatud töötajatele tuleb Soomes korraldada töötervishoid. Soome tellija küsib tellija vastutuse seaduse (tilaajavastuulaki) järgi dokumente, lähetatud töötajate kohta näiteks A1-tõendeid.',
        ] },
        { t: 'p', x: 'Palga maksustamine sõltub 183 päeva reeglist. Soome ei maksusta palka ainult siis, kui kõik kolm tingimust on täidetud: töötaja viibib Soomes kuni 183 päeva 12 kuu jooksul, palka maksab tööandja, kes ei ole Soome resident, ning palk ei ole tööandja Soome püsiva tegevuskoha kulu. Kui OÜ-l tekib Soomes püsiv tegevuskoht, maksustatakse selle kaudu tehtud töö palk Soomes esimesest päevast ja ettevõtet koheldakse nagu Soome tööandjat: ta peab palgast kinni ettemaksu. Ehitusobjektil selgub see alles kuue kuu pärast, kuid kehtib algusest peale. Ilma püsiva tegevuskohata deklareeritakse palgad Soome tuluregistrisse (Tulorekisteri), kui töötaja on Soomes kindlustatud, viibib siin üle 6 kuu või on renditöötaja, kelle palka Soome võib maksustada. Tähtaeg on 5 päeva maksepäevast.' },
        { t: 'h2', x: 'Aga Eesti maksud?' },
        { t: 'p', x: 'Eestis maksab ettevõte tulumaksu alles kasumi jaotamisel. Aastatel 2025–2026 on jaotatud kasumi maksumäär 22/78. Soomes maksustatud püsiva tegevuskoha kasum ja Eesti maksud tuleb omavahel kooskõlastada topeltmaksustamise vältimise lepingu järgi, seega tasub Soome tegevust raamatupidamises algusest peale eraldi pidada.' },
        { t: 'h2', x: 'Abi Eesti ettevõtte asjadega Soomes' },
        { t: 'p', x: 'Aitame välja selgitada, millised Soome kohustused sinu ettevõttel tekivad, ning korraldame registreerimised, käibemaksudeklaratsioonid, tuluregistri teatised ja Soome raamatupidamise. Meie raamatupidajad teenindavad soome või vene keeles.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Vero: välismaa ettevõte Soomes (inglise keeles)', href: SRC.startEn },
          { label: 'Vero: välismaa ettevõtte käibemaks Soomes (soome keeles)', href: SRC.vatFi },
          { label: 'Vero: väikeettevõtja käibemaksuvabastus (soome keeles)', href: SRC.vatSme },
          { label: 'Vero: välismaa ettevõtte tulumaks Soomes (soome keeles)', href: SRC.incomeTaxFi },
          { label: 'Vero: välismaa tööandja kohustused (soome keeles)', href: SRC.employerFi },
          { label: 'PRH: filiaali registreerimine (soome keeles)', href: SRC.prhBranch },
          { label: 'Finlex: Soome ja Eesti maksuleping (SopS 96/1993)', href: SRC.treaty },
          { label: 'Työsuojelu: lähetatud töötajate teatis (soome keeles)', href: SRC.postingFi },
          { label: 'Sotsiaalkindlustusamet: töötajate lähetamine ja A1', href: SRC.ska },
          { label: 'EMTA: maksumäärad (inglise keeles)', href: SRC.emta },
        ] },
      ],
      faq: [
        { q: 'Kas Eesti OÜ vajab Soome Y-tunnust?', a: 'Jah, kui ta alustab Soomes äritegevust: Y-tunnus saadakse asutamisteatisega (Y1 ja lisa 6204). Filiaal kantakse äriregistrisse ainult siis, kui ettevõte tegutseb Soomest. Ajutine teenus ei nõua üldjuhul äriregistrile teatamist (ei kehti nt veoteenustele ega renditööle).' },
        { q: 'Kas Eesti OÜ lisab Soome ettevõttele esitatud arvele Soome käibemaksu?', a: 'Tavaliselt mitte. Kui ettevõttel ei ole Soomes püsivat tegevuskohta ja ostja on Soome ettevõte või organisatsioon, maksab maksu ostja. Arvele kirjutatakse "käännetty verovelvollisuus" ilma maksusummata.' },
        { q: 'Kui kaua peab ehitusobjekt kestma, et tekiks püsiv tegevuskoht?', a: 'Soome ja Eesti maksulepingu järgi on ehitus-, montaaži- või paigaldusobjekt püsiv tegevuskoht, kui tegevus kestab üle kuue kuu. Ajutised pausid arvestatakse üldjuhul sisse.' },
        { q: 'Kui kauaks A1-tõend väljastatakse?', a: 'Lähetatud töötajale kuni 2 aastaks. Tõendi väljastab Sotsiaalkindlustusamet ja selle aja jooksul jääb töötaja Eesti sotsiaalkindlustuse alla.' },
        { q: 'Kas Eesti ettevõte vajab Soomes esindajat?', a: 'Käibemaksu jaoks mitte, sest ettevõte on asutatud EL-is. Töötajaid lähetaval ettevõttel peab aga olema Soomes esindaja, kui lähetus kestab üle kümne päeva, ja filiaalil peab olema EMP-s elav esindaja.' },
      ],
    },
    uk: {
      title: 'Естонська OÜ у Фінляндії: реєстрація, ПДВ, постійне представництво і працівники (2026)',
      description:
        'Естонська OÜ у Фінляндії: Y-tunnus і філія, ПДВ і зворотне нарахування, постійне представництво, довідка A1 та відряджені працівники.',
      lead: 'Багато естонських компаній (OÜ) працюють у Фінляндії, особливо в будівництві. Естонська реєстрація не звільняє від фінських обов’язків: у Фінляндії можуть виникнути вимоги щодо реєстрації, ПДВ (ALV), податку на прибуток і обов’язків роботодавця. Зібрали, що естонській OÜ варто з’ясувати до початку робіт у Фінляндії.',
      body: [
        { t: 'h2', x: 'Y-tunnus і реєстрація у Фінляндії' },
        { t: 'p', x: 'Іноземна компанія отримує фінський ідентифікатор Y-tunnus, подавши засновницьке повідомлення (perustamisilmoitus): для компанії це форма Y1 і додаток 6204. Потрібен витяг із торгового реєстру своєї країни з перекладом фінською, шведською або англійською. Реєстрація в реєстрах податкової (Verohallinto) триває близько 3 тижнів, тож подавати повідомлення краще заздалегідь.' },
        { t: 'p', x: 'Реєстрація в реєстрі передоплати податків (ennakkoperintärekisteri) не обов’язкова, але на практиці важлива: якщо компанії в ньому немає, фінський замовник утримує податок з оплати робіт. Сама реєстрація ще не робить компанію платником податку на прибуток у Фінляндії.' },
        { t: 'h3', x: 'Коли потрібна філія (sivuliike)?' },
        { t: 'p', x: 'Філія — це частина іноземної компанії, яка професійно веде бізнес у Фінляндії звідси ж, від імені та за рахунок компанії. Філію реєструють у торговому реєстрі (kaupparekisteri) до початку діяльності. Дозвіл естонській компанії не потрібен: її засновано в країні ЄЕЗ. Якщо компанія з ЄЕЗ надає послуги у Фінляндії лише тимчасово, повідомляти торговий реєстр не треба. Виняток стосується лише послуг, на які поширюється закон про послуги (palvelulaki), — наприклад, не транспорту й не лізингу працівників.' },
        { t: 'ul', items: [
          'У назві філії має бути назва іноземної компанії, наприклад «Esimerkki OÜ, Suomen sivuliike».',
          'Філія повинна мати представника, який проживає в Європейській економічній зоні.',
          'Реєстрація філії в PRH коштує 400 €; для PRH іноземні документи перекладають фінською або шведською.',
          'Річний звіт іноземної компанії подають до торгового реєстру протягом шести місяців після закінчення фінансового року.',
        ] },
        { t: 'h2', x: 'ПДВ: зворотне нарахування чи власна реєстрація в ALV' },
        { t: 'p', x: 'Якщо в естонської компанії немає постійного представництва у Фінляндії і вона продає послуги чи товари фінській компанії або організації, податок сплачує покупець — навіть якщо сам покупець не зареєстрований платником ПДВ (зворотне нарахування — käännetty verovelvollisuus, § 9 закону про ПДВ). У рахунку пишуть «käännetty verovelvollisuus» і не зазначають ні суми, ні ставки податку. Так само й під час продажу будівельних послуг фінській компанії.' },
        { t: 'p', x: 'Зверніть увагу: для ПДВ поріг постійного представництва інший, ніж для податку на прибуток. Будівельний чи монтажний майданчик вважається постійним представництвом, якщо підряди тривають понад дев’ять місяців, — і тоді від самого початку робіт. У такому разі описане вище зворотне нарахування вже не застосовується, і компанія реєструється у Фінляндії. Під час продажу будівельних послуг податок тоді сплачує покупець, лише якщо він і сам продає будівельні послуги не епізодично.' },
        { t: 'p', x: 'Зареєструватися платником ПДВ у Фінляндії потрібно, якщо у Фінляндії є постійне представництво або якщо зворотне нарахування застосувати не можна. Типовий випадок — продаж приватній особі: якщо естонська OÜ фарбує квартиру приватного клієнта у Фінляндії, вона мусить стати на облік з ПДВ у Фінляндії й нараховувати фінський податок. Загальна ставка — 25,5 %.' },
        { t: 'note', x: 'Фінський поріг звільнення від ПДВ у 20 000 € не поширюється на естонську компанію автоматично. Ним можна скористатися лише через схему ЄС для малого бізнесу: загальний оборот компанії в ЄС — не більше 100 000 € і в поточному, і в минулому році, продажі у Фінляндії — не більше 20 000 €, спершу реєстрація в Естонії, потім повідомлення, що Фінляндія — країна звільнених продажів. Податковий представник з ПДВ у Фінляндії естонській компанії не потрібен.' },
        { t: 'h2', x: 'Постійне представництво і податок на прибуток' },
        { t: 'p', x: 'За угодою між Фінляндією та Естонією про уникнення подвійного оподаткування постійне представництво (kiinteä toimipaikka) — це постійне місце діяльності, наприклад офіс чи майстерня. Будівельний, монтажний чи складальний майданчик стає постійним представництвом, лише якщо роботи тривають понад шість місяців. Тимчасові перерви зазвичай зараховуються, а комерційно й географічно пов’язані підряди можуть підсумовуватися.' },
        { t: 'ul', items: [
          'З прибутку постійного представництва у Фінляндії сплачують податок на прибуток організацій — 20 %.',
          'Іноземна компанія подає декларацію 6U електронно протягом чотирьох місяців від кінця місяця, у якому закінчився фінансовий рік.',
          'Якщо, на думку самої компанії, постійного представництва немає, вона зазначає це в декларації 6U і додає форму 80 (звіт про діяльність). Компанія, яка виконує у Фінляндії будівельні, монтажні чи складальні роботи, подає такий звіт про діяльність і підряди щороку.',
          'Чи є постійне представництво, податкова вирішує лише під час оподаткування за перший рік. До того ситуацію варто оцінити самостійно.',
        ] },
        { t: 'h2', x: 'Працівники у Фінляндії: A1, повідомлення й податки' },
        { t: 'p', x: 'Якщо естонська OÜ тимчасово відряджає працівника до Фінляндії, Департамент соціального страхування Естонії (Sotsiaalkindlustusamet) видає довідку A1 максимум на 2 роки. A1 підтверджує, що працівник залишається в естонській системі соціального страхування, а внески сплачуються в Естонію. Довідку оформлюють на кожного відрядженого. Умова — роботодавець зазвичай веде діяльність в Естонії, а працівника не направляють на заміну іншому працівникові; компанія, яка фактично працює лише у Фінляндії, не може спиратися на A1. Якщо працівник не застрахований в Естонії, роботодавець мусить оформити йому фінське пенсійне страхування TyEL — це близько 20 % від зарплати, а також може знадобитися страхування від нещасних випадків, від безробіття та групове страхування життя.' },
        { t: 'ul', items: [
          'Про відрядження працівників повідомляють фінську інспекцію охорони праці (työsuojeluviranomainen) до початку роботи у Фінляндії. У будівництві повідомлення потрібне завжди.',
          'Компанія повинна мати представника у Фінляндії — по суті, адресу у Фінляндії. Він не потрібен, якщо відрядження триває не більше десяти днів; до строку зараховуються й відрядження за попередні чотири місяці.',
          'На будмайданчику кожен повинен мати податковий номер (veronumero) на картці з фото, і номер має бути внесений до публічного реєстру до початку робіт.',
          'Будівельні звіти (rakentamisilmoitukset): замовник будівельних робіт повідомляє податковій про підряди понад 15 000 € без ПДВ до 5-го числа другого місяця після звітного. OÜ подає такі звіти сама, якщо купує субпідряд, а дані про своїх працівників передає генпідрядникові (päätoteuttaja).',
          'Для відряджених працівників треба організувати виробничу медицину (työterveyshuolto) у Фінляндії. Фінський замовник запитує документи за законом про відповідальність замовника (tilaajavastuulaki), для відряджених — наприклад, довідки A1.',
        ] },
        { t: 'p', x: 'Податок із зарплати залежить від правила 183 днів. Фінляндія не оподатковує зарплату, лише якщо виконано всі три умови: працівник перебуває у Фінляндії не більше 183 днів за 12 місяців, зарплату виплачує роботодавець, який не є резидентом Фінляндії, і зарплата не відноситься на витрати постійного представництва роботодавця у Фінляндії. Якщо в OÜ виникло постійне представництво, зарплата за роботу через нього оподатковується у Фінляндії з першого дня, а компанію прирівнюють до фінського роботодавця: вона утримує із зарплати аванс податку (ennakonpidätys). На будові це стає зрозуміло лише через шість місяців, але діє від самого початку. Без представництва зарплати подають до реєстру доходів (Tulorekisteri), якщо працівник застрахований у Фінляндії, перебуває тут понад 6 місяців або працює за лізингом персоналу і його зарплату може оподатковувати Фінляндія. Строк — 5 днів від дати виплати.' },
        { t: 'h2', x: 'А як щодо податків в Естонії?' },
        { t: 'p', x: 'В Естонії компанія сплачує податок на прибуток лише тоді, коли розподіляє прибуток. У 2025–2026 роках ставка на розподілений прибуток — 22/78. Прибуток постійного представництва, оподаткований у Фінляндії, і естонські податки треба узгодити за угодою про уникнення подвійного оподаткування, тож фінську діяльність краще від самого початку обліковувати окремо.' },
        { t: 'h2', x: 'Допоможемо зі справами естонської компанії у Фінляндії' },
        { t: 'p', x: 'Допоможемо зрозуміти, які обов’язки виникають у вашої компанії у Фінляндії, і візьмемо на себе реєстрацію, декларації з ПДВ, звіти до Tulorekisteri та фінську бухгалтерію. Наші бухгалтери обслуговують фінською або російською мовою.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: іноземний бізнес у Фінляндії (англійською)', href: SRC.startEn },
          { label: 'Vero: ПДВ іноземної компанії у Фінляндії (фінською)', href: SRC.vatFi },
          { label: 'Vero: звільнення від ПДВ за малого обороту (фінською)', href: SRC.vatSme },
          { label: 'Vero: податок на прибуток іноземної компанії (фінською)', href: SRC.incomeTaxFi },
          { label: 'Vero: обов’язки іноземного роботодавця (фінською)', href: SRC.employerFi },
          { label: 'PRH: реєстрація філії (фінською)', href: SRC.prhBranch },
          { label: 'Finlex: угода Фінляндії та Естонії про уникнення подвійного оподаткування', href: SRC.treaty },
          { label: 'Työsuojelu: повідомлення про відряджених працівників (фінською)', href: SRC.postingFi },
          { label: 'Sotsiaalkindlustusamet: відрядження працівників і A1 (естонською)', href: SRC.ska },
          { label: 'EMTA: податкові ставки Естонії (англійською)', href: SRC.emta },
        ] },
      ],
      faq: [
        { q: 'Чи потрібен естонській OÜ фінський Y-tunnus?', a: 'Так, коли компанія починає діяльність у Фінляндії: Y-tunnus отримують за засновницьким повідомленням (Y1 і додаток 6204). Філію в торговому реєстрі реєструють, лише якщо компанія веде бізнес із Фінляндії. Для тимчасових послуг повідомляти торговий реєстр зазвичай не потрібно (крім, наприклад, транспорту й лізингу працівників).' },
        { q: 'Чи виставляє естонська OÜ фінській компанії рахунок із фінським ПДВ?', a: 'Зазвичай ні. Якщо в компанії немає постійного представництва у Фінляндії, а покупець — фінська компанія або організація, податок сплачує покупець. У рахунку пишуть «käännetty verovelvollisuus» без суми податку.' },
        { q: 'Скільки має тривати будова, щоб виникло постійне представництво?', a: 'За угодою Фінляндії та Естонії будівельний, складальний чи монтажний майданчик стає постійним представництвом, якщо роботи тривають понад шість місяців. Тимчасові перерви зазвичай зараховуються.' },
        { q: 'На який строк видають довідку A1?', a: 'Відрядженому працівникові — максимум на 2 роки. Довідку видає естонський Sotsiaalkindlustusamet, і на цей час працівник залишається в естонській системі соціального страхування.' },
        { q: 'Чи потрібен естонській компанії представник у Фінляндії?', a: 'Податковий представник з ПДВ не потрібен: компанію зареєстровано в ЄС. Але компанія, що відряджає працівників, повинна мати представника у Фінляндії, якщо відрядження триває понад десять днів, а філія — представника, який проживає в ЄЕЗ.' },
      ],
    },
  },
};
