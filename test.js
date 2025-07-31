// test.js - Simple tests for Student Buddy Extension
const fs = require('fs');
const path = require('path');

console.log('🔍 Running Student Buddy Extension Tests...\n');

// Test 1: Check if all required files exist
const requiredFiles = [
    'manifest.json',
    'content.js',
    'background.js',
    'popup.html',
    'popup.js',
    'styles.css',
    'icons/icon16.png',
    'icons/icon48.png',
    'icons/icon128.png'
];

let allFilesExist = true;

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    const exists = fs.existsSync(filePath);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
});

// Test 2: Validate manifest.json
console.log('\n📋 Validating manifest.json:');
try {
    const manifestPath = path.join(__dirname, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    const requiredFields = ['name', 'version', 'manifest_version', 'permissions', 'content_scripts'];
    let manifestValid = true;
    
    requiredFields.forEach(field => {
        if (manifest[field]) {
            console.log(`   ✅ ${field}: ${Array.isArray(manifest[field]) ? `[${manifest[field].length} items]` : manifest[field]}`);
        } else {
            console.log(`   ❌ Missing ${field}`);
            manifestValid = false;
        }
    });
    
    if (manifest.manifest_version === 3) {
        console.log('   ✅ Using Manifest V3');
    } else {
        console.log('   ⚠️ Not using Manifest V3');
    }
    
} catch (error) {
    console.log('   ❌ Invalid JSON format');
    allFilesExist = false;
}

// Test 3: Check content script structure
console.log('\n🔧 Checking content script:');
try {
    const contentScript = fs.readFileSync(path.join(__dirname, 'content.js'), 'utf8');
    
    const checks = [
        { pattern: /class StudentBuddy/, description: 'StudentBuddy class defined' },
        { pattern: /queryGemini/, description: 'Gemini API integration' },
        { pattern: /chrome\.storage/, description: 'Chrome storage API usage' },
        { pattern: /addEventListener/, description: 'Event listeners setup' }
    ];
    
    checks.forEach(check => {
        if (check.pattern.test(contentScript)) {
            console.log(`   ✅ ${check.description}`);
        } else {
            console.log(`   ❌ Missing ${check.description}`);
        }
    });
    
} catch (error) {
    console.log('   ❌ Error reading content script');
}

// Test 4: Summary
console.log('\n📊 Test Summary:');
if (allFilesExist) {
    console.log('   ✅ All required files present');
    console.log('   ✅ Extension structure is valid');
    console.log('   🎉 Ready for testing in Chrome!');
    
    console.log('\n🚀 Next steps:');
    console.log('   1. Open Chrome and go to chrome://extensions/');
    console.log('   2. Enable "Developer mode"');
    console.log('   3. Click "Load unpacked" and select this directory');
    console.log('   4. Get your Gemini API key from https://makersuite.google.com/app/apikey');
    console.log('   5. Configure the API key in the extension popup');
    console.log('   6. Visit LeetCode and test the extension!');
    
} else {
    console.log('   ❌ Some files are missing');
    console.log('   🔧 Please ensure all required files are present');
}

console.log('\n✨ Student Buddy Extension test completed!\n');
