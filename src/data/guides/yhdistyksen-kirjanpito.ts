import type { Guide } from './types';

// Facts verified 23 Sep 2026, verbatim, against Finlex open data (consolidated Finnish texts) and
// vero.fi (page update date in brackets). Independent review the same day; its findings were
// re-checked against the same sources before they were applied.
// - Kirjanpitolaki 1336/1997 (version fin@20240238): 1:1 "kirjanpitovelvollisia ovat: 1) avoin
//   yhtiö, kommandiittiyhtiö, osakeyhtiö, osuuskunta, yhdistys, säätiö ..."; 3:1 tilinpäätös =
//   tase, tuloslaskelma, liitetiedot; 3:6 "neljän kuukauden kuluessa tilikauden päättymisestä";
//   3:9 registration with PRH "sovelletaan myös muuhun kirjanpitovelvolliseen, joka on
//   pienyritystä suurempi".
// - Yhdistyslaki 503/1989 (version fin@20250573): 37 a § 1 mom. "Yhdistyksen tilinpäätös ja
//   toimintakertomus on laadittava kirjanpitolain (1336/1997) mukaisesti"; 2 mom. "Edellä 1
//   momentista poiketen" the rules may apply 3–7 mom. "jos yhdistyksen saamien avustusten ja
//   muiden tulojen yhteenlaskettu määrä tilikaudella on enintään 30 000 euroa sekä päättyneellä
//   että sitä välittömästi edeltäneellä tilikaudella eikä yhdistys harjoita liiketoimintaa";
//   under two years since registration counts as under the limit unless "ilmeistä, että
//   raja-arvo ylittyy"; the meeting may decide it without amending the rules with the majority
//   and notice required for a rule amendment; 4 mom. "kassaperusteisesti aikajärjestyksessä ja
//   ilman aiheetonta viivytystä", "ajantasaista luetteloa yhdistyksen varoista ja veloista",
//   information for "mahdollisen verovelvollisuuden täyttämiseksi"; 5 mom. retention "kuusi
//   vuotta sen kalenterivuoden jälkeen"; 6 mom. members may inspect "kerran jokaiselta
//   päättyneeltä kalenterikuukaudelta", if the rules restrict this a "vuosilaskelma ... kuuden
//   kuukauden kuluessa tilikauden päättymisestä". 35 § the board ensures "kirjanpito on
//   lainmukainen ja varainhoito on luotettavalla tavalla järjestetty"; 23 § 5) the meeting
//   decides on "tilinpäätöksen tai vuosilaskelman vahvistamisesta ja vastuuvapauden
//   myöntämisestä"; 38 a § toiminnantarkastaja "jos yhdistyksellä ei ole tilintarkastajaa",
//   varatoiminnantarkastaja if only one, "luonnollinen henkilö", "riippumaton", "tarkastettava
//   yhdistyksen talous ja hallinto yhdistyksen toiminnan edellyttämässä laajuudessa", written
//   toiminnantarkastuskertomus to the meeting deciding on the tilinpäätös.
// - Tilintarkastuslaki 1141/2015, 2:2: no auditor needed when "sekä päättyneellä että sitä
//   välittömästi edeltäneellä tilikaudella on täyttynyt enintään yksi" of: taseen loppusumma
//   yli 100 000 euroa; liikevaihto tai sitä vastaava tuotto yli 200 000 euroa; keskimäärin yli
//   kolme henkilöä; 4 mom. the rules may still provide for an audit.
// - Income tax (yleishyodyllisen-yhteison-tuloverotus, 1.1.2026): taxable only "elinkeinotoiminnan
//   tuottamasta tulosta" and real-estate income when used "muuhun kuin yleiseen tai
//   yleishyödylliseen tarkoitukseen"; tax-free e.g. "jäsenmaksut", "lahjoitukset",
//   "yleishyödylliseen toimintaan saadut avustukset"; own events tax-free "jos tuloa hankitaan
//   yleishyödyllisen toiminnan rahoittamiseksi ja toiminta ei täytä elinkeinotoiminnan
//   tunnusmerkkejä"; repeated catering at others' events "on yleensä elinkeinotoimintaa";
//   "eritellä näiden toimintojen tuotot ja kulut sekä kirjanpidossa että veroilmoituksella";
//   "elinkeinotulo 20 %". Not non-profit: "verovelvollinen kaikista tuloistaan" (6C
//   täyttöohje, 9.3.2026, which also says the return must "aina" carry a "toimintakertomus tai
//   muu vapaamuotoinen selvitys yhdistyksen toiminnasta").
// - Tax return (yhdistys-ja-saatio/veroilmoitus, 1.1.2026): "viimeistään 4 kuukauden kuluttua
//   siitä, kun tilikausi on päättynyt"; filed if the association "on saanut verovuonna
//   veronalaista tuloa", "on tilikauden aikana myynyt tai ostanut kiinteistön", "on saanut
//   myönteisen päätöksen veronhuojennuksesta", "on yleishyödyllinen ja toiminta tai varainhankinta
//   on muuttunut olennaisesti"; "aina, jos Verohallinto pyytää sitä"; filed in OmaVero.
// - VAT (syventävä ohje 82116, updated for 1.1.2025): "verovelvollinen vain elinkeinotoiminnan
//   muodossa harjoitetusta toiminnastaan"; exempt when business turnover is "kuluvana
//   kalenterivuonna enintään 20 000 euroa ja sitä edeltävänä kalenterivuonna enintään 20 000
//   euroa"; only "tuloverotuksessa elinkeinotoiminnaksi katsotut erät" count; over the limit
//   "ylittämisajankohdasta lukien"; purchases from abroad: the association "voi olla ostajana
//   velvollinen maksamaan arvonlisäveron Suomeen".
// - Incomes Register (tulorekisteri: yhdistykset, 12.7.2024; ilmoittamisen määräajat, 17.9.2026):
//   "palkka, palkkio tai korvaus tulorekisteriin palkkatietoilmoituksella", "yhdistyksen
//   Y-tunnuksella", "5 päivän kuluessa maksupäivästä"; wages → also "työnantajan
//   erillisilmoitus"; "Ilmoita työkorvaus tulorekisteriin vain, jos saaja ei ole
//   ennakkoperintärekisterissä"; association's one-off payments "enintään 200 euron ...
//   kuukausittain, viimeistään seuraavan kalenterikuukauden 5. päivänä"; tax-free kilometre and
//   daily allowances "viimeistään maksukuukautta seuraavan kuukauden 5. päivänä".
// - Volunteers (syventävä ohje 48059, VH/489/00.01.00/2026, voimassa 4.3.2026 alkaen): tax-free
//   "päiväraha enintään 20 päivältä kalenterivuodessa", "majoittumiskorvaus", public transport
//   "ilman euromääräistä rajaa", "kilometrikorvaukset enintään 3 000 euroa kalenterivuodessa";
//   "Matkoista on aina tehtävä matkalasku"; "edellytykset ovat samat kuin palkansaajillakin";
//   the recipient must not be paid for the work (a board member is a volunteer "jos hän ei saa
//   tehtävästään palkkiota tai muuta korvausta"); allowances ARE reported to the Incomes Register,
//   carrier-receipt reimbursements are not; purchases on the association's behalf reimbursed
//   against receipts are not taxable and not reported.
const VERO = 'https://www.vero.fi';

