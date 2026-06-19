import { useEffect, useRef, useState } from 'react'

export default function ChromaKeyVideo({ src, className, scale = 1.0 }) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [videoError, setVideoError] = useState(false)
    const [isInView, setIsInView] = useState(false)

    // Setup Intersection Observer to detect visibility
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting)
            },
            { threshold: 0.05 } // Trigger when at least 5% of the component is visible
        )
        observer.observe(container)

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return

        let active = true
        let animationFrameId
        let callbackId
        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        const processFrame = () => {
            if (!active) return

            // Stop processing if not visible, paused, or ended
            if (!isInView || video.paused || video.ended) {
                return
            }

            const vw = video.videoWidth
            const vh = video.videoHeight
            if (vw && vh) {
                // Proportional cropping coordinates to crop empty green screen margins
                const sx = Math.round(vw * 0.0468) // 60px on 1280px width
                const sy = Math.round(vh * 0.1250) // 90px on 720px height (preserves curved roofs)
                const sw = Math.round(vw * 0.9062) // 1160px on 1280px width
                const sh = Math.round(vh * 0.7638) // 550px on 720px height (preserves tires and roofs)

                // Optimization: render at lower resolution scale (0.8 on desktop, 0.5 on mobile)
                // This reduces processing load by ~36% on desktop while maintaining high visual quality.
                const isMobile = window.innerWidth < 768
                const resolutionScale = isMobile ? 0.5 : 0.8

                const targetW = Math.round(sw * scale * resolutionScale)
                const targetH = Math.round(sh * scale * resolutionScale)
                if (canvas.width !== targetW || canvas.height !== targetH) {
                    canvas.width = targetW
                    canvas.height = targetH
                }

                // Draw cropped frame to canvas
                ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetW, targetH)

                // Retrieve frame pixel data
                const imgData = ctx.getImageData(0, 0, targetW, targetH)
                const data = imgData.data
                const len = data.length

                // Apply chroma key (remove green)
                for (let i = 0; i < len; i += 4) {
                    const r = data[i]
                    const g = data[i + 1]
                    const b = data[i + 2]

                    // If green channel is high and significantly larger than red and blue
                    if (g > 70 && g > r * 1.2 && g > b * 1.2) {
                        data[i + 3] = 0 // transparent alpha
                    }
                }

                // Apply dynamic inner shadow around transparent edges (removes green spill/fringes)
                // Skip on mobile to maximize performance and save battery
                if (!isMobile) {
                    const stride = targetW * 4
                    for (let y = 1; y < targetH - 1; y++) {
                        for (let x = 1; x < targetW - 1; x++) {
                            const idx = (y * targetW + x) * 4

                            // If current pixel is opaque, check neighbors
                            if (data[idx + 3] > 0) {
                                const leftA = data[idx - 4 + 3]
                                const rightA = data[idx + 4 + 3]
                                const topA = data[idx - stride + 3]
                                const bottomA = data[idx + stride + 3]

                                if (leftA === 0 || rightA === 0 || topA === 0 || bottomA === 0) {
                                    // 1px edge: darken by 70% to absorb green bleed
                                    data[idx] = (data[idx] * 0.3) | 0
                                    data[idx + 1] = (data[idx + 1] * 0.3) | 0
                                    data[idx + 2] = (data[idx + 2] * 0.3) | 0
                                } else if (y > 2 && y < targetH - 2 && x > 2 && x < targetW - 2) {
                                    // 2px edge: darken by 35% for smooth inner shadow transition
                                    const left2A = data[idx - 8 + 3]
                                    const right2A = data[idx + 8 + 3]
                                    const top2A = data[idx - stride * 2 + 3]
                                    const bottom2A = data[idx + stride * 2 + 3]

                                    if (left2A === 0 || right2A === 0 || top2A === 0 || bottom2A === 0) {
                                        data[idx] = (data[idx] * 0.65) | 0
                                        data[idx + 1] = (data[idx + 1] * 0.65) | 0
                                        data[idx + 2] = (data[idx + 2] * 0.65) | 0
                                    }
                                }
                            }
                        }
                    }
                }

                // Write transparent pixels back to canvas
                ctx.putImageData(imgData, 0, 0)
            }

            // Schedule next frame processing
            if (video.requestVideoFrameCallback) {
                callbackId = video.requestVideoFrameCallback(processFrame)
            } else {
                animationFrameId = requestAnimationFrame(processFrame)
            }
        }

        const startLoop = () => {
            if (!active || !isInView) return
            if (video.requestVideoFrameCallback) {
                if (callbackId) video.cancelVideoFrameCallback(callbackId)
                callbackId = video.requestVideoFrameCallback(processFrame)
            } else {
                if (animationFrameId) cancelAnimationFrame(animationFrameId)
                animationFrameId = requestAnimationFrame(processFrame)
            }
        }

        const stopLoop = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId)
            if (callbackId && video.cancelVideoFrameCallback) {
                video.cancelVideoFrameCallback(callbackId)
            }
        }

        video.addEventListener('play', startLoop)
        video.addEventListener('pause', stopLoop)

        // Control video play/pause based on visibility in viewport
        if (isInView) {
            video.play().catch(err => {
                console.log("Autoplay was prevented by browser security rules, waiting for user interaction:", err)
            })
            if (!video.paused) {
                startLoop()
            }
        } else {
            video.pause()
            stopLoop()
        }

        // Backup play on window user interactions
        const forcePlay = () => {
            if (isInView && video.paused) {
                video.play().catch(() => { })
            }
        }
        window.addEventListener('click', forcePlay)
        window.addEventListener('touchstart', forcePlay)

        return () => {
            active = false
            stopLoop()
            video.removeEventListener('play', startLoop)
            video.removeEventListener('pause', stopLoop)
            window.removeEventListener('click', forcePlay)
            window.removeEventListener('touchstart', forcePlay)
        }
    }, [src, scale, isInView])

    return (
        <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
            {/* Hidden video element */}
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                autoPlay
                className="hidden"
                crossOrigin="anonymous"
                onError={() => setVideoError(true)}
            />

            {/* Chroma keyed canvas rendering */}
            {!videoError ? (
                <canvas
                    ref={canvasRef}
                    className="w-full h-auto max-w-full"
                    style={{
                        filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0px 20px 50px rgba(62, 198, 224, 0.06))'
                    }}
                />
            ) : (
                <div className="text-white/40 text-sm py-8 text-center border border-dashed border-white/10 rounded-2xl w-full">
                    No se pudo cargar el video promocional.
                </div>
            )}
        </div>
    )
}
