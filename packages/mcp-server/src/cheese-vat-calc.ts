export type CheeseVatType =
  | "open_rectangular"
  | "enclosed_horizontal"
  | "double_o"
  | "vertical_dutch"
  | "cottage_cheese";

interface CheeseVatData {
  curdUniformity: number;
  heatingControl: number;
  capacity: number;
  automation: number;
  cvCost: number;
  enclosed: boolean;
  forHard: boolean;
  vatConfig: string;
  bestUse: string;
}

const DATA: Record<CheeseVatType, CheeseVatData> = {
  open_rectangular: {
    curdUniformity: 6, heatingControl: 6, capacity: 7, automation: 4, cvCost: 4,
    enclosed: false, forHard: true,
    vatConfig: "open_rectangular_cheese_vat_jacketed_agitator_manual_curd_cut_drain",
    bestUse: "artisan_creamery_open_rectangular_vat_traditional_cheddar_gouda",
  },
  enclosed_horizontal: {
    curdUniformity: 9, heatingControl: 9, capacity: 9, automation: 9, cvCost: 8,
    enclosed: true, forHard: true,
    vatConfig: "enclosed_horizontal_cheese_vat_cip_agitator_curd_knife_drain_belt",
    bestUse: "large_cheese_plant_enclosed_horizontal_vat_automated_cip_cheddar",
  },
  double_o: {
    curdUniformity: 10, heatingControl: 10, capacity: 10, automation: 10, cvCost: 10,
    enclosed: true, forHard: true,
    vatConfig: "double_o_cheese_vat_twin_cylinder_continuous_curd_make_drain_belt",
    bestUse: "mega_cheese_factory_double_o_vat_continuous_production_high_volume",
  },
  vertical_dutch: {
    curdUniformity: 8, heatingControl: 8, capacity: 6, automation: 7, cvCost: 6,
    enclosed: true, forHard: true,
    vatConfig: "vertical_dutch_cheese_vat_column_gravity_drain_gouda_edam_style",
    bestUse: "dutch_style_cheese_vertical_vat_gravity_drain_gouda_edam_making",
  },
  cottage_cheese: {
    curdUniformity: 7, heatingControl: 7, capacity: 8, automation: 6, cvCost: 5,
    enclosed: false, forHard: false,
    vatConfig: "cottage_cheese_vat_gentle_agitator_slow_heat_large_curd_preserve",
    bestUse: "cottage_cheese_production_gentle_vat_large_curd_cream_dress_pack",
  },
};

function get(t: CheeseVatType): CheeseVatData {
  return DATA[t];
}

export const curdUniformity = (t: CheeseVatType) => get(t).curdUniformity;
export const heatingControl = (t: CheeseVatType) => get(t).heatingControl;
export const capacity = (t: CheeseVatType) => get(t).capacity;
export const automation = (t: CheeseVatType) => get(t).automation;
export const cvCost = (t: CheeseVatType) => get(t).cvCost;
export const enclosed = (t: CheeseVatType) => get(t).enclosed;
export const forHard = (t: CheeseVatType) => get(t).forHard;
export const vatConfig = (t: CheeseVatType) => get(t).vatConfig;
export const bestUse = (t: CheeseVatType) => get(t).bestUse;
export const cheeseVatTypes = (): CheeseVatType[] =>
  Object.keys(DATA) as CheeseVatType[];
