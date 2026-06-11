export type Desalination =
  | "reverse_osmosis_membrane"
  | "multi_stage_flash"
  | "multi_effect_distill"
  | "electrodialysis_reversal"
  | "forward_osmosis_draw";

const DATA: Record<Desalination, {
  energyEff: number; recovery: number; capacity: number;
  purity: number; dsCost: number; thermal: boolean;
  forBrackish: boolean; driving: string; bestUse: string;
}> = {
  reverse_osmosis_membrane: {
    energyEff: 9, recovery: 7, capacity: 10,
    purity: 9, dsCost: 2, thermal: false,
    forBrackish: true, driving: "high_pressure_pump_membrane",
    bestUse: "seawater_municipal_drinking",
  },
  multi_stage_flash: {
    energyEff: 3, recovery: 6, capacity: 9,
    purity: 8, dsCost: 4, thermal: true,
    forBrackish: false, driving: "steam_flash_evaporate_stage",
    bestUse: "gulf_state_large_capacity_plant",
  },
  multi_effect_distill: {
    energyEff: 5, recovery: 5, capacity: 8,
    purity: 10, dsCost: 3, thermal: true,
    forBrackish: false, driving: "falling_film_evaporator_tube",
    bestUse: "cogen_waste_heat_distill",
  },
  electrodialysis_reversal: {
    energyEff: 8, recovery: 9, capacity: 5,
    purity: 6, dsCost: 3, thermal: false,
    forBrackish: true, driving: "ion_exchange_membrane_electric",
    bestUse: "brackish_well_water_inland",
  },
  forward_osmosis_draw: {
    energyEff: 7, recovery: 4, capacity: 3,
    purity: 7, dsCost: 4, thermal: false,
    forBrackish: true, driving: "draw_solute_osmotic_gradient",
    bestUse: "emergency_portable_water_bag",
  },
};

const get = (t: Desalination) => DATA[t];

export const energyEff = (t: Desalination) => get(t).energyEff;
export const recovery = (t: Desalination) => get(t).recovery;
export const capacity = (t: Desalination) => get(t).capacity;
export const purity = (t: Desalination) => get(t).purity;
export const dsCost = (t: Desalination) => get(t).dsCost;
export const thermal = (t: Desalination) => get(t).thermal;
export const forBrackish = (t: Desalination) => get(t).forBrackish;
export const driving = (t: Desalination) => get(t).driving;
export const bestUse = (t: Desalination) => get(t).bestUse;
export const desalinations = (): Desalination[] => Object.keys(DATA) as Desalination[];
