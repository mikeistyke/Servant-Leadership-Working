import { generateContentWithFallback, getAiClient, getErrorMessage, json, parseBody } from './_gemini.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { history = [], message = '' } = parseBody(req);
    const historyText = history
      .slice(-8)
      .map((item) => `${item?.role || 'user'}: ${item?.content || ''}`)
      .join('\n');

    const prompt = `You are an expert Servant Leadership Coach. Your goal is to help leaders apply Robert Greenleaf's 10 principles (Listening, Empathy, Healing, Awareness, Persuasion, Conceptualization, Foresight, Stewardship, Commitment to growth, Building Community). Be supportive, ask insightful questions, and focus on service-oriented solutions.\n\nConversation history:\n${historyText}\n\nUser message:\n${message}`;

    const ai = getAiClient();
    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });

    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm reflecting on that. Can you rephrase?";
    return json(res, 200, { text });
  } catch (error) {
    console.error('Vercel /api/coach-response error:', error);
    return json(res, 500, { error: `Failed to get coach response: ${getErrorMessage(error)}` });
  }
}
