import { describe, it, expect } from "vitest";
import { PRODUCT_NAMES, productName } from "./product-names";

describe("product-names", () => {
  it("resolves the Circle display label", () => {
    expect(productName("circle")).toBe("Circle");
  });

  it("keeps every label non-empty and free of internal identifier style", () => {
    for (const [key, label] of Object.entries(PRODUCT_NAMES)) {
      expect(label.trim().length, `${key} label is empty`).toBeGreaterThan(0);
      // Display labels are human words, not snake_case contract identifiers.
      expect(label, `${key} label looks like an internal identifier`).not.toMatch(/_/);
    }
  });
});
