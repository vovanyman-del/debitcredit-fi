import type { Guide } from './types';

// Facts verified 21 Sep 2026 against vero.fi, verbatim (page update date in brackets):
// - Rates (arvonlisaveroprosentit, 1.1.2026): 25,5 %; 13,5 % — elintarvikkeet, ravintola- ja
//   ateriapalvelut, kirjat, lääkkeet, liikuntapalvelut, "pääsy kulttuuri-, viihde- ja
//   urheilutapahtumiin", henkilökuljetukset, majoitus ("Alennettu 14 % alv-kanta laski
//   13,5 %:iin"; "ei koske alkoholijuomien ja tupakkatuotteiden myyntiä eikä alkoholijuomien
//   tarjoilua"; music/video publications and computer games stay at 25,5 %); 10 % — only
//   "sanoma- ja aikakauslehdet"; "Nollaverokannan alainen myynti (0 %)".
// - Registration (rekisterointi, 18.5.2026): "Yrityksen ei tarvitse rekisteröityä
//   arvonlisäverovelvolliseksi, jos sekä kuluvan että edellisen kalenterivuoden liikevaihto on
//   enintään 20 000 euroa"; over the limit "rajan ylittämisajankohdasta alkaen". Leaving the
//   register: two consecutive calendar years at most 20 000 €, the current one by estimate —
//   vero.fi example 2024 22 000 € / 2025 18 000 € / 2026 estimated → "aikaisintaan
//   31.12.2025"; "Yritystä ei voida poistaa rekisteristä takautuvasti". The limit was 15 000 €
//   until the end of 2024 (vero.fi press release, 19.6.2024).
// - Tax period (verokauden-muutos, 5.12.2024): usually a calendar month; on application a
//   quarter if turnover is "alle 100 000 euroa", a quarter or a year if "alle 30 000 euroa";
//   "Verokauden on oltava sama vähintään vuoden ajan", but when the limit of the longer period
//   is exceeded the change must be notified "viipymättä".
// - Filing (ilmoitus-ja-maksuohjeet, 1.1.2026): a return for every period, even without
//   VAT-liable activity; due the 12th of the second month after the period; quarters
//   12.5./12.8./12.11./12.2.; a year: last day of February; a Saturday or pyhäpäivä moves the
//   date to the next weekday; "Ilmoituksen antamiseen ei voi saada lisäaikaa".
// - alarajahuojennus (15.4.2026): not for accounting periods starting 1.1.2025 or later;
//   earlier periods retroactively within three years (period 2024 → by 31.12.2027); a period
//   spanning 2024/2025 only for its 2024 months.
const VERO_FI = 'https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/arvonlisaverotus';
const VERO_EN = 'https://www.vero.fi/en/businesses-and-corporations/taxes-and-charges/vat';

const SRC = {
  ratesFi: `${VERO_FI}/arvonlisaveroprosentit/`,
  ratesEn: `${VERO_EN}/rates-of-vat/`,
  registerFi: `${VERO_FI}/rekisterointi/`,
  registerEn: `${VERO_EN}/how-to-register-for-vat/`,
  filingFi: `${VERO_FI}/ilmoitus-ja-maksuohjeet/`,
  filingEn: `${VERO_EN}/when-to-file-and-pay/`,
  periodFi: `${VERO_FI}/ilmoitus-ja-maksuohjeet/verokauden-muutos/`,
  periodEn: `${VERO_EN}/when-to-file-and-pay/tax-period/`,
  reliefFi: `${VERO_FI}/alarajahuojennus/`,
  reliefEn: `${VERO_EN}/vat-relief-scheme/`,
};

