import { useEffect, useRef, useState } from 'react'

function useInView(ref, opts = {}) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        if (!ref.current) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
            { threshold: 0.15, ...opts }
        )
        obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

export default function ScrollReveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null)
    const inView = useInView(ref)

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}`}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    )
}
