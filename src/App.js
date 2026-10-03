import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import logo from './logo.png'; 
import { 
  Cpu, Code, Shield, Mail, Terminal, Layers, 
  Share2, ChevronRight, CheckCircle2, X, Send, User, 
  MessageSquare, Menu, Loader2 
} from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";

// --- COMPONENT: TERMINAL TYPING ANIMATION ---
const TerminalWindow = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef(null);
  
  const logs = [
    "> INITIALIZING_MAX_LABS_CORE...",
    "> LOADING_PYTHON_ENVIRONMENT... [OK]",
    "> SYNCING_WORKFLOW_ENGINES...",
    "> SCANNING_PORTFOLIO_DATA...",
    "> DEPLOYING_EXPERTISE_MODULES...",
    "> STATUS: SYSTEMS_ACTIVE_AND_SCALING."
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let currentLogIndex = 0;
    let currentCharIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        if (currentCharIndex < logs[currentLogIndex].length) {
          setText(prev => prev + logs[currentLogIndex][currentCharIndex]);
          currentCharIndex++;
        } else {
          setText(prev => prev + '\n');
          currentLogIndex++;
          currentCharIndex = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={terminalRef} className="w-full max-w-2xl mx-auto mb-16 font-mono text-[10px] md:text-xs bg-black/60 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="text-slate-500 uppercase tracking-widest text-[9px] font-black ml-2">sys_logs.sh</span>
      </div>
      <pre className="p-6 text-blue-400 leading-relaxed h-40 overflow-y-auto whitespace-pre-wrap font-mono">
        {text}
        <span className="animate-pulse"> _</span>
      </pre>
    </div>
  );
};

