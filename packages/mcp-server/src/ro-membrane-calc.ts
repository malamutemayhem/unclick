export type RoMembraneType =
  | "spiral_wound_polyamide"
  | "hollow_fiber_cellulose"
  | "disc_tube_vibrate"
  | "seawater_high_reject"
  | "low_energy_brackish";

interface RoMembraneData {
  rejection: number;
  flux: number;
  foulingResist: number;
  energyUse: number;
  roCost: number;
  chlorineTol: boolean;
  forSeawater: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<RoMembraneType, RoMembraneData> = {
  spiral_wound_polyamide: {
    rejection: 9, flux: 8, foulingResist: 6, energyUse: 6, roCost: 5,
    chlorineTol: false, forSeawater: false,
    membrane: "thin_film_composite_polyamide_spacer",
    bestUse: "municipal_drink_water_brackish_desal",
  },
  hollow_fiber_cellulose: {
    rejection: 7, flux: 7, foulingResist: 5, energyUse: 7, roCost: 4,
    chlorineTol: true, forSeawater: false,
    membrane: "cellulose_acetate_hollow_fiber_bundle",
    bestUse: "industrial_pretreat_chlorine_tolerant",
  },
  disc_tube_vibrate: {
    rejection: 8, flux: 7, foulingResist: 10, energyUse: 5, roCost: 9,
    chlorineTol: false, forSeawater: false,
    membrane: "disc_stack_vibrate_shear_anti_foul",
    bestUse: "landfill_leachate_high_fouling_waste",
  },
  seawater_high_reject: {
    rejection: 10, flux: 6, foulingResist: 7, energyUse: 4, roCost: 7,
    chlorineTol: false, forSeawater: true,
    membrane: "high_rejection_polyamide_pressure_vessel",
    bestUse: "seawater_desalination_coastal_plant",
  },
  low_energy_brackish: {
    rejection: 8, flux: 9, foulingResist: 6, energyUse: 9, roCost: 5,
    chlorineTol: false, forSeawater: false,
    membrane: "low_pressure_tfc_high_flux_element",
    bestUse: "brackish_well_water_low_energy_inland",
  },
};

function get(t: RoMembraneType): RoMembraneData {
  return DATA[t];
}

export const rejection = (t: RoMembraneType) => get(t).rejection;
export const flux = (t: RoMembraneType) => get(t).flux;
export const foulingResist = (t: RoMembraneType) => get(t).foulingResist;
export const energyUse = (t: RoMembraneType) => get(t).energyUse;
export const roCost = (t: RoMembraneType) => get(t).roCost;
export const chlorineTol = (t: RoMembraneType) => get(t).chlorineTol;
export const forSeawater = (t: RoMembraneType) => get(t).forSeawater;
export const membrane = (t: RoMembraneType) => get(t).membrane;
export const bestUse = (t: RoMembraneType) => get(t).bestUse;
export const roMembraneTypes = (): RoMembraneType[] =>
  Object.keys(DATA) as RoMembraneType[];
