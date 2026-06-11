export type MembraneType =
  | "mf_microfiltration"
  | "uf_ultrafiltration"
  | "nf_nanofiltration"
  | "ro_reverse_osmosis"
  | "ceramic_tubular_high_temp";

const DATA: Record<MembraneType, {
  poreSize: number; rejection: number; flux: number;
  foulingResist: number; mtCost: number; backwashable: boolean;
  forDrinking: boolean; material: string; bestUse: string;
}> = {
  mf_microfiltration: {
    poreSize: 10, rejection: 3, flux: 10,
    foulingResist: 7, mtCost: 1, backwashable: true,
    forDrinking: false, material: "pvdf_hollow_fiber",
    bestUse: "turbidity_bacteria_pretreatment",
  },
  uf_ultrafiltration: {
    poreSize: 7, rejection: 5, flux: 8,
    foulingResist: 6, mtCost: 2, backwashable: true,
    forDrinking: true, material: "pes_polyethersulfone_fiber",
    bestUse: "virus_removal_drinking_water",
  },
  nf_nanofiltration: {
    poreSize: 4, rejection: 7, flux: 5,
    foulingResist: 4, mtCost: 3, backwashable: false,
    forDrinking: true, material: "thin_film_composite_polyamide",
    bestUse: "hardness_removal_color_reject",
  },
  ro_reverse_osmosis: {
    poreSize: 1, rejection: 10, flux: 3,
    foulingResist: 3, mtCost: 4, backwashable: false,
    forDrinking: true, material: "aromatic_polyamide_spiral",
    bestUse: "seawater_desalination_pure",
  },
  ceramic_tubular_high_temp: {
    poreSize: 6, rejection: 6, flux: 6,
    foulingResist: 10, mtCost: 5, backwashable: true,
    forDrinking: false, material: "alumina_zirconia_tubular",
    bestUse: "oily_wastewater_high_temp_chem",
  },
};

const get = (t: MembraneType) => DATA[t];

export const poreSize = (t: MembraneType) => get(t).poreSize;
export const rejection = (t: MembraneType) => get(t).rejection;
export const flux = (t: MembraneType) => get(t).flux;
export const foulingResist = (t: MembraneType) => get(t).foulingResist;
export const mtCost = (t: MembraneType) => get(t).mtCost;
export const backwashable = (t: MembraneType) => get(t).backwashable;
export const forDrinking = (t: MembraneType) => get(t).forDrinking;
export const material = (t: MembraneType) => get(t).material;
export const bestUse = (t: MembraneType) => get(t).bestUse;
export const membraneTypes = (): MembraneType[] => Object.keys(DATA) as MembraneType[];
