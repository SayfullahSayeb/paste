export function generateId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function hashPassword(password) {
  return password.split('').reduce((hash, char) => {
    return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
  }, 0).toString(16);
}

export function calculateExpiryTime(seconds) {
  if (!seconds || seconds === '0') return null;
  return new Date(Date.now() + seconds * 1000).toISOString();
}