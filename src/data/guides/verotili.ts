import type { Guide } from './types';

// Facts verified 22 Oct 2026, verbatim, against vero.fi (incl. vero.fi/tulorekisteri, where
// tulorekisteri.fi now redirects) and Finlex (page update date in brackets where the page shows one).
// Every link below was fetched the same day and answered HTTP 200.
// - Finlex, Verotililaki 604/2009: "Tämä laki on kumottu L:lla ... joka on voimassa 1.1.2017 alkaen";
//   Laki verotililain kumoamisesta 790/2016, voimaantulo 1.1.2017. The repealed Act: "verotilille
//   merkitään verotilin viitenumero, verovelvollisen asettama palautuksen maksuraja";
//   "Täsmäytyksestä annetaan verovelvolliselle verotiliote"; "Kohdekauden veroa koskevat tiedot on
//   annettava Verohallinnon vahvistamalla kausiveroilmoituksella". Titles fetched: Laki
//   oma-aloitteisten verojen verotusmenettelystä 768/2016; Veronkantolaki 769/2016.
// - Vero, Oma-aloitteiset verot (19.11.2024): "veroja, joita Verohallinto ei erikseen määrää vaan
//   joiden määrän maksaja itse laskee, ilmoittaa ja maksaa"; "Et voi enää itse valita palautukselle
//   ajankohtaa tai rajaa"; lists ALV, valmisteverot, työnantajasuoritukset, ennakonpidätys osingoista
//   ja koroista, lähdeverot.
// - Vero, Oma-aloitteisten verojen maksaminen (29.4.2026): "Et siis saa niistä erillistä
//   tilisiirtolomaketta tai muuta laskua"; "Maksu veloitetaan heti"; "Maksusi näkyy Verohallinnon
//   tiedoissa 1–2 arkipäivän kuluttua. OmaVerossa saldoerittelyn Suoritetut maksut ja palautukset
//   -välilehdellä maksusi näkyy heti"; "maksusi käytetään veroon vasta sen eräpäivänä. Oma-aloitteinen
//   vero näkyy siis eräpäivään asti erääntyvissä veroissa"; "Oma-aloitteisten verojen yleinen
//   eräpäivä on kuukauden 12. päivä. Jos se on lauantai tai pyhäpäivä, eräpäivä siirtyy seuraavaksi
//   arkipäiväksi"; "Muista tehdä verosta ilmoitus, ennen kuin maksat sen"; "Vuonna 2026
//   viivästyskorko on 9,5 %"; maksujärjestely "Lisäajalta pitää maksaa viivästyskorkoa".
// - Vero, Viivästyskorko, kun maksu myöhästyy (1.1.2025; EN 1.1.2025): "Maksu käytetään ensin korolle
//   ja vasta sen jälkeen verolle"; interest also on "veronkorotuksesta tai myöhästymismaksusta";
//   "korolla ei ole vähimmäismäärää"; "eräpäivää seuraavasta päivästä maksupäivään saakka (nämä päivät
//   mukaan lukien). Korkopäiviksi lasketaan kuukauden ja vuoden todelliset päivät"; "Vuonna 2026
//   viivästyskorko on 4,5 % (perintövero) tai 9,5 % (muut verolajit)"; perimättä jättäminen e.g.
//   "äkillinen ja vakava sairastuminen", "laaja ja pitkäkestoinen tietoliikennehäiriö", not
//   "unohdit maksaa", "maksuvaikeudet", "kirjanpitäjän virhe".
//   Laki veronlisäyksestä ja viivekorosta 1556/1995, 5 a § (786/2020): "Viivästyskorko on kutakin
//   kalenterivuotta edeltävän puolivuotiskauden korkolain 12 §:ssä tarkoitettu viitekorko lisättynä
//   seitsemällä prosenttiyksiköllä."
// - Vero, Myöhästymismaksu (1.1.2021; EN 1.1.2021): "myöhästymismaksua menee, vaikka maksettavaa veroa
//   ei olisi tai antaisit ei toimintaa -ilmoituksen"; "3 euroa/päivä, kuitenkin enintään 135 euroa";
//   "35 päivää ... 105 euroa"; "135 euroa + 2 % myöhässä ilmoitetusta maksettavasta veron määrästä.
//   Maksu on kuitenkin enintään 15 000 euroa verolajilta"; "50 päivää ... 5 000 euroa ... 235 euroa";
//   "Korvaavalle ilmoitukselle ei määrätä myöhästymismaksua, jos annat sen viimeistään 45 päivää";
//   "ei voi saada lisäaikaa"; kehotus "sisältää arvion", then "määrää veron arvioimalla. Lisäksi joudut
//   maksamaan veronkorotusta"; perimättä jättäminen "häiriö yleisessä tietoverkossa tai OmaVerossa".
//   OVML 768/2016 36 §: "kolme euroa jokaiselta ... enintään 135 euroa. Jos ilmoitus annetaan yli 45
//   päivää ... lisättynä kahdella prosentilla"; "Veron määrän perusteella määräytyvä myöhästymismaksu
//   on verolajilta enintään 15 000 euroa verokaudessa"; 35 §: "Myöhästymismaksu ei ole tuloverotuksessa
//   vähennyskelpoinen meno"; tulorekisteri late fees "säädetään tulotietojärjestelmästä annetussa laissa".
// - OVML 768/2016 (Finlex, ajantasainen): 11 § "Verokausi on kalenterikuukausi"; 12 § "Arvonlisäverotuksessa
//   verovelvollinen, säännöllisesti palkkaa maksava työnantaja ja muu suorituksen maksaja kuin
//   satunnaisesti palkkaa maksava työnantaja, jonka ... kalenterivuoden liikevaihto ... on enintään
//   100 000 euroa, voi hakemuksesta valita verokaudeksi neljänneskalenterivuoden"; ALV "enintään 30 000
//   euroa, voi hakemuksesta valita verokaudeksi kalenterivuoden" (the law says "enintään"; Vero's page
//   and alv-opas.ts say "alle" — same euro limits); 13 § "Verokauden on oltava sama vähintään yhden
//   vuoden ajan"; 16 § tulorekisteri data → "Verohallinto muodostaa ... verokaudelta veroa koskevat
//   tiedot"; 17 § and 32 §: ALV "verokautta seuraavan toisen kalenterikuukauden yleisenä eräpäivänä",
//   other taxes "verokautta seuraavan kalenterikuukauden", calendar year "helmikuun viimeisenä päivänä".
// - Vero, Näin ilmoitat arvonlisäveron (1.1.2026): "Anna arvonlisäveroilmoitus jokaiselta
//   verokaudelta, vaikka yritykselläsi ei olisi ollut ... arvonlisäverollista toimintaa"; month "12.
//   päivä toisena kuukautena"; quarters "12.5.", "12.8.", "12.11.", "12.2."; year "seuraavan vuoden
//   helmikuun viimeinen päivä" ("2.3.2026 (helmikuun viimeinen päivä on lauantai)"); "Ilmoituksen
//   antamiseen ei voi saada lisäaikaa".
// - Vero, Arvonlisäveron verokausi ja sen muutokset (5.12.2024): "Arvonlisäveron ja
//   työnantajasuoritusten verokaudet eivät ole sidoksissa toisiinsa"; OmaVero "Asiakastiedot ...
//   Yritystoiminta painike Muuta verokausi", "lomakkeella ... (4071)", "muutosilmoituksella (YTJ)";
//   "Pidempi verokausi tulee voimaan hakemusta seuraavan vuoden alusta"; "Et voi myöskään päästä
//   pidennettyyn verokauteen, jos et ole antanut ilmoituksia ajallaan tai olet jättänyt veroja
//   maksamatta"; limits exceeded → "ilmoita muutoksesta viipymättä".
// - Vero, Näin ilmoitat palkat ja työnantajasuoritukset (22.1.2025): erillisilmoitus "kerran
//   kuukaudessa ... palkanmaksukuukautta seuraavan kalenterikuukauden 5. päivä"; "Ei palkanmaksua";
//   month → "verokautta seuraavan kuukauden 12. päivänä"; quarter → "verokautta toisena seuraavan
//   kuukauden 12. päivänä" (example huhti–kesäkuu "12.8.2025"); satunnainen työnantaja "et voi hakea
//   pidempää verokautta"; "verokauden pituus ei vaikuta siihen, milloin tiedot pitää ilmoittaa".
// - Vero/Tulorekisteri, Ilmoittamisen määräajat: "5 päivän kuluessa maksupäivästä"; "Jos 5. päivä on
//   lauantai, sunnuntai tai muu pyhäpäivä, voit ilmoittaa tiedot seuraavana arkipäivänä".
//   Seuraamusmaksut (1.1.2022): fee if reported "myöhemmin kuin maksupäivää seuraavan kalenterikuukauden
//   kahdeksantena päivänä"; "3 euron päiväkohtainen", "enintään 135 euroa"; over 45 days "lisätään 1
//   prosentti"; "enintään 15 135 euroa kalenterikuukaudelta"; "Palkkatietoilmoituksille, työnantajan
//   erillisilmoituksille ... ei määrätä erillisiä myöhästymismaksuja". Confirmed in Finlex,
//   tulotietojärjestelmälaki 53/2018 ("kahdeksantena päivänä", "kolme euroa", "yhdellä prosentilla").
// - Vero, Tili- ja viitenumerot yritys- ja yhteisöasiakkaille (26.1.2026): yleinen verojen viitenumero
//   for "tuloverot, kuten ennakkovero, lisäennakko ja jäännösvero", "kiinteistövero", "arvonlisävero",
//   "palkkojen ennakonpidätykset ja muut työnantajasuoritukset", "muut oma-aloitteiset verot"; not for
//   "maksujärjestelyyn kuuluvat verot tai ulosotossa olevat verot", "(One Stop Shop)", "perintövero";
//   "asiakaskohtainen"; "käytetään veroon sen eräpäivänä ... vanhimmasta uusimpaan"; same-day order
//   "palkan ennakonpidätykset, työnantajan sairausvakuutusmaksu, arvonlisävero, valmisteverot, muut
//   oma-aloitteiset verot"; "Käytä vain yhtä tapaa"; example 2: January ennakkovero payment "käytetäänkin
//   helmikuun ennakkoveroon"; "Liikkeen- tai ammatinharjoittajan verkkolaskussa viitenumerona on
//   verolajin viitenumero. Esimerkiksi ennakkoveron laskussa on tuloveron viitenumero".
//   Henkilöasiakkaat, Tili- ja viitenumerot (4.3.2026): "Verohallinnon tilinumeroita et saa vero.fi:stä";
//   "kullakin verolajilla on omat viitenumerot"; "Maksun saaja on Verohallinto".
// - Vero, Tapahtumaote (17.11.2025): monthly to OmaVero; obligations "plusmerkkisinä", payments,
//   hyvityskorot, negative ALV "miinusmerkkisiä"; "Miinusmerkkinen saldo ei siis tarkoita, että sinulla
//   olisi veroja maksamatta"; example 500 € ALV / 600 € paid → "saldo ... 0 euroa", "maksun saldo ...
//   100 euroa"; employer contribution errors "tee korjaukset Tulorekisterissä".
// - Vero, Yhteenveto verojen maksutilanteesta (17.11.2025): maksukehotus, palautusten käyttö,
//   "huomautus puuttuvista ilmoituksista", myöhästymismaksu; companies "vain sähköisesti OmaVeroon";
//   "1–3 kertaa, ennen kuin Verohallinto lähettää verot ulosottoon"; check "oikealle verokaudelle" and
//   "oikeaa tili- ja viitenumeroa"; "muutamien senttien eroja ... kirjanpitoon".
// - Vero, Käyttämättömän maksun palauttaminen (17.11.2025): OmaVero "Saldoerittely" → "Veroihin
//   käytettävissä olevat maksut" → "Pyydä palautusta maksuista".
// - Vero, ALV:n ja muiden oma-aloitteisten verojen palautus (29.4.2026): "noin viikon päästä";
//   negative ALV "vasta, kun verokautta seuraavan kuukauden yleinen eräpäivä on mennyt"; "ei maksa
//   alle 10 euron palautuksia"; "Vuonna 2026 korko on 0,5 %"; "Hyvityskorko ei ole verotettavaa
//   tuloa"; "vain yksi tilinumero kerrallaan"; missing returns "riippumatta verolajista" block refunds;
//   "Yhtiön kannattaa maksaa verot viimeistään niiden eräpäivinä eikä odottaa arvonlisäveroilmoituksen
//   käsittelyn valmistumista".
// - Vero, Maksujärjestely – yritykset ja yhteisöt (23.4.2026; EN 23.4.2026): not to ulosotto, not
//   "verovelkarekisterissä"; conditions "tilapäisiä", earlier arrangements paid, "kaikki tarvittavat
//   veroilmoitukset, palkkatietoilmoitukset ja työnantajan erillisilmoitukset", "ei ole veroja
//   ulosotossa"; "erääntyneet verot sekä verot, jotka erääntyvät 45 päivän sisällä"; "enintään 2 vuotta
//   ja pienin mahdollinen maksuerä 20 euroa"; "1−24"; "enintään 30 päivän päässä"; ALV visible "1–2
//   päivän kuluttua", employer contributions "sitäkin kauemmin"; "noin viikon kuluessa"; "Hae
//   maksujärjestelyä heti veron eräpäivänä"; may lapse if terms are not kept.
// - Vero, Verovelkarekisteri (15.6.2023): "verovelkaa vähintään 10 000 euroa tai oma-aloitteisten
//   verojen ilmoituslaiminlyöntejä viimeisten 6 kuukauden ajalta"; company data "julkisia", toiminimi
//   data only "tunnistautuneet käyttäjät"; "Luottoyhtiöt voivat ... tarkistaa".
// - Own calendar arithmetic: 12.12.2026 Saturday → 14.12.2026 Monday; 5.12.2026 Saturday → 7.12.2026;
//   28.2.2027 Sunday → 1.3.2027. Own interest arithmetic: 5 000 × 9,5 % × 30 / 365 = 39,04 €.
// Not stated (no official 2026 source found or out of scope): the euro amount of veronkorotus, the
// interest rate for future years, any service price.
const VERO = 'https://www.vero.fi';
const FI = `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut`;
const EN = `${VERO}/en/businesses-and-corporations/taxes-and-charges`;

