// Validates generated standalone MCP registry manifests before CI publishes them.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STANDALONE_ROOT = path.resolve(__dirname, "../../standalone");
const MAX_DESCRIPTION_LENGTH = 100;

const failures = [];

for (const entry of fs.readdirSync(STANDALONE_ROOT, { withFileTypes: true })) {
  if (!entry.isDirectory() || !entry.name.endsWith("-mcp")) continue;

  const dir = path.join(STANDALONE_ROOT, entry.name);
  const serverPath = path.join(dir, "server.json");
  const packagePath = path.join(dir, "package.json");

  if (!fs.existsSync(serverPath)) {
    failures.push(`${entry.name}: missing server.json`);
    continue;
  }
  if (!fs.existsSync(packagePath)) {
    failures.push(`${entry.name}: missing package.json`);
    continue;
  }

  const server = JSON.parse(fs.readFileSync(serverPath, "utf8"));
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const description = String(server.description ?? "");

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    failures.push(`${entry.name}: server.json description is ${description.length} chars, max ${MAX_DESCRIPTION_LENGTH}`);
  }

  const npmPackage = server.packages?.find((item) => item?.registryType === "npm");
  if (!npmPackage) {
    failures.push(`${entry.name}: server.json missing npm package entry`);
  } else if (npmPackage.identifier !== pkg.name) {
    failures.push(`${entry.name}: server.json npm identifier ${npmPackage.identifier} does not match package.json ${pkg.name}`);
  }

  if (pkg.mcpName !== server.name) {
    failures.push(`${entry.name}: package.json mcpName ${pkg.mcpName} does not match server.json ${server.name}`);
  }
}

if (failures.length > 0) {
  console.error("Standalone registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Standalone registry manifests are valid.");
