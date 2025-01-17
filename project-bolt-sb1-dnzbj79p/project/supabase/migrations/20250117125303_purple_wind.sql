/*
  # Create appointments table

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `patientName` (text, required)
      - `dob` (date, required)
      - `age` (integer, required)
      - `mobileNumber` (text, required)
      - `reason` (text)
      - `appointmentDate` (date, required)
      - `appointmentTime` (text, required)
      - `referredBy` (text)
      - `status` (text, required)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `appointments` table
    - Add policies for authenticated users to manage appointments
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patientName text NOT NULL,
  dob date NOT NULL,
  age integer NOT NULL,
  mobileNumber text NOT NULL,
  reason text,
  appointmentDate date NOT NULL,
  appointmentTime text NOT NULL,
  referredBy text,
  status text NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all appointments
CREATE POLICY "Users can view all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert appointments
CREATE POLICY "Users can insert appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update appointments
CREATE POLICY "Users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);