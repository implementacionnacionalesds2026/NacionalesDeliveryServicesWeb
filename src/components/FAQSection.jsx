import { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const faqs = [
    {
        q: '¿Cuánto cuesta enviar un paquete?',
        a: 'Nuestros precios inician desde Q25 para envíos dentro de la Ciudad de Guatemala y desde Q35 para envíos departamentales (Huehuetenango, Chimaltenango, Petén). Contáctanos para una cotización personalizada.',
    },
    {
        q: '¿Cuánto tarda un envío de Guatemala a Huehuetenango?',
        a: 'Los envíos regulares tardan entre 24-48 horas. Ofrecemos también servicio express que puede llegar el mismo día o al día siguiente.',
    },
    {
        q: '¿Hacen recolección a domicilio?',
        a: 'Sí, ofrecemos servicio de recolección en toda la Ciudad de Guatemala (Villa Canales, San Miguel Petapa, Villa Nueva y alrededores) y en las zonas de Huehuetenango.',
    },
    {
        q: '¿Cómo puedo rastrear mi paquete?',
        a: 'Te proporcionamos un número de guía al momento del envío. Puedes rastrearlo ingresando tu guía en nuestra sección de rastreo o contactándonos por WhatsApp.',
    },
    {
        q: '¿Qué puedo enviar?',
        a: 'Aceptamos paquetes, documentos, cajas, y mercadería general. Para artículos frágiles o de valor, ofrecemos empaque protector adicional.',
    },
    {
        q: '¿Tienen sucursales?',
        a: 'Sí, nuestra oficina principal está en 3a Calle A9-21, Zona 21, Ciudad de Guatemala. También tenemos punto de recepción en 4ta Calle Zona 9, Zaculei Central, Huehuetenango.',
    },
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section className="py-24 relative" style={{ background: '#0a1035' }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <HelpCircle className="w-4 h-4" /> Preguntas Frecuentes
                        </div>
                        <h2 className="section-title">
                            ¿Tienes <span className="gradient-text">preguntas?</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <ScrollReveal key={i} delay={i * 60}>
                            <div className="glass rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="text-white font-semibold pr-4">{faq.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                                    <p className="px-5 pb-5 text-blue-300 text-sm leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
