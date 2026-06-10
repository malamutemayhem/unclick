// Wax resist calculator - pottery wax decoration resist tools

export type WaxResistType =
  | "hot_wax_brush"
  | "cold_wax_emulsion"
  | "latex_peel_mask"
  | "shellac_alcohol_coat"
  | "crayon_draw_mark";

const WAX_DATA: Record<
  WaxResistType,
  {
    resistStrength: number;
    lineControl: number;
    removeEase: number;
    layerBuild: number;
    cost: number;
    needsHeat: boolean;
    peelable: boolean;
    baseType: string;
    bestUse: string;
  }
> = {
  hot_wax_brush: {
    resistStrength: 9,
    lineControl: 7,
    removeEase: 8,
    layerBuild: 6,
    cost: 4,
    needsHeat: true,
    peelable: false,
    baseType: "paraffin_beeswax_blend",
    bestUse: "classic_glaze_resist",
  },
  cold_wax_emulsion: {
    resistStrength: 7,
    lineControl: 6,
    removeEase: 9,
    layerBuild: 7,
    cost: 5,
    needsHeat: false,
    peelable: false,
    baseType: "water_wax_emulsion",
    bestUse: "quick_brush_resist",
  },
  latex_peel_mask: {
    resistStrength: 8,
    lineControl: 8,
    removeEase: 10,
    layerBuild: 5,
    cost: 6,
    needsHeat: false,
    peelable: true,
    baseType: "liquid_latex_rubber",
    bestUse: "precise_mask_peel",
  },
  shellac_alcohol_coat: {
    resistStrength: 10,
    lineControl: 5,
    removeEase: 4,
    layerBuild: 8,
    cost: 5,
    needsHeat: false,
    peelable: false,
    baseType: "shellac_alcohol_base",
    bestUse: "multi_layer_fire",
  },
  crayon_draw_mark: {
    resistStrength: 5,
    lineControl: 9,
    removeEase: 7,
    layerBuild: 3,
    cost: 2,
    needsHeat: false,
    peelable: false,
    baseType: "wax_crayon_stick",
    bestUse: "drawing_line_resist",
  },
};

export function resistStrength(type: WaxResistType): number {
  return WAX_DATA[type].resistStrength;
}
export function lineControl(type: WaxResistType): number {
  return WAX_DATA[type].lineControl;
}
export function removeEase(type: WaxResistType): number {
  return WAX_DATA[type].removeEase;
}
export function layerBuild(type: WaxResistType): number {
  return WAX_DATA[type].layerBuild;
}
export function resistCost(type: WaxResistType): number {
  return WAX_DATA[type].cost;
}
export function needsHeat(type: WaxResistType): boolean {
  return WAX_DATA[type].needsHeat;
}
export function peelable(type: WaxResistType): boolean {
  return WAX_DATA[type].peelable;
}
export function baseType(type: WaxResistType): string {
  return WAX_DATA[type].baseType;
}
export function bestUse(type: WaxResistType): string {
  return WAX_DATA[type].bestUse;
}
export function waxResists(): WaxResistType[] {
  return Object.keys(WAX_DATA) as WaxResistType[];
}
