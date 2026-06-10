export type AvalancheControl = "explosive" | "ski_cut" | "gazex" | "avalauncher" | "helicopter_bomb";

export function effectiveness(a: AvalancheControl): number {
  const m: Record<AvalancheControl, number> = {
    explosive: 9, ski_cut: 4, gazex: 8, avalauncher: 7, helicopter_bomb: 10,
  };
  return m[a];
}

export function operatorRisk(a: AvalancheControl): number {
  const m: Record<AvalancheControl, number> = {
    explosive: 7, ski_cut: 9, gazex: 1, avalauncher: 3, helicopter_bomb: 5,
  };
  return m[a];
}

export function costPerTrigger(a: AvalancheControl): number {
  const m: Record<AvalancheControl, number> = {
    explosive: 5, ski_cut: 1, gazex: 7, avalauncher: 6, helicopter_bomb: 10,
  };
  return m[a];
}

export function weatherDependency(a: AvalancheControl): number {
  const m: Record<AvalancheControl, number> = {
    explosive: 4, ski_cut: 6, gazex: 2, avalauncher: 3, helicopter_bomb: 9,
  };
  return m[a];
}

export function repeatability(a: AvalancheControl): number {
  const m: Record<AvalancheControl, number> = {
    explosive: 6, ski_cut: 10, gazex: 10, avalauncher: 8, helicopter_bomb: 5,
  };
  return m[a];
}

export function remoteOperable(a: AvalancheControl): boolean {
  const m: Record<AvalancheControl, boolean> = {
    explosive: false, ski_cut: false, gazex: true, avalauncher: true, helicopter_bomb: false,
  };
  return m[a];
}

export function requiresPermit(a: AvalancheControl): boolean {
  const m: Record<AvalancheControl, boolean> = {
    explosive: true, ski_cut: false, gazex: true, avalauncher: true, helicopter_bomb: true,
  };
  return m[a];
}

export function triggerMechanism(a: AvalancheControl): string {
  const m: Record<AvalancheControl, string> = {
    explosive: "hand_charge_cornice_throw", ski_cut: "skier_weight_traverse",
    gazex: "propane_oxygen_explosion", avalauncher: "pneumatic_projectile",
    helicopter_bomb: "air_dropped_charge",
  };
  return m[a];
}

export function bestApplication(a: AvalancheControl): string {
  const m: Record<AvalancheControl, string> = {
    explosive: "ski_patrol_inbounds", ski_cut: "small_slope_evaluation",
    gazex: "fixed_path_resort", avalauncher: "highway_corridor",
    helicopter_bomb: "remote_large_path",
  };
  return m[a];
}

export function avalancheControls(): AvalancheControl[] {
  return ["explosive", "ski_cut", "gazex", "avalauncher", "helicopter_bomb"];
}
