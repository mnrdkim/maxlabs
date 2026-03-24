import React, { useState } from 'react';
import { Menu, X, Cpu, Code, Shield, Download, ExternalLink, Mail } from 'lucide-react';

// --- DATA SOURCE (Easy to update) ---
const PROJECTS = [
  { id: 1, title: "Python Workflow Automator", category: "Automation", desc: "AI-driven email filtering & CRM sync.", tech: ["Python", "OpenAI"] },
  { id: 2, title: "SaaS Analytics Portal", category: "Software", desc: "Real-time dashboard for tech stack monitoring.", tech: ["React", "Node.js"] },
  { id: 3, title: "Security Audit Tool", category: "Consultation", desc: "Automated vulnerability scanner for web apps.", tech: ["Python", "Shell"] },
  { id: 4, title: "Custom CRM Integration", category: "Automation", desc: "Connecting legacy systems to modern APIs.", tech: ["Python", "SQL"] },
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* --- HEADER --- */}
      <nav className="fixed w-full bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tighter text-blue-400">MAX_LABS</h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            <button className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-500 transition">
              <Download size={16} /> Resume
            </button>
          </div>

          {/* Burger Icon */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 p-4 space-y-4 border-b border-slate-700">
            <a href="#about" className="block" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" className="block" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <button className="w-full bg-blue-600 py-2 rounded">Download Resume</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block p-2 px-4 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 border border-blue-500/20">
          DIGITAL ARCHITECT & AUTOMATION EXPERT
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Intelligent</span> Environments.
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          I specialize in Python-driven automation, senior-level tech stack consultation, and building high-performance SaaS platforms.
        </p>
      </header>

      {/* --- PROJECTS WITH FILTERS --- */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-20 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">Portfolio</h3>
            <p className="text-slate-400 text-sm">Case studies in automation and architecture.</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 overflow-x-auto">
            {['All', 'Automation', 'Software', 'Consultation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition ${filter === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                  {project.category === 'Automation' ? <Cpu size={24}/> : project.category === 'Software' ? <Code size={24}/> : <Shield size={24}/>}
                </div>
                <ExternalLink size={18} className="text-slate-500 group-hover:text-blue-400 cursor-pointer" />
              </div>
              <h4 className="text-xl font-bold mb-2">{project.title}</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.desc}</p>
              <div className="flex gap-2">
                {project.tech.map(t => <span key={t} className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300 uppercase tracking-widest">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-slate-950 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold">Interested in a Consultation?</h4>
            <p className="text-slate-500 text-sm">Let’s optimize your workflow and secure your tech stack.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition">
              <Mail size={18}/> Contact@MAXLabs.com
            </button>
          </div>
          <div className="text-xs text-slate-600">
            © 2026 MAX Labs. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;