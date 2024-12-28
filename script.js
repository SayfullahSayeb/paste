// Initialize Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qktsqmeichhkpufypqcf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdHNxbWVpY2hoa3B1ZnlwcWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMzE5OTYsImV4cCI6MjA1MDcwNzk5Nn0.Y0Vs32hYLxH2NzwaJccEcBfCfWm8JTdK3Ensy3AoYMs';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Form submission handler
document.getElementById('pasteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const password = document.getElementById('password').value;
  const expiry = document.getElementById('expiry').value;

  const errorDiv = document.getElementById('error');
  const resultDiv = document.getElementById('result');
  const linkElement = document.getElementById('link');

  // Reset previous results
  errorDiv.classList.add('hidden');
  resultDiv.classList.add('hidden');

  try {
    // Insert paste into Supabase
    const { data, error } = await supabase.from('pastes').insert([{ title, content, password, expiry }]).select();
    if (error) throw error;

    // Generate and display the link
    const pasteId = data[0].id;
    const link = `https://ssayeb7.github.io/p/${pasteId}`;
    linkElement.textContent = link;
    linkElement.setAttribute('href', link);
    resultDiv.classList.remove('hidden');
  } catch (err) {
    errorDiv.textContent = `Error: ${err.message}`;
    errorDiv.classList.remove('hidden');
  }
});

// Copy link to clipboard
document.getElementById('copyButton').addEventListener('click', () => {
  const link = document.getElementById('link').textContent;
  navigator.clipboard.writeText(link).then(() => {
    alert('Link copied to clipboard!');
  });
});
