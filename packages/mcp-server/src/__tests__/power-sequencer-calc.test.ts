import { describe, it, expect } from "vitest";
import {
  channels, timing, monitoring, flexibility,
  seqCost, programmable, forServer, control,
  bestUse, powerSequencers,
} from "../power-sequencer-calc.js";

describe("channels", () => {
  it("fpga soft seq most channels", () => {
    expect(channels("fpga_soft_seq")).toBeGreaterThan(channels("discrete_rc_delay"));
  });
});

describe("timing", () => {
  it("fpga soft seq best timing", () => {
    expect(timing("fpga_soft_seq")).toBeGreaterThan(timing("discrete_rc_delay"));
  });
});

describe("monitoring", () => {
  it("pmic integrated best monitoring", () => {
    expect(monitoring("pmic_integrated")).toBeGreaterThan(monitoring("discrete_rc_delay"));
  });
});

describe("flexibility", () => {
  it("fpga soft seq most flexible", () => {
    expect(flexibility("fpga_soft_seq")).toBeGreaterThan(flexibility("discrete_rc_delay"));
  });
});

describe("seqCost", () => {
  it("fpga soft seq most expensive", () => {
    expect(seqCost("fpga_soft_seq")).toBeGreaterThan(seqCost("discrete_rc_delay"));
  });
});

describe("programmable", () => {
  it("digital i2c prog is programmable", () => {
    expect(programmable("digital_i2c_prog")).toBe(true);
  });
  it("discrete rc delay not programmable", () => {
    expect(programmable("discrete_rc_delay")).toBe(false);
  });
});

describe("forServer", () => {
  it("digital i2c prog is for server", () => {
    expect(forServer("digital_i2c_prog")).toBe(true);
  });
  it("discrete rc delay not for server", () => {
    expect(forServer("discrete_rc_delay")).toBe(false);
  });
});

describe("control", () => {
  it("fpga soft seq uses fsm bitstream logic", () => {
    expect(control("fpga_soft_seq")).toBe("fsm_bitstream_logic");
  });
});

describe("bestUse", () => {
  it("pmic integrated best for server bmc power", () => {
    expect(bestUse("pmic_integrated")).toBe("server_bmc_power");
  });
});

describe("powerSequencers", () => {
  it("returns 5 types", () => {
    expect(powerSequencers()).toHaveLength(5);
  });
});
