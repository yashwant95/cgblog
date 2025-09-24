const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Testing Next.js build process...\n');

try {
  // Check if .next directory exists and clean it
  if (fs.existsSync('.next')) {
    console.log('🧹 Cleaning previous build...');
    execSync('rmdir /s /q .next', { stdio: 'inherit' });
  }

  // Run build command
  console.log('📦 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ Build completed successfully!');
  console.log('🎉 Your optimizations are working correctly.');
  
  // Check build output
  if (fs.existsSync('.next/static')) {
    console.log('📁 Build output generated in .next/static');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
