export interface HttpRequest {
  method: string;
  path: string;
  version: string;
  headers: Map<string, string>;
  body: string;
  queryParams: Map<string, string>;
}

export interface HttpResponse {
  statusCode: number;
  statusText: string;
  version: string;
  headers: Map<string, string>;
  body: string;
}

export function parseRequest(raw: string): HttpRequest | null {
  const lines = raw.split("\r\n");
  if (lines.length === 0) return null;

  const requestLine = lines[0].split(" ");
  if (requestLine.length < 3) return null;

  const method = requestLine[0];
  const fullPath = requestLine[1];
  const version = requestLine[2];

  const [path, queryString] = fullPath.split("?", 2);
  const queryParams = new Map<string, string>();
  if (queryString) {
    for (const pair of queryString.split("&")) {
      const [key, value] = pair.split("=", 2);
      if (key) queryParams.set(decodeURIComponent(key), decodeURIComponent(value ?? ""));
    }
  }

  const headers = new Map<string, string>();
  let bodyStart = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "") {
      bodyStart = i + 1;
      break;
    }
    const colonIdx = lines[i].indexOf(":");
    if (colonIdx > 0) {
      const key = lines[i].substring(0, colonIdx).trim().toLowerCase();
      const value = lines[i].substring(colonIdx + 1).trim();
      headers.set(key, value);
    }
  }

  const body = bodyStart >= 0 ? lines.slice(bodyStart).join("\r\n") : "";

  return { method, path, version, headers, body, queryParams };
}

export function parseResponse(raw: string): HttpResponse | null {
  const lines = raw.split("\r\n");
  if (lines.length === 0) return null;

  const statusLine = lines[0].split(" ", 3);
  if (statusLine.length < 3) return null;

  const version = statusLine[0];
  const statusCode = parseInt(statusLine[1], 10);
  const statusText = statusLine[2];

  const headers = new Map<string, string>();
  let bodyStart = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "") {
      bodyStart = i + 1;
      break;
    }
    const colonIdx = lines[i].indexOf(":");
    if (colonIdx > 0) {
      const key = lines[i].substring(0, colonIdx).trim().toLowerCase();
      const value = lines[i].substring(colonIdx + 1).trim();
      headers.set(key, value);
    }
  }

  const body = bodyStart >= 0 ? lines.slice(bodyStart).join("\r\n") : "";

  return { statusCode, statusText, version, headers, body };
}

export function buildRequest(method: string, path: string, headers: Record<string, string> = {}, body = ""): string {
  let raw = `${method} ${path} HTTP/1.1\r\n`;
  for (const [key, value] of Object.entries(headers)) {
    raw += `${key}: ${value}\r\n`;
  }
  if (body && !headers["content-length"] && !headers["Content-Length"]) {
    raw += `Content-Length: ${body.length}\r\n`;
  }
  raw += `\r\n${body}`;
  return raw;
}

export function buildResponse(statusCode: number, statusText: string, headers: Record<string, string> = {}, body = ""): string {
  let raw = `HTTP/1.1 ${statusCode} ${statusText}\r\n`;
  for (const [key, value] of Object.entries(headers)) {
    raw += `${key}: ${value}\r\n`;
  }
  if (body && !headers["content-length"] && !headers["Content-Length"]) {
    raw += `Content-Length: ${body.length}\r\n`;
  }
  raw += `\r\n${body}`;
  return raw;
}

export function getStatusText(code: number): string {
  const texts: Record<number, string> = {
    200: "OK", 201: "Created", 204: "No Content",
    301: "Moved Permanently", 302: "Found", 304: "Not Modified",
    400: "Bad Request", 401: "Unauthorized", 403: "Forbidden",
    404: "Not Found", 405: "Method Not Allowed", 409: "Conflict",
    429: "Too Many Requests",
    500: "Internal Server Error", 502: "Bad Gateway", 503: "Service Unavailable",
  };
  return texts[code] ?? "Unknown";
}

export class URLParser {
  protocol: string;
  host: string;
  port: number;
  path: string;
  query: Map<string, string>;
  fragment: string;

  constructor(url: string) {
    this.query = new Map();
    this.fragment = "";
    this.port = 80;

    const fragIdx = url.indexOf("#");
    if (fragIdx >= 0) {
      this.fragment = url.substring(fragIdx + 1);
      url = url.substring(0, fragIdx);
    }

    const protoIdx = url.indexOf("://");
    if (protoIdx >= 0) {
      this.protocol = url.substring(0, protoIdx);
      url = url.substring(protoIdx + 3);
    } else {
      this.protocol = "http";
    }

    if (this.protocol === "https") this.port = 443;

    const pathIdx = url.indexOf("/");
    const hostPart = pathIdx >= 0 ? url.substring(0, pathIdx) : url;
    const rest = pathIdx >= 0 ? url.substring(pathIdx) : "/";

    const colonIdx = hostPart.indexOf(":");
    if (colonIdx >= 0) {
      this.host = hostPart.substring(0, colonIdx);
      this.port = parseInt(hostPart.substring(colonIdx + 1), 10);
    } else {
      this.host = hostPart;
    }

    const qIdx = rest.indexOf("?");
    if (qIdx >= 0) {
      this.path = rest.substring(0, qIdx);
      const qs = rest.substring(qIdx + 1);
      for (const pair of qs.split("&")) {
        const [key, value] = pair.split("=", 2);
        if (key) this.query.set(decodeURIComponent(key), decodeURIComponent(value ?? ""));
      }
    } else {
      this.path = rest;
    }
  }

  toString(): string {
    let url = `${this.protocol}://${this.host}`;
    const defaultPort = this.protocol === "https" ? 443 : 80;
    if (this.port !== defaultPort) url += `:${this.port}`;
    url += this.path;
    if (this.query.size > 0) {
      const params = Array.from(this.query.entries()).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
      url += `?${params.join("&")}`;
    }
    if (this.fragment) url += `#${this.fragment}`;
    return url;
  }
}
