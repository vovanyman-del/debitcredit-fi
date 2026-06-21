import type { Guide } from './types';

// Practical comparison. Stable facts: a "light entrepreneur" invoices via a
// service without their own business/Business ID; YEL still applies if estimated
// work income exceeds the limit (9 423,09 € in 2026); toiminimi registration 75 €.
export const kevytyrittajyysVaiToiminimi: Guide = {
  slug: 'kevytyrittajyys-vai-toiminimi',
  datePublished: '2026-06-21',
  dateModified: '2026-06-21',
  content: {
    fi: {
      title: 'Kevytyrittäjyys vai toiminimi? Kummalla aloitat?',
      description:
        'Kevytyrittäjä vai toiminimi? Vertailemme kustannukset, vähennykset, YEL ja vastuun — ja kerromme, kummalla kannattaa aloittaa.',
      lead: 'Kun aloitat laskuttamisen, vaihtoehtoina ovat usein kevytyrittäjyys tai oma toiminimi. Selitämme erot ja kerromme, kummalle yrittäjälle kumpikin sopii.',
      body: [
        { t: 'h2', x: 'Mitä kevytyrittäjyys tarkoittaa?' },
        { t: 'p', x: 'Kevytyrittäjä laskuttaa työstään laskutuspalvelun kautta ilman omaa yritystä ja Y-tunnusta. Palvelu hoitaa laskutuksen, ennakonpidätyksen ja viranomaisilmoitukset ja veloittaa siitä palvelumaksun (usein muutaman prosentin laskusta). Kevytyrittäjyys ei ole oma yritysmuoto vaan tapa laskuttaa.' },
        { t: 'h2', x: 'Mitä toiminimi tarkoittaa?' },
        { t: 'p', x: 'Toiminimi on oma yritys, jolla on Y-tunnus. Saat täydet vähennykset, hoidat (tai ulkoistat) kirjanpidon ja ALV:n itse, ja sinulla on enemmän hallintaa ja usein verotehokkaampi tilanne. Vastuuta on hieman enemmän.' },
        { t: 'h2', x: 'Tärkeimmät erot' },
        { t: 'ul', items: [
          'Perustaminen: kevytyrittäjä ei perusta mitään; toiminimi rekisteröidään (perustamisilmoitus 75 €).',
          'Kulut: kevytyrittäjä maksaa palvelumaksun jokaisesta laskusta; toiminimella kulut ovat kiinteämmät (esim. kirjanpito).',
          'Vähennykset: toiminimellä laajemmat; kevytyrittäjällä rajatummat.',
          'ALV: toiminimi hoitaa itse (yli 20 000 € liikevaihdolla); laskutuspalvelu voi hoitaa ALV:n puolestasi.',
          'YEL: koskee molempia, jos työtulo ylittää 9 423,09 € (2026).',
        ] },
        { t: 'note', x: 'YEL-velvollisuus ei poistu kevytyrittäjänä — jos arvioitu työtulosi ylittää rajan, YEL on pakollinen myös kevytyrittäjälle.' },
        { t: 'h2', x: 'Kummalla kannattaa aloittaa?' },
        { t: 'p', x: 'Kevytyrittäjyys sopii satunnaiseen tai kokeiluluontoiseen laskutukseen, kun haluat aloittaa kevyesti. Kun toiminta on säännöllistä tai kasvaa, oma toiminimi on usein edullisempi ja joustavampi, koska saat täydet vähennykset ja paremman verotuksen.' },
        { t: 'h2', x: 'Autamme valinnassa' },
        { t: 'p', x: 'Autamme valitsemaan sinulle sopivan tavan ja perustamaan toiminimen, jos se on järkevin — omalla kielelläsi.' },
      ],
      faq: [
        { q: 'Mikä on ero kevytyrittäjän ja toiminimen välillä?', a: 'Kevytyrittäjä laskuttaa laskutuspalvelun kautta ilman omaa yritystä. Toiminimi on oma yritys Y-tunnuksella, jolla saat täydet vähennykset ja enemmän hallintaa.' },
        { q: 'Maksanko YEL:ää kevytyrittäjänä?', a: 'Kyllä, jos arvioitu YEL-työtulosi ylittää 9 423,09 € (2026). YEL on pakollinen myös kevytyrittäjälle.' },
        { q: 'Kumpi on halvempi?', a: 'Riippuu laskutuksen määrästä. Satunnaiseen laskutukseen kevytyrittäjyys; säännölliseen ja kasvavaan toiminimi on usein edullisempi.' },
        { q: 'Voinko vaihtaa kevytyrittäjyydestä toiminimeen?', a: 'Kyllä, ja se on yleistä toiminnan kasvaessa. Autamme toiminimen perustamisessa.' },
      ],
    },
    ru: {
      title: 'Kevytyrittäjyys или toiminimi? С чего начать?',
      description:
        'Лёгкое предпринимательство или toiminimi? Сравниваем расходы, вычеты, YEL и ответственность — и подсказываем, с чего лучше начать.',
      lead: 'Когда вы начинаете выставлять счета, варианты часто — кевитюрияйюс (лёгкое предпринимательство) или собственный toiminimi. Объясняем отличия и кому что подходит.',
      body: [
        { t: 'h2', x: 'Что такое kevytyrittäjyys?' },
        { t: 'p', x: 'Кевитюрияйя выставляет счета через сервис выставления счетов без собственной фирмы и Y-tunnus. Сервис ведёт выставление счетов, удержание налога и отчёты в органы и берёт за это плату (часто несколько процентов со счёта). Это не отдельная форма бизнеса, а способ выставлять счета.' },
        { t: 'h2', x: 'Что такое toiminimi?' },
        { t: 'p', x: 'Toiminimi — собственная фирма с Y-tunnus. Вы получаете полные вычеты, ведёте (или передаёте на аутсорс) учёт и ALV сами, у вас больше контроля и часто более выгодное налогообложение. Ответственности немного больше.' },
        { t: 'h2', x: 'Ключевые отличия' },
        { t: 'ul', items: [
          'Регистрация: кевитюрияйя ничего не открывает; toiminimi регистрируется (заявление о регистрации 75 €).',
          'Расходы: кевитюрияйя платит комиссию с каждого счёта; у toiminimi расходы более постоянные (напр. бухгалтерия).',
          'Вычеты: у toiminimi шире; у кевитюрияйи ограниченнее.',
          'ALV: toiminimi ведёт сам (при обороте свыше 20 000 €); сервис может вести ALV за вас.',
          'YEL: касается обоих, если доход YEL превышает 9 423,09 € (2026).',
        ] },
        { t: 'note', x: 'Обязанность YEL не исчезает у кевитюрияйи — если расчётный доход превышает порог, YEL обязателен и для лёгкого предпринимателя.' },
        { t: 'h2', x: 'С чего лучше начать?' },
        { t: 'p', x: 'Лёгкое предпринимательство подходит для случайных или пробных счетов, когда хочется начать просто. Когда деятельность регулярная или растёт, собственный toiminimi часто выгоднее и гибче — вы получаете полные вычеты и лучшее налогообложение.' },
        { t: 'h2', x: 'Поможем с выбором' },
        { t: 'p', x: 'Поможем выбрать подходящий способ и открыть toiminimi, если это разумнее всего — на вашем языке.' },
      ],
      faq: [
        { q: 'В чём разница между кевитюрияйей и toiminimi?', a: 'Кевитюрияйя выставляет счета через сервис без своей фирмы. Toiminimi — собственная фирма с Y-tunnus, с полными вычетами и большим контролем.' },
        { q: 'Плачу ли я YEL как кевитюрияйя?', a: 'Да, если расчётный доход YEL превышает 9 423,09 € (2026). YEL обязателен и для лёгкого предпринимателя.' },
        { q: 'Что дешевле?', a: 'Зависит от объёма счетов. Для случайных счетов — кевитюрияйя; для регулярных и растущих toiminimi часто выгоднее.' },
        { q: 'Можно ли перейти с кевитюрияйи на toiminimi?', a: 'Да, и это распространено при росте. Поможем с открытием toiminimi.' },
      ],
    },
    en: {
      title: 'Light entrepreneurship or a sole trader (toiminimi)? Where to start?',
      description:
        'Light entrepreneur or a toiminimi? We compare the costs, deductions, YEL and liability — and tell you which to start with.',
      lead: 'When you start invoicing, the options are often light entrepreneurship or your own sole trader (toiminimi). We explain the differences and which suits which entrepreneur.',
      body: [
        { t: 'h2', x: 'What does light entrepreneurship mean?' },
        { t: 'p', x: 'A light entrepreneur invoices their work through an invoicing service without their own business or Business ID. The service handles the invoicing, the tax withholding and the authority reports, and charges a service fee for it (often a few per cent of the invoice). Light entrepreneurship is not a business form but a way to invoice.' },
        { t: 'h2', x: 'What does a sole trader (toiminimi) mean?' },
        { t: 'p', x: 'A toiminimi is your own business with a Business ID. You get full deductions, you handle (or outsource) the bookkeeping and VAT yourself, and you have more control and often a more tax-efficient position. There is a little more responsibility.' },
        { t: 'h2', x: 'The key differences' },
        { t: 'ul', items: [
          'Setup: a light entrepreneur founds nothing; a toiminimi is registered (foundation notification €75).',
          'Costs: a light entrepreneur pays a fee on every invoice; a toiminimi has more fixed costs (e.g. bookkeeping).',
          'Deductions: broader for a toiminimi; more limited for a light entrepreneur.',
          'VAT: a toiminimi handles it itself (over €20,000 turnover); an invoicing service can handle VAT for you.',
          'YEL: applies to both if work income exceeds €9,423.09 (2026).',
        ] },
        { t: 'note', x: 'The YEL obligation doesn’t disappear as a light entrepreneur — if your estimated work income exceeds the limit, YEL is mandatory for a light entrepreneur too.' },
        { t: 'h2', x: 'Which one should you start with?' },
        { t: 'p', x: 'Light entrepreneurship suits occasional or trial invoicing when you want to start lightly. When the activity is regular or growing, your own toiminimi is often cheaper and more flexible, because you get full deductions and better taxation.' },
        { t: 'h2', x: 'We help you choose' },
        { t: 'p', x: 'We help you choose the right approach and set up a toiminimi if that makes the most sense — in your language.' },
      ],
      faq: [
        { q: 'What is the difference between a light entrepreneur and a toiminimi?', a: 'A light entrepreneur invoices through a service without their own business. A toiminimi is your own business with a Business ID, with full deductions and more control.' },
        { q: 'Do I pay YEL as a light entrepreneur?', a: 'Yes, if your estimated YEL work income exceeds €9,423.09 (2026). YEL is mandatory for a light entrepreneur too.' },
        { q: 'Which is cheaper?', a: 'It depends on your invoicing volume. For occasional invoicing, light entrepreneurship; for regular and growing activity, a toiminimi is often cheaper.' },
        { q: 'Can I switch from light entrepreneurship to a toiminimi?', a: 'Yes, and it’s common as activity grows. We help with setting up the toiminimi.' },
      ],
    },
    et: {
      title: 'Kergettevõtlus või toiminimi (FIE)? Kummast alustada?',
      description:
        'Kergettevõtja või toiminimi? Võrdleme kulusid, vähendusi, YEL-i ja vastutust — ning ütleme, kummast tasub alustada.',
      lead: 'Kui hakkad arveldama, on valikuks sageli kergettevõtlus või oma toiminimi. Selgitame erinevused ja kellele kumb sobib.',
      body: [
        { t: 'h2', x: 'Mida tähendab kergettevõtlus?' },
        { t: 'p', x: 'Kergettevõtja arveldab oma tööd arveldusteenuse kaudu ilma oma ettevõtte ja Y-tunnuseta. Teenus korraldab arveldamise, kinnipidamise ja ametiasutuste teated ning võtab selle eest tasu (sageli mõni protsent arvest). Kergettevõtlus pole ettevõtlusvorm, vaid viis arveldada.' },
        { t: 'h2', x: 'Mida tähendab toiminimi?' },
        { t: 'p', x: 'Toiminimi on oma ettevõte Y-tunnusega. Saad täisvähendused, korraldad (või tellid) raamatupidamise ja ALV ise ning sul on rohkem kontrolli ja sageli maksutõhusam olukord. Vastutust on veidi rohkem.' },
        { t: 'h2', x: 'Peamised erinevused' },
        { t: 'ul', items: [
          'Asutamine: kergettevõtja ei asuta midagi; toiminimi registreeritakse (asutamisteade 75 €).',
          'Kulud: kergettevõtja maksab tasu igalt arvelt; toiminimi’l on püsivamad kulud (nt raamatupidamine).',
          'Vähendused: toiminimi’l laiemad; kergettevõtjal piiratumad.',
          'ALV: toiminimi korraldab ise (üle 20 000 € käibe puhul); arveldusteenus võib ALV sinu eest korraldada.',
          'YEL: puudutab mõlemat, kui töötulu ületab 9 423,09 € (2026).',
        ] },
        { t: 'note', x: 'YEL-kohustus ei kao kergettevõtjana — kui hinnanguline töötulu ületab piiri, on YEL kohustuslik ka kergettevõtjale.' },
        { t: 'h2', x: 'Kummast tasub alustada?' },
        { t: 'p', x: 'Kergettevõtlus sobib juhuslikuks või proovi-arveldamiseks, kui soovid alustada kergelt. Kui tegevus on regulaarne või kasvab, on oma toiminimi sageli odavam ja paindlikum, sest saad täisvähendused ja parema maksustamise.' },
        { t: 'h2', x: 'Aitame valida' },
        { t: 'p', x: 'Aitame valida sulle sobiva viisi ja asutada toiminimi, kui see on mõistlikem — sinu keeles.' },
      ],
      faq: [
        { q: 'Mis vahe on kergettevõtjal ja toiminimi’l?', a: 'Kergettevõtja arveldab teenuse kaudu ilma oma ettevõtteta. Toiminimi on oma ettevõte Y-tunnusega, täisvähenduste ja suurema kontrolliga.' },
        { q: 'Kas maksan kergettevõtjana YEL-i?', a: 'Jah, kui hinnanguline YEL-töötulu ületab 9 423,09 € (2026). YEL on kohustuslik ka kergettevõtjale.' },
        { q: 'Kumb on odavam?', a: 'Sõltub arveldusmahust. Juhuslikuks arveldamiseks kergettevõtlus; regulaarseks ja kasvavaks on toiminimi sageli odavam.' },
        { q: 'Kas saan kergettevõtluselt toiminimi’le üle minna?', a: 'Jah, ja see on kasvades tavaline. Aitame toiminimi asutamisega.' },
      ],
    },
    uk: {
      title: 'Kevytyrittäjyys чи toiminimi? З чого почати?',
      description:
        'Легке підприємництво чи toiminimi? Порівнюємо витрати, вирахування, YEL і відповідальність — і підказуємо, з чого краще почати.',
      lead: 'Коли ви починаєте виставляти рахунки, варіанти часто — легке підприємництво (kevytyrittäjyys) або власний toiminimi. Пояснюємо відмінності й кому що підходить.',
      body: [
        { t: 'h2', x: 'Що таке kevytyrittäjyys?' },
        { t: 'p', x: 'Легкий підприємець виставляє рахунки через сервіс виставлення рахунків без власної фірми та Y-tunnus. Сервіс веде виставлення рахунків, утримання податку та звіти в органи і бере за це плату (часто кілька відсотків з рахунку). Це не окрема форма бізнесу, а спосіб виставляти рахунки.' },
        { t: 'h2', x: 'Що таке toiminimi?' },
        { t: 'p', x: 'Toiminimi — власна фірма з Y-tunnus. Ви отримуєте повні вирахування, ведете (або передаєте на аутсорс) облік і ALV самі, у вас більше контролю і часто вигідніше оподаткування. Відповідальності трохи більше.' },
        { t: 'h2', x: 'Ключові відмінності' },
        { t: 'ul', items: [
          'Реєстрація: легкий підприємець нічого не відкриває; toiminimi реєструється (заява про реєстрацію 75 €).',
          'Витрати: легкий підприємець платить комісію з кожного рахунку; у toiminimi витрати сталіші (напр. бухгалтерія).',
          'Вирахування: у toiminimi ширші; у легкого підприємця обмеженіші.',
          'ALV: toiminimi веде сам (при обороті понад 20 000 €); сервіс може вести ALV за вас.',
          'YEL: стосується обох, якщо дохід YEL перевищує 9 423,09 € (2026).',
        ] },
        { t: 'note', x: 'Обовʼязок YEL не зникає у легкого підприємця — якщо розрахунковий дохід перевищує поріг, YEL обовʼязковий і для нього.' },
        { t: 'h2', x: 'З чого краще почати?' },
        { t: 'p', x: 'Легке підприємництво підходить для випадкових або пробних рахунків, коли хочеться почати просто. Коли діяльність регулярна або зростає, власний toiminimi часто вигідніший і гнучкіший — ви отримуєте повні вирахування і краще оподаткування.' },
        { t: 'h2', x: 'Допоможемо з вибором' },
        { t: 'p', x: 'Допоможемо обрати відповідний спосіб і відкрити toiminimi, якщо це найрозумніше — вашою мовою.' },
      ],
      faq: [
        { q: 'У чому різниця між легким підприємцем і toiminimi?', a: 'Легкий підприємець виставляє рахунки через сервіс без своєї фірми. Toiminimi — власна фірма з Y-tunnus, з повними вирахуваннями та більшим контролем.' },
        { q: 'Чи плачу я YEL як легкий підприємець?', a: 'Так, якщо розрахунковий дохід YEL перевищує 9 423,09 € (2026). YEL обовʼязковий і для легкого підприємця.' },
        { q: 'Що дешевше?', a: 'Залежить від обсягу рахунків. Для випадкових — легке підприємництво; для регулярних і зростаючих toiminimi часто вигідніший.' },
        { q: 'Чи можна перейти з легкого підприємництва на toiminimi?', a: 'Так, і це поширено при зростанні. Допоможемо з відкриттям toiminimi.' },
      ],
    },
  },
};
