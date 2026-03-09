import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { Package, Plus, Trash2, ToggleLeft, ToggleRight, Save, ArrowLeft, Lock, Megaphone, Share2, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

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
                            <MessageCircle className="w-5 h-5 text-green-400" />
                            <h2 className="text-lg font-bold text-white">Configuración WhatsApp</h2>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-blue-300 mb-1 block">Número (con código de país, ej: 50255683682)</label>
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
