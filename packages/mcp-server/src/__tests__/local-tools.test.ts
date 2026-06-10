import { describe, expect, it } from "vitest";

import {
  countText,
  generateSlug,
  generateLorem,
  decodeJwt,
  lookupHttpStatus,
  searchEmoji,
  parseUserAgent,
  generateReadme,
  generateChangelog,
  getFaviconUrls,
} from "../local-tools.js";

describe("countText", () => {
  it("counts words, chars, and sentences", () => {
    const r = countText("Hello world. How are you?");
    expect(r.words).toBe(5);
    expect(r.chars).toBe(25);
    expect(r.sentences).toBe(2);
  });

  it("counts characters without spaces", () => {
    const r = countText("a b c");
    expect(r.chars).toBe(5);
    expect(r.chars_no_spaces).toBe(3);
  });

  it("counts lines", () => {
    const r = countText("line1\nline2\nline3");
    expect(r.lines).toBe(3);
  });

  it("counts paragraphs separated by blank lines", () => {
    const r = countText("Para one.\n\nPara two.\n\nPara three.");
    expect(r.paragraphs).toBe(3);
  });

  it("returns zeros for empty string", () => {
    const r = countText("");
    expect(r.words).toBe(0);
    expect(r.sentences).toBe(0);
    expect(r.paragraphs).toBe(0);
  });

  it("treats single text block as one paragraph", () => {
    const r = countText("Just one paragraph here.");
    expect(r.paragraphs).toBe(1);
  });
});

describe("generateSlug", () => {
  it("converts text to lowercase slug", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });

  it("strips diacritics", () => {
    expect(generateSlug("Cafe Resume")).toBe("cafe-resume");
  });

  it("strips non-alphanumeric characters", () => {
    expect(generateSlug("Hello! World?")).toBe("hello-world");
  });

  it("collapses multiple spaces", () => {
    expect(generateSlug("too   many   spaces")).toBe("too-many-spaces");
  });

  it("supports custom separator", () => {
    expect(generateSlug("Hello World", "_")).toBe("hello_world");
  });

  it("handles empty string", () => {
    expect(generateSlug("")).toBe("");
  });
});

describe("generateLorem", () => {
  it("generates requested number of words", () => {
    const text = generateLorem(10, "words", false);
    expect(text.split(/\s+/).length).toBe(10);
  });

  it("starts with Lorem ipsum when requested", () => {
    const text = generateLorem(5, "words", true);
    expect(text).toMatch(/^Lorem ipsum/);
  });

  it("generates sentences", () => {
    const text = generateLorem(3, "sentences", false);
    const sentences = text.match(/\./g) ?? [];
    expect(sentences.length).toBe(3);
  });

  it("generates paragraphs separated by double newlines", () => {
    const text = generateLorem(3, "paragraphs", false);
    const paras = text.split("\n\n");
    expect(paras.length).toBe(3);
  });
});

describe("decodeJwt", () => {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ sub: "1234", name: "Test", iat: 1700000000 })).toString("base64url");
  const token = `${header}.${payload}.fakesig`;

  it("decodes header and payload", () => {
    const r = decodeJwt(token) as any;
    expect(r.header.alg).toBe("HS256");
    expect(r.payload.sub).toBe("1234");
    expect(r.payload.name).toBe("Test");
  });

  it("includes signature and warning", () => {
    const r = decodeJwt(token) as any;
    expect(r.signature).toBe("fakesig");
    expect(r.warning).toContain("NOT verified");
  });

  it("parses iat as issued_at ISO string", () => {
    const r = decodeJwt(token) as any;
    expect(r.issued_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("throws for invalid JWT format", () => {
    expect(() => decodeJwt("not.a.jwt.at.all")).toThrow();
    expect(() => decodeJwt("onlytwoparts.here")).toThrow();
  });

  it("handles exp claim", () => {
    const futurePayload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64url");
    const futureToken = `${header}.${futurePayload}.sig`;
    const r = decodeJwt(futureToken) as any;
    expect(r.expired).toBe(false);
    expect(r.expires_in_seconds).toBeGreaterThan(0);
  });
});

describe("lookupHttpStatus", () => {
  it("returns known status for 200", () => {
    const r = lookupHttpStatus(200);
    expect(r.known).toBe(true);
    expect(r.phrase).toBe("OK");
    expect(r.category).toBe("Success");
  });

  it("returns known status for 404", () => {
    const r = lookupHttpStatus(404);
    expect(r.known).toBe(true);
    expect(r.phrase).toBe("Not Found");
  });

  it("returns the teapot", () => {
    const r = lookupHttpStatus(418);
    expect(r.known).toBe(true);
    expect(r.phrase).toContain("Teapot");
  });

  it("returns unknown with category hint for 599", () => {
    const r = lookupHttpStatus(599) as any;
    expect(r.known).toBe(false);
    expect(r.category).toContain("Server Error");
  });

  it("returns unknown for totally invalid code", () => {
    const r = lookupHttpStatus(999) as any;
    expect(r.known).toBe(false);
  });
});

describe("searchEmoji", () => {
  it("finds rocket by keyword", () => {
    const results = searchEmoji("rocket");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].emoji).toBe("🚀");
  });

  it("finds fire emoji", () => {
    const results = searchEmoji("fire");
    expect(results.some((e) => e.emoji === "🔥")).toBe(true);
  });

  it("returns default results for empty query", () => {
    const results = searchEmoji("");
    expect(results.length).toBeGreaterThan(0);
  });

  it("respects limit parameter", () => {
    const results = searchEmoji("", 3);
    expect(results.length).toBe(3);
  });

  it("returns empty for nonsense keyword", () => {
    const results = searchEmoji("xyzzyplugh");
    expect(results.length).toBe(0);
  });

  it("ranks exact keyword matches higher", () => {
    const results = searchEmoji("bug");
    expect(results[0].emoji).toBe("🐛");
  });
});

