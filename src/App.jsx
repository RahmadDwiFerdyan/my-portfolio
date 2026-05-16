import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Highlights from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();
  const [isHomeLoading, setIsHomeLoading] = useState(() => {
    return sessionStorage.getItem("hasSeenHomeSplash") !== "true";
  });

  useEffect(() => {
    if (!isHomeLoading) return;

    sessionStorage.setItem("hasSeenHomeSplash", "true");

    const loadingTimer = window.setTimeout(() => {
      setIsHomeLoading(false);
    }, 2000);

    return () => window.clearTimeout(loadingTimer);
  }, [isHomeLoading]);

  useEffect(() => {
    if (isHomeLoading) return;

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
  }, [isHomeLoading]);

  useEffect(() => {
    if (isHomeLoading) return;

    const SECTION_OFFSET = 140;
    const sectionIds = ["home", "about", "projects", "highlights", "contact"];
    let rafId = 0;

    const computeLastSection = () => {
      let current = "#home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;
        if (top - SECTION_OFFSET <= 0) current = `#${id}`;
      }

      sessionStorage.setItem("lastHomeSection", current);
      sessionStorage.setItem("lastHomeScrollY", String(window.scrollY || 0));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        computeLastSection();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHomeLoading]);

  useEffect(() => {
    if (isHomeLoading) return;
    if (location.pathname !== "/") return;

    const pendingScrollY = sessionStorage.getItem("pendingHomeScrollY");
    const pendingHash = sessionStorage.getItem("pendingHomeHash") || location.hash;

    const scroll = () => {
      if (pendingScrollY != null) {
        const y = Number(pendingScrollY);
        if (!Number.isNaN(y)) window.scrollTo({ top: y, left: 0, behavior: "instant" });
        sessionStorage.removeItem("pendingHomeScrollY");
        sessionStorage.removeItem("pendingHomeHash");
        return;
      }

      if (pendingHash && pendingHash.startsWith("#")) {
        const el = document.getElementById(pendingHash.slice(1));
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };

    // Wait until the DOM is painted.
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [isHomeLoading, location.pathname, location.hash]);

  if (isHomeLoading) {
    return (
      <div className="home-loader" role="status" aria-label="Loading homepage">
        <div className="home-loader__glow" aria-hidden="true" />
        <img
          src="/images/logo_ferdy.png"
          alt="Ferdy logo"
          className="home-loader__logo"
        />
        <div className="home-loader__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">

      <div id="home" />

      {/* NOISE */}
      <div className="noise-bg"></div>

      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Highlights />
      </main>
      <Footer />
    </div>

  );
}
