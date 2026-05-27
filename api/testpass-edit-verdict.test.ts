import { describe, expect, it } from "vitest";
import { normalizeTestPassEditVerdict, selectTestPassPackYaml } from "./testpass";

describe("TestPass API helpers", () => {
  it("normalizes manual edit verdicts including Other", () => {
    expect(normalizeTestPassEditVerdict("pass")).toBe("check");
    expect(normalizeTestPassEditVerdict("check")).toBe("check");
    expect(normalizeTestPassEditVerdict("fail")).toBe("fail");
    expect(normalizeTestPassEditVerdict("na")).toBe("na");
    expect(normalizeTestPassEditVerdict("other")).toBe("other");
    expect(normalizeTestPassEditVerdict("unknown")).toBeNull();
  });

  it("accepts canonical and legacy save_pack YAML body keys", () => {
    expect(selectTestPassPackYaml({ pack_yaml: "id: p" })).toBe("id: p");
    expect(selectTestPassPackYaml({ yaml: "id: p" })).toBe("id: p");
    expect(selectTestPassPackYaml({ pack_yaml: "" })).toBeNull();
  });
});
