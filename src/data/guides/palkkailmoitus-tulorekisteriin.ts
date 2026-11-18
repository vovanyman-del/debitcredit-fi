import type { Guide } from './types';

// Q&A page: "When do I report wages to the tax office?" Deadlines only; payroll basics live in
// palkanlaskenta.ts and ensimmainen-tyontekija.ts. Facts verified 18 Nov 2026, verbatim:
// - Vero, Näin ilmoitat palkat ja työnantajasuoritukset (page updated 22.1.2025): "Palkkatiedot pitää
//   ilmoittaa tulorekisteriin aina 5 päivän kuluessa maksupäivästä"; "Maksupäivä on se päivä, jolloin
//   suoritus on saajan käytettävissä"; weekend/holiday → next weekday; erillisilmoitus "työnantajan
//   sairausvakuutusmaksuista kerran kuukaudessa. Ilmoituksen määräpäivä on palkanmaksukuukautta seuraavan
//   kalenterikuukauden 5. päivä" (example: paid 4.4.2025 → "huhtikuulta viimeistään 5.5.2025");
//   työnantajarekisteri member: erillisilmoitus "myös niiltä kuukausilta, joilta et ole maksanut palkkaa
//   ... Ei palkanmaksua -tieto"; "Maksa työnantajasuoritukset OmaVerossa. Eräpäivä on kuukauden 12.
//   päivä"; missing reports → "arvioimme yrityksesi palkkatiedot ja määräämme verot sekä veronkorotuksen.
//   Ilmoita puuttuvat tiedot tulorekisteriin, niin poistamme mahdollisen arvion ja veronkorotuksen".
// - Laki oma-aloitteisten verojen verotusmenettelystä 768/2016 (Finlex): yleinen eräpäivä =
//   "kalenterikuukauden 12 päivää tai, jos se ei ole pankkipäivä, sitä seuraavaa ensimmäistä
//   pankkipäivää"; "Verokausi on kalenterikuukausi"; "Verovelvollisen on maksettava verokauden vero
//   viimeistään verokautta seuraavan kalenterikuukauden yleisenä eräpäivänä".
// - Vero / Tulorekisteri, Tulotietojen ilmoittaminen: seuraamusmaksut (VH/7537/05.00.00/2025, antopäivä
//   30.12.2025, voimassa 1.1.2026 –): myöhästymismaksu "jos tulorekisteriin pakollisina ilmoitettavat
//   tiedot maksetuista suorituksista ilmoitetaan maksupäivää seuraavan kalenterikuukauden kahdeksannen
//   päivän jälkeen"; counted "myöhästymismaksun määräpäivää seuraavasta päivästä ilmoituksen
//   antamispäivään"; "enintään 45 päivän ajan eli enintään 135 euroa"; "Saman maksajan samalta kuukaudelta
//   antamat ilmoitukset katsotaan yhdeksi ilmoituskokonaisuudeksi"; Esimerkki 1 "30 päivää myöhässä ...
//   30 × 3 euroa eli 90 euroa"; over 45 days "lisätään 1 prosentti myöhässä ilmoitetun veronalaisen
//   suorituksen määrästä"; max "15 135 euroa".
// - Example dates checked against the 2026 calendar: Fri 30.1., Wed 4.2., Thu 5.2., Thu 12.2.
const VERO = 'https://www.vero.fi';

