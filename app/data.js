// Japan in numbers, 2020-2024. Every figure carries its source and year.
// Figures are rounded from the publications named in SOURCES; see #/sources
// for the full list and the notes on rounding and revisions.

export const YEARS = [2020, 2021, 2022, 2023, 2024];

export const COUNTRY = {
  name: 'Japan',
  japanese: '日本',
  capital: 'Tokyo',
  areaKm2: 377975,
  currency: 'Japanese yen (JPY)',
  government: 'Constitutional monarchy with a parliamentary government',
  regions: 8,
  prefectures: 47,
};

// Yearly national series. value is the headline number for that year.
export const SERIES = {
  gdp: {
    label: 'Gross domestic product',
    short: 'GDP',
    unit: 'trillion US dollars, nominal',
    source: 'IMF World Economic Outlook, 2024; World Bank, 2023',
    note: 'Nominal GDP in US dollars fell after 2021 as the yen weakened, even while real GDP grew.',
    values: { 2020: 5.06, 2021: 5.04, 2022: 4.26, 2023: 4.21, 2024: 4.03 },
  },
  gdpPerCapita: {
    label: 'GDP per person',
    short: 'GDP per capita',
    unit: 'US dollars, nominal',
    source: 'IMF World Economic Outlook, 2024',
    note: 'Nominal, so the yen exchange rate moves it more than living standards do.',
    values: { 2020: 40245, 2021: 39919, 2022: 34006, 2023: 33834, 2024: 32481 },
  },
  population: {
    label: 'Total population',
    short: 'Population',
    unit: 'millions of people',
    source: 'Statistics Bureau of Japan, population estimates; World Bank, 2023',
    note: 'Japan has lost population every year since 2009; the fall is about 0.5% a year.',
    values: { 2020: 125.8, 2021: 125.5, 2022: 125.1, 2023: 124.5, 2024: 124.0 },
  },
  unemployment: {
    label: 'Unemployment rate',
    short: 'Unemployment',
    unit: 'percent of the labour force',
    source: 'Statistics Bureau of Japan, Labour Force Survey',
    note: 'One of the lowest unemployment rates in the OECD through the whole period.',
    values: { 2020: 2.8, 2021: 2.8, 2022: 2.6, 2023: 2.6, 2024: 2.5 },
  },
  inflation: {
    label: 'Consumer price inflation',
    short: 'Inflation (CPI)',
    unit: 'percent, year on year',
    source: 'Statistics Bureau of Japan, Consumer Price Index',
    note: 'After decades near zero, prices rose 3.3% in 2023, the fastest since 1982.',
    values: { 2020: 0.0, 2021: -0.2, 2022: 2.5, 2023: 3.3, 2024: 2.7 },
  },
  lifeExpectancy: {
    label: 'Life expectancy at birth',
    short: 'Life expectancy',
    unit: 'years',
    source: 'World Bank, World Development Indicators, 2023; Ministry of Health, Labour and Welfare',
    note: 'Among the longest in the world; women 87.1 years and men 81.1 years in 2023.',
    values: { 2020: 84.6, 2021: 84.0, 2022: 84.0, 2023: 84.0, 2024: 84.1 },
  },
  fertility: {
    label: 'Total fertility rate',
    short: 'Fertility rate',
    unit: 'children per woman',
    source: 'Ministry of Health, Labour and Welfare, vital statistics, 2023',
    note: 'The 2023 rate of 1.20 is the lowest ever recorded in Japan.',
    values: { 2020: 1.33, 2021: 1.30, 2022: 1.26, 2023: 1.20, 2024: 1.20 },
  },
  medianAge: {
    label: 'Median age',
    short: 'Median age',
    unit: 'years',
    source: 'United Nations, World Population Prospects 2024',
    note: 'The highest median age of any large country in the world.',
    values: { 2020: 48.4, 2021: 48.8, 2022: 49.1, 2023: 49.5, 2024: 49.9 },
  },
};

// Age structure, 2024, percent of population. Source: Statistics Bureau of Japan.
export const AGE_STRUCTURE = [
  { group: 'Aged 0-14', share: 11.2, people: 13.9 },
  { group: 'Aged 15-64', share: 59.5, people: 73.8 },
  { group: 'Aged 65 and over', share: 29.3, people: 36.3 },
];

// Trade in goods, trillion yen. Source: Ministry of Finance, trade statistics.
export const TRADE = [
  { year: 2020, exports: 68.4, imports: 68.0 },
  { year: 2021, exports: 83.1, imports: 84.8 },
  { year: 2022, exports: 98.2, imports: 118.2 },
  { year: 2023, exports: 100.9, imports: 110.2 },
  { year: 2024, exports: 107.9, imports: 112.9 },
];

// Share of gross value added, 2023. Source: World Bank, World Development Indicators.
export const SECTORS = [
  { sector: 'Services', share: 70.2 },
  { sector: 'Industry', share: 28.7 },
  { sector: 'Agriculture, forestry and fishing', share: 1.1 },
];

