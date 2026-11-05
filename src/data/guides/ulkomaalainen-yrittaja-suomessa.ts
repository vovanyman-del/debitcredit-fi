import type { Guide } from './types';

// Facts verified 2026-11-05, verbatim, against Finlex (consolidated Finnish texts), prh.fi, vero.fi and
// suomi.fi (page update date in brackets where the page shows one). migri.fi and Business Finland were
// used for research only and are deliberately not linked; Migri's site refused automated fetches, so the
// immigration part is kept general and attributed to Migri by name. Every link below was fetched the same
// day and answered HTTP 200.
// - Elinkeinotoimintalaki 565/2023 (https://www.finlex.fi/fi/lainsaadanto/2023/565; in force 1.6.2023,
//   "Tällä lailla kumotaan elinkeinon harjoittamisen oikeudesta annettu laki" = 122/1919 is repealed):
//   2 § "Tässä laissa säädetyin edellytyksin elinkeinotoimintaa saa harjoittaa: 1) luonnollinen henkilö,
//   jolla on asuinpaikka Euroopan talousalueella; 2) suomalainen yhteisö tai säätiö; ..."; 3 §
//   "Patentti- ja rekisterihallituksen myöntämällä luvalla elinkeinotoimintaa saa harjoittaa: 1)
//   luonnollinen henkilö, jolla on asuinpaikka Euroopan talousalueen ulkopuolella"; "Patentti- ja
//   rekisterihallituksen on myönnettävä lupa, jos elinkeinonharjoittaja on annetun selvityksen perusteella
//   tavoitettavissa ..."; 4 § yksityinen elinkeinonharjoittaja "joka on täysi-ikäinen; joka ei ole
//   konkurssissa ja jonka toimintakelpoisuutta ei ole rajoitettu"; 6 § "Kaupparekisteriin merkittävällä
//   elinkeinonharjoittajalla on oltava edustaja, jolla on oikeus ottaa vastaan haasteita ...";
//   "Edustajan asuinpaikan on oltava Suomessa"; "Luonnollisen henkilön, jolla on asuinpaikka Euroopan
//   talousalueella, ... ei kuitenkaan tarvitse asettaa erillistä edustajaa."
// - Osakeyhtiölaki 624/2006 (https://www.finlex.fi/fi/lainsaadanto/2006/624, ajantasa 2026-06-16):
//   6:8 "Jos hallitukseen kuuluu vähemmän kuin kolme jäsentä, hallituksessa on oltava ainakin yksi
//   varajäsen. Mitä tässä laissa säädetään jäsenestä, sovelletaan myös varajäseneen." 6:10 "Vähintään
//   yhdellä hallituksen jäsenellä on oltava asuinpaikka Euroopan talousalueella, jollei
//   rekisteriviranomainen myönnä yhtiölle lupaa poiketa tästä." Managing director (6 luku): "Toimitus-
//   johtajan asuinpaikan on aina oltava Euroopan talousalueella, jollei rekisteriviranomainen myönnä
//   yhtiölle lupaa poiketa tästä." NOTE: the brief's wording "at least one board member AND the deputy"
//   is not the statute's current text; the deputy rule is PRH's practice (below).
// - PRH, Luvat ETAn ulkopuolella pysyvästi asuville (24.03.2026): "Henkilön kansalaisuus ei ratkaise
//   luvan tarvetta"; "Lupaa ei tarvita, jos vähintään yhdellä hallituksen varsinaisella jäsenellä on
//   asuinpaikka ETA-alueella. Muussa tapauksessa PRH:n lupa tarvitaan kaikille varsinaisille jäsenille.";
//   same sentence for varajäsenet; "Toimitusjohtajalla ja tämän mahdollisella sijaisella täytyy olla
//   asuinpaikka ETA-alueella. Muussa tapauksessa on haettava PRH:n lupa."; refused e.g. "Kaikki hallituksen
//   jäsenet asuvat esimerkiksi Venäjällä tai Australiassa" and "Varsinainen jäsen asuu Australiassa,
//   varajäsen Suomessa (varajäsen ei tarvitse lupaa ja varsinaiselle ei myönnetä lupaa)"; "Hakemus maksaa
//   150 euroa. Lisäksi peritään laskutuslisä 6,50 euroa / hakemus"; "Jos lupaa haetaan 3 hallituksen
//   jäsenelle, ... yhteensä 450 euroa"; representative: "Edustajan kotipaikan täytyy olla Suomessa";
//   "Erillistä edustajaa ei kuitenkaan tarvitse valita, jos osakeyhtiöllä on kaupparekisteriin ilmoitettu
//   ETA-alueella asuva hallituksen jäsen, hallituksen varajäsen, toimitusjohtaja, edustamiseen oikeutettu
//   tai prokuristi."
// - PRH, Yksityisen elinkeinonharjoittajan perustamisilmoitus – lupa ETAn ulkopuolella pysyvästi asuvalle
//   (01.01.2026): "Jos henkilöllä ei ole pysyvää asuinpaikkaa Euroopan talousalueella (ETA), hän tarvitsee
//   PRH:n luvan"; "PRH on käytännössä myöntänyt lupia henkilöille, jotka asuvat pysyvästi Sveitsissä.
//   Käytäntö perustuu Luganon sopimukseen."; "Sinun täytyy ensin saada lupa PRH:lta ennen kuin voit tehdä
//   ... perustamisilmoituksen"; "Hakemusmaksu on 150 euroa. Lisäksi peritään laskutuslisää 6,50 euroa";
//   "Edustajalla tulee olla pysyvä asuinpaikka Suomessa"; "Yksityisen elinkeinonharjoittajan, jolla on
//   asuinpaikka ETA-alueella, ei kuitenkaan tarvitse asettaa ... erillistä edustajaa."
// - PRH, Yksityinen elinkeinonharjoittaja (26.08.2026): registration in the trade register "on useimmiten
//   vapaaehtoista"; mandatory if "elinkeinonharjoittajalla on pysyvä asuinpaikka Euroopan talousalueen
//   ulkopuolella"; "Ukrainasta tulleet henkilöt eivät tarvitse lupaa, jos heillä on Maahanmuuttoviraston
//   päätös tilapäisestä suojelusta. He voivat ... ilmoittautua elinkeinonharjoittajaksi joko pelkästään
//   Verohallinnolle (maksuton) tai myös kaupparekisteriin (maksullinen). Ilmoittautumiseen tarvitaan
//   suomalainen henkilötunnus, joka tulee Maahanmuuttoviraston päätöksen mukana."; "maksaa 75 euroa".
//   PRH paperilomakkeet (03.06.2026): toiminimi may still file "Y3-lomake".
// - PRH, Perustaminen – käsittelymaksut (01.01.2026): "Osakeyhtiön ohjattu perustaminen YTJ-palvelussa
//   300,00"; "Osakeyhtiön perustamisilmoitus 400,00"; "Yksityisen elinkeinonharjoittajan
//   (toiminimiyrittäjän) perustamisilmoitus 75,00"; "Käsittelymaksujen arvonlisävero (ALV) on 0 prosenttia".
// - PRH, Osakeyhtiön perustamisilmoitus YTJ-palvelussa (17.08.2026): choose the 400 € notification when
//   "Kaikilla ilmoittamillasi henkilöillä ei ole suomalaista henkilötunnusta"; "Tee perustamisilmoitus
//   kaupparekisteriin kolmen kuukauden kuluessa siitä, kun osakeyhtiön perustamissopimus on allekirjoitettu.
//   Jos ilmoitus myöhästyy, osakeyhtiön perustaminen raukeaa"; "Ilmoittaminen paperilomakkeilla ei ole
//   mahdollista 1.1.2026 alkaen"; foreigners: "passikopio tai muu todistus henkilöllisyydestä".
// - PRH, Kaupparekisteri-ilmoittaminen erityistilanteissa (13.08.2026): e-filing "edellyttävät vahvaa
//   sähköistä tunnistautumista"; if nobody has a Finnish henkilötunnus: an authorised "Yhteyshenkilö"
//   files on the web form (he needs "suomalaisen henkilötunnuksen ja lisäksi jonkin Suomi.fi-
//   tunnistuspalvelun tarjoamista tunnistustavoista"); or a responsible person uses "Ulkomaalaisen
//   tunnistustapa" with an identification means from "Alankomaat, Belgia, Espanja, Italia, Itävalta,
//   Kroatia, Kypros, Latvia, Liechtenstein, Liettua, Luxemburg, Malta, Portugali, Puola, Ruotsi, Saksa,
//   Slovakia, Slovenia, Tanska, Tšekin tasavalta ja Viro"; or "Asianajaja ilmoittaa YTJ-palvelussa"
//   ("Asianajajan täytyy olla Suomen Asianajajien jäsen"); post only with "selvitys siitä, miksei
//   sähköinen ilmoittaminen ole mahdollista".
// - Vero, Perustamisilmoitus (18.5.2026): "Toiminimiyrittäjä ... voi aloittaa yritystoiminnan
//   OmaVerossa. Sen sijaan esimerkiksi osakeyhtiö ... on aina perustettava YTJ-palvelussa"; "saat
//   Y-tunnuksen heti"; "Rekisteröinti Verohallinnon rekistereihin kestää noin 3 viikkoa"; "Kun olet ...
//   saanut yrityksesi Y-tunnuksen voit avata yritykselle pankkitilin".
// - Vero, Yrityksen perustajan muistilista (22.5.2026): "Verohallinto ei määrää ennakkoveroa
//   automaattisesti, vaan sinun pitää hakea sitä itse"; "Osakeyhtiö maksaa 20 % yhteisöveroa voitostaan";
//   "Jos yrityksesi liikevaihto ylittää 20 000 euroa kalenterivuodessa, sinun pitää ilmoittautua
//   alv-rekisteriin"; "Useimpien tavaroiden ja palveluiden arvonlisävero on 25,5 %"; toiminimi "et voi
//   maksaa itsellesi palkkaa"; "Älä ilmoittaudu työnantajarekisteriin, jos yrityksessä ei työskentele muita
//   kuin sinä itse, puolisosi tai alle 15-vuotias lapsesi."
// - Vero, Alv-rekisteröinti (18.5.2026): "maksettava arvonlisäveroa liikevaihtorajan ylittämisajankohdasta
//   alkaen"; "yrityksen on rekisteröidyttävä alv-rekisteriin hyvissä ajoin etukäteen".
// - Vero, Ennakkoperintärekisteri (27.2.2026): "Ennakkoperintärekisteriin kuuluminen ei ole pakollista.
//   Aloittavan yrittäjän voi kuitenkin olla vaikea saada toimeksiantoja, jos yritys ei ole rekisterissä";
//   withholding "Yhteisöt ja yhtymät ...: 13 %"; individuals without a tax card "60 %"; "Vaikka kuulut
//   ennakkoperintärekisteriin, sinun pitää itse hakea ennakkoveroa".
// - Tuloverolaki 1535/1992 11 § (https://www.finlex.fi/fi/lainsaadanto/1992/1535): "Henkilön katsotaan
//   asuvan Suomessa, jos hänellä on täällä varsinainen asunto ja koti tai jos hän jatkuvasti oleskelee
//   täällä yli kuuden kuukauden ajan, jolloin tilapäinen poissaolo ei estä pitämästä oleskelua jatkuvana."
//   Vero, Yleinen ja rajoitettu verovelvollisuus (20.1.2026): "maksat Suomeen veroa kaikista tuloista,
//   jotka saat Suomesta ja ulkomailta".
// - Vero, Using MyTax as a foreign individual: "You can log in to MyTax if you have an eIDAS identifier,
//   i.e. online banking codes or other electronic identifier from another EU country" — the foreign login
//   opens a contact request and "Reporting and requesting information in a limited scope".
// - Suomi.fi, Henkilötunnus (16.2.2026): "Jos olet ulkomaan kansalainen ja muutat Suomeen vakinaisesti,
//   sinut rekisteröidään oman pyyntösi perusteella Suomen väestötietojärjestelmään. Samalla saat myös
//   henkilötunnuksen"; "Digi- ja väestötietovirastosta, verotoimistosta, Suomen ulkomaan edustustosta tai
//   Maahanmuuttovirastosta. Rekisteröinti edellyttää henkilökohtaista käyntiä"; "Pankissa asioitaessa
//   henkilötunnus on välttämätön, esimerkiksi tiliä avattaessa." Suomi.fi-tunnistus: a foreign EU eID or
//   Finnish Authenticator only where the service allows it, and then "sinua ei voida yhdistää suomalaiseen
//   henkilötunnukseen".
// - Rahanpesulaki 444/2017 (https://www.finlex.fi/fi/lainsaadanto/2017/444, ajantasa 2026-09-04), 3 luku
//   "Asiakkaan tunteminen": "Ilmoitusvelvollisen on tunnistettava asiakkaansa ja todennettava tämän
//   henkilöllisyys vakituista asiakassuhdetta perustettaessa"; beneficial owners "Ilmoitusvelvollisen on
//   tunnistettava ja pidettävä yllä riittäviä, tarkkoja ja ajantasaisia tietoja asiakkaan tosiasiallisista
//   edunsaajista"; records include "tiedot asiakkaan toiminnasta, liiketoiminnan laadusta ja laajuudesta,
//   taloudellisesta asemasta, perusteet liiketoimen tai palvelun käytölle ja tiedot varojen alkuperästä".
// - YEL 1272/2006 1 §: "Suomessa asuvan ja toimivan yrittäjän on vakuutettava itsensä ... Suomessa
//   asumista ei kuitenkaan edellytetä, jos yrittäjä asuu EU- tai ETA-maassa." Suomi.fi / ETK (30.12.2025):
//   "Ota eläkevakuutus kuuden kuukauden kuluessa yritystoiminnan alkamisesta."
// - Migri (research only, not linked; quoted from migri.fi search snippets): EU citizens staying over three
//   months register their right of residence with Migri; entrepreneur's permit: "Your business must be
//   profitable. Your means of support must be secured by your income from your business"; "If you are a
//   freelancer or working through an invoicing service company (in Finnish: kevytyrittäjä), it is not
//   possible to apply for this permit"; start-up permit: "You must obtain a positive Eligibility Statement
//   from Business Finland before you can apply for this permit."
// Not stated (not reliably verifiable or out of scope): Migri fees, processing times and income limits,
// which authority assesses profitability after the 2026 regional reform, permit durations, bank names or
// bank timelines, the YEL euro limits (see our YEL guide).
const VERO = 'https://www.vero.fi';
const PRH = 'https://www.prh.fi';

