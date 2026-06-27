export type SolarPanelType =
  | "body_mounted_gaas"
  | "rigid_deployable_wing"
  | "flexible_rollout_array"
  | "concentrator_fresnel_lens"
  | "thin_film_cigs_flex";

const DATA: Record<SolarPanelType, {
  efficiency: number; powerDensity: number; deployability: number;
  degradation: number; spCost: number; tracking: boolean;
  forSmallsat: boolean; cell: string; bestUse: string;
}> = {
  body_mounted_gaas: {
    efficiency: 7, powerDensity: 5, deployability: 10,
    degradation: 7, spCost: 2, tracking: false,
    forSmallsat: true, cell: "triple_junction_gaas_ge",
    bestUse: "cubesat_fixed_panel_array",
  },
  rigid_deployable_wing: {
    efficiency: 9, powerDensity: 8, deployability: 6,
    degradation: 8, spCost: 4, tracking: true,
    forSmallsat: false, cell: "multi_junction_ingap_gaas",
    bestUse: "geo_satellite_high_power",
  },
  flexible_rollout_array: {
    efficiency: 8, powerDensity: 10, deployability: 9,
    degradation: 6, spCost: 3, tracking: true,
    forSmallsat: true, cell: "thin_gaas_on_flex_substrate",
    bestUse: "iss_power_augmentation_rosa",
  },
  concentrator_fresnel_lens: {
    efficiency: 10, powerDensity: 9, deployability: 4,
    degradation: 5, spCost: 5, tracking: true,
    forSmallsat: false, cell: "quad_junction_concentrated",
    bestUse: "deep_space_high_efficiency",
  },
  thin_film_cigs_flex: {
    efficiency: 5, powerDensity: 7, deployability: 8,
    degradation: 4, spCost: 1, tracking: false,
    forSmallsat: true, cell: "cigs_copper_indium_gallium",
    bestUse: "disposable_deorbit_sail_power",
  },
};

const get = (t: SolarPanelType) => DATA[t];

export const efficiency = (t: SolarPanelType) => get(t).efficiency;
export const powerDensity = (t: SolarPanelType) => get(t).powerDensity;
export const deployability = (t: SolarPanelType) => get(t).deployability;
export const degradation = (t: SolarPanelType) => get(t).degradation;
export const spCost = (t: SolarPanelType) => get(t).spCost;
export const tracking = (t: SolarPanelType) => get(t).tracking;
export const forSmallsat = (t: SolarPanelType) => get(t).forSmallsat;
export const cell = (t: SolarPanelType) => get(t).cell;
export const bestUse = (t: SolarPanelType) => get(t).bestUse;
export const solarPanelTypes = (): SolarPanelType[] => Object.keys(DATA) as SolarPanelType[];
