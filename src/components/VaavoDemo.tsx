import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/context';

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
`;

// ---------------------------------------------------------------------------
// Screen 1 — Login
// ---------------------------------------------------------------------------
function S1() {
  return (
    <div className="h-full bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col items-center justify-center px-5">
      <div className="text-white text-2xl font-bold mb-0.5 vd-in">Vaavo</div>
      <div className="text-blue-200 text-[10px] mb-7 vd-in vd-d1">Taloushallintoalusta</div>
      <div className="w-full bg-white/10 rounded-lg p-2.5 mb-2.5 vd-in vd-d2">
        <div className="text-blue-300 text-[9px] mb-0.5">Sähköposti</div>
        <div className="text-white text-xs font-mono vd-type">maria@example.fi</div>
      </div>
      <div className="w-full bg-white/10 rounded-lg p-2.5 mb-4 vd-in vd-d3">
        <div className="text-blue-300 text-[9px] mb-0.5">Salasana</div>
        <div className="text-white text-xs tracking-wider">••••••••</div>
      </div>
      <div className="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg text-xs text-center vd-in vd-d4 vd-press">
        Kirjaudu
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 2 — Dashboard
// ---------------------------------------------------------------------------
function S2() {
  const cards = [
    { label: 'Pankkitapahtumat', value: '3 uutta', cls: 'text-blue-600 bg-blue-50' },
    { label: 'ALV-tilanne', value: '1 245,00 €', cls: 'text-gray-900' },
    { label: 'Viestejä', value: '1', cls: 'text-teal-600 bg-teal-50' },
    { label: 'Tositteet', value: '2 puuttuu', cls: 'text-amber-600' },
  ];
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-blue-900 text-white px-4 pt-8 pb-3">
        <div className="text-base font-semibold vd-in">Hei Maria!</div>
        <div className="text-blue-200 text-[10px] vd-in vd-d1">Creative Design Oy</div>
      </div>
      <div className="flex-1 px-3 py-2.5 space-y-1.5">
        {cards.map((c, i) => (
          <div key={c.label} className={`bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 vd-in vd-d${i + 1}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500">{c.label}</span>
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
function S3() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-blue-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">Lisää kuitti</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-3 vd-in vd-press">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="text-[11px] text-gray-400 mb-5 vd-in vd-d2">Kuvaa tai valitse kuitti</div>
        <div className="w-full bg-white rounded-xl border border-gray-200 p-2.5 shadow-sm vd-in vd-d3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-11 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-[9px] shrink-0">JPG</div>
            <div>
              <div className="text-[11px] font-medium text-gray-900">kuitti_2025_03.jpg</div>
              <div className="text-[9px] text-gray-400">23,45 € · K-Market</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3 vd-in vd-d5">
          <svg className="w-3.5 h-3.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          <span className="text-[10px] text-teal-600 font-medium">Kuitti lähetetty kirjanpitäjälle</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 4 — Bank transactions
