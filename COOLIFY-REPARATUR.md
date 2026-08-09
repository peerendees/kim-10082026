# Coolify reparieren · Hostinger srv1098810

Ziel: Repo verbinden → Deploy → `curl` liefert **200**. Kein manuelles SSH nötig.

## Architektur (war das Problem)

| Komponente | Auf diesem Server |
|------------|-------------------|
| Öffentlicher Proxy | **`root-traefik-1`** (Port 80/443) |
| Coolify-UI | `coolify` (Port 8000) |
| `coolify-proxy` | **Existiert nicht** — Traefik läuft als separates `root`-Compose |
| Netz für öffentliche Apps | **`root_default`** |
| Netz für Coolify-intern | `coolify` (Traefik ist hier **bereits** verbunden) |

Coolify-Apps brauchen **Destination `traefik-root-default`** und Traefik-Labels.
Ohne Domain-Save (Coolify-Bug) entstehen keine Router → 404.

---

## Phase 1 · Coolify-Instanz (SSH + UI, einmalig)

### 1.1 Instance Domain setzen (behebt Save-Crash)

**Coolify UI** → Zahnrad **Settings** → **Configuration** → **Instance's Domain**

Eintragen (eine Zeile, mit Protokoll):

```
http://72.61.84.149:8000
```

Oder eure feste Coolify-URL, falls vorhanden. **Save.**

> Ohne Instance Domain crasht Save mit `sslipDomainWarning(): ... null given`.

### 1.2 APP_URL auf dem Server (SSH)

```bash
grep APP_URL /data/coolify/source/.env || echo "APP_URL fehlt"
```

Falls leer oder `localhost`, setzen:

```bash
sed -i 's|^APP_URL=.*|APP_URL=http://72.61.84.149:8000|' /data/coolify/source/.env
grep -q '^APP_URL=' /data/coolify/source/.env || echo 'APP_URL=http://72.61.84.149:8000' >> /data/coolify/source/.env
```

### 1.3 Coolify aktualisieren (SSH)

```bash
cd /data/coolify/source
git pull
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --pull always --force-recreate
docker exec coolify sh -c 'php artisan migrate --force' 2>/dev/null || true
```

Warten bis `docker ps` → `coolify` **healthy**.

### 1.4 Traefik prüfen (SSH)

```bash
docker inspect root-traefik-1 --format '{{range .Config.Cmd}}{{println .}}{{end}}' | grep -E 'docker|network'
docker network inspect root_default --format '{{range .Containers}}{{.Name}} {{end}}' | tr ' ' '\n' | grep traefik
```

Erwartung: `root-traefik-1` ist in `root_default`.

---

## Phase 2 · Projekt-Defaults (Coolify UI)

1. **Projects** → **BERENT AI Projekte** → **production**
2. Beim Anlegen neuer Resources immer:
   - **Destination:** `Standalone Docker (traefik-root-default)`
   - **Niemals** nur `Standalone Docker (coolify)` für öffentliche Webseiten

---

## Phase 3 · Standard-App anlegen (Checkliste pro Repo)

Repos müssen **`docker-compose.yaml`** mit `root_default` und Traefik-Labels enthalten
(siehe Template in diesem Repo).

### 3.1 Alte kaputte Apps löschen

Coolify UI → alte `kim-*` / fehlgeschlagene Apps → **Danger Zone** → Delete.

### 3.2 Manuellen Parallel-Deploy stoppen (Domain-Konflikt)

SSH:

```bash
docker compose -p kim-10082026 -f /opt/kim-10082026/docker-compose.yaml down 2>/dev/null
docker compose -p kim-10082026 -f /tmp/kim-10082026/docker-compose.yaml down 2>/dev/null
```

### 3.3 Neue Resource

| Schritt | Wert |
|---------|------|
| Quelle | Private Repository (GitHub App) |
| Repo | `peerendees/kim-10082026` |
| Branch | `main` |
| Destination | **`traefik-root-default`** |
| Build Pack | **Docker Compose** |
| Compose-Datei | `/docker-compose.yaml` |
| Base Directory | `/` |

### 3.4 Domain (Reihenfolge!)

1. **Generate Domain** → Feld ist gefüllt
2. Ersetzen durch: `https://kim-10082026.berent.ai`
3. **Save** — **kein roter Error**
4. F5 → Domain noch da?

### 3.5 Weitere Felder

- **Custom Docker Options:** leer
- **Port Exposes:** `80` (read-only bei Static/Compose ok)

### 3.6 Deploy

**Deploy** → warten bis Success.

---

## Phase 4 · Verifikation (SSH)

Container-Name kommt von Coolify (UUID), z. B.:

```bash
docker ps --format '{{.Names}}' | grep -i kim
CONTAINER=$(docker ps --format '{{.Names}}' | grep -E 'kim|b7fc' | head -1)
echo "Container: $CONTAINER"

docker inspect "$CONTAINER" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'
# Erwartung: root_default

docker inspect "$CONTAINER" --format '{{json .Config.Labels}}' | python3 -c "
import sys,json
for k,v in json.load(sys.stdin).items():
    if k.startswith('traefik'): print(f'{k}={v}')
"
# Erwartung: traefik.enable=true, Host-Rule, loadbalancer.server.port=80

curl -sI https://kim-10082026.berent.ai | head -3
# Erwartung: HTTP/2 200
```

---

## Phase 5 · Neues Repo morgen (Demo)

1. Repo von `kim-10082026` klonen → `docker-compose.yaml` Host-Namen anpassen
2. Cloudflare A-Record → `72.61.84.149`, Proxy an
3. Coolify: New Resource, **Destination traefik-root-default**, **Docker Compose**
4. Generate Domain → echte Domain → Save ohne Error → Deploy
5. **Erst nach `curl 200`:** Demo

---

## Wenn Save weiter crasht

1. Instance Domain (Phase 1.1) wirklich gesetzt?
2. Coolify-Update (Phase 1.3) durch?
3. Notfall bis Fix bestätigt: SSH Pfad aus `DEPLOY-RUNBOOK.md`

---

*Stand Aug 2026 · nach Incident kim-10082026*
