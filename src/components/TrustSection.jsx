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
        <section id="nosotros" className="py-28 relative overflow-hidden">
            {/* Ambient orbs */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ── SECTION HEADER ── */}
                <ScrollReveal>
                    <div className="text-center mb-20">

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Nuestra <span className="gradient-text">Esencia y Compromiso</span>
                        </h2>
                        <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
                            En Nacionales Delivery Services, no solo movemos paquetes,{' '}
                            conectamos corazones y oportunidades en cada rincón de Guatemala.
                        </p>
                    </div>
                </ScrollReveal>

                {/* ── MISIÓN & VISIÓN ── */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <ScrollReveal delay={100}>
                        <div className="glass rounded-3xl p-8 md:p-10 h-full border border-white/10 hover:border-accent/30 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-primary opacity-50 rounded-l-3xl" />

                            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 group-hover:text-accent transition-colors mt-4">
                                Misión
                            </h3>

                            <p className="text-blue-200 text-base md:text-lg leading-relaxed font-light mb-4 relative z-10">
                                Brindar soluciones de logística y transporte de paquetería con los más altos estándares de{' '}
                                <span className="text-white font-medium">rapidez, seguridad y confianza</span>.
                                Facilitamos el crecimiento de nuestros clientes conectando Guatemala de manera eficiente,
                                apoyados en un equipo humano apasionado por el servicio.
                            </p>

                            <Target className="absolute -bottom-8 -right-8 w-32 h-32 text-accent/[0.08] pointer-events-none transform group-hover:scale-105 group-hover:rotate-12 transition-all duration-700" />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="glass rounded-3xl p-8 md:p-10 h-full border border-white/10 hover:border-blue-400/30 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-blue-600 opacity-50 rounded-r-3xl" />

                            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 group-hover:text-blue-400 transition-colors mt-4">
                                Visión
                            </h3>

                            <p className="text-blue-200 text-base md:text-lg leading-relaxed font-light mb-4 relative z-10">
                                Convertirnos en la{' '}
                                <span className="text-white font-medium">empresa líder en servicios de entrega</span>{' '}
                                a nivel nacional, siendo reconocidos por nuestra integridad, puntualidad y compromiso
                                con la innovación y la mejora continua.
                            </p>

                            <Eye className="absolute -bottom-8 -right-8 w-32 h-32 text-blue-400/[0.08] pointer-events-none transform group-hover:scale-105 group-hover:-rotate-12 transition-all duration-700" />
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── STATS STRIP ── */}
                <ScrollReveal>
                    <div className="rounded-3xl p-8 md:p-10 relative overflow-hidden glass border border-white/10">
                        <div className="absolute inset-0 grid-pattern opacity-20 rounded-3xl" />
                        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {stats.map((s, i) => (
                                <ScrollReveal key={s.id} delay={i * 80} className="h-full">
                                    <div className="stat-card h-full group hover:border-accent/40 hover:bg-white/10 transition-all duration-500 flex flex-col items-center justify-center p-6 min-h-[160px]">
                                        <s.icon className={`w-8 h-8 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform duration-500`} />
                                        <p className={`text-3xl md:text-4xl font-extrabold ${s.color} mb-2`}>
                                            <Counter target={s.value} suffix={s.suffix} />
                                        </p>
                                        <p className="text-blue-300 text-xs md:text-sm font-medium text-center leading-snug">{s.label}</p>
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
