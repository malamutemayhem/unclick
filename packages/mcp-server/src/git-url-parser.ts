export interface GitUrl {
  protocol: string;
  host: string;
  owner: string;
  repo: string;
  filepath: string;
  ref: string;
  full: string;
}

export class GitUrlParser {
  static parse(url: string): GitUrl | null {
    const trimmed = url.trim();

    const sshMatch = trimmed.match(/^git@([^:]+):([^/]+)\/(.+?)(?:\.git)?$/);
    if (sshMatch) {
      return {
        protocol: "ssh",
        host: sshMatch[1],
        owner: sshMatch[2],
        repo: sshMatch[3],
        filepath: "",
        ref: "",
        full: trimmed,
      };
    }

    const httpsMatch = trimmed.match(
      /^(https?):\/\/([^/]+)\/([^/]+)\/([^/?.#]+?)(?:\.git)?(?:\/(?:(?:tree|blob)\/([^/]+)(?:\/(.+))?)?)?$/,
    );
    if (httpsMatch) {
      return {
        protocol: httpsMatch[1],
        host: httpsMatch[2],
        owner: httpsMatch[3],
        repo: httpsMatch[4],
        filepath: httpsMatch[6] || "",
        ref: httpsMatch[5] || "",
        full: trimmed,
      };
    }

    const simpleHttps = trimmed.match(/^(https?):\/\/([^/]+)\/([^/]+)\/([^/?.#]+?)(?:\.git)?$/);
    if (simpleHttps) {
      return {
        protocol: simpleHttps[1],
        host: simpleHttps[2],
        owner: simpleHttps[3],
        repo: simpleHttps[4],
        filepath: "",
        ref: "",
        full: trimmed,
      };
    }

    return null;
  }

  static toHttps(url: string): string | null {
    const parsed = GitUrlParser.parse(url);
    if (!parsed) return null;
    return `https://${parsed.host}/${parsed.owner}/${parsed.repo}`;
  }

  static toSsh(url: string): string | null {
    const parsed = GitUrlParser.parse(url);
    if (!parsed) return null;
    return `git@${parsed.host}:${parsed.owner}/${parsed.repo}.git`;
  }

  static toCloneUrl(url: string): string | null {
    const parsed = GitUrlParser.parse(url);
    if (!parsed) return null;
    return `https://${parsed.host}/${parsed.owner}/${parsed.repo}.git`;
  }

  static isGitUrl(url: string): boolean {
    return GitUrlParser.parse(url) !== null;
  }

  static owner(url: string): string | null {
    const parsed = GitUrlParser.parse(url);
    return parsed ? parsed.owner : null;
  }

  static repo(url: string): string | null {
    const parsed = GitUrlParser.parse(url);
    return parsed ? parsed.repo : null;
  }

  static sameRepo(a: string, b: string): boolean {
    const pa = GitUrlParser.parse(a);
    const pb = GitUrlParser.parse(b);
    if (!pa || !pb) return false;
    return pa.host === pb.host && pa.owner === pb.owner && pa.repo === pb.repo;
  }
}
