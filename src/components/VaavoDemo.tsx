import { useState, useEffect } from 'react';
import { useI18n, type Locale } from '../i18n/context';

// Auto-playing preview of the real Vaavo client portal — six phone screens that
// cycle on their own like a short video (login → dashboard → snap receipt →
// bank → chat with the accountant → languages). Recoloured to design A
// (ink #0E2A2E + brand #129A6A). The on-screen UI is localized to the page
// language — the real portal is multilingual, which is exactly what screen 6
// showcases. Proper nouns, sample amounts/dates and brand names stay as-is.

// ---------------------------------------------------------------------------
// Localized on-screen copy (follows the page locale)
// ---------------------------------------------------------------------------
interface ScreenStrings {
  platform: string;
  email: string;
  password: string;
  login: string;
  greeting: string;
  bankTx: string;
  vatStatus: string;
  messages: string;
  receipts: string;
  new3: string;
  missing2: string;
  addReceipt: string;
  snapOrChoose: string;
  sentToAccountant: string;
  booked: string;
  receiptBadge: string;
  pending: string;
  chatQ: string;
  chatA: string;
  accountant: string;
  settings: string;
  language: string;
}

const SCREEN: Record<Locale, ScreenStrings> = {
  fi: {
    platform: 'Taloushallintoalusta', email: 'Sähköposti', password: 'Salasana', login: 'Kirjaudu',
    greeting: 'Hei Maria!', bankTx: 'Pankkitapahtumat', vatStatus: 'ALV-tilanne', messages: 'Viestit',
    receipts: 'Tositteet', new3: '3 uutta', missing2: '2 puuttuu',
    addReceipt: 'Lisää kuitti', snapOrChoose: 'Kuvaa tai valitse kuitti', sentToAccountant: 'Kuitti lähetetty kirjanpitäjälle',
    booked: 'Kirjattu', receiptBadge: 'Kuitti', pending: 'Odottaa',
    chatQ: 'Onko ALV-ilmoitus lähetetty?', chatA: 'Kyllä, lähetetty 12.3. Seuraava eräpäivä 12.5.', accountant: 'Kirjanpitäjä',
    settings: 'Asetukset', language: 'Kieli',
  },
  ru: {
    platform: 'Платформа для бухгалтерии', email: 'Эл. почта', password: 'Пароль', login: 'Войти',
    greeting: 'Привет, Мария!', bankTx: 'Банковские операции', vatStatus: 'Статус ALV', messages: 'Сообщения',
    receipts: 'Документы', new3: '3 новых', missing2: '2 не хватает',
    addReceipt: 'Добавить чек', snapOrChoose: 'Сфотографируйте или выберите чек', sentToAccountant: 'Чек отправлен бухгалтеру',
    booked: 'Учтено', receiptBadge: 'Чек', pending: 'Ожидает',
    chatQ: 'Декларация по ALV отправлена?', chatA: 'Да, отправлена 12.3. Следующий срок 12.5.', accountant: 'Бухгалтер',
    settings: 'Настройки', language: 'Язык',
  },
  en: {
    platform: 'Accounting platform', email: 'Email', password: 'Password', login: 'Log in',
    greeting: 'Hi Maria!', bankTx: 'Bank transactions', vatStatus: 'VAT status', messages: 'Messages',
    receipts: 'Receipts', new3: '3 new', missing2: '2 missing',
    addReceipt: 'Add receipt', snapOrChoose: 'Snap or choose a receipt', sentToAccountant: 'Receipt sent to your accountant',
    booked: 'Booked', receiptBadge: 'Receipt', pending: 'Pending',
    chatQ: 'Has the VAT return been sent?', chatA: 'Yes, sent 12 Mar. Next due date 12 May.', accountant: 'Accountant',
    settings: 'Settings', language: 'Language',
  },
  et: {
    platform: 'Raamatupidamisplatvorm', email: 'E-post', password: 'Parool', login: 'Logi sisse',
    greeting: 'Tere, Maria!', bankTx: 'Pangatehingud', vatStatus: 'ALV staatus', messages: 'Sõnumid',
    receipts: 'Tšekid', new3: '3 uut', missing2: '2 puudu',
    addReceipt: 'Lisa tšekk', snapOrChoose: 'Pildista või vali tšekk', sentToAccountant: 'Tšekk saadetud raamatupidajale',
    booked: 'Kirjendatud', receiptBadge: 'Tšekk', pending: 'Ootel',
    chatQ: 'Kas ALV-deklaratsioon on saadetud?', chatA: 'Jah, saadetud 12.3. Järgmine tähtaeg 12.5.', accountant: 'Raamatupidaja',
    settings: 'Seaded', language: 'Keel',
  },
  uk: {
    platform: 'Платформа для бухгалтерії', email: 'Ел. пошта', password: 'Пароль', login: 'Увійти',
    greeting: 'Привіт, Маріє!', bankTx: 'Банківські операції', vatStatus: 'Статус ALV', messages: 'Повідомлення',
    receipts: 'Документи', new3: '3 нових', missing2: '2 бракує',
    addReceipt: 'Додати чек', snapOrChoose: 'Сфотографуйте або виберіть чек', sentToAccountant: 'Чек відправлено бухгалтеру',
    booked: 'Враховано', receiptBadge: 'Чек', pending: 'Очікує',
    chatQ: 'Декларацію з ALV відправлено?', chatA: 'Так, відправлено 12.3. Наступний термін 12.5.', accountant: 'Бухгалтер',
    settings: 'Налаштування', language: 'Мова',
  },
};

