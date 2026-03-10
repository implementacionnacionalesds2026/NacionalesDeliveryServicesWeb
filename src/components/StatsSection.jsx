import { useEffect, useRef, useState } from 'react'
import { Package, Users, MapPin, Award } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const stats = [
    { icon: Package, value: 1000, suffix: '+', label: 'Envíos Realizados', color: 'text-accent' },
    { icon: Users, value: 500, suffix: '+', label: 'Clientes Satisfechos', color: 'text-blue-400' },
    { icon: MapPin, value: 50, suffix: '+', label: 'Municipios Cubiertos', color: 'text-purple-400' },
    { icon: Award, value: 100, suffix: '%', label: 'Confianza Total', color: 'text-amber-400' },
]

function Counter({ target, suffix }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
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
    return (
        <section className="py-20 relative" style={{ background: 'linear-gradient(135deg, #142d7a 0%, #0a1035 100%)' }}>
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <ScrollReveal key={s.label} delay={i * 100}>
                            <div className="stat-card group hover:border-accent/40 hover:bg-white/10 transition-all duration-500">
                                <s.icon className={`w-10 h-10 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform duration-500`} />
                                <p className={`text-4xl md:text-5xl font-extrabold ${s.color} mb-2`}>
                                    <Counter target={s.value} suffix={s.suffix} />
                                </p>
                                <p className="text-blue-300 text-sm font-medium">{s.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
