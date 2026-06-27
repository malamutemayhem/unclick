export type WaferProbe =
  | "cantilever_epoxy"
  | "vertical_mems"
  | "cobra_buckling"
  | "membrane_film"
  | "rf_coaxial_probe";

const DATA: Record<WaferProbe, {
  contactForce: number; pitch: number; lifetime: number;
  frequency: number; probeCost: number; finePitch: boolean;
  forRf: boolean; mechanism: string; bestUse: string;
}> = {
  cantilever_epoxy: {
    contactForce: 6, pitch: 5, lifetime: 7,
    frequency: 5, probeCost: 3, finePitch: false,
    forRf: false, mechanism: "bent_wire_needle",
    bestUse: "general_logic_sort",
  },
  vertical_mems: {
    contactForce: 8, pitch: 9, lifetime: 8,
    frequency: 7, probeCost: 8, finePitch: true,
    forRf: false, mechanism: "etched_si_spring",
    bestUse: "advanced_node_hvm",
  },
  cobra_buckling: {
    contactForce: 7, pitch: 7, lifetime: 6,
    frequency: 6, probeCost: 5, finePitch: true,
    forRf: false, mechanism: "buckling_beam_array",
    bestUse: "memory_mass_probe",
  },
  membrane_film: {
    contactForce: 5, pitch: 8, lifetime: 5,
    frequency: 6, probeCost: 6, finePitch: true,
    forRf: false, mechanism: "patterned_flex_film",
    bestUse: "3d_stacked_die_test",
  },
  rf_coaxial_probe: {
    contactForce: 6, pitch: 4, lifetime: 8,
    frequency: 10, probeCost: 9, finePitch: false,
    forRf: true, mechanism: "coplanar_gsg_tip",
    bestUse: "mmwave_5g_char",
  },
};

const get = (t: WaferProbe) => DATA[t];

export const contactForce = (t: WaferProbe) => get(t).contactForce;
export const pitch = (t: WaferProbe) => get(t).pitch;
export const lifetime = (t: WaferProbe) => get(t).lifetime;
export const frequency = (t: WaferProbe) => get(t).frequency;
export const probeCost = (t: WaferProbe) => get(t).probeCost;
export const finePitch = (t: WaferProbe) => get(t).finePitch;
export const forRf = (t: WaferProbe) => get(t).forRf;
export const mechanism = (t: WaferProbe) => get(t).mechanism;
export const bestUse = (t: WaferProbe) => get(t).bestUse;
export const waferProbes = (): WaferProbe[] => Object.keys(DATA) as WaferProbe[];
