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
    quality: 80,
    suffix: '.webp'
  },
  {
    format: 'avif',
    quality: 75,
    suffix: '.avif'
  }
];

// Critical images that need priority optimization
const criticalImages = [
  'hero-bg.png',
  'cg-map.png'
];

// Regular images
const regularImages = [
  'chitrakote.jpg',
  'sirpur.jpg',
  'bhoramdeo.jpg',
  'barnawapara.jpg',
  'achanakmar.jpg',
  'udanti_sitanadi.jpg',
  'gallery1.jpg',
  'gallery2.jpg',
  'gallery3.jpg',
  'gallery4.jpg',
  'event-bastar-dussehra.jpg',
  'event-rajim-kumbh.jpg',
  'event-sirpur-festival.jpeg',
  'event-champaran-mela.jpg',
  'event-madai-festival.jpg',
  'food-chila.jpg',
  'food-dehrori.jpg',
  'food-faraa.jpg',
  'food-muthia.jpg',
  'review-adventure.jpg',
  'review-bastar-food.jpg',
  'review-danteshwari.jpg',
  'review-hotels.jpg',
  'review-restaurants.jpg'
];

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
    
    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n');
  
  const allImages = [...criticalImages, ...regularImages];
  
  for (const imageName of allImages) {
    const inputPath = path.join(publicDir, imageName);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Image not found: ${imageName}`);
      continue;
    }
    
    console.log(`\n📸 Processing: ${imageName}`);
    
    for (const config of configs) {
      const baseName = path.parse(imageName).name;
      const outputPath = path.join(outputDir, `${baseName}${config.suffix}`);
      
      await optimizeImage(inputPath, outputPath, config);
    }
  }
  
  console.log('\n✨ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

// Run optimization
optimizeAllImages().catch(console.error);
