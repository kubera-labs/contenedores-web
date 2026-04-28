// Unit tests for fmtBytes and UsageBar from media-library
// next/jest auto-transforms "use client" and mocks next/image

import { fmtBytes } from "@/components/features/admin/media-library";

describe("fmtBytes", () => {
  test("formats bytes under 1 KB", () => {
    expect(fmtBytes(0)).toBe("0 B");
    expect(fmtBytes(512)).toBe("512 B");
    expect(fmtBytes(1023)).toBe("1023 B");
  });

  test("formats bytes in KB range", () => {
    expect(fmtBytes(1024)).toBe("1 KB");
    expect(fmtBytes(2048)).toBe("2 KB");
    expect(fmtBytes(1024 * 999)).toBe("999 KB");
  });

  test("formats bytes in MB range", () => {
    expect(fmtBytes(1024 * 1024)).toBe("1.0 MB");
    expect(fmtBytes(1024 * 1024 * 25)).toBe("25.0 MB");
    expect(fmtBytes(1024 * 1024 * 500)).toBe("500.0 MB");
  });

  test("rounds MB to one decimal place", () => {
    // 1.5 MB
    const result = fmtBytes(Math.round(1024 * 1024 * 1.5));
    expect(result).toBe("1.5 MB");
  });
});
