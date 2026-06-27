import { describe, it, expect } from "vitest";
import { DockerfileGen } from "../dockerfile-gen.js";

describe("DockerfileGen", () => {
  it("builds simple dockerfile", () => {
    const df = new DockerfileGen()
      .from("node:20")
      .workdir("/app")
      .copy(".", ".")
      .cmd(["node", "index.js"])
      .build();
    expect(df).toContain("FROM node:20");
    expect(df).toContain("WORKDIR /app");
    expect(df).toContain("COPY . .");
    expect(df).toContain('CMD ["node", "index.js"]');
  });

  it("supports multi-stage builds", () => {
    const df = new DockerfileGen()
      .from("node:20", "builder")
      .workdir("/app")
      .run("npm ci")
      .from("node:20-alpine")
      .copy("/app/dist", "/app", "builder")
      .build();
    expect(df).toContain("FROM node:20 AS builder");
    expect(df).toContain("COPY --from=builder");
  });

  it("supports env and expose", () => {
    const df = new DockerfileGen()
      .from("node:20")
      .env("NODE_ENV", "production")
      .expose(3000)
      .build();
    expect(df).toContain("ENV NODE_ENV=production");
    expect(df).toContain("EXPOSE 3000");
  });

  it("supports run multi", () => {
    const df = new DockerfileGen()
      .from("ubuntu")
      .runMulti(["apt-get update", "apt-get install -y curl"])
      .build();
    expect(df).toContain("&&");
  });

  it("supports healthcheck", () => {
    const df = new DockerfileGen()
      .from("node:20")
      .healthcheck("curl -f http://localhost:3000 || exit 1", "30s")
      .build();
    expect(df).toContain("HEALTHCHECK");
    expect(df).toContain("--interval=30s");
  });

  it("supports comments and blank lines", () => {
    const df = new DockerfileGen()
      .comment("Build stage")
      .from("node:20")
      .blank()
      .build();
    expect(df).toContain("# Build stage");
  });

  it("generates node app template", () => {
    const df = DockerfileGen.nodeApp();
    expect(df).toContain("FROM node:");
    expect(df).toContain("npm ci");
    expect(df).toContain("EXPOSE 3000");
  });

  it("generates python app template", () => {
    const df = DockerfileGen.pythonApp();
    expect(df).toContain("FROM python:");
    expect(df).toContain("pip install");
  });

  it("generates static site template", () => {
    const df = DockerfileGen.staticSite();
    expect(df).toContain("FROM nginx:");
    expect(df).toContain("EXPOSE 80");
  });

  it("supports user instruction", () => {
    const df = new DockerfileGen()
      .from("node:20")
      .user("appuser")
      .build();
    expect(df).toContain("USER appuser");
  });
});
