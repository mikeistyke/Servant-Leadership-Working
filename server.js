import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDailyReflection } from './services/geminiService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('📁 Current directory:', __dirname);

// Load .env.local from the correct path
const envPath = path.join(__dirname, '.env.local');
console.log('🔍 Looking for .env at:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('⚠️ Could not load .env.local:', result.error.message);
} else {
  console.log('✅ .env.local loaded successfully');
  console.log('📋 Available env vars:', Object.keys(process.env).filter(k => k.includes('GEMINI')));
}

// Ensure API key is available
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
console.log('🔑 GEMINI_API_KEY:', apiKey ? apiKey.substring(0, 15) + '...' : 'NOT SET');
console.log('🔑 VITE_GEMINI_API_KEY:', process.env.VITE_GEMINI_API_KEY ? process.env.VITE_GEMINI_API_KEY.substring(0, 15) + '...' : 'NOT SET');

if (!apiKey) {
  console.error('❌ CRITICAL: GEMINI_API_KEY not set in .env.local');
  console.error('❌ The backend will fail all Gemini requests');
} else {
  process.env.GEMINI_API_KEY = apiKey;
  console.log('✅ API key configured for backend');
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/daily-reflection', async (req, res) => {
  try {
    console.log('📝 Fetching daily reflection...');
    const text = await getDailyReflection();
    res.json({ text });
  } catch (err) {
    console.error('❌ Server /api/daily-reflection error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to get daily reflection' });
  }
});

const port = process.env.PORT || 5174;
app.listen(port, () => console.log(`✅ API server running on http://localhost:${port}`));
