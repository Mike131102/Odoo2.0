import { useState } from 'react';
import type { FAQ } from '../types/strapi';

type FAQItem = Pick<FAQ, 'id' | 'question' | 'category'> & { answer: string };

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-20 lg:py-28 bg-odoo-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-odoo-dark mt-2">
            Haeufig gestellte Fragen
          </h2>
          <p className="text-odoo-muted mt-4">
            Alles, was Sie ueber unsere Leistungen und Odoo wissen moechten.
          </p>
        </div>

        <div className="space-y-3" role="list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const btnId = `faq-btn-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div
                key={faq.id}
                role="listitem"
                className={`bg-white rounded-2xl overflow-hidden shadow-card transition-all duration-200 ${isOpen ? 'shadow-card-hover' : ''}`}
              >
                <button
                  id={btnId}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={`font-semibold pr-4 ${isOpen ? 'text-brand' : 'text-odoo-dark'} group-hover:text-brand transition-colors`}>
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-brand text-white rotate-180' : 'bg-gray-100 text-odoo-muted'}`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
                >
                  <div className="px-6 pb-5">
                    <div className="h-px bg-odoo-border mb-4" />
                    <p className="text-odoo-muted leading-relaxed text-sm whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-odoo-muted text-sm">
            Haben Sie weitere Fragen?{' '}
            <a href="#contact" className="text-brand font-semibold hover:underline">
              Kontaktieren Sie uns
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}