# 🌐 DNS Configuratie voor MijnDomein.nl

## Stap-voor-stap DNS instelling voor runamigo.nl

### Stap 1: Inloggen op MijnDomein.nl

1. Ga naar [mijndomein.nl](https://mijndomein.nl)
2. Klik rechtsboven op "Inloggen"
3. Log in met je account gegevens

### Stap 2: Naar DNS Beheer

1. Ga naar "Mijn Account" of "Dashboard"
2. Zoek je domein `runamigo.nl` in de lijst
3. Klik op "Beheren" of "DNS" naast je domein
4. Kies "DNS Records" of "DNS Beheer"

### Stap 3: Huidige Records Bekijken

Je ziet waarschijnlijk standaard records zoals:
```
Type: A     | Name: @    | Value: [parking IP]
Type: A     | Name: www  | Value: [parking IP]
Type: MX    | Name: @    | Value: [email server]
```

### Stap 4: A Record Toevoegen/Wijzigen

**Voor hoofddomein (runamigo.nl):**

1. **Bestaande A record wijzigen** (als die er is):
   - Zoek record met Name: `@` of leeg
   - Klik op "Bewerken" of potlood icoon
   - Wijzig Value naar: `75.2.60.5`
   - TTL: `3600` (1 uur)
   - Klik "Opslaan"

2. **Nieuwe A record toevoegen** (als er geen is):
   - Klik "Record Toevoegen" of "+"
   - Type: `A`
   - Name: `@` (of laat leeg)
   - Value: `75.2.60.5`
   - TTL: `3600`
   - Klik "Opslaan"

### Stap 5: CNAME Record voor WWW

1. **Bestaande www record wijzigen** (als die er is):
   - Zoek record met Name: `www`
   - Wijzig Type naar: `CNAME`
   - Wijzig Value naar: `je-site-naam.netlify.app`
   - Klik "Opslaan"

2. **Nieuwe CNAME toevoegen** (als er geen www is):
   - Klik "Record Toevoegen"
   - Type: `CNAME`
   - Name: `www`
   - Value: `je-site-naam.netlify.app`
   - TTL: `3600`
   - Klik "Opslaan"

### Stap 6: Netlify Site Naam Vinden

**In Netlify dashboard:**
1. Ga naar je site
2. Kijk naar de URL: `https://amazing-cupcake-123456.netlify.app`
3. Gebruik: `amazing-cupcake-123456.netlify.app` (zonder https://)

### Stap 7: Records Controleren

Na het instellen zou je dit moeten hebben:

```
Type: A      | Name: @    | Value: 75.2.60.5           | TTL: 3600
Type: CNAME  | Name: www  | Value: je-site.netlify.app | TTL: 3600
Type: MX     | Name: @    | Value: [email server]      | TTL: 3600
```

## 🕐 Wachttijd

- **Propagatie tijd**: 1-4 uur (meestal sneller bij MijnDomein.nl)
- **Check status**: [whatsmydns.net](https://whatsmydns.net)
- **Test beide**: `runamigo.nl` en `www.runamigo.nl`

## 🔧 MijnDomein.nl Specifieke Tips

### Interface Variaties
MijnDomein.nl heeft verschillende interfaces:
- **Oude interface**: "DNS Records" tab
- **Nieuwe interface**: "DNS Beheer" knop
- **Mobiel**: Mogelijk beperkte functionaliteit

### Veelvoorkomende Problemen

**"Record bestaat al" error:**
- Wijzig bestaande record in plaats van nieuwe toevoegen
- Verwijder oude parking records eerst

**"Ongeldige waarde" error:**
- Controleer dat A record IP adres correct is: `75.2.60.5`
- CNAME mag geen http:// bevatten

**TTL problemen:**
- Gebruik `3600` (1 uur) voor snellere updates
- Minimum is meestal `300` (5 minuten)

### Email Behouden

**Belangrijk**: Als je email via MijnDomein.nl gebruikt:
- **Laat MX records staan** zoals ze zijn
- Wijzig alleen A en CNAME records
- Email blijft gewoon werken

## ✅ Test Checklist

Na DNS wijziging:

1. **Wacht 1-4 uur** voor propagatie
2. **Test in incognito browser**:
   - `https://runamigo.nl` → moet naar je site gaan
   - `https://www.runamigo.nl` → moet ook werken
3. **Check DNS propagatie**: [whatsmydns.net](https://whatsmydns.net)
4. **Test SSL**: Moet groene slotje tonen
5. **Test wachtwoord reset** in je app

## 🆘 Hulp bij MijnDomein.nl

**Als je vastloopt:**
1. **MijnDomein.nl support**: 
   - Chat: Via website (werkdagen 9-17)
   - Email: support@mijndomein.nl
   - Tel: 088-1234567

2. **Veelgestelde vraag**: 
   "Ik wil mijn domein naar Netlify laten wijzen voor hosting"

3. **Wat te vragen**:
   - Help met A record naar 75.2.60.5
   - CNAME record voor www naar Netlify

## 📱 Screenshots Locaties

In MijnDomein.nl interface zoek naar:
- "DNS" knop of tab
- "Records" sectie  
- "Bewerken" potlood icoon
- "Toevoegen" plus knop

**Tip**: MijnDomein.nl heeft vaak Nederlandse labels, dus zoek naar "DNS Beheer" of "DNS Records". 