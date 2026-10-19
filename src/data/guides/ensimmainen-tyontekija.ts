import type { Guide } from './types';

// Facts verified 19 Oct 2026, verbatim, against vero.fi, Finlex, tyollisyysrahasto.fi, kela.fi,
// suomi.fi and etk.fi (page update date in brackets where the page shows one). Every link below was
// fetched the same day and answered HTTP 200.
// - Vero, Sosiaalivakuutusmaksut (8.12.2025; EN 8.12.2025), table "2026 / 2025":
//   "Työnantajan sairausvakuutusmaksu 1,91 % 1,87 %"; "Työnantajana maksat työnantajan
//   sairausvakuutusmaksua 16–67-vuotiaasta työntekijästä"; vakuutetun sairausvakuutusmaksu "sisältyy
//   ennakonpidätysprosenttiin, joten sitä ei tarvitse periä erikseen palkasta".
//   TyEL: "Työnantajan on otettava työeläkevakuutus 17 vuotta täyttäneille työntekijöille, joiden
//   kuukausiansio ylittää vakuuttamisvelvollisuuden alarajan"; "Työnantajana sinun pitää periä
//   työntekijän osuus palkanmaksun yhteydessä"; "Työntekijän eläkevakuutusmaksu: 17–52-vuotiaat sekä
//   63 vuotta täyttäneet 7,30 % 7,15 %", "53–62-vuotiaat 7,30 % 8,65 %", "Sopimustyönantajan
//   eläkemaksu keskimäärin 17,10 % 17,38 %".
//   Työttömyysvakuutus: "jos hän maksaa kalenterivuoden aikana työntekijöilleen palkkaa yhteensä yli
//   1 500 euroa. Työttömyysvakuutusmaksua maksetaan, jos työntekijä on 18–64-vuotias"; employer 2026
//   "0,31 %, jos palkkoja maksettu enintään 2 509 500 euroa", "2 509 500 euroa ylittävältä osalta
//   1,23 %"; "Työntekijän osuus 0,89 % 0,59 %".
//   Tapaturma: "sinun on vakuutettava työntekijäsi työtapaturman ja ammattitaudin varalta, jos maksat
//   palkkoja kalenterivuodessa yhteensä yli 1 500 euroa. Vakuutuksen on oltava voimassa heti, kun
//   työntekijä aloittaa työt"; "Tapaturmavakuutusmaksu vaihtelee toimiala- ja yrityskohtaisesti".
//   (The Act 459/2015 § 3 states the base amount "enintään 1 200 euroa", index-adjusted by the
//   palkkakerroin; the article uses Vero's current figure.)
//   Ryhmähenki: "Voit joutua ottamaan työntekijöillesi myös ryhmähenkivakuutuksen, jos työnantajaa
//   koskevassa työehtosopimuksessa on sovittu niin"; "Vakuutusyhtiö perii ryhmähenkivakuutusmaksun
//   tapaturmavakuutusmaksun yhteydessä".
// - Eläketurvakeskus, Lakisääteiset sosiaalivakuutusmaksut Suomessa 2026 (PDF, 1/2026):
//   "Työeläkevakuutusmaksu kokonaisuudessaan on keskimäärin 24,40 % työntekijän palkasta.
//   Työntekijän maksu vuonna 2026 on 7,30 prosenttia"; "Työnantajan osuudeksi ... jää keskimäärin
//   17,10 %"; "Työnantajan sosiaaliturvamaksu (= sairausvakuutusmaksu) on 1,91 % palkasta";
//   "työnantajan osuus on 0,31 % tai 1,23 % riippuen työantajan koko palkkasummasta".
//   ETK news Työeläkemaksut vuonna 2026: "Työntekijän maksu on 7,30 prosenttia kaikille ikäryhmille."
//   ETK (EN, wage-earners): "Since the limit is so low, pension accrues for virtually all gainful
//   employment." The 2026 euro lower limit was not found on an official page → not stated.
// - Työeläkelaki 395/2006 (Finlex, ajantasa 16.6.2026): "Työnantajan on järjestettävä eläketurva
//   viimeistään työansion maksamisen jälkeen ja ennen kuin työansio on ... ilmoitettava
//   tulorekisteriin." (Euro thresholds in the Act are index-linked → not stated.)
// - Työllisyysrahasto, Työttömyysvakuutusmaksun maksaminen (fetched 19.10.2026): "Vuonna 2026
//   työnantajan työttömyysvakuutusmaksuprosentti on 0,31 % 2 509 500 euroon asti ja sen ylittävältä
//   osalta 1,23 % palkkasummasta"; "Palkansaajan työttömyysvakuutusmaksuprosentti on 0,89 %, jonka
//   työnantaja pidättää työntekijän palkasta palkanmaksun yhteydessä". (The same page has a stale
//   "Maksuprosentit 2026" box with 0,20 % — contradicted by its own 2026 section, Vero and ETK; not used.)
//   Työttömyysvakuutusmaksut: "yli 1500 euroa kalenterivuoden aikana", "18 vuotta täyttäneitä ja alle
//   65-vuotiaita"; "Työllisyysrahasto lähettää sinulle neljä kertaa vuodessa laskun ja päätöksen";
//   "sinun tulee aina pidättää maksuvelvollisen työntekijän palkasta työttömyysvakuutusmaksu, vaikka
//   et maksaisikaan palkkaa vuoden aikana yli maksuvelvollisuuden rajan"; Työttömyysvakuutusmaksu-
//   velvollisuus: "Työnantajana olet työttömyysvakuutusmaksuvelvollinen, jos olet maksanut
//   kalenterivuoden aikana työntekijöillesi palkkaa yhteensä yli 1500 euroa", "Mikäli palkkasumma
//   kalenterivuoden aikana ei ylitä 1500 euroa, jää pidätetty osuus sinulle".
//   Vero Sosiaalivakuutusmaksut: "laskea maksu palkkojen ja luontoisetujen yhteissummasta ja vähentää
//   työntekijän osuus hänen nettopalkastaan palkanmaksun yhteydessä" → in the worked example the
//   employee shares are deducted in addition to withholding, not before it.
// - Vero, Näin ilmoitat palkat ja työnantajasuoritukset (22.1.2025; EN 22.1.2025): "Ilmoita tiedot
//   5 päivän kuluessa maksupäivästä. Maksupäivä on se päivä, jolloin suoritus on saajan käytettävissä";
//   weekend/holiday → "seuraavana arkipäivänä"; erillisilmoitus "kerran kuukaudessa. Ilmoituksen
//   määräpäivä on palkanmaksukuukautta seuraavan kalenterikuukauden 5. päivä"; registered employer
//   "myös niiltä kuukausilta, joilta et ole maksanut palkkaa ... Ei palkanmaksua -tieto"; "euromääräistä
//   alarajaa ei ole"; "Maksa työnantajasuoritukset OmaVerossa. Eräpäivä on kuukauden 12. päivä";
//   missing reports → "arvioimme yrityksesi palkkatiedot ja määräämme verot sekä veronkorotuksen";
//   satunnainen työnantaja "et voi hakea pidempää verokautta".
// - Vero, Työnantajarekisteri (15.1.2025; EN): regular employer "pitää aina ilmoittautua"; "maksaa
//   vakituisesti palkkaa 2 tai useammalle työntekijälle"; "vakituisesti palkkaa yhdelle työntekijälle ja
//   lisäksi yhdelle tai useammalle työntekijälle, joiden työsuhde on tilapäinen"; "samanaikaisesti
//   vähintään 6 työntekijälle"; satunnainen: "vain 1 vakituinen työntekijä" / "1–5 työntekijää, joiden
//   työsuhde ei kestä koko kalenterivuotta"; "Ilmoitus on annettava aina, vaikka yritys ei kuuluisi
//   työnantajarekisteriin"; register "OmaVerossa" or "YTJ:n muutosilmoituksella".
// - Vero, Verokorttiohjeet työnantajille (17.11.2025): tax card via "Vero API -rajapintapalvelun
//   kautta"; "työntekijällä on oikeus ilmoittaa suoraan työnantajalleen suurempi veroprosentti";
//   "Työnantajan täytyy pidättää 60 % ennakonpidätystä ... jos verokorttia ei saada työntekijältä".
// - Vero, syventävä ohje 80789 Sivullisilmoittajan laiminlyöntimaksu tulorekisteri-ilmoittamisen
//   velvoitteista (VH/5794/00.01.00/2025, antopäivä 26.11.2025, voimassa 1.1.2026 – toistaiseksi; page
//   26.11.2025): VML 22 a § "enintään 2000 euroa" (vähäinen), "enintään 5000 euroa" (olennainen);
//   "Ilmoitusvelvollisen laiminlyötyä ilmoituksen antamisen kokonaan, voidaan laiminlyöntimaksua määrätä
//   enintään 15 000 euroa puuttuvaa ilmoitusta kohden."
// - Suomi.fi, Työsuhteen aikaiset velvoitteet (fetched 19.10.2026): "Jos ilmoitat tiedot tulorekisteriin
//   myöhässä, joudut maksamaan myöhästymismaksua"; (its "100–15000 euroa" is not used — Vero's
//   guidance states only maximums);
//   Muistilista: "työntekijä saa vähintään lakisääteiset työterveyshuollon palvelut".
// - Työsopimuslaki 55/2001 (Finlex, ajantasa 29.5.2026): 1:3 "Työsopimus voidaan tehdä suullisesti,
//   kirjallisesti tai sähköisesti"; 1:4 koeaika "enintään kuuden kuukauden pituisesta"; 2:4 "kirjallinen
//   selvitys työnteon keskeisistä ehdoista, jolleivät ehdot käy ilmi kirjallisesta työsopimuksesta";
//   not needed if "enintään kolme tuntia viikossa"; items incl. "työnteon alkamisajankohta",
//   "määräaikaisuuden peruste", "työntekijän pääasialliset työtehtävät", "palkan ja muun vastikkeen
//   määräytymisen perusteet sekä palkanmaksukausi", "noudatettava työaika", "vuosiloman
//   määräytyminen", "irtisanomisaika", "työhön sovellettava työehtosopimus", "vakuutuslaitos, jossa
//   työnantaja on järjestänyt työntekijän eläketurvan tai vakuuttanut työntekijän työtapaturman";
//   "1–8 kohdassa tarkoitetut tiedot on annettava seitsemän päivän kuluessa ja 9–15 kohdassa
//   tarkoitetut tiedot kuukauden kuluessa työnteon aloittamisesta"; list items also "koeaika" and
//   "mahdollinen lakiin, sopimukseen tai käytäntöön perustuva oikeus työnantajan tarjoamaan
//   koulutukseen"; 2:4 2 mom. exemption in full: "enintään kolme tuntia viikossa neljän peräkkäisen
//   viikon pituisen ajanjakson aikana"; 1:4 3 mom. "Määräaikaisessa työsuhteessa koeaika saa
//   pidennyksineen olla korkeintaan puolet työsopimuksen kestosta, ei kuitenkaan enempää kuin kuusi
//   kuukautta"; 2:7 yleissitova TES "Työnantajan on
//   noudatettava vähintään"; 2:10 without TES and agreement "tavanomainen ja kohtuullinen palkka";
//   2:15 "kerran kuukaudessa"; 2:16 "Palkka on maksettava työntekijän osoittamalle pankkitilille",
//   "Maksaessaan palkan työnantajan on annettava työntekijälle laskelma, josta käyvät ilmi palkan
//   suuruus ja sen määräytymisen perusteet".
// - Vuosilomalaki 162/2005 (Finlex, ajantasa 27.6.2025): 2 § lomanmääräytymisvuosi "1 päivän huhtikuuta
//   ja 31 päivän maaliskuuta välistä aikaa", arkipäivä "muita viikonpäiviä kuin sunnuntaita, kirkollisia
//   juhlapäiviä, itsenäisyyspäivää, jouluaattoa, juhannusaattoa, pääsiäislauantaita ja vapunpäivää"
//   (so Saturdays count); 5 § "kaksi ja puoli arkipäivää kultakin
//   täydeltä lomanmääräytymiskuukaudelta", under a year "kaksi arkipäivää"; 6 § "vähintään 14
//   työssäolopäivää", else "vähintään 35 työtuntia"; 12 § "9 prosenttia taikka työsuhteen jatkuttua
//   lomakautta edeltävän lomanmääräytymisvuoden loppuun mennessä vähintään vuoden 11,5 prosenttia";
//   15 § "Vuosilomapalkka on maksettava ennen loman alkamista. Enintään kuuden päivän
//   pituiselta lomajaksolta lomapalkka saadaan maksaa ... tavanmukaisesti noudatettavana
//   palkanmaksupäivänä"; 17 § lomakorvaus "Työsuhteen päättyessä". The Act contains no lomaraha.
// - Työterveyshuoltolaki 1383/2001 (Finlex, ajantasa 24.10.2025): "Työnantajan on kustannuksellaan
//   järjestettävä työterveyshuolto"; with the provider "kirjallinen sopimus"; "kirjallinen toimintasuunnitelma
//   ... tarkistaa vuosittain".
// - Kela, Työterveyshuolto / korvauksen määrä / hakeminen (fetched 19.10.2026): "Työnantaja hakee
//   korvauksen jälkikäteen tilikausittain"; "Ehkäisevän työterveyshuollon korvaus on 60 % ja
//   sairaanhoidon 50 % hyväksytyistä kustannuksista"; "6 kuukauden kuluessa tilikauden päättymisestä".
// - Worked example (own arithmetic on the rates above): 3 000 € × 17,10 % = 513,00; × 0,31 % = 9,30;
//   × 1,91 % = 57,30 → 579,60 € (19,32 %) before accident and group-life insurance; employee TyEL
//   219,00 € and unemployment 26,70 €.
const VERO = 'https://www.vero.fi';

