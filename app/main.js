// Router and controls for Nippon by Numbers. Hash routes, no network:
//
//   #/                    overview dashboard
//   #/economy             the economy
//   #/people              the people
//   #/regions             prefectures table
//   #/indicator/<key>     one indicator in depth
//   #/sources             sources and methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { YEARS, SERIES, TRADE, PREFECTURES } from './data.js';
import { overview, economy, people, regions, indicator, sourcesPage, missing } from './views.js';

const app = document.getElementById('app');

const state = {
  year: 2024,
  chartType: 'bar',
  region: 'All regions',
  search: '',
  sortKey: 'population',
  sortDir: 'desc',
};

function route() {
  const hash = location.hash || '#/';
  const indicatorMatch = hash.match(/^#\/indicator\/([a-zA-Z]+)$/);
  if (indicatorMatch) return { page: 'indicator', key: indicatorMatch[1] };
  if (hash === '#/economy') return { page: 'economy' };
  if (hash === '#/people') return { page: 'people' };
  if (hash === '#/regions') return { page: 'regions' };
  if (hash === '#/sources') return { page: 'sources' };
  if (hash === '#/' || hash === '') return { page: 'overview' };
  return { page: 'missing' };
}

const TITLES = {
  overview: 'Nippon by Numbers — Japan in numbers, 2020–2024',
  economy: 'The economy | Nippon by Numbers',
  people: 'The people | Nippon by Numbers',
  regions: 'Prefectures | Nippon by Numbers',
  sources: 'Sources and methods | Nippon by Numbers',
  missing: 'Page not found | Nippon by Numbers',
};

function render() {
  window.__shotReady = false;
  const r = route();
  let html;
  if (r.page === 'overview') html = overview(state);
  else if (r.page === 'economy') html = economy(state);
  else if (r.page === 'people') html = people(state);
  else if (r.page === 'regions') html = regions(state);
  else if (r.page === 'sources') html = sourcesPage();
  else if (r.page === 'indicator') html = indicator(r.key, state);
  else html = missing();
  app.innerHTML = html;
  document.title = r.page === 'indicator' && SERIES[r.key]
    ? `${SERIES[r.key].label} | Nippon by Numbers`
    : (TITLES[r.page] || TITLES.missing);
  markNav(r.page);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function markNav(page) {
  document.querySelectorAll('nav a').forEach((a) => {
    const target = a.getAttribute('href');
    const on = (page === 'overview' && target === '#/')
      || (page === 'economy' && target === '#/economy')
      || (page === 'people' && target === '#/people')
      || (page === 'regions' && target === '#/regions')
      || (page === 'sources' && target === '#/sources');
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function downloadCsv(name, header, rows) {
  const lines = [header, ...rows].map((row) => row.map((cell) => {
    const text = String(cell);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }).join(','));
  const blob = new Blob([lines.join('\n') + '\n'], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function handleCsv(kind) {
  if (kind === 'trade') {
    downloadCsv('japan-trade-2020-2024.csv', ['Year', 'Exports (trillion yen)', 'Imports (trillion yen)'],
      TRADE.map((t) => [t.year, t.exports, t.imports]));
  } else if (kind === 'prefectures') {
    downloadCsv('japan-prefectures-2023.csv', ['Prefecture', 'Region', 'Capital', 'Population (thousands)', 'Density per km2', 'Area km2'],
      PREFECTURES.map((p) => [p.name, p.region, p.capital, p.population, p.density, p.area]));
  } else if (kind.startsWith('indicator-')) {
    const key = kind.slice('indicator-'.length);
    const s = SERIES[key];
    if (!s) return;
    downloadCsv(`japan-${key}-2020-2024.csv`, ['Year', s.label, s.unit],
      YEARS.map((y) => [y, s.values[y], s.unit]));
  }
}

// Controls are wired by delegation on #app, so they survive re-renders.
app.addEventListener('change', (event) => {
  const el = event.target;
  if (el.id === 'year-select') {
    state.year = Number(el.value);
    render();
  } else if (el.id === 'region-filter') {
    state.region = el.value;
    render();
    const input = document.getElementById('region-search');
    if (input) input.focus();
  }
});

app.addEventListener('input', (event) => {
  if (event.target.id === 'region-search') {
    state.search = event.target.value;
    const pos = event.target.selectionStart;
    render();
    const input = document.getElementById('region-search');
    if (input) {
      input.focus();
      input.setSelectionRange(pos, pos);
    }
  }
});

app.addEventListener('click', (event) => {
  const chartBtn = event.target.closest('[data-chart]');
  if (chartBtn) {
    state.chartType = chartBtn.getAttribute('data-chart');
    render();
    return;
  }
  const sortBtn = event.target.closest('[data-sort]');
  if (sortBtn) {
    const key = sortBtn.getAttribute('data-sort');
    if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    else {
      state.sortKey = key;
      state.sortDir = key === 'name' || key === 'region' || key === 'capital' ? 'asc' : 'desc';
    }
    render();
    return;
  }
  const csvBtn = event.target.closest('[data-download-csv]');
  if (csvBtn) {
    handleCsv(csvBtn.getAttribute('data-download-csv'));
  }
});

window.addEventListener('hashchange', render);
render();