// --- COMPONENT: PROCESS STEP ---
const ProcessStep = ({ number, title, desc, icon: Icon, active }) => (
  <div className={`relative flex items-start gap-8 md:gap-16 transition-all duration-700 ${active ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${active ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-slate-900 border-slate-800'}`}>
        <Icon size={20} className={active ? 'text-white' : 'text-slate-600'} />
      </div>
      <span className="absolute -top-2 -right-2 bg-slate-800 text-[8px] font-black px-1.5 py-0.5 rounded border border-slate-700 text-blue-400 uppercase tracking-tighter">0{number}</span>
    </div>
    <div className="flex-1 pb-20">
      <h3 className={`text-2xl font-black uppercase italic tracking-tighter mb-2 transition-colors ${active ? 'text-white' : 'text-slate-700'}`}>
        {title}
      </h3>
      <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

const App = () => {
  const form = useRef();
  const recaptchaRef = useRef(null);
  const sectionRef = useRef(null);
  
  // 1. CONFIGURATION
  const SERVICE_ID = "service_q98ibbo";   
  const TEMPLATE_ID = "service_q98ibbo"; 
  const PUBLIC_KEY = "2fJ_V2o1SdIzq2LLU";

  // 2. STATE
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(''); 
  const [filter, setFilter] = useState('All');
  const [activeStep, setActiveStep] = useState(0);

  const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const [phoneError, setPhoneError] = useState("");

const handlePhoneChange = (e) => {
  const value = e.target.value.replace(/\D/g, ""); // Remove non-digits for the check
  if (value.length > 0 && value.length !== 11) {
    setPhoneError("Expected 11 digits for PH mobile.");
  } else {
    setPhoneError("");
  }
};

  // Scroll listener for Navbar and Workflow Progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Basic logic to update activeStep based on scroll
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPercent = Math.min(Math.max((window.innerHeight - rect.top) / rect.height, 0), 1);
        setActiveStep(Math.floor(scrollPercent * 4));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. HANDLERS
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    recaptchaRef.current.execute(); // Trigger Invisible reCAPTCHA
  };

  const onResolved = (token) => {
  // Check validation before sending
  const phoneValue = form.current.user_phone.value.replace(/\D/g, "");
  if (phoneValue.length > 0 && phoneValue.length !== 11) {
    setPhoneError("Please fix phone number before sending.");
    setIsSending(false);
    return;
  }

    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_phone: form.current.user_phone.value || "Not Provided", // Capture Phone
      availability: form.current.availability.value || "Not Specified",
      message: form.current.message.value,
      'g-recaptcha-response': token,
      date: new Date().toLocaleString()
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      // ... rest of code

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      // ... rest of your code

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setIsSending(false);
        form.current.reset();
        setTimeout(() => { 
          setIsModalOpen(false); 
          setStatus(''); 
        }, 3000);
      })
      .catch((error) => {
        console.error("UPLINK_FAILURE:", error);
        setStatus('error');
        setIsSending(false);
      });
  };

  const PROJECTS = [
    { id: 1, title: "Workflow Automator", cat: "Automation", tech: ["Python", "AI"], icon: <Cpu className="text-blue-500" />, problem: "Manual data entry taking 20+ hours weekly.", result: "95% reduction in lead processing time." },
    { id: 2, title: "Enterprise SaaS", cat: "Software", tech: ["React", "Node"], icon: <Code className="text-cyan-500" />, problem: "Fragmented legacy systems causing data silos.", result: "Unified dashboard with 100% data sync." },
    { id: 3, title: "Fintech Ledger", cat: "Software", tech: ["Python", "Postgres"], icon: <Layers className="text-emerald-500" />, problem: "Inaccurate manual transaction logging.", result: "Zero-error automated reconciliation engine." },
    { id: 4, title: "Custom CRM Engine", cat: "Automation", tech: ["API", "Automate"], icon: <User className="text-orange-500" />, problem: "Sales team losing 30% of leads in follow-up.", result: "Automated nurturing increased closing by 15%." },
    { id: 5, title: "Security Audit", cat: "Consultation", tech: ["AWS", "Snyk"], icon: <Shield className="text-indigo-500" />, problem: "Vulnerable cloud infrastructure at risk of leak.", result: "Hardened 256-bit encryption & SOC2 compliance." },
    { id: 6, title: "E-Commerce Pipeline", cat: "Software", tech: ["Stripe", "Next.js"], icon: <Send className="text-pink-500" />, problem: "Checkout friction causing 60% cart abandonment.", result: "Streamlined API flow boosted revenue by 22%." }
  ];

  const steps = [
    { title: "System Audit", desc: "We deep-dive into your existing workflows to identify bottlenecks and manual redundancies.", icon: Terminal },
    { title: "Architectural Design", desc: "Crafting a scalable blueprint using cloud-native SaaS structures.", icon: Layers },
    { title: "Deployment & Sync", desc: "Pushing live code and syncing your CRM/Database via custom API engines.", icon: Code },
    { title: "Autonomous Scaling", desc: "Handing over a self-optimizing engine that grows with your business output.", icon: Cpu }
  ];

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <div className="bg-[#0b0f1a] text-slate-200 min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0b0f1a]/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
            
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                <h2 className="text-2xl font-black text-white uppercase italic">Thank you! We'll get in touch.</h2>
                <p className="text-slate-400 text-xs mt-2 font-mono">Expect a briefing from our team within 12-24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Initialize Contact</h2>
                <form ref={form} className="space-y-6 mt-8" onSubmit={sendEmail}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Name</label>
                    <input name="user_name" required type="text" placeholder="Your Name" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" />
                  </div>
                  
                  <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12}/> Email
                  </label>
                  <input name="user_email" required type="email" placeholder="Email@company.com" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                    <Share2 size={12}/> Contact No.
                  </label>
                  <input 
                    name="user_phone" 
                    type="tel" 
                    placeholder="09XX XXX XXXX" 
                    onChange={handlePhoneChange} // <--- Added this
                    className={`w-full bg-slate-800/50 border ${phoneError ? 'border-red-500/50' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all`} 
                  />
                  
                  {/* Validation Message */}
                  <div className="h-2"> {/* Fixed height prevents layout jump */}
                    {phoneError && (
                      <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter animate-pulse">
                        ! {phoneError}
                      </p>
                    )}
                  </div>
                </div>

                {/* NEW: Optional Availability Date */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal size={12}/> Available Date
                      </div>
                      <span className="text-[8px] text-slate-600 italic">(Optional)</span>
                    </label>
                    <input 
                      name="availability" 
                      type="date" 
                      min={getTodayDate()} // <--- Prevents back-dating
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-blue-500 outline-none transition-all" 
                      style={{ colorScheme: 'dark' }} 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><MessageSquare size={12}/> Message</label>
                    <textarea name="message" required rows="3" placeholder="How can we help?" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none resize-none"></textarea>
                  </div>

                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="6LfBq5osAAAAAKke1PlOC1lXAqJZbmtYcT1cyRok" 
                    onChange={onResolved}
                    theme="dark"
                  />
                  <button 
                    disabled={isSending} 
                    className={`w-full ${isSending ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'} text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20`}
                  >
                    {isSending ? <Loader2 className="animate-spin" /> : 'SEND REQUEST'} {!isSending && <Send size={18} />}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-[10px] font-mono text-center">Connection Error: Retrying uplink...</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-xl py-4 border-b border-slate-800' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="MAX Labs" className="w-full h-full object-contain rounded-lg relative z-10" onError={(e) => { e.target.style.display = 'none'; }} />
              <Terminal size={24} className="absolute text-blue-500 z-0" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">MAX Labs</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Workflow', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-400 transition-colors">{item}</a>
            ))}
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-black text-[10px] tracking-widest hover:bg-blue-500 transition-all">CONNECT</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen py-10 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
          <div className="flex flex-col items-center gap-8 font-black text-[10px] tracking-[0.3em]">
            {['Services', 'Workflow', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-blue-500 transition-colors">{item.toUpperCase()}</a>
            ))}
            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="bg-blue-600 text-white px-10 py-3 rounded-full">CONNECT</button>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="relative z-10 max-w-5xl text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase mb-8">Digital Optimization Engine</span>
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none mb-10 tracking-tighter uppercase italic">Scale <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">Fast.</span></h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">We deliver intelligent automation solutions that redefine how modern enterprises handle data and processes.</p>
          <button onClick={() => setIsModalOpen(true)} className="group flex items-center gap-3 bg-white text-slate-900 px-10 py-4 mx-auto rounded-2xl font-black text-sm transition-all hover:bg-blue-600 hover:text-white shadow-2xl">Partner With Us<ChevronRight size={18} /></button>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[{ title: "Automation", desc: "Custom software engines for CRM and workflow syncing.", icon: <Cpu />, details: ["API Integration", "Legacy Migration", "Error Mitigation"] },
            { title: "Software Solution", desc: "High-performance software and system functionalities.", icon: <Layers />, details: ["Scalable Architecture", "Cloud Deployment", "UX/UI Design and Implementation"] },
            { title: "Digital Consultation", desc: "Tech audits and cost-saving architecture migrations.", icon: <Shield />, details: ["Security & Vulnerability Audits", "Stack Optimization", "ROI Analysis"] }
          ].map((s, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">{s.icon}</div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">{s.title}</h3>
              <p className="text-slate-400 text-sm mb-8">{s.desc}</p>
              <div className="space-y-3 border-t border-slate-800 pt-6">
                {s.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                    <CheckCircle2 size={12} className="text-cyan-400" /> <span className="text-slate-300 group-hover:text-white transition-colors">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- WORKFLOW --- */}
      <section id="workflow" ref={sectionRef} className="py-32 max-w-4xl mx-auto px-6 relative">
        <div className="mb-24">
          <span className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase">The Sequence</span>
          <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mt-4">Operational Workflows</h2>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 w-[2px] h-full bg-slate-800 -translate-x-1/2 overflow-hidden">
            <div className="w-full bg-gradient-to-b from-blue-600 to-cyan-400 transition-all duration-300" style={{ height: `${(activeStep / 4) * 100}%` }} />
          </div>
          {steps.map((step, i) => (
            <ProcessStep key={i} number={i + 1} title={step.title} desc={step.desc} icon={step.icon} active={activeStep >= i + 1} />
          ))}
        </div>
      </section>

      {/* --- PORTFOLIO --- */}
      <section id="projects" className="py-32 max-w-7xl mx-auto px-6">
        <TerminalWindow />
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">The Tech Engine</h2>
          <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700">
            {['All', 'Automation', 'Software'].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(p => (
            <div key={p.id} className="group relative bg-slate-900/80 border border-slate-800 rounded-[3rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 h-[450px]">
              <div className="absolute inset-0 p-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                <div className="h-32 flex items-center justify-center mb-8">
                  <div className="transform transition-all duration-700">
                    {React.cloneElement(p.icon, { size: 64, strokeWidth: 1 })}
                  </div>
                </div>
                <h4 className="text-2xl font-black text-white uppercase italic text-center leading-tight mb-4">{p.title}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-slate-800 rounded-lg text-[9px] font-black text-slate-400 border border-slate-700/50 uppercase tracking-widest">{t}</span>
                  ))}
                </div>
                <div className="mt-8 text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">
                  Hover for metrics
                </div>
              </div>

              <div className="absolute inset-0 p-10 bg-gradient-to-br from-blue-900/20 to-slate-900 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <span className="text-blue-500 font-black text-[9px] tracking-widest uppercase block mb-2">The Problem</span>
                    <p className="text-slate-300 text-sm font-light leading-relaxed italic">"{p.problem}"</p>
                  </div>
                  <div className="pt-6 border-t border-slate-800">
                    <span className="text-cyan-400 font-black text-[9px] tracking-widest uppercase block mb-2">The Result</span>
                    <p className="text-white text-lg font-black uppercase italic tracking-tighter leading-tight">{p.result}</p>
                  </div>
                  <button onClick={() => setIsModalOpen(true)} className="mt-4 flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-blue-400 transition-colors">
                    Request Build <ChevronRight size={14}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-24 bg-black border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-4 group">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <img src={logo} alt="MAX Labs" className="w-full h-full object-contain rounded-lg relative z-10" onError={(e) => { e.target.style.display = 'none'; }} />
                  <Terminal size={24} className="absolute text-blue-500 z-0" />
                </div>
                <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter">MAX Labs</h3>
              </div>
              <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-widest">Engineered for speed. <br /> Built for scale.</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Availability</h4>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-slate-300 text-[10px] font-mono uppercase tracking-widest">Status: <span className="text-green-500">Open for Projects</span></p>
              </div>
              <p className="text-slate-500 text-[9px] mt-3 font-mono uppercase tracking-tighter">Avg Response: 12 Hours</p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em]">Connect Now</h4>
              <div className="flex gap-8">
                <a href="https://facebook.com/maxlabsinnovation" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 text-slate-500 transition-all font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                  <Share2 size={14}/> Facebook
                </a>
                <a href="mailto:maxlabs.systems@gmail.com" className="hover:text-blue-400 text-slate-500 transition-all font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                  <Mail size={14}/> EMAIL
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 text-center">
            <p className="text-slate-800 text-[10px] font-mono tracking-[0.5em] uppercase">© 2026 MAX Labs — Systems Architecture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;