/** @jest-environment node */
// Tests for /api/admin/logout route handler
import { POST } from "@/app/api/admin/logout/route";

describe("POST /api/admin/logout", () => {
  test("returns 200 with ok:true", async () => {
    const res = await POST();
    expect(res.status).toBe(200);
    const data = await res.json() as { ok: boolean };
    expect(data.ok).toBe(true);
  });

  test("clears the admin_session cookie (maxAge 0)", async () => {
    const res = await POST();
    const cookieHeader = res.headers.get("set-cookie");
    expect(cookieHeader).toBeTruthy();
    expect(cookieHeader).toContain("admin_session");
    expect(cookieHeader).toContain("Max-Age=0");
  });
});
