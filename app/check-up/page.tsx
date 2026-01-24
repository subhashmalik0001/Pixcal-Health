'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { usePixcalStore } from '@/lib/store';
import Link from 'next/link';
import {
  Mic,
  Keyboard,
  Volume2,
  Pause,
  Play,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function CheckUp() {
  const { user, updateHealthData } = usePixcalStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [triageResult, setTriageResult] = useState<'green' | 'yellow' | 'red' | null>(null);

  const questions = [
    {
      question: 'Hello! I\'m your AI health assistant. How are you feeling today?',
      options: [
        'I have a fever',
        'Headache and cough',
        'Chest pain',
        'Difficulty breathing',
        'General checkup',
      ],
    },
    {
      question: 'For how long have you been experiencing these symptoms?',
      options: ['Less than 24 hours', '1-3 days', '3-7 days', 'More than a week', 'Not sure'],
    },
    {
      question: 'Have you experienced any of these before?',
      options: ['Never', 'Once or twice', 'Frequently', 'Chronic condition'],
    },
    {
      question: 'Any recent travel or exposure to sick people?',
      options: ['No', 'Yes, within last 2 weeks', 'Yes, recently', 'Unsure'],
    },
    {
      question: 'Have you taken any medications for this?',
      options: ['No', 'Over-the-counter medicine', 'Prescription medicine', 'Multiple'],
    },
    {
      question: 'Any family history of chronic diseases?',
      options: ['No', 'Diabetes', 'Hypertension', 'Both', 'Other'],
    },
    {
      question: 'Are you currently taking any regular medications?',
      options: ['No medications', '1-2 medications', '3-5 medications', 'More than 5'],
    },
    {
      question: 'Do you have any allergies to medications?',
      options: ['No known allergies', 'Penicillin', 'Multiple allergies', 'Unsure'],
    },
  ];

  const handleAnswer = (answer: string) => {
    setSymptoms([...symptoms, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTextInput('');
    } else {
      // Calculate triage level based on answers
      calculateTriage();
    }
  };

  const calculateTriage = () => {
    // Simple triage logic based on symptoms
    const severitySymptoms = [
      'Chest pain',
      'Difficulty breathing',
      'Severe headache',
    ];
    const moderateSymptoms = ['High fever', 'Persistent cough'];

    const hasSevere = symptoms.some((s) =>
      severitySymptoms.some((ss) => s.toLowerCase().includes(ss.toLowerCase())),
    );
    const hasModerate = symptoms.some((s) =>
      moderateSymptoms.some((ms) => s.toLowerCase().includes(ms.toLowerCase())),
    );

    if (hasSevere) {
      setTriageResult('red');
    } else if (hasModerate) {
      setTriageResult('yellow');
    } else {
      setTriageResult('green');
    }

    // Update store with health data
    updateHealthData({
      symptoms,
      triageLevel: hasSevere ? 'red' : hasModerate ? 'yellow' : 'green',
      triageConfidence: Math.floor(Math.random() * 15) + 85, // 85-100%
    });

    setCompleted(true);
  };

  const handleListening = () => {
    setIsListening(!isListening);
    setTimeout(() => setIsListening(false), 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
        <Navigation />

        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Health Check Complete!
              </h1>
              <p className="text-muted-foreground mb-8">
                Analyzing your symptoms and vitals...
              </p>
            </div>

            <Link href="/triage-result">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4">
                View Your Triage Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />

      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Health Check Progress
              </h2>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1}/{questions.length} questions
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-teal-600 p-8 text-primary-foreground mb-8">
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <div className="text-6xl animate-bounce">👨‍⚕️</div>
                    </div>
                    {isListening && (
                      <div className="absolute inset-0 rounded-full border-4 border-primary-foreground/30 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-center mb-8">
                  <p className="text-xl font-semibold leading-relaxed">
                    {questions[currentQuestion].question}
                  </p>
                  {isListening && (
                    <div className="flex justify-center gap-1 mt-4">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-primary-foreground/50 rounded-full animate-pulse"
                          style={{
                            height: `${20 + i * 10}px`,
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Audio Controls */}
                <div className="flex justify-center gap-4 mb-8">
                  <Button
                    size="sm"
                    className="bg-primary-foreground text-primary hover:bg-muted"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Replay
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary/90 bg-transparent"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Speaker
                  </Button>
                </div>
              </div>

              {/* Quick Replies */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground px-2">Quick replies:</p>
                {['Yes', 'No', 'Sometimes', "I'm not sure", 'Can you explain?'].map(
                  (reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      className="w-full justify-start border-border text-foreground hover:bg-muted bg-transparent"
                      onClick={() => handleAnswer(reply)}
                    >
                      {reply}
                    </Button>
                  ),
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Context Panel */}
              <div className="rounded-xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Session Info</h3>

                {/* Privacy Mode */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked={false}
                      />
                      <span className="text-sm font-medium text-foreground">
                        Private Mode
                      </span>
                    </label>
                    <Shield className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    For sensitive topics
                  </p>
                </div>

                {/* Input Method */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Input Method
                  </p>
                  <Button
                    onClick={() => setUseVoice(true)}
                    className={`w-full justify-start gap-2 ${
                      useVoice
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    Voice Input
                  </Button>
                  <Button
                    onClick={() => setUseVoice(false)}
                    className={`w-full justify-start gap-2 ${
                      !useVoice
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted'
                    }`}
                  >
                    <Keyboard className="w-4 h-4" />
                    Type Answer
                  </Button>
                </div>
              </div>

              {/* Emergency Button */}
              <Button
                variant="destructive"
                className="w-full justify-center gap-2 h-12 bg-red-critical hover:bg-red-critical/90"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency
              </Button>

              {/* Symptoms Summary */}
              <div className="rounded-xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Symptoms Reported
                </h3>
                <div className="space-y-2">
                  {symptoms.map((symptom, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      • {symptom}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text Input Area (if text mode selected) */}
          {!useVoice && (
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && textInput) {
                      handleAnswer(textInput);
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={() => {
                    if (textInput) handleAnswer(textInput);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Send
                </Button>
              </div>
            </div>
          )}

          {/* Voice Input Simulation */}
          {useVoice && (
            <div className="mt-8 max-w-3xl mx-auto text-center">
              <Button
                onClick={handleListening}
                size="lg"
                className="mx-auto gap-2 bg-coral-primary hover:bg-coral-primary/90 text-white"
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                {isListening ? 'Listening...' : 'Start Listening'}
              </Button>
              {isListening && (
                <p className="text-sm text-muted-foreground mt-4">
                  Speak now. I'm listening...
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
