// Converts the source photographs in /images-source into responsive WebP files in /public/images.
// Run with `npm run images` whenever a photo is added or replaced.
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'images-source';
const OUT = 'public/images';
// Five steps so each device picks a file close to its rendered size (1x/2x/3x phones, tablets, desktop).
const WIDTHS = [400, 600, 800, 1200, 1600];
// Dense, high-texture photos compress poorly at the default; a lower quality is invisible at display size.
const QUALITY = {
  default: 74,
  'pizza-detail': 64,
  'frozen-fillets': 64,
  'fish-crates': 64,
  'fish-weighing': 64,
  'packing-floor': 64,
  'warehouse-reach-truck': 64,
};

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    const info = await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      // effort 6 is the slowest, densest WebP encode; it only costs build time. smartSubsample keeps
      // fine colour edges (labels, produce) sharp at the lower qualities.
      .webp({ quality: QUALITY[name] ?? QUALITY.default, effort: 6, smartSubsample: true })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
    console.log(`${name}-${width}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}kB`);
  }
}
