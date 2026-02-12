import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, ChevronUp, ChevronDown, Lightbulb, History, FileText, Target, Brain, Crown, X, Sparkles, MessageSquare, Send, Activity, ShieldAlert, Crosshair, Anchor } from 'lucide-react';

// --- CONFIGURACIÓN GEMINI API ---
// NOTA: Para producción, idealmente usa variables de entorno (import.meta.env.VITE_API_KEY)
const apiKey = ""; 

// --- LOGO BADGE "GOAT LUXURY" (Vectorial) ---
const GoatBadgeLogo = ({ className }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
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
    <div className="flex flex-col items-end">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-white tracking-tighter" style={{ fontFamily: 'monospace' }}>{timeStr}</span>
        <span className="text-sm font-bold text-yellow-500 w-5">{seconds}</span>
      </div>
      <div className="text-[10px] font-bold text-slate-500 tracking-[0.2em] border-t border-yellow-900/30 pt-1 mt-1 w-full text-right">
        {dateStr}
      </div>
    </div>
  );
};

const Roadtosuccess = () => {
  // --- ESTADO PRINCIPAL ---
  const [activeTab, setActiveTab] = useState('tracker');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentDay, setCurrentDay] = useState(12);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMonthReportModal, setShowMonthReportModal] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [expandedHabit, setExpandedHabit] = useState(null);

  // --- ESTADO IA (Gemini) ---
  const [mentorInput, setMentorInput] = useState('');
  const [mentorResponse, setMentorResponse] = useState('El silencio es poder. Pregunta y recibirás claridad.');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [habitAiAdvice, setHabitAiAdvice] = useState({});

  // --- DATOS: HISTORIAL DEL MES ACTUAL ---
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

  // --- DATOS DE LAS FASES (ULTRA DETALLADOS) ---
  const phases = {
    1: {
      title: "Fase I: Fundación",
      subtitle: "Limpieza & Claridad",
      duration: "Mes 1",
      color: "from-yellow-200 via-yellow-400 to-yellow-600",
      description: "El éxito requiere una mente despejada. Elimina el ruido.",
      habits: [
        { 
            id: 'h1', icon: '🌊', name: 'Hidratación Cognitiva (3L)', type: 'positive', 
            details: {
                purpose: "La deshidratación del 2% reduce tu coeficiente intelectual y enfoque. Tu cerebro es 73% agua.",
                protocol: [
                    "Mañana (7 AM): 1L de agua con una pizca de sal rosa (electrolitos) para activar neuronas.",
                    "Tarde (Hasta 6 PM): 2L distribuidos.",
                    "Noche: Reducir ingesta para no interrumpir sueño profundo."
                ],
                rescue: "Si te da ansiedad por comer, bebe un vaso grande de agua con gas y limón."
            }
        },
        { 
            id: 'h2', icon: '👁️', name: 'Calibración Mental (15m)', type: 'positive', 
            details: {
                purpose: "Reduce el cortisol y aumenta la materia gris en el córtex prefrontal (toma de decisiones).",
                protocol: [
                    "Técnica: Box Breathing (4s inhalar, 4s retener, 4s exhalar, 4s retener).",
                    "Postura: Columna recta, hombros relajados, sin apoyo en cabeza.",
                    "Foco: Observa tus pensamientos sin juzgarlos."
                ],
                rescue: "Si no puedes sentarte, haz una 'Caminata Zen': camina lento sintiendo solo el contacto de tus pies."
            }
        },
        { 
            id: 'h3', icon: '🛡️', name: 'Soberanía Dopaminérgica', type: 'negative', 
            details: {
                purpose: "Resetea tus receptores de placer. Sin esto, el trabajo duro te parecerá imposible.",
                protocol: [
                    "Cero Marihuana: Nubla tu ambición y te conforma con la mediocridad.",
                    "Cero Porno: Destruye tu motivación y energía vital.",
                    "Cero Scroll Infinito: No regales tu atención a algoritmos."
                ],
                rescue: "Ducha helada (Shock Térmico) o 50 Burpees inmediatos al sentir el antojo."
            }
        },
        { 
            id: 'h4', icon: '🧠', name: 'Reprogramación Subconsciente', type: 'positive', 
            details: {
                purpose: "Tu realidad externa siempre alcanzará a tu realidad interna. Debes creértelo antes de verlo.",
                protocol: [
                    "Afirmación Espejo: Mírate a los ojos y di 'Soy el arquitecto de mi destino' con convicción.",
                    "Scripting: Escribe en presente tu meta principal 10 veces.",
                    "Lectura: 10 páginas de filosofía estoica o biografía de magnate."
                ],
                rescue: "Escucha un audiolibro a velocidad 2x mientras te desplazas."
            }
        },
      ]
    },
    2: {
      title: "Fase II: Construcción",
      subtitle: "Disciplina Ejecutiva",
      duration: "Mes 2",
      color: "from-amber-300 via-amber-500 to-amber-700",
      description: "Construye los activos que pagarán tu libertad.",
      habits: [
        { 
            id: 'h1', icon: '🚀', name: 'Bloque de Poder (Deep Work)', type: 'positive', 
            details: {
                purpose: "2 horas de trabajo profundo valen más que 8 horas distraídas. Aquí se forjan imperios.",
                protocol: [
                    "Entorno: Teléfono en otra habitación (Modo Avión).",
                    "Audio: Binaural Beats (40Hz) o Ruido Marrón.",
                    "Regla: Si te bloqueas, mira la pared, pero no cambies de tarea."
                ],
                rescue: "Técnica Pomodoro 50/10 si te cuesta arrancar."
            }
        },
        { 
            id: 'h2', icon: '📈', name: 'Inteligencia Financiera', type: 'positive', 
            details: {
                purpose: "El dinero es un juego. Si no conoces las reglas, siempre perderás.",
                protocol: [
                    "Estudio: 20 min diarios sobre Inversión, Impuestos o Ventas.",
                    "Análisis: Revisa tus gastos de ayer y clasifícalos.",
                    "Estrategia: Planea cómo aumentar tus ingresos un 1% este mes."
                ],
                rescue: "Lee un resumen ejecutivo de un libro financiero en una app de resúmenes."
            }
        },
        { 
            id: 'h3', icon: '🥗', name: 'Combustible de Alto Octanaje', type: 'positive', 
            details: {
                purpose: "Eres un Fórmula 1. No le pongas gasolina barata a tu motor biológico.",
                protocol: [
                    "Cero Procesados: Si viene en caja con más de 5 ingredientes, no es comida.",
                    "Proteína: Prioridad en cada comida para saciedad y músculo.",
                    "Ayuno: Mínimo 12h nocturnas para reparación celular."
                ],
                rescue: "Ten siempre nueces o huevos duros listos para evitar pedir comida rápida."
            }
        },
        { 
            id: 'h4', icon: '📵', name: 'Ayuno de Distracciones', type: 'negative', 
            details: {
                purpose: "Proteger tu atención es proteger tu futuro. Crea antes de consumir.",
                protocol: [
                    "Bloqueo Duro: Apps de RRSS bloqueadas hasta las 12 PM.",
                    "Pantalla: Configura el teléfono en escala de grises.",
                    "Notificaciones: Desactivadas todas (excepto llamadas de emergencia)."
                ],
                rescue: "Deja el teléfono en el coche o buzón si estás en casa."
            }
        },
        { 
            id: 'h5', icon: '⚔️', name: 'Mantenimiento del Voto', type: 'negative', 
            details: {
                purpose: "La consistencia separa a los amateurs de los profesionales.",
                protocol: ["Mantener Cero Vicios (Fase 1). Eres intocable."],
                rescue: "Recuerda tu 'Por Qué'. Visualiza la versión perdedora de ti mismo si cedes."
            }
        },
      ]
    },
    3: {
      title: "Fase III: Legado",
      subtitle: "Nivel GOAT",
      duration: "Mes 3",
      color: "from-yellow-400 via-orange-500 to-yellow-900",
      description: "Dominio total. Resultados que hablan por sí solos.",
      habits: [
        { 
            id: 'h1', icon: '💎', name: 'Construcción de Imperio', type: 'positive', 
            details: {
                purpose: "Mover la aguja. Acciones de alto impacto que generan riqueza real.",
                protocol: [
                    "La Roca: Identifica la tarea #1 que hace irrelevante al resto y atácala.",
                    "Delegación: Si vale menos de tu tarifa hora ideal, no lo hagas tú.",
                    "Output: No te levantes sin un entregable tangible."
                ],
                rescue: "Divide la tarea en pasos ridículamente pequeños y haz el primero."
            }
        },
        { 
            id: 'h2', icon: '🏋️', name: 'Físico de Élite (Espartano)', type: 'positive', 
            details: {
                purpose: "Un cuerpo fuerte es una mente fuerte. La disciplina física es innegociable.",
                protocol: [
                    "Intensidad: Debes llegar cerca del fallo muscular.",
                    "Progresión: Cada sesión debe ser mejor que la anterior (más peso o reps).",
                    "Movilidad: 10 min de estiramiento para longevidad."
                ],
                rescue: "Si no hay gym, 300 flexiones y 100 sentadillas en casa."
            }
        },
        { 
            id: 'h3', icon: '👁️', name: 'Visión Maestra (Scripting)', type: 'positive', 
            details: {
                purpose: "Diseño cuántico de tu futuro. Sintoniza la frecuencia de tu éxito.",
                protocol: [
                    "Escribe tu día ideal en presente detallado (olores, sentimientos).",
                    "Revisa tus metas anuales y trimestrales.",
                    "Agradece 3 victorias de ayer."
                ],
                rescue: "Graba una nota de voz describiendo tu vida soñada y escúchala."
            }
        },
        { 
            id: 'h4', icon: '🤐', name: 'Monje Silencioso', type: 'negative', 
            details: {
                purpose: "El león no anuncia su caza. Guarda tu energía para ejecutar.",
                protocol: [
                    "Silencio Estratégico: No hables de tus planes, muestra resultados.",
                    "Ayuno de Dopamina Total: Un día a la semana sin pantallas.",
                    "Escucha Activa: Habla el 20%, escucha el 80%."
                ],
                rescue: "Si sientes la urgencia de presumir, escribe en tu diario en su lugar."
            }
        },
        { id: 'h5', icon: '👑', name: 'Estándar GOAT', type: 'negative', details: { purpose: "Excelencia perpetua.", protocol: ["Cero Vicios.", "Cero Excusas.", "Cero Días Perdidos."], rescue: "Mírate al espejo. ¿Eres quien dijiste que serías?" } },
      ]
    }
  };

  const quotes = [
    { text: "El éxito no se persigue, se atrae por la persona en la que te conviertes.", author: "Jim Rohn" },
    { text: "No bajes la meta, aumenta el esfuerzo.", author: "Grant Cardone" },
    { text: "La calidad de tu vida depende de la calidad de tus estándares.", author: "Tony Robbins" },
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
    const average = 92;
    let rank = "Ejecutivo";
    if (average > 90) rank = "Magnate (GOAT)";
    else if (average > 75) rank = "Socio Senior";
    
    const newReport = {
      id: reports.length + 1,
      month: 'Febrero',
      year: 2026,
      average: average,
      rank: rank,
      bestStreak: 12
    };

    setReports([newReport, ...reports]);
    setCurrentMonthHistory([]);
    setCurrentDay(1);
    setShowMonthReportModal(true);
  };

  // --- LÓGICA DE IA (SIN DEPENDENCIAS) ---
  const callGemini = async (prompt) => {
    if (!apiKey) {
        return "Clave API no configurada. Añade tu API Key en el código.";
    }
    try {
      // Uso directo de fetch para evitar error de importación
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      
      const data = await response.json();
      if (data.error) {
          throw new Error(data.error.message || "Error en la API");
      }
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
    } catch (error) {
      console.error("Error AI:", error);
      return "El sistema está sobrecargado. Tu disciplina es la única respuesta ahora.";
    }
  };

  // 1. Función para el Mentor (Chat)
  const askMentor = async () => {
    if (!mentorInput.trim()) return;
    setIsAiLoading(true);
    const systemPrompt = `Actúa como un mentor de alto rendimiento llamado 'GOAT Oracle'. Tu estilo es una mezcla de David Goggins, Naval Ravikant y Marco Aurelio. Eres lujoso, estoico, duro pero visionario. 
    El usuario está en la fase ${currentPhase} del Modo Monje. Responde a su consulta: "${mentorInput}". 
    Sé breve (máximo 3 frases), contundente y motivador. Habla en Español.`;
    
    const answer = await callGemini(systemPrompt);
    setMentorResponse(answer);
    setIsAiLoading(false);
    setMentorInput('');
  };

  // 2. Función para Estrategia de Hábitos
  const getHabitStrategy = async (habitName) => {
    setHabitAiAdvice(prev => ({...prev, [habitName]: 'Analizando táctica...'}));
    const prompt = `Genera una micro-estrategia única, creativa y de 'bio-hacking' para cumplir el hábito: "${habitName}". 
    El tono debe ser de élite. Dame solo una frase de acción inmediata. Ejemplo: 'Haz 20 flexiones ahora mismo'.`;
    
    const advice = await callGemini(prompt);
    setHabitAiAdvice(prev => ({...prev, [habitName]: advice}));
  };

  // --- PATRÓN DE FONDO "ALL-SEEING EYE" (SVG ENCODED) ---
  const eyePattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EAB308' fill-opacity='0.05'%3E%3Cpath d='M30 10c11 0 20 9 20 20s-9 20-20 20S10 41 10 30s9-20 20-20zm0 10a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans overflow-hidden selection:bg-yellow-500 selection:text-black pb-24 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;800;900&display=swap');
        body { font-family: 'Lexend', sans-serif; }
        .text-gold-gradient {
          background: linear-gradient(to bottom, #FDE68A, #D97706, #92400E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0px 1px 0px rgba(0,0,0,0.5));
        }
        .border-gold { border: 1px solid rgba(217, 119, 6, 0.3); }
        .gold-glow { box-shadow: 0 0 20px rgba(217, 119, 6, 0.15); }
        @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .btn-magic {
            background: linear-gradient(90deg, #92400E 0%, #FDE68A 50%, #92400E 100%);
            background-size: 200% auto;
            color: black;
            animation: shine 3s linear infinite;
        }
      `}</style>

      {/* FONDO CON PATRÓN DE OJO */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{ backgroundImage: `url("${eyePattern}")` }}
      ></div>

      {/* HEADER LUXURY */}
      <header className="relative z-10 px-6 pt-6 pb-6 flex items-center justify-between bg-gradient-to-b from-neutral-900 via-neutral-900 to-black border-b border-yellow-900/30">
        <div className="relative group cursor-pointer flex items-center gap-3">
             <div className="w-16 h-16 rounded-full shadow-[0_0_25px_rgba(234,179,8,0.2)] bg-black relative z-10 transition-transform group-hover:scale-105">
                 <GoatBadgeLogo className="w-full h-full drop-shadow-xl" />
            </div>
            <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tighter text-white">RTS</h1>
                <p className="text-[10px] text-yellow-500 font-bold tracking-[0.2em] uppercase">Luxury</p>
            </div>
        </div>
        <LuxuryClock />
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 px-5 space-y-6 overflow-y-auto h-[calc(100vh-180px)] scrollbar-hide py-6">
        
        {/* --- VISTA: TRACKER --- */}
        {activeTab === 'tracker' && (
          <>
            <div className="relative p-6 rounded-xl border-gold bg-neutral-900/40 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Crown className="w-32 h-32 text-yellow-500" />
              </div>
              <div className="relative z-10">
                <Zap className="w-4 h-4 text-yellow-500 mb-3" />
                <p className="text-lg font-light leading-relaxed text-slate-100 italic" style={{ fontFamily: 'serif' }}>"{quotes[quoteIndex].text}"</p>
                <div className="h-px w-10 bg-yellow-600/50 mt-4 mb-2"></div>
                <p className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest">{quotes[quoteIndex].author}</p>
              </div>
            </div>

            <div className="flex justify-between items-end mb-1 px-1">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Día {currentDay}</h2>
                    <span className="text-xs text-yellow-500/70 uppercase tracking-wider font-semibold">{phases[currentPhase].title}</span>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-black text-gold-gradient">{calculateProgress()}%</span>
                </div>
            </div>
            
            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden border border-white/5">
                <div 
                    className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${phases[currentPhase].color} shadow-[0_0_15px_rgba(234,179,8,0.4)]`}
                    style={{ width: `${calculateProgress()}%` }}
                ></div>
            </div>

            {currentDay >= 28 && (
                <button onClick={handleEndMonth} className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all border border-yellow-400/50">
                    Cerrar Ciclo Mensual
                </button>
            )}

            <div className="space-y-4 mt-8">
                <div className="space-y-4">
                {phases[currentPhase].habits.map((habit) => (
                    <div key={habit.id} className={`w-full relative flex flex-col p-5 rounded-xl border transition-all duration-500 ${habitsStatus[habit.id] ? 'bg-neutral-900 border-yellow-500/50 shadow-[0_0_20px_rgba(217,119,6,0.1)]' : 'bg-black border-neutral-800 hover:border-neutral-700'}`}>
                        <div className="flex items-center justify-between w-full">
                            <button onClick={() => setExpandedHabit(expandedHabit === habit.id ? null : habit.id)} className="flex items-center gap-5 flex-1 text-left group">
                                <div className={`h-12 w-12 rounded flex items-center justify-center text-2xl transition-all duration-300 ${habitsStatus[habit.id] ? 'bg-gradient-to-br from-yellow-900/20 to-black text-yellow-400 border border-yellow-600/30' : 'bg-neutral-900 text-slate-500 border border-neutral-800 group-hover:border-neutral-600'}`}>
                                    {habit.icon}
                                </div>
                                <div className="flex-1">
                                    <p className={`font-bold text-base transition-colors ${habitsStatus[habit.id] ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{habit.name}</p>
                                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${habit.type === 'positive' ? 'text-green-500/60' : 'text-red-500/60'}`}>{habit.type === 'positive' ? 'Activo' : 'Restricción'}</span>
                                </div>
                            </button>
                            <button onClick={() => toggleHabit(habit.id)} className={`h-6 w-6 rounded border transition-all duration-300 flex items-center justify-center ${habitsStatus[habit.id] ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 border-transparent shadow-lg scale-110' : 'border-neutral-600 bg-transparent'}`}>
                                {habitsStatus[habit.id] && <CheckCircle2 className="w-4 h-4 text-black" strokeWidth={3} />}
                            </button>
                        </div>
                        
                        {/* SECCIÓN DETALLADA EXPANDIDA */}
                        {expandedHabit === habit.id && habit.details && (
                             <div className="mt-5 pt-5 border-t border-white/5 animate-in fade-in slide-in-from-top-3 space-y-4">
                                
                                {/* 1. Propósito */}
                                <div className="flex gap-3 items-start">
                                    <Target className="w-4 h-4 text-yellow-600 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-1">Propósito</h4>
                                        <p className="text-xs text-slate-300 font-light leading-relaxed">{habit.details.purpose}</p>
                                    </div>
                                </div>

                                {/* 2. Protocolo */}
                                <div className="flex gap-3 items-start">
                                    <Crosshair className="w-4 h-4 text-yellow-500 mt-1 shrink-0" />
                                    <div className="w-full">
                                        <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-2">Protocolo Táctico</h4>
                                        <ul className="space-y-2">
                                            {habit.details.protocol.map((step, idx) => (
                                                <li key={idx} className="text-xs text-slate-400 font-light flex gap-2">
                                                    <span className="text-yellow-500/50">•</span> {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* 3. Rescate */}
                                <div className="flex gap-3 items-start bg-yellow-900/10 p-3 rounded-lg border border-yellow-900/30">
                                    <ShieldAlert className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Plan de Rescate</h4>
                                        <p className="text-xs text-slate-400 italic">{habit.details.rescue}</p>
                                    </div>
                                </div>
                                
                                {/* BOTÓN IA GEMINI */}
                                <div className="pt-2">
                                    {habitAiAdvice[habit.name] ? (
                                        <div className="bg-black/50 p-3 rounded border border-yellow-500/20 flex gap-2 animate-in fade-in">
                                            <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                            <p className="text-xs text-yellow-100 italic">"{habitAiAdvice[habit.name]}"</p>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => getHabitStrategy(habit.name)}
                                            className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider py-3 rounded border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                                        >
                                            <Sparkles className="w-3 h-3" /> Generar Estrategia AI Alternativa
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>
          </>
        )}

        {/* --- VISTA: MENTOR (IA) --- */}
        {activeTab === 'mentor' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <Brain className="w-6 h-6 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">ORÁCULO GOAT</h3>
                        <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold">Inteligencia Estratégica</p>
                    </div>
                </div>

                {/* Respuesta del Mentor */}
                <div className="relative p-6 bg-neutral-900 border border-yellow-500/20 rounded-xl min-h-[150px] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-transparent"></div>
                    {isAiLoading ? (
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                             <p className="text-xs text-yellow-500/50 animate-pulse">Consultando sabiduría...</p>
                        </div>
                    ) : (
                        <p className="text-lg text-center font-light leading-relaxed text-white italic">
                            "{mentorResponse}"
                        </p>
                    )}
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                    <div className="relative">
                        <textarea 
                            value={mentorInput}
                            onChange={(e) => setMentorInput(e.target.value)}
                            placeholder="Pregunta al mentor (ej: 'Me siento desmotivado hoy')..."
                            className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-sm text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all resize-none h-24"
                        />
                        <button 
                            onClick={askMentor}
                            disabled={!mentorInput.trim() || isAiLoading}
                            className="absolute bottom-3 right-3 p-2 bg-yellow-600 rounded-lg text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Quick Prompts */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {['Necesito disciplina', 'Estrategia financiera', 'Estoy agotado', 'Frase del día'].map((prompt, idx) => (
                            <button 
                                key={idx}
                                onClick={() => { setMentorInput(prompt); }}
                                className="whitespace-nowrap px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-slate-400 hover:border-yellow-500/50 hover:text-yellow-500 transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
             </div>
        )}

        {/* --- VISTA: INFORMES --- */}
        {activeTab === 'reports' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <FileText className="w-6 h-6 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">ARCHIVO GOAT</h3>
                        <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold">Registro de Alto Rendimiento</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="relative bg-gradient-to-br from-neutral-900 to-black border border-yellow-900/30 rounded-xl p-6 overflow-hidden">
                             <div className="absolute -right-4 -top-4 opacity-5">
                                <Crown className="w-32 h-32 text-white" />
                             </div>
                             
                             <div className="relative z-10 flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-3xl font-black text-white tracking-tighter">{report.month}</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-[0.3em]">{report.year}</p>
                                </div>
                                <div className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${report.average >= 90 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-neutral-800 border-neutral-700 text-slate-400'}`}>
                                    {report.rank}
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 p-3 rounded border border-white/5">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Efectividad</p>
                                    <p className="text-xl font-bold text-gold-gradient">{report.average}%</p>
                                </div>
                                <div className="bg-black/40 p-3 rounded border border-white/5">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">Mejor Racha</p>
                                    <p className="text-xl font-bold text-white">{report.bestStreak} <span className="text-xs font-normal text-slate-600">días</span></p>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- VISTA: HISTORIAL --- */}
        {activeTab === 'history' && (
            <div className="space-y-4 animate-in fade-in">
                 <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <History className="w-6 h-6 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">REGISTRO DIARIO</h3>
                        <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold">Consistencia es Poder</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                    {currentMonthHistory.map((day) => (
                        <div key={day.day} className="flex items-center justify-between p-4 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-yellow-900/30 transition-colors">
                            <span className="text-slate-300 font-bold text-sm">Día {day.day}</span>
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${day.percentage === 100 ? 'bg-yellow-500' : (day.percentage >= 60 ? 'bg-amber-600' : 'bg-neutral-600')}`} style={{width: `${day.percentage}%`}}></div>
                                </div>
                                <span className={`text-xs font-bold ${day.percentage === 100 ? 'text-yellow-500' : (day.percentage >= 60 ? 'text-amber-500' : 'text-slate-500')}`}>{day.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- VISTA: PLAN --- */}
        {activeTab === 'plan' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <Brain className="w-6 h-6 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">HOJA DE RUTA</h3>
                        <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold">Tu Ascenso a la Cima</p>
                    </div>
                </div>

                {[1, 2, 3].map((p) => (
                    <div key={p} onClick={() => setCurrentPhase(p)} className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 group ${currentPhase === p ? 'bg-gradient-to-r from-neutral-900 to-black border-yellow-600/50 shadow-lg' : 'bg-black border-neutral-800 opacity-60 hover:opacity-100'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className={`text-lg font-bold ${currentPhase === p ? 'text-white' : 'text-slate-400'}`}>{phases[p].title}</h4>
                            {currentPhase === p && <Activity className="text-yellow-500 w-5 h-5"/>}
                        </div>
                        <p className="text-xs text-yellow-500/60 font-bold uppercase tracking-widest mb-3">{phases[p].subtitle}</p>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">{phases[p].description}</p>
                    </div>
                ))}
            </div>
        )}

      </main>

      {/* NAVIGATION BAR - ACTUALIZADA CON PESTAÑA MENTOR */}
      <nav className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black to-transparent flex justify-around items-end pb-6 px-4 z-50 pointer-events-none">
        <div className="w-full max-w-md mx-auto bg-neutral-900/90 backdrop-blur-xl border border-white/5 rounded-2xl flex justify-around items-center h-16 shadow-2xl pointer-events-auto">
            <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'history' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300'}`}>
                <History className="w-5 h-5" />
            </button>
            <button onClick={() => setActiveTab('reports')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'reports' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300'}`}>
                <FileText className="w-5 h-5" />
            </button>
            
            <button onClick={() => setActiveTab('tracker')} className={`-mt-8 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center shadow-[0_5px_20px_rgba(234,179,8,0.4)] border-4 border-black transform transition-transform active:scale-95 ${activeTab === 'tracker' ? 'scale-110' : ''}`}>
                <Target className="w-7 h-7 text-black" strokeWidth={3} />
            </button>

            <button onClick={() => setActiveTab('mentor')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'mentor' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300'}`}>
                <Sparkles className="w-5 h-5" /> {/* ICONO PARA IA MENTOR */}
            </button>

            <button onClick={() => setActiveTab('plan')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'plan' ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300'}`}>
                <Brain className="w-5 h-5" />
            </button>
        </div>
      </nav>

      {/* MODAL: REPORTE MENSUAL */}
      {showMonthReportModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in">
            <div className="w-4/5 bg-neutral-900 border border-yellow-600 rounded-xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] bg-black">
                    <GoatBadgeLogo className="w-full h-full" />
                </div>
                <h2 className="text-3xl font-black text-white mb-1 tracking-tight">CICLO COMPLETADO</h2>
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-8">El mercado nunca duerme.</p>
                
                <div className="bg-black border border-white/10 rounded-lg p-6 mb-8">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Nuevo Estatus</p>
                    <p className="text-2xl font-black text-gold-gradient">{reports[0].rank}</p>
                </div>
                
                <button 
                    onClick={() => setShowMonthReportModal(false)}
                    className="w-full py-4 bg-yellow-600 text-black font-black text-xs uppercase tracking-[0.2em] rounded hover:bg-yellow-500 transition-colors"
                >
                    Iniciar Siguiente Nivel
                </button>
            </div>
        </div>
      )}

      {/* MODAL: CELEBRACIÓN */}
      {showCelebration && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in">
            <div className="text-center p-8 border border-yellow-500/20 bg-neutral-900/50 rounded-2xl">
                <div className="w-32 h-32 mx-auto mb-6 animate-[spin_10s_linear_infinite] rounded-full bg-black shadow-2xl">
                    <GoatBadgeLogo className="w-full h-full" />
                </div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-700 mt-2 tracking-tighter">GOAT STATUS</h2>
                <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mt-4">La excelencia es un hábito.</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Roadtosuccess;
