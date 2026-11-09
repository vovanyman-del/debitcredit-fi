import type { Guide } from './types';

// Facts verified 2026-11-09, verbatim, against Finlex (consolidated Finnish texts; TVL "ajantasa/2026-10-09",
// EVL "ajantasa/2026-04-24", AVL "ajantasa/2026-06-26") and vero.fi (detailed guidance with its issue date and
// validity; ordinary pages with their update date). Every link below was fetched the same day and answered
// HTTP 200.
// - Tuloverolaki 1535/1992 (https://www.finlex.fi/fi/lainsaadanto/1992/1535), 69 § 1 mom.: "Veronalaiseksi
//   tuloksi ei katsota, ellei edellä säädetystä muuta johdu, koko henkilökunnan tai työnantajan palveluksesta
//   eläkkeellä olevien työnantajalta saamaa tavanomaista ja kohtuullista: ... 3) merkkipäivälahjaa tai
//   vähäistä muuta lahjaa, joka on saatu muuna kuin rahana tai siihen verrattavana suorituksena; 4) etua
//   työnantajan järjestämästä virkistys- tai harrastustoiminnasta".
// - Elinkeinoverolaki 360/1968 (https://www.finlex.fi/fi/lainsaadanto/1968/360), 8 § 1 mom.: "Edellä 7 §:ssä
//   tarkoitettuja vähennyskelpoisia menoja ovat muun ohessa: ... 5) ilmoittelusta, asiakaslehdistä ja
//   -julkaisuista, tavanomaisista mainoslahjoista, mainostilaisuuksista ynnä muusta sellaisesta johtuneet
//   menot, ... 8) 50 prosenttia edustusmenojen määrästä".
// - Arvonlisäverolaki 1501/1993 (https://www.finlex.fi/fi/lainsaadanto/1993/1501): 114 § 1 mom. "Vähennystä
//   ei saa tehdä, kun hankinta koskee seuraavia tavaroita ja palveluja: ... 3) edustustarkoitukseen
//   käytettävät tavarat ja palvelut". 21 § "Tavaran ottamisella omaan käyttöön tarkoitetaan sitä, että
//   elinkeinonharjoittaja: 1) ottaa tavaran yksityiseen kulutukseen; 2) luovuttaa tavaran vastikkeetta". 25 §
//   "Tavaranäytteenä tai tavanomaisena mainoslahjana tapahtuvaa luovuttamista ei pidetä tavaran ottamisena
//   omaan käyttöön." 84 § "Suoritettava vero on 25,5 prosenttia veron perusteesta, ellei 85 tai 85 a §:ssä
//   toisin säädetä." NOTE: AVL has no euro threshold for small-value gifts (the brief guessed AVL 22 §; 22 §
//   is about services taken into own use). The 50 € figure is Vero's guidance, quoted below.
// - Kirjanpitolaki 1336/1997 (https://www.finlex.fi/fi/lainsaadanto/1997/1336), 2 luku 5 §: "Kirjauksen on
//   perustuttava päivättyyn ja järjestelmällisesti numeroituun tai vastaavalla tavalla yksilöityyn
//   tositteeseen, joka todentaa liiketapahtuman." "Menotositteesta on käytävä selville vastaanotettu
//   tuotannontekijä".
// - Vero, Henkilökuntaedut verotuksessa, VH/7540/00.01.00/2024, antopäivä 19.12.2024, voimassa 1.1.2025 -
//   toistaiseksi (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/62486/henkilokuntaedut-verotuksessa9/).
//   Banner: "Tämä ohje on päivitettävänä. Liikunta- ja kulttuuriedun verovapaa vuotuinen enimmäismäärä on
//   noussut 540 euroon" (the pending update concerns the sports and culture benefit, not gifts or parties).
//   3.5.2.4: "Tavanomaisena virkistystoimintana pidetään myös työnantajan kustantamia henkilökunnan yhteisiä
//   pikkujoulu-, tilinpäätös-, kesä- tai muita vastaavia tavanomaisia juhlatilaisuuksia, jos niitä voidaan
//   pitää kustannuksiltaan ja järjestämistiheydeltään tavanomaisina ja kohtuullisina. Työnantaja voi
//   kustantaa myös matkakustannukset matkalaskua vastaan tapahtumapaikalle ja sieltä kotiin, jos tapahtuma
//   on muualla kuin työntekijän varsinaisella työpaikalla. Työnantaja voi koko henkilökunnan
//   juhlatilaisuuden yhteydessä järjestää työntekijöille myös ruokailun verovapaasti."
//   3.5.1: "Verovapaan virkistys- ja harrastustoiminnan tulee olla työnantajan järjestämää. Tämä tarkoittaa,
//   että työnantaja valitsee virkistys- ja harrastustoiminnan tavan ja paikan"; "Työnantajan maksukuittia
//   vastaan maksamat palkansaajan itse valitseman harrastuksen tai muun virkistystilaisuuden maksut ovat aina
//   veronalaista palkkaa". 3.5.2.5: "henkilöstölle järjestettävä virkistyspäivä tai pikkujoulut voivat olla
//   verovapaata virkistystoimintaa, vaikka työntekijät eivät kokoontuisi fyysisesti samaan paikkaan";
//   "Työnantaja voi esimerkiksi tilata ruoat työntekijöiden kotiin"; "Jos työnantaja tarjoaa ruokailun
//   virkistystilaisuudessa antamalla työntekijöille lahjakortin ruokakauppaan, ravintolaan tai
//   ruokalähettipalveluun, ... Lahjakorttina annettu etu on työntekijän palkkaa." (Narrowed 2026-11-09: only a
//   gift card that REPLACES the party meal is salary; a named card for a given restaurant/chain ≤100 € can still
//   be a tax-free Christmas gift under 3.4.2.)
//   Same guidance, on merkkipäivälahja: "Merkkipäivälahjan verovapaus edellyttää, että lahja on työnantajan
//   valitsema. Jos osakeyhtiössä työskentelee ainoastaan yhtiön omistaja, yhtiö ei voi antaa omistajalleen
//   verovapaata merkkipäivälahjaa". Applying the same logic to a Christmas gift a sole owner picks for himself
//   is our inference, stated hedged in the text. Customer-event meals of own staff are edustus (only salaries
//   stay fully deductible); the worked staff gift is tax-free only if no other small gifts that year.
//   3.1.2: "Jos edun järjestämisestä aiheutuneet kokonaiskustannukset muodostuvat kohtuuttoman suuriksi
//   suhteessa edun saavan henkilökunnan määrään, etu ei ole lain tarkoittamalla tavalla tavanomainen ja
//   kohtuullinen"; "Etujen tavanomaisuutta ja kohtuullisuutta arvioidaan tällöin sekä yksittäisen annetun
//   edun kannalta että eturyhmäkohtaisesti kokonaisuutena." 3.1.1.5: "Etua ei ole tarjottu koko
//   henkilökunnalle, jos etu jätetään tarjoamatta esimerkiksi työnantajan palveluksessa oleville määrä- tai
//   osa-aikaisille työntekijöille"; not required for "lyhytaikaisille tilapäistyöntekijöille, kuten
//   ruuhka-apulaisille esimerkiksi joulun aikaan".
//   2.3.2: "Työntekijän puoliso saattaa esimerkiksi osallistua työnantajan virkistystoimintana järjestämiin
//   tavanomaisiin tilaisuuksiin, kuten kesä- tai joulujuhliin" — requires "että puolison tai perheenjäsenen
//   osallistumista edun käyttämiseen voidaan pitää tavanomaisena ja saatu etu on kohtuullinen huomioiden myös
//   puolison osallistumisesta aiheutuvat kustannukset". "Osakeyhtiön henkilökuntaan kuuluvan osakkaan
//   perheenjäsenelle tai puolisolle yhtiöstä annetut edut voivat olla osakkaan saamaa peiteltyä osinkoa, jos
//   etu on annettu yksinomaan osakkuusaseman perusteella."
//   2.3.3: "yhtiön palveluksessa tosiasiallisesti työskentelevä osakas kuuluu yhtiön henkilökuntaan, vaikka
//   hän ei nostaisikaan yhtiöstä palkkaa"; "Yhtiössä työskentelevä osakas voi saada henkilökuntaedun
//   verovapaasti myös silloin, kun yhtiössä ei hänen lisäkseen työskentele muita työntekijöitä tai hänen
//   lisäkseen yhtiössä työskentelee vain osakkaan perheenjäseniä. Yhtiön henkilökunnan lukumäärällä saattaa
//   kuitenkin olla merkitystä arvioitaessa henkilökuntaedun tavanomaisuutta ja kohtuullisuutta";
//   "Pelkästään osakkuusasemansa perusteella yhtiön osakas ei kuulu yhtiön henkilökuntaan. Osakeyhtiön
//   osakkaalleen tai tämän omaiselle yksinomaan osakkuusaseman perusteella antama etu voi olla peiteltyä
//   osinkoa". NOTE: the brief expected «owner-only oy: generally not deductible / peitelty osinko»; Vero's
//   actual stance is that a WORKING owner is staff even alone, with reasonableness judged by headcount.
//   2.3.4: "Liikkeen- tai ammatinharjoittaja ei siten itse voi olla työntekijän asemassa eikä kuulua
//   yrityksen henkilökuntaan. Tällöin myöskään hänelle järjestetyn henkilökuntaedun kustannukset eivät ole
//   vähennyskelpoisia verotuksessa"; "Jos liikkeen- tai ammatinharjoittaja on mukana työntekijöitä varten
//   järjestetyissä kollektiivisissa virkistys- ja harrastustoimintatilaisuuksissa yhdessä työntekijöiden
//   kanssa, hänenkään osuudestaan kustannuksista ei muodostu hänelle veronalaista etua."
//   1 / 2.4: "Työnantajan työntekijälle suoraan rahana maksama suoritus on palkkaa, vaikka suoritus
//   annettaisiinkin esimerkiksi merkkipäivälahjan nimikkeellä."
//   3.4.2: "Vähäisellä muulla lahjalla tarkoitetaan lähinnä jouluna koko henkilökunnalle annettavia pieniä
//   muistamisia"; "Rahana tai rahaan verrattavana suorituksena annetut lahjat ovat kuitenkin aina työntekijän
//   palkkaa"; "Vähäisen lahjan arvo voi olla enintään 100 euroa. Jos työnantaja antaa työntekijöille muutamia
//   vähäisiä lahjoja vuodessa, näiden yhteenlaskettu arvo voi olla korkeintaan 100 euroa. Lahja voi olla
//   työnantajan valitsema esine, pääsylippu, palvelu tai yksilöity lahjakortti. Työntekijä voi myös valita
//   lahjan työnantajan määrittelemistä vaihtoehdoista." Gift cards "ovat verovapaita, kun seuraavat
//   edellytykset täyttyvät: Lahja annetaan koko henkilökunnalle. Lahjakortin arvo on enintään 100 euroa.
//   Lahjakortti on henkilökohtainen eli nimetylle työntekijälle annettu. Työnantaja on rajannut lahjakortin
//   käyttökohteen tietystä paikasta hankittavaan esineeseen tai palveluun eikä lahjakortilla voi hankkia
//   muuta. ... Lahjakorttia ei voi muuttaa rahaksi."; "yksilöimätön lahjakortti on tyypillisesti lahjakortti
//   jonkin tietyn liikkeen tai tavaratalon koko valikoimaan. Tällainen yksilöimätön lahjakortti on
//   työntekijän palkkaa". Examples 18 (a book from a given bookshop) and 20 (a given restaurant or chain).
//   NOTE: the brief said «gift cards are taxable» — not so: a specified, named, ≤100 € card is tax-free.
//   NOTE: the brief's «~200 €/person/year for virkistystilaisuudet» does NOT appear anywhere in Vero's
//   guidance (searched the full text): there is no euro figure for parties, so none is stated here.
// - Vero, Edustusmenot tuloverotuksessa, antopäivä 29.11.2021, voimassa toistaiseksi
//   (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48743/edustusmenot-tuloverotuksessa2/):
//   "EVL 8 §:n 1 momentin 8 kohdan mukaan 50 prosenttia edustusmenojen määrästä on 7 §:ssä tarkoitettuja
//   vähennyskelpoisia menoja"; "Edustusmenojen tunnusmerkkinä on, että ne kohdistuvat yrityksen ulkopuolisiin
//   tahoihin. Yrityksen omaan henkilökuntaan kohdistuvia menoja ei pidetä edustusmenoina"; "Henkilökuntaan
//   kohdistuvat menot ovat yritykselle yleensä kokonaan vähennyskelpoisia joko palkkamenoina tai muina
//   tulonhankkimismenoina"; "Yrityksen työntekijöiden palkat ovat kokonaan vähennyskelpoisia kuluja siltäkin
//   osin kuin he osallistuvat edustustilaisuuteen"; "Mainoslahja on arvoltaan vähäinen massalahja, joka
//   annetaan samanaikaisesti ja samanlaisena useille vastaanottajille. Mainoslahjoihin on usein painettu
//   yrityksen nimi tai liiketunnus"; "Mainoslahjaa, jonka arvonlisäverollinen ostohinta on enintään 50 euroa,
//   voidaan pitää tavanomaisena"; "Edustuslahja on valittu yksilöllisemmin vastaanottajaa silmällä pitäen.
//   Edustuslahja annetaan yritykseen liikesuhteessa olevalle henkilölle esimerkiksi hänen merkkipäivänsä
//   johdosta"; "Alkoholilahjojen on katsottu verotuskäytännössä liittyvän lähtökohtaisesti edustamiseen"
//   (exception: own products of e.g. a brewery if the advertising-gift conditions are met); "Mainostilaisuudet
//   ovat yleensä valikoimattomalle asiakasjoukolle tarkoitettuja ... Mainostilaisuuteen voi liittyä vähäistä
//   tarjoilua, jota ei kuitenkaan pidetä edustamisena"; "Yrityksen omistajan yksityismenot eivät ole liikkeen
//   menoja. Yritysmuodosta riippuen kysymys on tällöin vähennyskelvottomasta yksityismenosta tai peitellystä
//   osingosta."
// - Vero, Markkinointi- ja edustustilaisuudet arvonlisäverotuksessa, antopäivä 19.12.2017, voimassa
//   toistaiseksi (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48462/markkinointi--ja-edustustilaisuudet-arvonlis%C3%A4verotuksessa/):
//   "Jos tilaisuus on luonteeltaan edustustilaisuus, ovat kaikki tilaisuuteen liittyviin kuluihin sisältyvät
//   arvonlisäverot vähennyskelvottomia. Edustuskuluihin luetaan tällöin kaikki edustustarkoituksessa
//   syntyneet kuluerät. Tällaisia ovat esimerkiksi ravintolakulut, edustuslahjat"; "Yritysten
//   merkkipäiväjuhlissa ..., joihin on kutsuttu sekä henkilökuntaa että ulkopuolisia asiakastahoja,
//   ulkopuolisten vieraiden osalta on yleensä kyse edustustilaisuudesta. ... Henkilökunnan
//   virkistystilaisuuksista aiheutuneet kulut voivat olla vallitsevan oikeuskäytännön mukaan
//   vähennyskelpoisia yleiskuluja siltä osin kuin ne kohdistuvat yhtiön vähennykseen oikeuttavaan
//   liiketoimintaan (KHO 29.6.1998/1229, KHO 2015:98)"; "Yrityksen henkilökuntaa voi kuitenkin olla
//   työnantajan järjestämässä juhlatilaisuudessa paikalla vain asiakkaita varten, jolloin näiden
//   työntekijöiden osalta tilaisuuden ei voida katsoa olevan edes osaksi virkistysluonteinen"; "Yrityksen
//   työntekijöiden puolisoiden ja muiden perheenjäsenten osalta yrityksen merkkipäiväjuhlien
//   järjestämiskustannukset ovat aina vähennyskelvotonta yksityiskulutusta."
// - Vero, Oman käytön ja alivastikkeellisten luovutusten arvonlisäverotus, antopäivä 17.3.2020, voimassa
//   toistaiseksi (https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/47899/oman-k%C3%A4yt%C3%B6n-ja-alivastikkeellisten-luovutusten-arvonlis%C3%A4verotus/):
//   "Kun elinkeinonharjoittaja ostaa tavaroita liiketoiminnan tarkoitukseen esimerkiksi myynnin edistämistä
//   varten, hänellä on oikeus vähentää hankintaan liittyvä arvonlisävero (AVL 102 §)"; "Tavaranäytteen tai
//   tavanomaisen mainoslahjan luovuttamista ei pidetä tavaran ottamisena omaan käyttöön (AVL 25 §)";
//   "Verohallinnon käsityksen mukaan mainoslahjaa, jonka arvonlisäverollinen ostohinta on enintään 50 euroa,
//   voidaan pitää tavanomaisena"; "Alkoholituotteet eivät ole tavanomaisia mainoslahjoja"; "Henkilöstölle
//   luovutettavia tavaroita ei voida pitää tavanomaisina mainoslahjoina. Jos yllä mainittuja tavaroita
//   luovutetaan vastikkeetta yrityksen henkilöstön yksityiskulutukseen, luovutuksesta on suoritettava oman
//   käytön vero."
// - Vero, Arvonlisäveron vähennys ostoista (28.3.2025)
//   (https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaveron-vahennys-ostoista/):
//   "Arvonlisäveroa ei saa vähentää esimerkiksi silloin, kun hankinnat tulevat yrittäjän tai henkilökunnan
//   yksityiskäyttöön"; restriction when "tavara tai palvelu on hankittu edustustarkoitukseen". EN Deducting
//   VAT on purchases (28.3.2025): "no VAT deduction is allowed in circumstances where a business owner – or
//   the employees working for the company – use the goods and services privately".
// - Own arithmetic: 40 × 20 € = 800 € incl. 25,5 % VAT → net 800 / 1,255 = 637,45 €, VAT 162,55 €;
//   6 × 95 € = 570 €; 6 × 60 € = 360 €; 2 × 45 € = 90 € → 50 % = 45 €; 6 × 80 € = 480 € → 50 % = 240 €.
// Not stated (not verifiable or out of scope): any euro limit for a staff party, restaurant VAT rates by line,
// how a gift above 100 € is valued, employer contributions on taxable gifts, any bureau price.
const VERO = 'https://www.vero.fi';

