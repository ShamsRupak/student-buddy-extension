// content.js - Student Buddy AI Learning Assistant
console.log('Student Buddy: Content script initialized');

class StudentBuddy {
    constructor() {
        this.apiKey = null;
        this.isVisible = false;
        this.currentProblem = null;
        this.conversationHistory = [];
        this.init();
    }

    async init() {
        // Get API key from storage
        await this.loadSettings();
        
        // Detect current platform and initialize
        this.detectPlatform();
        
        // Add the buddy panel
        this.createBuddyPanel();
        
        // Set up observers for dynamic content
        this.setupObservers();
    }

    async loadSettings() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['geminiApiKey'], (result) => {
                this.apiKey = result.geminiApiKey;
                resolve();
            });
        });
    }

    detectPlatform() {
        const hostname = window.location.hostname;
        
        if (hostname.includes('leetcode.com')) {
            this.platform = 'leetcode';
            this.setupLeetCodeHelpers();
        } else if (hostname.includes('codepen.io')) {
            this.platform = 'codepen';
        } else if (hostname.includes('github.com')) {
            this.platform = 'github';
        } else if (hostname.includes('stackoverflow.com')) {
            this.platform = 'stackoverflow';
        } else {
            this.platform = 'general';
        }
        
        console.log(`Student Buddy: Detected platform - ${this.platform}`);
    }

    createBuddyPanel() {
        // Create floating action button
        const fab = document.createElement('div');
        fab.id = 'student-buddy-fab';
        fab.innerHTML = '🎓';
        fab.addEventListener('click', () => this.togglePanel());
        document.body.appendChild(fab);

        // Create main panel
        const panel = document.createElement('div');
        panel.id = 'student-buddy-panel';
        panel.innerHTML = this.getPanelHTML();
        document.body.appendChild(panel);

        this.setupPanelEventListeners();
    }

    getPanelHTML() {
        return `
            <div class="buddy-header">
                <div class="buddy-title">
                    <span class="buddy-icon">🎓</span>
                    <h3>Student Buddy</h3>
                </div>
                <button class="close-btn" id="buddy-close">×</button>
            </div>
            
            <div class="buddy-content">
                <div class="platform-info">
                    <span class="platform-badge">${this.platform.toUpperCase()}</span>
                    <span class="status-indicator ${this.apiKey ? 'connected' : 'disconnected'}"></span>
                </div>
                
                <div class="action-buttons">
                    <button class="action-btn primary" id="get-hint">
                        💡 Get Hint
                    </button>
                    <button class="action-btn secondary" id="explain-concept">
                        📚 Explain Concept
                    </button>
                    <button class="action-btn secondary" id="debug-help">
                        🐛 Debug Help
                    </button>
                    <button class="action-btn secondary" id="step-by-step">
                        📝 Step by Step
                    </button>
                </div>
                
                <div class="chat-container">
                    <div class="messages" id="buddy-messages">
                        <div class="message assistant">
                            <div class="message-content">
                                <p>👋 Hi! I'm your AI learning buddy. I can help you with:</p>
                                <ul>
                                    <li>Getting hints without spoilers</li>
                                    <li>Explaining concepts step by step</li>
                                    <li>Debugging your code</li>
                                    <li>Providing learning resources</li>
                                </ul>
                                ${!this.apiKey ? '<p class="warning">⚠️ Please configure your Gemini API key in the extension popup to get started!</p>' : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-area">
                        <input type="text" id="buddy-input" placeholder="Ask me anything about this problem..." ${!this.apiKey ? 'disabled' : ''}>
                        <button id="buddy-send" ${!this.apiKey ? 'disabled' : ''}>Send</button>
                    </div>
                </div>
            </div>
            
            <div class="buddy-footer">
                <span class="powered-by">Powered by Gemini AI</span>
            </div>
        `;
    }

    setupPanelEventListeners() {
        // Close button
        document.getElementById('buddy-close').addEventListener('click', () => this.togglePanel());
        
        // Action buttons
        document.getElementById('get-hint').addEventListener('click', () => this.getHint());
        document.getElementById('explain-concept').addEventListener('click', () => this.explainConcept());
        document.getElementById('debug-help').addEventListener('click', () => this.getDebugHelp());
        document.getElementById('step-by-step').addEventListener('click', () => this.getStepByStep());
        
        // Chat input
        const input = document.getElementById('buddy-input');
        const sendBtn = document.getElementById('buddy-send');
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        sendBtn.addEventListener('click', () => this.sendMessage());
    }

    togglePanel() {
        const panel = document.getElementById('student-buddy-panel');
        const fab = document.getElementById('student-buddy-fab');
        
        this.isVisible = !this.isVisible;
        
        if (this.isVisible) {
            panel.classList.add('visible');
            fab.classList.add('hidden');
        } else {
            panel.classList.remove('visible');
            fab.classList.remove('hidden');
        }
    }

    async sendMessage() {
        const input = document.getElementById('buddy-input');
        const message = input.value.trim();
        
        if (!message || !this.apiKey) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        this.showTypingIndicator();
        
        try {
            const response = await this.queryGemini(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant', true);
            console.error('Gemini API Error:', error);
        }
    }

    async getHint() {
        if (!this.apiKey) {
            this.addMessage('Please configure your API key first!', 'assistant', true);
            return;
        }
        
        const problemContext = this.extractProblemContext();
        const prompt = `Give me a subtle hint for this coding problem without revealing the solution. Focus on the approach or key insight needed:\n\n${problemContext}`;
        
        this.showTypingIndicator();
        
        try {
            const response = await this.queryGemini(prompt);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I couldn\'t generate a hint right now.', 'assistant', true);
        }
    }

    async explainConcept() {
        if (!this.apiKey) {
            this.addMessage('Please configure your API key first!', 'assistant', true);
            return;
        }
        
        const problemContext = this.extractProblemContext();
        const prompt = `Explain the key programming concepts needed to solve this problem in simple terms:\n\n${problemContext}`;
        
        this.showTypingIndicator();
        
        try {
            const response = await this.queryGemini(prompt);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I couldn\'t explain the concept right now.', 'assistant', true);
        }
    }

    async getDebugHelp() {
        if (!this.apiKey) {
            this.addMessage('Please configure your API key first!', 'assistant', true);
            return;
        }
        
        const codeContext = this.extractCodeContext();
        if (!codeContext) {
            this.addMessage('I don\'t see any code to debug. Please write some code first!', 'assistant');
            return;
        }
        
        const prompt = `Help debug this code. Point out potential issues and suggest improvements:\n\n${codeContext}`;
        
        this.showTypingIndicator();
        
        try {
            const response = await this.queryGemini(prompt);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I couldn\'t help with debugging right now.', 'assistant', true);
        }
    }

    async getStepByStep() {
        if (!this.apiKey) {
            this.addMessage('Please configure your API key first!', 'assistant', true);
            return;
        }
        
        const problemContext = this.extractProblemContext();
        const prompt = `Provide a step-by-step approach to solve this problem without giving the exact code:\n\n${problemContext}`;
        
        this.showTypingIndicator();
        
        try {
            const response = await this.queryGemini(prompt);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I couldn\'t provide a step-by-step guide right now.', 'assistant', true);
        }
    }

    async queryGemini(prompt) {
        try {
            console.log('Student Buddy: Making API request with prompt length:', prompt.length);
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            console.log('Student Buddy: API response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Student Buddy: API Error Response:', errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Student Buddy: API response received successfully');
            
            // Check if response has the expected structure
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
                console.error('Student Buddy: Unexpected API response structure:', data);
                throw new Error('Unexpected API response structure');
            }
            
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Student Buddy: queryGemini error:', error);
            throw error;
        }
    }

    extractProblemContext() {
        let context = '';
        
        if (this.platform === 'leetcode') {
            console.log('Student Buddy: Extracting LeetCode problem context...');
            
            // Try multiple selectors for the title
            const titleSelectors = [
                '[data-cy="question-title"]',
                '.css-v3d350',
                '[class*="title"]',
                'h1',
                '.question-title',
                '[data-testid="question-title"]'
            ];
            
            let titleElement = null;
            for (const selector of titleSelectors) {
                titleElement = document.querySelector(selector);
                if (titleElement && titleElement.textContent.trim()) {
                    console.log('Student Buddy: Found title with selector:', selector);
                    break;
                }
            }
            
            // Try multiple selectors for the description
            const descSelectors = [
                '[data-track-load="description_content"]',
                '.content__u3I1',
                '.question-content',
                '[class*="description"]',
                '[class*="content"]',
                '.elfjS',
                '.question-detail',
                'div[data-key="description-content"]'
            ];
            
            let descElement = null;
            for (const selector of descSelectors) {
                descElement = document.querySelector(selector);
                if (descElement && descElement.textContent.trim()) {
                    console.log('Student Buddy: Found description with selector:', selector);
                    break;
                }
            }
            
            if (titleElement) {
                const title = titleElement.textContent.trim();
                context += `Problem: ${title}\n\n`;
                console.log('Student Buddy: Extracted title:', title.substring(0, 50) + '...');
            } else {
                console.log('Student Buddy: No title found');
            }
            
            if (descElement) {
                const description = descElement.textContent.trim();
                context += `Description: ${description}`;
                console.log('Student Buddy: Extracted description length:', description.length);
            } else {
                console.log('Student Buddy: No description found');
            }
            
            // If we still don't have context, try a more general approach
            if (!context) {
                const pageTitle = document.title;
                if (pageTitle.includes('LeetCode')) {
                    context = `I'm on a LeetCode problem page. The page title is: ${pageTitle}. Please provide general coding help and guidance.`;
                    console.log('Student Buddy: Using page title as context');
                }
            }
        }
        
        const finalContext = context || 'I need help with a coding problem. Please provide general programming guidance.';
        console.log('Student Buddy: Final context length:', finalContext.length);
        return finalContext;
    }

    extractCodeContext() {
        let code = '';
        
        if (this.platform === 'leetcode') {
            // Try to find the code editor
            const codeElement = document.querySelector('.monaco-editor textarea') ||
                              document.querySelector('.CodeMirror-code') ||
                              document.querySelector('textarea[data-mode]');
            
            if (codeElement) {
                code = codeElement.value || codeElement.textContent;
            }
        }
        
        return code;
    }

    setupLeetCodeHelpers() {
        // LeetCode-specific functionality
        this.observeProblemChanges();
    }

    observeProblemChanges() {
        // Observer for problem changes in SPA
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Check if problem content changed
                    const problemTitle = document.querySelector('[data-cy="question-title"]');
                    if (problemTitle && problemTitle.textContent !== this.currentProblem) {
                        this.currentProblem = problemTitle.textContent;
                        this.conversationHistory = []; // Reset conversation for new problem
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    setupObservers() {
        // Listen for API key updates
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (changes.geminiApiKey) {
                this.apiKey = changes.geminiApiKey.newValue;
                this.updatePanelState();
            }
        });
    }

    updatePanelState() {
        const statusIndicator = document.querySelector('.status-indicator');
        const input = document.getElementById('buddy-input');
        const sendBtn = document.getElementById('buddy-send');
        
        if (statusIndicator) {
            statusIndicator.className = `status-indicator ${this.apiKey ? 'connected' : 'disconnected'}`;
        }
        
        if (input && sendBtn) {
            input.disabled = !this.apiKey;
            sendBtn.disabled = !this.apiKey;
            input.placeholder = this.apiKey ? 'Ask me anything about this problem...' : 'Please configure API key first';
        }
    }

    addMessage(content, sender, isError = false) {
        const messagesContainer = document.getElementById('buddy-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender} ${isError ? 'error' : ''}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = this.formatMessage(content);
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(content) {
        // Basic markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('buddy-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="message-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize the Student Buddy when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new StudentBuddy();
    });
} else {
    new StudentBuddy();
}
