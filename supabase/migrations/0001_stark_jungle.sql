/*
  # Create pastes table

  1. New Tables
    - `pastes`
      - `id` (text, primary key) - Custom generated ID
      - `title` (text) - Paste title
      - `content` (text) - Paste content
      - `password_hash` (text) - Optional hashed password
      - `expires_at` (timestamptz) - When the paste expires
      - `created_at` (timestamptz) - When the paste was created

  2. Security
    - Enable RLS on `pastes` table
    - Add policies for:
      - Anyone can create pastes
      - Anyone can read non-expired, non-password-protected pastes
      - Anyone can read password-protected pastes (password check in application)
*/

CREATE TABLE IF NOT EXISTS pastes (
  id text PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  password_hash text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pastes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create pastes"
  ON pastes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read non-expired pastes"
  ON pastes
  FOR SELECT
  TO anon
  USING (
    (expires_at IS NULL OR expires_at > now())
  );