import type { Guide } from './types';

// Facts verified 2026-10-26, verbatim, against Finlex (consolidated YEL 1272/2006 and TVL 1535/1992),
// Eläketurvakeskus (ETK) material, kela.fi, vero.fi and suomi.fi (page update date in brackets where the
// page shows one). Pension-company tables (Varma, Ilmarinen, Elo) were used only to cross-check the
// 2026 euro limits; they are not linked. Every link below was fetched the same day and answered HTTP 200.
// - YEL 1272/2006 (Finlex, ajantasainen): 1 § "Suomessa asuvan ja toimivan yrittäjän on vakuutettava
//   itsensä ... Suomessa asumista ei kuitenkaan edellytetä, jos yrittäjä asuu EU- tai ETA-maassa";
//   3 § "Yrittäjällä tarkoitetaan henkilöä, joka tekee ansiotyötä olematta työsuhteessa"; oy partner in
//   "johtavassa asemassa" if he "omistaa yksin yli 30 prosenttia yhtiön osakepääomasta tai hänellä on yksin
//   yli 30 prosenttia yhtiön osakkeiden tuottamasta äänimäärästä" or "yhdessä perheenjäsentensä kanssa yli
//   50 prosenttia"; "Johtavalla asemalla tarkoitetaan toimitusjohtajuutta, hallituksen jäsenyyttä tai muuta
//   vastaavaa asemaa"; "Perheenjäsenellä tarkoitetaan ... avio- tai avopuolisoa sekä henkilöä, joka on ...
//   sukua suoraan ylenevässä tai alenevassa polvessa ja asuu hänen kanssaan samassa taloudessa"; indirect
//   ownership counts. 4 § the Act does not cover activity "joka ei ole jatkunut yhdenjaksoisesti vähintään
//   neljää kuukautta", activity after moving to old-age pension, or an entrepreneur "jonka työtulo ... on
//   arvioitava pienemmäksi kuin 5 504,14 euroa vuodessa" (base-year amount; 89 §: limits "tarkistetaan
//   vuosittain tammikuun alusta lukien ... palkkakertoimella" — 2026 level 9 423,09 €, see ETK below).
//   112 § "Työtulo on se palkka, joka kohtuudella olisi maksettava, jos hänen ... yrittäjätoimintaansa
//   suorittamaan olisi palkattava vastaavan ammattitaidon omaava henkilö"; "Työtuloa vahvistaessaan
//   eläkelaitos pitää ... palkkana ja korvauksena yksityisen sektorin kyseisen toimialan kokoaikaista työtä
//   tekevien mediaanipalkkaa"; "Vuotuista työtuloa ei vahvisteta 125 000 euroa suuremmaksi" (base-year);
//   "Työtuloa ei saa muuttaa takautuvasti". 112 a § "tarkistaa ... työtulon joka kolmas vuosi antamalla
//   yrittäjälle kirjallisen ehdotuksen"; no reply "2 viikon kuluessa" → the proposal is confirmed; change
//   "enintään 5 prosenttia" → no proposal; also on application "jos työtuloon vaikuttavat seikat ...
//   olennaisesti muuttuvat". L 1157/2022: "Tämä laki tulee voimaan 1 päivänä tammikuuta 2023 ja sitä
//   sovelletaan työtulon vahvistamiseen, joka tehdään lain voimaantulon jälkeen". 113 § voluntary
//   insurance below the limit "hakemuksesta"; "ei myönnetä takautuvasti". 115 § "78 prosenttia 114 §:ssä
//   tarkoitetusta maksuprosentista ensimmäisen ... yrittäjätoiminnan 48 ensimmäiseltä kuukaudelta";
//   remainder usable in a second period; "Jos yrittäjä on pakkovakuutettu 143 §:n mukaan, hänellä ei ole
//   oikeutta aloittavan yrittäjän alennukseen". 116 § lisätyöeläkevakuutusmaksu / pienennetty maksu
//   "kerran saman kalenterivuoden aikana". 118 § "Yrittäjä on henkilökohtaisessa vastuussa ...
//   työeläkevakuutusmaksusta". Laiminlyöntimaksu: "Yrittäjä, joka ei ota työeläkevakuutusta kuuden
//   kuukauden kuluessa vakuuttamisvelvollisuuden alkamisesta lukien, on velvollinen maksamaan
//   laiminlyöntimaksun, joka on enintään yhtä suuri kuin laiminlyöntiajalta maksettava
//   työeläkevakuutusmaksu"; "Valtiokonttorin määräämä laiminlyöntimaksu". 143 § "Eläketurvakeskuksen on
//   kehotettava yrittäjää korjaamaan laiminlyöntinsä ... Eläketurvakeskus ottaa yrittäjän kustannuksella
//   eläkevakuutuksen ... ei kuitenkaan aikaisemmalta ajalta kuin kulumassa olevalta ja sitä edeltäneiltä
//   kolmelta kalenterivuodelta". 66 § "Eläkettä karttuu 1,5 prosenttia ... kokonaistyötulosta"; 67 §
//   kokonaistyötulo = the confirmed työtulo (adjusted only for lisä-/pienennetty maksu).
// - ETK, "Yrittäjän eläkevakuutus" (ETK 2953 12.2025): "yrittäjä on 18–69-vuotias (vuonna 1957 tai
//   aikaisemmin syntyneillä ... 68 vuotta, vuonna 1958–61 syntyneillä 69 ja sitä nuoremmilla 70 vuotta)";
//   "jatkunut yhdenjaksoisesti vähintään neljä kuukautta yrittäjän täytettyä 18 vuotta"; "v. 2026
//   9.423,09 euroa/v"; "Vuonna 2026 YEL-vakuutusmaksu on 24,40 % vahvistetusta työtulosta"; spouse or
//   "palkatta muu perheenjäsen" in a toiminimi = YEL; "Mikäli muulle perheenjäsenelle kuin puolisolle
//   maksetaan työstä palkkaa, vakuutetaan hänet TyEL:n mukaan"; kevytyrittäjät "tekevät työtä
//   työeläkelaeissa tarkoitettuina yrittäjinä"; "Yrittäjä pääsee työttömyysturvan piiriin, jos hänen
//   YEL-työtulokseen on vahvistettu vähintään 15 481 euroa vuoden 2026 tasossa"; "yrittäjän vapaaehtoinen
//   tapaturmavakuutus on myös sidottu yrittäjän YEL-vakuutukseen ja -työtuloon"; jousto "10-100 %"
//   higher, "10-20 % vähemmän"; "Vakuuttaminen on kuitenkin vapaaehtoista, jos henkilö on työeläkelakien
//   mukaisella vanhuuseläkkeellä"; abroad "A1-todistus". ETK, "YEL-vakuutus 2026 – yrittäjän turvan
//   ABC": "YEL-maksu on 24,4 prosenttia vahvistetusta YEL-työtulosta"; "22 prosentin alennuksen neljän
//   vuoden ajan"; "Työeläkelaitoksesi tarkistaa YEL-työtulosi kolmen vuoden välein"; "Jos yrityksiä on
//   useita, yksi YEL-vakuutus kattaa ne kaikki"; companies "Elo, Ilmarinen, Varma, Veritas", kassat
//   "Apteekkien eläkekassa, Eläkekassa Verso". ETK muistio 30.4.2026: "YEL-työtulon yläraja on 214 000
//   euroa vuonna 2026"; "YEL-maksuprosentti (24,4 % vuonna 2026)"; kehysriihi: "vuodesta 2028 alkaen
//   yrittäjä voisi valita eläkemaksunsa perusteeksi joko yritystoiminnan veronalaiset ansiotulot tai
//   nykyisen laskennallisen YEL-työtulon". Cross-check Varma 2026 table: "YEL-työtulon yläraja 214 000 €/v";
//   "Vuonna 2025 YEL-maksu oli alle 53- ja yli 62-vuotiailla 24,1 % sekä 53–62-vuotiailla 25,6 %" (so in
//   2026 there are no age brackets). Pending reform: Suomen Yrittäjät 9.10.2026 — the government
//   submitted the bill to Parliament, intended "1.4.2028", starting discount to be removed; not yet law.
// - suomi.fi, Yrittäjän eläketurva YEL – Eläketurvakeskus (30.12.2025; EN "Pensions for the
//   self-employed"): "Samat säännöt koskevat myös kevytyrittäjää tai itsensä työllistäjää"; sivutoiminen
//   and seasonal also; "Ota eläkevakuutus kuuden kuukauden kuluessa yritystoiminnan alkamisesta".
//   suomi.fi, Yrittäjän eläkevakuutukset (20.4.2026): "68-, 69- tai 70-vuotias"; "9 423,09 euroa";
//   "Jos otat vakuutuksen vasta myöhemmin, joudut maksamaan ... laiminlyöntikorotuksen"; "vakuutusmaksu
//   laiminlyönnin ajalta voi olla jopa kaksinkertainen"; "voit vähentää eläkevakuutusmaksut joko
//   henkilökohtaisessa tai yrityksesi verotuksessa". suomi.fi, Yrittäjien työeläkevakuuttamisen valvonta
//   (1.6.2026): "kuluvalle ja kolmelle edelliselle vuodelle. Tätä varhemmalta ajalta ei eläketurvaa ole
//   jälkikäteen mahdollista kartuttaa".
// - Kela, Sairauspäiväraha (1.10.2026): "YEL-päivärahan omavastuuaika on sairastumispäivä"; general
//   omavastuuaika "sairastumispäivä ja sitä 9 seuraavat arkipäivää"; YEL must be "voimassa oleva"
//   when incapacity starts. Kela, Vuositulot (26.9.2026): "vuosituloon lasketaan YEL- ja MYEL-työtulo vain
//   siltä ajalta, kun vakuutus on ollut voimassa"; "Jos YEL- tai MYEL-vakuutus ei ole ollut ... voimassa,
//   yrittäjätoiminnasta ei lasketa vuosituloon mitään tuloa. Tämä koskee myös kevytyrittäjiä"; "ei oteta
//   huomioon ... palkkatuloa omasta yrityksestä eikä elinkeinotoiminnan ansiotuloa"; example "YEL-työtulon
//   määrä on 20 000 e/vuosi ... noin 47 e/arkipäivä"; the same rule for vanhempainpäivärahat.
// - Vero, YEL-maksut (31.7.2023): deduct "joko elinkeinotoiminnan veroilmoituksessa, henkilökohtaisessa
//   veroilmoituksessa tai puolison veroilmoituksessa"; "et voi ilmoittaa YEL-maksuja vähennettäväksi sekä
//   elinkeinotoiminnan veroilmoituksessa että henkilökohtaisessa"; personal deduction = "ansiotulojen
//   veroprosentin suuruinen". TVL 1535/1992 96 §: "oikeus vähentää puhtaasta ansiotulostaan ... omasta ja
//   puolisonsa pakollisesta eläkevakuutuksesta suorittamansa maksut"; also voluntary YEL taken because
//   "työtulon vähäisyyden" vuoksi it is not compulsory.
// - Ilmarinen (instalments): "1, 2, 3, 4, 6 or 12 instalments per year"; "At least half of the
//   instalments must fall due before August"; one instalment in January "the most affordable option".
// - Own arithmetic: 9 423,09 × 24,4 % = 2 299,23 €; 30 000 × 24,4 % = 7 320 € (610 €/kk); 24,4 % × 78 % =
//   19,032 %; 30 000 × 19,032 % = 5 709,60 € (475,80 €/kk); 30 000 × 1,5 % = 450 €/v pension (37,50 €/kk).
// Not stated (no verified 2026 source or out of scope): age brackets (none in 2026), the palkkakerroin
// value, any pension company's interest or service price, the yrittäjän työssäoloehto in months.
const VERO = 'https://www.vero.fi';
const SUOMI = 'https://www.suomi.fi';

