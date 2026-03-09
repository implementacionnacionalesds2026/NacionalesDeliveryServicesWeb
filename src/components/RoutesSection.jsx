import { MapPin, ArrowLeftRight, Truck, Bike, Car } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const routes = [
    {
        from: 'Guatemala',
        to: 'Huehuetenango',
        places: ['Chiantla', 'Malacatancito', 'Piedras Negras', 'San Sebastián', 'San Lorenzo', 'Chinaca'],
        phone: '5271‑3803',
        icon: Truck,
        img: '/images/truck-3d.png',
        price: 'Desde Q35',
        address: '4ta Calle Zona 9, Zaculei Central',
    },
    {
        from: 'Guatemala',
        to: 'Chimaltenango',
        places: ['Tecpán', 'Chimaltenango centro', 'San Martín Jilotepeque'],
        phone: '3722‑3693',
        icon: Car,
        img: '/images/car-3d.png',
        price: 'Desde Q35',
        address: '',
    },
    {
        from: 'Guatemala',
        to: 'Petén',
        places: ['San Benito', 'Santa Elena-Flores', 'San José', 'San Andrés', 'Sacpuy', 'San Antonio', 'Belén', 'Purusila', 'Santa Ana', 'El Limón', 'La Pita'],
        phone: '1358‑3067',
        icon: Bike,
        img: '/images/moto-3d.png',
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
                                {/* Header with animated vehicle */}
                                <div className="relative bg-gradient-to-br from-primary/50 to-primary-dark/50 p-6 text-center overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all" />
                                    <div className="w-24 h-24 mx-auto mb-3 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                                        <img src={route.img} alt={`${route.from} a ${route.to}`} className="w-full h-full object-contain drop-shadow-xl" />
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-xl font-bold text-white">GUATE</span>
                                        <ArrowLeftRight className="w-5 h-5 text-accent" />
                                        <span className="text-xl font-bold text-accent">{route.to.toUpperCase()}</span>
                                    </div>
                                    <p className="text-sm text-blue-200 mt-1 font-medium">{route.price}</p>
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

                                    {/* Contact */}
                                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                        <a
                                            href={`tel:${route.phone.replace(/[‑\s]/g, '')}`}
                                            className="flex items-center gap-2 text-accent hover:text-white transition-colors font-semibold text-sm"
                                        >
                                            📞 {route.phone}
                                        </a>
                                        <a
                                            href={`https://wa.me/502${route.phone.replace(/[‑\s]/g, '')}?text=Hola%21%20Quiero%20cotizar%20un%20envio%20de%20Guatemala%20a%20${encodeURIComponent(route.to)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-xl bg-green-500/20 text-green-400 text-xs font-bold hover:bg-green-500/30 transition-all"
                                        >
                                            WhatsApp 💬
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
