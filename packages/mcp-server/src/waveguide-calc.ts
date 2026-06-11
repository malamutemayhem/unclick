export type Waveguide =
  | "silicon_strip_soi"
  | "silicon_nitride_sin"
  | "indium_phosphide_inp"
  | "polymer_pmma_su8"
  | "lithium_niobate_lnoi";

const DATA: Record<Waveguide, {
  confinement: number; loss: number; bandwidth: number;
  nonlinearity: number; wgCost: number; cmosFab: boolean;
  forModulator: boolean; platform: string; bestUse: string;
}> = {
  silicon_strip_soi: {
    confinement: 10, loss: 5, bandwidth: 9,
    nonlinearity: 7, wgCost: 3, cmosFab: true,
    forModulator: true, platform: "soi_220nm_strip_rib",
    bestUse: "datacenter_transceiver_pic",
  },
  silicon_nitride_sin: {
    confinement: 7, loss: 9, bandwidth: 10,
    nonlinearity: 5, wgCost: 4, cmosFab: true,
    forModulator: false, platform: "lpcvd_sin_800nm_core",
    bestUse: "kerr_frequency_comb_micoring",
  },
  indium_phosphide_inp: {
    confinement: 8, loss: 6, bandwidth: 8,
    nonlinearity: 9, wgCost: 8, cmosFab: false,
    forModulator: true, platform: "inp_gainas_buried_ridge",
    bestUse: "monolithic_laser_modulator_soa",
  },
  polymer_pmma_su8: {
    confinement: 4, loss: 4, bandwidth: 6,
    nonlinearity: 3, wgCost: 1, cmosFab: false,
    forModulator: false, platform: "spin_coat_uv_pattern",
    bestUse: "disposable_biosensor_chip",
  },
  lithium_niobate_lnoi: {
    confinement: 6, loss: 8, bandwidth: 10,
    nonlinearity: 10, wgCost: 7, cmosFab: false,
    forModulator: true, platform: "thin_film_ln_rib_etch",
    bestUse: "100gbaud_eo_modulator_mzi",
  },
};

const get = (t: Waveguide) => DATA[t];

export const confinement = (t: Waveguide) => get(t).confinement;
export const loss = (t: Waveguide) => get(t).loss;
export const bandwidth = (t: Waveguide) => get(t).bandwidth;
export const nonlinearity = (t: Waveguide) => get(t).nonlinearity;
export const wgCost = (t: Waveguide) => get(t).wgCost;
export const cmosFab = (t: Waveguide) => get(t).cmosFab;
export const forModulator = (t: Waveguide) => get(t).forModulator;
export const platform = (t: Waveguide) => get(t).platform;
export const bestUse = (t: Waveguide) => get(t).bestUse;
export const waveguides = (): Waveguide[] => Object.keys(DATA) as Waveguide[];
