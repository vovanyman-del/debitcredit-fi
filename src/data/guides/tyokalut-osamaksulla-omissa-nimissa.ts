import type { Guide } from './types';

// Q&A page: "I bought tools on instalment credit in my own name and the company pays the instalments —
// is it a company expense, and what documents are needed?" Facts verified 2026-11-26, verbatim:
// - Vero, syventävä ohje Tulolähdesiirrot, yksityiskäyttöönotot ja yksityissijoitukset luonnollisten
//   henkilöiden ja henkilöyhtiöiden verotuksessa (A83/200/2018, 25.11.2019, voimassa toistaiseksi): 3.2.2
//   "Elinkeinonharjoittajan yksityisliike (toiminimi) ei ole omistajastaan erillinen oikeushenkilö.
//   Elinkeinonharjoittaja ei voi maksaa itselleen palkkaa tai luontaisetuja, tehdä kauppoja tai solmia muita
//   sopimuksia yrityksensä kanssa."; 3.2.1 (EVL 51 a § 3 mom.) "hankintamenoksi katsotaan hyödykkeen
//   alkuperäinen hankintameno tai sitä alempi hyödykkeen todennäköinen luovutushinta siirtohetkellä";
//   Esimerkki 7: tools bought for 10 000 €, now worth 15 000 € → "irtaimen käyttöomaisuuden hankintamenoksi
//   muodostuu 10.000 euroa".
// - Vero, syventävä ohje Poistot elinkeinoverotuksessa (VH/3556/00.01.00/2025, 3.9.2025): "Omistus- tai
//   takaisinotto-oikeuden pidätyksestä huolimatta oikeus poistojen tekemiseen on luovutushetkestä alkaen
//   ostajalla. Ostaja voi siten tehdä osamaksulla hankitusta hyödykkeestä poistot samalla tavalla kuin
//   tilanteessa, jossa koko kauppahinta olisi maksettu kerralla."; KHO 1987 B 528: "Koska kiinteistön
//   omistusoikeus ei ollut vielä verovuoden aikana siirtynyt yhtiölle, yhtiöllä ei ollut oikeutta ... tehdä
//   poistoa"; korotetut poistot only "verovuosina 2020-2025".
// - Elinkeinoverolaki 360/1968 (Finlex): 30 § "Verovuoden poiston suuruus saa olla enintään 25 prosenttia
//   menojäännöksestä."; 33 § 1 mom. kertapoisto if "todennäköinen taloudellinen käyttöaika on enintään 3 vuotta"
//   or "hankintameno on enintään 1 200 euroa (pienhankinta)"; 33 § 2 mom. "Pienhankintoina saadaan verovuonna
//   vähentää yhteensä enintään 3 600 euroa."; 18 § 1 mom. 3 k. deductible: "elinkeinotoiminnasta johtuneen
//   velan korko".
// - Arvonlisäverolaki 1501/1993 (Finlex): 102 § 1 mom. 1 k. deduction of tax on goods bought "toiselta
//   verovelvolliselta"; 102 a § "vähennysoikeuden edellytyksenä on, että verovelvollisella on ostamastaan
//   tavarasta tai palvelusta myyjän antama 209 e ja 209 f §:n mukainen lasku tai muu laskuna toimiva tosite".
// - Vero, syventävä ohje Laskutusvaatimukset arvonlisäverotuksessa (VH/3634/00.01.00/2023, 1.9.2023): "Lasku on
//   osoitettava ostajalle"; "Myyjän laskuun tosiasiallisia olosuhteita vastaamattomasti tekemät merkinnät eivät
//   tuo ostajalle vähennysoikeutta"; kevennetty lasku (no buyer's name) "kun laskun loppusumma on enintään 400
//   euroa" or "vähittäiskaupassa ... laskun loppusummalla ei ole merkitystä".
// - Vero, Arvonlisäveron vähennys ostoista (page updated 28.3.2025): "Jos käytät hankkimaasi tavaraa tai
//   palvelua myös muussa kuin arvonlisäverollisessa toiminnassa, saat vähentää vain arvonlisäverollista käyttöä
//   vastaavan osuuden."
// - Vero, syventävä ohje Peitelty osinko (VH/3393/00.01.00/2025, 28.8.2025): 6.6 "Jos osakas maksaa yhtiön
//   varoilla omia yksityismenojaan ... verotetaan peiteltynä osinkona. Peiteltyä osinkoa ei kuitenkaan muodostu,
//   jos yhtiö käsittelee yksityismenot ... osakkaan palkkana ... [tai] jos erät kirjataan osakaslainaksi"; 4.3
//   no peitelty osinko "jos osakas korvaa hankinnat yhtiölle pian"; 6.3 "Osakas voi vuokrata tai myydä
//   yhtiölleen kiinteää tai irtainta omaisuutta. Peiteltyä osinkoa voi muodostua, jos osakas myy ... olennaiseen
//   ylihintaan."; 6.7.1 private expenses "voidaan käsitellä ... osakaslainana viimeistään tilinpäätöksen
//   laatimisen yhteydessä".
// - Vero, syventävä ohje Osakaslainan verotus (VH/3794/00.01.00/2023): capital income if the borrower with family
//   owns "vähintään 10 %"; only the part unpaid at the end of the tax year.
// - Kirjanpitolaki 1336/1997 (Finlex) 2:5: "Kirjauksen on perustuttava päivättyyn ja järjestelmällisesti
//   numeroituun tai vastaavalla tavalla yksilöityyn tositteeseen, joka todentaa liiketapahtuman."
// - Worked example (own arithmetic): 1 000,00 × 25,5 / 125,5 = 203,187… → 203,19 € VAT, 796,81 € without VAT;
//   12 × 88,00 = 1 056,00 € → credit costs 56,00 €.
const VERO = 'https://www.vero.fi';

