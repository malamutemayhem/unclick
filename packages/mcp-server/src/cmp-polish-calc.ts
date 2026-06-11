export type CmpPolish =
  | "oxide_ild_cmp"
  | "copper_damascene"
  | "sti_trench_cmp"
  | "tungsten_plug"
  | "barrier_buff_touch";

const DATA: Record<CmpPolish, {
  removal: number; uniformity: number; selectivity: number;
  defects: number; cmpCost: number; slurryFree: boolean;
  forInterconnect: boolean; slurry: string; bestUse: string;
}> = {
  oxide_ild_cmp: {
    removal: 7, uniformity: 8, selectivity: 6,
    defects: 7, cmpCost: 3, slurryFree: false,
    forInterconnect: false, slurry: "ceria_silica_abrasive",
    bestUse: "interlayer_planarize",
  },
  copper_damascene: {
    removal: 8, uniformity: 7, selectivity: 9,
    defects: 6, cmpCost: 6, slurryFree: false,
    forInterconnect: true, slurry: "acidic_oxidizer_inhibitor",
    bestUse: "beol_copper_interconnect",
  },
  sti_trench_cmp: {
    removal: 6, uniformity: 9, selectivity: 10,
    defects: 8, cmpCost: 4, slurryFree: false,
    forInterconnect: false, slurry: "high_selectivity_ceria",
    bestUse: "shallow_trench_isolation",
  },
  tungsten_plug: {
    removal: 9, uniformity: 7, selectivity: 7,
    defects: 5, cmpCost: 5, slurryFree: false,
    forInterconnect: true, slurry: "ferricyanide_alumina",
    bestUse: "contact_via_plug_fill",
  },
  barrier_buff_touch: {
    removal: 4, uniformity: 9, selectivity: 8,
    defects: 9, cmpCost: 4, slurryFree: false,
    forInterconnect: true, slurry: "dilute_low_pressure_pad",
    bestUse: "tantalum_barrier_clear",
  },
};

const get = (t: CmpPolish) => DATA[t];

export const removal = (t: CmpPolish) => get(t).removal;
export const uniformity = (t: CmpPolish) => get(t).uniformity;
export const selectivity = (t: CmpPolish) => get(t).selectivity;
export const defects = (t: CmpPolish) => get(t).defects;
export const cmpCost = (t: CmpPolish) => get(t).cmpCost;
export const slurryFree = (t: CmpPolish) => get(t).slurryFree;
export const forInterconnect = (t: CmpPolish) => get(t).forInterconnect;
export const slurry = (t: CmpPolish) => get(t).slurry;
export const bestUse = (t: CmpPolish) => get(t).bestUse;
export const cmpPolishes = (): CmpPolish[] => Object.keys(DATA) as CmpPolish[];
