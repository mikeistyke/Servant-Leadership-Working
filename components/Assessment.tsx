
import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../constants';
import { analyzeAssessment } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Assessment: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleScoreChange = (qId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const calculateResults = () => {
    const traits: Record<string, { total: number, count: number }> = {};
    ASSESSMENT_QUESTIONS.forEach(q => {
      const score = answers[q.id] || 0;
      if (!traits[q.trait]) traits[q.trait] = { total: 0, count: 0 };
      traits[q.trait].total += score;
      traits[q.trait].count += 1;
    });

    return Object.entries(traits).map(([trait, data]) => ({
      trait: trait.charAt(0).toUpperCase() + trait.slice(1),
      score: data.total / data.count
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const results = calculateResults();
    const scoresMap = results.reduce((acc, curr) => ({ ...acc, [curr.trait]: curr.score }), {});
    
    const aiAnalysis = await analyzeAssessment(scoresMap);
    setAnalysis(aiAnalysis);
    setIsSubmitted(true);
    setLoading(false);
  };

  if (isSubmitted) {
    const data = calculateResults();
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold mb-6">Your Leadership Profile</h2>
          
          <div className="h-64 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="trait" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 3.5 ? '#0d9488' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-xl">
            <h3 className="text-xl font-bold text-teal-900 mb-2">AI Expert Analysis</h3>
            {loading ? (
              <div className="flex items-center space-x-2 text-teal-600 italic">
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Synthesizing your results...</span>
              </div>
            ) : (
              <p className="text-teal-800 whitespace-pre-wrap leading-relaxed">{analysis}</p>
            )}
          </div>

          <button 
            onClick={() => {setIsSubmitted(false); setAnswers({});}}
            className="mt-8 px-6 py-2 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-4xl font-bold mb-2">Leadership Self-Assessment</h2>
        <p className="text-slate-600">Be honest with yourself. Rate how often you demonstrate these behaviors (1 = Rarely, 5 = Always).</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {ASSESSMENT_QUESTIONS.map((q, idx) => (
          <div key={q.id} className={`p-8 ${idx !== ASSESSMENT_QUESTIONS.length - 1 ? 'border-b border-slate-50' : ''}`}>
            <p className="text-lg font-medium mb-4">{idx + 1}. {q.text}</p>
            <div className="flex items-center justify-between max-w-md">
              <span className="text-xs text-slate-400">Rarely</span>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleScoreChange(q.id, num)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center font-bold ${
                    answers[q.id] === num 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-lg' 
                      : 'border-slate-200 text-slate-400 hover:border-teal-200'
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-xs text-slate-400">Always</span>
            </div>
          </div>
        ))}

        <div className="p-8 bg-slate-50 text-right">
          <button
            disabled={Object.keys(answers).length < ASSESSMENT_QUESTIONS.length || loading}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all ${
              Object.keys(answers).length < ASSESSMENT_QUESTIONS.length
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-black active:scale-95'
            }`}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : 'Submit Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
