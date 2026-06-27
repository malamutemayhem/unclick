export type PressFilterType =
  | "plate_frame_manual"
  | "recessed_plate_membrane"
  | "membrane_squeeze_dewater"
  | "tower_press_automatic"
  | "tube_press_high_press";

interface PressFilterData {
  cakeDryness: number;
  throughput: number;
  automation: number;
  washability: number;
  pfCost: number;
  membraneSqueeze: boolean;
  forSlurry: boolean;
  plate: string;
  bestUse: string;
}

const DATA: Record<PressFilterType, PressFilterData> = {
  plate_frame_manual: {
    cakeDryness: 6, throughput: 4, automation: 2, washability: 7, pfCost: 3,
    membraneSqueeze: false, forSlurry: true,
    plate: "polypropylene_frame_cloth_manual_open",
    bestUse: "small_batch_chemical_lab_pilot_filter",
  },
  recessed_plate_membrane: {
    cakeDryness: 8, throughput: 7, automation: 7, washability: 8, pfCost: 7,
    membraneSqueeze: true, forSlurry: true,
    plate: "recessed_chamber_membrane_inflate_press",
    bestUse: "mining_tailings_wastewater_dewater",
  },
  membrane_squeeze_dewater: {
    cakeDryness: 10, throughput: 8, automation: 8, washability: 9, pfCost: 8,
    membraneSqueeze: true, forSlurry: true,
    plate: "elastomer_membrane_high_press_squeeze",
    bestUse: "pharma_pigment_max_dry_cake_extract",
  },
  tower_press_automatic: {
    cakeDryness: 9, throughput: 10, automation: 10, washability: 6, pfCost: 10,
    membraneSqueeze: true, forSlurry: false,
    plate: "vertical_stack_auto_shift_discharge",
    bestUse: "high_volume_continuous_coal_mineral",
  },
  tube_press_high_press: {
    cakeDryness: 10, throughput: 5, automation: 5, washability: 4, pfCost: 6,
    membraneSqueeze: false, forSlurry: true,
    plate: "porous_tube_hydraulic_radial_press",
    bestUse: "ultra_dry_cake_ceramic_fine_particle",
  },
};

function get(t: PressFilterType): PressFilterData {
  return DATA[t];
}

export const cakeDryness = (t: PressFilterType) => get(t).cakeDryness;
export const throughput = (t: PressFilterType) => get(t).throughput;
export const automation = (t: PressFilterType) => get(t).automation;
export const washability = (t: PressFilterType) => get(t).washability;
export const pfCost = (t: PressFilterType) => get(t).pfCost;
export const membraneSqueeze = (t: PressFilterType) => get(t).membraneSqueeze;
export const forSlurry = (t: PressFilterType) => get(t).forSlurry;
export const plate = (t: PressFilterType) => get(t).plate;
export const bestUse = (t: PressFilterType) => get(t).bestUse;
export const pressFilterTypes = (): PressFilterType[] =>
  Object.keys(DATA) as PressFilterType[];
