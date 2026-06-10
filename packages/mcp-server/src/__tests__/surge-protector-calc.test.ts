import { describe, it, expect } from "vitest";
import {
  jouleRating, responseTime, clampingVoltage, portability,
  protectorCost, batteryBackup, professionalInstall, protectionScope,
  bestUse, surgeProtectors,
} from "../surge-protector-calc.js";

describe("jouleRating", () => {
  it("whole house panel highest joule rating", () => {
    expect(jouleRating("whole_house_panel")).toBeGreaterThan(jouleRating("travel_compact"));
  });
});

describe("responseTime", () => {
  it("whole house panel fastest response time", () => {
    expect(responseTime("whole_house_panel")).toBeGreaterThan(responseTime("travel_compact"));
  });
});

describe("clampingVoltage", () => {
  it("whole house panel best clamping voltage", () => {
    expect(clampingVoltage("whole_house_panel")).toBeGreaterThan(clampingVoltage("basic_strip_joule"));
  });
});

describe("portability", () => {
  it("travel compact most portable", () => {
    expect(portability("travel_compact")).toBeGreaterThan(portability("whole_house_panel"));
  });
});

describe("protectorCost", () => {
  it("rack mount server most expensive", () => {
    expect(protectorCost("rack_mount_server")).toBeGreaterThan(protectorCost("basic_strip_joule"));
  });
});

describe("batteryBackup", () => {
  it("ups battery backup has battery backup", () => {
    expect(batteryBackup("ups_battery_backup")).toBe(true);
  });
  it("basic strip joule does not", () => {
    expect(batteryBackup("basic_strip_joule")).toBe(false);
  });
});

describe("professionalInstall", () => {
  it("whole house panel needs professional install", () => {
    expect(professionalInstall("whole_house_panel")).toBe(true);
  });
  it("travel compact does not", () => {
    expect(professionalInstall("travel_compact")).toBe(false);
  });
});

describe("protectionScope", () => {
  it("ups battery backup provides critical device runtime", () => {
    expect(protectionScope("ups_battery_backup")).toBe("critical_device_runtime");
  });
});

describe("bestUse", () => {
  it("whole house panel for lightning prone region", () => {
    expect(bestUse("whole_house_panel")).toBe("lightning_prone_region");
  });
});

describe("surgeProtectors", () => {
  it("returns 5 types", () => {
    expect(surgeProtectors()).toHaveLength(5);
  });
});
