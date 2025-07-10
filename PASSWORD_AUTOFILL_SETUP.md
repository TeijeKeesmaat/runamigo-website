# Password Autofill Setup - Runamigo

Deze configuratie zorgt ervoor dat password managers wachtwoorden kunnen delen tussen je website en je React Native app.

## ✅ Wat is geïmplementeerd

### 1. Apple App Site Association
**Bestand**: `/.well-known/apple-app-site-association`
- Voor iOS password autofill
- Verbindt je website met je iOS app
- Plaatsholder: `TEAM_ID.com.runamigo.app`

### 2. Android Asset Links
**Bestand**: `/.well-known/assetlinks.json`
- Voor Android autofill functionaliteit
- Plaatsholder: `SHA256_FINGERPRINT_PLACEHOLDER`

### 3. Website Meta Tags
**Bestand**: `index.html`
- Apple App Site Association meta tag
- Android App Links meta tag
- Password autofill ondersteuning

### 4. Test Pagina
**URL**: `https://runamigo.nl/test-autofill`
- Test formulier met email en wachtwoord velden
- Juiste autocomplete attributen
- Links naar configuratie bestanden

## 🔧 Vervang de Placeholders

### Stap 1: Team ID vinden (iOS)
1. Open Xcode
2. Ga naar je project settings
3. Kopieer je Team ID (10 karakters)

### Stap 2: Update apple-app-site-association
```json
"appID": "TEAM_ID.com.runamigo.app"
```
Wordt:
```json
"appID": "ABC123DEF4.com.runamigo.app"
```

### Stap 3: SHA256 Fingerprint vinden (Android)
**Development keystore:**
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**Production keystore:**
```bash
keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
```

### Stap 4: Update assetlinks.json
```json
"SHA256_FINGERPRINT_PLACEHOLDER"
```
Wordt:
```json
"AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
```

### Stap 5: Update Meta Tags
In `index.html` en `test-autofill.html`:
- Vervang `APP_STORE_ID` met je App Store ID
- Vervang `ANDROID_PACKAGE_NAME` met `com.runamigo.app`

## 🧪 Testen

### 1. Deploy je website
```bash
git add .
git commit -m "Add password autofill configuration"
git push
```

### 2. Test de configuratie bestanden
- `https://runamigo.nl/.well-known/apple-app-site-association`
- `https://runamigo.nl/.well-known/assetlinks.json`

### 3. Test de test pagina
- Ga naar `https://runamigo.nl/test-autofill`
- Open op je telefoon
- Tap op email/wachtwoord velden
- Je zou password manager suggesties moeten zien

### 4. Test in je app
- Open je React Native app
- Ga naar login/signup scherm
- Tap op email/wachtwoord velden
- Password managers zouden moeten werken

## 📱 Platform Specifieke Instellingen

### iOS
1. Instellingen > Wachtwoorden > Automatisch invullen
2. Schakel je password manager in
3. Test in Safari en je app

### Android
1. Instellingen > Systeem > Talen & invoer > Geavanceerd > Automatisch invullen service
2. Selecteer je password manager
3. Test in Chrome en je app

## 🔗 Belangrijke URLs

- **Test pagina**: `https://runamigo.nl/test-autofill`
- **Apple config**: `https://runamigo.nl/.well-known/apple-app-site-association`
- **Android config**: `https://runamigo.nl/.well-known/assetlinks.json`

## 📝 Troubleshooting

### Probleem: Geen password suggesties
**Oplossing:**
1. Controleer of de configuratie bestanden toegankelijk zijn
2. Wacht 24-48 uur na deployment (Apple/Google cache)
3. Test op verschillende apparaten

### Probleem: Alleen website werkt, app niet
**Oplossing:**
1. Controleer je app configuratie (`app.config.js`)
2. Zorg dat Associated Domains correct zijn ingesteld
3. Rebuild je app na configuratie wijzigingen

### Probleem: Alleen iOS werkt, Android niet
**Oplossing:**
1. Controleer SHA256 fingerprint
2. Zorg dat `importantForAutofill="yes"` is ingesteld
3. Test met verschillende Android versies 