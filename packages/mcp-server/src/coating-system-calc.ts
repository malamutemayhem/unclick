export type CoatingSystemType =
  | "epoxy_two_part"
  | "polyurethane_topcoat"
  | "zinc_rich_primer"
  | "fusion_bonded_epoxy"
  | "thermal_ceramic_coat";

interface CoatingSystemData {
  corrosionProtect: number;
  abrasionResist: number;
  chemicalResist: number;
  uvStability: number;
  csCost: number;
  multiCoat: boolean;
  forImmersion: boolean;
  system: string;
  bestUse: string;
}

const DATA: Record<CoatingSystemType, CoatingSystemData> = {
  epoxy_two_part: {
    corrosionProtect: 9, abrasionResist: 8, chemicalResist: 9, uvStability: 4, csCost: 6,
    multiCoat: true, forImmersion: true,
    system: "two_component_amine_cured_epoxy_high_build",
    bestUse: "tank_lining_immersion_chemical_containment",
  },
  polyurethane_topcoat: {
    corrosionProtect: 7, abrasionResist: 9, chemicalResist: 7, uvStability: 10, csCost: 7,
    multiCoat: true, forImmersion: false,
    system: "aliphatic_polyurethane_gloss_uv_stable_finish",
    bestUse: "exterior_structural_steel_bridge_aesthetic",
  },
  zinc_rich_primer: {
    corrosionProtect: 10, abrasionResist: 5, chemicalResist: 6, uvStability: 3, csCost: 5,
    multiCoat: false, forImmersion: false,
    system: "inorganic_zinc_silicate_galvanic_primer_coat",
    bestUse: "structural_steel_primer_galvanic_cathodic",
  },
  fusion_bonded_epoxy: {
    corrosionProtect: 10, abrasionResist: 7, chemicalResist: 8, uvStability: 3, csCost: 8,
    multiCoat: false, forImmersion: true,
    system: "electrostatic_powder_fused_epoxy_pipeline",
    bestUse: "buried_pipeline_rebar_factory_applied_coat",
  },
  thermal_ceramic_coat: {
    corrosionProtect: 6, abrasionResist: 6, chemicalResist: 7, uvStability: 8, csCost: 7,
    multiCoat: true, forImmersion: false,
    system: "ceramic_microsphere_insulating_barrier_coat",
    bestUse: "high_temp_insulation_heat_loss_reduction_pipe",
  },
};

function get(t: CoatingSystemType): CoatingSystemData {
  return DATA[t];
}

export const corrosionProtect = (t: CoatingSystemType) => get(t).corrosionProtect;
export const abrasionResist = (t: CoatingSystemType) => get(t).abrasionResist;
export const chemicalResist = (t: CoatingSystemType) => get(t).chemicalResist;
export const uvStability = (t: CoatingSystemType) => get(t).uvStability;
export const csCost = (t: CoatingSystemType) => get(t).csCost;
export const multiCoat = (t: CoatingSystemType) => get(t).multiCoat;
export const forImmersion = (t: CoatingSystemType) => get(t).forImmersion;
export const system = (t: CoatingSystemType) => get(t).system;
export const bestUse = (t: CoatingSystemType) => get(t).bestUse;
export const coatingSystemTypes = (): CoatingSystemType[] =>
  Object.keys(DATA) as CoatingSystemType[];