export const alvOpas: Guide = {
  slug: 'alv-opas',
  datePublished: '2026-06-21',
  dateModified: '2026-09-21',
  content: {
    fi: {
      title: 'ALV-opas yrittäjälle: arvonlisävero selkeästi (2026)',
      description:
        'Mikä on ALV ja milloin se on pakollinen? ALV-kannat 2026, 20 000 euron alaraja, vähennykset ja ilmoittaminen — selkeä opas yrittäjälle.',
      lead: 'Arvonlisävero (ALV) on kulutusvero, jonka yritys lisää myyntiinsä ja tilittää valtiolle. Käymme läpi ALV-kannat, milloin rekisteröinti on pakollinen ja miten ALV ilmoitetaan.',
      body: [
        { t: 'h2', x: 'Mikä on arvonlisävero?' },
        { t: 'p', x: 'ALV on kulutusvero: lisäät sen myyntihintoihisi, veloitat sen asiakkaalta ja tilität valtiolle. Ostoihisi sisältyvän ALV:n saat vähentää, joten maksat käytännössä vain myynnin ja ostojen ALV:n erotuksen.' },
        { t: 'h2', x: 'ALV-kannat 2026' },
        { t: 'ul', items: [
          '25,5 % — yleinen kanta (useimmat tavarat ja palvelut).',
          '13,5 % — mm. elintarvikkeet, ravintola- ja ateriapalvelut, kirjat, lääkkeet, henkilökuljetukset, majoitus, liikuntapalvelut sekä pääsy kulttuuri-, viihde- ja urheilutapahtumiin (laski 14 %:sta 1.1.2026; ei koske alkoholijuomia eikä tupakkaa).',
          '10 % — sanoma- ja aikakauslehdet.',
          '0 % — mm. EU:n ulkopuolinen vienti.',
        ] },
        { t: 'h2', x: 'Milloin ALV-rekisteröinti on pakollinen?' },
        { t: 'p', x: 'Yrityksen ei tarvitse rekisteröityä ALV-velvolliseksi, jos liikevaihto on enintään 20 000 € sekä kuluvana että edellisenä kalenterivuonna (raja nousi 15 000 eurosta 1.1.2025). Jos raja ylittyy kesken vuoden, yritys on ALV-velvollinen ylityshetkestä alkaen, joten rekisteröinti kannattaa tehdä hyvissä ajoin etukäteen. Rajan alapuolella voit rekisteröityä vapaaehtoisesti, jos toimintasi on liiketoimintaa eikä satunnaista tai harrastusluonteista myyntiä.' },
        { t: 'p', x: 'Liikevaihdon vähäisyyden vuoksi rekisteristä voi poistua vasta, kun liikevaihto on enintään 20 000 € kahtena peräkkäisenä kalenterivuonna (kuluvan vuoden osalta arvion perusteella) — ei siis heti sinä vuonna, jona liikevaihto laskee. Esimerkiksi jos liikevaihto oli 22 000 € vuonna 2024 ja 18 000 € vuonna 2025 ja arvioit, ettei myöskään vuoden 2026 liikevaihto ylitä 20 000 euroa, voit poistua rekisteristä aikaisintaan 31.12.2025. Rekisteristä ei poisteta takautuvasti.' },
        { t: 'note', x: 'Alarajahuojennus poistui 1.1.2025: sitä ei saa 1.1.2025 tai sen jälkeen alkavilta tilikausilta. Aiemmilta tilikausilta huojennusta voi vielä hakea takautuvasti kolmen vuoden kuluessa tilikauden päättymisestä, esimerkiksi tilikaudelta 1.1.–31.12.2024 viimeistään 31.12.2027. Vuodenvaihteen 2024/2025 ylittävältä tilikaudelta huojennusta voi hakea vain vuoden 2024 kuukausilta. Luvut on tarkistettu vero.fi:stä 21.9.2026; varmista oma tilanteesi kirjanpitäjältä.' },
        { t: 'h2', x: 'Kannattaako rekisteröityä vapaaehtoisesti?' },
        { t: 'p', x: 'Jos asiakkaasi ovat yrityksiä tai teet alkuvaiheessa isoja hankintoja, vapaaehtoinen rekisteröinti kannattaa usein: saat vähentää ostojesi ALV:n. Jos myyt suoraan kuluttajille, ALV nostaa hintojasi — punnitse hyödyt tapauskohtaisesti.' },
        { t: 'h2', x: 'Miten ALV ilmoitetaan?' },
        { t: 'p', x: 'ALV ilmoitetaan ja maksetaan OmaVerossa. Verokausi on yleensä kalenterikuukausi. Jos liikevaihto on pieni, voit hakea pidempää verokautta: neljännesvuotta, kun liikevaihto on alle 100 000 €, tai vuotta, kun se on alle 30 000 €. Verokauden on oltava sama vähintään vuoden ajan; jos pidemmän verokauden liikevaihtoraja kuitenkin ylittyy, ilmoita siitä Verohallintoon viipymättä. Ilmoitus annetaan jokaiselta verokaudelta, myös silloin, kun arvonlisäverollista toimintaa ei ole ollut.' },
        { t: 'p', x: 'Määräpäivä on yleensä kuukauden 12. päivä: kuukausikaudella toisen kuukauden 12. päivä verokauden päättymisen jälkeen (esimerkiksi maaliskuun ALV viimeistään 12.5.), neljännesvuosikaudella 12.5., 12.8., 12.11. ja 12.2. ja vuosikaudella seuraavan vuoden helmikuun viimeinen päivä. Jos määräpäivä on lauantai tai pyhäpäivä, se siirtyy seuraavaan arkipäivään. Ilmoituksen antamiseen ei voi saada lisäaikaa.' },
        { t: 'h2', x: 'Yleisimmät virheet' },
        { t: 'ul', items: [
          'Väärä verokanta (esim. ravintola-ateria tai kirja 25,5 %:lla 13,5 %:n sijaan).',
          'Vähennysten unohtaminen ostoista.',
          'Myöhästyneet ilmoitukset ja maksut (myöhästymismaksu ja korko).',
          'EU- ja ulkomaankaupan väärä käsittely (käännetty verovelvollisuus, OSS).',
        ] },
        { t: 'h2', x: 'Apua ALV-asioihin' },
        { t: 'p', x: 'Hoidamme ALV-ilmoitukset puolestasi ja neuvomme suomeksi tai venäjäksi oikeissa verokannoissa ja rekisteröinnissä. Näin vähennät virheiden ja myöhästymismaksujen riskiä.' },
        { t: 'h2', x: 'Viranomaislähteet' },
        { t: 'links', items: [
          { label: 'Verohallinto: arvonlisäveroprosentit', href: SRC.ratesFi },
          { label: 'Verohallinto: yrityksen arvonlisäverovelvollisuus ja alv-rekisteri', href: SRC.registerFi },
          { label: 'Verohallinto: näin ilmoitat arvonlisäveron (määräpäivät)', href: SRC.filingFi },
          { label: 'Verohallinto: arvonlisäveron verokausi ja sen muutokset', href: SRC.periodFi },
          { label: 'Verohallinto: arvonlisäveron alarajahuojennus', href: SRC.reliefFi },
        ] },
      ],
      faq: [
        { q: 'Pitääkö minun rekisteröityä ALV-velvolliseksi?', a: 'Kyllä, jos liikevaihto ylittää 20 000 € kuluvana tai edellisenä kalenterivuonna. Jos raja ylittyy kesken vuoden, ALV-velvollisuus alkaa ylityshetkestä. Jos liikevaihto on molempina vuosina enintään 20 000 €, rekisteröinti on vapaaehtoista.' },
        { q: 'Mikä ALV-kanta minua koskee?', a: 'Useimpia palveluita ja tavaroita koskee 25,5 %. Alennettuja kantoja sovelletaan mm. elintarvikkeisiin, ravintolapalveluihin, kirjoihin ja majoitukseen (13,5 %) sekä sanoma- ja aikakauslehtiin (10 %).' },
        { q: 'Kuinka usein ALV ilmoitetaan?', a: 'Yleensä kuukausittain, viimeistään verokautta seuraavan toisen kuukauden 12. päivänä. Neljännesvuoden verokautta voi hakea, jos liikevaihto on alle 100 000 €, ja vuoden verokautta, jos se on alle 30 000 €.' },
        { q: 'Voinko vähentää ostojen ALV:n?', a: 'Kyllä, kun olet ALV-rekisterissä ja ostot liittyvät verolliseen liiketoimintaan. Säilytä kuitit ja laskut.' },
      ],
    },
    ru: {
      title: 'ALV (НДС) в Финляндии: гид для предпринимателя (2026)',
      description:
        'Что такое ALV и когда он обязателен? Ставки ALV 2026, порог 20 000 €, вычеты и подача деклараций — понятный гид для предпринимателя.',
      lead: 'НДС (ALV) — налог на потребление, который компания начисляет на свои продажи и перечисляет государству. Разбираем ставки ALV, когда регистрация обязательна и как подавать декларации.',
      body: [
        { t: 'h2', x: 'Что такое ALV?' },
        { t: 'p', x: 'ALV — налог на потребление: вы включаете его в цены своих товаров и услуг, получаете с клиента и перечисляете государству. ALV в ваших покупках можно вычесть, поэтому фактически вы платите только разницу между ALV продаж и покупок.' },
        { t: 'h2', x: 'Ставки ALV 2026' },
        { t: 'ul', items: [
          '25,5 % — общая ставка (большинство товаров и услуг).',
          '13,5 % — напр. продукты питания, услуги ресторанов и общественного питания, книги, лекарства, пассажирские перевозки, проживание, спортивные услуги и билеты на культурные, развлекательные и спортивные мероприятия (снижена с 14 % с 1.1.2026; не касается алкоголя и табака).',
          '10 % — газеты и журналы.',
          '0 % — напр. экспорт за пределы ЕС.',
        ] },
        { t: 'h2', x: 'Когда регистрация ALV обязательна?' },
        { t: 'p', x: 'Регистрироваться не нужно, если оборот не превышает 20 000 € ни в текущем, ни в предыдущем календарном году (порог повышен с 15 000 € с 1.1.2025). Если порог превышен в течение года, компания становится плательщиком ALV с даты превышения, поэтому зарегистрироваться стоит заранее. Ниже порога можно зарегистрироваться добровольно, если это предпринимательская деятельность, а не разовые продажи или хобби.' },
        { t: 'p', x: 'Выйти из реестра из-за небольшого оборота можно, только если оборот не превышает 20 000 € два календарных года подряд (за текущий год — по оценке), то есть не в том же году, когда оборот снизился. Например, если оборот был 22 000 € в 2024 году и 18 000 € в 2025-м, а в 2026 году, по вашей оценке, тоже не превысит 20 000 €, выйти из реестра можно не ранее 31.12.2025. Задним числом из реестра не исключают.' },
        { t: 'note', x: 'Льгота по нижнему пределу (alarajahuojennus) отменена с 1.1.2025: её не дают за финансовые годы (tilikausi), начавшиеся 1.1.2025 или позже. За более ранние финансовые годы её ещё можно запросить задним числом в течение трёх лет после окончания финансового года — например, за 1.1.–31.12.2024 не позднее 31.12.2027. За финансовый год, захватывающий 2024 и 2025 годы, — только за месяцы 2024 года. Цифры сверены с vero.fi 21.09.2026; свою ситуацию уточняйте у бухгалтера.' },
        { t: 'h2', x: 'Стоит ли регистрироваться добровольно?' },
        { t: 'p', x: 'Если ваши клиенты — компании или на старте вы делаете крупные закупки, добровольная регистрация часто выгодна: вы сможете вычесть ALV покупок. Если продаёте напрямую потребителям, ALV повышает ваши цены — взвешивайте плюсы и минусы в каждом конкретном случае.' },
        { t: 'h2', x: 'Как подаётся декларация ALV?' },
        { t: 'p', x: 'ALV декларируется и платится в OmaVero. Налоговый период (verokausi) обычно — календарный месяц. При небольшом обороте можно подать заявку на более длинный период: квартал, если оборот меньше 100 000 €, или год, если меньше 30 000 €. Выбранный период нужно сохранять не меньше года; но если оборот превысит порог для более длинного периода, сразу сообщите об этом в Vero. Декларацию подают за каждый период, даже если облагаемой ALV деятельности не было.' },
        { t: 'p', x: 'Срок обычно — 12-е число: при месячном периоде — 12-е число второго месяца после окончания периода (например, ALV за март — не позднее 12 мая), при квартальном — 12 мая, 12 августа, 12 ноября и 12 февраля, при годовом — последний день февраля следующего года. Если срок выпадает на выходной или праздничный день, он переносится на следующий рабочий день. Продлить срок подачи декларации нельзя.' },
        { t: 'h2', x: 'Частые ошибки' },
        { t: 'ul', items: [
          'Неверная ставка (напр. блюдо в ресторане или книга по 25,5 % вместо 13,5 %).',
          'Забытые вычеты по покупкам.',
          'Просроченные декларации и платежи (штраф и пени).',
          'Ошибки в налогообложении торговли внутри ЕС и с третьими странами (обратное начисление, OSS).',
        ] },
        { t: 'h2', x: 'Помощь по ALV' },
        { t: 'p', x: 'Подаём декларации ALV за вас и консультируем по ставкам и регистрации — по-русски или по-фински. Так вы снижаете риск ошибок и штрафов за просрочку.' },
        { t: 'h2', x: 'Официальные источники' },
        { t: 'links', items: [
          { label: 'Vero: ставки ALV (на английском)', href: SRC.ratesEn },
          { label: 'Vero: обязанность платить ALV и регистрация (на английском)', href: SRC.registerEn },
          { label: 'Vero: как заполнить декларацию ALV и сроки подачи (на английском)', href: SRC.filingEn },
          { label: 'Vero: налоговый период ALV и его изменение (на английском)', href: SRC.periodEn },
          { label: 'Vero: льгота по нижнему пределу — alarajahuojennus (на английском)', href: SRC.reliefEn },
        ] },
      ],
      faq: [
        { q: 'Нужно ли мне регистрироваться плательщиком ALV?', a: 'Да, если оборот превышает 20 000 € в текущем или в предыдущем календарном году. Если порог превышен в течение года, обязанность платить ALV возникает с даты превышения. Если в обоих годах оборот не выше 20 000 €, регистрация добровольная.' },
        { q: 'Какая ставка ALV меня касается?', a: 'Большинство услуг и товаров — 25,5 %. Сниженные ставки применяются, напр., к продуктам питания, услугам ресторанов, книгам и проживанию (13,5 %) и к газетам и журналам (10 %).' },
        { q: 'Как часто подаётся декларация по ALV?', a: 'Обычно ежемесячно, не позднее 12-го числа второго месяца после окончания периода. Квартальный период можно запросить при обороте меньше 100 000 €, годовой — при обороте меньше 30 000 €.' },
        { q: 'Могу ли я вычесть ALV покупок?', a: 'Да, если вы в реестре ALV и покупки связаны с облагаемой деятельностью. Храните чеки и счета.' },
      ],
    },
    en: {
      title: 'VAT (ALV) guide for entrepreneurs in Finland (2026)',
      description:
        'What is ALV and when is it mandatory? 2026 VAT rates, the €20,000 threshold, deductions and filing — a clear guide for entrepreneurs.',
      lead: 'VAT (ALV) is a consumption tax that a business adds to its sales and remits to the state. We go through the VAT rates, when registration is mandatory and how VAT is reported.',
      body: [
        { t: 'h2', x: 'What is VAT?' },
        { t: 'p', x: 'VAT is a consumption tax: you add it to your sales prices, charge it to the customer and remit it to the state. You can deduct the VAT included in your purchases, so in practice you pay only the difference between sales VAT and purchase VAT.' },
        { t: 'h2', x: 'VAT rates 2026' },
        { t: 'ul', items: [
          '25.5% — standard rate (most goods and services).',
          '13.5% — e.g. groceries, restaurant and catering services, books, medicines, passenger transport, accommodation, sports services and admission to cultural, entertainment and sports events (lowered from 14% on 1 Jan 2026; not alcohol or tobacco).',
          '10% — newspapers and magazines.',
          '0% — e.g. exports outside the EU.',
        ] },
        { t: 'h2', x: 'When is VAT registration mandatory?' },
        { t: 'p', x: 'You do not need to register for VAT if your turnover is no more than €20,000 in both the current and the previous calendar year (the threshold rose from €15,000 on 1 Jan 2025). If you exceed it during the year, you are liable for VAT from the date you exceed it, so it is worth registering in good time. Below the threshold you can register voluntarily if your activity is a business rather than occasional or hobby sales.' },
        { t: 'p', x: 'You can leave the register because of low turnover only once your turnover is no more than €20,000 in two consecutive calendar years (for the current year, based on an estimate) — so not in the same year your turnover drops. For example, if your turnover was €22,000 in 2024 and €18,000 in 2025 and you estimate that 2026 will also stay within €20,000, you can leave at the earliest on 31 Dec 2025. Removal from the register is never retroactive.' },
        { t: 'note', x: 'The small-business relief (alarajahuojennus) ended on 1 Jan 2025: it is not available for accounting periods starting on or after that date. For earlier periods it can still be claimed retroactively within three years of the end of the period — for 1 Jan–31 Dec 2024, by 31 Dec 2027. For an accounting period spanning the 2024/2025 year-end, only the 2024 months qualify. Figures checked against vero.fi on 21 Sep 2026; confirm your own situation with an accountant.' },
        { t: 'h2', x: 'Is voluntary registration worth it?' },
        { t: 'p', x: 'If your clients are businesses or you make large purchases early on, voluntary registration is often worthwhile: you can deduct the VAT on your purchases. If you sell directly to consumers, VAT raises your prices — weigh the benefits case by case.' },
        { t: 'h2', x: 'How is VAT reported?' },
        { t: 'p', x: 'VAT is reported and paid in MyTax (OmaVero). The tax period is usually a calendar month. If your turnover is small, you can apply for a longer period: a quarter if turnover is under €100,000, or a year if it is under €30,000. You must keep the chosen period for at least a year, but if your turnover exceeds the limit for the longer period, notify the Tax Administration without delay. A return is filed for every period, even when there has been no VAT-liable activity.' },
        { t: 'p', x: 'The due date is usually the 12th: for a monthly period, the 12th of the second month after the period ends (e.g. March VAT by 12 May); for quarterly periods, 12 May, 12 August, 12 November and 12 February; for an annual period, the last day of February of the following year. If the due date falls on a weekend or public holiday, it moves to the next working day. No extension is available for filing the return.' },
        { t: 'h2', x: 'The most common mistakes' },
        { t: 'ul', items: [
          'The wrong rate (e.g. a restaurant meal or a book at 25.5% instead of 13.5%).',
          'Forgetting deductions on purchases.',
          'Late returns and payments (late fee and interest).',
          'Mishandling EU and foreign trade (reverse charge, OSS).',
        ] },
        { t: 'h2', x: 'Help with VAT' },
        { t: 'p', x: 'We handle your VAT returns and advise you, in Finnish or Russian, on the correct rates and registration. That way you reduce the risk of mistakes and late-filing penalties.' },
        { t: 'h2', x: 'Official sources' },
        { t: 'links', items: [
          { label: 'Vero: rates of VAT', href: SRC.ratesEn },
          { label: 'Vero: VAT liability and registration for VAT', href: SRC.registerEn },
          { label: 'Vero: instructions for completing VAT returns (incl. due dates)', href: SRC.filingEn },
          { label: 'Vero: making changes to the VAT tax period', href: SRC.periodEn },
          { label: 'Vero: VAT relief for small businesses (alarajahuojennus)', href: SRC.reliefEn },
        ] },
      ],
      faq: [
        { q: 'Do I have to register for VAT?', a: 'Yes, if your turnover exceeds €20,000 in the current or the previous calendar year. If you exceed the threshold during the year, VAT liability starts from the date you exceed it. If your turnover is no more than €20,000 in both years, registration is voluntary.' },
        { q: 'Which VAT rate applies to me?', a: 'Most services and goods are 25.5%. Reduced rates apply e.g. to groceries, restaurant services, books and accommodation (13.5%) and to newspapers and magazines (10%).' },
        { q: 'How often is VAT reported?', a: 'Usually monthly, by the 12th of the second month after the period. You can apply for a quarterly period if turnover is under €100,000 and an annual period if it is under €30,000.' },
        { q: 'Can I deduct VAT on purchases?', a: 'Yes, when you are in the VAT register and the purchases relate to taxable business. Keep your receipts and invoices.' },
      ],
    },
    et: {
      title: 'ALV (käibemaksu) juhend ettevõtjale Soomes (2026)',
      description:
        'Mis on ALV ja millal see on kohustuslik? ALV-määrad 2026, 20 000 € piir, mahaarvamised ja deklareerimine — selge juhend ettevõtjale.',
      lead: 'Käibemaks (ALV) on tarbimismaks, mille ettevõte lisab müügile ja kannab riigile. Vaatame läbi ALV-määrad, millal registreerimine on kohustuslik ja kuidas ALV deklareeritakse.',
      body: [
        { t: 'h2', x: 'Mis on käibemaks?' },
        { t: 'p', x: 'ALV on tarbimismaks: lisad selle müügihindadele, võtad kliendilt ja kannad riigile. Ostudes sisalduva ALV saad maha arvata, nii et praktikas maksad vaid müügi- ja ostu-ALV vahe.' },
        { t: 'h2', x: 'ALV-määrad 2026' },
        { t: 'ul', items: [
          '25,5% — üldmäär (enamik kaupu ja teenuseid).',
          '13,5% — nt toidukaubad, restorani- ja toitlustusteenused, raamatud, ravimid, reisijavedu, majutus, spordi- ja liikumisteenused ning sissepääs kultuuri-, meelelahutus- ja spordiüritustele (langes 14%-lt 1.1.2026; ei kehti alkoholile ega tubakale).',
          '10% — ajalehed ja ajakirjad.',
          '0% — nt eksport väljapoole ELi.',
        ] },
        { t: 'h2', x: 'Millal on ALV-registreerimine kohustuslik?' },
        { t: 'p', x: 'Käibemaksukohustuslaseks ei pea registreeruma, kui käive on nii jooksval kui ka eelmisel kalendriaastal kuni 20 000 € (piir tõusis 15 000 eurolt 1.1.2025). Kui piir ületatakse aasta jooksul, tekib ALV-kohustus alates ületamise kuupäevast, seega tasub registreeruda aegsasti. Alla piiri võid registreeruda vabatahtlikult, kui tegemist on ettevõtlusega, mitte juhusliku või harrastusliku müügiga.' },
        { t: 'p', x: 'Väikese käibe tõttu saab registrist lahkuda alles siis, kui käive on kahel järjestikusel kalendriaastal kuni 20 000 € (jooksva aasta puhul hinnangu põhjal) — seega mitte samal aastal, kui käive langeb. Näiteks kui käive oli 2024. aastal 22 000 € ja 2025. aastal 18 000 € ning sinu hinnangul ei ületa see ka 2026. aastal 20 000 €, saad registrist lahkuda kõige varem 31.12.2025. Tagasiulatuvalt registrist ei kustutata.' },
        { t: 'note', x: 'Väikeettevõtja soodustus (alarajahuojennus) kaotati 1.1.2025: seda ei anta 1.1.2025 või hiljem algavate majandusaastate eest. Varasemate majandusaastate eest saab seda veel tagasiulatuvalt taotleda kolme aasta jooksul pärast majandusaasta lõppu, näiteks perioodi 1.1.–31.12.2024 eest hiljemalt 31.12.2027. Üle aastavahetuse 2024/2025 ulatuva majandusaasta puhul saab soodustust taotleda ainult 2024. aasta kuude eest. Arvud on kontrollitud vero.fi põhjal 21.09.2026; täpsusta oma olukorda raamatupidajaga.' },
        { t: 'h2', x: 'Kas vabatahtlik registreerimine tasub end ära?' },
        { t: 'p', x: 'Kui su kliendid on ettevõtted või teed alguses suuri oste, on vabatahtlik registreerimine sageli kasulik: saad maha arvata ostude ALV. Kui müüd otse tarbijatele, tõstab ALV su hindu — kaalu kasu juhtumipõhiselt.' },
        { t: 'h2', x: 'Kuidas ALV deklareeritakse?' },
        { t: 'p', x: 'ALV deklareeritakse ja makstakse OmaVeros. Maksustamisperiood (verokausi) on tavaliselt kalendrikuu. Väikese käibe korral saad taotleda pikemat perioodi: kvartalit, kui käive on alla 100 000 €, või aastat, kui see on alla 30 000 €. Valitud maksustamisperioodi tuleb kasutada vähemalt aasta, kuid kui käive ületab pikema perioodi piiri, teavita sellest viivitamata Verohallintot. Deklaratsioon esitatakse iga maksustamisperioodi kohta, ka siis, kui käibemaksustatavat tegevust ei olnud.' },
        { t: 'p', x: 'Tähtaeg on tavaliselt kuu 12. kuupäev: ühekuulise maksustamisperioodi puhul perioodi lõpule järgneva teise kuu 12. kuupäev (nt märtsi ALV hiljemalt 12.5), kvartaliperioodi puhul 12.5, 12.8, 12.11 ja 12.2 ning aastaperioodi puhul järgmise aasta veebruari viimane päev. Kui tähtaeg langeb nädalavahetusele või pühale, lükkub see järgmisele tööpäevale. Deklaratsiooni esitamiseks pikendust ei saa.' },
        { t: 'h2', x: 'Levinumad vead' },
        { t: 'ul', items: [
          'Vale määr (nt restoranitoit või raamat 25,5%-ga 13,5% asemel).',
          'Ostude mahaarvamiste unustamine.',
          'Hilinenud deklaratsioonid ja maksed (hilinemistasu ja intress).',
          'ELi- ja väliskaubanduse vale käsitlus (pöördmaksustamine, OSS).',
        ] },
        { t: 'h2', x: 'Abi ALV-küsimustes' },
        { t: 'p', x: 'Korraldame ALV-deklaratsioonid sinu eest ja anname soome või vene keeles nõu õigete määrade ja registreerimise kohta. Nii vähendad vigade ja hilinemistasude riski.' },
        { t: 'h2', x: 'Ametlikud allikad' },
        { t: 'links', items: [
          { label: 'Vero: käibemaksumäärad (inglise keeles)', href: SRC.ratesEn },
          { label: 'Vero: käibemaksukohustus ja registreerimine (inglise keeles)', href: SRC.registerEn },
          { label: 'Vero: käibedeklaratsiooni täitmine ja tähtajad (inglise keeles)', href: SRC.filingEn },
          { label: 'Vero: käibemaksu maksustamisperiood ja selle muutmine (inglise keeles)', href: SRC.periodEn },
          { label: 'Vero: väikeettevõtja soodustus — alarajahuojennus (inglise keeles)', href: SRC.reliefEn },
        ] },
      ],
      faq: [
        { q: 'Kas pean registreeruma ALV-kohustuslaseks?', a: 'Jah, kui käive ületab 20 000 € jooksval või eelmisel kalendriaastal. Kui piir ületatakse aasta jooksul, tekib ALV-kohustus alates ületamise kuupäevast. Kui käive on mõlemal aastal kuni 20 000 €, on registreerimine vabatahtlik.' },
        { q: 'Milline ALV-määr mind puudutab?', a: 'Enamikule kaupadele ja teenustele kehtib 25,5%. Vähendatud määrasid kohaldatakse nt toidule, restoraniteenustele, raamatutele ja majutusele (13,5%) ning ajalehtedele ja ajakirjadele (10%).' },
        { q: 'Kui sageli ALV deklareeritakse?', a: 'Tavaliselt igakuiselt, perioodi lõpule järgneva teise kuu 12. kuupäevaks. Kvartaliperioodi saab taotleda, kui käive on alla 100 000 €, ja aastaperioodi, kui see on alla 30 000 €.' },
        { q: 'Kas saan ostude ALV maha arvata?', a: 'Jah, kui oled ALV-registris ja ostud on seotud maksustatava äriga. Säilita tšekid ja arved.' },
      ],
    },
    uk: {
      title: 'ALV (ПДВ) у Фінляндії: гід для підприємця (2026)',
      description:
        'Що таке ALV і коли він обовʼязковий? Ставки ALV 2026, поріг 20 000 €, вирахування та подання декларацій — зрозумілий гід для підприємця.',
      lead: 'ПДВ (ALV) — податок на споживання, який компанія нараховує на свої продажі й перераховує державі. Розбираємо ставки ALV, коли реєстрація обовʼязкова і як подавати декларації.',
      body: [
        { t: 'h2', x: 'Що таке ALV?' },
        { t: 'p', x: 'ALV — податок на споживання: ви додаєте його до цін продажу, берете з клієнта і перераховуєте державі. ALV у ваших покупках можна вирахувати, тож фактично ви платите лише різницю між ALV продажів і покупок.' },
        { t: 'h2', x: 'Ставки ALV 2026' },
        { t: 'ul', items: [
          '25,5 % — загальна ставка (більшість товарів і послуг).',
          '13,5 % — напр. продукти харчування, послуги ресторанів і громадського харчування, книги, ліки, пасажирські перевезення, проживання, спортивні послуги та квитки на культурні, розважальні й спортивні заходи (знижена з 14 % з 1.1.2026; не стосується алкоголю й тютюну).',
          '10 % — газети та журнали.',
          '0 % — напр. експорт за межі ЄС.',
        ] },
        { t: 'h2', x: 'Коли реєстрація ALV обовʼязкова?' },
        { t: 'p', x: 'Реєструватися не потрібно, якщо оборот не перевищує 20 000 € ні в поточному, ні в попередньому календарному році (поріг підвищено з 15 000 € з 1.1.2025). Якщо поріг перевищено протягом року, компанія стає платником ALV з дати перевищення, тому зареєструватися варто заздалегідь. Нижче порога можна зареєструватися добровільно, якщо це підприємницька діяльність, а не разові продажі чи хобі.' },
        { t: 'p', x: 'Вийти з реєстру через невеликий оборот можна, лише якщо оборот не перевищує 20 000 € два календарні роки поспіль (за поточний рік — за оцінкою), тобто не в тому самому році, коли оборот знизився. Наприклад, якщо оборот становив 22 000 € у 2024 році та 18 000 € у 2025-му, а у 2026 році, за вашою оцінкою, теж не перевищить 20 000 €, вийти з реєстру можна не раніше 31.12.2025. Заднім числом з реєстру не виключають.' },
        { t: 'note', x: 'Пільгу за нижньою межею (alarajahuojennus) скасовано з 1.1.2025: її не надають за фінансові роки (tilikausi), що почалися 1.1.2025 або пізніше. За раніші фінансові роки на неї ще можна подати заявку заднім числом протягом трьох років після закінчення фінансового року — наприклад, за 1.1.–31.12.2024 не пізніше 31.12.2027. За фінансовий рік, що охоплює 2024 і 2025 роки, — лише за місяці 2024 року. Цифри звірено з vero.fi 21.09.2026; свою ситуацію уточнюйте в бухгалтера.' },
        { t: 'h2', x: 'Чи варто реєструватися добровільно?' },
        { t: 'p', x: 'Якщо ваші клієнти — компанії або на старті ви робите великі закупівлі, добровільна реєстрація часто вигідна: ви зможете вирахувати ALV покупок. Якщо продаєте напряму споживачам, ALV підвищує ваші ціни — зважуйте переваги й недоліки в кожному конкретному випадку.' },
        { t: 'h2', x: 'Як подається декларація ALV?' },
        { t: 'p', x: 'ALV декларується і сплачується в OmaVero. Податковий період (verokausi) зазвичай — календарний місяць. За невеликого обороту можна подати заявку на довший період: квартал, якщо оборот менший за 100 000 €, або рік, якщо менший за 30 000 €. Обраний період треба зберігати щонайменше рік, але якщо оборот перевищить поріг для довшого періоду, негайно повідомте про це Vero. Декларацію подають за кожен період, навіть якщо діяльності, що оподатковується ALV, не було.' },
        { t: 'p', x: 'Строк зазвичай — 12-те число: за місячного періоду — 12-те число другого місяця після закінчення періоду (наприклад, ALV за березень — не пізніше 12 травня), за квартального — 12 травня, 12 серпня, 12 листопада і 12 лютого, за річного — останній день лютого наступного року. Якщо строк припадає на вихідний або святковий день, він переноситься на наступний робочий день. Продовжити строк подання декларації не можна.' },
        { t: 'h2', x: 'Найпоширеніші помилки' },
        { t: 'ul', items: [
          'Неправильна ставка (напр. страва в ресторані чи книга за 25,5 % замість 13,5 %).',
          'Забуті вирахування з покупок.',
          'Прострочені декларації та платежі (штраф і пеня).',
          'Помилки в оподаткуванні торгівлі в межах ЄС і з третіми країнами (зворотне нарахування, OSS).',
        ] },
        { t: 'h2', x: 'Допомога з ALV' },
        { t: 'p', x: 'Готуємо декларації ALV за вас і консультуємо щодо ставок і реєстрації — фінською або російською. Так ви знижуєте ризик помилок і штрафів за прострочення.' },
        { t: 'h2', x: 'Офіційні джерела' },
        { t: 'links', items: [
          { label: 'Vero: ставки ALV (англійською)', href: SRC.ratesEn },
          { label: 'Vero: обовʼязок сплачувати ALV і реєстрація (англійською)', href: SRC.registerEn },
          { label: 'Vero: як заповнити декларацію з ALV і строки подання (англійською)', href: SRC.filingEn },
          { label: 'Vero: податковий період ALV та його зміна (англійською)', href: SRC.periodEn },
          { label: 'Vero: пільга за нижньою межею — alarajahuojennus (англійською)', href: SRC.reliefEn },
        ] },
      ],
      faq: [
        { q: 'Чи потрібно мені реєструватися платником ALV?', a: 'Так, якщо оборот перевищує 20 000 € у поточному або в попередньому календарному році. Якщо поріг перевищено протягом року, обовʼязок сплачувати ALV виникає з дати перевищення. Якщо в обох роках оборот не перевищує 20 000 €, реєстрація добровільна.' },
        { q: 'Яка ставка ALV мене стосується?', a: 'Більшість послуг і товарів — 25,5 %. Знижені ставки застосовуються, напр., до продуктів харчування, послуг ресторанів, книг і проживання (13,5 %) та до газет і журналів (10 %).' },
        { q: 'Як часто подається декларація з ALV?', a: 'Зазвичай щомісяця, не пізніше 12-го числа другого місяця після закінчення періоду. Квартальний період можна отримати за заявкою, якщо оборот менший за 100 000 €, річний — якщо менший за 30 000 €.' },
        { q: 'Чи можу я вирахувати ALV покупок?', a: 'Так, якщо ви в реєстрі ALV і покупки повʼязані з оподатковуваною діяльністю. Зберігайте чеки та рахунки.' },
      ],
    },
  },
};
