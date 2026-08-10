# KIM-Masterclass · Landing Page

Arbeitsunterlage zur Masterclass-Session „Datenbank-Anbindung mit Supabase"
für die KI-Masterclass des KOERTING Institute.

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
├── Dockerfile
├── docker-compose.yaml     ← Traefik + root_default (siehe DEPLOY-RUNBOOK.md)
├── nginx.conf
├── DEPLOY-RUNBOOK.md         ← verbindliche Deploy-Anleitung Hostinger
└── README.md
```

---

## Vor dem Livegang erledigen

### 1 · Platzhalter ersetzen

In `index.html`, Abschnitt „Zwei Fenster, eine Wahrheit" (Schritt 05), steht an
einer Stelle `PLATZHALTER_VERZEICHNIS_URL`. Dort gehört die Adresse der
Anwendung hin, in die sich alle gemeinsam eintragen.

Prüfen mit:

```bash
grep -c PLATZHALTER index.html
```

Muss `0` ergeben, sonst scheitert Schritt 05 in der Session für alle gleichzeitig.

### 1b · Vorab-Fassung und Freischaltung

`main` trägt bis zum Sessiontag nur die Vorab-Fassung, also Hero, Rahmen,
Abschnitt 00 und den Ausblick. Die komplette Seite liegt auf dem Branch
`vollversion`.

```bash
# am Sessiontag freischalten
git checkout main && git merge vollversion && git push

# zu früh freigeschaltet
git revert -m 1 HEAD && git push
```

Vorab-Korrekturen auf `main` vor dem Freischalten mit `git merge main` in den
Branch übernehmen, sonst gehen sie beim Merge verloren.

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

## Deployment

| Dokument | Inhalt |
|----------|--------|
| [COOLIFY-REPARATUR.md](COOLIFY-REPARATUR.md) | **Coolify dauerhaft reparieren** — Instance Domain, Defaults, Deploy-Checkliste |
| [DEPLOY-RUNBOOK.md](DEPLOY-RUNBOOK.md) | Notfall-Deploy per SSH, wenn Coolify Save scheitert |

Live-Check:

```bash
curl -sI https://kim-10082026.berent.ai | head -3
```

---

## Nach der Session

- Verzeichnis-Projekt in Supabase löschen (war so angekündigt)
- Hinweis in Schritt 05 ergänzen, dass das Verzeichnis nicht mehr existiert
  und der Abschnitt nur noch zum Nachlesen dient
- Aufzeichnung verlinken

---

*BERENT.AI · Beratung + Entwicklung · berent.ai*
