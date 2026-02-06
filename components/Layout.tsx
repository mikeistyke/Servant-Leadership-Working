
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 text-white flex flex-col sticky top-0 md:h-screen z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold italic text-teal-400">Servant <span className="text-white">Lead</span></h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Greenleaf Wisdom</p>
        </div>

        <div className="flex-1 px-4 space-y-2 py-4">
          <NavItem 
            active={currentView === View.HOME} 
            onClick={() => onNavigate(View.HOME)} 
            icon="fa-house" 
            label="Dashboard" 
          />
          <NavItem 
            active={currentView === View.PRINCIPLES} 
            onClick={() => onNavigate(View.PRINCIPLES)} 
            icon="fa-book-open" 
            label="Principles" 
          />
          <NavItem 
            active={currentView === View.ASSESSMENT} 
            onClick={() => onNavigate(View.ASSESSMENT)} 
            icon="fa-clipboard-check" 
            label="Self-Assessment" 
          />
          <NavItem 
            active={currentView === View.COACH} 
            onClick={() => onNavigate(View.COACH)} 
            icon="fa-user-tie" 
            label="AI Coach" 
          />
          <NavItem 
            active={currentView === View.REFLECTION} 
            onClick={() => onNavigate(View.REFLECTION)} 
            icon="fa-cloud-sun" 
            label="Daily Reflection" 
          />
        </div>

        <div className="p-6 border-t border-slate-800 hidden md:block">
          <p className="text-xs text-slate-500">"The servant-leader is servant first."</p>
          <p className="text-xs text-slate-600 mt-2">— Robert K. Greenleaf</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{active: boolean, onClick: () => void, icon: string, label: string}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20' 
        : 'hover:bg-slate-800 text-slate-400'
    }`}
  >
    <i className={`fa-solid ${icon} w-5`}></i>
    <span className="font-medium">{label}</span>
  </button>
);

export default Layout;
