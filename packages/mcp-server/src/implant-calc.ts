export type Implant =
  | "beamline_medium_current"
  | "high_current_batch"
  | "high_energy_mev"
  | "plasma_doping_plad"
  | "focused_ion_beam_fib";

const DATA: Record<Implant, {
  dosePrecision: number; uniformity: number; throughput: number;
  energyRange: number; imCost: number; conformal: boolean;
  forWell: boolean; species: string; bestUse: string;
}> = {
  beamline_medium_current: {
    dosePrecision: 9, uniformity: 9, throughput: 7,
    energyRange: 7, imCost: 5, conformal: false,
    forWell: false, species: "boron_phosphorus_arsenic",
    bestUse: "threshold_voltage_adjust",
  },
  high_current_batch: {
    dosePrecision: 7, uniformity: 8, throughput: 10,
    energyRange: 5, imCost: 3, conformal: false,
    forWell: false, species: "arsenic_high_dose_sd",
    bestUse: "source_drain_heavy_dope",
  },
  high_energy_mev: {
    dosePrecision: 8, uniformity: 7, throughput: 5,
    energyRange: 10, imCost: 7, conformal: false,
    forWell: true, species: "phosphorus_deep_retrograde",
    bestUse: "deep_nwell_retrograde_form",
  },
  plasma_doping_plad: {
    dosePrecision: 5, uniformity: 6, throughput: 9,
    energyRange: 3, imCost: 4, conformal: true,
    forWell: false, species: "bf3_conformal_ultra_shallow",
    bestUse: "finfet_3d_conformal_dope",
  },
  focused_ion_beam_fib: {
    dosePrecision: 10, uniformity: 3, throughput: 1,
    energyRange: 6, imCost: 9, conformal: false,
    forWell: false, species: "gallium_site_specific_edit",
    bestUse: "circuit_edit_debug_repair",
  },
};

const get = (t: Implant) => DATA[t];

export const dosePrecision = (t: Implant) => get(t).dosePrecision;
export const uniformity = (t: Implant) => get(t).uniformity;
export const throughput = (t: Implant) => get(t).throughput;
export const energyRange = (t: Implant) => get(t).energyRange;
export const imCost = (t: Implant) => get(t).imCost;
export const conformal = (t: Implant) => get(t).conformal;
export const forWell = (t: Implant) => get(t).forWell;
export const species = (t: Implant) => get(t).species;
export const bestUse = (t: Implant) => get(t).bestUse;
export const implants = (): Implant[] => Object.keys(DATA) as Implant[];
