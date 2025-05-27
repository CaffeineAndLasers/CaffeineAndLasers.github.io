const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const directories = ['content/Assets']; // Only process content directory
  
  console.log('🚀 Starting image optimization...\n');
  
  for (const dir of directories) {
    try {
      const files = await fs.readdir(dir, { recursive: true });
      console.log(`📁 Processing directory: ${dir}`);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const ext = path.extname(file).toLowerCase();
        
        if (imageExtensions.includes(ext)) {
          await optimizeImage(filePath);
        }
      }
      console.log('');
    } catch (error) {
      console.log(`⚠️  Directory ${dir} not found, skipping...`);
    }
  }
}

async function optimizeImage(imagePath) {
  try {
    const stats = await fs.stat(imagePath);
    const originalSize = stats.size;
    
    // Skip if file is already small (less than 100KB)
    if (originalSize < 100000) {
      console.log(`⏭️  Skipping ${path.basename(imagePath)} - already small (${Math.round(originalSize/1024)}KB)`);
      return;
    }
    
    // Skip backup files
    if (imagePath.includes('.backup') || imagePath.includes('.bkp')) {
      console.log(`⏭️  Skipping backup file: ${path.basename(imagePath)}`);
      return;
    }
    
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Create backup
    const backupPath = imagePath + '.backup';
    await fs.copyFile(imagePath, backupPath);
    
    let optimized = image;
    
    // Resize if too large (keep aspect ratio)
    if (metadata.width > 1200) {
      optimized = optimized.resize(1200, null, {
        withoutEnlargement: true
      });
    }
    
    // Optimize based on format
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      optimized = optimized.jpeg({ quality: 80, progressive: true });
    } else if (metadata.format === 'png') {
      optimized = optimized.png({ compressionLevel: 8 });
    } else if (metadata.format === 'webp') {
      optimized = optimized.webp({ quality: 80 });
    }
    
    const tempPath = imagePath + '.temp';
    await optimized.toFile(tempPath);
    
    // Check if optimization was successful
    const newStats = await fs.stat(tempPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    if (newSize < originalSize) {
      await fs.rename(tempPath, imagePath);
      console.log(`✅ Optimized ${path.basename(imagePath)}: ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB (${savings}% savings)`);
    } else {
      await fs.unlink(tempPath);
      await fs.unlink(backupPath); // Remove backup if no improvement
      console.log(`⏭️  Skipped ${path.basename(imagePath)} - no improvement possible`);
    }
    
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(imagePath)}:`, error.message);
    // Clean up temp files if they exist
    try {
      await fs.unlink(imagePath + '.temp');
    } catch {}
  }
}

async function restoreBackups() {
  const directories = ['content/Assets']; // Only process content directory
  
  console.log('🔄 Restoring all backup files...\n');
  
  for (const dir of directories) {
    try {
      await restoreBackupsRecursive(dir);
    } catch (error) {
      console.log(`Directory ${dir} not found, skipping...`);
    }
  }
}

async function restoreBackupsRecursive(directory) {
  try {
    const items = await fs.readdir(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      
      if (item.isDirectory()) {
        // Recursively restore subdirectories
        await restoreBackupsRecursive(fullPath);
      } else if (item.name.endsWith('.backup')) {
        const originalPath = fullPath.replace('.backup', '');
        await fs.rename(fullPath, originalPath);
        console.log(`🔄 Restored: ${path.relative('.', originalPath)}`);
      }
    }
  } catch (error) {
    console.log(`Error reading directory ${directory}:`, error.message);
  }
}

async function cleanBackups() {
  const directories = ['content/Assets']; // Only process content directory
  
  console.log('🧹 Cleaning up backup files...\n');
  
  for (const dir of directories) {
    try {
      await cleanBackupsRecursive(dir);
    } catch (error) {
      console.log(`Directory ${dir} not found, skipping...`);
    }
  }
}

async function cleanBackupsRecursive(directory) {
  try {
    const items = await fs.readdir(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      
      if (item.isDirectory()) {
        // Recursively clean subdirectories
        await cleanBackupsRecursive(fullPath);
      } else if (item.name.endsWith('.backup')) {
        await fs.unlink(fullPath);
        console.log(`🗑️  Removed backup: ${path.relative('.', fullPath)}`);
      }
    }
  } catch (error) {
    console.log(`Error reading directory ${directory}:`, error.message);
  }
}

// Handle command line arguments
const command = process.argv[2];

if (command === 'restore') {
  restoreBackups().then(() => {
    console.log('\n✅ Backup restoration complete!');
  }).catch(console.error);
} else if (command === 'clean') {
  cleanBackups().then(() => {
    console.log('\n✅ Backup cleanup complete!');
  }).catch(console.error);
} else {
  optimizeImages().then(() => {
    console.log('🎉 Image optimization complete!');
    console.log('\nℹ️  To restore original images, run: npm run restore-images');
    console.log('ℹ️  To clean backup files, run: npm run clean-backups');
  }).catch(console.error);
}