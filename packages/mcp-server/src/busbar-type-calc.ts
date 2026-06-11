export type BusbarType =
  | "copper_flat_bar"
  | "aluminum_tubular"
  | "laminated_sandwich"
  | "flexible_braided_strap"
  | "insulated_enclosed_bus";

const DATA: Record<BusbarType, {
  current: number; voltage: number; thermal: number;
  flexibility: number; bbCost: number; insulated: boolean;
  forDataCenter: boolean; material: string; bestUse: string;
}> = {
  copper_flat_bar: {
    current: 9, voltage: 8, thermal: 8,
    flexibility: 3, bbCost: 3, insulated: false,
    forDataCenter: false, material: "electrolytic_tough_pitch_cu",
    bestUse: "switchgear_main_bus_heavy",
  },
  aluminum_tubular: {
    current: 8, voltage: 10, thermal: 7,
    flexibility: 2, bbCost: 2, insulated: false,
    forDataCenter: false, material: "6101_t6_aluminum_alloy",
    bestUse: "outdoor_substation_hv_bus",
  },
  laminated_sandwich: {
    current: 7, voltage: 6, thermal: 9,
    flexibility: 5, bbCost: 4, insulated: true,
    forDataCenter: true, material: "copper_epoxy_laminate_stack",
    bestUse: "inverter_dc_link_low_inductance",
  },
  flexible_braided_strap: {
    current: 5, voltage: 4, thermal: 6,
    flexibility: 10, bbCost: 2, insulated: false,
    forDataCenter: false, material: "tinned_copper_braid_rope",
    bestUse: "transformer_tap_vibration_joint",
  },
  insulated_enclosed_bus: {
    current: 10, voltage: 7, thermal: 8,
    flexibility: 4, bbCost: 5, insulated: true,
    forDataCenter: true, material: "copper_epoxy_resin_enclosed",
    bestUse: "data_center_pdu_riser_run",
  },
};

const get = (t: BusbarType) => DATA[t];

export const current = (t: BusbarType) => get(t).current;
export const voltage = (t: BusbarType) => get(t).voltage;
export const thermal = (t: BusbarType) => get(t).thermal;
export const flexibility = (t: BusbarType) => get(t).flexibility;
export const bbCost = (t: BusbarType) => get(t).bbCost;
export const insulated = (t: BusbarType) => get(t).insulated;
export const forDataCenter = (t: BusbarType) => get(t).forDataCenter;
export const material = (t: BusbarType) => get(t).material;
export const bestUse = (t: BusbarType) => get(t).bestUse;
export const busbarTypes = (): BusbarType[] => Object.keys(DATA) as BusbarType[];
