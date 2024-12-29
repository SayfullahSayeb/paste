import { supabase } from './supabase';
import { generateId, hashPassword } from './utils';

export async function createPaste({ title, content, password, expiryTime }) {
  try {
    const id = generateId();
    const paste = {
      id,
      title: title || 'Untitled',
      content,
      password_hash: password ? hashPassword(password) : null,
      expires_at: expiryTime
    };

    const { data, error } = await supabase
      .from('pastes')
      .insert([paste])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to create paste: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from paste creation');
    }

    return id;
  } catch (error) {
    console.error('Create paste error:', error);
    throw error;
  }
}

export async function getPaste(id) {
  try {
    const { data, error } = await supabase
      .from('pastes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Handle "not found" gracefully
      }
      console.error('Supabase error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Get paste error:', error);
    throw error;
  }
}

export function verifyPassword(paste, password) {
  return paste.password_hash === hashPassword(password);
}
