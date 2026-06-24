import type { Guide } from './types';

// Facts verified June 2026 (vero.fi, veronmaksajat.fi, EK): employer statutory
// side costs ≈ 20 % on top of gross (TyEL employer 17.10 %, employee 7.30 %, plus
// health/unemployment/accident/group-life). Rates change yearly and partly
// depend on payroll size/industry — article uses the ~20 % headline. Tulorekisteri
// report within 5 calendar days of payment.
export const palkanlaskenta: Guide = {
  slug: 'palkanlaskenta',
  datePublished: '2026-06-21',
  dateModified: '2026-06-21',
  content: {
    fi: {
      title: 'Palkanlaskenta: näin maksat palkkaa työntekijälle (2026)',
      description:
        'Miten palkanlaskenta toimii? Ennakonpidätys, työnantajan sivukulut (~20 %), Tulorekisteri-ilmoitus ja mitä työntekijän palkkaaminen maksaa — selkeä opas.',
      lead: 'Ensimmäisen työntekijän palkkaaminen tuo mukanaan palkanlaskennan ja työnantajan velvoitteet. Käymme läpi, mistä palkka muodostuu, paljonko se maksaa työnantajalle ja miten palkka ilmoitetaan.',
      body: [
        { t: 'h2', x: 'Mistä palkka muodostuu?' },
        { t: 'p', x: 'Bruttopalkasta vähennetään ennakonpidätys verokortin mukaan sekä työntekijän osuudet työeläke- ja työttömyysvakuutusmaksusta. Jäljelle jää nettopalkka, jonka työntekijä saa tililleen.' },
        { t: 'h2', x: 'Työnantajan sivukulut — noin 20 % palkan päälle' },
        { t: 'p', x: 'Bruttopalkan lisäksi työnantaja maksaa lakisääteiset sivukulut, jotka ovat yhteensä noin 20 % palkasta. Suurin osa on työeläkemaksu (TyEL, työnantajan osuus noin 17 %).' },
        { t: 'ul', items: [
          'Työeläkemaksu (TyEL).',
          'Sairausvakuutusmaksu.',
          'Työttömyysvakuutusmaksu.',
          'Työtapaturma- ja ammattitautivakuutus.',
          'Ryhmähenkivakuutus.',
        ] },
        { t: 'note', x: 'Maksuprosentit muuttuvat vuosittain ja osa riippuu palkkasummasta ja toimialasta. Käytä noin 20 %:a suuntaa-antavana ja varmista ajantasaiset luvut. Lähde: vero.fi ja tyoelake.fi, kesäkuu 2026.' },
        { t: 'h2', x: 'Tulorekisteri-ilmoitus' },
        { t: 'p', x: 'Jokainen maksettu palkka ilmoitetaan tulorekisteriin viiden kalenteripäivän kuluessa maksupäivästä. Lisäksi työnantajan erillisilmoitus tehdään kuukausittain. Myöhästyneistä ilmoituksista voi tulla myöhästymismaksu.' },
        { t: 'h2', x: 'Muista myös nämä' },
        { t: 'ul', items: [
          'Työehtosopimus (TES) voi määrätä vähimmäispalkan ja lisät.',
          'Vuosiloma sekä lomapalkka ja mahdollinen lomaraha.',
          'Työterveyshuolto — työnantajan on järjestettävä ennaltaehkäisevä työterveyshuolto.',
          'Kirjallinen työsopimus.',
        ] },
        { t: 'h2', x: 'Me hoidamme palkanlaskennan' },
        { t: 'p', x: 'Laskemme palkat, hoidamme ennakonpidätyksen, tulorekisteri-ilmoitukset ja työnantajamaksut — omalla kielelläsi. Sinä keskityt liiketoimintaan.' },
      ],
      faq: [
        { q: 'Paljonko työntekijä maksaa palkan päälle?', a: 'Lakisääteiset sivukulut ovat yhteensä noin 20 % bruttopalkasta. Lisäksi tulevat lomapalkka ja muut työehtosopimuksen mukaiset kulut.' },
        { q: 'Milloin palkka ilmoitetaan tulorekisteriin?', a: 'Viiden kalenteripäivän kuluessa palkanmaksupäivästä.' },
        { q: 'Mikä on TyEL?', a: 'Työntekijän eläkevakuutus. Vuonna 2026 työnantajan osuus on noin 17 % ja työntekijän osuus 7,30 % palkasta.' },
        { q: 'Onko työterveyshuolto pakollinen?', a: 'Kyllä. Työnantajan on järjestettävä työntekijöille ennaltaehkäisevä työterveyshuolto.' },
      ],
    },
    ru: {
      title: 'Расчёт зарплаты: как платить зарплату работнику в Финляндии (2026)',
      description:
        'Как работает расчёт зарплаты? Удержание налога, взносы работодателя (~20 %), отчёт в Tulorekisteri и сколько стоит наём работника — понятный гид.',
      lead: 'Наём первого работника приносит расчёт зарплаты и обязанности работодателя. Разбираем, из чего складывается зарплата, сколько она стоит работодателю и как её отчитывать.',
      body: [
        { t: 'h2', x: 'Из чего складывается зарплата?' },
        { t: 'p', x: 'Из брутто-зарплаты удерживается аванс по налогу (по налоговой карте) и доли работника по пенсионному и страховке от безработицы. Остаётся нетто-зарплата, которую работник получает на счёт.' },
        { t: 'h2', x: 'Взносы работодателя — около 20 % сверх зарплаты' },
        { t: 'p', x: 'Помимо брутто-зарплаты работодатель платит обязательные взносы, которые в сумме составляют около 20 % от зарплаты. Большая часть — пенсионный взнос (TyEL, доля работодателя около 17 %).' },
        { t: 'ul', items: [
          'Пенсионный взнос (TyEL).',
          'Взнос медицинского страхования.',
          'Взнос страхования от безработицы.',
          'Страхование от несчастных случаев и профзаболеваний.',
          'Групповое страхование жизни.',
        ] },
        { t: 'note', x: 'Проценты взносов меняются ежегодно, часть зависит от суммы зарплат и отрасли. Используйте ~20 % как ориентир и уточняйте актуальные цифры. Источник: vero.fi и tyoelake.fi, июнь 2026.' },
        { t: 'h2', x: 'Отчёт в Tulorekisteri' },
        { t: 'p', x: 'Каждая выплаченная зарплата сообщается в реестр доходов (Tulorekisteri) в течение пяти календарных дней с даты выплаты. Также ежемесячно подаётся отдельный отчёт работодателя. За просрочку возможен штраф.' },
        { t: 'h2', x: 'Не забудьте также' },
        { t: 'ul', items: [
          'Коллективный договор (TES) может устанавливать минимальную зарплату и надбавки.',
          'Отпуск, отпускные и возможная отпускная премия.',
          'Профилактическое медобслуживание работников (työterveyshuolto) — работодатель обязан его организовать.',
          'Письменный трудовой договор.',
        ] },
        { t: 'h2', x: 'Мы сделаем расчёт зарплаты' },
        { t: 'p', x: 'Считаем зарплаты, оформляем удержание налога, отчёты в Tulorekisteri и взносы работодателя — на вашем языке. Вы занимаетесь бизнесом.' },
      ],
      faq: [
        { q: 'Сколько работник стоит сверх зарплаты?', a: 'Обязательные взносы — в сумме около 20 % от брутто-зарплаты. Дополнительно идут отпускные и прочие расходы по коллективному договору.' },
        { q: 'Когда зарплата сообщается в Tulorekisteri?', a: 'В течение пяти календарных дней с даты выплаты зарплаты.' },
        { q: 'Что такое TyEL?', a: 'Пенсионное страхование работника. В 2026 году доля работодателя около 17 %, доля работника 7,30 % от зарплаты.' },
        { q: 'Обязательно ли медобслуживание?', a: 'Да. Работодатель обязан организовать работникам профилактическое медобслуживание.' },
      ],
    },
    en: {
      title: 'Payroll: how to pay an employee’s salary in Finland (2026)',
      description:
        'How does payroll work? Withholding, employer side costs (~20%), Incomes Register reporting, and what hiring an employee costs — a clear guide.',
      lead: 'Hiring your first employee brings payroll and employer obligations. We go through what makes up the salary, how much it costs the employer, and how the salary is reported.',
      body: [
        { t: 'h2', x: 'What makes up the salary?' },
        { t: 'p', x: 'From the gross salary, tax withholding (per the tax card) and the employee’s shares of the pension and unemployment insurance contributions are deducted. What remains is the net salary the employee receives.' },
        { t: 'h2', x: 'Employer side costs — about 20% on top of salary' },
        { t: 'p', x: 'On top of the gross salary, the employer pays statutory side costs that total about 20% of the salary. The largest part is the pension contribution (TyEL, the employer share is about 17%).' },
        { t: 'ul', items: [
          'Pension contribution (TyEL).',
          'Health insurance contribution.',
          'Unemployment insurance contribution.',
          'Work accident and occupational disease insurance.',
          'Group life insurance.',
        ] },
        { t: 'note', x: 'The contribution rates change every year and some depend on the payroll size and industry. Use about 20% as a guide and confirm the current figures. Source: vero.fi and tyoelake.fi, June 2026.' },
        { t: 'h2', x: 'Incomes Register reporting' },
        { t: 'p', x: 'Each salary paid is reported to the Incomes Register (Tulorekisteri) within five calendar days of the payment date. The employer also files a separate monthly report. Late reports can incur a late-filing penalty.' },
        { t: 'h2', x: 'Remember these too' },
        { t: 'ul', items: [
          'A collective agreement (TES) may set the minimum pay and supplements.',
          'Annual leave plus holiday pay and a possible holiday bonus.',
          'Occupational health care — the employer must arrange preventive occupational health care.',
          'A written employment contract.',
        ] },
        { t: 'h2', x: 'We handle the payroll' },
        { t: 'p', x: 'We calculate the salaries and handle the withholding, the Incomes Register reports and the employer contributions — in your language. You focus on the business.' },
      ],
      faq: [
        { q: 'How much does an employee cost on top of the salary?', a: 'Statutory side costs total about 20% of the gross salary. On top come holiday pay and other costs under the collective agreement.' },
        { q: 'When is salary reported to the Incomes Register?', a: 'Within five calendar days of the salary payment date.' },
        { q: 'What is TyEL?', a: 'The employee’s pension insurance. In 2026 the employer share is about 17% and the employee share is 7.30% of the salary.' },
        { q: 'Is occupational health care mandatory?', a: 'Yes. The employer must arrange preventive occupational health care for employees.' },
      ],
    },
    et: {
      title: 'Palgaarvestus: kuidas maksta töötajale palka Soomes (2026)',
      description:
        'Kuidas palgaarvestus toimib? Kinnipidamine, tööandja kõrvalkulud (~20 %), Tulorekisteri teade ja kui palju töötaja palkamine maksab — selge juhend.',
      lead: 'Esimese töötaja palkamine toob kaasa palgaarvestuse ja tööandja kohustused. Vaatame, millest palk koosneb, kui palju see tööandjale maksab ja kuidas palka deklareeritakse.',
      body: [
        { t: 'h2', x: 'Millest palk koosneb?' },
        { t: 'p', x: 'Brutopalgast peetakse kinni maksu ettemaks (maksukaardi järgi) ning töötaja osad pensioni- ja töötuskindlustusmaksest. Alles jääb netopalk, mille töötaja oma kontole saab.' },
        { t: 'h2', x: 'Tööandja kõrvalkulud — umbes 20 % palga peale' },
        { t: 'p', x: 'Lisaks brutopalgale maksab tööandja seadusjärgsed kõrvalkulud, mis on kokku umbes 20 % palgast. Suurim osa on pensionimakse (TyEL, tööandja osa umbes 17 %).' },
        { t: 'ul', items: [
          'Pensionimakse (TyEL).',
          'Ravikindlustusmakse.',
          'Töötuskindlustusmakse.',
          'Tööõnnetus- ja kutsehaiguskindlustus.',
          'Grupielukindlustus.',
        ] },
        { t: 'note', x: 'Maksumäärad muutuvad igal aastal ja osa sõltub palgasummast ja tegevusalast. Kasuta umbes 20 % orientiirina ja kontrolli ajakohaseid numbreid. Allikas: vero.fi ja tyoelake.fi, juuni 2026.' },
        { t: 'h2', x: 'Tulorekisteri teade' },
        { t: 'p', x: 'Iga makstud palk teatatakse tuluregistrisse (Tulorekisteri) viie kalendripäeva jooksul maksepäevast. Lisaks esitab tööandja igakuise eraldi teate. Hilinenud teadetest võib tulla viivistasu.' },
        { t: 'h2', x: 'Pea meeles ka neid' },
        { t: 'ul', items: [
          'Kollektiivleping (TES) võib määrata miinimumpalga ja lisad.',
          'Põhipuhkus ning puhkusetasu ja võimalik puhkusepreemia.',
          'Töötervishoid — tööandja peab korraldama ennetava töötervishoiu.',
          'Kirjalik tööleping.',
        ] },
        { t: 'h2', x: 'Korraldame palgaarvestuse' },
        { t: 'p', x: 'Arvutame palgad ja korraldame kinnipidamise, Tulorekisteri teated ja tööandja maksed — sinu keeles. Sina keskendud ärile.' },
      ],
      faq: [
        { q: 'Kui palju maksab töötaja palga peale?', a: 'Seadusjärgsed kõrvalkulud on kokku umbes 20 % brutopalgast. Lisaks tulevad puhkusetasu ja muud kollektiivlepingu kulud.' },
        { q: 'Millal teatatakse palk Tulorekisterisse?', a: 'Viie kalendripäeva jooksul palga maksepäevast.' },
        { q: 'Mis on TyEL?', a: 'Töötaja pensionikindlustus. 2026. aastal on tööandja osa umbes 17 % ja töötaja osa 7,30 % palgast.' },
        { q: 'Kas töötervishoid on kohustuslik?', a: 'Jah. Tööandja peab korraldama töötajatele ennetava töötervishoiu.' },
      ],
    },
    uk: {
      title: 'Розрахунок зарплати: як платити зарплату працівнику у Фінляндії (2026)',
      description:
        'Як працює розрахунок зарплати? Утримання податку, внески роботодавця (~20 %), звіт у Tulorekisteri і скільки коштує найм працівника — зрозумілий гід.',
      lead: 'Найм першого працівника приносить розрахунок зарплати та обовʼязки роботодавця. Розбираємо, з чого складається зарплата, скільки вона коштує роботодавцю і як її звітувати.',
      body: [
        { t: 'h2', x: 'З чого складається зарплата?' },
        { t: 'p', x: 'З брутто-зарплати утримується аванс із податку (за податковою карткою) та частки працівника з пенсійного і страхування від безробіття. Залишається нетто-зарплата, яку працівник отримує на рахунок.' },
        { t: 'h2', x: 'Внески роботодавця — близько 20 % понад зарплату' },
        { t: 'p', x: 'Окрім брутто-зарплати, роботодавець сплачує обовʼязкові внески, які разом становлять близько 20 % від зарплати. Більша частина — пенсійний внесок (TyEL, частка роботодавця близько 17 %).' },
        { t: 'ul', items: [
          'Пенсійний внесок (TyEL).',
          'Внесок медичного страхування.',
          'Внесок страхування від безробіття.',
          'Страхування від нещасних випадків і профзахворювань.',
          'Групове страхування життя.',
        ] },
        { t: 'note', x: 'Відсотки внесків змінюються щороку, частина залежить від суми зарплат і галузі. Використовуйте ~20 % як орієнтир і уточнюйте актуальні цифри. Джерело: vero.fi і tyoelake.fi, червень 2026.' },
        { t: 'h2', x: 'Звіт у Tulorekisteri' },
        { t: 'p', x: 'Кожна виплачена зарплата повідомляється до реєстру доходів (Tulorekisteri) протягом пʼяти календарних днів від дати виплати. Також щомісяця подається окремий звіт роботодавця. За прострочення можливий штраф.' },
        { t: 'h2', x: 'Памʼятайте також' },
        { t: 'ul', items: [
          'Колективний договір (TES) може встановлювати мінімальну зарплату й надбавки.',
          'Відпустка, відпускні та можлива відпускна премія.',
          'Профілактичне медобслуговування працівників (työterveyshuolto) — роботодавець зобовʼязаний його організувати.',
          'Письмовий трудовий договір.',
        ] },
        { t: 'h2', x: 'Ми зробимо розрахунок зарплати' },
        { t: 'p', x: 'Рахуємо зарплати та оформлюємо утримання, звіти в Tulorekisteri і внески роботодавця — вашою мовою. Ви займаєтеся бізнесом.' },
      ],
      faq: [
        { q: 'Скільки працівник коштує понад зарплату?', a: 'Обовʼязкові внески — разом близько 20 % від брутто-зарплати. Додатково йдуть відпускні та інші витрати за колективним договором.' },
        { q: 'Коли зарплата повідомляється в Tulorekisteri?', a: 'Протягом пʼяти календарних днів від дати виплати зарплати.' },
        { q: 'Що таке TyEL?', a: 'Пенсійне страхування працівника. У 2026 році частка роботодавця близько 17 %, частка працівника 7,30 % від зарплати.' },
        { q: 'Чи обовʼязкове медобслуговування?', a: 'Так. Роботодавець зобовʼязаний організувати працівникам профілактичне медобслуговування.' },
      ],
    },
  },
};
