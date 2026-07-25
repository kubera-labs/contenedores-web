# Code Review — Contenedores Web (Monarca container)

> Generado al cierre de la sesión de implementación. Todas las observaciones incluyen archivo, línea aproximada, severidad y recomendación concreta.

---

## 🔴 Errores / Bugs (Severity: Critical)

### 1. Redirect loop en `/admin-login` — `proxy.ts` (ya corregido en esta sesión)

**Archivo:** `proxy.ts` línea 10  
**Problema:** `pathname.startsWith("/admin")` devuelve `true` para `/admin-login`. Un usuario no autenticado que visitaba `/admin-login` era redirigido a sí mismo → bucle infinito de 307.  
**Corrección aplicada:** `pathname.startsWith("/admin") && pathname !== LOGIN_PATH`  
**Estado:** ✅ Corregido

---

### 2. `data/content.json` es mutable en disco — incompatible con Vercel

**Archivo:** `lib/db.ts`, `app/api/content/[section]/route.ts`  
**Problema:** `setSection` escribe directamente en `data/content.json` con `writeFile`. En Vercel (y cualquier entorno serverless), el sistema de archivos es de solo lectura fuera de `/tmp`. Cualquier PATCH al content va a fallar silenciosamente o lanzar un EACCES en producción.  
**Recomendación:** Migrar la persistencia a una base de datos real:
- **Opción A (gratuita):** [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (Redis) con `@vercel/kv`.
- **Opción B (relacional):** [Neon](https://neon.tech/) (Postgres serverless gratuito) con Drizzle o Prisma.
- **Opción C (mínimo esfuerzo):** [Upstash Redis](https://upstash.com/) — drop-in con API HTTP, sin conexión persistente.  
**Impacto:** Todo el admin panel no persiste cambios en producción.

---

### 3. Comparación de credenciales no timing-safe — `app/api/admin/login/route.ts`

**Archivo:** `app/api/admin/login/route.ts` línea 16  
**Problema:** `username !== process.env.ADMIN_USERNAME` es una comparación de strings ordinaria, susceptible a timing attacks (aunque de bajo riesgo en este contexto).  
**Recomendación:**
```ts
import { timingSafeEqual } from "node:crypto";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}
```
**Impacto:** Bajo en este contexto (credenciales únicas, sin intentos ilimitados), pero es OWASP A07 (Identification and Authentication Failures).

---

### 4. Sin rate limiting en el endpoint de login

**Archivo:** `app/api/admin/login/route.ts`  
**Problema:** No hay protección contra fuerza bruta. Un atacante puede intentar credenciales indefinidamente.  
**Recomendación:** Usar `@upstash/ratelimit` + Upstash Redis, o manejar rate limiting desde el middleware en `proxy.ts`:
```ts
// En proxy.ts — bloquear /api/admin/login después de N intentos
```
O más simple: configurar rate limiting en Vercel Edge Config / headers.  
**Impacto:** OWASP A07 — medium risk en un panel admin.

---

## 🟡 Issues de Calidad (Severity: Warning)

### 5. `content.json` no se valida con Zod al leer

**Archivo:** `lib/db.ts` línea 7–12  
**Problema:** `getContent()` parsea el JSON sin validación de schema. Si el archivo es editado manualmente con errores, toda la app puede romper.
```ts
// actual
const content = JSON.parse(await readFile(DB_PATH, "utf-8")) as SiteContent;

// recomendado
import { SiteContentSchema } from "@/types/content.schema";
const content = SiteContentSchema.parse(JSON.parse(...));
```
**Recomendación:** Crear `types/content.schema.ts` con Zod y validar en `getContent`.

---

### 6. Ruta muerta: `/api/gallery-images` (si existe)

**Problema:** En sesiones anteriores existía un `/api/gallery-images`. Si el archivo aún existe, es código muerto que confunde y ocupa namespace.  
**Acción:** Verificar y eliminar si existe:
```
app/api/gallery-images/route.ts  ← eliminar si existe
```

---

### 7. Sin error boundaries en Client Components del admin

**Archivos:** `components/features/admin/*.tsx`  
**Problema:** Si `useMediaLibrary()`, `useBandaAdmin()` o cualquier fetch falla con una excepción no catcheada en render, React desmonta el árbol sin mostrar nada útil.  
**Recomendación:** Envolver secciones críticas del admin en `<ErrorBoundary>` de `react-error-boundary`:
```tsx
import { ErrorBoundary } from "react-error-boundary";
<ErrorBoundary fallback={<p>Error al cargar esta sección.</p>}>
  <BandaAdminEditor />
</ErrorBoundary>
```

---

### 8. Sin optimistic UI en los formularios de edición

**Archivos:** Todos los `*-admin.tsx`  
**Problema:** Al guardar, el usuario ve solo el estado de loading sin feedback inmediato de que el cambio fue aceptado.  
**Recomendación:** Usar `useOptimistic` de React 19 o simplemente actualizar el estado local antes de confirmar con el servidor, revirtiendo si falla.

---

### 9. `banda-admin.tsx` usa HTML entities para caracteres españoles

**Archivo:** `components/features/admin/banda-admin.tsx`  
**Problema:** El archivo usa `Im&aacute;genes`, `Galer&iacute;a`, etc. como workaround al bug de encoding de PowerShell. Es código de workaround, no una solución limpia.  
**Recomendación:** No es urgente si el build pasa, pero en una refactorización futura: guardar el archivo con un editor que preserve UTF-8 o usar `$OutputEncoding = [System.Text.Encoding]::UTF8` en PowerShell antes de cualquier operación de escritura.

---

### 10. `next/image` sin `sizes` prop en varias imágenes

**Archivos:** `components/features/admin/gallery-admin-editor.tsx`, `media-library.tsx`  
**Problema:** Imágenes renderizadas en grillas sin `sizes` hacen que el browser descargue el tamaño completo de la imagen aunque se muestre en 200px.  
**Recomendación:** Agregar `sizes="(max-width: 768px) 50vw, 20vw"` (o equivalente según layout) en todos los `<Image>` dentro de grillas.

---

### 11. Sin validación de Content-Type en PATCH de content

**Archivo:** `app/api/content/[section]/route.ts` línea 38  
**Problema:** `req.json()` puede lanzar si el body no es JSON válido, pero el error se captura genéricamente con status 500 en lugar de 400.  
**Recomendación:**
```ts
let body: unknown;
try {
  body = await req.json();
} catch {
  return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
}
```

---

## 🟢 Observaciones Menores (Severity: Info)

### 12. `revalidatePath("/", "layout")` invalida TODO el sitio

**Archivo:** `app/api/content/[section]/route.ts` línea 42  
**Problema:** Cada PATCH invalida el cache de toda la aplicación, no solo la sección editada. En un sitio grande esto puede ser costoso.  
**Recomendación:** Usar tags por sección:
```ts
// Al leer
import { unstable_cache } from "next/cache";
const getHeroWithCache = unstable_cache(getSection, ["hero"], { tags: ["hero"] });

// Al escribir
revalidateTag(section);
```

### 13. `config/site.ts` — `whatsapp` hardcodeado con número de teléfono

**Problema:** El número de WhatsApp y teléfono no son editables desde el admin. Si cambia, hay que hacer deploy.  
**Recomendación:** Moverlo a `content.json` bajo una sección `contact` editable.

### 14. Sin `loading.tsx` en rutas de admin

**Archivos:** `app/(admin)/admin/*/`  
**Problema:** Sin `loading.tsx` por segmento, no hay UI de loading durante la navegación entre secciones del admin.  
**Recomendación:** Agregar un `loading.tsx` mínimo en `app/(admin)/admin/`:
```tsx
export default function Loading() {
  return <div className="flex items-center justify-center h-32">Cargando…</div>;
}
```

---

## 📊 Resumen

| Categoría | Cantidad |
|-----------|---------|
| 🔴 Critical | 4 (1 ya corregido) |
| 🟡 Warning | 7 |
| 🟢 Info | 3 |
| **Total** | **14** |

**Prioridad inmediata antes de producción:** Issues #2 (filesystem/DB), #3 (timing-safe), #4 (rate limiting).

---

# Gap Analysis — ¿Qué falta agregar?

## 🔴 Falta Crítico (bloquea producción real)

### A. Base de datos real para el contenido
Como se mencionó en #2, `content.json` no funciona en Vercel. El paso mínimo es migrar a **Upstash Redis** o **Vercel KV**.

### B. Variables de entorno en producción
No hay `.env.example` en el repo. El equipo no sabe qué env vars configurar en Vercel:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

**Acción:** Crear `.env.example` con valores placeholder.

### C. Dominio / Deploy configurado
No hay configuración de Vercel (vercel.json) ni pipeline CI/CD. El deploy manual es riesgoso.

---

## 🟡 Falta Importante (deuda técnica a corto plazo)

### D. Formulario de contacto funcional
Las CTAs de WhatsApp y email son links directos. No hay form de contacto real con:
- Campo nombre, mensaje
- Validación servidor (Zod)
- Email notification (Resend / SendGrid / Nodemailer)
- Anti-spam (honeypot o turnstile)

### E. Animaciones GSAP
`AGENTS.md` lo lista como skill. `gsap` está en las dependencias pero **no se usa en ningún componente**. El hero, beneficios y estadísticas se beneficiarían de scroll animations.

**Archivos a animar:** `hero.tsx`, `social-proof.tsx`, `benefits.tsx`, `solutions.tsx`

### F. `robots.txt` y `sitemap.xml` dinámicos
Los archivos `app/sitemap.ts` y `app/robots.ts` no existen. Sin ellos, Google no indexa el sitio correctamente.

```ts
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://monarcascontainer.com", lastModified: new Date() },
    { url: "https://monarcascontainer.com/privacidad", ... },
    { url: "https://monarcascontainer.com/terminos", ... },
  ];
}
```

### G. JSON-LD estructurado
`AGENTS.md` especifica JSON-LD (Organization + Product). No está implementado en el layout raíz.

### H. Preview mode antes de publicar
El admin guarda y publica en simultáneo. No hay forma de previsualizar cambios antes de que sean públicos. Una implementación mínima sería una segunda ruta `/preview/...` con los datos del cache local del admin.

### I. Sección de servicios y beneficios en el admin
Las rutas `/admin/servicios` y `/admin/beneficios` existen pero revisar si el editor está completo para items con íconos (tipo `ServiceItem` y `BenefitItem` con campo `icon`).

---

## 🟢 Falta Nice-to-Have (largo plazo)

### J. GSAP `prefers-reduced-motion`
Una vez implementadas las animaciones, deben respetar la preferencia del usuario.

### K. Analytics
No hay Google Analytics, Plausible ni ninguna herramienta de tracking. Para un sitio comercial, es esencial.

### L. Error monitoring
No hay Sentry ni Axiom. Los errores de producción son invisibles.

### M. Multi-usuario admin
Hay un solo usuario hardcodeado en env vars. Si se necesita más de un admin en el futuro, habría que implementar una tabla de usuarios.

### N. Audit log
No hay registro de qué cambió, cuándo y quién. Útil cuando hay múltiples administradores o para revertir cambios accidentales.

### O. CDN para assets
Las imágenes en `/public/contenedores/` se sirven desde el servidor Next.js. En Vercel esto está automáticamente en CDN, pero si se migra a otro hosting habría que configurar un CDN explícito (Cloudflare, CloudFront, etc.).

### P. i18n
El sitio es 100% en español. Si en el futuro hay versión en inglés, habría que migrar a `next-intl` o el sistema nativo de Next.js.

### Q. PWA / offline support
No aplica si el cliente no lo requiere, pero mencionado por completitud.

---

## Checklist de producción inmediata

```
[ ] Crear .env.example con todas las env vars requeridas
[ ] Migrar content.json a Vercel KV / Upstash Redis
[ ] Implementar timing-safe compare en login
[ ] Agregar rate limiting al login endpoint
[ ] Crear app/sitemap.ts y app/robots.ts
[ ] Agregar JSON-LD en app/layout.tsx
[ ] Agregar loading.tsx en app/(admin)/admin/
[ ] Configurar vercel.json con headers de seguridad (CSP, X-Frame-Options, etc.)
```
