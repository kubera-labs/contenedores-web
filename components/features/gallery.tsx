"use client";

import { useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import content from "@/data/content.json";
import type { LightGallery as LGInstance } from "lightgallery/lightgallery";

const { gallery: data } = content;

const dynamicEl = data.images.map((img) => ({
  src: img.src,
  thumb: img.src,
  alt: img.alt,
}));

export function Gallery() {
  const lgRef = useRef<LGInstance | null>(null);

  const open = (index: number) => lgRef.current?.openGallery(index);

  const [hero, img1, img2, img3, img4] = data.images;

  return (
    <section
      id="galeria"
      className="section section-dark"
      aria-labelledby="gallery-heading"
    >
      {/* LightGallery — dynamic mode, hidden trigger */}
      <LightGallery
        onInit={(ref) => { lgRef.current = ref.instance; }}
        plugins={[lgZoom, lgThumbnail]}
        dynamic
        dynamicEl={dynamicEl}
        licenseKey="0000-0000-000-0000"
        speed={400}
        download={false}
      >
        {/* lightgallery requires at least one child in dynamic mode */}
        <span className="sr-only">galería</span>
      </LightGallery>

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
    </section>
  );
}
