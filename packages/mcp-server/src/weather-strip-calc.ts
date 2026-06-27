export type WeatherStripType = "adhesive_foam_tape" | "v_strip_bronze" | "door_sweep_brush" | "silicone_tubular" | "magnetic_door_seal";

export function airSeal(t: WeatherStripType): number {
  const m: Record<WeatherStripType, number> = {
    adhesive_foam_tape: 5, v_strip_bronze: 8, door_sweep_brush: 6, silicone_tubular: 9, magnetic_door_seal: 10,
  };
  return m[t];
}

export function durability(t: WeatherStripType): number {
  const m: Record<WeatherStripType, number> = {
    adhesive_foam_tape: 3, v_strip_bronze: 10, door_sweep_brush: 7, silicone_tubular: 8, magnetic_door_seal: 6,
  };
  return m[t];
}

export function installEase(t: WeatherStripType): number {
  const m: Record<WeatherStripType, number> = {
    adhesive_foam_tape: 10, v_strip_bronze: 4, door_sweep_brush: 7, silicone_tubular: 6, magnetic_door_seal: 8,
  };
  return m[t];
}

export function visibility(t: WeatherStripType): number {
  const m: Record<WeatherStripType, number> = {
    adhesive_foam_tape: 7, v_strip_bronze: 9, door_sweep_brush: 5, silicone_tubular: 8, magnetic_door_seal: 6,
  };
  return m[t];
}

export function stripCost(t: WeatherStripType): number {
  const m: Record<WeatherStripType, number> = {
    adhesive_foam_tape: 1, v_strip_bronze: 5, door_sweep_brush: 3, silicone_tubular: 4, magnetic_door_seal: 6,
  };
  return m[t];
}

export function toolFree(t: WeatherStripType): boolean {
  const m: Record<WeatherStripType, boolean> = {
    adhesive_foam_tape: true, v_strip_bronze: false, door_sweep_brush: false, silicone_tubular: false, magnetic_door_seal: true,
  };
  return m[t];
}

export function insectBlock(t: WeatherStripType): boolean {
  const m: Record<WeatherStripType, boolean> = {
    adhesive_foam_tape: false, v_strip_bronze: true, door_sweep_brush: true, silicone_tubular: true, magnetic_door_seal: true,
  };
  return m[t];
}

export function sealMaterial(t: WeatherStripType): string {
  const m: Record<WeatherStripType, string> = {
    adhesive_foam_tape: "closed_cell_foam_psa",
    v_strip_bronze: "phosphor_bronze_spring",
    door_sweep_brush: "nylon_brush_aluminum",
    silicone_tubular: "extruded_silicone_tube",
    magnetic_door_seal: "magnetic_strip_vinyl",
  };
  return m[t];
}

export function bestSpot(t: WeatherStripType): string {
  const m: Record<WeatherStripType, string> = {
    adhesive_foam_tape: "window_sash_quick_fix",
    v_strip_bronze: "historic_wood_window",
    door_sweep_brush: "exterior_door_bottom",
    silicone_tubular: "casement_window_frame",
    magnetic_door_seal: "interior_door_jamb",
  };
  return m[t];
}

export function weatherStrips(): WeatherStripType[] {
  return ["adhesive_foam_tape", "v_strip_bronze", "door_sweep_brush", "silicone_tubular", "magnetic_door_seal"];
}
