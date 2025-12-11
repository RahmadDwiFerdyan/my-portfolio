import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* GLOBAL BACKGROUND BLOBS */}
      <div className="blob blob-primary top-[-200px] left-[-200px]"></div>
      <div className="blob blob-secondary bottom-[-200px] right-[-200px]"></div>

      {/* CONTENT */}
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
