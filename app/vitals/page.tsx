'use client';

import { Navigation } from '@/components/navigation';
import { VitalsCard } from '@/components/vitals-card';
import { Button } from '@/components/ui/button';
import { usePixcalStore } from '@/lib/store';
import {
  Heart,
  Droplet,
  Thermometer,
  Zap,
  Activity,
  Smartphone,
  Clock,
  Battery,
  Download,
  Share2,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function VitalsDashboard() {
  const { user } = usePixcalStore();
  const vitals = user.healthData.vitals;
  const [selectedDevice, setSelectedDevice] = useState('all');

  const devices = [
    {
      id: 'bp',
      name: 'BP Cuff',
      connected: true,
      battery: 85,
      lastReading: '5 mins ago',
    },
    {
      id: 'pulse',
      name: 'Pulse Oximeter',
      connected: true,
      battery: 92,
      lastReading: '3 mins ago',
    },
    {
      id: 'temp',
      name: 'Thermometer',
      connected: false,
      battery: 45,
      lastReading: '2 days ago',
    },
    {
      id: 'glucose',
      name: 'Glucometer',
      connected: false,
      battery: 60,
      lastReading: '6 hours ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Vitals Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of your health metrics
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Vitals Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Blood Pressure */}
              <VitalsCard
                title="Blood Pressure"
                value={`${vitals.bp.systolic}/${vitals.bp.diastolic}`}
                unit="mmHg"
                status="green"
                icon={<Heart className="w-6 h-6 text-green-success" />}
                description="Normal - Keep up the healthy habits!"
                trend="↓ 3% from last week"
              />

              {/* Oxygen Saturation */}
              <VitalsCard
                title="Oxygen Saturation"
                value={vitals.spO2}
                unit="%"
                status="green"
                icon={<Droplet className="w-6 h-6 text-green-success" />}
                description="Excellent oxygen levels"
                trend="↑ 1% from last reading"
              />

              {/* Temperature */}
              <VitalsCard
                title="Body Temperature"
                value={vitals.temperature}
                unit="°F"
                status="green"
                icon={<Thermometer className="w-6 h-6 text-green-success" />}
                description="Normal body temperature"
                trend="Stable"
              />

              {/* Glucose */}
              <VitalsCard
                title="Fasting Blood Glucose"
                value={vitals.glucoseFasting}
                unit="mg/dL"
                status="green"
                icon={<Zap className="w-6 h-6 text-green-success" />}
                description="Healthy blood sugar"
                trend="↓ 5% from last check"
              />

              {/* Heart Rate */}
              <VitalsCard
                title="Resting Heart Rate"
                value="72"
                unit="bpm"
                status="green"
                icon={<Activity className="w-6 h-6 text-green-success" />}
                description="Excellent cardiovascular health"
                trend="Normal range"
              />
            </div>

            {/* Sidebar - Device Management */}
            <div className="space-y-6">
              {/* Connected Devices */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  Connected Devices
                </h3>

                <div className="space-y-3">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        device.connected
                          ? 'border-green-success bg-green-50'
                          : 'border-border bg-muted/30'
                      }`}
                      onClick={() => setSelectedDevice(device.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {device.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {device.connected ? '🟢 Connected' : '⚪ Offline'}
                          </p>
                        </div>
                        <Battery className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{device.battery}% battery</span>
                        <span>{device.lastReading}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  + Connect New Device
                </Button>
              </div>

              {/* Alert Settings */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Alert Thresholds
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      High BP Alert
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="140/90"
                        className="flex-1 px-2 py-1 text-sm rounded border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-xs text-muted-foreground">mmHg</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Low SpO2 Alert
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="94"
                        className="flex-1 px-2 py-1 text-sm rounded border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                    Save Settings
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-coral-primary/10 border border-primary/20 p-6">
                <h3 className="font-semibold text-foreground mb-4">This Week</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. BP</span>
                    <span className="font-semibold text-foreground">
                      120/78 mmHg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Readings</span>
                    <span className="font-semibold text-foreground">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-semibold text-green-success">✓ Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="mt-12 rounded-2xl bg-card border border-border p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Full Health History
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted gap-2 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted gap-2 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Sample Historical Data */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-muted-foreground font-semibold">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-muted-foreground font-semibold">
                      BP
                    </th>
                    <th className="px-4 py-3 text-left text-muted-foreground font-semibold">
                      SpO₂
                    </th>
                    <th className="px-4 py-3 text-left text-muted-foreground font-semibold">
                      Temp
                    </th>
                    <th className="px-4 py-3 text-left text-muted-foreground font-semibold">
                      Glucose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: 'Today',
                      bp: '118/76',
                      spo2: '97%',
                      temp: '98.4°F',
                      glucose: '92 mg/dL',
                    },
                    {
                      date: 'Jan 22',
                      bp: '120/77',
                      spo2: '96%',
                      temp: '98.6°F',
                      glucose: '95 mg/dL',
                    },
                    {
                      date: 'Jan 20',
                      bp: '119/75',
                      spo2: '97%',
                      temp: '98.5°F',
                      glucose: '90 mg/dL',
                    },
                    {
                      date: 'Jan 18',
                      bp: '122/78',
                      spo2: '96%',
                      temp: '98.7°F',
                      glucose: '94 mg/dL',
                    },
                  ].map((record, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-3 text-foreground font-medium">
                        {record.date}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{record.bp}</td>
                      <td className="px-4 py-3 text-muted-foreground">{record.spo2}</td>
                      <td className="px-4 py-3 text-muted-foreground">{record.temp}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {record.glucose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link href="/check-up">
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                Start New Health Check
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
