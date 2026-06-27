// piezo-sensor-calc - piezoelectric sensor types

export type PiezoSensor =
  | "disc_element_basic"
  | "film_strip_flexible"
  | "stack_actuator_force"
  | "bimorph_bender_disp"
  | "rope_sensor_inline";

const DATA: Record<PiezoSensor, {
  sensitivity: number; frequencyRange: number; flexibility: number; durability: number;
  cost: number; selfPowered: boolean; forVibration: boolean; elementType: string; bestUse: string;
}> = {
  disc_element_basic:     { sensitivity: 6, frequencyRange: 7, flexibility: 3, durability: 7, cost: 1, selfPowered: true, forVibration: true, elementType: "pzt_ceramic_disc", bestUse: "knock_tap_detect" },
  film_strip_flexible:    { sensitivity: 8, frequencyRange: 8, flexibility: 10, durability: 6, cost: 4, selfPowered: true, forVibration: true, elementType: "pvdf_polymer_film", bestUse: "flexible_pressure_sense" },
  stack_actuator_force:   { sensitivity: 5, frequencyRange: 6, flexibility: 2, durability: 9, cost: 8, selfPowered: false, forVibration: false, elementType: "multilayer_pzt_stack", bestUse: "precision_force_apply" },
  bimorph_bender_disp:    { sensitivity: 9, frequencyRange: 5, flexibility: 7, durability: 6, cost: 5, selfPowered: true, forVibration: false, elementType: "dual_layer_bender", bestUse: "displacement_measure" },
  rope_sensor_inline:     { sensitivity: 7, frequencyRange: 9, flexibility: 8, durability: 8, cost: 6, selfPowered: true, forVibration: true, elementType: "coaxial_piezo_cable", bestUse: "perimeter_vibration" },
};

const get = (p: PiezoSensor) => DATA[p];
export const sensitivity = (p: PiezoSensor) => get(p).sensitivity;
export const frequencyRange = (p: PiezoSensor) => get(p).frequencyRange;
export const flexibility = (p: PiezoSensor) => get(p).flexibility;
export const durability = (p: PiezoSensor) => get(p).durability;
export const piezoCost = (p: PiezoSensor) => get(p).cost;
export const selfPowered = (p: PiezoSensor) => get(p).selfPowered;
export const forVibration = (p: PiezoSensor) => get(p).forVibration;
export const elementType = (p: PiezoSensor) => get(p).elementType;
export const bestUse = (p: PiezoSensor) => get(p).bestUse;
export const piezoSensors = (): PiezoSensor[] => Object.keys(DATA) as PiezoSensor[];
