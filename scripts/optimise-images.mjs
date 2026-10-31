// Converts the source photographs in /images-source into responsive WebP files in /public/images.
// Run with `npm run images` whenever a photo is added or replaced.
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'images-source';
const OUT = 'public/images';
const WIDTHS = [800, 1600];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    const info = await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
    console.log(`${name}-${width}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}kB`);
  }
}
