// Prompt Guide Assistant - Content Script
class PromptGuideAssistant {
  constructor() {
    this.init();
  }

  init() {
    this.createPromptHelper();
    this.observeTextInputs();
    this.setupMessageListener();
  }

  createPromptHelper() {
    // Create floating helper button
    const helperButton = document.createElement('div');
    helperButton.id = 'prompt-guide-helper';
    helperButton.innerHTML = '✨ Prompt Guide';
    helperButton.className = 'prompt-guide-helper';
    helperButton.style.display = 'none';

    helperButton.addEventListener('click', () => {
      this.showPromptGuide();
    });

    document.body.appendChild(helperButton);
    this.helperButton = helperButton;
  }

  observeTextInputs() {
    // Monitor for text inputs and textareas
    document.addEventListener('focusin', (e) => {
      if (this.isTextInput(e.target)) {
        this.helperButton.style.display = 'block';
        this.currentInput = e.target;
      }
    });

    document.addEventListener('focusout', (e) => {
      setTimeout(() => {
        if (!document.activeElement || !this.isTextInput(document.activeElement)) {
          this.helperButton.style.display = 'none';
        }
      }, 100);
    });
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.action) {
        case 'analyzePrompt':
          this.analyzeCurrentPrompt(sendResponse);
          return true;
        case 'improvePrompt':
          this.improveCurrentPrompt(sendResponse);
          return true;
        case 'insertTemplate':
          this.insertTemplate(request.template, sendResponse);
          return true;
        case 'toggleHelper':
          this.toggleHelper(request.enabled);
          break;
      }
    });
  }

  isTextInput(element) {
    return element.tagName === 'TEXTAREA' || 
           (element.tagName === 'INPUT' && element.type === 'text') ||
           element.contentEditable === 'true';
  }

  showPromptGuide() {
    const modal = this.createModal();
    document.body.appendChild(modal);
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'prompt-guide-modal';

    const content = document.createElement('div');
    content.className = 'prompt-guide-modal-content';

    content.innerHTML = `
      <h2>🚀 Prompt Guide Assistant</h2>
      <div class="prompt-options">
        <button class="prompt-btn" data-action="improve">✨ Improve Current Prompt</button>
        <button class="prompt-btn" data-action="structure">📝 Add Structure</button>
        <button class="prompt-btn" data-action="clarity">🎯 Enhance Clarity</button>
        <button class="prompt-btn" data-action="context">📋 Add Context</button>
      </div>
      
      <div class="prompt-templates">
        <h3>Quick Templates:</h3>
        <button class="template-btn" data-template="task">Task-Based Prompt</button>
        <button class="template-btn" data-template="creative">Creative Prompt</button>
        <button class="template-btn" data-template="analysis">Analysis Prompt</button>
        <button class="template-btn" data-template="code">Code Generation</button>
      </div>
      
      <div class="prompt-tips">
        <h3>💡 Best Practices:</h3>
        <ul>
          <li>Be specific and clear about your goal</li>
          <li>Provide context and background information</li>
          <li>Use examples when helpful</li>
          <li>Specify the desired format or style</li>
          <li>Break complex requests into steps</li>
        </ul>
      </div>
      
      <button id="close-modal">Close</button>
    `;

    modal.appendChild(content);

    // Add event listeners
    content.addEventListener('click', (e) => {
      if (e.target.classList.contains('prompt-btn')) {
        this.handlePromptAction(e.target.dataset.action);
      } else if (e.target.classList.contains('template-btn')) {
        this.insertTemplate(e.target.dataset.template);
      } else if (e.target.id === 'close-modal') {
        modal.remove();
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  handlePromptAction(action) {
    if (!this.currentInput) return;

    const currentText = this.currentInput.value || this.currentInput.textContent || '';
    let improvedText = '';

    switch (action) {
      case 'improve':
        improvedText = this.improvePrompt(currentText);
        break;
      case 'structure':
        improvedText = this.addStructure(currentText);
        break;
      case 'clarity':
        improvedText = this.enhanceClarity(currentText);
        break;
      case 'context':
        improvedText = this.addContext(currentText);
        break;
    }

    this.updateInput(improvedText);
  }

  improvePrompt(text) {
    if (!text.trim()) return text;
    
    let improved = text;
    
    // Add specificity if missing
    if (!improved.includes('specifically') && !improved.includes('exactly')) {
      improved = `Please specifically ${improved}`;
    }
    
    // Add format request if missing
    if (!improved.toLowerCase().includes('format') && !improved.toLowerCase().includes('style')) {
      improved += `. Please provide the response in a clear, organized format.`;
    }
    
    return improved;
  }

  addStructure(text) {
    if (!text.trim()) return text;
    
    return `**Request:** ${text}

**Context:** [Please provide relevant background information]

**Expected Output:** [Describe the format and style you want]

**Additional Requirements:** [Any specific constraints or preferences]`;
  }

  enhanceClarity(text) {
    if (!text.trim()) return text;
    
    let enhanced = text;
    
    // Make it more specific
    enhanced = enhanced.replace(/\bit\b/g, '[specify what]');
    enhanced = enhanced.replace(/\bthis\b/g, '[specify this]');
    enhanced = enhanced.replace(/\bthat\b/g, '[specify that]');
    
    return `${enhanced}

Please be detailed and specific in your response.`;
  }

  addContext(text) {
    if (!text.trim()) return text;
    
    return `**Background:** [Provide context about your situation/project]

**Goal:** ${text}

**Audience:** [Who is this for?]

**Constraints:** [Any limitations or requirements]

**Success Criteria:** [How will you know if the response is helpful?]`;
  }

  insertTemplate(template, sendResponse) {
    if (!this.currentInput) {
      if (sendResponse) sendResponse({success: false});
      return;
    }

    const templates = {
      task: `**Task:** [Describe what you need done]
**Context:** [Background information]
**Requirements:** [Specific needs and constraints]
**Format:** [How you want the output structured]
**Examples:** [If helpful, provide examples]`,

      creative: `**Creative Brief:** [What you want to create]
**Style/Tone:** [Describe the desired style]
**Audience:** [Who is this for?]
**Key Elements:** [Must-have components]
**Inspiration:** [Reference materials or examples]`,

      analysis: `**Subject for Analysis:** [What needs to be analyzed]
**Analysis Type:** [Comparative, SWOT, trend analysis, etc.]
**Data/Information:** [Provide relevant data or context]
**Focus Areas:** [Specific aspects to examine]
**Output Format:** [How you want results presented]`,

      code: `**Programming Task:** [What you want to build/fix]
**Language/Framework:** [Specify technology stack]
**Requirements:** [Functional requirements]
**Constraints:** [Technical limitations]
**Input/Output:** [Expected inputs and outputs]
**Code Style:** [Any style preferences]`
    };

    this.updateInput(templates[template]);
    if (sendResponse) sendResponse({success: true});
  }

  updateInput(text) {
    if (!this.currentInput) return;

    if (this.currentInput.tagName === 'TEXTAREA' || this.currentInput.tagName === 'INPUT') {
      this.currentInput.value = text;
      this.currentInput.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (this.currentInput.contentEditable === 'true') {
      this.currentInput.textContent = text;
      this.currentInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  analyzeCurrentPrompt(sendResponse) {
    if (!this.currentInput) {
      sendResponse({success: false});
      return;
    }

    const text = this.currentInput.value || this.currentInput.textContent || '';
    if (!text.trim()) {
      sendResponse({success: false});
      return;
    }

    const analysis = this.analyzePrompt(text);
    sendResponse({success: true, analysis: analysis});
  }

  improveCurrentPrompt(sendResponse) {
    if (!this.currentInput) {
      sendResponse({success: false});
      return;
    }

    const currentText = this.currentInput.value || this.currentInput.textContent || '';
    if (!currentText.trim()) {
      sendResponse({success: false});
      return;
    }

    const improvedText = this.improvePrompt(currentText);
    this.updateInput(improvedText);
    sendResponse({success: true});
  }

  analyzePrompt(text) {
    const issues = [];
    const suggestions = [];

    // Check for vague language
    if (/\b(it|this|that|something|anything)\b/i.test(text)) {
      issues.push("Contains vague references");
      suggestions.push("Replace vague terms with specific descriptions");
    }

    // Check for missing context
    if (text.length < 50) {
      issues.push("Prompt may be too brief");
      suggestions.push("Add more context and background information");
    }

    // Check for format specification
    if (!/format|style|structure|output/i.test(text)) {
      issues.push("No output format specified");
      suggestions.push("Specify how you want the response formatted");
    }

    // Check for examples
    if (!/example|instance|like|such as/i.test(text)) {
      suggestions.push("Consider adding examples to clarify your request");
    }

    const score = Math.max(0, 100 - (issues.length * 20));
    
    return `
      <strong>Prompt Score: ${score}/100</strong><br><br>
      ${issues.length > 0 ? `<strong>Issues Found:</strong><br>• ${issues.join('<br>• ')}<br><br>` : ''}
      <strong>Suggestions:</strong><br>• ${suggestions.join('<br>• ')}
    `;
  }

  toggleHelper(enabled) {
    if (enabled) {
      this.helperButton.style.display = this.currentInput ? 'block' : 'none';
    } else {
      this.helperButton.style.display = 'none';
    }
  }
}

// Initialize the assistant when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PromptGuideAssistant();
  });
} else {
  new PromptGuideAssistant();
}