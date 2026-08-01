const Jimp = require('jimp');

async function processImage(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];

      if (alpha === 0) return;

      // Convert RGB to HSL to easily detect purple/blue
      const r = red / 255;
      const g = green / 255;
      const b = blue / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      // Purple/Blue is around hue 200 to 300 (0.55 to 0.85)
      // The earth is mostly brown/orange which is around hue 0.05 to 0.15
      if (h > 0.5 && h < 0.9 && s > 0.2) {
        // Change to black (preserving alpha, maybe some luminance)
        // Let's make it solid black as requested, or keep the luma to preserve gradients?
        // Let's preserve luma to keep the anti-aliasing edges nice
        this.bitmap.data[idx + 0] = 0;
        this.bitmap.data[idx + 1] = 0;
        this.bitmap.data[idx + 2] = 0;
        // Keep the original alpha
      }
    });

    await image.writeAsync(outputPath);
    console.log(`Successfully processed ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

// Check which images are there and process them
const fs = require('fs');
const filesToTry = [
  './src/img/new-logo-snf.png',
  './src/img/client-logo-6.png',
  './src/img/DRISHAK LOGO.png'
];

async function run() {
  for (const file of filesToTry) {
    if (fs.existsSync(file)) {
      console.log(`Found ${file}, processing...`);
      await processImage(file, file); // overwrite
    }
  }
}

run();
