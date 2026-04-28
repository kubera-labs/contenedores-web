/** @jest-environment node */
// Tests for /api/admin/login route handler
import { NextRequest } from "next/server";

// Mock env vars before importing the route
process.env.ADMIN_USERNAME = "testuser";
process.env.ADMIN_PASSWORD = "testpass";
process.env.ADMIN_SESSION_SECRET = "test-secret-abc";

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("returns 400 for malformed JSON", async () => {
    const { POST } = await import("@/app/api/admin/login/route");
    const req = new NextRequest("http://localhost/api/admin/login", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 401 for wrong credentials", async () => {
    const { POST } = await import("@/app/api/admin/login/route");
    const req = new NextRequest("http://localhost/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username: "wrong", password: "wrong" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
    const data = await res.json() as { error: string };
    expect(data.error).toBeTruthy();
  });

  test("returns 401 when username is correct but password is wrong", async () => {
    const { POST } = await import("@/app/api/admin/login/route");
    const req = new NextRequest("http://localhost/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password: "wrongpass" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  test("returns 200 and sets cookie for correct credentials", async () => {
    const { POST } = await import("@/app/api/admin/login/route");
    const req = new NextRequest("http://localhost/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password: "testpass" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json() as { ok: boolean };
    expect(data.ok).toBe(true);
    // Cookie should be set
    const cookieHeader = res.headers.get("set-cookie");
    expect(cookieHeader).toBeTruthy();
    expect(cookieHeader).toContain("admin_session");
  });
});
