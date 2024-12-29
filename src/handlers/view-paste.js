import { elements, showError } from '../lib/dom-utils';
import { getPaste, verifyPassword } from '../lib/paste-service';

function showPaste(paste) {
  elements.createSection.classList.add('hidden');
  elements.viewSection.classList.remove('hidden');
  elements.viewTitle.textContent = paste.title;
  elements.viewContent.textContent = paste.content;
}

export async function handleViewPaste(id) {
  if (!id) return;

  try {
    const paste = await getPaste(id);
    if (!paste) {
      showError('Paste not found');
      window.location.hash = '';
      return;
    }

    if (paste.expires_at && new Date(paste.expires_at) < new Date()) {
      showError('This paste has expired');
      window.location.hash = '';
      return;
    }

    if (paste.password_hash) {
      elements.createSection.classList.add('hidden');
      elements.passwordPrompt.classList.remove('hidden');
      
      elements.passwordSubmit.onclick = () => {
        const input = document.getElementById('password-input');
        if (verifyPassword(paste, input.value)) {
          elements.passwordPrompt.classList.add('hidden');
          showPaste(paste);
        } else {
          showError('Incorrect password');
        }
      };
    } else {
      showPaste(paste);
    }
  } catch (error) {
    console.error('Error loading paste:', error);
    showError('Failed to load paste. Please try again.');
  }
}