import Nav from '@/app/_components/Nav';
import FloatingSettingsIcon from '@/app/_components/FloatingSettingsIcon';
import Hero from '@/app/_components/Hero';
import HowItWorks from '@/app/_components/HowItWorks';
import FeatureBento from '@/app/_components/FeatureBento';
import Contact from '@/app/_components/Contact';
import Footer from '@/app/_components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <FloatingSettingsIcon />
      <main>
        <Hero />
        <HowItWorks />
        <FeatureBento />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
