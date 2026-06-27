import { describe, it, expect } from "vitest";
import {
  effectiveness, wasteVolume, speed, surfaceSafe,
  dcCost, remote, forLargeArea, process,
  bestUse, decontaminationMethodTypes,
} from "../decontamination-method-calc.js";

describe("effectiveness", () => {
  it("mechanical abrasive most effective", () => {
    expect(effectiveness("mechanical_abrasive_blast")).toBeGreaterThan(effectiveness("strippable_coating_peel"));
  });
});

describe("wasteVolume", () => {
  it("strippable coating least waste volume", () => {
    expect(wasteVolume("strippable_coating_peel")).toBeGreaterThan(wasteVolume("mechanical_abrasive_blast"));
  });
});

describe("speed", () => {
  it("strippable coating fastest", () => {
    expect(speed("strippable_coating_peel")).toBeGreaterThan(speed("electrochemical_decon"));
  });
});

describe("surfaceSafe", () => {
  it("strippable coating safest for surface", () => {
    expect(surfaceSafe("strippable_coating_peel")).toBeGreaterThan(surfaceSafe("mechanical_abrasive_blast"));
  });
});

describe("dcCost", () => {
  it("electrochemical most expensive", () => {
    expect(dcCost("electrochemical_decon")).toBeGreaterThan(dcCost("chemical_acid_wash"));
  });
});

describe("remote", () => {
  it("chemical acid wash is remote capable", () => {
    expect(remote("chemical_acid_wash")).toBe(true);
  });
  it("ultrasonic not remote", () => {
    expect(remote("ultrasonic_cavitation")).toBe(false);
  });
});

describe("forLargeArea", () => {
  it("strippable coating for large area", () => {
    expect(forLargeArea("strippable_coating_peel")).toBe(true);
  });
  it("electrochemical not for large area", () => {
    expect(forLargeArea("electrochemical_decon")).toBe(false);
  });
});

describe("process", () => {
  it("ultrasonic uses cavitation bubble implosion", () => {
    expect(process("ultrasonic_cavitation")).toBe("cavitation_bubble_implosion");
  });
});

describe("bestUse", () => {
  it("chemical acid best for reactor primary loop", () => {
    expect(bestUse("chemical_acid_wash")).toBe("reactor_primary_loop_system_decon");
  });
});

describe("decontaminationMethodTypes", () => {
  it("returns 5 types", () => {
    expect(decontaminationMethodTypes()).toHaveLength(5);
  });
});
