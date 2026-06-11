export type HeatPlateType =
  | "flat_iron_fuse"
  | "tacking_iron_small"
  | "heat_gun_broad"
  | "torch_fuse_flame"
  | "infrared_lamp_radiant";

const specs: Record<HeatPlateType, {
  fuseEven: number; controlPrecise: number; speedFuse: number;
  areaRange: number; cost: number; flameFree: boolean; handheld: boolean;
  heatMethod: string; use: string;
}> = {
  flat_iron_fuse: {
    fuseEven: 90, controlPrecise: 85, speedFuse: 82,
    areaRange: 80, cost: 7, flameFree: true, handheld: true,
    heatMethod: "contact_flat_plate", use: "general_layer_fuse",
  },
  tacking_iron_small: {
    fuseEven: 82, controlPrecise: 92, speedFuse: 88,
    areaRange: 70, cost: 8, flameFree: true, handheld: true,
    heatMethod: "small_tip_contact", use: "detail_spot_fuse",
  },
  heat_gun_broad: {
    fuseEven: 85, controlPrecise: 78, speedFuse: 90,
    areaRange: 92, cost: 6, flameFree: true, handheld: true,
    heatMethod: "hot_air_convect", use: "broad_area_melt",
  },
  torch_fuse_flame: {
    fuseEven: 78, controlPrecise: 88, speedFuse: 95,
    areaRange: 85, cost: 5, flameFree: false, handheld: true,
    heatMethod: "open_flame_butane", use: "texture_flame_effect",
  },
  infrared_lamp_radiant: {
    fuseEven: 92, controlPrecise: 80, speedFuse: 78,
    areaRange: 88, cost: 12, flameFree: true, handheld: false,
    heatMethod: "infrared_radiant_heat", use: "even_overhead_fuse",
  },
};

export function fuseEven(t: HeatPlateType): number { return specs[t].fuseEven; }
export function controlPrecise(t: HeatPlateType): number { return specs[t].controlPrecise; }
export function speedFuse(t: HeatPlateType): number { return specs[t].speedFuse; }
export function areaRange(t: HeatPlateType): number { return specs[t].areaRange; }
export function plateCost(t: HeatPlateType): number { return specs[t].cost; }
export function flameFree(t: HeatPlateType): boolean { return specs[t].flameFree; }
export function handheld(t: HeatPlateType): boolean { return specs[t].handheld; }
export function heatMethod(t: HeatPlateType): string { return specs[t].heatMethod; }
export function bestUse(t: HeatPlateType): string { return specs[t].use; }
export function heatPlates(): HeatPlateType[] { return Object.keys(specs) as HeatPlateType[]; }
