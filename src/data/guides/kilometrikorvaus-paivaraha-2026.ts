import type { Guide } from './types';

// Facts verified 12 Oct 2026, verbatim, against vero.fi and Finlex (page update date in brackets).
// Every link below was fetched the same day and answered HTTP 200.
// - Verohallinnon päätös verovapaista matkakustannusten korvauksista vuonna 2026 (VH/6575/00.01.00/2025,
//   antopäivä 7.11.2025, voimassa 1.1.2026 – toistaiseksi; EN version 7.11.2025):
//   3 § työmatka = "matkaa, jonka palkansaaja tilapäisesti tekee työhön kuuluvien tehtävien
//   suorittamiseksi erityiselle työntekemispaikalle varsinaisen työpaikan ulkopuolelle"; "Työmatkana ei
//   pidetä palkansaajan asunnon ja varsinaisen työpaikan välistä matkaa".
//   6 § matkavuorokausi "enintään 24 tunnin pituista ajanjaksoa, joka alkaa palkansaajan lähtiessä
//   työmatkalle työpaikaltaan tai asunnoltaan".
//   8 § other vehicles: "liikenteenharjoittajan antaman tositteen tai muun luotettavan selvityksen mukainen
//   määrä".
//   9 § auto "55 senttiä kilometriltä, jota korotetaan" — "9 senttiä kilometriltä perävaunun
//   kuljettamisesta autoon kiinnitettynä"; "15 senttiä ... asuntovaunun kuljettamista"; "28 senttiä ...
//   taukotuvan tai vastaavan raskaan kuorman kuljettamista"; "4 senttiä kilometriltä sellaisista autossa
//   kuljetettavista koneista tai muista esineistä, joiden paino ylittää 80 kiloa tai joiden koko on suuri";
//   "4 senttiä kilometriltä, jos palkansaaja työhönsä kuuluvien tehtävien vuoksi kuljettaa autossa koiraa";
//   "12 senttiä kilometriltä ... metsäautotiellä tai muulta liikenteeltä suljetulla
//   tienrakennustyömaalla"; "moottoripyörä 42 senttiä kilometriltä"; "muu kulkuneuvo 13 senttiä
//   kilometriltä"; passengers "4 senttiä kilometriltä kutakin mukana seuraavaa henkilöä kohden";
//   käyttöetuauto "käyttövoimakulujen enimmäismäärä on 11 senttiä kilometriltä".
//   11 § "yli 15 kilometrin etäisyydellä joko palkansaajan varsinaisesta työpaikasta tai asunnosta";
//   "lisäksi oltava yli 5 kilometrin etäisyydellä sekä varsinaisesta työpaikasta että asunnosta".
//   12 § "yli 6 tuntia (osapäiväraha) 25", "yli 10 tuntia (kokopäiväraha) 54"; over the last full
//   matkavuorokausi "vähintään 2 tunnilla 25", "yli 6 tunnilla 54"; free meal → "puolet"; "Ilmaisella
//   ruoalla tarkoitetaan kokopäivärahan kysymyksessä ollen kahta ja osapäivärahan kysymyksessä ollen yhtä
//   ilmaista ateriaa".
//   13 § foreign per diem by country (table, e.g. "Viro 82", "Ruotsi 70", "Maa, jota ei ole erikseen
//   mainittu 52"); "määräytyy sen maan tai alueen mukaan, missä matkavuorokausi ulkomailla päättyy";
//   return to Finland: "puoleen ... jos ... ylittää ... yli kahdella tunnilla", full "yli kymmenellä
//   tunnilla"; "jos ulkomaille tehty työmatka on kestänyt vähintään 10 tuntia" else domestic rules; free
//   meals "50 prosentilla alennettuna", "kahta ilmaista ateriaa".
//   14 § ateriakorvaus: "työmatkasta ei suoriteta päivärahaa", "ei työn vuoksi ole mahdollisuutta
//   ruokailutauon aikana aterioida tavanomaisella ruokailupaikallaan", "enimmäismäärä on 13,50 euroa";
//   two meals "27,00 euroa".
//   15 § majoittumiskorvaus "majoitusliikkeen antaman tositteen tai muun luotettavan selvityksen mukainen
//   määrä".
//   17 § yömatkaraha: "vähintään 4 tuntia on kello 21.00 - 07.00 välisenä aikana", employer gives no free
//   lodging or lodging/sleeper compensation; "Yömatkarahan enimmäismäärä on 16 euroa".
// - Vero, Kilometrikorvaus ja päiväraha (7.11.2025; EN 7.11.2025): "verovapaita korvauksia voi maksaa vain
//   työntekijälle"; "Työskentely ei ole enää tilapäistä, jos teet töitä samassa kohteessa yli kolme
//   vuotta"; "korkeintaan 0,55 euroa/km. (Vuonna 2025 summa on 0,59 euroa/km.)"; "osapäiväraha 25 euroa
//   vuonna 2026 (24 euroa vuonna 2025)", "kokopäiväraha 54 euroa vuonna 2026 (53 euroa vuonna 2025)",
//   ateriakorvaus "13,50 euroa päivässä vuonna 2026. (Vuonna 2025 summa on 13,25 euroa)";
//   "toiminimiyrittäjä, et voi maksaa itsellesi verovapaata kilometrikorvausta tai päivärahaa. Voit
//   kuitenkin tehdä vastaavan suuruisen verovähennyksen verotuksessa"; owner of oy/ky/ay working without
//   salary: tax-free "vain, jos ... teet matkoista matkalaskun yrityksen kirjanpitoon"; wrongly paid
//   "korvaukset ovat palkkaa. Silloin niistä pitää jälkikäteen maksaa verot ja palkan sivukulut. Lisäksi
//   seurauksena voi olla sanktiomaksuja".
// - Vero, syventävä ohje 48013 Työmatkakustannusten korvaukset verotuksessa (VH/630/00.01.00/2026,
//   5.3.2026; page 10.3.2026): 5.3.1 three-year limit applies to "päivärahoihin, kilometrikorvauksiin,
//   ateriakorvauksiin ja majoittumiskorvauksiin"; 8.1 "TVL 71 §:n luettelo verovapaista korvauksista on
//   tyhjentävä"; 8.1.2 amount above the decision "on palkansaajalle veronalaista ansiotuloa (palkkaa)";
//   8.1.3 "kustannuspäätöksen määräykset eivät velvoita työnantajia maksamaan korvauksia"; 8.2.3 own-car
//   allowance also "perheenjäsenen tai tuttavan autolla"; 8.2.5 free car benefit → no tax-free km
//   allowance; 8.2.6 unlisted vehicles incl. "polkupyörä, sähköpyörä"; 8.3.1 15 km "lyhintä käytettävissä
//   olevaa reittiä pitkin", "Kunnan rajan ylittäminen ei ole edellytyksenä"; example 56 (Mon 8.00 – Thu
//   9.00, 73 h, three per diems); 8.3.2 leisure days → no tax-free per diem; 8.3.3 "Yhdellä ilmaisella
//   aterialla ei siis ole vaikutusta kokopäivärahan määrään", "osapäiväraha puolitetaan jo yhdestä
//   ilmaisesta ateriasta"; 8.3.4 "Hotelliaamiainen ei ole edellä tarkoitettu ateria"; 8.6 lunch voucher
//   usable on the trip → "työnantaja ei voi maksaa ateriakorvausta verovapaasti"; two meal allowances
//   when the working day incl. breaks "on yli 11 tuntia"; 8.7.2 yömatkaraha e.g. staying "sukulaisten
//   luona", not for night workers; 12 tax-free reimbursements carry no "työnantajan sairausvakuutusmaksua";
//   13 matkalasku (EPA 17 § 2 mom.): "matkan tarkoitus ja kohde (osoite)", "tarvittaessa matkareitti",
//   "matkustamistapa (kulkuneuvo)", "matkan alkamis- ja päättymisajankohdat (päivämäärät ja
//   kellonajat)", "ulkomaanmatkoista maa tai alue, jossa matkavuorokausi on päättynyt"; km: "ajettu
//   kilometrimäärä ja yksikköhinta (EPA 17 §:n 3 momentti)"; receipts attached; "allekirjoitetulla
//   matkalaskulla", "Myös sähköistä allekirjoitusta voidaan käyttää".
// - Tuloverolaki 1535/1992 (finlex.fi, fetched 12.10.2026): 71 § 1 mom. "Veronalaista tuloa ei ole
//   työnantajalta työmatkasta saatu matkustamiskustannusten korvaus, päiväraha, ateriakorvaus ja
//   majoittumiskorvaus."; 72 a § "enintään kolmen vuoden työskentelyä samassa työntekemispaikassa".
// - Vero, Yrittäjän ajoneuvojen kulut (29.6.2022; EN 1.7.2022): business asset if "yli 50% ajokilometreistä
//   on elinkeinotoiminnan ajoja", private if "50% tai vähemmän"; home → own business premises is private
//   driving; ajopäiväkirja: "ajon alkamis- ja päättymisajankohta", "ajon alkamis- ja päättymispaikka sekä
//   tarvittaessa ajoreitti", "matkan pituus", "ajon tarkoitus", "matkamittarin lukema ajon alussa ja
//   lopussa", "auton käyttäjä", "autolla ajettujen kilometrien kokonaismäärä vuoden aikana".
// - Vero, Elinkeinotoiminnan veroilmoituksen täyttöohje (17.11.2025): private car → lisävähennys
//   "enintään yhtä suuri kuin palkansaajan verovapaa kilometrikorvaus"; reduced by car costs booked; if
//   booked costs exceed the maximum "verotuksessa vähennetään todelliset kustannukset"; business-asset car:
//   private share = costs and depreciation / total km × private km "ajopäiväkirjan mukaisella".
//   (The page still shows the 2025 figure 0,59 €/km; the 2026 maximum follows from the rule "enintään yhtä
//   suuri" + decision 9 § → 0,55 €/km. Same derivation for 54/25 € below.)
// - Vero, Tilapäinen työmatka ja lisävähennys (1.1.2026; EN 9.6.2026): "Yrittäjänä et voi maksaa itsellesi
//   päivärahaa"; "Vähennyksen enimmäismäärä on sama kuin palkansaajan verovapaiden päivärahojen
//   enimmäismäärä"; trip must be temporary and "yrityksen tavanomaisen toiminta-alueen ulkopuolelle".
// - Vero, syventävä ohje 48192 (VH/721/00.01.00/2025, 28.1.2025): EVL 55 § deduction "edellyttää
//   ajopäiväkirjaa tai muuta luotettavaa selvitystä"; actual costs above the maximum → no additional
//   deduction on top; example: log with only monthly totals and no start/end times was insufficient and
//   "Verohallinto määrää Akselille veronkorotuksen".
// - Vero, Kustannusten korvausten ilmoittaminen tulorekisteriin (18.5.2026; EN 18.5.2026): tax-free →
//   "Ateriakorvaus (303)", "Kilometrikorvaus (verovapaa) (311)", "Päiväraha (331)"; "viimeistään
//   maksukuukautta seuraavan kuukauden viidentenä päivänä", one report a month allowed; owner of oy or
//   partnership without salary → same codes; taxable travel reimbursements "Muu maksettu lisä (216)",
//   own car "Kilometrikorvaus (veronalainen) (209)", within "viiden päivän kuluessa maksupäivästä"; not
//   reported: ticket-receipt reimbursements, "majoittumiskorvaus", "yömatkaraha, jos maksetaan
//   Verohallinnon päätöksen enimmäismäärän mukaisesti". (The page's 53 € per diem example is the 2025
//   amount and is NOT used.)
const VERO = 'https://www.vero.fi';

const SRC = {
  decisionFi: `${VERO}/syventavat-vero-ohjeet/paatokset/47405/verohallinnon-paatos-verovapaista-matkakustannusten-korvauksista-vuonna-2026/`,
  decisionEn: `${VERO}/en/detailed-guidance/decisions/47405/tax-exempt-allowances-in-2026-for-business-travel/`,
  allowancesFi: `${VERO}/henkiloasiakkaat/vahennykset/kilometrikorvaus-ja-paivaraha/`,
  allowancesEn: `${VERO}/en/individuals/deductions/kilometre-and-per-diem-allowances/`,
  guideFi: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48013/tyomatkakustannusten-korvaukset-verotuksessa7/`,
  vehicleFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/vahennykset/ajoneuvojen_kulut/`,
  vehicleEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/deductions/vehicle-expenses/`,
  tripFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/vahennykset/tilapainen-tyomatka-ja-paivaraha/`,
  tripEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/deductions/temporary-work-trips-and-the-additional-deduction/`,
  incomesFi: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/suorituksen-maksajat/palkkatiedot/kustannusten-korvaukset/`,
  incomesEn: `${VERO}/en/incomes-register/companies-and-organisations/employers/earnings-payment-data/reporting-reimbursements-of-expenses-to-the-incomes-register/`,
  tvl: 'https://www.finlex.fi/fi/lainsaadanto/1992/1535',
};

