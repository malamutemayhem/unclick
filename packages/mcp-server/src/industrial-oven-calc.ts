export type IndustrialOvenType =
  | "batch_cabinet_electric"
  | "continuous_conveyor_gas"
  | "vacuum_degassing"
  | "infrared_rapid_cure"
  | "cleanroom_class_100";

interface IndustrialOvenData {
  temperature: number;
  uniformity: number;
  throughput: number;
  energy: number;
  ioCost: number;
  continuous: boolean;
  forCuring: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<IndustrialOvenType, IndustrialOvenData> = {
  batch_cabinet_electric: {
    temperature: 7, uniformity: 8, throughput: 5, energy: 6, ioCost: 4,
    continuous: false, forCuring: true,
    heating: "electric_element_forced_air",
    bestUse: "powder_coating_paint_cure",
  },
  continuous_conveyor_gas: {
    temperature: 8, uniformity: 8, throughput: 10, energy: 8, ioCost: 8,
    continuous: true, forCuring: true,
    heating: "gas_burner_recirculating_air",
    bestUse: "high_volume_automotive_assembly",
  },
  vacuum_degassing: {
    temperature: 9, uniformity: 9, throughput: 4, energy: 5, ioCost: 9,
    continuous: false, forCuring: false,
    heating: "vacuum_chamber_radiant_element",
    bestUse: "aerospace_composite_autoclave",
  },
  infrared_rapid_cure: {
    temperature: 7, uniformity: 6, throughput: 8, energy: 9, ioCost: 6,
    continuous: true, forCuring: true,
    heating: "infrared_emitter_zone_focused",
    bestUse: "printing_ink_adhesive_flash",
  },
  cleanroom_class_100: {
    temperature: 6, uniformity: 10, throughput: 5, energy: 6, ioCost: 10,
    continuous: false, forCuring: false,
    heating: "hepa_filtered_laminar_electric",
    bestUse: "semiconductor_pharma_process",
  },
};

function get(t: IndustrialOvenType): IndustrialOvenData {
  return DATA[t];
}

export const temperature = (t: IndustrialOvenType) => get(t).temperature;
export const uniformity = (t: IndustrialOvenType) => get(t).uniformity;
export const throughput = (t: IndustrialOvenType) => get(t).throughput;
export const energy = (t: IndustrialOvenType) => get(t).energy;
export const ioCost = (t: IndustrialOvenType) => get(t).ioCost;
export const continuous = (t: IndustrialOvenType) => get(t).continuous;
export const forCuring = (t: IndustrialOvenType) => get(t).forCuring;
export const heating = (t: IndustrialOvenType) => get(t).heating;
export const bestUse = (t: IndustrialOvenType) => get(t).bestUse;
export const industrialOvenTypes = (): IndustrialOvenType[] =>
  Object.keys(DATA) as IndustrialOvenType[];
