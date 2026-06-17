import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Package, Phone } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const navLinks = [
    { label: 'Inicio', path: '/inicio' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Promociones', path: '/promociones' },
]

export default function Navbar() {
    const { config } = useAdmin()
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

    const handleNavClick = (path) => {
        const id = path.replace('/', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'inicio' || id === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (mobileOpen) setMobileOpen(false);
    };

    const whatsappNumber = config.whatsapp.number
    const telNumber = '55683682'

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#05081a] border-b border-white/20 shadow-xl ${scrolled ? 'py-2' : 'py-4'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/inicio" onClick={() => handleNavClick('/inicio')} className="cursor-pointer flex items-center gap-3 group bg-transparent border-none p-0 text-left">
                            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-1 border border-white/20 shadow-[0_0_15px_rgba(62,198,224,0.3)] group-hover:shadow-[0_0_25px_rgba(62,198,224,0.6)] group-hover:border-accent/50 transition-all duration-300 transform group-hover:-translate-y-1">
                                <img src="/images/logo.png" alt="Nacionales Logo" className="w-full h-full object-contain rounded-xl" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                                <Package className="w-full h-full text-accent hidden p-1" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
                                    Nacionales
                                </h1>
                                <p className="text-[10px] text-accent font-medium tracking-widest uppercase -mt-0.5">
                                    Delivery Services
                                </p>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => handleNavClick(link.path)}
                                    className="cursor-pointer px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 bg-transparent border-none text-blue-200 hover:text-white hover:bg-white/10"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            <a
                                href={`tel:${telNumber}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-accent hover:text-white transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="font-semibold">5568-3682</span>
                            </a>
                             <Link
                                  to="/cotizador"
                                  className="btn-primary !px-4 !py-2 !rounded-xl !flex !items-center !gap-2.5 animate-cta-pulse cursor-pointer border-none bg-transparent"
                              >
                                  <img 
                                      src="/images/IzotipoNormalNexgoWhite.png" 
                                      alt="Nexgo Logo" 
                                      className="w-[38px] h-[38px] object-contain brightness-0" 
                                  />
                                  <span className="flex flex-col text-left leading-tight">
                                      <span className="text-[9px] font-bold opacity-80 uppercase tracking-wider">Cotiza con</span>
                                      <span className="text-xs font-black uppercase tracking-wide -mt-0.5">Nexgo</span>
                                  </span>
                              </Link>
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
            </nav>

            {/* Mobile menu - Moved outside nav to avoid backdrop-blur stacking context bug */}
            <div
                className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                style={{ backgroundColor: mobileOpen ? 'rgba(10, 16, 53, 0.98)' : 'transparent' }}
            >
                {/* Clean, fast background with subtle transparency */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 16, 53, 0.9)' }} />

                <div className="relative flex flex-col items-center justify-start pt-24 h-full gap-4 p-6 overflow-y-auto">
                    {/* Close button for mobile menu inside the overlay since it covers the navbar */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => handleNavClick(link.path)}
                            className={`cursor-pointer text-2xl font-semibold transition-all duration-300 bg-transparent border-none w-full text-center block ${
                                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            } text-white hover:text-accent`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className={`mt-8 flex flex-col gap-4 items-center transition-all duration-300 delay-100 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <a href={`tel:${telNumber}`} className="flex items-center gap-2 text-accent font-semibold text-lg">
                            <Phone className="w-5 h-5" /> 5568-3682
                        </a>
                          <Link
                              to="/cotizador"
                              onClick={() => setMobileOpen(false)}
                              className="btn-primary !w-full !justify-center !flex !items-center !gap-3 !py-2.5 !rounded-xl animate-cta-pulse cursor-pointer border-none bg-transparent"
                          >
                              <img 
                                  src="/images/IzotipoNormalNexgoWhite.png" 
                                  alt="Nexgo Logo" 
                                  className="w-[44px] h-[44px] object-contain brightness-0" 
                              />
                              <span className="flex flex-col text-left leading-tight">
                                  <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Cotiza con</span>
                                  <span className="text-sm font-black uppercase tracking-wide -mt-0.5">Nexgo</span>
                              </span>
                          </Link>
                    </div>
                </div>
            </div>


        </>
    )
}
