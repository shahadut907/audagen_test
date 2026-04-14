import Nav from '@/app/_components/Nav';
import FloatingSettingsIcon from '@/app/_components/FloatingSettingsIcon';
import Hero from '@/app/_components/Hero';
import LiveCallDemo from '@/app/_components/LiveCallDemo';
import WhyAudagen from '@/app/_components/WhyAudagen';
import HowItWorks from '@/app/_components/HowItWorks';
import FeatureBento from '@/app/_components/FeatureBento';
import Contact from '@/app/_components/Contact';
import Footer from '@/app/_components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <FloatingSettingsIcon />
      <main className="relative z-0">
        <Hero />
        <LiveCallDemo />
        <WhyAudagen />
        <HowItWorks />
        <FeatureBento />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
