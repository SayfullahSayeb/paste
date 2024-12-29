export function generatePasteUrl(id) {
  return `${window.location.origin}/paste/#${id}`; 
}

export function getPasteIdFromUrl() {
  return window.location.hash.slice(1);
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}
