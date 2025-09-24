# Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. Turbopack and Babel Conflict

**Issue**: `Babel detected (.babelrc) - Babel is not yet supported`

**Solution**: 
- Removed `.babelrc` file (already done)
- Next.js 15+ uses SWC by default, no Babel needed
- All optimizations work with SWC

### 2. Invalid Next.js Configuration

**Issue**: `Unrecognized key(s) in object: 'swcMinify'`

**Solution**:
- Removed deprecated `swcMinify` option (already done)
- SWC minification is enabled by default in Next.js 15+

### 3. Development Server Issues

**Issue**: Port conflicts or server won't start

**Solutions**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001

# Clear Next.js cache
rm -rf .next
npm run dev
```

### 4. Build Failures

**Issue**: Build process fails

**Solutions**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build

# Test build process
npm run test-build
```

### 5. Image Optimization Issues

**Issue**: Images not loading or optimization not working

**Solutions**:
```bash
# Install Sharp for image optimization
npm install sharp

# Run image optimization script
npm run optimize-images

# Check Next.js image configuration
# Verify domains in next.config.js
```

### 6. Performance Issues

**Issue**: Slow loading or high bundle size

**Solutions**:
```bash
# Analyze bundle size
npm run analyze

# Check performance in browser
# Open DevTools > Performance tab
# Record page load and check metrics

# Monitor Core Web Vitals
# Check browser console for performance logs
```

### 7. CSS Issues

**Issue**: Styles not loading or layout broken

**Solutions**:
- Check if critical CSS is properly inlined
- Verify Tailwind CSS configuration
- Check for CSS conflicts in globals.css

### 8. JavaScript Errors

**Issue**: Console errors or components not loading

**Solutions**:
- Check browser console for errors
- Verify all imports are correct
- Check for missing dependencies
- Ensure lazy loading is working properly

## 🔧 Debug Commands

### Check Configuration
```bash
# Verify Next.js config
node -e "console.log(require('./next.config.js'))"

# Check package.json
npm list --depth=0

# Verify TypeScript/JavaScript config
cat jsconfig.json
```

### Performance Testing
```bash
# Build and analyze
npm run build
npm run analyze

# Test production build
npm run build
npm start

# Check bundle size
npx @next/bundle-analyzer
```

### Image Optimization Testing
```bash
# Test image optimization
npm run optimize-images

# Check optimized images
ls -la public/optimized/

# Test different image formats
curl -H "Accept: image/webp" http://localhost:3000/hero-bg.png
curl -H "Accept: image/avif" http://localhost:3000/hero-bg.png
```

## 📊 Performance Monitoring

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Record page load
4. Check for:
   - Long tasks (>50ms)
   - Layout shifts
   - Slow resources
   - JavaScript execution time

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select Performance
4. Run audit
5. Check scores:
   - Performance: >90
   - LCP: <2.5s
   - FID: <100ms
   - CLS: <0.1

### Console Monitoring
Check browser console for:
- Performance logs from PerformanceMonitor
- Resource loading times
- Core Web Vitals metrics
- Long task warnings

## 🚀 Optimization Checklist

### Before Deployment
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm start`
- [ ] Run Lighthouse audit
- [ ] Check all images are optimized
- [ ] Verify lazy loading works
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals

### Performance Targets
- [ ] LCP < 2.5 seconds
- [ ] FID < 100 milliseconds
- [ ] CLS < 0.1
- [ ] Bundle size < 250KB
- [ ] Image savings > 50%

### Image Optimization
- [ ] WebP/AVIF formats enabled
- [ ] Responsive images implemented
- [ ] Lazy loading for offscreen images
- [ ] Proper sizes attributes
- [ ] Quality optimization (75-85%)

## 🆘 Getting Help

### Check Logs
```bash
# Development server logs
npm run dev

# Build logs
npm run build

# Production server logs
npm start
```

### Common Error Messages

**"Module not found"**
- Check import paths
- Verify file exists
- Check case sensitivity

**"Image optimization failed"**
- Install Sharp: `npm install sharp`
- Check image format support
- Verify Next.js image config

**"Build failed"**
- Check for syntax errors
- Verify all dependencies installed
- Clear cache and rebuild

**"Performance issues"**
- Check bundle size
- Verify lazy loading
- Monitor Core Web Vitals
- Check for memory leaks

### Support Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Performance Best Practices](https://nextjs.org/docs/advanced-features/measuring-performance)
