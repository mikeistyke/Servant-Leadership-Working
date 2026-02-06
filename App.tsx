
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PrinciplesGrid from './components/Principles';
import Assessment from './components/Assessment';
import GeminiChat from './components/GeminiChat';
import { View } from './types';
import { getDailyReflection } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [reflection, setReflection] = useState<string>('');
  const [loadingReflection, setLoadingReflection] = useState(false);

  useEffect(() => {
    fetchReflection();
  }, []);

  const fetchReflection = async () => {
    setLoadingReflection(true);
    const res = await getDailyReflection();
    setReflection(res);
    setLoadingReflection(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 text-white p-10 md:p-16 lg:p-20 shadow-2xl">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest">
                    <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                    The Greenleaf Legacy
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight heading-font">
                    Serve First. <br/>
                    <span className="text-teal-400 italic font-normal">Lead Second.</span>
                  </h2>
                  <p className="text-slate-300 text-xl leading-relaxed max-w-lg font-medium">
                    "The servant-leader is servant first. It begins with the natural feeling that one wants to serve."
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => setCurrentView(View.PRINCIPLES)}
                      className="px-10 py-4 bg-teal-500 text-slate-900 rounded-2xl font-black hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center group"
                    >
                      Explore the Stone
                      <i className="fa-solid fa-chevron-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                    <button 
                      onClick={() => setCurrentView(View.ASSESSMENT)}
                      className="px-10 py-4 border-2 border-slate-700 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                    >
                      Self-Assessment
                    </button>
                  </div>
                </div>

                <div className="relative lg:block">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-800 group bg-slate-800 aspect-[4/3] flex items-center justify-center relative">
                    <img 
                      src="input_file_2.png" 
                      alt="The Foundation of Empathy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-[2rem] shadow-2xl hidden md:flex items-center space-x-4 border border-slate-100 animate-bounce-slow">
                    <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
                       <i className="fa-solid fa-gem text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Wisdom Stone</p>
                      <p className="text-slate-900 font-black text-lg">Empathy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Daily Insight Card */}
              <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-500 group/card overflow-hidden">
                <div className="h-64 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img 
                    src="input_file_2.png" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    alt="Servant Leadership Visualization"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                    Artistic Visualization
                  </div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover/card:rotate-12 transition-transform shadow-sm">
                         <i className="fa-solid fa-sparkles text-2xl"></i>
                      </div>
                      <h3 className="text-3xl font-black heading-font">Daily Insight</h3>
                    </div>
                    <button 
                      onClick={fetchReflection} 
                      className="text-slate-300 hover:text-teal-600 transition-all p-3 hover:bg-teal-50 rounded-2xl"
                      title="Refresh Insight"
                    >
                      <i className={`fa-solid fa-arrows-rotate text-xl ${loadingReflection ? 'fa-spin' : ''}`}></i>
                    </button>
                  </div>
                  {loadingReflection ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-10">
                      <div className="w-12 h-12 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin"></div>
                      <p className="mt-4 text-slate-400 font-medium">Listening to the silence...</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="whitespace-pre-wrap italic text-slate-800 text-2xl font-serif leading-relaxed">
                        {reflection || "Wisdom is being gathered. Please check back shortly."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Coach Card */}
              <div className="bg-gradient-to-br from-teal-600 to-emerald-800 p-12 rounded-[3.5rem] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden group/coach">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-inner group-hover/coach:-translate-y-2 transition-transform">
                     <i className="fa-solid fa-robot text-3xl text-white"></i>
                  </div>
                  <h3 className="text-4xl font-black mb-6 heading-font">Mentor On Demand</h3>
                  <p className="text-teal-50 text-xl leading-relaxed opacity-90 font-medium max-w-xs">
                    Apply Robert Greenleaf's 10 principles to your specific daily challenges.
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentView(View.COACH)}
                  className="relative z-10 w-full py-6 bg-white text-teal-900 rounded-[2rem] font-black hover:bg-teal-50 transition-all flex items-center justify-center space-x-4 shadow-2xl active:scale-95 group/btn mt-12 text-lg"
                >
                  <span>Chat with your Mentor</span>
                  <i className="fa-solid fa-comment-dots group-hover/btn:translate-x-1 transition-transform"></i>
                </button>
                <i className="fa-solid fa-leaf absolute -bottom-16 -right-16 text-[22rem] text-white/5 rotate-12 group-hover/coach:rotate-45 transition-transform duration-[3000ms]"></i>
              </div>
            </div>
          </div>
        );
      case View.PRINCIPLES:
        return <PrinciplesGrid />;
      case View.ASSESSMENT:
        return <Assessment />;
      case View.COACH:
        return <GeminiChat />;
      case View.REFLECTION:
        return (
          <div className="max-w-4xl mx-auto space-y-12 py-10 animate-fadeIn">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-[3rem] bg-teal-50 text-teal-600 shadow-xl shadow-teal-500/10 mb-2 border border-teal-100">
                <i className="fa-solid fa-moon-stars text-5xl"></i>
              </div>
              <h2 className="text-6xl font-black tracking-tight heading-font">The Inner Voice</h2>
              <p className="text-slate-400 text-xl font-serif italic">Pause. Listen. Realign.</p>
            </div>
            
            <div className="bg-white p-16 md:p-24 rounded-[4rem] shadow-2xl border border-slate-100 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-emerald-500"></div>
              {loadingReflection ? (
                <div className="space-y-8 py-20">
                   <div className="w-16 h-16 border-4 border-slate-50 border-t-teal-500 rounded-full animate-spin mx-auto"></div>
                   <p className="text-slate-400 font-medium italic text-lg">Synthesizing deep thought...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-3xl text-slate-800 leading-relaxed font-serif italic relative z-10 px-4">
                  "{reflection}"
                </div>
              )}
              <div className="mt-16 relative z-10">
                <button 
                  onClick={fetchReflection}
                  className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-black transition-all shadow-2xl active:scale-95 flex items-center mx-auto space-x-3"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>New Reflection</span>
                </button>
              </div>
              <i className="fa-solid fa-seedling absolute bottom-[-50px] left-[-50px] text-[15rem] text-slate-50 -z-10 rotate-12 opacity-50"></i>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
