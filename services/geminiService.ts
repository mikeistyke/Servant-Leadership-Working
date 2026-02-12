
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const TIMEOUT_MS = 10000; // 10 second timeout

const withTimeout = async <T,>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('API request timed out')), ms)
    )
  ]);
};

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.error('GEMINI_API_KEY is not properly configured. Please set a valid API key in .env.local');
  }
  return new GoogleGenAI({ apiKey });
};

export const getDailyReflection = async (): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: "Generate a unique daily reflection prompt and a short inspirational quote about Servant Leadership. Format it nicely with a 'Quote of the Day' and a 'Reflection Question'.",
        config: {
          temperature: 0.8,
          maxOutputTokens: 300
        }
      }),
      TIMEOUT_MS
    );
    
    // Handle different possible response structures
    const text = response.text || 
                 response?.response?.text || 
                 response?.candidates?.[0]?.content?.parts?.[0]?.text ||
                 "Unable to generate reflection at this time.";
    
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The path to wisdom is currently obscured. Please try again later.";
  }
};

export const getCoachResponse = async (history: {role: string, content: string}[], message: string): Promise<string> => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
      systemInstruction: `You are an expert Servant Leadership Coach. 
      Your goal is to help leaders apply Robert Greenleaf's 10 principles (Listening, Empathy, Healing, Awareness, Persuasion, Conceptualization, Foresight, Stewardship, Commitment to growth, Building Community).
      Be supportive, ask insightful questions, and focus on service-oriented solutions.`,
      temperature: 0.7,
    }
  });

  // Pre-load history if needed, but for simplicity we'll just send the message
  // Note: chat.sendMessage takes a simple message string
  try {
    const response = await withTimeout(
      chat.sendMessage({ message }),
      TIMEOUT_MS
    );
    const text = response.text || 
                 response?.response?.text || 
                 response?.candidates?.[0]?.content?.parts?.[0]?.text ||
                 "I'm reflecting on that. Can you rephrase?";
    return text;
  } catch (error) {
    console.error("Coach Error:", error);
    return "I encountered a momentary block. How else can I serve you today?";
  }
};

export const analyzeAssessment = async (scores: Record<string, number>): Promise<string> => {
  const ai = getAIClient();
  const prompt = `Analyze these servant leadership trait scores (out of 5): ${JSON.stringify(scores)}. 
  Provide a brief summary of strengths and one actionable growth area based on these principles. 
  Keep it encouraging and professional.`;

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      }),
      TIMEOUT_MS
    );
    const text = response.text || 
                 response?.response?.text || 
                 response?.candidates?.[0]?.content?.parts?.[0]?.text ||
                 "Analysis complete. You are on a great path.";
    return text;
  } catch (error) {
    console.error("Analysis Error:", error);
    return "Your journey is unique; continue practicing awareness and service.";
  }
};
