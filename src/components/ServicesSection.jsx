import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

const services = [
    {
        title: 'Envío Nacional',
        desc: 'Envíos rápidos y seguros a todos los departamentos de Guatemala, conectando comunidades de forma confiable.',
        img: '/images/CarruselServicios/EnviosNacionales.png',
    },
    {
        title: 'Mensajería Express',
        desc: 'Entrega urgente de documentos y paquetes pequeños dentro de la ciudad en tiempo récord y con rastreo.',
        img: '/images/CarruselServicios/Mensajeria Express.png',
    },
    {
        title: 'Paquetería Segura',
        desc: 'Protección garantizada para tus mercancías, con embalaje especial y seguro de envío incluido.',
        img: '/images/CarruselServicios/Paqueteria Segura.png',
    },
    {
        title: 'Entregas Programadas',
        desc: 'Planifica la logística de tus entregas seleccionando el día y la hora más conveniente para tu destinatario.',
        img: '/images/CarruselServicios/EntregasProgramadas.png',
    },
    {
        title: 'Logística Empresarial',
        desc: 'Soluciones integrales de distribución, almacenamiento y supply chain adaptadas a las necesidades de tu empresa.',
        img: '/images/CarruselServicios/LogisticaEmpresarial.png',
    },
]

export default function ServicesSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [activeMobileIndex, setActiveMobileIndex] = useState(0)

    const isAnyHovered = hoveredIndex !== null

    return (
        <section id="servicios" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                            Todo lo que necesitas para{' '}
                            <span className="gradient-text">enviar y recibir</span>
                        </h2>
                        <p className="text-base md:text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
                            Ofrecemos una gama completa de servicios de paquetería y mensajería para conectar Guatemala.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Desktop layout: Expanding Cards */}
                <div 
                    className="hidden md:flex flex-row gap-4 h-[460px] w-full items-stretch justify-center"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {services.map((s, i) => {
                        const isHovered = hoveredIndex === i
                        const isExpanded = isAnyHovered ? isHovered : false
                        const flexClass = isAnyHovered 
                            ? (isHovered ? 'flex-[3.5]' : 'flex-[0.7]') 
                            : 'flex-1'

                        return (
                            <div
                                key={s.title}
                                className={`cursor-pointer relative overflow-hidden rounded-3xl border transition-all duration-700 ease-in-out
                                    ${isExpanded 
                                        ? 'border-accent/40 bg-white/[0.08]' 
                                        : 'border-white/10 bg-white/[0.05]'
                                    } ${flexClass}`}
                                style={{
                                    backgroundImage: `url('${s.img}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: isExpanded ? 'bottom' : 'center',
                                }}
                                onMouseEnter={() => setHoveredIndex(i)}
                            >
                                {/* Shaded gradient overlay for text readability, transitioning on hover */}
                                <div 
                                    className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-8 transition-all duration-500 ease-in-out
                                        ${isExpanded 
                                            ? 'opacity-100 translate-y-0 delay-100' 
                                            : 'opacity-0 translate-y-6 pointer-events-none'
                                        }`}
                                >
                                    <h3 className="text-2xl font-bold text-accent mb-2">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm text-gray-200 font-light leading-relaxed max-w-lg">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Mobile layout: List of cards */}
                <div className="flex md:hidden flex-col gap-4 w-full">
                    {services.map((s, i) => {
                        const isActive = activeMobileIndex === i
                        return (
                            <div
                                key={s.title}
                                onClick={() => setActiveMobileIndex(i)}
                                className={`cursor-pointer relative overflow-hidden rounded-2xl border transition-all duration-500 ease-in-out
                                    ${isActive 
                                        ? 'border-accent/40 bg-white/[0.08] h-[240px]' 
                                        : 'border-white/10 bg-white/[0.05] h-[100px]'
                                    }`}
                                style={{
                                    backgroundImage: `url('${s.img}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: isActive ? 'bottom' : 'center',
                                }}
                            >
                                {/* Shaded gradient overlay with description transitioning */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-6 transition-all duration-500">
                                    <h3 className="text-lg font-bold text-accent">
                                        {s.title}
                                    </h3>
                                    <div 
                                        className={`transition-all duration-500 ease-in-out overflow-hidden
                                            ${isActive 
                                                ? 'max-h-24 opacity-100 mt-2' 
                                                : 'max-h-0 opacity-0 mt-0'
                                            }`}
                                    >
                                        <p className="text-xs text-gray-200 font-light leading-relaxed">
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
