# Odoo Beratung Deutschland — Landingpage

Professionelle Landingpage für ein Odoo-Beratungsunternehmen.
Gebaut mit **Astro** (Frontend) + **Strapi 5** (CMS/Backend).

---

## Projektstruktur

```
Odoo2.0/
├── backend/          Strapi 5 CMS (Node.js, SQLite)
│   ├── src/api/      Content Types (homepage, service, faq, blog-post, global)
│   ├── config/       Middlewares, CORS, Datenbank
│   ├── seed.js       Initialer Content (einmalig ausführen)
│   └── .env          Secrets (nicht in Git)
├── frontend/         Astro + React + Tailwind CSS
│   ├── src/
│   │   ├── pages/        index.astro (Hauptseite)
│   │   ├── components/   Nav, Hero, Services, WhyUs, FAQ, Blog, Contact, Footer
│   │   ├── lib/          strapi.ts (API Client, typisiert)
│   │   └── types/        strapi.ts (TypeScript Typen)
│   └── .env          Strapi URL
└── docs/             Projektanforderungen (project-briefing, design-reference, cms-requirements)
```

---

## Lokaler Start

### 1. Backend — Strapi CMS

```bash
cd backend
npm install        # einmalig
npm run develop    # startet auf http://localhost:1337
```

Admin-Panel: http://localhost:1337/admin

### 2. Frontend — Astro

```bash
cd frontend
npm install        # einmalig
npm run dev        # startet auf http://localhost:4321
```

### 3. Initialen Content einfügen (einmalig nach erstem Start)

Voraussetzung: Strapi läuft und ein API-Token wurde erstellt.

API-Token erstellen:
  1. http://localhost:1337/admin öffnen
  2. Settings > API Tokens > Create new API Token
  3. Name: seed, Type: Full access
  4. Token kopieren

```bash
cd backend
STRAPI_SEED_TOKEN=<token> node seed.js
# Windows PowerShell: $env:STRAPI_SEED_TOKEN="<token>"; node seed.js
```

---

## Strapi Content Types

| Content Type  | Art            | Beschreibung                       |
|---------------|----------------|------------------------------------|
| homepage      | Single Type    | Hero, CTAs, SEO-Daten              |
| service       | Collection     | Odoo-Leistungen (6 Einträge)       |
| faq           | Collection     | Häufige Fragen (8 Einträge)        |
| blog-post     | Collection     | Blogartikel (3 Einträge)           |
| global        | Single Type    | Kontakt, Footer, Social Links      |

---

## Technologie-Stack

| Bereich    | Technologie       | Version |
|------------|-------------------|---------|
| Frontend   | Astro             | 5.x     |
| Frontend   | React (Islands)   | 19.x    |
| Frontend   | Tailwind CSS      | 3.x     |
| Backend    | Strapi            | 5.46    |
| Datenbank  | SQLite (lokal)    | —       |
| Sprache    | TypeScript        | 5.x     |

---

## Design

- Brand-Farbe: #714B67 (Odoo Signature Purple)
- Akzent: #00A09D (Odoo Teal)
- Font: Inter (Google Fonts)


---

## Umgebungsvariablen

backend/.env:
  HOST=127.0.0.1
  PORT=1337
  DATABASE_CLIENT=sqlite
  DATABASE_FILENAME=.tmp/data.db
  CORS_ORIGIN=http://localhost:4321

frontend/.env:
  PUBLIC_STRAPI_URL=http://localhost:1337

---

## Bekannte Einschränkungen (vor Produktion beheben)

1. [HIGH]   Kontaktformular nicht verbunden — Daten werden nicht gesendet
             Lösung: Formspree.io einbinden oder Strapi Contact-Endpoint erstellen
2. [MEDIUM] SQLite ist nicht produktionsreif — für Live auf PostgreSQL wechseln
3. [MEDIUM] Kein Deployment konfiguriert
             Frontend: Vercel (npm run build -> dist/)
             Backend:  Railway oder Render
4. [LOW]    Keine automatisierten Tests

---

## Deployment-Kurzanleitung (Produktion)

1. Frontend -> Vercel verbinden, PUBLIC_STRAPI_URL auf Prod-URL setzen
2. Backend  -> Railway/Render, DATABASE auf PostgreSQL umstellen
3. CORS_ORIGIN in backend/.env auf die Produktionsdomain setzen
4. SSL für Datenbank aktivieren (DATABASE_SSL=true)