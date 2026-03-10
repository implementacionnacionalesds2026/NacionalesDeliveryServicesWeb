import { ArrowRight, Phone, Sparkles } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: '#0a1035' }}>
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="glass rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                        <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" />

                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                            ¿Listo para enviar
                            <span className="gradient-text"> tu paquete?</span>
                        </h2>

                        <p className="text-blue-200 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                            Cotiza tu envío ahora y recibe atención personalizada. ¡Conectamos todo Guatemala, paquete a paquete! 🇬🇹
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://wa.me/5025683668?text=Hola%21%20Quiero%20cotizar%20un%20envio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary !text-lg"
                            >
                                Cotizar Envío <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="tel:5683668" className="btn-secondary !text-lg">
                                <Phone className="w-5 h-5" /> Llamar Ahora
                            </a>
                        </div>

                        <p className="text-blue-400 text-sm mt-6">
                            📞 5683-668 / 5271-3803 • 📧 implementacionnacionalesds@gmail.com
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
