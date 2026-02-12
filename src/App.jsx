import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, History, FileText, Target, Brain, Crown, Sparkles, Send, Crosshair, ShieldAlert, Activity, ChevronUp, ChevronDown, Lightbulb, Eye } from 'lucide-react';

// --- CONFIGURACIÓN GEMINI API (TU LLAVE INTEGRADA) ---
const apiKey = "AIzaSyBMgvIPqTqeVRzeQpN2HOTbkDlc317ClE8"; 

// --- ESTILOS GLOBALES (Luxury: Fondo Blanco + Tarjetas Black/Gold) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Outfit:wght@300;400;600;900&family=Lexend:wght@400;700&display=swap');
    
    body, html {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #000000;
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    .luxury-title { font-family: 'Cinzel', serif; font-weight: 900; }
    
    .text-gold {
      background: linear-gradient(to bottom, #D97706, #92400E);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .card-black {
      background: #0a0a0a;
      border: 1px solid rgba(217, 119, 6, 0.4);
      color: #ffffff;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-luxury { animation: fade-in 0.5s ease-out forwards; }
  `}</style>
);

// --- LOGO: G CON CORONA ---
const GoldenGLogo = ({ style }) => (
  <svg viewBox="0 0 100 120" fill="none" style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
    </defs>
    <path d="M25 35 L15 15 L38 28 L50 5 L62 28 L85 15 L75 35 Z" fill="url(#goldG)" />
    <path d="M50 45 C30 45 15 60 15 85 C15 110 30 125 50 125 C70 125 85 110 85 85 L85 75 L50 75 L50 88 L70 88 C70 100 65 108 50 108 C35 108 28 98 28 85 C28 72 35 62 50 62 C58 62 65 65 68 72 L82 58 C75 48 65 45 50 45 Z" fill="url(#goldG)" />
  </svg>
);

// --- RELOJ ---
const LuxuryClock = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  return (
    <div style={{ textAlign: 'right', color: '#000' }}>
      <div style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'monospace' }}>{timeStr}</div>
      <div style={{ fontSize: '0.6rem', color: '#D97706', letterSpacing: '0.2em', fontWeight: 'bold' }}>{dateStr}</div>
    </div>
  );
};

const Roadtosuccess = () => {
  const [activeTab, setActiveTab] = useState('tracker');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentDay] = useState(12);
  const [expandedHabit, setExpandedHabit] = useState(null);
  const [habitsStatus, setHabitsStatus] = useState({});
  const [mentorInput, setMentorInput] = useState('');
  const [mentorResponse, setMentorResponse] = useState('El silencio es poder. ¿Cuál es tu pregunta estratégica?');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [habitAiAdvice, setHabitAiAdvice] = useState({});
  const [quoteIndex, setQuoteIndex] = useState(0);

  const phases = {
    1: {
      title: "MODO MONJE I",
      subtitle: "Fundación y Limpieza",
      habits: [
        { 
          id: 'h1', icon: '🌊', name: 'Hidratación Cognitiva (3L)', type: 'positive', 
          details: { purpose: "IQ máximo y enfoque celular.", protocol: ["1L al despertar con sal rosa.", "2L distribuidos constantes."], rescue: ["Bebe agua con gas.", "Hack: Botella siempre a la vista."] }
        },
        { 
          id: 'h2', icon: '👁️', name: 'Calibración Mental (15m)', type: 'positive', 
          details: { purpose: "Dominio del sistema nervioso.", protocol: ["Respiración Box (4s inhalar, 4s retener, 4s exhalar, 4s vacío)."], rescue: ["Alternativa: Cuenta del 100 al 0.", "Hack: Justo antes de lo difícil."] }
        },
        { 
          id: 'h3', icon: '🛡️', name: 'Soberanía Dopaminérgica', type: 'negative', 
          details: { purpose: "Eliminar escapes fáciles. La weed roba tu ambición.", protocol: ["0% Marihuana.", "0% Porno.", "Cero scroll."], rescue: ["URGENCIA: Muerde un limón o mastica hielo.", "Bio-hack: Ducha helada 2 min.", "Alternativa: 50 flexiones al fallo."] }
        },
        { 
          id: 'h4', icon: '🧠', name: 'Reprogramación Diaria', type: 'positive', 
          details: { purpose: "Arquitecto de tu realidad.", protocol: ["Scripting de metas.", "Afirmaciones al espejo."], rescue: ["Escucha audiolibro de éxito.", "Hack: Mira tu meta imposible."] }
        },
      ]
    },
    2: {
      title: "MODO MONJE II",
      subtitle: "Ejecución de Alto Impacto",
      habits: [
        { id: 'h5', icon: '🚀', name: 'Deep Work (2h)', type: 'positive', details: { purpose: "Producción masiva.", protocol: ["Modo avión.", "Una sola tarea."], rescue: ["Alternativa: Pomodoro 50/10.", "Hack: Música Lo-Fi."] } },
        { id: 'h6', icon: '📈', name: 'Inteligencia Financiera', type: 'positive', details: { purpose: "Entender el dinero.", protocol: ["20 min estudio mercados.", "Registro gastos."], rescue: ["Alternativa: Podcast negocios.", "Hack: Invierte 5 min hoy."] } },
        { id: 'h7', icon: '🥗', name: 'Fuel Premium', type: 'positive', details: { purpose: "Glucemia estable.", protocol: ["Proteína alta.", "Cero carbohidratos simples."], rescue: ["Si fallas, ayuno mañana.", "Hack: Meal prep domingo."] } },
        { id: 'h8', icon: '⚔️', name: 'Consistencia Código', type: 'negative', details: { purpose: "Integridad total.", protocol: ["Mantener Fase I.", "Cero quejas."], rescue: ["Llama a un mentor.", "Hack: Mira tu racha de días."] } },
      ]
    },
    3: {
      title: "MODO MONJE III",
      subtitle: "Legado y Dominio",
      habits: [
        { id: 'h9', icon: '💎', name: 'Construcción Imperio', type: 'positive', details: { purpose: "Riqueza generacional.", protocol: ["Foco Tarea Roca.", "Delegación extrema."], rescue: ["Divide en 5 micro tareas.", "Hack: Lo más difícil primero."] } },
        { id: 'h10', icon: '🏋️', name: 'Físico Espartano', type: 'positive', details: { purpose: "Cuerpo de élite.", protocol: ["Entreno al fallo.", "HIIT 15 min."], rescue: ["300 flexiones en casa.", "Hack: Entrena en ayunas."] } },
        { id: 'h11', icon: '🤐', name: 'Ley del Silencio', type: 'negative', details: { purpose: "El león no anuncia la caza.", protocol: ["No hables de planes.", "Solo resultados."], rescue: ["Diario privado.", "Hack: Escucha 2x más."] } },
        { id: 'h12', icon: '👑', name: 'Estatus GOAT', type: 'negative', details: { purpose: "Vivir bajo el estándar.", protocol: ["Cero excusas.", "Excelencia innegociable."], rescue: ["Meditación Memento Mori.", "Hack: ¿Qué haría el mejor?"] } },
      ]
    }
  };

  const quotes = [
    { text: "No bajes la meta, aumenta el esfuerzo.", author: "Grant Cardone" },
    { text: "La disciplina es el puente entre metas y logros.", author: "Jim Rohn" },
    { text: "El dinero duerme, pero la ambición no.", author: "Wall Street" }
  ];

  useEffect(() => { setQuoteIndex(Math.floor(Math.random() * quotes.length)); }, []);

  const toggleHabit = (id) => setHabitsStatus(p => ({...p, [id]: !p[id]}));
  const progress = Math.round((Object.values(habitsStatus).filter(Boolean).length / (phases[currentPhase]?.habits.length || 1)) * 100);

  const callGemini = async (prompt) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Respuesta no disponible.";
    } catch (e) { return "Error de conexión estratégica."; }
  };

  const handleAiAction = async (type, val) => {
    setIsAiLoading(true);
    const prompt = type === 'mentor' ? `Eres un mentor millonario. Responde breve: ${val}` : `Estrategia única de una frase para: ${val}`;
    const res = await callGemini(prompt);
    if (type === 'mentor') setMentorResponse(res);
    if (type === 'habit') setHabitAiAdvice(p => ({...p, [val]: res}));
    setIsAiLoading(false);
    if (type === 'mentor') setMentorInput('');
  };

  const eyePattern = `data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' alignment-baseline='middle' opacity='0.08'%3E👁️%3C/text%3E%3C/svg%3E`;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '120px' }}>
      <GlobalStyles />
      <div style={{ backgroundImage: `url("${eyePattern}")`, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

      <header style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#000', border: '1.5px solid #D97706', padding: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
            <GoldenGLogo style={{ width: '100%', height: '100%' }} />
          </div>
          <div>
            <h1 className="luxury-title" style={{ fontSize: '1.6rem', margin: 0 }}>RTS</h1>
            <span style={{ color: '#D97706', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.3em' }}>EXECUTIVE</span>
          </div>
        </div>
        <LuxuryClock />
      </header>

      <main style={{ position: 'relative', zIndex: 10, padding: '20px' }}>
        
        {activeTab === 'tracker' && (
          <div className="animate-luxury">
            <div className="card-black" style={{ padding: '25px', borderRadius: '20px', marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
              <Crown size={80} color="#D97706" style={{ position: 'absolute', top: -10, right: -10, opacity: 0.15 }} />
              <Zap size={18} color="#FDE68A" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 300 }}>"{quotes[quoteIndex]?.text}"</p>
              <p style={{ color: '#D97706', fontSize: '0.8rem', fontWeight: '900', marginTop: '15px', textTransform: 'uppercase' }}>— {quotes[quoteIndex]?.author}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
              <div>
                <h2 className="luxury-title" style={{ fontSize: '1.3rem', margin: 0, color: '#000' }}>DÍA {currentDay}</h2>
                <p style={{ margin: 0, color: '#666', fontSize: '0.85rem', fontWeight: 600 }}>{phases[currentPhase].title}</p>
              </div>
              <span className="text-gold" style={{ fontSize: '2.5rem', fontWeight: 900 }}>{progress}%</span>
            </div>
            <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '35px', border: '1px solid #ddd' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #FDE68A, #D97706)', transition: 'width 0.8s ease' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {phases[currentPhase].habits.map(h => (
                <div key={h.id} className="card-black" style={{ borderRadius: '18px', padding: '20px', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={() => setExpandedHabit(expandedHabit === h.id ? null : h.id)} style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, cursor: 'pointer' }}>
                      <div style={{ fontSize: '1.8rem' }}>{h.icon}</div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '900', fontSize: '1rem' }}>{h.name}</p>
                        <span style={{ fontSize: '0.65rem', color: h.type === 'positive' ? '#4ade80' : '#f87171', fontWeight: 900 }}>{h.type === 'positive' ? 'ACTIVO' : 'RESTRICCIÓN'}</span>
                      </div>
                    </div>
                    <button onClick={() => toggleHabit(h.id)} style={{ background: 'none', border: 'none', color: habitsStatus[h.id] ? '#D97706' : '#333' }}>
                      <CheckCircle2 size={30} fill={habitsStatus[h.id] ? '#D97706' : 'transparent'} color={habitsStatus[h.id] ? '#000' : '#333'} />
                    </button>
                  </div>
                  {expandedHabit === h.id && h.details && (
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                       <div style={{ marginBottom: '15px' }}>
                          <p style={{ fontSize: '0.85rem', color: '#ccc', fontWeight: 300 }}><b style={{color: '#D97706'}}>PROPÓSITO:</b> {h.details.purpose}</p>
                       </div>
                       <div style={{ marginBottom: '15px' }}>
                          <b style={{color: '#D97706', fontSize: '0.7rem'}}>PROTOCOLO:</b>
                          {h.details.protocol.map((p, i) => <div key={i} style={{ fontSize: '0.85rem', color: '#aaa' }}>• {p}</div>)}
                       </div>
                       <div style={{ marginBottom: '15px' }}>
                          <b style={{color: '#D97706', fontSize: '0.7rem'}}>RESCATE:</b>
                          {h.details.rescue.map((r, i) => <div key={i} style={{ fontSize: '0.85rem', color: '#fff', fontStyle: 'italic' }}>• {r}</div>)}
                       </div>
                       <button onClick={() => handleAiAction('habit', h.name)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(217, 119, 6, 0.4)', borderRadius: '10px', color: '#D97706', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase' }}>
                          {habitAiAdvice[h.name] ? habitAiAdvice[h.name] : 'SOLICITAR TÁCTICA IA'}
                       </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-luxury">
            <h3 className="luxury-title" style={{ fontSize: '1.4rem', marginBottom: '25px' }}>REGISTRO DIARIO</h3>
            {[11, 10, 9, 8, 7].map(d => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px', backgroundColor: '#000', border: '1.5px solid #222', borderRadius: '12px', marginBottom: '12px' }}>
                <span style={{ fontWeight: '900', color: '#fff' }}>Día {d}</span>
                <span style={{ color: '#D97706', fontWeight: 900 }}>100%</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="animate-luxury">
            <h3 className="luxury-title" style={{ fontSize: '1.4rem', marginBottom: '25px' }}>HOJA DE RUTA</h3>
            {[1, 2, 3].map(p => (
              <div key={p} onClick={() => { setCurrentPhase(p); setActiveTab('tracker'); }} style={{ padding: '25px', borderRadius: '15px', border: currentPhase === p ? '2px solid #D97706' : '1.5px solid #ddd', background: currentPhase === p ? '#000' : '#fff', marginBottom: '15px', cursor: 'pointer', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="luxury-title" style={{ margin: 0, color: currentPhase === p ? '#fff' : '#000' }}>MODO MONJE {p}</h4>
                  {currentPhase === p && <Activity size={20} color="#D97706" />}
                </div>
                <p style={{ fontSize: '0.85rem', color: currentPhase === p ? '#94a3b8' : '#666', marginTop: '8px' }}>{phases[p].subtitle}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'mentor' && (
          <div className="animate-luxury">
            <h3 className="luxury-title" style={{ fontSize: '1.4rem', marginBottom: '25px' }}>ORÁCULO GOAT</h3>
            <div className="card-black" style={{ minHeight: '150px', borderRadius: '20px', padding: '30px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 300 }}>{isAiLoading ? 'Consultando...' : `"${mentorResponse}"`}</p>
            </div>
            <div style={{ position: 'relative' }}>
              <textarea value={mentorInput} onChange={(e) => setMentorInput(e.target.value)} placeholder="Duda estratégica..." style={{ width: '100%', background: '#f9f9f9', border: '2px solid #eee', borderRadius: '15px', padding: '20px', color: '#000', minHeight: '100px', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
              <button onClick={() => handleAiAction('mentor', mentorInput)} style={{ position: 'absolute', bottom: '15px', right: '15px', background: '#000', border: 'none', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={22} color="#D97706" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="animate-luxury">
             <h3 className="luxury-title" style={{ fontSize: '1.4rem', marginBottom: '25px' }}>INFORMES MES</h3>
             <div className="card-black" style={{ padding: '40px', textAlign: 'center', borderRadius: '15px' }}>
                <FileText size={40} color="#333" style={{ margin: '0 auto 15px' }} />
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Informe de Febrero disponible el 1 de Marzo.</p>
             </div>
          </div>
        )}

      </main>

      <nav style={{ position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)', width: '92%', maxWidth: '450px', height: '75px', background: 'rgba(0,0,0,0.95)', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 100 }}>
        <button onClick={() => setActiveTab('history')} style={{ background: 'none', border: 'none', color: activeTab === 'history' ? '#D97706' : '#555' }}><History size={24} /></button>
        <button onClick={() => setActiveTab('plan')} style={{ background: 'none', border: 'none', color: activeTab === 'plan' ? '#D97706' : '#555' }}><Brain size={24} /></button>
        <button onClick={() => setActiveTab('tracker')} style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'linear-gradient(135deg, #FDE68A, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-25px)', border: '4px solid #fff' }}>
          <Target size={32} color="#000" strokeWidth={2.5} />
        </button>
        <button onClick={() => setActiveTab('mentor')} style={{ background: 'none', border: 'none', color: activeTab === 'mentor' ? '#D97706' : '#555' }}><Sparkles size={24} /></button>
        <button onClick={() => setActiveTab('reports')} style={{ background: 'none', border: 'none', color: activeTab === 'reports' ? '#D97706' : '#555' }}><FileText size={24} /></button>
      </nav>
    </div>
  );
};

export default Roadtosuccess;
