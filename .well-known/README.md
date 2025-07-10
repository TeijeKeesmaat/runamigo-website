# Apple & Android Autofill Configuration

Deze bestanden zorgen ervoor dat password managers wachtwoorden kunnen delen tussen je website en je React Native app.

## Bestanden

### `apple-app-site-association`
Voor iOS password autofill tussen website en app.

### `assetlinks.json`
Voor Android autofill functionaliteit.

## Vervang de Placeholders

### 1. Team ID vinden (iOS)
1. Open Xcode
2. Ga naar je project settings
3. Kopieer je Team ID (10 karakters, bijvoorbeeld: `ABC123DEF4`)

### 2. Vervang in `apple-app-site-association`:
```json
"appID": "TEAM_ID.com.runamigo.app"
```
Wordt:
```json
"appID": "C39Q863BKK.com.runamigo.app"
```

### 3. SHA256 Fingerprint vinden (Android)
Voor development:
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Voor production (als je een release keystore hebt):
```bash
keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
```

### 4. Vervang in `assetlinks.json`:
```json
"SHA256_FINGERPRINT_PLACEHOLDER"
```
Wordt:
```json
"AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
```

## Testen

Na het vervangen van de placeholders:

1. **Deploy je website**
2. **Test iOS**: Instellingen > Wachtwoorden > Automatisch invullen
3. **Test Android**: Instellingen > Systeem > Talen & invoer > Geavanceerd > Automatisch invullen service

## URLs

De bestanden moeten toegankelijk zijn op:
- `https://runamigo.nl/.well-known/apple-app-site-association`
- `https://runamigo.nl/.well-known/assetlinks.json` 