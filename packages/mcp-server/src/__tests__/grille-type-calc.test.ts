import { describe, it, expect } from "vitest";
import {
  freeArea, directional, aesthetic, pressure,
  glCost, adjustable, forReturn, face,
  bestUse, grilleTypes,
} from "../grille-type-calc.js";

describe("freeArea", () => {
  it("egg crate highest free area", () => {
    expect(freeArea("egg_crate_lattice_open")).toBeGreaterThan(freeArea("stamped_face_decorative"));
  });
});

describe("directional", () => {
  it("double deflection best directional", () => {
    expect(directional("double_deflection_supply")).toBeGreaterThan(directional("transfer_grille_door_wall"));
  });
});

describe("aesthetic", () => {
  it("stamped face best aesthetic", () => {
    expect(aesthetic("stamped_face_decorative")).toBeGreaterThan(aesthetic("transfer_grille_door_wall"));
  });
});

describe("pressure", () => {
  it("double deflection highest pressure", () => {
    expect(pressure("double_deflection_supply")).toBeGreaterThan(pressure("transfer_grille_door_wall"));
  });
});

describe("glCost", () => {
  it("double deflection most expensive", () => {
    expect(glCost("double_deflection_supply")).toBeGreaterThan(glCost("transfer_grille_door_wall"));
  });
});

describe("adjustable", () => {
  it("double deflection is adjustable", () => {
    expect(adjustable("double_deflection_supply")).toBe(true);
  });
  it("bar grille not adjustable", () => {
    expect(adjustable("bar_grille_linear_fixed")).toBe(false);
  });
});

describe("forReturn", () => {
  it("bar grille for return", () => {
    expect(forReturn("bar_grille_linear_fixed")).toBe(true);
  });
  it("double deflection not for return", () => {
    expect(forReturn("double_deflection_supply")).toBe(false);
  });
});

describe("face", () => {
  it("transfer uses chevron blade", () => {
    expect(face("transfer_grille_door_wall")).toBe("chevron_blade_sight_proof_pass");
  });
});

describe("bestUse", () => {
  it("double deflection for sidewall supply", () => {
    expect(bestUse("double_deflection_supply")).toBe("sidewall_supply_directional_control");
  });
});

describe("grilleTypes", () => {
  it("returns 5 types", () => {
    expect(grilleTypes()).toHaveLength(5);
  });
});
