import { generateContentWithFallback, getAiClient, getErrorMessage, json } from './_gemini.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const ai = getAiClient();
    const response = await generateContentWithFallback(ai, {
      contents: "Generate a unique daily reflection prompt and a short inspirational quote about Servant Leadership. Format it nicely with a 'Quote of the Day' and a 'Reflection Question'.",
      config: {
        temperature: 0.8,
        maxOutputTokens: 300
      }
    });

    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate reflection at this time.';
    return json(res, 200, { text });
  } catch (error) {
    console.error('Vercel /api/daily-reflection error:', error);
    return json(res, 500, { error: `Failed to get daily reflection: ${getErrorMessage(error)}` });
  }
}
