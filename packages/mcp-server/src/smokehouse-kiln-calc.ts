export type SmokehouseKilnType =
  | "natural_draft"
  | "forced_air"
  | "liquid_smoke"
  | "electrostatic"
  | "continuous_tunnel";

interface SmokehouseKilnData {
  smokeDepth: number;
  temperatureControl: number;
  throughput: number;
  energyEfficiency: number;
  skCost: number;
  automated: boolean;
  forArtisan: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<SmokehouseKilnType, SmokehouseKilnData> = {
  natural_draft: {
    smokeDepth: 10, temperatureControl: 5, throughput: 4, energyEfficiency: 6, skCost: 4,
    automated: false, forArtisan: true,
    kilnConfig: "natural_draft_smokehouse_kiln_wood_chip_gravity_ventilate_slow",
    bestUse: "artisan_smokehouse_natural_draft_traditional_wood_smoke_flavor",
  },
  forced_air: {
    smokeDepth: 8, temperatureControl: 9, throughput: 8, energyEfficiency: 7, skCost: 7,
    automated: true, forArtisan: false,
    kilnConfig: "forced_air_smokehouse_kiln_fan_circulate_smoke_heat_uniform",
    bestUse: "commercial_smokehouse_forced_air_uniform_smoke_cook_temperature",
  },
  liquid_smoke: {
    smokeDepth: 6, temperatureControl: 10, throughput: 10, energyEfficiency: 9, skCost: 6,
    automated: true, forArtisan: false,
    kilnConfig: "liquid_smoke_smokehouse_kiln_atomize_spray_condensed_smoke_fast",
    bestUse: "industrial_smokehouse_liquid_smoke_atomizer_fast_consistent_color",
  },
  electrostatic: {
    smokeDepth: 9, temperatureControl: 9, throughput: 8, energyEfficiency: 8, skCost: 9,
    automated: true, forArtisan: false,
    kilnConfig: "electrostatic_smokehouse_kiln_charge_particle_deposit_surface",
    bestUse: "premium_smokehouse_electrostatic_deep_smoke_penetration_efficient",
  },
  continuous_tunnel: {
    smokeDepth: 7, temperatureControl: 8, throughput: 10, energyEfficiency: 8, skCost: 10,
    automated: true, forArtisan: false,
    kilnConfig: "continuous_tunnel_smokehouse_kiln_conveyor_zone_smoke_cook_chill",
    bestUse: "large_scale_smokehouse_continuous_tunnel_conveyor_multi_zone_line",
  },
};

function get(t: SmokehouseKilnType): SmokehouseKilnData {
  return DATA[t];
}

export const smokeDepth = (t: SmokehouseKilnType) => get(t).smokeDepth;
export const temperatureControl = (t: SmokehouseKilnType) => get(t).temperatureControl;
export const throughput = (t: SmokehouseKilnType) => get(t).throughput;
export const energyEfficiency = (t: SmokehouseKilnType) => get(t).energyEfficiency;
export const skCost = (t: SmokehouseKilnType) => get(t).skCost;
export const automated = (t: SmokehouseKilnType) => get(t).automated;
export const forArtisan = (t: SmokehouseKilnType) => get(t).forArtisan;
export const kilnConfig = (t: SmokehouseKilnType) => get(t).kilnConfig;
export const bestUse = (t: SmokehouseKilnType) => get(t).bestUse;
export const smokehouseKilnTypes = (): SmokehouseKilnType[] =>
  Object.keys(DATA) as SmokehouseKilnType[];
