import { elements, showCopySuccess } from './src/lib/dom-utils';
import { handleCreatePaste } from './src/handlers/create-paste';
import { handleViewPaste } from './src/handlers/view-paste';
import { getPasteIdFromUrl, copyToClipboard } from './src/lib/url-utils';

// Event Listeners
elements.createButton.addEventListener('click', handleCreatePaste);

elements.copyButton.addEventListener('click', async () => {
  const success = await copyToClipboard(elements.viewContent.textContent);
  if (success) {
    showCopySuccess(elements.copyButton);
  } else {
    alert('Failed to copy content');
  }
});

elements.newPasteButton.addEventListener('click', () => {
  window.location.hash = '';
  location.reload();
});

// Initialize
window.addEventListener('load', () => handleViewPaste(getPasteIdFromUrl()));
window.addEventListener('hashchange', () => handleViewPaste(getPasteIdFromUrl()));