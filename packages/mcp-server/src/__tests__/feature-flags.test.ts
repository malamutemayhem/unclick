import { describe, it, expect } from "vitest";
import { FeatureFlagManager } from "../feature-flags.js";

describe("FeatureFlagManager", () => {
  it("checks enabled flag", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "dark-mode", enabled: true });
    expect(fm.isEnabled("dark-mode")).toBe(true);
  });

  it("checks disabled flag", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "beta", enabled: false });
    expect(fm.isEnabled("beta")).toBe(false);
  });

  it("returns false for undefined flag", () => {
    const fm = new FeatureFlagManager();
    expect(fm.isEnabled("nope")).toBe(false);
  });

  it("targets specific users", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "vip", enabled: true, targetUsers: ["user1"] });
    expect(fm.isEnabled("vip", "user1")).toBe(true);
    expect(fm.isEnabled("vip", "user2")).toBe(false);
  });

  it("toggle flips state", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "x", enabled: true });
    fm.toggle("x");
    expect(fm.isEnabled("x")).toBe(false);
    fm.toggle("x");
    expect(fm.isEnabled("x")).toBe(true);
  });

  it("enable and disable", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "x", enabled: false });
    fm.enable("x");
    expect(fm.isEnabled("x")).toBe(true);
    fm.disable("x");
    expect(fm.isEnabled("x")).toBe(false);
  });

  it("list returns all flags", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "a", enabled: true });
    fm.define({ name: "b", enabled: false });
    expect(fm.list().length).toBe(2);
  });

  it("remove deletes flag", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "x", enabled: true });
    fm.remove("x");
    expect(fm.get("x")).toBeUndefined();
  });

  it("enabledFlags lists only enabled", () => {
    const fm = new FeatureFlagManager();
    fm.define({ name: "a", enabled: true });
    fm.define({ name: "b", enabled: false });
    fm.define({ name: "c", enabled: true });
    expect(fm.enabledFlags().sort()).toEqual(["a", "c"]);
  });
});
