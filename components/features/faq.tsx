"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";

const faqItems = [
  {
    question: "¿Qué tamaños de contenedores manejan?",
    answer:
      "Trabajamos con contenedores de 10, 20 y 40 pies estándar y High Cube. También fabricamos medidas especiales según tu proyecto.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, contamos con logística nacional propia y acuerdos con transportistas. Entregamos en cualquier punto de Argentina con acompañamiento.",
  },
  {
    question: "¿Cuánto tarda una modificación completa?",
    answer:
      "Depende del alcance del proyecto. Una modificación básica tarda de 2 a 3 semanas; un proyecto integral (oficina o vivienda) entre 4 y 6 semanas.",
  },
  {
    question: "¿Los contenedores usados están en buenas condiciones?",
    answer:
      "Todos nuestros contenedores usados pasan por un proceso de inspección y reacondicionamiento. Entregamos con certificación de calidad y garantía escrita.",
  },
  {
    question: "¿Ofrecen financiamiento?",
    answer:
      "Sí, trabajamos con opciones de financiamiento a medida: cuotas fijas, leasing y planes especiales para empresas. Consultá con tu asesor.",
  },
  {
    question: "¿Puedo visitar la fábrica antes de comprar?",
    answer:
      "Por supuesto. Coordinamos visitas a nuestra planta donde podés ver contenedores en stock, proyectos en curso y conversar con el equipo técnico.",
  },
];

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
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-heading" className="heading-2 mt-3 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="section-subtitle mx-auto">
            Respuestas a las consultas más comunes. Si no encontrás lo que buscás, escribinos.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden transition-colors hover:border-border-strong"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                >
                  {item.question}
                  <Icon
                    name="chevron-down"
                    size={18}
                    className={`shrink-0 text-foreground-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`overflow-hidden transition-all ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 pb-4 text-sm text-foreground-secondary leading-relaxed">
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
