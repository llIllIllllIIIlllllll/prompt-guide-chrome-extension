// Popup script for Prompt Guide Assistant
document.addEventListener('DOMContentLoaded', function() {
  // Initialize popup
  initializePopup();
  
  // Add event listeners
  addEventListeners();
});

function initializePopup() {
  // Load saved settings
  chrome.storage.sync.get(['helperEnabled'], function(result) {
    const helperEnabled = result.helperEnabled !== false; // Default to true
    updateStatus(helperEnabled);
  });
}

function addEventListeners() {
  // Quick Actions
  document.getElementById('analyzePrompt').addEventListener('click', analyzeCurrentPrompt);
  document.getElementById('improvePrompt').addEventListener('click', improveCurrentPrompt);
  
  // Templates
  document.getElementById('taskTemplate').addEventListener('click', () => insertTemplate('task'));
  document.getElementById('creativeTemplate').addEventListener('click', () => insertTemplate('creative'));
  document.getElementById('analysisTemplate').addEventListener('click', () => insertTemplate('analysis'));
  document.getElementById('codeTemplate').addEventListener('click', () => insertTemplate('code'));
  
  // Settings
  document.getElementById('toggleHelper').addEventListener('click', toggleHelper);
  document.getElementById('resetSettings').addEventListener('click', resetSettings);
}

function analyzeCurrentPrompt() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'analyzePrompt'
    }, function(response) {
      if (chrome.runtime.lastError) {
        showMessage('Please refresh the page and try again.');
        return;
      }
      
      if (response && response.analysis) {
        showAnalysis(response.analysis);
      } else {
        showMessage('No prompt found to analyze. Focus on a text input first.');
      }
    });
  });
}

function improveCurrentPrompt() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'improvePrompt'
    }, function(response) {
      if (chrome.runtime.lastError) {
        showMessage('Please refresh the page and try again.');
        return;
      }
      
      if (response && response.success) {
        showMessage('Prompt improved successfully!');
      } else {
        showMessage('No prompt found to improve. Focus on a text input first.');
      }
    });
  });
}

function insertTemplate(templateType) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'insertTemplate',
      template: templateType
    }, function(response) {
      if (chrome.runtime.lastError) {
        showMessage('Please refresh the page and try again.');
        return;
      }
      
      if (response && response.success) {
        showMessage(`${templateType.charAt(0).toUpperCase() + templateType.slice(1)} template inserted!`);
      } else {
        showMessage('Focus on a text input first to insert template.');
      }
    });
  });
}

function toggleHelper() {
  chrome.storage.sync.get(['helperEnabled'], function(result) {
    const newState = !result.helperEnabled;
    chrome.storage.sync.set({helperEnabled: newState}, function() {
      updateStatus(newState);
      
      // Notify content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleHelper',
          enabled: newState
        });
      });
    });
  });
}

function resetSettings() {
  chrome.storage.sync.clear(function() {
    updateStatus(true);
    showMessage('Settings reset to defaults!');
  });
}

function updateStatus(enabled) {
  const statusElement = document.getElementById('statusText');
  const toggleButton = document.getElementById('toggleHelper');
  
  if (enabled) {
    statusElement.textContent = '✅ Extension Active';
    toggleButton.textContent = 'Disable Helper';
  } else {
    statusElement.textContent = '❌ Extension Disabled';
    toggleButton.textContent = 'Enable Helper';
  }
}

function showMessage(message) {
  const statusElement = document.getElementById('statusText');
  const originalText = statusElement.textContent;
  
  statusElement.textContent = message;
  statusElement.style.backgroundColor = '#fff3cd';
  statusElement.style.color = '#856404';
  
  setTimeout(() => {
    statusElement.textContent = originalText;
    statusElement.style.backgroundColor = '#d4edda';
    statusElement.style.color = '#155724';
  }, 2000);
}

function showAnalysis(analysis) {
  // Create analysis modal in popup
  const existingModal = document.querySelector('.analysis-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  const modal = document.createElement('div');
  modal.className = 'analysis-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    max-height: 300px;
    overflow-y: auto;
    font-family: Arial, sans-serif;
  `;
  
  content.innerHTML = `
    <h3 style="margin-top: 0;">📊 Prompt Analysis</h3>
    <div style="font-size: 12px; line-height: 1.4;">
      ${analysis}
    </div>
    <button onclick="this.closest('.analysis-modal').remove()" style="margin-top: 15px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // Auto-close after 10 seconds
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 10000);
}