import { GoogleGenAI } from '@google/genai';

const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];
const DEFAULT_ALLOWED_ORIGINS = [
  'https://servant-leadership-working.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];
const MAX_CONTENT_LENGTH = 20000;

export const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error('Missing API key on server. Set GEMINI_API_KEY (or GOOGLE_API_KEY/API_KEY) in Vercel Project Environment Variables and redeploy.');
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

const getAllowedOrigins = () => {
  const custom = process.env.ALLOWED_ORIGINS;
  if (!custom) return DEFAULT_ALLOWED_ORIGINS;
  return custom
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const enforceRequestPolicy = (req, res) => {
  const origin = req.headers?.origin;
  const allowedOrigins = getAllowedOrigins();

  if (origin && !allowedOrigins.includes(origin)) {
    json(res, 403, { error: 'Forbidden origin' });
    return false;
  }

  const contentLength = Number(req.headers?.['content-length'] || 0);
  if (contentLength > MAX_CONTENT_LENGTH) {
    json(res, 413, { error: 'Payload too large' });
    return false;
  }

  return true;
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
