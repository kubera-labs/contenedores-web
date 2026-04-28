/** @jest-environment node */
// Tests for /api/media route handler (GET, POST, DELETE)

// Mock fs/promises before any imports that use it
jest.mock("node:fs/promises", () => ({
  readdir: jest.fn(),
  stat: jest.fn(),
  writeFile: jest.fn(),
  unlink: jest.fn(),
}));

import { readdir, stat, writeFile, unlink } from "node:fs/promises";
import { NextRequest } from "next/server";
import { GET, DELETE } from "@/app/api/media/route";

const mockReaddir = readdir as jest.Mock;
const mockStat = stat as jest.Mock;
const mockUnlink = unlink as jest.Mock;

const fakeStats = { size: 1024 * 1024 };

beforeEach(() => {
  jest.clearAllMocks();
  mockReaddir.mockResolvedValue(["c1.jpeg", "c2.jpeg"] as never);
  mockStat.mockResolvedValue(fakeStats as never);
  (writeFile as jest.Mock).mockResolvedValue(undefined);
  mockUnlink.mockResolvedValue(undefined as never);
});

describe("GET /api/media", () => {
  test("returns file list with totalBytes and maxBytes", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json() as { files: Array<{ name: string; src: string; size: number }>; totalBytes: number; maxBytes: number };
    expect(data.files).toHaveLength(2);
    expect(data.files[0]).toMatchObject({ name: "c1.jpeg", src: "/contenedores/c1.jpeg" });
    expect(data.totalBytes).toBe(2 * 1024 * 1024);
    expect(data.maxBytes).toBe(500 * 1024 * 1024);
  });

  test("returns empty list when directory read fails", async () => {
    mockReaddir.mockRejectedValue(new Error("ENOENT") as never);
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json() as { files: unknown[] };
    expect(data.files).toHaveLength(0);
  });

  test("filters out non-image files", async () => {
    mockReaddir.mockResolvedValue(["c1.jpeg", "readme.txt", "c2.png"] as never);
    const res = await GET();
    const data = await res.json() as { files: Array<{ name: string }> };
    const names = data.files.map((f) => f.name);
    expect(names).toContain("c1.jpeg");
    expect(names).toContain("c2.png");
    expect(names).not.toContain("readme.txt");
  });
});

describe("DELETE /api/media", () => {
  test("returns 400 when file param is missing", async () => {
    const req = new NextRequest("http://localhost/api/media", { method: "DELETE" });
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for path traversal attempt", async () => {
    const req = new NextRequest("http://localhost/api/media?file=../secret.txt", {
      method: "DELETE",
    });
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for invalid extension", async () => {
    const req = new NextRequest("http://localhost/api/media?file=malware.exe", {
      method: "DELETE",
    });
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  test("returns 200 for valid file deletion", async () => {
    const req = new NextRequest("http://localhost/api/media?file=c1.jpeg", {
      method: "DELETE",
    });
    const res = await DELETE(req);
    expect(res.status).toBe(200);
    const data = await res.json() as { success: boolean };
    expect(data.success).toBe(true);
    expect(mockUnlink).toHaveBeenCalledTimes(1);
  });

  test("returns 404 when file does not exist", async () => {
    mockUnlink.mockRejectedValue(Object.assign(new Error("ENOENT"), { code: "ENOENT" }) as never);
    const req = new NextRequest("http://localhost/api/media?file=ghost.jpeg", {
      method: "DELETE",
    });
    const res = await DELETE(req);
    expect(res.status).toBe(404);
  });
});
