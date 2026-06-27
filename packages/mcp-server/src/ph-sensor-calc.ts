export type PhSensor =
  | "glass_electrode"
  | "isfet_solid_state"
  | "antimony_metal"
  | "optical_fluorescent"
  | "differential_pair_ref";

const DATA: Record<PhSensor, {
  accuracy: number; responseTime: number; durability: number;
  tempRange: number; phCost: number; maintenance: boolean;
  forInline: boolean; principle: string; bestUse: string;
}> = {
  glass_electrode: {
    accuracy: 9, responseTime: 7, durability: 5,
    tempRange: 8, phCost: 3, maintenance: true,
    forInline: true, principle: "nernst_ion_exchange",
    bestUse: "lab_titration_standard",
  },
  isfet_solid_state: {
    accuracy: 7, responseTime: 9, durability: 9,
    tempRange: 6, phCost: 5, maintenance: false,
    forInline: true, principle: "gate_surface_potential",
    bestUse: "food_beverage_cip",
  },
  antimony_metal: {
    accuracy: 5, responseTime: 8, durability: 8,
    tempRange: 5, phCost: 2, maintenance: false,
    forInline: false, principle: "oxide_redox_potential",
    bestUse: "concrete_soil_field",
  },
  optical_fluorescent: {
    accuracy: 8, responseTime: 6, durability: 7,
    tempRange: 7, phCost: 7, maintenance: false,
    forInline: true, principle: "indicator_dye_emission",
    bestUse: "bioprocess_sterile_inline",
  },
  differential_pair_ref: {
    accuracy: 10, responseTime: 7, durability: 6,
    tempRange: 9, phCost: 6, maintenance: true,
    forInline: false, principle: "double_junction_matched",
    bestUse: "pharma_validation_audit",
  },
};

const get = (t: PhSensor) => DATA[t];

export const accuracy = (t: PhSensor) => get(t).accuracy;
export const responseTime = (t: PhSensor) => get(t).responseTime;
export const durability = (t: PhSensor) => get(t).durability;
export const tempRange = (t: PhSensor) => get(t).tempRange;
export const phCost = (t: PhSensor) => get(t).phCost;
export const maintenance = (t: PhSensor) => get(t).maintenance;
export const forInline = (t: PhSensor) => get(t).forInline;
export const principle = (t: PhSensor) => get(t).principle;
export const bestUse = (t: PhSensor) => get(t).bestUse;
export const phSensors = (): PhSensor[] => Object.keys(DATA) as PhSensor[];
