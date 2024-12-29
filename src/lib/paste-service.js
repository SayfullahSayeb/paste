import { supabase } from './supabase';
import { generateId, hashPassword } from './utils';

export async function createPaste({ title, content, password, expiryTime }) {
  const id = generateId();
  const paste = {
    id,
    title: title || 'Untitled',
    content,
    password_hash: password ? hashPassword(password) : null,
    expires_at: expiryTime
  };

  const { error } = await supabase
    .from('pastes')
    .insert([paste]);

  if (error) throw error;
  return id;
}

export async function getPaste(id) {
  const { data, error } = await supabase
    .from('pastes')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code === 'PGRST116') {
    return null; // Handle "not found" gracefully
  }
  if (error) throw error;
  return data;
}

export function verifyPassword(paste, password) {
  return paste.password_hash === hashPassword(password);
}