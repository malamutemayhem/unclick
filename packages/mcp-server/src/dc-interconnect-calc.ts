export type DcInterconnect =
  | "dci_dwdm_coherent"
  | "dark_fiber_direct"
  | "metro_wavelength"
  | "submarine_cable"
  | "free_space_optical";

const DATA: Record<DcInterconnect, {
  capacity: number; reach: number; latency: number;
  availability: number; dciCost: number; encrypted: boolean;
  forMultiRegion: boolean; transport: string; bestUse: string;
}> = {
  dci_dwdm_coherent: {
    capacity: 9, reach: 7, latency: 7,
    availability: 8, dciCost: 7, encrypted: true,
    forMultiRegion: true, transport: "400g_zr_plus_dwdm",
    bestUse: "campus_dc_mesh",
  },
  dark_fiber_direct: {
    capacity: 7, reach: 5, latency: 10,
    availability: 8, dciCost: 8, encrypted: false,
    forMultiRegion: false, transport: "leased_fiber_pair",
    bestUse: "ultra_low_latency_hft",
  },
  metro_wavelength: {
    capacity: 8, reach: 6, latency: 8,
    availability: 9, dciCost: 6, encrypted: true,
    forMultiRegion: false, transport: "managed_lambda_service",
    bestUse: "metro_dc_disaster_recovery",
  },
  submarine_cable: {
    capacity: 10, reach: 10, latency: 3,
    availability: 7, dciCost: 10, encrypted: true,
    forMultiRegion: true, transport: "sdm_multi_core_fiber",
    bestUse: "intercontinental_backbone",
  },
  free_space_optical: {
    capacity: 5, reach: 3, latency: 10,
    availability: 5, dciCost: 4, encrypted: false,
    forMultiRegion: false, transport: "laser_line_of_sight",
    bestUse: "rooftop_building_link",
  },
};

const get = (t: DcInterconnect) => DATA[t];

export const capacity = (t: DcInterconnect) => get(t).capacity;
export const reach = (t: DcInterconnect) => get(t).reach;
export const latency = (t: DcInterconnect) => get(t).latency;
export const availability = (t: DcInterconnect) => get(t).availability;
export const dciCost = (t: DcInterconnect) => get(t).dciCost;
export const encrypted = (t: DcInterconnect) => get(t).encrypted;
export const forMultiRegion = (t: DcInterconnect) => get(t).forMultiRegion;
export const transport = (t: DcInterconnect) => get(t).transport;
export const bestUse = (t: DcInterconnect) => get(t).bestUse;
export const dcInterconnects = (): DcInterconnect[] => Object.keys(DATA) as DcInterconnect[];
