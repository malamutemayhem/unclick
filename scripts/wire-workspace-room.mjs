// One-shot wiring for File Workspace Increment 2: registers the workspace_*
// tools by inserting 3 small anchored edits into packages/mcp-server/src/server.ts.
// Run server-side (in CI) so the 108KB server.ts never has to be re-emitted by a
// model. Idempotent: a second run is a no-op. Removed from the feature PR by the
// workflow once it has done its job.
import { readFileSync, writeFileSync } from "node:fs";

const p = process.argv[2] || "packages/mcp-server/src/server.ts";
let s = readFileSync(p, "utf8");
if (s.includes("./workspace-tool.js")) {
  console.log("already wired; nothing to do");
  process.exit(0);
}

const edits = [
  {
    // 1. import the connector next to the other protocol imports
    anchor: `import { getCommonSensePassProtocol } from "./commonsensepass-protocol.js";`,
    add: `\nimport { WORKSPACE_VISIBLE_TOOLS, handleWorkspaceTool } from "./workspace-tool.js";`,
  },
  {
    // 2. advertise the tools in the visible surface
    anchor: `export const VISIBLE_TOOLS = [`,
    add: `\n  ...WORKSPACE_VISIBLE_TOOLS,`,
  },
  {
    // 3. dispatch workspace_* first, before any other tool check
    anchor: `    const args = (rawArgs ?? {}) as Record<string, unknown>;`,
    add: `\n\n    const __workspaceResult = await handleWorkspaceTool(name, args);\n    if (__workspaceResult) return __workspaceResult;`,
  },
];

for (const { anchor } of edits) {
  const n = s.split(anchor).length - 1;
  if (n !== 1) {
    console.error(`ANCHOR not unique (${n}x): ${anchor.slice(0, 60)}`);
    process.exit(1);
  }
}
for (const { anchor, add } of edits) s = s.replace(anchor, anchor + add);

for (const must of ["./workspace-tool.js", "...WORKSPACE_VISIBLE_TOOLS", "handleWorkspaceTool(name, args)"]) {
  if (!s.includes(must)) {
    console.error("FAILED to apply:", must);
    process.exit(1);
  }
}
writeFileSync(p, s);
console.log("wired server.ts (3 insertions applied)");