// ---------------------------------------------------------------------------
function S4() {
  const txns = [
    { name: 'Telia Finland', amount: '\u221229,90 €', badge: 'Kirjattu', bc: 'bg-green-50 text-green-600' },
    { name: 'K-Market', amount: '\u221223,45 €', badge: 'Kuitti', bc: 'bg-amber-50 text-amber-600' },
    { name: 'Asiakas Oy', amount: '+2 500,00 €', badge: 'Odottaa', bc: 'bg-blue-50 text-blue-600', pos: true },
    { name: 'Wolt', amount: '\u221212,90 €', badge: 'Kirjattu', bc: 'bg-green-50 text-green-600' },
  ];
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-blue-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">Pankkitapahtumat</div>
      </div>
      <div className="px-3 py-2.5">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-2.5 vd-in">
          <div className="text-[9px] text-gray-400">S-Pankki ···4521</div>
          <div className="text-base font-bold text-gray-900 mt-0.5">12 450,00 €</div>
        </div>
        <div className="space-y-1.5">
          {txns.map((tx, i) => (
            <div key={tx.name} className={`bg-white rounded-lg p-2 border border-gray-100 flex items-center justify-between vd-in vd-d${i + 1}`}>
              <div>
                <div className="text-[11px] font-medium text-gray-900">{tx.name}</div>
                <div className={`text-[10px] font-semibold mt-0.5 ${tx.pos ? 'text-green-600' : 'text-gray-600'}`}>{tx.amount}</div>
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
function S5() {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-blue-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">Viestit</div>
        <div className="text-[10px] text-blue-200 vd-in vd-d1">Debit Credit</div>
      </div>
      <div className="flex-1 px-3 py-3 space-y-2">
        <div className="flex justify-end vd-in vd-d1">
          <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]">
            <p className="text-[11px]">Onko ALV-ilmoitus lähetetty?</p>
            <p className="text-[8px] text-blue-200 text-right mt-0.5">14:32</p>
          </div>
        </div>
        <div className="flex vd-in vd-d3">
          <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 border border-gray-200">
            <div className="flex gap-1 items-center h-3">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        <div className="flex vd-in vd-d5">
          <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%] border border-gray-200">
            <p className="text-[11px] text-gray-900">Kyllä, lähetetty 12.3. Seuraava eräpäivä 12.5.</p>
            <p className="text-[8px] text-gray-400 mt-0.5">14:33 · Kirjanpitäjä</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen 6 — Language selector
// ---------------------------------------------------------------------------
function S6() {
  const langs = [
    { flag: '\ud83c\uddeb\ud83c\uddee', name: 'Suomi', label: 'Etusivu', active: true },
    { flag: '\ud83c\uddf7\ud83c\uddfa', name: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', label: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f' },
    { flag: '\ud83c\uddec\ud83c\udde7', name: 'English', label: 'Home' },
    { flag: '\ud83c\uddea\ud83c\uddea', name: 'Eesti', label: 'Avaleht' },
    { flag: '\ud83c\uddfa\ud83c\udde6', name: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430', label: '\u0413\u043e\u043b\u043e\u0432\u043d\u0430' },
  ];
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-blue-900 text-white px-4 pt-8 pb-3">
        <div className="text-sm font-semibold vd-in">Asetukset</div>
      </div>
      <div className="px-3 py-3">
        <div className="bg-white rounded-xl p-3 border border-gray-100 vd-in">
          <div className="text-[9px] text-gray-400 mb-2">Kieli / Language</div>
          <div className="space-y-1">
            {langs.map((l, i) => (
              <div key={l.name} className={`flex items-center justify-between p-1.5 rounded-lg vd-in vd-d${Math.min(i + 1, 5)} ${l.active ? 'bg-blue-50 border border-blue-200' : ''}`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{l.flag}</span>
                  <span className="text-[11px] font-medium text-gray-900">{l.name}</span>
                </div>
                <span className="text-[9px] text-gray-400">{l.label}</span>
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
const SCREENS = [S1, S2, S3, S4, S5, S6];
const DURATIONS = [2500, 4000, 4000, 4000, 3500, 3500];

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function VaavoDemo() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((p) => (p + 1) % SCREENS.length), DURATIONS[active]);
    return () => clearTimeout(id);
  }, [active]);

  const Screen = SCREENS[active];
  const steps = [
    t.vaavo.demo.step1, t.vaavo.demo.step2, t.vaavo.demo.step3,
    t.vaavo.demo.step4, t.vaavo.demo.step5, t.vaavo.demo.step6,
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
        {/* Phone mockup */}
        <div className="flex-shrink-0">
          <div className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] border-[3px] border-gray-800 rounded-[36px] overflow-hidden bg-white shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[22px] bg-gray-800 rounded-b-2xl z-10" />
            <div key={active} className="h-full">
              <Screen />
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex gap-2 mt-5 justify-center">
            {SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-accent-700' : 'w-3 bg-warm-200 hover:bg-warm-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Step descriptions */}
        <div className="w-full lg:w-auto lg:max-w-sm space-y-2 lg:pt-6">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                i === active ? 'bg-accent-50 border-l-4 border-accent-600' : 'opacity-40 hover:opacity-60'
              }`}
            >
              <p className="font-medium text-sm text-warm-900">{step.title}</p>
              <p className="text-xs text-warm-500 mt-0.5">{step.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
