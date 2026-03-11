import { Target, Eye, Award, Shield, Users } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function AboutSection() {
    return (
        <section id="nosotros" className="py-24 relative overflow-hidden" style={{ background: '#05081a' }}>
            {/* Background elements to match overall theme */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <Users className="w-4 h-4" /> Sobre Nosotros
                        </div>
                        <h2 className="section-title">
                            Nuestra <span className="gradient-text">Esencia y Compromiso</span>
                        </h2>
                        <p className="section-subtitle">
                            En Nacionales Delivery Services, no solo movemos paquetes, conectamos corazones y oportunidades en cada rincón de Guatemala.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Mission Card */}
                    <ScrollReveal delay={100}>
                        <div className="glass rounded-3xl p-8 md:p-10 h-full border border-white/10 hover:border-accent/30 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-accent to-primary opacity-50" />

                            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 group-hover:text-accent transition-colors">
                                Misión
                            </h3>

                            <p className="text-blue-200 text-lg leading-relaxed font-light">
                                Brindar soluciones de logística y transporte de paquetería con los más altos estándares de <span className="text-white font-medium">rapidez, seguridad y confianza</span>. Facilitamos el crecimiento de nuestros clientes conectando Guatemala de manera eficiente, apoyados en tecnología innovadora y un equipo humano apasionado por el servicio.
                            </p>

                            <div className="mt-auto pt-8 w-full flex gap-4 text-accent/60">
                                <Shield className="w-5 h-5" />
                                <div className="h-px flex-1 bg-white/10 self-center" />
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Vision Card */}
                    <ScrollReveal delay={300}>
                        <div className="glass rounded-3xl p-8 md:p-10 h-full border border-white/10 hover:border-primary-light/30 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-primary-light to-blue-600 opacity-50" />

                            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 group-hover:text-primary-light transition-colors">
                                Visión
                            </h3>

                            <p className="text-blue-200 text-lg leading-relaxed font-light">
                                Convertirnos en la <span className="text-white font-medium">empresa líder en servicios de entrega</span> a nivel nacional, siendo reconocidos por nuestra integridad, puntualidad y calidez humana. Aspiramos a ser el motor que impulse el comercio y la comunicación en cada departamento, transformando la logística en una experiencia sin límites ni fronteras.
                            </p>

                            <div className="mt-auto pt-8 w-full flex gap-4 text-primary-light/60">
                                <div className="h-px flex-1 bg-white/10 self-center" />
                                <Shield className="w-5 h-5 rotate-180" />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