const SRC = {
  yhdistyslaki: 'https://www.finlex.fi/fi/lainsaadanto/1989/503',
  kirjanpitolaki: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
  tilintarkastuslaki: 'https://www.finlex.fi/fi/lainsaadanto/2015/1141',
  incomeTaxFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yhdistys-ja-saatio/yleishyodyllisen-yhteison-tuloverotus/`,
  incomeTaxEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/associations-and-foundations/income-taxation-of-non-profit-organisations/`,
  taxReturnFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yhdistys-ja-saatio/veroilmoitus/`,
  vatFi: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/82116/yleishyodyllisten-yhteisojen-arvonlisaverotus3/`,
  volunteersFi: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48059/yleishyodyllisten-yhteisojen-ja-julkisyhteisojen-vapaaehtoistoiminnan-ennakkoperintakysymykset5/`,
  incomesRegisterFi: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/suorituksen-maksajat/yhdistykset/`,
  incomesRegisterEn: `${VERO}/en/incomes-register/companies-and-organisations/employers/associations/`,
  deadlinesFi: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/ilmoittamisen-maaraajat/`,
  deadlinesEn: `${VERO}/en/incomes-register/companies-and-organisations/deadlines-for-reporting/`,
};

export const yhdistyksenKirjanpito: Guide = {
  slug: 'yhdistyksen-kirjanpito',
  datePublished: '2026-09-23',
  dateModified: '2026-09-23',
  content: {
    fi: {
      title: 'Yhdistyksen kirjanpito ja tilinpäätös: mitä laki vaatii (2026)',
      description:
        'Yhdistyksen kirjanpito selkeästi: kevennetty tilinpito, tilinpäätös, toiminnantarkastaja vai tilintarkastaja, veroilmoitus 6C, ALV ja tulorekisteri.',
      lead: 'Rekisteröity yhdistys on lähtökohtaisesti kirjanpitovelvollinen kuten yritys, mutta sillä on omat sääntönsä: pienen yhdistyksen kevennetty tilinpito, toiminnantarkastus, yhdistyksen kokous ja yleishyödyllisen yhteisön verotus. Kokosimme, mitä laki vaatii ja mitä hallituksen kannattaa muistaa.',
      body: [
        { t: 'h2', x: 'Kuka vastaa yhdistyksen kirjanpidosta?' },
        { t: 'p', x: 'Kirjanpitolain mukaan yhdistys on kirjanpitovelvollinen, ja yhdistyslain mukaan sen tilinpäätös laaditaan kirjanpitolain mukaisesti. Hallituksen on huolehdittava siitä, että kirjanpito on lainmukainen ja varainhoito luotettavasti järjestetty. Laki ei edellytä tilitoimistoa: kirjanpidon voi hoitaa myös yhdistyksen oma rahastonhoitaja. Vastuu on kuitenkin aina hallituksella.' },
        { t: 'h2', x: 'Pieni yhdistys: kevennetty tilinpito' },
        { t: 'p', x: 'Jos yhdistyksen avustukset ja muut tulot ovat olleet yhteensä enintään 30 000 € sekä päättyneellä että sitä edeltäneellä tilikaudella eikä yhdistys harjoita liiketoimintaa, se voi pitää kevennettyä tilinpitoa, eikä sen tarvitse laatia kirjanpitolain mukaista tilinpäätöstä. Kevennetystä tilinpidosta määrätään säännöissä, tai yhdistyksen kokous voi päättää siitä sääntöjä muuttamatta samalla enemmistöllä ja kokouskutsulla, joita sääntöjen muuttaminen vaatii. Alle kaksi vuotta sitten rekisteröidyn yhdistyksen katsotaan alittavan rajan, ellei ole ilmeistä, että raja ylittyy.' },
        { t: 'ul', items: [
          'Tulot, menot, varat ja velat pidetään erillään, ja tapahtumat merkitään kassaperusteisesti aikajärjestyksessä ilman aiheetonta viivytystä.',
          'Varoista ja veloista pidetään jatkuvasti ajantasaista luetteloa, ja tilinpidosta on saatava tiedot mahdollisen verovelvollisuuden hoitamiseen.',
          'Laskut, kuitit ja muu aineisto säilytetään kuusi vuotta sen kalenterivuoden jälkeen, jota ne koskevat.',
          'Jäsenellä on pyynnöstä oikeus nähdä tilinpito kerran kustakin päättyneestä kalenterikuukaudesta. Jos säännöt rajoittavat tätä oikeutta, toiminnasta laaditaan vuosilaskelma, joka esitetään jäsenille kuuden kuukauden kuluessa tilikauden päättymisestä.',
        ] },
        { t: 'h2', x: 'Tilinpäätös neljän kuukauden kuluessa' },
        { t: 'p', x: 'Muut yhdistykset laativat tilikaudelta kirjanpitolain mukaisen tilinpäätöksen, johon kuuluvat tase, tuloslaskelma ja liitetiedot. Tilinpäätös on laadittava neljän kuukauden kuluessa tilikauden päättymisestä.' },
        { t: 'p', x: 'Tilinpäätöksen tai vuosilaskelman vahvistamisesta ja vastuuvapauden myöntämisestä päättää yhdistyksen kokous. Tilinpäätöstä ei tarvitse ilmoittaa rekisteröitäväksi Patentti- ja rekisterihallitukselle, ellei yhdistys ole pienyritystä suurempi.' },
        { t: 'h2', x: 'Toiminnantarkastaja vai tilintarkastaja?' },
        { t: 'p', x: 'Tilintarkastajan saa jättää valitsematta, jos sekä päättyneellä että sitä edeltäneellä tilikaudella on täyttynyt enintään yksi seuraavista: taseen loppusumma yli 100 000 €, liikevaihto tai sitä vastaava tuotto yli 200 000 €, palveluksessa keskimäärin yli kolme henkilöä. Säännöissä voidaan silti määrätä tilintarkastuksesta. Jos yhdistyksellä ei ole tilintarkastajaa, sillä on oltava toiminnantarkastaja.' },
        { t: 'ul', items: [
          'Toiminnantarkastajan on oltava luonnollinen henkilö, jolla on yhdistyksen toimintaan nähden riittävä taloudellisten ja oikeudellisten asioiden tuntemus.',
          'Toiminnantarkastajan on oltava tarkastusta tehdessään riippumaton.',
          'Jos valitaan vain yksi toiminnantarkastaja, on valittava myös varatoiminnantarkastaja.',
          'Toiminnantarkastaja tarkastaa yhdistyksen talouden ja hallinnon toiminnan edellyttämässä laajuudessa ja antaa kirjallisen toiminnantarkastuskertomuksen kokoukselle, joka päättää tilinpäätöksestä.',
        ] },
        { t: 'h2', x: 'Yleishyödyllisen yhdistyksen tulovero' },
        { t: 'p', x: 'Yleishyödyllinen yhdistys maksaa tuloveroa vain elinkeinotoiminnan tulosta sekä kiinteistön tulosta, jos kiinteistöä on käytetty muuhun kuin yleiseen tai yleishyödylliseen tarkoitukseen. Yhdistys, joka ei ole yleishyödyllinen, on verovelvollinen kaikista tuloistaan. Elinkeinotulon veroprosentti on 20 %.' },
        { t: 'p', x: 'Verovapaita ovat muun muassa jäsenmaksut, lahjoitukset ja yleishyödylliseen toimintaan saadut avustukset. Myös yhdistyksen omien tilaisuuksien, kuten arpajaisten, myyjäisten ja urheilukilpailujen, tulot ovat lähtökohtaisesti verovapaita, jos tulo hankitaan yleishyödyllisen toiminnan rahoittamiseksi eikä toiminta täytä elinkeinotoiminnan tunnusmerkkejä. Jos yhdistys esimerkiksi järjestää toistuvasti tarjoilua muiden tapahtumiin, toiminta on yleensä elinkeinotoimintaa.' },
        { t: 'note', x: 'Kirjanpidon kannalta tärkeintä: yleishyödyllisen toiminnan, varainhankinnan, elinkeinotoiminnan ja kiinteistön tuotot ja kulut on eriteltävä sekä kirjanpidossa että veroilmoituksella. Kun erittely tehdään tositteittain koko vuoden ajan, tilinpäätös ja veroilmoitus valmistuvat ilman jälkikäteistä selvittelyä.' },
        { t: 'h2', x: 'Milloin yhdistyksen on annettava veroilmoitus?' },
        { t: 'p', x: 'Veroilmoitus (6C) annetaan OmaVerossa viimeistään 4 kuukauden kuluttua tilikauden päättymisestä, jos yhdistys:' },
        { t: 'ul', items: [
          'on saanut verovuonna veronalaista tuloa',
          'on tilikauden aikana myynyt tai ostanut kiinteistön',
          'on saanut myönteisen päätöksen veronhuojennuksesta',
          'on yleishyödyllinen ja sen toiminta tai varainhankinta on muuttunut olennaisesti edelliseen verovuoteen verrattuna.',
        ] },
        { t: 'p', x: 'Ilmoitus on annettava aina myös silloin, kun Verohallinto sitä pyytää. Veroilmoitukseen on aina liitettävä toimintakertomus tai muu vapaamuotoinen selvitys yhdistyksen toiminnasta.' },
        { t: 'h2', x: 'ALV yhdistyksessä' },
        { t: 'p', x: 'Yleishyödyllinen yhdistys on arvonlisäverovelvollinen vain elinkeinotoimintana harjoitetusta myynnistä. Vähäinen toiminta jää arvonlisäverotuksen ulkopuolelle: jos elinkeinotoiminnan liikevaihto on enintään 20 000 € sekä kuluvana että edeltävänä kalenterivuonna, yhdistyksen ei tarvitse rekisteröityä arvonlisäverovelvolliseksi myyntiensä vuoksi. Rajaan lasketaan vain tuloverotuksessa elinkeinotoiminnaksi katsotut myynnit. Jos raja ylittyy kesken vuoden, veroa suoritetaan ylittämisajankohdasta lukien. Ulkomailta ostetuista tavaroista ja palveluista yhdistys voi kuitenkin joutua ostajana maksamaan arvonlisäveron Suomeen.' },
        { t: 'h2', x: 'Kun yhdistys maksaa palkkaa, palkkioita tai korvauksia' },
        { t: 'p', x: 'Yhdistyksen maksamat palkat, palkkiot ja korvaukset, esimerkiksi kokouspalkkiot ja hallituksen jäsenten palkkiot, ilmoitetaan tulorekisteriin palkkatietoilmoituksella yhdistyksen Y-tunnuksella yleensä 5 päivän kuluessa maksupäivästä. Enintään 200 euron kertasuoritukset ilmoitetaan kuukausittain viimeistään seuraavan kalenterikuukauden 5. päivänä. Jos yhdistys on maksanut palkkaa, se antaa kuukaudelta myös työnantajan erillisilmoituksen. Työkorvaus ilmoitetaan vain, jos saaja ei ole ennakkoperintärekisterissä. Veronalaisista suorituksista yhdistys huolehtii maksajan velvollisuuksista, kuten ennakonpidätyksestä.' },
        { t: 'p', x: 'Vapaaehtoiselle, joka toimii yleishyödyllisen yhdistyksen toimeksiannosta eikä saa työstä palkkaa tai palkkiota, voidaan maksaa verovapaasti:' },
        { t: 'ul', items: [
          'päiväraha enintään 20 päivältä kalenterivuodessa',
          'majoittumiskorvaus',
          'julkisen kulkuneuvon mukaiset matkakulut tositteita vastaan ilman euromääräistä rajaa',
          'kilometrikorvaukset enintään 3 000 € kalenterivuodessa.',
        ] },
        { t: 'p', x: 'Matkoista on aina tehtävä matkalasku, ja muuten verovapauden edellytykset ovat samat kuin palkansaajalla. Päivärahat ja kilometrikorvaukset ilmoitetaan tulorekisteriin viimeistään maksukuukautta seuraavan kuukauden 5. päivänä, vaikka ne ovat verovapaita; liikenteenharjoittajan tositteeseen, kuten junalippuun, perustuvia korvauksia ei ilmoiteta. Kun jäsen ostaa jotain yhdistyksen puolesta ja yhdistys korvaa menon kuittia vastaan, korvaus ei ole veronalaista eikä sitä ilmoiteta tulorekisteriin.' },
        { t: 'h2', x: 'Apua yhdistyksen kirjanpitoon' },
        { t: 'p', x: 'Hoidamme yhdistysten kirjanpidon tai kevennetyn tilinpidon niin, että eri toiminnot on eritelty koko vuoden ajan. Laadimme tilinpäätöksen tai vuosilaskelman yhdistyksen kokousta varten sekä tarvittaessa veroilmoituksen ja tulorekisteri-ilmoitukset. Palvelemme suomeksi ja venäjäksi.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Finlex: yhdistyslaki (503/1989)', href: SRC.yhdistyslaki },
          { label: 'Finlex: kirjanpitolaki (1336/1997)', href: SRC.kirjanpitolaki },
          { label: 'Finlex: tilintarkastuslaki (1141/2015)', href: SRC.tilintarkastuslaki },
          { label: 'Verohallinto: yleishyödyllisen yhteisön tuloverotus', href: SRC.incomeTaxFi },
          { label: 'Verohallinto: veroilmoitus – yhdistys ja säätiö', href: SRC.taxReturnFi },
          { label: 'Verohallinto: yleishyödyllisten yhteisöjen arvonlisäverotus', href: SRC.vatFi },
          { label: 'Verohallinto: vapaaehtoistoiminnan ennakkoperintäkysymykset', href: SRC.volunteersFi },
          { label: 'Tulorekisteri: yhdistykset', href: SRC.incomesRegisterFi },
          { label: 'Tulorekisteri: ilmoittamisen määräajat', href: SRC.deadlinesFi },
        ] },
      ],
      faq: [
        { q: 'Tarvitseeko pieni yhdistys tilintarkastajan?', a: 'Ei yleensä. Tilintarkastajan saa jättää valitsematta, jos kummallakin kahdesta viimeisestä tilikaudesta on täyttynyt enintään yksi rajoista: tase yli 100 000 €, liikevaihto tai tuotot yli 200 000 €, keskimäärin yli kolme työntekijää. Silloin yhdistys valitsee toiminnantarkastajan, ellei säännöissä määrätä tilintarkastuksesta.' },
        { q: 'Voiko pieni yhdistys pitää kevyempää kirjanpitoa?', a: 'Voi, jos avustukset ja muut tulot ovat olleet enintään 30 000 € sekä päättyneellä että edeltäneellä tilikaudella, yhdistys ei harjoita liiketoimintaa ja kevennetystä tilinpidosta on määrätty säännöissä tai päätetty yhdistyksen kokouksessa. Silloin tapahtumat kirjataan kassaperusteisesti, eikä kirjanpitolain mukaista tilinpäätöstä tarvitse laatia.' },
        { q: 'Pitääkö yhdistyksen antaa veroilmoitus joka vuosi?', a: 'Ei aina. Ilmoitus annetaan, jos yhdistyksellä on veronalaista tuloa, se on myynyt tai ostanut kiinteistön, se on saanut myönteisen veronhuojennuspäätöksen tai yleishyödyllisen yhdistyksen toiminta tai varainhankinta on muuttunut olennaisesti. Lisäksi ilmoitus annetaan aina, jos Verohallinto pyytää.' },
        { q: 'Ovatko jäsenmaksut yhdistyksen veronalaista tuloa?', a: 'Eivät yleishyödyllisellä yhdistyksellä. Jäsenmaksut, lahjoitukset ja yleishyödylliseen toimintaan saadut avustukset ovat sille verovapaata tuloa.' },
        { q: 'Voiko yhdistyksen kirjanpidon hoitaa itse?', a: 'Voi. Laki ei vaadi tilitoimistoa, mutta hallitus vastaa siitä, että kirjanpito on lainmukainen. Toiminnantarkastaja tarkastaa yhdistyksen talouden ja hallinnon, tai tilintarkastaja tekee tilintarkastuksen.' },
      ],
    },
    ru: {
      title: 'Бухгалтерия ассоциации (ry) в Финляндии: что обязательно по закону (2026)',
      description:
        'Бухгалтерия ассоциации (ry): упрощённый учёт, годовой отчёт, ревизор или аудитор, декларация 6C, ALV и Tulorekisteri — со ссылками на закон.',
      lead: 'Зарегистрированная ассоциация (ry), как правило, обязана вести бухгалтерию так же, как компания, но у неё свои правила: упрощённый учёт для маленьких ассоциаций, ревизия деятельности, общее собрание и налоги общественно полезной организации. Собрали, что требует закон и о чём стоит помнить правлению.',
      body: [
        { t: 'h2', x: 'Кто отвечает за бухгалтерию ассоциации?' },
        { t: 'p', x: 'По закону о бухучёте (kirjanpitolaki) ассоциация обязана вести бухгалтерию, а по закону об ассоциациях (yhdistyslaki) её годовой отчёт составляется по закону о бухучёте. Правление должно следить, чтобы бухгалтерия велась по закону, а деньгами управляли надёжно. Закон не требует привлекать бухгалтерскую фирму: бухгалтерию может вести и казначей ассоциации (rahastonhoitaja). Но отвечает за неё всегда правление.' },
        { t: 'h2', x: 'Маленькая ассоциация: упрощённый учёт' },
        { t: 'p', x: 'Если гранты и другие доходы ассоциации в сумме не превышали 30 000 € ни в закончившемся, ни в предыдущем финансовом году (tilikausi) и ассоциация не ведёт коммерческой деятельности, она может вести упрощённый учёт (kevennetty tilinpito) и не составлять годовой отчёт по закону о бухучёте. Упрощённый учёт предусматривают в уставе, или общее собрание может решить это без изменения устава — тем же большинством и с тем же порядком созыва, что нужны для изменения устава. Ассоциация, зарегистрированная меньше двух лет назад, считается не превышающей порог, если не очевидно, что он будет превышен.' },
        { t: 'ul', items: [
          'Доходы, расходы, имущество и долги учитывают раздельно, а операции записывают кассовым методом, в хронологическом порядке и без неоправданных задержек.',
          'Постоянно ведут актуальный список имущества и долгов; учёт должен давать сведения, нужные для уплаты налогов, если они возникнут.',
          'Счета, чеки и другие документы хранят шесть лет после окончания календарного года, к которому они относятся.',
          'Член ассоциации по запросу вправе ознакомиться с учётом раз за каждый закончившийся календарный месяц. Если устав ограничивает это право, составляют годовой расчёт (vuosilaskelma) и представляют его членам в течение шести месяцев после окончания финансового года.',
        ] },
        { t: 'h2', x: 'Годовой отчёт — в течение четырёх месяцев' },
        { t: 'p', x: 'Остальные ассоциации составляют за финансовый год годовой отчёт по закону о бухучёте (tilinpäätös): баланс (tase), отчёт о прибылях и убытках (tuloslaskelma) и приложения (liitetiedot). Срок — четыре месяца после окончания финансового года.' },
        { t: 'p', x: 'Годовой отчёт или годовой расчёт утверждает общее собрание ассоциации — оно же решает, освободить ли правление от ответственности (vastuuvapaus). Регистрировать годовой отчёт в Патентно-регистрационном ведомстве (PRH) не нужно, если ассоциация не больше малого предприятия (pienyritys).' },
        { t: 'h2', x: 'Ревизор (toiminnantarkastaja) или аудитор?' },
        { t: 'p', x: 'Аудитора (tilintarkastaja) можно не выбирать, если и в закончившемся, и в предыдущем финансовом году выполнялось не больше одного из условий: валюта баланса больше 100 000 €, оборот или соответствующие доходы больше 200 000 €, в среднем больше трёх работников. Устав всё равно может требовать аудита. Если аудитора нет, у ассоциации должен быть ревизор деятельности — toiminnantarkastaja.' },
        { t: 'ul', items: [
          'Ревизор — физическое лицо, достаточно разбирающееся в финансовых и правовых вопросах с учётом деятельности ассоциации.',
          'При проверке ревизор должен быть независим.',
          'Если выбран только один ревизор, выбирают и его заместителя (varatoiminnantarkastaja).',
          'Ревизор проверяет финансы и управление ассоциации в том объёме, которого требует её деятельность, и даёт письменный отчёт о проверке (toiminnantarkastuskertomus) собранию, которое утверждает годовой отчёт.',
        ] },
        { t: 'h2', x: 'Налог на прибыль общественно полезной ассоциации' },
        { t: 'p', x: 'Общественно полезная ассоциация (yleishyödyllinen yhdistys) платит налог на прибыль только с дохода от предпринимательской деятельности (elinkeinotoiminta) и с дохода от недвижимости, если та использовалась не для общих или общественно полезных целей. Ассоциация, которая не считается общественно полезной, платит налог со всех доходов. Ставка налога на предпринимательский доход — 20 %.' },
        { t: 'p', x: 'Не облагаются, в частности, членские взносы, пожертвования и гранты на общественно полезную деятельность. Доходы от собственных мероприятий ассоциации — лотерей, ярмарок, спортивных соревнований — в принципе тоже не облагаются, если их получают для финансирования общественно полезной деятельности и деятельность не имеет признаков предпринимательской. Но если ассоциация, например, регулярно организует питание на чужих мероприятиях, это обычно уже предпринимательская деятельность.' },
        { t: 'note', x: 'Главное для бухгалтерии: доходы и расходы общественно полезной деятельности, сбора средств (varainhankinta), предпринимательской деятельности и недвижимости нужно разделять — и в бухгалтерии, и в налоговой декларации. Если разносить их по документам весь год, годовой отчёт и декларация готовятся без разбирательств задним числом.' },
        { t: 'h2', x: 'Когда ассоциация подаёт налоговую декларацию?' },
        { t: 'p', x: 'Декларацию (форма 6C) подают в OmaVero не позднее 4 месяцев после окончания финансового года, если ассоциация:' },
        { t: 'ul', items: [
          'получила в налоговом году облагаемый доход',
          'в течение финансового года продала или купила недвижимость',
          'получила положительное решение о налоговой льготе (veronhuojennus)',
          'общественно полезна, и её деятельность или сбор средств существенно изменились по сравнению с прошлым налоговым годом.',
        ] },
        { t: 'p', x: 'Кроме того, декларацию подают всегда, если её запросила налоговая (Vero). К декларации всегда прилагают отчёт о деятельности (toimintakertomus) или другое описание деятельности ассоциации в свободной форме.' },
        { t: 'h2', x: 'ALV в ассоциации' },
        { t: 'p', x: 'Общественно полезная ассоциация платит ALV (НДС) только с продаж в рамках предпринимательской деятельности. Деятельность небольшого объёма ALV не облагается: если оборот предпринимательской деятельности не превышает 20 000 € ни в текущем, ни в предыдущем календарном году, регистрироваться плательщиком ALV из-за продаж не нужно. В расчёт порога идут только продажи, которые при налогообложении прибыли считаются предпринимательскими. Если порог превышен в течение года, налог платят с момента превышения. Но за товары и услуги, купленные за границей, ассоциации как покупателю может понадобиться заплатить ALV в Финляндии.' },
        { t: 'h2', x: 'Если ассоциация платит зарплаты, вознаграждения или компенсации' },
        { t: 'p', x: 'Зарплаты, вознаграждения и компенсации, которые платит ассоциация, — например, вознаграждения за заседания и членам правления — сообщают в реестр доходов (Tulorekisteri) отчётом о выплате (palkkatietoilmoitus) с Y-tunnus ассоциации, как правило, в течение 5 дней после дня выплаты. Разовые выплаты до 200 € сообщают раз в месяц, не позднее 5-го числа следующего месяца. Если ассоциация платила зарплату, за этот месяц подают и отдельный отчёт работодателя (työnantajan erillisilmoitus). Вознаграждение за работу (työkorvaus) сообщают, только если получатель не внесён в реестр предоплаты налогов (ennakkoperintärekisteri). С облагаемых выплат ассоциация выполняет обязанности плательщика, например удерживает налог (ennakonpidätys).' },
        { t: 'p', x: 'Волонтёру, который действует по поручению общественно полезной ассоциации и не получает за эту работу ни зарплаты, ни вознаграждения, можно без налога выплачивать:' },
        { t: 'ul', items: [
          'суточные — не более чем за 20 дней в календарном году',
          'компенсацию расходов на проживание',
          'расходы на проезд общественным транспортом по документам — без ограничения суммы',
          'компенсацию за километры — не более 3 000 € в календарном году.',
        ] },
        { t: 'p', x: 'На поездки всегда составляют отчёт о расходах (matkalasku), а в остальном условия освобождения от налога такие же, как для работников. Суточные и компенсацию за километры сообщают в Tulorekisteri не позднее 5-го числа месяца, следующего за месяцем выплаты, хотя они и не облагаются; компенсации по документу перевозчика, например по билету на поезд, не сообщают. Если член ассоциации что-то покупает для ассоциации и получает возмещение по чеку, такое возмещение не облагается и в Tulorekisteri не сообщается.' },
        { t: 'h2', x: 'Помощь с бухгалтерией ассоциации' },
        { t: 'p', x: 'Ведём бухгалтерию или упрощённый учёт ассоциаций так, чтобы виды деятельности были разделены весь год. Готовим годовой отчёт или годовой расчёт к собранию, а при необходимости — налоговую декларацию и отчёты в Tulorekisteri. Обслуживаем по-фински и по-русски.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Finlex: закон об ассоциациях — yhdistyslaki (на финском)', href: SRC.yhdistyslaki },
          { label: 'Finlex: закон о бухучёте — kirjanpitolaki (на финском)', href: SRC.kirjanpitolaki },
          { label: 'Finlex: закон об аудите — tilintarkastuslaki (на финском)', href: SRC.tilintarkastuslaki },
          { label: 'Vero: налог на прибыль общественно полезных организаций (на английском)', href: SRC.incomeTaxEn },
          { label: 'Vero: налоговая декларация ассоциации (на финском)', href: SRC.taxReturnFi },
          { label: 'Vero: ALV общественно полезных организаций (на финском)', href: SRC.vatFi },
          { label: 'Vero: компенсации и выплаты волонтёрам (на финском)', href: SRC.volunteersFi },
          { label: 'Tulorekisteri: ассоциации (на английском)', href: SRC.incomesRegisterEn },
          { label: 'Tulorekisteri: сроки подачи сведений (на английском)', href: SRC.deadlinesEn },
        ] },
      ],
      faq: [
        { q: 'Нужен ли маленькой ассоциации аудитор?', a: 'Обычно нет. Аудитора можно не выбирать, если в каждом из двух последних финансовых годов выполнялось не больше одного из условий: валюта баланса больше 100 000 €, оборот или доходы больше 200 000 €, в среднем больше трёх работников. Тогда ассоциация выбирает ревизора (toiminnantarkastaja), если устав не требует аудита.' },
        { q: 'Может ли маленькая ассоциация вести учёт проще?', a: 'Может, если гранты и другие доходы не превышали 30 000 € ни в закончившемся, ни в предыдущем финансовом году, ассоциация не ведёт коммерческой деятельности, а упрощённый учёт предусмотрен уставом или решением общего собрания. Тогда операции записывают кассовым методом, а годовой отчёт по закону о бухучёте не составляют.' },
        { q: 'Нужно ли ассоциации подавать налоговую декларацию каждый год?', a: 'Не всегда. Декларацию подают, если есть облагаемый доход, если ассоциация продала или купила недвижимость, получила положительное решение о налоговой льготе или если деятельность или сбор средств общественно полезной ассоциации существенно изменились. И всегда — если её запросила Vero.' },
        { q: 'Облагаются ли членские взносы?', a: 'У общественно полезной ассоциации — нет. Членские взносы, пожертвования и гранты на общественно полезную деятельность для неё не облагаются налогом.' },
        { q: 'Можно ли вести бухгалтерию ассоциации самим?', a: 'Можно. Закон не требует привлекать бухгалтерскую фирму, но правление отвечает за то, чтобы бухгалтерия велась по закону. Ревизор проверяет финансы и управление ассоциации, а аудитор, если он есть, проводит аудит.' },
      ],
    },
    en: {
      title: 'Bookkeeping for a Finnish association (ry): what the law requires (2026)',
      description:
        'Association bookkeeping in Finland: simplified accounts, financial statements, operations auditor or auditor, tax return 6C, VAT and the Incomes Register.',
      lead: 'A registered association (ry) generally has to keep books just like a company, but its rules differ: simplified accounts for small associations, the operations audit, the general meeting and the taxation of non-profit organisations. Here is what the law requires and what the board should keep in mind.',
      body: [
        { t: 'h2', x: 'Who is responsible for the books?' },
        { t: 'p', x: 'Under the Accounting Act (kirjanpitolaki), an association is obliged to keep books, and under the Associations Act (yhdistyslaki) its financial statements are prepared in accordance with the Accounting Act. The board must ensure that the bookkeeping complies with the law and that the finances are managed reliably. The law does not require an accounting firm: the association’s own treasurer (rahastonhoitaja) may keep the books. The board, however, is always responsible.' },
        { t: 'h2', x: 'Small association: simplified accounts' },
        { t: 'p', x: 'If the association’s grants and other income totalled at most €30,000 in both the financial year just ended and the one before it, and the association carries on no business, it may keep simplified accounts (kevennetty tilinpito) and does not have to prepare financial statements under the Accounting Act. Simplified accounts are provided for in the rules, or the general meeting may decide on them without amending the rules, with the same majority and notice of meeting that a rule amendment requires. An association registered less than two years ago is deemed to be under the limit unless it is evident that the limit will be exceeded.' },
        { t: 'ul', items: [
          'Income, expenses, assets and liabilities are kept separate, and transactions are recorded on a cash basis, in chronological order and without undue delay.',
          'An up-to-date list of assets and liabilities is kept at all times, and the accounts must provide the information needed to meet any tax obligations.',
          'Invoices, receipts and other material are kept for six years after the end of the calendar year they concern.',
          'On request, a member may inspect the accounts once for each ended calendar month. If the rules restrict this right, an annual statement (vuosilaskelma) is prepared and presented to the members within six months of the end of the financial year.',
        ] },
        { t: 'h2', x: 'Financial statements within four months' },
        { t: 'p', x: 'Other associations prepare financial statements under the Accounting Act (tilinpäätös) for each financial year (tilikausi): a balance sheet (tase), an income statement (tuloslaskelma) and notes (liitetiedot). They must be prepared within four months of the end of the financial year.' },
        { t: 'p', x: 'The general meeting adopts the financial statements or the annual statement and decides on discharging the board from liability (vastuuvapaus). The financial statements do not have to be filed with the Finnish Patent and Registration Office (PRH) unless the association is larger than a small company (pienyritys).' },
        { t: 'h2', x: 'Operations auditor or auditor?' },
        { t: 'p', x: 'An auditor (tilintarkastaja) need not be elected if, in both the financial year just ended and the one before it, no more than one of the following conditions was met: a balance sheet total over €100,000, turnover or equivalent income over €200,000, more than three employees on average. The rules may still require an audit. If the association has no auditor, it must have an operations auditor (toiminnantarkastaja).' },
        { t: 'ul', items: [
          'The operations auditor must be a natural person with sufficient knowledge of financial and legal matters in view of the association’s activities.',
          'The operations auditor must be independent when carrying out the review.',
          'If only one operations auditor is elected, a deputy (varatoiminnantarkastaja) must also be elected.',
          'The operations auditor reviews the association’s finances and administration to the extent its activities require and gives a written report (toiminnantarkastuskertomus) to the meeting that decides on the financial statements.',
        ] },
        { t: 'h2', x: 'Income tax of a non-profit association' },
        { t: 'p', x: 'A non-profit association (yleishyödyllinen yhdistys) pays income tax only on business income and on income from real estate if the property has been used for purposes other than general or public benefit. An association that does not qualify as non-profit is taxed on all its income. The tax rate on business income is 20%.' },
        { t: 'p', x: 'Tax-exempt income includes membership fees, donations and grants received for non-profit activities. Income from the association’s own events – such as raffles, bazaars and sports competitions – is in principle also tax-exempt if it is raised to fund non-profit activities and the activity does not have the characteristics of a business. If the association, for example, regularly provides catering at other organisers’ events, that is usually business.' },
        { t: 'note', x: 'The key point for bookkeeping: income and expenses from non-profit activities, fundraising (varainhankinta), business and real estate must be kept separate both in the books and in the tax return. When this is done document by document throughout the year, the financial statements and the tax return are ready without after-the-fact detective work.' },
        { t: 'h2', x: 'When must an association file a tax return?' },
        { t: 'p', x: 'The tax return (form 6C) is filed in MyTax (OmaVero) no later than 4 months after the end of the financial year if the association:' },
        { t: 'ul', items: [
          'received taxable income during the tax year',
          'sold or bought real estate during the financial year',
          'received a positive decision on tax relief (veronhuojennus)',
          'is non-profit and its activities or fundraising have changed substantially compared with the previous tax year.',
        ] },
        { t: 'p', x: 'A tax return must also always be filed if the Tax Administration (Vero) asks for one. A report of activities (toimintakertomus) or another free-form description of the association’s activities must always be attached to the tax return.' },
        { t: 'h2', x: 'VAT in an association' },
        { t: 'p', x: 'A non-profit association is liable for VAT only on sales made as a business. Small-scale activity stays outside VAT: if the turnover of the business activity is at most €20,000 in both the current and the preceding calendar year, the association does not need to register for VAT because of its sales. Only sales treated as business in income taxation count towards the threshold. If the threshold is exceeded during the year, VAT is payable from the moment it is exceeded. For goods and services bought from abroad, however, the association may have to pay VAT in Finland as the buyer.' },
        { t: 'h2', x: 'When the association pays wages, fees or compensation' },
        { t: 'p', x: 'Wages, fees and compensation paid by the association – for example meeting fees and fees to board members – are reported to the Incomes Register (Tulorekisteri) with an earnings payment report under the association’s Business ID (Y-tunnus), as a rule within 5 days of the payment date. One-off payments of up to €200 are reported monthly, by the 5th day of the following calendar month. If the association has paid wages, it also files an employer’s separate report for that month. Compensation for work (työkorvaus) is reported only if the recipient is not in the prepayment register (ennakkoperintärekisteri). For taxable payments, the association fulfils the payer’s obligations, such as tax withholding (ennakonpidätys).' },
        { t: 'p', x: 'A volunteer who acts on the instructions of a non-profit association and receives no wages or fees for the work can receive, tax-free:' },
        { t: 'ul', items: [
          'a daily allowance for at most 20 days per calendar year',
          'accommodation compensation',
          'public transport costs against receipts, with no euro limit',
          'kilometre allowances of up to €3,000 per calendar year.',
        ] },
        { t: 'p', x: 'A travel expense claim (matkalasku) must always be made, and otherwise the conditions for tax exemption are the same as for employees. Daily allowances and kilometre allowances are reported to the Incomes Register by the 5th day of the month following the payment month, even though they are tax-exempt; reimbursements based on a carrier’s receipt, such as a train ticket, are not reported. If a member buys something on behalf of the association and is reimbursed against the receipt, the reimbursement is not taxable and is not reported to the Incomes Register.' },
        { t: 'h2', x: 'Help with association bookkeeping' },
        { t: 'p', x: 'We keep associations’ books or simplified accounts so that the different activities stay separated throughout the year. We prepare the financial statements or the annual statement for the meeting and, when needed, the tax return and the Incomes Register reports. Our accountants serve you in Finnish or Russian.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Finlex: Associations Act – yhdistyslaki (in Finnish)', href: SRC.yhdistyslaki },
          { label: 'Finlex: Accounting Act – kirjanpitolaki (in Finnish)', href: SRC.kirjanpitolaki },
          { label: 'Finlex: Auditing Act – tilintarkastuslaki (in Finnish)', href: SRC.tilintarkastuslaki },
          { label: 'Vero: income taxation of non-profit organisations', href: SRC.incomeTaxEn },
          { label: 'Vero: tax return of an association (in Finnish)', href: SRC.taxReturnFi },
          { label: 'Vero: VAT of non-profit organisations (in Finnish)', href: SRC.vatFi },
          { label: 'Vero: payments and reimbursements to volunteers (in Finnish)', href: SRC.volunteersFi },
          { label: 'Incomes Register: associations', href: SRC.incomesRegisterEn },
          { label: 'Incomes Register: deadlines for reporting', href: SRC.deadlinesEn },
        ] },
      ],
      faq: [
        { q: 'Does a small association need an auditor?', a: 'Usually not. An auditor need not be elected if, in each of the last two financial years, no more than one of these was met: a balance sheet total over €100,000, turnover or income over €200,000, more than three employees on average. The association then elects an operations auditor (toiminnantarkastaja), unless its rules require an audit.' },
        { q: 'Can a small association keep simpler accounts?', a: 'Yes, if its grants and other income were at most €30,000 in both the financial year just ended and the one before it, it carries on no business, and simplified accounts are provided for in the rules or decided by the general meeting. Transactions are then recorded on a cash basis, and no financial statements under the Accounting Act are needed.' },
        { q: 'Does an association have to file a tax return every year?', a: 'Not always. A return is filed if the association has taxable income, has sold or bought real estate, has received a positive tax relief decision or, as a non-profit, has substantially changed its activities or fundraising – and always if the Tax Administration asks for one.' },
        { q: 'Are membership fees taxable income?', a: 'Not for a non-profit association. Membership fees, donations and grants received for non-profit activities are tax-exempt income for it.' },
        { q: 'Can we keep the association’s books ourselves?', a: 'Yes. The law does not require an accounting firm, but the board is responsible for lawful bookkeeping. The operations auditor reviews the association’s finances and administration, or an auditor carries out an audit.' },
      ],
    },
    et: {
      title: 'Ühingu (ry) raamatupidamine Soomes: mida seadus nõuab (2026)',
      description:
        'Soome ühingu raamatupidamine: lihtsustatud arvestus, raamatupidamise aastaaruanne, revident või audiitor, tuludeklaratsioon 6C, käibemaks ja tuluregister.',
      lead: 'Registreeritud ühing (ry) peab üldjuhul raamatupidamist nagu ettevõte, kuid tal on omad reeglid: väikese ühingu lihtsustatud arvestus, tegevuse revisjon, üldkoosolek ja üldkasuliku ühenduse maksustamine. Kogusime kokku, mida seadus nõuab ja mida juhatus peaks meeles pidama.',
      body: [
        { t: 'h2', x: 'Kes vastutab ühingu raamatupidamise eest?' },
        { t: 'p', x: 'Raamatupidamisseaduse (kirjanpitolaki) järgi on ühing raamatupidamiskohustuslane ning ühinguseaduse (yhdistyslaki) järgi koostatakse tema aastaaruanne raamatupidamisseaduse kohaselt. Juhatus peab hoolitsema selle eest, et raamatupidamine vastaks seadusele ja rahaasjad oleksid usaldusväärselt korraldatud. Seadus ei nõua raamatupidamisbürood: raamatupidamist võib pidada ka ühingu enda laekur (rahastonhoitaja). Vastutus on aga alati juhatusel.' },
        { t: 'h2', x: 'Väike ühing: lihtsustatud arvestus' },
        { t: 'p', x: 'Kui ühingu toetused ja muud tulud kokku olid nii lõppenud kui ka sellele eelnenud majandusaastal (tilikausi) kuni 30 000 € ja ühing ei tegele äritegevusega, võib ta pidada lihtsustatud arvestust (kevennetty tilinpito) ega pea koostama raamatupidamisseaduse kohast aastaaruannet. Lihtsustatud arvestus nähakse ette põhikirjas või otsustab selle üldkoosolek põhikirja muutmata sama häälteenamuse ja kokkukutsumise korraga, mida nõuab põhikirja muutmine. Vähem kui kaks aastat tagasi registreeritud ühingu puhul loetakse, et piir ei ületu, kui ei ole ilmne, et see ületatakse.' },
        { t: 'ul', items: [
          'Tulud, kulud, vara ja kohustused hoitakse lahus ning tehingud kirjendatakse kassapõhiselt, kronoloogilises järjekorras ja põhjendamatu viivituseta.',
          'Vara ja kohustuste kohta peetakse pidevalt ajakohast nimekirja ning arvestusest peab saama võimalike maksukohustuste täitmiseks vajalikud andmed.',
          'Arved, kviitungid ja muud dokumendid säilitatakse kuus aastat pärast selle kalendriaasta lõppu, mida need puudutavad.',
          'Liikmel on nõudmisel õigus tutvuda arvestusega üks kord iga lõppenud kalendrikuu kohta. Kui põhikiri seda õigust piirab, koostatakse tegevuse kohta aastakokkuvõte (vuosilaskelma), mis esitatakse liikmetele kuue kuu jooksul pärast majandusaasta lõppu.',
        ] },
        { t: 'h2', x: 'Raamatupidamise aastaaruanne nelja kuu jooksul' },
        { t: 'p', x: 'Teised ühingud koostavad iga majandusaasta kohta raamatupidamisseaduse kohase raamatupidamise aastaaruande (tilinpäätös): bilansi (tase), kasumiaruande (tuloslaskelma) ja lisad (liitetiedot). Aruanne tuleb koostada nelja kuu jooksul pärast majandusaasta lõppu.' },
        { t: 'p', x: 'Aastaaruande või aastakokkuvõtte kinnitab ning juhatuse vastutusest vabastamise (vastuuvapaus) üle otsustab ühingu üldkoosolek. Aruannet ei pea registreerimiseks esitama Soome patendi- ja registriametile (PRH), välja arvatud juhul, kui ühing on väikeettevõttest (pienyritys) suurem.' },
        { t: 'h2', x: 'Revident või audiitor?' },
        { t: 'p', x: 'Audiitorit (tilintarkastaja) ei pea valima, kui nii lõppenud kui ka sellele eelnenud majandusaastal oli täidetud kõige rohkem üks järgmistest tingimustest: bilansimaht üle 100 000 €, käive või sellele vastav tulu üle 200 000 €, keskmiselt üle kolme töötaja. Põhikiri võib siiski audiitorkontrolli ette näha. Kui ühingul audiitorit ei ole, peab tal olema revident (toiminnantarkastaja).' },
        { t: 'ul', items: [
          'Revident peab olema füüsiline isik, kellel on ühingu tegevust arvestades piisavad teadmised majandus- ja õigusküsimustest.',
          'Revident peab kontrolli tehes olema sõltumatu.',
          'Kui valitakse ainult üks revident, tuleb valida ka tema asendaja (varatoiminnantarkastaja).',
          'Revident kontrollib ühingu majandust ja juhtimist ühingu tegevuse nõutavas ulatuses ning esitab kirjaliku revisjoniaruande (toiminnantarkastuskertomus) koosolekule, mis otsustab aastaaruande üle.',
        ] },
        { t: 'h2', x: 'Üldkasuliku ühingu tulumaks' },
        { t: 'p', x: 'Üldkasulik ühing (yleishyödyllinen yhdistys) maksab tulumaksu ainult ettevõtlustulult (elinkeinotulo) ning kinnisvaratulult juhul, kui kinnisvara on kasutatud muuks kui üldiseks või üldkasulikuks otstarbeks. Ühing, mis ei ole üldkasulik, maksab tulumaksu kogu oma tulult. Ettevõtlustulu maksumäär on 20%.' },
        { t: 'p', x: 'Maksuvabad on näiteks liikmemaksud, annetused ja üldkasulikuks tegevuseks saadud toetused. Ka ühingu enda ürituste – näiteks loteriide, laatade ja spordivõistluste – tulu on põhimõtteliselt maksuvaba, kui see saadakse üldkasuliku tegevuse rahastamiseks ja tegevusel ei ole ettevõtluse tunnuseid. Kui ühing aga näiteks korraldab korduvalt toitlustust teiste üritustel, on see tavaliselt ettevõtlus.' },
        { t: 'note', x: 'Raamatupidamise jaoks kõige tähtsam: üldkasuliku tegevuse, vahendite kogumise (varainhankinta), ettevõtluse ja kinnisvara tulud ja kulud tuleb eristada nii raamatupidamises kui ka tuludeklaratsioonis. Kui seda tehakse dokumendi kaupa kogu aasta jooksul, valmivad aastaaruanne ja deklaratsioon ilma tagantjärele selgitamiseta.' },
        { t: 'h2', x: 'Millal peab ühing tuludeklaratsiooni esitama?' },
        { t: 'p', x: 'Tuludeklaratsioon (vorm 6C) esitatakse OmaVero keskkonnas 4 kuu jooksul pärast majandusaasta lõppu, kui ühing:' },
        { t: 'ul', items: [
          'sai maksuaastal maksustatavat tulu',
          'müüs või ostis majandusaasta jooksul kinnisvara',
          'sai positiivse otsuse maksusoodustuse (veronhuojennus) kohta',
          'on üldkasulik ning tema tegevus või vahendite kogumine on eelmise maksuaastaga võrreldes oluliselt muutunud.',
        ] },
        { t: 'p', x: 'Lisaks tuleb deklaratsioon alati esitada, kui Soome maksuamet (Vero) seda nõuab. Deklaratsioonile tuleb alati lisada tegevusaruanne (toimintakertomus) või muu vabas vormis selgitus ühingu tegevuse kohta.' },
        { t: 'h2', x: 'Käibemaks ühingus' },
        { t: 'p', x: 'Üldkasulik ühing on käibemaksukohustuslane ainult ettevõtlusena tehtud müügilt. Väikesemahuline tegevus jääb käibemaksust välja: kui ettevõtluse käive on nii jooksval kui ka eelmisel kalendriaastal kuni 20 000 €, ei pea ühing end müügi tõttu käibemaksukohustuslaseks registreerima. Piiri arvestamisel võetakse arvesse ainult müük, mida tulumaksustamises loetakse ettevõtluseks. Kui piir ületatakse aasta jooksul, tuleb käibemaksu tasuda alates ületamise hetkest. Välismaalt ostetud kaupadelt ja teenustelt võib ühing aga ostjana olla kohustatud maksma käibemaksu Soome.' },
        { t: 'h2', x: 'Kui ühing maksab palka, tasusid või hüvitisi' },
        { t: 'p', x: 'Ühingu makstud palgad, tasud ja hüvitised – näiteks koosolekutasud ja juhatuse liikmete tasud – teatatakse tuluregistrisse (Tulorekisteri) palgaandmete teatisega (palkkatietoilmoitus) ühingu registrikoodiga (Y-tunnus), üldjuhul 5 päeva jooksul pärast maksepäeva. Kuni 200-euroseid ühekordseid väljamakseid teatatakse kord kuus, hiljemalt järgmise kalendrikuu 5. kuupäeval. Kui ühing on maksnud palka, esitab ta selle kuu kohta ka tööandja eraldi teatise (työnantajan erillisilmoitus). Töötasu (työkorvaus) teatatakse ainult siis, kui saaja ei ole ettemaksuregistris (ennakkoperintärekisteri). Maksustatavatelt väljamaksetelt täidab ühing maksja kohustused, näiteks peab kinni tulumaksu (ennakonpidätys).' },
        { t: 'p', x: 'Vabatahtlikule, kes tegutseb üldkasuliku ühingu ülesandel ega saa selle töö eest palka ega tasu, võib maksuvabalt maksta:' },
        { t: 'ul', items: [
          'päevaraha kuni 20 päeva eest kalendriaastas',
          'majutushüvitist',
          'ühistranspordi sõidukulusid kviitungite alusel ilma summapiiranguta',
          'kilomeetrihüvitisi kuni 3 000 € kalendriaastas.',
        ] },
        { t: 'p', x: 'Sõitude kohta tuleb alati koostada sõidukulude aruanne (matkalasku); muus osas on maksuvabastuse tingimused samad mis töötajal. Päevarahad ja kilomeetrihüvitised teatatakse tuluregistrisse hiljemalt maksekuule järgneva kuu 5. kuupäeval, kuigi need on maksuvabad; vedaja dokumendi (näiteks rongipileti) alusel makstud hüvitisi ei teatata. Kui liige ostab midagi ühingu nimel ja ühing hüvitab kulu kviitungi alusel, ei ole hüvitis maksustatav ega teatata seda tuluregistrisse.' },
        { t: 'h2', x: 'Abi ühingu raamatupidamisega' },
        { t: 'p', x: 'Peame ühingute raamatupidamist või lihtsustatud arvestust nii, et eri tegevused on kogu aasta eristatud. Koostame aastaaruande või aastakokkuvõtte koosoleku jaoks ning vajaduse korral tuludeklaratsiooni ja tuluregistri teatised. Meie raamatupidajad teenindavad soome või vene keeles.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Finlex: ühinguseadus – yhdistyslaki (soome keeles)', href: SRC.yhdistyslaki },
          { label: 'Finlex: raamatupidamisseadus – kirjanpitolaki (soome keeles)', href: SRC.kirjanpitolaki },
          { label: 'Finlex: auditeerimisseadus – tilintarkastuslaki (soome keeles)', href: SRC.tilintarkastuslaki },
          { label: 'Vero: üldkasulike organisatsioonide tulumaks (inglise keeles)', href: SRC.incomeTaxEn },
          { label: 'Vero: ühingu tuludeklaratsioon (soome keeles)', href: SRC.taxReturnFi },
          { label: 'Vero: üldkasulike organisatsioonide käibemaks (soome keeles)', href: SRC.vatFi },
          { label: 'Vero: vabatahtlikele makstavad hüvitised (soome keeles)', href: SRC.volunteersFi },
          { label: 'Tuluregister: ühingud (inglise keeles)', href: SRC.incomesRegisterEn },
          { label: 'Tuluregister: teatamise tähtajad (inglise keeles)', href: SRC.deadlinesEn },
        ] },
      ],
      faq: [
        { q: 'Kas väike ühing vajab audiitorit?', a: 'Tavaliselt mitte. Audiitorit ei pea valima, kui kummalgi kahest viimasest majandusaastast oli täidetud kõige rohkem üks tingimustest: bilansimaht üle 100 000 €, käive või tulu üle 200 000 €, keskmiselt üle kolme töötaja. Siis valib ühing revidendi (toiminnantarkastaja), kui põhikiri ei nõua audiitorkontrolli.' },
        { q: 'Kas väike ühing võib pidada lihtsamat arvestust?', a: 'Võib, kui toetused ja muud tulud olid nii lõppenud kui ka eelmisel majandusaastal kuni 30 000 €, ühing ei tegele äritegevusega ning lihtsustatud arvestus on ette nähtud põhikirjas või üldkoosoleku otsusega. Siis kirjendatakse tehingud kassapõhiselt ja raamatupidamisseaduse kohast aastaaruannet ei koostata.' },
        { q: 'Kas ühing peab tuludeklaratsiooni esitama igal aastal?', a: 'Mitte alati. Deklaratsioon esitatakse, kui ühingul on maksustatavat tulu, ta on müünud või ostnud kinnisvara, saanud positiivse maksusoodustuse otsuse või kui üldkasuliku ühingu tegevus või vahendite kogumine on oluliselt muutunud – ning alati, kui Vero seda nõuab.' },
        { q: 'Kas liikmemaksud on maksustatav tulu?', a: 'Üldkasuliku ühingu puhul mitte. Liikmemaksud, annetused ja üldkasulikuks tegevuseks saadud toetused on talle maksuvaba tulu.' },
        { q: 'Kas ühingu raamatupidamist võib pidada ise?', a: 'Võib. Seadus ei nõua raamatupidamisbürood, kuid juhatus vastutab selle eest, et raamatupidamine vastaks seadusele. Revident kontrollib ühingu majandust ja juhtimist või audiitor teeb auditi.' },
      ],
    },
    uk: {
      title: 'Бухгалтерія асоціації (ry) у Фінляндії: що обовʼязково за законом (2026)',
      description:
        'Бухгалтерія асоціації (ry): спрощений облік, річний звіт, ревізор чи аудитор, декларація 6C, ПДВ і Tulorekisteri — з посиланнями на закон.',
      lead: 'Зареєстрована асоціація (ry), як правило, зобовʼязана вести бухгалтерію так само, як компанія, але в неї свої правила: спрощений облік для малих асоціацій, ревізія діяльності, загальні збори й оподаткування суспільно корисної організації. Зібрали, чого вимагає закон і про що варто памʼятати правлінню.',
      body: [
        { t: 'h2', x: 'Хто відповідає за бухгалтерію асоціації?' },
        { t: 'p', x: 'За законом про бухгалтерський облік (kirjanpitolaki) асоціація зобовʼязана вести бухгалтерію, а за законом про асоціації (yhdistyslaki) її річний звіт складають відповідно до закону про бухгалтерський облік. Правління має стежити, щоб бухгалтерія велася за законом, а коштами управляли надійно. Закон не вимагає залучати бухгалтерську фірму: бухгалтерію може вести й скарбник асоціації (rahastonhoitaja). Але відповідає за неї завжди правління.' },
        { t: 'h2', x: 'Мала асоціація: спрощений облік' },
        { t: 'p', x: 'Якщо гранти та інші доходи асоціації разом не перевищували 30 000 € ні в минулому, ні в попередньому фінансовому році (tilikausi) і асоціація не веде комерційної діяльності, вона може вести спрощений облік (kevennetty tilinpito) і не складати річний звіт за законом про бухгалтерський облік. Спрощений облік передбачають у статуті, або загальні збори можуть вирішити це без зміни статуту — тією ж більшістю і з тим самим порядком скликання, що потрібні для зміни статуту. Асоціація, зареєстрована менше ніж два роки тому, вважається такою, що не перевищує поріг, якщо не очевидно, що його буде перевищено.' },
        { t: 'ul', items: [
          'Доходи, витрати, майно й борги обліковують окремо, а операції записують касовим методом, у хронологічному порядку й без невиправданих затримок.',
          'Постійно ведуть актуальний перелік майна й боргів; облік має давати відомості, потрібні для сплати податків, якщо вони виникнуть.',
          'Рахунки, чеки та інші документи зберігають шість років після закінчення календарного року, до якого вони належать.',
          'Член асоціації на запит має право ознайомитися з обліком один раз за кожен завершений календарний місяць. Якщо статут обмежує це право, складають річний розрахунок (vuosilaskelma) і подають його членам протягом шести місяців після закінчення фінансового року.',
        ] },
        { t: 'h2', x: 'Річний звіт — протягом чотирьох місяців' },
        { t: 'p', x: 'Інші асоціації складають за фінансовий рік річний звіт за законом про бухгалтерський облік (tilinpäätös): баланс (tase), звіт про прибутки та збитки (tuloslaskelma) і примітки (liitetiedot). Строк — чотири місяці після закінчення фінансового року.' },
        { t: 'p', x: 'Річний звіт або річний розрахунок затверджують загальні збори асоціації — вони ж вирішують, чи звільнити правління від відповідальності (vastuuvapaus). Реєструвати річний звіт у Патентно-реєстраційному відомстві (PRH) не потрібно, якщо асоціація не більша за мале підприємство (pienyritys).' },
        { t: 'h2', x: 'Ревізор (toiminnantarkastaja) чи аудитор?' },
        { t: 'p', x: 'Аудитора (tilintarkastaja) можна не обирати, якщо і в минулому, і в попередньому фінансовому році виконувалося не більше однієї з умов: валюта балансу понад 100 000 €, оборот або відповідні доходи понад 200 000 €, у середньому понад три працівники. Статут усе одно може вимагати аудиту. Якщо аудитора немає, в асоціації має бути ревізор діяльності (toiminnantarkastaja).' },
        { t: 'ul', items: [
          'Ревізор — фізична особа, яка достатньо розуміється на фінансових і правових питаннях з огляду на діяльність асоціації.',
          'Під час перевірки ревізор має бути незалежним.',
          'Якщо обрано лише одного ревізора, обирають і його заступника (varatoiminnantarkastaja).',
          'Ревізор перевіряє фінанси й управління асоціації в обсязі, якого вимагає її діяльність, і подає письмовий звіт про перевірку (toiminnantarkastuskertomus) зборам, які затверджують річний звіт.',
        ] },
        { t: 'h2', x: 'Податок на прибуток суспільно корисної асоціації' },
        { t: 'p', x: 'Суспільно корисна асоціація (yleishyödyllinen yhdistys) сплачує податок на прибуток лише з доходу від підприємницької діяльності (elinkeinotoiminta) та з доходу від нерухомості, якщо її використовували не для загальних або суспільно корисних цілей. Асоціація, яка не вважається суспільно корисною, сплачує податок з усіх доходів. Ставка податку на підприємницький дохід — 20 %.' },
        { t: 'p', x: 'Не оподатковуються, зокрема, членські внески, пожертви та гранти на суспільно корисну діяльність. Доходи від власних заходів асоціації — лотерей, ярмарків, спортивних змагань — у принципі теж не оподатковуються, якщо їх отримують для фінансування суспільно корисної діяльності й діяльність не має ознак підприємницької. Але якщо асоціація, наприклад, регулярно організовує харчування на чужих заходах, це зазвичай уже підприємницька діяльність.' },
        { t: 'note', x: 'Головне для бухгалтерії: доходи й витрати суспільно корисної діяльності, збору коштів (varainhankinta), підприємницької діяльності та нерухомості треба розділяти — і в бухгалтерії, і в податковій декларації. Якщо розносити їх за документами весь рік, річний звіт і декларація готуються без зʼясувань заднім числом.' },
        { t: 'h2', x: 'Коли асоціація подає податкову декларацію?' },
        { t: 'p', x: 'Декларацію (форма 6C) подають в OmaVero не пізніше ніж через 4 місяці після закінчення фінансового року, якщо асоціація:' },
        { t: 'ul', items: [
          'отримала в податковому році оподатковуваний дохід',
          'протягом фінансового року продала або купила нерухомість',
          'отримала позитивне рішення про податкову пільгу (veronhuojennus)',
          'суспільно корисна, і її діяльність або збір коштів суттєво змінилися порівняно з минулим податковим роком.',
        ] },
        { t: 'p', x: 'Крім того, декларацію подають завжди, якщо її запросила податкова (Vero). До декларації завжди додають звіт про діяльність (toimintakertomus) або інший опис діяльності асоціації у вільній формі.' },
        { t: 'h2', x: 'ПДВ в асоціації' },
        { t: 'p', x: 'Суспільно корисна асоціація сплачує ПДВ (ALV) лише з продажів у межах підприємницької діяльності. Діяльність невеликого обсягу ПДВ не оподатковується: якщо оборот підприємницької діяльності не перевищує 20 000 € ні в поточному, ні в попередньому календарному році, реєструватися платником ПДВ через продажі не потрібно. До розрахунку порогу входять лише продажі, які в оподаткуванні прибутку вважаються підприємницькими. Якщо поріг перевищено протягом року, податок сплачують з моменту перевищення. Але за товари й послуги, куплені за кордоном, асоціації як покупцеві може знадобитися сплатити ПДВ у Фінляндії.' },
        { t: 'h2', x: 'Якщо асоціація виплачує зарплати, винагороди чи компенсації' },
        { t: 'p', x: 'Зарплати, винагороди та компенсації, які виплачує асоціація, — наприклад, винагороди за засідання та членам правління — подають до реєстру доходів (Tulorekisteri) звітом про виплату (palkkatietoilmoitus) із зазначенням Y-tunnus асоціації, як правило, протягом 5 днів від дня виплати. Разові виплати до 200 € подають щомісяця, не пізніше 5-го числа наступного місяця. Якщо асоціація виплачувала зарплату, за цей місяць подають і окремий звіт роботодавця (työnantajan erillisilmoitus). Винагороду за роботу (työkorvaus) подають, лише якщо отримувач не внесений до реєстру передоплати податків (ennakkoperintärekisteri). З оподатковуваних виплат асоціація виконує обовʼязки платника, наприклад утримує податок (ennakonpidätys).' },
        { t: 'p', x: 'Волонтерові, який діє за дорученням суспільно корисної асоціації та не отримує за цю роботу ні зарплати, ні винагороди, можна без податку виплачувати:' },
        { t: 'ul', items: [
          'добові — не більше ніж за 20 днів на календарний рік',
          'компенсацію витрат на проживання',
          'витрати на проїзд громадським транспортом за документами — без обмеження суми',
          'компенсацію за кілометри — не більше 3 000 € на календарний рік.',
        ] },
        { t: 'p', x: 'Для поїздок завжди складають звіт про витрати (matkalasku), а в іншому умови звільнення від податку такі самі, як для працівників. Добові й компенсацію за кілометри подають до Tulorekisteri не пізніше 5-го числа місяця, що настає за місяцем виплати, хоча вони й не оподатковуються; компенсації за документом перевізника, наприклад за квитком на потяг, не подають. Якщо член асоціації щось купує для асоціації й отримує відшкодування за чеком, таке відшкодування не оподатковується і до Tulorekisteri не подається.' },
        { t: 'h2', x: 'Допомога з бухгалтерією асоціації' },
        { t: 'p', x: 'Ведемо бухгалтерію або спрощений облік асоціацій так, щоб види діяльності були розділені весь рік. Готуємо річний звіт або річний розрахунок до зборів, а за потреби — податкову декларацію та звіти до Tulorekisteri. Наші бухгалтери обслуговують фінською або російською мовою.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Finlex: закон про асоціації — yhdistyslaki (фінською)', href: SRC.yhdistyslaki },
          { label: 'Finlex: закон про бухгалтерський облік — kirjanpitolaki (фінською)', href: SRC.kirjanpitolaki },
          { label: 'Finlex: закон про аудит — tilintarkastuslaki (фінською)', href: SRC.tilintarkastuslaki },
          { label: 'Vero: податок на прибуток суспільно корисних організацій (англійською)', href: SRC.incomeTaxEn },
          { label: 'Vero: податкова декларація асоціації (фінською)', href: SRC.taxReturnFi },
          { label: 'Vero: ПДВ суспільно корисних організацій (фінською)', href: SRC.vatFi },
          { label: 'Vero: компенсації та виплати волонтерам (фінською)', href: SRC.volunteersFi },
          { label: 'Tulorekisteri: асоціації (англійською)', href: SRC.incomesRegisterEn },
          { label: 'Tulorekisteri: строки подання відомостей (англійською)', href: SRC.deadlinesEn },
        ] },
      ],
      faq: [
        { q: 'Чи потрібен маленькій асоціації аудитор?', a: 'Зазвичай ні. Аудитора можна не обирати, якщо в кожному з двох останніх фінансових років виконувалося не більше однієї з умов: валюта балансу понад 100 000 €, оборот або доходи понад 200 000 €, у середньому понад три працівники. Тоді асоціація обирає ревізора (toiminnantarkastaja), якщо статут не вимагає аудиту.' },
        { q: 'Чи може мала асоціація вести облік простіше?', a: 'Може, якщо гранти та інші доходи не перевищували 30 000 € ні в минулому, ні в попередньому фінансовому році, асоціація не веде комерційної діяльності, а спрощений облік передбачено статутом або рішенням загальних зборів. Тоді операції записують касовим методом, а річний звіт за законом про бухгалтерський облік не складають.' },
        { q: 'Чи треба асоціації подавати податкову декларацію щороку?', a: 'Не завжди. Декларацію подають, якщо є оподатковуваний дохід, якщо асоціація продала або купила нерухомість, отримала позитивне рішення про податкову пільгу або якщо діяльність чи збір коштів суспільно корисної асоціації суттєво змінилися. І завжди — якщо її запросила Vero.' },
        { q: 'Чи оподатковуються членські внески?', a: 'У суспільно корисної асоціації — ні. Членські внески, пожертви та гранти на суспільно корисну діяльність для неї не оподатковуються.' },
        { q: 'Чи можна вести бухгалтерію асоціації самостійно?', a: 'Можна. Закон не вимагає залучати бухгалтерську фірму, але правління відповідає за те, щоб бухгалтерія велася за законом. Ревізор перевіряє фінанси й управління асоціації, а аудитор, якщо він є, проводить аудит.' },
      ],
    },
  },
};
