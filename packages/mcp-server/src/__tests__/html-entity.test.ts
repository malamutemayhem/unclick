import { describe, it, expect } from "vitest";
import { HtmlEntity } from "../html-entity.js";

describe("HtmlEntity", () => {
  it("decodes named entities", () => {
    expect(HtmlEntity.decode("&amp; &lt; &gt;")).toBe("& < >");
    expect(HtmlEntity.decode("&copy; &reg;")).toBe("© ®");
  });

  it("decodes numeric entities", () => {
    expect(HtmlEntity.decode("&#65;")).toBe("A");
    expect(HtmlEntity.decode("&#x41;")).toBe("A");
  });

  it("encodes special characters", () => {
    expect(HtmlEntity.encode('<script>"hello"</script>')).toBe(
      "&lt;script&gt;&quot;hello&quot;&lt;/script&gt;",
    );
    expect(HtmlEntity.encode("a & b")).toBe("a &amp; b");
  });

  it("encodes non-ASCII characters", () => {
    const result = HtmlEntity.encodeNonAscii("Hello ©");
    expect(result).toContain("&#");
    expect(result).toContain("Hello");
  });

  it("finds named entity for character", () => {
    expect(HtmlEntity.namedEntity("&")).toBe("&amp;");
    expect(HtmlEntity.namedEntity("Z")).toBeNull();
  });

  it("creates numeric entity", () => {
    expect(HtmlEntity.numericEntity("A")).toBe("&#65;");
  });

  it("creates hex entity", () => {
    expect(HtmlEntity.hexEntity("A")).toBe("&#x41;");
  });

  it("lists all entities", () => {
    const entities = HtmlEntity.listEntities();
    expect(entities.length).toBeGreaterThan(10);
    expect(entities.find((e) => e.entity === "&amp;")).toBeDefined();
  });

  it("detects encoded text", () => {
    expect(HtmlEntity.isEncoded("Hello &amp; World")).toBe(true);
    expect(HtmlEntity.isEncoded("Hello & World")).toBe(false);
  });

  it("strips HTML tags", () => {
    expect(HtmlEntity.stripTags("<p>Hello <b>World</b></p>")).toBe("Hello World");
  });
});
