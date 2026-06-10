export type WatercolorSetType = "pan_travel_compact" | "tube_professional_large" | "liquid_concentrate_dropper" | "watercolor_pencil_dual" | "gouache_opaque_set";

export function pigmentIntensity(t: WatercolorSetType): number {
  const m: Record<WatercolorSetType, number> = {
    pan_travel_compact: 6, tube_professional_large: 10, liquid_concentrate_dropper: 9, watercolor_pencil_dual: 5, gouache_opaque_set: 8,
  };
  return m[t];
}

export function transparency(t: WatercolorSetType): number {
  const m: Record<WatercolorSetType, number> = {
    pan_travel_compact: 8, tube_professional_large: 10, liquid_concentrate_dropper: 9, watercolor_pencil_dual: 7, gouache_opaque_set: 2,
  };
  return m[t];
}

export function mixability(t: WatercolorSetType): number {
  const m: Record<WatercolorSetType, number> = {
    pan_travel_compact: 6, tube_professional_large: 10, liquid_concentrate_dropper: 8, watercolor_pencil_dual: 4, gouache_opaque_set: 7,
  };
  return m[t];
}

export function portability(t: WatercolorSetType): number {
  const m: Record<WatercolorSetType, number> = {
    pan_travel_compact: 10, tube_professional_large: 4, liquid_concentrate_dropper: 6, watercolor_pencil_dual: 9, gouache_opaque_set: 5,
  };
  return m[t];
}

export function setCost(t: WatercolorSetType): number {
  const m: Record<WatercolorSetType, number> = {
    pan_travel_compact: 6, tube_professional_large: 9, liquid_concentrate_dropper: 7, watercolor_pencil_dual: 5, gouache_opaque_set: 8,
  };
  return m[t];
}

export function lightfast(t: WatercolorSetType): boolean {
  const m: Record<WatercolorSetType, boolean> = {
    pan_travel_compact: true, tube_professional_large: true, liquid_concentrate_dropper: false, watercolor_pencil_dual: true, gouache_opaque_set: true,
  };
  return m[t];
}

export function rewettable(t: WatercolorSetType): boolean {
  const m: Record<WatercolorSetType, boolean> = {
    pan_travel_compact: true, tube_professional_large: true, liquid_concentrate_dropper: true, watercolor_pencil_dual: true, gouache_opaque_set: false,
  };
  return m[t];
}

export function paintForm(t: WatercolorSetType): string {
  const m: Record<WatercolorSetType, string> = {
    pan_travel_compact: "dried_cake_half_pan",
    tube_professional_large: "moist_paste_tube",
    liquid_concentrate_dropper: "fluid_liquid_bottle",
    watercolor_pencil_dual: "pigment_core_pencil",
    gouache_opaque_set: "opaque_cream_tube",
  };
  return m[t];
}

export function bestStyle(t: WatercolorSetType): string {
  const m: Record<WatercolorSetType, string> = {
    pan_travel_compact: "plein_air_field_sketch",
    tube_professional_large: "studio_large_wash",
    liquid_concentrate_dropper: "calligraphy_ink_wash",
    watercolor_pencil_dual: "detailed_botanical_line",
    gouache_opaque_set: "illustration_flat_opaque",
  };
  return m[t];
}

export function watercolorSets(): WatercolorSetType[] {
  return ["pan_travel_compact", "tube_professional_large", "liquid_concentrate_dropper", "watercolor_pencil_dual", "gouache_opaque_set"];
}
