import type { Guide } from './types';

// Q&A page: "The price includes 13,5 % VAT — what is the amount without VAT?" Facts verified 18 Nov 2026:
// - Vero, syventävä ohje Arvonlisäverovelvollisen opas (VH/6955/00.01.00/2025, antopäivä 1.1.2026):
//   5.1 "Arvonlisäveron yleinen verokanta on 25,5 prosenttia", "sovellettu 1.9.2024 alkaen"; 5.2 alennettu
//   13,5 % for "Elintarvikkeiden, ravintola- ja ateriapalvelujen, rehujen ja rehuaineiden,
//   henkilökuljetusten, majoituspalvelujen, liikuntapalvelujen, erilaisiin tilaisuuksiin pääsyjen,
//   lääkkeiden ... kirjojen" etc.; "Alennettu verokanta ei sovellu alkoholijuomiin tai tupakkavalmisteisiin";
//   e.g. majoitus "13,5 prosenttia 1.1.2026 alkaen ja 14 prosenttia 1.1.2025 alkaen"; 5.3 "Alennettua 10
//   prosentin verokantaa sovelletaan vain sanoma- ja aikakauslehtien myyntiin"; Esimerkki 45 (rate change
//   1.9.2024): "Arvonlisäverokanta määräytyy auton toimitusajankohdan perusteella ... Merkitystä ei ole
//   sillä, milloin auto on tilattu"; Esimerkki 78: 100 € credit at 25,5 % "sisältää arvonlisäveroa 20,32
//   euroa".
// - Vero, syventävä ohje Laskutusvaatimukset arvonlisäverotuksessa (VH/3634/00.01.00/2023): "Veron määrä
//   ilmoitetaan kahden desimaalin tarkkuudella. Matemaattisen pyöristyssäännön mukaan ... korotetaan yhdellä,
//   jos ensimmäinen pois jäävä numero on 5 tai sitä suurempi numero. Pyöristys tehdään laskun loppusummasta."
//   Kevennetyt merkinnät (≤ 400 € or retail): "on mahdollista ilmoittaa hinnat arvonlisäverollisina, jos
//   suoritettavan veron määrä on merkitty laskuun. Veron perustetta ei tarvitse ilmoittaa."
// - Arithmetic (own, Decimal ROUND_HALF_UP): 100/1,255 = 79,68; 100/1,135 = 88,11; 100/1,14 = 87,72;
//   100/1,10 = 90,91. 24,00/1,135 = 21,145… → 21,15; 21,15 × 1,135 = 24,005… → 24,01; 24,00 × 13,5/113,5 =
//   2,854… → 2,85. Three lines of 1,00 € at 13,5 %: per line 0,135 → 0,14 (× 3 = 0,42), on the total
//   0,405 → 0,41.
const VERO = 'https://www.vero.fi';

const SRC = {
  vatGuide: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/335806/arvonlis%C3%A4verovelvollisen-opas/`,
  invoicing: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48090/laskutusvaatimukset-arvonlisaverotuksessa3/`,
  invoicingEn: `${VERO}/en/detailed-guidance/guidance/48090/vat-invoice-requirements/`,
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
};

