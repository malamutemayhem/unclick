export class GitignoreGen {
  private patterns: string[] = [];
  private sections: Map<string, string[]> = new Map();

  section(name: string, patterns: string[]): this {
    this.sections.set(name, patterns);
    return this;
  }

  add(...patterns: string[]): this {
    this.patterns.push(...patterns);
    return this;
  }

  build(): string {
    const lines: string[] = [];
    if (this.patterns.length > 0) {
      lines.push(...this.patterns);
    }
    for (const [name, pats] of this.sections) {
      if (lines.length > 0) lines.push("");
      lines.push(`# ${name}`);
      lines.push(...pats);
    }
    return lines.join("\n") + "\n";
  }

  static node(): string {
    return new GitignoreGen()
      .section("Dependencies", ["node_modules/", "bower_components/"])
      .section("Build", ["dist/", "build/", "out/", ".next/", ".nuxt/"])
      .section("Environment", [".env", ".env.local", ".env.*.local"])
      .section("IDE", [".idea/", ".vscode/", "*.swp", "*.swo", "*~"])
      .section("OS", [".DS_Store", "Thumbs.db", "*.log"])
      .section("Coverage", ["coverage/", ".nyc_output/"])
      .build();
  }

  static python(): string {
    return new GitignoreGen()
      .section("Python", [
        "__pycache__/", "*.py[cod]", "*$py.class", "*.so",
        "*.egg-info/", "dist/", "build/", "eggs/",
      ])
      .section("Virtual Environment", ["venv/", ".venv/", "env/", ".env/"])
      .section("IDE", [".idea/", ".vscode/", "*.swp"])
      .section("Testing", [".tox/", ".pytest_cache/", "htmlcov/", ".coverage"])
      .section("Distribution", ["*.egg", "*.whl", "MANIFEST"])
      .build();
  }

  static go(): string {
    return new GitignoreGen()
      .section("Binaries", ["*.exe", "*.exe~", "*.dll", "*.so", "*.dylib"])
      .section("Test", ["*.test", "*.out", "coverage.txt"])
      .section("Vendor", ["vendor/"])
      .section("IDE", [".idea/", ".vscode/", "*.swp"])
      .section("OS", [".DS_Store", "Thumbs.db"])
      .build();
  }

  static rust(): string {
    return new GitignoreGen()
      .section("Build", ["target/", "**/*.rs.bk"])
      .section("IDE", [".idea/", ".vscode/", "*.swp"])
      .section("OS", [".DS_Store", "Thumbs.db"])
      .build();
  }

  static react(): string {
    return new GitignoreGen()
      .section("Dependencies", ["node_modules/"])
      .section("Build", ["build/", "dist/", ".next/"])
      .section("Environment", [".env", ".env.local", ".env.development.local", ".env.test.local", ".env.production.local"])
      .section("IDE", [".idea/", ".vscode/", "*.swp"])
      .section("Testing", ["coverage/"])
      .section("Misc", [".DS_Store", "*.log", "npm-debug.log*", "yarn-debug.log*", "yarn-error.log*"])
      .build();
  }

  static merge(...gitignores: string[]): string {
    const allPatterns = new Set<string>();
    for (const content of gitignores) {
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          allPatterns.add(trimmed);
        }
      }
    }
    return [...allPatterns].sort().join("\n") + "\n";
  }
}
