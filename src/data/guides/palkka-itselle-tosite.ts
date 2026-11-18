import type { Guide } from './types';

// Q&A page: "Do I need a receipt if I paid myself a salary?" Facts verified 18 Nov 2026, verbatim:
// - Kirjanpitolaki 1336/1997 (Finlex) 2 luku 5 §: "Kirjauksen on perustuttava päivättyyn ja järjestelmällisesti
//   numeroituun tai vastaavalla tavalla yksilöityyn tositteeseen, joka todentaa liiketapahtuman."
// - Työsopimuslaki 55/2001 (Finlex) 2:16: "Maksaessaan palkan työnantajan on annettava työntekijälle laskelma,
//   josta käyvät ilmi palkan suuruus ja sen määräytymisen perusteet."
// - Tulorekisteri, Yrittäjä maksaa palkkaa (page updated 8.10.2020): "Osakeyhtiön omistajalle maksettu palkka
//   ilmoitetaan tulorekisteriin. Toiminimiyrittäjä ei voi nostaa palkkaa, vaan nostot ovat yksityisnostoja.
//   Toiminimiyrittäjän yksityisnostoja ei ilmoiteta tulorekisteriin. Toiminimen yksityisnostoja käsitellään
//   toiminimen kirjanpidossa, ja ne ilmoitetaan veroilmoituksella."
// - Vero, Rahan nostot ja sijoitukset rahana (page updated 6.8.2025): "Et voi maksaa palkkaa itsellesi etkä
//   puolisollesi tai alle 14-vuotiaalle lapsellesi. Jos nostat rahaa yrityksesi tililtä, nosto on yksityisotto.
//   Älä merkitse sitä kirjanpitoon yrityksen kuluksi."
// - Vero, Näin ilmoitat palkat ja työnantajasuoritukset (22.1.2025): report "5 päivän kuluessa maksupäivästä";
//   payment "Eräpäivä on kuukauden 12. päivä" (the month after the payment month, OVML 768/2016).
// - Vero, syventävä ohje Ennakonpidätys osingosta ja Verohallinnolle annettavat ilmoitukset (48467): "osingonjaosta
//   päättää osakeyhtiön yhtiökokous tai yhtiön hallitus saamansa valtuuden perusteella"; "Osinkoa tai osinkona
//   verotettavia varoja jakaneen yhtiön on annettava Verohallinnolle vuosi-ilmoitus".
// - Vero, syventävä ohje Luonnollisen henkilön osakeyhtiöstä nostaman osakaslainan verotus (VH/3794/00.01.00/2023,
//   2.8.2023): capital income if the borrower alone or with family owns "vähintään 10 %" of the shares (or votes)
//   at year end; only the part not repaid by the end of the tax year; the company files a vuosi-ilmoitus.
// - Worked example (own arithmetic): 3 000 € × 20 % = 600 € → 2 400 € before the employee's other deductions.
const VERO = 'https://www.vero.fi';

