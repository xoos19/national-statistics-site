// One view function per page. Views return HTML strings; main.js renders
// them into #app and wires the controls. All figures come from data.js.

import { YEARS, COUNTRY, SERIES, AGE_STRUCTURE, TRADE, SECTORS, ENERGY_MIX, PREFECTURES, SOCIETY, SOURCES, formatValue, yearChange } from './data.js';
import { barChart, lineChart, shareBars } from './charts.js';

function sourceLine(source) {
  return `<p class="source">Source: ${source}</p>`;
}

function changeBadge(key, year) {
  const c = yearChange(key, year);
  if (c === null) return '<span class="change flat">first year shown</span>';
  const arrow = c > 0.05 ? '▲' : c < -0.05 ? '▼' : '—';
  const cls = c > 0.05 ? 'up' : c < -0.05 ? 'down' : 'flat';
  const sign = c > 0 ? '+' : '';
  return `<span class="change ${cls}">${arrow} ${sign}${c.toFixed(1)}% vs ${year - 1}</span>`;
}

function kpiCard(key, year) {
  const s = SERIES[key];
  return `<a class="kpi" href="#/indicator/${key}">
    <span class="kpi-label">${s.label} · ${year}</span>
    <span class="kpi-value">${formatValue(key, year)}</span>
    <span class="kpi-unit">${s.unit}</span>
    ${changeBadge(key, year)}
  </a>`;
}

function yearPicker(year) {
  return `<label class="year-picker">Year
    <select id="year-select" aria-label="Choose year">${YEARS.map((y) => `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`).join('')}</select>
  </label>`;
}

export function overview(state) {
  const year = state.year;
  const gdpYears = YEARS.map(String);
  const gdpValues = YEARS.map((y) => SERIES.gdp.values[y]);
  const popValues = YEARS.map((y) => SERIES.population.values[y]);
  return `
  <section class="hero">
    <div>
      <p class="eyebrow">日本 · National statistics · ${YEARS[0]}–${YEARS[YEARS.length - 1]}</p>
      <h1>Japan in numbers</h1>
      <p class="lede">The population, the economy, the regions and daily life of the world's
      fourth-largest economy — every figure with its source and year, nothing estimated in secret.</p>
      <p class="hero-links"><a class="btn" href="#/economy">Explore the economy</a>
      <a class="btn ghost" href="#/people">Meet the people</a></p>
    </div>
    <div class="hero-facts">
      <dl>
        <div><dt>Capital</dt><dd>${COUNTRY.capital}</dd></div>
        <div><dt>Area</dt><dd>377,975 km²</dd></div>
        <div><dt>Prefectures</dt><dd>47</dd></div>
        <div><dt>Currency</dt><dd>Japanese yen</dd></div>
      </dl>
    </div>
  </section>

  <section class="toolbar">
    <h2>At a glance</h2>
    ${yearPicker(year)}
  </section>
  <section class="kpi-grid">
    ${kpiCard('population', year)}
    ${kpiCard('gdp', year)}
    ${kpiCard('gdpPerCapita', year)}
    ${kpiCard('lifeExpectancy', year)}
    ${kpiCard('unemployment', year)}
    ${kpiCard('inflation', year)}
  </section>
  ${sourceLine('Statistics Bureau of Japan; IMF World Economic Outlook 2024; World Bank 2023')}

  <section class="chart-grid">
    <article class="card">
      <h2><a href="#/indicator/gdp">GDP, 2020–2024</a></h2>
      <p class="card-sub">Trillion US dollars, nominal. The yen's slide after 2021 shrank the dollar figure.</p>
      ${lineChart({ labels: gdpYears, values: gdpValues, format: (v) => '$' + v.toFixed(2) + 'tn' })}
      ${sourceLine('IMF World Economic Outlook, 2024')}
    </article>
    <article class="card">
      <h2><a href="#/indicator/population">Population, 2020–2024</a></h2>
      <p class="card-sub">Millions of people. Japan has shrunk every year since 2009.</p>
      ${barChart({ labels: gdpYears, values: popValues, format: (v) => v.toFixed(1) + 'm' })}
      ${sourceLine('Statistics Bureau of Japan; World Bank, 2023')}
    </article>
  </section>

  <section class="card">
    <h2>Who lives where</h2>
    <p class="card-sub">The three largest prefectures hold more than one in four Japanese people.</p>
    ${shareBars(PREFECTURES.slice(0, 5).map((p) => ({ label: `${p.name} — ${(p.population / 1000).toFixed(1)}m people`, share: (p.population / SERIES.population.values[2024] / 10) })), { color: '#b3402e' })}
    <p><a href="#/regions">See all 12 prefectures in the table →</a></p>
  </section>

  <section class="card">
    <h2>Three things to know first</h2>
    <ol class="takeaways">
      <li><strong>The oldest rich country.</strong> Median age 49.9 years in 2024 and 29.3% of people aged 65 or over — the highest shares on earth.</li>
      <li><strong>Big economy, weak yen.</strong> Nominal GDP of $4.03 trillion in 2024 puts Japan fourth in the world, behind the United States, China and Germany.</li>
      <li><strong>Very low joblessness.</strong> Unemployment was 2.5% in 2024, among the lowest in the OECD, even as prices rose 2.7%.</li>
    </ol>
    ${sourceLine('United Nations World Population Prospects 2024; IMF 2024; Statistics Bureau of Japan')}
  </section>`;
}

