export type CryoSwitch =
  | "mems_latching_cryo"
  | "semiconductor_gan_hemt"
  | "superconducting_squid"
  | "ferrite_circulator"
  | "photonic_mzi_cryo";

const DATA: Record<CryoSwitch, {
  insertionLoss: number; isolation: number; speed: number;
  powerDissipation: number; csCost: number; latching: boolean;
  forQubit: boolean; mechanism: string; bestUse: string;
}> = {
  mems_latching_cryo: {
    insertionLoss: 9, isolation: 9, speed: 5,
    powerDissipation: 10, csCost: 4, latching: true,
    forQubit: true, mechanism: "electrostatic_cantilever_latch",
    bestUse: "qubit_mux_signal_route",
  },
  semiconductor_gan_hemt: {
    insertionLoss: 6, isolation: 7, speed: 9,
    powerDissipation: 5, csCost: 2, latching: false,
    forQubit: false, mechanism: "field_effect_channel_pinch",
    bestUse: "cryogenic_amplifier_bypass",
  },
  superconducting_squid: {
    insertionLoss: 10, isolation: 8, speed: 8,
    powerDissipation: 9, csCost: 5, latching: true,
    forQubit: true, mechanism: "josephson_junction_flux",
    bestUse: "quantum_router_coherent_path",
  },
  ferrite_circulator: {
    insertionLoss: 7, isolation: 10, speed: 10,
    powerDissipation: 8, csCost: 3, latching: false,
    forQubit: true, mechanism: "magnetic_ferrite_nonreciprocal",
    bestUse: "readout_chain_isolator_stage",
  },
  photonic_mzi_cryo: {
    insertionLoss: 8, isolation: 8, speed: 10,
    powerDissipation: 7, csCost: 4, latching: false,
    forQubit: false, mechanism: "interferometric_phase_shift",
    bestUse: "optical_interconnect_cryo_link",
  },
};

const get = (t: CryoSwitch) => DATA[t];

export const insertionLoss = (t: CryoSwitch) => get(t).insertionLoss;
export const isolation = (t: CryoSwitch) => get(t).isolation;
export const speed = (t: CryoSwitch) => get(t).speed;
export const powerDissipation = (t: CryoSwitch) => get(t).powerDissipation;
export const csCost = (t: CryoSwitch) => get(t).csCost;
export const latching = (t: CryoSwitch) => get(t).latching;
export const forQubit = (t: CryoSwitch) => get(t).forQubit;
export const mechanism = (t: CryoSwitch) => get(t).mechanism;
export const bestUse = (t: CryoSwitch) => get(t).bestUse;
export const cryoSwitches = (): CryoSwitch[] => Object.keys(DATA) as CryoSwitch[];
