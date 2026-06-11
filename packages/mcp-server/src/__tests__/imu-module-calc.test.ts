import { describe, it, expect } from "vitest";
import {
  axisCount, fusionQuality, driftLow, powerDraw,
  imuCost, onboardFusion, nineAxis, chipFamily,
  bestUse, imuModules,
} from "../imu-module-calc.js";

describe("axisCount", () => {
  it("bno055 9axis fusion highest axis count", () => {
    expect(axisCount("bno055_9axis_fusion")).toBeGreaterThan(axisCount("mpu6050_6axis_basic"));
  });
});

describe("fusionQuality", () => {
  it("bno055 9axis fusion best fusion quality", () => {
    expect(fusionQuality("bno055_9axis_fusion")).toBeGreaterThan(fusionQuality("mpu6050_6axis_basic"));
  });
});

describe("driftLow", () => {
  it("bno055 9axis fusion lowest drift", () => {
    expect(driftLow("bno055_9axis_fusion")).toBeGreaterThan(driftLow("mpu6050_6axis_basic"));
  });
});

describe("powerDraw", () => {
  it("bmi270 6axis wearable lowest power draw", () => {
    expect(powerDraw("bmi270_6axis_wearable")).toBeGreaterThan(powerDraw("bno055_9axis_fusion"));
  });
});

describe("imuCost", () => {
  it("bno055 9axis fusion most expensive", () => {
    expect(imuCost("bno055_9axis_fusion")).toBeGreaterThan(imuCost("mpu6050_6axis_basic"));
  });
});

describe("onboardFusion", () => {
  it("bno055 9axis fusion has onboard fusion", () => {
    expect(onboardFusion("bno055_9axis_fusion")).toBe(true);
  });
  it("mpu6050 6axis basic no onboard fusion", () => {
    expect(onboardFusion("mpu6050_6axis_basic")).toBe(false);
  });
});

describe("nineAxis", () => {
  it("icm20948 9axis low is nine axis", () => {
    expect(nineAxis("icm20948_9axis_low")).toBe(true);
  });
  it("mpu6050 6axis basic not nine axis", () => {
    expect(nineAxis("mpu6050_6axis_basic")).toBe(false);
  });
});

describe("chipFamily", () => {
  it("lsm6dso 6axis precise uses st micro lsm", () => {
    expect(chipFamily("lsm6dso_6axis_precise")).toBe("st_micro_lsm");
  });
});

describe("bestUse", () => {
  it("bmi270 6axis wearable best for wearable step track", () => {
    expect(bestUse("bmi270_6axis_wearable")).toBe("wearable_step_track");
  });
});

describe("imuModules", () => {
  it("returns 5 types", () => {
    expect(imuModules()).toHaveLength(5);
  });
});
