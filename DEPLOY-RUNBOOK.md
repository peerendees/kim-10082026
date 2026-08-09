# Deploy-Runbook · Hostinger + Traefik + Coolify

Gilt für statische BERENT-Seiten auf dem Hostinger-Server (`72.61.84.149`).

**Kernproblem (Aug 2026):** Coolify deployt standardmäßig ins Netz `coolify`. Der
öffentliche Reverse-Proxy ist **`root-traefik-1`** im Netz **`root_default`**. Container
in anderen Netzen sind von außen unsichtbar → Traefik antwortet mit `404 page not found`,
obwohl der Container läuft.

---

## Vor jeder Demo · 60-Sekunden-Check

```bash
curl -sI https://DEINE-SUBDOMAIN.berent.ai | head -3
```

Erwartung: `HTTP/2 200` und `content-type: text/html`.

Notfall auf dem Server (SSH):

```bash
cd /opt/kim-10082026 && git pull && docker compose -p kim-10082026 up -d --build
curl -sI https://kim-10082026.berent.ai | head -3
```

---

## Pfad A · Zuverlässig (empfohlen für Demos)

Direkt per SSH + `docker-compose.yaml` im Repo. Umgeht Coolify-UI-Bugs.

### 1 · Repo vorbereiten (lokal)

Neue Subdomain `NEU.berent.ai` → in `docker-compose.yaml` anpassen:

- `traefik.http.routers.NEU.rule=Host(\`NEU.berent.ai\`)`
- Router- und Service-Namen konsistent benennen (z. B. `neu-app` überall gleich)

Commit + Push.

### 2 · DNS (Cloudflare)

| Typ | Name | Ziel | Proxy |
|-----|------|------|-------|
| A | `NEU` | `72.61.84.149` | an (wie `blog`) |

### 3 · Server (SSH, einmalig pro App)

```bash
ssh root@72.61.84.149

# App dauerhaft unter /opt (nicht /tmp)
git clone https://github.com/peerendees/REPO-NAME.git /opt/REPO-NAME
cd /opt/REPO-NAME
docker compose -p PROJEKTNAME up -d --build

# Netz prüfen — MUSS root_default enthalten
docker inspect PROJEKTNAME-web-1 --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'

# Live-Check
curl -sI https://NEU.berent.ai | head -3
```

### 4 · Updates nach Git-Push

```bash
cd /opt/REPO-NAME && git pull && docker compose -p PROJEKTNAME up -d --build
```

---

## Pfad B · Coolify (nur wenn UI Save ohne Error durchgeht)

Coolify ist die bequeme Oberfläche, hat aber bekannte Bugs (null-Domain-Crash beim Save).

### Checkliste Neue Resource

1. **New Resource** → GitHub App → Repo wählen
2. **Destination:** `Standalone Docker (traefik-root-default)` — **niemals** nur `coolify`
3. **Build Pack:** `Docker Compose` · Datei: `/docker-compose.yaml`
4. **Domains:** zuerst **Generate Domain**, dann durch `https://NEU.berent.ai` ersetzen
   - Feld **darf beim Save nie leer sein**
   - Bei Error `sslipDomainWarning(): ... null given` → **Pfad A** nutzen
5. **Custom Docker Options:** leer (keine Flags von anderen Apps übernehmen)
6. **Port Exposes:** `80` (bei Static oft vorgegeben, nicht änderbar)
7. **Save** → Seite mit F5 neu laden → Domain noch da? → **Deploy**

### Nach Deploy prüfen

```bash
# Container muss root_default oder coolify + Traefik-Labels haben
docker ps | grep DEIN-PROJEKT
curl -sI https://NEU.berent.ai | head -3
```

Wenn **404**: sofort **Pfad A** — nicht in der UI weiterklicken.

---

## Server-Architektur (Referenz)

| Container | Aufgabe |
|-----------|---------|
| `root-traefik-1` | Öffentlicher Proxy, Port 80/443 |
| `coolify` | Deployment-UI, Port 8000 |
| ~~coolify-proxy~~ | **Existiert auf diesem Server nicht** |

Traefik ist bereits am Netz `coolify` verbunden (`docker network connect` ist nicht nötig).
Trotzdem müssen **öffentliche Apps** an `root_default` hängen oder explizite Traefik-Labels
in der `docker-compose.yaml` tragen (siehe Repo).

---

## Typische Fehler

| Symptom | Ursache | Fix |
|---------|---------|-----|
| `404 page not found` (Plaintext) | Container nicht in `root_default` / keine Traefik-Labels | Pfad A |
| Save crasht mit `sslipDomainWarning` | Domains-Feld intern null | Generate Domain → ersetzen; sonst Pfad A |
| `Nicht sicher` in Safari | DNS zeigt direkt auf IP ohne Cloudflare-Proxy | Orange Wolke in Cloudflare |
| Seite läuft, Save in Coolify scheitert | Coolify-Bug, nicht Inhalt | Pfad A reicht für Live-Betrieb |

---

## Demo morgen · kim-10082026

1. Jetzt `/tmp` → `/opt` migrieren (siehe unten)
2. `curl -sI https://kim-10082026.berent.ai | head -3` → muss `200` sein
3. **Coolify-UI vor der Demo nicht anfassen**
4. Notfall-Befehl griffbereit (siehe oben)

### Migration /tmp → /opt (einmalig auf dem Server)

```bash
ssh root@72.61.84.149
docker compose -p kim-10082026 -f /tmp/kim-10082026/docker-compose.yaml down
git clone https://github.com/peerendees/kim-10082026.git /opt/kim-10082026
cd /opt/kim-10082026 && docker compose -p kim-10082026 up -d --build
curl -sI https://kim-10082026.berent.ai | head -3
```

---

*Stand: Aug 2026 · Hostinger srv1098810 · root-traefik-1*
