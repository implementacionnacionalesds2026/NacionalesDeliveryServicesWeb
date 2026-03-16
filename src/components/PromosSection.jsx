import { Package, Truck, ShieldCheck, Tag } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function PromosSection() {
    return (
        <section id="promociones" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#060b22] to-[#0a1035]">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-accent/10 rounded-full blur-[100px]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-lime-400 font-bold mb-6 border border-lime-400/20 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                            <Tag className="w-4 h-4 fill-lime-400" /> ¡PROMOCIÓN ESPECIAL!
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-6 leading-tight">
                            Promos del mes: <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500">
                                Paquetes pensados para vos
                            </span>
                        </h2>
                        <p className="text-xl text-blue-200">
                            Ahorra tiempo y dinero con nuestras guías prepagadas.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Linear Layout: Offers Stacked */}
                <div className="space-y-6 lg:space-y-8 mb-16">
                    {/* Oferta 1 */}
                    <ScrollReveal delay={100}>
                        <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 hover:border-lime-400/30 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-lime-400/10 rounded-full blur-3xl group-hover:bg-lime-400/20 transition-all duration-500" />
                            
                            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0a1035] to-[#060b22] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                                <Package className="w-12 h-12 text-lime-400" />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                                    Nivel 1
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase">Paquete ¡Pensando en Vos!</h3>
                                <p className="text-blue-300">Perfecto para empezar a enviar de forma inteligente.</p>
                            </div>

                            <div className="text-center md:text-right md:border-l border-white/10 md:pl-8">
                                <div className="text-4xl font-black text-white mb-1"><span className="text-2xl text-lime-400 mr-1">Q</span>25.00 <span className="text-lg text-blue-300 font-medium">c/u</span></div>
                                <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 text-white rounded-lg font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(62,198,224,0.2)]">
                                    ¡20 GUÍAS!
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Oferta 2 */}
                    <ScrollReveal delay={200}>
                        <div className="glass rounded-3xl p-6 md:p-8 border-2 border-accent/40 hover:border-accent transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(62,198,224,0.1)]">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
                            
                            {/* Popular Badge */}
                            <div className="absolute top-0 right-8 md:right-12 bg-accent text-[#070b24] text-xs font-black px-4 py-1 rounded-b-lg tracking-wider uppercase shadow-lg">
                                Más Popular
                            </div>

                            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0a1035] to-[#060b22] border border-accent/30 flex items-center justify-center shadow-[0_0_20px_rgba(62,198,224,0.3)] group-hover:scale-110 transition-transform duration-500">
                                <Package className="w-12 h-12 text-accent" />
                            </div>

                            <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                                    Nivel 2 (Mejor Precio)
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase">Paquete ¡Ponete Pilas!</h3>
                                <p className="text-blue-300">El máximo ahorro para potenciar tus envíos.</p>
                            </div>

                            <div className="text-center md:text-right md:border-l border-white/10 md:pl-8">
                                <div className="text-4xl font-black text-white mb-1"><span className="text-2xl text-accent mr-1">Q</span>20.00 <span className="text-lg text-blue-300 font-medium">c/u</span></div>
                                <div className="inline-block px-4 py-1.5 bg-lime-400 border border-lime-400 text-[#070b24] rounded-lg font-black text-sm tracking-widest shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                                    ¡40 GUÍAS!
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Linear Layout: Benefits Stacked Below */}
                <ScrollReveal delay={300}>
                    <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">Beneficios Incluidos</h3>
                        
                        <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <Truck className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Servicio Puerta a Puerta</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">Pasamos a recolectar tu paquete a la puerta de tu casa o negocio y lo entregamos directamente en las manos de tu cliente.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Cero Costos Ocultos</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed"><span className="text-accent font-semibold">¡No se cobra extra!</span> Ni por la recolección inicial, ni por la devolución de paquetes en caso de que ocurra.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* CTA Button */}
                <ScrollReveal delay={400}>
                    <div className="mt-12 text-center">
                        <a 
                            href="https://api.whatsapp.com/send?phone=50255683682&text=Hola! 👋 Me interesan los paquetes de Guías Prepago (Promo del Mes). ¿Me pueden dar más info?" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-lime-400 text-[#070b24] rounded-xl font-black text-lg hover:bg-lime-300 transition-all shadow-[0_0_30px_rgba(163,230,53,0.3)] hover:scale-105"
                        >
                            <Package className="w-5 h-5" />
                            Adquirir mi Paquete de Guías
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
