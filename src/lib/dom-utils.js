// DOM element selectors
export const elements = {
  createSection: document.getElementById('create-paste'),
  viewSection: document.getElementById('view-paste'),
  titleInput: document.getElementById('paste-title'),
  contentInput: document.getElementById('paste-content'),
  expirySelect: document.getElementById('expiry-time'),
  passwordInput: document.getElementById('paste-password'),
  createButton: document.getElementById('create-button'),
  viewTitle: document.getElementById('view-title'),
  viewContent: document.getElementById('view-content'),
  passwordPrompt: document.getElementById('password-prompt'),
  passwordSubmit: document.getElementById('submit-password'),
  copyButton: document.getElementById('copy-button'),
  newPasteButton: document.getElementById('new-paste')
};

// UI state management
export function toggleLoading(button, isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Creating...' : 'Create Paste';
}

export function showCopySuccess(button) {
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  setTimeout(() => {
    button.textContent = originalText;
  }, 2000);
}

export function showError(message) {
  alert(message);
}