import { createContext, useContext, useState, useEffect } from 'react'

const defaultConfig = {
    announcements: [
        { id: 2, text: '📍 Servicio puerta a puerta — Guatemala, Huehuetenango, Chimaltenango y Petén. ¡Cotiza ahora!', active: true, color: 'primary' },
    ],
    whatsapp: {
        number: '50256836688',
        message: 'Hola! 👋 Quiero cotizar un envío 📦. ¿Me podrían ayudar?',
    },
    socialLinks: {
        facebook: 'https://www.facebook.com/profile.php?id=61586422649312',
        instagram: 'https://www.instagram.com/nacionalesdelivery/',
        tiktok: 'https://www.tiktok.com/@nacionales.delive',
        whatsapp: '50256836688',
        youtube: 'https://www.youtube.com/@NacionalesDS',
    },
    stickyLinks: [
        { id: 1, label: 'WhatsApp', color: '#25D366', icon: 'whatsapp', url: 'https://wa.me/50256836688', active: true },
        { id: 2, label: 'Facebook', color: '#1877F2', icon: 'facebook', url: 'https://www.facebook.com/profile.php?id=61586422649312', active: true },
        { id: 3, label: 'Instagram', color: '#E4405F', icon: 'instagram', url: 'https://www.instagram.com/nacionalesdelivery/', active: true },
        { id: 4, label: 'TikTok', color: '#000000', icon: 'tiktok', url: 'https://www.tiktok.com/@nacionales.delive', active: true },
        { id: 5, label: 'YouTube', color: '#FF0000', icon: 'youtube', url: 'https://www.youtube.com/@NacionalesDS', active: true },
    ],
}

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
    const [config, setConfig] = useState(() => {
        try {
            const saved = localStorage.getItem('nds_admin_config')
            if (saved) {
                const parsed = JSON.parse(saved)
                // Force remove the old 10% discount announcement (id: 1) if it exists in user's cache
                if (parsed.announcements) {
                    parsed.announcements = parsed.announcements.filter(a => a.id !== 1)
                }
                // Force update social links to the new official links from defaultConfig
                parsed.socialLinks = defaultConfig.socialLinks
                parsed.stickyLinks = defaultConfig.stickyLinks

                return parsed
            }
            return defaultConfig
        } catch {
            return defaultConfig
        }
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
