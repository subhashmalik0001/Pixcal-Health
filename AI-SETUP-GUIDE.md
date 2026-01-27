# 🤖 Advanced AI Doctor Setup Guide

## 🎯 Best FREE AI APIs for Medical Diagnosis

### 1. **Groq (RECOMMENDED)** ⭐
- **Free Tier**: 6,000 requests/day
- **Speed**: Ultra-fast responses (2-3 seconds)
- **Model**: Llama 3 8B (Very good for medical)
- **Setup**: https://console.groq.com

```bash
# Get API key and add to .env.local
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_key_here
```

### 2. **Together AI** 🚀
- **Free Tier**: $25 free credits
- **Models**: Llama 2, Code Llama, Mistral
- **Setup**: https://together.ai

```bash
NEXT_PUBLIC_TOGETHER_API_KEY=your_together_key_here
```

### 3. **OpenRouter** 🌐
- **Free Tier**: $1 free credits
- **Models**: Access to 100+ models
- **Setup**: https://openrouter.ai

```bash
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-your_key_here
```

### 4. **OpenAI** (Paid but Best) 💰
- **Cost**: $0.002 per 1K tokens
- **Model**: GPT-4 (Best medical knowledge)
- **Setup**: https://platform.openai.com

```bash
NEXT_PUBLIC_OPENAI_API_KEY=sk-your_openai_key_here
```

## 🔧 Quick Setup Steps

### Step 1: Choose Your API
I recommend **Groq** for the best free experience:

1. Go to https://console.groq.com
2. Sign up with Google/GitHub
3. Go to API Keys section
4. Create new API key
5. Copy the key (starts with `gsk_`)

### Step 2: Add API Key
Create `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_actual_key_here
```

### Step 3: Test the AI
1. Restart your development server: `npm run dev`
2. Go to `/ai-avatar` page
3. Say "I have fever and headache"
4. AI will now give advanced medical responses!

## 🩺 What You Get with Advanced AI

### Before (Basic Responses):
- User: "I have fever"
- AI: "How long have you had fever?"

### After (Advanced AI):
- User: "I have fever and headache"
- AI: "I understand you're experiencing fever and headache. Let me ask some detailed questions to better assess your condition:

1. What's your current temperature?
2. How long have you had these symptoms?
3. Is the headache throbbing or constant?
4. Any nausea, vomiting, or sensitivity to light?
5. Have you taken any medications?
6. Any recent travel or exposure to illness?

Based on your symptoms, this could range from a common viral infection to something requiring immediate attention. The combination of fever and headache needs careful evaluation."

## 🌟 Advanced Features You'll Get

### 1. **Detailed Medical History**
- Asks comprehensive follow-up questions
- Considers symptom combinations
- Evaluates severity and duration

### 2. **Differential Diagnosis**
- Suggests possible conditions
- Explains reasoning
- Prioritizes by likelihood

### 3. **Treatment Recommendations**
- Home care instructions
- When to see a doctor
- Emergency warning signs

### 4. **Bilingual Expertise**
- Fluent medical conversations in Hindi
- Cultural context awareness
- Appropriate medical terminology

### 5. **Conversation Memory**
- Remembers previous symptoms mentioned
- Builds comprehensive case history
- Connects related symptoms

## 💡 Pro Tips

### For Best Results:
1. **Be Specific**: "Sharp chest pain for 2 hours" vs "chest pain"
2. **Mention Duration**: "3 days of fever" vs "fever"
3. **Include Severity**: "Severe headache 8/10" vs "headache"
4. **List All Symptoms**: "Fever, cough, body aches" vs just "fever"

### Cost Management:
- **Groq**: 6000 free requests = ~200 conversations/day
- **Together**: $25 credits = ~12,500 requests
- **OpenRouter**: $1 = ~500 requests
- **OpenAI**: $5 = ~2,500 requests

## 🚨 Emergency Detection
The AI will detect emergency symptoms and immediately recommend:
- Call 108 (ambulance)
- Go to nearest hospital
- Don't delay treatment

## 🔄 Fallback System
If all APIs fail, it falls back to offline responses, so your app never breaks!

## 🎯 Recommended Setup
1. **Primary**: Groq (free, fast, good quality)
2. **Backup**: Together AI (when Groq limit reached)
3. **Premium**: Add OpenAI for best quality (optional)

Start with Groq - it's free, fast, and gives excellent medical responses! 🎉