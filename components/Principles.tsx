
import React, { useState } from 'react';
import { PRINCIPLES } from '../constants';
import { Principle } from '../types';

const PrinciplesGrid: React.FC = () => {
  const [selected, setSelected] = useState<Principle | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold mb-2">The 10 Characteristics</h2>
          <p className="text-slate-600 max-w-2xl">Robert K. Greenleaf's fundamental traits for those who seek to serve first, then lead.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shadow-sm">
          <span className="text-teal-700 text-sm font-medium">
            <i className="fa-solid fa-mountain mr-2"></i>
            Click a card to reveal the Wisdom Stone
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRINCIPLES.map((p, idx) => (
          <div 
            key={p.id}
            onClick={() => setSelected(p)}
            className="group cursor-pointer bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="h-56 bg-slate-100 relative overflow-hidden border-b border-slate-50 flex items-center justify-center">
              {p.illustrationUrl ? (
                <img 
                  src={p.illustrationUrl} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <i className="fa-solid fa-image text-4xl mb-2 opacity-20"></i>
                  <p className="text-[10px] uppercase font-black tracking-widest leading-tight">Wisdom Awaiting<br/>Visual Path</p>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-lg z-20">
                Principle {idx + 1}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.color}`}>
                  <i className={`fa-solid ${p.icon} text-sm`}></i>
                </div>
                <h3 className="text-xl font-bold group-hover:text-teal-600 transition-colors">{p.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{p.summary}</p>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">View Wisdom Stone</span>
                 <i className="fa-solid fa-arrow-right text-xs text-slate-300 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setSelected(null)}>
          <div 
            className="bg-white rounded-[2.5rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleUp"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-white/90 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-20 shadow-lg hover:rotate-90 duration-300"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <div className="p-6 md:p-12">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-100 group/stone relative bg-slate-50 flex items-center justify-center min-h-[400px]">
                     {selected.quoteStoneUrl ? (
                       <img 
                        src={selected.quoteStoneUrl} 
                        alt={`${selected.title} Wisdom Stone`} 
                        className="w-full h-auto block"
                       />
                     ) : (
                       <div className="flex flex-col items-center justify-center text-slate-300">
                          <i className="fa-solid fa-scroll text-6xl mb-4 opacity-10"></i>
                          <p className="font-serif italic">This Wisdom Stone is being carved...</p>
                       </div>
                     )}
                     <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover/stone:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>

                  <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-2">
                      <p className="text-teal-600 font-black uppercase tracking-[0.2em] text-[10px]">Robert K. Greenleaf Wisdom</p>
                      <h3 className="text-5xl font-black tracking-tighter text-slate-900 heading-font">{selected.title}</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="prose prose-slate prose-lg">
                        <p className="text-slate-600 leading-relaxed font-serif text-xl italic border-l-4 border-teal-100 pl-6">
                          "{selected.fullDescription}"
                        </p>
                      </div>

                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                        <h4 className="font-black text-slate-400 uppercase tracking-widest text-[10px]">The Key Takeaway</h4>
                        <p className="text-slate-800 text-lg font-medium leading-relaxed">
                          {selected.takeaway}
                        </p>
                      </div>

                      <div className="bg-teal-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-teal-900/30 relative overflow-hidden group/box">
                        <h4 className="font-bold text-teal-200 mb-2 flex items-center text-xs uppercase tracking-widest">
                          <i className="fa-solid fa-compass mr-2"></i>
                          Guidance for Leaders
                        </h4>
                        <p className="relative z-10 text-white font-bold text-xl leading-snug">
                          {selected.summary}
                        </p>
                        <i className="fa-solid fa-leaf absolute -bottom-6 -right-6 text-9xl text-white/10 rotate-12 group-hover/box:rotate-0 transition-transform duration-1000"></i>
                      </div>
                    </div>

                    <div className="text-center pt-6">
                       <button 
                        onClick={() => setSelected(null)}
                        className="text-slate-400 hover:text-teal-600 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center mx-auto space-x-2"
                       >
                         <i className="fa-solid fa-arrow-left"></i>
                         <span>Return to Hub</span>
                       </button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrinciplesGrid;
