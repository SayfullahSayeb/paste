import { elements, toggleLoading, showError } from '../lib/dom-utils';
import { createPaste } from '../lib/paste-service';
import { generatePasteUrl, copyToClipboard } from '../lib/url-utils';
import { calculateExpiryTime } from '../lib/utils';

export async function handleCreatePaste() {
  try {
    toggleLoading(elements.createButton, true);

    const title = elements.titleInput.value.trim();
    const content = elements.contentInput.value.trim();
    const password = elements.passwordInput.value;
    const expiryTime = calculateExpiryTime(elements.expirySelect.value);
    
    if (!content) {
      showError('Please enter some content');
      return;
    }

    const id = await createPaste({ title, content, password, expiryTime });
    const url = generatePasteUrl(id);
    
    await copyToClipboard(url);
    alert('Paste URL copied to clipboard: ' + url);
    window.location.hash = id;
    location.reload();
  } catch (error) {
    console.error('Error creating paste:', error);
    showError('Failed to create paste. Please try again.');
  } finally {
    toggleLoading(elements.createButton, false);
  }
}