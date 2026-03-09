import { createContext, useContext, useState, useEffect } from 'react'

const defaultConfig = {
    announcements: [
        { id: 1, text: '🚀 ¡Envíos express a todo el país! Cotiza ahora y obtén 10% de descuento en tu primer envío.', active: true, color: 'accent' },
        { id: 2, text: '📍 Servicio puerta a puerta — Guatemala, Huehuetenango, Chimaltenango y Petén. ¡Cotiza ahora!', active: true, color: 'primary' },
    ],
    whatsapp: {
        number: '50255683682',
        message: 'Hola, me interesa información sobre sus servicios de paquetería 📦',
    },
    socialLinks: {
        facebook: 'https://facebook.com/NacionalesDeliveryServices',
        instagram: 'https://instagram.com/NacionalesDeliveryServices',
        tiktok: 'https://tiktok.com/@NacionalesDS',
        whatsapp: '50255683682',
        youtube: 'https://youtube.com/@NacionalesDS',
    },
    stickyLinks: [
        { id: 1, label: 'WhatsApp', color: '#25D366', icon: 'whatsapp', url: 'https://wa.me/50255683682', active: true },
        { id: 2, label: 'Facebook', color: '#1877F2', icon: 'facebook', url: 'https://facebook.com/NacionalesDeliveryServices', active: true },
        { id: 3, label: 'Instagram', color: '#E4405F', icon: 'instagram', url: 'https://instagram.com/NacionalesDeliveryServices', active: true },
        { id: 4, label: 'TikTok', color: '#000000', icon: 'tiktok', url: 'https://tiktok.com/@NacionalesDS', active: true },
    ],
}

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
    const [config, setConfig] = useState(() => {
        try {
            const saved = localStorage.getItem('nds_admin_config')
            return saved ? JSON.parse(saved) : defaultConfig
        } catch { return defaultConfig }
    })

    useEffect(() => {
        localStorage.setItem('nds_admin_config', JSON.stringify(config))
    }, [config])

    const updateConfig = (updates) => setConfig(prev => ({ ...prev, ...updates }))

    const updateAnnouncement = (id, updates) => {
        setConfig(prev => ({
            ...prev,
            announcements: prev.announcements.map(a => a.id === id ? { ...a, ...updates } : a)
        }))
    }

    const addAnnouncement = (text) => {
        const newItem = { id: Date.now(), text, active: true, color: 'accent' }
        setConfig(prev => ({ ...prev, announcements: [...prev.announcements, newItem] }))
    }

    const deleteAnnouncement = (id) => {
        setConfig(prev => ({ ...prev, announcements: prev.announcements.filter(a => a.id !== id) }))
    }

    return (
        <AdminContext.Provider value={{ config, updateConfig, updateAnnouncement, addAnnouncement, deleteAnnouncement }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)
