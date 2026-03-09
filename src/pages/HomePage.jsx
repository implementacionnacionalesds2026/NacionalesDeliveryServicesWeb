import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import RoutesSection from '../components/RoutesSection'
import StatsSection from '../components/StatsSection'
import TrackingSection from '../components/TrackingSection'
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
            <RoutesSection />
            <StatsSection />
            <TrackingSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
            <CTASection />
            <Footer />
        </div>
    )
}
