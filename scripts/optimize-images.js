#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP format with fallbacks
 * 
 * Requirements:
 * - Install sharp: npm install --save-dev sharp
 * - Run: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIRS = [
  'src/assets',
  'public',
  'music/artwork'
];

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function optimizeImage(inputPath, outputDir) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext)) return;

  const basename = path.basename(inputPath, ext);
  const webpPath = path.join(outputDir, `${basename}.webp`);
  const avifPath = path.join(outputDir, `${basename}.avif`);

  try {
    // Generate WebP
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);
    console.log(`✓ Created WebP: ${webpPath}`);

    // Generate AVIF (better compression, newer format)
    await sharp(inputPath)
      .avif({ quality: 80, effort: 6 })
      .toFile(avifPath)
      .catch(() => {
        // AVIF might not be supported, that's okay
        console.log(`⚠ AVIF skipped for: ${basename}`);
      });

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const webpStats = fs.statSync(webpPath);
    const savings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
    
    console.log(`  Original: ${(originalStats.size / 1024).toFixed(1)}KB → WebP: ${(webpStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠ Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.isFile()) {
      await optimizeImage(fullPath, dir);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Error: sharp is not installed.');
    console.log('   Install it with: npm install --save-dev sharp');
    process.exit(1);
  }

  for (const dir of IMAGE_DIRS) {
    if (fs.existsSync(dir)) {
      console.log(`\n📁 Processing: ${dir}`);
      await processDirectory(dir);
    }
  }

  console.log('\n✅ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update components to use WebP with fallbacks');
  console.log('   2. See IMAGE_OPTIMIZATION.md for component examples');
}

main().catch(console.error);
