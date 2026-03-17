import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import PromosSection from '../components/PromosSection'
import RoutesSection from '../components/RoutesSection'
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

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
            <ServicesSection />
            <PromosSection />
            <RoutesSection />
            <AboutSection />
            <StatsSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
            <CTASection />
            <Footer />
        </div>
    )
}
