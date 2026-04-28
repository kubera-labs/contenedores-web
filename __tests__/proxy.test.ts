/** @jest-environment node */
// Tests for proxy.ts (formerly middleware.ts) — auth guard for /admin routes
import { NextRequest } from "next/server";

// Set env before importing proxy
process.env.ADMIN_SESSION_SECRET = "test-proxy-secret";

describe("proxy (auth middleware)", () => {
  let middleware: (req: NextRequest) => import("next/server").NextResponse | Response;

  beforeAll(async () => {
    const mod = await import("@/proxy");
    middleware = mod.proxy;
  });

  function makeRequest(path: string, cookie?: string) {
    const req = new NextRequest(`http://localhost${path}`, {
      headers: cookie ? { cookie: `admin_session=${cookie}` } : {},
    });
    return req;
  }

  test("redirects unauthenticated user from /admin to /admin-login", async () => {
    const req = makeRequest("/admin");
    const res = await middleware(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin-login");
  });

  test("redirects unauthenticated user from /admin/hero to /admin-login", async () => {
    const req = makeRequest("/admin/hero");
    const res = await middleware(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin-login");
  });

  test("allows authenticated user to access /admin", async () => {
    const req = makeRequest("/admin", "test-proxy-secret");
    const res = await middleware(req);
    // next() has no redirect — status should NOT be 307
    expect(res.status).not.toBe(307);
  });

  test("redirects authenticated user away from /admin-login to /admin", async () => {
    const req = makeRequest("/admin-login", "test-proxy-secret");
    const res = await middleware(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin");
  });

  test("allows unauthenticated user to access /admin-login", async () => {
    const req = makeRequest("/admin-login");
    const res = await middleware(req);
    expect(res.status).not.toBe(307);
  });

  test("rejects user with wrong session cookie", async () => {
    const req = makeRequest("/admin", "wrong-secret");
    const res = await middleware(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin-login");
  });
});
