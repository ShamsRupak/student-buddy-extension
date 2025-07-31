# 🎓 Student Buddy - AI Learning Mentor

<div align="center">

![Student Buddy Logo](icons/icon128.png)

*🧠 AI-Powered Learning • 🎓 Educational Companion • 💡 Smart Guidance*

**Your AI-powered learning companion that provides hints and step-by-step guidance on coding platforms**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285f4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)
[![Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-orange?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

## 🌟 What is Student Buddy?

Student Buddy is an intelligent Chrome extension that acts as your personal AI mentor while coding. Instead of giving you direct solutions, it provides:

- 💡 **Smart Hints** - Subtle guidance without spoilers
- 📚 **Concept Explanations** - Break down complex topics
- 🐛 **Debug Assistance** - Help identify and fix issues
- 📝 **Step-by-Step Guidance** - Structured learning approach

## 🚀 Features

### ✨ Core Functionality
- **AI-Powered Mentoring** using Google's Gemini AI
- **Platform Detection** - Works seamlessly on multiple coding platforms
- **Interactive Chat Interface** - Natural conversation with your AI buddy
- **Context-Aware Assistance** - Understands the problem you're working on
- **Non-Spoiler Learning** - Promotes understanding over quick fixes

### 🎯 Supported Platforms
- 🔥 **LeetCode** - Primary focus with advanced problem detection
- 🐙 **GitHub** - Repository and code assistance
- 📚 **Stack Overflow** - Question and answer guidance
- 🎨 **CodePen** - Web development playground support
- ⚡ **HackerRank** - Competitive programming help
- 🥋 **CodeWars** - Kata solving assistance

### 🛠️ Technical Features
- **Manifest V3** compliance for latest Chrome standards
- **Real-time API Integration** with Gemini AI
- **Responsive Design** with beautiful, modern UI
- **Local Storage** for settings and preferences
- **Cross-platform Compatibility** with multiple coding sites

## 📦 Installation

### Method 1: Load Unpacked Extension (Recommended for Development)

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/yourusername/student-buddy-extension.git
   cd student-buddy-extension
   ```

2. **Open Chrome Extensions Page**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the Extension**:
   - Click "Load unpacked"
   - Select the `student-buddy-extension` directory
   - The extension icon should appear in your toolbar

### Method 2: Install from Chrome Web Store
> 🚧 Coming soon! Extension will be published to Chrome Web Store

## ⚙️ Setup & Configuration

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the generated key

### 2. Configure the Extension
1. Click the Student Buddy icon in Chrome toolbar
2. Paste your Gemini API key in the configuration field
3. Click "Save Configuration"
4. You should see a green connection indicator

### 3. Start Learning!
1. Visit any supported coding platform (e.g., LeetCode)
2. Look for the floating 🎓 icon in the bottom-right corner
3. Click to open your AI learning companion

## 💻 Usage Guide

### 🎯 Quick Actions

| Button | Function | Description |
|--------|----------|-------------|
| 💡 **Get Hint** | Smart Hints | Provides subtle guidance without revealing the solution |
| 📚 **Explain Concept** | Learning | Breaks down the programming concepts needed |
| 🐛 **Debug Help** | Code Review | Analyzes your code for potential issues |
| 📝 **Step by Step** | Methodology | Outlines the approach to solve the problem |

### 💬 Chat Interface

The chat interface allows natural conversation with your AI buddy:

```
You: "I'm stuck on this dynamic programming problem"
Buddy: "I can help! Let me look at the problem... 

This looks like it could benefit from memoization. 
Have you considered what subproblems might be repeated? 

Think about the optimal substructure - what smaller 
problems would help you solve the larger one?"
```

### 🔍 Platform-Specific Features

#### LeetCode Integration
- **Automatic Problem Detection** - Recognizes current problem
- **Code Analysis** - Reviews your solution attempts
- **Test Case Guidance** - Helps understand edge cases
- **Complexity Analysis** - Discusses time/space complexity

#### GitHub Integration
- **Code Review Assistance** - Reviews pull requests and code
- **Documentation Help** - Suggests improvements
- **Best Practices** - Recommends coding standards

## 🛠️ Development

### Prerequisites
- Node.js 14+ 
- Chrome Browser
- Gemini API Key

### Local Development
```bash
# Install dependencies
npm install

# Run tests
npm test

# Build extension
npm run build

# Development mode
npm run dev
```

### Project Structure
```
student-buddy-extension/
├── manifest.json          # Extension configuration
├── content.js             # Main functionality & AI integration
├── background.js          # Service worker
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── styles.css            # Styling for all components
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── package.json          # Dependencies and scripts
├── test.js              # Automated tests
└── README.md            # This file
```

### Testing Your Extension

Run the built-in test suite:
```bash
npm test
```

This will verify:
- ✅ All required files are present
- ✅ Manifest.json is valid
- ✅ Core functionality is implemented
- ✅ Extension structure is correct

## 🎨 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Extension Popup
![Popup Interface](https://via.placeholder.com/350x400/667eea/ffffff?text=Student+Buddy+Popup)

### LeetCode Integration
![LeetCode Integration](https://via.placeholder.com/800x500/4CAF50/ffffff?text=LeetCode+with+Student+Buddy)

### Chat Interface
![Chat Interface](https://via.placeholder.com/350x500/f7f7f9/333333?text=AI+Chat+Interface)

</details>

## 🔧 Troubleshooting

### Common Issues

<details>
<summary><strong>🚫 Extension not loading</strong></summary>

**Solution:**
1. Ensure Developer mode is enabled in `chrome://extensions/`
2. Check that all required files are present
3. Look for errors in the Chrome extension console
4. Try reloading the extension
</details>

<details>
<summary><strong>🔑 API Key not working</strong></summary>

**Solution:**
1. Verify your API key is correctly copied
2. Check that the API key has proper permissions
3. Ensure you're not exceeding API rate limits
4. Try generating a new API key
</details>

<details>
<summary><strong>🎯 Extension not appearing on websites</strong></summary>

**Solution:**
1. Check if the website is in the supported list
2. Refresh the page after installing the extension
3. Look for the floating 🎓 button in bottom-right corner
4. Check browser console for JavaScript errors
</details>

<details>
<summary><strong>💬 Chat not responding</strong></summary>

**Solution:**
1. Verify your internet connection
2. Check API key configuration
3. Look for error messages in the chat
4. Try refreshing the page and reopening the extension
</details>

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Bugs
- Use the [GitHub Issues](https://github.com/yourusername/student-buddy-extension/issues) page
- Include detailed description and steps to reproduce
- Add screenshots if applicable

### 💡 Suggest Features
- Open a feature request on GitHub Issues
- Describe the use case and expected behavior
- Consider implementation complexity

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing the powerful AI capabilities
- **Chrome Extensions Team** - For the excellent platform and documentation
- **Open Source Community** - For inspiration and best practices
- **Beta Testers** - For valuable feedback and bug reports

## 📞 Support & Contact

- 📧 **Email**: support@studentbuddy.dev
- 🐙 **GitHub**: [Student Buddy Extension](https://github.com/yourusername/student-buddy-extension)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/student-buddy-extension/discussions)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/student-buddy-extension/issues)

## 🔮 Roadmap

### Version 1.1 (Next Release)
- [ ] 🎨 Theme customization options
- [ ] 📊 Learning progress tracking
- [ ] 🔄 Conversation history
- [ ] 🌐 Multi-language support

### Version 1.2 (Future)
- [ ] 🤖 Multiple AI model support
- [ ] 📱 Mobile app companion
- [ ] 👥 Collaborative learning features
- [ ] 📈 Advanced analytics dashboard

### Version 2.0 (Long-term)
- [ ] 🎓 Personalized learning paths
- [ ] 🏆 Achievement system
- [ ] 👨‍🏫 Virtual coding mentorship
- [ ] 🌟 Community features

---

<div align="center">

**Made with ❤️ for learners, by learners**

⭐ **Star this repo if you find it helpful!** ⭐

[Report Bug](https://github.com/yourusername/student-buddy-extension/issues) · 
[Request Feature](https://github.com/yourusername/student-buddy-extension/issues) · 
[Join Discussion](https://github.com/yourusername/student-buddy-extension/discussions)

</div>
