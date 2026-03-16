import { useState } from 'react'
import { Package, Truck, ShieldCheck, Tag, MapPin, X } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const routes = [
    { id: 'guatemala', name: 'Ciudad de Guatemala', phone: '50255683682' },
    { id: 'huehue', name: 'Huehuetenango', phone: '50252713803' },
    { id: 'chimaltenango', name: 'Chimaltenango', phone: '50237223693' },
    { id: 'peten', name: 'Petén', phone: '50231583067' }
]

export default function PromosSection() {
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handlePackageClick = (pkgName, pkgPrice, pkgQty) => {
        setSelectedPackage({ name: pkgName, price: pkgPrice, qty: pkgQty })
        setIsModalOpen(true)
    }

    const handleRouteSelect = (route) => {
        if (!selectedPackage) return
        
        const message = `Hola! 👋 Me interesa el paquete "${selectedPackage.name}" (${selectedPackage.qty} guías por Q${selectedPackage.price} c/u) para envíos hacia *${route.name}*. ¿Me pueden dar más info?`
        const url = `https://api.whatsapp.com/send?phone=${route.phone}&text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
        setIsModalOpen(false)
    }

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
                                Enviamos tu carga
                            </span>
                        </h2>
                        <p className="text-xl text-blue-200 uppercase font-semibold tracking-wider">
                            Recolección y entrega el mismo día.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Linear Layout: Offers Stacked */}
                <div className="space-y-6 lg:space-y-8 mb-16">
                    {/* Oferta 1: 20 guías */}
                    <ScrollReveal delay={100}>
                        <button 
                            onClick={() => handlePackageClick('¡Pensando en Vos!', 25, 20)}
                            className="w-full text-left glass rounded-3xl p-6 md:p-8 border border-white/10 hover:border-lime-400/50 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-6 cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(163,230,53,0.2)]"
                        >
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-lime-400/10 rounded-full blur-3xl group-hover:bg-lime-400/30 transition-all duration-500" />
                            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0a1035] to-[#060b22] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-lime-400/30 transition-all duration-500">
                                <Package className="w-12 h-12 text-lime-400 group-hover:animate-bounce" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider group-hover:bg-lime-400/20 transition-colors">
                                    Ideal para Iniciar
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase group-hover:text-lime-400 transition-colors">Paquete ¡Pensando en Vos!</h3>
                                <p className="text-blue-300">Da el primer paso para realizar tus envíos de forma inteligente.</p>
                            </div>
                            <div className="text-center md:text-right md:border-l border-white/10 md:pl-8">
                                <div className="text-4xl font-black text-white mb-1"><span className="text-2xl text-lime-400 mr-1">Q</span>25.00 <span className="text-lg text-blue-300 font-medium">c/u</span></div>
                                <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 text-white rounded-lg font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(62,198,224,0.2)]">
                                    ¡20 GUÍAS!
                                </div>
                                <div className="mt-3 text-xs text-lime-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center md:justify-end gap-1">
                                    Seleccionar Ruta &rarr;
                                </div>
                            </div>
                        </button>
                    </ScrollReveal>

                    {/* Oferta 2: 25 guías */}
                    <ScrollReveal delay={150}>
                        <button 
                            onClick={() => handlePackageClick('Basic', 25, 25)}
                            className="w-full text-left glass rounded-3xl p-6 md:p-8 border border-white/10 hover:border-lime-400/50 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-6 cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(163,230,53,0.2)]"
                        >
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-lime-400/10 rounded-full blur-3xl group-hover:bg-lime-400/30 transition-all duration-500" />
                            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0a1035] to-[#060b22] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-lime-400/30 transition-all duration-500">
                                <Package className="w-12 h-12 text-lime-400 group-hover:animate-bounce" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider group-hover:bg-lime-400/20 transition-colors">
                                    Nivel 1
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase group-hover:text-lime-400 transition-colors">Paquete Basic</h3>
                                <p className="text-blue-300">Perfecto para empezar a enviar de forma recurrente y segura.</p>
                            </div>
                            <div className="text-center md:text-right md:border-l border-white/10 md:pl-8">
                                <div className="text-4xl font-black text-white mb-1"><span className="text-2xl text-lime-400 mr-1">Q</span>25.00 <span className="text-lg text-blue-300 font-medium">c/u</span></div>
                                <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 text-white rounded-lg font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(62,198,224,0.2)]">
                                    ¡25 GUÍAS!
                                </div>
                                <div className="mt-3 text-xs text-lime-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center md:justify-end gap-1">
                                    Seleccionar Ruta &rarr;
                                </div>
                            </div>
                        </button>
                    </ScrollReveal>

                    {/* Oferta 3: 35 guías */}
                    <ScrollReveal delay={200}>
                        <button 
                            onClick={() => handlePackageClick('Plus', 20, 35)}
                            className="w-full text-left glass rounded-3xl p-6 md:p-8 border-2 border-lime-400/50 hover:border-lime-400 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(163,230,53,0.15)] cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(163,230,53,0.4)]"
                        >
                            <div className="absolute right-0 top-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl group-hover:bg-lime-400/30 transition-all duration-500" />
                            {/* Popular Badge */}
                            <div className="absolute top-0 right-8 md:right-12 bg-lime-400 text-[#070b24] text-xs font-black px-4 py-1 rounded-b-lg tracking-wider uppercase shadow-lg">
                                Más Popular
                            </div>
                            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0a1035] to-[#060b22] border border-lime-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)] group-hover:scale-110 group-hover:border-lime-400 transition-all duration-500">
                                <Package className="w-12 h-12 text-lime-400 group-hover:animate-bounce" />
                            </div>
                            <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                                <span className="inline-block px-3 py-1 bg-lime-400/20 text-lime-400 text-xs font-black rounded-full mb-3 uppercase tracking-wider transition-colors">
                                    Nivel 2 (Buen Precio)
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase group-hover:text-lime-400 transition-colors">Paquete Plus</h3>
                                <p className="text-blue-300">El equilibrio perfecto entre cantidad de guías y un excelente precio.</p>
                            </div>
                            <div className="text-center md:text-right md:border-l border-white/10 md:pl-8 z-10">
                                <div className="text-4xl font-black text-white mb-1"><span className="text-2xl text-lime-400 mr-1">Q</span>20.00 <span className="text-lg text-blue-300 font-medium">c/u</span></div>
                                <div className="inline-block px-4 py-1.5 bg-lime-400 border border-lime-400 text-[#070b24] rounded-lg font-black text-sm tracking-widest shadow-[0_0_15px_rgba(163,230,53,0.4)]">
                                    ¡35 GUÍAS!
                                </div>
                                <div className="mt-3 text-xs text-lime-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center md:justify-end gap-1">
                                    Seleccionar Ruta &rarr;
                                </div>
                            </div>
                        </button>
                    </ScrollReveal>

                    {/* Oferta 4: 40 guías */}
                    <ScrollReveal delay={250}>
                        <button 
                            onClick={() => handlePackageClick('¡Ponete Pilas!', 20, 40)}
                            className="w-full text-left glass rounded-3xl p-6 md:p-8 border border-accent/40 hover:border-accent transition-all group relative overflow-hidden flex flex-col md:flex-row items-center gap-6 cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(62,198,224,0.3)]"
                        >
                            <div className="absolute right-0 top-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/40 transition-all duration-500" />
                            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-[#0a1035] to-[#060b22] border border-accent/40 flex items-center justify-center shadow-[0_0_15px_rgba(62,198,224,0.3)] group-hover:scale-110 group-hover:border-accent transition-all duration-500">
                                <Package className="w-12 h-12 text-accent group-hover:animate-bounce" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-3 uppercase tracking-wider group-hover:bg-accent/20 transition-colors">
                                    Nivel 3 (Máximo Ahorro)
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase group-hover:text-accent transition-colors">Paquete ¡Ponete Pilas!</h3>
                                <p className="text-blue-300">El máximo ahorro para emprendedores exigentes y alta demanda.</p>
                            </div>
                            <div className="text-center md:text-right md:border-l border-white/10 md:pl-8 z-10">
                                <div className="text-4xl font-black text-white mb-1"><span className="text-2xl text-accent mr-1">Q</span>20.00 <span className="text-lg text-blue-300 font-medium">c/u</span></div>
                                <div className="inline-block px-4 py-1.5 bg-accent border border-accent text-[#070b24] rounded-lg font-black text-sm tracking-widest shadow-[0_0_15px_rgba(62,198,224,0.3)]">
                                    ¡40 GUÍAS!
                                </div>
                                <div className="mt-3 text-xs text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center md:justify-end gap-1">
                                    Seleccionar Ruta &rarr;
                                </div>
                            </div>
                        </button>
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
                                    <h4 className="text-white font-bold mb-1">Recolección y Entrega el Mismo Día</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">Pasamos a recolectar tu paquete a la puerta de tu casa o negocio y lo entregamos directamente en las manos de tu cliente rápidamente.</p>
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

                {/* Modales CTA and Custom Modal logic */}
                <ScrollReveal delay={400}>
                    <div className="mt-12 text-center">
                        <p className="text-blue-200 mb-4 font-medium">Haz click en cualquiera de los paquetes arriba para seleccionar tu ruta y redirigir a WhatsApp.</p>
                    </div>
                </ScrollReveal>
            </div>

            {/* Modal for Route Selection */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#060b22]/90 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative glass border border-white/10 bg-gradient-to-br from-[#0a1035] to-[#060b22] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(163,230,53,0.1)] animate-in zoom-in duration-300">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-lime-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-lime-400/20 shadow-[0_0_20px_rgba(163,230,53,0.15)]">
                                <MapPin className="w-8 h-8 text-lime-400" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Selecciona tu Ruta</h3>
                            <p className="text-blue-200">
                                Estás eligiendo el <strong className="text-lime-400 text-lg uppercase tracking-wider block mt-2 mb-2 font-black">Paquete {selectedPackage?.name}</strong> ¿Hacia dónde envías principalmente?
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {routes.map((route) => (
                                <button
                                    key={route.id}
                                    onClick={() => handleRouteSelect(route)}
                                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:border-lime-400/50 hover:bg-lime-400/10 transition-all group flex items-center justify-between"
                                >
                                    <span className="font-bold text-slate-300 group-hover:text-white">{route.name}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-lime-400 flex items-center gap-2 text-sm font-black tracking-wider">
                                        Continuar
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
