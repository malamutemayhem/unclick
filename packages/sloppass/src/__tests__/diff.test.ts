import { describe, expect, it } from "vitest";
import { sourceFilesFromUnifiedDiff } from "../diff.js";

describe("SlopPass unified diff parser", () => {
  it("extracts added lines with their new-file line number offset", () => {
    const files = sourceFilesFromUnifiedDiff([
      "diff --git a/src/example.ts b/src/example.ts",
      "--- a/src/example.ts",
      "+++ b/src/example.ts",
      "@@ -10,6 +10,7 @@ export function run() {",
      " const kept = true;",
      "+const value: any = eval(input);",
      " return kept;",
    ].join("\n"));

    expect(files).toEqual([
      {
        path: "src/example.ts",
        content: "\nconst value: any = eval(input);\n",
        start_line: 10,
      },
    ]);
  });

  it("ignores blank-only additions", () => {
    const files = sourceFilesFromUnifiedDiff([
      "diff --git a/src/example.ts b/src/example.ts",
      "--- a/src/example.ts",
      "+++ b/src/example.ts",
      "@@ -1 +1 @@",
      "+",
    ].join("\n"));

    expect(files).toEqual([]);
  });
});
