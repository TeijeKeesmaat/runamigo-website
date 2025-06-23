# Adobe Fonts Setup voor Runamigo Website

## Wat is er aangepast?

1. **Lokale fonts verwijderd**: De `@font-face` declaraties zijn weggehaald uit `style.css`
2. **Adobe Fonts link toegevoegd**: In `index.html` is de Adobe Fonts CDN link toegevoegd
3. **Font-family referenties geüpdatet**: Alle font-family referenties gebruiken nu Adobe Fonts class names

## Stappen om Adobe Fonts te configureren:

### 1. Adobe Fonts Project ID vinden
1. Ga naar [Adobe Fonts](https://fonts.adobe.com/)
2. Log in met je Adobe account
3. Ga naar je projecten
4. Klik op je Runamigo project
5. Kopieer de Project ID (bijvoorbeeld: `abc123`)

### 2. Project ID updaten in index.html
Vervang `YOUR_PROJECT_ID` in `index.html` regel 7:
```html
<link rel="stylesheet" href="https://use.typekit.net/YOUR_PROJECT_ID.css">
```

### 3. Font class names controleren
In Adobe Fonts kun je de juiste class names vinden:
- **Filson Pro**: Gebruik `'filson-pro'` 
- **Open Sans**: Gebruik `'open-sans'`

### 4. Font weights instellen
Zorg ervoor dat je de juiste font weights hebt toegevoegd in Adobe Fonts:
- **Open Sans**: Regular (400), SemiBold (600)
- **Filson Pro**: Heavy (900)

## Voordelen van Adobe Fonts:

✅ **Betere performance**: Fonts worden gecached door Adobe's CDN
✅ **Automatische fallbacks**: Adobe zorgt voor goede fallback fonts
✅ **Webfont optimalisatie**: Fonts worden geoptimaliseerd voor web
✅ **Licentie compliance**: Je gebruikt de fonts legaal
✅ **Eenvoudig beheer**: Centraal beheer via Adobe Fonts dashboard

## Testen:

1. Open je website in de browser
2. Controleer of de fonts correct laden
3. Test op verschillende apparaten
4. Controleer de browser developer tools voor font loading

## Troubleshooting:

**Fonts laden niet?**
- Controleer of de Project ID correct is
- Zorg dat je fonts zijn gepubliceerd in Adobe Fonts
- Check de browser console voor errors

**Verkeerde fonts?**
- Controleer de font class names in Adobe Fonts
- Zorg dat de juiste font weights zijn toegevoegd

**Performance issues?**
- Adobe Fonts zijn geoptimaliseerd, maar je kunt `font-display: swap` toevoegen voor betere performance

## Lokale fonts verwijderen:

Je kunt nu de lokale font bestanden verwijderen uit `assets/fonts/`:
- `FilsonProHeavy.otf`
- `OpenSans-Regular.ttf` 
- `OpenSans-SemiBold.ttf`

## CSS Classes die je kunt gebruiken:

```css
/* Filson Pro - voor headings */
font-family: 'filson-pro', 'open-sans', Arial, sans-serif;

/* Open Sans - voor body text */
font-family: 'open-sans', Arial, sans-serif;

/* Specifieke weights */
font-weight: 400; /* Open Sans Regular */
font-weight: 600; /* Open Sans SemiBold */
font-weight: 900; /* Filson Pro Heavy */
``` 