const SRC = {
  reportFi: `${VERO}/yritykset-ja-yhteisot/verot-ja-maksut/yritys_tyonantajana/nain-ilmoitat-palkat-ja-tyonantajasuoritukset/`,
  reportEn: `${VERO}/en/businesses-and-corporations/taxes-and-charges/being-an-employer/how-to-report-wages-and-employers-contributions/`,
  penaltyFi: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/yksityiskohtaiset-tulorekisterin-ohjeet/71401/tulotietojen-ilmoittaminen-seuraamusmaksut9/`,
  penaltyEn: `${VERO}/en/incomes-register/companies-and-organisations/detailed-guidance/71401/reporting-income-data-penalty-fees8/`,
  ovml: 'https://www.finlex.fi/fi/lainsaadanto/2016/768',
};

export const palkkailmoitusTulorekisteriin: Guide = {
  slug: 'palkkailmoitus-tulorekisteriin',
  datePublished: '2026-11-18',
  dateModified: '2026-11-18',
  content: {
    ru: {
      title: 'Когда подавать сведения о зарплате в налоговую: сроки Tulorekisteri',
      description: 'Отчёт о зарплате в Tulorekisteri — в течение 5 дней после выплаты, отчёт работодателя — до 5-го числа, налоги — до 12-го. Что будет при опоздании.',
      lead: 'Сведения о каждой выплаченной зарплате подают в доходный регистр Tulorekisteri в течение 5 календарных дней после дня выплаты. Отчёт работодателя (työnantajan erillisilmoitus) подают до 5-го числа следующего месяца, а удержанный налог и взносы оплачивают в OmaVero до 12-го числа следующего месяца.',
      body: [
        { t: 'h2', x: 'Три срока каждого месяца' },
        { t: 'ul', items: [
          'Отчёт о зарплате (palkkatietoilmoitus) — в течение 5 дней после дня выплаты. День выплаты — день, когда деньги доступны работнику. Если последний день срока выпадает на субботу, воскресенье или праздник, отчёт можно подать в следующий рабочий день.',
          'Отчёт работодателя — раз в месяц, до 5-го числа месяца, следующего за месяцем выплаты. В нём указывают взнос работодателя на медицинское страхование. Месяц считают по дню выплаты, а не по месяцу, когда работа была сделана.',
          'Оплата — удержанный налог (ennakonpidätys) и взнос работодателя платят в OmaVero до 12-го числа месяца, следующего за месяцем выплаты. Если 12-е не банковский день, срок переносится на следующий банковский день.',
        ] },
        { t: 'h2', x: 'Пример' },
        { t: 'p', x: 'Зарплату выплатили в пятницу 30.1.2026. Отчёт о зарплате нужно подать до среды 4.2, отчёт работодателя за январь — до четверга 5.2, а налог и взнос за январь оплатить до четверга 12.2.' },
        { t: 'h2', x: 'Что будет, если опоздать' },
        { t: 'p', x: 'Штраф за опоздание (myöhästymismaksu) назначают, если сведения о выплатах пришли позже 8-го числа месяца, следующего за месяцем выплаты. Штраф — 3 € за каждый день после этого срока, но не больше чем за 45 дней, то есть до 135 €. При опоздании больше чем на 45 дней к 135 € добавляется 1 % от суммы зарплаты, поданной с опозданием. Все отчёты одного месяца считаются одним целым. Пример из инструкции налоговой: опоздание на 30 дней — 30 × 3 € = 90 €.' },
        { t: 'p', x: 'Если отчётов нет совсем, налоговая присылает письмо, а затем сама оценивает зарплаты и назначает налоги с надбавкой (veronkorotus). Когда недостающие отчёты поданы, оценку и надбавку снимают.' },
        { t: 'note', x: 'Если фирма записана в регистр работодателей, отчёт работодателя подают каждый месяц, даже когда зарплату не платили: с отметкой «Ei palkanmaksua». Как считать саму зарплату и взносы, мы разбираем в гидах о расчёте зарплаты и о первом работнике.' },
        { t: 'links', items: [
          { label: 'Vero: Näin ilmoitat palkat ja työnantajasuoritukset', href: SRC.reportFi },
          { label: 'Tulorekisteri: Tulotietojen ilmoittaminen – seuraamusmaksut (2026)', href: SRC.penaltyFi },
          { label: 'Finlex: Laki oma-aloitteisten verojen verotusmenettelystä 768/2016', href: SRC.ovml },
        ] },
        { t: 'h2', x: 'Вопросы о зарплате — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском. Если зарплату считаем мы, отчёты в Tulorekisteri и сроки оплаты тоже на нас.' },
      ],
      faq: [
        { q: 'Выходные входят в 5 дней?', a: 'Да, срок считают в календарных днях. Но если последний день срока выпадает на субботу, воскресенье или праздник, отчёт можно подать в следующий рабочий день.' },
        { q: 'Штраф начисляется уже с 6-го дня?', a: 'Нет. Штраф назначают, если сведения пришли позже 8-го числа месяца, следующего за месяцем выплаты: 3 € в день, максимум 135 € за дневную часть. Сам срок подачи при этом остаётся 5 дней.' },
        { q: 'Нужно ли что-то подавать, если зарплату в этом месяце не платили?', a: 'Если фирма в регистре работодателей — да: отчёт работодателя с отметкой «Ei palkanmaksua» до 5-го числа следующего месяца. Случайному работодателю за месяц без выплат подавать его не нужно.' },
      ],
    },
    fi: {
      title: 'Milloin palkat ilmoitetaan tulorekisteriin? Määräajat 2026',
      description: 'Palkkatietoilmoitus 5 päivän kuluessa maksupäivästä, työnantajan erillisilmoitus seuraavan kuun 5. päivään mennessä ja maksut 12. päivään mennessä. Myöhästymismaksu.',
      lead: 'Jokainen maksettu palkka ilmoitetaan tulorekisteriin 5 kalenteripäivän kuluessa maksupäivästä. Työnantajan erillisilmoitus annetaan palkanmaksukuukautta seuraavan kuukauden 5. päivään mennessä, ja ennakonpidätykset ja työnantajan sairausvakuutusmaksu maksetaan OmaVerossa seuraavan kuukauden 12. päivään mennessä.',
      body: [
        { t: 'h2', x: 'Kolme määräaikaa joka kuukausi' },
        { t: 'ul', items: [
          'Palkkatietoilmoitus 5 päivän kuluessa maksupäivästä. Maksupäivä on päivä, jolloin raha on saajan käytettävissä. Jos määräajan viimeinen päivä on lauantai, sunnuntai tai pyhäpäivä, ilmoituksen voi antaa seuraavana arkipäivänä.',
          'Työnantajan erillisilmoitus kerran kuukaudessa palkanmaksukuukautta seuraavan kuukauden 5. päivään mennessä. Siinä ilmoitetaan työnantajan sairausvakuutusmaksut. Kuukausi määräytyy maksupäivän, ei työn tekemisen mukaan.',
          'Ennakonpidätykset ja työnantajan sairausvakuutusmaksu maksetaan OmaVerossa palkanmaksukuukautta seuraavan kuukauden 12. päivään mennessä. Jos 12. päivä ei ole pankkipäivä, eräpäivä siirtyy seuraavaan pankkipäivään.',
        ] },
        { t: 'h2', x: 'Esimerkki' },
        { t: 'p', x: 'Palkka maksetaan perjantaina 30.1.2026. Palkkatietoilmoitus on annettava viimeistään keskiviikkona 4.2., tammikuun erillisilmoitus torstaina 5.2. ja tammikuun ennakonpidätykset ja sairausvakuutusmaksu maksettava torstaina 12.2.' },
        { t: 'h2', x: 'Jos ilmoitus myöhästyy' },
        { t: 'p', x: 'Verohallinto määrää myöhästymismaksun, jos pakolliset tiedot maksetuista suorituksista ilmoitetaan maksupäivää seuraavan kalenterikuukauden 8. päivän jälkeen. Maksu on 3 € päivältä enintään 45 päivän ajalta eli enintään 135 €. Jos kuukauden ensimmäinen ilmoitus myöhästyy yli 45 päivää, lisäksi määrätään 1 % myöhässä ilmoitetusta veronalaisesta suorituksesta. Saman kuukauden ilmoitukset ovat yksi kokonaisuus. Verohallinnon ohjeen esimerkissä 30 päivää myöhässä annetusta ilmoituksesta maksu on 30 × 3 € = 90 €.' },
        { t: 'p', x: 'Jos ilmoituksia ei tule lainkaan, Verohallinto lähettää kirjeen ja sen jälkeen arvioi palkkatiedot ja määrää verot ja veronkorotuksen. Kun puuttuvat ilmoitukset on annettu, arvio ja veronkorotus poistetaan.' },
        { t: 'note', x: 'Työnantajarekisteriin kuuluva työnantaja antaa erillisilmoituksen joka kuukausi, myös silloin kun palkkaa ei ole maksettu (Ei palkanmaksua -tieto). Palkan ja sivukulujen laskemisesta kerromme oppaissa palkanlaskennasta ja ensimmäisestä työntekijästä.' },
        { t: 'links', items: [
          { label: 'Vero: Näin ilmoitat palkat ja työnantajasuoritukset', href: SRC.reportFi },
          { label: 'Tulorekisteri: Tulotietojen ilmoittaminen – seuraamusmaksut (2026)', href: SRC.penaltyFi },
          { label: 'Finlex: Laki oma-aloitteisten verojen verotusmenettelystä 768/2016', href: SRC.ovml },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi. Kun palkanlaskenta on meillä, hoidamme myös tulorekisteri-ilmoitukset ja maksujen määräajat.' },
      ],
      faq: [
        { q: 'Lasketaanko viikonloppu viiteen päivään?', a: 'Kyllä, määräaika lasketaan kalenteripäivinä. Jos viimeinen päivä on lauantai, sunnuntai tai pyhäpäivä, ilmoituksen voi antaa seuraavana arkipäivänä.' },
        { q: 'Tuleeko myöhästymismaksu jo kuudentena päivänä?', a: 'Ei. Maksu määrätään, jos tiedot ilmoitetaan maksupäivää seuraavan kuukauden 8. päivän jälkeen: 3 € päivältä, päiväkohtainen osa enintään 135 €. Ilmoittamisen määräaika on silti 5 päivää.' },
        { q: 'Pitääkö ilmoittaa, jos palkkaa ei maksettu?', a: 'Työnantajarekisteriin kuuluvan pitää: erillisilmoitus Ei palkanmaksua -tiedolla seuraavan kuukauden 5. päivään mennessä. Satunnaisen työnantajan ei tarvitse antaa sitä kuukausilta, jolloin palkkaa ei makseta.' },
      ],
    },
    en: {
      title: 'When to report wages to the Incomes Register: deadlines 2026',
      description: 'Earnings payment report within 5 days of payday, employer’s separate report by the 5th of the next month, payment by the 12th. Late-filing penalty explained.',
      lead: 'Every wage payment is reported to the Incomes Register within 5 calendar days of the payment date. The employer’s separate report is due by the 5th of the month after the payment month, and withholding tax and the employer’s health insurance contribution are paid in MyTax (OmaVero) by the 12th of that month.',
      body: [
        { t: 'h2', x: 'Three monthly deadlines' },
        { t: 'ul', items: [
          'Earnings payment report: within 5 days of the payment date (the day the money is available to the employee). If the last day is a weekend or public holiday, the next working day is fine.',
          'Employer’s separate report: by the 5th of the month after the payment month.',
          'Payment: by the 12th of the month after the payment month; if the 12th is not a banking day, the next banking day.',
        ] },
        { t: 'p', x: 'Example: wages paid on Friday 30 January 2026. Report by Wednesday 4 February, separate report by Thursday 5 February, payment by Thursday 12 February.' },
        { t: 'h2', x: 'Late reports' },
        { t: 'p', x: 'A late-filing penalty is imposed if the data is reported after the 8th day of the month following the payment date: €3 per day for up to 45 days (max €135), plus 1 % of the late-reported payments if the first report of the month is more than 45 days late.' },
        { t: 'links', items: [
          { label: 'Vero: How to report wages and employer’s contributions', href: SRC.reportEn },
          { label: 'Incomes Register: Reporting income data – penalty fees', href: SRC.penaltyEn },
        ] },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'Is the penalty charged from day 6?', a: 'No. It applies if the data arrives after the 8th day of the month following the payment date. The reporting deadline is still 5 days.' },
      ],
    },
    et: {
      title: 'Millal teatada palgad Soome tuluregistrisse (Tulorekisteri)',
      description: 'Palgateade 5 päeva jooksul pärast väljamakset, tööandja eraldi teade järgmise kuu 5. kuupäevaks ja maksed 12. kuupäevaks. Hilinemistasu.',
      lead: 'Iga makstud palk teatatakse Tulorekisterisse 5 kalendripäeva jooksul maksepäevast. Tööandja eraldi teade (työnantajan erillisilmoitus) esitatakse väljamakse kuule järgneva kuu 5. kuupäevaks ning kinnipeetud maks ja tööandja ravikindlustusmakse tasutakse OmaVeros sama kuu 12. kuupäevaks.',
      body: [
        { t: 'p', x: 'Näide: palk makstakse reedel 30.1.2026. Palgateade kolmapäevaks 4.2., eraldi teade neljapäevaks 5.2. ja maksed neljapäevaks 12.2.' },
        { t: 'p', x: 'Hilinemistasu määratakse, kui andmed esitatakse pärast maksepäevale järgneva kuu 8. kuupäeva: 3 € päevas kuni 45 päeva (kuni 135 €). Üle 45 päeva hilinemisel lisandub 1 % hilinenult teatatud summast.' },
        { t: 'links', items: [
          { label: 'Vero: Näin ilmoitat palkat ja työnantajasuoritukset', href: SRC.reportFi },
          { label: 'Tulorekisteri: seuraamusmaksut (2026)', href: SRC.penaltyFi },
        ] },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kas hilinemistasu tuleb juba 6. päeval?', a: 'Ei. Tasu määratakse, kui andmed saabuvad pärast maksepäevale järgneva kuu 8. kuupäeva. Teatamise tähtaeg on siiski 5 päeva.' },
      ],
    },
    uk: {
      title: 'Коли подавати відомості про зарплату до Tulorekisteri: строки 2026',
      description: 'Звіт про зарплату — протягом 5 днів після виплати, звіт роботодавця — до 5-го числа, податки — до 12-го. Що буде в разі запізнення.',
      lead: 'Відомості про кожну виплачену зарплату подають до реєстру доходів Tulorekisteri протягом 5 календарних днів після дня виплати. Звіт роботодавця (työnantajan erillisilmoitus) подають до 5-го числа наступного місяця, а утриманий податок і внесок роботодавця сплачують в OmaVero до 12-го числа наступного місяця.',
      body: [
        { t: 'p', x: 'Приклад: зарплату виплатили в пʼятницю 30.1.2026. Звіт про зарплату — до середи 4.2, звіт роботодавця — до четверга 5.2, оплата — до четверга 12.2.' },
        { t: 'p', x: 'Штраф за запізнення призначають, якщо відомості надійшли після 8-го числа місяця, наступного за місяцем виплати: 3 € за день, не більше 45 днів (до 135 €). Якщо запізнення понад 45 днів, додається 1 % від суми, поданої із запізненням.' },
        { t: 'links', items: [
          { label: 'Vero: Näin ilmoitat palkat ja työnantajasuoritukset', href: SRC.reportFi },
          { label: 'Tulorekisteri: seuraamusmaksut (2026)', href: SRC.penaltyFi },
        ] },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською.' },
      ],
      faq: [
        { q: 'Штраф нараховують уже з 6-го дня?', a: 'Ні. Штраф призначають, якщо відомості надійшли після 8-го числа місяця, наступного за місяцем виплати. Строк подання все одно 5 днів.' },
      ],
    },
  },
};
