import { Link } from 'react-router-dom'
import { Package, Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const footerLinks = {
    servicios: [
        { label: 'Envío Nacional', path: '/servicios' },
        { label: 'Mensajería Express', path: '/servicios' },
        { label: 'Recolección a Domicilio', path: '/servicios' },
        { label: 'Logística Empresarial', path: '/servicios' },
    ],
    empresa: [
        { label: 'Sobre Nosotros', path: '/nosotros' },
        { label: 'Preguntas Frecuentes', path: '/nosotros' },
        { label: 'Contacto', path: '/contacto' },
    ],
}



export default function Footer() {
    const { config } = useAdmin()
    const year = new Date().getFullYear()

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className="relative pt-20 pb-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-1 border border-white/20 shadow-[0_0_15px_rgba(62,198,224,0.3)] group-hover:shadow-[0_0_25px_rgba(62,198,224,0.6)] group-hover:border-accent/50 transition-all duration-300 transform group-hover:-translate-y-1">
                                <img src="/images/logo.png" alt="Nacionales Logo" className="w-full h-full object-contain rounded-xl" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                                <Package className="w-full h-full text-accent hidden p-1" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white leading-tight">Nacionales</h3>
                                <p className="text-[10px] text-accent font-medium tracking-widest uppercase">Delivery Services</p>
                            </div>
                        </div>
                        <p className="text-blue-300 text-sm leading-relaxed mb-4">
                            Rapidez que nos une. Envíos seguros y confiables a todo Guatemala 🇬🇹
                        </p>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h4 className="text-white font-bold mb-4 text-sm">Servicios</h4>
                        <ul className="space-y-2">
                            {footerLinks.servicios.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        to={l.path}
                                        onClick={() => {
                                            document.getElementById(l.path.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="footer-link block"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Empresa */}
                    <div>
                        <h4 className="text-white font-bold mb-3 text-sm">Empresa</h4>
                        <ul className="space-y-2">
                            {footerLinks.empresa.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        to={l.path}
                                        onClick={() => {
                                            document.getElementById(l.path.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="footer-link block"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="space-y-4">
                            {[
                                { city: 'Guatemala', addr: '3a Calle A9-21, Zona 21', tel: '5568-3682' },
                                { city: 'Huehuetenango', addr: '4ta Calle Zona 9, Zaculei Central', tel: '5271-3803' },
                                { city: 'Chimaltenango', addr: 'Diagonal 2 5-69 Zona 2, Tecpán', tel: '3722-3693' },
                                { city: 'Petén', addr: '3 Calle 8-18 Zona 2, Santa Elena', tel: '3158-3067' }
                            ].map((s) => (
                                <div key={s.city} className="flex flex-col gap-1">
                                    <p className="text-white font-bold tracking-wider text-[14px] uppercase">{s.city}</p>
                                    <div className="flex items-start gap-2 text-blue-300 text-[13px]">
                                        <MapPin className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
                                        <span>{s.addr}</span>
                                    </div>
                                    <a href={`tel:${s.tel.replace('-', '')}`} className="flex items-center gap-2 footer-link text-[13px] w-fit">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{s.tel}</span>
                                    </a>
                                </div>
                            ))}

                            <div className="pt-2">
                                <a href="mailto:nacionalesdelivery@gmail.com" className="flex items-center gap-2 footer-link text-[13px]">
                                    <Mail className="w-4 h-4" />
                                    <span>nacionalesdelivery@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-center gap-4 relative">
                    <div className="sm:absolute sm:left-0 flex items-center gap-2 order-2 sm:order-1 text-[9px] tracking-widest uppercase">
                        <span className="text-blue-500/40 flex items-center gap-1">
                            Desarrollado por
                        </span>
                        <div className="flex gap-1.5">
                            <a
                                href="https://developer-portfolio-eta-ivory.vercel.app/home"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-accent/50 hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm font-bold opacity-50 hover:opacity-100"
                            >
                                Yeysoon
                            </a>
                            <a
                                href="http://portfoliolibnibarriospinto.s3-website.us-east-2.amazonaws.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-accent/50 hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm font-bold opacity-50 hover:opacity-100"
                            >
                                Libni
                            </a>
                        </div>
                    </div>

                    <p className="text-blue-400 text-xs text-center order-1 sm:order-2">
                        © {year} Nacionales Delivery Services. Todos los derechos reservados.
                    </p>

                    <button
                        onClick={scrollTop}
                        className="sm:absolute sm:right-0 w-10 h-10 rounded-xl glass flex items-center justify-center
                       hover:bg-accent/20 hover:text-accent transition-all order-3"
                        aria-label="Ir arriba"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