export const kilometrikorvausPaivaraha2026: Guide = {
  slug: 'kilometrikorvaus-paivaraha-2026',
  datePublished: '2026-10-12',
  dateModified: '2026-10-12',
  content: {
    fi: {
      title: 'Kilometrikorvaus, päiväraha ja ateriakorvaus 2026: verovapaat matkakorvaukset',
      description:
        'Verovapaat matkakorvaukset 2026: kilometrikorvaus 0,55 €/km, päiväraha 54 € ja 25 €, ateriakorvaus 13,50 €. Ehdot, matkalasku, ajopäiväkirja ja tulorekisteri.',
      lead: 'Työnantaja voi korvata työntekijän työmatkan kulut verovapaasti, kun matka täyttää verotuksen työmatkan ehdot ja korvaus pysyy Verohallinnon vuosittaisen päätöksen enimmäismäärissä. Vuonna 2026 oman auton kilometrikorvaus laski 0,55 euroon kilometriltä, ja päivärahat nousivat. Kokosimme vuoden 2026 määrät, ehdot, matkalaskun ja ajopäiväkirjan vaatimukset, toiminimiyrittäjän erot sekä tulorekisteri-ilmoittamisen.',
      body: [
        { t: 'h2', x: 'Mitä verovapaat matkakorvaukset ovat?' },
        { t: 'p', x: 'Tuloverolain 71 §:n mukaan veronalaista tuloa ei ole työnantajalta työmatkasta saatu matkustamiskustannusten korvaus, päiväraha, ateriakorvaus ja majoittumiskorvaus. Luettelo on tyhjentävä: muut korvaukset ovat palkkaa. Verohallinto vahvistaa vuosittain enimmäismäärät, jotka työnantaja voi maksaa verovapaasti. Vuoden 2026 päätös (VH/6575/00.01.00/2025) koskee työmatkoja tai niiden osia, jotka tehdään vuonna 2026.' },
        { t: 'p', x: 'Enimmäismäärät ovat ylärajoja, eivät velvoitteita. Se, mitä työnantaja maksaa, määräytyy työ- tai virkaehtosopimuksen ja työsopimuksen mukaan. Jos työnantaja maksaa enemmän kuin päätös sallii, ylimenevä osa on työntekijän veronalaista palkkaa.' },
        { t: 'h2', x: 'Milloin matka on verotuksessa työmatka?' },
        { t: 'p', x: 'Työmatka on matka, jonka palkansaaja tekee tilapäisesti työtehtävien vuoksi erityiselle työntekemispaikalle varsinaisen työpaikkansa ulkopuolelle, esimerkiksi asiakkaan luo, messuille, koulutukseen tai kokoukseen. Verovapaita korvauksia voi maksaa vain työntekijälle, eli maksajan ja saajan välillä on oltava työsuhde (poikkeuksista, kuten yhtiön omistajasta, kerromme alempana).' },
        { t: 'ul', items: [
          'Kodin ja varsinaisen työpaikan välinen matka ei ole työmatka. Siitä maksettu korvaus on palkkaa.',
          'Vapaa-ajan matkat ja muut yksityisasiat eivät ole työmatkoja. Jos työmatkaan yhdistetään vapaapäiviä, niiltä ei voi maksaa verovapaata päivärahaa.',
          'Työskentely samassa työntekemispaikassa on tilapäistä enintään kolme vuotta. Sen jälkeen paikasta tulee verotuksessa varsinainen työpaikka, eikä sinne tehdyistä matkoista voi enää maksaa verovapaita päivärahoja, kilometrikorvauksia, ateriakorvauksia tai majoittumiskorvauksia.',
        ] },
        { t: 'h2', x: 'Kilometrikorvaus 2026' },
        { t: 'p', x: 'Kun työntekijä tekee työmatkan omalla autollaan tai autolla, joka on hänen hallinnassaan (esimerkiksi perheenjäsenen auto), verovapaa kilometrikorvaus on vuonna 2026 enintään 55 senttiä kilometriltä. Vuonna 2025 määrä oli 59 senttiä, joten korvaus laski. Perusmäärää voi korottaa seuraavasti:' },
        { t: 'ul', items: [
          '4 senttiä/km jokaisesta mukana olevasta henkilöstä, jonka kuljettaminen on työnantajan asia',
          '9 senttiä/km, kun autoon on kiinnitetty perävaunu',
          '15 senttiä/km, kun työ edellyttää asuntovaunun kuljettamista',
          '28 senttiä/km, kun työ edellyttää taukotuvan tai vastaavan raskaan kuorman kuljettamista',
          '4 senttiä/km, kun autossa kuljetetaan yli 80 kilon painoisia tai kooltaan suuria koneita tai esineitä',
          '4 senttiä/km, kun työntekijä kuljettaa työtehtäviensä vuoksi koiraa',
          '12 senttiä/km niiltä kilometreiltä, jotka ajetaan metsäautotiellä tai liikenteeltä suljetulla tienrakennustyömaalla.',
        ] },
        { t: 'p', x: 'Kutakin korotusta sovelletaan kilometriä kohden vain kerran; ainoastaan matkustajakorotus kasvaa matkustajien määrän mukaan. Moottoripyörällä enimmäismäärä on 42 senttiä/km ja esimerkiksi polkupyörällä tai sähköpyörällä 13 senttiä/km. Jos työntekijällä on työnantajalta vapaa autoetu, työajoista ei voi maksaa verovapaata kilometrikorvausta. Käyttöetuauton kuljettajalle, joka maksaa itse polttoaineen, voi korvata enintään 11 senttiä/km.' },
        { t: 'p', x: 'Esimerkki: työntekijä ajaa omalla autollaan asiakkaan luo ja takaisin, yhteensä 300 km, ja ottaa kollegan kyytiin. Verovapaa kilometrikorvaus on 300 × (0,55 + 0,04) = 177 €.' },
        { t: 'h2', x: 'Kotimaan päiväraha 2026' },
        { t: 'p', x: 'Päiväraha korvaa työmatkasta aiheutuvaa ruokailu- ja muiden elinkustannusten lisäystä. Se ei sisällä matkustamista eikä majoitusta. Vuoden 2026 enimmäismäärät:' },
        { t: 'ul', items: [
          'osapäiväraha 25 €, kun työmatka kestää yli 6 tuntia',
          'kokopäiväraha 54 €, kun työmatka kestää yli 10 tuntia',
          'monipäiväisellä matkalla päiväraha maksetaan jokaiselta täydeltä 24 tunnin matkavuorokaudelta; viimeiseltä vajaalta matkavuorokaudelta voi maksaa 25 €, kun se ylittää täyden vuorokauden vähintään 2 tunnilla, ja 54 €, kun ylitys on yli 6 tuntia.',
        ] },
        { t: 'p', x: 'Lisäksi on täytyttävä etäisyysehto: työntekemispaikan on oltava yli 15 kilometrin päässä siitä paikasta, josta matka alkaa (koti tai varsinainen työpaikka), ja aina yli 5 kilometrin päässä sekä kodista että varsinaisesta työpaikasta. Etäisyys lasketaan lyhintä käytettävissä olevaa reittiä pitkin. Kunnan rajaa ei tarvitse ylittää.' },
        { t: 'p', x: 'Ilmaiset ateriat pienentävät päivärahaa. Osapäiväraha puolitetaan jo yhdestä ilmaisesta ateriasta, kokopäiväraha vasta kahdesta. Ilmaisella aterialla tarkoitetaan esimerkiksi työnantajan tarjoamaa tai matkalipun tai kurssin hintaan sisältyvää ateriaa. Hotellihuoneen hintaan sisältyvä aamiainen ei puolita päivärahaa.' },
        { t: 'p', x: 'Esimerkki: työmatka alkaa maanantaina kello 8.00 ja päättyy torstaina kello 9.00. Matka kestää 73 tuntia eli kolme täyttä matkavuorokautta, eikä ylimääräinen tunti oikeuta lisäpäivärahaan. Verovapaata päivärahaa voi maksaa 3 × 54 € = 162 €.' },
        { t: 'h2', x: 'Ulkomaanpäiväraha' },
        { t: 'p', x: 'Ulkomaan työmatkoille Verohallinto vahvistaa maakohtaiset päivärahat. Ne toimivat samalla periaatteella kuin kotimaan päiväraha, mutta muutamin erityissäännöin:' },
        { t: 'ul', items: [
          'Ulkomaanpäivärahaan on oikeus, jos työmatka kestää kokonaisuudessaan vähintään 10 tuntia. Lyhyemmästä matkasta maksetaan kotimaan päiväraha.',
          'Määrä ratkaistaan sen maan mukaan, jossa matkavuorokausi päättyy. Jos vuorokausi päättyy laivalla tai lentokoneessa, ratkaisee maa, josta kulkuneuvo on viimeksi lähtenyt tai jonne se Suomesta lähdettäessä ensiksi saapuu.',
          'Suomeen palattaessa viimeisestä ulkomailla päättyneestä täydestä matkavuorokaudesta yli 2 tuntia ylittävältä ajalta saa puolet ja yli 10 tuntia ylittävältä ajalta koko viimeksi maksetun ulkomaanpäivärahan.',
          'Kaksi ilmaista ateriaa vuorokaudessa puolittaa ulkomaanpäivärahan.',
        ] },
        { t: 'note', x: 'Maakohtaiset määrät ovat Verohallinnon päätöksen 13 §:ssä. Esimerkiksi vuonna 2026 Viron päiväraha on 82 €, Ruotsin 70 €, ja maissa, joita ei ole mainittu erikseen, 52 €. Tarkista kohdemaan määrä aina päätöksestä ennen matkalaskun laatimista.' },
        { t: 'h2', x: 'Ateriakorvaus' },
        { t: 'p', x: 'Jos työmatkasta ei makseta päivärahaa, esimerkiksi koska aika- tai etäisyysehto ei täyty, työnantaja voi maksaa verovapaan ateriakorvauksen. Edellytyksenä on, ettei työntekijä työn vuoksi pääse syömään ruokailutauolla tavanomaisessa ruokailupaikassaan. Vuonna 2026 ateriakorvaus on enintään 13,50 €. Jos työntekijä joutuu syömään kahdesti tavanomaisen ruokailupaikkansa ulkopuolella, enimmäismäärä on 27,00 €; käytännössä tämä edellyttää, että työpäivä ruokailutauot mukaan lukien on yli 11 tuntia. Samalta matkalta ei makseta sekä päivärahaa että ateriakorvausta.' },
        { t: 'h2', x: 'Yömatkaraha ja majoittumiskorvaus' },
        { t: 'p', x: 'Majoituksen työnantaja voi korvata verovapaasti hotellilaskun tai muun luotettavan selvityksen mukaan. Jos työntekijä järjestää yöpymisen itse ilman kustannuksia työnantajalle, esimerkiksi sukulaisten luona tai omassa asuntovaunussa, päivärahan lisäksi voi maksaa yömatkarahaa, enintään 16 € vuonna 2026. Ehtona on, että päivärahaan oikeuttavasta matkavuorokaudesta vähintään 4 tuntia osuu kello 21.00–7.00 väliin eikä työnantaja ole maksanut majoitusta, hyttiä tai makuupaikkaa. Yötyöstä yömatkarahaa ei voi maksaa verovapaasti.' },
        { t: 'h2', x: 'Matkalasku ja ajopäiväkirja: näin korvaus pysyy verovapaana' },
        { t: 'p', x: 'Verovapaus edellyttää, että korvaukset maksetaan työntekijän laatiman matkalaskun perusteella. Matkalasku voi olla myös sähköinen, kunhan siinä on vaaditut tiedot.' },
        { t: 'h3', x: 'Mitä matkalaskussa pitää olla?' },
        { t: 'ul', items: [
          'matkan tarkoitus ja kohde (osoite)',
          'tarvittaessa matkareitti',
          'matkustamistapa eli kulkuneuvo',
          'matkan alkamis- ja päättymisajankohdat päivämäärineen ja kellonaikoineen',
          'ulkomaanmatkoista maa tai alue, jossa kukin matkavuorokausi päättyi',
          'kilometrikorvauksesta lisäksi ajetut kilometrit ja käytetty yksikköhinta.',
        ] },
        { t: 'p', x: 'Liitteiksi tulevat hotellilaskut, matkaliput ja muut tositteet. Kuluista, joista ei saa tositetta (esimerkiksi osa pysäköintimaksuista), työntekijä vakuuttaa määrän allekirjoituksellaan; sähköinen allekirjoitus käy. Työntekijän on itse ilmoitettava matkalaskussa ilmaiset ateriat, esimerkiksi asiakkaan tarjoama lounas.' },
        { t: 'h3', x: 'Mitä ajopäiväkirjaan merkitään?' },
        { t: 'p', x: 'Ajopäiväkirjalla tai muulla luotettavalla selvityksellä osoitetaan, mitkä ajot ovat työ- tai liikeajoja. Verohallinnon ohjeen mukaan siihen merkitään jokaisesta ajosta:' },
        { t: 'ul', items: [
          'ajon alkamis- ja päättymisajankohta',
          'alkamis- ja päättymispaikka sekä tarvittaessa reitti',
          'matkan pituus',
          'ajon tarkoitus',
          'matkamittarin lukema ajon alussa ja lopussa',
          'auton käyttäjä',
          'lisäksi autolla vuoden aikana ajettu kokonaiskilometrimäärä.',
        ] },
        { t: 'p', x: 'Pelkät kuukausittaiset yhteiskilometrit eivät riitä. Verohallinnon ohjeen esimerkissä yrittäjän ajopäiväkirjasta puuttuivat yksittäisten ajojen pituudet ja kellonajat, joten valtaosa vähennyksestä hylättiin ja hänelle määrättiin veronkorotus.' },
        { t: 'h2', x: 'Työntekijä, osakeyhtiön omistaja ja toiminimiyrittäjä' },
        { t: 'h3', x: 'Työntekijä' },
        { t: 'p', x: 'Työnantaja maksaa korvaukset matkalaskun perusteella palkan lisäksi tai osana kokonaispalkkaa, jos työsopimuksessa on eritelty, miten kokonaispalkka muodostuu. Verovapaista korvauksista ei toimiteta ennakonpidätystä eikä niistä makseta työnantajan sairausvakuutusmaksua, mutta ne ilmoitetaan tulorekisteriin.' },
        { t: 'h3', x: 'Osakeyhtiön tai henkilöyhtiön omistaja' },
        { t: 'p', x: 'Osakeyhtiön osakas tai henkilöyhtiön vastuunalainen yhtiömies voi saada yhtiöltä verovapaita matkakorvauksia yhtiön asioissa tehdyistä työmatkoista silloinkin, kun hän ei nosta palkkaa. Ehdot ovat samat kuin työntekijällä, ja matkoista on tehtävä matkalasku yhtiön kirjanpitoon. Korvaukset ilmoitetaan tulorekisteriin samoilla tulolajeilla kuin työntekijän korvaukset.' },
        { t: 'h3', x: 'Toiminimiyrittäjä' },
        { t: 'p', x: 'Liikkeen- tai ammatinharjoittaja ei voi maksaa itselleen verovapaata kilometrikorvausta tai päivärahaa, koska hän ei ole itsensä työntekijä. Vastaavan suuruinen hyöty saadaan verotuksessa lisävähennyksenä:' },
        { t: 'ul', items: [
          'Auto: jos liikeajoja on enintään 50 % vuoden kilometreistä, auto kuuluu yksityistalouteen ja liikeajoista saa lisävähennyksen, joka on enintään palkansaajan verovapaan kilometrikorvauksen suuruinen (vuonna 2026 siis 0,55 €/km). Kirjanpidossa vähennetyt autokulut pienentävät lisävähennystä. Jos liikeajoja on yli 50 %, auto kuuluu elinkeinotoimintaan: kulut vähennetään todellisina, ja yksityisajojen osuus lasketaan ajopäiväkirjan kilometrien perusteella.',
          'Päiväraha: tilapäisestä työmatkasta yrityksen tavanomaisen toiminta-alueen ulkopuolelle saa lisävähennyksen, joka on enintään palkansaajan verovapaan päivärahan suuruinen (vuonna 2026 enintään 54 € tai 25 € päivältä). Matkapäivät eritellään veroilmoituksella keston mukaan.',
          'Jos kirjanpitoon merkityt todelliset kulut ovat lisävähennyksen enimmäismäärää suuremmat, vähennetään vain todelliset kulut.',
        ] },
        { t: 'p', x: 'Lisävähennys edellyttää ajopäiväkirjaa tai muuta luotettavaa selvitystä, josta näkyvät päiväkohtaisesti matkojen kohteet, etäisyydet ja kesto. Koti–oma toimipaikka -matkat ovat yksityisajoa, eivät liikeajoa.' },
        { t: 'h2', x: 'Näin korvaukset ilmoitetaan tulorekisteriin' },
        { t: 'p', x: 'Työnantaja ilmoittaa verovapaat korvaukset palkkatietoilmoituksella omilla tulolajeillaan:' },
        { t: 'ul', items: [
          'Ateriakorvaus (303)',
          'Kilometrikorvaus (verovapaa) (311)',
          'Päiväraha (331) – myös ulkomaanpäiväraha',
          'Määräaika: viimeistään maksukuukautta seuraavan kuukauden 5. päivänä. Kuukauden korvaukset voi ilmoittaa yhdellä ilmoituksella, jolloin maksupäiväksi merkitään kuukauden viimeinen maksupäivä.',
          'Ei ilmoiteta: majoittumiskorvausta, matkalippujen korvauksia liikenteenharjoittajan tositteen perusteella eikä yömatkarahaa, kun se on enintään päätöksen mukainen. Ylimenevä yömatkaraha ilmoitetaan tulolajilla Muu maksettu lisä (216).',
          'Veronalaiset matkakorvaukset, esimerkiksi kodin ja työpaikan väliset matkat tai enimmäismäärän ylittävä osa, ovat palkkaa: tulolaji Muu maksettu lisä (216) tai oman auton osalta Kilometrikorvaus (veronalainen) (209). Ne ilmoitetaan viiden päivän kuluessa maksupäivästä.',
        ] },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Vanha kilometrikorvaus. Vuoden 2025 0,59 €/km ei ole enää verovapaa: vuonna 2026 tehdyistä ajoista verovapaata on enintään 0,55 €/km, ja ylimenevä osa on palkkaa.',
          'Korvaus kodin ja työpaikan välisistä matkoista. Se ei ole työmatka, joten korvaus on aina veronalaista palkkaa.',
          'Puutteellinen matkalasku tai ajopäiväkirja. Ilman kellonaikoja, kohdetta ja kilometrejä verovapautta ei voi osoittaa. Jos ehdot eivät täyty, korvaukset ovat palkkaa: niistä maksetaan jälkikäteen verot ja palkan sivukulut, ja lisäksi voi seurata sanktiomaksuja.',
          'Ilmaiset ateriat unohtuvat. Asiakkaan tarjoama lounas puolittaa osapäivärahan, ja kaksi ilmaista ateriaa puolittaa kokopäivärahan.',
          'Ateriakorvaus, vaikka työntekijällä on lounasetu. Jos työnantajan antamaa lounasseteliä tai -korttia voi käyttää myös työmatkalla, ateriakorvaus ei ole verovapaa.',
          'Toiminimiyrittäjä maksaa itselleen päivärahaa. Yrittäjän omat korvaukset hoidetaan lisävähennyksenä verotuksessa, eikä niitä voi kirjata verovapaana palkkana.',
          'Sama työmaa yli kolme vuotta. Kun kolmen vuoden raja ylittyy, paikasta tulee varsinainen työpaikka ja verovapaiden korvausten maksaminen sinne päättyy.',
        ] },
        { t: 'h2', x: 'Apua matkakorvauksiin ja palkanlaskentaan' },
        { t: 'p', x: 'Hoidamme yritysten kirjanpidon ja palkanlaskennan: tarkistamme matkalaskut vuoden 2026 enimmäismääriä vasten, ilmoitamme korvaukset tulorekisteriin oikeilla tulolajeilla ja laskemme toiminimiyrittäjän lisävähennykset veroilmoitukselle. Asiakkaamme voivat pitää ajopäiväkirjaa toimiston Vaavo-sovelluksessa. Palvelemme suomeksi ja venäjäksi – ota yhteyttä, niin käydään yrityksesi tilanne läpi.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: päätös verovapaista matkakustannusten korvauksista vuonna 2026', href: SRC.decisionFi },
          { label: 'Verohallinto: kilometrikorvaus ja päiväraha', href: SRC.allowancesFi },
          { label: 'Verohallinto: syventävä ohje työmatkakustannusten korvauksista verotuksessa', href: SRC.guideFi },
          { label: 'Verohallinto: yrittäjän ajoneuvojen kulut ja ajopäiväkirja', href: SRC.vehicleFi },
          { label: 'Verohallinto: tilapäinen työmatka ja lisävähennys (toiminimi)', href: SRC.tripFi },
          { label: 'Tulorekisteri: kustannusten korvausten ilmoittaminen', href: SRC.incomesFi },
          { label: 'Finlex: tuloverolaki (1535/1992), 71 §', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Paljonko on verovapaa kilometrikorvaus vuonna 2026?', a: 'Oman tai hallinnassa olevan auton verovapaa kilometrikorvaus on enintään 0,55 €/km (vuonna 2025 0,59 €/km). Perusmäärää korotetaan esimerkiksi 4 senttiä/km jokaisesta työasioissa mukana olevasta matkustajasta ja 9 senttiä/km perävaunusta.' },
        { q: 'Paljonko on päiväraha vuonna 2026?', a: 'Kotimaan osapäiväraha on enintään 25 € yli 6 tunnin ja kokopäiväraha enintään 54 € yli 10 tunnin työmatkalta. Lisäksi työntekemispaikan on oltava yli 15 km:n päässä lähtöpaikasta ja yli 5 km:n päässä sekä kodista että varsinaisesta työpaikasta. Ulkomaanpäivärahat ovat maakohtaisia.' },
        { q: 'Voiko toiminimiyrittäjä maksaa itselleen kilometrikorvausta?', a: 'Ei. Liikkeen- tai ammatinharjoittaja ei voi maksaa itselleen verovapaita korvauksia, mutta hän voi tehdä verotuksessa vastaavan suuruisen lisävähennyksen: yksityisautolla tehdyistä liikeajoista enintään 0,55 €/km ja tilapäisistä työmatkoista enintään päivärahan suuruisen määrän. Ajopäiväkirja on edellytys.' },
        { q: 'Mitä ajopäiväkirjaan pitää merkitä?', a: 'Jokaisesta ajosta alkamis- ja päättymisaika, alku- ja loppupaikka sekä tarvittaessa reitti, matkan pituus, tarkoitus, matkamittarin lukemat ja auton käyttäjä sekä koko vuoden ajokilometrit. Pelkät kuukausisummat eivät riitä.' },
        { q: 'Ilmoitetaanko verovapaat matkakorvaukset tulorekisteriin?', a: 'Kyllä. Päivärahat ilmoitetaan tulolajilla 331, verovapaat kilometrikorvaukset tulolajilla 311 ja ateriakorvaukset tulolajilla 303, viimeistään maksukuukautta seuraavan kuukauden 5. päivänä. Majoittumiskorvausta ja enimmäismäärän mukaista yömatkarahaa ei ilmoiteta.' },
      ],
    },
    ru: {
      title: 'Километровые, суточные и компенсация питания в Финляндии в 2026 году',
      description:
        'Необлагаемые компенсации поездок в Финляндии в 2026 году: 0,55 €/км, суточные 54 € и 25 €, питание 13,50 €. Условия, отчёт о поездке, журнал и Tulorekisteri.',
      lead: 'Работодатель в Финляндии может компенсировать работнику расходы на служебную поездку без налога, если поездка отвечает налоговым условиям, а суммы не превышают максимумы из ежегодного решения налоговой (Verohallinto). В 2026 году километровая компенсация за личный автомобиль снизилась до 0,55 € за километр, а суточные выросли. Разбираем ставки 2026 года, условия, требования к отчёту о поездке и журналу поездок, отличия для toiminimi и порядок подачи сведений в Tulorekisteri.',
      body: [
        { t: 'h2', x: 'Что такое необлагаемые компенсации поездок?' },
        { t: 'p', x: 'По § 71 закона о подоходном налоге (tuloverolaki) налогооблагаемым доходом не считаются полученные от работодателя за служебную поездку компенсация транспортных расходов, суточные (päiväraha), компенсация питания (ateriakorvaus) и компенсация проживания. Перечень закрытый: всё остальное — зарплата. Налоговая ежегодно утверждает максимальные суммы, которые можно выплатить без налога. Решение на 2026 год (VH/6575/00.01.00/2025) применяется к поездкам или их частям, совершённым в 2026 году.' },
        { t: 'p', x: 'Максимумы — это верхняя граница, а не обязанность. Сколько платить на самом деле, определяют коллективный (TES) и трудовой договоры. Если работодатель платит больше, чем позволяет решение, превышение облагается налогом как зарплата.' },
        { t: 'h2', x: 'Когда поездка считается служебной?' },
        { t: 'p', x: 'Служебная поездка (työmatka) — это временная поездка по работе в особое место выполнения работы за пределами основного рабочего места: к клиенту, на выставку, обучение или встречу. Необлагаемые компенсации можно платить только работнику, то есть между плательщиком и получателем должны быть трудовые отношения (исключения, например для владельца компании, — ниже).' },
        { t: 'ul', items: [
          'Дорога из дома на основное место работы и обратно — не служебная поездка. Компенсация за неё — зарплата.',
          'Поездки в свободное время и по личным делам — не служебные. Если к командировке добавлены выходные для отдыха, суточные за эти дни без налога не платятся.',
          'Работа на одном и том же объекте считается временной не дольше трёх лет. После этого объект становится основным местом работы, и необлагаемые суточные, километровые, компенсации питания и проживания за поездки туда больше не платятся.',
        ] },
        { t: 'h2', x: 'Километровая компенсация (kilometrikorvaus) в 2026 году' },
        { t: 'p', x: 'Если работник едет в служебную поездку на своём автомобиле или на машине, которой он распоряжается (например, машине члена семьи), необлагаемая километровая компенсация в 2026 году — не больше 55 центов за километр. В 2025 году было 59 центов, то есть ставка снизилась. Базовую ставку можно увеличить:' },
        { t: 'ul', items: [
          'на 4 цента/км за каждого пассажира, перевозка которого — дело работодателя',
          'на 9 центов/км, если к машине прицеплен прицеп',
          'на 15 центов/км, если работа требует буксировать жилой прицеп',
          'на 28 центов/км, если работа требует буксировать бытовку или подобный тяжёлый груз',
          'на 4 цента/км, если в машине перевозятся станки или предметы тяжелее 80 кг или крупные по размеру',
          'на 4 цента/км, если работник по работе возит собаку',
          'на 12 центов/км за километры по лесовозной дороге или закрытой для движения дорожной стройке.',
        ] },
        { t: 'p', x: 'Каждая надбавка применяется к километру только один раз; от числа людей зависит лишь надбавка за пассажиров. Для мотоцикла максимум — 42 цента/км, для велосипеда или электровелосипеда — 13 центов/км. Если у работника есть от работодателя полное автомобильное пособие (vapaa autoetu), необлагаемую километровую компенсацию за поездки на этой машине платить нельзя. Водителю машины с ограниченным пособием (käyttöetu), который сам платит за топливо, можно возместить не больше 11 центов/км.' },
        { t: 'p', x: 'Пример: работник едет на своей машине к клиенту и обратно — всего 300 км — и берёт с собой коллегу. Необлагаемая компенсация: 300 × (0,55 + 0,04) = 177 €.' },
        { t: 'h2', x: 'Суточные по Финляндии в 2026 году' },
        { t: 'p', x: 'Суточные (päiväraha) покрывают дополнительные расходы на питание и другие бытовые нужды в поездке, но не проезд и не гостиницу. Максимумы 2026 года:' },
        { t: 'ul', items: [
          'частичные суточные (osapäiväraha) — 25 €, если поездка длится больше 6 часов',
          'полные суточные (kokopäiväraha) — 54 €, если поездка длится больше 10 часов',
          'в многодневной поездке суточные платятся за каждые полные 24 часа (matkavuorokausi); за последний неполный отрезок — 25 €, если он превышает последние полные сутки как минимум на 2 часа, и 54 €, если больше чем на 6 часов.',
        ] },
        { t: 'p', x: 'Кроме того, нужно условие расстояния: место работы должно быть дальше 15 км от точки, откуда начинается поездка (дом или основное место работы), и в любом случае дальше 5 км и от дома, и от основного места работы. Расстояние считают по кратчайшему доступному маршруту. Пересекать границу муниципалитета не обязательно.' },
        { t: 'p', x: 'Бесплатное питание уменьшает суточные. Частичные суточные делятся пополам уже из-за одного бесплатного приёма пищи, полные — из-за двух. Бесплатный приём пищи — это, например, обед за счёт работодателя или включённый в стоимость билета или курса. Завтрак, входящий в цену гостиничного номера, суточные не уменьшает.' },
        { t: 'p', x: 'Пример: поездка начинается в понедельник в 8:00 и заканчивается в четверг в 9:00. Она длится 73 часа — три полных matkavuorokausi, а лишний час права на дополнительные суточные не даёт. Без налога можно выплатить 3 × 54 € = 162 €.' },
        { t: 'h2', x: 'Заграничные суточные (ulkomaanpäiväraha)' },
        { t: 'p', x: 'Для поездок за границу налоговая утверждает суточные по странам. Принцип тот же, что и в Финляндии, но с особыми правилами:' },
        { t: 'ul', items: [
          'Право на заграничные суточные есть, если поездка в целом длится не меньше 10 часов. За более короткую поездку платят суточные по Финляндии.',
          'Сумма зависит от страны, где заканчиваются очередные сутки поездки. Если они заканчиваются на борту судна или самолёта — от страны, откуда транспорт отправился последним или куда он прибывает первым при выезде из Финляндии.',
          'При возвращении в Финляндию за время сверх последних полных суток за границей платят половину последних заграничных суточных, если превышение больше 2 часов, и полную сумму — если больше 10 часов.',
          'Два бесплатных приёма пищи за сутки уменьшают заграничные суточные вдвое.',
        ] },
        { t: 'note', x: 'Суммы по странам приведены в § 13 решения налоговой. Например, в 2026 году суточные для Эстонии — 82 €, для Швеции — 70 €, а для стран, не указанных отдельно, — 52 €. Перед составлением отчёта о поездке всегда сверяйте ставку для своей страны по решению.' },
        { t: 'h2', x: 'Компенсация питания (ateriakorvaus)' },
        { t: 'p', x: 'Если за поездку суточные не платятся — например, не выполняется условие по времени или расстоянию, — работодатель может выплатить необлагаемую компенсацию питания. Условие: из-за работы человек не может пообедать в перерыв там, где обычно ест. В 2026 году компенсация — не больше 13,50 €. Если приходится есть вне обычного места дважды, максимум — 27,00 €; на практике это возможно, когда рабочий день вместе с перерывами длится больше 11 часов. За одну поездку нельзя получить и суточные, и компенсацию питания.' },
        { t: 'h2', x: 'Ночные (yömatkaraha) и компенсация проживания' },
        { t: 'p', x: 'Гостиницу работодатель возмещает без налога по счёту или другому надёжному подтверждению. Если работник сам находит ночлег без затрат для работодателя — у родственников или в собственном жилом прицепе, — к суточным можно добавить ночные, в 2026 году не больше 16 €. Условие: не меньше 4 часов суток, дающих право на суточные, приходятся на время с 21:00 до 7:00, и работодатель не оплатил жильё, каюту или спальное место. За ночную работу ночные без налога не платятся.' },
        { t: 'h2', x: 'Отчёт о поездке и журнал поездок: без них налоговой льготы нет' },
        { t: 'p', x: 'Компенсации освобождены от налога, только если выплачены на основании отчёта о поездке (matkalasku), который составил работник. Отчёт может быть электронным, если в нём есть все обязательные данные.' },
        { t: 'h3', x: 'Что должно быть в отчёте о поездке?' },
        { t: 'ul', items: [
          'цель и место назначения поездки (адрес)',
          'при необходимости маршрут',
          'способ передвижения (транспортное средство)',
          'даты и время начала и окончания поездки',
          'для заграничных поездок — страна или регион, где закончились каждые сутки',
          'для километровой компенсации — пройденные километры и применённая ставка.',
        ] },
        { t: 'p', x: 'К отчёту прикладывают гостиничные счета, билеты и другие подтверждения. Если на расход нет чека (например, некоторые парковки), работник подтверждает сумму подписью; электронная подпись тоже подходит. Бесплатное питание, например обед за счёт клиента, работник должен указать в отчёте сам.' },
        { t: 'h3', x: 'Что записывать в журнал поездок (ajopäiväkirja)?' },
        { t: 'p', x: 'Журнал поездок или другое надёжное подтверждение показывает, какие поездки служебные или деловые. По инструкции налоговой для каждой поездки записывают:' },
        { t: 'ul', items: [
          'время начала и окончания',
          'место начала и окончания, при необходимости маршрут',
          'расстояние',
          'цель поездки',
          'показания одометра в начале и в конце',
          'кто был за рулём',
          'а также общий пробег автомобиля за год.',
        ] },
        { t: 'p', x: 'Одних месячных итогов недостаточно. В примере из инструкции налоговой в журнале предпринимателя не было длины отдельных поездок и времени — большую часть вычета отклонили и начислили штрафную надбавку к налогу (veronkorotus).' },
        { t: 'h2', x: 'Работник, владелец osakeyhtiö и toiminimi' },
        { t: 'h3', x: 'Работник' },
        { t: 'p', x: 'Работодатель выплачивает компенсации по отчёту о поездке сверх зарплаты или в составе общей зарплаты, если в трудовом договоре расписано, из чего она складывается. С необлагаемых компенсаций не удерживают налог и не платят взнос работодателя на медицинское страхование, но они подаются в Tulorekisteri.' },
        { t: 'h3', x: 'Владелец osakeyhtiö или товарищества' },
        { t: 'p', x: 'Акционер osakeyhtiö или полный товарищ товарищества (ay, ky) может получать от компании необлагаемые компенсации за служебные поездки по делам компании, даже если не берёт зарплату. Условия те же, что у работника, и на поездки нужно составить отчёт для бухгалтерии компании. В Tulorekisteri их подают с теми же кодами дохода, что и у работников.' },
        { t: 'h3', x: 'Индивидуальный предприниматель (toiminimi)' },
        { t: 'p', x: 'Предприниматель с toiminimi не может платить себе необлагаемые километровые или суточные — он не работник сам у себя. Ту же выгоду он получает в налогообложении как дополнительный вычет (lisävähennys):' },
        { t: 'ul', items: [
          'Автомобиль: если деловые поездки — не больше 50 % пробега за год, машина считается личной, и за деловые километры полагается вычет не больше необлагаемой километровой ставки работника (в 2026 году — 0,55 €/км). Расходы на машину, уже учтённые в бухгалтерии, уменьшают вычет. Если деловых поездок больше 50 %, машина относится к бизнесу: расходы вычитаются фактические, а доля личных поездок рассчитывается по километрам из журнала.',
          'Суточные: за временную поездку за пределы обычной зоны деятельности фирмы полагается вычет не больше необлагаемых суточных работника (в 2026 году до 54 € или 25 € в день). Дни поездок указывают в декларации по продолжительности.',
          'Если фактические расходы в бухгалтерии больше максимального вычета, вычитаются только фактические расходы.',
        ] },
        { t: 'p', x: 'Для вычета нужен журнал поездок или другое надёжное подтверждение, где по дням видно места назначения, расстояния и продолжительность. Поездки из дома в собственный офис или мастерскую — личные, а не деловые.' },
        { t: 'h2', x: 'Как компенсации подаются в Tulorekisteri' },
        { t: 'p', x: 'Работодатель указывает необлагаемые компенсации в отчёте о зарплате под отдельными кодами дохода (tulolaji):' },
        { t: 'ul', items: [
          'Ateriakorvaus (303) — компенсация питания',
          'Kilometrikorvaus (verovapaa) (311) — необлагаемые километровые',
          'Päiväraha (331) — суточные, в том числе заграничные',
          'Срок: не позднее 5-го числа месяца, следующего за месяцем выплаты. Выплаты за месяц можно подать одним отчётом, указав последнюю дату выплаты в этом месяце.',
          'Не подаются: компенсация проживания, возмещение билетов по документу перевозчика и ночные в пределах максимума. Превышение ночных подаётся с кодом Muu maksettu lisä (216).',
          'Облагаемые компенсации поездок — например, дорога дом–работа или превышение максимума — это зарплата: код Muu maksettu lisä (216), для личного автомобиля — Kilometrikorvaus (veronalainen) (209). Их подают в течение пяти дней с даты выплаты.',
        ] },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Старая ставка. 0,59 €/км из 2025 года больше не освобождена от налога: за поездки 2026 года без налога — не больше 0,55 €/км, превышение — зарплата.',
          'Компенсация дороги дом–работа. Это не служебная поездка, поэтому компенсация всегда облагается как зарплата.',
          'Неполный отчёт или журнал. Без времени, места назначения и километров освобождение от налога не доказать. Если условия не выполнены, компенсации считаются зарплатой: задним числом доплачиваются налоги и обязательные взносы, возможны и санкции.',
          'Забытое бесплатное питание. Обед за счёт клиента уменьшает вдвое частичные суточные, два бесплатных приёма пищи — полные.',
          'Компенсация питания при обеденном пособии. Если ваучером или картой на обед от работодателя можно расплатиться и в поездке, компенсация питания облагается налогом.',
          'Предприниматель с toiminimi платит себе суточные. Собственные расходы предпринимателя учитываются через дополнительный вычет в декларации, а не как необлагаемая выплата.',
          'Один объект дольше трёх лет. После трёх лет объект становится основным местом работы, и необлагаемые компенсации за поездки туда прекращаются.',
        ] },
        { t: 'h2', x: 'Поможем с компенсациями поездок и зарплатой' },
        { t: 'p', x: 'Ведём бухгалтерию и расчёт зарплаты: проверяем отчёты о поездках по ставкам 2026 года, подаём компенсации в Tulorekisteri с правильными кодами и рассчитываем дополнительные вычеты предпринимателя для декларации. Журнал поездок наши клиенты могут вести в приложении бюро Vaavo. Работаем на русском и финском — напишите нам, и мы разберём ситуацию вашей компании.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: решение о необлагаемых компенсациях поездок на 2026 год (на английском)', href: SRC.decisionEn },
          { label: 'Vero: километровые и суточные (на английском)', href: SRC.allowancesEn },
          { label: 'Vero: подробная инструкция о компенсациях служебных поездок (на финском)', href: SRC.guideFi },
          { label: 'Vero: расходы предпринимателя на автомобиль и журнал поездок (на английском)', href: SRC.vehicleEn },
          { label: 'Vero: временная поездка и дополнительный вычет для toiminimi (на английском)', href: SRC.tripEn },
          { label: 'Tulorekisteri: как подавать компенсации расходов (на английском)', href: SRC.incomesEn },
          { label: 'Finlex: закон о подоходном налоге — tuloverolaki (на финском)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Какая необлагаемая километровая компенсация в Финляндии в 2026 году?', a: 'За личный автомобиль или машину в вашем распоряжении — не больше 0,55 €/км (в 2025 году было 0,59 €/км). Ставка растёт, например, на 4 цента/км за каждого пассажира по делам работодателя и на 9 центов/км за прицеп.' },
        { q: 'Какие суточные в 2026 году?', a: 'По Финляндии частичные суточные — до 25 € за поездку длиннее 6 часов, полные — до 54 € за поездку длиннее 10 часов. Место работы должно быть дальше 15 км от точки отправления и дальше 5 км и от дома, и от основного места работы. Заграничные суточные зависят от страны.' },
        { q: 'Может ли предприниматель с toiminimi платить себе километровые?', a: 'Нет. Необлагаемые компенсации платят только работникам. Предприниматель вместо этого делает дополнительный вычет в декларации: за деловые поездки на личной машине до 0,55 €/км и за временные поездки — в размере суточных. Обязательное условие — журнал поездок.' },
        { q: 'Что записывать в журнал поездок?', a: 'Для каждой поездки — время начала и окончания, откуда и куда, при необходимости маршрут, расстояние, цель, показания одометра и кто был за рулём, а также общий пробег за год. Одних месячных итогов недостаточно.' },
        { q: 'Нужно ли подавать необлагаемые компенсации в Tulorekisteri?', a: 'Да. Суточные — с кодом 331, необлагаемые километровые — 311, компенсация питания — 303, не позднее 5-го числа месяца после выплаты. Компенсацию проживания и ночные в пределах максимума не подают.' },
      ],
    },
    en: {
      title: 'Kilometre Allowance, Per Diem and Meal Allowance in Finland 2026',
      description:
        'Tax-free travel allowances in Finland 2026: €0.55/km, per diems of €54 and €25, meal allowance €13.50. Conditions, travel claims, logbook and Incomes Register.',
      lead: 'In Finland an employer can reimburse an employee’s business travel tax-free, provided the trip meets the tax definition of a business trip and the payments stay within the maximums of the Tax Administration’s annual decision. For 2026 the own-car kilometre allowance fell to €0.55 per kilometre, while per diems went up. Here are the 2026 amounts, the conditions, what a travel expense claim and a driving log must contain, how sole traders differ, and how employers report the allowances to the Incomes Register.',
      body: [
        { t: 'h2', x: 'What are tax-free travel allowances?' },
        { t: 'p', x: 'Under section 71 of the Income Tax Act (tuloverolaki), travel cost reimbursements, per diem allowances, meal allowances and accommodation reimbursements received from an employer for a business trip are not taxable income. The list is exhaustive: anything else is salary. Each year the Tax Administration (Verohallinto) sets the maximum amounts that can be paid tax-free. The 2026 decision (VH/6575/00.01.00/2025) applies to business trips, or parts of them, made in 2026.' },
        { t: 'p', x: 'The maximums are ceilings, not obligations. What the employer actually pays depends on the collective agreement and the employment contract. If the employer pays more than the decision allows, the excess is taxable salary for the employee.' },
        { t: 'h2', x: 'When is a trip a business trip for tax purposes?' },
        { t: 'p', x: 'A business trip (työmatka) is a temporary trip made for work to a special place of work outside the employee’s regular workplace – a client site, a trade fair, a training course or a meeting. Tax-free allowances can only be paid to an employee, so there must be an employment relationship between payer and recipient (exceptions, such as a company owner, are covered below).' },
        { t: 'ul', items: [
          'Commuting between home and the regular workplace is not a business trip. Reimbursing it is salary.',
          'Leisure travel and private errands are not business trips. If days off are added to a work trip, no tax-free per diem can be paid for them.',
          'Working at the same place of work counts as temporary for at most three years. After that the site becomes the regular workplace, and trips there no longer qualify for tax-free per diems, kilometre allowances, meal allowances or accommodation reimbursements.',
        ] },
        { t: 'h2', x: 'Kilometre allowance 2026' },
        { t: 'p', x: 'When an employee makes a business trip in their own car, or a car at their disposal (for example a family member’s), the tax-free kilometre allowance for 2026 is at most 55 cents per kilometre. In 2025 it was 59 cents, so the rate has gone down. The base rate can be increased by:' },
        { t: 'ul', items: [
          '4 cents/km for each passenger whose transport is the employer’s business',
          '9 cents/km when a trailer is attached to the car',
          '15 cents/km when the work requires towing a caravan',
          '28 cents/km when the work requires towing a site hut or a similar heavy load',
          '4 cents/km for carrying machinery or items heavier than 80 kg or of large size',
          '4 cents/km when the employee carries a dog because of their work',
          '12 cents/km for the kilometres driven on forest roads or road construction sites closed to other traffic.',
        ] },
        { t: 'p', x: 'Each increase applies only once per kilometre; only the passenger increase grows with the number of people. The maximum for a motorcycle is 42 cents/km and for a bicycle or e-bike 13 cents/km. An employee with a full car benefit (vapaa autoetu) from the employer cannot be paid a tax-free kilometre allowance for driving that car. A driver with a limited car benefit (käyttöetu) who pays for the fuel can be reimbursed at most 11 cents/km.' },
        { t: 'p', x: 'Example: an employee drives their own car to a client and back, 300 km in total, with a colleague as a passenger. The tax-free kilometre allowance is 300 × (0.55 + 0.04) = €177.' },
        { t: 'h2', x: 'Domestic per diem 2026' },
        { t: 'p', x: 'A per diem (päiväraha) covers the extra cost of meals and other living expenses caused by a business trip. It does not include travel or accommodation. The 2026 maximums are:' },
        { t: 'ul', items: [
          'partial per diem (osapäiväraha) €25 for a trip lasting more than 6 hours',
          'full per diem (kokopäiväraha) €54 for a trip lasting more than 10 hours',
          'on longer trips a per diem is paid for each 24-hour travel day (matkavuorokausi); for the final incomplete period €25 if it exceeds the last full day by at least 2 hours, and €54 if by more than 6 hours.',
        ] },
        { t: 'p', x: 'A distance condition must also be met: the place of work must be more than 15 km from where the trip starts (home or the regular workplace) and, in every case, more than 5 km from both the home and the regular workplace. The distance is measured along the shortest available route. Crossing a municipal border is not required.' },
        { t: 'p', x: 'Free meals reduce the per diem. A partial per diem is halved by just one free meal, a full per diem by two. A free meal means, for example, a meal paid for by the employer or included in the price of a ticket or a course. Breakfast included in the hotel room rate does not halve the per diem.' },
        { t: 'p', x: 'Example: a trip starts on Monday at 8:00 and ends on Thursday at 9:00. It lasts 73 hours – three full travel days – and the one extra hour does not qualify for another per diem. The employer can pay 3 × €54 = €162 tax-free.' },
        { t: 'h2', x: 'Foreign per diem' },
        { t: 'p', x: 'For trips abroad the Tax Administration sets country-specific per diems. They work on the same principle as the domestic per diem, with a few special rules:' },
        { t: 'ul', items: [
          'The foreign per diem applies if the trip as a whole lasts at least 10 hours. A shorter trip is paid at the domestic rates.',
          'The amount depends on the country where each travel day ends. If it ends on a ship or aircraft, the country it last departed from – or, when leaving Finland, the country where it first arrives – decides.',
          'On returning to Finland, time beyond the last full travel day abroad earns half of the last foreign per diem if it exceeds 2 hours, and the full amount if it exceeds 10 hours.',
          'Two free meals in a travel day halve the foreign per diem.',
        ] },
        { t: 'note', x: 'The country amounts are in section 13 of the Tax Administration’s decision. For example, the 2026 per diem for Estonia is €82, for Sweden €70, and for countries not listed separately €52. Always check the rate for the destination in the decision before preparing the travel claim.' },
        { t: 'h2', x: 'Meal allowance' },
        { t: 'p', x: 'If no per diem is paid for a trip – for example because the time or distance condition is not met – the employer can pay a tax-free meal allowance. The condition is that, because of the work, the employee cannot eat at their usual eating place during the meal break. For 2026 the meal allowance is at most €13.50. If the employee has to eat twice outside their usual eating place, the maximum is €27.00; in practice this requires a working day of more than 11 hours including breaks. A per diem and a meal allowance cannot both be paid for the same trip.' },
        { t: 'h2', x: 'Night travel allowance and accommodation' },
        { t: 'p', x: 'The employer can reimburse accommodation tax-free against a hotel invoice or other reliable evidence. If the employee arranges their own overnight stay at no cost to the employer – with relatives or in their own caravan, for instance – a night travel allowance (yömatkaraha) of up to €16 in 2026 can be paid on top of the per diem. At least 4 hours of a travel day that qualifies for a per diem must fall between 21:00 and 7:00, and the employer must not have paid for accommodation, a cabin or a sleeper berth. Night work does not qualify for a tax-free night travel allowance.' },
        { t: 'h2', x: 'Travel claim and driving log: what keeps the allowances tax-free' },
        { t: 'p', x: 'The allowances are tax-free only if they are paid on the basis of a travel expense claim (matkalasku) prepared by the employee. The claim can be electronic as long as it contains the required information.' },
        { t: 'h3', x: 'What must a travel expense claim contain?' },
        { t: 'ul', items: [
          'the purpose and destination of the trip (address)',
          'the route, where needed',
          'the means of transport',
          'the start and end of the trip, with dates and times',
          'for trips abroad, the country or area where each travel day ended',
          'for kilometre allowances, also the kilometres driven and the rate used.',
        ] },
        { t: 'p', x: 'Hotel invoices, tickets and other receipts are attached. For costs with no receipt (some parking fees, for example) the employee confirms the amount by signing the claim; an electronic signature is fine. The employee must report free meals, such as a lunch offered by a client, on the claim themselves.' },
        { t: 'h3', x: 'What goes into a driving log?' },
        { t: 'p', x: 'A driving log (ajopäiväkirja) or other reliable record shows which drives are business drives. According to the Tax Administration, each drive should record:' },
        { t: 'ul', items: [
          'the start and end time',
          'the start and end point and, where needed, the route',
          'the distance',
          'the purpose of the drive',
          'the odometer reading at the start and end',
          'the driver',
          'and the car’s total kilometres for the year.',
        ] },
        { t: 'p', x: 'Monthly totals alone are not enough. In an example in the Tax Administration’s guidance, an entrepreneur’s log lacked the length and times of individual drives, so most of the deduction was refused and a tax increase (veronkorotus) was imposed.' },
        { t: 'h2', x: 'Employee, company owner and sole trader' },
        { t: 'h3', x: 'Employee' },
        { t: 'p', x: 'The employer pays the allowances on the basis of the travel claim, either on top of salary or within a total-pay arrangement if the employment contract specifies how the total pay is made up. No tax is withheld from tax-free allowances and no employer’s health insurance contribution is due on them, but they are reported to the Incomes Register.' },
        { t: 'h3', x: 'Owner of a limited company or partnership' },
        { t: 'p', x: 'A shareholder of an osakeyhtiö or a liable partner of a partnership can receive tax-free travel allowances from the company for business trips made on its behalf, even without drawing a salary. The conditions are the same as for employees, and a travel claim must be prepared for the company’s bookkeeping. The allowances are reported to the Incomes Register with the same income types as employees’.' },
        { t: 'h3', x: 'Sole trader (toiminimi)' },
        { t: 'p', x: 'A sole trader cannot pay themselves a tax-free kilometre allowance or per diem, because they are not their own employee. The equivalent benefit comes as an additional deduction (lisävähennys) in their taxation:' },
        { t: 'ul', items: [
          'Car: if business drives make up 50% or less of the year’s kilometres, the car belongs to private assets and business drives earn a deduction of up to the employee’s tax-free kilometre allowance (€0.55/km in 2026). Car costs already deducted in the books reduce it. If business drives exceed 50%, the car is a business asset: actual costs are deducted and the private share is calculated from the kilometres in the driving log.',
          'Per diem: a temporary business trip outside the business’s usual area of operation earns a deduction of up to the employee’s tax-free per diem (up to €54 or €25 a day in 2026). Travel days are itemised by duration in the tax return.',
          'If actual costs entered in the books exceed the maximum deduction, only the actual costs are deducted.',
        ] },
        { t: 'p', x: 'The deduction requires a driving log or other reliable record showing, day by day, the destinations, distances and duration of the trips. Trips between home and your own business premises are private driving, not business drives.' },
        { t: 'h2', x: 'Reporting to the Incomes Register' },
        { t: 'p', x: 'The employer reports tax-free allowances on the earnings payment report under their own income types:' },
        { t: 'ul', items: [
          'Meal allowance (303)',
          'Kilometre allowance (tax-exempt) (311)',
          'Daily allowance (331) – including foreign per diems',
          'Deadline: by the 5th day of the month following the payment month. A month’s allowances can be reported in one report, with the month’s last payment date as the payment date.',
          'Not reported: accommodation reimbursements, ticket reimbursements based on a carrier’s receipt, and night travel allowances within the maximum. The part of a night travel allowance above the maximum is reported as Other compensation (216).',
          'Taxable travel reimbursements – commuting, or the part above the maximum – are salary: income type Other compensation (216), or for an own car Kilometre allowance (taxable) (209). They are reported within five days of the payment date.',
        ] },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'Using last year’s rate. The 2025 rate of €0.59/km is no longer tax-free: for 2026 driving the maximum is €0.55/km, and anything above it is salary.',
          'Reimbursing commuting. It is not a business trip, so the payment is always taxable salary.',
          'An incomplete travel claim or log. Without times, destinations and kilometres the tax exemption cannot be shown. If the conditions are not met, the allowances are salary: taxes and statutory employer contributions are paid afterwards, and penalties may follow.',
          'Forgetting free meals. A lunch paid by a client halves the partial per diem; two free meals halve the full per diem.',
          'A meal allowance on top of a lunch benefit. If the employer’s lunch voucher or card can also be used on the trip, the meal allowance is not tax-free.',
          'A sole trader paying themselves per diems. The entrepreneur’s own travel costs go through the additional deduction in the tax return, not through tax-free payments.',
          'The same site for more than three years. Once the three-year limit is passed, the site becomes the regular workplace and tax-free allowances for trips there end.',
        ] },
        { t: 'h2', x: 'Help with travel allowances and payroll' },
        { t: 'p', x: 'We handle bookkeeping and payroll for businesses: we check travel claims against the 2026 maximums, report the allowances to the Incomes Register under the right income types, and calculate a sole trader’s additional deductions for the tax return. Our clients can keep their driving log in the firm’s Vaavo app. We work in Finnish and Russian – get in touch and we will look at your company’s situation.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Vero: decision on tax-exempt allowances for business travel in 2026', href: SRC.decisionEn },
          { label: 'Vero: kilometre and per diem allowances', href: SRC.allowancesEn },
          { label: 'Vero: detailed guidance on travel expense reimbursements (in Finnish)', href: SRC.guideFi },
          { label: 'Vero: vehicle expenses and the driving log for the self-employed', href: SRC.vehicleEn },
          { label: 'Vero: temporary work trips and the additional deduction (sole traders)', href: SRC.tripEn },
          { label: 'Incomes Register: reporting reimbursements of expenses', href: SRC.incomesEn },
          { label: 'Finlex: Income Tax Act (1535/1992), section 71 (in Finnish)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'What is the tax-free kilometre allowance in Finland in 2026?', a: 'For your own car, or a car at your disposal, at most €0.55/km (€0.59/km in 2025). It is increased, for example, by 4 cents/km for each passenger travelling on the employer’s business and by 9 cents/km for a trailer.' },
        { q: 'How much is the per diem in 2026?', a: 'The domestic partial per diem is up to €25 for a trip of more than 6 hours and the full per diem up to €54 for more than 10 hours. The place of work must also be more than 15 km from the starting point and more than 5 km from both home and the regular workplace. Foreign per diems depend on the country.' },
        { q: 'Can a sole trader pay themselves a kilometre allowance?', a: 'No. Tax-free allowances are only for employees. Instead, a sole trader claims an additional deduction in the tax return: up to €0.55/km for business drives in a private car, and up to the per diem amount for temporary business trips. A driving log is required.' },
        { q: 'What should a driving log contain?', a: 'For each drive: start and end time, start and end point and the route where needed, the distance, the purpose, odometer readings and the driver – plus the total kilometres for the year. Monthly totals alone are not enough.' },
        { q: 'Are tax-free travel allowances reported to the Incomes Register?', a: 'Yes. Per diems under income type 331, tax-exempt kilometre allowances under 311 and meal allowances under 303, by the 5th day of the month after payment. Accommodation reimbursements and night travel allowances within the maximum are not reported.' },
      ],
    },
    et: {
      title: 'Kilomeetrihüvitis, päevaraha ja toiduhüvitis Soomes 2026',
      description:
        'Soome maksuvabad sõiduhüvitised 2026: 0,55 €/km, päevaraha 54 € ja 25 €, toiduhüvitis 13,50 €. Tingimused, sõiduaruanne, sõidupäevik ja Tulorekisteri.',
      lead: 'Soomes võib tööandja hüvitada töötaja töösõidu kulud maksuvabalt, kui sõit vastab maksuseaduse töösõidu tingimustele ja summad jäävad Soome maksuameti (Verohallinto) iga-aastase otsuse piiresse. 2026. aastal langes isikliku auto kilomeetrihüvitis 0,55 eurole kilomeetri kohta, päevarahad aga tõusid. Selgitame 2026. aasta summasid, tingimusi, sõiduaruande ja sõidupäeviku nõudeid, toiminimi-ettevõtja erisusi ning hüvitiste deklareerimist Tulorekisterisse.',
      body: [
        { t: 'h2', x: 'Mis on maksuvabad sõiduhüvitised?' },
        { t: 'p', x: 'Soome tulumaksuseaduse (tuloverolaki) § 71 järgi ei ole maksustatav tulu tööandjalt töösõidu eest saadud sõidukulude hüvitis, päevaraha, toiduhüvitis ega majutushüvitis. Loetelu on ammendav: kõik muu on palk. Maksuamet kinnitab igal aastal summad, mida tööandja võib maksuvabalt maksta. 2026. aasta otsus (VH/6575/00.01.00/2025) kehtib 2026. aastal tehtud töösõitudele või nende osadele.' },
        { t: 'p', x: 'Need summad on ülempiirid, mitte kohustus. Tegelikult makstavad hüvitised määrab kollektiivleping ja tööleping. Kui tööandja maksab otsuses lubatust rohkem, on ülejääk töötaja maksustatav palk.' },
        { t: 'h2', x: 'Millal on sõit maksustamisel töösõit?' },
        { t: 'p', x: 'Töösõit (työmatka) on ajutine sõit tööülesannete täitmiseks erilisse töökohta väljaspool töötaja põhitöökohta – kliendi juurde, messile, koolitusele või koosolekule. Maksuvabu hüvitisi saab maksta ainult töötajale, seega peab maksja ja saaja vahel olema tööleping (erandid, näiteks ettevõtte omanik, on kirjas allpool).' },
        { t: 'ul', items: [
          'Sõit kodust põhitöökohta ja tagasi ei ole töösõit. Selle hüvitamine on palk.',
          'Vaba aja sõidud ja isiklikud asjaajamised ei ole töösõidud. Kui töösõidule lisatakse puhkepäevi, ei saa nende eest maksuvaba päevaraha maksta.',
          'Töötamine samas töökohas loetakse ajutiseks kõige rohkem kolm aastat. Seejärel saab sellest põhitöökoht ja sinna tehtud sõitude eest ei saa enam maksuvaba päevaraha, kilomeetrihüvitist, toiduhüvitist ega majutushüvitist maksta.',
        ] },
        { t: 'h2', x: 'Kilomeetrihüvitis 2026' },
        { t: 'p', x: 'Kui töötaja teeb töösõidu oma autoga või autoga, mis on tema valduses (näiteks pereliikme auto), on maksuvaba kilomeetrihüvitis 2026. aastal kuni 55 senti kilomeetri kohta. 2025. aastal oli see 59 senti, nii et määr langes. Põhimäära saab suurendada:' },
        { t: 'ul', items: [
          '4 senti/km iga kaassõitja eest, kelle sõidutamine on tööandja asi',
          '9 senti/km, kui auto küljes on haagis',
          '15 senti/km, kui töö nõuab haagissuvila vedamist',
          '28 senti/km, kui töö nõuab olmehaagise või muu sarnase raske koorma vedamist',
          '4 senti/km üle 80 kg raskuste või suurte masinate või esemete vedamise eest autos',
          '4 senti/km, kui töötaja veab tööülesannete tõttu autos koera',
          '12 senti/km nende kilomeetrite eest, mis sõidetakse metsateel või liiklusele suletud teeehitusobjektil.',
        ] },
        { t: 'p', x: 'Iga lisa rakendatakse kilomeetri kohta vaid üks kord; ainult kaassõitja lisa kasvab inimeste arvuga. Mootorratta ülempiir on 42 senti/km ning jalgratta või elektrijalgratta oma 13 senti/km. Kui töötajal on tööandjalt täielik autosoodustus (vapaa autoetu), ei saa selle autoga tehtud sõitude eest maksuvaba kilomeetrihüvitist maksta. Piiratud autosoodustusega (käyttöetu) juhile, kes maksab ise kütuse eest, võib hüvitada kuni 11 senti/km.' },
        { t: 'p', x: 'Näide: töötaja sõidab oma autoga kliendi juurde ja tagasi, kokku 300 km, ning võtab kolleegi kaasa. Maksuvaba kilomeetrihüvitis on 300 × (0,55 + 0,04) = 177 €.' },
        { t: 'h2', x: 'Soome päevaraha 2026' },
        { t: 'p', x: 'Päevaraha (päiväraha) katab töösõidust tulenevaid lisakulusid toidule ja muule elatisele. See ei hõlma sõitu ega majutust. 2026. aasta ülempiirid:' },
        { t: 'ul', items: [
          'osaline päevaraha (osapäiväraha) 25 €, kui töösõit kestab üle 6 tunni',
          'täispäevaraha (kokopäiväraha) 54 €, kui töösõit kestab üle 10 tunni',
          'mitmepäevasel sõidul makstakse päevaraha iga 24-tunnise sõiduööpäeva (matkavuorokausi) eest; viimase mittetäieliku perioodi eest 25 €, kui see ületab viimase täisööpäeva vähemalt 2 tunniga, ja 54 €, kui üle 6 tunni.',
        ] },
        { t: 'p', x: 'Lisaks peab olema täidetud kaugusnõue: töökoht peab asuma kaugemal kui 15 km kohast, kust sõit algab (kodu või põhitöökoht), ning igal juhul kaugemal kui 5 km nii kodust kui ka põhitöökohast. Kaugust mõõdetakse lühima kasutatava teekonna järgi. Omavalitsuse piiri ületamine ei ole vajalik.' },
        { t: 'p', x: 'Tasuta toidukorrad vähendavad päevaraha. Osaline päevaraha poolitub juba ühe tasuta söögikorra tõttu, täispäevaraha kahe tõttu. Tasuta söögikord on näiteks tööandja makstud või pileti või kursuse hinna sees olev söök. Hotellitoa hinna sees olev hommikusöök päevaraha ei poolita.' },
        { t: 'p', x: 'Näide: töösõit algab esmaspäeval kell 8.00 ja lõpeb neljapäeval kell 9.00. See kestab 73 tundi ehk kolm täis sõiduööpäeva ja üks lisatund täiendavat päevaraha ei anna. Maksuvabalt võib maksta 3 × 54 € = 162 €.' },
        { t: 'h2', x: 'Välismaa päevaraha' },
        { t: 'p', x: 'Välismaa töösõitudele kinnitab maksuamet riigipõhised päevarahad. Need toimivad samal põhimõttel nagu Soome päevaraha, kuid mõne erireegliga:' },
        { t: 'ul', items: [
          'Välismaa päevaraha saab, kui töösõit kestab kokku vähemalt 10 tundi. Lühema sõidu eest makstakse Soome päevaraha.',
          'Summa sõltub riigist, kus sõiduööpäev lõpeb. Kui see lõpeb laeval või lennukis, otsustab riik, kust sõiduk viimati väljus või kuhu see Soomest lahkudes esimesena saabub.',
          'Soome naastes saab viimase välismaal lõppenud täisööpäeva ületava aja eest poole viimasest välismaa päevarahast, kui ületus on üle 2 tunni, ja kogu summa, kui üle 10 tunni.',
          'Kaks tasuta söögikorda ööpäevas poolitavad välismaa päevaraha.',
        ] },
        { t: 'note', x: 'Riikide summad on maksuameti otsuse §-s 13. Näiteks 2026. aastal on Eesti päevaraha 82 €, Rootsi oma 70 € ja eraldi nimetamata riikide oma 52 €. Kontrolli sihtriigi summat alati otsusest enne sõiduaruande koostamist.' },
        { t: 'h2', x: 'Toiduhüvitis (ateriakorvaus)' },
        { t: 'p', x: 'Kui töösõidu eest päevaraha ei maksta – näiteks aja- või kaugusnõue ei ole täidetud –, võib tööandja maksta maksuvaba toiduhüvitist. Tingimus on, et töötaja ei saa töö tõttu lõunapausil süüa oma tavapärases söögikohas. 2026. aastal on toiduhüvitis kuni 13,50 €. Kui töötaja peab sööma kaks korda väljaspool tavapärast söögikohta, on ülempiir 27,00 €; praktikas eeldab see, et tööpäev koos söögipausidega on üle 11 tunni. Sama sõidu eest ei saa maksta nii päevaraha kui ka toiduhüvitist.' },
        { t: 'h2', x: 'Öösõiduraha ja majutushüvitis' },
        { t: 'p', x: 'Majutuse võib tööandja hüvitada maksuvabalt hotelliarve või muu usaldusväärse tõendi alusel. Kui töötaja korraldab ööbimise ise ilma tööandjale kuluta – näiteks sugulaste juures või oma haagissuvilas –, võib päevarahale lisaks maksta öösõiduraha (yömatkaraha), 2026. aastal kuni 16 €. Tingimus on, et päevaraha andvast sõiduööpäevast vähemalt 4 tundi jääb kella 21.00 ja 7.00 vahele ning tööandja ei ole maksnud majutuse, kajuti ega magamiskoha eest. Öötöö eest ei saa öösõiduraha maksuvabalt maksta.' },
        { t: 'h2', x: 'Sõiduaruanne ja sõidupäevik: ilma nendeta maksuvabastust ei ole' },
        { t: 'p', x: 'Hüvitised on maksuvabad ainult siis, kui need makstakse töötaja koostatud sõiduaruande (matkalasku) alusel. Aruanne võib olla elektrooniline, kui selles on kõik nõutud andmed.' },
        { t: 'h3', x: 'Mis peab sõiduaruandes olema?' },
        { t: 'ul', items: [
          'sõidu eesmärk ja sihtkoht (aadress)',
          'vajaduse korral teekond',
          'sõiduviis ehk sõiduk',
          'sõidu alguse ja lõpu kuupäevad ja kellaajad',
          'välismaa sõitude puhul riik või piirkond, kus iga sõiduööpäev lõppes',
          'kilomeetrihüvitise puhul lisaks sõidetud kilomeetrid ja kasutatud määr.',
        ] },
        { t: 'p', x: 'Lisatakse hotelliarved, piletid ja muud tõendid. Kulude puhul, mille kohta tõendit ei saa (näiteks osa parkimistasudest), kinnitab töötaja summa allkirjaga; sobib ka digiallkiri. Tasuta toidukorrad, näiteks kliendi pakutud lõuna, peab töötaja aruandes ise märkima.' },
        { t: 'h3', x: 'Mida sõidupäevikusse (ajopäiväkirja) kirjutada?' },
        { t: 'p', x: 'Sõidupäevik või muu usaldusväärne tõend näitab, millised sõidud on töö- või ärisõidud. Maksuameti juhendi järgi märgitakse iga sõidu kohta:' },
        { t: 'ul', items: [
          'sõidu algus- ja lõpuaeg',
          'algus- ja lõppkoht ning vajaduse korral teekond',
          'sõidu pikkus',
          'sõidu eesmärk',
          'odomeetri näit sõidu alguses ja lõpus',
          'auto kasutaja',
          'lisaks autoga aasta jooksul sõidetud kilomeetrid kokku.',
        ] },
        { t: 'p', x: 'Ainult kuude kogusummadest ei piisa. Maksuameti juhendi näites puudusid ettevõtja päevikust üksikute sõitude pikkused ja kellaajad, mistõttu suurem osa mahaarvamisest lükati tagasi ja määrati maksutõus (veronkorotus).' },
        { t: 'h2', x: 'Töötaja, osakeyhtiö omanik ja toiminimi' },
        { t: 'h3', x: 'Töötaja' },
        { t: 'p', x: 'Tööandja maksab hüvitised sõiduaruande alusel palgale lisaks või kogupalga osana, kui töölepingus on lahti kirjutatud, millest kogupalk koosneb. Maksuvabadest hüvitistest ei peeta kinni tulumaksu ega maksta tööandja ravikindlustusmakset, kuid need deklareeritakse Tulorekisterisse.' },
        { t: 'h3', x: 'Osakeyhtiö või ühingu omanik' },
        { t: 'p', x: 'Osakeyhtiö osanik või täisühingu (ay, ky) vastutav osanik võib saada ettevõttelt maksuvabu sõiduhüvitisi ettevõtte asjus tehtud töösõitude eest ka siis, kui ta palka ei võta. Tingimused on samad mis töötajal ning sõitude kohta tuleb ettevõtte raamatupidamisse koostada sõiduaruanne. Tulorekisterisse deklareeritakse need samade tululiikidega nagu töötaja hüvitised.' },
        { t: 'h3', x: 'Füüsilisest isikust ettevõtja (toiminimi)' },
        { t: 'p', x: 'Toiminimi-ettevõtja ei saa maksta endale maksuvaba kilomeetrihüvitist ega päevaraha, sest ta ei ole iseenda töötaja. Sama suure kasu saab ta maksustamisel lisamahaarvamisena (lisävähennys):' },
        { t: 'ul', items: [
          'Auto: kui ärisõite on kuni 50 % aasta kilomeetritest, on auto eratarbes ja ärisõitude eest saab mahaarvamise kuni töötaja maksuvaba kilomeetrihüvitise ulatuses (2026. aastal 0,55 €/km). Raamatupidamises juba maha arvatud autokulud vähendavad seda. Kui ärisõite on üle 50 %, kuulub auto ettevõttele: maha arvatakse tegelikud kulud ja erasõitude osa arvutatakse sõidupäeviku kilomeetrite järgi.',
          'Päevaraha: ajutise töösõidu eest väljapoole ettevõtte tavapärast tegevuspiirkonda saab mahaarvamise kuni töötaja maksuvaba päevaraha ulatuses (2026. aastal kuni 54 € või 25 € päevas). Sõidupäevad märgitakse deklaratsioonis kestuse järgi.',
          'Kui raamatupidamisse kantud tegelikud kulud on suuremad kui maksimaalne lisamahaarvamine, arvatakse maha ainult tegelikud kulud.',
        ] },
        { t: 'p', x: 'Mahaarvamiseks on vaja sõidupäevikut või muud usaldusväärset tõendit, kust on päevade kaupa näha sõitude sihtkohad, kaugused ja kestus. Sõidud kodust oma kontorisse või töökotta on erasõidud, mitte ärisõidud.' },
        { t: 'h2', x: 'Kuidas hüvitised Tulorekisterisse deklareeritakse' },
        { t: 'p', x: 'Tööandja deklareerib maksuvabad hüvitised palgaandmete teatisel eraldi tululiikidega (tulolaji):' },
        { t: 'ul', items: [
          'Ateriakorvaus (303) – toiduhüvitis',
          'Kilometrikorvaus (verovapaa) (311) – maksuvaba kilomeetrihüvitis',
          'Päiväraha (331) – päevaraha, ka välismaa päevaraha',
          'Tähtaeg: hiljemalt maksekuule järgneva kuu 5. kuupäeval. Kuu hüvitised võib esitada ühe teatisega, märkides maksepäevaks kuu viimase maksepäeva.',
          'Ei deklareerita: majutushüvitist, vedaja tõendi alusel hüvitatud pileteid ega ülempiiri piires makstud öösõiduraha. Ülempiiri ületav öösõiduraha deklareeritakse tululiigiga Muu maksettu lisä (216).',
          'Maksustatavad sõiduhüvitised – näiteks kodu ja töökoha vahelised sõidud või ülempiiri ületav osa – on palk: tululiik Muu maksettu lisä (216), isikliku auto puhul Kilometrikorvaus (veronalainen) (209). Need deklareeritakse viie päeva jooksul maksepäevast.',
        ] },
        { t: 'h2', x: 'Levinud vead' },
        { t: 'ul', items: [
          'Eelmise aasta määr. 2025. aasta 0,59 €/km ei ole enam maksuvaba: 2026. aasta sõitude eest on maksuvaba kuni 0,55 €/km, ülejääk on palk.',
          'Kodu ja töökoha vaheliste sõitude hüvitamine. See ei ole töösõit, seega on hüvitis alati maksustatav palk.',
          'Puudulik sõiduaruanne või päevik. Ilma kellaaegade, sihtkoha ja kilomeetriteta ei saa maksuvabastust tõendada. Kui tingimused ei ole täidetud, on hüvitised palk: maksud ja tööandja kohustuslikud maksed tuleb tagantjärele tasuda ning lisanduda võivad sanktsioonid.',
          'Unustatud tasuta toidukorrad. Kliendi makstud lõuna poolitab osalise päevaraha, kaks tasuta söögikorda täispäevaraha.',
          'Toiduhüvitis lõunasoodustuse kõrvalt. Kui tööandja lõunatšekki või -kaarti saab kasutada ka töösõidul, ei ole toiduhüvitis maksuvaba.',
          'Toiminimi-ettevõtja maksab endale päevaraha. Ettevõtja enda sõidukulud käivad deklaratsioonis lisamahaarvamise kaudu, mitte maksuvabade maksetena.',
          'Sama objekt üle kolme aasta. Kolme aasta piiri ületamisel saab objektist põhitöökoht ja maksuvabad hüvitised sinna tehtud sõitude eest lõpevad.',
        ] },
        { t: 'h2', x: 'Abi sõiduhüvitiste ja palgaarvestusega' },
        { t: 'p', x: 'Teeme ettevõtetele raamatupidamist ja palgaarvestust: kontrollime sõiduaruandeid 2026. aasta ülempiiride järgi, deklareerime hüvitised Tulorekisterisse õigete tululiikidega ning arvutame toiminimi-ettevõtja lisamahaarvamised deklaratsiooni jaoks. Meie kliendid saavad pidada sõidupäevikut büroo Vaavo rakenduses. Teenindame soome ja vene keeles – võta ühendust ja vaatame sinu ettevõtte olukorra üle.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Vero: otsus maksuvabade sõiduhüvitiste kohta 2026 (inglise keeles)', href: SRC.decisionEn },
          { label: 'Vero: kilomeetrihüvitis ja päevaraha (inglise keeles)', href: SRC.allowancesEn },
          { label: 'Vero: põhjalik juhend töösõidukulude hüvitamise kohta (soome keeles)', href: SRC.guideFi },
          { label: 'Vero: ettevõtja autokulud ja sõidupäevik (inglise keeles)', href: SRC.vehicleEn },
          { label: 'Vero: ajutine töösõit ja lisamahaarvamine toiminimile (inglise keeles)', href: SRC.tripEn },
          { label: 'Tulorekisteri: kuluhüvitiste deklareerimine (inglise keeles)', href: SRC.incomesEn },
          { label: 'Finlex: tulumaksuseadus – tuloverolaki (soome keeles)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Kui suur on Soome maksuvaba kilomeetrihüvitis 2026. aastal?', a: 'Oma auto või valduses oleva auto eest kuni 0,55 €/km (2025. aastal 0,59 €/km). Määr tõuseb näiteks 4 senti/km iga tööandja asjus kaasas oleva kaassõitja eest ja 9 senti/km haagise eest.' },
        { q: 'Kui suur on päevaraha 2026. aastal?', a: 'Soome osaline päevaraha on kuni 25 € üle 6-tunnise ja täispäevaraha kuni 54 € üle 10-tunnise töösõidu eest. Töökoht peab olema lähtekohast kaugemal kui 15 km ning nii kodust kui ka põhitöökohast kaugemal kui 5 km. Välismaa päevarahad sõltuvad riigist.' },
        { q: 'Kas toiminimi-ettevõtja võib endale kilomeetrihüvitist maksta?', a: 'Ei. Maksuvabu hüvitisi saab maksta ainult töötajatele. Ettevõtja teeb selle asemel deklaratsioonis lisamahaarvamise: eraautoga tehtud ärisõitude eest kuni 0,55 €/km ja ajutiste töösõitude eest kuni päevaraha suuruse summa. Sõidupäevik on kohustuslik.' },
        { q: 'Mida sõidupäevikusse märkida?', a: 'Iga sõidu kohta algus- ja lõpuaeg, algus- ja lõppkoht ning vajaduse korral teekond, pikkus, eesmärk, odomeetri näidud ja auto kasutaja, lisaks aasta kilomeetrid kokku. Kuude kogusummadest ei piisa.' },
        { q: 'Kas maksuvabad sõiduhüvitised deklareeritakse Tulorekisterisse?', a: 'Jah. Päevaraha tululiigiga 331, maksuvaba kilomeetrihüvitis 311 ja toiduhüvitis 303, hiljemalt maksekuule järgneva kuu 5. kuupäeval. Majutushüvitist ja ülempiiri piires öösõiduraha ei deklareerita.' },
      ],
    },
    uk: {
      title: 'Кілометрові, добові та компенсація харчування у Фінляндії у 2026 році',
      description:
        'Неоподатковувані компенсації поїздок у Фінляндії 2026: 0,55 €/км, добові 54 € і 25 €, харчування 13,50 €. Умови, звіт про поїздку, журнал і Tulorekisteri.',
      lead: 'Роботодавець у Фінляндії може компенсувати працівникові витрати на службову поїздку без податку, якщо поїздка відповідає податковим умовам, а суми не перевищують максимумів із щорічного рішення податкової (Verohallinto). У 2026 році кілометрова компенсація за власний автомобіль знизилася до 0,55 € за кілометр, а добові зросли. Пояснюємо ставки 2026 року, умови, вимоги до звіту про поїздку та журналу поїздок, особливості для toiminimi і подання даних до Tulorekisteri.',
      body: [
        { t: 'h2', x: 'Що таке неоподатковувані компенсації поїздок?' },
        { t: 'p', x: 'За § 71 закону про податок на доходи (tuloverolaki) оподатковуваним доходом не є отримані від роботодавця за службову поїздку компенсація транспортних витрат, добові (päiväraha), компенсація харчування (ateriakorvaus) та компенсація проживання. Перелік вичерпний: усе інше — зарплата. Податкова щороку затверджує максимальні суми, які можна виплатити без податку. Рішення на 2026 рік (VH/6575/00.01.00/2025) застосовується до поїздок або їхніх частин, здійснених у 2026 році.' },
        { t: 'p', x: 'Максимуми — це верхня межа, а не обов’язок. Скільки платити насправді, визначають колективний (TES) і трудовий договори. Якщо роботодавець платить більше, ніж дозволяє рішення, перевищення оподатковується як зарплата.' },
        { t: 'h2', x: 'Коли поїздка вважається службовою?' },
        { t: 'p', x: 'Службова поїздка (työmatka) — це тимчасова поїздка для виконання роботи в особливе місце роботи поза основним робочим місцем: до клієнта, на виставку, навчання чи зустріч. Неоподатковувані компенсації можна платити лише працівникові, тобто між платником і отримувачем мають бути трудові відносини (винятки, наприклад для власника компанії, — нижче).' },
        { t: 'ul', items: [
          'Дорога з дому на основне місце роботи й назад — не службова поїздка. Компенсація за неї — зарплата.',
          'Поїздки у вільний час і в особистих справах — не службові. Якщо до відрядження додано вихідні для відпочинку, добові за ці дні без податку не виплачуються.',
          'Робота на тому самому об’єкті вважається тимчасовою не довше трьох років. Після цього об’єкт стає основним місцем роботи, і неоподатковувані добові, кілометрові, компенсації харчування та проживання за поїздки туди більше не виплачуються.',
        ] },
        { t: 'h2', x: 'Кілометрова компенсація (kilometrikorvaus) у 2026 році' },
        { t: 'p', x: 'Якщо працівник їде у службову поїздку власним автомобілем або автомобілем, яким він розпоряджається (наприклад, машиною члена сім’ї), неоподатковувана кілометрова компенсація у 2026 році — не більше 55 центів за кілометр. У 2025 році було 59 центів, тож ставка знизилася. Базову ставку можна збільшити:' },
        { t: 'ul', items: [
          'на 4 центи/км за кожного пасажира, перевезення якого — справа роботодавця',
          'на 9 центів/км, якщо до машини причеплено причіп',
          'на 15 центів/км, якщо робота вимагає буксирувати житловий причіп',
          'на 28 центів/км, якщо робота вимагає буксирувати побутовий вагончик або подібний важкий вантаж',
          'на 4 центи/км, якщо в машині перевозяться верстати чи предмети, важчі за 80 кг або великі за розміром',
          'на 4 центи/км, якщо працівник через роботу возить собаку',
          'на 12 центів/км за кілометри лісовою дорогою або закритим для руху дорожнім будівництвом.',
        ] },
        { t: 'p', x: 'Кожна надбавка застосовується до кілометра лише один раз; від кількості людей залежить тільки надбавка за пасажирів. Для мотоцикла максимум — 42 центи/км, для велосипеда чи електровелосипеда — 13 центів/км. Якщо працівник має від роботодавця повну автомобільну пільгу (vapaa autoetu), неоподатковувану кілометрову компенсацію за поїздки цією машиною платити не можна. Водієві машини з обмеженою пільгою (käyttöetu), який сам платить за пальне, можна відшкодувати не більше 11 центів/км.' },
        { t: 'p', x: 'Приклад: працівник їде власною машиною до клієнта й назад — загалом 300 км — і бере з собою колегу. Неоподатковувана компенсація: 300 × (0,55 + 0,04) = 177 €.' },
        { t: 'h2', x: 'Добові по Фінляндії у 2026 році' },
        { t: 'p', x: 'Добові (päiväraha) покривають додаткові витрати на харчування та інші побутові потреби під час поїздки, але не проїзд і не житло. Максимуми 2026 року:' },
        { t: 'ul', items: [
          'часткові добові (osapäiväraha) — 25 €, якщо поїздка триває понад 6 годин',
          'повні добові (kokopäiväraha) — 54 €, якщо поїздка триває понад 10 годин',
          'у багатоденній поїздці добові виплачуються за кожні повні 24 години (matkavuorokausi); за останній неповний відрізок — 25 €, якщо він перевищує останню повну добу щонайменше на 2 години, і 54 €, якщо більш ніж на 6 годин.',
        ] },
        { t: 'p', x: 'Крім того, потрібна умова відстані: місце роботи має бути далі ніж за 15 км від точки, звідки починається поїздка (дім чи основне місце роботи), і в будь-якому разі далі ніж за 5 км і від дому, і від основного місця роботи. Відстань рахують найкоротшим доступним маршрутом. Перетинати межу муніципалітету не обов’язково.' },
        { t: 'p', x: 'Безкоштовне харчування зменшує добові. Часткові добові зменшуються вдвічі вже через один безкоштовний прийом їжі, повні — через два. Безкоштовний прийом їжі — це, наприклад, обід за рахунок роботодавця або включений у вартість квитка чи курсу. Сніданок, що входить у ціну готельного номера, добових не зменшує.' },
        { t: 'p', x: 'Приклад: поїздка починається в понеділок о 8:00 і закінчується в четвер о 9:00. Вона триває 73 години — три повні matkavuorokausi, а зайва година права на додаткові добові не дає. Без податку можна виплатити 3 × 54 € = 162 €.' },
        { t: 'h2', x: 'Закордонні добові (ulkomaanpäiväraha)' },
        { t: 'p', x: 'Для поїздок за кордон податкова затверджує добові за країнами. Принцип той самий, що й у Фінляндії, але з особливими правилами:' },
        { t: 'ul', items: [
          'Право на закордонні добові є, якщо поїздка загалом триває щонайменше 10 годин. За коротшу поїздку платять добові по Фінляндії.',
          'Сума залежить від країни, де закінчується чергова доба поїздки. Якщо вона закінчується на борту судна чи літака — від країни, звідки транспорт востаннє вирушив або куди він першою прибуває при виїзді з Фінляндії.',
          'Після повернення до Фінляндії за час понад останню повну добу за кордоном виплачують половину останніх закордонних добових, якщо перевищення понад 2 години, і повну суму — якщо понад 10 годин.',
          'Два безкоштовні прийоми їжі за добу зменшують закордонні добові вдвічі.',
        ] },
        { t: 'note', x: 'Суми за країнами наведено в § 13 рішення податкової. Наприклад, у 2026 році добові для Естонії — 82 €, для Швеції — 70 €, а для країн, не зазначених окремо, — 52 €. Перед складанням звіту про поїздку завжди звіряйте ставку для своєї країни за рішенням.' },
        { t: 'h2', x: 'Компенсація харчування (ateriakorvaus)' },
        { t: 'p', x: 'Якщо за поїздку добові не виплачуються — наприклад, не виконано умову щодо часу чи відстані, — роботодавець може виплатити неоподатковувану компенсацію харчування. Умова: через роботу людина не може пообідати в перерву там, де зазвичай їсть. У 2026 році компенсація — не більше 13,50 €. Якщо доводиться їсти поза звичним місцем двічі, максимум — 27,00 €; на практиці це можливо, коли робочий день разом із перервами триває понад 11 годин. За одну поїздку не можна отримати і добові, і компенсацію харчування.' },
        { t: 'h2', x: 'Нічні (yömatkaraha) та компенсація проживання' },
        { t: 'p', x: 'Готель роботодавець відшкодовує без податку за рахунком або іншим надійним підтвердженням. Якщо працівник сам знаходить нічліг без витрат для роботодавця — у родичів чи у власному житловому причепі, — до добових можна додати нічні, у 2026 році не більше 16 €. Умова: щонайменше 4 години доби, що дає право на добові, припадають на час із 21:00 до 7:00, і роботодавець не оплатив житло, каюту чи спальне місце. За нічну роботу нічні без податку не виплачуються.' },
        { t: 'h2', x: 'Звіт про поїздку та журнал поїздок: без них податкової пільги немає' },
        { t: 'p', x: 'Компенсації звільнені від податку, лише якщо виплачені на підставі звіту про поїздку (matkalasku), який склав працівник. Звіт може бути електронним, якщо в ньому є всі обов’язкові дані.' },
        { t: 'h3', x: 'Що має бути у звіті про поїздку?' },
        { t: 'ul', items: [
          'мета і місце призначення поїздки (адреса)',
          'за потреби маршрут',
          'спосіб пересування (транспортний засіб)',
          'дати й час початку та закінчення поїздки',
          'для закордонних поїздок — країна чи регіон, де закінчилася кожна доба',
          'для кілометрової компенсації — пройдені кілометри і застосована ставка.',
        ] },
        { t: 'p', x: 'До звіту додають готельні рахунки, квитки та інші підтвердження. Якщо на витрату немає чека (наприклад, деякі паркування), працівник підтверджує суму підписом; електронний підпис теж підходить. Безкоштовне харчування, наприклад обід за рахунок клієнта, працівник має зазначити у звіті сам.' },
        { t: 'h3', x: 'Що записувати в журнал поїздок (ajopäiväkirja)?' },
        { t: 'p', x: 'Журнал поїздок або інше надійне підтвердження показує, які поїздки службові чи ділові. За інструкцією податкової для кожної поїздки записують:' },
        { t: 'ul', items: [
          'час початку і закінчення',
          'місце початку і закінчення, за потреби маршрут',
          'відстань',
          'мету поїздки',
          'показники одометра на початку і в кінці',
          'хто був за кермом',
          'а також загальний пробіг автомобіля за рік.',
        ] },
        { t: 'p', x: 'Самих місячних підсумків недостатньо. У прикладі з інструкції податкової в журналі підприємця не було довжини окремих поїздок і часу — більшу частину вирахування відхилили й нарахували штрафну надбавку до податку (veronkorotus).' },
        { t: 'h2', x: 'Працівник, власник osakeyhtiö і toiminimi' },
        { t: 'h3', x: 'Працівник' },
        { t: 'p', x: 'Роботодавець виплачує компенсації за звітом про поїздку понад зарплату або у складі загальної зарплати, якщо в трудовому договорі розписано, з чого вона складається. З неоподатковуваних компенсацій не утримують податок і не сплачують внесок роботодавця на медичне страхування, але вони подаються до Tulorekisteri.' },
        { t: 'h3', x: 'Власник osakeyhtiö або товариства' },
        { t: 'p', x: 'Акціонер osakeyhtiö або повний учасник товариства (ay, ky) може отримувати від компанії неоподатковувані компенсації за службові поїздки у справах компанії, навіть якщо не бере зарплату. Умови ті самі, що й у працівника, а на поїздки треба скласти звіт для бухгалтерії компанії. До Tulorekisteri їх подають із тими самими кодами доходу, що й у працівників.' },
        { t: 'h3', x: 'Фізична особа-підприємець (toiminimi)' },
        { t: 'p', x: 'Підприємець із toiminimi не може платити собі неоподатковувані кілометрові чи добові — він не є працівником сам у себе. Ту саму вигоду він отримує в оподаткуванні як додаткове вирахування (lisävähennys):' },
        { t: 'ul', items: [
          'Автомобіль: якщо ділові поїздки — не більше 50 % пробігу за рік, машина вважається особистою, і за ділові кілометри належить вирахування не більше неоподатковуваної кілометрової ставки працівника (у 2026 році — 0,55 €/км). Витрати на машину, уже враховані в бухгалтерії, зменшують вирахування. Якщо ділових поїздок понад 50 %, машина належить до бізнесу: витрати вираховуються фактичні, а частка особистих поїздок розраховується за кілометрами з журналу.',
          'Добові: за тимчасову поїздку за межі звичайної зони діяльності фірми належить вирахування не більше неоподатковуваних добових працівника (у 2026 році до 54 € або 25 € на день). Дні поїздок зазначають у декларації за тривалістю.',
          'Якщо фактичні витрати в бухгалтерії більші за максимальне вирахування, вираховуються лише фактичні витрати.',
        ] },
        { t: 'p', x: 'Для вирахування потрібен журнал поїздок або інше надійне підтвердження, де по днях видно місця призначення, відстані та тривалість. Поїздки з дому до власного офісу чи майстерні — особисті, а не ділові.' },
        { t: 'h2', x: 'Як компенсації подаються до Tulorekisteri' },
        { t: 'p', x: 'Роботодавець зазначає неоподатковувані компенсації у звіті про зарплату під окремими кодами доходу (tulolaji):' },
        { t: 'ul', items: [
          'Ateriakorvaus (303) — компенсація харчування',
          'Kilometrikorvaus (verovapaa) (311) — неоподатковувані кілометрові',
          'Päiväraha (331) — добові, зокрема закордонні',
          'Строк: не пізніше 5-го числа місяця, що настає за місяцем виплати. Виплати за місяць можна подати одним звітом, зазначивши останню дату виплати в цьому місяці.',
          'Не подаються: компенсація проживання, відшкодування квитків за документом перевізника та нічні в межах максимуму. Перевищення нічних подається з кодом Muu maksettu lisä (216).',
          'Оподатковувані компенсації поїздок — наприклад, дорога дім–робота або перевищення максимуму — це зарплата: код Muu maksettu lisä (216), для власного автомобіля — Kilometrikorvaus (veronalainen) (209). Їх подають протягом п’яти днів від дати виплати.',
        ] },
        { t: 'h2', x: 'Поширені помилки' },
        { t: 'ul', items: [
          'Стара ставка. 0,59 €/км із 2025 року більше не звільнена від податку: за поїздки 2026 року без податку — не більше 0,55 €/км, перевищення — зарплата.',
          'Компенсація дороги дім–робота. Це не службова поїздка, тому компенсація завжди оподатковується як зарплата.',
          'Неповний звіт або журнал. Без часу, місця призначення й кілометрів звільнення від податку не довести. Якщо умови не виконано, компенсації вважаються зарплатою: заднім числом доплачуються податки й обов’язкові внески, можливі й санкції.',
          'Забуте безкоштовне харчування. Обід за рахунок клієнта зменшує вдвічі часткові добові, два безкоштовні прийоми їжі — повні.',
          'Компенсація харчування за наявності обідньої пільги. Якщо ваучером чи карткою на обід від роботодавця можна розрахуватися й у поїздці, компенсація харчування оподатковується.',
          'Підприємець із toiminimi платить собі добові. Власні витрати підприємця враховуються через додаткове вирахування в декларації, а не як неоподатковувана виплата.',
          'Один об’єкт довше трьох років. Після трьох років об’єкт стає основним місцем роботи, і неоподатковувані компенсації за поїздки туди припиняються.',
        ] },
        { t: 'h2', x: 'Допоможемо з компенсаціями поїздок і зарплатою' },
        { t: 'p', x: 'Ведемо бухгалтерію та нарахування зарплати: перевіряємо звіти про поїздки за ставками 2026 року, подаємо компенсації до Tulorekisteri з правильними кодами й розраховуємо додаткові вирахування підприємця для декларації. Журнал поїздок наші клієнти можуть вести в застосунку бюро Vaavo. Працюємо фінською та російською — напишіть нам, і ми розберемо ситуацію вашої компанії.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: рішення про неоподатковувані компенсації поїздок на 2026 рік (англійською)', href: SRC.decisionEn },
          { label: 'Vero: кілометрові та добові (англійською)', href: SRC.allowancesEn },
          { label: 'Vero: докладна інструкція про компенсації службових поїздок (фінською)', href: SRC.guideFi },
          { label: 'Vero: витрати підприємця на автомобіль і журнал поїздок (англійською)', href: SRC.vehicleEn },
          { label: 'Vero: тимчасова поїздка й додаткове вирахування для toiminimi (англійською)', href: SRC.tripEn },
          { label: 'Tulorekisteri: як подавати компенсації витрат (англійською)', href: SRC.incomesEn },
          { label: 'Finlex: закон про податок на доходи — tuloverolaki (фінською)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Яка неоподатковувана кілометрова компенсація у Фінляндії у 2026 році?', a: 'За власний автомобіль або машину у вашому розпорядженні — не більше 0,55 €/км (у 2025 році було 0,59 €/км). Ставка зростає, наприклад, на 4 центи/км за кожного пасажира у справах роботодавця та на 9 центів/км за причіп.' },
        { q: 'Які добові у 2026 році?', a: 'По Фінляндії часткові добові — до 25 € за поїздку понад 6 годин, повні — до 54 € за поїздку понад 10 годин. Місце роботи має бути далі ніж за 15 км від точки відправлення і далі ніж за 5 км і від дому, і від основного місця роботи. Закордонні добові залежать від країни.' },
        { q: 'Чи може підприємець із toiminimi платити собі кілометрові?', a: 'Ні. Неоподатковувані компенсації виплачують лише працівникам. Підприємець натомість робить додаткове вирахування в декларації: за ділові поїздки особистою машиною до 0,55 €/км і за тимчасові поїздки — у розмірі добових. Обов’язкова умова — журнал поїздок.' },
        { q: 'Що записувати в журнал поїздок?', a: 'Для кожної поїздки — час початку й закінчення, звідки й куди, за потреби маршрут, відстань, мету, показники одометра і хто був за кермом, а також загальний пробіг за рік. Самих місячних підсумків недостатньо.' },
        { q: 'Чи треба подавати неоподатковувані компенсації до Tulorekisteri?', a: 'Так. Добові — з кодом 331, неоподатковувані кілометрові — 311, компенсацію харчування — 303, не пізніше 5-го числа місяця після виплати. Компенсацію проживання та нічні в межах максимуму не подають.' },
      ],
    },
  },
};
