"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui";
import content from "@/data/content.json";

const { gallery: data } = content;

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [hero, img1, img2, img3, img4] = data.images;
  const isOpen = currentIndex !== null;
  const displayedIndex = currentIndex ?? 0;
  const activeImage = isOpen ? data.images[displayedIndex] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog || dialog.open) return;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  const open = (index: number) => setCurrentIndex(index);
  const close = () => dialogRef.current?.close();
  const previous = () => {
    setCurrentIndex((index) =>
      index === null ? 0 : (index - 1 + data.images.length) % data.images.length,
    );
  };
  const next = () => {
    setCurrentIndex((index) =>
      index === null ? 0 : (index + 1) % data.images.length,
    );
  };

  return (
    <section
      id="galeria"
      className="section section-dark"
      aria-labelledby="gallery-heading"
    >
      <div className="container-base">
        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <span className="eyebrow" style={{ color: "var(--color-accent-400)" }}>
              {data.eyebrow}
            </span>
            <h2
              id="gallery-heading"
              className="heading-2 mt-3"
              style={{ color: "var(--dark-fg)" }}
            >
              {data.title}
              <br />
              <em style={{ color: "var(--color-accent-400)" }}>{data.titleAccent}</em>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => open(0)}
            className="btn btn-secondary btn-lg shrink-0"
            style={{
              borderColor: "var(--dark-border)",
              color: "var(--dark-fg)",
              letterSpacing: "var(--tracking-wider)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
            }}
          >
            VER TODOS
          </button>
        </div>

        {/* ── Mobile grid: hero full-width + 2×2 ── */}
        <div className="md:hidden flex flex-col gap-3">
          <button
            type="button"
            className="relative w-full rounded-xl overflow-hidden"
            style={{ height: "260px" }}
            onClick={() => open(0)}
            aria-label={hero.alt}
          >
            <Image src={hero.src} alt={hero.alt} fill className="object-cover" sizes="100vw" />
          </button>
          <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: "180px 180px" }}>
            {[img1, img2, img3, img4].map((img, i) => (
              <button
                key={img.id}
                type="button"
                className="relative rounded-xl overflow-hidden w-full h-full"
                onClick={() => open(i + 1)}
                aria-label={img.alt}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop grid: tall hero left + 2×2 right ── */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "300px 300px",
          }}
        >
          {/* Hero — spans 2 rows */}
          <button
            type="button"
            className="relative rounded-xl overflow-hidden"
            style={{ gridColumn: "1", gridRow: "1 / 3" }}
            onClick={() => open(0)}
            aria-label={hero.alt}
          >
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="33vw"
            />
          </button>

          {/* 2×2 */}
          {[img1, img2, img3, img4].map((img, i) => (
            <button
              key={img.id}
              type="button"
              className="relative rounded-xl overflow-hidden"
              onClick={() => open(i + 1)}
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <dialog
          ref={dialogRef}
          className="m-0 h-svh w-screen max-w-none border-0 p-0"
          style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
          aria-labelledby="gallery-dialog-title"
          onClose={() => setCurrentIndex(null)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              previous();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              next();
            }
          }}
        >
          <h2 id="gallery-dialog-title" className="sr-only">
            Visor de galería
          </h2>

          <div className="relative h-full w-full">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain p-4 sm:p-8 md:p-12"
              sizes="100vw"
              priority
            />

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full p-3 transition-colors"
              style={{
                background: "var(--dark-bg-secondary)",
                color: "var(--dark-fg)",
                zIndex: "var(--z-modal)",
              }}
              aria-label="Cerrar galería"
            >
              <Icon name="x" size={24} />
            </button>

            <button
              type="button"
              onClick={previous}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 transition-transform hover:scale-110"
              style={{
                background: "var(--dark-bg-secondary)",
                color: "var(--dark-fg)",
                zIndex: "var(--z-modal)",
              }}
              aria-label="Imagen anterior"
            >
              <Icon name="arrow-left" size={24} />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 transition-transform hover:scale-110"
              style={{
                background: "var(--dark-bg-secondary)",
                color: "var(--dark-fg)",
                zIndex: "var(--z-modal)",
              }}
              aria-label="Imagen siguiente"
            >
              <Icon name="arrow-right" size={24} />
            </button>

            <p
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm"
              style={{
                background: "var(--dark-bg-secondary)",
                color: "var(--dark-fg-secondary)",
                zIndex: "var(--z-modal)",
              }}
              aria-live="polite"
            >
              {displayedIndex + 1} de {data.images.length}
            </p>
          </div>
        </dialog>
      )}
    </section>
  );
}
