// Tests for lib/db — mock the file system

jest.mock("node:fs/promises", () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));

import { readFile, writeFile } from "node:fs/promises";
import { getContent, getSection, setSection, updateSection } from "@/lib/db";
import type { SiteContent } from "@/types/content";

const mockContent: SiteContent = {
  hero: {
    eyebrow: "Eyebrow",
    title: "Title",
    titleAccent: "Accent",
    subtitle: "Subtitle",
    subtitleStrong: "Strong",
    ctaPrimary: "CTA 1",
    ctaSecondary: "CTA 2",
    microtrust: "Trust",
    image: "/img.jpg",
  },
  about: {
    eyebrow: "About",
    title: "About us",
    titleAccent: "us",
    subtitle: "Subtitle",
    closing: "Close",
    closingStrong: "Strong",
    ctaLabel: "CTA",
    pillars: [],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Gallery title",
    titleAccent: "title",
    subtitle: "sub",
    items: [],
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Solutions title",
    subtitle: "sub",
    steps: [],
  },
  socialProof: { stats: [] },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    subtitle: "sub",
    items: [],
  },
  faq: { eyebrow: "FAQ", title: "FAQ", subtitle: "sub", items: [] },
  cta: {
    badge: "Badge",
    title: "CTA",
    subtitle: "sub",
    ctaWhatsapp: "wa",
    ctaEmail: "email",
  },
  services: { eyebrow: "Services", title: "Services", subtitle: "sub", items: [] },
  benefits: { eyebrow: "Benefits", title: "Benefits", subtitle: "sub", items: [] },
};

const mockReadFile = readFile as jest.Mock;
const mockWriteFile = writeFile as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockReadFile.mockResolvedValue(JSON.stringify(mockContent));
  mockWriteFile.mockResolvedValue(undefined);
});

describe("getContent", () => {
  test("reads and parses content.json", async () => {
    const result = await getContent();
    expect(result).toEqual(mockContent);
    expect(mockReadFile).toHaveBeenCalledTimes(1);
  });
});

describe("getSection", () => {
  test("returns the hero section", async () => {
    const hero = await getSection("hero");
    expect(hero.title).toBe("Title");
    expect(hero.eyebrow).toBe("Eyebrow");
  });

  test("returns the gallery section", async () => {
    const gallery = await getSection("gallery");
    expect(gallery.items).toEqual([]);
  });

  test("returns the faq section", async () => {
    const faq = await getSection("faq");
    expect(faq.eyebrow).toBe("FAQ");
  });
});

describe("setSection", () => {
  test("writes updated section to file", async () => {
    const updatedHero = { ...mockContent.hero, title: "New Title" };
    await setSection("hero", updatedHero);

    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    const written = JSON.parse(mockWriteFile.mock.calls[0][1] as string) as SiteContent;
    expect(written.hero.title).toBe("New Title");
  });

  test("preserves other sections when updating one", async () => {
    const updatedHero = { ...mockContent.hero, title: "Changed" };
    await setSection("hero", updatedHero);

    const written = JSON.parse(mockWriteFile.mock.calls[0][1] as string) as SiteContent;
    expect(written.faq.eyebrow).toBe("FAQ");
    expect(written.gallery.eyebrow).toBe("Gallery");
  });
});

describe("updateSection", () => {
  test("shallow merges an object section", async () => {
    await updateSection("hero", { title: "Merged Title" });

    const written = JSON.parse(mockWriteFile.mock.calls[0][1] as string) as SiteContent;
    expect(written.hero.title).toBe("Merged Title");
    expect(written.hero.eyebrow).toBe("Eyebrow"); // preserved
  });
});
