import { useState } from 'react'
import { Package, Truck, ShieldCheck, Tag, MapPin, X, Info, Zap, Star, ChevronRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const routes = [
    { id: 'guatemala', name: 'Ciudad de Guatemala', phone: '50255683682' },
    { id: 'huehue', name: 'Huehuetenango', phone: '50252713803' },
    { id: 'chimaltenango', name: 'Chimaltenango', phone: '50237223693' },
    { id: 'peten', name: 'Petén', phone: '50231583067' }
]

const PROMO_CATEGORIES = {
    RECOLECCION: 'recoleccion',
    NORMAL: 'normal'
}

export default function PromosSection() {
    const [activeTab, setActiveTab] = useState(PROMO_CATEGORIES.RECOLECCION)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

    const handlePackageClick = (pkgName, pkgPrice, pkgQty, isRecoleccion = false) => {
        setSelectedPackage({ name: pkgName, price: pkgPrice, qty: pkgQty, isRecoleccion })
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
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-lime-400/30 text-lime-400 font-black text-xs uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(163,230,53,0.15)]">
                            <Zap className="w-3.5 h-3.5 fill-lime-400" /> Ofertas Exclusivas 2026
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase mb-6 leading-tight">
                            Nuestros Mejores <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-lime-300 to-lime-500">
                                Paquetes de Envío
                            </span>
                        </h2>
                        <p className="text-lg text-blue-200/80 max-w-2xl mx-auto font-medium">
                            Elegí el plan que mejor se adapte a tu negocio. Ahorrá tiempo y dinero con nuestras tarifas preferenciales.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Tab Navigation */}
                <div className="flex flex-col items-center mb-16 gap-4">
                    <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative">
                        <button
                            onClick={() => setActiveTab(PROMO_CATEGORIES.RECOLECCION)}
                            className={`relative px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 z-10 ${activeTab === PROMO_CATEGORIES.RECOLECCION ? 'text-[#060b22]' : 'text-blue-300 hover:text-white'
                                }`}
                        >
                            <Truck className="w-4 h-4" />
                            Recolección
                        </button>
                        <button
                            onClick={() => setActiveTab(PROMO_CATEGORIES.NORMAL)}
                            className={`relative px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 z-10 ${activeTab === PROMO_CATEGORIES.NORMAL ? 'text-[#060b22]' : 'text-blue-300 hover:text-white'
                                }`}
                        >
                            <Package className="w-4 h-4" />
                            Envíos Normales
                        </button>

                        {/* Sliding Background */}
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl transition-all duration-500 ease-out shadow-lg ${activeTab === PROMO_CATEGORIES.RECOLECCION ? 'left-1.5' : 'left-[calc(50%+4.5px)]'
                                }`}
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20 min-h-[400px]">
                    {activeTab === PROMO_CATEGORIES.RECOLECCION ? (
                        <>
                            {/* RECOLECCION PACKAGES */}
                            <ScrollReveal delay={100}>
                                <div className="group h-full">
                                    <div className="relative h-full glass border border-white/10 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:border-lime-400/50 hover:shadow-[0_20px_50px_rgba(163,230,53,0.15)] flex flex-col">
                                        <div className="absolute top-0 right-12 bg-lime-400 text-[#060b22] px-6 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            Solo Ciudad de Guatemala
                                        </div>
                                        <div className="absolute top-8 right-8 w-14 h-14 bg-lime-400/10 rounded-2xl flex items-center justify-center border border-lime-400/20 group-hover:scale-110 group-hover:bg-lime-400/20 transition-all duration-500 mt-4">
                                            <Star className="w-7 h-7 text-lime-400 fill-lime-400/20" />
                                        </div>

                                        <div className="mb-8">
                                            <span className="inline-block px-4 py-1 bg-lime-400/10 text-lime-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-lime-400/20">
                                                Plan Emprendedor
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">Paquete Basic</h3>
                                            <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs">
                                                Ideal para negocios que están escalando. Recolección segura a un precio imbatible.
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl text-lime-400 font-black">Q</span>
                                                <span className="text-6xl font-black text-white tracking-tighter">25.00</span>
                                                <span className="text-blue-300/60 font-bold ml-1 text-sm uppercase">c/u</span>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <div className="text-2xl font-black text-white mb-1">¡25 GUÍAS!</div>
                                                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Incluye Recolección</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePackageClick('Basic', 25, 25, true)}
                                            className="mt-10 w-full btn-promo-desktop py-5 rounded-2xl flex items-center justify-center gap-3 text-sm"
                                        >
                                            SOLICITAR PAQUETE <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={200}>
                                <div className="group h-full">
                                    <div className="relative h-full glass border-2 border-accent/50 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:border-accent hover:shadow-[0_20px_50px_rgba(62,198,224,0.3)] flex flex-col bg-accent/5">
                                        <div className="absolute top-0 right-12 bg-accent text-[#060b22] px-6 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            Solo Ciudad de Guatemala
                                        </div>

                                        <div className="mb-8">
                                            <span className="inline-block px-4 py-1 bg-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-accent/30">
                                                Plan Profesional
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">Paquete Plus</h3>
                                            <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs">
                                                Específicamente diseñado para Ciudad de Guatemala. Máximo ahorro y eficiencia.
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl text-accent font-black">Q</span>
                                                <span className="text-6xl font-black text-white tracking-tighter">20.00</span>
                                                <span className="text-blue-300/60 font-bold ml-1 text-sm uppercase">c/u</span>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <div className="text-2xl font-black text-white mb-1">¡35 GUÍAS!</div>
                                                <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Sólo Ciudad Capital</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePackageClick('Plus', 20, 35, true)}
                                            className="mt-10 w-full py-5 rounded-2xl bg-accent text-[#060b22] font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(62,198,224,0.4)] flex items-center justify-center gap-3"
                                        >
                                            SOLICITAR PAQUETE <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </>
                    ) : (
                        <>
                            {/* NORMAL SHIPMENT PACKAGES */}
                            <ScrollReveal delay={100}>
                                <div className="group h-full">
                                    <div className="relative h-full glass border border-white/10 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_50px_rgba(62,198,224,0.15)] flex flex-col">
                                        <div className="absolute top-0 right-12 bg-blue-500 text-white px-6 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            Todas las Rutas
                                        </div>
                                        <div className="absolute top-8 right-8 w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500 mt-4">
                                            <Package className="w-7 h-7 text-accent" />
                                        </div>

                                        <div className="mb-8">
                                            <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-accent/20">
                                                Ideal para Inicio
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">Pensando en Vos</h3>
                                            <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs">
                                                Tú dejas los paquetes, nosotros nos encargamos del resto. Envíos regulares con ahorro real.
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl text-accent font-black">Q</span>
                                                <span className="text-6xl font-black text-white tracking-tighter">25.00</span>
                                                <span className="text-blue-300/60 font-bold ml-1 text-sm uppercase">c/u</span>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <div className="text-2xl font-black text-white mb-1">¡20 GUÍAS!</div>
                                                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Envíos Normales</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePackageClick('¡Pensando en Vos!', 25, 20, false)}
                                            className="mt-10 w-full py-5 rounded-2xl bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest text-sm transition-all duration-300 hover:bg-accent hover:text-[#060b22] hover:border-accent flex items-center justify-center gap-3"
                                        >
                                            LO QUIERO <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={200}>
                                <div className="group h-full">
                                    <div className="relative h-full glass border border-white/10 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:border-yellow-400/50 hover:shadow-[0_20px_50px_rgba(250,204,21,0.15)] flex flex-col">
                                        <div className="absolute top-0 right-12 bg-yellow-400 text-[#060b22] px-6 py-2 rounded-b-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                            Todas las Rutas
                                        </div>
                                        <div className="absolute top-8 right-8 w-14 h-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center border border-yellow-400/20 group-hover:scale-110 group-hover:bg-yellow-400/20 transition-all duration-500 mt-4">
                                            <Zap className="w-7 h-7 text-yellow-400" />
                                        </div>

                                        <div className="mb-8">
                                            <span className="inline-block px-4 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-yellow-400/20">
                                                Alta Demanda
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">¡Ponete Pilas!</h3>
                                            <p className="text-blue-200/70 text-sm leading-relaxed max-w-xs">
                                                Si envías constantemente, este es tu paquete. El precio más bajo por mayor.
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl text-yellow-400 font-black">Q</span>
                                                <span className="text-6xl font-black text-white tracking-tighter">20.00</span>
                                                <span className="text-blue-300/60 font-bold ml-1 text-sm uppercase">c/u</span>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <div className="text-2xl font-black text-white mb-1">¡40 GUÍAS!</div>
                                                <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest">Envíos Normales</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePackageClick('¡Ponete Pilas!', 20, 40, false)}
                                            className="mt-10 w-full py-5 rounded-2xl bg-yellow-400 text-[#060b22] font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] flex items-center justify-center gap-3"
                                        >
                                            LO QUIERO <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </>
                    )}
                </div>

                {/* Terms and conditions link moved below cards */}
                <div className="flex justify-center mb-20 -mt-10">
                    <button 
                        onClick={() => setIsInfoModalOpen(true)}
                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-xs font-black uppercase tracking-widest group glass px-6 py-3 rounded-xl border border-yellow-400/20"
                    >
                        <Info className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Términos y Condiciones
                    </button>
                </div>

            </div>

            {/* Modal for Route Selection (Enhanced) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#060b22]/95 backdrop-blur-xl animate-in fade-in duration-500"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative glass border border-white/20 bg-[#0a1035] rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-in zoom-in slide-in-from-bottom-8 duration-500 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-[80px]" />

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-8 relative z-10">
                            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent/30 shadow-[0_0_30px_rgba(62,198,224,0.15)]">
                                <MapPin className="w-10 h-10 text-accent animate-bounce" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 uppercase">Destino del Envío</h3>
                            <p className="text-blue-200/70 text-sm">
                                Estás eligiendo el <strong className="text-accent font-black">{selectedPackage?.name}</strong>. <br />
                                Seleccioná la ruta principal para continuar.
                            </p>
                        </div>

                        <div className="grid gap-4 relative z-10">
                            {(selectedPackage?.isRecoleccion ? routes.filter(r => r.id === 'guatemala') : routes).map((route) => (
                                <button
                                    key={route.id}
                                    onClick={() => handleRouteSelect(route)}
                                    className="w-full group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    <span className="font-black text-slate-300 group-hover:text-white tracking-wider uppercase text-sm">{route.name}</span>
                                    <div className="flex items-center gap-2 text-accent font-black text-[10px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity uppercase">
                                        WhatsApp <ChevronRight className="w-3 h-3" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <p className="mt-8 text-center text-blue-300/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Se abrirá una nueva pestaña de WhatsApp
                        </p>
                    </div>
                </div>
            )}

            {/* Info Modal for T&C and Differences */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#060b22]/98 backdrop-blur-2xl animate-in fade-in duration-500"
                        onClick={() => setIsInfoModalOpen(false)}
                    />

                    <div className="relative glass border border-white/20 bg-[#0a1035] rounded-[2.5rem] p-8 sm:p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(62,198,224,0.1)] animate-in zoom-in slide-in-from-bottom-12 duration-500 overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setIsInfoModalOpen(false)}
                            className="absolute top-8 right-8 p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-10 text-center">
                            <div className="w-20 h-20 bg-lime-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-lime-400/20">
                                <Info className="w-10 h-10 text-lime-400" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Términos y Condiciones</h3>
                            <p className="text-blue-300/60 font-bold uppercase tracking-widest text-xs">Diferencias entre servicios</p>
                        </div>

                        <div className="space-y-10">
                            {/* Benefits section moved inside modal */}
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                                <div className="grid md:grid-cols-3 gap-8 items-center">
                                    <div className="md:col-span-1">
                                        <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter leading-none">
                                            Todos nuestros <br />
                                            <span className="text-accent">Planes Incluyen:</span>
                                        </h4>
                                        <p className="text-blue-200/60 text-[10px]">Estándares de calidad premium en cada envío.</p>
                                    </div>

                                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                        <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <Truck className="w-6 h-6 text-lime-400 mb-2" />
                                            <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-1">Entrega Inmediata</h5>
                                            <p className="text-blue-200/70 text-[9px] leading-tight">Recolección y entrega el mismo día.</p>
                                        </div>

                                        <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                                            <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-1">Garantía Total</h5>
                                            <p className="text-blue-200/70 text-[9px] leading-tight">Cero costos ocultos. Devoluciones incluidas.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rounded-full blur-3xl" />
                                <div className="flex items-center gap-3 mb-4">
                                    <Truck className="w-6 h-6 text-lime-400" />
                                    <h4 className="text-xl font-black text-white uppercase">Servicio de Recolección</h4>
                                </div>
                                <ul className="space-y-3 text-blue-200/80 text-sm leading-relaxed">
                                    <li className="flex gap-2">
                                        <span className="text-lime-400 font-black">•</span>
                                        <p><strong className="text-white">Ubicación:</strong> Este servicio aplica <span className="text-lime-400 font-black">ÚNICAMENTE</span> dentro de la Ciudad de Guatemala.</p>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-lime-400 font-black">•</span>
                                        <p><strong className="text-white">Funcionamiento:</strong> Nosotros pasamos a recolectar el paquete a la puerta de tu casa o negocio sin costo adicional por el viaje de recolección.</p>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-lime-400 font-black">•</span>
                                        <p><strong className="text-white">Volumen:</strong> Ideal para emprendedores y negocios que manejan un flujo constante y no pueden desplazarse.</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
                                <div className="flex items-center gap-3 mb-4">
                                    <Package className="w-6 h-6 text-accent" />
                                    <h4 className="text-xl font-black text-white uppercase">Servicio de Envíos Normales</h4>
                                </div>
                                <ul className="space-y-3 text-blue-200/80 text-sm leading-relaxed">
                                    <li className="flex gap-2">
                                        <span className="text-accent font-black">•</span>
                                        <p><strong className="text-white">Ubicación:</strong> Disponible para <span className="text-accent font-black">TODAS NUESTRAS RUTAS</span> (Peten, Huehuetenango, Chimaltenango y Capital).</p>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-accent font-black">•</span>
                                        <p><strong className="text-white">Funcionamiento:</strong> El cliente debe dejar sus paquetes en nuestros puntos de recepción establecidos para que sean procesados.</p>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-accent font-black">•</span>
                                        <p><strong className="text-white">Costo:</strong> El precio por guía es reducido ya que el cliente gestiona la entrega inicial en bodega.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-lime-400/10 border border-lime-400/20">
                            <p className="text-center text-lime-400 text-xs font-black uppercase tracking-[0.2em]">
                                Al adquirir cualquier paquete, aceptas estas condiciones de servicio para el año 2026.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
