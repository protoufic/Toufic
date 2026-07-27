import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
await fs.writeFile(path.join(root, 'dist-ssr', 'package.json'), '{"type":"commonjs"}\n', 'utf8');
