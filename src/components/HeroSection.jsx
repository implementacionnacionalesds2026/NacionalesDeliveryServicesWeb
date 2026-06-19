import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import ChromaKeyVideo from './ChromaKeyVideo'

const WhatsAppIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h1
                            ref={titleRef}
                            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-md md:drop-shadow-lg opacity-0"
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

                            <Link
                                to="/servicios"
                                onClick={() => { document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="btn-secondary flex-1 sm:flex-none flex items-center justify-center !px-6 !py-3 !text-sm sm:text-base !rounded-xl group bg-white/5 hover:bg-white/10 border-white/10"
                            >
                                Ver Servicios
                                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
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

                    {/* RIGHT CONTENT — Transparent Truck Video on Desktop & Mobile */}
                    <div 
                        className={`self-center overflow-visible transition-all duration-[750ms] delay-300 origin-center ${
                            loaded 
                                ? 'opacity-100 scale-100 lg:translate-x-[21%] xl:translate-x-[27%] lg:scale-[1.65] xl:scale-[1.85]' 
                                : 'opacity-0 translate-x-[50%] scale-100 lg:translate-x-[100%] lg:scale-[1.65] xl:scale-[1.85]'
                        }`}
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                        <ChromaKeyVideo src="/videos/NDSCamion.mp4" className="w-full max-w-[420px] mx-auto lg:max-w-none" scale={1.0} />
                    </div>

                </div>
            </div>
        </section>
    )
}
