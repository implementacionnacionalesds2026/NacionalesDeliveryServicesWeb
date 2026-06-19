import { useEffect, useRef } from 'react'

// Dynamic HSL RGB star field with tide wave modulation

export default function BackgroundAnimation() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let points = []
        let time = 0

        const mouse = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            radius: 45, // Interaction radius (50% smaller)
            strength: 35, // Push force (proportional)
            active: false
        }

        const spring = 0.08
        const friction = 0.82

        const initGrid = () => {
            const w = canvas.width = window.innerWidth
            const h = canvas.height = window.innerHeight

            // Grid spacing (increased density by 45%)
            const spacing = 28
            const cols = Math.ceil(w / spacing) + 1
            const rows = Math.ceil(h / spacing) + 1

            points = []
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const x = c * spacing
                    const y = r * spacing
                    // Distribute base hues across coordinates for a smooth RGB color wave flow
                    const baseHue = (c * 7 + r * 5) % 360
                    points.push({
                        x: x,
                        y: y,
                        originalX: x,
                        originalY: y,
                        vx: 0,
                        vy: 0,
                        baseHue: baseHue
                    })
                }
            }
        }

        // Helper to draw a 4-pointed star
        const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color, alpha) => {
            let rot = Math.PI / 2 * 3
            let x = cx
            let y = cy
            const step = Math.PI / spikes

            ctx.fillStyle = color
            ctx.globalAlpha = alpha

            ctx.beginPath()
            ctx.moveTo(cx, cy - outerRadius)
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius
                y = cy + Math.sin(rot) * outerRadius
                ctx.lineTo(x, y)
                rot += step

                x = cx + Math.cos(rot) * innerRadius
                y = cy + Math.sin(rot) * innerRadius
                ctx.lineTo(x, y)
                rot += step
            }
            ctx.lineTo(cx, cy - outerRadius)
            ctx.closePath()
            ctx.fill()
            ctx.globalAlpha = 1.0 // reset
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.015 // Gently advance tide time factor

            // Smooth mouse transition
            if (mouse.active) {
                mouse.x += (mouse.targetX - mouse.x) * 0.18
                mouse.y += (mouse.targetY - mouse.y) * 0.18
            }

            // Draw and update points
            const len = points.length
            for (let i = 0; i < len; i++) {
                const p = points[i]

                // Continuous subtle tide/wave offsets (undulating motion)
                const waveFactor = Math.sin(time + p.originalY * 0.006 + p.originalX * 0.003)
                const waveX = waveFactor * 6
                const waveY = Math.cos(time + p.originalX * 0.006 + p.originalY * 0.003) * 6

                let targetX = p.originalX + waveX
                let targetY = p.originalY + waveY
                let dist = 99999

                if (mouse.active) {
                    const dx = targetX - mouse.x
                    const dy = targetY - mouse.y
                    dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius // 0 to 1
                        const angle = Math.atan2(dy, dx)
                        // Push away from the mouse
                        targetX += Math.cos(angle) * force * mouse.strength
                        targetY += Math.sin(angle) * force * mouse.strength
                    }
                }

                // Spring physics
                const ax = (targetX - p.x) * spring
                const ay = (targetY - p.y) * spring

                p.vx = (p.vx + ax) * friction
                p.vy = (p.vy + ay) * friction

                p.x += p.vx
                p.y += p.vy

                // RGB tide brightness modulation: higher opacity at high tide (waveFactor close to 1)
                const normWave = (waveFactor + 1) / 2 // Normalize to 0..1
                let outerR = 2.2
                let innerR = 0.7
                
                // Base opacity fluctuates between 0.15 (low tide) and 0.42 (high tide)
                let alpha = 0.15 + normWave * 0.27

                if (dist < mouse.radius) {
                    const factor = 1 - dist / mouse.radius
                    outerR = 2.2 + factor * 3.8 // grow star size
                    innerR = 0.7 + factor * 1.3
                    // Interaction glow: overlay additional opacity up to 0.85
                    alpha = alpha + factor * (0.85 - alpha)
                }

                // Dynamic RGB color: Hue slides smoothly over time
                const hue = (p.baseHue + time * 15) % 360
                const color = `hsl(${hue}, 85%, 65%)`

                // Draw as a 4-pointed star
                drawStar(p.x, p.y, 4, outerR, innerR, color, alpha)
            }



            animationFrameId = requestAnimationFrame(animate)
        }

        // Listeners on window to track mouse coordinate across components
        const handleMouseMove = (e) => {
            mouse.targetX = e.clientX
            mouse.targetY = e.clientY
            mouse.active = true
        }

        const handleMouseLeave = () => {
            mouse.active = false
        }

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouse.targetX = e.touches[0].clientX
                mouse.targetY = e.touches[0].clientY
                mouse.active = true
            }
        }

        const handleTouchEnd = () => {
            mouse.active = false
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('touchmove', handleTouchMove, { passive: true })
        window.addEventListener('touchend', handleTouchEnd)
        window.addEventListener('resize', initGrid)

        // Initialize and start loop
        initGrid()
        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
            window.removeEventListener('resize', initGrid)
        }
    }, [])

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient background glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[150px]" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-80"
            />
        </div>
    )
}

