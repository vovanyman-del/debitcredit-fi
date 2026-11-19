import type { Guide } from './types';

// Facts verified 2026-11-19, verbatim, against Finlex (consolidated Finnish texts as served on
// finlex.fi that day) and vero.fi (detailed guidance with its issue date and validity; ordinary
// pages with their update date). Every link below was fetched the same day and answered HTTP 200.
// - Arvonlisäverolaki 1501/1993 (https://www.finlex.fi/fi/lainsaadanto/1993/1501):
//   84 § "Suoritettava vero on 25,5 prosenttia veron perusteesta, ellei 85 tai 85 a §:ssä toisin
//   säädetä." 85 § 1 mom. "Seuraavien palvelujen myynnistä sekä seuraavien tavaroiden myynnistä ...
//   suoritettava vero on 13,5 prosenttia veron perusteesta: 1) ruokatavara, juoma ja muu sellaisenaan
//   ihmisen nautittavaksi tarkoitettu aine ... (elintarvike); 2) ravintola- ja ateriapalvelut, lukuun
//   ottamatta 2 momentin 3 kohdassa tarkoitettujen tavaroiden luovutuksia;" with the note "L:lla
//   1358/2025 muutettu johdantokappale tuli voimaan 1.1.2026. Aiempi sanamuoto kuuluu: ... 14
//   prosenttia veron perusteesta". 85 § 2 mom. "Edellä 1 momentin 1 kohdan nojalla alennettua
//   verokantaa ei sovelleta: 1) eläviin eläimiin; 2) vesijohtoveteen; 3) alkoholi- ja
//   alkoholijuomaverolaissa tarkoitettuihin alkoholijuomiin ja tupakkavalmisteisiin; eikä 4)
//   myrkkyihin." NOTE: no exclusion for soft drinks, sweets or ice cream — they are elintarvikkeet at
//   13,5 %. 3 § "Myyjä ei ole verovelvollinen, jos kuluvan kalenterivuoden ja sitä edeltäneen
//   kalenterivuoden liikevaihto on enintään 20 000 euroa, ellei häntä ole oman ilmoituksensa
//   perusteella merkitty verovelvolliseksi." 25 a § "Henkilökunnalle luovutettu ravintola- tai
//   ateriapalvelu katsotaan otetuksi omaan käyttöön myös silloin, kun palvelua ei luovuteta verollisen
//   liiketoiminnan yhteydessä ja vastaavia palveluja ei myydä ulkopuolisille."
// - Vero, Arvonlisäveroprosentit (updated 1.1.2026;
//   https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaveroprosentit/;
//   EN https://www.vero.fi/en/businesses-and-corporations/taxes-and-charges/vat/rates-of-vat/):
//   "1. Yleinen verokanta 25,5 % ... alkoholi- ja tupakkatuotteet"; "2. Alennettu verokanta: 13,5 %
//   Alennettu verokanta oli 14 % 31.12.2025 saakka."; "ravintolapalvelut (tarjoilu myyjän omissa
//   tiloissa) ateriapalvelut (tarjoilu tilaajan osoittamissa tiloissa)"; "Huom: alempi 13,5 %:n
//   verokanta ei koske alkoholijuomien ja tupakkatuotteiden myyntiä eikä alkoholijuomien tarjoilua.";
//   example "Ravintola tai elintarvikeliike, ruoan kotiinkuljetus: Ravintola tai elintarvikeliike myy
//   ruokaa kotiinkuljetuksena ja laskuttaa ruoan tilaajalta koko myynnin (ruoka+kotiinkuljetus)
//   pääsuoritteen eli aterian tai elintarvikkeiden verokannalla (13,5%), kun ravintola ... hoitaa ruoan
//   kotiinkuljetuksen itse ... [tai] käyttää ruoan kotiinkuljetukseen kuljetuspalveluyritystä. Sen
//   sijaan kuljetuspalveluyritys laskuttaa ravintolaa ... 25,5 % verokannalla."
// - Vero, Arvonlisäverovelvollisen opas, VH/6955/00.01.00/2025, antopäivä 1.1.2026, voimassa
//   toistaiseksi (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/335806/arvonlis%C3%A4verovelvollisen-opas/):
//   5.2.2 "Alennettua 13,5 prosentin verokantaa sovelletaan ravintola- ja ateriapalveluihin lukuun
//   ottamatta alkoholijuomia ja tupakkavalmisteita."; "Ateria- ja ravintolapalvelun myynnistä ei ole
//   kysymys, kun ruoka myydään mukana otettavaksi ja siihen ei liity ruokailuun liittyvää
//   tukipalvelua. Tällöin kyse voi olla elintarvikkeen myynnistä."; Esimerkki 47 "Jos asiakas tilaa
//   ruokajuomaksi alkoholijuoman, kuten lasin viiniä, juoman myyntiin sovelletaan yleistä
//   verokantaa."; 5.2.1 "Jos juomaa ei pidetä alkoholi- ja alkoholijuomaverolaissa tarkoitettuna
//   alkoholijuomana, juoma on elintarvike"; "ravintolassa tarjoiltuun vesijohtoveteen esimerkiksi
//   vesikannussa sovelletaan ravintola- ja ateriapalvelujen alennettua verokantaa"; "Pakkauksiin ja
//   kuljetustarvikkeisiin, jotka oikeuttavat korvaukseen palauttaessa, soveltuu yleinen verokanta.
//   Puhekielessä näistä käytetään nimitystä pullopantti."; 1.3.3 jakamisperiaate: "Sillä, että
//   kokonaistoimituksesta on laskutettu vain yksi hinta, ei ole ratkaisevaa merkitystä"; KHO 2022:58
//   (fast-food children's meal: burger, fries and drink at the reduced rate, the toy at the general
//   rate). The guide gives no fixed formula for splitting one menu price; splitting by the items'
//   normal separate prices is worded as a reasonable, documented method, not as a Vero rule.
//   9.8.3 "Kun tippi ei perustu sopimukseen eikä se ole vastiketta myydystä tavarasta tai palvelusta,
//   tippi katsotaan arvonlisäveron soveltamisalan ulkopuoliseksi eräksi. Tippiä ei lueta myynnin veron
//   perusteeseen eikä siitä suoriteta arvonlisäveroa, jos tippi maksetaan suoraan henkilökunnalle tai
//   sen jäsenelle. Silloin, kun elinkeinonharjoittaja veloittaa palvelurahan asiakkaalta asiakkaan
//   tahdosta riippumatta, elinkeinonharjoittajan on suoritettava palvelurahasta arvonlisävero."
//   Reverse charge: "Ostaja on verovelvollinen silloin, kun suomalainen elinkeinonharjoittaja ostaa
//   palvelun ulkomaiselta elinkeinonharjoittajalta ... Käännettyä verovelvollisuutta ei sovelleta, jos
//   ulkomainen myyjä on hakeutunut Suomessa verovelvolliseksi." Esimerkki 54: a pizzeria may deduct
//   the VAT on kebab meat, other food and tablecloths.
//   NOTE: the income-tax treatment of tips was NOT stated here because no current official vero.fi
//   page on it was found; only the VAT rule above is used.
// - Vero, Komissiokaupan ja välitystoiminnan arvonlisäverotus, VH/7279/00.01.00/2025, antopäivä
//   1.1.2026 (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/152899/komissiokaupan-ja-valitystoiminnan-arvonlisaverotus4/):
//   "välittäjänä eli toisen nimissä toimiva asiamies suorittaa arvonlisäveron ainoastaan
//   välityspalkkiostaan"; "Kun välityspalvelun myyntimaa on Suomi, välittäjä suorittaa
//   välityspalkkiosta arvonlisäveron yleisen verokannan mukaan. Välityspalvelun myyntiin sovelletaan
//   yleistä verokantaa, vaikka välitettävät tavarat tai palvelut olisivat alemman verokannan alaisia".
//   NOTE: Vero has no page specific to Wolt/Foodora; the platform section is worded conditionally
//   (who is the seller is checked from the platform terms and the customer's receipt).
// - Vero, tiedote 4.6.2024 (https://www.vero.fi/tietoa-verohallinnosta/uutishuone/lehdist%C3%B6tiedotteet/2024/verohallinnon-valvonta-paljasti-ravintoloista-monenlaisia-v%C3%A4%C3%A4rink%C3%A4yt%C3%B6ksi%C3%A4-maksamattomia-veroja-5-miljoonaa-euroa-rikosilmoituksia-noin-40/):
//   "Verohallinto aloitti pitserioiden ja kebab-ravintoloiden tehostetun valvonnan keväällä 2023.
//   Reilun vuoden aikana Verohallinto on tehnyt eri puolilla maata ravintoloihin 174 verotarkastusta
//   ... Rikosilmoitus on tehty noin 40 toimijasta."; "käteismyynti puuttuu kirjanpidosta kokonaan tai
//   se on puuttunut usealta kuukaudelta. Maksupäätteitä ei ole yhdistetty kassakoneeseen";
//   "Yhtiöiden kirjanpidosta on puuttunut myös merkittäviä määriä ruokalähettiyhtiöiden kautta
//   tapahtunutta myyntiä".
// - Vero, Kuitintarjoamisvelvollisuudesta käteiskaupassa
//   (https://www.vero.fi/yritykset-ja-yhteisot/yhteistyo-ja-palvelut/verotarkastus-ja-harmaa-talous/kuitinantovelvollisuus-harmaan-talouden-torjunnassa/kuitintarjoamisvelvollisuudesta-kateiskaupassa/;
//   EN .../legislation_on_the_obligation_to_give_a/, updated 6.10.2026): "Elinkeinonharjoittajan on
//   tarjottava tavaran tai palvelun ostajalle maksusuorituksesta laadittu kuitti, jos maksu suoritetaan
//   käteisellä rahalla tai siihen rinnastettavalla maksutavalla. Kuitti voidaan tarjota myös
//   sähköisesti. Laki koskee kaikilla toimialoilla toimivia elinkeinonharjoittajia, joiden tilikauden
//   liikevaihto on yli 10 000 euroa."; content: name, contact details and Y-tunnus, date, receipt
//   number, goods/services, "maksu ja suoritettavan arvonlisäveron määrä verokannoittain";
//   the law does not apply to "markkina- ja torikauppaan ulkotiloissa, lukuun ottamatta
//   alkoholijuomien vähittäismyyntiä ja anniskelua" (worded as "may apply" for food trucks);
//   "Laiminlyöntimaksun määrä on vähintään 300 euroa ja enintään 1 000 euroa." Law: Laki
//   kuitintarjoamisvelvollisuudesta käteiskaupassa 658/2013 (https://www.finlex.fi/fi/lainsaadanto/2013/658,
//   amended 450/2025 and 722/2025 in force 1.1.2026; the supervising authorities are therefore not
//   named in the text). Parent page: "OECD on useassa raportissaan suositellut jäsenmaitaan ottamaan
//   käyttöön fiskaaliset kassajärjestelmät" and only a 2018 study is cited — no certified-register
//   duty exists, as the brief expected.
// - Kirjanpitolaki 1336/1997 (https://www.finlex.fi/fi/lainsaadanto/1997/1336): 2:4 "Käteisellä
//   rahalla suoritetut maksut on kirjattava päiväkohtaiseen järjestykseen." and "Käteisellä rahalla
//   suoritetut maksut on kirjattava viipymättä."; 2:5 "Kirjauksen on perustuttava päivättyyn ja
//   järjestelmällisesti numeroituun tai vastaavalla tavalla yksilöityyn tositteeseen, joka todentaa
//   liiketapahtuman."; 2:10 "tilikauden tositteet ... on säilytettävä vähintään kuusi vuotta";
//   5:6 "Tilikauden päättyessä jäljellä olevan vaihto-omaisuuden hankintameno aktivoidaan. Jos
//   vaihto-omaisuuden todennäköinen hankintameno tai luovutushinta on tilikauden päättyessä
//   hankintamenoa pienempi, on erotus kuitenkin kirjattava kuluksi."
// - Vero, Henkilöstöruokailun arvonlisäverotuksesta, VH/6225/00.01.00/2025, antopäivä 8.1.2026,
//   voimassa toistaiseksi (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48158/henkilostoruokailun-arvonlisaverotuksesta4/):
//   "Kun työnantaja tarjoaa omassa ruokalassaan valmistettuja ... aterioita työntekijöille ilman
//   erillistä veloitusta ... arvonlisäverotuksessa tulee sovellettavaksi oman käytön verotusta
//   koskevat säännöt."; "ravintola- ja ateriapalvelujen oman käytön verotuksessa sovellettava
//   verokanta on alennettu 13,5 prosentin verokanta"; "Itse suoritetun ravintola- ja ateriapalvelun
//   veron peruste on palvelun suorittamisesta aiheutuneiden välittömien ja välillisten kustannusten
//   määrä. Verovelvollinen voi halutessaan käyttää välillisten kustannusten määränä 22 prosenttia
//   välittömistä kustannuksista."; "Käyväksi markkina-arvoksi katsotaan se vastike, joka ei alita
//   tuloverotuksessa vahvistettavaa ravintoedun raha-arvon vähimmäismäärää."; "Hotelli- ja
//   ravintola-alan henkilökunnan ... ravintoedun raha-arvo on 7,48 euroa/ateria."; a lower price →
//   "veron peruste tulee korottaa käypään markkina-arvoon". No tolerance is given: any price below the
//   ravintoetu value is alivastikkeellinen, so the guide does not say "clearly lower".
// - Verohallinnon päätös vuodelta 2026 toimitettavassa verotuksessa noudatettavista luontoisetujen
//   laskentaperusteista, VH/6275/00.01.00/2025, antopäivä 13.11.2025, voimassa 1.1.2026
//   (https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47380/verohallinnon-paatos-vuodelta-2026-toimitettavassa-verotuksessa-noudatettavista-luontoisetujen-laskentaperusteista/;
//   EN https://www.vero.fi/en/detailed-guidance/decisions/47380/in-kind-benefits-fringe-benefits-2026/):
//   10 § "Hotelli- ja ravintola-alan henkilökunnan ja lentohenkilöstön lennon aikana saaman
//   ravintoedun raha-arvona pidetään 7,48 euroa ateriaa kohden."; "Palkansaajan työnantajalle
//   ateriasta suorittamaa korvausta ... vähennetään ravintoedun raha-arvosta." The 2027 decision
//   (antopäivä 16.11.2026, voimassa 1.1.2027;
//   https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47380/verohallinnon-paatos-vuodelta-2027-toimitettavassa-verotuksessa-noudatettavista-luontoisetujen-laskentaperusteista/):
//   "Hotelli- ja ravintola-alan henkilökunnan ... ravintoedun raha-arvona pidetään 7,65 euroa
//   ateriaa kohden."
// - Vero, Tavaran tai palvelun ottaminen omaan käyttöön (updated 28.3.2025;
//   https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/tavaran-tai-palvelun-ottaminen-omaan-kayttoon/;
//   EN .../vat/goods-or-services-diverted-to-private-use/): "Yrittäjä ottaa myöhemmin yrityksestä
//   tavaroita omaan tai perheensä kulutukseen ... Hänen on maksettava veroa omaan käyttöön
//   ottamisesta"; "Vähäisen oman käytön rajana pidetään noin 850 euroa vuodessa. Vähäisen oman käytön
//   verottomuus koskee vain alv-velvollisia luonnollisia henkilöitä, puolisoja, jakamatonta
//   kuolinpesää tai verotusyhtymää."
// - Vero, Millaisesta toiminnasta pitää tai voi rekisteröityä alv-rekisteriin (EN: what business
//   operations require or allow VAT registration): "Ilmoittaudu alv-rekisteriin, jos yrityksen
//   liiketoiminnan liikevaihto ylittää kalenterivuodessa 20 000 euroa."
// - Alkoholilaki 1102/2017 (finlex.fi/fi/lainsaadanto/2017/1102; named, not linked): "Alkoholijuomien
//   vähittäismyynti-, toimitus- ja anniskeluluvan myöntää hakemuksesta Lupa- ja valvontavirasto."
//   NOTE: the brief said aluehallintovirasto/Valvira; both were merged into Lupa- ja valvontavirasto
//   on 1.1.2026.
// - Elintarvikelaki 297/2021 (finlex.fi/fi/lainsaadanto/2021/297; named, not linked):
//   "Elintarvikealan toimijan on tehtävä ilmoitus elintarviketoiminnasta toiminnan rekisteröintiä
//   varten ... toimivaltaiselle valvontaviranomaiselle viimeistään neljä viikkoa ennen toiminnan
//   aloittamista tai olennaista muuttamista." (municipal food control is named, not linked).
// - Collective agreement: the industry agreement is named only generically ("alan
//   työehtosopimus"); its exact title and parties could not be read from an official source the
//   same day (Finlex served the PDF as an image), so neither PAM/MaRa nor general applicability is
//   claimed.
// - Vaavo: the bureau's app for sending receipts; mentioned once, in the closing paragraph.
// Worked example (2026 rates): 11 350,00 = 10 000,00 + 1 350,00 (13,5 %); 2 510,00 = 2 000,00 +
// 510,00 (25,5 %); 2 270,00 = 2 000,00 + 270,00; commission 600,00 + 153,00; payout 1 517,00;
// purchases 4 540,00 = 4 000,00 + 540,00 and alcoholic drinks 1 255,00 = 1 000,00 + 255,00 (soft
// drinks would be 13,5 %); payable
// 1 350 + 510 + 270 − 153 − 540 − 255 = 1 182,00. Beer at 13,5 %: 2 510 × 13,5/113,5 = 298,55
// (211,45 too little). Net payout as base: 1 517 × 13,5/113,5 = 180,44 (89,56 too little).
// Staff meal: 20 × 7,48 = 149,60; with 3,00 paid per meal 20 × 4,48 = 89,60.
const VERO = 'https://www.vero.fi';

