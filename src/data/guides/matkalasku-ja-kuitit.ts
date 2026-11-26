import type { Guide } from './types';

// Q&A page: "How do I make a travel expense report and attach receipts I paid myself?"
// Facts verified 2026-11-26, verbatim (every link below answered HTTP 200 the same day):
// - Verohallinnon päätös verovapaista matkakustannusten korvauksista vuonna 2026 (VH/6575/00.01.00/2025,
//   antopäivä 7.11.2025, voimassa 1.1.2026 – toistaiseksi): 6 § matkavuorokausi "enintään 24 tunnin pituista
//   ajanjaksoa, joka alkaa palkansaajan lähtiessä työmatkalle työpaikaltaan tai asunnoltaan"; 9 § "auto 55
//   senttiä kilometriltä", passengers "4 senttiä kilometriltä kutakin mukana seuraavaa henkilöä kohden";
//   11 § "yli 15 kilometrin etäisyydellä joko palkansaajan varsinaisesta työpaikasta tai asunnosta",
//   "lisäksi oltava yli 5 kilometrin etäisyydellä sekä varsinaisesta työpaikasta että asunnosta"; 12 § "yli 6
//   tuntia (osapäiväraha) 25", "yli 10 tuntia (kokopäiväraha) 54", over the last full matkavuorokausi
//   "vähintään 2 tunnilla 25 - yli 6 tunnilla 54" (page: "at least 2 hours", not "more than");
//   15 km is measured from where the trip started (regular workplace or home, per 6 § start point); free meal → half ("kahta" meals for kokopäiväraha, "yhtä"
//   for osapäiväraha); 14 § "Ateriakorvauksen enimmäismäärä on 13,50 euroa", only when no per diem and "ei
//   työn vuoksi ole mahdollisuutta ruokailutauon aikana aterioida tavanomaisella ruokailupaikallaan"; 8 §
//   ticket "liikenteenharjoittajan antaman tositteen tai muun luotettavan selvityksen mukainen määrä"; 15 §
//   "majoittumiskorvauksen enimmäismäärä on majoitusliikkeen antaman tositteen tai muun luotettavan
//   selvityksen mukainen määrä".
// - Verohallinnon päätös ... vuonna 2027 (VH/5639/00.01.00/2026, antopäivä 23.10.2026, voimassa 1.1.2027 –):
//   "auto 58 senttiä kilometriltä", "(osapäiväraha) 25", "(kokopäiväraha) 55", ateriakorvaus "13,75 euroa".
// - Vero, syventävä ohje Työmatkakustannusten korvaukset verotuksessa (VH/630/00.01.00/2026, 5.3.2026, page
//   10.3.2026), 13 Matkalasku: "Matkalaskusta on selvittävä: matkan tarkoitus ja kohde (osoite) tarvittaessa
//   matkareitti matkustamistapa (kulkuneuvo) matkan alkamis- ja päättymisajankohdat (päivämäärät ja
//   kellonajat) sekä ulkomaanmatkoista maa tai alue, jossa matkavuorokausi on päättynyt"; km: "ajettu
//   kilometrimäärä ja yksikköhinta (EPA 17 §:n 3 momentti)" — i.e. the km/rate requirement comes from a decree
//   (ennakkoperintäasetus 1124/2002, 17 § 3 mom.), not from an Act; the page attributes it to Vero's guidance /
//   the asetus and states it in the matkalasku-contents section (employees), not under toiminimi; "Palkansaajan on liitettävä matkalaskuun
//   tositteet tai muu selvitys. Mukaan liitetään hotellilasku, junaliput"; e-ticket "varmistus, josta näkyy
//   myös lipun hinta"; "Joistakin kuluista, esimerkiksi pysäköintimaksuista, ei saa minkäänlaista tositetta.
//   Tällöin palkansaaja vakuuttaa allekirjoitetulla matkalaskulla kustannusten määrän olevan oikea. Myös
//   sähköistä allekirjoitusta voidaan käyttää"; "Matkalasku voidaan laatia myös erilaisilla sähköisillä
//   sovelluksilla"; example 5 "Työnantaja voi korvata kustannukset palkansaajalle matkalaskua vastaan
//   verovapaasti"; free meals "Palkansaajan on oma-aloitteisesti otettava nämä ateriat huomioon matkalaskua
//   tehdessään"; owner without salary: tax-free "edellyttäen, että kustannuspäätöksessä säädetyt edellytykset
//   täyttyvät ja että omistajayrittäjä laatii näistä matkoista matkalaskun". No ajopäiväkirja requirement for
//   an employee's km allowance appears in this guidance (km + unit price on the matkalasku is the rule).
// - Vero, Kilometrikorvaus ja päiväraha (page updated 23.10.2026): "verovapaita korvauksia voi maksaa vain
//   työntekijälle"; "toiminimiyrittäjä, et voi maksaa itsellesi verovapaata kilometrikorvausta tai päivärahaa.
//   Voit kuitenkin tehdä vastaavan suuruisen verovähennyksen verotuksessa"; "omistajayrittäjänä (oy, ky tai
//   ay) ... Korvaukset ovat verovapaita vain, jos Verohallinnon kustannuspäätöksessä kerrotut ehdot täyttyvät
//   ja teet matkoista matkalaskun yrityksen kirjanpitoon"; "(Vuonna 2026 summa on 0,55 euroa/km.)";
//   "kokopäiväraha 54 euroa vuonna 2026 (55 euroa vuonna 2027)"; "13,50 euroa päivässä vuonna 2026".
// - Vero / Tulorekisteri, Kustannusten korvaukset: "Ilmoita tulolajeilla Ateriakorvaus (303), Kilometrikorvaus
//   (verovapaa) (311) ja Päiväraha (331)"; "viimeistään maksukuukautta seuraavan kuukauden viidentenä
//   päivänä"; "yhdellä ilmoituksella kerran kuukaudessa"; owner "nostamatta palkkaa" → same income types;
//   not reported: reimbursement based on "liikenteenharjoittajan antaman tositteen (esimerkiksi junalipun)",
//   "Tulorekisteriin ei ilmoiteta majoittumiskorvausta".
// - Tuloverolaki 1535/1992 (Finlex) 71 § 1 mom.: "Veronalaista tuloa ei ole työnantajalta työmatkasta saatu
//   matkustamiskustannusten korvaus, päiväraha, ateriakorvaus ja majoittumiskorvaus."
// - Laki elinkeinotulon verottamisesta 360/1968 (Finlex) 55 §: "edellyttää ajopäiväkirjaa tai muuta luotettavaa
//   selvitystä auton käytöstä ja elinkeinotoimintaan liittyvistä matkoista."
// - Kirjanpitolaki 1336/1997 (Finlex) 2:7 §: "säilyttää niin, että niiden sisältöä voi vaikeuksitta tarkastella
//   ja tarvittaessa tulostaa selväkielisessä muodossa"; 2:10 § tositteet "vähintään kuusi vuotta sen vuoden
//   lopusta, jonka aikana tilikausi on päättynyt".
// - Worked example (own arithmetic): Mon 8.00 – Tue 17.00 = 33 h → 24 h full day 54 € + 9 h (> 6 h) 54 € =
//   108 €; 360 km × 0,55 € = 198 €; hotel 95 € per receipt; total 401 €. Tulorekisteri 108 € (331) + 198 €
//   (311); hotel not reported.
const VERO = 'https://www.vero.fi';

