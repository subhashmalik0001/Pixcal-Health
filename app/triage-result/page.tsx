'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { usePixcalStore } from '@/lib/store';
import Link from 'next/link';
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Thermometer,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';

export default function TriageResult() {
  const { user } = usePixcalStore();
  const triageLevel = user.healthData.triageLevel || 'green';
  const confidence = user.healthData.triageConfidence;

  const triageConfig = {
    green: {
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-success',
      title: 'Home Care',
      icon: CheckCircle,
      description:
        'Based on your symptoms and vitals, you can safely manage this at home.',
      actionText: 'Continue with self-care',
      secondaryText: 'Re-check symptoms in 2 days',
    },
    yellow: {
      bgColor: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-warning',
      title: 'See a Doctor Soon',
      icon: AlertCircle,
      description:
        'Your symptoms suggest you should see a healthcare provider within the next 24 hours.',
      actionText: 'Find nearest Primary Health Center',
      secondaryText: 'Expected wait time: 15-30 minutes',
    },
    red: {
      bgColor: 'from-red-50 to-rose-50',
      borderColor: 'border-red-critical',
      title: 'Seek Immediate Care',
      icon: AlertTriangle,
      description:
        'Your symptoms require immediate medical attention. Please seek emergency care now.',
      actionText: 'Call Emergency Services',
      secondaryText: 'Emergency: 108 / 102',
    },
  };

  const config = triageConfig[triageLevel as keyof typeof triageConfig];
  const Icon = config.icon;

  const recommendations = {
    green: [
      {
        step: 1,
        title: 'Rest',
        description: 'Get adequate sleep and rest for 24-48 hours',
        icon: '😴',
      },
      {
        step: 2,
        title: 'Hydrate',
        description: 'Drink plenty of water (8+ glasses per day)',
        icon: '💧',
      },
      {
        step: 3,
        title: 'Monitor',
        description: 'Check temperature every 6 hours',
        icon: '🌡️',
      },
      {
        step: 4,
        title: 'Follow-up',
        description: 'Re-check symptoms in 2 days',
        icon: '📅',
      },
    ],
    yellow: [
      {
        step: 1,
        title: 'Schedule Appointment',
        description: 'Contact your nearest health center',
        icon: '📞',
      },
      {
        step: 2,
        title: 'Monitor Symptoms',
        description: 'Track your temperature and symptoms',
        icon: '📊',
      },
      {
        step: 3,
        title: 'Avoid Spread',
        description: 'Follow hygiene protocols',
        icon: '🧼',
      },
      {
        step: 4,
        title: 'Prepare Records',
        description: 'Download and bring this report',
        icon: '📋',
      },
    ],
    red: [
      {
        step: 1,
        title: 'Emergency Call',
        description: 'Call 108 or 102 immediately',
        icon: '🚨',
      },
      {
        step: 2,
        title: 'Notify Family',
        description: 'Alert your emergency contacts',
        icon: '👨‍👩‍👧',
      },
      {
        step: 3,
        title: 'Seek Care',
        description: 'Go to nearest hospital',
        icon: '🏥',
      },
      {
        step: 4,
        title: 'Bring Records',
        description: 'Carry this assessment report',
        icon: '📄',
      },
    ],
  };

  const dangerSigns = {
    green: ['High fever (>101°F)', 'Difficulty breathing', 'Chest pain'],
    yellow: [
      'Worsening symptoms',
      'High fever (>103°F)',
      'Severe headache',
      'Inability to drink',
    ],
    red: [
      'Difficulty breathing',
      'Chest pain',
      'Loss of consciousness',
      'Severe bleeding',
      'Inability to speak',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Result Card */}
          <div
            className={`rounded-3xl bg-gradient-to-br ${config.bgColor} border-2 ${config.borderColor} p-8 sm:p-12 mb-12`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                  Triage Level
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {config.title}
                </h1>
                <p className="text-lg text-muted-foreground">{config.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-2xl font-bold text-primary">{confidence}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assessment Time</p>
                <p className="text-2xl font-bold text-primary">2m 34s</p>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Symptoms */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Symptoms Summary
              </h3>
              <ul className="space-y-2">
                {user.healthData.symptoms.slice(0, 5).map((symptom, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    • {symptom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vitals Snapshot */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" />
                Vitals Snapshot
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Blood Pressure</span>
                  <span className="font-semibold text-foreground">
                    {user.healthData.vitals.bp.systolic}/{user.healthData.vitals.bp.diastolic} mmHg
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Oxygen (SpO2)</span>
                  <span className="font-semibold text-foreground">
                    {user.healthData.vitals.spO2}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="font-semibold text-foreground">
                    {user.healthData.vitals.temperature}°F
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Glucose (Fasting)</span>
                  <span className="font-semibold text-foreground">
                    {user.healthData.vitals.glucoseFasting} mg/dL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Recommended Actions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations[triageLevel].map((action) => (
                <div
                  key={action.step}
                  className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-3">{action.icon}</div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Step {action.step}
                  </p>
                  <p className="text-xs text-muted-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action */}
          <div className="mb-12">
            {triageLevel === 'green' && (
              <Button className="w-full bg-green-success hover:bg-green-success/90 text-white py-6 text-lg gap-2">
                <CheckCircle className="w-5 h-5" />
                Continue with Self-Care
              </Button>
            )}
            {triageLevel === 'yellow' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Find Nearest PHC
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 py-6 text-lg gap-2 bg-transparent"
                >
                  <Phone className="w-5 h-5" />
                  Book Telemedicine
                </Button>
              </div>
            )}
            {triageLevel === 'red' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Button className="bg-red-critical hover:bg-red-critical/90 text-white py-6 text-lg gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Call Ambulance (108)
                </Button>
                <Button
                  variant="outline"
                  className="border-red-critical text-red-critical hover:bg-red-critical/5 py-6 text-lg gap-2 bg-transparent"
                >
                  <Phone className="w-5 h-5" />
                  Connect to Doctor
                </Button>
              </div>
            )}
          </div>

          {/* Danger Signs to Watch */}
          <div className="rounded-2xl bg-card border border-border p-6 mb-12">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-coral-primary" />
              When to Seek Immediate Help
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {dangerSigns[triageLevel].map((sign, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-coral-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{sign}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Share and Download */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted gap-2 bg-transparent"
            >
              <Share2 className="w-4 h-4" />
              Share with Doctor
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted gap-2 bg-transparent"
            >
              <Clock className="w-4 h-4" />
              Schedule Follow-up
            </Button>
          </div>

          {/* Back to Home */}
          <Link href="/" className="block">
            <Button className="w-full border-border text-foreground hover:bg-muted gap-2">
              <ArrowRight className="w-4 h-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
