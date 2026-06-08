export interface StatusInfo {
  code: number;
  phrase: string;
  description: string;
  category: string;
}

export class HttpStatus {
  private static readonly STATUSES: Record<number, [string, string]> = {
    100: ["Continue", "Server received headers, client should proceed"],
    101: ["Switching Protocols", "Server switching to requested protocol"],
    200: ["OK", "Request succeeded"],
    201: ["Created", "Resource created successfully"],
    202: ["Accepted", "Request accepted for processing"],
    204: ["No Content", "Success with no response body"],
    206: ["Partial Content", "Partial resource returned"],
    301: ["Moved Permanently", "Resource permanently relocated"],
    302: ["Found", "Resource temporarily at different URI"],
    304: ["Not Modified", "Resource not changed since last request"],
    307: ["Temporary Redirect", "Temporary redirect preserving method"],
    308: ["Permanent Redirect", "Permanent redirect preserving method"],
    400: ["Bad Request", "Malformed request syntax"],
    401: ["Unauthorized", "Authentication required"],
    403: ["Forbidden", "Server refuses to authorize"],
    404: ["Not Found", "Resource not found"],
    405: ["Method Not Allowed", "HTTP method not supported"],
    408: ["Request Timeout", "Server timed out waiting for request"],
    409: ["Conflict", "Request conflicts with current state"],
    410: ["Gone", "Resource no longer available"],
    413: ["Payload Too Large", "Request body exceeds limit"],
    415: ["Unsupported Media Type", "Media type not supported"],
    418: ["I'm a Teapot", "Server refuses to brew coffee"],
    422: ["Unprocessable Entity", "Semantic errors in request"],
    429: ["Too Many Requests", "Rate limit exceeded"],
    500: ["Internal Server Error", "Unexpected server error"],
    501: ["Not Implemented", "Server does not support functionality"],
    502: ["Bad Gateway", "Invalid response from upstream"],
    503: ["Service Unavailable", "Server temporarily unavailable"],
    504: ["Gateway Timeout", "Upstream server timed out"],
  };

  static getInfo(code: number): StatusInfo | null {
    const entry = HttpStatus.STATUSES[code];
    if (!entry) return null;
    return {
      code,
      phrase: entry[0],
      description: entry[1],
      category: HttpStatus.category(code),
    };
  }

  static phrase(code: number): string {
    const entry = HttpStatus.STATUSES[code];
    return entry ? entry[0] : "Unknown";
  }

  static category(code: number): string {
    if (code >= 100 && code < 200) return "Informational";
    if (code >= 200 && code < 300) return "Success";
    if (code >= 300 && code < 400) return "Redirection";
    if (code >= 400 && code < 500) return "Client Error";
    if (code >= 500 && code < 600) return "Server Error";
    return "Unknown";
  }

  static isSuccess(code: number): boolean {
    return code >= 200 && code < 300;
  }

  static isRedirect(code: number): boolean {
    return code >= 300 && code < 400;
  }

  static isClientError(code: number): boolean {
    return code >= 400 && code < 500;
  }

  static isServerError(code: number): boolean {
    return code >= 500 && code < 600;
  }

  static isError(code: number): boolean {
    return code >= 400;
  }

  static isRetryable(code: number): boolean {
    return [408, 429, 500, 502, 503, 504].includes(code);
  }

  static list(filterCategory?: string): StatusInfo[] {
    return Object.entries(HttpStatus.STATUSES)
      .map(([code, [phrase, description]]) => ({
        code: parseInt(code),
        phrase,
        description,
        category: HttpStatus.category(parseInt(code)),
      }))
      .filter((s) => !filterCategory || s.category === filterCategory);
  }

  static byPhrase(phrase: string): number | null {
    const lower = phrase.toLowerCase();
    for (const [code, [p]] of Object.entries(HttpStatus.STATUSES)) {
      if (p.toLowerCase() === lower) return parseInt(code);
    }
    return null;
  }
}
