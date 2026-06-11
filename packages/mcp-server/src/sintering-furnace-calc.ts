export type SinteringFurnaceType =
  | "mesh_belt_continuous"
  | "pusher_continuous"
  | "walking_beam"
  | "vacuum_sintering"
  | "hip_sintering";

interface SinteringFurnaceData {
  temperature: number;
  throughput: number;
  density: number;
  atmosphere: number;
  sfCost: number;
  continuous: boolean;
  forPowderMetal: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<SinteringFurnaceType, SinteringFurnaceData> = {
  mesh_belt_continuous: {
    temperature: 6, throughput: 10, density: 7, atmosphere: 7, sfCost: 5,
    continuous: true, forPowderMetal: true,
    heating: "muffle_mesh_belt_endogas_atmosphere_continuous_feed",
    bestUse: "iron_copper_pm_part_high_volume_automotive_bearing_gear",
  },
  pusher_continuous: {
    temperature: 8, throughput: 9, density: 8, atmosphere: 8, sfCost: 7,
    continuous: true, forPowderMetal: true,
    heating: "silicon_carbide_element_pusher_tray_hydrogen_atmosphere",
    bestUse: "stainless_steel_pm_part_higher_temp_structural_component",
  },
  walking_beam: {
    temperature: 8, throughput: 8, density: 8, atmosphere: 8, sfCost: 8,
    continuous: true, forPowderMetal: true,
    heating: "molybdenum_element_walking_beam_precise_cycle_control",
    bestUse: "cemented_carbide_tool_insert_tungsten_carbide_hard_metal",
  },
  vacuum_sintering: {
    temperature: 10, throughput: 5, density: 10, atmosphere: 10, sfCost: 9,
    continuous: false, forPowderMetal: true,
    heating: "graphite_element_high_vacuum_no_oxide_full_density_sinter",
    bestUse: "titanium_mim_part_reactive_metal_medical_implant_aerospace",
  },
  hip_sintering: {
    temperature: 10, throughput: 4, density: 10, atmosphere: 10, sfCost: 10,
    continuous: false, forPowderMetal: true,
    heating: "argon_gas_isostatic_pressure_vessel_full_density_closure",
    bestUse: "turbine_disc_hip_consolidation_critical_aerospace_nuclear",
  },
};

function get(t: SinteringFurnaceType): SinteringFurnaceData {
  return DATA[t];
}

export const temperature = (t: SinteringFurnaceType) => get(t).temperature;
export const throughput = (t: SinteringFurnaceType) => get(t).throughput;
export const density = (t: SinteringFurnaceType) => get(t).density;
export const atmosphere = (t: SinteringFurnaceType) => get(t).atmosphere;
export const sfCost = (t: SinteringFurnaceType) => get(t).sfCost;
export const continuous = (t: SinteringFurnaceType) => get(t).continuous;
export const forPowderMetal = (t: SinteringFurnaceType) => get(t).forPowderMetal;
export const heating = (t: SinteringFurnaceType) => get(t).heating;
export const bestUse = (t: SinteringFurnaceType) => get(t).bestUse;
export const sinteringFurnaceTypes = (): SinteringFurnaceType[] =>
  Object.keys(DATA) as SinteringFurnaceType[];
