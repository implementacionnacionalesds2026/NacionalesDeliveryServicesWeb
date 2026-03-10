import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Truck, Bike, MessageCircle, Star, Clock, ShieldCheck } from 'lucide-react'

export default function HeroSection() {
    const titleRef = useRef(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
        const loadAnime = async () => {
            try {
                const anime = (await import('animejs/lib/anime.es.js')).default
                if (titleRef.current) {
                    const text = titleRef.current.textContent || ''
                    titleRef.current.innerHTML = text
                        .split('')
                        .map((l) => `<span class="inline-block" style="opacity:0">${l === ' ' ? '&nbsp;' : l}</span>`)
                        .join('')
                    anime({
                        targets: titleRef.current.querySelectorAll('span'),
                        opacity: [0, 1],
                        translateY: [40, 0],
                        translateZ: 0,
                        duration: 1000,
                        delay: anime.stagger(30, { start: 200 }),
                        easing: 'easeOutElastic(1, .8)',
                    })
                }
            } catch (e) {
                if (titleRef.current) titleRef.current.style.opacity = '1'
            }
        }
        loadAnime()
    }, [])

    return (
        <section id="inicio" className="relative min-h-[100vh] flex items-center overflow-hidden pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-primary-dark/90" />
            <div className="absolute inset-0 grid-pattern opacity-10 md:opacity-30 md:mix-blend-overlay" />

            {/* Animated Light Orbs - Hidden on mobile to save GPU */}
            <div className="hidden md:block absolute top-1/4 -left-32 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="hidden md:block absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-light/30 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/15 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* LEFT CONTENT */}
                    <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 md:glass border border-accent/30 text-xs sm:text-sm text-accent font-medium mb-8 shadow-none md:shadow-[0_0_20px_rgba(62,198,224,0.2)]">
                            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                            </span>
                            Conectando a todo el país al instante
                        </div>

                        <h1
                            ref={titleRef}
                            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-md md:drop-shadow-lg"
                        >
                            Entregas Que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Inspiran</span> Confianza
                        </h1>

                        <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-lg mb-8 md:mb-10 font-light">
                            Somos tu aliado logístico. Envíos exprés, seguros y monitoreados a <span className="text-white font-medium">Guatemala, Huehuetenango, Chimaltenango y Petén</span>. Confía tus paquetes a los expertos desde <span className="inline-block px-2 py-0.5 rounded-md bg-accent/20 text-accent font-bold">Q25</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10">
                            <a
                                href="https://wa.me/50255683682?text=Hola%21%20Quiero%20cotizar%20un%20envio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary !px-6 !py-3 sm:!px-8 sm:!py-4 !text-base sm:!text-lg !rounded-2xl group flex justify-center shadow-lg md:shadow-[0_10px_40px_-10px_rgba(62,198,224,0.5)]"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Cotizar mi Envío
                            </a>
                            <a
                                href="#servicios"
                                className="btn-secondary !px-6 !py-3 sm:!px-8 sm:!py-4 !text-base sm:!text-lg !rounded-2xl group flex justify-center bg-white/5 hover:bg-white/10 border-white/10"
                            >
                                Ver Servicios
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Micro-Features */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-blue-200">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent" /> 100% Seguro
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" /> Entregas 24/48h
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT — Creative Visual Layout */}
                    <div className={`relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

                        {/* Center Glowing Hub - Optimized for mobile */}
                        <div className="relative z-10 w-40 h-40 md:w-48 md:h-48 rounded-[2rem] bg-primary/80 md:bg-gradient-to-br md:from-white/10 md:to-white/5 border border-white/10 md:border-white/20 md:backdrop-blur-xl shadow-xl flex flex-col items-center justify-center transform md:rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                            <Truck className="w-12 h-12 md:w-16 md:h-16 text-accent mb-2 md:mb-3 md:drop-shadow-[0_0_15px_rgba(62,198,224,0.5)]" />
                            <span className="text-lg md:text-xl font-bold text-white tracking-widest">NDS</span>
                            <span className="text-[10px] md:text-xs text-accent uppercase font-semibold">Logistics</span>

                            {/* Pulse rings - Hidden on mobile */}
                            <div className="hidden md:block absolute inset-0 rounded-[2rem] border-2 border-accent/30 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                            <div className="hidden md:block absolute -inset-4 rounded-[2.5rem] border border-accent/20 animate-spin-slow" />
                        </div>

                        {/* Floating Card: Fast Routes - Hidden on small screens */}
                        <div className="hidden md:block absolute top-[5%] left-0 z-20 w-56 p-4 rounded-2xl bg-primary/40 backdrop-blur-xl border border-white/10 shadow-2xl animate-float">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                </div>
                                <p className="text-sm font-semibold text-white">Rutas Activas</p>
                            </div>
                            <div className="space-y-2">
                                {['Guatemala', 'Huehuetenango', 'Petén'].map((route, i) => (
                                    <div key={route} className="flex items-center gap-2 text-xs text-blue-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        {route}
                                        <div className="ml-auto w-12 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Card: Delivery Count - Hidden on small screens */}
                        <div className="hidden md:flex absolute bottom-[10%] right-0 z-20 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-float items-center gap-4" style={{ animationDelay: '1.5s' }}>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center shadow-lg">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-white tracking-tight">5k+</h4>
                                <p className="text-xs text-blue-200 uppercase tracking-wide font-medium">Entregas Exitosas</p>
                            </div>
                        </div>

                        {/* Floating Card: Delivery Map Pulse - Hidden on small screens */}
                        <div className="hidden md:block absolute top-[20%] -right-[5%] z-0 animate-float" style={{ animationDelay: '0.8s' }}>
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                                        <Bike className="w-8 h-8 text-accent opacity-50" />
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-[0_0_15px_rgba(62,198,224,1)]" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Fade to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-primary-dark to-transparent pointer-events-none" />
        </section>
    )
}
