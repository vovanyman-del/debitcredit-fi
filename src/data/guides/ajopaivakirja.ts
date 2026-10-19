import type { Guide } from './types';

// Facts verified 19 Oct 2026, verbatim, against vero.fi and Finlex (page update date in brackets).
// Every link below was fetched the same day and answered HTTP 200. Figures shared with the guide
// kilometrikorvaus-paivaraha-2026 (0,55 €/km, 0,59 €/km for 2025, 11 c/km) are identical to it.
// - Vero, Yrittäjän ajoneuvojen kulut (29.6.2022; EN 1.7.2022): "Säilytä autokulujen kuitit ja pidä
//   ajopäiväkirjaa heti toiminnan alusta alkaen."; business asset = "hankittu elinkeinotoiminnan
//   käyttöön ja yli 50% ajokilometreistä on elinkeinotoiminnan ajoja"; private = "50% tai vähemmän
//   verovuoden ajokilometreistä"; spouse's car "ratkaistaan vastaavasti"; business drives "haet tavaraa
//   varastosta, käyt asiakkaan luona", "Tilapäiset matkat yrityksen toiminta-alueen ulkopuolelle";
//   "matkat, jotka teet kotoa työpaikalle (yrityksen toimipaikalle), eivät ole elinkeinotoiminnan
//   ajoa"; log: "Ajopäiväkirjasta on käytävä ilmi autolla verovuonna ajettu kokonaiskilometrimäärä" +
//   "ajon alkamis- ja päättymisajankohta", "ajon alkamis- ja päättymispaikka sekä tarvittaessa
//   ajoreitti", "matkan pituus", "ajon tarkoitus", "matkamittarin lukema ajon alussa ja lopussa",
//   "auton käyttäjä".
// - Vero, syventävä ohje 48192 Liikkeen- ja ammatinharjoittajien sekä maataloudenharjoittajien
//   matkakustannusten vähentäminen (VH/721/00.01.00/2025, antopäivä 28.1.2025, voimassa toistaiseksi;
//   page 11.2.2025): EVL 55 § 3 mom. quoted "edellyttää ajopäiväkirjaa tai muuta luotettavaa selvitystä
//   auton käytöstä ja elinkeinotoimintaan liittyvistä matkoista"; 3.2 "Lisävähennystä koskevia
//   säännöksiä ei sovelleta myöskään osakeyhtiön osakkaisiin eikä avoimen yhtiön tai
//   kommandiittiyhtiön yhtiömiehiin"; 4.6 "päiväkohtaisesti ... kohteet ja niiden etäisyys ... sekä
//   työmatkan kesto", "Selvitys tulee laatia todellisten kellonaikojen mukaan"; Akseli example: "vain
//   kuukausittaisten ajojen yhteiskilometrimäärät", "ei ole merkitty minkään ajojen osalta alkamis- tai
//   päättymisajankohtia", 88 days accepted, 150 days not, "Verohallinto määrää Akselille veronkorotuksen
//   perusteettomasta vähennysvaatimuksesta"; 5.2 permanent premises, outside area, "Matkan ei tarvitse
//   olla tilapäinen"; another driver: entrepreneur "on kuitenkin oltava mukana autossa matkustajana",
//   otherwise "todellisten kulujen suuruisina"; home ↔ first permanent premises and premises → home at
//   day's end are "yksityisajoja"; 5.3 KHO 23.1.2012/64 "tarkastellaan verovuosikohtaisesti",
//   "ei ole merkitystä" of other years; tilikausi = period; mid-year start: earlier drives "ei ole
//   merkitystä"; 5.4 without a log: "ajokilometrit voidaan luotettavasti selvittää", recurring trips
//   "ilmoitetaan tällaisen matkan kilometrimäärä ja kuinka monta kertaa vuodessa", "aina on
//   selvitettävä ... kokonaiskilometrimäärä"; no reliable evidence → "ei vähennetä lisävähennystä eikä
//   siitä muutoinkaan voi vähentää yksityisiin varoihin liittyvän auton kustannuksia"; 5.5.4 actual
//   costs above the maximum → "ei voi ... vielä lisävähennystä"; 6.1 autoetu car and leasing without
//   ownership transfer → no lisävähennys; 6.2 parents, children, siblings, "avopuoliso, joka ei täytä
//   TVL 7 §:ssä asetettuja edellytyksiä" → only actual costs; 6.3 total km not shown → "ei ole myöskään
//   mahdollisuutta myöntää lisävähennystä"; actual costs first, else "matkakuluvähennyksen ...
//   kilometrikohtaista määrää", requires that costs "on todella syntynyt"; 7 net assets: "huomioidaan
//   useamman kuin yhden verovuoden olosuhteet", temporary fall below half does not move the car out;
//   private share = costs and depreciation / total km × "ajopäiväkirjan mukaisella yksityisajojen
//   kilometrimäärällä (KHO 1987-B-515)", "Jos yksityisajoja ei ole pystytty luotettavasti esittämään,
//   joudutaan yksityisajojen osuus arvioimaan."
// - Vero, Verohallinnon päätös matkakuluvähennyksen määrästä vuodelta 2025 (VH/6253/00.01.00/2025,
//   13.11.2025): 1 § "auto 0,27 euroa kilometriltä".
// - Vero, Elinkeinotoiminnan veroilmoituksen täyttöohje (17.11.2025): "Elinkeinotoiminnan ajoista on
//   pidettävä ajopäiväkirjaa tai niistä voi antaa muun vastaavan selvityksen. Älä lähetä
//   ajopäiväkirjaa liitteenä, pyydämme sen tarvittaessa."; lisävähennys "enintään yhtä suuri kuin
//   palkansaajan verovapaa kilometrikorvaus", "Vuonna 2025 lisävähennys on 0,59 euroa / kilometri";
//   reduced by costs booked; private share formula "ajopäiväkirjan mukaisella"; "Jos olet vähentänyt
//   myös yksityisajoja yrityksen kirjanpidossa, yrityksen tuottoihin pitää lisätä vastaava summa."
// - Verohallinnon päätös verovapaista matkakustannusten korvauksista vuonna 2026 (VH/6575/00.01.00/2025):
//   9 § "auto 55 senttiä kilometriltä"; käyttöetu "käyttövoimakulujen enimmäismäärä on 11 senttiä
//   kilometriltä". (The 2026 lisävähennys maximum follows from "enintään yhtä suuri" → 0,55 €/km, as in
//   kilometrikorvaus-paivaraha-2026.)
// - Vero, syventävä ohje 48013 Työmatkakustannusten korvaukset verotuksessa (VH/630/00.01.00/2026,
//   5.3.2026; page 10.3.2026): 13 matkalasku "matkan tarkoitus ja kohde (osoite)", "tarvittaessa
//   matkareitti", "matkustamistapa (kulkuneuvo)", "matkan alkamis- ja päättymisajankohdat (päivämäärät ja
//   kellonajat)", "maa tai alue, jossa matkavuorokausi on päättynyt", "ajettu kilometrimäärä ja
//   yksikköhinta (EPA 17 §:n 3 momentti)"; "Matkalasku voidaan laatia myös erilaisilla sähköisillä
//   sovelluksilla, jos se sisältää asetuksessa määritellyt tiedot."; 8.2.5 no tax-free km allowance
//   for drives with a free-benefit car (verified in kilometrikorvaus-paivaraha-2026).
// - Vero, Työsuhde-edut (1.1.2026; EN 1.1.2026): autoetu "yksityisajoihin työnantajan henkilö- tai
//   pakettiautoa", "Yksityisajoja ovat myös asunnon ja työpaikan väliset matkat"; vapaa autoetu
//   "työnantaja maksaa kaikki autosta johtuvat kustannukset", käyttöetu "maksat itse ainakin
//   käyttövoimakulut"; "Jos käytät kilometrikohtaista arvoa, yksityisajoista on pidettävä
//   ajopäiväkirjaa"; reduction "työajoja kalenterivuoden aikana yli 30 000 km tai
//   ajopäiväkirjamerkintöihin perustuvat yksityisajosi ovat vähäisiä"; "korottaa, jos yksityisajoja on
//   yli 18 000 km vuodessa".
// - Vero, Autoedun arvonkorotus (2.2.2026): "yli 18 000 kilometriä kalenterivuoden aikana tai yli
//   1 500 kilometriä autoedun käyttökuukautta kohden". Autoedun arvonalennus (15.2.2021):
//   "ajopäiväkirjamerkintöihin perustuvia yksityisajoja alle 18 000 kilometriä".
// - Vero, syventävä ohje 47886 Luontoisedut verotuksessa (VH/6801/00.01.00/2025, 9.12.2025, voimassa
//   1.1.2026 – toistaiseksi): 1 owner: "voivat saada yhtiöstään myös luontoisetuja", valued per the
//   decision "jos etuja on käsitelty asianmukaisesti palkkatulona kirjanpidossa ja edut on ilmoitettu
//   tulorekisteriin", "epätavanomaiset ja perusteettomat edut ... peiteltynä osinkona"; several users
//   "edellyttää aina ... ajopäiväkirjaa tai muuta luotettavaa selvitystä"; 7.4.6 "ajopäiväkirjan
//   korvaavan ajotietojen seurantapalvelun", "GPS-yhteyden avulla toimiva seurantalaite"; 7.5.1
//   "1 500 kilometriä kuukaudessa, eli 18 000 kilometriä vuodessa", "valintaa on noudatettava
//   systemaattisesti", "Kuukausiarvo ei tässä tapauksessa rajoita", "Palkansaajan on säilytettävä
//   ajopäiväkirja itsellään ja toimitettava se Verohallinnolle ainoastaan pyydettäessä"; 7.5.2
//   "Ajopäiväkirja voi olla manuaalinen tai elektroninen", "päivittäin ajettu kilometrimäärä eriteltynä
//   työ- että yksityisajoihin", work drives: start/end time, start/end place "tarvittaessa ajoreitti",
//   odometer, length, purpose, user; "Yksityisajoista riittää pelkkä kilometrimäärä."; 7.8.2 "yli
//   30 000 kilometriä vuodessa, edun perusarvo on 80 prosenttia", "ehdoton vaatimus", "Ajopäiväkirja
//   on kuitenkin aina tarkistettava vuoden lopussa".
// - Vero, Kilometrikorvaus ja päiväraha (7.11.2025): owner of oy/ky/ay without salary: tax-free "vain,
//   jos Verohallinnon kustannuspäätöksessä kerrotut ehdot täyttyvät ja teet matkoista matkalaskun
//   yrityksen kirjanpitoon".
// - Vero, Kuitit ja tositteet (2.4.2025; EN 2.4.2025): "Mahdollinen ajopäiväkirja pitää kuitenkin
//   säilyttää."; "Kuitit ja tositteet pitää säilyttää 3 vuotta verovuoden päättymisestä alkaen.";
//   "Tositteet ja muut tiedot voit säilyttää myös sähköisessä muodossa."
// - Vero, Verohallinnon päätös ajoneuvon käytöstä pidettävästä ajopäiväkirjasta (VH/7370/00.01.00/2020,
//   14.12.2020, voimassa 1.1.2021 – toistaiseksi; autoverolaki 63 § 3 mom.): 2 § person resident in
//   Finland using a foreign-registered work vehicle under autoverolaki 39 § keeps "paperista tai
//   sähköistä ajopäiväkirjaa": "käyttöpäivä tai ajon alkamis- ja päättymisajankohta", "yhteenlasketut
//   ajokilometrit käyttöpäivänä tai matkamittarin lukema", "käyttömaa tai -maat", "käyttäjä tai
//   käyttäjät", "yhteenlasketut käyttöpäivät Suomessa ja ulkomailla 12 kuukauden tarkastelujakson
//   aikana"; 4 § "säilytettävä siten, että alkuperäiset tiedot ovat todennettavissa"; 5 § "pyynnöstä
//   esitettävä". Autoverolaki 777/2020 (finlex.fi): tax-free use requires that the vehicle is used
//   "vähemmän Suomessa kuin ulkomailla kunkin 12 kuukauden pituisen ajanjakson aikana".
// - Elinkeinotulon verottamisesta annettu laki 360/1968 (finlex.fi): 55 § 3 mom. "Edellä 1 momentin
//   2 kohdassa säädetyn vähennyksen myöntäminen edellyttää ajopäiväkirjaa tai muuta luotettavaa
//   selvitystä auton käytöstä ja elinkeinotoimintaan liittyvistä matkoista."
// - Kirjanpitolaki 1336/1997 (finlex.fi): 1:1 § 2 mom. "Luonnollinen henkilö ... on kirjanpitovelvollinen
//   harjoittamastaan liike- ja ammattitoiminnasta"; 2:7 § "voi vaikeuksitta tarkastella ja tarvittaessa
//   tulostaa selväkielisessä muodossa", "ei saa muuttaa tai poistaa tilinpäätöksen laatimisen
//   jälkeen"; 2:10 § "vähintään 10 vuotta tilikauden päättymisestä" (tilinpäätös, kirjanpidot) and
//   "tositteet ... vähintään kuusi vuotta sen vuoden lopusta, jonka aikana tilikausi on päättynyt".
// - Verotusmenettelylaki 1558/1995 (finlex.fi): 32 § "Veronkorotus jätetään määräämättä, jos laiminlyönti
//   on vähäinen tai laiminlyönnille on pätevä syy"; 32 a § "Veronkorotus on 2 prosenttia lisätyn tulon
//   määrästä", "vähintään 3 prosenttia ja enintään 10 prosenttia" in listed cases.
// - Vaavo: the electronic driving log is a per-firm feature of the bureau's app (enabled per client,
//   not on by default) — product fact from the bureau, worded as "can be enabled", mentioned once.
// Deliberately NOT included: per diem amounts and kilometre-allowance increments (they live in
// kilometrikorvaus-paivaraha-2026), the 2026 matkakuluvähennys rate (decision not yet published),
// car-benefit euro values, VAT on car costs, and taxi / demo-vehicle logs under autoverolaki.
const VERO = 'https://www.vero.fi';

const SRC = {
  vehicleFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/vahennykset/ajoneuvojen_kulut/`,
  vehicleEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/deductions/vehicle-expenses/`,
  guide48192: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48192/liikkeen-ja-ammatinharjoittajien-seka-maataloudenharjoittajien-matkakustannusten-vahentaminen/`,
  returnFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/veroilmoituksen-t%C3%A4ytt%C3%B6ohje/`,
  benefitsFi: `${VERO}/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/tyosuhdeedu/`,
  benefitsEn: `${VERO}/en/individuals/tax-cards-and-tax-returns/income/earned-income/fringe-benefits-from-employment/`,
  guide47886: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/47886/luontoisedut-verotuksessa15/`,
  guide48013: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48013/tyomatkakustannusten-korvaukset-verotuksessa7/`,
  receiptsFi: `${VERO}/henkiloasiakkaat/verokortti-ja-veroilmoitus/veroilmoitus_ja_verotuspaato/kuitit_ja_tosittee/`,
  receiptsEn: `${VERO}/en/individuals/tax-cards-and-tax-returns/your_tax_return_and_tax_assessment_deci/paperprinted_receipts_and_other_documen/`,
  foreignCarFi: `${VERO}/syventavat-vero-ohjeet/paatokset/90150/verohallinnon-paatos-ajoneuvon-kaytosta-pidettavasta-ajopaivakirjasta/`,
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
  vml: 'https://www.finlex.fi/fi/lainsaadanto/1995/1558',
};

