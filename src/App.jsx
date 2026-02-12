import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, ChevronUp, ChevronDown, Lightbulb, History, FileText, Target, Brain, Crown, X, Sparkles, MessageSquare, Send, Activity, ShieldAlert, Crosshair, Anchor, Lock } from 'lucide-react';

// --- IMPORTANTE: ELIMINADA LA DEPENDENCIA DE GOOGLE PARA EVITAR ERRORES EN VERCEL ---
// Usaremos fetch directo.
const apiKey = ""; // Pon tu API Key aquí si quieres que funcione la IA, si no, déjalo vacío.

// --- LOGO BADGE "GOAT LUXURY" ---
const GoatBadgeLogo = ({ className, style }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="badgeGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="98" fill="url(#badgeGold)" stroke="black" strokeWidth="3" />
    <circle cx="100" cy="100" r="75" fill="none" stroke="black" strokeWidth="2" />
    <path id="curveTop" d="M 40,100 A 60,60 0 0,1 160,100" fill="none" />
    <path id="curveBottom" d="M 25,100 A 75,75 0 0,0 175,100" fill="none" />
    <text fontSize="16" fontWeight="900" textAnchor="middle" fill="black" letterSpacing="1" style={{ fontFamily: 'sans-serif' }}>
      <textPath href="#curveTop" startOffset="50%" side="left">EST. 2025</textPath>
    </text>
    <text fontSize="14" fontWeight="900" textAnchor="middle" fill="black" letterSpacing="1" style={{ fontFamily: 'sans-serif' }}>
      <textPath href="#curveBottom" startOffset="50%" side="right">ROAD TO SUCCESS CO.</textPath>
    </text>
    <g transform="translate(100, 105) scale(0.8)">
       <path d="M-40 -50 C-60 -40 -60 -10 -40 0 C-35 -15 -30 -30 -20 -40 Z" fill="#D97706" stroke="black" strokeWidth="1.5" />
       <path d="M40 -50 C60 -40 60 -10 40 0 C35 -15 30 -30 20 -40 Z" fill="#D97706" stroke="black" strokeWidth="1.5" />
       <path d="M-50 -10 L-65 -5 L-50 10 Z" fill="#FDE68A" stroke="black" strokeWidth="1" />
       <path d="M50 -10 L65 -5 L50 10 Z" fill="#FDE68A" stroke="black" strokeWidth="1" />
       <path d="M-30 -20 L-25 40 L0 55 L25 40 L30 -20 Z" fill="#FDE68A" stroke="black" strokeWidth="1.5" />
       <path d="M-10 40 L0 45 L10 40" fill="none" stroke="black" strokeWidth="1" />
       <path d="M-5 35 L0 38 L5 35" fill="black" />
       <circle cx="-15" cy="0" r="3" fill="black" />
       <circle cx="15" cy="0" r="3" fill="black" />
       <path d="M-15 50 L0 70 L15 50" fill="none" stroke="black" strokeWidth="1" />
    </g>
  </svg>
);

// --- COMPONENTE RELOJ EN TIEMPO REAL ---
const LuxuryClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase().replace('.', '');
  const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-end" style={{color: 'white'}}>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black tracking-tighter" style={{ fontFamily: 'monospace', fontSize: '1.8rem' }}>{timeStr}</span>
        <span className="text-sm font-bold w-5" style={{color: '#EAB308'}}>{seconds}</span>
      </div>
      <div className="text-[10px] font-bold tracking-[0.2em] border-t pt-1 mt-1 w-full text-right" style={{borderColor: 'rgba(146, 64, 14, 0.3)', color: '#94a3b8'}}>
        {dateStr}
      </div>
    </div>
  );
};

