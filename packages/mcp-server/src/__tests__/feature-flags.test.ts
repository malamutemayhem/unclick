import { describe, it, expect } from "vitest";
import { FeatureFlags } from "../feature-flags.js";

describe("FeatureFlags", () => {
  it("returns false for undefined flag", () => {
    const ff = new FeatureFlags();
    expect(ff.isEnabled("nope")).toBe(false);
  });

  it("respects enabled/disabled", () => {
    const ff = new FeatureFlags();
    ff.define("dark_mode", { enabled: true });
    ff.define("beta", { enabled: false });
    expect(ff.isEnabled("dark_mode")).toBe(true);
    expect(ff.isEnabled("beta")).toBe(false);
  });

  it("allowlist overrides percentage", () => {
    const ff = new FeatureFlags();
    ff.define("test", { enabled: true, percentage: 0, allowlist: ["user1"] });
    expect(ff.isEnabled("test", "user1")).toBe(true);
  });

  it("percentage gates some users", () => {
    const ff = new FeatureFlags();
    ff.define("rollout", { enabled: true, percentage: 50 });
    let enabled = 0;
    for (let i = 0; i < 100; i++) {
      if (ff.isEnabled("rollout", `user-${i}`)) enabled++;
    }
    expect(enabled).toBeGreaterThan(10);
    expect(enabled).toBeLessThan(90);
  });

  it("setEnabled toggles flag", () => {
    const ff = new FeatureFlags();
    ff.define("test", { enabled: true });
    ff.setEnabled("test", false);
    expect(ff.isEnabled("test")).toBe(false);
  });

  it("listFlags returns all flags", () => {
    const ff = new FeatureFlags();
    ff.define("a", { enabled: true });
    ff.define("b", { enabled: false });
    expect(ff.listFlags()).toHaveLength(2);
  });

  it("tracks size", () => {
    const ff = new FeatureFlags();
    ff.define("a", { enabled: true });
    expect(ff.size).toBe(1);
  });
});
