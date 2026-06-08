export interface LicenseInfo {
  id: string;
  name: string;
  category: "permissive" | "copyleft" | "weak-copyleft" | "proprietary" | "public-domain";
  osiApproved: boolean;
  commercial: boolean;
  patent: boolean;
}

const LICENSE_DB: LicenseInfo[] = [
  { id: "MIT", name: "MIT License", category: "permissive", osiApproved: true, commercial: true, patent: false },
  { id: "Apache-2.0", name: "Apache License 2.0", category: "permissive", osiApproved: true, commercial: true, patent: true },
  { id: "GPL-2.0", name: "GNU General Public License v2.0", category: "copyleft", osiApproved: true, commercial: true, patent: false },
  { id: "GPL-3.0", name: "GNU General Public License v3.0", category: "copyleft", osiApproved: true, commercial: true, patent: true },
  { id: "LGPL-2.1", name: "GNU Lesser General Public License v2.1", category: "weak-copyleft", osiApproved: true, commercial: true, patent: false },
  { id: "LGPL-3.0", name: "GNU Lesser General Public License v3.0", category: "weak-copyleft", osiApproved: true, commercial: true, patent: true },
  { id: "BSD-2-Clause", name: "BSD 2-Clause License", category: "permissive", osiApproved: true, commercial: true, patent: false },
  { id: "BSD-3-Clause", name: "BSD 3-Clause License", category: "permissive", osiApproved: true, commercial: true, patent: false },
  { id: "ISC", name: "ISC License", category: "permissive", osiApproved: true, commercial: true, patent: false },
  { id: "MPL-2.0", name: "Mozilla Public License 2.0", category: "weak-copyleft", osiApproved: true, commercial: true, patent: true },
  { id: "AGPL-3.0", name: "GNU Affero General Public License v3.0", category: "copyleft", osiApproved: true, commercial: true, patent: true },
  { id: "Unlicense", name: "The Unlicense", category: "public-domain", osiApproved: true, commercial: true, patent: false },
  { id: "CC0-1.0", name: "Creative Commons Zero v1.0 Universal", category: "public-domain", osiApproved: false, commercial: true, patent: false },
  { id: "WTFPL", name: "Do What The F*ck You Want To Public License", category: "permissive", osiApproved: false, commercial: true, patent: false },
  { id: "Zlib", name: "zlib License", category: "permissive", osiApproved: true, commercial: true, patent: false },
];

const DETECTION_PATTERNS: Array<{ pattern: RegExp; licenseId: string }> = [
  { pattern: /MIT License/i, licenseId: "MIT" },
  { pattern: /Permission is hereby granted, free of charge/i, licenseId: "MIT" },
  { pattern: /Apache License.*Version 2\.0/i, licenseId: "Apache-2.0" },
  { pattern: /GNU GENERAL PUBLIC LICENSE.*Version 3/i, licenseId: "GPL-3.0" },
  { pattern: /GNU GENERAL PUBLIC LICENSE.*Version 2/i, licenseId: "GPL-2.0" },
  { pattern: /GNU LESSER GENERAL PUBLIC LICENSE.*Version 3/i, licenseId: "LGPL-3.0" },
  { pattern: /GNU LESSER GENERAL PUBLIC LICENSE.*Version 2\.1/i, licenseId: "LGPL-2.1" },
  { pattern: /GNU AFFERO GENERAL PUBLIC LICENSE/i, licenseId: "AGPL-3.0" },
  { pattern: /BSD 3-Clause/i, licenseId: "BSD-3-Clause" },
  { pattern: /BSD 2-Clause/i, licenseId: "BSD-2-Clause" },
  { pattern: /ISC License/i, licenseId: "ISC" },
  { pattern: /Mozilla Public License.*2\.0/i, licenseId: "MPL-2.0" },
  { pattern: /This is free and unencumbered software/i, licenseId: "Unlicense" },
  { pattern: /CC0 1\.0 Universal/i, licenseId: "CC0-1.0" },
];

export class LicenseDetector {
  static detect(text: string): LicenseInfo | null {
    for (const { pattern, licenseId } of DETECTION_PATTERNS) {
      if (pattern.test(text)) {
        return LicenseDetector.getById(licenseId);
      }
    }
    return null;
  }

  static getById(id: string): LicenseInfo | null {
    return LICENSE_DB.find((l) => l.id === id) ?? null;
  }

  static getByName(name: string): LicenseInfo | null {
    const lower = name.toLowerCase();
    return LICENSE_DB.find((l) => l.name.toLowerCase().includes(lower)) ?? null;
  }

  static isCompatible(a: string, b: string): boolean {
    const licA = LicenseDetector.getById(a);
    const licB = LicenseDetector.getById(b);
    if (!licA || !licB) return false;

    if (licA.category === "public-domain" || licB.category === "public-domain") return true;
    if (licA.category === "permissive" && licB.category === "permissive") return true;
    if (licA.category === "copyleft" && licB.category === "copyleft") {
      return licA.id === licB.id;
    }
    if (licA.category === "permissive") return true;
    return false;
  }

  static byCategory(category: LicenseInfo["category"]): LicenseInfo[] {
    return LICENSE_DB.filter((l) => l.category === category);
  }

  static osiApproved(): LicenseInfo[] {
    return LICENSE_DB.filter((l) => l.osiApproved);
  }

  static withPatentGrant(): LicenseInfo[] {
    return LICENSE_DB.filter((l) => l.patent);
  }

  static all(): LicenseInfo[] {
    return [...LICENSE_DB];
  }

  static search(query: string): LicenseInfo[] {
    const lower = query.toLowerCase();
    return LICENSE_DB.filter(
      (l) => l.id.toLowerCase().includes(lower) || l.name.toLowerCase().includes(lower),
    );
  }
}
