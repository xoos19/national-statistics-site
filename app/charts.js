// Small SVG chart builders. No library, no network: every chart is drawn
// from the numbers in data.js and rendered as inline SVG.

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function niceMax(values) {
  const max = Math.max(...values);
  if (max <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

// Vertical bar chart. labels and values are parallel arrays.
export function barChart({ labels, values, width = 640, height = 260, color = '#b3402e', format = (v) => String(v) }) {
  const padL = 46;
  const padB = 30;
  const padT = 14;
  const innerW = width - padL - 12;
  const innerH = height - padT - padB;
  const max = niceMax(values);
  const slot = innerW / values.length;
  const barW = Math.min(46, slot * 0.62);
  let bars = '';
  let grid = '';
  for (let i = 0; i <= 4; i += 1) {
    const y = padT + innerH - (innerH * i) / 4;
    const gv = (max * i) / 4;
    grid += `<line x1="${padL}" y1="${y}" x2="${width - 12}" y2="${y}" stroke="#e3ddd2" stroke-width="1"/>`
      + `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b655a">${format(gv)}</text>`;
  }
  values.forEach((v, i) => {
    const h = (v / max) * innerH;
    const x = padL + slot * i + (slot - barW) / 2;
    const y = padT + innerH - h;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"/>`
      + `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#2b2620">${format(v)}</text>`
      + `<text x="${(x + barW / 2).toFixed(1)}" y="${(height - 10).toFixed(1)}" text-anchor="middle" font-size="11" fill="#6b655a">${esc(labels[i])}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" class="chart">${grid}${bars}</svg>`;
}

// Line chart with dots and value labels.
export function lineChart({ labels, values, width = 640, height = 260, color = '#1d3a6e', format = (v) => String(v) }) {
  const padL = 46;
  const padB = 30;
  const padT = 18;
  const innerW = width - padL - 12;
  const innerH = height - padT - padB;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = min - span * 0.25;
  const hi = max + span * 0.25;
  const xAt = (i) => padL + (innerW * i) / (values.length - 1);
  const yAt = (v) => padT + innerH - ((v - lo) / (hi - lo)) * innerH;
  let grid = '';
  for (let i = 0; i <= 3; i += 1) {
    const y = padT + (innerH * i) / 3;
    const gv = hi - ((hi - lo) * i) / 3;
    grid += `<line x1="${padL}" y1="${y}" x2="${width - 12}" y2="${y}" stroke="#e3ddd2" stroke-width="1"/>`
      + `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b655a">${format(gv)}</text>`;
  }
  const points = values.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
  let dots = '';
  values.forEach((v, i) => {
    dots += `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`
      + `<text x="${xAt(i).toFixed(1)}" y="${(yAt(v) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#2b2620">${format(v)}</text>`
      + `<text x="${xAt(i).toFixed(1)}" y="${(height - 10).toFixed(1)}" text-anchor="middle" font-size="11" fill="#6b655a">${esc(labels[i])}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart" class="chart">${grid}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Horizontal share bars, for parts of a whole (age structure, sectors, energy).
export function shareBars(rows, { color = '#1d3a6e' } = {}) {
  return rows.map((r) => {
    const pct = Math.max(0, Math.min(100, r.share));
    return `<div class="share-row"><div class="share-label">${esc(r.label)}</div>`
      + `<div class="share-track"><div class="share-fill" style="width:${pct.toFixed(1)}%;background:${color}"></div></div>`
      + `<div class="share-value">${pct.toFixed(1)}%</div></div>`;
  }).join('');
}
