import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import UniversitySearch from "@/components/sections/university-search";
import FeaturedUniversities from "@/components/sections/featured-universities";
import Services from "@/components/sections/services";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navbar />
      <Hero />
      <UniversitySearch />
      <FeaturedUniversities />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
