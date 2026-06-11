export type NfMembraneType =
  | "spiral_wound_polyamide"
  | "tubular_ceramic_nf"
  | "loose_nf_divalent"
  | "tight_nf_near_ro"
  | "organic_solvent_nf";

interface NfMembraneData {
  divalentReject: number;
  monovalentPass: number;
  flux: number;
  chemResist: number;
  nfCost: number;
  softening: boolean;
  forColor: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<NfMembraneType, NfMembraneData> = {
  spiral_wound_polyamide: {
    divalentReject: 9, monovalentPass: 7, flux: 8, chemResist: 5, nfCost: 5,
    softening: true, forColor: true,
    membrane: "thin_film_nanocomposite_negative_charge",
    bestUse: "water_softening_color_remove_municipal",
  },
  tubular_ceramic_nf: {
    divalentReject: 8, monovalentPass: 6, flux: 5, chemResist: 10, nfCost: 9,
    softening: false, forColor: false,
    membrane: "titania_zirconia_tube_solvent_stable",
    bestUse: "harsh_solvent_catalyst_recovery_chem",
  },
  loose_nf_divalent: {
    divalentReject: 7, monovalentPass: 9, flux: 9, chemResist: 6, nfCost: 5,
    softening: true, forColor: true,
    membrane: "loose_polyamide_high_flux_low_reject",
    bestUse: "dye_desalt_textile_wastewater_reclaim",
  },
  tight_nf_near_ro: {
    divalentReject: 10, monovalentPass: 4, flux: 6, chemResist: 5, nfCost: 6,
    softening: true, forColor: true,
    membrane: "tight_polyamide_near_ro_high_reject",
    bestUse: "pharma_water_low_tds_high_purity_prep",
  },
  organic_solvent_nf: {
    divalentReject: 7, monovalentPass: 5, flux: 5, chemResist: 10, nfCost: 10,
    softening: false, forColor: false,
    membrane: "pdms_crosslink_polymer_solvent_resist",
    bestUse: "solvent_exchange_catalyst_recycle_petro",
  },
};

function get(t: NfMembraneType): NfMembraneData {
  return DATA[t];
}

export const divalentReject = (t: NfMembraneType) => get(t).divalentReject;
export const monovalentPass = (t: NfMembraneType) => get(t).monovalentPass;
export const flux = (t: NfMembraneType) => get(t).flux;
export const chemResist = (t: NfMembraneType) => get(t).chemResist;
export const nfCost = (t: NfMembraneType) => get(t).nfCost;
export const softening = (t: NfMembraneType) => get(t).softening;
export const forColor = (t: NfMembraneType) => get(t).forColor;
export const membrane = (t: NfMembraneType) => get(t).membrane;
export const bestUse = (t: NfMembraneType) => get(t).bestUse;
export const nfMembraneTypes = (): NfMembraneType[] =>
  Object.keys(DATA) as NfMembraneType[];
