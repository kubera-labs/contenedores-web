"use client";

import { useState } from "react";
import content from "@/data/content.json";
import { Icon } from "@/components/ui";

const { faq: data } = content;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow" style={{ color: "var(--color-accent-400)" }}>
            {data.eyebrow}
          </span>
          <h2 id="faq-heading" className="heading-2 mt-3 mb-4">
            {data.title}
          </h2>
          <p className="section-subtitle mx-auto">{data.subtitle}</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden transition-colors"
                style={{
                  border: `1px solid ${isOpen ? "rgba(251,191,36,0.35)" : "var(--border)"}`,
                }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-button-${item.id}`}
                >
                  <span style={{ color: isOpen ? "var(--color-accent-400)" : undefined }}>
                    {item.question}
                  </span>
                  <Icon
                    name="chevron-down"
                    size={18}
                    className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: isOpen ? "var(--color-accent-400)" : "var(--foreground-muted)", flexShrink: 0 }}
                  />
                </button>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                  className={`overflow-hidden transition-all ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

