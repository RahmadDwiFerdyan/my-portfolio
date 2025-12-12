import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const blobs = document.querySelectorAll(".blob-parallax");

    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;

      blobs.forEach((blob, i) => {
        const depth = (i + 1) * 6; // different depth each blob
        blob.style.transform = `translate(${x / depth}px, ${y / depth}px)`;
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      blobs.forEach((blob, i) => {
        const depth = (i + 1) * 25;
        blob.style.transform += ` translateY(${scrollY / depth}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-scree">

      {/* NOISE */}
      <div className="noise-bg"></div>

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <TechStack />
      </main>
      <Footer />
    </div>

  );
}
