import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { navItems } from "@/lib/navigation-config";

const VirtualDoctorPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  const [conversationId, setConversationId] = useState<string | null>(null);

  const startSession = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5001/api/tavus/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_name: `Virtual Doctor Session - ${new Date().toLocaleString()}`,
          custom_greeting: "Hello! I am Pixal, your AI health assistant. I'm here to help you understand your symptoms. How can I help you today?",
          properties: {
            max_call_duration: 3600,
            participant_left_timeout: 60,
            enable_recording: true,
          }
        }),
      });

      const data = await response.json();
      console.log("Tavus API Response:", data);

      if (response.ok && data.conversation_url) {
        setConversationId(data.conversation_id);
        window.open(data.conversation_url, '_blank'); // Open in new tab so user stays on page
      } else {
        setError(data.message || "Failed to create session. Please check your credits or try again.");
        console.error("Session creation failed:", data);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("Error starting session:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    if (!conversationId) return;
    setIsLoading(true);

    const maxRetries = 10;
    const retryDelay = 3000; // 3 seconds

    try {
      let transcriptData = null;

      for (let i = 0; i < maxRetries; i++) {
        console.log(`Attempt ${i + 1} to fetch transcript...`);

        // Wait before fetching (first attempt waits too, allowing Tavus to process)
        await new Promise(resolve => setTimeout(resolve, retryDelay));

        try {
          const response = await fetch(`http://localhost:5001/api/tavus/transcript/${conversationId}`);
          if (response.ok) {
            const data = await response.json();
            if (data.transcript && data.transcript.length > 0) {
              transcriptData = data;
              break; // Found it!
            }
          }
        } catch (e) {
          console.warn("Fetch attempt failed:", e);
        }
      }

      if (transcriptData && transcriptData.transcript) {
        // Transform Tavus transcript format to our simpler format
        const formattedTranscript = transcriptData.transcript.map((item: any) => ({
          role: item.role || 'unknown',
          content: item.content || ''
        }));

        const { generateMedicalReport } = await import('@/lib/report-generator');
        generateMedicalReport("User", new Date().toLocaleDateString(), formattedTranscript);
      } else {
        setError("Report is taking longer than expected. Please try again in 10-15 seconds.");
      }

    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate report.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCF3] pb-20 font-inter">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-white/95 border-b border-[#E2E8F0] px-3 sm:px-4 py-3 sm:py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-[#296CBC10]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-[#2D3748] font-nunito">Virtual Doctor</h1>
            <p className="text-sm text-[#4A5568] font-inter">AI-powered medical assistant</p>
          </div>
        </div>
      </motion.header>

      <main className="px-3 sm:px-4 py-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Virtual Consultation</h2>
            <p className="text-gray-600 mb-8">
              Connect with our AI Virtual Doctor for immediate assistance and health advice.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full h-12 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105"
                onClick={startSession}
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Start Session"}
              </Button>

              {conversationId && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12 text-lg border-primary text-primary hover:bg-primary/5"
                  onClick={handleEndSession}
                  disabled={isLoading}
                >
                  {isLoading ? "Generating Report..." : "End Session & Get Report"}
                </Button>
              )}
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Powered by Tavus AI
            </p>
          </div>
        </motion.div>
      </main>

      <BottomNav items={navItems} />
    </div>
  );
};

export default VirtualDoctorPage;