import { describe, it, expect } from "vitest";
import { FeatureFlagManager } from "../feature-flags.js";

describe("FeatureFlagManager", () => {
  it("returns false for unknown flag", () => {
    const fm = new FeatureFlagManager();
    expect(fm.isEnabled("nope")).toBe(false);
  });

  it("checks enabled state", () => {
    const fm = new FeatureFlagManager();
    fm.register({ name: "dark-mode", enabled: true });
    expect(fm.isEnabled("dark-mode")).toBe(true);
    fm.register({ name: "beta", enabled: false });
    expect(fm.isEnabled("beta")).toBe(false);
  });

  it("respects allow list", () => {
    const fm = new FeatureFlagManager();
    fm.register({ name: "vip", enabled: true, percentage: 0, allowList: ["alice"] });
    expect(fm.isEnabled("vip", "alice")).toBe(true);
    expect(fm.isEnabled("vip", "bob")).toBe(false);
  });

  it("respects deny list", () => {
    const fm = new FeatureFlagManager();
    fm.register({ name: "feature", enabled: true, denyList: ["banned"] });
    expect(fm.isEnabled("feature", "banned")).toBe(false);
  });

  it("toggles flag", () => {
    const fm = new FeatureFlagManager();
    fm.register({ name: "f", enabled: true });
    fm.toggle("f");
    expect(fm.isEnabled("f")).toBe(false);
  });

  it("lists enabled flags", () => {
    const fm = new FeatureFlagManager();
    fm.register({ name: "a", enabled: true });
    fm.register({ name: "b", enabled: false });
    expect(fm.enabledFlags()).toEqual(["a"]);
  });

  it("removes flag", () => {
    const fm = new FeatureFlagManager();
    fm.register({ name: "x", enabled: true });
    fm.remove("x");
    expect(fm.isEnabled("x")).toBe(false);
  });
});
