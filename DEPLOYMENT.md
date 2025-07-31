# 🚀 Deployment Guide

## GitHub Setup (Secure)

### 1. Create GitHub Repository

1. **Go to GitHub** and create a new repository:
   - Repository name: `student-buddy-extension`
   - Description: "AI-powered learning companion Chrome extension"
   - Make it **Public** (for open source) or **Private** (for personal use)
   - **DO NOT** initialize with README (we already have files)

2. **Copy the repository URL** for the next steps

### 2. Secure Local Setup

Before pushing to GitHub, ensure security:

```bash
# Check for any secrets in your code
grep -r "sk-\|api.*key\|secret\|password" --exclude-dir=node_modules . || echo "✅ No secrets found"

# Verify .gitignore is working
git status --ignored

# Make sure .env files are ignored
echo "test-secret=abc123" > .env
git status | grep ".env" && echo "❌ .env not ignored!" || echo "✅ .env properly ignored"
rm .env
```

### 3. Connect to GitHub

```bash
# Ensure you're in the project directory
cd /Users/shamsrupak/student-buddy-extension

# Rename master branch to main (modern standard)
git branch -M main

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/student-buddy-extension.git

# Push to GitHub
git push -u origin main
```

### 4. GitHub Repository Settings

After pushing, configure your repository:

1. **Go to Settings → Security**
   - Enable "Vulnerability alerts"
   - Enable "Dependency graph"

2. **Go to Settings → Secrets and variables → Actions**
   - Add repository secrets if needed for CI/CD

3. **Create Branch Protection Rules** (Settings → Branches)
   - Protect the `main` branch
   - Require pull request reviews

## 🔑 API Key Generation Guide

### Get Your Gemini API Key (FREE)

1. **Visit Google AI Studio:**
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **Sign in** with your Google account

3. **Create API Key:**
   - Click "Create API Key"
   - Choose "Create API key in new project" or select existing project
   - Copy the generated key immediately

4. **Secure the Key:**
   ```bash
   # Create local environment file
   cp .env.template .env
   
   # Edit .env and add your key:
   # GEMINI_API_KEY=your_actual_key_here
   ```

### API Key Best Practices

- ✅ **Use environment variables** - Never hardcode keys
- ✅ **Restrict API key scope** - Only enable needed services
- ✅ **Monitor usage** - Check API usage regularly
- ✅ **Rotate keys regularly** - Update keys every 3-6 months
- ✅ **Use separate keys** - Different keys for dev/prod

## 🔧 Extension Installation

### For Users (Chrome Web Store)
> 🚧 Coming soon - extension will be published

### For Developers (Load Unpacked)

1. **Open Chrome Extensions:**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode:**
   - Toggle "Developer mode" in top-right corner

3. **Load Extension:**
   - Click "Load unpacked"
   - Select the `student-buddy-extension` folder
   - Extension icon should appear in toolbar

4. **Configure API Key:**
   - Click the extension icon
   - Enter your Gemini API key
   - Click "Save Configuration"

5. **Test on LeetCode:**
   - Visit https://leetcode.com/problems/
   - Look for the 🎓 floating button
   - Click to open Student Buddy

## 🧪 Testing Your Deployment

### Automated Tests
```bash
# Run the test suite
npm test

# Check extension structure
npm run lint

# Build extension package
npm run build
```

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] Popup opens and closes properly
- [ ] API key can be saved and loaded
- [ ] Floating button appears on supported sites
- [ ] Chat interface works correctly
- [ ] AI responses are generated
- [ ] No console errors

## 🔄 Continuous Integration (Optional)

Create `.github/workflows/test.yml`:

```yaml
name: Test Extension

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

## 📦 Chrome Web Store Publishing

### Preparation
1. **Test thoroughly** on multiple sites
2. **Create promotional images** (128x128, 440x280, 1280x800)
3. **Write detailed description**
4. **Set up privacy policy** (required)

### Publishing Process
1. **Developer Dashboard:** https://chrome.google.com/u/1/webstore/devconsole
2. **Pay $5 registration fee** (one-time)
3. **Upload extension ZIP**
4. **Fill out store listing**
5. **Submit for review** (1-3 days)

## 🎯 Post-Deployment

### Monitor Usage
- **GitHub Analytics** - Star count, forks, issues
- **Chrome Web Store** - Downloads, ratings, reviews
- **API Usage** - Monitor Gemini API consumption

### Maintenance
- **Update dependencies** - `npm audit fix`
- **Security patches** - Monitor vulnerability alerts
- **Feature requests** - Respond to user feedback
- **Bug fixes** - Address reported issues

---

**🎉 Your Student Buddy extension is ready for the world! 🌍**
