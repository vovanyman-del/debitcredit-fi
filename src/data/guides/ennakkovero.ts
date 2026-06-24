import type { Guide } from './types';

// Practical guide (stable mechanics). Prepaid tax (ennakkovero) is income tax
// paid in advance during the tax year based on estimated profit, in instalments
// via OmaVero; adjustable during the year; underpayment → back tax + interest;
// additional prepayment (lisäennakko) avoids/limits interest. Exact interest
// rates are set yearly — article hedges with a note.
export const ennakkovero: Guide = {
  slug: 'ennakkovero',
  datePublished: '2026-06-21',
  dateModified: '2026-06-21',
  content: {
    fi: {
      title: 'Ennakkovero: näin yrittäjä maksaa veronsa etukäteen (2026)',
      description:
        'Mikä on ennakkovero ja miten se lasketaan? Näin maksat yrittäjänä veron etukäteen, muutat ennakkoa ja vältät jäännösveron ja korot.',
      lead: 'Yrittäjä maksaa tuloveronsa pääosin ennakkoon, arvioidun tuloksen perusteella. Selitämme, miten ennakkovero määräytyy, miten muutat sitä ja miten vältät jäännösveron.',
      body: [
        { t: 'h2', x: 'Mikä on ennakkovero?' },
        { t: 'p', x: 'Ennakkovero on tuloveroa, jonka maksat etukäteen verovuoden aikana arvioidun yritystuloksen perusteella. Vero maksetaan ennakkoveroerinä OmaVerossa. Toiminimellä tulos verotetaan henkilökohtaisena tulona ja osakeyhtiöllä yhteisöverona.' },
        { t: 'h2', x: 'Miten ennakkovero määräytyy?' },
        { t: 'p', x: 'Ennakkovero perustuu arvioon verovuoden tuloksesta. Aloittava yrittäjä antaa arvion itse; jatkossa Verohallinto käyttää edellisten vuosien tietoja. Maksuerien määrä riippuu veron suuruudesta.' },
        { t: 'h2', x: 'Muuta ennakkoa, jos tulot muuttuvat' },
        { t: 'p', x: 'Jos tuloksesi kasvaa tai pienenee kesken vuoden, muuta ennakkoveroa OmaVerossa. Liian pieni ennakko johtaa jäännösveroon ja korkoon; liian suuri taas sitoo rahaasi turhaan.' },
        { t: 'note', x: 'Korot ja eräpäivät vahvistetaan vuosittain. Varmista ajantasaiset tiedot OmaVerosta tai kirjanpitäjältä. Lähde: vero.fi (2026).' },
        { t: 'h2', x: 'Lisäennakko ja jäännösvero' },
        { t: 'p', x: 'Jos tulos oli arvioitua suurempi, voit maksaa puuttuvan osan lisäennakkona. Maksamalla lisäennakon ajoissa tilikauden päättymisen jälkeen vältät tai pienennät koron. Jos veroa jää maksamatta, syntyy jäännösvero, jolle lasketaan korkoa.' },
        { t: 'h2', x: 'Apua ennakkoveroon' },
        { t: 'p', x: 'Autamme arvioimaan tuloksesi realistisesti ja pitämään ennakkoveron ajan tasalla, jotta vältät ikäviä yllätyksiä — omalla kielelläsi. Näet tilanteesi Vaavon asiakasportaalissa.' },
      ],
      faq: [
        { q: 'Mikä on ennakkovero?', a: 'Tuloveroa, jonka maksat etukäteen arvioidun yritystuloksen perusteella ennakkoveroerinä OmaVerossa.' },
        { q: 'Miten ennakkovero lasketaan?', a: 'Arvioidun verovuoden tuloksen perusteella. Aloittava yrittäjä antaa arvion itse, ja jatkossa Verohallinto hyödyntää aiempien vuosien tietoja.' },
        { q: 'Mitä jos tulot muuttuvat kesken vuoden?', a: 'Muuta ennakkoveroa OmaVerossa, jotta vältät jäännösveron tai liian suuret maksut.' },
        { q: 'Mitä jos maksoin liian vähän ennakkoa?', a: 'Syntyy jäännösvero, jolle lasketaan korkoa. Voit maksaa lisäennakon ajoissa tilikauden jälkeen korkojen välttämiseksi.' },
      ],
    },
    ru: {
      title: 'Авансовый налог (ennakkovero): как предприниматель платит налог заранее (2026)',
      description:
        'Что такое авансовый налог и как он считается? Как платить налог заранее, менять аванс и избежать доплаты (jäännösvero) и процентов.',
      lead: 'Предприниматель платит подоходный налог в основном заранее, по расчётной прибыли. Объясняем, как определяется авансовый налог, как его менять и как избежать доплаты.',
      body: [
        { t: 'h2', x: 'Что такое авансовый налог?' },
        { t: 'p', x: 'Авансовый налог — это подоходный налог, который вы платите заранее в течение года по расчётной прибыли бизнеса. Налог платится частями в OmaVero. У toiminimi прибыль облагается как личный доход, у osakeyhtiö — корпоративным налогом.' },
        { t: 'h2', x: 'Как определяется авансовый налог?' },
        { t: 'p', x: 'Авансовый налог основан на оценке прибыли налогового года. Начинающий предприниматель даёт оценку сам; в дальнейшем налоговая использует данные прошлых лет. Количество частей зависит от размера налога.' },
        { t: 'h2', x: 'Меняйте аванс, если доходы меняются' },
        { t: 'p', x: 'Если прибыль растёт или падает в течение года, измените авансовый налог в OmaVero. Слишком малый аванс ведёт к доплате и процентам; слишком большой зря замораживает деньги.' },
        { t: 'note', x: 'Проценты и сроки уплаты подтверждаются ежегодно. Уточняйте актуальные данные в OmaVero или у бухгалтера. Источник: vero.fi (2026).' },
        { t: 'h2', x: 'Дополнительный аванс и доплата' },
        { t: 'p', x: 'Если прибыль оказалась больше расчётной, недостающую часть можно заплатить как дополнительный аванс (lisäennakko). Заплатив его вовремя после окончания отчётного года, вы избежите или уменьшите проценты. Если налог остаётся неуплаченным, возникает доплата (jäännösvero), на которую начисляются проценты.' },
        { t: 'h2', x: 'Помощь с авансовым налогом' },
        { t: 'p', x: 'Помогаем реалистично оценить вашу прибыль и держать авансовый налог в актуальном состоянии, чтобы избежать неприятных сюрпризов — на вашем языке. Свою ситуацию вы видите в личном кабинете Vaavo.' },
      ],
      faq: [
        { q: 'Что такое авансовый налог?', a: 'Подоходный налог, который вы платите заранее по расчётной прибыли бизнеса частями в OmaVero.' },
        { q: 'Как считается авансовый налог?', a: 'По оценке прибыли налогового года. Начинающий предприниматель даёт оценку сам, далее налоговая использует данные прошлых лет.' },
        { q: 'Что если доходы меняются в течение года?', a: 'Измените авансовый налог в OmaVero, чтобы избежать доплаты или слишком больших платежей.' },
        { q: 'Что если я заплатил слишком мало аванса?', a: 'Возникает доплата (jäännösvero) с процентами. Чтобы избежать процентов, можно вовремя заплатить дополнительный аванс после окончания года.' },
      ],
    },
    en: {
      title: 'Prepaid tax (ennakkovero): how an entrepreneur pays tax in advance (2026)',
      description:
        'What is prepaid tax and how is it calculated? How to pay your tax in advance, adjust the prepayment, and avoid a back tax and interest.',
      lead: 'An entrepreneur pays their income tax mostly in advance, based on estimated profit. We explain how prepaid tax is determined, how to adjust it, and how to avoid a back tax.',
      body: [
        { t: 'h2', x: 'What is prepaid tax?' },
        { t: 'p', x: 'Prepaid tax (ennakkovero) is income tax you pay in advance during the tax year based on your estimated business profit. The tax is paid in instalments via OmaVero. For a toiminimi the profit is taxed as personal income; for a limited company as corporate tax.' },
        { t: 'h2', x: 'How is prepaid tax determined?' },
        { t: 'p', x: 'Prepaid tax is based on an estimate of the tax year’s profit. A new entrepreneur gives the estimate themselves; later the Tax Administration uses prior-year data. The number of instalments depends on the size of the tax.' },
        { t: 'h2', x: 'Adjust the prepayment if your income changes' },
        { t: 'p', x: 'If your profit rises or falls during the year, adjust the prepaid tax in OmaVero. Too low a prepayment leads to a back tax and interest; too high needlessly ties up your money.' },
        { t: 'note', x: 'Interest rates and due dates are set yearly. Confirm the current details in OmaVero or with an accountant. Source: vero.fi (2026).' },
        { t: 'h2', x: 'Additional prepayment and back tax' },
        { t: 'p', x: 'If your profit was higher than estimated, you can pay the missing part as an additional prepayment (lisäennakko). By paying it in time after the financial year ends, you avoid or reduce the interest. If tax remains unpaid, a back tax (jäännösvero) arises, on which interest is charged.' },
        { t: 'h2', x: 'Help with prepaid tax' },
        { t: 'p', x: 'We help you estimate your profit realistically and keep the prepaid tax up to date, so you avoid unpleasant surprises — in your language. You can follow your situation in the Vaavo client portal.' },
      ],
      faq: [
        { q: 'What is prepaid tax?', a: 'Income tax you pay in advance based on your estimated business profit, in instalments via OmaVero.' },
        { q: 'How is prepaid tax calculated?', a: 'Based on an estimate of the tax year’s profit. A new entrepreneur gives the estimate themselves, and later the Tax Administration uses prior-year data.' },
        { q: 'What if my income changes during the year?', a: 'Adjust the prepaid tax in OmaVero to avoid a back tax or over-paying.' },
        { q: 'What if I paid too little prepayment?', a: 'A back tax (jäännösvero) arises with interest. To avoid the interest, you can pay an additional prepayment in time after the year ends.' },
      ],
    },
    et: {
      title: 'Ettemaks (ennakkovero): kuidas ettevõtja maksab maksu ette (2026)',
      description:
        'Mis on ettemaks ja kuidas seda arvutatakse? Kuidas maksta maksu ette, muuta ettemaksu ja vältida juurdemaksu (jäännösvero) ning intresse.',
      lead: 'Ettevõtja maksab oma tulumaksu peamiselt ette, hinnangulise kasumi alusel. Selgitame, kuidas ettemaks määratakse, kuidas seda muuta ja kuidas vältida juurdemaksu.',
      body: [
        { t: 'h2', x: 'Mis on ettemaks?' },
        { t: 'p', x: 'Ettemaks (ennakkovero) on tulumaks, mille maksad ette maksuaasta jooksul hinnangulise ärikasumi alusel. Maks makstakse osamaksetena OmaVeros. Toiminimi’l maksustatakse kasum isikliku tuluna ja osaühingul ettevõtte tulumaksuna.' },
        { t: 'h2', x: 'Kuidas ettemaks määratakse?' },
        { t: 'p', x: 'Ettemaks põhineb maksuaasta kasumi hinnangul. Alustav ettevõtja annab hinnangu ise; edaspidi kasutab maksuamet varasemate aastate andmeid. Osamaksete arv sõltub maksu suurusest.' },
        { t: 'h2', x: 'Muuda ettemaksu, kui tulud muutuvad' },
        { t: 'p', x: 'Kui su kasum kasvab või väheneb aasta jooksul, muuda ettemaksu OmaVeros. Liiga väike ettemaks toob juurdemaksu ja intressi; liiga suur seob raha asjata.' },
        { t: 'note', x: 'Intressid ja maksetähtajad kinnitatakse igal aastal. Kontrolli ajakohaseid andmeid OmaVeros või raamatupidajalt. Allikas: vero.fi (2026).' },
        { t: 'h2', x: 'Lisaettemaks ja juurdemaks' },
        { t: 'p', x: 'Kui kasum oli hinnangust suurem, saad puuduva osa maksta lisaettemaksuna (lisäennakko). Makstes selle õigel ajal pärast majandusaasta lõppu, väldid või vähendad intressi. Kui maks jääb maksmata, tekib juurdemaks (jäännösvero), millelt arvestatakse intressi.' },
        { t: 'h2', x: 'Abi ettemaksuga' },
        { t: 'p', x: 'Aitame su kasumit realistlikult hinnata ja hoida ettemaksu ajakohasena, et väldiksid ebameeldivaid üllatusi — sinu keeles. Oma olukorda näed Vaavo kliendiportaalis.' },
      ],
      faq: [
        { q: 'Mis on ettemaks?', a: 'Tulumaks, mille maksad ette hinnangulise ärikasumi alusel osamaksetena OmaVeros.' },
        { q: 'Kuidas ettemaksu arvutatakse?', a: 'Maksuaasta kasumi hinnangu alusel. Alustav ettevõtja annab hinnangu ise, edaspidi kasutab maksuamet varasemate aastate andmeid.' },
        { q: 'Mis siis, kui tulud aasta jooksul muutuvad?', a: 'Muuda ettemaksu OmaVeros, et vältida juurdemaksu või liiga suuri makseid.' },
        { q: 'Mis siis, kui maksin liiga vähe ettemaksu?', a: 'Tekib juurdemaks (jäännösvero) intressiga. Intressi vältimiseks saad maksta lisaettemaksu õigel ajal pärast aasta lõppu.' },
      ],
    },
    uk: {
      title: 'Авансовий податок (ennakkovero): як підприємець платить податок заздалегідь (2026)',
      description:
        'Що таке авансовий податок і як він рахується? Як платити податок заздалегідь, змінювати аванс і уникнути доплати (jäännösvero) та відсотків.',
      lead: 'Підприємець платить прибутковий податок переважно заздалегідь, за розрахунковим прибутком. Пояснюємо, як визначається авансовий податок, як його змінювати і як уникнути доплати.',
      body: [
        { t: 'h2', x: 'Що таке авансовий податок?' },
        { t: 'p', x: 'Авансовий податок (ennakkovero) — це прибутковий податок, який ви платите заздалегідь протягом року за розрахунковим прибутком бізнесу. Податок сплачується частинами в OmaVero. У toiminimi прибуток оподатковується як особистий дохід, у osakeyhtiö — корпоративним податком.' },
        { t: 'h2', x: 'Як визначається авансовий податок?' },
        { t: 'p', x: 'Авансовий податок ґрунтується на оцінці прибутку податкового року. Початківець дає оцінку сам; надалі податкова використовує дані попередніх років. Кількість частин залежить від розміру податку.' },
        { t: 'h2', x: 'Змінюйте аванс, якщо доходи змінюються' },
        { t: 'p', x: 'Якщо ваш прибуток зростає або падає протягом року, змініть авансовий податок в OmaVero. Замалий аванс веде до доплати й відсотків; завеликий — даремно заморожує гроші.' },
        { t: 'note', x: 'Відсотки та терміни сплати підтверджуються щороку. Уточнюйте актуальні дані в OmaVero або в бухгалтера. Джерело: vero.fi (2026).' },
        { t: 'h2', x: 'Додатковий аванс і доплата' },
        { t: 'p', x: 'Якщо прибуток виявився більшим за розрахунковий, відсутню частину можна сплатити як додатковий аванс (lisäennakko). Сплативши його вчасно після завершення звітного року, ви уникнете або зменшите відсотки. Якщо податок залишається несплаченим, виникає доплата (jäännösvero), на яку нараховуються відсотки.' },
        { t: 'h2', x: 'Допомога з авансовим податком' },
        { t: 'p', x: 'Допомагаємо реалістично оцінити ваш прибуток і тримати авансовий податок в актуальному стані, щоб уникнути неприємних сюрпризів — вашою мовою. Свою ситуацію ви бачите в особистому кабінеті Vaavo.' },
      ],
      faq: [
        { q: 'Що таке авансовий податок?', a: 'Прибутковий податок, який ви платите заздалегідь за розрахунковим прибутком бізнесу частинами в OmaVero.' },
        { q: 'Як рахується авансовий податок?', a: 'За оцінкою прибутку податкового року. Початківець дає оцінку сам, далі податкова використовує дані попередніх років.' },
        { q: 'Що, якщо доходи змінюються протягом року?', a: 'Змініть авансовий податок в OmaVero, щоб уникнути доплати або надто великих платежів.' },
        { q: 'Що, якщо я сплатив замало авансу?', a: 'Виникає доплата (jäännösvero) з відсотками. Щоб уникнути відсотків, можна вчасно сплатити додатковий аванс після завершення року.' },
      ],
    },
  },
};
