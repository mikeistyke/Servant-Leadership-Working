import { GoogleGenAI } from '@google/genai';

const TIMEOUT_MS = 10000;

const withTimeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('API request timed out')), ms))
  ]);
};

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.error('❌ GEMINI_API_KEY is not properly configured. Please set a valid API key in .env.local');
    throw new Error('GEMINI_API_KEY not configured');
  }
  console.log('✅ Using API key:', apiKey.substring(0, 10) + '...');
  return new GoogleGenAI({ apiKey });
};

export const getDailyReflection = async () => {
  const ai = getAIClient();
  try {
    console.log('🔄 Calling Gemini API with model: gemini-2.0-flash');
    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: "Generate a unique daily reflection prompt and a short inspirational quote about Servant Leadership. Format it nicely with a 'Quote of the Day' and a 'Reflection Question'.",
        config: { temperature: 0.8, maxOutputTokens: 300 }
      }),
      TIMEOUT_MS
    );
    console.log('✅ Gemini response received:', response);
    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate reflection at this time.';
    console.log('📝 Extracted text:', text.substring(0, 50));
    return text;
  } catch (err) {
    console.error('❌ Gemini Error:', err.message || err);
    return 'The path to wisdom is currently obscured. Please try again later.';
  }
};

export const getCoachResponse = async (history, message) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
      systemInstruction: `You are an expert Servant Leadership Coach. Help leaders apply Robert Greenleaf's 10 principles.`,
      temperature: 0.7
    }
  });
  try {
    const response = await withTimeout(chat.sendMessage({ message }), TIMEOUT_MS);
    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm reflecting on that. Can you rephrase?";
    return text;
  } catch (err) {
    console.error('Coach Error:', err);
    return 'I encountered a momentary block. How else can I serve you today?';
  }
};

export const analyzeAssessment = async (scores) => {
  const ai = getAIClient();
  const prompt = `Analyze these servant leadership trait scores (out of 5): ${JSON.stringify(scores)}. Provide a brief summary of strengths and one actionable growth area based on these principles.`;
  try {
    const response = await withTimeout(ai.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt }), TIMEOUT_MS);
    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis complete. You are on a great path.';
    return text;
  } catch (err) {
    console.error('Analysis Error:', err);
    return 'Your journey is unique; continue practicing awareness and service.';
  }
};
