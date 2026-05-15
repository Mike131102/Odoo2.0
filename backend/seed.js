#!/usr/bin/env node
/**
 * Seed-Script fuer Strapi CMS
 *
 * Voraussetzungen:
 *   1. Strapi laeuft auf http://localhost:1337
 *   2. API-Token in Strapi erstellt:
 *      Settings > API Tokens > Create new API Token
 *      Type: Full access
 *
 * Ausfuehren:
 *   node seed.js YOUR_API_TOKEN
 *
 * Hinweis: Wenn Strapi mit bootstrap in src/index.ts gestartet wird,
 * werden Public-Permissions automatisch gesetzt.
 */

const BASE_URL = 'http://localhost:1337';
const AUTH_TOKEN = process.env.STRAPI_SEED_TOKEN || process.argv[2];

if (!AUTH_TOKEN) {
  console.error('Usage: node seed.js <API_TOKEN>');
  console.error('Create API Token in Strapi Admin > Settings > API Tokens');
  process.exit(1);
}

async function api(path, method = 'GET', body) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  if (body) opts.body = JSON.stringify({ data: body });
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} => ${res.status}: ${JSON.stringify(json.error || json)}`);
  return json;
}

async function seed() {
  console.log('🌱 Starte Strapi Content Seed...\n');

  // ──────────────────────────────────────────────────────────────────────────
  // 1. HOMEPAGE (Single Type)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[1/5] Homepage...');
  await api('/api/homepage', 'PUT', {
    heroTitle: 'Ihr erfahrener Odoo-Partner in Deutschland',
    heroSubtitle:
      'Wir begleiten mittelstaendische Unternehmen bei der Einfuehrung, Anpassung und Optimierung von Odoo – von der Beratung bis zum Go-Live.',
    heroCTAPrimary: 'Kostenlose Erstberatung',
    heroCTASecondary: 'Unsere Leistungen entdecken',
    heroCTAPrimaryLink: '#contact',
    heroCTASecondaryLink: '#services',
    introTitle: 'Odoo-Expertise, die wirkt',
    introText:
      'Mit ueber 10 Jahren Erfahrung in ERP-Projekten und mehr als 50 erfolgreich abgeschlossenen Odoo-Implementierungen kennen wir die Herausforderungen Ihres Unternehmens genau. Wir liefern keine Standardloesungen – wir liefern Ihren Erfolg.',
    seoTitle: 'Odoo Beratung & Implementierung – Ihr Partner in Deutschland',
    seoDescription:
      'Professionelle Odoo ERP Beratung, Implementierung und Schulung fuer den deutschen Mittelstand. Kostenlose Erstberatung. Jetzt Termin vereinbaren.',
    seoKeywords:
      'Odoo Beratung, Odoo Implementierung, Odoo Partner Deutschland, ERP Beratung, Odoo Schulung',
    ogTitle: 'Odoo Beratung & Implementierung – Ihr Partner in Deutschland',
    ogDescription:
      'Ueber 10 Jahre Erfahrung in Odoo ERP Projekten. Wir begleiten Sie von der Analyse bis zum Go-Live.',
    publishedAt: new Date().toISOString(),
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. SERVICES (Collection Type)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[2/5] Leistungen (6 Eintraege)...');
  const services = [
    {
      title: 'Odoo Beratung & Analyse',
      description: 'Wir analysieren Ihre Geschaeftsprozesse und erarbeiten die optimale Odoo-Strategie – massgeschneidert fuer Ihr Unternehmen.',
      icon: 'chart-bar',
      order: 1,
      highlighted: true,
    },
    {
      title: 'Odoo Implementierung',
      description: 'Professionelle Einfuehrung aller relevanten Odoo-Module – termingerecht und im Budget.',
      icon: 'cog',
      order: 2,
      highlighted: false,
    },
    {
      title: 'Odoo Entwicklung & Customizing',
      description: 'Individuelle Anpassungen, eigene Module und API-Integrationen – wenn Standardfunktionen nicht ausreichen.',
      icon: 'code',
      order: 3,
      highlighted: false,
    },
    {
      title: 'Odoo Schulung & Training',
      description: 'Praxisnahe Schulungen fuer Ihr Team – vor Ort, remote oder als individuelle E-Learning-Kurse.',
      icon: 'academic-cap',
      order: 4,
      highlighted: false,
    },
    {
      title: 'Odoo Support & Wartung',
      description: 'Zuverlaessiger Second- und Third-Level-Support sowie regelmaessige Updates fuer einen reibungslosen Betrieb.',
      icon: 'support',
      order: 5,
      highlighted: false,
    },
    {
      title: 'Odoo Migration',
      description: 'Sicherer Umstieg von aelteren Odoo-Versionen oder anderen ERP-Systemen auf das aktuelle Odoo.',
      icon: 'refresh',
      order: 6,
      highlighted: false,
    },
  ];
  for (const svc of services) {
    await api('/api/services', 'POST', { ...svc, publishedAt: new Date().toISOString() });
    process.stdout.write('  ✓ ' + svc.title + '\n');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 3. FAQs (Collection Type)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[3/5] FAQs (8 Eintraege)...');
  const faqs = [
    {
      question: 'Was kostet eine Odoo-Implementierung?',
      answer: 'Die Kosten haengen vom Umfang ab. Eine einfache Einfuehrung beginnt ab ca. 5.000 EUR. Groessere Projekte mit individuellen Anpassungen koennen 20.000–100.000 EUR umfassen. Wir erstellen Ihnen gerne ein kostenloses Angebot.',
      order: 1,
      category: 'Kosten',
    },
    {
      question: 'Wie lange dauert ein typisches Odoo-Projekt?',
      answer: 'Eine Basisimplementierung dauert 4–8 Wochen. Groessere Projekte mit individuellen Modulen und Datenmigration koennen 3–6 Monate in Anspruch nehmen.',
      order: 2,
      category: 'Projekt',
    },
    {
      question: 'Welche Odoo-Module sind fuer den Mittelstand besonders relevant?',
      answer: 'Die beliebtesten Module sind: Buchhaltung, CRM & Vertrieb, Lagerverwaltung, Einkauf, Fertigung und HR. Je nach Branche kommen E-Commerce, Projektmanagement oder Helpdesk hinzu.',
      order: 3,
      category: 'Module',
    },
    {
      question: 'Bieten Sie auch Support nach dem Go-Live an?',
      answer: 'Ja, wir bieten verschiedene Support-Pakete an – von einfachem E-Mail-Support bis hin zu dedizierten SLA-Vertraegen mit garantierten Reaktionszeiten.',
      order: 4,
      category: 'Support',
    },
    {
      question: 'Koennen bestehende Daten aus einem anderen ERP migriert werden?',
      answer: 'Ja, wir haben Erfahrung mit Migrationen aus SAP, Microsoft Dynamics, Sage, DATEV und verschiedenen Branchenloesungen. Wir entwickeln individuelle Migrationsskripte und validieren die Datenpflege.',
      order: 5,
      category: 'Migration',
    },
    {
      question: 'Ist Odoo auch fuer kleine Unternehmen geeignet?',
      answer: 'Absolut. Odoo ist skalierbar und eignet sich fuer Unternehmen jeder Groesse. Gerade der Mittelstand profitiert von der Flexibilitaet und guenstigen Lizenzkosten im Vergleich zu SAP oder Microsoft Dynamics.',
      order: 6,
      category: 'Allgemein',
    },
    {
      question: 'Arbeiten Sie mit Odoo Community oder Odoo Enterprise?',
      answer: 'Wir haben Erfahrung mit beiden Varianten. Enterprise bietet mehr Module und offiziellen Support; Community ist kostenlos. Wir helfen Ihnen die richtige Variante zu waehlen.',
      order: 7,
      category: 'Allgemein',
    },
    {
      question: 'Bieten Sie eine kostenlose Erstberatung an?',
      answer: 'Ja! Jeder Interessent erhaelt ein kostenloses, unverbindliches Erstgespraech von 45–60 Minuten – telefonisch, per Video oder vor Ort.',
      order: 8,
      category: 'Allgemein',
    },
  ];
  for (const faq of faqs) {
    await api('/api/faqs', 'POST', { ...faq, publishedAt: new Date().toISOString() });
    process.stdout.write('  ✓ FAQ ' + faq.order + '\n');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 4. BLOG POSTS (Collection Type)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[4/5] Blogartikel (3 Eintraege)...');
  const posts = [
    {
      title: 'Odoo 17 vs. SAP Business One: Der grosse Vergleich fuer den Mittelstand',
      excerpt: 'Welches ERP-System passt zu Ihrem Unternehmen? Wir vergleichen Odoo 17 und SAP Business One in puncto Funktionsumfang, Kosten und Implementierungsaufwand.',
      content: 'Der Mittelstand steht bei der ERP-Wahl oft vor der gleichen Frage: Odoo oder SAP? Beide Systeme haben ihre Staerken.\n\n**Kosten**: Odoo Enterprise kostet ab ca. 15 EUR pro Nutzer und Monat, SAP Business One startet ab 1.400 EUR pro Nutzer (einmalig).\n\n**Implementierung**: Odoo-Projekte sind schneller und guenstiger. Waehrend ein SAP-Projekt oft 3–6 Monate dauert, sind schlanke Odoo-Implementierungen in 4–8 Wochen abgeschlossen.\n\n**Unser Fazit**: Fuer die meisten mittelstaendischen Unternehmen ist Odoo die wirtschaftlichere und agilere Wahl.',
      author: 'Mike Gibert',
      category: 'ERP Vergleich',
      readingTime: '5 min',
      seoTitle: 'Odoo 17 vs SAP Business One – ERP Vergleich fuer den Mittelstand',
      seoDescription: 'Odoo oder SAP? Unser detaillierter Vergleich in puncto Kosten, Funktionen und Implementierungsaufwand.',
    },
    {
      title: '10 Zeichen, dass Ihr Unternehmen ein neues ERP braucht',
      excerpt: 'Zu viele Excel-Tabellen, fehlende Echtzeitdaten, doppelte Datenpflege – kennen Sie das? Diese 10 Warnsignale zeigen, dass es Zeit fuer ein modernes ERP-System ist.',
      content: '1. Excel-Chaos: Wichtige Daten in Dutzenden Tabellenblaettern\n2. Doppelte Datenpflege in mehreren Systemen\n3. Fehlende Transparenz ueber Auftragssituation\n4. Langsame Monatsabschluesse\n5. Schlechte Reporting-Qualitaet\n6. Skalierbarkeitsprobleme\n7. Hoher manueller Aufwand\n8. Fehlende Mobile-Faehigkeit\n9. Compliance-Risiken\n10. Hohe IT-Kosten fuer alte Systeme\n\nErkennen Sie sich in 3 oder mehr Punkten wieder? Zeit fuer ein Gespraech.',
      author: 'Mike Gibert',
      category: 'ERP Beratung',
      readingTime: '4 min',
      seoTitle: '10 Zeichen: Ihr Unternehmen braucht ein neues ERP-System',
      seoDescription: '10 klare Warnsignale fuer ERP-Handlungsbedarf: Excel-Chaos, langsame Abschluesse, fehlende Transparenz.',
    },
    {
      title: 'Odoo Implementierung: So gelingt der Go-Live ohne Ueberraschungen',
      excerpt: 'Ein ERP-Projekt scheitert selten an der Technologie – aber oft an Projektmanagement und Change Management. Unsere Best Practices.',
      content: '**Phase 1: Anforderungsanalyse**\nZiele, Prozesse und Integrationsanforderungen klar definieren.\n\n**Phase 2: Pilotbetrieb**\nMit einem Bereich starten statt sofort alle Module einzufuehren.\n\n**Phase 3: Schulung**\nKey-User frueh einbinden und schulen.\n\n**Phase 4: Datenmigration**\nDaten rechtzeitig bereinigen und validieren.\n\n**Phase 5: Go-Live und Hypercare**\n2–4 Wochen intensiven Support nach dem Go-Live einplanen.\n\nMit diesem Ansatz haben wir ueber 50 erfolgreiche Odoo-Projekte begleitet.',
      author: 'Mike Gibert',
      category: 'Implementierung',
      readingTime: '6 min',
      seoTitle: 'Odoo Implementierung: Best Practices fuer erfolgreichen Go-Live',
      seoDescription: 'Unsere 5-Phasen-Methodik fuer eine erfolgreiche Odoo-Einfuehrung ohne Budget-Ueberraschungen.',
    },
  ];
  for (const post of posts) {
    await api('/api/blog-posts', 'POST', { ...post, publishedAt: new Date().toISOString() });
    process.stdout.write('  ✓ ' + post.title.substring(0, 50) + '...\n');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 5. GLOBAL SETTINGS (Single Type)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[5/5] Globale Einstellungen...');
  await api('/api/global', 'PUT', {
    companyName: 'Odoo Beratung Deutschland',
    tagline: 'Ihr erfahrener Odoo-Partner',
    phone: '+49 (0) 89 123 456 78',
    email: 'info@odoo-beratung-deutschland.de',
    address: 'Musterstrasse 42',
    city: 'Muenchen',
    postalCode: '80331',
    country: 'Deutschland',
    footerText: 'Professionelle Odoo ERP Beratung, Implementierung und Support fuer den deutschen Mittelstand.',
    linkedinUrl: 'https://www.linkedin.com/company/odoo-beratung-deutschland',
    siteUrl: 'https://odoo-beratung-deutschland.de',
    impressumUrl: '/impressum',
    datenschutzUrl: '/datenschutz',
  });

  console.log('\n✅ Seed abgeschlossen! Alle Inhalte wurden in Strapi eingefuegt.');
  console.log('\nNaechste Schritte:');
  console.log('  1. Oeffne http://localhost:1337/api/homepage?populate=*');
  console.log('  2. Du solltest die Homepage-Daten sehen');
  console.log('  3. Starte das Frontend: cd frontend && npm run dev');
}

seed().catch((err) => {
  console.error('\n❌ Seed fehlgeschlagen:', err.message);
  console.error('\nHaeufige Ursachen:');
  console.error('  1. Strapi laeuft nicht -> cd backend && npm run develop');
  console.error('  2. Falsches oder kein API-Token');
  console.error('  3. Content Types noch nicht kompiliert -> Strapi neu starten');
  process.exit(1);
});
