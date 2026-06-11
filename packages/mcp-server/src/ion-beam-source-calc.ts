export type IonBeamSourceType =
  | "kaufman_ion"
  | "end_hall_ion"
  | "rf_ion_source"
  | "ecr_ion_source"
  | "hollow_cathode";

interface IonBeamSourceData {
  beamEnergy: number;
  throughput: number;
  beamUniformity: number;
  ionCurrent: number;
  ibCost: number;
  gridless: boolean;
  forEtching: boolean;
  sourceConfig: string;
  bestUse: string;
}

const DATA: Record<IonBeamSourceType, IonBeamSourceData> = {
  kaufman_ion: {
    beamEnergy: 9, throughput: 8, beamUniformity: 9, ionCurrent: 8, ibCost: 7,
    gridless: false, forEtching: true,
    sourceConfig: "kaufman_ion_source_gridded_extraction_collimated_beam_sputter_etch",
    bestUse: "precision_etch_kaufman_ion_source_gridded_collimated_controlled",
  },
  end_hall_ion: {
    beamEnergy: 6, throughput: 9, beamUniformity: 7, ionCurrent: 9, ibCost: 4,
    gridless: true, forEtching: false,
    sourceConfig: "end_hall_ion_source_gridless_anode_layer_assist_deposit_clean",
    bestUse: "iad_coating_end_hall_ion_source_gridless_assist_deposit_dense_film",
  },
  rf_ion_source: {
    beamEnergy: 8, throughput: 7, beamUniformity: 8, ionCurrent: 7, ibCost: 8,
    gridless: false, forEtching: true,
    sourceConfig: "rf_ion_source_inductively_coupled_no_filament_reactive_gas_ok",
    bestUse: "semiconductor_rf_ion_source_reactive_etch_no_filament_contaminate",
  },
  ecr_ion_source: {
    beamEnergy: 10, throughput: 7, beamUniformity: 8, ionCurrent: 10, ibCost: 10,
    gridless: false, forEtching: true,
    sourceConfig: "ecr_ion_source_microwave_magnetic_high_charge_state_intense_beam",
    bestUse: "ion_implant_ecr_ion_source_high_charge_state_multiply_ionized",
  },
  hollow_cathode: {
    beamEnergy: 5, throughput: 8, beamUniformity: 6, ionCurrent: 7, ibCost: 3,
    gridless: true, forEtching: false,
    sourceConfig: "hollow_cathode_ion_source_neutralizer_plasma_bridge_assist_clean",
    bestUse: "substrate_clean_hollow_cathode_source_plasma_bridge_pre_clean_bond",
  },
};

function get(t: IonBeamSourceType): IonBeamSourceData {
  return DATA[t];
}

export const beamEnergy = (t: IonBeamSourceType) => get(t).beamEnergy;
export const throughput = (t: IonBeamSourceType) => get(t).throughput;
export const beamUniformity = (t: IonBeamSourceType) => get(t).beamUniformity;
export const ionCurrent = (t: IonBeamSourceType) => get(t).ionCurrent;
export const ibCost = (t: IonBeamSourceType) => get(t).ibCost;
export const gridless = (t: IonBeamSourceType) => get(t).gridless;
export const forEtching = (t: IonBeamSourceType) => get(t).forEtching;
export const sourceConfig = (t: IonBeamSourceType) => get(t).sourceConfig;
export const bestUse = (t: IonBeamSourceType) => get(t).bestUse;
export const ionBeamSourceTypes = (): IonBeamSourceType[] =>
  Object.keys(DATA) as IonBeamSourceType[];
