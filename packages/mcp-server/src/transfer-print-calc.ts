export type TransferPrintType =
  | "sublimation_heat"
  | "wet_transfer"
  | "melt_transfer"
  | "film_release"
  | "laser_transfer";

interface TransferPrintData {
  colorVibrancy: number;
  transferSpeed: number;
  washFastness: number;
  detailAccuracy: number;
  tpCost: number;
  heatRequired: boolean;
  forSynthetic: boolean;
  transferConfig: string;
  bestUse: string;
}

const DATA: Record<TransferPrintType, TransferPrintData> = {
  sublimation_heat: {
    colorVibrancy: 10, transferSpeed: 8, washFastness: 10, detailAccuracy: 9, tpCost: 6,
    heatRequired: true, forSynthetic: true,
    transferConfig: "sublimation_ink_paper_heat_press_200c_dye_gas_penetrate_fiber",
    bestUse: "polyester_sportswear_flag_banner_sublimation_vivid_permanent",
  },
  wet_transfer: {
    colorVibrancy: 7, transferSpeed: 6, washFastness: 7, detailAccuracy: 7, tpCost: 4,
    heatRequired: false, forSynthetic: false,
    transferConfig: "water_soluble_release_layer_soak_transfer_image_to_substrate",
    bestUse: "ceramic_decal_cotton_transfer_water_release_decorative_print",
  },
  melt_transfer: {
    colorVibrancy: 8, transferSpeed: 9, washFastness: 8, detailAccuracy: 8, tpCost: 7,
    heatRequired: true, forSynthetic: false,
    transferConfig: "hot_melt_adhesive_layer_heat_press_transfer_opaque_film_bond",
    bestUse: "dark_fabric_opaque_transfer_promotional_tshirt_custom_graphic",
  },
  film_release: {
    colorVibrancy: 9, transferSpeed: 7, washFastness: 9, detailAccuracy: 10, tpCost: 8,
    heatRequired: true, forSynthetic: false,
    transferConfig: "pet_film_carrier_dtf_powder_adhesive_heat_press_release_peel",
    bestUse: "dtf_direct_to_film_all_fabric_type_versatile_full_color_print",
  },
  laser_transfer: {
    colorVibrancy: 7, transferSpeed: 10, washFastness: 6, detailAccuracy: 8, tpCost: 9,
    heatRequired: true, forSynthetic: false,
    transferConfig: "laser_toner_transfer_paper_heat_fuse_toner_to_fabric_surface",
    bestUse: "small_batch_custom_laser_print_transfer_office_printer_fabric",
  },
};

function get(t: TransferPrintType): TransferPrintData {
  return DATA[t];
}

export const colorVibrancy = (t: TransferPrintType) => get(t).colorVibrancy;
export const transferSpeed = (t: TransferPrintType) => get(t).transferSpeed;
export const washFastness = (t: TransferPrintType) => get(t).washFastness;
export const detailAccuracy = (t: TransferPrintType) => get(t).detailAccuracy;
export const tpCost = (t: TransferPrintType) => get(t).tpCost;
export const heatRequired = (t: TransferPrintType) => get(t).heatRequired;
export const forSynthetic = (t: TransferPrintType) => get(t).forSynthetic;
export const transferConfig = (t: TransferPrintType) => get(t).transferConfig;
export const bestUse = (t: TransferPrintType) => get(t).bestUse;
export const transferPrintTypes = (): TransferPrintType[] =>
  Object.keys(DATA) as TransferPrintType[];
