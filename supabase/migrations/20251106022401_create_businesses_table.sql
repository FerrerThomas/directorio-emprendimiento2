/*
  # Create businesses table

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text, business name)
      - `category` (text, business category)
      - `address` (text, business address)
      - `phone` (text, business phone)
      - `email` (text, business email)
      - `description` (text, detailed description)
      - `website` (text, website URL)
      - `image_url` (text, business image)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `businesses` table
    - Add policy for all users to read businesses (public data)
*/

CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  address text NOT NULL,
  phone text DEFAULT '',
  email text DEFAULT '',
  description text DEFAULT '',
  website text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses are publicly readable"
  ON businesses
  FOR SELECT
  TO public
  USING (true);