// ---------------------------------------------------------------------------
// Scoped keyframes (injected once via <style>)
// ---------------------------------------------------------------------------
const STYLES = `
@keyframes vdFadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes vdType{from{width:0}to{width:100%}}
@keyframes vdPress{0%{transform:scale(1)}50%{transform:scale(.92)}100%{transform:scale(1)}}
.vd-in{animation:vdFadeInUp .5s ease-out both}
.vd-d1{animation-delay:.15s}.vd-d2{animation-delay:.35s}.vd-d3{animation-delay:.55s}
.vd-d4{animation-delay:.75s}.vd-d5{animation-delay:1s}.vd-d6{animation-delay:1.4s}
.vd-type{overflow:hidden;white-space:nowrap;animation:vdType 1.2s steps(18) .4s both}
.vd-press{animation:vdPress .4s ease-in-out 1.6s both}
@media (prefers-reduced-motion: reduce){
  .vd-in,.vd-type,.vd-press{animation:none}
  .vd-type{width:auto}
}
`;

// ---------------------------------------------------------------------------
// Screen 1 — Login
// ---------------------------------------------------------------------------
function S1({ s }: { s: ScreenStrings }) {
  return (
    <div className="h-full bg-gradient-to-b from-ink-900 to-ink-800 flex flex-col items-center justify-center px-5">
      <div className="text-white text-2xl font-bold mb-0.5 vd-in">Vaavo</div>
      <div className="text-white/60 text-[10px] mb-7 vd-in vd-d1">{s.platform}</div>
      <div className="w-full bg-white/10 rounded-lg p-2.5 mb-2.5 vd-in vd-d2">
        <div className="text-white/50 text-[9px] mb-0.5">{s.email}</div>
        <div className="text-white text-xs font-mono vd-type">maria@example.fi</div>
      </div>
      <div className="w-full bg-white/10 rounded-lg p-2.5 mb-4 vd-in vd-d3">
        <div className="text-white/50 text-[9px] mb-0.5">{s.password}</div>
        <div className="text-white text-xs tracking-wider">••••••••</div>
      </div>
      <div className="w-full bg-brand-500 text-white font-semibold py-2 rounded-lg text-xs text-center vd-in vd-d4 vd-press">
        {s.login}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 2 — Dashboard
// ---------------------------------------------------------------------------
function S2({ s }: { s: ScreenStrings }) {
  const cards = [
    { label: s.bankTx, value: s.new3, cls: 'text-brand-700 bg-brand-50' },
    { label: s.vatStatus, value: '1 245,00 €', cls: 'text-ink-900' },
    { label: s.messages, value: '1', cls: 'text-brand-700 bg-brand-50' },
    { label: s.receipts, value: s.missing2, cls: 'text-amber-600' },
  ];
  return (
    <div className="h-full bg-canvas flex flex-col">
      <div className="bg-ink-900 text-white px-4 pt-8 pb-3">
        <div className="text-base font-semibold vd-in">{s.greeting}</div>
        <div className="text-white/60 text-[10px] vd-in vd-d1">Creative Design Oy</div>
      </div>
      <div className="flex-1 px-3 py-2.5 space-y-1.5">
        {cards.map((c, i) => (
          <div key={i} className={`bg-white rounded-xl p-2.5 shadow-sm border border-ink-900/10 vd-in vd-d${i + 1}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-ink-700/60">{c.label}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${c.cls}`}>{c.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 3 — Camera / Upload
// ---------------------------------------------------------------------------
function S3({ s }: { s: ScreenStrings }) {
  return (
    <div className="h-full bg-canvas flex flex-col">
      <div className="bg-ink-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">{s.addReceipt}</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center mb-3 vd-in vd-press">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="text-[11px] text-ink-700/40 mb-5 vd-in vd-d2">{s.snapOrChoose}</div>
        <div className="w-full bg-white rounded-xl border border-ink-900/10 p-2.5 shadow-sm vd-in vd-d3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-11 bg-ink-900/5 rounded flex items-center justify-center text-ink-700/40 text-[9px] shrink-0">JPG</div>
            <div>
              <div className="text-[11px] font-medium text-ink-900">kuitti_2025_03.jpg</div>
              <div className="text-[9px] text-ink-700/40">23,45 € · K-Market</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3 vd-in vd-d5">
          <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          <span className="text-[10px] text-brand-600 font-medium">{s.sentToAccountant}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 4 — Bank transactions
// ---------------------------------------------------------------------------
function S4({ s }: { s: ScreenStrings }) {
  const txns = [
    { name: 'Telia Finland', amount: '−29,90 €', badge: s.booked, bc: 'bg-brand-50 text-brand-700' },
    { name: 'K-Market', amount: '−23,45 €', badge: s.receiptBadge, bc: 'bg-amber-50 text-amber-600' },
    { name: 'Asiakas Oy', amount: '+2 500,00 €', badge: s.pending, bc: 'bg-ink-900/5 text-ink-700/60', pos: true },
    { name: 'Wolt', amount: '−12,90 €', badge: s.booked, bc: 'bg-brand-50 text-brand-700' },
  ];
  return (
    <div className="h-full bg-canvas flex flex-col">
      <div className="bg-ink-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">{s.bankTx}</div>
      </div>
      <div className="px-3 py-2.5">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-ink-900/10 mb-2.5 vd-in">
          <div className="text-[9px] text-ink-700/40">S-Pankki ···4521</div>
          <div className="text-base font-bold text-ink-900 mt-0.5">12 450,00 €</div>
        </div>
        <div className="space-y-1.5">
          {txns.map((tx, i) => (
            <div key={i} className={`bg-white rounded-lg p-2 border border-ink-900/10 flex items-center justify-between vd-in vd-d${i + 1}`}>
              <div>
                <div className="text-[11px] font-medium text-ink-900">{tx.name}</div>
                <div className={`text-[10px] font-semibold mt-0.5 ${tx.pos ? 'text-brand-600' : 'text-ink-700/70'}`}>{tx.amount}</div>
              </div>
              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${tx.bc}`}>{tx.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 5 — Messages
// ---------------------------------------------------------------------------
function S5({ s }: { s: ScreenStrings }) {
  return (
    <div className="h-full bg-canvas flex flex-col">
      <div className="bg-ink-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">{s.messages}</div>
        <div className="text-[10px] text-white/60 vd-in vd-d1">Debit Credit</div>
      </div>
      <div className="flex-1 px-3 py-3 space-y-2">
        <div className="flex justify-end vd-in vd-d1">
          <div className="bg-brand-600 text-white rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]">
            <p className="text-[11px]">{s.chatQ}</p>
            <p className="text-[8px] text-white/70 text-right mt-0.5">14:32</p>
          </div>
        </div>
        <div className="flex vd-in vd-d3">
          <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 border border-ink-900/10">
            <div className="flex gap-1 items-center h-3">
              <div className="w-1 h-1 bg-ink-700/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-ink-700/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-ink-700/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        <div className="flex vd-in vd-d5">
          <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%] border border-ink-900/10">
            <p className="text-[11px] text-ink-900">{s.chatA}</p>
            <p className="text-[8px] text-ink-700/40 mt-0.5">14:33 · {s.accountant}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 6 — Language selector (current page language highlighted)
// ---------------------------------------------------------------------------
function S6({ s, locale }: { s: ScreenStrings; locale: Locale }) {
  const langs: { code: Locale; flag: string; name: string; label: string }[] = [
    { code: 'fi', flag: '🇫🇮', name: 'Suomi', label: 'Etusivu' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский', label: 'Главная' },
    { code: 'en', flag: '🇬🇧', name: 'English', label: 'Home' },
    { code: 'et', flag: '🇪🇪', name: 'Eesti', label: 'Avaleht' },
    { code: 'uk', flag: '🇺🇦', name: 'Українська', label: 'Головна' },
  ];
  return (
    <div className="h-full bg-canvas flex flex-col">
      <div className="bg-ink-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">{s.settings}</div>
      </div>
      <div className="px-3 py-3">
        <div className="bg-white rounded-xl p-3 border border-ink-900/10 vd-in">
          <div className="text-[9px] text-ink-700/40 mb-2">{s.language}</div>
          <div className="space-y-1">
            {langs.map((l, i) => (
              <div key={l.code} className={`flex items-center justify-between p-1.5 rounded-lg vd-in vd-d${Math.min(i + 1, 5)} ${l.code === locale ? 'bg-brand-50 border border-brand-200' : ''}`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{l.flag}</span>
                  <span className="text-[11px] font-medium text-ink-900">{l.name}</span>
                </div>
                <span className="text-[9px] text-ink-700/40">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SCREEN_COUNT = 6;
const DURATIONS = [2500, 4000, 4000, 4000, 3500, 3500];

function ScreenAt({ i, s, locale }: { i: number; s: ScreenStrings; locale: Locale }) {
  switch (i) {
    case 0: return <S1 s={s} />;
    case 1: return <S2 s={s} />;
    case 2: return <S3 s={s} />;
    case 3: return <S4 s={s} />;
    case 4: return <S5 s={s} />;
    default: return <S6 s={s} locale={locale} />;
  }
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function VaavoDemo() {
  const { t, locale } = useI18n();
  const [active, setActive] = useState(0);
  const s = SCREEN[locale];

  useEffect(() => {
    const id = setTimeout(() => setActive((p) => (p + 1) % SCREEN_COUNT), DURATIONS[active]);
    return () => clearTimeout(id);
  }, [active]);

  const steps = [
    t.vaavo.demo.step1, t.vaavo.demo.step2, t.vaavo.demo.step3,
    t.vaavo.demo.step4, t.vaavo.demo.step5, t.vaavo.demo.step6,
  ];

  return (
    <section className="bg-canvas border-y border-ink-900/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 text-center max-w-2xl mx-auto">
          {t.vaavo.cta}
        </h2>

        <style>{STYLES}</style>
        <div className="mt-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-14">
          {/* Phone mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] border-[3px] border-ink-900 rounded-[36px] overflow-hidden bg-white shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[22px] bg-ink-900 rounded-b-2xl z-10" />
              <div key={active} className="h-full">
                <ScreenAt i={active} s={s} locale={locale} />
              </div>
            </div>
            {/* Progress dots */}
            <div className="flex gap-2 mt-5 justify-center">
              {Array.from({ length: SCREEN_COUNT }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Screen ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-brand-500' : 'w-3 bg-ink-900/10 hover:bg-ink-900/20'}`}
                />
              ))}
            </div>
          </div>

          {/* Step descriptions */}
          <div className="w-full lg:w-auto lg:max-w-sm space-y-2 lg:pt-6">
            {steps.map((step, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                  i === active ? 'bg-brand-50 border-l-4 border-brand-600' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <p className="font-semibold text-sm text-ink-900">{step.title}</p>
                <p className="text-xs text-ink-700/60 mt-0.5">{step.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
