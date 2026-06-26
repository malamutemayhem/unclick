# UnClick Browser (desktop app)

The reading-first desktop app. Tauri shell, so the installer is small and fast:
it uses the system WebView, not a bundled copy of Chromium.

This is intentionally a static, dependency-free shell for phase 1. It is not an
npm workspace member (no package.json), so it cannot disturb the website build.
The reading engine (address bar, fetch, reformat, dark/light) lands in phase 2.

## Installer

The Windows installer is built in CI by `.github/workflows/build-browser-app.yml`
and published to the `browser-app-latest` release as `UnClick-Browser-Setup.exe`,
which gives a stable download link for the website button.

## Local build

```
npx @tauri-apps/cli@2 icon src-tauri/source-icon.png -o src-tauri/icons
npx @tauri-apps/cli@2 build
```
