import { describe, expect, it } from "vitest";
import { renderDisclaimer, SLOPPASS_DISCLAIMER } from "../disclaimer.js";

describe("SlopPass disclaimer", () => {
  it("matches the locked scope banner", () => {
    expect(SLOPPASS_DISCLAIMER.headline).toBe(
      "SlopPass is a scoped quality review, not a guarantee that the code is good."
    );
    expect(SLOPPASS_DISCLAIMER.body).toContain("It does not certify correctness");
    expect(SLOPPASS_DISCLAIMER.compact).toContain("Scoped review only");
  });

  it("renders each variant", () => {
    expect(renderDisclaimer("headline")).toBe(SLOPPASS_DISCLAIMER.headline);
    expect(renderDisclaimer("body")).toBe(SLOPPASS_DISCLAIMER.body);
    expect(renderDisclaimer("compact")).toBe(SLOPPASS_DISCLAIMER.compact);
  });
});
