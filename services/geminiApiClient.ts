const TIMEOUT_MS = 10000;

const withTimeout = async <T,>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('API request timed out')), ms))
  ]);
};

const postJson = async <T,>(url: string, body: unknown): Promise<T> => {
  const response = await withTimeout(
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }),
    TIMEOUT_MS
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getDailyReflection = async (): Promise<string> => {
  try {
    const result = await postJson<{ text?: string }>('/api/daily-reflection', {});
    return result?.text || 'Unable to generate reflection at this time.';
  } catch (error) {
    console.error('Gemini Error:', error);
    return 'The path to wisdom is currently obscured. Please try again later.';
  }
};

export const getCoachResponse = async (history: {role: string, content: string}[], message: string): Promise<string> => {
  try {
    const result = await postJson<{ text?: string }>('/api/coach-response', { history, message });
    return result?.text || "I'm reflecting on that. Can you rephrase?";
  } catch (error) {
    console.error('Coach Error:', error);
    return 'I encountered a momentary block. How else can I serve you today?';
  }
};

export const analyzeAssessment = async (scores: Record<string, number>): Promise<string> => {
  try {
    const result = await postJson<{ text?: string }>('/api/analyze-assessment', { scores });
    return result?.text || 'Analysis complete. You are on a great path.';
  } catch (error) {
    console.error('Analysis Error:', error);
    return 'Your journey is unique; continue practicing awareness and service.';
  }
};
