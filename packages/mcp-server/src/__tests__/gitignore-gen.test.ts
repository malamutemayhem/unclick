import { describe, it, expect } from "vitest";
import { GitignoreGen } from "../gitignore-gen.js";

describe("GitignoreGen", () => {
  it("builds custom gitignore", () => {
    const result = new GitignoreGen()
      .section("Build", ["dist/", "build/"])
      .section("IDE", [".idea/"])
      .build();
    expect(result).toContain("# Build");
    expect(result).toContain("dist/");
    expect(result).toContain("# IDE");
  });

  it("adds individual patterns", () => {
    const result = new GitignoreGen().add("*.log", "*.tmp").build();
    expect(result).toContain("*.log");
    expect(result).toContain("*.tmp");
  });

  it("generates Node.js gitignore", () => {
    const result = GitignoreGen.node();
    expect(result).toContain("node_modules/");
    expect(result).toContain(".env");
    expect(result).toContain("coverage/");
  });

  it("generates Python gitignore", () => {
    const result = GitignoreGen.python();
    expect(result).toContain("__pycache__/");
    expect(result).toContain("venv/");
    expect(result).toContain(".pytest_cache/");
  });

  it("generates Go gitignore", () => {
    const result = GitignoreGen.go();
    expect(result).toContain("*.exe");
    expect(result).toContain("vendor/");
  });

  it("generates Rust gitignore", () => {
    const result = GitignoreGen.rust();
    expect(result).toContain("target/");
  });

  it("generates React gitignore", () => {
    const result = GitignoreGen.react();
    expect(result).toContain("node_modules/");
    expect(result).toContain(".env");
    expect(result).toContain("build/");
  });

  it("merges gitignore files", () => {
    const merged = GitignoreGen.merge(
      "# Section 1\nnode_modules/\n*.log\n",
      "# Section 2\n*.log\ndist/\n",
    );
    expect(merged).toContain("node_modules/");
    expect(merged).toContain("dist/");
    const logCount = (merged.match(/\*\.log/g) || []).length;
    expect(logCount).toBe(1);
  });
});
