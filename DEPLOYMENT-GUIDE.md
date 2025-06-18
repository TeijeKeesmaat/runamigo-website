# Runamigo Website Deployment Guide

## Structuur

```
website/
├── assets/
│   ├── logo.svg
│   └── fonts/
│       ├── FilsonProHeavy.otf
│       ├── OpenSans-Regular.ttf
│       └── OpenSans-SemiBold.ttf
├── css/
│   └── style.css
├── index.html
├── privacybeleid.html
├── algemene-voorwaarden.html
├── wachtwoord-herstellen/
│   └── index.html
├── ... (overige bestanden)
```

- Alle fonts en het logo staan in `assets/` en `assets/fonts/`.
- Centrale styling staat in `css/style.css`.
- Alle HTML-bestanden verwijzen naar deze centrale locaties.

## Deployen

### Aanbevolen: Vercel of Netlify

1. Upload de hele map `website` naar Vercel of Netlify.
2. Je hoeft niets aan te passen aan de paden; alles werkt direct door de centrale structuur.
3. Je site is bereikbaar op je domein (zoals runamigo.nl).

### Let op
- Controleer na uploaden of alle pagina's (inclusief wachtwoord-herstellen, privacybeleid, algemene voorwaarden) werken en de juiste styling en logo tonen.
- Bij nieuwe pagina's: verwijs altijd naar assets/ en css/ voor logo, fonts en styling.

### Technische kennis: Minimaal
- Je hoeft alleen de map te uploaden en je domein te koppelen.
- Zie de README of Vercel/Netlify docs voor meer details. 