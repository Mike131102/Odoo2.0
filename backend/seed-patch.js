const BASE_URL = 'http://localhost:1337';
const AUTH_TOKEN = process.argv[2];

async function api(path, method, body) {
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

async function run() {
  // Blog posts with explicit slugs
  const posts = [
    {
      title: 'Odoo 17 vs. SAP Business One: Der grosse Vergleich fuer den Mittelstand',
      slug: 'odoo-17-vs-sap-business-one-vergleich',
      excerpt: 'Welches ERP-System passt zu Ihrem Unternehmen? Wir vergleichen Odoo 17 und SAP Business One in puncto Funktionsumfang, Kosten und Implementierungsaufwand.',
      content: 'Der Mittelstand steht bei der ERP-Wahl oft vor der gleichen Frage: Odoo oder SAP?\n\nKosten: Odoo Enterprise kostet ab ca. 15 EUR pro Nutzer/Monat. SAP Business One startet ab 1.400 EUR pro Nutzer einmalig.\n\nImplementierung: Odoo-Projekte sind schneller. Waehrend SAP-Projekte 3-6 Monate dauern, sind Odoo-Implementierungen in 4-8 Wochen abgeschlossen.\n\nUnser Fazit: Fuer die meisten mittelstaendischen Unternehmen ist Odoo die wirtschaftlichere Wahl.',
      author: 'Mike Gibert',
      category: 'ERP Vergleich',
      readingTime: '5 min',
      seoTitle: 'Odoo 17 vs SAP Business One – ERP Vergleich fuer den Mittelstand',
      seoDescription: 'Odoo oder SAP? Unser detaillierter Vergleich in puncto Kosten, Funktionen und Implementierungsaufwand.',
      publishedAt: new Date().toISOString(),
    },
    {
      title: '10 Zeichen, dass Ihr Unternehmen ein neues ERP braucht',
      slug: '10-zeichen-neues-erp-system',
      excerpt: 'Excel-Chaos, fehlende Transparenz, doppelte Datenpflege – kennen Sie das? Diese 10 Warnsignale zeigen, dass es Zeit fuer ein modernes ERP ist.',
      content: '1. Excel-Chaos\n2. Doppelte Datenpflege\n3. Fehlende Transparenz\n4. Langsame Monatsabschluesse\n5. Schlechtes Reporting\n6. Skalierbarkeitsprobleme\n7. Hoher manueller Aufwand\n8. Fehlende Mobile-Faehigkeit\n9. Compliance-Risiken\n10. Hohe IT-Kosten',
      author: 'Mike Gibert',
      category: 'ERP Beratung',
      readingTime: '4 min',
      seoTitle: '10 Zeichen: Ihr Unternehmen braucht ein neues ERP-System',
      seoDescription: '10 klare Warnsignale fuer ERP-Handlungsbedarf: Excel-Chaos, langsame Abschluesse, fehlende Transparenz.',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'Odoo Implementierung: So gelingt der Go-Live ohne Ueberraschungen',
      slug: 'odoo-implementierung-go-live-best-practices',
      excerpt: 'ERP-Projekte scheitern selten an der Technologie. Unsere Best Practices fuer eine erfolgreiche Odoo-Einfuehrung.',
      content: 'Phase 1: Anforderungsanalyse\nZiele klar definieren.\n\nPhase 2: Pilotbetrieb\nMit einem Bereich starten.\n\nPhase 3: Schulung\nKey-User frueh einbinden.\n\nPhase 4: Datenmigration\nDaten bereinigen und validieren.\n\nPhase 5: Go-Live\n2-4 Wochen Hypercare einplanen.',
      author: 'Mike Gibert',
      category: 'Implementierung',
      readingTime: '6 min',
      seoTitle: 'Odoo Implementierung: Best Practices fuer erfolgreichen Go-Live',
      seoDescription: 'Unsere 5-Phasen-Methodik fuer eine erfolgreiche Odoo-Einfuehrung ohne Budget-Ueberraschungen.',
      publishedAt: new Date().toISOString(),
    },
  ];

  console.log('Fuege Blog-Posts ein...');
  for (const post of posts) {
    await api('/api/blog-posts', 'POST', post);
    console.log('  + ' + post.title.substring(0, 60));
  }

  // Homepage
  console.log('Homepage aktualisieren...');
  try {
    await api('/api/homepage', 'PUT', {
      heroTitle: 'Ihr erfahrener Odoo-Partner in Deutschland',
      heroSubtitle: 'Wir begleiten mittelstaendische Unternehmen bei der Einfuehrung, Anpassung und Optimierung von Odoo – von der Beratung bis zum Go-Live.',
      heroCTAPrimary: 'Kostenlose Erstberatung',
      heroCTASecondary: 'Unsere Leistungen entdecken',
      heroCTAPrimaryLink: '#contact',
      heroCTASecondaryLink: '#services',
      introTitle: 'Odoo-Expertise, die wirkt',
      introText: 'Mit ueber 10 Jahren Erfahrung und mehr als 50 erfolgreich abgeschlossenen Odoo-Projekten kennen wir die Herausforderungen Ihres Unternehmens genau.',
      seoTitle: 'Odoo Beratung & Implementierung – Ihr Partner in Deutschland',
      seoDescription: 'Professionelle Odoo ERP Beratung, Implementierung und Schulung fuer den deutschen Mittelstand. Kostenlose Erstberatung.',
      seoKeywords: 'Odoo Beratung, Odoo Implementierung, Odoo Partner Deutschland, ERP Beratung',
      ogTitle: 'Odoo Beratung & Implementierung – Ihr Partner in Deutschland',
      ogDescription: 'Ueber 10 Jahre Erfahrung in Odoo ERP Projekten. Von der Analyse bis zum Go-Live.',
      publishedAt: new Date().toISOString(),
    });
    console.log('  + Homepage OK');
  } catch (e) {
    console.log('  ! Homepage: ' + e.message);
  }

  // Global
  console.log('Globale Einstellungen...');
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
  });
  console.log('  + Global OK');

  console.log('\nFertig!');
}

run().catch(e => { console.error('Fehler:', e.message); process.exit(1); });