const Roadtosuccess = () => {
  // --- ESTADO PRINCIPAL ---
  const [activeTab, setActiveTab] = useState('tracker');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentDay, setCurrentDay] = useState(12); // FECHA CORREGIDA A HOY (12)
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMonthReportModal, setShowMonthReportModal] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [expandedHabit, setExpandedHabit] = useState(null);

  // --- ESTADO IA ---
  const [mentorInput, setMentorInput] = useState('');
  const [mentorResponse, setMentorResponse] = useState('El silencio es poder. Pregunta y recibirás claridad.');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [habitAiAdvice, setHabitAiAdvice] = useState({});

  // --- DATOS: HISTORIAL DEL MES ACTUAL (SIMULADO HASTA EL DÍA 12) ---
  const [currentMonthHistory, setCurrentMonthHistory] = useState([
    { day: 1, percentage: 100, status: 'perfect' },
    { day: 2, percentage: 80, status: 'good' },
    { day: 3, percentage: 100, status: 'perfect' },
    { day: 4, percentage: 60, status: 'bad' },
    { day: 5, percentage: 100, status: 'perfect' },
    { day: 6, percentage: 100, status: 'perfect' },
    { day: 7, percentage: 90, status: 'good' },
    { day: 8, percentage: 100, status: 'perfect' },
    { day: 9, percentage: 80, status: 'good' },
    { day: 10, percentage: 100, status: 'perfect' },
    { day: 11, percentage: 100, status: 'perfect' },
    { day: 12, percentage: 20, status: 'bad' },
  ]);

  // --- DATOS: INFORMES ---
  const [reports, setReports] = useState([
    { id: 1, month: 'Enero', year: 2026, average: 91, rank: 'Magnate', bestStreak: 15 },
  ]);

  // --- DATOS DE LAS FASES ---
  const phases = {
    1: {
      title: "Fase I: Fundación",
      subtitle: "Limpieza & Claridad",
      duration: "Mes 1",
      color: "linear-gradient(to right, #facc15, #ca8a04)", // Estilo inline fallback
      tailwindColor: "from-yellow-200 via-yellow-400 to-yellow-600",
      description: "El éxito requiere una mente despejada. Elimina el ruido.",
      habits: [
        { 
            id: 'h1', icon: '🌊', name: 'Hidratación Cognitiva (3L)', type: 'positive', 
            details: {
                purpose: "La deshidratación del 2% reduce tu coeficiente intelectual y enfoque. Tu cerebro es 73% agua.",
                protocol: ["Mañana (7 AM): 1L agua + sal.", "Tarde: 2L distribuidos.", "Noche: Reducir ingesta."],
                rescue: "Si te da ansiedad, bebe agua con gas y limón."
            }
        },
        { 
            id: 'h2', icon: '👁️', name: 'Calibración Mental (15m)', type: 'positive', 
            details: {
                purpose: "Reduce el cortisol y aumenta la materia gris en el córtex prefrontal.",
                protocol: ["Técnica: Box Breathing.", "Postura: Columna recta.", "Foco: Observa sin juzgar."],
                rescue: "Haz una 'Caminata Zen' sintiendo tus pasos."
            }
        },
        { 
            id: 'h3', icon: '🛡️', name: 'Soberanía Dopaminérgica', type: 'negative', 
            details: {
                purpose: "Resetea tus receptores de placer. Sin esto, el trabajo duro te parecerá imposible.",
                protocol: ["Cero Marihuana.", "Cero Porno.", "Cero Scroll Infinito."],
                rescue: "Ducha helada o 50 Burpees inmediatos."
            }
        },
        { 
            id: 'h4', icon: '🧠', name: 'Reprogramación Subconsciente', type: 'positive', 
            details: {
                purpose: "Tu realidad externa siempre alcanzará a tu realidad interna.",
                protocol: ["Afirmación Espejo.", "Scripting de metas.", "Lectura estoica."],
                rescue: "Audiolibro a velocidad 2x."
            }
        },
      ]
    },
    2: {
        title: "Fase II: Construcción",
        subtitle: "Disciplina Ejecutiva",
        duration: "Mes 2",
        color: "linear-gradient(to right, #fcd34d, #d97706)",
        tailwindColor: "from-amber-300 via-amber-500 to-amber-700",
        description: "Construye los activos que pagarán tu libertad.",
        habits: [
          { id: 'h1', icon: '🚀', name: 'Bloque de Poder', type: 'positive', details: { purpose: "Deep Work.", protocol: ["Sin teléfono."], rescue: "Pomodoro." } },
          { id: 'h2', icon: '📈', name: 'Inteligencia Financiera', type: 'positive', details: { purpose: "Conoce el juego.", protocol: ["Estudio diario."], rescue: "Resúmenes." } },
          { id: 'h3', icon: '🥗', name: 'Combustible Alto Octanaje', type: 'positive', details: { purpose: "Cero basura.", protocol: ["Proteína."], rescue: "Snacks sanos." } },
          { id: 'h4', icon: '📵', name: 'Ayuno Distracciones', type: 'negative', details: { purpose: "Protege tu atención.", protocol: ["Bloqueo apps."], rescue: "Modo avión." } },
          { id: 'h5', icon: '⚔️', name: 'Mantenimiento Voto', type: 'negative', details: { purpose: "Consistencia.", protocol: ["Cero Vicios."], rescue: "Visualiza el fracaso." } },
        ]
      },
      3: {
        title: "Fase III: Legado",
        subtitle: "Nivel GOAT",
        duration: "Mes 3",
        color: "linear-gradient(to right, #facc15, #ea580c)",
        tailwindColor: "from-yellow-400 via-orange-500 to-yellow-900",
        description: "Dominio total. Resultados que hablan por sí solos.",
        habits: [
          { id: 'h1', icon: '💎', name: 'Imperio (4h)', type: 'positive', details: { purpose: "Mover la aguja.", protocol: ["La Roca."], rescue: "Divide y vence." } },
          { id: 'h2', icon: '🏋️', name: 'Físico Espartano', type: 'positive', details: { purpose: "Cuerpo fuerte.", protocol: ["Intensidad."], rescue: "300 Flexiones." } },
          { id: 'h3', icon: '👁️', name: 'Visión Maestra', type: 'positive', details: { purpose: "Diseño cuántico.", protocol: ["Scripting."], rescue: "Audio metas." } },
          { id: 'h4', icon: '🤐', name: 'Monje Silencioso', type: 'negative', details: { purpose: "No hables, actúa.", protocol: ["Silencio."], rescue: "Escribir." } },
          { id: 'h5', icon: '👑', name: 'Estándar GOAT', type: 'negative', details: { purpose: "Excelencia.", protocol: ["Cero excusas."], rescue: "Espejo." } },
        ]
      }
  };

  const quotes = [
    { text: "El éxito no se persigue, se atrae por la persona en la que te conviertes.", author: "Jim Rohn" },
    { text: "No bajes la meta, aumenta el esfuerzo.", author: "Grant Cardone" },
    { text: "El dinero duerme, pero la ambición no.", author: "Wall Street" }
  ];

  const [habitsStatus, setHabitsStatus] = useState({});

  useEffect(() => {
    const initialStatus = {};
    phases[currentPhase].habits.forEach(h => initialStatus[h.id] = false);
    setHabitsStatus(initialStatus);
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  }, [currentPhase, currentDay]);

  const toggleHabit = (id) => {
    const newStatus = { ...habitsStatus, [id]: !habitsStatus[id] };
    setHabitsStatus(newStatus);
    const allDone = phases[currentPhase].habits.every(h => newStatus[h.id]);
    if (allDone) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const calculateProgress = () => {
    const total = phases[currentPhase].habits.length;
    const completed = Object.values(habitsStatus).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const handleEndMonth = () => {
    // Lógica simulada
    setShowMonthReportModal(true);
  };

  // --- LÓGICA DE IA (FETCH DIRECTO SIN LIBRERÍA) ---
  const callGemini = async (prompt) => {
    if (!apiKey) return "Activa tu API Key en el código para recibir sabiduría.";
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error de conexión.";
    } catch (error) {
      return "El sistema está desconectado. Confía en tu instinto.";
    }
  };

  const askMentor = async () => {
    if (!mentorInput.trim()) return;
    setIsAiLoading(true);
    const answer = await callGemini(`Eres un mentor estoico y millonario. Responde brevemente: ${mentorInput}`);
    setMentorResponse(answer);
    setIsAiLoading(false);
    setMentorInput('');
  };

  const getHabitStrategy = async (habitName) => {
    setHabitAiAdvice(prev => ({...prev, [habitName]: 'Calculando...'}));
    const advice = await callGemini(`Dame una micro-estrategia de una frase para cumplir: ${habitName}`);
    setHabitAiAdvice(prev => ({...prev, [habitName]: advice}));
  };

  const eyePattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EAB308' fill-opacity='0.05'%3E%3Cpath d='M30 10c11 0 20 9 20 20s-9 20-20 20S10 41 10 30s9-20 20-20zm0 10a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  // Estilos base para cuando Tailwind no carga
  const baseStyle = {
      backgroundColor: 'black',
      color: '#e2e8f0',
      minHeight: '100vh',
      fontFamily: "'Lexend', sans-serif",
      position: 'relative'
  };

  return (
    <div style={baseStyle} className="bg-black text-slate-200 font-sans min-h-screen selection:bg-yellow-500 selection:text-black pb-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;800;900&display=swap');
        body { margin: 0; background-color: black; font-family: 'Lexend', sans-serif; }
        .text-gold-gradient {
          background: linear-gradient(to bottom, #FDE68A, #D97706, #92400E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #D97706; /* Fallback */
        }
        .border-gold { border: 1px solid rgba(217, 119, 6, 0.3); }
        /* Reset básico por si Tailwind falla */
        button { cursor: pointer; border: none; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .p-6 { padding: 1.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .w-full { width: 100%; }
        .mb-4 { margin-bottom: 1rem; }
      `}</style>

      {/* FONDO PATRÓN */}
      <div style={{ backgroundImage: `url("${eyePattern}")`, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }}></div>

      {/* HEADER */}
      <header className="relative z-10 px-6 pt-6 pb-6 flex items-center justify-between" style={{borderBottom: '1px solid rgba(146, 64, 14, 0.3)', background: 'linear-gradient(to bottom, #171717, #000000)'}}>
        <div className="flex items-center gap-3">
             <div className="w-16 h-16 rounded-full bg-black relative z-10" style={{boxShadow: '0 0 25px rgba(234,179,8,0.2)'}}>
                 <GoatBadgeLogo className="w-full h-full" style={{filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.5))'}} />
            </div>
            <div className="hidden sm:block">
                <h1 className="text-xl font-black text-white" style={{margin:0}}>RTS</h1>
                <p className="text-[10px] text-yellow-500 font-bold uppercase" style={{letterSpacing: '0.2em', color: '#EAB308'}}>Luxury</p>
            </div>
        </div>
        <LuxuryClock />
      </header>

      {/* CONTENIDO */}
      <main className="relative z-10 px-5 py-6 overflow-y-auto" style={{height: 'calc(100vh - 180px)'}}>
        
        {activeTab === 'tracker' && (
          <>
            {/* Quote Card con estilo forzado */}
            <div className="relative p-6 rounded-xl border-gold" style={{backgroundColor: 'rgba(23, 23, 23, 0.6)', marginBottom: '20px', border: '1px solid rgba(217, 119, 6, 0.3)'}}>
              <div style={{position: 'absolute', top: 10, right: 10, opacity: 0.1}}><Crown size={80} color="#EAB308" /></div>
              <div className="relative z-10">
                <Zap className="w-4 h-4 text-yellow-500 mb-3" color="#EAB308" />
                <p style={{fontSize: '1.125rem', fontWeight: 300, fontStyle: 'italic', color: '#f1f5f9'}}>"{quotes[quoteIndex].text}"</p>
                <div style={{height: '1px', width: '40px', backgroundColor: '#ca8a04', marginTop: '16px', marginBottom: '8px'}}></div>
                <p style={{fontSize: '0.75rem', fontWeight: 'bold', color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.1em'}}>{quotes[quoteIndex].author}</p>
              </div>
            </div>

            {/* Progreso */}
            <div className="flex justify-between items-end mb-1">
                <div>
                    <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0}}>Día {currentDay}</h2>
                    <span style={{fontSize: '0.75rem', color: '#EAB308', textTransform: 'uppercase', letterSpacing: '0.05em'}}>{phases[currentPhase].title}</span>
                </div>
                <div className="text-right">
                    <span className="text-gold-gradient" style={{fontSize: '2rem', fontWeight: 900}}>{calculateProgress()}%</span>
                </div>
            </div>
            
            <div style={{height: '8px', width: '100%', backgroundColor: '#262626', borderRadius: '9999px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px'}}>
                <div style={{height: '100%', width: `${calculateProgress()}%`, background: phases[currentPhase].color, transition: 'width 1s ease-out'}}></div>
            </div>

            {/* Lista de Hábitos */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {phases[currentPhase].habits.map((habit) => (
                    <div key={habit.id} style={{
                        position: 'relative', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        padding: '1.25rem', 
                        borderRadius: '0.75rem', 
                        border: habitsStatus[habit.id] ? '1px solid rgba(234, 179, 8, 0.5)' : '1px solid #262626',
                        backgroundColor: habitsStatus[habit.id] ? '#171717' : 'black',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                            <button onClick={() => setExpandedHabit(expandedHabit === habit.id ? null : habit.id)} style={{display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, background: 'none', textAlign: 'left'}}>
                                <div style={{
                                    height: '3rem', width: '3rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                                    border: '1px solid #333', color: '#94a3b8', backgroundColor: '#0a0a0a'
                                }}>
                                    {habit.icon}
                                </div>
                                <div style={{flex: 1}}>
                                    <p style={{fontWeight: 'bold', fontSize: '1rem', color: habitsStatus[habit.id] ? 'white' : '#94a3b8', margin: 0}}>{habit.name}</p>
                                    <span style={{fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', color: habit.type === 'positive' ? '#4ade80' : '#f87171', backgroundColor: 'rgba(255,255,255,0.05)'}}>
                                        {habit.type === 'positive' ? 'Activo' : 'Restricción'}
                                    </span>
                                </div>
                            </button>
                            <button onClick={() => toggleHabit(habit.id)} style={{
                                height: '1.5rem', width: '1.5rem', borderRadius: '0.25rem', border: '1px solid #525252', background: 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                ...(habitsStatus[habit.id] ? {background: 'linear-gradient(to bottom, #facc15, #ca8a04)', border: 'none', transform: 'scale(1.1)'} : {})
                            }}>
                                {habitsStatus[habit.id] && <CheckCircle2 size={16} color="black" />}
                            </button>
                        </div>
                        
                        {/* DETALLES */}
                        {expandedHabit === habit.id && habit.details && (
                             <div style={{marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
                                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem'}}>
                                    <Target size={16} color="#ca8a04" style={{marginTop: '4px'}} />
                                    <div>
                                        <h4 style={{fontSize: '0.65rem', fontWeight: 'bold', color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, marginBottom: '4px'}}>Propósito</h4>
                                        <p style={{fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 300, margin: 0, lineHeight: 1.5}}>{habit.details.purpose}</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem'}}>
                                    <Crosshair size={16} color="#eab308" style={{marginTop: '4px'}} />
                                    <div>
                                        <h4 style={{fontSize: '0.65rem', fontWeight: 'bold', color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, marginBottom: '4px'}}>Protocolo</h4>
                                        <ul style={{margin: 0, paddingLeft: 0, listStyle: 'none'}}>
                                            {habit.details.protocol.map((step, idx) => (
                                                <li key={idx} style={{fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px'}}>• {step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* BOTÓN IA */}
                                <div style={{backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(234,179,8,0.2)'}}>
                                    {habitAiAdvice[habit.name] ? (
                                        <p style={{fontSize: '0.75rem', color: '#fef08a', fontStyle: 'italic', margin: 0}}>"{habitAiAdvice[habit.name]}"</p>
                                    ) : (
                                        <button 
                                            onClick={() => getHabitStrategy(habit.name)}
                                            style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid rgba(234,179,8,0.3)', color: '#eab308', background: 'transparent'}}
                                        >
                                            <Sparkles size={12} /> Generar Estrategia AI
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
          </>
        )}

        {activeTab === 'reports' && (
            <div className="text-center p-10">
                <Crown size={48} color="#eab308" style={{margin: '0 auto 1rem auto'}} />
                <h3 className="text-xl font-bold text-white">ARCHIVO GOAT</h3>
                <p className="text-sm text-slate-500">Próximamente informes detallados.</p>
            </div>
        )}

        {activeTab === 'history' && (
            <div className="space-y-4">
                 <div className="flex items-center gap-3 mb-6 pb-4" style={{borderBottom: '1px solid #333'}}>
                    <History size={24} color="#eab308" />
                    <div>
                        <h3 className="text-xl font-black text-white">REGISTRO</h3>
                        <p className="text-[10px] text-yellow-600 font-bold uppercase">Consistencia</p>
                    </div>
                </div>
                {currentMonthHistory.map((day) => (
                    <div key={day.day} style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#171717', borderRadius: '0.5rem', marginBottom: '0.5rem'}}>
                        <span style={{color: '#cbd5e1', fontWeight: 'bold', fontSize: '0.875rem'}}>Día {day.day}</span>
                        <span style={{color: day.percentage >= 80 ? '#eab308' : '#64748b', fontWeight: 'bold', fontSize: '0.75rem'}}>{day.percentage}%</span>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'mentor' && (
             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6 pb-4" style={{borderBottom: '1px solid #333'}}>
                    <Brain size={24} color="#eab308" />
                    <div>
                        <h3 className="text-xl font-black text-white">ORÁCULO</h3>
                        <p className="text-[10px] text-yellow-600 font-bold uppercase">Inteligencia</p>
                    </div>
                </div>
                <div style={{padding: '1.5rem', backgroundColor: '#171717', borderRadius: '0.75rem', border: '1px solid rgba(234,179,8,0.2)', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {isAiLoading ? <p className="text-yellow-500 text-xs">Pensando...</p> : <p style={{fontStyle: 'italic', textAlign: 'center', color: 'white'}}>"{mentorResponse}"</p>}
                </div>
                <div style={{position: 'relative', marginTop: '1rem'}}>
                    <textarea 
                        value={mentorInput}
                        onChange={(e) => setMentorInput(e.target.value)}
                        placeholder="Pregunta al mentor..."
                        style={{width: '90%', backgroundColor: 'black', border: '1px solid #333', borderRadius: '0.75rem', padding: '1rem', color: 'white', minHeight: '80px'}}
                    />
                    <button onClick={askMentor} style={{position: 'absolute', bottom: '15px', right: '15px', padding: '0.5rem', backgroundColor: '#ca8a04', borderRadius: '0.5rem', color: 'black'}}><Send size={16} /></button>
                </div>
             </div>
        )}

        {activeTab === 'plan' && (
             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6 pb-4" style={{borderBottom: '1px solid #333'}}>
                    <Brain size={24} color="#eab308" />
                    <h3 className="text-xl font-black text-white">HOJA DE RUTA</h3>
                </div>
                {[1, 2, 3].map((p) => (
                    <div key={p} onClick={() => setCurrentPhase(p)} style={{padding: '1.5rem', borderRadius: '0.75rem', border: currentPhase === p ? '1px solid #ca8a04' : '1px solid #333', backgroundColor: currentPhase === p ? '#171717' : 'black', opacity: currentPhase === p ? 1 : 0.6, marginBottom: '1rem'}}>
                        <h4 style={{fontWeight: 'bold', color: 'white', margin: 0}}>{phases[p].title}</h4>
                        <p style={{fontSize: '0.75rem', color: '#ca8a04', margin: '4px 0'}}>{phases[p].subtitle}</p>
                    </div>
                ))}
            </div>
        )}

      </main>

      {/* NAVIGATION BAR - FIXED & STYLED MANUAL */}
      <nav style={{position: 'fixed', bottom: 0, left: 0, width: '100%', height: '96px', background: 'linear-gradient(to top, black, transparent)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '1.5rem', pointerEvents: 'none', zIndex: 50}}>
        <div style={{width: '90%', maxWidth: '400px', backgroundColor: 'rgba(23, 23, 23, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '64px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', pointerEvents: 'auto'}}>
            <button onClick={() => setActiveTab('history')} style={{background: 'none', color: activeTab === 'history' ? '#eab308' : '#737373'}}><History size={20} /></button>
            <button onClick={() => setActiveTab('reports')} style={{background: 'none', color: activeTab === 'reports' ? '#eab308' : '#737373'}}><FileText size={20} /></button>
            
            <button onClick={() => setActiveTab('tracker')} style={{marginTop: '-2rem', height: '4rem', width: '4rem', borderRadius: '50%', background: 'linear-gradient(135deg, #eab308, #a16207)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(234,179,8,0.4)', border: '4px solid black'}}>
                <Target size={24} color="black" />
            </button>

            <button onClick={() => setActiveTab('mentor')} style={{background: 'none', color: activeTab === 'mentor' ? '#eab308' : '#737373'}}><Sparkles size={20} /></button>
            <button onClick={() => setActiveTab('plan')} style={{background: 'none', color: activeTab === 'plan' ? '#eab308' : '#737373'}}><Brain size={20} /></button>
            <div style={{width: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Lock size={16} color="#525252" /></div> {/* Candado visual */}
        </div>
      </nav>
    </div>
  );
};

export default Roadtosuccess;
