import { enforceRequestPolicy, generateContentWithFallback, getAiClient, getErrorMessage, json, parseBody } from './_gemini.js';

export default async function handler(req, res) {
  if (!enforceRequestPolicy(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { scores = {} } = parseBody(req);
    const prompt = `Analyze these servant leadership trait scores (out of 5): ${JSON.stringify(scores)}. Provide a brief summary of strengths and one actionable growth area based on these principles. Keep it encouraging and professional.`;

    const ai = getAiClient();
    const response = await generateContentWithFallback(ai, {
      contents: prompt
    });

    const text = response.text || response?.response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis complete. You are on a great path.';
    return json(res, 200, { text });
  } catch (error) {
    console.error('Vercel /api/analyze-assessment error:', error);
    return json(res, 500, { error: `Failed to analyze assessment: ${getErrorMessage(error)}` });
  }
}
