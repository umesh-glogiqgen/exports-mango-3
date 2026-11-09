import fs from "fs";
import path from "path";

// 1. Check catalogueData.ts
const catContent = fs.readFileSync("src/data/catalogueData.ts", "utf8");
const catRegex = /image:\s*"([^"]+)"/g;
let m;
const catImages = [];
while ((m = catRegex.exec(catContent)) !== null) {
  catImages.push(m[1]);
}

console.log(`Checking ${catImages.length} catalogue product images...`);
let catMissing = 0;
for (const img of catImages) {
  const p = path.join("public", img.replace(/^\//, ""));
  if (!fs.existsSync(p)) {
    console.error(`MISSING catalogue image: ${img}`);
    catMissing++;
  }
}
if (catMissing === 0) {
  console.log(`SUCCESS: All ${catImages.length} catalogue images exist in public/products!`);
}

// 2. Check content.ts
const contentText = fs.readFileSync("src/data/content.ts", "utf8");
const assetRegex = /"\/assets\/[^"]+"/g;
const contentAssets = [...new Set(contentText.match(assetRegex) || [])].map((s) =>
  s.replace(/"/g, ""),
);

console.log(`Checking ${contentAssets.length} static content assets...`);
let assetMissing = 0;
for (const a of contentAssets) {
  const p = path.join("public", a.replace(/^\//, ""));
  if (!fs.existsSync(p)) {
    console.error(`MISSING asset: ${a}`);
    assetMissing++;
  }
}
if (assetMissing === 0) {
  console.log(`SUCCESS: All ${contentAssets.length} static assets exist in public/assets!`);
}
