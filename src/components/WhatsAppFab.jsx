import { MessageCircle } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

export default function WhatsAppFab() {
    const { config } = useAdmin()
    const { number, message } = config.whatsapp

    return (
        <a
            href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-fab group"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-7 h-7 text-white" />
            {/* Tooltip */}
            <span
                className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-white text-gray-800 text-sm font-semibold
                   whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100
                   transition-all duration-300 pointer-events-none"
            >
                ¡Escríbenos! 💬
            </span>
        </a>
    )
}
