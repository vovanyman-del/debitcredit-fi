import type { Guide } from './types';

// Facts verified 2026-11-02, verbatim, against Finlex (consolidated Finnish texts; KPL and OYL version
// "ajantasa/2026-06-16", EVL "ajantasa/2026-04-24", TTL "ajantasa/2026-06-16", PMA unamended since 1753/2015),
// prh.fi and vero.fi (page update date in brackets where the page shows one). Every link below was fetched
// the same day and answered HTTP 200.
// - Kirjanpitolaki 1336/1997 (https://www.finlex.fi/fi/lainsaadanto/1997/1336):
//   1:1 kirjanpitovelvollisia "avoin yhtiö, kommandiittiyhtiö, osakeyhtiö, osuuskunta, yhdistys, säätiö".
//   1:1 a 1 mom. "Luonnollinen henkilö ... on kirjanpitovelvollinen harjoittamastaan liike- ja
//   ammattitoiminnasta"; 2 mom. "ammatin- ja liikkeenharjoittaja ei ole velvollinen pitämään
//   kahdenkertaista kirjanpitoa, mikäli sekä päättyneenä, että sitä edeltäneellä tilikaudella on täyttynyt
//   enintään yksi seuraavista edellytyksistä: taseen loppusumma ylittää 100 000 euroa; liikevaihto tai sitä
//   vastaava tuotto ylittää 200 000 euroa; tai palveluksessa on keskimäärin yli kolme henkilöä"; 3 mom.
//   "Ammatin- ja liikkeenharjoittaja on velvollinen laatimaan tilinpäätöksen, jos sekä päättyneellä että
//   sitä välittömästi edeltäneellä tilikaudella on ylittynyt vähintään kaksi 4 b §:ssä säädetyistä
//   rajoista. Tilinpäätöksen laatimisessa noudatetaan, mitä ... säädetään mikroyrityksen tilinpäätöksestä."
//   1:4 "Tilikausi on 12 kuukautta"; "ammatin- ja liikkeenharjoittajan tilikautena on aina kalenterivuosi.
//   Jos noudatetaan kahdenkertaista kirjanpitoa, voi tilikausi kuitenkin erota kalenterivuodesta".
//   1:4 a pienyritys = "kirjanpitovelvollista, jolla sekä päättyneellä että sitä välittömästi edeltäneellä
//   tilikaudella ylittyy enintään yksi seuraavista kolmesta raja-arvosta tilinpäätöspäivänä: taseen
//   loppusumma 7 500 000 euroa; liikevaihto 15 000 000 euroa; tilikauden aikana palveluksessa keskimäärin
//   50 henkilöä." 1:4 b mikroyritys, same wording: "taseen loppusumma 450 000 euroa; liikevaihto 900 000
//   euroa; tilikauden aikana palveluksessa keskimäärin 10 henkilöä." Changed by L 605/2024 ("muutt. 1
//   luvun 4 a–4 c ...", implementing Commission delegated directive (EU) 2023/2775): "Tämä laki tulee
//   voimaan 15 päivänä marraskuuta 2024. Lakia sovelletaan 1 päivänä tammikuuta 2025 ja sen jälkeen
//   alkaviin tilikausiin. Lakia voidaan soveltaa myös tilikaudella, joka on alkanut ... 1 päivänä
//   tammikuuta 2024 tai sen jälkeen." (Values also confirmed in the 605/2024 act itself on Finlex. Older
//   values not quoted here: not re-verified.)
//   2:10 "Tilinpäätös, toimintakertomus, kirjanpidot, tililuettelo sekä luettelo kirjanpidoista ja
//   aineistoista on säilytettävä vähintään 10 vuotta tilikauden päättymisestä"; "tilikauden tositteet,
//   liiketapahtumia koskeva kirjeenvaihto sekä muu ... kirjanpitoaineisto on säilytettävä vähintään kuusi
//   vuotta sen vuoden lopusta, jonka aikana tilikausi on päättynyt".
//   3:1 tilinpäätös = "tilinpäätöspäivän taloudellista asemaa kuvaavan taseen; tuloksen muodostumista
//   kuvaavan tuloslaskelman; varojen hankintaa ja niiden käyttöä selvittävän rahoituslaskelman, jos
//   kirjanpitovelvollinen on suuryritys tai yleisen edun kannalta merkittävä yhteisö; sekä ... liitteenä
//   olevat tiedot"; comparatives "viimeistä edelliseltä tilikaudelta"; toimintakertomus required if
//   "julkinen osakeyhtiö; sellainen osuuskunta tai yksityinen osakeyhtiö, joka ei ole mikro- tai
//   pienyritys; tai yleisen edun kannalta merkittävä yhteisö". 3:3 "tilikaudelle kuuluvien tuottojen ja
//   kulujen huomioon ottaminen riippumatta niihin perustuvien maksujen suorituspäivästä". 3:4 "Vähäisiä
//   kirjauksia, jotka on tehty laskuperusteisesti tai maksuperusteisesti, ei ole tarpeen oikaista ...
//   ellei niiden yhteisvaikutus ole olennainen." 3:5 "suomen tai ruotsin kielellä euromääräisenä".
//   3:6 "Tilinpäätös ja toimintakertomus on laadittava neljän kuukauden kuluessa tilikauden päättymisestä."
//   3:7 "on päivättävä ja kirjanpitovelvollisen on ne allekirjoitettava. Jos kirjanpitovelvollinen on
//   yhteisö ..., tilinpäätöksen ja toimintakertomuksen allekirjoittavat hallitus tai vastuunalaiset
//   yhtiömiehet ja toimitusjohtaja". 3:9 copy "on aina ilmoitettava rekisteröitäväksi
//   patentti- ja rekisterihallitukselle, jos kirjanpitovelvollinen on: osakeyhtiö; avoin yhtiö tai
//   kommandiittiyhtiö, jonka vastuunalaisena yhtiömiehenä on osakeyhtiö; ..."; "sovelletaan myös muuhun
//   kirjanpitovelvolliseen, joka on pienyritystä suurempi"; "kuuden kuukauden kuluessa tilikauden
//   päättymisestä. Osakeyhtiötä ja osuuskuntaa koskevista määräajoista säädetään erikseen." 3:13
//   "Tilinpäätöstä varmentamaan on laadittava tase-erittelyt." 4:6 siirtosaamiset: "tilikaudella ...
//   suoritetut maksut tulevina tilikausina ... toteutuvista menoista" and "toteutuneet tulot, joista ei ole
//   saatu maksua". 5:5 "hankintameno poistetaan merkitsemällä se suunnitelman mukaan kuluksi kullekin
//   tilikaudelle hyödykkeen vaikutusaikana". 5:6 "Tilikauden päättyessä jäljellä olevan vaihto-omaisuuden
//   hankintameno aktivoidaan. Jos vaihto-omaisuuden todennäköinen hankintameno tai luovutushinta on
//   tilikauden päättyessä hankintamenoa pienempi, on erotus kuitenkin kirjattava kuluksi."
// - PMA 1753/2015 (https://www.finlex.fi/fi/lainsaadanto/2015/1753): "Pienyritys ei ole velvollinen
//   laatimaan kirjanpitolain 3 luvun 1a §:n mukaista toimintakertomusta"; "Mikroyritys ei ole velvollinen
//   laatimaan ... toimintakertomusta"; with the signatures, unless shown in the notes: "annettava tieto
//   siitä että tilinpäätös on laadittu tämän asetuksen pien- tai mikroyrityssäännösten mukaisesti; ja
//   ilmoitettava oman pääoman muutokset sekä hallituksen ehdotus jakokelpoisen vapaan oman pääoman
//   käytöstä, jos pienyritys on osakeyhtiö tai osuuskunta"; "Pienyrityksen tase on laadittava tämän
//   asetuksen V liitteen kaavan mukaisesti"; small-company notes e.g. "henkilöstön keskimääräinen
//   lukumäärä"; micro: "Mitä edellä 3 luvussa säädetään pienyrityksen liitetiedoista, sovelletaan myös
//   mikroyritykseen" (except fair-value notes).
// - Osakeyhtiölaki 624/2006 (https://www.finlex.fi/fi/lainsaadanto/2006/624): 5:3 "Varsinainen
//   yhtiökokous on pidettävä kuuden kuukauden kuluessa tilikauden päättymisestä"; it decides
//   "tilinpäätöksen vahvistamisesta", "taseen osoittaman voiton käyttämisestä", "vastuuvapaudesta
//   hallituksen jäsenille ... ja toimitusjohtajalle". 8:10 "Yhtiön on ilmoitettava tilinpäätös ja
//   toimintakertomus rekisteröitäviksi kahden kuukauden kuluessa tilinpäätöksen vahvistamisesta"; neglect:
//   "yhtiö voidaan ... asettaa selvitystilaan tai poistaa kaupparekisteristä". 13:2 "Varoja ei saa jakaa,
//   jos jaosta päätettäessä tiedetään tai pitäisi tietää yhtiön olevan maksukyvytön tai jaon aiheuttavan
//   maksukyvyttömyyden."
// - Tilintarkastuslaki 1141/2015 (https://www.finlex.fi/fi/lainsaadanto/2015/1141): 2:2 "tilintarkastaja
//   voidaan jättää valitsematta yhteisössä, jossa sekä päättyneellä että sitä välittömästi edeltäneellä
//   tilikaudella on täyttynyt enintään yksi seuraavista edellytyksistä: taseen loppusumma ylittää 100 000
//   euroa; liikevaihto tai sitä vastaava tuotto ylittää 200 000 euroa; tai palveluksessa on keskimäärin yli
//   kolme henkilöä"; start-up may skip "jollei ole ilmeistä, ettei edellytyksiä ... ole"; always required in
//   a company whose main line is "arvopapereiden omistaminen ja hallinta" with significant influence; the
//   articles may still require an audit. Also: "tilinpäätös ja toimintakertomus on annettava
//   tilintarkastajalle viimeistään kuukautta ennen tätä kokousta".
// - Elinkeinoverolaki 360/1968 (https://www.finlex.fi/fi/lainsaadanto/1968/360): 30 § "Verovuoden poiston
//   suuruus saa olla enintään 25 prosenttia menojäännöksestä"; "Enintään 1 200 euron suuruinen
//   menojäännös saadaan poistaa kerralla". 33 § whole cost at once if "todennäköinen taloudellinen
//   käyttöaika on enintään 3 vuotta; tai hankintameno on enintään 1 200 euroa"; "Pienhankintoina saadaan
//   verovuonna vähentää yhteensä enintään 3 600 euroa". 54 § "Poistoina ... verovelvollinen ei saa vähentää
//   suurempaa määrää kuin mitä hän on verovuonna ja aikaisemmin kirjanpidossaan vähentänyt."
//   Cross-check vero.fi Poistot ja pienhankinnat (1.1.2025): "enintään 25 %:n vuotuisen poiston",
//   "Tällaisia pienhankintoja voit vähentää yhteensä 3 600 euroa"; EN Depreciation expenses (1.1.2026):
//   "The maximum total ... is €3,600 per year".
// - prh.fi Tilinpäätökset (18.9.2026): "tilinpäätös täytyy ilmoittaa myös silloin, kun yritys ei ole
//   toiminnassa"; "Yksityisen elinkeinonharjoittajan (toiminimiyrittäjän) ei yleensä tarvitse ilmoittaa
//   tilinpäätöstään kaupparekisteriin"; oy: "Ilmoita tilinpäätös YTJ-palvelussa vasta, kun tilinpäätös on
//   vahvistettu yhtiökokouksessa"; after 1 year "yritys voi joutua poistetuksi kaupparekisteristä, tai se
//   voidaan määrätä selvitystilaan". Osakeyhtiö ja osuuskunta (18.9.2026): "Ilmoita vahvistettu
//   tilinpäätös kaupparekisteriin 8 kuukauden kuluessa tilikauden päättymisestä"; "maksutonta 8 kuukauden
//   ajan". Avoin yhtiö ja kommandiittiyhtiö: "6 kuukauden kuluessa tilikauden päättymisestä vain, kun" an
//   oy is the partnership's responsible partner (KPL 3:9: "jonka vastuunalaisena yhtiömiehenä on osakeyhtiö"), or "vähintään kaksi seuraavista rajoista: liikevaihto 15 000 000 euroa;
//   taseen loppusumma 7 500 000 euroa; palveluksessa keskimäärin 50 henkilöä". Yksityinen
//   elinkeinonharjoittaja (1.1.2026): the same two-of-three test, "6 kuukauden kuluessa". Myöhästymismaksu
//   (29.1.2026) and press release 25.8.2026: "koskee 1.12.2024 ja sen jälkeen päättyvien tilikausien
//   tilinpäätöksiä"; "150 euroa, jos ... enintään 2 kuukautta myöhässä; 300 euroa, jos ... 2–4 kuukautta
//   myöhässä; 600 euroa, jos ... yli 4 kuukautta myöhässä tai tilinpäätöstä ei ole ilmoitettu";
//   "kaksinkertaisena, jos tilinpäätöstä ei ole ilmoitettu ajoissa kahdelta tai useammalta peräkkäiseltä
//   tilikaudelta"; "Useimmat yritykset ilmoittavat vahvistetun tilinpäätöksen veroilmoituksen mukana".
// - vero.fi Osakeyhtiön ja osuuskunnan veroilmoitus (1.1.2026): "Anna veroilmoitus neljän kuukauden
//   kuluessa siitä, kun tilikauden viimeinen kalenterikuukausi on päättynyt"; also when "toimintaa ei ole
//   ollut"; financial statements "aina sähköisesti". Uutinen 2.4.2026: "joulukuussa 2025 tilikautensa
//   päättäneiden yhtiöiden on annettava veroilmoituksensa viimeistään 30.4.2026" (same rule → 30.4.2027
//   for 31.12.2026; 30.4.2027 is a Friday); "Verohallinto välittää automaattisesti kaupparekisteriin kaikki
//   ne tilinpäätöstiedot, jotka ... nimennyt PRH:lle välitettävillä ... liitetyypeillä"; "Jos tilinpäätöstä
//   ei ole vahvistettu, ... liitetyypiksi 'Tilinpäätös vain Verohallinnolle'"; dividend data: "Jos päätös
//   voitonjaosta tehdään vasta veroilmoituksen jättämisen jälkeen, lähetä tiedot Verohallintoon kuukauden
//   kuluessa päätöksen tekemisestä."
// - vero.fi liikkeen- ja ammatinharjoittajan täyttöohje (17.11.2025; EN 17.11.2025): "Elinkeinotoiminnan
//   veroilmoitus vuodelta 2025 pitää antaa viimeistään 1.4.2026"; "You must file the Business tax return
//   (Form 5) for every year – even if you have not had any business activities." Avoin yhtiö ja
//   kommandiittiyhtiö (EN 18.6.2026): "File Form 6A by 1 April 2026"; "Älä liitä tilinpäätöstietoja mukaan
//   veroilmoitukseen"; "Verohallinto ei välitä tilinpäätöstietoja Patentti- ja rekisterihallitukseen".
//   The 2027 dates for forms 5 and 6A were not yet published on vero.fi, so they are not stated.
// - Own arithmetic: 31.12.2026 + 4 months = 30.4.2027; + 6 months = 30.6.2027; + 8 months = 31.8.2027.
//   Retention for FY 2026: vouchers until end of 2032, statements and books until 31.12.2036.
// Not stated (not re-verified or out of scope): the pre-2025 size limits, tax-return deadlines for 2027
// for forms 5/6A, the § number of the TTL one-month rule, any bureau price.
const VERO = 'https://www.vero.fi';
const PRH = 'https://www.prh.fi';

