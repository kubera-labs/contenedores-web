/** @jest-environment node */
// Tests for /api/content/[section] route handler

jest.mock("@/lib/db", () => ({
  getSection: jest.fn(),
  setSection: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

import { getSection, setSection } from "@/lib/db";
import { NextRequest } from "next/server";
import { GET, PATCH } from "@/app/api/content/[section]/route";

const mockGetSection = getSection as jest.Mock;
const mockSetSection = setSection as jest.Mock;

const fakeHero = {
  eyebrow: "Hero",
  title: "Title",
  titleAccent: "Accent",
  subtitle: "Sub",
  subtitleStrong: "Strong",
  ctaPrimary: "CTA1",
  ctaSecondary: "CTA2",
  microtrust: "Trust",
  image: "/img.jpg",
};

const makeCtx = (section: string) => ({
  params: Promise.resolve({ section }),
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetSection.mockResolvedValue(fakeHero as never);
  mockSetSection.mockResolvedValue(undefined as never);
});

describe("GET /api/content/[section]", () => {
  test("returns section data for valid section", async () => {
    const req = new NextRequest("http://localhost/api/content/hero");
    const res = await GET(req, makeCtx("hero"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(fakeHero);
    expect(mockGetSection).toHaveBeenCalledWith("hero");
  });

  test("returns 400 for invalid section", async () => {
    const req = new NextRequest("http://localhost/api/content/invalid");
    const res = await GET(req, makeCtx("invalid"));
    expect(res.status).toBe(400);
    const data = await res.json() as { error: string };
    expect(data.error).toBeTruthy();
  });

  test("returns 500 when db throws", async () => {
    mockGetSection.mockRejectedValue(new Error("DB error") as never);
    const req = new NextRequest("http://localhost/api/content/hero");
    const res = await GET(req, makeCtx("hero"));
    expect(res.status).toBe(500);
  });

  test("returns valid data for image strip section", async () => {
    const req = new NextRequest("http://localhost/api/content/imageStrip");
    await GET(req, makeCtx("imageStrip"));
    expect(mockGetSection).toHaveBeenCalledWith("imageStrip");
  });

  test("returns valid data for faq section", async () => {
    const req = new NextRequest("http://localhost/api/content/faq");
    await GET(req, makeCtx("faq"));
    expect(mockGetSection).toHaveBeenCalledWith("faq");
  });
});

describe("PATCH /api/content/[section]", () => {
  test("saves valid section update", async () => {
    const req = new NextRequest("http://localhost/api/content/hero", {
      method: "PATCH",
      body: JSON.stringify({ ...fakeHero, title: "Updated" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PATCH(req, makeCtx("hero"));
    expect(res.status).toBe(200);
    const data = await res.json() as { ok: boolean };
    expect(data.ok).toBe(true);
    expect(mockSetSection).toHaveBeenCalledWith("hero", expect.objectContaining({ title: "Updated" }));
  });

  test("returns 400 for invalid section", async () => {
    const req = new NextRequest("http://localhost/api/content/hacked", {
      method: "PATCH",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PATCH(req, makeCtx("hacked"));
    expect(res.status).toBe(400);
  });

  test("returns 500 when setSection throws", async () => {
    mockSetSection.mockRejectedValue(new Error("Write error") as never);
    const req = new NextRequest("http://localhost/api/content/hero", {
      method: "PATCH",
      body: JSON.stringify(fakeHero),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PATCH(req, makeCtx("hero"));
    expect(res.status).toBe(500);
  });
});
