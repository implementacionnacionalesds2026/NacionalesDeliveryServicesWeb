import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import TrackingSection from '../components/TrackingSection'
import ServicesSection from '../components/ServicesSection'
import PromosSection from '../components/PromosSection'
import TrustSection from '../components/TrustSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

// Sections removed per user request:
// - RoutesSection ("Conectamos a toda Guatemala")
// - TestimonialsSection (moved to TrustSection, then also removed from there)
// - CTASection ("¿Listo para enviar tu paquete?")
// - AboutSection, StatsSection → merged into TrustSection

export default function HomePage() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.replace('/', '');
        if (path && path !== 'admin') {
            const element = document.getElementById(path);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else if (path === '' || path === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location.pathname]);

    return (
        <div className="bg-main">
            <Navbar />
            <HeroSection />
            {/* <TrackingSection /> */}
            <ServicesSection />
            <PromosSection />
            <TrustSection />
            <FAQSection />
            <ContactSection />
            <Footer />
        </div>
    )
}