const SRC = {
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
  pma: 'https://www.finlex.fi/fi/lainsaadanto/2015/1753',
  oyl: 'https://www.finlex.fi/fi/lainsaadanto/2006/624',
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  ttl: 'https://www.finlex.fi/fi/lainsaadanto/2015/1141',
  prhHubFi: `${PRH}/fi/yrityksetjayhteisot/tilinpaatokset.html`,
  prhOyFi: `${PRH}/fi/yrityksetjayhteisot/tilinpaatokset/osakeyhtio_ja_osuuskunta_tilinpaatos_kaupparekisteriin.html`,
  prhFeeFi: `${PRH}/fi/yrityksetjayhteisot/tilinpaatokset/yrityksen_tilinpaatos_myohassa/myohastymismaksu.html`,
  prhOyEn: `${PRH}/en/companiesandorganisations/financial_statements/limited_liability_companies_co-operatives_and_other_companies.html`,
  prhFeeEn: `${PRH}/en/companiesandorganisations/financial_statements/filing_financial_statements_late/fee-for-late-submission.html`,
  oyReturnFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/osakeyhtio-ja-osuuskunta/veroilmoitus/`,
  oyReturnEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/limited-companies-and-cooperatives/tax-return/`,
  tmiReturnFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/veroilmoituksen-t%C3%A4ytt%C3%B6ohje/`,
  tmiReturnEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/instructions-for-filing/`,
  deprFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/vahennykset/poistot-ja-pienhankinnat/`,
  deprEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/limited-companies-and-cooperatives/income-tax/depreciation-expenses/`,
};

