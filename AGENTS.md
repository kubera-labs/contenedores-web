<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Contenedores Web — Contexto Global del Proyecto

## Stack & Versiones
Next.js 16 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind CSS 4 · GSAP (por instalar) · ESLint 9.
Alias: `@/*` → raíz del proyecto. Hosting: Vercel (o compatible). Storage de assets: cloud (S3/R2/GCS), límite configurable **600 MB–1 GB** por entorno.

## Objetivo
Landing page SaaS para empresa de contenedores + panel administrativo (backoffice) para editar textos, imágenes, vídeos y documentos del sitio público en tiempo real.

## Decisiones de Arquitectura
- **Rendering:** páginas públicas → SSG (`generateStaticParams` + ISR/revalidate). Secciones dinámicas del admin → Server Components + `"use client"` solo donde haya interactividad (formularios, GSAP, uploads).
- **Contenido:** texto/media que NO depende del admin se hardcodea como constantes estáticas en build. Lo editable se sirve desde API/DB y se revalida on-demand.
- **Estructura feature-based:** `app/(public)/`, `app/(admin)/`, `lib/`, `components/ui/`, `components/features/`, `config/`, `types/`, `public/`.
- **Sistema de diseño:** tokens centralizados en `globals.css` (`:root` CSS vars) para colores, espaciados, radios, sombras y tipografía. Componentes consumen tokens vía Tailwind `theme()` — nunca valores mágicos.
- **SEO integral:** `metadata` / `generateMetadata` por ruta; Open Graph, JSON-LD (Organization + Product), sitemap.xml, robots.txt dinámicos. Imágenes con `next/image` + `alt` obligatorio + formatos modernos (WebP/AVIF).
- **Performance:** `loading.tsx` por segmento, `<Suspense>` granular, dynamic imports para GSAP y componentes pesados, font-display swap, bundle analyzer periódico.
- **Accesibilidad:** HTML semántico, landmarks ARIA, contraste WCAG AA mínimo, focus visible en todo interactivo, skip-to-content.
- **Seguridad:** validación en server actions/route handlers (zod), sanitización de inputs, CSP headers, sin secretos en client.
- **Assets & uploads:** subida a cloud storage vía presigned URLs; validar tipo MIME + tamaño en server antes de firmar; thumbnails generados al vuelo o en upload.
- **Escalabilidad limpia:** sin abstracciones prematuras; extraer solo cuando un patrón se repita ≥ 3 veces; no crear helpers para operaciones únicas.

## Convenciones de Código
- Archivos: `kebab-case.tsx`. Componentes: `PascalCase`. Hooks: `useCamelCase`. Tipos/interfaces con `I`/`T` prefix solo si hay colisión.
- Server Components por defecto; `"use client"` explícito y lo más abajo posible en el árbol.
- Imports absolutos `@/…`. Barrel exports solo en `components/ui/index.ts`.
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

---

## Skills / Orquestadores por Dominio

### next — Routing & Rendering
Lee `node_modules/next/dist/docs/` antes de tocar rutas, layouts o APIs. Usa App Router patterns: layouts anidados, parallel routes si aplica, route groups `(public)`/`(admin)`. No uses Pages Router ni `getServerSideProps`.

### tailwind — Sistema de Diseño
Tailwind 4 con `@theme inline` en `globals.css`. Tokens en CSS custom properties → consumidos con `var()` o `theme()`. No `@apply` salvo en estilos base. Nunca hardcodear colores/espaciados fuera de tokens.

### seo — Metadatos & Indexación
Cada ruta pública exporta `metadata` o `generateMetadata`. JSON-LD en layout raíz (Organization) y por producto. `sitemap.ts` y `robots.ts` en `app/`. Verificar en build que no haya rutas sin título/descripción.

### gsap — Animaciones
Instalar `gsap` como dependencia. Importar solo en Client Components. Registrar plugins (`ScrollTrigger`, etc.) una vez en un provider. Limpiar timelines en `useEffect` cleanup. Respetar `prefers-reduced-motion`.

### admin — Panel Administrativo
Rutas bajo `app/(admin)/admin/…` protegidas con middleware auth. CRUD de secciones editables: hero, features, pricing, testimonios, FAQ, media. Formularios con server actions + validación zod. Preview antes de publicar. Revalidar rutas públicas tras guardar (`revalidatePath`/`revalidateTag`).

### storage — Assets & Media
Upload a cloud storage vía presigned URL generada en route handler. Validar: tipo MIME (image/video/pdf), tamaño máx configurable en `config/storage.ts` (default 600 MB, tope 1 GB). Generar thumbnails para imágenes. Servir con CDN + cache headers. Limpiar assets huérfanos periódicamente.

### perf — Performance & Core Web Vitals
Objetivo: LCP < 2.5s, CLS < 0.1, INP < 200ms. Auditar con Lighthouse en CI. Lazy load below-the-fold. Prefetch rutas críticas. Comprimir assets. Monitorear bundle size.

### a11y — Accesibilidad
WCAG 2.1 AA obligatorio. Testear con axe-core. Landmarks, roles, `aria-label` donde no haya texto visible. Tab order lógico. Errores de formulario asociados con `aria-describedby`.

### dx — Developer Experience
`dev` con turbopack. Linting en pre-commit. Tipos estrictos sin `any`. Paths alias. README actualizado con setup, scripts y decisiones.