const SRC = {
  etl: 'https://www.finlex.fi/fi/lainsaadanto/2023/565',
  oyl: 'https://www.finlex.fi/fi/lainsaadanto/2006/624',
  tvl: 'https://www.finlex.fi/fi/lainsaadanto/1992/1535',
  aml: 'https://www.finlex.fi/fi/lainsaadanto/2017/444',
  feesFi: `${PRH}/fi/hinnastot/kaupparekisterin-hinnastot/kaupparekisterin-kasittelymaksut/perustaminen.html`,
  feesEn: `${PRH}/en/price-lists/hinnasto_1/kasittelymaksut/startup.html`,
  traderPermitFi: `${PRH}/fi/yrityksetjayhteisot/yrityksenperustaminen/yksityisen-elinkeinonharjoittajan-perustaminen-ja-perustamisilmoitus/yehlupa.html`,
  traderPermitEn: `${PRH}/en/companiesandorganisations/yrityksen_perustaminen/privatetrader/permit_to_persons_living_permanently_outside_the_eea.html`,
  oyPermitFi: `${PRH}/fi/yrityksetjayhteisot/yrityksenperustaminen/osakeyhtion-perustaminen-ja-perustamisilmoitus_1/ulkomaalaisluvat.html`,
  oyPermitEn: `${PRH}/en/companiesandorganisations/yrityksen_perustaminen/osakeyhtio/permits_to_persons_from_outside_the_eea.html`,
  traderFi: `${PRH}/fi/yrityksetjayhteisot/yrityksenperustaminen/yksityisen-elinkeinonharjoittajan-perustaminen-ja-perustamisilmoitus.html`,
  traderEn: `${PRH}/en/companiesandorganisations/yrityksen_perustaminen/privatetrader.html`,
  noLoginFi: `${PRH}/fi/yrityksetjayhteisot/kaupparekisteri-pakollinen-sahkoinen-asiointi/erityistilanteet.html`,
  startFi: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/uusi-yritys/perustamisilmoitus/`,
  startEn: `${VERO}/en/businesses-and-corporations/business-operations/setting-up-a-business/start-up-notification/`,
  checklistFi: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/uusi-yritys/yrityksen-perustajan-muistilista/`,
  checklistEn: `${VERO}/en/businesses-and-corporations/business-operations/setting-up-a-business/checklist-for-the-founder-of-a-new-business/`,
  vatFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/rekisterointi/`,
  vatEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/how-to-register-for-vat/`,
  prepayFi: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/verohallinnon-rekisterit/ennakkoperintarekisteri/`,
  prepayEn: `${VERO}/en/businesses-and-corporations/business-operations/tax-administrations-registers--business/prepayment-register/`,
  residencyFi: `${VERO}/henkiloasiakkaat/verokortti-ja-veroilmoitus/ulkomailta_suomeen/yleinen-ja-rajoitettu-verovelvollisuus/`,
  residencyEn: `${VERO}/en/individuals/tax-cards-and-tax-returns/arriving_in_finland/individuals-residency-and-nonresidency-in-finland/`,
  myTaxForeignEn: `${VERO}/en/About-us/contact-us/efil/information-on-mytax/using-mytax-as-a-foreign-individual/`,
  hetuFi: 'https://www.suomi.fi/kansalaiselle/oikeudet-ja-osallistuminen-yhteiskuntaan/oikeusturva-ja-kuluttajansuoja/opas/henkilotiedot-ja-niiden-kasittely/henkilotunnus',
};

export const ulkomaalainenYrittajaSuomessa: Guide = {
  slug: 'ulkomaalainen-yrittaja-suomessa',
  datePublished: '2026-11-09',
  dateModified: '2026-11-09',
  content: {
    fi: {
      title: 'Ulkomaalainen yrittäjä Suomessa: Y-tunnus, oleskelulupa, pankkitili ja verot',
      description:
        'Näin ulkomaalainen perustaa toiminimen tai osakeyhtiön Suomeen 2026: oleskelulupa, ETA-asuinpaikka, PRH:n lupa, Y-tunnus, pankkitili ja verot.',
      lead: 'Suomessa yrityksen voi perustaa myös ulkomaan kansalainen, mutta matkalla on kaksi erillistä kysymystä: saatko oleskella ja tehdä työtä Suomessa, ja saatko harjoittaa elinkeinoa ja rekisteröidä yrityksen. Ensimmäiseen vastaa Maahanmuuttovirasto, toiseen Patentti- ja rekisterihallitus (PRH) ja Verohallinto. Kokosimme vuoden 2026 säännöt, maksut ja muistilistan.',
      body: [
        { t: 'h2', x: 'Kuka saa perustaa yrityksen Suomeen?' },
        { t: 'p', x: 'Elinkeinotoimintalain (565/2023) mukaan oikeus harjoittaa elinkeinoa riippuu asuinpaikasta, ei kansalaisuudesta. Luonnollinen henkilö, jonka asuinpaikka on Euroopan talousalueella (ETA), saa harjoittaa elinkeinoa ilman erillistä lupaa. ETA:n ulkopuolella asuva tarvitsee PRH:n luvan. Oleskeluoikeus on eri asia: siitä päättää Maahanmuuttovirasto (Migri).' },
        { t: 'h3', x: 'EU- ja ETA-kansalainen' },
        { t: 'p', x: 'EU- tai ETA-maan kansalainen ei tarvitse oleskelulupaa toimiakseen yrittäjänä Suomessa. Jos oleskelet Suomessa yli kolme kuukautta, rekisteröi oleskeluoikeutesi Maahanmuuttovirastossa. Jos asut esimerkiksi Virossa ja perustat toiminimen Suomeen, asuinpaikkasi on ETA:ssa: PRH:n lupaa ei tarvita, eikä sinun tarvitse asettaa erillistä edustajaa Suomeen.' },
        { t: 'h3', x: 'EU:n ulkopuolelta tuleva' },
        { t: 'ul', items: [
          'Yrittäjäksi Suomeen muuttava tarvitsee oleskeluluvan, joka sallii yritystoiminnan. Maahanmuuttoviraston mukaan elinkeinonharjoittajan oleskeluluvassa yrityksen on oltava kannattava ja toimeentulosi on turvattava yritystoiminnan tuloilla. Kevytyrittäjänä tai laskutuspalvelun kautta tätä lupaa ei voi hakea.',
          'Kasvuyritykselle on erillinen startup-yrittäjän oleskelulupa. Sitä varten tarvitaan ensin Business Finlandin myönteinen lausunto.',
          'Jos asut jo Suomessa muulla oleskeluluvalla, tarkista Maahanmuuttovirastosta, salliiko lupasi yritystoiminnan vai tarvitsetko uuden luvan.',
          'Ukrainasta tullut, jolla on Maahanmuuttoviraston päätös tilapäisestä suojelusta, ei PRH:n mukaan tarvitse lupaa toiminimeen. Suomalainen henkilötunnus tulee päätöksen mukana.',
        ] },
        { t: 'note', x: 'Oleskelulupien ehdot, maksut ja käsittelyajat muuttuvat, ja ne ratkaistaan aina tapauskohtaisesti. Tarkista oma tilanteesi Maahanmuuttovirastosta ennen kuin teet sitoumuksia, kuten vuokrasopimuksia tai laitehankintoja.' },
        { t: 'h2', x: 'Kun asut ETA:n ulkopuolella: PRH:n luvat' },
        { t: 'h3', x: 'Toiminimi' },
        { t: 'p', x: 'Jos pysyvä asuinpaikkasi on ETA:n ulkopuolella, tarvitset PRH:n luvan ennen kuin voit tehdä toiminimen perustamisilmoituksen. Hakemus maksaa 150 euroa ja laskutuslisä 6,50 euroa. Tällöin toiminimi on pakko merkitä kaupparekisteriin, ja sillä on oltava Suomessa asuva edustaja, joka voi ottaa vastaan haasteita ja muita tiedoksiantoja. PRH kertoo myöntäneensä lupia käytännössä Sveitsissä pysyvästi asuville Luganon sopimuksen perusteella ja ratkaisevansa muut hakemukset vasta käsittelyssä. Esimerkiksi Venäjällä asuvan ei siis kannata rakentaa suunnitelmaa toiminimen varaan.' },
        { t: 'h3', x: 'Osakeyhtiö' },
        { t: 'ul', items: [
          'Osakeyhtiölain mukaan vähintään yhdellä hallituksen jäsenellä on oltava asuinpaikka ETA:ssa, jollei PRH myönnä poikkeusta. Jos hallituksessa on alle kolme jäsentä, sillä on oltava varajäsen.',
          'PRH:n käytännössä vähintään yhden varsinaisen jäsenen ja, jos varajäseniä on, myös vähintään yhden varajäsenen on asuttava ETA:ssa. Muuten lupa tarvitaan kaikille varsinaisille jäsenille tai kaikille varajäsenille.',
          'Toimitusjohtajan ja hänen mahdollisen sijaisensa on asuttava ETA:ssa tai heille on haettava PRH:n lupa.',
          'Lupahakemus maksaa 150 euroa ja 6,50 euron laskutuslisän henkilöä kohden. Kolmelle hallituksen jäsenelle maksu on siis 450 euroa ja laskutuslisät.',
          'PRH ei myönnä lupaa esimerkiksi, jos kaikki hallituksen jäsenet asuvat Venäjällä tai Australiassa, tai jos ainoa varsinainen jäsen asuu Australiassa ja varajäsen Suomessa. Suomessa asuva varajäsen ei siis yksin ratkaise asiaa.',
          'Yhtiöllä on oltava Suomessa asuva edustaja haasteita varten, ellei kaupparekisteriin ole merkitty ETA:ssa asuvaa hallituksen jäsentä, varajäsentä, toimitusjohtajaa, edustamiseen oikeutettua tai prokuristia.',
        ] },
        { t: 'h2', x: 'Y-tunnus ja rekisterit' },
        { t: 'ol', items: [
          'Toiminimi: Y-tunnuksen voi hakea OmaVerossa, jolloin yritys merkitään vain Verohallinnon rekistereihin. Kaupparekisteriin ilmoittautuminen YTJ-palvelussa maksaa 75 euroa, ja se on pakollinen, jos asut ETA:n ulkopuolella. Toiminimi voi edelleen tehdä ilmoituksen myös paperilomakkeella Y3.',
          'Osakeyhtiö perustetaan aina YTJ-palvelussa, ja vuodesta 2026 alkaen vain sähköisesti. Ohjattu perustaminen maksaa 300 euroa, mutta se edellyttää muun muassa, että kaikilla ilmoitettavilla henkilöillä on suomalainen henkilötunnus. Muuten käytetään tavallista perustamisilmoitusta, joka maksaa 400 euroa. Ilmoitus on tehtävä kolmen kuukauden kuluessa perustamissopimuksen allekirjoittamisesta, muuten perustaminen raukeaa.',
          'Ennakkoperintärekisteri: vapaaehtoinen, mutta ilman sitä asiakkaasi joutuu pidättämään työkorvauksesta veroa (yhtiöltä 13 %, verokortitta toimivalta yksityiseltä elinkeinonharjoittajalta 60 %). Aloittavan yrittäjän voi olla vaikea saada toimeksiantoja ilman rekisteriä.',
          'Arvonlisäverorekisteri: pakollinen, kun liikevaihto ylittää 20 000 euroa kalenterivuodessa. Vero on maksettava rajan ylittymisestä alkaen, joten ilmoittaudu hyvissä ajoin. Yleinen verokanta on 25,5 %. Alle rajan voit hakeutua rekisteriin vapaaehtoisesti.',
          'Työnantajarekisteri: kun maksat palkkaa säännöllisesti. Älä ilmoittaudu, jos yrityksessä työskentelevät vain sinä, puolisosi tai alle 15-vuotias lapsesi.',
        ] },
        { t: 'p', x: 'Sähköisesti tehdyllä ilmoituksella saat Y-tunnuksen heti. Rekisteröinti Verohallinnon rekistereihin kestää noin kolme viikkoa.' },
        { t: 'h2', x: 'Henkilötunnus ja sähköinen tunnistautuminen' },
        { t: 'p', x: 'Suomalainen henkilötunnus annetaan, kun sinut rekisteröidään väestötietojärjestelmään. Sitä voi pyytää tilanteen mukaan Digi- ja väestötietovirastosta, verotoimistosta, Suomen edustustosta ulkomailla tai Maahanmuuttovirastosta, ja rekisteröinti edellyttää henkilökohtaista käyntiä. Henkilötunnus tarvitaan esimerkiksi pankkitilin avaamiseen, ja suomalaiset vahvat tunnistusvälineet, kuten verkkopankkitunnukset ja mobiilivarmenne, ovat sidoksissa siihen.' },
        { t: 'p', x: 'Ilman suomalaisia tunnistusvälineitä asiointi on rajattua. Toisen EU-maan tunnistusvälineellä voi kirjautua vain palveluihin, jotka sen sallivat, eikä sinua silloin yhdistetä suomalaiseen henkilötunnukseen. OmaVerossa EU-maan tunnisteella voi lähettää yhteydenottopyynnön ja asioida rajatusti.' },
        { t: 'p', x: 'Kaupparekisteri-ilmoitukset ovat 1.1.2026 alkaen sähköisiä myös silloin, kun kenelläkään vastuuhenkilöllä ei ole suomalaista henkilötunnusta. PRH:n mukaan vaihtoehdot ovat nämä:' },
        { t: 'ul', items: [
          'Valtuutettu yhteyshenkilö, jolla on suomalainen henkilötunnus ja Suomi.fi-tunnistus, tekee ilmoituksen verkkolomakkeella. Liitteeksi tarvitaan valtakirja tai vastuuhenkilön allekirjoittama Y-lomake.',
          'Vastuuhenkilö, jolla on tunnistusväline tietystä EU-maasta, käyttää Ulkomaalaisen tunnistustapa -verkkolomaketta. Listalla ovat muun muassa Viro, Latvia, Liettua, Puola, Ruotsi ja Saksa.',
          'Suomen Asianajajien jäsen voi allekirjoittaa ilmoituksen YTJ-palvelussa.',
          'Postitse vain, jos mikään muu ei onnistu, ja mukaan selvitys siitä, miksi sähköinen ilmoitus ei ole mahdollinen.',
        ] },
        { t: 'h2', x: 'Yrityksen pankkitili' },
        { t: 'p', x: 'Pankit ovat rahanpesulain (444/2017) mukaan velvollisia tuntemaan asiakkaansa. Niiden on tunnistettava asiakas ja yrityksen tosiasialliset edunsaajat sekä selvitettävä toiminnan laatu ja laajuus ja varojen alkuperä. Kun omistajilla tai rahoilla on yhteyksiä ulkomaille, selvitys on usein tavallista perusteellisempi, ja tilin avaaminen voi kestää viikkoja.' },
        { t: 'ul', items: [
          'Varaa aikaa ja hae tiliä heti, kun sinulla on Y-tunnus. Ilman yritystiliä laskutuksen aloittaminen ja kirjanpito vaikeutuvat.',
          'Pidä valmiina passi, oleskelulupa tai oleskeluoikeuden rekisteröinti, Y-tunnus tai kaupparekisteriote, lyhyt kuvaus liiketoiminnasta ja asiakkaista sekä selvitys siitä, mistä yrityksen alkupääoma tulee.',
          'Vastaa pankin kysymyksiin täsmällisesti ja kirjallisesti. Epämääräinen vastaus pidentää käsittelyä.',
          'Pidä yrityksen ja omat rahat erillään alusta alkaen. Osakeyhtiössä tämä on välttämätöntä, ja toiminimessäkin se helpottaa kirjanpitoa ja verotusta.',
        ] },
        { t: 'h2', x: 'Verotus pääpiirteittäin' },
        { t: 'ul', items: [
          'Asut verotuksessa Suomessa, jos sinulla on täällä varsinainen asunto ja koti tai oleskelet täällä jatkuvasti yli kuusi kuukautta. Tilapäinen poissaolo ei katkaise oleskelua. Silloin maksat Suomeen veroa kaikista tuloistasi, myös ulkomaisista. Verosopimus voi vaikuttaa siihen, kumpi valtio saa verottaa.',
          'Toiminimen tulos on henkilökohtaista tuloasi, ja sitä verotetaan progressiivisesti. Itsellesi et voi maksaa palkkaa. Ennakkoveroa et saa automaattisesti, vaan sinun on haettava sitä itse OmaVerossa.',
          'Osakeyhtiö maksaa voitostaan 20 % yhteisöveroa. Henkilökohtaista veroa maksat, kun nostat yhtiöstä palkkaa tai osinkoa.',
          'YEL-vakuutus on pakollinen Suomessa asuvalle ja toimivalle yrittäjälle, ja myös EU- tai ETA-maassa asuvalle. Se on otettava kuuden kuukauden kuluessa toiminnan alkamisesta. Rajat ja maksut on koottu erilliseen YEL-oppaaseemme.',
          'Jos toimit Suomessa virolaisen OÜ:n kautta, verotus ja rekisteröinti menevät toisin. Siitä on oma oppaansa virolaisesta OÜ:sta Suomessa.',
        ] },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Yritys perustetaan ennen kuin oleskeluoikeus on selvillä. Y-tunnus ei anna oikeutta oleskella Suomessa.',
          'Oletetaan, että Suomen kansalaisuus tai Suomessa asuva varajäsen riittää. PRH:n luvan tarve määräytyy asuinpaikan ja hallituksen kokoonpanon mukaan.',
          'Ohjattu 300 euron perustaminen valitaan, vaikka jollakulla ei ole suomalaista henkilötunnusta.',
          'Perustamisilmoitus jää tekemättä kolmessa kuukaudessa perustamissopimuksesta, ja perustaminen raukeaa.',
          'Ennakkoveroa ei haeta, ja verot tulevat maksettavaksi kerralla jäännösverona.',
          'Arvonlisäverorekisteriin ilmoittaudutaan vasta, kun 20 000 euron raja on jo ylittynyt.',
          'Pankkitilin avaamiseen ei varata aikaa, ja ensimmäiset laskut maksetaan henkilökohtaiselle tilille.',
          'YEL-vakuutus unohtuu, koska oletetaan sen koskevan vain suomalaisia.',
        ] },
        { t: 'h2', x: 'Muistilista vaihe vaiheelta' },
        { t: 'ol', items: [
          'Selvitä oleskeluoikeutesi: EU- tai ETA-kansalaisena rekisteröinti Maahanmuuttovirastossa, muuten yritystoiminnan sallivan oleskeluluvan tarve.',
          'Valitse yritysmuoto: toiminimi vai osakeyhtiö.',
          'Tarkista, missä sinä ja muut vastuuhenkilöt asutte. Hae PRH:n lupa ja nimeä edustaja Suomessa, jos tarvitaan.',
          'Hanki suomalainen henkilötunnus, jos asut Suomessa, ja vahva tunnistusväline. Muuten päätä, kuka tekee ilmoitukset puolestasi.',
          'Tee perustamisilmoitus ja ilmoittaudu samalla tarvittaviin rekistereihin: ennakkoperintä, alv ja työnantaja.',
          'Avaa yrityksen pankkitili ja varaa sille aikaa.',
          'Hae ennakkovero OmaVerossa arvioidun tuloksen perusteella.',
          'Ota YEL-vakuutus kuuden kuukauden kuluessa ja harkitse muut vakuutukset.',
          'Järjestä kirjanpito ennen ensimmäistä laskua ja säilytä kaikki tositteet.',
        ] },
        { t: 'note', x: 'Tiedot on tarkistettu marraskuussa 2026: PRH:n perustamismaksut 75 euroa (toiminimi), 300 tai 400 euroa (osakeyhtiö) ja ETA:n ulkopuolella asuvan lupahakemus 150 euroa ja 6,50 euron laskutuslisä, alv-rekisteröinnin raja 20 000 euroa ja yhteisövero 20 %. Lähteet: elinkeinotoimintalaki (565/2023), osakeyhtiölaki (624/2006), tuloverolaki (1535/1992), rahanpesulaki (444/2017), PRH, Verohallinto ja Suomi.fi. Oleskeluluvista päättää Maahanmuuttovirasto.' },
        { t: 'h2', x: 'Autamme aloittamaan oikein' },
        { t: 'p', x: 'Tilitoimisto Debit Credit auttaa ulkomaalaisia yrittäjiä valitsemaan yritysmuodon, tekemään perustamisilmoituksen ja rekisteröinnit sekä hakemaan ennakkoveron. Hoidamme kirjanpidon, alv-ilmoitukset ja tilinpäätöksen, ja asiakkaamme voivat toimittaa kuitit Vaavo-sovelluksen kautta. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä jo ennen perustamista, niin käydään vaiheet läpi yhdessä.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'PRH: lupa ETA:n ulkopuolella asuvalle toiminimiyrittäjälle', href: SRC.traderPermitFi },
          { label: 'PRH: luvat ETA:n ulkopuolella asuville (osakeyhtiö)', href: SRC.oyPermitFi },
          { label: 'PRH: kaupparekisteri-ilmoitus, kun suomalaista tunnistusta ei ole', href: SRC.noLoginFi },
          { label: 'PRH: perustamisilmoitusten käsittelymaksut', href: SRC.feesFi },
          { label: 'PRH: toiminimiyrittäjän perustamisilmoitus', href: SRC.traderFi },
          { label: 'Verohallinto: perustamisilmoitus ja rekisteröinnit', href: SRC.startFi },
          { label: 'Verohallinto: yrityksen perustajan muistilista', href: SRC.checklistFi },
          { label: 'Verohallinto: alv-rekisteröinti', href: SRC.vatFi },
          { label: 'Verohallinto: ennakkoperintärekisteri', href: SRC.prepayFi },
          { label: 'Verohallinto: yleinen ja rajoitettu verovelvollisuus', href: SRC.residencyFi },
          { label: 'Suomi.fi: henkilötunnus', href: SRC.hetuFi },
          { label: 'Finlex: elinkeinotoimintalaki (565/2023)', href: SRC.etl },
          { label: 'Finlex: osakeyhtiölaki (624/2006)', href: SRC.oyl },
          { label: 'Finlex: tuloverolaki (1535/1992), 11 §', href: SRC.tvl },
          { label: 'Finlex: rahanpesulaki (444/2017)', href: SRC.aml },
        ] },
      ],
      faq: [
        { q: 'Tarvitseeko EU-kansalainen oleskeluluvan ollakseen yrittäjä Suomessa?', a: 'Ei tarvitse. Jos oleskelet Suomessa yli kolme kuukautta, rekisteröi oleskeluoikeutesi Maahanmuuttovirastossa. Yrityksen voit perustaa samoin kuin suomalainen, ja ETA:ssa asuva ei tarvitse PRH:n lupaa.' },
        { q: 'Voinko perustaa toiminimen Suomeen, jos asun Venäjällä?', a: 'Tarvitset ensin PRH:n luvan (150 euroa ja 6,50 euron laskutuslisä), kaupparekisteriin merkinnän ja Suomessa asuvan edustajan. PRH kertoo myöntäneensä lupia käytännössä Sveitsissä asuville ja ratkaisevan muut hakemukset tapauskohtaisesti, joten myönteiseen päätökseen ei kannata luottaa. Suomeen muuttamiseen tarvitset lisäksi oleskeluluvan.' },
        { q: 'Voiko osakeyhtiön perustaa ilman suomalaista henkilötunnusta?', a: 'Voi, mutta ohjattu 300 euron perustaminen ei silloin käy. Tehdään tavallinen 400 euron perustamisilmoitus, jonka voi PRH:n mukaan tehdä valtuutettu yhteyshenkilö, vastuuhenkilö tietyn EU-maan (esimerkiksi Viron) tunnistusvälineellä tai suomalainen asianajaja. Lisäksi vähintään yhden hallituksen jäsenen ja toimitusjohtajan on asuttava ETA:ssa tai heille tarvitaan PRH:n lupa.' },
        { q: 'Milloin minun on ilmoittauduttava arvonlisäverorekisteriin?', a: 'Kun liikevaihto ylittää 20 000 euroa kalenterivuodessa. Vero on maksettava rajan ylittymisestä alkaen, joten ilmoittaudu ennen kuin raja ylittyy. Rekisteriin voi hakeutua myös vapaaehtoisesti.' },
        { q: 'Milloin maksan veroa Suomeen kaikista tuloistani?', a: 'Kun sinulla on Suomessa varsinainen asunto ja koti tai oleskelet täällä jatkuvasti yli kuusi kuukautta. Lyhyet matkat ulkomaille eivät katkaise oleskelua. Verosopimus voi rajoittaa Suomen verotusoikeutta.' },
      ],
    },
    ru: {
      title: 'Иностранный предприниматель в Финляндии: Y-tunnus, вид на жительство, банковский счёт и налоги',
      description:
        'Как иностранцу открыть toiminimi или Oy в Финляндии в 2026 году: ВНЖ, проживание в ЕЭЗ, разрешение PRH, Y-tunnus, банковский счёт и налоги.',
      lead: 'Открыть фирму в Финляндии может и иностранец, но на пути два отдельных вопроса: можете ли вы жить и работать в Финляндии и можете ли вы вести предпринимательскую деятельность и зарегистрировать компанию. На первый отвечает Миграционная служба (Maahanmuuttovirasto, Migri), на второй — Патентно-регистрационное ведомство (PRH) и Налоговая (Verohallinto). Собрали правила, сборы и пошаговый список на 2026 год.',
      body: [
        { t: 'h2', x: 'Кто может открыть фирму в Финляндии' },
        { t: 'p', x: 'По закону о предпринимательской деятельности (elinkeinotoimintalaki 565/2023) право вести бизнес зависит от места проживания, а не от гражданства. Физическое лицо, которое живёт в Европейской экономической зоне (ЕЭЗ), может вести деятельность без особого разрешения. Живущему за пределами ЕЭЗ нужно разрешение PRH. Право на пребывание — отдельный вопрос, его решает Migri.' },
        { t: 'h3', x: 'Граждане ЕС и ЕЭЗ' },
        { t: 'p', x: 'Гражданину страны ЕС или ЕЭЗ не нужен вид на жительство, чтобы быть предпринимателем в Финляндии. Если вы находитесь в Финляндии дольше трёх месяцев, зарегистрируйте право на пребывание в Migri. Если вы живёте, например, в Эстонии и открываете toiminimi в Финляндии, ваше место жительства находится в ЕЭЗ: разрешение PRH не нужно, и отдельного представителя в Финляндии назначать не требуется.' },
        { t: 'h3', x: 'Граждане стран вне ЕС' },
        { t: 'ul', items: [
          'Для переезда в Финляндию в качестве предпринимателя нужен вид на жительство, который разрешает предпринимательскую деятельность. По данным Migri, для разрешения предпринимателю (elinkeinonharjoittaja) бизнес должен быть прибыльным, а ваши средства к существованию — обеспечены доходом от него. Как kevytyrittäjä или через сервис выставления счетов это разрешение получить нельзя.',
          'Для быстрорастущих компаний есть отдельное разрешение стартап-предпринимателя. Сначала для него нужно положительное заключение Business Finland.',
          'Если вы уже живёте в Финляндии по другому разрешению, уточните в Migri, позволяет ли оно вести бизнес или нужно новое разрешение.',
          'Приехавшим из Украины, у которых есть решение Migri о временной защите, разрешение PRH на toiminimi не нужно — так указывает PRH. Финский личный код (henkilötunnus) выдаётся вместе с решением.',
        ] },
        { t: 'note', x: 'Условия, сборы и сроки рассмотрения видов на жительство меняются, и решение всегда принимается индивидуально. Проверьте свою ситуацию в Migri до того, как брать на себя обязательства — подписывать договор аренды или покупать оборудование.' },
        { t: 'h2', x: 'Если вы живёте вне ЕЭЗ: разрешения PRH' },
        { t: 'h3', x: 'Toiminimi (индивидуальный предприниматель)' },
        { t: 'p', x: 'Если ваше постоянное место жительства находится за пределами ЕЭЗ, разрешение PRH нужно получить до подачи заявления о регистрации toiminimi. Заявление стоит 150 € плюс 6,50 € за выставление счёта. В этом случае toiminimi обязательно вносится в торговый реестр, и у него должен быть представитель, живущий в Финляндии, который принимает повестки и другие уведомления. PRH сообщает, что на практике выдавал такие разрешения жителям Швейцарии на основании Луганской конвенции, а остальные заявления решает только при рассмотрении. Поэтому, например, живущему в России не стоит строить планы на toiminimi.' },
        { t: 'h3', x: 'Osakeyhtiö (Oy)' },
        { t: 'ul', items: [
          'По закону об акционерных обществах хотя бы один член правления должен жить в ЕЭЗ, если PRH не разрешит исключение. Если в правлении меньше трёх членов, в нём должен быть заместитель (varajäsen).',
          'На практике PRH требует, чтобы в ЕЭЗ жил хотя бы один основной член правления и, если есть заместители, хотя бы один заместитель. Иначе разрешение нужно всем основным членам или всем заместителям.',
          'Управляющий директор (toimitusjohtaja) и его возможный заместитель должны жить в ЕЭЗ, иначе для них нужно разрешение PRH.',
          'Заявление на разрешение стоит 150 € и 6,50 € за счёт на каждого человека. Для трёх членов правления — 450 € плюс сборы за счета.',
          'PRH не выдаёт разрешение, например, если все члены правления живут в России или Австралии или если единственный основной член живёт в Австралии, а заместитель в Финляндии. Заместитель из Финляндии сам по себе проблему не решает.',
          'У компании должен быть представитель с местом жительства в Финляндии для получения повесток, если в торговом реестре нет живущего в ЕЭЗ члена правления, заместителя, управляющего директора, лица с правом подписи или прокуриста.',
        ] },
        { t: 'h2', x: 'Y-tunnus и регистры' },
        { t: 'ol', items: [
          'Toiminimi: Y-tunnus можно получить в OmaVero — тогда фирма вносится только в регистры Налоговой. Регистрация в торговом реестре через сервис YTJ стоит 75 € и обязательна, если вы живёте вне ЕЭЗ. Toiminimi по-прежнему может подать заявление и на бумажной форме Y3.',
          'Osakeyhtiö всегда регистрируется в YTJ, а с 2026 года — только в электронном виде. Управляемая регистрация стоит 300 €, но требует, среди прочего, чтобы у всех указываемых лиц был финский henkilötunnus. Иначе подаётся обычное заявление за 400 €. Его нужно подать в течение трёх месяцев после подписания учредительного договора, иначе учреждение компании аннулируется.',
          'Реестр предоплаты налогов (ennakkoperintärekisteri): добровольный, но без него заказчик обязан удерживать налог из оплаты работы (у компании — 13 %, у частного предпринимателя без налоговой карточки — 60 %). Начинающему предпринимателю без этого реестра бывает трудно получить заказы.',
          'Реестр НДС (ALV): обязателен, если оборот превышает 20 000 € за календарный год. Налог платится с момента превышения порога, поэтому регистрируйтесь заранее. Общая ставка — 25,5 %. При меньшем обороте можно встать в реестр добровольно.',
          'Реестр работодателей: если вы регулярно платите зарплату. Не регистрируйтесь, если в фирме работаете только вы, ваш супруг или ребёнок младше 15 лет.',
        ] },
        { t: 'p', x: 'При электронной подаче Y-tunnus выдаётся сразу. Внесение в регистры Налоговой занимает около трёх недель.' },
        { t: 'h2', x: 'Henkilötunnus и электронная идентификация' },
        { t: 'p', x: 'Финский личный код (henkilötunnus) присваивается при внесении в реестр населения. В зависимости от ситуации его можно запросить в Агентстве цифровизации и данных о населении (DVV), в налоговой, в финском представительстве за рубежом или в Migri; нужен личный визит. Henkilötunnus необходим, например, для открытия банковского счёта, а финские средства сильной идентификации — банковские коды и мобильный сертификат — привязаны к нему.' },
        { t: 'p', x: 'Без финских средств идентификации возможности ограничены. Электронным удостоверением другой страны ЕС можно войти только в те сервисы, которые это допускают, и вас при этом не свяжут с финским henkilötunnus. В OmaVero с идентификатором страны ЕС можно отправить запрос и пользоваться сервисом в ограниченном объёме.' },
        { t: 'p', x: 'С 1.1.2026 заявления в торговый реестр подаются только электронно, даже если ни у одного ответственного лица нет финского henkilötunnus. По данным PRH, есть такие варианты:' },
        { t: 'ul', items: [
          'Уполномоченное контактное лицо с финским henkilötunnus и идентификацией Suomi.fi подаёт заявление через веб-форму. Прикладывается доверенность или форма Y, подписанная ответственным лицом.',
          'Ответственное лицо со средством идентификации определённой страны ЕС использует веб-форму «Ulkomaalaisen tunnistustapa». В списке, среди прочих, Эстония, Латвия, Литва, Польша, Швеция и Германия.',
          'Член Коллегии адвокатов Финляндии (Suomen Asianajajat) может подписать заявление в YTJ.',
          'По почте — только если ничего другое невозможно, с объяснением, почему электронная подача недоступна.',
        ] },
        { t: 'h2', x: 'Банковский счёт фирмы' },
        { t: 'p', x: 'По закону о противодействии отмыванию денег (rahanpesulaki 444/2017) банки обязаны знать своих клиентов. Они должны идентифицировать клиента и фактических бенефициаров компании, выяснить характер и масштаб деятельности и происхождение средств. Если у владельцев или денег есть связи с другими странами, проверка обычно тщательнее, и открытие счёта может занять несколько недель.' },
        { t: 'ul', items: [
          'Заложите время и подавайте заявку сразу после получения Y-tunnus. Без счёта фирмы сложно начать выставлять счета и вести бухгалтерию.',
          'Подготовьте паспорт, вид на жительство или регистрацию права на пребывание, Y-tunnus или выписку из торгового реестра, краткое описание бизнеса и клиентов, а также объяснение, откуда взялся стартовый капитал.',
          'Отвечайте на вопросы банка точно и письменно. Размытые ответы затягивают проверку.',
          'С самого начала держите деньги фирмы и личные деньги раздельно. В Oy это обязательно, а в toiminimi сильно упрощает бухгалтерию и налоги.',
        ] },
        { t: 'h2', x: 'Налоги в общих чертах' },
        { t: 'ul', items: [
          'Вы считаетесь налоговым резидентом Финляндии, если у вас здесь постоянное жильё и дом или вы непрерывно находитесь здесь больше шести месяцев. Временные отъезды пребывание не прерывают. Тогда вы платите в Финляндии налог со всех доходов, в том числе зарубежных. Налоговое соглашение может определить, какое государство вправе облагать доход.',
          'Прибыль toiminimi — ваш личный доход, он облагается по прогрессивной шкале. Платить зарплату самому себе нельзя. Авансовый налог (ennakkovero) не назначается автоматически — его нужно запросить самому в OmaVero.',
          'Osakeyhtiö платит с прибыли 20 % налога на прибыль (yhteisövero). Личный налог вы платите, когда получаете из компании зарплату или дивиденды.',
          'Страхование YEL обязательно для предпринимателя, который живёт и работает в Финляндии, а также для живущего в стране ЕС или ЕЭЗ. Оформить его нужно в течение шести месяцев с начала деятельности. Лимиты и взносы — в нашем отдельном гиде по YEL.',
          'Если вы работаете в Финляндии через эстонскую OÜ, налоги и регистрация устроены иначе — об этом у нас есть отдельный гид про эстонскую OÜ в Финляндии.',
        ] },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Фирму открывают до того, как ясно с правом на пребывание. Y-tunnus не даёт права жить в Финляндии.',
          'Считают, что достаточно финского гражданства или заместителя в правлении, который живёт в Финляндии. Нужно ли разрешение PRH, зависит от места жительства и состава правления.',
          'Выбирают управляемую регистрацию за 300 €, хотя у кого-то из участников нет финского henkilötunnus.',
          'Не подают заявление в течение трёх месяцев после учредительного договора, и учреждение аннулируется.',
          'Не запрашивают ennakkovero, и налог приходится платить разом как доплату (jäännösvero).',
          'Встают в реестр НДС, когда порог 20 000 € уже превышен.',
          'Не закладывают время на банковский счёт, и первые оплаты приходят на личный счёт.',
          'Забывают про YEL, думая, что оно касается только финнов.',
        ] },
        { t: 'h2', x: 'Пошаговый список' },
        { t: 'ol', items: [
          'Выясните своё право на пребывание: для граждан ЕС и ЕЭЗ — регистрация в Migri, для остальных — нужен ли вид на жительство, разрешающий бизнес.',
          'Выберите форму: toiminimi или osakeyhtiö.',
          'Проверьте, где живёте вы и другие ответственные лица. При необходимости получите разрешение PRH и назначьте представителя в Финляндии.',
          'Если вы живёте в Финляндии, получите henkilötunnus и средство сильной идентификации. Иначе решите, кто будет подавать заявления за вас.',
          'Подайте заявление о регистрации и сразу встаньте в нужные регистры: предоплаты, НДС и работодателей.',
          'Откройте банковский счёт фирмы, заложив на это время.',
          'Запросите ennakkovero в OmaVero по оценке прибыли.',
          'Оформите YEL в течение шести месяцев и продумайте остальные страховки.',
          'Наладьте бухгалтерию до первого счёта и сохраняйте все документы.',
        ] },
        { t: 'note', x: 'Данные проверены в ноябре 2026 года: сборы PRH — 75 € (toiminimi), 300 или 400 € (Oy), разрешение для живущих вне ЕЭЗ — 150 € и 6,50 € за счёт, порог регистрации НДС — 20 000 €, налог на прибыль компании — 20 %. Источники: закон о предпринимательской деятельности (565/2023), закон об акционерных обществах (624/2006), закон о подоходном налоге (1535/1992), закон о противодействии отмыванию денег (444/2017), PRH, Verohallinto и Suomi.fi. Решения о видах на жительство принимает Migri.' },
        { t: 'h2', x: 'Поможем начать правильно' },
        { t: 'p', x: 'Tilitoimisto Debit Credit помогает иностранным предпринимателям выбрать форму компании, подать заявление о регистрации и встать в регистры, а также запросить ennakkovero. Мы ведём бухгалтерию, подаём декларации по НДС и составляем годовую отчётность, а наши клиенты могут передавать чеки через приложение Vaavo. Работаем на русском и финском. Свяжитесь с нами ещё до регистрации — пройдём все шаги вместе.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'PRH: разрешение для частного предпринимателя, живущего вне ЕЭЗ (на английском)', href: SRC.traderPermitEn },
          { label: 'PRH: разрешения для живущих вне ЕЭЗ — Oy (на английском)', href: SRC.oyPermitEn },
          { label: 'PRH: подача в торговый реестр без финской идентификации (на финском)', href: SRC.noLoginFi },
          { label: 'PRH: сборы за регистрацию (на английском)', href: SRC.feesEn },
          { label: 'Verohallinto: заявление о регистрации и регистры (на английском)', href: SRC.startEn },
          { label: 'Verohallinto: памятка для основателя фирмы (на английском)', href: SRC.checklistEn },
          { label: 'Verohallinto: регистрация плательщиком НДС (на английском)', href: SRC.vatEn },
          { label: 'Verohallinto: реестр предоплаты налогов (на английском)', href: SRC.prepayEn },
          { label: 'Verohallinto: налоговое резидентство (на английском)', href: SRC.residencyEn },
          { label: 'Verohallinto: OmaVero для иностранцев (на английском)', href: SRC.myTaxForeignEn },
          { label: 'Finlex: закон о предпринимательской деятельности (565/2023)', href: SRC.etl },
          { label: 'Finlex: закон об акционерных обществах (624/2006)', href: SRC.oyl },
          { label: 'Finlex: закон о подоходном налоге (1535/1992), § 11', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Нужен ли гражданину ЕС вид на жительство, чтобы быть предпринимателем в Финляндии?', a: 'Нет. Если вы находитесь в Финляндии больше трёх месяцев, зарегистрируйте право на пребывание в Migri. Фирму можно открыть так же, как финну, а живущему в ЕЭЗ разрешение PRH не нужно.' },
        { q: 'Можно ли открыть toiminimi в Финляндии, если я живу в России?', a: 'Сначала нужно разрешение PRH (150 € и 6,50 € за счёт), внесение в торговый реестр и представитель, живущий в Финляндии. PRH сообщает, что на практике выдавал разрешения жителям Швейцарии, а остальные заявления решает индивидуально, поэтому рассчитывать на положительное решение не стоит. Для переезда в Финляндию нужен ещё и вид на жительство.' },
        { q: 'Можно ли открыть osakeyhtiö без финского henkilötunnus?', a: 'Можно, но управляемая регистрация за 300 € тогда не подходит. Подаётся обычное заявление за 400 €; по данным PRH, его может подать уполномоченное контактное лицо, ответственное лицо со средством идентификации определённой страны ЕС (например, Эстонии) или финский адвокат. Кроме того, хотя бы один член правления и управляющий директор должны жить в ЕЭЗ, иначе нужно разрешение PRH.' },
        { q: 'Когда нужно вставать в реестр НДС?', a: 'Когда оборот превышает 20 000 € за календарный год. Налог платится с момента превышения порога, поэтому регистрируйтесь заранее. Встать в реестр можно и добровольно.' },
        { q: 'Когда я плачу в Финляндии налог со всех своих доходов?', a: 'Когда у вас в Финляндии постоянное жильё и дом или вы непрерывно находитесь здесь больше шести месяцев. Короткие поездки за границу пребывание не прерывают. Налоговое соглашение может ограничить право Финляндии на налогообложение.' },
      ],
    },
    en: {
      title: 'Foreign entrepreneur in Finland: Business ID, residence permit, bank account and taxes',
      description:
        'How a foreigner sets up a sole trader business or limited company in Finland in 2026: residence permit, EEA residence, PRH permit, Business ID and taxes.',
      lead: 'Foreign nationals can start a business in Finland too, but there are two separate questions along the way: may you live and work in Finland, and may you carry on a business and register a company. The Finnish Immigration Service (Migri) answers the first, the Finnish Patent and Registration Office (PRH) and the Tax Administration the second. We have gathered the 2026 rules, fees and a checklist.',
      body: [
        { t: 'h2', x: 'Who may start a business in Finland?' },
        { t: 'p', x: 'Under the Business Operations Act (elinkeinotoimintalaki 565/2023), the right to carry on a business depends on where you live, not on your citizenship. A natural person resident in the European Economic Area (EEA) may do business without a separate permit. Someone living outside the EEA needs a permit from PRH. The right to stay in Finland is a different matter, decided by Migri.' },
        { t: 'h3', x: 'EU and EEA citizens' },
        { t: 'p', x: 'A citizen of an EU or EEA country does not need a residence permit to work as an entrepreneur in Finland. If you stay in Finland for more than three months, register your right of residence with Migri. If you live in Estonia, for example, and set up a sole trader business (toiminimi) in Finland, your residence is in the EEA: you need no PRH permit and no separate representative in Finland.' },
        { t: 'h3', x: 'Coming from outside the EU' },
        { t: 'ul', items: [
          'If you move to Finland to be an entrepreneur, you need a residence permit that allows business activity. According to Migri, for the residence permit for a self-employed person the business must be profitable and your livelihood must be secured by income from it. You cannot apply for this permit as a light entrepreneur (kevytyrittäjä) working through an invoicing service.',
          'Growth companies have a separate start-up permit. It first requires a positive eligibility statement from Business Finland.',
          'If you already live in Finland on another permit, check with Migri whether your permit allows business activity or whether you need a new one.',
          'According to PRH, people from Ukraine who have Migri’s decision on temporary protection do not need a PRH permit for a sole trader business. The Finnish personal identity code comes with the decision.',
        ] },
        { t: 'note', x: 'Conditions, fees and processing times for residence permits change, and every case is decided individually. Check your own situation with Migri before you commit to anything such as a lease or equipment purchases.' },
        { t: 'h2', x: 'Living outside the EEA: PRH permits' },
        { t: 'h3', x: 'Sole trader (toiminimi)' },
        { t: 'p', x: 'If your permanent residence is outside the EEA, you need a PRH permit before you can file the start-up notification for a sole trader business. The application costs 150 euros plus a 6.50 euro invoicing charge. The business must then be entered in the Trade Register, and it needs a representative living in Finland who can receive summonses and other notices. PRH says that in practice it has granted these permits to people living permanently in Switzerland, based on the Lugano Convention, and that it decides other applications only when processing them. Someone living in Russia, for example, should not build their plan on a sole trader business.' },
        { t: 'h3', x: 'Limited company (osakeyhtiö, Oy)' },
        { t: 'ul', items: [
          'Under the Limited Liability Companies Act, at least one board member must reside in the EEA unless PRH grants an exemption. A board with fewer than three members must have a deputy member.',
          'In PRH’s practice, at least one ordinary member and, if there are deputies, at least one deputy must live in the EEA. Otherwise a permit is needed for all ordinary members or all deputies.',
          'The managing director and any substitute must live in the EEA, or a PRH permit must be applied for.',
          'A permit application costs 150 euros plus a 6.50 euro invoicing charge per person. For three board members that is 450 euros plus the invoicing charges.',
          'PRH does not grant a permit if, for example, all board members live in Russia or Australia, or if the only ordinary member lives in Australia and the deputy in Finland. A deputy living in Finland does not solve the problem on its own.',
          'The company must have a representative living in Finland to receive summonses, unless an EEA-resident board member, deputy, managing director, authorised signatory or procurator is entered in the Trade Register.',
        ] },
        { t: 'h2', x: 'Business ID and registers' },
        { t: 'ol', items: [
          'Sole trader: you can get a Business ID (Y-tunnus) in MyTax (OmaVero), in which case the business is entered only in the Tax Administration’s registers. Registering in the Trade Register through the YTJ service costs 75 euros, and it is compulsory if you live outside the EEA. A sole trader can still file on paper form Y3.',
          'A limited company is always set up in the YTJ service, and from 2026 only electronically. The guided set-up costs 300 euros but requires, among other things, that every person named has a Finnish personal identity code. Otherwise you file the regular start-up notification for 400 euros. It must be filed within three months of signing the memorandum of association, or the formation lapses.',
          'Prepayment register: voluntary, but without it your customers must withhold tax from payments for work (13 % from a company, 60 % from a sole trader without a tax card). A new entrepreneur may find it hard to get assignments without it.',
          'VAT register: compulsory when turnover exceeds 20,000 euros in a calendar year. VAT is due from the moment the threshold is exceeded, so register in good time. The general rate is 25.5 %. Below the threshold you can register voluntarily.',
          'Employer register: when you pay wages regularly. Do not register if the only people working in the business are you, your spouse or your child under 15.',
        ] },
        { t: 'p', x: 'If you file electronically, you get the Business ID at once. Entry in the Tax Administration’s registers takes about three weeks.' },
        { t: 'h2', x: 'Personal identity code and e-identification' },
        { t: 'p', x: 'A Finnish personal identity code (henkilötunnus) is issued when you are entered in the Population Information System. Depending on your situation you can request it from the Digital and Population Data Services Agency (DVV), a tax office, a Finnish mission abroad or Migri, and you must visit in person. The code is needed, for example, to open a bank account, and Finnish strong identification methods, such as online banking codes and mobile certificates, are tied to it.' },
        { t: 'p', x: 'Without Finnish identification your options are limited. An e-ID from another EU country only works in services that accept it, and you are then not linked to a Finnish personal identity code. In MyTax, an EU e-ID lets you send a contact request and use the service in a limited scope.' },
        { t: 'p', x: 'Since 1 January 2026, Trade Register filings must be electronic even when none of the responsible persons has a Finnish personal identity code. According to PRH, the options are:' },
        { t: 'ul', items: [
          'An authorised contact person with a Finnish personal identity code and Suomi.fi identification files on the web form, with a power of attorney or a Y form signed by a responsible person attached.',
          'A responsible person with an e-ID from certain EU countries uses the web form for foreign identification (Ulkomaalaisen tunnistustapa). The list includes Estonia, Latvia, Lithuania, Poland, Sweden and Germany, among others.',
          'A member of the Finnish Bar Association (Suomen Asianajajat) can sign the filing in the YTJ service.',
          'By post only if nothing else is possible, with an explanation of why electronic filing cannot be done.',
        ] },
        { t: 'h2', x: 'Business bank account' },
        { t: 'p', x: 'Under the Anti-Money Laundering Act (rahanpesulaki 444/2017), banks must know their customers. They have to identify the customer and the company’s beneficial owners and find out the nature and scale of the business and the origin of the funds. When the owners or the money have ties abroad, the checks are often more thorough, and opening an account can take weeks.' },
        { t: 'ul', items: [
          'Allow time and apply as soon as you have the Business ID. Without a business account it is hard to start invoicing and keep the books.',
          'Have ready your passport, residence permit or registration of right of residence, Business ID or Trade Register extract, a short description of the business and its customers, and an explanation of where the start-up capital comes from.',
          'Answer the bank’s questions precisely and in writing. Vague answers prolong the review.',
          'Keep business and personal money apart from day one. In a limited company this is essential, and in a sole trader business it makes bookkeeping and tax much easier.',
        ] },
        { t: 'h2', x: 'Taxation in brief' },
        { t: 'ul', items: [
          'You are resident in Finland for tax purposes if you have your actual home here or stay here continuously for more than six months. Temporary absences do not break the stay. You then pay Finnish tax on all your income, including income from abroad. A tax treaty may decide which country has the right to tax.',
          'A sole trader’s profit is your personal income and is taxed progressively. You cannot pay yourself a salary. Prepayment tax is not imposed automatically: you must apply for it yourself in MyTax.',
          'A limited company pays 20 % corporate income tax on its profit. You pay personal tax when you take a salary or dividends from the company.',
          'YEL pension insurance is compulsory for an entrepreneur who lives and works in Finland, and also for one living in an EU or EEA country. It must be taken out within six months of starting. Limits and contributions are in our separate YEL guide.',
          'If you work in Finland through an Estonian OÜ, registration and taxation work differently. We cover that in a separate guide on Estonian OÜs in Finland.',
        ] },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'Setting up the business before the right of residence is clear. A Business ID does not give you the right to live in Finland.',
          'Assuming that Finnish citizenship or a deputy board member living in Finland is enough. Whether a PRH permit is needed depends on residence and the composition of the board.',
          'Choosing the 300 euro guided set-up although someone has no Finnish personal identity code.',
          'Missing the three-month deadline after the memorandum of association, so the formation lapses.',
          'Not applying for prepayment tax, so the tax falls due in one go as back taxes.',
          'Registering for VAT only after the 20,000 euro threshold has already been exceeded.',
          'Not allowing time for the bank account, so the first customer payments go to a personal account.',
          'Forgetting YEL in the belief that it only concerns Finns.',
        ] },
        { t: 'h2', x: 'Step-by-step checklist' },
        { t: 'ol', items: [
          'Clarify your right of residence: registration with Migri for EU and EEA citizens, otherwise whether you need a residence permit that allows business activity.',
          'Choose the business form: sole trader or limited company.',
          'Check where you and the other responsible persons live. Apply for a PRH permit and appoint a representative in Finland if needed.',
          'If you live in Finland, get a personal identity code and a strong identification method. Otherwise decide who will file on your behalf.',
          'File the start-up notification and register at the same time for the registers you need: prepayment, VAT and employer.',
          'Open the business bank account and allow time for it.',
          'Apply for prepayment tax in MyTax based on your estimated profit.',
          'Take out YEL within six months and consider other insurance.',
          'Arrange bookkeeping before the first invoice and keep all receipts.',
        ] },
        { t: 'note', x: 'Information checked in November 2026: PRH start-up fees 75 euros (sole trader), 300 or 400 euros (limited company), permit for persons living outside the EEA 150 euros plus a 6.50 euro invoicing charge, VAT registration threshold 20,000 euros and corporate income tax 20 %. Sources: Business Operations Act (565/2023), Limited Liability Companies Act (624/2006), Income Tax Act (1535/1992), Anti-Money Laundering Act (444/2017), PRH, the Tax Administration and Suomi.fi. Residence permits are decided by Migri.' },
        { t: 'h2', x: 'We help you start right' },
        { t: 'p', x: 'Tilitoimisto Debit Credit helps foreign entrepreneurs choose the business form, file the start-up notification and registrations and apply for prepayment tax. We keep the books, file the VAT returns and prepare the financial statements, and our clients can send their receipts through the Vaavo app. We work in Finnish and Russian. Get in touch before you register, and we will go through the steps together.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'PRH: permit for a sole trader living outside the EEA', href: SRC.traderPermitEn },
          { label: 'PRH: permits for persons living outside the EEA (limited company)', href: SRC.oyPermitEn },
          { label: 'PRH: Trade Register filing without Finnish identification (in Finnish)', href: SRC.noLoginFi },
          { label: 'PRH: start-up fees', href: SRC.feesEn },
          { label: 'PRH: start-up notification for a private trader', href: SRC.traderEn },
          { label: 'Tax Administration: start-up notification and registers', href: SRC.startEn },
          { label: 'Tax Administration: tax guide for new entrepreneurs', href: SRC.checklistEn },
          { label: 'Tax Administration: VAT registration', href: SRC.vatEn },
          { label: 'Tax Administration: prepayment register', href: SRC.prepayEn },
          { label: 'Tax Administration: residency and nonresidency in Finland', href: SRC.residencyEn },
          { label: 'Tax Administration: using MyTax as a foreign individual', href: SRC.myTaxForeignEn },
          { label: 'Finlex: Business Operations Act (565/2023), in Finnish', href: SRC.etl },
          { label: 'Finlex: Limited Liability Companies Act (624/2006), in Finnish', href: SRC.oyl },
          { label: 'Finlex: Income Tax Act (1535/1992), section 11, in Finnish', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Does an EU citizen need a residence permit to be an entrepreneur in Finland?', a: 'No. If you stay in Finland for more than three months, register your right of residence with Migri. You can set up a business in the same way as a Finn, and if you live in the EEA you need no PRH permit.' },
        { q: 'Can I set up a sole trader business in Finland if I live in Russia?', a: 'You first need a PRH permit (150 euros plus a 6.50 euro invoicing charge), an entry in the Trade Register and a representative living in Finland. PRH says it has granted permits in practice to people living in Switzerland and decides other applications case by case, so do not count on a positive decision. To move to Finland you also need a residence permit.' },
        { q: 'Can I set up a limited company without a Finnish personal identity code?', a: 'Yes, but the 300 euro guided set-up is then not available. You file the regular 400 euro start-up notification, which according to PRH can be done by an authorised contact person, by a responsible person with an e-ID from certain EU countries (such as Estonia) or by a Finnish attorney. In addition, at least one board member and the managing director must live in the EEA, or a PRH permit is needed.' },
        { q: 'When must I register for VAT?', a: 'When turnover exceeds 20,000 euros in a calendar year. VAT is due from the moment the threshold is exceeded, so register before that. You can also register voluntarily.' },
        { q: 'When do I pay Finnish tax on all my income?', a: 'When you have your actual home in Finland or stay here continuously for more than six months. Short trips abroad do not break the stay. A tax treaty may limit Finland’s right to tax.' },
      ],
    },
    et: {
      title: 'Välismaalasest ettevõtja Soomes: Y-tunnus, elamisluba, pangakonto ja maksud',
      description:
        'Kuidas välismaalane asutab 2026. aastal Soome toiminimi või osaühingu: elamisluba, elukoht EMP-s, PRH luba, Y-tunnus, pangakonto ja maksud.',
      lead: 'Ettevõtte võib Soome asutada ka välismaalane, kuid teel on kaks eraldi küsimust: kas sa võid Soomes elada ja töötada ning kas sa võid tegeleda ettevõtlusega ja ettevõtte registreerida. Esimesele vastab Soome migratsiooniamet (Maahanmuuttovirasto, Migri), teisele Patendi- ja registriamet (PRH) ning maksuamet (Verohallinto). Kogusime kokku 2026. aasta reeglid, tasud ja kontrollnimekirja.',
      body: [
        { t: 'h2', x: 'Kes võib Soome ettevõtte asutada?' },
        { t: 'p', x: 'Ettevõtlusseaduse (elinkeinotoimintalaki 565/2023) järgi sõltub õigus tegeleda ettevõtlusega elukohast, mitte kodakondsusest. Euroopa Majanduspiirkonnas (EMP) elav füüsiline isik võib ettevõtlusega tegeleda ilma eraldi loata. EMP-st väljaspool elav inimene vajab PRH luba. Õigus Soomes viibida on eraldi küsimus, mille üle otsustab Migri.' },
        { t: 'h3', x: 'EL-i ja EMP kodanik' },
        { t: 'p', x: 'EL-i või EMP riigi kodanik ei vaja Soomes ettevõtjana tegutsemiseks elamisluba. Kui viibid Soomes üle kolme kuu, registreeri oma elamisõigus Migris. Kui elad näiteks Eestis ja asutad Soome toiminimi (füüsilisest isikust ettevõtja), on su elukoht EMP-s: PRH luba pole vaja ega pea Soome eraldi esindajat määrama.' },
        { t: 'h3', x: 'Väljastpoolt EL-i' },
        { t: 'ul', items: [
          'Kui kolid Soome ettevõtjaks, vajad elamisluba, mis lubab ettevõtlust. Migri andmetel peab ettevõtja elamisloa puhul äri olema kasumlik ja sinu toimetulek peab olema tagatud ettevõtlustuluga. Kergettevõtjana (kevytyrittäjä) ehk arveldusteenuse kaudu seda luba taotleda ei saa.',
          'Kasvuettevõtetele on eraldi idufirma ettevõtja elamisluba. Selleks on esmalt vaja Business Finlandi positiivset arvamust.',
          'Kui elad juba Soomes muu loa alusel, kontrolli Migrist, kas su luba lubab ettevõtlust või on vaja uut luba.',
          'PRH järgi ei vaja Ukrainast saabunud, kellel on Migri otsus ajutise kaitse kohta, toiminimi jaoks PRH luba. Soome isikukood (henkilötunnus) tuleb koos otsusega.',
        ] },
        { t: 'note', x: 'Elamislubade tingimused, tasud ja menetlusajad muutuvad ning iga juhtum otsustatakse eraldi. Kontrolli oma olukorda Migrist enne, kui võtad kohustusi, näiteks sõlmid üürilepingu või ostad seadmeid.' },
        { t: 'h2', x: 'Kui elad väljaspool EMP-d: PRH load' },
        { t: 'h3', x: 'Toiminimi (füüsilisest isikust ettevõtja)' },
        { t: 'p', x: 'Kui su alaline elukoht on väljaspool EMP-d, vajad PRH luba enne, kui saad esitada toiminimi asutamisteate. Taotlus maksab 150 eurot ja arvetasu 6,50 eurot. Sellisel juhul tuleb toiminimi kanda äriregistrisse ning tal peab olema Soomes elav esindaja, kes võtab vastu kohtukutseid ja muid teateid. PRH sõnul on ta praktikas andnud lube Šveitsis alaliselt elavatele Lugano konventsiooni alusel ja otsustab muud taotlused alles menetluses. Näiteks Venemaal elaval inimesel ei tasu plaani toiminimi peale üles ehitada.' },
        { t: 'h3', x: 'Osakeyhtiö (osaühing, Oy)' },
        { t: 'ul', items: [
          'Osaühinguseaduse järgi peab vähemalt üks juhatuse liige elama EMP-s, kui PRH ei luba erandit. Kui juhatuses on alla kolme liikme, peab sel olema asendusliige (varajäsen).',
          'PRH praktikas peab EMP-s elama vähemalt üks põhiliige ja, kui asendusliikmeid on, ka vähemalt üks asendusliige. Muidu on luba vaja kõigile põhiliikmetele või kõigile asendusliikmetele.',
          'Tegevjuht (toimitusjohtaja) ja tema võimalik asendaja peavad elama EMP-s, muidu tuleb neile taotleda PRH luba.',
          'Loataotlus maksab 150 eurot ja 6,50 eurot arvetasu inimese kohta. Kolme juhatuse liikme puhul on see 450 eurot pluss arvetasud.',
          'PRH ei anna luba näiteks siis, kui kõik juhatuse liikmed elavad Venemaal või Austraalias või kui ainus põhiliige elab Austraalias ja asendusliige Soomes. Soomes elav asendusliige üksi probleemi ei lahenda.',
          'Ühingul peab olema Soomes elav esindaja kohtukutsete vastuvõtmiseks, kui äriregistrisse pole kantud EMP-s elavat juhatuse liiget, asendusliiget, tegevjuhti, esindusõiguslikku isikut ega prokuristi.',
        ] },
        { t: 'h2', x: 'Y-tunnus ja registrid' },
        { t: 'ol', items: [
          'Toiminimi: Y-tunnuse (Soome registrikoodi) saab OmaVeros, siis kantakse ettevõte ainult maksuameti registritesse. Äriregistrisse registreerimine YTJ-teenuses maksab 75 eurot ja on kohustuslik, kui elad väljaspool EMP-d. Toiminimi võib teate esitada ka paberil vormil Y3.',
          'Osaühing asutatakse alati YTJ-teenuses ja alates 2026. aastast ainult elektrooniliselt. Juhendatud asutamine maksab 300 eurot, kuid eeldab muu hulgas, et kõigil märgitud isikutel on Soome isikukood. Muidu esitatakse tavaline asutamisteade, mis maksab 400 eurot. See tuleb esitada kolme kuu jooksul asutamislepingu allkirjastamisest, muidu asutamine aegub.',
          'Ettemaksuregister (ennakkoperintärekisteri): vabatahtlik, kuid ilma selleta peab klient tööeest makstavast tasust maksu kinni pidama (ühingult 13 %, maksukaardita füüsilisest isikust ettevõtjalt 60 %). Alustaval ettevõtjal võib ilma registrita olla raske tellimusi saada.',
          'Käibemaksuregister (ALV): kohustuslik, kui käive ületab kalendriaastas 20 000 eurot. Maks tuleb tasuda piiri ületamise hetkest, seega registreeru aegsasti. Üldmäär on 25,5 %. Alla piiri saab registreeruda vabatahtlikult.',
          'Tööandjate register: kui maksad palka regulaarselt. Ära registreeru, kui ettevõttes töötavad ainult sina, su abikaasa või alla 15-aastane laps.',
        ] },
        { t: 'p', x: 'Elektroonilise teatega saad Y-tunnuse kohe. Maksuameti registritesse kandmine võtab umbes kolm nädalat.' },
        { t: 'h2', x: 'Isikukood ja e-tuvastus' },
        { t: 'p', x: 'Soome isikukood (henkilötunnus) antakse, kui sind kantakse rahvastikuregistrisse. Olenevalt olukorrast saab seda taotleda Digi- ja rahvastikuandmete ametist (DVV), maksuametist, Soome välisesindusest või Migrist ning kohale tuleb minna isiklikult. Isikukoodi on vaja näiteks pangakonto avamiseks ja Soome tugevad tuvastusvahendid, nagu internetipanga koodid ja mobiilivarmenne, on sellega seotud.' },
        { t: 'p', x: 'Ilma Soome tuvastusvahenditeta on võimalused piiratud. Teise EL-i riigi e-identiteediga saab siseneda ainult teenustesse, mis seda lubavad, ja sind ei seota siis Soome isikukoodiga. OmaVeros saab EL-i riigi tuvastusega saata kontaktipäringu ja asju ajada piiratud ulatuses.' },
        { t: 'p', x: 'Alates 1.1.2026 tuleb äriregistri teated esitada elektrooniliselt ka siis, kui kellelgi vastutavatest isikutest pole Soome isikukoodi. PRH andmetel on võimalused järgmised:' },
        { t: 'ul', items: [
          'Volitatud kontaktisik, kellel on Soome isikukood ja Suomi.fi tuvastus, esitab teate veebivormil. Lisaks on vaja volikirja või vastutava isiku allkirjastatud Y-vormi.',
          'Teatud EL-i riigi tuvastusvahendiga vastutav isik kasutab veebivormi „Ulkomaalaisen tunnistustapa“. Nimekirjas on teiste seas Eesti, Läti, Leedu, Poola, Rootsi ja Saksamaa.',
          'Soome Advokatuuri (Suomen Asianajajat) liige võib teate YTJ-teenuses allkirjastada.',
          'Posti teel ainult siis, kui muu pole võimalik, koos selgitusega, miks elektrooniline teade ei ole võimalik.',
        ] },
        { t: 'h2', x: 'Ettevõtte pangakonto' },
        { t: 'p', x: 'Rahapesu tõkestamise seaduse (rahanpesulaki 444/2017) järgi peavad pangad oma kliente tundma. Nad peavad tuvastama kliendi ja ettevõtte tegelikud kasusaajad ning välja selgitama tegevuse olemuse ja ulatuse ning raha päritolu. Kui omanikel või rahal on välisseoseid, on kontroll sageli põhjalikum ja konto avamine võib võtta nädalaid.' },
        { t: 'ul', items: [
          'Varu aega ja taotle kontot kohe, kui sul on Y-tunnus. Ilma ettevõtte kontota on raske arveid esitama hakata ja raamatupidamist pidada.',
          'Hoia valmis pass, elamisluba või elamisõiguse registreering, Y-tunnus või äriregistri väljavõte, lühike kirjeldus ärist ja klientidest ning selgitus, kust algkapital pärineb.',
          'Vasta panga küsimustele täpselt ja kirjalikult. Ebamäärane vastus pikendab kontrolli.',
          'Hoia ettevõtte ja enda raha algusest peale lahus. Osaühingus on see hädavajalik ja toiminimi puhul lihtsustab see raamatupidamist ja maksustamist.',
        ] },
        { t: 'h2', x: 'Maksustamine lühidalt' },
        { t: 'ul', items: [
          'Oled Soome maksuresident, kui sul on siin tegelik eluase ja kodu või viibid siin järjest üle kuue kuu. Ajutine eemalolek viibimist ei katkesta. Siis maksad Soome tulumaksu kõigilt oma tuludelt, ka välismaistelt. Maksuleping võib määrata, kumb riik tohib maksustada.',
          'Toiminimi kasum on sinu isiklik tulu ja seda maksustatakse progresseeruvalt. Endale palka maksta ei saa. Ettemaksu (ennakkovero) ei määrata automaatselt, vaid pead seda ise OmaVeros taotlema.',
          'Osaühing maksab kasumilt 20 % tulumaksu (yhteisövero). Isiklikku maksu maksad siis, kui võtad ühingust palka või dividendi.',
          'YEL-pensionikindlustus on kohustuslik Soomes elavale ja tegutsevale ettevõtjale ning ka EL-i või EMP riigis elavale ettevõtjale. See tuleb võtta kuue kuu jooksul tegevuse algusest. Piirid ja maksed on meie eraldi YEL-juhendis.',
          'Kui tegutsed Soomes Eesti OÜ kaudu, käivad registreerimine ja maksustamine teisiti. Selle kohta on meil eraldi juhend Eesti OÜ-st Soomes.',
        ] },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Ettevõte asutatakse enne, kui õigus Soomes viibida on selge. Y-tunnus ei anna õigust Soomes elada.',
          'Arvatakse, et piisab Soome kodakondsusest või Soomes elavast asendusliikmest. PRH loa vajadus sõltub elukohast ja juhatuse koosseisust.',
          'Valitakse juhendatud 300-eurone asutamine, kuigi kellelgi pole Soome isikukoodi.',
          'Asutamisteade jääb kolme kuu jooksul asutamislepingust esitamata ja asutamine aegub.',
          'Ettemaksu ei taotleta ning maks tuleb hiljem tasuda korraga juurdemaksuna.',
          'Käibemaksuregistrisse registreerutakse alles siis, kui 20 000 euro piir on juba ületatud.',
          'Pangakonto avamiseks ei varuta aega ja esimesed laekumised tulevad isiklikule kontole.',
          'YEL ununeb, sest arvatakse, et see puudutab ainult soomlasi.',
        ] },
        { t: 'h2', x: 'Kontrollnimekiri samm-sammult' },
        { t: 'ol', items: [
          'Selgita välja oma elamisõigus: EL-i ja EMP kodanikul registreerimine Migris, teistel ettevõtlust lubava elamisloa vajadus.',
          'Vali ettevõtlusvorm: toiminimi või osaühing.',
          'Kontrolli, kus elad sina ja teised vastutavad isikud. Vajadusel taotle PRH luba ja määra esindaja Soomes.',
          'Kui elad Soomes, hangi isikukood ja tugev tuvastusvahend. Muidu otsusta, kes esitab teated sinu eest.',
          'Esita asutamisteade ja registreeru samal ajal vajalikesse registritesse: ettemaksu-, käibemaksu- ja tööandjate register.',
          'Ava ettevõtte pangakonto ja varu selleks aega.',
          'Taotle ettemaks OmaVeros hinnangulise kasumi põhjal.',
          'Võta YEL kuue kuu jooksul ja mõtle läbi muud kindlustused.',
          'Korralda raamatupidamine enne esimest arvet ja hoia kõik kuludokumendid alles.',
        ] },
        { t: 'note', x: 'Andmed on kontrollitud 2026. aasta novembris: PRH asutamistasud 75 eurot (toiminimi), 300 või 400 eurot (osaühing), EMP-st väljaspool elava loataotlus 150 eurot ja 6,50 eurot arvetasu, käibemaksuregistri piir 20 000 eurot ja ühingu tulumaks 20 %. Allikad: ettevõtlusseadus (565/2023), osaühinguseadus (624/2006), tulumaksuseadus (1535/1992), rahapesu tõkestamise seadus (444/2017), PRH, Soome maksuamet ja Suomi.fi. Elamislubade üle otsustab Migri.' },
        { t: 'h2', x: 'Aitame alustada õigesti' },
        { t: 'p', x: 'Tilitoimisto Debit Credit aitab välismaalastest ettevõtjatel valida ettevõtlusvormi, esitada asutamisteate ja registreeringud ning taotleda ettemaksu. Peame raamatupidamist, esitame käibemaksudeklaratsioonid ja koostame majandusaasta aruande ning meie kliendid saavad saata kuludokumendid Vaavo rakenduse kaudu. Teenindame soome ja vene keeles. Võta ühendust juba enne asutamist, siis vaatame sammud koos läbi.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'PRH: luba EMP-st väljaspool elavale füüsilisest isikust ettevõtjale (inglise keeles)', href: SRC.traderPermitEn },
          { label: 'PRH: load EMP-st väljaspool elavatele, osaühing (inglise keeles)', href: SRC.oyPermitEn },
          { label: 'PRH: äriregistri teade ilma Soome tuvastuseta (soome keeles)', href: SRC.noLoginFi },
          { label: 'PRH: asutamistasud (inglise keeles)', href: SRC.feesEn },
          { label: 'Verohallinto: asutamisteade ja registrid (inglise keeles)', href: SRC.startEn },
          { label: 'Verohallinto: meelespea ettevõtte asutajale (inglise keeles)', href: SRC.checklistEn },
          { label: 'Verohallinto: käibemaksukohustuslaseks registreerimine (inglise keeles)', href: SRC.vatEn },
          { label: 'Verohallinto: ettemaksuregister (inglise keeles)', href: SRC.prepayEn },
          { label: 'Verohallinto: maksuresidentsus (inglise keeles)', href: SRC.residencyEn },
          { label: 'Verohallinto: OmaVero välismaalasele (inglise keeles)', href: SRC.myTaxForeignEn },
          { label: 'Finlex: ettevõtlusseadus (565/2023)', href: SRC.etl },
          { label: 'Finlex: osaühinguseadus (624/2006)', href: SRC.oyl },
          { label: 'Finlex: tulumaksuseadus (1535/1992), § 11', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Kas EL-i kodanik vajab Soomes ettevõtjaks olemiseks elamisluba?', a: 'Ei vaja. Kui viibid Soomes üle kolme kuu, registreeri oma elamisõigus Migris. Ettevõtte saad asutada samamoodi nagu soomlane ja EMP-s elades pole PRH luba vaja.' },
        { q: 'Kas saan asutada Soome toiminimi, kui elan Venemaal?', a: 'Esmalt on vaja PRH luba (150 eurot ja 6,50 eurot arvetasu), kannet äriregistris ja Soomes elavat esindajat. PRH sõnul on ta praktikas andnud lube Šveitsis elavatele ja otsustab muud taotlused juhtumipõhiselt, seega positiivsele otsusele ei tasu loota. Soome kolimiseks on vaja ka elamisluba.' },
        { q: 'Kas osaühingu saab asutada ilma Soome isikukoodita?', a: 'Saab, kuid juhendatud 300-eurone asutamine siis ei sobi. Esitatakse tavaline 400-eurone asutamisteade, mille võib PRH andmetel esitada volitatud kontaktisik, teatud EL-i riigi (näiteks Eesti) tuvastusvahendiga vastutav isik või Soome advokaat. Lisaks peavad vähemalt üks juhatuse liige ja tegevjuht elama EMP-s, muidu on vaja PRH luba.' },
        { q: 'Millal pean registreeruma käibemaksukohustuslaseks?', a: 'Kui käive ületab kalendriaastas 20 000 eurot. Maks tuleb tasuda piiri ületamise hetkest, seega registreeru enne seda. Registreeruda saab ka vabatahtlikult.' },
        { q: 'Millal maksan Soome maksu kõigilt oma tuludelt?', a: 'Kui sul on Soomes tegelik eluase ja kodu või viibid siin järjest üle kuue kuu. Lühikesed välisreisid viibimist ei katkesta. Maksuleping võib Soome maksustamisõigust piirata.' },
      ],
    },
    uk: {
      title: 'Іноземний підприємець у Фінляндії: Y-tunnus, дозвіл на проживання, банківський рахунок і податки',
      description:
        'Як іноземцю відкрити toiminimi або Oy у Фінляндії у 2026 році: дозвіл на проживання, проживання в ЄЕЗ, дозвіл PRH, Y-tunnus, рахунок і податки.',
      lead: 'Відкрити фірму у Фінляндії може й іноземець, але на шляху є два окремі питання: чи можете ви жити й працювати у Фінляндії і чи можете ви займатися підприємництвом та зареєструвати компанію. На перше відповідає Міграційна служба (Maahanmuuttovirasto, Migri), на друге — Патентно-реєстраційне відомство (PRH) і Податкова (Verohallinto). Зібрали правила, збори й покроковий список на 2026 рік.',
      body: [
        { t: 'h2', x: 'Хто може відкрити фірму у Фінляндії' },
        { t: 'p', x: 'За законом про підприємницьку діяльність (elinkeinotoimintalaki 565/2023) право вести бізнес залежить від місця проживання, а не від громадянства. Фізична особа, яка живе в Європейській економічній зоні (ЄЕЗ), може вести діяльність без окремого дозволу. Тому, хто живе поза ЄЕЗ, потрібен дозвіл PRH. Право на перебування — окреме питання, його вирішує Migri.' },
        { t: 'h3', x: 'Громадяни ЄС і ЄЕЗ' },
        { t: 'p', x: 'Громадянину країни ЄС або ЄЕЗ не потрібен дозвіл на проживання, щоб бути підприємцем у Фінляндії. Якщо ви перебуваєте у Фінляндії понад три місяці, зареєструйте право на перебування в Migri. Якщо ви живете, наприклад, в Естонії й відкриваєте toiminimi у Фінляндії, ваше місце проживання — в ЄЕЗ: дозвіл PRH не потрібен, і окремого представника у Фінляндії призначати не треба.' },
        { t: 'h3', x: 'Громадяни країн поза ЄС' },
        { t: 'ul', items: [
          'Щоб переїхати до Фінляндії як підприємець, потрібен дозвіл на проживання, який дозволяє підприємницьку діяльність. За даними Migri, для дозволу підприємцю (elinkeinonharjoittaja) бізнес має бути прибутковим, а ваші засоби до існування — забезпечені доходом від нього. Як kevytyrittäjä або через сервіс виставлення рахунків цей дозвіл отримати не можна.',
          'Для швидкозростаючих компаній є окремий дозвіл стартап-підприємця. Спершу для нього потрібен позитивний висновок Business Finland.',
          'Якщо ви вже живете у Фінляндії за іншим дозволом, уточніть у Migri, чи дозволяє він вести бізнес, чи потрібен новий дозвіл.',
          'Тим, хто приїхав з України й має рішення Migri про тимчасовий захист, дозвіл PRH на toiminimi не потрібен — так зазначає PRH. Фінський особистий код (henkilötunnus) видається разом із рішенням.',
        ] },
        { t: 'note', x: 'Умови, збори й строки розгляду дозволів на проживання змінюються, і рішення завжди ухвалюють індивідуально. Перевірте свою ситуацію в Migri, перш ніж брати на себе зобов’язання — підписувати договір оренди чи купувати обладнання.' },
        { t: 'h2', x: 'Якщо ви живете поза ЄЕЗ: дозволи PRH' },
        { t: 'h3', x: 'Toiminimi (фізична особа-підприємець)' },
        { t: 'p', x: 'Якщо ваше постійне місце проживання поза ЄЕЗ, дозвіл PRH треба отримати до подання заяви про реєстрацію toiminimi. Заява коштує 150 € плюс 6,50 € за виставлення рахунку. У такому разі toiminimi обов’язково вносять до торговельного реєстру, і в нього має бути представник, який живе у Фінляндії й приймає повістки та інші повідомлення. PRH повідомляє, що на практиці видавав такі дозволи жителям Швейцарії на підставі Луганської конвенції, а інші заяви вирішує лише під час розгляду. Тому, наприклад, тому, хто живе в Росії, не варто будувати плани на toiminimi.' },
        { t: 'h3', x: 'Osakeyhtiö (Oy)' },
        { t: 'ul', items: [
          'За законом про акціонерні товариства щонайменше один член правління має жити в ЄЕЗ, якщо PRH не дозволить виняток. Якщо в правлінні менше трьох членів, у ньому має бути заступник (varajäsen).',
          'На практиці PRH вимагає, щоб у ЄЕЗ жив щонайменше один основний член правління і, якщо є заступники, щонайменше один заступник. Інакше дозвіл потрібен усім основним членам або всім заступникам.',
          'Керівний директор (toimitusjohtaja) і його можливий заступник мають жити в ЄЕЗ, інакше для них потрібен дозвіл PRH.',
          'Заява на дозвіл коштує 150 € і 6,50 € за рахунок на кожну особу. Для трьох членів правління — 450 € плюс збори за рахунки.',
          'PRH не видає дозвіл, наприклад, якщо всі члени правління живуть у Росії чи Австралії або якщо єдиний основний член живе в Австралії, а заступник — у Фінляндії. Заступник із Фінляндії сам по собі проблеми не вирішує.',
          'Компанія повинна мати представника з місцем проживання у Фінляндії для отримання повісток, якщо в торговельному реєстрі немає члена правління, заступника, керівного директора, особи з правом підпису чи прокуриста, які живуть у ЄЕЗ.',
        ] },
        { t: 'h2', x: 'Y-tunnus і реєстри' },
        { t: 'ol', items: [
          'Toiminimi: Y-tunnus можна отримати в OmaVero — тоді фірму вносять лише до реєстрів Податкової. Реєстрація в торговельному реєстрі через сервіс YTJ коштує 75 € і обов’язкова, якщо ви живете поза ЄЕЗ. Toiminimi досі може подати заяву й на паперовій формі Y3.',
          'Osakeyhtiö завжди реєструють у YTJ, а з 2026 року — лише електронно. Керована реєстрація коштує 300 €, але вимагає, зокрема, щоб у всіх зазначених осіб був фінський henkilötunnus. Інакше подають звичайну заяву за 400 €. Її треба подати протягом трьох місяців після підписання установчого договору, інакше заснування компанії втрачає силу.',
          'Реєстр передоплати податків (ennakkoperintärekisteri): добровільний, але без нього замовник мусить утримувати податок з оплати роботи (з компанії — 13 %, з приватного підприємця без податкової картки — 60 %). Підприємцю-початківцю без цього реєстру буває важко отримати замовлення.',
          'Реєстр ПДВ (ALV): обов’язковий, якщо оборот перевищує 20 000 € за календарний рік. Податок сплачують з моменту перевищення порогу, тож реєструйтеся заздалегідь. Загальна ставка — 25,5 %. За меншого обороту можна стати на облік добровільно.',
          'Реєстр роботодавців: якщо ви регулярно виплачуєте зарплату. Не реєструйтеся, якщо у фірмі працюєте лише ви, ваш чоловік чи дружина або дитина до 15 років.',
        ] },
        { t: 'p', x: 'У разі електронного подання Y-tunnus видають одразу. Внесення до реєстрів Податкової триває близько трьох тижнів.' },
        { t: 'h2', x: 'Henkilötunnus і електронна ідентифікація' },
        { t: 'p', x: 'Фінський особистий код (henkilötunnus) присвоюють під час внесення до реєстру населення. Залежно від ситуації його можна запросити в Агентстві цифровізації та даних про населення (DVV), у податковій, у фінському представництві за кордоном або в Migri; потрібен особистий візит. Henkilötunnus необхідний, наприклад, для відкриття банківського рахунку, а фінські засоби сильної ідентифікації — банківські коди й мобільний сертифікат — прив’язані до нього.' },
        { t: 'p', x: 'Без фінських засобів ідентифікації можливості обмежені. Електронним посвідченням іншої країни ЄС можна увійти лише в ті сервіси, які це дозволяють, і вас тоді не пов’яжуть із фінським henkilötunnus. В OmaVero з ідентифікатором країни ЄС можна надіслати запит і користуватися сервісом в обмеженому обсязі.' },
        { t: 'p', x: 'З 1.1.2026 заяви до торговельного реєстру подають лише електронно, навіть якщо в жодної відповідальної особи немає фінського henkilötunnus. За даними PRH, є такі варіанти:' },
        { t: 'ul', items: [
          'Уповноважена контактна особа з фінським henkilötunnus та ідентифікацією Suomi.fi подає заяву через вебформу. Додають довіреність або форму Y, підписану відповідальною особою.',
          'Відповідальна особа із засобом ідентифікації певної країни ЄС користується вебформою «Ulkomaalaisen tunnistustapa». У списку, серед інших, Естонія, Латвія, Литва, Польща, Швеція та Німеччина.',
          'Член Колегії адвокатів Фінляндії (Suomen Asianajajat) може підписати заяву в YTJ.',
          'Поштою — лише якщо нічого іншого неможливо, з поясненням, чому електронне подання недоступне.',
        ] },
        { t: 'h2', x: 'Банківський рахунок фірми' },
        { t: 'p', x: 'За законом про запобігання відмиванню коштів (rahanpesulaki 444/2017) банки зобов’язані знати своїх клієнтів. Вони мають ідентифікувати клієнта й фактичних бенефіціарів компанії, з’ясувати характер і масштаб діяльності та походження коштів. Якщо власники чи гроші мають зв’язки з іншими країнами, перевірка зазвичай ретельніша, і відкриття рахунку може тривати кілька тижнів.' },
        { t: 'ul', items: [
          'Закладіть час і подавайте заявку одразу після отримання Y-tunnus. Без рахунку фірми важко почати виставляти рахунки й вести бухгалтерію.',
          'Підготуйте паспорт, дозвіл на проживання або реєстрацію права на перебування, Y-tunnus або витяг із торговельного реєстру, короткий опис бізнесу й клієнтів, а також пояснення, звідки стартовий капітал.',
          'Відповідайте на запитання банку точно й письмово. Розмиті відповіді затягують перевірку.',
          'Від самого початку тримайте гроші фірми й особисті гроші окремо. В Oy це обов’язково, а в toiminimi суттєво спрощує бухгалтерію і податки.',
        ] },
        { t: 'h2', x: 'Податки в загальних рисах' },
        { t: 'ul', items: [
          'Ви вважаєтеся податковим резидентом Фінляндії, якщо маєте тут постійне житло й дім або безперервно перебуваєте тут понад шість місяців. Тимчасові від’їзди перебування не переривають. Тоді ви сплачуєте у Фінляндії податок з усіх доходів, зокрема закордонних. Податкова угода може визначити, яка держава має право оподатковувати дохід.',
          'Прибуток toiminimi — ваш особистий дохід, він оподатковується за прогресивною шкалою. Виплачувати зарплату самому собі не можна. Авансовий податок (ennakkovero) не призначають автоматично — його треба запросити самостійно в OmaVero.',
          'Osakeyhtiö сплачує з прибутку 20 % податку на прибуток (yhteisövero). Особистий податок ви сплачуєте, коли отримуєте з компанії зарплату або дивіденди.',
          'Страхування YEL обов’язкове для підприємця, який живе й працює у Фінляндії, а також для того, хто живе в країні ЄС чи ЄЕЗ. Оформити його треба протягом шести місяців від початку діяльності. Ліміти й внески — в нашому окремому посібнику про YEL.',
          'Якщо ви працюєте у Фінляндії через естонську OÜ, податки й реєстрація влаштовані інакше — про це в нас є окремий посібник про естонську OÜ у Фінляндії.',
        ] },
        { t: 'h2', x: 'Поширені помилки' },
        { t: 'ul', items: [
          'Фірму відкривають раніше, ніж з’ясовано право на перебування. Y-tunnus не дає права жити у Фінляндії.',
          'Вважають, що досить фінського громадянства чи заступника в правлінні, який живе у Фінляндії. Чи потрібен дозвіл PRH, залежить від місця проживання й складу правління.',
          'Обирають керовану реєстрацію за 300 €, хоча в когось із учасників немає фінського henkilötunnus.',
          'Не подають заяву протягом трьох місяців після установчого договору, і заснування втрачає силу.',
          'Не запитують ennakkovero, і податок доводиться сплачувати разом як доплату (jäännösvero).',
          'Стають на облік ПДВ, коли поріг 20 000 € уже перевищено.',
          'Не закладають часу на банківський рахунок, і перші оплати надходять на особистий рахунок.',
          'Забувають про YEL, вважаючи, що воно стосується лише фінів.',
        ] },
        { t: 'h2', x: 'Покроковий список' },
        { t: 'ol', items: [
          'З’ясуйте своє право на перебування: для громадян ЄС і ЄЕЗ — реєстрація в Migri, для інших — чи потрібен дозвіл на проживання, що дозволяє бізнес.',
          'Оберіть форму: toiminimi чи osakeyhtiö.',
          'Перевірте, де живете ви та інші відповідальні особи. За потреби отримайте дозвіл PRH і призначте представника у Фінляндії.',
          'Якщо ви живете у Фінляндії, отримайте henkilötunnus і засіб сильної ідентифікації. Інакше вирішіть, хто подаватиме заяви за вас.',
          'Подайте заяву про реєстрацію й одразу станьте на облік у потрібних реєстрах: передоплати, ПДВ і роботодавців.',
          'Відкрийте банківський рахунок фірми, заклавши на це час.',
          'Запросіть ennakkovero в OmaVero за оцінкою прибутку.',
          'Оформіть YEL протягом шести місяців і продумайте інше страхування.',
          'Налагодьте бухгалтерію до першого рахунку й зберігайте всі документи.',
        ] },
        { t: 'note', x: 'Дані перевірено в листопаді 2026 року: збори PRH — 75 € (toiminimi), 300 або 400 € (Oy), дозвіл для тих, хто живе поза ЄЕЗ, — 150 € і 6,50 € за рахунок, поріг реєстрації ПДВ — 20 000 €, податок на прибуток компанії — 20 %. Джерела: закон про підприємницьку діяльність (565/2023), закон про акціонерні товариства (624/2006), закон про податок на доходи (1535/1992), закон про запобігання відмиванню коштів (444/2017), PRH, Verohallinto і Suomi.fi. Рішення про дозволи на проживання ухвалює Migri.' },
        { t: 'h2', x: 'Допоможемо почати правильно' },
        { t: 'p', x: 'Tilitoimisto Debit Credit допомагає іноземним підприємцям обрати форму компанії, подати заяву про реєстрацію, стати на облік у реєстрах і запросити ennakkovero. Ми ведемо бухгалтерію, подаємо декларації з ПДВ і складаємо річну звітність, а наші клієнти можуть передавати чеки через застосунок Vaavo. Працюємо фінською та російською. Зв’яжіться з нами ще до реєстрації — пройдемо всі кроки разом.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'PRH: дозвіл для приватного підприємця, який живе поза ЄЕЗ (англійською)', href: SRC.traderPermitEn },
          { label: 'PRH: дозволи для тих, хто живе поза ЄЕЗ, — Oy (англійською)', href: SRC.oyPermitEn },
          { label: 'PRH: подання до торговельного реєстру без фінської ідентифікації (фінською)', href: SRC.noLoginFi },
          { label: 'PRH: збори за реєстрацію (англійською)', href: SRC.feesEn },
          { label: 'Verohallinto: заява про реєстрацію та реєстри (англійською)', href: SRC.startEn },
          { label: 'Verohallinto: пам’ятка для засновника фірми (англійською)', href: SRC.checklistEn },
          { label: 'Verohallinto: реєстрація платником ПДВ (англійською)', href: SRC.vatEn },
          { label: 'Verohallinto: реєстр передоплати податків (англійською)', href: SRC.prepayEn },
          { label: 'Verohallinto: податкове резидентство (англійською)', href: SRC.residencyEn },
          { label: 'Verohallinto: OmaVero для іноземців (англійською)', href: SRC.myTaxForeignEn },
          { label: 'Finlex: закон про підприємницьку діяльність (565/2023)', href: SRC.etl },
          { label: 'Finlex: закон про акціонерні товариства (624/2006)', href: SRC.oyl },
          { label: 'Finlex: закон про податок на доходи (1535/1992), § 11', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Чи потрібен громадянину ЄС дозвіл на проживання, щоб бути підприємцем у Фінляндії?', a: 'Ні. Якщо ви перебуваєте у Фінляндії понад три місяці, зареєструйте право на перебування в Migri. Фірму можна відкрити так само, як фінові, а тому, хто живе в ЄЕЗ, дозвіл PRH не потрібен.' },
        { q: 'Чи можна відкрити toiminimi у Фінляндії, якщо я живу в Росії?', a: 'Спершу потрібні дозвіл PRH (150 € і 6,50 € за рахунок), внесення до торговельного реєстру і представник, який живе у Фінляндії. PRH повідомляє, що на практиці видавав дозволи жителям Швейцарії, а інші заяви вирішує індивідуально, тож розраховувати на позитивне рішення не варто. Для переїзду до Фінляндії потрібен ще й дозвіл на проживання.' },
        { q: 'Чи можна відкрити osakeyhtiö без фінського henkilötunnus?', a: 'Можна, але керована реєстрація за 300 € тоді не підходить. Подають звичайну заяву за 400 €; за даними PRH, її може подати уповноважена контактна особа, відповідальна особа із засобом ідентифікації певної країни ЄС (наприклад, Естонії) або фінський адвокат. Крім того, щонайменше один член правління і керівний директор мають жити в ЄЕЗ, інакше потрібен дозвіл PRH.' },
        { q: 'Коли треба ставати на облік платника ПДВ?', a: 'Коли оборот перевищує 20 000 € за календарний рік. Податок сплачують з моменту перевищення порогу, тож реєструйтеся заздалегідь. Стати на облік можна й добровільно.' },
        { q: 'Коли я сплачую у Фінляндії податок з усіх своїх доходів?', a: 'Коли маєте у Фінляндії постійне житло й дім або безперервно перебуваєте тут понад шість місяців. Короткі поїздки за кордон перебування не переривають. Податкова угода може обмежити право Фінляндії на оподаткування.' },
      ],
    },
  },
};
