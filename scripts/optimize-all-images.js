const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(publicDir, 'optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization configurations
const configs = [
  {
    format: 'webp',
    quality: 75,
    suffix: '.webp'
  },
  {
    format: 'avif',
    quality: 70,
    suffix: '.avif'
  }
];

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const imageFiles = fs.readdirSync(publicDir)
  .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
  .filter(file => !file.startsWith('.'));

console.log(`🚀 Found ${imageFiles.length} images to optimize...\n`);

async function optimizeImage(inputPath, outputPath, config) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize if image is too large
    let pipeline = image;
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Apply format and quality
    await pipeline
      .toFormat(config.format, { quality: config.quality })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${reduction}% reduction)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const imageName of imageFiles) {
    const inputPath = path.join(publicDir, imageName);
    const originalSize = fs.statSync(inputPath).size;
    totalOriginalSize += originalSize;
    
    console.log(`\n📸 Processing: ${imageName}`);
    
    for (const config of configs) {
      const baseName = path.parse(imageName).name;
      const outputPath = path.join(outputDir, `${baseName}${config.suffix}`);
      
      await optimizeImage(inputPath, outputPath, config);
    }
    
    // Also create an optimized version of the original
    const baseName = path.parse(imageName).name;
    const ext = path.parse(imageName).ext;
    const optimizedOriginalPath = path.join(outputDir, `${baseName}-optimized${ext}`);
    
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      let pipeline = image;
      if (metadata.width > 1920) {
        pipeline = pipeline.resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }
      
      if (ext === '.png') {
        await pipeline.png({ quality: 90, compressionLevel: 9 }).toFile(optimizedOriginalPath);
      } else {
        await pipeline.jpeg({ quality: 85 }).toFile(optimizedOriginalPath);
      }
      
      const optimizedSize = fs.statSync(optimizedOriginalPath).size;
      totalOptimizedSize += optimizedSize;
      
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`✅ ${imageName} -> ${path.basename(optimizedOriginalPath)} (${reduction}% reduction)`);
    } catch (error) {
      console.error(`❌ Error optimizing original ${imageName}:`, error.message);
    }
  }
  
  console.log('\n✨ Image optimization complete!');
  console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Total savings: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

// Run optimization
optimizeAllImages().catch(console.error);
