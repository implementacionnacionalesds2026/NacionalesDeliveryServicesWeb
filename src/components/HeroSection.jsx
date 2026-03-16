import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Truck, Bike, Star, Clock, ShieldCheck } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const WhatsAppIcon = ({ className }) => (
    // ... (rest of icon)
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

export default function HeroSection() {
    const { config } = useAdmin()
    const titleRef = useRef(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
        const loadAnime = async () => {
            try {
                const anime = (await import('animejs/lib/anime.es.js')).default
                if (titleRef.current) {
                    anime({
                        targets: titleRef.current,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 1200,
                        easing: 'easeOutExpo',
                        delay: 300
                    })
                }
            } catch (e) {
                if (titleRef.current) titleRef.current.style.opacity = '1'
            }
        }
        loadAnime()
    }, [])

    return (
        <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
            {/* Dynamic Background */}
            {/* Animated Light Orbs - Hidden on mobile to save GPU */}
            <div className="hidden md:block absolute top-1/4 -left-32 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="hidden md:block absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-primary-light/30 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/15 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* LEFT CONTENT */}
                    <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1035]/90 border border-accent/30 text-xs sm:text-sm text-accent font-medium mb-8 shadow-none">
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
                            Somos tu aliado logístico. Envíos exprés, seguros y monitoreados a <span className="text-white font-medium">Guatemala, Huehuetenango, Chimaltenango y Petén</span>. Confía tus paquetes a los expertos desde <span className="inline-block px-2 py-0.5 rounded-md bg-accent/20 text-accent font-bold">Q20</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 md:mb-10 w-full">
                            <a
                                href={`https://api.whatsapp.com/send?phone=${config.whatsapp.number}&text=${encodeURIComponent(config.whatsapp.message)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex-1 sm:flex-none justify-center !px-6 !py-3 !text-sm sm:!text-base !rounded-xl group shadow-lg md:shadow-[0_10px_40px_-10px_rgba(62,198,224,0.5)]"
                            >
                                <WhatsAppIcon className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
                                Cotizar Envío
                            </a>

                            <a
                                href="#promociones"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base btn-promo-desktop"
                            >
                                Promos
                            </a>

                            <a
                                href="#servicios"
                                className="btn-secondary flex-1 sm:flex-none justify-center !px-6 !py-3 !text-sm sm:text-base !rounded-xl group bg-white/5 hover:bg-white/10 border-white/10"
                            >
                                Ver Servicios
                                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
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

                        {/* Hero Logo - Replaced floating cards with the official logo */}
                        <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center animate-float">
                            {/* Glow effect behind logo */}
                            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] animate-pulse-glow" />

                            <img
                                src="/images/logo.png"
                                alt="Nacionales Logo"
                                className="relative z-20 w-full h-full object-contain transform-gpu"
                            />

                            {/* Decorative rotating ring */}
                            <div className="absolute -inset-8 rounded-full border border-accent/10 border-dashed animate-spin-slow opacity-50" />
                        </div>

                    </div>
                </div>
            </div>

            {/* Fade to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-primary-dark to-transparent pointer-events-none" />
        </section>
    )
}
