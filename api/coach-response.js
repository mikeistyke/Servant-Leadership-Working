import { getAiClient, getModel, json, parseBody } from './_gemini.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { message = '' } = parseBody(req);
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: getModel(),
      config: {
        systemInstruction: `You are an expert Servant Leadership Coach. Your goal is to help leaders apply Robert Greenleaf's 10 principles (Listening, Empathy, Healing, Awareness, Persuasion, Conceptualization, Foresight, Stewardship, Commitment to growth, Building Community). Be supportive, ask insightful questions, and focus on service-oriented solutions.`,
        temperature: 0.7
      }
    });

    const response = await chat.sendMessage({ message });
    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm reflecting on that. Can you rephrase?";
    return json(res, 200, { text });
  } catch (error) {
    console.error('Vercel /api/coach-response error:', error);
    return json(res, 500, { error: 'Failed to get coach response' });
  }
}
