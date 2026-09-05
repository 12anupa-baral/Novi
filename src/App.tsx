import { useState, useCallback } from "react";
import { C } from "./theme/color";
import { Nav } from "./components/layout/nav/Nav";
import Footer from "./components/layout/footer/Footer";
import Hero from "./components/sections/hero/Hero";
import Features from "./components/sections/features/Features";
import CallToAction from "./components/sections/calltoaction/CallToAction";
import Stats from "./components/sections/stats/Stats";
import Testimonials from "./components/sections/testimonials/Testimonials";
import { StepsModal } from "./components/common/Modal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div style={{ background: C.bg, color: C.fg, minHeight: "100%" }}>
      {modalOpen && <StepsModal isOpen={modalOpen} onClose={closeModal} />}
      <Nav />
      <Hero openModal={openModal} />
      <Features />
      <Stats />
      <Testimonials />
      <CallToAction openModal={openModal} />
      <Footer />
    </div>
  );
}
