/**
 * One-off script — generates public/og-image.jpg, the link-preview image
 * used across the site. Not run at build time; re-run manually if the
 * founder photos or copy change.
 */
const sharp = require("sharp");
const path = require("path");

const W = 1200;
const H = 630;
const HALF = W / 2;

async function main() {
  const nia = await sharp(path.join(__dirname, "../public/founders/nia.webp"))
    .resize(HALF, H, { fit: "cover", position: "top" })
    .toBuffer();

  const aaron = await sharp(path.join(__dirname, "../public/founders/aaron.webp"))
    .resize(HALF, H, { fit: "cover", position: "top" })
    .toBuffer();

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.88"/>
        </linearGradient>
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${H - 200}" width="${W}" height="200" fill="url(#fade)"/>
      <rect x="0" y="0" width="${W}" height="190" fill="url(#topFade)"/>
      <rect x="${HALF - 2}" y="0" width="4" height="${H}" fill="#FCBF11"/>

      <text x="40" y="56" font-family="Arial, sans-serif"
            font-size="38" font-weight="800" fill="#FFFFFF">Nia</text>
      <text x="40" y="90" font-family="Arial, sans-serif"
            font-size="24" font-weight="700" letter-spacing="1" fill="#FCBF11">CEO</text>
      <text x="40" y="116" font-family="Arial, sans-serif"
            font-size="19" font-weight="700" letter-spacing="1" fill="#EEEEEE">SLPA</text>

      <text x="${HALF + 40}" y="56" font-family="Arial, sans-serif"
            font-size="38" font-weight="800" fill="#FFFFFF">Aaron</text>
      <text x="${HALF + 40}" y="90" font-family="Arial, sans-serif"
            font-size="24" font-weight="700" letter-spacing="1" fill="#FCBF11">COO</text>
      <text x="${HALF + 40}" y="116" font-family="Arial, sans-serif"
            font-size="19" font-weight="700" letter-spacing="1" fill="#EEEEEE">CMO</text>

      <text x="${W / 2}" y="${H - 130}" text-anchor="middle"
            font-family="Georgia, 'Times New Roman', serif" font-size="56" fill="#FFFFFF">
        Confidence Begins With Communication.
      </text>
      <text x="${W / 2}" y="${H - 62}" text-anchor="middle" font-family="Arial, sans-serif"
            font-size="28" font-weight="700" letter-spacing="1">
        <tspan fill="#FFFFFF">Talk</tspan><tspan fill="#FCBF11">Wise</tspan><tspan fill="#FFFFFF" font-weight="400"> Academy</tspan>
      </text>
    </svg>
  `);

  await sharp({
    create: { width: W, height: H, channels: 3, background: "#0A0A0A" },
  })
    .composite([
      { input: nia, left: 0, top: 0 },
      { input: aaron, left: HALF, top: 0 },
      { input: overlay, left: 0, top: 0 },
    ])
    .jpeg({ quality: 88 })
    .toFile(path.join(__dirname, "../public/og-image.jpg"));

  console.log("Wrote public/og-image.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
