export type EruptionStyle = "hawaiian" | "strombolian" | "vulcanian" | "plinian" | "phreatomagmatic";

export function explosivity(e: EruptionStyle): number {
  const m: Record<EruptionStyle, number> = {
    hawaiian: 2, strombolian: 4, vulcanian: 7, plinian: 10, phreatomagmatic: 8,
  };
  return m[e];
}

export function columnHeight(e: EruptionStyle): number {
  const m: Record<EruptionStyle, number> = {
    hawaiian: 2, strombolian: 4, vulcanian: 6, plinian: 10, phreatomagmatic: 7,
  };
  return m[e];
}

export function lavaOutput(e: EruptionStyle): number {
  const m: Record<EruptionStyle, number> = {
    hawaiian: 10, strombolian: 7, vulcanian: 4, plinian: 3, phreatomagmatic: 5,
  };
  return m[e];
}

export function ashFallout(e: EruptionStyle): number {
  const m: Record<EruptionStyle, number> = {
    hawaiian: 1, strombolian: 4, vulcanian: 7, plinian: 10, phreatomagmatic: 8,
  };
  return m[e];
}

export function hazardRadius(e: EruptionStyle): number {
  const m: Record<EruptionStyle, number> = {
    hawaiian: 4, strombolian: 5, vulcanian: 7, plinian: 10, phreatomagmatic: 8,
  };
  return m[e];
}

export function continuous(e: EruptionStyle): boolean {
  const m: Record<EruptionStyle, boolean> = {
    hawaiian: true, strombolian: true, vulcanian: false, plinian: false, phreatomagmatic: false,
  };
  return m[e];
}

export function involvesWater(e: EruptionStyle): boolean {
  const m: Record<EruptionStyle, boolean> = {
    hawaiian: false, strombolian: false, vulcanian: false, plinian: false, phreatomagmatic: true,
  };
  return m[e];
}

export function veiRange(e: EruptionStyle): string {
  const m: Record<EruptionStyle, string> = {
    hawaiian: "vei_0_1", strombolian: "vei_1_2",
    vulcanian: "vei_2_4", plinian: "vei_4_8",
    phreatomagmatic: "vei_2_6",
  };
  return m[e];
}

export function famousExample(e: EruptionStyle): string {
  const m: Record<EruptionStyle, string> = {
    hawaiian: "kilauea_1983", strombolian: "stromboli_continuous",
    vulcanian: "sakurajima_regular", plinian: "vesuvius_79ad",
    phreatomagmatic: "surtsey_1963",
  };
  return m[e];
}

export function eruptionStyles(): EruptionStyle[] {
  return ["hawaiian", "strombolian", "vulcanian", "plinian", "phreatomagmatic"];
}
