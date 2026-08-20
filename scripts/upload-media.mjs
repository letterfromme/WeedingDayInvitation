import { v2 as cloudinary } from "cloudinary";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const portraits = [
  {
    file: "image/WhatsApp Image 2026-08-20 at 10.18.28 PM.jpeg",
    publicId: "weeding-card/bride-1",
  },
  {
    file: "image/WhatsApp Image 2026-08-20 at 10.18.28 PM (1).jpeg",
    publicId: "weeding-card/bride-2",
  },
  {
    file: "image/WhatsApp Image 2026-08-20 at 10.18.27 PM.jpeg",
    publicId: "weeding-card/bride-3",
  },
];

async function main() {
  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is missing");
  }

  for (const item of portraits) {
    const path = resolve(root, item.file);
    if (!existsSync(path)) throw new Error(`Missing ${path}`);
    const buffer = await sharp(path)
      .rotate()
      .resize({ width: 1600, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    const result = await cloudinary.uploader.upload(
      `data:image/webp;base64,${buffer.toString("base64")}`,
      {
        public_id: item.publicId,
        overwrite: true,
        resource_type: "image",
        invalidate: true,
      },
    );
    console.log(`photo ${item.publicId} -> ${result.secure_url}`);
  }

  const song = resolve(root, "video_2026-08-20_22-27-23.mp3");
  if (!existsSync(song)) throw new Error(`Missing ${song}`);
  const audio = await cloudinary.uploader.upload(song, {
    public_id: "weeding-card/song",
    overwrite: true,
    resource_type: "video",
    invalidate: true,
  });
  console.log(`song -> ${audio.secure_url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
