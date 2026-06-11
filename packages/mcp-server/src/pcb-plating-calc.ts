export type PcbPlatingType =
  | "acid_copper_electro"
  | "electroless_copper"
  | "direct_metalize"
  | "carbon_conductive"
  | "tin_electro_etch";

const DATA: Record<PcbPlatingType, {
  thickness: number; uniformity: number; adhesion: number;
  throughput: number; platingCost: number; electrolytic: boolean;
  forBlindVia: boolean; chemProcess: string; bestUse: string;
}> = {
  acid_copper_electro: { thickness: 10, uniformity: 7, adhesion: 9, throughput: 8, platingCost: 5, electrolytic: true, forBlindVia: true, chemProcess: "acid_sulfate_bath", bestUse: "standard_pth_copper_buildup" },
  electroless_copper: { thickness: 5, uniformity: 10, adhesion: 7, throughput: 5, platingCost: 6, electrolytic: false, forBlindVia: true, chemProcess: "formaldehyde_reduction", bestUse: "initial_seed_layer_deposit" },
  direct_metalize: { thickness: 3, uniformity: 8, adhesion: 6, throughput: 9, platingCost: 4, electrolytic: false, forBlindVia: false, chemProcess: "palladium_catalyst_coat", bestUse: "high_volume_pth_alternative" },
  carbon_conductive: { thickness: 2, uniformity: 6, adhesion: 5, throughput: 10, platingCost: 2, electrolytic: false, forBlindVia: false, chemProcess: "carbon_ink_dispersion", bestUse: "low_cost_double_side_board" },
  tin_electro_etch: { thickness: 7, uniformity: 8, adhesion: 8, throughput: 7, platingCost: 7, electrolytic: true, forBlindVia: false, chemProcess: "stannous_sulfate_bath", bestUse: "etch_resist_pattern_plate" },
};

const get = (t: PcbPlatingType) => DATA[t];

export const thickness = (t: PcbPlatingType) => get(t).thickness;
export const uniformity = (t: PcbPlatingType) => get(t).uniformity;
export const adhesion = (t: PcbPlatingType) => get(t).adhesion;
export const throughput = (t: PcbPlatingType) => get(t).throughput;
export const platingCost = (t: PcbPlatingType) => get(t).platingCost;
export const electrolytic = (t: PcbPlatingType) => get(t).electrolytic;
export const forBlindVia = (t: PcbPlatingType) => get(t).forBlindVia;
export const chemProcess = (t: PcbPlatingType) => get(t).chemProcess;
export const bestUse = (t: PcbPlatingType) => get(t).bestUse;
export const pcbPlatings = (): PcbPlatingType[] => Object.keys(DATA) as PcbPlatingType[];
