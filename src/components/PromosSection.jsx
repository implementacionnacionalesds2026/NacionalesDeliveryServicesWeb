import { useState } from 'react'
import { Package, Truck, X, Info, ChevronRight, MapPin } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const WhatsAppIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

// ===== ROUTES for modal =====
const routes = [
    { id: 'guatemala', name: 'Ciudad de Guatemala', phone: '50255683682' },
    { id: 'huehue', name: 'Huehuetenango', phone: '50252713803' },
    { id: 'chimaltenango', name: 'Chimaltenango', phone: '50237223693' },
    { id: 'peten', name: 'Petén', phone: '50231583067' },
]

// ===== PACKAGES — exactos del brief =====
const ENVIOS_PACKAGES = [
    { name: 'Paquete Micro',    qty: 10,  perEnvio: 36, total: 360  },
    { name: 'Paquete Petit',   qty: 25,  perEnvio: 34, total: 850  },
    { name: 'Paquete Básico',  qty: 50,  perEnvio: 32, total: 1600 },
    { name: 'Paquete Plus',    qty: 100, perEnvio: 30, total: 3000 },
    { name: 'Perdamos en Vos', qty: 30,  perEnvio: 25, total: 750  },
    { name: 'Ponete Pilas',    qty: 10,  perEnvio: 20, total: 200  },
]

const RECOLECCION_PACKAGES = [
    {
        name: 'Basic',
        qty: 25,
        perEnvio: 25,
        total: 625,
        badge: 'Plan Emprendedor',
        badgeColor: 'bg-lime-400/10 text-lime-400 border-lime-400/20',
        highlight: false,
    },
    {
        name: 'Plus',
        qty: 35,
        perEnvio: 20,
        total: 700,
        badge: 'Plan Profesional',
        badgeColor: 'bg-accent/20 text-accent border-accent/30',
        highlight: true,
    },
]

const TABS = { ENVIOS: 'envios', RECOLECCION: 'recoleccion' }

