import { describe, it, expect } from "vitest";
import {
  feedAccuracy, throughput, materialRange, controlResponse,
  vfCost, variable, forBulk, feederConfig,
  bestUse, vibratingFeederTypes,
} from "../vibrating-feeder-calc.js";

describe("feedAccuracy", () => {
  it("electromagnetic best feed accuracy", () => {
    expect(feedAccuracy("electromagnetic_vib")).toBeGreaterThan(feedAccuracy("grizzly_vib"));
  });
});

describe("throughput", () => {
  it("grizzly highest throughput", () => {
    expect(throughput("grizzly_vib")).toBeGreaterThan(throughput("tube_vib"));
  });
});

describe("materialRange", () => {
  it("electromechanical best material range", () => {
    expect(materialRange("electromechanical_vib")).toBeGreaterThan(materialRange("tube_vib"));
  });
});

describe("controlResponse", () => {
  it("electromagnetic best control response", () => {
    expect(controlResponse("electromagnetic_vib")).toBeGreaterThan(controlResponse("grizzly_vib"));
  });
});

describe("vfCost", () => {
  it("electromagnetic most expensive", () => {
    expect(vfCost("electromagnetic_vib")).toBeGreaterThan(vfCost("tube_vib"));
  });
});

describe("variable", () => {
  it("electromagnetic is variable", () => {
    expect(variable("electromagnetic_vib")).toBe(true);
  });
  it("grizzly not variable", () => {
    expect(variable("grizzly_vib")).toBe(false);
  });
});

describe("forBulk", () => {
  it("electromechanical for bulk", () => {
    expect(forBulk("electromechanical_vib")).toBe(true);
  });
  it("electromagnetic not for bulk", () => {
    expect(forBulk("electromagnetic_vib")).toBe(false);
  });
});

describe("feederConfig", () => {
  it("pan vib uses flat tray vibrate spread even layer feed", () => {
    expect(feederConfig("pan_vib")).toBe("pan_vibrating_feeder_flat_tray_vibrate_spread_even_layer_feed");
  });
});

describe("bestUse", () => {
  it("grizzly for quarry feed scalp oversize crusher feed", () => {
    expect(bestUse("grizzly_vib")).toBe("quarry_feed_grizzly_vibrating_feeder_scalp_oversize_crusher_feed");
  });
});

describe("vibratingFeederTypes", () => {
  it("returns 5 types", () => {
    expect(vibratingFeederTypes()).toHaveLength(5);
  });
});
