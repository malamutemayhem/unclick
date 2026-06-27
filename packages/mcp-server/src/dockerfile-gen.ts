export class DockerfileGen {
  private lines: string[] = [];

  from(image: string, alias?: string): this {
    this.lines.push(alias ? `FROM ${image} AS ${alias}` : `FROM ${image}`);
    return this;
  }

  workdir(dir: string): this {
    this.lines.push(`WORKDIR ${dir}`);
    return this;
  }

  copy(src: string, dest: string, from?: string): this {
    this.lines.push(from ? `COPY --from=${from} ${src} ${dest}` : `COPY ${src} ${dest}`);
    return this;
  }

  add(src: string, dest: string): this {
    this.lines.push(`ADD ${src} ${dest}`);
    return this;
  }

  run(command: string): this {
    this.lines.push(`RUN ${command}`);
    return this;
  }

  runMulti(commands: string[]): this {
    this.lines.push(`RUN ${commands.join(" \\\n    && ")}`);
    return this;
  }

  cmd(command: string[]): this {
    this.lines.push(`CMD [${command.map((c) => `"${c}"`).join(", ")}]`);
    return this;
  }

  entrypoint(command: string[]): this {
    this.lines.push(`ENTRYPOINT [${command.map((c) => `"${c}"`).join(", ")}]`);
    return this;
  }

  env(key: string, value: string): this {
    this.lines.push(`ENV ${key}=${value}`);
    return this;
  }

  expose(port: number): this {
    this.lines.push(`EXPOSE ${port}`);
    return this;
  }

  volume(path: string): this {
    this.lines.push(`VOLUME ${path}`);
    return this;
  }

  arg(name: string, defaultValue?: string): this {
    this.lines.push(defaultValue ? `ARG ${name}=${defaultValue}` : `ARG ${name}`);
    return this;
  }

  label(key: string, value: string): this {
    this.lines.push(`LABEL ${key}="${value}"`);
    return this;
  }

  user(name: string): this {
    this.lines.push(`USER ${name}`);
    return this;
  }

  healthcheck(cmd: string, interval?: string): this {
    const opts = interval ? `--interval=${interval} ` : "";
    this.lines.push(`HEALTHCHECK ${opts}CMD ${cmd}`);
    return this;
  }

  comment(text: string): this {
    this.lines.push(`# ${text}`);
    return this;
  }

  blank(): this {
    this.lines.push("");
    return this;
  }

  build(): string {
    return this.lines.join("\n") + "\n";
  }

  static nodeApp(version: string = "20-alpine"): string {
    return new DockerfileGen()
      .from(`node:${version}`)
      .workdir("/app")
      .copy("package*.json", "./")
      .run("npm ci --only=production")
      .copy(".", ".")
      .expose(3000)
      .cmd(["node", "index.js"])
      .build();
  }

  static pythonApp(version: string = "3.12-slim"): string {
    return new DockerfileGen()
      .from(`python:${version}`)
      .workdir("/app")
      .copy("requirements.txt", ".")
      .run("pip install --no-cache-dir -r requirements.txt")
      .copy(".", ".")
      .expose(8000)
      .cmd(["python", "app.py"])
      .build();
  }

  static staticSite(nginxVersion: string = "alpine"): string {
    return new DockerfileGen()
      .from(`nginx:${nginxVersion}`)
      .copy("./dist", "/usr/share/nginx/html")
      .expose(80)
      .cmd(["nginx", "-g", "daemon off;"])
      .build();
  }
}
