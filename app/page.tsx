'use client';

import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { StatCounter } from '@/components/stat-counter';
import { Button } from '@/components/ui/button';
import {
  Activity,
  Mic,
  Smartphone,
  Zap,
  Heart,
  AlertCircle,
  Clock,
  Users,
  Lock,
  Globe,
  Mountain,
  Accessibility,
  Repeat2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('patients');

  const userTypes = {
    patients: {
      icon: Users,
      title: 'For Patients',
      benefits: [
        'Check symptoms in 2 minutes',
        'Track your family\'s health',
        'Talk to real doctors when needed',
      ],
    },
    asha: {
      icon: Zap,
      title: 'For ASHA/CHWs',
      benefits: [
        'Empower your community work',
        'Digital checklists & protocols',
        'Offline household tracking',
      ],
    },
    doctors: {
      icon: Activity,
      title: 'For Doctors',
      benefits: [
        'Focus on critical cases',
        'AI pre-screened patients',
        'Low-bandwidth teleconsultation',
      ],
    },
    admin: {
      icon: Globe,
      title: 'For Health Admins',
      benefits: [
        'Outbreak early warning',
        'Resource optimization',
        'Impact analytics dashboard',
      ],
    },
  };

  const features = [
    {
      title: 'AI Avatar Doctor',
      description: 'Voice or text in any language',
      icon: Mic,
    },
    {
      title: 'Voice-First Interface',
      description: 'Speak naturally, get instant help',
      icon: Heart,
    },
    {
      title: 'Family Health Profiles',
      description: 'Manage everyone\'s health in one place',
      icon: Users,
    },
    {
      title: 'IoT Vital Monitoring',
      description: 'Connect smart health devices instantly',
      icon: Smartphone,
    },
    {
      title: 'Offline Mode',
      description: 'Works without internet connection',
      icon: Repeat2,
    },
    {
      title: 'Telemedicine Ready',
      description: 'Connect with real doctors easily',
      icon: Activity,
    },
    {
      title: 'Privacy & Security',
      description: 'Your data is completely safe',
      icon: Lock,
    },
    {
      title: 'Community Dashboard',
      description: 'Track health trends in your area',
      icon: Globe,
    },
  ];

  const painPoints = [
    { icon: Mountain, label: 'Rural isolation' },
    { icon: Clock, label: 'Long wait times' },
    { icon: Globe, label: 'Language barriers' },
    { icon: Accessibility, label: 'Mobility issues' },
    { icon: AlertCircle, label: 'Cost barriers' },
    { icon: Clock, label: 'Night emergencies' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'ASHA Worker, Maharashtra',
      quote:
        'This platform has transformed how I serve my community. I can now identify health risks early and refer critical cases immediately.',
      avatar: '👨‍⚕️',
    },
    {
      name: 'Priya Sharma',
      role: 'Mother of 2, Bangalore',
      quote:
        'My family now has access to healthcare anytime. The AI avatar is so easy to talk to and makes everyone feel heard.',
      avatar: '👩‍👧‍👦',
    },
    {
      name: 'Dr. Amit Patel',
      role: 'Primary Health Center, Gujarat',
      quote:
        'The triage system is incredibly accurate. It saves me hours and lets me focus on truly urgent cases.',
      avatar: '👨‍⚕️',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Healthcare Without Barriers
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                Healthcare Without Barriers
              </h1>

              <p className="text-lg text-muted-foreground mb-8 text-balance">
                AI-powered medical triage, 24/7 access, zero wait times. For
                everyone who can't reach a doctor easily.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/check-up">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Free Health Check
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 bg-transparent"
                >
                  Watch How It Works
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-border">
                {['HIPAA Compliant', 'Offline Capable', 'Multi-language', 'IoT Integrated'].map(
                  (badge) => (
                    <div key={badge} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-success" />
                      <span className="text-muted-foreground">{badge}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-coral-primary/10 to-gold-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary to-teal-600 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-white">
                <Heart className="w-24 h-24 mb-4 opacity-90 animate-pulse" />
                <p className="text-center text-lg font-semibold">
                  Millions deserve better healthcare access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 px-4 glass">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter target={45000} label="Lives Assessed" suffix="+" />
            <StatCounter target={98} label="Accurate Triage" suffix="%" />
            <StatCounter target={12} label="Languages Supported" />
            <StatCounter target={100} label="Offline Capable" suffix="%" />
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-balance">
            Millions Can't Access Doctors When They Need Them
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  className="p-4 sm:p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all"
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3" />
                  <p className="text-sm sm:text-base font-medium text-foreground">
                    {point.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-primary/5 to-coral-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center text-balance">
            How It Works
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Talk to Your AI Health Assistant',
                description: 'Voice or text, any language',
                icon: Mic,
              },
              {
                step: 2,
                title: 'Connect Smart Health Devices',
                description: 'Instant vitals: BP, SpO₂, Temp, Glucose',
                icon: Smartphone,
              },
              {
                step: 3,
                title: 'Get Instant Smart Triage',
                description: 'Self-care, See doctor soon, or Urgent care',
                icon: AlertCircle,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative p-8 rounded-2xl bg-white border border-border"
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center text-balance">
            Powerful Features Built for Real Healthcare Needs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl glass-card border border-border hover:shadow-lg hover:border-primary transition-all group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Different Users */}
      <section className="py-16 sm:py-24 px-4 glass">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center text-balance">
            Built for Everyone
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {Object.entries(userTypes).map(([key, _]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
                  }`}
              >
                {userTypes[key as keyof typeof userTypes].title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              {userTypes[activeTab as keyof typeof userTypes].benefits.map(
                (benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 mb-6">
                    <CheckCircle className="w-5 h-5 text-green-success flex-shrink-0 mt-1" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ),
              )}
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-coral-primary/10 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏥</div>
                <p className="text-muted-foreground">
                  Solutions tailored for {activeTab}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-primary/5 to-coral-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            ₹50 Per Person. Lifetime Health Guardian.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Not a subscription. Not a fee. A community investment.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 rounded-xl bg-white border-2 border-coral-primary/30">
              <p className="text-2xl font-bold text-coral-primary mb-2">
                ₹500-2000
              </p>
              <p className="text-muted-foreground">Traditional Hospital Visit</p>
            </div>
            <div className="p-8 rounded-xl bg-white border-2 border-primary">
              <p className="text-2xl font-bold text-primary mb-2">₹50</p>
              <p className="text-muted-foreground">Pixcal Health Lifetime Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center text-balance">
            Stories from Real Users
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl glass-card border border-border hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-foreground italic mb-6">{`"${testimonial.quote}"`}</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Ready to Transform Healthcare Access?
          </h2>
          <p className="text-lg mb-8 opacity-90 text-balance">
            Join thousands already taking control of their health
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/check-up">
              <Button className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-muted">
                Start Your Health Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary/90 bg-transparent"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-charcoal text-cloud-white border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Patients</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Health Check
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Family Profiles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Healthcare Workers</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <Link href="#" className="hover:opacity-100">
                    ASHA Tools
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Doctor Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Telemedicine
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:opacity-100">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-charcoal/50 pt-8 text-sm opacity-75 text-center">
            <p>Made with ❤️ for underserved communities</p>
            <p className="mt-2">© 2024 Pixcal Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