const SRC = {
  selfFi: `${FI}/omaaloitteiset-verot/`,
  selfEn: `${EN}/self-assessed-taxes/`,
  payFi: `${FI}/omaaloitteiset-verot/maksuohjeet/`,
  payEn: `${EN}/self-assessed-taxes/paying-self-assessed-taxes/`,
  lateFi: `${FI}/omaaloitteiset-verot/myohastymismaksu/`,
  lateEn: `${EN}/self-assessed-taxes/late-penalty-charges/`,
  refundFi: `${FI}/omaaloitteiset-verot/palautuksen-maksaminen/`,
  refundEn: `${EN}/self-assessed-taxes/refunds-of-vat-and-other-taxes/`,
  interestFi: `${FI}/maksaminen-yritykset-ja-yhteisot/viivastyskorko-kun-maksu-myohastyy/`,
  interestEn: `${EN}/payments/interest-on-late-payments/`,
  refFi: `${FI}/maksaminen-yritykset-ja-yhteisot/tili-ja-viitenumerot/`,
  refEn: `${EN}/payments/bank-account-numbers-and-reference-numbers/`,
  statementFi: `${FI}/maksaminen-yritykset-ja-yhteisot/tapahtumaote/`,
  statementEn: `${EN}/payments/monthly-transaction-summary/`,
  arrangementFi: `${FI}/maksaminen-yritykset-ja-yhteisot/maksuvaikeudet/maksujarjestely/`,
  arrangementEn: `${EN}/payments/financial-difficulties/payment-arrangements/`,
  vatFilingFi: `${FI}/arvonlisaverotus/ilmoitus-ja-maksuohjeet/`,
  vatFilingEn: `${EN}/vat/when-to-file-and-pay/`,
  vatPeriodFi: `${FI}/arvonlisaverotus/ilmoitus-ja-maksuohjeet/verokauden-muutos/`,
  vatPeriodEn: `${EN}/vat/when-to-file-and-pay/tax-period/`,
  employerFi: `${FI}/yritys_tyonantajana/nain-ilmoitat-palkat-ja-tyonantajasuoritukset/`,
  employerEn: `${EN}/being-an-employer/how-to-report-wages-and-employers-contributions/`,
  irPenaltyFi: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/suorituksen-maksajat/seuraamusmaksu/`,
  irPenaltyEn: `${VERO}/en/incomes-register/companies-and-organisations/employers/penalty-fee/`,
  ovml: 'https://www.finlex.fi/fi/lainsaadanto/2016/768',
  repeal: 'https://www.finlex.fi/fi/lainsaadanto/2016/790',
  interestAct: 'https://www.finlex.fi/fi/lainsaadanto/1995/1556',
};

export const verotili: Guide = {
  slug: 'verotili',
  datePublished: '2026-10-26',
  dateModified: '2026-10-26',
  content: {
    fi: {
      title: 'Verotili ja oma-aloitteiset verot: ALV, palkkaverot ja eräpäivät 2026',
      description:
        'Mitä verotilin tilalle tuli? Oma-aloitteiset verot 2026: ALV ja työnantajasuoritukset, eräpäivät, verokausi, viitenumero, viivästyskorko 9,5 % ja palautus.',
      lead: 'Moni yrittäjä etsii vielä verotiliä, mutta sitä ei ole ollut vuoden 2016 jälkeen. Arvonlisävero ja palkkojen työnantajasuoritukset ovat oma-aloitteisia veroja: yritys laskee, ilmoittaa ja maksaa ne itse ilman laskua. Kokosimme, mitä niihin kuuluu, milloin ne ilmoitetaan ja maksetaan, miten luet saldoa OmaVerossa ja mitä myöhästyminen maksaa vuonna 2026.',
      body: [
        { t: 'h2', x: 'Verotili poistui – nyt kaikki hoidetaan OmaVerossa' },
        { t: 'p', x: 'Verotililaki (604/2009) kumottiin 1.1.2017 alkaen. Tilalle tulivat laki oma-aloitteisten verojen verotusmenettelystä (768/2016) ja veronkantolaki (769/2016). Vanhassa järjestelmässä verot ilmoitettiin kausiveroilmoituksella, ja yritys saattoi itse asettaa palautuksille maksurajan. Nykyään Verohallinto maksaa palautukset heti, kun ilmoitus tai palautuspyyntö on käsitelty, eikä palautuksen ajankohtaa tai rajaa voi enää valita.' },
        { t: 'p', x: 'Jos etsit vanhaa verotiliotetta, lähimmät vastineet ovat OmaVeron saldoerittely, kuukausittainen tapahtumaote ja yhteenveto verojen maksutilanteesta. Niistä kerromme tarkemmin alempana.' },
        { t: 'h2', x: 'Mitä oma-aloitteiset verot ovat?' },
        { t: 'p', x: 'Oma-aloitteisia veroja ovat verot, joita Verohallinto ei erikseen määrää, vaan maksaja laskee, ilmoittaa ja maksaa niiden määrän itse. Niistä ei tule laskua eikä tilisiirtolomaketta. Pienyrityksessä tärkeimmät ovat:' },
        { t: 'ul', items: [
          'Arvonlisävero (ALV), joka ilmoitetaan arvonlisäveroilmoituksella OmaVerossa.',
          'Työnantajasuoritukset eli palkoista pidätetyt ennakonpidätykset ja työnantajan sairausvakuutusmaksu, jotka ilmoitetaan tulorekisteriin.',
          'Lisäksi esimerkiksi valmisteverot, ennakonpidätys osingoista ja koroista sekä lähdeverot.',
        ] },
        { t: 'p', x: 'Ennakkovero ei kuulu oma-aloitteisiin veroihin, vaan se on tuloveroa, jonka Verohallinto määrää. Osakeyhtiö maksaa sen kuitenkin samalla yleisellä verojen viitenumerolla kuin ALV:n ja työnantajasuoritukset, joten kaikki näkyvät samassa saldossa. Ennakkoverosta on oma oppaansa.' },
        { t: 'h2', x: 'Miten ALV ja työnantajasuoritukset ilmoitetaan' },
        { t: 'ul', items: [
          'ALV: anna arvonlisäveroilmoitus OmaVerossa jokaiselta verokaudelta, myös silloin, kun myyntiä tai ostoja ei ollut. Ilmoitukselle ei voi saada lisäaikaa.',
          'Palkat: palkkatietoilmoitus tulorekisteriin 5 päivän kuluessa maksupäivästä. Jos viides päivä on lauantai, sunnuntai tai muu pyhäpäivä, tiedot voi antaa seuraavana arkipäivänä.',
          'Työnantajan sairausvakuutusmaksu: työnantajan erillisilmoitus tulorekisteriin kerran kuukaudessa, viimeistään palkanmaksukuukautta seuraavan kuukauden 5. päivänä. Työnantajarekisteriin kuuluva yritys antaa sen myös kuukausilta, joilta palkkaa ei makseta (Ei palkanmaksua -tieto).',
        ] },
        { t: 'p', x: 'Työnantajasuorituksista ei anneta erillistä veroilmoitusta OmaVeroon: Verohallinto muodostaa verokauden veron tulorekisteriin ilmoitetuista tiedoista. Kaikissa oma-aloitteisissa veroissa Verohallinto ohjeistaa tekemään ilmoituksen ennen kuin maksat.' },
        { t: 'h2', x: 'Eräpäivät: kuukauden 12. päivä' },
        { t: 'p', x: 'Oma-aloitteisten verojen yleinen eräpäivä on kuukauden 12. päivä. Jos se on lauantai tai pyhäpäivä, eräpäivä siirtyy seuraavaan arkipäivään. ALV:ssä ilmoituksen ja maksun määräpäivä on sama.' },
        { t: 'ul', items: [
          'ALV, kuukausikausi: verokautta seuraavan toisen kuukauden 12. päivä. Esimerkiksi syyskuun ALV viimeistään 12.11.',
          'ALV, neljännesvuosikausi: 12.5., 12.8., 12.11. ja 12.2.',
          'ALV, vuosikausi: seuraavan vuoden helmikuun viimeinen päivä.',
          'Työnantajasuoritukset, kuukausikausi: palkanmaksukuukautta seuraavan kuukauden 12. päivä.',
          'Työnantajasuoritukset, neljännesvuosikausi: neljännesvuotta seuraavan toisen kuukauden 12. päivä. Esimerkiksi huhti–kesäkuu viimeistään 12.8.',
        ] },
        { t: 'p', x: 'Esimerkki joulukuulta 2026: 12.12.2026 on lauantai, joten lokakuun ALV (kuukausikausi) ja marraskuussa maksettujen palkkojen työnantajasuoritukset erääntyvät maanantaina 14.12.2026. Marraskuun erillisilmoituksen määräpäivä 5.12. on lauantai, joten sen voi antaa maanantaina 7.12.2026. Vuosikauden ALV vuodelta 2026 erääntyy 1.3.2027, koska 28.2.2027 on sunnuntai.' },
        { t: 'h2', x: 'Verokausi: kuukausi, neljännesvuosi vai vuosi' },
        { t: 'p', x: 'Verokausi on lähtökohtaisesti kalenterikuukausi. Pidempää verokautta voi hakea, kun kalenterivuoden liikevaihto on pieni:' },
        { t: 'ul', items: [
          'Neljännesvuosi, kun liikevaihto on enintään 100 000 euroa. Mahdollinen ALV:ssä ja säännöllisesti palkkaa maksavan työnantajan työnantajasuorituksissa.',
          'Kalenterivuosi, kun liikevaihto on enintään 30 000 euroa. Mahdollinen vain ALV:ssä.',
        ] },
        { t: 'p', x: 'ALV:n ja työnantajasuoritusten verokaudet ovat toisistaan riippumattomat. Satunnainen työnantaja, joka ei kuulu työnantajarekisteriin, ei voi hakea pidempää verokautta, vaan maksaa työnantajasuoritukset aina kuukausittain. Verokauden pituus ei muuta tulorekisterin määräaikoja.' },
        { t: 'p', x: 'Verokautta haetaan OmaVerossa (Asiakastiedot → Yritystoiminta → Muuta verokausi), lomakkeella 4071 tai YTJ-muutosilmoituksella. Verokauden on oltava sama vähintään vuoden. Pidempi verokausi alkaa hakemusta seuraavan kalenterivuoden alusta; uusi yritys voi valita sen toiminnan alusta, kun ilmoittaa sen rekisteröityessään. Jos liikevaihtoraja ylittyy, ilmoita siitä Verohallintoon viipymättä. Pidempää verokautta ei saa, jos ilmoituksia on annettu myöhässä tai veroja on jäänyt maksamatta.' },
        { t: 'h2', x: 'Viitenumero ja maksaminen' },
        { t: 'p', x: 'Maksun saaja on aina Verohallinto. Verohallinnon tilinumerot ja oikean viitenumeron näet OmaVerosta kohdasta Maksutilanne → Verojen maksaminen ja maksutiedot; tilinumeroita ei julkaista vero.fi:ssä. Voit myös maksaa suoraan OmaVerossa, jolloin maksutiedot ovat valmiina ja maksu veloitetaan heti.' },
        { t: 'ul', items: [
          'Osakeyhtiö ja muut yhteisöt maksavat ensisijaisesti yleisellä verojen viitenumerolla. Se on yrityskohtainen ja käy lähes kaikkiin veroihin: ALV, työnantajasuoritukset, ennakkovero, lisäennakko, jäännösvero, kiinteistövero ja muut oma-aloitteiset verot. Sillä ei voi maksaa maksujärjestelyyn tai ulosottoon kuuluvia veroja eikä OSS-erityisjärjestelmän veroja.',
          'Toiminimen eli liikkeen- tai ammatinharjoittajan viitenumerot ovat verolajikohtaisia: oma-aloitteisille veroille on oma viitenumeronsa, ja ennakkovero maksetaan tuloveron viitenumerolla.',
        ] },
        { t: 'p', x: 'Yleisellä viitenumerolla tehty maksu käytetään veroon vasta sen eräpäivänä, vanhimmasta eräpäivästä alkaen. Jos samana päivänä erääntyy useita oma-aloitteisia veroja, maksu kohdistuu tässä järjestyksessä: palkan ennakonpidätykset, työnantajan sairausvakuutusmaksu, ALV, valmisteverot ja muut. Käytä vain yhtä tapaa, joko yleistä viitenumeroa tai verolajien viitenumeroita. Muuten maksut voivat kohdistua eri veroihin kuin tarkoitit. Maksu näkyy Verohallinnon tiedoissa 1–2 arkipäivän kuluttua.' },
        { t: 'h2', x: 'Näin luet saldoa OmaVerossa' },
        { t: 'ul', items: [
          'Maksutilanne → Verojen maksaminen ja maksutiedot: erääntyvät ja erääntyneet verot. Etukäteen maksettu oma-aloitteinen vero näkyy erääntyvissä veroissa eräpäivään asti, vaikka maksu olisi jo tehty.',
          'Saldoerittely: Suoritetut maksut ja palautukset -välilehdellä maksusi näkyy heti. Kohdassa Veroihin käytettävissä olevat maksut ovat maksut, joita ei ole vielä käytetty veroihin.',
          'Tapahtumaote tulee OmaVeroon kuukausittain. Verot, viivästyskorot ja myöhästymismaksut ovat siinä plusmerkkisiä; maksut, hyvityskorot ja negatiivinen ALV miinusmerkkisiä. Miinusmerkkinen loppusaldo ei tarkoita, että veroja olisi maksamatta, eikä ote ole maksumuistutus.',
          'Määrä ja saldo: jos ilmoitit ALV:tä 500 euroa ja maksoit 600 euroa, veron saldo on 0 euroa ja maksun saldo 100 euroa. Ylimääräiset 100 euroa odottavat käyttöä tai palautusta.',
          'Yhteenveto verojen maksutilanteesta on kuukausikirje, jossa ovat maksukehotukset, tiedot maksujen ja palautusten käytöstä, puuttuvat ilmoitukset ja myöhästymismaksut. Yritykset saavat sen vain sähköisesti OmaVeroon.',
        ] },
        { t: 'p', x: 'Jos tiedoista puuttuu maksu tai ilmoitus, tarkista ensin, että ilmoitus on annettu oikealle verokaudelle ja maksussa on oikea viitenumero. Työnantajasuoritusten virheet korjataan tulorekisterissä, ei OmaVerossa. Hyvityskorkojen takia yhteenvedossa voi olla muutaman sentin ero kirjanpitoon.' },
        { t: 'h2', x: 'Palautus: negatiivinen ALV ja käyttämätön maksu' },
        { t: 'ul', items: [
          'Negatiivinen ALV, eli vähennettävää veroa on enemmän kuin maksettavaa, palautetaan ilman erillistä hakemusta, kun ilmoitus on käsitelty. Palautus maksetaan kuitenkin aikaisintaan, kun verokautta seuraavan kuukauden yleinen eräpäivä on mennyt. Raha tulee tilille noin viikon kuluttua käsittelystä.',
          'Käyttämätön maksu, esimerkiksi liikaa maksettu summa, ei palaudu itsestään. Tee palautuspyyntö OmaVeron saldoerittelyssä kohdasta Veroihin käytettävissä olevat maksut.',
          'Alle 10 euron palautuksia ei makseta. Ne jäävät odottamaan seuraavia palautuksia tai käytetään veroihin.',
          'Palautukselle maksetaan hyvityskorkoa, vuonna 2026 0,5 %. Hyvityskorko ei ole verotettavaa tuloa.',
          'Verohallinto käyttää palautuksen ensin erääntyneisiin veroihin. Jos jokin veroilmoitus puuttuu, verolajista riippumatta, palautusta ei makseta.',
          'Ilmoita palautuksia varten tilinumero OmaVerossa. Voimassa voi olla yksi tilinumero kerrallaan.',
        ] },
        { t: 'p', x: 'Älä odota ALV-palautusta maksaaksesi muita veroja. Jos ALV-ilmoitus jää Verohallinnon käsittelyyn, palautusta ei voi heti käyttää samana päivänä erääntyviin työnantajasuorituksiin, ja maksamatta jääneestä summasta tulee maksukehotus. Verohallinto neuvoo maksamaan verot viimeistään eräpäivänä.' },
        { t: 'h2', x: 'Jos ilmoitus myöhästyy: myöhästymismaksu' },
        { t: 'p', x: 'Myöhässä annetusta ALV-ilmoituksesta ja muusta OmaVeroon annettavasta oma-aloitteisen veron ilmoituksesta määrätään myöhästymismaksu. Se tulee myös silloin, kun maksettavaa veroa ei ole tai annat ei toimintaa -ilmoituksen.' },
        { t: 'ul', items: [
          'Enintään 45 päivää myöhässä: 3 euroa päivältä, enintään 135 euroa. Esimerkiksi 35 päivää myöhässä: 105 euroa.',
          'Yli 45 päivää myöhässä: 135 euroa ja lisäksi 2 % myöhässä ilmoitetusta maksettavasta verosta. Veron määrään perustuva osa on enintään 15 000 euroa verolajilta verokaudessa. Esimerkiksi 50 päivää myöhässä ja veroa 5 000 euroa: 135 + 100 = 235 euroa.',
          'Korjaus: korvaavasta ilmoituksesta ei määrätä maksua, jos annat sen viimeistään 45 päivää alkuperäisen määräpäivän jälkeen. Myöhemmästä korjauksesta maksu on 2 % lisätystä verosta.',
          'Myöhästymismaksu ei ole tuloverotuksessa vähennyskelpoinen meno.',
        ] },
        { t: 'p', x: 'Jos ilmoitusta ei tule lainkaan, Verohallinto lähettää kehotuksen, jossa on arvio verosta. Jos ilmoitusta ei kehotuksenkaan jälkeen anneta, vero määrätään arvioimalla ja lisäksi määrätään veronkorotus. Erityisestä syystä, esimerkiksi OmaVeron häiriön vuoksi, myöhästymismaksun perimättä jättämistä voi hakea OmaVerossa.' },
        { t: 'p', x: 'Tulorekisterin ilmoituksille on oma myöhästymismaksunsa tulotietojärjestelmälain mukaan. Se määrätään, jos kuukauden aikana maksettujen palkkojen tiedot ilmoitetaan myöhemmin kuin maksupäivää seuraavan kuukauden 8. päivänä: 3 euroa päivältä enintään 45 päivältä (135 euroa), ja yli 45 päivän viiveessä lisäksi 1 % myöhässä ilmoitetusta palkasta, yhteensä enintään 15 135 euroa kalenterikuukaudelta. Palkkatietoilmoitukset ja erillisilmoitus katsotaan yhdeksi kokonaisuudeksi.' },
        { t: 'h2', x: 'Jos maksu myöhästyy: viivästyskorko 9,5 %' },
        { t: 'p', x: 'Eräpäivän jälkeen maksetulle verolle lasketaan viivästyskorkoa. Vuonna 2026 viivästyskorko on 9,5 % (perintöverossa 4,5 %). Lain mukaan korko on viitekorko lisättynä seitsemällä prosenttiyksiköllä, ja se vahvistetaan vuosittain. Korkoa lasketaan eräpäivää seuraavasta päivästä maksupäivään saakka todellisten päivien mukaan, eikä sillä ole vähimmäismäärää. Viivästyskorkoa maksetaan myös myöhästymismaksulle ja veronkorotukselle.' },
        { t: 'p', x: 'Esimerkki: 5 000 euron ALV maksetaan 30 päivää myöhässä. Viivästyskorko on 5 000 × 9,5 % × 30 / 365 = 39,04 euroa. Maksa vero ja korko yhdellä kertaa samoilla maksutiedoilla, sillä maksu käytetään ensin korolle ja vasta sitten verolle. OmaVerossa korko on laskettu summaan valmiiksi.' },
        { t: 'p', x: 'Koron perimättä jättämistä voi hakea vain poikkeustilanteissa, kuten äkillisen vakavan sairastumisen tai laajan tietoliikennehäiriön vuoksi. Unohdus, maksuvaikeudet tai kirjanpitäjän virhe eivät ole peruste.' },
        { t: 'p', x: 'Maksamattomasta verosta tulee yhteenvedossa maksukehotus 1–3 kertaa, ennen kuin vero lähetetään ulosottoon. Verovelkarekisteristä näkyy, onko yrityksellä vähintään 10 000 euroa verovelkaa tai oma-aloitteisten verojen ilmoituslaiminlyöntejä viimeisten 6 kuukauden ajalta. Yritysten tiedot ovat julkisia, toiminimen tiedot näkyvät vain tunnistautuneille käyttäjille. Myös luottoyhtiöt voivat tarkistaa tiedot.' },
        { t: 'h2', x: 'Maksujärjestely, jos rahat eivät riitä' },
        { t: 'p', x: 'Tilapäisissä maksuvaikeuksissa voit hakea OmaVerossa maksujärjestelyä (Veroasiat → Maksaminen → Maksujärjestelypyyntö). Maksujärjestelyyn kuuluvaa velkaa ei lähetetä ulosottoon eikä julkaista verovelkarekisterissä.' },
        { t: 'ul', items: [
          'Edellytykset: maksuvaikeudet ovat tilapäisiä, aiemmat maksujärjestelyt on maksettu, kaikki veroilmoitukset sekä tulorekisterin palkkatieto- ja erillisilmoitukset on annettu, eikä veroja ole ulosotossa.',
          'Kesto enintään 2 vuotta, 1–24 kuukausierää ja pienin erä 20 euroa. Ensimmäinen eräpäivä voi olla enintään 30 päivän päässä pyynnöstä.',
          'Mukaan tulevat jo erääntyneet verot ja 45 päivän sisällä erääntyvät verot. Oma-aloitteisissa veroissa anna ensin ilmoitus ja odota, että vero näkyy OmaVerossa maksettavana. ALV näkyy 1–2 päivässä, työnantajasuoritukset voivat näkyä hitaammin.',
          'Lisäajalta maksetaan viivästyskorkoa. Järjestely voi raueta, jos erät tai muut verot myöhästyvät tai ilmoituksia ei anneta ajallaan.',
          'Käsittely kestää noin viikon. Hae järjestelyä heti eräpäivänä, kun tiedät, ettet pysty maksamaan.',
        ] },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Etsitään vanhaa verotiliä tai verotiliotetta, vaikka nykyiset tiedot ovat OmaVeron saldoerittelyssä, tapahtumaotteessa ja yhteenvedossa.',
          'ALV-ilmoitus jää antamatta kuukaudelta, jolloin myyntiä ei ollut. Ilmoitus tarvitaan joka kaudelta, ja myöhästymismaksu tulee silloinkin.',
          'Työnantajarekisteriin kuuluva yritys unohtaa Ei palkanmaksua -tiedon kuukaudelta, jolloin palkkaa ei maksettu.',
          'Yleistä viitenumeroa ja verolajien viitenumeroita käytetään sekaisin, ja maksu kohdistuu väärään veroon. Esimerkiksi tammikuun ennakkoveroksi tarkoitettu maksu menee helmikuun erään.',
          'Maksetaan ennen ilmoitusta tai ilmoitetaan väärälle verokaudelle, jolloin maksu jää käyttämättä ja vero näkyy maksamattomana.',
          'Odotetaan ALV-palautusta ja jätetään samana päivänä erääntyvät työnantajasuoritukset maksamatta.',
          'Neljännes- tai vuosikausi jää voimaan, vaikka liikevaihto ylittää rajan. Muutoksesta on ilmoitettava viipymättä.',
          'Tapahtumaotteen miinusmerkkistä loppusaldoa luullaan velaksi.',
        ] },
        { t: 'note', x: 'Luvut ovat vuoden 2026 tietoja: viivästyskorko 9,5 %, hyvityskorko 0,5 % ja myöhästymismaksu 3 euroa päivältä (enintään 135 euroa). Lähteet: Verohallinto, oma-aloitteisten verojen maksuohjeet (päivitetty 29.4.2026), viivästyskorko, myöhästymismaksu, palautukset (29.4.2026) ja maksujärjestely (23.4.2026) sekä laki oma-aloitteisten verojen verotusmenettelystä (768/2016). Korot vahvistetaan vuosittain.' },
        { t: 'h2', x: 'Hoidamme oma-aloitteiset verot puolestasi' },
        { t: 'p', x: 'Tilitoimisto Debit Credit huolehtii, että ALV-ilmoitukset sekä tulorekisterin palkka- ja erillisilmoitukset lähtevät määräajassa, laskee maksettavat verot eräpäiville, valitsee kanssasi sopivan verokauden ja selvittää OmaVeron saldon, jos maksut ovat kohdistuneet väärin tai palautus ei tule. Jos verot ovat jo myöhässä, käymme yhdessä läpi korjaukset ja tarvittaessa maksujärjestelyn. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä, niin katsotaan yrityksesi verotilanne läpi.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: oma-aloitteiset verot', href: SRC.selfFi },
          { label: 'Verohallinto: oma-aloitteisten verojen maksaminen ja eräpäivä', href: SRC.payFi },
          { label: 'Verohallinto: näin ilmoitat arvonlisäveron (määräpäivät)', href: SRC.vatFilingFi },
          { label: 'Verohallinto: arvonlisäveron verokausi ja sen muutokset', href: SRC.vatPeriodFi },
          { label: 'Verohallinto: näin ilmoitat palkat ja työnantajasuoritukset', href: SRC.employerFi },
          { label: 'Verohallinto: tili- ja viitenumerot yrityksille', href: SRC.refFi },
          { label: 'Verohallinto: tapahtumaote', href: SRC.statementFi },
          { label: 'Verohallinto: arvonlisäveron ja muiden oma-aloitteisten verojen palautus', href: SRC.refundFi },
          { label: 'Verohallinto: myöhästymismaksu', href: SRC.lateFi },
          { label: 'Verohallinto: viivästyskorko, kun maksu myöhästyy', href: SRC.interestFi },
          { label: 'Verohallinto: maksujärjestely yrityksille', href: SRC.arrangementFi },
          { label: 'Tulorekisteri: seuraamusmaksut', href: SRC.irPenaltyFi },
          { label: 'Finlex: laki oma-aloitteisten verojen verotusmenettelystä (768/2016)', href: SRC.ovml },
          { label: 'Finlex: laki verotililain kumoamisesta (790/2016)', href: SRC.repeal },
          { label: 'Finlex: laki veronlisäyksestä ja viivekorosta (1556/1995)', href: SRC.interestAct },
        ] },
      ],
      faq: [
        { q: 'Onko verotili vielä käytössä?', a: 'Ei. Verotililaki kumottiin 1.1.2017 alkaen. Oma-aloitteiset verot ilmoitetaan ja maksetaan nykyään OmaVerossa, ja maksutilanteen näet saldoerittelystä, kuukausittaisesta tapahtumaotteesta ja yhteenvedosta.' },
        { q: 'Milloin ALV ja työnantajasuoritukset pitää maksaa?', a: 'Yleensä kuukauden 12. päivänä. Kuukausikauden ALV erääntyy verokautta seuraavan toisen kuukauden 12. päivänä ja työnantajasuoritukset palkanmaksukuukautta seuraavan kuukauden 12. päivänä. Jos 12. päivä on lauantai tai pyhäpäivä, eräpäivä siirtyy seuraavaan arkipäivään.' },
        { q: 'Paljonko myöhästyminen maksaa vuonna 2026?', a: 'Myöhässä maksetulle verolle lasketaan viivästyskorkoa 9,5 % vuodessa. Myöhässä annetusta ilmoituksesta tulee myöhästymismaksu: 3 euroa päivältä, enintään 135 euroa, ja yli 45 päivän viiveessä lisäksi 2 % ilmoitetusta verosta.' },
        { q: 'Voiko ALV-ilmoitukselle saada lisäaikaa?', a: 'Ei. Oma-aloitteisten verojen ilmoitukselle ei voi saada lisäaikaa. Maksulle voi hakea maksujärjestelyä, mutta ilmoitus on annettava ensin, ja lisäajalta maksetaan viivästyskorkoa.' },
        { q: 'Mistä löydän viitenumeron?', a: 'OmaVerosta kohdasta Maksutilanne → Verojen maksaminen ja maksutiedot. Osakeyhtiö käyttää yleistä verojen viitenumeroa, toiminimi verolajikohtaisia viitenumeroita. Maksun saaja on Verohallinto.' },
        { q: 'Miksi ALV-palautus ei tule?', a: 'Negatiivinen ALV palautetaan aikaisintaan verokautta seuraavan kuukauden yleisen eräpäivän jälkeen ja noin viikon kuluttua käsittelystä. Palautusta ei makseta, jos jokin veroilmoitus puuttuu, ja se käytetään ensin erääntyneisiin veroihin. Alle 10 euron palautuksia ei makseta.' },
      ],
    },
    ru: {
      title: 'Verotili и налоги на самодекларации: ALV, взносы работодателя и сроки 2026',
      description:
        'Что пришло на смену verotili? Налоги на самодекларации 2026: ALV и взносы работодателя, сроки, налоговый период, viitenumero, пени 9,5 % и возврат.',
      lead: 'Многие предприниматели до сих пор ищут verotili — налоговый счёт, которого нет с 2017 года. НДС (ALV) и взносы работодателя с зарплаты — это налоги на самодекларации (oma-aloitteiset verot): компания сама считает, декларирует и платит их без всякого счёта от налоговой. Разбираем, что к ним относится, когда отчитываться и платить, как читать сальдо в OmaVero и сколько стоит опоздание в 2026 году.',
      body: [
        { t: 'h2', x: 'Verotili отменён — теперь всё в OmaVero' },
        { t: 'p', x: 'Закон о налоговом счёте (verotililaki 604/2009) отменён с 1.1.2017. Вместо него действуют закон о порядке налогообложения налогов на самодекларации (laki oma-aloitteisten verojen verotusmenettelystä 768/2016) и закон о взимании налогов (veronkantolaki 769/2016). В старой системе налоги подавали периодической декларацией (kausiveroilmoitus), а компания могла сама задать порог для возвратов. Сейчас налоговая (Verohallinto) возвращает деньги сразу после обработки декларации или заявления, и выбрать срок или порог возврата уже нельзя.' },
        { t: 'p', x: 'Если вы ищете старую выписку по verotili, её ближайшие замены — разбивка сальдо (saldoerittely) в OmaVero, ежемесячная выписка операций (tapahtumaote) и сводка о состоянии платежей (yhteenveto verojen maksutilanteesta). О них ниже.' },
        { t: 'h2', x: 'Что такое налоги на самодекларации' },
        { t: 'p', x: 'Это налоги, которые налоговая не назначает отдельно: плательщик сам рассчитывает сумму, декларирует и платит её. Счёта или платёжной квитанции по ним не приходит. Для малого бизнеса главные из них:' },
        { t: 'ul', items: [
          'НДС (ALV) — подаётся декларацией по ALV (arvonlisäveroilmoitus) в OmaVero.',
          'Взносы работодателя (työnantajasuoritukset): удержанный с зарплаты налог (ennakonpidätys) и взнос работодателя на медицинское страхование (työnantajan sairausvakuutusmaksu) — подаются в регистр доходов Tulorekisteri.',
          'А также, например, акцизы, налог, удержанный с дивидендов и процентов, и налог у источника (lähdevero).',
        ] },
        { t: 'p', x: 'Авансовый налог (ennakkovero) к налогам на самодекларации не относится: это подоходный налог, который назначает налоговая. Но osakeyhtiö платит его по тому же общему номеру ссылки, что ALV и взносы работодателя, поэтому всё видно в одном сальдо. Про ennakkovero у нас есть отдельный гид.' },
        { t: 'h2', x: 'Как декларируются ALV и взносы работодателя' },
        { t: 'ul', items: [
          'ALV: декларация в OmaVero за каждый налоговый период, даже если продаж и покупок не было. Продлить срок подачи нельзя.',
          'Зарплаты: отчёт о зарплате (palkkatietoilmoitus) в Tulorekisteri в течение 5 дней после дня выплаты. Если пятый день выпадает на субботу, воскресенье или праздник, можно подать в следующий рабочий день.',
          'Взнос работодателя на медстрахование: отдельный отчёт работодателя (työnantajan erillisilmoitus) раз в месяц, не позднее 5-го числа месяца, следующего за месяцем выплаты зарплаты. Компания из реестра работодателей (työnantajarekisteri) подаёт его и за месяцы без выплат (отметка «Ei palkanmaksua»).',
        ] },
        { t: 'p', x: 'Отдельной декларации по взносам работодателя в OmaVero нет: налоговая сама формирует налог за период из данных Tulorekisteri. По всем налогам на самодекларации налоговая советует сначала подать декларацию и только потом платить.' },
        { t: 'h2', x: 'Сроки: 12-е число месяца' },
        { t: 'p', x: 'Общий срок уплаты налогов на самодекларации — 12-е число месяца. Если это суббота или праздник, срок переносится на следующий рабочий день. По ALV срок подачи декларации и срок оплаты совпадают.' },
        { t: 'ul', items: [
          'ALV, месячный период: 12-е число второго месяца после периода. Например, ALV за сентябрь — до 12.11.',
          'ALV, квартальный период: 12.5, 12.8, 12.11 и 12.2.',
          'ALV, годовой период: последний день февраля следующего года.',
          'Взносы работодателя, месячный период: 12-е число месяца после месяца выплаты зарплаты.',
          'Взносы работодателя, квартальный период: 12-е число второго месяца после квартала. Например, за апрель–июнь — до 12.8.',
        ] },
        { t: 'p', x: 'Пример на декабрь 2026 года: 12.12.2026 — суббота, поэтому ALV за октябрь (месячный период) и взносы с зарплат, выплаченных в ноябре, нужно заплатить до понедельника 14.12.2026. Срок отдельного отчёта за ноябрь, 5.12, тоже выпадает на субботу, его можно подать в понедельник 7.12.2026. Годовой ALV за 2026 год — до 1.3.2027, потому что 28.2.2027 — воскресенье.' },
        { t: 'h2', x: 'Налоговый период: месяц, квартал или год' },
        { t: 'p', x: 'По умолчанию налоговый период (verokausi) — календарный месяц. Более длинный период можно запросить при небольшом обороте за календарный год:' },
        { t: 'ul', items: [
          'Квартал — при обороте не более 100 000 €. Возможен для ALV и для взносов работодателя, который платит зарплату регулярно.',
          'Календарный год — при обороте не более 30 000 €. Только для ALV.',
        ] },
        { t: 'p', x: 'Периоды по ALV и по взносам работодателя не зависят друг от друга. Нерегулярный работодатель (satunnainen työnantaja), не внесённый в реестр работодателей, не может получить более длинный период и платит взносы каждый месяц. Длина периода не меняет сроки подачи в Tulorekisteri.' },
        { t: 'p', x: 'Период меняют в OmaVero (Asiakastiedot → Yritystoiminta → Muuta verokausi), формой 4071 или уведомлением об изменениях в YTJ. Период должен оставаться прежним не меньше года. Более длинный период начинается с начала календарного года после заявления; новая компания может выбрать его с начала деятельности, если укажет это при регистрации. Если оборот превысил лимит, сообщите налоговой без промедления. Длинный период не дадут, если декларации подавались с опозданием или есть неуплаченные налоги.' },
        { t: 'h2', x: 'Номер ссылки (viitenumero) и оплата' },
        { t: 'p', x: 'Получатель платежа всегда Verohallinto. Номера счетов налоговой и правильный номер ссылки смотрите в OmaVero: Maksutilanne → Verojen maksaminen ja maksutiedot. На сайте vero.fi номера счетов не публикуются. Можно заплатить и прямо в OmaVero: реквизиты уже заполнены, деньги списываются сразу.' },
        { t: 'ul', items: [
          'Osakeyhtiö и другие юрлица платят в первую очередь по общему номеру ссылки (yleinen verojen viitenumero). Он свой у каждой компании и подходит почти для всех налогов: ALV, взносы работодателя, ennakkovero, lisäennakko, jäännösvero, налог на недвижимость и прочие налоги на самодекларации. По нему нельзя платить налоги в рассрочке (maksujärjestely) или у судебных приставов (ulosotto), а также налоги по спецрежиму OSS.',
          'У toiminimi (индивидуального предпринимателя) номера ссылки по видам налогов: для налогов на самодекларации — свой номер, а ennakkovero платится по номеру подоходного налога.',
        ] },
        { t: 'p', x: 'Платёж по общему номеру ссылки идёт на налог только в день его срока, начиная с самого старого. Если в один день наступает срок нескольких налогов на самодекларации, деньги распределяются так: удержанный с зарплаты налог, взнос работодателя на медстрахование, ALV, акцизы, остальное. Пользуйтесь одним способом — либо общим номером, либо номерами по видам налогов, иначе платёж может уйти не на тот налог. В данных налоговой платёж появляется через 1–2 рабочих дня.' },
        { t: 'h2', x: 'Как читать сальдо в OmaVero' },
        { t: 'ul', items: [
          'Maksutilanne → Verojen maksaminen ja maksutiedot: налоги к оплате и просроченные. Налог, оплаченный заранее, всё равно висит в «предстоящих» до дня срока.',
          'Saldoerittely: на вкладке «Suoritetut maksut ja palautukset» платёж виден сразу. В разделе «Veroihin käytettävissä olevat maksut» — деньги, которые ещё не пошли на налоги.',
          'Tapahtumaote приходит в OmaVero раз в месяц. Налоги, пени и штрафы за опоздание в нём со знаком плюс; платежи, проценты на возврат (hyvityskorko) и отрицательный ALV — со знаком минус. Отрицательный итог не означает долга, и выписка — не напоминание об оплате.',
          'Сумма и остаток: если вы задекларировали ALV 500 € и заплатили 600 €, остаток по налогу 0 €, а остаток по платежу 100 € — эти 100 € ждут зачёта или возврата.',
          'Yhteenveto verojen maksutilanteesta — ежемесячное письмо: требования об оплате, на что пошли платежи и возвраты, недостающие декларации, штрафы за опоздание. Компании получают его только в электронном виде в OmaVero.',
        ] },
        { t: 'p', x: 'Если платежа или декларации не видно, сначала проверьте, что декларация подана за правильный период, а в платеже верный номер ссылки. Ошибки по взносам работодателя исправляют в Tulorekisteri, а не в OmaVero. Из-за процентов на возврат сводка может расходиться с бухгалтерией на несколько центов.' },
        { t: 'h2', x: 'Возврат: отрицательный ALV и лишний платёж' },
        { t: 'ul', items: [
          'Отрицательный ALV (налога к вычету больше, чем к уплате) возвращается без отдельного заявления после обработки декларации, но не раньше общего срока уплаты месяца, следующего за периодом. Деньги приходят примерно через неделю после обработки.',
          'Неиспользованный платёж, например переплата, сам не возвращается: подайте заявление в OmaVero в разделе saldoerittely → «Veroihin käytettävissä olevat maksut».',
          'Возвраты меньше 10 € не выплачиваются: они ждут следующих возвратов или идут на налоги.',
          'На возврат начисляется hyvityskorko — в 2026 году 0,5 %. Он не облагается налогом.',
          'Налоговая сначала направляет возврат на просроченные налоги. Если не подана какая-либо декларация, по любому налогу, возврат не выплачивается.',
          'Для возвратов укажите номер счёта в OmaVero; действовать может только один счёт.',
        ] },
        { t: 'p', x: 'Не ждите возврата ALV, чтобы заплатить другие налоги. Если декларация по ALV застряла на проверке, возврат нельзя сразу зачесть во взносы работодателя с тем же сроком, и на неоплаченную сумму придёт требование. Налоговая советует платить налоги не позднее срока.' },
        { t: 'h2', x: 'Опоздание с декларацией: myöhästymismaksu' },
        { t: 'p', x: 'За декларацию по ALV или по другому налогу на самодекларации, поданную в OmaVero с опозданием, назначается плата за просрочку (myöhästymismaksu) — даже если налога к уплате нет или подана декларация «без деятельности» (ei toimintaa).' },
        { t: 'ul', items: [
          'До 45 дней: 3 € в день, максимум 135 €. Например, 35 дней опоздания — 105 €.',
          'Более 45 дней: 135 € плюс 2 % от задекларированного с опозданием налога к уплате. Процентная часть — не более 15 000 € по виду налога за период. Например, 50 дней и налог 5 000 €: 135 + 100 = 235 €.',
          'Исправление: за заменяющую декларацию платы нет, если она подана не позднее 45 дней после исходного срока. За более позднее исправление — 2 % от доначисленного налога.',
          'Myöhästymismaksu не уменьшает налогооблагаемую прибыль.',
        ] },
        { t: 'p', x: 'Если декларации нет вовсе, налоговая присылает требование с оценкой налога. Если и после этого декларацию не подать, налог начисляют по оценке и добавляют налоговую надбавку (veronkorotus). При особой причине, например сбое OmaVero, можно попросить не взимать плату за просрочку — заявление подаётся в OmaVero.' },
        { t: 'p', x: 'Для отчётов в Tulorekisteri своя плата за просрочку по закону о системе данных о доходах (tulotietojärjestelmälaki). Она назначается, если данные о зарплате, выплаченной в течение месяца, поданы позже 8-го числа следующего месяца: 3 € в день максимум за 45 дней (135 €), а при опоздании больше 45 дней ещё 1 % от суммы зарплаты, поданной с опозданием, — всего не более 15 135 € за календарный месяц. Отчёты о зарплате и отдельный отчёт работодателя считаются одним комплектом.' },
        { t: 'h2', x: 'Опоздание с оплатой: пени (viivästyskorko) 9,5 %' },
        { t: 'p', x: 'На налог, уплаченный после срока, начисляются пени (viivästyskorko). В 2026 году это 9,5 % годовых (по налогу на наследство — 4,5 %). По закону ставка равна референтной ставке плюс семь процентных пунктов и устанавливается каждый год. Пени считаются со дня после срока по день оплаты включительно по фактическому числу дней, минимальной суммы нет. Пени начисляются и на myöhästymismaksu, и на налоговую надбавку.' },
        { t: 'p', x: 'Пример: ALV 5 000 € уплачен на 30 дней позже. Пени: 5 000 × 9,5 % × 30 / 365 = 39,04 €. Платите налог и пени одним платежом с теми же реквизитами: деньги сначала идут на пени, потом на налог. В OmaVero пени уже включены в сумму.' },
        { t: 'p', x: 'Освободить от пеней могут лишь в исключительных случаях, например при внезапной тяжёлой болезни или масштабном сбое связи. Забывчивость, нехватка денег или ошибка бухгалтера основанием не считаются.' },
        { t: 'p', x: 'О неоплаченном налоге в сводке приходит требование 1–3 раза, после чего налог передают приставам (ulosotto). В реестре налоговых долгов (verovelkarekisteri) видно, есть ли у компании долг от 10 000 € или пропущенные декларации по налогам на самодекларации за последние 6 месяцев. Данные компаний открыты всем, данные toiminimi видны только авторизованным пользователям. Проверять их могут и кредитные компании.' },
        { t: 'h2', x: 'Рассрочка (maksujärjestely), если денег не хватает' },
        { t: 'p', x: 'При временных трудностях можно запросить рассрочку в OmaVero (Veroasiat → Maksaminen → Maksujärjestelypyyntö). Долг в рассрочке не передают приставам и не публикуют в реестре налоговых долгов.' },
        { t: 'ul', items: [
          'Условия: трудности временные, прежние рассрочки погашены, все декларации, отчёты о зарплате и отдельные отчёты работодателя поданы, налогов у приставов нет.',
          'Срок — до 2 лет, от 1 до 24 ежемесячных платежей, минимальный платёж 20 €. Первый срок — не позже чем через 30 дней после заявки.',
          'В рассрочку попадают уже просроченные налоги и налоги со сроком в ближайшие 45 дней. По налогам на самодекларации сначала подайте декларацию и дождитесь, пока налог появится в OmaVero к оплате: ALV — через 1–2 дня, взносы работодателя — иногда дольше.',
          'За отсрочку начисляются пени. Рассрочку могут отменить, если пропустить платёж, не заплатить другие налоги вовремя или опоздать с декларациями.',
          'Заявку рассматривают около недели. Подавайте её сразу в день срока, если понимаете, что заплатить не сможете.',
        ] },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Искать старый verotili или выписку по нему, хотя актуальные данные — в saldoerittely, tapahtumaote и yhteenveto в OmaVero.',
          'Не подать декларацию по ALV за месяц без продаж. Декларация нужна за каждый период, и плата за просрочку начисляется и в этом случае.',
          'Компания из реестра работодателей забывает отметку «Ei palkanmaksua» за месяц без зарплаты.',
          'Смешивать общий номер ссылки и номера по видам налогов — платёж уходит не туда. Например, деньги для январского ennakkovero засчитываются в февральский.',
          'Платить до подачи декларации или подать её не за тот период: платёж остаётся неиспользованным, а налог числится неоплаченным.',
          'Ждать возврата ALV и не платить взносы работодателя с тем же сроком.',
          'Оставаться на квартальном или годовом периоде после превышения лимита оборота. Об изменении нужно сообщить без промедления.',
          'Принимать отрицательный итог tapahtumaote за долг.',
        ] },
        { t: 'note', x: 'Цифры 2026 года: пени 9,5 %, hyvityskorko 0,5 %, плата за просрочку декларации 3 € в день (максимум 135 €). Источники: налоговая Verohallinto — инструкция по оплате налогов на самодекларации (обновлено 29.4.2026), пени, плата за просрочку, возвраты (29.4.2026) и рассрочка (23.4.2026); закон 768/2016. Ставки устанавливаются ежегодно.' },
        { t: 'h2', x: 'Возьмём налоги на самодекларации на себя' },
        { t: 'p', x: 'Tilitoimisto Debit Credit следит, чтобы декларации по ALV и отчёты в Tulorekisteri уходили в срок, рассчитывает налоги к каждому сроку оплаты, помогает выбрать подходящий налоговый период и разбирается с сальдо в OmaVero, если платёж ушёл не туда или возврат не приходит. Если налоги уже просрочены, вместе разберём исправления и при необходимости рассрочку. Работаем на русском и финском. Свяжитесь с нами — посмотрим налоговую ситуацию вашей компании.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: налоги на самодекларации (на английском)', href: SRC.selfEn },
          { label: 'Vero: оплата налогов на самодекларации и срок (на английском)', href: SRC.payEn },
          { label: 'Vero: сроки подачи и оплаты ALV (на английском)', href: SRC.vatFilingEn },
          { label: 'Vero: налоговый период ALV (на английском)', href: SRC.vatPeriodEn },
          { label: 'Vero: как отчитываться о зарплате и взносах работодателя (на английском)', href: SRC.employerEn },
          { label: 'Vero: номера счетов и ссылки (на английском)', href: SRC.refEn },
          { label: 'Vero: ежемесячная выписка операций (на английском)', href: SRC.statementEn },
          { label: 'Vero: возврат ALV и других налогов (на английском)', href: SRC.refundEn },
          { label: 'Vero: плата за просрочку декларации (на английском)', href: SRC.lateEn },
          { label: 'Vero: пени за просрочку оплаты (на английском)', href: SRC.interestEn },
          { label: 'Vero: рассрочка для компаний (на английском)', href: SRC.arrangementEn },
          { label: 'Tulorekisteri: штрафы за просрочку (на английском)', href: SRC.irPenaltyEn },
          { label: 'Finlex: закон 768/2016 о налогах на самодекларации (на финском)', href: SRC.ovml },
          { label: 'Finlex: закон 790/2016 об отмене закона о налоговом счёте (на финском)', href: SRC.repeal },
          { label: 'Finlex: закон 1556/1995 о пенях (на финском)', href: SRC.interestAct },
        ] },
      ],
      faq: [
        { q: 'Verotili ещё существует?', a: 'Нет. Закон о налоговом счёте отменён с 1.1.2017. Налоги на самодекларации подаются и оплачиваются в OmaVero, а состояние платежей видно в saldoerittely, ежемесячной выписке tapahtumaote и сводке yhteenveto.' },
        { q: 'Когда платить ALV и взносы работодателя?', a: 'Как правило, 12-го числа. ALV за месяц — 12-го числа второго месяца после периода, взносы работодателя — 12-го числа месяца после выплаты зарплаты. Если 12-е выпадает на субботу или праздник, срок переносится на следующий рабочий день.' },
        { q: 'Сколько стоит опоздание в 2026 году?', a: 'На налог, уплаченный с опозданием, начисляются пени 9,5 % годовых. За опоздание с декларацией — 3 € в день, максимум 135 €, а при опоздании больше 45 дней ещё 2 % от задекларированного налога.' },
        { q: 'Можно ли продлить срок декларации по ALV?', a: 'Нет, продлить срок подачи декларации по налогам на самодекларации нельзя. Для оплаты можно запросить рассрочку, но сначала нужно подать декларацию, а за отсрочку начисляются пени.' },
        { q: 'Где найти номер ссылки (viitenumero)?', a: 'В OmaVero: Maksutilanne → Verojen maksaminen ja maksutiedot. Osakeyhtiö пользуется общим номером ссылки, toiminimi — номерами по видам налогов. Получатель — Verohallinto.' },
        { q: 'Почему не приходит возврат ALV?', a: 'Отрицательный ALV возвращают не раньше общего срока уплаты месяца, следующего за периодом, и примерно через неделю после обработки. Если какая-то декларация не подана, возврат не выплачивают, а сначала его направляют на просроченные налоги. Возвраты меньше 10 € не выплачиваются.' },
      ],
    },
    en: {
      title: 'Verotili and self-assessed taxes: VAT, payroll and due dates 2026',
      description:
        'What replaced the verotili tax account? Self-assessed taxes in 2026: VAT and employer contributions, due dates, tax periods, references, 9.5% interest, refunds.',
      lead: 'Many entrepreneurs still look for the verotili, the tax account that was abolished at the start of 2017. VAT and employer contributions on wages are self-assessed taxes: the company calculates, reports and pays them itself, without a bill. This guide covers what they include, when to report and pay, how to read your balance in MyTax (OmaVero) and what being late costs in 2026.',
      body: [
        { t: 'h2', x: 'The verotili is gone – everything now runs in MyTax' },
        { t: 'p', x: 'The Tax Account Act (verotililaki 604/2009) was repealed with effect from 1 January 2017. It was replaced by the Act on the Assessment Procedure for Self-Assessed Taxes (768/2016) and the Tax Collection Act (veronkantolaki 769/2016). In the old system, taxes were reported on a periodic tax return (kausiveroilmoitus), and a company could set its own threshold for refunds. Today the Tax Administration (Verohallinto) pays refunds as soon as the return or refund request has been processed, and you can no longer choose the timing or threshold of a refund.' },
        { t: 'p', x: 'If you are looking for the old tax account statement, the closest equivalents are the balance breakdown (saldoerittely) in MyTax, the monthly transaction summary (tapahtumaote) and the summary of your tax payment situation (yhteenveto verojen maksutilanteesta). More on these below.' },
        { t: 'h2', x: 'What are self-assessed taxes?' },
        { t: 'p', x: 'Self-assessed taxes are taxes the Tax Administration does not assess separately: the payer calculates, reports and pays the amount. You get no bill or payment slip for them. For a small business the main ones are:' },
        { t: 'ul', items: [
          'VAT (ALV), reported on the VAT return in MyTax.',
          'Employer contributions (työnantajasuoritukset): tax withheld from wages and the employer’s health insurance contribution, reported to the Incomes Register (tulorekisteri).',
          'Also, for example, excise taxes, tax withheld on dividends and interest, and withholding taxes at source.',
        ] },
        { t: 'p', x: 'Prepaid tax (ennakkovero) is not a self-assessed tax: it is income tax that the Tax Administration imposes. A limited company (osakeyhtiö) still pays it with the same general tax reference number as VAT and employer contributions, so everything shows in one balance. We have a separate guide on prepaid tax.' },
        { t: 'h2', x: 'How VAT and employer contributions are reported' },
        { t: 'ul', items: [
          'VAT: file a VAT return in MyTax for every tax period, even if you had no sales or purchases. You cannot get an extension for filing.',
          'Wages: an earnings payment report to the Incomes Register within 5 days of the payment date. If the fifth day is a Saturday, Sunday or public holiday, you can report on the next working day.',
          'Employer’s health insurance contribution: the employer’s separate report to the Incomes Register once a month, by the 5th day of the month after the month of payment. A company in the employer register also files it for months with no wages (the “no wages paid” option).',
        ] },
        { t: 'p', x: 'Employer contributions have no separate tax return in MyTax: the Tax Administration builds the tax for the period from the Incomes Register data. For all self-assessed taxes, the Tax Administration instructs you to file before you pay.' },
        { t: 'h2', x: 'Due dates: the 12th of the month' },
        { t: 'p', x: 'The general due date for self-assessed taxes is the 12th of the month. If it falls on a Saturday or public holiday, it moves to the next working day. For VAT, the filing deadline and the payment deadline are the same day.' },
        { t: 'ul', items: [
          'VAT, monthly period: the 12th of the second month after the period. For example, September VAT by 12 November.',
          'VAT, quarterly period: 12 May, 12 August, 12 November and 12 February.',
          'VAT, annual period: the last day of February of the following year.',
          'Employer contributions, monthly period: the 12th of the month after the month of payment.',
          'Employer contributions, quarterly period: the 12th of the second month after the quarter. For example, April–June by 12 August.',
        ] },
        { t: 'p', x: 'Example for December 2026: 12 December 2026 is a Saturday, so October VAT (monthly period) and employer contributions on wages paid in November are due on Monday 14 December 2026. The November separate report is due on 5 December, also a Saturday, so it can be filed on Monday 7 December 2026. Annual VAT for 2026 is due on 1 March 2027, because 28 February 2027 is a Sunday.' },
        { t: 'h2', x: 'Tax period: month, quarter or year' },
        { t: 'p', x: 'The tax period is a calendar month by default. You can apply for a longer period if your turnover for the calendar year is small:' },
        { t: 'ul', items: [
          'A quarter, if turnover is at most €100,000. Available for VAT and for the employer contributions of a regular employer.',
          'A calendar year, if turnover is at most €30,000. Available for VAT only.',
        ] },
        { t: 'p', x: 'The VAT period and the employer contribution period are independent of each other. An occasional employer that is not in the employer register cannot get a longer period and always pays employer contributions monthly. The length of the period does not change the Incomes Register deadlines.' },
        { t: 'p', x: 'You change the period in MyTax (Asiakastiedot → Yritystoiminta → Muuta verokausi), with form 4071 or with a change notification to the Business Information System (YTJ). The period must stay the same for at least a year. A longer period starts at the beginning of the calendar year after the application; a new company can have it from the start of its business if it chooses it when registering. If turnover exceeds the limit, notify the Tax Administration without delay. You cannot get a longer period if you have filed late or left taxes unpaid.' },
        { t: 'h2', x: 'Reference numbers and paying' },
        { t: 'p', x: 'The payee is always Verohallinto. You can see the Tax Administration’s bank account numbers and the right reference number in MyTax under Maksutilanne → Verojen maksaminen ja maksutiedot; the account numbers are not published on vero.fi. You can also pay directly in MyTax, where the payment details are filled in and the payment is charged immediately.' },
        { t: 'ul', items: [
          'Limited companies and other entities pay primarily with the general tax reference number (yleinen verojen viitenumero). It is company-specific and works for almost all taxes: VAT, employer contributions, prepaid tax, additional prepayment, residual tax, property tax and other self-assessed taxes. It cannot be used for taxes under a payment arrangement or in enforcement, or for taxes under the One Stop Shop scheme.',
          'A sole trader (toiminimi) has tax-specific reference numbers: one for self-assessed taxes, while prepaid tax is paid with the income tax reference number.',
        ] },
        { t: 'p', x: 'A payment made with the general reference number is applied to a tax only on its due date, oldest due date first. If several self-assessed taxes fall due on the same day, the payment is applied in this order: tax withheld from wages, employer’s health insurance contribution, VAT, excise taxes, others. Use only one method, either the general reference number or the tax-specific ones; otherwise payments may go to a different tax than you intended. A payment shows in the Tax Administration’s records after 1–2 working days.' },
        { t: 'h2', x: 'How to read your balance in MyTax' },
        { t: 'ul', items: [
          'Maksutilanne → Verojen maksaminen ja maksutiedot: taxes falling due and overdue. A self-assessed tax paid in advance still shows among taxes falling due until its due date.',
          'Balance breakdown (saldoerittely): your payment shows immediately on the “Suoritetut maksut ja palautukset” tab. “Veroihin käytettävissä olevat maksut” lists payments not yet applied to taxes.',
          'The transaction summary (tapahtumaote) arrives in MyTax monthly. Taxes, late-payment interest and late-filing penalties have a plus sign; payments, interest on refunds and negative VAT a minus sign. A negative closing balance does not mean unpaid taxes, and the summary is not a payment reminder.',
          'Amount and balance: if you reported €500 of VAT and paid €600, the tax balance is €0 and the payment balance €100. The extra €100 is waiting to be used or refunded.',
          'The summary of your tax payment situation (yhteenveto) is a monthly letter with payment demands, how payments and refunds were used, missing returns and late-filing penalties. Companies get it only electronically in MyTax.',
        ] },
        { t: 'p', x: 'If a payment or return is missing, first check that the return was filed for the right period and the payment had the right reference number. Errors in employer contributions are corrected in the Incomes Register, not in MyTax. Because of interest on refunds, the summary may differ from your books by a few cents.' },
        { t: 'h2', x: 'Refunds: negative VAT and unused payments' },
        { t: 'ul', items: [
          'Negative VAT (more deductible VAT than VAT payable) is refunded without a separate application once the return has been processed, but no earlier than after the general due date of the month following the period. The money arrives about a week after processing.',
          'An unused payment, such as an overpayment, is not returned automatically. Make a refund request in MyTax under saldoerittely → “Veroihin käytettävissä olevat maksut”.',
          'Refunds under €10 are not paid out; they wait for later refunds or are used for taxes.',
          'Refunds earn interest (hyvityskorko), 0.5% in 2026. It is not taxable income.',
          'The Tax Administration first uses a refund for overdue taxes. If any tax return is missing, whatever the tax type, the refund is not paid.',
          'Give your bank account number for refunds in MyTax. Only one account can be valid at a time.',
        ] },
        { t: 'p', x: 'Do not wait for a VAT refund to pay other taxes. If the VAT return stays under review, the refund cannot be used straight away for employer contributions due the same day, and you get a payment demand for the unpaid amount. The Tax Administration advises paying taxes by their due date.' },
        { t: 'h2', x: 'Filing late: the late-filing penalty' },
        { t: 'p', x: 'A late VAT return or other self-assessed tax return filed in MyTax triggers a late-filing penalty (myöhästymismaksu), even if there is no tax to pay or you file a “no activity” return.' },
        { t: 'ul', items: [
          'Up to 45 days late: €3 per day, at most €135. For example, 35 days late: €105.',
          'More than 45 days late: €135 plus 2% of the tax payable reported late. The tax-based part is capped at €15,000 per tax type per period. For example, 50 days late with €5,000 of tax: €135 + €100 = €235.',
          'Corrections: no penalty on a replacement return filed no later than 45 days after the original deadline. A later correction costs 2% of the added tax.',
          'The late-filing penalty is not deductible in income taxation.',
        ] },
        { t: 'p', x: 'If no return arrives at all, the Tax Administration sends a request that includes an estimate of the tax. If you still do not file, the tax is assessed by estimate and a tax increase (veronkorotus) is added. For a special reason, such as a MyTax outage, you can apply in MyTax for the penalty to be waived.' },
        { t: 'p', x: 'Incomes Register reports have their own late-filing penalty under the Act on the Incomes Information System. It is imposed if data on wages paid during a month is reported after the 8th day of the following month: €3 per day for at most 45 days (€135), and after more than 45 days also 1% of the wages reported late, up to €15,135 per calendar month. Earnings payment reports and the separate report count as one whole.' },
        { t: 'h2', x: 'Paying late: 9.5% late-payment interest' },
        { t: 'p', x: 'Tax paid after its due date accrues late-payment interest (viivästyskorko). In 2026 the rate is 9.5% (4.5% for inheritance tax). By law it is the reference rate plus seven percentage points, set annually. Interest runs from the day after the due date until the payment date, by actual days, and has no minimum amount. Late-filing penalties and tax increases also accrue late-payment interest.' },
        { t: 'p', x: 'Example: €5,000 of VAT is paid 30 days late. The interest is 5,000 × 9.5% × 30 / 365 = €39.04. Pay the tax and the interest in one go with the same payment details, as a payment is applied to interest first and only then to tax. In MyTax the interest is already included in the amount.' },
        { t: 'p', x: 'You can apply for the interest to be waived only in exceptional cases, such as sudden serious illness or a wide telecommunications outage. Forgetting, payment difficulties or an accountant’s mistake are not grounds.' },
        { t: 'p', x: 'An unpaid tax gets a payment demand in the summary 1–3 times before it is sent for enforcement (ulosotto). The tax debt register (verovelkarekisteri) shows whether a company has at least €10,000 of tax debt or has neglected self-assessed tax returns in the last 6 months. Company data is public; sole traders’ data is visible only to identified users. Credit companies can check it too.' },
        { t: 'h2', x: 'Payment arrangement if cash runs short' },
        { t: 'p', x: 'If your payment difficulties are temporary, you can apply for a payment arrangement (maksujärjestely) in MyTax (Veroasiat → Maksaminen → Maksujärjestelypyyntö). Debt under an arrangement is not sent for enforcement or published in the tax debt register.' },
        { t: 'ul', items: [
          'Conditions: the difficulties are temporary, earlier arrangements have been paid, all tax returns and Incomes Register earnings payment and separate reports have been filed, and you have no taxes in enforcement.',
          'Up to 2 years, 1–24 monthly instalments, smallest instalment €20. The first due date can be at most 30 days from the request.',
          'It includes taxes already overdue and taxes due within 45 days. For self-assessed taxes, file first and wait until the tax shows as payable in MyTax: VAT shows in 1–2 days, employer contributions can take longer.',
          'Interest is charged for the extra time. The arrangement may lapse if instalments or other taxes are paid late or returns are not filed on time.',
          'Processing takes about a week. Apply on the due date as soon as you know you cannot pay.',
        ] },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'Looking for the old verotili or its statement, when the current data is in the MyTax balance breakdown, transaction summary and summary letter.',
          'Not filing a VAT return for a month with no sales. A return is needed for every period, and the penalty applies then too.',
          'A company in the employer register forgetting the “no wages paid” report for a month without wages.',
          'Mixing the general reference number and tax-specific ones, so the payment goes to the wrong tax – for example, money meant for January prepaid tax is applied to February’s instalment.',
          'Paying before filing, or filing for the wrong period, so the payment stays unused and the tax shows as unpaid.',
          'Waiting for a VAT refund and leaving employer contributions due the same day unpaid.',
          'Staying on a quarterly or annual period after turnover exceeds the limit. The change must be reported without delay.',
          'Mistaking a negative closing balance on the transaction summary for debt.',
        ] },
        { t: 'note', x: 'Figures for 2026: late-payment interest 9.5%, interest on refunds 0.5%, late-filing penalty €3 per day (at most €135). Sources: Tax Administration – paying self-assessed taxes (updated 29 April 2026), late-payment interest, late-filing penalties, refunds (29 April 2026) and payment arrangements (23 April 2026); Act 768/2016. Rates are set annually.' },
        { t: 'h2', x: 'Let us handle your self-assessed taxes' },
        { t: 'p', x: 'Tilitoimisto Debit Credit makes sure your VAT returns and Incomes Register reports go out on time, calculates the taxes for each due date, helps you choose the right tax period and sorts out your MyTax balance if payments were misapplied or a refund does not arrive. If taxes are already late, we go through the corrections and, if needed, a payment arrangement with you. We work in Finnish and Russian. Get in touch and we will go through your company’s tax position.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Vero: self-assessed taxes', href: SRC.selfEn },
          { label: 'Vero: paying self-assessed taxes and due date', href: SRC.payEn },
          { label: 'Vero: when to file and pay VAT', href: SRC.vatFilingEn },
          { label: 'Vero: VAT tax period', href: SRC.vatPeriodEn },
          { label: 'Vero: how to report wages and employer’s contributions', href: SRC.employerEn },
          { label: 'Vero: bank account numbers and reference numbers', href: SRC.refEn },
          { label: 'Vero: monthly transaction summary', href: SRC.statementEn },
          { label: 'Vero: refunds of VAT and other self-assessed taxes', href: SRC.refundEn },
          { label: 'Vero: late-filing penalties', href: SRC.lateEn },
          { label: 'Vero: interest on late payments', href: SRC.interestEn },
          { label: 'Vero: payment arrangements for businesses', href: SRC.arrangementEn },
          { label: 'Incomes Register: late-filing penalty', href: SRC.irPenaltyEn },
          { label: 'Finlex: Act on the Assessment Procedure for Self-Assessed Taxes 768/2016 (in Finnish)', href: SRC.ovml },
          { label: 'Finlex: Act repealing the Tax Account Act 790/2016 (in Finnish)', href: SRC.repeal },
          { label: 'Finlex: Act on tax increases and late-payment interest 1556/1995 (in Finnish)', href: SRC.interestAct },
        ] },
      ],
      faq: [
        { q: 'Does the verotili still exist?', a: 'No. The Tax Account Act was repealed with effect from 1 January 2017. Self-assessed taxes are now reported and paid in MyTax, and you see your payment situation in the balance breakdown, the monthly transaction summary and the summary letter.' },
        { q: 'When are VAT and employer contributions due?', a: 'Usually on the 12th of the month. Monthly VAT is due on the 12th of the second month after the period, and employer contributions on the 12th of the month after the month of payment. If the 12th is a Saturday or public holiday, the due date moves to the next working day.' },
        { q: 'What does being late cost in 2026?', a: 'Tax paid late accrues 9.5% late-payment interest a year. A late return triggers a late-filing penalty of €3 per day, at most €135, plus 2% of the reported tax if the delay exceeds 45 days.' },
        { q: 'Can I get an extension for a VAT return?', a: 'No. There is no extension for self-assessed tax returns. You can apply for a payment arrangement for the payment, but you must file first, and the extra time accrues late-payment interest.' },
        { q: 'Where do I find my reference number?', a: 'In MyTax under Maksutilanne → Verojen maksaminen ja maksutiedot. A limited company uses the general tax reference number, a sole trader tax-specific reference numbers. The payee is Verohallinto.' },
        { q: 'Why hasn’t my VAT refund arrived?', a: 'Negative VAT is refunded no earlier than after the general due date of the month following the period, and about a week after processing. It is not paid if any tax return is missing, and it is first used for overdue taxes. Refunds under €10 are not paid out.' },
      ],
    },
    et: {
      title: 'Verotili ja omaalgatuslikud maksud: ALV, tööandja maksed, tähtajad 2026',
      description:
        'Mis tuli verotili asemele? Omaalgatuslikud maksud 2026: ALV ja tööandja maksed, tähtajad, maksustamisperiood, viitenumber, viivis 9,5 % ja tagastus.',
      lead: 'Paljud ettevõtjad otsivad veel verotili’d – maksukontot, mis kaotati 2017. aasta algusest. Käibemaks (ALV) ja palgalt makstavad tööandja maksed on omaalgatuslikud maksud (oma-aloitteiset verot): ettevõte arvutab, deklareerib ja maksab need ise, ilma arveta. Selgitame, mis nende hulka kuulub, millal deklareerida ja maksta, kuidas lugeda saldot OmaVeros ja mida hilinemine 2026. aastal maksab.',
      body: [
        { t: 'h2', x: 'Verotili kadus – nüüd käib kõik OmaVeros' },
        { t: 'p', x: 'Maksukonto seadus (verotililaki 604/2009) tunnistati kehtetuks alates 1.1.2017. Selle asemel kehtivad omaalgatuslike maksude maksustamismenetluse seadus (laki oma-aloitteisten verojen verotusmenettelystä 768/2016) ja maksude kogumise seadus (veronkantolaki 769/2016). Vanas süsteemis deklareeriti maksud perioodideklaratsiooniga (kausiveroilmoitus) ning ettevõte sai ise määrata tagastuste piirmäära. Praegu maksab Soome maksuamet (Verohallinto) tagastuse kohe, kui deklaratsioon või tagastustaotlus on menetletud, ning tagastuse aega või piiri enam valida ei saa.' },
        { t: 'p', x: 'Kui otsid vana maksukonto väljavõtet, on selle lähimad vasted OmaVero saldo jaotus (saldoerittely), igakuine tehingute väljavõte (tapahtumaote) ja maksete olukorra kokkuvõte (yhteenveto verojen maksutilanteesta). Neist allpool.' },
        { t: 'h2', x: 'Mis on omaalgatuslikud maksud?' },
        { t: 'p', x: 'Need on maksud, mida maksuamet eraldi ei määra: maksja arvutab summa ise, deklareerib ja maksab selle. Arvet ega maksekorraldust nende kohta ei tule. Väikeettevõtte jaoks on olulisemad:' },
        { t: 'ul', items: [
          'Käibemaks (ALV), mis deklareeritakse käibedeklaratsiooniga OmaVeros.',
          'Tööandja maksed (työnantajasuoritukset): palgast kinni peetud maks (ennakonpidätys) ja tööandja ravikindlustusmakse (työnantajan sairausvakuutusmaksu), mis deklareeritakse tulude registrisse Tulorekisteri.',
          'Lisaks näiteks aktsiisid, dividendidelt ja intressidelt kinni peetud maks ning kinnipeetav tulumaks (lähdevero).',
        ] },
        { t: 'p', x: 'Ettemaks (ennakkovero) ei ole omaalgatuslik maks, vaid tulumaks, mille määrab maksuamet. Osaühing (osakeyhtiö) maksab selle siiski sama üldise viitenumbriga nagu ALV ja tööandja maksed, nii et kõik on näha ühes saldos. Ettemaksust on meil eraldi juhend.' },
        { t: 'h2', x: 'Kuidas ALV ja tööandja maksed deklareeritakse' },
        { t: 'ul', items: [
          'ALV: esita käibedeklaratsioon OmaVeros iga maksustamisperioodi kohta, ka siis, kui müüki ega oste ei olnud. Esitamise tähtaega pikendada ei saa.',
          'Palgad: palgateade (palkkatietoilmoitus) Tulorekisterisse 5 päeva jooksul pärast maksepäeva. Kui viies päev on laupäev, pühapäev või muu püha, võib andmed esitada järgmisel tööpäeval.',
          'Tööandja ravikindlustusmakse: tööandja eraldi teade (työnantajan erillisilmoitus) Tulorekisterisse kord kuus, hiljemalt palga maksmise kuule järgneva kuu 5. kuupäevaks. Tööandjate registrisse (työnantajarekisteri) kuuluv ettevõte esitab selle ka kuude kohta, mil palka ei makstud (märge „Ei palkanmaksua“).',
        ] },
        { t: 'p', x: 'Tööandja maksete kohta OmaVerosse eraldi deklaratsiooni ei esitata: maksuamet moodustab perioodi maksu Tulorekisteri andmetest. Kõigi omaalgatuslike maksude puhul soovitab maksuamet esitada deklaratsiooni enne maksmist.' },
        { t: 'h2', x: 'Tähtajad: kuu 12. kuupäev' },
        { t: 'p', x: 'Omaalgatuslike maksude üldine maksetähtaeg on kuu 12. kuupäev. Kui see on laupäev või püha, nihkub tähtaeg järgmisele tööpäevale. ALV puhul on deklaratsiooni ja makse tähtaeg sama.' },
        { t: 'ul', items: [
          'ALV, kuuperiood: perioodi lõpule järgneva teise kuu 12. kuupäev. Näiteks septembri ALV hiljemalt 12.11.',
          'ALV, kvartaliperiood: 12.5, 12.8, 12.11 ja 12.2.',
          'ALV, aastaperiood: järgmise aasta veebruari viimane päev.',
          'Tööandja maksed, kuuperiood: palga maksmise kuule järgneva kuu 12. kuupäev.',
          'Tööandja maksed, kvartaliperiood: kvartalile järgneva teise kuu 12. kuupäev. Näiteks aprill–juuni hiljemalt 12.8.',
        ] },
        { t: 'p', x: 'Näide 2026. aasta detsembrist: 12.12.2026 on laupäev, seega oktoobri ALV (kuuperiood) ja novembris makstud palkade tööandja maksed tuleb tasuda hiljemalt esmaspäeval 14.12.2026. Novembri eraldi teate tähtaeg 5.12 on samuti laupäev, nii et selle saab esitada esmaspäeval 7.12.2026. Aastaperioodi ALV 2026. aasta eest tuleb tasuda 1.3.2027, sest 28.2.2027 on pühapäev.' },
        { t: 'h2', x: 'Maksustamisperiood: kuu, kvartal või aasta' },
        { t: 'p', x: 'Maksustamisperiood (verokausi) on vaikimisi kalendrikuu. Pikemat perioodi saab taotleda, kui kalendriaasta käive on väike:' },
        { t: 'ul', items: [
          'Kvartal, kui käive on kuni 100 000 €. Võimalik ALV puhul ja regulaarselt palka maksva tööandja maksete puhul.',
          'Kalendriaasta, kui käive on kuni 30 000 €. Võimalik ainult ALV puhul.',
        ] },
        { t: 'p', x: 'ALV ja tööandja maksete perioodid ei sõltu teineteisest. Juhuslik tööandja (satunnainen työnantaja), kes ei kuulu tööandjate registrisse, ei saa pikemat perioodi ja maksab tööandja makseid alati igakuiselt. Perioodi pikkus ei muuda Tulorekisteri tähtaegu.' },
        { t: 'p', x: 'Perioodi muudetakse OmaVeros (Asiakastiedot → Yritystoiminta → Muuta verokausi), vormiga 4071 või YTJ muudatusteatega. Periood peab püsima sama vähemalt aasta. Pikem periood algab taotlusele järgneva kalendriaasta algusest; uus ettevõte võib selle valida tegevuse algusest, kui teatab sellest registreerimisel. Kui käivepiir ületatakse, teata sellest maksuametile viivitamata. Pikemat perioodi ei anta, kui deklaratsioone on esitatud hilinemisega või makse on jäänud tasumata.' },
        { t: 'h2', x: 'Viitenumber ja maksmine' },
        { t: 'p', x: 'Makse saaja on alati Verohallinto. Maksuameti pangakontod ja õige viitenumbri leiad OmaVerost: Maksutilanne → Verojen maksaminen ja maksutiedot; kontonumbreid vero.fi-s ei avaldata. Võid maksta ka otse OmaVeros – andmed on eeltäidetud ja makse võetakse kohe.' },
        { t: 'ul', items: [
          'Osaühing ja teised juriidilised isikud maksavad eelkõige üldise maksude viitenumbriga (yleinen verojen viitenumero). See on ettevõttepõhine ja sobib peaaegu kõigile maksudele: ALV, tööandja maksed, ettemaks, lisaettemaks, juurdemaks, kinnisvaramaks ja muud omaalgatuslikud maksud. Sellega ei saa maksta maksegraafikus (maksujärjestely) ega täitemenetluses (ulosotto) olevaid makse ega OSS-erikorra makse.',
          'FIE (toiminimi) viitenumbrid on maksuliigipõhised: omaalgatuslike maksude jaoks on oma number ja ettemaks makstakse tulumaksu viitenumbriga.',
        ] },
        { t: 'p', x: 'Üldise viitenumbriga tehtud makse kasutatakse maksu tasumiseks alles selle tähtpäeval, alustades vanimast. Kui samal päeval saabub mitme omaalgatusliku maksu tähtaeg, jaotatakse makse selles järjekorras: palgast kinni peetud maks, tööandja ravikindlustusmakse, ALV, aktsiisid, muud. Kasuta ainult ühte viisi – kas üldist viitenumbrit või maksuliikide viitenumbreid, muidu võib raha minna teise maksu katteks, kui kavatsesid. Makse ilmub maksuameti andmetesse 1–2 tööpäeva jooksul.' },
        { t: 'h2', x: 'Kuidas lugeda saldot OmaVeros' },
        { t: 'ul', items: [
          'Maksutilanne → Verojen maksaminen ja maksutiedot: tasumisele tulevad ja tähtaja ületanud maksud. Ette makstud omaalgatuslik maks on tasumisele tulevate maksude all näha kuni tähtpäevani.',
          'Saldo jaotus (saldoerittely): vahekaardil „Suoritetut maksut ja palautukset“ on makse näha kohe. Jaotises „Veroihin käytettävissä olevat maksut“ on maksed, mida pole veel maksude katteks kasutatud.',
          'Tehingute väljavõte (tapahtumaote) tuleb OmaVerosse kord kuus. Maksud, viivised ja hilinemistasud on plussmärgiga; maksed, tagastuse intress ja negatiivne ALV miinusmärgiga. Negatiivne lõppsaldo ei tähenda maksuvõlga ja väljavõte ei ole maksemeeldetuletus.',
          'Summa ja saldo: kui deklareerisid ALV-d 500 € ja maksid 600 €, on maksu saldo 0 € ja makse saldo 100 € – need 100 € ootavad kasutamist või tagastamist.',
          'Maksete olukorra kokkuvõte (yhteenveto) on igakuine kiri, kus on maksenõuded, maksete ja tagastuste kasutamine, puuduvad deklaratsioonid ja hilinemistasud. Ettevõtted saavad selle ainult elektrooniliselt OmaVerosse.',
        ] },
        { t: 'p', x: 'Kui makse või deklaratsioon on puudu, kontrolli kõigepealt, kas deklaratsioon on esitatud õige perioodi kohta ja maksel on õige viitenumber. Tööandja maksete vead parandatakse Tulorekisteris, mitte OmaVeros. Tagastuse intressi tõttu võib kokkuvõte erineda raamatupidamisest mõne sendi võrra.' },
        { t: 'h2', x: 'Tagastus: negatiivne ALV ja kasutamata makse' },
        { t: 'ul', items: [
          'Negatiivne ALV (mahaarvatavat käibemaksu on rohkem kui tasumisele kuuluvat) tagastatakse ilma eraldi taotluseta pärast deklaratsiooni menetlemist, kuid mitte enne perioodile järgneva kuu üldist tähtpäeva. Raha laekub umbes nädal pärast menetlemist.',
          'Kasutamata makse, näiteks ülemakse, ise tagasi ei tule: esita tagastustaotlus OmaVeros saldo jaotuse kaudu („Veroihin käytettävissä olevat maksut“).',
          'Alla 10 € tagastusi välja ei maksta: need ootavad järgmisi tagastusi või kasutatakse maksude katteks.',
          'Tagastusele makstakse intressi (hyvityskorko), 2026. aastal 0,5 %. See ei ole maksustatav tulu.',
          'Maksuamet kasutab tagastuse esmalt tähtaja ületanud maksude katteks. Kui mõni deklaratsioon on esitamata, ükskõik millise maksu kohta, tagastust ei maksta.',
          'Teata tagastuste jaoks pangakonto OmaVeros; korraga saab kehtida üks konto.',
        ] },
        { t: 'p', x: 'Ära oota ALV tagastust, et teisi makse tasuda. Kui ALV deklaratsioon jääb menetlusse, ei saa tagastust kohe kasutada samal päeval tasumisele kuuluvate tööandja maksete katteks ja tasumata summa kohta tuleb maksenõue. Maksuamet soovitab maksud tasuda hiljemalt tähtpäeval.' },
        { t: 'h2', x: 'Hilinenud deklaratsioon: hilinemistasu' },
        { t: 'p', x: 'Hilinemisega esitatud ALV deklaratsiooni või muu OmaVerosse esitatava omaalgatusliku maksu deklaratsiooni eest määratakse hilinemistasu (myöhästymismaksu) – ka siis, kui tasumisele kuuluvat maksu ei ole või esitad deklaratsiooni „tegevuseta“ (ei toimintaa).' },
        { t: 'ul', items: [
          'Kuni 45 päeva hilinemist: 3 € päevas, kokku kuni 135 €. Näiteks 35 päeva: 105 €.',
          'Üle 45 päeva: 135 € pluss 2 % hilinenult deklareeritud tasumisele kuuluvast maksust. Maksusummal põhinev osa on kuni 15 000 € maksuliigi kohta perioodis. Näiteks 50 päeva ja maks 5 000 €: 135 + 100 = 235 €.',
          'Parandamine: asendusdeklaratsiooni eest tasu ei määrata, kui see esitatakse hiljemalt 45 päeva pärast algset tähtaega. Hilisema paranduse eest on tasu 2 % lisandunud maksust.',
          'Hilinemistasu ei ole tulumaksus mahaarvatav kulu.',
        ] },
        { t: 'p', x: 'Kui deklaratsiooni ei tule üldse, saadab maksuamet nõude, milles on maksu hinnang. Kui ka pärast seda deklaratsiooni ei esitata, määratakse maks hinnangu alusel ja lisaks maksutõstmine (veronkorotus). Erilisel põhjusel, näiteks OmaVero tõrke tõttu, võib OmaVeros taotleda hilinemistasu sissenõudmata jätmist.' },
        { t: 'p', x: 'Tulorekisteri teadetele kehtib tuluandmesüsteemi seaduse (tulotietojärjestelmälaki) järgi oma hilinemistasu. See määratakse, kui kuu jooksul makstud palkade andmed esitatakse hiljem kui maksepäevale järgneva kuu 8. kuupäeval: 3 € päevas kuni 45 päeva eest (135 €) ja üle 45 päeva hilinemisel lisaks 1 % hilinenult teatatud palgast, kokku kuni 15 135 € kalendrikuu kohta. Palgateateid ja eraldi teadet käsitletakse ühe tervikuna.' },
        { t: 'h2', x: 'Hilinenud makse: viivis 9,5 %' },
        { t: 'p', x: 'Pärast tähtpäeva tasutud maksult arvestatakse viivist (viivästyskorko). 2026. aastal on see 9,5 % (pärandimaksul 4,5 %). Seaduse järgi on viivis viiteintress pluss seitse protsendipunkti ja see kinnitatakse igal aastal. Viivist arvestatakse tähtpäevale järgnevast päevast kuni maksepäevani tegelike päevade järgi ja sellel pole miinimumsummat. Viivist arvestatakse ka hilinemistasult ja maksutõstmiselt.' },
        { t: 'p', x: 'Näide: 5 000 € ALV makstakse 30 päeva hiljem. Viivis on 5 000 × 9,5 % × 30 / 365 = 39,04 €. Maksa maks ja viivis korraga samade andmetega, sest makse kasutatakse esmalt viivise ja alles siis maksu katteks. OmaVeros on viivis summale juba lisatud.' },
        { t: 'p', x: 'Viivise sissenõudmata jätmist saab taotleda ainult erandjuhtudel, näiteks äkilise raske haigestumise või ulatusliku sidetõrke korral. Unustamine, makseraskused või raamatupidaja viga ei ole alus.' },
        { t: 'p', x: 'Tasumata maksu kohta tuleb kokkuvõttes maksenõue 1–3 korda, enne kui maks saadetakse täitemenetlusse (ulosotto). Maksuvõlgade registrist (verovelkarekisteri) on näha, kas ettevõttel on vähemalt 10 000 € maksuvõlga või omaalgatuslike maksude deklaratsioone viimase 6 kuu jooksul esitamata. Ettevõtete andmed on avalikud, FIE andmed näevad ainult tuvastatud kasutajad. Andmeid võivad vaadata ka krediidiettevõtted.' },
        { t: 'h2', x: 'Maksegraafik, kui raha ei jätku' },
        { t: 'p', x: 'Ajutiste makseraskuste korral saad OmaVeros taotleda maksegraafikut (maksujärjestely): Veroasiat → Maksaminen → Maksujärjestelypyyntö. Graafikus olevat võlga ei saadeta täitemenetlusse ega avaldata maksuvõlgade registris.' },
        { t: 'ul', items: [
          'Tingimused: raskused on ajutised, varasemad graafikud on tasutud, kõik deklaratsioonid ning Tulorekisteri palgateated ja eraldi teated on esitatud ja täitemenetluses makse ei ole.',
          'Kestus kuni 2 aastat, 1–24 kuumakset, väikseim makse 20 €. Esimene tähtpäev võib olla kuni 30 päeva pärast taotlust.',
          'Graafikusse lähevad juba tähtaja ületanud maksud ja 45 päeva jooksul tasumisele kuuluvad maksud. Omaalgatuslike maksude puhul esita kõigepealt deklaratsioon ja oota, kuni maks on OmaVeros tasumisele kuuluvana näha: ALV 1–2 päeva pärast, tööandja maksed võivad ilmuda aeglasemalt.',
          'Lisaaja eest arvestatakse viivist. Graafik võib katkeda, kui maksed või muud maksud hilinevad või deklaratsioone ei esitata õigel ajal.',
          'Menetlus kestab umbes nädala. Taotle graafikut kohe tähtpäeval, kui tead, et ei suuda maksta.',
        ] },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Otsitakse vana verotili’d või selle väljavõtet, kuigi ajakohased andmed on OmaVero saldo jaotuses, tehingute väljavõttes ja kokkuvõttes.',
          'Jäetakse esitamata ALV deklaratsioon kuu kohta, mil müüki ei olnud. Deklaratsioon on vaja iga perioodi kohta ja hilinemistasu tuleb ka siis.',
          'Tööandjate registrisse kuuluv ettevõte unustab märke „Ei palkanmaksua“ kuu kohta, mil palka ei makstud.',
          'Üldist viitenumbrit ja maksuliikide viitenumbreid kasutatakse segamini ja raha läheb vale maksu katteks – näiteks jaanuari ettemaksuks mõeldud makse kantakse veebruari osamakseks.',
          'Makstakse enne deklaratsiooni või deklareeritakse vale perioodi kohta, nii et makse jääb kasutamata ja maks paistab tasumata.',
          'Oodatakse ALV tagastust ja jäetakse samal päeval tasumisele kuuluvad tööandja maksed maksmata.',
          'Jäädakse kvartali- või aastaperioodile, kuigi käive ületab piiri. Muudatusest tuleb teatada viivitamata.',
          'Tehingute väljavõtte negatiivset lõppsaldot peetakse võlaks.',
        ] },
        { t: 'note', x: '2026. aasta arvud: viivis 9,5 %, tagastuse intress 0,5 %, hilinemistasu 3 € päevas (kuni 135 €). Allikad: Soome maksuamet – omaalgatuslike maksude maksmine (uuendatud 29.4.2026), viivis, hilinemistasu, tagastused (29.4.2026) ja maksegraafik (23.4.2026); seadus 768/2016. Määrad kinnitatakse igal aastal.' },
        { t: 'h2', x: 'Hoolitseme omaalgatuslike maksude eest sinu eest' },
        { t: 'p', x: 'Tilitoimisto Debit Credit hoolitseb selle eest, et ALV deklaratsioonid ning Tulorekisteri palga- ja eraldi teated läheksid tähtajaks, arvutab maksud iga tähtpäeva jaoks, aitab valida sobiva maksustamisperioodi ja selgitab OmaVero saldo, kui maksed on läinud valesti või tagastus ei tule. Kui maksud on juba hilinenud, vaatame koos üle parandused ja vajaduse korral maksegraafiku. Teenindame soome ja vene keeles. Võta ühendust ja vaatame sinu ettevõtte maksuolukorra üle.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Vero: omaalgatuslikud maksud (inglise keeles)', href: SRC.selfEn },
          { label: 'Vero: omaalgatuslike maksude maksmine ja tähtpäev (inglise keeles)', href: SRC.payEn },
          { label: 'Vero: ALV deklareerimise ja maksmise tähtajad (inglise keeles)', href: SRC.vatFilingEn },
          { label: 'Vero: ALV maksustamisperiood (inglise keeles)', href: SRC.vatPeriodEn },
          { label: 'Vero: palkade ja tööandja maksete deklareerimine (inglise keeles)', href: SRC.employerEn },
          { label: 'Vero: pangakontod ja viitenumbrid (inglise keeles)', href: SRC.refEn },
          { label: 'Vero: igakuine tehingute väljavõte (inglise keeles)', href: SRC.statementEn },
          { label: 'Vero: ALV ja muude maksude tagastus (inglise keeles)', href: SRC.refundEn },
          { label: 'Vero: hilinemistasu (inglise keeles)', href: SRC.lateEn },
          { label: 'Vero: viivis hilinenud maksetelt (inglise keeles)', href: SRC.interestEn },
          { label: 'Vero: maksegraafik ettevõtetele (inglise keeles)', href: SRC.arrangementEn },
          { label: 'Tulorekisteri: hilinemistasu (inglise keeles)', href: SRC.irPenaltyEn },
          { label: 'Finlex: omaalgatuslike maksude menetluse seadus 768/2016 (soome keeles)', href: SRC.ovml },
          { label: 'Finlex: maksukonto seaduse kehtetuks tunnistamine 790/2016 (soome keeles)', href: SRC.repeal },
          { label: 'Finlex: viivise seadus 1556/1995 (soome keeles)', href: SRC.interestAct },
        ] },
      ],
      faq: [
        { q: 'Kas verotili on veel kasutusel?', a: 'Ei. Maksukonto seadus tunnistati kehtetuks alates 1.1.2017. Omaalgatuslikud maksud deklareeritakse ja makstakse nüüd OmaVeros ning maksete olukorda näed saldo jaotusest, igakuisest tehingute väljavõttest ja kokkuvõttest.' },
        { q: 'Millal tuleb ALV ja tööandja maksed tasuda?', a: 'Tavaliselt kuu 12. kuupäeval. Kuuperioodi ALV tuleb tasuda perioodile järgneva teise kuu 12. kuupäevaks ja tööandja maksed palga maksmise kuule järgneva kuu 12. kuupäevaks. Kui 12. on laupäev või püha, nihkub tähtaeg järgmisele tööpäevale.' },
        { q: 'Mis maksab hilinemine 2026. aastal?', a: 'Hilinenult tasutud maksult arvestatakse viivist 9,5 % aastas. Hilinenud deklaratsiooni eest on hilinemistasu 3 € päevas, kokku kuni 135 €, ja üle 45 päeva hilinemisel lisaks 2 % deklareeritud maksust.' },
        { q: 'Kas ALV deklaratsiooni tähtaega saab pikendada?', a: 'Ei. Omaalgatuslike maksude deklaratsiooni tähtaega pikendada ei saa. Maksmiseks võib taotleda maksegraafikut, kuid kõigepealt tuleb deklaratsioon esitada ja lisaaja eest arvestatakse viivist.' },
        { q: 'Kust leian viitenumbri?', a: 'OmaVerost: Maksutilanne → Verojen maksaminen ja maksutiedot. Osaühing kasutab üldist maksude viitenumbrit, FIE maksuliigipõhiseid viitenumbreid. Makse saaja on Verohallinto.' },
        { q: 'Miks ALV tagastus ei tule?', a: 'Negatiivne ALV tagastatakse kõige varem pärast perioodile järgneva kuu üldist tähtpäeva ja umbes nädal pärast menetlemist. Tagastust ei maksta, kui mõni deklaratsioon on esitamata, ja see kasutatakse esmalt tähtaja ületanud maksude katteks. Alla 10 € tagastusi välja ei maksta.' },
      ],
    },
    uk: {
      title: 'Verotili і податки на самодекларації: ALV, внески роботодавця, строки 2026',
      description:
        'Що прийшло на зміну verotili? Податки на самодекларації 2026: ALV і внески роботодавця, строки, податковий період, viitenumero, пеня 9,5 % і повернення.',
      lead: 'Багато підприємців досі шукають verotili — податковий рахунок, якого немає з 2017 року. ПДВ (ALV) і внески роботодавця із зарплати — це податки на самодекларації (oma-aloitteiset verot): компанія сама рахує, декларує і сплачує їх без жодного рахунку від податкової. Пояснюємо, що до них належить, коли звітувати й платити, як читати сальдо в OmaVero і скільки коштує запізнення у 2026 році.',
      body: [
        { t: 'h2', x: 'Verotili скасовано — тепер усе в OmaVero' },
        { t: 'p', x: 'Закон про податковий рахунок (verotililaki 604/2009) скасовано з 1.1.2017. Натомість діють закон про порядок оподаткування податків на самодекларації (laki oma-aloitteisten verojen verotusmenettelystä 768/2016) і закон про стягнення податків (veronkantolaki 769/2016). У старій системі податки подавали періодичною декларацією (kausiveroilmoitus), а компанія могла сама встановити поріг для повернень. Тепер податкова (Verohallinto) повертає гроші одразу після обробки декларації чи заяви, і обрати строк або поріг повернення вже не можна.' },
        { t: 'p', x: 'Якщо ви шукаєте стару виписку з verotili, її найближчі замінники — розбивка сальдо (saldoerittely) в OmaVero, щомісячна виписка операцій (tapahtumaote) і зведення про стан платежів (yhteenveto verojen maksutilanteesta). Про них нижче.' },
        { t: 'h2', x: 'Що таке податки на самодекларації' },
        { t: 'p', x: 'Це податки, які податкова окремо не призначає: платник сам розраховує суму, декларує і сплачує її. Рахунку чи платіжної квитанції за ними не надходить. Для малого бізнесу головні з них:' },
        { t: 'ul', items: [
          'ПДВ (ALV) — подається декларацією з ALV (arvonlisäveroilmoitus) в OmaVero.',
          'Внески роботодавця (työnantajasuoritukset): утриманий із зарплати податок (ennakonpidätys) і внесок роботодавця на медичне страхування (työnantajan sairausvakuutusmaksu) — подаються до реєстру доходів Tulorekisteri.',
          'А також, наприклад, акцизи, податок, утриманий з дивідендів і відсотків, і податок у джерела (lähdevero).',
        ] },
        { t: 'p', x: 'Авансовий податок (ennakkovero) не належить до податків на самодекларації: це податок на доходи, який призначає податкова. Але osakeyhtiö сплачує його за тим самим загальним номером посилання, що й ALV і внески роботодавця, тож усе видно в одному сальдо. Про ennakkovero у нас є окремий гід.' },
        { t: 'h2', x: 'Як декларуються ALV і внески роботодавця' },
        { t: 'ul', items: [
          'ALV: декларація в OmaVero за кожен податковий період, навіть якщо продажів і закупівель не було. Продовжити строк подання не можна.',
          'Зарплати: звіт про зарплату (palkkatietoilmoitus) до Tulorekisteri протягом 5 днів після дня виплати. Якщо п’ятий день припадає на суботу, неділю чи свято, можна подати наступного робочого дня.',
          'Внесок роботодавця на медстрахування: окремий звіт роботодавця (työnantajan erillisilmoitus) раз на місяць, не пізніше 5-го числа місяця після місяця виплати зарплати. Компанія з реєстру роботодавців (työnantajarekisteri) подає його й за місяці без виплат (позначка «Ei palkanmaksua»).',
        ] },
        { t: 'p', x: 'Окремої декларації щодо внесків роботодавця в OmaVero немає: податкова сама формує податок за період з даних Tulorekisteri. Щодо всіх податків на самодекларації податкова радить спершу подати декларацію і лише потім платити.' },
        { t: 'h2', x: 'Строки: 12-те число місяця' },
        { t: 'p', x: 'Загальний строк сплати податків на самодекларації — 12-те число місяця. Якщо це субота чи свято, строк переноситься на наступний робочий день. Для ALV строк подання декларації і строк оплати збігаються.' },
        { t: 'ul', items: [
          'ALV, місячний період: 12-те число другого місяця після періоду. Наприклад, ALV за вересень — до 12.11.',
          'ALV, квартальний період: 12.5, 12.8, 12.11 і 12.2.',
          'ALV, річний період: останній день лютого наступного року.',
          'Внески роботодавця, місячний період: 12-те число місяця після місяця виплати зарплати.',
          'Внески роботодавця, квартальний період: 12-те число другого місяця після кварталу. Наприклад, за квітень–червень — до 12.8.',
        ] },
        { t: 'p', x: 'Приклад на грудень 2026 року: 12.12.2026 — субота, тому ALV за жовтень (місячний період) і внески із зарплат, виплачених у листопаді, треба сплатити до понеділка 14.12.2026. Строк окремого звіту за листопад, 5.12, теж припадає на суботу, його можна подати в понеділок 7.12.2026. Річний ALV за 2026 рік — до 1.3.2027, бо 28.2.2027 — неділя.' },
        { t: 'h2', x: 'Податковий період: місяць, квартал чи рік' },
        { t: 'p', x: 'За замовчуванням податковий період (verokausi) — календарний місяць. Довший період можна отримати за невеликого обороту за календарний рік:' },
        { t: 'ul', items: [
          'Квартал — за обороту не більше 100 000 €. Можливий для ALV і для внесків роботодавця, який платить зарплату регулярно.',
          'Календарний рік — за обороту не більше 30 000 €. Лише для ALV.',
        ] },
        { t: 'p', x: 'Періоди для ALV і для внесків роботодавця не залежать один від одного. Нерегулярний роботодавець (satunnainen työnantaja), не внесений до реєстру роботодавців, не може отримати довший період і платить внески щомісяця. Довжина періоду не змінює строки подання до Tulorekisteri.' },
        { t: 'p', x: 'Період змінюють в OmaVero (Asiakastiedot → Yritystoiminta → Muuta verokausi), формою 4071 або повідомленням про зміни в YTJ. Період має залишатися незмінним щонайменше рік. Довший період починається з початку календарного року після заяви; нова компанія може обрати його від початку діяльності, якщо вкаже це під час реєстрації. Якщо оборот перевищив ліміт, повідомте податкову без зволікань. Довший період не дадуть, якщо декларації подавалися із запізненням або є несплачені податки.' },
        { t: 'h2', x: 'Номер посилання (viitenumero) і оплата' },
        { t: 'p', x: 'Отримувач платежу завжди Verohallinto. Номери рахунків податкової і правильний номер посилання дивіться в OmaVero: Maksutilanne → Verojen maksaminen ja maksutiedot. На сайті vero.fi номери рахунків не публікують. Можна заплатити й одразу в OmaVero: реквізити вже заповнені, гроші списуються негайно.' },
        { t: 'ul', items: [
          'Osakeyhtiö та інші юрособи платять насамперед за загальним номером посилання (yleinen verojen viitenumero). Він свій у кожної компанії й підходить майже для всіх податків: ALV, внески роботодавця, ennakkovero, lisäennakko, jäännösvero, податок на нерухомість та інші податки на самодекларації. За ним не можна платити податки в розстрочці (maksujärjestely) чи у виконавчому провадженні (ulosotto), а також податки за спецрежимом OSS.',
          'У toiminimi (фізичної особи-підприємця) номери посилання за видами податків: для податків на самодекларації — свій номер, а ennakkovero сплачується за номером податку на доходи.',
        ] },
        { t: 'p', x: 'Платіж за загальним номером посилання йде на податок лише в день його строку, починаючи з найстарішого. Якщо в один день настає строк кількох податків на самодекларації, гроші розподіляються так: утриманий із зарплати податок, внесок роботодавця на медстрахування, ALV, акцизи, решта. Користуйтеся одним способом — або загальним номером, або номерами за видами податків, інакше платіж може піти не на той податок. У даних податкової платіж з’являється через 1–2 робочі дні.' },
        { t: 'h2', x: 'Як читати сальдо в OmaVero' },
        { t: 'ul', items: [
          'Maksutilanne → Verojen maksaminen ja maksutiedot: податки до сплати і прострочені. Податок, сплачений заздалегідь, усе одно показується серед «майбутніх» до дня строку.',
          'Saldoerittely: на вкладці «Suoritetut maksut ja palautukset» платіж видно одразу. У розділі «Veroihin käytettävissä olevat maksut» — гроші, які ще не пішли на податки.',
          'Tapahtumaote надходить в OmaVero раз на місяць. Податки, пеня і плата за запізнення в ній зі знаком плюс; платежі, відсотки на повернення (hyvityskorko) і від’ємний ALV — зі знаком мінус. Від’ємний підсумок не означає боргу, і виписка — не нагадування про оплату.',
          'Сума і залишок: якщо ви задекларували ALV 500 € і заплатили 600 €, залишок за податком 0 €, а залишок платежу 100 € — ці 100 € чекають на зарахування або повернення.',
          'Yhteenveto verojen maksutilanteesta — щомісячний лист: вимоги про оплату, на що пішли платежі й повернення, відсутні декларації, плата за запізнення. Компанії отримують його лише в електронному вигляді в OmaVero.',
        ] },
        { t: 'p', x: 'Якщо платежу чи декларації не видно, спершу перевірте, що декларацію подано за правильний період, а в платежі правильний номер посилання. Помилки щодо внесків роботодавця виправляють у Tulorekisteri, а не в OmaVero. Через відсотки на повернення зведення може відрізнятися від бухгалтерії на кілька центів.' },
        { t: 'h2', x: 'Повернення: від’ємний ALV і зайвий платіж' },
        { t: 'ul', items: [
          'Від’ємний ALV (податку до вирахування більше, ніж до сплати) повертається без окремої заяви після обробки декларації, але не раніше загального строку сплати місяця, що настає після періоду. Гроші надходять приблизно через тиждень після обробки.',
          'Невикористаний платіж, наприклад переплата, сам не повертається: подайте заяву в OmaVero в розділі saldoerittely → «Veroihin käytettävissä olevat maksut».',
          'Повернення менше 10 € не виплачуються: вони чекають наступних повернень або йдуть на податки.',
          'На повернення нараховується hyvityskorko — у 2026 році 0,5 %. Він не оподатковується.',
          'Податкова спершу спрямовує повернення на прострочені податки. Якщо не подано будь-яку декларацію, з будь-якого податку, повернення не виплачується.',
          'Для повернень вкажіть номер рахунку в OmaVero; діяти може лише один рахунок.',
        ] },
        { t: 'p', x: 'Не чекайте повернення ALV, щоб сплатити інші податки. Якщо декларація з ALV застрягла на перевірці, повернення не можна одразу зарахувати у внески роботодавця з тим самим строком, і на несплачену суму надійде вимога. Податкова радить платити податки не пізніше строку.' },
        { t: 'h2', x: 'Запізнення з декларацією: myöhästymismaksu' },
        { t: 'p', x: 'За декларацію з ALV чи іншого податку на самодекларації, подану в OmaVero із запізненням, призначається плата за прострочення (myöhästymismaksu) — навіть якщо податку до сплати немає або подано декларацію «без діяльності» (ei toimintaa).' },
        { t: 'ul', items: [
          'До 45 днів: 3 € на день, максимум 135 €. Наприклад, 35 днів запізнення — 105 €.',
          'Понад 45 днів: 135 € плюс 2 % від задекларованого із запізненням податку до сплати. Відсоткова частина — не більше 15 000 € за видом податку за період. Наприклад, 50 днів і податок 5 000 €: 135 + 100 = 235 €.',
          'Виправлення: за замінну декларацію плати немає, якщо її подано не пізніше 45 днів після початкового строку. За пізніше виправлення — 2 % від донарахованого податку.',
          'Myöhästymismaksu не зменшує оподатковуваний прибуток.',
        ] },
        { t: 'p', x: 'Якщо декларації немає взагалі, податкова надсилає вимогу з оцінкою податку. Якщо й після цього декларацію не подати, податок нараховують за оцінкою і додають податкову надбавку (veronkorotus). За особливої причини, наприклад збою OmaVero, можна попросити не стягувати плату за прострочення — заява подається в OmaVero.' },
        { t: 'p', x: 'Для звітів до Tulorekisteri своя плата за прострочення за законом про систему даних про доходи (tulotietojärjestelmälaki). Її призначають, якщо дані про зарплату, виплачену протягом місяця, подано пізніше 8-го числа наступного місяця: 3 € на день максимум за 45 днів (135 €), а за запізнення понад 45 днів ще 1 % від суми зарплати, поданої із запізненням, — загалом не більше 15 135 € за календарний місяць. Звіти про зарплату й окремий звіт роботодавця вважаються одним комплектом.' },
        { t: 'h2', x: 'Запізнення з оплатою: пеня (viivästyskorko) 9,5 %' },
        { t: 'p', x: 'На податок, сплачений після строку, нараховується пеня (viivästyskorko). У 2026 році це 9,5 % річних (для податку на спадщину — 4,5 %). За законом ставка дорівнює референтній ставці плюс сім процентних пунктів і встановлюється щороку. Пеню рахують від дня після строку до дня оплати включно за фактичною кількістю днів, мінімальної суми немає. Пеня нараховується й на myöhästymismaksu, і на податкову надбавку.' },
        { t: 'p', x: 'Приклад: ALV 5 000 € сплачено на 30 днів пізніше. Пеня: 5 000 × 9,5 % × 30 / 365 = 39,04 €. Сплачуйте податок і пеню одним платежем з тими самими реквізитами: гроші спершу йдуть на пеню, потім на податок. В OmaVero пеню вже включено в суму.' },
        { t: 'p', x: 'Звільнити від пені можуть лише у виняткових випадках, наприклад за раптової тяжкої хвороби чи масштабного збою зв’язку. Забудькуватість, брак грошей чи помилка бухгалтера підставою не вважаються.' },
        { t: 'p', x: 'Про несплачений податок у зведенні надходить вимога 1–3 рази, після чого податок передають на примусове стягнення (ulosotto). У реєстрі податкових боргів (verovelkarekisteri) видно, чи є в компанії борг від 10 000 € або пропущені декларації з податків на самодекларації за останні 6 місяців. Дані компаній відкриті всім, дані toiminimi бачать лише авторизовані користувачі. Перевіряти їх можуть і кредитні компанії.' },
        { t: 'h2', x: 'Розстрочка (maksujärjestely), якщо грошей бракує' },
        { t: 'p', x: 'За тимчасових труднощів можна подати заявку на розстрочку в OmaVero (Veroasiat → Maksaminen → Maksujärjestelypyyntö). Борг у розстрочці не передають на примусове стягнення і не публікують у реєстрі податкових боргів.' },
        { t: 'ul', items: [
          'Умови: труднощі тимчасові, попередні розстрочки погашено, усі декларації, звіти про зарплату й окремі звіти роботодавця подано, податків у виконавчому провадженні немає.',
          'Строк — до 2 років, від 1 до 24 щомісячних платежів, мінімальний платіж 20 €. Перший строк — не пізніше ніж через 30 днів після заявки.',
          'До розстрочки потрапляють уже прострочені податки й податки зі строком у найближчі 45 днів. Щодо податків на самодекларації спершу подайте декларацію і дочекайтеся, поки податок з’явиться в OmaVero до сплати: ALV — через 1–2 дні, внески роботодавця — інколи довше.',
          'За відстрочку нараховується пеня. Розстрочку можуть скасувати, якщо пропустити платіж, не сплатити інші податки вчасно або запізнитися з деклараціями.',
          'Заявку розглядають близько тижня. Подавайте її одразу в день строку, якщо розумієте, що заплатити не зможете.',
        ] },
        { t: 'h2', x: 'Поширені помилки' },
        { t: 'ul', items: [
          'Шукати старий verotili чи виписку з нього, хоча актуальні дані — у saldoerittely, tapahtumaote і yhteenveto в OmaVero.',
          'Не подати декларацію з ALV за місяць без продажів. Декларація потрібна за кожен період, і плату за прострочення нараховують і в цьому разі.',
          'Компанія з реєстру роботодавців забуває позначку «Ei palkanmaksua» за місяць без зарплати.',
          'Змішувати загальний номер посилання й номери за видами податків — платіж іде не туди. Наприклад, гроші для січневого ennakkovero зараховуються в лютневий.',
          'Платити до подання декларації або подати її не за той період: платіж лишається невикористаним, а податок вважається несплаченим.',
          'Чекати повернення ALV і не сплачувати внески роботодавця з тим самим строком.',
          'Залишатися на квартальному чи річному періоді після перевищення ліміту обороту. Про зміну треба повідомити без зволікань.',
          'Сприймати від’ємний підсумок tapahtumaote як борг.',
        ] },
        { t: 'note', x: 'Цифри 2026 року: пеня 9,5 %, hyvityskorko 0,5 %, плата за прострочення декларації 3 € на день (максимум 135 €). Джерела: податкова Verohallinto — інструкція зі сплати податків на самодекларації (оновлено 29.4.2026), пеня, плата за прострочення, повернення (29.4.2026) і розстрочка (23.4.2026); закон 768/2016. Ставки встановлюються щороку.' },
        { t: 'h2', x: 'Візьмемо податки на самодекларації на себе' },
        { t: 'p', x: 'Tilitoimisto Debit Credit стежить, щоб декларації з ALV і звіти до Tulorekisteri надходили вчасно, розраховує податки до кожного строку сплати, допомагає обрати відповідний податковий період і розбирається із сальдо в OmaVero, якщо платіж пішов не туди чи повернення не надходить. Якщо податки вже прострочено, разом розберемо виправлення і за потреби розстрочку. Працюємо фінською та російською. Зв’яжіться з нами — подивимося податкову ситуацію вашої компанії.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: податки на самодекларації (англійською)', href: SRC.selfEn },
          { label: 'Vero: сплата податків на самодекларації і строк (англійською)', href: SRC.payEn },
          { label: 'Vero: строки подання і сплати ALV (англійською)', href: SRC.vatFilingEn },
          { label: 'Vero: податковий період ALV (англійською)', href: SRC.vatPeriodEn },
          { label: 'Vero: як звітувати про зарплату і внески роботодавця (англійською)', href: SRC.employerEn },
          { label: 'Vero: номери рахунків і посилання (англійською)', href: SRC.refEn },
          { label: 'Vero: щомісячна виписка операцій (англійською)', href: SRC.statementEn },
          { label: 'Vero: повернення ALV та інших податків (англійською)', href: SRC.refundEn },
          { label: 'Vero: плата за прострочення декларації (англійською)', href: SRC.lateEn },
          { label: 'Vero: пеня за прострочення оплати (англійською)', href: SRC.interestEn },
          { label: 'Vero: розстрочка для компаній (англійською)', href: SRC.arrangementEn },
          { label: 'Tulorekisteri: плата за прострочення (англійською)', href: SRC.irPenaltyEn },
          { label: 'Finlex: закон 768/2016 про податки на самодекларації (фінською)', href: SRC.ovml },
          { label: 'Finlex: закон 790/2016 про скасування закону про податковий рахунок (фінською)', href: SRC.repeal },
          { label: 'Finlex: закон 1556/1995 про пеню (фінською)', href: SRC.interestAct },
        ] },
      ],
      faq: [
        { q: 'Verotili ще існує?', a: 'Ні. Закон про податковий рахунок скасовано з 1.1.2017. Податки на самодекларації подаються і сплачуються в OmaVero, а стан платежів видно в saldoerittely, щомісячній виписці tapahtumaote і зведенні yhteenveto.' },
        { q: 'Коли сплачувати ALV і внески роботодавця?', a: 'Як правило, 12-го числа. ALV за місяць — 12-го числа другого місяця після періоду, внески роботодавця — 12-го числа місяця після виплати зарплати. Якщо 12-те припадає на суботу чи свято, строк переноситься на наступний робочий день.' },
        { q: 'Скільки коштує запізнення у 2026 році?', a: 'На податок, сплачений із запізненням, нараховується пеня 9,5 % річних. За запізнення з декларацією — 3 € на день, максимум 135 €, а за запізнення понад 45 днів ще 2 % від задекларованого податку.' },
        { q: 'Чи можна продовжити строк декларації з ALV?', a: 'Ні, продовжити строк подання декларації з податків на самодекларації не можна. Для оплати можна попросити розстрочку, але спершу треба подати декларацію, а за відстрочку нараховується пеня.' },
        { q: 'Де знайти номер посилання (viitenumero)?', a: 'В OmaVero: Maksutilanne → Verojen maksaminen ja maksutiedot. Osakeyhtiö користується загальним номером посилання, toiminimi — номерами за видами податків. Отримувач — Verohallinto.' },
        { q: 'Чому не надходить повернення ALV?', a: 'Від’ємний ALV повертають не раніше загального строку сплати місяця, що настає після періоду, і приблизно через тиждень після обробки. Якщо якусь декларацію не подано, повернення не виплачують, а спершу спрямовують на прострочені податки. Повернення менше 10 € не виплачуються.' },
      ],
    },
  },
};
