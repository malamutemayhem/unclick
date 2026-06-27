export type MechanicalSealType =
  | "single_unbalanced_pusher"
  | "double_pressurized_tandem"
  | "cartridge_preassembled"
  | "gas_seal_dry_running"
  | "split_seal_retrofit";

interface MechanicalSealData {
  reliability: number;
  pressure: number;
  speed: number;
  temperature: number;
  msCost: number;
  apiPlan: boolean;
  forHazardous: boolean;
  face: string;
  bestUse: string;
}

const DATA: Record<MechanicalSealType, MechanicalSealData> = {
  single_unbalanced_pusher: {
    reliability: 7, pressure: 6, speed: 7, temperature: 7, msCost: 4,
    apiPlan: true, forHazardous: false,
    face: "carbon_silicon_carbide_spring",
    bestUse: "water_pump_light_duty_general",
  },
  double_pressurized_tandem: {
    reliability: 10, pressure: 9, speed: 8, temperature: 9, msCost: 8,
    apiPlan: true, forHazardous: true,
    face: "tungsten_carbide_dual_face_pair",
    bestUse: "toxic_flammable_zero_emission",
  },
  cartridge_preassembled: {
    reliability: 9, pressure: 8, speed: 8, temperature: 8, msCost: 7,
    apiPlan: true, forHazardous: false,
    face: "sic_sic_cartridge_unitized",
    bestUse: "refinery_chemical_easy_install",
  },
  gas_seal_dry_running: {
    reliability: 9, pressure: 10, speed: 10, temperature: 8, msCost: 10,
    apiPlan: true, forHazardous: true,
    face: "spiral_groove_non_contacting",
    bestUse: "compressor_turbine_high_speed_gas",
  },
  split_seal_retrofit: {
    reliability: 7, pressure: 6, speed: 6, temperature: 7, msCost: 6,
    apiPlan: false, forHazardous: false,
    face: "split_carbon_stainless_gland",
    bestUse: "retrofit_no_disassemble_agitator",
  },
};

function get(t: MechanicalSealType): MechanicalSealData {
  return DATA[t];
}

export const reliability = (t: MechanicalSealType) => get(t).reliability;
export const pressure = (t: MechanicalSealType) => get(t).pressure;
export const speed = (t: MechanicalSealType) => get(t).speed;
export const temperature = (t: MechanicalSealType) => get(t).temperature;
export const msCost = (t: MechanicalSealType) => get(t).msCost;
export const apiPlan = (t: MechanicalSealType) => get(t).apiPlan;
export const forHazardous = (t: MechanicalSealType) => get(t).forHazardous;
export const face = (t: MechanicalSealType) => get(t).face;
export const bestUse = (t: MechanicalSealType) => get(t).bestUse;
export const mechanicalSealTypes = (): MechanicalSealType[] =>
  Object.keys(DATA) as MechanicalSealType[];
