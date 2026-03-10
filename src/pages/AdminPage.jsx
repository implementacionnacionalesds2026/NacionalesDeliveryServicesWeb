import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { Package, Plus, Trash2, ToggleLeft, ToggleRight, Save, ArrowLeft, Lock, Megaphone, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

const WhatsAppIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

export default function AdminPage() {
    const { config, updateConfig, updateAnnouncement, addAnnouncement, deleteAnnouncement } = useAdmin()
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [newAnnouncementText, setNewAnnouncementText] = useState('')
    const [whatsappNumber, setWhatsappNumber] = useState(config.whatsapp.number)
    const [whatsappMessage, setWhatsappMessage] = useState(config.whatsapp.message)

    const handleLogin = (e) => {
        e.preventDefault()
        // Simple local password — user can change this
        if (password === 'nds2026') {
            setAuthenticated(true)
            toast.success('¡Bienvenido al panel de administración!')
        } else {
            toast.error('Contraseña incorrecta')
        }
    }

    const handleSaveWhatsApp = () => {
        updateConfig({
            whatsapp: { number: whatsappNumber, message: whatsappMessage },
        })
        toast.success('WhatsApp actualizado ✅')
    }

    const handleAddAnnouncement = () => {
        if (!newAnnouncementText.trim()) {
            toast.error('Escribe el texto del anuncio')
            return
        }
        addAnnouncement(newAnnouncementText)
        setNewAnnouncementText('')
        toast.success('Anuncio agregado 📢')
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-main flex items-center justify-center px-4">
                <div className="glass rounded-3xl p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-accent" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Panel Admin</h1>
                        <p className="text-blue-300 text-sm">Nacionales Delivery Services</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña de administrador"
                            className="input-field"
                        />
                        <button type="submit" className="btn-primary w-full justify-center !rounded-xl">
                            Ingresar
                        </button>
                    </form>
                    <p className="text-blue-400 text-xs text-center mt-4">Contraseña por defecto: nds2026</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-main pt-8 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <a href="/" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-accent/20 transition-all">
                            <ArrowLeft className="w-5 h-5 text-accent" />
                        </a>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
                            <p className="text-blue-300 text-sm">Gestiona tu sitio web</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Package className="w-5 h-5 text-accent" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Announcements */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Megaphone className="w-5 h-5 text-accent" />
                            <h2 className="text-lg font-bold text-white">Anuncios / Banners</h2>
                        </div>

                        <div className="space-y-3 mb-4">
                            {config.announcements.map((a) => (
                                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                    <button
                                        onClick={() => updateAnnouncement(a.id, { active: !a.active })}
                                        className="shrink-0"
                                        title={a.active ? 'Desactivar' : 'Activar'}
                                    >
                                        {a.active ? (
                                            <ToggleRight className="w-6 h-6 text-accent" />
                                        ) : (
                                            <ToggleLeft className="w-6 h-6 text-blue-400" />
                                        )}
                                    </button>
                                    <p className={`flex-1 text-sm ${a.active ? 'text-white' : 'text-blue-400 line-through'}`}>
                                        {a.text}
                                    </p>
                                    <button
                                        onClick={() => deleteAnnouncement(a.id)}
                                        className="shrink-0 p-1 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newAnnouncementText}
                                onChange={(e) => setNewAnnouncementText(e.target.value)}
                                placeholder="Nuevo anuncio (ej: ¡Envíos gratis esta semana!)"
                                className="input-field !py-3 text-sm flex-1"
                            />
                            <button onClick={handleAddAnnouncement} className="btn-primary !px-4 !py-3 !rounded-xl shrink-0">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* WhatsApp Config */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <WhatsAppIcon className="w-5 h-5 text-green-400" />
                            <h2 className="text-lg font-bold text-white">Configuración WhatsApp</h2>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-blue-300 mb-1 block">Número (con código de país, ej: 50256836688)</label>
                                <input
                                    type="text"
                                    value={whatsappNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                    className="input-field !py-3 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-blue-300 mb-1 block">Mensaje predeterminado</label>
                                <input
                                    type="text"
                                    value={whatsappMessage}
                                    onChange={(e) => setWhatsappMessage(e.target.value)}
                                    className="input-field !py-3 text-sm"
                                />
                            </div>
                            <button onClick={handleSaveWhatsApp} className="btn-primary !px-6 !py-2.5 !text-sm !rounded-xl">
                                <Save className="w-4 h-4" /> Guardar
                            </button>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Share2 className="w-5 h-5 text-accent" />
                            <h2 className="text-lg font-bold text-white">Redes Sociales</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            {Object.entries(config.socialLinks).map(([key, val]) => (
                                <div key={key}>
                                    <label className="text-sm text-blue-300 mb-1 block capitalize">{key}</label>
                                    <input
                                        type="text"
                                        value={val}
                                        onChange={(e) =>
                                            updateConfig({
                                                socialLinks: { ...config.socialLinks, [key]: e.target.value },
                                            })
                                        }
                                        className="input-field !py-3 text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-blue-400 text-xs mt-3">Los cambios se guardan automáticamente</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
