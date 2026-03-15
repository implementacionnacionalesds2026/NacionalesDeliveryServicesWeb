import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Smile, ChevronDown } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const SUGGESTIONS = [
    { text: 'Quiero enviar paquetería 📦', id: 'envio' },
    { text: 'Servicio de recolección 🏠', id: 'recoleccion' },
    { text: 'Necesito información de sus servicios ℹ️', id: 'info' }
]

const EMOJIS = [
    '👋', '📦', '🚚', '✨', '✅', '🏠', '📍', '💰', '🕒', '📱', '😊', '👍', '🔥', '🚀', '⭐',
    '😍', '🙌', '🙏', '💯', '💙', '🏢', '🗺️', '📝', '📞', '🤝', '😀', '😎', '🎉', '💪', '🥇',
    '🚛', '⚖️', '🏁', '🌍', '⚡', '💎', '💡', '🌟', '💬', '🔔', '🛠️', '📬', '🎯', '🚲', '🏙️'
]

// iPhone WhatsApp notification sound
const NOTIFICATION_SOUND_URL = 'https://raw.githubusercontent.com/yeyso/NacionalesDeliveryServicesWeb/main/public/sounds/whatsapp-iphone.mp3'
// Backup sound in case the above fails: 
const BACKUP_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.2 2.5-2.5 5.5-6.4 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7 1-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
)

