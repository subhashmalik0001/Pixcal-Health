# Health Assessment & Triage API

## Endpoints

### 1. Start Health Assessment
**POST** `/api/health/assessment/start`

**Request:**
```json
{
  "userId": "user123"
}
```

**Response:**
```json
{
  "sessionId": "uuid-here",
  "question": {
    "id": 0,
    "question": "Hello! I'm your AI health assistant. How are you feeling today?",
    "options": ["I have a fever", "Headache and cough", "Chest pain", "Difficulty breathing", "General checkup"]
  },
  "totalQuestions": 8
}
```

### 2. Submit Answer
**POST** `/api/health/assessment/answer`

**Request:**
```json
{
  "sessionId": "uuid-here",
  "answer": "I have a fever",
  "vitals": {
    "bp": { "systolic": 120, "diastolic": 80 },
    "spO2": 98,
    "temperature": 101.2,
    "heartRate": 85
  }
}
```

**Response (Next Question):**
```json
{
  "question": {
    "id": 1,
    "question": "For how long have you been experiencing these symptoms?",
    "options": ["Less than 24 hours", "1-3 days", "3-7 days", "More than a week", "Not sure"]
  },
  "currentQuestion": 1,
  "totalQuestions": 8,
  "completed": false
}
```

**Response (Completed):**
```json
{
  "completed": true,
  "triageResult": {
    "level": "yellow",
    "confidence": 85,
    "score": 25,
    "riskFactors": ["Fever", "Moderate symptom: I have a fever"],
    "recommendations": [
      "See a doctor within 24 hours",
      "Monitor symptoms closely",
      "Visit nearest health center",
      "Avoid strenuous activity"
    ]
  },
  "sessionId": "uuid-here"
}
```

### 3. Get Assessment
**GET** `/api/health/assessment/:sessionId`

**Response:**
```json
{
  "_id": "...",
  "userId": "user123",
  "sessionId": "uuid-here",
  "symptoms": ["I have a fever", "Headache and cough"],
  "answers": ["I have a fever", "1-3 days"],
  "vitals": {
    "bp": { "systolic": 120, "diastolic": 80 },
    "spO2": 98,
    "temperature": 101.2,
    "heartRate": 85
  },
  "triageResult": {
    "level": "yellow",
    "confidence": 85,
    "recommendations": [...]
  },
  "status": "completed",
  "createdAt": "2024-01-23T10:00:00.000Z",
  "completedAt": "2024-01-23T10:05:00.000Z"
}
```

### 4. Calculate Triage (Standalone)
**POST** `/api/health/triage/calculate`

**Request:**
```json
{
  "symptoms": ["chest pain", "difficulty breathing"],
  "vitals": {
    "bp": { "systolic": 180, "diastolic": 110 },
    "spO2": 88,
    "temperature": 98.6,
    "heartRate": 120
  },
  "answers": ["chest pain", "less than 24 hours"]
}
```

**Response:**
```json
{
  "level": "red",
  "confidence": 95,
  "score": 85,
  "riskFactors": [
    "Critical symptom: chest pain",
    "Critical symptom: difficulty breathing",
    "Severe hypertension",
    "Low oxygen saturation",
    "Abnormal heart rate"
  ],
  "recommendations": [
    "Seek immediate emergency care",
    "Call ambulance (108)",
    "Do not drive yourself",
    "Bring this assessment to hospital"
  ]
}
```

### 5. Get Triage Result
**GET** `/api/health/triage/:sessionId/result`

**Response:**
```json
{
  "sessionId": "uuid-here",
  "triageResult": {
    "level": "yellow",
    "confidence": 85,
    "recommendations": [...]
  },
  "symptoms": ["I have a fever"],
  "vitals": {...},
  "completedAt": "2024-01-23T10:05:00.000Z"
}
```

## Triage Levels
- **Green**: Home care, self-management
- **Yellow**: See doctor within 24 hours
- **Red**: Immediate emergency care needed

# Health Assessment & Triage API (Supabase)

## Setup
1. Create Supabase project at https://supabase.com
2. Run the SQL schema in `schema.sql` in your Supabase SQL editor
3. Get your project URL and anon key from Supabase dashboard
4. Update `.env` with your Supabase credentials:
   ```
   SUPABASE_URL=your-project-url
   SUPABASE_ANON_KEY=your-anon-key
   ```
5. Install dependencies: `npm install`
6. Start server: `npm run dev`

## Database Schema
```sql
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT UNIQUE NOT NULL,
  symptoms JSONB DEFAULT '[]'::jsonb,
  answers JSONB DEFAULT '[]'::jsonb,
  current_question INTEGER DEFAULT 0,
  vitals JSONB,
  triage_result JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);
```