export default async function handler(req, res) {
  console.log('📥 Gemini API Request:', req.method, req.url);
  console.log('📝 Request Body:', JSON.stringify(req.body, null, 2));
  
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, language } = req.body;
  console.log('🌐 Language:', language);
  console.log('💬 Messages count:', messages?.length);

  if (!messages || !Array.isArray(messages)) {
    console.log('❌ Invalid messages format');
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    console.log('❌ API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  console.log('🔑 API Key found:', GEMINI_API_KEY.substring(0, 10) + '...');

  try {
    const userMessage = messages[messages.length - 1]?.content || '';
    const systemPrompt = language === 'hi-IN' 
      ? 'आप एक डॉक्टर हैं। पूरा जवाब दें। बीच में न रुकें।'
      : 'You are a doctor. Give complete responses. Don\'t stop mid-sentence. Finish your thoughts completely.';

    const prompt = `${systemPrompt}\n\nConversation History:\n${messages.slice(1).map(m => `${m.role === 'user' ? 'Patient' : 'Doctor'}: ${m.content}`).join('\n')}\n\nPatient: ${userMessage}\nDoctor:`;
    console.log('📋 Final prompt:', prompt);

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    };
    
    console.log('🚀 Sending request to Gemini API...');
    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📊 Gemini API Response Status:', response.status);
    console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API Error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Gemini API failed' });
    }
    
    const data = await response.json();
    console.log('📥 Gemini API Response:', JSON.stringify(data, null, 2));
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.log('❌ Invalid API response structure');
      return res.status(500).json({ error: 'Invalid API response' });
    }
    
    const message = data.candidates[0].content.parts[0].text;
    console.log('✅ Final response message:', message);
    
    res.status(200).json({ 
      message: message 
    });
    
  } catch (error) {
    console.error('💥 API Error:', error);
    console.error('💥 Error stack:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
}