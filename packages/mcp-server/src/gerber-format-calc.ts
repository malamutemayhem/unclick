export type GerberFormatType =
  | "rs274x_extended"
  | "gerber_x2_attr"
  | "gerber_x3_component"
  | "odb_plusplus"
  | "ipc2581_xml";

const DATA: Record<GerberFormatType, {
  dataRichness: number; compatibility: number; layerSupport: number;
  automation: number; adoptionLevel: number; embedded: boolean;
  forSmartFab: boolean; fileStructure: string; bestUse: string;
}> = {
  rs274x_extended: { dataRichness: 4, compatibility: 10, layerSupport: 7, automation: 4, adoptionLevel: 10, embedded: false, forSmartFab: false, fileStructure: "single_layer_per_file", bestUse: "universal_fab_exchange" },
  gerber_x2_attr: { dataRichness: 7, compatibility: 8, layerSupport: 8, automation: 7, adoptionLevel: 7, embedded: true, forSmartFab: false, fileStructure: "attributed_layer_file", bestUse: "modern_fab_with_metadata" },
  gerber_x3_component: { dataRichness: 9, compatibility: 6, layerSupport: 9, automation: 8, adoptionLevel: 4, embedded: true, forSmartFab: true, fileStructure: "component_embedded_file", bestUse: "assembly_integrated_data" },
  odb_plusplus: { dataRichness: 10, compatibility: 5, layerSupport: 10, automation: 9, adoptionLevel: 5, embedded: true, forSmartFab: true, fileStructure: "hierarchical_database", bestUse: "advanced_cam_fab_flow" },
  ipc2581_xml: { dataRichness: 10, compatibility: 4, layerSupport: 10, automation: 10, adoptionLevel: 3, embedded: true, forSmartFab: true, fileStructure: "xml_structured_package", bestUse: "full_product_lifecycle" },
};

const get = (t: GerberFormatType) => DATA[t];

export const dataRichness = (t: GerberFormatType) => get(t).dataRichness;
export const compatibility = (t: GerberFormatType) => get(t).compatibility;
export const layerSupport = (t: GerberFormatType) => get(t).layerSupport;
export const automation = (t: GerberFormatType) => get(t).automation;
export const adoptionLevel = (t: GerberFormatType) => get(t).adoptionLevel;
export const embedded = (t: GerberFormatType) => get(t).embedded;
export const forSmartFab = (t: GerberFormatType) => get(t).forSmartFab;
export const fileStructure = (t: GerberFormatType) => get(t).fileStructure;
export const bestUse = (t: GerberFormatType) => get(t).bestUse;
export const gerberFormats = (): GerberFormatType[] => Object.keys(DATA) as GerberFormatType[];
