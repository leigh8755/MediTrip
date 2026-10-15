// MediTrip - service directory page (service.html?type=<service key>)
// Lists each region's institutions; content follows the selected language.

// Region labels for the service directory
const SERVICE_REGIONS = [
    { key: '北京', id: 'beijing', en: 'Beijing' },
    { key: '大湾区（内地九市）', id: 'gba', en: 'Greater Bay Area (Mainland)' },
    { key: '香港', id: 'hong-kong', en: 'Hong Kong' },
    { key: '海南', id: 'hainan', en: 'Hainan' }
];

document.addEventListener('DOMContentLoaded', () => {
    setupLanguageSwitcher();
    renderServicePage();
    syncHeaderOffset();
    // Header height changes with viewport width and once web fonts load
    new ResizeObserver(syncHeaderOffset).observe(document.querySelector('.header'));
    window.addEventListener('resize', syncHeaderOffset);
});

// Keep the sticky region nav just below the sticky site header
function syncHeaderOffset() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.region-nav');
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--region-nav-top', `${header ? header.offsetHeight : 0}px`);
    rootStyle.setProperty('--region-nav-height', `${nav ? nav.offsetHeight : 0}px`);
}

function getCurrentService() {
    const key = new URLSearchParams(window.location.search).get('type');
    return (window.MEDITRIP_SERVICE_DATA || []).find(item => item.key === key);
}

function renderServicePage() {
    const content = document.getElementById('service-page-content');
    const service = getCurrentService();
    if (!service) {
        content.innerHTML = `<h2 class="service-page-title">${escapeHtml(t('Service not found'))}</h2><p class="directory-note">${escapeHtml(t('Please choose a service from the home page.'))}</p>`;
        return;
    }
    content.innerHTML = renderServiceDirectory(service);
    document.title = `${pickLang(service.titleCn, service.titleEn)} - MediTrip`;
}

// Pick the field for the current language, falling back to the other one
function pickLang(cn, en) {
    return (currentLanguage === 'zh' ? (cn || en) : (en || cn)) || '';
}

function renderServiceDirectory(service) {
    const zh = currentLanguage === 'zh';
    const title = `<p class="service-kicker">${escapeHtml(t('Our Services'))}</p><h2 class="service-page-title">${escapeHtml(pickLang(service.titleCn, service.titleEn))}</h2>`;
    if (service.boao) {
        const facts = service.boao.facts.map(f => `<li>${escapeHtml(pickLang(f.cn, f.en))}</li>`).join('');
        const sources = service.boao.sources.map(s => {
            const [cn, en] = s.label.split(' / ');
            return `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(pickLang(cn, en))}</a>`;
        }).join('');
        return `${title}<p class="service-lead">${escapeHtml(pickLang(service.boao.leadCn, service.boao.leadEn))}</p><ul class="boao-facts">${facts}</ul><div class="service-sources"><h3>${escapeHtml(t('Official information'))}</h3>${sources}</div>`;
    }
    const regions = SERVICE_REGIONS.filter(region => service.records.some(r => r.region === region.key));
    const regionName = region => zh ? region.key : region.en;
    const nav = `<nav class="region-nav" aria-label="${escapeHtml(t('Regions'))}">${regions.map(region => `<a href="#${region.id}">${escapeHtml(regionName(region))}</a>`).join('')}</nav>`;
    const groups = regions.map(region => {
        const records = service.records.filter(r => r.region === region.key).sort((a, b) => a.rank - b.rank);
        const cards = records.map(r => {
            const link = r.website ? `<a class="institution-link" href="${escapeHtml(r.website)}" target="_blank" rel="noopener">${escapeHtml(t('Official website'))} ↗</a>` : '';
            const meta = [pickLang(r.locationCn, r.locationEn), pickLang(r.typeCn, r.typeEn)].filter(Boolean).map(v => `<span>${escapeHtml(v)}</span>`).join('');
            const intro = pickLang(r.introCn, r.introEn);
            return `<article class="institution-card"><div class="institution-rank">${String(r.rank).padStart(2,'0')}</div><div class="institution-main"><h4>${escapeHtml(pickLang(r.nameCn, r.nameEn))}</h4>${meta ? `<p class="institution-meta">${meta}</p>` : ''}${intro ? `<p class="institution-intro">${escapeHtml(intro)}</p>` : ''}${link}</div></article>`;
        }).join('');
        return `<section class="service-region" id="${region.id}"><h3>${escapeHtml(regionName(region))} <span>${escapeHtml(t('{count} institutions', { count: records.length }))}</span></h3><div class="institution-list">${cards}</div></section>`;
    }).join('');
    return `${title}<p class="directory-note">${escapeHtml(t('Institutions are presented by region. Confirm current departments, doctors, eligibility and appointment arrangements with the institution before travel.'))}</p>${nav}${groups}`;
}

function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

// Language switcher (same behaviour and storage key as the home page)
function setupLanguageSwitcher() {
    const customSelect = document.querySelector('.custom-select');
    const selectSelected = customSelect.querySelector('.select-selected');
    const selectItems = customSelect.querySelector('.select-items');

    selectSelected.addEventListener('click', e => {
        e.stopPropagation();
        selectItems.classList.toggle('select-hide');
        selectSelected.classList.toggle('select-arrow-active');
    });

    selectItems.querySelectorAll('div').forEach(option => {
        option.addEventListener('click', () => {
            const langCode = option.getAttribute('data-value');
            selectSelected.innerHTML = option.innerHTML;
            selectItems.classList.add('select-hide');
            selectSelected.classList.remove('select-arrow-active');
            applyTranslations(langCode);
            renderServicePage();
            syncHeaderOffset();
            localStorage.setItem('preferred_language', langCode);
        });
    });

    document.addEventListener('click', () => {
        selectItems.classList.add('select-hide');
        selectSelected.classList.remove('select-arrow-active');
    });

    // Restore saved language preference
    const savedLang = localStorage.getItem('preferred_language');
    const savedOption = selectItems.querySelector(`[data-value="${savedLang}"]`);
    if (savedOption) {
        selectSelected.innerHTML = savedOption.innerHTML;
        applyTranslations(savedLang);
    }
}
