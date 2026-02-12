
import React, { useState } from 'react';
import Layout from './components/Layout';
import PrinciplesGrid from './components/Principles';
import Assessment from './components/Assessment';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

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
                      src="/images/image-01.jpg" 
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
          </div>
        );
      case View.PRINCIPLES:
        return <PrinciplesGrid />;
      case View.ASSESSMENT:
        return <Assessment />;
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
