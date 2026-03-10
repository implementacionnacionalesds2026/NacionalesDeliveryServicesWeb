import { useState, useRef } from 'react'
import { Send, Phone, MapPin, Mail, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from './ScrollReveal'

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sending, setSending] = useState(false)
    const formRef = useRef(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            toast.error('Por favor completa todos los campos requeridos')
            return
        }
        setSending(true)

        try {
            // Using FormSubmit for easy functional emails
            const response = await fetch('https://formsubmit.co/ajax/implementacionnacionalesds@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nombre: form.name,
                    Telefono: form.phone || 'No indicado',
                    Email: form.email,
                    Mensaje: form.message,
                    _subject: 'Nuevo mensaje web de ' + form.name
                })
            })

            if (response.ok) {
                toast.success('¡Mensaje enviado con éxito! Te contactaremos pronto 📬')
                setForm({ name: '', email: '', phone: '', message: '' })
            } else {
                throw new Error('Error on fetch')
            }
        } catch {
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
                            <MessageCircle className="w-4 h-4" /> Contáctanos
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
                        <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-blue-300 font-medium mb-1 block">Nombre *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-blue-300 font-medium mb-1 block">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="5568-3682"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-blue-300 font-medium mb-1 block">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="tu@correo.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm text-blue-300 font-medium mb-1 block">Mensaje *</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="input-field resize-none"
                                    placeholder="¿Cómo podemos ayudarte?"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                className="btn-primary w-full justify-center !rounded-xl disabled:opacity-50"
                            >
                                {sending ? 'Enviando...' : <><Send className="w-5 h-5" /> Enviar Mensaje</>}
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
                                    lines: ['5271-3803 (Huehue)', '3722-3693 (Chimaltenango)', '1358-3067 (Petén)', '5568-3682 (General)'],
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
                                href="https://wa.me/50255683682?text=Hola%21%20Quiero%20cotizar%20un%20envio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageCircle className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-green-400 font-bold">Escríbenos por WhatsApp</p>
                                    <p className="text-green-300/70 text-sm">Respuesta inmediata • Cotización rápida</p>
                                </div>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
