import { MapPin, ArrowRight, Phone } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const WhatsAppIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

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
        phone: '3158‑3067',
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
                                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Municipios y zonas que atendemos</p>
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
                                            href={`https://api.whatsapp.com/send?phone=502${route.phone.replace(/[‑\s]/g, '')}&text=${encodeURIComponent(`Hola! 👋 Quiero cotizar un envío de Guatemala a ${route.to} 📦`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-accent/30 bg-accent/5 text-accent hover:bg-accent/20 transition-all font-bold text-sm"
                                        >
                                            <WhatsAppIcon className="w-4 h-4" />
                                            Quiero Cotizar
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
