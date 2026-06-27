export type TransmissionLine =
  | "microstrip_surface"
  | "stripline_buried"
  | "coplanar_waveguide"
  | "coaxial_cable"
  | "differential_pair_edge";

const DATA: Record<TransmissionLine, {
  bandwidth: number; loss: number; shielding: number;
  dispersion: number; tlCost: number; planar: boolean;
  forMmwave: boolean; geometry: string; bestUse: string;
}> = {
  microstrip_surface: {
    bandwidth: 7, loss: 6, shielding: 3,
    dispersion: 5, tlCost: 2, planar: true,
    forMmwave: false, geometry: "trace_over_ground_plane",
    bestUse: "pcb_rf_general_route",
  },
  stripline_buried: {
    bandwidth: 8, loss: 7, shielding: 9,
    dispersion: 7, tlCost: 4, planar: true,
    forMmwave: false, geometry: "trace_between_ground_pair",
    bestUse: "multilayer_controlled_z",
  },
  coplanar_waveguide: {
    bandwidth: 10, loss: 7, shielding: 6,
    dispersion: 9, tlCost: 3, planar: true,
    forMmwave: true, geometry: "center_strip_coplanar_gap",
    bestUse: "mmic_on_chip_interconnect",
  },
  coaxial_cable: {
    bandwidth: 9, loss: 8, shielding: 10,
    dispersion: 8, tlCost: 5, planar: false,
    forMmwave: false, geometry: "center_conductor_dielectric",
    bestUse: "instrument_to_antenna_feed",
  },
  differential_pair_edge: {
    bandwidth: 8, loss: 6, shielding: 5,
    dispersion: 7, tlCost: 3, planar: true,
    forMmwave: false, geometry: "coupled_edge_traces",
    bestUse: "high_speed_serial_link",
  },
};

const get = (t: TransmissionLine) => DATA[t];

export const bandwidth = (t: TransmissionLine) => get(t).bandwidth;
export const loss = (t: TransmissionLine) => get(t).loss;
export const shielding = (t: TransmissionLine) => get(t).shielding;
export const dispersion = (t: TransmissionLine) => get(t).dispersion;
export const tlCost = (t: TransmissionLine) => get(t).tlCost;
export const planar = (t: TransmissionLine) => get(t).planar;
export const forMmwave = (t: TransmissionLine) => get(t).forMmwave;
export const geometry = (t: TransmissionLine) => get(t).geometry;
export const bestUse = (t: TransmissionLine) => get(t).bestUse;
export const transmissionLines = (): TransmissionLine[] => Object.keys(DATA) as TransmissionLine[];
