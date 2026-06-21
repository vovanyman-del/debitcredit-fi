/* eslint-disable react-refresh/only-export-components --
   SSR entry, not a Fast-Refresh component module: it intentionally re-exports
   the prerender's data helpers (getHead/sitemap/paths) alongside render(). */
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import App from './App';

// Re-exported so prerender.mjs can pull head metadata + sitemap from the SSR bundle.
export { getHead, get404Head, buildSitemap, ALL_PATHS } from './seo';

/**
 * Renders the full app subtree to an HTML string for a given URL.
 *
 * Uses renderToPipeableStream + onAllReady (rather than renderToString) so that
 * React.lazy() page chunks are fully resolved before the markup is emitted —
 * a synchronous renderToString would only emit the Suspense fallback.
 */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
    });
    sink.on('finish', () => resolve(html));

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(sink);
        },
        onError(error) {
          abort();
          reject(error);
        },
      },
    );
  });
}
