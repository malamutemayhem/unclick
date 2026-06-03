import { describe, expect, it } from "vitest";
import {
  applyMasterXGateMode,
  defaultXGateModes,
  resolveMasterXGateMode,
  setIndividualXGateMode,
  XGATE_PRODUCT_CONFIGS,
} from "./xgateModeModel";

describe("XGate mode model", () => {
  it("keeps TrendSlopGate in the product catalog", () => {
    const trendSlopGate = XGATE_PRODUCT_CONFIGS.find((gate) => gate.id === "TrendSlopGate");

    expect(trendSlopGate?.defaultMode).toBe("block");
    expect(trendSlopGate?.summary).toMatch(/over-agreeable/i);
  });

  it("resolves a custom master mode when individual gates diverge", () => {
    const modes = setIndividualXGateMode(defaultXGateModes(), "SpendGate", "off");

    expect(resolveMasterXGateMode(modes)).toBe("custom");
  });

  it("lets a master click override all individual gates", () => {
    const allWatch = applyMasterXGateMode("watch");

    expect(resolveMasterXGateMode(allWatch)).toBe("watch");
    expect(new Set(Object.values(allWatch))).toEqual(new Set(["watch"]));
  });

  it("returns block when all individual gates are block", () => {
    expect(resolveMasterXGateMode(applyMasterXGateMode("block"))).toBe("block");
  });
});
