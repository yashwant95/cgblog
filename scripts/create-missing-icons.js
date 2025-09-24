const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createMissingIcons() {
  const publicDir = path.join(__dirname, '../public');
  
  // Create a simple icon from the existing favicon or create a new one
  const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
  
  try {
    console.log('🚀 Creating missing icon files...');
    
    // Create a simple icon (you can replace this with your actual logo)
    const iconBuffer = await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 59, g: 130, b: 246, alpha: 1 } // Blue background
      }
    })
    .png()
    .toBuffer();
    
    for (const size of iconSizes) {
      const outputPath = path.join(publicDir, `icons/icon-${size}x${size}.png`);
      
      // Create icons directory if it doesn't exist
      const iconsDir = path.dirname(outputPath);
      if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
      }
      
      await sharp(iconBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Created icon-${size}x${size}.png`);
    }
    
    console.log('\n✨ All missing icons created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating icons:', error.message);
  }
}

createMissingIcons();
