import { useState } from 'react'
import { Search, Package, Truck, CheckCircle, MapPin, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from './ScrollReveal'

const mockTimeline = [
    { icon: Package, label: 'Paquete recibido', location: 'Guatemala, Zona 21', time: '08:30 AM', done: true },
    { icon: Truck, label: 'En tránsito', location: 'Carretera Interamericana', time: '10:15 AM', done: true },
    { icon: MapPin, label: 'Centro de distribución', location: 'Chimaltenango', time: '12:45 PM', done: true },
    { icon: CheckCircle, label: 'Entregado', location: 'Tecpán, Chimaltenango', time: '02:30 PM', done: false },
]

export default function TrackingSection() {
    const [guia, setGuia] = useState('')
    const [showTimeline, setShowTimeline] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleTrack = (e) => {
        e.preventDefault()
        if (!guia.trim()) {
            toast.error('Ingresa tu número de guía')
            return
        }
        setLoading(true)
        setShowTimeline(false)
        setTimeout(() => {
            setLoading(false)
            setShowTimeline(true)
            toast.success('¡Guía encontrada! 📦')
        }, 1500)
    }

    return (
        <section id="rastreo" className="py-24 relative" style={{ background: '#0a1035' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <Search className="w-4 h-4" /> Rastreo de Paquetes
                        </div>
                        <h2 className="section-title">
                            <span className="gradient-text">Rastrea</span> tu paquete
                        </h2>
                        <p className="section-subtitle">
                            Ingresa tu número de guía y conoce el estado de tu envío en tiempo real.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="glass rounded-3xl p-8 md:p-12">
                        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 mb-8">
                            <div className="flex-1 relative">
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                <input
                                    type="text"
                                    value={guia}
                                    onChange={(e) => setGuia(e.target.value)}
                                    placeholder="Ej: NDS-2026-00123"
                                    className="input-field !pl-12"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary !rounded-xl shrink-0 disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Buscando...
                                    </span>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" /> Rastrear
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Timeline */}
                        {showTimeline && (
                            <div className="space-y-0">
                                {mockTimeline.map((step, i) => (
                                    <div
                                        key={i}
                                        className="timeline-step animate-fade-up"
                                        style={{ animationDelay: `${i * 150}ms` }}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step.done
                                                    ? 'bg-accent/20 text-accent'
                                                    : 'bg-white/10 text-blue-300'
                                                }`}
                                        >
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <div className="pb-6">
                                            <p className={`font-semibold ${step.done ? 'text-white' : 'text-blue-400'}`}>
                                                {step.label}
                                            </p>
                                            <p className="text-blue-300 text-sm">{step.location}</p>
                                            <div className="flex items-center gap-1 mt-1 text-xs text-blue-400">
                                                <Clock className="w-3 h-3" /> {step.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!showTimeline && !loading && (
                            <div className="text-center text-blue-400 text-sm py-8">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                Ingresa tu número de guía para ver el estado de tu envío
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
