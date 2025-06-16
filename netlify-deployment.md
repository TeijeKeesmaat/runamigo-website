# 🚀 Netlify Deployment Guide voor RunAmigo.nl

## Stap 1: Netlify Account Aanmaken

1. Ga naar [netlify.com](https://netlify.com)
2. Klik op "Sign up" 
3. Maak account aan (kan met GitHub, GitLab, Bitbucket of email)

## Stap 2: Website Uploaden

### Optie A: Drag & Drop (Eenvoudigst)
1. Log in op Netlify
2. Ga naar je dashboard
3. Sleep de `website` folder naar het "drag and drop" gebied
4. Wacht tot upload compleet is
5. Je krijgt een random URL zoals `https://amazing-cupcake-123456.netlify.app`

### Optie B: Via Git (Aanbevolen voor updates)
1. Maak GitHub repository aan
2. Upload website bestanden
3. Connect repository in Netlify
4. Automatische deployments bij elke update

## Stap 3: Custom Domain Toevoegen

1. Ga naar je site in Netlify dashboard
2. Klik op "Domain settings"
3. Klik op "Add custom domain"
4. Voer in: `runamigo.nl`
5. Klik "Verify"
6. Netlify toont DNS instructies

## Stap 4: DNS Configureren

### Bij je domein provider (waar je runamigo.nl hebt gekocht):

**Voor apex domain (runamigo.nl):**
```
Type: A Record
Name: @ (of leeglaten)
Value: 75.2.60.5
```

**Voor www subdomain:**
```
Type: CNAME
Name: www
Value: je-site-naam.netlify.app
```

**Alternatief (als A record niet werkt):**
```
Type: ALIAS of ANAME
Name: @ 
Value: je-site-naam.netlify.app
```

## Stap 5: SSL Certificaat

1. Wacht 1-24 uur na DNS wijziging
2. Ga naar "Domain settings" in Netlify
3. Scroll naar "HTTPS"
4. Klik "Verify DNS configuration"
5. SSL wordt automatisch aangemaakt

## Stap 6: Testen

1. Ga naar `https://runamigo.nl`
2. Controleer of de website laadt
3. Test wachtwoord reset in je app:
   - Vraag reset aan
   - Check email
   - Klik op link
   - Moet naar je website gaan

## 🔧 Troubleshooting

### DNS propagatie duurt lang
- Check status: [whatsmydns.net](https://whatsmydns.net)
- Kan 1-48 uur duren
- Probeer incognito browser

### SSL certificaat werkt niet
- Wacht tot DNS volledig gepropageerd is
- Force SSL renewal in Netlify
- Check mixed content warnings

### Website laadt niet
- Check DNS records zijn correct
- Controleer of index.html in root staat
- Check browser console voor errors

## 📱 Domein Provider Specifieke Instructies

### TransIP
1. Log in op TransIP control panel
2. Ga naar "Domeinen" → "DNS"
3. Voeg A record toe: @ → 75.2.60.5
4. Voeg CNAME toe: www → je-site.netlify.app

### Hostnet
1. Log in op Hostnet control panel
2. Ga naar "DNS beheer"
3. Voeg records toe zoals hierboven

### GoDaddy
1. Log in op GoDaddy
2. Ga naar "DNS Management"
3. Voeg records toe

## ✅ Checklist

- [ ] Netlify account aangemaakt
- [ ] Website geüpload naar Netlify
- [ ] Custom domain runamigo.nl toegevoegd
- [ ] DNS records geconfigureerd
- [ ] 24 uur gewacht op propagatie
- [ ] SSL certificaat actief
- [ ] Website bereikbaar via https://runamigo.nl
- [ ] Wachtwoord reset getest in app

## 💡 Tips

- **Backup**: Bewaar je website bestanden lokaal
- **Updates**: Upload nieuwe versie door bestanden te slepen
- **Monitoring**: Netlify toont analytics en logs
- **Custom 404**: Voeg 404.html toe voor betere UX

## 🆘 Hulp Nodig?

Als je vastloopt:
1. Check Netlify docs: [docs.netlify.com](https://docs.netlify.com)
2. Netlify support chat (gratis account heeft beperkte support)
3. Stuur me je domein provider naam voor specifieke DNS instructies 