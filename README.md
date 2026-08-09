# KIM-Masterclass · Landing Page

Arbeitsunterlage zur Masterclass-Session „Datenbank-Anbindung mit Supabase"
für die KI-Masterclass des KOERTING Instituts.

Ziel-Subdomain: `kim-10082026.berent.ai`

---

## Struktur

```
kim-10082026/
├── index.html              ← gesamte Seite, Formulierungen hier ändern
├── assets/
│   ├── css/style.css       ← BERENT CI, Schriften, Layout
│   ├── js/main.js          ← Kopierbuttons
│   ├── fonts/              ← lokal gehostet, DSGVO-konform
│   └── images/             ← Favicon
├── Dockerfile              ← Coolify-Deployment
├── nginx.conf
└── README.md
```

---

## Vor dem Livegang erledigen

### 1 · Platzhalter ersetzen

In `index.html`, Abschnitt „Der Abstecher" (Schritt 05), stehen an drei Stellen:

- `PLATZHALTER_VERZEICHNIS_URL`
- `PLATZHALTER_VERZEICHNIS_KEY`

Beide durch die echten Werte des gemeinsamen Supabase-Projekts ersetzen.
Es ist der **anon**-Schlüssel aus Project Settings → API, nicht service_role.

Prüfen mit:

```bash
grep -c PLATZHALTER index.html
```

Muss `0` ergeben, sonst scheitert Schritt 05 in der Session für alle gleichzeitig.

### 2 · Schriften und Favicon kopieren

```bash
cd /Users/kunkel/Entwicklung/projekte/kim-10082026

cp ../blog/assets/fonts/bebas-neue-regular.woff2 assets/fonts/
cp ../blog/assets/fonts/lora-300.woff2           assets/fonts/
cp ../blog/assets/fonts/lora-400.woff2           assets/fonts/
cp ../blog/assets/fonts/lora-600.woff2           assets/fonts/
cp ../blog/assets/fonts/jetbrains-mono-400.woff2 assets/fonts/

cp ../asset-library/brand/icons/favicon-32.png   assets/images/
```

Ohne diesen Schritt fällt die Seite auf Georgia zurück. Kein Fehler, aber nicht CI-konform.

### 3 · Lokal ansehen

```bash
npx serve .
```

Die Kopierbuttons brauchen einen Server oder `localhost`. Beim Öffnen der Datei per
Doppelklick greift nur die Rückfallebene.

---

## Deployment über Coolify

Statische Seite, keine Build-Schritte, keine Abhängigkeiten. Der beigelegte
`Dockerfile` liefert die Dateien über nginx aus.

1. Repository auf GitHub anlegen und pushen
2. In Coolify neue Resource → Application → Public/Private Repository
3. Build Pack: **Dockerfile**
4. Port: `80`
5. Domain: `kim-10082026.berent.ai`
6. In Cloudflare CNAME `kim-10082026` auf die Coolify-Instanz, Proxy nach
   bestehender Konvention

Die Schriften liegen im Image und werden von derselben Domain ausgeliefert.
Es gibt keinen einzigen Request an einen Drittanbieter, damit auch keine
Übertragung von IP-Adressen an US-Server.

---

## Nach der Session

- Verzeichnis-Projekt in Supabase löschen (war so angekündigt)
- Hinweis in Schritt 05 ergänzen, dass das Verzeichnis nicht mehr existiert
  und der Abschnitt nur noch zum Nachlesen dient
- Aufzeichnung verlinken

---

*BERENT.AI · Beratung + Entwicklung · berent.ai*
