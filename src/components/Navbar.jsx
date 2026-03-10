import { useState, useEffect, useRef } from 'react'
import { Menu, X, Package, MessageCircle, Phone } from 'lucide-react'

const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Rutas', href: '#rutas' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-2 bg-primary-dark/95 backdrop-blur-xl shadow-2xl'
                : 'py-4 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#inicio" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                            <Package className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
                                Nacionales
                            </h1>
                            <p className="text-[10px] text-accent font-medium tracking-widest uppercase -mt-0.5">
                                Delivery Services
                            </p>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-blue-200 hover:text-white
                           rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="tel:55683682"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-accent hover:text-white transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            <span className="font-semibold">5568-3682</span>
                        </a>
                        <a
                            href="https://wa.me/50255683682?text=Hola%21%20Quiero%20cotizar%20un%20envio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary !px-6 !py-2.5 !text-sm !rounded-xl"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Cotizar Envío
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl
                       bg-white/10 hover:bg-white/20 transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X className="w-5 h-5 text-white" />
                        ) : (
                            <Menu className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden fixed inset-0 top-[70px] z-40 transition-opacity duration-300 ${mobileOpen
                    ? 'opacity-100 pointer-events-auto bg-primary-dark/98'
                    : 'opacity-0 pointer-events-none bg-primary-dark/0'
                    }`}
            >
                {/* Clean, fast background without expensive blur filters */}
                <div className="absolute inset-0 bg-primary-dark" />

                <div className="relative flex flex-col items-center justify-start pt-12 h-full gap-4 p-6 overflow-y-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`text-2xl font-semibold text-white hover:text-accent transition-all duration-300 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        >
                            {link.label}
                        </a>
                    ))}

                    <div className={`mt-8 flex flex-col gap-4 items-center transition-all duration-300 delay-100 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <a href="tel:55683682" className="flex items-center gap-2 text-accent font-semibold text-lg">
                            <Phone className="w-5 h-5" /> 5568-3682
                        </a>
                        <a
                            href="https://wa.me/50255683682?text=Hola%21%20Quiero%20cotizar%20un%20envio"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="btn-primary !w-full !justify-center"
                        >
                            <MessageCircle className="w-5 h-5" /> Cotizar Envío
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
