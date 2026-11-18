import type { Guide } from './types';

// Q&A page: "How do I correct or cancel an invoice I already sent?" Facts verified 18 Nov 2026, verbatim:
// - Vero, syventävä ohje Laskutusvaatimukset arvonlisäverotuksessa (VH/3634/00.01.00/2023, antopäivä 1.9.2023,
//   voimassa toistaiseksi; banner: 14 % → 13,5 % from 1.1.2026 not yet updated in the text):
//   5.1 pakolliset merkinnät (AVL 209 e §) incl. "laskun antamispäivä", "juokseva tunniste", "myyjän
//   arvonlisäverotunniste", "myyjän ja ostajan nimi ja osoite", "veron peruste verokannoittain",
//   "verokanta", "suoritettavan veron määrä", "viittaus aikaisempaan laskuun, kun kyse on muutoslaskusta";
//   5.1.2 "järjestelmällisen sarjan perusteella voidaan todeta mahdollinen puuttuva lasku. Samana tilikautena
//   annetuissa laskuissa ei saa olla samaa tunnistetta. Verovelvollinen saa käyttää eri tunnistesarjoja";
//   5.1.18 "Jos alkuperäistä laskua muutetaan siten, että annetaan uusi lasku, uudessa laskussa on viitattava
//   aiemmin annettuun laskuun. Viittausvaatimus koskee kaikkia tilanteita, joissa laskua muutetaan ...
//   Viittauksessa voidaan käyttää laskun tunnistetta"; for etämyynti, yhteisömyynti and cross-border reverse
//   charge "tässä muutoslaskussa on oltava kaikki tiedot. Tässä tapauksessa ei riitä, että viitataan aiempaan
//   laskuun"; kevennetyt merkinnät "kun laskun loppusumma on enintään 400 euroa" and in retail, content incl.
//   "muutoslaskuissa viittaus alkuperäiseen laskuun sekä ne tiedot, joita laskulla muutetaan";
//   8.2 "Jos lasku on virheellinen, ostajan on pyydettävä myyjältä uusi lasku"; "Myyjän täytyy antaa
//   virheellisen laskun tilalle uusi lasku, jossa on viittaus alkuperäiseen laskuun"; a typo in the seller's
//   name or an incomplete name/address does not remove the deduction "koska näissä tapauksissa Y-tunnus
//   yksilöi myyjän"; "Jos esimerkiksi yksikköhinnassa on virhe, mutta laskun loppusumma on oikein,
//   ostajalla on vähennysoikeus. Tällaisessa tilanteessa ostajan ei tarvitse pyytää myyjältä korjattua laskua."
// - Vero, syventävä ohje Arvonlisäverovelvollisen opas (VH/6955/00.01.00/2025, antopäivä 1.1.2026): 9.2.1
//   "Myyjä saa vähentää veron perusteesta ostajalle annetun ... osto- ja myyntihyvityksen"; Esimerkki 78:
//   376,50 € (300 + 76,50), credit 100 € "sisältää arvonlisäveroa 20,32 euroa, joten hyvityksen veron peruste
//   on 79,68 euroa", new VAT "56,18 euroa (= 220,32 x 25,5 %)"; "myös arvonlisäverovelvollisen ostajan on
//   oikaistava tekemäänsä arvonlisäverovähennystä vastaavasti".
// - Worked example (own arithmetic): 1 000,00 € + 25,5 % = 255,00 € → 1 255,00 €.
const VERO = 'https://www.vero.fi';

const SRC = {
  invoicing: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48090/laskutusvaatimukset-arvonlisaverotuksessa3/`,
  invoicingEn: `${VERO}/en/detailed-guidance/guidance/48090/vat-invoice-requirements/`,
  vatGuide: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/335806/arvonlis%C3%A4verovelvollisen-opas/`,
  avl: 'https://www.finlex.fi/fi/lainsaadanto/1993/1501',
};

