import { useState, useRef } from 'react'
import { Send, Phone, MapPin, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from './ScrollReveal'
import { useAdmin } from '../context/AdminContext'

const WhatsAppIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

export default function ContactSection() {
    const { config } = useAdmin()
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sending, setSending] = useState(false)
    const formRef = useRef(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message || !form.phone) {
            toast.error('Por favor completa todos los campos requeridos')
            return
        }
        if (form.name.trim().length < 3) {
            toast.error('Por favor ingresa un nombre válido y real.')
            return
        }
        if (form.phone.length !== 8) {
            toast.error('El número de teléfono debe tener exactamente 8 dígitos (formato Guatemala).')
            return
        }
        setSending(true)

        try {
            const emailjs = await import('@emailjs/browser')
            await emailjs.sendForm(
                'service_kjussrr',
                'template_kc6cfd8',
                formRef.current,
                'ru6akFUJJ-xcgtGS_'
            )
            toast.success('¡Mensaje enviado con éxito! Te contactaremos pronto 📬')
            setForm({ name: '', email: '', phone: '', message: '' })
        } catch (error) {
            console.error('EmailJS Error:', error)
            toast.error('Ocurrió un error al enviar el mensaje. Intenta por WhatsApp.')
        } finally {
            setSending(false)
        }
    }

    return (
        <section id="contacto" className="py-24 relative">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-4">
                            <WhatsAppIcon className="w-4 h-4" /> Contáctanos
                        </div>
                        <h2 className="section-title">
                            ¿Listo para <span className="gradient-text">enviar?</span>
                        </h2>
                        <p className="section-subtitle">
                            Contáctanos y cotiza tu envío hoy mismo. ¡Estamos para servirte!
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <ScrollReveal delay={100}>
                        <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5 relative overflow-hidden">
                            {/* Decorative background glow removed as per user request */}

                            <div className="grid sm:grid-cols-2 gap-5 relative z-10">
                                <div className="group">
                                    <label className="text-sm text-blue-300 font-semibold mb-1.5 block">Nombre *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => {
                                            // Only allow letters and spaces
                                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                                                handleChange(e)
                                            }
                                        }}
                                        className="input-field"
                                        placeholder="Ej. Juan Pérez"
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-sm text-blue-300 font-semibold mb-1.5 block">Teléfono (WhatsApp) *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <span className="text-[#070b24]/60 text-sm font-bold">+502</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={(e) => {
                                                // Only allow up to 8 digits
                                                if (/^[0-9]{0,8}$/.test(e.target.value)) {
                                                    handleChange(e)
                                                }
                                            }}
                                            className="input-field !pl-14 !font-sans tracking-wide"
                                            placeholder="55683682"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="group relative z-10">
                                <label className="text-sm text-blue-300 font-semibold mb-1.5 block">Correo Electrónico *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-blue-300/50 group-focus-within:text-accent transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="input-field !pl-12"
                                        placeholder="tu@correo.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="group relative z-10">
                                <label className="text-sm text-blue-300 font-semibold mb-1.5 block">Mensaje *</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="input-field resize-none"
                                    placeholder="¿De dónde hacia dónde quieres enviar tu paquete?"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending || form.phone.length !== 8 || form.name.trim().length <= 2}
                                className="relative z-10 btn-primary w-full justify-center !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    {sending ? 'Procesando Envío...' : <><Send className="w-5 h-5 group-hover:scale-110 transition-transform" /> Enviar Mensaje Seguro</>}
                                </span>
                            </button>
                        </form>
                    </ScrollReveal>

                    {/* Info */}
                    <ScrollReveal delay={200}>
                        <div className="space-y-6">
                            {/* Contact cards */}
                            {[
                                {
                                    icon: Phone,
                                    title: 'Teléfonos',
                                    lines: ['5271-3803 (Huehue)', '3722-3693 (Chimaltenango)', '3158-3067 (Petén)', '5568-3682 (General)'],
                                    color: 'bg-accent/10 text-accent',
                                },
                                {
                                    icon: MapPin,
                                    title: 'Oficinas',
                                    lines: ['3a Calle A9-21, Zona 21, Ciudad de Guatemala', '4ta Calle Zona 9, Zaculei Central, Huehuetenango'],
                                    color: 'bg-purple-500/10 text-purple-400',
                                },
                                {
                                    icon: Mail,
                                    title: 'Correo',
                                    lines: ['implementacionnacionalesds@gmail.com'],
                                    color: 'bg-amber-500/10 text-amber-400',
                                },
                            ].map((card) => (
                                <div key={card.title} className="glass rounded-2xl p-6 hover:border-accent/30 transition-all group">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                            <card.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold mb-1">{card.title}</p>
                                            {card.lines.map((line, i) => (
                                                <p key={i} className="text-blue-300 text-sm">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* WhatsApp CTA */}
                            <a
                                href={`https://api.whatsapp.com/send?phone=50255683682&text=${encodeURIComponent("Hola! 👋 Vengo de la página web y necesito cotizar un envío 📦. ¿Me podrían dar información?")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <WhatsAppIcon className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-green-400 font-bold">Escríbenos por WhatsApp</p>
                                    <p className="text-green-300/70 text-sm">Respuesta inmediata • Cotización rápida 🚚</p>
                                </div>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
