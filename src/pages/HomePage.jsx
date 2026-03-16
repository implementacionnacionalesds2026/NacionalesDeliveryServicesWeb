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
