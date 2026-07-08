import { useState } from 'react'
import { Search, Package, Truck, CheckCircle, MapPin, Clock, XCircle, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from './ScrollReveal'

const statusConfig = {
    'PENDIENTE': { label: 'Paquete Registrado', icon: Package, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
    'RECOGIDO': { label: 'Recolectado', icon: Package, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    'EN_TRANSITO': { label: 'En Tránsito', icon: Truck, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    'EN_DESTINO': { label: 'En Centro de Distribución', icon: MapPin, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    'ENTREGADO': { label: 'Entregado', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    'CANCELADO': { label: 'Cancelado', icon: XCircle, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
}

export default function TrackingSection() {
    const [guia, setGuia] = useState('')
    const [shipment, setShipment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchError, setSearchError] = useState(false)

    const handleTrack = async (e) => {
        e.preventDefault()
        if (!guia.trim()) {
            setShipment(null)
            setSearchError(true)
            toast.error('Ingresa tu número de guía')
            return
        }

        setLoading(true)
        setShipment(null)
        setSearchError(false)

        const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api'
            : 'https://api.nexgo.delivery/api'

        try {
            const res = await fetch(`${BASE_URL}/public/shipments/track/${guia.trim().toUpperCase()}`)
            const result = await res.json()

            if (!res.ok || !result.success) {
                throw new Error(result.message || 'No se encontró el paquete.')
            }

            setShipment(result.data)
            toast.success('¡Guía encontrada! 📦')
        } catch (err) {
            setSearchError(true)
            toast.error(err.message || 'Error al conectar con el servidor')
        } finally {
            setLoading(false)
        }
    }

    const getTimelineSteps = (currentStatus) => {
        const baseSteps = [
            { key: 'PENDIENTE', label: 'Registrado', icon: Package },
            { key: 'RECOGIDO', label: 'Recolectado', icon: Package },
            { key: 'EN_TRANSITO', label: 'En Tránsito', icon: Truck },
            { key: 'ENTREGADO', label: 'Entregado', icon: CheckCircle }
        ];
        if (currentStatus === 'CANCELADO') {
            return [
                { key: 'PENDIENTE', label: 'Registrado', icon: Package },
                { key: 'RECOGIDO', label: 'Recolectado', icon: Package },
                { key: 'EN_TRANSITO', label: 'En Tránsito', icon: Truck },
                { key: 'CANCELADO', label: 'Cancelado', icon: XCircle }
            ];
        }
        return baseSteps;
    };

    const getStepState = (stepKey, currentStatus, history = []) => {
        const historyIndex = history.findIndex(h => h.status === stepKey || (stepKey === 'EN_TRANSITO' && h.status === 'EN_DESTINO'));
        const hasOccurred = historyIndex !== -1;
        
        const isCurrent = currentStatus === stepKey || 
            (stepKey === 'EN_TRANSITO' && currentStatus === 'EN_DESTINO');
            
        if (isCurrent) {
            return 'active';
        }
        if (hasOccurred) {
            return 'completed';
        }
        return 'pending';
    };

    const getEstimatedDeliveryDate = (shipment) => {
        if (!shipment) return null;
        
        if (shipment.currentStatus === 'ENTREGADO') {
            const deliveryEvent = shipment.history?.find(h => h.status === 'ENTREGADO');
            if (deliveryEvent) {
                return new Date(deliveryEvent.created_at);
            }
        }
        
        let baseDate = shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery) : null;
        if (!baseDate) {
            const created = shipment.createdAt ? new Date(shipment.createdAt) : new Date();
            baseDate = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
        }
        
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        let finalDate = new Date(baseDate);
        while (finalDate < today) {
            finalDate = new Date(finalDate.getTime() + 5 * 24 * 60 * 60 * 1000);
        }
        
        return finalDate;
    };

    const getDeliveryDateTimeText = (shipment) => {
        if (!shipment) return '';
        const deliveryEvent = shipment.history?.find(h => h.status === 'ENTREGADO');
        const eventDate = deliveryEvent ? deliveryEvent.created_at : shipment.updatedAt;
        return `El paquete ya fue entregado el ${formatDate(eventDate)} a las ${formatTime(eventDate)}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('es-GT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    const formatTime = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleTimeString('es-GT', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <section id="rastreo" className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="section-title">
                            <span className="gradient-text">Rastrea</span> tu paquete
                        </h2>
                        <p className="section-subtitle">
                            Ingresa tu número de guía para conocer la ubicación y el estado de tu envío en tiempo real.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xl text-slate-800">
                        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 mb-8">
                            <div className="flex-1 relative">
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={guia}
                                    onChange={(e) => setGuia(e.target.value)}
                                    placeholder="Ej: NX-2026-0700123"
                                    className="input-field !pl-12 !bg-slate-50 !border-slate-900/65 focus:!border-slate-900 text-slate-800 placeholder-slate-400 font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl cursor-pointer transition-all disabled:opacity-50 shrink-0 shadow-md"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Buscando...
                                    </span>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" /> Rastrear
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Shipment Info Panel */}
                        {shipment ? (
                            <div className="space-y-8 animate-fade-up">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 border-x border-b border-slate-200/80 border-t-[3px] border-t-slate-900 p-6 rounded-2xl relative overflow-hidden">
                                    {/* Watermark Logo */}
                                    <img 
                                        src="/images/IzotipoNormalNexgoWhite.png" 
                                        alt="" 
                                        className="absolute -right-6 top-2 w-44 h-44 object-contain opacity-[0.04] brightness-0 pointer-events-none z-0" 
                                    />
                                    
                                    <div className="relative z-10">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Detalles del Envío</p>
                                        <div className="mt-3 space-y-2">
                                            <p className="text-sm text-slate-600">
                                                <strong className="text-slate-900 font-semibold">Guía:</strong> {shipment.trackingNumber}
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                <strong className="text-slate-900 font-semibold">Destinatario:</strong> {shipment.recipientName}
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                <strong className="text-slate-900 font-semibold">Origen:</strong> {shipment.originCity}
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                <strong className="text-slate-900 font-semibold">Destino:</strong> {shipment.destinationCity}
                                                {shipment.recipientMunicipality && `, ${shipment.recipientMunicipality}`}
                                                {shipment.recipientDepartment && `, ${shipment.recipientDepartment}`}
                                            </p>
                                            {shipment.recipientAddress && (
                                                <p className="text-sm text-slate-600">
                                                    <strong className="text-slate-900 font-semibold">Dirección:</strong> {shipment.recipientAddress}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Detalles del Paquete</p>
                                        <div className="mt-3 space-y-2">
                                            {shipment.senderCompany && (
                                                <p className="text-sm text-slate-600">
                                                    <strong className="text-slate-900 font-semibold">Empresa que envía:</strong> {shipment.senderCompany}
                                                </p>
                                            )}
                                            <p className="text-sm text-slate-600">
                                                <strong className="text-slate-900 font-semibold">Total libras:</strong> {shipment.weightKg} lbs
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                <strong className="text-slate-900 font-semibold">Piezas:</strong> {shipment.quantity} {shipment.quantity === 1 ? 'pieza' : 'piezas'}
                                            </p>
                                            <p className="text-sm text-slate-600 flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-slate-700 shrink-0" />
                                                <strong className="text-slate-900 font-semibold">Fecha estimada:</strong> {shipment.currentStatus === 'ENTREGADO' ? getDeliveryDateTimeText(shipment) : shipment.currentStatus === 'CANCELADO' ? 'Envío Cancelado' : formatDate(getEstimatedDeliveryDate(shipment))}
                                            </p>
                                            <p className="text-sm text-slate-600 flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-slate-700 shrink-0" />
                                                <strong className="text-slate-900 font-semibold">Actualizado:</strong> {formatDate(shipment.updatedAt)} a las {formatTime(shipment.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Process Progress Line */}
                                <div className="space-y-6 pt-4">
                                    <h4 className="text-lg font-bold text-slate-900 mb-6">Estado del Envío</h4>
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 relative pt-4 pb-8">
                                        {/* Progress Line Background */}
                                        <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
                                        
                                        {/* Progress Line Active Fill */}
                                        <div 
                                            className="hidden md:block absolute top-[40px] left-[12.5%] h-[2px] bg-slate-900 -translate-y-1/2 z-0 transition-all duration-500"
                                            style={{ 
                                                width: `${
                                                    Math.max(0, (getTimelineSteps(shipment.currentStatus).findIndex(s => s.key === shipment.currentStatus || (s.key === 'EN_TRANSITO' && shipment.currentStatus === 'EN_DESTINO'))) / 3 * 75)
                                                }%` 
                                            }} 
                                        />

                                        {getTimelineSteps(shipment.currentStatus).map((step, index) => {
                                            const state = getStepState(step.key, shipment.currentStatus, shipment.history);
                                            const IconComponent = step.icon;
                                            
                                            let circleClass = "w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ";
                                            let labelClass = "text-sm mt-3 text-center transition-all duration-300 ";
                                            
                                            if (state === 'completed' || state === 'active') {
                                                if (step.key === 'CANCELADO') {
                                                    circleClass += "bg-rose-600 border-transparent text-white shadow-md";
                                                    labelClass += "text-rose-600 font-bold";
                                                } else {
                                                    circleClass += "bg-slate-900 border-transparent text-white shadow-md shadow-slate-900/10";
                                                    labelClass += "text-slate-900 font-semibold";
                                                }
                                            } else {
                                                circleClass += "bg-white border-slate-200 text-slate-400";
                                                labelClass += "text-slate-400";
                                            }
                                            
                                            const historyItem = shipment.history.find(h => h.status === step.key || (step.key === 'EN_TRANSITO' && h.status === 'EN_DESTINO'));
                                            
                                            return (
                                                <div key={step.key} className="flex-1 flex flex-col items-center relative z-10 w-full md:w-auto">
                                                    {/* Mobile connecting line */}
                                                    {index > 0 && (
                                                        <div className={`md:hidden absolute -top-8 left-1/2 -translate-x-1/2 w-[2px] h-8 ${state === 'pending' ? 'bg-slate-200' : 'bg-slate-900'}`} />
                                                    )}
                                                    
                                                    <div className={circleClass}>
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    
                                                    <div className="flex flex-col items-center">
                                                        <p className={labelClass}>{step.label}</p>
                                                        {historyItem && (
                                                            <span className="text-[10px] text-slate-500 mt-1 text-center">
                                                                {formatDate(historyItem.created_at)}
                                                            </span>
                                                        )}
                                                        {historyItem && (
                                                            <span className="text-[9px] text-slate-900 text-center font-bold">
                                                                {formatTime(historyItem.created_at)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-16 pb-8 text-center animate-fade-up">
                                <img
                                    src="/images/IzotipoNormalNexgoWhite.png"
                                    alt="Nexgo Logo"
                                    className={`w-36 h-36 object-contain brightness-0 mb-4 opacity-80 ${searchError ? '' : 'animate-bounce'}`}
                                />
                                {searchError ? (
                                    <div className="max-w-md mx-auto">
                                        <h3 className="text-base font-bold text-slate-800 leading-relaxed px-4">
                                            Lo siento no encontre lo que intentas buscar por favor intenta de nuevo o verifica tu numero de guia
                                        </h3>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                                            Nexgo sabe donde esta tu paquete
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1 font-medium">
                                            Averiguemos donde...
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
