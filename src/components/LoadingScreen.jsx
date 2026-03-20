import { useEffect, useState } from 'react'
import { Package, Truck, Bike, MapPin, Navigation, Box } from 'lucide-react'

const ICON_TYPES = [Package, Truck, Bike, MapPin, Navigation, Box]

const BOXES = Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * 360
    const rad = (angle * Math.PI) / 180
    const dist = 280 + (i * 37) % 280
    const tx = Math.cos(rad) * dist
    const ty = Math.sin(rad) * dist
    const size = 14 + (i * 9) % 28
    const dur = 0.55 + (i * 0.02) % 0.35
    const delay = (i * 0.008) % 0.12
    const spin = -300 + (i * 37) % 600
    const colors = ['#3EC6E0', '#5ED4EE', '#1B8FAA', '#7DE0F5', '#2AB5D4', '#1B3FA0', '#5588FF']
    const color = colors[i % colors.length]
    const IconComp = ICON_TYPES[i % ICON_TYPES.length]
    return { id: i, tx, ty, size, dur, delay, spin, color, IconComp }
})

export default function LoadingScreen({ onFinish }) {
    const [phase, setPhase] = useState('idle')

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('explode'), 60)
        const t2 = setTimeout(() => setPhase('settle'), 700)
        const t3 = setTimeout(() => setPhase('exit'), 1550)
        const t4 = setTimeout(() => onFinish(), 2150)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    }, [onFinish])

    const isExiting = phase === 'exit'

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&display=swap');
                @keyframes shimmer-text {
                    0%   { background-position: -300% center; }
                    100% { background-position: 300% center; }
                }
                @keyframes card-appear {
                    from { opacity: 0; transform: scale(0.7); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes progress-fill {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
                @keyframes dot-bounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40%           { transform: translateY(-5px); opacity: 1; }
                }
                @keyframes shockwave {
                    0%   { transform: scale(0.1); opacity: 0.8; }
                    100% { transform: scale(4); opacity: 0; }
                }
                .shimmer-brand {
                    background: linear-gradient(90deg, #3EC6E0 0%, #ffffff 35%, #3EC6E0 55%, #3EC6E0 100%);
                    background-size: 300% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer-text 2.2s linear infinite;
                }
                .card-appear  { animation: card-appear 0.45s cubic-bezier(0.22,1,0.36,1) both; }
                .progress-bar { animation: progress-fill 0.85s cubic-bezier(0.4,0,0.2,1) both; }
                .dot          { display: inline-block; animation: dot-bounce 1.2s ease-in-out infinite; }
                .shockwave    { animation: shockwave 0.6s ease-out both; }
            `}</style>

            <div
                style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'radial-gradient(ellipse at 50% 50%, #0D1B4B 0%, #060E26 100%)',
                    overflow: 'hidden',
                    opacity: isExiting ? 0 : 1,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: isExiting ? 'none' : 'all',
                }}
            >
                {/* Onda de choque */}
                {phase === 'explode' && (
                    <div className="shockwave" style={{
                        position: 'absolute', width: '100px', height: '100px',
                        borderRadius: '50%', border: '3px solid rgba(62,198,224,0.7)',
                        pointerEvents: 'none',
                    }} />
                )}

                {/* ── 40 íconos explotando ── */}
                {BOXES.map(box => {
                    const exploding = phase === 'explode'
                    const gone = phase === 'settle' || phase === 'exit' || phase === 'idle'
                    const { IconComp } = box

                    return (
                        <div
                            key={box.id}
                            style={{
                                position: 'absolute',
                                left: '50%', top: '50%',
                                transform: exploding
                                    ? `translate(calc(-50% + ${box.tx}px), calc(-50% + ${box.ty}px)) rotate(${box.spin}deg) scale(1)`
                                    : gone
                                    ? `translate(calc(-50% + ${box.tx * 1.6}px), calc(-50% + ${box.ty * 1.6}px)) rotate(${box.spin * 1.5}deg) scale(0)`
                                    : 'translate(-50%, -50%) rotate(0deg) scale(0)',
                                opacity: exploding ? 1 : 0,
                                transition: exploding
                                    ? `transform ${box.dur}s ${box.delay}s cubic-bezier(0.2,0.8,0.4,1), opacity ${box.dur}s ${box.delay}s ease`
                                    : 'transform 0.4s ease-in, opacity 0.3s ease-in',
                                pointerEvents: 'none',
                                filter: `drop-shadow(0 2px 6px ${box.color}88)`,
                            }}
                        >
                            <IconComp
                                style={{ width: box.size, height: box.size, color: box.color }}
                                strokeWidth={1.5}
                            />
                        </div>
                    )
                })}

                {/* ── Card central ── */}
                {(phase === 'settle' || phase === 'exit') && (
                    <div className="card-appear" style={{
                        position: 'relative', zIndex: 2,
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        padding: '36px 48px',
                        background: 'rgba(7,15,40,0.82)',
                        backdropFilter: 'blur(18px)',
                        borderRadius: '24px',
                        border: '1.5px solid rgba(62,198,224,0.22)',
                        boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 60px rgba(62,198,224,0.08)',
                        textAlign: 'center', minWidth: '290px',
                    }}>
                        <img
                            src="/images/logo1.png" alt="Nacionales Delivery"
                            style={{ width: '72px', height: '72px', marginBottom: '16px', filter: 'drop-shadow(0 4px 16px rgba(62,198,224,0.5))' }}
                        />
                        <h1 className="shimmer-brand" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', margin: '0 0 8px 0' }}>
                            Nacionales Delivery Services
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '20px' }}>
                            <span style={{ color: 'rgba(62,198,224,0.65)', fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem', marginRight: '2px' }}>Cargando</span>
                            {[0,1,2].map(i => (
                                <span key={i} className="dot" style={{ color: '#3EC6E0', fontWeight: 700, fontSize: '1rem', animationDelay: `${i * 0.2}s` }}>.</span>
                            ))}
                        </div>
                        <div style={{ width: '180px', height: '4px', borderRadius: '9999px', background: 'rgba(62,198,224,0.12)', overflow: 'hidden' }}>
                            <div className="progress-bar" style={{ height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg,#1B3FA0,#3EC6E0)' }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
