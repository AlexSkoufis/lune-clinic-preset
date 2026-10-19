import SmoothScroll from '@/components/SmoothScroll';
import Reveal from '@/components/Reveal';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import Treatments from '@/components/Treatments';
import Finder from '@/components/Finder';
import Compare from '@/components/Compare';
import Costs from '@/components/Costs';
import Team from '@/components/Team';
import ClinicSection from '@/components/ClinicSection';
import Booking from '@/components/Booking';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SmoothScroll />
      <Reveal />
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Treatments />
        <Finder />
        <Compare />
        <Costs />
        <Team />
        <ClinicSection />
        <Booking />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
