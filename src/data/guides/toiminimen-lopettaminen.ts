import type { Guide } from './types';

// Facts verified 2026-11-23, verbatim, against prh.fi, vero.fi (ordinary pages with their update
// date; detailed guidance with its issue date and validity) and Finlex (consolidated texts from the
// Finlex open-data API, version given per act; the same acts are linked below on finlex.fi). Every
// link below was fetched the same day and answered HTTP 200.
// - PRH, Yksityisen elinkeinonharjoittajan (toiminimiyrittäjän) lopettaminen ja ilmoitus
//   kaupparekisteriin (https://www.prh.fi/fi/yrityksetjayhteisot/yrityksenlopettaminen/yksityisen-elinkeinonharjoittajan-lopettamisilmoitus.html;
//   EN https://www.prh.fi/en/companiesandorganisations/lopettaminen/yeh.html): "Tee
//   lopettamisilmoitus viivytyksettä."; "Ilmoitus on maksuton."; "PRH merkitsee
//   lopettamisilmoituksen tiedot kaupparekisteriin. Samalla päättyy yrityksen nimen
//   rekisteröintisuoja."; "Jos haluat aloittaa toiminnan joskus uudelleen, käytät uudessa
//   yrityksessä sinulle aikaisemmin annettua Y-tunnusta."; enterprise mortgages must be arranged
//   first: "yrityskiinnityksen kuolettaminen", "yrityskiinnityksen siirto", "yrityskiinnityksen
//   siirto ja elinkeinotoiminnan jatkaminen"; "YTJ-palvelussa tekemäsi lopettamisilmoitus voidaan
//   rekisteröidä automaattisesti." Paper forms page
//   (https://www.prh.fi/fi/yrityksetjayhteisot/yrityksenlopettaminen/yksityisen-elinkeinonharjoittajan-lopettamisilmoitus/paperilomakkeet.html):
//   "Tarvitset Y6-lomakkeen."; "Ilmoittaminen netissä on nopeampaa kuin paperilomakkeella
//   ilmoittaminen."
//   NOTE: the brief said the Y-tunnus "is not reused". For a toiminimi PRH says the opposite: if
//   the same person starts again, the earlier Y-tunnus is used. The brief's "Y6?" and "free of
//   charge?" are both confirmed.
// - Vero, Toiminnan lopettaminen (updated 28.10.2025;
//   https://www.vero.fi/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/yritystoiminnan-lopettaminen/;
//   EN .../en/businesses-and-corporations/business-operations/going-out-of-business/termination-of-business/):
//   "Kun annat lopettamisilmoituksen, tiedot välittyvät samalla ilmoituksella sekä Verohallintoon
//   että kaupparekisteriin."; "Jos et tee lopettamisilmoitusta, yrityksen toiminnan katsotaan
//   edelleen jatkuvan. Silloin ilmoitukset arvonlisäverosta, työnantajasuorituksista ja muista
//   oma-aloitteisista veroista on edelleen annettava säännöllisesti."; "työttömyyskorvausten ja
//   muiden etuuksien edellytyksenä saattaa olla se, että elinkeinotoiminta on todella lopetettu ja
//   lopettamisesta on ilmoitettu Verohallinnolle."; "Liikkeen- tai ammatinharjoittaja ...: voit
//   ilmoittaa toiminnan loppumisesta Verohallinnolle myös OmaVerossa ... Jos haluat päättää myös
//   rekisteröinnin kaupparekisteriin, tee silloin ilmoitus Ytj:ssä."; "Ennakkoveron
//   maksuvelvollisuus ei pääty lopettamispäivään. Tarkista ennakkoveron määrä ja ilmoita
//   tarvittaessa uudet tiedot"; "Säilytä kirjanpitoaineisto ja tilinpäätös 10 vuotta ja
//   tilikauden tositteet 6 vuotta."; "Toiminta loppuu myös silloin, jos lopetat kaikki elinkeinon
//   harjoittamiseen liittyvät toimet, esimerkiksi irtisanot liiketilan vuokrasopimuksen ja myyt
//   varastossa olevat tavarat tai otat ne yksityiseen käyttöön."; "Kun yritys poistetaan
//   kaupparekisteristä, kukaan ei voi enää asioida OmaVerossa yrityksen puolesta ilman
//   Suomi.fi-valtuutta."; "Kaupparekisteristä poistaminen ei kuitenkaan poista yritykseltä
//   velvollisuutta antaa veroilmoituksia ja maksaa veroja ajallaan."
// - Vero, Arvonlisäverollisen toiminnan päättyminen (updated 19.12.2025;
//   https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaverollisen-toiminnan-paattyminen/;
//   EN .../en/businesses-and-corporations/taxes-and-charges/vat/termination-of-vat-liable-activities/):
//   "Samalla ilmoituksella voit poistaa yrityksen alv-rekisteristä, ennakkoperintärekisteristä ja
//   työnantajarekisteristä."; "Ilmoita lopettamisesta heti, kun tiedät että yrityksesi
//   arvonlisäverollinen toiminta päättyy."; "arvonlisäveroilmoitus pitää antaa myös siltä
//   verokaudelta, jonka aikana rekisteröinti on päättynyt. Tarvittaessa ilmoita päättymispäiväksi
//   kuukauden viimeinen päivä." (example: "ilmoita päättymispäiväksi 31.5. Jos ilmoitat
//   päättymispäiväksi 1.6., sinun pitää antaa alv-ilmoitus vielä kesäkuulta."); "Vaihtoehtoisesti
//   voit antaa ilmoituksen vasta, kun liikeomaisuus on myyty."; "Jos yrityksesi on hakeutunut
//   alv-velvolliseksi vapaaehtoisesti, poistamme yrityksesi rekisteristä aikaisintaan siitä
//   päivästä lähtien, jona ilmoitus on saapunut Verohallintoon."; deadlines: monthly/quarterly
//   "viimeistään toiminnan viimeistä verokautta seuraavan toisen kuukauden 12. päivänä"; calendar
//   year ending mid-year "lopettamiskuukautta seuraavan toisen kuukauden 12. päivänä"; "Jos
//   yrityksesi on arvonlisäverovelvollisten rekisterissä 31.12. asti: ilmoita ja maksa vero
//   viimeistään verokautta seuraavan vuoden helmikuun viimeisenä päivänä."; "Jos yrityksesi
//   haltuun jää lopettamishetkellä liikeomaisuutta, laske tämän niin sanotun loppuvaraston
//   arvonlisävero oman käytön säännösten mukaisesti."; "Ilmoita vero arvonlisäveroilmoituksessa,
//   jonka annat lopettamiskuukaudelta."; "Tämän jälkeen et saa enää lisätä yrityksen laskuihin
//   arvonlisäveroa eikä yritys voi vähentää ostojen arvonlisäveroa."; "Jos yritys on tehnyt
//   uudisrakennus- tai perusparannusinvestointeja, vähennettäviä veroja täytyy mahdollisesti
//   tarkistaa lopettamisen yhteydessä." (re-fetched 2026-11-23; the detailed guidance, ch. 2.1.3
//   "Kiinteistöinvestoinnin tarkistus arvonlisäverovelvollisuuden päättyessä", says the same and
//   points to the last tax period). We give it one hedged sentence, no calculation.
// - Vero, Arvonlisäverollisen liiketoiminnan lopettaminen ja konkurssi, syventävä ohje,
//   VH/6038/00.01.02/2024, antopäivä 21.8.2025, voimassa toistaiseksi
//   (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48656/arvonlisaverollisen-liiketoiminnan-lopettaminen-ja-konkurssi/):
//   "sen on suoritettava oman käytön arvonlisäveroa haltuunsa jääneistä tavaroista ja palveluista
//   eli loppuvarastosta (AVL 21 § 3 mom. ja 22 § 3 mom.)"; only goods "joista on voitu tehdä
//   arvonlisäveron vähennys tai jotka on valmistettu arvonlisäverollisen liiketoiminnan
//   yhteydessä"; example 2: "Ammatinharjoittaja maksaa ... oman käytön arvonlisäveroa sen haltuun
//   jääneistä yritystoiminnassa käytetyistä tavaroista kuten työkaluista ja koneista, joista se on
//   tehnyt arvonlisäverovähennyksen. ... Ammatinharjoittajan ei ole maksettava oman käytön veroa
//   omasta henkilökohtaisesta omaisuudestaan."; "Veron peruste on ostetun tavaran ja palvelun
//   ostohinta tai sitä alempi todennäköinen luovutushinta ilman veron osuutta"; "Kun yrityksen
//   arvonlisäverovelvollisuus on päättynyt ja oman käytön vero suoritettu, yrityksen haltuun
//   jääneen liikeomaisuuden myynnistä tai esimerkiksi yksityiskäyttöön ottamisesta ei suoriteta
//   arvonlisäveroa."; "Ilmoitus on annettava, vaikka yrityksellä ei olisi ollut toimintaa."
// - Arvonlisäverolaki 1501/1993 (fin@20260989; https://www.finlex.fi/fi/lainsaadanto/1993/1501):
//   20 § "Myyntinä pidetään myös tavaran tai palvelun ottamista omaan käyttöön siten kuin 21–26
//   §:ssä säädetään."; 21 § 1 mom. "1) ottaa tavaran yksityiseen kulutukseen"; 2 mom. "sovelletaan
//   vain, jos tavarasta on voitu tehdä vähennys tai tavara on valmistettu verollisen
//   liiketoiminnan yhteydessä."; 3 mom. "Kun verovelvollisuus päättyy, suoritetaan verovelvollisen
//   haltuun jääneistä tavaroista veroa niin kuin tavaran ottamisesta omaan käyttöön säädetään.";
//   22 § 3 mom. the same for services; 74 § "Otettaessa tavara omaan käyttöön veron peruste on: 1)
//   ostetun tavaran ostohinta tai sitä alempi todennäköinen luovutushinta"; 84 § "Suoritettava
//   vero on 25,5 prosenttia veron perusteesta"; 114 § 1 mom. 5) no deduction for "henkilöautot ...
//   sekä niihin tai niiden käyttöön liittyvät tavarat ja palvelut". NOTE: the brief asked about
//   "AVL 21 §/22 §?" — confirmed, the cessation rule is 21 § 3 mom. and 22 § 3 mom.; the value
//   base is 74 §. That an ordinary car whose VAT was never deductible carries no own-use VAT is our
//   reading of 21 § 2 mom. with 114 § and Vero's "joista on voitu tehdä arvonlisäveron vähennys".
// - Vero, Liikkeen- ja ammatinharjoittaja: Elinkeinotoiminnan varat ja velat toiminnan
//   lopettamisen yhteydessä (updated 7.9.2023;
//   https://www.vero.fi/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/yritystoiminnan-lopettaminen/tuloverotus/elinkeinotoiminnan-varat-ja-velat-toiminnan-lopettamisen-yhteydessa/):
//   "Jotta liikkeen- tai ammatinharjoittajan elinkeinotoimintaa pidetään loppuneena,
//   elinkeinotoiminnassa ei saa olla jäljellä lainkaan varallisuutta tai velkoja.";
//   "Liikkeen- tai ammatinharjoittajan vastaa henkilökohtaisesti elinkeinotoiminnan veloista ja
//   niiden maksamisesta elinkeinotoiminnan loputtua."; sale: "luovutetun omaisuuden arvona on
//   sovittu luovutushinta ... poistamattomat hankintamenot ovat elinkeinotoiminnan
//   vähennyskelpoisia kuluja"; private use: "Varallisuuden arvona (luovutushintana) on vaihto- tai
//   käyttöomaisuuden sekä muun omaisuuden ja oikeuksien osalta niiden alkuperäinen hankintameno tai
//   sitä alempi todennäköinen luovutushinta."; "Yksityiskäyttöönotto ei realisoi hyödykkeen
//   arvonnousua."; car example: probable price 9 500, undepreciated 8 000 → "Näiden erotus (1 500
//   euroa) on yksityiskäyttöönoton vaikutus ... tuottoihin"; probable price 6 000 → "Näiden summien
//   erotus (2 000 euroa) on ... elinkeinotoiminnan kulua (lisäpoistoa)."; "Liikkeen- tai
//   ammatinharjoittajan elinkeinotoiminnan lopettamisesta seuraa toiminta-aikana tehtyjen
//   varausten lukeminen lopettamisvuoden veronalaiseksi tuloksi."; tulontasaus: "vähintään 2 500
//   euron suuruisen kertatulon", "vähintään neljäsosa hänen verovuonna saamansa puhtaan ansiotulon
//   yhteismäärästä", "Tulontasauksella lievennetään vain valtion verotusta." Re-checked 2026-11-23
//   (fact-check pass): "Tulontasauksen toimittaminen edellyttää, että liikkeen- tai
//   ammatinharjoittaja on saanut elinkeinotoiminnan ansiotulo-osuutena verotettavan vähintään 2 500
//   euron suuruisen kertatulon."; "Kertatulon on tullut myös kertyä etu- tai jälkikäteen kahdelta tai
//   useammalta vuodelta. Tulontasaus tehdään enintään 5 vuodelle."; "on vaadittava tulontasauksen
//   toimittamista ennen kuin kertatulon saamisvuoden verotus päättyy." Statutory basis TVL 128 §.
//   The earlier text gave only the 2 500 € / quarter / state-tax conditions; the multi-year
//   accrual, the earned-income share, the 5-year cap and the claim deadline were added.
//   NOTE: the brief said private-use assets are taxed "at fair value (EVL 51 c §?)". The rule is
//   EVL 51 b §, and the value is the original acquisition cost or a lower probable selling price —
//   not plain fair value; 51 c § is about changes of business form.
// - Elinkeinoverolaki 360/1968 (fin@20261005; https://www.finlex.fi/fi/lainsaadanto/1968/360):
//   51 b § 1 mom. "Verovelvollisen ottaessa liikkeestään tai ammatistaan yksityistalouteensa
//   vaihto- tai käyttöomaisuutta tai muuta omaisuutta, palveluksia tai muita etuuksia tai
//   oikeuksia, katsotaan luovutushinnaksi otetun etuuden tai oikeuden alkuperäistä hankintamenoa
//   vastaava määrä tai sitä alempi todennäköinen luovutushinta."; 51 c § "Yritysmuodon muutosten
//   osalta noudatetaan, mitä tuloverolain 24 ja 28 §:ssä toimintamuodon muutoksista säädetään."
// - Vero, Elinkeinotoiminnan tappiot lopettamisen yhteydessä (updated 2.1.2019;
//   https://www.vero.fi/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/yritystoiminnan-lopettaminen/tuloverotus/elinkeinotoiminnan-tappiot-lopettamisen-yhteydessa/):
//   "Poikkeus on tilanne, jossa elinkeinotoiminta lopetetaan. Silloin myös vahvistetut tappiot voi
//   vähentää pääomatuloista."; "Vahvistetut elinkeinotoiminnan tappiot vähennetään verovuoden
//   pääomatulosta muiden vähennysten jälkeen."; "Jos yrittäjä aloittaa toiminnan myöhemmin
//   uudelleen ja elinkeinotoiminnan tulolähteen vahvistettuja tappioita on vielä jäljellä, niitä
//   voidaan vähentää uuden yritystoiminnan tuloista."; "Tappioita voi vähentää 10 vuoden ajan. Aika
//   ei pitene". Tuloverolaki 1535/1992 (fin@20260873; https://www.finlex.fi/fi/lainsaadanto/1992/1535)
//   121 §: "vähentämättä jäävät tappiot vähennetään verovelvollisen pääomatuloista. Tappiot voidaan
//   vähentää pääomatuloista tappiovuotta seuraavien 10 verovuoden aikana." NOTE: the brief asked
//   whether confirmed losses survive closing — they do, but only against capital income (or a later
//   new business), not against wages. Fact-check 2026-11-23: TVL 121 § lets the capital-income
//   deduction run in the closing year AND in later years within the 10 tax years after the loss
//   year, and only for losses that would otherwise stay undeducted because the business ended; the
//   earlier text read as "closing year only" and now says both.
// - Vero, Veroilmoitus 5 – ohje ilmoittamiseen (updated 16.11.2026;
//   https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/veroilmoituksen-t%C3%A4ytt%C3%B6ohje/):
//   "Elinkeinotoiminnan veroilmoitus (5) täytyy palauttaa aina – myös silloin, jos toimintaa ei ole
//   ollut."; "Elinkeinotoiminnan veroilmoitus vuodelta 2026 pitää antaa viimeistään 1.4.2027.";
//   "Jos veroilmoitus myöhästyy, joudut maksamaan myöhästymismaksua." Vero, Veroilmoitukset ja
//   tuloverotus – kun yritystoiminta loppuu (updated 16.12.2019;
//   .../yritystoiminnan-lopettaminen/tuloverotus/): "Anna elinkeinotoiminnan veroilmoitus vielä siltä
//   vuodelta, jonka aikana toiminta päättyi. ... Sillä ei ole merkitystä, milloin tilikausi on
//   todellisuudessa päättynyt. Ilmoita veroilmoituksella myös toiminnan päättyminen."
// - Vero, Toiminnan keskeyttäminen (updated 8.5.2026;
//   https://www.vero.fi/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/toiminnan-keskeyttaminen/):
//   "Jos toiminta keskeytyy, yritys voi ilmoittaa OmaVerossa Verohallinnon rekisterien
//   päättymispäivän. ... Kaupparekisterimerkintä jää edelleen voimaan."; "Arvonlisäveroilmoitus on
//   annettava vielä toiminnan viimeiseltä verokaudelta."; "Vaikka toiminta olisi keskeytynyt,
//   veroilmoitus pitää antaa, jos toimintaa on kuitenkin ollut verovuoden aikana." Combined with the
//   Form 5 rule above ("aina – myös silloin, jos toimintaa ei ole ollut") we state that a dormant
//   toiminimi files Form 5 every year.
// - Vero, Työnantajarekisteri (updated 15.1.2025;
//   https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/tyonantajarekisteri/):
//   "ilmoita siitä mahdollisimman pian joko OmaVerossa tai YTJ:n lopettamisilmoituksella";
//   "Ilmoita ja maksa työnantajasuoritukset rekisteröinnin päättymispäivään asti."; "Yrityksen pitää
//   antaa tulorekisteriin palkkatietoilmoituksella tiedot maksetuista palkoista." Closing page:
//   "Työnantajarekisteröinti päättyy viimeiseen palkanmaksupäivään". Ennakkoperintärekisteri
//   (updated 27.2.2026; .../verohallinnon-rekisterit/ennakkoperintarekisteri/poistaminen/): removal
//   "OmaVerossa" or "YTJ-palvelussa"; "Voit hakeutua rekisteriin uudelleen, jos aloitat toiminnan
//   myöhemmin."
// - Yrittäjän eläkelaki 1272/2006 (fin@20260890; https://www.finlex.fi/fi/lainsaadanto/2006/1272):
//   149 § 1 mom. "yrittäjä on velvollinen viipymättä ilmoittamaan eläkelaitokselle tässä laissa
//   tarkoitetun yrittäjätoiminnan päättymisestä."; 111 § 3 mom. "Vakuutuksen voimassaolo päättyy,
//   jos yrittäjän ilmoituksen tai muun selvityksen perusteella käy ilmi, että yrittäjä on
//   lopettanut tässä laissa tarkoitetun yrittäjätoimintansa ... Eläkelaitos voi selvityksen saatuaan
//   päättää vakuutuksen takautuvasti siihen ajankohtaan, jolloin vakuuttamisen edellytykset eivät
//   enää täyty." The lopettamisilmoitus does not by law reach the pension company, so we tell the
//   reader to notify it separately.
// - Kirjanpitolaki 1336/1997 (fin@20260555; https://www.finlex.fi/fi/lainsaadanto/1997/1336):
//   1:4 § 1 mom. "Tilikausi on 12 kuukautta. Toimintaa aloitettaessa tai lopetettaessa ... tilikausi
//   saa olla tätä lyhyempi tai pitempi, kuitenkin enintään 18 kuukautta."; 3 mom. "ammatin- ja
//   liikkeenharjoittajan tilikautena on aina kalenterivuosi. Jos noudatetaan kahdenkertaista
//   kirjanpitoa, voi tilikausi kuitenkin erota kalenterivuodesta siten kuin 1 momentissa
//   säädetään."; 2:10 § "Tilinpäätös ... kirjanpidot ... on säilytettävä vähintään 10 vuotta
//   tilikauden päättymisestä"; "tilikauden tositteet ... on säilytettävä vähintään kuusi vuotta sen
//   vuoden lopusta, jonka aikana tilikausi on päättynyt"; 2:10 § 3 mom. when operations end the
//   records must be kept and the trader "on … ilmoitettava rekisteriviranomaiselle, kenelle
//   aineiston säilyttäminen on uskottu" (added 2026-11-23). 1:1 a § 3 mom. "Ammatin- ja
//   liikkeenharjoittaja on velvollinen laatimaan tilinpäätöksen, jos sekä päättyneellä että sitä
//   välittömästi edeltäneellä tilikaudella on ylittynyt vähintään kaksi 4 b §:ssä säädetyistä
//   rajoista." Fact-check 2026-11-23: the text used to say a tilinpäätös is prepared for the final
//   year "as usual"; for a toiminimi it is required only when two micro limits (4 b §) were exceeded
//   in both the last and the preceding year, so the final year's books are closed and form 5 is
//   filed, and a tilinpäätös is mentioned only "if required or prepared". The 4 b § euro limits are
//   deliberately not quoted. NOTE: the brief asked whether the last
//   tilikausi ends at the closing date. KPL lets it be shorter when operations end, but a
//   toiminimi's tilikausi is as a rule the calendar year; for tax only the calendar year counts
//   (Vero above). We say exactly that and do not promise a closing-date tilikausi.
// Deliberately NOT included: notice periods under the Employment Contracts Act, enterprise-mortgage
// fees, YEL contribution rates, unemployment-benefit rules (only Vero's sentence that benefits may
// require a filed closing notice), Suomi.fi mandate details beyond Vero's sentence, and any bureau
// prices. Vaavo is not mentioned.
const VERO = 'https://www.vero.fi';
const PRH = 'https://www.prh.fi';

