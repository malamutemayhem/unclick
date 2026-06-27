export interface ChangelogEntry {
  version: string;
  date?: string;
  sections: Record<string, string[]>;
  raw: string;
}

export class ChangelogParser {
  static parse(content: string): ChangelogEntry[] {
    const entries: ChangelogEntry[] = [];
    const lines = content.split("\n");
    let current: ChangelogEntry | null = null;
    let currentSection = "";

    for (const line of lines) {
      const versionMatch = line.match(/^##\s+\[?(\d+\.\d+\.\d+[^\]]*)\]?\s*(?:-\s*(.+))?$/);
      if (versionMatch) {
        if (current) entries.push(current);
        current = {
          version: versionMatch[1].trim(),
          date: versionMatch[2]?.trim(),
          sections: {},
          raw: line,
        };
        currentSection = "";
        continue;
      }

      if (!current) continue;

      const sectionMatch = line.match(/^###\s+(.+)$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1].trim();
        if (!current.sections[currentSection]) {
          current.sections[currentSection] = [];
        }
        continue;
      }

      const itemMatch = line.match(/^[-*]\s+(.+)$/);
      if (itemMatch && current) {
        if (!currentSection) currentSection = "Changes";
        if (!current.sections[currentSection]) {
          current.sections[currentSection] = [];
        }
        current.sections[currentSection].push(itemMatch[1].trim());
      }
    }

    if (current) entries.push(current);
    return entries;
  }

  static getVersion(content: string, version: string): ChangelogEntry | null {
    const entries = ChangelogParser.parse(content);
    return entries.find((e) => e.version === version) ?? null;
  }

  static getLatest(content: string): ChangelogEntry | null {
    const entries = ChangelogParser.parse(content);
    return entries[0] ?? null;
  }

  static versions(content: string): string[] {
    return ChangelogParser.parse(content).map((e) => e.version);
  }

  static allChanges(content: string): string[] {
    const entries = ChangelogParser.parse(content);
    const changes: string[] = [];
    for (const entry of entries) {
      for (const items of Object.values(entry.sections)) {
        changes.push(...items);
      }
    }
    return changes;
  }

  static generate(entries: ChangelogEntry[]): string {
    const lines: string[] = ["# Changelog", ""];
    for (const entry of entries) {
      const datePart = entry.date ? ` - ${entry.date}` : "";
      lines.push(`## [${entry.version}]${datePart}`);
      lines.push("");
      for (const [section, items] of Object.entries(entry.sections)) {
        lines.push(`### ${section}`);
        lines.push("");
        for (const item of items) {
          lines.push(`- ${item}`);
        }
        lines.push("");
      }
    }
    return lines.join("\n");
  }

  static sectionNames(content: string): string[] {
    const entries = ChangelogParser.parse(content);
    const names = new Set<string>();
    for (const entry of entries) {
      for (const section of Object.keys(entry.sections)) {
        names.add(section);
      }
    }
    return Array.from(names);
  }
}
