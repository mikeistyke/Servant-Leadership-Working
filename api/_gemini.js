import { GoogleGenAI } from '@google/genai';

const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];

export const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured on the server');
  }
  return new GoogleGenAI({ apiKey });
};

export const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

export const json = (res, status, payload) => {
  res.status(status).json(payload);
};

export const getModels = () => MODELS;

export const getErrorMessage = (error) => {
  if (!error) return 'Unknown error';
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return JSON.stringify(error);
};

export const generateContentWithFallback = async (ai, requestConfig) => {
  let lastError = null;

  for (const model of MODELS) {
    try {
      return await ai.models.generateContent({
        ...requestConfig,
        model
      });
    } catch (error) {
      lastError = error;
      const message = getErrorMessage(error).toLowerCase();
      const isModelIssue = message.includes('model') || message.includes('not found') || message.includes('unsupported');
      if (!isModelIssue) {
        throw error;
      }
    }
  }

  throw lastError || new Error('No compatible Gemini model available for this key');
};
