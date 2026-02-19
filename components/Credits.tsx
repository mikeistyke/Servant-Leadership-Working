import React from 'react';

const Credits: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-6 mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-teal-50 text-teal-600 shadow-xl shadow-teal-500/10 border border-teal-100 mb-4">
          <i className="fa-solid fa-heart text-4xl"></i>
        </div>
        <h1 className="text-6xl font-black tracking-tight heading-font">Credits & Acknowledgments</h1>
        <p className="text-slate-500 text-xl font-serif italic">Built with gratitude and purpose</p>
      </div>

      {/* Creator's Vision - Featured Section */}
      <div className="mb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-slate-700">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <p className="text-teal-400 font-black uppercase tracking-widest text-sm">Creator & Founder</p>
            <h2 className="text-5xl font-black heading-font mb-2">Michael "Tyke" Cirigliano</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-slate-300 text-lg font-semibold mb-2">Vision</p>
              <p className="text-slate-100 text-xl italic leading-relaxed">
                Created to illuminate and promote Robert Greenleaf's Servant Leadership principles for modern business leaders
              </p>
            </div>

            <div>
              <p className="text-slate-300 text-lg font-semibold mb-2">Commitment</p>
              <p className="text-slate-100 leading-relaxed">
                I am committed to fostering a servant leadership culture through listening first, serving with humility, and developing people through consistent support and accountability.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-slate-200">
              <i className="fa-solid fa-globe text-teal-400"></i>
              <a 
                href="https://vibinginva.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-semibold underline transition-colors"
              >
                vibinginva.com
              </a>
              <span className="text-slate-500 text-sm">(in development)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Robert Greenleaf */}
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
              <i className="fa-solid fa-book text-2xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-black heading-font">Robert K. Greenleaf</h3>
              <p className="text-sm text-slate-500 font-medium">Founder of Servant Leadership</p>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">
            "The servant-leader is servant first." The foundational philosophy of this application springs from Greenleaf's transformative work and his vision that the social order should be servant-led.
          </p>
        </div>

        {/* Technology */}
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <i className="fa-solid fa-code text-2xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-black heading-font">Technology Stack</h3>
              <p className="text-sm text-slate-500 font-medium">Built with modern tools</p>
            </div>
          </div>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-center space-x-2">
              <span className="text-teal-600">•</span>
              <span><strong>React</strong> - UI Framework</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-teal-600">•</span>
              <span><strong>TypeScript</strong> - Type Safety</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-teal-600">•</span>
              <span><strong>Tailwind CSS</strong> - Styling</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-teal-600">•</span>
              <span><strong>Vite</strong> - Build Tool</span>
            </li>
          </ul>
        </div>

        {/* Design & Inspiration */}
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0">
              <i className="fa-solid fa-palette text-2xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-black heading-font">Design & UX</h3>
              <p className="text-sm text-slate-500 font-medium">Thoughtfully Crafted</p>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed">
            The design emphasizes clarity, accessibility, and a calming aesthetic that supports reflection and learning. Each color and element was chosen to reinforce the principles of servant leadership.
          </p>
        </div>

        {/* The Wisdom Stones */}
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
              <i className="fa-solid fa-gem text-2xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-black heading-font">The 10 Principles</h3>
              <p className="text-sm text-slate-500 font-medium">Greenleaf's Framework</p>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed mb-3">
            Listening, Empathy, Healing, Awareness, Persuasion, Conceptualization, Foresight, Stewardship, Commitment to Growth, and Building Community form the foundation of this application's assessments and principles.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-12 rounded-[3rem] border border-teal-200 shadow-lg">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-black heading-font text-slate-900">My Project Mission</h2>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            To provide leaders and individuals with practical tools to understand and apply Robert Greenleaf's servant leadership principles in their daily lives, fostering a culture of service, empathy, and sustainable leadership.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center space-y-4 pt-8 border-t border-slate-200">
        <p className="text-slate-600 font-medium">
          Built with purpose and passion for servant leadership
        </p>
        <p className="text-sm text-slate-500">
          © 2026 Servant Leadership Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Credits;
