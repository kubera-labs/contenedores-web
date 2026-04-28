import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  test("has a site name", () => {
    expect(typeof siteConfig.name).toBe("string");
    expect(siteConfig.name.length).toBeGreaterThan(0);
  });

  test("url is a valid https URL", () => {
    expect(siteConfig.url).toMatch(/^https:\/\//);
  });

  test("email contains @", () => {
    expect(siteConfig.email).toContain("@");
  });

  test("whatsapp is a wa.me URL", () => {
    expect(siteConfig.whatsapp).toContain("wa.me");
  });

  test("navLinks is a non-empty array with href and label", () => {
    expect(Array.isArray(siteConfig.navLinks)).toBe(true);
    expect(siteConfig.navLinks.length).toBeGreaterThan(0);
    siteConfig.navLinks.forEach((link) => {
      expect(typeof link.label).toBe("string");
      expect(link.href).toMatch(/^\//);
    });
  });

  test("legalLinks have valid hrefs", () => {
    expect(Array.isArray(siteConfig.legalLinks)).toBe(true);
    siteConfig.legalLinks.forEach((link) => {
      expect(typeof link.label).toBe("string");
      expect(link.href).toMatch(/^\//);
    });
  });

  test("social links are https URLs", () => {
    expect(siteConfig.social.instagram).toMatch(/^https:\/\//);
    expect(siteConfig.social.facebook).toMatch(/^https:\/\//);
    expect(siteConfig.social.linkedin).toMatch(/^https:\/\//);
  });
});
