import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import DashboardPreview from '../components/DashboardPreview.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <CTA />
      <Footer />
    </div>
  )
}

export default LandingPage
