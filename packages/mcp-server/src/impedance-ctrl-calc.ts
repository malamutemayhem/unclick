export type ImpedanceCtrlType =
  | "microstrip_outer"
  | "stripline_inner"
  | "coplanar_waveguide"
  | "differential_pair"
  | "embedded_microstrip";

const DATA: Record<ImpedanceCtrlType, {
  accuracy: number; bandwidth: number; isolation: number;
  routingEase: number; ctrlCost: number; shielded: boolean;
  forDifferential: boolean; geometry: string; bestUse: string;
}> = {
  microstrip_outer: { accuracy: 7, bandwidth: 7, isolation: 4, routingEase: 9, ctrlCost: 3, shielded: false, forDifferential: false, geometry: "trace_over_ground", bestUse: "standard_single_ended_route" },
  stripline_inner: { accuracy: 9, bandwidth: 8, isolation: 9, routingEase: 5, ctrlCost: 6, shielded: true, forDifferential: false, geometry: "trace_between_planes", bestUse: "high_isolation_inner_signal" },
  coplanar_waveguide: { accuracy: 8, bandwidth: 10, isolation: 7, routingEase: 6, ctrlCost: 5, shielded: false, forDifferential: false, geometry: "trace_with_coplanar_ground", bestUse: "rf_microwave_transition" },
  differential_pair: { accuracy: 8, bandwidth: 9, isolation: 8, routingEase: 4, ctrlCost: 7, shielded: false, forDifferential: true, geometry: "coupled_trace_pair", bestUse: "high_speed_serial_link" },
  embedded_microstrip: { accuracy: 8, bandwidth: 7, isolation: 6, routingEase: 7, ctrlCost: 4, shielded: false, forDifferential: false, geometry: "buried_trace_dielectric", bestUse: "protected_outer_layer_route" },
};

const get = (t: ImpedanceCtrlType) => DATA[t];

export const accuracy = (t: ImpedanceCtrlType) => get(t).accuracy;
export const bandwidth = (t: ImpedanceCtrlType) => get(t).bandwidth;
export const isolation = (t: ImpedanceCtrlType) => get(t).isolation;
export const routingEase = (t: ImpedanceCtrlType) => get(t).routingEase;
export const ctrlCost = (t: ImpedanceCtrlType) => get(t).ctrlCost;
export const shielded = (t: ImpedanceCtrlType) => get(t).shielded;
export const forDifferential = (t: ImpedanceCtrlType) => get(t).forDifferential;
export const geometry = (t: ImpedanceCtrlType) => get(t).geometry;
export const bestUse = (t: ImpedanceCtrlType) => get(t).bestUse;
export const impedanceCtrls = (): ImpedanceCtrlType[] => Object.keys(DATA) as ImpedanceCtrlType[];
