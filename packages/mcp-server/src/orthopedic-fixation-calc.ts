export type OrthopedicFixation = "plate_screw" | "intramedullary_nail" | "external_fixator" | "wire_pin" | "bioabsorbable";

export function stabilityLevel(f: OrthopedicFixation): number {
  const m: Record<OrthopedicFixation, number> = {
    plate_screw: 9, intramedullary_nail: 8, external_fixator: 7, wire_pin: 5, bioabsorbable: 4,
  };
  return m[f];
}

export function surgicalComplexity(f: OrthopedicFixation): number {
  const m: Record<OrthopedicFixation, number> = {
    plate_screw: 7, intramedullary_nail: 8, external_fixator: 6, wire_pin: 4, bioabsorbable: 5,
  };
  return m[f];
}

export function removalRequired(f: OrthopedicFixation): number {
  const m: Record<OrthopedicFixation, number> = {
    plate_screw: 6, intramedullary_nail: 5, external_fixator: 10, wire_pin: 8, bioabsorbable: 1,
  };
  return m[f];
}

export function infectionRisk(f: OrthopedicFixation): number {
  const m: Record<OrthopedicFixation, number> = {
    plate_screw: 4, intramedullary_nail: 3, external_fixator: 8, wire_pin: 7, bioabsorbable: 2,
  };
  return m[f];
}

export function implantCost(f: OrthopedicFixation): number {
  const m: Record<OrthopedicFixation, number> = {
    plate_screw: 6, intramedullary_nail: 8, external_fixator: 7, wire_pin: 3, bioabsorbable: 9,
  };
  return m[f];
}

export function selfDissolving(f: OrthopedicFixation): boolean {
  const m: Record<OrthopedicFixation, boolean> = {
    plate_screw: false, intramedullary_nail: false, external_fixator: false, wire_pin: false, bioabsorbable: true,
  };
  return m[f];
}

export function weightBearingImmediate(f: OrthopedicFixation): boolean {
  const m: Record<OrthopedicFixation, boolean> = {
    plate_screw: true, intramedullary_nail: true, external_fixator: false, wire_pin: false, bioabsorbable: false,
  };
  return m[f];
}

export function bestFractureType(f: OrthopedicFixation): string {
  const m: Record<OrthopedicFixation, string> = {
    plate_screw: "periarticular_comminuted", intramedullary_nail: "diaphyseal_long_bone",
    external_fixator: "open_contaminated_fracture", wire_pin: "small_bone_pediatric",
    bioabsorbable: "non_load_bearing_soft_tissue",
  };
  return m[f];
}

export function materialUsed(f: OrthopedicFixation): string {
  const m: Record<OrthopedicFixation, string> = {
    plate_screw: "titanium_stainless_steel", intramedullary_nail: "titanium_alloy",
    external_fixator: "stainless_carbon_fiber", wire_pin: "stainless_steel_kirschner",
    bioabsorbable: "polylactic_acid_polymer",
  };
  return m[f];
}

export function orthopedicFixations(): OrthopedicFixation[] {
  return ["plate_screw", "intramedullary_nail", "external_fixator", "wire_pin", "bioabsorbable"];
}
