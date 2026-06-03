export type XGateRuntimeGate = (ctx: unknown) => unknown;

export interface XGateGateManifestEntry {
  key: string;
  part: number;
  gateName: string;
  importPath: string;
  importModule: () => Promise<Record<string, unknown>>;
}

export interface XGateMissingGate {
  key: string;
  part: number;
  gateName: string;
  importPath: string;
  reason: string;
}

export interface XGateRegistryLoad {
  gates: XGateRuntimeGate[];
  loaded: Array<Pick<XGateGateManifestEntry, "key" | "part" | "gateName" | "importPath">>;
  missing: XGateMissingGate[];
}

function errorReason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isGate(value: unknown): value is XGateRuntimeGate {
  return typeof value === "function";
}

export const XGATE_GATE_MANIFEST: XGateGateManifestEntry[] = [
  {
    key: "secret",
    part: 2,
    gateName: "secretGate",
    importPath: "./gates/secret-gate.js",
    importModule: async () => {
      // TODO XGate Part 2 is optional until the parallel branch lands.
      const path = "./gates/secret-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
  {
    key: "command",
    part: 5,
    gateName: "commandGate",
    importPath: "./gates/command-gate.js",
    importModule: async () => {
      // TODO XGate Part 5 is optional until the parallel branch lands.
      const path = "./gates/command-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
  {
    key: "git",
    part: 4,
    gateName: "gitGate",
    importPath: "./gates/git-gate.js",
    importModule: async () => {
      // TODO XGate Part 4 is optional until the parallel branch lands.
      const path = "./gates/git-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
  {
    key: "data",
    part: 3,
    gateName: "dataGate",
    importPath: "./gates/data-gate.js",
    importModule: async () => {
      // TODO XGate Part 3 is optional until the parallel branch lands.
      const path = "./gates/data-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
  {
    key: "ship",
    part: 6,
    gateName: "shipGate",
    importPath: "./gates/ship-gate.js",
    importModule: async () => {
      // TODO XGate Part 6 is optional until the parallel branch lands.
      const path = "./gates/ship-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
  {
    key: "scope",
    part: 7,
    gateName: "scopeGate",
    importPath: "./gates/scope-gate.js",
    importModule: async () => {
      // TODO XGate Part 7 is optional until the parallel branch lands.
      const path = "./gates/scope-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
  {
    key: "spend",
    part: 7,
    gateName: "spendGate",
    importPath: "./gates/spend-gate.js",
    importModule: async () => {
      // TODO XGate Part 7 is optional until the parallel branch lands.
      const path = "./gates/spend-gate.js";
      return import(/* @vite-ignore */ path);
    },
  },
];

export async function loadXGateRegistry(
  manifest: XGateGateManifestEntry[] = XGATE_GATE_MANIFEST,
): Promise<XGateRegistryLoad> {
  const gates: XGateRuntimeGate[] = [];
  const loaded: XGateRegistryLoad["loaded"] = [];
  const missing: XGateMissingGate[] = [];

  for (const entry of manifest) {
    try {
      const mod = await entry.importModule();
      const gate = mod[entry.gateName];
      if (!isGate(gate)) {
        missing.push({
          key: entry.key,
          part: entry.part,
          gateName: entry.gateName,
          importPath: entry.importPath,
          reason: `Missing function export ${entry.gateName}`,
        });
        continue;
      }

      gates.push(gate);
      loaded.push({
        key: entry.key,
        part: entry.part,
        gateName: entry.gateName,
        importPath: entry.importPath,
      });
    } catch (error) {
      missing.push({
        key: entry.key,
        part: entry.part,
        gateName: entry.gateName,
        importPath: entry.importPath,
        reason: errorReason(error),
      });
    }
  }

  return { gates, loaded, missing };
}
