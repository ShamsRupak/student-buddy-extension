# 🎨 Update Logo Instructions

## Replace the current logo with your custom "AI Study Buddy" image

### Steps to update the logo:

1. **Save your image** as `student-buddy-logo.png` in the `icons/` folder

2. **Replace the existing icons** by running these commands:
   ```bash
   # Navigate to your project directory
   cd /Users/shamsrupak/student-buddy-extension
   
   # Copy your logo and resize for different icon sizes
   cp student-buddy-logo.png icons/icon128.png
   
   # Resize for smaller versions (if you have ImageMagick installed)
   magick icons/icon128.png -resize 48x48 icons/icon48.png
   magick icons/icon128.png -resize 16x16 icons/icon16.png
   ```

3. **Alternative method** (if ImageMagick is not working):
   - Manually resize your image to 128x128, 48x48, and 16x16 pixels
   - Save them as `icon128.png`, `icon48.png`, and `icon16.png` in the `icons/` folder
   - Use any image editor like Preview, Photoshop, or online tools

4. **Update the floating button** to use an image instead of emoji:
   The floating button will automatically use the new logo style.

### Your new logo features:
- 🎓 Academic character with graduation cap
- 🤓 Friendly, approachable design with glasses
- 🌈 Colorful Google-style background (red, yellow, green, blue)
- 📚 "AI STUDY BUDDY" text for clear branding

This logo perfectly represents your extension's educational focus and AI-powered assistance!
