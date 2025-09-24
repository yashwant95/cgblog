const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeHeroImage() {
  const inputPath = path.join(__dirname, '../public/hero-bg.png');
  const outputDir = path.join(__dirname, '../public/optimized');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log('🚀 Optimizing hero background image...');
    
    // Get original image info
    const originalStats = fs.statSync(inputPath);
    console.log(`📊 Original size: ${(originalStats.size / 1024).toFixed(2)} KB`);
    
    // Create WebP version (better compression)
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, 'hero-bg.webp'));
    
    // Create AVIF version (best compression)
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .avif({ quality: 80 })
      .toFile(path.join(outputDir, 'hero-bg.avif'));
    
    // Create optimized PNG version
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'hero-bg-optimized.png'));
    
    // Check file sizes
    const webpStats = fs.statSync(path.join(outputDir, 'hero-bg.webp'));
    const avifStats = fs.statSync(path.join(outputDir, 'hero-bg.avif'));
    const pngStats = fs.statSync(path.join(outputDir, 'hero-bg-optimized.png'));
    
    console.log('\n✅ Optimization complete!');
    console.log(`📊 WebP size: ${(webpStats.size / 1024).toFixed(2)} KB (${((1 - webpStats.size / originalStats.size) * 100).toFixed(1)}% reduction)`);
    console.log(`📊 AVIF size: ${(avifStats.size / 1024).toFixed(2)} KB (${((1 - avifStats.size / originalStats.size) * 100).toFixed(1)}% reduction)`);
    console.log(`📊 Optimized PNG size: ${(pngStats.size / 1024).toFixed(2)} KB (${((1 - pngStats.size / originalStats.size) * 100).toFixed(1)}% reduction)`);
    
    // Replace original with optimized version
    fs.copyFileSync(path.join(outputDir, 'hero-bg-optimized.png'), inputPath);
    console.log('🔄 Replaced original hero-bg.png with optimized version');
    
  } catch (error) {
    console.error('❌ Error optimizing hero image:', error.message);
  }
}

optimizeHeroImage();