const SRC = {
  prhFi: `${PRH}/fi/yrityksetjayhteisot/yrityksenlopettaminen/yksityisen-elinkeinonharjoittajan-lopettamisilmoitus.html`,
  prhPaper: `${PRH}/fi/yrityksetjayhteisot/yrityksenlopettaminen/yksityisen-elinkeinonharjoittajan-lopettamisilmoitus/paperilomakkeet.html`,
  prhEn: `${PRH}/en/companiesandorganisations/lopettaminen/yeh.html`,
  closingFi: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/yritystoiminnan-lopettaminen/`,
  closingEn: `${VERO}/en/businesses-and-corporations/business-operations/going-out-of-business/termination-of-business/`,
  vatEndFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaverollisen-toiminnan-paattyminen/`,
  vatEndEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/termination-of-vat-liable-activities/`,
  vatGuidance: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48656/arvonlisaverollisen-liiketoiminnan-lopettaminen-ja-konkurssi/`,
  assets: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/yritystoiminnan-lopettaminen/tuloverotus/elinkeinotoiminnan-varat-ja-velat-toiminnan-lopettamisen-yhteydessa/`,
  losses: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/yritystoiminnan-lopettaminen/tuloverotus/elinkeinotoiminnan-tappiot-lopettamisen-yhteydessa/`,
  pause: `${VERO}/yritykset-ja-yhteisot/yritystoiminta/toiminnan-lopettaminen/toiminnan-keskeyttaminen/`,
  form5Fi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/veroilmoituksen-t%C3%A4ytt%C3%B6ohje/`,
  form5En: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/instructions-for-filing/`,
  employerFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/tyonantajarekisteri/`,
  employerEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/being-an-employer/employer-register/`,
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  tvl: 'https://www.finlex.fi/fi/lainsaadanto/1992/1535',
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
  yel: 'https://www.finlex.fi/fi/lainsaadanto/2006/1272',
};

