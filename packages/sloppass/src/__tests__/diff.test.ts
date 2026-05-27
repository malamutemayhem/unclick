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

  it("normalizes timestamped paths and clamps unusual zero starts", () => {
    const files = sourceFilesFromUnifiedDiff([
      "diff --git a/src/time.ts b/src/time.ts",
      "--- a/src/time.ts\t2026-05-27",
      "+++ b/src/time.ts\t2026-05-27",
      "@@ -0,0 +0,2 @@",
      "+const value: any = 1;",
    ].join("\n"));

    expect(files).toEqual([
      {
        path: "src/time.ts",
        content: "const value: any = 1;",
        start_line: 1,
      },
    ]);
  });

  it("normalizes quoted git paths with spaces", () => {
    const files = sourceFilesFromUnifiedDiff([
      'diff --git "a/src/file with space.ts" "b/src/file with space.ts"',
      '--- "a/src/file with space.ts"',
      '+++ "b/src/file with space.ts"',
      "@@ -4,6 +4,7 @@ export function spaced() {",
      "+const value: any = 1;",
    ].join("\n"));

    expect(files).toEqual([
      {
        path: "src/file with space.ts",
        content: "const value: any = 1;",
        start_line: 4,
      },
    ]);
  });
});
