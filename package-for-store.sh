#!/bin/bash

# Package Student Buddy Extension for Chrome Web Store Submission
echo "📦 Packaging Student Buddy Extension for Chrome Web Store..."

# Create a clean directory for packaging
rm -rf dist/
mkdir -p dist/student-buddy-extension

# Copy necessary files (exclude development files)
echo "📁 Copying extension files..."
cp manifest.json dist/student-buddy-extension/
cp -r icons/ dist/student-buddy-extension/
cp background.js dist/student-buddy-extension/
cp content.js dist/student-buddy-extension/
cp popup.html dist/student-buddy-extension/
cp popup.js dist/student-buddy-extension/
cp styles.css dist/student-buddy-extension/

# Copy documentation that should be included
cp README.md dist/student-buddy-extension/
cp SECURITY.md dist/student-buddy-extension/

# Create the zip file
echo "🗜️  Creating zip file..."
cd dist/
zip -r student-buddy-extension.zip student-buddy-extension/

echo "✅ Package created: dist/student-buddy-extension.zip"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole/"
echo "2. Pay the $5 developer registration fee (one-time)"
echo "3. Click 'Add a new item'"
echo "4. Upload the student-buddy-extension.zip file"
echo "5. Fill out the store listing with information from STORE_SUBMISSION.md"
echo "6. Submit for review"
echo ""
echo "📸 Don't forget to take screenshots of your extension in action!"

# Return to original directory
cd ../
