import { describe, it, expect } from "vitest";
import {
  dataModel, security, scalability, realTime,
  profileCost, pubsub, forCloud, transport,
  bestUse, opcuaProfiles,
} from "../opcua-profile-calc.js";

describe("dataModel", () => {
  it("standard full richest data model", () => {
    expect(dataModel("standard_full")).toBeGreaterThan(dataModel("nano_embedded"));
  });
});

describe("security", () => {
  it("global discovery best security", () => {
    expect(security("global_discovery")).toBeGreaterThan(security("nano_embedded"));
  });
});

describe("scalability", () => {
  it("global discovery most scalable", () => {
    expect(scalability("global_discovery")).toBeGreaterThan(scalability("nano_embedded"));
  });
});

describe("realTime", () => {
  it("pubsub tsn best real time", () => {
    expect(realTime("pubsub_tsn")).toBeGreaterThan(realTime("global_discovery"));
  });
});

describe("profileCost", () => {
  it("pubsub tsn most expensive", () => {
    expect(profileCost("pubsub_tsn")).toBeGreaterThan(profileCost("nano_embedded"));
  });
});

describe("pubsub", () => {
  it("pubsub tsn supports pubsub", () => {
    expect(pubsub("pubsub_tsn")).toBe(true);
  });
  it("standard full no pubsub", () => {
    expect(pubsub("standard_full")).toBe(false);
  });
});

describe("forCloud", () => {
  it("standard full is for cloud", () => {
    expect(forCloud("standard_full")).toBe(true);
  });
  it("nano embedded not for cloud", () => {
    expect(forCloud("nano_embedded")).toBe(false);
  });
});

describe("transport", () => {
  it("nano embedded uses binary tcp minimal", () => {
    expect(transport("nano_embedded")).toBe("binary_tcp_minimal");
  });
});

describe("bestUse", () => {
  it("pubsub tsn best for deterministic motion ctrl", () => {
    expect(bestUse("pubsub_tsn")).toBe("deterministic_motion_ctrl");
  });
});

describe("opcuaProfiles", () => {
  it("returns 5 types", () => {
    expect(opcuaProfiles()).toHaveLength(5);
  });
});