describe("parseUserAgent", () => {
  it("detects Chrome on Windows", () => {
    const r = parseUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    expect(r.browser).toBe("Chrome");
    expect(r.os).toBe("Windows 10/11");
    expect(r.device_type).toBe("desktop");
    expect(r.is_mobile).toBe(false);
  });

  it("detects Safari on iPhone", () => {
    const r = parseUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1");
    expect(r.browser).toBe("Safari");
    expect(r.os).toContain("iOS");
    expect(r.device_type).toBe("mobile");
    expect(r.is_mobile).toBe(true);
  });

  it("detects Googlebot as bot", () => {
    const r = parseUserAgent("Googlebot/2.1 (+http://www.google.com/bot.html)");
    expect(r.is_bot).toBe(true);
    expect(r.device_type).toBe("bot");
  });

  it("detects Firefox on Linux", () => {
    const r = parseUserAgent("Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/120.0");
    expect(r.browser).toBe("Firefox");
    expect(r.os).toBe("Linux");
    expect(r.engine).toBe("Gecko");
  });

  it("detects Edge browser", () => {
    const r = parseUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0");
    expect(r.browser).toBe("Edge");
  });
});

describe("generateReadme", () => {
  it("generates a README with title and description", () => {
    const r = generateReadme({ name: "MyProject", description: "A cool project" });
    expect(r).toContain("# MyProject");
    expect(r).toContain("> A cool project");
  });

  it("includes installation section", () => {
    const r = generateReadme({ name: "mylib", description: "test" });
    expect(r).toContain("## Installation");
    expect(r).toContain("npm install mylib");
  });

  it("uses custom install command", () => {
    const r = generateReadme({ name: "mylib", description: "test", install: "yarn add mylib" });
    expect(r).toContain("yarn add mylib");
  });

  it("uses python install when language is python", () => {
    const r = generateReadme({ name: "mylib", description: "test", language: "python" });
    expect(r).toContain("pip install mylib");
  });

  it("includes badges when repo is provided", () => {
    const r = generateReadme({ name: "mylib", description: "test", repo: "https://github.com/owner/repo", badges: true });
    expect(r).toContain("img.shields.io");
  });

  it("omits badges when badges is false", () => {
    const r = generateReadme({ name: "mylib", description: "test", repo: "https://github.com/owner/repo", badges: false });
    expect(r).not.toContain("img.shields.io");
  });

  it("includes license section", () => {
    const r = generateReadme({ name: "mylib", description: "test", license: "Apache-2.0" });
    expect(r).toContain("Apache-2.0");
  });
});

describe("generateChangelog", () => {
  it("generates a changelog header with version and date", () => {
    const r = generateChangelog({ version: "1.0.0", date: "2024-06-15" });
    expect(r).toContain("## [1.0.0] - 2024-06-15");
  });

  it("includes Added section", () => {
    const r = generateChangelog({ version: "1.0.0", date: "2024-01-01", added: ["New feature A", "New feature B"] });
    expect(r).toContain("### Added");
    expect(r).toContain("- New feature A");
    expect(r).toContain("- New feature B");
  });

  it("includes Fixed section", () => {
    const r = generateChangelog({ version: "1.0.1", date: "2024-01-02", fixed: ["Bug fix X"] });
    expect(r).toContain("### Fixed");
    expect(r).toContain("- Bug fix X");
  });

  it("strips leading dash from items", () => {
    const r = generateChangelog({ version: "1.0.0", date: "2024-01-01", added: ["- Already dashed"] });
    expect(r).toContain("- Already dashed");
    expect(r).not.toContain("- - Already dashed");
  });

  it("omits empty sections", () => {
    const r = generateChangelog({ version: "1.0.0", date: "2024-01-01", added: ["Something"] });
    expect(r).not.toContain("### Changed");
    expect(r).not.toContain("### Removed");
  });

  it("supports all six section types", () => {
    const r = generateChangelog({
      version: "2.0.0",
      date: "2024-06-01",
      added: ["A"],
      changed: ["B"],
      deprecated: ["C"],
      removed: ["D"],
      fixed: ["E"],
      security: ["F"],
    });
    expect(r).toContain("### Added");
    expect(r).toContain("### Changed");
    expect(r).toContain("### Deprecated");
    expect(r).toContain("### Removed");
    expect(r).toContain("### Fixed");
    expect(r).toContain("### Security");
  });
});

describe("getFaviconUrls", () => {
  it("returns favicon URLs for a domain", () => {
    const r = getFaviconUrls("example.com");
    expect(r.domain).toBe("example.com");
    expect(r.favicon_ico).toBe("https://example.com/favicon.ico");
    expect(r.google_favicon_api).toContain("google.com");
    expect(r.duckduckgo_favicon_api).toContain("duckduckgo.com");
  });

  it("strips protocol from URL", () => {
    const r = getFaviconUrls("https://example.com/some/path");
    expect(r.domain).toBe("example.com");
  });

  it("strips query params", () => {
    const r = getFaviconUrls("example.com?foo=bar");
    expect(r.domain).toBe("example.com");
  });

  it("throws for empty input", () => {
    expect(() => getFaviconUrls("")).toThrow();
  });
});