export const laskunKorjaaminenHyvityslasku: Guide = {
  slug: 'laskun-korjaaminen-hyvityslasku',
  datePublished: '2026-11-18',
  dateModified: '2026-11-18',
  content: {
    ru: {
      title: 'Как исправить или аннулировать уже отправленный счёт',
      description: 'Отправленный счёт не удаляют: выставляют кредит-ноту (hyvityslasku) со ссылкой на исходный счёт. Что в ней указать, если счёт уже оплачен и если ошибка только в тексте.',
      lead: 'Отправленный счёт не удаляют и не меняют задним числом: выставляют кредит-ноту (hyvityslasku), которая ссылается на исходный счёт, и при необходимости новый правильный счёт. Любой документ, который меняет счёт, по правилам ALV должен однозначно ссылаться на исходный — обычно по его номеру.',
      body: [
        { t: 'h2', x: 'Почему нельзя просто удалить счёт' },
        { t: 'p', x: 'У счетов сквозная нумерация: по ней видно, не пропал ли какой-то счёт, и в одном финансовом году номер нельзя использовать дважды. Покупатель мог уже провести счёт у себя. Поэтому ошибочный счёт остаётся в учёте, а отменяют его кредит-нотой.' },
        { t: 'h2', x: 'Что указать в кредит-ноте' },
        { t: 'ul', items: [
          'дату и собственный номер (можно в отдельной серии номеров);',
          'ссылку на исходный счёт, например «Hyvitys laskusta 105»;',
          'имена и адреса продавца и покупателя, Y-tunnus продавца;',
          'что отменяется или возвращается, сумму без ALV по каждой ставке, ставку и сумму ALV.',
        ] },
        { t: 'p', x: 'При продаже в другую страну ЕС или с обратным начислением (käännetty verovelvollisuus) в исправляющем документе должны быть все обязательные реквизиты счёта, одной ссылки мало. Для счетов до 400 € и розничной торговли хватает упрощённого документа: дата, продавец и его Y-tunnus, что продано, сумма ALV, ссылка на исходный счёт и что именно меняется.' },
        { t: 'h2', x: 'Если счёт уже оплачен' },
        { t: 'p', x: 'Кредит-нота меняет только учёт: у продавца уменьшаются продажи и ALV, а покупатель, если он плательщик ALV, уменьшает свой вычет на ту же сумму. Деньги сами не возвращаются: их нужно перевести покупателю или по договорённости зачесть в следующий счёт. Если счёт ещё не оплачен, сообщите покупателю, что платить его не нужно.' },
        { t: 'h2', x: 'Если ошибка только в тексте' },
        { t: 'p', x: 'Если сумма верна, а ошибка, например, в адресе или описании работ, продавец выставляет исправленный счёт со ссылкой на исходный; вторая продажа при этом не проводится. Опечатка в названии продавца или неполный адрес сами по себе не лишают покупателя вычета ALV: продавца определяет Y-tunnus. Если неверна цена за единицу, но итог правильный, новый счёт покупателю тоже не нужен.' },
        { t: 'h2', x: 'Примеры' },
        { t: 'p', x: 'Счёт № 105 на 1 255,00 € (1 000,00 € + ALV 25,5 % 255,00 €) ушёл не той фирме. Выставляем кредит-ноту № 112 «Hyvitys laskusta 105»: −1 000,00 €, ALV −255,00 €, итого −1 255,00 €. Затем — новый счёт № 113 правильному покупателю. Если первая фирма уже заплатила, возвращаем ей 1 255,00 € переводом.' },
        { t: 'p', x: 'Пример налоговой: работа стоила 376,50 € (300 € + ALV 76,50 €), после жалобы клиенту вернули 100 €. В этих 100 € ALV 20,32 €, база 79,68 €. Новая база — 220,32 €, ALV с продажи — 56,18 € вместо 76,50 €.' },
        { t: 'links', items: [
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa', href: SRC.invoicing },
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026), 9.2', href: SRC.vatGuide },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Вопросы о счетах — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском, и проверяет, как кредит-нота попала в учёт и в отчёт по ALV.' },
      ],
      faq: [
        { q: 'Нужна ли кредит-нота, если сумма не меняется?', a: 'Обычно нет: достаточно исправленного счёта со ссылкой на исходный. Кредит-нота нужна, когда счёт отменяется или сумма уменьшается.' },
        { q: 'Возвращает ли кредит-нота деньги покупателю?', a: 'Нет. Она меняет учёт и ALV. Деньги переводят отдельно или по договорённости зачитывают в следующий счёт.' },
        { q: 'Что делает покупатель с кредит-нотой?', a: 'Если он плательщик ALV, он уменьшает свой вычет ALV на ту же сумму, что указана в кредит-ноте.' },
      ],
    },
    fi: {
      title: 'Miten lähetetty lasku korjataan tai mitätöidään? Hyvityslasku',
      description: 'Lähetettyä laskua ei poisteta, vaan annetaan hyvityslasku, joka viittaa alkuperäiseen laskuun. Mitä siihen merkitään, jos lasku on jo maksettu tai virhe on vain tekstissä.',
      lead: 'Lähetettyä laskua ei poisteta eikä muuteta jälkikäteen, vaan annetaan hyvityslasku, joka viittaa alkuperäiseen laskuun, ja tarvittaessa uusi oikea lasku. Arvonlisäverotuksessa jokaisen laskua muuttavan asiakirjan on viitattava alkuperäiseen laskuun yksiselitteisesti, tavallisesti laskunumerolla.',
      body: [
        { t: 'h2', x: 'Miksi laskua ei voi vain poistaa' },
        { t: 'p', x: 'Laskuilla on juokseva tunniste: sarjasta näkee, puuttuuko jokin lasku, eikä samana tilikautena saa käyttää samaa tunnistetta kahdesti. Ostaja on ehkä jo kirjannut laskun. Siksi virheellinen lasku jää kirjanpitoon, ja se kumotaan hyvityslaskulla.' },
        { t: 'h2', x: 'Mitä hyvityslaskuun merkitään' },
        { t: 'ul', items: [
          'antamispäivä ja oma tunniste (hyvityslaskuille voi käyttää omaa sarjaa);',
          'viittaus alkuperäiseen laskuun, esimerkiksi ”Hyvitys laskusta 105”;',
          'myyjän ja ostajan nimi ja osoite sekä myyjän Y-tunnus;',
          'mitä hyvitetään, veron peruste verokannoittain, verokanta ja veron määrä.',
        ] },
        { t: 'p', x: 'Yhteisömyynnissä, etämyynnissä ja rajat ylittävässä käännetyn verovelvollisuuden myynnissä muutoslaskussa on oltava kaikki laskumerkinnät; pelkkä viittaus ei riitä. Enintään 400 euron laskuissa ja vähittäiskaupassa riittävät kevennetyt merkinnät: päiväys, myyjä ja Y-tunnus, mitä myytiin, veron määrä sekä viittaus alkuperäiseen laskuun ja muutettavat tiedot.' },
        { t: 'h2', x: 'Jos lasku on jo maksettu' },
        { t: 'p', x: 'Hyvityslasku muuttaa vain kirjanpitoa: myyjän myynti ja arvonlisävero pienenevät, ja arvonlisäverovelvollinen ostaja oikaisee vähennystään saman verran. Raha ei palaudu itsestään, vaan se maksetaan ostajalle tai sovitusti vähennetään seuraavasta laskusta. Jos laskua ei ole maksettu, kerro ostajalle, ettei sitä tarvitse maksaa.' },
        { t: 'h2', x: 'Jos virhe on vain tekstissä' },
        { t: 'p', x: 'Jos summa on oikein mutta virhe on esimerkiksi osoitteessa tai työn kuvauksessa, myyjä antaa korjatun laskun, joka viittaa alkuperäiseen; myyntiä ei kirjata toista kertaa. Myyjän nimen kirjoitusvirhe tai puutteellinen osoite ei yksinään poista ostajan vähennysoikeutta, koska Y-tunnus yksilöi myyjän. Jos yksikköhinnassa on virhe mutta loppusumma on oikein, ostajan ei tarvitse pyytää uutta laskua.' },
        { t: 'h2', x: 'Esimerkit' },
        { t: 'p', x: 'Lasku 105, 1 255,00 € (1 000,00 € + ALV 25,5 % 255,00 €), meni väärälle yritykselle. Annetaan hyvityslasku 112 ”Hyvitys laskusta 105”: −1 000,00 €, ALV −255,00 €, yhteensä −1 255,00 €, ja sen jälkeen uusi lasku 113 oikealle ostajalle. Jos väärä yritys ehti maksaa, sille palautetaan 1 255,00 €.' },
        { t: 'p', x: 'Verohallinnon esimerkki: verhoilutyö maksoi 376,50 € (300 € + ALV 76,50 €), ja reklamaation vuoksi asiakkaalle hyvitettiin 100 €. Hyvitys sisältää arvonlisäveroa 20,32 €, joten veron peruste on 79,68 €. Oikaistu peruste on 220,32 € ja vero 56,18 € alkuperäisen 76,50 €:n sijaan.' },
        { t: 'links', items: [
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa', href: SRC.invoicing },
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026), luku 9.2', href: SRC.vatGuide },
          { label: 'Finlex: Arvonlisäverolaki 1501/1993', href: SRC.avl },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi, ja kirjanpitäjä tarkistaa, että hyvitys menee oikein kirjanpitoon ja arvonlisäveroilmoitukselle.' },
      ],
      faq: [
        { q: 'Tarvitaanko hyvityslasku, jos summa ei muutu?', a: 'Yleensä ei: riittää korjattu lasku, joka viittaa alkuperäiseen. Hyvityslasku tarvitaan, kun lasku perutaan tai summa pienenee.' },
        { q: 'Palauttaako hyvityslasku rahat?', a: 'Ei. Se muuttaa kirjanpitoa ja arvonlisäveroa. Raha maksetaan erikseen tai vähennetään sovitusti seuraavasta laskusta.' },
        { q: 'Mitä ostaja tekee hyvityslaskulla?', a: 'Arvonlisäverovelvollinen ostaja oikaisee arvonlisäverovähennystään hyvityslaskun mukaisella määrällä.' },
      ],
    },
    en: {
      title: 'How to correct or cancel an invoice you already sent (credit note)',
      description: 'A sent invoice is not deleted: you issue a credit note (hyvityslasku) referring to the original. What to include, and what if the invoice has already been paid.',
      lead: 'A sent invoice is not deleted or edited afterwards. You issue a credit note (hyvityslasku) that refers to the original invoice and, if needed, a new correct invoice. Under Finnish VAT rules every document that changes an invoice must refer to the original unambiguously, usually by its number.',
      body: [
        { t: 'ul', items: [
          'Invoices carry a sequential number; the same number may not be used twice in one financial year.',
          'Credit note: date, own number, reference to the original invoice, names and addresses, seller’s business ID, what is credited, tax base per rate, VAT rate and amount.',
          'For intra-EU and cross-border reverse-charge sales the correcting invoice must contain all invoice details; a reference alone is not enough.',
          'A credit note does not move money: refund the buyer separately or offset it against the next invoice. A VAT-registered buyer reduces its VAT deduction accordingly.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: VAT invoice requirements', href: SRC.invoicingEn },
          { label: 'Vero: Arvonlisäverovelvollisen opas (2026)', href: SRC.vatGuide },
        ] },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'Does a credit note refund the money?', a: 'No. It changes the books and VAT; the refund is a separate payment or an agreed offset against the next invoice.' },
      ],
    },
    et: {
      title: 'Kuidas parandada või tühistada juba saadetud arvet (kreeditarve)',
      description: 'Saadetud arvet ei kustutata: koostatakse kreeditarve (hyvityslasku), mis viitab algsele arvele. Mida sinna märkida ja mis siis, kui arve on juba makstud.',
      lead: 'Saadetud arvet ei kustutata ega muudeta tagantjärele. Koostatakse kreeditarve (hyvityslasku), mis viitab algsele arvele, ja vajaduse korral uus õige arve. Iga arvet muutev dokument peab viitama algsele arvele üheselt, tavaliselt arve numbriga.',
      body: [
        { t: 'ul', items: [
          'Kreeditarvele: kuupäev, oma number, viide algsele arvele, poolte nimed ja aadressid, müüja Y-tunnus, mida krediteeritakse, maksustatav summa, käibemaksumäär ja -summa.',
          'Kreeditarve ei kanna raha üle: raha tagastatakse eraldi või tasaarveldatakse kokkuleppel järgmise arvega.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa', href: SRC.invoicing },
        ] },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kas kreeditarve tagastab raha?', a: 'Ei. See muudab raamatupidamist ja käibemaksu; raha tagastatakse eraldi.' },
      ],
    },
    uk: {
      title: 'Як виправити або анулювати вже надісланий рахунок',
      description: 'Надісланий рахунок не видаляють: виставляють кредит-ноту (hyvityslasku) з посиланням на початковий рахунок. Що в ній вказати і що робити, якщо рахунок уже оплачено.',
      lead: 'Надісланий рахунок не видаляють і не змінюють заднім числом: виставляють кредит-ноту (hyvityslasku), яка посилається на початковий рахунок, і за потреби новий правильний рахунок. Кожен документ, що змінює рахунок, має однозначно посилатися на початковий — зазвичай за його номером.',
      body: [
        { t: 'ul', items: [
          'У кредит-ноті: дата, власний номер, посилання на початковий рахунок, назви й адреси сторін, Y-tunnus продавця, що повертається, сума без ALV, ставка та сума ALV.',
          'Кредит-нота не повертає гроші: їх переказують окремо або за домовленістю зараховують у наступний рахунок.',
        ] },
        { t: 'links', items: [
          { label: 'Vero: Laskutusvaatimukset arvonlisäverotuksessa', href: SRC.invoicing },
        ] },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською.' },
      ],
      faq: [
        { q: 'Чи повертає кредит-нота гроші?', a: 'Ні. Вона змінює облік і ALV, а гроші переказують окремо.' },
      ],
    },
  },
};
