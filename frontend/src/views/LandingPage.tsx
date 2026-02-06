import Aboutus from "../components/app/LandigPage/Aboutus";

import HeroSection from "../components/app/LandigPage/HeroSection";
import Navbar from "../components/app/LandigPage/Navbar";
import Services from "../components/app/LandigPage/Services";
import Footer from "@/components/app/LandigPage/Footer";
import Contactus from "@/components/app/LandigPage/Contactus";
import ButtonToUp from "@/components/shared/ButtonToUp";
import WaveSection from "@/components/shared/WaveSection";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <WaveSection>
          <HeroSection />
        </WaveSection>

        <Services />
        <Aboutus />
        <Contactus />
      </div>
      <ButtonToUp />
      <Footer />
    </>
  );
};

export default LandingPage;
