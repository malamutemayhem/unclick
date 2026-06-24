// Demo: convert a sample HTML page into an UnClick Doc and render it in both
// themes. Run after building: `npm run build && npm run demo`.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { htmlToUnclickDoc, renderUnclickDoc } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));

const sample = `<!doctype html><html lang="en"><head><title>The UnClick Browser</title>
<style>.ad{display:block}</style><script>track('view')</script></head>
<body>
  <nav>home about</nav>
  <article>
    <h1>One observation, two outputs</h1>
    <p>The browser turns every page into a <strong>clean, consistent</strong>
       format for humans, and in the <em>same pass</em> learns the
       <a href="https://unclick.world">shape of the web</a> for agents.</p>
    <h2>Why it is fast</h2>
    <ul><li>Tiny, fixed block vocabulary</li><li>No page scripts or fonts</li><li>Cached after first visit</li></ul>
    <blockquote>Speed comes from the format, not the engine.</blockquote>
    <pre><code class="language-ts">const doc = htmlToUnclickDoc(html);</code></pre>
    <table><tr><th>Tier</th><th>Who hosts</th></tr><tr><td>Auto</td><td>UnClick cache</td></tr><tr><td>Feed</td><td>Publisher</td></tr></table>
    <img src="https://unclick.world/og.png" alt="diagram" width="1600" height="900">
    <hr>
  </article>
  <footer>copyright</footer>
</body></html>`;

const doc = htmlToUnclickDoc(sample, { url: "https://unclick.world/browser" });
writeFileSync(join(here, "out-light.html"), renderUnclickDoc(doc, { theme: "light" }));
writeFileSync(join(here, "out-dark.html"), renderUnclickDoc(doc, { theme: "dark" }));

console.log(`Converted ${doc.blocks.length} blocks: ${doc.blocks.map((b) => b.kind).join(", ")}`);
console.log("Wrote demo/out-light.html and demo/out-dark.html");
