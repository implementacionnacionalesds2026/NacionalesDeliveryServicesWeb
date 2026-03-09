import { useEffect, useRef, useState } from 'react'
import { Search, ArrowRight, MapPin, Truck, Bike } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HeroSection() {
    const titleRef = useRef(null)
    const [trackingId, setTrackingId] = useState('')
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
        // Animate title letters with anime.js
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
                        rotateX: [90, 0],
                        duration: 800,
                        delay: anime.stagger(40, { start: 300 }),
                        easing: 'easeOutExpo',
                    })
                }
            } catch (e) {
                // Fallback: just show the title
                if (titleRef.current) titleRef.current.style.opacity = '1'
            }
        }
        loadAnime()
    }, [])

    const handleTrack = (e) => {
        e.preventDefault()
        if (!trackingId.trim()) {
            toast.error('Por favor ingresa un número de guía')
            return
        }
        toast.success(`Buscando guía: ${trackingId}... 📦`)
        // Simulate tracking
        setTimeout(() => {
            toast('Tu paquete está en camino 🚀', { icon: '📦' })
        }, 1500)
    }

    return (
        <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden grid-pattern">
            {/* Background gradient orbs */}
            <div className="absolute top-20 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 -right-40 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 8 + 6}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT — Text */}
                    <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            Rapidez que nos une 🚀
                        </div>

                        <h1
                            ref={titleRef}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
                        >
                            Nacionales Delivery Services
                        </h1>

                        <p className="text-lg text-blue-200 leading-relaxed max-w-lg mb-8">
                            Envíos seguros y rápidos a todo Guatemala. Conectamos{' '}
                            <span className="text-accent font-semibold">Guatemala</span>,{' '}
                            <span className="text-accent font-semibold">Huehuetenango</span>,{' '}
                            <span className="text-accent font-semibold">Chimaltenango</span>,{' '}
                            <span className="text-accent font-semibold">Petén</span> y más destinos.
                            Desde <span className="text-white font-bold">Q25</span>.
                        </p>

                        {/* Search bar */}
                        <form onSubmit={handleTrack} className="flex gap-2 max-w-lg mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                <input
                                    type="text"
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                    placeholder="Ingresa tu número de guía..."
                                    className="input-field !pl-12"
                                />
                            </div>
                            <button type="submit" className="btn-primary !px-6 !rounded-xl shrink-0">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Quick info chips */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: MapPin, text: 'Guate ↔ Huehue' },
                                { icon: Truck, text: 'Guate ↔ Petén' },
                                { icon: Bike, text: 'Guate ↔ Chimaltenango' },
                            ].map(({ icon: Icon, text }) => (
                                <div
                                    key={text}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-blue-200 hover:text-white hover:border-accent/40 transition-all cursor-pointer"
                                >
                                    <Icon className="w-4 h-4 text-accent" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Animated 3D Scene */}
                    <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        {/* Glow ring */}
                        <div className="absolute w-80 h-80 rounded-full border-2 border-accent/20 animate-spin-slow" />
                        <div className="absolute w-72 h-72 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

                        {/* Vehicle scene */}
                        <div className="relative w-full max-w-md">
                            {/* Main truck */}
                            <div className="animate-float relative z-10">
                                <img
                                    src="/images/truck-3d.png"
                                    alt="Camión de entrega Nacionales Delivery Services"
                                    className="w-full drop-shadow-2xl"
                                />
                            </div>

                            {/* Moto orbiting */}
                            <div className="absolute -bottom-4 -left-8 w-32 animate-float" style={{ animationDelay: '0.5s' }}>
                                <img
                                    src="/images/moto-3d.png"
                                    alt="Moto de entrega"
                                    className="w-full drop-shadow-xl"
                                />
                            </div>

                            {/* Car orbiting */}
                            <div className="absolute -top-4 -right-4 w-36 animate-float" style={{ animationDelay: '1s' }}>
                                <img
                                    src="/images/car-3d.png"
                                    alt="Auto de entrega"
                                    className="w-full drop-shadow-xl"
                                />
                            </div>

                            {/* Delivery person peeking */}
                            <div className="absolute -bottom-8 right-4 w-28 animate-float" style={{ animationDelay: '1.5s' }}>
                                <img
                                    src="/images/person-3d.png"
                                    alt="Repartidor Nacionales DS"
                                    className="w-full drop-shadow-xl"
                                />
                            </div>

                            {/* Floating badges */}
                            <div className="absolute top-0 left-0 glass px-3 py-1.5 rounded-xl animate-float" style={{ animationDelay: '0.8s' }}>
                                <p className="text-xs font-semibold text-accent">📦 +5,000 entregas</p>
                            </div>
                            <div className="absolute bottom-16 right-0 glass px-3 py-1.5 rounded-xl animate-float" style={{ animationDelay: '1.2s' }}>
                                <p className="text-xs font-semibold text-accent">⭐ 99% satisfacción</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z" fill="#0a1035" />
                </svg>
            </div>
        </section>
    )
}