export default function WhatsAppFab() {
    const { config } = useAdmin()
    const { number, message: defaultMessage } = config.whatsapp
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [showEmojis, setShowEmojis] = useState(false)
    const widgetRef = useRef(null)
    const audioRef = useRef(null)

    useEffect(() => {
        audioRef.current = new Audio(NOTIFICATION_SOUND_URL)
        audioRef.current.onerror = () => {
            audioRef.current.src = BACKUP_SOUND_URL
        }
        audioRef.current.volume = 0.6
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (widgetRef.current && !widgetRef.current.contains(event.target)) {
                setIsOpen(false)
                setShowEmojis(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleOpen = () => {
        if (!isOpen) {
            audioRef.current?.play().catch(() => {
                // Ignore audio play errors (autoplay policies)
            })
        }
        setIsOpen(!isOpen)
    }

    const handleSend = () => {
        const finalMessage = inputValue || defaultMessage
        const url = `https://wa.me/${number}?text=${encodeURIComponent(finalMessage)}`
        window.open(url, '_blank')
        // El usuario pidió "capacidad de retener lo escrito", por lo que no limpiamos el input.
        setIsOpen(false)
    }

    const handleSuggestionClick = (text) => {
        setInputValue(text)
        setShowEmojis(false)
    }

    const addEmoji = (emoji) => {
        setInputValue(prev => prev + emoji)
        setShowEmojis(false)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans select-none" ref={widgetRef}>
            {/* Ventana de Chat */}
            <div
                className={`absolute bottom-20 right-0 w-[350px] max-w-[90vw] overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
                    } bg-white flex flex-col`}
                style={{ height: '540px' }}
            >
                {/* Cabecera - WhatsApp Green (#075E54) */}
                <div className="bg-[#075E54] p-5 flex items-center justify-between shadow-lg relative shrink-0">
                    <div className="flex items-center gap-4 relative z-10">
                        {/* Profile Photo - Background Company Blue (#3EC6E0) */}
                        <div className="w-12 h-12 rounded-full bg-[#3EC6E0] p-1 shadow-inner flex items-center justify-center border-2 border-white/20">
                            <img src="/images/logo.png" alt="NDS Logo" className="w-full h-full object-contain brightness-110" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-bold text-[16px] leading-tight flex items-center gap-1.5">
                                NDS Guatemala
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse shadow-[0_0_8px_#25D366]" />
                                <span className="text-white/90 font-semibold text-[11px] uppercase tracking-wider">En línea</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/70 hover:text-white transition-all p-1"
                    >
                        <X size={26} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Cuerpo del Chat - Fondo Azulito suave */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 relative bg-[#E6F4F7] custom-scrollbar">
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(#075E54 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

                    {/* Mensaje de bienvenida */}
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-[0_2px_10px_rgba(0,0,0,0.05)] max-w-[85%] relative animate-in fade-in slide-in-from-left duration-700 z-10">
                        <p className="text-gray-800 text-[13.5px] font-medium leading-relaxed">
                            ¡Hola! 👋 Bienvenido a Nacionales Delivery Services. ¿En qué podemos ayudarte hoy? 😊
                        </p>
                        <div className="text-[10px] text-gray-400 text-right mt-2 font-black tabular-nums">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    {/* Sugerencias */}
                    <div className="flex flex-col gap-2.5 mt-4 z-10">
                        <p className="text-[10px] text-[#075E54] uppercase font-black tracking-widest ml-1 mb-1">Opciones rápidas:</p>
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => handleSuggestionClick(s.text)}
                                className="bg-white border-2 border-transparent text-gray-700 py-3.5 px-5 rounded-2xl text-[13px] font-bold text-left
                                         hover:border-[#3EC6E0] hover:text-[#075E54] transition-all duration-300 transform hover:translate-x-1 shadow-sm flex items-center justify-between group"
                            >
                                <span>{s.text}</span>
                                <ChevronDown className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity rotate-[-90deg] stroke-[3]" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Input */}
                <div className="p-4 bg-white flex flex-col gap-3 border-t border-gray-100 shrink-0 relative">
                    {/* Selector de Emojis */}
                    {showEmojis && (
                        <div className="absolute bottom-full mb-2 left-4 right-4 bg-white rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-4 grid grid-cols-6 gap-2 animate-in zoom-in duration-300 z-50">
                            <div className="col-span-6 mb-3 flex justify-between items-center px-1">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Emojis</span>
                                <Smile className="text-[#3EC6E0] w-5 h-5" />
                            </div>
                            <div className="col-span-6 grid grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-1">
                                {EMOJIS.map(emoji => (
                                    <button
                                        key={emoji}
                                        onClick={() => addEmoji(emoji)}
                                        className="text-xl hover:bg-[#F0F7FF] p-2 rounded-xl transition-all active:scale-75 hover:scale-125"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowEmojis(!showEmojis)}
                            className={`p-2 transition-all rounded-xl ${showEmojis ? 'text-[#3EC6E0] bg-[#F0F7FF]' : 'text-gray-400 hover:text-[#3EC6E0]'}`}
                        >
                            <Smile size={28} strokeWidth={2.5} />
                        </button>
                        
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#3EC6E0] focus:bg-white py-3 px-5 rounded-2xl text-[14px] text-gray-800 outline-none transition-all font-bold placeholder:text-gray-400 shadow-inner"
                            />
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className={`p-3.5 rounded-2xl transition-all duration-500 ${inputValue.trim()
                                ? 'bg-[#3EC6E0] text-white shadow-[0_8px_20px_-5px_#3EC6E0] hover:-translate-y-1 active:translate-y-0'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                } flex items-center justify-center`}
                        >
                            <Send size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenedor del Botón y Tooltip para alineación perfecta */}
            <div className="relative flex items-center justify-end h-[80px]">
                {/* Tooltip con Pulso */}
                {!isOpen && (
                    <div className="absolute right-[96px] top-1/2 -translate-y-1/2 px-6 py-3.5 rounded-2xl bg-[#0a1035] text-white text-[14px] font-black shadow-2xl animate-in fade-in slide-in-from-right duration-700 whitespace-nowrap border border-white/10 hidden md:flex items-center gap-3 z-0">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                        </div>
                        ¿En qué te ayudamos?
                    </div>
                )}

                {/* Botón FAB - Logo WhatsApp */}
                <button
                    onClick={toggleOpen}
                    className={`flex items-center justify-center w-[80px] h-[80px] rounded-full shadow-[0_15px_35px_-5px_rgba(37,211,102,0.5)] transition-all duration-500 transform relative z-10 ${isOpen 
                        ? 'rotate-[135deg] bg-white text-[#ff5a5a] scale-90' 
                        : 'bg-[#25D366] text-white hover:scale-105 hover:shadow-[0_20px_45px_-10px_rgba(37,211,102,0.6)]'
                        }`}
                >
                    {isOpen ? <X size={44} strokeWidth={3} /> : <WhatsAppIcon className="w-11 h-11" />}
                    
                    {!isOpen && (
                        <div className="absolute top-1 right-1 w-7 h-7 bg-[#3EC6E0] border-[4px] border-white rounded-full flex items-center justify-center text-[12px] font-black text-white shadow-lg animate-bounce">
                            1
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}
