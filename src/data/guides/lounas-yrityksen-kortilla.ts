import type { Guide } from './types';

// Q&A page: "Can I have lunch and pay with the company card?" Facts verified 18 Nov 2026, verbatim:
// - Verohallinnon päätös vuodelta 2026 toimitettavassa verotuksessa noudatettavista luontoisetujen
//   laskentaperusteista (VH/6275/00.01.00/2025, 13.11.2025, voimassa 1.1.2026 –): § 10 ravintoetu 8,80 €
//   when the employer's direct costs incl. VAT are 8,80–14,00 €, otherwise the actual costs; § 12 laitosruokailu
//   6,60 € / 5,28 €, hotel and restaurant staff 7,48 €; § 13 ruokailulipuke up to 14,00 € → 75 % of the face
//   value, "kuitenkin vähintään" 8,80 €; only for meals (and meal delivery), one per actual working day in
//   Finland; § 14 maksukortti 75 % of the credited amount, at least 8,80 €, credit 8,80–14,00 € per meal.
// - Verohallinnon päätös ... vuodelta 2027 (VH/5689/00.01.00/2026, 16.11.2026): "Ravintoedun arvo on 9,00
//   euroa ateriaa kohden ... vähintään 9,00 euroa ja enintään 14,40 euroa"; voucher "enintään 14,40 euron
//   nimellisarvoisen ... 75 % ... kuitenkin vähintään 9,00 euroa".
// - Vero, syventävä ohje Luontoisedut verotuksessa (VH/6801/00.01.00/2025, 9.12.2025, voimassa 1.1.2026 –):
//   5.2 "Sopimusruokailulla tarkoitetaan järjestelyä, jossa työnantaja on tehnyt suoraan yleisessä käytössä
//   olevan ruokailupaikan kanssa sopimuksen"; "Jos palkansaajan työpäivä kestää keskimäärin alle kuusi
//   tuntia, ravintoetu arvostetaan käypään arvoon"; 1.1 "Palkansaajan itse hankkimat hyödykkeet, joiden
//   kustannukset työnantaja korvaa palkansaajalle" are not benefits in kind but cash pay; 1.3 a working
//   shareholder's ordinary benefits are valued under the decision if booked as salary and reported to the
//   Incomes Register, otherwise they may be taxed as peitelty osinko.
// - Vero, Rahan nostot ja sijoitukset rahana (toiminimi, page updated 6.8.2025): "Et voi maksaa palkkaa
//   itsellesi"; "Jos nostat rahaa yrityksesi tililtä, nosto on yksityisotto. Älä merkitse sitä kirjanpitoon
//   yrityksen kuluksi."
// - Vero, Yritystoiminta, tulonhankkimistoiminta ja harrastustoiminta henkilöverotuksessa (VH/8236/00.01.00/2024,
//   18.12.2024): "Verovelvollisen elantomenot eivät ole verotuksessa vähennyskelpoisia (TVL 31 § 4 momentti)";
//   "Elantomenot ovat menoja, jotka syntyvät riippumatta siitä, harjoitettiinpa tulonhankkimistoimintaa tai ei."
// - Elinkeinoverolaki 360/1968 (Finlex) 8 § 1 mom. 8 k.: "50 prosenttia edustusmenojen määrästä";
//   Arvonlisäverolaki 1501/1993 (Finlex) 114 § 1 mom. 3 k.: no deduction for "edustustarkoitukseen
//   käytettävät tavarat ja palvelut".
// - Worked example (own arithmetic): card credit 12,00 € × 75 % = 9,00 € ≥ 8,80 €; 20 days → 180 €.
const VERO = 'https://www.vero.fi';

