import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./public/', import.meta.url)));
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  const filename = pathname === '/' ? 'index.html' : pathname.slice(1);
  const filepath = resolve(root, filename);
  if (filepath !== root && !filepath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const body = await readFile(filepath);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filepath)] ?? 'application/octet-stream',
      'Content-Security-Policy': "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    response.end(body);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      response.writeHead(404).end('Not found');
      return;
    }
    console.error('Gagal menyajikan file:', error);
    response.writeHead(500).end('Internal server error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Situs KAPAL KARAM siap di http://localhost:${port}`);
  console.log('Tekan Ctrl+C untuk menghentikan server.');
});
