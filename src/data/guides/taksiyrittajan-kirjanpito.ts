import type { Guide } from './types';

// Facts verified 2026-11-16, verbatim, against Finlex (consolidated Finnish texts as served on
// finlex.fi that day), vero.fi (ordinary pages with their update date; detailed guidance with its
// issue date and validity) and kela.fi. Every link below was fetched the same day and answered
// HTTP 200.
// - Arvonlisäverolaki 1501/1993 (https://www.finlex.fi/fi/lainsaadanto/1993/1501):
//   84 § "Suoritettava vero on 25,5 prosenttia veron perusteesta, ellei 85 tai 85 a §:ssä toisin
//   säädetä." 85 § 1 mom. "Seuraavien palvelujen myynnistä ... suoritettava vero on 13,5 prosenttia
//   veron perusteesta: ... 4) henkilökuljetus;" with the notes "L:lla 1358/2025 muutettu
//   johdantokappale tuli voimaan 1.1.2026. Aiempi sanamuoto kuuluu: ... 14 prosenttia veron
//   perusteesta" and "L:lla 691/2024 lisätty 4 kohta tuli voimaan 1.1.2025". Before that,
//   henkilökuljetus was in the 10 % list (85 a § old wording "1) henkilökuljetus;").
//   NOTE: the brief pointed to AVL 85 a §. Since 1.1.2025 passenger transport is in 85 § (now
//   13,5 %); the current 85 a § (10 %) covers only newspapers/periodicals and the Yle allocation.
//   3 § "Myyjä ei ole verovelvollinen, jos kuluvan kalenterivuoden ja sitä edeltäneen
//   kalenterivuoden liikevaihto on enintään 20 000 euroa, ellei häntä ole oman ilmoituksensa
//   perusteella merkitty verovelvolliseksi." 36 § "Veroa ei suoriteta myöskään seuraavien
//   palvelujen ja tavaroiden myynnistä: 1) sairaankuljetukset erityisesti tätä tarkoitusta varten
//   varustetulla kuljetusvälineellä". 114 § 1 mom. "Vähennystä ei saa tehdä, kun hankinta koskee
//   ... 5) henkilöautot ... sekä niihin tai niiden käyttöön liittyvät tavarat ja palvelut."
//   114 § 2 mom. "Edellä 1 momentin 5 kohdassa tarkoitettu vähennysoikeuden rajoitus ei koske
//   ajoneuvoa ja alusta, joka on hankittu myytäväksi, vuokrattavaksi taikka käytettäväksi
//   ammattimaiseen henkilökuljetukseen tai ajo-opetukseen, eikä henkilöautoa, joka on hankittu
//   yksinomaan vähennykseen oikeuttavaan käyttöön." 117 § "Tavarasta tai palvelusta, jonka
//   verovelvollinen on hankkinut tai ottanut vain osittain vähennykseen oikeuttavaan käyttöön,
//   saadaan vähennys tehdä vain siltä osin kuin tavaraa tai palvelua käytetään tähän
//   tarkoitukseen." NOTE: the brief said a taxi's VAT is deductible "only if used exclusively for
//   taxi traffic"; the taxi exception is the opposite — the professional passenger-transport
//   share is deductible even with private use (see Vero below).
// - Vero, Taksiyrittäjä – näin aloitat toiminnan (updated 9.10.2026;
//   https://www.vero.fi/yritykset-ja-yhteisot/yritystoiminta/uusi-yritys/taksiyrittaja/; EN version
//   https://www.vero.fi/en/businesses-and-corporations/business-operations/setting-up-a-business/taxi-entrepreneur/):
//   "Sinun on ilmoitettava ajotulosi yritystoiminnan veroilmoituksella riippumatta siitä, onko ajo
//   tapahtunut ulkopuolisen toimijan välityksellä vai ei."; "Taksiliikenteen harjoittaminen
//   edellyttää taksiliikennelupaa. Kuljettajalla on lisäksi oltava taksinkuljettajan ajolupa.";
//   "Auto on rekisteröitävä luvanvaraiseen käyttöön, jos sitä käytetään edes osan aikaa taksina.";
//   "Ammattiautoilijana sinun on pidettävä ajopäiväkirjaa. Jos autossasi on kuitinantolaitteella
//   varustettu taksamittari, voit käyttää sen tuottamaa raporttia ajopäiväkirjana."; contents
//   "ajotulot jaettuna käteisajotuloihin, luottoajotuloihin ja muihin tuloihin" and "tiedot koko
//   verovuoden ajokilometreistä jaettuna ammattiajoihin, tuloa tuottamattomiin ammattiajoihin,
//   yksityisajoihin ja muihin ajoihin"; "Säilytä ajopäiväkirjaa vähintään 6 vuotta verovuoden
//   päättymisestä"; "Sinun on aina tarjottava asiakkaalle kuitti saamastasi maksusta. Voit antaa
//   kuitin myös sähköisesti"; "Sinun on ilmoittauduttava arvonlisäverovelvollisten rekisteriin, jos
//   liikevaihtosi ylittää 20 000 euroa kalenterivuodessa. Huomioi tämä myös silloin, kun myyt
//   palvelujasi taksinvälityspalvelun kautta."; "13,5 % henkilökuljetuksissa (31.12.2025 saakka vero
//   oli 14 %)"; "25,5 % muissa kuljetuspalveluissa, esimerkiksi ruuan kotiinkuljetuksessa tai
//   pelkässä tavarankuljetuksessa."; deductible "arvonlisäveron osuus auton polttoainekuluista ja
//   lataussähköstä sekä korjaukseen ja pesuun liittyvistä kuluista"; platforms: "alusta toimii
//   yleensä kuljetuspalvelun välittäjänä. Tällöin alusta myy sinulle välityspalvelun ja veloittaa
//   sinulta välityspalkkion. Sinä myyt henkilökuljetuksen asiakkaalle."; "Varmista, että sinut on
//   merkitty asiakkaan esimerkiksi taksisovelluksesta saamaan kuittiin kuljetuspalvelun myyjäksi.";
//   "Ilmoita arvonlisävero koko asiakkaan maksamasta summasta, josta ei ole vähennetty alustan
//   pidättämää palkkiota." (example 113,50 € incl. 13,5 %, fee 10 €, paid out 103,50 €);
//   "Jos saat välityspalvelusta laskun, johon on merkitty Suomen arvonlisävero 25,5 %, et ole
//   ostajana verovelvollinen."; "Jos saat välityspalvelusta laskun, johon ei ole merkitty Suomen
//   arvonlisäveroa, sinun on suoritettava arvonlisäveroa ulkomaisen alustan puolesta."; "Laske itse
//   arvonlisävero 25,5 % alustan veloittamasta välityspalkkiosta"; EU platform → "Vero
//   palveluostoista muista EU-maista" and "Palveluostot muista EU-maista"; non-EU → "Vero kotimaan
//   myynnistä verokannoittain 25,5 %"; "Voit vähentää tämän arvonlisäveron saman verokauden
//   alv-ilmoituksella"; "Jos et ole alv-rekisterissä, sinun on rekisteröidyttävä ostosta
//   alv-velvolliseksi ... Kun liiketoimintasi on muutoin arvonlisäverotonta ja rekisteröidyt vain
//   ostosta, et voi vähentää välityspalvelun ostosta maksamaasi arvonlisäveroa."; income tax: "Saat
//   tehdä ajoneuvosta tuloverotuksessa poiston, jos taksina käytettävä ajoneuvo kuuluu yrityksen
//   varallisuuteen. Ajoneuvo kuuluu yrityksen varallisuuteen, jos ajoneuvolla vuosittain ajetuista
//   kilometreistä yli puolet on elinkeinotoiminnan ajoa."; "Jos taas ajoneuvo ei kuulu
//   yritystoiminnan varallisuuteen, saat tehdä yritystoimintaan kohdistuvien kilometrien perusteella
//   lisävähennyksen."; "Verohallinto saa kuljetuspalvelujen välittäjiltä tietoja saamistasi
//   maksuista verovalvonnan käyttöön."
// - Vero, Ajoneuvon ja sen käyttökulujen arvonlisävero (updated 5.5.2026;
//   https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/ajoneuvon-ja-sen-kayttokulujen-arvonlisavero/;
//   EN https://www.vero.fi/en/businesses-and-corporations/taxes-and-charges/vat/vat-on-vehicles/):
//   "Arvonlisäverollisen liiketoiminnan käytössä olevan henkilöauton vähäinenkin yksityiskäyttö ...
//   poistaa koko vähennysoikeuden henkilöautosta."; "Vähennysoikeuden rajoitus ei kuitenkaan vie
//   koko vähennysoikeutta esimerkiksi taksiyrityksen takseilta"; example "Taksia käytetään
//   ammattimaiseen henkilökuljetukseen ja yksityisajoihin": "Yritys voi vähentää kyseisen auton
//   hankinta- ja käyttökustannuksiin sisältyvät arvonlisäverot siltä osin kuin autoa käytetään
//   henkilökuljetukseen. Yksityisajojen osuutta yritys ei voi vähentää. Yrityksen pitää pystyä
//   näyttämään esimerkiksi ajopäiväkirjan avulla"; taxi also used for food/medicine delivery and no
//   private use: "Yritys voi vähentää hankinta- ja käyttökustannuksiin sisältyvät arvonlisäverot
//   kokonaisuudessaan."; with private use as well: "vain siltä osin kuin autoa käytetään
//   henkilökuljetukseen". Leasing: the page lists "leasingvuokriin sisältyviä arvonlisäveroja"
//   among car costs; that the taxi share rule applies to leasing rent is our reading of AVL 114 §
//   ("niihin tai niiden käyttöön liittyvät ... palvelut") and is worded accordingly.
// - Vero, Millaisesta toiminnasta pitää tai voi rekisteröityä alv-rekisteriin (updated 16.2.2026):
//   "Ilmoittaudu alv-rekisteriin, jos yrityksen liiketoiminnan liikevaihto ylittää kalenterivuodessa
//   20 000 euroa."; "Yritys voi hakeutua vapaaehtoisesti alv-velvolliseksi".
// - Vero, Alarajahuojennus (https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/alarajahuojennus/):
//   "Alarajahuojennus poistui 1.1.2025"; "Alarajahuojennusta ei voi enää saada 1.1.2025 tai sen
//   jälkeen alkavilta tilikausilta. Yritys voi hakea alarajahuojennusta takautuvasti."; "tilikausi
//   1.1.2024 - 31.12.2024: hae huojennusta viimeistään 31.12.2027". NOTE: the brief asked whether
//   the relief is still in force — it is not.
// - Laki liikenteen palveluista 320/2017 (https://www.finlex.fi/fi/lainsaadanto/2017/320):
//   15 a § as in force until 31.1.2027: "Henkilöliikennettä tarjoava luvanhaltija vastaa ja
//   huolehtii siitä, että taksiliikenteeseen käytettävässä ajoneuvossa käytetään taksamittaria, joka
//   täyttää mittauslaitelain ... vaatimukset, tai muuta laitetta tai järjestelmää, joka luotettavasti
//   kerää jokaisesta taksimatkasta sähköisessä muodossa seuraavat tiedot: 1) yrittäjän
//   yksilöintitiedot; 2) ajoneuvon yksilöintitiedot; 3) ajon suorittaneen kuljettajan
//   yksilöintitiedot; 4) matkan ajankohta, pituus ja ajallinen kesto; 5) matkan hinta- ja
//   maksutapatiedot." New wording "käytetään mittauslaitelain ... vaatimukset täyttävää
//   taksamittaria" with the note "muutettu 1 momentti tulee voimaan 1.2.2027"; the storage
//   rules ("säilytetään siten, ettei niiden sisältöä voi muuttaa") are left out because the consolidated
//   text did not make clear which wording is in force before 1.2.2027; transitional provisions of the amending
//   act in force 1.9.2026: "taksiliikenneluvanhaltijoiden tulee täyttää ... vaatimukset ajoneuvon
//   rekisteröinnistä ja liittämisestä liikenneluvalle viimeistään 1 päivänä tammikuuta 2027" and
//   driver's licence without training only "enintään 31 päivään lokakuuta 2026"; 25 § (applicant)
//   "joka on suorittanut 25 a §:ssä tarkoitetun taksinkuljettajan koulutuksen ja ... taksinkuljettajan
//   kokeen hyväksytysti". Traficom (Liikenne- ja viestintävirasto) issues the permits; not linked.
//   NOTE: the brief expected the taximeter requirement to have been relaxed for good in 2018; the
//   law now restores a certified taximeter in every taxi from 1.2.2027.
// - Elinkeinoverolaki 360/1968 (https://www.finlex.fi/fi/lainsaadanto/1968/360): 30 § "Verovuoden
//   poiston suuruus saa olla enintään 25 prosenttia menojäännöksestä."; 33 § 3 mom.
//   "Ammattimaiseen liikenteeseen käytetyn auton hankintamenosta poistetaan verovelvollisen
//   vaatiessa sinä verovuonna, jona auto on otettu käyttöön, enintään 25 prosenttia, kahtena
//   seuraavana verovuotena enintään 20 prosenttia ja sen jälkeisinä verovuosina enintään 15
//   prosenttia." Vero, Poistot elinkeinoverotuksessa, VH/3556/00.01.00/2025, antopäivä 3.9.2025,
//   voimassa toistaiseksi (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/102183/poistot-elinkeinoverotuksessa4/):
//   "Ammattimaiseen liikenteeseen käytettyjen autojen hankintamenot voidaan vähentää vaihtoehtoisesti
//   EVL 30 §:n tai EVL 33 §:n 3 momentin mukaisesti."; "Hyödykkeelle valittua poistomenetelmää ei
//   voi myöhemmin vaihtaa, ellei valinta ole perustunut EVL:n virheelliseen soveltamiseen."
//   NOTE: the brief mentioned only the 25 % declining balance; the taxi-specific EVL 33 § 3 mom.
//   alternative is added.
// - Kirjanpitolaki 1336/1997 (https://www.finlex.fi/fi/lainsaadanto/1997/1336): 2:5 "Kirjauksen on
//   perustuttava päivättyyn ja järjestelmällisesti numeroituun tai vastaavalla tavalla
//   yksilöityyn tositteeseen, joka todentaa liiketapahtuman."; 2:10 "tilikauden tositteet ... on
//   säilytettävä vähintään kuusi vuotta sen vuoden lopusta, jonka aikana tilikausi on päättynyt".
// - Kela, Kuljetuspalvelut (https://www.kela.fi/yhteistyokumppanit-kuljetuspalvelut): "Kela korvaa
//   taksimatkan silloin, kun se on tilattu tilausvälityskeskuksesta, joka on tehnyt Kelan kanssa
//   suorakorvaussopimuksen." Kela, Tietotarjotin 9.4.2026
//   (https://www.kela.fi/tietotarjotin/1369368-kelan-matkakorvausmenot-kasvoivat-taustalla-etenkin-arvonlisaveron-ja-taksitaksan-korotukset):
//   "Taksissa asiakas maksaa vain omavastuun ja Kela maksaa matkan muun osuuden suoraan
//   palveluntuottajalle suorakorvauksena. Omavastuu on enintään 25 euroa per suunta."; "taksimatkoja
//   koskevaa alennettua arvonlisäveroa korotettiin 10 prosentista 14 prosenttiin". That Kela and
//   school rides carry the same 13,5 % follows from AVL 85 § ("henkilökuljetus", no carve-out)
//   read with the narrow 36 § exemption; Vero has no separate taxi page on it.
// - Vaavo: the bureau's app for sending receipts; mentioned once, in the closing paragraph.
// - Laki liikenteen palveluista 320/2017, 152 § 2 mom. as amended by 612/2026 (in force 1.9.2026;
//   the amending act's later dates cover only 15 a § 1 and 3 mom., 227 §, 268 a § 3 mom., 35 a §
//   and 265 §, not 152 §): "Jos kuluttajille tarjottavasta taksimatkasta ei ole sovittu kiinteää
//   hintaa, on matkan hinnan perustuttava kuljettuun matkaan ja matkaan käytettyyn aikaan, ja
//   hinnan määrityksessä on käytettävä mittauslaitelain vaatimukset täyttävää taksamittaria. ...
//   Vastuu taksamittarin käyttämisestä on kuljettajalla." So a certified taximeter is already
//   required for consumer rides without an agreed fixed price; fixed-price rides (e.g. platform
//   rides priced up front) fall under 15 a § only until 1.2.2027. The fine for breaching this is
//   not stated because it was not verified on finlex.
// - AVL 3 § 3 mom.: "Edellä 1 momentissa tarkoitettuun liikevaihtoon luetaan 2 momentissa
//   tarkoitettujen myyntien arvonlisäveroton arvo." — the 20 000 € threshold is counted without VAT.
// - Driver's log timing per Vero: "kultakin kuukaudelta ajovuoroittain, tai jos ajovuoroja ei ole
//   vahvistettu, vuorokausittain" — by shift; by day only if shifts are not fixed.
// - Leasing: worded as our reasonable reading of AVL 114 § ("niihin tai niiden käyttöön liittyvät
//   ... palvelut"), not as a stated Vero rule.
// Deliberately NOT included: YEL income limits and ennakkovero amounts (they live in their own
// guides), car-benefit euro values, autovero relief details, Traficom fees, and the other new
// 152 § pricing rules (example-ride price, price information) beyond the taximeter duty above.
const VERO = 'https://www.vero.fi';

