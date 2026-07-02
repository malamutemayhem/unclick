import { gmailSearch } from "./gmail-tool.js";
import { driveSearch } from "./google-drive-tool.js";
import { dropboxListFolder } from "./dropbox-tool.js";
import { onedriveList } from "./onedrive-tool.js";
import { higgsfield_generate_image } from "./higgsfield-tool.js";

interface ServiceResult {
  service: string;
  success: boolean;
  data: unknown;
}

async function runService(service: string, fn: () => Promise<unknown>): Promise<ServiceResult> {
  try {
    const data = await fn();
    const hasError = data && typeof data === "object" && "error" in data;
    return { service, success: !hasError, data };
  } catch (err) {
    return { service, success: false, data: { error: err instanceof Error ? err.message : String(err) } };
  }
}

async function main() {
  console.log("=== UnClick Multi-Service Demo ===\n");

  const results: ServiceResult[] = [];

  console.log("[1/5] Gmail - basic inbox check...");
  results.push(await runService("Gmail", () => gmailSearch({ query: "is:inbox", limit: 5 })));

  console.log("[2/5] Google Drive - root contents...");
  results.push(await runService("Google Drive", () => driveSearch({ limit: 10 })));

  console.log("[3/5] Dropbox - root folder listing...");
  results.push(await runService("Dropbox", () => dropboxListFolder({ path: "/" })));

  console.log("[4/5] OneDrive - root contents...");
  results.push(await runService("OneDrive", () => onedriveList({})));

  console.log("[5/5] Higgsfield - generating dog image in a forest...");
  results.push(await runService("Higgsfield", () =>
    higgsfield_generate_image({ prompt: "A happy golden retriever dog running through a lush green forest with sunlight filtering through the trees" }),
  ));

  console.log("\n=== Results ===\n");
  for (const r of results) {
    const status = r.success ? "OK" : "NEEDS SETUP";
    console.log(`[${status}] ${r.service}`);
    console.log(JSON.stringify(r.data, null, 2));
    console.log("");
  }

  const connected = results.filter((r) => r.success).length;
  console.log(`\n${connected}/${results.length} services connected.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
