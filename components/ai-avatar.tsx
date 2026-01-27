'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EnhancedAIAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [conversation, setConversation] = useState([]);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleUserInput(text);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        const errorMsg = language === 'hi-IN' 
          ? 'माइक्रोफोन की समस्या है।' 
          : 'Microphone error occurred.';
        setResponse(errorMsg);
      };
    }

    // Initialize Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, [language]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserInput = async (text) => {
    // Add user message to conversation
    const userMessage = { type: 'user', text, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);

    try {
      const aiResponse = await getAIResponse(text, language);
      setResponse(aiResponse);
      
      // Add AI response to conversation
      const aiMessage = { type: 'ai', text: aiResponse, timestamp: new Date() };
      setConversation(prev => [...prev, aiMessage]);
      
      speakResponse(aiResponse);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMsg = language === 'hi-IN' ? 'माफ करें, कुछ गलत हुआ है।' : 'Sorry, something went wrong.';
      setResponse(errorMsg);
      speakResponse(errorMsg);
    }
  };

  const getAIResponse = async (userText, lang) => {
    // Build conversation context for better diagnosis
    const conversationHistory = conversation.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Try Gemini API first
    try {
      console.log('🚀 Attempting Gemini API call...');
      const geminiResponse = await getGeminiResponse(userText, lang, conversationHistory);
      console.log('✅ Gemini API Success!');
      return geminiResponse;
    } catch (error) {
      console.error('❌ Gemini API failed:', error.message);
      
      // Show user that we're using offline mode
      const offlineMsg = lang === 'hi-IN' 
        ? '(ऑफलाइन मोड में चल रहा है)' 
        : '(Running in offline mode)';
      
      const offlineResponse = getAdvancedHealthResponse(userText, lang);
      return `${offlineResponse} ${offlineMsg}`;
    }
  };



  const getGeminiResponse = async (userText, lang, history) => {
    console.log('📤 Frontend: Preparing Gemini request');
    console.log('💬 User text:', userText);
    console.log('🌐 Language:', lang);
    console.log('📜 History length:', history.length);
    
    const systemPrompt = lang === 'hi-IN' 
      ? 'आप एक डॉक्टर हैं। मरीज़ की मदद करें।'
      : 'You are a doctor. Help the patient with their medical concerns.';

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-5),
      { role: 'user', content: userText }
    ];
    
    console.log('📦 Sending to /api/gemini:', { messages, language: lang });

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        language: lang
      })
    });

    console.log('📊 Frontend: API response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ Frontend: API failed with status:', response.status);
      throw new Error(`API failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📥 Frontend: Received data:', data);
    
    const message = data.message || 'No response received';
    console.log('✅ Frontend: Final message:', message);
    
    return message;
  };

  const getAdvancedHealthResponse = (userText, lang) => {
    const responses = {
      'en-US': {
        greetings: ['Hello! I am Dr. AI, your medical specialist. How can I help you today?', 'Hi there! I\'m here to help with any health concerns. What brings you here?', 'Good day! I\'m Dr. AI. What symptoms or health issues are you experiencing?'],
        cancer: ['Cancer symptoms can vary widely. What specific symptoms are you experiencing? Any unexplained weight loss, persistent fatigue, or unusual lumps?', 'I understand your concern about cancer. Can you describe the symptoms in detail? When did they start? Any family history of cancer?'],
        'heart attack': ['Chest pain with heart attack is a medical emergency. Are you experiencing crushing chest pain, shortness of breath, nausea, or pain radiating to arm/jaw? Call 108 immediately.', 'Heart attack symptoms require immediate attention. Please call emergency services now if you have severe chest pain.'],
        'chest pain': ['Chest pain can be serious. Are you experiencing crushing pain, shortness of breath, sweating, or nausea? If severe, call 108 immediately. Can you describe the pain in detail?', 'Chest pain needs immediate evaluation. Is it sharp, dull, or crushing? Any radiation to arm, jaw, or back? How long have you had it?'],
        stroke: ['Stroke symptoms include sudden weakness, speech problems, or facial drooping. Are you experiencing any of these? This is an emergency - call 108 immediately.', 'If you suspect stroke, remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency.'],
        diabetes: ['Diabetes symptoms include excessive thirst, frequent urination, and unexplained weight loss. What symptoms are you experiencing? When did they start?', 'Are you experiencing increased thirst, frequent urination, blurred vision, or slow-healing wounds? These could indicate diabetes.'],
        fever: ['Fever can indicate infection. What\'s your temperature? Any other symptoms like chills, body aches, headache, or cough? How long have you had fever?', 'High fever needs attention. Any associated symptoms like difficulty breathing, severe headache, or rash? When did the fever start?'],
        headache: ['Headaches have many causes. Is it throbbing, sharp, or dull? Any nausea, vision changes, or neck stiffness? Scale of 1-10 for severity?', 'Severe headaches can be concerning. Any fever, vision problems, or weakness? Is this different from your usual headaches?'],
        cough: ['Persistent cough needs evaluation. Is it dry or productive? Any fever, shortness of breath, or chest pain? How long have you had it?', 'Chronic cough can indicate various conditions. Any blood in sputum? Night sweats or weight loss? When did it start?'],
        'stomach pain': ['Abdominal pain location matters. Where exactly? Upper, lower, right, or left side? Any nausea, vomiting, or fever? Rate pain 1-10.', 'Stomach pain can have many causes. Is it cramping, sharp, or burning? Any changes in bowel movements? When did it start?'],
        'back pain': ['Back pain is common but can be serious. Lower back, upper back, or neck? Any numbness, tingling, or leg pain? When did it start?', 'Chronic back pain affects daily life. Any weakness in legs? Pain worse with movement? Any recent injury or heavy lifting?'],
        anxiety: ['Anxiety can cause physical symptoms. Are you experiencing rapid heartbeat, sweating, trembling, or shortness of breath? How long have you felt this way?', 'Anxiety disorders are treatable. Any panic attacks, excessive worry, or sleep problems? Have you had any recent stressful events?'],
        depression: ['Mental health is important. Are you experiencing persistent sadness, loss of interest, sleep changes, or thoughts of self-harm? Professional help is available.', 'Depression affects many people. Any changes in appetite, energy, or concentration? Have you felt this way for more than two weeks?'],
        default: ['I understand you have health concerns. Can you describe all your symptoms in detail? When did they start? Any family history of similar conditions?', 'Please tell me about your symptoms, their duration, severity, and any factors that make them better or worse. I\'m here to help.']
      },
      'hi-IN': {
        greetings: ['नमस्ते! मैं डॉ. AI हूं, आपका मेडिकल विशेषज्ञ। आज मैं आपकी कैसे मदद कर सकता हूं?', 'नमस्कार! मैं किसी भी स्वास्थ्य समस्या में मदद करने के लिए यहां हूं। आप यहां क्यों आए हैं?', 'आपका स्वागत है! मैं डॉ. AI हूं। आप कौन से लक्षण या स्वास्थ्य समस्याएं अनुभव कर रहे हैं?'],
        cancer: ['कैंसर के लक्षण अलग-अलग हो सकते हैं। आप कौन से लक्षण महसूस कर रहे हैं? वजन कम होना, लगातार थकान, या कोई गांठ?', 'मैं आपकी कैंसर की चिंता समझ रहा हूं। कृपया लक्षणों का विस्तार से वर्णन करें। कब शुरू हुए? पारिवारिक इतिहास?'],
        'heart attack': ['हार्ट अटैक के साथ सीने में दर्द एक मेडिकल इमरजेंसी है। क्या आपको दबाने वाला सीने का दर्द, सांस की तकलीफ, जी मिचलाना है? तुरंत 108 पर कॉल करें।', 'हार्ट अटैक के लक्षणों में तुरंत ध्यान देना जरूरी है। अगर आपको गंभीर सीने का दर्द है तो कृपया अभी आपातकालीन सेवाओं को कॉल करें।'],
        'chest pain': ['सीने में दर्द गंभीर हो सकता है। क्या आपको दबाने वाला दर्द, सांस की तकलीफ, पसीना है? अगर गंभीर है तो 108 पर कॉल करें।', 'सीने के दर्द का तुरंत मूल्यांकन जरूरी है। क्या यह तेज़, हल्का, या दबाने वाला है? बाह, जबड़े या पीठ में फैलता है?'],
        fever: ['बुखार संक्रमण का संकेत हो सकता है। आपका तापमान क्या है? कोई और लक्षण जैसे ठंड, बदन दर्द, सिरदर्द?', 'तेज़ बुखार पर ध्यान देना जरूरी है। कोई सांस लेने में तकलीफ, गंभीर सिरदर्द, या दाने? बुखार कब से है?'],
        headache: ['सिरदर्द के कई कारण हो सकते हैं। क्या यह धड़कता हुआ, तेज़, या हल्का है? जी मिचलाना, दृष्टि में बदलाव, या गर्दन में अकड़न?', 'गंभीर सिरदर्द चिंताजनक हो सकता है। कोई बुखार, दृष्टि की समस्या, या कमजोरी? क्या यह आपके सामान्य सिरदर्द से अलग है?'],
        default: ['मैं आपकी स्वास्थ्य समस्याओं को समझ रहा हूं। कृपया अपने सभी लक्षणों का विस्तार से वर्णन करें। कब शुरू हुए? पारिवारिक इतिहास?', 'कृपया अपने लक्षणों, उनकी अवधि, गंभीरता के बारे में बताएं। मैं आपकी मदद करने के लिए यहां हूं।']
      }
    };

    const langResponses = responses[lang] || responses['en-US'];
    const lowerText = userText.toLowerCase();
    
    // Check for greetings first
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('नमस्ते') || lowerText.includes('नमस्कार') || lowerText.includes('hey') || lowerText.includes('good morning') || lowerText.includes('good evening')) {
      return getRandomResponse(langResponses.greetings);
    }
    
    // Check for serious conditions
    for (const [condition, responseArray] of Object.entries(langResponses)) {
      if (condition !== 'default' && condition !== 'greetings' && lowerText.includes(condition)) {
        return getRandomResponse(responseArray);
      }
    }
    
    return getRandomResponse(langResponses.default);
  };

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const translateToLanguage = (text, lang) => {
    // Simple translation for common medical terms (in real app, use Google Translate API)
    if (lang === 'hi-IN') {
      return text
        .replace(/fever/gi, 'बुखार')
        .replace(/headache/gi, 'सिरदर्द')
        .replace(/pain/gi, 'दर्द')
        .replace(/doctor/gi, 'डॉक्टर')
        .replace(/hospital/gi, 'अस्पताल');
    }
    return text;
  };

  const speakResponse = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Get appropriate voice
      const voices = synthRef.current.getVoices();
      let voice = voices.find(v => v.lang === language);
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
      }
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Avatar */}
      <div className="relative mb-6">
        <div className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transition-all duration-300 shadow-2xl ${
          isSpeaking ? 'animate-pulse scale-105' : ''
        }`}>
          <div className="text-6xl sm:text-8xl">
            {isSpeaking ? '🗣️' : isListening ? '👂' : '👨⚕️'}
          </div>
        </div>
        
        {/* Speaking Animation */}
        {isSpeaking && (
          <>
            <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse" />
          </>
        )}
        
        {/* Listening Animation */}
        {isListening && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-red-500 rounded-full animate-bounce"
                style={{
                  height: `${15 + i * 6}px`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Language Selector */}
      <div className="mb-4">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm"
        >
          <option value="en-US">🇺🇸 English</option>
          <option value="hi-IN">🇮🇳 हिंदी (Hindi)</option>
        </select>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={isListening ? stopListening : startListening}
          className={`px-4 py-2 rounded-full transition-all ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white shadow-lg`}
        >
          {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
          {isListening ? 'Stop' : 'Talk'}
        </Button>

        <Button
          onClick={isSpeaking ? stopSpeaking : () => response && speakResponse(response)}
          className={`px-4 py-2 rounded-full transition-all ${
            isSpeaking 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white shadow-lg`}
          disabled={!response}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
          {isSpeaking ? 'Stop' : 'Repeat'}
        </Button>
      </div>

      {/* Conversation Display */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Conversation
        </h3>
        
        {conversation.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🎤</div>
            <p>Click "Talk" to start conversation</p>
            <p className="text-sm mt-2">
              {language === 'hi-IN' ? 'हिंदी या अंग्रेजी में बात करें' : 'Speak in Hindi or English'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversation.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-blue-50 ml-4' 
                  : 'bg-green-50 mr-4'
              }`}>
                <p className="text-xs text-gray-600 mb-1">
                  {msg.type === 'user' ? 'You' : 'Dr. AI'}:
                </p>
                <p className="font-medium">{msg.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        {isListening && (
          <p className="text-blue-600 font-medium animate-pulse">
            🎤 Listening... Speak now
          </p>
        )}
        {isSpeaking && (
          <p className="text-green-600 font-medium">
            🔊 Dr. AI is speaking...
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-gray-600 max-w-md">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">How to use:</p>
          <p>🎤 Click "Talk" and speak your symptoms</p>
          <p>🔊 AI will respond with voice + text</p>
          <p>🌐 Works in Hindi and English</p>
          <p>👨⚕️ Ask about health concerns</p>
        </div>
      </div>
    </div>
  );
}