// Electricity generation mix, 2023, percent. Source: Agency for Natural Resources and Energy.
export const ENERGY_MIX = [
  { source: 'Liquefied natural gas', share: 33.8 },
  { source: 'Coal', share: 32.4 },
  { source: 'Renewables', share: 22.9 },
  { source: 'Nuclear', share: 8.5 },
  { source: 'Oil and other', share: 2.4 },
];

// The ten most populous prefectures, 2023. Population in thousands.
// Source: Statistics Bureau of Japan, population estimates, 2023.
export const PREFECTURES = [
  { name: 'Tokyo', region: 'Kanto', capital: 'Shinjuku', population: 14100, density: 6428, area: 2194 },
  { name: 'Kanagawa', region: 'Kanto', capital: 'Yokohama', population: 9230, density: 3822, area: 2416 },
  { name: 'Osaka', region: 'Kansai', capital: 'Osaka', population: 8800, density: 4623, area: 1905 },
  { name: 'Aichi', region: 'Chubu', capital: 'Nagoya', population: 7500, density: 1452, area: 5165 },
  { name: 'Saitama', region: 'Kanto', capital: 'Saitama', population: 7330, density: 1933, area: 3798 },
  { name: 'Chiba', region: 'Kanto', capital: 'Chiba', population: 6290, density: 1219, area: 5158 },
  { name: 'Hyogo', region: 'Kansai', capital: 'Kobe', population: 5380, density: 641, area: 8401 },
  { name: 'Hokkaido', region: 'Hokkaido', capital: 'Sapporo', population: 5120, density: 62, area: 83424 },
  { name: 'Fukuoka', region: 'Kyushu', capital: 'Fukuoka', population: 5100, density: 1026, area: 4986 },
  { name: 'Shizuoka', region: 'Chubu', capital: 'Shizuoka', population: 3520, density: 453, area: 7777 },
  { name: 'Ibaraki', region: 'Kanto', capital: 'Mito', population: 2840, density: 466, area: 6097 },
  { name: 'Hiroshima', region: 'Chugoku', capital: 'Hiroshima', population: 2750, density: 325, area: 8479 },
];

export const REGIONS = ['All regions', 'Hokkaido', 'Kanto', 'Chubu', 'Kansai', 'Chugoku', 'Kyushu'];

// Health and education headline figures.
export const SOCIETY = [
  { label: 'Hospital beds', value: '12.6', unit: 'per 1,000 people, 2022', source: 'OECD Health Statistics, 2024' },
  { label: 'Physicians', value: '2.6', unit: 'per 1,000 people, 2022', source: 'OECD Health Statistics, 2024' },
  { label: 'Tertiary education, age 25-34', value: '65%', unit: 'share with a degree, 2023', source: 'OECD Education at a Glance, 2024' },
  { label: 'Internet users', value: '83%', unit: 'of the population, 2023', source: 'World Bank, World Development Indicators' },
  { label: 'Government debt', value: '255%', unit: 'of GDP, 2024', source: 'IMF World Economic Outlook, 2024' },
  { label: 'Rail passengers', value: '23.9 bn', unit: 'journeys a year, 2023', source: 'Ministry of Land, Infrastructure, Transport and Tourism' },
];

export const SOURCES = [
  { publisher: 'Statistics Bureau of Japan', what: 'Population estimates, Labour Force Survey, Consumer Price Index', year: '2023-2024' },
  { publisher: 'IMF', what: 'World Economic Outlook database: GDP, GDP per person, government debt', year: '2024' },
  { publisher: 'World Bank', what: 'World Development Indicators: population, life expectancy, services and industry shares, internet use', year: '2023' },
  { publisher: 'Ministry of Health, Labour and Welfare', what: 'Vital statistics: fertility rate, life expectancy by sex', year: '2023' },
  { publisher: 'Ministry of Finance', what: 'Trade statistics: exports and imports of goods in yen', year: '2024' },
  { publisher: 'Agency for Natural Resources and Energy', what: 'Electricity generation mix', year: '2023' },
  { publisher: 'OECD', what: 'Health Statistics and Education at a Glance', year: '2024' },
  { publisher: 'United Nations', what: 'World Population Prospects: median age', year: '2024' },
];

export function formatValue(key, year) {
  const s = SERIES[key];
  const v = s.values[year];
  if (v === undefined) return 'n/a';
  if (key === 'gdp') return '$' + v.toFixed(2) + ' tn';
  if (key === 'gdpPerCapita') return '$' + v.toLocaleString('en-US');
  if (key === 'population') return v.toFixed(1) + ' m';
  if (key === 'unemployment' || key === 'inflation') return v.toFixed(1) + '%';
  if (key === 'lifeExpectancy' || key === 'medianAge') return v.toFixed(1) + ' yrs';
  if (key === 'fertility') return v.toFixed(2);
  return String(v);
}

export function yearChange(key, year) {
  const s = SERIES[key];
  const prev = s.values[year - 1];
  const cur = s.values[year];
  if (prev === undefined || cur === undefined) return null;
  return ((cur - prev) / Math.abs(prev)) * 100;
}
