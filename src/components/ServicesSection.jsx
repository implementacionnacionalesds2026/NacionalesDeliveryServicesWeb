import { Package, Truck, MapPin, Clock, Shield, Bike, Users, Building2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const services = [
    {
        icon: Truck,
        title: 'Envío Nacional',
        desc: 'Envíos seguros desde Guatemala a Huehuetenango, Chimaltenango, Petén y más destinos.',
        color: 'from-blue-500 to-primary',
    },
    {
        icon: Bike,
        title: 'Mensajería Express',
        desc: 'Servicio de recolección y entrega rápida. Recolección en toda la Ciudad de Guatemala.',
        color: 'from-accent to-accent-dark',
    },
    {
        icon: Shield,
        title: 'Paquetería Segura',
        desc: 'Manejo con cuidado y empaque protector. Tu paquete llega como lo enviaste.',
        color: 'from-emerald-400 to-emerald-600',
    },
    {
        icon: Clock,
        title: 'Entregas Programadas',
        desc: 'Programa la fecha y hora de entrega. Nos adaptamos a tu horario.',
        color: 'from-amber-400 to-orange-500',
    },
    {
        icon: Building2,
        title: 'Logística Empresarial',
        desc: 'Soluciones logísticas para empresas. Tarifas preferenciales y facturación.',
        color: 'from-rose-400 to-pink-600',
    },
]

export default function ServicesSection() {
    return (
        <section id="servicios" className="py-24 relative" style={{ background: '#0a1035' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <Package className="w-4 h-4" /> Nuestros Servicios
                        </div>
                        <h2 className="section-title">
                            Todo lo que necesitas para{' '}
                            <span className="gradient-text">enviar y recibir</span>
                        </h2>
                        <p className="section-subtitle">
                            Ofrecemos una gama completa de servicios de paquetería y mensajería para conectar Guatemala.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <ScrollReveal key={s.title} delay={i * 100}>
                            <div className="service-card group h-full">
                                {/* Gradient orb */}
                                <div
                                    className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.color}
                              opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}
                                />

                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center
                              mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                                >
                                    <s.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                    {s.title}
                                </h3>
                                <p className="text-blue-300 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
