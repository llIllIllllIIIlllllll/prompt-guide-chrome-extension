# 🚀 Prompt Guide Chrome Extension

A powerful Chrome extension that helps users improve their prompts with AI best practices, templates, and real-time suggestions.

## ✨ Features

### 🎯 Smart Prompt Enhancement
- **Real-time Analysis**: Analyzes your prompts and provides improvement suggestions
- **Auto-improvement**: Automatically enhances prompts with better structure and clarity
- **Vague Language Detection**: Identifies and helps replace unclear terms

### 📝 Professional Templates
- **Task-Based Prompts**: Structured templates for specific tasks
- **Creative Prompts**: Templates for creative content generation
- **Analysis Prompts**: Templates for data analysis and research
- **Code Generation**: Templates for programming requests

### 🛠️ Key Capabilities
- **Context Addition**: Helps add relevant background information
- **Structure Enhancement**: Organizes prompts with clear sections
- **Clarity Improvement**: Makes requests more specific and actionable
- **Format Specification**: Guides users to specify desired output formats

## 🚀 Installation

### Method 1: Load Unpacked Extension (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/llIllIllllIIIlllllll/prompt-guide-chrome-extension.git
   cd prompt-guide-chrome-extension
   ```

2. **Enable Developer Mode**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the extension folder
   - The extension will appear in your extensions list

4. **Pin the Extension**
   - Click the puzzle piece icon in Chrome toolbar
   - Pin "Prompt Guide Assistant" for easy access

### Method 2: Chrome Web Store (Coming Soon)
The extension will be available on the Chrome Web Store soon!

## 🎮 How to Use

### 1. **Floating Helper Button**
- Focus on any text input field (textarea, input, contentEditable)
- The "✨ Prompt Guide" button appears in the top-right corner
- Click it to access all features

### 2. **Extension Popup**
- Click the extension icon in the toolbar
- Access quick actions, templates, and settings
- View best practices and tips

### 3. **Quick Actions**
- **Analyze Prompt**: Get a detailed analysis with improvement suggestions
- **Improve Prompt**: Automatically enhance your current prompt
- **Insert Templates**: Choose from professional prompt templates

## 🔧 Features in Detail

### Smart Analysis
The extension analyzes prompts for:
- Vague language (it, this, that, something)
- Missing context and background
- Lack of format specification
- Prompt length and detail level
- Missing examples or clarifications

### Template System
**Task-Based Template:**
```
**Task:** [Describe what you need done]
**Context:** [Background information]
**Requirements:** [Specific needs and constraints]
**Format:** [How you want the output structured]
**Examples:** [If helpful, provide examples]
```

**Creative Template:**
```
**Creative Brief:** [What you want to create]
**Style/Tone:** [Describe the desired style]
**Audience:** [Who is this for?]
**Key Elements:** [Must-have components]
**Inspiration:** [Reference materials or examples]
```

### Enhancement Features
- **Structure Addition**: Organizes prompts with clear sections
- **Context Enhancement**: Adds background and situational information
- **Clarity Improvement**: Replaces vague terms with specific descriptions
- **Format Specification**: Guides output format requirements

## 💡 Best Practices Built-In

The extension promotes these AI prompting best practices:

1. **Be Specific**: Clear goals get better results
2. **Add Context**: Background helps AI understand your needs
3. **Use Examples**: Show what you want with concrete examples
4. **Specify Format**: Define how you want the output structured
5. **Break Down Complex Tasks**: Divide complex requests into steps

## ⚙️ Settings & Configuration

- **Toggle Helper Button**: Enable/disable the floating helper
- **Reset Settings**: Return to default configuration
- **Extension Status**: Monitor active/inactive state

## 🌐 Compatibility

- **Chrome Version**: 88+ (Manifest V3)
- **Websites**: Works on all websites with text inputs
- **Input Types**: textarea, input[type="text"], contentEditable elements

## 🔒 Privacy & Permissions

The extension requires minimal permissions:
- **activeTab**: To interact with the current webpage
- **storage**: To save user preferences

**No data is sent to external servers** - all processing happens locally in your browser.

## 🛠️ Development

### Project Structure
```
prompt-guide-chrome-extension/
├── manifest.json          # Extension configuration
├── content.js            # Main functionality script
├── popup.html           # Extension popup interface
├── popup.js             # Popup functionality
├── styles.css           # Extension styling
└── README.md           # Documentation
```

### Key Components
- **Content Script**: Handles page interaction and prompt modification
- **Popup Interface**: Provides quick access to features
- **Template System**: Pre-built prompt structures
- **Analysis Engine**: Evaluates and scores prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Future Enhancements

- [ ] AI-powered prompt suggestions
- [ ] Custom template creation
- [ ] Prompt history and favorites
- [ ] Multi-language support
- [ ] Integration with popular AI platforms
- [ ] Advanced analytics and insights

## 📞 Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Check the documentation
- Review the best practices guide

---

**Made with ❤️ for better AI interactions**

Transform your prompts from good to great with the Prompt Guide Assistant!