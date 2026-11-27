# Nippon by Numbers — Japan in numbers, 2020–2024

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/xoos19/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/xoos19/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for Japan, built for the make.fun bounty
**[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)**.

## What it is

A static, offline site (no build step, no network requests) covering Japan's
population, economy, prefectures and daily life in 2020–2024. Every figure
carries its source and year — Statistics Bureau of Japan, IMF, World Bank,
OECD and Japan's ministries — listed on the Sources page.

## Pages

- **Overview** — headline indicators with a year picker, GDP and population charts
- **Economy** — GDP with a bar/line chart toggle, prices and jobs, sectors, trade table with CSV download
- **People** — age structure, fertility, life expectancy, health and education
- **Prefectures** — the twelve largest prefectures: searchable, filterable by region, sortable table with CSV download
- **Indicator pages** — each headline figure in depth, with its yearly series and change
- **Sources and methods** — every source, plus rounding and methods notes

## Run it

```sh
node serve.ts   # serves app/ at http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the kit's `buildDossier`.

## License

MIT — see `LICENSE`.