const SRC = {
  ratesFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaveroprosentit/`,
  ratesEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/rates-of-vat/`,
  vatGuide: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/335806/arvonlis%C3%A4verovelvollisen-opas/`,
  staffMealsVat: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48158/henkilostoruokailun-arvonlisaverotuksesta4/`,
  intermediary: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/152899/komissiokaupan-ja-valitystoiminnan-arvonlisaverotus4/`,
  benefits2026Fi: `${VERO}/syventavat-vero-ohjeet/paatokset/47380/verohallinnon-paatos-vuodelta-2026-toimitettavassa-verotuksessa-noudatettavista-luontoisetujen-laskentaperusteista/`,
  benefits2026En: `${VERO}/en/detailed-guidance/decisions/47380/in-kind-benefits-fringe-benefits-2026/`,
  receiptFi: `${VERO}/yritykset-ja-yhteisot/yhteistyo-ja-palvelut/verotarkastus-ja-harmaa-talous/kuitinantovelvollisuus-harmaan-talouden-torjunnassa/kuitintarjoamisvelvollisuudesta-kateiskaupassa/`,
  receiptEn: `${VERO}/en/businesses-and-corporations/cooperation-and-services/tax-auditing-and-shadow-economy/kuitinantovelvollisuus-harmaan-talouden-torjunnassa/legislation_on_the_obligation_to_give_a/`,
  ownUseFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/tavaran-tai-palvelun-ottaminen-omaan-kayttoon/`,
  ownUseEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/goods-or-services-diverted-to-private-use/`,
  auditNews: `${VERO}/tietoa-verohallinnosta/uutishuone/lehdist%C3%B6tiedotteet/2024/verohallinnon-valvonta-paljasti-ravintoloista-monenlaisia-v%C3%A4%C3%A4rink%C3%A4yt%C3%B6ksi%C3%A4-maksamattomia-veroja-5-miljoonaa-euroa-rikosilmoituksia-noin-40/`,
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
  receiptAct: 'https://www.finlex.fi/fi/lainsaadanto/2013/658',
};

export const ravintolanKirjanpito: Guide = {
  slug: 'ravintolan-kirjanpito',
  datePublished: '2026-11-23',
  dateModified: '2026-11-23',
  content: {
    fi: {
      title: 'Ravintolan ja kahvilan kirjanpito ja ALV-kannat 2026: kassa, Wolt ja ateriat',
      description:
        'Ravintolan ja kahvilan kirjanpito 2026: ruoka 13,5 %, alkoholi 25,5 %, yhteishinnan jako, Wolt-tilitykset, kassa ja Z-raportit sekä henkilökunnan ateriat.',
      lead: 'Pizzeria, kebab-paikka, kahvila tai food truck aloitetaan usein toiminimellä tai pienellä osakeyhtiöllä. Kirjanpidossa ratkaisevat oikeat alv-kannat, jokaisen kassapäivän kirjaaminen, ruokalähettialustojen tilitykset ja henkilökunnan ateriat. Kokosimme vuoden 2026 säännöt, kuukauden tositteet, yleisimmät virheet ja esimerkin euroina.',
      body: [
        { t: 'h2', x: 'Ilmoitukset ja luvat lyhyesti' },
        { t: 'p', x: 'Ennen avaamista tee perustamisilmoitus, jolla saat Y-tunnuksen ja voit samalla ilmoittautua ennakkoperintärekisteriin ja arvonlisäverovelvollisten rekisteriin. Alv-rekisteriin on ilmoittauduttava, kun liikevaihto ylittää 20 000 euroa kalenterivuodessa. Ravintolassa raja ylittyy yleensä nopeasti, ja moni rekisteröityy heti alusta, jotta voi vähentää kalusteiden, laitteiden ja raaka-aineiden arvonlisäveron.' },
        { t: 'p', x: 'Elintarvikelain (297/2021) mukaan elintarviketoiminnasta on tehtävä ilmoitus kunnan elintarvikevalvontaan viimeistään neljä viikkoa ennen toiminnan aloittamista tai olennaista muuttamista. Alkoholin anniskeluun tarvitaan anniskelulupa, jonka myöntää 1.1.2026 alkaen Lupa- ja valvontavirasto (aiemmin aluehallintovirastot ja Valvira).' },
        { t: 'h2', x: 'Arvonlisäverokannat 2026' },
        { t: 'p', x: 'Alennettu arvonlisäverokanta laski 1.1.2026 alkaen 14 %:sta 13,5 %:iin (AVL 85 §). Samaa kantaa sovelletaan sekä elintarvikkeiden myyntiin että ravintola- ja ateriapalveluihin. Yleinen verokanta on 25,5 % (AVL 84 §). Ratkaisevaa on myynnin ajankohta, joten vuoden 2025 myyntiin kuului 14 %.' },
        { t: 'ul', items: [
          'Ruoka-annokset, lounas, buffet ja kahvilan tuotteet: 13,5 %.',
          'Alkoholittomat juomat, kahvi, tee, virvoitusjuomat, makeiset ja jäätelö ovat elintarvikkeita: 13,5 %.',
          'Ravintolassa tarjoiltu vesijohtovesi, esimerkiksi vesikannu pöytään: 13,5 % (pelkkä vesijohtoveden myynti olisi 25,5 %).',
          'Olut, siideri, viini ja muut alkoholijuomat: aina 25,5 %, myös ruoan kanssa tarjoiltuna. Alkoholiton olut, joka ei ole alkoholijuomaverolaissa tarkoitettu alkoholijuoma, on elintarvike.',
          'Tupakkatuotteet: 25,5 %.',
          'Pullopantti ja muut palautettavien pakkausten panttiosuudet: 25,5 %, vaikka itse juoma olisi 13,5 %.',
          'Muut tavarat, kuten lelut, astiat ja tuotemyynti: 25,5 %.',
        ] },
        { t: 'h3', x: 'Paikan päällä vai mukaan' },
        { t: 'p', x: 'Ravintolapalvelua on tarjoilu myyjän tiloissa, ja siihen kuuluu esimerkiksi kattaminen, pöydät ja astioiden kerääminen. Kun ruoka myydään mukaan ilman näitä palveluja, kyse on elintarvikkeen myynnistä. Suomessa molempiin sovelletaan samaa 13,5 %:n verokantaa, joten mukaan myyty pizza ja salissa syöty pizza verotetaan samalla kannalla. Alkoholi on 25,5 % molemmissa tapauksissa.' },
        { t: 'h3', x: 'Yhteishinta: lounas ja olut, menu ja viinipaketti' },
        { t: 'p', x: 'Verohallinnon ohjeen mukaan jokaisen tuotteen verokohtelu ratkaistaan lähtökohtaisesti erikseen, eikä yksi yhteinen hinta muuta tätä (jakamisperiaate). Korkein hallinto-oikeus katsoi tapauksessa KHO 2022:58, että pikaruokaravintolan lastenaterian hampurilaiseen, lisukkeeseen ja juomaan sovelletaan alennettua kantaa, mutta ateriaan kuuluvaan leluun yleistä kantaa.' },
        { t: 'p', x: 'Jos myyt lounaan ja oluen tai menun ja viinipaketin yhteen hintaan, hinta on siis jaettava 13,5 %:n ja 25,5 %:n osiin. Ohjeessa ei ole yhtä pakollista laskukaavaa. Selkeä ja perusteltavissa oleva tapa on jakaa hinta tuotteiden tavanomaisten erillishintojen suhteessa ja määrittää jako kassaan valmiiksi, jolloin Z-raportti näyttää myynnin oikein verokannoittain. Buffet, jonka hintaan kuuluu vain ruokaa ja alkoholittomia juomia, on kokonaan 13,5 %.' },
        { t: 'h3', x: 'Oma kotiinkuljetus' },
        { t: 'p', x: 'Kun ravintola myy ruoan kotiinkuljetuksena ja laskuttaa asiakkaalta sekä ruoan että kuljetuksen, koko myyntiin sovelletaan aterian verokantaa 13,5 %. Tämä pätee, kuljettipa ravintolan oma henkilökunta tai ravintolan tilaama kuljetusyritys. Kuljetusyritys laskuttaa ravintolaa omasta palvelustaan 25,5 %:n kannalla.' },
        { t: 'h2', x: 'Wolt, Foodora ja muut ruokalähettialustat' },
        { t: 'p', x: 'Tarkista ensin alustan ehdoista ja asiakkaan kuitista, kuka on ruoan myyjä. Kun myyjänä on ravintola ja alusta toimii välittäjänä, ravintola ilmoittaa arvonlisäveron koko ruoan hinnasta, jonka asiakkaat maksoivat, eikä alustan pidättämää palkkiota vähennetä myynnistä. Jos alusta veloittaa asiakkaalta toimitusmaksun omissa nimissään, se on alustan omaa myyntiä eikä kuulu ravintolan myyntiin.' },
        { t: 'ul', items: [
          'Alustan palkkio on erillinen kulu. Verohallinnon mukaan välittäjä suorittaa palkkiostaan arvonlisäveron yleisellä 25,5 %:n kannalla, vaikka välitetty ruoka olisi 13,5 %:n kannassa.',
          'Jos palkkiolaskussa on Suomen arvonlisävero, alv-rekisterissä oleva ravintola vähentää sen normaalisti.',
          'Jos ulkomainen alusta laskuttaa ilman Suomen arvonlisäveroa, ravintola maksaa veron itse käännetyn verovelvollisuuden perusteella ja vähentää sen saman kauden ilmoituksella.',
          'Alustan tilitysraportti on myyntitosite: siitä näkyvät asiakkaiden maksamat hinnat, palkkiot, hyvitykset ja tilitetty summa. Täsmäytä jokainen tilitys pankkitiliin.',
        ] },
        { t: 'p', x: 'Verohallinto aloitti pitserioiden ja kebab-ravintoloiden tehostetun valvonnan keväällä 2023. Reilussa vuodessa se teki 174 verotarkastusta ja rikosilmoituksen noin 40 toimijasta. Havaintoja olivat muun muassa kirjanpidosta puuttuva käteismyynti, kassakoneeseen yhdistämättömät maksupäätteet ja merkittävät määrät kirjaamatonta ruokalähettiyhtiöiden kautta tapahtunutta myyntiä.' },
        { t: 'h2', x: 'Kassa, kuitti ja käteinen' },
        { t: 'p', x: 'Suomessa ei ole yleistä velvollisuutta käyttää viranomaisen hyväksymää tai sertifioitua kassajärjestelmää. Laki kuitintarjoamisvelvollisuudesta käteiskaupassa (658/2013) velvoittaa kuitenkin yrityksen, jonka tilikauden liikevaihto on yli 10 000 euroa, tarjoamaan asiakkaalle kuitin, kun tämä maksaa käteisellä tai kortilla. Kuitti voi olla myös sähköinen. Lakia ei sovelleta markkina- ja torikauppaan ulkotiloissa, lukuun ottamatta alkoholijuomien vähittäismyyntiä ja anniskelua. Poikkeus voi koskea ulkomarkkinoilla myyvää food truckia, joten tarkista se kirjanpitäjäsi kanssa. Laiminlyönnistä voidaan määrätä 300–1 000 euron laiminlyöntimaksu.' },
        { t: 'ul', items: [
          'Kuitissa on oltava yrityksen nimi, yhteystiedot ja Y-tunnus, päivämäärä, kuitin numero tai muu yksilöivä tieto, myydyt tuotteet sekä maksu ja arvonlisävero verokannoittain.',
          'Kirjanpitolain mukaan käteismaksut on kirjattava viipymättä ja päiväkohtaisessa järjestyksessä, ja jokaisen kirjauksen on perustuttava tositteeseen.',
          'Kassan päivittäinen Z-raportti on päivän myyntitosite. Siitä näkyvät myynti verokannoittain sekä maksutavat: käteinen, kortti, lounassetelit ja muut.',
          'Laske kassa joka päivä ja kirjaa kassaerot. Käteisen talletukset pankkiin ja käteisellä maksetut ostot kirjataan omilla tositteillaan.',
          'Yhdistä maksupääte kassaan ja täsmäytä korttimyynnin tilitykset pankkitiliin. Korttimaksujen palvelumaksut ovat kulua.',
          'Säilytä tositteet vähintään kuusi vuotta sen vuoden lopusta, jonka aikana tilikausi päättyi.',
        ] },
        { t: 'h3', x: 'Juomarahat' },
        { t: 'p', x: 'Vapaaehtoinen tippi, joka maksetaan suoraan henkilökunnalle, ei kuulu ravintolan myynnin veron perusteeseen, eikä siitä makseta arvonlisäveroa. Jos ravintola veloittaa palvelurahan asiakkaalta tämän tahdosta riippumatta, palveluraha on osa myyntiä ja siitä on maksettava arvonlisävero. Kun juomarahat maksetaan kortilla yrityksen tilille ja tilitetään henkilökunnalle, kirjaa ne erikseen ja sovi niiden käsittelystä palkanlaskennassa kirjanpitäjäsi kanssa.' },
        { t: 'h2', x: 'Henkilökunnan ateriat' },
        { t: 'p', x: 'Hotelli- ja ravintola-alan henkilökunnan ravintoedun verotusarvo on vuonna 2026 7,48 euroa ateriaa kohden ja vuonna 2027 7,65 euroa. Jos työntekijä maksaa ateriasta, maksu vähennetään edun arvosta. Etu on verotettavaa palkkaa, joka käsitellään palkanlaskennassa ja ilmoitetaan tulorekisteriin.' },
        { t: 'ul', items: [
          'Esimerkki: työntekijä syö kuukaudessa 20 ateriaa ilmaiseksi. Verotettavaa etua syntyy 20 × 7,48 = 149,60 euroa. Jos hän maksaa 3,00 euroa ateriaa kohden, etu on 20 × 4,48 = 89,60 euroa.',
          'Arvonlisävero: ilmaiseksi annetuista aterioista maksetaan oman käytön veroa 13,5 %. Itse valmistetun aterian veron peruste on välittömät ja välilliset kustannukset; välillisiksi kustannuksiksi voi halutessaan laskea 22 % välittömistä kustannuksista.',
          'Jos työntekijä maksaa vähintään ravintoedun arvon, ateria on tavallista myyntiä, ja arvonlisävero lasketaan hänen maksamastaan hinnasta. Jos hinta alittaa ravintoedun arvon, veron peruste korotetaan käypään markkina-arvoon.',
        ] },
        { t: 'h3', x: 'Yrittäjän omat ateriat ja ruoat kotiin' },
        { t: 'p', x: 'Jos toiminimiyrittäjä syö itse ravintolassa tai vie raaka-aineita kotiin, kyse on tavaroiden ottamisesta omaan käyttöön, ja siitä on maksettava arvonlisävero. Verohallinto pitää vähäisen oman käytön rajana noin 850 euroa vuodessa, jonka alittavasta käytöstä ei mene veroa. Huojennus koskee vain luonnollisia henkilöitä, ei osakeyhtiötä. Osakeyhtiössä omistajan ilmaiset ateriat ovat palkkaa tai muuta veronalaista etua.' },
        { t: 'h2', x: 'Varasto, hävikki ja pantit' },
        { t: 'ul', items: [
          'Raaka-aineiden ostot tukkuliikkeestä kirjataan ostoiksi. Elintarvikkeiden ja pöytäliinojen kaltaisten ravintolan hankintojen arvonlisäveron saa vähentää.',
          'Tilikauden lopussa varasto inventoidaan ja jäljellä olevan vaihto-omaisuuden hankintameno aktivoidaan taseeseen. Jos varaston todennäköinen hankinta- tai myyntihinta on hankintamenoa pienempi, erotus kirjataan kuluksi (KPL 5:6).',
          'Hävikki, kuten pilaantuneet tai poisheitetyt raaka-aineet, kannattaa merkitä hävikkilistaan päivämäärineen. Ilman sitä myynnin ja ostojen välistä eroa on vaikea selittää verotarkastuksessa.',
          'Pullopantit kirjataan erikseen: ostolaskussa pantin osuus on 25,5 %:n kannassa, ja palautetuista pulloista saatu hyvitys vähentää ostoja.',
        ] },
        { t: 'h2', x: 'Työntekijät' },
        { t: 'p', x: 'Ravintola-alalla on oma työehtosopimus, josta tulevat palkat, lisät ja työajat. Palkat ilmoitetaan tulorekisteriin, ja työnantajan maksut maksetaan verotilin kautta. Näitä käsittelemme oppaissamme Ensimmäinen työntekijä, Palkanlaskenta ja Palkkailmoitus tulorekisteriin.' },
        { t: 'h2', x: 'Kuukauden kirjanpito: mitä toimitetaan' },
        { t: 'ul', items: [
          'Kassan Z-raportit jokaiselta päivältä sekä kuukauden yhteenveto verokannoittain.',
          'Maksupäätteen tilitykset ja korttimaksujen palvelumaksulaskut.',
          'Käteisen laskennat, kassaerot ja pankkitalletukset.',
          'Ruokalähettialustojen tilitysraportit ja palkkiolaskut kaikilta tilityskausilta.',
          'Ostolaskut ja kuitit tukkuliikkeistä, alkoholin ja juomien toimittajilta sekä vuokra-, sähkö- ja laitekulut.',
          'Pankkitilin tiliote kokonaisuudessaan.',
          'Henkilökunnan ateriat, juomarahojen tilitykset ja työtunnit palkanlaskentaa varten.',
          'Tilikauden lopussa varastoinventaario ja hävikkilista.',
        ] },
        { t: 'h2', x: 'Esimerkki euroina' },
        { t: 'p', x: 'Alv-rekisterissä oleva pizzeria myy yhden kuukauden aikana salissa, mukaan ja ruokalähettialustan kautta. Alusta toimii välittäjänä, ja sen palkkiolaskussa on Suomen arvonlisävero.' },
        { t: 'ul', items: [
          'Kassan ruokamyynti salissa ja mukaan 11 350,00 € (sis. alv 13,5 %): myynti 10 000,00 € ja arvonlisävero 1 350,00 €.',
          'Oluet ja viinit 2 510,00 € (sis. alv 25,5 %): myynti 2 000,00 € ja arvonlisävero 510,00 €.',
          'Asiakkaat maksoivat alustan kautta ruoasta 2 270,00 € (sis. alv 13,5 %): myynti 2 000,00 € ja arvonlisävero 270,00 €.',
          'Alusta pidätti palkkion 600,00 € + alv 25,5 % 153,00 € = 753,00 € ja tilitti pankkitilille 1 517,00 €.',
          'Raaka-aineet tukusta 4 540,00 € (sis. alv 13,5 %): veroton 4 000,00 € ja arvonlisävero 540,00 €. Alkoholijuomien ostot 1 255,00 € (sis. alv 25,5 %): veroton 1 000,00 € ja arvonlisävero 255,00 €.',
          'Kuukaudelta maksettava arvonlisävero: 1 350,00 + 510,00 + 270,00 − 153,00 − 540,00 − 255,00 = 1 182,00 €.',
        ] },
        { t: 'p', x: 'Jos oluet ja viinit olisi kirjattu ruoan 13,5 %:n kannalla, niiden veroksi olisi laskettu 298,55 € ja veroa olisi jäänyt maksamatta 211,45 €. Jos alustamyynnin vero olisi laskettu tilitetystä 1 517,00 eurosta, veroksi olisi tullut 180,44 € eli 89,56 € liian vähän.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Olut ja viini myydään kassassa ruoan 13,5 %:n kannalla, tai lounaan ja oluen yhteishintaa ei jaeta verokannoille.',
          'Vuoden 2026 myynnissä käytetään vielä 14 %:n kantaa, koska kassan verokantoja ei ole päivitetty.',
          'Käteismyyntiä ei kirjata joka päivä, kassaa ei lasketa tai Z-raportteja puuttuu.',
          'Maksupäätettä ei ole yhdistetty kassaan, ja korttimyynti ja kassan myynti eivät täsmää.',
          'Ruokalähettialustan myynti kirjataan tilitettynä nettosummana tai jätetään kokonaan kirjaamatta.',
          'Henkilökunnan ilmaisia aterioita ei käsitellä palkanlaskennassa ravintoetuna eikä arvonlisäverotuksessa omana käyttönä.',
          'Pakollinen palveluraha jätetään arvonlisäveron ulkopuolelle.',
          'Varastoa ei inventoida tilikauden lopussa, jolloin tulos vääristyy.',
        ] },
        { t: 'note', x: 'Tiedot on tarkistettu marraskuussa 2026: elintarvikkeiden sekä ravintola- ja ateriapalvelujen arvonlisävero 13,5 % (14 % vuonna 2025), alkoholi- ja tupakkatuotteet ja pullopantit 25,5 %, kuitintarjoamisvelvollisuuden raja 10 000 euroa, alv-rekisteröinnin raja 20 000 euroa kalenterivuodessa ja hotelli- ja ravintola-alan henkilökunnan ravintoetu 7,48 euroa vuonna 2026 ja 7,65 euroa vuonna 2027. Ruokalähettialustojen sopimukset vaihtelevat, joten tarkista oma tilitysraporttisi ja palkkiolaskusi. Lähteet: arvonlisäverolaki (1501/1993), kirjanpitolaki (1336/1997), laki kuitintarjoamisvelvollisuudesta käteiskaupassa (658/2013), elintarvikelaki (297/2021), alkoholilaki (1102/2017) ja Verohallinto.' },
        { t: 'h2', x: 'Autamme ravintoloita ja kahviloita' },
        { t: 'p', x: 'Tilitoimisto Debit Credit hoitaa ravintoloiden, kahviloiden, pizzerioiden ja kebab-paikkojen kirjanpidon ja alv-ilmoitukset: kirjaamme Z-raportit ja ruokalähettialustojen tilitykset oikeille verokannoille, täsmäytämme kassan, maksupäätteen ja pankin sekä käsittelemme henkilökunnan ateriat palkanlaskennassa. Asiakkaamme voivat toimittaa kuitit ja raportit Vaavo-sovelluksen kautta. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä jo ennen avaamista, niin kassa, verokannat ja rekisteröinnit ovat kunnossa ensimmäisestä päivästä.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: arvonlisäveroprosentit', href: SRC.ratesFi },
          { label: 'Verohallinto: arvonlisäverovelvollisen opas (ravintolapalvelut, pullopantit, juomarahat)', href: SRC.vatGuide },
          { label: 'Verohallinto: komissiokaupan ja välitystoiminnan arvonlisäverotus', href: SRC.intermediary },
          { label: 'Verohallinto: kuitintarjoamisvelvollisuus käteiskaupassa', href: SRC.receiptFi },
          { label: 'Verohallinto: valvonta paljasti ravintoloista väärinkäytöksiä (tiedote 4.6.2024)', href: SRC.auditNews },
          { label: 'Verohallinto: henkilöstöruokailun arvonlisäverotus', href: SRC.staffMealsVat },
          { label: 'Verohallinto: luontoisetujen laskentaperusteet vuodelle 2026', href: SRC.benefits2026Fi },
          { label: 'Verohallinto: tavaran tai palvelun ottaminen omaan käyttöön', href: SRC.ownUseFi },
          { label: 'Finlex: arvonlisäverolaki (1501/1993)', href: SRC.avl },
          { label: 'Finlex: kirjanpitolaki (1336/1997)', href: SRC.kpl },
          { label: 'Finlex: laki kuitintarjoamisvelvollisuudesta käteiskaupassa (658/2013)', href: SRC.receiptAct },
        ] },
      ],
      faq: [
        { q: 'Mikä on ravintolaruoan arvonlisävero vuonna 2026?', a: 'Ravintola- ja ateriapalvelujen sekä elintarvikkeiden arvonlisävero on 1.1.2026 alkaen 13,5 %. Vuonna 2025 se oli 14 %. Alkoholijuomat ja tupakkatuotteet ovat aina 25,5 %:n kannassa, myös ravintolassa tarjoiltuina.' },
        { q: 'Onko mukaan myyty ruoka eri verokannassa kuin salissa syöty?', a: 'Ei. Mukaan myyty ruoka on elintarvikkeen myyntiä ja salissa tarjoiltu ruoka ravintolapalvelua, mutta molempiin sovelletaan 13,5 %:n verokantaa. Mukaan myyty alkoholi on 25,5 %.' },
        { q: 'Miten lounaan ja oluen yhteishinta jaetaan?', a: 'Hinta jaetaan 13,5 %:n ruokaosuuteen ja 25,5 %:n alkoholiosuuteen, koska yksi yhteinen hinta ei muuta tuotteiden verokantoja. Perusteltu tapa on jakaa hinta tuotteiden tavanomaisten erillishintojen suhteessa ja määrittää jako kassaan valmiiksi.' },
        { q: 'Ilmoitetaanko Woltin kautta myydyn ruoan arvonlisävero tilityksestä vai asiakkaan maksamasta hinnasta?', a: 'Kun ravintola on ruoan myyjä ja alusta välittäjä, vero ilmoitetaan asiakkaiden maksamasta koko ruoan hinnasta. Alustan palkkio on erillinen kulu, jonka arvonlisävero käsitellään palkkiolaskun mukaan.' },
        { q: 'Tarvitseeko ravintola sertifioidun kassakoneen?', a: 'Suomessa ei ole yleistä sertifioidun kassajärjestelmän vaatimusta. Yli 10 000 euron liikevaihdolla asiakkaalle on kuitenkin tarjottava kuitti käteis- ja korttimaksuista, ja kirjanpitolain mukaan käteismaksut on kirjattava viipymättä. Käytännössä luotettava kassa, päivittäiset Z-raportit ja kassaan yhdistetty maksupääte ovat välttämättömiä.' },
      ],
    },
    ru: {
      title: 'Бухгалтерия и НДС ресторана и кафе в Финляндии 2026: касса, Wolt и питание персонала',
      description:
        'Бухгалтерия ресторана и кафе в Финляндии в 2026 году: еда 13,5 %, алкоголь 25,5 %, комплексная цена, отчёты Wolt, касса и Z-отчёты, питание персонала.',
      lead: 'Пиццерию, кебаб, кафе или фудтрак в Финляндии часто открывают как toiminimi или небольшое osakeyhtiö. В бухгалтерии всё решают правильные ставки НДС, учёт каждого кассового дня, отчёты платформ доставки и питание персонала. Мы собрали правила 2026 года, документы за месяц, типичные ошибки и пример в евро.',
      body: [
        { t: 'h2', x: 'Коротко об уведомлениях и лицензиях' },
        { t: 'p', x: 'До открытия подайте уведомление о регистрации (perustamisilmoitus): вы получите Y-tunnus и сможете сразу встать в реестр предоплаты (ennakkoperintärekisteri) и в реестр плательщиков НДС. Регистрация плательщиком НДС обязательна, когда оборот превышает 20 000 евро за календарный год. Ресторан обычно быстро переходит этот порог, и многие регистрируются с самого начала, чтобы вычитать НДС с мебели, оборудования и продуктов.' },
        { t: 'p', x: 'По закону о продуктах питания (elintarvikelaki 297/2021) о пищевой деятельности нужно уведомить муниципальный пищевой надзор (kunnan elintarvikevalvonta) не позднее чем за четыре недели до начала или существенного изменения деятельности. Для подачи алкоголя нужна лицензия (anniskelulupa), которую с 1.1.2026 выдаёт Lupa- ja valvontavirasto (раньше — региональные управления AVI и Valvira).' },
        { t: 'h2', x: 'Ставки НДС в 2026 году' },
        { t: 'p', x: 'С 1.1.2026 пониженная ставка НДС снизилась с 14 % до 13,5 % (AVL 85 §). Она применяется и к продаже продуктов питания, и к ресторанным услугам и услугам питания. Общая ставка — 25,5 % (AVL 84 §). Важна дата продажи: к продажам 2025 года применялась ставка 14 %.' },
        { t: 'ul', items: [
          'Блюда, обеды, шведский стол и продукция кафе: 13,5 %.',
          'Безалкогольные напитки, кофе, чай, газировка, сладости и мороженое — это продукты питания: 13,5 %.',
          'Водопроводная вода, поданная в ресторане, например графин на столе: 13,5 % (просто продажа водопроводной воды облагалась бы по 25,5 %).',
          'Пиво, сидр, вино и другие алкогольные напитки: всегда 25,5 %, даже когда их подают к еде. Безалкогольное пиво, которое не является алкогольным напитком по закону об акцизе на алкоголь, считается продуктом питания.',
          'Табачные изделия: 25,5 %.',
          'Залог за бутылки (pullopantti) и другие залоги за возвратную тару: 25,5 %, даже если сам напиток облагается по 13,5 %.',
          'Прочие товары, например игрушки, посуда и сувенирная продукция: 25,5 %.',
        ] },
        { t: 'h3', x: 'В зале или навынос' },
        { t: 'p', x: 'Ресторанная услуга — это обслуживание в помещении продавца, куда входят, например, сервировка, столы и уборка посуды. Когда еду продают навынос без этих услуг, это продажа продуктов питания. В Финляндии в обоих случаях действует одна и та же ставка 13,5 %, поэтому пицца навынос и пицца в зале облагаются одинаково. Алкоголь в обоих случаях облагается по 25,5 %.' },
        { t: 'h3', x: 'Комплексная цена: обед с пивом, меню с винным сопровождением' },
        { t: 'p', x: 'По разъяснению налоговой (Verohallinto) налоговый режим каждого товара в принципе определяется отдельно, и единая цена этого не меняет (принцип разделения, jakamisperiaate). Высший административный суд в деле KHO 2022:58 решил, что к бургеру, гарниру и напитку в детском меню фастфуда применяется пониженная ставка, а к игрушке в этом меню — общая.' },
        { t: 'p', x: 'Если вы продаёте обед с пивом или меню с вином по одной цене, её нужно разделить на часть по 13,5 % и часть по 25,5 %. Обязательной формулы в разъяснении нет. Понятный и обоснованный способ — делить цену пропорционально обычным отдельным ценам блюд и напитков и заранее настроить это разделение в кассе, чтобы Z-отчёт показывал продажи правильно по ставкам. Шведский стол, в цену которого входят только еда и безалкогольные напитки, полностью облагается по 13,5 %.' },
        { t: 'h3', x: 'Собственная доставка' },
        { t: 'p', x: 'Когда ресторан продаёт еду с доставкой и выставляет клиенту счёт и за еду, и за доставку, вся продажа облагается по ставке блюда — 13,5 %. Это так, развозит ли еду собственный персонал или нанятая рестораном транспортная компания. Транспортная компания выставляет ресторану счёт за свою услугу по ставке 25,5 %.' },
        { t: 'h2', x: 'Wolt, Foodora и другие платформы доставки' },
        { t: 'p', x: 'Сначала проверьте по условиям платформы и по чеку клиента, кто продаёт еду. Если продавец — ресторан, а платформа — посредник, ресторан декларирует НДС со всей цены еды, которую заплатили клиенты, а удержанная платформой комиссия из продаж не вычитается. Если платформа берёт с клиента плату за доставку от своего имени, это собственная продажа платформы, и в продажи ресторана она не входит.' },
        { t: 'ul', items: [
          'Комиссия платформы — отдельный расход. По разъяснению налоговой посредник начисляет на свою комиссию НДС по общей ставке 25,5 %, даже если еда облагается по 13,5 %.',
          'Если в счёте за комиссию указан финский НДС, ресторан, состоящий в реестре НДС, вычитает его как обычно.',
          'Если иностранная платформа выставляет счёт без финского НДС, ресторан сам уплачивает налог по обратному начислению (käännetty verovelvollisuus) и вычитает его в декларации того же периода.',
          'Отчёт платформы о выплатах — документ продаж: в нём видны суммы, оплаченные клиентами, комиссии, возвраты и перечисленная сумма. Сверяйте каждую выплату с банковским счётом.',
        ] },
        { t: 'p', x: 'Весной 2023 года налоговая начала усиленные проверки пиццерий и кебабных. Чуть больше чем за год она провела 174 налоговые проверки и подала заявления в полицию примерно на 40 предпринимателей. Среди находок — наличная выручка, отсутствующая в бухгалтерии, платёжные терминалы, не подключённые к кассе, и значительные суммы непроведённых продаж через службы доставки еды.' },
        { t: 'h2', x: 'Касса, чек и наличные' },
        { t: 'p', x: 'В Финляндии нет общей обязанности использовать кассовую систему, утверждённую или сертифицированную властями. Но закон об обязанности предлагать чек при торговле за наличные (Laki kuitintarjoamisvelvollisuudesta käteiskaupassa 658/2013) обязывает предприятие с оборотом за финансовый год более 10 000 евро предлагать клиенту чек, когда тот платит наличными или картой. Чек может быть и электронным. Закон не применяется к торговле на рынках и площадях под открытым небом, за исключением розничной продажи и подачи алкоголя. Это исключение может касаться фудтрака на уличном рынке, поэтому уточните его у своего бухгалтера. За нарушение может быть назначен штраф (laiminlyöntimaksu) от 300 до 1 000 евро.' },
        { t: 'ul', items: [
          'В чеке должны быть название, контактные данные и Y-tunnus предприятия, дата, номер чека или другой идентификатор, проданные товары, а также сумма оплаты и НДС по ставкам.',
          'По закону о бухгалтерском учёте наличные платежи нужно проводить без промедления и в хронологическом порядке по дням, а каждая проводка должна основываться на документе.',
          'Ежедневный Z-отчёт кассы — документ продаж за день. В нём видны продажи по ставкам НДС и способы оплаты: наличные, карта, обеденные ваучеры и прочее.',
          'Пересчитывайте кассу каждый день и проводите кассовые расхождения. Сдача наличных в банк и покупки за наличные проводятся по отдельным документам.',
          'Подключите платёжный терминал к кассе и сверяйте выплаты по картам с банковским счётом. Комиссии за приём карт — это расход.',
          'Храните документы не менее шести лет с конца года, в котором закончился финансовый год.',
        ] },
        { t: 'h3', x: 'Чаевые' },
        { t: 'p', x: 'Добровольные чаевые, которые платят напрямую персоналу, не входят в налоговую базу продаж ресторана, и НДС с них не уплачивается. Если ресторан берёт с клиента плату за обслуживание независимо от его желания, эта плата является частью продаж и облагается НДС. Если чаевые платят картой на счёт предприятия и затем передают персоналу, проводите их отдельно и согласуйте их оформление в расчёте зарплаты со своим бухгалтером.' },
        { t: 'h2', x: 'Питание персонала' },
        { t: 'p', x: 'Налоговая стоимость питания (ravintoetu) для персонала гостиниц и ресторанов в 2026 году — 7,48 евро за приём пищи, в 2027 году — 7,65 евро. Если работник платит за еду, его плата вычитается из стоимости льготы. Льгота — облагаемая зарплата: её проводят в расчёте зарплаты и подают в реестр доходов (tulorekisteri).' },
        { t: 'ul', items: [
          'Пример: работник бесплатно ест 20 раз в месяц. Облагаемая льгота составляет 20 × 7,48 = 149,60 евро. Если он платит по 3,00 евро за обед, льгота равна 20 × 4,48 = 89,60 евро.',
          'НДС: с бесплатно выданных обедов уплачивается НДС на собственное потребление по ставке 13,5 %. Для приготовленной самим рестораном еды база — прямые и косвенные расходы; косвенные расходы можно по желанию принять равными 22 % от прямых.',
          'Если работник платит не меньше стоимости льготы, обед — обычная продажа, и НДС считается с уплаченной им цены. Если цена ниже стоимости льготы, налоговая база НДС повышается до рыночной стоимости.',
        ] },
        { t: 'h3', x: 'Еда самого предпринимателя и продукты домой' },
        { t: 'p', x: 'Если предприниматель toiminimi сам ест в ресторане или забирает продукты домой, это изъятие товаров для собственного потребления, и с него нужно уплатить НДС. Налоговая считает порогом незначительного собственного потребления примерно 850 евро в год: ниже него налог не взимается. Это послабление действует только для физических лиц, не для osakeyhtiö. В osakeyhtiö бесплатная еда владельца — это зарплата или иная облагаемая выгода.' },
        { t: 'h2', x: 'Склад, списания и залоги' },
        { t: 'ul', items: [
          'Закупки продуктов у оптовика проводятся как покупки. НДС с таких закупок ресторана, как продукты и скатерти, можно вычесть.',
          'В конце финансового года проводят инвентаризацию, и стоимость приобретения оставшихся запасов переносится в баланс. Если вероятная цена приобретения или продажи запасов ниже стоимости приобретения, разница списывается в расходы (KPL 5:6).',
          'Списания (hävikki), например испорченные или выброшенные продукты, лучше записывать в журнал списаний с датами. Без него разницу между продажами и закупками трудно объяснить при налоговой проверке.',
          'Залоги за бутылки проводятся отдельно: в счёте поставщика доля залога облагается по 25,5 %, а возмещение за сданные бутылки уменьшает закупки.',
        ] },
        { t: 'h2', x: 'Работники' },
        { t: 'p', x: 'В ресторанной отрасли действует свой коллективный договор (työehtosopimus), который определяет зарплаты, надбавки и рабочее время. Зарплаты подают в реестр доходов (tulorekisteri), а взносы работодателя уплачивают через налоговый счёт (verotili). Об этом — в наших руководствах Ensimmäinen työntekijä, Palkanlaskenta и Palkkailmoitus tulorekisteriin.' },
        { t: 'h2', x: 'Бухгалтерия за месяц: что передавать' },
        { t: 'ul', items: [
          'Z-отчёты кассы за каждый день и сводку за месяц по ставкам НДС.',
          'Выплаты по платёжному терминалу и счета за комиссии за приём карт.',
          'Пересчёты наличных, кассовые расхождения и сдачу наличных в банк.',
          'Отчёты о выплатах и счета за комиссии платформ доставки за все периоды.',
          'Счета и чеки оптовиков, поставщиков алкоголя и напитков, а также расходы на аренду, электричество и оборудование.',
          'Полную выписку по банковскому счёту.',
          'Данные о питании персонала, выплатах чаевых и рабочих часах для расчёта зарплаты.',
          'В конце финансового года — инвентаризацию склада и журнал списаний.',
        ] },
        { t: 'h2', x: 'Пример в евро' },
        { t: 'p', x: 'Пиццерия, состоящая в реестре НДС, за месяц продаёт в зале, навынос и через платформу доставки. Платформа выступает посредником, и в её счёте за комиссию указан финский НДС.' },
        { t: 'ul', items: [
          'Продажи еды по кассе в зале и навынос 11 350,00 € (вкл. НДС 13,5 %): продажи 10 000,00 € и НДС 1 350,00 €.',
          'Пиво и вино 2 510,00 € (вкл. НДС 25,5 %): продажи 2 000,00 € и НДС 510,00 €.',
          'Клиенты заплатили за еду через платформу 2 270,00 € (вкл. НДС 13,5 %): продажи 2 000,00 € и НДС 270,00 €.',
          'Платформа удержала комиссию 600,00 € + НДС 25,5 % 153,00 € = 753,00 € и перечислила на банковский счёт 1 517,00 €.',
          'Продукты у оптовика 4 540,00 € (вкл. НДС 13,5 %): без НДС 4 000,00 € и НДС 540,00 €. Закупки алкогольных напитков 1 255,00 € (вкл. НДС 25,5 %): без НДС 1 000,00 € и НДС 255,00 €.',
          'НДС к уплате за месяц: 1 350,00 + 510,00 + 270,00 − 153,00 − 540,00 − 255,00 = 1 182,00 €.',
        ] },
        { t: 'p', x: 'Если бы пиво и вино провели по ставке еды 13,5 %, налог с них составил бы 298,55 €, и недоплата была бы 211,45 €. Если бы НДС с продаж через платформу посчитали с перечисленных 1 517,00 евро, налог составил бы 180,44 €, то есть на 89,56 € меньше положенного.' },
        { t: 'h2', x: 'Типичные ошибки' },
        { t: 'ul', items: [
          'Пиво и вино проводятся в кассе по ставке еды 13,5 %, или комплексная цена обеда с пивом не делится по ставкам.',
          'В продажах 2026 года всё ещё применяется ставка 14 %, потому что ставки в кассе не обновили.',
          'Наличная выручка не проводится каждый день, касса не пересчитывается или не хватает Z-отчётов.',
          'Платёжный терминал не подключён к кассе, и продажи по картам не сходятся с кассой.',
          'Продажи через платформу доставки проводятся нетто-суммой выплаты или не проводятся вовсе.',
          'Бесплатное питание персонала не оформляется в зарплате как льгота и не облагается НДС как собственное потребление.',
          'Обязательная плата за обслуживание не облагается НДС.',
          'В конце года не проводится инвентаризация, и результат искажается.',
        ] },
        { t: 'note', x: 'Данные проверены в ноябре 2026 года: НДС на продукты питания и ресторанные услуги 13,5 % (14 % в 2025 году), алкоголь, табак и залог за бутылки 25,5 %, порог обязанности предлагать чек 10 000 евро, порог регистрации плательщиком НДС 20 000 евро за календарный год, стоимость питания персонала гостиниц и ресторанов 7,48 евро в 2026 году и 7,65 евро в 2027 году. Договоры платформ доставки различаются, поэтому проверяйте свой отчёт о выплатах и счёт за комиссию. Источники: закон об НДС (1501/1993), закон о бухгалтерском учёте (1336/1997), закон об обязанности предлагать чек (658/2013), закон о продуктах питания (297/2021), закон об алкоголе (1102/2017) и Verohallinto.' },
        { t: 'h2', x: 'Мы помогаем ресторанам и кафе' },
        { t: 'p', x: 'Tilitoimisto Debit Credit ведёт бухгалтерию ресторанов, кафе, пиццерий и кебабных и подаёт декларации по НДС: проводим Z-отчёты и выплаты платформ доставки по правильным ставкам, сверяем кассу, терминал и банк и оформляем питание персонала в расчёте зарплаты. Наши клиенты могут отправлять чеки и отчёты через приложение Vaavo. Мы работаем на финском и русском языках. Свяжитесь с нами ещё до открытия, чтобы касса, ставки НДС и регистрации были в порядке с первого дня.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Verohallinto: ставки НДС (на английском)', href: SRC.ratesEn },
          { label: 'Verohallinto: руководство для плательщика НДС — ресторанные услуги, залоги, чаевые (на финском)', href: SRC.vatGuide },
          { label: 'Verohallinto: НДС при комиссионной торговле и посредничестве (на финском)', href: SRC.intermediary },
          { label: 'Verohallinto: обязанность предлагать чек (на английском)', href: SRC.receiptEn },
          { label: 'Verohallinto: проверки ресторанов выявили нарушения, пресс-релиз 4.6.2024 (на финском)', href: SRC.auditNews },
          { label: 'Verohallinto: НДС при питании персонала (на финском)', href: SRC.staffMealsVat },
          { label: 'Verohallinto: стоимость натуральных льгот на 2026 год (на английском)', href: SRC.benefits2026En },
          { label: 'Verohallinto: изъятие товаров и услуг для собственного потребления (на английском)', href: SRC.ownUseEn },
          { label: 'Finlex: закон об НДС (1501/1993)', href: SRC.avl },
          { label: 'Finlex: закон о бухгалтерском учёте (1336/1997)', href: SRC.kpl },
          { label: 'Finlex: закон об обязанности предлагать чек при торговле за наличные (658/2013)', href: SRC.receiptAct },
        ] },
      ],
      faq: [
        { q: 'Какая ставка НДС на ресторанную еду в 2026 году?', a: 'С 1.1.2026 НДС на ресторанные услуги, услуги питания и продукты питания составляет 13,5 %. В 2025 году ставка была 14 %. Алкогольные напитки и табак всегда облагаются по 25,5 %, в том числе когда их подают в ресторане.' },
        { q: 'Отличается ли ставка для еды навынос и еды в зале?', a: 'Нет. Еда навынос — это продажа продуктов питания, а еда в зале — ресторанная услуга, но в обоих случаях ставка 13,5 %. Алкоголь навынос облагается по 25,5 %.' },
        { q: 'Как разделить комплексную цену обеда с пивом?', a: 'Цену делят на часть еды по 13,5 % и часть алкоголя по 25,5 %, потому что единая цена не меняет ставки товаров. Обоснованный способ — делить пропорционально обычным отдельным ценам и заранее настроить разделение в кассе.' },
        { q: 'НДС с продаж через Wolt считается с выплаты или с цены, которую заплатил клиент?', a: 'Если продавец еды — ресторан, а платформа — посредник, НДС декларируется со всей цены еды, которую заплатили клиенты. Комиссия платформы — отдельный расход, НДС с которого учитывается по счёту за комиссию.' },
        { q: 'Нужен ли ресторану сертифицированный кассовый аппарат?', a: 'В Финляндии нет общего требования к сертифицированной кассовой системе. Но при обороте более 10 000 евро клиенту нужно предлагать чек при оплате наличными и картой, а по закону о бухгалтерском учёте наличные платежи проводятся без промедления. На практике без надёжной кассы, ежедневных Z-отчётов и подключённого к кассе терминала не обойтись.' },
      ],
    },
    en: {
      title: 'Restaurant and café bookkeeping and VAT rates in Finland 2026: till, Wolt and staff meals',
      description:
        'Restaurant and café bookkeeping in Finland 2026: food 13.5%, alcohol 25.5%, splitting combined prices, Wolt settlements, the till and Z reports, staff meals.',
      lead: 'A pizzeria, kebab shop, café or food truck in Finland is often started as a sole trader (toiminimi) or a small limited company (osakeyhtiö). The bookkeeping turns on the right VAT rates, recording every till day, the settlements from food delivery platforms and staff meals. Here are the 2026 rules, the monthly paperwork, the most common mistakes and a worked example in euros.',
      body: [
        { t: 'h2', x: 'Notifications and licences in brief' },
        { t: 'p', x: 'Before opening, file a start-up notification (perustamisilmoitus) to get a Business ID (Y-tunnus); in the same notification you can register for prepayment and in the VAT register. VAT registration is mandatory once turnover exceeds €20,000 in a calendar year. A restaurant usually passes that quickly, and many register from day one so they can deduct the VAT on furniture, equipment and ingredients.' },
        { t: 'p', x: 'Under the Food Act (elintarvikelaki 297/2021), food business operations must be notified to the municipal food control authority at least four weeks before they start or change significantly. Serving alcohol requires a licence (anniskelulupa), which since 1 January 2026 is granted by the Permit and Supervision Agency (Lupa- ja valvontavirasto), replacing the regional state administrative agencies and Valvira.' },
        { t: 'h2', x: 'VAT rates in 2026' },
        { t: 'p', x: 'From 1 January 2026, the reduced VAT rate fell from 14% to 13.5% (VAT Act section 85). It applies both to sales of foodstuffs and to restaurant and catering services. The general rate is 25.5% (section 84). The date of the sale decides the rate, so 2025 sales were at 14%.' },
        { t: 'ul', items: [
          'Dishes, lunch, buffet and café products: 13.5%.',
          'Non-alcoholic drinks, coffee, tea, soft drinks, sweets and ice cream are foodstuffs: 13.5%.',
          'Tap water served in a restaurant, for example a water jug on the table: 13.5% (selling tap water as such would be 25.5%).',
          'Beer, cider, wine and other alcoholic beverages: always 25.5%, even when served with food. Alcohol-free beer that is not an alcoholic beverage under the alcohol excise act is a foodstuff.',
          'Tobacco products: 25.5%.',
          'Bottle deposits (pullopantti) and other deposits on returnable packaging: 25.5%, even when the drink itself is at 13.5%.',
          'Other goods such as toys, tableware and merchandise: 25.5%.',
        ] },
        { t: 'h3', x: 'Eat-in or takeaway' },
        { t: 'p', x: 'A restaurant service is serving on the seller’s premises and includes things like table setting, tables and clearing dishes. When food is sold to take away without these services, it is a sale of foodstuffs. In Finland both are at the same 13.5% rate, so a takeaway pizza and a pizza eaten in are taxed alike. Alcohol is 25.5% in both cases.' },
        { t: 'h3', x: 'One price for several items: lunch with a beer, a menu with wine pairing' },
        { t: 'p', x: 'According to the Tax Administration, the VAT treatment of each item is in principle decided separately, and a single combined price does not change this (the separation principle). In KHO 2022:58 the Supreme Administrative Court held that in a fast-food children’s meal the burger, side and drink were at the reduced rate but the toy was at the general rate.' },
        { t: 'p', x: 'If you sell lunch with a beer or a menu with wine for one price, the price must therefore be split into a 13.5% part and a 25.5% part. The guidance gives no single mandatory formula. A clear method you can justify is to split the price in proportion to the items’ normal separate prices and set the split up in the till in advance, so the Z report shows sales correctly by rate. A buffet whose price covers only food and non-alcoholic drinks is entirely at 13.5%.' },
        { t: 'h3', x: 'Your own home delivery' },
        { t: 'p', x: 'When a restaurant sells food with home delivery and charges the customer for both, the whole sale is at the meal rate of 13.5%. This applies whether the restaurant’s own staff deliver or the restaurant hires a delivery company. The delivery company invoices the restaurant for its own service at 25.5%.' },
        { t: 'h2', x: 'Wolt, Foodora and other delivery platforms' },
        { t: 'p', x: 'First check from the platform’s terms and the customer’s receipt who sells the food. When the restaurant is the seller and the platform acts as an intermediary, the restaurant reports VAT on the full food price the customers paid, and the fee the platform keeps is not deducted from sales. If the platform charges the customer a delivery fee in its own name, that is the platform’s own sale and not part of the restaurant’s sales.' },
        { t: 'ul', items: [
          'The platform fee is a separate expense. According to the Tax Administration, an intermediary charges VAT on its fee at the general 25.5% rate, even when the food is at 13.5%.',
          'If the fee invoice shows Finnish VAT, a VAT-registered restaurant deducts it as usual.',
          'If a foreign platform invoices without Finnish VAT, the restaurant pays the VAT itself under the reverse charge and deducts it in the return for the same period.',
          'The platform’s settlement report is a sales voucher: it shows the prices customers paid, fees, refunds and the amount paid out. Reconcile every payout with the bank account.',
        ] },
        { t: 'p', x: 'In spring 2023 the Tax Administration started intensified checks on pizzerias and kebab restaurants. In just over a year it carried out 174 tax audits and reported around 40 operators to the police. Findings included cash sales missing from the books, card terminals not connected to the till and significant unrecorded sales made through food delivery companies.' },
        { t: 'h2', x: 'Till, receipts and cash' },
        { t: 'p', x: 'Finland has no general obligation to use an officially approved or certified cash register system. However, the Act on the obligation to offer a receipt in cash sales (658/2013) requires a business with turnover above €10,000 per financial year to offer the customer a receipt when they pay in cash or by card. The receipt can also be electronic. The Act does not apply to market and square trading outdoors, except for the retail sale and serving of alcoholic beverages. This exception may cover a food truck at an outdoor market, so check it with your accountant. Failing to do so can lead to a penalty of €300–1,000.' },
        { t: 'ul', items: [
          'The receipt must show the business’s name, contact details and Business ID, the date, a receipt number or other identifier, the goods sold, and the amount paid and VAT by rate.',
          'Under the Accounting Act, cash payments must be recorded without delay and in day-by-day order, and every entry must be based on a voucher.',
          'The till’s daily Z report is the voucher for the day’s sales. It shows sales by VAT rate and by payment method: cash, card, lunch vouchers and others.',
          'Count the till every day and record cash differences. Cash deposits to the bank and purchases paid in cash are recorded with their own vouchers.',
          'Connect the card terminal to the till and reconcile card settlements with the bank account. Card acquiring fees are an expense.',
          'Keep the vouchers for at least six years from the end of the year in which the financial year ended.',
        ] },
        { t: 'h3', x: 'Tips' },
        { t: 'p', x: 'A voluntary tip paid directly to the staff is not part of the restaurant’s taxable sales, and no VAT is due on it. If the restaurant charges a service charge regardless of the customer’s wishes, the charge is part of the sale and VAT is due on it. When tips are paid by card into the company’s account and passed on to the staff, record them separately and agree with your accountant how they are handled in payroll.' },
        { t: 'h2', x: 'Staff meals' },
        { t: 'p', x: 'The taxable value of a meal benefit for hotel and restaurant staff is €7.48 per meal in 2026 and €7.65 in 2027. If the employee pays for the meal, the payment is deducted from the benefit value. The benefit is taxable pay, processed in payroll and reported to the Incomes Register (tulorekisteri).' },
        { t: 'ul', items: [
          'Example: an employee eats 20 free meals a month. The taxable benefit is 20 × €7.48 = €149.60. If they pay €3.00 per meal, the benefit is 20 × €4.48 = €89.60.',
          'VAT: on meals given free of charge, VAT on own use is due at 13.5%. For meals the restaurant makes itself, the tax base is the direct and indirect costs; you may choose to put the indirect costs at 22% of the direct costs.',
          'If the employee pays at least the benefit value, the meal is an ordinary sale and VAT is calculated on the price they paid. If the price is below the benefit value, the VAT base is raised to fair market value.',
        ] },
        { t: 'h3', x: 'The owner’s own meals and food taken home' },
        { t: 'p', x: 'If a sole trader eats at the restaurant or takes ingredients home, the goods are taken for own use and VAT is due. The Tax Administration treats about €850 a year as minor own use on which no VAT is due. This relief applies only to natural persons, not to a limited company. In a limited company, the owner’s free meals are salary or another taxable benefit.' },
        { t: 'h2', x: 'Stock, waste and deposits' },
        { t: 'ul', items: [
          'Ingredients bought from a wholesaler are booked as purchases. The VAT on restaurant purchases such as food and tablecloths is deductible.',
          'At the end of the financial year the stock is counted, and the acquisition cost of the remaining inventory is carried to the balance sheet. If the probable replacement cost or selling price of the stock is lower than its acquisition cost, the difference is expensed (Accounting Act 5:6).',
          'Keep a dated waste list for spoiled or discarded ingredients. Without it, the gap between sales and purchases is hard to explain in a tax audit.',
          'Book bottle deposits separately: on the supplier’s invoice the deposit is at 25.5%, and the credit for returned bottles reduces purchases.',
        ] },
        { t: 'h2', x: 'Employees' },
        { t: 'p', x: 'The restaurant sector has its own collective agreement, which sets wages, supplements and working hours. Wages are reported to the Incomes Register, and employer contributions are paid through the tax account (verotili). We cover these in our guides First employee, Payroll and Reporting wages to the Incomes Register.' },
        { t: 'h2', x: 'Monthly bookkeeping: what to send' },
        { t: 'ul', items: [
          'The till’s Z reports for every day and a monthly summary by VAT rate.',
          'Card terminal settlements and invoices for card acquiring fees.',
          'Cash counts, cash differences and bank deposits.',
          'Settlement reports and fee invoices from delivery platforms for every period.',
          'Purchase invoices and receipts from wholesalers and drinks suppliers, plus rent, electricity and equipment costs.',
          'The complete bank statement.',
          'Staff meals, tip payouts and working hours for payroll.',
          'At year-end, the stock count and the waste list.',
        ] },
        { t: 'h2', x: 'Worked example in euros' },
        { t: 'p', x: 'A VAT-registered pizzeria sells eat-in, takeaway and through a delivery platform during one month. The platform acts as an intermediary, and its fee invoice shows Finnish VAT.' },
        { t: 'ul', items: [
          'Food sales through the till, eat-in and takeaway, €11,350.00 (incl. 13.5% VAT): sales €10,000.00 and VAT €1,350.00.',
          'Beer and wine €2,510.00 (incl. 25.5% VAT): sales €2,000.00 and VAT €510.00.',
          'Customers paid €2,270.00 for food through the platform (incl. 13.5% VAT): sales €2,000.00 and VAT €270.00.',
          'The platform kept a fee of €600.00 + 25.5% VAT €153.00 = €753.00 and paid €1,517.00 into the bank account.',
          'Ingredients from the wholesaler €4,540.00 (incl. 13.5% VAT): net €4,000.00 and VAT €540.00. Alcoholic drinks purchased €1,255.00 (incl. 25.5% VAT): net €1,000.00 and VAT €255.00.',
          'VAT payable for the month: 1,350.00 + 510.00 + 270.00 − 153.00 − 540.00 − 255.00 = €1,182.00.',
        ] },
        { t: 'p', x: 'Had the beer and wine been put through at the 13.5% food rate, their VAT would have come to €298.55, leaving €211.45 unpaid. Had the platform sales VAT been calculated on the €1,517.00 payout, it would have been €180.44, or €89.56 too little.' },
        { t: 'h2', x: 'Most common mistakes' },
        { t: 'ul', items: [
          'Beer and wine are rung up at the 13.5% food rate, or the combined price of lunch and a beer is not split between the rates.',
          'Sales in 2026 still use the 14% rate because the till’s VAT rates were never updated.',
          'Cash sales are not recorded every day, the till is not counted or Z reports are missing.',
          'The card terminal is not connected to the till, and card sales and till sales do not match.',
          'Delivery platform sales are booked at the net payout or not booked at all.',
          'Free staff meals are not treated as a meal benefit in payroll or as own use for VAT.',
          'A compulsory service charge is left outside VAT.',
          'The stock is not counted at year-end, which distorts the result.',
        ] },
        { t: 'note', x: 'Checked in November 2026: VAT on foodstuffs and restaurant and catering services 13.5% (14% in 2025); alcohol, tobacco and bottle deposits 25.5%; receipt obligation threshold €10,000; VAT registration threshold €20,000 per calendar year; meal benefit for hotel and restaurant staff €7.48 in 2026 and €7.65 in 2027. Delivery platform contracts differ, so check your own settlement report and fee invoice. Sources: VAT Act (1501/1993), Accounting Act (1336/1997), Act on the obligation to offer a receipt in cash sales (658/2013), Food Act (297/2021), Alcohol Act (1102/2017) and the Tax Administration.' },
        { t: 'h2', x: 'We help restaurants and cafés' },
        { t: 'p', x: 'Tilitoimisto Debit Credit keeps the books and files the VAT returns for restaurants, cafés, pizzerias and kebab shops: we book Z reports and delivery platform settlements at the right rates, reconcile the till, the card terminal and the bank, and handle staff meals in payroll. Our clients can send their receipts and reports through the Vaavo app. We work in Finnish and Russian. Get in touch before you open, and your till, VAT rates and registrations will be in order from day one.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Tax Administration: rates of VAT', href: SRC.ratesEn },
          { label: 'Tax Administration: guide for VAT-liable businesses — restaurant services, deposits, tips (in Finnish)', href: SRC.vatGuide },
          { label: 'Tax Administration: VAT on commission sales and intermediary services (in Finnish)', href: SRC.intermediary },
          { label: 'Tax Administration: obligation to give a receipt in cash sales', href: SRC.receiptEn },
          { label: 'Tax Administration: restaurant audits revealed misconduct, press release 4.6.2024 (in Finnish)', href: SRC.auditNews },
          { label: 'Tax Administration: VAT on staff meals (in Finnish)', href: SRC.staffMealsVat },
          { label: 'Tax Administration: fringe benefit values for 2026', href: SRC.benefits2026En },
          { label: 'Tax Administration: goods or services diverted to private use', href: SRC.ownUseEn },
          { label: 'Finlex: VAT Act (1501/1993, in Finnish)', href: SRC.avl },
          { label: 'Finlex: Accounting Act (1336/1997, in Finnish)', href: SRC.kpl },
          { label: 'Finlex: Act on the obligation to offer a receipt in cash sales (658/2013, in Finnish)', href: SRC.receiptAct },
        ] },
      ],
      faq: [
        { q: 'What is the VAT rate on restaurant food in 2026?', a: 'From 1 January 2026, VAT on restaurant and catering services and on foodstuffs is 13.5%. In 2025 it was 14%. Alcoholic beverages and tobacco are always at 25.5%, also when served in a restaurant.' },
        { q: 'Is takeaway food at a different rate from food eaten in?', a: 'No. Takeaway food is a sale of foodstuffs and food served in the dining room is a restaurant service, but both are at 13.5%. Alcohol sold to take away is 25.5%.' },
        { q: 'How do I split the combined price of lunch and a beer?', a: 'Split the price into a 13.5% food part and a 25.5% alcohol part, because one combined price does not change the items’ VAT rates. A method you can justify is to split in proportion to the normal separate prices and set the split up in the till in advance.' },
        { q: 'Is VAT on Wolt sales based on the payout or on what the customer paid?', a: 'When the restaurant sells the food and the platform is an intermediary, VAT is reported on the full food price the customers paid. The platform fee is a separate expense, and its VAT is handled according to the fee invoice.' },
        { q: 'Does a restaurant need a certified cash register?', a: 'Finland has no general requirement for a certified cash register system. With turnover above €10,000, however, you must offer a receipt for cash and card payments, and the Accounting Act requires cash payments to be recorded without delay. In practice a reliable till, daily Z reports and a card terminal connected to the till are essential.' },
      ],
    },
    et: {
      title: 'Restorani ja kohviku raamatupidamine ja käibemaks Soomes 2026: kassa, Wolt ja toitlustus',
      description:
        'Restorani ja kohviku raamatupidamine Soomes 2026: toit 13,5%, alkohol 25,5%, koondhinna jagamine, Wolti aruanded, kassa ja Z-aruanded, töötajate toitlustus.',
      lead: 'Pitsabaar, kebabikoht, kohvik või toiduauto alustab Soomes sageli füüsilisest isikust ettevõtjana (toiminimi) või väikese osaühinguna (osakeyhtiö). Raamatupidamises on määravad õiged käibemaksumäärad, iga kassapäeva kirjendamine, toidukulleriplatvormide väljamaksed ja töötajate toitlustus. Kogusime kokku 2026. aasta reeglid, kuu dokumendid, levinumad vead ja näite eurodes.',
      body: [
        { t: 'h2', x: 'Teatised ja load lühidalt' },
        { t: 'p', x: 'Enne avamist esita asutamisteatis (perustamisilmoitus): saad Y-tunnuse ja saad samas registreeruda ettemaksuregistrisse (ennakkoperintärekisteri) ja käibemaksukohustuslaste registrisse. Käibemaksukohustuslaseks registreerimine on kohustuslik, kui käive ületab kalendriaastas 20 000 eurot. Restoran ületab selle piiri tavaliselt kiiresti ja paljud registreeruvad kohe algusest, et arvata maha mööbli, seadmete ja toorainete käibemaks.' },
        { t: 'p', x: 'Toiduseaduse (elintarvikelaki 297/2021) järgi tuleb toidualasest tegevusest teatada omavalitsuse toidujärelevalvele (kunnan elintarvikevalvonta) hiljemalt neli nädalat enne tegevuse alustamist või olulist muutmist. Alkoholi serveerimiseks on vaja serveerimisluba (anniskelulupa), mida annab 1.1.2026 alates välja Lupa- ja valvontavirasto (varem regionaalhaldusametid ja Valvira).' },
        { t: 'h2', x: 'Käibemaksumäärad 2026' },
        { t: 'p', x: 'Alates 1.1.2026 langes vähendatud käibemaksumäär 14%-lt 13,5%-le (AVL 85 §). Seda kohaldatakse nii toidukaupade müügile kui ka restorani- ja toitlustusteenustele. Üldine määr on 25,5% (AVL 84 §). Määrav on müügi aeg, nii et 2025. aasta müügile kehtis 14%.' },
        { t: 'ul', items: [
          'Toidud, lõuna, rootsi laud ja kohviku tooted: 13,5%.',
          'Alkoholivabad joogid, kohv, tee, karastusjoogid, maiustused ja jäätis on toidukaubad: 13,5%.',
          'Restoranis serveeritud kraanivesi, näiteks veekann lauale: 13,5% (kraanivee kui sellise müük oleks 25,5%).',
          'Õlu, siider, vein ja muud alkohoolsed joogid: alati 25,5%, ka toidu kõrvale serveerituna. Alkoholivaba õlu, mis ei ole alkoholiaktsiisi seaduse mõttes alkohoolne jook, on toidukaup.',
          'Tubakatooted: 25,5%.',
          'Pudelipant (pullopantti) ja muud tagastatava pakendi tagatisrahad: 25,5%, isegi kui jook ise on 13,5%.',
          'Muud kaubad, näiteks mänguasjad, nõud ja meenetooted: 25,5%.',
        ] },
        { t: 'h3', x: 'Kohapeal või kaasa' },
        { t: 'p', x: 'Restoraniteenus on serveerimine müüja ruumides ning selle juurde kuuluvad näiteks katmine, lauad ja nõude koristamine. Kui toit müüakse kaasa ilma nende teenusteta, on tegu toidukauba müügiga. Soomes kehtib mõlemale sama 13,5% määr, nii et kaasa müüdud pitsa ja saalis söödud pitsa maksustatakse ühtemoodi. Alkohol on mõlemal juhul 25,5%.' },
        { t: 'h3', x: 'Koondhind: lõuna õllega, menüü veinidega' },
        { t: 'p', x: 'Maksuameti (Verohallinto) juhendi järgi määratakse iga toote maksustamine põhimõtteliselt eraldi ja üks ühine hind seda ei muuda (jagamise põhimõte). Kõrgeim halduskohus leidis kohtuasjas KHO 2022:58, et kiirtoidurestorani lastemenüü burgerile, lisandile ja joogile kohaldatakse vähendatud määra, kuid menüüsse kuuluvale mänguasjale üldmäära.' },
        { t: 'p', x: 'Kui müüd lõunat koos õllega või menüüd koos veinidega ühe hinnaga, tuleb hind jagada 13,5% ja 25,5% osaks. Juhendis ei ole ühte kohustuslikku valemit. Selge ja põhjendatav viis on jagada hind toodete tavaliste eraldi hindade suhtes ja seadistada jaotus kassasse ette, et Z-aruanne näitaks müüki õigesti maksumäärade kaupa. Rootsi laud, mille hinnas on ainult toit ja alkoholivabad joogid, on tervikuna 13,5%.' },
        { t: 'h3', x: 'Oma kojuvedu' },
        { t: 'p', x: 'Kui restoran müüb toitu koos kojuveoga ja võtab kliendilt tasu nii toidu kui ka veo eest, kohaldatakse kogu müügile toidu määra 13,5%. See kehtib nii siis, kui veab restorani oma töötaja, kui ka siis, kui restoran tellib veofirma. Veofirma esitab restoranile arve oma teenuse eest 25,5% määraga.' },
        { t: 'h2', x: 'Wolt, Foodora ja teised toidukulleriplatvormid' },
        { t: 'p', x: 'Kontrolli kõigepealt platvormi tingimustest ja kliendi tšekist, kes on toidu müüja. Kui müüja on restoran ja platvorm on vahendaja, deklareerib restoran käibemaksu kogu toidu hinnalt, mille kliendid maksid, ning platvormi kinni peetud tasu müügist maha ei arvata. Kui platvorm võtab kliendilt kättetoimetamistasu enda nimel, on see platvormi enda müük ega kuulu restorani müügi hulka.' },
        { t: 'ul', items: [
          'Platvormi tasu on eraldi kulu. Maksuameti järgi arvestab vahendaja oma tasult käibemaksu üldmääraga 25,5%, isegi kui vahendatud toit on 13,5%.',
          'Kui tasu arvel on Soome käibemaks, arvab käibemaksukohustuslasena registreeritud restoran selle tavapäraselt maha.',
          'Kui välismaine platvorm esitab arve ilma Soome käibemaksuta, tasub restoran maksu ise pöördmaksustamise alusel ja arvab selle maha sama perioodi deklaratsioonis.',
          'Platvormi väljamakse aruanne on müügidokument: sellest nähtuvad klientide makstud hinnad, tasud, tagasimaksed ja välja makstud summa. Võrdle iga väljamakset pangakontoga.',
        ] },
        { t: 'p', x: 'Maksuamet alustas 2023. aasta kevadel pitsabaaride ja kebabirestoranide tõhustatud kontrolli. Veidi enam kui aastaga tegi ta 174 maksurevisjoni ja esitas kuriteoteate umbes 40 ettevõtja kohta. Leiti muu hulgas raamatupidamisest puuduvat sularahamüüki, kassaga ühendamata makseterminale ja märkimisväärses summas kirjendamata müüki toidukullerifirmade kaudu.' },
        { t: 'h2', x: 'Kassa, tšekk ja sularaha' },
        { t: 'p', x: 'Soomes ei ole üldist kohustust kasutada ametiasutuse heaks kiidetud või sertifitseeritud kassasüsteemi. Sularahakaubanduses tšeki pakkumise kohustuse seadus (Laki kuitintarjoamisvelvollisuudesta käteiskaupassa 658/2013) kohustab aga ettevõtet, mille majandusaasta käive on üle 10 000 euro, pakkuma kliendile tšekki, kui ta maksab sularahas või kaardiga. Tšekk võib olla ka elektrooniline. Seadust ei kohaldata turu- ja platsikaubandusele välitingimustes, välja arvatud alkohoolsete jookide jaemüük ja serveerimine. See erand võib puudutada välisturul müüvat toiduautot, seega kontrolli seda oma raamatupidajaga. Kohustuse rikkumise eest võidakse määrata 300–1000 euro suurune tasu (laiminlyöntimaksu).' },
        { t: 'ul', items: [
          'Tšekil peavad olema ettevõtte nimi, kontaktandmed ja Y-tunnus, kuupäev, tšeki number või muu tunnus, müüdud kaubad ning makstud summa ja käibemaks maksumäärade kaupa.',
          'Raamatupidamisseaduse järgi tuleb sularahamaksed kirjendada viivitamata ja päevade kaupa ning iga kanne peab põhinema dokumendil.',
          'Kassa igapäevane Z-aruanne on päeva müügidokument. Sellest nähtuvad müük maksumäärade kaupa ja makseviisid: sularaha, kaart, lõunavautšerid ja muud.',
          'Loe kassa iga päev üle ja kirjenda kassavahed. Sularaha sissemaksed panka ja sularahas tehtud ostud kirjendatakse oma dokumentidega.',
          'Ühenda makseterminal kassaga ja võrdle kaardimaksete väljamakseid pangakontoga. Kaardimaksete teenustasud on kulu.',
          'Säilita dokumente vähemalt kuus aastat selle aasta lõpust, mil majandusaasta lõppes.',
        ] },
        { t: 'h3', x: 'Jootraha' },
        { t: 'p', x: 'Vabatahtlik jootraha, mis makstakse otse töötajatele, ei kuulu restorani müügi maksustatava väärtuse hulka ja sellelt käibemaksu ei maksta. Kui restoran võtab kliendilt teenustasu tema soovist sõltumata, on see osa müügist ja sellelt tuleb maksta käibemaksu. Kui jootraha makstakse kaardiga ettevõtte kontole ja antakse edasi töötajatele, kirjenda see eraldi ja lepi oma raamatupidajaga kokku, kuidas seda palgaarvestuses käsitletakse.' },
        { t: 'h2', x: 'Töötajate toitlustus' },
        { t: 'p', x: 'Hotelli- ja restoranitöötajate toitlustussoodustuse (ravintoetu) maksustatav väärtus on 2026. aastal 7,48 eurot toidukorra kohta ja 2027. aastal 7,65 eurot. Kui töötaja maksab toidu eest, arvatakse tema makse soodustuse väärtusest maha. Soodustus on maksustatav palk, mida käsitletakse palgaarvestuses ja deklareeritakse tulude registrisse (tulorekisteri).' },
        { t: 'ul', items: [
          'Näide: töötaja sööb kuus 20 korda tasuta. Maksustatav soodustus on 20 × 7,48 = 149,60 eurot. Kui ta maksab 3,00 eurot toidukorra eest, on soodustus 20 × 4,48 = 89,60 eurot.',
          'Käibemaks: tasuta antud toidukordadelt makstakse omatarbe käibemaksu 13,5%. Restorani enda valmistatud toidu puhul on maksustatav väärtus otsesed ja kaudsed kulud; kaudseteks kuludeks võib soovi korral võtta 22% otsestest kuludest.',
          'Kui töötaja maksab vähemalt soodustuse väärtuse, on toidukord tavaline müük ja käibemaks arvutatakse tema makstud hinnalt. Kui hind jääb alla soodustuse väärtuse, tõstetakse käibemaksu maksustatav väärtus turuväärtuseni.',
        ] },
        { t: 'h3', x: 'Ettevõtja enda söögid ja toit koju' },
        { t: 'p', x: 'Kui toiminimi-ettevõtja sööb ise restoranis või viib tooraineid koju, on tegu kauba omatarbeks võtmisega ja sellelt tuleb maksta käibemaksu. Maksuamet peab väheseks omatarbeks umbes 850 eurot aastas, millelt maksu ei võeta. See leevendus kehtib ainult füüsilistele isikutele, mitte osaühingule. Osaühingus on omaniku tasuta toidukorrad palk või muu maksustatav soodustus.' },
        { t: 'h2', x: 'Ladu, praak ja pandid' },
        { t: 'ul', items: [
          'Hulgimüüjalt ostetud toorained kirjendatakse ostudeks. Restorani soetuste, näiteks toidukaupade ja laudlinade käibemaksu saab maha arvata.',
          'Majandusaasta lõpus tehakse inventuur ja alles oleva varu soetusmaksumus kantakse bilanssi. Kui varu tõenäoline soetus- või müügihind on soetusmaksumusest väiksem, kantakse vahe kuluks (KPL 5:6).',
          'Riknenud või ära visatud toorainete kohta tasub pidada kuupäevadega praagilehte. Ilma selleta on müügi ja ostude vahet maksurevisjonil raske selgitada.',
          'Pudelipandid kirjenda eraldi: tarnija arvel on pandi osa 25,5% määraga ja tagastatud pudelite eest saadud hüvitis vähendab oste.',
        ] },
        { t: 'h2', x: 'Töötajad' },
        { t: 'p', x: 'Restoranivaldkonnal on oma kollektiivleping (työehtosopimus), mis määrab palgad, lisatasud ja tööaja. Palgad deklareeritakse tulude registrisse (tulorekisteri) ja tööandja maksed tasutakse maksukonto (verotili) kaudu. Neist räägime oma juhendites Ensimmäinen työntekijä, Palkanlaskenta ja Palkkailmoitus tulorekisteriin.' },
        { t: 'h2', x: 'Kuu raamatupidamine: mida saata' },
        { t: 'ul', items: [
          'Kassa Z-aruanded iga päeva kohta ja kuu kokkuvõte maksumäärade kaupa.',
          'Makseterminali väljamaksed ja kaardimaksete teenustasude arved.',
          'Sularaha loendused, kassavahed ja sissemaksed panka.',
          'Toidukulleriplatvormide väljamakse aruanded ja tasude arved kõigi perioodide kohta.',
          'Hulgimüüjate ning alkoholi- ja joogitarnijate arved ja tšekid, samuti üüri-, elektri- ja seadmekulud.',
          'Pangakonto väljavõte tervikuna.',
          'Töötajate toitlustus, jootraha väljamaksed ja töötunnid palgaarvestuse jaoks.',
          'Majandusaasta lõpus laoinventuur ja praagileht.',
        ] },
        { t: 'h2', x: 'Näide eurodes' },
        { t: 'p', x: 'Käibemaksukohustuslasena registreeritud pitsabaar müüb ühe kuu jooksul saalis, kaasa ja toidukulleriplatvormi kaudu. Platvorm on vahendaja ja selle tasu arvel on Soome käibemaks.' },
        { t: 'ul', items: [
          'Kassa toidumüük saalis ja kaasa 11 350,00 € (sh käibemaks 13,5%): müük 10 000,00 € ja käibemaks 1 350,00 €.',
          'Õlled ja veinid 2 510,00 € (sh käibemaks 25,5%): müük 2 000,00 € ja käibemaks 510,00 €.',
          'Kliendid maksid platvormi kaudu toidu eest 2 270,00 € (sh käibemaks 13,5%): müük 2 000,00 € ja käibemaks 270,00 €.',
          'Platvorm pidas kinni tasu 600,00 € + käibemaks 25,5% 153,00 € = 753,00 € ja maksis pangakontole 1 517,00 €.',
          'Toorained hulgimüüjalt 4 540,00 € (sh käibemaks 13,5%): käibemaksuta 4 000,00 € ja käibemaks 540,00 €. Alkohoolsete jookide ostud 1 255,00 € (sh käibemaks 25,5%): käibemaksuta 1 000,00 € ja käibemaks 255,00 €.',
          'Kuu tasumisele kuuluv käibemaks: 1 350,00 + 510,00 + 270,00 − 153,00 − 540,00 − 255,00 = 1 182,00 €.',
        ] },
        { t: 'p', x: 'Kui õlled ja veinid oleks kirjendatud toidu 13,5% määraga, oleks nende maksuks arvutatud 298,55 € ja maksmata oleks jäänud 211,45 €. Kui platvormimüügi maks oleks arvutatud välja makstud 1 517,00 eurolt, oleks maks olnud 180,44 € ehk 89,56 € liiga vähe.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Õlu ja vein lüüakse kassasse toidu 13,5% määraga või lõuna ja õlle koondhinda ei jagata maksumäärade vahel.',
          '2026. aasta müügil kasutatakse veel 14% määra, sest kassa maksumäärasid ei ole uuendatud.',
          'Sularahamüüki ei kirjendata iga päev, kassat ei loeta üle või Z-aruanded puuduvad.',
          'Makseterminal ei ole kassaga ühendatud ning kaardimüük ja kassamüük ei klapi.',
          'Toidukulleriplatvormi müük kirjendatakse välja makstud netosummana või jäetakse üldse kirjendamata.',
          'Töötajate tasuta toidukordi ei käsitleta palgaarvestuses soodustusena ega käibemaksus omatarbena.',
          'Kohustuslik teenustasu jäetakse käibemaksust välja.',
          'Majandusaasta lõpus ei tehta inventuuri ja tulemus moonutub.',
        ] },
        { t: 'note', x: 'Andmed kontrolliti 2026. aasta novembris: toidukaupade ning restorani- ja toitlustusteenuste käibemaks 13,5% (2025. aastal 14%), alkohol, tubakas ja pudelipandid 25,5%, tšeki pakkumise kohustuse piir 10 000 eurot, käibemaksukohustuslaseks registreerimise piir 20 000 eurot kalendriaastas ning hotelli- ja restoranitöötajate toitlustussoodustus 7,48 eurot 2026. aastal ja 7,65 eurot 2027. aastal. Toidukulleriplatvormide lepingud erinevad, seega kontrolli oma väljamakse aruannet ja tasu arvet. Allikad: käibemaksuseadus (1501/1993), raamatupidamisseadus (1336/1997), sularahakaubanduses tšeki pakkumise kohustuse seadus (658/2013), toiduseadus (297/2021), alkoholiseadus (1102/2017) ja Verohallinto.' },
        { t: 'h2', x: 'Aitame restorane ja kohvikuid' },
        { t: 'p', x: 'Tilitoimisto Debit Credit peab restoranide, kohvikute, pitsabaaride ja kebabikohtade raamatupidamist ja esitab käibemaksudeklaratsioonid: kirjendame Z-aruanded ja toidukulleriplatvormide väljamaksed õigete maksumääradega, võrdleme kassat, makseterminali ja panka ning käsitleme töötajate toitlustust palgaarvestuses. Meie kliendid saavad saata tšekid ja aruanded Vaavo rakenduse kaudu. Teenindame soome ja vene keeles. Võta ühendust juba enne avamist, siis on kassa, maksumäärad ja registreeringud korras esimesest päevast.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Verohallinto: käibemaksumäärad (inglise keeles)', href: SRC.ratesEn },
          { label: 'Verohallinto: käibemaksukohustuslase juhend — restoraniteenused, pandid, jootraha (soome keeles)', href: SRC.vatGuide },
          { label: 'Verohallinto: komisjonimüügi ja vahendustegevuse käibemaks (soome keeles)', href: SRC.intermediary },
          { label: 'Verohallinto: tšeki andmise kohustus sularahakaubanduses (inglise keeles)', href: SRC.receiptEn },
          { label: 'Verohallinto: restoranide kontroll paljastas rikkumisi, pressiteade 4.6.2024 (soome keeles)', href: SRC.auditNews },
          { label: 'Verohallinto: töötajate toitlustuse käibemaks (soome keeles)', href: SRC.staffMealsVat },
          { label: 'Verohallinto: mitterahaliste soodustuste väärtused 2026 (inglise keeles)', href: SRC.benefits2026En },
          { label: 'Verohallinto: kauba või teenuse omatarbeks võtmine (inglise keeles)', href: SRC.ownUseEn },
          { label: 'Finlex: käibemaksuseadus (1501/1993, soome keeles)', href: SRC.avl },
          { label: 'Finlex: raamatupidamisseadus (1336/1997, soome keeles)', href: SRC.kpl },
          { label: 'Finlex: sularahakaubanduses tšeki pakkumise kohustuse seadus (658/2013, soome keeles)', href: SRC.receiptAct },
        ] },
      ],
      faq: [
        { q: 'Milline on restoranitoidu käibemaks 2026. aastal?', a: 'Alates 1.1.2026 on restorani- ja toitlustusteenuste ning toidukaupade käibemaks 13,5%. 2025. aastal oli see 14%. Alkohoolsed joogid ja tubakatooted on alati 25,5%, ka restoranis serveerituna.' },
        { q: 'Kas kaasa müüdud toidul on teine määr kui saalis söödud toidul?', a: 'Ei. Kaasa müüdud toit on toidukauba müük ja saalis serveeritud toit restoraniteenus, kuid mõlemale kehtib 13,5%. Kaasa müüdud alkohol on 25,5%.' },
        { q: 'Kuidas jagada lõuna ja õlle koondhinda?', a: 'Hind jagatakse 13,5% toiduosaks ja 25,5% alkoholiosaks, sest üks ühine hind ei muuda toodete maksumäärasid. Põhjendatav viis on jagada tavaliste eraldi hindade suhtes ja seadistada jaotus kassasse ette.' },
        { q: 'Kas Wolti kaudu müüdud toidu käibemaks arvestatakse väljamaksest või kliendi makstud hinnast?', a: 'Kui toidu müüja on restoran ja platvorm on vahendaja, deklareeritakse käibemaks kogu toidu hinnalt, mille kliendid maksid. Platvormi tasu on eraldi kulu, mille käibemaksu käsitletakse tasu arve järgi.' },
        { q: 'Kas restoran vajab sertifitseeritud kassaaparaati?', a: 'Soomes ei ole üldist sertifitseeritud kassasüsteemi nõuet. Üle 10 000 euro käibe korral tuleb aga pakkuda tšekki sularaha- ja kaardimaksete eest ning raamatupidamisseaduse järgi tuleb sularahamaksed kirjendada viivitamata. Praktikas on usaldusväärne kassa, igapäevased Z-aruanded ja kassaga ühendatud makseterminal hädavajalikud.' },
      ],
    },
    uk: {
      title: 'Бухгалтерія та ПДВ ресторану й кафе у Фінляндії 2026: каса, Wolt і харчування персоналу',
      description:
        'Бухгалтерія ресторану й кафе у Фінляндії у 2026 році: їжа 13,5 %, алкоголь 25,5 %, комплексна ціна, звіти Wolt, каса і Z-звіти, харчування персоналу.',
      lead: 'Піцерію, кебаб, кафе чи фудтрак у Фінляндії часто відкривають як toiminimi або невелике osakeyhtiö. У бухгалтерії все вирішують правильні ставки ПДВ, облік кожного касового дня, звіти платформ доставки та харчування персоналу. Ми зібрали правила 2026 року, документи за місяць, типові помилки й приклад у євро.',
      body: [
        { t: 'h2', x: 'Коротко про повідомлення та ліцензії' },
        { t: 'p', x: 'До відкриття подайте повідомлення про реєстрацію (perustamisilmoitus): ви отримаєте Y-tunnus і зможете одразу стати до реєстру передоплати (ennakkoperintärekisteri) та до реєстру платників ПДВ. Реєстрація платником ПДВ обов’язкова, коли оборот перевищує 20 000 євро за календарний рік. Ресторан зазвичай швидко переходить цей поріг, і багато хто реєструється з самого початку, щоб відраховувати ПДВ із меблів, обладнання та продуктів.' },
        { t: 'p', x: 'За законом про харчові продукти (elintarvikelaki 297/2021) про харчову діяльність потрібно повідомити муніципальний харчовий нагляд (kunnan elintarvikevalvonta) не пізніше ніж за чотири тижні до початку або суттєвої зміни діяльності. Для подачі алкоголю потрібна ліцензія (anniskelulupa), яку з 1.1.2026 видає Lupa- ja valvontavirasto (раніше — регіональні управління AVI та Valvira).' },
        { t: 'h2', x: 'Ставки ПДВ у 2026 році' },
        { t: 'p', x: 'З 1.1.2026 знижена ставка ПДВ зменшилася з 14 % до 13,5 % (AVL 85 §). Вона застосовується і до продажу харчових продуктів, і до ресторанних послуг та послуг харчування. Загальна ставка — 25,5 % (AVL 84 §). Має значення дата продажу: до продажів 2025 року застосовувалася ставка 14 %.' },
        { t: 'ul', items: [
          'Страви, обіди, шведський стіл і продукція кафе: 13,5 %.',
          'Безалкогольні напої, кава, чай, газовані напої, солодощі та морозиво — це харчові продукти: 13,5 %.',
          'Водопровідна вода, подана в ресторані, наприклад глечик на столі: 13,5 % (сам продаж водопровідної води оподатковувався б за 25,5 %).',
          'Пиво, сидр, вино та інші алкогольні напої: завжди 25,5 %, навіть коли їх подають до їжі. Безалкогольне пиво, яке не є алкогольним напоєм за законом про акциз на алкоголь, вважається харчовим продуктом.',
          'Тютюнові вироби: 25,5 %.',
          'Застава за пляшки (pullopantti) та інші застави за зворотну тару: 25,5 %, навіть якщо сам напій оподатковується за 13,5 %.',
          'Інші товари, наприклад іграшки, посуд і сувенірна продукція: 25,5 %.',
        ] },
        { t: 'h3', x: 'У залі чи навинос' },
        { t: 'p', x: 'Ресторанна послуга — це обслуговування в приміщенні продавця, до якого належать, наприклад, сервірування, столи та прибирання посуду. Коли їжу продають навинос без цих послуг, це продаж харчових продуктів. У Фінляндії в обох випадках діє та сама ставка 13,5 %, тому піца навинос і піца в залі оподатковуються однаково. Алкоголь в обох випадках оподатковується за 25,5 %.' },
        { t: 'h3', x: 'Комплексна ціна: обід із пивом, меню з винним супроводом' },
        { t: 'p', x: 'За роз’ясненням податкової (Verohallinto) податковий режим кожного товару в принципі визначається окремо, і єдина ціна цього не змінює (принцип розподілу, jakamisperiaate). Найвищий адміністративний суд у справі KHO 2022:58 вирішив, що до бургера, гарніру й напою в дитячому меню фастфуду застосовується знижена ставка, а до іграшки в цьому меню — загальна.' },
        { t: 'p', x: 'Якщо ви продаєте обід із пивом або меню з вином за однією ціною, її потрібно поділити на частину за 13,5 % і частину за 25,5 %. Обов’язкової формули в роз’ясненні немає. Зрозумілий і обґрунтований спосіб — ділити ціну пропорційно звичайним окремим цінам страв і напоїв та заздалегідь налаштувати цей поділ у касі, щоб Z-звіт показував продажі правильно за ставками. Шведський стіл, до ціни якого входять лише їжа та безалкогольні напої, повністю оподатковується за 13,5 %.' },
        { t: 'h3', x: 'Власна доставка' },
        { t: 'p', x: 'Коли ресторан продає їжу з доставкою та виставляє клієнтові рахунок і за їжу, і за доставку, увесь продаж оподатковується за ставкою страви — 13,5 %. Це діє незалежно від того, чи розвозить їжу власний персонал, чи найнята рестораном транспортна компанія. Транспортна компанія виставляє ресторану рахунок за свою послугу за ставкою 25,5 %.' },
        { t: 'h2', x: 'Wolt, Foodora та інші платформи доставки' },
        { t: 'p', x: 'Спершу перевірте за умовами платформи й чеком клієнта, хто продає їжу. Якщо продавець — ресторан, а платформа — посередник, ресторан декларує ПДВ з усієї ціни їжі, яку сплатили клієнти, а утримана платформою комісія з продажів не віднімається. Якщо платформа бере з клієнта плату за доставку від свого імені, це власний продаж платформи, і до продажів ресторану він не входить.' },
        { t: 'ul', items: [
          'Комісія платформи — окрема витрата. За роз’ясненням податкової посередник нараховує на свою комісію ПДВ за загальною ставкою 25,5 %, навіть якщо їжа оподатковується за 13,5 %.',
          'Якщо в рахунку за комісію зазначено фінський ПДВ, ресторан, що перебуває в реєстрі ПДВ, відраховує його як зазвичай.',
          'Якщо іноземна платформа виставляє рахунок без фінського ПДВ, ресторан сам сплачує податок за зворотним нарахуванням (käännetty verovelvollisuus) і відраховує його в декларації того самого періоду.',
          'Звіт платформи про виплати — документ продажів: у ньому видно суми, сплачені клієнтами, комісії, повернення та перераховану суму. Звіряйте кожну виплату з банківським рахунком.',
        ] },
        { t: 'p', x: 'Навесні 2023 року податкова розпочала посилені перевірки піцерій і кебабних. Трохи більше ніж за рік вона провела 174 податкові перевірки й подала заяви до поліції приблизно щодо 40 підприємців. Серед знахідок — готівкова виручка, якої немає в бухгалтерії, платіжні термінали, не підключені до каси, і значні суми непроведених продажів через служби доставки їжі.' },
        { t: 'h2', x: 'Каса, чек і готівка' },
        { t: 'p', x: 'У Фінляндії немає загального обов’язку використовувати касову систему, затверджену чи сертифіковану владою. Але закон про обов’язок пропонувати чек у торгівлі за готівку (Laki kuitintarjoamisvelvollisuudesta käteiskaupassa 658/2013) зобов’язує підприємство з оборотом за фінансовий рік понад 10 000 євро пропонувати клієнтові чек, коли той платить готівкою або карткою. Чек може бути й електронним. Закон не застосовується до торгівлі на ринках і площах просто неба, за винятком роздрібного продажу та подачі алкоголю. Цей виняток може стосуватися фудтраку на вуличному ринку, тож уточніть його у свого бухгалтера. За порушення можуть призначити штраф (laiminlyöntimaksu) від 300 до 1 000 євро.' },
        { t: 'ul', items: [
          'У чеку мають бути назва, контактні дані та Y-tunnus підприємства, дата, номер чека або інший ідентифікатор, продані товари, а також сума оплати й ПДВ за ставками.',
          'За законом про бухгалтерський облік готівкові платежі потрібно проводити без зволікання і в хронологічному порядку за днями, а кожна проводка має ґрунтуватися на документі.',
          'Щоденний Z-звіт каси — документ продажів за день. У ньому видно продажі за ставками ПДВ і способи оплати: готівка, картка, обідні ваучери та інше.',
          'Перераховуйте касу щодня й проводьте касові розбіжності. Здачу готівки в банк і покупки за готівку проводять окремими документами.',
          'Підключіть платіжний термінал до каси та звіряйте виплати за картками з банківським рахунком. Комісії за прийом карток — це витрата.',
          'Зберігайте документи щонайменше шість років від кінця року, у якому закінчився фінансовий рік.',
        ] },
        { t: 'h3', x: 'Чайові' },
        { t: 'p', x: 'Добровільні чайові, які платять безпосередньо персоналу, не входять до податкової бази продажів ресторану, і ПДВ із них не сплачується. Якщо ресторан бере з клієнта плату за обслуговування незалежно від його бажання, ця плата є частиною продажу й оподатковується ПДВ. Якщо чайові платять карткою на рахунок підприємства й потім передають персоналу, проводьте їх окремо й узгодьте їхнє оформлення в розрахунку зарплати зі своїм бухгалтером.' },
        { t: 'h2', x: 'Харчування персоналу' },
        { t: 'p', x: 'Податкова вартість харчування (ravintoetu) для персоналу готелів і ресторанів у 2026 році — 7,48 євро за прийом їжі, у 2027 році — 7,65 євро. Якщо працівник платить за їжу, його плата віднімається від вартості пільги. Пільга — оподатковувана зарплата: її проводять у розрахунку зарплати й подають до реєстру доходів (tulorekisteri).' },
        { t: 'ul', items: [
          'Приклад: працівник безкоштовно їсть 20 разів на місяць. Оподатковувана пільга становить 20 × 7,48 = 149,60 євро. Якщо він платить по 3,00 євро за обід, пільга дорівнює 20 × 4,48 = 89,60 євро.',
          'ПДВ: із безкоштовно виданих обідів сплачується ПДВ на власне споживання за ставкою 13,5 %. Для їжі, приготовленої самим рестораном, база — прямі та непрямі витрати; непрямі витрати можна за бажанням прийняти рівними 22 % від прямих.',
          'Якщо працівник платить не менше вартості пільги, обід — звичайний продаж, і ПДВ рахують із сплаченої ним ціни. Якщо ціна нижча за вартість пільги, базу ПДВ підвищують до ринкової вартості.',
        ] },
        { t: 'h3', x: 'Їжа самого підприємця та продукти додому' },
        { t: 'p', x: 'Якщо підприємець toiminimi сам їсть у ресторані або забирає продукти додому, це вилучення товарів для власного споживання, і з нього потрібно сплатити ПДВ. Податкова вважає порогом незначного власного споживання приблизно 850 євро на рік: нижче нього податок не стягується. Це послаблення діє лише для фізичних осіб, не для osakeyhtiö. В osakeyhtiö безкоштовна їжа власника — це зарплата або інша оподатковувана вигода.' },
        { t: 'h2', x: 'Склад, списання та застави' },
        { t: 'ul', items: [
          'Закупівлі продуктів в оптовика проводяться як покупки. ПДВ із таких закупівель ресторану, як продукти та скатертини, можна відрахувати.',
          'Наприкінці фінансового року проводять інвентаризацію, і вартість придбання залишків запасів переносять до балансу. Якщо ймовірна ціна придбання чи продажу запасів нижча за вартість придбання, різницю списують у витрати (KPL 5:6).',
          'Списання (hävikki), наприклад зіпсовані чи викинуті продукти, краще записувати в журнал списань із датами. Без нього різницю між продажами та закупівлями важко пояснити під час податкової перевірки.',
          'Застави за пляшки проводьте окремо: у рахунку постачальника частка застави оподатковується за 25,5 %, а відшкодування за здані пляшки зменшує закупівлі.',
        ] },
        { t: 'h2', x: 'Працівники' },
        { t: 'p', x: 'У ресторанній галузі діє свій колективний договір (työehtosopimus), який визначає зарплати, надбавки та робочий час. Зарплати подають до реєстру доходів (tulorekisteri), а внески роботодавця сплачують через податковий рахунок (verotili). Про це — у наших посібниках Ensimmäinen työntekijä, Palkanlaskenta і Palkkailmoitus tulorekisteriin.' },
        { t: 'h2', x: 'Бухгалтерія за місяць: що передавати' },
        { t: 'ul', items: [
          'Z-звіти каси за кожен день і зведення за місяць за ставками ПДВ.',
          'Виплати за платіжним терміналом і рахунки за комісії за прийом карток.',
          'Перерахунки готівки, касові розбіжності та здачу готівки в банк.',
          'Звіти про виплати й рахунки за комісії платформ доставки за всі періоди.',
          'Рахунки й чеки оптовиків, постачальників алкоголю та напоїв, а також витрати на оренду, електрику й обладнання.',
          'Повну виписку з банківського рахунку.',
          'Дані про харчування персоналу, виплати чайових і робочі години для розрахунку зарплати.',
          'Наприкінці фінансового року — інвентаризацію складу та журнал списань.',
        ] },
        { t: 'h2', x: 'Приклад у євро' },
        { t: 'p', x: 'Піцерія, що перебуває в реєстрі ПДВ, за місяць продає в залі, навинос і через платформу доставки. Платформа діє як посередник, і в її рахунку за комісію зазначено фінський ПДВ.' },
        { t: 'ul', items: [
          'Продажі їжі через касу в залі та навинос 11 350,00 € (з ПДВ 13,5 %): продажі 10 000,00 € і ПДВ 1 350,00 €.',
          'Пиво та вино 2 510,00 € (з ПДВ 25,5 %): продажі 2 000,00 € і ПДВ 510,00 €.',
          'Клієнти сплатили за їжу через платформу 2 270,00 € (з ПДВ 13,5 %): продажі 2 000,00 € і ПДВ 270,00 €.',
          'Платформа утримала комісію 600,00 € + ПДВ 25,5 % 153,00 € = 753,00 € і перерахувала на банківський рахунок 1 517,00 €.',
          'Продукти в оптовика 4 540,00 € (з ПДВ 13,5 %): без ПДВ 4 000,00 € і ПДВ 540,00 €. Закупівлі алкогольних напоїв 1 255,00 € (з ПДВ 25,5 %): без ПДВ 1 000,00 € і ПДВ 255,00 €.',
          'ПДВ до сплати за місяць: 1 350,00 + 510,00 + 270,00 − 153,00 − 540,00 − 255,00 = 1 182,00 €.',
        ] },
        { t: 'p', x: 'Якби пиво та вино провели за ставкою їжі 13,5 %, податок із них становив би 298,55 €, і недоплата була б 211,45 €. Якби ПДВ із продажів через платформу порахували з перерахованих 1 517,00 євро, податок становив би 180,44 €, тобто на 89,56 € менше належного.' },
        { t: 'h2', x: 'Типові помилки' },
        { t: 'ul', items: [
          'Пиво та вино проводять у касі за ставкою їжі 13,5 %, або комплексну ціну обіду з пивом не ділять за ставками.',
          'У продажах 2026 року досі застосовують ставку 14 %, бо ставки в касі не оновили.',
          'Готівкову виручку не проводять щодня, касу не перераховують або бракує Z-звітів.',
          'Платіжний термінал не підключено до каси, і продажі за картками не сходяться з касою.',
          'Продажі через платформу доставки проводять нетто-сумою виплати або не проводять узагалі.',
          'Безкоштовне харчування персоналу не оформлюють у зарплаті як пільгу й не оподатковують ПДВ як власне споживання.',
          'Обов’язкову плату за обслуговування не оподатковують ПДВ.',
          'Наприкінці року не проводять інвентаризацію, і результат спотворюється.',
        ] },
        { t: 'note', x: 'Дані перевірено в листопаді 2026 року: ПДВ на харчові продукти та ресторанні послуги 13,5 % (14 % у 2025 році), алкоголь, тютюн і застава за пляшки 25,5 %, поріг обов’язку пропонувати чек 10 000 євро, поріг реєстрації платником ПДВ 20 000 євро за календарний рік, вартість харчування персоналу готелів і ресторанів 7,48 євро у 2026 році та 7,65 євро у 2027 році. Договори платформ доставки різняться, тож перевіряйте свій звіт про виплати й рахунок за комісію. Джерела: закон про ПДВ (1501/1993), закон про бухгалтерський облік (1336/1997), закон про обов’язок пропонувати чек (658/2013), закон про харчові продукти (297/2021), закон про алкоголь (1102/2017) і Verohallinto.' },
        { t: 'h2', x: 'Ми допомагаємо ресторанам і кафе' },
        { t: 'p', x: 'Tilitoimisto Debit Credit веде бухгалтерію ресторанів, кафе, піцерій і кебабних та подає декларації з ПДВ: проводимо Z-звіти й виплати платформ доставки за правильними ставками, звіряємо касу, термінал і банк та оформлюємо харчування персоналу в розрахунку зарплати. Наші клієнти можуть надсилати чеки та звіти через застосунок Vaavo. Ми працюємо фінською та російською мовами. Зв’яжіться з нами ще до відкриття, щоб каса, ставки ПДВ і реєстрації були в порядку з першого дня.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Verohallinto: ставки ПДВ (англійською)', href: SRC.ratesEn },
          { label: 'Verohallinto: посібник для платника ПДВ — ресторанні послуги, застави, чайові (фінською)', href: SRC.vatGuide },
          { label: 'Verohallinto: ПДВ у комісійній торгівлі та посередництві (фінською)', href: SRC.intermediary },
          { label: 'Verohallinto: обов’язок пропонувати чек (англійською)', href: SRC.receiptEn },
          { label: 'Verohallinto: перевірки ресторанів виявили порушення, пресреліз 4.6.2024 (фінською)', href: SRC.auditNews },
          { label: 'Verohallinto: ПДВ на харчування персоналу (фінською)', href: SRC.staffMealsVat },
          { label: 'Verohallinto: вартість натуральних пільг на 2026 рік (англійською)', href: SRC.benefits2026En },
          { label: 'Verohallinto: вилучення товарів і послуг для власного споживання (англійською)', href: SRC.ownUseEn },
          { label: 'Finlex: закон про ПДВ (1501/1993)', href: SRC.avl },
          { label: 'Finlex: закон про бухгалтерський облік (1336/1997)', href: SRC.kpl },
          { label: 'Finlex: закон про обов’язок пропонувати чек у торгівлі за готівку (658/2013)', href: SRC.receiptAct },
        ] },
      ],
      faq: [
        { q: 'Яка ставка ПДВ на ресторанну їжу у 2026 році?', a: 'З 1.1.2026 ПДВ на ресторанні послуги, послуги харчування та харчові продукти становить 13,5 %. У 2025 році ставка була 14 %. Алкогольні напої та тютюн завжди оподатковуються за 25,5 %, зокрема й коли їх подають у ресторані.' },
        { q: 'Чи відрізняється ставка для їжі навинос і їжі в залі?', a: 'Ні. Їжа навинос — це продаж харчових продуктів, а їжа в залі — ресторанна послуга, але в обох випадках ставка 13,5 %. Алкоголь навинос оподатковується за 25,5 %.' },
        { q: 'Як поділити комплексну ціну обіду з пивом?', a: 'Ціну ділять на частину їжі за 13,5 % і частину алкоголю за 25,5 %, бо єдина ціна не змінює ставок товарів. Обґрунтований спосіб — ділити пропорційно звичайним окремим цінам і заздалегідь налаштувати поділ у касі.' },
        { q: 'ПДВ із продажів через Wolt рахують із виплати чи з ціни, яку сплатив клієнт?', a: 'Якщо продавець їжі — ресторан, а платформа — посередник, ПДВ декларують з усієї ціни їжі, яку сплатили клієнти. Комісія платформи — окрема витрата, ПДВ із якої враховують за рахунком за комісію.' },
        { q: 'Чи потрібен ресторану сертифікований касовий апарат?', a: 'У Фінляндії немає загальної вимоги до сертифікованої касової системи. Але за обороту понад 10 000 євро клієнтові потрібно пропонувати чек під час оплати готівкою та карткою, а за законом про бухгалтерський облік готівкові платежі проводять без зволікання. На практиці без надійної каси, щоденних Z-звітів і підключеного до каси термінала не обійтися.' },
      ],
    },
  },
};
