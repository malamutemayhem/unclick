import { describe, it, expect } from "vitest";
import {
  portCount, dataSpeed, chargingPower, portability,
  hubCost, externalPower, videoOut, connector,
  bestSetup, usbHubs,
} from "../usb-hub-calc.js";

describe("portCount", () => {
  it("docking station most ports", () => {
    expect(portCount("docking_station")).toBeGreaterThan(portCount("travel_slim_4"));
  });
});

describe("dataSpeed", () => {
  it("usb c thunderbolt fastest data", () => {
    expect(dataSpeed("usb_c_thunderbolt")).toBeGreaterThan(dataSpeed("usb_a_7_port"));
  });
});

describe("chargingPower", () => {
  it("powered charging most charging power", () => {
    expect(chargingPower("powered_charging")).toBeGreaterThan(chargingPower("travel_slim_4"));
  });
});

describe("portability", () => {
  it("travel slim 4 most portable", () => {
    expect(portability("travel_slim_4")).toBeGreaterThan(portability("docking_station"));
  });
});

describe("hubCost", () => {
  it("docking station most expensive", () => {
    expect(hubCost("docking_station")).toBeGreaterThan(hubCost("travel_slim_4"));
  });
});

describe("externalPower", () => {
  it("usb a 7 port needs external power", () => {
    expect(externalPower("usb_a_7_port")).toBe(true);
  });
  it("usb c thunderbolt does not", () => {
    expect(externalPower("usb_c_thunderbolt")).toBe(false);
  });
});

describe("videoOut", () => {
  it("usb c thunderbolt has video out", () => {
    expect(videoOut("usb_c_thunderbolt")).toBe(true);
  });
  it("usb a 7 port does not", () => {
    expect(videoOut("usb_a_7_port")).toBe(false);
  });
});

describe("connector", () => {
  it("usb c thunderbolt uses thunderbolt 4", () => {
    expect(connector("usb_c_thunderbolt")).toBe("usb_c_thunderbolt_4");
  });
});

describe("bestSetup", () => {
  it("docking station for dual monitor workstation", () => {
    expect(bestSetup("docking_station")).toBe("dual_monitor_workstation");
  });
});

describe("usbHubs", () => {
  it("returns 5 types", () => {
    expect(usbHubs()).toHaveLength(5);
  });
});
