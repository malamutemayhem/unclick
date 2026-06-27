export interface Cookie {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export class CookieJar {
  private cookies: Map<string, Cookie> = new Map();

  set(cookie: Cookie): void {
    const key = CookieJar.cookieKey(cookie.name, cookie.domain, cookie.path);
    this.cookies.set(key, { ...cookie });
  }

  get(name: string, domain?: string, path?: string): Cookie | null {
    const key = CookieJar.cookieKey(name, domain, path);
    return this.cookies.get(key) ?? null;
  }

  remove(name: string, domain?: string, path?: string): boolean {
    const key = CookieJar.cookieKey(name, domain, path);
    return this.cookies.delete(key);
  }

  getForDomain(domain: string): Cookie[] {
    const results: Cookie[] = [];
    for (const cookie of this.cookies.values()) {
      if (!cookie.domain || cookie.domain === domain || domain.endsWith(`.${cookie.domain}`)) {
        results.push({ ...cookie });
      }
    }
    return results;
  }

  getForUrl(domain: string, path: string, isSecure = false): Cookie[] {
    return this.getForDomain(domain).filter((c) => {
      if (c.path && !path.startsWith(c.path)) return false;
      if (c.secure && !isSecure) return false;
      return true;
    });
  }

  removeExpired(now?: number): number {
    const currentTime = now !== undefined ? now : Date.now();
    let removed = 0;
    for (const [key, cookie] of this.cookies.entries()) {
      if (cookie.expires !== undefined && cookie.expires < currentTime) {
        this.cookies.delete(key);
        removed++;
      }
    }
    return removed;
  }

  toCookieHeader(cookies: Cookie[]): string {
    return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
  }

  toSetCookieHeaders(): string[] {
    return Array.from(this.cookies.values()).map((c) => {
      let header = `${c.name}=${c.value}`;
      if (c.domain) header += `; Domain=${c.domain}`;
      if (c.path) header += `; Path=${c.path}`;
      if (c.expires !== undefined) header += `; Expires=${new Date(c.expires).toUTCString()}`;
      if (c.secure) header += "; Secure";
      if (c.httpOnly) header += "; HttpOnly";
      if (c.sameSite) header += `; SameSite=${c.sameSite}`;
      return header;
    });
  }

  size(): number {
    return this.cookies.size;
  }

  clear(): void {
    this.cookies.clear();
  }

  all(): Cookie[] {
    return Array.from(this.cookies.values()).map((c) => ({ ...c }));
  }

  names(): string[] {
    return Array.from(this.cookies.values()).map((c) => c.name);
  }

  static parse(cookieHeader: string): Array<{ name: string; value: string }> {
    return cookieHeader.split(";").map((pair) => {
      const eq = pair.indexOf("=");
      if (eq < 0) return { name: pair.trim(), value: "" };
      return { name: pair.slice(0, eq).trim(), value: pair.slice(eq + 1).trim() };
    });
  }

  private static cookieKey(name: string, domain?: string, path?: string): string {
    return `${name}|${domain || ""}|${path || "/"}`;
  }
}