const SRC = {
  decision2026: `${VERO}/syventavat-vero-ohjeet/paatokset/47405/verohallinnon-paatos-verovapaista-matkakustannusten-korvauksista-vuonna-2026/`,
  decision2026En: `${VERO}/en/detailed-guidance/decisions/47405/tax-exempt-allowances-in-2026-for-business-travel/`,
  decision2027: `${VERO}/syventavat-vero-ohjeet/paatokset/47405/verohallinnon-paatos-verovapaista-matkakustannusten-korvauksista-vuonna-2027/`,
  guide48013: `${VERO}/syventavat-vero-ohjeet/ohje-hakusivu/48013/tyomatkakustannusten-korvaukset-verotuksessa7/`,
  allowances: `${VERO}/henkiloasiakkaat/vahennykset/kilometrikorvaus-ja-paivaraha/`,
  allowancesEn: `${VERO}/en/individuals/deductions/kilometre-and-per-diem-allowances/`,
  incomes: `${VERO}/tulorekisteri/yritykset-ja-organisaatiot/suorituksen-maksajat/palkkatiedot/kustannusten-korvaukset/`,
  incomesEn: `${VERO}/en/incomes-register/companies-and-organisations/employers/earnings-payment-data/reporting-reimbursements-of-expenses-to-the-incomes-register/`,
  tvl: 'https://www.finlex.fi/fi/lainsaadanto/1992/1535',
  kpl: 'https://www.finlex.fi/fi/lainsaadanto/1997/1336',
};

