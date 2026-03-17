const sharp = require("sharp");
const path = require("path");

const input = path.join(__dirname, "../public/LOGO.jpeg");
const output = (name) => path.join(__dirname, "../public", name);

async function generate() {
  // 32x32 PNG (browsers use this)
  await sharp(input).resize(32, 32).png().toFile(output("favicon.png"));

  // 180x180 PNG (Apple devices)
  await sharp(input).resize(180, 180).png().toFile(output("apple-touch-icon.png"));

  // 192x192 PNG (Android/PWA)
  await sharp(input).resize(192, 192).png().toFile(output("icon-192.png"));

  // 512x512 PNG (Android/PWA)
  await sharp(input).resize(512, 512).png().toFile(output("icon-512.png"));

  // Also copy the 32x32 as .ico
  await sharp(input).resize(32, 32).png().toFile(output("favicon.ico"));

  console.log("Favicons generated.");
}

generate();

