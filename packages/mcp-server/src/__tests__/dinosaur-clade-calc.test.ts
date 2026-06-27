import { describe, it, expect } from "vitest";
import {
  averageSize, fossilCompleteness, speciesDiversity, geographicSpread,
  armorLevel, carnivorous, bipedal, iconicGenus,
  dietaryStrategy, dinosaurClades,
} from "../dinosaur-clade-calc.js";

describe("averageSize", () => {
  it("sauropod largest", () => {
    expect(averageSize("sauropod")).toBeGreaterThan(averageSize("ornithopod"));
  });
});

describe("fossilCompleteness", () => {
  it("ceratopsian best fossil completeness", () => {
    expect(fossilCompleteness("ceratopsian")).toBeGreaterThan(fossilCompleteness("sauropod"));
  });
});

describe("speciesDiversity", () => {
  it("theropod most diverse", () => {
    expect(speciesDiversity("theropod")).toBeGreaterThan(speciesDiversity("ankylosaur"));
  });
});

describe("geographicSpread", () => {
  it("theropod widest spread", () => {
    expect(geographicSpread("theropod")).toBeGreaterThan(geographicSpread("ceratopsian"));
  });
});

describe("armorLevel", () => {
  it("ankylosaur most armored", () => {
    expect(armorLevel("ankylosaur")).toBeGreaterThan(armorLevel("theropod"));
  });
});

describe("carnivorous", () => {
  it("theropod is carnivorous", () => {
    expect(carnivorous("theropod")).toBe(true);
  });
  it("sauropod is not", () => {
    expect(carnivorous("sauropod")).toBe(false);
  });
});

describe("bipedal", () => {
  it("theropod is bipedal", () => {
    expect(bipedal("theropod")).toBe(true);
  });
  it("sauropod is not", () => {
    expect(bipedal("sauropod")).toBe(false);
  });
});

describe("iconicGenus", () => {
  it("theropod iconic is tyrannosaurus velociraptor", () => {
    expect(iconicGenus("theropod")).toBe("tyrannosaurus_velociraptor");
  });
});

describe("dietaryStrategy", () => {
  it("sauropod is high browser", () => {
    expect(dietaryStrategy("sauropod")).toBe("high_browser");
  });
});

describe("dinosaurClades", () => {
  it("returns 5 clades", () => {
    expect(dinosaurClades()).toHaveLength(5);
  });
});
