'use client';

import React from "react"

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { usePixcalStore } from '@/lib/store';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  MessageCircle,
  Phone,
  Settings,
  Maximize,
  Heart,
  TrendingUp,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function TelemedicineCall() {
  const { user } = usePixcalStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [callTime, setCallTime] = useState(0);

  // Simulate call timer
  React.useEffect(() => {
    const timer = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <section className="py-4 px-4 h-[calc(100vh-120px)] flex flex-col">
        <div className="flex-1 flex gap-4">
          {/* Main Video Area */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-coral-primary/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <p className="text-white text-xl font-semibold">
                  Dr. Priya Gupta
                </p>
                <p className="text-gray-300">Cardiologist</p>
              </div>
            </div>

            {/* Call Info Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur">
                <p className="text-sm font-semibold">{formatTime(callTime)}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>

            {/* Patient Video PIP */}
            <div className="absolute bottom-4 right-4 w-48 h-36 rounded-xl overflow-hidden bg-gray-800 border-2 border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">👩</div>
                <p className="text-white text-xs">You</p>
              </div>
            </div>

            {/* Network Indicator */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 text-white px-3 py-2 rounded-lg">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-green-success rounded-full" />
                <div className="w-1 h-3 bg-green-success rounded-full opacity-70" />
                <div className="w-1 h-3 bg-green-success rounded-full opacity-40" />
              </div>
              <span className="text-xs">Good connection</span>
            </div>
          </div>

          {/* Right Sidebar - Patient Info & Vitals */}
          {!showChat && (
            <div className="w-80 flex flex-col gap-4">
              {/* Patient Info */}
              <div className="rounded-xl bg-card border border-border p-4">
                <h3 className="font-semibold text-foreground mb-4">
                  Patient Information
                </h3>

                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-semibold text-foreground">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="text-sm font-semibold text-foreground">
                      {user.age} years
                    </p>
                  </div>
                </div>

                {/* Live Vitals */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Live Vitals
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-green-50 border border-green-success/30">
                      <p className="text-xs text-muted-foreground">BP</p>
                      <p className="text-sm font-bold text-foreground">
                        {user.healthData.vitals.bp.systolic}/
                        {user.healthData.vitals.bp.diastolic}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-success/30">
                      <p className="text-xs text-muted-foreground">SpO₂</p>
                      <p className="text-sm font-bold text-foreground">
                        {user.healthData.vitals.spO2}%
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-success/30">
                      <p className="text-xs text-muted-foreground">HR</p>
                      <p className="text-sm font-bold text-foreground">72 bpm</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50 border border-green-success/30">
                      <p className="text-xs text-muted-foreground">Temp</p>
                      <p className="text-sm font-bold text-foreground">
                        {user.healthData.vitals.temperature}°F
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms & History */}
              <div className="rounded-xl bg-card border border-border p-4 flex-1 overflow-y-auto">
                <h3 className="font-semibold text-foreground mb-3">
                  Symptoms Reported
                </h3>
                <div className="space-y-2">
                  {user.healthData.symptoms.slice(0, 5).map((symptom, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground">
                      • {symptom}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                    Triage Assessment
                  </h4>
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-foreground font-semibold">
                      {user.healthData.triageLevel?.toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.healthData.triageConfidence}% confidence
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="rounded-xl bg-card border border-border p-4">
                <h3 className="font-semibold text-foreground text-sm mb-3">
                  Consultation Notes
                </h3>
                <textarea
                  placeholder="Add notes here..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Chat Sidebar */}
          {showChat && (
            <div className="w-80 rounded-xl bg-card border border-border p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                <div className="flex gap-2 justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-xs text-sm">
                    I have mild headache and fever
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-muted text-foreground rounded-lg px-3 py-2 max-w-xs text-sm">
                    How long have you had these symptoms?
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-xs text-sm">
                    Since yesterday evening
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type message..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="mt-4 rounded-2xl bg-card border border-border p-4 flex items-center justify-center gap-4">
          <Button
            onClick={() => setIsMuted(!isMuted)}
            size="lg"
            className={
              isMuted
                ? 'bg-red-critical hover:bg-red-critical/90'
                : 'bg-primary hover:bg-primary/90'
            }
          >
            {isMuted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          <Button
            onClick={() => setIsVideoOn(!isVideoOn)}
            size="lg"
            className={
              !isVideoOn
                ? 'bg-red-critical hover:bg-red-critical/90'
                : 'bg-primary hover:bg-primary/90'
            }
          >
            {isVideoOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-muted gap-2 bg-transparent"
          >
            <Share2 className="w-5 h-5" />
            Share Screen
          </Button>

          <Button
            onClick={() => setShowChat(!showChat)}
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-muted gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-muted bg-transparent"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <div className="ml-auto">
            <Link href="/">
              <Button
                size="lg"
                className="bg-red-critical hover:bg-red-critical/90 text-white gap-2"
              >
                <Phone className="w-5 h-5" />
                End Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
