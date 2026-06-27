export type PrintProcess = "lithography" | "screen_print" | "etching" | "woodcut" | "digital";

export function detailResolution(proc: PrintProcess): number {
  const m: Record<PrintProcess, number> = {
    lithography: 9, screen_print: 5, etching: 10, woodcut: 4, digital: 8,
  };
  return m[proc];
}

export function colorLayers(proc: PrintProcess): number {
  const m: Record<PrintProcess, number> = {
    lithography: 8, screen_print: 10, etching: 3, woodcut: 2, digital: 10,
  };
  return m[proc];
}

export function editionSize(proc: PrintProcess): number {
  const m: Record<PrintProcess, number> = {
    lithography: 200, screen_print: 500, etching: 75, woodcut: 100, digital: 10000,
  };
  return m[proc];
}

export function setupTime(proc: PrintProcess): number {
  const m: Record<PrintProcess, number> = {
    lithography: 8, screen_print: 6, etching: 9, woodcut: 7, digital: 2,
  };
  return m[proc];
}

export function costPerPrint(proc: PrintProcess): number {
  const m: Record<PrintProcess, number> = {
    lithography: 50, screen_print: 15, etching: 80, woodcut: 30, digital: 5,
  };
  return m[proc];
}

export function handPrinted(proc: PrintProcess): boolean {
  const m: Record<PrintProcess, boolean> = {
    lithography: true, screen_print: true, etching: true, woodcut: true, digital: false,
  };
  return m[proc];
}

export function photographicSource(proc: PrintProcess): boolean {
  const m: Record<PrintProcess, boolean> = {
    lithography: true, screen_print: true, etching: false, woodcut: false, digital: true,
  };
  return m[proc];
}

export function bestApplication(proc: PrintProcess): string {
  const m: Record<PrintProcess, string> = {
    lithography: "fine_art", screen_print: "poster", etching: "illustration",
    woodcut: "book_art", digital: "commercial",
  };
  return m[proc];
}

export function collectorsValue(proc: PrintProcess): number {
  const m: Record<PrintProcess, number> = {
    lithography: 8, screen_print: 7, etching: 10, woodcut: 6, digital: 3,
  };
  return m[proc];
}

export function printProcesses(): PrintProcess[] {
  return ["lithography", "screen_print", "etching", "woodcut", "digital"];
}
