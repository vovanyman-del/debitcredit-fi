import type { Guide } from './types';

// Facts verified June 2026 (vero.fi, veronmaksajat.fi): unlisted-company dividend
// — up to 8 % of the share's mathematical value, 25 % taxable capital income /
// 75 % tax-free up to 150 000 € (shareholder-specific), 85 %/15 % above 150 000 €;
// the part over 8 % is earned-income dividend (75 % taxable). Capital-income tax
// 30 % (≤30 000 €) / 34 %. Salary is deductible for the company and taxed as
// earned income. A combination is usually optimal — case-specific.
export const osinkoVaiPalkka: Guide = {
  slug: 'osinko-vai-palkka',
  datePublished: '2026-06-21',
  dateModified: '2026-06-21',
  content: {
    fi: {
      title: 'Osinko vai palkka? Näin nostat rahaa osakeyhtiöstä verotehokkaasti',
      description:
        'Osinko vai palkka osakeyhtiöstä? Vertailemme verotuksen 2026: osingon 8 %:n sääntö, 150 000 €:n raja ja palkan edut — sekä miten yhdistät ne fiksusti.',
      lead: 'Osakeyhtiön omistaja voi nostaa rahaa palkkana, osinkona tai molempina. Kumpi kannattaa? Käymme läpi verotuksen vuonna 2026 ja sen, miksi yhdistelmä on usein paras ratkaisu.',
      body: [
        { t: 'h2', x: 'Palkka — yhtiölle vähennyskelpoinen' },
        { t: 'p', x: 'Itsellesi maksama palkka on yhtiölle vähennyskelpoinen kulu, joten se pienentää yhtiön verotettavaa tulosta (yhteisövero 20 %). Palkka verotetaan ansiotulona progressiivisesti, ja siitä maksetaan työnantajan sivukulut. Huom: useimmat omistajayrittäjät ovat YEL-vakuutettuja, jolloin lakisääteinen eläke ja suuri osa sosiaaliturvasta karttuu YEL-työtulon eikä itselle maksetun palkan perusteella.' },
        { t: 'h2', x: 'Osinko — verotehokas tiettyyn rajaan asti' },
        { t: 'p', x: 'Osinko maksetaan yhtiön verojen jälkeisestä voitosta (yhtiö on jo maksanut 20 % yhteisöveroa). Listaamattomasta yhtiöstä osinkoa verotetaan kevyesti tiettyyn rajaan asti:' },
        { t: 'ul', items: [
          'Osinko enintään 8 % osakkeiden matemaattisesta arvosta: 150 000 €:een asti 25 % on veronalaista pääomatuloa ja 75 % verovapaata.',
          '150 000 € ylittävältä osalta (8 %:n sisällä): 85 % on veronalaista pääomatuloa.',
          '8 %:n ylittävä osinko: 75 % on veronalaista ansiotuloa.',
          'Pääomatulon vero on 30 % 30 000 euroon asti ja 34 % ylimenevältä osalta.',
        ] },
        { t: 'note', x: 'Luvut ovat vuodelta 2026. 150 000 €:n raja on henkilökohtainen ja koskee kaikkia listaamattomien yhtiöiden osinkojasi yhteensä. Matemaattinen arvo lasketaan yhtiön nettovarallisuudesta. Lähde: vero.fi, kesäkuu 2026.' },
        { t: 'h2', x: 'Mikä on matemaattinen arvo?' },
        { t: 'p', x: 'Osakkeen matemaattinen arvo lasketaan yhtiön nettovarallisuudesta (varat miinus velat) jaettuna osakkeiden määrällä. Mitä suurempi nettovarallisuus, sitä enemmän voit nostaa kevyesti verotettua osinkoa 8 %:n säännön puitteissa.' },
        { t: 'h2', x: 'Kumpi kannattaa — palkka vai osinko?' },
        { t: 'p', x: 'Yhtä oikeaa vastausta ei ole. Edullisin tapa riippuu yhtiön voitosta, nettovarallisuudesta, muista tuloistasi ja siitä, kuinka paljon arvostat eläke- ja sosiaalietuuksien kertymistä. Usein paras ratkaisu on yhdistelmä.' },
        { t: 'h2', x: 'Käytännön nyrkkisääntö' },
        { t: 'ul', items: [
          'Mitoita palkka kokonaistilanteen mukaan — YEL-yrittäjän eläke karttuu YEL-työtulosta, ei maksetusta palkasta.',
          'Hyödynnä kevyesti verotettu osinko 8 %:n säännön rajoissa.',
          'Seuraa nettovarallisuutta vuosittain — se määrää osingon edullisen määrän.',
          'Suunnittele nostot etukäteen kirjanpitäjän kanssa.',
        ] },
        { t: 'h2', x: 'Suunnittele kanssamme' },
        { t: 'p', x: 'Laskemme tilanteeseesi sopivan palkan ja osingon yhdistelmän laillisesti — omalla kielelläsi, kaikki ehdot huomioiden, jotta hyödynnät sinulle kuuluvat vähennykset etkä maksa turhaan liikaa.' },
      ],
      faq: [
        { q: 'Onko osinko vai palkka edullisempi?', a: 'Se riippuu yhtiön voitosta ja nettovarallisuudesta sekä muista tuloistasi. Usein edullisin on yhdistelmä — laskemme sen puolestasi.' },
        { q: 'Mikä on osingon 8 %:n sääntö?', a: 'Listaamattomasta yhtiöstä osinko enintään 8 % osakkeiden matemaattisesta arvosta verotetaan kevyesti: 150 000 €:een asti 25 % on veronalaista pääomatuloa ja 75 % verovapaata.' },
        { q: 'Mikä on 150 000 €:n raja?', a: 'Se on henkilökohtainen vuosiraja kevyemmin verotetulle osingolle ja koskee kaikkia listaamattomien yhtiöiden osinkojasi yhteensä.' },
        { q: 'Voinko nostaa pelkkää osinkoa?', a: 'Voit. YEL-yrittäjän lakisääteinen eläke karttuu YEL-työtulosta palkasta riippumatta, mutta palkan ja osingon yhdistelmä voi silti olla verotuksellisesti järkevä. Paras ratkaisu riippuu kokonaistilanteesta.' },
      ],
    },
    ru: {
      title: 'Дивиденд или зарплата? Как выводить деньги из Oy налогоэффективно',
      description:
        'Дивиденд или зарплата из osakeyhtiö? Сравниваем налоги 2026: правило 8% по дивиденду, порог 150 000 € и плюсы зарплаты — и как их разумно сочетать.',
      lead: 'Владелец osakeyhtiö может выводить деньги зарплатой, дивидендом или и тем, и другим. Что выгоднее? Разбираем налогообложение 2026 года и почему комбинация часто оптимальна.',
      body: [
        { t: 'h2', x: 'Зарплата — вычитается у компании' },
        { t: 'p', x: 'Зарплата, которую вы платите себе, является для компании вычитаемым расходом, поэтому уменьшает налогооблагаемую прибыль (корпоративный налог 20%). Зарплата облагается как заработанный доход прогрессивно, и с неё платятся взносы работодателя. Важно: большинство владельцев-предпринимателей застрахованы по YEL — тогда пенсия и значительная часть соцзащиты считаются по YEL-työtulo, а не по зарплате, которую вы себе платите.' },
        { t: 'h2', x: 'Дивиденд — налогоэффективен до предела' },
        { t: 'p', x: 'Дивиденд выплачивается из прибыли после налогов компании (компания уже заплатила 20% корпоративного налога). Из непубличной компании дивиденд облагается льготно до определённого предела:' },
        { t: 'ul', items: [
          'Дивиденд до 8% от математической стоимости акций: до 150 000 € — 25% является налогооблагаемым капитальным доходом, 75% — без налога.',
          'Сверх 150 000 € (в рамках 8%): 85% является налогооблагаемым капитальным доходом.',
          'Дивиденд сверх 8%: 75% является налогооблагаемым заработанным доходом.',
          'Налог на капитальный доход — 30% до 30 000 € и 34% сверх.',
        ] },
        { t: 'note', x: 'Цифры приведены на 2026 год. Порог 150 000 € личный и касается всех ваших дивидендов из непубличных компаний суммарно. Математическая стоимость считается от чистых активов компании. Источник: vero.fi, июнь 2026.' },
        { t: 'h2', x: 'Что такое математическая стоимость?' },
        { t: 'p', x: 'Математическая стоимость акции считается от чистых активов компании (активы минус обязательства), делённых на число акций. Чем больше чистые активы, тем больше льготно облагаемого дивиденда вы можете вывести в рамках правила 8%.' },
        { t: 'h2', x: 'Что выгоднее — зарплата или дивиденд?' },
        { t: 'p', x: 'Единого ответа нет. Самый выгодный способ зависит от прибыли компании, чистых активов, других ваших доходов и того, насколько вам важно накопление пенсии и социальных льгот. Часто лучшее решение — комбинация.' },
        { t: 'h2', x: 'Практическое правило' },
        { t: 'ul', items: [
          'Размер зарплаты подбирайте под общую ситуацию — у YEL-предпринимателя пенсия идёт от YEL-työtulo, а не от зарплаты.',
          'Используйте льготно облагаемый дивиденд в рамках правила 8%.',
          'Следите за чистыми активами ежегодно — они определяют выгодный размер дивиденда.',
          'Планируйте выплаты заранее вместе с бухгалтером.',
        ] },
        { t: 'h2', x: 'Спланируйте вместе с нами' },
        { t: 'p', x: 'Рассчитаем для вашей ситуации законную комбинацию зарплаты и дивиденда — на вашем языке, с учётом всех условий, чтобы вы использовали положенные вычеты и не переплатили по незнанию.' },
      ],
      faq: [
        { q: 'Что выгоднее — дивиденд или зарплата?', a: 'Зависит от прибыли компании, чистых активов и ваших других доходов. Часто выгоднее комбинация — мы её рассчитаем.' },
        { q: 'Что такое правило 8% по дивиденду?', a: 'Из непубличной компании дивиденд до 8% от математической стоимости акций облагается льготно: до 150 000 € 25% — налогооблагаемый капитальный доход, 75% — без налога.' },
        { q: 'Что такое порог 150 000 €?', a: 'Это личный годовой порог для льготно облагаемого дивиденда; он касается всех ваших дивидендов из непубличных компаний суммарно.' },
        { q: 'Можно ли выводить только дивиденд?', a: 'Можно. У YEL-предпринимателя пенсия идёт от YEL-työtulo независимо от зарплаты, но комбинация зарплаты и дивиденда часто выгоднее по налогам. Лучшее решение зависит от вашей ситуации.' },
      ],
    },
    en: {
      title: 'Dividend or salary? How to take money out of an Oy tax-efficiently',
      description:
        'Dividend or salary from a limited company? We compare the 2026 taxation: the 8% dividend rule, the €150,000 limit and the benefits of salary — and how to combine them.',
      lead: 'A limited-company owner can take money out as salary, dividends or both. Which is better? We go through the 2026 taxation and why a combination is often the best solution.',
      body: [
        { t: 'h2', x: 'Salary — deductible for the company' },
        { t: 'p', x: 'The salary you pay yourself is a deductible expense for the company, so it lowers the company’s taxable profit (corporate tax 20%). Salary is taxed as earned income on the progressive scale, and employer side costs are paid on it. Note: most owner-entrepreneurs are YEL-insured, in which case the statutory pension and a large part of social security are based on the YEL income (YEL-työtulo), not on the salary you pay yourself.' },
        { t: 'h2', x: 'Dividend — tax-efficient up to a limit' },
        { t: 'p', x: 'A dividend is paid from the company’s after-tax profit (the company has already paid 20% corporate tax). From an unlisted company, dividends are taxed lightly up to certain limits:' },
        { t: 'ul', items: [
          'Dividend up to 8% of the shares’ mathematical value: up to €150,000, 25% is taxable capital income and 75% is tax-free.',
          'For the part exceeding €150,000 (within the 8%): 85% is taxable capital income.',
          'Dividend exceeding 8%: 75% is taxable earned income.',
          'Capital-income tax is 30% up to €30,000 and 34% above that.',
        ] },
        { t: 'note', x: 'The figures are for 2026. The €150,000 limit is personal and covers all your unlisted-company dividends combined. The mathematical value is calculated from the company’s net assets. Source: vero.fi, June 2026.' },
        { t: 'h2', x: 'What is the mathematical value?' },
        { t: 'p', x: 'A share’s mathematical value is the company’s net assets (assets minus liabilities) divided by the number of shares. The higher the net assets, the more lightly-taxed dividend you can take within the 8% rule.' },
        { t: 'h2', x: 'Which is better — salary or dividend?' },
        { t: 'p', x: 'There is no single right answer. The most efficient approach depends on the company’s profit, its net assets, your other income and how much you value accruing pension and social benefits. Often the best solution is a combination.' },
        { t: 'h2', x: 'A practical rule of thumb' },
        { t: 'ul', items: [
          'Size the salary to your overall situation — a YEL-insured entrepreneur’s pension accrues from the YEL income, not from salary.',
          'Use the lightly-taxed dividend within the 8% rule.',
          'Track net assets yearly — they set the favorable dividend amount.',
          'Plan your withdrawals in advance with your accountant.',
        ] },
        { t: 'h2', x: 'Plan it with us' },
        { t: 'p', x: 'We calculate a salary/dividend mix that suits your situation, legally — in your language, taking all the conditions into account, so you use the reliefs you’re entitled to and don’t overpay by mistake.' },
      ],
      faq: [
        { q: 'Is a dividend or salary more advantageous?', a: 'It depends on the company’s profit and net assets and on your other income. A combination is often the most advantageous — we calculate it for you.' },
        { q: 'What is the 8% dividend rule?', a: 'From an unlisted company, a dividend up to 8% of the shares’ mathematical value is taxed lightly: up to €150,000, 25% is taxable capital income and 75% is tax-free.' },
        { q: 'What is the €150,000 limit?', a: 'It is a personal annual limit for the lightly-taxed dividend and covers all your unlisted-company dividends combined.' },
        { q: 'Can I take only dividends?', a: 'You can. A YEL-insured entrepreneur’s statutory pension accrues from the YEL income regardless of salary, but a salary/dividend combination is often more tax-efficient. The best choice depends on your situation.' },
      ],
    },
    et: {
      title: 'Dividend või palk? Kuidas võtta osaühingust raha maksutõhusalt',
      description:
        'Dividend või palk osaühingust? Võrdleme 2026. aasta maksustamist: dividendi 8% reegel, 150 000 € piir ja palga eelised — ning kuidas neid mõistlikult ühendada.',
      lead: 'Osaühingu omanik saab raha võtta palga, dividendi või mõlemana. Kumb tasub? Vaatame läbi 2026. aasta maksustamise ja selle, miks kombinatsioon on sageli parim lahendus.',
      body: [
        { t: 'h2', x: 'Palk — ettevõttele mahaarvatav' },
        { t: 'p', x: 'Endale makstav palk on ettevõttele mahaarvatav kulu, seega vähendab maksustatavat kasumit (ettevõtte tulumaks 20%). Palk maksustatakse teenitud tuluna progresseeruvalt ja sellelt makstakse tööandja kõrvalkulud. NB: enamik omanikettevõtjaid on YEL-kindlustatud — siis arvestatakse pension ja suur osa sotsiaalkaitsest YEL-töötulu (YEL-työtulo), mitte endale makstud palga järgi.' },
        { t: 'h2', x: 'Dividend — maksutõhus teatud piirini' },
        { t: 'p', x: 'Dividend makstakse ettevõtte maksujärgsest kasumist (ettevõte on juba maksnud 20% tulumaksu). Noteerimata ühingust maksustatakse dividendi kergelt teatud piirini:' },
        { t: 'ul', items: [
          'Dividend kuni 8% aktsiate matemaatilisest väärtusest: kuni 150 000 € on 25% maksustatav kapitalitulu ja 75% maksuvaba.',
          '150 000 € ületav osa (8% piires): 85% on maksustatav kapitalitulu.',
          '8% ületav dividend: 75% on maksustatav teenitud tulu.',
          'Kapitalitulu maks on 30% kuni 30 000 €-ni ja 34% ületavalt osalt.',
        ] },
        { t: 'note', x: 'Numbrid on 2026. aasta kohta. 150 000 € piir on isiklik ja hõlmab kõiki sinu noteerimata ühingute dividende kokku. Matemaatiline väärtus arvutatakse ettevõtte netovarast. Allikas: vero.fi, juuni 2026.' },
        { t: 'h2', x: 'Mis on matemaatiline väärtus?' },
        { t: 'p', x: 'Aktsia matemaatiline väärtus arvutatakse ettevõtte netovarast (varad miinus kohustused) jagatuna aktsiate arvuga. Mida suurem netovara, seda rohkem kergelt maksustatud dividendi saad 8% reegli piires võtta.' },
        { t: 'h2', x: 'Kumb tasub — palk või dividend?' },
        { t: 'p', x: 'Ühte õiget vastust pole. Tõhusaim viis sõltub ettevõtte kasumist, netovarast, sinu muudest tuludest ja sellest, kui palju väärtustad pensioni ja sotsiaalhüvede kogumist. Sageli on parim lahendus kombinatsioon.' },
        { t: 'h2', x: 'Praktiline rusikareegel' },
        { t: 'ul', items: [
          'Sea palk üldise olukorra järgi — YEL-ettevõtja pension koguneb YEL-töötulust, mitte palgast.',
          'Kasuta kergelt maksustatud dividendi 8% reegli piires.',
          'Jälgi netovara igal aastal — see määrab dividendi soodsa summa.',
          'Planeeri väljavõtted ette koos raamatupidajaga.',
        ] },
        { t: 'h2', x: 'Planeeri koos meiega' },
        { t: 'p', x: 'Arvutame sinu olukorrale sobiva palga ja dividendi kombinatsiooni seaduslikult — sinu keeles, arvestades kõiki tingimusi, et kasutaksid sulle kuuluvad mahaarvamised ega maksaks asjata liiga.' },
      ],
      faq: [
        { q: 'Kas dividend või palk on soodsam?', a: 'See sõltub ettevõtte kasumist ja netovarast ning sinu muudest tuludest. Sageli on soodsaim kombinatsioon — arvutame selle sinu eest.' },
        { q: 'Mis on dividendi 8% reegel?', a: 'Noteerimata ühingust maksustatakse dividendi kuni 8% aktsiate matemaatilisest väärtusest kergelt: kuni 150 000 € on 25% maksustatav kapitalitulu ja 75% maksuvaba.' },
        { q: 'Mis on 150 000 € piir?', a: 'See on isiklik aastapiir kergelt maksustatud dividendile ja hõlmab kõiki sinu noteerimata ühingute dividende kokku.' },
        { q: 'Kas saan võtta ainult dividendi?', a: 'Saad. YEL-ettevõtja pension koguneb YEL-töötulust palgast sõltumata, kuid palga ja dividendi kombinatsioon on sageli maksutõhusam. Parim valik sõltub sinu olukorrast.' },
      ],
    },
    uk: {
      title: 'Дивіденд чи зарплата? Як виводити гроші з Oy податково ефективно',
      description:
        'Дивіденд чи зарплата з osakeyhtiö? Порівнюємо податки 2026: правило 8% по дивіденду, поріг 150 000 € і плюси зарплати — та як їх розумно поєднати.',
      lead: 'Власник osakeyhtiö може виводити гроші зарплатою, дивідендом або обома способами. Що вигідніше? Розбираємо оподаткування 2026 року і чому комбінація часто оптимальна.',
      body: [
        { t: 'h2', x: 'Зарплата — вираховується у компанії' },
        { t: 'p', x: 'Зарплата, яку ви платите собі, є для компанії витратою, що вираховується, тож зменшує оподатковуваний прибуток (корпоративний податок 20%). Зарплата оподатковується як зароблений дохід прогресивно, і з неї сплачуються внески роботодавця. Важливо: більшість власників-підприємців застраховані за YEL — тоді пенсія та значна частина соцзахисту рахуються за YEL-työtulo, а не за зарплатою, яку ви собі платите.' },
        { t: 'h2', x: 'Дивіденд — податково ефективний до межі' },
        { t: 'p', x: 'Дивіденд виплачується з прибутку компанії після податків (компанія вже сплатила 20% корпоративного податку). З непублічної компанії дивіденд оподатковується пільгово до певної межі:' },
        { t: 'ul', items: [
          'Дивіденд до 8% від математичної вартості акцій: до 150 000 € — 25% є оподатковуваним капітальним доходом, 75% — без податку.',
          'Понад 150 000 € (у межах 8%): 85% є оподатковуваним капітальним доходом.',
          'Дивіденд понад 8%: 75% є оподатковуваним заробленим доходом.',
          'Податок на капітальний дохід — 30% до 30 000 € і 34% понад.',
        ] },
        { t: 'note', x: 'Цифри наведено на 2026 рік. Поріг 150 000 € особистий і стосується всіх ваших дивідендів з непублічних компаній сумарно. Математична вартість рахується від чистих активів компанії. Джерело: vero.fi, червень 2026.' },
        { t: 'h2', x: 'Що таке математична вартість?' },
        { t: 'p', x: 'Математична вартість акції рахується від чистих активів компанії (активи мінус зобовʼязання), поділених на кількість акцій. Що більші чисті активи, то більше пільгово оподатковуваного дивіденду ви можете вивести в межах правила 8%.' },
        { t: 'h2', x: 'Що вигідніше — зарплата чи дивіденд?' },
        { t: 'p', x: 'Єдиної правильної відповіді немає. Найефективніший спосіб залежить від прибутку компанії, чистих активів, інших ваших доходів і того, наскільки вам важливе накопичення пенсії та соціальних пільг. Часто найкраще рішення — комбінація.' },
        { t: 'h2', x: 'Практичне правило' },
        { t: 'ul', items: [
          'Розмір зарплати підбирайте під загальну ситуацію — у YEL-підприємця пенсія йде від YEL-työtulo, а не від зарплати.',
          'Використовуйте пільгово оподатковуваний дивіденд у межах правила 8%.',
          'Стежте за чистими активами щороку — вони визначають вигідний розмір дивіденду.',
          'Плануйте виплати заздалегідь разом із бухгалтером.',
        ] },
        { t: 'h2', x: 'Сплануйте разом з нами' },
        { t: 'p', x: 'Розрахуємо для вашої ситуації законну комбінацію зарплати й дивіденду — вашою мовою, з урахуванням усіх умов, щоб ви скористалися належними вирахуваннями й не переплатили через незнання.' },
      ],
      faq: [
        { q: 'Що вигідніше — дивіденд чи зарплата?', a: 'Залежить від прибутку компанії та чистих активів і ваших інших доходів. Часто вигідніша комбінація — ми її розрахуємо.' },
        { q: 'Що таке правило 8% по дивіденду?', a: 'З непублічної компанії дивіденд до 8% від математичної вартості акцій оподатковується пільгово: до 150 000 € 25% — оподатковуваний капітальний дохід, 75% — без податку.' },
        { q: 'Що таке поріг 150 000 €?', a: 'Це особистий річний поріг для пільгово оподатковуваного дивіденду; він стосується всіх ваших дивідендів з непублічних компаній сумарно.' },
        { q: 'Чи можна виводити лише дивіденд?', a: 'Можна. У YEL-підприємця пенсія йде від YEL-työtulo незалежно від зарплати, але комбінація зарплати й дивіденду часто вигідніша за податками. Найкраще рішення залежить від вашої ситуації.' },
      ],
    },
  },
};