export const tilinpaatosPienyritykselle: Guide = {
  slug: 'tilinpaatos-pienyritykselle',
  datePublished: '2026-11-05',
  dateModified: '2026-11-05',
  content: {
    fi: {
      title: 'Tilinpäätös pienyritykselle 2026: sisältö, määräajat ja vuodenvaihteen tehtävät',
      description:
        'Tilinpäätös 2026: mitä pien- ja mikroyrityksen tilinpäätökseen kuuluu, tarvitseeko toiminimi sitä, määräajat PRH:lle ja Verolle sekä aikataulu tammi–elokuulle.',
      lead: 'Useimpien yritysten tilikausi päättyy 31.12., ja silloin alkaa tilinpäätöksen aika. Kokosimme, mitä pienen osakeyhtiön, avoimen yhtiön, kommandiittiyhtiön ja toiminimen pitää tehdä, mitkä määräajat ovat lakisääteisiä ja mitä kannattaa tarkistaa jo joulukuussa. Lopussa on kuukausittainen aikataulu tammikuusta elokuuhun.',
      body: [
        { t: 'h2', x: 'Mikä tilinpäätös on?' },
        { t: 'p', x: 'Tilinpäätös on kirjanpitolain (1336/1997) mukainen yhteenveto tilikauden tuloksesta ja yrityksen taloudellisesta asemasta tilikauden viimeisenä päivänä. Se laaditaan kirjanpidosta suomeksi tai ruotsiksi ja euroina. Tilinpäätös on eri asia kuin veroilmoitus: tilinpäätös on kirjanpitolain asiakirja, veroilmoitus taas annetaan Verohallinnolle OmaVerossa. Osakeyhtiöllä tilinpäätöksen tiedot ovat myös veroilmoituksen pohja.' },
        { t: 'h2', x: 'Mitä pienyrityksen tilinpäätökseen kuuluu' },
        { t: 'ul', items: [
          'Tase: varat, oma pääoma ja velat tilikauden viimeisenä päivänä.',
          'Tuloslaskelma: tuotot, kulut ja tilikauden voitto tai tappio.',
          'Liitetiedot: esimerkiksi laatimisperiaatteet, henkilöstön keskimääräinen määrä sekä annetut vakuudet ja vastuut.',
          'Vertailutiedot edelliseltä tilikaudelta jokaisesta taseen ja tuloslaskelman erästä.',
        ] },
        { t: 'p', x: 'Rahoituslaskelmaa ei tarvita: se on pakollinen vain suuryritykselle ja yleisen edun kannalta merkittävälle yhteisölle. Pien- ja mikroyrityksen ei myöskään tarvitse laatia toimintakertomusta. Pien- ja mikroyrityksen tilinpäätöksestä säädetään erikseen asetuksessa (PMA 1753/2015), jonka kaavat ovat suppeampia. Tilinpäätöksessä on kerrottava, että se on laadittu pien- tai mikroyrityssäännösten mukaan. Osakeyhtiön tilinpäätöksessä kerrotaan lisäksi oman pääoman muutokset ja hallituksen ehdotus voitonjaosta. Tilinpäätöksen tueksi laaditaan myös tase-erittelyt, mutta niitä ei julkaista.' },
        { t: 'h3', x: 'Mikroyritys vai pienyritys? Rajat 2026' },
        { t: 'p', x: 'Kokoluokka ratkaistaan kolmella rajalla. Yritys kuuluu luokkaan, jos sekä päättyneellä että sitä edeltäneellä tilikaudella enintään yksi raja ylittyy:' },
        { t: 'ul', items: [
          'Mikroyritys: taseen loppusumma 450 000 euroa, liikevaihto 900 000 euroa, keskimäärin 10 työntekijää.',
          'Pienyritys: taseen loppusumma 7 500 000 euroa, liikevaihto 15 000 000 euroa, keskimäärin 50 työntekijää.',
        ] },
        { t: 'p', x: 'Rajoja korotettiin lailla 605/2024. Uusia rajoja sovelletaan 1.1.2025 tai sen jälkeen alkaviin tilikausiin (halutessaan jo 1.1.2024 tai sen jälkeen alkaneeseen tilikauteen), joten ne koskevat 31.12.2026 päättyvää tilikautta.' },
        { t: 'h2', x: 'Toiminimi: tarvitaanko tilinpäätöstä?' },
        { t: 'p', x: 'Toiminimiyrittäjä (liikkeen- tai ammatinharjoittaja) on kirjanpitovelvollinen, mutta tilinpäätös on pakollinen vain, jos sekä päättyneellä että sitä edeltäneellä tilikaudella vähintään kaksi mikroyrityksen rajaa ylittyy. Tavallisen toiminimen ei siis tarvitse laatia tilinpäätöstä. Kirjanpito on silti pidettävä niin, että myyntisaamiset, ostovelat ja verotuksessa tarvittavat tiedot saadaan selville.' },
        { t: 'ul', items: [
          'Yhdenkertainen kirjanpito riittää, jos sekä päättyneellä että edellisellä tilikaudella enintään yksi näistä ylittyy: taseen loppusumma 100 000 euroa, liikevaihto 200 000 euroa, keskimäärin kolme työntekijää.',
          'Toiminimen tilikausi on aina kalenterivuosi. Jos pidät kahdenkertaista kirjanpitoa, tilikausi voi poiketa kalenterivuodesta.',
          'Elinkeinotoiminnan veroilmoitus (lomake 5) annetaan joka vuosi, myös vuodelta, jona toimintaa ei ollut. Verovuoden 2025 ilmoituksen määräpäivä oli 1.4.2026. Tarkista vuoden 2026 ilmoituksen määräpäivä OmaVerosta.',
          'Toiminimi ilmoittaa tilinpäätöksen kaupparekisteriin vain, jos se on pienyritystä suurempi.',
        ] },
        { t: 'h2', x: 'Avoin yhtiö ja kommandiittiyhtiö' },
        { t: 'p', x: 'Avoimen yhtiön ja kommandiittiyhtiön on laadittava tilinpäätös neljän kuukauden kuluessa tilikauden päättymisestä, ja vastuunalaiset yhtiömiehet allekirjoittavat sen. Huomaa, että veroilmoitus (lomake 6A) on annettava aiemmin: verovuodelta 2025 viimeistään 1.4.2026. Tilinpäätöstä ei liitetä veroilmoitukseen. Kaupparekisteriin tilinpäätös ilmoitetaan kuuden kuukauden kuluessa vain, jos yhtiön vastuunalaisena yhtiömiehenä on osakeyhtiö tai jos yhtiö on pienyritystä suurempi.' },
        { t: 'h2', x: 'Osakeyhtiö: velvollisuudet ja määräajat' },
        { t: 'ul', items: [
          'Tilinpäätös laaditaan neljän kuukauden kuluessa tilikauden päättymisestä, ja hallitus ja toimitusjohtaja allekirjoittavat sen.',
          'Veroilmoitus (lomake 6B) annetaan sähköisesti neljän kuukauden kuluessa siitä, kun tilikauden viimeinen kalenterikuukausi päättyi. Ilmoitus annetaan myös, jos toimintaa ei ollut.',
          'Varsinainen yhtiökokous pidetään kuuden kuukauden kuluessa tilikauden päättymisestä. Siinä vahvistetaan tilinpäätös ja päätetään voiton käyttämisestä sekä vastuuvapaudesta hallitukselle ja toimitusjohtajalle.',
          'Vahvistettu tilinpäätös ilmoitetaan kaupparekisteriin kahden kuukauden kuluessa vahvistamisesta ja viimeistään kahdeksan kuukauden kuluessa tilikauden päättymisestä. Ilmoittaminen on tällöin maksutonta.',
          'Myöhässä ilmoitetusta tilinpäätöksestä PRH määrää myöhästymismaksun: 150 euroa enintään 2 kuukautta myöhässä, 300 euroa 2–4 kuukautta myöhässä ja 600 euroa, jos myöhästys on yli 4 kuukautta tai tilinpäätös jää ilmoittamatta. Maksu on kaksinkertainen, jos tilinpäätös on ollut myöhässä kahdelta tai useammalta peräkkäiseltä tilikaudelta. Pitkään ilmoittamatta jättänyt yhtiö voidaan poistaa kaupparekisteristä tai määrätä selvitystilaan.',
          'Myös toimimattoman osakeyhtiön on ilmoitettava tilinpäätös joka tilikaudelta.',
        ] },
        { t: 'p', x: 'Useimmat osakeyhtiöt toimittavat tilinpäätöksen kaupparekisteriin veroilmoituksen mukana. Verohallinto välittää sen PRH:lle vain, jos liitetyyppi on valittu ohjeen mukaan. Jos yhtiökokous ei ole vielä vahvistanut tilinpäätöstä, se liitetään tyypillä ”Tilinpäätös vain Verohallinnolle”, ja vahvistettu tilinpäätös ilmoitetaan kokouksen jälkeen. Tarkista lopuksi PRH:n Virre-palvelusta, että tilinpäätös on rekisteröity.' },
        { t: 'h3', x: 'Osinko ja tilintarkastaja' },
        { t: 'ul', items: [
          'Hallitus tekee ehdotuksen voitonjaosta. Varoja ei saa jakaa, jos yhtiön tiedetään tai pitäisi tietää olevan maksukyvytön tai jos jako aiheuttaisi maksukyvyttömyyden. Jos osingosta päätetään vasta veroilmoituksen jälkeen, tiedot lähetetään Verohallintoon kuukauden kuluessa päätöksestä.',
          'Tilintarkastajaa ei tarvitse valita, jos sekä päättyneellä että edellisellä tilikaudella enintään yksi näistä täyttyy: taseen loppusumma yli 100 000 euroa, liikevaihto yli 200 000 euroa, keskimäärin yli kolme työntekijää. Yhtiöjärjestys voi silti edellyttää tilintarkastusta, ja holding-yhtiöllä voi olla velvollisuus valita tilintarkastaja aina.',
          'Jos tilintarkastaja on valittu, tilinpäätös annetaan hänelle viimeistään kuukautta ennen yhtiökokousta.',
        ] },
        { t: 'h2', x: 'Vuodenvaihteen tehtävät: tarkistuslista' },
        { t: 'ol', items: [
          'Täsmäytä pankkitilien ja kassan saldot 31.12. tiliotteisiin.',
          'Vertaa kirjanpidon arvonlisäverotilejä OmaVerossa annettuihin ALV-ilmoituksiin ja korjaa erot.',
          'Käy läpi avoimet myyntisaamiset ja ostovelat. Selvitä, mitkä laskut ovat oikeasti maksamatta.',
          'Inventoi varasto 31.12. Tilikauden lopussa jäljellä olevan varaston hankintameno siirretään taseeseen. Jos jälleenhankintahinta tai myyntihinta on hankintamenoa pienempi, erotus kirjataan kuluksi.',
          'Tee jaksotukset: tilikaudelle kuuluvat tuotot ja kulut kirjataan maksupäivästä riippumatta (siirtosaamiset ja siirtovelat). Vähäisiä eriä ei tarvitse oikaista, ellei niiden yhteisvaikutus ole olennainen.',
          'Kirjaa poistot. Koneista ja kalustosta saa verotuksessa vähentää enintään 25 % menojäännöksestä vuodessa, ja enintään 1 200 euron menojäännöksen voi poistaa kerralla. Hankinnan, jonka käyttöikä on enintään 3 vuotta, voi vähentää kerralla. Samoin voi vähentää enintään 1 200 euron pienhankinnat, yhteensä enintään 3 600 euroa vuodessa. Verotuksessa ei voi vähentää suurempaa poistoa kuin kirjanpidossa on tehty.',
          'Laadi tase-erittelyt ja tarkista, että tilinavaus vastaa edellisen vuoden tilinpäätöstä.',
          'Osakeyhtiö: valmistele hallituksen voitonjakoehdotus ja tarkista yhtiön maksukyky.',
        ] },
        { t: 'h2', x: 'Aikataulu, kun tilikausi päättyy 31.12.2026' },
        { t: 'ul', items: [
          'Joulukuu–tammikuu: toimita kirjanpitäjälle kaikki vuoden tositteet, tiliotteet, varastolista ja tiedot tilikaudelle kuuluvista mutta laskuttamattomista eristä.',
          'Helmi–maaliskuu: tilinpäätöksen luonnos ja poistolaskelmat. Toiminimen ja avoimen yhtiön tai kommandiittiyhtiön veroilmoitus annetaan huhtikuun alkuun mennessä (verovuodelta 2025 määräpäivä oli 1.4.2026). Tarkista tarkka päivä OmaVerosta.',
          'Huhtikuu: tilinpäätös on laadittava ja allekirjoitettava viimeistään 30.4.2027. Osakeyhtiön veroilmoitus on annettava viimeistään 30.4.2027.',
          'Touko–kesäkuu: osakeyhtiön varsinainen yhtiökokous viimeistään 30.6.2027. Jos avoin yhtiö tai kommandiittiyhtiö on velvollinen ilmoittamaan tilinpäätöksensä, määräaika on myös 30.6.2027.',
          'Heinä–elokuu: osakeyhtiön vahvistettu tilinpäätös kaupparekisteriin viimeistään 31.8.2027.',
        ] },
        { t: 'h2', x: 'Kuinka kauan aineisto säilytetään' },
        { t: 'p', x: 'Tilinpäätös, kirjanpidot, tililuettelo sekä luettelo kirjanpidoista ja aineistoista säilytetään vähintään 10 vuotta tilikauden päättymisestä. Tositteet, liiketapahtumia koskeva kirjeenvaihto ja muu aineisto säilytetään vähintään 6 vuotta sen vuoden lopusta, jonka aikana tilikausi päättyi. Vuoden 2026 tositteet on siis säilytettävä vuoden 2032 loppuun ja tilinpäätös 31.12.2036 asti.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Osakeyhtiön tilinpäätös lähetetään veroilmoituksen mukana väärällä liitetyypillä, eikä se koskaan päädy kaupparekisteriin. Myöhästymismaksu tulee silti.',
          'Toimimaton osakeyhtiö ei ilmoita tilinpäätöstä, koska ”mitään ei tapahtunut”.',
          'Osinko maksetaan ennen kuin yhtiökokous on vahvistanut tilinpäätöksen tai maksukykyä on arvioitu.',
          'Toiminimi jättää veroilmoituksen antamatta vuodelta, jona toimintaa ei ollut.',
          'Avoin yhtiö tai kommandiittiyhtiö olettaa, että veroilmoitukselle on neljä kuukautta aikaa, vaikka määräpäivä on huhtikuun alussa.',
          'Kone tai kalusto kirjataan kokonaan kuluksi, vaikka se pitäisi poistaa usealle vuodelle.',
          'Varastoa ei inventoida, tai joulukuun kulut ja tuotot jäävät jaksottamatta.',
        ] },
        { t: 'note', x: 'Kokorajat koskevat 1.1.2025 tai sen jälkeen alkaneita tilikausia: mikroyritys 450 000 / 900 000 euroa / 10 henkilöä ja pienyritys 7 500 000 / 15 000 000 euroa / 50 henkilöä. Myöhästymismaksut (150, 300 ja 600 euroa) koskevat osakeyhtiöitä ja osuuskuntia, joiden tilikausi on päättynyt 1.12.2024 tai sen jälkeen. Vuoden 2027 veroilmoitusten tarkat määräpäivät julkaistaan OmaVerossa. Lähteet: kirjanpitolaki (1336/1997), PMA (1753/2015), osakeyhtiölaki (624/2006), tilintarkastuslaki (1141/2015), elinkeinoverolaki (360/1968), PRH ja Verohallinto.' },
        { t: 'h2', x: 'Autamme tilinpäätöksessä' },
        { t: 'p', x: 'Tilitoimisto Debit Credit laatii pienyrityksen tilinpäätöksen ja veroilmoituksen, käy kanssasi läpi poistot, varaston ja jaksotukset sekä valmistelee osakeyhtiön yhtiökokouksen asiakirjat ja voitonjakoehdotuksen. Ilmoitamme vahvistetun tilinpäätöksen kaupparekisteriin puolestasi. Asiakkaamme voivat toimittaa kuitit ja tiliotteet Vaavo-sovelluksen kautta. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä hyvissä ajoin ennen vuodenvaihdetta, niin aikataulu ei pääse yllättämään.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'PRH: tilinpäätösilmoitukset kaupparekisteriin', href: SRC.prhHubFi },
          { label: 'PRH: osakeyhtiön ja osuuskunnan tilinpäätös kaupparekisteriin', href: SRC.prhOyFi },
          { label: 'PRH: maksu myöhästyneistä tilinpäätöksistä', href: SRC.prhFeeFi },
          { label: 'Verohallinto: osakeyhtiön ja osuuskunnan veroilmoitus', href: SRC.oyReturnFi },
          { label: 'Verohallinto: liikkeen- ja ammatinharjoittajan veroilmoitus', href: SRC.tmiReturnFi },
          { label: 'Verohallinto: poistot ja pienhankinnat', href: SRC.deprFi },
          { label: 'Finlex: kirjanpitolaki (1336/1997)', href: SRC.kpl },
          { label: 'Finlex: valtioneuvoston asetus pien- ja mikroyrityksen tilinpäätöksessä esitettävistä tiedoista (1753/2015)', href: SRC.pma },
          { label: 'Finlex: osakeyhtiölaki (624/2006)', href: SRC.oyl },
          { label: 'Finlex: tilintarkastuslaki (1141/2015)', href: SRC.ttl },
          { label: 'Finlex: elinkeinoverolaki (360/1968)', href: SRC.evl },
        ] },
      ],
      faq: [
        { q: 'Tarvitseeko toiminimi tilinpäätöksen?', a: 'Yleensä ei. Toiminimen on laadittava tilinpäätös vain, jos sekä päättyneellä että edellisellä tilikaudella vähintään kaksi mikroyrityksen rajaa ylittyy (tase 450 000 euroa, liikevaihto 900 000 euroa, 10 työntekijää). Kirjanpito on silti pidettävä, ja elinkeinotoiminnan veroilmoitus (lomake 5) annetaan joka vuosi.' },
        { q: 'Mihin mennessä osakeyhtiön tilinpäätös on tehtävä, kun tilikausi päättyy 31.12.2026?', a: 'Tilinpäätös on laadittava ja allekirjoitettava sekä veroilmoitus annettava viimeistään 30.4.2027. Yhtiökokous pidetään viimeistään 30.6.2027, ja vahvistettu tilinpäätös ilmoitetaan kaupparekisteriin viimeistään 31.8.2027.' },
        { q: 'Mitä tapahtuu, jos tilinpäätös ilmoitetaan PRH:lle myöhässä?', a: 'Osakeyhtiölle ja osuuskunnalle tulee myöhästymismaksu: 150 euroa enintään 2 kuukautta myöhässä, 300 euroa 2–4 kuukautta myöhässä ja 600 euroa yli 4 kuukautta myöhässä tai kokonaan ilmoittamatta. Toistuvasta myöhästymisestä maksu on kaksinkertainen, ja pitkään ilmoittamatta jättänyt yhtiö voidaan poistaa kaupparekisteristä.' },
        { q: 'Pitääkö pienen osakeyhtiön laatia toimintakertomus?', a: 'Ei. Pien- ja mikroyrityksen ei tarvitse laatia toimintakertomusta eikä rahoituslaskelmaa. Tilinpäätökseen kuuluvat tase, tuloslaskelma ja liitetiedot, ja siinä kerrotaan hallituksen ehdotus voitonjaosta.' },
        { q: 'Tarvitseeko pieni yhtiö tilintarkastajan?', a: 'Ei, jos sekä päättyneellä että edellisellä tilikaudella enintään yksi näistä täyttyy: taseen loppusumma yli 100 000 euroa, liikevaihto yli 200 000 euroa tai keskimäärin yli kolme työntekijää. Yhtiöjärjestys voi kuitenkin edellyttää tilintarkastusta.' },
        { q: 'Kuinka kauan kuitit ja tilinpäätös pitää säilyttää?', a: 'Tositteet vähintään 6 vuotta sen vuoden lopusta, jona tilikausi päättyi, ja tilinpäätös sekä kirjanpidot vähintään 10 vuotta tilikauden päättymisestä. Vuoden 2026 kuitit säilytetään siis vuoden 2032 loppuun.' },
      ],
    },
    ru: {
      title: 'Tilinpäätös для малого бизнеса 2026: состав, сроки и задачи на конец года',
      description:
        'Tilinpäätös 2026: что входит в отчётность малой и микрокомпании, нужна ли она toiminimi, сроки для PRH и налоговой и план действий с января по август.',
      lead: 'У большинства компаний финансовый год заканчивается 31.12, и с этого момента начинается время годовой отчётности — tilinpäätös. Мы собрали, что нужно сделать небольшому osakeyhtiö (Oy), avoin yhtiö, kommandiittiyhtiö и toiminimi, какие сроки установлены законом и что стоит проверить уже в декабре. В конце — помесячный план с января по август.',
      body: [
        { t: 'h2', x: 'Что такое tilinpäätös?' },
        { t: 'p', x: 'Tilinpäätös — это предусмотренная законом о бухгалтерском учёте (kirjanpitolaki 1336/1997) сводка результата финансового года и финансового положения компании на его последний день. Её составляют по данным бухгалтерии на финском или шведском языке и в евро. Tilinpäätös — не то же самое, что налоговая декларация: отчётность — документ бухгалтерского закона, а декларацию подают в налоговую (Verohallinto) через OmaVero. У Oy данные отчётности одновременно служат основой декларации.' },
        { t: 'h2', x: 'Что входит в отчётность малой компании' },
        { t: 'ul', items: [
          'Баланс (tase): активы, собственный капитал и обязательства на последний день года.',
          'Отчёт о прибылях и убытках (tuloslaskelma): доходы, расходы и прибыль или убыток за год.',
          'Примечания (liitetiedot): например, принципы составления, среднее число работников, выданные залоги и обязательства.',
          'Сравнительные данные за предыдущий год по каждой статье баланса и отчёта о прибылях и убытках.',
        ] },
        { t: 'p', x: 'Отчёт о движении денежных средств (rahoituslaskelma) не нужен: он обязателен только для крупных компаний и организаций, значимых для общественных интересов. Малой и микрокомпании не нужно составлять и отчёт о деятельности (toimintakertomus). Для них действует отдельное постановление (PMA 1753/2015) с упрощёнными формами. В отчётности указывают, что она составлена по правилам для малых или микрокомпаний. В отчётности Oy также приводят изменения собственного капитала и предложение правления о распределении прибыли. В подтверждение отчётности составляют расшифровки баланса (tase-erittelyt), но их не публикуют.' },
        { t: 'h3', x: 'Микро или малая компания? Пороги 2026 года' },
        { t: 'p', x: 'Категорию определяют три порога. Компания относится к категории, если и в завершившемся, и в предыдущем финансовом году превышен не более чем один порог:' },
        { t: 'ul', items: [
          'Микрокомпания: итог баланса 450 000 €, оборот 900 000 €, в среднем 10 работников.',
          'Малая компания: итог баланса 7 500 000 €, оборот 15 000 000 €, в среднем 50 работников.',
        ] },
        { t: 'p', x: 'Пороги повышены законом 605/2024. Новые значения применяются к финансовым годам, начавшимся 1.1.2025 или позже (по желанию — уже к годам, начавшимся 1.1.2024 или позже), то есть и к году, который заканчивается 31.12.2026.' },
        { t: 'h2', x: 'Toiminimi: нужен ли tilinpäätös?' },
        { t: 'p', x: 'Индивидуальный предприниматель (toiminimi, liikkeen- tai ammatinharjoittaja) обязан вести бухгалтерию, но tilinpäätös обязателен, только если и в завершившемся, и в предыдущем году превышены как минимум два порога микрокомпании. Обычному toiminimi составлять отчётность не нужно. Учёт всё равно ведут так, чтобы были видны дебиторская и кредиторская задолженность и данные для налогообложения.' },
        { t: 'ul', items: [
          'Простой (одинарный) учёт допускается, если и в завершившемся, и в предыдущем году превышено не более одного из порогов: итог баланса 100 000 €, оборот 200 000 €, в среднем три работника.',
          'Финансовый год toiminimi — всегда календарный. При двойной бухгалтерии он может отличаться от календарного.',
          'Налоговую декларацию о предпринимательской деятельности (форма 5) подают каждый год, даже если деятельности не было. Декларацию за 2025 год нужно было подать до 1.4.2026. Срок для декларации за 2026 год проверьте в OmaVero.',
          'В торговый реестр toiminimi подаёт отчётность, только если он крупнее малой компании.',
        ] },
        { t: 'h2', x: 'Avoin yhtiö и kommandiittiyhtiö' },
        { t: 'p', x: 'Полное товарищество (avoin yhtiö) и коммандитное товарищество (kommandiittiyhtiö) должны составить tilinpäätös в течение четырёх месяцев после окончания года; подписывают отчётность полные (ответственные) товарищи. Обратите внимание: налоговую декларацию (форма 6A) подают раньше — за 2025 год до 1.4.2026. Отчётность к декларации не прикладывают. В торговый реестр её подают в течение шести месяцев, только если полным (ответственным) товарищем является Oy либо если товарищество крупнее малой компании.' },
        { t: 'h2', x: 'Osakeyhtiö: обязанности и сроки' },
        { t: 'ul', items: [
          'Tilinpäätös составляют в течение четырёх месяцев после окончания финансового года; подписывают правление и генеральный директор.',
          'Налоговую декларацию (форма 6B) подают электронно в течение четырёх месяцев после окончания последнего календарного месяца финансового года — даже если деятельности не было.',
          'Очередное общее собрание акционеров (varsinainen yhtiökokous) проводят в течение шести месяцев после окончания года. Оно утверждает отчётность, решает, как распорядиться прибылью, и освобождает правление и директора от ответственности (vastuuvapaus).',
          'Утверждённую отчётность подают в торговый реестр в течение двух месяцев после утверждения и не позднее восьми месяцев после окончания года. В этот срок подача бесплатна.',
          'За опоздание PRH назначает сбор: 150 € при опоздании до 2 месяцев, 300 € — на 2–4 месяца, 600 € — более чем на 4 месяца или если отчётность не подана. Сбор удваивается, если отчётность опаздывала два или более года подряд. Компанию, долго не подающую отчётность, могут исключить из реестра или отправить в ликвидацию.',
          'Отчётность за каждый год обязан подавать и бездействующий Oy.',
        ] },
        { t: 'p', x: 'Большинство Oy передают отчётность в реестр вместе с налоговой декларацией. Налоговая пересылает её в PRH, только если тип вложения выбран по инструкции. Если собрание ещё не утвердило отчётность, её прикладывают с типом «Tilinpäätös vain Verohallinnolle» («только для налоговой»), а утверждённую подают после собрания. В конце проверьте в сервисе PRH Virre, что отчётность зарегистрирована.' },
        { t: 'h3', x: 'Дивиденды и аудитор' },
        { t: 'ul', items: [
          'Правление готовит предложение о распределении прибыли. Средства нельзя распределять, если известно или должно быть известно, что компания неплатёжеспособна или станет такой из-за выплаты. Если решение о дивидендах принято после подачи декларации, данные отправляют в налоговую в течение месяца после решения.',
          'Аудитора можно не выбирать, если и в завершившемся, и в предыдущем году выполнено не более одного условия: итог баланса более 100 000 €, оборот более 200 000 €, в среднем более трёх работников. Устав всё же может требовать аудита, а у холдинговой компании обязанность выбрать аудитора может быть всегда.',
          'Если аудитор выбран, отчётность передают ему не позднее чем за месяц до общего собрания.',
        ] },
        { t: 'h2', x: 'Задачи на конец года: чек-лист' },
        { t: 'ol', items: [
          'Сверьте остатки на банковских счетах и в кассе на 31.12 с выписками.',
          'Сравните счета НДС в бухгалтерии с декларациями ALV, поданными в OmaVero, и исправьте расхождения.',
          'Пройдитесь по открытой дебиторской и кредиторской задолженности и выясните, какие счета действительно не оплачены.',
          'Проведите инвентаризацию склада на 31.12. Стоимость приобретения остатков переносится в баланс. Если цена повторной закупки или продажи ниже стоимости приобретения, разницу списывают в расходы.',
          'Сделайте начисления: доходы и расходы года учитывают независимо от даты оплаты (siirtosaamiset и siirtovelat). Мелкие суммы можно не корректировать, если в совокупности они несущественны.',
          'Начислите амортизацию. По машинам и оборудованию в налогообложении можно вычесть не более 25 % остаточной стоимости группы (menojäännös) в год, а остаток до 1 200 € — списать сразу. Покупку со сроком службы не более 3 лет можно вычесть сразу. Так же можно вычесть мелкие покупки (pienhankinnat) до 1 200 € каждая, всего не более 3 600 € в год. В налогообложении нельзя вычесть больше амортизации, чем начислено в бухгалтерии.',
          'Подготовьте расшифровки баланса и проверьте, что входящий баланс совпадает с отчётностью прошлого года.',
          'Oy: подготовьте предложение правления о распределении прибыли и оцените платёжеспособность.',
        ] },
        { t: 'h2', x: 'План, если финансовый год заканчивается 31.12.2026' },
        { t: 'ul', items: [
          'Декабрь–январь: передайте бухгалтеру все документы за год, выписки, список складских остатков и сведения о расходах и доходах года, по которым ещё нет счетов.',
          'Февраль–март: проект отчётности и расчёт амортизации. Декларации toiminimi, avoin yhtiö и kommandiittiyhtiö подают к началу апреля (за 2025 год срок был 1.4.2026). Точную дату проверьте в OmaVero.',
          'Апрель: отчётность (tilinpäätös) должна быть составлена и подписана не позднее 30.4.2027. Декларацию Oy подают не позднее 30.4.2027.',
          'Май–июнь: общее собрание Oy — не позднее 30.6.2027. Если avoin yhtiö или kommandiittiyhtiö обязано подавать отчётность в реестр, срок тоже 30.6.2027.',
          'Июль–август: утверждённая отчётность Oy — в торговый реестр не позднее 31.8.2027.',
        ] },
        { t: 'h2', x: 'Сколько хранить документы' },
        { t: 'p', x: 'Отчётность, бухгалтерские книги, план счетов и перечень книг и материалов хранят не менее 10 лет с окончания финансового года. Первичные документы (tositteet), деловую переписку и прочие материалы — не менее 6 лет с конца того года, в котором закончился финансовый год. Документы за 2026 год нужно хранить до конца 2032 года, а отчётность — до 31.12.2036.' },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Отчётность Oy отправлена вместе с декларацией с неверным типом вложения и так и не попала в торговый реестр. Сбор за опоздание всё равно придёт.',
          'Бездействующий Oy не подаёт отчётность, потому что «ничего не происходило».',
          'Дивиденды выплачены до утверждения отчётности собранием или без оценки платёжеспособности.',
          'Toiminimi не подаёт декларацию за год, когда деятельности не было.',
          'Avoin yhtiö или kommandiittiyhtiö считает, что на декларацию есть четыре месяца, хотя срок — в начале апреля.',
          'Машину или оборудование полностью списывают в расходы, хотя их нужно амортизировать несколько лет.',
          'Склад не инвентаризируют, или декабрьские расходы и доходы остаются без начисления.',
        ] },
        { t: 'note', x: 'Пороги действуют для финансовых годов, начавшихся 1.1.2025 или позже: микрокомпания 450 000 / 900 000 € / 10 человек, малая компания 7 500 000 / 15 000 000 € / 50 человек. Сборы за опоздание (150, 300 и 600 €) касаются Oy и кооперативов с финансовым годом, закончившимся 1.12.2024 или позже. Точные сроки деклараций 2027 года публикуются в OmaVero. Источники: kirjanpitolaki (1336/1997), PMA (1753/2015), закон об акционерных обществах (624/2006), закон об аудите (1141/2015), закон о налогообложении предпринимательской деятельности (360/1968), PRH и Verohallinto.' },
        { t: 'h2', x: 'Поможем с годовой отчётностью' },
        { t: 'p', x: 'Tilitoimisto Debit Credit составит tilinpäätös и налоговую декларацию вашей компании, разберёт с вами амортизацию, склад и начисления, подготовит документы для общего собрания Oy и предложение о распределении прибыли. Утверждённую отчётность мы подаём в торговый реестр от вашего имени. Наши клиенты могут передавать чеки и выписки через приложение Vaavo. Работаем на русском и финском. Свяжитесь с нами заранее, до конца года, — тогда сроки не застанут врасплох.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'PRH: подача отчётности Oy и кооперативов (на английском)', href: SRC.prhOyEn },
          { label: 'PRH: сбор за опоздание с отчётностью (на английском)', href: SRC.prhFeeEn },
          { label: 'PRH: отчётность в торговый реестр — все формы компаний (на финском)', href: SRC.prhHubFi },
          { label: 'Vero: налоговая декларация Oy (на английском)', href: SRC.oyReturnEn },
          { label: 'Vero: декларация индивидуального предпринимателя, форма 5 (на английском)', href: SRC.tmiReturnEn },
          { label: 'Vero: амортизация и мелкие покупки (на английском)', href: SRC.deprEn },
          { label: 'Finlex: kirjanpitolaki 1336/1997 (на финском)', href: SRC.kpl },
          { label: 'Finlex: постановление об отчётности малых и микрокомпаний 1753/2015 (на финском)', href: SRC.pma },
          { label: 'Finlex: закон об акционерных обществах 624/2006 (на финском)', href: SRC.oyl },
          { label: 'Finlex: закон об аудите 1141/2015 (на финском)', href: SRC.ttl },
          { label: 'Finlex: закон о налогообложении предпринимательской деятельности 360/1968 (на финском)', href: SRC.evl },
        ] },
      ],
      faq: [
        { q: 'Нужен ли toiminimi tilinpäätös?', a: 'Как правило, нет. Toiminimi обязан составлять tilinpäätös, только если и в завершившемся, и в предыдущем году превышены как минимум два порога микрокомпании (баланс 450 000 €, оборот 900 000 €, 10 работников). Бухгалтерию всё равно ведут, а декларацию (форма 5) подают каждый год.' },
        { q: 'До какого числа Oy должно сделать отчётность, если год заканчивается 31.12.2026?', a: 'Tilinpäätös нужно составить и подписать, а налоговую декларацию подать не позднее 30.4.2027. Общее собрание — не позднее 30.6.2027, утверждённую отчётность подают в торговый реестр не позднее 31.8.2027.' },
        { q: 'Что будет, если подать отчётность в PRH с опозданием?', a: 'Для Oy и кооперативов назначают сбор: 150 € при опоздании до 2 месяцев, 300 € — на 2–4 месяца и 600 € — более чем на 4 месяца или если отчётность не подана. При повторных опозданиях сбор удваивается, а компанию, долго не подающую отчётность, могут исключить из реестра.' },
        { q: 'Должно ли небольшое Oy составлять отчёт о деятельности?', a: 'Нет. Малой и микрокомпании не нужны ни toimintakertomus, ни отчёт о движении денежных средств. В отчётность входят баланс, отчёт о прибылях и убытках и примечания, а также предложение правления о распределении прибыли.' },
        { q: 'Нужен ли небольшой компании аудитор?', a: 'Нет, если и в завершившемся, и в предыдущем году выполнено не более одного условия: итог баланса более 100 000 €, оборот более 200 000 € или в среднем более трёх работников. Однако устав может требовать аудита.' },
        { q: 'Сколько хранить чеки и отчётность?', a: 'Первичные документы — не менее 6 лет с конца года, в котором закончился финансовый год; отчётность и бухгалтерские книги — не менее 10 лет с окончания финансового года. Чеки за 2026 год храните до конца 2032 года.' },
      ],
    },
    en: {
      title: 'Financial statements for small businesses 2026: contents, deadlines and year-end tasks',
      description:
        'Finnish financial statements 2026: what small and micro companies must include, whether a toiminimi needs one, PRH and tax deadlines and a January–August plan.',
      lead: 'Most Finnish companies close their financial year on 31 December, and that is when financial statements (tilinpäätös) season begins. Here is what a small limited company (osakeyhtiö), general or limited partnership and sole trader (toiminimi) must do, which deadlines are set by law and what to check already in December. At the end you will find a month-by-month plan from January to August.',
      body: [
        { t: 'h2', x: 'What are financial statements?' },
        { t: 'p', x: 'Under the Accounting Act (kirjanpitolaki 1336/1997), the financial statements summarise the result of the financial year and the company’s financial position on its last day. They are prepared from the accounts, in Finnish or Swedish, in euros. Financial statements are not the same as a tax return: the statements are a document under accounting law, while the tax return goes to the Tax Administration through MyTax (OmaVero). For a limited company, the figures in the statements are also the basis of the tax return.' },
        { t: 'h2', x: 'What small-company financial statements contain' },
        { t: 'ul', items: [
          'Balance sheet (tase): assets, equity and liabilities on the last day of the year.',
          'Income statement (tuloslaskelma): income, expenses and the profit or loss for the year.',
          'Notes (liitetiedot): for example the accounting principles, the average number of staff and collateral and commitments given.',
          'Comparative figures for the previous year for every balance sheet and income statement item.',
        ] },
        { t: 'p', x: 'No cash flow statement is needed: it is mandatory only for large companies and public-interest entities. Small and micro companies do not have to prepare a board of directors’ report (toimintakertomus) either. A separate decree (PMA 1753/2015) with simpler formats applies to them. The statements must say that they follow the small or micro-company rules. A limited company’s statements also show the changes in equity and the board’s proposal on the distribution of profit. Balance sheet itemisations (tase-erittelyt) are prepared to support the statements, but they are not published.' },
        { t: 'h3', x: 'Micro or small company? The 2026 limits' },
        { t: 'p', x: 'The size class is decided by three limits. A company is in the class if no more than one limit is exceeded in both the financial year just ended and the year before:' },
        { t: 'ul', items: [
          'Micro company: balance sheet total €450,000, turnover €900,000, an average of 10 employees.',
          'Small company: balance sheet total €7,500,000, turnover €15,000,000, an average of 50 employees.',
        ] },
        { t: 'p', x: 'The limits were raised by Act 605/2024. The new limits apply to financial years starting on or after 1 January 2025 (optionally already to years starting on or after 1 January 2024), so they apply to the year ending 31 December 2026.' },
        { t: 'h2', x: 'Sole trader (toiminimi): are financial statements required?' },
        { t: 'p', x: 'A sole trader (liikkeen- tai ammatinharjoittaja) must keep accounts, but financial statements are required only if at least two of the micro-company limits are exceeded in both the year just ended and the year before. An ordinary toiminimi therefore does not need to prepare them. The books must still show trade receivables, trade payables and the information needed for taxation.' },
        { t: 'ul', items: [
          'Single-entry bookkeeping is enough if no more than one of these is exceeded in both the year just ended and the year before: balance sheet total €100,000, turnover €200,000, an average of three employees.',
          'A sole trader’s financial year is always the calendar year. With double-entry bookkeeping, it may differ from the calendar year.',
          'The business tax return (Form 5) is filed every year, even for a year with no activity. The deadline for tax year 2025 was 1 April 2026. Check the deadline for the 2026 return in MyTax.',
          'A sole trader files financial statements with the Trade Register only if the business is larger than a small company.',
        ] },
        { t: 'h2', x: 'General and limited partnerships (avoin yhtiö, kommandiittiyhtiö)' },
        { t: 'p', x: 'A general partnership and a limited partnership must prepare financial statements within four months of the end of the financial year, signed by the partners with unlimited liability. Note that the tax return (Form 6A) is due earlier: for tax year 2025 it was due by 1 April 2026. The financial statements are not attached to the tax return. They are filed with the Trade Register within six months only if a limited company is the partnership’s partner with unlimited liability, or if the partnership is larger than a small company.' },
        { t: 'h2', x: 'Limited company (osakeyhtiö): obligations and deadlines' },
        { t: 'ul', items: [
          'The financial statements are prepared within four months of the end of the financial year and signed by the board and the managing director.',
          'The tax return (Form 6B) is filed electronically within four months of the end of the last calendar month of the financial year, even if the company had no activity.',
          'The annual general meeting (varsinainen yhtiökokous) is held within six months of the end of the year. It adopts the financial statements, decides how to use the profit and on discharging the board and managing director from liability.',
          'The adopted financial statements are filed with the Trade Register within two months of adoption and no later than eight months after the end of the year. Filing is free within that time.',
          'For late filing the Finnish Patent and Registration Office (PRH) charges a fee: €150 if up to 2 months late, €300 if 2–4 months late and €600 if more than 4 months late or never filed. The fee is doubled if filing was late for two or more consecutive years. A company that fails to file for a long time can be struck off the register or placed in liquidation.',
          'A dormant limited company must also file financial statements for every financial year.',
        ] },
        { t: 'p', x: 'Most limited companies send their financial statements to the Trade Register together with the tax return. The Tax Administration forwards them to the PRH only if the attachment type has been chosen as instructed. If the general meeting has not yet adopted the statements, attach them with the type “Tilinpäätös vain Verohallinnolle” (for the Tax Administration only) and file the adopted statements after the meeting. Finally, check in the PRH’s Virre service that the statements have been registered.' },
        { t: 'h3', x: 'Dividends and the auditor' },
        { t: 'ul', items: [
          'The board makes a proposal on the distribution of profit. No funds may be distributed if it is known, or should be known, that the company is insolvent or that the distribution would make it insolvent. If the dividend is decided after the tax return has been filed, the details are sent to the Tax Administration within one month of the decision.',
          'An auditor is not required if no more than one of these is met in both the year just ended and the year before: balance sheet total over €100,000, turnover over €200,000, an average of more than three employees. The articles of association may still require an audit, and a holding company may always have to appoint an auditor.',
          'If an auditor has been appointed, the financial statements are given to the auditor at least one month before the general meeting.',
        ] },
        { t: 'h2', x: 'Year-end tasks: a checklist' },
        { t: 'ol', items: [
          'Reconcile bank account and cash balances on 31 December with the statements.',
          'Compare the VAT accounts in the books with the VAT returns filed in MyTax and correct any differences.',
          'Go through open trade receivables and payables and find out which invoices really are unpaid.',
          'Count your stock on 31 December. The acquisition cost of the stock left at year-end is carried to the balance sheet. If the replacement cost or selling price is lower than the acquisition cost, the difference is expensed.',
          'Make the accruals: income and expenses belonging to the year are booked regardless of when they are paid (siirtosaamiset and siirtovelat). Minor items need not be adjusted unless their combined effect is material.',
          'Book depreciation. For machinery and equipment, at most 25% of the remaining pooled value (menojäännös) can be deducted in tax each year, and a pooled value of up to €1,200 can be written off at once. An asset with a useful life of up to 3 years can be deducted at once. So can low-value assets of up to €1,200 each, up to €3,600 in total per year. Tax depreciation cannot exceed the depreciation booked in the accounts.',
          'Prepare the balance sheet itemisations and check that the opening balances match last year’s financial statements.',
          'Limited company: prepare the board’s profit distribution proposal and assess the company’s solvency.',
        ] },
        { t: 'h2', x: 'Timeline for a financial year ending 31 December 2026' },
        { t: 'ul', items: [
          'December–January: give your accountant all receipts and invoices for the year, bank statements, a stock list and details of income and expenses belonging to the year that have not yet been invoiced.',
          'February–March: draft financial statements and depreciation calculations. Tax returns for sole traders and partnerships are due at the beginning of April (for tax year 2025 the deadline was 1 April 2026). Check the exact date in MyTax.',
          'April: financial statements prepared and signed by 30 April 2027 at the latest. The limited company’s tax return is due by 30 April 2027.',
          'May–June: the limited company’s annual general meeting by 30 June 2027. If a partnership has to file its financial statements, its deadline is also 30 June 2027.',
          'July–August: the limited company’s adopted financial statements filed with the Trade Register by 31 August 2027.',
        ] },
        { t: 'h2', x: 'How long to keep records' },
        { t: 'p', x: 'Financial statements, the books, the chart of accounts and the list of books and records are kept for at least 10 years from the end of the financial year. Vouchers, business correspondence and other records are kept for at least 6 years from the end of the year in which the financial year ended. Receipts for 2026 must therefore be kept until the end of 2032, and the financial statements until 31 December 2036.' },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'The limited company’s financial statements are sent with the tax return under the wrong attachment type and never reach the Trade Register. The late-filing fee still arrives.',
          'A dormant limited company does not file its statements because “nothing happened”.',
          'A dividend is paid before the general meeting has adopted the statements or before solvency has been assessed.',
          'A sole trader does not file a tax return for a year with no activity.',
          'A partnership assumes it has four months to file its tax return, when the deadline is at the beginning of April.',
          'A machine or equipment is expensed in full when it should be depreciated over several years.',
          'Stock is not counted, or December income and expenses are not accrued.',
        ] },
        { t: 'note', x: 'The size limits apply to financial years starting on or after 1 January 2025: micro company €450,000 / €900,000 / 10 people and small company €7,500,000 / €15,000,000 / 50 people. The late-filing fees (€150, €300 and €600) apply to limited companies and cooperatives whose financial year ended on or after 1 December 2024. The exact 2027 tax return deadlines are published in MyTax. Sources: Accounting Act (1336/1997), PMA decree (1753/2015), Limited Liability Companies Act (624/2006), Auditing Act (1141/2015), Business Income Tax Act (360/1968), PRH and the Tax Administration.' },
        { t: 'h2', x: 'We help with your financial statements' },
        { t: 'p', x: 'Tilitoimisto Debit Credit prepares your small company’s financial statements and tax return, goes through depreciation, stock and accruals with you, and prepares the documents for your limited company’s general meeting and the profit distribution proposal. We file the adopted financial statements with the Trade Register on your behalf. Our clients can send their receipts and bank statements through the Vaavo app. We work in Finnish and Russian. Get in touch well before the year-end so the deadlines do not take you by surprise.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'PRH: financial statements of limited companies and cooperatives', href: SRC.prhOyEn },
          { label: 'PRH: fee for financial statements filed late', href: SRC.prhFeeEn },
          { label: 'PRH: financial statements to the Trade Register, all company forms (in Finnish)', href: SRC.prhHubFi },
          { label: 'Tax Administration: tax return of limited companies and cooperatives', href: SRC.oyReturnEn },
          { label: 'Tax Administration: business tax return for sole traders (Form 5)', href: SRC.tmiReturnEn },
          { label: 'Tax Administration: depreciation expenses', href: SRC.deprEn },
          { label: 'Finlex: Accounting Act 1336/1997 (in Finnish)', href: SRC.kpl },
          { label: 'Finlex: decree on small and micro-company financial statements 1753/2015 (in Finnish)', href: SRC.pma },
          { label: 'Finlex: Limited Liability Companies Act 624/2006 (in Finnish)', href: SRC.oyl },
          { label: 'Finlex: Auditing Act 1141/2015 (in Finnish)', href: SRC.ttl },
          { label: 'Finlex: Business Income Tax Act 360/1968 (in Finnish)', href: SRC.evl },
        ] },
      ],
      faq: [
        { q: 'Does a sole trader (toiminimi) need financial statements?', a: 'Usually not. A sole trader must prepare them only if at least two of the micro-company limits (balance sheet €450,000, turnover €900,000, 10 employees) are exceeded in both the year just ended and the year before. Accounts must still be kept, and the business tax return (Form 5) is filed every year.' },
        { q: 'When are a limited company’s financial statements due if the year ends on 31 December 2026?', a: 'The statements must be prepared and signed, and the tax return filed, by 30 April 2027. The general meeting is held by 30 June 2027, and the adopted statements are filed with the Trade Register by 31 August 2027.' },
        { q: 'What happens if the financial statements reach the PRH late?', a: 'Limited companies and cooperatives pay a late-filing fee: €150 if up to 2 months late, €300 if 2–4 months late and €600 if more than 4 months late or never filed. Repeated late filing doubles the fee, and a company that fails to file for a long time can be struck off the register.' },
        { q: 'Does a small limited company need a board of directors’ report?', a: 'No. Small and micro companies need neither a board of directors’ report nor a cash flow statement. The statements consist of the balance sheet, income statement and notes, and they show the board’s profit distribution proposal.' },
        { q: 'Does a small company need an auditor?', a: 'No, if no more than one of these is met in both the year just ended and the year before: balance sheet total over €100,000, turnover over €200,000 or an average of more than three employees. The articles of association may still require an audit.' },
        { q: 'How long must receipts and financial statements be kept?', a: 'Vouchers for at least 6 years from the end of the year in which the financial year ended, and financial statements and the books for at least 10 years from the end of the financial year. Receipts for 2026 are kept until the end of 2032.' },
      ],
    },
    et: {
      title: 'Aastaaruanne (tilinpäätös) väikeettevõttele 2026: sisu, tähtajad ja aastalõpu tööd',
      description:
        'Tilinpäätös 2026: mida peab sisaldama väike- ja mikroettevõtte aruanne, kas toiminimi vajab seda, PRH ja maksuameti tähtajad ning plaan jaanuarist augustini.',
      lead: 'Enamikul Soome ettevõtetel lõpeb majandusaasta 31.12 ja siis algab aastaaruande ehk tilinpäätös’i aeg. Panime kokku, mida peab tegema väike osaühing (osakeyhtiö), täisühing (avoin yhtiö), usaldusühing (kommandiittiyhtiö) ja füüsilisest isikust ettevõtja (toiminimi), millised tähtajad on seadusest ja mida tasub kontrollida juba detsembris. Lõpus on kuude kaupa plaan jaanuarist augustini.',
      body: [
        { t: 'h2', x: 'Mis on tilinpäätös?' },
        { t: 'p', x: 'Tilinpäätös on Soome raamatupidamisseaduse (kirjanpitolaki 1336/1997) järgi koostatav kokkuvõte majandusaasta tulemusest ja ettevõtte finantsseisundist aasta viimasel päeval. See koostatakse raamatupidamise põhjal soome või rootsi keeles ja eurodes. Tilinpäätös ei ole sama mis maksudeklaratsioon: aruanne on raamatupidamisseaduse dokument, deklaratsioon esitatakse aga Soome maksuametile (Verohallinto) OmaVero kaudu. Osaühingul on aruande andmed ühtlasi deklaratsiooni aluseks.' },
        { t: 'h2', x: 'Mida väikeettevõtte aruanne sisaldab' },
        { t: 'ul', items: [
          'Bilanss (tase): varad, omakapital ja kohustused aasta viimasel päeval.',
          'Kasumiaruanne (tuloslaskelma): tulud, kulud ja aasta kasum või kahjum.',
          'Lisad (liitetiedot): näiteks koostamise põhimõtted, töötajate keskmine arv ning antud tagatised ja kohustused.',
          'Eelmise aasta võrdlusandmed iga bilansi- ja kasumiaruande kirje kohta.',
        ] },
        { t: 'p', x: 'Rahavoogude aruannet (rahoituslaskelma) ei ole vaja: see on kohustuslik ainult suurettevõttele ja avaliku huviga üksusele. Väike- ja mikroettevõte ei pea koostama ka tegevusaruannet (toimintakertomus). Nende kohta kehtib eraldi määrus (PMA 1753/2015) lihtsamate skeemidega. Aruandes tuleb märkida, et see on koostatud väike- või mikroettevõtte reeglite järgi. Osaühingu aruandes näidatakse lisaks omakapitali muutused ja juhatuse ettepanek kasumi jaotamiseks. Aruande toetuseks koostatakse bilansi kirjete erittelud (tase-erittelyt), kuid neid ei avaldata.' },
        { t: 'h3', x: 'Mikro- või väikeettevõte? 2026. aasta piirid' },
        { t: 'p', x: 'Suurusklassi määravad kolm piiri. Ettevõte kuulub klassi, kui nii lõppenud kui ka sellele eelnenud majandusaastal ületatakse kõige rohkem üks piir:' },
        { t: 'ul', items: [
          'Mikroettevõte: bilansimaht 450 000 €, käive 900 000 €, keskmiselt 10 töötajat.',
          'Väikeettevõte: bilansimaht 7 500 000 €, käive 15 000 000 €, keskmiselt 50 töötajat.',
        ] },
        { t: 'p', x: 'Piire tõsteti seadusega 605/2024. Uusi piire kohaldatakse majandusaastatele, mis algavad 1.1.2025 või hiljem (soovi korral juba 1.1.2024 või hiljem alanud aastatele), seega ka 31.12.2026 lõppevale aastale.' },
        { t: 'h2', x: 'Toiminimi: kas aruannet on vaja?' },
        { t: 'p', x: 'Füüsilisest isikust ettevõtja (toiminimi, liikkeen- tai ammatinharjoittaja) peab pidama raamatupidamist, kuid tilinpäätös on kohustuslik ainult siis, kui nii lõppenud kui ka eelmisel aastal ületatakse vähemalt kaks mikroettevõtte piiri. Tavaline toiminimi ei pea seega aruannet koostama. Raamatupidamine tuleb siiski pidada nii, et nõuded ostjate vastu, võlad tarnijatele ja maksustamiseks vajalikud andmed oleksid selgelt näha.' },
        { t: 'ul', items: [
          'Lihtne (ühekordne) raamatupidamine on lubatud, kui nii lõppenud kui ka eelmisel aastal ületatakse kõige rohkem üks neist: bilansimaht 100 000 €, käive 200 000 €, keskmiselt kolm töötajat.',
          'Toiminimi majandusaasta on alati kalendriaasta. Kahekordse raamatupidamise korral võib see kalendriaastast erineda.',
          'Ettevõtluse maksudeklaratsioon (vorm 5) esitatakse igal aastal, ka aasta eest, mil tegevust ei olnud. 2025. aasta deklaratsiooni tähtaeg oli 1.4.2026. 2026. aasta deklaratsiooni tähtaja leiad OmaVerost.',
          'Äriregistrile esitab toiminimi aruande ainult siis, kui ta on väikeettevõttest suurem.',
        ] },
        { t: 'h2', x: 'Täisühing ja usaldusühing' },
        { t: 'p', x: 'Täisühing (avoin yhtiö) ja usaldusühing (kommandiittiyhtiö) peavad koostama aruande nelja kuu jooksul pärast majandusaasta lõppu; selle allkirjastavad täisosanikud. Pane tähele, et maksudeklaratsioon (vorm 6A) tuleb esitada varem: 2025. aasta eest hiljemalt 1.4.2026. Aruannet deklaratsioonile ei lisata. Äriregistrile esitatakse see kuue kuu jooksul ainult siis, kui ühingu täisosanikuks on osaühing või kui ühing on väikeettevõttest suurem.' },
        { t: 'h2', x: 'Osaühing (osakeyhtiö): kohustused ja tähtajad' },
        { t: 'ul', items: [
          'Aruanne koostatakse nelja kuu jooksul pärast majandusaasta lõppu ning selle allkirjastavad juhatus ja tegevjuht.',
          'Maksudeklaratsioon (vorm 6B) esitatakse elektrooniliselt nelja kuu jooksul pärast majandusaasta viimase kalendrikuu lõppu, ka siis, kui tegevust ei olnud.',
          'Korraline üldkoosolek (varsinainen yhtiökokous) peetakse kuue kuu jooksul pärast aasta lõppu. See kinnitab aruande, otsustab kasumi kasutamise ning juhatuse ja tegevjuhi vastutusest vabastamise.',
          'Kinnitatud aruanne esitatakse äriregistrile kahe kuu jooksul pärast kinnitamist ja hiljemalt kaheksa kuu jooksul pärast aasta lõppu. Selle aja jooksul on esitamine tasuta.',
          'Hilinemise eest määrab Soome patendi- ja registriamet (PRH) tasu: 150 €, kui hilinetakse kuni 2 kuud, 300 €, kui 2–4 kuud, ja 600 €, kui üle 4 kuu või kui aruanne jääb esitamata. Tasu on kahekordne, kui aruanne on hilinenud kaks või enam järjestikust aastat. Pikka aega aruande esitamata jätnud ühingu võib registrist kustutada või likvideerimisele saata.',
          'Ka tegevuseta osaühing peab esitama aruande iga majandusaasta kohta.',
        ] },
        { t: 'p', x: 'Enamik osaühinguid saadab aruande äriregistrile koos maksudeklaratsiooniga. Maksuamet edastab selle PRH-le ainult siis, kui lisa tüüp on valitud juhendi järgi. Kui üldkoosolek ei ole aruannet veel kinnitanud, lisatakse see tüübiga „Tilinpäätös vain Verohallinnolle” (ainult maksuametile) ja kinnitatud aruanne esitatakse pärast koosolekut. Lõpuks kontrolli PRH Virre teenusest, et aruanne on registreeritud.' },
        { t: 'h3', x: 'Dividend ja audiitor' },
        { t: 'ul', items: [
          'Juhatus teeb ettepaneku kasumi jaotamiseks. Vahendeid ei tohi jaotada, kui on teada või peaks olema teada, et ühing on maksejõuetu või muutub jaotuse tõttu maksejõuetuks. Kui dividendi otsus tehakse pärast deklaratsiooni esitamist, saadetakse andmed maksuametile ühe kuu jooksul otsusest.',
          'Audiitorit ei pea valima, kui nii lõppenud kui ka eelmisel aastal on täidetud kõige rohkem üks tingimus: bilansimaht üle 100 000 €, käive üle 200 000 €, keskmiselt üle kolme töötaja. Põhikiri võib siiski auditit nõuda ja valdusühingul võib audiitori valimise kohustus olla alati.',
          'Kui audiitor on valitud, antakse aruanne talle hiljemalt kuu aega enne üldkoosolekut.',
        ] },
        { t: 'h2', x: 'Aastalõpu tööd: kontrollnimekiri' },
        { t: 'ol', items: [
          'Võrdle pangakontode ja kassa jääke 31.12 seisuga pangaväljavõtetega.',
          'Võrdle raamatupidamise käibemaksukontosid OmaVeros esitatud ALV-deklaratsioonidega ja paranda erinevused.',
          'Vaata läbi avatud nõuded ja võlad ning selgita välja, millised arved on päriselt tasumata.',
          'Inventeeri laovarud 31.12 seisuga. Aasta lõpus alles oleva varu soetusmaksumus kantakse bilanssi. Kui asendus- või müügihind on soetusmaksumusest madalam, kantakse vahe kuluks.',
          'Tee perioodistamised: aasta tulud ja kulud kirjendatakse olenemata maksmise päevast (siirtosaamiset ja siirtovelat). Väikesi summasid ei pea korrigeerima, kui nende koosmõju ei ole oluline.',
          'Kirjenda amortisatsioon. Masinate ja seadmete puhul võib maksustamisel maha arvata kuni 25 % jääkmaksumusest (menojäännös) aastas ning kuni 1 200 € jääkmaksumuse korraga. Vara, mille kasulik eluiga on kuni 3 aastat, võib maha arvata korraga. Samuti võib korraga maha arvata kuni 1 200 € väikeostud (pienhankinnat), kokku kuni 3 600 € aastas. Maksustamisel ei saa maha arvata rohkem amortisatsiooni, kui on kirjendatud raamatupidamises.',
          'Koosta bilansi erittelud ja kontrolli, et algbilanss vastab eelmise aasta aruandele.',
          'Osaühing: valmista ette juhatuse kasumijaotuse ettepanek ja hinda ühingu maksevõimet.',
        ] },
        { t: 'h2', x: 'Ajakava, kui majandusaasta lõpeb 31.12.2026' },
        { t: 'ul', items: [
          'Detsember–jaanuar: anna raamatupidajale kõik aasta kuludokumendid ja arved, pangaväljavõtted, laonimekiri ning andmed aasta tulude ja kulude kohta, mille kohta pole veel arvet esitatud.',
          'Veebruar–märts: aruande kavand ja amortisatsiooniarvestus. Toiminimi, täisühingu ja usaldusühingu maksudeklaratsioon esitatakse aprilli alguseks (2025. aasta eest oli tähtaeg 1.4.2026). Täpse päeva leiad OmaVerost.',
          'Aprill: aruanne tuleb koostada ja allkirjastada hiljemalt 30.4.2027. Osaühingu maksudeklaratsioon tuleb esitada hiljemalt 30.4.2027.',
          'Mai–juuni: osaühingu korraline üldkoosolek hiljemalt 30.6.2027. Kui täis- või usaldusühing peab aruande registrile esitama, on tähtaeg samuti 30.6.2027.',
          'Juuli–august: osaühingu kinnitatud aruanne äriregistrile hiljemalt 31.8.2027.',
        ] },
        { t: 'h2', x: 'Kui kaua dokumente säilitada' },
        { t: 'p', x: 'Aruannet, raamatupidamisregistreid, kontoplaani ning registrite ja materjalide loetelu säilitatakse vähemalt 10 aastat majandusaasta lõpust. Algdokumente (tositteet), äritehingute kirjavahetust ja muid materjale säilitatakse vähemalt 6 aastat selle aasta lõpust, mil majandusaasta lõppes. 2026. aasta kuludokumente tuleb seega hoida 2032. aasta lõpuni ja aruannet 31.12.2036-ni.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Osaühingu aruanne saadetakse koos deklaratsiooniga vale lisa tüübiga ega jõua kunagi äriregistrisse. Hilinemistasu tuleb ikkagi.',
          'Tegevuseta osaühing ei esita aruannet, sest „midagi ei juhtunud”.',
          'Dividend makstakse enne, kui üldkoosolek on aruande kinnitanud või maksevõimet on hinnatud.',
          'Toiminimi jätab deklaratsiooni esitamata aasta eest, mil tegevust ei olnud.',
          'Täis- või usaldusühing arvab, et deklaratsiooni jaoks on neli kuud aega, kuigi tähtaeg on aprilli alguses.',
          'Masin või seade kantakse täielikult kuluks, kuigi seda tuleks amortiseerida mitme aasta jooksul.',
          'Varusid ei inventeerita või detsembri tulud ja kulud jäävad perioodistamata.',
        ] },
        { t: 'note', x: 'Suuruspiirid kehtivad majandusaastatele, mis algasid 1.1.2025 või hiljem: mikroettevõte 450 000 / 900 000 € / 10 inimest ja väikeettevõte 7 500 000 / 15 000 000 € / 50 inimest. Hilinemistasud (150, 300 ja 600 €) puudutavad osaühinguid ja ühistuid, mille majandusaasta lõppes 1.12.2024 või hiljem. 2027. aasta deklaratsioonide täpsed tähtajad avaldatakse OmaVeros. Allikad: Soome raamatupidamisseadus (1336/1997), PMA (1753/2015), osaühinguseadus (624/2006), auditiseadus (1141/2015), ettevõtlustulu maksustamise seadus (360/1968), PRH ja Soome maksuamet.' },
        { t: 'h2', x: 'Aitame aastaaruandega' },
        { t: 'p', x: 'Tilitoimisto Debit Credit koostab sinu väikeettevõtte aruande ja maksudeklaratsiooni, vaatab koos sinuga läbi amortisatsiooni, laovarud ja perioodistamised ning valmistab ette osaühingu üldkoosoleku dokumendid ja kasumijaotuse ettepaneku. Kinnitatud aruande esitame äriregistrile sinu eest. Meie kliendid saavad saata kuludokumendid ja pangaväljavõtted Vaavo rakenduse kaudu. Teenindame soome ja vene keeles. Võta ühendust aegsasti enne aastavahetust, siis ei tule tähtajad üllatusena.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'PRH: osaühingute ja ühistute aruanded (inglise keeles)', href: SRC.prhOyEn },
          { label: 'PRH: hilinenud aruande tasu (inglise keeles)', href: SRC.prhFeeEn },
          { label: 'PRH: aruanded äriregistrile, kõik ettevõtlusvormid (soome keeles)', href: SRC.prhHubFi },
          { label: 'Vero: osaühingu maksudeklaratsioon (inglise keeles)', href: SRC.oyReturnEn },
          { label: 'Vero: füüsilisest isikust ettevõtja deklaratsioon, vorm 5 (inglise keeles)', href: SRC.tmiReturnEn },
          { label: 'Vero: amortisatsioon ja väikeostud (inglise keeles)', href: SRC.deprEn },
          { label: 'Finlex: raamatupidamisseadus 1336/1997 (soome keeles)', href: SRC.kpl },
          { label: 'Finlex: väike- ja mikroettevõtte aruande määrus 1753/2015 (soome keeles)', href: SRC.pma },
          { label: 'Finlex: osaühinguseadus 624/2006 (soome keeles)', href: SRC.oyl },
          { label: 'Finlex: auditiseadus 1141/2015 (soome keeles)', href: SRC.ttl },
          { label: 'Finlex: ettevõtlustulu maksustamise seadus 360/1968 (soome keeles)', href: SRC.evl },
        ] },
      ],
      faq: [
        { q: 'Kas toiminimi vajab aastaaruannet?', a: 'Tavaliselt mitte. Toiminimi peab aruande koostama ainult siis, kui nii lõppenud kui ka eelmisel aastal ületatakse vähemalt kaks mikroettevõtte piiri (bilanss 450 000 €, käive 900 000 €, 10 töötajat). Raamatupidamist tuleb siiski pidada ja maksudeklaratsioon (vorm 5) esitatakse igal aastal.' },
        { q: 'Mis ajaks peab osaühingu aruanne valmis olema, kui aasta lõpeb 31.12.2026?', a: 'Aruanne tuleb koostada ja allkirjastada ning maksudeklaratsioon esitada hiljemalt 30.4.2027. Üldkoosolek peetakse hiljemalt 30.6.2027 ja kinnitatud aruanne esitatakse äriregistrile hiljemalt 31.8.2027.' },
        { q: 'Mis juhtub, kui aruanne jõuab PRH-sse hilinemisega?', a: 'Osaühing ja ühistu maksavad hilinemistasu: 150 €, kui hilinetakse kuni 2 kuud, 300 €, kui 2–4 kuud, ja 600 €, kui üle 4 kuu või kui aruanne jääb esitamata. Korduva hilinemise korral on tasu kahekordne ja pikka aega aruande esitamata jätnud ühingu võib registrist kustutada.' },
        { q: 'Kas väike osaühing peab koostama tegevusaruande?', a: 'Ei. Väike- ja mikroettevõte ei vaja tegevusaruannet ega rahavoogude aruannet. Aruanne koosneb bilansist, kasumiaruandest ja lisadest ning selles näidatakse juhatuse kasumijaotuse ettepanek.' },
        { q: 'Kas väike ühing vajab audiitorit?', a: 'Ei, kui nii lõppenud kui ka eelmisel aastal on täidetud kõige rohkem üks tingimus: bilansimaht üle 100 000 €, käive üle 200 000 € või keskmiselt üle kolme töötaja. Põhikiri võib siiski auditit nõuda.' },
        { q: 'Kui kaua tuleb kuludokumente ja aruannet säilitada?', a: 'Algdokumente vähemalt 6 aastat selle aasta lõpust, mil majandusaasta lõppes, ning aruannet ja raamatupidamisregistreid vähemalt 10 aastat majandusaasta lõpust. 2026. aasta kuludokumente hoitakse 2032. aasta lõpuni.' },
      ],
    },
    uk: {
      title: 'Tilinpäätös для малого бізнесу 2026: склад, строки та завдання на кінець року',
      description:
        'Tilinpäätös 2026: що входить до звітності малої та мікрокомпанії, чи потрібна вона toiminimi, строки для PRH і податкової та план дій із січня до серпня.',
      lead: 'У більшості компаній фінансовий рік закінчується 31.12, і саме тоді настає час річної звітності — tilinpäätös. Ми зібрали, що потрібно зробити невеликому osakeyhtiö (Oy), avoin yhtiö, kommandiittiyhtiö та toiminimi, які строки встановлено законом і що варто перевірити вже в грудні. Наприкінці — помісячний план із січня до серпня.',
      body: [
        { t: 'h2', x: 'Що таке tilinpäätös?' },
        { t: 'p', x: 'Tilinpäätös — це передбачений законом про бухгалтерський облік (kirjanpitolaki 1336/1997) підсумок результату фінансового року та фінансового стану компанії на його останній день. Її складають за даними бухгалтерії фінською або шведською мовою та в євро. Tilinpäätös — не те саме, що податкова декларація: звітність є документом бухгалтерського закону, а декларацію подають до податкової (Verohallinto) через OmaVero. В Oy дані звітності водночас є основою декларації.' },
        { t: 'h2', x: 'Що входить до звітності малої компанії' },
        { t: 'ul', items: [
          'Баланс (tase): активи, власний капітал і зобов’язання на останній день року.',
          'Звіт про прибутки та збитки (tuloslaskelma): доходи, витрати й прибуток або збиток за рік.',
          'Примітки (liitetiedot): наприклад, принципи складання, середня кількість працівників, надані застави та зобов’язання.',
          'Порівняльні дані за попередній рік щодо кожної статті балансу та звіту про прибутки та збитки.',
        ] },
        { t: 'p', x: 'Звіт про рух грошових коштів (rahoituslaskelma) не потрібен: він обов’язковий лише для великих компаній і суб’єктів, значущих для суспільних інтересів. Малій і мікрокомпанії не потрібно складати й звіт про діяльність (toimintakertomus). Для них діє окрема постанова (PMA 1753/2015) зі спрощеними формами. У звітності зазначають, що її складено за правилами для малих або мікрокомпаній. У звітності Oy також наводять зміни власного капіталу та пропозицію правління щодо розподілу прибутку. На підтвердження звітності складають розшифровки балансу (tase-erittelyt), але їх не оприлюднюють.' },
        { t: 'h3', x: 'Мікро чи мала компанія? Пороги 2026 року' },
        { t: 'p', x: 'Категорію визначають три пороги. Компанія належить до категорії, якщо і в завершеному, і в попередньому фінансовому році перевищено не більше ніж один поріг:' },
        { t: 'ul', items: [
          'Мікрокомпанія: підсумок балансу 450 000 €, оборот 900 000 €, у середньому 10 працівників.',
          'Мала компанія: підсумок балансу 7 500 000 €, оборот 15 000 000 €, у середньому 50 працівників.',
        ] },
        { t: 'p', x: 'Пороги підвищено законом 605/2024. Нові значення застосовуються до фінансових років, що почалися 1.1.2025 або пізніше (за бажанням — уже до років, що почалися 1.1.2024 або пізніше), тобто й до року, який закінчується 31.12.2026.' },
        { t: 'h2', x: 'Toiminimi: чи потрібна tilinpäätös?' },
        { t: 'p', x: 'Фізична особа-підприємець (toiminimi, liikkeen- tai ammatinharjoittaja) зобов’язана вести бухгалтерію, але tilinpäätös обов’язкова, лише якщо і в завершеному, і в попередньому році перевищено щонайменше два пороги мікрокомпанії. Звичайному toiminimi складати звітність не потрібно. Облік однаково ведуть так, щоб було видно дебіторську й кредиторську заборгованість і дані для оподаткування.' },
        { t: 'ul', items: [
          'Простий (одинарний) облік дозволено, якщо і в завершеному, і в попередньому році перевищено не більше одного з порогів: підсумок балансу 100 000 €, оборот 200 000 €, у середньому три працівники.',
          'Фінансовий рік toiminimi — завжди календарний. За подвійної бухгалтерії він може відрізнятися від календарного.',
          'Податкову декларацію про підприємницьку діяльність (форма 5) подають щороку, навіть якщо діяльності не було. Декларацію за 2025 рік потрібно було подати до 1.4.2026. Строк для декларації за 2026 рік перевірте в OmaVero.',
          'До торговельного реєстру фізична особа-підприємець подає звітність, лише якщо її підприємство більше за малу компанію.',
        ] },
        { t: 'h2', x: 'Avoin yhtiö та kommandiittiyhtiö' },
        { t: 'p', x: 'Повне товариство (avoin yhtiö) і командитне товариство (kommandiittiyhtiö) мають скласти tilinpäätös протягом чотирьох місяців після закінчення року; підписують її повні (відповідальні) учасники. Зверніть увагу: податкову декларацію (форма 6A) подають раніше — за 2025 рік до 1.4.2026. Звітність до декларації не додають. До торговельного реєстру її подають протягом шести місяців, лише якщо повним (відповідальним) учасником є Oy або якщо товариство більше за малу компанію.' },
        { t: 'h2', x: 'Osakeyhtiö: обов’язки та строки' },
        { t: 'ul', items: [
          'Tilinpäätös складають протягом чотирьох місяців після закінчення фінансового року; підписують правління та генеральний директор.',
          'Податкову декларацію (форма 6B) подають електронно протягом чотирьох місяців після закінчення останнього календарного місяця фінансового року — навіть якщо діяльності не було.',
          'Чергові загальні збори акціонерів (varsinainen yhtiökokous) проводять протягом шести місяців після закінчення року. Вони затверджують звітність, вирішують, як розпорядитися прибутком, і звільняють правління та директора від відповідальності (vastuuvapaus).',
          'Затверджену звітність подають до торговельного реєстру протягом двох місяців після затвердження і не пізніше ніж за вісім місяців після закінчення року. У цей строк подання безкоштовне.',
          'За запізнення PRH призначає збір: 150 € за запізнення до 2 місяців, 300 € — на 2–4 місяці, 600 € — понад 4 місяці або якщо звітність не подано. Збір подвоюється, якщо звітність запізнювалася два або більше років поспіль. Компанію, яка довго не подає звітність, можуть виключити з реєстру або відправити на ліквідацію.',
          'Звітність за кожен рік зобов’язаний подавати й Oy, що не веде діяльності.',
        ] },
        { t: 'p', x: 'Більшість Oy передають звітність до реєстру разом із податковою декларацією. Податкова пересилає її до PRH, лише якщо тип вкладення вибрано за інструкцією. Якщо збори ще не затвердили звітність, її додають із типом «Tilinpäätös vain Verohallinnolle» («лише для податкової»), а затверджену подають після зборів. Насамкінець перевірте в сервісі PRH Virre, що звітність зареєстровано.' },
        { t: 'h3', x: 'Дивіденди та аудитор' },
        { t: 'ul', items: [
          'Правління готує пропозицію щодо розподілу прибутку. Кошти не можна розподіляти, якщо відомо або має бути відомо, що компанія неплатоспроможна або стане такою через виплату. Якщо рішення про дивіденди ухвалено після подання декларації, дані надсилають до податкової протягом місяця після рішення.',
          'Аудитора можна не обирати, якщо і в завершеному, і в попередньому році виконано не більше однієї умови: підсумок балансу понад 100 000 €, оборот понад 200 000 €, у середньому понад три працівники. Статут однаково може вимагати аудиту, а холдингова компанія може бути зобов’язана обрати аудитора завжди.',
          'Якщо аудитора обрано, звітність передають йому не пізніше ніж за місяць до загальних зборів.',
        ] },
        { t: 'h2', x: 'Завдання на кінець року: чек-лист' },
        { t: 'ol', items: [
          'Звірте залишки на банківських рахунках і в касі на 31.12 із виписками.',
          'Порівняйте рахунки ПДВ у бухгалтерії з деклараціями ALV, поданими в OmaVero, і виправте розбіжності.',
          'Перегляньте відкриту дебіторську й кредиторську заборгованість і з’ясуйте, які рахунки справді не оплачено.',
          'Проведіть інвентаризацію складу на 31.12. Вартість придбання залишків переносять до балансу. Якщо ціна повторної закупівлі або продажу нижча за вартість придбання, різницю списують у витрати.',
          'Зробіть нарахування: доходи й витрати року враховують незалежно від дати оплати (siirtosaamiset і siirtovelat). Дрібні суми можна не коригувати, якщо разом вони несуттєві.',
          'Нарахуйте амортизацію. Для машин і обладнання в оподаткуванні можна вирахувати не більше 25 % залишкової вартості групи (menojäännös) на рік, а залишок до 1 200 € — списати одразу. Придбання зі строком служби до 3 років можна вирахувати одразу. Так само можна вирахувати дрібні придбання (pienhankinnat) до 1 200 € кожне, загалом не більше 3 600 € на рік. В оподаткуванні не можна вирахувати більше амортизації, ніж нараховано в бухгалтерії.',
          'Підготуйте розшифровки балансу й перевірте, що вхідний баланс збігається зі звітністю минулого року.',
          'Oy: підготуйте пропозицію правління щодо розподілу прибутку та оцініть платоспроможність.',
        ] },
        { t: 'h2', x: 'План, якщо фінансовий рік закінчується 31.12.2026' },
        { t: 'ul', items: [
          'Грудень–січень: передайте бухгалтерові всі документи за рік, виписки, список складських залишків і відомості про доходи й витрати року, за якими ще немає рахунків.',
          'Лютий–березень: проєкт звітності та розрахунок амортизації. Декларації toiminimi, avoin yhtiö і kommandiittiyhtiö подають до початку квітня (за 2025 рік строк був 1.4.2026). Точну дату перевірте в OmaVero.',
          'Квітень: звітність (tilinpäätös) має бути складена й підписана не пізніше 30.4.2027. Декларацію Oy подають не пізніше 30.4.2027.',
          'Травень–червень: загальні збори Oy — не пізніше 30.6.2027. Якщо avoin yhtiö чи kommandiittiyhtiö зобов’язане подавати звітність до реєстру, строк теж 30.6.2027.',
          'Липень–серпень: затверджена звітність Oy — до торговельного реєстру не пізніше 31.8.2027.',
        ] },
        { t: 'h2', x: 'Скільки зберігати документи' },
        { t: 'p', x: 'Звітність, бухгалтерські книги, план рахунків і перелік книг та матеріалів зберігають щонайменше 10 років від закінчення фінансового року. Первинні документи (tositteet), ділове листування й інші матеріали — щонайменше 6 років від кінця того року, в якому закінчився фінансовий рік. Документи за 2026 рік треба зберігати до кінця 2032 року, а звітність — до 31.12.2036.' },
        { t: 'h2', x: 'Поширені помилки' },
        { t: 'ul', items: [
          'Звітність Oy надіслано разом із декларацією з неправильним типом вкладення, і вона так і не потрапила до торговельного реєстру. Збір за запізнення однаково надійде.',
          'Oy, що не веде діяльності, не подає звітність, бо «нічого не відбувалося».',
          'Дивіденди виплачено до затвердження звітності зборами або без оцінки платоспроможності.',
          'Toiminimi не подає декларацію за рік, коли діяльності не було.',
          'Avoin yhtiö чи kommandiittiyhtiö вважає, що на декларацію є чотири місяці, хоча строк — на початку квітня.',
          'Машину чи обладнання повністю списують у витрати, хоча їх треба амортизувати кілька років.',
          'Склад не інвентаризують, або грудневі доходи й витрати залишаються без нарахування.',
        ] },
        { t: 'note', x: 'Пороги діють для фінансових років, що почалися 1.1.2025 або пізніше: мікрокомпанія 450 000 / 900 000 € / 10 осіб, мала компанія 7 500 000 / 15 000 000 € / 50 осіб. Збори за запізнення (150, 300 і 600 €) стосуються Oy та кооперативів, фінансовий рік яких закінчився 1.12.2024 або пізніше. Точні строки декларацій 2027 року публікують в OmaVero. Джерела: kirjanpitolaki (1336/1997), PMA (1753/2015), закон про акціонерні товариства (624/2006), закон про аудит (1141/2015), закон про оподаткування підприємницької діяльності (360/1968), PRH і Verohallinto.' },
        { t: 'h2', x: 'Допоможемо з річною звітністю' },
        { t: 'p', x: 'Tilitoimisto Debit Credit складе tilinpäätös і податкову декларацію вашої компанії, розбере з вами амортизацію, склад і нарахування, підготує документи для загальних зборів Oy та пропозицію щодо розподілу прибутку. Затверджену звітність ми подаємо до торговельного реєстру від вашого імені. Наші клієнти можуть передавати чеки й виписки через застосунок Vaavo. Працюємо фінською та російською. Зв’яжіться з нами заздалегідь, до кінця року, — тоді строки не застануть зненацька.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'PRH: подання звітності Oy та кооперативів (англійською)', href: SRC.prhOyEn },
          { label: 'PRH: збір за запізнення зі звітністю (англійською)', href: SRC.prhFeeEn },
          { label: 'PRH: звітність до торговельного реєстру — усі форми компаній (фінською)', href: SRC.prhHubFi },
          { label: 'Vero: податкова декларація Oy (англійською)', href: SRC.oyReturnEn },
          { label: 'Vero: декларація ФОП, форма 5 (англійською)', href: SRC.tmiReturnEn },
          { label: 'Vero: амортизація та дрібні придбання (англійською)', href: SRC.deprEn },
          { label: 'Finlex: kirjanpitolaki 1336/1997 (фінською)', href: SRC.kpl },
          { label: 'Finlex: постанова про звітність малих і мікрокомпаній 1753/2015 (фінською)', href: SRC.pma },
          { label: 'Finlex: закон про акціонерні товариства 624/2006 (фінською)', href: SRC.oyl },
          { label: 'Finlex: закон про аудит 1141/2015 (фінською)', href: SRC.ttl },
          { label: 'Finlex: закон про оподаткування підприємницької діяльності 360/1968 (фінською)', href: SRC.evl },
        ] },
      ],
      faq: [
        { q: 'Чи потрібна toiminimi tilinpäätös?', a: 'Як правило, ні. Фізична особа-підприємець (toiminimi) зобов’язана складати tilinpäätös, лише якщо і в завершеному, і в попередньому році перевищено щонайменше два пороги мікрокомпанії (баланс 450 000 €, оборот 900 000 €, 10 працівників). Бухгалтерію однаково ведуть, а декларацію (форма 5) подають щороку.' },
        { q: 'До якої дати Oy має підготувати звітність, якщо рік закінчується 31.12.2026?', a: 'Tilinpäätös потрібно скласти й підписати, а податкову декларацію подати не пізніше 30.4.2027. Загальні збори — не пізніше 30.6.2027, затверджену звітність подають до торговельного реєстру не пізніше 31.8.2027.' },
        { q: 'Що буде, якщо подати звітність до PRH із запізненням?', a: 'Для Oy та кооперативів призначають збір: 150 € за запізнення до 2 місяців, 300 € — на 2–4 місяці та 600 € — понад 4 місяці або якщо звітність не подано. За повторних запізнень збір подвоюється, а компанію, яка довго не подає звітність, можуть виключити з реєстру.' },
        { q: 'Чи має невелике Oy складати звіт про діяльність?', a: 'Ні. Малій і мікрокомпанії не потрібні ні toimintakertomus, ні звіт про рух грошових коштів. До звітності входять баланс, звіт про прибутки та збитки й примітки, а також пропозиція правління щодо розподілу прибутку.' },
        { q: 'Чи потрібен невеликій компанії аудитор?', a: 'Ні, якщо і в завершеному, і в попередньому році виконано не більше однієї умови: підсумок балансу понад 100 000 €, оборот понад 200 000 € або в середньому понад три працівники. Проте статут може вимагати аудиту.' },
        { q: 'Скільки зберігати чеки та звітність?', a: 'Первинні документи — щонайменше 6 років від кінця року, в якому закінчився фінансовий рік; звітність і бухгалтерські книги — щонайменше 10 років від закінчення фінансового року. Чеки за 2026 рік зберігайте до кінця 2032 року.' },
      ],
    },
  },
};
