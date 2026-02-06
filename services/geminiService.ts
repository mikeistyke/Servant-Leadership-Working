
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getDailyReflection = async (): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a unique daily reflection prompt and a short inspirational quote about Servant Leadership. Format it nicely with a 'Quote of the Day' and a 'Reflection Question'.",
      config: {
        temperature: 0.8,
        maxOutputTokens: 300
      }
    });
    return response.text || "Unable to generate reflection at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The path to wisdom is currently obscured. Please try again later.";
  }
};

export const getCoachResponse = async (history: {role: string, content: string}[], message: string): Promise<string> => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
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
    const response = await chat.sendMessage({ message });
    return response.text || "I'm reflecting on that. Can you rephrase?";
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Analysis complete. You are on a great path.";
  } catch (error) {
    return "Your journey is unique; continue practicing awareness and service.";
  }
};
