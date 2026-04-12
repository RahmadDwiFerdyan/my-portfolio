import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B1C2D] backdrop-blur-md shadow-md shadow-black/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-6">
          <h1 className="font-sora text-lg font-semibold">
            Ferdy's Portfolio
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-manrope">
            <a href="#home" className="hover:text-primary transition">Homepage</a>
            <a href="#projects" className="hover:text-primary transition">Projects</a>
            <a href="#about" className="hover:text-primary transition">About Me</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
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
            onClick={() => setOpen(false)}
          >
            Homepage
          </a>

          <a
            href="#projects"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Projects
          </a>

          <a
            href="#about"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            About Me
          </a>

          <a
            href="#contact"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
