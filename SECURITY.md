# 🔒 Security Guidelines

## API Key Management

### ⚠️ IMPORTANT SECURITY NOTICE
**NEVER commit API keys or sensitive credentials to version control!**

### 🔑 Secure Setup Process

1. **Get Your Gemini API Key:**
   ```bash
   # Visit: https://makersuite.google.com/app/apikey
   # Sign in with your Google account
   # Create a new API key
   # Copy the generated key
   ```

2. **Secure Local Development:**
   ```bash
   # Copy the environment template
   cp .env.template .env
   
   # Edit .env file and add your API key
   # This file is already in .gitignore and won't be committed
   ```

3. **Extension Configuration:**
   - The extension stores API keys in Chrome's secure storage
   - Keys are encrypted and stored locally per user
   - Keys are never transmitted except to the official Gemini API

## 🛡️ Security Features

### Built-in Protections
- ✅ **Manifest V3** - Latest Chrome security standards
- ✅ **HTTPS Only** - All API calls use secure connections
- ✅ **Content Security Policy** - Prevents XSS attacks
- ✅ **Permission Scoping** - Minimal required permissions
- ✅ **Secure Storage** - Chrome storage API encryption

### API Security
- ✅ **Key Validation** - Input sanitization and validation
- ✅ **Rate Limiting** - Respectful API usage
- ✅ **Error Handling** - No sensitive data in error messages
- ✅ **CORS Compliance** - Proper origin handling

## 🚨 Security Checklist

Before deploying or sharing:

- [ ] No API keys in source code
- [ ] .env files in .gitignore
- [ ] Secrets not in commit history
- [ ] Proper error handling implemented
- [ ] Content Security Policy configured
- [ ] Permissions minimized
- [ ] HTTPS endpoints only

## 🔍 Audit Commands

Run these to check for security issues:

```bash
# Check for potential secrets in code
grep -r "api.*key\|secret\|password" --exclude-dir=node_modules .

# Verify .gitignore coverage
git status --ignored

# Check commit history for secrets (if already committed)
git log --all --full-history -- "*.env"
```

## 📞 Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email: security@studentbuddy.dev
3. Include detailed description
4. Allow time for patching before disclosure

## 🔄 Regular Security Maintenance

- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Review permissions annually
- [ ] Monitor for security advisories
- [ ] Audit extension permissions

---

**Remember: Security is everyone's responsibility! 🛡️**
