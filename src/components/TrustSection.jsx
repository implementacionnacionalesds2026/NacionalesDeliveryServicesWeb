import { useEffect, useRef, useState } from 'react'
import { Shield, Package, Users, MapPin, Award, Target, Eye, Briefcase } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

// ===== COUNTER COMPONENT =====
function Counter({ target, suffix }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        // Reset if target changes so it animates again on new data
        started.current = false;
        setCount(0);

        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !started.current) {
                    started.current = true
                    const dur = 1800
                    const steps = 60
                    const inc = target / steps
                    let current = 0
                    const timer = setInterval(() => {
                        current += inc
                        if (current >= target) {
                            setCount(target)
                            clearInterval(timer)
                        } else {
                            setCount(Math.floor(current))
                        }
                    }, dur / steps)
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [target])

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    )
}

// ===== MAIN COMPONENT =====
export default function TrustSection() {
    const [stats, setStats] = useState([
        { id: 'envios', icon: Package, value: 0, suffix: '+', label: 'Envíos Realizados', color: 'text-accent' },
        { id: 'clientes', icon: Users, value: 0, suffix: '+', label: 'Clientes Satisfechos', color: 'text-blue-400' },
        { id: 'municipios', icon: MapPin, value: 340, suffix: '', label: 'Municipios Cubiertos', color: 'text-purple-400' },
        { id: 'colaboradores', icon: Briefcase, value: 0, suffix: '', label: 'Colaboradores trabajando en el sistema', color: 'text-emerald-400' },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch dinámico dependiendo del entorno (local o producción)
                const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                    ? 'http://localhost:3000/api/public/stats'
                    : 'https://api.nexgo.delivery/api/public/stats';
                const response = await fetch(apiUrl);
                const result = await response.json();
                
                if (result.success) {
                    const data = result.data;
                    setStats([
                        { id: 'envios', icon: Package, value: data.enviosRealizados, suffix: '+', label: 'Envíos Realizados', color: 'text-accent' },
                        { id: 'clientes', icon: Users, value: data.clientesSatisfechos, suffix: '+', label: 'Clientes Satisfechos', color: 'text-blue-400' },
                        { id: 'municipios', icon: MapPin, value: data.municipiosCubiertos, suffix: '', label: 'Municipios Cubiertos', color: 'text-purple-400' },
                        { id: 'colaboradores', icon: Briefcase, value: data.colaboradores, suffix: '', label: 'Colaboradores trabajando en el sistema', color: 'text-emerald-400' },
                    ]);
                }
            } catch (error) {
                console.error("Error al obtener estadísticas en vivo:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <section id="nosotros" className="min-h-screen flex flex-col justify-center py-20 md:py-24 relative overflow-hidden">
            {/* Ambient orbs */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* ── SECTION HEADER ── */}
                <ScrollReveal>
                    <div className="text-center mb-10">

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                            Nuestra <span className="gradient-text">Esencia y Compromiso</span>
                        </h2>
                        <p className="text-base md:text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
                            En Nacionales Delivery Services, no solo movemos paquetes,{' '}
                            conectamos corazones y oportunidades en cada rincón de Guatemala.
                        </p>
                    </div>
                </ScrollReveal>

                {/* ── MISIÓN & VISIÓN ── */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <ScrollReveal delay={100}>
                        <div className="glass rounded-3xl p-6 md:p-8 h-full border border-white/10 hover:border-accent/30 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-primary opacity-50 rounded-l-3xl" />

                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 group-hover:text-accent transition-colors mt-2">
                                Misión
                            </h3>

                            <p className="text-blue-200 text-sm md:text-base leading-relaxed font-light mb-2 relative z-10">
                                Brindar soluciones de logística y transporte de paquetería con los más altos estándares de{' '}
                                <span className="text-white font-medium">rapidez, seguridad y confianza</span>.
                                Facilitamos el crecimiento de nuestros clientes conectando Guatemala de manera eficiente,
                                apoyados en un equipo humano apasionado por el servicio.
                            </p>

                            <Target className="absolute -bottom-6 -right-6 w-24 h-24 text-accent/[0.08] pointer-events-none transform group-hover:scale-105 group-hover:rotate-12 transition-all duration-700" />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="glass rounded-3xl p-6 md:p-8 h-full border border-white/10 hover:border-blue-400/30 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-blue-600 opacity-50 rounded-r-3xl" />

                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 group-hover:text-blue-400 transition-colors mt-2">
                                Visión
                            </h3>

                            <p className="text-blue-200 text-sm md:text-base leading-relaxed font-light mb-2 relative z-10">
                                Convertirnos en la{' '}
                                <span className="text-white font-medium">empresa líder en servicios de entrega</span>{' '}
                                a nivel nacional, siendo reconocidos por nuestra integridad, puntualidad y compromiso
                                con la innovación y la mejora continua.
                            </p>

                            <Eye className="absolute -bottom-6 -right-6 w-24 h-24 text-blue-400/[0.08] pointer-events-none transform group-hover:scale-105 group-hover:-rotate-12 transition-all duration-700" />
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── STATS STRIP ── */}
                <ScrollReveal>
                    <div className="relative mt-8">
                        {/* Title & Live indicator */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-3 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">Nuestro Impacto</h3>
                                <p className="text-blue-300 text-xs md:text-sm mt-1">Cifras que respaldan nuestro compromiso con Guatemala</p>
                            </div>
                            <div className="flex items-center px-4 py-1.5 rounded-full bg-amber-400 shadow-sm">
                                <span className="text-blue-950 text-xs font-bold tracking-wider uppercase">Actualizado en tiempo real</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {stats.map((s, i) => (
                                <ScrollReveal key={s.id} delay={i * 100} className="flex">
                                    <div className="relative w-full h-full rounded-2xl bg-[#0a1035]/60 border border-white/10 p-5 md:p-6 backdrop-blur-xl group hover:-translate-y-1 hover:border-white/30 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl">
                                        
                                        {/* Background subtle glow */}
                                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700 pointer-events-none" />

                                        <div className="relative z-10 flex items-center justify-between mb-6">
                                            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${s.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                                <s.icon className="w-6 h-6 drop-shadow-sm" />
                                            </div>
                                        </div>

                                        <div className="relative z-10 mt-auto">
                                            <p className="text-blue-200/80 text-xs uppercase tracking-widest font-bold mb-1">{s.label}</p>
                                            <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter drop-shadow-md">
                                                <Counter target={s.value} suffix={s.suffix} />
                                            </p>
                                        </div>
                                        
                                        {/* Bottom subtle accent line */}
                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 opacity-0 group-hover:opacity-100" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    )
}
