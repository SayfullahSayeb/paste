// Initialize Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qktsqmeichhkpufypqcf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdHNxbWVpY2hoa3B1ZnlwcWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMzE5OTYsImV4cCI6MjA1MDcwNzk5Nn0.Y0Vs32hYLxH2NzwaJccEcBfCfWm8JTdK3Ensy3AoYMs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Form submission handler
document.getElementById('pasteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const password = document.getElementById('password').value;
  const expiry = document.getElementById('expiry').value;
  const link = `https://ssayeb7.github.io/p/${pasteId}`;


  // Prepare data for Supabase
  const data = { title, content, password, expiry };

  try {
    // Insert data into Supabase
    const { data: result, error } = await supabase.from('pastes').insert([data]).select();
    if (error) throw error;

    // Display the generated URL
    const pasteId = result[0].id;
    const link = `${window.location.origin}/p/${pasteId}`;
    document.getElementById('link').textContent = link;
    document.getElementById('link').setAttribute('href', link);
    document.getElementById('result').classList.remove('hidden');
  } catch (err) {
    alert('Error creating paste: ' + err.message);
  }
});

// Copy link to clipboard
document.getElementById('copyButton').addEventListener('click', () => {
  const link = document.getElementById('link').textContent;
  navigator.clipboard.writeText(link).then(() => {
    alert('Link copied to clipboard!');
  });
});