export const alvLaskeminenVerollisestaHinnasta: Guide = {
  slug: 'alv-laskeminen-verollisesta-hinnasta',
  datePublished: '2026-11-18',
  dateModified: '2026-11-18',
  content: {
    ru: {
      title: 'Цена с ALV 13,5 %: какую сумму без налога написать',
      description: 'Как посчитать сумму без ALV из цены с налогом: делим на 1,135, 1,255 или 1,10. Ставки 2026 года, откуда берётся лишний цент и как округлять по правилам Vero.',
      lead: 'Чтобы получить сумму без ALV, разделите цену с налогом на 1,135 при ставке 13,5 %, на 1,255 при 25,5 % или на 1,10 при 10 %. Например, 100,00 € с ALV 13,5 % — это 88,11 € без налога и 11,89 € налога.',
      body: [
        { t: 'h2', x: 'Ставки ALV в 2026 году' },
        { t: 'ul', items: [
          '25,5 % — общая ставка (с 1.9.2024).',
          '13,5 % — продукты питания, рестораны и общепит, перевозка пассажиров, размещение, спортивные услуги, билеты на мероприятия, лекарства, книги и некоторые другие. Не относится к алкоголю и табаку. С 1.1.2026 эта ставка заменила 14 %.',
          '10 % — только газеты и журналы.',
          '14 % ещё встречается в счетах за поставки 2025 года: ставку определяет дата поставки товара или оказания услуги, а не дата заказа или счёта.',
        ] },
        { t: 'h2', x: 'Формулы' },
        { t: 'ul', items: [
          '25,5 %: без налога = цена ÷ 1,255; налог = цена × 25,5 ÷ 125,5 (около 20,32 % цены).',
          '13,5 %: без налога = цена ÷ 1,135; налог = цена × 13,5 ÷ 113,5 (около 11,89 %).',
          '14 % (поставки до 2026 года): цена ÷ 1,14; налог около 12,28 % цены.',
          '10 %: цена ÷ 1,10; налог около 9,09 % цены.',
        ] },
        { t: 'p', x: 'Частая ошибка — отнять 13,5 % от цены: 100 € − 13,5 % = 86,50 €, а правильно 88,11 €. Налог начисляется на сумму без налога, поэтому его доля в цене меньше ставки.' },
        { t: 'h2', x: 'Откуда лишний цент' },
        { t: 'p', x: 'Налог указывают с точностью до цента по обычному правилу: 5 и больше округляют вверх. Вот как появляется лишний цент. Цена 24,00 € с ALV 13,5 %: 24,00 ÷ 1,135 = 21,145… → 21,15 €. Если программа затем прибавит налог к 21,15 €, получится 21,15 × 1,135 = 24,005… → 24,01 €, на цент больше договорённого.' },
        { t: 'p', x: 'Если цена договорена с налогом, считайте налог от неё: 24,00 × 13,5 ÷ 113,5 = 2,854… → 2,85 €, без налога 24,00 − 2,85 = 21,15 €, итог остаётся 24,00 €. В счетах до 400 € и в рознице можно указывать цены с налогом и сумму налога, без суммы без налога.' },
        { t: 'p', x: 'Второй источник расхождений — округление по строкам. По инструкции Vero налог округляют от итоговой суммы счёта, а не в каждой строке. Три строки по 1,00 € без налога при 13,5 %: если округлить налог в каждой строке, выйдет 3 × 0,14 = 0,42 €, а от итога 3,00 € — 0,41 €.' },
        { t: 'links', items: [
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026), luku 5 – verokannat', href: SRC.vatGuide },
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa (pyöristys)', href: SRC.invoicing },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Вопросы об ALV — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском: какая ставка у товара, как посчитать цену для счёта и почему не сходится цент.' },
      ],
      faq: [
        { q: 'Сколько налога в 100 € при ставке 13,5 %?', a: '11,89 €: 100 × 13,5 ÷ 113,5 = 11,894… → 11,89 €. Без налога — 88,11 €.' },
        { q: 'Какую ставку писать в счёте 2026 года за работу, сделанную в декабре 2025?', a: 'Ставку, которая действовала на дату поставки или оказания услуги. Для пониженной ставки это 14 %, а не 13,5 %.' },
        { q: 'Можно ли округлять налог в каждой строке счёта?', a: 'По инструкции Vero налог округляют от итоговой суммы счёта, до цента: 5 и больше вверх.' },
      ],
    },
    fi: {
      title: 'Hinta sisältää ALV 13,5 %: mikä on veroton hinta?',
      description: 'Veroton hinta verollisesta: jaa luvulla 1,135, 1,255 tai 1,10. Vuoden 2026 verokannat, mistä ylimääräinen sentti tulee ja miten vero pyöristetään Verohallinnon ohjeen mukaan.',
      lead: 'Veroton hinta saadaan jakamalla verollinen hinta luvulla 1,135, kun verokanta on 13,5 %, luvulla 1,255, kun kanta on 25,5 %, ja luvulla 1,10, kun kanta on 10 %. Esimerkiksi 100,00 € sisältäen ALV 13,5 % on 88,11 € veroton hinta ja 11,89 € arvonlisäveroa.',
      body: [
        { t: 'h2', x: 'Verokannat vuonna 2026' },
        { t: 'ul', items: [
          '25,5 % – yleinen verokanta (1.9.2024 alkaen).',
          '13,5 % – elintarvikkeet, ravintola- ja ateriapalvelut, henkilökuljetukset, majoitus, liikuntapalvelut, pääsyt tilaisuuksiin, lääkkeet, kirjat ja eräät muut. Ei koske alkoholijuomia eikä tupakkaa. Kanta laski 14 %:sta 1.1.2026.',
          '10 % – vain sanoma- ja aikakauslehdet.',
          '14 % näkyy yhä vuoden 2025 suoritusten laskuissa: verokanta määräytyy toimitus- tai suoritusajankohdan mukaan, ei tilauksen tai laskun päivän.',
        ] },
        { t: 'h2', x: 'Kaavat' },
        { t: 'ul', items: [
          '25,5 %: veroton = verollinen ÷ 1,255; vero = verollinen × 25,5 ÷ 125,5 (noin 20,32 % hinnasta).',
          '13,5 %: veroton = verollinen ÷ 1,135; vero = verollinen × 13,5 ÷ 113,5 (noin 11,89 %).',
          '14 % (ennen vuotta 2026 tehdyt suoritukset): ÷ 1,14; vero noin 12,28 % hinnasta.',
          '10 %: ÷ 1,10; vero noin 9,09 % hinnasta.',
        ] },
        { t: 'p', x: 'Yleinen virhe on vähentää 13,5 % hinnasta: 100 € − 13,5 % = 86,50 €, kun oikea veroton hinta on 88,11 €. Vero lasketaan verottomasta hinnasta, joten sen osuus verollisesta hinnasta on verokantaa pienempi.' },
        { t: 'h2', x: 'Mistä ylimääräinen sentti tulee' },
        { t: 'p', x: 'Veron määrä ilmoitetaan sentin tarkkuudella matemaattisen pyöristyksen mukaan: 5 tai enemmän pyöristetään ylöspäin. Hinta 24,00 € sisältäen ALV 13,5 %: 24,00 ÷ 1,135 = 21,145… → 21,15 €. Jos ohjelma lisää veron 21,15 euroon, tulos on 21,15 × 1,135 = 24,005… → 24,01 €, sentin sovittua enemmän.' },
        { t: 'p', x: 'Kun hinta on sovittu verollisena, laske vero siitä: 24,00 × 13,5 ÷ 113,5 = 2,854… → 2,85 €, veroton 24,00 − 2,85 = 21,15 €, ja loppusumma pysyy 24,00 eurona. Enintään 400 euron laskuissa ja vähittäiskaupassa hinnat voi ilmoittaa verollisina, kun veron määrä on merkitty laskuun.' },
        { t: 'p', x: 'Toinen eron syy on rivikohtainen pyöristys. Verohallinnon ohjeen mukaan pyöristys tehdään laskun loppusummasta. Kolme 1,00 euron veroton riviä 13,5 %:lla: riveittäin pyöristettynä vero on 3 × 0,14 = 0,42 €, loppusummasta 3,00 € laskettuna 0,41 €.' },
        { t: 'links', items: [
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026), luku 5 – verokannat', href: SRC.vatGuide },
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa (pyöristys)', href: SRC.invoicing },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi: mikä verokanta tuotteeseen kuuluu, miten laskun hinta lasketaan ja miksi sentti ei täsmää.' },
      ],
      faq: [
        { q: 'Paljonko arvonlisäveroa on 100 eurossa, kun kanta on 13,5 %?', a: '11,89 €: 100 × 13,5 ÷ 113,5 = 11,894… → 11,89 €. Veroton hinta on 88,11 €.' },
        { q: 'Mikä verokanta joulukuussa 2025 tehdystä työstä laskutetaan vuonna 2026?', a: 'Suoritusajankohtana voimassa ollut kanta. Alennetussa kannassa se on 14 %, ei 13,5 %.' },
        { q: 'Saako veron pyöristää riveittäin?', a: 'Verohallinnon ohjeen mukaan pyöristys tehdään laskun loppusummasta, sentin tarkkuudella: 5 tai enemmän ylöspäin.' },
      ],
    },
    en: {
      title: 'Price includes 13.5 % VAT: what is the amount without VAT?',
      description: 'Net price from a VAT-inclusive price in Finland: divide by 1.135, 1.255 or 1.10. 2026 VAT rates, where the extra cent comes from and how to round.',
      lead: 'To get the amount without VAT, divide the VAT-inclusive price by 1.135 at the 13.5 % rate, by 1.255 at 25.5 % or by 1.10 at 10 %. For example, €100.00 including 13.5 % VAT is €88.11 without VAT and €11.89 VAT.',
      body: [
        { t: 'ul', items: [
          '2026 rates: 25.5 % general; 13.5 % food, restaurants, passenger transport, accommodation, sports services, admissions, medicines, books (replaced 14 % on 1 Jan 2026); 10 % only newspapers and magazines.',
          'The rate is set by the date of supply, so supplies made in 2025 still carry 14 %.',
          'VAT = price × 13.5 ÷ 113.5 (about 11.89 % of the price). Subtracting 13.5 % from the price is wrong.',
          'VAT is stated to the cent, 5 and above rounded up, and rounding is done on the invoice total, not line by line.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: VAT invoice requirements', href: SRC.invoicingEn },
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026)', href: SRC.vatGuide },
        ] },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'How much VAT is in €100 at 13.5 %?', a: '€11.89 (100 × 13.5 ÷ 113.5); the net amount is €88.11.' },
      ],
    },
    et: {
      title: 'Hind sisaldab 13,5 % käibemaksu: milline on summa ilma maksuta?',
      description: 'Maksuta summa käibemaksuga hinnast Soomes: jaga 1,135, 1,255 või 1,10-ga. 2026. aasta määrad ja ümardamine.',
      lead: 'Maksuta summa saamiseks jaga käibemaksuga hind 13,5 % määra korral 1,135-ga, 25,5 % korral 1,255-ga ja 10 % korral 1,10-ga. Näiteks 100,00 € koos 13,5 % käibemaksuga on 88,11 € ilma maksuta ja 11,89 € käibemaksu.',
      body: [
        { t: 'ul', items: [
          '2026: 25,5 % üldmäär; 13,5 % toit, restoranid, sõitjatevedu, majutus, ravimid, raamatud jm (asendas 1.1.2026 määra 14 %); 10 % ainult ajalehed ja ajakirjad.',
          'Käibemaks märgitakse sendi täpsusega ja ümardatakse arve kogusummast, mitte rida-realt.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026)', href: SRC.vatGuide },
        ] },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kui palju käibemaksu on 100 eurost 13,5 % määra korral?', a: '11,89 € (100 × 13,5 ÷ 113,5); maksuta summa on 88,11 €.' },
      ],
    },
    uk: {
      title: 'Ціна з ALV 13,5 %: яку суму без податку написати',
      description: 'Як порахувати суму без ALV із ціни з податком у Фінляндії: ділимо на 1,135, 1,255 або 1,10. Ставки 2026 року та округлення.',
      lead: 'Щоб отримати суму без ALV, поділіть ціну з податком на 1,135 за ставки 13,5 %, на 1,255 за 25,5 % або на 1,10 за 10 %. Наприклад, 100,00 € з ALV 13,5 % — це 88,11 € без податку та 11,89 € податку.',
      body: [
        { t: 'ul', items: [
          '2026: 25,5 % — загальна ставка; 13,5 % — продукти, ресторани, перевезення пасажирів, проживання, ліки, книги тощо (з 1.1.2026 замінила 14 %); 10 % — лише газети й журнали.',
          'Податок указують до цента й округлюють від підсумку рахунку, а не в кожному рядку.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026)', href: SRC.vatGuide },
        ] },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською.' },
      ],
      faq: [
        { q: 'Скільки податку в 100 € за ставки 13,5 %?', a: '11,89 € (100 × 13,5 ÷ 113,5); без податку — 88,11 €.' },
      ],
    },
  },
};
