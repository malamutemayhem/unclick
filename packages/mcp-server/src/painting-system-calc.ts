export type PaintingSystemType =
  | "airless_spray"
  | "air_atomized_hvlp"
  | "electrostatic_bell"
  | "powder_coat_gun"
  | "dip_coat_e_coat";

interface PaintingSystemData {
  transferEfficiency: number;
  finishQuality: number;
  speed: number;
  materialWaste: number;
  psCost: number;
  electrostatic: boolean;
  forAutomotive: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<PaintingSystemType, PaintingSystemData> = {
  airless_spray: {
    transferEfficiency: 5, finishQuality: 6, speed: 9, materialWaste: 6, psCost: 4,
    electrostatic: false, forAutomotive: false,
    method: "high_pressure_pump_tip_atomization_no_air_thick_coat",
    bestUse: "structural_steel_ship_hull_bridge_heavy_coating",
  },
  air_atomized_hvlp: {
    transferEfficiency: 7, finishQuality: 8, speed: 7, materialWaste: 4, psCost: 5,
    electrostatic: false, forAutomotive: true,
    method: "low_pressure_high_volume_air_fine_atomization_spray",
    bestUse: "furniture_refinish_small_part_detail_spray_booth",
  },
  electrostatic_bell: {
    transferEfficiency: 9, finishQuality: 10, speed: 8, materialWaste: 2, psCost: 9,
    electrostatic: true, forAutomotive: true,
    method: "rotating_bell_cup_high_voltage_charge_wrap_around",
    bestUse: "automotive_body_appliance_panel_high_volume_paint",
  },
  powder_coat_gun: {
    transferEfficiency: 8, finishQuality: 7, speed: 6, materialWaste: 1, psCost: 6,
    electrostatic: true, forAutomotive: false,
    method: "corona_or_tribo_charge_dry_powder_oven_cure_fuse",
    bestUse: "metal_furniture_fence_panel_wheel_rim_durable_coat",
  },
  dip_coat_e_coat: {
    transferEfficiency: 10, finishQuality: 7, speed: 5, materialWaste: 1, psCost: 8,
    electrostatic: true, forAutomotive: true,
    method: "full_immersion_electrodeposition_uniform_primer",
    bestUse: "automotive_primer_fastener_small_complex_part_batch",
  },
};

function get(t: PaintingSystemType): PaintingSystemData {
  return DATA[t];
}

export const transferEfficiency = (t: PaintingSystemType) => get(t).transferEfficiency;
export const finishQuality = (t: PaintingSystemType) => get(t).finishQuality;
export const speed = (t: PaintingSystemType) => get(t).speed;
export const materialWaste = (t: PaintingSystemType) => get(t).materialWaste;
export const psCost = (t: PaintingSystemType) => get(t).psCost;
export const electrostatic = (t: PaintingSystemType) => get(t).electrostatic;
export const forAutomotive = (t: PaintingSystemType) => get(t).forAutomotive;
export const method = (t: PaintingSystemType) => get(t).method;
export const bestUse = (t: PaintingSystemType) => get(t).bestUse;
export const paintingSystemTypes = (): PaintingSystemType[] =>
  Object.keys(DATA) as PaintingSystemType[];
