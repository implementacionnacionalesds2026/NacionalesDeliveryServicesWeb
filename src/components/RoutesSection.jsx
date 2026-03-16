import { useState } from 'react'
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
        to: 'Ciudad de Guatemala',
        places: [
            'Zona 1', 'Zona 2', 'Zona 3', 'Zona 4', 'Zona 5', 'Zona 6', 'Zona 7', 'Zona 8', 'Zona 9', 'Zona 10',
            'Zona 11', 'Zona 12', 'Zona 13', 'Zona 14', 'Zona 15', 'Zona 16', 'Zona 17', 'Zona 18', 'Zona 19', 'Zona 21', 'Zona 24', 'Zona 25',
            'Villa Nueva', 'Mixco', 'Amatitlán', 'San Miguel Petapa', 'Villa Canales',
            'S. José Pinula', 'St. Catarina Pinula', 'Fraijanes', 'Chinautla', 'Palencia',
            'S. José del Golfo', 'S. Pedro Ayampuc', 'S. Juan Sacatepéquez', 'S. Pedro Sacatepéquez',
            'San Raymundo', 'Chuarrancho', 'Palín (Esc)', 'San Lucas Sac.'
        ],
        phone: '5568-3682',
        price: 'Desde Q25',
        address: '3a Calle A9-21, Zona 21, Ciudad de Guatemala',
    },
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
        places: [
            'San Benito', 'Santa Elena', 'Ciudad Flores', 'San José', 'San Andrés', 'Sacpuy', 'San Antonio', 'Belén', 'Purusila', 'Santa Ana', 'El Limón', 'La Pita',
            'La Libertad', 'San Francisco', 'Dolores', 'San Luis', 'Sayaxché', 'Melchor de Mencos', 'Poptún', 'Las Cruces', 'El Chal',
            'Ixpanpajul', 'Remate', 'Ixlú', 'Uaxactún', 'Tikal'
        ],
        phone: '3158‑3067',
        price: 'Desde Q35',
        address: '',
    },
]

export default function RoutesSection() {
    const [selections, setSelections] = useState({}) // { 'Ciudad de Guatemala': { origin: 'Zona 1', dest: 'Palin' } }

    const handlePlaceClick = (routeTo, place) => {
        setSelections(prev => {
            const current = prev[routeTo] || { origin: null, dest: null }

            // Toggle Logic:
            // 1. If clicked place is current origin -> Clear ALL (since dest depends on origin)
            if (current.origin === place) {
                return { ...prev, [routeTo]: { origin: null, dest: null } }
            }

            // 2. If clicked place is current destination -> Clear only destination
            if (current.dest === place) {
                return { ...prev, [routeTo]: { ...current, dest: null } }
            }

            // 3. Selection flow:
            // - If no origin OR both already selected -> Start fresh with origin
            if (!current.origin || (current.origin && current.dest)) {
                return { ...prev, [routeTo]: { origin: place, dest: null } }
            }

            // - If has origin but no dest -> Set as destination
            return { ...prev, [routeTo]: { ...current, dest: place } }
        })
    }

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
                        <ScrollReveal key={route.to} delay={i * 150} className={i === 0 ? 'lg:col-span-3' : ''}>
                            <div className="glass rounded-3xl overflow-hidden group hover:border-accent/40 transition-all duration-500 h-full flex flex-col">
                                {/* Header with cleaner route display */}
                                <div className={`relative bg-gradient-to-br from-primary/30 to-primary-dark/30 p-8 text-center overflow-hidden ${i === 0 ? 'md:py-12' : ''}`}>
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/15 transition-all" />

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase opacity-70">Ruta Directa</span>
                                        <div className="flex items-center justify-center gap-4 my-2">
                                            <span className={`${i === 0 ? 'text-3xl md:text-5xl' : 'text-3xl'} font-black text-white tracking-tight`}>{route.to.toUpperCase()}</span>
                                        </div>
                                        <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-blue-200 text-sm font-bold mt-2">
                                            {route.price}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 md:px-8 mt-6">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/20">
                                        <MapPin className="w-4 h-4 text-lime-400 animate-bounce" />
                                        <p className="text-sm font-bold text-white tracking-wide">
                                            {selections[route.to]?.origin && selections[route.to]?.dest
                                                ? (
                                                    <span>
                                                        Desde <span className="text-lime-400">{selections[route.to].origin}</span> a <span className="text-lime-400">{selections[route.to].dest}</span>
                                                    </span>
                                                )
                                                : selections[route.to]?.origin
                                                    ? (
                                                        <span>
                                                            Desde: <span className="text-lime-400">{selections[route.to].origin}</span> ...
                                                        </span>
                                                    )
                                                    : 'Selecciona tu ruta para cotizar'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Places */}
                                <div className={`p-6 ${i === 0 ? 'md:p-8' : ''} flex-1 flex flex-col`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs font-semibold text-accent uppercase tracking-wider">Municipios y zonas que atendemos</p>
                                    </div>

                                    <div className="overflow-y-auto max-h-[160px] custom-scrollbar pr-2 mb-6 transform-gpu">
                                        <div className="flex flex-wrap gap-2">
                                            {route.places.map((p) => {
                                                const sel = selections[route.to] || {}
                                                const isOrigin = sel.origin === p
                                                const isDest = sel.dest === p

                                                return (
                                                    <button
                                                        key={p}
                                                        onClick={() => handlePlaceClick(route.to, p)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize whitespace-nowrap flex items-center gap-1.5
                                                            ${isOrigin
                                                                ? 'bg-accent/20 border-accent text-white shadow-[0_0_12px_rgba(62,198,224,0.3)] ring-1 ring-accent/50'
                                                                : isDest
                                                                    ? 'bg-purple-500/20 border-purple-400 text-white shadow-[0_0_12px_rgba(192,132,252,0.3)] ring-1 ring-purple-400/50'
                                                                    : 'bg-white/5 text-blue-200 border-white/10 hover:border-accent/40 hover:text-white'
                                                            }`}
                                                    >
                                                        {isOrigin && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                                                        {isDest && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />}
                                                        {p}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className={`mt-auto grid gap-3 pt-6 border-t border-white/10 ${i === 0 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                                        <a
                                            href={`tel:${route.phone.replace(/[‑\s]/g, '')}`}
                                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-all font-bold text-sm"
                                        >
                                            <Phone className="w-4 h-4 text-accent" />
                                            Llamar al {route.phone}
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=502${route.phone.replace(/[‑\s]/g, '').replace(/-/g, '')}&text=${encodeURIComponent(
                                                selections[route.to]?.origin && selections[route.to]?.dest
                                                    ? `Hola! 👋 Quiero cotizar un envío en ${route.to === 'Ciudad de Guatemala' ? 'la ciudad' : 'el departamento'} de ${route.to} de ${selections[route.to].origin} a ${selections[route.to].dest} 📦`
                                                    : selections[route.to]?.origin
                                                        ? `Hola! 👋 Quiero cotizar un envío desde ${selections[route.to].origin} en la ruta ${route.to} 📦`
                                                        : `Hola! 👋 Quiero cotizar un envío de Guatemala a ${route.to} 📦`
                                            )}`}
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