const SRC = {
  socialFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/sosiaalivakuutusmaksut/`,
  socialEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/being-an-employer/social-insurance-contributions/`,
  reportFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/nain-ilmoitat-palkat-ja-tyonantajasuoritukset/`,
  reportEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/being-an-employer/how-to-report-wages-and-employers-contributions/`,
  registerFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/tyonantajarekisteri/`,
  registerEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/being-an-employer/employer-register/`,
  taxCardFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/verokorttiohjeet/`,
  unemployment: 'https://www.tyollisyysrahasto.fi/tyottomyysvakuusmaksut/tyottomyysvakuutusmaksun-maksaminen/',
  penaltyFi: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/80789/sivullisilmoittajan-laiminlyontimaksu-tulorekisteri-ilmoittamisen-velvoitteista/`,
  kela: 'https://www.kela.fi/tyonantajat-tyoterveyshuolto-korvauksen-maara',
  suomiFi: 'https://www.suomi.fi/oppaat/tyontekijan-rekrytointi/muistilista',
  suomiEn: 'https://www.suomi.fi/guides/recruiting-an-employee/checklist',
  tslFi: 'https://www.finlex.fi/fi/lainsaadanto/2001/55',
  tslEn: 'https://www.finlex.fi/en/legislation/translations/2001/eng/55',
  vllFi: 'https://www.finlex.fi/fi/lainsaadanto/2005/162',
  vllEn: 'https://www.finlex.fi/en/legislation/translations/2005/eng/162',
  tthlFi: 'https://www.finlex.fi/fi/lainsaadanto/2001/1383',
  tthlEn: 'https://www.finlex.fi/en/legislation/translations/2001/eng/1383',
};

