import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildCommonSensePassDogfoodReceipt } from "../packages/commonsensepass/dist/dogfood.js";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputPath = path.resolve(
  repoRoot,
  process.env.COMMONSENSEPASS_DOGFOOD_OUTPUT ?? "public/dogfood/commonsensepass-latest.json",
);

const receipt = buildCommonSensePassDogfoodReceipt({
  source: "commonsensepass package dogfood script",
});

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
console.log(`Wrote CommonSensePass dogfood receipt to ${path.relative(repoRoot, outputPath)}`);