const SRC = {
  privateTransfers: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/80791/tulol%C3%A4hdesiirrot-yksityisk%C3%A4ytt%C3%B6%C3%B6notot-ja-yksityissijoitukset-luonnollisten-henkil%C3%B6iden-ja-henkil%C3%B6yhti%C3%B6iden-verotuksessa/`,
  depreciation: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/102183/poistot-elinkeinoverotuksessa4/`,
  smallPurchases: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/vahennykset/poistot-ja-pienhankinnat/`,
  vatDeduction: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus/arvonlisaveron-vahennys-ostoista/`,
  invoicing: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48090/laskutusvaatimukset-arvonlisaverotuksessa3/`,
  invoicingEn: `${VERO}/en/detailed-guidance/guidance/48090/vat-invoice-requirements/`,
  hiddenDividend: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48147/peitelty-osinko11/`,
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
};

export const tyokalutOsamaksullaOmissaNimissa: Guide = {
  slug: 'tyokalut-osamaksulla-omissa-nimissa',
  datePublished: '2026-11-30',
  dateModified: '2026-11-30',
  content: {
    ru: {
      title: 'Купил инструменты в рассрочку на своё имя, а платит фирма — это расход фирмы?',
      description: 'Инструменты в рассрочку (Klarna и т. п.) на личное имя: когда это расход toiminimi или Oy, можно ли вычесть ALV и какие документы сохранить. Пример в евро.',
      lead: 'У toiminimi — да: фирма не отделена от владельца, и инструмент для работы — её имущество, даже если чек и кредит на ваше имя; проценты и комиссии тоже расход. У Oy — только если фирма купит инструмент у вас по договору. Просто платить ваш личный кредит Oy не может: это ваш личный расход, и без оформления как зарплаты или займа он облагается как скрытые дивиденды.',
      body: [
        { t: 'h2', x: 'Toiminimi: покупка на своё имя — покупка фирмы' },
        { t: 'p', x: 'Toiminimi не отдельное юридическое лицо: владелец не может заключать договоры сам с собой, поэтому чек и договор рассрочки на ваше имя не мешают. Важно, для чего инструмент: если он нужен для работы, это имущество фирмы. Рассрочка не меняет дела: покупатель может списывать купленное в рассрочку так же, как если бы заплатил всё сразу. Кредит, взятый на покупку для фирмы, — долг фирмы: взносы со счёта фирмы уменьшают долг, а проценты и комиссии вычитаются как расходы.' },
        { t: 'p', x: 'Если инструмент сначала был в личном пользовании и только потом перешёл в работу, это личный вклад (yksityissijoitus). Его стоимость для налога — цена покупки или более низкая рыночная цена на момент передачи.' },
        { t: 'h2', x: 'Сразу в расходы или по частям' },
        { t: 'ul', items: [
          'Предмет стоимостью до 1 200 € (pienhankinta) можно списать сразу в году начала использования; таких мелких покупок — не больше 3 600 € в год.',
          'Сразу можно списать и то, что прослужит не больше 3 лет.',
          'Остальное оборудование списывается амортизацией — до 25 % остаточной стоимости в год. Повышенная амортизация 50 % действовала только в 2020–2025 годах.',
        ] },
        { t: 'h2', x: 'ALV' },
        { t: 'p', x: 'Для вычета ALV нужен счёт или чек продавца, плательщика ALV, с суммой налога. Toiminimi в реестре ALV вычитает налог из чека на имя владельца: в магазинном чеке имя покупателя вообще не обязательно. Если инструментом пользуются и в личных целях, вычитается только рабочая доля. Без регистрации в ALV налог входит в стоимость инструмента.' },
        { t: 'h2', x: 'Oy: фирма покупает у владельца' },
        { t: 'p', x: 'Oy и владелец — разные лица. Пока инструмент принадлежит вам, фирма не может его списывать, а взносы по вашему кредиту за счёт фирмы — ваш личный расход. Если их не оформить как зарплату или заём владельцу (osakaslaina), налоговая облагает их как скрытые дивиденды (peitelty osinko). Правильный путь — договор купли-продажи: вы продаёте инструмент фирме по рыночной цене, обычно не дороже своей цены покупки. Завышенная цена тоже даёт скрытые дивиденды. ALV фирма при этом не вычитает: покупатель по чеку — вы, а частное лицо продаёт без ALV.' },
        { t: 'h2', x: 'Пример' },
        { t: 'p', x: 'Инструменты стоят 1 000,00 € с ALV 25,5 %: налог 203,19 €, без налога 796,81 €. Рассрочка — 12 взносов по 88,00 € = 1 056,00 €, то есть 56,00 € — проценты и комиссии. Toiminimi в реестре ALV вычитает 203,19 € ALV, списывает 796,81 € сразу как pienhankinta и 56,00 € — как расходы. Oy покупает инструменты у владельца за 1 000,00 €, ALV не вычитает и тоже списывает 1 000,00 € сразу. Фирма платит только эти 1 000,00 €; 56,00 € — расходы владельца, если их не оформить как зарплату или заём.' },
        { t: 'h2', x: 'Какие документы сохранить' },
        { t: 'ul', items: [
          'чек или счёт продавца: дата, продавец, товар, цена и ALV;',
          'договор рассрочки и график платежей;',
          'выписки банка о каждом взносе;',
          'короткую записку: что за инструмент, с какого дня и для какой работы используется;',
          'для Oy — договор купли-продажи между владельцем и фирмой (дата, предмет, цена, порядок оплаты).',
        ] },
        { t: 'note', x: 'Проще всего сразу покупать на фирму: счёт и кредит на Oy — тогда это покупка фирмы, и ALV можно вычесть, если фирма в реестре ALV.' },
        { t: 'links', items: [
          { label: 'Vero: Yksityissijoitukset ja yksityiskäyttöönotot (toiminimi)', href: SRC.privateTransfers },
          { label: 'Vero: Poistot elinkeinoverotuksessa (osamaksukauppa)', href: SRC.depreciation },
          { label: 'Vero: Poistot ja pienhankinnat', href: SRC.smallPurchases },
          { label: 'Vero: Arvonlisäveron vähennys ostoista', href: SRC.vatDeduction },
          { label: 'Vero: Peitelty osinko', href: SRC.hiddenDividend },
          { label: 'Finlex: Elinkeinoverolaki 360/1968, 18, 30 ja 33 §', href: SRC.evl },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993, 102 ja 102 a §', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Вопросы о расходах — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском: как оформить покупку, которая уже сделана на личное имя.' },
      ],
      faq: [
        { q: 'Можно ли вычесть ALV, если чек на моё имя?', a: 'У toiminimi в реестре ALV — да, за рабочую долю. У Oy — нет: покупатель по чеку — владелец, а фирма покупает у частного лица без ALV.' },
        { q: 'Oy уже платит взносы, а договора нет. Что делать?', a: 'Эти суммы нужно оформить как зарплату или заём владельцу не позже составления годового отчёта, иначе их облагают как скрытые дивиденды. Дальше — договор купли-продажи с фирмой.' },
        { q: 'Можно ли списать инструмент, пока рассрочка не выплачена?', a: 'Да. При покупке в рассрочку право на амортизацию у покупателя с момента передачи товара, как будто цена оплачена сразу.' },
      ],
    },
    fi: {
      title: 'Ostin työkalut osamaksulla omissa nimissäni ja yritys maksaa erät – onko se yrityksen kulu?',
      description: 'Työkalut osamaksulla (esim. Klarna) omalla nimellä: milloin ne ovat toiminimen tai osakeyhtiön kulu, saako ALV:n vähentää ja mitkä tositteet tarvitaan.',
      lead: 'Toiminimessä kyllä: yritys ei ole omistajastaan erillinen, ja työhön hankittu työkalu on yrityksen omaisuutta, vaikka kuitti ja luotto ovat omissa nimissäsi; myös korot ja luoton kulut ovat kuluja. Osakeyhtiössä vain, jos yhtiö ostaa työkalun sinulta kauppakirjalla. Pelkkiä henkilökohtaisen luottosi eriä yhtiö ei voi maksaa: ne ovat yksityismenojasi, ja ilman palkka- tai osakaslainakäsittelyä ne verotetaan peiteltynä osinkona.',
      body: [
        { t: 'h2', x: 'Toiminimi: oma osto on yrityksen osto' },
        { t: 'p', x: 'Toiminimi ei ole omistajastaan erillinen oikeushenkilö, eikä yrittäjä voi tehdä kauppoja tai sopimuksia yrityksensä kanssa. Siksi kuitti ja osamaksusopimus omalla nimelläsi eivät estä vähennystä. Ratkaisevaa on käyttö: työhön hankittu työkalu on elinkeinotoiminnan omaisuutta. Osamaksu ei muuta tätä: ostaja saa tehdä poistot samalla tavalla kuin jos koko hinta olisi maksettu kerralla. Yrityksen hankintaan otettu luotto on elinkeinotoiminnan velka: yrityksen tililtä maksetut erät lyhentävät velkaa, ja korot ja luoton kulut ovat vähennyskelpoisia.' },
        { t: 'p', x: 'Jos työkalu oli ensin yksityiskäytössä ja siirtyy vasta myöhemmin työhön, kyse on yksityissijoituksesta. Hankintamenona on alkuperäinen ostohinta tai sitä alempi käypä arvo siirtohetkellä.' },
        { t: 'h2', x: 'Kerralla kuluksi vai poistoina' },
        { t: 'ul', items: [
          'Enintään 1 200 euron hankinta (pienhankinta) voidaan vähentää kokonaan käyttöönottovuonna; pienhankintoja yhteensä enintään 3 600 € vuodessa.',
          'Kerralla saa vähentää myös hyödykkeen, jonka taloudellinen käyttöaika on enintään 3 vuotta.',
          'Muu kone ja kalusto poistetaan enintään 25 %:lla menojäännöksestä vuodessa. Korotetut 50 %:n poistot koskivat vain verovuosia 2020–2025.',
        ] },
        { t: 'h2', x: 'Arvonlisävero' },
        { t: 'p', x: 'Vähennys edellyttää arvonlisäverovelvollisen myyjän laskua tai kuittia, jossa vero on merkitty. Arvonlisäverovelvollinen toiminimi vähentää veron yrittäjän nimellä olevasta kuitista; vähittäiskaupan kuitissa ostajan nimeä ei edes tarvita. Jos työkalua käytetään myös yksityisesti, vähennetään vain liiketoimintaa vastaava osuus. Ilman ALV-rekisteröintiä vero sisältyy hankintamenoon.' },
        { t: 'h2', x: 'Osakeyhtiö: yhtiö ostaa omistajalta' },
        { t: 'p', x: 'Yhtiö ja osakas ovat eri henkilöitä. Niin kauan kuin työkalu on sinun, yhtiö ei voi tehdä siitä poistoja, ja yhtiön varoilla maksetut luottosi erät ovat yksityismenojasi. Jos niitä ei käsitellä palkkana tai osakaslainana, ne verotetaan peiteltynä osinkona. Oikea tapa on kauppakirja: myyt työkalun yhtiölle käypään hintaan, tavallisesti enintään omaan ostohintaasi. Ylihinta johtaa sekin peiteltyyn osinkoon. Arvonlisäveroa yhtiö ei tällöin vähennä: kuitin ostaja olet sinä, ja yksityishenkilö myy ilman arvonlisäveroa.' },
        { t: 'h2', x: 'Esimerkki' },
        { t: 'p', x: 'Työkalut maksavat 1 000,00 € sisältäen ALV:n 25,5 %: veroa 203,19 €, veroton hinta 796,81 €. Osamaksussa on 12 erää à 88,00 € eli 1 056,00 €, joten korkoja ja kuluja on 56,00 €. Arvonlisäverovelvollinen toiminimi vähentää 203,19 €:n ALV:n, kirjaa 796,81 € kerralla pienhankintana ja 56,00 € kuluksi. Osakeyhtiö ostaa työkalut omistajalta 1 000,00 €:lla, ei vähennä ALV:ta ja vähentää myös 1 000,00 € kerralla. Yhtiö maksaa vain nämä 1 000,00 €; 56,00 € on omistajan menoa, ellei sitä käsitellä palkkana tai osakaslainana.' },
        { t: 'h2', x: 'Mitkä tositteet tarvitaan' },
        { t: 'ul', items: [
          'myyjän kuitti tai lasku: päivä, myyjä, tuote, hinta ja ALV;',
          'osamaksu- tai luottosopimus ja maksusuunnitelma;',
          'tiliotteet jokaisesta maksetusta erästä;',
          'lyhyt muistio: mikä työkalu, mistä päivästä ja mihin työhön sitä käytetään;',
          'osakeyhtiössä kauppakirja omistajan ja yhtiön välillä (päivä, esine, hinta, maksutapa).',
        ] },
        { t: 'note', x: 'Helpointa on ostaa suoraan yrityksen nimiin: lasku ja luotto osakeyhtiölle, jolloin hankinta on yhtiön oma ja ALV:n saa vähentää, jos yhtiö on arvonlisäverovelvollinen.' },
        { t: 'links', items: [
          { label: 'Vero: Tulolähdesiirrot, yksityiskäyttöönotot ja yksityissijoitukset', href: SRC.privateTransfers },
          { label: 'Vero: Poistot elinkeinoverotuksessa (osamaksukauppa)', href: SRC.depreciation },
          { label: 'Vero: Poistot ja pienhankinnat', href: SRC.smallPurchases },
          { label: 'Vero: Arvonlisäveron vähennys ostoista', href: SRC.vatDeduction },
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa', href: SRC.invoicing },
          { label: 'Vero: Peitelty osinko', href: SRC.hiddenDividend },
          { label: 'Finlex: Elinkeinoverolaki 360/1968, 18, 30 ja 33 §', href: SRC.evl },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993, 102 ja 102 a §', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi: miten omalla nimellä jo tehty hankinta kirjataan.' },
      ],
      faq: [
        { q: 'Saako arvonlisäveron vähentää, jos kuitti on omalla nimelläni?', a: 'Arvonlisäverovelvollinen toiminimi saa, liiketoimintaa vastaavalta osuudelta. Osakeyhtiö ei saa: kuitin ostaja on omistaja, ja yhtiö ostaa yksityishenkilöltä ilman arvonlisäveroa.' },
        { q: 'Yhtiö on jo maksanut eriä ilman kauppakirjaa. Mitä nyt?', a: 'Maksut on käsiteltävä osakkaan palkkana tai osakaslainana viimeistään tilinpäätöksessä, muuten ne verotetaan peiteltynä osinkona. Jatkossa tehdään kauppakirja yhtiön kanssa.' },
        { q: 'Saako työkalusta tehdä poistoja ennen kuin osamaksu on maksettu?', a: 'Saa. Osamaksukaupassa poisto-oikeus on ostajalla luovutushetkestä alkaen, samoin kuin jos koko hinta olisi maksettu kerralla.' },
      ],
    },
    en: {
      title: 'I bought tools on instalments in my own name and the company pays — is it a business expense?',
      description: 'Tools bought on instalment credit (e.g. Klarna) in your own name: when they are a sole trader’s or a limited company’s expense, VAT and the documents to keep.',
      lead: 'For a sole trader, yes: the business is not separate from its owner, so a tool used for work is a business asset even if the receipt and credit are in your name; interest and credit fees are expenses too. For a limited company (Oy), only if the company buys the tool from you under a written sale. The company cannot simply pay your personal credit: those payments are your private expenses and, unless treated as salary or a shareholder loan, they are taxed as a hidden dividend.',
      body: [
        { t: 'h2', x: 'Sole trader: your purchase is the business’s purchase' },
        { t: 'p', x: 'A sole trader (toiminimi) is not a separate legal person and cannot make contracts with their own business, so a receipt and instalment agreement in your name are no obstacle. What counts is use: a tool acquired for work is a business asset. Buying on instalments changes nothing: the buyer may depreciate it as if the whole price had been paid at once. Credit taken for a business purchase is a business debt: instalments paid from the business account reduce it, and interest and fees are deductible.' },
        { t: 'p', x: 'If the tool was first in private use and only later moved to the business, it is a private investment (yksityissijoitus), valued at the original price or the lower fair value at the time of transfer.' },
        { t: 'h2', x: 'Expense at once or depreciation' },
        { t: 'ul', items: [
          'An item costing up to €1,200 (pienhankinta) can be deducted in full in the year it is taken into use, up to €3,600 of such items a year.',
          'An item with an economic life of up to 3 years can also be deducted at once.',
          'Other machinery and equipment is depreciated at up to 25 % of the remaining balance a year. The increased 50 % depreciation applied only to tax years 2020–2025.',
        ] },
        { t: 'h2', x: 'VAT' },
        { t: 'p', x: 'The deduction requires an invoice or receipt from a VAT-registered seller showing the tax. A VAT-registered sole trader deducts VAT from a receipt in the owner’s name; a shop receipt does not even need the buyer’s name. If the tool is also used privately, only the business share is deductible. Without VAT registration the tax is part of the cost.' },
        { t: 'h2', x: 'Limited company: the company buys from the owner' },
        { t: 'p', x: 'The company and the shareholder are separate persons. While the tool is yours, the company cannot depreciate it, and instalments on your credit paid with company money are your private expenses. Unless treated as salary or a shareholder loan (osakaslaina), they are taxed as a hidden dividend (peitelty osinko). The right way is a written sale: you sell the tool to the company at fair value, normally no more than you paid. An inflated price also creates a hidden dividend. The company deducts no VAT here: you are the buyer on the receipt, and a private person sells without VAT.' },
        { t: 'h2', x: 'Example' },
        { t: 'p', x: 'Tools cost €1,000.00 incl. 25.5 % VAT: €203.19 VAT, €796.81 without VAT. The plan is 12 instalments of €88.00 = €1,056.00, so €56.00 is interest and fees. A VAT-registered sole trader deducts €203.19 VAT, expenses €796.81 at once as a small acquisition and €56.00 as costs. A limited company buys the tools from the owner for €1,000.00, deducts no VAT and also expenses €1,000.00 at once. The company pays only that €1,000.00; the €56.00 is the owner’s cost unless treated as salary or a shareholder loan.' },
        { t: 'h2', x: 'Documents to keep' },
        { t: 'ul', items: [
          'the seller’s receipt or invoice: date, seller, item, price and VAT;',
          'the instalment or credit agreement and payment plan;',
          'bank statements for each instalment;',
          'a short note: which tool, from which date and for what work it is used;',
          'for a limited company, a sale agreement between owner and company (date, item, price, payment terms).',
        ] },
        { t: 'note', x: 'Easiest is to buy in the company’s name from the start: invoice and credit to the Oy, so the purchase is the company’s own and VAT is deductible if the company is VAT-registered.' },
        { t: 'links', items: [
          { label: 'Vero: Private investments and withdrawals (in Finnish)', href: SRC.privateTransfers },
          { label: 'Vero: Depreciation in business taxation (in Finnish)', href: SRC.depreciation },
          { label: 'Vero: VAT invoice requirements', href: SRC.invoicingEn },
          { label: 'Vero: Hidden dividend (in Finnish)', href: SRC.hiddenDividend },
          { label: 'Finlex: Business Income Tax Act 360/1968, sections 18, 30 and 33', href: SRC.evl },
          { label: 'Finlex: VAT Act 1501/1993, sections 102 and 102 a', href: SRC.avl },
        ] },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'Can I deduct VAT if the receipt is in my name?', a: 'A VAT-registered sole trader can, for the business share. A limited company cannot: the owner is the buyer on the receipt, and the company buys from a private person without VAT.' },
        { q: 'The company already pays the instalments without a sale agreement. What now?', a: 'The payments must be treated as the shareholder’s salary or a shareholder loan by the time the financial statements are prepared at the latest, otherwise they are taxed as a hidden dividend. Going forward, make a sale agreement.' },
        { q: 'Can the tool be depreciated before the instalments are paid?', a: 'Yes. In an instalment sale the right to depreciate belongs to the buyer from delivery, as if the full price had been paid at once.' },
      ],
    },
    et: {
      title: 'Ostsin tööriistad järelmaksuga enda nimele ja ettevõte maksab osamakseid – kas see on ettevõtte kulu?',
      description: 'Tööriistad järelmaksuga (nt Klarna) enda nimele Soomes: millal on see FIE või osaühingu kulu, kas käibemaksu saab maha arvata ja millised dokumendid hoida.',
      lead: 'FIE-l (toiminimi) jah: ettevõte ei ole omanikust eraldi ning tööks soetatud tööriist on ettevõtte vara, isegi kui tšekk ja laen on teie nimel; ka intressid ja laenukulud on kulud. Osaühingus (Oy) ainult siis, kui ühing ostab tööriista teilt müügilepinguga. Teie isikliku laenu osamakseid ühing lihtsalt maksta ei saa: need on teie erakulud ja kui neid ei käsitleta palga või osaniku laenuna, maksustatakse need varjatud dividendina.',
      body: [
        { t: 'h2', x: 'FIE: teie ost on ettevõtte ost' },
        { t: 'p', x: 'FIE ei ole omanikust eraldiseisev juriidiline isik ega saa iseenda ettevõttega lepinguid sõlmida, seega teie nimel olev tšekk ja järelmaksuleping ei sega. Otsustav on kasutus: tööks soetatud tööriist on ettevõtte vara. Järelmaks ei muuda midagi: ostja võib teha kulumit samamoodi, nagu oleks kogu hind kohe makstud. Ettevõtte ostuks võetud laen on ettevõtte võlg: ettevõtte kontolt makstud osamaksed vähendavad võlga ning intressid ja kulud on mahaarvatavad.' },
        { t: 'p', x: 'Kui tööriist oli algul isiklikus kasutuses ja läks tööle alles hiljem, on see erasissemakse (yksityissijoitus). Soetusmaks on algne ostuhind või sellest madalam turuväärtus üleandmise hetkel.' },
        { t: 'h2', x: 'Kohe kuluks või kulumina' },
        { t: 'ul', items: [
          'Kuni 1 200 € maksva eseme (pienhankinta) võib kasutuselevõtu aastal täies ulatuses maha arvata; selliseid väikesoetusi kokku kuni 3 600 € aastas.',
          'Kohe võib maha arvata ka eseme, mille majanduslik kasutusiga on kuni 3 aastat.',
          'Muudelt masinatelt ja seadmetelt tehakse kulumit kuni 25 % jääkväärtusest aastas. Suurendatud 50 % kulum kehtis ainult maksuaastatel 2020–2025.',
        ] },
        { t: 'h2', x: 'Käibemaks (ALV)' },
        { t: 'p', x: 'Mahaarvamiseks on vaja käibemaksukohustuslasest müüja arvet või tšekki, kus maks on näidatud. Käibemaksukohustuslasest FIE arvab maksu maha omaniku nimel olevalt tšekilt; poe tšekil ei pea ostja nime üldse olema. Kui tööriista kasutatakse ka isiklikult, arvatakse maha ainult äritegevuse osa. Ilma ALV-registreeringuta on maks osa soetusmaksumusest.' },
        { t: 'h2', x: 'Osaühing: ühing ostab omanikult' },
        { t: 'p', x: 'Ühing ja osanik on eri isikud. Kuni tööriist kuulub teile, ei saa ühing sellelt kulumit teha ning ühingu rahaga makstud laenuosamaksed on teie erakulud. Kui neid ei käsitleta palga või osaniku laenuna (osakaslaina), maksustatakse need varjatud dividendina (peitelty osinko). Õige tee on müügileping: müüte tööriista ühingule turuhinnaga, tavaliselt mitte kallimalt, kui ise maksite. Ülehind toob samuti kaasa varjatud dividendi. Käibemaksu ühing siin maha ei arva: tšeki järgi olete ostja teie ja eraisik müüb ilma käibemaksuta.' },
        { t: 'h2', x: 'Näide' },
        { t: 'p', x: 'Tööriistad maksavad 1 000,00 € koos 25,5 % käibemaksuga: maks 203,19 €, maksuta 796,81 €. Järelmaksus on 12 makset à 88,00 € ehk 1 056,00 €, seega 56,00 € on intressid ja kulud. Käibemaksukohustuslasest FIE arvab maha 203,19 € käibemaksu, kannab 796,81 € kohe kuluks väikesoetusena ja 56,00 € kuludesse. Osaühing ostab tööriistad omanikult 1 000,00 € eest, käibemaksu maha ei arva ja kannab samuti 1 000,00 € kohe kuluks. Ühing maksab ainult need 1 000,00 €; 56,00 € on omaniku kulu, kui seda ei käsitleta palga või osaniku laenuna.' },
        { t: 'h2', x: 'Millised dokumendid hoida' },
        { t: 'ul', items: [
          'müüja tšekk või arve: kuupäev, müüja, kaup, hind ja käibemaks;',
          'järelmaksu- või laenuleping ja maksegraafik;',
          'pangaväljavõtted iga osamakse kohta;',
          'lühike märkus: mis tööriist, mis kuupäevast ja millise töö jaoks seda kasutatakse;',
          'osaühingus müügileping omaniku ja ühingu vahel (kuupäev, ese, hind, maksetingimused).',
        ] },
        { t: 'note', x: 'Kõige lihtsam on osta kohe ettevõtte nimele: arve ja laen osaühingule, siis on ost ühingu oma ja käibemaksu saab maha arvata, kui ühing on käibemaksukohustuslane.' },
        { t: 'links', items: [
          { label: 'Vero: Yksityissijoitukset ja yksityiskäyttöönotot', href: SRC.privateTransfers },
          { label: 'Vero: Poistot elinkeinoverotuksessa', href: SRC.depreciation },
          { label: 'Vero: Arvonlisäveron vähennys ostoista', href: SRC.vatDeduction },
          { label: 'Vero: Peitelty osinko', href: SRC.hiddenDividend },
          { label: 'Finlex: Elinkeinoverolaki 360/1968', href: SRC.evl },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993', href: SRC.avl },
        ] },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kas käibemaksu saab maha arvata, kui tšekk on minu nimel?', a: 'Käibemaksukohustuslasest FIE saab, äritegevuse osa ulatuses. Osaühing ei saa: tšeki järgi on ostja omanik ja ühing ostab eraisikult ilma käibemaksuta.' },
        { q: 'Ühing maksab osamakseid juba ilma müügilepinguta. Mis nüüd?', a: 'Maksed tuleb käsitleda osaniku palga või laenuna hiljemalt raamatupidamise aastaaruande koostamisel, muidu maksustatakse need varjatud dividendina. Edaspidi tuleb sõlmida müügileping.' },
        { q: 'Kas tööriistalt võib kulumit teha enne, kui järelmaks on tasutud?', a: 'Jah. Järelmaksuga ostu puhul on kulumi tegemise õigus ostjal alates üleandmisest, nagu oleks kogu hind kohe makstud.' },
      ],
    },
    uk: {
      title: 'Купив інструменти в розстрочку на своє ім’я, а платить фірма — це витрата фірми?',
      description: 'Інструменти в розстрочку (Klarna тощо) на власне ім’я: коли це витрата toiminimi чи Oy, чи можна відняти ALV і які документи зберегти. Приклад у євро.',
      lead: 'У toiminimi — так: фірма не відокремлена від власника, тож інструмент для роботи — її майно, навіть якщо чек і кредит на ваше ім’я; відсотки й комісії теж витрати. У Oy — лише якщо фірма купить інструмент у вас за договором. Просто платити ваш особистий кредит Oy не може: це ваші особисті витрати, і без оформлення як зарплати чи позики власнику їх оподатковують як приховані дивіденди.',
      body: [
        { t: 'h2', x: 'Toiminimi: покупка на своє ім’я — покупка фірми' },
        { t: 'p', x: 'Toiminimi не є окремою юридичною особою, і власник не може укладати договори сам із собою, тому чек і договір розстрочки на ваше ім’я не заважають. Важливо, для чого інструмент: якщо він потрібен для роботи, це майно фірми. Розстрочка нічого не змінює: покупець може амортизувати річ так само, ніби заплатив усю ціну одразу. Кредит, узятий на покупку для фірми, — борг фірми: внески з рахунку фірми зменшують борг, а відсотки й комісії віднімаються як витрати.' },
        { t: 'p', x: 'Якщо інструмент спершу був в особистому користуванні й лише потім перейшов у роботу, це особистий внесок (yksityissijoitus). Його вартість для податку — ціна купівлі або нижча ринкова ціна на момент передачі.' },
        { t: 'h2', x: 'Одразу у витрати чи частинами' },
        { t: 'ul', items: [
          'Річ вартістю до 1 200 € (pienhankinta) можна списати повністю в році початку використання; таких дрібних покупок — не більше 3 600 € на рік.',
          'Одразу можна списати й те, що прослужить не більше 3 років.',
          'Інше обладнання амортизується — до 25 % залишкової вартості на рік. Підвищена амортизація 50 % діяла лише у 2020–2025 роках.',
        ] },
        { t: 'h2', x: 'ALV' },
        { t: 'p', x: 'Для відрахування ALV потрібен рахунок або чек продавця — платника ALV — із сумою податку. Toiminimi в реєстрі ALV віднімає податок із чека на ім’я власника: у магазинному чеку ім’я покупця взагалі не обов’язкове. Якщо інструментом користуються й особисто, віднімається лише робоча частка. Без реєстрації в ALV податок входить у вартість інструмента.' },
        { t: 'h2', x: 'Oy: фірма купує у власника' },
        { t: 'p', x: 'Oy і власник — різні особи. Поки інструмент належить вам, фірма не може його амортизувати, а внески за вашим кредитом коштом фірми — ваші особисті витрати. Якщо їх не оформити як зарплату або позику власнику (osakaslaina), податкова оподатковує їх як приховані дивіденди (peitelty osinko). Правильний шлях — договір купівлі-продажу: ви продаєте інструмент фірмі за ринковою ціною, зазвичай не дорожче за свою ціну купівлі. Завищена ціна теж дає приховані дивіденди. ALV фірма при цьому не віднімає: покупець за чеком — ви, а приватна особа продає без ALV.' },
        { t: 'h2', x: 'Приклад' },
        { t: 'p', x: 'Інструменти коштують 1 000,00 € з ALV 25,5 %: податок 203,19 €, без податку 796,81 €. Розстрочка — 12 внесків по 88,00 € = 1 056,00 €, тобто 56,00 € — відсотки й комісії. Toiminimi в реєстрі ALV віднімає 203,19 € ALV, списує 796,81 € одразу як pienhankinta і 56,00 € — як витрати. Oy купує інструменти у власника за 1 000,00 €, ALV не віднімає і теж списує 1 000,00 € одразу. Фірма платить лише ці 1 000,00 €; 56,00 € — витрати власника, якщо їх не оформити як зарплату чи позику.' },
        { t: 'h2', x: 'Які документи зберегти' },
        { t: 'ul', items: [
          'чек або рахунок продавця: дата, продавець, товар, ціна й ALV;',
          'договір розстрочки та графік платежів;',
          'банківські виписки про кожен внесок;',
          'коротку записку: що за інструмент, з якого дня і для якої роботи використовується;',
          'для Oy — договір купівлі-продажу між власником і фірмою (дата, предмет, ціна, порядок оплати).',
        ] },
        { t: 'note', x: 'Найпростіше одразу купувати на фірму: рахунок і кредит на Oy — тоді це покупка фірми, і ALV можна відняти, якщо фірма в реєстрі ALV.' },
        { t: 'links', items: [
          { label: 'Vero: Yksityissijoitukset ja yksityiskäyttöönotot', href: SRC.privateTransfers },
          { label: 'Vero: Poistot elinkeinoverotuksessa', href: SRC.depreciation },
          { label: 'Vero: Arvonlisäveron vähennys ostoista', href: SRC.vatDeduction },
          { label: 'Vero: Peitelty osinko', href: SRC.hiddenDividend },
          { label: 'Finlex: Elinkeinoverolaki 360/1968', href: SRC.evl },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993', href: SRC.avl },
        ] },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською.' },
      ],
      faq: [
        { q: 'Чи можна відняти ALV, якщо чек на моє ім’я?', a: 'У toiminimi в реєстрі ALV — так, за робочу частку. У Oy — ні: покупець за чеком — власник, а фірма купує в приватної особи без ALV.' },
        { q: 'Oy вже платить внески, а договору немає. Що робити?', a: 'Ці суми треба оформити як зарплату або позику власнику не пізніше складання річного звіту, інакше їх оподатковують як приховані дивіденди. Надалі — договір купівлі-продажу з фірмою.' },
        { q: 'Чи можна амортизувати інструмент, поки розстрочку не виплачено?', a: 'Так. При купівлі в розстрочку право на амортизацію має покупець з моменту передачі товару, ніби ціну сплачено одразу.' },
      ],
    },
  },
};
