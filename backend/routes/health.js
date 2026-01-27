const express = require('express');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/supabase');
const { calculateTriage } = require('../utils/triage');

const router = express.Router();

// Questions for health assessment
const questions = [
  {
    id: 0,
    question: "Hello! I'm your AI health assistant. How are you feeling today?",
    options: ['I have a fever', 'Headache and cough', 'Chest pain', 'Difficulty breathing', 'General checkup']
  },
  {
    id: 1,
    question: "For how long have you been experiencing these symptoms?",
    options: ['Less than 24 hours', '1-3 days', '3-7 days', 'More than a week', 'Not sure']
  },
  {
    id: 2,
    question: "Have you experienced any of these before?",
    options: ['Never', 'Once or twice', 'Frequently', 'Chronic condition']
  },
  {
    id: 3,
    question: "Any recent travel or exposure to sick people?",
    options: ['No', 'Yes, within last 2 weeks', 'Yes, recently', 'Unsure']
  },
  {
    id: 4,
    question: "Have you taken any medications for this?",
    options: ['No', 'Over-the-counter medicine', 'Prescription medicine', 'Multiple']
  },
  {
    id: 5,
    question: "Any family history of chronic diseases?",
    options: ['No', 'Diabetes', 'Hypertension', 'Both', 'Other']
  },
  {
    id: 6,
    question: "Are you currently taking any regular medications?",
    options: ['No medications', '1-2 medications', '3-5 medications', 'More than 5']
  },
  {
    id: 7,
    question: "Do you have any allergies to medications?",
    options: ['No known allergies', 'Penicillin', 'Multiple allergies', 'Unsure']
  }
];

// POST /api/health/assessment/start
router.post('/assessment/start', async (req, res) => {
  try {
    const { userId } = req.body;
    const sessionId = uuidv4();

    const { data, error } = await supabase
      .from('assessments')
      .insert({
        user_id: userId,
        session_id: sessionId,
        symptoms: [],
        answers: [],
        current_question: 0,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      sessionId,
      question: questions[0],
      totalQuestions: questions.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/health/assessment/answer
router.post('/assessment/answer', async (req, res) => {
  try {
    const { sessionId, answer, vitals } = req.body;

    const { data: assessment, error: fetchError } = await supabase
      .from('assessments')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (fetchError) throw fetchError;

    const updatedSymptoms = [...(assessment.symptoms || []), answer];
    const updatedAnswers = [...(assessment.answers || []), answer];
    const nextQuestion = assessment.current_question + 1;

    const updateData = {
      symptoms: updatedSymptoms,
      answers: updatedAnswers,
      current_question: nextQuestion
    };

    if (vitals) {
      updateData.vitals = vitals;
    }

    if (nextQuestion < questions.length) {
      const { error: updateError } = await supabase
        .from('assessments')
        .update(updateData)
        .eq('session_id', sessionId);

      if (updateError) throw updateError;

      res.json({
        question: questions[nextQuestion],
        currentQuestion: nextQuestion,
        totalQuestions: questions.length,
        completed: false
      });
    } else {
      // Assessment completed, calculate triage
      const triageResult = calculateTriage(updatedSymptoms, vitals, updatedAnswers);
      
      const { error: completeError } = await supabase
        .from('assessments')
        .update({
          ...updateData,
          triage_result: triageResult,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);

      if (completeError) throw completeError;

      res.json({
        completed: true,
        triageResult,
        sessionId
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/health/assessment/:sessionId
router.get('/assessment/:sessionId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('session_id', req.params.sessionId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/health/triage/calculate
router.post('/triage/calculate', async (req, res) => {
  try {
    const { symptoms, vitals, answers } = req.body;
    const triageResult = calculateTriage(symptoms, vitals, answers);
    
    res.json(triageResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/health/triage/:sessionId/result
router.get('/triage/:sessionId/result', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('session_id', req.params.sessionId)
      .single();

    if (error) throw error;

    if (!data.triage_result) {
      return res.status(400).json({ error: 'Triage not completed yet' });
    }

    res.json({
      sessionId: data.session_id,
      triageResult: data.triage_result,
      symptoms: data.symptoms,
      vitals: data.vitals,
      completedAt: data.completed_at
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;