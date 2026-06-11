export type FlyPressType =
  | "screw_fly"
  | "friction_fly"
  | "drop_hammer"
  | "counterblow_fly"
  | "electric_screw";

interface FlyPressData {
  energyDelivery: number;
  throughput: number;
  dieLife: number;
  forceControl: number;
  flCost: number;
  programmable: boolean;
  forForging: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<FlyPressType, FlyPressData> = {
  screw_fly: {
    energyDelivery: 8, throughput: 6, dieLife: 7, forceControl: 7, flCost: 5,
    programmable: false, forForging: true,
    pressConfig: "screw_fly_press_flywheel_inertia_spiral_ram_forge_coin_emboss",
    bestUse: "coin_emboss_screw_fly_press_flywheel_inertia_spiral_ram_forge",
  },
  friction_fly: {
    energyDelivery: 9, throughput: 7, dieLife: 7, forceControl: 6, flCost: 6,
    programmable: false, forForging: true,
    pressConfig: "friction_fly_press_disc_drive_flywheel_variable_energy_forge",
    bestUse: "closed_die_friction_fly_press_disc_drive_variable_energy_forge",
  },
  drop_hammer: {
    energyDelivery: 10, throughput: 8, dieLife: 6, forceControl: 5, flCost: 4,
    programmable: false, forForging: true,
    pressConfig: "drop_hammer_fly_press_gravity_board_belt_lift_open_die_forge",
    bestUse: "open_die_drop_hammer_fly_press_gravity_belt_lift_rough_forge",
  },
  counterblow_fly: {
    energyDelivery: 10, throughput: 7, dieLife: 8, forceControl: 7, flCost: 8,
    programmable: false, forForging: true,
    pressConfig: "counterblow_fly_press_dual_ram_oppose_vibration_free_forge",
    bestUse: "precision_forge_counterblow_fly_press_dual_ram_vibration_free",
  },
  electric_screw: {
    energyDelivery: 9, throughput: 8, dieLife: 9, forceControl: 10, flCost: 9,
    programmable: true, forForging: true,
    pressConfig: "electric_screw_fly_press_servo_motor_programmable_energy_forge",
    bestUse: "titanium_forge_electric_screw_fly_press_servo_programmable",
  },
};

function get(t: FlyPressType): FlyPressData {
  return DATA[t];
}

export const energyDelivery = (t: FlyPressType) => get(t).energyDelivery;
export const throughput = (t: FlyPressType) => get(t).throughput;
export const dieLife = (t: FlyPressType) => get(t).dieLife;
export const forceControl = (t: FlyPressType) => get(t).forceControl;
export const flCost = (t: FlyPressType) => get(t).flCost;
export const programmable = (t: FlyPressType) => get(t).programmable;
export const forForging = (t: FlyPressType) => get(t).forForging;
export const pressConfig = (t: FlyPressType) => get(t).pressConfig;
export const bestUse = (t: FlyPressType) => get(t).bestUse;
export const flyPressTypes = (): FlyPressType[] =>
  Object.keys(DATA) as FlyPressType[];