export const matkalaskuJaKuitit: Guide = {
  slug: 'matkalasku-ja-kuitit',
  datePublished: '2026-11-30',
  dateModified: '2026-11-30',
  content: {
    ru: {
      title: 'Как составить отчёт о командировке (matkalasku) и приложить чеки, оплаченные своими деньгами?',
      description: 'Matkalasku в 2026 году: что в нём указать, как вернуть оплаченные своей картой чеки без налога, 0,55 €/км, суточные 54 € и 25 €, Tulorekisteri и пример.',
      lead: 'В matkalasku указывают цель и место поездки, дату и время отъезда и возвращения, транспорт и километры на своей машине, а к нему прикладывают чеки за то, что вы оплатили сами. Фирма возвращает чеки по фактической сумме, а суточные и километровые — в пределах норм Vero, без налога: в 2026 году 0,55 €/км и 54 € за полные сутки.',
      body: [
        { t: 'h2', x: 'Что должно быть в matkalasku' },
        { t: 'p', x: 'По инструкции Vero в отчёте о поездке должно быть видно:' },
        { t: 'ul', items: [
          'цель поездки и место назначения (адрес), при необходимости маршрут;',
          'способ передвижения (транспорт);',
          'дата и время начала и окончания поездки — по ним считают суточные;',
          'для поездок за границу — страна, где закончились последние сутки поездки;',
          'для километровых — сколько километров проехано и ставка за километр (этого требует ennakkoperintäasetus, 17 §).',
        ] },
        { t: 'p', x: 'В отчёте указывают и запрошенные суточные или компенсацию питания, а также бесплатное питание в поездке — оно уменьшает суточные. Отчёт можно оформить в электронной программе и подписать электронно.' },
        { t: 'h2', x: 'Чеки, оплаченные своими деньгами' },
        { t: 'p', x: 'Если вы оплатили поезд, гостиницу или парковку своей картой, приложите чек к matkalasku. Фирма возвращает такие расходы без налога по фактической сумме из чека: билет — по документу перевозчика, проживание — по счёту гостиницы. К электронному авиабилету прикладывают подтверждение с ценой. Если документа нет совсем, как у некоторых парковок, сумму подтверждают подписью на matkalasku.' },
        { t: 'p', x: 'Отчёт с чеками — документ бухгалтерии фирмы. Его хранят не меньше шести лет с конца года, в котором закончился финансовый год, так, чтобы его можно было без труда просмотреть, — на бумаге или в электронном виде.' },
        { t: 'h2', x: 'Нормы без налога в 2026 году' },
        { t: 'ul', items: [
          'километровые на своей машине — 0,55 €/км, плюс 4 цента/км за каждого пассажира по тому же делу;',
          'частичные суточные (osapäiväraha) — 25 €, если поездка длится больше 6 часов;',
          'полные суточные (kokopäiväraha) — 54 €, если больше 10 часов;',
          'компенсация питания (ateriakorvaus) — 13,50 €, если суточные не платят и из-за работы нельзя поесть в обычном месте;',
          'суточные положены, если место работы дальше 15 км от того места, откуда началась поездка, — основного места работы или дома (и дальше 5 км от обоих).',
        ] },
        { t: 'p', x: 'В многодневной поездке каждые полные 24 часа дают полные суточные, а за время сверх последних полных суток платят 25 € (не менее 2 часов) или 54 € (больше 6 часов). Если в какие-то сутки вы получили два бесплатных приёма пищи (для частичных — один), суточные уменьшаются вдвое.' },
        { t: 'h2', x: 'Выплата и Tulorekisteri' },
        { t: 'p', x: 'Фирма переводит компенсацию на счёт работника или владельца по утверждённому matkalasku. Суточные, километровые и компенсацию питания без налога подают в Tulorekisteri кодами Päiväraha (331), Kilometrikorvaus (verovapaa) (311) и Ateriakorvaus (303) не позже 5-го числа следующего месяца; выплаты за месяц можно подать одним отчётом. Компенсацию проживания и возврат по документу перевозчика (например, билета на поезд) не подают. Сумма сверх нормы — облагаемая зарплата.' },
        { t: 'h2', x: 'Владелец Oy и владелец toiminimi' },
        { t: 'p', x: 'Владельцу Oy фирма может платить компенсации без налога за поездки по делам фирмы на тех же условиях, что и работнику, даже если он не получает зарплату. Условие — matkalasku в бухгалтерию фирмы; в Tulorekisteri подают те же коды.' },
        { t: 'p', x: 'Владелец toiminimi платить себе суточные и километровые без налога не может: вместо этого он делает вычет в налоговой декларации, а для вычета за поездки на своей машине нужен журнал поездок (ajopäiväkirja) или другое надёжное подтверждение. Подробнее — в нашей статье «Километровые, суточные и компенсация питания в Финляндии в 2026 году».' },
        { t: 'h2', x: 'Пример' },
        { t: 'p', x: 'Работник едет на своей машине к клиенту в Тампере: выезд в понедельник в 8:00, возвращение во вторник в 17:00, всего 360 км. Гостиницу за 95 € он оплатил своей картой. Поездка длится 33 часа: первые 24 часа дают 54 €, оставшиеся 9 часов — ещё 54 €. По matkalasku: суточные 108 €, километровые 360 × 0,55 = 198 €, гостиница по чеку 95 €, итого 401 € без налога. В Tulorekisteri подают 108 € и 198 €, гостиницу — нет.' },
        { t: 'note', x: 'С 1.1.2027 нормы: 0,58 €/км, полные суточные 55 €, частичные 25 €, компенсация питания 13,75 € (решение Vero от 23.10.2026).' },
        { t: 'links', items: [
          { label: 'Vero: решение о компенсациях командировок на 2026 год', href: SRC.decision2026 },
          { label: 'Vero: решение на 2027 год', href: SRC.decision2027 },
          { label: 'Vero: Työmatkakustannusten korvaukset verotuksessa (глава 13 — matkalasku)', href: SRC.guide48013 },
          { label: 'Vero: Kilometrikorvaus ja päiväraha', href: SRC.allowances },
          { label: 'Tulorekisteri: Kustannusten korvaukset', href: SRC.incomes },
          { label: 'Finlex: Tuloverolaki 1535/1992, 71 §', href: SRC.tvl },
          { label: 'Finlex: Kirjanpitolaki 1336/1997, 2 luku 10 §', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Вопросы о командировках — без доплаты' },
        { t: 'p', x: 'Клиентам Debit Credit бухгалтер отвечает на такие вопросы без доплаты, на русском или финском: как оформить matkalasku и какие чеки к нему приложить.' },
      ],
      faq: [
        { q: 'Нужно ли прикладывать оригинал чека?', a: 'К matkalasku прикладывают чек или другое подтверждение, и он хранится как документ бухгалтерии не меньше шести лет — на бумаге или в электронном виде. Если документа нет, сумму подтверждают подписью на отчёте.' },
        { q: 'Получает ли владелец Oy суточные без налога, если не платит себе зарплату?', a: 'Да, если поездка была по делам фирмы, условия решения Vero выполнены и в бухгалтерию фирмы сдан matkalasku. Выплату подают в Tulorekisteri.' },
        { q: 'Что будет, если компенсация больше нормы?', a: 'Часть сверх нормы — облагаемая зарплата: с неё удерживают налог, как с обычной зарплаты.' },
      ],
    },
    fi: {
      title: 'Miten teen matkalaskun ja liitän siihen itse maksamani kuitit?',
      description: 'Matkalasku 2026: mitä siihen merkitään, miten omalla rahalla maksetut kuitit korvataan verovapaasti, 0,55 €/km, päivärahat 54 € ja 25 € sekä tulorekisteri.',
      lead: 'Matkalaskuun merkitään matkan tarkoitus ja kohde, alkamis- ja päättymisaika kellonaikoineen, kulkuneuvo ja omalla autolla ajetut kilometrit, ja siihen liitetään kuitit itse maksetuista kuluista. Yritys korvaa kuitit todellisen määrän mukaan ja päivärahat ja kilometrikorvaukset Verohallinnon enimmäismäärin verovapaasti: vuonna 2026 0,55 €/km ja kokopäiväraha 54 €.',
      body: [
        { t: 'h2', x: 'Mitä matkalaskussa pitää olla' },
        { t: 'p', x: 'Verohallinnon ohjeen mukaan matkalaskusta on selvittävä:' },
        { t: 'ul', items: [
          'matkan tarkoitus ja kohde (osoite), tarvittaessa matkareitti;',
          'matkustamistapa eli kulkuneuvo;',
          'matkan alkamis- ja päättymisajankohta päivämäärineen ja kellonaikoineen – niistä lasketaan päivärahat;',
          'ulkomaanmatkalla maa tai alue, jossa matkavuorokausi päättyi;',
          'kilometrikorvauksesta ajettu kilometrimäärä ja yksikköhinta (ennakkoperintäasetuksen 17 §).',
        ] },
        { t: 'p', x: 'Laskuun merkitään myös haettavat päivärahat tai ateriakorvaukset sekä matkalla saadut ilmaiset ateriat, jotka pienentävät päivärahaa. Matkalaskun voi tehdä sähköisellä sovelluksella ja allekirjoittaa sähköisesti.' },
        { t: 'h2', x: 'Itse maksetut kuitit liitetään matkalaskuun' },
        { t: 'p', x: 'Kun maksat junalipun, hotellin tai pysäköinnin omalla kortillasi, liitä kuitti matkalaskuun. Yritys korvaa tällaiset kulut verovapaasti kuitin mukaisena todellisena summana: matkalipun liikenteenharjoittajan tositteen ja majoituksen majoitusliikkeen tositteen mukaan. Sähköisestä lentolipusta liitetään varmistus, jossa näkyy lipun hinta. Jos kulusta ei saa tositetta, kuten joistakin pysäköintimaksuista, vakuutat summan allekirjoitetulla matkalaskulla.' },
        { t: 'p', x: 'Matkalasku kuitteineen on yrityksen kirjanpidon tosite. Tositteet säilytetään vähintään kuusi vuotta sen vuoden lopusta, jonka aikana tilikausi päättyi, niin että niitä voi vaikeuksitta tarkastella – paperilla tai sähköisesti.' },
        { t: 'h2', x: 'Verovapaat enimmäismäärät 2026' },
        { t: 'ul', items: [
          'kilometrikorvaus omalla autolla 0,55 €/km, lisäksi 4 senttiä/km kustakin samaan työasiaan liittyvästä matkustajasta;',
          'osapäiväraha 25 €, kun matka kestää yli 6 tuntia;',
          'kokopäiväraha 54 €, kun matka kestää yli 10 tuntia;',
          'ateriakorvaus 13,50 €, kun päivärahaa ei makseta eikä työn vuoksi voi syödä tavanomaisella ruokailupaikalla;',
          'päivärahan edellytys: työntekemispaikka on yli 15 km päässä siitä, mistä matka alkoi – varsinaisesta työpaikasta tai kodista (ja yli 5 km molemmista).',
        ] },
        { t: 'p', x: 'Monipäiväisellä matkalla jokainen täysi 24 tunnin matkavuorokausi oikeuttaa kokopäivärahaan, ja viimeisen täyden vuorokauden ylittävältä ajalta maksetaan 25 € (vähintään 2 tuntia) tai 54 € (yli 6 tuntia). Jos saat matkavuorokautena kaksi ilmaista ateriaa (osapäivärahassa yhden), päiväraha puolitetaan.' },
        { t: 'h2', x: 'Korvauksen maksaminen ja tulorekisteri' },
        { t: 'p', x: 'Yritys maksaa korvauksen hyväksytyn matkalaskun perusteella työntekijän tai osakkaan tilille. Verovapaat päivärahat, kilometrikorvaukset ja ateriakorvaukset ilmoitetaan tulorekisteriin tulolajeilla Päiväraha (331), Kilometrikorvaus (verovapaa) (311) ja Ateriakorvaus (303) viimeistään maksukuukautta seuraavan kuukauden 5. päivänä; kuukauden maksut voi ilmoittaa yhdellä ilmoituksella. Majoittumiskorvausta ja liikenteenharjoittajan tositteeseen (esimerkiksi junalippuun) perustuvaa korvausta ei ilmoiteta. Enimmäismäärän ylittävä osa on veronalaista palkkaa.' },
        { t: 'h2', x: 'Osakeyhtiön osakas ja toiminimiyrittäjä' },
        { t: 'p', x: 'Osakkaalle osakeyhtiö voi maksaa verovapaita korvauksia yhtiön asioissa tehdyistä työmatkoista samoin ehdoin kuin työntekijälle, vaikka hän ei nostaisi palkkaa. Edellytys on matkalasku yhtiön kirjanpitoon, ja korvaukset ilmoitetaan tulorekisteriin samoilla tulolajeilla.' },
        { t: 'p', x: 'Toiminimiyrittäjä ei voi maksaa itselleen verovapaita päivärahoja tai kilometrikorvauksia. Hän tekee vastaavan vähennyksen veroilmoituksella, ja omalla autolla tehtyjen ajojen vähennys edellyttää ajopäiväkirjaa tai muuta luotettavaa selvitystä. Tarkemmin oppaassa «Kilometrikorvaus, päiväraha ja ateriakorvaus 2026».' },
        { t: 'h2', x: 'Esimerkki' },
        { t: 'p', x: 'Työntekijä ajaa omalla autollaan asiakkaalle Tampereelle: lähtö maanantaina klo 8.00, paluu tiistaina klo 17.00, yhteensä 360 km. Hotellin 95 € hän maksaa omalla kortillaan. Matka kestää 33 tuntia: ensimmäinen matkavuorokausi oikeuttaa 54 euroon ja ylimenevät 9 tuntia toiseen 54 euroon. Matkalaskulla päivärahat ovat 108 €, kilometrikorvaus 360 × 0,55 = 198 € ja hotelli kuitin mukaan 95 €, yhteensä 401 € verovapaasti. Tulorekisteriin ilmoitetaan 108 € ja 198 €, hotellia ei.' },
        { t: 'note', x: 'Vuonna 2027 enimmäismäärät ovat 0,58 €/km, kokopäiväraha 55 €, osapäiväraha 25 € ja ateriakorvaus 13,75 € (Verohallinnon päätös 23.10.2026).' },
        { t: 'links', items: [
          { label: 'Verohallinnon päätös verovapaista matkakustannusten korvauksista 2026', href: SRC.decision2026 },
          { label: 'Verohallinnon päätös verovapaista matkakustannusten korvauksista 2027', href: SRC.decision2027 },
          { label: 'Vero: Työmatkakustannusten korvaukset verotuksessa (luku 13 Matkalasku)', href: SRC.guide48013 },
          { label: 'Vero: Kilometrikorvaus ja päiväraha', href: SRC.allowances },
          { label: 'Tulorekisteri: Kustannusten korvaukset', href: SRC.incomes },
          { label: 'Finlex: Tuloverolaki 1535/1992, 71 §', href: SRC.tvl },
          { label: 'Finlex: Kirjanpitolaki 1336/1997, 2 luvun 10 §', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Kysymykset ilman lisämaksua' },
        { t: 'p', x: 'Debit Creditin asiakkaat saavat vastaukset tällaisiin kysymyksiin ilman lisämaksua suomeksi tai venäjäksi: miten matkalasku tehdään ja mitkä kuitit siihen kuuluvat.' },
      ],
      faq: [
        { q: 'Pitääkö matkalaskuun liittää alkuperäinen kuitti?', a: 'Matkalaskuun liitetään kuitti tai muu selvitys, ja se säilytetään kirjanpidon tositteena vähintään kuusi vuotta – paperilla tai sähköisesti. Jos tositetta ei saa, summa vakuutetaan allekirjoitetulla matkalaskulla.' },
        { q: 'Saako osakeyhtiön osakas verovapaata päivärahaa, vaikka ei nosta palkkaa?', a: 'Saa, jos matka on tehty yhtiön asioissa, kustannuspäätöksen ehdot täyttyvät ja matkasta tehdään matkalasku yhtiön kirjanpitoon. Korvaus ilmoitetaan tulorekisteriin.' },
        { q: 'Mitä tapahtuu, jos korvaus ylittää enimmäismäärän?', a: 'Ylittävä osa on veronalaista palkkaa, josta toimitetaan ennakonpidätys kuten muustakin palkasta.' },
      ],
    },
    en: {
      title: 'How do I make a travel expense claim and attach receipts I paid myself?',
      description: 'Travel expense claims in Finland 2026: what to include, tax-free refunds of receipts you paid yourself, €0.55/km, per diems €54 and €25, Incomes Register.',
      lead: 'A travel expense claim (matkalasku) shows the purpose and destination of the trip, the start and end dates and times, the means of transport and any kilometres driven in your own car, with receipts attached for what you paid yourself. The company refunds receipts at their actual amount and pays per diems and kilometre allowances tax-free up to the Tax Administration’s maximums: €0.55/km and a €54 full per diem in 2026.',
      body: [
        { t: 'h2', x: 'What the claim must show' },
        { t: 'p', x: 'According to the Tax Administration’s guidance, the claim must show:' },
        { t: 'ul', items: [
          'the purpose and destination (address) of the trip, and the route where needed;',
          'the means of transport;',
          'the start and end of the trip with dates and times – per diems are calculated from these;',
          'for trips abroad, the country or region where the last trip day ended;',
          'for a kilometre allowance, the kilometres driven and the rate per kilometre (required by the withholding decree, ennakkoperintäasetus section 17).',
        ] },
        { t: 'p', x: 'The claim also lists the per diems or meal allowances claimed and any free meals received on the trip, which reduce the per diem. It can be made in an electronic app and signed electronically.' },
        { t: 'h2', x: 'Receipts you paid with your own money' },
        { t: 'p', x: 'If you paid for a train ticket, a hotel or parking with your own card, attach the receipt to the claim. The company refunds these costs tax-free at the actual amount on the receipt: a ticket according to the carrier’s document, accommodation according to the hotel’s invoice. For an e-ticket, attach the confirmation showing the price. If a cost gives no receipt at all, as with some parking fees, you confirm the amount by signing the claim.' },
        { t: 'p', x: 'The claim with its receipts is a voucher in the company’s books. It is kept for at least six years from the end of the year in which the financial period ended, in a form that can be viewed without difficulty – on paper or electronically.' },
        { t: 'h2', x: 'Tax-free maximums in 2026' },
        { t: 'ul', items: [
          'kilometre allowance for your own car €0.55/km, plus 4 cents/km for each passenger travelling on the same business;',
          'partial per diem €25 for a trip of more than 6 hours;',
          'full per diem €54 for a trip of more than 10 hours;',
          'meal allowance €13.50 when no per diem is paid and work prevents eating at your usual place;',
          'a per diem requires the work site to be more than 15 km from where the trip started – your regular workplace or home (and more than 5 km from both).',
        ] },
        { t: 'p', x: 'On a trip of several days, each full 24-hour trip day earns a full per diem, and time beyond the last full day earns €25 (at least 2 hours) or €54 (over 6 hours). If you get two free meals on a trip day (one for a partial per diem), the per diem is halved.' },
        { t: 'h2', x: 'Payment and the Incomes Register' },
        { t: 'p', x: 'The company pays the refund to the employee’s or owner’s account on the basis of the approved claim. Tax-free per diems, kilometre allowances and meal allowances are reported to the Incomes Register under income types Päiväraha (331), Kilometrikorvaus (verovapaa) (311) and Ateriakorvaus (303) by the 5th day of the month after payment; a month’s payments can go in one report. Accommodation refunds and refunds based on a carrier’s document (such as a train ticket) are not reported. Anything above the maximum is taxable pay.' },
        { t: 'h2', x: 'Limited company owner and sole trader' },
        { t: 'p', x: 'A limited company can pay its shareholder tax-free allowances for business trips on the same terms as an employee, even if the shareholder draws no salary. The condition is a travel expense claim in the company’s books, and the payments are reported to the Incomes Register under the same income types.' },
        { t: 'p', x: 'A sole trader (toiminimi) cannot pay themselves tax-free per diems or kilometre allowances. Instead they claim a corresponding deduction in the tax return, and the deduction for driving their own car requires a driver’s log (ajopäiväkirja) or other reliable evidence. More in our guide “Kilometre Allowance, Per Diem and Meal Allowance in Finland 2026”.' },
        { t: 'h2', x: 'Example' },
        { t: 'p', x: 'An employee drives their own car to a client in Tampere, leaving on Monday at 8.00 and returning on Tuesday at 17.00, 360 km in total. They pay the €95 hotel with their own card. The trip lasts 33 hours: the first 24 hours earn €54 and the remaining 9 hours another €54. On the claim: per diems €108, kilometre allowance 360 × €0.55 = €198, hotel per receipt €95, total €401 tax-free. €108 and €198 are reported to the Incomes Register; the hotel is not.' },
        { t: 'note', x: 'From 1 January 2027 the maximums are €0.58/km, full per diem €55, partial per diem €25 and meal allowance €13.75 (Tax Administration decision of 23 October 2026).' },
        { t: 'links', items: [
          { label: 'Vero: Tax-exempt allowances in 2026 for business travel', href: SRC.decision2026En },
          { label: 'Vero: decision for 2027 (in Finnish)', href: SRC.decision2027 },
          { label: 'Vero: detailed guidance on travel reimbursements, chapter 13 (in Finnish)', href: SRC.guide48013 },
          { label: 'Vero: Kilometre and per diem allowances', href: SRC.allowancesEn },
          { label: 'Incomes Register: Reimbursements of expenses', href: SRC.incomesEn },
          { label: 'Finlex: Income Tax Act 1535/1992, section 71 (in Finnish)', href: SRC.tvl },
          { label: 'Finlex: Accounting Act 1336/1997, chapter 2 section 10 (in Finnish)', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Questions at no extra cost' },
        { t: 'p', x: 'Debit Credit clients get answers to questions like this at no extra cost; our accountant works in Finnish and Russian.' },
      ],
      faq: [
        { q: 'Do I have to attach the original receipt?', a: 'Attach the receipt or other evidence to the claim; it is kept as a bookkeeping voucher for at least six years, on paper or electronically. If no receipt exists, you confirm the amount by signing the claim.' },
        { q: 'Can a limited company owner get a tax-free per diem without drawing a salary?', a: 'Yes, if the trip was on company business, the conditions of the Tax Administration’s decision are met and a travel expense claim is entered in the company’s books. The payment is reported to the Incomes Register.' },
        { q: 'What if the allowance exceeds the maximum?', a: 'The excess is taxable pay, and tax is withheld from it like from other wages.' },
      ],
    },
    et: {
      title: 'Kuidas koostada lähetusaruanne (matkalasku) ja lisada sellele omast rahast makstud tšekid?',
      description: 'Lähetusaruanne Soomes 2026: mida sinna märkida, kuidas omast rahast makstud tšekid maksuvabalt hüvitatakse, 0,55 €/km, päevarahad 54 € ja 25 €, Tulorekisteri.',
      lead: 'Lähetusaruandesse (matkalasku) märgitakse sõidu eesmärk ja sihtkoht, alguse ja lõpu kuupäev ja kellaaeg, sõiduvahend ja oma autoga sõidetud kilomeetrid ning lisatakse tšekid kulude kohta, mille maksite ise. Ettevõte hüvitab tšekid tegeliku summa järgi ning päevarahad ja kilomeetrihüvitise maksuvabalt Vero piirmäärade ulatuses: 2026. aastal 0,55 €/km ja täispäevaraha 54 €.',
      body: [
        { t: 'h2', x: 'Mis peab lähetusaruandes olema' },
        { t: 'p', x: 'Vero juhendi järgi peab aruandest selguma:' },
        { t: 'ul', items: [
          'sõidu eesmärk ja sihtkoht (aadress), vajadusel marsruut;',
          'sõiduvahend;',
          'sõidu algus ja lõpp kuupäeva ja kellaajaga – nende järgi arvutatakse päevarahad;',
          'välisreisil riik või piirkond, kus lähetusööpäev lõppes;',
          'kilomeetrihüvitise puhul sõidetud kilomeetrid ja hind kilomeetri kohta (seda nõuab ennakkoperintäasetus, 17 §).',
        ] },
        { t: 'p', x: 'Aruandesse märgitakse ka taotletavad päevarahad või toiduhüvitis ning reisil saadud tasuta toidukorrad, mis vähendavad päevaraha. Aruande võib koostada elektroonilises rakenduses ja allkirjastada elektrooniliselt.' },
        { t: 'h2', x: 'Omast rahast makstud tšekid' },
        { t: 'p', x: 'Kui maksite rongipileti, hotelli või parkimise oma kaardiga, lisage tšekk lähetusaruandele. Ettevõte hüvitab need kulud maksuvabalt tšekil oleva tegeliku summa järgi: pileti vedaja dokumendi ja majutuse majutusasutuse arve järgi. E-lennupileti puhul lisatakse kinnitus, millel on näha hind. Kui kulu kohta dokumenti ei saa, näiteks mõne parkimistasu puhul, kinnitate summa allkirjastatud aruandega.' },
        { t: 'p', x: 'Aruanne koos tšekkidega on ettevõtte raamatupidamise dokument. Seda säilitatakse vähemalt kuus aastat selle aasta lõpust, mil majandusaasta lõppes, nii et seda saab vaevata vaadata – paberil või elektrooniliselt.' },
        { t: 'h2', x: 'Maksuvabad piirmäärad 2026' },
        { t: 'ul', items: [
          'kilomeetrihüvitis oma autoga 0,55 €/km, lisaks 4 senti/km iga sama tööasjaga seotud kaassõitja eest;',
          'osaline päevaraha (osapäiväraha) 25 €, kui sõit kestab üle 6 tunni;',
          'täispäevaraha (kokopäiväraha) 54 €, kui sõit kestab üle 10 tunni;',
          'toiduhüvitis (ateriakorvaus) 13,50 €, kui päevaraha ei maksta ja töö tõttu ei saa süüa tavapärases söögikohas;',
          'päevaraha eeldus: töökoht on üle 15 km kaugusel kohast, kust sõit algas – põhitöökohast või kodust (ja mõlemast üle 5 km).',
        ] },
        { t: 'p', x: 'Mitmepäevasel sõidul annab iga täis 24-tunnine lähetusööpäev täispäevaraha ning viimase täisööpäeva ületava aja eest makstakse 25 € (vähemalt 2 tundi) või 54 € (üle 6 tunni). Kui saate mõnel ööpäeval kaks tasuta toidukorda (osalise päevaraha puhul ühe), vähendatakse päevaraha poole võrra.' },
        { t: 'h2', x: 'Väljamakse ja Tulorekisteri' },
        { t: 'p', x: 'Ettevõte kannab hüvitise kinnitatud aruande alusel töötaja või omaniku kontole. Maksuvabad päevarahad, kilomeetrihüvitised ja toiduhüvitised teatatakse Tulorekisterisse tululiikidega Päiväraha (331), Kilometrikorvaus (verovapaa) (311) ja Ateriakorvaus (303) hiljemalt väljamaksekuule järgneva kuu 5. kuupäevaks; kuu maksed võib esitada ühe teatisega. Majutushüvitist ja vedaja dokumendil (näiteks rongipiletil) põhinevat hüvitist ei teatata. Piirmäära ületav osa on maksustatav palk.' },
        { t: 'h2', x: 'Osaühingu omanik ja FIE' },
        { t: 'p', x: 'Osaühing võib maksta omanikule ettevõtte asjus tehtud sõitude eest maksuvabu hüvitisi samadel tingimustel kui töötajale, isegi kui ta palka ei võta. Tingimus on lähetusaruanne ettevõtte raamatupidamisse ning hüvitised teatatakse Tulorekisterisse samade tululiikidega.' },
        { t: 'p', x: 'FIE (toiminimi) ei saa maksta endale maksuvaba päevaraha ega kilomeetrihüvitist. Selle asemel teeb ta vastava mahaarvamise maksudeklaratsioonis ning oma autoga tehtud sõitude mahaarvamine eeldab sõidupäevikut (ajopäiväkirja) või muud usaldusväärset tõendit. Täpsemalt meie juhendis „Kilomeetrihüvitis, päevaraha ja toiduhüvitis Soomes 2026”.' },
        { t: 'h2', x: 'Näide' },
        { t: 'p', x: 'Töötaja sõidab oma autoga kliendi juurde Tamperesse: väljasõit esmaspäeval kell 8.00, tagasi teisipäeval kell 17.00, kokku 360 km. Hotelli 95 € maksab ta oma kaardiga. Sõit kestab 33 tundi: esimesed 24 tundi annavad 54 € ja ülejäänud 9 tundi veel 54 €. Aruandes: päevarahad 108 €, kilomeetrihüvitis 360 × 0,55 = 198 €, hotell tšeki järgi 95 €, kokku 401 € maksuvabalt. Tulorekisterisse teatatakse 108 € ja 198 €, hotelli mitte.' },
        { t: 'note', x: 'Alates 1.1.2027 on piirmäärad 0,58 €/km, täispäevaraha 55 €, osaline päevaraha 25 € ja toiduhüvitis 13,75 € (Vero otsus 23.10.2026).' },
        { t: 'links', items: [
          { label: 'Vero: lähetuskulude hüvitiste otsus 2026 (soome keeles)', href: SRC.decision2026 },
          { label: 'Vero: otsus 2027 (soome keeles)', href: SRC.decision2027 },
          { label: 'Vero: Työmatkakustannusten korvaukset verotuksessa, ptk 13 Matkalasku', href: SRC.guide48013 },
          { label: 'Vero: Kilometrikorvaus ja päiväraha', href: SRC.allowances },
          { label: 'Tulorekisteri: Kustannusten korvaukset', href: SRC.incomes },
          { label: 'Finlex: Tuloverolaki 1535/1992, 71 §', href: SRC.tvl },
          { label: 'Finlex: Kirjanpitolaki 1336/1997, 2 luku 10 §', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Küsimused ilma lisatasuta' },
        { t: 'p', x: 'Debit Crediti kliendid saavad sellistele küsimustele vastuse ilma lisatasuta; raamatupidaja suhtleb soome ja vene keeles.' },
      ],
      faq: [
        { q: 'Kas aruandele tuleb lisada originaaltšekk?', a: 'Aruandele lisatakse tšekk või muu tõend ning seda säilitatakse raamatupidamise dokumendina vähemalt kuus aastat – paberil või elektrooniliselt. Kui dokumenti ei ole, kinnitatakse summa allkirjaga aruandel.' },
        { q: 'Kas osaühingu omanik saab maksuvaba päevaraha, kui ta palka ei võta?', a: 'Saab, kui sõit tehti ettevõtte asjus, Vero otsuse tingimused on täidetud ja sõidu kohta on ettevõtte raamatupidamisse esitatud lähetusaruanne. Hüvitis teatatakse Tulorekisterisse.' },
        { q: 'Mis juhtub, kui hüvitis ületab piirmäära?', a: 'Ületav osa on maksustatav palk ja sellelt peetakse kinni tulumaks nagu muult palgalt.' },
      ],
    },
    uk: {
      title: 'Як скласти звіт про відрядження (matkalasku) і додати чеки, оплачені власними грошима?',
      description: 'Matkalasku у 2026 році: що в ньому вказати, як повернути оплачені своєю карткою чеки без податку, 0,55 €/км, добові 54 € і 25 €, Tulorekisteri та приклад.',
      lead: 'У matkalasku вказують мету й місце поїздки, дату та час виїзду й повернення, транспорт і кілометри на власній машині, а до нього додають чеки за те, що ви оплатили самі. Фірма повертає чеки за фактичною сумою, а добові й кілометрові — у межах норм Vero, без податку: у 2026 році 0,55 €/км і 54 € за повну добу.',
      body: [
        { t: 'h2', x: 'Що має бути в matkalasku' },
        { t: 'p', x: 'За інструкцією Vero зі звіту про поїздку має бути видно:' },
        { t: 'ul', items: [
          'мету поїздки та місце призначення (адресу), за потреби маршрут;',
          'спосіб пересування (транспорт);',
          'дату й час початку та закінчення поїздки — за ними рахують добові;',
          'для поїздок за кордон — країну, де закінчилася остання доба поїздки;',
          'для кілометрових — скільки кілометрів проїхано і ставку за кілометр (цього вимагає ennakkoperintäasetus, 17 §).',
        ] },
        { t: 'p', x: 'У звіті також вказують запитані добові чи компенсацію харчування, а ще безкоштовне харчування в поїздці — воно зменшує добові. Звіт можна оформити в електронній програмі й підписати електронно.' },
        { t: 'h2', x: 'Чеки, оплачені власними грошима' },
        { t: 'p', x: 'Якщо ви оплатили потяг, готель чи паркування своєю карткою, додайте чек до matkalasku. Фірма повертає такі витрати без податку за фактичною сумою з чека: квиток — за документом перевізника, проживання — за рахунком готелю. До електронного авіаквитка додають підтвердження з ціною. Якщо документа немає зовсім, як у деяких паркувань, суму підтверджують підписом на matkalasku.' },
        { t: 'p', x: 'Звіт із чеками — документ бухгалтерії фірми. Його зберігають щонайменше шість років від кінця року, у якому закінчився фінансовий рік, так, щоб його можна було без труднощів переглянути, — на папері або в електронному вигляді.' },
        { t: 'h2', x: 'Норми без податку у 2026 році' },
        { t: 'ul', items: [
          'кілометрові на власній машині — 0,55 €/км, плюс 4 центи/км за кожного пасажира у тій самій справі;',
          'часткові добові (osapäiväraha) — 25 €, якщо поїздка триває понад 6 годин;',
          'повні добові (kokopäiväraha) — 54 €, якщо понад 10 годин;',
          'компенсація харчування (ateriakorvaus) — 13,50 €, якщо добові не платять і через роботу не можна поїсти у звичному місці;',
          'добові належать, якщо місце роботи далі ніж 15 км від місця, звідки почалася поїздка, — основного місця роботи чи дому (і далі ніж 5 км від обох).',
        ] },
        { t: 'p', x: 'У багатоденній поїздці кожні повні 24 години дають повні добові, а за час понад останню повну добу платять 25 € (щонайменше 2 години) або 54 € (понад 6 годин). Якщо в якусь добу ви отримали два безкоштовні прийоми їжі (для часткових — один), добові зменшуються вдвічі.' },
        { t: 'h2', x: 'Виплата і Tulorekisteri' },
        { t: 'p', x: 'Фірма переказує компенсацію на рахунок працівника чи власника за затвердженим matkalasku. Добові, кілометрові та компенсацію харчування без податку подають до Tulorekisteri кодами Päiväraha (331), Kilometrikorvaus (verovapaa) (311) і Ateriakorvaus (303) не пізніше 5-го числа наступного місяця; виплати за місяць можна подати одним звітом. Компенсацію проживання і повернення за документом перевізника (наприклад, квитка на потяг) не подають. Сума понад норму — оподатковувана зарплата.' },
        { t: 'h2', x: 'Власник Oy і власник toiminimi' },
        { t: 'p', x: 'Власникові Oy фірма може платити компенсації без податку за поїздки у справах фірми на тих самих умовах, що й працівнику, навіть якщо він не отримує зарплату. Умова — matkalasku до бухгалтерії фірми; до Tulorekisteri подають ті самі коди.' },
        { t: 'p', x: 'Власник toiminimi не може платити собі добові й кілометрові без податку: натомість він робить відрахування в податковій декларації, а для відрахування за поїздки власною машиною потрібен журнал поїздок (ajopäiväkirja) або інше надійне підтвердження. Детальніше — у нашій статті «Кілометрові, добові та компенсація харчування у Фінляндії у 2026 році».' },
        { t: 'h2', x: 'Приклад' },
        { t: 'p', x: 'Працівник їде власною машиною до клієнта в Тампере: виїзд у понеділок о 8:00, повернення у вівторок о 17:00, усього 360 км. Готель за 95 € він оплатив своєю карткою. Поїздка триває 33 години: перші 24 години дають 54 €, решта 9 годин — ще 54 €. За matkalasku: добові 108 €, кілометрові 360 × 0,55 = 198 €, готель за чеком 95 €, разом 401 € без податку. До Tulorekisteri подають 108 € і 198 €, готель — ні.' },
        { t: 'note', x: 'З 1.1.2027 норми: 0,58 €/км, повні добові 55 €, часткові 25 €, компенсація харчування 13,75 € (рішення Vero від 23.10.2026).' },
        { t: 'links', items: [
          { label: 'Vero: рішення про компенсації відряджень на 2026 рік', href: SRC.decision2026 },
          { label: 'Vero: рішення на 2027 рік', href: SRC.decision2027 },
          { label: 'Vero: Työmatkakustannusten korvaukset verotuksessa (розділ 13 — matkalasku)', href: SRC.guide48013 },
          { label: 'Vero: Kilometrikorvaus ja päiväraha', href: SRC.allowances },
          { label: 'Tulorekisteri: Kustannusten korvaukset', href: SRC.incomes },
          { label: 'Finlex: Tuloverolaki 1535/1992, 71 §', href: SRC.tvl },
          { label: 'Finlex: Kirjanpitolaki 1336/1997, 2 luku 10 §', href: SRC.kpl },
        ] },
        { t: 'h2', x: 'Питання про відрядження — без доплати' },
        { t: 'p', x: 'Клієнтам Debit Credit бухгалтер відповідає на такі питання без доплати, фінською або російською: як оформити matkalasku і які чеки до нього додати.' },
      ],
      faq: [
        { q: 'Чи потрібно додавати оригінал чека?', a: 'До matkalasku додають чек або інше підтвердження, і він зберігається як документ бухгалтерії щонайменше шість років — на папері або в електронному вигляді. Якщо документа немає, суму підтверджують підписом на звіті.' },
        { q: 'Чи отримує власник Oy добові без податку, якщо не платить собі зарплату?', a: 'Так, якщо поїздка була у справах фірми, умови рішення Vero виконано і до бухгалтерії фірми здано matkalasku. Виплату подають до Tulorekisteri.' },
        { q: 'Що буде, якщо компенсація більша за норму?', a: 'Частина понад норму — оподатковувана зарплата: з неї утримують податок, як зі звичайної зарплати.' },
      ],
    },
  },
};
