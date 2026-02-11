#!/usr/bin/env node

/**
 * Favicon Generation Script
 * Generates multiple favicon sizes from profile.png
 * 
 * Requirements:
 * - sharp is already installed as a dev dependency
 * - Run: node scripts/generate-favicons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROFILE_IMAGE = path.join(__dirname, '..', 'src', 'assets', 'profile.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

const FAVICON_SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicon(name, size) {
  const outputPath = path.join(OUTPUT_DIR, name);
  
  try {
    await sharp(PROFILE_IMAGE)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Created ${name} (${size}x${size})`);
    return true;
  } catch (error) {
    console.error(`✗ Error creating ${name}:`, error.message);
    return false;
  }
}

async function generateIcoFile() {
  // Generate ICO file with multiple sizes (16x16 and 32x32)
  const icoPath = path.join(OUTPUT_DIR, 'favicon.ico');
  
  try {
    // Create 16x16 and 32x32 buffers
    const icon16 = await sharp(PROFILE_IMAGE)
      .resize(16, 16, { fit: 'cover', position: 'center' })
      .png()
      .toBuffer();
    
    const icon32 = await sharp(PROFILE_IMAGE)
      .resize(32, 32, { fit: 'cover', position: 'center' })
      .png()
      .toBuffer();
    
    // For simplicity, we'll use the 32x32 PNG as favicon.ico
    // Most modern browsers support PNG favicons
    // If true ICO format is needed, we'd need an additional library
    await sharp(icon32)
      .toFile(icoPath);
    
    console.log(`✓ Created favicon.ico`);
    return true;
  } catch (error) {
    console.error(`✗ Error creating favicon.ico:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🎨 Starting favicon generation...\n');

  // Check if sharp is available
  try {
    await import('sharp');
  } catch (e) {
    console.error('❌ Error: sharp is not installed.');
    console.log('   Install it with: npm install --save-dev sharp');
    process.exit(1);
  }

  // Check if profile image exists
  if (!fs.existsSync(PROFILE_IMAGE)) {
    console.error(`❌ Error: Profile image not found at ${PROFILE_IMAGE}`);
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate all favicon sizes
  console.log(`📁 Source: ${PROFILE_IMAGE}`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  for (const { name, size } of FAVICON_SIZES) {
    await generateFavicon(name, size);
  }

  // Generate ICO file
  await generateIcoFile();

  console.log('\n✅ Favicon generation complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update index.html with favicon link tags');
  console.log('   2. Create site.webmanifest file');
}

main().catch(console.error);
