import React, { useState, useRef, useEffect, useCallback, memo } from 'react'
import { X, Send, Smile, ChevronDown } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

/** 
 * MAXIMUM OPTIMIZATION V6.0
 * Performance: React.memo, useCallback, Hardware Acceleration
 * Visuals: Premium Glassmorphism, Sophisticated Gradients, Apple-style curves
 */

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

const NOTIFICATION_SOUND_URL = 'https://raw.githubusercontent.com/yeyso/NacionalesDeliveryServicesWeb/main/public/sounds/whatsapp-iphone.mp3'
const BACKUP_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'

// Pre-load audio for zero latency
const notificationAudio = new Audio(NOTIFICATION_SOUND_URL)
notificationAudio.volume = 0.6
notificationAudio.onerror = () => { notificationAudio.src = BACKUP_SOUND_URL }

// Memoized Icons for performance
const WhatsAppIcon = memo(({ className }) => (
    <svg viewBox="0 0 448 512" className={`${className} will-change-transform transform-gpu`} fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.2 2.5-2.5 5.5-6.4 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7 1-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
))

WhatsAppIcon.displayName = 'WhatsAppIcon'

export default function WhatsAppFab() {
    const { config } = useAdmin()
    const { number, message: defaultMessage } = config.whatsapp
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [showEmojis, setShowEmojis] = useState(false)
    const widgetRef = useRef(null)

    // Handle clicks outside of widget to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target)) {
                setIsOpen(false)
                setShowEmojis(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Smooth Toggle with haptic feel
    const toggleOpen = useCallback(() => {
        if (!isOpen) {
            notificationAudio.currentTime = 0
            notificationAudio.play().catch(() => {})
        }
        setIsOpen(prev => !prev)
    }, [isOpen])

    const handleSend = useCallback(() => {
        const finalMessage = inputValue || defaultMessage
        const url = `https://wa.me/${number}?text=${encodeURIComponent(finalMessage)}`
        window.open(url, '_blank')
        setIsOpen(false)
    }, [inputValue, defaultMessage, number])

    const handleSuggestionClick = useCallback((text) => {
        setInputValue(text)
        setShowEmojis(false)
    }, [])

    const addEmoji = useCallback((emoji) => {
        setInputValue(prev => prev + emoji)
    }, [])

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans select-none antialiased" ref={widgetRef}>
            {/* Chat Window */}
            <div
                className={`absolute bottom-24 right-0 w-[315px] max-w-[90vw] overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform-gpu ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12 pointer-events-none'
                    } bg-white flex flex-col will-change-transform`}
                style={{ height: '490px' }}
            >
                {/* Header - Optimized WhatsApp Green */}
                <div className="bg-[#075E54] p-5 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative shrink-0 z-20">
                    <div className="flex items-center gap-4 relative">
                        {/* Profile Photo - Darker Company Blue for Contrast */}
                        <div className="w-12 h-12 rounded-full bg-[#0a1035] p-1.5 shadow-inner flex items-center justify-center border-2 border-white/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                            <img src="/images/logo.png" alt="NDS Logo" className="w-full h-full object-contain brightness-110 relative z-10 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-bold text-[16px] leading-tight tracking-tight">NDS Guatemala</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                                </span>
                                <span className="text-white/90 font-bold text-[11px] tracking-[0.1em]">En línea</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/60 hover:text-white transition-all p-2 rounded-full hover:bg-white/10 active:scale-90"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* Chat Body - Refined Background Overlay */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 relative bg-[#E6F4F7] scroll-smooth custom-scrollbar">
                    {/* Pattern Overlay with hardware acceleration */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none transform-gpu" 
                         style={{ backgroundImage: 'radial-gradient(#075E54 1.2px, transparent 1.2px)', backgroundSize: '16px 16px' }} />

                    {/* Welcome Bubble */}
                    <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.03)] max-w-[85%] relative animate-in fade-in slide-in-from-left duration-700 z-10 border border-gray-50/50">
                        <p className="text-gray-800 text-[14px] font-medium leading-relaxed">
                            ¡Hola! 👋 Bienvenido a Nacionales Delivery Services. ¿En qué podemos ayudarte hoy? 😊
                        </p>
                        <div className="text-[10px] text-gray-400 text-right mt-2 font-black tabular-nums tracking-tighter">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {/* Chat tail */}
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-white transform rotate-45 -z-10" />
                    </div>

                    {/* Fast Suggestions */}
                    <div className="flex flex-col gap-2.5 mt-2 z-10">
                        {SUGGESTIONS.map((s, idx) => (
                            <button
                                key={s.id}
                                onClick={() => handleSuggestionClick(s.text)}
                                style={{ animationDelay: `${idx * 100}ms` }}
                                className="bg-white/95 backdrop-blur-sm border border-white text-gray-700 py-3.5 px-5 rounded-2xl text-[13px] font-bold text-left
                                         hover:bg-[#3EC6E0] hover:text-white hover:shadow-lg hover:shadow-[#3EC6E0]/20 transition-all duration-300 transform hover:translate-x-1.5 active:scale-95 flex items-center justify-between group animate-in slide-in-from-bottom-2 fade-in"
                            >
                                <span className="relative z-10">{s.text}</span>
                                <ChevronDown className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity rotate-[-90deg] stroke-[3]" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Area - Glassmorphism v3 */}
                <div className="p-4 bg-white/80 backdrop-blur-xl flex flex-col gap-3 border-t border-gray-100 shrink-0 relative z-30">
                    {/* Emoji Panel with hardware accel */}
                    {showEmojis && (
                        <div className="absolute bottom-full mb-3 left-4 right-4 bg-white/98 backdrop-blur-2xl rounded-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border border-white p-5 grid grid-cols-6 gap-2.5 animate-in zoom-in-95 duration-300 transform-gpu z-50">
                            <div className="col-span-6 mb-3 flex justify-between items-center px-1">
                                <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Emojis Rápidos</span>
                                <Smile className="text-[#3EC6E0] w-5 h-5" />
                            </div>
                            <div className="col-span-6 grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1 flex-wrap custom-scrollbar">
                                {EMOJIS.map(emoji => (
                                    <button
                                        key={emoji}
                                        onClick={() => addEmoji(emoji)}
                                        className="text-2xl hover:bg-[#F0F7FF] p-2.5 rounded-2xl transition-all active:scale-75 hover:scale-125 transform-gpu"
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
                            className={`p-2.5 transition-all rounded-2xl active:scale-90 ${showEmojis ? 'text-[#3EC6E0] bg-[#E6F4F7]' : 'text-gray-400 hover:text-[#3EC6E0] hover:bg-gray-50'}`}
                        >
                            <Smile size={28} strokeWidth={2.5} />
                        </button>
                        
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#3EC6E0] focus:bg-white py-3.5 px-5 rounded-2xl text-[14.5px] text-gray-800 outline-none transition-all font-bold placeholder:text-gray-400 shadow-inner group-hover:bg-gray-100/50"
                            />
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className={`p-4 rounded-2xl transition-all duration-500 shadow-xl transform-gpu ${inputValue.trim()
                                ? 'bg-[#3EC6E0] text-white shadow-[#3EC6E0]/30 hover:-translate-y-1 active:scale-90'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none scale-100'
                                } flex items-center justify-center`}
                        >
                            <Send size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Controls - Optimized Flexbox Centering */}
            <div className="flex items-center justify-end gap-4 h-[72px] md:h-[80px] mt-2">
                {/* Responsive Tooltip */}
                {!isOpen && (
                    <div className="px-6 py-4 rounded-2xl bg-[#0a1035]/95 backdrop-blur-md text-white text-[14.5px] font-black shadow-[0_10px_30px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-right-4 duration-1000 cubic-bezier(0.16, 1, 0.3, 1) whitespace-nowrap border border-white/10 hidden md:flex items-center gap-4 z-50 transform-gpu hover:scale-105 transition-transform cursor-default">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                        </div>
                        <span className="tracking-tight">¿En qué te ayudamos?</span>
                    </div>
                )}

                {/* Main FAB Trigger - Hardware Accelerated */}
                <button
                    onClick={toggleOpen}
                    aria-label="Toggle WhatsApp Chat"
                    className={`flex items-center justify-center w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform-gpu relative z-[100] shrink-0 will-change-transform ${isOpen 
                        ? 'bg-white text-[#ff4b4b] rotate-[135deg] scale-90 shadow-2xl' 
                        : 'bg-[#25D366] text-white hover:scale-110 active:scale-95 hover:shadow-[0_25px_60px_-5px_rgba(37,211,102,0.7)]'
                        }`}
                >
                    {isOpen ? (
                        <X size={44} strokeWidth={3} className="animate-in fade-in duration-300" />
                    ) : (
                        <WhatsAppIcon className="w-10 h-10 md:w-12 md:h-12 animate-in fade-in zoom-in duration-500" />
                    )}
                    
                    {!isOpen && (
                        <div className="absolute top-1 right-1 w-7 h-7 bg-[#3EC6E0] border-[4px] border-white rounded-full flex items-center justify-center text-[12px] font-black text-white shadow-xl animate-bounce z-[101] pointer-events-none">
                            1
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}
