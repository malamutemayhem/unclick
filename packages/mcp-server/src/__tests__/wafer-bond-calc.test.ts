import { describe, it, expect } from "vitest";
import {
  bondStrength, alignment, thermal, hermeticity,
  bondCost, roomTemp, for3d, interface_,
  bestUse, waferBonds,
} from "../wafer-bond-calc.js";

describe("bondStrength", () => {
  it("hybrid cu oxide highest bond strength", () => {
    expect(bondStrength("hybrid_cu_oxide")).toBeGreaterThan(bondStrength("adhesive_bcb"));
  });
});

describe("alignment", () => {
  it("hybrid cu oxide best alignment", () => {
    expect(alignment("hybrid_cu_oxide")).toBeGreaterThan(alignment("anodic_glass_si"));
  });
});

describe("thermal", () => {
  it("fusion direct best thermal", () => {
    expect(thermal("fusion_direct")).toBeGreaterThan(thermal("adhesive_bcb"));
  });
});

describe("hermeticity", () => {
  it("fusion direct best hermeticity", () => {
    expect(hermeticity("fusion_direct")).toBeGreaterThan(hermeticity("adhesive_bcb"));
  });
});

describe("bondCost", () => {
  it("hybrid cu oxide most expensive", () => {
    expect(bondCost("hybrid_cu_oxide")).toBeGreaterThan(bondCost("adhesive_bcb"));
  });
});

describe("roomTemp", () => {
  it("adhesive bcb is room temp", () => {
    expect(roomTemp("adhesive_bcb")).toBe(true);
  });
  it("fusion direct not room temp", () => {
    expect(roomTemp("fusion_direct")).toBe(false);
  });
});

describe("for3d", () => {
  it("hybrid cu oxide is for 3d", () => {
    expect(for3d("hybrid_cu_oxide")).toBe(true);
  });
  it("adhesive bcb not for 3d", () => {
    expect(for3d("adhesive_bcb")).toBe(false);
  });
});

describe("interface_", () => {
  it("hybrid cu oxide uses cu pad plus oxide", () => {
    expect(interface_("hybrid_cu_oxide")).toBe("cu_pad_plus_oxide");
  });
});

describe("bestUse", () => {
  it("hybrid cu oxide best for 3d stacked dram logic", () => {
    expect(bestUse("hybrid_cu_oxide")).toBe("3d_stacked_dram_logic");
  });
});

describe("waferBonds", () => {
  it("returns 5 types", () => {
    expect(waferBonds()).toHaveLength(5);
  });
});
