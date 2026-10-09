import type { Guide } from './types';

// Facts verified 9 Oct 2026, verbatim, against Finlex, vero.fi and tyosuojelu.fi (page update date in
// brackets). Independent review the same day re-fetched every source below (all 14 links HTTP 200, 109
// quoted anchors found verbatim) and tightened five statements: "must apply" instead of "always"
// (8 c § 2–3 mom. exceptions), developers and pre-use sellers also only "muutoin kuin satunnaisesti",
// bundled non-construction work follows the main service (pääsuorite), housing companies "usually" do
// not sell construction services (48413 gives them as examples), and the 318/319/320/307 codes are
// attributed to the VSRALVKV file format rather than to all accounting software.
// - Arvonlisäverolaki 1501/1993 (finlex.fi, consolidated up to 322/2026): 8 c § 1 mom. "Verovelvollinen
//   31 §:n 3 momentin 1 kohdassa tarkoitettujen rakentamispalvelujen myynnistä sekä työvoiman
//   vuokrauksesta kyseisiä palveluja varten on ostaja, jos: 1) ostaja on elinkeinonharjoittaja, joka
//   muutoin kuin satunnaisesti myy kyseisiä palveluja tai suorittaa 31 §:n 1 momentin 1 kohdassa tai
//   33 §:ssä tarkoitettuja kiinteistön luovutuksia; tai 2) ostaja on sellainen elinkeinonharjoittaja,
//   joka myy kyseisen palvelun 1 kohdassa mainitulle elinkeinonharjoittajalle"; 2 mom. not applied
//   "jos myynti olisi 3 §:ää sovellettaessa veroton"; 3 mom. not applied to "kiinteistöllä
//   harjoitettavaa erityistä toimintaa palveleviin koneisiin, laitteisiin tai kalusteisiin
//   kohdistuviin palveluihin". 31 § 3 mom.: "1) kiinteistöön kohdistuva rakennus- ja korjaustyö sekä
//   työn yhteydessä asennetun tavaran luovuttaminen; 2) ... suunnittelu, valvonta ja muu niihin
//   verrattava palvelu". 3 §: seller not liable if turnover of the current and previous calendar year
//   "on enintään 20 000 euroa". 9 §: buyer liable when the foreigner has no "kiinteää toimipaikkaa eikä
//   hän ole ... hakeutunut verovelvolliseksi". 84 § "25,5 prosenttia". 209 e § 1 mom.: 4) buyer's VAT
//   ID "jos hän on ostosta verovelvollinen", 12) "merkintä "käännetty verovelvollisuus"".
// - Vero, Rakennusalan käännetty arvonlisäverovelvollisuus (23.5.2026; EN version 25.5.2026):
//   "Rakentamispalveluista pitää maksaa alv yleisen verokannan (25,5 %) mukaan"; buyer sells
//   construction services, leases workers for them, sells buildings it built on land it holds, or
//   sells property before use; "Ostaja voi olla myös toinen yritys, joka myy palvelun edelleen";
//   not applied "kun rakentamispalvelun ostaja on yksityishenkilö tai kun myydään pelkästään
//   tavaroita"; "On aina myyjän vastuulla selvittää"; invoice: "yleiset laskumerkinnät (ilman
//   verokantaa ja veron määrää)", "ostajan arvonlisäverotunniste − kotimaankaupassa se on suomalaisen
//   ostajan Y-tunnus", "(”käännetty verovelvollisuus”)", "viittaus arvonlisäverolain (AVL) 8 c §:ään",
//   "merkintä ”Itselaskutus”, jos ostaja laatii laskun"; buyer reports "Rakentamispalvelun ja
//   metalliromun ostot", tax at 25,5 % in "Vero rakentamispalvelun ja metalliromun ostoista", deductible
//   part in "Verokauden vähennettävä vero"; seller reports "Rakentamispalvelun ja metalliromun myynnit";
//   seller deducts its own input VAT "normaaliin tapaan".
// - Vero, syventävä ohje 48625 Rakennusalan käännetty arvonlisäverovelvollisuus (VH/6003/00.01.00/2020,
//   7.10.2020, voimassa toistaiseksi). The page itself notes the rate "nousi 24 prosentista 25,5
//   prosenttiin 1.9.2024" and the small-business limit "nousi 15.000 eurosta 20.000 euroon 1.1.2025",
//   so the guide's own 24 % and 15 000 € figures are NOT used here. Used: "Ostajan toiminnan ei
//   tarvitse olla pääasiallisesti rakennustoimintaa"; the farmer who digs with his excavator sells
//   "muutoin kuin satunnaisesti"; "Satunnainen rakentaminen tarkoittaa pääasiassa kertaluonteista,
//   tilapäistä, ei toistuvaa tai vähäistä rakentamista"; turnover share or euro amount not decisive
//   "sellaisenaan"; "huomioon otetaan ostajan koko toiminta, ei vain Suomessa tapahtuva"; a
//   construction company "välittömästi toiminnan alkamisesta asti", others "kuluvalta ja edelliseltä
//   vuodelta"; "verovelvollinen kaikesta kyseisten palvelujen hankinnasta toimintaansa" incl. its
//   office property; status not shown in YTJ ("Ei tule"); "Epäselvissä tapauksissa myyjän tulee pyytää
//   selvitystä ostajalta"; private persons incl. "arvonlisäverollista toimintaa harjoittava
//   yksityishenkilö ... yksityiseen kulutukseensa"; a contractor's own house partly in deductible
//   business use → reverse charge; valtio "satunnaisesti", kunnat "kuntakohtaisesti"; välimies;
//   unregistered small seller or buyer → not applied, no registration needed for the purchase;
//   "Myyjän toimialaluokituksella ei ole merkitystä"; what is construction (maapohja- ja perustustyöt,
//   LVI-, sähkö- ja kattotyöt, rappaus, maalaus, lasitus, purku, rakennussiivous, rakennuskone
//   käyttäjineen, ovet ja ikkunat asennettuna, ilmalämpöpumppu, aurinkopaneelit) and what is not
//   (suunnittelu, valvonta, vastaava mestari, arkkitehti- ja insinööripalvelut, kone ilman
//   kuljettajaa, kuljetus, kiinteistönhoito, nuohous, sälekaihtimet, telineet "tilapäisiä
//   rakennelmia", tuotantokoneet, ammattikeittiön laitteet); work included in a construction contract
//   follows the contract; parketti, jääkaappi/astianpesukone vs uuni/keittiökalusteet; pääsuorite,
//   "Laskutustavalla tai hinnoittelulla ei ole merkitystä", "Sopimuksen sisältö määrittää sen, onko
//   palvelu rakentamispalvelua, ei lasku"; leased workers on scaffolding one week and concrete the
//   next: "Lasku tulee jakaa"; LVIS and earth-moving subcontract-chain examples; wrong VAT on invoice →
//   "uusi lasku, jossa on viittaus alkuperäiseen laskuun"; automatic "alv 0 %" needs no new invoice;
//   travel and accommodation follow the main service; negative VAT "palautetaan viivytyksettä", first
//   used for overdue taxes.
// - Vero, Näin ilmoitat arvonlisäveron (1.1.2026): field title "Rakentamispalvelun ja metalliromun
//   myynnit (käännetty verovelvollisuus)"; "Laske veron määrä kertomalla veroton ostohinta 25,5 %:n
//   verokannalla"; construction services bought from foreigners under AVL 9 § go in the same fields
//   "vaikka yrityksesi ei harjoittaisi rakentamispalvelujen myyntiä".
// - Vero, VSRALVKV tietuekuvaus v1.10 (27.2.2026): 307 "Verokauden vähennettävä vero", 318 "Vero
//   rakentamispalvelun ja metalliromun ostoista", 319 "Rakentamispalvelun ja metalliromun myynnit",
//   320 "Rakentamispalvelun ja metalliromun ostot".
// - Vero, Arvonlisäverokantojen muutostilanteet (1.1.2026): "Arvonlisäverokanta määräytyy sen
//   ajankohdan mukaan, kun rakentamispalvelu on suoritettu"; "kun tilaaja on hyväksynyt sen
//   vastaanottotarkastuksessa tai muutoin vastaanottanut sen"; maksupostit "ovat ennakkomaksuja";
//   the same rule applies "myös silloin, kun palvelun ostaja maksaa arvonlisäveron myyjän sijaan".
// - Vero, syventävä ohje 48413 Rakentamisen tiedonantovelvollisuus (VH/6804/00.01.00/2024, 1.1.2025):
//   example 1, a housing company's pipe and electrical renovation: no AVL 8 c § reverse charge, but the
//   company must report the contract; "asunto-osakeyhtiö tai kukkakauppa" → no reverse charge, except
//   when the contractor is "ulkomaalainen yritys, joka ei ole Suomessa arvonlisäverovelvollisten
//   rekisterissä"; "Alihankintaketjussa kukin tilaaja on omalta osaltaan tiedonantovelvollinen";
//   contracts that "ylittää 15 000 euroa". Urakkatiedot (1.7.2026): "viimeistään kohdekuukautta
//   toisena seuraavan kuukauden 5. päivänä"; worker data to the päätoteuttaja on a shared site.
// - Tilaajavastuulaki 1233/2006 6 § (finlex.fi): not applied if leased work lasts "enintään 10
//   työpäivää" or a subcontract is "alle 9 000 euroa" excluding VAT.
// - Työsuojelu, Tilaajavastuulain soveltaminen (21.8.2020): "vähintään 9 000 euroa (alv 0 %)", leased
//   workers "yli kymmenen työpäivää", obtained "ennen sopimuksen solmimista"; in construction the duty
//   "koskee kaikkia tilaajia" and includes "todistus työtapaturma- ja ammattitautilain mukaisen
//   vakuutuksen ottamisesta, jos sopimuspuolen työntekijä suorittaa työtä".
const VERO = 'https://www.vero.fi';
const VAT_FI = `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus`;
const VAT_EN = `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat`;

const SRC = {
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
  reverseFi: `${VAT_FI}/toimialakohtaista-tietoa/rakennusalan-kaannetty-arvonlisaverovelvollisuus/`,
  reverseEn: `${VAT_EN}/vat-in-different-lines-of-business/vat-reverse-charge-in-the-construction-sector/`,
  guideFi: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48625/rakennusalan-k%C3%A4%C3%A4nnetty-arvonlis%C3%A4verovelvollisuus/`,
  filingFi: `${VAT_FI}/ilmoitus-ja-maksuohjeet/`,
  filingEn: `${VAT_EN}/when-to-file-and-pay/`,
  ratesFi: `${VAT_FI}/arvonlisaveroprosentit/Arvonlisaverokantojen-muutostilanteet/`,
  ratesEn: `${VAT_EN}/rates-of-vat/the-changes-to-VAT-rates/`,
  reportingFi: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48413/rakentamisen-tiedonantovelvollisuus2/`,
  reportingEn: `${VERO}/en/detailed-guidance/guidance/48413/the-information-reporting-requirement-in-the-construction-industry2/`,
  contractsFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/rakentamisilmoitukset/urakkatiedot/`,
  contractsEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/reports-on-construction-work/report-contract-details/`,
  contractorFi: 'https://tyosuojelu.fi/harmaa-talous/tilaajavastuu/tilaajavastuulain-soveltaminen',
  contractorEn: 'https://tyosuojelu.fi/en/grey-economy/contractor-s-obligations-and-liability/application-of-the-act',
};

