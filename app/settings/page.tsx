'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { usePixcalStore } from '@/lib/store';
import {
  User,
  Heart,
  Lock,
  Bell,
  Accessibility,
  HardDrive,
  LogOut,
  ChevronRight,
  ToggleLeft,
} from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const { user, updateAccessibility } = usePixcalStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [fontSize, setFontSize] = useState(user.accessibility.fontSize);
  const [highContrast, setHighContrast] = useState(
    user.accessibility.highContrast,
  );

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'health', label: 'Health Profile', icon: Heart },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'storage', label: 'Storage', icon: HardDrive },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Settings
          </h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-card border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeSection === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {section.label}
                        </span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <Button
                  variant="outline"
                  className="w-full mt-6 border-border text-foreground hover:bg-muted gap-2 bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="rounded-2xl bg-card border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Your Profile
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Age
                        </label>
                        <input
                          type="number"
                          defaultValue={user.age}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Preferred Language
                      </label>
                      <select defaultValue={user.language} className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                        <option value="ka">Kannada</option>
                        <option value="ml">Malayalam</option>
                      </select>
                    </div>

                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}

              {/* Health Profile Section */}
              {activeSection === 'health' && (
                <div className="rounded-2xl bg-card border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Health Profile
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Chronic Conditions
                      </label>
                      <div className="space-y-2">
                        {['Diabetes', 'Hypertension', 'Asthma'].map(
                          (condition) => (
                            <label
                              key={condition}
                              className="flex items-center gap-2"
                            >
                              <input type="checkbox" className="rounded" />
                              <span className="text-foreground">{condition}</span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Drug Allergies
                      </label>
                      <textarea
                        placeholder="List any drug allergies..."
                        className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Current Medications
                      </label>
                      <textarea
                        placeholder="List current medications..."
                        className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    </div>

                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Save Health Profile
                    </Button>
                  </div>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div className="rounded-2xl bg-card border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Privacy & Data
                  </h2>

                  <div className="space-y-6">
                    <div className="border-b border-border pb-6">
                      <h3 className="font-semibold text-foreground mb-4">
                        Who can see my data?
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'My family', value: true },
                          { label: 'ASHA workers', value: false },
                          { label: 'Doctors', value: true },
                          { label: 'Research (anonymized)', value: false },
                        ].map((item) => (
                          <label
                            key={item.label}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={item.value}
                              className="rounded"
                            />
                            <span className="text-foreground">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <Button
                        variant="outline"
                        className="border-border text-foreground hover:bg-muted bg-transparent"
                      >
                        Download My Data
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant="destructive"
                        className="bg-red-critical hover:bg-red-critical/90 text-white"
                      >
                        Delete My Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="rounded-2xl bg-card border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        label: 'Push Notifications',
                        description: 'Get app notifications',
                      },
                      {
                        label: 'SMS Notifications',
                        description: 'Receive SMS alerts',
                      },
                      {
                        label: 'Email Notifications',
                        description: 'Get email updates',
                      },
                      {
                        label: 'Health Reminders',
                        description: 'Medication and follow-up reminders',
                      },
                      {
                        label: 'Family Alerts',
                        description: 'Notifications about family member health',
                      },
                      {
                        label: 'Community Alerts',
                        description: 'Public health notifications',
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div>
                          <p className="font-semibold text-foreground">
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <ToggleLeft className="w-5 h-5 text-primary" />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Save Preferences
                  </Button>
                </div>
              )}

              {/* Accessibility Section */}
              {activeSection === 'accessibility' && (
                <div className="rounded-2xl bg-card border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Accessibility
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-4">
                        Font Size: {fontSize}%
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="200"
                        step="10"
                        value={fontSize}
                        onChange={(e) => {
                          const newSize = parseInt(e.target.value);
                          setFontSize(newSize);
                          updateAccessibility({ fontSize: newSize });
                        }}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>100%</span>
                        <span>200%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-semibold text-foreground">
                          High Contrast Mode
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Easier to read for low vision
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={highContrast}
                        onChange={(e) => {
                          setHighContrast(e.target.checked);
                          updateAccessibility({ highContrast: e.target.checked });
                        }}
                        className="w-5 h-5 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-semibold text-foreground">
                          Voice Navigation
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Control app with voice commands
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded" />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-semibold text-foreground">
                          Reduce Animations
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Less motion for motion sensitivity
                        </p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded" />
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Save Accessibility Settings
                    </Button>
                  </div>
                </div>
              )}

              {/* Storage Section */}
              {activeSection === 'storage' && (
                <div className="rounded-2xl bg-card border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Storage & Cache
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground mb-4">
                        Cached Data: 245 MB
                      </p>
                      <div className="w-full bg-border rounded-full h-2 mb-4">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: '60%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Storage limit: 1 GB
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        Auto-sync Settings
                      </h3>
                      <select className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Immediate (when online)</option>
                        <option>Every hour</option>
                        <option>Daily</option>
                        <option>Manual only</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        Data Usage
                      </h3>
                      <label className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          name="data-usage"
                          defaultChecked
                        />
                        <span className="text-foreground">Wi-Fi only</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="data-usage" />
                        <span className="text-foreground">
                          Allow cellular data
                        </span>
                      </label>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Clear Cache
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
