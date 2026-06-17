import { useEffect } from 'react'

export default function CotizadorPage() {
    useEffect(() => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        window.location.href = isLocal ? 'http://localhost:4200/cotizar' : 'https://nexgo.delivery/cotizar';
    }, [])

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#05081a] text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#3EC6E0] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-bold tracking-wider uppercase text-blue-200">Redireccionando al Cotizador...</p>
            </div>
        </div>
    )
}
