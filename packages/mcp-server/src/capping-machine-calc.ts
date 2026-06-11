export type CappingMachineType =
  | "screw_cap_chuck"
  | "snap_cap_press"
  | "crimp_cap_aluminum"
  | "ropp_roll_on_pilfer"
  | "crown_cap_beverage";

interface CappingMachineData {
  speed: number;
  torqueControl: number;
  versatility: number;
  reliability: number;
  cmCost: number;
  tamperEvident: boolean;
  forBeverage: boolean;
  closure: string;
  bestUse: string;
}

const DATA: Record<CappingMachineType, CappingMachineData> = {
  screw_cap_chuck: {
    speed: 9, torqueControl: 10, versatility: 9, reliability: 9, cmCost: 7,
    tamperEvident: false, forBeverage: true,
    closure: "plastic_metal_screw_thread",
    bestUse: "bottle_jar_tube_screw_closure",
  },
  snap_cap_press: {
    speed: 10, torqueControl: 5, versatility: 6, reliability: 9, cmCost: 4,
    tamperEvident: false, forBeverage: false,
    closure: "snap_on_press_fit_lid",
    bestUse: "container_pail_tub_snap_lid",
  },
  crimp_cap_aluminum: {
    speed: 8, torqueControl: 7, versatility: 5, reliability: 8, cmCost: 6,
    tamperEvident: true, forBeverage: false,
    closure: "aluminum_crimp_seal_vial",
    bestUse: "pharma_vial_injectable_crimp",
  },
  ropp_roll_on_pilfer: {
    speed: 9, torqueControl: 8, versatility: 7, reliability: 9, cmCost: 8,
    tamperEvident: true, forBeverage: true,
    closure: "aluminum_shell_rolled_thread",
    bestUse: "wine_spirit_olive_oil_ropp",
  },
  crown_cap_beverage: {
    speed: 10, torqueControl: 6, versatility: 3, reliability: 10, cmCost: 5,
    tamperEvident: true, forBeverage: true,
    closure: "steel_crown_pry_off_cap",
    bestUse: "beer_soda_glass_bottle_crown",
  },
};

function get(t: CappingMachineType): CappingMachineData {
  return DATA[t];
}

export const speed = (t: CappingMachineType) => get(t).speed;
export const torqueControl = (t: CappingMachineType) => get(t).torqueControl;
export const versatility = (t: CappingMachineType) => get(t).versatility;
export const reliability = (t: CappingMachineType) => get(t).reliability;
export const cmCost = (t: CappingMachineType) => get(t).cmCost;
export const tamperEvident = (t: CappingMachineType) => get(t).tamperEvident;
export const forBeverage = (t: CappingMachineType) => get(t).forBeverage;
export const closure = (t: CappingMachineType) => get(t).closure;
export const bestUse = (t: CappingMachineType) => get(t).bestUse;
export const cappingMachineTypes = (): CappingMachineType[] =>
  Object.keys(DATA) as CappingMachineType[];
