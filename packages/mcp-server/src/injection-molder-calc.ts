export type InjectionMolderType =
  | "hydraulic_toggle"
  | "hydraulic_direct"
  | "electric_servo"
  | "hybrid_servo"
  | "two_platen";

interface InjectionMolderData {
  shotPrecision: number;
  clampForce: number;
  cycleSpeed: number;
  energyEfficiency: number;
  imCost: number;
  electric: boolean;
  forMedical: boolean;
  molderConfig: string;
  bestUse: string;
}

const DATA: Record<InjectionMolderType, InjectionMolderData> = {
  hydraulic_toggle: {
    shotPrecision: 7, clampForce: 9, cycleSpeed: 8, energyEfficiency: 5, imCost: 6,
    electric: false, forMedical: false,
    molderConfig: "hydraulic_toggle_injection_molder_link_clamp_oil_drive_standard",
    bestUse: "general_plastics_hydraulic_toggle_molder_commodity_part_standard",
  },
  hydraulic_direct: {
    shotPrecision: 7, clampForce: 10, cycleSpeed: 7, energyEfficiency: 5, imCost: 7,
    electric: false, forMedical: false,
    molderConfig: "hydraulic_direct_injection_molder_ram_clamp_high_force_large",
    bestUse: "large_part_hydraulic_direct_clamp_molder_automotive_bumper_panel",
  },
  electric_servo: {
    shotPrecision: 10, clampForce: 7, cycleSpeed: 10, energyEfficiency: 10, imCost: 9,
    electric: true, forMedical: true,
    molderConfig: "electric_servo_injection_molder_ball_screw_motor_precise_clean",
    bestUse: "medical_device_electric_servo_molder_cleanroom_precise_repeatable",
  },
  hybrid_servo: {
    shotPrecision: 9, clampForce: 9, cycleSpeed: 9, energyEfficiency: 8, imCost: 8,
    electric: false, forMedical: true,
    molderConfig: "hybrid_servo_injection_molder_electric_inject_hydraulic_clamp",
    bestUse: "precision_plastics_hybrid_servo_molder_fast_precise_moderate_cost",
  },
  two_platen: {
    shotPrecision: 8, clampForce: 10, cycleSpeed: 8, energyEfficiency: 7, imCost: 10,
    electric: false, forMedical: false,
    molderConfig: "two_platen_injection_molder_compact_footprint_large_mold_space",
    bestUse: "large_mold_two_platen_molder_compact_footprint_automotive_crate",
  },
};

function get(t: InjectionMolderType): InjectionMolderData {
  return DATA[t];
}

export const shotPrecision = (t: InjectionMolderType) => get(t).shotPrecision;
export const clampForce = (t: InjectionMolderType) => get(t).clampForce;
export const cycleSpeed = (t: InjectionMolderType) => get(t).cycleSpeed;
export const energyEfficiency = (t: InjectionMolderType) => get(t).energyEfficiency;
export const imCost = (t: InjectionMolderType) => get(t).imCost;
export const electric = (t: InjectionMolderType) => get(t).electric;
export const forMedical = (t: InjectionMolderType) => get(t).forMedical;
export const molderConfig = (t: InjectionMolderType) => get(t).molderConfig;
export const bestUse = (t: InjectionMolderType) => get(t).bestUse;
export const injectionMolderTypes = (): InjectionMolderType[] =>
  Object.keys(DATA) as InjectionMolderType[];