export default function PromosSection() {
    const [activeTab, setActiveTab] = useState(TABS.ENVIOS)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

    const handlePackageClick = (pkg, isRecoleccion = false) => {
        setSelectedPackage({ ...pkg, isRecoleccion })
        setIsModalOpen(true)
    }

    const handleRouteSelect = (route) => {
        if (!selectedPackage) return
        const message = `Hola! 👋 Me interesa el paquete "${selectedPackage.name}" (${selectedPackage.qty} guías por Q${selectedPackage.perEnvio} c/u) para envíos hacia *${route.name}*. ¿Me pueden dar más info?`
        window.open(`https://api.whatsapp.com/send?phone=${route.phone}&text=${encodeURIComponent(message)}`, '_blank')
        setIsModalOpen(false)
    }

    return (
        <section id="promociones" className="py-28 relative overflow-hidden">
            {/* Ambient lights */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase mb-6 leading-tight">
                            Nuestros Mejores <br />
                            <span className="text-yellow-400">Paquetes de Envío</span>
                        </h2>
                        <p className="text-lg text-blue-200/80 max-w-2xl mx-auto font-medium">
                            Elige el plan que mejor se adapte a tu necesidad. Ahorra tiempo y dinero con nuestras tarifas preferenciales.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Tab Selector */}
                <div className="flex flex-col items-center mb-12">
                    <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative">
                        <button
                            onClick={() => setActiveTab(TABS.ENVIOS)}
                            id="tab-envios"
                            className={`relative px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 z-10 ${activeTab === TABS.ENVIOS ? 'text-[#060b22]' : 'text-blue-300 hover:text-white'}`}
                        >
                            <Package className="w-4 h-4" />
                            Envíos
                        </button>
                        <button
                            onClick={() => setActiveTab(TABS.RECOLECCION)}
                            id="tab-recoleccion"
                            className={`relative px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 z-10 ${activeTab === TABS.RECOLECCION ? 'text-[#060b22]' : 'text-blue-300 hover:text-white'}`}
                        >
                            <Truck className="w-4 h-4" />
                            Recolección
                        </button>
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl transition-all duration-500 ease-out shadow-lg ${activeTab === TABS.ENVIOS ? 'left-1.5' : 'left-[calc(50%+4.5px)]'}`}
                        />
                    </div>
                </div>

                {/* Package Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 min-h-[360px]">
                    {activeTab === TABS.ENVIOS ? (
                        ENVIOS_PACKAGES.map((pkg, idx) => (
                            <ScrollReveal key={pkg.name} delay={(idx + 1) * 80}>
                                <div className="group h-full">
                                    <div className="relative h-full glass border border-white/10 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_50px_rgba(62,198,224,0.15)] flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase">
                                                {pkg.name}
                                            </h3>
                                            <p className="text-blue-200/70 text-xs leading-relaxed">
                                                Ahorro garantizado en envíos por volumen. Gestión eficiente y segura.
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-lg text-accent font-black">Q</span>
                                                <span className="text-5xl font-black text-white tracking-tighter">{pkg.perEnvio.toFixed(2)}</span>
                                                <span className="text-blue-300/60 font-bold ml-1 text-xs uppercase">c/u</span>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <div className="text-xl font-black text-white mb-1">¡{pkg.qty} GUÍAS!</div>
                                                <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest">Q{pkg.total} Total</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePackageClick(pkg, false)}
                                            className="mt-8 w-full py-4 rounded-xl bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-accent hover:text-[#060b22] hover:border-accent flex items-center justify-center gap-2"
                                        >
                                            LO QUIERO <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))
                    ) : (
                        RECOLECCION_PACKAGES.map((pkg, idx) => (
                            <ScrollReveal key={pkg.name} delay={(idx + 1) * 100}>
                                <div className="group h-full">
                                    <div className={`relative h-full glass rounded-[2rem] p-6 md:p-8 transition-all duration-500 flex flex-col ${
                                        pkg.highlight
                                            ? 'border-2 border-accent/50 hover:border-accent hover:shadow-[0_20px_50px_rgba(62,198,224,0.3)] bg-accent/5'
                                            : 'border border-white/10 hover:border-lime-400/50 hover:shadow-[0_20px_50px_rgba(163,230,53,0.15)]'
                                    }`}>
                                        <div className="absolute top-0 right-10 bg-lime-400 text-[#060b22] px-5 py-2 rounded-b-xl text-[9px] font-black uppercase tracking-widest shadow-xl">
                                            Solo Ciudad de Guatemala
                                        </div>
                                        <div className="mb-6">
                                            <span className={`inline-block px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-full mb-3 border ${pkg.badgeColor}`}>
                                                {pkg.badge}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase">
                                                Paquete {pkg.name}
                                            </h3>
                                            <p className="text-blue-200/70 text-xs leading-relaxed">
                                                {pkg.highlight
                                                    ? 'Específicamente diseñado para Ciudad de Guatemala. Máximo ahorro y eficiencia.'
                                                    : 'Ideal para negocios que están escalando. Recolección segura a un precio imbatible.'}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="flex items-baseline gap-1">
                                                <span className={`text-lg font-black ${pkg.highlight ? 'text-accent' : 'text-lime-400'}`}>Q</span>
                                                <span className="text-5xl font-black text-white tracking-tighter">{pkg.perEnvio.toFixed(2)}</span>
                                                <span className="text-blue-300/60 font-bold ml-1 text-xs uppercase">c/u</span>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <div className="text-xl font-black text-white mb-1">¡{pkg.qty} GUÍAS!</div>
                                                <p className={`text-[9px] font-bold uppercase tracking-widest ${pkg.highlight ? 'text-accent' : 'text-blue-400'}`}>
                                                    Incluye Recolección
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePackageClick(pkg, true)}
                                            className={`mt-8 w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs transition-all duration-300 ${
                                                pkg.highlight
                                                    ? 'bg-accent text-[#060b22] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(62,198,224,0.4)]'
                                                    : 'bg-white/10 text-white border border-white/10 hover:bg-accent hover:text-[#060b22] hover:border-accent'
                                            }`}
                                        >
                                            SOLICITAR PAQUETE <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))
                    )}
                </div>

                {/* Terms link */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsInfoModalOpen(true)}
                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-xs font-black uppercase tracking-widest group glass px-6 py-3 rounded-xl border border-yellow-400/20"
                    >
                        <Info className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Términos y Condiciones
                    </button>
                </div>
            </div>

            {/* Route Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#060b22]/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)} />
                    <div className="relative glass border border-white/20 bg-[#0a1035] rounded-[2.5rem] p-8 max-w-md w-full shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-in zoom-in slide-in-from-bottom-8 duration-500 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-[80px]" />
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="text-center mb-8 relative z-10">
                            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent/30">
                                <MapPin className="w-10 h-10 text-accent animate-bounce" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 uppercase">Destino del Envío</h3>
                            <p className="text-blue-200/70 text-sm">
                                Elegiste el <strong className="text-accent font-black">{selectedPackage?.name}</strong>. <br />
                                Selecciona la ruta para continuar.
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

            {/* T&C Modal */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#060b22]/98 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setIsInfoModalOpen(false)} />
                    <div className="relative glass border border-white/20 bg-[#0a1035] rounded-[2.5rem] p-8 sm:p-12 max-w-2xl w-full shadow-[0_0_100px_rgba(62,198,224,0.1)] animate-in zoom-in slide-in-from-bottom-12 duration-500 overflow-y-auto max-h-[90vh]">
                        <button onClick={() => setIsInfoModalOpen(false)} className="absolute top-8 right-8 p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="mb-10 text-center">
                            <div className="w-20 h-20 bg-lime-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-lime-400/20">
                                <Info className="w-10 h-10 text-lime-400" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Términos y Condiciones</h3>
                            <p className="text-blue-300/60 font-bold uppercase tracking-widest text-xs">Diferencias entre servicios</p>
                        </div>
                        <div className="space-y-8">
                            <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Truck className="w-6 h-6 text-lime-400" />
                                    <h4 className="text-xl font-black text-white uppercase">Servicio de Recolección</h4>
                                </div>
                                <ul className="space-y-3 text-blue-200/80 text-sm leading-relaxed">
                                    <li className="flex gap-2"><span className="text-lime-400 font-black">•</span><p><strong className="text-white">Ubicación:</strong> Aplica <span className="text-lime-400 font-black">ÚNICAMENTE</span> dentro de la Ciudad de Guatemala.</p></li>
                                    <li className="flex gap-2"><span className="text-lime-400 font-black">•</span><p><strong className="text-white">Funcionamiento:</strong> Recolectamos el paquete en la puerta de tu casa o negocio sin costo adicional.</p></li>
                                    <li className="flex gap-2"><span className="text-lime-400 font-black">•</span><p><strong className="text-white">Volumen:</strong> Ideal para emprendedores y negocios que manejan flujo constante.</p></li>
                                </ul>
                            </div>
                            <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Package className="w-6 h-6 text-accent" />
                                    <h4 className="text-xl font-black text-white uppercase">Servicio de Envíos Normales</h4>
                                </div>
                                <ul className="space-y-3 text-blue-200/80 text-sm leading-relaxed">
                                    <li className="flex gap-2"><span className="text-accent font-black">•</span><p><strong className="text-white">Ubicación:</strong> Disponible para <span className="text-accent font-black">TODAS NUESTRAS RUTAS</span> (Petén, Huehuetenango, Chimaltenango y Capital).</p></li>
                                    <li className="flex gap-2"><span className="text-accent font-black">•</span><p><strong className="text-white">Funcionamiento:</strong> El cliente deja sus paquetes en nuestros puntos de recepción.</p></li>
                                    <li className="flex gap-2"><span className="text-accent font-black">•</span><p><strong className="text-white">Costo:</strong> Precio reducido ya que el cliente gestiona la entrega inicial en bodega.</p></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10 p-5 rounded-2xl bg-lime-400/10 border border-lime-400/20">
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