export const ajopaivakirja: Guide = {
  slug: 'ajopaivakirja',
  datePublished: '2026-10-19',
  dateModified: '2026-10-19',
  content: {
    fi: {
      title: 'Ajopäiväkirja: mitä Verohallinto vaatii ja milloin sitä tarvitaan',
      description:
        'Ajopäiväkirja verotuksessa: yrittäjän auton 50 %:n raja, lisävähennys, autoetu, mitä kirjataan, sähköinen ajopäiväkirja, säilytysaika ja yleiset virheet.',
      lead: 'Ajopäiväkirja on Verohallinnolle tärkein näyttö siitä, kuinka paljon autolla on ajettu työ- tai liikeajoa ja kuinka paljon yksityisajoa. Toiminimiyrittäjällä siitä riippuu, kuuluuko auto yritykseen ja saako liikeajoista lisävähennyksen. Autoedun saajalle se voi alentaa edun verotusarvoa, ja osakeyhtiön omistajalle se erottaa yhtiön ajot omista. Kokosimme, kuka ajopäiväkirjaa tarvitsee, mitä siihen merkitään, kelpaako sovellus, mitä tapahtuu, jos ajopäiväkirjaa ei ole, ja kuinka kauan se säilytetään.',
      body: [
        { t: 'h2', x: 'Kuka ajopäiväkirjaa tarvitsee?' },
        { t: 'p', x: 'Ajopäiväkirjaa ei vaadita jokaiselta autoilijalta. Sitä tarvitaan, kun verotus riippuu siitä, miten ajokilometrit jakautuvat työ- tai liikeajoihin ja yksityisajoihin. Tavallisimmat tilanteet:' },
        { t: 'ul', items: [
          'Toiminimiyrittäjä ajaa omalla autollaan liikeajoja. Ajopäiväkirjasta selviää, kuuluuko auto elinkeinotoimintaan vai yksityistalouteen ja kuinka suuren lisävähennyksen liikeajoista voi saada.',
          'Toiminimiyrittäjän auto kuuluu yritykseen. Ajopäiväkirjan yksityisajokilometreillä lasketaan, kuinka suuri osa autokuluista ei ole vähennyskelpoista.',
          'Työntekijä ajaa työmatkoja omalla autollaan. Hänen näyttönsä on matkalasku, jonka perusteella työnantaja maksaa kilometrikorvauksen.',
          'Työntekijällä on autoetu. Ajopäiväkirjaa tarvitaan, jos edun arvo lasketaan yksityisajokilometrien mukaan tai jos verotusarvoa halutaan alentaa.',
          'Osakeyhtiön tai henkilöyhtiön omistaja ajaa yhtiön asioita omalla autollaan tai käyttää yhtiön autoa. Matkat osoitetaan matkalaskulla, ja yhtiön auton yksityiskäyttö on autoetua.',
        ] },
        { t: 'note', x: 'Ajopäiväkirjaa ei lähetetä veroilmoituksen liitteenä. Verohallinto pyytää sen tarvittaessa, joten sen on oltava tallessa ja kunnossa silloin, kun pyyntö tulee – usein vasta vuosia ajojen jälkeen.' },
        { t: 'h2', x: 'Toiminimiyrittäjä: 50 %:n raja ratkaisee, kumpaan auto kuuluu' },
        { t: 'p', x: 'Toiminimiyrittäjän eli yksityisen liikkeen- tai ammatinharjoittajan auton verokohtelu riippuu siitä, kuuluuko auto elinkeinotoimintaan vai yksityistalouteen. Auto kuuluu elinkeinotoimintaan, kun se on hankittu elinkeinotoiminnan käyttöön ja yli 50 % ajokilometreistä on elinkeinotoiminnan ajoja. Jos elinkeinotoiminnan ajoja on 50 % tai vähemmän verovuoden kilometreistä, auto kuuluu yksityistalouteen.' },
        { t: 'p', x: 'Rajaa tarkastellaan verovuosittain. Korkein hallinto-oikeus on linjannut (KHO 23.1.2012/64), että lisävähennyksen edellytykset ratkaistaan kunkin verovuoden ajojen perusteella; aiempien tai myöhempien vuosien yksityisajoilla ei ole merkitystä. Ajanjakso on yrittäjän tilikausi, ja jos toiminta alkaa kesken vuoden, toimintaa edeltävillä ajoilla ei ole merkitystä. Siksi Verohallinto neuvoo pitämään ajopäiväkirjaa heti toiminnan alusta alkaen.' },
        { t: 'p', x: 'Puolison omistaman auton kuuluminen elinkeinotoimintaan ratkaistaan samoin kuin oman auton. Muiden omistamista autoista, esimerkiksi vanhempien, sisarusten tai sellaisen avopuolison, joka ei ole verotuksessa puoliso, lisävähennystä ei saa; vähentää voi vain todelliset kulut. Lisävähennystä ei saa myöskään leasingautosta, jonka omistus ei siirry yrittäjälle, eikä työnantajalta saadusta autoetuautosta.' },
        { t: 'h3', x: 'Auto kuuluu yksityistalouteen: lisävähennys liikeajoista' },
        { t: 'p', x: 'Kun yrittäjä ajaa yksityistalouteen kuuluvalla autollaan elinkeinotoimintaan liittyviä ajoja, hän saa verotuksessa lisävähennyksen. Se on enintään palkansaajan verovapaan kilometrikorvauksen suuruinen: vuonna 2026 ajetuista kilometreistä enintään 0,55 €/km (vuoden 2025 ajoista 0,59 €/km). Kirjanpidossa jo vähennetyt autokulut pienentävät lisävähennystä, ja jos todelliset kulut ovat enimmäismäärää suuremmat, vähennetään vain todelliset kulut. Elinkeinotulon verottamisesta annetun lain (EVL) 55 §:n mukaan vähennys edellyttää ajopäiväkirjaa tai muuta luotettavaa selvitystä auton käytöstä ja elinkeinotoimintaan liittyvistä matkoista.' },
        { t: 'p', x: 'Esimerkki: autolla on ajettu vuonna 2026 yhteensä 20 000 km, josta liikeajoa on 6 000 km. Auto kuuluu yksityistalouteen, eikä autokuluja ole kirjattu kirjanpitoon. Lisävähennys on 6 000 × 0,55 € = 3 300 €. Ilman koko vuoden kilometrejä vertailua ei voi tehdä, eikä lisävähennystä myönnetä.' },
        { t: 'p', x: 'Jos joku muu, esimerkiksi yrittäjän työntekijä, ajaa yrittäjän autoa, lisävähennyksen saa vain, jos yrittäjä itse tai yhdessä hänen kanssaan yritystä harjoittava puoliso on matkalla mukana. Muuten matkan kulut vähennetään todellisina.' },
        { t: 'h3', x: 'Auto kuuluu yritykseen: yksityisajojen osuus' },
        { t: 'p', x: 'Kun auto kuuluu elinkeinotoimintaan, verotuksessa vähennetään todelliset, kirjanpitoon merkityt autokulut ja poistot. Yksityisajojen osuus ei ole vähennyskelpoinen: se lasketaan jakamalla autokulut ja vuotuinen poisto koko vuoden kilometreillä ja kertomalla tulos ajopäiväkirjan mukaisilla yksityisajokilometreillä. Jos yksityisajojen kulut on vähennetty kirjanpidossa, vastaava summa lisätään yrityksen tuottoihin veroilmoituksella.' },
        { t: 'p', x: 'Esimerkki: autokulut ovat 6 000 € ja poisto 2 000 €, yhteensä 8 000 €. Autolla on ajettu 25 000 km, josta yksityisajoa 5 000 km. Kilometrihinta on 8 000 € / 25 000 km = 0,32 €, ja yksityisajojen osuus 5 000 × 0,32 € = 1 600 €. Jos yksityisajoja ei pystytä luotettavasti osoittamaan, niiden osuus joudutaan arvioimaan.' },
        { t: 'p', x: 'Yritykseen hankittu auto ei siirry pois yrityksen varoista pelkästään siksi, että liikeajojen osuus jonakin vuonna tilapäisesti laskee alle puoleen: auton kuulumista yrityksen nettovarallisuuteen arvioidaan useamman vuoden olosuhteiden perusteella.' },
        { t: 'h3', x: 'Mitkä ajot ovat liikeajoja?' },
        { t: 'ul', items: [
          'Ajot yrityksen toiminta-alueella, esimerkiksi tavaran haku varastosta tai käynti asiakkaan luona.',
          'Ajot yrityksen pysyvien toimipaikkojen välillä.',
          'Tilapäiset matkat yrityksen tavanomaisen toiminta-alueen ulkopuolelle.',
          'Yksityisajoa sen sijaan on matka kotoa yrityksen toimipaikalle ja takaisin. Jos pysyviä toimipaikkoja on useita, yksityisajoa on kodin ja ensimmäisen kodin ulkopuolisen toimipaikan välinen matka sekä päivän päätteeksi toimipaikalta kotiin ajettu matka. Asunnon ja työpaikan välisiä matkoja vähennetään henkilökohtaisessa verotuksessa matkakuluina.',
        ] },
        { t: 'h2', x: 'Mitä yrittäjän ajopäiväkirjaan merkitään?' },
        { t: 'p', x: 'Verohallinnon mukaan ajopäiväkirjasta on käytävä ilmi autolla verovuonna ajettu kokonaiskilometrimäärä. Jokaisesta elinkeinotoimintaan liittyvästä ajosta merkitään:' },
        { t: 'ul', items: [
          'ajon alkamis- ja päättymisajankohta',
          'ajon alkamis- ja päättymispaikka sekä tarvittaessa ajoreitti',
          'matkan pituus',
          'ajon tarkoitus',
          'matkamittarin lukema ajon alussa ja lopussa',
          'auton käyttäjä.',
        ] },
        { t: 'p', x: 'Koko vuoden kilometrit on helpointa todentaa matkamittarin lukemilla vuoden (tai tilikauden) ensimmäisenä ja viimeisenä päivänä. Yksittäinen merkintä voi näyttää esimerkiksi tältä: 12.3.2026 klo 8.10–11.40, toimipaikka Vantaa – asiakas Espoossa – toimipaikka Vantaa, 46 km, mittari 48 210 → 48 256, laitteen asennus asiakkaalle, kuljettaja yrittäjä.' },
        { t: 'p', x: 'Jos samoista matkoista haetaan myös tilapäisen työmatkan lisävähennystä päivärahan perusteella, selvityksestä on näyttävä päiväkohtaisesti matkojen kohteet, etäisyydet ja kesto, ja se on laadittava todellisten kellonaikojen mukaan. Päivärahojen määrät ja ehdot on koottu oppaaseemme Kilometrikorvaus, päiväraha ja ateriakorvaus 2026.' },
        { t: 'note', x: 'Verohallinnon ohjeen esimerkissä yrittäjä oli merkinnyt ajopäiväkirjaan vain kuukausittaiset yhteiskilometrit, suurimmasta osasta matkoja pelkän kaupungin tai alueen nimen eikä minkään ajon kellonaikoja. Vähennys hyväksyttiin vain niiltä 88 päivältä, joiden kohteet ja reitit oli kirjattu tarkemmin. 150 päivän osalta vaatimus hylättiin, ja yrittäjälle määrättiin veronkorotus.' },
        { t: 'h2', x: 'Työntekijä omalla autolla: matkalasku on näyttö' },
        { t: 'p', x: 'Kun työntekijä ajaa työmatkan omalla autollaan, työnantaja voi maksaa verovapaan kilometrikorvauksen, vuonna 2026 enintään 0,55 €/km. Työntekijän näyttö ei ole erillinen ajopäiväkirja vaan matkalasku, jonka hän esittää työnantajalle. Matkalaskusta on selvittävä:' },
        { t: 'ul', items: [
          'matkan tarkoitus ja kohde (osoite)',
          'tarvittaessa matkareitti',
          'matkustamistapa eli kulkuneuvo',
          'matkan alkamis- ja päättymisajankohdat päivämäärineen ja kellonaikoineen',
          'ulkomaanmatkoista maa tai alue, jossa matkavuorokausi päättyi',
          'kilometrikorvauksesta lisäksi ajettu kilometrimäärä ja yksikköhinta.',
        ] },
        { t: 'p', x: 'Matkalaskun voi laatia myös sähköisellä sovelluksella, kun siinä on vaaditut tiedot. Moni pitää silti omaa ajopäiväkirjaa, josta matkalasku on helppo koota. Jos työntekijällä on vapaa autoetu, tällä autolla ajetuista työajoista ei voi maksaa verovapaata kilometrikorvausta. Käyttöetuauton kuljettajalle, joka maksaa itse polttoaineen, voi korvata käyttövoimakuluja verovapaasti enintään 0,11 €/km. Korotukset, päivärahat ja tulorekisteri-ilmoittaminen käydään läpi kilometrikorvausoppaassamme.' },
        { t: 'h2', x: 'Autoetu: yksityisajot ja ajopäiväkirja' },
        { t: 'p', x: 'Autoetu syntyy, kun työntekijä tai hänen perheensä käyttää työnantajan henkilö- tai pakettiautoa yksityisajoihin. Yksityisajoa on myös matka kodin ja työpaikan välillä. Vapaassa autoedussa työnantaja maksaa kaikki auton kulut, käyttöedussa työntekijä maksaa itse ainakin käyttövoimakulut eli esimerkiksi polttoaineen.' },
        { t: 'p', x: 'Autoedun kuukausiarvo on laskettu olettaen, että yksityisajoa on 1 500 km kuukaudessa eli 18 000 km vuodessa. Ajopäiväkirja vaikuttaa edun arvoon näin:' },
        { t: 'ul', items: [
          'Kilometriperusteinen arvo: jos käyttökustannukset lasketaan yksityisajokilometrien mukaan, yksityisajoista on pidettävä ajopäiväkirjaa. Valittua tapaa on noudatettava johdonmukaisesti, eikä kuukausiarvo silloin rajoita edun määrää.',
          'Arvon alentaminen: jos ajopäiväkirjan mukaiset yksityisajot jäävät alle 18 000 km:n vuodessa, työntekijä voi vaatia autoedun arvon alentamista esitäytetyllä veroilmoituksella.',
          'Paljon työajoja: jos työajoja on kalenterivuoden aikana yli 30 000 km, edun perusarvo on 80 % normaalista. Raja on ehdoton, ja ajopäiväkirja on tarkistettava vuoden lopussa.',
          'Arvon korottaminen: jos yksityisajoja on yli 18 000 km kalenterivuodessa tai yli 1 500 km autoedun käyttökuukautta kohden, verotusarvoa pitää korottaa.',
          'Usea käyttäjä: jos samaa autoa käyttää useampi työntekijä, edun jakaminen ajettujen kilometrien mukaan edellyttää aina ajopäiväkirjaa tai muuta luotettavaa selvitystä.',
        ] },
        { t: 'p', x: 'Autoedun ajopäiväkirja voi olla manuaalinen tai elektroninen. Siitä pitää näkyä päivittäin ajetut kilometrit eriteltyinä työ- ja yksityisajoihin. Työajoista merkitään lisäksi alkamis- ja päättymisajankohta, alkamis- ja päättymispaikka (tarvittaessa reitti), matkamittarin lukemat ja matkan pituus, ajon tarkoitus ja auton käyttäjä. Yksityisajoista riittää pelkkä kilometrimäärä. Työntekijä säilyttää ajopäiväkirjan itse ja toimittaa sen Verohallinnolle vain pyydettäessä.' },
        { t: 'h2', x: 'Osakeyhtiö ja henkilöyhtiö' },
        { t: 'p', x: 'Lisävähennys on vain yksityisen liikkeen- ja ammatinharjoittajan vähennys. Sitä ei sovelleta osakeyhtiön osakkaisiin eikä avoimen yhtiön tai kommandiittiyhtiön yhtiömiehiin. Yhtiön omistajalla on kaksi tavallista tilannetta:' },
        { t: 'ul', items: [
          'Omistaja ajaa yhtiön asioita omalla autollaan. Yhtiö voi maksaa hänelle verovapaata kilometrikorvausta, vaikka hän ei nostaisi palkkaa, kun Verohallinnon päätöksen ehdot täyttyvät ja matkoista tehdään matkalasku yhtiön kirjanpitoon.',
          'Omistaja käyttää yhtiön autoa myös yksityisajoihin, kodin ja työpaikan väliset matkat mukaan lukien. Siitä syntyy autoetu. Se arvostetaan luontoisetupäätöksen mukaan, jos etu on käsitelty kirjanpidossa palkkana ja ilmoitettu tulorekisteriin; epätavanomaiset tai perusteettomat edut voidaan verottaa peiteltynä osinkona.',
        ] },
        { t: 'p', x: 'Yhtiön autossa ajopäiväkirja on se aineisto, jolla omistaja osoittaa yksityisajojensa määrän, jos hän haluaa edun arvon kilometrien mukaan tai vaatii arvon alentamista.' },
        { t: 'h2', x: 'Kelpaako sähköinen ajopäiväkirja tai GPS-sovellus?' },
        { t: 'p', x: 'Kelpaa, kun siitä näkyvät samat tiedot kuin paperisesta. Verohallinnon luontoisetuohjeen mukaan ajopäiväkirja voi olla manuaalinen tai elektroninen, ja työnantaja voi hankkia autoetuautoon ajopäiväkirjan korvaavan, GPS-laitteella toimivan ajotietojen seurantapalvelun. Myös matkalaskun voi laatia sähköisellä sovelluksella. Yrittäjän lisävähennyksessä laki ei määrää muotoa, vaan edellyttää ajopäiväkirjaa tai muuta luotettavaa selvitystä.' },
        { t: 'p', x: 'Sovellusta valitessa kannattaa tarkistaa kolme asiaa:' },
        { t: 'ul', items: [
          'GPS tallentaa ajan, paikat ja kilometrit, mutta ei ajon tarkoitusta. Tarkoitus ja kuljettaja on lisättävä jokaiseen liikeajoon.',
          'Koko vuoden kilometrien on näyttävä, myös yksityisajojen osalta – pelkät liikeajot eivät riitä.',
          'Tiedot on voitava tulostaa tai viedä tiedostoksi. Kirjanpitolain mukaan kirjanpitoaineistoa on voitava tarkastella ja tarvittaessa tulostaa selväkielisenä, eikä sen sisältöä saa muuttaa tilinpäätöksen jälkeen. Vie vuoden ajot talteen viimeistään tilinpäätöksen yhteydessä, ettei aineisto katoa sovelluksen vaihtuessa.',
        ] },
        { t: 'p', x: 'Toimiston asiakkaille Vaavo-sovellukseen voidaan myös ottaa käyttöön sähköinen ajopäiväkirja.' },
        { t: 'h2', x: 'Entä jos ajopäiväkirjaa ei ole pidetty?' },
        { t: 'p', x: 'Ajopäiväkirjan puuttuminen ei yksin vie vähennystä, mutta silloin yrittäjän on osoitettava ajot muuten. Verohallinnon ohjeen mukaan:' },
        { t: 'ul', items: [
          'Lisävähennyksen voi saada ilman ajopäiväkirjaa vain, jos liikeajojen kilometrit voidaan muuten luotettavasti selvittää. Säännöllisesti toistuvista matkoista, esimerkiksi kerran viikossa samaan kohteeseen, ilmoitetaan matkan pituus ja kertojen määrä vuodessa.',
          'Auton koko vuoden kilometrit on selvitettävä aina. Jos niitä ei selvitetä, auton kuulumista yksityistalouteen ei voi todentaa, eikä lisävähennystä myönnetä.',
          'Silloin vähennetään ensisijaisesti liikeajojen todelliset kulut, esimerkiksi polttoainekuittien perusteella. Jos todellisiakaan kuluja ei voi selvittää, vähennys lasketaan asunnon ja työpaikan välisten matkojen kilometrikohtaisella määrällä (verovuodelta 2025 auto 0,27 €/km), mikä on selvästi kilometrikorvausta pienempi. Edellytys on, että liikeajoista on todella syntynyt kuluja.',
          'Jos yritykseen kuuluvan auton yksityisajoja ei pystytä luotettavasti osoittamaan, niiden osuus arvioidaan.',
          'Jos liikeajoista ei ole lainkaan luotettavaa selvitystä, yksityisauton kuluja ei vähennetä elinkeinotulosta lainkaan.',
        ] },
        { t: 'p', x: 'Autoedussa ilman ajopäiväkirjaa käytetään kuukausiarvoa, eikä arvon alentamista vähäisten yksityisajojen perusteella voi vaatia. Puutteellinen selvitys voi johtaa myös veronkorotukseen. Verotusmenettelylain mukaan veronkorotus on lähtökohtaisesti 2 % lisätyn tulon määrästä ja tietyissä tilanteissa 3–10 %. Se jätetään määräämättä, jos laiminlyönti on vähäinen tai sille on pätevä syy.' },
        { t: 'h2', x: 'Kuinka kauan ajopäiväkirja säilytetään?' },
        { t: 'ul', items: [
          'Toiminimiyrittäjä: liike- ja ammattitoimintaa harjoittava luonnollinen henkilö on kirjanpitovelvollinen. Kirjanpitolain mukaan tositteet ja muu kirjanpitoaineisto säilytetään vähintään kuusi vuotta sen vuoden lopusta, jonka aikana tilikausi päättyi, ja kirjanpidot sekä tilinpäätös vähintään 10 vuotta tilikauden päättymisestä. Ajopäiväkirja on autokulujen ja lisävähennyksen peruste, joten se kannattaa säilyttää kirjanpitoaineiston mukana vähintään yhtä kauan kuin tositteet.',
          'Palkansaaja: veroilmoituksen kuitit ja tositteet säilytetään 3 vuotta verovuoden päättymisestä. Verohallinnon mukaan mahdollinen ajopäiväkirja on säilytettävä, vaikka asunnon ja työpaikan välisistä matkakuluista ei muuten tarvitse säilyttää tositteita. Tiedot voi säilyttää myös sähköisesti.',
          'Työnantaja: matkalaskut liitteineen ovat korvausten kirjausten tositteita, joten niihin sovelletaan kirjanpitolain säilytysaikoja.',
        ] },
        { t: 'h3', x: 'Ulkomailla rekisteröity työsuhdeauto' },
        { t: 'p', x: 'Erillinen ajopäiväkirjavelvollisuus koskee autoverotusta. Suomessa vakituisesti asuvan työntekijän tai ammatinharjoittajan ja hänen perheenjäsentensä on pidettävä paperista tai sähköistä ajopäiväkirjaa, kun he käyttävät autoverolain 39 §:ssä tarkoitettua ulkomailla rekisteröityä työsuhdeajoneuvoa. Verottoman käytön edellytyksenä on muun muassa, että ajoneuvoa käytetään kunkin 12 kuukauden jakson aikana päivinä laskettuna vähemmän Suomessa kuin ulkomailla. Ajopäiväkirjaan merkitään päivä- tai ajokohtaisesti käyttöpäivä tai ajon alkamis- ja päättymisajankohta, ajokilometrit tai matkamittarin lukemat, käyttömaa ja käyttäjä sekä käyttöpäivät Suomessa ja ulkomailla 12 kuukauden tarkastelujakson aikana. Se säilytetään niin, että alkuperäiset tiedot ovat todennettavissa, ja esitetään pyynnöstä Verohallinnolle. Tilanne on tuttu esimerkiksi Virossa rekisteröidyssä työsuhdeautossa – selvitä ehdot ennen kuin auto otetaan käyttöön Suomessa.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Ajopäiväkirja aloitetaan vasta, kun Verohallinto pyytää selvitystä. Jälkikäteen kootusta luettelosta puuttuvat yleensä kellonajat ja mittarilukemat, ja sen luotettavuutta on vaikea osoittaa.',
          'Koko vuoden kilometrit puuttuvat. Pelkät liikeajot eivät riitä: ilman kokonaiskilometrejä lisävähennystä ei myönnetä.',
          'Kuukausittaiset yhteissummat ja ylimalkaiset kohteet, kuten ”Turku” tai ”asiakaskäynnit”. Verohallinnon esimerkissä tällainen ajopäiväkirja johti veronkorotukseen.',
          'Kotoa omalle toimipaikalle ajetut matkat merkitään liikeajoiksi. Ne ovat yksityisajoa.',
          'Lisävähennys haetaan vanhempien, sukulaisen tai leasingyhtiön autosta. Siitä saa vähentää vain todelliset kulut.',
          'Samat autokulut vähennetään kahdesti: kirjanpidossa ja täysimääräisenä lisävähennyksenä. Kirjanpidossa vähennetyt kulut pienentävät lisävähennystä.',
          'GPS-sovelluksen raakadata ilman ajon tarkoitusta ja kuljettajaa.',
          'Osakeyhtiön omistaja hakee lisävähennystä. Hänen matkansa korvataan matkalaskulla, ja yhtiön auton yksityiskäyttö on autoetua.',
        ] },
        { t: 'h2', x: 'Apua autokuluihin ja ajopäiväkirjaan' },
        { t: 'p', x: 'Hoidamme toiminimien ja osakeyhtiöiden kirjanpidon, palkanlaskennan ja veroilmoitukset. Tarkistamme, kuuluuko auto yritykseen vai yksityistalouteen, laskemme lisävähennyksen tai yksityisajojen osuuden ajopäiväkirjan perusteella ja käsittelemme autoedut ja matkalaskut palkanlaskennassa. Palvelemme suomeksi ja venäjäksi – ota yhteyttä, niin käydään yrityksesi autoasiat läpi.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: yrittäjän ajoneuvojen kulut ja ajopäiväkirja', href: SRC.vehicleFi },
          { label: 'Verohallinto: syventävä ohje liikkeen- ja ammatinharjoittajien matkakustannusten vähentämisestä', href: SRC.guide48192 },
          { label: 'Verohallinto: elinkeinotoiminnan veroilmoituksen täyttöohje', href: SRC.returnFi },
          { label: 'Verohallinto: työsuhde-edut ja autoetu', href: SRC.benefitsFi },
          { label: 'Verohallinto: syventävä ohje luontoiseduista verotuksessa', href: SRC.guide47886 },
          { label: 'Verohallinto: syventävä ohje työmatkakustannusten korvauksista (matkalasku)', href: SRC.guide48013 },
          { label: 'Verohallinto: kuitit ja tositteet – säilytysaika', href: SRC.receiptsFi },
          { label: 'Verohallinto: päätös ajoneuvon käytöstä pidettävästä ajopäiväkirjasta', href: SRC.foreignCarFi },
          { label: 'Finlex: laki elinkeinotulon verottamisesta (360/1968), 55 §', href: SRC.evl },
          { label: 'Finlex: kirjanpitolaki (1336/1997), 2 luvun 10 §', href: SRC.kpl },
          { label: 'Finlex: laki verotusmenettelystä (1558/1995)', href: SRC.vml },
        ] },
      ],
      faq: [
        { q: 'Onko ajopäiväkirja pakollinen?', a: 'Ei jokaiselle. Toiminimiyrittäjä tarvitsee ajopäiväkirjan tai muun luotettavan selvityksen, jotta hän saa liikeajoista lisävähennyksen tai voi laskea yritysauton yksityisajojen osuuden. Autoedun saaja tarvitsee sen, jos edun arvo lasketaan kilometrien mukaan tai jos hän vaatii arvon alentamista. Työntekijä, joka saa kilometrikorvausta, esittää matkalaskun.' },
        { q: 'Mikä on yrittäjän auton 50 %:n raja?', a: 'Jos elinkeinotoimintaan hankitulla autolla ajetaan verovuonna yli 50 % liikeajoa, auto kuuluu yritykseen ja kulut vähennetään todellisina. Jos liikeajoa on 50 % tai vähemmän, auto kuuluu yksityistalouteen ja liikeajoista saa lisävähennyksen, vuonna 2026 enintään 0,55 €/km. Raja ratkaistaan jokaiselta verovuodelta erikseen ajopäiväkirjan kilometreillä.' },
        { q: 'Kelpaako puhelinsovellus tai GPS-ajopäiväkirja?', a: 'Kelpaa, kun siitä näkyvät samat tiedot kuin paperisesta: ajon alku- ja loppuaika, paikat, pituus, mittarilukemat, tarkoitus ja kuljettaja sekä koko vuoden kilometrit. Verohallinnon luontoisetuohjeen mukaan ajopäiväkirja voi olla manuaalinen tai elektroninen. GPS ei tiedä ajon tarkoitusta, joten se on lisättävä itse.' },
        { q: 'Mitä tapahtuu, jos ajopäiväkirjaa ei ole?', a: 'Liikeajot on silloin osoitettava muulla luotettavalla selvityksellä, ja auton koko vuoden kilometrit on selvitettävä aina. Ilman kokonaiskilometrejä lisävähennystä ei myönnetä; vähentää voi vain todelliset kulut tai niiden puuttuessa matkakuluvähennyksen kilometrimäärän. Puutteellinen selvitys voi johtaa myös veronkorotukseen.' },
        { q: 'Kuinka kauan ajopäiväkirja pitää säilyttää?', a: 'Toiminimiyrittäjän kannattaa säilyttää se kirjanpitoaineiston mukana vähintään yhtä kauan kuin tositteet, eli kuusi vuotta sen vuoden lopusta, jonka aikana tilikausi päättyi. Palkansaajan kuitit ja tositteet, myös ajopäiväkirja, säilytetään 3 vuotta verovuoden päättymisestä.' },
        { q: 'Riittääkö, että merkitsen kuukauden kilometrit yhteen?', a: 'Ei. Jokaisesta liikeajosta on merkittävä aika, paikat, pituus, tarkoitus, mittarilukemat ja kuljettaja. Verohallinnon esimerkissä pelkät kuukausisummat ja ylimalkaiset kohteet johtivat siihen, että suurin osa vähennyksestä hylättiin ja yrittäjälle määrättiin veronkorotus.' },
      ],
    },
    ru: {
      title: 'Журнал поездок (ajopäiväkirja) в Финляндии: что требует налоговая',
      description:
        'Журнал поездок в Финляндии: порог 50 % для машины предпринимателя, вычет за км, автольгота, что записывать, приложение, срок хранения и частые ошибки.',
      lead: 'Журнал поездок (ajopäiväkirja) — главное доказательство для финской налоговой (Verohallinto) того, сколько машина проехала по работе или по делам фирмы, а сколько — в личных целях. Для предпринимателя с toiminimi от журнала зависит, относится ли машина к фирме и полагается ли дополнительный вычет за деловые поездки. Работнику с автомобильной льготой он может снизить её налоговую стоимость, а владельцу osakeyhtiö — отделить поездки компании от личных. Разбираем, кому нужен журнал, что в него записывать, подходит ли приложение, что будет без журнала и сколько его хранить.',
      body: [
        { t: 'h2', x: 'Кому нужен журнал поездок?' },
        { t: 'p', x: 'Журнал требуется не от каждого водителя. Он нужен, когда налогообложение зависит от того, как километры делятся на рабочие или деловые и личные поездки. Типичные ситуации:' },
        { t: 'ul', items: [
          'Предприниматель с toiminimi ездит по делам на своей машине. По журналу видно, относится ли машина к предпринимательской деятельности или к личному хозяйству и какой дополнительный вычет полагается за деловые поездки.',
          'Машина предпринимателя с toiminimi относится к фирме. По личным километрам из журнала считают, какая часть расходов на машину не вычитается.',
          'Работник ездит в служебные поездки на своей машине. Его доказательство — отчёт о поездке (matkalasku), по которому работодатель платит километровую компенсацию.',
          'У работника есть автомобильная льгота (autoetu). Журнал нужен, если стоимость льготы считают по личным километрам или если её хотят снизить.',
          'Владелец osakeyhtiö или товарищества (ay, ky) ездит по делам компании на своей машине или пользуется машиной компании. Поездки подтверждают отчётом о поездке, а личное использование машины компании — это автомобильная льгота.',
        ] },
        { t: 'note', x: 'Журнал не прикладывают к налоговой декларации. Налоговая запрашивает его при необходимости, поэтому он должен быть сохранён и в порядке, когда придёт запрос, — часто через несколько лет после поездок.' },
        { t: 'h2', x: 'Предприниматель с toiminimi: порог 50 % решает, чья машина' },
        { t: 'p', x: 'Налогообложение машины предпринимателя с toiminimi зависит от того, относится ли она к предпринимательской деятельности или к личному хозяйству. Машина относится к деятельности фирмы, если она приобретена для неё и больше 50 % пробега составляют деловые поездки. Если деловых поездок 50 % или меньше пробега за налоговый год, машина относится к личному хозяйству.' },
        { t: 'p', x: 'Порог проверяют отдельно за каждый налоговый год. Высший административный суд (KHO 23.1.2012/64) указал, что условия дополнительного вычета определяются по поездкам конкретного года, а личные поездки в предыдущие или последующие годы значения не имеют. Период — это финансовый год (tilikausi) предпринимателя; если деятельность началась в середине года, поездки до её начала не учитываются. Поэтому налоговая советует вести журнал с самого начала деятельности.' },
        { t: 'p', x: 'Машину супруга оценивают так же, как собственную. За машины других людей — например, родителей, братьев и сестёр или гражданского партнёра, который не считается супругом для налогов, — дополнительного вычета нет, вычитаются только фактические расходы. Вычета нет и за машину в лизинге, если право собственности не переходит к предпринимателю, и за служебную машину, полученную от работодателя как льготу.' },
        { t: 'h3', x: 'Машина в личном хозяйстве: дополнительный вычет за деловые поездки' },
        { t: 'p', x: 'Если предприниматель ездит по делам фирмы на машине из личного хозяйства, он получает в налогообложении дополнительный вычет (lisävähennys). Он не больше необлагаемой километровой компенсации работника: за километры 2026 года — до 0,55 €/км (за поездки 2025 года — 0,59 €/км). Расходы на машину, уже вычтенные в бухгалтерии, уменьшают вычет, а если фактические расходы больше максимума, вычитаются только они. По закону о налогообложении предпринимательского дохода (EVL, § 55) для вычета нужен журнал поездок или другое надёжное подтверждение использования машины и деловых поездок.' },
        { t: 'p', x: 'Пример: в 2026 году машина проехала 20 000 км, из них по делам — 6 000 км. Машина в личном хозяйстве, расходы на неё в бухгалтерии не учтены. Дополнительный вычет: 6 000 × 0,55 € = 3 300 €. Без общего пробега за год сравнение невозможно, и вычет не дадут.' },
        { t: 'p', x: 'Если машиной предпринимателя управляет другой человек, например его работник, дополнительный вычет полагается, только если сам предприниматель или супруг, ведущий бизнес вместе с ним, едет в машине. Иначе расходы на поездку вычитаются в фактическом размере.' },
        { t: 'h3', x: 'Машина фирмы: доля личных поездок' },
        { t: 'p', x: 'Если машина относится к деятельности фирмы, вычитаются фактические расходы и амортизация, отражённые в бухгалтерии. Доля личных поездок не вычитается: расходы и годовую амортизацию делят на общий пробег за год и умножают на личные километры из журнала. Если расходы на личные поездки уже вычтены в бухгалтерии, такую же сумму добавляют к доходам фирмы в декларации.' },
        { t: 'p', x: 'Пример: расходы на машину 6 000 €, амортизация 2 000 €, всего 8 000 €. Пробег 25 000 км, из них личных 5 000 км. Цена километра 8 000 € / 25 000 км = 0,32 €, доля личных поездок 5 000 × 0,32 € = 1 600 €. Если личные поездки не удаётся надёжно подтвердить, их долю приходится оценивать.' },
        { t: 'p', x: 'Машина, купленная для фирмы, не выходит из её имущества только потому, что в каком-то году доля деловых поездок временно упала ниже половины: принадлежность машины к активам фирмы оценивают по обстоятельствам нескольких лет.' },
        { t: 'h3', x: 'Какие поездки считаются деловыми?' },
        { t: 'ul', items: [
          'Поездки в зоне деятельности фирмы — например, за товаром на склад или к клиенту.',
          'Поездки между постоянными местами деятельности фирмы.',
          'Временные поездки за пределы обычной зоны деятельности фирмы.',
          'Личной поездкой, напротив, считается дорога из дома в своё помещение фирмы и обратно. Если постоянных мест несколько, личная поездка — это дорога из дома в первое из них вне дома и путь домой в конце дня. Дорогу дом–работа вычитают в личном налогообложении как транспортные расходы.',
        ] },
        { t: 'h2', x: 'Что записывать в журнал предпринимателя?' },
        { t: 'p', x: 'По требованию налоговой в журнале должен быть общий пробег машины за налоговый год. Для каждой деловой поездки записывают:' },
        { t: 'ul', items: [
          'время начала и окончания поездки',
          'место начала и окончания, при необходимости маршрут',
          'расстояние',
          'цель поездки',
          'показания одометра в начале и в конце',
          'кто управлял машиной.',
        ] },
        { t: 'p', x: 'Общий пробег проще всего подтвердить показаниями одометра в первый и последний день года (или финансового года). Одна запись может выглядеть так: 12.3.2026, 8.10–11.40, офис в Вантаа – клиент в Эспоо – офис в Вантаа, 46 км, одометр 48 210 → 48 256, установка оборудования у клиента, за рулём предприниматель.' },
        { t: 'p', x: 'Если за те же поездки заявляют и вычет за временную командировку в размере суточных, в подтверждении по дням должны быть видны места назначения, расстояния и продолжительность, и составлять его нужно по реальному времени. Суммы и условия суточных собраны в нашем гиде «Километровые, суточные и компенсация питания в Финляндии в 2026 году».' },
        { t: 'note', x: 'В примере из инструкции налоговой предприниматель записывал в журнал только месячный пробег, для большинства поездок — лишь название города или региона и ни для одной поездки — время. Вычет признали только за 88 дней, по которым места и маршруты были записаны подробнее. За 150 дней требование отклонили и начислили штрафную надбавку к налогу (veronkorotus).' },
        { t: 'h2', x: 'Работник на своей машине: доказательство — отчёт о поездке' },
        { t: 'p', x: 'Когда работник едет в служебную поездку на своей машине, работодатель может выплатить необлагаемую километровую компенсацию — в 2026 году до 0,55 €/км. Доказательство работника — не отдельный журнал, а отчёт о поездке (matkalasku), который он подаёт работодателю. В отчёте должны быть:' },
        { t: 'ul', items: [
          'цель и место назначения поездки (адрес)',
          'при необходимости маршрут',
          'способ передвижения, то есть транспортное средство',
          'дата и время начала и окончания поездки',
          'для заграничных поездок — страна или регион, где закончились командировочные сутки',
          'для километровой компенсации — ещё пробег и ставка за километр.',
        ] },
        { t: 'p', x: 'Отчёт можно составить и в электронном приложении, если в нём есть все обязательные данные. Многие всё равно ведут собственный журнал, из которого отчёт собрать проще. Если у работника свободная автольгота (vapaa autoetu), за рабочие поездки на этой машине необлагаемые километровые платить нельзя. Водителю машины с льготой на пользование (käyttöetu), который сам платит за топливо, можно без налога возместить расходы на топливо до 0,11 €/км. Повышения ставки, суточные и подачу данных в Tulorekisteri мы разобрали в гиде о километровых.' },
        { t: 'h2', x: 'Автомобильная льгота: личные поездки и журнал' },
        { t: 'p', x: 'Автомобильная льгота (autoetu) возникает, когда работник или его семья пользуются легковой машиной или фургоном работодателя в личных целях. Дорога между домом и работой тоже считается личной поездкой. При свободной льготе (vapaa autoetu) все расходы на машину несёт работодатель, при льготе на пользование (käyttöetu) работник платит сам как минимум за топливо или электричество.' },
        { t: 'p', x: 'Месячная стоимость льготы рассчитана исходя из 1 500 км личных поездок в месяц, то есть 18 000 км в год. Журнал влияет на стоимость так:' },
        { t: 'ul', items: [
          'Расчёт по километрам: если расходы считают по личным километрам, личные поездки нужно записывать в журнал. Выбранный способ применяют последовательно, и месячная стоимость тогда не ограничивает размер льготы.',
          'Снижение стоимости: если личные поездки по журналу меньше 18 000 км в год, работник может потребовать снижения стоимости льготы в предзаполненной декларации.',
          'Много рабочих поездок: если рабочих поездок за календарный год больше 30 000 км, базовая стоимость льготы составляет 80 % от обычной. Порог строгий, и журнал проверяют в конце года.',
          'Повышение стоимости: если личных поездок больше 18 000 км за календарный год или больше 1 500 км за месяц пользования льготой, налоговую стоимость нужно повысить.',
          'Несколько водителей: если машиной пользуются несколько работников, деление льготы по километрам всегда требует журнала или другого надёжного подтверждения.',
        ] },
        { t: 'p', x: 'Журнал для автольготы может быть бумажным или электронным. В нём по дням указывают пробег с разбивкой на рабочие и личные поездки. Для рабочих поездок дополнительно записывают время начала и окончания, место начала и окончания (при необходимости маршрут), показания одометра и расстояние, цель и водителя. Для личных поездок достаточно километров. Работник хранит журнал сам и передаёт его налоговой только по запросу.' },
        { t: 'h2', x: 'Osakeyhtiö и товарищества' },
        { t: 'p', x: 'Дополнительный вычет есть только у частного предпринимателя (liikkeen- tai ammatinharjoittaja). Он не применяется к акционерам osakeyhtiö и к участникам avoin yhtiö и kommandiittiyhtiö. У владельца компании обычно две ситуации:' },
        { t: 'ul', items: [
          'Владелец ездит по делам компании на своей машине. Компания может платить ему необлагаемые километровые, даже если он не получает зарплату, — при соблюдении условий решения налоговой и если на поездки составлен отчёт о поездке в бухгалтерию компании.',
          'Владелец пользуется машиной компании и в личных целях, включая дорогу дом–работа. Это автомобильная льгота. Её оценивают по решению налоговой о натуральных льготах, если льгота отражена в бухгалтерии как зарплата и подана в Tulorekisteri; необычные или необоснованные льготы могут облагаться как скрытые дивиденды.',
        ] },
        { t: 'p', x: 'Для машины компании журнал — это тот материал, которым владелец подтверждает объём личных поездок, если хочет расчёт льготы по километрам или требует снизить её стоимость.' },
        { t: 'h2', x: 'Подходит ли электронный журнал или GPS-приложение?' },
        { t: 'p', x: 'Подходит, если в нём есть те же данные, что и в бумажном. По инструкции налоговой о натуральных льготах журнал может быть ручным или электронным, а работодатель может установить в служебную машину GPS-сервис учёта поездок, заменяющий журнал. Отчёт о поездке тоже можно составить в приложении. Для вычета предпринимателя закон форму не устанавливает — он требует журнал или другое надёжное подтверждение.' },
        { t: 'p', x: 'При выборе приложения проверьте три вещи:' },
        { t: 'ul', items: [
          'GPS записывает время, места и километры, но не цель поездки. Цель и водителя нужно добавить к каждой деловой поездке.',
          'Должен быть виден пробег за весь год, включая личные поездки, — одних деловых недостаточно.',
          'Данные должны распечатываться или выгружаться в файл. По закону о бухгалтерском учёте материалы учёта должны быть доступны для просмотра и при необходимости для печати в понятном виде, и их нельзя менять после составления финансовой отчётности. Сохраняйте поездки за год не позднее закрытия года, чтобы данные не пропали при смене приложения.',
        ] },
        { t: 'p', x: 'Для клиентов бюро в приложении Vaavo можно также включить электронный журнал поездок.' },
        { t: 'h2', x: 'Что, если журнал не вели?' },
        { t: 'p', x: 'Отсутствие журнала само по себе не лишает вычета, но тогда предпринимателю нужно подтвердить поездки иначе. По инструкции налоговой:' },
        { t: 'ul', items: [
          'Дополнительный вычет без журнала возможен, только если деловой пробег можно надёжно установить другим способом. Для регулярных поездок, например раз в неделю к одному и тому же объекту, указывают длину поездки и сколько раз в год она совершалась.',
          'Общий пробег машины за год нужно подтвердить всегда. Без него нельзя проверить, что машина относится к личному хозяйству, и вычет не дают.',
          'Тогда в первую очередь вычитают фактические расходы на деловые поездки — например, по чекам за топливо. Если и их не установить, вычет считают по ставке для дороги дом–работа (за 2025 год для машины 0,27 €/км), а это заметно меньше километровой компенсации. Условие — расходы действительно возникли.',
          'Если личные поездки на машине фирмы невозможно надёжно подтвердить, их долю оценивают.',
          'Если надёжного подтверждения деловых поездок нет совсем, расходы на личную машину из предпринимательского дохода не вычитаются вовсе.',
        ] },
        { t: 'p', x: 'Для автольготы без журнала применяется месячная стоимость, и снижения из-за небольших личных поездок не потребовать. Неполное подтверждение может привести и к штрафной надбавке к налогу (veronkorotus). По закону о налоговой процедуре она, как правило, составляет 2 % от доначисленного дохода, а в отдельных случаях — 3–10 %. Надбавку не назначают, если упущение незначительно или для него есть уважительная причина.' },
        { t: 'h2', x: 'Сколько хранить журнал поездок?' },
        { t: 'ul', items: [
          'Предприниматель с toiminimi: физическое лицо, ведущее предпринимательскую или профессиональную деятельность, обязано вести бухгалтерию. По закону о бухгалтерском учёте документы и прочие материалы учёта хранят не меньше шести лет с конца года, в котором закончился финансовый год, а учётные регистры и финансовую отчётность — не меньше 10 лет. Журнал — основа для расходов на машину и вычета, поэтому его разумно хранить вместе с материалами бухгалтерии не меньше, чем документы.',
          'Работник: чеки и документы к декларации хранят 3 года с конца налогового года. По указанию налоговой журнал поездок, если он есть, нужно сохранить, даже если документы о расходах на дорогу дом–работа хранить не требуется. Хранить можно и в электронном виде.',
          'Работодатель: отчёты о поездках с приложениями — это документы для проводок по компенсациям, на них распространяются сроки хранения по закону о бухгалтерском учёте.',
        ] },
        { t: 'h3', x: 'Служебная машина, зарегистрированная за границей' },
        { t: 'p', x: 'Отдельная обязанность вести журнал есть в налогообложении автомобилей (autovero). Постоянно живущий в Финляндии работник или самозанятый профессионал и члены его семьи должны вести бумажный или электронный журнал, если пользуются зарегистрированной за границей служебной машиной по § 39 закона об автомобильном налоге. Одно из условий необлагаемого использования — в каждом 12-месячном периоде машиной пользуются меньше дней в Финляндии, чем за границей. В журнал по дням или по поездкам записывают дату использования или время начала и окончания поездки, километры или показания одометра, страну использования и водителя, а также число дней использования в Финляндии и за границей за 12-месячный период. Журнал хранят так, чтобы исходные данные можно было проверить, и предъявляют налоговой по запросу. Такая ситуация знакома, например, со служебной машиной, зарегистрированной в Эстонии, — выясните условия до того, как начнёте ездить на ней в Финляндии.' },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Журнал начинают вести, только когда налоговая запросила подтверждение. В списке, составленном задним числом, обычно нет времени и показаний одометра, и его достоверность трудно доказать.',
          'Нет общего пробега за год. Одних деловых поездок мало: без общего пробега дополнительный вычет не дают.',
          'Месячные итоги и общие формулировки вроде «Турку» или «визиты к клиентам». В примере налоговой такой журнал закончился штрафной надбавкой.',
          'Дорогу из дома в собственный офис записывают как деловую. Это личная поездка.',
          'Вычет заявляют за машину родителей, родственника или лизинговой компании. За неё можно вычесть только фактические расходы.',
          'Одни и те же расходы вычитают дважды: в бухгалтерии и полным дополнительным вычетом. Расходы, учтённые в бухгалтерии, уменьшают вычет.',
          'Сырые данные GPS без цели поездки и водителя.',
          'Владелец osakeyhtiö заявляет дополнительный вычет. Его поездки возмещаются по отчёту о поездке, а личное использование машины компании — это автольгота.',
        ] },
        { t: 'h2', x: 'Поможем с расходами на машину и журналом' },
        { t: 'p', x: 'Ведём бухгалтерию, расчёт зарплаты и декларации для toiminimi и osakeyhtiö. Проверяем, относится ли машина к фирме или к личному хозяйству, рассчитываем дополнительный вычет или долю личных поездок по журналу и оформляем автольготы и отчёты о поездках в расчёте зарплаты. Работаем на русском и финском — напишите нам, и мы разберём автомобильные вопросы вашей компании.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: расходы предпринимателя на автомобиль и журнал поездок (на английском)', href: SRC.vehicleEn },
          { label: 'Vero: подробная инструкция о вычете транспортных расходов предпринимателя (на финском)', href: SRC.guide48192 },
          { label: 'Vero: инструкция к декларации предпринимателя (на финском)', href: SRC.returnFi },
          { label: 'Vero: льготы от работодателя и автольгота (на английском)', href: SRC.benefitsEn },
          { label: 'Vero: подробная инструкция о натуральных льготах (на финском)', href: SRC.guide47886 },
          { label: 'Vero: подробная инструкция о компенсациях служебных поездок и отчёте о поездке (на финском)', href: SRC.guide48013 },
          { label: 'Vero: чеки и документы — срок хранения (на английском)', href: SRC.receiptsEn },
          { label: 'Vero: решение о журнале поездок для автомобильного налога (на финском)', href: SRC.foreignCarFi },
          { label: 'Finlex: закон о налогообложении предпринимательского дохода, § 55 (на финском)', href: SRC.evl },
          { label: 'Finlex: закон о бухгалтерском учёте, гл. 2 § 10 (на финском)', href: SRC.kpl },
          { label: 'Finlex: закон о налоговой процедуре (на финском)', href: SRC.vml },
        ] },
      ],
      faq: [
        { q: 'Обязателен ли журнал поездок?', a: 'Не для всех. Предпринимателю с toiminimi журнал или другое надёжное подтверждение нужны, чтобы получить дополнительный вычет за деловые поездки или рассчитать долю личных поездок на машине фирмы. Работнику с автольготой — если стоимость льготы считают по километрам или он требует её снизить. Работник, получающий километровые, подаёт отчёт о поездке.' },
        { q: 'Что такое порог 50 % для машины предпринимателя?', a: 'Если на машине, купленной для фирмы, за налоговый год больше 50 % пробега — деловые поездки, машина относится к фирме, и расходы вычитаются фактические. Если деловых поездок 50 % или меньше, машина в личном хозяйстве, а за деловые поездки полагается дополнительный вычет — в 2026 году до 0,55 €/км. Порог определяют за каждый год отдельно по километрам из журнала.' },
        { q: 'Подходит ли приложение на телефоне или GPS-журнал?', a: 'Да, если в нём есть те же данные, что и в бумажном: время начала и окончания, места, расстояние, показания одометра, цель и водитель, а также пробег за весь год. По инструкции налоговой журнал может быть ручным или электронным. GPS не знает цели поездки — её нужно добавить самому.' },
        { q: 'Что будет, если журнала нет?', a: 'Тогда деловые поездки нужно подтвердить другим надёжным способом, а общий пробег за год — всегда. Без общего пробега дополнительный вычет не дают: можно вычесть только фактические расходы, а при их отсутствии — сумму по ставке для дороги дом–работа. Неполное подтверждение может привести и к штрафной надбавке к налогу.' },
        { q: 'Сколько хранить журнал?', a: 'Предпринимателю с toiminimi разумно хранить его вместе с бухгалтерией не меньше, чем документы, — шесть лет с конца года, в котором закончился финансовый год. Работник хранит чеки и документы к декларации, включая журнал, 3 года с конца налогового года.' },
        { q: 'Достаточно ли записывать километры за месяц одной суммой?', a: 'Нет. Для каждой деловой поездки нужны время, места, расстояние, цель, показания одометра и водитель. В примере налоговой из-за одних месячных итогов и общих формулировок большую часть вычета отклонили и начислили штрафную надбавку.' },
      ],
    },
    en: {
      title: 'Driver’s log (ajopäiväkirja) in Finland: what the Tax Administration requires',
      description:
        'Driver’s log in Finland: the 50 % rule for a sole trader’s car, per-km deduction, car benefit, what to record, apps, how long to keep it and common mistakes.',
      lead: 'For the Finnish Tax Administration (Verohallinto), the driver’s log (ajopäiväkirja) is the main evidence of how much a car has been driven for work or business and how much privately. For a sole trader (toiminimi), it decides whether the car belongs to the business and whether business drives earn an additional deduction. For an employee with a car benefit, it can lower the benefit’s taxable value, and for the owner of a limited company it separates the company’s drives from private ones. We explain who needs a log, what goes into it, whether an app is acceptable, what happens without one and how long to keep it.',
      body: [
        { t: 'h2', x: 'Who needs a driver’s log?' },
        { t: 'p', x: 'Not every driver has to keep a log. It is needed when taxation depends on how the kilometres split between work or business drives and private drives. The usual situations:' },
        { t: 'ul', items: [
          'A sole trader drives for the business in their own car. The log shows whether the car belongs to the business or to private use and how large an additional deduction the business drives earn.',
          'A sole trader’s car belongs to the business. The private kilometres in the log determine the share of car costs that is not deductible.',
          'An employee makes work trips in their own car. Their evidence is the travel expense claim (matkalasku) on which the employer pays the kilometre allowance.',
          'An employee has a car benefit (autoetu). A log is needed if the benefit is valued by private kilometres or if a lower taxable value is claimed.',
          'The owner of a limited company or partnership drives for the company in their own car or uses the company’s car. Trips are shown with a travel expense claim, and private use of the company car is a car benefit.',
        ] },
        { t: 'note', x: 'The log is not attached to the tax return. The Tax Administration asks for it when needed, so it must be kept safe and in order when the request comes – often years after the drives.' },
        { t: 'h2', x: 'Sole trader: the 50 % rule decides where the car belongs' },
        { t: 'p', x: 'How a sole trader’s car is taxed depends on whether it belongs to the business or to private use. The car belongs to the business when it was acquired for business use and more than 50 % of the kilometres are business drives. If business drives are 50 % or less of the year’s kilometres, the car belongs to private use.' },
        { t: 'p', x: 'The limit is checked separately for each tax year. The Supreme Administrative Court (KHO 23.1.2012/64) has held that the conditions for the additional deduction are decided on the drives of that tax year; private driving in earlier or later years is irrelevant. The period is the trader’s financial year, and if the business starts mid-year, drives before the start do not count. That is why the Tax Administration advises keeping a log from the very start of the business.' },
        { t: 'p', x: 'A car owned by your spouse is assessed in the same way as your own. Cars owned by others – for example parents, siblings or a cohabiting partner who is not a spouse for tax purposes – do not qualify for the additional deduction; only actual costs can be deducted. Nor is there an additional deduction for a leased car whose ownership does not pass to the trader, or for a car received from an employer as a car benefit.' },
        { t: 'h3', x: 'Private car: additional deduction for business drives' },
        { t: 'p', x: 'When a sole trader makes business drives in a car that belongs to private use, they get an additional deduction (lisävähennys) in taxation. It is at most the employee’s tax-free kilometre allowance: up to €0.55/km for kilometres driven in 2026 (€0.59/km for 2025). Car costs already deducted in the books reduce the additional deduction, and if actual costs exceed the maximum, only the actual costs are deducted. Under section 55 of the Business Income Tax Act (EVL), the deduction requires a driver’s log or other reliable evidence of the car’s use and the business trips.' },
        { t: 'p', x: 'Example: in 2026 the car is driven 20,000 km in total, 6,000 km of it on business. The car belongs to private use and no car costs have been booked. The additional deduction is 6,000 × €0.55 = €3,300. Without the year’s total kilometres no comparison can be made, and no additional deduction is granted.' },
        { t: 'p', x: 'If someone else, such as the trader’s employee, drives the trader’s car, the additional deduction applies only if the trader – or a spouse running the business together with them – is in the car. Otherwise the trip costs are deducted at actual amounts.' },
        { t: 'h3', x: 'Business car: the private-use share' },
        { t: 'p', x: 'When the car belongs to the business, the actual car costs and depreciation recorded in the books are deducted. The private share is not deductible: divide the car costs and the annual depreciation by the year’s total kilometres and multiply by the private kilometres in the log. If the private share was deducted in the books, the same amount is added to the business income on the tax return.' },
        { t: 'p', x: 'Example: car costs €6,000 and depreciation €2,000, €8,000 in total. The car was driven 25,000 km, 5,000 km of it privately. The cost per kilometre is €8,000 / 25,000 km = €0.32, and the private share 5,000 × €0.32 = €1,600. If private drives cannot be shown reliably, their share has to be estimated.' },
        { t: 'p', x: 'A car acquired for the business does not leave the business assets just because business use temporarily drops below half in one year: whether the car belongs to the business net assets is assessed over more than one year.' },
        { t: 'h3', x: 'Which drives are business drives?' },
        { t: 'ul', items: [
          'Drives within the business’s area of operation, such as fetching goods from a warehouse or visiting a customer.',
          'Drives between the business’s permanent premises.',
          'Temporary trips outside the business’s usual area of operation.',
          'A drive from home to your own business premises and back, on the other hand, is private. With several permanent premises, the drive from home to the first premises outside the home and the drive home at the end of the day are private. Home–work trips are deducted as travel expenses in personal taxation.',
        ] },
        { t: 'h2', x: 'What goes into a sole trader’s driver’s log?' },
        { t: 'p', x: 'According to the Tax Administration, the log must show the total kilometres driven in the car during the tax year. For each business drive, record:' },
        { t: 'ul', items: [
          'the start and end time of the drive',
          'the start and end point and, where needed, the route',
          'the length of the trip',
          'the purpose of the drive',
          'the odometer reading at the start and end',
          'the driver.',
        ] },
        { t: 'p', x: 'The year’s total kilometres are easiest to prove with odometer readings on the first and last day of the year (or financial year). A single entry could look like this: 12.3.2026, 8:10–11:40, office in Vantaa – customer in Espoo – office in Vantaa, 46 km, odometer 48,210 → 48,256, installing equipment for the customer, driver: the trader.' },
        { t: 'p', x: 'If the same trips are also claimed as a temporary work trip deduction based on per diems, the record must show the destinations, distances and duration day by day, based on actual times. Per diem amounts and conditions are in our guide “Kilometre allowance, per diem and meal allowance in Finland 2026”.' },
        { t: 'note', x: 'In an example in the Tax Administration’s guidance, a trader had logged only monthly total kilometres, just the name of a city or region for most trips, and no times for any drive. The deduction was accepted only for the 88 days whose destinations and routes were recorded in more detail. For 150 days the claim was refused and a tax increase (veronkorotus) was imposed.' },
        { t: 'h2', x: 'Employee using their own car: the travel claim is the evidence' },
        { t: 'p', x: 'When an employee makes a work trip in their own car, the employer can pay a tax-free kilometre allowance of up to €0.55/km in 2026. The employee’s evidence is not a separate log but the travel expense claim (matkalasku) submitted to the employer. It must show:' },
        { t: 'ul', items: [
          'the purpose and destination of the trip (address)',
          'the route, where needed',
          'the means of travel',
          'the start and end dates and times of the trip',
          'for trips abroad, the country or region where each trip day ended',
          'for a kilometre allowance, also the kilometres driven and the rate per kilometre.',
        ] },
        { t: 'p', x: 'The claim can also be made in an electronic app if it contains the required details. Many people still keep their own log, which makes the claim easy to put together. If an employee has a full car benefit (vapaa autoetu), no tax-free kilometre allowance can be paid for work drives in that car. A driver of a limited car benefit (käyttöetu) car who pays for the fuel can be reimbursed tax-free for fuel up to €0.11/km. Rate increments, per diems and Incomes Register reporting are covered in our kilometre allowance guide.' },
        { t: 'h2', x: 'Car benefit: private driving and the log' },
        { t: 'p', x: 'A car benefit (autoetu) arises when an employee or their family uses the employer’s car or van for private driving. Driving between home and work is also private. With a full car benefit (vapaa autoetu) the employer pays all the car’s costs; with a limited car benefit (käyttöetu) the employee pays at least the fuel or charging.' },
        { t: 'p', x: 'The monthly value of the car benefit assumes 1,500 km of private driving a month, that is 18,000 km a year. The log affects the value as follows:' },
        { t: 'ul', items: [
          'Per-kilometre value: if the operating costs are calculated from private kilometres, a log of private driving must be kept. The chosen method must be applied consistently, and the monthly value then does not cap the benefit.',
          'Lower value: if private driving according to the log stays below 18,000 km a year, the employee can claim a reduced car benefit value on the pre-completed tax return.',
          'High work mileage: if work driving exceeds 30,000 km in a calendar year, the benefit’s base value is 80 % of normal. The limit is absolute, and the log must be checked at year-end.',
          'Higher value: if private driving exceeds 18,000 km in a calendar year or 1,500 km per month of benefit use, the taxable value must be increased.',
          'Several users: if several employees use the same car, splitting the benefit by kilometres always requires a log or other reliable evidence.',
        ] },
        { t: 'p', x: 'A car benefit log can be manual or electronic. It must show the kilometres driven each day, split between work and private driving. For work drives, also record the start and end time, start and end point (route where needed), odometer readings and trip length, the purpose and the driver. For private drives the kilometres are enough. The employee keeps the log and gives it to the Tax Administration only on request.' },
        { t: 'h2', x: 'Limited companies and partnerships' },
        { t: 'p', x: 'The additional deduction is available only to sole traders and self-employed professionals. It does not apply to shareholders of a limited company (osakeyhtiö) or partners in a general or limited partnership (ay, ky). A company owner typically faces two situations:' },
        { t: 'ul', items: [
          'The owner drives for the company in their own car. The company can pay a tax-free kilometre allowance even if the owner draws no salary, as long as the conditions of the Tax Administration’s decision are met and a travel expense claim is made for the company’s books.',
          'The owner uses the company’s car for private driving too, including home–work trips. That is a car benefit. It is valued under the fringe benefit decision if it is treated as salary in the books and reported to the Incomes Register; unusual or unjustified benefits can be taxed as a hidden dividend.',
        ] },
        { t: 'p', x: 'For a company car, the log is the material with which the owner shows how much private driving there really is if they want the per-kilometre value or claim a lower value.' },
        { t: 'h2', x: 'Is an electronic log or GPS app acceptable?' },
        { t: 'p', x: 'Yes, if it shows the same details as a paper log. According to the Tax Administration’s fringe benefit guidance, a log can be manual or electronic, and an employer can fit a benefit car with a GPS-based tracking service that replaces the log. Travel expense claims can be made in an app as well. For a sole trader’s additional deduction the law does not prescribe a format; it requires a driver’s log or other reliable evidence.' },
        { t: 'p', x: 'When choosing an app, check three things:' },
        { t: 'ul', items: [
          'GPS records times, places and kilometres, but not the purpose of a drive. The purpose and the driver must be added to every business drive.',
          'The whole year’s kilometres must be visible, private driving included – business drives alone are not enough.',
          'The data must be printable or exportable to a file. Under the Accounting Act, accounting material must be viewable and, where needed, printable in plain form, and its content may not be changed after the financial statements are prepared. Export the year’s drives at the latest when closing the year, so the data does not disappear if you switch apps.',
        ] },
        { t: 'p', x: 'For the firm’s clients, an electronic driver’s log can also be enabled in the Vaavo app.' },
        { t: 'h2', x: 'What if no log was kept?' },
        { t: 'p', x: 'A missing log does not by itself remove the deduction, but the trader must then prove the drives in another way. According to the Tax Administration’s guidance:' },
        { t: 'ul', items: [
          'An additional deduction without a log is possible only if the business kilometres can otherwise be established reliably. For regularly repeated trips, such as once a week to the same place, state the trip length and how many times a year it is made.',
          'The car’s total kilometres for the year must always be established. Without them it cannot be verified that the car belongs to private use, and no additional deduction is granted.',
          'In that case the actual costs of business drives are deducted first, for example from fuel receipts. If even those cannot be established, the deduction is calculated at the per-kilometre rate for home–work trips (€0.27/km for a car for tax year 2025), which is clearly lower than the kilometre allowance. The condition is that costs were actually incurred.',
          'If private drives in a business car cannot be shown reliably, their share is estimated.',
          'If there is no reliable evidence of business drives at all, no private car costs are deducted from business income.',
        ] },
        { t: 'p', x: 'For a car benefit without a log, the monthly value applies, and a reduction for low private mileage cannot be claimed. Inadequate evidence can also lead to a tax increase (veronkorotus). Under the Act on Assessment Procedure it is generally 2 % of the added income and 3–10 % in certain cases. It is not imposed if the failure is minor or there is a valid reason for it.' },
        { t: 'h2', x: 'How long must the log be kept?' },
        { t: 'ul', items: [
          'Sole trader: a natural person carrying on a business or profession is obliged to keep accounts. Under the Accounting Act, vouchers and other accounting material are kept for at least six years from the end of the year in which the financial year ended, and the books and financial statements for at least 10 years from the end of the financial year. The log supports the car costs and the additional deduction, so keep it with the accounting material for at least as long as the vouchers.',
          'Employee: receipts and documents for the tax return are kept for 3 years after the end of the tax year. The Tax Administration says a driver’s log, if you have one, must be kept even though documents on home–work travel otherwise need not be. Records may also be kept electronically.',
          'Employer: travel expense claims and their attachments are the vouchers for booking the reimbursements, so the Accounting Act retention periods apply to them.',
        ] },
        { t: 'h3', x: 'Work car registered abroad' },
        { t: 'p', x: 'A separate log obligation exists in car taxation. An employee or self-employed professional permanently resident in Finland, and their family members, must keep a paper or electronic log when using a work vehicle registered abroad under section 39 of the Car Tax Act. One condition for tax-free use is that, in each 12-month period, the vehicle is used on fewer days in Finland than abroad. The log records, per day or per drive, the day of use or the start and end time, the kilometres or odometer readings, the country of use and the driver, plus the total days of use in Finland and abroad over the 12-month period. It must be kept so that the original data can be verified and shown to the Tax Administration on request. This is familiar, for example, with a work car registered in Estonia – check the conditions before you start using the car in Finland.' },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'Starting the log only when the Tax Administration asks for evidence. A list put together afterwards usually lacks times and odometer readings, and its reliability is hard to show.',
          'No total kilometres for the year. Business drives alone are not enough: without the total, no additional deduction is granted.',
          'Monthly totals and vague destinations such as “Turku” or “customer visits”. In the Tax Administration’s example, such a log led to a tax increase.',
          'Logging the drive from home to your own premises as business driving. It is private.',
          'Claiming the additional deduction for a car owned by parents, a relative or a leasing company. Only actual costs can be deducted for it.',
          'Deducting the same car costs twice: in the books and as a full additional deduction. Costs deducted in the books reduce the additional deduction.',
          'Raw GPS data without the purpose of the drive and the driver.',
          'A limited company owner claiming the additional deduction. Their trips are reimbursed through a travel expense claim, and private use of the company car is a car benefit.',
        ] },
        { t: 'h2', x: 'Help with car costs and the driver’s log' },
        { t: 'p', x: 'We handle bookkeeping, payroll and tax returns for sole traders and limited companies. We check whether a car belongs to the business or to private use, calculate the additional deduction or the private-use share from the log, and handle car benefits and travel expense claims in payroll. We work in Finnish and Russian – get in touch and we will go through your company’s car matters.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Tax Administration: vehicle expenses of the self-employed and the driver’s log', href: SRC.vehicleEn },
          { label: 'Tax Administration: detailed guidance on deducting a trader’s travel expenses (in Finnish)', href: SRC.guide48192 },
          { label: 'Tax Administration: tax return instructions for traders (in Finnish)', href: SRC.returnFi },
          { label: 'Tax Administration: fringe benefits from employment and the car benefit', href: SRC.benefitsEn },
          { label: 'Tax Administration: detailed guidance on fringe benefits (in Finnish)', href: SRC.guide47886 },
          { label: 'Tax Administration: detailed guidance on travel reimbursements and the travel claim (in Finnish)', href: SRC.guide48013 },
          { label: 'Tax Administration: receipts and other documents – how long to keep them', href: SRC.receiptsEn },
          { label: 'Tax Administration: decision on the driver’s log for car tax purposes (in Finnish)', href: SRC.foreignCarFi },
          { label: 'Finlex: Business Income Tax Act (360/1968), section 55 (in Finnish)', href: SRC.evl },
          { label: 'Finlex: Accounting Act (1336/1997), chapter 2 section 10 (in Finnish)', href: SRC.kpl },
          { label: 'Finlex: Act on Assessment Procedure (1558/1995) (in Finnish)', href: SRC.vml },
        ] },
      ],
      faq: [
        { q: 'Is a driver’s log mandatory?', a: 'Not for everyone. A sole trader needs a log or other reliable evidence to get the additional deduction for business drives or to calculate the private share of a business car. An employee with a car benefit needs one if the benefit is valued by kilometres or a lower value is claimed. An employee receiving a kilometre allowance submits a travel expense claim.' },
        { q: 'What is the 50 % rule for a sole trader’s car?', a: 'If more than 50 % of the kilometres driven in a tax year in a car acquired for the business are business drives, the car belongs to the business and actual costs are deducted. If business drives are 50 % or less, the car belongs to private use and business drives earn an additional deduction of up to €0.55/km in 2026. The limit is decided for each tax year separately from the log’s kilometres.' },
        { q: 'Is a phone app or GPS log acceptable?', a: 'Yes, if it shows the same details as a paper log: start and end time, places, length, odometer readings, purpose and driver, plus the whole year’s kilometres. According to the Tax Administration’s guidance, a log can be manual or electronic. GPS does not know the purpose of a drive, so you must add it yourself.' },
        { q: 'What happens if there is no log?', a: 'Business drives must then be shown with other reliable evidence, and the year’s total kilometres must always be established. Without the total, no additional deduction is granted; only actual costs can be deducted or, failing those, an amount at the home–work travel rate. Inadequate evidence can also lead to a tax increase.' },
        { q: 'How long must a driver’s log be kept?', a: 'A sole trader should keep it with the accounting material for at least as long as the vouchers – six years from the end of the year in which the financial year ended. An employee keeps receipts and documents for the tax return, the log included, for 3 years after the end of the tax year.' },
        { q: 'Is it enough to record each month’s kilometres as one total?', a: 'No. Each business drive needs the time, places, length, purpose, odometer readings and driver. In the Tax Administration’s example, monthly totals and vague destinations led to most of the deduction being refused and a tax increase being imposed.' },
      ],
    },
    et: {
      title: 'Sõidupäevik (ajopäiväkirja) Soomes: mida maksuamet nõuab',
      description:
        'Sõidupäevik Soomes: ettevõtja auto 50 % piir, lisamahaarvamine, autosoodustus, mida kirja panna, rakendus, säilitamise aeg ja levinumad vead.',
      lead: 'Soome maksuametile (Verohallinto) on sõidupäevik (ajopäiväkirja) peamine tõend selle kohta, kui palju autoga on sõidetud töö- või ärisõite ja kui palju erasõite. Toiminimi-ettevõtjal sõltub sellest, kas auto kuulub ettevõttele ja kas ärisõitude eest saab lisamahaarvamise. Autosoodustusega töötajal võib see vähendada soodustuse maksustatavat väärtust ning osaühingu (osakeyhtiö) omanikul eraldab see ettevõtte sõidud isiklikest. Selgitame, kes vajab sõidupäevikut, mida sinna kirjutada, kas rakendus sobib, mis juhtub päevikuta ja kui kaua seda säilitada.',
      body: [
        { t: 'h2', x: 'Kes vajab sõidupäevikut?' },
        { t: 'p', x: 'Sõidupäevikut ei nõuta igalt autojuhilt. Seda on vaja siis, kui maksustamine sõltub sellest, kuidas kilomeetrid jagunevad töö- või ärisõitude ja erasõitude vahel. Tavalisemad olukorrad:' },
        { t: 'ul', items: [
          'Toiminimi-ettevõtja teeb oma autoga ärisõite. Päevikust selgub, kas auto kuulub ettevõtlusse või eratarbesse ja kui suure lisamahaarvamise ärisõitude eest saab.',
          'Toiminimi-ettevõtja auto kuulub ettevõttele. Päeviku erasõidukilomeetrite järgi arvutatakse, milline osa autokuludest ei ole mahaarvatav.',
          'Töötaja teeb töösõite oma autoga. Tema tõend on sõiduaruanne (matkalasku), mille alusel tööandja maksab kilomeetrihüvitist.',
          'Töötajal on autosoodustus (autoetu). Päevikut on vaja, kui soodustuse väärtus arvutatakse erasõidukilomeetrite järgi või kui soovitakse maksustatavat väärtust vähendada.',
          'Osaühingu või täis- või usaldusühingu (ay, ky) omanik sõidab ettevõtte asjus oma autoga või kasutab ettevõtte autot. Sõidud tõendatakse sõiduaruandega ja ettevõtte auto erakasutus on autosoodustus.',
        ] },
        { t: 'note', x: 'Sõidupäevikut ei lisata maksudeklaratsioonile. Maksuamet küsib seda vajadusel, nii et see peab olema alles ja korras siis, kui päring tuleb – sageli alles aastaid pärast sõite.' },
        { t: 'h2', x: 'Toiminimi-ettevõtja: 50 % piir otsustab, kuhu auto kuulub' },
        { t: 'p', x: 'Toiminimi-ettevõtja auto maksustamine sõltub sellest, kas auto kuulub ettevõtlusse või eratarbesse. Auto kuulub ettevõtlusse, kui see on soetatud ettevõtluse jaoks ja üle 50 % kilomeetritest on ärisõidud. Kui ärisõite on 50 % või vähem maksuaasta kilomeetritest, kuulub auto eratarbesse.' },
        { t: 'p', x: 'Piiri hinnatakse iga maksuaasta kohta eraldi. Kõrgeim halduskohus (KHO 23.1.2012/64) on leidnud, et lisamahaarvamise tingimused otsustatakse konkreetse maksuaasta sõitude põhjal; varasemate või hilisemate aastate erasõitudel ei ole tähtsust. Perioodiks on ettevõtja majandusaasta (tilikausi) ja kui tegevus algab aasta keskel, ei arvestata enne tegevuse algust tehtud sõite. Seepärast soovitab maksuamet pidada sõidupäevikut kohe tegevuse algusest.' },
        { t: 'p', x: 'Abikaasa auto kuuluvust hinnatakse samamoodi nagu oma autot. Teiste omanduses olevate autode eest – näiteks vanemate, õdede-vendade või elukaaslase, kes ei ole maksustamisel abikaasa – lisamahaarvamist ei saa, maha saab arvata ainult tegelikud kulud. Lisamahaarvamist ei saa ka liisingauto eest, mille omandiõigus ettevõtjale ei lähe, ega tööandjalt autosoodustusena saadud auto eest.' },
        { t: 'h3', x: 'Auto on eratarbes: lisamahaarvamine ärisõitude eest' },
        { t: 'p', x: 'Kui ettevõtja teeb eratarbesse kuuluva autoga ettevõtlusega seotud sõite, saab ta maksustamisel lisamahaarvamise (lisävähennys). See on kuni töötaja maksuvaba kilomeetrihüvitise suurune: 2026. aastal sõidetud kilomeetrite eest kuni 0,55 €/km (2025. aasta sõitude eest 0,59 €/km). Raamatupidamises juba maha arvatud autokulud vähendavad lisamahaarvamist ja kui tegelikud kulud on ülempiirist suuremad, arvatakse maha ainult tegelikud kulud. Ettevõtlustulu maksustamise seaduse (EVL) § 55 järgi eeldab mahaarvamine sõidupäevikut või muud usaldusväärset tõendit auto kasutamise ja ettevõtlusega seotud sõitude kohta.' },
        { t: 'p', x: 'Näide: 2026. aastal sõideti autoga kokku 20 000 km, millest ärisõite 6 000 km. Auto on eratarbes ja autokulusid ei ole raamatupidamisse kantud. Lisamahaarvamine on 6 000 × 0,55 € = 3 300 €. Ilma aasta kogukilomeetriteta ei saa võrdlust teha ja lisamahaarvamist ei anta.' },
        { t: 'p', x: 'Kui ettevõtja autot juhib keegi teine, näiteks ettevõtja töötaja, saab lisamahaarvamise ainult siis, kui ettevõtja ise või koos temaga ettevõtlust tegev abikaasa on sõidul kaasas. Muul juhul arvatakse sõidu kulud maha tegelikus summas.' },
        { t: 'h3', x: 'Auto kuulub ettevõttele: erasõitude osa' },
        { t: 'p', x: 'Kui auto kuulub ettevõtlusse, arvatakse maha tegelikud, raamatupidamisse kantud autokulud ja amortisatsioon. Erasõitude osa ei ole mahaarvatav: autokulud ja aasta amortisatsioon jagatakse aasta kogukilomeetritega ning korrutatakse päeviku erasõidukilomeetritega. Kui erasõitude kulud on raamatupidamises maha arvatud, lisatakse sama summa deklaratsioonis ettevõtte tuludele.' },
        { t: 'p', x: 'Näide: autokulud on 6 000 € ja amortisatsioon 2 000 €, kokku 8 000 €. Autoga sõideti 25 000 km, millest erasõite 5 000 km. Kilomeetri hind on 8 000 € / 25 000 km = 0,32 € ja erasõitude osa 5 000 × 0,32 € = 1 600 €. Kui erasõite ei suudeta usaldusväärselt näidata, tuleb nende osa hinnata.' },
        { t: 'p', x: 'Ettevõtte jaoks soetatud auto ei lahku ettevõtte varast ainult seetõttu, et ärisõitude osa langeb mõnel aastal ajutiselt alla poole: auto kuuluvust ettevõtte netovarasse hinnatakse mitme aasta olude põhjal.' },
        { t: 'h3', x: 'Millised sõidud on ärisõidud?' },
        { t: 'ul', items: [
          'Sõidud ettevõtte tegevuspiirkonnas, näiteks kauba toomine laost või käik kliendi juures.',
          'Sõidud ettevõtte alaliste tegevuskohtade vahel.',
          'Ajutised sõidud väljapoole ettevõtte tavapärast tegevuspiirkonda.',
          'Erasõit on seevastu sõit kodust oma ettevõtte tegevuskohta ja tagasi. Kui alalisi tegevuskohti on mitu, on erasõit sõit kodust esimesse kodust väljaspool asuvasse tegevuskohta ning päeva lõpus tegevuskohast koju. Kodu ja töökoha vahelised sõidud arvatakse maha isiku enda maksustamisel sõidukuludena.',
        ] },
        { t: 'h2', x: 'Mida kirjutada ettevõtja sõidupäevikusse?' },
        { t: 'p', x: 'Maksuameti järgi peab päevikust nähtuma autoga maksuaasta jooksul sõidetud kogukilomeetrid. Iga ettevõtlusega seotud sõidu kohta märgitakse:' },
        { t: 'ul', items: [
          'sõidu algus- ja lõpuaeg',
          'sõidu algus- ja lõppkoht ning vajadusel marsruut',
          'sõidu pikkus',
          'sõidu eesmärk',
          'odomeetri näit sõidu alguses ja lõpus',
          'auto kasutaja.',
        ] },
        { t: 'p', x: 'Aasta kogukilomeetreid on kõige lihtsam tõendada odomeetri näitudega aasta (või majandusaasta) esimesel ja viimasel päeval. Üks kanne võib välja näha näiteks nii: 12.3.2026 kell 8.10–11.40, tegevuskoht Vantaa – klient Espoos – tegevuskoht Vantaa, 46 km, odomeeter 48 210 → 48 256, seadme paigaldus kliendile, juht ettevõtja.' },
        { t: 'p', x: 'Kui samade sõitude eest taotletakse ka ajutise töösõidu lisamahaarvamist päevaraha alusel, peavad tõendist päevade kaupa nähtuma sihtkohad, kaugused ja kestus ning see tuleb koostada tegelike kellaaegade järgi. Päevarahade summad ja tingimused leiad meie juhendist „Kilomeetrihüvitis, päevaraha ja toiduhüvitis Soomes 2026“.' },
        { t: 'note', x: 'Maksuameti juhendi näites oli ettevõtja kirjutanud päevikusse ainult kuude kogukilomeetrid, enamiku sõitude kohta vaid linna või piirkonna nime ega ühegi sõidu kellaaegu. Mahaarvamine kiideti heaks ainult 88 päeva eest, mille sihtkohad ja marsruudid olid täpsemalt kirjas. 150 päeva osas nõue lükati tagasi ja määrati maksutõus (veronkorotus).' },
        { t: 'h2', x: 'Töötaja oma autoga: tõendiks on sõiduaruanne' },
        { t: 'p', x: 'Kui töötaja teeb töösõidu oma autoga, võib tööandja maksta maksuvaba kilomeetrihüvitist – 2026. aastal kuni 0,55 €/km. Töötaja tõend ei ole eraldi sõidupäevik, vaid sõiduaruanne (matkalasku), mille ta esitab tööandjale. Aruandest peavad selguma:' },
        { t: 'ul', items: [
          'sõidu eesmärk ja sihtkoht (aadress)',
          'vajadusel marsruut',
          'sõiduviis ehk sõiduk',
          'sõidu alguse ja lõpu kuupäevad ja kellaajad',
          'välissõitude puhul riik või piirkond, kus sõiduööpäev lõppes',
          'kilomeetrihüvitise puhul lisaks sõidetud kilomeetrid ja ühikuhind.',
        ] },
        { t: 'p', x: 'Aruande võib koostada ka elektroonilises rakenduses, kui selles on nõutud andmed. Paljud peavad siiski oma sõidupäevikut, millest on aruannet lihtne koostada. Kui töötajal on täielik autosoodustus (vapaa autoetu), ei saa selle autoga tehtud töösõitude eest maksta maksuvaba kilomeetrihüvitist. Kasutussoodustusega (käyttöetu) auto juhile, kes maksab ise kütuse eest, võib kütusekulu hüvitada maksuvabalt kuni 0,11 €/km. Kõrgendused, päevarahad ja Tulorekisterisse deklareerimise oleme lahti kirjutanud kilomeetrihüvitise juhendis.' },
        { t: 'h2', x: 'Autosoodustus: erasõidud ja sõidupäevik' },
        { t: 'p', x: 'Autosoodustus (autoetu) tekib, kui töötaja või tema pere kasutab tööandja sõidu- või pakiautot erasõitudeks. Erasõit on ka sõit kodu ja töökoha vahel. Täieliku autosoodustuse (vapaa autoetu) puhul maksab tööandja kõik auto kulud, kasutussoodustuse (käyttöetu) puhul maksab töötaja ise vähemalt kütuse või laadimise.' },
        { t: 'p', x: 'Autosoodustuse kuuväärtus on arvutatud eeldusel, et erasõite on 1 500 km kuus ehk 18 000 km aastas. Sõidupäevik mõjutab väärtust nii:' },
        { t: 'ul', items: [
          'Kilomeetripõhine väärtus: kui kasutuskulud arvutatakse erasõidukilomeetrite järgi, tuleb erasõitude kohta pidada sõidupäevikut. Valitud viisi tuleb järgida järjekindlalt ja kuuväärtus ei piira siis soodustuse suurust.',
          'Väärtuse vähendamine: kui päeviku järgi jääb erasõite alla 18 000 km aastas, võib töötaja eeltäidetud deklaratsioonis nõuda autosoodustuse väärtuse vähendamist.',
          'Palju töösõite: kui töösõite on kalendriaastas üle 30 000 km, on soodustuse baasväärtus 80 % tavapärasest. Piir on range ja sõidupäevik tuleb aasta lõpus üle kontrollida.',
          'Väärtuse suurendamine: kui erasõite on üle 18 000 km kalendriaastas või üle 1 500 km soodustuse kasutuskuu kohta, tuleb maksustatavat väärtust suurendada.',
          'Mitu kasutajat: kui sama autot kasutavad mitu töötajat, eeldab soodustuse jagamine kilomeetrite järgi alati sõidupäevikut või muud usaldusväärset tõendit.',
        ] },
        { t: 'p', x: 'Autosoodustuse sõidupäevik võib olla käsitsi peetud või elektrooniline. Sellest peavad nähtuma iga päeva kilomeetrid jaotatuna töö- ja erasõitudeks. Töösõitude kohta märgitakse lisaks algus- ja lõpuaeg, algus- ja lõppkoht (vajadusel marsruut), odomeetri näidud ja sõidu pikkus, eesmärk ja auto kasutaja. Erasõitude kohta piisab kilomeetritest. Töötaja hoiab päevikut ise ja esitab selle maksuametile ainult nõudmisel.' },
        { t: 'h2', x: 'Osaühing ja isikuühingud' },
        { t: 'p', x: 'Lisamahaarvamine on ainult füüsilisest isikust ettevõtja (liikkeen- tai ammatinharjoittaja) mahaarvamine. Seda ei kohaldata osaühingu (osakeyhtiö) osanikele ega täis- ja usaldusühingu (ay, ky) osanikele. Ettevõtte omanikul on tavaliselt kaks olukorda:' },
        { t: 'ul', items: [
          'Omanik sõidab ettevõtte asjus oma autoga. Ettevõte võib maksta talle maksuvaba kilomeetrihüvitist ka siis, kui ta palka ei võta, kui maksuameti otsuse tingimused on täidetud ja sõitude kohta koostatakse sõiduaruanne ettevõtte raamatupidamisse.',
          'Omanik kasutab ettevõtte autot ka erasõitudeks, sh kodu ja töökoha vahel. Sellest tekib autosoodustus. See hinnatakse erisoodustuste otsuse järgi, kui soodustus on raamatupidamises käsitletud palgana ja deklareeritud Tulorekisterisse; ebatavalisi või põhjendamatuid soodustusi võidakse maksustada varjatud dividendina.',
        ] },
        { t: 'p', x: 'Ettevõtte auto puhul on sõidupäevik see materjal, millega omanik tõendab oma erasõitude mahtu, kui ta soovib soodustuse väärtust kilomeetrite järgi või nõuab väärtuse vähendamist.' },
        { t: 'h2', x: 'Kas elektrooniline sõidupäevik või GPS-rakendus sobib?' },
        { t: 'p', x: 'Sobib, kui sellest nähtuvad samad andmed kui paberpäevikust. Maksuameti erisoodustuste juhendi järgi võib sõidupäevik olla käsitsi peetud või elektrooniline ning tööandja võib paigaldada soodustusautosse sõidupäevikut asendava GPS-põhise sõiduandmete jälgimisteenuse. Ka sõiduaruande võib koostada rakenduses. Ettevõtja lisamahaarvamise puhul seadus vormi ette ei kirjuta, vaid nõuab sõidupäevikut või muud usaldusväärset tõendit.' },
        { t: 'p', x: 'Rakendust valides tasub kontrollida kolme asja:' },
        { t: 'ul', items: [
          'GPS salvestab aja, kohad ja kilomeetrid, kuid mitte sõidu eesmärki. Eesmärk ja juht tuleb lisada igale ärisõidule.',
          'Nähtavad peavad olema kogu aasta kilomeetrid, ka erasõidud – ainult ärisõitudest ei piisa.',
          'Andmeid peab saama välja trükkida või failina eksportida. Soome raamatupidamisseaduse järgi peab raamatupidamismaterjali saama vaadata ja vajadusel selgel kujul välja trükkida ning selle sisu ei tohi pärast majandusaasta aruande koostamist muuta. Salvesta aasta sõidud hiljemalt aasta sulgemisel, et andmed rakendust vahetades kaduma ei läheks.',
        ] },
        { t: 'p', x: 'Büroo klientidele saab Vaavo rakenduses kasutusele võtta ka elektroonilise sõidupäeviku.' },
        { t: 'h2', x: 'Mis saab, kui sõidupäevikut ei ole peetud?' },
        { t: 'p', x: 'Päeviku puudumine ei võta mahaarvamist automaatselt ära, kuid siis peab ettevõtja sõidud muul viisil tõendama. Maksuameti juhendi järgi:' },
        { t: 'ul', items: [
          'Lisamahaarvamist saab ilma päevikuta ainult siis, kui ärisõitude kilomeetrid saab muul viisil usaldusväärselt kindlaks teha. Regulaarselt korduvate sõitude kohta, näiteks kord nädalas samasse kohta, märgitakse sõidu pikkus ja mitu korda aastas see tehakse.',
          'Auto aasta kogukilomeetrid tuleb alati kindlaks teha. Kui neid ei tehta, ei saa kontrollida, et auto kuulub eratarbesse, ja lisamahaarvamist ei anta.',
          'Siis arvatakse esmajoones maha ärisõitude tegelikud kulud, näiteks kütusetšekkide alusel. Kui ka neid ei saa kindlaks teha, arvutatakse mahaarvamine kodu ja töökoha vaheliste sõitude kilomeetrimääraga (2025. maksuaasta eest auto puhul 0,27 €/km), mis on kilomeetrihüvitisest märgatavalt väiksem. Tingimus on, et kulud on tõesti tekkinud.',
          'Kui ettevõttele kuuluva auto erasõite ei suudeta usaldusväärselt näidata, hinnatakse nende osa.',
          'Kui ärisõitude kohta ei ole üldse usaldusväärset tõendit, ei arvata eraauto kulusid ettevõtlustulust üldse maha.',
        ] },
        { t: 'p', x: 'Autosoodustuse puhul kasutatakse ilma päevikuta kuuväärtust ja väikeste erasõitude tõttu vähendamist nõuda ei saa. Puudulik tõend võib kaasa tuua ka maksutõusu (veronkorotus). Maksumenetluse seaduse järgi on see üldjuhul 2 % lisatud tulust ja teatud juhtudel 3–10 %. Seda ei määrata, kui rikkumine on väheoluline või sellel on mõjuv põhjus.' },
        { t: 'h2', x: 'Kui kaua sõidupäevikut säilitada?' },
        { t: 'ul', items: [
          'Toiminimi-ettevõtja: äri- või kutsetegevusega tegelev füüsiline isik on raamatupidamiskohustuslane. Soome raamatupidamisseaduse järgi säilitatakse algdokumente ja muud raamatupidamismaterjali vähemalt kuus aastat selle aasta lõpust, mil majandusaasta lõppes, ning raamatupidamisregistreid ja majandusaasta aruannet vähemalt 10 aastat majandusaasta lõpust. Sõidupäevik on autokulude ja lisamahaarvamise alus, seega tasub seda hoida raamatupidamismaterjali juures vähemalt sama kaua kui algdokumente.',
          'Töötaja: deklaratsiooniga seotud tšekke ja dokumente säilitatakse 3 aastat maksuaasta lõpust. Maksuameti järgi tuleb sõidupäevik, kui see on olemas, alles hoida, kuigi kodu ja töökoha vaheliste sõidukulude dokumente muidu hoidma ei pea. Andmeid võib säilitada ka elektrooniliselt.',
          'Tööandja: sõiduaruanded koos lisadega on hüvitiste kirjendamise algdokumendid, seega kehtivad neile raamatupidamisseaduse säilitustähtajad.',
        ] },
        { t: 'h3', x: 'Välismaal registreeritud tööauto' },
        { t: 'p', x: 'Eraldi sõidupäeviku kohustus on autode maksustamises (autovero). Soomes alaliselt elav töötaja või kutsetegevusega tegelev isik ja tema pereliikmed peavad pidama paber- või elektroonilist sõidupäevikut, kui nad kasutavad Soome automaksuseaduse § 39 alusel välismaal registreeritud tööautot. Üks maksuvaba kasutuse tingimus on, et igal 12-kuisel perioodil kasutatakse sõidukit päevade järgi vähem Soomes kui välismaal. Päevikusse märgitakse päeva või sõidu kaupa kasutuspäev või sõidu algus- ja lõpuaeg, kilomeetrid või odomeetri näidud, kasutusriik ja kasutaja ning kasutuspäevad Soomes ja välismaal 12-kuise vaatlusperioodi jooksul. Päevikut hoitakse nii, et algandmed oleksid kontrollitavad, ja esitatakse maksuametile nõudmisel. Olukord on tuttav näiteks Eestis registreeritud tööauto puhul – selgita tingimused enne, kui hakkad autoga Soomes sõitma.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Sõidupäevikut hakatakse pidama alles siis, kui maksuamet tõendit küsib. Tagantjärele koostatud nimekirjast puuduvad tavaliselt kellaajad ja odomeetri näidud ning selle usaldusväärsust on raske tõendada.',
          'Aasta kogukilomeetrid puuduvad. Ainult ärisõitudest ei piisa: ilma kogukilomeetriteta lisamahaarvamist ei anta.',
          'Kuude kogusummad ja üldsõnalised sihtkohad, nagu „Turku“ või „kliendikülastused“. Maksuameti näites viis selline päevik maksutõusuni.',
          'Sõit kodust oma tegevuskohta märgitakse ärisõiduks. See on erasõit.',
          'Lisamahaarvamist taotletakse vanemate, sugulase või liisingufirma auto eest. Selle eest saab maha arvata ainult tegelikud kulud.',
          'Samad autokulud arvatakse maha kaks korda: raamatupidamises ja täies ulatuses lisamahaarvamisena. Raamatupidamises maha arvatud kulud vähendavad lisamahaarvamist.',
          'GPS-rakenduse toorandmed ilma sõidu eesmärgi ja juhita.',
          'Osaühingu omanik taotleb lisamahaarvamist. Tema sõidud hüvitatakse sõiduaruande alusel ja ettevõtte auto erakasutus on autosoodustus.',
        ] },
        { t: 'h2', x: 'Abi autokulude ja sõidupäevikuga' },
        { t: 'p', x: 'Peame toiminimi-ettevõtjate ja osaühingute raamatupidamist, palgaarvestust ja maksudeklaratsioone. Kontrollime, kas auto kuulub ettevõttele või eratarbesse, arvutame päeviku põhjal lisamahaarvamise või erasõitude osa ning käsitleme palgaarvestuses autosoodustusi ja sõiduaruandeid. Teenindame soome ja vene keeles – võta ühendust ja vaatame sinu ettevõtte autoküsimused üle.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Maksuamet: ettevõtja autokulud ja sõidupäevik (inglise keeles)', href: SRC.vehicleEn },
          { label: 'Maksuamet: põhjalik juhend ettevõtja sõidukulude mahaarvamise kohta (soome keeles)', href: SRC.guide48192 },
          { label: 'Maksuamet: ettevõtja deklaratsiooni täitmise juhend (soome keeles)', href: SRC.returnFi },
          { label: 'Maksuamet: tööandja soodustused ja autosoodustus (inglise keeles)', href: SRC.benefitsEn },
          { label: 'Maksuamet: põhjalik juhend erisoodustuste kohta (soome keeles)', href: SRC.guide47886 },
          { label: 'Maksuamet: põhjalik juhend töösõidukulude hüvitamise ja sõiduaruande kohta (soome keeles)', href: SRC.guide48013 },
          { label: 'Maksuamet: tšekid ja dokumendid – säilitamise aeg (inglise keeles)', href: SRC.receiptsEn },
          { label: 'Maksuamet: otsus automaksu sõidupäeviku kohta (soome keeles)', href: SRC.foreignCarFi },
          { label: 'Finlex: ettevõtlustulu maksustamise seadus, § 55 (soome keeles)', href: SRC.evl },
          { label: 'Finlex: raamatupidamisseadus, 2. ptk § 10 (soome keeles)', href: SRC.kpl },
          { label: 'Finlex: maksumenetluse seadus (soome keeles)', href: SRC.vml },
        ] },
      ],
      faq: [
        { q: 'Kas sõidupäevik on kohustuslik?', a: 'Mitte kõigile. Toiminimi-ettevõtja vajab sõidupäevikut või muud usaldusväärset tõendit, et saada ärisõitude eest lisamahaarvamist või arvutada ettevõtte auto erasõitude osa. Autosoodustusega töötaja vajab seda, kui soodustuse väärtus arvutatakse kilomeetrite järgi või kui ta nõuab väärtuse vähendamist. Kilomeetrihüvitist saav töötaja esitab sõiduaruande.' },
        { q: 'Mis on ettevõtja auto 50 % piir?', a: 'Kui ettevõtluse jaoks soetatud autoga sõidetakse maksuaastal üle 50 % ärisõite, kuulub auto ettevõttele ja kulud arvatakse maha tegelikus summas. Kui ärisõite on 50 % või vähem, on auto eratarbes ja ärisõitude eest saab lisamahaarvamist – 2026. aastal kuni 0,55 €/km. Piir otsustatakse iga maksuaasta kohta eraldi päeviku kilomeetrite põhjal.' },
        { q: 'Kas telefonirakendus või GPS-päevik sobib?', a: 'Sobib, kui sellest nähtuvad samad andmed kui paberpäevikust: algus- ja lõpuaeg, kohad, pikkus, odomeetri näidud, eesmärk ja juht ning kogu aasta kilomeetrid. Maksuameti juhendi järgi võib päevik olla käsitsi peetud või elektrooniline. GPS ei tea sõidu eesmärki, see tuleb ise lisada.' },
        { q: 'Mis juhtub, kui sõidupäevikut ei ole?', a: 'Siis tuleb ärisõidud tõendada muu usaldusväärse tõendiga ja aasta kogukilomeetrid alati kindlaks teha. Ilma kogukilomeetriteta lisamahaarvamist ei anta; maha saab arvata ainult tegelikud kulud või nende puudumisel summa kodu ja töökoha vaheliste sõitude määra järgi. Puudulik tõend võib kaasa tuua ka maksutõusu.' },
        { q: 'Kui kaua tuleb sõidupäevikut säilitada?', a: 'Toiminimi-ettevõtjal tasub seda hoida raamatupidamismaterjali juures vähemalt sama kaua kui algdokumente – kuus aastat selle aasta lõpust, mil majandusaasta lõppes. Töötaja hoiab deklaratsiooniga seotud tšekke ja dokumente, sh sõidupäevikut, 3 aastat maksuaasta lõpust.' },
        { q: 'Kas piisab, kui märgin kuu kilomeetrid ühe summana?', a: 'Ei. Iga ärisõidu kohta on vaja aega, kohti, pikkust, eesmärki, odomeetri näite ja juhti. Maksuameti näites viisid ainult kuude summad ja üldsõnalised sihtkohad selleni, et suurem osa mahaarvamisest lükati tagasi ja määrati maksutõus.' },
      ],
    },
    uk: {
      title: 'Журнал поїздок (ajopäiväkirja) у Фінляндії: що вимагає податкова',
      description:
        'Журнал поїздок у Фінляндії: поріг 50 % для авто підприємця, вирахування за км, автомобільна пільга, що записувати, застосунок, строк зберігання й помилки.',
      lead: 'Журнал поїздок (ajopäiväkirja) — головний доказ для фінської податкової (Verohallinto) того, скільки автомобіль проїхав у робочих чи ділових справах, а скільки — в особистих. Для підприємця з toiminimi від журналу залежить, чи належить машина до бізнесу і чи належить додаткове вирахування за ділові поїздки. Працівникові з автомобільною пільгою він може знизити її оподатковувану вартість, а власникові osakeyhtiö — відокремити поїздки компанії від особистих. Пояснюємо, кому потрібен журнал, що в нього записувати, чи підходить застосунок, що буде без журналу і скільки його зберігати.',
      body: [
        { t: 'h2', x: 'Кому потрібен журнал поїздок?' },
        { t: 'p', x: 'Журнал вимагають не від кожного водія. Він потрібен, коли оподаткування залежить від того, як кілометри поділяються на робочі або ділові та особисті поїздки. Типові ситуації:' },
        { t: 'ul', items: [
          'Підприємець з toiminimi їздить у справах фірми власним авто. З журналу видно, чи належить машина до підприємницької діяльності чи до особистого господарства і яке додаткове вирахування належить за ділові поїздки.',
          'Машина підприємця з toiminimi належить до фірми. За особистими кілометрами з журналу рахують, яка частина витрат на машину не вираховується.',
          'Працівник їздить у службові поїздки власним авто. Його доказ — звіт про поїздку (matkalasku), за яким роботодавець платить кілометрову компенсацію.',
          'У працівника є автомобільна пільга (autoetu). Журнал потрібен, якщо вартість пільги рахують за особистими кілометрами або якщо її хочуть знизити.',
          'Власник osakeyhtiö чи товариства (ay, ky) їздить у справах компанії власним авто або користується машиною компанії. Поїздки підтверджують звітом про поїздку, а особисте користування машиною компанії — це автомобільна пільга.',
        ] },
        { t: 'note', x: 'Журнал не додають до податкової декларації. Податкова запитує його за потреби, тому він має бути збережений і в порядку, коли надійде запит, — часто через кілька років після поїздок.' },
        { t: 'h2', x: 'Підприємець з toiminimi: поріг 50 % вирішує, чия машина' },
        { t: 'p', x: 'Оподаткування машини підприємця з toiminimi залежить від того, чи належить вона до підприємницької діяльності чи до особистого господарства. Машина належить до діяльності фірми, якщо її придбано для неї і понад 50 % пробігу становлять ділові поїздки. Якщо ділових поїздок 50 % або менше пробігу за податковий рік, машина належить до особистого господарства.' },
        { t: 'p', x: 'Поріг перевіряють окремо за кожен податковий рік. Вищий адміністративний суд (KHO 23.1.2012/64) зазначив, що умови додаткового вирахування визначаються за поїздками конкретного року, а особисті поїздки в попередні чи наступні роки значення не мають. Період — це фінансовий рік (tilikausi) підприємця; якщо діяльність почалася посеред року, поїздки до її початку не враховуються. Тому податкова радить вести журнал від самого початку діяльності.' },
        { t: 'p', x: 'Машину подружжя оцінюють так само, як власну. За машини інших людей — наприклад, батьків, братів і сестер або цивільного партнера, який не вважається подружжям для податків, — додаткового вирахування немає, вираховуються лише фактичні витрати. Немає його і за машину в лізингу, якщо право власності не переходить до підприємця, і за службову машину, отриману від роботодавця як пільгу.' },
        { t: 'h3', x: 'Машина в особистому господарстві: додаткове вирахування за ділові поїздки' },
        { t: 'p', x: 'Якщо підприємець їздить у справах фірми машиною з особистого господарства, він отримує в оподаткуванні додаткове вирахування (lisävähennys). Воно не більше за неоподатковувану кілометрову компенсацію працівника: за кілометри 2026 року — до 0,55 €/км (за поїздки 2025 року — 0,59 €/км). Витрати на машину, уже вирахувані в бухгалтерії, зменшують вирахування, а якщо фактичні витрати більші за максимум, вираховуються лише вони. За законом про оподаткування підприємницького доходу (EVL, § 55) для вирахування потрібен журнал поїздок або інше надійне підтвердження використання машини та ділових поїздок.' },
        { t: 'p', x: 'Приклад: у 2026 році машина проїхала 20 000 км, з них у справах — 6 000 км. Машина в особистому господарстві, витрати на неї в бухгалтерії не враховані. Додаткове вирахування: 6 000 × 0,55 € = 3 300 €. Без загального пробігу за рік порівняння неможливе, і вирахування не дадуть.' },
        { t: 'p', x: 'Якщо машиною підприємця керує інша людина, наприклад його працівник, додаткове вирахування належить, лише якщо сам підприємець або подружжя, яке веде бізнес разом із ним, їде в машині. Інакше витрати на поїздку вираховуються у фактичному розмірі.' },
        { t: 'h3', x: 'Машина фірми: частка особистих поїздок' },
        { t: 'p', x: 'Якщо машина належить до діяльності фірми, вираховуються фактичні витрати й амортизація, відображені в бухгалтерії. Частка особистих поїздок не вираховується: витрати й річну амортизацію ділять на загальний пробіг за рік і множать на особисті кілометри з журналу. Якщо витрати на особисті поїздки вже вирахувано в бухгалтерії, таку саму суму додають до доходів фірми в декларації.' },
        { t: 'p', x: 'Приклад: витрати на машину 6 000 €, амортизація 2 000 €, разом 8 000 €. Пробіг 25 000 км, з них особистих 5 000 км. Ціна кілометра 8 000 € / 25 000 км = 0,32 €, частка особистих поїздок 5 000 × 0,32 € = 1 600 €. Якщо особисті поїздки не вдається надійно підтвердити, їхню частку доводиться оцінювати.' },
        { t: 'p', x: 'Машина, куплена для фірми, не виходить з її майна лише тому, що в якомусь році частка ділових поїздок тимчасово впала нижче половини: належність машини до активів фірми оцінюють за обставинами кількох років.' },
        { t: 'h3', x: 'Які поїздки вважаються діловими?' },
        { t: 'ul', items: [
          'Поїздки в зоні діяльності фірми — наприклад, по товар на склад або до клієнта.',
          'Поїздки між постійними місцями діяльності фірми.',
          'Тимчасові поїздки за межі звичайної зони діяльності фірми.',
          'Особистою поїздкою, натомість, вважається дорога з дому до власного приміщення фірми й назад. Якщо постійних місць кілька, особиста поїздка — це дорога з дому до першого з них поза домом і шлях додому наприкінці дня. Дорогу дім–робота вираховують в особистому оподаткуванні як транспортні витрати.',
        ] },
        { t: 'h2', x: 'Що записувати в журнал підприємця?' },
        { t: 'p', x: 'За вимогою податкової в журналі має бути загальний пробіг машини за податковий рік. Для кожної ділової поїздки записують:' },
        { t: 'ul', items: [
          'час початку й завершення поїздки',
          'місце початку й завершення, за потреби маршрут',
          'відстань',
          'мету поїздки',
          'показники одометра на початку і в кінці',
          'хто керував машиною.',
        ] },
        { t: 'p', x: 'Загальний пробіг найпростіше підтвердити показниками одометра в перший і останній день року (або фінансового року). Один запис може виглядати так: 12.3.2026, 8.10–11.40, офіс у Вантаа – клієнт в Еспоо – офіс у Вантаа, 46 км, одометр 48 210 → 48 256, встановлення обладнання в клієнта, за кермом підприємець.' },
        { t: 'p', x: 'Якщо за ті самі поїздки заявляють і вирахування за тимчасове відрядження в розмірі добових, у підтвердженні по днях мають бути видні місця призначення, відстані й тривалість, і складати його треба за реальним часом. Суми й умови добових зібрано в нашому гіді «Кілометрові, добові та компенсація харчування у Фінляндії у 2026 році».' },
        { t: 'note', x: 'У прикладі з інструкції податкової підприємець записував у журнал лише місячний пробіг, для більшості поїздок — тільки назву міста чи регіону й для жодної поїздки — час. Вирахування визнали лише за 88 днів, за якими місця й маршрути були записані детальніше. За 150 днів вимогу відхилили й нарахували штрафну надбавку до податку (veronkorotus).' },
        { t: 'h2', x: 'Працівник на власному авто: доказ — звіт про поїздку' },
        { t: 'p', x: 'Коли працівник їде у службову поїздку власним авто, роботодавець може виплатити неоподатковувану кілометрову компенсацію — у 2026 році до 0,55 €/км. Доказ працівника — не окремий журнал, а звіт про поїздку (matkalasku), який він подає роботодавцю. У звіті мають бути:' },
        { t: 'ul', items: [
          'мета й місце призначення поїздки (адреса)',
          'за потреби маршрут',
          'спосіб пересування, тобто транспортний засіб',
          'дата й час початку та завершення поїздки',
          'для закордонних поїздок — країна або регіон, де завершилася доба відрядження',
          'для кілометрової компенсації — ще пробіг і ставка за кілометр.',
        ] },
        { t: 'p', x: 'Звіт можна скласти й в електронному застосунку, якщо в ньому є всі обов’язкові дані. Багато хто все одно веде власний журнал, з якого звіт скласти простіше. Якщо в працівника вільна автомобільна пільга (vapaa autoetu), за робочі поїздки цією машиною неоподатковувані кілометрові платити не можна. Водієві машини з пільгою на користування (käyttöetu), який сам платить за пальне, можна без податку відшкодувати витрати на пальне до 0,11 €/км. Підвищення ставки, добові й подання даних до Tulorekisteri ми розібрали в гіді про кілометрові.' },
        { t: 'h2', x: 'Автомобільна пільга: особисті поїздки й журнал' },
        { t: 'p', x: 'Автомобільна пільга (autoetu) виникає, коли працівник або його родина користуються легковиком чи фургоном роботодавця в особистих цілях. Дорога між домом і роботою теж вважається особистою поїздкою. За вільної пільги (vapaa autoetu) усі витрати на машину несе роботодавець, за пільги на користування (käyttöetu) працівник сам платить щонайменше за пальне чи заряджання.' },
        { t: 'p', x: 'Місячну вартість пільги розраховано з 1 500 км особистих поїздок на місяць, тобто 18 000 км на рік. Журнал впливає на вартість так:' },
        { t: 'ul', items: [
          'Розрахунок за кілометрами: якщо витрати рахують за особистими кілометрами, особисті поїздки треба записувати в журнал. Обраний спосіб застосовують послідовно, і місячна вартість тоді не обмежує розмір пільги.',
          'Зниження вартості: якщо особисті поїздки за журналом менші за 18 000 км на рік, працівник може вимагати зниження вартості пільги в попередньо заповненій декларації.',
          'Багато робочих поїздок: якщо робочих поїздок за календарний рік понад 30 000 км, базова вартість пільги становить 80 % від звичайної. Поріг суворий, і журнал перевіряють наприкінці року.',
          'Підвищення вартості: якщо особистих поїздок понад 18 000 км за календарний рік або понад 1 500 км за місяць користування пільгою, оподатковувану вартість треба підвищити.',
          'Кілька водіїв: якщо машиною користуються кілька працівників, поділ пільги за кілометрами завжди вимагає журналу або іншого надійного підтвердження.',
        ] },
        { t: 'p', x: 'Журнал для автомобільної пільги може бути паперовим або електронним. У ньому по днях зазначають пробіг з поділом на робочі й особисті поїздки. Для робочих поїздок додатково записують час початку й завершення, місце початку й завершення (за потреби маршрут), показники одометра й відстань, мету й водія. Для особистих поїздок достатньо кілометрів. Працівник зберігає журнал сам і передає його податковій лише на запит.' },
        { t: 'h2', x: 'Osakeyhtiö і товариства' },
        { t: 'p', x: 'Додаткове вирахування є лише в приватного підприємця (liikkeen- tai ammatinharjoittaja). Воно не застосовується до акціонерів osakeyhtiö і до учасників avoin yhtiö та kommandiittiyhtiö. У власника компанії зазвичай дві ситуації:' },
        { t: 'ul', items: [
          'Власник їздить у справах компанії власним авто. Компанія може платити йому неоподатковувані кілометрові, навіть якщо він не отримує зарплати, — за дотримання умов рішення податкової і якщо на поїздки складено звіт про поїздку до бухгалтерії компанії.',
          'Власник користується машиною компанії й в особистих цілях, зокрема для дороги дім–робота. Це автомобільна пільга. Її оцінюють за рішенням податкової про натуральні пільги, якщо пільгу відображено в бухгалтерії як зарплату й подано до Tulorekisteri; незвичні чи необґрунтовані пільги можуть оподатковуватися як приховані дивіденди.',
        ] },
        { t: 'p', x: 'Для машини компанії журнал — це той матеріал, яким власник підтверджує обсяг особистих поїздок, якщо хоче розрахунок пільги за кілометрами або вимагає знизити її вартість.' },
        { t: 'h2', x: 'Чи підходить електронний журнал або GPS-застосунок?' },
        { t: 'p', x: 'Підходить, якщо в ньому є ті самі дані, що й у паперовому. За інструкцією податкової про натуральні пільги журнал може бути ручним або електронним, а роботодавець може встановити в службову машину GPS-сервіс обліку поїздок, що замінює журнал. Звіт про поїздку теж можна скласти в застосунку. Для вирахування підприємця закон форму не встановлює — він вимагає журнал або інше надійне підтвердження.' },
        { t: 'p', x: 'Обираючи застосунок, перевірте три речі:' },
        { t: 'ul', items: [
          'GPS записує час, місця й кілометри, але не мету поїздки. Мету й водія треба додати до кожної ділової поїздки.',
          'Має бути видно пробіг за весь рік, зокрема особисті поїздки, — самих ділових недостатньо.',
          'Дані мають друкуватися або вивантажуватися у файл. За законом про бухгалтерський облік матеріали обліку мають бути доступні для перегляду й за потреби для друку в зрозумілому вигляді, і їх не можна змінювати після складання фінансової звітності. Зберігайте поїздки за рік не пізніше закриття року, щоб дані не зникли під час зміни застосунку.',
        ] },
        { t: 'p', x: 'Для клієнтів бюро в застосунку Vaavo можна також увімкнути електронний журнал поїздок.' },
        { t: 'h2', x: 'Що, як журнал не вели?' },
        { t: 'p', x: 'Відсутність журналу сама собою не позбавляє вирахування, але тоді підприємцю треба підтвердити поїздки інакше. За інструкцією податкової:' },
        { t: 'ul', items: [
          'Додаткове вирахування без журналу можливе, лише якщо діловий пробіг можна надійно встановити іншим способом. Для регулярних поїздок, наприклад раз на тиждень до того самого об’єкта, зазначають довжину поїздки й скільки разів на рік її здійснювали.',
          'Загальний пробіг машини за рік треба підтвердити завжди. Без нього не можна перевірити, що машина належить до особистого господарства, і вирахування не дають.',
          'Тоді насамперед вираховують фактичні витрати на ділові поїздки — наприклад, за чеками на пальне. Якщо й їх не встановити, вирахування рахують за ставкою для дороги дім–робота (за 2025 рік для авто 0,27 €/км), а це помітно менше за кілометрову компенсацію. Умова — витрати справді виникли.',
          'Якщо особисті поїздки машиною фірми неможливо надійно підтвердити, їхню частку оцінюють.',
          'Якщо надійного підтвердження ділових поїздок немає зовсім, витрати на особисту машину з підприємницького доходу не вираховуються взагалі.',
        ] },
        { t: 'p', x: 'Для автомобільної пільги без журналу застосовують місячну вартість, і зниження через невеликі особисті поїздки не вимагати. Неповне підтвердження може призвести й до штрафної надбавки до податку (veronkorotus). За законом про податкову процедуру вона, як правило, становить 2 % донарахованого доходу, а в окремих випадках — 3–10 %. Надбавку не призначають, якщо порушення незначне або для нього є поважна причина.' },
        { t: 'h2', x: 'Скільки зберігати журнал поїздок?' },
        { t: 'ul', items: [
          'Підприємець з toiminimi: фізична особа, яка веде підприємницьку чи професійну діяльність, зобов’язана вести бухгалтерію. За законом про бухгалтерський облік документи та інші матеріали обліку зберігають щонайменше шість років від кінця року, у якому закінчився фінансовий рік, а облікові регістри й фінансову звітність — щонайменше 10 років. Журнал — основа для витрат на машину й вирахування, тож його варто зберігати разом із матеріалами бухгалтерії не менше, ніж документи.',
          'Працівник: чеки й документи до декларації зберігають 3 роки від кінця податкового року. За вказівкою податкової журнал поїздок, якщо він є, треба зберегти, навіть якщо документи про витрати на дорогу дім–робота зберігати не потрібно. Зберігати можна й в електронному вигляді.',
          'Роботодавець: звіти про поїздки з додатками — це документи для проведень за компенсаціями, на них поширюються строки зберігання за законом про бухгалтерський облік.',
        ] },
        { t: 'h3', x: 'Службова машина, зареєстрована за кордоном' },
        { t: 'p', x: 'Окремий обов’язок вести журнал є в оподаткуванні автомобілів (autovero). Працівник або самозайнятий фахівець, який постійно проживає у Фінляндії, і члени його родини мають вести паперовий чи електронний журнал, якщо користуються зареєстрованою за кордоном службовою машиною за § 39 закону про автомобільний податок. Одна з умов неоподатковуваного користування — у кожному 12-місячному періоді машиною користуються менше днів у Фінляндії, ніж за кордоном. У журнал по днях або по поїздках записують дату користування чи час початку й завершення поїздки, кілометри або показники одометра, країну користування й водія, а також кількість днів користування у Фінляндії та за кордоном за 12-місячний період. Журнал зберігають так, щоб вихідні дані можна було перевірити, і показують податковій на запит. Така ситуація знайома, наприклад, зі службовою машиною, зареєстрованою в Естонії, — з’ясуйте умови, перш ніж почнете їздити нею у Фінляндії.' },
        { t: 'h2', x: 'Часті помилки' },
        { t: 'ul', items: [
          'Журнал починають вести, лише коли податкова запросила підтвердження. У списку, складеному заднім числом, зазвичай немає часу й показників одометра, і його достовірність важко довести.',
          'Немає загального пробігу за рік. Самих ділових поїздок замало: без загального пробігу додаткове вирахування не дають.',
          'Місячні підсумки й загальні формулювання на кшталт «Турку» чи «візити до клієнтів». У прикладі податкової такий журнал закінчився штрафною надбавкою.',
          'Дорогу з дому до власного офісу записують як ділову. Це особиста поїздка.',
          'Вирахування заявляють за машину батьків, родича чи лізингової компанії. За неї можна вирахувати лише фактичні витрати.',
          'Ті самі витрати вираховують двічі: у бухгалтерії й повним додатковим вирахуванням. Витрати, враховані в бухгалтерії, зменшують вирахування.',
          'Сирі дані GPS без мети поїздки й водія.',
          'Власник osakeyhtiö заявляє додаткове вирахування. Його поїздки відшкодовують за звітом про поїздку, а особисте користування машиною компанії — це автомобільна пільга.',
        ] },
        { t: 'h2', x: 'Допоможемо з витратами на машину й журналом' },
        { t: 'p', x: 'Ведемо бухгалтерію, нарахування зарплати й декларації для toiminimi та osakeyhtiö. Перевіряємо, чи належить машина до фірми чи до особистого господарства, розраховуємо додаткове вирахування або частку особистих поїздок за журналом і оформлюємо автомобільні пільги та звіти про поїздки в нарахуванні зарплати. Працюємо фінською та російською — напишіть нам, і ми розберемо автомобільні питання вашої компанії.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: витрати підприємця на автомобіль і журнал поїздок (англійською)', href: SRC.vehicleEn },
          { label: 'Vero: детальна інструкція про вирахування транспортних витрат підприємця (фінською)', href: SRC.guide48192 },
          { label: 'Vero: інструкція до декларації підприємця (фінською)', href: SRC.returnFi },
          { label: 'Vero: пільги від роботодавця й автомобільна пільга (англійською)', href: SRC.benefitsEn },
          { label: 'Vero: детальна інструкція про натуральні пільги (фінською)', href: SRC.guide47886 },
          { label: 'Vero: детальна інструкція про компенсації службових поїздок і звіт про поїздку (фінською)', href: SRC.guide48013 },
          { label: 'Vero: чеки й документи — строк зберігання (англійською)', href: SRC.receiptsEn },
          { label: 'Vero: рішення про журнал поїздок для автомобільного податку (фінською)', href: SRC.foreignCarFi },
          { label: 'Finlex: закон про оподаткування підприємницького доходу, § 55 (фінською)', href: SRC.evl },
          { label: 'Finlex: закон про бухгалтерський облік, розд. 2 § 10 (фінською)', href: SRC.kpl },
          { label: 'Finlex: закон про податкову процедуру (фінською)', href: SRC.vml },
        ] },
      ],
      faq: [
        { q: 'Чи обов’язковий журнал поїздок?', a: 'Не для всіх. Підприємцю з toiminimi журнал або інше надійне підтвердження потрібні, щоб отримати додаткове вирахування за ділові поїздки чи розрахувати частку особистих поїздок машиною фірми. Працівникові з автомобільною пільгою — якщо вартість пільги рахують за кілометрами або він вимагає її знизити. Працівник, який отримує кілометрові, подає звіт про поїздку.' },
        { q: 'Що таке поріг 50 % для машини підприємця?', a: 'Якщо машиною, купленою для фірми, за податковий рік понад 50 % пробігу — ділові поїздки, машина належить до фірми, і витрати вираховують фактичні. Якщо ділових поїздок 50 % або менше, машина в особистому господарстві, а за ділові поїздки належить додаткове вирахування — у 2026 році до 0,55 €/км. Поріг визначають за кожен рік окремо за кілометрами з журналу.' },
        { q: 'Чи підходить застосунок на телефоні або GPS-журнал?', a: 'Так, якщо в ньому є ті самі дані, що й у паперовому: час початку й завершення, місця, відстань, показники одометра, мета й водій, а також пробіг за весь рік. За інструкцією податкової журнал може бути ручним або електронним. GPS не знає мети поїздки — її треба додати самому.' },
        { q: 'Що буде, якщо журналу немає?', a: 'Тоді ділові поїздки треба підтвердити іншим надійним способом, а загальний пробіг за рік — завжди. Без загального пробігу додаткове вирахування не дають: можна вирахувати лише фактичні витрати, а за їх відсутності — суму за ставкою для дороги дім–робота. Неповне підтвердження може призвести й до штрафної надбавки до податку.' },
        { q: 'Скільки зберігати журнал?', a: 'Підприємцю з toiminimi варто зберігати його разом із бухгалтерією не менше, ніж документи, — шість років від кінця року, у якому закінчився фінансовий рік. Працівник зберігає чеки й документи до декларації, зокрема журнал, 3 роки від кінця податкового року.' },
        { q: 'Чи достатньо записувати кілометри за місяць однією сумою?', a: 'Ні. Для кожної ділової поїздки потрібні час, місця, відстань, мета, показники одометра й водій. У прикладі податкової через самі місячні підсумки й загальні формулювання більшу частину вирахування відхилили й нарахували штрафну надбавку.' },
      ],
    },
  },
};
