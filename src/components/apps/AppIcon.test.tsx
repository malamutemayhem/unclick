import { describe, expect, it } from "vitest";
import { glyphFor } from "./appIconGlyphs";
import { APP_CATALOG } from "@/lib/appCatalog";

// Compare by displayName: vitest can load lucide-react's ESM and CJS builds as
// separate instances, so identity comparison on the icon components is flaky.
function glyphName(name: string, category: string, slug?: string): string | null {
  const icon = glyphFor(name, category, slug) as { displayName?: string } | null;
  return icon?.displayName ?? null;
}

describe("AppIcon glyph resolution", () => {
  it("picks family glyphs by keyword for built-in tool families", () => {
    expect(glyphName("2-SAT Solver", "Utilities", "twosat")).toBe("Network");
    expect(glyphName("Ackermann Function", "Utilities", "ackermann")).toBe("Calculator");
    expect(glyphName("Epoch Converter", "Utilities", "epoch")).toBe("Clock");
    expect(glyphName("Color Blender", "Utilities", "colorblend")).toBe("Palette");
    expect(glyphName("Vigenere Cipher", "Utilities", "vigenere")).toBe("Lock");
  });

  it("uses stable local glyphs for Vercel and Supabase instead of remote favicons", () => {
    expect(glyphName("Vercel", "Developer & infra", "vercel")).toBe("Cloud");
    expect(glyphName("Supabase", "Developer & infra", "supabase")).toBe("Database");
  });

  it("falls back to the category glyph when no keyword matches", () => {
    expect(glyphName("Taco Fancy", "Utilities", "tacofancy")).toBe("Wrench");
  });

  it("resolves a glyph for every app in the catalog (no letter chips left)", () => {
    const lettered = APP_CATALOG.filter((a) => glyphFor(a.name, a.category, a.slug) === null);
    expect(lettered.map((a) => a.slug)).toEqual([]);
  });
});
