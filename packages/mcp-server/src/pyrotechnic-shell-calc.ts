export type PyrotechnicShell = "round" | "cylindrical" | "multibreak" | "salute" | "mine";

export function altitudeReach(s: PyrotechnicShell): number {
  const m: Record<PyrotechnicShell, number> = {
    round: 8, cylindrical: 7, multibreak: 9, salute: 6, mine: 3,
  };
  return m[s];
}

export function effectDuration(s: PyrotechnicShell): number {
  const m: Record<PyrotechnicShell, number> = {
    round: 5, cylindrical: 7, multibreak: 10, salute: 1, mine: 4,
  };
  return m[s];
}

export function symmetry(s: PyrotechnicShell): number {
  const m: Record<PyrotechnicShell, number> = {
    round: 10, cylindrical: 6, multibreak: 7, salute: 5, mine: 3,
  };
  return m[s];
}

export function loudness(s: PyrotechnicShell): number {
  const m: Record<PyrotechnicShell, number> = {
    round: 6, cylindrical: 5, multibreak: 7, salute: 10, mine: 8,
  };
  return m[s];
}

export function constructionComplexity(s: PyrotechnicShell): number {
  const m: Record<PyrotechnicShell, number> = {
    round: 6, cylindrical: 5, multibreak: 10, salute: 3, mine: 4,
  };
  return m[s];
}

export function groundLevel(s: PyrotechnicShell): boolean {
  const m: Record<PyrotechnicShell, boolean> = {
    round: false, cylindrical: false, multibreak: false, salute: false, mine: true,
  };
  return m[s];
}

export function concussionEffect(s: PyrotechnicShell): boolean {
  const m: Record<PyrotechnicShell, boolean> = {
    round: false, cylindrical: false, multibreak: false, salute: true, mine: false,
  };
  return m[s];
}

export function burstPattern(s: PyrotechnicShell): string {
  const m: Record<PyrotechnicShell, string> = {
    round: "spherical_symmetric", cylindrical: "elongated_cascade",
    multibreak: "sequential_layers", salute: "flash_bang_no_color",
    mine: "upward_fountain",
  };
  return m[s];
}

export function typicalSize(s: PyrotechnicShell): string {
  const m: Record<PyrotechnicShell, string> = {
    round: "3_to_12_inch", cylindrical: "4_to_8_inch",
    multibreak: "6_to_12_inch", salute: "3_to_6_inch",
    mine: "mortar_tube_fired",
  };
  return m[s];
}

export function pyrotechnicShells(): PyrotechnicShell[] {
  return ["round", "cylindrical", "multibreak", "salute", "mine"];
}
