import { describe, it, expect } from "vitest";
import {
  jointSupport, warmthRetention, coolingAirflow, washability,
  bedCost, indoorOutdoor, machineWash, fillType,
  bestPet, petBeds,
} from "../pet-bed-calc.js";

describe("jointSupport", () => {
  it("orthopedic memory foam best joint support", () => {
    expect(jointSupport("orthopedic_memory_foam")).toBeGreaterThan(jointSupport("cave_hooded"));
  });
});

describe("warmthRetention", () => {
  it("heated electric warmest", () => {
    expect(warmthRetention("heated_electric")).toBeGreaterThan(warmthRetention("elevated_cot"));
  });
});

describe("coolingAirflow", () => {
  it("elevated cot best airflow", () => {
    expect(coolingAirflow("elevated_cot")).toBeGreaterThan(coolingAirflow("cave_hooded"));
  });
});

describe("washability", () => {
  it("elevated cot easiest to wash", () => {
    expect(washability("elevated_cot")).toBeGreaterThan(washability("heated_electric"));
  });
});

describe("bedCost", () => {
  it("orthopedic memory foam most expensive", () => {
    expect(bedCost("orthopedic_memory_foam")).toBeGreaterThan(bedCost("bolster_nest"));
  });
});

describe("indoorOutdoor", () => {
  it("elevated cot works indoor outdoor", () => {
    expect(indoorOutdoor("elevated_cot")).toBe(true);
  });
  it("orthopedic memory foam does not", () => {
    expect(indoorOutdoor("orthopedic_memory_foam")).toBe(false);
  });
});

describe("machineWash", () => {
  it("bolster nest is machine washable", () => {
    expect(machineWash("bolster_nest")).toBe(true);
  });
  it("heated electric is not", () => {
    expect(machineWash("heated_electric")).toBe(false);
  });
});

describe("fillType", () => {
  it("cave hooded uses sherpa lined poly fill", () => {
    expect(fillType("cave_hooded")).toBe("sherpa_lined_poly_fill");
  });
});

describe("bestPet", () => {
  it("elevated cot for hot climate outdoor dog", () => {
    expect(bestPet("elevated_cot")).toBe("hot_climate_outdoor_dog");
  });
});

describe("petBeds", () => {
  it("returns 5 types", () => {
    expect(petBeds()).toHaveLength(5);
  });
});
