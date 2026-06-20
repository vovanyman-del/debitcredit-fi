// Local production preview server. Mirrors how Vercel serves this project:
// filesystem-first with clean URLs (GET /foo -> dist/foo/index.html), so every
// route is hydrated against ITS OWN pre-rendered HTML — exactly like prod.
//
// This is deliberately NOT `vite preview`: vite preview applies an SPA
// history-fallback and serves dist/index.html (the home page) for every clean
// URL, so non-home routes hydrate against the wrong markup and throw React #418
// (hydration mismatch). That is a preview-only artifact, not a production bug.
//
// For genuinely unknown paths we fall back to dist/index.html (200), matching
// the rewrite in vercel.json.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const PORT = Number(process.env.PORT || 4180);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.json': 'application/json',
  '.txt': 'text/plain', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

async function tryFiles(pathname) {
  const candidates = [];
  if (pathname.endsWith('/')) candidates.push(join(DIST, pathname, 'index.html'));
  else candidates.push(join(DIST, pathname), join(DIST, pathname + '.html'), join(DIST, pathname, 'index.html'));
  for (const c of candidates) {
    try { if ((await stat(c)).isFile()) return c; } catch { /* next */ }
  }
  return null;
}

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = await tryFiles(pathname);
  // Vercel rewrite fallback: unknown, non-asset paths -> index.html (SPA shell).
  if (!file && !extname(pathname)) file = join(DIST, 'index.html');
  if (!file) { res.statusCode = 404; res.end('Not found'); return; }
  const body = await readFile(file);
  res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream');
  res.end(body);
}).listen(PORT, () => console.log(`Preview (prod-faithful) on http://localhost:${PORT}`));
