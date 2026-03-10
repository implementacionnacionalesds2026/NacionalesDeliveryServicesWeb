import { MapPin, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const routes = [
    {
        from: 'Guatemala',
        to: 'Huehuetenango',
        places: ['Chiantla', 'Malacatancito', 'Piedras Negras', 'San Sebastián', 'San Lorenzo', 'Chinaca'],
        phone: '5271‑3803',
        price: 'Desde Q35',
        address: '4ta Calle Zona 9, Zaculei Central',
    },
    {
        from: 'Guatemala',
        to: 'Chimaltenango',
        places: ['Tecpán', 'Chimaltenango centro', 'San Martín Jilotepeque'],
        phone: '3722‑3693',
        price: 'Desde Q35',
        address: '',
    },
    {
        from: 'Guatemala',
        to: 'Petén',
        places: ['San Benito', 'Santa Elena-Flores', 'San José', 'San Andrés', 'Sacpuy', 'San Antonio', 'Belén', 'Purusila', 'Santa Ana', 'El Limón', 'La Pita'],
        phone: '1358‑3067',
        price: 'Desde Q35',
        address: '',
    },
]

export default function RoutesSection() {
    return (
        <section id="rutas" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-50" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <MapPin className="w-4 h-4" /> Nuestras Rutas
                        </div>
                        <h2 className="section-title">
                            Conectamos <span className="gradient-text">todo Guatemala</span>
                        </h2>
                        <p className="section-subtitle">
                            Servicio de recolección y entrega puerta a puerta. Rapidez que nos une.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-3 gap-8">
                    {routes.map((route, i) => (
                        <ScrollReveal key={route.to} delay={i * 150}>
                            <div className="glass rounded-3xl overflow-hidden group hover:border-accent/40 transition-all duration-500 h-full flex flex-col">
                                {/* Header with cleaner route display */}
                                <div className="relative bg-gradient-to-br from-primary/30 to-primary-dark/30 p-8 text-center overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/15 transition-all" />

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase opacity-70">Ruta Directa</span>
                                        <div className="flex items-center justify-center gap-4 my-2">
                                            <span className="text-3xl font-black text-white tracking-tight">{route.to.toUpperCase()}</span>
                                        </div>
                                        <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-blue-200 text-sm font-bold mt-2">
                                            {route.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Places */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Aldeas y zonas que atendemos</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {route.places.map((p) => (
                                            <span
                                                key={p}
                                                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-blue-200 border border-white/10 hover:border-accent/40 hover:text-white transition-all"
                                            >
                                                {p}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-auto grid grid-cols-1 gap-3 pt-6 border-t border-white/10">
                                        <a
                                            href={`tel:${route.phone.replace(/[‑\s]/g, '')}`}
                                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-all font-bold text-sm"
                                        >
                                            <Phone className="w-4 h-4 text-accent" />
                                            Llamar al {route.phone}
                                        </a>
                                        <a
                                            href={`https://wa.me/502${route.phone.replace(/[‑\s]/g, '')}?text=Hola%21%20Quiero%20cotizar%20un%20envio%20de%20Guatemala%20a%20${encodeURIComponent(route.to)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-accent/30 bg-accent/5 text-accent hover:bg-accent/20 transition-all font-bold text-sm"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Quiero Cotizar (WhatsApp)
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
