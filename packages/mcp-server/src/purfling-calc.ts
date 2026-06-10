export type PurflingType = "wood_strip_classic" | "fiber_black_white" | "marquetry_inlay_deco" | "plastic_strip_student" | "abalone_shell_ornate";

export function tonalEffect(t: PurflingType): number {
  const m: Record<PurflingType, number> = {
    wood_strip_classic: 10, fiber_black_white: 6, marquetry_inlay_deco: 8, plastic_strip_student: 3, abalone_shell_ornate: 7,
  };
  return m[t];
}

export function installDifficulty(t: PurflingType): number {
  const m: Record<PurflingType, number> = {
    wood_strip_classic: 8, fiber_black_white: 5, marquetry_inlay_deco: 10, plastic_strip_student: 3, abalone_shell_ornate: 9,
  };
  return m[t];
}

export function visualAppeal(t: PurflingType): number {
  const m: Record<PurflingType, number> = {
    wood_strip_classic: 8, fiber_black_white: 6, marquetry_inlay_deco: 10, plastic_strip_student: 4, abalone_shell_ornate: 10,
  };
  return m[t];
}

export function durability(t: PurflingType): number {
  const m: Record<PurflingType, number> = {
    wood_strip_classic: 9, fiber_black_white: 7, marquetry_inlay_deco: 7, plastic_strip_student: 8, abalone_shell_ornate: 6,
  };
  return m[t];
}

export function purflingCost(t: PurflingType): number {
  const m: Record<PurflingType, number> = {
    wood_strip_classic: 2, fiber_black_white: 1, marquetry_inlay_deco: 3, plastic_strip_student: 1, abalone_shell_ornate: 3,
  };
  return m[t];
}

export function naturalMaterial(t: PurflingType): boolean {
  const m: Record<PurflingType, boolean> = {
    wood_strip_classic: true, fiber_black_white: false, marquetry_inlay_deco: true, plastic_strip_student: false, abalone_shell_ornate: true,
  };
  return m[t];
}

export function flexible(t: PurflingType): boolean {
  const m: Record<PurflingType, boolean> = {
    wood_strip_classic: true, fiber_black_white: true, marquetry_inlay_deco: false, plastic_strip_student: true, abalone_shell_ornate: false,
  };
  return m[t];
}

export function stripComposition(t: PurflingType): string {
  const m: Record<PurflingType, string> = {
    wood_strip_classic: "maple_ebony_maple",
    fiber_black_white: "dyed_fiber_laminate",
    marquetry_inlay_deco: "multi_wood_mosaic",
    plastic_strip_student: "abs_plastic_strip",
    abalone_shell_ornate: "shell_inlay_strip",
  };
  return m[t];
}

export function bestUse(t: PurflingType): string {
  const m: Record<PurflingType, string> = {
    wood_strip_classic: "professional_violin",
    fiber_black_white: "student_instrument",
    marquetry_inlay_deco: "ornate_custom_build",
    plastic_strip_student: "budget_instrument",
    abalone_shell_ornate: "luxury_guitar_inlay",
  };
  return m[t];
}

export function purflings(): PurflingType[] {
  return ["wood_strip_classic", "fiber_black_white", "marquetry_inlay_deco", "plastic_strip_student", "abalone_shell_ornate"];
}
