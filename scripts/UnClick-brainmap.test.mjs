import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import process from "node:process";

import {
  GENERATED_DATA_PATH,
  GENERATED_PATH,
  generateBrainmap,
  generateBrainmapData,
} from "./UnClick-brainmap.mjs";

describe("UnClick ecosystem Brainmap", () => {
  it("keeps the generated artifact fresh", async () => {
    const generated = await generateBrainmap({ root: process.cwd() });
    const saved = (await readFile(GENERATED_PATH, "utf8")).replace(/\r\n/g, "\n");
    assert.equal(saved, generated);
  });

  it("keeps the generated visual tree data fresh", async () => {
    const generated = await generateBrainmapData({ root: process.cwd() });
    const saved = (await readFile(GENERATED_DATA_PATH, "utf8")).replace(/\r\n/g, "\n");
    assert.equal(saved, generated);
  });

  it("contains the load-bearing system sections", async () => {
    const generated = await generateBrainmap({ root: process.cwd() });
    for (const section of [
      "## Source Manifest",
      "## Brainmap Data Contract",
      "## Division Index",
      "## UnClick Structure",
      "## Pages and Meaning",
      "## Tool Families and Meaning",
      "## Tool and Worker Tree",
      "## Public/Internal Alias Table",
      "## Rooms List",
      "## Workers List",
      "## Safety Rules",
      "## Launchpad Route",
      "## Ledger Rules",
      "## CI and Stale Guard",
    ]) {
      assert.match(generated, new RegExp(section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  it("attaches meaning to pages, tools, workers, and safety lanes", async () => {
    const generated = await generateBrainmap({ root: process.cwd() });
    assert.match(generated, /\| \/admin\/brainmap \| Admin Brainmap \| Generated ecosystem map/);
    assert.match(generated, /\| \/admin\/agents\/heartbeat \| Admin Seat Heartbeat \| Master heartbeat copy policy/);
    assert.match(generated, /\| NudgeOnly \| NudgeOnly low-token receipt bridge/);
    assert.match(generated, /\| IgniteOnly \| IgniteOnly verified worker wake packet bridge/);
    assert.match(generated, /\| Passes and gates \| fidelity gate \| CopyRoom \| Exact-copy room/);
    assert.match(generated, /\| Wrappers and protocols \| claim lifecycle \| SeatRelay \| Stale release/);
    assert.match(generated, /\| Coordinator \| Routes work/);
    assert.match(generated, /Admin-only surfaces use `RequireAdmin`/);
    assert.match(generated, /IgniteOnly can request worker wake packets only/);
    assert.match(generated, /Memory and Brainmap entries are pointers, not the runtime MASTER/);
  });

  it("records generated Brainmap guardrails for CI", async () => {
    const generated = await generateBrainmap({ root: process.cwd() });
    assert.match(generated, /node scripts\/UnClick-brainmap\.mjs --check/);
    assert.match(generated, /node --test scripts\/UnClick-brainmap\.test\.mjs/);
  });

  it("emits grouped inventory data for private admin onboarding", async () => {
    const data = JSON.parse(await generateBrainmapData({ root: process.cwd() }));
    assert.equal(data.schema_version, "brainmap-v2");
    assert.equal(data.owner_visibility.owner_email, "creativelead@malamutemayhem.com");
    assert.ok(data.counts.inventory > 100);

    for (const division of [
      "Admin surfaces",
      "Tools",
      "Rooms",
      "Workers and seats",
      "Passes and gates",
      "Wrappers and protocols",
      "Source of truth",
      "Modules and apps",
      "Launch and onboarding",
    ]) {
      assert.ok(data.divisions.some((item) => item.name === division), `${division} division missing`);
    }

    assert.ok(data.inventory.some((item) => item.name === "SeatRelay" && item.division === "Wrappers and protocols"));
    assert.ok(data.inventory.some((item) => item.name === "CopyRoom" && item.division === "Passes and gates"));
    assert.ok(data.inventory.some((item) => item.name === "JobSmith" && item.division === "Modules and apps"));
    assert.ok(data.inventory.some((item) => item.name === "Ecosystem Brainmap" && item.route === "/admin/brainmap"));
  });
});