const SRC = {
  yel: 'https://www.finlex.fi/fi/lainsaadanto/2006/1272',
  tvl: 'https://www.finlex.fi/fi/lainsaadanto/1992/1535',
  deductFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/vahennykset/yel-maksut/`,
  deductEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/deductions/pension-premiums-yel/`,
  etkFi: `${SUOMI}/palvelut/yrittajan-elaketurva-yel-elaketurvakeskus/bbb4369d-048c-4a0d-88d4-e06e4f7977ea`,
  etkEn: `${SUOMI}/services/pensions-for-the-self-employed-finnish-centre-for-pensions/bbb4369d-048c-4a0d-88d4-e06e4f7977ea`,
  guideFi: `${SUOMI}/yritykselle/yrityksen-perustaminen/yritystoiminnan-kaynnistaminen-suomessa/opas/yrittajan-vakuutukset/yrittajan-elakevakuutukset`,
  supervisionFi: `${SUOMI}/palvelut/yrittajien-tyoelakevakuuttamisen-valvonta-elaketurvakeskus/2ba9d463-78b2-437c-8d04-575ae06bd4ea`,
  kelaSick: 'https://www.kela.fi/sairauspaivaraha',
  kelaIncome: 'https://www.kela.fi/vuositulot',
};

export const yelVakuutus: Guide = {
  slug: 'yel-vakuutus',
  datePublished: '2026-10-29',
  dateModified: '2026-10-29',
  content: {
    fi: {
      title: 'YEL-vakuutus 2026: kuka tarvitsee, työtulo, maksu ja yleisimmät virheet',
      description:
        'YEL 2026: kenen on otettava vakuutus, miten työtulo määräytyy, maksu 24,4 % ja aloittavan 22 %:n alennus, vaikutus Kelan päivärahoihin ja verovähennys.',
      lead: 'YEL eli yrittäjän eläkevakuutus on pakollinen lähes jokaiselle, joka tekee työtä omassa yrityksessään, myös toiminimelle, kevytyrittäjälle ja osakeyhtiön pääomistajalle. Sen työtulo ratkaisee paitsi eläkkeen myös Kelan sairaus- ja vanhempainpäivärahan. Kokosimme vuoden 2026 rajat, maksut ja säännöt sekä esimerkin euroina.',
      body: [
        { t: 'h2', x: 'Mikä YEL on?' },
        { t: 'p', x: 'YEL on yrittäjän eläkelain (1272/2006) mukainen lakisääteinen työeläkevakuutus. Yrittäjällä ei ole työnantajaa, joka maksaisi hänen eläkettään, joten hän vakuuttaa itsensä itse. YEL ei ole vero: maksut menevät valitsemallesi työeläkeyhtiölle tai eläkekassalle, ja niillä karttuu eläke sekä sosiaaliturva. Pakollista YEL:ää ei voi korvata vapaaehtoisella eläkesäästämisellä. Jos sinulla on useita yrityksiä, yksi YEL-vakuutus kattaa ne kaikki.' },
        { t: 'h2', x: 'Kenen on otettava YEL-vakuutus?' },
        { t: 'p', x: 'Vakuutus on pakollinen, kun kaikki seuraavat ehdot täyttyvät:' },
        { t: 'ul', items: [
          'Olet täyttänyt 18 vuotta etkä ole vielä saavuttanut yläikärajaa. Se on 69 vuotta vuosina 1958–1961 syntyneillä ja 70 vuotta vuonna 1962 tai myöhemmin syntyneillä.',
          'Teet itse työtä yrityksessä. Pelkkä omistaminen ei riitä.',
          'Yrittäjätoiminta on jatkunut yhtäjaksoisesti vähintään neljä kuukautta 18 vuoden iän jälkeen.',
          'Arvioitu YEL-työtulosi on vähintään 9 423,09 euroa vuodessa (2026).',
          'Asut ja toimit Suomessa. Jos asut toisessa EU- tai ETA-maassa, sovellettava maa selvitetään EU-säännöillä (A1-todistus).',
        ] },
        { t: 'p', x: 'Ehdot koskevat yhtä lailla sivutoimista, kausiluonteista ja ilman Y-tunnusta toimivaa yrittäjää. Vakuutus on otettava kuuden kuukauden kuluessa yritystoiminnan alkamisesta.' },
        { t: 'h3', x: 'Yritysmuoto ratkaisee' },
        { t: 'ul', items: [
          'Toiminimi (liikkeen- tai ammatinharjoittaja): YEL, kun ehdot täyttyvät.',
          'Avoin yhtiö ja kommandiittiyhtiö: henkilökohtaisesti vastuussa olevat yhtiömiehet ovat YEL-yrittäjiä. Kommandiittiyhtiön äänetön yhtiömies vakuutetaan palkastaan TyEL:n mukaan.',
          'Osakeyhtiö: johtavassa asemassa (toimitusjohtaja, hallituksen jäsen tai vastaava) työskentelevä osakas on YEL-yrittäjä, jos hän omistaa yksin yli 30 % osakkeista tai äänistä tai yhdessä samassa taloudessa asuvien perheenjäsentensä kanssa yli 50 %. Myös toisen yhtiön kautta omistettu osuus lasketaan.',
          'Kevytyrittäjä: samat säännöt kuin muillakin yrittäjillä. Laskutuspalvelu ei ole työnantajasi, joten YEL on otettava, kun työtuloraja ylittyy.',
        ] },
        { t: 'h3', x: 'Perheenjäsenet' },
        { t: 'p', x: 'Perheenjäseniä ovat avio- ja avopuoliso sekä suoraan ylenevässä tai alenevassa polvessa olevat sukulaiset, jotka asuvat yrittäjän kanssa samassa taloudessa. Toiminimessä työskentelevä puoliso on YEL-yrittäjä, samoin muu perheenjäsen, joka työskentelee ilman palkkaa. Jos muulle perheenjäsenelle kuin puolisolle maksetaan palkkaa, hänet vakuutetaan TyEL:n mukaan.' },
        { t: 'h3', x: 'Kuka ei tarvitse YEL:ää?' },
        { t: 'ul', items: [
          'Yrittäjä, jonka työtulo jää alle 9 423,09 euron vuodessa. Vapaaehtoisen YEL-vakuutuksen voi silti ottaa hakemuksesta, mutta ei takautuvasti.',
          'Toiminta, joka kestää alle neljä kuukautta.',
          'Osakeyhtiön osakas, joka jää omistusrajojen alle. Jos hän saa yhtiöltä palkkaa, hänet vakuutetaan TyEL:n mukaan, kuten työntekijä.',
          'Työeläkelakien mukaisella vanhuuseläkkeellä oleva yrittäjä. Hänelle YEL on vapaaehtoinen.',
        ] },
        { t: 'h2', x: 'YEL-työtulo: mikä se on ja miten se määräytyy' },
        { t: 'p', x: 'YEL-työtulo ei ole liikevaihto, voitto eikä itsellesi maksama palkka. Se on työpanoksesi arvo rahana: palkka, joka kohtuudella pitäisi maksaa, jos palkkaisit samaan työhön yhtä ammattitaitoisen ihmisen. Työtulon vahvistaa työeläkeyhtiö kokonaisarvion perusteella.' },
        { t: 'ul', items: [
          'Vuodesta 2023 lähtien työtulon vertailukohtana on lain mukaan oman toimialasi yksityisen sektorin kokoaikaisten työntekijöiden mediaanipalkka. Lisäksi otetaan huomioon työmääräsi, toiminnan laajuus ja ammattitaitosi. Työeläke.fi-sivuston työtulosuosituslaskuri antaa arvion toimialan ja liikevaihdon perusteella.',
          'Alaraja 2026 on 9 423,09 euroa ja yläraja 214 000 euroa vuodessa. Rajat ja vahvistettu työtulosi tarkistetaan vuosittain tammikuussa palkkakertoimella.',
          'Työeläkeyhtiö tarkistaa työtulon joka kolmas vuosi ja lähettää kirjallisen ehdotuksen. Jos et vastaa kahdessa viikossa, ehdotuksen mukainen työtulo vahvistetaan. Jos muutos olisi enintään 5 %, ehdotusta ei tehdä.',
          'Voit itse hakea muutosta, jos toimintasi muuttuu olennaisesti, esimerkiksi kun työmäärä kasvaa tai vähenee. Työtuloa ei voi muuttaa takautuvasti.',
        ] },
        { t: 'h2', x: 'YEL-maksu 2026' },
        { t: 'ul', items: [
          'Maksu on 24,4 % vahvistetusta työtulosta kaikenikäisille. Vuonna 2025 maksu oli vielä ikäsidonnainen (24,1 % ja 53–62-vuotiailla 25,6 %), mutta vuonna 2026 ikäryhmiä ei ole.',
          'Aloittava yrittäjä maksaa ensimmäisen yrittäjätoimintansa 48 ensimmäiseltä kuukaudelta 22 % pienempää maksua, eli 19,032 % työtulosta. Jos toiminta päättyy aiemmin, jäljelle jääneet alennuskuukaudet voi pyynnöstä käyttää seuraavassa yrittäjäjaksossa. Alennus ei pienennä eläkettä, koska eläke karttuu vahvistetusta työtulosta.',
          'Maksujousto: kerran kalenterivuodessa voit tietyin ehdoin maksaa 10–100 % enemmän tai 10–20 % vähemmän kuin työtulosi edellyttää, ilman että työtuloa muutetaan. Lisämaksu kasvattaa eläkettä, pienennetty maksu pienentää sitä.',
          'Maksun voi jakaa 1, 2, 3, 4, 6 tai 12 erään vuodessa, ja vähintään puolet eristä on erääntyttävä ennen elokuuta. Yksi erä tammikuussa on edullisin, koska vuoden loppuun painottuviin eriin lisätään korkoa.',
          'Vastaat YEL-maksuista henkilökohtaisesti myös osakeyhtiössä.',
        ] },
        { t: 'h2', x: 'Mihin YEL-työtulo vaikuttaa?' },
        { t: 'ul', items: [
          'Eläke: eläkettä karttuu 1,5 % vuoden työtulosta. Sama työtulo ratkaisee myös työkyvyttömyyseläkkeen ja perhe-eläkkeen.',
          'Kelan sairauspäiväraha: yrittäjän päiväraha lasketaan YEL-työtulosta, ei omasta yrityksestä nostetusta palkasta eikä elinkeinotoiminnan tulosta. Jos YEL-vakuutus on voimassa sairastuessasi, omavastuuaika on vain sairastumispäivä (YEL-päiväraha), kun muuten se on sairastumispäivä ja 9 arkipäivää.',
          'Vanhempainpäivärahat (raskaus- ja vanhempainraha) määräytyvät samalla tavalla YEL-työtulosta. Ilman voimassa olevaa YEL:ää yrittäjätoiminnasta ei lasketa Kelan vuosituloon mitään, ja tämä koskee myös kevytyrittäjiä.',
          'Työttömyysturva: yrittäjän työttömyyskassaan pääsee, kun YEL-työtulo on vähintään 15 481 euroa vuodessa (2026). Pienemmällä työtulolla jää Kelan perusturvan varaan.',
          'Työtapaturmat: YEL ei ole tapaturmavakuutus. Yrittäjä voi ottaa vapaaehtoisen työtapaturma- ja ammattitautivakuutuksen, jonka korvaukset sidotaan YEL-työtuloon.',
        ] },
        { t: 'h2', x: 'YEL-maksut verotuksessa' },
        { t: 'ul', items: [
          'Toiminimi: YEL-maksut vähennetään joko elinkeinotoiminnan veroilmoituksella (5), omassa esitäytetyssä veroilmoituksessa tai puolison veroilmoituksessa, mutta vain yhteen kertaan. Jos maksut on kirjattu kirjanpidossa kuluiksi ja vähennät ne henkilökohtaisesti, merkitse ne lomakkeella 5 vähennyskelvottomiksi kuluiksi.',
          'Osakeyhtiön YEL-vakuutettu osakas: vakuutus ja maksut ovat henkilökohtaisia. Maksut vähennetään omasta tai puolison ansiotulosta esitäytetyn veroilmoituksen kohdassa YEL- tai MYEL-maksut.',
          'Henkilökohtaisen vähennyksen hyöty on ansiotulojesi veroprosentin suuruinen. Myös vapaaehtoinen YEL alarajan alittavasta työtulosta on vähennyskelpoinen.',
        ] },
        { t: 'h2', x: 'Mistä vakuutuksen saa?' },
        { t: 'p', x: 'YEL-vakuutuksen voi ottaa mistä tahansa työeläkevakuutusyhtiöstä (Elo, Ilmarinen, Varma, Veritas) tai eläkekassasta, jos omalla alallasi toimii sellainen (Apteekkien eläkekassa, Eläkekassa Verso). Lakisääteinen maksuprosentti on sama kaikkialla. Eroja on palvelussa ja verkkoasioinnissa. Vakuutuksen voi myöhemmin siirtää toiseen yhtiöön, mutta työtulo ei siirron yhteydessä ilman erityistä syytä muutu.' },
        { t: 'h2', x: 'Esimerkki euroina' },
        { t: 'p', x: 'Aila perustaa toiminimen vuonna 2026 ja tekee siivouspalveluita täyttä päivää. Työeläkeyhtiö vahvistaa hänen YEL-työtulokseen 30 000 euroa vuodessa.' },
        { t: 'ul', items: [
          'Normaali maksu olisi 30 000 × 24,4 % = 7 320 euroa vuodessa eli 610 euroa kuukaudessa.',
          'Aloittavana yrittäjänä Aila maksaa 48 kuukauden ajan 19,032 %: 5 709,60 euroa vuodessa eli 475,80 euroa kuukaudessa. Säästö on 1 610,40 euroa vuodessa.',
          'Eläkettä karttuu 30 000 × 1,5 % = 450 euroa vuodessa eli 37,50 euroa kuukausieläkettä jokaista vakuutettua vuotta kohden, tämän päivän rahassa.',
          'Koska työtulo ylittää 15 481 euroa, Aila voi liittyä yrittäjän työttömyyskassaan. Kelan esimerkissä 20 000 euron YEL-työtulolla sairauspäiväraha on noin 47 euroa arkipäivältä, joten 30 000 euron työtulolla se on suurempi.',
          'Maksut ovat vähennyskelpoisia, joten ne pienentävät Ailan verotettavaa tuloa.',
        ] },
        { t: 'p', x: 'Jos Aila olisi valinnut alarajan työtulon 9 423,09 euroa, maksu olisi ollut 2 299,23 euroa vuodessa ilman alennusta. Hän säästäisi nyt, mutta eläkettä karttuisi vain noin kolmannes, myös Kelan päivärahat jäisivät selvästi pienemmiksi, eikä hän pääsisi työttömyyskassaan.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Liian matala työtulo maksujen säästämiseksi. Sairauspäivärahan, vanhempainrahan ja eläkkeen taso jää pieneksi juuri silloin, kun turvaa tarvitaan.',
          'Vakuutus jää ottamatta kuuden kuukauden määräajassa. Valtiokonttori voi työeläkeyhtiön hakemuksesta määrätä laiminlyöntimaksun, joka on enintään laiminlyöntiajan maksujen suuruinen, eli maksu voi kaksinkertaistua.',
          'Kehotus jätetään huomiotta. Eläketurvakeskus valvoo vakuuttamista: jos laiminlyöntiä ei korjata, se ottaa vakuutuksen yrittäjän kustannuksella kuluvalle ja kolmelle edelliselle kalenterivuodelle. Tätä vanhemmalta ajalta eläkettä ei voi enää kartuttaa, eikä pakkovakuutettu saa aloittavan yrittäjän alennusta.',
          'Luullaan, että sivutoiminen tai kevytyrittäjä on YEL:n ulkopuolella. Ratkaisevat vain ehdot, eivät yritysmuoto tai päätoimisuus.',
          'Osakeyhtiön osakas luulee, että itselle maksettu palkka korvaa YEL:n. Kelan päivärahat lasketaan YEL-työtulosta, eivät palkasta.',
          'Työtulon tarkistusehdotukseen ei vastata kahdessa viikossa, ja työtulo muuttuu ilman omaa arviota.',
          'YEL-maksut vähennetään sekä elinkeinotoiminnan että henkilökohtaisessa verotuksessa.',
        ] },
        { t: 'note', x: 'Luvut ovat vuoden 2026 tietoja: maksu 24,4 %, aloittavan yrittäjän alennus 22 % 48 kuukauden ajan, työtulon alaraja 9 423,09 euroa, yläraja 214 000 euroa ja työttömyyskassan raja 15 481 euroa. Hallitus antoi lokakuussa 2026 eduskunnalle esityksen YEL-uudistuksesta: vuodesta 2028 yrittäjä voisi valita maksun perusteeksi joko nykyisen työtulon tai yritystoiminnan verotetut ansiotulot, ja aloittavan yrittäjän alennus poistuisi. Esitys ei ole vielä laki. Lähteet: yrittäjän eläkelaki (1272/2006), Eläketurvakeskus, Kela ja Verohallinto.' },
        { t: 'h2', x: 'Autamme mitoittamaan YEL:n oikein' },
        { t: 'p', x: 'Tilitoimisto Debit Credit auttaa arvioimaan, onko sinulla YEL-velvollisuus, ja käy kanssasi läpi, mikä työtulo sopii työhösi ja tarvitsemaasi turvaan. Kirjaamme YEL-maksut, huolehdimme siitä, että ne vähennetään verotuksessa oikein ja vain kerran, ja autamme, kun työeläkeyhtiön tarkistusehdotus tulee. Palvelemme suomeksi ja venäjäksi. Ota yhteyttä, niin katsotaan YEL-tilanteesi yhdessä.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Suomi.fi / Eläketurvakeskus: yrittäjän eläketurva YEL', href: SRC.etkFi },
          { label: 'Suomi.fi: yrittäjän eläkevakuutukset', href: SRC.guideFi },
          { label: 'Suomi.fi / Eläketurvakeskus: yrittäjien työeläkevakuuttamisen valvonta', href: SRC.supervisionFi },
          { label: 'Kela: sairauspäiväraha ja YEL-päiväraha', href: SRC.kelaSick },
          { label: 'Kela: vuositulo ja yrittäjän YEL-työtulo', href: SRC.kelaIncome },
          { label: 'Verohallinto: YEL-maksujen vähentäminen', href: SRC.deductFi },
          { label: 'Finlex: yrittäjän eläkelaki (1272/2006)', href: SRC.yel },
          { label: 'Finlex: tuloverolaki (1535/1992), 96 §', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Onko YEL pakollinen sivutoimiselle yrittäjälle?', a: 'On, jos ehdot täyttyvät: olet 18–69-vuotias (1962 tai myöhemmin syntyneillä yläraja on 70), teet työtä yrityksessä, toiminta on jatkunut vähintään neljä kuukautta ja työtulosi on vähintään 9 423,09 euroa vuodessa (2026). Päätoimisuus ei ratkaise.' },
        { q: 'Paljonko YEL maksaa vuonna 2026?', a: '24,4 % vahvistetusta työtulosta iästä riippumatta. Aloittava yrittäjä saa 22 %:n alennuksen ensimmäisten 48 kuukauden ajan, jolloin maksu on 19,032 %. Esimerkiksi 30 000 euron työtulolla maksu on 7 320 euroa vuodessa, alennuksella 5 709,60 euroa.' },
        { q: 'Tarvitseeko kevytyrittäjä YEL-vakuutuksen?', a: 'Tarvitsee, jos työtulo ylittää 9 423,09 euroa vuodessa ja muut ehdot täyttyvät. Laskutuspalvelu ei ole työnantaja. Ilman YEL:ää kevytyrittäjän työstä ei myöskään lasketa tuloa Kelan päivärahoihin.' },
        { q: 'Milloin osakeyhtiön osakas tarvitsee YEL:n?', a: 'Kun hän työskentelee yhtiössä johtavassa asemassa ja omistaa yksin yli 30 % tai yhdessä samassa taloudessa asuvien perheenjäsentensä kanssa yli 50 % osakkeista tai äänistä. Muuten yhtiöltä saatu palkka vakuutetaan TyEL:n mukaan.' },
        { q: 'Mitä tapahtuu, jos otan YEL:n myöhässä?', a: 'Vakuutus otetaan takautuvasti, ja Valtiokonttori voi määrätä laiminlyöntimaksun, joka on enintään laiminlyöntiajan maksujen suuruinen. Jos et korjaa tilannetta kehotuksesta, Eläketurvakeskus ottaa vakuutuksen puolestasi kuluvalle ja kolmelle edelliselle vuodelle, eikä alennusta silloin saa.' },
        { q: 'Voinko vähentää YEL-maksut verotuksessa?', a: 'Kyllä, kokonaan. Toiminimi voi vähentää ne elinkeinotoiminnan, omassa tai puolison verotuksessa, mutta vain kerran. Osakeyhtiön osakas vähentää ne omasta tai puolison ansiotulosta.' },
      ],
    },
    ru: {
      title: 'YEL 2026: пенсионное страхование предпринимателя в Финляндии',
      description:
        'YEL 2026: кто обязан оформить страховку, как определяют доход YEL (työtulo), взнос 24,4 % и скидка 22 % новичкам, пособия Kela, вычет из налогов.',
      lead: 'YEL — обязательное пенсионное страхование предпринимателя. Оно нужно почти каждому, кто сам работает в своём бизнесе: владельцу toiminimi, «лёгкому» предпринимателю (kevytyrittäjä) и основному владельцу osakeyhtiö. От дохода YEL зависит не только пенсия, но и пособия Kela по болезни и по уходу за ребёнком. Собрали лимиты, ставки и правила 2026 года и пример в евро.',
      body: [
        { t: 'h2', x: 'Что такое YEL' },
        { t: 'p', x: 'YEL — обязательное пенсионное страхование по закону о пенсиях предпринимателей (yrittäjän eläkelaki 1272/2006). У предпринимателя нет работодателя, который платил бы пенсионные взносы, поэтому он страхует себя сам. Это не налог: взносы идут в выбранную вами пенсионную страховую компанию или пенсионную кассу, и на них копятся пенсия и социальная защита. Заменить обязательный YEL добровольными пенсионными накоплениями нельзя. Если у вас несколько фирм, одна страховка YEL покрывает их все.' },
        { t: 'h2', x: 'Кто обязан оформить YEL' },
        { t: 'p', x: 'Страховка обязательна, если выполнены все условия:' },
        { t: 'ul', items: [
          'Вам исполнилось 18 лет, и вы ещё не достигли верхнего возраста: 69 лет для родившихся в 1958–1961 годах и 70 лет для родившихся в 1962 году и позже.',
          'Вы сами работаете в бизнесе. Одного владения недостаточно.',
          'Деятельность длится без перерыва не менее четырёх месяцев после 18-летия.',
          'Ваш расчётный доход YEL (YEL-työtulo) — не менее 9 423,09 € в год (2026).',
          'Вы живёте и работаете в Финляндии. Если вы живёте в другой стране ЕС или ЕЭЗ, страну страхования определяют по правилам ЕС (справка A1).',
        ] },
        { t: 'p', x: 'Условия одинаковы для подработки, сезонной работы и работы без Y-tunnus. Оформить страховку нужно в течение шести месяцев после начала деятельности.' },
        { t: 'h3', x: 'Всё решает форма бизнеса' },
        { t: 'ul', items: [
          'Toiminimi (индивидуальный предприниматель): YEL, если выполнены условия.',
          'Avoin yhtiö и kommandiittiyhtiö: лично ответственные участники — предприниматели по YEL. «Молчаливого» участника kommandiittiyhtiö страхуют по TyEL, как работника.',
          'Osakeyhtiö: акционер на руководящей должности (toimitusjohtaja, член правления или аналог) — предприниматель по YEL, если ему одному принадлежит больше 30 % акций или голосов либо вместе с членами семьи, живущими с ним в одном домохозяйстве, — больше 50 %. Учитывается и владение через другую компанию.',
          'Kevytyrittäjä: те же правила, что для всех. Сервис выставления счетов — не ваш работодатель, поэтому при превышении порога YEL обязателен.',
        ] },
        { t: 'h3', x: 'Члены семьи' },
        { t: 'p', x: 'Членами семьи считаются супруг или сожитель, а также родственники по прямой восходящей и нисходящей линии, живущие с предпринимателем в одном домохозяйстве. Супруг, работающий в toiminimi, — предприниматель по YEL, как и другой член семьи, работающий без зарплаты. Если другому члену семьи (не супругу) платят зарплату, его страхуют по TyEL.' },
        { t: 'h3', x: 'Кому YEL не нужен' },
        { t: 'ul', items: [
          'Если доход YEL меньше 9 423,09 € в год. Добровольную страховку YEL можно оформить по заявлению, но не задним числом.',
          'Если деятельность длится меньше четырёх месяцев.',
          'Акционеру osakeyhtiö, который не дотягивает до порогов владения. Если он получает от компании зарплату, его страхуют по TyEL, как работника.',
          'Предпринимателю на трудовой пенсии по старости: для него YEL добровольный.',
        ] },
        { t: 'h2', x: 'Доход YEL: что это и как его определяют' },
        { t: 'p', x: 'Доход YEL (työtulo) — это не оборот, не прибыль и не зарплата, которую вы себе платите. Это денежная оценка вашего труда: какую зарплату пришлось бы платить человеку с такой же квалификацией за ту же работу. Работу оценивает и доход утверждает пенсионная компания по совокупности факторов.' },
        { t: 'ul', items: [
          'С 2023 года закон требует сравнивать доход с медианной зарплатой штатных работников частного сектора вашей отрасли. Учитываются также объём работы, масштаб бизнеса и квалификация. Калькулятор на сайте Työeläke.fi даёт рекомендацию по отрасли и обороту.',
          'Нижний предел в 2026 году — 9 423,09 €, верхний — 214 000 € в год. Пределы и утверждённый доход ежегодно в январе индексируют по коэффициенту зарплат (palkkakerroin).',
          'Раз в три года пенсионная компания пересматривает доход и присылает письменное предложение. Если не ответить в течение двух недель, предложенный доход утверждается. Если изменение не больше 5 %, предложения не будет.',
          'Сами вы можете попросить изменить доход, если бизнес существенно изменился, например выросла или упала нагрузка. Задним числом доход не меняют.',
        ] },
        { t: 'h2', x: 'Взнос YEL в 2026 году' },
        { t: 'ul', items: [
          'Взнос — 24,4 % от утверждённого дохода для всех возрастов. В 2025 году ставка ещё зависела от возраста (24,1 %, а в 53–62 года — 25,6 %), в 2026 году возрастных групп нет.',
          'Начинающий предприниматель первые 48 месяцев своей первой предпринимательской деятельности платит на 22 % меньше, то есть 19,032 % дохода. Если бизнес закрылся раньше, оставшиеся месяцы скидки можно использовать в следующий раз. Пенсию скидка не уменьшает: пенсия копится от утверждённого дохода.',
          'Гибкий взнос: раз в календарный год можно на определённых условиях заплатить на 10–100 % больше или на 10–20 % меньше, не меняя доход. Доплата увеличивает пенсию, уменьшенный взнос её снижает.',
          'Взнос можно разбить на 1, 2, 3, 4, 6 или 12 платежей в год, при этом не меньше половины должно прийтись на время до августа. Дешевле всего один платёж в январе: к платежам в конце года добавляют проценты.',
          'За взносы YEL вы отвечаете лично, в том числе в osakeyhtiö.',
        ] },
        { t: 'h2', x: 'На что влияет доход YEL' },
        { t: 'ul', items: [
          'Пенсия: каждый год копится 1,5 % годового дохода YEL. От него же зависят пенсия по нетрудоспособности и пенсия по потере кормильца.',
          'Больничное пособие Kela (sairauspäiväraha): у предпринимателя его считают от дохода YEL, а не от зарплаты из своей фирмы и не от прибыли бизнеса. Если YEL действует на момент болезни, период без выплат — только день заболевания (YEL-päiväraha), а без него — день заболевания и ещё 9 рабочих дней.',
          'Пособия по беременности и уходу за ребёнком (vanhempainpäivärahat) тоже считают от дохода YEL. Без действующего YEL доход от предпринимательства в годовой доход для Kela не попадает вовсе — это касается и kevytyrittäjä.',
          'Безработица: вступить в кассу по безработице для предпринимателей можно при доходе YEL от 15 481 € в год (2026). С меньшим доходом остаётся только базовая защита Kela.',
          'Несчастные случаи: YEL не страхует от травм на работе. Можно оформить добровольную страховку от несчастных случаев и профзаболеваний, выплаты по ней привязаны к доходу YEL.',
        ] },
        { t: 'h2', x: 'YEL и налоги' },
        { t: 'ul', items: [
          'Toiminimi: взносы YEL вычитают либо в налоговой декларации бизнеса (форма 5), либо в своей предзаполненной декларации, либо в декларации супруга — но только один раз. Если взносы проведены в бухгалтерии как расход, а вычет вы делаете лично, в форме 5 их нужно указать как невычитаемые расходы.',
          'Акционер osakeyhtiö со страховкой YEL: страховка и взносы личные. Их вычитают из своего заработанного дохода или дохода супруга в предзаполненной декларации, в пункте YEL- tai MYEL-maksut.',
          'Личный вычет экономит сумму, равную вашей ставке налога на заработанный доход. Добровольный YEL при доходе ниже порога тоже вычитается.',
        ] },
        { t: 'h2', x: 'Где оформить страховку' },
        { t: 'p', x: 'YEL можно оформить в любой пенсионной страховой компании (Elo, Ilmarinen, Varma, Veritas) или в пенсионной кассе, если такая есть в вашей отрасли (Apteekkien eläkekassa, Eläkekassa Verso). Ставка взноса установлена законом и везде одинакова. Разница — в сервисе и онлайн-кабинете. Страховку можно потом перевести в другую компанию, но доход YEL при переводе без особой причины не меняется.' },
        { t: 'h2', x: 'Пример в евро' },
        { t: 'p', x: 'Айла в 2026 году открывает toiminimi и полный день работает в клининге. Пенсионная компания утверждает её доход YEL — 30 000 € в год.' },
        { t: 'ul', items: [
          'Обычный взнос: 30 000 × 24,4 % = 7 320 € в год, или 610 € в месяц.',
          'Как начинающая, Айла 48 месяцев платит 19,032 %: 5 709,60 € в год, или 475,80 € в месяц. Экономия — 1 610,40 € в год.',
          'Пенсия: 30 000 × 1,5 % = 450 € в год, то есть 37,50 € ежемесячной пенсии за каждый застрахованный год в сегодняшних деньгах.',
          'Доход выше 15 481 €, поэтому Айла может вступить в кассу по безработице для предпринимателей. В примере Kela при доходе YEL 20 000 € больничное — около 47 € за рабочий день, при 30 000 € оно будет выше.',
          'Взносы вычитаются из налогооблагаемого дохода.',
        ] },
        { t: 'p', x: 'Если бы Айла выбрала минимальный доход 9 423,09 €, взнос без скидки составил бы 2 299,23 € в год. Сейчас она сэкономила бы, но пенсии накопилось бы примерно втрое меньше, пособия Kela тоже были бы заметно ниже, а в кассу по безработице она бы не попала.' },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Занижать доход YEL ради экономии. Больничное, родительское пособие и пенсия будут маленькими именно тогда, когда защита нужна.',
          'Не оформить страховку за шесть месяцев. По заявлению пенсионной компании Valtiokonttori может назначить штраф (laiminlyöntimaksu) в размере до суммы взносов за пропущенный период — то есть заплатить придётся до двойной суммы.',
          'Игнорировать требование. Eläketurvakeskus следит за страхованием: если нарушение не исправить, он оформит страховку за счёт предпринимателя за текущий и три предыдущих календарных года. За более ранний период пенсию уже не накопить, а скидку начинающего при принудительном страховании не дают.',
          'Думать, что подработка или kevytyrittäjä не подпадают под YEL. Решают только условия, а не форма бизнеса или занятость.',
          'Акционер osakeyhtiö считает, что зарплата заменяет YEL. Пособия Kela считают от дохода YEL, а не от зарплаты.',
          'Не ответить на предложение о пересмотре дохода в течение двух недель — доход изменят без вашего мнения.',
          'Вычесть взносы YEL дважды: и в декларации бизнеса, и в личной.',
        ] },
        { t: 'note', x: 'Цифры 2026 года: взнос 24,4 %, скидка начинающим 22 % на 48 месяцев, нижний предел дохода 9 423,09 €, верхний 214 000 €, порог для кассы по безработице 15 481 €. В октябре 2026 года правительство внесло в парламент законопроект о реформе YEL: с 2028 года предприниматель мог бы выбирать основой взноса либо нынешний доход YEL, либо облагаемый заработанный доход от бизнеса, а скидка начинающим исчезла бы. Это ещё не закон. Источники: закон 1272/2006, Eläketurvakeskus, Kela и налоговая Verohallinto.' },
        { t: 'h2', x: 'Поможем подобрать YEL правильно' },
        { t: 'p', x: 'Tilitoimisto Debit Credit поможет понять, обязаны ли вы оформлять YEL, и вместе с вами разберёт, какой доход YEL соответствует вашей работе и нужной вам защите. Мы проводим взносы YEL в бухгалтерии, следим, чтобы вычет из налогов был сделан правильно и один раз, и помогаем, когда приходит предложение пенсионной компании о пересмотре дохода. Работаем на русском и финском. Свяжитесь с нами — посмотрим вашу ситуацию с YEL.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Suomi.fi / Eläketurvakeskus: пенсия предпринимателя YEL (на английском)', href: SRC.etkEn },
          { label: 'Suomi.fi: пенсионное страхование предпринимателя (на финском)', href: SRC.guideFi },
          { label: 'Suomi.fi / Eläketurvakeskus: контроль страхования предпринимателей (на финском)', href: SRC.supervisionFi },
          { label: 'Kela: больничное пособие и YEL-päiväraha (на финском)', href: SRC.kelaSick },
          { label: 'Kela: годовой доход и доход YEL предпринимателя (на финском)', href: SRC.kelaIncome },
          { label: 'Vero: вычет взносов YEL (на английском)', href: SRC.deductEn },
          { label: 'Finlex: закон о пенсиях предпринимателей 1272/2006 (на финском)', href: SRC.yel },
          { label: 'Finlex: закон о подоходном налоге 1535/1992, § 96 (на финском)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Нужен ли YEL, если бизнес — подработка?', a: 'Да, если выполнены условия: вам 18–69 лет (для родившихся в 1962 году и позже — до 70), вы работаете в бизнесе, деятельность длится не меньше четырёх месяцев и доход YEL — не менее 9 423,09 € в год (2026). Основная это работа или нет, неважно.' },
        { q: 'Сколько стоит YEL в 2026 году?', a: '24,4 % от утверждённого дохода независимо от возраста. Начинающий предприниматель первые 48 месяцев получает скидку 22 %, и взнос составляет 19,032 %. Например, при доходе 30 000 € взнос — 7 320 € в год, со скидкой — 5 709,60 €.' },
        { q: 'Нужен ли YEL kevytyrittäjä?', a: 'Да, если доход превышает 9 423,09 € в год и выполнены остальные условия. Сервис выставления счетов не работодатель. Без YEL работа kevytyrittäjä не учитывается и при расчёте пособий Kela.' },
        { q: 'Когда YEL нужен акционеру osakeyhtiö?', a: 'Когда он работает в компании на руководящей должности и владеет один больше чем 30 % акций или голосов либо вместе с членами семьи из одного домохозяйства — больше чем 50 %. Иначе зарплату от компании страхуют по TyEL.' },
        { q: 'Что будет, если оформить YEL с опозданием?', a: 'Страховку оформят задним числом, а Valtiokonttori может назначить штраф до суммы взносов за пропущенное время. Если не исправить ситуацию после требования, Eläketurvakeskus сам оформит страховку за текущий и три предыдущих года, и скидки начинающему тогда не будет.' },
        { q: 'Можно ли вычесть взносы YEL из налогов?', a: 'Да, полностью. Владелец toiminimi вычитает их в налогообложении бизнеса, в своём или в налогообложении супруга, но только один раз. Акционер osakeyhtiö вычитает их из своего заработанного дохода или дохода супруга.' },
      ],
    },
    en: {
      title: 'YEL insurance 2026: the entrepreneur’s pension insurance in Finland',
      description:
        'YEL in 2026: who must take it out, how YEL work income is set, the 24.4% contribution and 22% new-entrepreneur discount, Kela benefits and tax deduction.',
      lead: 'YEL, the self-employed person’s pension insurance, is compulsory for almost everyone who works in their own business: sole traders (toiminimi), light entrepreneurs using an invoicing service and the main owners of a limited company (osakeyhtiö). Your YEL work income decides not only your pension but also your Kela sickness and parental allowances. Here are the 2026 limits, rates and rules, with a worked example in euros.',
      body: [
        { t: 'h2', x: 'What is YEL?' },
        { t: 'p', x: 'YEL is statutory earnings-related pension insurance under the Self-employed Persons’ Pensions Act (1272/2006). As a self-employed person you have no employer paying into your pension, so you insure yourself. YEL is not a tax: the contributions go to the pension insurance company or pension fund you choose, and they build up your pension and social security. Voluntary pension savings cannot replace compulsory YEL. If you run several businesses, one YEL policy covers them all.' },
        { t: 'h2', x: 'Who has to take out YEL insurance?' },
        { t: 'p', x: 'YEL is compulsory when all of the following apply:' },
        { t: 'ul', items: [
          'You are at least 18 and below the upper age limit: 69 if you were born in 1958–1961, 70 if you were born in 1962 or later.',
          'You actually work in the business. Owning it is not enough.',
          'Your self-employment has continued without a break for at least four months after you turned 18.',
          'Your estimated YEL work income (YEL-työtulo) is at least €9,423.09 a year (2026).',
          'You live and work in Finland. If you live in another EU or EEA country, EU rules decide where you are insured (A1 certificate).',
        ] },
        { t: 'p', x: 'The same rules apply to side businesses, seasonal work and people working without a Business ID. You must take out the insurance within six months of starting your business.' },
        { t: 'h3', x: 'Your business form matters' },
        { t: 'ul', items: [
          'Sole trader (toiminimi): YEL whenever the conditions are met.',
          'General and limited partnerships (avoin yhtiö, kommandiittiyhtiö): partners with personal liability are YEL entrepreneurs. A silent partner in a limited partnership is insured under TyEL on any salary.',
          'Limited company (osakeyhtiö): a shareholder in a managerial position (managing director, board member or similar) is a YEL entrepreneur if they alone own more than 30% of the shares or votes, or more than 50% together with family members living in the same household. Ownership through another company counts too.',
          'Light entrepreneur: the same rules as everyone else. The invoicing service is not your employer, so YEL is compulsory once you pass the income limit.',
        ] },
        { t: 'h3', x: 'Family members' },
        { t: 'p', x: 'Family members are a spouse or cohabiting partner and relatives in direct ascending or descending line who live in the same household as the entrepreneur. A spouse working in a toiminimi is a YEL entrepreneur, as is any other family member who works there without pay. If a family member other than the spouse is paid a salary, they are insured under TyEL.' },
        { t: 'h3', x: 'Who does not need YEL?' },
        { t: 'ul', items: [
          'An entrepreneur whose work income is below €9,423.09 a year. You can still apply for voluntary YEL, but not retroactively.',
          'Activity lasting less than four months.',
          'A limited company shareholder below the ownership limits. If they are paid a salary by the company, they are insured under TyEL like an employee.',
          'An entrepreneur already drawing an earnings-related old-age pension. For them, YEL is voluntary.',
        ] },
        { t: 'h2', x: 'YEL work income: what it is and how it is set' },
        { t: 'p', x: 'YEL work income is not your turnover, your profit or the salary you pay yourself. It is the money value of your work: the pay you would reasonably have to offer someone with the same skills to do your job. The pension company confirms it based on an overall assessment.' },
        { t: 'ul', items: [
          'Since 2023, the law requires the pension company to compare your work income with the median full-time private-sector pay in your line of business, alongside your workload, the scale of the business and your skills. The calculator on Työeläke.fi gives a recommendation based on your industry and turnover.',
          'The lower limit in 2026 is €9,423.09 and the upper limit €214,000 a year. The limits and your confirmed work income are index-adjusted every January using the wage coefficient.',
          'Every three years the pension company reviews your work income and sends a written proposal. If you do not reply within two weeks, the proposed amount is confirmed. If the change would be 5% or less, no proposal is made.',
          'You can ask for a change yourself if your business changes substantially, for example if your workload grows or shrinks. Work income cannot be changed retroactively.',
        ] },
        { t: 'h2', x: 'YEL contributions in 2026' },
        { t: 'ul', items: [
          'The contribution is 24.4% of your confirmed work income at every age. In 2025 the rate still depended on age (24.1%, and 25.6% for ages 53–62), but there are no age brackets in 2026.',
          'A new entrepreneur pays 22% less for the first 48 months of their first period of self-employment, i.e. 19.032% of work income. If the business ends earlier, the unused discount months can be used in a later period. The discount does not reduce your pension, which accrues on your confirmed work income.',
          'Flexible payments: once per calendar year you may, under certain conditions, pay 10–100% more or 10–20% less than your work income implies without changing it. Paying more increases your pension; paying less reduces it.',
          'You can split the contribution into 1, 2, 3, 4, 6 or 12 instalments a year, with at least half falling due before August. A single instalment in January is the cheapest option, because interest is added to instalments weighted towards the end of the year.',
          'You are personally liable for your YEL contributions, also as a limited company shareholder.',
        ] },
        { t: 'h2', x: 'What YEL work income affects' },
        { t: 'ul', items: [
          'Pension: you earn 1.5% of each year’s work income as pension. The same income also decides your disability and survivors’ pensions.',
          'Kela sickness allowance: for an entrepreneur it is based on YEL work income, not on a salary from your own company or on business profit. If your YEL is in force when you fall ill, the waiting period is only the first day (YEL daily allowance); otherwise it is the first day plus 9 working days.',
          'Parental allowances (maternity and parental allowance) are also based on YEL work income. Without valid YEL, nothing from your self-employment counts towards Kela’s annual income, and this applies to light entrepreneurs too.',
          'Unemployment: you can join an unemployment fund for entrepreneurs if your YEL work income is at least €15,481 a year (2026). Below that you rely on Kela’s basic benefits only.',
          'Accidents: YEL does not cover accidents at work. You can take out voluntary accident and occupational disease insurance, with compensation tied to your YEL work income.',
        ] },
        { t: 'h2', x: 'YEL and taxes' },
        { t: 'ul', items: [
          'Sole trader: deduct YEL contributions either on the business tax return (Form 5), on your own pre-completed return or on your spouse’s return, but only once. If the contributions are booked as expenses and you deduct them personally, enter them on Form 5 as non-deductible expenses.',
          'Limited company shareholder with YEL: the insurance and contributions are personal. Deduct them from your own or your spouse’s earned income on the pre-completed return under YEL- tai MYEL-maksut.',
          'A personal deduction saves the amount of your earned-income tax rate. Voluntary YEL below the income limit is deductible too.',
        ] },
        { t: 'h2', x: 'Where to get insured' },
        { t: 'p', x: 'You can take out YEL with any earnings-related pension insurance company (Elo, Ilmarinen, Varma, Veritas) or with a pension fund if one exists for your field (Apteekkien eläkekassa, Eläkekassa Verso). The contribution rate is set by law and is the same everywhere; the differences lie in service and online tools. You can later move your policy to another company, but your work income will not change on the transfer without a specific reason.' },
        { t: 'h2', x: 'A worked example' },
        { t: 'p', x: 'Aila sets up a toiminimi in 2026 and works full-time in cleaning. Her pension company confirms her YEL work income at €30,000 a year.' },
        { t: 'ul', items: [
          'The normal contribution would be €30,000 × 24.4% = €7,320 a year, or €610 a month.',
          'As a new entrepreneur, Aila pays 19.032% for 48 months: €5,709.60 a year, or €475.80 a month. She saves €1,610.40 a year.',
          'Pension: €30,000 × 1.5% = €450 a year, i.e. €37.50 of monthly pension for each insured year, in today’s money.',
          'Her work income exceeds €15,481, so she can join an entrepreneurs’ unemployment fund. In Kela’s own example, YEL work income of €20,000 gives a sickness allowance of about €47 per working day; at €30,000 it is higher.',
          'Her contributions are tax-deductible, so they reduce her taxable income.',
        ] },
        { t: 'p', x: 'Had Aila chosen the minimum work income of €9,423.09, her contribution without the discount would have been €2,299.23 a year. She would save money now, but she would earn only about a third of the pension, her Kela daily allowances would also be clearly lower, and she could not join an unemployment fund.' },
        { t: 'h2', x: 'Common mistakes' },
        { t: 'ul', items: [
          'Setting work income too low to save on contributions. Sickness allowance, parental allowance and pension stay small exactly when you need them.',
          'Missing the six-month deadline. At the pension company’s request, the State Treasury (Valtiokonttori) can impose a neglect fee of up to the contributions for the neglected period, which can double what you pay.',
          'Ignoring the reminder. The Finnish Centre for Pensions (Eläketurvakeskus) monitors insurance: if you do not correct the neglect, it takes out the insurance at your expense for the current and three previous calendar years. Pension for any earlier period is lost, and compulsory insurance carries no new-entrepreneur discount.',
          'Assuming a side business or light entrepreneurship is outside YEL. Only the conditions count, not the business form or whether it is your main job.',
          'A limited company shareholder thinking a salary replaces YEL. Kela allowances are based on YEL work income, not on salary.',
          'Not replying to a review proposal within two weeks, so the work income changes without your input.',
          'Deducting YEL contributions twice, on both the business and the personal return.',
        ] },
        { t: 'note', x: 'Figures for 2026: contribution 24.4%, new-entrepreneur discount 22% for 48 months, work income lower limit €9,423.09, upper limit €214,000, unemployment fund threshold €15,481. In October 2026 the government submitted a YEL reform bill to Parliament: from 2028 entrepreneurs could choose either today’s work income or their taxable business earned income as the basis, and the new-entrepreneur discount would be removed. The bill is not yet law. Sources: Self-employed Persons’ Pensions Act (1272/2006), Finnish Centre for Pensions, Kela and the Tax Administration.' },
        { t: 'h2', x: 'Let us help you size your YEL' },
        { t: 'p', x: 'Tilitoimisto Debit Credit helps you check whether you must take out YEL and goes through with you which work income fits your work and the cover you need. We book your YEL contributions, make sure they are deducted correctly and only once, and help you when the pension company’s review proposal arrives. We work in Finnish and Russian. Get in touch and we will look at your YEL situation together.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Suomi.fi / Finnish Centre for Pensions: pensions for the self-employed', href: SRC.etkEn },
          { label: 'Suomi.fi: entrepreneur’s pension insurance (in Finnish)', href: SRC.guideFi },
          { label: 'Suomi.fi / Finnish Centre for Pensions: supervision of entrepreneurs’ insurance (in Finnish)', href: SRC.supervisionFi },
          { label: 'Kela: sickness allowance and YEL daily allowance (in Finnish)', href: SRC.kelaSick },
          { label: 'Kela: annual income and YEL work income (in Finnish)', href: SRC.kelaIncome },
          { label: 'Vero: deducting YEL pension premiums', href: SRC.deductEn },
          { label: 'Finlex: Self-employed Persons’ Pensions Act 1272/2006 (in Finnish)', href: SRC.yel },
          { label: 'Finlex: Income Tax Act 1535/1992, section 96 (in Finnish)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Is YEL compulsory for a side business?', a: 'Yes, if the conditions are met: you are 18–69 (up to 70 if born in 1962 or later), you work in the business, it has lasted at least four months and your work income is at least €9,423.09 a year (2026). Whether it is your main job does not matter.' },
        { q: 'How much does YEL cost in 2026?', a: '24.4% of your confirmed work income regardless of age. A new entrepreneur gets a 22% discount for the first 48 months, making it 19.032%. For example, with work income of €30,000 the contribution is €7,320 a year, or €5,709.60 with the discount.' },
        { q: 'Does a light entrepreneur need YEL?', a: 'Yes, if work income exceeds €9,423.09 a year and the other conditions are met. The invoicing service is not an employer. Without YEL, a light entrepreneur’s work does not count towards Kela allowances either.' },
        { q: 'When does a limited company shareholder need YEL?', a: 'When they work in a managerial position and alone own more than 30% of the shares or votes, or more than 50% together with family members in the same household. Otherwise a salary from the company is insured under TyEL.' },
        { q: 'What if I take out YEL late?', a: 'The insurance is backdated, and the State Treasury can impose a neglect fee of up to the contributions for the neglected period. If you do not act on the reminder, the Finnish Centre for Pensions insures you for the current and three previous years, with no new-entrepreneur discount.' },
        { q: 'Can I deduct YEL contributions from my taxes?', a: 'Yes, in full. A sole trader can deduct them in business taxation, on their own return or on the spouse’s, but only once. A limited company shareholder deducts them from their own or their spouse’s earned income.' },
      ],
    },
    et: {
      title: 'YEL-kindlustus 2026: ettevõtja pensionikindlustus Soomes',
      description:
        'YEL 2026: kes peab kindlustuse võtma, kuidas määratakse töötulu, makse 24,4 % ja alustaja 22 % soodustus, mõju Kela hüvitistele ning maksusoodustus.',
      lead: 'YEL ehk ettevõtja pensionikindlustus on Soomes kohustuslik peaaegu igaühele, kes oma ettevõttes ise töötab: füüsilisest isikust ettevõtjale (toiminimi), arveldusteenuse kaudu töötavale kergettevõtjale ja osaühingu (osakeyhtiö) põhiomanikule. YEL-töötulust oleneb lisaks pensionile ka Kela haigus- ja vanemahüvitis. Panime kokku 2026. aasta piirmäärad, maksed ja reeglid ning näite eurodes.',
      body: [
        { t: 'h2', x: 'Mis on YEL?' },
        { t: 'p', x: 'YEL on ettevõtjate pensioniseaduse (yrittäjän eläkelaki 1272/2006) järgne kohustuslik töötulupõhine pensionikindlustus. Ettevõtjal pole tööandjat, kes tema pensioni eest maksaks, seega kindlustab ta end ise. YEL ei ole maks: maksed lähevad sinu valitud pensionikindlustusseltsile või pensionikassale ning nende pealt kogunevad pension ja sotsiaalne kaitse. Kohustuslikku YEL-i ei saa asendada vabatahtliku pensionisäästuga. Kui sul on mitu ettevõtet, katab need kõik üks YEL-kindlustus.' },
        { t: 'h2', x: 'Kes peab YEL-kindlustuse võtma?' },
        { t: 'p', x: 'Kindlustus on kohustuslik, kui kõik järgmised tingimused on täidetud:' },
        { t: 'ul', items: [
          'Oled vähemalt 18-aastane ega ole jõudnud ülemise vanusepiirini: see on 69 aastat aastatel 1958–1961 sündinutel ja 70 aastat 1962. aastal või hiljem sündinutel.',
          'Töötad ettevõttes ise. Ainult omamisest ei piisa.',
          'Ettevõtlus on pärast 18-aastaseks saamist kestnud katkematult vähemalt neli kuud.',
          'Sinu hinnanguline YEL-töötulu (YEL-työtulo) on vähemalt 9 423,09 € aastas (2026).',
          'Elad ja tegutsed Soomes. Kui elad mõnes teises EL-i või EMP riigis, määratakse kindlustusriik EL-i reeglite järgi (A1-tõend).',
        ] },
        { t: 'p', x: 'Samad tingimused kehtivad kõrvaltegevusena, hooajaliselt ja ilma Y-tunnuseta töötavale ettevõtjale. Kindlustus tuleb võtta kuue kuu jooksul ettevõtluse algusest.' },
        { t: 'h3', x: 'Otsustab ettevõtlusvorm' },
        { t: 'ul', items: [
          'Toiminimi (FIE): YEL, kui tingimused on täidetud.',
          'Avoin yhtiö ja kommandiittiyhtiö (täis- ja usaldusühing): isiklikult vastutavad osanikud on YEL-ettevõtjad. Usaldusühingu usaldusosanik kindlustatakse palga pealt TyEL-i järgi.',
          'Osaühing (osakeyhtiö): juhtival kohal (tegevjuht, juhatuse liige vms) töötav osanik on YEL-ettevõtja, kui talle kuulub üksi üle 30 % osakutest või häältest või koos samas leibkonnas elavate pereliikmetega üle 50 %. Arvesse läheb ka teise ettevõtte kaudu omamine.',
          'Kergettevõtja: samad reeglid mis teistelgi. Arveldusteenus ei ole sinu tööandja, seega on YEL kohustuslik, kui töötulu piir ületatakse.',
        ] },
        { t: 'h3', x: 'Pereliikmed' },
        { t: 'p', x: 'Pereliikmed on abikaasa või elukaaslane ning otsejoones üles- või allapoole sugulased, kes elavad ettevõtjaga samas leibkonnas. Toiminimi’s töötav abikaasa on YEL-ettevõtja, samuti muu pereliige, kes töötab palgata. Kui muule pereliikmele kui abikaasale makstakse palka, kindlustatakse ta TyEL-i järgi.' },
        { t: 'h3', x: 'Kes YEL-i ei vaja?' },
        { t: 'ul', items: [
          'Ettevõtja, kelle töötulu jääb alla 9 423,09 € aastas. Vabatahtliku YEL-kindlustuse saab avalduse alusel siiski võtta, kuid mitte tagasiulatuvalt.',
          'Tegevus, mis kestab alla nelja kuu.',
          'Osaühingu osanik, kes jääb omandipiiridest allapoole. Kui ta saab ühingult palka, kindlustatakse ta TyEL-i järgi nagu töötaja.',
          'Töötulupõhisel vanaduspensionil olev ettevõtja: tema jaoks on YEL vabatahtlik.',
        ] },
        { t: 'h2', x: 'YEL-töötulu: mis see on ja kuidas seda määratakse' },
        { t: 'p', x: 'YEL-töötulu ei ole käive, kasum ega endale makstav palk. See on sinu töö rahaline väärtus: palk, mida tuleks mõistlikult maksta sama oskustega inimesele sinu töö eest. Töötulu kinnitab pensionikindlustusselts üldise hinnangu põhjal.' },
        { t: 'ul', items: [
          'Alates 2023. aastast tuleb seaduse järgi võrrelda töötulu sinu tegevusala erasektori täistööajaga töötajate mediaanpalgaga. Lisaks arvestatakse töömahtu, ettevõtluse ulatust ja oskusi. Työeläke.fi kalkulaator annab soovituse tegevusala ja käibe põhjal.',
          '2026. aasta alampiir on 9 423,09 € ja ülempiir 214 000 € aastas. Piire ja kinnitatud töötulu indekseeritakse igal jaanuaril palgakoefitsiendiga.',
          'Iga kolme aasta järel vaatab pensionikindlustusselts töötulu üle ja saadab kirjaliku ettepaneku. Kui sa kahe nädala jooksul ei vasta, kinnitatakse ettepanekus olev summa. Kui muutus oleks kuni 5 %, ettepanekut ei tehta.',
          'Muutust võid ise taotleda, kui ettevõtlus oluliselt muutub, näiteks töömaht kasvab või väheneb. Tagasiulatuvalt töötulu muuta ei saa.',
        ] },
        { t: 'h2', x: 'YEL-makse 2026' },
        { t: 'ul', items: [
          'Makse on 24,4 % kinnitatud töötulust igas vanuses. 2025. aastal sõltus määr veel vanusest (24,1 % ja 53–62-aastastel 25,6 %), 2026. aastal vanuserühmi ei ole.',
          'Alustav ettevõtja maksab oma esimese ettevõtlusperioodi 48 esimese kuu eest 22 % vähem ehk 19,032 % töötulust. Kui tegevus lõpeb varem, saab ülejäänud soodustuskuud kasutada järgmisel perioodil. Soodustus pensioni ei vähenda, sest pension koguneb kinnitatud töötulult.',
          'Paindlik makse: kord kalendriaastas võid teatud tingimustel maksta 10–100 % rohkem või 10–20 % vähem, kui töötulu eeldab, ilma töötulu muutmata. Lisamakse suurendab pensioni, vähendatud makse vähendab seda.',
          'Makse võib jagada 1, 2, 3, 4, 6 või 12 osaks aastas, kusjuures vähemalt pool osadest peab tasumisele tulema enne augustit. Kõige soodsam on üks makse jaanuaris, sest aasta lõppu jäävatele osadele lisandub intress.',
          'YEL-maksete eest vastutad isiklikult ka osaühingus.',
        ] },
        { t: 'h2', x: 'Millele YEL-töötulu mõjub?' },
        { t: 'ul', items: [
          'Pension: igal aastal koguneb 1,5 % aasta töötulust. Samast töötulust olenevad ka töövõimetus- ja toitjakaotuspension.',
          'Kela haigushüvitis (sairauspäiväraha): ettevõtjal arvestatakse see YEL-töötulust, mitte oma ettevõttest makstud palgast ega äritulust. Kui YEL kehtib haigestumise ajal, on omavastutusaeg ainult haigestumispäev (YEL-päiväraha), muidu haigestumispäev ja 9 tööpäeva.',
          'Vanemahüvitised (rasedus- ja vanemahüvitis) arvestatakse samuti YEL-töötulust. Kehtiva YEL-ita ei arvestata ettevõtlusest Kela aastatulusse midagi, ja see puudutab ka kergettevõtjaid.',
          'Töötus: ettevõtjate töötuskassaga saab liituda, kui YEL-töötulu on vähemalt 15 481 € aastas (2026). Väiksema töötuluga jääb ainult Kela põhikaitse.',
          'Tööõnnetused: YEL ei ole õnnetusjuhtumikindlustus. Ettevõtja võib võtta vabatahtliku tööõnnetus- ja kutsehaiguskindlustuse, mille hüvitised on seotud YEL-töötuluga.',
        ] },
        { t: 'h2', x: 'YEL ja maksud' },
        { t: 'ul', items: [
          'Toiminimi: YEL-maksed arvatakse maha kas ettevõtluse maksudeklaratsioonis (vorm 5), oma eeltäidetud deklaratsioonis või abikaasa deklaratsioonis, kuid ainult üks kord. Kui maksed on raamatupidamises kuludeks kirjendatud ja arvad need maha isiklikult, märgi need vormil 5 mittemahaarvatavateks kuludeks.',
          'YEL-kindlustatud osaühingu osanik: kindlustus ja maksed on isiklikud. Need arvatakse maha oma või abikaasa teenitud tulust eeltäidetud deklaratsiooni punktis YEL- tai MYEL-maksut.',
          'Isiklik mahaarvamine säästab sinu teenitud tulu maksumäära ulatuses. Mahaarvatav on ka vabatahtlik YEL alampiirist väiksema töötulu korral.',
        ] },
        { t: 'h2', x: 'Kust kindlustust saab?' },
        { t: 'p', x: 'YEL-i saab võtta igast töötulupõhise pensioni kindlustusseltsist (Elo, Ilmarinen, Varma, Veritas) või pensionikassast, kui sinu valdkonnas see on olemas (Apteekkien eläkekassa, Eläkekassa Verso). Maksemäär on seadusega kehtestatud ja kõikjal sama; erinevused on teeninduses ja e-teenustes. Kindlustuse saab hiljem viia teise seltsi, kuid töötulu ei muutu üleviimisel ilma erilise põhjuseta.' },
        { t: 'h2', x: 'Näide eurodes' },
        { t: 'p', x: 'Aila asutab 2026. aastal toiminimi ja töötab täiskohaga koristusteenuste alal. Pensionikindlustusselts kinnitab tema YEL-töötuluks 30 000 € aastas.' },
        { t: 'ul', items: [
          'Tavaline makse oleks 30 000 × 24,4 % = 7 320 € aastas ehk 610 € kuus.',
          'Alustava ettevõtjana maksab Aila 48 kuud 19,032 %: 5 709,60 € aastas ehk 475,80 € kuus. Sääst on 1 610,40 € aastas.',
          'Pension: 30 000 × 1,5 % = 450 € aastas ehk 37,50 € kuupensioni iga kindlustatud aasta kohta tänases rahas.',
          'Töötulu ületab 15 481 €, nii et Aila saab liituda ettevõtjate töötuskassaga. Kela näites on 20 000 € YEL-töötulu korral haigushüvitis umbes 47 € tööpäeva kohta, 30 000 € korral on see suurem.',
          'Maksed on maksustatavast tulust mahaarvatavad.',
        ] },
        { t: 'p', x: 'Kui Aila oleks valinud alampiiri töötulu 9 423,09 €, oleks makse ilma soodustuseta olnud 2 299,23 € aastas. Ta säästaks praegu, kuid pensioni koguneks vaid umbes kolmandik, ka Kela hüvitised oleksid märgatavalt väiksemad ning töötuskassasse ta ei pääseks.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Liiga madal töötulu maksete kokkuhoiuks. Haigushüvitis, vanemahüvitis ja pension jäävad väikeseks just siis, kui kaitset vaja on.',
          'Kindlustus jääb kuue kuu jooksul võtmata. Pensionikindlustusseltsi taotlusel võib Riigikassa (Valtiokonttori) määrata hooletustasu kuni hooletusaja maksete suuruses, nii et makse võib kahekordistuda.',
          'Meeldetuletust eiratakse. Pensionide keskus (Eläketurvakeskus) jälgib kindlustamist: kui viga ei parandata, võtab ta kindlustuse ettevõtja kulul jooksva ja kolme eelmise kalendriaasta eest. Varasema aja pensioni ei saa enam koguda ja sundkindlustatu alustaja soodustust ei saa.',
          'Arvatakse, et kõrvaltegevus või kergettevõtlus jääb YEL-ist välja. Loevad ainult tingimused, mitte ettevõtlusvorm ega see, kas töö on põhitöö.',
          'Osaühingu osanik arvab, et palk asendab YEL-i. Kela hüvitised arvestatakse YEL-töötulust, mitte palgast.',
          'Töötulu ülevaatuse ettepanekule ei vastata kahe nädala jooksul ja töötulu muutub ilma sinu hinnanguta.',
          'YEL-maksed arvatakse maha kaks korda – nii ettevõtluse kui ka isiklikus deklaratsioonis.',
        ] },
        { t: 'note', x: '2026. aasta arvud: makse 24,4 %, alustaja soodustus 22 % 48 kuu jooksul, töötulu alampiir 9 423,09 €, ülempiir 214 000 € ja töötuskassa piir 15 481 €. 2026. aasta oktoobris andis valitsus parlamendile üle YEL-i reformi eelnõu: alates 2028. aastast võiks ettevõtja valida makse aluseks kas praeguse töötulu või ettevõtluse maksustatava teenitud tulu ning alustaja soodustus kaoks. Eelnõu ei ole veel seadus. Allikad: ettevõtjate pensioniseadus (1272/2006), Eläketurvakeskus, Kela ja Soome maksuamet.' },
        { t: 'h2', x: 'Aitame YEL-i õigesti paika panna' },
        { t: 'p', x: 'Tilitoimisto Debit Credit aitab välja selgitada, kas sul on YEL-kohustus, ja vaatab koos sinuga läbi, milline töötulu sobib sinu tööga ja vajaliku kaitsega. Kirjendame YEL-maksed, hoolitseme, et need arvataks maksustamisel maha õigesti ja ainult kord, ning aitame, kui pensionikindlustusseltsi ülevaatuse ettepanek saabub. Teenindame soome ja vene keeles. Võta ühendust ja vaatame sinu YEL-olukorra koos üle.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Suomi.fi / Eläketurvakeskus: ettevõtja pension YEL (inglise keeles)', href: SRC.etkEn },
          { label: 'Suomi.fi: ettevõtja pensionikindlustus (soome keeles)', href: SRC.guideFi },
          { label: 'Suomi.fi / Eläketurvakeskus: ettevõtjate kindlustamise järelevalve (soome keeles)', href: SRC.supervisionFi },
          { label: 'Kela: haigushüvitis ja YEL-päiväraha (soome keeles)', href: SRC.kelaSick },
          { label: 'Kela: aastatulu ja ettevõtja YEL-töötulu (soome keeles)', href: SRC.kelaIncome },
          { label: 'Vero: YEL-maksete mahaarvamine (inglise keeles)', href: SRC.deductEn },
          { label: 'Finlex: ettevõtjate pensioniseadus 1272/2006 (soome keeles)', href: SRC.yel },
          { label: 'Finlex: tulumaksuseadus 1535/1992, § 96 (soome keeles)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Kas YEL on kohustuslik ka kõrvaltegevusena?', a: 'Jah, kui tingimused on täidetud: oled 18–69-aastane (1962. aastal või hiljem sündinutel kuni 70), töötad ettevõttes, tegevus on kestnud vähemalt neli kuud ja töötulu on vähemalt 9 423,09 € aastas (2026). See, kas töö on põhitöö, ei loe.' },
        { q: 'Kui palju YEL 2026. aastal maksab?', a: '24,4 % kinnitatud töötulust vanusest olenemata. Alustav ettevõtja saab esimesed 48 kuud 22 % soodustust ja makse on 19,032 %. Näiteks 30 000 € töötulu korral on makse 7 320 € aastas, soodustusega 5 709,60 €.' },
        { q: 'Kas kergettevõtja vajab YEL-i?', a: 'Jah, kui töötulu ületab 9 423,09 € aastas ja muud tingimused on täidetud. Arveldusteenus ei ole tööandja. Ilma YEL-ita ei arvestata kergettevõtja tööd ka Kela hüvitiste puhul.' },
        { q: 'Millal vajab YEL-i osaühingu osanik?', a: 'Kui ta töötab ühingus juhtival kohal ja talle kuulub üksi üle 30 % osakutest või häältest või koos samas leibkonnas elavate pereliikmetega üle 50 %. Muidu kindlustatakse ühingult saadud palk TyEL-i järgi.' },
        { q: 'Mis juhtub, kui võtan YEL-i hilinemisega?', a: 'Kindlustus võetakse tagasiulatuvalt ja Riigikassa võib määrata hooletustasu kuni hooletusaja maksete suuruses. Kui meeldetuletuse peale olukorda ei paranda, võtab Eläketurvakeskus kindlustuse sinu eest jooksva ja kolme eelmise aasta eest ning alustaja soodustust siis ei ole.' },
        { q: 'Kas YEL-makseid saab maksudest maha arvata?', a: 'Jah, täies ulatuses. Toiminimi saab need maha arvata ettevõtluse, oma või abikaasa maksustamisel, kuid ainult üks kord. Osaühingu osanik arvab need maha oma või abikaasa teenitud tulust.' },
      ],
    },
    uk: {
      title: 'YEL 2026: пенсійне страхування підприємця у Фінляндії',
      description:
        'YEL 2026: хто мусить оформити страховку, як визначають дохід YEL (työtulo), внесок 24,4 % і знижка 22 % новачкам, допомоги Kela, податковий вирахунок.',
      lead: 'YEL — обов’язкове пенсійне страхування підприємця. Воно потрібне майже кожному, хто сам працює у своєму бізнесі: власнику toiminimi, «легкому» підприємцю (kevytyrittäjä) і основному власнику osakeyhtiö. Від доходу YEL залежить не лише пенсія, а й допомоги Kela у разі хвороби та по догляду за дитиною. Зібрали ліміти, ставки й правила 2026 року та приклад у євро.',
      body: [
        { t: 'h2', x: 'Що таке YEL' },
        { t: 'p', x: 'YEL — обов’язкове пенсійне страхування за законом про пенсії підприємців (yrittäjän eläkelaki 1272/2006). У підприємця немає роботодавця, який сплачував би пенсійні внески, тож він страхує себе сам. Це не податок: внески йдуть до обраної вами пенсійної страхової компанії або пенсійної каси, і з них накопичуються пенсія та соціальний захист. Замінити обов’язковий YEL добровільними пенсійними заощадженнями не можна. Якщо у вас кілька фірм, одна страховка YEL покриває їх усі.' },
        { t: 'h2', x: 'Хто зобов’язаний оформити YEL' },
        { t: 'p', x: 'Страховка обов’язкова, якщо виконано всі умови:' },
        { t: 'ul', items: [
          'Вам виповнилося 18 років, і ви ще не досягли верхньої вікової межі: 69 років для народжених у 1958–1961 роках і 70 років для народжених у 1962 році й пізніше.',
          'Ви самі працюєте в бізнесі. Самого володіння недостатньо.',
          'Діяльність триває без перерви щонайменше чотири місяці після 18-річчя.',
          'Ваш розрахунковий дохід YEL (YEL-työtulo) — не менше 9 423,09 € на рік (2026).',
          'Ви живете й працюєте у Фінляндії. Якщо ви живете в іншій країні ЄС або ЄЕЗ, країну страхування визначають за правилами ЄС (довідка A1).',
        ] },
        { t: 'p', x: 'Умови однакові для підробітку, сезонної роботи та роботи без Y-tunnus. Оформити страховку треба протягом шести місяців від початку діяльності.' },
        { t: 'h3', x: 'Усе вирішує форма бізнесу' },
        { t: 'ul', items: [
          'Toiminimi (фізична особа-підприємець): YEL, якщо виконано умови.',
          'Avoin yhtiö і kommandiittiyhtiö: учасники з особистою відповідальністю — підприємці за YEL. «Мовчазного» учасника kommandiittiyhtiö страхують за TyEL, як працівника.',
          'Osakeyhtiö: акціонер на керівній посаді (toimitusjohtaja, член правління чи подібне) — підприємець за YEL, якщо йому одному належить понад 30 % акцій або голосів чи разом із членами сім’ї, які живуть з ним в одному домогосподарстві, — понад 50 %. Ураховується й володіння через іншу компанію.',
          'Kevytyrittäjä: ті самі правила, що й для всіх. Сервіс виставлення рахунків — не ваш роботодавець, тож у разі перевищення порогу YEL обов’язковий.',
        ] },
        { t: 'h3', x: 'Члени сім’ї' },
        { t: 'p', x: 'Членами сім’ї вважаються чоловік чи дружина або партнер, з яким ви живете разом, а також родичі за прямою висхідною та низхідною лінією, які живуть з підприємцем в одному домогосподарстві. Подружжя, що працює в toiminimi, — підприємець за YEL, як і інший член сім’ї, що працює без зарплати. Якщо іншому членові сім’ї (не подружжю) платять зарплату, його страхують за TyEL.' },
        { t: 'h3', x: 'Кому YEL не потрібен' },
        { t: 'ul', items: [
          'Якщо дохід YEL менший за 9 423,09 € на рік. Добровільну страховку YEL можна оформити за заявою, але не заднім числом.',
          'Якщо діяльність триває менше чотирьох місяців.',
          'Акціонерові osakeyhtiö, який не досягає порогів володіння. Якщо він отримує від компанії зарплату, його страхують за TyEL, як працівника.',
          'Підприємцеві на трудовій пенсії за віком: для нього YEL добровільний.',
        ] },
        { t: 'h2', x: 'Дохід YEL: що це і як його визначають' },
        { t: 'p', x: 'Дохід YEL (työtulo) — це не оборот, не прибуток і не зарплата, яку ви собі платите. Це грошова оцінка вашої праці: яку зарплату довелося б платити людині з такою ж кваліфікацією за ту саму роботу. Дохід затверджує пенсійна компанія на основі загальної оцінки.' },
        { t: 'ul', items: [
          'З 2023 року закон вимагає порівнювати дохід із медіанною зарплатою штатних працівників приватного сектору вашої галузі. Ураховують також обсяг роботи, масштаб бізнесу й кваліфікацію. Калькулятор на сайті Työeläke.fi дає рекомендацію за галуззю та оборотом.',
          'Нижня межа у 2026 році — 9 423,09 €, верхня — 214 000 € на рік. Межі й затверджений дохід щороку в січні індексують за коефіцієнтом зарплат (palkkakerroin).',
          'Раз на три роки пенсійна компанія переглядає дохід і надсилає письмову пропозицію. Якщо не відповісти протягом двох тижнів, запропонований дохід затверджують. Якщо зміна не перевищує 5 %, пропозиції не буде.',
          'Ви самі можете попросити змінити дохід, якщо бізнес істотно змінився, наприклад зросло чи зменшилося навантаження. Заднім числом дохід не змінюють.',
        ] },
        { t: 'h2', x: 'Внесок YEL у 2026 році' },
        { t: 'ul', items: [
          'Внесок — 24,4 % від затвердженого доходу для всіх вікових груп. У 2025 році ставка ще залежала від віку (24,1 %, а в 53–62 роки — 25,6 %), у 2026 році вікових груп немає.',
          'Підприємець-початківець перші 48 місяців своєї першої підприємницької діяльності платить на 22 % менше, тобто 19,032 % доходу. Якщо бізнес закрився раніше, решту місяців знижки можна використати наступного разу. Пенсію знижка не зменшує: пенсія накопичується від затвердженого доходу.',
          'Гнучкий внесок: раз на календарний рік можна за певних умов сплатити на 10–100 % більше або на 10–20 % менше, не змінюючи дохід. Доплата збільшує пенсію, зменшений внесок її знижує.',
          'Внесок можна розбити на 1, 2, 3, 4, 6 або 12 платежів на рік, при цьому щонайменше половина має припадати на час до серпня. Найдешевше — один платіж у січні: до платежів наприкінці року додають відсотки.',
          'За внески YEL ви відповідаєте особисто, зокрема й в osakeyhtiö.',
        ] },
        { t: 'h2', x: 'На що впливає дохід YEL' },
        { t: 'ul', items: [
          'Пенсія: щороку накопичується 1,5 % річного доходу YEL. Від нього ж залежать пенсія у зв’язку з непрацездатністю та пенсія у разі втрати годувальника.',
          'Лікарняна допомога Kela (sairauspäiväraha): у підприємця її рахують від доходу YEL, а не від зарплати з власної фірми й не від прибутку бізнесу. Якщо YEL діє на момент хвороби, період без виплат — лише день захворювання (YEL-päiväraha), а без нього — день захворювання і ще 9 робочих днів.',
          'Допомоги у зв’язку з вагітністю та доглядом за дитиною (vanhempainpäivärahat) також рахують від доходу YEL. Без чинного YEL дохід від підприємництва до річного доходу для Kela не потрапляє зовсім — це стосується і kevytyrittäjä.',
          'Безробіття: вступити до каси з безробіття для підприємців можна за доходу YEL від 15 481 € на рік (2026). З меншим доходом залишається лише базовий захист Kela.',
          'Нещасні випадки: YEL не страхує від травм на роботі. Можна оформити добровільне страхування від нещасних випадків і професійних захворювань, виплати за яким прив’язані до доходу YEL.',
        ] },
        { t: 'h2', x: 'YEL і податки' },
        { t: 'ul', items: [
          'Toiminimi: внески YEL вираховують або в податковій декларації бізнесу (форма 5), або у своїй попередньо заповненій декларації, або в декларації подружжя — але лише один раз. Якщо внески проведено в бухгалтерії як витрати, а вирахування ви робите особисто, у формі 5 їх треба зазначити як невираховувані витрати.',
          'Акціонер osakeyhtiö зі страховкою YEL: страховка й внески особисті. Їх вираховують зі свого заробленого доходу або доходу подружжя в попередньо заповненій декларації, у пункті YEL- tai MYEL-maksut.',
          'Особисте вирахування заощаджує суму, що дорівнює вашій ставці податку на зароблений дохід. Добровільний YEL за доходу нижче порогу теж вираховується.',
        ] },
        { t: 'h2', x: 'Де оформити страховку' },
        { t: 'p', x: 'YEL можна оформити в будь-якій пенсійній страховій компанії (Elo, Ilmarinen, Varma, Veritas) або в пенсійній касі, якщо така є у вашій галузі (Apteekkien eläkekassa, Eläkekassa Verso). Ставку внеску встановлює закон, і вона скрізь однакова. Різниця — у сервісі та онлайн-кабінеті. Страховку можна згодом перевести до іншої компанії, але дохід YEL під час переведення без особливої причини не змінюється.' },
        { t: 'h2', x: 'Приклад у євро' },
        { t: 'p', x: 'Айла у 2026 році відкриває toiminimi і повний день працює у сфері прибирання. Пенсійна компанія затверджує її дохід YEL — 30 000 € на рік.' },
        { t: 'ul', items: [
          'Звичайний внесок: 30 000 × 24,4 % = 7 320 € на рік, або 610 € на місяць.',
          'Як початківець, Айла 48 місяців платить 19,032 %: 5 709,60 € на рік, або 475,80 € на місяць. Економія — 1 610,40 € на рік.',
          'Пенсія: 30 000 × 1,5 % = 450 € на рік, тобто 37,50 € щомісячної пенсії за кожен застрахований рік у сьогоднішніх грошах.',
          'Дохід вищий за 15 481 €, тож Айла може вступити до каси з безробіття для підприємців. У прикладі Kela за доходу YEL 20 000 € лікарняна допомога — близько 47 € за робочий день, за 30 000 € вона буде вищою.',
          'Внески вираховуються з оподатковуваного доходу.',
        ] },
        { t: 'p', x: 'Якби Айла обрала мінімальний дохід 9 423,09 €, внесок без знижки становив би 2 299,23 € на рік. Зараз вона заощадила б, але пенсії накопичилося б приблизно втричі менше, допомоги Kela теж були б помітно нижчими, а до каси з безробіття вона б не потрапила.' },
        { t: 'h2', x: 'Поширені помилки' },
        { t: 'ul', items: [
          'Занижувати дохід YEL заради економії. Лікарняна, батьківська допомога та пенсія будуть малими саме тоді, коли захист потрібен.',
          'Не оформити страховку за шість місяців. На заяву пенсійної компанії Valtiokonttori може призначити штраф (laiminlyöntimaksu) у розмірі до суми внесків за пропущений період — тобто заплатити доведеться до подвійної суми.',
          'Ігнорувати вимогу. Eläketurvakeskus стежить за страхуванням: якщо порушення не виправити, він оформить страховку за рахунок підприємця за поточний і три попередні календарні роки. За раніший період пенсію вже не накопичити, а знижки початківця за примусового страхування не дають.',
          'Вважати, що підробіток або kevytyrittäjä не підпадають під YEL. Вирішують лише умови, а не форма бізнесу чи зайнятість.',
          'Акціонер osakeyhtiö вважає, що зарплата замінює YEL. Допомоги Kela рахують від доходу YEL, а не від зарплати.',
          'Не відповісти на пропозицію щодо перегляду доходу протягом двох тижнів — дохід змінять без вашої думки.',
          'Вирахувати внески YEL двічі: і в декларації бізнесу, і в особистій.',
        ] },
        { t: 'note', x: 'Цифри 2026 року: внесок 24,4 %, знижка початківцям 22 % на 48 місяців, нижня межа доходу 9 423,09 €, верхня 214 000 €, поріг для каси з безробіття 15 481 €. У жовтні 2026 року уряд вніс до парламенту законопроєкт про реформу YEL: з 2028 року підприємець міг би обирати основою внеску або нинішній дохід YEL, або оподатковуваний зароблений дохід від бізнесу, а знижка початківцям зникла б. Це ще не закон. Джерела: закон 1272/2006, Eläketurvakeskus, Kela і податкова Verohallinto.' },
        { t: 'h2', x: 'Допоможемо правильно визначити YEL' },
        { t: 'p', x: 'Tilitoimisto Debit Credit допоможе з’ясувати, чи зобов’язані ви оформлювати YEL, і разом з вами розбере, який дохід YEL відповідає вашій роботі та потрібному вам захисту. Ми проводимо внески YEL у бухгалтерії, стежимо, щоб податкове вирахування було зроблено правильно й один раз, і допомагаємо, коли надходить пропозиція пенсійної компанії про перегляд доходу. Працюємо фінською та російською. Зв’яжіться з нами — подивимося вашу ситуацію з YEL.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Suomi.fi / Eläketurvakeskus: пенсія підприємця YEL (англійською)', href: SRC.etkEn },
          { label: 'Suomi.fi: пенсійне страхування підприємця (фінською)', href: SRC.guideFi },
          { label: 'Suomi.fi / Eläketurvakeskus: контроль страхування підприємців (фінською)', href: SRC.supervisionFi },
          { label: 'Kela: лікарняна допомога і YEL-päiväraha (фінською)', href: SRC.kelaSick },
          { label: 'Kela: річний дохід і дохід YEL підприємця (фінською)', href: SRC.kelaIncome },
          { label: 'Vero: вирахування внесків YEL (англійською)', href: SRC.deductEn },
          { label: 'Finlex: закон про пенсії підприємців 1272/2006 (фінською)', href: SRC.yel },
          { label: 'Finlex: закон про податок на доходи 1535/1992, § 96 (фінською)', href: SRC.tvl },
        ] },
      ],
      faq: [
        { q: 'Чи потрібен YEL, якщо бізнес — підробіток?', a: 'Так, якщо виконано умови: вам 18–69 років (для народжених у 1962 році й пізніше — до 70), ви працюєте в бізнесі, діяльність триває щонайменше чотири місяці, а дохід YEL — не менше 9 423,09 € на рік (2026). Основна це робота чи ні, не має значення.' },
        { q: 'Скільки коштує YEL у 2026 році?', a: '24,4 % від затвердженого доходу незалежно від віку. Підприємець-початківець перші 48 місяців отримує знижку 22 %, і внесок становить 19,032 %. Наприклад, за доходу 30 000 € внесок — 7 320 € на рік, зі знижкою — 5 709,60 €.' },
        { q: 'Чи потрібен YEL kevytyrittäjä?', a: 'Так, якщо дохід перевищує 9 423,09 € на рік і виконано інші умови. Сервіс виставлення рахунків не є роботодавцем. Без YEL робота kevytyrittäjä не враховується і під час розрахунку допомог Kela.' },
        { q: 'Коли YEL потрібен акціонерові osakeyhtiö?', a: 'Коли він працює в компанії на керівній посаді й володіє сам понад 30 % акцій або голосів чи разом із членами сім’ї з одного домогосподарства — понад 50 %. Інакше зарплату від компанії страхують за TyEL.' },
        { q: 'Що буде, якщо оформити YEL із запізненням?', a: 'Страховку оформлять заднім числом, а Valtiokonttori може призначити штраф до суми внесків за пропущений час. Якщо не виправити ситуацію після вимоги, Eläketurvakeskus сам оформить страховку за поточний і три попередні роки, і знижки початківцю тоді не буде.' },
        { q: 'Чи можна вирахувати внески YEL з податків?', a: 'Так, повністю. Власник toiminimi вираховує їх в оподаткуванні бізнесу, у своєму або в оподаткуванні подружжя, але лише один раз. Акціонер osakeyhtiö вираховує їх зі свого заробленого доходу або доходу подружжя.' },
      ],
    },
  },
};
