import { useCallback, useState } from "react";
import Hero from "../components/sections/hero/Hero";
import Features from "../components/sections/features/Features";
import CallToAction from "../components/sections/calltoaction/CallToAction";
import Stats from "../components/sections/stats/Stats";
import Testimonials from "../components/sections/testimonials/Testimonials";
import { StepsModal } from "../components/common/Modal";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      {modalOpen && <StepsModal isOpen={modalOpen} onClose={closeModal} />}

      <Hero openModal={openModal} />

      <Features />

      <Stats />

      <Testimonials />

      <CallToAction openModal={openModal} />
    </>
  );
};

export default Home;
