-- Database Schema for Pixal-Ai Auth

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- In Supabase this is handled by Auth, but schema kept generic
  role VARCHAR(20) CHECK (role IN ('patient', 'doctor')) NOT NULL DEFAULT 'patient',
  full_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles Table (Linked to Supabase Auth if used)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(20) CHECK (role IN ('patient', 'doctor')) DEFAULT 'patient',
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Doctor Details Table
CREATE TABLE doctor_profiles (
  profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  specialization VARCHAR(100),
  years_of_experience INTEGER,
  license_number VARCHAR(50),
  verification_status VARCHAR(20) DEFAULT 'peding' -- pending, verified, rejected
);

-- Patient Health Records Table (Basic)
CREATE TABLE patient_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  blood_group VARCHAR(5),
  allergies TEXT[],
  chronic_conditions TEXT[]
);