const SRC = {
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
  ownerWages: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/suorituksen-maksajat/palkkatiedot/yritt%C3%A4j%C3%A4-maksaa-palkkaa/`,
  ownerWagesEn: `${VERO}/en/incomes-register/companies-and-organisations/employers/earnings-payment-data/entrepreneur-pays-wages/`,
  withdrawals: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/liikkeen-tai-ammatinharjoittaja/veroilmoituksen-t%C3%A4ytt%C3%B6ohje/rahan-nostot-ja-sijoitukset-rahana/`,
  withdrawalsEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/taxation-of-self-employed-individuals/instructions-for-filing/cash-withdrawals-and-cash-investments/`,
  dividend: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48467/ennakonpidatys-osingosta-ja-verohallinnolle-annettavat-ilmoitukset6/`,
  loan: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48739/luonnollisen-henkilon-osakeyhtiosta-nostaman-osakaslainan-verotus2/`,
};

export const palkkaItselleTosite: Guide = {
  slug: 'palkka-itselle-tosite',
  datePublished: '2026-11-18',
  dateModified: '2026-11-18',
  content: {
    ru: {
      title: 'Нужен ли чек, если я сам себе выплатил зарплату?',
      description: 'Документ для зарплаты владельца Oy — расчётный листок и отчёт в Tulorekisteri, а не чек. Чем зарплата отличается от дивидендов, займа владельцу и yksityisotto у toiminimi.',
      lead: 'Нет, чек не нужен. Документом для бухгалтерии служит расчётный листок (palkkalaskelma), а зарплату владельца Oy, как и любую другую, подают в Tulorekisteri в течение 5 дней после выплаты. Владелец toiminimi зарплату себе не платит вовсе: деньги, снятые со счёта фирмы, — это личное снятие (yksityisotto).',
      body: [
        { t: 'h2', x: 'Oy: зарплата владельца' },
        { t: 'p', x: 'Каждая запись в бухгалтерии должна опираться на датированный и пронумерованный документ (tosite). Для зарплаты это расчётный листок: кому и за какой период, сумма до налогов, удержанный налог, другие удержания и сумма к выплате. Выписка банка подтверждает только сам перевод.' },
        { t: 'p', x: 'Зарплату владельца Oy подают в Tulorekisteri так же, как зарплату работника: в течение 5 дней после выплаты. Удержанный налог и взнос работодателя на медицинское страхование фирма платит в OmaVero до 12-го числа следующего месяца.' },
        { t: 'h2', x: 'Дивиденды — не зарплата' },
        { t: 'p', x: 'О дивидендах решает общее собрание акционеров (или правление по его полномочию). Документ — протокол с этим решением, а не расчётный листок. В Tulorekisteri дивиденды не подают: о них фирма сообщает налоговой годовым отчётом (vuosi-ilmoitus).' },
        { t: 'h2', x: 'Просто перевёл деньги себе' },
        { t: 'p', x: 'Если владелец Oy перевёл деньги со счёта фирмы себе без расчёта зарплаты и без решения о дивидендах, это не зарплата и не дивиденды. Обычно такую сумму записывают как долг владельца фирме (osakaslaina). Если у владельца вместе с семьёй не меньше 10 % акций, невозвращённая к концу года часть займа облагается как его доход от капитала (pääomatulo), а фирма сообщает о ней налоговой.' },
        { t: 'h2', x: 'Toiminimi: yksityisotto' },
        { t: 'p', x: 'Владелец toiminimi не может платить зарплату себе, супругу или детям младше 14 лет. Деньги со счёта фирмы на личные нужды — yksityisotto. Его не записывают в расходы и не подают в Tulorekisteri: налог платится с прибыли фирмы, а не со снятых сумм.' },
        { t: 'h2', x: 'Пример' },
        { t: 'p', x: 'Владелец Oy начислил себе 3 000 € до налогов, процент по налоговой карточке — 20 %. Удержано 600 € налога, без учёта других удержаний на счёт приходит 2 400 €. В бухгалтерии — расчётный листок на 3 000 € и выписка банка о переводе 2 400 €, 600 € налога фирма платит до 12-го числа следующего месяца вместе со взносом работодателя. Если владелец toiminimi снял со счёта фирмы 2 400 €, это yksityisotto: без расчётного листка и без Tulorekisteri.' },
        { t: 'links', items: [
          { label: 'Tulorekisteri: Yrittäjä maksaa palkkaa', href: SRC.ownerWages },
          { label: 'Vero: Rahan nostot ja sijoitukset rahana (toiminimi)', href: SRC.withdrawals },
          { label: 'Vero: Ennakonpidätys osingosta ja vuosi-ilmoitus', href: SRC.dividend },
          { label: 'Vero: Osakaslainan verotus', href: SRC.loan },
          { label: 'Finlex: Kirjanpitolaki 1336/1997', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Вопросы о зарплате владельца — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском: как оформить зарплату себе, дивиденды или уже сделанный перевод.' },
      ],
      faq: [
        { q: 'Нужен ли расчётный листок, если в фирме работаю только я?', a: 'Да. Это документ, на котором основана запись о зарплате. Выписка банка показывает только перевод, а не то, из чего сложилась сумма.' },
        { q: 'Подают ли дивиденды в Tulorekisteri?', a: 'Нет. О дивидендах фирма сообщает налоговой годовым отчётом (vuosi-ilmoitus), а решение о них оформляют протоколом собрания.' },
        { q: 'Может ли владелец toiminimi платить себе зарплату?', a: 'Нет. Деньги, которые он берёт из фирмы, — yksityisotto. Их не записывают в расходы и не подают в Tulorekisteri.' },
      ],
    },
    fi: {
      title: 'Tarvitaanko kuitti, kun maksoin palkkaa itselleni?',
      description: 'Osakkaan palkan tosite on palkkalaskelma ja palkka ilmoitetaan tulorekisteriin – kuittia ei tarvita. Palkan, osingon, osakaslainan ja toiminimen yksityisoton erot.',
      lead: 'Kuittia ei tarvita. Kirjanpidon tosite on palkkalaskelma, ja osakeyhtiön omistajan palkka ilmoitetaan muiden palkkojen tapaan tulorekisteriin 5 päivän kuluessa maksupäivästä. Toiminimiyrittäjä ei maksa itselleen palkkaa lainkaan: yrityksen tililtä nostettu raha on yksityisotto.',
      body: [
        { t: 'h2', x: 'Osakeyhtiö: osakkaan palkka' },
        { t: 'p', x: 'Jokaisen kirjauksen on perustuttava päivättyyn ja numeroituun tositteeseen. Palkan tosite on palkkalaskelma: kenelle ja miltä ajalta, bruttopalkka, ennakonpidätys, muut vähennykset ja nettopalkka. Tiliote todistaa vain maksun.' },
        { t: 'p', x: 'Osakkaan palkka ilmoitetaan tulorekisteriin kuten työntekijän palkka, 5 päivän kuluessa maksupäivästä. Ennakonpidätys ja työnantajan sairausvakuutusmaksu maksetaan OmaVerossa seuraavan kuukauden 12. päivään mennessä.' },
        { t: 'h2', x: 'Osinko ei ole palkkaa' },
        { t: 'p', x: 'Osingonjaosta päättää yhtiökokous tai hallitus sen valtuutuksella. Tosite on päätöksen pöytäkirja, ei palkkalaskelma. Osinkoja ei ilmoiteta tulorekisteriin, vaan yhtiö antaa niistä Verohallinnolle vuosi-ilmoituksen.' },
        { t: 'h2', x: 'Siirsin vain rahaa itselleni' },
        { t: 'p', x: 'Jos osakas siirtää yhtiön rahaa itselleen ilman palkkalaskelmaa ja osinkopäätöstä, kyse ei ole palkasta eikä osingosta. Tavallisesti summa kirjataan osakkaan velaksi yhtiölle eli osakaslainaksi. Jos osakas yksin tai perheenjäsentensä kanssa omistaa vähintään 10 % osakkeista, verovuoden loppuun mennessä takaisin maksamaton osa verotetaan hänen pääomatulonaan, ja yhtiö ilmoittaa lainan Verohallinnolle.' },
        { t: 'h2', x: 'Toiminimi: yksityisotto' },
        { t: 'p', x: 'Toiminimiyrittäjä ei voi maksaa palkkaa itselleen, puolisolleen tai alle 14-vuotiaalle lapselleen. Yrityksen tililtä omaan käyttöön nostettu raha on yksityisotto. Sitä ei kirjata kuluksi eikä ilmoiteta tulorekisteriin; vero maksetaan yrityksen tuloksesta, ei nostoista.' },
        { t: 'h2', x: 'Esimerkki' },
        { t: 'p', x: 'Osakas maksaa itselleen 3 000 € bruttopalkkaa, ja verokortin prosentti on 20 %. Ennakonpidätys on 600 €, ja ennen muita vähennyksiä tilille maksetaan 2 400 €. Kirjanpitoon tulee 3 000 euron palkkalaskelma ja tiliote 2 400 euron maksusta; ennakonpidätys maksetaan työnantajan sairausvakuutusmaksun kanssa seuraavan kuukauden 12. päivään mennessä. Jos toiminimiyrittäjä nostaa yrityksen tililtä 2 400 €, se on yksityisotto ilman palkkalaskelmaa ja tulorekisteri-ilmoitusta.' },
        { t: 'links', items: [
          { label: 'Tulorekisteri: Yrittäjä maksaa palkkaa', href: SRC.ownerWages },
          { label: 'Vero: Rahan nostot ja sijoitukset rahana', href: SRC.withdrawals },
          { label: 'Vero: Ennakonpidätys osingosta ja Verohallinnolle annettavat ilmoitukset', href: SRC.dividend },
          { label: 'Vero: Osakaslainan verotus', href: SRC.loan },
          { label: 'Finlex: Kirjanpitolaki 1336/1997', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi: miten oma palkka, osinko tai jo tehty siirto kirjataan.' },
      ],
      faq: [
        { q: 'Tarvitaanko palkkalaskelma, jos olen yhtiön ainoa työntekijä?', a: 'Kyllä. Se on palkkakirjauksen tosite. Tiliote näyttää vain maksun, ei sitä, miten summa muodostui.' },
        { q: 'Ilmoitetaanko osinko tulorekisteriin?', a: 'Ei. Yhtiö ilmoittaa osingot Verohallinnolle vuosi-ilmoituksella, ja osingonjakopäätös kirjataan pöytäkirjaan.' },
        { q: 'Voiko toiminimiyrittäjä maksaa itselleen palkkaa?', a: 'Ei. Yrityksestä otettu raha on yksityisotto, jota ei kirjata kuluksi eikä ilmoiteta tulorekisteriin.' },
      ],
    },
    en: {
      title: 'Do I need a receipt if I paid myself a salary?',
      description: 'The voucher for an owner’s salary in a Finnish limited company is the payslip plus the Incomes Register report, not a receipt. Salary vs dividend, shareholder loan and sole trader withdrawals.',
      lead: 'No receipt is needed. The bookkeeping voucher is the payslip (palkkalaskelma), and an Oy owner’s salary is reported to the Incomes Register within 5 days of payment like any other wage. A sole trader cannot pay themselves a salary at all: money taken from the business account is a private withdrawal (yksityisotto).',
      body: [
        { t: 'ul', items: [
          'Dividends are decided by the general meeting (or the board under its authorisation); the voucher is the minutes. Dividends are reported on an annual information return, not to the Incomes Register.',
          'Money simply transferred to the owner is usually booked as a shareholder loan. If the owner and family hold at least 10 % of the shares, the part not repaid by year end is taxed as capital income.',
          'Sole trader withdrawals are not expenses and are not reported to the Incomes Register.',
        ] },
        { t: 'links', items: [
          { label: 'Incomes Register: Entrepreneur pays wages', href: SRC.ownerWagesEn },
          { label: 'Vero: Cash withdrawals and cash investments', href: SRC.withdrawalsEn },
        ] },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'Can a sole trader pay themselves wages?', a: 'No. Money taken from the business is a private withdrawal; it is not an expense and is not reported to the Incomes Register.' },
      ],
    },
    et: {
      title: 'Kas on vaja tšekki, kui maksin endale palka?',
      description: 'Osaühingu omaniku palga dokument on palgaleht ja teade Tulorekisterisse, mitte tšekk. Palk, dividend, laen omanikule ja FIE eraväljavõte.',
      lead: 'Tšekki ei ole vaja. Raamatupidamise dokument on palgaleht (palkkalaskelma) ning osaühingu omaniku palk teatatakse Tulorekisterisse 5 päeva jooksul pärast väljamakset. FIE (toiminimi) endale palka ei maksa: ettevõtte kontolt võetud raha on eraväljavõte (yksityisotto).',
      body: [
        { t: 'ul', items: [
          'Dividendide üle otsustab üldkoosolek; dokument on otsuse protokoll. Dividende Tulorekisterisse ei teatata.',
          'FIE eraväljavõte ei ole kulu ja seda Tulorekisterisse ei teatata.',
        ] },
        { t: 'links', items: [
          { label: 'Tulorekisteri: Yrittäjä maksaa palkkaa', href: SRC.ownerWages },
        ] },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kas FIE võib endale palka maksta?', a: 'Ei. Ettevõttest võetud raha on eraväljavõte.' },
      ],
    },
    uk: {
      title: 'Чи потрібен чек, якщо я сам собі виплатив зарплату?',
      description: 'Документ для зарплати власника Oy — розрахунковий листок і звіт до Tulorekisteri, а не чек. Зарплата, дивіденди, позика власнику та yksityisotto у toiminimi.',
      lead: 'Ні, чек не потрібен. Документом для бухгалтерії є розрахунковий листок (palkkalaskelma), а зарплату власника Oy подають до Tulorekisteri протягом 5 днів після виплати, як і будь-яку іншу. Власник toiminimi зарплату собі не платить: гроші, зняті з рахунку фірми, — це особисте зняття (yksityisotto).',
      body: [
        { t: 'ul', items: [
          'Про дивіденди вирішують загальні збори акціонерів; документ — протокол рішення. До Tulorekisteri дивіденди не подають.',
          'Yksityisotto у toiminimi не є витратою і не подається до Tulorekisteri.',
        ] },
        { t: 'links', items: [
          { label: 'Tulorekisteri: Yrittäjä maksaa palkkaa', href: SRC.ownerWages },
        ] },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською.' },
      ],
      faq: [
        { q: 'Чи може власник toiminimi платити собі зарплату?', a: 'Ні. Гроші, які він бере з фірми, — це yksityisotto.' },
      ],
    },
  },
};
