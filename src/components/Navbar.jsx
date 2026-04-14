import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) {
      setOpen(false);
      return;
    }

    const nav = document.querySelector("nav");
    const navHeight = nav?.offsetHeight ?? 0;
    const extraOffset = 4;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - extraOffset;

    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
    setOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/8 bg-[#0B1C2D]/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-6">
          <h1 className="font-sora text-lg font-semibold hover:transition-all duration-200 hover:-translate-y-[0.5px] hover:scale-[1.1]">
            Ferdy's Portfolio
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-manrope">
            <a href="#home" className="hover:text-primary transition" onClick={scrollToSection("home")}>Homepage</a>
            <a href="#projects" className="hover:text-primary transition" onClick={scrollToSection("projects")}>Projects</a>
            <a href="#about" className="hover:text-primary transition" onClick={scrollToSection("about")}>About Me</a>
            <a href="#contact" className="hover:text-primary transition" onClick={scrollToSection("contact")}>Contact</a>
          </ul>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 focus:outline-none"
          >
            <div className="w-6 h-0.5 bg-white mb-[5px] rounded"></div>
            <div className="w-6 h-0.5 bg-white mb-[5px] rounded"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* MOBILE MENU PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-[300px] 
          bg-[#0B1C2D] backdrop-blur-xl shadow-xl z-60
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col gap-8 text-lg font-manrope text-white">

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="self-end text-3xl font-light hover:text-primary transition"
          >
            &times;
          </button>

          <a
            href="#home"
            className="hover:text-primary transition"
            onClick={scrollToSection("home")}
          >
            Homepage
          </a>

          <a
            href="#projects"
            className="hover:text-primary transition"
            onClick={scrollToSection("projects")}
          >
            Projects
          </a>

          <a
            href="#about"
            className="hover:text-primary transition"
            onClick={scrollToSection("about")}
          >
            About Me
          </a>

          <a
            href="#contact"
            className="hover:text-primary transition"
            onClick={scrollToSection("contact")}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
