import { useAdmin } from '../context/AdminContext'
import { X, Megaphone } from 'lucide-react'
import { useState } from 'react'

export default function AnnouncementBanner() {
    const { config } = useAdmin()
    const [dismissed, setDismissed] = useState(false)

    const activeAnnouncements = config.announcements.filter((a) => a.active)

    if (dismissed || activeAnnouncements.length === 0) return null

    const text = activeAnnouncements.map((a) => a.text).join('     •     ')

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-accent to-accent-dark text-primary-dark">
            <div className="relative flex items-center h-10 overflow-hidden">
                <div className="flex items-center gap-2 px-3 shrink-0 bg-accent-dark/30 h-full">
                    <Megaphone className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className="announcement-text text-sm font-semibold">
                        {text}     •     {text}
                    </div>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="px-3 h-full flex items-center justify-center hover:bg-black/10 transition-colors shrink-0"
                    aria-label="Cerrar anuncio"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
