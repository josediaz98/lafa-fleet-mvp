// ============================================================
// LAFA i18n — Lightweight Translation Engine
// Requires: translations.js loaded first (window.LAFA_TRANSLATIONS)
// ============================================================

(function () {
  'use strict';

  // ---------- Language State ----------
  const STORAGE_KEY = 'lafa-lang';
  let currentLang = 'es';
  try { currentLang = localStorage.getItem(STORAGE_KEY) || 'es'; } catch (_) {}

  // ---------- Dictionary (from translations.js) ----------
  const I18N = window.LAFA_TRANSLATIONS || { es: {}, en: {} };

  // ---------- Translation Engine ----------
  function t(key, params) {
    let str = (I18N[currentLang] && I18N[currentLang][key]) || I18N.es[key] || key;
    if (params) {
      Object.keys(params).forEach(k => {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
      });
    }
    return str;
  }

  // ---------- DOM Sweep ----------
  function sweepDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
  }

  // ---------- Switch Language ----------
  function switchLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    document.documentElement.lang = lang;
    sweepDOM();
    updateToggleUI();
    window.dispatchEvent(new Event('langchange'));
  }

  // ---------- Toggle UI ----------
  function updateToggleUI() {
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
      const esBtn = toggle.querySelector('[data-lang="es"]');
      const enBtn = toggle.querySelector('[data-lang="en"]');
      if (esBtn && enBtn) {
        esBtn.className = `lang-btn cursor-pointer text-sm transition-colors ${currentLang === 'es' ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-300'}`;
        enBtn.className = `lang-btn cursor-pointer text-sm transition-colors ${currentLang === 'en' ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-300'}`;
      }
    });
  }

  function createToggleHTML() {
    return `<div class="lang-toggle flex items-center gap-1.5">
      <span class="lang-btn cursor-pointer text-sm ${currentLang === 'es' ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-300'} transition-colors" data-lang="es">ES</span>
      <span class="text-gray-600 text-xs">|</span>
      <span class="lang-btn cursor-pointer text-sm ${currentLang === 'en' ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-300'} transition-colors" data-lang="en">EN</span>
    </div>`;
  }

  function bindToggleEvents(container) {
    container.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => switchLang(btn.dataset.lang));
    });
  }

  // Insert toggle into a container element
  function initLangToggle(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = createToggleHTML();
    bindToggleEvents(containerEl);
  }

  // ---------- Local Field Helper (for bilingual data objects) ----------
  function localField(obj, field) {
    if (currentLang === 'en' && obj[field + '_en']) return obj[field + '_en'];
    return obj[field];
  }

  // ---------- Init ----------
  document.documentElement.lang = currentLang;

  // ---------- Export ----------
  window.I18N_LANG = currentLang;
  window.t = t;
  window.sweepDOM = sweepDOM;
  window.switchLang = switchLang;
  window.initLangToggle = initLangToggle;
  window.localField = localField;
  window.createLangToggleHTML = createToggleHTML;
  window.bindLangToggleEvents = bindToggleEvents;
  window.getLang = function () { return currentLang; };

  // Keep I18N_LANG in sync
  Object.defineProperty(window, 'I18N_LANG', {
    get() { return currentLang; },
    set(v) { if (v !== currentLang) switchLang(v); }
  });
})();
