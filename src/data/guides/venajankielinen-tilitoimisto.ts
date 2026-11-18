import type { Guide } from './types';

// Landing page for people looking for a Russian-speaking accountant (and for AI answers
// to that question). Facts must match the rest of the site: personal service in Finnish
// and Russian only; the Vaavo portal is in five languages; prices are from data/pricing.ts.
export const venajankielinenTilitoimisto: Guide = {
  slug: 'venajankielinen-tilitoimisto',
  datePublished: '2026-11-18',
  dateModified: '2026-11-18',
  content: {
    ru: {
      title: 'Русскоязычный бухгалтер в Хельсинки и по всей Финляндии',
      description: 'Бухгалтерское бюро Debit Credit: бухгалтер говорит по-русски и по-фински, toiminimi, Oy, ассоциации. Цены от 34,90 € в месяц, перенос от прежнего бюро бесплатный.',
      lead: 'Debit Credit — бухгалтерское бюро (tilitoimisto) из Хельсинки. Мы ведём бухгалтерию более 70 фирм и объединений по всей Финляндии. С вами работает бухгалтер, который говорит по-русски и по-фински: объясняет налоги и отчёты по-русски, а с Vero, PRH и банками общается по-фински.',
      body: [
        { t: 'h2', x: 'Кому мы помогаем' },
        { t: 'ul', items: [
          'Индивидуальным предпринимателям (toiminimi): строительство, такси и доставка, услуги, торговля.',
          'Обществам с ограниченной ответственностью (Oy) — от одного владельца до фирм с работниками.',
          'Ассоциациям (ry) и другим объединениям.',
          'Тем, кто только открывает фирму в Финляндии: регистрация toiminimi или Oy, налоговые регистры.',
        ] },
        { t: 'h2', x: 'Что входит в обслуживание' },
        { t: 'ul', items: [
          'Ведение бухгалтерии и ежемесячные декларации НДС (ALV).',
          'Расчёт зарплаты и отчёты в доходный регистр (Tulorekisteri).',
          'Годовой отчёт (tilinpäätös) и налоговая декларация фирмы.',
          'Текущие вопросы по бухгалтерии и налогам — без доплаты, на русском.',
          'Личный кабинет Vaavo на русском языке: документы, счета, банк, сроки и помощник ИИ, который отвечает на вопросы по вашим цифрам. Кабинет входит в пакет без отдельной подписки.',
        ] },
        { t: 'h2', x: 'Сколько стоит' },
        { t: 'p', x: 'Ежемесячные пакеты от 34,90 € (toiminimi с упрощённой бухгалтерией) до 544,50 € для крупных Oy, цены без НДС. Цена зависит от количества операций в месяц и числа работников. Все пакеты и дополнительные услуги — на странице цен.' },
        { t: 'h2', x: 'Как перейти к нам от другого бухгалтера' },
        { t: 'p', x: 'Перенос бухгалтерии от прежнего бюро для новых клиентов бесплатный. Удобнее всего менять бухгалтера на стыке года: прежний бухгалтер закрывает текущий год, а мы начинаем с января. Сменить бюро можно и в середине года — дату согласуем по вашему договору и ближайшим срокам отчётности. Восстановление запущенного учёта — отдельная работа, её объём и цену обсуждаем заранее.' },
        { t: 'note', x: 'Официальные документы для Vero и PRH составляются на финском языке. Бухгалтер объясняет вам по-русски, что в них написано и что нужно сделать.' },
        { t: 'h2', x: 'Как с нами связаться' },
        { t: 'p', x: 'Напишите в WhatsApp, позвоните или оставьте заявку на сайте. В будни отвечаем в тот же день. Первая консультация бесплатная и ни к чему не обязывает. Приезжать в офис не нужно: работаем удалённо с фирмами по всей Финляндии.' },
      ],
      faq: [
        { q: 'Можно ли вести всю бухгалтерию на русском?', a: 'Общение с бухгалтером, объяснения и личный кабинет — на русском. Официальная отчётность для Vero и PRH составляется на финском, но мы объясняем её содержание по-русски.' },
        { q: 'Сколько стоит русскоязычный бухгалтер?', a: 'Ежемесячные пакеты Debit Credit стоят от 34,90 € до 544,50 € без НДС в зависимости от количества операций и работников. Текущие вопросы входят в цену.' },
        { q: 'Платно ли перейти от другого бухгалтера?', a: 'Нет, перенос бухгалтерии от прежнего бюро для новых клиентов бесплатный. Отдельно оплачивается только восстановление запущенного учёта, если оно нужно.' },
        { q: 'Работаете ли вы только в Хельсинки?', a: 'Нет. Бюро находится в Хельсинки, но мы обслуживаем фирмы по всей Финляндии удалённо.' },
        { q: 'На каких языках говорит бухгалтер?', a: 'На русском и финском. Личный кабинет Vaavo доступен на финском, русском, английском, эстонском и украинском.' },
      ],
    },
    fi: {
      title: 'Venäjänkielinen tilitoimisto Helsingissä ja koko Suomessa',
      description: 'Tilitoimisto Debit Credit palvelee suomeksi ja venäjäksi: toiminimet, osakeyhtiöt ja yhdistykset. Hinnat alkaen 34,90 €/kk, siirto edelliseltä tilitoimistolta maksuton.',
      lead: 'Debit Credit on helsinkiläinen tilitoimisto, joka hoitaa yli 70 yrityksen ja yhteisön kirjanpidon eri puolilla Suomea. Kirjanpitäjämme palvelee suomeksi ja venäjäksi, joten venäjänkielinen yrittäjä saa selitykset omalla kielellään ja viranomaisasiat hoituvat suomeksi.',
      body: [
        { t: 'h2', x: 'Ketä palvelemme' },
        { t: 'ul', items: [
          'Toiminimiä: rakentaminen, taksi- ja kuljetusala, palvelut, kauppa.',
          'Osakeyhtiöitä yhden omistajan yhtiöistä työnantajayrityksiin.',
          'Yhdistyksiä ja muita yhteisöjä.',
          'Uusia yrittäjiä: toiminimen tai osakeyhtiön perustaminen ja rekisteröinnit.',
        ] },
        { t: 'h2', x: 'Mitä palveluun sisältyy' },
        { t: 'ul', items: [
          'Kirjanpito ja kuukausittaiset arvonlisäveroilmoitukset.',
          'Palkanlaskenta ja tulorekisteri-ilmoitukset.',
          'Tilinpäätös ja yrityksen veroilmoitus.',
          'Tavanomaiset kirjanpito- ja verokysymykset ilman lisämaksua, myös venäjäksi.',
          'Vaavo-asiakasportaali viidellä kielellä: tositteet, laskut, pankki, määräajat ja tekoälyavustaja. Portaali sisältyy pakettiin ilman erillistä tilausta.',
        ] },
        { t: 'h2', x: 'Hinnat' },
        { t: 'p', x: 'Kuukausipaketit alkaen 34,90 € (toiminimi, yhdenkertainen kirjanpito) aina 544,50 €:oon suuremmille osakeyhtiöille, hinnat + ALV. Hinta riippuu kuukauden tapahtumamäärästä ja työntekijöiden määrästä. Kaikki paketit ja lisäpalvelut löytyvät hinnastosta.' },
        { t: 'h2', x: 'Siirtyminen toisesta tilitoimistosta' },
        { t: 'p', x: 'Kirjanpidon siirto edelliseltä tilitoimistolta on uusille asiakkaille maksuton. Vaihto on helpointa vuodenvaihteessa: edellinen tilitoimisto päättää kuluvan vuoden ja me aloitamme tammikuusta. Vaihto onnistuu myös kesken vuoden. Mahdollinen rästikirjanpito on erillistä työtä, jonka laajuus ja hinta sovitaan etukäteen.' },
        { t: 'h2', x: 'Yhteydenotto' },
        { t: 'p', x: 'Lähetä viesti WhatsAppissa, soita tai jätä yhteydenottopyyntö. Arkisin vastaamme samana päivänä. Ensimmäinen neuvottelu on maksuton. Palvelemme etänä koko Suomessa.' },
      ],
      faq: [
        { q: 'Palveleeko Debit Credit venäjäksi?', a: 'Kyllä. Kirjanpitäjämme palvelee suomeksi ja venäjäksi, ja Vaavo-asiakasportaali on käytettävissä myös venäjäksi.' },
        { q: 'Paljonko kirjanpito maksaa?', a: 'Kuukausipaketit maksavat 34,90–544,50 € + ALV tapahtumamäärän ja työntekijöiden mukaan. Tavanomaiset kysymykset sisältyvät hintaan.' },
        { q: 'Maksaako tilitoimiston vaihto?', a: 'Ei. Kirjanpidon siirto edelliseltä tilitoimistolta on uusille asiakkaille maksuton. Rästikirjanpito laskutetaan erikseen, jos sitä tarvitaan.' },
      ],
    },
    en: {
      title: 'Russian-speaking accountant in Helsinki and across Finland',
      description: 'Accounting firm Debit Credit serves clients in Finnish and Russian: sole traders, limited companies and associations. From €34.90/month, switching from your previous firm is free.',
      lead: 'Debit Credit is a Helsinki accounting firm keeping the books of more than 70 companies and associations across Finland. Our accountant works in Finnish and Russian: you get explanations in Russian, and dealings with the Tax Administration and the Trade Register are handled in Finnish.',
      body: [
        { t: 'h2', x: 'Who we help' },
        { t: 'ul', items: [
          'Sole traders (toiminimi): construction, taxi and delivery, services, retail.',
          'Limited companies (Oy), from one-owner companies to employers.',
          'Associations (ry) and other organisations.',
          'New entrepreneurs: registering a toiminimi or an Oy.',
        ] },
        { t: 'h2', x: 'What is included' },
        { t: 'ul', items: [
          'Bookkeeping and monthly VAT returns.',
          'Payroll and Incomes Register reports.',
          'Financial statements and the company tax return.',
          'Routine bookkeeping and tax questions at no extra cost.',
          'The Vaavo client portal in five languages, with documents, invoices, bank, deadlines and an AI assistant. The portal is included in every package.',
        ] },
        { t: 'h2', x: 'Prices' },
        { t: 'p', x: 'Monthly packages from €34.90 (sole trader, single-entry bookkeeping) to €544.50 for larger limited companies, plus VAT. The price depends on monthly transactions and employees. See the pricing page for all packages.' },
        { t: 'h2', x: 'Switching from another accounting firm' },
        { t: 'p', x: 'Moving your bookkeeping over from your previous firm is free for new clients. The easiest moment is the turn of the year: your previous firm closes the current year and we start in January. Switching mid-year also works. Catching up on neglected bookkeeping is separate work, agreed in advance.' },
        { t: 'h2', x: 'Contact' },
        { t: 'p', x: 'Message us on WhatsApp, call, or send the contact form. On weekdays we reply the same day. The first consultation is free. We work remotely with companies all over Finland.' },
      ],
      faq: [
        { q: 'Does Debit Credit serve clients in Russian?', a: 'Yes. Our accountant works in Finnish and Russian, and the Vaavo client portal is also available in Russian.' },
        { q: 'Is switching accounting firms free?', a: 'Yes, moving your bookkeeping from your previous firm is free for new clients. Catching up on neglected bookkeeping is billed separately if needed.' },
      ],
    },
    et: {
      title: 'Vene keelt kõnelev raamatupidaja Helsingis ja kogu Soomes',
      description: 'Raamatupidamisbüroo Debit Credit teenindab soome ja vene keeles: FIE-d, osaühingud ja ühingud. Hinnad alates 34,90 €/kuu, üleminek eelmiselt büroolt on tasuta.',
      lead: 'Debit Credit on Helsingi raamatupidamisbüroo, mis peab enam kui 70 ettevõtte ja ühingu raamatupidamist üle Soome. Meie raamatupidaja suhtleb soome ja vene keeles. Vaavo kliendiportaal on saadaval ka eesti keeles.',
      body: [
        { t: 'h2', x: 'Mis teenusesse kuulub' },
        { t: 'ul', items: [
          'Raamatupidamine ja igakuised käibemaksudeklaratsioonid.',
          'Palgaarvestus ja tuluregistri aruanded.',
          'Majandusaasta aruanne ja ettevõtte maksudeklaratsioon.',
          'Tavapärased raamatupidamis- ja maksuküsimused ilma lisatasuta.',
          'Vaavo kliendiportaal viies keeles, sisaldub igas paketis.',
        ] },
        { t: 'h2', x: 'Hinnad ja üleminek' },
        { t: 'p', x: 'Kuupaketid alates 34,90 € kuni 544,50 € + käibemaks. Raamatupidamise üleviimine eelmiselt büroolt on uutele klientidele tasuta. Lihtsaim aeg vahetuseks on aastavahetus: eelmine büroo lõpetab jooksva aasta ja meie alustame jaanuarist.' },
      ],
      faq: [
        { q: 'Kas büroo vahetamine on tasuta?', a: 'Jah, raamatupidamise üleviimine eelmiselt büroolt on uutele klientidele tasuta. Hooletusse jäetud raamatupidamise korrastamine on eraldi töö.' },
      ],
    },
    uk: {
      title: 'Російськомовний бухгалтер у Гельсінкі та по всій Фінляндії',
      description: 'Бухгалтерське бюро Debit Credit обслуговує фінською та російською: toiminimi, Oy та обʼєднання. Ціни від 34,90 € на місяць, перенесення від попереднього бюро безкоштовне.',
      lead: 'Debit Credit — бухгалтерське бюро з Гельсінкі, яке веде бухгалтерію понад 70 фірм і обʼєднань по всій Фінляндії. Наш бухгалтер спілкується фінською та російською. Особистий кабінет Vaavo доступний і українською.',
      body: [
        { t: 'h2', x: 'Що входить в обслуговування' },
        { t: 'ul', items: [
          'Ведення бухгалтерії та щомісячні декларації ПДВ (ALV).',
          'Розрахунок зарплати та звіти до реєстру доходів (Tulorekisteri).',
          'Річний звіт (tilinpäätös) і податкова декларація фірми.',
          'Поточні питання з бухгалтерії та податків без доплати.',
          'Особистий кабінет Vaavo пʼятьма мовами, входить у кожен пакет.',
        ] },
        { t: 'h2', x: 'Ціни та перехід' },
        { t: 'p', x: 'Щомісячні пакети від 34,90 € до 544,50 € без ПДВ. Перенесення бухгалтерії від попереднього бюро для нових клієнтів безкоштовне. Найзручніше змінювати бухгалтера на межі року: попередній закриває поточний рік, а ми починаємо з січня.' },
      ],
      faq: [
        { q: 'Чи платний перехід від іншого бухгалтера?', a: 'Ні, перенесення бухгалтерії від попереднього бюро для нових клієнтів безкоштовне. Відновлення занедбаного обліку — окрема робота.' },
      ],
    },
  },
};
