export type IonImplanterType =
  | "medium_current"
  | "high_current"
  | "high_energy"
  | "plasma_immersion"
  | "focused_ion_beam";

interface IonImplanterData {
  doseUniformity: number;
  throughput: number;
  energyRange: number;
  depthControl: number;
  iiCost: number;
  highDose: boolean;
  forDeepWell: boolean;
  implanterConfig: string;
  bestUse: string;
}

const DATA: Record<IonImplanterType, IonImplanterData> = {
  medium_current: {
    doseUniformity: 9, throughput: 7, energyRange: 8, depthControl: 9, iiCost: 7,
    highDose: false, forDeepWell: false,
    implanterConfig: "medium_current_ion_implanter_threshold_adjust_channel_dope",
    bestUse: "logic_fab_medium_current_implanter_threshold_adjust_halo_dope",
  },
  high_current: {
    doseUniformity: 8, throughput: 10, energyRange: 6, depthControl: 7, iiCost: 8,
    highDose: true, forDeepWell: false,
    implanterConfig: "high_current_ion_implanter_source_drain_heavy_dose_amorphize",
    bestUse: "source_drain_high_current_implanter_heavy_dose_amorphize_fab",
  },
  high_energy: {
    doseUniformity: 8, throughput: 5, energyRange: 10, depthControl: 8, iiCost: 9,
    highDose: false, forDeepWell: true,
    implanterConfig: "high_energy_ion_implanter_mev_deep_well_retrograde_buried",
    bestUse: "deep_well_high_energy_implanter_mev_retrograde_buried_layer",
  },
  plasma_immersion: {
    doseUniformity: 7, throughput: 9, energyRange: 5, depthControl: 6, iiCost: 6,
    highDose: true, forDeepWell: false,
    implanterConfig: "plasma_immersion_ion_implanter_piii_conformal_3d_doping_batch",
    bestUse: "3d_structure_plasma_immersion_implanter_conformal_dope_batch",
  },
  focused_ion_beam: {
    doseUniformity: 10, throughput: 2, energyRange: 7, depthControl: 10, iiCost: 10,
    highDose: false, forDeepWell: false,
    implanterConfig: "focused_ion_beam_implanter_fib_mask_less_direct_write_edit",
    bestUse: "circuit_edit_focused_ion_beam_implanter_mask_less_debug_repair",
  },
};

function get(t: IonImplanterType): IonImplanterData {
  return DATA[t];
}

export const doseUniformity = (t: IonImplanterType) => get(t).doseUniformity;
export const throughput = (t: IonImplanterType) => get(t).throughput;
export const energyRange = (t: IonImplanterType) => get(t).energyRange;
export const depthControl = (t: IonImplanterType) => get(t).depthControl;
export const iiCost = (t: IonImplanterType) => get(t).iiCost;
export const highDose = (t: IonImplanterType) => get(t).highDose;
export const forDeepWell = (t: IonImplanterType) => get(t).forDeepWell;
export const implanterConfig = (t: IonImplanterType) => get(t).implanterConfig;
export const bestUse = (t: IonImplanterType) => get(t).bestUse;
export const ionImplanterTypes = (): IonImplanterType[] =>
  Object.keys(DATA) as IonImplanterType[];
