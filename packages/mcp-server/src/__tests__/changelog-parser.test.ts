import { describe, it, expect } from "vitest";
import { ChangelogParser } from "../changelog-parser.js";

const SAMPLE = `# Changelog

## [2.0.0] - 2025-01-15

### Added
- New feature A
- New feature B

### Fixed
- Bug fix X

## [1.1.0] - 2024-12-01

### Changed
- Updated dependency Y

## [1.0.0] - 2024-11-01

### Added
- Initial release
`;

describe("ChangelogParser", () => {
  it("parses entries with versions", () => {
    const entries = ChangelogParser.parse(SAMPLE);
    expect(entries).toHaveLength(3);
    expect(entries[0].version).toBe("2.0.0");
    expect(entries[1].version).toBe("1.1.0");
    expect(entries[2].version).toBe("1.0.0");
  });

  it("parses dates", () => {
    const entries = ChangelogParser.parse(SAMPLE);
    expect(entries[0].date).toBe("2025-01-15");
  });

  it("parses sections and items", () => {
    const entries = ChangelogParser.parse(SAMPLE);
    expect(entries[0].sections["Added"]).toEqual(["New feature A", "New feature B"]);
    expect(entries[0].sections["Fixed"]).toEqual(["Bug fix X"]);
  });

  it("gets specific version", () => {
    const entry = ChangelogParser.getVersion(SAMPLE, "1.1.0");
    expect(entry).not.toBeNull();
    expect(entry!.sections["Changed"]).toEqual(["Updated dependency Y"]);
  });

  it("returns null for missing version", () => {
    expect(ChangelogParser.getVersion(SAMPLE, "9.9.9")).toBeNull();
  });

  it("gets latest version", () => {
    const latest = ChangelogParser.getLatest(SAMPLE);
    expect(latest).not.toBeNull();
    expect(latest!.version).toBe("2.0.0");
  });

  it("lists all versions", () => {
    expect(ChangelogParser.versions(SAMPLE)).toEqual(["2.0.0", "1.1.0", "1.0.0"]);
  });

  it("collects all changes", () => {
    const changes = ChangelogParser.allChanges(SAMPLE);
    expect(changes).toContain("New feature A");
    expect(changes).toContain("Bug fix X");
    expect(changes).toContain("Initial release");
  });

  it("generates changelog text", () => {
    const entries = ChangelogParser.parse(SAMPLE);
    const output = ChangelogParser.generate(entries);
    expect(output).toContain("## [2.0.0] - 2025-01-15");
    expect(output).toContain("### Added");
    expect(output).toContain("- New feature A");
  });

  it("lists unique section names", () => {
    const names = ChangelogParser.sectionNames(SAMPLE);
    expect(names).toContain("Added");
    expect(names).toContain("Fixed");
    expect(names).toContain("Changed");
  });
});
