import { useEffect, useRef } from 'react'
import { Package, Truck, Bike, MapPin, Navigation, Box } from 'lucide-react'

const ICONS = [Package, Truck, Bike, MapPin, Navigation, Box]

export default function BackgroundAnimation() {
    const containerRef = useRef(null)

    useEffect(() => {
        const loadAnime = async () => {
            try {
                const anime = (await import('animejs/lib/anime.es.js')).default

                // Create particles
                const count = 15
                const container = containerRef.current
                if (!container) return

                for (let i = 0; i < count; i++) {
                    const iconIndex = Math.floor(Math.random() * ICONS.length)
                    const Icon = ICONS[iconIndex]

                    const el = document.createElement('div')
                    el.className = 'absolute opacity-0 pointer-events-none text-accent/10'
                    el.style.left = `${Math.random() * 100}%`
                    el.style.top = `${Math.random() * 100}%`

                    // We can't easily render React components into strings to append as DOM, 
                    // so we use a simpler approach: SVG paths or just let React handle it.
                    // But since we want randomized floating elements, let's do it the "React way"
                }

            } catch (e) {
                console.error("Background animation failed", e)
            }
        }
        loadAnime()
    }, [])

    // Let's use a more React-friendly way for the particles to avoid DOM manipulation issues
    const particles = Array.from({ length: 12 }).map((_, i) => {
        const Icon = ICONS[i % ICONS.length]
        return {
            id: i,
            Icon,
            size: Math.random() * 20 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 5000,
            duration: Math.random() * 10000 + 10000,
        }
    })

    useEffect(() => {
        const runAnimation = async () => {
            const anime = (await import('animejs/lib/anime.es.js')).default
            anime({
                targets: '.bg-particle',
                translateX: () => anime.random(-50, 50),
                translateY: () => anime.random(-50, 50),
                rotate: () => anime.random(-15, 15),
                opacity: [0.03, 0.08, 0.03],
                duration: () => anime.random(15000, 25000),
                delay: () => anime.random(0, 5000),
                easing: 'easeInOutQuad',
                loop: true,
                direction: 'alternate'
            })
        }
        runAnimation()
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Deep Dark Blue Gradient Base */}
            <div className="absolute inset-0 bg-[#070b24]" />

            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,45,122,0.3)_0%,transparent_70%)]" />

            {/* Floating Icons */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="bg-particle absolute"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                    }}
                >
                    <p.Icon className="w-full h-full text-accent/20" strokeWidth={1.5} />
                </div>
            ))}
        </div>
    )
}
