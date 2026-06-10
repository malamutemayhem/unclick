export type FrenchPressType = "glass_classic" | "stainless_insulated" | "ceramic_mug" | "travel_press" | "large_carafe";

export function brewRichness(t: FrenchPressType): number {
  const m: Record<FrenchPressType, number> = {
    glass_classic: 8, stainless_insulated: 8, ceramic_mug: 7, travel_press: 6, large_carafe: 9,
  };
  return m[t];
}

export function heatKeep(t: FrenchPressType): number {
  const m: Record<FrenchPressType, number> = {
    glass_classic: 4, stainless_insulated: 10, ceramic_mug: 7, travel_press: 9, large_carafe: 5,
  };
  return m[t];
}

export function durabilityScore(t: FrenchPressType): number {
  const m: Record<FrenchPressType, number> = {
    glass_classic: 3, stainless_insulated: 10, ceramic_mug: 5, travel_press: 8, large_carafe: 4,
  };
  return m[t];
}

export function servingSize(t: FrenchPressType): number {
  const m: Record<FrenchPressType, number> = {
    glass_classic: 6, stainless_insulated: 6, ceramic_mug: 2, travel_press: 2, large_carafe: 10,
  };
  return m[t];
}

export function pressCost(t: FrenchPressType): number {
  const m: Record<FrenchPressType, number> = {
    glass_classic: 2, stainless_insulated: 6, ceramic_mug: 4, travel_press: 5, large_carafe: 5,
  };
  return m[t];
}

export function dishwasherSafe(t: FrenchPressType): boolean {
  const m: Record<FrenchPressType, boolean> = {
    glass_classic: true, stainless_insulated: true, ceramic_mug: true, travel_press: false, large_carafe: true,
  };
  return m[t];
}

export function leakProof(t: FrenchPressType): boolean {
  const m: Record<FrenchPressType, boolean> = {
    glass_classic: false, stainless_insulated: false, ceramic_mug: false, travel_press: true, large_carafe: false,
  };
  return m[t];
}

export function filterMesh(t: FrenchPressType): string {
  const m: Record<FrenchPressType, string> = {
    glass_classic: "three_layer_stainless_screen", stainless_insulated: "double_wall_fine_mesh",
    ceramic_mug: "single_screen_plunger", travel_press: "sealed_micro_mesh_lid",
    large_carafe: "triple_filter_coarse_mesh",
  };
  return m[t];
}

export function bestMoment(t: FrenchPressType): string {
  const m: Record<FrenchPressType, string> = {
    glass_classic: "home_morning_ritual", stainless_insulated: "camping_outdoor_durable",
    ceramic_mug: "office_desk_single_cup", travel_press: "commute_on_the_go",
    large_carafe: "brunch_dinner_party_group",
  };
  return m[t];
}

export function frenchPresses(): FrenchPressType[] {
  return ["glass_classic", "stainless_insulated", "ceramic_mug", "travel_press", "large_carafe"];
}
