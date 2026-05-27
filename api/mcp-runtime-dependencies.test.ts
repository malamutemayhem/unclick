import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("/api/mcp runtime workspace dependencies", () => {
  const rootPackageJson = JSON.parse(
    readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"),
  ) as {
    dependencies?: Record<string, string>;
    scripts?: Record<string, string>;
  };

  it("keeps CommonSensePass available to the Vercel serverless bundle", () => {
    expect(rootPackageJson.dependencies?.["@unclick/commonsensepass"]).toBe("*");
    expect(rootPackageJson.scripts?.build).toMatch(
      /build --workspace=@unclick\/commonsensepass/,
    );
    expect(rootPackageJson.scripts?.["build:dev"]).toMatch(
      /build --workspace=@unclick\/commonsensepass/,
    );
  });
});
