export type EnergyHarvest =
  | "photovoltaic_indoor"
  | "thermoelectric_body"
  | "piezoelectric_vibr"
  | "rf_ambient_rectenna"
  | "triboelectric_motion";

const DATA: Record<EnergyHarvest, {
  powerOutput: number; availability: number; efficiency: number;
  formFactor: number; harvestCost: number; wearable: boolean;
  forIot: boolean; source: string; bestUse: string;
}> = {
  photovoltaic_indoor: {
    powerOutput: 7, availability: 6, efficiency: 8,
    formFactor: 7, harvestCost: 4, wearable: false,
    forIot: true, source: "indoor_ambient_light",
    bestUse: "shelf_label_epaper",
  },
  thermoelectric_body: {
    powerOutput: 3, availability: 9, efficiency: 4,
    formFactor: 8, harvestCost: 6, wearable: true,
    forIot: false, source: "body_heat_delta_t",
    bestUse: "medical_wearable_ecg",
  },
  piezoelectric_vibr: {
    powerOutput: 5, availability: 5, efficiency: 6,
    formFactor: 6, harvestCost: 5, wearable: false,
    forIot: true, source: "mechanical_vibration",
    bestUse: "bridge_structural_mon",
  },
  rf_ambient_rectenna: {
    powerOutput: 2, availability: 8, efficiency: 3,
    formFactor: 9, harvestCost: 7, wearable: true,
    forIot: true, source: "wifi_cellular_rf",
    bestUse: "passive_rfid_sensor",
  },
  triboelectric_motion: {
    powerOutput: 4, availability: 4, efficiency: 5,
    formFactor: 7, harvestCost: 3, wearable: true,
    forIot: false, source: "contact_separation",
    bestUse: "self_powered_switch",
  },
};

const get = (t: EnergyHarvest) => DATA[t];

export const powerOutput = (t: EnergyHarvest) => get(t).powerOutput;
export const availability = (t: EnergyHarvest) => get(t).availability;
export const efficiency = (t: EnergyHarvest) => get(t).efficiency;
export const formFactor = (t: EnergyHarvest) => get(t).formFactor;
export const harvestCost = (t: EnergyHarvest) => get(t).harvestCost;
export const wearable = (t: EnergyHarvest) => get(t).wearable;
export const forIot = (t: EnergyHarvest) => get(t).forIot;
export const source = (t: EnergyHarvest) => get(t).source;
export const bestUse = (t: EnergyHarvest) => get(t).bestUse;
export const energyHarvests = (): EnergyHarvest[] => Object.keys(DATA) as EnergyHarvest[];