export const toiminimenLopettaminen: Guide = {
  slug: 'toiminimen-lopettaminen',
  datePublished: '2026-11-26',
  dateModified: '2026-11-26',
  content: {
    fi: {
      title: 'Toiminimen lopettaminen 2026: ilmoitukset, ALV, verot ja YEL vaihe vaiheelta',
      description:
        'Toiminimen lopettaminen: maksuton lopettamisilmoitus, viimeinen alv-ilmoitus, omaan käyttöön jäävän omaisuuden verotus, veroilmoitus 5, YEL ja tarkistuslista.',
      lead: 'Moni toiminimiyrittäjä lopettaa vuodenvaihteessa: edessä on muutto ulkomaille, siirtyminen palkkatöihin tai toiminnan jatkaminen osakeyhtiönä. Itse lopettamisilmoitus on maksuton ja nopea, mutta sen jälkeen hoidetaan vielä viimeinen alv-ilmoitus, yritykseen jääneen omaisuuden verotus, viimeinen veroilmoitus, YEL-vakuutus ja kirjanpidon arkistointi. Kokosimme vaiheet, määräajat, esimerkin euroina ja yleisimmät virheet.',
      body: [
        { t: 'h2', x: 'Lopettamisilmoitus: maksuton, ja Y-tunnus säilyy' },
        { t: 'p', x: 'Toiminimi lopetetaan lopettamisilmoituksella YTJ-palvelussa tai paperilla Y6-lomakkeella. Patentti- ja rekisterihallituksen mukaan ilmoitus tehdään viivytyksettä ja se on maksuton. Samalla ilmoituksella tiedot menevät sekä kaupparekisteriin että Verohallintoon, ja voit samalla poistua alv-rekisteristä, ennakkoperintärekisteristä ja työnantajarekisteristä.' },
        { t: 'ul', items: [
          'Netissä tehty ilmoitus voidaan rekisteröidä automaattisesti, ja se on nopeampi kuin paperilomake.',
          'Ilmoituksen allekirjoittaa yrittäjä itse tai hänen valtuuttamansa henkilö.',
          'Jos toiminimellä on yrityskiinnityksiä, ne on ensin kuoletettava tai siirrettävä. Kiinnitykset näet PRH:n Virre-tietopalvelusta.',
          'Kun lopettaminen on rekisteröity, toiminimen rekisteröintisuoja päättyy.',
          'Y-tunnus ei katoa: jos aloitat myöhemmin uudelleen toiminimellä, käytät samaa Y-tunnusta.',
          'Jos toiminimeäsi ei ole merkitty kaupparekisteriin, lopettamisesta voi ilmoittaa Verohallinnolle myös OmaVerossa.',
        ] },
        { t: 'p', x: 'Ilman lopettamisilmoitusta toiminnan katsotaan jatkuvan, ja alv-ilmoitukset sekä muut oma-aloitteisten verojen ilmoitukset on annettava edelleen. Verohallinnon mukaan myös työttömyyskorvauksen ja muiden etuuksien edellytyksenä voi olla, että toiminta on todella lopetettu ja siitä on ilmoitettu.' },
        { t: 'h2', x: 'Arvonlisävero: viimeinen ilmoitus ja loppuvarasto' },
        { t: 'p', x: 'Ilmoita alv-toiminnan päättymisestä heti, kun tiedät sen. Arvonlisäveroilmoitus annetaan vielä siltä verokaudelta, jonka aikana rekisteröinti päättyy, vaikka toimintaa ei enää olisi. Siksi päättymispäiväksi kannattaa yleensä ilmoittaa kuukauden viimeinen päivä: jos ilmoitat päättymispäiväksi 1.6., joudut antamaan ilmoituksen vielä kesäkuulta. Vaihtoehtoisesti voit pysyä rekisterissä siihen asti, kun liikeomaisuus on myyty.' },
        { t: 'ul', items: [
          'Kuukausi- tai neljännesvuosikausi: ilmoitus ja maksu viimeistään viimeistä verokautta seuraavan toisen kuukauden 12. päivänä.',
          'Kalenterivuosikausi ja toiminta päättyy kesken vuoden: viimeistään lopettamiskuukautta seuraavan toisen kuukauden 12. päivänä.',
          'Kalenterivuosikausi ja rekisteröinti jatkuu 31.12. asti: viimeistään seuraavan vuoden helmikuun viimeisenä päivänä.',
          'Vapaaehtoisesti alv-rekisteriin hakeutunut poistetaan rekisteristä aikaisintaan siitä päivästä, jona ilmoitus saapuu Verohallintoon, eli ei takautuvasti.',
          'Rekisteristä poistamisen jälkeen laskuihin ei saa enää lisätä arvonlisäveroa eikä ostojen arvonlisäveroa saa vähentää.',
        ] },
        { t: 'h3', x: 'Omaan käyttöön jäävä omaisuus' },
        { t: 'p', x: 'Kun verovelvollisuus päättyy, yrittäjän haltuun jääneistä tavaroista ja palveluista maksetaan arvonlisävero niin kuin ne olisi otettu omaan käyttöön (AVL 21 § 3 mom. ja 22 § 3 mom.). Vero koskee loppuvarastoa sekä esimerkiksi työkaluja ja koneita, joiden hankinnasta on vähennetty arvonlisävero tai jotka on valmistettu verollisessa toiminnassa. Omasta henkilökohtaisesta omaisuudesta veroa ei makseta, eikä myöskään tavarasta, jonka arvonlisäveroa ei ole saanut vähentää, kuten tavallisesta henkilöautosta.' },
        { t: 'p', x: 'Veron peruste on tavaran ostohinta tai sitä alempi todennäköinen luovutushinta ilman arvonlisäveroa (AVL 74 §), ja vero lasketaan yleisellä 25,5 %:n kannalla tai tavaran omalla verokannalla. Se ilmoitetaan lopettamiskuukauden alv-ilmoituksella myynnin veroissa. Kun oman käytön vero on maksettu, tavaroiden myöhemmästä myynnistä ei enää makseta arvonlisäveroa.' },
        { t: 'p', x: 'Jos yritys on tehnyt kiinteistöön uudisrakennus- tai perusparannusinvestointeja, niistä tehtyjä arvonlisäverovähennyksiä voidaan joutua tarkistamaan lopettamisen yhteydessä.' },
        { t: 'h2', x: 'Tuloverotus: viimeinen veroilmoitus ja yksityisotot' },
        { t: 'p', x: 'Elinkeinotoiminnan veroilmoitus (lomake 5) annetaan vielä siltä vuodelta, jonka aikana toiminta päättyi, ja siinä ilmoitetaan myös toiminnan päättyminen. Vuoden 2026 ilmoitus on annettava viimeistään 1.4.2027; tarkista oma päiväsi OmaVerosta. Verotuksessa ratkaisee kalenterivuosi, ei se, milloin tilikausi todellisuudessa päättyi.' },
        { t: 'p', x: 'Verohallinnon mukaan toiminta on päättynyt vasta, kun elinkeinotoimintaan ei jää lainkaan varallisuutta eikä velkoja. Omaisuus joko myydään tai siirretään yksityistalouteen, ja molemmat vaikuttavat viimeisen vuoden tulokseen:' },
        { t: 'ul', items: [
          'Myynti ulkopuoliselle: sovittu kauppahinta on veronalaista tuloa, ja verotuksessa poistamaton hankintameno on vähennyskelpoinen kulu.',
          'Yksityiskäyttöön ottaminen (EVL 51 b §): luovutushinnaksi katsotaan alkuperäinen hankintameno tai sitä alempi todennäköinen luovutushinta. Arvonnousua ei siis veroteta, mutta liian suuret aiemmat poistot palautuvat tuloksi.',
          'Toimintavaraus puretaan ja luetaan lopettamisvuoden tuloksi.',
          'Jos omaisuuden luovutuksesta syntyy suuri kertatulo, voit vaatia tulontasausta (TVL 128 §). Edellytyksenä on, että elinkeinotoiminnan tuloksen ansiotulo-osuutena verotettava kertatulo on vähintään 2 500 euroa ja vähintään neljäsosa vuoden puhtaasta ansiotulosta ja että se on kertynyt kahdelta tai useammalta vuodelta. Tulo tasataan enintään viidelle vuodelle, tulontasausta on vaadittava ennen kuin kyseisen vuoden verotus päättyy, ja se keventää vain valtionveroa.',
        ] },
        { t: 'h3', x: 'Ennakkovero ja vanhat tappiot' },
        { t: 'p', x: 'Ennakkoveron maksaminen ei lopu lopettamispäivään. Tarkista ennakkovero OmaVerossa ja hae muutosta, jos viimeisen vuoden tulos poikkeaa arviosta, jotta et maksa liikaa tai liian vähän.' },
        { t: 'p', x: 'Elinkeinotoiminnalle vahvistetut tappiot eivät häviä: ne tappiot, jotka toiminnan loppumisen vuoksi jäisivät muuten vähentämättä, voi vähentää pääomatuloista (TVL 121 §) muiden vähennysten jälkeen sekä lopettamisvuonna että myöhempinä vuosina tappiovuotta seuraavien 10 verovuoden aikana. Palkkatuloista niitä ei vähennetä, eikä lopettaminen pidennä 10 vuoden aikaa. Jos aloitat myöhemmin uuden yritystoiminnan, jäljellä olevat tappiot voi vähentää sen tuloista.' },
        { t: 'h2', x: 'Esimerkki euroina' },
        { t: 'p', x: 'Alv-rekisterissä oleva remonttiyrittäjä lopettaa 31.12.2026, verokausi on kuukausi, ja hän ottaa työkalut ja jäljelle jääneen tarvikevaraston omaan käyttöönsä. Molempien arvonlisävero on aikanaan vähennetty.' },
        { t: 'ul', items: [
          'Tarvikkeet: ostohinta 3 000,00 € (alv 0 %), todennäköinen luovutushinta nyt 1 200,00 €. Veron peruste on alempi 1 200,00 €, ja oman käytön vero 306,00 € (25,5 %).',
          'Työkalut: ostohinta 4 000,00 € (alv 0 %), todennäköinen luovutushinta 1 000,00 €. Oman käytön vero 255,00 €.',
          'Joulukuun 2026 alv-ilmoitukseen lisätään myynnin veroihin 561,00 €. Määräpäivä on 12.2.2027.',
          'Tuloverotuksessa: jos työkalujen verotuksessa poistamaton hankintameno on 600,00 € ja todennäköinen luovutushinta 1 000,00 €, erotus 400,00 € on vuoden 2026 elinkeinotoiminnan tuloa. Jos poistamaton hankintameno olisi 1 500,00 €, erotus 500,00 € olisi vähennyskelpoinen kulu.',
        ] },
        { t: 'h2', x: 'YEL-vakuutus' },
        { t: 'p', x: 'Yrittäjän on ilmoitettava yrittäjätoiminnan päättymisestä eläkeyhtiölle viipymättä (YEL 149 §). Vakuutus päättyy, kun ilmoituksesta tai muusta selvityksestä käy ilmi, että toiminta on lopetettu, ja eläkeyhtiö voi päättää sen takautuvasti siihen päivään, jolloin vakuuttamisen edellytykset lakkasivat. Ilmoita siis eläkeyhtiölle erikseen, älä luota siihen, että tieto kulkee YTJ:n kautta.' },
        { t: 'h2', x: 'Työntekijät, työnantajarekisteri ja ennakkoperintärekisteri' },
        { t: 'ul', items: [
          'Työnantajarekisteröinti päättyy viimeiseen palkanmaksupäivään. Ilmoita ja maksa työnantajasuoritukset rekisteröinnin päättymispäivään asti.',
          'Viimeiset palkat ilmoitetaan tulorekisteriin palkkatietoilmoituksella kuten muutkin palkat.',
          'Jos maksat vielä myöhemmin satunnaisia palkkoja, niistäkin ilmoitetaan ja maksetaan työnantajasuoritukset.',
          'Ennakkoperintärekisteristä poistutaan samalla lopettamisilmoituksella. Rekisteriin voi hakeutua uudelleen, jos toiminta myöhemmin alkaa.',
        ] },
        { t: 'h2', x: 'Kirjanpito ja arkistointi' },
        { t: 'p', x: 'Viimeisen tilikauden kirjanpito päätetään, ja siinä näkyvät loppuvaraston, käyttöomaisuuden ja pankkitilin siirrot yksityistalouteen; tulos ilmoitetaan veroilmoituksella 5. Tilinpäätös on laadittava vain, jos sekä viimeisellä että sitä edeltäneellä tilikaudella on ylittynyt vähintään kaksi kirjanpitolain 1:4 b §:n mikroyrityksen rajoista (KPL 1:1 a § 3 mom.), tai jos se laaditaan muuten. Kirjanpitolaki sallii toimintaa lopetettaessa tavallista lyhyemmän tilikauden, mutta toiminimen tilikausi on lähtökohtaisesti kalenterivuosi, ja kahdenkertaista kirjanpitoa pitävä voi poiketa siitä. Verotuksessa ratkaisee joka tapauksessa kalenterivuosi.' },
        { t: 'p', x: 'Arkistointivelvollisuus jatkuu lopettamisen jälkeen: kirjanpidot ja tilinpäätös, jos se on laadittu, säilytetään vähintään 10 vuotta tilikauden päättymisestä ja tositteet vähintään 6 vuotta sen vuoden lopusta, jonka aikana tilikausi päättyi (KPL 2:10 §). Kun toiminta loppuu, rekisteriviranomaiselle (PRH) on myös ilmoitettava, kenelle aineiston säilyttäminen on uskottu (KPL 2:10 § 3 mom.). Aineiston on oltava tarkasteltavissa Suomesta käsin myös silloin, kun muutat ulkomaille.' },
        { t: 'h2', x: 'Velat jäävät yrittäjälle' },
        { t: 'p', x: 'Verohallinnon sanoin liikkeen- tai ammatinharjoittaja vastaa henkilökohtaisesti elinkeinotoiminnan veloista ja niiden maksamisesta toiminnan loputtua. Lopettaminen ei siis kuittaa velkoja, verovelkoja eikä vielä tulevia laskuja.' },
        { t: 'h2', x: 'Lopettaa vai jättää lepäämään?' },
        { t: 'p', x: 'Jos et ole varma, ettet palaa yrittäjäksi, toiminnan voi myös keskeyttää. Silloin ilmoitat OmaVerossa tai YTJ:n muutosilmoituksella Verohallinnon rekisterien päättymispäivän, mutta kaupparekisterimerkintä jää voimaan. Velvollisuudet eivät kuitenkaan lopu kokonaan:' },
        { t: 'ul', items: [
          'Elinkeinotoiminnan veroilmoitus 5 on annettava joka vuosi, myös silloin, kun toimintaa ei ole ollut.',
          'Niin kauan kuin olet alv-rekisterissä, alv-ilmoitukset annetaan jokaiselta verokaudelta, vaikka myyntiä ei olisi.',
          'YEL-vakuutus on silti päätettävä, kun yrittäjätoiminta tosiasiassa loppuu.',
          'Toiminimi pysyy suojattuna kaupparekisterissä.',
        ] },
        { t: 'p', x: 'Jos toiminta jatkuu osakeyhtiönä, kyse ei ole tavallisesta lopettamisesta vaan yritysmuodon muutoksesta (EVL 51 c § ja TVL 24 §). Siitä kerromme oppaissamme Toiminimi vai osakeyhtiö? ja Osakeyhtiön perustaminen vaihe vaiheelta.' },
        { t: 'h3', x: 'Jos muutat ulkomaille' },
        { t: 'p', x: 'Hoida lopettamisilmoitus, viimeinen alv-ilmoitus ja YEL-ilmoitus ennen muuttoa ja sovi, kuka antaa viimeisen veroilmoituksen. Jos tilitoimisto hoitaa sen, varmista Suomi.fi-valtuus: Verohallinnon mukaan kaupparekisteristä poistetun yrityksen puolesta ei voi asioida OmaVerossa ilman sitä.' },
        { t: 'h2', x: 'Tarkistuslista' },
        { t: 'ol', items: [
          'Päätä lopettamispäivä; vuodenvaihteessa 31.12. on usein selkein.',
          'Myy tai ota omaan käyttöön varasto ja käyttöomaisuus ja dokumentoi todennäköinen luovutushinta (esimerkiksi tarjous tai hinta-arvio).',
          'Tarkista ja järjestä mahdolliset yrityskiinnitykset.',
          'Tee lopettamisilmoitus YTJ-palvelussa tai Y6-lomakkeella; poista samalla yritys alv-, ennakkoperintä- ja työnantajarekisteristä.',
          'Ilmoita eläkeyhtiölle yrittäjätoiminnan päättymisestä.',
          'Maksa viimeiset palkat ja ilmoita ne tulorekisteriin.',
          'Laske loppuvaraston ja muun omaan käyttöön jäävän omaisuuden arvonlisävero ja anna viimeinen alv-ilmoitus ajallaan.',
          'Tarkista ennakkovero OmaVerossa.',
          'Päätä viimeisen vuoden kirjanpito (tilinpäätös vain, jos se on pakollinen tai laaditaan muuten) ja anna veroilmoitus 5, jossa ilmoitat toiminnan päättymisen.',
          'Irtisano yrityksen sopimukset (liiketila, liittymät, vakuutukset, pankkitili), kun viimeiset maksut on hoidettu.',
          'Arkistoi kirjanpito: tositteet 6 vuotta, kirjanpidot ja tilinpäätös (jos se on laadittu) 10 vuotta; ilmoita PRH:lle, kuka aineistoa säilyttää.',
        ] },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Lopettamisilmoitus jää tekemättä, ja Verohallinto odottaa yhä alv-ilmoituksia ja veroilmoituksia.',
          'Päättymispäiväksi ilmoitetaan seuraavan kuukauden ensimmäinen päivä, jolloin syntyy ylimääräinen alv-ilmoitus.',
          'Loppuvaraston ja omaan käyttöön jäävien koneiden arvonlisävero unohdetaan.',
          'Auto tai työkalut siirretään itselle kirjaamatta yksityisottoa, ja viimeisen vuoden tulos jää vääräksi.',
          'YEL-vakuutus jää voimaan, koska eläkeyhtiölle ei ilmoiteta.',
          'Viimeistä veroilmoitusta ei anneta, koska yritys on jo poistettu rekisteristä.',
          'Kirjanpitoaineisto hävitetään lopettamisen yhteydessä.',
        ] },
        { t: 'note', x: 'Tiedot on tarkistettu marraskuussa 2026: lopettamisilmoitus on maksuton (Y6 paperilla), toiminimen Y-tunnus säilyy uudelleenaloitusta varten, yleinen arvonlisäverokanta on 25,5 %, vuoden 2026 elinkeinotoiminnan veroilmoituksen määräpäivä on 1.4.2027 ja tositteet säilytetään 6 vuotta sekä kirjanpidot ja tilinpäätös, jos se on laadittu, 10 vuotta. Lähteet: Patentti- ja rekisterihallitus, Verohallinto, arvonlisäverolaki (1501/1993), elinkeinoverolaki (360/1968), tuloverolaki (1535/1992), kirjanpitolaki (1336/1997) ja yrittäjän eläkelaki (1272/2006).' },
        { t: 'h2', x: 'Autamme toiminimen lopettamisessa' },
        { t: 'p', x: 'Tilitoimisto Debit Credit hoitaa toiminimen viimeisen vuoden kirjanpidon ja tarvittaessa tilinpäätöksen, laskee loppuvaraston ja omaan käyttöön jäävän omaisuuden arvonlisäveron, antaa viimeisen alv-ilmoituksen ja veroilmoituksen 5 sekä tarkistaa ennakkoveron ja vanhojen tappioiden käytön. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä jo ennen lopettamispäivää, niin ehdimme suunnitella omaisuuden siirrot ja ilmoitukset oikeassa järjestyksessä.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'PRH: yksityisen elinkeinonharjoittajan (toiminimiyrittäjän) lopettaminen', href: SRC.prhFi },
          { label: 'PRH: paperilomakkeet (Y6) lopettamisilmoitusta varten', href: SRC.prhPaper },
          { label: 'Verohallinto: toiminnan lopettaminen', href: SRC.closingFi },
          { label: 'Verohallinto: arvonlisäverollisen toiminnan päättyminen', href: SRC.vatEndFi },
          { label: 'Verohallinto: arvonlisäverollisen liiketoiminnan lopettaminen ja konkurssi (syventävä ohje)', href: SRC.vatGuidance },
          { label: 'Verohallinto: elinkeinotoiminnan varat ja velat toiminnan lopettamisen yhteydessä', href: SRC.assets },
          { label: 'Verohallinto: elinkeinotoiminnan tappiot lopettamisen yhteydessä', href: SRC.losses },
          { label: 'Verohallinto: elinkeinotoiminnan veroilmoitus 5 – ohje', href: SRC.form5Fi },
          { label: 'Verohallinto: toiminnan keskeyttäminen', href: SRC.pause },
          { label: 'Verohallinto: työnantajarekisteri', href: SRC.employerFi },
          { label: 'Finlex: arvonlisäverolaki (1501/1993)', href: SRC.avl },
          { label: 'Finlex: elinkeinoverolaki (360/1968)', href: SRC.evl },
          { label: 'Finlex: tuloverolaki (1535/1992)', href: SRC.tvl },
          { label: 'Finlex: kirjanpitolaki (1336/1997)', href: SRC.kpl },
          { label: 'Finlex: yrittäjän eläkelaki (1272/2006)', href: SRC.yel },
        ] },
      ],
      faq: [
        { q: 'Maksaako toiminimen lopettaminen jotain?', a: 'Lopettamisilmoitus kaupparekisteriin on PRH:n mukaan maksuton, teetpä sen YTJ-palvelussa tai Y6-lomakkeella. Kustannuksia voi silti syntyä viimeisen vuoden veroista, esimerkiksi loppuvaraston oman käytön arvonlisäverosta ja omaisuuden siirroista yksityistalouteen.' },
        { q: 'Saanko saman Y-tunnuksen, jos aloitan myöhemmin uudelleen?', a: 'Saat. PRH:n mukaan uudelleen aloittava toiminimiyrittäjä käyttää hänelle aiemmin annettua Y-tunnusta. Toiminimen nimen rekisteröintisuoja kuitenkin päättyy, kun lopettaminen on rekisteröity.' },
        { q: 'Pitääkö yrityksen auto tai työkalut myydä ennen lopettamista?', a: 'Ei tarvitse. Ne voi ottaa omaan käyttöön, mutta silloin tuloverotuksessa luovutushinnaksi katsotaan alkuperäinen hankintameno tai sitä alempi todennäköinen luovutushinta. Jos tavaran arvonlisävero on aikanaan vähennetty, siitä maksetaan lisäksi oman käytön arvonlisävero viimeisellä alv-ilmoituksella.' },
        { q: 'Voiko toiminimen vanhoja tappioita käyttää lopettamisen jälkeen?', a: 'Vahvistetut elinkeinotoiminnan tappiot, jotka toiminnan loppumisen vuoksi jäisivät muuten käyttämättä, voi vähentää pääomatuloista lopettamisvuonna ja myöhempinä vuosina tappiovuotta seuraavien 10 verovuoden aikana, mutta ei palkkatuloista. Jos aloitat myöhemmin uuden yritystoiminnan, jäljellä olevat tappiot voi vähentää sen tuloista.' },
        { q: 'Mitä velvollisuuksia jää, jos toiminimi jätetään lepäämään?', a: 'Kaupparekisterimerkintä jää voimaan, ja elinkeinotoiminnan veroilmoitus 5 on annettava joka vuosi, vaikka toimintaa ei olisi. Jos pysyt alv-rekisterissä, alv-ilmoitukset annetaan jokaiselta verokaudelta. YEL-vakuutus on päätettävä, kun yrittäjätoiminta tosiasiassa loppuu.' },
        { q: 'Vastaanko toiminimen veloista vielä lopettamisen jälkeen?', a: 'Vastaat. Toiminimiyrittäjä vastaa henkilökohtaisesti elinkeinotoiminnan veloista ja niiden maksamisesta myös toiminnan loputtua.' },
      ],
    },
    ru: {
      title: 'Закрытие toiminimi в Финляндии 2026: уведомления, НДС, налоги и YEL по шагам',
      description:
        'Как закрыть toiminimi (ИП) в Финляндии: бесплатное уведомление, последняя декларация по НДС, налоги на имущество, которое вы оставляете себе, форма 5, YEL.',
      lead: 'Многие предприниматели с toiminimi закрывают бизнес на рубеже года: кто-то уезжает из Финляндии, кто-то переходит на работу по найму, кто-то продолжает дело как osakeyhtiö. Само уведомление о прекращении бесплатное и делается быстро, но после него остаются последняя декларация по НДС, налогообложение имущества, оставшегося в бизнесе, последняя налоговая декларация, страховка YEL и архив бухгалтерии. Мы собрали шаги, сроки, пример в евро и типичные ошибки.',
      body: [
        { t: 'h2', x: 'Уведомление о прекращении: бесплатно, Y-tunnus сохраняется' },
        { t: 'p', x: 'Toiminimi закрывают уведомлением о прекращении деятельности (lopettamisilmoitus) в сервисе YTJ или на бумажной форме Y6. По данным Патентно-регистрационного ведомства (PRH), уведомление нужно подать без промедления, и оно бесплатное. Одно и то же уведомление попадает и в торговый реестр, и в Налоговую службу (Verohallinto), и им же можно выйти из реестра плательщиков НДС, реестра предоплаты (ennakkoperintärekisteri) и реестра работодателей.' },
        { t: 'ul', items: [
          'Уведомление, поданное онлайн, может быть зарегистрировано автоматически, и это быстрее бумажной формы.',
          'Уведомление подписывает сам предприниматель или уполномоченное им лицо.',
          'Если на бизнес зарегистрированы залоги предприятия (yrityskiinnitys), их сначала нужно погасить или передать. Проверить их можно в сервисе PRH Virre.',
          'После регистрации прекращения защита названия toiminimi заканчивается.',
          'Y-tunnus не пропадает: если позже вы снова откроете toiminimi, будет использован тот же Y-tunnus.',
          'Если ваш toiminimi не внесён в торговый реестр, сообщить о прекращении в Налоговую можно и через OmaVero.',
        ] },
        { t: 'p', x: 'Без уведомления деятельность считается продолжающейся, и декларации по НДС и другим налогам, которые платятся самостоятельно, нужно подавать дальше. По словам Налоговой, для пособия по безработице и других выплат может требоваться, чтобы деятельность была действительно прекращена и об этом было сообщено.' },
        { t: 'h2', x: 'НДС: последняя декларация и остатки товаров' },
        { t: 'p', x: 'Сообщите о прекращении деятельности, облагаемой НДС, как только узнаете о нём. Декларация по НДС подаётся и за тот налоговый период, в котором заканчивается регистрация, даже если деятельности уже не было. Поэтому датой окончания обычно лучше указать последний день месяца: если указать 1.6., придётся подавать декларацию ещё и за июнь. Можно также оставаться в реестре, пока не будет продано имущество бизнеса.' },
        { t: 'ul', items: [
          'Период месяц или квартал: декларация и оплата не позднее 12-го числа второго месяца после последнего налогового периода.',
          'Период календарный год, деятельность закончилась в середине года: не позднее 12-го числа второго месяца после месяца прекращения.',
          'Период календарный год, регистрация действует до 31.12.: не позднее последнего дня февраля следующего года.',
          'Кто встал в реестр НДС добровольно, того исключают не раньше дня, когда уведомление поступило в Налоговую, то есть задним числом нельзя.',
          'После исключения из реестра добавлять НДС в счета и вычитать НДС по покупкам уже нельзя.',
        ] },
        { t: 'h3', x: 'Имущество, которое вы оставляете себе' },
        { t: 'p', x: 'Когда обязанность платить НДС прекращается, с товаров и услуг, оставшихся у предпринимателя, платят НДС так, как если бы их взяли в собственное пользование (AVL 21 § 3 mom. и 22 § 3 mom.). Это касается остатков на складе, а также, например, инструментов и оборудования, НДС по которым был вычтен или которые изготовлены в облагаемой деятельности. С личного имущества налог не платится, как и с вещей, НДС по которым вычитать было нельзя, например с обычного легкового автомобиля.' },
        { t: 'p', x: 'База налога — цена покупки или более низкая вероятная цена продажи без НДС (AVL 74 §); ставка — общая 25,5 % или ставка, действующая для этого товара. Налог указывается в декларации по НДС за месяц прекращения в разделе продаж. После уплаты этого налога дальнейшая продажа этих вещей НДС уже не облагается.' },
        { t: 'p', x: 'Если бизнес вкладывал средства в новое строительство или капитальный ремонт недвижимости, при закрытии может потребоваться пересмотр (tarkistus) ранее вычтенного НДС.' },
        { t: 'h2', x: 'Подоходный налог: последняя декларация и изъятие имущества' },
        { t: 'p', x: 'Декларация по предпринимательской деятельности (форма 5) подаётся ещё и за тот год, в котором деятельность закончилась, и в ней указывается факт прекращения. Декларацию за 2026 год нужно подать не позднее 1.4.2027; свою дату проверьте в OmaVero. В налогообложении решает календарный год, а не то, когда фактически закончился финансовый период (tilikausi).' },
        { t: 'p', x: 'По позиции Налоговой, деятельность прекращена только тогда, когда в бизнесе не осталось ни имущества, ни долгов. Имущество либо продают, либо переводят в личное хозяйство, и оба варианта влияют на результат последнего года:' },
        { t: 'ul', items: [
          'Продажа третьему лицу: согласованная цена облагается налогом, а не списанная в налоговом учёте стоимость приобретения вычитается как расход.',
          'Изъятие в личное пользование (EVL 51 b §): ценой передачи считается первоначальная стоимость приобретения или более низкая вероятная цена продажи. Рост стоимости не облагается, но излишняя амортизация прошлых лет возвращается в доход.',
          'Резерв деятельности (toimintavaraus) расформировывается и включается в доход года прекращения.',
          'Если передача имущества даёт крупный разовый доход, можно потребовать выравнивания дохода (tulontasaus, TVL 128 §). Условия: разовый доход, облагаемый как трудовая доля (ansiotulo) результата предпринимательской деятельности, составляет не менее 2 500 евро и не менее четверти чистого трудового дохода за год и накопился за два года или больше. Доход распределяется не более чем на 5 лет, потребовать выравнивания нужно до окончания налогообложения за этот год, и оно снижает только государственный налог.',
        ] },
        { t: 'h3', x: 'Авансовый налог и прошлые убытки' },
        { t: 'p', x: 'Обязанность платить авансовый налог (ennakkovero) не заканчивается в день прекращения. Проверьте его в OmaVero и подайте изменение, если результат последнего года отличается от прогноза, чтобы не переплатить и не недоплатить.' },
        { t: 'p', x: 'Подтверждённые убытки предпринимательской деятельности не пропадают: те из них, которые из-за прекращения деятельности иначе остались бы невычтенными, можно вычесть из доходов от капитала (TVL 121 §) после прочих вычетов — в год прекращения и в последующие годы, в пределах 10 налоговых лет после года убытка. Из зарплаты их не вычитают, и закрытие этот срок не продлевает. Если позже вы начнёте новый бизнес, оставшиеся убытки можно вычесть из его доходов.' },
        { t: 'h2', x: 'Пример в евро' },
        { t: 'p', x: 'Ремонтник, зарегистрированный плательщиком НДС, закрывает toiminimi 31.12.2026, налоговый период — месяц. Инструменты и оставшиеся материалы он забирает себе. НДС по ним в своё время был вычтен.' },
        { t: 'ul', items: [
          'Материалы: цена покупки 3 000,00 € (без НДС), вероятная цена продажи сейчас 1 200,00 €. База налога — меньшая сумма 1 200,00 €, НДС на собственное пользование 306,00 € (25,5 %).',
          'Инструменты: цена покупки 4 000,00 € (без НДС), вероятная цена продажи 1 000,00 €. НДС на собственное пользование 255,00 €.',
          'В декларацию по НДС за декабрь 2026 года к налогу с продаж добавляется 561,00 €. Срок — 12.2.2027.',
          'Подоходный налог: если не списанная в налоговом учёте стоимость инструментов 600,00 €, а вероятная цена продажи 1 000,00 €, разница 400,00 € — доход бизнеса за 2026 год. Если бы не списанная стоимость была 1 500,00 €, разница 500,00 € была бы вычитаемым расходом.',
        ] },
        { t: 'h2', x: 'Страховка YEL' },
        { t: 'p', x: 'Предприниматель обязан без промедления сообщить пенсионной компании о прекращении предпринимательской деятельности (YEL 149 §). Страховка прекращается, когда из уведомления или иных сведений видно, что деятельность прекращена, и пенсионная компания может закрыть её задним числом с того дня, когда условия страхования перестали выполняться. Поэтому сообщите пенсионной компании отдельно и не рассчитывайте, что данные дойдут через YTJ.' },
        { t: 'h2', x: 'Работники, реестр работодателей и реестр предоплаты' },
        { t: 'ul', items: [
          'Регистрация работодателя заканчивается в последний день выплаты зарплаты. Декларируйте и платите взносы работодателя до даты окончания регистрации.',
          'Последние зарплаты подаются в реестр доходов (tulorekisteri) обычным уведомлением о зарплате.',
          'Если позже вы ещё разово платите зарплату, по ней тоже подаются данные и платятся взносы работодателя.',
          'Из реестра предоплаты выходят тем же уведомлением о прекращении. Если деятельность позже возобновится, в реестр можно встать снова.',
        ] },
        { t: 'h2', x: 'Бухгалтерия и архив' },
        { t: 'p', x: 'Бухгалтерию последнего финансового периода закрывают, и в ней отражается перевод остатков, основных средств и банковского счёта в личное хозяйство; результат указывается в декларации по форме 5. Tilinpäätös обязателен, только если и в последнем, и в предыдущем финансовом периоде превышены как минимум два из порогов микропредприятия по KPL 1:4 b § (KPL 1:1 a § 3 mom.), либо если его составляют по собственному решению. Закон о бухгалтерском учёте (KPL) допускает более короткий период при прекращении деятельности, но у toiminimi финансовый период, как правило, календарный год; при двойной бухгалтерии возможны отступления. Для налогов в любом случае решает календарный год.' },
        { t: 'p', x: 'Обязанность хранить документы сохраняется и после закрытия: учётные регистры и tilinpäätös, если он составлялся, — не менее 10 лет с конца финансового периода, первичные документы (tositteet) — не менее 6 лет с конца года, в котором закончился период (KPL 2:10 §). При прекращении деятельности нужно также сообщить регистрирующему органу (PRH), кому поручено хранение материалов (KPL 2:10 § 3 mom.). Материалы должны быть доступны для проверки из Финляндии и тогда, когда вы уехали за границу.' },
        { t: 'h2', x: 'Долги остаются за предпринимателем' },
        { t: 'p', x: 'По формулировке Налоговой, предприниматель лично отвечает по долгам предпринимательской деятельности и за их оплату и после её прекращения. Закрытие не списывает ни долги, ни налоговую задолженность, ни счета, которые ещё придут.' },
        { t: 'h2', x: 'Закрыть или оставить «спать»?' },
        { t: 'p', x: 'Если вы не уверены, что не вернётесь к предпринимательству, деятельность можно приостановить. Тогда в OmaVero или уведомлением об изменениях в YTJ вы указываете дату выхода из реестров Налоговой, а запись в торговом реестре остаётся. Обязанности при этом не исчезают полностью:' },
        { t: 'ul', items: [
          'Декларацию по форме 5 нужно подавать каждый год, даже если деятельности не было.',
          'Пока вы в реестре НДС, декларации подаются за каждый налоговый период, даже без продаж.',
          'Страховку YEL всё равно нужно прекратить, когда предпринимательская деятельность фактически закончилась.',
          'Название toiminimi остаётся защищённым в торговом реестре.',
        ] },
        { t: 'p', x: 'Если деятельность продолжается в форме osakeyhtiö, это не обычное закрытие, а смена формы предприятия (EVL 51 c § и TVL 24 §). Об этом — в наших гидах «Toiminimi или Oy? Как выбрать правильную форму бизнеса» и «Открытие osakeyhtiö (Oy) пошагово в Финляндии».' },
        { t: 'h3', x: 'Если вы уезжаете из Финляндии' },
        { t: 'p', x: 'Подайте уведомление о прекращении, последнюю декларацию по НДС и уведомление в пенсионную компанию до переезда и договоритесь, кто подаст последнюю налоговую декларацию. Если её подаёт бухгалтерская фирма, проверьте доверенность Suomi.fi: по данным Налоговой, без неё нельзя действовать в OmaVero от имени предприятия, исключённого из торгового реестра.' },
        { t: 'h2', x: 'Чек-лист' },
        { t: 'ol', items: [
          'Выберите дату прекращения; на рубеже года 31.12. обычно самый понятный вариант.',
          'Продайте или заберите себе товары и основные средства и задокументируйте вероятную цену продажи (например, предложение или оценку).',
          'Проверьте и урегулируйте залоги предприятия, если они есть.',
          'Подайте уведомление о прекращении в YTJ или на форме Y6; тем же уведомлением выйдите из реестров НДС, предоплаты и работодателей.',
          'Сообщите пенсионной компании о прекращении предпринимательской деятельности.',
          'Выплатите последние зарплаты и подайте данные в tulorekisteri.',
          'Рассчитайте НДС на остатки и прочее имущество, которое оставляете себе, и вовремя подайте последнюю декларацию по НДС.',
          'Проверьте авансовый налог в OmaVero.',
          'Закройте бухгалтерию последнего года (tilinpäätös — только если он обязателен или вы его составляете) и подайте форму 5 с отметкой о прекращении.',
          'Расторгните договоры бизнеса (помещение, связь, страховки, банковский счёт), когда все последние платежи проведены.',
          'Сохраните архив: первичные документы 6 лет, учётные регистры и tilinpäätös (если он составлялся) 10 лет; сообщите в PRH, кто хранит материалы.',
        ] },
        { t: 'h2', x: 'Типичные ошибки' },
        { t: 'ul', items: [
          'Уведомление о прекращении не подано, и Налоговая по-прежнему ждёт декларации по НДС и подоходному налогу.',
          'Датой окончания указано первое число следующего месяца, и появляется лишняя декларация по НДС.',
          'Забывают НДС на остатки товаров и на оборудование, которое оставляют себе.',
          'Машину или инструменты забирают себе без проводки изъятия, и результат последнего года получается неверным.',
          'Страховка YEL продолжает действовать, потому что пенсионной компании не сообщили.',
          'Последнюю налоговую декларацию не подают, раз бизнес уже исключён из реестра.',
          'Бухгалтерские документы уничтожают при закрытии.',
        ] },
        { t: 'note', x: 'Данные проверены в ноябре 2026 года: уведомление о прекращении бесплатное (на бумаге — форма Y6), Y-tunnus toiminimi сохраняется на случай возобновления, общая ставка НДС 25,5 %, срок декларации по предпринимательской деятельности за 2026 год — 1.4.2027, первичные документы хранятся 6 лет, учётные регистры и tilinpäätös (если он составлялся) — 10 лет. Источники: Патентно-регистрационное ведомство (PRH), Налоговая служба Финляндии, закон об НДС (1501/1993), закон о налогообложении предпринимательского дохода (360/1968), закон о подоходном налоге (1535/1992), закон о бухгалтерском учёте (1336/1997) и закон о пенсиях предпринимателей (1272/2006).' },
        { t: 'h2', x: 'Поможем закрыть toiminimi' },
        { t: 'p', x: 'Tilitoimisto Debit Credit ведёт бухгалтерию последнего года toiminimi и при необходимости составляет tilinpäätös, рассчитывает НДС на остатки и имущество, которое вы оставляете себе, подаёт последнюю декларацию по НДС и форму 5, а также проверяет авансовый налог и использование прошлых убытков. Мы работаем на финском и русском языках. Свяжитесь с нами ещё до даты прекращения, и мы успеем спланировать передачу имущества и уведомления в правильном порядке.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'PRH: прекращение деятельности toiminimi (на английском)', href: SRC.prhEn },
          { label: 'PRH: бумажные формы (Y6) для уведомления о прекращении (на финском)', href: SRC.prhPaper },
          { label: 'Verohallinto: прекращение деятельности (на английском)', href: SRC.closingEn },
          { label: 'Verohallinto: прекращение деятельности, облагаемой НДС (на английском)', href: SRC.vatEndEn },
          { label: 'Verohallinto: прекращение деятельности, облагаемой НДС, и банкротство — подробное руководство (на финском)', href: SRC.vatGuidance },
          { label: 'Verohallinto: имущество и долги бизнеса при прекращении деятельности (на финском)', href: SRC.assets },
          { label: 'Verohallinto: убытки при прекращении деятельности (на финском)', href: SRC.losses },
          { label: 'Verohallinto: декларация по форме 5 — инструкция (на английском)', href: SRC.form5En },
          { label: 'Verohallinto: приостановка деятельности (на финском)', href: SRC.pause },
          { label: 'Verohallinto: реестр работодателей (на английском)', href: SRC.employerEn },
          { label: 'Finlex: закон об НДС (1501/1993, на финском)', href: SRC.avl },
          { label: 'Finlex: закон о налогообложении предпринимательского дохода (360/1968, на финском)', href: SRC.evl },
          { label: 'Finlex: закон о подоходном налоге (1535/1992, на финском)', href: SRC.tvl },
          { label: 'Finlex: закон о бухгалтерском учёте (1336/1997, на финском)', href: SRC.kpl },
          { label: 'Finlex: закон о пенсиях предпринимателей YEL (1272/2006, на финском)', href: SRC.yel },
        ] },
      ],
      faq: [
        { q: 'Сколько стоит закрыть toiminimi?', a: 'Уведомление о прекращении в торговый реестр, по данным PRH, бесплатное — и в YTJ, и на форме Y6. Расходы всё же могут возникнуть из-за налогов последнего года, например НДС на остатки товаров и налога при переводе имущества в личное хозяйство.' },
        { q: 'Если я позже снова открою бизнес, Y-tunnus будет тот же?', a: 'Да. По данным PRH, предприниматель, который снова открывает toiminimi, использует ранее выданный ему Y-tunnus. Защита названия toiminimi при этом заканчивается после регистрации прекращения.' },
        { q: 'Нужно ли продавать машину или инструменты перед закрытием?', a: 'Нет. Их можно забрать себе, но тогда для подоходного налога ценой передачи считается первоначальная стоимость приобретения или более низкая вероятная цена продажи. Если НДС по вещи был вычтен, с неё дополнительно платится НДС на собственное пользование в последней декларации по НДС.' },
        { q: 'Можно ли использовать прошлые убытки toiminimi после закрытия?', a: 'Подтверждённые убытки предпринимательской деятельности, которые из-за прекращения иначе остались бы неиспользованными, можно вычесть из доходов от капитала в год прекращения и в последующие годы — в пределах 10 налоговых лет после года убытка, но не из зарплаты. Если позже вы начнёте новый бизнес, оставшиеся убытки можно вычесть из его доходов.' },
        { q: 'Какие обязанности остаются, если toiminimi «спит»?', a: 'Запись в торговом реестре остаётся, и декларацию по форме 5 нужно подавать каждый год, даже без деятельности. Если вы остаётесь в реестре НДС, декларации подаются за каждый налоговый период. Страховку YEL нужно прекратить, когда предпринимательская деятельность фактически закончилась.' },
        { q: 'Отвечаю ли я по долгам toiminimi после закрытия?', a: 'Да. Предприниматель с toiminimi лично отвечает по долгам предпринимательской деятельности и за их оплату и после её прекращения.' },
      ],
    },
    en: {
      title: 'Closing a toiminimi in Finland 2026: notifications, VAT, tax and YEL step by step',
      description:
        'Closing a toiminimi in Finland: the free termination notice, final VAT return, tax on assets you keep, tax return form 5, ending YEL insurance, and a checklist.',
      lead: 'Many sole traders close their toiminimi at the turn of the year: some are leaving Finland, some are moving to employment, some carry on as an osakeyhtiö. The termination notice itself is free and quick, but after it come the final VAT return, tax on assets left in the business, the final tax return, the YEL insurance and archiving the books. Here are the steps, deadlines, a worked example in euros and the most common mistakes.',
      body: [
        { t: 'h2', x: 'The termination notice: free, and the Business ID stays' },
        { t: 'p', x: 'A toiminimi is closed with a notification of termination (lopettamisilmoitus) in the YTJ online service or on paper form Y6. According to the Finnish Patent and Registration Office (PRH), you file it without delay and it is free of charge. The same notice goes to both the Trade Register and the Tax Administration, and with it you can also leave the VAT register, the prepayment register (ennakkoperintärekisteri) and the employer register.' },
        { t: 'ul', items: [
          'A notice filed online can be registered automatically and is faster than a paper form.',
          'The notice is signed by the trader or by a person the trader has authorised.',
          'If there are enterprise mortgages (yrityskiinnitys), they must first be redeemed or transferred. You can check them in PRH’s Virre service.',
          'Once the termination is registered, the protection of the registered business name ends.',
          'The Business ID (Y-tunnus) is not lost: if you start again later as a sole trader, you use the same Y-tunnus.',
          'If your toiminimi is not in the Trade Register, you can also tell the Tax Administration in MyTax (OmaVero).',
        ] },
        { t: 'p', x: 'Without the notice the business is treated as continuing, and VAT returns and other self-assessed tax returns must still be filed. The Tax Administration also points out that unemployment benefits and other benefits may require that the business has actually ended and that this has been reported.' },
        { t: 'h2', x: 'VAT: the final return and remaining stock' },
        { t: 'p', x: 'Report the end of VAT-liable activity as soon as you know it. A VAT return is still filed for the tax period in which the registration ends, even if there was no activity. That is why it is usually best to give the last day of a month as the end date: if you give 1 June, you must file a return for June as well. Alternatively, you can stay registered until the business assets have been sold.' },
        { t: 'ul', items: [
          'Monthly or quarterly period: file and pay by the 12th day of the second month after the last tax period.',
          'Calendar-year period and the business ends mid-year: by the 12th day of the second month after the month of termination.',
          'Calendar-year period and you stay registered until 31 December: by the last day of February of the following year.',
          'If you registered for VAT voluntarily, you are removed no earlier than the day the notice reaches the Tax Administration — not retroactively.',
          'After removal from the register you may no longer add VAT to invoices or deduct VAT on purchases.',
        ] },
        { t: 'h3', x: 'Assets you keep' },
        { t: 'p', x: 'When VAT liability ends, VAT is paid on the goods and services that remain in your possession as if they had been taken into own use (AVL 21 § 3 mom. and 22 § 3 mom.). This covers remaining stock and, for example, tools and machinery whose VAT was deducted or that were produced in the taxable business. No VAT is due on your own personal property, nor on items whose VAT you could not deduct, such as an ordinary passenger car.' },
        { t: 'p', x: 'The tax base is the purchase price or a lower probable selling price, without VAT (AVL 74 §), at the general 25.5% rate or the rate that applies to the item. It is reported under tax on sales in the VAT return for the month of termination. Once this own-use VAT has been paid, no VAT is charged when those items are sold later.' },
        { t: 'p', x: 'If the business made new-build or renovation investments in real estate, the VAT deducted on them may need to be reviewed on closing.' },
        { t: 'h2', x: 'Income tax: the final return and private withdrawals' },
        { t: 'p', x: 'The business income tax return (form 5) is still filed for the year in which the business ended, and it also reports the termination. The return for 2026 is due by 1 April 2027; check your own date in MyTax. For tax purposes the calendar year is what counts, not when the financial period actually ended.' },
        { t: 'p', x: 'According to the Tax Administration, the business has ended only when no assets and no debts remain in it. Assets are either sold or moved to your private economy, and both affect the result of the final year:' },
        { t: 'ul', items: [
          'Sale to an outside buyer: the agreed price is taxable income, and the undepreciated acquisition cost is a deductible expense.',
          'Taking assets into private use (EVL 51 b §): the transfer price is the original acquisition cost or a lower probable selling price. A rise in value is therefore not taxed, but excess depreciation from earlier years is added back to income.',
          'An operating reserve (toimintavaraus) is released and counted as income for the year of termination.',
          'If transferring assets produces a large one-off income, you can ask for income spreading (tulontasaus, TVL 128 §). The one-off income, taxed as the earned-income (ansiotulo) share of the business result, must be at least €2,500 and at least a quarter of your net earned income for the year, and it must have accumulated over two or more years. It is spread over at most 5 years, it must be claimed before that year’s taxation ends, and it only reduces state income tax.',
        ] },
        { t: 'h3', x: 'Prepaid tax and earlier losses' },
        { t: 'p', x: 'Your duty to pay prepaid tax (ennakkovero) does not end on the closing date. Check it in MyTax and request a change if the final year’s result differs from the estimate, so that you pay neither too much nor too little.' },
        { t: 'p', x: 'Confirmed business losses do not disappear: losses that would otherwise remain undeducted because the business ended can be deducted from capital income (TVL 121 §), after other deductions, in the year of termination and in later years, within the 10 tax years following the loss year. They cannot be deducted from wages, and closing does not extend the 10-year period. If you later start a new business, the remaining losses can be deducted from its income.' },
        { t: 'h2', x: 'Worked example in euros' },
        { t: 'p', x: 'A VAT-registered renovation contractor closes the toiminimi on 31 December 2026, with a monthly VAT period, and keeps the tools and the remaining materials. VAT on both was deducted when they were bought.' },
        { t: 'ul', items: [
          'Materials: purchase price €3,000.00 (excl. VAT), probable selling price now €1,200.00. The tax base is the lower €1,200.00, and own-use VAT is €306.00 (25.5%).',
          'Tools: purchase price €4,000.00 (excl. VAT), probable selling price €1,000.00. Own-use VAT €255.00.',
          '€561.00 is added to tax on sales in the VAT return for December 2026, due on 12 February 2027.',
          'Income tax: if the undepreciated acquisition cost of the tools is €600.00 and the probable selling price is €1,000.00, the difference of €400.00 is business income for 2026. If the undepreciated cost were €1,500.00, the difference of €500.00 would be a deductible expense.',
        ] },
        { t: 'h2', x: 'YEL insurance' },
        { t: 'p', x: 'You must tell your pension insurance company without delay that your self-employment has ended (YEL 149 §). The insurance ends when the notice or other information shows that the business has stopped, and the pension company can end it retroactively from the date when the conditions for insurance were no longer met. So notify the pension company separately rather than relying on the information travelling through YTJ.' },
        { t: 'h2', x: 'Employees, the employer register and the prepayment register' },
        { t: 'ul', items: [
          'Employer registration ends on the last payday. Report and pay employer contributions up to the end date of the registration.',
          'The final wages are reported to the Incomes Register (tulorekisteri) on an earnings payment report, like any other wages.',
          'If you still pay occasional wages later, you report them and pay the employer contributions as well.',
          'You leave the prepayment register with the same termination notice. You can register again if you restart later.',
        ] },
        { t: 'h2', x: 'Bookkeeping and archiving' },
        { t: 'p', x: 'The books for the final financial period are closed, showing how the stock, fixed assets and bank account were moved to your private economy, and the result is reported on form 5. Financial statements (tilinpäätös) are required only if at least two of the micro-undertaking limits in KPL 1:4 b § were exceeded in both the final and the preceding financial period (KPL 1:1 a § 3 mom.), or if you prepare them anyway. The Accounting Act allows a shorter period when a business ends, but a toiminimi’s financial period is as a rule the calendar year; a trader keeping double-entry books may depart from that. For tax purposes the calendar year applies in any case.' },
        { t: 'p', x: 'The duty to keep records continues after closing: the books and any financial statements prepared for at least 10 years from the end of the financial period, and vouchers for at least 6 years from the end of the year in which the period ended (KPL 2:10 §). When the business ends, you must also tell the registration authority (PRH) who has been entrusted with keeping the records (KPL 2:10 § 3 mom.). The records must remain available for inspection from Finland even if you move abroad.' },
        { t: 'h2', x: 'The debts stay with you' },
        { t: 'p', x: 'In the Tax Administration’s words, a sole trader is personally liable for the business debts and for paying them after the business has ended. Closing does not cancel debts, tax arrears or invoices still to come.' },
        { t: 'h2', x: 'Close it or let it rest?' },
        { t: 'p', x: 'If you are not sure you will not return to self-employment, you can suspend the business instead. You then give an end date for the Tax Administration’s registers in MyTax or with a YTJ change notice, but the Trade Register entry stays in force. The obligations do not disappear entirely:' },
        { t: 'ul', items: [
          'Tax return form 5 must be filed every year, even when there has been no activity.',
          'As long as you are in the VAT register, a VAT return is filed for every tax period, even with no sales.',
          'The YEL insurance must still be ended once the self-employment has actually stopped.',
          'The business name stays protected in the Trade Register.',
        ] },
        { t: 'p', x: 'If the business continues as an osakeyhtiö, this is not an ordinary closure but a change of business form (EVL 51 c § and TVL 24 §). We cover it in our guides “Sole trader or limited company? Choosing the right business form in Finland” and “How to set up a limited company (Oy) in Finland, step by step”.' },
        { t: 'h3', x: 'If you are moving abroad' },
        { t: 'p', x: 'File the termination notice, the final VAT return and the notice to your pension company before you move, and agree who will file the final tax return. If an accounting firm files it, make sure its Suomi.fi authorisation is in place: according to the Tax Administration, no one can act in MyTax for a business removed from the Trade Register without one.' },
        { t: 'h2', x: 'Checklist' },
        { t: 'ol', items: [
          'Choose the closing date; at year end, 31 December is often the clearest.',
          'Sell or take over the stock and fixed assets, and document the probable selling price (an offer or a valuation, for example).',
          'Check and arrange any enterprise mortgages.',
          'File the termination notice in YTJ or on form Y6, leaving the VAT, prepayment and employer registers at the same time.',
          'Tell your pension company that your self-employment has ended.',
          'Pay the final wages and report them to the Incomes Register.',
          'Calculate VAT on remaining stock and other assets you keep, and file the final VAT return on time.',
          'Check your prepaid tax in MyTax.',
          'Close the books for the final year (financial statements only if required or prepared anyway) and file form 5, reporting the termination.',
          'Terminate business contracts (premises, subscriptions, insurance, bank account) once the last payments have gone through.',
          'Archive the records: vouchers for 6 years, the books and any financial statements for 10 years; tell PRH who keeps them.',
        ] },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'No termination notice is filed, and the Tax Administration keeps expecting VAT and income tax returns.',
          'The first day of the next month is given as the end date, which creates an extra VAT return.',
          'VAT on remaining stock and on machinery kept for own use is forgotten.',
          'The car or tools are taken over without booking a private withdrawal, so the final year’s result is wrong.',
          'The YEL insurance stays in force because the pension company was never told.',
          'The final tax return is not filed because the business has already left the register.',
          'The bookkeeping records are destroyed on closing.',
        ] },
        { t: 'note', x: 'Information checked in November 2026: the termination notice is free (form Y6 on paper), a toiminimi’s Y-tunnus is kept in case you restart, the general VAT rate is 25.5%, the 2026 business income tax return is due on 1 April 2027, and vouchers are kept for 6 years and the books and any financial statements for 10 years. Sources: Finnish Patent and Registration Office, Finnish Tax Administration, Value Added Tax Act (1501/1993), Business Income Tax Act (360/1968), Income Tax Act (1535/1992), Accounting Act (1336/1997) and Self-Employed Persons’ Pensions Act (1272/2006).' },
        { t: 'h2', x: 'We help you close your toiminimi' },
        { t: 'p', x: 'Tilitoimisto Debit Credit keeps the books for your toiminimi’s final year and, where needed, prepares the financial statements, calculates VAT on remaining stock and assets you keep, files the final VAT return and form 5, and checks your prepaid tax and the use of earlier losses. We work in Finnish and Russian. Get in touch before your closing date, and we will have time to plan the asset transfers and notifications in the right order.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'PRH: notification of termination of business for a private trader', href: SRC.prhEn },
          { label: 'PRH: paper forms (Y6) for the termination notice (in Finnish)', href: SRC.prhPaper },
          { label: 'Tax Administration: termination of business', href: SRC.closingEn },
          { label: 'Tax Administration: termination of VAT-liable activities', href: SRC.vatEndEn },
          { label: 'Tax Administration: termination of VAT-liable business and bankruptcy, detailed guidance (in Finnish)', href: SRC.vatGuidance },
          { label: 'Tax Administration: business assets and debts on termination (in Finnish)', href: SRC.assets },
          { label: 'Tax Administration: business losses on termination (in Finnish)', href: SRC.losses },
          { label: 'Tax Administration: instructions for filing tax return form 5', href: SRC.form5En },
          { label: 'Tax Administration: suspending business operations (in Finnish)', href: SRC.pause },
          { label: 'Tax Administration: employer register', href: SRC.employerEn },
          { label: 'Finlex: Value Added Tax Act (1501/1993, in Finnish)', href: SRC.avl },
          { label: 'Finlex: Business Income Tax Act (360/1968, in Finnish)', href: SRC.evl },
          { label: 'Finlex: Income Tax Act (1535/1992, in Finnish)', href: SRC.tvl },
          { label: 'Finlex: Accounting Act (1336/1997, in Finnish)', href: SRC.kpl },
          { label: 'Finlex: Self-Employed Persons’ Pensions Act (1272/2006, in Finnish)', href: SRC.yel },
        ] },
      ],
      faq: [
        { q: 'Does closing a toiminimi cost anything?', a: 'According to PRH, the termination notice to the Trade Register is free, whether you file it in YTJ or on form Y6. Costs can still arise from the final year’s taxes, for example own-use VAT on remaining stock and the tax effect of moving assets to your private economy.' },
        { q: 'Do I get the same Business ID if I start again later?', a: 'Yes. According to PRH, a sole trader who starts again uses the Y-tunnus issued earlier. The protection of the business name, however, ends once the termination is registered.' },
        { q: 'Do I have to sell the business car or tools before closing?', a: 'No. You can keep them, but for income tax the transfer price is then the original acquisition cost or a lower probable selling price. If VAT on the item was deducted, own-use VAT is also paid on it in the final VAT return.' },
        { q: 'Can I use my toiminimi’s earlier losses after closing?', a: 'Confirmed business losses that would otherwise remain unused because the business ended can be deducted from capital income in the year of termination and in later years, within the 10 tax years following the loss year, but not from wages. If you later start a new business, the remaining losses can be deducted from its income.' },
        { q: 'What obligations remain if the toiminimi is left dormant?', a: 'The Trade Register entry stays, and tax return form 5 must be filed every year, even with no activity. If you stay in the VAT register, a VAT return is filed for every tax period. The YEL insurance must be ended once the self-employment has actually stopped.' },
        { q: 'Am I still liable for the toiminimi’s debts after closing?', a: 'Yes. A sole trader is personally liable for the business debts and for paying them even after the business has ended.' },
      ],
    },
    et: {
      title: 'Toiminimi (FIE) sulgemine Soomes 2026: teated, käibemaks, maksud ja YEL',
      description:
        'Toiminimi (FIE) sulgemine Soomes: tasuta lõpetamisteade, viimane käibedeklaratsioon, endale jäetava vara maks, tuludeklaratsioon 5, YEL ja kontrollnimekiri.',
      lead: 'Paljud toiminimi-ettevõtjad lõpetavad tegevuse aastavahetusel: üks kolib Soomest ära, teine läheb palgatööle, kolmas jätkab osaühinguna (osakeyhtiö). Lõpetamisteade ise on tasuta ja kiire, kuid pärast seda tuleb veel esitada viimane käibedeklaratsioon, maksustada ettevõttesse jäänud vara, esitada viimane tuludeklaratsioon, lõpetada YEL-kindlustus ja arhiveerida raamatupidamine. Kogusime kokku sammud, tähtajad, näite eurodes ja levinumad vead.',
      body: [
        { t: 'h2', x: 'Lõpetamisteade: tasuta ja Y-tunnus jääb alles' },
        { t: 'p', x: 'Toiminimi suletakse lõpetamisteatega (lopettamisilmoitus) YTJ e-teeninduses või paberil vormiga Y6. Soome Patendi- ja Registriameti (PRH) järgi tuleb teade esitada viivitamata ning see on tasuta. Sama teade jõuab nii kaubandusregistrisse kui ka Maksuametisse (Verohallinto) ning sellega saab lahkuda ka käibemaksukohustuslaste registrist, ettemaksuregistrist (ennakkoperintärekisteri) ja tööandjate registrist.' },
        { t: 'ul', items: [
          'Internetis esitatud teate saab registreerida automaatselt ja see on kiirem kui paberivorm.',
          'Teatele kirjutab alla ettevõtja ise või tema volitatud isik.',
          'Kui ettevõttele on seatud ettevõtte pant (yrityskiinnitys), tuleb see enne kustutada või üle anda. Pandid näed PRH teenusest Virre.',
          'Kui lõpetamine on registreeritud, lõpeb ärinime registrikaitse.',
          'Y-tunnus ei kao: kui alustad hiljem uuesti toiminimi-ettevõtjana, kasutad sama Y-tunnust.',
          'Kui sinu toiminimi ei ole kaubandusregistris, saad lõpetamisest teatada Maksuametile ka OmaVero kaudu.',
        ] },
        { t: 'p', x: 'Ilma lõpetamisteateta loetakse tegevus jätkuvaks ning käibedeklaratsioonid ja muud ise deklareeritavate maksude deklaratsioonid tuleb endiselt esitada. Maksuameti sõnul võib töötuskindlustushüvitise ja muude toetuste tingimuseks olla, et tegevus on tõesti lõpetatud ja sellest on teatatud.' },
        { t: 'h2', x: 'Käibemaks: viimane deklaratsioon ja laojääk' },
        { t: 'p', x: 'Teata käibemaksustatava tegevuse lõppemisest kohe, kui see on teada. Käibedeklaratsioon esitatakse ka selle maksustamisperioodi kohta, mille jooksul registreering lõpeb, isegi kui tegevust enam ei olnud. Seetõttu on lõppkuupäevaks tavaliselt mõistlik märkida kuu viimane päev: kui märgid 1.6., pead esitama deklaratsiooni ka juuni kohta. Teise võimalusena võid jääda registrisse seni, kuni äri vara on müüdud.' },
        { t: 'ul', items: [
          'Kuu- või kvartaliperiood: deklareeri ja maksa hiljemalt viimasele maksustamisperioodile järgneva teise kuu 12. kuupäeval.',
          'Kalendriaasta periood ja tegevus lõpeb aasta keskel: hiljemalt lõpetamiskuule järgneva teise kuu 12. kuupäeval.',
          'Kalendriaasta periood ja registreering kehtib 31.12-ni: hiljemalt järgmise aasta veebruari viimasel päeval.',
          'Kes on käibemaksukohustuslaseks registreerunud vabatahtlikult, see kustutatakse registrist kõige varem päevast, mil teade jõuab Maksuametisse, st mitte tagasiulatuvalt.',
          'Pärast registrist kustutamist ei tohi arvetele enam käibemaksu lisada ega ostude käibemaksu maha arvata.',
        ] },
        { t: 'h3', x: 'Vara, mille jätad endale' },
        { t: 'p', x: 'Kui käibemaksukohustus lõpeb, makstakse ettevõtja valdusse jäänud kaupadelt ja teenustelt käibemaksu nii, nagu oleks need võetud omatarbeks (AVL 21 § 3 mom. ja 22 § 3 mom.). See puudutab laojääki ning näiteks tööriistu ja masinaid, mille sisendkäibemaks on maha arvatud või mis on valmistatud maksustatavas tegevuses. Isiklikult varalt maksu ei maksta, samuti mitte asjadelt, mille käibemaksu ei tohtinud maha arvata, näiteks tavaliselt sõiduautolt.' },
        { t: 'p', x: 'Maksustatav väärtus on ostuhind või sellest madalam tõenäoline müügihind ilma käibemaksuta (AVL 74 §), maksumäär on üldine 25,5% või sellele kaubale kehtiv määr. Maks deklareeritakse müügi maksude all lõpetamiskuu käibedeklaratsioonis. Kui see omatarbe käibemaks on makstud, ei maksustata nende asjade hilisemat müüki enam käibemaksuga.' },
        { t: 'p', x: 'Kui ettevõte on teinud kinnisvarasse uusehitus- või renoveerimisinvesteeringuid, võib nendelt maha arvatud käibemaksu tulla sulgemisel üle vaadata.' },
        { t: 'h2', x: 'Tulumaks: viimane deklaratsioon ja vara võtmine isiklikuks kasutuseks' },
        { t: 'p', x: 'Ettevõtlustulu deklaratsioon (vorm 5) esitatakse ka selle aasta kohta, mil tegevus lõppes, ja selles märgitakse ka tegevuse lõppemine. 2026. aasta deklaratsioon tuleb esitada hiljemalt 1.4.2027; kontrolli oma tähtpäeva OmaVerost. Maksustamisel loeb kalendriaasta, mitte see, millal majandusaasta tegelikult lõppes.' },
        { t: 'p', x: 'Maksuameti järgi on tegevus lõppenud alles siis, kui ettevõtlusesse ei jää ühtki vara ega võlga. Vara kas müüakse või viiakse isiklikku majapidamisse ning mõlemad mõjutavad viimase aasta tulemust:' },
        { t: 'ul', items: [
          'Müük kõrvalisele isikule: kokkulepitud hind on maksustatav tulu ning maksuarvestuses amortiseerimata soetusmaksumus on mahaarvatav kulu.',
          'Vara võtmine isiklikuks kasutuseks (EVL 51 b §): üleandmishinnaks loetakse algne soetusmaksumus või sellest madalam tõenäoline müügihind. Väärtuse kasvu seega ei maksustata, kuid varasemate aastate liigne amortisatsioon lisandub tuluks.',
          'Tegevusreserv (toimintavaraus) tühistatakse ja arvatakse lõpetamisaasta tuluks.',
          'Kui vara üleandmisest tekib suur ühekordne tulu, võid nõuda tulu ühtlustamist (tulontasaus, TVL 128 §). Tingimus on, et ettevõtlustulemuse teenitud tulu (ansiotulo) osana maksustatav ühekordne tulu on vähemalt 2 500 eurot ja vähemalt veerand aasta puhtast teenitud tulust ning et see on kogunenud kahe või enama aasta jooksul. Tulu ühtlustatakse kõige rohkem 5 aastale, seda tuleb nõuda enne selle aasta maksustamise lõppemist ning see vähendab ainult riigi tulumaksu.',
        ] },
        { t: 'h3', x: 'Ettemaks ja varasemad kahjumid' },
        { t: 'p', x: 'Ettemaksu (ennakkovero) tasumise kohustus ei lõpe lõpetamise päeval. Kontrolli ettemaksu OmaVeros ja taotle muudatust, kui viimase aasta tulemus erineb prognoosist, et mitte maksta liiga palju ega liiga vähe.' },
        { t: 'p', x: 'Kinnitatud ettevõtluskahjumid ei kao: need kahjumid, mis tegevuse lõppemise tõttu jääksid muidu maha arvamata, saab maha arvata kapitalitulust (TVL 121 §) pärast muid mahaarvamisi nii lõpetamisaastal kui ka hilisematel aastatel, kahjumiaastale järgneva 10 maksustamisaasta jooksul. Palgatulust neid maha ei arvata ja lõpetamine 10-aastast perioodi ei pikenda. Kui alustad hiljem uut ettevõtlust, saab allesjäänud kahjumid maha arvata selle tulust.' },
        { t: 'h2', x: 'Näide eurodes' },
        { t: 'p', x: 'Käibemaksukohustuslasena registreeritud remondiettevõtja sulgeb toiminimi 31.12.2026, maksustamisperiood on kuu, ja jätab tööriistad ning järelejäänud materjalid endale. Mõlema käibemaks arvati ostmisel maha.' },
        { t: 'ul', items: [
          'Materjalid: ostuhind 3 000,00 eurot (km-ta), tõenäoline müügihind praegu 1 200,00 eurot. Maksustatav väärtus on väiksem summa 1 200,00 eurot ja omatarbe käibemaks 306,00 eurot (25,5%).',
          'Tööriistad: ostuhind 4 000,00 eurot (km-ta), tõenäoline müügihind 1 000,00 eurot. Omatarbe käibemaks 255,00 eurot.',
          '2026. aasta detsembri käibedeklaratsioonis lisatakse müügi maksudele 561,00 eurot. Tähtaeg on 12.2.2027.',
          'Tulumaks: kui tööriistade maksuarvestuses amortiseerimata soetusmaksumus on 600,00 eurot ja tõenäoline müügihind 1 000,00 eurot, on vahe 400,00 eurot 2026. aasta ettevõtlustulu. Kui amortiseerimata soetusmaksumus oleks 1 500,00 eurot, oleks vahe 500,00 eurot mahaarvatav kulu.',
        ] },
        { t: 'h2', x: 'YEL-kindlustus' },
        { t: 'p', x: 'Ettevõtja peab viivitamata teatama pensionikindlustusseltsile ettevõtlustegevuse lõppemisest (YEL 149 §). Kindlustus lõpeb, kui teatest või muust teabest selgub, et tegevus on lõpetatud, ning pensionikindlustusselts võib selle lõpetada tagasiulatuvalt päevast, mil kindlustamise tingimused enam ei olnud täidetud. Teata seega pensionikindlustusseltsile eraldi ja ära looda, et info liigub YTJ kaudu.' },
        { t: 'h2', x: 'Töötajad, tööandjate register ja ettemaksuregister' },
        { t: 'ul', items: [
          'Tööandjana registreerimine lõpeb viimasel palgamaksepäeval. Deklareeri ja maksa tööandja maksed registreeringu lõppkuupäevani.',
          'Viimased palgad deklareeritakse tuluregistrisse (tulorekisteri) palgateatisega nagu tavaliselt.',
          'Kui maksad hiljem veel juhuslikult palka, deklareeritakse ka see ja makstakse tööandja maksed.',
          'Ettemaksuregistrist lahkutakse sama lõpetamisteatega. Kui tegevus hiljem uuesti algab, saab registrisse uuesti kanda.',
        ] },
        { t: 'h2', x: 'Raamatupidamine ja arhiveerimine' },
        { t: 'p', x: 'Viimase majandusaasta raamatupidamine suletakse ning selles kajastub laojäägi, põhivara ja pangakonto üleviimine isiklikku majapidamisse; tulemus deklareeritakse vormil 5. Aastaaruanne (tilinpäätös) on kohustuslik ainult siis, kui nii viimasel kui ka sellele eelnenud majandusaastal on ületatud vähemalt kaks KPL 1:4 b § mikroettevõtja piirmäära (KPL 1:1 a § 3 mom.), või kui see koostatakse muul põhjusel. Raamatupidamisseadus (KPL) lubab tegevuse lõpetamisel tavalisest lühemat majandusaastat, kuid toiminimi majandusaasta on üldjuhul kalendriaasta; kahekordset raamatupidamist pidav ettevõtja võib sellest kõrvale kalduda. Maksustamisel loeb igal juhul kalendriaasta.' },
        { t: 'p', x: 'Säilitamiskohustus jätkub ka pärast sulgemist: raamatupidamisregistrid ja aastaaruanne, kui see on koostatud, vähemalt 10 aastat majandusaasta lõpust ning algdokumendid (tositteet) vähemalt 6 aastat selle aasta lõpust, mil majandusaasta lõppes (KPL 2:10 §). Tegevuse lõppemisel tuleb registriasutusele (PRH) ka teatada, kellele materjali säilitamine on usaldatud (KPL 2:10 § 3 mom.). Materjal peab olema Soomest kontrollitav ka siis, kui oled välismaale kolinud.' },
        { t: 'h2', x: 'Võlad jäävad ettevõtjale' },
        { t: 'p', x: 'Maksuameti sõnastuses vastutab ettevõtja isiklikult ettevõtluse võlgade ja nende tasumise eest ka pärast tegevuse lõppemist. Sulgemine ei kustuta võlgu, maksuvõlgu ega veel saabuvaid arveid.' },
        { t: 'h2', x: 'Sulgeda või jätta „magama“?' },
        { t: 'p', x: 'Kui sa ei ole kindel, et ettevõtlusesse ei naase, võib tegevuse ka peatada. Siis märgid OmaVeros või YTJ muudatusteatega Maksuameti registrite lõppkuupäeva, kuid kanne kaubandusregistris jääb kehtima. Kohustused ei kao siiski täielikult:' },
        { t: 'ul', items: [
          'Ettevõtlustulu deklaratsioon (vorm 5) tuleb esitada igal aastal, ka siis, kui tegevust ei olnud.',
          'Seni, kuni oled käibemaksukohustuslaste registris, esitatakse käibedeklaratsioon igal maksustamisperioodil, ka müügita.',
          'YEL-kindlustus tuleb siiski lõpetada, kui ettevõtlustegevus tegelikult lõpeb.',
          'Ärinimi jääb kaubandusregistris kaitstuks.',
        ] },
        { t: 'p', x: 'Kui tegevus jätkub osaühinguna, ei ole tegu tavalise sulgemisega, vaid ettevõtlusvormi muutmisega (EVL 51 c § ja TVL 24 §). Sellest räägime oma juhendites „FIE (toiminimi) või osaühing (Oy)? Kuidas valida õige ettevõtlusvorm Soomes“ ja „Osaühingu (Oy) asutamine Soomes samm-sammult“.' },
        { t: 'h3', x: 'Kui kolid välismaale' },
        { t: 'p', x: 'Esita lõpetamisteade, viimane käibedeklaratsioon ja teade pensionikindlustusseltsile enne kolimist ning lepi kokku, kes esitab viimase tuludeklaratsiooni. Kui seda teeb raamatupidamisbüroo, kontrolli Suomi.fi volitust: Maksuameti järgi ei saa ilma selleta kaubandusregistrist kustutatud ettevõtte nimel OmaVeros toiminguid teha.' },
        { t: 'h2', x: 'Kontrollnimekiri' },
        { t: 'ol', items: [
          'Vali lõpetamise kuupäev; aastavahetusel on 31.12. sageli kõige selgem.',
          'Müü või võta endale laojääk ja põhivara ning dokumenteeri tõenäoline müügihind (nt pakkumine või hinnang).',
          'Kontrolli ja korralda võimalikud ettevõtte pandid.',
          'Esita lõpetamisteade YTJ-s või vormil Y6 ning lahku samal ajal käibemaksu-, ettemaksu- ja tööandjate registrist.',
          'Teata pensionikindlustusseltsile ettevõtlustegevuse lõppemisest.',
          'Maksa viimased palgad ja deklareeri need tuluregistrisse.',
          'Arvuta laojäägi ja muu endale jäetava vara käibemaks ning esita viimane käibedeklaratsioon õigel ajal.',
          'Kontrolli ettemaksu OmaVeros.',
          'Lõpeta viimase aasta raamatupidamine (aastaaruanne ainult siis, kui see on kohustuslik või koostatakse muul põhjusel) ja esita vorm 5, märkides tegevuse lõppemise.',
          'Lõpeta ettevõtte lepingud (äriruum, sideteenused, kindlustused, pangakonto), kui viimased maksed on tehtud.',
          'Arhiveeri: algdokumendid 6 aastat, raamatupidamisregistrid ja aastaaruanne (kui see on koostatud) 10 aastat; teata PRH-le, kes materjali säilitab.',
        ] },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Lõpetamisteade jääb esitamata ja Maksuamet ootab endiselt käibe- ja tuludeklaratsioone.',
          'Lõppkuupäevaks märgitakse järgmise kuu esimene päev ja tekib üleliigne käibedeklaratsioon.',
          'Laojäägi ja endale jäetavate masinate käibemaks ununeb.',
          'Auto või tööriistad võetakse endale ilma eratarbimist kirjendamata ja viimase aasta tulemus on vale.',
          'YEL-kindlustus jääb kehtima, sest pensionikindlustusseltsile ei teatatud.',
          'Viimast tuludeklaratsiooni ei esitata, sest ettevõte on registrist juba kustutatud.',
          'Raamatupidamisdokumendid hävitatakse sulgemisel.',
        ] },
        { t: 'note', x: 'Andmed on kontrollitud 2026. aasta novembris: lõpetamisteade on tasuta (paberil vorm Y6), toiminimi Y-tunnus jääb alles uuesti alustamiseks, üldine käibemaksumäär on 25,5%, 2026. aasta ettevõtlustulu deklaratsiooni tähtaeg on 1.4.2027 ning algdokumente säilitatakse 6 aastat ning raamatupidamisregistreid ja koostatud aastaaruannet 10 aastat. Allikad: Soome Patendi- ja Registriamet, Soome Maksuamet, käibemaksuseadus (1501/1993), ettevõtlustulu maksustamise seadus (360/1968), tulumaksuseadus (1535/1992), raamatupidamisseadus (1336/1997) ja ettevõtja pensioniseadus (1272/2006).' },
        { t: 'h2', x: 'Aitame toiminimi sulgeda' },
        { t: 'p', x: 'Tilitoimisto Debit Credit peab toiminimi viimase aasta raamatupidamist ja koostab vajaduse korral aastaaruande, arvutab laojäägi ja endale jäetava vara käibemaksu, esitab viimase käibedeklaratsiooni ja vormi 5 ning kontrollib ettemaksu ja varasemate kahjumite kasutamist. Teenindame soome ja vene keeles. Võta ühendust juba enne lõpetamise kuupäeva, siis jõuame vara üleandmise ja teated õiges järjekorras läbi mõelda.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'PRH: toiminimi-ettevõtja lõpetamisteade (inglise keeles)', href: SRC.prhEn },
          { label: 'PRH: lõpetamisteate paberivormid (Y6) (soome keeles)', href: SRC.prhPaper },
          { label: 'Verohallinto: tegevuse lõpetamine (inglise keeles)', href: SRC.closingEn },
          { label: 'Verohallinto: käibemaksustatava tegevuse lõppemine (inglise keeles)', href: SRC.vatEndEn },
          { label: 'Verohallinto: käibemaksustatava äritegevuse lõpetamine ja pankrot, põhjalik juhend (soome keeles)', href: SRC.vatGuidance },
          { label: 'Verohallinto: ettevõtluse vara ja võlad tegevuse lõpetamisel (soome keeles)', href: SRC.assets },
          { label: 'Verohallinto: ettevõtluskahjumid tegevuse lõpetamisel (soome keeles)', href: SRC.losses },
          { label: 'Verohallinto: tuludeklaratsiooni vormi 5 juhend (inglise keeles)', href: SRC.form5En },
          { label: 'Verohallinto: tegevuse peatamine (soome keeles)', href: SRC.pause },
          { label: 'Verohallinto: tööandjate register (inglise keeles)', href: SRC.employerEn },
          { label: 'Finlex: käibemaksuseadus (1501/1993, soome keeles)', href: SRC.avl },
          { label: 'Finlex: ettevõtlustulu maksustamise seadus (360/1968, soome keeles)', href: SRC.evl },
          { label: 'Finlex: tulumaksuseadus (1535/1992, soome keeles)', href: SRC.tvl },
          { label: 'Finlex: raamatupidamisseadus (1336/1997, soome keeles)', href: SRC.kpl },
          { label: 'Finlex: ettevõtja pensioniseadus YEL (1272/2006, soome keeles)', href: SRC.yel },
        ] },
      ],
      faq: [
        { q: 'Kas toiminimi sulgemine maksab midagi?', a: 'PRH järgi on lõpetamisteade kaubandusregistrisse tasuta, olgu see esitatud YTJ-s või vormil Y6. Kulusid võib siiski tekkida viimase aasta maksudest, näiteks laojäägi omatarbe käibemaksust ja vara isiklikku majapidamisse viimise maksumõjust.' },
        { q: 'Kas saan sama Y-tunnuse, kui alustan hiljem uuesti?', a: 'Jah. PRH järgi kasutab uuesti alustav toiminimi-ettevõtja talle varem antud Y-tunnust. Ärinime registrikaitse aga lõpeb, kui lõpetamine on registreeritud.' },
        { q: 'Kas ettevõtte auto või tööriistad tuleb enne sulgemist maha müüa?', a: 'Ei pea. Need võib endale jätta, kuid tulumaksu mõttes loetakse siis üleandmishinnaks algne soetusmaksumus või sellest madalam tõenäoline müügihind. Kui asja käibemaks on maha arvatud, makstakse sellelt lisaks omatarbe käibemaks viimases käibedeklaratsioonis.' },
        { q: 'Kas toiminimi varasemaid kahjumeid saab pärast sulgemist kasutada?', a: 'Kinnitatud ettevõtluskahjumid, mis tegevuse lõppemise tõttu jääksid muidu kasutamata, saab maha arvata kapitalitulust lõpetamisaastal ja hilisematel aastatel, kahjumiaastale järgneva 10 maksustamisaasta jooksul, kuid mitte palgatulust. Kui alustad hiljem uut ettevõtlust, saab allesjäänud kahjumid maha arvata selle tulust.' },
        { q: 'Millised kohustused jäävad, kui toiminimi jääb „magama“?', a: 'Kanne kaubandusregistris jääb alles ja vorm 5 tuleb esitada igal aastal, ka tegevuseta. Kui jääd käibemaksukohustuslaste registrisse, esitatakse käibedeklaratsioon igal maksustamisperioodil. YEL-kindlustus tuleb lõpetada, kui ettevõtlustegevus tegelikult lõpeb.' },
        { q: 'Kas vastutan toiminimi võlgade eest ka pärast sulgemist?', a: 'Jah. Toiminimi-ettevõtja vastutab isiklikult ettevõtluse võlgade ja nende tasumise eest ka pärast tegevuse lõppemist.' },
      ],
    },
    uk: {
      title: 'Закриття toiminimi у Фінляндії 2026: повідомлення, ПДВ, податки та YEL',
      description:
        'Як закрити toiminimi (ФОП) у Фінляндії: безкоштовне повідомлення, остання декларація з ПДВ, податки на майно, яке лишаєте собі, форма 5, YEL і чек-лист.',
      lead: 'Багато підприємців із toiminimi закривають справу на зламі року: хтось виїжджає з Фінляндії, хтось переходить на роботу за наймом, хтось продовжує як osakeyhtiö. Саме повідомлення про припинення безкоштовне й подається швидко, але після нього лишаються остання декларація з ПДВ, оподаткування майна, що залишилося в бізнесі, остання податкова декларація, страхування YEL та архів бухгалтерії. Ми зібрали кроки, строки, приклад у євро й типові помилки.',
      body: [
        { t: 'h2', x: 'Повідомлення про припинення: безкоштовно, Y-tunnus зберігається' },
        { t: 'p', x: 'Toiminimi закривають повідомленням про припинення діяльності (lopettamisilmoitus) у сервісі YTJ або на паперовій формі Y6. За даними Патентно-реєстраційного відомства (PRH), повідомлення подають без зволікань, і воно безкоштовне. Те саме повідомлення надходить і до торговельного реєстру, і до Податкової служби (Verohallinto), і ним же можна вийти з реєстру платників ПДВ, реєстру передоплати (ennakkoperintärekisteri) та реєстру роботодавців.' },
        { t: 'ul', items: [
          'Повідомлення, подане онлайн, може бути зареєстроване автоматично, і це швидше за паперову форму.',
          'Повідомлення підписує сам підприємець або уповноважена ним особа.',
          'Якщо на бізнес зареєстровано заставу підприємства (yrityskiinnitys), її спершу потрібно погасити або передати. Перевірити це можна в сервісі PRH Virre.',
          'Після реєстрації припинення захист назви toiminimi закінчується.',
          'Y-tunnus не зникає: якщо пізніше ви знову відкриєте toiminimi, використовуватиметься той самий Y-tunnus.',
          'Якщо ваш toiminimi не внесено до торговельного реєстру, повідомити Податкову про припинення можна й через OmaVero.',
        ] },
        { t: 'p', x: 'Без повідомлення діяльність вважається такою, що триває, і декларації з ПДВ та інших податків, які сплачуються самостійно, доведеться подавати далі. За словами Податкової, для допомоги з безробіття та інших виплат може вимагатися, щоб діяльність справді була припинена і про це було повідомлено.' },
        { t: 'h2', x: 'ПДВ: остання декларація та залишки товарів' },
        { t: 'p', x: 'Повідомте про припинення діяльності, що оподатковується ПДВ, щойно про це дізнаєтеся. Декларацію з ПДВ подають і за той податковий період, у якому закінчується реєстрація, навіть якщо діяльності вже не було. Тому датою закінчення зазвичай краще вказати останній день місяця: якщо вказати 1.6., доведеться подавати декларацію ще й за червень. Можна також залишатися в реєстрі, доки не буде продано майно бізнесу.' },
        { t: 'ul', items: [
          'Період місяць або квартал: декларація й оплата не пізніше 12-го числа другого місяця після останнього податкового періоду.',
          'Період календарний рік, діяльність закінчилася посеред року: не пізніше 12-го числа другого місяця після місяця припинення.',
          'Період календарний рік, реєстрація діє до 31.12.: не пізніше останнього дня лютого наступного року.',
          'Хто став на облік платника ПДВ добровільно, того виключають не раніше дня, коли повідомлення надійшло до Податкової, тобто не заднім числом.',
          'Після виключення з реєстру додавати ПДВ до рахунків і віднімати ПДВ за покупками вже не можна.',
        ] },
        { t: 'h3', x: 'Майно, яке ви залишаєте собі' },
        { t: 'p', x: 'Коли обов’язок сплачувати ПДВ припиняється, з товарів і послуг, що залишилися в підприємця, сплачують ПДВ так, ніби їх узяли у власне користування (AVL 21 § 3 mom. і 22 § 3 mom.). Це стосується залишків на складі, а також, наприклад, інструментів і обладнання, ПДВ за якими було віднято або які виготовлено в оподатковуваній діяльності. З особистого майна податок не сплачують, як і з речей, ПДВ за якими віднімати не можна було, наприклад зі звичайного легкового автомобіля.' },
        { t: 'p', x: 'База оподаткування — ціна купівлі або нижча ймовірна ціна продажу без ПДВ (AVL 74 §); ставка — загальна 25,5 % або ставка, що діє для цього товару. Податок зазначають у продажах у декларації з ПДВ за місяць припинення. Після сплати цього податку подальший продаж цих речей ПДВ уже не обкладається.' },
        { t: 'p', x: 'Якщо бізнес інвестував у нове будівництво чи капітальний ремонт нерухомості, під час закриття може знадобитися перегляд (tarkistus) раніше відрахованого ПДВ.' },
        { t: 'h2', x: 'Податок на доходи: остання декларація та вилучення майна' },
        { t: 'p', x: 'Декларацію з підприємницької діяльності (форма 5) подають і за той рік, у якому діяльність закінчилася, і в ній зазначають факт припинення. Декларацію за 2026 рік потрібно подати не пізніше 1.4.2027; свою дату перевірте в OmaVero. В оподаткуванні вирішує календарний рік, а не те, коли фактично закінчився фінансовий період (tilikausi).' },
        { t: 'p', x: 'За позицією Податкової, діяльність припинено лише тоді, коли в бізнесі не лишилося ні майна, ні боргів. Майно або продають, або переводять в особисте господарство, і обидва варіанти впливають на результат останнього року:' },
        { t: 'ul', items: [
          'Продаж сторонній особі: узгоджена ціна є оподатковуваним доходом, а не списана в податковому обліку вартість придбання віднімається як витрата.',
          'Вилучення в особисте користування (EVL 51 b §): ціною передачі вважається первісна вартість придбання або нижча ймовірна ціна продажу. Зростання вартості не оподатковується, але надмірна амортизація минулих років повертається до доходу.',
          'Резерв діяльності (toimintavaraus) розформовують і включають до доходу року припинення.',
          'Якщо передача майна дає великий разовий дохід, можна вимагати вирівнювання доходу (tulontasaus, TVL 128 §). Умови: разовий дохід, що оподатковується як трудова частка (ansiotulo) результату підприємницької діяльності, становить не менше 2 500 євро і не менше чверті чистого трудового доходу за рік та накопичився за два або більше років. Дохід розподіляють не більше ніж на 5 років, вимагати вирівнювання треба до завершення оподаткування за цей рік, і воно зменшує лише державний податок.',
        ] },
        { t: 'h3', x: 'Авансовий податок і минулі збитки' },
        { t: 'p', x: 'Обов’язок сплачувати авансовий податок (ennakkovero) не закінчується в день припинення. Перевірте його в OmaVero і подайте зміну, якщо результат останнього року відрізняється від прогнозу, щоб не переплатити й не недоплатити.' },
        { t: 'p', x: 'Підтверджені збитки підприємницької діяльності не зникають: ті з них, які через припинення діяльності інакше залишилися б невідрахованими, можна відняти від доходів від капіталу (TVL 121 §) після інших відрахувань — у рік припинення та в наступні роки, протягом 10 податкових років після року збитку. Від зарплати їх не віднімають, і закриття цей строк не подовжує. Якщо пізніше ви почнете новий бізнес, решту збитків можна відняти від його доходів.' },
        { t: 'h2', x: 'Приклад у євро' },
        { t: 'p', x: 'Майстер з ремонту, зареєстрований платником ПДВ, закриває toiminimi 31.12.2026, податковий період — місяць. Інструменти й залишки матеріалів він забирає собі. ПДВ за ними свого часу було віднято.' },
        { t: 'ul', items: [
          'Матеріали: ціна купівлі 3 000,00 € (без ПДВ), ймовірна ціна продажу зараз 1 200,00 €. База оподаткування — менша сума 1 200,00 €, ПДВ на власне користування 306,00 € (25,5 %).',
          'Інструменти: ціна купівлі 4 000,00 € (без ПДВ), ймовірна ціна продажу 1 000,00 €. ПДВ на власне користування 255,00 €.',
          'До декларації з ПДВ за грудень 2026 року до податку з продажів додається 561,00 €. Строк — 12.2.2027.',
          'Податок на доходи: якщо не списана в податковому обліку вартість інструментів 600,00 €, а ймовірна ціна продажу 1 000,00 €, різниця 400,00 € — дохід бізнесу за 2026 рік. Якби не списана вартість становила 1 500,00 €, різниця 500,00 € була б витратою, що віднімається.',
        ] },
        { t: 'h2', x: 'Страхування YEL' },
        { t: 'p', x: 'Підприємець зобов’язаний без зволікань повідомити пенсійну компанію про припинення підприємницької діяльності (YEL 149 §). Страхування припиняється, коли з повідомлення чи інших відомостей видно, що діяльність припинено, і пенсійна компанія може закрити його заднім числом від дня, коли умови страхування перестали виконуватися. Тож повідомте пенсійну компанію окремо й не розраховуйте, що дані дійдуть через YTJ.' },
        { t: 'h2', x: 'Працівники, реєстр роботодавців і реєстр передоплати' },
        { t: 'ul', items: [
          'Реєстрація роботодавця закінчується в останній день виплати зарплати. Декларуйте й сплачуйте внески роботодавця до дати закінчення реєстрації.',
          'Останні зарплати подають до реєстру доходів (tulorekisteri) звичайним повідомленням про зарплату.',
          'Якщо пізніше ви ще разово виплачуєте зарплату, за нею так само подають дані й сплачують внески роботодавця.',
          'З реєстру передоплати виходять тим самим повідомленням про припинення. Якщо діяльність згодом відновиться, можна знову зареєструватися.',
        ] },
        { t: 'h2', x: 'Бухгалтерія та архів' },
        { t: 'p', x: 'Бухгалтерію останнього фінансового періоду закривають, і в ній відображається переведення залишків, основних засобів і банківського рахунку в особисте господарство; результат зазначають у декларації за формою 5. Tilinpäätös обов’язковий, лише якщо і в останньому, і в попередньому фінансовому періоді перевищено щонайменше два з порогів мікропідприємства за KPL 1:4 b § (KPL 1:1 a § 3 mom.), або якщо його складають з власного рішення. Закон про бухгалтерський облік (KPL) дозволяє коротший період у разі припинення діяльності, але в toiminimi фінансовий період, як правило, календарний рік; за подвійної бухгалтерії можливі відступи. Для податків у будь-якому разі вирішує календарний рік.' },
        { t: 'p', x: 'Обов’язок зберігати документи триває й після закриття: облікові регістри й tilinpäätös, якщо його складали, — щонайменше 10 років від кінця фінансового періоду, первинні документи (tositteet) — щонайменше 6 років від кінця року, в якому закінчився період (KPL 2:10 §). У разі припинення діяльності потрібно також повідомити реєструвальний орган (PRH), кому доручено зберігання матеріалів (KPL 2:10 § 3 mom.). Матеріали мають бути доступні для перевірки з Фінляндії й тоді, коли ви виїхали за кордон.' },
        { t: 'h2', x: 'Борги залишаються за підприємцем' },
        { t: 'p', x: 'За формулюванням Податкової, підприємець особисто відповідає за борги підприємницької діяльності та за їх сплату й після її припинення. Закриття не списує ні боргів, ні податкової заборгованості, ні рахунків, що ще надійдуть.' },
        { t: 'h2', x: 'Закрити чи залишити «спати»?' },
        { t: 'p', x: 'Якщо ви не впевнені, що не повернетеся до підприємництва, діяльність можна призупинити. Тоді в OmaVero або повідомленням про зміни в YTJ ви вказуєте дату виходу з реєстрів Податкової, а запис у торговельному реєстрі залишається. Обов’язки при цьому не зникають повністю:' },
        { t: 'ul', items: [
          'Декларацію за формою 5 потрібно подавати щороку, навіть якщо діяльності не було.',
          'Поки ви в реєстрі ПДВ, декларації подають за кожен податковий період, навіть без продажів.',
          'Страхування YEL однаково потрібно припинити, коли підприємницька діяльність фактично закінчилася.',
          'Назва toiminimi залишається захищеною в торговельному реєстрі.',
        ] },
        { t: 'p', x: 'Якщо діяльність триває у формі osakeyhtiö, це не звичайне закриття, а зміна форми підприємства (EVL 51 c § і TVL 24 §). Про це — у наших гідах «Toiminimi чи Oy? Як обрати правильну форму бізнесу у Фінляндії» та «Як відкрити osakeyhtiö (Oy) у Фінляндії крок за кроком».' },
        { t: 'h3', x: 'Якщо ви виїжджаєте з Фінляндії' },
        { t: 'p', x: 'Подайте повідомлення про припинення, останню декларацію з ПДВ і повідомлення пенсійній компанії до переїзду та домовтеся, хто подасть останню податкову декларацію. Якщо це робить бухгалтерська фірма, перевірте довіреність Suomi.fi: за даними Податкової, без неї не можна діяти в OmaVero від імені підприємства, виключеного з торговельного реєстру.' },
        { t: 'h2', x: 'Чек-лист' },
        { t: 'ol', items: [
          'Оберіть дату припинення; на зламі року 31.12. зазвичай найзрозуміліший варіант.',
          'Продайте або заберіть собі товари й основні засоби та задокументуйте ймовірну ціну продажу (наприклад, пропозицію чи оцінку).',
          'Перевірте та врегулюйте заставу підприємства, якщо вона є.',
          'Подайте повідомлення про припинення в YTJ або на формі Y6; тим самим повідомленням вийдіть із реєстрів ПДВ, передоплати й роботодавців.',
          'Повідомте пенсійну компанію про припинення підприємницької діяльності.',
          'Виплатіть останні зарплати й подайте дані до tulorekisteri.',
          'Розрахуйте ПДВ на залишки та інше майно, яке лишаєте собі, і вчасно подайте останню декларацію з ПДВ.',
          'Перевірте авансовий податок в OmaVero.',
          'Закрийте бухгалтерію останнього року (tilinpäätös — лише якщо він обов’язковий або ви його складаєте) і подайте форму 5 з позначкою про припинення.',
          'Розірвіть договори бізнесу (приміщення, зв’язок, страхування, банківський рахунок), коли всі останні платежі проведено.',
          'Збережіть архів: первинні документи 6 років, облікові регістри й tilinpäätös (якщо його складали) 10 років; повідомте PRH, хто зберігає матеріали.',
        ] },
        { t: 'h2', x: 'Типові помилки' },
        { t: 'ul', items: [
          'Повідомлення про припинення не подано, і Податкова й далі чекає декларацій з ПДВ та податку на доходи.',
          'Датою закінчення вказано перше число наступного місяця, і з’являється зайва декларація з ПДВ.',
          'Забувають ПДВ на залишки товарів і на обладнання, яке лишають собі.',
          'Машину чи інструменти забирають собі без проведення вилучення, і результат останнього року виходить неправильним.',
          'Страхування YEL продовжує діяти, бо пенсійній компанії не повідомили.',
          'Останню податкову декларацію не подають, бо бізнес уже виключено з реєстру.',
          'Бухгалтерські документи знищують під час закриття.',
        ] },
        { t: 'note', x: 'Дані перевірено в листопаді 2026 року: повідомлення про припинення безкоштовне (на папері — форма Y6), Y-tunnus toiminimi зберігається на випадок відновлення, загальна ставка ПДВ 25,5 %, строк декларації з підприємницької діяльності за 2026 рік — 1.4.2027, первинні документи зберігають 6 років, облікові регістри й tilinpäätös (якщо його складали) — 10 років. Джерела: Патентно-реєстраційне відомство (PRH), Податкова служба Фінляндії, закон про ПДВ (1501/1993), закон про оподаткування підприємницького доходу (360/1968), закон про податок на доходи (1535/1992), закон про бухгалтерський облік (1336/1997) і закон про пенсії підприємців (1272/2006).' },
        { t: 'h2', x: 'Допоможемо закрити toiminimi' },
        { t: 'p', x: 'Tilitoimisto Debit Credit веде бухгалтерію останнього року toiminimi та за потреби складає tilinpäätös, розраховує ПДВ на залишки й майно, яке ви лишаєте собі, подає останню декларацію з ПДВ і форму 5, а також перевіряє авансовий податок і використання минулих збитків. Ми працюємо фінською та російською мовами. Зв’яжіться з нами ще до дати припинення, і ми встигнемо спланувати передачу майна та повідомлення в правильному порядку.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'PRH: припинення діяльності toiminimi (англійською)', href: SRC.prhEn },
          { label: 'PRH: паперові форми (Y6) для повідомлення про припинення (фінською)', href: SRC.prhPaper },
          { label: 'Verohallinto: припинення діяльності (англійською)', href: SRC.closingEn },
          { label: 'Verohallinto: припинення діяльності, що оподатковується ПДВ (англійською)', href: SRC.vatEndEn },
          { label: 'Verohallinto: припинення діяльності, що оподатковується ПДВ, і банкрутство — докладна настанова (фінською)', href: SRC.vatGuidance },
          { label: 'Verohallinto: майно й борги бізнесу в разі припинення діяльності (фінською)', href: SRC.assets },
          { label: 'Verohallinto: збитки в разі припинення діяльності (фінською)', href: SRC.losses },
          { label: 'Verohallinto: декларація за формою 5 — інструкція (англійською)', href: SRC.form5En },
          { label: 'Verohallinto: призупинення діяльності (фінською)', href: SRC.pause },
          { label: 'Verohallinto: реєстр роботодавців (англійською)', href: SRC.employerEn },
          { label: 'Finlex: закон про ПДВ (1501/1993, фінською)', href: SRC.avl },
          { label: 'Finlex: закон про оподаткування підприємницького доходу (360/1968, фінською)', href: SRC.evl },
          { label: 'Finlex: закон про податок на доходи (1535/1992, фінською)', href: SRC.tvl },
          { label: 'Finlex: закон про бухгалтерський облік (1336/1997, фінською)', href: SRC.kpl },
          { label: 'Finlex: закон про пенсії підприємців YEL (1272/2006, фінською)', href: SRC.yel },
        ] },
      ],
      faq: [
        { q: 'Скільки коштує закрити toiminimi?', a: 'Повідомлення про припинення до торговельного реєстру, за даними PRH, безкоштовне — і в YTJ, і на формі Y6. Витрати все ж можуть виникнути через податки останнього року, наприклад ПДВ на залишки товарів і податковий ефект переведення майна в особисте господарство.' },
        { q: 'Якщо я пізніше знову відкрию бізнес, Y-tunnus буде той самий?', a: 'Так. За даними PRH, підприємець, який знову відкриває toiminimi, використовує раніше виданий йому Y-tunnus. Захист назви toiminimi при цьому закінчується після реєстрації припинення.' },
        { q: 'Чи треба продавати машину чи інструменти перед закриттям?', a: 'Ні. Їх можна залишити собі, але тоді для податку на доходи ціною передачі вважається первісна вартість придбання або нижча ймовірна ціна продажу. Якщо ПДВ за річчю було віднято, з неї додатково сплачують ПДВ на власне користування в останній декларації з ПДВ.' },
        { q: 'Чи можна використати минулі збитки toiminimi після закриття?', a: 'Підтверджені збитки підприємницької діяльності, які через припинення інакше залишилися б невикористаними, можна відняти від доходів від капіталу в рік припинення та в наступні роки — протягом 10 податкових років після року збитку, але не від зарплати. Якщо пізніше ви почнете новий бізнес, решту збитків можна відняти від його доходів.' },
        { q: 'Які обов’язки залишаються, якщо toiminimi «спить»?', a: 'Запис у торговельному реєстрі залишається, і декларацію за формою 5 потрібно подавати щороку, навіть без діяльності. Якщо ви залишаєтеся в реєстрі ПДВ, декларації подають за кожен податковий період. Страхування YEL потрібно припинити, коли підприємницька діяльність фактично закінчилася.' },
        { q: 'Чи відповідаю я за борги toiminimi після закриття?', a: 'Так. Підприємець із toiminimi особисто відповідає за борги підприємницької діяльності та за їх сплату й після її припинення.' },
      ],
    },
  },
};
