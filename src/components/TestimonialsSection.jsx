import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const testimonials = [
    {
        name: 'María López',
        location: 'Huehuetenango',
        text: 'Excelente servicio. Mi paquete llegó de Guatemala a Huehuetenango en tiempo récord y en perfecto estado. ¡Muy recomendados!',
        rating: 5,
        route: 'Guate → Huehue',
    },
    {
        name: 'Carlos Mendoza',
        location: 'Petén',
        text: 'Siempre confío en Nacionales Delivery para enviar paquetes a mi familia en Petén. Precio accesible y servicio confiable.',
        rating: 5,
        route: 'Guate → Petén',
    },
    {
        name: 'Ana Pérez',
        location: 'Chimaltenango',
        text: 'El rastreo en tiempo real me da mucha tranquilidad. Sé exactamente en qué parte del camino va mi paquete. Gracias NDS!',
        rating: 5,
        route: 'Guate → Chimaltenango',
    },
    {
        name: 'Roberto García',
        location: 'Guatemala',
        text: 'Como negocio, el servicio de recolección es fundamental. Me recogen los paquetes y los entregan sin complicaciones. Excelente.',
        rating: 5,
        route: 'Recolección en Ciudad de Guatemala',
    },
]

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0)

    const next = () => setCurrent((p) => (p + 1) % testimonials.length)
    const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)

    const t = testimonials[current]

    return (
        <section id="nosotros" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <Star className="w-4 h-4" /> Testimonios
                        </div>
                        <h2 className="section-title">
                            Lo que dicen <span className="gradient-text">nuestros clientes</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="glass rounded-3xl p-8 md:p-12 relative">
                        <Quote className="absolute top-6 right-6 w-12 h-12 text-accent/10" />

                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(t.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>

                        <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-6 italic">
                            "{t.text}"
                        </p>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold text-lg">{t.name}</p>
                                <p className="text-blue-300 text-sm">{t.location}</p>
                                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                                    {t.route}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prev}
                                    className="w-10 h-10 rounded-xl glass flex items-center justify-center
                             hover:bg-accent/20 hover:text-accent transition-all"
                                    aria-label="Anterior"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-10 h-10 rounded-xl glass flex items-center justify-center
                             hover:bg-accent/20 hover:text-accent transition-all"
                                    aria-label="Siguiente"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-accent' : 'bg-white/20'
                                        }`}
                                    aria-label={`Testimonio ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