const SRC = {
  decision2026: `${VERO}/syventavat-vero-ohjeet/paatokset/47380/verohallinnon-paatos-vuodelta-2026-toimitettavassa-verotuksessa-noudatettavista-luontoisetujen-laskentaperusteista/`,
  decision2026En: `${VERO}/en/detailed-guidance/decisions/47380/in-kind-benefits-fringe-benefits-2026/`,
  benefitsGuide: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/47886/luontoisedut-verotuksessa15/`,
  withdrawals: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/veroilmoituksen-t%C3%A4ytt%C3%B6ohje/rahan-nostot-ja-sijoitukset-rahana/`,
  evl: 'https://www.finlex.fi/fi/lainsaadanto/1968/360',
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
};

export const lounasYrityksenKortilla: Guide = {
  slug: 'lounas-yrityksen-kortilla',
  datePublished: '2026-11-18',
  dateModified: '2026-11-18',
  content: {
    ru: {
      title: 'Можно ли пообедать и заплатить картой фирмы?',
      description: 'Обед владельца и работника за счёт фирмы в 2026 году: ravintoetu 8,80 €, обеденные карты 75 %, обед с клиентом (50 %, без ALV) и личный обед у toiminimi.',
      lead: 'Обычный обед для себя за счёт фирмы — это либо налогооблагаемая выгода работника (ravintoetu), либо личный расход, который налог не уменьшает. Исключение — обед с клиентом ради деловых отношений, но и тогда в налоге вычитается только 50 %, а ALV не вычитается совсем.',
      body: [
        { t: 'h2', x: 'Toiminimi: обед — личный расход' },
        { t: 'p', x: 'Владелец toiminimi не может платить себе зарплату, поэтому и обеденную выгоду себе оформить не может. Обычный обед нужен независимо от работы, а такие расходы (elantomenot) налог не уменьшают. Если вы заплатили за свой обед картой фирмы, это личное снятие (yksityisotto), а не расход фирмы. В командировке действуют свои правила: вместо суточных у владельца toiminimi есть вычет в налоговой декларации.' },
        { t: 'h2', x: 'Oy: обед как выгода работника' },
        { t: 'p', x: 'В Oy обед может быть выгодой работника — в том числе владельца, который получает зарплату. Льготная оценка действует, когда питание организует фирма: своя столовая, договор с рестораном (sopimusruokailu), обеденные ваучеры или карта (lounasseteli, lounaskortti). Значения на 2026 год:' },
        { t: 'ul', items: [
          'обед в столовой или по договору с рестораном — 8,80 €, если расходы фирмы с ALV от 8,80 до 14,00 €; иначе — по фактической стоимости;',
          'ваучер номиналом до 14,00 € или обеденная карта, на которую фирма зачисляет от 8,80 до 14,00 € за обед, — 75 % от суммы, но не меньше 8,80 €; один обед на фактический рабочий день в Финляндии;',
          'если рабочий день в среднем короче 6 часов, обед оценивается по рыночной стоимости.',
        ] },
        { t: 'p', x: 'Оценочная стоимость прибавляется к зарплате: с неё удерживают налог, её учитывают во взносах и показывают в отчёте в Tulorekisteri. Если работник платит за обед сам, а фирма возвращает деньги по чеку, это не выгода, а обычная денежная зарплата на всю сумму. Если владелец Oy просто оплатил свой обед картой фирмы, проще всего вернуть деньги фирме. Выгоду, которую не оформили как зарплату, налоговая может посчитать скрытыми дивидендами (peitelty osinko).' },
        { t: 'h2', x: 'Обед с клиентом — представительский расход' },
        { t: 'p', x: 'Если вы угощаете клиента или партнёра ради деловых отношений, это представительский расход (edustusmeno). В налоге на прибыль вычитается 50 % такого расхода, а ALV из него не вычитается.' },
        { t: 'h2', x: 'Пример' },
        { t: 'p', x: 'Фирма зачисляет работнику на обеденную карту 12,00 € за рабочий день. Выгода — 75 % = 9,00 € в день, за 20 рабочих дней к зарплате прибавляется 180 €. Обед с клиентом стоил 100 € с ALV: налог не вычитается, в расходах 100 €, из них в налоге на прибыль вычитается 50 €.' },
        { t: 'note', x: 'С 1.1.2027 действуют новые значения: 9,00 € за обед, верхняя граница 14,40 € (решение Vero от 16.11.2026).' },
        { t: 'links', items: [
          { label: 'Vero: решение о luontoisedut на 2026 год', href: SRC.decision2026 },
          { label: 'Vero: Luontoisedut verotuksessa (ravintoetu)', href: SRC.benefitsGuide },
          { label: 'Vero: Rahan nostot ja sijoitukset rahana (toiminimi)', href: SRC.withdrawals },
          { label: 'Finlex: Elinkeinoverolaki 360/1968, 8 §', href: SRC.evl },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993, 114 §', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Вопросы о расходах — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском: какой чек — расход фирмы, а какой — личный.' },
      ],
      faq: [
        { q: 'Можно ли владельцу toiminimi оплачивать обеды картой фирмы?', a: 'Можно, но это личные деньги: такой платёж записывают как личное снятие (yksityisotto), налог он не уменьшает.' },
        { q: 'Как облагается обеденная карта в 2026 году?', a: 'В зарплату включают 75 % от суммы, которую фирма зачисляет за рабочий день, но не меньше 8,80 €. Фирма зачисляет от 8,80 до 14,00 € за обед.' },
        { q: 'Обед в командировке — то же самое?', a: 'Нет. Работнику в командировке платят суточные (päiväraha) по отдельным правилам, а владелец toiminimi вместо них делает вычет в налоговой декларации.' },
      ],
    },
    fi: {
      title: 'Saako lounaan maksaa yrityksen kortilla?',
      description: 'Yrittäjän ja työntekijän lounas yrityksen piikkiin 2026: ravintoetu 8,80 €, lounasseteli ja -kortti 75 %, edustuslounas (50 %, ei ALV-vähennystä) ja toiminimen yksityisotto.',
      lead: 'Tavallinen oma lounas yrityksen rahoilla on joko työntekijän veronalainen ravintoetu tai yksityinen meno, joka ei vähennä veroja. Poikkeus on asiakkaan kanssa liikesuhteen vuoksi syöty lounas, mutta siitäkin vähennetään tuloverotuksessa vain 50 % eikä arvonlisäveroa vähennetä lainkaan.',
      body: [
        { t: 'h2', x: 'Toiminimi: lounas on yksityinen meno' },
        { t: 'p', x: 'Toiminimiyrittäjä ei voi maksaa itselleen palkkaa, joten hän ei voi antaa itselleen ravintoetuakaan. Tavallinen lounas on elantomeno: se syntyy, tehtiinpä töitä tai ei, eikä se ole vähennyskelpoinen. Jos maksat oman lounaasi yrityksen kortilla, kyse on yksityisotosta, ei yrityksen kulusta. Työmatkoilla on omat sääntönsä: päivärahan sijaan toiminimiyrittäjä tekee vähennyksen veroilmoituksella.' },
        { t: 'h2', x: 'Osakeyhtiö: lounas ravintoetuna' },
        { t: 'p', x: 'Osakeyhtiössä lounas voi olla työntekijän ravintoetu, myös palkkaa nostavan osakkaan. Kaavamainen arvo koskee työnantajan järjestämää ruokailua: henkilöstöravintola, sopimusruokailu ravintolan kanssa, lounasseteli tai lounaskortti. Vuoden 2026 arvot:' },
        { t: 'ul', items: [
          'työpaikka- tai sopimusruokailu 8,80 €, jos työnantajan välittömät kustannukset arvonlisäveroineen ovat 8,80–14,00 €; muuten todelliset kustannukset;',
          'enintään 14,00 €:n lounasseteli tai lounaskortti, jolle työnantaja lataa 8,80–14,00 € ateriaa kohden: 75 % arvosta, kuitenkin vähintään 8,80 €; yksi ateria todellista työpäivää kohden Suomessa;',
          'jos työpäivä kestää keskimäärin alle kuusi tuntia, ravintoetu arvostetaan käypään arvoon.',
        ] },
        { t: 'p', x: 'Edun arvo lisätään palkkaan: siitä toimitetaan ennakonpidätys, se otetaan huomioon sivukuluissa ja ilmoitetaan tulorekisteriin. Jos työntekijä maksaa lounaan itse ja työnantaja korvaa kuittia vastaan, kyse ei ole luontoisedusta vaan rahapalkasta koko summalta. Jos osakas maksaa oman lounaansa yhtiön kortilla ilman järjestelyä, helpointa on maksaa summa yhtiölle takaisin. Palkaksi kirjaamatta jäänyt etu voidaan verottaa peiteltynä osinkona.' },
        { t: 'h2', x: 'Asiakaslounas on edustusta' },
        { t: 'p', x: 'Kun tarjoat lounaan asiakkaalle tai yhteistyökumppanille liikesuhteiden vuoksi, kyse on edustusmenosta. Tuloverotuksessa siitä vähennetään 50 %, eikä arvonlisäveroa saa vähentää.' },
        { t: 'h2', x: 'Esimerkki' },
        { t: 'p', x: 'Yritys lataa työntekijän lounaskortille 12,00 € työpäivää kohden. Edun arvo on 75 % eli 9,00 € päivässä, 20 työpäivältä 180 €. Asiakaslounas maksoi 100 € arvonlisäveroineen: arvonlisäveroa ei vähennetä, kulu on 100 €, josta tuloverotuksessa vähennetään 50 €.' },
        { t: 'note', x: 'Vuonna 2027 ravintoedun arvo on 9,00 € ja yläraja 14,40 € (Verohallinnon päätös 16.11.2026).' },
        { t: 'links', items: [
          { label: 'Verohallinnon luontoisetupäätös vuodelle 2026', href: SRC.decision2026 },
          { label: 'Vero: Luontoisedut verotuksessa (ravintoetu)', href: SRC.benefitsGuide },
          { label: 'Vero: Rahan nostot ja sijoitukset rahana', href: SRC.withdrawals },
          { label: 'Finlex: Elinkeinoverolaki 360/1968, 8 §', href: SRC.evl },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993, 114 §', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi, esimerkiksi siihen, mikä kuitti on yrityksen kulu ja mikä yksityinen.' },
      ],
      faq: [
        { q: 'Voiko toiminimiyrittäjä maksaa lounaansa yrityksen kortilla?', a: 'Voi, mutta maksu kirjataan yksityisotoksi. Se ei vähennä veroja.' },
        { q: 'Mikä on lounaskortin verotusarvo 2026?', a: '75 % työpäivää kohden ladatusta summasta, kuitenkin vähintään 8,80 €. Työnantaja lataa 8,80–14,00 € ateriaa kohden.' },
        { q: 'Koskeeko tämä työmatkan ruokailua?', a: 'Ei. Työmatkalla työntekijälle maksetaan päivärahaa omien sääntöjensä mukaan, ja toiminimiyrittäjä tekee vastaavan vähennyksen veroilmoituksella.' },
      ],
    },
    en: {
      title: 'Can I pay for my lunch with the company card?',
      description: 'Lunch paid by the company in Finland 2026: meal benefit €8.80, lunch vouchers and cards at 75 %, client lunches (50 %, no VAT deduction) and sole traders.',
      lead: 'An ordinary lunch for yourself paid by the company is either a taxable meal benefit for an employee or a private expense that does not reduce tax. A lunch with a client for business relations is entertainment: only 50 % is deductible in income tax and the VAT is not deductible at all.',
      body: [
        { t: 'ul', items: [
          'Sole trader (toiminimi): you cannot pay yourself wages, so your own lunch is a private withdrawal, not a business expense.',
          'Limited company: a meal arranged by the employer is valued at €8.80 in 2026 if its cost incl. VAT is €8.80–14.00; lunch vouchers and cards up to €14.00 at 75 % of the value, at least €8.80. The value is added to taxable pay.',
          'If the employee pays and the company reimburses against a receipt, the full amount is ordinary cash pay.',
          'From 2027 the meal benefit is €9.00 and the upper limit €14.40.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: In-kind benefits 2026 (decision)', href: SRC.decision2026En },
          { label: 'Finlex: Business Income Tax Act 360/1968, section 8', href: SRC.evl },
        ] },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'How is a lunch card taxed in 2026?', a: '75 % of the amount credited per working day, at least €8.80. The employer credits €8.80–14.00 per meal.' },
      ],
    },
    et: {
      title: 'Kas lõunasööki võib maksta ettevõtte kaardiga?',
      description: 'Ettevõtte makstud lõuna Soomes 2026: toidusoodustus 8,80 €, lõunatšekid ja -kaardid 75 %, kliendilõuna (50 %, käibemaksu ei arvata maha) ja FIE.',
      lead: 'Tavaline enda lõuna ettevõtte rahaga on kas töötaja maksustatav toidusoodustus (ravintoetu) või isiklik kulu, mis maksu ei vähenda. Kliendiga ärisuhte pärast söödud lõuna on esinduskulu: tulumaksus arvatakse maha 50 % ja käibemaksu ei arvata maha.',
      body: [
        { t: 'ul', items: [
          'FIE (toiminimi): endale palka maksta ei saa, seega oma lõuna on eraväljavõte (yksityisotto), mitte ettevõtte kulu.',
          'Osaühing: tööandja korraldatud lõuna väärtus 2026. aastal on 8,80 €, kui kulu koos käibemaksuga on 8,80–14,00 €; lõunatšekid ja -kaardid kuni 14,00 € väärtusega 75 %, vähemalt 8,80 €.',
          'Alates 2027. aastast on väärtus 9,00 € ja ülempiir 14,40 €.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: luontoisetupäätös 2026', href: SRC.decision2026 },
        ] },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kas FIE võib maksta oma lõuna ettevõtte kaardiga?', a: 'Võib, kuid see kirjendatakse eraväljavõtteks ja maksu see ei vähenda.' },
      ],
    },
    uk: {
      title: 'Чи можна пообідати й заплатити карткою фірми?',
      description: 'Обід власника та працівника за рахунок фірми у Фінляндії 2026: ravintoetu 8,80 €, обідні картки 75 %, обід із клієнтом (50 %, без ALV) і toiminimi.',
      lead: 'Звичайний обід для себе за рахунок фірми — це або оподатковувана вигода працівника (ravintoetu), або особиста витрата, яка не зменшує податок. Обід із клієнтом заради ділових стосунків — представницька витрата: у податку на прибуток віднімається 50 %, а ALV не віднімається.',
      body: [
        { t: 'ul', items: [
          'Toiminimi: власник не може платити собі зарплату, тому його обід — особисте зняття (yksityisotto), а не витрата фірми.',
          'Oy: обід, який організовує фірма, у 2026 році оцінюється у 8,80 €, якщо витрати з ALV від 8,80 до 14,00 €; ваучери й обідні картки до 14,00 € — 75 %, але не менше 8,80 €.',
          'З 2027 року — 9,00 € і верхня межа 14,40 €.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: luontoisetupäätös 2026', href: SRC.decision2026 },
        ] },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською.' },
      ],
      faq: [
        { q: 'Чи може власник toiminimi платити за обід карткою фірми?', a: 'Може, але це особисті гроші: платіж записують як yksityisotto, податок він не зменшує.' },
      ],
    },
  },
};