const SRC = {
  staff: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/62486/henkilokuntaedut-verotuksessa9/`,
  edustus: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48743/edustusmenot-tuloverotuksessa2/`,
  alvEvents: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48462/markkinointi--ja-edustustilaisuudet-arvonlis%C3%A4verotuksessa/`,
  alvOwnUse: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/47899/oman-k%C3%A4yt%C3%B6n-ja-alivastikkeellisten-luovutusten-arvonlis%C3%A4verotus/`,
  alvDeductFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaveron-vahennys-ostoista/`,
  alvDeductEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/vat/deducting-vat-on-purchases/`,
  tvl: 'https://www.finlex.fi/fi/lainsaadanto/1992/1535',
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
};

export const pikkujoulutJaJoululahjat: Guide = {
  slug: 'pikkujoulut-ja-joululahjat',
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
  content: {
    fi: {
      title: 'Pikkujoulut ja joululahjat yrityksessä: verotus, ALV ja kirjanpito',
      description:
        'Pikkujoulut ja joululahjat: milloin ne ovat työntekijälle verovapaita, mitä yritys saa vähentää, miten ALV toimii ja miten kulut kirjataan.',
      lead: 'Marras- ja joulukuussa yritykset järjestävät pikkujouluja ja ostavat lahjoja työntekijöille ja asiakkaille. Verotuksessa ratkaisee se, kenelle kulu kohdistuu: omalle henkilökunnalle, asiakkaille vai yrittäjälle itselleen. Kokosimme lain ja Verohallinnon ohjeiden säännöt, yleisimmät virheet ja esimerkin euroina.',
      body: [
        { t: 'h2', x: 'Ensin: kenelle kulu kohdistuu?' },
        { t: 'p', x: 'Sama ravintolalasku voi olla verotuksessa kolmea eri asiaa. Henkilökunnalle järjestetty pikkujoulu on virkistystoimintaa, asiakkaille järjestetty tilaisuus on edustusta ja asiakkaille jaettu logotuote voi olla mainoslahja. Ero näkyy sekä tuloverotuksessa että arvonlisäverossa.' },
        { t: 'ul', items: [
          'Henkilöstökulu (henkilökunnan virkistys ja lahjat): yleensä kokonaan vähennyskelpoinen tuloverotuksessa.',
          'Edustusmeno (asiakkaat ja liikekumppanit): tuloverotuksessa vähennetään 50 %, eikä arvonlisäveroa saa vähentää.',
          'Mainoslahja (tavanomainen, vähäarvoinen massalahja): kokonaan vähennyskelpoinen, ja hankinnan arvonlisäveron saa vähentää.',
        ] },
        { t: 'h2', x: 'Pikkujoulut henkilökunnalle' },
        { t: 'p', x: 'Tuloverolain 69 §:n mukaan työntekijän veronalaista tuloa ei ole koko henkilökunnalle annettu tavanomainen ja kohtuullinen etu työnantajan järjestämästä virkistys- tai harrastustoiminnasta. Verohallinnon ohjeessa mainitaan erikseen pikkujoulut, tilinpäätös- ja kesäjuhlat: ne ovat tavanomaista virkistystoimintaa, jos ne ovat kustannuksiltaan ja järjestämistiheydeltään tavanomaisia ja kohtuullisia. Juhlassa voi tarjota työntekijöille myös ruokailun verovapaasti.' },
        { t: 'ul', items: [
          'Juhla on koko henkilökunnalle, ei vain osalle, esimerkiksi johdolle. Määrä- ja osa-aikaisia ei saa jättää pois. Lyhytaikaiset tilapäistyöntekijät, kuten joulun ruuhka-apulaiset, voi jättää.',
          'Työnantaja järjestää juhlan: valitsee tavan ja paikan ja maksaa laskun. Jos työntekijät valitsevat ja maksavat itse ja yritys korvaa kuittia vastaan, korvaus on palkkaa.',
          'Kustannus on kohtuullinen myös suhteessa henkilökunnan määrään. Verohallinto ei ole antanut pikkujoululle euromääräistä rajaa. Arvio on tapauskohtainen, ja vuoden virkistystoimintaa arvioidaan myös kokonaisuutena.',
          'Matkat juhlapaikalle ja kotiin voi korvata matkalaskua vastaan, jos juhla on muualla kuin tavallisella työpaikalla.',
        ] },
        { t: 'p', x: 'Myös etänä pidetty pikkujoulu voi olla verovapaa, ja työnantaja voi tilata ruoan työntekijöiden kotiin. Jos työnantaja kuitenkin korvaa juhlan ruokailun antamalla lahjakortin ruokakauppaan, ravintolaan tai ruoan kotiinkuljetuspalveluun, lahjakortti on työntekijän palkkaa.' },
        { t: 'h3', x: 'Puolisot ja perheenjäsenet' },
        { t: 'p', x: 'Tuloverotuksessa puolison osallistuminen tavanomaiseen joulu- tai kesäjuhlaan voi kuulua verovapaaseen etuun, kun etu on kohtuullinen myös puolison kulut huomioon ottaen. Arvonlisäverotuksessa Verohallinto pitää työntekijöiden puolisoiden ja perheenjäsenten osuutta yrityksen juhlan kuluista (ohjeen esimerkkinä merkkipäiväjuhla) vähennyskelvottomana yksityiskulutuksena. Käytännössä puolisoiden osuuden arvonlisävero jätetään vähentämättä.' },
        { t: 'h3', x: 'Vähennys ja ALV' },
        { t: 'p', x: 'Henkilökuntaan kohdistuvat menot eivät ole edustusmenoja, vaan yritykselle yleensä kokonaan vähennyskelpoisia. Arvonlisäverotuksessa henkilökunnan virkistystilaisuuden kulut voivat oikeuskäytännön mukaan olla vähennyskelpoisia yleiskuluja siltä osin kuin ne kohdistuvat vähennykseen oikeuttavaan liiketoimintaan (KHO 2015:98). Jos yritys myy myös arvonlisäverosta vapaita palveluja, vähennys tehdään vain verollista toimintaa vastaavalta osalta.' },
        { t: 'h2', x: 'Toiminimi ja omistajan oma juhla' },
        { t: 'p', x: 'Toiminimiyrittäjä ei voi olla itsensä työntekijä eikä kuulu yrityksen henkilökuntaan. Siksi yrittäjälle itselleen järjestetyn henkilökuntaedun kustannukset eivät ole vähennyskelpoisia: yksin tai perheen kanssa vietetty ”pikkujoulu” on yksityismeno. Jos toiminimellä on työntekijöitä ja yrittäjä on mukana heille järjestetyssä yhteisessä pikkujoulussa, hänenkään osuudestaan ei synny hänelle veronalaista etua.' },
        { t: 'p', x: 'Osakeyhtiössä tilanne on toinen. Yhtiössä tosiasiallisesti työskentelevä osakas kuuluu henkilökuntaan, vaikka hän ei nostaisi palkkaa, ja voi saada henkilökuntaedun verovapaasti samoin edellytyksin kuin muut. Verohallinnon mukaan tämä pätee myös yhtiössä, jossa ei ole muita työntekijöitä tai työskentelee vain osakkaan perheenjäseniä. Henkilökunnan määrä vaikuttaa kuitenkin kohtuullisuuteen: jos kokonaiskustannukset ovat kohtuuttoman suuret suhteessa osallistujien määrään, etu ei ole verovapaa. Ole kuitenkin varovainen lahjoissa itsellesi: Verohallinnon mukaan merkkipäivälahjan verovapaus edellyttää, että lahja on työnantajan valitsema, eikä yhtiö, jossa työskentelee ainoastaan omistaja, voi antaa omistajalleen verovapaata merkkipäivälahjaa. Sama logiikka koskee todennäköisesti myös joululahjaa, jonka ainoa omistaja valitsee itselleen.' },
        { t: 'p', x: 'Pelkän osakkuuden perusteella annettu etu, esimerkiksi yhtiössä työskentelemättömälle osakkaalle tai osakkaan perheenjäsenelle, voi olla peiteltyä osinkoa. Omistajan yksityismenot eivät ole yrityksen menoja.' },
        { t: 'h2', x: 'Joululahjat työntekijöille' },
        { t: 'p', x: 'Verovapaa on koko henkilökunnalle annettava vähäinen muu lahja, joka saadaan muuna kuin rahana (TVL 69 §). Verohallinnon ohjeen mukaan vähäisen lahjan arvo voi olla enintään 100 euroa. Jos vähäisiä lahjoja annetaan muutamia vuodessa, niiden yhteisarvo voi olla enintään 100 euroa.' },
        { t: 'ul', items: [
          'Lahja on työnantajan valitsema esine, pääsylippu, palvelu tai yksilöity lahjakortti. Työntekijä saa valita työnantajan määrittelemistä vaihtoehdoista.',
          'Raha on aina palkkaa, vaikka sitä kutsuttaisiin joululahjaksi.',
          'Lahjakortti on verovapaa, kun se annetaan koko henkilökunnalle, sen arvo on enintään 100 euroa, se on nimetty työntekijälle, käyttö on rajattu tietyn paikan tuotteeseen tai palveluun (esimerkiksi kirja tietystä kirjakaupasta tai ateria tietyssä ravintolassa tai ravintolaketjussa) eikä sitä voi vaihtaa rahaksi.',
          'Lahjakortti kaupan tai tavaratalon koko valikoimaan on yksilöimätön ja siksi työntekijän palkkaa.',
        ] },
        { t: 'p', x: 'Henkilökunnan lahjat ovat yritykselle henkilöstökuluja, eivät edustusmenoja, joten ne ovat tuloverotuksessa yleensä kokonaan vähennyskelpoisia. Arvonlisäveroa ei sen sijaan saa vähentää, kun hankinta tulee henkilökunnan yksityiskäyttöön, joten joululahja kirjataan kuluksi verollisena hintana. Henkilöstölle annettu tavara ei ole mainoslahja, vaikka siinä olisi yrityksen logo.' },
        { t: 'p', x: 'Veronalainen lahja, kuten raha tai yksilöimätön lahjakortti, käsitellään palkkana: siitä toimitetaan ennakonpidätys ja se ilmoitetaan tulorekisteriin.' },
        { t: 'h2', x: 'Joululahjat asiakkaille ja yhteistyökumppaneille' },
        { t: 'p', x: 'Asiakkaalle annettu lahja on verotuksessa joko mainoslahja tai edustuslahja.' },
        { t: 'ul', items: [
          'Mainoslahja on arvoltaan vähäinen massalahja, joka annetaan samaan aikaan ja samanlaisena useille vastaanottajille, usein yrityksen nimellä tai logolla. Verohallinnon mukaan mainoslahjaa, jonka arvonlisäverollinen ostohinta on enintään 50 euroa, voidaan pitää tavanomaisena. Tavanomaiset mainoslahjat ovat kokonaan vähennyskelpoisia (EVL 8 §:n 1 mom. 5 kohta), hankinnan arvonlisäveron saa vähentää, eikä lahjan antamisesta makseta oman käytön veroa (AVL 25 §).',
          'Edustuslahja on valittu yksilöllisemmin vastaanottajaa ajatellen, esimerkiksi liikekumppanin merkkipäivän vuoksi. Edustusmenoista vähennetään tuloverotuksessa 50 % (EVL 8 §:n 1 mom. 8 kohta), eikä arvonlisäveroa saa vähentää (AVL 114 §:n 1 mom. 3 kohta).',
          'Alkoholilahjat ovat lähtökohtaisesti edustusta. Poikkeus voi olla esimerkiksi pienpanimon tai viinitilan oma tuote, jos mainoslahjan edellytykset muuten täyttyvät.',
        ] },
        { t: 'h2', x: 'Asiakkaiden joulutilaisuus' },
        { t: 'p', x: 'Asiakkaille ja liikekumppaneille järjestetty joululounas, -illallinen tai -juhla on yleensä edustustilaisuus. Tuloverotuksessa kuluista vähennetään 50 %, ja kaikkien tilaisuuteen liittyvien kulujen arvonlisäverot ovat vähennyskelvottomia, esimerkiksi ravintolakulut ja edustuslahjat. Omien työntekijöiden palkat ovat silti kokonaan vähennyskelpoisia (heidän ateriansa tilaisuudessa ovat kuitenkin edustusmenoa), vaikka he osallistuisivat tilaisuuteen.' },
        { t: 'p', x: 'Jos samaan juhlaan kutsutaan sekä henkilökunta että asiakkaat, ulkopuolisten vieraiden osuus on yleensä edustusta ja henkilökunnan osuus virkistystä. Työntekijät, jotka ovat paikalla vain asiakkaita varten, eivät kuitenkaan ole virkistystilaisuudessa. Merkitse tositteeseen, miten kulut on jaettu. Avoin mainostilaisuus, johon asiakkailla on vapaa pääsy ja jossa on vähäistä tarjoilua, ei ole edustusta vaan markkinointia.' },
        { t: 'h2', x: 'Kirjanpito: erilliset tilit ja merkintä tositteeseen' },
        { t: 'p', x: 'Kirjanpitolain mukaan kirjauksen on perustuttava tositteeseen, joka todentaa liiketapahtuman, ja menotositteesta on käytävä ilmi, mitä on hankittu (2 luku 5 §). Pelkästä ravintolakuitista ei näe, kenelle kulu kohdistui, joten lisää siihen lyhyt selvitys. Se auttaa myös, jos Verohallinto kysyy kuluista.' },
        { t: 'ul', items: [
          'Kirjaa kulut eri tileille: henkilökunnan virkistys ja lahjat henkilöstökuluihin, asiakastilaisuudet ja edustuslahjat edustuskuluihin, mainoslahjat mainoskuluihin. Edustuksen 50 %:n vähennysrajoitus ja vähennyskelvoton arvonlisävero on helppo hoitaa, kun edustus on omalla tilillään.',
          'Merkitse tilaisuuden tarkoitus ja osallistujat: henkilökunta ja montako henkeä, mahdolliset puolisot, asiakastilaisuudessa yritykset ja henkilöt.',
          'Lahjoista: mitä annettiin, kenelle tai millä vastaanottajalistalla ja mikä oli kappalehinta.',
          'Lahjakorteista: kenen nimiin kortti annettiin, mihin käyttö on rajattu ja mikä on arvo.',
          'Erottele puolisoiden osuus ja yhteisessä juhlassa asiakkaiden osuus.',
        ] },
        { t: 'h2', x: 'Esimerkki euroina' },
        { t: 'p', x: 'Osakeyhtiössä työskentelevät omistaja ja viisi työntekijää. Yhtiö myy vain arvonlisäverollisia palveluja.' },
        { t: 'ul', items: [
          'Pikkujoulu ravintolassa koko henkilökunnalle: 6 × 95 € = 570 € (sis. ALV). Henkilöstökulu, joka vähennetään kokonaan, ja laskun arvonlisävero vähennetään. Työntekijöille verovapaa, kun juhla on tavanomainen ja kohtuullinen.',
          'Joululahja kaikille: sama yhtiön valitsema tuote, 6 × 60 € = 360 €. Verovapaa, koska arvo on enintään 100 euroa eikä muita vähäisiä lahjoja anneta samana vuonna. Kulu 360 € vähennetään kokonaan, arvonlisäveroa ei vähennetä.',
          'Asiakkaille 40 logolla varustettua termosmukia à 20 € = 800 € (sis. ALV 25,5 %). Mainoslahja: arvonlisävero 162,55 € vähennetään ja veroton hinta 637,45 € on kokonaan vähennyskelpoinen kulu.',
          'Kahdelle avainasiakkaalle viinipullo à 45 € = 90 €. Edustuslahja: arvonlisäveroa ei vähennetä, ja tuloverotuksessa vähennetään 45 €.',
          'Joululounas neljälle asiakkaalle ja kahdelle omalle työntekijälle: 6 × 80 € = 480 €. Edustustilaisuus: arvonlisäveroa ei vähennetä, ja tuloverotuksessa vähennetään 240 €.',
        ] },
        { t: 'p', x: 'Jos yhtiö antaisi tuotteen sijaan 150 euron lahjakortit tavaratalon koko valikoimaan, jokainen kortti olisi työntekijän palkkaa, josta toimitetaan ennakonpidätys ja joka ilmoitetaan tulorekisteriin.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Työntekijöille annetaan joululahjaksi rahaa tai lahjakortti kaupan koko valikoimaan, ja sitä pidetään verovapaana.',
          'Vähäisten lahjojen yhteisarvo ylittää vuodessa 100 euroa.',
          'Pikkujoulu järjestetään vain osalle henkilökunnasta, esimerkiksi johtoryhmälle.',
          'Toiminimiyrittäjä vähentää oman, yksin tai perheen kanssa vietetyn ”pikkujoulunsa”.',
          'Osakeyhtiö maksaa omistajan perheen juhlan ja kirjaa sen henkilökunnan virkistykseksi.',
          'Asiakastilaisuuden tai edustuslahjan arvonlisävero vähennetään.',
          'Henkilökunnan joululahjan arvonlisävero vähennetään tai lahja kirjataan mainoskuluksi.',
          'Kuitista ei käy ilmi, keitä tilaisuudessa oli ja miksi se järjestettiin.',
        ] },
        { t: 'note', x: 'Euromäärät ovat Verohallinnon ohjeista, eivät laista: vähäiset lahjat enintään 100 euroa vuodessa ja tavanomainen mainoslahja enintään 50 euroa (sis. ALV). Pikkujoululle ei ole euromääräistä rajaa. Yleinen arvonlisäverokanta on 25,5 %. Verohallinnon henkilökuntaetuohje on päivitettävänä, mutta ilmoitettu muutos koskee liikunta- ja kulttuurietua, ei lahjoja tai juhlia. Lähteet: tuloverolaki (1535/1992), elinkeinoverolaki (360/1968), arvonlisäverolaki (1501/1993), kirjanpitolaki (1336/1997) ja Verohallinto.' },
        { t: 'h2', x: 'Autamme juhlakauden kuluissa' },
        { t: 'p', x: 'Tilitoimisto Debit Credit kirjaa pikkujoulut, henkilökunnan lahjat, edustuksen ja mainoslahjat oikeille tileille, tarkistaa arvonlisäveron vähennykset ja käsittelee veronalaiset lahjat palkanlaskennassa ja tulorekisteri-ilmoituksissa. Asiakkaamme voivat toimittaa kuitit Vaavo-sovelluksen kautta. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä jo ennen juhlia, niin käydään suunnitelmat läpi verotuksen kannalta.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: henkilökuntaedut verotuksessa', href: SRC.staff },
          { label: 'Verohallinto: edustusmenot tuloverotuksessa', href: SRC.edustus },
          { label: 'Verohallinto: markkinointi- ja edustustilaisuudet arvonlisäverotuksessa', href: SRC.alvEvents },
          { label: 'Verohallinto: oman käytön ja alivastikkeellisten luovutusten arvonlisäverotus', href: SRC.alvOwnUse },
          { label: 'Verohallinto: arvonlisäveron vähennys ostoista', href: SRC.alvDeductFi },
          { label: 'Finlex: tuloverolaki (1535/1992)', href: SRC.tvl },
          { label: 'Finlex: elinkeinoverolaki (360/1968)', href: SRC.evl },
          { label: 'Finlex: arvonlisäverolaki (1501/1993)', href: SRC.avl },
          { label: 'Finlex: kirjanpitolaki (1336/1997)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Paljonko pikkujoulu saa maksaa henkeä kohden, jotta se on verovapaa?', a: 'Verohallinto ei ole antanut euromääräistä rajaa. Juhlan on oltava koko henkilökunnalle, työnantajan järjestämä sekä kustannuksiltaan ja järjestämistiheydeltään tavanomainen ja kohtuullinen. Kohtuullisuutta arvioidaan myös suhteessa henkilökunnan määrään ja koko vuoden virkistystoimintaan.' },
        { q: 'Kuinka arvokkaan joululahjan työntekijälle voi antaa verovapaasti?', a: 'Vähäisen lahjan arvo voi olla enintään 100 euroa, ja jos lahjoja annetaan useampia vuodessa, niiden yhteisarvo voi olla enintään 100 euroa. Lahjan on oltava muuta kuin rahaa ja annettava koko henkilökunnalle.' },
        { q: 'Onko lahjakortti työntekijälle verovapaa?', a: 'On, jos se annetaan koko henkilökunnalle, on enintään 100 euroa, nimetty työntekijälle, rajattu tietyn paikan tuotteeseen tai palveluun eikä sitä voi vaihtaa rahaksi. Lahjakortti kaupan koko valikoimaan on palkkaa.' },
        { q: 'Voiko toiminimiyrittäjä vähentää oman pikkujoulunsa?', a: 'Ei. Toiminimiyrittäjä ei kuulu yrityksen henkilökuntaan, joten hänelle itselleen järjestetyn edun kulut eivät ole vähennyskelpoisia. Jos hän osallistuu työntekijöilleen järjestettyyn pikkujouluun, hänen osuudestaan ei synny veronalaista etua.' },
        { q: 'Saako asiakaslahjan arvonlisäveron vähentää?', a: 'Tavanomaisen mainoslahjan (enintään 50 euroa sis. ALV, massalahja usein logolla) arvonlisäveron saa vähentää. Edustuslahjan, kuten yksilöllisesti valitun lahjan tai alkoholin, arvonlisäveroa ei saa vähentää, ja tuloverotuksessa siitä vähennetään 50 %.' },
      ],
    },
    ru: {
      title: 'Pikkujoulut и рождественские подарки в компании: налоги, НДС и бухгалтерия',
      description:
        'Pikkujoulut и рождественские подарки: когда они не облагаются налогом для работника, что компания вычитает, как работает НДС и как учесть расходы.',
      lead: 'В ноябре и декабре компании устраивают pikkujoulut — предрождественские праздники — и покупают подарки сотрудникам и клиентам. Для налогов решает одно: на кого направлен расход — на свой персонал, на клиентов или на самого предпринимателя. Мы собрали правила закона и инструкций Verohallinto, частые ошибки и пример в евро.',
      body: [
        { t: 'h2', x: 'Сначала: на кого направлен расход?' },
        { t: 'p', x: 'Один и тот же ресторанный счёт в налогах может означать три разные вещи. Pikkujoulu для персонала — это отдых сотрудников (virkistystoiminta), мероприятие для клиентов — представительские расходы (edustus), а сувенир с логотипом для клиентов может быть рекламным подарком (mainoslahja). Разница видна и в подоходном налоге, и в НДС.' },
        { t: 'ul', items: [
          'Расходы на персонал (отдых и подарки сотрудникам): обычно полностью вычитаются в подоходном налоге.',
          'Представительские расходы (клиенты и деловые партнёры): вычитается 50 %, НДС к вычету не принимается.',
          'Рекламный подарок (обычный недорогой массовый подарок): вычитается полностью, НДС с покупки можно принять к вычету.',
        ] },
        { t: 'h2', x: 'Pikkujoulut для персонала' },
        { t: 'p', x: 'По § 69 закона о подоходном налоге (TVL) не облагается налогом обычная и разумная льгота, которую работодатель предоставляет всему персоналу в виде организованного им отдыха или досуга. В инструкции Verohallinto отдельно названы pikkujoulut, праздники по случаю закрытия года и летние праздники: это обычный отдых сотрудников, если по стоимости и частоте они обычные и разумные. На празднике можно без налога угостить сотрудников и едой.' },
        { t: 'ul', items: [
          'Праздник — для всего персонала, а не только для части, например руководства. Нельзя исключать сотрудников со срочным договором и на неполной ставке. Краткосрочных временных работников, например рождественских помощников, можно не приглашать.',
          'Праздник организует работодатель: выбирает формат и место и оплачивает счёт. Если сотрудники выбирают и платят сами, а компания возмещает по чеку, это зарплата.',
          'Стоимость разумна и с учётом численности персонала. Лимита в евро для pikkujoulu Verohallinto не устанавливала. Оценка индивидуальная, и отдых сотрудников за год оценивается также в целом.',
          'Дорогу до места праздника и домой можно возместить по отчёту о дорожных расходах (matkalasku), если праздник проходит не на обычном месте работы.',
        ] },
        { t: 'p', x: 'Pikkujoulu в онлайн-формате тоже может быть безналоговым, и работодатель может заказать еду сотрудникам домой. Но если работодатель заменяет угощение на празднике подарочной картой в продуктовый магазин, ресторан или сервис доставки еды, такая карта — зарплата сотрудника.' },
        { t: 'h3', x: 'Супруги и члены семьи' },
        { t: 'p', x: 'В подоходном налоге участие супруга в обычном рождественском или летнем празднике может входить в безналоговую льготу, если льгота разумна и с учётом расходов на супруга. В НДС Verohallinto считает долю супругов и членов семьи сотрудников в расходах на праздник компании (в инструкции пример — юбилей компании) личным потреблением без права на вычет. На практике НДС за долю супругов к вычету не принимают.' },
        { t: 'h3', x: 'Вычет и НДС' },
        { t: 'p', x: 'Расходы на собственный персонал не являются представительскими и обычно полностью вычитаются. По судебной практике НДС с расходов на праздник для персонала может вычитаться как общие расходы в той части, в которой они относятся к деятельности с правом на вычет (KHO 2015:98). Если компания продаёт и услуги, освобождённые от НДС, вычет делают только в доле облагаемой деятельности.' },
        { t: 'h2', x: 'Toiminimi и праздник самого владельца' },
        { t: 'p', x: 'Предприниматель с toiminimi не может быть сам себе работником и не входит в персонал фирмы. Поэтому расходы на льготу для самого предпринимателя не вычитаются: «pikkujoulu» в одиночку или с семьёй — это личный расход. Если у toiminimi есть работники и предприниматель участвует в общем празднике для них, его доля тоже не образует для него облагаемой льготы.' },
        { t: 'p', x: 'В osakeyhtiö (Oy) ситуация другая. Акционер, который реально работает в компании, входит в персонал, даже если не получает зарплату, и может получать льготы без налога на тех же условиях, что и другие. По Verohallinto это верно и тогда, когда других работников нет или работают только члены семьи акционера. Но численность влияет на разумность: если общие расходы чрезмерны по отношению к числу участников, льгота не освобождается от налога. Но с подарками самому себе будьте осторожны: по Verohallinto освобождение подарка к юбилею (merkkipäivälahja) требует, чтобы подарок выбрал работодатель, и компания, где работает только владелец, не может сделать ему безналоговый подарок к юбилею. Та же логика, вероятно, относится и к рождественскому подарку, который единственный владелец выбирает себе сам.' },
        { t: 'p', x: 'Льгота, предоставленная только из-за статуса акционера, например не работающему в компании акционеру или члену его семьи, может считаться скрытыми дивидендами (peitelty osinko). Личные расходы владельца — не расходы компании.' },
        { t: 'h2', x: 'Рождественские подарки сотрудникам' },
        { t: 'p', x: 'Не облагается налогом небольшой подарок для всего персонала, полученный не деньгами (§ 69 TVL). По инструкции Verohallinto стоимость такого подарка — не более 100 евро. Если небольших подарков несколько в год, их общая стоимость — не более 100 евро.' },
        { t: 'ul', items: [
          'Подарок — выбранная работодателем вещь, билет, услуга или конкретизированная подарочная карта. Сотрудник может выбрать из вариантов, заданных работодателем.',
          'Деньги — всегда зарплата, даже если их называют рождественским подарком.',
          'Подарочная карта не облагается налогом, если она дана всему персоналу, стоит не более 100 евро, выписана на имя сотрудника, ограничена товаром или услугой определённого места (например, книга в конкретном книжном магазине или еда в определённом ресторане или сети) и не обменивается на деньги.',
          'Карта на весь ассортимент магазина или универмага не конкретизирована и поэтому является зарплатой.',
        ] },
        { t: 'p', x: 'Подарки персоналу — это расходы на персонал, а не представительские, поэтому в подоходном налоге они обычно вычитаются полностью. А вот НДС к вычету не принимается, если покупка идёт в личное пользование сотрудников, поэтому подарок учитывают в расходах по цене с НДС. Вещь, подаренная персоналу, не считается рекламным подарком, даже если на ней логотип компании.' },
        { t: 'p', x: 'Облагаемый подарок, например деньги или неконкретизированная карта, оформляется как зарплата: с него удерживают налог (ennakonpidätys) и сообщают о нём в реестр доходов (tulorekisteri).' },
        { t: 'h2', x: 'Подарки клиентам и партнёрам' },
        { t: 'p', x: 'Подарок клиенту в налогах — либо рекламный, либо представительский.' },
        { t: 'ul', items: [
          'Рекламный подарок (mainoslahja) — недорогой массовый подарок, который одновременно и одинаковым дарят многим получателям, часто с названием или логотипом компании. По Verohallinto обычным считается рекламный подарок с ценой покупки не более 50 евро с НДС. Обычные рекламные подарки вычитаются полностью (EVL § 8 ч. 1 п. 5), НДС с покупки можно принять к вычету, а за вручение не платится НДС на собственное потребление (AVL § 25).',
          'Представительский подарок (edustuslahja) выбирается индивидуально для получателя, например к юбилею делового партнёра. Представительские расходы вычитаются в подоходном налоге на 50 % (EVL § 8 ч. 1 п. 8), НДС к вычету не принимается (AVL § 114 ч. 1 п. 3).',
          'Алкоголь в подарок, как правило, — представительство. Исключением может быть собственная продукция, например мини-пивоварни или винодельни, если иначе выполнены условия рекламного подарка.',
        ] },
        { t: 'h2', x: 'Рождественское мероприятие для клиентов' },
        { t: 'p', x: 'Рождественский обед, ужин или праздник для клиентов и партнёров обычно является представительским мероприятием. В подоходном налоге вычитается 50 % расходов, а НДС со всех связанных расходов, например ресторана и представительских подарков, к вычету не принимается. Зарплата собственных сотрудников всё равно вычитается полностью (но их питание на мероприятии — представительский расход), даже если они участвуют.' },
        { t: 'p', x: 'Если на один праздник приглашены и персонал, и клиенты, доля внешних гостей обычно — представительство, а доля персонала — отдых. Сотрудники, присутствующие только ради клиентов, при этом не находятся на празднике для персонала. Отметьте в документе, как разделены расходы. Открытое рекламное мероприятие со свободным входом и лёгким угощением — это не представительство, а маркетинг.' },
        { t: 'h2', x: 'Бухгалтерия: отдельные счета и пометка на документе' },
        { t: 'p', x: 'По закону о бухгалтерском учёте (KPL, гл. 2 § 5) запись должна основываться на документе, подтверждающем операцию, а из документа о расходе должно быть видно, что приобретено. По одному ресторанному чеку не понять, на кого направлен расход, поэтому добавьте короткое пояснение. Оно пригодится и если Verohallinto задаст вопросы.' },
        { t: 'ul', items: [
          'Учитывайте расходы на разных счетах: отдых и подарки персоналу — в расходах на персонал, мероприятия и подарки клиентам — в представительских, рекламные подарки — в рекламных. Ограничение 50 % и невычитаемый НДС проще учесть, когда представительство на отдельном счёте.',
          'Укажите цель мероприятия и участников: персонал и сколько человек, были ли супруги, на мероприятии для клиентов — компании и люди.',
          'По подаркам: что подарено, кому или по какому списку получателей и цена за штуку.',
          'По подарочным картам: на чьё имя, чем ограничено использование и номинал.',
          'Выделите долю супругов и, на общем празднике, долю клиентов.',
        ] },
        { t: 'h2', x: 'Пример в евро' },
        { t: 'p', x: 'В Oy работают владелец и пять сотрудников. Компания продаёт только облагаемые НДС услуги.' },
        { t: 'ul', items: [
          'Pikkujoulu в ресторане для всего персонала: 6 × 95 € = 570 € (с НДС). Расходы на персонал вычитаются полностью, НДС из счёта принимается к вычету. Для сотрудников без налога, если праздник обычный и разумный.',
          'Подарок всем: один и тот же товар, выбранный компанией, 6 × 60 € = 360 €. Без налога, так как не дороже 100 евро и других небольших подарков в этом году нет. Расход 360 € вычитается полностью, НДС не вычитается.',
          'Клиентам 40 термокружек с логотипом по 20 € = 800 € (с НДС 25,5 %). Рекламный подарок: НДС 162,55 € принимается к вычету, а сумма без НДС 637,45 € полностью вычитается как расход.',
          'Двум ключевым клиентам по бутылке вина за 45 € = 90 €. Представительский подарок: НДС не вычитается, в подоходном налоге вычитается 45 €.',
          'Рождественский обед для четырёх клиентов и двух своих сотрудников: 6 × 80 € = 480 €. Представительское мероприятие: НДС не вычитается, в подоходном налоге вычитается 240 €.',
        ] },
        { t: 'p', x: 'Если бы вместо товара компания подарила карты на 150 евро на весь ассортимент универмага, каждая карта стала бы зарплатой сотрудника: с удержанием налога и сообщением в tulorekisteri.' },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Сотрудникам дарят деньги или карту на весь ассортимент магазина и считают это безналоговым подарком.',
          'Общая стоимость небольших подарков за год превышает 100 евро.',
          'Pikkujoulu устраивают только для части персонала, например для руководства.',
          'Предприниматель с toiminimi вычитает свой «pikkujoulu» в одиночку или с семьёй.',
          'Oy оплачивает праздник для семьи владельца и проводит его как отдых персонала.',
          'НДС с мероприятия для клиентов или с представительского подарка принимают к вычету.',
          'НДС с подарка сотрудникам принимают к вычету или учитывают подарок как рекламный расход.',
          'По чеку не видно, кто участвовал и зачем проводилось мероприятие.',
        ] },
        { t: 'note', x: 'Суммы в евро взяты из инструкций Verohallinto, а не из закона: небольшие подарки — не более 100 евро в год, обычный рекламный подарок — не более 50 евро с НДС. Лимита в евро для pikkujoulu нет. Общая ставка НДС — 25,5 %. Инструкция Verohallinto о льготах для персонала обновляется, но объявленное изменение касается льготы на спорт и культуру, а не подарков и праздников. Источники: TVL (1535/1992), EVL (360/1968), AVL (1501/1993), KPL (1336/1997) и Verohallinto.' },
        { t: 'h2', x: 'Поможем с расходами праздничного сезона' },
        { t: 'p', x: 'Tilitoimisto Debit Credit проведёт pikkujoulut, подарки персоналу, представительские расходы и рекламные подарки по правильным счетам, проверит вычеты НДС и оформит облагаемые подарки через расчёт зарплаты и отчёты в tulorekisteri. Наши клиенты могут отправлять чеки через приложение Vaavo. Мы работаем на финском и русском языках. Свяжитесь с нами ещё до праздников, и мы вместе разберём планы с точки зрения налогов.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Verohallinto: льготы для персонала в налогообложении (на финском)', href: SRC.staff },
          { label: 'Verohallinto: представительские расходы в подоходном налоге (на финском)', href: SRC.edustus },
          { label: 'Verohallinto: маркетинговые и представительские мероприятия в НДС (на финском)', href: SRC.alvEvents },
          { label: 'Verohallinto: НДС на собственное потребление (на финском)', href: SRC.alvOwnUse },
          { label: 'Verohallinto: вычет НДС по покупкам (на английском)', href: SRC.alvDeductEn },
          { label: 'Finlex: tuloverolaki 1535/1992 (на финском)', href: SRC.tvl },
          { label: 'Finlex: elinkeinoverolaki 360/1968 (на финском)', href: SRC.evl },
          { label: 'Finlex: arvonlisäverolaki 1501/1993 (на финском)', href: SRC.avl },
          { label: 'Finlex: kirjanpitolaki 1336/1997 (на финском)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Сколько может стоить pikkujoulu на человека, чтобы он не облагался налогом?', a: 'Лимита в евро Verohallinto не устанавливала. Праздник должен быть для всего персонала, организован работодателем и обычным и разумным по стоимости и частоте. Разумность оценивают и с учётом численности персонала, и по всему отдыху сотрудников за год.' },
        { q: 'Насколько дорогой подарок можно сделать сотруднику без налога?', a: 'Небольшой подарок — не более 100 евро, а если подарков несколько в год, их общая стоимость — не более 100 евро. Подарок должен быть не деньгами и для всего персонала.' },
        { q: 'Облагается ли налогом подарочная карта сотруднику?', a: 'Нет, если она дана всему персоналу, стоит не более 100 евро, выписана на имя сотрудника, ограничена товаром или услугой определённого места и не обменивается на деньги. Карта на весь ассортимент магазина — это зарплата.' },
        { q: 'Может ли предприниматель с toiminimi вычесть свой pikkujoulu?', a: 'Нет. Предприниматель с toiminimi не входит в персонал фирмы, поэтому расходы на льготу для него самого не вычитаются. Если он участвует в празднике, устроенном для его работников, его доля не образует облагаемой льготы.' },
        { q: 'Можно ли вычесть НДС с подарка клиенту?', a: 'С обычного рекламного подарка (не более 50 евро с НДС, массовый, часто с логотипом) — да. С представительского подарка, например выбранного индивидуально или алкоголя, — нет, а в подоходном налоге из него вычитается 50 %.' },
      ],
    },
    en: {
      title: 'Christmas parties and gifts in a Finnish company: tax, VAT and bookkeeping',
      description:
        'Pikkujoulut and Christmas gifts in Finland: when they are tax-free for employees, what the company can deduct, how VAT works and how to book the costs.',
      lead: 'In November and December, companies hold pikkujoulut, the Finnish pre-Christmas parties, and buy gifts for employees and customers. For tax purposes one question decides everything: who the cost is for — your own staff, your customers or the business owner. We have collected the rules from the law and the Finnish Tax Administration’s guidance, the most common mistakes and a worked example in euros.',
      body: [
        { t: 'h2', x: 'First: who is the cost for?' },
        { t: 'p', x: 'The same restaurant bill can mean three different things for tax. A pikkujoulu for staff is staff recreation (virkistystoiminta), an event for customers is entertainment (edustus), and a logo item handed out to customers can be an advertising gift (mainoslahja). The difference shows in both income tax and VAT.' },
        { t: 'ul', items: [
          'Staff cost (staff recreation and gifts): usually fully deductible in income tax.',
          'Entertainment expense (customers and business partners): 50 % deductible, and the VAT cannot be deducted.',
          'Advertising gift (customary low-value mass gift): fully deductible, and the VAT on the purchase can be deducted.',
        ] },
        { t: 'h2', x: 'Christmas parties for staff' },
        { t: 'p', x: 'Under section 69 of the Income Tax Act (TVL), a customary and reasonable benefit that all staff receive from recreational or leisure activities arranged by the employer is not taxable income. The Tax Administration’s guidance names pikkujoulu parties, year-end and summer parties specifically: they are customary recreation if their cost and frequency are customary and reasonable. Employees can also be served a meal at the party tax-free.' },
        { t: 'ul', items: [
          'The party is for all staff, not only some of them, such as management. Fixed-term and part-time employees may not be left out. Short-term temporary workers, such as extra Christmas helpers, may.',
          'The employer arranges the party: it chooses the format and the venue and pays the bill. If employees choose and pay themselves and the company reimburses them against receipts, the reimbursement is salary.',
          'The cost is reasonable also in relation to the number of staff. The Tax Administration has set no euro limit for a pikkujoulu. It is assessed case by case, and the year’s recreation is also assessed as a whole.',
          'Travel to the venue and home can be reimbursed against a travel expense claim if the party is held somewhere other than the usual workplace.',
        ] },
        { t: 'p', x: 'An online pikkujoulu can also be tax-free, and the employer can order food to the employees’ homes. If, however, the employer replaces the party meal with a gift card to a grocery store, restaurant or food delivery service, the gift card is the employee’s salary.' },
        { t: 'h3', x: 'Spouses and family members' },
        { t: 'p', x: 'In income tax, a spouse’s participation in a customary Christmas or summer party can be part of the tax-free benefit if the benefit is reasonable even with the spouse’s costs included. In VAT, the Tax Administration treats the share of the company celebration costs attributable to employees’ spouses and family members (its example is a company anniversary) as private consumption that cannot be deducted. In practice, the VAT on the spouses’ share is not deducted.' },
        { t: 'h3', x: 'Deduction and VAT' },
        { t: 'p', x: 'Costs aimed at your own staff are not entertainment expenses and are usually fully deductible. Under case law, VAT on staff recreation events can be deductible as general costs to the extent they relate to business that carries a right of deduction (KHO 2015:98). If the company also sells VAT-exempt services, the deduction is made only for the share of the taxable business.' },
        { t: 'h2', x: 'Sole traders and the owner’s own party' },
        { t: 'p', x: 'A sole trader (toiminimi) cannot be their own employee and is not part of the firm’s staff. The costs of a staff benefit arranged for the entrepreneur personally are therefore not deductible: a “pikkujoulu” alone or with family is a private expense. If the sole trader has employees and takes part in the joint party arranged for them, their share does not create a taxable benefit for them either.' },
        { t: 'p', x: 'In a limited company (osakeyhtiö, Oy) the situation is different. A shareholder who actually works in the company is part of the staff even without drawing a salary, and can receive staff benefits tax-free on the same terms as others. According to the Tax Administration, this applies even when there are no other employees or only the shareholder’s family members work there. The headcount still affects what is reasonable: if the total cost is unreasonably high in relation to the number of people, the benefit is not tax-free. Be careful with gifts to yourself, though: the Tax Administration states that a tax-free milestone gift (merkkipäivälahja) must be chosen by the employer, and that a company in which only its owner works cannot give the owner a tax-free milestone gift. The same logic is likely to apply to a Christmas gift that a sole owner picks for themselves.' },
        { t: 'p', x: 'A benefit given purely because of share ownership, for example to a shareholder who does not work in the company or to a shareholder’s family member, can be a hidden dividend (peitelty osinko). The owner’s private expenses are not company expenses.' },
        { t: 'h2', x: 'Christmas gifts to employees' },
        { t: 'p', x: 'A small gift given to all staff in a form other than money is tax-free (TVL section 69). Under the Tax Administration’s guidance, a small gift may be worth at most €100. If several small gifts are given in a year, their combined value may be at most €100.' },
        { t: 'ul', items: [
          'The gift is an item, ticket, service or specified gift card chosen by the employer. The employee may choose from options set by the employer.',
          'Money is always salary, even if it is called a Christmas gift.',
          'A gift card is tax-free when it is given to all staff, is worth at most €100, is issued in the employee’s name, is limited to a product or service from a particular place (for example a book from a given bookshop or a meal at a given restaurant or chain) and cannot be exchanged for cash.',
          'A gift card for a shop’s or department store’s entire range is not specified and is therefore the employee’s salary.',
        ] },
        { t: 'p', x: 'Gifts to staff are staff costs, not entertainment, so they are usually fully deductible in income tax. The VAT, however, cannot be deducted when the purchase goes to the employees’ private use, so the gift is booked as an expense at its VAT-inclusive price. Goods given to staff are not advertising gifts, even if they carry the company logo.' },
        { t: 'p', x: 'A taxable gift, such as cash or an unspecified gift card, is processed as salary: tax is withheld (ennakonpidätys) and it is reported to the Incomes Register (tulorekisteri).' },
        { t: 'h2', x: 'Christmas gifts to customers and business partners' },
        { t: 'p', x: 'For tax purposes, a gift to a customer is either an advertising gift or an entertainment gift.' },
        { t: 'ul', items: [
          'An advertising gift (mainoslahja) is a low-value mass gift given at the same time and in the same form to many recipients, often with the company’s name or logo. According to the Tax Administration, an advertising gift whose purchase price including VAT is at most €50 can be considered customary. Customary advertising gifts are fully deductible (EVL section 8(1)(5)), the VAT on the purchase can be deducted, and no VAT on own use is due when they are handed out (AVL section 25).',
          'An entertainment gift (edustuslahja) is chosen more individually with the recipient in mind, for example for a business partner’s anniversary. Entertainment expenses are 50 % deductible in income tax (EVL section 8(1)(8)), and the VAT cannot be deducted (AVL section 114(1)(3)).',
          'Gifts of alcohol are as a rule entertainment. An exception can be, for example, a microbrewery’s or winery’s own products, if the conditions for an advertising gift are otherwise met.',
        ] },
        { t: 'h2', x: 'A Christmas event for customers' },
        { t: 'p', x: 'A Christmas lunch, dinner or party for customers and business partners is usually an entertainment event. In income tax, 50 % of the costs are deductible, and the VAT on all costs related to the event, such as the restaurant and entertainment gifts, cannot be deducted. Your own employees’ salaries remain fully deductible (their meals at the event are, however, entertainment expenses) even if they take part.' },
        { t: 'p', x: 'If both staff and customers are invited to the same party, the external guests’ share is usually entertainment and the staff’s share recreation. Employees who are there only to host the customers are not at a recreational event, though. Note on the voucher how the costs were split. An open advertising event with free entry and light refreshments is not entertainment but marketing.' },
        { t: 'h2', x: 'Bookkeeping: separate accounts and a note on the voucher' },
        { t: 'p', x: 'Under the Accounting Act (KPL chapter 2, section 5), every entry must be based on a voucher that verifies the transaction, and an expense voucher must show what was acquired. A restaurant receipt alone does not show who the cost was for, so add a short explanation. It also helps if the Tax Administration asks about the costs.' },
        { t: 'ul', items: [
          'Book the costs to different accounts: staff recreation and gifts to staff costs, customer events and entertainment gifts to entertainment costs, advertising gifts to advertising costs. The 50 % limit and the non-deductible VAT are easy to handle when entertainment has its own account.',
          'Note the purpose of the event and the participants: staff and how many people, any spouses, and at a customer event the companies and people.',
          'For gifts: what was given, to whom or according to which recipient list, and the unit price.',
          'For gift cards: whose name the card is in, what it is limited to, and its value.',
          'Separate the spouses’ share and, at a joint party, the customers’ share.',
        ] },
        { t: 'h2', x: 'Worked example in euros' },
        { t: 'p', x: 'A limited company employs its owner and five employees. It sells only services subject to VAT.' },
        { t: 'ul', items: [
          'Pikkujoulu at a restaurant for all staff: 6 × €95 = €570 (incl. VAT). A staff cost, fully deductible, and the VAT on the bill is deducted. Tax-free for the employees if the party is customary and reasonable.',
          'A gift for everyone: the same product chosen by the company, 6 × €60 = €360. Tax-free because it is at most €100 and no other small gifts are given in the same year. The €360 cost is fully deductible; no VAT is deducted.',
          'For customers, 40 logo thermos mugs at €20 = €800 (incl. 25.5 % VAT). Advertising gift: the VAT of €162.55 is deducted, and the net price of €637.45 is a fully deductible cost.',
          'A bottle of wine for two key customers at €45 = €90. Entertainment gift: no VAT deduction, and €45 is deductible in income tax.',
          'Christmas lunch for four customers and two of the company’s employees: 6 × €80 = €480. Entertainment event: no VAT deduction, and €240 is deductible in income tax.',
        ] },
        { t: 'p', x: 'If the company gave €150 gift cards for a department store’s entire range instead of the product, each card would be the employee’s salary, with tax withheld and a report to the Incomes Register.' },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'Employees are given cash or a gift card for a shop’s entire range as a Christmas gift, and it is treated as tax-free.',
          'The combined value of small gifts exceeds €100 in a year.',
          'The pikkujoulu is held for only part of the staff, such as the management team.',
          'A sole trader deducts their own “pikkujoulu” spent alone or with family.',
          'A limited company pays for a party for the owner’s family and books it as staff recreation.',
          'The VAT on a customer event or an entertainment gift is deducted.',
          'The VAT on a staff Christmas gift is deducted, or the gift is booked as an advertising cost.',
          'The receipt does not show who attended and why the event was held.',
        ] },
        { t: 'note', x: 'The euro amounts come from the Tax Administration’s guidance, not from the law: small gifts at most €100 a year, and a customary advertising gift at most €50 incl. VAT. There is no euro limit for a pikkujoulu. The standard VAT rate is 25.5 %. The Tax Administration’s guidance on staff benefits is being updated, but the announced change concerns the sports and culture benefit, not gifts or parties. Sources: Income Tax Act (1535/1992), Business Income Tax Act (360/1968), VAT Act (1501/1993), Accounting Act (1336/1997) and the Tax Administration.' },
        { t: 'h2', x: 'We help with the costs of the party season' },
        { t: 'p', x: 'Tilitoimisto Debit Credit books pikkujoulut, staff gifts, entertainment and advertising gifts to the right accounts, checks the VAT deductions and processes taxable gifts through payroll and Incomes Register reports. Our clients can send their receipts through the Vaavo app. We work in Finnish and Russian. Get in touch before the parties, and we will go through your plans from a tax point of view.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Tax Administration: staff benefits in taxation (in Finnish)', href: SRC.staff },
          { label: 'Tax Administration: entertainment expenses in income taxation (in Finnish)', href: SRC.edustus },
          { label: 'Tax Administration: marketing and entertainment events in VAT (in Finnish)', href: SRC.alvEvents },
          { label: 'Tax Administration: VAT on own use (in Finnish)', href: SRC.alvOwnUse },
          { label: 'Tax Administration: deducting VAT on purchases', href: SRC.alvDeductEn },
          { label: 'Finlex: Income Tax Act 1535/1992 (in Finnish)', href: SRC.tvl },
          { label: 'Finlex: Business Income Tax Act 360/1968 (in Finnish)', href: SRC.evl },
          { label: 'Finlex: VAT Act 1501/1993 (in Finnish)', href: SRC.avl },
          { label: 'Finlex: Accounting Act 1336/1997 (in Finnish)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'How much can a pikkujoulu cost per person and still be tax-free?', a: 'The Tax Administration has set no euro limit. The party must be for all staff, arranged by the employer, and customary and reasonable in cost and frequency. Reasonableness is also assessed against the number of staff and the year’s recreation as a whole.' },
        { q: 'How valuable a Christmas gift can an employee receive tax-free?', a: 'A small gift may be worth at most €100, and if several gifts are given in a year, their combined value may be at most €100. The gift must not be money and must be given to all staff.' },
        { q: 'Is a gift card to an employee tax-free?', a: 'Yes, if it is given to all staff, is worth at most €100, is in the employee’s name, is limited to a product or service from a particular place and cannot be exchanged for cash. A gift card for a shop’s entire range is salary.' },
        { q: 'Can a sole trader deduct their own Christmas party?', a: 'No. A sole trader is not part of the firm’s staff, so the costs of a benefit arranged for them personally are not deductible. If they join a party arranged for their employees, their share does not create a taxable benefit.' },
        { q: 'Can I deduct the VAT on a gift to a customer?', a: 'For a customary advertising gift (at most €50 incl. VAT, a mass gift often carrying your logo), yes. For an entertainment gift, such as an individually chosen gift or alcohol, no — and only 50 % of it is deductible in income tax.' },
      ],
    },
    et: {
      title: 'Pikkujoulud ja jõulukingid Soome ettevõttes: maksud, käibemaks ja raamatupidamine',
      description:
        'Pikkujoulud ja jõulukingid Soomes: millal on need töötajale maksuvabad, mida ettevõte saab maha arvata, kuidas toimib käibemaks ja kuidas kulusid kirjendada.',
      lead: 'Novembris ja detsembris korraldavad Soome ettevõtted pikkujoulusid ehk jõulueelseid pidusid ning ostavad kingitusi töötajatele ja klientidele. Maksustamisel otsustab üks küsimus: kellele kulu on suunatud — oma töötajatele, klientidele või ettevõtjale endale. Kogusime kokku seaduse ja Soome maksuameti (Verohallinto) juhiste reeglid, levinumad vead ja näite eurodes.',
      body: [
        { t: 'h2', x: 'Kõigepealt: kellele kulu on suunatud?' },
        { t: 'p', x: 'Sama restoraniarve võib maksustamisel tähendada kolme eri asja. Töötajatele korraldatud pikkujoulu on töötajate meelelahutus (virkistystoiminta), klientidele korraldatud üritus on esinduskulu (edustus) ja klientidele jagatud logoga ese võib olla reklaamkingitus (mainoslahja). Erinevus mõjutab nii tulumaksu kui ka käibemaksu.' },
        { t: 'ul', items: [
          'Personalikulu (töötajate meelelahutus ja kingitused): tulumaksus tavaliselt täielikult mahaarvatav.',
          'Esinduskulu (kliendid ja äripartnerid): tulumaksus arvatakse maha 50 % ja käibemaksu maha arvata ei saa.',
          'Reklaamkingitus (tavapärane väikese väärtusega masskingitus): täielikult mahaarvatav ja ostu käibemaksu saab maha arvata.',
        ] },
        { t: 'h2', x: 'Pikkujoulud töötajatele' },
        { t: 'p', x: 'Soome tulumaksuseaduse (TVL) § 69 järgi ei ole maksustatav tulu tavapärane ja mõistlik soodustus, mille kogu personal saab tööandja korraldatud meelelahutus- või vaba aja tegevusest. Verohallinto juhises on eraldi nimetatud pikkujoulud, majandusaasta lõpu peod ja suvepeod: need on tavapärane meelelahutus, kui nende kulu ja sagedus on tavapärased ja mõistlikud. Peol võib töötajaid maksuvabalt ka toitlustada.' },
        { t: 'ul', items: [
          'Pidu on kogu personalile, mitte ainult osale, näiteks juhtkonnale. Tähtajalisi ja osalise ajaga töötajaid ei tohi välja jätta. Lühiajalisi ajutisi töötajaid, näiteks jõulude abijõude, võib.',
          'Peo korraldab tööandja: valib vormi ja koha ning maksab arve. Kui töötajad valivad ja maksavad ise ning ettevõte hüvitab tšeki alusel, on hüvitis palk.',
          'Kulu on mõistlik ka töötajate arvu suhtes. Verohallinto ei ole pikkujoulule eurolist piiri kehtestanud. Hinnang antakse juhtumipõhiselt ja aasta meelelahutust hinnatakse ka tervikuna.',
          'Sõidu peopaika ja koju võib hüvitada sõidukuluaruande alusel, kui pidu toimub mujal kui tavalisel töökohal.',
        ] },
        { t: 'p', x: 'Ka veebis peetud pikkujoulu võib olla maksuvaba ja tööandja võib tellida töötajatele toidu koju. Kui tööandja aga asendab peo toitlustuse kinkekaardiga toidupoodi, restorani või toidukullerteenusesse, on kinkekaart töötaja palk.' },
        { t: 'h3', x: 'Abikaasad ja pereliikmed' },
        { t: 'p', x: 'Tulumaksus võib abikaasa osalemine tavapärasel jõulu- või suvepeol kuuluda maksuvaba soodustuse hulka, kui soodustus on mõistlik ka abikaasa kulusid arvestades. Käibemaksus käsitab Verohallinto töötajate abikaasade ja pereliikmete osa ettevõtte peo kuludest (juhise näide on ettevõtte juubel) mahaarvamatu eratarbimisena. Praktikas abikaasade osa käibemaksu maha ei arvata.' },
        { t: 'h3', x: 'Mahaarvamine ja käibemaks' },
        { t: 'p', x: 'Oma töötajatele suunatud kulud ei ole esinduskulud ja on ettevõttele tavaliselt täielikult mahaarvatavad. Kohtupraktika järgi võib töötajate meelelahutusürituse kulude käibemaks olla mahaarvatav üldkuluna osas, mis on seotud mahaarvamisõigust andva äritegevusega (KHO 2015:98). Kui ettevõte müüb ka käibemaksuvabu teenuseid, arvatakse maha ainult maksustatava tegevuse osa.' },
        { t: 'h2', x: 'Füüsilisest isikust ettevõtja ja omaniku enda pidu' },
        { t: 'p', x: 'Soome FIE (toiminimi) ei saa olla iseenda töötaja ega kuulu ettevõtte personali. Seetõttu ei ole ettevõtjale endale korraldatud soodustuse kulud mahaarvatavad: üksi või perega peetud „pikkujoulu” on erakulu. Kui FIE-l on töötajad ja ettevõtja osaleb neile korraldatud ühisel peol, ei teki ka tema osast talle maksustatavat soodustust.' },
        { t: 'p', x: 'Osaühingus (osakeyhtiö, Oy) on olukord teine. Osanik, kes ühingus tegelikult töötab, kuulub personali ka siis, kui ta palka ei võta, ja võib saada personalisoodustusi maksuvabalt samadel tingimustel kui teised. Verohallinto järgi kehtib see ka ühingus, kus teisi töötajaid ei ole või töötavad ainult osaniku pereliikmed. Töötajate arv mõjutab siiski mõistlikkust: kui kogukulu on osalejate arvu suhtes ebamõistlikult suur, ei ole soodustus maksuvaba. Kingitustega iseendale ole siiski ettevaatlik: Verohallinto järgi eeldab tähtpäevakingituse (merkkipäivälahja) maksuvabadus, et kingituse on valinud tööandja, ning ühing, kus töötab ainult omanik, ei saa anda omanikule maksuvaba tähtpäevakingitust. Sama loogika kehtib tõenäoliselt ka jõulukingi puhul, mille ainuomanik endale ise valib.' },
        { t: 'p', x: 'Ainult osaluse alusel antud soodustus, näiteks ühingus mitte töötavale osanikule või osaniku pereliikmele, võib olla varjatud dividend (peitelty osinko). Omaniku erakulud ei ole ettevõtte kulud.' },
        { t: 'h2', x: 'Jõulukingid töötajatele' },
        { t: 'p', x: 'Maksuvaba on kogu personalile antud väike kingitus, mis ei ole raha (TVL § 69). Verohallinto juhise järgi võib väikese kingituse väärtus olla kuni 100 eurot. Kui väikesi kingitusi antakse aastas mitu, võib nende koguväärtus olla kuni 100 eurot.' },
        { t: 'ul', items: [
          'Kingitus on tööandja valitud ese, pilet, teenus või täpsustatud kinkekaart. Töötaja võib valida tööandja määratud valikute hulgast.',
          'Raha on alati palk, isegi kui seda nimetatakse jõulukingiks.',
          'Kinkekaart on maksuvaba, kui see antakse kogu personalile, selle väärtus on kuni 100 eurot, see on töötaja nimel, kasutus on piiratud kindla koha toote või teenusega (näiteks raamat kindlast raamatupoest või eine kindlas restoranis või ketis) ja seda ei saa rahaks vahetada.',
          'Kinkekaart poe või kaubamaja kogu sortimendile ei ole täpsustatud ja on seetõttu töötaja palk.',
        ] },
        { t: 'p', x: 'Töötajate kingitused on personalikulud, mitte esinduskulud, seega on need tulumaksus tavaliselt täielikult mahaarvatavad. Käibemaksu aga maha arvata ei saa, kui ost läheb töötajate eratarbimiseks, nii et kingitus kirjendatakse kuluks käibemaksuga hinnas. Töötajatele antud ese ei ole reklaamkingitus, isegi kui sellel on ettevõtte logo.' },
        { t: 'p', x: 'Maksustatavat kingitust, näiteks raha või täpsustamata kinkekaarti, käsitletakse palgana: sellelt peetakse kinni maks (ennakonpidätys) ja see deklareeritakse Soome tulude registrisse (tulorekisteri).' },
        { t: 'h2', x: 'Jõulukingid klientidele ja äripartneritele' },
        { t: 'p', x: 'Kliendile antud kingitus on maksustamisel kas reklaamkingitus või esinduskingitus.' },
        { t: 'ul', items: [
          'Reklaamkingitus (mainoslahja) on väikese väärtusega masskingitus, mis antakse samal ajal ja ühesugusena paljudele saajatele, sageli ettevõtte nime või logoga. Verohallinto järgi võib tavapäraseks pidada reklaamkingitust, mille ostuhind koos käibemaksuga on kuni 50 eurot. Tavapärased reklaamkingitused on täielikult mahaarvatavad (EVL § 8 lg 1 p 5), ostu käibemaksu saab maha arvata ja kingituse andmiselt ei tasuta omatarbe käibemaksu (AVL § 25).',
          'Esinduskingitus (edustuslahja) valitakse saajat silmas pidades individuaalsemalt, näiteks äripartneri juubeliks. Esinduskuludest arvatakse tulumaksus maha 50 % (EVL § 8 lg 1 p 8) ja käibemaksu maha arvata ei saa (AVL § 114 lg 1 p 3).',
          'Alkoholikingitused on üldjuhul esindus. Erandiks võivad olla näiteks väikepruulikoja või veinitalu enda tooted, kui reklaamkingituse tingimused on muidu täidetud.',
        ] },
        { t: 'h2', x: 'Klientide jõuluüritus' },
        { t: 'p', x: 'Klientidele ja äripartneritele korraldatud jõululõuna, -õhtusöök või -pidu on tavaliselt esindusüritus. Tulumaksus arvatakse kuludest maha 50 % ja kõigi üritusega seotud kulude käibemaks on mahaarvamatu, näiteks restoranikulud ja esinduskingitused. Oma töötajate palgad on siiski täielikult mahaarvatavad (nende toitlustus üritusel on aga esinduskulu), isegi kui nad üritusel osalevad.' },
        { t: 'p', x: 'Kui samale peole kutsutakse nii töötajad kui ka kliendid, on väliste külaliste osa tavaliselt esindus ja töötajate osa meelelahutus. Töötajad, kes on kohal ainult klientide pärast, ei ole aga meelelahutusüritusel. Märgi dokumendile, kuidas kulud jagati. Avatud reklaamüritus, kuhu klientidel on vaba juurdepääs ja kus pakutakse kerget kostitust, ei ole esindus, vaid turundus.' },
        { t: 'h2', x: 'Raamatupidamine: eraldi kontod ja märge dokumendile' },
        { t: 'p', x: 'Soome raamatupidamisseaduse (KPL 2. ptk § 5) järgi peab kirje põhinema tehingut tõendaval dokumendil ja kuludokumendist peab nähtuma, mida soetati. Restoranitšekist üksi ei selgu, kellele kulu oli suunatud, seega lisa lühike selgitus. See aitab ka siis, kui Verohallinto kulude kohta küsib.' },
        { t: 'ul', items: [
          'Kirjenda kulud eri kontodele: töötajate meelelahutus ja kingitused personalikuludesse, kliendiüritused ja esinduskingitused esinduskuludesse, reklaamkingitused reklaamikuludesse. 50 % piirangut ja mahaarvamatut käibemaksu on lihtne hallata, kui esindusel on oma konto.',
          'Märgi ürituse eesmärk ja osalejad: töötajad ja mitu inimest, kas osalesid abikaasad, kliendiüritusel ettevõtted ja inimesed.',
          'Kingituste kohta: mida kingiti, kellele või millise saajate nimekirja alusel ja tükihind.',
          'Kinkekaartide kohta: kelle nimele kaart anti, millega kasutus on piiratud ja nimiväärtus.',
          'Too eraldi välja abikaasade osa ja ühisel peol klientide osa.',
        ] },
        { t: 'h2', x: 'Näide eurodes' },
        { t: 'p', x: 'Osaühingus töötavad omanik ja viis töötajat. Ühing müüb ainult käibemaksuga maksustatavaid teenuseid.' },
        { t: 'ul', items: [
          'Pikkujoulu restoranis kogu personalile: 6 × 95 € = 570 € (koos käibemaksuga). Personalikulu, mis arvatakse täielikult maha, ja arve käibemaks arvatakse maha. Töötajatele maksuvaba, kui pidu on tavapärane ja mõistlik.',
          'Kingitus kõigile: sama ühingu valitud toode, 6 × 60 € = 360 €. Maksuvaba, sest väärtus on kuni 100 eurot ja samal aastal teisi väikesi kingitusi ei anta. Kulu 360 € arvatakse täielikult maha, käibemaksu maha ei arvata.',
          'Klientidele 40 logoga termostassi à 20 € = 800 € (koos käibemaksuga 25,5 %). Reklaamkingitus: käibemaks 162,55 € arvatakse maha ja käibemaksuta hind 637,45 € on täielikult mahaarvatav kulu.',
          'Kahele võtmekliendile pudel veini à 45 € = 90 €. Esinduskingitus: käibemaksu maha ei arvata ja tulumaksus arvatakse maha 45 €.',
          'Jõululõuna neljale kliendile ja kahele oma töötajale: 6 × 80 € = 480 €. Esindusüritus: käibemaksu maha ei arvata ja tulumaksus arvatakse maha 240 €.',
        ] },
        { t: 'p', x: 'Kui ühing annaks toote asemel 150-eurosed kinkekaardid kaubamaja kogu sortimendile, oleks iga kaart töötaja palk, millelt peetakse kinni maks ja mis deklareeritakse tulorekisterisse.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Töötajatele antakse jõulukingiks raha või kinkekaart poe kogu sortimendile ja seda peetakse maksuvabaks.',
          'Väikeste kingituste koguväärtus ületab aastas 100 eurot.',
          'Pikkujoulu korraldatakse ainult osale personalist, näiteks juhtkonnale.',
          'FIE arvab maha oma üksi või perega peetud „pikkujoulu”.',
          'Osaühing maksab omaniku pere peo eest ja kirjendab selle töötajate meelelahutuseks.',
          'Kliendiürituse või esinduskingituse käibemaks arvatakse maha.',
          'Töötajate jõulukingi käibemaks arvatakse maha või kingitus kirjendatakse reklaamikuluks.',
          'Tšekist ei nähtu, kes üritusel osalesid ja miks see korraldati.',
        ] },
        { t: 'note', x: 'Eurosummad pärinevad Verohallinto juhistest, mitte seadusest: väikesed kingitused kuni 100 eurot aastas ja tavapärane reklaamkingitus kuni 50 eurot koos käibemaksuga. Pikkujoulule eurolist piiri ei ole. Soome üldine käibemaksumäär on 25,5 %. Verohallinto personalisoodustuste juhist uuendatakse, kuid teatatud muudatus puudutab spordi- ja kultuurisoodustust, mitte kingitusi ega pidusid. Allikad: TVL (1535/1992), EVL (360/1968), AVL (1501/1993), KPL (1336/1997) ja Verohallinto.' },
        { t: 'h2', x: 'Aitame pidudehooaja kuludega' },
        { t: 'p', x: 'Tilitoimisto Debit Credit kirjendab pikkujoulud, töötajate kingitused, esinduskulud ja reklaamkingitused õigetele kontodele, kontrollib käibemaksu mahaarvamisi ning käsitleb maksustatavad kingitused palgaarvestuses ja tulorekisteri deklaratsioonides. Meie kliendid saavad saata kuludokumendid Vaavo rakenduse kaudu. Teenindame soome ja vene keeles. Võta ühendust juba enne pidusid, siis vaatame plaanid maksude seisukohast koos läbi.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Verohallinto: personalisoodustused maksustamisel (soome keeles)', href: SRC.staff },
          { label: 'Verohallinto: esinduskulud tulumaksustamisel (soome keeles)', href: SRC.edustus },
          { label: 'Verohallinto: turundus- ja esindusüritused käibemaksus (soome keeles)', href: SRC.alvEvents },
          { label: 'Verohallinto: omatarbe käibemaks (soome keeles)', href: SRC.alvOwnUse },
          { label: 'Verohallinto: ostude käibemaksu mahaarvamine (inglise keeles)', href: SRC.alvDeductEn },
          { label: 'Finlex: tulumaksuseadus 1535/1992 (soome keeles)', href: SRC.tvl },
          { label: 'Finlex: ettevõtlustulu maksustamise seadus 360/1968 (soome keeles)', href: SRC.evl },
          { label: 'Finlex: käibemaksuseadus 1501/1993 (soome keeles)', href: SRC.avl },
          { label: 'Finlex: raamatupidamisseadus 1336/1997 (soome keeles)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Kui palju võib pikkujoulu inimese kohta maksta, et see oleks maksuvaba?', a: 'Verohallinto ei ole eurolist piiri kehtestanud. Pidu peab olema kogu personalile, tööandja korraldatud ning kulult ja sageduselt tavapärane ja mõistlik. Mõistlikkust hinnatakse ka töötajate arvu ja kogu aasta meelelahutuse suhtes.' },
        { q: 'Kui väärtusliku jõulukingi võib töötajale maksuvabalt anda?', a: 'Väikese kingituse väärtus võib olla kuni 100 eurot ja kui kingitusi antakse aastas mitu, võib nende koguväärtus olla kuni 100 eurot. Kingitus ei tohi olla raha ja see tuleb anda kogu personalile.' },
        { q: 'Kas kinkekaart töötajale on maksuvaba?', a: 'Jah, kui see antakse kogu personalile, on kuni 100 eurot, töötaja nimel, piiratud kindla koha toote või teenusega ja seda ei saa rahaks vahetada. Kinkekaart poe kogu sortimendile on palk.' },
        { q: 'Kas FIE võib oma pikkujoulu maha arvata?', a: 'Ei. FIE ei kuulu ettevõtte personali, seega ei ole talle endale korraldatud soodustuse kulud mahaarvatavad. Kui ta osaleb oma töötajatele korraldatud peol, ei teki tema osast maksustatavat soodustust.' },
        { q: 'Kas kliendile antud kingituse käibemaksu saab maha arvata?', a: 'Tavapärase reklaamkingituse (kuni 50 eurot koos käibemaksuga, masskingitus sageli logoga) puhul jah. Esinduskingituse, näiteks individuaalselt valitud kingi või alkoholi puhul ei, ja tulumaksus arvatakse sellest maha 50 %.' },
      ],
    },
    uk: {
      title: 'Pikkujoulut і різдвяні подарунки в компанії: податки, ПДВ і бухгалтерія',
      description:
        'Pikkujoulut і різдвяні подарунки: коли вони не оподатковуються для працівника, що компанія може відняти, як працює ПДВ і як облікувати витрати.',
      lead: 'У листопаді й грудні компанії влаштовують pikkujoulut — передріздвяні свята — і купують подарунки працівникам і клієнтам. Для податків вирішальне одне питання: на кого спрямована витрата — на власний персонал, на клієнтів чи на самого підприємця. Ми зібрали правила закону та інструкцій Verohallinto, поширені помилки й приклад у євро.',
      body: [
        { t: 'h2', x: 'Спочатку: на кого спрямована витрата?' },
        { t: 'p', x: 'Той самий ресторанний рахунок у податках може означати три різні речі. Pikkujoulu для персоналу — це відпочинок працівників (virkistystoiminta), захід для клієнтів — представницькі витрати (edustus), а сувенір з логотипом для клієнтів може бути рекламним подарунком (mainoslahja). Різниця видна і в податку на доходи, і в ПДВ.' },
        { t: 'ul', items: [
          'Витрати на персонал (відпочинок і подарунки працівникам): зазвичай повністю віднімаються в податку на доходи.',
          'Представницькі витрати (клієнти й ділові партнери): віднімається 50 %, ПДВ до вирахування не приймається.',
          'Рекламний подарунок (звичайний недорогий масовий подарунок): віднімається повністю, ПДВ із покупки можна прийняти до вирахування.',
        ] },
        { t: 'h2', x: 'Pikkujoulut для персоналу' },
        { t: 'p', x: 'За § 69 закону про податок на доходи (TVL) не оподатковується звичайна й розумна пільга, яку весь персонал отримує від організованого роботодавцем відпочинку чи дозвілля. В інструкції Verohallinto окремо названо pikkujoulut, свята з нагоди закриття року та літні свята: це звичайний відпочинок працівників, якщо за вартістю й частотою вони звичайні й розумні. На святі працівників можна без податку також нагодувати.' },
        { t: 'ul', items: [
          'Свято — для всього персоналу, а не лише для частини, наприклад керівництва. Не можна виключати працівників зі строковим договором і на неповній ставці. Короткострокових тимчасових працівників, як-от різдвяних помічників, можна не запрошувати.',
          'Свято організовує роботодавець: обирає формат і місце та оплачує рахунок. Якщо працівники обирають і платять самі, а компанія відшкодовує за чеком, це зарплата.',
          'Вартість розумна й з урахуванням кількості персоналу. Ліміту в євро для pikkujoulu Verohallinto не встановлювала. Оцінка індивідуальна, і відпочинок працівників за рік оцінюється також загалом.',
          'Дорогу до місця свята й додому можна відшкодувати за звітом про дорожні витрати (matkalasku), якщо свято відбувається не на звичайному місці роботи.',
        ] },
        { t: 'p', x: 'Pikkujoulu онлайн теж може бути безподатковим, і роботодавець може замовити їжу працівникам додому. Але якщо роботодавець замінює частування на святі подарунковою карткою до продуктового магазину, ресторану чи служби доставки їжі, така картка — зарплата працівника.' },
        { t: 'h3', x: 'Подружжя та члени родини' },
        { t: 'p', x: 'У податку на доходи участь чоловіка чи дружини працівника у звичайному різдвяному або літньому святі може входити до безподаткової пільги, якщо пільга розумна й з урахуванням витрат на нього чи неї. У ПДВ Verohallinto вважає частку подружжя та членів родини працівників у витратах на свято компанії (в інструкції приклад — ювілей компанії) особистим споживанням без права на вирахування. На практиці ПДВ за частку подружжя до вирахування не приймають.' },
        { t: 'h3', x: 'Вирахування і ПДВ' },
        { t: 'p', x: 'Витрати на власний персонал не є представницькими й зазвичай повністю віднімаються. За судовою практикою ПДВ із витрат на свято для персоналу може відніматися як загальні витрати в тій частині, у якій вони стосуються діяльності з правом на вирахування (KHO 2015:98). Якщо компанія продає й послуги, звільнені від ПДВ, вирахування роблять лише в частці оподатковуваної діяльності.' },
        { t: 'h2', x: 'Toiminimi і свято самого власника' },
        { t: 'p', x: 'Підприємець із toiminimi не може бути сам собі працівником і не входить до персоналу фірми. Тому витрати на пільгу для самого підприємця не віднімаються: «pikkujoulu» на самоті чи з родиною — це особиста витрата. Якщо в toiminimi є працівники і підприємець бере участь у спільному святі для них, його частка теж не утворює для нього оподатковуваної пільги.' },
        { t: 'p', x: 'В osakeyhtiö (Oy) ситуація інша. Акціонер, який реально працює в компанії, входить до персоналу, навіть якщо не отримує зарплати, і може отримувати пільги без податку на тих самих умовах, що й інші. За Verohallinto це так і тоді, коли інших працівників немає або працюють лише члени родини акціонера. Але кількість людей впливає на розумність: якщо загальні витрати надмірні щодо кількості учасників, пільга не звільняється від податку. Але з подарунками самому собі будьте обережні: за Verohallinto звільнення подарунка до ювілею (merkkipäivälahja) вимагає, щоб подарунок обрав роботодавець, і компанія, де працює лише власник, не може зробити йому безподатковий подарунок до ювілею. Та сама логіка, ймовірно, стосується й різдвяного подарунка, який єдиний власник обирає собі сам.' },
        { t: 'p', x: 'Пільга, надана лише через статус акціонера, наприклад акціонерові, який не працює в компанії, або члену його родини, може вважатися прихованими дивідендами (peitelty osinko). Особисті витрати власника — не витрати компанії.' },
        { t: 'h2', x: 'Різдвяні подарунки працівникам' },
        { t: 'p', x: 'Не оподатковується невеликий подарунок для всього персоналу, отриманий не грошима (§ 69 TVL). За інструкцією Verohallinto вартість такого подарунка — не більше 100 євро. Якщо невеликих подарунків кілька на рік, їхня загальна вартість — не більше 100 євро.' },
        { t: 'ul', items: [
          'Подарунок — обрана роботодавцем річ, квиток, послуга або конкретизована подарункова картка. Працівник може обрати з варіантів, визначених роботодавцем.',
          'Гроші — завжди зарплата, навіть якщо їх називають різдвяним подарунком.',
          'Подарункова картка не оподатковується, якщо її дано всьому персоналу, вона коштує не більше 100 євро, видана на ім’я працівника, обмежена товаром або послугою певного місця (наприклад, книжка в конкретній книгарні або їжа в певному ресторані чи мережі) і не обмінюється на гроші.',
          'Картка на весь асортимент магазину чи універмагу не конкретизована і тому є зарплатою.',
        ] },
        { t: 'p', x: 'Подарунки персоналу — це витрати на персонал, а не представницькі, тому в податку на доходи вони зазвичай віднімаються повністю. А от ПДВ до вирахування не приймається, якщо покупка йде в особисте користування працівників, тож подарунок обліковують у витратах за ціною з ПДВ. Річ, подарована персоналу, не вважається рекламним подарунком, навіть якщо на ній логотип компанії.' },
        { t: 'p', x: 'Оподатковуваний подарунок, наприклад гроші або неконкретизована картка, оформлюється як зарплата: з нього утримують податок (ennakonpidätys) і повідомляють про нього до реєстру доходів (tulorekisteri).' },
        { t: 'h2', x: 'Подарунки клієнтам і партнерам' },
        { t: 'p', x: 'Подарунок клієнтові в податках — або рекламний, або представницький.' },
        { t: 'ul', items: [
          'Рекламний подарунок (mainoslahja) — недорогий масовий подарунок, який одночасно й однаковим дарують багатьом отримувачам, часто з назвою чи логотипом компанії. За Verohallinto звичайним вважається рекламний подарунок із ціною купівлі не більше 50 євро з ПДВ. Звичайні рекламні подарунки віднімаються повністю (EVL § 8 ч. 1 п. 5), ПДВ із покупки можна прийняти до вирахування, а за вручення не сплачується ПДВ на власне споживання (AVL § 25).',
          'Представницький подарунок (edustuslahja) обирається індивідуально для отримувача, наприклад до ювілею ділового партнера. Представницькі витрати віднімаються в податку на доходи на 50 % (EVL § 8 ч. 1 п. 8), ПДВ до вирахування не приймається (AVL § 114 ч. 1 п. 3).',
          'Алкоголь у подарунок, як правило, — представництво. Винятком може бути власна продукція, наприклад міні-пивоварні чи виноробні, якщо інакше виконано умови рекламного подарунка.',
        ] },
        { t: 'h2', x: 'Різдвяний захід для клієнтів' },
        { t: 'p', x: 'Різдвяний обід, вечеря чи свято для клієнтів і партнерів зазвичай є представницьким заходом. У податку на доходи віднімається 50 % витрат, а ПДВ з усіх пов’язаних витрат, наприклад ресторану й представницьких подарунків, до вирахування не приймається. Зарплата власних працівників усе одно віднімається повністю (але їхнє харчування на заході — представницька витрата), навіть якщо вони беруть участь.' },
        { t: 'p', x: 'Якщо на одне свято запрошено і персонал, і клієнтів, частка зовнішніх гостей зазвичай — представництво, а частка персоналу — відпочинок. Працівники, присутні лише заради клієнтів, при цьому не перебувають на святі для персоналу. Позначте в документі, як розподілено витрати. Відкритий рекламний захід із вільним входом і легким частуванням — це не представництво, а маркетинг.' },
        { t: 'h2', x: 'Бухгалтерія: окремі рахунки й позначка на документі' },
        { t: 'p', x: 'За законом про бухгалтерський облік (KPL, розд. 2 § 5) запис має ґрунтуватися на документі, що підтверджує операцію, а з документа про витрату має бути видно, що придбано. З одного ресторанного чека не зрозуміло, на кого спрямована витрата, тож додайте коротке пояснення. Воно знадобиться й тоді, якщо Verohallinto поставить запитання.' },
        { t: 'ul', items: [
          'Обліковуйте витрати на різних рахунках: відпочинок і подарунки персоналу — у витратах на персонал, заходи й подарунки клієнтам — у представницьких, рекламні подарунки — у рекламних. Обмеження 50 % і невіднімний ПДВ простіше врахувати, коли представництво на окремому рахунку.',
          'Вкажіть мету заходу й учасників: персонал і скільки людей, чи були подружжя, на заході для клієнтів — компанії та люди.',
          'Щодо подарунків: що подаровано, кому або за яким списком отримувачів і ціна за штуку.',
          'Щодо подарункових карток: на чиє ім’я, чим обмежено використання і номінал.',
          'Виділіть частку подружжя і, на спільному святі, частку клієнтів.',
        ] },
        { t: 'h2', x: 'Приклад у євро' },
        { t: 'p', x: 'В Oy працюють власник і п’ятеро працівників. Компанія продає лише оподатковувані ПДВ послуги.' },
        { t: 'ul', items: [
          'Pikkujoulu в ресторані для всього персоналу: 6 × 95 € = 570 € (з ПДВ). Витрати на персонал віднімаються повністю, ПДВ із рахунку приймається до вирахування. Для працівників без податку, якщо свято звичайне й розумне.',
          'Подарунок усім: той самий товар, обраний компанією, 6 × 60 € = 360 €. Без податку, бо не дорожче за 100 євро й інших невеликих подарунків цього року немає. Витрата 360 € віднімається повністю, ПДВ не віднімається.',
          'Клієнтам 40 термокухлів з логотипом по 20 € = 800 € (з ПДВ 25,5 %). Рекламний подарунок: ПДВ 162,55 € приймається до вирахування, а сума без ПДВ 637,45 € повністю віднімається як витрата.',
          'Двом ключовим клієнтам по пляшці вина за 45 € = 90 €. Представницький подарунок: ПДВ не віднімається, у податку на доходи віднімається 45 €.',
          'Різдвяний обід для чотирьох клієнтів і двох своїх працівників: 6 × 80 € = 480 €. Представницький захід: ПДВ не віднімається, у податку на доходи віднімається 240 €.',
        ] },
        { t: 'p', x: 'Якби замість товару компанія подарувала картки на 150 євро на весь асортимент універмагу, кожна картка стала б зарплатою працівника: з утриманням податку й повідомленням до tulorekisteri.' },
        { t: 'h2', x: 'Поширені помилки' },
        { t: 'ul', items: [
          'Працівникам дарують гроші або картку на весь асортимент магазину й вважають це безподатковим подарунком.',
          'Загальна вартість невеликих подарунків за рік перевищує 100 євро.',
          'Pikkujoulu влаштовують лише для частини персоналу, наприклад для керівництва.',
          'Підприємець із toiminimi віднімає свій «pikkujoulu» на самоті чи з родиною.',
          'Oy оплачує свято для родини власника й проводить його як відпочинок персоналу.',
          'ПДВ із заходу для клієнтів або з представницького подарунка приймають до вирахування.',
          'ПДВ із подарунка працівникам приймають до вирахування або обліковують подарунок як рекламну витрату.',
          'З чека не видно, хто брав участь і навіщо проводився захід.',
        ] },
        { t: 'note', x: 'Суми в євро взято з інструкцій Verohallinto, а не із закону: невеликі подарунки — не більше 100 євро на рік, звичайний рекламний подарунок — не більше 50 євро з ПДВ. Ліміту в євро для pikkujoulu немає. Загальна ставка ПДВ — 25,5 %. Інструкція Verohallinto про пільги для персоналу оновлюється, але оголошена зміна стосується пільги на спорт і культуру, а не подарунків і свят. Джерела: TVL (1535/1992), EVL (360/1968), AVL (1501/1993), KPL (1336/1997) і Verohallinto.' },
        { t: 'h2', x: 'Допоможемо з витратами святкового сезону' },
        { t: 'p', x: 'Tilitoimisto Debit Credit проведе pikkujoulut, подарунки персоналу, представницькі витрати й рекламні подарунки за правильними рахунками, перевірить вирахування ПДВ і оформить оподатковувані подарунки через нарахування зарплати й звіти до tulorekisteri. Наші клієнти можуть надсилати чеки через застосунок Vaavo. Ми працюємо фінською та російською мовами. Зв’яжіться з нами ще до свят, і ми разом розберемо плани з погляду податків.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Verohallinto: пільги для персоналу в оподаткуванні (фінською)', href: SRC.staff },
          { label: 'Verohallinto: представницькі витрати в податку на доходи (фінською)', href: SRC.edustus },
          { label: 'Verohallinto: маркетингові та представницькі заходи в ПДВ (фінською)', href: SRC.alvEvents },
          { label: 'Verohallinto: ПДВ на власне споживання (фінською)', href: SRC.alvOwnUse },
          { label: 'Verohallinto: вирахування ПДВ за покупками (англійською)', href: SRC.alvDeductEn },
          { label: 'Finlex: tuloverolaki 1535/1992 (фінською)', href: SRC.tvl },
          { label: 'Finlex: elinkeinoverolaki 360/1968 (фінською)', href: SRC.evl },
          { label: 'Finlex: arvonlisäverolaki 1501/1993 (фінською)', href: SRC.avl },
          { label: 'Finlex: kirjanpitolaki 1336/1997 (фінською)', href: SRC.kpl },
        ] },
      ],
      faq: [
        { q: 'Скільки може коштувати pikkujoulu на людину, щоб він не оподатковувався?', a: 'Ліміту в євро Verohallinto не встановлювала. Свято має бути для всього персоналу, організоване роботодавцем і звичайне й розумне за вартістю та частотою. Розумність оцінюють і з урахуванням кількості персоналу, і за всім відпочинком працівників за рік.' },
        { q: 'Наскільки дорогий подарунок можна зробити працівникові без податку?', a: 'Невеликий подарунок — не більше 100 євро, а якщо подарунків кілька на рік, їхня загальна вартість — не більше 100 євро. Подарунок має бути не грошима й для всього персоналу.' },
        { q: 'Чи оподатковується подарункова картка працівникові?', a: 'Ні, якщо її дано всьому персоналу, вона коштує не більше 100 євро, видана на ім’я працівника, обмежена товаром або послугою певного місця і не обмінюється на гроші. Картка на весь асортимент магазину — це зарплата.' },
        { q: 'Чи може підприємець із toiminimi відняти свій pikkujoulu?', a: 'Ні. Підприємець із toiminimi не входить до персоналу фірми, тому витрати на пільгу для нього самого не віднімаються. Якщо він бере участь у святі для своїх працівників, його частка не утворює оподатковуваної пільги.' },
        { q: 'Чи можна відняти ПДВ із подарунка клієнтові?', a: 'Зі звичайного рекламного подарунка (не більше 50 євро з ПДВ, масовий, часто з логотипом) — так. Із представницького подарунка, наприклад обраного індивідуально або алкоголю, — ні, а в податку на доходи з нього віднімається 50 %.' },
      ],
    },
  },
};
