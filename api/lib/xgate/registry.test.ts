import { describe, expect, it } from "vitest";
import { XGATE_GATE_MANIFEST, loadXGateRegistry, type XGateGateManifestEntry } from "./registry.js";

describe("XGate registry", () => {
  it("keeps the integration gate order stable", () => {
    expect(XGATE_GATE_MANIFEST.map((entry) => entry.key)).toEqual([
      "secret",
      "command",
      "git",
      "data",
      "ship",
      "scope",
      "spend",
    ]);
  });

  it("loads available gates and reports missing optional gates", async () => {
    const gate = () => ({ verdict: "allow" });
    const manifest: XGateGateManifestEntry[] = [
      {
        key: "present",
        part: 2,
        gateName: "presentGate",
        importPath: "./present.js",
        importModule: async () => ({ presentGate: gate }),
      },
      {
        key: "missing",
        part: 3,
        gateName: "missingGate",
        importPath: "./missing.js",
        importModule: async () => ({}),
      },
    ];

    const registry = await loadXGateRegistry(manifest);

    expect(registry.gates).toEqual([gate]);
    expect(registry.loaded).toEqual([
      { key: "present", part: 2, gateName: "presentGate", importPath: "./present.js" },
    ]);
    expect(registry.missing).toEqual([
      expect.objectContaining({
        key: "missing",
        gateName: "missingGate",
        reason: "Missing function export missingGate",
      }),
    ]);
  });
});
