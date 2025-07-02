# Montserrat Font Setup voor Runamigo Website

## Wat is er aangepast?

1. **Font vervanging**: Alle verwijzingen naar Filson Pro zijn vervangen door Montserrat
2. **CSS bijgewerkt**: Alle `font-family` declaraties gebruiken nu `'montserrat'`
3. **Adobe Fonts configuratie**: Montserrat moet worden toegevoegd aan je Adobe Fonts project

## Stappen om Montserrat te configureren in Adobe Fonts:

### 1. Adobe Fonts Project openen
1. Ga naar [Adobe Fonts](https://fonts.adobe.com/)
2. Log in met je Adobe account
3. Ga naar je Runamigo project
4. Klik op "Add fonts"

### 2. Montserrat toevoegen
1. Zoek naar "Montserrat" in de Adobe Fonts bibliotheek
2. Voeg de volgende weights toe:
   - **Regular (400)**
   - **Medium (500)**
   - **SemiBold (600)**
   - **Bold (700)**
   - **ExtraBold (800)**
   - **Black (900)**

### 3. Project publiceren
1. Klik op "Publish" om de wijzigingen live te zetten
2. De Project ID blijft hetzelfde: `teo0xwk`

### 4. Font class name controleren
- **Montserrat**: Gebruik `'montserrat'` in CSS
- **Open Sans**: Blijft `'open-sans'` (geen wijziging nodig)

## Font Weight Mapping

| Filson Pro Weight | Montserrat Weight | CSS font-weight |
|-------------------|-------------------|-----------------|
| FilsonProRegular  | Montserrat Regular | 400 |
| FilsonProMedium   | Montserrat Medium  | 500 |
| FilsonProBold     | Montserrat Bold    | 700 |
| FilsonProHeavy    | Montserrat Black   | 900 |

## Testen

1. Open je website in de browser
2. Controleer of Montserrat correct laadt
3. Test op verschillende apparaten
4. Controleer de browser developer tools voor font loading

## Troubleshooting

**Montserrat laadt niet?**
- Controleer of Montserrat is toegevoegd aan je Adobe Fonts project
- Zorg dat het project is gepubliceerd
- Check de browser console voor errors

**Verkeerde font weights?**
- Controleer of alle benodigde weights zijn toegevoegd
- Zorg dat de juiste font-weight waarden worden gebruikt

**Performance issues?**
- Adobe Fonts zijn geoptimaliseerd
- Je kunt `font-display: swap` toevoegen voor betere performance

## CSS Classes die nu worden gebruikt:

```css
/* Montserrat - voor headings */
font-family: 'montserrat', 'open-sans', Arial, sans-serif;

/* Open Sans - voor body text */
font-family: 'open-sans', Arial, sans-serif;

/* Specifieke weights */
font-weight: 400; /* Montserrat Regular */
font-weight: 500; /* Montserrat Medium */
font-weight: 600; /* Montserrat SemiBold */
font-weight: 700; /* Montserrat Bold */
font-weight: 800; /* Montserrat ExtraBold */
font-weight: 900; /* Montserrat Black */
```

## Volgende stappen

Na het configureren van Adobe Fonts:
1. Test de website lokaal
2. Deploy naar productie
3. Controleer of alles correct werkt
4. Begin met de React Native app aanpassingen 