export type GlacierType = "valley" | "ice_sheet" | "cirque" | "piedmont" | "tidewater";

export function areaExtent(g: GlacierType): number {
  const m: Record<GlacierType, number> = {
    valley: 6, ice_sheet: 10, cirque: 2, piedmont: 7, tidewater: 5,
  };
  return m[g];
}

export function flowSpeed(g: GlacierType): number {
  const m: Record<GlacierType, number> = {
    valley: 7, ice_sheet: 4, cirque: 2, piedmont: 5, tidewater: 10,
  };
  return m[g];
}

export function erosionPower(g: GlacierType): number {
  const m: Record<GlacierType, number> = {
    valley: 9, ice_sheet: 10, cirque: 7, piedmont: 5, tidewater: 8,
  };
  return m[g];
}

export function calvingActivity(g: GlacierType): number {
  const m: Record<GlacierType, number> = {
    valley: 3, ice_sheet: 7, cirque: 1, piedmont: 2, tidewater: 10,
  };
  return m[g];
}

export function climateRecord(g: GlacierType): number {
  const m: Record<GlacierType, number> = {
    valley: 5, ice_sheet: 10, cirque: 2, piedmont: 4, tidewater: 3,
  };
  return m[g];
}

export function accessibleForResearch(g: GlacierType): boolean {
  const m: Record<GlacierType, boolean> = {
    valley: true, ice_sheet: false, cirque: true, piedmont: true, tidewater: false,
  };
  return m[g];
}

export function seaLevelContribution(g: GlacierType): boolean {
  const m: Record<GlacierType, boolean> = {
    valley: false, ice_sheet: true, cirque: false, piedmont: false, tidewater: true,
  };
  return m[g];
}

export function landformCreated(g: GlacierType): string {
  const m: Record<GlacierType, string> = {
    valley: "u_shaped_valley_moraine", ice_sheet: "continental_till_plain",
    cirque: "armchair_hollow_tarn", piedmont: "fan_shaped_lobe",
    tidewater: "fjord_iceberg_calving",
  };
  return m[g];
}

export function famousExample(g: GlacierType): string {
  const m: Record<GlacierType, string> = {
    valley: "aletsch_switzerland", ice_sheet: "antarctic_greenland",
    cirque: "snowdon_wales", piedmont: "malaspina_alaska",
    tidewater: "hubbard_alaska",
  };
  return m[g];
}

export function glacierTypes(): GlacierType[] {
  return ["valley", "ice_sheet", "cirque", "piedmont", "tidewater"];
}
