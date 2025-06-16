# RunAmigo.nl Website

Deze website heeft een professionele structuur met een homepage en een specifieke wachtwoord reset pagina.

## Website Structuur

```
website/
├── index.html                           # Homepage (runamigo.nl)
├── wachtwoord-herstellen/
│   └── index.html                       # Wachtwoord reset (runamigo.nl/wachtwoord-herstellen)
├── README.md                            # Deze documentatie
├── DEPLOYMENT-GUIDE.md                  # Hosting opties
├── netlify-deployment.md                # Netlify instructies
└── mijndomein-nl-dns-guide.md          # DNS configuratie
```

## Pagina's

### 🏠 Homepage (`/`)
- **URL**: https://runamigo.nl
- **Functie**: Landingspagina voor RunAmigo app
- **Bevat**: 
  - App beschrijving
  - Download links (iOS/Android)
  - Link naar wachtwoord reset
  - App opener functionaliteit

### 🔑 Wachtwoord Reset (`/wachtwoord-herstellen`)
- **URL**: https://runamigo.nl/wachtwoord-herstellen
- **Functie**: Wachtwoord resetten via Supabase
- **Bevat**:
  - Token validatie
  - Wachtwoord formulier
  - Supabase integratie
  - Redirect naar app na succes

## Hoe het werkt

### Wachtwoord Reset Flow:
1. **Gebruiker** vraagt reset aan in app
2. **Supabase** stuurt email met link naar `/wachtwoord-herstellen`
3. **Website** valideert token en toont formulier
4. **Gebruiker** stelt nieuw wachtwoord in
5. **Website** stuurt gebruiker terug naar app

### Homepage Features:
- **Automatische redirect** van reset tokens naar juiste pagina
- **App opener** voor deep linking
- **Responsive design** voor alle apparaten
- **SEO vriendelijk** voor app discovery

## Deployment

1. **Upload beide bestanden** naar Netlify:
   - `index.html` in root
   - `wachtwoord-herstellen/index.html` in subfolder

2. **DNS configuratie** (zie `mijndomein-nl-dns-guide.md`)

3. **App configuratie**:
   - Redirect URL: `https://runamigo.nl/wachtwoord-herstellen`

## Testen

### Homepage testen:
- Ga naar https://runamigo.nl
- Controleer app links
- Test "Wachtwoord vergeten?" link

### Wachtwoord reset testen:
- Vraag reset aan in app
- Check email voor link
- Klik link → moet naar `/wachtwoord-herstellen` gaan
- Test wachtwoord wijzigen

## Toekomstige Uitbreidingen

Je kunt eenvoudig meer pagina's toevoegen:
- `/privacy` - Privacy policy
- `/terms` - Algemene voorwaarden  
- `/contact` - Contact formulier
- `/blog` - Nieuws en updates

Alle pagina's volgen dezelfde structuur als de wachtwoord reset pagina. 