/* ============================================================
   LANG.JS — Dogukan Ucer Dil Motoru
   Tüm sayfalar tarafından ortak kullanılır.
   ============================================================ */

const BLOG_I18N = {
  tr: {
    /* Nav */
    nav_home:        'Ana Sayfa',
    nav_articles:    'Makaleler',
    nav_about:       'Hakkında',

    /* Hero (index) */
    hero_prompt:     'root@0xblog:~# whoami',
    hero_title_line1:'Siber Güvenlik &amp; IT',
    hero_title_em:   'Teknik Blog',
    hero_desc:       'Penetrasyon testi, web uygulama güvenliği, Linux sistem analizi, CTF write-up\'ları ve ağ güvenliği üzerine pratik odaklı, derinlemesine teknik yazılar.',

    /* Sections */
    section_latest:  'Son Makaleler',
    section_about:   'Hakkında',
    filter_all:      'Tümü',

    /* About */
    about_text:      'Bu blog, siber güvenlik alanında edindiğim deneyimleri ve araştırmaları paylaşmak amacıyla oluşturulmuştur. Yazılar <strong>tamamen teknik ve uygulamalı</strong> içerik sunar; sadece kavramsal açıklamalarla yetinmez, gerçek araçlar ve payload örnekleriyle desteklenir.',

    /* Post card */
    read_more:       'Oku →',
    reading_min:     'dk okuma',
    tag_all:         'Tümü',

    /* Article page */
    breadcrumb_home:     'Ana Sayfa',
    breadcrumb_articles: 'Makaleler',
    back_to_articles:    '← Tüm Makaleler',
    last_updated:        'Son güncelleme:',

    /* Footer */
    footer_copy:     'Tüm içerikler eğitim amaçlıdır.',

    /* States */
    state_loading:   'Yükleniyor...',
    state_empty:     'Henüz makale yayınlanmamış.',
    state_error:     'Makaleler yüklenirken hata oluştu.',
    state_no_cat:    'Bu kategoride henüz makale yok.',
  },

  en: {
    /* Nav */
    nav_home:        'Home',
    nav_articles:    'Articles',
    nav_about:       'About',

    /* Hero */
    hero_prompt:     'root@0xblog:~# whoami',
    hero_title_line1:'Cybersecurity &amp; IT',
    hero_title_em:   'Technical Blog',
    hero_desc:       'In-depth technical articles on penetration testing, web application security, Linux system analysis, CTF write-ups and network security.',

    /* Sections */
    section_latest:  'Latest Articles',
    section_about:   'About',
    filter_all:      'All',

    /* About */
    about_text:      'This blog was created to share my experiences and research in cybersecurity. Articles are <strong>entirely technical and hands-on</strong> — backed by real tools and payload examples, not just conceptual explanations.',

    /* Post card */
    read_more:       'Read →',
    reading_min:     'min read',
    tag_all:         'All',

    /* Article page */
    breadcrumb_home:     'Home',
    breadcrumb_articles: 'Articles',
    back_to_articles:    '← All Articles',
    last_updated:        'Last updated:',

    /* Footer */
    footer_copy:     'All content is for educational purposes only.',

    /* States */
    state_loading:   'Loading...',
    state_empty:     'No articles published yet.',
    state_error:     'Failed to load articles.',
    state_no_cat:    'No articles in this category yet.',
  }
};

/* ── Aktif dili al ── */
function getLang() {
  return localStorage.getItem('blogLang') || 'tr';
}

/* ── Dil değiştir ── */
function setLang(lang) {
  localStorage.setItem('blogLang', lang);
  applyLang(lang);
}

/* ── t() — çeviri helper ── */
function t(key) {
  const lang = getLang();
  return (BLOG_I18N[lang] && BLOG_I18N[lang][key]) ||
         (BLOG_I18N['tr'][key]) || key;
}

/* ── Sayfadaki tüm [data-i18n] elementlerini güncelle ── */
function applyLang(lang) {
  lang = lang || getLang();
  const strings = BLOG_I18N[lang] || BLOG_I18N['tr'];

  /* Statik metin elementleri */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) el.innerHTML = strings[key];
  });

  /* Makale içeriği blokları */
  document.querySelectorAll('.lang-block').forEach(el => {
    el.style.display = (el.dataset.lang === lang) ? '' : 'none';
  });

  /* Toggle butonlarını güncelle */
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
  });

  /* <html lang=""> attribute */
  document.documentElement.lang = lang;
}

/* ── Dil toggle butonlarını oluştur ── */
function renderLangToggle(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const lang = getLang();
  el.innerHTML = `
    <button class="lang-toggle-btn ${lang === 'tr' ? 'active' : ''}"
            data-lang="tr" onclick="setLang('tr')">TR</button>
    <span class="lang-toggle-sep">/</span>
    <button class="lang-toggle-btn ${lang === 'en' ? 'active' : ''}"
            data-lang="en" onclick="setLang('en')">EN</button>`;
}

/* ── Sayfa yüklenince otomatik uygula ── */
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  /* Toggle container varsa oluştur */
  if (document.getElementById('langToggleContainer')) {
    renderLangToggle('langToggleContainer');
  }
  applyLang(lang);
});
