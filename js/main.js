(() => {
  const LANG_KEY = 'byteme-lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'sv';

  const toggle = document.getElementById('langToggle');
  const translatable = document.querySelectorAll('[data-sv]');

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;

    toggle.textContent = lang === 'sv' ? 'EN' : 'SV';

    translatable.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;

      if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    });

    const title = lang === 'sv'
      ? 'Byteme AB – Medtech för logopedi'
      : 'Byteme AB – Medtech for speech therapy';
    document.title = title;
  }

  toggle.addEventListener('click', () => {
    applyLang(currentLang === 'sv' ? 'en' : 'sv');
  });

  applyLang(currentLang);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
