'use client';

import { Navigation } from '@/components/navigation';
import AIAvatar from '@/components/ai-avatar';

export default function AIAvatarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud-white to-white">
      <Navigation />
      
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            🤖 Talk to Dr. AI Avatar
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Voice-powered health assistant • Hindi & English • 100% Free
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✅ Free Forever</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🎤 Voice Recognition</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">🗣️ Text-to-Speech</span>
          </div>
        </div>
        
        <AIAvatar />
      </section>
    </div>
  );
}