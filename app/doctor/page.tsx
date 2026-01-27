'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Phone,
  Video,
  ClipboardList,
  Pill,
  Users,
  TrendingDown,
  Clock,
  MapPin,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('queue');

  const patientQueue = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      triage: 'red',
      symptoms: 'Chest pain, shortness of breath',
      bp: '152/98',
      hr: 110,
      spo2: 94,
      confidence: 89,
      waitTime: 8,
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      age: 58,
      gender: 'Male',
      triage: 'yellow',
      symptoms: 'High fever, persistent cough',
      bp: '138/88',
      hr: 92,
      spo2: 96,
      confidence: 85,
      waitTime: 15,
    },
    {
      id: 3,
      name: 'Anjali Sharma',
      age: 30,
      gender: 'Female',
      triage: 'yellow',
      symptoms: 'Mild headache, fatigue',
      bp: '120/76',
      hr: 78,
      spo2: 98,
      confidence: 72,
      waitTime: 22,
    },
  ];

  const triageColors = {
    red: 'border-red-critical bg-red-50',
    yellow: 'border-amber-warning bg-amber-50',
    green: 'border-green-success bg-green-50',
  };

  const triageIcons = {
    red: AlertTriangle,
    yellow: AlertCircle,
    green: CheckCircle,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Doctor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage patient queue and consultations
            </p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Waiting', value: 12, icon: Clock },
              { label: 'In Consultation', value: 1, icon: Video },
              { label: 'Completed Today', value: 34, icon: CheckCircle },
              { label: 'Avg Consult Time', value: '12m', icon: TrendingDown },
            ].map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Patient Queue */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Patient Queue
                </h2>

                <div className="space-y-4">
                  {patientQueue.map((patient) => {
                    const TriageIcon = triageIcons[
                      patient.triage as keyof typeof triageIcons
                    ];
                    return (
                      <div
                        key={patient.id}
                        className={`p-4 rounded-xl border-l-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:shadow-lg transition-all ${
                          triageColors[patient.triage as keyof typeof triageColors]
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <TriageIcon className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {patient.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {patient.age}y • {patient.gender}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {patient.symptoms}
                            </p>

                            {/* Vitals Summary */}
                            <div className="flex flex-wrap gap-3 mt-2 text-xs">
                              <span className="px-2 py-1 rounded bg-white/50">
                                BP: {patient.bp}
                              </span>
                              <span className="px-2 py-1 rounded bg-white/50">
                                HR: {patient.hr}
                              </span>
                              <span className="px-2 py-1 rounded bg-white/50">
                                SpO₂: {patient.spo2}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            {patient.confidence}% confident
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Waiting: {patient.waitTime}m
                          </p>
                          <Button
                            size="sm"
                            className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
                          >
                            <Video className="w-3 h-3" />
                            Start Call
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clinical Tools */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-2">
                  <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Pill className="w-4 h-4" />
                    Write Prescription
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-border text-foreground hover:bg-muted bg-transparent"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Create Referral
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-border text-foreground hover:bg-muted bg-transparent"
                  >
                    <Users className="w-4 h-4" />
                    Request Lab Tests
                  </Button>
                </div>
              </div>

              {/* E-Prescription */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" />
                  E-Prescription
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Drug Name
                    </label>
                    <input
                      type="text"
                      placeholder="Search drug..."
                      className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Dosage
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 500mg"
                        className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase">
                        Frequency
                      </label>
                      <select className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Thrice daily</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 7 days"
                      className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Add to Prescription
                  </Button>
                </div>
              </div>

              {/* Referral */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Referral
                </h3>

                <div className="space-y-3">
                  <select className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select Specialist</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Pulmonology</option>
                  </select>

                  <select className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Urgency Level</option>
                    <option>Routine</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                  </select>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Generate Referral
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="mt-12 rounded-2xl bg-card border border-border p-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Daily Analytics
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-3xl font-bold text-primary">45</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Total Consultations
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-3xl font-bold text-primary">12m 34s</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Average Time per Patient
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-green-50 border border-green-success/30">
                <p className="text-3xl font-bold text-green-success">92%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Patient Satisfaction
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-3xl font-bold text-primary">87%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  AI Diagnosis Agreement
                </p>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="p-8 rounded-xl bg-muted/30 flex items-center justify-center min-h-64">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Condition Distribution Chart
                  </p>
                </div>
              </div>
              <div className="p-8 rounded-xl bg-muted/30 flex items-center justify-center min-h-64">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Triage Accuracy Trend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
