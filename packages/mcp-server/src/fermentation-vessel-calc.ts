export type FermentationVesselType =
  | "open_top"
  | "cylindroconical"
  | "unitank"
  | "horizontal_lager"
  | "coolship";

interface FermentationVesselData {
  tempControl: number;
  yeastHarvest: number;
  oxygenExclusion: number;
  versatility: number;
  fvCost: number;
  pressureRated: boolean;
  forLager: boolean;
  vesselConfig: string;
  bestUse: string;
}

const DATA: Record<FermentationVesselType, FermentationVesselData> = {
  open_top: {
    tempControl: 5, yeastHarvest: 8, oxygenExclusion: 3, versatility: 5, fvCost: 4,
    pressureRated: false, forLager: false,
    vesselConfig: "open_top_fermentation_vessel_traditional_ale_top_crop_yeast_skim",
    bestUse: "traditional_ale_brewery_open_top_fermenter_top_cropping_yeast",
  },
  cylindroconical: {
    tempControl: 9, yeastHarvest: 10, oxygenExclusion: 9, versatility: 9, fvCost: 7,
    pressureRated: true, forLager: true,
    vesselConfig: "cylindroconical_tank_jacketed_glycol_cone_yeast_harvest_cip_clean",
    bestUse: "modern_brewery_cylindroconical_tank_ale_lager_yeast_harvest_cip",
  },
  unitank: {
    tempControl: 10, yeastHarvest: 9, oxygenExclusion: 10, versatility: 10, fvCost: 8,
    pressureRated: true, forLager: true,
    vesselConfig: "unitank_ferment_condition_carbonate_single_vessel_pressure_rated",
    bestUse: "efficient_brewery_unitank_ferment_condition_serve_single_vessel",
  },
  horizontal_lager: {
    tempControl: 8, yeastHarvest: 7, oxygenExclusion: 8, versatility: 5, fvCost: 6,
    pressureRated: true, forLager: true,
    vesselConfig: "horizontal_lager_tank_low_hydrostatic_pressure_gentle_condition",
    bestUse: "traditional_lager_brewery_horizontal_tank_gentle_low_pressure_age",
  },
  coolship: {
    tempControl: 2, yeastHarvest: 2, oxygenExclusion: 1, versatility: 3, fvCost: 3,
    pressureRated: false, forLager: false,
    vesselConfig: "coolship_koelschip_shallow_open_tray_wild_yeast_spontaneous_cool",
    bestUse: "lambic_wild_ale_brewery_coolship_spontaneous_fermentation_ambient",
  },
};

function get(t: FermentationVesselType): FermentationVesselData {
  return DATA[t];
}

export const tempControl = (t: FermentationVesselType) => get(t).tempControl;
export const yeastHarvest = (t: FermentationVesselType) => get(t).yeastHarvest;
export const oxygenExclusion = (t: FermentationVesselType) => get(t).oxygenExclusion;
export const versatility = (t: FermentationVesselType) => get(t).versatility;
export const fvCost = (t: FermentationVesselType) => get(t).fvCost;
export const pressureRated = (t: FermentationVesselType) => get(t).pressureRated;
export const forLager = (t: FermentationVesselType) => get(t).forLager;
export const vesselConfig = (t: FermentationVesselType) => get(t).vesselConfig;
export const bestUse = (t: FermentationVesselType) => get(t).bestUse;
export const fermentationVesselTypes = (): FermentationVesselType[] =>
  Object.keys(DATA) as FermentationVesselType[];
