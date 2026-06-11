export type CocoaPressType =
  | "hydraulic_vertical"
  | "horizontal_cage"
  | "screw_expeller"
  | "cold_press"
  | "supercritical_co2";

interface CocoaPressData {
  fatExtraction: number;
  cakeQuality: number;
  throughput: number;
  butterPurity: number;
  cpCost: number;
  continuous: boolean;
  forPremium: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<CocoaPressType, CocoaPressData> = {
  hydraulic_vertical: {
    fatExtraction: 9, cakeQuality: 8, throughput: 7, butterPurity: 9, cpCost: 7,
    continuous: false, forPremium: true,
    pressConfig: "hydraulic_vertical_cocoa_press_pot_piston_high_pressure_butter_cake",
    bestUse: "standard_cocoa_factory_hydraulic_press_cocoa_butter_cake_powder",
  },
  horizontal_cage: {
    fatExtraction: 8, cakeQuality: 7, throughput: 9, butterPurity: 8, cpCost: 6,
    continuous: true, forPremium: false,
    pressConfig: "horizontal_cage_cocoa_press_continuous_screw_cage_filter_butter",
    bestUse: "large_cocoa_processor_horizontal_cage_press_continuous_butter_flow",
  },
  screw_expeller: {
    fatExtraction: 7, cakeQuality: 6, throughput: 10, butterPurity: 6, cpCost: 5,
    continuous: true, forPremium: false,
    pressConfig: "screw_expeller_cocoa_press_auger_barrel_high_volume_bulk_extract",
    bestUse: "bulk_cocoa_processing_screw_expeller_high_volume_lower_purity",
  },
  cold_press: {
    fatExtraction: 6, cakeQuality: 10, throughput: 4, butterPurity: 10, cpCost: 8,
    continuous: false, forPremium: true,
    pressConfig: "cold_press_cocoa_low_temp_hydraulic_preserve_flavor_antioxidant",
    bestUse: "premium_raw_cocoa_cold_press_low_temp_preserve_flavor_nutrient",
  },
  supercritical_co2: {
    fatExtraction: 10, cakeQuality: 9, throughput: 5, butterPurity: 10, cpCost: 10,
    continuous: false, forPremium: true,
    pressConfig: "supercritical_co2_cocoa_extract_high_pressure_carbon_dioxide_pure",
    bestUse: "specialty_cocoa_supercritical_co2_extract_ultra_pure_butter_solvent_free",
  },
};

function get(t: CocoaPressType): CocoaPressData {
  return DATA[t];
}

export const fatExtraction = (t: CocoaPressType) => get(t).fatExtraction;
export const cakeQuality = (t: CocoaPressType) => get(t).cakeQuality;
export const throughput = (t: CocoaPressType) => get(t).throughput;
export const butterPurity = (t: CocoaPressType) => get(t).butterPurity;
export const cpCost = (t: CocoaPressType) => get(t).cpCost;
export const continuous = (t: CocoaPressType) => get(t).continuous;
export const forPremium = (t: CocoaPressType) => get(t).forPremium;
export const pressConfig = (t: CocoaPressType) => get(t).pressConfig;
export const bestUse = (t: CocoaPressType) => get(t).bestUse;
export const cocoaPressTypes = (): CocoaPressType[] =>
  Object.keys(DATA) as CocoaPressType[];