const SRC = {
  taxiFi: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/uusi-yritys/taksiyrittaja/`,
  taxiEn: `${VERO}/en/businesses-and-corporations/business-operations/setting-up-a-business/taxi-entrepreneur/`,
  vehicleFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/ajoneuvon-ja-sen-kayttokulujen-arvonlisavero/`,
  vehicleEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/vat-on-vehicles/`,
  vatRegFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/rekisterointi/millaisesta-toiminnasta-pit%C3%A4%C3%A4-tai-voi-rekister%C3%B6ity%C3%A4-alv-rekisteriin/`,
  vatRegEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/how-to-register-for-vat/what-business-operations-require-or-allow-vat-registration/`,
  reliefFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/alarajahuojennus/`,
  reliefEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/vat-relief-scheme/`,
  depreciation: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/102183/poistot-elinkeinoverotuksessa4/`,
  kela: 'https://www.kela.fi/yhteistyokumppanit-kuljetuspalvelut',
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  lp: 'https://www.finlex.fi/fi/lainsaadanto/2017/320',
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
};

export const taksiyrittajanKirjanpito: Guide = {
  slug: 'taksiyrittajan-kirjanpito',
  datePublished: '2026-11-19',
  dateModified: '2026-11-19',
  content: {
    fi: {
      title: 'Taksiyrittäjän kirjanpito ja ALV 2026: alustat, Kela-kyydit ja auto',
      description:
        'Taksiyrittäjän kirjanpito ja ALV 2026: 13,5 %:n verokanta, Uberin ja Boltin palkkiot, Kela-kyydit, taksamittari, auton alv-vähennys ja poistot.',
      lead: 'Moni aloittaa taksiyrittäjänä toiminimellä ja ajaa Uberin, Boltin tai välityskeskuksen kautta. Silloin myyjä on yleensä kuljettaja itse, ei alusta, ja kirjanpidossa ratkaisevat alv-kanta, alustan palkkion verokohtelu ja auton käyttöosuudet. Kokosimme vuoden 2026 säännöt, kuukauden tositteet, yleisimmät virheet ja esimerkin euroina.',
      body: [
        { t: 'h2', x: 'Luvat lyhyesti' },
        { t: 'p', x: 'Taksiliikenteen harjoittaminen edellyttää Traficomin myöntämää taksiliikennelupaa, ja kuljettajalla on oltava taksinkuljettajan ajolupa. Säännökset ovat laissa liikenteen palveluista (320/2017). Auto on rekisteröitävä luvanvaraiseen käyttöön, jos sitä käytetään edes osan aikaa taksina, ja 1.9.2026 voimaan tulleen muutoksen mukaan luvanhaltijan on liitettävä ajoneuvo liikenneluvalle viimeistään 1.1.2027. Uuden ajoluvan saaminen edellyttää nyt taksinkuljettajan koulutusta ja hyväksyttyä koetta.' },
        { t: 'p', x: 'Ennen ensimmäistä kyytiä tee perustamisilmoitus, jolla saat Y-tunnuksen ja voit samalla ilmoittautua ennakkoperintärekisteriin ja tarvittaessa arvonlisäverovelvollisten rekisteriin.' },
        { t: 'h2', x: 'Arvonlisävero: henkilökuljetus 13,5 %' },
        { t: 'p', x: 'Henkilökuljetuksen arvonlisävero on 1.1.2026 alkaen 13,5 % (AVL 85 §). Muut kuljetukset, esimerkiksi ruoan kotiinkuljetus tai pelkkä tavarankuljetus, ovat yleisen 25,5 %:n verokannan piirissä. Jos ajat samalla autolla sekä matkustajia että lähetyksiä, myynnit on eriteltävä verokannoittain.' },
        { t: 'ul', items: [
          '31.12.2024 asti: 10 %.',
          '1.1.–31.12.2025: 14 %.',
          '1.1.2026 alkaen: 13,5 %. Ratkaisevaa on kyydin ajankohta, joten vuodenvaihteen kyydeissä tarkista, kumman vuoden kantaa käytetään.',
        ] },
        { t: 'h3', x: 'Milloin alv-rekisteriin?' },
        { t: 'p', x: 'Alv-rekisteriin on ilmoittauduttava, kun liikevaihto ylittää 20 000 euroa kalenterivuodessa. Raja koskee myös alustojen ja välityskeskusten kautta ajettuja kyytejä, ja koska myyjä olet sinä, liikevaihtoon lasketaan asiakkaiden maksamat hinnat eikä alustan tilittämä nettosumma. Rajaa laskettaessa liikevaihto otetaan ilman arvonlisäveroa (AVL 3 § 3 mom.). Pienemmälläkin liikevaihdolla voi hakeutua rekisteriin vapaaehtoisesti, jolloin saa vähentää hankintojen arvonlisäveron.' },
        { t: 'p', x: 'Alarajahuojennus poistui 1.1.2025: sitä ei saa 1.1.2025 tai sen jälkeen alkavilta tilikausilta. Kalenterivuodelta 2024 huojennusta voi vielä hakea takautuvasti viimeistään 31.12.2027.' },
        { t: 'h3', x: 'Kela-, koulu- ja muut sopimuskyydit' },
        { t: 'p', x: 'Kela korvaa taksimatkan vain, kun se on tilattu tilausvälityskeskuksesta, jolla on Kelan kanssa suorakorvaussopimus. Matkustaja maksaa autossa vain omavastuun, enintään 25 euroa suuntaansa, ja Kela maksaa loput suoraan palveluntuottajalle, jonka kautta rahat tulevat sinulle sopimuksesi mukaan. Kela-, koulu- ja muut sopimuskyydit ovat henkilökuljetusta, joten niihin sovelletaan samaa 13,5 %:n verokantaa. Verotonta on vain sairaankuljetus erityisesti tätä tarkoitusta varten varustetulla ajoneuvolla (AVL 36 §).' },
        { t: 'h2', x: 'Ajaminen Uberin, Boltin tai välityskeskuksen kautta' },
        { t: 'p', x: 'Kun myyt kyydin välitysalustan kautta, alusta toimii Verohallinnon mukaan yleensä välittäjänä: se myy sinulle välityspalvelun ja veloittaa siitä palkkion, ja sinä myyt henkilökuljetuksen matkustajalle. Varmista, että sinut on merkitty matkustajan kuittiin kuljetuspalvelun myyjäksi ja että kuitissa näkyy hintaan sisältyvä 13,5 %:n arvonlisävero.' },
        { t: 'p', x: 'Arvonlisävero ilmoitetaan koko summasta, jonka matkustaja maksoi, eikä alustan pidättämää palkkiota vähennetä myynnistä. Palkkio kirjataan erikseen kuluksi.' },
        { t: 'h3', x: 'Alustan palkkio ja käännetty verovelvollisuus' },
        { t: 'ul', items: [
          'Jos palkkiolaskussa on Suomen arvonlisävero 25,5 %, maksat laskun normaalisti ja vähennät sen arvonlisäveron, kun olet alv-rekisterissä.',
          'Jos laskussa ei ole Suomen arvonlisäveroa, maksat veron itse alustan puolesta (käännetty verovelvollisuus): 25,5 % palkkiosta.',
          'EU-maahan sijoittautunut alusta: vero kohtaan ”Vero palveluostoista muista EU-maista” ja palkkiot kohtaan ”Palveluostot muista EU-maista”. EU:n ulkopuolinen alusta: vero kohtaan ”Vero kotimaan myynnistä verokannoittain 25,5 %”.',
          'Alv-rekisterissä oleva yrittäjä vähentää saman veron saman verokauden ilmoituksella, joten nettovaikutus on yleensä nolla.',
          'Jos et ole alv-rekisterissä, sinun on silti rekisteröidyttävä ostoista alv-velvolliseksi ja maksettava vero palkkiosta. Silloin veroa ei saa vähentää.',
        ] },
        { t: 'h3', x: 'Tilitysraportit tositteina' },
        { t: 'p', x: 'Kirjanpitolain mukaan jokainen kirjaus perustuu tositteeseen, joka todentaa liiketapahtuman. Alustan ja välityskeskuksen kausittainen tilitysraportti on taksiyrittäjän tärkein myyntitosite: siitä näkyvät matkustajien maksamat hinnat, palkkiot ja tilitetty summa. Täsmäytä raportin tilitys pankkitiliin ja säilytä raportit sekä palkkiolaskut vähintään kuusi vuotta. Verohallinto saa välittäjiltä tiedot sinulle maksetuista summista, joten kaikki ajotulot on ilmoitettava, välitettiinpä kyyti mitä kautta tahansa.' },
        { t: 'h2', x: 'Taksamittari, kuitti ja ajopäiväkirja' },
        { t: 'p', x: 'Luvanhaltijan on nyt huolehdittava, että taksissa on taksamittari tai muu laite tai järjestelmä, joka luotettavasti kerää jokaisesta matkasta sähköisesti yrittäjän, ajoneuvon ja kuljettajan tunnistetiedot, matkan ajankohdan, pituuden ja keston sekä hinta- ja maksutapatiedot. Jos kuluttajan kanssa ei ole sovittu kiinteää hintaa, hinnan määrityksessä on kuitenkin jo nyt käytettävä mittauslaitelain vaatimukset täyttävää taksamittaria, ja vastuu sen käyttämisestä on kuljettajalla (laki liikenteen palveluista 152 § 2 mom.). Tämä ei koske kiinteähintaisia kyytejä, esimerkiksi alustan kautta etukäteen hinnoiteltuja matkoja. 1.2.2027 alkaen jokaisessa taksissa on käytettävä mittauslaitelain vaatimukset täyttävää taksamittaria (15 a §), myös alustojen kautta ajettaessa.' },
        { t: 'p', x: 'Asiakkaalle on aina tarjottava kuitti maksusta; sähköinen kuitti käy. Ammattiautoilijan on lisäksi pidettävä ajopäiväkirjaa kultakin kuukaudelta ajovuoroittain tai, jos ajovuoroja ei ole vahvistettu, vuorokausittain. Siinä erotellaan ajotulot käteis-, luotto- ja muihin tuloihin sekä vuoden kilometrit ammattiajoihin, tuloa tuottamattomiin ammattiajoihin, yksityisajoihin ja muihin ajoihin. Kuitinantolaitteella varustetun taksamittarin raporttia voi käyttää ajopäiväkirjana. Säilytä ajopäiväkirja vähintään kuusi vuotta verovuoden päättymisestä.' },
        { t: 'h2', x: 'Auton arvonlisävero: taksi on poikkeus' },
        { t: 'p', x: 'Tavallisesti henkilöauton arvonlisäveroa ei saa vähentää lainkaan, jos autolla on vähäistäkin yksityiskäyttöä. Ammattimaiseen henkilökuljetukseen hankittu auto on poikkeus (AVL 114 §): hankinnan ja käyttökulujen arvonlisäverosta vähennetään henkilökuljetusta vastaava osuus, vaikka autolla ajettaisiin myös yksityisajoja. Yksityisajojen osuutta ei vähennetä.' },
        { t: 'ul', items: [
          'Vähennettäviä ovat esimerkiksi auton ostohinnan, polttoaineen, lataussähkön, huollon, korjausten ja pesujen arvonlisävero.',
          'Jos autoa käytetään vain henkilökuljetukseen ja muuhun verolliseen kuljetukseen (esimerkiksi ruokakuljetuksiin) eikä lainkaan yksityisesti, kaiken arvonlisäveron saa vähentää.',
          'Jos autolla ajetaan henkilökuljetusten lisäksi muita kuljetuksia ja yksityisajoja, vähennys tehdään vain henkilökuljetusten osuudesta.',
          'Käyttöosuudet osoitetaan ajopäiväkirjalla. Ilman sitä vähennystä on vaikea perustella.',
          'Leasingauton vuokra on kulu. Koska AVL 114 § koskee myös auton käyttöön liittyviä palveluja, on perusteltua soveltaa leasingvuokran arvonlisäveroon samaa käyttöosuutta kuin muihin auton kuluihin.',
        ] },
        { t: 'h2', x: 'Auto tuloverotuksessa' },
        { t: 'p', x: 'Toiminimiyrittäjän taksi kuuluu yrityksen varallisuuteen, jos vuoden kilometreistä yli puolet on elinkeinotoiminnan ajoa. Silloin auton kulut kirjataan yrityksen kuluiksi ja hankintamenosta tehdään poistot, ja yksityisajojen osuus käsitellään yksityiskäyttönä. Jos auto ei kuulu yritykselle, yritysajoista saa kilometrien perusteella lisävähennyksen.' },
        { t: 'ul', items: [
          'Pääsääntö: enintään 25 % vuodessa menojäännöksestä yhdessä muun irtaimen käyttöomaisuuden kanssa (EVL 30 §).',
          'Vaihtoehto ammattimaisen liikenteen autolle: hankintamenosta enintään 25 % käyttöönottovuonna, enintään 20 % kahtena seuraavana vuonna ja sen jälkeen enintään 15 % vuodessa (EVL 33 § 3 mom.).',
          'Menetelmä valitaan, kun auto otetaan käyttöön, eikä valintaa voi myöhemmin vaihtaa, ellei se perustunut lain virheelliseen soveltamiseen.',
        ] },
        { t: 'p', x: 'Osakeyhtiössä auto on yhtiön omaisuutta. Jos omistaja käyttää yhtiön autoa yksityisajoihin, hänelle syntyy verotettava autoetu, joka käsitellään palkkana. Ajopäiväkirjan vaatimuksista ja autoedusta kerromme tarkemmin oppaassamme Ajopäiväkirja.' },
        { t: 'h2', x: 'Tulovero, ennakkovero ja YEL lyhyesti' },
        { t: 'p', x: 'Toiminimen taksitulo ilmoitetaan elinkeinotoiminnan veroilmoituksella, ja verot maksetaan vuoden aikana ennakkoveroina. YEL-vakuutus on pakollinen, kun yrittäjätoiminnan työtulo ylittää vuosittain vahvistettavan rajan. Näitä käsittelemme oppaissamme Toiminimen verotus, Ennakkovero ja YEL-vakuutus.' },
        { t: 'h2', x: 'Kuukauden kirjanpito: mitä toimitetaan' },
        { t: 'ul', items: [
          'Alustojen ja välityskeskusten tilitysraportit ja palkkiolaskut kaikilta kuukauden tilityskausilta.',
          'Taksamittarin tai muun laitteen raportit sekä käteiskyytien tiedot.',
          'Kela-, koulu- ja muiden sopimuskyytien tilitykset ja omat laskut.',
          'Pankkitilin tiliote kokonaisuudessaan; mieluiten erillinen tili vain yrityksen käyttöön.',
          'Polttoaine-, lataus-, huolto-, pesu-, vakuutus- ja leasingtositteet sekä puhelin- ja välitysmaksut.',
          'Ajopäiväkirja, josta näkyvät yksityisajojen kilometrit.',
        ] },
        { t: 'h2', x: 'Esimerkki euroina' },
        { t: 'p', x: 'Alv-rekisterissä oleva toiminimiyrittäjä ajaa yhden kuukauden. Alusta on sijoittautunut toiseen EU-maahan, eikä sen palkkiolaskussa ole Suomen arvonlisäveroa. Ajopäiväkirjan mukaan 10 % kilometreistä on yksityisajoa.' },
        { t: 'ul', items: [
          'Matkustajat maksoivat alustan kautta 5 675,00 € (sis. alv 13,5 %): myynti 5 000,00 € ja arvonlisävero 675,00 €.',
          'Alusta pidätti palkkion 1 000,00 € ja tilitti pankkitilille 4 675,00 €. Palkkiosta lasketaan käännettynä verona 255,00 € (25,5 %), joka ilmoitetaan maksettavaksi ja vähennetään samalla ilmoituksella.',
          'Kela-kyydit välityskeskuksen kautta 1 135,00 € (sis. alv 13,5 %): myynti 1 000,00 € ja arvonlisävero 135,00 €.',
          'Polttoaine 627,50 € (sis. alv 25,5 %): veroton 500,00 € ja arvonlisävero 127,50 €. Henkilökuljetuksen osuus 90 %, joten vähennettävä vero on 114,75 €.',
          'Kuukaudelta maksettava arvonlisävero: 675,00 + 135,00 + 255,00 − 255,00 − 114,75 = 695,25 €.',
        ] },
        { t: 'p', x: 'Jos yrittäjä olisi ilmoittanut veron vain alustan tilittämästä 4 675,00 eurosta, myynnin arvonlisävero olisi jäänyt liian pieneksi. Polttoaineen yksityisajojen osuus (10 %) ei ole vähennyskelpoinen myöskään tuloverotuksessa.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Myynti kirjataan alustan tilittämänä nettosummana, ja arvonlisävero lasketaan siitä.',
          'Ulkomaisen alustan palkkiosta ei ilmoiteta käännettyä arvonlisäveroa, tai alv-rekisteriin kuulumaton kuljettaja ei rekisteröidy ostoista.',
          'Vuoden 2026 kyydeissä käytetään vielä 14 %:n verokantaa.',
          'Ruokakuljetuksiin sovelletaan henkilökuljetuksen 13,5 %:n kantaa 25,5 %:n sijaan.',
          'Auton arvonlisävero vähennetään kokonaan, vaikka autolla ajetaan yksityisajoja, tai ajopäiväkirjaa ei pidetä.',
          '20 000 euron rajaa seurataan nettotilityksistä, ja rekisteröityminen myöhästyy.',
          'Kela- ja välityskeskuskyytejä ei täsmäytetä tilityksiin, ja osa myynnistä jää kirjaamatta.',
        ] },
        { t: 'note', x: 'Tiedot on tarkistettu marraskuussa 2026: henkilökuljetuksen arvonlisävero 13,5 % (14 % vuonna 2025), yleinen verokanta 25,5 %, alv-rekisteröinnin raja 20 000 euroa kalenterivuodessa, alarajahuojennus poistunut 1.1.2025 ja hyväksytty taksamittari pakollinen jo nyt kuluttajakyydeissä ilman kiinteää hintaa ja kaikissa takseissa 1.2.2027 alkaen. Alustojen sopimukset ja laskutustavat vaihtelevat, joten tarkista oma palkkiolaskusi. Lähteet: arvonlisäverolaki (1501/1993), elinkeinoverolaki (360/1968), laki liikenteen palveluista (320/2017), kirjanpitolaki (1336/1997), Verohallinto ja Kela.' },
        { t: 'h2', x: 'Autamme taksiyrittäjiä' },
        { t: 'p', x: 'Tilitoimisto Debit Credit hoitaa taksiyrittäjien kirjanpidon ja alv-ilmoitukset: kirjaamme alustojen tilitykset bruttona, käsittelemme palkkioiden käännetyn arvonlisäveron, täsmäytämme Kela- ja välityskeskuskyydit sekä laskemme auton vähennykset ajopäiväkirjan perusteella. Asiakkaamme voivat toimittaa kuitit ja tilitysraportit Vaavo-sovelluksen kautta. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä jo ennen ensimmäistä ajovuoroa, niin rekisteröinnit ja tositteet ovat kunnossa alusta asti.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: taksiyrittäjä – näin aloitat toiminnan', href: SRC.taxiFi },
          { label: 'Verohallinto: ajoneuvon ja sen käyttökulujen arvonlisävero', href: SRC.vehicleFi },
          { label: 'Verohallinto: millaisesta toiminnasta pitää tai voi rekisteröityä alv-rekisteriin', href: SRC.vatRegFi },
          { label: 'Verohallinto: alarajahuojennus', href: SRC.reliefFi },
          { label: 'Verohallinto: poistot elinkeinoverotuksessa', href: SRC.depreciation },
          { label: 'Kela: kuljetuspalvelut ja Kelan korvaamat taksimatkat', href: SRC.kela },
          { label: 'Finlex: arvonlisäverolaki (1501/1993)', href: SRC.avl },
          { label: 'Finlex: elinkeinoverolaki (360/1968)', href: SRC.evl },
          { label: 'Finlex: laki liikenteen palveluista (320/2017)', href: SRC.lp },
          { label: 'Finlex: kirjanpitolaki (1336/1997)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Mikä on taksikyydin arvonlisävero vuonna 2026?', a: 'Henkilökuljetuksen arvonlisävero on 1.1.2026 alkaen 13,5 %. Vuonna 2025 se oli 14 % ja sitä ennen 10 %. Ruoan kotiinkuljetus ja pelkkä tavarankuljetus kuuluvat yleiseen 25,5 %:n verokantaan.' },
        { q: 'Pitääkö minun maksaa arvonlisäveroa, jos liikevaihtoni jää alle 20 000 euron?', a: 'Myynnistä et ole velvollinen maksamaan arvonlisäveroa, ellet hakeudu rekisteriin vapaaehtoisesti. Jos ulkomainen alusta laskuttaa palkkion ilman Suomen arvonlisäveroa, sinun on kuitenkin rekisteröidyttävä ostoista alv-velvolliseksi ja maksettava 25,5 %:n vero palkkiosta, eikä sitä silloin saa vähentää.' },
        { q: 'Ilmoitetaanko arvonlisävero matkustajan maksamasta hinnasta vai alustan tilityksestä?', a: 'Matkustajan maksamasta koko hinnasta. Alustan pidättämää palkkiota ei vähennetä myynnistä, vaan se on erillinen kulu, jonka arvonlisävero käsitellään palkkiolaskun mukaan.' },
        { q: 'Saako taksin arvonlisäveron vähentää, jos ajan autolla myös yksityisesti?', a: 'Saa siltä osin kuin autoa käytetään ammattimaiseen henkilökuljetukseen. Taksi on poikkeus tavallisen henkilöauton säännöstä, jossa vähäinenkin yksityiskäyttö estää koko vähennyksen. Yksityisajojen osuus osoitetaan ajopäiväkirjalla, eikä sitä vähennetä.' },
        { q: 'Tarvitaanko taksamittari myös Uberissa ja Boltissa?', a: 'Jos kuluttajan kanssa ei ole sovittu kiinteää hintaa, hinta on jo nyt määritettävä mittauslaitelain vaatimukset täyttävällä taksamittarilla, ja vastuu sen käytöstä on kuljettajalla. Kiinteähintaisissa kyydeissä, kuten alustan etukäteen hinnoittelemissa, kelpaa toistaiseksi taksamittari tai muu laite tai järjestelmä, joka luotettavasti tallentaa jokaisen matkan tiedot. 1.2.2027 alkaen jokaisessa taksiliikenteen ajoneuvossa on käytettävä mittauslaitelain vaatimukset täyttävää taksamittaria.' },
      ],
    },
    ru: {
      title: 'Бухгалтерия и НДС таксиста в Финляндии 2026: Uber, Bolt, Kela и автомобиль',
      description:
        'Бухгалтерия таксиста в Финляндии в 2026 году: НДС 13,5 %, комиссии Uber и Bolt, поездки Kela, таксометр, вычет НДС по машине и амортизация.',
      lead: 'Многие начинают работать в такси как toiminimi и ездят через Uber, Bolt или диспетчерский центр (välityskeskus). Продавцом поездки при этом обычно считается сам водитель, а не платформа, и в бухгалтерии всё решают ставка НДС, налоговый режим комиссии платформы и доля использования машины. Мы собрали правила 2026 года, документы за месяц, типичные ошибки и пример в евро.',
      body: [
        { t: 'h2', x: 'Коротко о лицензиях' },
        { t: 'p', x: 'Для работы в такси нужна лицензия на таксомоторные перевозки (taksiliikennelupa), которую выдаёт Traficom, а у водителя должно быть разрешение водителя такси (taksinkuljettajan ajolupa). Правила установлены законом о транспортных услугах (Laki liikenteen palveluista 320/2017). Машину нужно зарегистрировать для лицензируемого использования, даже если она работает в такси лишь часть времени, а по изменению, вступившему в силу 1.9.2026, владелец лицензии должен привязать автомобиль к лицензии не позднее 1.1.2027. Для получения нового разрешения водителя теперь нужны обучение водителей такси и сданный экзамен.' },
        { t: 'p', x: 'До первой поездки подайте уведомление о регистрации (perustamisilmoitus): вы получите Y-tunnus и сможете сразу встать в реестр предоплаты (ennakkoperintärekisteri), а при необходимости и в реестр плательщиков НДС.' },
        { t: 'h2', x: 'НДС: пассажирские перевозки 13,5 %' },
        { t: 'p', x: 'С 1.1.2026 ставка НДС на пассажирские перевозки составляет 13,5 % (AVL 85 §). Другие перевозки, например доставка еды или просто перевозка грузов, облагаются общей ставкой 25,5 %. Если вы на одной машине возите и пассажиров, и посылки, продажи нужно разделять по ставкам.' },
        { t: 'ul', items: [
          'До 31.12.2024: 10 %.',
          '1.1–31.12.2025: 14 %.',
          'С 1.1.2026: 13,5 %. Важна дата поездки, поэтому для поездок на стыке лет проверьте, ставка какого года применяется.',
        ] },
        { t: 'h3', x: 'Когда регистрироваться плательщиком НДС?' },
        { t: 'p', x: 'Встать в реестр плательщиков НДС обязательно, когда оборот превышает 20 000 евро за календарный год. Порог учитывает и поездки через платформы и диспетчерские центры, а поскольку продавец — вы, в оборот входят суммы, которые заплатили пассажиры, а не нетто-сумма, перечисленная платформой. Для порога оборот считается без НДС (AVL 3 § 3 mom.). При меньшем обороте можно зарегистрироваться добровольно и тогда вычитать НДС с покупок.' },
        { t: 'p', x: 'Льгота для малого оборота (alarajahuojennus) отменена с 1.1.2025: за финансовые годы, начавшиеся 1.1.2025 или позже, её не получить. За 2024 календарный год льготу ещё можно запросить задним числом не позднее 31.12.2027.' },
        { t: 'h3', x: 'Поездки Kela, школьные и другие договорные поездки' },
        { t: 'p', x: 'Kela возмещает поездку на такси, только если её заказали через диспетчерский центр, у которого есть договор прямого возмещения с Kela. Пассажир платит в машине лишь свою долю (omavastuu), не более 25 евро в одну сторону, а остальное Kela платит напрямую поставщику услуги, через которого деньги приходят вам по вашему договору. Поездки Kela, школьные и другие договорные поездки — это пассажирские перевозки, поэтому к ним применяется та же ставка 13,5 %. Без НДС только санитарная перевозка на специально оборудованном для этого транспорте (AVL 36 §).' },
        { t: 'h2', x: 'Работа через Uber, Bolt или диспетчерский центр' },
        { t: 'p', x: 'Когда вы продаёте поездку через платформу, по разъяснению налоговой (Verohallinto) платформа обычно выступает посредником: она продаёт вам посредническую услугу и берёт за неё комиссию, а пассажирскую перевозку пассажиру продаёте вы. Проверьте, что в чеке пассажира продавцом услуги указаны вы и что в чеке выделен входящий в цену НДС 13,5 %.' },
        { t: 'p', x: 'НДС декларируется со всей суммы, которую заплатил пассажир; комиссия платформы из продаж не вычитается. Комиссия проводится отдельно как расход.' },
        { t: 'h3', x: 'Комиссия платформы и обратное начисление НДС' },
        { t: 'ul', items: [
          'Если в счёте за комиссию указан финский НДС 25,5 %, вы просто оплачиваете счёт и, будучи в реестре НДС, вычитаете этот НДС.',
          'Если финского НДС в счёте нет, налог за платформу платите вы сами (обратное начисление, käännetty verovelvollisuus): 25,5 % от комиссии.',
          'Платформа из другой страны ЕС: налог — в строку «Vero palveluostoista muista EU-maista», комиссии — в строку «Palveluostot muista EU-maista». Платформа из-за пределов ЕС: налог — в строку «Vero kotimaan myynnistä verokannoittain 25,5 %».',
          'Плательщик НДС вычитает этот же налог в декларации того же периода, поэтому в итоге эффект обычно нулевой.',
          'Если вы не в реестре НДС, всё равно нужно зарегистрироваться плательщиком НДС по покупкам и уплатить налог с комиссии. Вычесть его в этом случае нельзя.',
        ] },
        { t: 'h3', x: 'Отчёты платформ как первичные документы' },
        { t: 'p', x: 'По закону о бухгалтерском учёте каждая проводка основывается на документе, подтверждающем хозяйственную операцию. Периодический отчёт о выплатах платформы или диспетчерского центра — главный документ продаж таксиста: в нём видны суммы, оплаченные пассажирами, комиссии и перечисленная сумма. Сверяйте выплату по отчёту с банковским счётом и храните отчёты и счета за комиссию не менее шести лет. Налоговая получает от посредников данные о выплаченных вам суммах, поэтому декларировать нужно все доходы от поездок, через кого бы они ни были заказаны.' },
        { t: 'h2', x: 'Таксометр, чек и журнал поездок' },
        { t: 'p', x: 'Сейчас владелец лицензии должен обеспечить, чтобы в такси был таксометр или другое устройство либо система, которые надёжно и в электронном виде собирают по каждой поездке данные о предпринимателе, автомобиле и водителе, время, длину и продолжительность поездки, а также цену и способ оплаты. Но если с потребителем не согласована фиксированная цена, уже сейчас цену нужно определять таксометром, соответствующим закону об измерительных приборах, и ответственность за его использование несёт водитель (закон о транспортных услугах, 152 § 2 mom.). На поездки с фиксированной ценой, например с ценой, заранее объявленной платформой, это требование не распространяется. С 1.2.2027 в каждом такси, в том числе при работе через платформы, обязателен таксометр, соответствующий закону об измерительных приборах (15 a §).' },
        { t: 'p', x: 'Клиенту всегда нужно предлагать чек об оплате, электронный тоже подходит. Кроме того, профессиональный водитель обязан вести журнал поездок (ajopäiväkirja) за каждый месяц по сменам, а если смены не установлены — по суткам. В нём доходы делятся на наличные, безналичные и прочие, а километры за год — на профессиональные поездки, профессиональные поездки без дохода, личные и прочие поездки. Отчёт таксометра с устройством выдачи чеков можно использовать как журнал поездок. Храните журнал не менее шести лет после окончания налогового года.' },
        { t: 'h2', x: 'НДС по машине: такси — исключение' },
        { t: 'p', x: 'Обычно НДС по легковому автомобилю вообще нельзя вычесть, если у машины есть хотя бы незначительное личное использование. Автомобиль, приобретённый для профессиональных пассажирских перевозок, — исключение (AVL 114 §): из НДС по покупке и расходам на содержание вычитается доля, приходящаяся на пассажирские перевозки, даже если на машине ездят и по личным делам. Долю личных поездок не вычитают.' },
        { t: 'ul', items: [
          'Вычитается, например, НДС с цены автомобиля, топлива, электричества для зарядки, обслуживания, ремонта и мойки.',
          'Если машина используется только для пассажирских и других облагаемых перевозок (например, доставки еды) и совсем не используется лично, вычитается весь НДС.',
          'Если кроме пассажирских перевозок на машине выполняют другие перевозки и личные поездки, вычет делается только с доли пассажирских перевозок.',
          'Доли использования подтверждаются журналом поездок. Без него вычет трудно обосновать.',
          'Аренда автомобиля в лизинг — расход. Поскольку AVL 114 § охватывает и услуги, связанные с использованием машины, к НДС с лизинговых платежей разумно применять ту же долю использования, что и к другим расходам на машину.',
        ] },
        { t: 'h2', x: 'Машина в подоходном налогообложении' },
        { t: 'p', x: 'Такси предпринимателя с toiminimi относится к имуществу предприятия, если больше половины километров за год — поездки в рамках бизнеса. Тогда расходы на машину проводятся как расходы предприятия, с цены покупки делается амортизация, а доля личных поездок учитывается как личное использование. Если машина не относится к предприятию, за деловые поездки по километрам полагается дополнительный вычет (lisävähennys).' },
        { t: 'ul', items: [
          'Основное правило: не более 25 % в год от остаточной стоимости (menojäännös) вместе с другим движимым основным имуществом (EVL 30 §).',
          'Вариант для автомобиля профессиональных перевозок: с цены покупки не более 25 % в год ввода в эксплуатацию, не более 20 % в каждый из двух следующих лет и далее не более 15 % в год (EVL 33 § 3 mom.).',
          'Метод выбирается при вводе машины в эксплуатацию, и позже его нельзя поменять, если выбор не был основан на ошибочном применении закона.',
        ] },
        { t: 'p', x: 'В osakeyhtiö (ООО) машина принадлежит компании. Если владелец использует машину компании для личных поездок, у него возникает облагаемая автомобильная льгота (autoetu), которая учитывается как зарплата. Подробнее о требованиях к журналу поездок и об autoetu — в нашем руководстве «Журнал поездок (ajopäiväkirja)».' },
        { t: 'h2', x: 'Подоходный налог, ennakkovero и YEL — коротко' },
        { t: 'p', x: 'Доход toiminimi от такси декларируется в налоговой декларации предпринимательской деятельности, а налоги в течение года платятся авансом (ennakkovero). Страхование YEL обязательно, когда трудовой доход предпринимателя превышает ежегодно утверждаемый порог. Эти темы мы разбираем в руководствах «Налоги toiminimi», «Авансовый налог (ennakkovero)» и «YEL».' },
        { t: 'h2', x: 'Бухгалтерия за месяц: что передавать' },
        { t: 'ul', items: [
          'Отчёты о выплатах и счета за комиссию от платформ и диспетчерских центров за все расчётные периоды месяца.',
          'Отчёты таксометра или другого устройства и данные о поездках за наличные.',
          'Расчёты и собственные счета по поездкам Kela, школьным и другим договорным поездкам.',
          'Полная выписка по банковскому счёту; лучше отдельный счёт только для бизнеса.',
          'Документы за топливо, зарядку, обслуживание, мойку, страховку и лизинг, а также плата за телефон и диспетчерские услуги.',
          'Журнал поездок, в котором видны километры личных поездок.',
        ] },
        { t: 'h2', x: 'Пример в евро' },
        { t: 'p', x: 'Предприниматель с toiminimi, зарегистрированный плательщиком НДС, работает один месяц. Платформа зарегистрирована в другой стране ЕС, и в её счёте за комиссию нет финского НДС. По журналу поездок 10 % километров — личные поездки.' },
        { t: 'ul', items: [
          'Пассажиры заплатили через платформу 5 675,00 € (с НДС 13,5 %): продажи 5 000,00 € и НДС 675,00 €.',
          'Платформа удержала комиссию 1 000,00 € и перечислила на банковский счёт 4 675,00 €. С комиссии начисляется налог по обратному механизму 255,00 € (25,5 %), который указывается к уплате и вычитается в той же декларации.',
          'Поездки Kela через диспетчерский центр 1 135,00 € (с НДС 13,5 %): продажи 1 000,00 € и НДС 135,00 €.',
          'Топливо 627,50 € (с НДС 25,5 %): без налога 500,00 € и НДС 127,50 €. Доля пассажирских перевозок 90 %, поэтому к вычету 114,75 €.',
          'НДС к уплате за месяц: 675,00 + 135,00 + 255,00 − 255,00 − 114,75 = 695,25 €.',
        ] },
        { t: 'p', x: 'Если бы предприниматель задекларировал налог только с перечисленных платформой 4 675,00 евро, НДС с продаж оказался бы занижен. Доля топлива на личные поездки (10 %) не вычитается и в подоходном налогообложении.' },
        { t: 'h2', x: 'Типичные ошибки' },
        { t: 'ul', items: [
          'Продажи проводятся в размере нетто-суммы, перечисленной платформой, и НДС считается с неё.',
          'С комиссии иностранной платформы не декларируется НДС по обратному механизму, или водитель вне реестра НДС не регистрируется по покупкам.',
          'Для поездок 2026 года всё ещё используется ставка 14 %.',
          'К доставке еды применяется ставка пассажирских перевозок 13,5 % вместо 25,5 %.',
          'НДС по машине вычитается полностью, хотя на ней ездят по личным делам, или журнал поездок не ведётся.',
          'Порог 20 000 евро отслеживается по нетто-выплатам, и регистрация запаздывает.',
          'Поездки Kela и диспетчерского центра не сверяются с расчётами, и часть продаж остаётся непроведённой.',
        ] },
        { t: 'note', x: 'Данные проверены в ноябре 2026 года: НДС на пассажирские перевозки 13,5 % (14 % в 2025 году), общая ставка 25,5 %, порог регистрации плательщиком НДС 20 000 евро за календарный год, льгота для малого оборота отменена с 1.1.2025, сертифицированный таксометр уже сейчас обязателен в поездках для потребителей без фиксированной цены, а с 1.2.2027 — в каждом такси. Договоры и порядок выставления счетов у платформ различаются, поэтому проверьте свой счёт за комиссию. Источники: закон об НДС (1501/1993), закон о налогообложении предпринимательской деятельности (360/1968), закон о транспортных услугах (320/2017), закон о бухгалтерском учёте (1336/1997), Verohallinto и Kela.' },
        { t: 'h2', x: 'Мы помогаем таксистам' },
        { t: 'p', x: 'Tilitoimisto Debit Credit ведёт бухгалтерию таксистов и подаёт декларации по НДС: проводим выплаты платформ в валовой сумме, оформляем обратное начисление НДС с комиссий, сверяем поездки Kela и диспетчерских центров и рассчитываем вычеты по машине на основании журнала поездок. Наши клиенты могут отправлять чеки и отчёты о выплатах через приложение Vaavo. Мы работаем на финском и русском языках. Свяжитесь с нами ещё до первой смены, чтобы регистрации и документы были в порядке с самого начала.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Verohallinto: таксист — как начать деятельность (на финском)', href: SRC.taxiFi },
          { label: 'Verohallinto: taxi entrepreneur (на английском)', href: SRC.taxiEn },
          { label: 'Verohallinto: VAT on vehicles (на английском)', href: SRC.vehicleEn },
          { label: 'Verohallinto: регистрация в реестре плательщиков НДС (на английском)', href: SRC.vatRegEn },
          { label: 'Verohallinto: льгота для малого оборота (на английском)', href: SRC.reliefEn },
          { label: 'Verohallinto: амортизация в налогообложении бизнеса (на финском)', href: SRC.depreciation },
          { label: 'Kela: транспортные услуги и поездки на такси с возмещением (на финском)', href: SRC.kela },
          { label: 'Finlex: закон об НДС (1501/1993)', href: SRC.avl },
          { label: 'Finlex: закон о налогообложении предпринимательской деятельности (360/1968)', href: SRC.evl },
          { label: 'Finlex: закон о транспортных услугах (320/2017)', href: SRC.lp },
          { label: 'Finlex: закон о бухгалтерском учёте (1336/1997)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Какая ставка НДС на поездку в такси в 2026 году?', a: 'С 1.1.2026 НДС на пассажирские перевозки составляет 13,5 %. В 2025 году ставка была 14 %, а до этого 10 %. Доставка еды и простая перевозка грузов облагаются общей ставкой 25,5 %.' },
        { q: 'Нужно ли платить НДС, если мой оборот меньше 20 000 евро?', a: 'С продаж вы не обязаны платить НДС, если не зарегистрировались добровольно. Но если иностранная платформа выставляет счёт за комиссию без финского НДС, вы должны зарегистрироваться плательщиком НДС по покупкам и уплатить налог 25,5 % с комиссии, а вычесть его в этом случае нельзя.' },
        { q: 'НДС декларируется с цены, которую заплатил пассажир, или с выплаты платформы?', a: 'Со всей цены, которую заплатил пассажир. Удержанная платформой комиссия не вычитается из продаж: это отдельный расход, НДС с которого учитывается по счёту за комиссию.' },
        { q: 'Можно ли вычесть НДС по такси, если я езжу на машине и по личным делам?', a: 'Можно в той доле, в которой машина используется для профессиональных пассажирских перевозок. Такси — исключение из правила для обычного легкового автомобиля, где даже незначительное личное использование лишает права на весь вычет. Долю личных поездок подтверждают журналом поездок и не вычитают.' },
        { q: 'Нужен ли таксометр при работе через Uber и Bolt?', a: 'Если с потребителем не согласована фиксированная цена, уже сейчас цену нужно определять сертифицированным таксометром, и отвечает за его использование водитель. Для поездок с фиксированной ценой, например заранее объявленной платформой, пока подходит таксометр или другое устройство либо система, которые надёжно записывают данные каждой поездки. С 1.2.2027 в каждом автомобиле такси должен использоваться таксометр, соответствующий закону об измерительных приборах.' },
      ],
    },
    en: {
      title: 'Bookkeeping and VAT for Taxi Drivers in Finland 2026: Uber, Bolt, Kela and the Car',
      description:
        'Taxi driver bookkeeping and VAT in Finland 2026: the 13.5% rate, Uber and Bolt fees, Kela rides, the taximeter, VAT on the car and depreciation.',
      lead: 'Many people start out as taxi drivers with a toiminimi (sole trader) and drive through Uber, Bolt or a dispatch centre (välityskeskus). The seller of the ride is then usually the driver, not the platform, and the bookkeeping turns on the VAT rate, the tax treatment of the platform fee and how the car is used. Here are the 2026 rules, the monthly paperwork, the most common mistakes and a worked example in euros.',
      body: [
        { t: 'h2', x: 'Licences in brief' },
        { t: 'p', x: 'Running a taxi business requires a taxi transport licence (taksiliikennelupa) from Traficom, and the driver needs a taxi driver’s licence (taksinkuljettajan ajolupa). The rules are in the Act on Transport Services (Laki liikenteen palveluista 320/2017). The car must be registered for licensed use if it is used as a taxi even part of the time, and under an amendment in force since 1 September 2026 the licence holder must link the vehicle to the licence by 1 January 2027. A new driver’s licence now requires taxi driver training and a passed exam.' },
        { t: 'p', x: 'Before your first ride, file the start-up notification (perustamisilmoitus). You get a Business ID (Y-tunnus) and can register at the same time for the prepayment register and, if needed, the VAT register.' },
        { t: 'h2', x: 'VAT: passenger transport is 13.5%' },
        { t: 'p', x: 'From 1 January 2026 the VAT rate for passenger transport is 13.5% (VAT Act section 85). Other transport, such as food delivery or plain goods transport, falls under the general rate of 25.5%. If you carry both passengers and parcels in the same car, keep the sales separate by rate.' },
        { t: 'ul', items: [
          'Until 31 December 2024: 10%.',
          '1 January to 31 December 2025: 14%.',
          'From 1 January 2026: 13.5%. The date of the ride decides, so for rides around New Year check which year’s rate applies.',
        ] },
        { t: 'h3', x: 'When do you have to register for VAT?' },
        { t: 'p', x: 'You must register for VAT when your turnover exceeds €20,000 in a calendar year. The threshold includes rides through platforms and dispatch centres, and since you are the seller, turnover means what the passengers paid, not the net amount the platform pays out. For the threshold, turnover is counted without VAT (AVL 3 § 3 mom.). With a smaller turnover you can register voluntarily and then deduct the VAT on your purchases.' },
        { t: 'p', x: 'The VAT relief for small businesses (alarajahuojennus) was abolished on 1 January 2025: it is not available for financial periods starting on or after that date. For calendar year 2024 it can still be claimed retroactively until 31 December 2027.' },
        { t: 'h3', x: 'Kela, school and other contract rides' },
        { t: 'p', x: 'Kela reimburses a taxi ride only if it was ordered through a booking centre that has a direct reimbursement agreement with Kela. In the car the passenger pays only the deductible, at most €25 per direction, and Kela pays the rest directly to the service provider, through which the money reaches you under your contract. Kela, school and other contract rides are passenger transport, so the same 13.5% rate applies. Only patient transport in a vehicle specially equipped for that purpose is VAT-exempt (VAT Act section 36).' },
        { t: 'h2', x: 'Driving through Uber, Bolt or a dispatch centre' },
        { t: 'p', x: 'When you sell a ride through a platform, the Tax Administration (Verohallinto) says the platform usually acts as an intermediary: it sells you an intermediation service and charges a fee for it, and you sell the passenger transport to the passenger. Make sure the passenger’s receipt names you as the seller of the transport service and shows the 13.5% VAT included in the price.' },
        { t: 'p', x: 'VAT is reported on the full amount the passenger paid; the platform’s fee is not deducted from your sales. The fee is booked separately as an expense.' },
        { t: 'h3', x: 'The platform fee and the reverse charge' },
        { t: 'ul', items: [
          'If the fee invoice shows Finnish VAT of 25.5%, you pay it as normal and, if you are VAT-registered, deduct that VAT.',
          'If the invoice shows no Finnish VAT, you pay the tax yourself on the platform’s behalf (reverse charge, käännetty verovelvollisuus): 25.5% of the fee.',
          'Platform established in another EU country: the tax goes on the line “Vero palveluostoista muista EU-maista” (tax on purchases of services from other EU countries) and the fees on “Palveluostot muista EU-maista”. Platform outside the EU: the tax goes on “Vero kotimaan myynnistä verokannoittain 25,5 %”.',
          'A VAT-registered driver deducts the same tax on the return for the same period, so the net effect is usually zero.',
          'If you are not VAT-registered, you still have to register as liable for VAT on purchases and pay the tax on the fee. In that case you cannot deduct it.',
        ] },
        { t: 'h3', x: 'Settlement reports as vouchers' },
        { t: 'p', x: 'Under the Accounting Act every entry must be based on a voucher that evidences the transaction. The periodic settlement report from a platform or dispatch centre is a taxi driver’s main sales voucher: it shows what the passengers paid, the fees and the amount paid out. Reconcile the payout in each report with your bank account and keep the reports and fee invoices for at least six years. The Tax Administration receives data from intermediaries on the amounts paid to you, so all ride income must be reported, whoever arranged the ride.' },
        { t: 'h2', x: 'Taximeter, receipt and driver’s log' },
        { t: 'p', x: 'For now, the licence holder must make sure the taxi has a taximeter or another device or system that reliably records, electronically for every ride, the identity of the entrepreneur, the vehicle and the driver, the time, length and duration of the ride, and the price and payment method. However, if no fixed price has been agreed with a consumer, the price must already be set with a taximeter that meets the Measuring Instruments Act, and the driver is responsible for using it (Act on Transport Services, section 152(2)). This does not apply to fixed-price rides, such as platform rides priced up front. From 1 February 2027 every taxi must use a taximeter that meets the Measuring Instruments Act (section 15 a), including when driving for platforms.' },
        { t: 'p', x: 'You must always offer the customer a receipt for the payment; an electronic receipt is fine. A professional driver must also keep a driver’s log (ajopäiväkirja) for each month, per shift, or per day if shifts have not been fixed. It splits ride income into cash, invoiced/card rides and other income, and the year’s kilometres into professional rides, non-earning professional driving, private driving and other driving. The report of a taximeter with a receipt printer can serve as the log. Keep the log for at least six years from the end of the tax year.' },
        { t: 'h2', x: 'VAT on the car: taxis are an exception' },
        { t: 'p', x: 'Normally no VAT at all can be deducted on a passenger car if it has even minor private use. A car acquired for professional passenger transport is an exception (VAT Act section 114): you deduct the share of VAT on the purchase and running costs that matches passenger transport, even if the car is also driven privately. The private share is not deducted.' },
        { t: 'ul', items: [
          'Deductible items include VAT on the car’s purchase price, fuel, charging electricity, servicing, repairs and washes.',
          'If the car is used only for passenger transport and other taxable transport (such as food delivery) and not privately at all, all of the VAT is deductible.',
          'If the car is used for passenger transport plus other transport and private driving, only the passenger transport share is deductible.',
          'The usage shares are proven with the driver’s log. Without it the deduction is hard to justify.',
          'Leasing rent is an expense. Since AVL section 114 also covers services related to the vehicle’s use, it is reasonable to apply the same usage share to the VAT on leasing rent as to the car’s other costs.',
        ] },
        { t: 'h2', x: 'The car in income taxation' },
        { t: 'p', x: 'A sole trader’s taxi belongs to the business if more than half of the year’s kilometres are business driving. The car costs are then business expenses, the purchase price is depreciated, and the private share is treated as private use. If the car does not belong to the business, you get an additional deduction (lisävähennys) per business kilometre.' },
        { t: 'ul', items: [
          'Main rule: at most 25% a year of the undepreciated balance (menojäännös), together with other movable fixed assets (Business Income Tax Act section 30).',
          'Alternative for a car used in professional transport: at most 25% of the acquisition cost in the year it is taken into use, at most 20% in each of the next two years and at most 15% a year after that (section 33, subsection 3).',
          'The method is chosen when the car is taken into use and cannot be changed later unless the choice was based on a misapplication of the law.',
        ] },
        { t: 'p', x: 'In a limited company (osakeyhtiö) the car belongs to the company. If the owner uses the company car privately, he or she receives a taxable car benefit (autoetu), treated as salary. Driver’s log requirements and the car benefit are covered in more detail in our guide Driver’s log (ajopäiväkirja).' },
        { t: 'h2', x: 'Income tax, prepaid tax and YEL in brief' },
        { t: 'p', x: 'A sole trader reports taxi income on the business tax return and pays the taxes during the year as prepaid tax (ennakkovero). YEL pension insurance is compulsory once the entrepreneur’s work income exceeds a limit confirmed every year. We cover these in our guides on toiminimi tax, prepaid tax (ennakkovero) and YEL insurance.' },
        { t: 'h2', x: 'Monthly bookkeeping: what to send' },
        { t: 'ul', items: [
          'Settlement reports and fee invoices from platforms and dispatch centres for every settlement period in the month.',
          'Reports from the taximeter or other device, and details of cash rides.',
          'Settlements and your own invoices for Kela, school and other contract rides.',
          'The full bank statement; ideally a separate account used only for the business.',
          'Receipts for fuel, charging, servicing, washes, insurance and leasing, plus phone and dispatch fees.',
          'The driver’s log showing private kilometres.',
        ] },
        { t: 'h2', x: 'Worked example in euros' },
        { t: 'p', x: 'A VAT-registered sole trader drives for one month. The platform is established in another EU country and its fee invoice shows no Finnish VAT. According to the driver’s log, 10% of the kilometres are private driving.' },
        { t: 'ul', items: [
          'Passengers paid €5,675.00 through the platform (incl. 13.5% VAT): sales €5,000.00 and VAT €675.00.',
          'The platform kept a fee of €1,000.00 and paid out €4,675.00 to the bank account. The reverse-charge tax on the fee is €255.00 (25.5%), reported as payable and deducted on the same return.',
          'Kela rides through a dispatch centre €1,135.00 (incl. 13.5% VAT): sales €1,000.00 and VAT €135.00.',
          'Fuel €627.50 (incl. 25.5% VAT): €500.00 net and VAT €127.50. The passenger transport share is 90%, so €114.75 is deductible.',
          'VAT payable for the month: 675.00 + 135.00 + 255.00 − 255.00 − 114.75 = €695.25.',
        ] },
        { t: 'p', x: 'Had the driver reported VAT only on the €4,675.00 the platform paid out, the VAT on sales would have been too low. The private share of fuel (10%) is not deductible in income taxation either.' },
        { t: 'h2', x: 'Most common mistakes' },
        { t: 'ul', items: [
          'Sales are booked as the net amount paid out by the platform, and VAT is calculated on that.',
          'No reverse-charge VAT is reported on a foreign platform’s fee, or a driver outside the VAT register does not register for purchases.',
          'Rides in 2026 are still taxed at 14%.',
          'Food deliveries are taxed at the 13.5% passenger rate instead of 25.5%.',
          'All VAT on the car is deducted although it is used privately, or no driver’s log is kept.',
          'The €20,000 threshold is tracked from net payouts, and registration comes too late.',
          'Kela and dispatch-centre rides are not reconciled with the settlements, and part of the sales goes unrecorded.',
        ] },
        { t: 'note', x: 'Checked in November 2026: VAT on passenger transport 13.5% (14% in 2025), general rate 25.5%, VAT registration threshold €20,000 per calendar year, small-business VAT relief abolished on 1 January 2025, and a certified taximeter already mandatory for consumer rides without a fixed price and in every taxi from 1 February 2027. Platform contracts and invoicing differ, so check your own fee invoice. Sources: VAT Act (1501/1993), Business Income Tax Act (360/1968), Act on Transport Services (320/2017), Accounting Act (1336/1997), the Tax Administration and Kela.' },
        { t: 'h2', x: 'We help taxi entrepreneurs' },
        { t: 'p', x: 'Tilitoimisto Debit Credit keeps the books and files the VAT returns for taxi entrepreneurs: we book platform settlements gross, handle the reverse-charge VAT on fees, reconcile Kela and dispatch-centre rides and calculate the car deductions from the driver’s log. Our clients can send their receipts and settlement reports through the Vaavo app. We work in Finnish and Russian. Get in touch before your first shift, and your registrations and paperwork will be in order from day one.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Tax Administration: taxi entrepreneur', href: SRC.taxiEn },
          { label: 'Tax Administration: VAT on vehicles', href: SRC.vehicleEn },
          { label: 'Tax Administration: what business operations require or allow VAT registration', href: SRC.vatRegEn },
          { label: 'Tax Administration: VAT relief scheme', href: SRC.reliefEn },
          { label: 'Tax Administration: depreciation in business taxation (in Finnish)', href: SRC.depreciation },
          { label: 'Kela: transport services and reimbursed taxi rides (in Finnish)', href: SRC.kela },
          { label: 'Finlex: VAT Act (1501/1993, in Finnish)', href: SRC.avl },
          { label: 'Finlex: Business Income Tax Act (360/1968, in Finnish)', href: SRC.evl },
          { label: 'Finlex: Act on Transport Services (320/2017, in Finnish)', href: SRC.lp },
          { label: 'Finlex: Accounting Act (1336/1997, in Finnish)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'What is the VAT rate on a taxi ride in 2026?', a: 'From 1 January 2026 the VAT rate on passenger transport is 13.5%. It was 14% in 2025 and 10% before that. Food delivery and plain goods transport fall under the general rate of 25.5%.' },
        { q: 'Do I have to pay VAT if my turnover stays below €20,000?', a: 'You do not have to charge VAT on your sales unless you register voluntarily. But if a foreign platform invoices its fee without Finnish VAT, you must register as liable for VAT on purchases and pay 25.5% on the fee, and in that case you cannot deduct it.' },
        { q: 'Is VAT reported on what the passenger paid or on the platform payout?', a: 'On the full price the passenger paid. The fee the platform keeps is not deducted from sales; it is a separate expense whose VAT is handled according to the fee invoice.' },
        { q: 'Can I deduct VAT on my taxi if I also drive it privately?', a: 'Yes, for the share used in professional passenger transport. Taxis are an exception to the ordinary passenger car rule, under which even minor private use blocks the whole deduction. The private share is shown with the driver’s log and is not deducted.' },
        { q: 'Do I need a taximeter when driving for Uber or Bolt?', a: 'If no fixed price has been agreed with a consumer, the price must already be set with a certified taximeter, and the driver is responsible for using it. For fixed-price rides, such as those priced up front by the platform, a taximeter or another device or system that reliably records every ride is enough for now. From 1 February 2027 every vehicle used as a taxi must have a taximeter that meets the Measuring Instruments Act.' },
      ],
    },
    et: {
      title: 'Taksojuhi raamatupidamine ja käibemaks Soomes 2026: Uber, Bolt, Kela ja auto',
      description:
        'Taksojuhi raamatupidamine ja käibemaks Soomes 2026: 13,5% maksumäär, Uberi ja Bolti tasud, Kela sõidud, taksomeeter, auto käibemaks ja kulum.',
      lead: 'Paljud alustavad Soomes taksojuhina toiminimi (FIE) vormis ja sõidavad Uberi, Bolti või tellimiskeskuse (välityskeskus) kaudu. Sõidu müüjaks on siis tavaliselt juht ise, mitte platvorm, ning raamatupidamises on otsustav käibemaksumäär, platvormi tasu maksustamine ja auto kasutusosad. Panime kokku 2026. aasta reeglid, kuu dokumendid, levinumad vead ja näite eurodes.',
      body: [
        { t: 'h2', x: 'Load lühidalt' },
        { t: 'p', x: 'Taksoveoks on vaja Traficomi antud taksoveoluba (taksiliikennelupa) ja juhil peab olema taksojuhi luba (taksinkuljettajan ajolupa). Reeglid on transporditeenuste seaduses (Laki liikenteen palveluista 320/2017). Auto tuleb registreerida loakohustuslikuks kasutuseks, kui seda kasutatakse taksona kasvõi osa ajast, ning 1.9.2026 jõustunud muudatuse järgi peab loa omanik siduma sõiduki veoloaga hiljemalt 1.1.2027. Uue taksojuhi loa saamiseks on nüüd vaja taksojuhi koolitust ja sooritatud eksamit.' },
        { t: 'p', x: 'Enne esimest sõitu esita asutamisteade (perustamisilmoitus): saad Y-tunnuse ja saad samal ajal registreeruda ettemaksuregistrisse (ennakkoperintärekisteri) ning vajaduse korral käibemaksukohustuslaste registrisse.' },
        { t: 'h2', x: 'Käibemaks: sõitjatevedu 13,5%' },
        { t: 'p', x: 'Alates 1.1.2026 on sõitjateveo käibemaksumäär 13,5% (AVL 85 §). Muu vedu, näiteks toidu kojuvedu või pelgalt kaubavedu, maksustatakse üldmääraga 25,5%. Kui veod samas autos nii sõitjaid kui ka pakke, tuleb müük maksumäärade kaupa eristada.' },
        { t: 'ul', items: [
          'Kuni 31.12.2024: 10%.',
          '1.1–31.12.2025: 14%.',
          'Alates 1.1.2026: 13,5%. Otsustab sõidu aeg, seega aastavahetuse sõitude puhul kontrolli, millise aasta määra kasutada.',
        ] },
        { t: 'h3', x: 'Millal registreeruda käibemaksukohustuslaseks?' },
        { t: 'p', x: 'Käibemaksukohustuslaste registrisse tuleb registreeruda, kui käive ületab kalendriaastas 20 000 eurot. Piiri sisse lähevad ka platvormide ja tellimiskeskuste kaudu tehtud sõidud ning kuna müüja oled sina, arvestatakse käibe hulka sõitjate makstud hinnad, mitte platvormi välja makstud netosumma. Piiri arvestamisel võetakse käive ilma käibemaksuta (AVL 3 § 3 mom.). Väiksema käibega võib registreeruda vabatahtlikult ja siis ostude käibemaksu maha arvata.' },
        { t: 'p', x: 'Väikese käibe soodustus (alarajahuojennus) kaotati 1.1.2025: seda ei saa 1.1.2025 või hiljem algavate majandusaastate eest. Kalendriaasta 2024 eest saab soodustust veel tagasiulatuvalt taotleda kuni 31.12.2027.' },
        { t: 'h3', x: 'Kela, kooli- ja muud lepingulised sõidud' },
        { t: 'p', x: 'Kela hüvitab taksosõidu ainult siis, kui see on tellitud tellimiskeskusest, millel on Kelaga otsehüvitise leping. Sõitja maksab autos ainult omaosaluse, kuni 25 eurot ühes suunas, ja ülejäänu maksab Kela otse teenuseosutajale, kelle kaudu raha jõuab sinuni vastavalt sinu lepingule. Kela, kooli- ja muud lepingulised sõidud on sõitjatevedu, seega kehtib neile sama 13,5% määr. Käibemaksuvaba on ainult haigete vedu selleks eriotstarbeliselt varustatud sõidukiga (AVL 36 §).' },
        { t: 'h2', x: 'Sõitmine Uberi, Bolti või tellimiskeskuse kaudu' },
        { t: 'p', x: 'Kui müüd sõidu platvormi kaudu, on platvorm Soome maksuameti (Verohallinto) järgi tavaliselt vahendaja: ta müüb sulle vahendusteenust ja võtab selle eest tasu, sõitjateveo müüd sõitjale aga sina. Veendu, et sõitja tšekil oleks veoteenuse müüjana märgitud sina ja et tšekil oleks näha hinna sees olev 13,5% käibemaks.' },
        { t: 'p', x: 'Käibemaks deklareeritakse kogu summalt, mille sõitja maksis; platvormi kinni peetud tasu müügist maha ei arvata. Tasu kirjendatakse eraldi kuluna.' },
        { t: 'h3', x: 'Platvormi tasu ja pöördmaksustamine' },
        { t: 'ul', items: [
          'Kui tasu arvel on Soome käibemaks 25,5%, tasud arve tavapäraselt ja käibemaksukohustuslasena arvad selle käibemaksu maha.',
          'Kui arvel Soome käibemaksu ei ole, tasud maksu ise platvormi eest (pöördmaksustamine, käännetty verovelvollisuus): 25,5% tasust.',
          'Teises ELi riigis asuv platvorm: maks reale „Vero palveluostoista muista EU-maista” ja tasud reale „Palveluostot muista EU-maista”. Väljaspool ELi asuv platvorm: maks reale „Vero kotimaan myynnistä verokannoittain 25,5 %”.',
          'Käibemaksukohustuslane arvab sama maksu maha sama maksustamisperioodi deklaratsioonis, nii et lõppmõju on tavaliselt null.',
          'Kui sa ei ole käibemaksukohustuslaste registris, pead siiski registreeruma ostude osas käibemaksukohustuslaseks ja tasuma tasult maksu. Sel juhul seda maha arvata ei saa.',
        ] },
        { t: 'h3', x: 'Väljamakse aruanded kui algdokumendid' },
        { t: 'p', x: 'Raamatupidamisseaduse järgi peab iga kanne põhinema dokumendil, mis tõendab majandustehingut. Platvormi või tellimiskeskuse perioodiline väljamakse aruanne on taksojuhi peamine müügidokument: sellest on näha sõitjate makstud hinnad, tasud ja välja makstud summa. Võrdle aruande väljamakset pangakontoga ning säilita aruandeid ja tasu arveid vähemalt kuus aastat. Maksuamet saab vahendajatelt andmeid sulle makstud summade kohta, seega tuleb deklareerida kogu sõidutulu, ükskõik kelle kaudu sõit tuli.' },
        { t: 'h2', x: 'Taksomeeter, tšekk ja sõidupäevik' },
        { t: 'p', x: 'Praegu peab loa omanik tagama, et taksos oleks taksomeeter või muu seade või süsteem, mis kogub iga sõidu kohta usaldusväärselt ja elektrooniliselt ettevõtja, sõiduki ja juhi andmed, sõidu aja, pikkuse ja kestuse ning hinna ja makseviisi. Kui tarbijaga ei ole kokku lepitud kindlat hinda, tuleb hind aga juba praegu määrata mõõteseaduse nõuetele vastava taksomeetriga ja selle kasutamise eest vastutab juht (transporditeenuste seaduse 152 § 2 mom.). See ei puuduta kindla hinnaga sõite, näiteks platvormi kaudu ette hinnastatud sõite. Alates 1.2.2027 on igas taksos, ka platvormide kaudu sõites, kohustuslik mõõteseaduse nõuetele vastav taksomeeter (15 a §).' },
        { t: 'p', x: 'Kliendile tuleb alati pakkuda makse kohta tšekki; sobib ka elektrooniline tšekk. Lisaks peab kutseline juht pidama sõidupäevikut (ajopäiväkirja) iga kuu kohta vahetuste kaupa või, kui vahetusi ei ole kindlaks määratud, ööpäevade kaupa. Selles jagatakse sõidutulu sularaha-, krediidi- ja muuks tuluks ning aasta kilomeetrid kutselisteks sõitudeks, tulu mitte toovateks kutselisteks sõitudeks, erasõitudeks ja muudeks sõitudeks. Tšekiprinteriga taksomeetri aruannet võib kasutada sõidupäevikuna. Säilita sõidupäevikut vähemalt kuus aastat maksuaasta lõpust.' },
        { t: 'h2', x: 'Auto käibemaks: takso on erand' },
        { t: 'p', x: 'Tavaliselt ei saa sõiduauto käibemaksu üldse maha arvata, kui autol on kasvõi vähene erakasutus. Kutseliseks sõitjateveoks soetatud auto on erand (AVL 114 §): soetuse ja kasutuskulude käibemaksust arvatakse maha sõitjateveole vastav osa, isegi kui autoga sõidetakse ka erasõite. Erasõitude osa maha ei arvata.' },
        { t: 'ul', items: [
          'Maha arvatakse näiteks auto ostuhinna, kütuse, laadimiselektri, hoolduse, remondi ja pesu käibemaks.',
          'Kui autot kasutatakse ainult sõitjateveoks ja muuks maksustatavaks veoks (näiteks toiduveoks) ja üldse mitte isiklikult, võib kogu käibemaksu maha arvata.',
          'Kui autoga tehakse lisaks sõitjateveole muid vedusid ja erasõite, arvatakse maha ainult sõitjateveo osa.',
          'Kasutusosad tõendatakse sõidupäevikuga. Ilma selleta on mahaarvamist raske põhjendada.',
          'Liisinguauto rent on kulu. Kuna AVL 114 § hõlmab ka sõiduki kasutamisega seotud teenuseid, on mõistlik kohaldada liisingumaksete käibemaksule sama kasutusosa kui teistele autokuludele.',
        ] },
        { t: 'h2', x: 'Auto tulumaksustamises' },
        { t: 'p', x: 'Toiminimi takso kuulub ettevõtte varasse, kui üle poole aasta kilomeetritest on ettevõtlussõidud. Siis kirjendatakse autokulud ettevõtte kuludeks, soetusmaksumuselt arvestatakse kulumit ja erasõitude osa käsitletakse isikliku kasutusena. Kui auto ettevõttele ei kuulu, saab ettevõtlussõitude eest kilomeetrite alusel lisamahaarvamise (lisävähennys).' },
        { t: 'ul', items: [
          'Põhireegel: kuni 25% aastas jääkmaksumusest (menojäännös) koos muu vallasvarana oleva põhivaraga (EVL 30 §).',
          'Alternatiiv kutselises veos kasutatavale autole: soetusmaksumusest kuni 25% kasutuselevõtu aastal, kuni 20% kahel järgmisel aastal ja seejärel kuni 15% aastas (EVL 33 § 3. lõige).',
          'Meetod valitakse auto kasutuselevõtul ja seda ei saa hiljem muuta, kui valik ei põhinenud seaduse vääral kohaldamisel.',
        ] },
        { t: 'p', x: 'Osaühingus (osakeyhtiö) kuulub auto ühingule. Kui omanik kasutab ühingu autot erasõitudeks, tekib talle maksustatav autosoodustus (autoetu), mida käsitletakse palgana. Sõidupäeviku nõuetest ja autosoodustusest räägime lähemalt juhendis „Sõidupäevik (ajopäiväkirja)”.' },
        { t: 'h2', x: 'Tulumaks, ettemaks ja YEL lühidalt' },
        { t: 'p', x: 'Toiminimi taksotulu deklareeritakse ettevõtlustegevuse maksudeklaratsioonil ja maksud tasutakse aasta jooksul ettemaksuna (ennakkovero). YEL-pensionikindlustus on kohustuslik, kui ettevõtja töötulu ületab igal aastal kinnitatava piiri. Neid teemasid käsitleme juhendites toiminimi maksudest, ettemaksust (ennakkovero) ja YEL-kindlustusest.' },
        { t: 'h2', x: 'Kuu raamatupidamine: mida saata' },
        { t: 'ul', items: [
          'Platvormide ja tellimiskeskuste väljamakse aruanded ja tasu arved kuu kõigi arveldusperioodide kohta.',
          'Taksomeetri või muu seadme aruanded ning sularahasõitude andmed.',
          'Kela, kooli- ja muude lepinguliste sõitude arveldused ja oma arved.',
          'Pangakonto väljavõte tervikuna; soovitavalt eraldi konto ainult ettevõtte jaoks.',
          'Kütuse, laadimise, hoolduse, pesu, kindlustuse ja liisingu dokumendid ning telefoni- ja vahendustasud.',
          'Sõidupäevik, kust on näha erasõitude kilomeetrid.',
        ] },
        { t: 'h2', x: 'Näide eurodes' },
        { t: 'p', x: 'Käibemaksukohustuslasena registreeritud toiminimi ettevõtja sõidab ühe kuu. Platvorm asub teises ELi riigis ja selle tasu arvel ei ole Soome käibemaksu. Sõidupäeviku järgi on 10% kilomeetritest erasõidud.' },
        { t: 'ul', items: [
          'Sõitjad maksid platvormi kaudu 5 675,00 € (sh käibemaks 13,5%): müük 5 000,00 € ja käibemaks 675,00 €.',
          'Platvorm pidas kinni tasu 1 000,00 € ja kandis pangakontole 4 675,00 €. Tasult arvestatakse pöördmaksuna 255,00 € (25,5%), mis deklareeritakse tasumisele ja arvatakse samas deklaratsioonis maha.',
          'Kela sõidud tellimiskeskuse kaudu 1 135,00 € (sh käibemaks 13,5%): müük 1 000,00 € ja käibemaks 135,00 €.',
          'Kütus 627,50 € (sh käibemaks 25,5%): maksuta 500,00 € ja käibemaks 127,50 €. Sõitjateveo osa 90%, seega mahaarvatav maks on 114,75 €.',
          'Kuu tasumisele kuuluv käibemaks: 675,00 + 135,00 + 255,00 − 255,00 − 114,75 = 695,25 €.',
        ] },
        { t: 'p', x: 'Kui ettevõtja oleks deklareerinud maksu ainult platvormi välja makstud 4 675,00 eurolt, oleks müügi käibemaks jäänud liiga väikeseks. Kütuse erasõitude osa (10%) ei ole maha arvatav ka tulumaksustamises.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Müük kirjendatakse platvormi välja makstud netosummana ja käibemaks arvutatakse sellelt.',
          'Välismaise platvormi tasult ei deklareerita pöördkäibemaksu või registrisse mittekuuluv juht ei registreeru ostude osas.',
          '2026. aasta sõitudele rakendatakse veel 14% määra.',
          'Toiduveole rakendatakse sõitjateveo 13,5% määra 25,5% asemel.',
          'Auto käibemaks arvatakse maha täielikult, kuigi autoga tehakse erasõite, või sõidupäevikut ei peeta.',
          '20 000 euro piiri jälgitakse netoväljamaksete järgi ja registreerimine hilineb.',
          'Kela ja tellimiskeskuse sõite ei võrrelda arveldustega ja osa müügist jääb kirjendamata.',
        ] },
        { t: 'note', x: 'Andmed on kontrollitud 2026. aasta novembris: sõitjateveo käibemaks 13,5% (2025. aastal 14%), üldmäär 25,5%, käibemaksukohustuslaseks registreerimise piir 20 000 eurot kalendriaastas, väikese käibe soodustus kaotatud 1.1.2025 ja nõuetele vastav taksomeeter kohustuslik juba praegu kindla hinnata tarbijasõitudes ning alates 1.2.2027 igas taksos. Platvormide lepingud ja arveldusviisid erinevad, seega kontrolli oma tasu arvet. Allikad: Soome käibemaksuseadus (1501/1993), ettevõtlustulu maksustamise seadus (360/1968), transporditeenuste seadus (320/2017), raamatupidamisseadus (1336/1997), Verohallinto ja Kela.' },
        { t: 'h2', x: 'Aitame taksoettevõtjaid' },
        { t: 'p', x: 'Tilitoimisto Debit Credit peab taksoettevõtjate raamatupidamist ja esitab käibemaksudeklaratsioonid: kirjendame platvormide väljamaksed brutona, käsitleme tasude pöördkäibemaksu, võrdleme Kela ja tellimiskeskuste sõite arveldustega ning arvutame auto mahaarvamised sõidupäeviku põhjal. Meie kliendid saavad saata tšekid ja väljamakse aruanded Vaavo rakenduse kaudu. Teenindame soome ja vene keeles. Võta ühendust juba enne esimest vahetust, siis on registreeringud ja dokumendid algusest peale korras.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Verohallinto: taxi entrepreneur (inglise keeles)', href: SRC.taxiEn },
          { label: 'Verohallinto: VAT on vehicles (inglise keeles)', href: SRC.vehicleEn },
          { label: 'Verohallinto: käibemaksukohustuslaseks registreerimine (inglise keeles)', href: SRC.vatRegEn },
          { label: 'Verohallinto: väikese käibe soodustus (inglise keeles)', href: SRC.reliefEn },
          { label: 'Verohallinto: kulum ettevõtlustulu maksustamisel (soome keeles)', href: SRC.depreciation },
          { label: 'Kela: veoteenused ja hüvitatavad taksosõidud (soome keeles)', href: SRC.kela },
          { label: 'Finlex: käibemaksuseadus (1501/1993, soome keeles)', href: SRC.avl },
          { label: 'Finlex: ettevõtlustulu maksustamise seadus (360/1968, soome keeles)', href: SRC.evl },
          { label: 'Finlex: transporditeenuste seadus (320/2017, soome keeles)', href: SRC.lp },
          { label: 'Finlex: raamatupidamisseadus (1336/1997, soome keeles)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Milline on taksosõidu käibemaksumäär 2026. aastal?', a: 'Alates 1.1.2026 on sõitjateveo käibemaks 13,5%. 2025. aastal oli see 14% ja enne seda 10%. Toidu kojuvedu ja pelgalt kaubavedu maksustatakse üldmääraga 25,5%.' },
        { q: 'Kas pean maksma käibemaksu, kui mu käive jääb alla 20 000 euro?', a: 'Müügilt ei pea käibemaksu maksma, kui sa ei registreeru vabatahtlikult. Kui aga välismaine platvorm esitab tasu arve ilma Soome käibemaksuta, pead registreeruma ostude osas käibemaksukohustuslaseks ja tasuma tasult 25,5% maksu, mida sel juhul maha arvata ei saa.' },
        { q: 'Kas käibemaks deklareeritakse sõitja makstud hinnalt või platvormi väljamaksest?', a: 'Kogu hinnalt, mille sõitja maksis. Platvormi kinni peetud tasu müügist maha ei arvata: see on eraldi kulu, mille käibemaksu käsitletakse tasu arve järgi.' },
        { q: 'Kas takso käibemaksu saab maha arvata, kui sõidan autoga ka isiklikult?', a: 'Saab selles osas, mille ulatuses autot kasutatakse kutseliseks sõitjateveoks. Takso on erand tavalise sõiduauto reeglist, mille järgi isegi vähene erakasutus välistab kogu mahaarvamise. Erasõitude osa tõendatakse sõidupäevikuga ja seda maha ei arvata.' },
        { q: 'Kas Uberi ja Bolti kaudu sõites on taksomeeter vajalik?', a: 'Kui tarbijaga ei ole kokku lepitud kindlat hinda, tuleb hind juba praegu määrata nõuetele vastava taksomeetriga ja selle kasutamise eest vastutab juht. Kindla hinnaga sõitudes, näiteks platvormi poolt ette hinnastatud sõitudes, sobib praegu taksomeeter või muu seade või süsteem, mis salvestab usaldusväärselt iga sõidu andmed. Alates 1.2.2027 peab igas taksona kasutatavas sõidukis olema mõõteseaduse nõuetele vastav taksomeeter.' },
      ],
    },
    uk: {
      title: 'Бухгалтерія та ПДВ таксиста у Фінляндії 2026: Uber, Bolt, Kela і автомобіль',
      description:
        'Бухгалтерія таксиста у Фінляндії у 2026 році: ПДВ 13,5 %, комісії Uber і Bolt, поїздки Kela, таксометр, відрахування ПДВ за авто та амортизація.',
      lead: 'Багато хто починає працювати в таксі як toiminimi (ФОП) і їздить через Uber, Bolt або диспетчерський центр (välityskeskus). Продавцем поїздки тоді зазвичай є сам водій, а не платформа, і в бухгалтерії все вирішують ставка ПДВ, податковий режим комісії платформи та частки використання авто. Ми зібрали правила 2026 року, документи за місяць, типові помилки та приклад у євро.',
      body: [
        { t: 'h2', x: 'Коротко про ліцензії' },
        { t: 'p', x: 'Для роботи в таксі потрібна ліцензія на таксомоторні перевезення (taksiliikennelupa), яку видає Traficom, а водій повинен мати дозвіл водія таксі (taksinkuljettajan ajolupa). Правила встановлює закон про транспортні послуги (Laki liikenteen palveluista 320/2017). Авто треба зареєструвати для ліцензованого використання, навіть якщо воно працює в таксі лише частину часу, а за зміною, що набрала чинності 1.9.2026, власник ліцензії має прив’язати автомобіль до ліцензії не пізніше 1.1.2027. Для отримання нового дозволу водія тепер потрібні навчання водіїв таксі та складений іспит.' },
        { t: 'p', x: 'До першої поїздки подайте повідомлення про реєстрацію (perustamisilmoitus): ви отримаєте Y-tunnus і зможете одразу стати на облік у реєстрі передоплати (ennakkoperintärekisteri), а за потреби й у реєстрі платників ПДВ.' },
        { t: 'h2', x: 'ПДВ: пасажирські перевезення 13,5 %' },
        { t: 'p', x: 'З 1.1.2026 ставка ПДВ на пасажирські перевезення становить 13,5 % (AVL 85 §). Інші перевезення, наприклад доставка їжі чи просто перевезення вантажів, оподатковуються загальною ставкою 25,5 %. Якщо ви на одному авто возите і пасажирів, і посилки, продажі треба розділяти за ставками.' },
        { t: 'ul', items: [
          'До 31.12.2024: 10 %.',
          '1.1–31.12.2025: 14 %.',
          'З 1.1.2026: 13,5 %. Вирішальна дата поїздки, тому для поїздок на межі років перевірте, ставку якого року застосовувати.',
        ] },
        { t: 'h3', x: 'Коли реєструватися платником ПДВ?' },
        { t: 'p', x: 'Стати на облік у реєстрі платників ПДВ обов’язково, коли оборот перевищує 20 000 євро за календарний рік. Поріг враховує і поїздки через платформи та диспетчерські центри, а оскільки продавець — ви, до обороту входять суми, які сплатили пасажири, а не нетто-сума, перерахована платформою. Для порогу оборот рахують без ПДВ (AVL 3 § 3 mom.). За меншого обороту можна зареєструватися добровільно й тоді відраховувати ПДВ із покупок.' },
        { t: 'p', x: 'Пільгу для малого обороту (alarajahuojennus) скасовано з 1.1.2025: за фінансові роки, що почалися 1.1.2025 або пізніше, її не отримати. За 2024 календарний рік пільгу ще можна запросити заднім числом не пізніше 31.12.2027.' },
        { t: 'h3', x: 'Поїздки Kela, шкільні та інші договірні поїздки' },
        { t: 'p', x: 'Kela відшкодовує поїздку на таксі, лише якщо її замовили через диспетчерський центр, який має з Kela договір прямого відшкодування. Пасажир платить в авто лише свою частку (omavastuu), не більше 25 євро в один бік, а решту Kela платить безпосередньо постачальнику послуги, через якого гроші надходять вам за вашим договором. Поїздки Kela, шкільні та інші договірні поїздки — це пасажирські перевезення, тому до них застосовується та сама ставка 13,5 %. Без ПДВ лише санітарне перевезення спеціально обладнаним для цього транспортом (AVL 36 §).' },
        { t: 'h2', x: 'Робота через Uber, Bolt або диспетчерський центр' },
        { t: 'p', x: 'Коли ви продаєте поїздку через платформу, за роз’ясненням податкової (Verohallinto) платформа зазвичай діє як посередник: вона продає вам посередницьку послугу й бере за неї комісію, а пасажирське перевезення пасажирові продаєте ви. Перевірте, що в чеку пасажира продавцем послуги зазначено вас і що в чеку виділено ПДВ 13,5 %, який входить у ціну.' },
        { t: 'p', x: 'ПДВ декларується з усієї суми, яку сплатив пасажир; комісія платформи з продажів не віднімається. Комісію проводять окремо як витрату.' },
        { t: 'h3', x: 'Комісія платформи та зворотне нарахування ПДВ' },
        { t: 'ul', items: [
          'Якщо в рахунку за комісію зазначено фінський ПДВ 25,5 %, ви просто сплачуєте рахунок і, будучи в реєстрі ПДВ, відраховуєте цей ПДВ.',
          'Якщо фінського ПДВ у рахунку немає, податок за платформу сплачуєте ви самі (зворотне нарахування, käännetty verovelvollisuus): 25,5 % від комісії.',
          'Платформа з іншої країни ЄС: податок — у рядок «Vero palveluostoista muista EU-maista», комісії — у рядок «Palveluostot muista EU-maista». Платформа з-поза ЄС: податок — у рядок «Vero kotimaan myynnistä verokannoittain 25,5 %».',
          'Платник ПДВ відраховує цей самий податок у декларації того самого періоду, тож у підсумку ефект зазвичай нульовий.',
          'Якщо ви не в реєстрі ПДВ, однаково треба зареєструватися платником ПДВ щодо покупок і сплатити податок із комісії. Відрахувати його в такому разі не можна.',
        ] },
        { t: 'h3', x: 'Звіти платформ як первинні документи' },
        { t: 'p', x: 'За законом про бухгалтерський облік кожна проводка ґрунтується на документі, що підтверджує господарську операцію. Періодичний звіт про виплати платформи чи диспетчерського центру — головний документ продажів таксиста: у ньому видно суми, сплачені пасажирами, комісії та перераховану суму. Звіряйте виплату за звітом із банківським рахунком і зберігайте звіти й рахунки за комісію щонайменше шість років. Податкова отримує від посередників дані про виплачені вам суми, тому декларувати треба всі доходи від поїздок, хоч би через кого їх замовили.' },
        { t: 'h2', x: 'Таксометр, чек і журнал поїздок' },
        { t: 'p', x: 'Зараз власник ліцензії має забезпечити, щоб у таксі був таксометр або інший пристрій чи система, що надійно й в електронному вигляді збирає щодо кожної поїздки дані про підприємця, автомобіль і водія, час, довжину й тривалість поїздки, а також ціну та спосіб оплати. Але якщо зі споживачем не погоджено фіксовану ціну, уже зараз ціну треба визначати таксометром, що відповідає закону про вимірювальні прилади, і відповідальність за його використання несе водій (закон про транспортні послуги, 152 § 2 mom.). На поїздки з фіксованою ціною, наприклад із ціною, заздалегідь оголошеною платформою, ця вимога не поширюється. З 1.2.2027 у кожному таксі, зокрема під час роботи через платформи, обов’язковий таксометр, що відповідає закону про вимірювальні прилади (15 a §).' },
        { t: 'p', x: 'Клієнтові завжди треба пропонувати чек про оплату, електронний теж підходить. Крім того, професійний водій зобов’язаний вести журнал поїздок (ajopäiväkirja) за кожен місяць за змінами, а якщо зміни не встановлено, — за добами. У ньому доходи поділяють на готівкові, безготівкові та інші, а кілометри за рік — на професійні поїздки, професійні поїздки без доходу, особисті та інші поїздки. Звіт таксометра з пристроєм видачі чеків можна використовувати як журнал поїздок. Зберігайте журнал щонайменше шість років після закінчення податкового року.' },
        { t: 'h2', x: 'ПДВ за автомобіль: таксі — виняток' },
        { t: 'p', x: 'Зазвичай ПДВ за легковий автомобіль узагалі не можна відрахувати, якщо авто хоч трохи використовується особисто. Автомобіль, придбаний для професійних пасажирських перевезень, — виняток (AVL 114 §): із ПДВ на купівлю та утримання відраховується частка, що припадає на пасажирські перевезення, навіть якщо на авто їздять і в особистих справах. Частку особистих поїздок не відраховують.' },
        { t: 'ul', items: [
          'Відраховується, наприклад, ПДВ із ціни авто, пального, електрики для заряджання, обслуговування, ремонту та миття.',
          'Якщо авто використовується лише для пасажирських та інших оподатковуваних перевезень (наприклад, доставки їжі) і зовсім не використовується особисто, відраховується весь ПДВ.',
          'Якщо крім пасажирських перевезень на авто виконують інші перевезення та особисті поїздки, відрахування роблять лише з частки пасажирських перевезень.',
          'Частки використання підтверджують журналом поїздок. Без нього відрахування важко обґрунтувати.',
          'Оренда авто в лізинг — витрата. Оскільки AVL 114 § охоплює й послуги, пов’язані з використанням авто, до ПДВ із лізингових платежів розумно застосовувати ту саму частку використання, що й до інших витрат на авто.',
        ] },
        { t: 'h2', x: 'Автомобіль в оподаткуванні доходу' },
        { t: 'p', x: 'Таксі підприємця з toiminimi належить до майна підприємства, якщо понад половину кілометрів за рік становлять поїздки в межах бізнесу. Тоді витрати на авто проводять як витрати підприємства, з ціни купівлі нараховують амортизацію, а частку особистих поїздок враховують як особисте використання. Якщо авто не належить підприємству, за ділові поїздки за кілометрами надається додаткове відрахування (lisävähennys).' },
        { t: 'ul', items: [
          'Основне правило: не більше 25 % на рік від залишкової вартості (menojäännös) разом з іншими рухомими основними засобами (EVL 30 §).',
          'Варіант для авто професійних перевезень: із ціни купівлі не більше 25 % у рік введення в експлуатацію, не більше 20 % у кожен із двох наступних років і далі не більше 15 % на рік (EVL 33 § 3 mom.).',
          'Метод обирають під час введення авто в експлуатацію, і пізніше його не можна змінити, якщо вибір не ґрунтувався на помилковому застосуванні закону.',
        ] },
        { t: 'p', x: 'В osakeyhtiö (ТОВ) автомобіль належить компанії. Якщо власник використовує авто компанії для особистих поїздок, у нього виникає оподатковувана автомобільна пільга (autoetu), яку враховують як зарплату. Докладніше про вимоги до журналу поїздок і про autoetu — у нашому посібнику «Журнал поїздок (ajopäiväkirja)».' },
        { t: 'h2', x: 'Податок на доходи, ennakkovero і YEL — коротко' },
        { t: 'p', x: 'Дохід toiminimi від таксі декларують у податковій декларації підприємницької діяльності, а податки протягом року сплачують авансом (ennakkovero). Страхування YEL обов’язкове, коли трудовий дохід підприємця перевищує щороку затверджуваний поріг. Ці теми ми розбираємо в посібниках «Податки toiminimi», «Авансовий податок (ennakkovero)» і «YEL».' },
        { t: 'h2', x: 'Бухгалтерія за місяць: що передавати' },
        { t: 'ul', items: [
          'Звіти про виплати та рахунки за комісію від платформ і диспетчерських центрів за всі розрахункові періоди місяця.',
          'Звіти таксометра чи іншого пристрою та дані про поїздки за готівку.',
          'Розрахунки та власні рахунки за поїздки Kela, шкільні та інші договірні поїздки.',
          'Повна виписка з банківського рахунку; краще окремий рахунок лише для бізнесу.',
          'Документи за пальне, заряджання, обслуговування, миття, страховку та лізинг, а також плата за телефон і диспетчерські послуги.',
          'Журнал поїздок, у якому видно кілометри особистих поїздок.',
        ] },
        { t: 'h2', x: 'Приклад у євро' },
        { t: 'p', x: 'Підприємець із toiminimi, зареєстрований платником ПДВ, працює один місяць. Платформа зареєстрована в іншій країні ЄС, і в її рахунку за комісію немає фінського ПДВ. За журналом поїздок 10 % кілометрів — особисті поїздки.' },
        { t: 'ul', items: [
          'Пасажири сплатили через платформу 5 675,00 € (з ПДВ 13,5 %): продажі 5 000,00 € і ПДВ 675,00 €.',
          'Платформа утримала комісію 1 000,00 € і перерахувала на банківський рахунок 4 675,00 €. Із комісії нараховується податок за зворотним механізмом 255,00 € (25,5 %), який зазначають до сплати й відраховують у тій самій декларації.',
          'Поїздки Kela через диспетчерський центр 1 135,00 € (з ПДВ 13,5 %): продажі 1 000,00 € і ПДВ 135,00 €.',
          'Пальне 627,50 € (з ПДВ 25,5 %): без податку 500,00 € і ПДВ 127,50 €. Частка пасажирських перевезень 90 %, тож до відрахування 114,75 €.',
          'ПДВ до сплати за місяць: 675,00 + 135,00 + 255,00 − 255,00 − 114,75 = 695,25 €.',
        ] },
        { t: 'p', x: 'Якби підприємець задекларував податок лише з перерахованих платформою 4 675,00 євро, ПДВ із продажів виявився б заниженим. Частка пального на особисті поїздки (10 %) не відраховується й в оподаткуванні доходу.' },
        { t: 'h2', x: 'Типові помилки' },
        { t: 'ul', items: [
          'Продажі проводять у розмірі нетто-суми, перерахованої платформою, і ПДВ рахують із неї.',
          'Із комісії іноземної платформи не декларують ПДВ за зворотним механізмом, або водій поза реєстром ПДВ не реєструється щодо покупок.',
          'Для поїздок 2026 року досі застосовують ставку 14 %.',
          'До доставки їжі застосовують ставку пасажирських перевезень 13,5 % замість 25,5 %.',
          'ПДВ за авто відраховують повністю, хоча на ньому їздять в особистих справах, або журнал поїздок не ведуть.',
          'Поріг 20 000 євро відстежують за нетто-виплатами, і реєстрація запізнюється.',
          'Поїздки Kela та диспетчерського центру не звіряють із розрахунками, і частина продажів лишається непроведеною.',
        ] },
        { t: 'note', x: 'Дані перевірено в листопаді 2026 року: ПДВ на пасажирські перевезення 13,5 % (14 % у 2025 році), загальна ставка 25,5 %, поріг реєстрації платником ПДВ 20 000 євро за календарний рік, пільгу для малого обороту скасовано з 1.1.2025, сертифікований таксометр уже зараз обов’язковий у поїздках для споживачів без фіксованої ціни, а з 1.2.2027 — у кожному таксі. Договори й порядок виставлення рахунків у платформ різняться, тож перевірте свій рахунок за комісію. Джерела: закон про ПДВ (1501/1993), закон про оподаткування доходу від підприємницької діяльності (360/1968), закон про транспортні послуги (320/2017), закон про бухгалтерський облік (1336/1997), Verohallinto та Kela.' },
        { t: 'h2', x: 'Ми допомагаємо таксистам' },
        { t: 'p', x: 'Tilitoimisto Debit Credit веде бухгалтерію таксистів і подає декларації з ПДВ: проводимо виплати платформ у валовій сумі, оформлюємо зворотне нарахування ПДВ із комісій, звіряємо поїздки Kela та диспетчерських центрів і розраховуємо відрахування за авто на підставі журналу поїздок. Наші клієнти можуть надсилати чеки та звіти про виплати через застосунок Vaavo. Ми працюємо фінською та російською мовами. Зв’яжіться з нами ще до першої зміни, щоб реєстрації та документи були в порядку від самого початку.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Verohallinto: таксист — як почати діяльність (фінською)', href: SRC.taxiFi },
          { label: 'Verohallinto: taxi entrepreneur (англійською)', href: SRC.taxiEn },
          { label: 'Verohallinto: VAT on vehicles (англійською)', href: SRC.vehicleEn },
          { label: 'Verohallinto: реєстрація в реєстрі платників ПДВ (англійською)', href: SRC.vatRegEn },
          { label: 'Verohallinto: пільга для малого обороту (англійською)', href: SRC.reliefEn },
          { label: 'Verohallinto: амортизація в оподаткуванні бізнесу (фінською)', href: SRC.depreciation },
          { label: 'Kela: транспортні послуги та поїздки на таксі з відшкодуванням (фінською)', href: SRC.kela },
          { label: 'Finlex: закон про ПДВ (1501/1993)', href: SRC.avl },
          { label: 'Finlex: закон про оподаткування доходу від підприємницької діяльності (360/1968)', href: SRC.evl },
          { label: 'Finlex: закон про транспортні послуги (320/2017)', href: SRC.lp },
          { label: 'Finlex: закон про бухгалтерський облік (1336/1997)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Яка ставка ПДВ на поїздку в таксі у 2026 році?', a: 'З 1.1.2026 ПДВ на пасажирські перевезення становить 13,5 %. У 2025 році ставка була 14 %, а до того 10 %. Доставка їжі та просто перевезення вантажів оподатковуються загальною ставкою 25,5 %.' },
        { q: 'Чи треба платити ПДВ, якщо мій оборот менший за 20 000 євро?', a: 'Із продажів ви не зобов’язані платити ПДВ, якщо не зареєструвалися добровільно. Але якщо іноземна платформа виставляє рахунок за комісію без фінського ПДВ, ви маєте зареєструватися платником ПДВ щодо покупок і сплатити податок 25,5 % із комісії, а відрахувати його в такому разі не можна.' },
        { q: 'ПДВ декларується з ціни, яку сплатив пасажир, чи з виплати платформи?', a: 'З усієї ціни, яку сплатив пасажир. Утримана платформою комісія не віднімається від продажів: це окрема витрата, ПДВ з якої враховують за рахунком за комісію.' },
        { q: 'Чи можна відрахувати ПДВ за таксі, якщо я їжджу на авто й в особистих справах?', a: 'Можна в тій частці, у якій авто використовується для професійних пасажирських перевезень. Таксі — виняток із правила для звичайного легкового авто, де навіть незначне особисте використання позбавляє права на все відрахування. Частку особистих поїздок підтверджують журналом поїздок і не відраховують.' },
        { q: 'Чи потрібен таксометр під час роботи через Uber і Bolt?', a: 'Якщо зі споживачем не погоджено фіксовану ціну, уже зараз ціну треба визначати сертифікованим таксометром, і відповідає за його використання водій. Для поїздок із фіксованою ціною, наприклад заздалегідь оголошеною платформою, поки що підходить таксометр або інший пристрій чи система, що надійно записує дані кожної поїздки. З 1.2.2027 у кожному авто таксі має використовуватися таксометр, що відповідає закону про вимірювальні прилади.' },
      ],
    },
  },
};
