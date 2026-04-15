# Landing Pages — Buenas Prácticas & Checklist

Guía reutilizable para cualquier landing SaaS/servicios. Consultar antes de diseñar, desarrollar o auditar una landing.

---

## 1. Stack & Arquitectura

- **Server Components por defecto.** `"use client"` solo en lo interactivo (formularios, animaciones, FABs).
- **Design tokens de marca** centralizados: colores primarios, secundarios y neutros como CSS custom properties en `:root`, consumidos vía Tailwind `theme()`.
- **Tipografía** cargada con `next/font/google` y `display: 'swap'` — expuesta como CSS variable para que Tailwind la consuma.
- **Estructura modular por sección:** cada bloque de la landing es un componente independiente (Hero, SocialProof, Services, Solutions, FAQ, Blog, CTA, Footer).
- **Layout global** inyecta elementos persistentes: Navbar fija, CTA flotante, WhatsApp FAB.
- **Path alias** `@/*` en `tsconfig.json` para imports absolutos. Asset prefix si se deploya en subpath o CDN.

## 2. SEO Orgánico

- **Metadata API de Next.js** con `title.template` en layout raíz (`"%s | Marca"`) y `title.default` como fallback.
- **Meta descriptions** con keywords transaccionales + geo-localizadas. Máx ~155 caracteres.
- **Canonical** vía `alternates.canonical`. Agregar `hreflang` si hay versiones multi-idioma.
- **Open Graph:** imagen dedicada 1200×630px. Twitter Card `summary_large_image`.
- **JSON-LD doble:**
  - `ProfessionalService` / `Organization` con `hasOfferCatalog`, `areaServed`, `contactPoint`.
  - `WebSite` con `SearchAction` (potentialAction) si aplica.
- **`sitemap.ts`** dinámico con prioridades diferenciadas (`1.0` home, `0.8` servicios, `0.6` blog).
- **`robots.ts`** con `Allow`/`Disallow` selectivo y referencia al sitemap.
- **Metadata per-page** sobrescribe defaults del layout — ninguna ruta pública sin título ni descripción.

## 3. Performance & Core Web Vitals

- **Objetivos:** LCP < 2.5s · CLS < 0.1 · INP < 200ms.
- **Imágenes:** formatos AVIF/WebP nativos vía config de Next.js (`images.formats`). Siempre `next/image` con `alt` obligatorio + `sizes` responsivo.
- **Videos:** `autoPlay muted playsInline` + poster WebP de fallback. Nunca bloquear render con video.
- **Scripts de analytics** con `strategy="afterInteractive"` para no competir con LCP.
- **Lazy load** todo lo que esté below-the-fold. Prefetch rutas críticas.
- **Bundle:** dynamic imports para librerías pesadas (GSAP, charts). Auditar con bundle analyzer periódicamente.
- **`reactStrictMode: true`** siempre habilitado.

## 4. Seguridad (OWASP Headers)

Configurar en `next.config.ts` → `headers()`:

| Header | Valor |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

- `formatDetection` desactivado en metadata para evitar auto-linking del navegador.
- Validación server-side (zod) en formularios y route handlers. Sanitizar inputs.
- Sin secretos en client — todo en `.env` y accedido solo desde server.

## 5. Copywriting Orientado a Conversión

- **Headline principal** en estructura: dolor → solución → diferenciador. La última línea como eye-catcher visual (gradiente animado, color acento, o peso tipográfico distinto).
- **Subtítulo** que sintetiza propuesta de valor + prueba social en una frase. Ej: *"Con calidad de empresa grande, sin los costos de una agencia grande."*
- **Cards de servicios:** título orientado a beneficio-cliente + tagline + 3 bullets de resultado concreto (no features abstractas).
- **Tono:** conversacional, directo, en el idioma del público objetivo. Evitar jerga técnica innecesaria.
- **Trust signals distribuidos** por toda la landing:
  - Badge animado (certificaciones, garantías).
  - Contadores animados (proyectos, clientes, rubros, tiempo de respuesta).
  - Micro-copy bajo CTAs: *"Respuesta en menos de 24hs"*, *"Primera consulta sin compromiso"*.
- **Doble CTA siempre visible:**
  - Primario: WhatsApp (`#25D366`) — menor fricción.
  - Secundario: formulario / contacto / agendar llamada.

## 6. Animaciones & UX Visual

- **GSAP como motor principal** — importar solo en Client Components.
  - **Hero:** timeline secuencial (badge → headline stagger → subtítulo → pills → CTAs → trust copy).
  - **Scroll:** `ScrollTrigger` para cards stagger, contadores, parallax en sección CTA con video.
  - **Ambientales:** blobs flotantes con `gsap.to()` yoyo infinito para profundidad.
- **Registrar plugins una sola vez** en un provider/wrapper. Limpiar timelines en `useEffect` cleanup.
- **Respetar `prefers-reduced-motion`:** deshabilitar o reducir animaciones cuando el usuario lo pide.
- **Marquee CSS** (`animation: infinite linear`) para pills de industrias o logos.
- **Tema dark recomendado:** fondo `#080808` con dot-grid sutil, jerarquía `white` / `gray-400` / `gray-600`, gradientes acento (ej: azul → verde).
- **Mobile-first:** breakpoints `sm` / `md` / `lg` con clases condicionales de padding, font-size y layout.

## 7. Accesibilidad (WCAG 2.1 AA)

- **Skip-to-content:** link `sr-only focus:not-sr-only` como primer elemento del body.
- **HTML semántico:** `<main>`, `<section>`, `<nav aria-label="...">`, `<footer>`. No `<div>` para estructura.
- **Decorativos:** `aria-hidden="true"` en blobs, grids, overlays.
- **Formularios:** `<label>` asociado a cada input. Placeholders descriptivos. Errores con `aria-describedby`.
- **Contraste** mínimo 4.5:1 para texto, 3:1 para texto grande.
- **Focus visible** en todo elemento interactivo. Tab order lógico.
- **Testear** con axe-core o Lighthouse Accessibility.

## 8. Estructura del Layout

```
Navbar fija (sticky top-0, z alto)
├── offset en body: pt-[altura-navbar]
│
├── <main>
│   ├── Hero
│   ├── SocialProof / Trust Signals
│   ├── Services / Features
│   ├── Solutions / How it Works
│   ├── Testimonials / Case Studies
│   ├── FAQ (acordeón accesible)
│   ├── Blog / Resources (si aplica)
│   └── CTA final (video parallax + formulario)
│
├── Footer (links internos, legales, redes)
├── WhatsApp FAB (position fixed, bottom-right)
└── CTA flotante (visible on scroll, opcional)
```

## 9. Checklist Pre-Deploy

- [ ] Metadata completa en todas las rutas (título, descripción, OG image)
- [ ] JSON-LD válido (testear en Rich Results Test)
- [ ] sitemap.xml y robots.txt accesibles
- [ ] Imágenes optimizadas (AVIF/WebP, `alt` en todas)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Headers de seguridad configurados
- [ ] Formularios validados server-side
- [ ] Animaciones respetan `prefers-reduced-motion`
- [ ] Responsive verificado en 320px, 768px, 1024px, 1440px
- [ ] WhatsApp link y CTAs funcionales
- [ ] `canonical` correcto en cada página
- [ ] Sin `console.log` ni imports no usados
- [ ] `.env.example` actualizado
