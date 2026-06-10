import { describe, it, expect } from "vitest";
import {
  flowControl, shutoffSpeed, pressureDrop,
  durability, costScore, quarterTurn,
  preventsBackflow, bestUse, operatorType, valveTypes,
} from "../valve-type-calc.js";

describe("flowControl", () => {
  it("globe best flow control", () => {
    expect(flowControl("globe")).toBeGreaterThan(
      flowControl("gate")
    );
  });
});

describe("shutoffSpeed", () => {
  it("ball fastest shutoff", () => {
    expect(shutoffSpeed("ball")).toBeGreaterThan(
      shutoffSpeed("gate")
    );
  });
});

describe("pressureDrop", () => {
  it("globe highest pressure drop", () => {
    expect(pressureDrop("globe")).toBeGreaterThan(
      pressureDrop("gate")
    );
  });
});

describe("durability", () => {
  it("ball most durable", () => {
    expect(durability("ball")).toBeGreaterThan(
      durability("check")
    );
  });
});

describe("costScore", () => {
  it("globe most expensive", () => {
    expect(costScore("globe")).toBeGreaterThan(
      costScore("check")
    );
  });
});

describe("quarterTurn", () => {
  it("ball is quarter turn", () => {
    expect(quarterTurn("ball")).toBe(true);
  });
  it("gate is not", () => {
    expect(quarterTurn("gate")).toBe(false);
  });
});

describe("preventsBackflow", () => {
  it("check prevents backflow", () => {
    expect(preventsBackflow("check")).toBe(true);
  });
  it("ball does not", () => {
    expect(preventsBackflow("ball")).toBe(false);
  });
});

describe("bestUse", () => {
  it("ball for on off isolation", () => {
    expect(bestUse("ball")).toBe("on_off_isolation");
  });
});

describe("operatorType", () => {
  it("check is automatic gravity", () => {
    expect(operatorType("check")).toBe("automatic_gravity");
  });
});

describe("valveTypes", () => {
  it("returns 5 types", () => {
    expect(valveTypes()).toHaveLength(5);
  });
});
