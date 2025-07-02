# Google Fonts Setup voor Runamigo Website

## Wat is er aangepast?

1. **Adobe Fonts vervangen**: Adobe Fonts CDN link vervangen door Google Fonts
2. **Font families bijgewerkt**: Alle font-family verwijzingen gebruiken nu Google Fonts namen
3. **Performance optimalisatie**: Preconnect links toegevoegd voor betere performance

## Google Fonts Configuratie

### 1. Fonts die worden gebruikt:
- **Montserrat**: Voor headings en UI elementen
- **Open Sans**: Voor body text

### 2. Font weights die zijn geconfigureerd:
- **Montserrat**: 400, 500, 600, 700, 800, 900
- **Open Sans**: 400, 600

### 3. Google Fonts URL:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

## Font Weight Mapping

| Filson Pro Weight | Montserrat Weight | CSS font-weight |
|-------------------|-------------------|-----------------|
| FilsonProRegular  | Montserrat Regular | 400 |
| FilsonProMedium   | Montserrat Medium  | 500 |
| FilsonProBold     | Montserrat Bold    | 700 |
| FilsonProHeavy    | Montserrat Black   | 900 |

## Voordelen van Google Fonts

✅ **Gratis**: Geen kosten voor commercieel gebruik
✅ **Betere performance**: Google's CDN is zeer snel
✅ **Automatische fallbacks**: Google zorgt voor goede fallback fonts
✅ **Webfont optimalisatie**: Fonts worden geoptimaliseerd voor web
✅ **Eenvoudig beheer**: Geen account nodig, direct beschikbaar
✅ **font-display: swap**: Voorkomt FOUT (Flash of Unstyled Text)

## CSS Classes die nu worden gebruikt:

```css
/* Montserrat - voor headings */
font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;

/* Open Sans - voor body text */
font-family: 'Open Sans', Arial, sans-serif;

/* Specifieke weights */
font-weight: 400; /* Montserrat Regular */
font-weight: 500; /* Montserrat Medium */
font-weight: 600; /* Montserrat SemiBold */
font-weight: 700; /* Montserrat Bold */
font-weight: 800; /* Montserrat ExtraBold */
font-weight: 900; /* Montserrat Black */
```

## Testen

1. Open `index.html` in je browser
2. Controleer of Montserrat correct laadt voor headings
3. Controleer of Open Sans correct laadt voor body text
4. Test op verschillende apparaten
5. Controleer de browser developer tools voor font loading

## Troubleshooting

**Fonts laden niet?**
- Controleer of je internetverbinding werkt
- Check de browser console voor errors
- Zorg dat de Google Fonts URL correct is

**Verkeerde fonts?**
- Controleer of de font-family namen correct zijn (hoofdlettergevoelig)
- Zorg dat de juiste font-weight waarden worden gebruikt

**Performance issues?**
- Google Fonts zijn geoptimaliseerd
- De preconnect links verbeteren de performance
- `font-display: swap` is automatisch geconfigureerd

## Volgende stappen

Na het testen van de website:
1. Deploy naar productie
2. Controleer of alles correct werkt
3. Begin met de React Native app aanpassingen

## Lokale fonts verwijderen

Je kunt nu alle lokale font bestanden verwijderen uit `assets/fonts/`:
- `FilsonProHeavy.otf`
- `FilsonProBold.otf`
- `FilsonProMedium.otf`
- `FilsonProRegular.otf`
- `OpenSans-Regular.ttf`
- `OpenSans-SemiBold.ttf` 