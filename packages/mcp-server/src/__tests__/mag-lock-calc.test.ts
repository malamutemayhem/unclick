import { describe, it, expect } from "vitest";
import {
  holdForce, reliability, installEase, aesthetic,
  mlCost, failSafe, forExterior, mounting,
  bestUse, magLockTypes,
} from "../mag-lock-calc.js";

describe("holdForce", () => {
  it("double door strongest", () => {
    expect(holdForce("double_door_1200_lb")).toBeGreaterThan(holdForce("single_door_600_lb"));
  });
});

describe("reliability", () => {
  it("single door very reliable", () => {
    expect(reliability("single_door_600_lb")).toBeGreaterThanOrEqual(reliability("shear_lock_mortise"));
  });
});

describe("installEase", () => {
  it("mini mag easiest install", () => {
    expect(installEase("mini_mag_cabinet_gate")).toBeGreaterThan(installEase("shear_lock_mortise"));
  });
});

describe("aesthetic", () => {
  it("shear lock best aesthetic", () => {
    expect(aesthetic("shear_lock_mortise")).toBeGreaterThan(aesthetic("double_door_1200_lb"));
  });
});

describe("mlCost", () => {
  it("shear lock most expensive", () => {
    expect(mlCost("shear_lock_mortise")).toBeGreaterThan(mlCost("single_door_600_lb"));
  });
});

describe("failSafe", () => {
  it("all mag locks are fail safe", () => {
    expect(failSafe("single_door_600_lb")).toBe(true);
  });
});

describe("forExterior", () => {
  it("outdoor for exterior", () => {
    expect(forExterior("outdoor_weather_sealed")).toBe(true);
  });
  it("single door not exterior", () => {
    expect(forExterior("single_door_600_lb")).toBe(false);
  });
});

describe("mounting", () => {
  it("shear lock concealed mortise", () => {
    expect(mounting("shear_lock_mortise")).toBe("concealed_mortise_frame_door");
  });
});

describe("bestUse", () => {
  it("mini mag for cabinet", () => {
    expect(bestUse("mini_mag_cabinet_gate")).toBe("cabinet_gate_light_security");
  });
});

describe("magLockTypes", () => {
  it("returns 5 types", () => {
    expect(magLockTypes()).toHaveLength(5);
  });
});
