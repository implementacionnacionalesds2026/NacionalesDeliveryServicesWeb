import { useEffect, useRef, useState } from 'react'
import { Package, Users, MapPin, Briefcase } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

function Counter({ target, suffix }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        // Reset and restart animation if target changes
        started.current = false;
        setCount(0);

        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !started.current) {
                    started.current = true
                    const dur = 2000
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

export default function StatsSection() {
    const [stats, setStats] = useState([
        { id: 'envios', icon: Package, value: 0, suffix: '+', label: 'Envíos Realizados', color: 'text-accent' },
        { id: 'clientes', icon: Users, value: 0, suffix: '+', label: 'Clientes Satisfechos', color: 'text-blue-400' },
        { id: 'municipios', icon: MapPin, value: 340, suffix: '', label: 'Municipios Cubiertos', color: 'text-purple-400' },
        { id: 'colaboradores', icon: Briefcase, value: 0, suffix: '', label: 'Colaboradores trabajando en el sistema', color: 'text-emerald-400' },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Try localhost first, adjust as needed when deploying
                const response = await fetch('http://localhost:3000/api/public/stats');
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
                console.error("Error fetching live stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <section className="py-20 relative" style={{ background: 'linear-gradient(135deg, #142d7a 0%, #0a1035 100%)' }}>
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <ScrollReveal key={s.id} delay={i * 100} className="h-full">
                            <div className="stat-card group hover:border-accent/40 hover:bg-white/10 transition-all duration-500 h-full flex flex-col items-center justify-center p-8 min-h-[220px]">
                                <s.icon className={`w-10 h-10 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform duration-500`} />
                                <p className={`text-4xl md:text-5xl font-extrabold ${s.color} mb-2`}>
                                    <Counter target={s.value} suffix={s.suffix} />
                                </p>
                                <p className="text-blue-300 text-sm font-medium text-center">{s.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
