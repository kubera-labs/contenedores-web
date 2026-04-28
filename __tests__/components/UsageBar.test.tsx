// Component tests for UsageBar
import React from "react";
import { render, screen } from "@testing-library/react";
import { UsageBar } from "@/components/features/admin/media-library";

describe("UsageBar", () => {
  const MAX = 500 * 1024 * 1024; // 500 MB

  test("renders without crashing", () => {
    render(<UsageBar used={0} max={MAX} />);
    expect(screen.getByText(/Almacenamiento/i)).toBeInTheDocument();
  });

  test("shows used and max values", () => {
    const used = 100 * 1024 * 1024; // 100 MB
    render(<UsageBar used={used} max={MAX} />);
    expect(screen.getByText(/100\.0 MB/)).toBeInTheDocument();
    expect(screen.getByText(/500\.0 MB/)).toBeInTheDocument();
  });

  test("renders progress bar element", () => {
    const { container } = render(<UsageBar used={0} max={MAX} />);
    // The progress bar is a div with inline width style
    const bars = container.querySelectorAll("div[style*='width']");
    expect(bars.length).toBeGreaterThan(0);
  });

  test("does not exceed 100% width when used > max", () => {
    const { container } = render(<UsageBar used={MAX * 2} max={MAX} />);
    const bars = container.querySelectorAll("div");
    const widthBar = Array.from(bars).find(
      (el) => el.style.width === "100%",
    );
    expect(widthBar).toBeTruthy();
  });

  test("shows correct percentage width for 50% usage", () => {
    const { container } = render(<UsageBar used={MAX * 0.5} max={MAX} />);
    const bars = container.querySelectorAll("div");
    const bar50 = Array.from(bars).find((el) => el.style.width === "50%");
    expect(bar50).toBeTruthy();
  });

  test("shows correct percentage width for 80% usage", () => {
    const { container } = render(<UsageBar used={MAX * 0.8} max={MAX} />);
    const bars = container.querySelectorAll("div");
    const bar80 = Array.from(bars).find((el) => el.style.width === "80%");
    expect(bar80).toBeTruthy();
  });

  test("shows correct percentage width for 95% usage", () => {
    const { container } = render(<UsageBar used={MAX * 0.95} max={MAX} />);
    const bars = container.querySelectorAll("div");
    const bar95 = Array.from(bars).find((el) => el.style.width === "95%");
    expect(bar95).toBeTruthy();
  });
});
