export type SoapStampType = "acrylic_custom_laser" | "silicone_mat_texture" | "wood_block_carved" | "resin_3d_printed" | "metal_emboss_press";

export function impressDepth(t: SoapStampType): number {
  const m: Record<SoapStampType, number> = {
    acrylic_custom_laser: 8, silicone_mat_texture: 5, wood_block_carved: 7, resin_3d_printed: 9, metal_emboss_press: 10,
  };
  return m[t];
}

export function detailLevel(t: SoapStampType): number {
  const m: Record<SoapStampType, number> = {
    acrylic_custom_laser: 10, silicone_mat_texture: 6, wood_block_carved: 7, resin_3d_printed: 9, metal_emboss_press: 8,
  };
  return m[t];
}

export function releaseEase(t: SoapStampType): number {
  const m: Record<SoapStampType, number> = {
    acrylic_custom_laser: 7, silicone_mat_texture: 10, wood_block_carved: 5, resin_3d_printed: 8, metal_emboss_press: 6,
  };
  return m[t];
}

export function durability(t: SoapStampType): number {
  const m: Record<SoapStampType, number> = {
    acrylic_custom_laser: 9, silicone_mat_texture: 7, wood_block_carved: 6, resin_3d_printed: 5, metal_emboss_press: 10,
  };
  return m[t];
}

export function stampCost(t: SoapStampType): number {
  const m: Record<SoapStampType, number> = {
    acrylic_custom_laser: 2, silicone_mat_texture: 1, wood_block_carved: 2, resin_3d_printed: 2, metal_emboss_press: 4,
  };
  return m[t];
}

export function customDesign(t: SoapStampType): boolean {
  const m: Record<SoapStampType, boolean> = {
    acrylic_custom_laser: true, silicone_mat_texture: false, wood_block_carved: true, resin_3d_printed: true, metal_emboss_press: true,
  };
  return m[t];
}

export function fullSurface(t: SoapStampType): boolean {
  const m: Record<SoapStampType, boolean> = {
    acrylic_custom_laser: false, silicone_mat_texture: true, wood_block_carved: false, resin_3d_printed: false, metal_emboss_press: false,
  };
  return m[t];
}

export function stampMaterial(t: SoapStampType): string {
  const m: Record<SoapStampType, string> = {
    acrylic_custom_laser: "laser_cut_acrylic",
    silicone_mat_texture: "silicone_texture_sheet",
    wood_block_carved: "hardwood_hand_carved",
    resin_3d_printed: "uv_cured_resin",
    metal_emboss_press: "brass_die_machined",
  };
  return m[t];
}

export function bestSoap(t: SoapStampType): string {
  const m: Record<SoapStampType, string> = {
    acrylic_custom_laser: "cold_process_logo",
    silicone_mat_texture: "melt_pour_textured_top",
    wood_block_carved: "artisan_bar_rustic",
    resin_3d_printed: "complex_3d_design",
    metal_emboss_press: "production_brand_stamp",
  };
  return m[t];
}

export function soapStamps(): SoapStampType[] {
  return ["acrylic_custom_laser", "silicone_mat_texture", "wood_block_carved", "resin_3d_printed", "metal_emboss_press"];
}