export const ensimmainenTyontekija: Guide = {
  slug: 'ensimmainen-tyontekija',
  datePublished: '2026-10-22',
  dateModified: '2026-10-22',
  content: {
    fi: {
      title: 'Ensimmäinen työntekijä: työnantajan muistilista 2026',
      description:
        'Ensimmäisen työntekijän palkkaaminen 2026: työsopimus, verokortti, tulorekisterin määräajat, TyEL 17,10 %, työttömyysvakuutus 0,31 %, vakuutukset ja työterveys.',
      lead: 'Ensimmäinen työntekijä tekee yrityksestä työnantajan, ja velvoitteet alkavat jo ennen ensimmäistä palkkapäivää. Kokosimme yhteen, mitä työsopimuksessa pitää olla, miten ennakonpidätys ja tulorekisteri toimivat, mitkä vakuutukset on otettava, paljonko työnantajamaksut ovat vuonna 2026 ja missä pienyritykset useimmin kompastuvat.',
      body: [
        { t: 'h2', x: 'Tarkistuslista ennen ensimmäistä työpäivää' },
        { t: 'ol', items: [
          'Tee työsopimus ja anna kirjallinen selvitys työnteon keskeisistä ehdoista.',
          'Selvitä, sitooko alaasi yleissitova työehtosopimus (TES). Se ratkaisee vähimmäispalkan, lisät ja usein myös ryhmähenkivakuutuksen.',
          'Ota TyEL-vakuutus työeläkeyhtiöstä.',
          'Ota lakisääteinen tapaturmavakuutus ennen kuin työt alkavat.',
          'Tee kirjallinen sopimus työterveyshuollosta.',
          'Pyydä verokortin tiedot ja sovi palkanmaksupäivä ja palkanmaksukausi.',
          'Selvitä, pitääkö yrityksen ilmoittautua työnantajarekisteriin.',
          'Järjestä palkanlaskenta ja tulorekisteri-ilmoitukset, jotta ensimmäinen palkka menee oikein.',
        ] },
        { t: 'h2', x: 'Työsopimus: mitä siinä pitää olla' },
        { t: 'p', x: 'Työsopimuslain mukaan työsopimuksen voi tehdä suullisesti, kirjallisesti tai sähköisesti. Työnantajan on kuitenkin annettava työntekijälle kirjallinen selvitys työnteon keskeisistä ehdoista, jos ne eivät käy ilmi kirjallisesta työsopimuksesta. Käytännössä helpoin tapa on tehdä kirjallinen työsopimus, joka sisältää kaikki tiedot. Selvitystä ei tarvita, jos työaika on keskimäärin enintään kolme tuntia viikossa neljän peräkkäisen viikon aikana.' },
        { t: 'p', x: 'Selvityksestä on käytävä ilmi ainakin nämä tiedot:' },
        { t: 'ul', items: [
          'työnantaja ja työntekijä sekä heidän koti- tai liikepaikkansa',
          'työnteon alkamisajankohta ja määräaikaisessa työsopimuksessa päättymisaika sekä määräaikaisuuden peruste',
          'työntekopaikka ja pääasialliset työtehtävät',
          'palkan ja muun vastikkeen määräytymisen perusteet sekä palkanmaksukausi',
          'noudatettava työaika',
          'vuosiloman määräytyminen ja irtisanomisaika',
          'työhön sovellettava työehtosopimus',
          'koeaika, jos siitä on sovittu',
          'mahdollinen oikeus työnantajan tarjoamaan koulutukseen',
          'vakuutuslaitos, jossa työntekijän eläketurva ja tapaturmavakuutus on järjestetty',
        ] },
        { t: 'p', x: 'Osa tiedoista on annettava seitsemän päivän kuluessa ja loput kuukauden kuluessa työnteon aloittamisesta. Koeajasta voi sopia: se voi olla enintään kuusi kuukautta, ja määräaikaisessa työsuhteessa enintään puolet sopimuksen kestosta. Jos alalla on yleissitova työehtosopimus, sen ehtoja on noudatettava vähintään, eikä työsopimuksella voi sopia huonommin. Jos mikään työehtosopimus ei sido eikä palkasta ole sovittu, työntekijälle on maksettava tavanomainen ja kohtuullinen palkka.' },
        { t: 'h2', x: 'Verokortti ja ennakonpidätys' },
        { t: 'p', x: 'Työnantaja toimittaa palkasta ennakonpidätyksen työntekijän verokortin mukaan. Verokortin tiedot voi hakea palkanlaskentaohjelmaan suoraan Verohallinnosta Vero API -rajapinnan kautta, tai työntekijä toimittaa verokortin itse. Työntekijä voi myös ilmoittaa suoraan työnantajalle suuremman veroprosentin. Jos verokorttia ei saada, ennakonpidätys on 60 %.' },
        { t: 'p', x: 'Työntekijän sairausvakuutusmaksu sisältyy ennakonpidätysprosenttiin. Lisäksi palkasta peritään työntekijän osuus työeläkemaksusta (7,30 % vuonna 2026) ja työttömyysvakuutusmaksusta (0,89 % vuonna 2026). Ennakonpidätykset ja työnantajan sairausvakuutusmaksu maksetaan OmaVerossa, ja eräpäivä on palkanmaksukuukautta seuraavan kuukauden 12. päivä.' },
        { t: 'h2', x: 'Tulorekisteri: kaksi ilmoitusta ja niiden määräajat' },
        { t: 'ul', items: [
          'Palkkatietoilmoitus jokaisesta palkansaajasta 5 päivän kuluessa maksupäivästä. Maksupäivä on päivä, jolloin palkka on työntekijän käytettävissä. Jos määräpäivä osuu lauantaille, sunnuntaille tai pyhäpäivälle, ilmoituksen voi antaa seuraavana arkipäivänä.',
          'Työnantajan erillisilmoitus työnantajan sairausvakuutusmaksusta kerran kuukaudessa, viimeistään palkanmaksukuukautta seuraavan kuukauden 5. päivänä.',
          'Kaikki palkat ilmoitetaan summasta riippumatta, sillä euromääräistä alarajaa ei ole. Ilmoitus annetaan, vaikka yritys ei kuuluisi työnantajarekisteriin.',
          'Työnantajarekisteriin kuuluvan yrityksen on annettava erillisilmoitus myös kuukausilta, joilta palkkaa ei makseta (Ei palkanmaksua -tieto).',
        ] },
        { t: 'p', x: 'Myöhästyneestä ilmoituksesta määrätään myöhästymismaksu, ja jos ilmoitus jätetään kokonaan antamatta, Verohallinto voi määrätä laiminlyöntimaksun, enintään 15 000 euroa puuttuvaa ilmoitusta kohden. Jos ilmoituksia ei tule, Verohallinto arvioi palkkatiedot ja määrää verot sekä veronkorotuksen. Tulorekisterin tiedot menevät myös työeläkeyhtiölle ja Työllisyysrahastolle, jotka laskuttavat niiden perusteella.' },
        { t: 'h2', x: 'Työnantajarekisteri: milloin ilmoittautuminen on pakollinen' },
        { t: 'p', x: 'Säännöllisesti palkkaa maksavan työnantajan on aina ilmoittauduttava Verohallinnon työnantajarekisteriin. Yritys on säännöllinen työnantaja, kun se:' },
        { t: 'ul', items: [
          'maksaa vakituisesti palkkaa kahdelle tai useammalle työntekijälle,',
          'maksaa vakituisesti palkkaa yhdelle työntekijälle ja lisäksi yhdelle tai useammalle tilapäiselle tai lyhytaikaiselle työntekijälle, tai',
          'maksaa palkkaa samanaikaisesti vähintään kuudelle työntekijälle, vaikka työsuhteet olisivat tilapäisiä.',
        ] },
        { t: 'p', x: 'Kun yrityksellä on vain yksi vakituinen työntekijä tai 1–5 työntekijää, joiden työsuhde ei kestä koko kalenterivuotta, se on satunnainen työnantaja, eikä rekisteröityminen ole pakollista. Palkat ilmoitetaan tulorekisteriin silti. Satunnainen työnantaja maksaa työnantajasuoritukset aina kuukausittain, sillä pidempää verokautta se ei voi hakea. Rekisteriin ilmoittaudutaan OmaVerossa tai YTJ-muutosilmoituksella.' },
        { t: 'h2', x: 'Työnantajamaksut vuonna 2026' },
        { t: 'ul', items: [
          'Työeläkemaksu (TyEL): keskimäärin 24,40 % palkasta. Työntekijän osuus on 7,30 % kaikissa ikäryhmissä, ja työnantajalle jää keskimäärin 17,10 %. Tarkka maksu määräytyy työeläkeyhtiön mukaan.',
          'Työttömyysvakuutusmaksu: työnantajan osuus on 0,31 % palkkasumman 2 509 500 euroon asti ja sen ylittävältä osalta 1,23 %. Työntekijän osuus on 0,89 %. Maksu koskee 18–64-vuotiaita. Työnantajan oma maksuvelvollisuus alkaa, kun palkkoja maksetaan kalenterivuonna yhteensä yli 1 500 euroa, mutta työntekijän osuus pidätetään palkasta aina, myös rajan alittuessa. Työllisyysrahasto laskuttaa tulorekisterin tietojen perusteella neljä kertaa vuodessa.',
          'Työnantajan sairausvakuutusmaksu: 1,91 % palkasta (1,87 % vuonna 2025). Maksu koskee 16–67-vuotiaita työntekijöitä.',
          'Tapaturmavakuutus: maksu vaihtelee toimialan ja yrityksen mukaan, ja vakuutusyhtiö laskuttaa sen.',
          'Ryhmähenkivakuutus: maksetaan, jos työehtosopimus edellyttää sitä. Maksu laskutetaan tapaturmavakuutuksen yhteydessä.',
        ] },
        { t: 'p', x: 'Esimerkki: kun bruttopalkka on 3 000 euroa kuukaudessa, työnantaja maksaa keskimääräisellä TyEL-maksulla 513,00 euroa työeläkemaksua, 9,30 euroa työttömyysvakuutusmaksua ja 57,30 euroa sairausvakuutusmaksua. Yhteensä sivukuluja kertyy 579,60 euroa eli noin 19,3 % palkasta, ja lisäksi tulevat tapaturma- ja ryhmähenkivakuutus. Lisäksi työntekijän palkasta peritään 219,00 euroa työeläkemaksua ja 26,70 euroa työttömyysvakuutusmaksua. Ennakonpidätys lasketaan bruttopalkasta, ja työntekijän osuudet vähennetään palkasta sen lisäksi.' },
        { t: 'note', x: 'Prosentit ovat vuoden 2026 maksuja. Lähteet: Verohallinto, sosiaalivakuutusmaksut (päivitetty 8.12.2025), Työllisyysrahasto (vuoden 2026 työttömyysvakuutusmaksut) ja Eläketurvakeskus (lakisääteiset sosiaalivakuutusmaksut 2026). TyEL-maksu on keskiarvo, ja oman maksusi kertoo työeläkeyhtiö. Maksut muuttuvat vuosittain.' },
        { t: 'h2', x: 'Pakolliset vakuutukset' },
        { t: 'ul', items: [
          'TyEL-vakuutus koskee 17 vuotta täyttäneitä työntekijöitä, joiden kuukausiansio ylittää vakuuttamisvelvollisuuden alarajan. Raja on niin matala, että käytännössä lähes jokainen palkka kuuluu vakuutuksen piiriin. Eläketurva on järjestettävä viimeistään ennen kuin palkka on ilmoitettava tulorekisteriin.',
          'Tapaturmavakuutus on Verohallinnon mukaan otettava, kun palkkoja maksetaan kalenterivuodessa yhteensä yli 1 500 euroa. Vakuutuksen on oltava voimassa heti, kun työntekijä aloittaa työt.',
          'Ryhmähenkivakuutus voi tulla pakolliseksi, jos työnantajaa koskevassa työehtosopimuksessa on sovittu niin.',
        ] },
        { t: 'h2', x: 'Työterveyshuolto' },
        { t: 'p', x: 'Työnantajan on kustannuksellaan järjestettävä ennaltaehkäisevä työterveyshuolto jo ensimmäiselle työntekijälle. Työterveyshuollon palveluntuottajan kanssa tehdään kirjallinen sopimus, ja työnantajalla on oltava kirjallinen toimintasuunnitelma, joka tarkistetaan vuosittain. Sairaanhoito on vapaaehtoista.' },
        { t: 'p', x: 'Kela korvaa hakemuksesta 60 % ehkäisevän työterveyshuollon ja 50 % sairaanhoidon hyväksytyistä kustannuksista laskennalliseen enimmäismäärään asti. Korvausta haetaan jälkikäteen tilikausittain, viimeistään 6 kuukauden kuluessa tilikauden päättymisestä.' },
        { t: 'h2', x: 'Palkkalaskelma ja palkanmaksu' },
        { t: 'p', x: 'Palkka maksetaan työntekijän ilmoittamalle pankkitilille, ja sen on oltava työntekijän käytettävissä eräpäivänä. Kuukausipalkka maksetaan kerran kuukaudessa, ellei toisin sovita. Jokaisen palkanmaksun yhteydessä työntekijälle annetaan palkkalaskelma, josta käyvät ilmi palkan suuruus ja sen määräytymisen perusteet. Käytännössä laskelmassa näkyvät bruttopalkka ja lisät, luontoisedut, ennakonpidätys, työntekijän eläke- ja työttömyysvakuutusmaksu sekä nettopalkka.' },
        { t: 'h2', x: 'Vuosiloma ja lomapalkka lyhyesti' },
        { t: 'ul', items: [
          'Lomaa kertyy kaksi arkipäivää jokaiselta täydeltä lomanmääräytymiskuukaudelta, jos työsuhde on lomanmääräytymisvuoden loppuun mennessä kestänyt alle vuoden. Sen jälkeen lomaa kertyy kaksi ja puoli arkipäivää kuukaudessa. Arkipäiviä ovat myös lauantait, ja lomanmääräytymisvuosi on 1.4.–31.3.',
          'Täysi lomanmääräytymiskuukausi on kuukausi, jona työntekijälle kertyy vähintään 14 työssäolopäivää. Jos työpäiviä on harvemmin, kuukausi lasketaan täydeksi, kun työtunteja kertyy vähintään 35.',
          'Lomapalkka maksetaan ennen loman alkamista. Enintään kuuden päivän lomajakson lomapalkan saa maksaa tavallisena palkkapäivänä.',
          'Jos työntekijä ei ole viikko- tai kuukausipalkalla ja tekee työtä alle 14 päivänä kuukaudessa, lomapalkka on 9 % palkasta, tai 11,5 %, kun työsuhde on kestänyt vähintään vuoden lomanmääräytymisvuoden loppuun (31.3.) mennessä.',
          'Työsuhteen päättyessä pitämättömästä lomasta maksetaan lomakorvaus. Lomarahaa vuosilomalaki ei edellytä, vaan se perustuu yleensä työehtosopimukseen tai työsopimukseen.',
        ] },
        { t: 'h2', x: 'Yleisimmät virheet ensimmäisen työntekijän kanssa' },
        { t: 'ul', items: [
          'Työt alkavat ennen kuin tapaturmavakuutus on voimassa.',
          'Palkka maksetaan ilman verokorttia. Ilman verokorttia pidätys on 60 %, ja työntekijä joutuu odottamaan liikaa perittyä veroa takaisin.',
          'Vuoden 2025 prosentit jäävät palkkaohjelmaan. Vuonna 2026 työntekijän työttömyysvakuutusmaksu on 0,89 % (ennen 0,59 %) ja työeläkemaksu 7,30 % kaikilta.',
          'Palkkatietoilmoitus tai erillisilmoitus myöhästyy. Työnantajarekisteriin kuuluva yritys unohtaa Ei palkanmaksua -tiedon kuukaudelta, jolloin palkkaa ei maksettu.',
          'Työehtosopimusta ei tarkisteta, ja palkka, lisät tai lomaraha jäävät alle yleissitovan TES:n tason.',
          'Työterveyshuoltosopimus jää tekemättä, tai Kelan korvaus jää hakematta 6 kuukauden määräajassa.',
          'Palkka maksetaan käteisenä tai ilman palkkalaskelmaa.',
        ] },
        { t: 'h2', x: 'Me hoidamme palkanlaskennan alusta asti' },
        { t: 'p', x: 'Tilitoimisto Debit Credit auttaa yrityksiä palkkaamaan ensimmäisen työntekijän oikein: käymme työsopimuksen palkkaehdot läpi työehtosopimusta vasten, laskemme palkat vuoden 2026 maksuprosenteilla, teemme palkkalaskelmat ja tulorekisteri-ilmoitukset määräajassa sekä huolehdimme työnantajasuorituksista ja lomapalkoista. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä, niin käydään yrityksesi tilanne läpi ennen ensimmäistä palkkapäivää.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: sosiaalivakuutusmaksut 2026', href: SRC.socialFi },
          { label: 'Verohallinto: näin ilmoitat palkat ja työnantajasuoritukset', href: SRC.reportFi },
          { label: 'Verohallinto: työnantajarekisteri', href: SRC.registerFi },
          { label: 'Verohallinto: verokorttiohjeet työnantajille', href: SRC.taxCardFi },
          { label: 'Työllisyysrahasto: työttömyysvakuutusmaksun maksaminen ja vuoden 2026 maksut', href: SRC.unemployment },
          { label: 'Verohallinto: tulorekisteri-ilmoittamisen laiminlyöntimaksu', href: SRC.penaltyFi },
          { label: 'Kela: työterveyshuollon korvauksen määrä', href: SRC.kela },
          { label: 'Suomi.fi: rekrytoinnin muistilista työnantajalle', href: SRC.suomiFi },
          { label: 'Finlex: työsopimuslaki (55/2001)', href: SRC.tslFi },
          { label: 'Finlex: vuosilomalaki (162/2005)', href: SRC.vllFi },
          { label: 'Finlex: työterveyshuoltolaki (1383/2001)', href: SRC.tthlFi },
        ] },
      ],
      faq: [
        { q: 'Pitääkö työsopimus tehdä kirjallisena?', a: 'Työsopimuksen voi tehdä myös suullisesti, mutta työnantajan on annettava kirjallinen selvitys työnteon keskeisistä ehdoista, jos ne eivät käy ilmi kirjallisesta sopimuksesta. Osa tiedoista on annettava seitsemän päivän ja loput kuukauden kuluessa työn alkamisesta. Kirjallinen työsopimus on siksi yleensä selkein ratkaisu.' },
        { q: 'Pitääkö yhden työntekijän yrityksen ilmoittautua työnantajarekisteriin?', a: 'Ei välttämättä. Jos yrityksellä on vain yksi vakituinen työntekijä, se on verotuksessa satunnainen työnantaja, eikä rekisteröityminen ole pakollista. Palkat on silti ilmoitettava tulorekisteriin 5 päivän kuluessa maksupäivästä. Rekisteröityminen tulee pakolliseksi esimerkiksi silloin, kun vakituisia työntekijöitä on kaksi.' },
        { q: 'Paljonko työnantajamaksut ovat vuonna 2026?', a: 'Keskimääräinen työnantajan TyEL-maksu on 17,10 %, työttömyysvakuutusmaksu 0,31 % (yli 2 509 500 euron palkkasummasta 1,23 %) ja sairausvakuutusmaksu 1,91 %. Lisäksi maksetaan tapaturmavakuutus ja mahdollinen ryhmähenkivakuutus, joiden hinta riippuu toimialasta ja vakuutusyhtiöstä.' },
        { q: 'Mitä tapahtuu, jos työntekijä ei toimita verokorttia?', a: 'Työnantajan on silloin pidätettävä palkasta 60 %. Verokortin tiedot saa myös suoraan Verohallinnosta Vero API -rajapinnan kautta, jos palkanlaskentaohjelma tukee sitä.' },
        { q: 'Onko työterveyshuolto pakollinen jo yhdelle työntekijälle?', a: 'Kyllä. Ennaltaehkäisevä työterveyshuolto on järjestettävä jo ensimmäiselle työntekijälle, ja siitä tehdään kirjallinen sopimus palveluntuottajan kanssa. Kela korvaa hakemuksesta 60 % ehkäisevän työterveyshuollon hyväksytyistä kustannuksista.' },
      ],
    },
    ru: {
      title: 'Первый работник в Финляндии: памятка работодателю на 2026 год',
      description:
        'Первый работник в Финляндии в 2026 году: трудовой договор, налоговая карта, сроки Tulorekisteri, TyEL 17,10 %, взносы работодателя, страховки и медобслуживание.',
      lead: 'С первым работником ваша фирма становится работодателем, и обязанности начинаются ещё до первой зарплаты. Собрали в одном месте, что должно быть в трудовом договоре, как работают удержание налога и Tulorekisteri, какие страховки обязательны, сколько составляют взносы работодателя в 2026 году и где малый бизнес ошибается чаще всего.',
      body: [
        { t: 'h2', x: 'Чек-лист до первого рабочего дня' },
        { t: 'ol', items: [
          'Заключите трудовой договор (työsopimus) и дайте письменное описание основных условий работы.',
          'Проверьте, действует ли в вашей отрасли общеобязательный коллективный договор (TES). От него зависят минимальная зарплата, надбавки и часто групповое страхование жизни.',
          'Оформите пенсионное страхование TyEL в пенсионной страховой компании.',
          'Оформите обязательное страхование от несчастных случаев до начала работы.',
          'Заключите письменный договор о производственной медицине (työterveyshuolto).',
          'Получите данные налоговой карты (verokortti) и договоритесь о дне и периоде выплаты зарплаты.',
          'Выясните, нужно ли регистрироваться в реестре работодателей (työnantajarekisteri).',
          'Организуйте расчёт зарплаты и подачу сведений в Tulorekisteri, чтобы первая зарплата прошла без ошибок.',
        ] },
        { t: 'h2', x: 'Трудовой договор: что в нём должно быть' },
        { t: 'p', x: 'По закону о трудовом договоре (työsopimuslaki) договор можно заключить устно, письменно или электронно. Но работодатель обязан дать работнику письменное описание основных условий работы, если их нет в письменном договоре. Проще всего сразу составить письменный договор со всеми сведениями. Описание не требуется, если работник трудится в среднем не более трёх часов в неделю за четыре недели подряд.' },
        { t: 'p', x: 'В описании должны быть как минимум:' },
        { t: 'ul', items: [
          'работодатель и работник, их место жительства или место деятельности',
          'дата начала работы, а для срочного договора — дата окончания и основание срочности',
          'место работы и основные обязанности',
          'основания расчёта зарплаты и других вознаграждений, период выплаты зарплаты',
          'рабочее время',
          'порядок определения отпуска и срок предупреждения об увольнении',
          'применяемый коллективный договор',
          'испытательный срок, если о нём договорились',
          'возможное право на обучение, которое предоставляет работодатель',
          'страховая организация, в которой оформлены пенсионное страхование и страховка от несчастных случаев',
        ] },
        { t: 'p', x: 'Часть сведений нужно дать в течение семи дней, остальные — в течение месяца с начала работы. Можно договориться об испытательном сроке: не длиннее шести месяцев, а в срочном договоре — не больше половины его срока. Если в отрасли есть общеобязательный коллективный договор, его условия — это минимум, и договориться о худших условиях нельзя. Если никакой коллективный договор не применяется и зарплата не оговорена, работнику положена обычная и разумная зарплата.' },
        { t: 'h2', x: 'Налоговая карта и удержание налога' },
        { t: 'p', x: 'Работодатель удерживает из зарплаты аванс налога (ennakonpidätys) по налоговой карте работника. Данные налоговой карты программа расчёта зарплаты может получать напрямую из налоговой через интерфейс Vero API, либо работник передаёт карту сам. Работник вправе сообщить работодателю более высокий процент. Если налоговой карты нет, удерживается 60 %.' },
        { t: 'p', x: 'Взнос работника по медицинскому страхованию уже входит в процент удержания. Кроме того, из зарплаты удерживаются доля работника в пенсионном взносе (7,30 % в 2026 году) и в страховании от безработицы (0,89 % в 2026 году). Удержанный налог и взнос работодателя по медицинскому страхованию платятся в OmaVero, срок — 12-е число месяца, следующего за месяцем выплаты.' },
        { t: 'h2', x: 'Tulorekisteri: два отчёта и их сроки' },
        { t: 'ul', items: [
          'Отчёт о зарплате (palkkatietoilmoitus) по каждому работнику — в течение 5 дней с даты выплаты. Дата выплаты — день, когда деньги доступны работнику. Если срок выпадает на субботу, воскресенье или праздник, отчёт можно подать в следующий рабочий день.',
          'Отдельный отчёт работодателя (työnantajan erillisilmoitus) о взносе по медицинскому страхованию — раз в месяц, не позднее 5-го числа месяца, следующего за месяцем выплаты.',
          'Сообщаются все зарплаты независимо от суммы: минимального порога нет. Отчёт подаётся, даже если фирма не состоит в реестре работодателей.',
          'Фирма из реестра работодателей подаёт отдельный отчёт и за месяцы без зарплаты (отметка Ei palkanmaksua).',
        ] },
        { t: 'p', x: 'За опоздание начисляется плата за просрочку (myöhästymismaksu), а если отчёт не подан вовсе, налоговая может назначить штраф (laiminlyöntimaksu) до 15 000 евро за каждый отсутствующий отчёт. Если отчётов нет, налоговая сама оценивает зарплаты и назначает налоги с надбавкой. Данные Tulorekisteri получают также пенсионная компания и Työllisyysrahasto, которые выставляют по ним счета.' },
        { t: 'h2', x: 'Реестр работодателей: когда регистрация обязательна' },
        { t: 'p', x: 'Работодатель, который платит зарплату регулярно, обязан зарегистрироваться в реестре работодателей налоговой. Фирма считается регулярным работодателем, если она:' },
        { t: 'ul', items: [
          'постоянно платит зарплату двум или более работникам,',
          'постоянно платит зарплату одному работнику и ещё одному или нескольким временным или краткосрочным, или',
          'одновременно платит зарплату не менее чем шести работникам, даже если все они временные.',
        ] },
        { t: 'p', x: 'Если у фирмы только один постоянный работник или 1–5 работников, чьи трудовые отношения длятся меньше календарного года, она считается нерегулярным работодателем, и регистрация не обязательна. Зарплаты всё равно сообщаются в Tulorekisteri. Нерегулярный работодатель всегда платит налоги и взносы помесячно: более длинный налоговый период ему недоступен. Зарегистрироваться можно в OmaVero или через изменение данных в YTJ.' },
        { t: 'h2', x: 'Взносы работодателя в 2026 году' },
        { t: 'ul', items: [
          'Пенсионный взнос (TyEL): в среднем 24,40 % от зарплаты. Доля работника — 7,30 % для всех возрастов, на работодателя приходится в среднем 17,10 %. Точный процент называет ваша пенсионная компания.',
          'Взнос по страхованию от безработицы: доля работодателя — 0,31 % от фонда оплаты труда до 2 509 500 евро и 1,23 % сверх этой суммы. Доля работника — 0,89 %. Взнос платится за работников 18–64 лет. Собственная доля работодателя возникает, если за календарный год выплачено больше 1 500 евро зарплаты, а долю работника удерживают из зарплаты всегда, даже ниже этого порога. Työllisyysrahasto выставляет счёт по данным Tulorekisteri четыре раза в год.',
          'Взнос работодателя по медицинскому страхованию: 1,91 % от зарплаты (1,87 % в 2025 году), за работников 16–67 лет.',
          'Страхование от несчастных случаев: взнос зависит от отрасли и фирмы, счёт выставляет страховая компания.',
          'Групповое страхование жизни: платится, если этого требует коллективный договор, обычно одним счётом со страховкой от несчастных случаев.',
        ] },
        { t: 'p', x: 'Пример: при зарплате брутто 3 000 евро в месяц работодатель при среднем взносе TyEL платит 513,00 евро пенсионного взноса, 9,30 евро взноса по безработице и 57,30 евро медицинского взноса. Итого 579,60 евро, то есть около 19,3 % от зарплаты, плюс страхование от несчастных случаев и групповое страхование жизни. Кроме того, из зарплаты работника удерживается 219,00 евро пенсионного взноса и 26,70 евро взноса по безработице. Аванс налога считается с зарплаты брутто, а доли работника вычитаются дополнительно.' },
        { t: 'note', x: 'Проценты — ставки 2026 года. Источники: налоговая Verohallinto, социальные страховые взносы (обновлено 8.12.2025), Työllisyysrahasto (взносы по безработице 2026) и Eläketurvakeskus (обязательные социальные взносы 2026). Ставка TyEL — средняя, ваш процент сообщит пенсионная компания. Ставки меняются ежегодно.' },
        { t: 'h2', x: 'Обязательные страховки' },
        { t: 'ul', items: [
          'Пенсионное страхование TyEL оформляется на работников от 17 лет, чей месячный заработок выше минимального порога. Порог настолько низкий, что под страхование попадает практически любая зарплата. Страхование нужно оформить не позднее, чем зарплату надо сообщить в Tulorekisteri.',
          'По данным налоговой, страхование от несчастных случаев обязательно, если за календарный год выплачивается больше 1 500 евро зарплаты. Оно должно действовать с первого дня работы.',
          'Групповое страхование жизни становится обязательным, если это предусмотрено коллективным договором, который распространяется на работодателя.',
        ] },
        { t: 'h2', x: 'Производственная медицина (työterveyshuolto)' },
        { t: 'p', x: 'Работодатель обязан за свой счёт организовать профилактическую производственную медицину уже для первого работника. С поставщиком услуг заключается письменный договор, а у работодателя должен быть письменный план действий, который пересматривается ежегодно. Лечение в рамках производственной медицины — добровольное.' },
        { t: 'p', x: 'Kela по заявлению возмещает 60 % одобренных расходов на профилактику и 50 % расходов на лечение — в пределах расчётного максимума. Возмещение запрашивают задним числом за финансовый год, не позднее 6 месяцев после его окончания.' },
        { t: 'h2', x: 'Расчётный листок и выплата зарплаты' },
        { t: 'p', x: 'Зарплата перечисляется на банковский счёт, указанный работником, и должна быть доступна в день выплаты. Месячная зарплата выплачивается раз в месяц, если не договорились иначе. При каждой выплате работник получает расчётный листок (palkkalaskelma), в котором видны сумма зарплаты и основания её расчёта. На практике в нём указывают зарплату брутто и надбавки, натуральные льготы, удержанный налог, взносы работника и сумму к выплате.' },
        { t: 'h2', x: 'Отпуск и отпускные коротко' },
        { t: 'ul', items: [
          'За каждый полный месяц накопления отпуска работник получает два будних дня отпуска (включая субботы), если к концу года накопления трудовые отношения длились меньше года. Потом — два с половиной будних дня в месяц. Год накопления отпуска длится с 1.4 по 31.3.',
          'Полный месяц накопления — это месяц, в котором у работника не менее 14 отработанных дней. Если работа реже, месяц считается полным при не менее чем 35 рабочих часах.',
          'Отпускные выплачиваются до начала отпуска. За отпуск до шести дней их можно выплатить в обычный день зарплаты.',
          'Если работник не на недельной или месячной ставке и работает меньше 14 дней в месяц, отпускные составляют 9 % от зарплаты, а если к концу года накопления отпуска (31.3) трудовые отношения длились не меньше года — 11,5 %.',
          'При увольнении за неиспользованный отпуск выплачивается компенсация (lomakorvaus). Отпускную премию (lomaraha) закон об отпусках не требует — она обычно следует из коллективного или трудового договора.',
        ] },
        { t: 'h2', x: 'Частые ошибки с первым работником' },
        { t: 'ul', items: [
          'Работа начинается до того, как вступила в силу страховка от несчастных случаев.',
          'Зарплата выплачивается без налоговой карты: удержание 60 %, и работник долго ждёт возврата переплаты.',
          'В программе остались проценты 2025 года. В 2026 году взнос работника по безработице — 0,89 % (было 0,59 %), а пенсионный — 7,30 % для всех.',
          'Отчёт о зарплате или отдельный отчёт работодателя подан с опозданием. Фирма из реестра забывает отметку Ei palkanmaksua за месяц без зарплаты.',
          'Не проверен коллективный договор, и зарплата, надбавки или отпускная премия ниже уровня общеобязательного TES.',
          'Не заключён договор о производственной медицине или упущен 6-месячный срок для возмещения от Kela.',
          'Зарплата выдаётся наличными или без расчётного листка.',
        ] },
        { t: 'h2', x: 'Мы ведём расчёт зарплаты с первого работника' },
        { t: 'p', x: 'Tilitoimisto Debit Credit помогает правильно нанять первого работника: проверим условия оплаты в трудовом договоре по коллективному договору, рассчитаем зарплату по ставкам 2026 года, подготовим расчётные листки и отчёты в Tulorekisteri в срок, проследим за налогами, взносами и отпускными. Работаем на русском и финском. Свяжитесь с нами — разберём ситуацию вашей фирмы до первой зарплаты.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: социальные страховые взносы 2026 (на английском)', href: SRC.socialEn },
          { label: 'Vero: как сообщать зарплаты и платежи работодателя (на английском)', href: SRC.reportEn },
          { label: 'Vero: реестр работодателей (на английском)', href: SRC.registerEn },
          { label: 'Vero: налоговые карты — инструкция для работодателей (на финском)', href: SRC.taxCardFi },
          { label: 'Työllisyysrahasto: взносы по безработице 2026 (на финском)', href: SRC.unemployment },
          { label: 'Vero: штраф за неподачу сведений в Tulorekisteri (на финском)', href: SRC.penaltyFi },
          { label: 'Kela: возмещение расходов на производственную медицину (на финском)', href: SRC.kela },
          { label: 'Suomi.fi: памятка работодателю по найму (на английском)', href: SRC.suomiEn },
          { label: 'Finlex: закон о трудовом договоре (на английском)', href: SRC.tslEn },
          { label: 'Finlex: закон о ежегодном отпуске (на английском)', href: SRC.vllEn },
          { label: 'Finlex: закон о производственной медицине (на английском)', href: SRC.tthlEn },
        ] },
      ],
      faq: [
        { q: 'Обязательно ли заключать трудовой договор письменно?', a: 'Договор можно заключить и устно, но работодатель обязан дать письменное описание основных условий работы, если их нет в письменном договоре. Часть сведений — в течение семи дней, остальные — в течение месяца с начала работы. Поэтому проще всего сразу оформить письменный договор.' },
        { q: 'Нужно ли фирме с одним работником регистрироваться в реестре работодателей?', a: 'Не обязательно. Если у фирмы только один постоянный работник, для налоговой она нерегулярный работодатель, и регистрация не требуется. Зарплаты всё равно нужно сообщать в Tulorekisteri в течение 5 дней с даты выплаты. Регистрация становится обязательной, например, когда постоянных работников двое.' },
        { q: 'Сколько составляют взносы работодателя в 2026 году?', a: 'Средний взнос работодателя TyEL — 17,10 %, взнос по безработице — 0,31 % (с фонда оплаты труда сверх 2 509 500 евро — 1,23 %), медицинский взнос — 1,91 %. Плюс страхование от несчастных случаев и, при необходимости, групповое страхование жизни: их цена зависит от отрасли и страховой компании.' },
        { q: 'Что если работник не принёс налоговую карту?', a: 'Тогда работодатель обязан удержать из зарплаты 60 %. Данные налоговой карты можно также получать напрямую из налоговой через Vero API, если это поддерживает программа расчёта зарплаты.' },
        { q: 'Обязательна ли производственная медицина уже для одного работника?', a: 'Да. Профилактическую производственную медицину нужно организовать уже для первого работника и заключить письменный договор с поставщиком услуг. Kela по заявлению возмещает 60 % одобренных расходов на профилактику.' },
      ],
    },
    en: {
      title: 'Your first employee in Finland: an employer’s checklist for 2026',
      description:
        'Hiring your first employee in Finland in 2026: employment contract, tax card, Incomes Register deadlines, TyEL 17.10%, insurance and occupational health care.',
      lead: 'Your first employee turns your company into an employer, and the obligations start before the first payday. We have put together what the employment contract must contain, how withholding and the Incomes Register work, which insurance policies are mandatory, what employer contributions cost in 2026 and where small businesses most often go wrong.',
      body: [
        { t: 'h2', x: 'Checklist before the first working day' },
        { t: 'ol', items: [
          'Make an employment contract and give a written statement of the key terms of employment.',
          'Check whether a generally binding collective agreement (TES) covers your industry. It sets the minimum pay, supplements and often group life insurance.',
          'Take out TyEL pension insurance with an earnings-related pension company.',
          'Take out statutory accident insurance before work begins.',
          'Make a written agreement on occupational health care.',
          'Get the tax card details and agree on the payday and pay period.',
          'Find out whether the company must register in the employer register.',
          'Set up payroll and Incomes Register reporting so that the first salary is paid correctly.',
        ] },
        { t: 'h2', x: 'Employment contract: what it must contain' },
        { t: 'p', x: 'Under the Employment Contracts Act, a contract can be made orally, in writing or electronically. The employer must still give the employee a written statement of the key terms of employment if they are not in a written contract. The easiest way is a written contract that covers everything. No statement is needed if the working time averages three hours a week or less over four consecutive weeks.' },
        { t: 'p', x: 'The statement must include at least:' },
        { t: 'ul', items: [
          'the employer and the employee and their domicile or place of business',
          'the start date and, for a fixed-term contract, the end date and the reason for the fixed term',
          'the place of work and the main duties',
          'the basis for pay and other remuneration and the pay period',
          'the working time',
          'how annual leave is determined and the notice period',
          'the applicable collective agreement',
          'the trial period, if one has been agreed',
          'any right to training provided by the employer',
          'the insurer that provides the employee’s pension and accident insurance',
        ] },
        { t: 'p', x: 'Part of the information must be given within seven days and the rest within a month of the start of work. A trial period can be agreed: up to six months, and in a fixed-term contract no more than half of its duration. If a generally binding collective agreement covers the industry, its terms are the minimum, and the contract cannot agree on worse terms. If no collective agreement applies and pay has not been agreed, the employee must be paid a customary and reasonable wage.' },
        { t: 'h2', x: 'Tax card and withholding' },
        { t: 'p', x: 'The employer withholds tax from the salary according to the employee’s tax card. Payroll software can fetch the tax card details directly from the Tax Administration through the Vero API, or the employee hands over the tax card. The employee may also tell the employer to use a higher rate. If there is no tax card, the withholding is 60%.' },
        { t: 'p', x: 'The employee’s health insurance contribution is already included in the withholding rate. In addition, the employee’s share of the pension contribution (7.30% in 2026) and of the unemployment insurance contribution (0.89% in 2026) is deducted from the salary. Withholdings and the employer’s health insurance contribution are paid in MyTax (OmaVero) by the 12th day of the month after the payment month.' },
        { t: 'h2', x: 'Incomes Register: two reports and their deadlines' },
        { t: 'ul', items: [
          'An earnings payment report for each employee within 5 days of the payment date. The payment date is the day the salary is available to the employee. If the deadline falls on a Saturday, Sunday or public holiday, you can report on the next working day.',
          'An employer’s separate report on the employer’s health insurance contribution once a month, by the 5th day of the month after the payment month.',
          'All wages are reported whatever the amount: there is no euro threshold. The report is filed even if the company is not in the employer register.',
          'A company in the employer register must file the separate report also for months with no wages paid (the “No wages payable” entry).',
        ] },
        { t: 'p', x: 'Late reports incur a late-filing fee, and if a report is not filed at all, the Tax Administration can impose a negligence penalty of up to €15,000 per missing report. If no reports arrive, the Tax Administration estimates the wages and imposes the taxes and a tax increase. Incomes Register data also goes to the pension company and the Employment Fund, which invoice on that basis.' },
        { t: 'h2', x: 'Employer register: when registration is mandatory' },
        { t: 'p', x: 'A regular employer must always register in the Tax Administration’s employer register. A company is a regular employer when it:' },
        { t: 'ul', items: [
          'pays wages on a permanent basis to two or more employees,',
          'pays wages on a permanent basis to one employee and also to one or more temporary or short-term employees, or',
          'pays wages to at least six employees at the same time, even if all of them are temporary.',
        ] },
        { t: 'p', x: 'A company with only one permanent employee, or with 1–5 employees whose employment does not last the whole calendar year, is an occasional employer and does not have to register. Wages are still reported to the Incomes Register. An occasional employer always pays employer contributions monthly, as it cannot apply for a longer tax period. You register in MyTax or with a change notification in the YTJ.' },
        { t: 'h2', x: 'Employer contributions in 2026' },
        { t: 'ul', items: [
          'Pension contribution (TyEL): on average 24.40% of the salary. The employee share is 7.30% for all age groups, leaving the employer an average of 17.10%. Your exact rate comes from your pension company.',
          'Unemployment insurance contribution: the employer pays 0.31% of the payroll up to €2,509,500 and 1.23% on the part above it. The employee share is 0.89%. It applies to employees aged 18–64. The employer’s own obligation starts when the wages paid in a calendar year exceed €1,500 in total, but the employee share is always withheld from pay, even below that limit. The Employment Fund (Työllisyysrahasto) invoices four times a year based on Incomes Register data.',
          'Employer’s health insurance contribution: 1.91% of the salary (1.87% in 2025), for employees aged 16–67.',
          'Accident insurance: the premium varies by industry and company and is invoiced by the insurer.',
          'Group life insurance: paid if the collective agreement requires it, usually invoiced together with the accident insurance.',
        ] },
        { t: 'p', x: 'Example: on a gross salary of €3,000 a month, with the average TyEL rate the employer pays €513.00 in pension contributions, €9.30 in unemployment insurance and €57.30 in health insurance. That is €579.60, about 19.3% of the salary, plus accident and group life insurance. In addition, €219.00 in pension contributions and €26.70 in unemployment insurance are deducted from the employee’s salary. Tax is withheld from the gross salary, and the employee’s shares are deducted on top of that.' },
        { t: 'note', x: 'The percentages are the 2026 rates. Sources: Tax Administration, social insurance contributions (updated 8 December 2025), the Employment Fund (2026 unemployment insurance contributions) and the Finnish Centre for Pensions (statutory social insurance contributions 2026). The TyEL rate is an average; your pension company tells you your own rate. Rates change every year.' },
        { t: 'h2', x: 'Mandatory insurance' },
        { t: 'ul', items: [
          'TyEL insurance covers employees aged 17 or over whose monthly earnings exceed the lower limit of the insurance obligation. The limit is so low that practically every salary is covered. Pension cover must be arranged at the latest before the wages must be reported to the Incomes Register.',
          'According to the Tax Administration, accident insurance is required if you pay more than €1,500 in wages in a calendar year. It must be in force from the moment the employee starts work.',
          'Group life insurance can become mandatory if the collective agreement that applies to the employer requires it.',
        ] },
        { t: 'h2', x: 'Occupational health care' },
        { t: 'p', x: 'The employer must arrange preventive occupational health care at its own expense, already for the first employee. A written agreement is made with the service provider, and the employer must have a written action plan that is reviewed every year. Medical care on top of that is voluntary.' },
        { t: 'p', x: 'On application, Kela reimburses 60% of the approved costs of preventive occupational health care and 50% of medical care, up to a calculated maximum. The reimbursement is claimed afterwards for each financial period, within 6 months of the end of the period.' },
        { t: 'h2', x: 'Pay slip and paying the salary' },
        { t: 'p', x: 'The salary is paid to the bank account given by the employee and must be available on the due date. A monthly salary is paid once a month unless agreed otherwise. With every payment the employee gets a pay slip showing the amount of pay and how it was determined. In practice the slip shows the gross salary and supplements, benefits in kind, the tax withheld, the employee’s pension and unemployment contributions and the net pay.' },
        { t: 'h2', x: 'Annual leave and holiday pay in brief' },
        { t: 'ul', items: [
          'Leave accrues at two weekdays (Mon–Sat) for each full accrual month if the employment has lasted less than a year by the end of the holiday credit year. After that it is two and a half weekdays a month. The holiday credit year runs from 1 April to 31 March.',
          'A full accrual month is a month with at least 14 working days. If the employee works on fewer days, a month counts as full with at least 35 working hours.',
          'Holiday pay is paid before the leave starts. For a leave period of up to six days it can be paid on the normal payday.',
          'If the employee is not on a weekly or monthly salary and works fewer than 14 days a month, holiday pay is 9% of wages, or 11.5% if the employment has lasted at least a year by the end of the holiday credit year (31 March).',
          'When employment ends, unused leave is paid as holiday compensation. The Annual Holidays Act does not require a holiday bonus (lomaraha); it usually comes from the collective agreement or the employment contract.',
        ] },
        { t: 'h2', x: 'Common mistakes with a first employee' },
        { t: 'ul', items: [
          'Work starts before the accident insurance is in force.',
          'Salary is paid without a tax card: 60% is withheld and the employee waits for the excess tax to come back.',
          'The 2025 rates stay in the payroll software. In 2026 the employee’s unemployment contribution is 0.89% (previously 0.59%) and the pension contribution is 7.30% for everyone.',
          'The earnings payment report or the separate report is late. A company in the employer register forgets the “No wages payable” entry for a month without pay.',
          'The collective agreement is not checked, and pay, supplements or the holiday bonus fall below the generally binding TES.',
          'No occupational health care agreement is made, or the Kela reimbursement is not claimed within 6 months.',
          'The salary is paid in cash or without a pay slip.',
        ] },
        { t: 'h2', x: 'We run payroll from your first employee' },
        { t: 'p', x: 'Tilitoimisto Debit Credit helps companies hire their first employee correctly: we check the pay terms of the contract against the collective agreement, calculate salaries with the 2026 rates, prepare pay slips and Incomes Register reports on time, and take care of employer contributions and holiday pay. We work in Finnish and Russian. Get in touch and we will go through your company’s situation before the first payday.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Vero: social insurance contributions 2026', href: SRC.socialEn },
          { label: 'Vero: how to report wages and employer contributions', href: SRC.reportEn },
          { label: 'Vero: employer register', href: SRC.registerEn },
          { label: 'Vero: tax card instructions for employers (in Finnish)', href: SRC.taxCardFi },
          { label: 'Employment Fund: 2026 unemployment insurance contributions (in Finnish)', href: SRC.unemployment },
          { label: 'Vero: negligence penalty for Incomes Register reporting (in Finnish)', href: SRC.penaltyFi },
          { label: 'Kela: occupational health care reimbursement (in Finnish)', href: SRC.kela },
          { label: 'Suomi.fi: recruitment checklist for employers', href: SRC.suomiEn },
          { label: 'Finlex: Employment Contracts Act (55/2001)', href: SRC.tslEn },
          { label: 'Finlex: Annual Holidays Act (162/2005)', href: SRC.vllEn },
          { label: 'Finlex: Occupational Health Care Act (1383/2001)', href: SRC.tthlEn },
        ] },
      ],
      faq: [
        { q: 'Does the employment contract have to be in writing?', a: 'A contract can also be made orally, but the employer must give a written statement of the key terms if they are not in a written contract. Part of the information is due within seven days and the rest within a month of the start of work. A written contract is therefore usually the clearest option.' },
        { q: 'Does a company with one employee have to join the employer register?', a: 'Not necessarily. With only one permanent employee, the company is an occasional employer for tax purposes and registration is not mandatory. Wages must still be reported to the Incomes Register within 5 days of the payment date. Registration becomes mandatory, for example, once there are two permanent employees.' },
        { q: 'How much are employer contributions in 2026?', a: 'The average employer TyEL contribution is 17.10%, the unemployment insurance contribution 0.31% (1.23% on payroll above €2,509,500) and the health insurance contribution 1.91%. On top come accident insurance and possibly group life insurance, priced by industry and insurer.' },
        { q: 'What if the employee does not provide a tax card?', a: 'The employer must then withhold 60% of the salary. Tax card details can also be fetched directly from the Tax Administration through the Vero API if your payroll software supports it.' },
        { q: 'Is occupational health care mandatory for just one employee?', a: 'Yes. Preventive occupational health care must be arranged already for the first employee, with a written agreement with the service provider. On application, Kela reimburses 60% of the approved costs of preventive care.' },
      ],
    },
    et: {
      title: 'Esimene töötaja Soomes: tööandja meelespea 2026',
      description:
        'Esimese töötaja palkamine Soomes 2026: tööleping, maksukaart, Tulorekisteri tähtajad, TyEL 17,10 %, tööandja maksed, kindlustused ja töötervishoid.',
      lead: 'Esimese töötajaga saab sinu ettevõttest tööandja ja kohustused algavad juba enne esimest palgapäeva. Panime kokku, mis peab olema töölepingus, kuidas toimivad tulumaksu kinnipidamine ja Tulorekisteri, millised kindlustused on kohustuslikud, kui suured on tööandja maksed 2026. aastal ja kus väikeettevõtted kõige sagedamini eksivad.',
      body: [
        { t: 'h2', x: 'Kontrollnimekiri enne esimest tööpäeva' },
        { t: 'ol', items: [
          'Sõlmi tööleping (työsopimus) ja anna kirjalik ülevaade töö peamistest tingimustest.',
          'Selgita välja, kas sinu tegevusala kohta kehtib üldsiduv kollektiivleping (TES). See määrab miinimumpalga, lisatasud ja sageli ka grupielukindlustuse.',
          'Sõlmi TyEL-pensionikindlustus pensionikindlustusseltsis.',
          'Sõlmi kohustuslik õnnetusjuhtumikindlustus enne töö algust.',
          'Sõlmi kirjalik töötervishoiu (työterveyshuolto) leping.',
          'Hangi maksukaardi (verokortti) andmed ning lepi kokku palgapäev ja palgaperiood.',
          'Selgita välja, kas ettevõte peab registreeruma tööandjate registris (työnantajarekisteri).',
          'Korralda palgaarvestus ja Tulorekisteri teated, et esimene palk läheks õigesti.',
        ] },
        { t: 'h2', x: 'Tööleping: mis selles peab olema' },
        { t: 'p', x: 'Soome töölepinguseaduse (työsopimuslaki) järgi võib lepingu sõlmida suuliselt, kirjalikult või elektrooniliselt. Tööandja peab siiski andma töötajale kirjaliku ülevaate töö peamistest tingimustest, kui need ei ole kirjas kirjalikus lepingus. Lihtsaim on teha kohe kirjalik leping, kus on kõik andmed. Ülevaadet pole vaja, kui tööaeg on nelja järjestikuse nädala jooksul keskmiselt kuni kolm tundi nädalas.' },
        { t: 'p', x: 'Ülevaates peavad olema vähemalt:' },
        { t: 'ul', items: [
          'tööandja ja töötaja ning nende elu- või tegevuskoht',
          'töö alguse aeg ning tähtajalise lepingu korral lõppaeg ja tähtajalisuse põhjus',
          'töökoht ja peamised tööülesanded',
          'palga ja muu tasu määramise alused ning palgaperiood',
          'kehtiv tööaeg',
          'puhkuse määramine ja etteteatamisaeg',
          'tööle kohaldatav kollektiivleping',
          'katseaeg, kui selles on kokku lepitud',
          'võimalik õigus tööandja pakutavale koolitusele',
          'kindlustusasutus, kus on korraldatud töötaja pensionikindlustus ja õnnetusjuhtumikindlustus',
        ] },
        { t: 'p', x: 'Osa andmetest tuleb anda seitsme päeva ja ülejäänud kuu jooksul töö algusest. Katseajas võib kokku leppida: see võib olla kuni kuus kuud ja tähtajalise lepingu korral kuni pool lepingu kestusest. Kui tegevusalal kehtib üldsiduv kollektiivleping, on selle tingimused miinimum ja halvemates tingimustes kokku leppida ei saa. Kui ükski kollektiivleping ei kehti ja palgas pole kokku lepitud, tuleb maksta tavapärast ja mõistlikku palka.' },
        { t: 'h2', x: 'Maksukaart ja kinnipidamine' },
        { t: 'p', x: 'Tööandja peab palgast kinni maksu ettemaksu (ennakonpidätys) töötaja maksukaardi järgi. Maksukaardi andmed saab palgatarkvara otse Soome maksuametist Vero API liidese kaudu või annab töötaja maksukaardi ise. Töötaja võib tööandjale teatada ka kõrgema protsendi. Kui maksukaarti ei ole, peetakse kinni 60 %.' },
        { t: 'p', x: 'Töötaja ravikindlustusmakse sisaldub juba kinnipidamise protsendis. Lisaks peetakse palgast kinni töötaja osa pensionimaksest (2026. aastal 7,30 %) ja töötuskindlustusmaksest (2026. aastal 0,89 %). Kinnipeetud maks ja tööandja ravikindlustusmakse makstakse OmaVero kaudu hiljemalt palgamaksmise kuule järgneva kuu 12. kuupäevaks.' },
        { t: 'h2', x: 'Tulorekisteri: kaks teadet ja nende tähtajad' },
        { t: 'ul', items: [
          'Palgateade (palkkatietoilmoitus) iga töötaja kohta 5 päeva jooksul maksepäevast. Maksepäev on päev, mil palk on töötajale kättesaadav. Kui tähtaeg langeb laupäevale, pühapäevale või pühale, võib teate esitada järgmisel tööpäeval.',
          'Tööandja eraldi teade (työnantajan erillisilmoitus) tööandja ravikindlustusmakse kohta kord kuus, hiljemalt palgamaksmise kuule järgneva kuu 5. kuupäeval.',
          'Teatatakse kõik palgad summast olenemata: eurodes alampiiri ei ole. Teade esitatakse ka siis, kui ettevõte ei ole tööandjate registris.',
          'Tööandjate registris olev ettevõte peab esitama eraldi teate ka kuude kohta, mil palka ei makstud (märge Ei palkanmaksua).',
        ] },
        { t: 'p', x: 'Hilinenud teate eest määratakse hilinemistasu (myöhästymismaksu) ja kui teade jääb üldse esitamata, võib maksuamet määrata hooletustasu (laiminlyöntimaksu) kuni 15 000 eurot iga puuduva teate kohta. Kui teateid ei tule, hindab maksuamet palgad ise ning määrab maksud ja maksutõusu. Tulorekisteri andmed lähevad ka pensionikindlustusseltsile ja töötuskindlustusfondile Työllisyysrahasto, kes esitavad nende põhjal arved.' },
        { t: 'h2', x: 'Tööandjate register: millal on registreerimine kohustuslik' },
        { t: 'p', x: 'Regulaarselt palka maksev tööandja peab alati registreeruma maksuameti tööandjate registris. Ettevõte on regulaarne tööandja, kui ta:' },
        { t: 'ul', items: [
          'maksab alaliselt palka kahele või enamale töötajale,',
          'maksab alaliselt palka ühele töötajale ja lisaks ühele või mitmele ajutisele või lühiajalisele töötajale, või',
          'maksab korraga palka vähemalt kuuele töötajale, isegi kui nende töösuhted on ajutised.',
        ] },
        { t: 'p', x: 'Kui ettevõttel on ainult üks alaline töötaja või 1–5 töötajat, kelle töösuhe ei kesta terve kalendriaasta, on ta juhuslik tööandja ja registreerimine ei ole kohustuslik. Palgad teatatakse Tulorekisterisse ikkagi. Juhuslik tööandja maksab tööandja makseid alati igakuiselt, sest pikemat maksuperioodi ta taotleda ei saa. Registreeruda saab OmaVeros või YTJ muudatusteatega.' },
        { t: 'h2', x: 'Tööandja maksed 2026. aastal' },
        { t: 'ul', items: [
          'Pensionimakse (TyEL): keskmiselt 24,40 % palgast. Töötaja osa on kõigis vanuserühmades 7,30 %, tööandjale jääb keskmiselt 17,10 %. Täpse protsendi ütleb sinu pensionikindlustusselts.',
          'Töötuskindlustusmakse: tööandja osa on 0,31 % palgafondist kuni 2 509 500 euroni ja seda ületavalt osalt 1,23 %. Töötaja osa on 0,89 %. Makse kehtib 18–64-aastastele töötajatele. Tööandja enda maksekohustus tekib, kui kalendriaasta jooksul makstakse palka kokku üle 1 500 euro, kuid töötaja osa peetakse palgast kinni alati, ka allpool seda piiri. Työllisyysrahasto esitab Tulorekisteri andmete põhjal arve neli korda aastas.',
          'Tööandja ravikindlustusmakse: 1,91 % palgast (2025. aastal 1,87 %), 16–67-aastaste töötajate eest.',
          'Õnnetusjuhtumikindlustus: makse sõltub tegevusalast ja ettevõttest, arve esitab kindlustusselts.',
          'Grupielukindlustus: makstakse, kui kollektiivleping seda nõuab, tavaliselt koos õnnetusjuhtumikindlustuse arvega.',
        ] },
        { t: 'p', x: 'Näide: kui brutopalk on 3 000 eurot kuus, maksab tööandja keskmise TyEL-määraga 513,00 eurot pensionimakset, 9,30 eurot töötuskindlustusmakset ja 57,30 eurot ravikindlustusmakset. Kokku 579,60 eurot ehk umbes 19,3 % palgast, lisaks õnnetusjuhtumi- ja grupielukindlustus. Lisaks peetakse töötaja palgast kinni 219,00 eurot pensionimakset ja 26,70 eurot töötuskindlustusmakset. Maksu ettemaks arvutatakse brutopalgast ja töötaja osad peetakse kinni selle kõrval.' },
        { t: 'note', x: 'Protsendid on 2026. aasta määrad. Allikad: Soome maksuamet, sotsiaalkindlustusmaksed (uuendatud 8.12.2025), Työllisyysrahasto (2026. aasta töötuskindlustusmaksed) ja Eläketurvakeskus (seadusjärgsed sotsiaalkindlustusmaksed 2026). TyEL-määr on keskmine, sinu enda määra ütleb pensionikindlustusselts. Määrad muutuvad igal aastal.' },
        { t: 'h2', x: 'Kohustuslikud kindlustused' },
        { t: 'ul', items: [
          'TyEL-kindlustus kehtib vähemalt 17-aastastele töötajatele, kelle kuutulu ületab kindlustamiskohustuse alampiiri. Piir on nii madal, et praktiliselt iga palk kuulub kindlustuse alla. Pensionikindlustus tuleb korraldada hiljemalt enne, kui palk tuleb Tulorekisterisse teatada.',
          'Maksuameti andmetel on õnnetusjuhtumikindlustus kohustuslik, kui kalendriaastas makstakse palka kokku üle 1 500 euro. See peab kehtima kohe, kui töötaja tööd alustab.',
          'Grupielukindlustus võib muutuda kohustuslikuks, kui tööandjale kehtivas kollektiivlepingus on nii kokku lepitud.',
        ] },
        { t: 'h2', x: 'Töötervishoid (työterveyshuolto)' },
        { t: 'p', x: 'Tööandja peab oma kulul korraldama ennetava töötervishoiu juba esimesele töötajale. Teenuseosutajaga sõlmitakse kirjalik leping ja tööandjal peab olema kirjalik tegevuskava, mida vaadatakse üle igal aastal. Ravi töötervishoiu raames on vabatahtlik.' },
        { t: 'p', x: 'Kela hüvitab taotluse alusel 60 % ennetava töötervishoiu ja 50 % ravi heakskiidetud kuludest kuni arvestusliku ülempiirini. Hüvitist taotletakse tagantjärele majandusaasta kaupa hiljemalt 6 kuu jooksul majandusaasta lõpust.' },
        { t: 'h2', x: 'Palgaleht ja palga maksmine' },
        { t: 'p', x: 'Palk makstakse töötaja antud pangakontole ja see peab olema kättesaadav maksepäeval. Kuupalk makstakse kord kuus, kui ei ole kokku lepitud teisiti. Iga palgamaksega saab töötaja palgalehe (palkkalaskelma), millelt näeb palga suuruse ja selle arvestamise alused. Praktikas on palgalehel brutopalk ja lisatasud, loontoised hüved, kinnipeetud maks, töötaja pensioni- ja töötuskindlustusmakse ning netopalk.' },
        { t: 'h2', x: 'Põhipuhkus ja puhkusetasu lühidalt' },
        { t: 'ul', items: [
          'Iga täis puhkuse kogumise kuu eest koguneb kaks argipäeva (E–L) puhkust, kui töösuhe on puhkuse kogumise aasta lõpuks kestnud alla aasta. Pärast seda kaks ja pool argipäeva kuus. Puhkuse kogumise aasta kestab 1.4–31.3.',
          'Täis kogumise kuu on kuu, mil töötajal on vähemalt 14 tööpäeva. Kui tööpäevi on vähem, loetakse kuu täisväärtuslikuks, kui töötunde koguneb vähemalt 35.',
          'Puhkusetasu makstakse enne puhkuse algust. Kuni kuuepäevase puhkuse eest võib selle maksta tavalisel palgapäeval.',
          'Kui töötaja ei ole nädala- ega kuupalgal ja töötab alla 14 päeva kuus, on puhkusetasu 9 % palgast või 11,5 %, kui töösuhe on puhkuse kogumise aasta lõpuks (31.3) kestnud vähemalt aasta.',
          'Töösuhte lõppedes makstakse kasutamata puhkuse eest hüvitist (lomakorvaus). Puhkuserahta (lomaraha) puhkuseseadus ei nõua — see tuleb tavaliselt kollektiivlepingust või töölepingust.',
        ] },
        { t: 'h2', x: 'Levinumad vead esimese töötajaga' },
        { t: 'ul', items: [
          'Töö algab enne, kui õnnetusjuhtumikindlustus kehtib.',
          'Palk makstakse ilma maksukaardita: kinni peetakse 60 % ja töötaja ootab ülemakstud maksu tagasi.',
          'Palgatarkvarasse jäävad 2025. aasta määrad. 2026. aastal on töötaja töötuskindlustusmakse 0,89 % (varem 0,59 %) ja pensionimakse kõigile 7,30 %.',
          'Palgateade või eraldi teade hilineb. Tööandjate registris olev ettevõte unustab märke Ei palkanmaksua kuu kohta, mil palka ei makstud.',
          'Kollektiivlepingut ei kontrollita ning palk, lisatasud või puhkuseraha jäävad alla üldsiduva TES-i taseme.',
          'Töötervishoiu leping jääb sõlmimata või Kela hüvitis jääb 6 kuu jooksul taotlemata.',
          'Palk makstakse sularahas või ilma palgaleheta.',
        ] },
        { t: 'h2', x: 'Korraldame palgaarvestuse esimesest töötajast alates' },
        { t: 'p', x: 'Tilitoimisto Debit Credit aitab ettevõtetel esimese töötaja õigesti palgata: kontrollime töölepingu palgatingimusi kollektiivlepingu järgi, arvutame palgad 2026. aasta määradega, koostame palgalehed ja Tulorekisteri teated tähtajaks ning hoolitseme tööandja maksete ja puhkusetasude eest. Teenindame soome ja vene keeles. Võta ühendust ja vaatame sinu ettevõtte olukorra üle enne esimest palgapäeva.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Vero: sotsiaalkindlustusmaksed 2026 (inglise keeles)', href: SRC.socialEn },
          { label: 'Vero: kuidas teatada palkadest ja tööandja maksetest (inglise keeles)', href: SRC.reportEn },
          { label: 'Vero: tööandjate register (inglise keeles)', href: SRC.registerEn },
          { label: 'Vero: maksukaardi juhised tööandjale (soome keeles)', href: SRC.taxCardFi },
          { label: 'Työllisyysrahasto: 2026. aasta töötuskindlustusmaksed (soome keeles)', href: SRC.unemployment },
          { label: 'Vero: Tulorekisteri teadete hooletustasu (soome keeles)', href: SRC.penaltyFi },
          { label: 'Kela: töötervishoiu kulude hüvitis (soome keeles)', href: SRC.kela },
          { label: 'Suomi.fi: tööandja värbamise kontrollnimekiri (inglise keeles)', href: SRC.suomiEn },
          { label: 'Finlex: töölepinguseadus (inglise keeles)', href: SRC.tslEn },
          { label: 'Finlex: puhkuseseadus (inglise keeles)', href: SRC.vllEn },
          { label: 'Finlex: töötervishoiu seadus (inglise keeles)', href: SRC.tthlEn },
        ] },
      ],
      faq: [
        { q: 'Kas tööleping peab olema kirjalik?', a: 'Lepingu võib sõlmida ka suuliselt, kuid tööandja peab andma kirjaliku ülevaate peamistest tingimustest, kui need ei ole kirjalikus lepingus. Osa andmetest tuleb anda seitsme päeva ja ülejäänud kuu jooksul töö algusest. Seetõttu on kirjalik leping tavaliselt kõige selgem lahendus.' },
        { q: 'Kas ühe töötajaga ettevõte peab registreeruma tööandjate registris?', a: 'Mitte tingimata. Kui ettevõttel on ainult üks alaline töötaja, on ta maksuameti jaoks juhuslik tööandja ja registreerimine ei ole kohustuslik. Palgad tuleb siiski teatada Tulorekisterisse 5 päeva jooksul maksepäevast. Registreerimine muutub kohustuslikuks näiteks siis, kui alalisi töötajaid on kaks.' },
        { q: 'Kui suured on tööandja maksed 2026. aastal?', a: 'Tööandja keskmine TyEL-makse on 17,10 %, töötuskindlustusmakse 0,31 % (üle 2 509 500 euro palgafondilt 1,23 %) ja ravikindlustusmakse 1,91 %. Lisaks tulevad õnnetusjuhtumikindlustus ja vajadusel grupielukindlustus, mille hind sõltub tegevusalast ja kindlustusseltsist.' },
        { q: 'Mis saab, kui töötaja ei too maksukaarti?', a: 'Siis peab tööandja palgast kinni pidama 60 %. Maksukaardi andmeid saab ka otse maksuametist Vero API kaudu, kui palgatarkvara seda toetab.' },
        { q: 'Kas töötervishoid on kohustuslik juba ühele töötajale?', a: 'Jah. Ennetav töötervishoid tuleb korraldada juba esimesele töötajale ja sõlmida teenuseosutajaga kirjalik leping. Kela hüvitab taotluse alusel 60 % ennetava töötervishoiu heakskiidetud kuludest.' },
      ],
    },
    uk: {
      title: 'Перший працівник у Фінляндії: памʼятка роботодавцю на 2026 рік',
      description:
        'Перший працівник у Фінляндії 2026: трудовий договір, податкова картка, строки Tulorekisteri, TyEL 17,10 %, внески роботодавця, страховки і медицина праці.',
      lead: 'З першим працівником ваша фірма стає роботодавцем, і обовʼязки починаються ще до першої зарплати. Зібрали в одному місці, що має бути в трудовому договорі, як працюють утримання податку і Tulorekisteri, які страховки обовʼязкові, скільки становлять внески роботодавця у 2026 році і де малий бізнес помиляється найчастіше.',
      body: [
        { t: 'h2', x: 'Чек-лист до першого робочого дня' },
        { t: 'ol', items: [
          'Укладіть трудовий договір (työsopimus) і надайте письмовий опис основних умов роботи.',
          'Зʼясуйте, чи діє у вашій галузі загальнообовʼязковий колективний договір (TES). Від нього залежать мінімальна зарплата, надбавки і часто групове страхування життя.',
          'Оформіть пенсійне страхування TyEL у пенсійній страховій компанії.',
          'Оформіть обовʼязкове страхування від нещасних випадків до початку роботи.',
          'Укладіть письмовий договір про виробничу медицину (työterveyshuolto).',
          'Отримайте дані податкової картки (verokortti) і домовтеся про день і період виплати зарплати.',
          'Зʼясуйте, чи потрібно реєструватися в реєстрі роботодавців (työnantajarekisteri).',
          'Організуйте розрахунок зарплати і подання даних до Tulorekisteri, щоб перша зарплата пройшла без помилок.',
        ] },
        { t: 'h2', x: 'Трудовий договір: що в ньому має бути' },
        { t: 'p', x: 'За законом про трудовий договір (työsopimuslaki) договір можна укласти усно, письмово або електронно. Але роботодавець зобовʼязаний надати працівникові письмовий опис основних умов роботи, якщо їх немає в письмовому договорі. Найпростіше одразу скласти письмовий договір з усіма відомостями. Опис не потрібен, якщо працівник працює в середньому не більше трьох годин на тиждень протягом чотирьох тижнів поспіль.' },
        { t: 'p', x: 'В описі мають бути щонайменше:' },
        { t: 'ul', items: [
          'роботодавець і працівник, їхнє місце проживання або діяльності',
          'дата початку роботи, а для строкового договору — дата закінчення і підстава строковості',
          'місце роботи та основні обовʼязки',
          'підстави розрахунку зарплати й інших винагород, період виплати зарплати',
          'робочий час',
          'порядок визначення відпустки і строк попередження про звільнення',
          'колективний договір, що застосовується',
          'випробувальний строк, якщо про нього домовилися',
          'можливе право на навчання, яке надає роботодавець',
          'страхова установа, у якій оформлено пенсійне страхування і страхування від нещасних випадків',
        ] },
        { t: 'p', x: 'Частину відомостей треба надати протягом семи днів, решту — протягом місяця від початку роботи. Можна домовитися про випробувальний строк: не довше шести місяців, а в строковому договорі — не більше половини його строку. Якщо в галузі є загальнообовʼязковий колективний договір, його умови — це мінімум, і домовитися про гірші умови не можна. Якщо жоден колективний договір не застосовується і зарплату не узгоджено, працівникові належить звичайна і розумна зарплата.' },
        { t: 'h2', x: 'Податкова картка й утримання податку' },
        { t: 'p', x: 'Роботодавець утримує із зарплати аванс податку (ennakonpidätys) за податковою карткою працівника. Дані податкової картки програма розрахунку зарплати може отримувати напряму з податкової через інтерфейс Vero API, або працівник передає картку сам. Працівник має право повідомити роботодавцю вищий відсоток. Якщо податкової картки немає, утримується 60 %.' },
        { t: 'p', x: 'Внесок працівника на медичне страхування вже входить у відсоток утримання. Крім того, із зарплати утримуються частка працівника в пенсійному внеску (7,30 % у 2026 році) і в страхуванні від безробіття (0,89 % у 2026 році). Утриманий податок і внесок роботодавця на медичне страхування сплачуються в OmaVero до 12-го числа місяця, наступного за місяцем виплати.' },
        { t: 'h2', x: 'Tulorekisteri: два звіти та їхні строки' },
        { t: 'ul', items: [
          'Звіт про зарплату (palkkatietoilmoitus) щодо кожного працівника — протягом 5 днів від дати виплати. Дата виплати — день, коли гроші доступні працівникові. Якщо строк припадає на суботу, неділю чи свято, звіт можна подати наступного робочого дня.',
          'Окремий звіт роботодавця (työnantajan erillisilmoitus) про внесок на медичне страхування — раз на місяць, не пізніше 5-го числа місяця, наступного за місяцем виплати.',
          'Повідомляються всі зарплати незалежно від суми: мінімального порогу немає. Звіт подається, навіть якщо фірма не перебуває в реєстрі роботодавців.',
          'Фірма з реєстру роботодавців подає окремий звіт і за місяці без зарплати (позначка Ei palkanmaksua).',
        ] },
        { t: 'p', x: 'За запізнення нараховується плата за прострочення (myöhästymismaksu), а якщо звіт не подано взагалі, податкова може призначити штраф (laiminlyöntimaksu) до 15 000 євро за кожен відсутній звіт. Якщо звітів немає, податкова сама оцінює зарплати і призначає податки з надбавкою. Дані Tulorekisteri отримують також пенсійна компанія і Työllisyysrahasto, які виставляють за ними рахунки.' },
        { t: 'h2', x: 'Реєстр роботодавців: коли реєстрація обовʼязкова' },
        { t: 'p', x: 'Роботодавець, який платить зарплату регулярно, зобовʼязаний зареєструватися в реєстрі роботодавців податкової. Фірма вважається регулярним роботодавцем, якщо вона:' },
        { t: 'ul', items: [
          'постійно платить зарплату двом або більше працівникам,',
          'постійно платить зарплату одному працівникові і ще одному чи кільком тимчасовим або короткостроковим, або',
          'одночасно платить зарплату щонайменше шести працівникам, навіть якщо всі вони тимчасові.',
        ] },
        { t: 'p', x: 'Якщо у фірми лише один постійний працівник або 1–5 працівників, чиї трудові відносини тривають менше календарного року, вона вважається нерегулярним роботодавцем, і реєстрація не обовʼязкова. Зарплати все одно повідомляються до Tulorekisteri. Нерегулярний роботодавець завжди сплачує податки і внески щомісяця: довший податковий період йому недоступний. Зареєструватися можна в OmaVero або через повідомлення про зміни в YTJ.' },
        { t: 'h2', x: 'Внески роботодавця у 2026 році' },
        { t: 'ul', items: [
          'Пенсійний внесок (TyEL): у середньому 24,40 % від зарплати. Частка працівника — 7,30 % для всіх вікових груп, на роботодавця припадає в середньому 17,10 %. Точний відсоток називає ваша пенсійна компанія.',
          'Внесок на страхування від безробіття: частка роботодавця — 0,31 % від фонду оплати праці до 2 509 500 євро і 1,23 % понад цю суму. Частка працівника — 0,89 %. Внесок сплачується за працівників 18–64 років. Власна частка роботодавця виникає, якщо за календарний рік виплачено понад 1 500 євро зарплати, а частку працівника утримують із зарплати завжди, навіть нижче цього порогу. Työllisyysrahasto виставляє рахунок за даними Tulorekisteri чотири рази на рік.',
          'Внесок роботодавця на медичне страхування: 1,91 % від зарплати (1,87 % у 2025 році), за працівників 16–67 років.',
          'Страхування від нещасних випадків: внесок залежить від галузі та фірми, рахунок виставляє страхова компанія.',
          'Групове страхування життя: сплачується, якщо цього вимагає колективний договір, зазвичай одним рахунком зі страхуванням від нещасних випадків.',
        ] },
        { t: 'p', x: 'Приклад: за зарплати брутто 3 000 євро на місяць роботодавець за середнього внеску TyEL сплачує 513,00 євро пенсійного внеску, 9,30 євро внеску на безробіття і 57,30 євро медичного внеску. Разом 579,60 євро, тобто близько 19,3 % від зарплати, плюс страхування від нещасних випадків і групове страхування життя. Крім того, із зарплати працівника утримується 219,00 євро пенсійного внеску і 26,70 євро внеску на безробіття. Аванс податку рахується із зарплати брутто, а частки працівника вираховуються додатково.' },
        { t: 'note', x: 'Відсотки — ставки 2026 року. Джерела: податкова Verohallinto, соціальні страхові внески (оновлено 8.12.2025), Työllisyysrahasto (внески на безробіття 2026) і Eläketurvakeskus (обовʼязкові соціальні внески 2026). Ставка TyEL — середня, ваш відсоток повідомить пенсійна компанія. Ставки змінюються щороку.' },
        { t: 'h2', x: 'Обовʼязкові страховки' },
        { t: 'ul', items: [
          'Пенсійне страхування TyEL оформлюється на працівників від 17 років, чий місячний заробіток перевищує мінімальний поріг. Поріг настільки низький, що під страхування потрапляє практично будь-яка зарплата. Страхування потрібно оформити не пізніше, ніж зарплату треба повідомити до Tulorekisteri.',
          'За даними податкової, страхування від нещасних випадків обовʼязкове, якщо за календарний рік виплачується понад 1 500 євро зарплати. Воно має діяти з першого дня роботи.',
          'Групове страхування життя стає обовʼязковим, якщо це передбачено колективним договором, який поширюється на роботодавця.',
        ] },
        { t: 'h2', x: 'Виробнича медицина (työterveyshuolto)' },
        { t: 'p', x: 'Роботодавець зобовʼязаний за свій рахунок організувати профілактичну виробничу медицину вже для першого працівника. З постачальником послуг укладається письмовий договір, а роботодавець повинен мати письмовий план дій, який переглядається щороку. Лікування в межах виробничої медицини — добровільне.' },
        { t: 'p', x: 'Kela за заявою відшкодовує 60 % схвалених витрат на профілактику і 50 % витрат на лікування — у межах розрахункового максимуму. Відшкодування запитують заднім числом за фінансовий рік, не пізніше ніж через 6 місяців після його закінчення.' },
        { t: 'h2', x: 'Розрахунковий листок і виплата зарплати' },
        { t: 'p', x: 'Зарплата перераховується на банківський рахунок, указаний працівником, і має бути доступна в день виплати. Місячна зарплата виплачується раз на місяць, якщо не домовилися інакше. Під час кожної виплати працівник отримує розрахунковий листок (palkkalaskelma), у якому видно суму зарплати й підстави її розрахунку. На практиці в ньому зазначають зарплату брутто і надбавки, натуральні пільги, утриманий податок, внески працівника і суму до виплати.' },
        { t: 'h2', x: 'Відпустка і відпускні коротко' },
        { t: 'ul', items: [
          'За кожен повний місяць накопичення відпустки працівник отримує два будні дні відпустки (включно із суботами), якщо до кінця року накопичення трудові відносини тривали менше року. Потім — два з половиною будні дні на місяць. Рік накопичення відпустки триває з 1.4 по 31.3.',
          'Повний місяць накопичення — це місяць, у якому в працівника щонайменше 14 відпрацьованих днів. Якщо робота рідша, місяць вважається повним за щонайменше 35 робочих годин.',
          'Відпускні виплачуються до початку відпустки. За відпустку до шести днів їх можна виплатити у звичайний день зарплати.',
          'Якщо працівник не на тижневій чи місячній ставці і працює менше 14 днів на місяць, відпускні становлять 9 % від зарплати, а якщо до кінця року накопичення відпустки (31.3) трудові відносини тривали щонайменше рік — 11,5 %.',
          'Під час звільнення за невикористану відпустку виплачується компенсація (lomakorvaus). Відпускної премії (lomaraha) закон про відпустки не вимагає — вона зазвичай випливає з колективного або трудового договору.',
        ] },
        { t: 'h2', x: 'Часті помилки з першим працівником' },
        { t: 'ul', items: [
          'Робота починається до того, як набуло чинності страхування від нещасних випадків.',
          'Зарплата виплачується без податкової картки: утримання 60 %, і працівник довго чекає на повернення переплати.',
          'У програмі залишилися відсотки 2025 року. У 2026 році внесок працівника на безробіття — 0,89 % (було 0,59 %), а пенсійний — 7,30 % для всіх.',
          'Звіт про зарплату або окремий звіт роботодавця подано із запізненням. Фірма з реєстру забуває позначку Ei palkanmaksua за місяць без зарплати.',
          'Не перевірено колективний договір, і зарплата, надбавки чи відпускна премія нижчі за рівень загальнообовʼязкового TES.',
          'Не укладено договір про виробничу медицину або пропущено 6-місячний строк для відшкодування від Kela.',
          'Зарплата видається готівкою або без розрахункового листка.',
        ] },
        { t: 'h2', x: 'Ми ведемо розрахунок зарплати з першого працівника' },
        { t: 'p', x: 'Tilitoimisto Debit Credit допомагає правильно найняти першого працівника: перевіримо умови оплати в трудовому договорі за колективним договором, розрахуємо зарплату за ставками 2026 року, підготуємо розрахункові листки і звіти до Tulorekisteri вчасно, простежимо за податками, внесками й відпускними. Працюємо фінською та російською. Звʼяжіться з нами — розберемо ситуацію вашої фірми до першої зарплати.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: соціальні страхові внески 2026 (англійською)', href: SRC.socialEn },
          { label: 'Vero: як повідомляти зарплати і платежі роботодавця (англійською)', href: SRC.reportEn },
          { label: 'Vero: реєстр роботодавців (англійською)', href: SRC.registerEn },
          { label: 'Vero: податкові картки — інструкція для роботодавців (фінською)', href: SRC.taxCardFi },
          { label: 'Työllisyysrahasto: внески на безробіття 2026 (фінською)', href: SRC.unemployment },
          { label: 'Vero: штраф за неподання даних до Tulorekisteri (фінською)', href: SRC.penaltyFi },
          { label: 'Kela: відшкодування витрат на виробничу медицину (фінською)', href: SRC.kela },
          { label: 'Suomi.fi: памʼятка роботодавцю з найму (англійською)', href: SRC.suomiEn },
          { label: 'Finlex: закон про трудовий договір (англійською)', href: SRC.tslEn },
          { label: 'Finlex: закон про щорічну відпустку (англійською)', href: SRC.vllEn },
          { label: 'Finlex: закон про виробничу медицину (англійською)', href: SRC.tthlEn },
        ] },
      ],
      faq: [
        { q: 'Чи обовʼязково укладати трудовий договір письмово?', a: 'Договір можна укласти й усно, але роботодавець зобовʼязаний надати письмовий опис основних умов роботи, якщо їх немає в письмовому договорі. Частину відомостей — протягом семи днів, решту — протягом місяця від початку роботи. Тому найпростіше одразу оформити письмовий договір.' },
        { q: 'Чи потрібно фірмі з одним працівником реєструватися в реєстрі роботодавців?', a: 'Не обовʼязково. Якщо у фірми лише один постійний працівник, для податкової вона нерегулярний роботодавець, і реєстрація не потрібна. Зарплати все одно треба повідомляти до Tulorekisteri протягом 5 днів від дати виплати. Реєстрація стає обовʼязковою, наприклад, коли постійних працівників двоє.' },
        { q: 'Скільки становлять внески роботодавця у 2026 році?', a: 'Середній внесок роботодавця TyEL — 17,10 %, внесок на безробіття — 0,31 % (з фонду оплати праці понад 2 509 500 євро — 1,23 %), медичний внесок — 1,91 %. Плюс страхування від нещасних випадків і, за потреби, групове страхування життя: їхня ціна залежить від галузі та страхової компанії.' },
        { q: 'Що, як працівник не приніс податкову картку?', a: 'Тоді роботодавець зобовʼязаний утримати із зарплати 60 %. Дані податкової картки можна також отримувати напряму з податкової через Vero API, якщо це підтримує програма розрахунку зарплати.' },
        { q: 'Чи обовʼязкова виробнича медицина вже для одного працівника?', a: 'Так. Профілактичну виробничу медицину потрібно організувати вже для першого працівника і укласти письмовий договір з постачальником послуг. Kela за заявою відшкодовує 60 % схвалених витрат на профілактику.' },
      ],
    },
  },
};