export const rakennusalanKaannettyArvonlisavero: Guide = {
  slug: 'rakennusalan-kaannetty-arvonlisavero',
  datePublished: '2026-10-09',
  dateModified: '2026-10-09',
  content: {
    fi: {
      title: 'Rakennusalan käännetty arvonlisävero: kuka maksaa ALV:n ja miten se ilmoitetaan (2026)',
      description:
        'Rakennusalan käännetty ALV selkeästi: milloin ostaja maksaa veron, mitä laskuun merkitään, miten se ilmoitetaan OmaVerossa ja mitkä ovat yleisimmät virheet.',
      lead: 'Rakennusalalla arvonlisäveron maksaa usein ostaja eikä myyjä. Käännetty verovelvollisuus koskee rakentamispalveluja ja työvoiman vuokrausta rakentamispalveluja varten, kun ostaja itse myy rakentamispalveluja muutoin kuin satunnaisesti. Kokosimme, milloin sääntöä sovelletaan, mitä laskuun merkitään, miten myyjä ja ostaja ilmoittavat sen ja missä virheitä syntyy useimmin.',
      body: [
        { t: 'h2', x: 'Mitä käännetty verovelvollisuus tarkoittaa?' },
        { t: 'p', x: 'Arvonlisäverotuksessa veron maksaa yleensä myyjä. Rakennusalalla arvonlisäverolain 8 c § kääntää vastuun: kun ehdot täyttyvät, myyjä laskuttaa ilman arvonlisäveroa, ja ostaja laskee veron itse, ilmoittaa sen ja maksaa sen. Rakentamispalveluista vero lasketaan yleisen verokannan mukaan, joka on 25,5 %. Jos ostaja hankkii palvelun vähennykseen oikeuttavaa liiketoimintaansa varten, se vähentää saman veron samalla ilmoituksella.' },
        { t: 'h2', x: 'Milloin ostaja maksaa arvonlisäveron?' },
        { t: 'p', x: 'Käännettyä verovelvollisuutta on sovellettava, kun molemmat ehdot täyttyvät (poikkeukset kerromme alempana):' },
        { t: 'ul', items: [
          'Palvelu on rakentamispalvelua tai työvoiman vuokrausta rakentamispalvelua varten.',
          'Ostaja on elinkeinonharjoittaja, joka muutoin kuin satunnaisesti myy rakentamispalveluja tai vuokraa työvoimaa rakentamispalveluja varten. Ehdon täyttää myös yritys, joka muutoin kuin satunnaisesti rakentaa tai rakennuttaa hallinnassaan olevalle maalle rakennuksia myyntiä varten tai myy kiinteistöjä ennen niiden käyttöönottoa, kun niihin on tehty rakentamispalveluja.',
        ] },
        { t: 'p', x: 'Ostaja voi olla myös niin sanottu välimies eli yritys, joka myy saman palvelun edelleen tällaiselle ostajalle. Myyjän toimialalla ei ole merkitystä: ratkaisevia ovat palvelun laji ja ostajan asema.' },
        { t: 'h3', x: 'Mitä "muutoin kuin satunnaisesti" tarkoittaa?' },
        { t: 'p', x: 'Ehto on laaja. Ostajan toiminnan ei tarvitse olla pääasiassa rakentamista, vaan säännöllinen rakentamispalvelujen myynti sivutoimisestikin riittää. Verohallinnon esimerkissä maanviljelijä, joka silloin tällöin tekee kaivinkoneellaan kaivutöitä muille, myy rakentamispalveluja muutoin kuin satunnaisesti, joten myös hänen navettansa korjaukseen sovelletaan käännettyä verovelvollisuutta. Satunnaista on pääasiassa kertaluonteinen, tilapäinen tai vähäinen rakentaminen, jota ei ole tarkoitettu jatkuvaksi. Rakentamisen osuus liikevaihdosta ei sellaisenaan ratkaise, ja arvioinnissa otetaan huomioon ostajan koko toiminta, myös ulkomailla.' },
        { t: 'ul', items: [
          'Rakennusalan yritys myy rakentamispalveluja muutoin kuin satunnaisesti heti toimintansa alusta.',
          'Muun kuin rakennusalan yrityksen kohdalla satunnaisuutta tarkastellaan kuluvalta ja edelliseltä vuodelta.',
          'Kun ehto täyttyy, ostaja maksaa veron kaikista rakentamispalveluista, joita se hankkii toimintaansa – myös esimerkiksi oman toimistonsa korjauksesta, jota se ei myy eteenpäin.',
        ] },
        { t: 'h3', x: 'Kuka selvittää ostajan aseman?' },
        { t: 'p', x: 'Vastuu on myyjällä. Myyjän on asiaankuuluvaa huolellisuutta noudattaen selvitettävä, täyttääkö ostaja ehdot, ja epäselvissä tapauksissa pyydettävä selvitys ostajalta. Tieto ei näy viranomaisrekistereissä, kuten YTJ:ssä, joten ostajan vahvistus kannattaa pyytää kirjallisesti jo tarjous- tai sopimusvaiheessa.' },
        { t: 'h2', x: 'Mikä on rakentamispalvelua?' },
        { t: 'p', x: 'Arvonlisäverolain mukaan rakentamispalvelua on kiinteistöön kohdistuva rakennus- ja korjaustyö sekä työn yhteydessä asennetun tavaran luovuttaminen. Käännetty verovelvollisuus koskee esimerkiksi:' },
        { t: 'ul', items: [
          'maapohja- ja perustustöitä, talonrakentamista sekä maa- ja vesirakentamista, kuten teiden ja verkostojen rakentamista',
          'rakennusasennuksia, kuten LVI-, sähkö- ja kattotöitä, sekä viimeistelytöitä, kuten rappausta, maalausta ja lasitusta',
          'rakennusten purkamista ja rakennussiivousta',
          'rakennuskoneen vuokrausta kuljettajineen, kun koneella tehdään kiinteistöön kohdistuvaa työtä',
          'ovien ja ikkunoiden, ilmalämpöpumppujen ja aurinkopaneelien myyntiä asennettuna.',
        ] },
        { t: 'p', x: 'Rakentamispalvelua eivät ole esimerkiksi suunnittelu ja valvonta (myös vastaavan mestarin työ), arkkitehti- ja insinööripalvelut, rakennuskoneen vuokraus ilman kuljettajaa, kuljetus työmaalle, jatkuva kiinteistönhoito, nuohous, sälekaihtimien asennus, rakennustelineiden pystytys ja purku eikä tuotantokoneiden tai kiinteistöllä harjoitettavaa erityistä toimintaa palvelevien laitteiden, kuten ammattikeittiön laitteiden, asennus ja huolto. Kun tällainen suorite on osa urakkaa, jonka pääsuorite on rakentamispalvelu, käännetty verovelvollisuus koskee koko urakkaa; erikseen myytynä siihen ei sovelleta käännettyä verovelvollisuutta.' },
        { t: 'p', x: 'Pelkkä tavaran myynti ei kuulu käännetyn verovelvollisuuden piiriin, mutta työn yhteydessä asennettu materiaali kuuluu. Parketin myynti sellaisenaan on tavaran myyntiä, parketin myynti asennettuna rakentamispalvelua. Jos myyjä vain toimittaa ja liittää jääkaapin tai astianpesukoneen, kyse on tavaran myynnistä, mutta keittiökalusteiden ja kiinteäksi asennettavan uunin myynti asennettuna on rakentamispalvelua.' },
        { t: 'h2', x: 'Näin myyjä laskuttaa' },
        { t: 'p', x: 'Myyjän on annettava lasku, vaikka ostaja ilmoittaa ja maksaa veron. Laskuun merkitään arvonlisäveroton hinta. Varmista, että laskussa on:' },
        { t: 'ul', items: [
          'tavanomaiset laskumerkinnät ilman verokantaa ja veron määrää',
          'ostajan arvonlisäverotunniste – suomalaisella ostajalla Y-tunnus',
          'merkintä "Käännetty verovelvollisuus"',
          'ostajan verovelvollisuuden peruste, esimerkiksi viittaus arvonlisäverolain 8 c §:ään',
          'merkintä "Itselaskutus", jos ostaja laatii laskun myyjän puolesta.',
        ] },
        { t: 'p', x: 'Jos laskuun on virheellisesti merkitty veron määrä ja verokanta, myyjä antaa uuden laskun, jossa viitataan alkuperäiseen laskuun. Laskutusjärjestelmän automaattisesti tulostama "alv 0 %" ei vaadi uutta laskua, kun laskussa on muut vaaditut merkinnät ja viittaus käännettyyn verovelvollisuuteen. Kun pääsuoritteeseen sovelletaan käännettyä verovelvollisuutta, sama koskee ostajalta laskutettuja matka- ja majoituskuluja.' },
        { t: 'h2', x: 'Näin käännetty ALV ilmoitetaan OmaVerossa' },
        { t: 'p', x: 'Ostaja ilmoittaa käännetyn verovelvollisuuden alaiset ostot arvonlisäveroilmoituksella kolmessa kohdassa:' },
        { t: 'ol', items: [
          'Ostojen veroton yhteismäärä kohtaan "Rakentamispalvelun ja metalliromun ostot".',
          'Ostojen vero 25,5 %:n verokannalla kohtaan "Vero rakentamispalvelun ja metalliromun ostoista".',
          'Sama vero kohtaan "Verokauden vähennettävä vero" siltä osin kuin osto on vähennyskelpoinen.',
        ] },
        { t: 'p', x: 'Esimerkki: aliurakoitsija laskuttaa rakennusliikettä 10 000 eurolla ilman arvonlisäveroa. Rakennusliike ilmoittaa ostoihin 10 000 €, oston veroksi 2 550 € (25,5 %) ja, kun aliurakka liittyy sen verolliseen toimintaan, saman 2 550 euron vähennettäväksi veroksi.' },
        { t: 'p', x: 'Myyjä ilmoittaa käännetyn verovelvollisuuden alaisten myyntiensä yhteismäärän kohdassa "Rakentamispalvelun ja metalliromun myynnit (käännetty verovelvollisuus)", ei kotimaan myynnin veroissa. Omien hankintojensa arvonlisäverot myyjä vähentää normaalisti. Jos vähennettävää veroa on enemmän kuin suoritettavaa, kuten aliurakoitsijoilla usein, negatiivinen vero palautetaan; jos yrityksellä on erääntyneitä veroja, palautus käytetään ensin niiden maksuun.' },
        { t: 'note', x: 'Ohjelmistojen ja Ilmoitin.fi-palvelun käyttämässä Verohallinnon tiedostomuodossa (VSRALVKV) kohdilla on tietokoodit: 320 ostot, 318 ostojen vero, 319 myynnit ja 307 vähennettävä vero. Samoihin kohtiin ilmoitetaan myös Suomessa sijaitsevaan kiinteistöön kohdistuvat rakentamispalvelut, jotka on ostettu ulkomaiselta yritykseltä, jolla ei ole Suomessa kiinteää toimipaikkaa eikä se ole hakeutunut täällä arvonlisäverovelvolliseksi – silloinkin, kun oma yrityksesi ei myy rakentamispalveluja.' },
        { t: 'h3', x: 'Mikä verokanta, kun urakka kestää pitkään?' },
        { t: 'p', x: 'Verokanta määräytyy sen mukaan, milloin rakentamispalvelu on suoritettu eli milloin tilaaja on hyväksynyt sen vastaanottotarkastuksessa tai muutoin vastaanottanut sen. Urakan edistymisen mukaan laskutettavat maksupostit ovat ennakkomaksuja, ja niiden verokanta määräytyy sen mukaan, milloin maksu on kertynyt myyjälle. Sääntö on sama, kun ostaja maksaa veron käännetyn verovelvollisuuden perusteella. Yleinen verokanta nousi 24 %:sta 25,5 %:iin 1.9.2024, millä on merkitystä esimerkiksi korjattaessa vanhempien kausien ilmoituksia.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Yksityishenkilö ostajana. Käännettyä verovelvollisuutta ei sovelleta myyntiin yksityishenkilölle – ei silloinkaan, kun ostaja on itse rakennusalan yrittäjä ja ostaa palvelun yksityiseen käyttöönsä. Lasku on silloin arvonlisäverollinen. Jos osa talosta on yrittäjän vähennykseen oikeuttavassa liiketoimintakäytössä, käännettyä verovelvollisuutta sovelletaan.',
          'Taloyhtiö ja muut ostajat, jotka eivät myy rakentamispalveluja. Asunto-osakeyhtiö tai esimerkiksi kukkakauppa ei yleensä myy rakentamispalveluja, joten niiden remontit laskutetaan arvonlisäverollisina. Poikkeus: jos urakoitsija on ulkomainen yritys, joka ei ole Suomessa arvonlisäverovelvollisten rekisterissä, taloyhtiö maksaa veron ostajana ja rekisteröityy tätä varten.',
          'Valtio ja kunnat. Valtion katsotaan myyvän rakentamispalveluja vain satunnaisesti, joten sen ostoihin ei sovelleta käännettyä verovelvollisuutta. Kunnat arvioidaan kuntakohtaisesti: jos kunta myy rakentamispalveluja muutoin kuin satunnaisesti, sen kaikkiin rakentamispalveluostoihin sovelletaan käännettyä verovelvollisuutta.',
          'Sekasopimukset. Kun samaan sopimukseen kuuluu rakentamista ja muuta, pääsuorite ratkaisee. Laskutustapa ei ratkaise: sopimuksen sisältö määrittää, onko kyse rakentamispalvelusta. Jos pääsuoritetta ei voi osoittaa, lasku jaetaan. Verohallinnon esimerkissä vuokratyöntekijöiden telineasennusviikko laskutetaan arvonlisäverollisena ja rakennustyöviikko käännetyllä verovelvollisuudella.',
          'Aliurakointiketju. Jokainen kauppa arvioidaan erikseen. Pääurakoitsijan ostamaan aliurakkaan sovelletaan käännettyä verovelvollisuutta, mutta aliurakoitsijan erikseen ostamat kuljetukset ja suunnittelu laskutetaan arvonlisäverollisina, vaikka aliurakoitsijan oma kokonaisurakka on rakentamispalvelua.',
          'Pieni yritys, joka ei ole ALV-rekisterissä. Jos myyjä ei ole arvonlisäverovelvollinen vähäisen toiminnan vuoksi (liikevaihto enintään 20 000 € sekä kuluvana että edellisenä kalenterivuonna) eikä ole hakeutunut rekisteriin, käännettyä verovelvollisuutta ei sovelleta. Sama koskee ostajaa: rekisteriin kuulumattoman pienen yrityksen ei tarvitse rekisteröityä pelkän rakentamispalvelun oston vuoksi.',
        ] },
        { t: 'h2', x: 'Rakentamisilmoitukset ja tilaajavastuu ovat eri asioita' },
        { t: 'p', x: 'Käännetty arvonlisävero ei korvaa rakennusalan muita velvoitteita. Ne määräytyvät omien sääntöjensä mukaan, myös silloin kun käännettyä verovelvollisuutta ei sovelleta:' },
        { t: 'ul', items: [
          'Urakkatiedot Verohallinnolle: rakennustyön tilaaja ilmoittaa urakat, joiden arvo on yli 15 000 euroa ilman arvonlisäveroa, viimeistään kohdekuukautta toisena seuraavan kuukauden 5. päivänä. Myös asunto-osakeyhtiö ilmoittaa urakkansa, ja alihankintaketjussa jokainen tilaaja ilmoittaa omat aliurakkansa. Yhteisellä työmaalla työntekijätiedot annetaan lisäksi päätoteuttajalle.',
          'Tilaajavastuulaki: tilaajan on hankittava sopimuskumppanista selvitykset, kun alihankinnan arvo on vähintään 9 000 euroa (alv 0 %) tai vuokratyöntekijöiden työskentely kestää yli kymmenen työpäivää – yleensä jo ennen sopimuksen solmimista. Rakentamisessa velvollisuus koskee kaikkia tilaajia, myös niitä, joiden tavanomaiseen toimintaan rakentaminen ei kuulu, ja selvityksiin kuuluu lisäksi todistus tapaturmavakuutuksesta, jos työn tekee sopimuskumppanin työntekijä.',
        ] },
        { t: 'h2', x: 'Apua rakennusalan ALV-asioihin' },
        { t: 'p', x: 'Hoidamme rakennusalan yritysten kirjanpidon ja ALV-ilmoitukset. Tarkistamme, milloin käännettyä verovelvollisuutta sovelletaan, että laskumerkinnät ovat kunnossa ja että myynnit ja ostot päätyvät ilmoituksen oikeisiin kohtiin. Palvelemme suomeksi ja venäjäksi.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: rakennusalan käännetty arvonlisäverovelvollisuus', href: SRC.reverseFi },
          { label: 'Verohallinto: syventävä ohje rakennusalan käännetystä arvonlisäverovelvollisuudesta', href: SRC.guideFi },
          { label: 'Verohallinto: näin ilmoitat arvonlisäveron', href: SRC.filingFi },
          { label: 'Verohallinto: arvonlisäverokantojen muutostilanteet', href: SRC.ratesFi },
          { label: 'Verohallinto: rakentamisen tiedonantovelvollisuus', href: SRC.reportingFi },
          { label: 'Verohallinto: rakennustyön tilaaja – ilmoita urakkatiedot', href: SRC.contractsFi },
          { label: 'Finlex: arvonlisäverolaki (1501/1993)', href: SRC.avl },
          { label: 'Työsuojelu: tilaajavastuulain soveltaminen', href: SRC.contractorFi },
        ] },
      ],
      faq: [
        { q: 'Kuka maksaa arvonlisäveron rakentamispalvelusta?', a: 'Yleensä myyjä. Ostaja maksaa veron käännetyn verovelvollisuuden perusteella, kun palvelu on rakentamispalvelua tai työvoiman vuokrausta rakentamispalvelua varten ja ostaja on yritys, joka myy rakentamispalveluja muutoin kuin satunnaisesti.' },
        { q: 'Mitä laskuun merkitään, kun sovelletaan käännettyä verovelvollisuutta?', a: 'Arvonlisäveroton hinta ilman verokantaa ja veron määrää, ostajan Y-tunnus, merkintä "Käännetty verovelvollisuus" ja ostajan verovelvollisuuden peruste, esimerkiksi viittaus arvonlisäverolain 8 c §:ään.' },
        { q: 'Missä kohdissa ostaja ilmoittaa käännetyn arvonlisäveron?', a: 'Ostojen veroton määrä kohtaan "Rakentamispalvelun ja metalliromun ostot", vero 25,5 %:lla kohtaan "Vero rakentamispalvelun ja metalliromun ostoista" ja vähennyskelpoinen osuus kohtaan "Verokauden vähennettävä vero".' },
        { q: 'Sovelletaanko käännettyä verovelvollisuutta taloyhtiön remonttiin?', a: 'Ei yleensä. Asunto-osakeyhtiö ei tavallisesti myy rakentamispalveluja, joten urakoitsija laskuttaa arvonlisäverollisesti. Poikkeus on ulkomainen urakoitsija, joka ei ole Suomessa arvonlisäverovelvollisten rekisterissä: silloin taloyhtiö maksaa veron ostajana. Yli 15 000 euron urakoista taloyhtiö antaa joka tapauksessa urakkailmoitukset.' },
        { q: 'Koskeeko käännetty verovelvollisuus yksityishenkilöä?', a: 'Ei. Yksityishenkilölle myydystä rakentamispalvelusta laskutetaan arvonlisävero, myös kun ostaja on yrittäjä, joka ostaa palvelun yksityiseen käyttöönsä.' },
        { q: 'Mikä verokanta rakentamispalveluun sovelletaan vuonna 2026?', a: 'Yleinen verokanta 25,5 %, joka on ollut voimassa 1.9.2024 alkaen. Verokanta määräytyy sen mukaan, milloin rakentamispalvelu on suoritettu; maksupostien osalta ratkaisee, milloin maksu on kertynyt myyjälle.' },
      ],
    },
    ru: {
      title: 'Обратное начисление ALV в строительстве Финляндии: кто платит и как декларировать (2026)',
      description:
        'Обратное начисление ALV в строительстве Финляндии: когда налог платит покупатель, что указать в счёте, как заполнить декларацию в OmaVero и частые ошибки.',
      lead: 'В строительстве Финляндии НДС (ALV) часто платит не продавец, а покупатель. Это обратное начисление (käännetty verovelvollisuus): оно касается строительных услуг и аренды персонала для строительных работ, если покупатель сам продаёт строительные услуги не от случая к случаю. Разбираем, когда действует правило, что писать в счёте, как его декларируют продавец и покупатель и где чаще всего ошибаются.',
      body: [
        { t: 'h2', x: 'Что такое обратное начисление?' },
        { t: 'p', x: 'Обычно НДС платит продавец. В строительстве § 8 c закона об НДС (arvonlisäverolaki) переносит обязанность на покупателя: если условия выполнены, продавец выставляет счёт без НДС, а покупатель сам рассчитывает налог, декларирует и платит его. Для строительных услуг применяется общая ставка — 25,5 %. Если покупатель приобретает услугу для деятельности с правом на вычет, он вычитает тот же налог в той же декларации.' },
        { t: 'h2', x: 'Когда налог платит покупатель?' },
        { t: 'p', x: 'Обратное начисление обязательно, если выполнены оба условия (исключения — ниже):' },
        { t: 'ul', items: [
          'Услуга — строительная (rakentamispalvelu) или это аренда персонала (лизинг работников) для строительных работ.',
          'Покупатель — предприниматель, который не от случая к случаю продаёт строительные услуги или сдаёт работников в аренду для строительных работ. Условие выполняет и компания, которая не от случая к случаю строит или заказывает строительство зданий на своей земле для продажи либо продаёт недвижимость до ввода в эксплуатацию после строительных работ.',
        ] },
        { t: 'p', x: 'Покупателем может быть и так называемый посредник — компания, которая перепродаёт ту же услугу такому покупателю. Отрасль продавца значения не имеет: решают вид услуги и статус покупателя.' },
        { t: 'h3', x: 'Что значит «не от случая к случаю»?' },
        { t: 'p', x: 'Условие трактуется широко. Строительство не обязано быть основной деятельностью покупателя: достаточно регулярно продавать строительные услуги, даже как побочный бизнес. В примере налоговой (Verohallinto) фермер, который время от времени копает экскаватором для других, продаёт строительные услуги не от случая к случаю, поэтому и к ремонту его коровника применяется обратное начисление. Случайным считается в основном разовое, временное или незначительное строительство, не рассчитанное на продолжение. Доля строительства в обороте сама по себе не решает, и учитывается вся деятельность покупателя, в том числе за границей.' },
        { t: 'ul', items: [
          'Строительная компания считается продающей строительные услуги не от случая к случаю с первого дня работы.',
          'Для компаний из других отраслей смотрят на текущий и прошлый год.',
          'Если условие выполнено, покупатель платит налог со всех строительных услуг, которые покупает для своей деятельности, — например, и с ремонта собственного офиса, который он никому не перепродаёт.',
        ] },
        { t: 'h3', x: 'Кто проверяет статус покупателя?' },
        { t: 'p', x: 'Ответственность лежит на продавце. Он должен с должной тщательностью выяснить, выполняет ли покупатель условия, а в неясных случаях — запросить у покупателя пояснение. В государственных реестрах, например в YTJ, эта информация не отражается, поэтому подтверждение покупателя лучше получить письменно уже на этапе предложения или договора.' },
        { t: 'h2', x: 'Что считается строительной услугой?' },
        { t: 'p', x: 'По закону об НДС строительная услуга — это строительные и ремонтные работы на объекте недвижимости, а также поставка товара, установленного в ходе этих работ. Обратное начисление применяется, например, к:' },
        { t: 'ul', items: [
          'земляным и фундаментным работам, строительству зданий, дорог и инженерных сетей',
          'монтажу инженерных систем — сантехники, отопления и вентиляции (LVI), электрики, кровельным работам — и отделке: штукатурке, покраске, остеклению',
          'сносу зданий и строительной уборке',
          'аренде строительной техники с оператором, если техникой выполняют работы на объекте недвижимости',
          'продаже дверей, окон, тепловых насосов «воздух — воздух» и солнечных панелей с установкой.',
        ] },
        { t: 'p', x: 'Строительной услугой не являются, например, проектирование и надзор (в том числе работа ответственного производителя работ — vastaava mestari), услуги архитекторов и инженеров, аренда техники без оператора, доставка на стройку, постоянное обслуживание недвижимости (kiinteistönhoito), услуги трубочиста, установка жалюзи, монтаж и демонтаж строительных лесов, а также монтаж и обслуживание производственного оборудования и оборудования для особой деятельности на объекте, например профессиональной кухни. Если такая работа входит в подряд, основная часть которого — строительная услуга, обратное начисление распространяется на весь подряд; при отдельной продаже оно к ней не применяется.' },
        { t: 'p', x: 'Продажа одних лишь товаров под обратное начисление не попадает, а материалы, установленные в ходе работ, — попадают. Паркет без укладки — продажа товара, паркет с укладкой — строительная услуга. Если продавец только привозит и подключает холодильник или посудомоечную машину, это продажа товара, а кухонная мебель и встраиваемая духовка с установкой — строительная услуга.' },
        { t: 'h2', x: 'Как продавец выставляет счёт' },
        { t: 'p', x: 'Продавец обязан выставить счёт, хотя налог декларирует и платит покупатель. В счёте указывают цену без НДС. Проверьте, что в счёте есть:' },
        { t: 'ul', items: [
          'обычные реквизиты счёта, но без ставки и суммы налога',
          'идентификатор плательщика НДС покупателя — для финского покупателя это Y-tunnus',
          'отметка «Käännetty verovelvollisuus» (обратное начисление)',
          'основание обязанности покупателя, например ссылка на § 8 c закона об НДС (AVL 8 c §)',
          'отметка «Itselaskutus» (самовыставление), если счёт за продавца составляет покупатель.',
        ] },
        { t: 'p', x: 'Если в счёте по ошибке указаны сумма и ставка налога, продавец выставляет новый счёт со ссылкой на исходный. Автоматическая надпись «alv 0 %» из программы не требует нового счёта, если в нём есть остальные обязательные реквизиты и ссылка на обратное начисление. Если к основной услуге применяется обратное начисление, оно распространяется и на выставленные покупателю расходы на проезд и проживание.' },
        { t: 'h2', x: 'Как задекларировать обратное начисление в OmaVero' },
        { t: 'p', x: 'Покупатель указывает такие покупки в декларации по НДС в трёх полях:' },
        { t: 'ol', items: [
          'Общую сумму покупок без НДС — в поле «Rakentamispalvelun ja metalliromun ostot» (покупки строительных услуг и металлолома).',
          'Налог по ставке 25,5 % — в поле «Vero rakentamispalvelun ja metalliromun ostoista» (налог с покупок строительных услуг и металлолома).',
          'Тот же налог — в поле «Verokauden vähennettävä vero» (вычитаемый налог периода) в той части, в какой покупка даёт право на вычет.',
        ] },
        { t: 'p', x: 'Пример: субподрядчик выставляет строительной компании счёт на 10 000 € без НДС. Компания указывает 10 000 € в покупках, 2 550 € (25,5 %) — как налог с покупок и, если работы связаны с её облагаемой деятельностью, те же 2 550 € — как вычитаемый налог.' },
        { t: 'p', x: 'Продавец указывает общую сумму таких продаж в поле «Rakentamispalvelun ja metalliromun myynnit (käännetty verovelvollisuus)» (продажи строительных услуг и металлолома), а не в налоге с продаж внутри страны. НДС по своим закупкам продавец вычитает как обычно. Если вычитаемого налога больше, чем начисленного, — у субподрядчиков так бывает часто, — отрицательный налог возвращают; при просроченных налоговых долгах возврат сначала идёт на их погашение.' },
        { t: 'note', x: 'В формате файла налоговой (VSRALVKV), который используют программы и сервис Ilmoitin.fi, у полей есть коды: 320 — покупки, 318 — налог с покупок, 319 — продажи, 307 — вычитаемый налог. В эти же поля попадают строительные услуги на объектах в Финляндии, купленные у иностранной компании без постоянного представительства в Финляндии, не зарегистрированной здесь плательщиком НДС, — даже если ваша компания сама строительные услуги не продаёт.' },
        { t: 'h3', x: 'Какая ставка, если подряд длится долго?' },
        { t: 'p', x: 'Ставка определяется по моменту, когда строительная услуга оказана, то есть когда заказчик принял работу на приёмке или иным образом. Промежуточные платежи по ходу работ (maksupostit) — это авансы, и ставка для них определяется по моменту, когда деньги поступили продавцу. Правило то же, когда налог по обратному начислению платит покупатель. Общая ставка выросла с 24 % до 25,5 % 1.9.2024 — это важно, например, при исправлении деклараций за прошлые периоды.' },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Покупатель — частное лицо. К продажам частным лицам обратное начисление не применяется, даже если покупатель сам строитель-предприниматель и заказывает работу для себя лично. Счёт тогда выставляется с НДС. Если часть дома используется в его облагаемой деятельности с правом на вычет, обратное начисление применяется.',
          'Жилищное общество (taloyhtiö, asunto-osakeyhtiö) и другие покупатели, которые не продают строительные услуги. Жилищное общество или, например, цветочный магазин обычно строительные услуги не продают, поэтому их ремонты выставляются с НДС. Исключение: если подрядчик — иностранная компания, не зарегистрированная в Финляндии плательщиком НДС, налог как покупатель платит жилищное общество и для этого регистрируется.',
          'Государство и муниципалитеты. Считается, что государство продаёт строительные услуги лишь от случая к случаю, поэтому к его покупкам обратное начисление не применяется. Муниципалитеты оценивают по отдельности: если муниципалитет продаёт строительные услуги не от случая к случаю, обратное начисление применяется ко всем его покупкам строительных услуг.',
          'Смешанные договоры. Если в договоре есть и строительство, и другое, решает основная услуга. Способ выставления счёта значения не имеет: строительная это услуга или нет, определяет содержание договора. Если основную услугу выделить нельзя, счёт делят. В примере налоговой неделя монтажа лесов арендованными работниками идёт с НДС, а неделя собственно строительных работ — по обратному начислению.',
          'Цепочка субподряда. Каждую сделку оценивают отдельно. К субподряду, который покупает генподрядчик, применяется обратное начисление, а доставку и проектирование, которые субподрядчик заказывает отдельно, ему выставляют с НДС, хотя весь его подряд — строительная услуга.',
          'Небольшая компания вне реестра НДС. Если продавец не является плательщиком НДС из-за небольшого оборота (не больше 20 000 € и в текущем, и в прошлом календарном году) и не зарегистрировался добровольно, обратное начисление не применяется. То же для покупателя: небольшой компании вне реестра не нужно регистрироваться только из-за покупки строительной услуги.',
        ] },
        { t: 'h2', x: 'Строительные отчёты и ответственность заказчика — отдельные обязанности' },
        { t: 'p', x: 'Обратное начисление не заменяет другие обязанности в строительстве. Они действуют по своим правилам, в том числе когда обратное начисление не применяется:' },
        { t: 'ul', items: [
          'Сведения о подрядах (urakkatiedot) для налоговой: заказчик строительных работ сообщает о подрядах дороже 15 000 € без НДС не позднее 5-го числа второго месяца после отчётного. Жилищное общество тоже подаёт такие отчёты, а в цепочке субподряда каждый заказчик сообщает о своих субподрядах. На общей стройплощадке сведения о работниках дополнительно передают генподрядчику (päätoteuttaja).',
          'Закон об ответственности заказчика (tilaajavastuulaki): заказчик должен получить от контрагента документы, если субподряд стоит от 9 000 € (без НДС) или арендованные работники работают больше десяти рабочих дней, — как правило, ещё до заключения договора. В строительстве обязанность касается всех заказчиков, даже тех, для кого строительство — не обычная деятельность, и к документам добавляется справка о страховании от несчастных случаев, если работу выполняет работник контрагента.',
        ] },
        { t: 'h2', x: 'Поможем с ALV в строительстве' },
        { t: 'p', x: 'Ведём бухгалтерию и декларации по ALV строительных компаний. Проверяем, когда применяется обратное начисление, правильно ли оформлены счета и попадают ли продажи и покупки в нужные поля декларации. Наши бухгалтеры обслуживают на финском или русском языке.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: обратное начисление НДС в строительстве (на английском)', href: SRC.reverseEn },
          { label: 'Vero: подробное руководство по обратному начислению в строительстве (на финском)', href: SRC.guideFi },
          { label: 'Vero: как подать декларацию по НДС (на английском)', href: SRC.filingEn },
          { label: 'Vero: какая ставка НДС применяется при её изменении (на английском)', href: SRC.ratesEn },
          { label: 'Vero: обязанность сообщать сведения о строительстве (на английском)', href: SRC.reportingEn },
          { label: 'Vero: сведения о подрядах — urakkatiedot (на английском)', href: SRC.contractsEn },
          { label: 'Finlex: закон об НДС — arvonlisäverolaki (на финском)', href: SRC.avl },
          { label: 'Työsuojelu: ответственность заказчика — tilaajavastuulaki (на английском)', href: SRC.contractorEn },
        ] },
      ],
      faq: [
        { q: 'Кто платит НДС за строительную услугу?', a: 'Обычно продавец. Покупатель платит налог по обратному начислению, если это строительная услуга или аренда персонала для строительных работ, а покупатель — компания, которая продаёт строительные услуги не от случая к случаю.' },
        { q: 'Что указать в счёте при обратном начислении?', a: 'Цену без НДС, без ставки и суммы налога, Y-tunnus покупателя, отметку «Käännetty verovelvollisuus» и основание обязанности покупателя, например ссылку на § 8 c закона об НДС.' },
        { q: 'В каких полях покупатель декларирует обратное начисление?', a: 'Сумму покупок без НДС — в «Rakentamispalvelun ja metalliromun ostot», налог по ставке 25,5 % — в «Vero rakentamispalvelun ja metalliromun ostoista», часть, дающую право на вычет, — в «Verokauden vähennettävä vero».' },
        { q: 'Применяется ли обратное начисление к ремонту жилищного общества?', a: 'Обычно нет. Жилищное общество (taloyhtiö), как правило, строительные услуги не продаёт, поэтому подрядчик выставляет счёт с НДС. Исключение — иностранный подрядчик, не зарегистрированный в Финляндии плательщиком НДС: тогда налог как покупатель платит жилищное общество. О подрядах дороже 15 000 € оно в любом случае подаёт сведения в налоговую.' },
        { q: 'Касается ли обратное начисление частных лиц?', a: 'Нет. Строительные услуги частному лицу продают с НДС, даже если покупатель — предприниматель, который заказывает работу для личных нужд.' },
        { q: 'Какая ставка НДС на строительные услуги в 2026 году?', a: 'Общая ставка 25,5 %, действующая с 1.9.2024. Ставка определяется по моменту оказания строительной услуги, а для промежуточных платежей — по моменту поступления денег продавцу.' },
      ],
    },
    en: {
      title: 'Reverse charge VAT in construction in Finland: who pays and how to report it (2026)',
      description:
        'Construction reverse charge VAT in Finland: when the buyer pays the VAT, what the invoice must say, how to report it in MyTax and the most common mistakes.',
      lead: 'In Finnish construction, VAT is often paid by the buyer rather than the seller. This reverse charge (käännetty verovelvollisuus) covers construction services and the hiring-out of workers for construction services when the buyer itself sells construction services more than occasionally. Here is when the rule applies, what goes on the invoice, how the seller and the buyer report it, and where mistakes happen most often.',
      body: [
        { t: 'h2', x: 'What does the reverse charge mean?' },
        { t: 'p', x: 'Normally the seller pays the VAT. In construction, section 8 c of the Finnish VAT Act shifts the liability: when the conditions are met, the seller invoices without VAT, and the buyer calculates, reports and pays the tax itself. Construction services are taxed at the general rate of 25.5%. If the buyer acquires the service for business that entitles it to deduct VAT, it deducts the same amount on the same return.' },
        { t: 'h2', x: 'When does the buyer pay the VAT?' },
        { t: 'p', x: 'The reverse charge must be applied when both conditions are met (exceptions are covered below):' },
        { t: 'ul', items: [
          'The service is a construction service, or the hiring-out of workers for construction services.',
          'The buyer is a business that, more than occasionally, sells construction services or hires out workers for construction services. A company that, more than occasionally, builds or commissions buildings for sale on land it holds, or sells property before it is taken into use after construction work, also meets the condition.',
        ] },
        { t: 'p', x: 'The buyer can also be an intermediary — a business that sells the same service on to such a buyer. The seller’s line of business does not matter: what counts is the type of service and the buyer’s status.' },
        { t: 'h3', x: 'What does "more than occasionally" mean?' },
        { t: 'p', x: 'The condition is broad. Construction does not have to be the buyer’s main business — selling construction services regularly, even as a side activity, is enough. In the Tax Administration’s example, a farmer who now and then digs for others with his excavator sells construction services more than occasionally, so the reverse charge also applies to the repair of his cowshed. Occasional means mainly one-off, temporary or minor construction that is not intended to continue. The share of construction in turnover does not decide the matter on its own, and the buyer’s entire business is taken into account, including abroad.' },
        { t: 'ul', items: [
          'A construction company sells construction services more than occasionally from the day it starts operating.',
          'For a company in another industry, the current and the previous year are looked at.',
          'Once the condition is met, the buyer pays the VAT on all construction services it buys for its business — including, for example, the renovation of its own office, which it does not sell on.',
        ] },
        { t: 'h3', x: 'Who checks the buyer’s status?' },
        { t: 'p', x: 'The seller is responsible. The seller must exercise due care to find out whether the buyer meets the conditions and, in unclear cases, ask the buyer for clarification. The information does not appear in public registers such as the Finnish Business Information System (YTJ), so it is worth getting the buyer’s confirmation in writing already at the quotation or contract stage.' },
        { t: 'h2', x: 'What counts as a construction service?' },
        { t: 'p', x: 'Under the VAT Act, a construction service is building and repair work on real property, together with goods installed in the course of that work. The reverse charge covers, for example:' },
        { t: 'ul', items: [
          'groundwork and foundations, building construction, and civil engineering such as roads and utility networks',
          'building installations such as plumbing, heating and ventilation (LVI), electrical and roofing work, and finishing work such as plastering, painting and glazing',
          'demolition of buildings and construction cleaning',
          'hiring out construction machinery with an operator when the machine is used for work on real property',
          'doors, windows, air-source heat pumps and solar panels sold installed.',
        ] },
        { t: 'p', x: 'Not construction services are, for example, design and supervision (including the work of the responsible site manager, vastaava mestari), architectural and engineering services, hiring out machinery without an operator, transport to the site, ongoing property maintenance, chimney sweeping, installing blinds, putting up and taking down scaffolding, and installing and servicing production machinery or equipment serving a special activity on the property, such as a professional kitchen. When such work is part of a contract whose main service is a construction service, the reverse charge covers the whole contract; sold separately, the work is not subject to the reverse charge.' },
        { t: 'p', x: 'Selling goods alone is outside the reverse charge, but material installed as part of the work is inside it. Parquet sold as such is a sale of goods; parquet sold installed is a construction service. If the seller only delivers and connects a fridge or a dishwasher, it is a sale of goods, but kitchen cabinets and a built-in oven sold installed are construction services.' },
        { t: 'h2', x: 'How the seller invoices' },
        { t: 'p', x: 'The seller must issue an invoice even though the buyer reports and pays the VAT. The invoice shows the price without VAT. Make sure it contains:' },
        { t: 'ul', items: [
          'the normal invoice details, but without the VAT rate and the VAT amount',
          'the buyer’s VAT identification number — for a Finnish buyer, its Business ID (Y-tunnus)',
          'the text "Käännetty verovelvollisuus" (reverse charge)',
          'the grounds for the buyer’s liability, e.g. a reference to section 8 c of the VAT Act',
          'the text "Itselaskutus" (self-billing) if the buyer prepares the invoice on the seller’s behalf.',
        ] },
        { t: 'p', x: 'If the invoice wrongly shows a VAT amount and rate, the seller issues a new invoice that refers to the original one. An "alv 0 %" line printed automatically by the invoicing system does not require a new invoice if the other required details and a reference to the reverse charge are there. When the reverse charge applies to the main service, it also applies to travel and accommodation costs charged to the buyer.' },
        { t: 'h2', x: 'How to report the reverse charge in MyTax (OmaVero)' },
        { t: 'p', x: 'The buyer reports reverse-charge purchases on the VAT return in three fields:' },
        { t: 'ol', items: [
          'The total of the purchases without VAT under “Purchases of construction services and scrap metal” (Rakentamispalvelun ja metalliromun ostot).',
          'The VAT at 25.5% under “Tax on purchases of construction services and scrap metal” (Vero rakentamispalvelun ja metalliromun ostoista).',
          'The same VAT under “Tax deductible for the tax period” (Verokauden vähennettävä vero), to the extent the purchase is deductible.',
        ] },
        { t: 'p', x: 'Example: a subcontractor invoices a construction company €10,000 without VAT. The company reports €10,000 as purchases, €2,550 (25.5%) as tax on the purchases and, as the work relates to its taxable business, the same €2,550 as deductible tax.' },
        { t: 'p', x: 'The seller reports the total of its reverse-charge sales under “Sales of construction services and scrap metal” (Rakentamispalvelun ja metalliromun myynnit), not as tax on domestic sales. The seller deducts the VAT on its own purchases as usual. If the deductible VAT exceeds the VAT payable — common for subcontractors — the negative VAT is refunded; if the company has overdue taxes, the refund first goes towards paying them.' },
        { t: 'note', x: 'In the Tax Administration’s file format (VSRALVKV) used by software and the Ilmoitin.fi service, the fields have data codes: 320 purchases, 318 tax on purchases, 319 sales and 307 deductible tax. The same fields are also used for construction services on property in Finland bought from a foreign company that has no fixed establishment in Finland and has not registered for VAT here — even if your own company does not sell construction services.' },
        { t: 'h3', x: 'Which rate applies when a contract runs for a long time?' },
        { t: 'p', x: 'The VAT rate is determined by when the construction service is completed — when the client has approved it at the acceptance inspection or otherwise taken it over. Instalments invoiced as the work progresses (maksupostit) are advance payments, and their rate depends on when the payment accrued to the seller. The rule is the same when the buyer pays the VAT under the reverse charge. The general rate rose from 24% to 25.5% on 1 September 2024, which matters for example when correcting returns for earlier periods.' },
        { t: 'h2', x: 'The most common mistakes' },
        { t: 'ul', items: [
          'A private person as the buyer. The reverse charge never applies to sales to private persons — not even when the buyer is a construction entrepreneur buying for private use. The invoice then includes VAT. If part of the house is used in the entrepreneur’s business with a right to deduct, the reverse charge applies.',
          'Housing companies and other buyers that do not sell construction services. A housing company (asunto-osakeyhtiö) or, say, a flower shop usually does not sell construction services, so its renovations are invoiced with VAT. The exception: if the contractor is a foreign company not in the Finnish VAT register, the housing company pays the VAT as the buyer and registers for this purpose.',
          'The State and municipalities. The State is considered to sell construction services only occasionally, so the reverse charge does not apply to its purchases. Municipalities are assessed one by one: if a municipality sells construction services more than occasionally, the reverse charge applies to all its purchases of construction services.',
          'Mixed contracts. When a contract covers construction and something else, the main service decides. The way of invoicing does not: the content of the contract determines whether it is a construction service. If no main service can be identified, the invoice is split. In the Tax Administration’s example, a week of leased workers putting up scaffolding is invoiced with VAT and a week of actual construction work under the reverse charge.',
          'Subcontracting chains. Every sale is assessed separately. The reverse charge applies to a subcontract bought by the main contractor, but transport and design that the subcontractor buys separately are invoiced to it with VAT, even though the subcontractor’s own overall contract is a construction service.',
          'A small business outside the VAT register. If the seller is not liable for VAT because of small-scale business (turnover no more than €20,000 in both the current and the previous calendar year) and has not registered voluntarily, the reverse charge does not apply. The same goes for the buyer: an unregistered small business does not have to register just because it buys a construction service.',
        ] },
        { t: 'h2', x: 'Construction reports and the Contractor’s Obligations Act are separate duties' },
        { t: 'p', x: 'The reverse charge does not replace the other duties in construction. They follow their own rules, also when the reverse charge does not apply:' },
        { t: 'ul', items: [
          'Contract details for the Tax Administration: the buyer of construction work reports contracts worth more than €15,000 excluding VAT by the 5th day of the second month after the reporting month. Housing companies report their contracts too, and in a subcontracting chain each buyer reports its own subcontracts. On a shared site, worker details are also passed to the principal contractor (päätoteuttaja).',
          'Contractor’s Obligations Act (tilaajavastuulaki): the client must obtain reports on its contracting partner when a subcontract is worth at least €9,000 (excluding VAT) or leased workers work for more than ten working days — usually before the contract is signed. In construction, the duty applies to every client, including those for whom construction is not part of their normal business, and the reports also include a certificate of accident insurance if the work is done by the partner’s employee.',
        ] },
        { t: 'h2', x: 'Help with construction VAT' },
        { t: 'p', x: 'We handle bookkeeping and VAT returns for construction businesses. We check when the reverse charge applies, that your invoices are marked correctly and that sales and purchases end up in the right fields of the return. Our accountants serve you in Finnish or Russian.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Vero: VAT reverse charge in the construction industry', href: SRC.reverseEn },
          { label: 'Vero: detailed guidance on the construction reverse charge (in Finnish)', href: SRC.guideFi },
          { label: 'Vero: instructions for filing the VAT return', href: SRC.filingEn },
          { label: 'Vero: changes to VAT rates — which rate applies', href: SRC.ratesEn },
          { label: 'Vero: the information-reporting requirement in the construction industry', href: SRC.reportingEn },
          { label: 'Vero: report contract details', href: SRC.contractsEn },
          { label: 'Finlex: Value Added Tax Act 1501/1993 (in Finnish)', href: SRC.avl },
          { label: 'Työsuojelu: application of the Contractor’s Obligations Act', href: SRC.contractorEn },
        ] },
      ],
      faq: [
        { q: 'Who pays the VAT on a construction service?', a: 'Normally the seller. The buyer pays under the reverse charge when the service is a construction service or the hiring-out of workers for construction services, and the buyer is a business that sells construction services more than occasionally.' },
        { q: 'What must a reverse-charge invoice say?', a: 'The price without VAT and without a VAT rate or amount, the buyer’s Business ID, the text "Käännetty verovelvollisuus" and the grounds for the buyer’s liability, e.g. a reference to section 8 c of the VAT Act.' },
        { q: 'Where does the buyer report the reverse-charge VAT?', a: 'The purchases without VAT under “Purchases of construction services and scrap metal”, the VAT at 25.5% under “Tax on purchases of construction services and scrap metal”, and the deductible part under “Tax deductible for the tax period”.' },
        { q: 'Does the reverse charge apply to a housing company’s renovation?', a: 'Usually not. A housing company does not normally sell construction services, so the contractor invoices with VAT. The exception is a foreign contractor not in the Finnish VAT register: then the housing company pays the VAT as the buyer. Either way, it reports contracts worth more than €15,000 to the Tax Administration.' },
        { q: 'Does the reverse charge apply to private persons?', a: 'No. Construction services sold to a private person are invoiced with VAT, even when the buyer is an entrepreneur buying for private use.' },
        { q: 'What VAT rate applies to construction services in 2026?', a: 'The general rate of 25.5%, in force since 1 September 2024. The rate is set by when the construction service is completed; for instalments, by when the payment accrued to the seller.' },
      ],
    },
    et: {
      title: 'Ehitusteenuste pöördmaksustamine Soomes: kes maksab käibemaksu ja kuidas deklareerida (2026)',
      description:
        'Ehitusteenuste pöördmaksustamine Soomes: millal maksab käibemaksu ostja, mida kirjutada arvele, kuidas deklareerida OmaVeros ja kõige sagedasemad vead.',
      lead: 'Soome ehitussektoris maksab käibemaksu (ALV) sageli ostja, mitte müüja. See pöördmaksustamine (käännetty verovelvollisuus) kehtib ehitusteenustele ja ehitustöödeks renditud tööjõule, kui ostja ise müüb ehitusteenuseid muul kui juhuslikul viisil. Selgitame, millal reegel kehtib, mida arvele märkida, kuidas müüja ja ostja seda deklareerivad ning kus tehakse kõige rohkem vigu.',
      body: [
        { t: 'h2', x: 'Mida pöördmaksustamine tähendab?' },
        { t: 'p', x: 'Tavaliselt maksab käibemaksu müüja. Ehituses paneb Soome käibemaksuseaduse (arvonlisäverolaki) § 8 c kohustuse ostjale: kui tingimused on täidetud, esitab müüja arve ilma käibemaksuta ning ostja arvutab maksu ise, deklareerib ja maksab selle. Ehitusteenustele kehtib üldine maksumäär 25,5 %. Kui ostja ostab teenuse sisendkäibemaksu mahaarvamise õigusega äritegevuse jaoks, arvab ta sama maksu maha samas deklaratsioonis.' },
        { t: 'h2', x: 'Millal maksab käibemaksu ostja?' },
        { t: 'p', x: 'Pöördmaksustamist tuleb kohaldada, kui mõlemad tingimused on täidetud (erandid on allpool):' },
        { t: 'ul', items: [
          'Teenus on ehitusteenus (rakentamispalvelu) või tööjõu rentimine ehitusteenuste jaoks.',
          'Ostja on ettevõtja, kes muul kui juhuslikul viisil müüb ehitusteenuseid või rendib tööjõudu ehitusteenuste jaoks. Tingimuse täidab ka ettevõte, kes muul kui juhuslikul viisil ehitab või laseb ehitada enda valduses olevale maale hooneid müügiks või müüb kinnisasju enne kasutuselevõttu pärast seal tehtud ehitustöid.',
        ] },
        { t: 'p', x: 'Ostja võib olla ka niinimetatud vahendaja ehk ettevõte, kes müüb sama teenuse edasi sellisele ostjale. Müüja tegevusala ei loe: otsustavad teenuse liik ja ostja staatus.' },
        { t: 'h3', x: 'Mida tähendab „muul kui juhuslikul viisil“?' },
        { t: 'p', x: 'Tingimust tõlgendatakse laialt. Ehitus ei pea olema ostja põhitegevus – piisab ehitusteenuste regulaarsest müügist ka kõrvaltegevusena. Soome maksuameti (Verohallinto) näites müüb põllumees, kes aeg-ajalt teeb oma ekskavaatoriga teistele kaevetöid, ehitusteenuseid muul kui juhuslikul viisil, mistõttu ka tema lauda remondile kohaldatakse pöördmaksustamist. Juhuslik on peamiselt ühekordne, ajutine või väheoluline ehitus, mida ei ole mõeldud jätkuma. Ehituse osakaal käibest ei ole iseenesest otsustav ning arvesse võetakse ostja kogu tegevus, ka välismaal.' },
        { t: 'ul', items: [
          'Ehitusettevõte müüb ehitusteenuseid muul kui juhuslikul viisil kohe tegevuse algusest.',
          'Muu tegevusala ettevõtte puhul vaadatakse jooksvat ja eelmist aastat.',
          'Kui tingimus on täidetud, maksab ostja maksu kõigilt ehitusteenustelt, mida ta oma tegevuse jaoks ostab – näiteks ka oma kontori remondilt, mida ta edasi ei müü.',
        ] },
        { t: 'h3', x: 'Kes kontrollib ostja staatust?' },
        { t: 'p', x: 'Vastutus on müüjal. Müüja peab asjakohase hoolsusega välja selgitama, kas ostja vastab tingimustele, ja ebaselgetel juhtudel küsima ostjalt selgitust. See teave ei kajastu ametlikes registrites, näiteks Soome äriregistri infosüsteemis YTJ, seega tasub ostja kinnitus küsida kirjalikult juba pakkumise või lepingu etapis.' },
        { t: 'h2', x: 'Mis on ehitusteenus?' },
        { t: 'p', x: 'Soome käibemaksuseaduse järgi on ehitusteenus kinnisasjale suunatud ehitus- ja remonditöö ning töö käigus paigaldatud kauba üleandmine. Pöördmaksustamine kehtib näiteks:' },
        { t: 'ul', items: [
          'pinnase- ja vundamenditöödele, hoonete ehitusele ning teede ja võrkude ehitusele',
          'ehituspaigaldustele, nagu küte, vesi ja ventilatsioon (LVI), elektri- ja katusetööd, ning viimistlustöödele, nagu krohvimine, värvimine ja klaasimine',
          'hoonete lammutamisele ja ehituskoristusele',
          'ehitusmasina rentimisele koos juhiga, kui masinaga tehakse kinnisasjale suunatud tööd',
          'uste, akende, õhksoojuspumpade ja päikesepaneelide müügile koos paigaldusega.',
        ] },
        { t: 'p', x: 'Ehitusteenus ei ole näiteks projekteerimine ja järelevalve (sh vastutava töödejuhataja – vastaava mestari – töö), arhitekti- ja inseneriteenused, ehitusmasina rentimine ilma juhita, vedu ehitusplatsile, pidev kinnisvarahooldus, korstnapühkimine, ribakardinate paigaldus, tellingute püstitamine ja lammutamine ega tootmisseadmete või kinnisasjal toimuvat eritegevust teenindavate seadmete, näiteks suurköögi seadmete, paigaldus ja hooldus. Kui selline töö on osa lepingust, mille põhiteenus on ehitusteenus, kohaldatakse pöördmaksustamist kogu lepingule; eraldi müüdult sellele pöördmaksustamist ei kohaldata.' },
        { t: 'p', x: 'Ainult kauba müük pöördmaksustamise alla ei kuulu, kuid töö käigus paigaldatud materjal kuulub. Parketi müük iseenesest on kauba müük, parketi müük koos paigaldusega on ehitusteenus. Kui müüja ainult toob ja ühendab külmiku või nõudepesumasina, on see kauba müük, kuid köögimööbli ja kohtkindlalt paigaldatava ahju müük koos paigaldusega on ehitusteenus.' },
        { t: 'h2', x: 'Kuidas müüja arve esitab' },
        { t: 'p', x: 'Müüja peab esitama arve, kuigi maksu deklareerib ja maksab ostja. Arvele märgitakse hind ilma käibemaksuta. Kontrolli, et arvel oleks:' },
        { t: 'ul', items: [
          'tavalised arve andmed, kuid ilma maksumäära ja maksusummata',
          'ostja käibemaksukohustuslase number – Soome ostjal Y-tunnus',
          'märge „Käännetty verovelvollisuus“ (pöördmaksustamine)',
          'ostja maksukohustuse alus, näiteks viide Soome käibemaksuseaduse §-le 8 c (AVL 8 c §)',
          'märge „Itselaskutus“ (isearveldamine), kui arve koostab müüja eest ostja.',
        ] },
        { t: 'p', x: 'Kui arvele on ekslikult märgitud maksusumma ja maksumäär, esitab müüja uue arve, mis viitab algsele. Arveldusprogrammi automaatselt trükitud „alv 0 %“ ei nõua uut arvet, kui arvel on teised nõutud andmed ja viide pöördmaksustamisele. Kui põhiteenusele kohaldatakse pöördmaksustamist, kehtib see ka ostjale arveldatud sõidu- ja majutuskuludele.' },
        { t: 'h2', x: 'Kuidas pöördmaksustamist OmaVeros deklareerida' },
        { t: 'p', x: 'Ostja deklareerib sellised ostud käibedeklaratsioonil kolmel real:' },
        { t: 'ol', items: [
          'Ostude käibemaksuta kogusumma real „Rakentamispalvelun ja metalliromun ostot“ (ehitusteenuste ja metallijäätmete ostud).',
          'Maks 25,5 % määraga real „Vero rakentamispalvelun ja metalliromun ostoista“ (maks ehitusteenuste ja metallijäätmete ostudelt).',
          'Sama maks real „Verokauden vähennettävä vero“ (maksustamisperioodi mahaarvatav maks) ulatuses, milles ost annab mahaarvamise õiguse.',
        ] },
        { t: 'p', x: 'Näide: alltöövõtja esitab ehitusettevõttele arve 10 000 € ilma käibemaksuta. Ettevõte deklareerib ostudena 10 000 €, ostude maksuna 2 550 € (25,5 %) ja, kuna töö on seotud tema maksustatava tegevusega, samad 2 550 € mahaarvatava maksuna.' },
        { t: 'p', x: 'Müüja deklareerib pöördmaksustatud müügi kogusumma real „Rakentamispalvelun ja metalliromun myynnit (käännetty verovelvollisuus)“ (ehitusteenuste ja metallijäätmete müük), mitte siseriikliku müügi maksu all. Oma ostude käibemaksu arvab müüja maha tavapäraselt. Kui mahaarvatavat maksu on rohkem kui tasumisele kuuluvat – alltöövõtjatel sageli –, makstakse negatiivne maks tagasi; tähtaja ületanud maksuvõlgade korral kasutatakse tagastus kõigepealt nende tasumiseks.' },
        { t: 'note', x: 'Soome maksuameti failivormingus (VSRALVKV), mida kasutavad tarkvara ja Ilmoitin.fi teenus, on ridadel koodid: 320 ostud, 318 ostude maks, 319 müük ja 307 mahaarvatav maks. Samadele ridadele märgitakse ka Soomes asuvale kinnisasjale suunatud ehitusteenused, mis on ostetud välismaa ettevõttelt, kellel ei ole Soomes püsivat tegevuskohta ja kes ei ole end siin käibemaksukohustuslaseks registreerinud – ka siis, kui sinu ettevõte ise ehitusteenuseid ei müü.' },
        { t: 'h3', x: 'Milline maksumäär, kui leping kestab kaua?' },
        { t: 'p', x: 'Maksumäär sõltub sellest, millal ehitusteenus on osutatud ehk millal tellija on selle vastuvõtul heaks kiitnud või muul viisil vastu võtnud. Töö edenedes arveldatavad osamaksed (maksupostit) on ettemaksed ja nende maksumäär sõltub sellest, millal raha laekus müüjale. Reegel on sama, kui maksu tasub pöördmaksustamise alusel ostja. Üldine maksumäär tõusis 24 %-lt 25,5 %-le 1.9.2024 – see on oluline näiteks varasemate perioodide deklaratsioonide parandamisel.' },
        { t: 'h2', x: 'Kõige sagedasemad vead' },
        { t: 'ul', items: [
          'Ostja on eraisik. Eraisikule müügile pöördmaksustamist ei kohaldata – ka mitte siis, kui ostja on ise ehitusettevõtja ja tellib töö isiklikuks tarbeks. Arve on siis käibemaksuga. Kui osa majast on ettevõtja mahaarvamise õigusega äritegevuse kasutuses, kohaldatakse pöördmaksustamist.',
          'Korteriühistu (Soomes taloyhtiö, asunto-osakeyhtiö) ja teised ostjad, kes ehitusteenuseid ei müü. Korteriühistu või näiteks lillepood ehitusteenuseid tavaliselt ei müü, seega esitatakse nende remonditöö arved käibemaksuga. Erand: kui töövõtja on välismaa ettevõte, kes ei ole Soome käibemaksukohustuslaste registris, maksab maksu ostjana korteriühistu ja registreerib end selleks.',
          'Riik ja omavalitsused. Riik müüb ehitusteenuseid vaid juhuslikult, seega tema ostudele pöördmaksustamist ei kohaldata. Omavalitsusi hinnatakse eraldi: kui omavalitsus müüb ehitusteenuseid muul kui juhuslikul viisil, kohaldatakse pöördmaksustamist kõigile tema ehitusteenuste ostudele.',
          'Segalepingud. Kui lepingus on nii ehitust kui ka muud, otsustab põhiteenus. Arveldusviis ei otsusta: lepingu sisu määrab, kas tegu on ehitusteenusega. Kui põhiteenust ei saa välja tuua, arve jagatakse. Soome maksuameti näites esitatakse renditöötajate tellingute paigaldamise nädala eest arve käibemaksuga ja tegeliku ehitustöö nädala eest pöördmaksustatult.',
          'Alltöövõtuahel. Iga tehingut hinnatakse eraldi. Peatöövõtja ostetud alltööle kohaldatakse pöördmaksustamist, kuid alltöövõtja eraldi ostetud vedu ja projekteerimine arveldatakse talle käibemaksuga, kuigi tema enda kogu leping on ehitusteenus.',
          'Väike ettevõte väljaspool käibemaksuregistrit. Kui müüja ei ole väikese käibe tõttu käibemaksukohustuslane (käive kuni 20 000 € nii jooksval kui ka eelmisel kalendriaastal) ega ole end vabatahtlikult registreerinud, pöördmaksustamist ei kohaldata. Sama kehtib ostja kohta: registrisse mittekuuluv väike ettevõte ei pea end ehitusteenuse ostu pärast registreerima.',
        ] },
        { t: 'h2', x: 'Ehitusteatised ja tellija vastutus on eraldi kohustused' },
        { t: 'p', x: 'Pöördmaksustamine ei asenda ehituse muid kohustusi. Need kehtivad oma reeglite järgi ka siis, kui pöördmaksustamist ei kohaldata:' },
        { t: 'ul', items: [
          'Lepingute andmed (urakkatiedot) Soome maksuametile: ehitustöö tellija teatab üle 15 000 euro (km-ta) lepingutest aruandekuule järgneva teise kuu 5. kuupäevaks. Korteriühistu teatab samuti oma lepingutest ja alltöövõtuahelas teatab iga tellija oma alltöödest. Ühisel ehitusplatsil antakse töötajate andmed lisaks peatöövõtjale (päätoteuttaja).',
          'Tellija vastutuse seadus (tilaajavastuulaki): tellija peab hankima lepingupartnerilt dokumendid, kui alltöö maksab vähemalt 9 000 € (km-ta) või renditöötajad töötavad üle kümne tööpäeva – üldjuhul juba enne lepingu sõlmimist. Ehituses kehtib kohustus kõigile tellijatele, ka neile, kelle tavapärase tegevuse hulka ehitus ei kuulu, ja dokumentide hulka kuulub ka tõend õnnetusjuhtumikindlustuse kohta, kui tööd teeb lepingupartneri töötaja.',
        ] },
        { t: 'h2', x: 'Abi ehitusettevõtte käibemaksuasjades' },
        { t: 'p', x: 'Peame ehitusettevõtete raamatupidamist ja esitame käibedeklaratsioone. Kontrollime, millal kohaldub pöördmaksustamine, kas arved on õigesti vormistatud ning kas müük ja ostud jõuavad deklaratsioonis õigetele ridadele. Meie raamatupidajad teenindavad soome või vene keeles.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Vero: ehitusteenuste pöördmaksustamine (inglise keeles)', href: SRC.reverseEn },
          { label: 'Vero: põhjalik juhend ehitusteenuste pöördmaksustamise kohta (soome keeles)', href: SRC.guideFi },
          { label: 'Vero: käibedeklaratsiooni täitmine (inglise keeles)', href: SRC.filingEn },
          { label: 'Vero: milline maksumäär kehtib määra muutumisel (inglise keeles)', href: SRC.ratesEn },
          { label: 'Vero: ehitusega seotud teatamiskohustus (inglise keeles)', href: SRC.reportingEn },
          { label: 'Vero: lepingute andmete teatamine (inglise keeles)', href: SRC.contractsEn },
          { label: 'Finlex: Soome käibemaksuseadus 1501/1993 (soome keeles)', href: SRC.avl },
          { label: 'Työsuojelu: tellija vastutuse seaduse kohaldamine (inglise keeles)', href: SRC.contractorEn },
        ] },
      ],
      faq: [
        { q: 'Kes maksab ehitusteenuselt käibemaksu?', a: 'Tavaliselt müüja. Ostja maksab maksu pöördmaksustamise alusel, kui teenus on ehitusteenus või tööjõu rentimine ehitusteenuste jaoks ja ostja on ettevõte, kes müüb ehitusteenuseid muul kui juhuslikul viisil.' },
        { q: 'Mida märkida pöördmaksustatud arvele?', a: 'Hind ilma käibemaksuta, ilma maksumäära ja maksusummata, ostja Y-tunnus, märge „Käännetty verovelvollisuus“ ja ostja maksukohustuse alus, näiteks viide Soome käibemaksuseaduse §-le 8 c.' },
        { q: 'Millistel ridadel deklareerib ostja pöördmaksustatud käibemaksu?', a: 'Ostude käibemaksuta summa real „Rakentamispalvelun ja metalliromun ostot“, maks 25,5 % määraga real „Vero rakentamispalvelun ja metalliromun ostoista“ ja mahaarvatav osa real „Verokauden vähennettävä vero“.' },
        { q: 'Kas korteriühistu remondile kohaldatakse pöördmaksustamist?', a: 'Tavaliselt mitte. Korteriühistu ei müü üldjuhul ehitusteenuseid, seega esitab töövõtja arve käibemaksuga. Erand on välismaa töövõtja, kes ei ole Soome käibemaksukohustuslaste registris: siis maksab maksu ostjana korteriühistu. Üle 15 000 euro lepingutest teatab korteriühistu igal juhul Soome maksuametile.' },
        { q: 'Kas pöördmaksustamine kehtib eraisikule?', a: 'Ei. Eraisikule müüdud ehitusteenuse arve on käibemaksuga, ka siis, kui ostja on ettevõtja, kes ostab teenuse isiklikuks tarbeks.' },
        { q: 'Milline käibemaksumäär kehtib ehitusteenustele 2026. aastal?', a: 'Üldine maksumäär 25,5 %, mis kehtib alates 1.9.2024. Määr sõltub sellest, millal ehitusteenus on osutatud; osamaksete puhul sellest, millal raha laekus müüjale.' },
      ],
    },
    uk: {
      title: 'Зворотне нарахування ПДВ (ALV) у будівництві Фінляндії: хто сплачує і як декларувати (2026)',
      description:
        'Зворотне нарахування ПДВ у будівництві Фінляндії: коли податок сплачує покупець, що вказати в рахунку, як заповнити декларацію в OmaVero і типові помилки.',
      lead: 'У будівництві Фінляндії ПДВ (ALV) часто сплачує не продавець, а покупець. Це зворотне нарахування (käännetty verovelvollisuus): воно стосується будівельних послуг і оренди персоналу для будівельних робіт, якщо покупець сам продає будівельні послуги не епізодично. Розбираємо, коли діє правило, що писати в рахунку, як його декларують продавець і покупець і де найчастіше помиляються.',
      body: [
        { t: 'h2', x: 'Що таке зворотне нарахування?' },
        { t: 'p', x: 'Зазвичай ПДВ сплачує продавець. У будівництві § 8 c закону про ПДВ (arvonlisäverolaki) перекладає обов’язок на покупця: якщо умови виконано, продавець виставляє рахунок без ПДВ, а покупець сам розраховує податок, декларує і сплачує його. Для будівельних послуг застосовується загальна ставка — 25,5 %. Якщо покупець купує послугу для діяльності з правом на відрахування, він відраховує той самий податок у тій самій декларації.' },
        { t: 'h2', x: 'Коли податок сплачує покупець?' },
        { t: 'p', x: 'Зворотне нарахування обов’язкове, якщо виконано обидві умови (винятки — нижче):' },
        { t: 'ul', items: [
          'Послуга будівельна (rakentamispalvelu) або це оренда персоналу (лізинг працівників) для будівельних робіт.',
          'Покупець — підприємець, який не епізодично продає будівельні послуги або здає працівників в оренду для будівельних робіт. Умову виконує й компанія, яка не епізодично будує або замовляє будівництво будівель на своїй землі для продажу чи продає нерухомість до введення в експлуатацію після будівельних робіт.',
        ] },
        { t: 'p', x: 'Покупцем може бути й так званий посередник — компанія, яка перепродає ту саму послугу такому покупцеві. Галузь продавця значення не має: вирішують вид послуги та статус покупця.' },
        { t: 'h3', x: 'Що означає «не епізодично»?' },
        { t: 'p', x: 'Умову тлумачать широко. Будівництво не мусить бути основною діяльністю покупця: досить регулярно продавати будівельні послуги, навіть як побічний бізнес. У прикладі податкової (Verohallinto) фермер, який час від часу копає екскаватором для інших, продає будівельні послуги не епізодично, тож і до ремонту його корівника застосовується зворотне нарахування. Епізодичним вважається переважно одноразове, тимчасове чи незначне будівництво, яке не передбачає продовження. Частка будівництва в обороті сама по собі не вирішальна, і до уваги береться вся діяльність покупця, зокрема за кордоном.' },
        { t: 'ul', items: [
          'Будівельна компанія вважається такою, що продає будівельні послуги не епізодично, з першого дня роботи.',
          'Для компаній з інших галузей дивляться на поточний і минулий рік.',
          'Якщо умову виконано, покупець сплачує податок з усіх будівельних послуг, які купує для своєї діяльності, — наприклад, і з ремонту власного офісу, який він нікому не перепродає.',
        ] },
        { t: 'h3', x: 'Хто перевіряє статус покупця?' },
        { t: 'p', x: 'Відповідальність лежить на продавцеві. Він має з належною ретельністю з’ясувати, чи відповідає покупець умовам, а в незрозумілих випадках — попросити в покупця пояснення. У державних реєстрах, наприклад у YTJ, ця інформація не відображається, тож підтвердження покупця краще отримати письмово ще на етапі пропозиції чи договору.' },
        { t: 'h2', x: 'Що вважається будівельною послугою?' },
        { t: 'p', x: 'За законом про ПДВ будівельна послуга — це будівельні та ремонтні роботи на об’єкті нерухомості, а також постачання товару, встановленого під час цих робіт. Зворотне нарахування застосовується, наприклад, до:' },
        { t: 'ul', items: [
          'земляних і фундаментних робіт, будівництва будівель, доріг та інженерних мереж',
          'монтажу інженерних систем — сантехніки, опалення й вентиляції (LVI), електрики, покрівельних робіт — і оздоблення: штукатурення, фарбування, скління',
          'знесення будівель і будівельного прибирання',
          'оренди будівельної техніки з оператором, якщо технікою виконують роботи на об’єкті нерухомості',
          'продажу дверей, вікон, теплових насосів «повітря — повітря» та сонячних панелей зі встановленням.',
        ] },
        { t: 'p', x: 'Будівельною послугою не є, наприклад, проєктування і нагляд (зокрема робота відповідального виконавця робіт — vastaava mestari), послуги архітекторів та інженерів, оренда техніки без оператора, доставка на будмайданчик, постійне обслуговування нерухомості (kiinteistönhoito), послуги сажотруса, встановлення жалюзі, монтаж і демонтаж будівельних риштовань, а також монтаж і обслуговування виробничого обладнання та обладнання для особливої діяльності на об’єкті, наприклад професійної кухні. Якщо така робота входить до підряду, основна частина якого — будівельна послуга, зворотне нарахування поширюється на весь підряд; в разі окремого продажу воно до неї не застосовується.' },
        { t: 'p', x: 'Продаж лише товарів під зворотне нарахування не підпадає, а матеріали, встановлені під час робіт, — підпадають. Паркет без укладання — продаж товару, паркет з укладанням — будівельна послуга. Якщо продавець лише привозить і підключає холодильник чи посудомийну машину, це продаж товару, а кухонні меблі та вбудована духовка зі встановленням — будівельна послуга.' },
        { t: 'h2', x: 'Як продавець виставляє рахунок' },
        { t: 'p', x: 'Продавець зобов’язаний виставити рахунок, хоча податок декларує і сплачує покупець. У рахунку зазначають ціну без ПДВ. Перевірте, що в рахунку є:' },
        { t: 'ul', items: [
          'звичайні реквізити рахунку, але без ставки й суми податку',
          'ідентифікатор платника ПДВ покупця — для фінського покупця це Y-tunnus',
          'позначка «Käännetty verovelvollisuus» (зворотне нарахування)',
          'підстава обов’язку покупця, наприклад посилання на § 8 c закону про ПДВ (AVL 8 c §)',
          'позначка «Itselaskutus» (самовиставлення), якщо рахунок за продавця складає покупець.',
        ] },
        { t: 'p', x: 'Якщо в рахунку помилково зазначено суму і ставку податку, продавець виставляє новий рахунок із посиланням на початковий. Автоматичний напис «alv 0 %» із програми не вимагає нового рахунку, якщо в ньому є решта обов’язкових реквізитів і посилання на зворотне нарахування. Якщо до основної послуги застосовується зворотне нарахування, воно поширюється і на виставлені покупцеві витрати на проїзд і проживання.' },
        { t: 'h2', x: 'Як задекларувати зворотне нарахування в OmaVero' },
        { t: 'p', x: 'Покупець зазначає такі покупки в декларації з ПДВ у трьох полях:' },
        { t: 'ol', items: [
          'Загальну суму покупок без ПДВ — у полі «Rakentamispalvelun ja metalliromun ostot» (покупки будівельних послуг і металобрухту).',
          'Податок за ставкою 25,5 % — у полі «Vero rakentamispalvelun ja metalliromun ostoista» (податок з покупок будівельних послуг і металобрухту).',
          'Той самий податок — у полі «Verokauden vähennettävä vero» (податок до відрахування за період) у тій частині, в якій покупка дає право на відрахування.',
        ] },
        { t: 'p', x: 'Приклад: субпідрядник виставляє будівельній компанії рахунок на 10 000 € без ПДВ. Компанія зазначає 10 000 € у покупках, 2 550 € (25,5 %) — як податок з покупок і, якщо роботи пов’язані з її оподатковуваною діяльністю, ті самі 2 550 € — як податок до відрахування.' },
        { t: 'p', x: 'Продавець зазначає загальну суму таких продажів у полі «Rakentamispalvelun ja metalliromun myynnit (käännetty verovelvollisuus)» (продажі будівельних послуг і металобрухту), а не в податку з продажів усередині країни. ПДВ зі своїх закупівель продавець відраховує як зазвичай. Якщо податку до відрахування більше, ніж нарахованого, — у субпідрядників так буває часто, — від’ємний податок повертають; якщо є прострочені податкові борги, повернення спершу йде на їх погашення.' },
        { t: 'note', x: 'У форматі файлу податкової (VSRALVKV), який використовують програми та сервіс Ilmoitin.fi, поля мають коди: 320 — покупки, 318 — податок з покупок, 319 — продажі, 307 — податок до відрахування. У ці самі поля потрапляють будівельні послуги на об’єктах у Фінляндії, куплені в іноземної компанії без постійного представництва у Фінляндії, яка не зареєструвалася тут платником ПДВ, — навіть якщо ваша компанія сама будівельні послуги не продає.' },
        { t: 'h3', x: 'Яка ставка, якщо підряд триває довго?' },
        { t: 'p', x: 'Ставка визначається за моментом, коли будівельну послугу надано, тобто коли замовник прийняв роботу під час приймання або в інший спосіб. Проміжні платежі в міру виконання робіт (maksupostit) — це аванси, і ставка для них визначається за моментом, коли гроші надійшли продавцеві. Правило те саме, коли податок за зворотним нарахуванням сплачує покупець. Загальна ставка зросла з 24 % до 25,5 % 1.9.2024 — це важливо, наприклад, під час виправлення декларацій за минулі періоди.' },
        { t: 'h2', x: 'Типові помилки' },
        { t: 'ul', items: [
          'Покупець — приватна особа. До продажів приватним особам зворотне нарахування не застосовується, навіть якщо покупець сам будівельник-підприємець і замовляє роботу для себе особисто. Рахунок тоді виставляється з ПДВ. Якщо частина будинку використовується в його діяльності з правом на відрахування, зворотне нарахування застосовується.',
          'Житлове товариство (taloyhtiö, asunto-osakeyhtiö) та інші покупці, які не продають будівельних послуг. Житлове товариство чи, наприклад, квітковий магазин зазвичай не продають будівельних послуг, тож їхні ремонти виставляються з ПДВ. Виняток: якщо підрядник — іноземна компанія, не зареєстрована у Фінляндії платником ПДВ, податок як покупець сплачує житлове товариство і для цього реєструється.',
          'Держава й муніципалітети. Вважається, що держава продає будівельні послуги лише епізодично, тож до її покупок зворотне нарахування не застосовується. Муніципалітети оцінюють окремо: якщо муніципалітет продає будівельні послуги не епізодично, зворотне нарахування застосовується до всіх його покупок будівельних послуг.',
          'Змішані договори. Якщо в договорі є і будівництво, і щось інше, вирішує основна послуга. Спосіб виставлення рахунку значення не має: чи це будівельна послуга, визначає зміст договору. Якщо основну послугу виокремити не можна, рахунок ділять. У прикладі податкової тиждень монтажу риштовань орендованими працівниками йде з ПДВ, а тиждень власне будівельних робіт — за зворотним нарахуванням.',
          'Ланцюжок субпідряду. Кожну угоду оцінюють окремо. До субпідряду, який купує генпідрядник, застосовується зворотне нарахування, а доставку й проєктування, які субпідрядник замовляє окремо, йому виставляють з ПДВ, хоча весь його підряд — будівельна послуга.',
          'Невелика компанія поза реєстром ПДВ. Якщо продавець не є платником ПДВ через невеликий оборот (не більше 20 000 € і в поточному, і в минулому календарному році) і не зареєструвався добровільно, зворотне нарахування не застосовується. Те саме для покупця: невеликій компанії поза реєстром не потрібно реєструватися лише через купівлю будівельної послуги.',
        ] },
        { t: 'h2', x: 'Будівельні звіти та відповідальність замовника — окремі обов’язки' },
        { t: 'p', x: 'Зворотне нарахування не замінює інших обов’язків у будівництві. Вони діють за своїми правилами, зокрема коли зворотне нарахування не застосовується:' },
        { t: 'ul', items: [
          'Відомості про підряди (urakkatiedot) для податкової: замовник будівельних робіт повідомляє про підряди дорожчі за 15 000 € без ПДВ не пізніше 5-го числа другого місяця після звітного. Житлове товариство теж подає такі звіти, а в ланцюжку субпідряду кожен замовник повідомляє про свої субпідряди. На спільному будмайданчику відомості про працівників додатково передають генпідрядникові (päätoteuttaja).',
          'Закон про відповідальність замовника (tilaajavastuulaki): замовник має отримати від контрагента документи, якщо субпідряд коштує від 9 000 € (без ПДВ) або орендовані працівники працюють понад десять робочих днів, — як правило, ще до укладення договору. У будівництві обов’язок стосується всіх замовників, навіть тих, для кого будівництво — не звичайна діяльність, і до документів додається довідка про страхування від нещасних випадків, якщо роботу виконує працівник контрагента.',
        ] },
        { t: 'h2', x: 'Допоможемо з ALV у будівництві' },
        { t: 'p', x: 'Ведемо бухгалтерію та декларації з ALV будівельних компаній. Перевіряємо, коли застосовується зворотне нарахування, чи правильно оформлені рахунки та чи потрапляють продажі й покупки в потрібні поля декларації. Наші бухгалтери обслуговують фінською або російською мовою.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: зворотне нарахування ПДВ у будівництві (англійською)', href: SRC.reverseEn },
          { label: 'Vero: детальна інструкція щодо зворотного нарахування в будівництві (фінською)', href: SRC.guideFi },
          { label: 'Vero: як подати декларацію з ПДВ (англійською)', href: SRC.filingEn },
          { label: 'Vero: яка ставка ПДВ застосовується під час її зміни (англійською)', href: SRC.ratesEn },
          { label: 'Vero: обов’язок повідомляти відомості про будівництво (англійською)', href: SRC.reportingEn },
          { label: 'Vero: відомості про підряди — urakkatiedot (англійською)', href: SRC.contractsEn },
          { label: 'Finlex: закон про ПДВ — arvonlisäverolaki (фінською)', href: SRC.avl },
          { label: 'Työsuojelu: відповідальність замовника — tilaajavastuulaki (англійською)', href: SRC.contractorEn },
        ] },
      ],
      faq: [
        { q: 'Хто сплачує ПДВ за будівельну послугу?', a: 'Зазвичай продавець. Покупець сплачує податок за зворотним нарахуванням, якщо це будівельна послуга або оренда персоналу для будівельних робіт, а покупець — компанія, яка продає будівельні послуги не епізодично.' },
        { q: 'Що вказати в рахунку при зворотному нарахуванні?', a: 'Ціну без ПДВ, без ставки й суми податку, Y-tunnus покупця, позначку «Käännetty verovelvollisuus» і підставу обов’язку покупця, наприклад посилання на § 8 c закону про ПДВ.' },
        { q: 'У яких полях покупець декларує зворотне нарахування?', a: 'Суму покупок без ПДВ — у «Rakentamispalvelun ja metalliromun ostot», податок за ставкою 25,5 % — у «Vero rakentamispalvelun ja metalliromun ostoista», частину з правом на відрахування — у «Verokauden vähennettävä vero».' },
        { q: 'Чи застосовується зворотне нарахування до ремонту житлового товариства?', a: 'Зазвичай ні. Житлове товариство (taloyhtiö), як правило, будівельних послуг не продає, тож підрядник виставляє рахунок з ПДВ. Виняток — іноземний підрядник, не зареєстрований у Фінляндії платником ПДВ: тоді податок як покупець сплачує житлове товариство. Про підряди дорожчі за 15 000 € воно в будь-якому разі подає відомості до податкової.' },
        { q: 'Чи стосується зворотне нарахування приватних осіб?', a: 'Ні. Будівельні послуги приватній особі продають з ПДВ, навіть якщо покупець — підприємець, який замовляє роботу для особистих потреб.' },
        { q: 'Яка ставка ПДВ на будівельні послуги у 2026 році?', a: 'Загальна ставка 25,5 %, що діє з 1.9.2024. Ставка визначається за моментом надання будівельної послуги, а для проміжних платежів — за моментом надходження грошей продавцеві.' },
      ],
    },
  },
};
