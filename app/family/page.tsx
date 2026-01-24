'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { usePixcalStore } from '@/lib/store';
import {
  Users,
  Plus,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Heart,
  Activity,
  Pill,
  Calendar,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function FamilyPage() {
  const { user } = usePixcalStore();
  const [selectedMember, setSelectedMember] = useState(user.familyMembers[0]);

  const statusConfig = {
    green: {
      label: 'All Clear',
      icon: CheckCircle,
      color: 'text-green-success',
      bgColor: 'bg-green-50',
    },
    yellow: {
      label: 'Needs Attention',
      icon: AlertCircle,
      color: 'text-amber-warning',
      bgColor: 'bg-amber-50',
    },
    red: {
      label: 'Active Concern',
      icon: AlertTriangle,
      color: 'text-red-critical',
      bgColor: 'bg-red-50',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Your Family's Health Hub
              </h1>
              <p className="text-muted-foreground">
                Manage and track everyone's health in one place
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Add Family Member
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Family Members Grid */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Family Members
              </h2>

              {user.familyMembers.map((member) => {
                const config = statusConfig[member.healthStatus];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedMember.id === member.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                          {member.gender === 'Male' ? '👨' : '👩'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {member.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {member.age} years • {member.relation}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`flex items-center gap-1 ${config.color} text-sm font-semibold mb-1`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {config.label}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {member.lastCheck}
                        </p>
                      </div>
                    </div>

                    {/* Health Status Bars */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Health Status</span>
                        <div className="flex gap-1">
                          {['BP', 'Glucose', 'Activity'].map((label) => (
                            <div key={label} className="text-right">
                              <div className="text-xs font-semibold text-foreground">
                                {label}
                              </div>
                              <div className="w-8 h-1 bg-green-success rounded-full" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Last Health Check: {member.lastCheck}
                      </span>
                      <Link
                        href={`/family/${member.id}`}
                        className="text-primary hover:underline font-semibold"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Member Details Panel */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl mx-auto mb-4">
                    {selectedMember.gender === 'Male' ? '👨' : '👩'}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedMember.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedMember.age} years • {selectedMember.relation}
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3 gap-2">
                  <Activity className="w-4 h-4" />
                  Start Health Check
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted gap-2 bg-transparent"
                >
                  <TrendingUp className="w-4 h-4" />
                  View Full Profile
                </Button>
              </div>

              {/* Health Metrics */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Current Metrics
                </h3>

                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-success/30">
                    <p className="text-xs text-muted-foreground mb-1">Blood Pressure</p>
                    <p className="text-sm font-semibold text-foreground">138/88 mmHg</p>
                    <p className="text-xs text-amber-warning mt-1">⚠ YELLOW</p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-50 border border-green-success/30">
                    <p className="text-xs text-muted-foreground mb-1">
                      Blood Glucose (Fasting)
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      118 mg/dL
                    </p>
                    <p className="text-xs text-amber-warning mt-1">⚠ YELLOW</p>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Doctor Visit
                      </p>
                      <p className="text-xs text-muted-foreground">Jan 30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-coral-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Medication Refill
                      </p>
                      <p className="text-xs text-muted-foreground">Feb 2</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chronic Conditions */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" />
                  Conditions
                </h3>

                <div className="space-y-2">
                  {['Hypertension', 'Pre-diabetes'].map((condition) => (
                    <div key={condition} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-warning" />
                      <span className="text-sm text-muted-foreground">
                        {condition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Family Tree Visualization */}
          <div className="mt-12 rounded-2xl bg-card border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Family Health Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tree View */}
              <div className="flex justify-center items-center p-8 bg-primary/5 rounded-xl">
                <div className="text-center">
                  <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                  <p className="text-muted-foreground">
                    Family tree visualization showing health status
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-success/30">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-semibold">
                      All Clear
                    </span>
                    <CheckCircle className="w-5 h-5 text-green-success" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    1 family member
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 border border-amber-warning/30">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-semibold">
                      Needs Attention
                    </span>
                    <AlertCircle className="w-5 h-5 text-amber-warning" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    1 family member
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-red-50 border border-red-critical/30">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-semibold">
                      Active Concern
                    </span>
                    <AlertTriangle className="w-5 h-5 text-red-critical" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    1 family member
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  View Detailed Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
