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

const files = [
  { file: "2.png", publicId: "weeding-card/bg" },
  { file: "3.png", publicId: "weeding-card/flower-tl" },
  { file: "4.png", publicId: "weeding-card/flower-tc" },
  { file: "5.png", publicId: "weeding-card/flower-tr" },
  { file: "6.png", publicId: "weeding-card/gold-tr" },
  { file: "7.png", publicId: "weeding-card/gold-bl" },
  { file: "8.png", publicId: "weeding-card/flower-bc" },
  { file: "9.png", publicId: "weeding-card/flower-bb" },
  { file: "10.png", publicId: "weeding-card/flower-br" },
];

const dir = resolve(root, "WeedingCard Template");

async function main() {
  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is missing");
  }

  for (const item of files) {
    const path = resolve(dir, item.file);
    if (!existsSync(path)) {
      throw new Error(`Missing ${path}`);
    }

    const buffer = await sharp(path)
      .resize({
        width: 1600,
        height: 2200,
        fit: "inside",
        withoutEnlargement: true,
      })
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
    console.log(
      `${item.file} -> ${result.public_id} (${Math.round(buffer.length / 1024)} KB) ${result.secure_url}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