export function economy(state) {
  const type = state.chartType;
  const labels = YEARS.map(String);
  const chart = type === 'line'
    ? lineChart({ labels, values: YEARS.map((y) => SERIES.gdp.values[y]), format: (v) => '$' + v.toFixed(2) + 'tn' })
    : barChart({ labels, values: YEARS.map((y) => SERIES.gdp.values[y]), format: (v) => '$' + v.toFixed(2) + 'tn' });
  const tradeRows = TRADE.map((t) => {
    const balance = (t.exports - t.imports).toFixed(1);
    const sign = balance > 0 ? '+' : '';
    return `<tr><td>${t.year}</td><td>¥${t.exports.toFixed(1)} tn</td><td>¥${t.imports.toFixed(1)} tn</td><td>${sign}¥${balance} tn</td></tr>`;
  }).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Section · Economy</p>
    <h1>The economy</h1>
    <p class="lede">Output, prices, jobs and trade — the five years that took Japan from the pandemic
    through the yen's long slide.</p>
  </section>

  <section class="card">
    <div class="card-head"><h2>GDP, 2020–2024</h2>
      <div class="toggle" role="group" aria-label="Chart type">
        <button type="button" data-chart="bar"${type === 'bar' ? ' aria-pressed="true" class="active"' : ''}>Bars</button>
        <button type="button" data-chart="line"${type === 'line' ? ' aria-pressed="true" class="active"' : ''}>Line</button>
      </div>
    </div>
    ${chart}
    ${sourceLine('IMF World Economic Outlook, 2024; World Bank, 2023')}
    <p>Real GDP grew in 2023 and 2024, but the nominal dollar figure fell because the yen
    weakened from about ¥104 to about ¥151 per dollar across the period.</p>
  </section>

  <section class="chart-grid">
    <article class="card">
      <h2>Prices and jobs</h2>
      <table class="data-table"><thead><tr><th>Year</th><th>Inflation</th><th>Unemployment</th></tr></thead>
      <tbody>${YEARS.map((y) => `<tr><td>${y}</td><td>${SERIES.inflation.values[y].toFixed(1)}%</td><td>${SERIES.unemployment.values[y].toFixed(1)}%</td></tr>`).join('')}</tbody></table>
      ${sourceLine('Statistics Bureau of Japan, CPI and Labour Force Survey')}
    </article>
    <article class="card">
      <h2>What Japan makes</h2>
      <p class="card-sub">Share of gross value added, 2023.</p>
      ${shareBars(SECTORS.map((s) => ({ label: s.sector, share: s.share })))}
      ${sourceLine('World Bank, World Development Indicators, 2023')}
    </article>
  </section>

  <section class="card">
    <h2>Trade in goods</h2>
    <p class="card-sub">Exports and imports in trillion yen. Japan ran a goods deficit in every year from 2021.</p>
    <table class="data-table"><thead><tr><th>Year</th><th>Exports</th><th>Imports</th><th>Balance</th></tr></thead>
    <tbody>${tradeRows}</tbody></table>
    ${sourceLine('Ministry of Finance, trade statistics, 2024')}
    <p><a class="btn ghost" href="#/sources" data-download-csv="trade">Download this table as CSV</a></p>
  </section>`;
}

export function people(state) {
  return `
  <section class="page-head">
    <p class="eyebrow">Section · People</p>
    <h1>The people</h1>
    <p class="lede">A shrinking, ageing population that lives longer than almost anywhere else on earth.</p>
  </section>

  <section class="toolbar"><h2>At a glance</h2>${yearPicker(state.year)}</section>
  <section class="kpi-grid">
    ${kpiCard('population', state.year)}
    ${kpiCard('medianAge', state.year)}
    ${kpiCard('fertility', state.year)}
    ${kpiCard('lifeExpectancy', state.year)}
  </section>
  ${sourceLine('Statistics Bureau of Japan; United Nations World Population Prospects 2024; Ministry of Health, Labour and Welfare, 2023')}

  <section class="chart-grid">
    <article class="card">
      <h2>Age structure, 2024</h2>
      <p class="card-sub">Share of the population in each age band.</p>
      ${shareBars(AGE_STRUCTURE.map((a) => ({ label: `${a.group} — ${a.people.toFixed(1)}m people`, share: a.share })), { color: '#b3402e' })}
      ${sourceLine('Statistics Bureau of Japan, population estimates, 2024')}
    </article>
    <article class="card">
      <h2>Life and health</h2>
      <table class="data-table"><tbody>
      ${SOCIETY.map((s) => `<tr><td>${s.label}</td><td><strong>${s.value}</strong> ${s.unit}</td></tr>`).join('')}
      </tbody></table>
      ${sourceLine('OECD Health Statistics 2024; OECD Education at a Glance 2024; World Bank 2023')}
    </article>
  </section>

  <section class="card">
    <h2>Births are falling fast</h2>
    ${barChart({ labels: YEARS.map(String), values: YEARS.map((y) => SERIES.fertility.values[y]), color: '#1d3a6e', format: (v) => v.toFixed(2) })}
    <p>Births fell below 730,000 in 2023, the fewest since records began in 1899, and the fertility
    rate of 1.20 is the lowest ever recorded. A rate of 2.1 children per woman would hold the
    population steady.</p>
    ${sourceLine('Ministry of Health, Labour and Welfare, vital statistics, 2023')}
  </section>`;
}

function sortedPrefectures(state) {
  let rows = PREFECTURES.slice();
  if (state.region !== 'All regions') rows = rows.filter((p) => p.region === state.region);
  if (state.search) {
    const q = state.search.toLowerCase();
    rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.region.toLowerCase().includes(q));
  }
  const key = state.sortKey;
  const dir = state.sortDir === 'desc' ? -1 : 1;
  rows.sort((a, b) => {
    if (key === 'name' || key === 'region' || key === 'capital') return a[key].localeCompare(b[key]) * dir;
    return (a[key] - b[key]) * dir;
  });
  return rows;
}

export function regions(state) {
  const rows = sortedPrefectures(state);
  const top = PREFECTURES.slice(0, 8);
  const sortBtn = (key, label) => `<button type="button" data-sort="${key}" class="sort-btn">${label}${state.sortKey === key ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</button>`;
  return `
  <section class="page-head">
    <p class="eyebrow">Section · Regions</p>
    <h1>Prefectures</h1>
    <p class="lede">Japan's 47 prefectures, from Hokkaido's wide empty north to Tokyo's 6,428 people
    per square kilometre. The table below shows the twelve largest by population.</p>
  </section>

  <section class="card">
    <h2>Largest prefectures</h2>
    ${barChart({ labels: top.map((p) => p.name), values: top.map((p) => p.population / 1000), color: '#b3402e', format: (v) => v.toFixed(1) + 'm' })}
    ${sourceLine('Statistics Bureau of Japan, population estimates, 2023')}
  </section>

  <section class="card">
    <div class="filters">
      <label>Search <input id="region-search" type="search" placeholder="Prefecture, capital or region" value="${state.search.replace(/"/g, '&quot;')}" aria-label="Search prefectures"></label>
      <label>Region
        <select id="region-filter" aria-label="Filter by region">
          ${['All regions', 'Hokkaido', 'Kanto', 'Chubu', 'Kansai', 'Chugoku', 'Kyushu'].map((r) => `<option${r === state.region ? ' selected' : ''}>${r}</option>`).join('')}
        </select>
      </label>
      <p class="filter-count" role="status">${rows.length} of ${PREFECTURES.length} prefectures shown</p>
    </div>
    <div class="table-wrap">
    <table class="data-table"><thead><tr>
      <th>${sortBtn('name', 'Prefecture')}</th>
      <th>${sortBtn('region', 'Region')}</th>
      <th>${sortBtn('capital', 'Capital city')}</th>
      <th>${sortBtn('population', 'Population (thousands)')}</th>
      <th>${sortBtn('density', 'People per km²')}</th>
      <th>${sortBtn('area', 'Area (km²)')}</th>
    </tr></thead>
    <tbody>
    ${rows.length ? rows.map((p) => `<tr><td><strong>${p.name}</strong></td><td>${p.region}</td><td>${p.capital}</td><td>${p.population.toLocaleString('en-US')}</td><td>${p.density.toLocaleString('en-US')}</td><td>${p.area.toLocaleString('en-US')}</td></tr>`).join('') : '<tr><td colspan="6">No prefecture matches that search. Try another name.</td></tr>'}
    </tbody></table>
    </div>
    ${sourceLine('Statistics Bureau of Japan, population estimates, 2023. Density and area from prefectural statistics.')}
    <p><button type="button" class="btn ghost" data-download-csv="prefectures">Download this table as CSV</button></p>
  </section>`;
}

export function indicator(key, state) {
  const s = SERIES[key];
  if (!s) return missing();
  const values = YEARS.map((y) => s.values[y]);
  const fmt = (v) => {
    if (key === 'gdp') return '$' + v.toFixed(2) + 'tn';
    if (key === 'gdpPerCapita') return '$' + Math.round(v).toLocaleString('en-US');
    if (key === 'population') return v.toFixed(1) + 'm';
    if (key === 'unemployment' || key === 'inflation') return v.toFixed(1) + '%';
    if (key === 'fertility') return v.toFixed(2);
    return v.toFixed(1);
  };
  return `
  <section class="page-head">
    <p class="eyebrow">Indicator · ${s.short}</p>
    <h1>${s.label}</h1>
    <p class="lede">${s.note}</p>
  </section>
  <section class="card">
    <h2>${s.label}, 2020–2024</h2>
    <p class="card-sub">${s.unit}</p>
    ${lineChart({ labels: YEARS.map(String), values, format: fmt })}
    ${sourceLine(s.source)}
    <table class="data-table"><thead><tr><th>Year</th><th>Value</th><th>Change</th></tr></thead>
    <tbody>${YEARS.map((y) => {
    const c = yearChange(key, y);
    return `<tr><td>${y}</td><td><strong>${formatValue(key, y)}</strong></td><td>${c === null ? '—' : (c > 0 ? '+' : '') + c.toFixed(1) + '%'}</td></tr>`;
  }).join('')}</tbody></table>
    <p><button type="button" class="btn ghost" data-download-csv="indicator-${key}">Download this series as CSV</button></p>
  </section>
  <p><a href="#/">← Back to the overview</a></p>`;
}

export function sourcesPage() {
  return `
  <section class="page-head">
    <p class="eyebrow">About this site</p>
    <h1>Sources and methods</h1>
    <p class="lede">Every figure on this site comes from one of the publications below. Figures are
    rounded for display; the underlying values are the publishers' latest revised figures as of November 2026.</p>
  </section>
  <section class="card">
    <h2>Sources</h2>
    <table class="data-table"><thead><tr><th>Publisher</th><th>What we used</th><th>Year</th></tr></thead>
    <tbody>${SOURCES.map((s) => `<tr><td><strong>${s.publisher}</strong></td><td>${s.what}</td><td>${s.year}</td></tr>`).join('')}</tbody></table>
  </section>
  <section class="card">
    <h2>Methods and notes</h2>
    <ul class="notes">
      <li>Nominal GDP in US dollars uses each year's market exchange rate, so it moves with the yen.</li>
      <li>Population figures are the Statistics Bureau's estimates for 1 October of each year.</li>
      <li>Prefecture populations are 2023 estimates; the table shows the twelve largest prefectures.</li>
      <li>Energy shares are for electricity generation in fiscal 2023 and sum to 100% after rounding.</li>
      <li>This site is an independent presentation of public statistics. It is not affiliated with the Statistics Bureau of Japan, the IMF, the World Bank or the OECD.</li>
    </ul>
  </section>
  <section class="card">
    <h2>Energy mix, 2023</h2>
    ${shareBars(ENERGY_MIX.map((e) => ({ label: e.source, share: e.share })))}
    ${sourceLine('Agency for Natural Resources and Energy, 2023')}
  </section>`;
}

export function missing() {
  return `<section class="page-head"><h1>Page not found</h1>
  <p class="lede">That page is not part of this site. Try one of the sections below.</p>
  <p><a class="btn" href="#/">Back to the overview</a></p></section>`;
}
